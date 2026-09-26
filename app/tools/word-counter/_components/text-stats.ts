export type TextStats = {
    words: number;
    characters: number;
    charactersNoSpaces: number;
    sentences: number;
    paragraphs: number;
    readingSeconds: number;
    speakingSeconds: number;
};

const READING_WPM = 238;
const SPEAKING_WPM = 150;

const hasSegmenter = typeof Intl !== "undefined" && "Segmenter" in Intl;

/** Words, ignoring punctuation and dashes; falls back to a regex in older browsers */
export function wordList(text: string): string[] {
    if (hasSegmenter) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: "word" });
        return [...segmenter.segment(text)].filter((s) => s.isWordLike).map((s) => s.segment);
    }
    return text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
}

/** Characters as people see them - an emoji or accented letter counts once */
function graphemeCount(text: string) {
    if (hasSegmenter) {
        let n = 0;
        for (const _ of new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)) n++;
        return n;
    }
    return [...text].length;
}

function sentenceCount(text: string) {
    if (hasSegmenter) {
        const segmenter = new Intl.Segmenter(undefined, { granularity: "sentence" });
        return [...segmenter.segment(text)].filter((s) => /[\p{L}\p{N}]/u.test(s.segment)).length;
    }
    return text.split(/[.!?]+(?:\s+|$)|\n{2,}/).filter((s) => /[\p{L}\p{N}]/u.test(s)).length;
}

export function computeStats(text: string): TextStats {
    const words = wordList(text).length;
    return {
        words,
        characters: graphemeCount(text),
        charactersNoSpaces: graphemeCount(text.replace(/\s+/g, "")),
        sentences: sentenceCount(text),
        paragraphs: text.split(/\n\s*\n/).filter((p) => /[\p{L}\p{N}]/u.test(p)).length,
        readingSeconds: Math.round((words / READING_WPM) * 60),
        speakingSeconds: Math.round((words / SPEAKING_WPM) * 60),
    };
}

export function formatDuration(seconds: number) {
    if (seconds === 0) return "0 min";
    if (seconds < 60) return "< 1 min";
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    return `${Math.floor(minutes / 60)} h ${minutes % 60} min`;
}

export const LIMITS = [
    { id: "seo-title", label: "SEO title", max: 60 },
    { id: "meta", label: "Meta description", max: 160 },
    { id: "x", label: "X post", max: 280 },
    { id: "instagram", label: "Instagram caption", max: 2200 },
    { id: "linkedin", label: "LinkedIn post", max: 3000 },
];

const STOP_WORDS = new Set(
    (
        "a an and are as at be been but by can could did do does for from had has have he her his i if in into is it its " +
        "me my no not of on or our she so than that the their them then there these they this to too up us was we were " +
        "what when which who will with would you your just about also more all any some out one very"
    ).split(" ")
);

export function topWords(text: string, hideCommon: boolean, limit = 8) {
    const counts = new Map<string, number>();
    const list = wordList(text);
    for (const raw of list) {
        const word = raw.toLocaleLowerCase();
        if (/^\d+$/.test(word)) continue;
        if (hideCommon && (STOP_WORDS.has(word) || word.length < 3)) continue;
        counts.set(word, (counts.get(word) ?? 0) + 1);
    }
    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, limit)
        .map(([word, count]) => ({ word, count, share: list.length ? count / list.length : 0 }));
}

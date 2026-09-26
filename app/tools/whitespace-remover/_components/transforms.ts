export type PresetId =
    | "collapse"
    | "remove-spaces"
    | "join-lines"
    | "remove-empty"
    | "trim-lines"
    | "replace"
    | "slug"
    | "filename"
    | "snake"
    | "camel";

export type CaseId = "none" | "lower" | "upper" | "title" | "sentence";

export const PRESETS: { id: PresetId; label: string; example: string; hint: string }[] = [
    { id: "collapse", label: "Collapse spaces", example: "a   b → a b", hint: "Turns runs of spaces and tabs into one space and trims each line." },
    { id: "remove-spaces", label: "Remove all spaces", example: "a b → ab", hint: "Removes every space and tab. Line breaks stay." },
    { id: "join-lines", label: "Remove line breaks", example: "a⏎b → a b", hint: "Joins all lines into one paragraph." },
    { id: "remove-empty", label: "Remove empty lines", example: "a⏎⏎b → a⏎b", hint: "Deletes blank lines and keeps the rest as is." },
    { id: "trim-lines", label: "Trim each line", example: "␣a␣ → a", hint: "Removes spaces at the start and end of every line." },
    { id: "replace", label: "Replace spaces", example: "a b → a-b", hint: "Replaces spaces with the separator you choose." },
    { id: "slug", label: "URL slug", example: "Café Menu! → cafe-menu", hint: "Lowercase, no accents or symbols, words joined by dashes. One slug per line." },
    { id: "filename", label: "Filename", example: "My Photo (1).jpg → My-Photo-1.jpg", hint: "Safe for any system: no accents, spaces or special characters." },
    { id: "snake", label: "snake_case", example: "Order Total → order_total", hint: "Lowercase words joined by underscores. One per line." },
    { id: "camel", label: "camelCase", example: "order total → orderTotal", hint: "Words joined, each starting with a capital except the first. One per line." },
];

/** Presets that decide the letter case themselves */
export const FIXED_CASE: PresetId[] = ["slug", "snake", "camel"];

export const CASES: { id: CaseId; label: string }[] = [
    { id: "none", label: "Keep" },
    { id: "lower", label: "lowercase" },
    { id: "upper", label: "UPPERCASE" },
    { id: "title", label: "Title Case" },
    { id: "sentence", label: "Sentence case" },
];

const SPACES = /[ \t  -​  　]+/g;

function lines(text: string) {
    return text.replace(/\r\n?/g, "\n").split("\n");
}

function stripAccents(value: string) {
    return value.normalize("NFD").replace(/\p{M}+/gu, "").replace(/ß/g, "ss").replace(/æ/g, "ae").replace(/ø/g, "o").replace(/đ/g, "d");
}

/** Splits a phrase into words, also breaking camelCase and snake_case */
function words(value: string) {
    return stripAccents(value)
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .split(/[^A-Za-z0-9]+/)
        .filter(Boolean);
}

function perLine(text: string, fn: (line: string) => string) {
    return lines(text).map(fn).filter(Boolean).join("\n");
}

export function applyPreset(text: string, preset: PresetId, separator: string): string {
    switch (preset) {
        case "collapse":
            return lines(text)
                .map((l) => l.replace(SPACES, " ").trim())
                .join("\n")
                .trim();
        case "remove-spaces":
            return text.replace(SPACES, "");
        case "join-lines":
            return lines(text)
                .map((l) => l.trim())
                .filter(Boolean)
                .join(" ")
                .replace(SPACES, " ");
        case "remove-empty":
            return lines(text)
                .filter((l) => l.trim())
                .join("\n");
        case "trim-lines":
            return lines(text)
                .map((l) => l.trim())
                .join("\n");
        case "replace":
            return lines(text)
                .map((l) => l.trim().replace(SPACES, separator))
                .join("\n");
        case "slug":
            return perLine(text, (l) => words(l.replace(/&/g, " and ")).join("-").toLowerCase());
        case "snake":
            return perLine(text, (l) => words(l).join("_").toLowerCase());
        case "camel":
            return perLine(text, (l) =>
                words(l)
                    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
                    .join("")
            );
        case "filename":
            return perLine(text, (l) => {
                const clean = stripAccents(l.trim());
                const dot = clean.lastIndexOf(".");
                const hasExt = dot > 0 && dot >= clean.length - 6;
                const base = hasExt ? clean.slice(0, dot) : clean;
                const ext = hasExt ? clean.slice(dot).replace(/[^A-Za-z0-9.]/g, "") : "";
                const safe = base
                    .replace(/[^A-Za-z0-9._-]+/g, "-")
                    .replace(/-{2,}/g, "-")
                    .replace(/^[-.]+|[-.]+$/g, "");
                return safe + ext;
            });
    }
}

export function applyCase(text: string, mode: CaseId): string {
    switch (mode) {
        case "lower":
            return text.toLocaleLowerCase();
        case "upper":
            return text.toLocaleUpperCase();
        case "title":
            // A letter starts a word after a space, dash, slash or opening bracket - not after an apostrophe
            return text.toLocaleLowerCase().replace(/(^|[\s\-_/(["“])(\p{L})/gu, (_, before: string, letter: string) => before + letter.toLocaleUpperCase());
        case "sentence":
            return text.toLocaleLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (_, before: string, letter: string) => before + letter.toLocaleUpperCase());
        default:
            return text;
    }
}

export function transform(text: string, preset: PresetId, separator: string, caseMode: CaseId) {
    const out = applyPreset(text, preset, separator);
    return FIXED_CASE.includes(preset) ? out : applyCase(out, caseMode);
}

export function stats(text: string) {
    return {
        chars: [...text].length,
        spaces: (text.match(/[ \t ]/g) ?? []).length,
        lines: text ? lines(text).length : 0,
    };
}

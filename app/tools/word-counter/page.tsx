import type { Metadata } from "next";
import WordCounter from "./_components/word-counter";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Count words, characters and sentences, see reading time, and check your text against limits for X, LinkedIn, SEO titles and meta descriptions.";

export const metadata: Metadata = pageMetadata({
    title: "Word Counter - Count Words, Characters & Reading Time",
    description: DESCRIPTION,
    path: "/tools/word-counter",
});

const tips = [
    {
        label: "Limits",
        title: "Fit the box before you post",
        text: "Check a post, SEO title or meta description against its limit - the bar turns amber near the end and red when you go over.",
    },
    {
        label: "Words",
        title: "Spot repeated words",
        text: "Most used words shows what you lean on. Hide common words like “the” and “and” to see the ones that matter.",
    },
    {
        label: "Private",
        title: "Your text stays here",
        text: "Everything is counted in your browser. The text is saved on this device so a refresh won’t lose it - Clear removes it.",
    },
];

export default function WordCounterPage() {
    return (
        <ToolPageShell
            currentSlug="word-counter"
            title="Word Counter"
            description="Paste or type any text to see words, characters, reading time and how it fits common character limits."
            perks={["Free", "No sign-up", "Text stays in your browser"]}
            schema={webAppSchema("Word Counter", DESCRIPTION, "word-counter")}
            tips={tips}
            bare
        >
            <WordCounter />
        </ToolPageShell>
    );
}

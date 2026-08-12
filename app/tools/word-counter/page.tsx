import type { Metadata } from "next";
import WordCounter from "./_components/word-counter";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Word Counter - Count Words, Characters & Reading Time",
    description:
        "Count words, characters, sentences, and estimated reading time from any text - instantly in your browser. Paste or type, results update as you go. Free.",
    alternates: { canonical: "https://nicojuhari.com/tools/word-counter" },
};

export default function WordCounterPage() {
    return (
        <ToolPageShell
            currentSlug="word-counter"
            title="Word Counter Tool"
            description="Paste or type any text and instantly see word count, character count, and estimated reading time."
            schema={webAppSchema(
                "Word Counter",
                "Count words, characters, sentences, and estimated reading time from any text - instantly in your browser. Paste or type, results update as you go. Free.",
                "word-counter"
            )}
            notes={
                <>
                    <p>Word Counter is a fast, free, and accurate text tool - paste or type and get instant results.</p>
                    <p>
                        It shows exact word and character counts (with and without spaces), sentence and line counts, and
                        estimated reading time.
                    </p>
                    <p>No downloads, no sign-up, and all processing happens in your browser - your text is never stored.</p>
                </>
            }
        >
            <WordCounter />
        </ToolPageShell>
    );
}

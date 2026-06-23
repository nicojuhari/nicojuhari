import type { Metadata } from "next";
import WordCounter from "./_components/word-counter";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Word Counter - Count Words, Characters & Reading Time",
    description:
        "Count words, characters, sentences, and estimated reading time from any text - instantly in your browser. Paste or type, results update as you go. Free.",
    alternates: { canonical: "https://nicojuhari.com/tools/word-counter" },
};

export default function WordCounterPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        webAppSchema(
                            "Word Counter",
                            "Count words, characters, sentences, and estimated reading time from any text - instantly in your browser. Paste or type, results update as you go. Free.",
                            "word-counter"
                        )
                    ),
                }}
            />
            <h1 className="text-3xl font-bold mb-2">Word Counter Tool</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">
                Paste or type any text and instantly see word count, character count, and estimated reading time.
            </h2>
            <WordCounter />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>Word Counter is a fast, free, and accurate text tool - paste or type and get instant results.</p>
                <p>
                    It shows exact word and character counts (with and without spaces), sentence and line counts, and estimated reading
                    time.
                </p>
                <p>Works for short snippets or long documents, and updates live as you edit.</p>
                <p>Perfect for fitting social posts, articles, or any platform with strict character limits.</p>
                <p>No downloads, no sign-up, and all processing happens in your browser - your text is never stored.</p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import WhitespaceRemover from "./_components/whitespace-remover";

export const metadata: Metadata = {
    title: "Whitespace Remover | Replace or Remove Spaces in Text",
    description:
        "Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, and FREE.",
};

export default function WhitespaceRemoverPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Whitespace Remover</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">Replace spaces with dashes, underscores, slashes, or remove them entirely — perfect for filenames, slugs, and URLs.</h2>
            <WhitespaceRemover />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>Quickly reformat text for filenames, URLs, social handles, and any short copy - all in seconds, in your browser.</p>
                <p>
                    Replace or remove spaces with dashes, underscores, slashes, or new lines, and normalize extra whitespace automatically.
                </p>
                <p>
                    Change case (lowercase, UPPERCASE, or Capitalize), optionally reverse word order, and preserve line breaks when needed.
                </p>
                <p>Results update instantly so you can copy clean output straight into CSVs, slugs, or file names.</p>
                <p>No sign-up, no uploads - everything runs locally and nothing is stored on our servers.</p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import WhitespaceRemover from "./_components/whitespace-remover";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Whitespace Remover | Replace or Remove Spaces in Text",
    description:
        "Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, and FREE.",
    alternates: { canonical: "https://nicojuhari.com/tools/whitespace-remover" },
};

export default function WhitespaceRemoverPage() {
    return (
        <ToolPageShell
            currentSlug="whitespace-remover"
            title="Whitespace Remover"
            description="Replace spaces with dashes, underscores, slashes, or remove them entirely - perfect for filenames, slugs, and URLs."
            schema={webAppSchema(
                "Whitespace Remover",
                "Online Whitespace Remover - quickly replace or remove spaces with hyphens, underscores, slashes, or new lines. Fast, browser-based tool, and FREE.",
                "whitespace-remover"
            )}
            notes={
                <>
                    <p>
                        Quickly reformat text for filenames, URLs, social handles, and any short copy - all in seconds, in
                        your browser.
                    </p>
                    <p>
                        Replace or remove spaces with dashes, underscores, slashes, or new lines, and normalize extra
                        whitespace automatically.
                    </p>
                    <p>No sign-up, no uploads - everything runs locally and nothing is stored on our servers.</p>
                </>
            }
        >
            <WhitespaceRemover />
        </ToolPageShell>
    );
}

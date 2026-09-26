import type { Metadata } from "next";
import WhitespaceRemover from "./_components/whitespace-remover";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Remove extra spaces and line breaks, or turn text into URL slugs, filenames, snake_case and camelCase. Runs in your browser - free, no sign-up.";

export const metadata: Metadata = pageMetadata({
    title: "Whitespace Remover | Replace or Remove Spaces in Text",
    description: DESCRIPTION,
    path: "/tools/whitespace-remover",
});

const tips = [
    {
        label: "Clean",
        title: "Fix pasted text",
        text: "Text from PDFs and emails often has double spaces and broken lines. Collapse spaces or remove line breaks in one click.",
    },
    {
        label: "Convert",
        title: "Slugs, filenames and code names",
        text: "Paste one item per line to convert a whole list at once - accents and symbols are handled for you.",
    },
    {
        label: "Chain",
        title: "Combine steps",
        text: "Use “Use as input” to apply another step to the result - for example remove empty lines, then trim each line.",
    },
];

export default function WhitespaceRemoverPage() {
    return (
        <ToolPageShell
            currentSlug="whitespace-remover"
            title="Whitespace Remover"
            description="Clean up spaces and line breaks, or turn text into slugs, filenames and code-friendly names."
            perks={["Free", "No sign-up", "Text stays in your browser"]}
            schema={webAppSchema("Whitespace Remover", DESCRIPTION, "whitespace-remover")}
            tips={tips}
            bare
        >
            <WhitespaceRemover />
        </ToolPageShell>
    );
}

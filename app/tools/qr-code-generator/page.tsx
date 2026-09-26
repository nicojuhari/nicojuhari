import type { Metadata } from "next";
import QrGenerator from "./_components/qr-generator";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Make a custom QR code for a link, Wi-Fi, email, phone or contact. Pick colors, shapes and a logo. Download PNG, JPEG or SVG. Free, no watermark.";

export const metadata: Metadata = pageMetadata({
    title: "Free QR Code Generator | Customize & Download Instantly",
    description: DESCRIPTION,
    path: "/tools/qr-code-generator",
});

const tips = [
    {
        label: "Paste",
        title: "Links, Wi-Fi and more",
        text: "Use a website, menu or profile link - or let guests join your Wi-Fi, call you or save your contact with one scan.",
    },
    {
        label: "Print",
        title: "Keep it scannable",
        text: "Print codes at least 2 × 2 cm (about 1 inch), keep dark dots on a light background, and leave some margin around the code.",
    },
    {
        label: "Export",
        title: "Pick the right format",
        text: "PNG for screens and overlays, JPEG for documents, SVG for a crisp vector on signage and packaging.",
    },
];

export default function QrGeneratorPage() {
    return (
        <ToolPageShell
            currentSlug="qr-code-generator"
            title="QR Code Generator"
            description="Paste a link, style the code to match your brand, and download in seconds."
            perks={["Free", "No sign-up", "No watermark"]}
            schema={webAppSchema("QR Code Generator", DESCRIPTION, "qr-code-generator")}
            tips={tips}
            bare
        >
            <QrGenerator />
        </ToolPageShell>
    );
}

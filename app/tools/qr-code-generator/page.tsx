import type { Metadata } from "next";
import QrGenerator from "./_components/qr-generator";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Free QR Code Generator | Customize & Download Instantly",
    description:
        "Create a custom QR code for any URL - choose colors, dot styles, and corner shapes. Download as PNG, JPEG, or SVG. No sign-up, no watermarks, free.",
    alternates: { canonical: "https://nicojuhari.com/tools/qr-code-generator" },
};

export default function QrGeneratorPage() {
    return (
        <ToolPageShell
            currentSlug="qr-code-generator"
            title="QR Code Generator"
            description="Paste any URL, style the code to match your brand, and download in seconds."
            schema={webAppSchema(
                "QR Code Generator",
                "Create a custom QR code for any URL - choose colors, dot styles, and corner shapes. Download as PNG, JPEG, or SVG. No sign-up, no watermarks, free.",
                "qr-code-generator"
            )}
            notes={
                <>
                    <p>
                        Enter any link - a website, menu, social profile, or document - and the code updates instantly as
                        you adjust colors and shapes.
                    </p>
                    <p>
                        Print it on anything: table tents, stickers, packaging, or signage. Keep printed codes at least
                        2&nbsp;×&nbsp;2 inches and maintain strong contrast between dots and background for reliable
                        scanning across all devices.
                    </p>
                    <p>
                        Download PNG with a transparent background for overlays, JPEG for photos, or SVG when you need a
                        crisp vector at any size.
                    </p>
                </>
            }
        >
            <QrGenerator />
        </ToolPageShell>
    );
}

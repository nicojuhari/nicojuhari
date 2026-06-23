import type { Metadata } from "next";
import QrGenerator from "./_components/qr-generator";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Free QR Code Generator | Customize & Download Instantly",
    description:
        "Create a custom QR code for any URL - choose colors, dot styles, and corner shapes. Download as PNG, JPEG, or SVG. No sign-up, no watermarks, free.",
    alternates: { canonical: "https://nicojuhari.com/tools/qr-code-generator" },
};

export default function QrGeneratorPage() {
    return (
        <div className="section px-6 max-w-4xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        webAppSchema(
                            "QR Code Generator",
                            "Create a custom QR code for any URL - choose colors, dot styles, and corner shapes. Download as PNG, JPEG, or SVG. No sign-up, no watermarks, free.",
                            "qr-code-generator"
                        )
                    ),
                }}
            />
            <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
            <h2 className="text-lg text-muted-foreground mb-10 font-normal">
                Paste any URL, style the code to match your brand, and download in seconds.
            </h2>
            <QrGenerator />
            <div className="mt-14 space-y-3 text-sm text-muted-foreground max-w-2xl">
                <p>
                    Enter any link - a website, menu, social profile, or document - and the code updates instantly as you adjust colors and
                    shapes.
                </p>
                <p>
                    Print it on anything: table tents, stickers, packaging, or signage. Keep printed codes at least 2&nbsp;×&nbsp;2 inches
                    and maintain strong contrast between dots and background for reliable scanning across all devices.
                </p>
                <p>
                    Download PNG with a transparent background for overlays, JPEG for photos, or SVG when you need a crisp vector at any
                    size.
                </p>
                <p>For tracking, use a short URL with UTM parameters - that way you can measure how many people scanned and where.</p>
            </div>
        </div>
    );
}

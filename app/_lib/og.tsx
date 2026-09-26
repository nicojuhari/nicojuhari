import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared Open Graph image - used by every route's opengraph-image.tsx */
export const OG_SIZE = { width: 1200, height: 630 };

export async function ogImage({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
    const [regular, semibold, logo] = await Promise.all([
        readFile(join(process.cwd(), "assets/fonts/DMSans-400.ttf")),
        readFile(join(process.cwd(), "assets/fonts/DMSans-600.ttf")),
        readFile(join(process.cwd(), "public/nicojuhari-logo.svg")),
    ]);
    const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: "#f6f5f1",
                    fontFamily: "DM Sans",
                    color: "#111418",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoSrc} width={64} height={64} alt="" />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: 28, fontWeight: 600 }}>Nicolae Cojuhari</span>
                        <span style={{ fontSize: 22, color: "#6b6f76" }}>Software Engineer · Finance · AI</span>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                    <span
                        style={{
                            fontSize: 22,
                            fontWeight: 600,
                            letterSpacing: 3,
                            textTransform: "uppercase",
                            color: "#1b998b",
                        }}
                    >
                        {eyebrow}
                    </span>
                    <span style={{ fontSize: 68, fontWeight: 600, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
                        {title}
                    </span>
                    <span style={{ fontSize: 30, lineHeight: 1.4, color: "#555a62", maxWidth: 960 }}>{text}</span>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "2px solid #e6e3dc",
                        paddingTop: 26,
                        fontSize: 24,
                        color: "#555a62",
                    }}
                >
                    <span>nicojuhari.com</span>
                    <span>Vienna, Austria</span>
                </div>
            </div>
        ),
        {
            ...OG_SIZE,
            fonts: [
                { name: "DM Sans", data: regular, weight: 400, style: "normal" },
                { name: "DM Sans", data: semibold, weight: 600, style: "normal" },
            ],
        }
    );
}

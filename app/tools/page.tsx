import type { Metadata } from "next";
import { tools } from "@/app/_data/tools";
import ToolCard from "@/app/_components/tool-card";

export const metadata: Metadata = {
    title: "Free Browser Tools - QR Codes, Checklists & More",
    description:
        "A set of free, browser-based tools for everyday tasks - split bills, generate QR codes, make checklists, crop images, and more. No sign-up needed.",
    alternates: { canonical: "https://nicojuhari.com/tools" },
};

export default function ToolsPage() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">Simple Tools</h1>
                <p className="mt-2 text-ink-muted">Built for me, sharing with you.</p>
            </header>

            <ul className="grid gap-3 sm:grid-cols-2">
                {tools.map((tool) => (
                    <li key={tool.slug}>
                        <ToolCard tool={tool} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

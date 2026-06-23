import type { Metadata } from "next";
import Link from "next/link";
import { QrCode, Crop, Type, RemoveFormatting, ListTodo, LayoutGrid, DollarSign } from "lucide-react";
import { tools } from "@/app/_data/tools";
import type { Tool } from "@/app/_data/tools";

export const metadata: Metadata = {
    title: "Free Browser Tools - QR Codes, Checklists & More",
    description:
        "A set of free, browser-based tools for everyday tasks - split bills, generate QR codes, make checklists, crop images, and more. No sign-up needed.",
    alternates: { canonical: "https://nicojuhari.com/tools" },
};

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "qr-code-generator": QrCode,
    "square-image-cropper": Crop,
    "word-counter": Type,
    "whitespace-remover": RemoveFormatting,
    "online-checklist-maker": ListTodo,
    "product-grid-generator": LayoutGrid,
    "bill-split-calculator": DollarSign,
};

function ToolCard({ tool }: { tool: Tool }) {
    const Icon = iconMap[tool.slug];
    return (
        <Link
            href={`/tools/${tool.slug}`}
            className="flex items-center gap-4 border rounded-xl p-4 bg-white hover:shadow-md hover:border-foreground/20 transition-all"
        >
            {Icon && <Icon className="w-6 h-6 shrink-0 text-brand-green" />}
            <div>
                <p className="font-semibold text-sm">{tool.title}</p>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
            </div>
        </Link>
    );
}

export default function ToolsPage() {
    return (
        <div className="section px-6">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Simple Tools</h1>
                <p className="text-muted-foreground">Built for me, sharing with you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </div>
    );
}

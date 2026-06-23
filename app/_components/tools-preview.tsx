import Link from "next/link";
import { QrCode, Crop, Type, RemoveFormatting, ListTodo, LayoutGrid, DollarSign } from "lucide-react";
import type { Tool } from "@/app/_data/tools";
import { tools } from "@/app/_data/tools";

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
            title={tool.title}
        >
            {Icon && <Icon className="w-6 h-6 shrink-0 text-brand" />}
            <div>
                <p className="font-semibold text-sm">{tool.title}</p>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
            </div>
        </Link>
    );
}

export default function ToolsPreview() {
    return (
        <section className="section container-sm">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-2">Simple Tools</h2>
                <p className="text-muted-foreground">Built for me, sharing with you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                ))}
            </div>
        </section>
    );
}

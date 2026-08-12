import Link from "next/link";
import { QrCode, Crop, Type, RemoveFormatting, ListTodo, LayoutGrid, DollarSign } from "lucide-react";
import type { Tool } from "@/app/_data/tools";

export const toolIconMap: Record<string, React.FC<{ className?: string }>> = {
    "qr-code-generator": QrCode,
    "square-image-cropper": Crop,
    "word-counter": Type,
    "whitespace-remover": RemoveFormatting,
    "online-checklist-maker": ListTodo,
    "product-grid-generator": LayoutGrid,
    "bill-split-calculator": DollarSign,
};

type Props = {
    tool: Tool;
};

export default function ToolCard({ tool }: Props) {
    const Icon = toolIconMap[tool.slug];

    return (
        <Link
            href={`/tools/${tool.slug}`}
            title={tool.title}
            className="surface-card-interactive flex w-full items-center gap-3 px-4 py-3.5 text-left"
        >
            {Icon && <Icon className="size-6 shrink-0 text-brand-green" />}
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{tool.title}</p>
                <p className="mt-0.5 truncate text-xs text-ink-muted">{tool.description}</p>
            </div>
        </Link>
    );
}

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

function ToolRow({ tool }: { tool: Tool }) {
    const Icon = iconMap[tool.slug];
    return (
        <Link
            href={`/tools/${tool.slug}`}
            className="group flex items-center gap-3 border-t border-rule py-4 transition-colors first:border-t-0 hover:text-brand-green"
            title={tool.title}
        >
            {Icon && <Icon className="size-4 shrink-0 text-ink-muted transition-colors group-hover:text-brand-green" />}
            <span className="text-sm font-medium text-ink group-hover:text-brand-green">{tool.title}</span>
            <span className="hidden text-sm text-ink-muted sm:inline">- {tool.description}</span>
        </Link>
    );
}

export default function ToolsPreview() {
    return (
        <section className="section-band section-rule" id="tools">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="eyebrow">Free tools</p>
                        <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">
                            Small utilities I built and share.
                        </h2>
                    </div>
                    <Link
                        href="/tools"
                        className="group inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-brand-green"
                    >
                        All tools
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                            →
                        </span>
                    </Link>
                </header>

                <div className="mt-8 max-w-3xl border-y border-rule">
                    {tools.slice(0, 5).map((tool) => (
                        <ToolRow key={tool.slug} tool={tool} />
                    ))}
                </div>
            </div>
        </section>
    );
}

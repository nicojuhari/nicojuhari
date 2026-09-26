import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Tool } from "@/app/_data/tools";
import { toolCategoryLabel } from "@/app/_data/tools";
import { cn } from "@/lib/utils";
import { toolIcons } from "./icons";

type Props = {
    tool: Tool;
    /** compact = homepage grid; full = tools page */
    variant?: "compact" | "full";
};

/** Square tool card */
export default function ToolTile({ tool, variant = "full" }: Props) {
    const Icon = toolIcons[tool.slug];
    const full = variant === "full";

    return (
        <Link
            href={`/tools/${tool.slug}`}
            title={tool.title}
            className={cn(
                "group flex aspect-square flex-col justify-between border border-rule bg-white text-ink transition-[border-color,transform] duration-200 hover:border-ink/20 active:scale-[0.99]",
                full ? "rounded-3xl p-5 sm:p-6.5" : "rounded-[18px] p-4 sm:rounded-[20px] sm:p-5"
            )}
        >
            <span className="flex items-start justify-between gap-2">
                <span
                    className={cn(
                        "flex items-center justify-center",
                        full ? "size-12 rounded-[14px] sm:size-14 sm:rounded-2xl" : "size-10 rounded-[11px] sm:size-11 sm:rounded-xl"
                    )}
                    style={{ backgroundColor: tool.tint, color: tool.accent }}
                >
                    {Icon && <Icon className={full ? "size-6 sm:size-[26px]" : "size-[19px] sm:size-5"} strokeWidth={1.7} aria-hidden />}
                </span>
                {full ? (
                    <span className="hidden rounded-full bg-[#f4f3ef] px-2.5 py-1 font-mono text-[11px] font-semibold text-ink-muted min-[480px]:inline">
                        {toolCategoryLabel[tool.category]}
                    </span>
                ) : (
                    <ArrowUpRight className="hidden size-4 text-[#9a9ea5] transition-colors group-hover:text-ink sm:block" aria-hidden />
                )}
            </span>

            <span className={cn("flex flex-col", full ? "gap-1.5 sm:gap-2" : "gap-1 sm:gap-1.5")}>
                <span
                    className={cn(
                        "leading-tight font-semibold",
                        full ? "text-base tracking-[-0.015em] sm:text-xl sm:tracking-[-0.02em]" : "text-sm sm:text-[15px] sm:tracking-[-0.01em]"
                    )}
                >
                    {tool.shortTitle ?? tool.title}
                </span>
                <span className={cn("leading-snug text-ink-faint", full ? "text-[13px] sm:text-sm sm:text-ink-muted" : "text-xs sm:text-[13px]")}>
                    {tool.description}
                </span>
                {full && (
                    <span className="mt-2 hidden items-center gap-1.5 text-[13px] font-semibold text-brand sm:inline-flex">
                        Open tool
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                )}
            </span>
        </Link>
    );
}

/** Navy square that closes a tool grid */
export function ToolPromoTile({
    href,
    eyebrow,
    title,
    description,
    linkLabel,
    variant = "full",
}: {
    href: string;
    eyebrow?: string;
    title: string;
    description?: string;
    linkLabel: string;
    variant?: "compact" | "full";
}) {
    const full = variant === "full";

    return (
        <Link
            href={href}
            className={cn(
                "group flex aspect-square flex-col justify-between border border-brand bg-brand text-white [background-image:radial-gradient(circle,rgb(255_255_255/0.08)_0.9px,transparent_0.9px)] [background-size:16px_16px]",
                full ? "rounded-3xl p-5 sm:p-6.5" : "rounded-[18px] p-4 sm:rounded-[20px] sm:p-5"
            )}
        >
            {eyebrow ? (
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#c5cddc] uppercase sm:text-xs">{eyebrow}</span>
            ) : (
                <span />
            )}
            <span className="flex flex-col gap-2 sm:gap-2.5">
                <span
                    className={cn(
                        "leading-tight font-semibold tracking-[-0.02em]",
                        full ? "text-lg sm:text-2xl sm:leading-[1.15]" : "text-base sm:text-xl"
                    )}
                >
                    {title}
                </span>
                {description && <span className="hidden text-sm leading-normal text-[#c5cddc] sm:block">{description}</span>}
                <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold">
                    {linkLabel}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
            </span>
        </Link>
    );
}

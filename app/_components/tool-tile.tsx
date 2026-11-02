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
                "group flex aspect-square flex-col justify-between bg-white text-ink transition-[box-shadow,transform] duration-200 hover:shadow-[0_10px_28px_-14px_rgba(22,40,77,0.3)] active:scale-[0.99]",
                full ? "rounded-[24px] p-5 sm:p-6.5" : "rounded-[18px] p-4 sm:rounded-[20px] sm:p-5"
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
                    <span className="hidden rounded-full bg-bg-soft px-2.5 py-1 text-xs font-semibold text-ink-muted min-[480px]:inline">
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
                <span className={cn("leading-snug text-[#4a4f57]", full ? "text-[13px] sm:text-[15px]" : "text-xs sm:text-[13px]")}>
                    {tool.description}
                </span>
                {full && (
                    <span className="mt-2 hidden items-center gap-1.5 text-sm font-semibold text-teal sm:inline-flex">
                        Open tool
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                )}
            </span>
        </Link>
    );
}

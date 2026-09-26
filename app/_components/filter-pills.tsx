"use client";

import { cn } from "@/lib/utils";

type Filter<T extends string> = { id: T; label: string; count: number };

/** Row of pill buttons with counts; scrolls sideways on small screens */
export default function FilterPills<T extends string>({
    filters,
    active,
    onChange,
    label,
}: {
    filters: Filter<T>[];
    active: T;
    onChange: (id: T) => void;
    label: string;
}) {
    return (
        <div
            role="group"
            aria-label={label}
            className="-mx-4 flex gap-2 overflow-x-auto border-b border-rule px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 sm:pb-5"
        >
            {filters.map((filter) => {
                const on = filter.id === active;
                return (
                    <button
                        key={filter.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => onChange(filter.id)}
                        className={cn(
                            "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4.5 text-sm font-semibold whitespace-nowrap transition-colors",
                            on
                                ? "border-brand bg-brand text-white"
                                : "border-[#e0ddd5] bg-white text-ink-soft hover:border-ink/30 hover:text-ink"
                        )}
                    >
                        {filter.label}
                        <span
                            className={cn(
                                "rounded-full px-1.5 py-0.5 font-mono text-[11px]",
                                on ? "bg-white/15 text-white" : "bg-[#f1efea] text-ink-faint"
                            )}
                        >
                            {filter.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

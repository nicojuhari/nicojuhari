"use client";

import { cn } from "@/lib/utils";

type Filter<T extends string> = { id: T; label: string; count: number };

/** White bar of pill buttons with counts; scrolls sideways on small screens */
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
            className="flex max-w-full gap-1.5 self-start overflow-x-auto rounded-full bg-white p-1.5 [scrollbar-width:none]"
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
                            "inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4.5 text-[15px] font-semibold whitespace-nowrap transition-colors",
                            on ? "bg-brand text-white" : "text-brand hover:bg-bg-soft"
                        )}
                    >
                        {filter.label}
                        <span
                            className={cn(
                                "rounded-full px-1.5 py-0.5 text-xs",
                                on ? "bg-white/15 text-white" : "bg-bg-soft text-ink-muted"
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

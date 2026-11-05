"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FilterPills from "@/app/_components/filter-pills";
import { noteTagColor, noteTagLabel, type NoteTag } from "../_content/types";

type Item = { slug: string; title: string; description: string; date: string; dateLabel: string; tag: NoteTag };

export default function NotesFilter({ notes }: { notes: Item[] }) {
    const [active, setActive] = useState<"all" | NoteTag>("all");

    const used = (Object.keys(noteTagLabel) as NoteTag[]).filter((t) => notes.some((n) => n.tag === t));
    const filters = [
        { id: "all" as const, label: "All", count: notes.length },
        ...used.map((t) => ({ id: t, label: noteTagLabel[t], count: notes.filter((n) => n.tag === t).length })),
    ];
    const shown = notes.filter((n) => active === "all" || n.tag === active);

    if (notes.length === 0) return <p className="text-lg text-ink-muted">First notes coming soon.</p>;

    return (
        <div className="flex flex-col gap-6">
            {used.length > 1 && <FilterPills filters={filters} active={active} onChange={setActive} label="Filter notes" />}
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {shown.map((n, i) => {
                    // newest note is the featured post across two columns
                    const featured = i === 0;
                    return (
                        <li key={n.slug} className={cn(featured && "md:col-span-2")}>
                            <Link
                                href={`/notes/${n.slug}`}
                                className={cn(
                                    "surface-card-interactive group flex h-full flex-col gap-4 p-5 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2",
                                    featured && "gap-5 sm:p-8"
                                )}
                            >
                                <span className="flex items-center justify-between gap-3">
                                    <time dateTime={n.date} className="text-sm text-ink-muted tabular-nums">
                                        {n.dateLabel}
                                    </time>
                                    <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold", noteTagColor[n.tag])}>{noteTagLabel[n.tag]}</span>
                                </span>
                                <span className={cn("flex flex-col gap-1.5", featured && "gap-3")}>
                                    <span
                                        className={cn(
                                            "text-[17px] leading-snug font-semibold tracking-[-0.01em] text-ink transition-colors group-hover:text-teal",
                                            featured && "text-[24px] leading-tight tracking-[-0.03em] text-balance sm:text-[32px]"
                                        )}
                                    >
                                        {n.title}
                                    </span>
                                    <span className={cn("text-[15px] leading-relaxed text-pretty text-ink-soft", featured && "max-w-[60ch] text-base sm:text-lg")}>
                                        {n.description}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

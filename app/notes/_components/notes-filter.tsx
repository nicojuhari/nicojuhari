"use client";

import { useState } from "react";
import Link from "next/link";
import FilterPills from "@/app/_components/filter-pills";
import { noteTagLabel, type NoteTag } from "../_content/types";

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
            <ul className="flex flex-col gap-3">
                {shown.map((n) => (
                    <li key={n.slug}>
                        <Link href={`/notes/${n.slug}`} className="surface-card-interactive flex flex-col gap-2 p-5 sm:p-6">
                            <span className="text-sm text-ink-muted">
                                <time dateTime={n.date}>{n.dateLabel}</time> · <span className="font-semibold text-teal">{noteTagLabel[n.tag]}</span>
                            </span>
                            <span className="text-xl font-semibold tracking-[-0.02em] text-ink">{n.title}</span>
                            <span className="text-[15px] leading-relaxed text-ink-soft">{n.description}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

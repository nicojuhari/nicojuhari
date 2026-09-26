"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import GroupSplit from "./group-split";
import QuickSplit from "./quick-split";

type Mode = "quick" | "group";

const MODES: { id: Mode; label: string; hint: string }[] = [
    { id: "group", label: "Group expenses", hint: "Trips, flats, shared costs" },
    { id: "quick", label: "Quick split", hint: "One bill, split evenly" },
];

export default function BillSplit() {
    const [mode, setMode] = useState<Mode>("group");

    return (
        <div>
            <div className="border-b border-line p-3 sm:p-4">
                <div role="tablist" aria-label="Calculator mode" className="grid grid-cols-2 gap-1 rounded-2xl bg-[#f4f3ef] p-1">
                    {MODES.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            role="tab"
                            aria-selected={mode === m.id}
                            onClick={() => setMode(m.id)}
                            className={cn(
                                "flex flex-col items-center justify-center rounded-xl px-3 py-2.5 transition-colors sm:py-3",
                                mode === m.id ? "bg-white text-ink shadow-[0_1px_2px_rgba(17,20,24,0.08)]" : "text-ink-muted hover:text-ink"
                            )}
                        >
                            <span className="text-sm font-semibold">{m.label}</span>
                            <span className="hidden text-xs text-ink-faint sm:block">{m.hint}</span>
                        </button>
                    ))}
                </div>
            </div>
            {mode === "quick" ? <QuickSplit /> : <GroupSplit />}
        </div>
    );
}

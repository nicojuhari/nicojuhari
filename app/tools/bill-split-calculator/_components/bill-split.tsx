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
            <div className="px-5 pt-5 sm:px-8 sm:pt-8">
                <div role="tablist" aria-label="Calculator mode" className="grid grid-cols-2 gap-1 rounded-[16px] bg-bg-soft p-1.5">
                    {MODES.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            role="tab"
                            aria-selected={mode === m.id}
                            onClick={() => setMode(m.id)}
                            className={cn(
                                "flex min-h-11 flex-col items-center justify-center rounded-[12px] px-3 py-2.5 transition-colors sm:py-3",
                                mode === m.id ? "bg-white text-ink shadow-[0_1px_3px_rgba(17,20,24,0.12)]" : "text-[#4a4f57] hover:text-ink"
                            )}
                        >
                            <span className="text-sm font-semibold">{m.label}</span>
                            <span className="hidden text-xs text-[#5b6068] sm:block">{m.hint}</span>
                        </button>
                    ))}
                </div>
            </div>
            {mode === "quick" ? <QuickSplit /> : <GroupSplit />}
        </div>
    );
}

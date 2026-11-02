"use client";

import { useId, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ArrowLeftToLine, Check, Copy, X } from "lucide-react";
import { Chip, Eyebrow, iconButton, inputClass, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import { CASES, FIXED_CASE, PRESETS, stats, transform, type CaseId, type PresetId } from "./transforms";

const MAX_LENGTH = 200_000;

/** Shows spaces as · and tabs as → so invisible characters can be checked */
function VisibleWhitespace({ text }: { text: string }) {
    const parts = text.split(/([ \t ])/);
    return (
        <>
            {parts.map((part, i) =>
                part === " " || part === " " ? (
                    <span key={i} className="text-teal/60">
                        ·
                    </span>
                ) : part === "\t" ? (
                    <span key={i} className="text-teal/60">
                        →
                    </span>
                ) : (
                    part
                )
            )}
        </>
    );
}

export default function WhitespaceRemover() {
    const id = useId();
    const [text, setText] = useState("");
    const [settings, setSettings] = useLocalStorage<{ preset: PresetId; caseMode: CaseId; separator: string }>(
        "nc_whitespace_settings",
        { preset: "collapse", caseMode: "none", separator: "-" },
        { initializeWithValue: false }
    );
    const [showSpaces, setShowSpaces] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copyError, setCopyError] = useState("");

    const { preset, caseMode, separator } = settings;
    const update = (patch: Partial<typeof settings>) => setSettings((prev) => ({ ...prev, ...patch }));
    const current = PRESETS.find((p) => p.id === preset) ?? PRESETS[0];
    const caseFixed = FIXED_CASE.includes(preset);

    const result = useMemo(() => transform(text, preset, separator, caseMode), [text, preset, separator, caseMode]);
    const before = useMemo(() => stats(text), [text]);
    const after = useMemo(() => stats(result), [result]);
    const removed = before.chars - after.chars;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);
            setCopyError("");
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setCopyError("Your browser blocked copying - select the result and copy it manually.");
        }
    };

    return (
        <div className="flex flex-col">
            {/* ── Options ── */}
            <div className="flex flex-col gap-5 p-5 pb-0 sm:p-8 sm:pb-0">
                <div className="flex flex-col gap-2.5">
                    <Eyebrow>What should happen?</Eyebrow>
                    <div role="group" aria-label="Clean-up preset" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                        {PRESETS.map((p) => (
                            <Chip key={p.id} active={preset === p.id} onClick={() => update({ preset: p.id })} className="h-auto min-h-11 px-3 py-2">
                                {p.label}
                            </Chip>
                        ))}
                    </div>
                    <p className="text-[13px] text-[#5b6068]">
                        {current.hint} <span className="font-semibold whitespace-pre-wrap text-ink">{current.example}</span>
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
                    {preset === "replace" && (
                        <div className="flex flex-col gap-2">
                            <label htmlFor={`${id}-sep`} className="text-sm font-semibold text-ink">
                                Separator
                            </label>
                            <div className="flex gap-1.5">
                                {["-", "_", ".", "/", "+"].map((s) => (
                                    <Chip key={s} active={separator === s} onClick={() => update({ separator: s })} className="w-11 text-base">
                                        {s}
                                    </Chip>
                                ))}
                                <input
                                    id={`${id}-sep`}
                                    value={separator}
                                    maxLength={5}
                                    onChange={(e) => update({ separator: e.target.value })}
                                    aria-label="Custom separator"
                                    placeholder="custom"
                                    className={cn(inputClass, "h-11 w-24 text-center")}
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex min-w-0 flex-col gap-2">
                        <span className="text-sm font-semibold text-ink">Letter case</span>
                        {caseFixed ? (
                            <p className="flex h-11 items-center text-[13px] text-[#5b6068]">Set by the {current.label} format.</p>
                        ) : (
                            <div role="group" aria-label="Letter case" className="flex flex-wrap gap-1.5">
                                {CASES.map((c) => (
                                    <Chip key={c.id} active={caseMode === c.id} onClick={() => update({ caseMode: c.id })} className="px-3.5">
                                        {c.label}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Input / output ── */}
            <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-2">
                <div className="flex flex-col gap-3 p-5 sm:p-8">
                    <div className="flex items-center justify-between gap-3">
                        <label htmlFor={`${id}-input`} className="text-sm font-semibold text-ink">
                            Your text
                        </label>
                        <span className="text-[13px] text-[#5b6068] tabular-nums">
                            {before.chars.toLocaleString()} chars · {before.lines} {before.lines === 1 ? "line" : "lines"}
                        </span>
                    </div>
                    <div className="relative">
                        <textarea
                            id={`${id}-input`}
                            value={text}
                            maxLength={MAX_LENGTH}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste or type your text here…"
                            spellCheck={false}
                            className={cn(inputClass, "h-auto min-h-64 resize-y py-3.5 pr-14 text-sm leading-relaxed lg:min-h-80")}
                        />
                        {text && (
                            <button
                                type="button"
                                onClick={() => setText("")}
                                aria-label="Clear text"
                                className={cn(iconButton, "absolute top-1.5 right-1.5 bg-white text-[#5b6068] hover:text-ink")}
                            >
                                <X className="size-4" aria-hidden />
                            </button>
                        )}
                    </div>
                    {text.length >= MAX_LENGTH && (
                        <p className="text-[13px] text-destructive">That’s the limit - {MAX_LENGTH.toLocaleString()} characters.</p>
                    )}
                </div>

                <div className="flex flex-col gap-3 p-5 pt-0 sm:p-8 sm:pt-0 lg:pt-8 lg:pl-0">
                    <div className="flex items-center justify-between gap-3">
                        <span id={`${id}-result`} className="text-sm font-semibold text-ink">
                            Result
                        </span>
                        <span className="text-[13px] text-[#5b6068] tabular-nums">
                            {after.chars.toLocaleString()} chars
                            {text && removed !== 0 && (
                                <span className={removed > 0 ? "text-teal" : ""}>
                                    {" "}
                                    ({removed > 0 ? `−${removed.toLocaleString()}` : `+${(-removed).toLocaleString()}`})
                                </span>
                            )}
                        </span>
                    </div>
                    <output
                        aria-labelledby={`${id}-result`}
                        aria-live="polite"
                        className={cn(
                            "block max-h-[480px] min-h-64 overflow-auto rounded-[24px] bg-[#e9ecf3] px-4 py-3.5 text-sm leading-relaxed break-words whitespace-pre-wrap text-ink sm:px-5 lg:min-h-80",
                            !result && "text-[#5b6068]"
                        )}
                    >
                        {result ? showSpaces ? <VisibleWhitespace text={result} /> : result : "The cleaned text appears here."}
                    </output>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <label className="flex min-h-11 items-center gap-2 text-[13px] text-[#4a4f57]">
                            <input type="checkbox" checked={showSpaces} onChange={(e) => setShowSpaces(e.target.checked)} className="size-5 accent-brand" />
                            Show spaces as ·
                        </label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setText(result)}
                                disabled={!result || result === text}
                                title="Replace your text with the result, to apply another step"
                                className={cn(secondaryButton, "h-11 flex-1 px-4 text-[13px] sm:flex-none")}
                            >
                                <ArrowLeftToLine className="size-4" aria-hidden />
                                Use as input
                            </button>
                            <button type="button" onClick={copy} disabled={!result} className={cn(primaryButton, "h-11 flex-1 px-5 text-[13px] sm:flex-none")}>
                                {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                                {copied ? "Copied" : "Copy result"}
                            </button>
                        </div>
                    </div>
                    {copyError && <p className="text-[13px] text-destructive">{copyError}</p>}
                </div>
            </div>
        </div>
    );
}

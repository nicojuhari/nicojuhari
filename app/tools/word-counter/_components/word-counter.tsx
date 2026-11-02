"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Check, Copy, X } from "lucide-react";
import { Eyebrow, inputClass, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import { computeStats, formatDuration, LIMITS, topWords } from "./text-stats";

const MAX_LENGTH = 500_000;

function Stat({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex min-w-0 flex-col gap-1 rounded-[20px] bg-bg-soft p-5">
            <dt className="text-sm text-[#5b6068]">{label}</dt>
            <dd className="text-2xl font-semibold xl:text-3xl tracking-[-0.03em] text-ink tabular-nums [overflow-wrap:anywhere]">
                {typeof value === "number" ? value.toLocaleString() : value}
            </dd>
        </div>
    );
}

export default function WordCounter() {
    const id = useId();
    const [text, setText] = useLocalStorage("nc_word_counter_text", "", { initializeWithValue: false });
    const [hideCommon, setHideCommon] = useState(true);
    const [copied, setCopied] = useState(false);

    // Counting a long text can take a moment - keep typing smooth
    const deferred = useDeferredValue(text);
    const stats = useMemo(() => computeStats(deferred), [deferred]);
    const words = useMemo(() => topWords(deferred, hideCommon), [deferred, hideCommon]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            /* clipboard blocked */
        }
    };

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
            {/* ── Text ── */}
            <div className="flex min-w-0 flex-col gap-3 p-5 sm:p-8">
                {/* Compact counter that stays visible on phones while typing */}
                <div className="sticky top-[76px] z-10 -mx-1 flex items-center justify-between gap-3 rounded-[14px] bg-white/95 px-4 py-3 text-[13px] text-ink tabular-nums shadow-[0_1px_3px_rgba(17,20,24,0.12)] backdrop-blur lg:hidden">
                    <span>
                        <strong className="font-semibold">{stats.words.toLocaleString()}</strong> words
                    </span>
                    <span>
                        <strong className="font-semibold">{stats.characters.toLocaleString()}</strong> chars
                    </span>
                    <span className="text-[#5b6068]">{formatDuration(stats.readingSeconds)} read</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <label htmlFor={`${id}-text`} className="text-sm font-semibold text-ink">
                        Your text
                    </label>
                    <span className="text-[13px] text-[#5b6068]">Saved in this browser only</span>
                </div>
                <textarea
                    id={`${id}-text`}
                    value={text}
                    maxLength={MAX_LENGTH}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here…"
                    className={cn(inputClass, "h-auto min-h-80 resize-y py-4 text-[15px] leading-relaxed lg:min-h-[520px]")}
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] text-[#5b6068]">
                        {text.length >= MAX_LENGTH ? `That’s the limit - ${MAX_LENGTH.toLocaleString()} characters.` : "Counts update as you type."}
                    </p>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setText("")} disabled={!text} className={cn(secondaryButton, "h-11 px-4 text-sm")}>
                            <X className="size-4" aria-hidden />
                            Clear
                        </button>
                        <button type="button" onClick={copy} disabled={!text} className={cn(secondaryButton, "h-11 px-4 text-sm")}>
                            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                            {copied ? "Copied" : "Copy text"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div>
                <div className="flex flex-col gap-8 p-5 pt-3 sm:p-8 sm:pt-4 lg:sticky lg:top-24 lg:pt-8 lg:pl-2">
                    <div className="flex flex-col gap-3">
                        <Eyebrow>Counts</Eyebrow>
                        <dl
                            aria-live="polite"
                            className="grid grid-cols-2 gap-2.5 [&>div:first-child]:bg-[#e3f1ee]"
                        >
                            <Stat label="Words" value={stats.words} />
                            <Stat label="Characters" value={stats.characters} />
                            <Stat label="Without spaces" value={stats.charactersNoSpaces} />
                            <Stat label="Sentences" value={stats.sentences} />
                            <Stat label="Paragraphs" value={stats.paragraphs} />
                            <Stat label="Reading time" value={formatDuration(stats.readingSeconds)} />
                        </dl>
                        <p className="text-[13px] text-[#5b6068]">Speaking time {formatDuration(stats.speakingSeconds)} · at 238 / 150 words per minute</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Eyebrow>Character limits</Eyebrow>
                        <ul className="flex flex-col gap-3">
                            {LIMITS.map((limit) => {
                                const over = stats.characters > limit.max;
                                const ratio = Math.min(1, stats.characters / limit.max);
                                return (
                                    <li key={limit.id} className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[13px]">
                                            <span className="font-medium text-ink">{limit.label}</span>
                                            <span className={cn("tabular-nums", over ? "font-semibold text-destructive" : "text-[#5b6068]")}>
                                                {stats.characters.toLocaleString()} / {limit.max.toLocaleString()}
                                                {over && ` (+${(stats.characters - limit.max).toLocaleString()})`}
                                            </span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-bg-soft">
                                            <div
                                                className={cn("h-full rounded-full transition-[width] duration-200", over ? "bg-destructive" : ratio > 0.9 ? "bg-amber-500" : "bg-teal")}
                                                style={{ width: `${ratio * 100}%` }}
                                            />
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-3">
                            <Eyebrow>Most used words</Eyebrow>
                            <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-[#4a4f57]">
                                <input type="checkbox" checked={hideCommon} onChange={(e) => setHideCommon(e.target.checked)} className="size-4 accent-brand" />
                                Hide common words
                            </label>
                        </div>
                        {words.length ? (
                            <ol className="flex flex-col rounded-[20px] bg-bg-soft p-2">
                                {words.map((w) => (
                                    <li key={w.word} className="flex items-center gap-3 rounded-[12px] px-3 py-2 even:bg-white/70">
                                        <span className="min-w-0 flex-1 truncate text-sm text-ink">{w.word}</span>
                                        <span className="text-[13px] text-[#5b6068] tabular-nums">{(w.share * 100).toFixed(1)}%</span>
                                        <span className="w-8 text-right text-sm font-semibold text-ink tabular-nums">{w.count}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="rounded-[20px] bg-bg-soft px-4 py-3.5 text-sm text-[#5b6068]">Words you repeat most will show here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

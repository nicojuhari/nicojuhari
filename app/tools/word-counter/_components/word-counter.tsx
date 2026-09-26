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
        <div className="flex flex-col gap-1 border-line px-4 py-3.5 odd:border-r [&:nth-child(n+3)]:border-t">
            <dt className="text-xs text-ink-faint">{label}</dt>
            <dd className="font-mono text-xl font-semibold tracking-[-0.02em] text-ink tabular-nums">
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
                <div className="sticky top-[76px] z-10 -mx-1 flex items-center justify-between gap-3 rounded-xl border border-rule bg-white/95 px-3.5 py-2.5 font-mono text-[13px] text-ink shadow-[0_4px_16px_-10px_rgba(22,40,77,0.3)] backdrop-blur lg:hidden">
                    <span>
                        <strong className="font-semibold">{stats.words.toLocaleString()}</strong> words
                    </span>
                    <span>
                        <strong className="font-semibold">{stats.characters.toLocaleString()}</strong> chars
                    </span>
                    <span className="text-ink-faint">{formatDuration(stats.readingSeconds)} read</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <label htmlFor={`${id}-text`} className="text-sm font-semibold text-ink">
                        Your text
                    </label>
                    <span className="text-xs text-ink-faint">Saved in this browser only</span>
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
                    <p className="text-xs text-ink-faint">
                        {text.length >= MAX_LENGTH ? `That’s the limit - ${MAX_LENGTH.toLocaleString()} characters.` : "Counts update as you type."}
                    </p>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setText("")} disabled={!text} className={cn(secondaryButton, "h-10 px-4 text-[13px]")}>
                            <X className="size-4" aria-hidden />
                            Clear
                        </button>
                        <button type="button" onClick={copy} disabled={!text} className={cn(secondaryButton, "h-10 px-4 text-[13px]")}>
                            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                            {copied ? "Copied" : "Copy text"}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Stats ── */}
            <div className="border-t border-rule bg-[#f5f7fb] lg:border-t-0 lg:border-l">
                <div className="flex flex-col gap-6 p-5 sm:p-8 lg:sticky lg:top-24">
                    <div className="flex flex-col gap-3">
                        <Eyebrow>Counts</Eyebrow>
                        <dl
                            aria-live="polite"
                            className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#dce1eb] bg-white"
                        >
                            <Stat label="Words" value={stats.words} />
                            <Stat label="Characters" value={stats.characters} />
                            <Stat label="Without spaces" value={stats.charactersNoSpaces} />
                            <Stat label="Sentences" value={stats.sentences} />
                            <Stat label="Paragraphs" value={stats.paragraphs} />
                            <Stat label="Reading time" value={formatDuration(stats.readingSeconds)} />
                        </dl>
                        <p className="text-xs text-ink-faint">Speaking time {formatDuration(stats.speakingSeconds)} · at 238 / 150 words per minute</p>
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
                                            <span className={cn("font-mono", over ? "font-semibold text-destructive" : "text-ink-faint")}>
                                                {stats.characters.toLocaleString()} / {limit.max.toLocaleString()}
                                                {over && ` (+${(stats.characters - limit.max).toLocaleString()})`}
                                            </span>
                                        </div>
                                        <div className="h-1.5 overflow-hidden rounded-full bg-[#dfe4ee]">
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
                            <label className="flex items-center gap-1.5 text-xs text-ink-muted">
                                <input type="checkbox" checked={hideCommon} onChange={(e) => setHideCommon(e.target.checked)} className="size-3.5 accent-brand" />
                                Hide common words
                            </label>
                        </div>
                        {words.length ? (
                            <ol className="flex flex-col rounded-2xl border border-[#dce1eb] bg-white">
                                {words.map((w, i) => (
                                    <li key={w.word} className={cn("flex items-center gap-3 px-4 py-2", i > 0 && "border-t border-line")}>
                                        <span className="min-w-0 flex-1 truncate text-sm text-ink">{w.word}</span>
                                        <span className="font-mono text-xs text-ink-faint">{(w.share * 100).toFixed(1)}%</span>
                                        <span className="w-8 text-right font-mono text-sm font-semibold text-ink">{w.count}</span>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="rounded-2xl border border-[#dce1eb] bg-white px-4 py-3 text-sm text-ink-faint">Words you repeat most will show here.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

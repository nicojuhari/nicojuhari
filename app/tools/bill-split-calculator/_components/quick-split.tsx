"use client";

import { useId, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Check, Copy, Minus, Plus } from "lucide-react";
import { Chip, Eyebrow, Field, inputClass, invalidProps, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import { allocate, CURRENCY_OPTIONS, formatMoney, parseMoney, type Currency } from "./money";

const TIPS = [0, 5, 10, 15, 20];
const ROUNDING = [
    { id: 0, label: "Exact" },
    { id: 50, label: "0.50" },
    { id: 100, label: "1.00" },
];
const MAX_PEOPLE = 50;

export default function QuickSplit() {
    const id = useId();
    const [total, setTotal] = useState("");
    const [tip, setTip] = useState(10);
    const [customTip, setCustomTip] = useState("");
    const [people, setPeople] = useState(2);
    const [roundTo, setRoundTo] = useState(0);
    const [currency, setCurrency] = useLocalStorage<Currency>("nc_bill_quick_currency", "EUR", { initializeWithValue: false });
    const [copied, setCopied] = useState(false);

    const cents = parseMoney(total);
    const totalError = total.trim() && cents === null ? "Enter an amount like 84.50 or 84,50" : "";

    const usingCustom = customTip !== "";
    const customValue = Number(customTip.replace(",", "."));
    const tipError = usingCustom && (!Number.isFinite(customValue) || customValue < 0 || customValue > 100) ? "Use a tip between 0 and 100%" : "";
    const tipPercent = usingCustom ? (tipError ? 0 : customValue) : tip;

    const money = (c: number) => formatMoney(c, currency);
    const ready = cents !== null && !tipError;
    const tipCents = ready ? Math.round((cents * tipPercent) / 100) : 0;
    const grand = ready ? cents + tipCents : 0;
    const parts = ready ? allocate(grand, Array.from({ length: people }, () => 1)) : [];
    const high = parts.length ? Math.max(...parts) : 0;
    const low = parts.length ? Math.min(...parts) : 0;
    const perPerson = roundTo ? Math.ceil(high / roundTo) * roundTo : high;
    const collected = roundTo ? perPerson * people : grand;
    const extra = collected - grand;

    const copy = async () => {
        if (!ready) return;
        const text = `Bill ${money(cents)}${tipPercent ? ` + ${tipPercent}% tip` : ""} = ${money(grand)} → ${money(perPerson)} each (${people} people)`;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard blocked - nothing else to do */
        }
    };

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]">
            <div className="flex flex-col gap-6 p-5 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
                    <Field label="Bill total" htmlFor={`${id}-total`} error={totalError}>
                        <input
                            id={`${id}-total`}
                            inputMode="decimal"
                            autoComplete="off"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            placeholder="84.50"
                            className={cn(inputClass, "text-lg font-semibold")}
                            {...invalidProps(`${id}-total`, totalError)}
                        />
                    </Field>
                    <Field label="Currency" htmlFor={`${id}-currency`}>
                        <select
                            id={`${id}-currency`}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as Currency)}
                            className={cn(inputClass, "cursor-pointer")}
                        >
                            {CURRENCY_OPTIONS.map((c) => (
                                <option key={c.value} value={c.value}>
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </Field>
                </div>

                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-ink">Tip</span>
                    <div role="group" aria-label="Tip" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {TIPS.map((t) => (
                            <Chip
                                key={t}
                                active={!usingCustom && tip === t}
                                onClick={() => {
                                    setTip(t);
                                    setCustomTip("");
                                }}
                            >
                                {t === 0 ? "None" : `${t}%`}
                            </Chip>
                        ))}
                        <label className="relative">
                            <span className="sr-only">Custom tip percent</span>
                            <input
                                inputMode="decimal"
                                value={customTip}
                                onChange={(e) => setCustomTip(e.target.value)}
                                placeholder="Other"
                                className={cn(
                                    "h-11 w-full rounded-[12px] border-2 border-transparent pr-6 pl-2 text-center text-sm font-semibold outline-none transition-colors placeholder:font-semibold placeholder:text-ink focus:border-teal",
                                    usingCustom ? "bg-brand text-white" : "bg-bg-soft text-ink",
                                    tipError && "border-destructive"
                                )}
                                aria-invalid={Boolean(tipError)}
                            />
                            <span className={cn("pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[13px]", usingCustom ? "text-white" : "text-[#5b6068]")}>%</span>
                        </label>
                    </div>
                    {tipError && <p className="text-[13px] text-destructive">{tipError}</p>}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2.5">
                        <span id={`${id}-people`} className="text-sm font-semibold text-ink">
                            People
                        </span>
                        <div className="flex h-[52px] items-center justify-between rounded-[14px] bg-bg-soft p-1" aria-labelledby={`${id}-people`}>
                            <button
                                type="button"
                                onClick={() => setPeople((n) => Math.max(1, n - 1))}
                                disabled={people <= 1}
                                aria-label="One person fewer"
                                className="flex size-11 items-center justify-center rounded-[12px] bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-30"
                            >
                                <Minus className="size-4" aria-hidden />
                            </button>
                            <span className="text-lg font-semibold text-ink tabular-nums" aria-live="polite">
                                {people}
                            </span>
                            <button
                                type="button"
                                onClick={() => setPeople((n) => Math.min(MAX_PEOPLE, n + 1))}
                                disabled={people >= MAX_PEOPLE}
                                aria-label="One more person"
                                className="flex size-11 items-center justify-center rounded-[12px] bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-30"
                            >
                                <Plus className="size-4" aria-hidden />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">Round each share up to</span>
                        <div role="group" aria-label="Rounding" className="grid grid-cols-3 gap-2">
                            {ROUNDING.map((r) => (
                                <Chip key={r.id} active={roundTo === r.id} onClick={() => setRoundTo(r.id)}>
                                    {r.label}
                                </Chip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 sm:px-8 sm:pb-8 lg:pt-8 lg:pl-0">
                <div className="flex flex-col gap-5 rounded-[24px] bg-[#e9ecf3] p-5 sm:p-6">
                    <Eyebrow>Each person pays</Eyebrow>
                    <p className="text-[44px] leading-none font-semibold tracking-[-0.03em] text-ink tabular-nums sm:text-[52px]" aria-live="polite">
                        {ready ? money(perPerson) : "-"}
                    </p>
                    {ready && !roundTo && high !== low && (
                        <p className="-mt-2 text-[13px] text-[#5b6068]">
                            Exact: {parts.filter((p) => p === high).length} pay {money(high)}, the rest {money(low)}.
                        </p>
                    )}

                    <dl className="flex flex-col rounded-[20px] bg-white p-1.5 text-sm">
                        {[
                            ["Bill", ready ? money(cents) : "-"],
                            [`Tip${tipPercent ? ` (${tipPercent}%)` : ""}`, ready ? money(tipCents) : "-"],
                            ["Total", ready ? money(grand) : "-"],
                            ...(roundTo && ready ? [["Collected after rounding", `${money(collected)} (+${money(extra)})`]] : []),
                        ].map(([label, value]) => (
                            <div key={label} className={cn("flex justify-between gap-4 rounded-[14px] px-3.5 py-2.5", label === "Total" && "bg-bg-soft")}>
                                <dt className="text-[#4a4f57]">{label}</dt>
                                <dd className={cn("text-right text-ink tabular-nums", label === "Total" && "font-semibold")}>{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <button type="button" onClick={copy} disabled={!ready} className={cn(secondaryButton, "bg-white hover:bg-white/80")}>
                        {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                        {copied ? "Copied" : "Copy result"}
                    </button>
                </div>
            </div>
        </div>
    );
}

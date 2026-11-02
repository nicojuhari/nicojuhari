"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ArrowRight, Check, Copy, ListOrdered, Pencil, Plus, Trash2, Undo2, X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Chip, Eyebrow, Field, iconButton, inputClass, invalidProps, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import {
    balances,
    expenseShares,
    migrateOld,
    newGroup,
    settleUp,
    summaryText,
    transactionsText,
    uid,
    type Expense,
    type Group,
    type SplitMode,
} from "./bill-data";
import { allocate, centsToInput, CURRENCY_OPTIONS, formatMoney, parseMoney, type Currency } from "./money";

const STORE_KEY = "nc_bill_group";
/** Stable default so the storage hook doesn't create a new group on every read */
const DEFAULT_GROUP = newGroup();
const MAX_NAME = 30;

const SPLIT_MODES: { id: SplitMode; label: string }[] = [
    { id: "equal", label: "Equally" },
    { id: "exact", label: "Exact amounts" },
    { id: "shares", label: "By shares" },
];

type ExpenseForm = {
    title: string;
    amount: string;
    paidBy: string;
    mode: SplitMode;
    /** null = everyone in the group */
    participants: string[] | null;
    values: Record<string, string>;
};

const EMPTY_FORM: ExpenseForm = { title: "", amount: "", paidBy: "", mode: "equal", participants: null, values: {} };

type FormErrors = Partial<Record<"amount" | "paidBy" | "participants" | "split", string>>;

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">{title}</h2>
                {action}
            </div>
            {children}
        </section>
    );
}

export default function GroupSplit() {
    const id = useId();
    const [group, setGroup] = useLocalStorage<Group>(STORE_KEY, DEFAULT_GROUP, { initializeWithValue: false });

    const [personName, setPersonName] = useState("");
    const [personError, setPersonError] = useState("");
    const [renaming, setRenaming] = useState<{ id: string; name: string } | null>(null);
    const [form, setForm] = useState<ExpenseForm>(EMPTY_FORM);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [undo, setUndo] = useState<{ label: string; restore: () => void } | null>(null);
    const [notice, setNotice] = useState("");

    // One-time: bring over data from the previous version
    useEffect(() => {
        if (!localStorage.getItem(STORE_KEY)) {
            const old = migrateOld(localStorage.getItem("nc_bill_friends"), localStorage.getItem("nc_bill_expenses"));
            if (old) setGroup(old);
        }
        localStorage.removeItem("nc_bill_v2");
        localStorage.removeItem("nc_bill_friends");
        localStorage.removeItem("nc_bill_expenses");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateGroup = (fn: (g: Group) => Group) => setGroup((prev) => fn(prev));

    const money = (c: number) => formatMoney(c, group.currency);
    const nameOf = (pid: string) => group.people.find((p) => p.id === pid)?.name ?? "Unknown";
    const flash = (text: string) => {
        setNotice(text);
        window.setTimeout(() => setNotice(""), 2200);
    };

    // ─── People ──────────────────────────────────────────────────────────────

    const nameTaken = (name: string, except?: string) =>
        group.people.some((p) => p.id !== except && p.name.toLowerCase() === name.toLowerCase());

    const addPerson = () => {
        const name = personName.trim();
        if (!name) return;
        if (nameTaken(name)) return setPersonError(`${name} is already in this group`);
        updateGroup((g) => ({ ...g, people: [...g.people, { id: uid(), name }] }));
        setPersonName("");
        setPersonError("");
    };

    const saveRename = () => {
        if (!renaming) return;
        const name = renaming.name.trim();
        if (!name) return setPersonError("A name can’t be empty");
        if (nameTaken(name, renaming.id)) return setPersonError(`${name} is already in this group`);
        updateGroup((g) => ({ ...g, people: g.people.map((p) => (p.id === renaming.id ? { ...p, name } : p)) }));
        setRenaming(null);
        setPersonError("");
    };

    const removePerson = (pid: string) => {
        const used =
            group.expenses.some((e) => e.paidBy === pid || e.participants.includes(pid)) ||
            group.payments.some((p) => p.from === pid || p.to === pid);
        if (used) return setPersonError(`${nameOf(pid)} is part of an expense - edit or delete those expenses first.`);
        setPersonError("");
        updateGroup((g) => ({ ...g, people: g.people.filter((p) => p.id !== pid) }));
    };

    // ─── Expense form ────────────────────────────────────────────────────────

    const participants = (form.participants ?? group.people.map((p) => p.id)).filter((pid) => group.people.some((p) => p.id === pid));
    const amountCents = parseMoney(form.amount);

    const exactCents = (pid: string) => parseMoney(form.values[pid] ?? "") ?? 0;
    const shareCount = (pid: string) => {
        const n = Number(form.values[pid] ?? "1");
        return Number.isInteger(n) && n > 0 && n <= 100 ? n : NaN;
    };

    const exactTotal = participants.reduce((a, pid) => a + exactCents(pid), 0);
    const exactLeft = amountCents !== null ? amountCents - exactTotal : 0;

    const participantKey = participants.join();
    const preview: Record<string, number> = useMemo(() => {
        if (amountCents === null || !participants.length) return {};
        if (form.mode === "exact") return Object.fromEntries(participants.map((pid) => [pid, exactCents(pid)]));
        const weights = participants.map((pid) => (form.mode === "shares" ? shareCount(pid) || 0 : 1));
        const parts = allocate(amountCents, weights);
        return Object.fromEntries(participants.map((pid, i) => [pid, parts[i]]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amountCents, form.mode, form.values, participantKey]);

    const validate = (): FormErrors => {
        const errors: FormErrors = {};
        if (amountCents === null) errors.amount = form.amount.trim() ? "Enter an amount like 42.50 or 42,50" : "Enter the amount";
        if (!group.people.some((p) => p.id === form.paidBy)) errors.paidBy = "Choose who paid";
        if (!participants.length) errors.participants = "Pick at least one person";
        if (form.mode === "exact" && amountCents !== null && participants.length) {
            const bad = participants.find((pid) => (form.values[pid] ?? "").trim() && parseMoney(form.values[pid]) === null);
            if (bad) errors.split = `Check the amount for ${nameOf(bad)}`;
            else if (exactLeft !== 0)
                errors.split = exactLeft > 0 ? `${money(exactLeft)} still to assign` : `${money(-exactLeft)} more than the total`;
        }
        if (form.mode === "shares" && participants.some((pid) => Number.isNaN(shareCount(pid)))) {
            errors.split = "Shares are whole numbers from 1 to 100";
        }
        return errors;
    };

    const errors = submitted ? validate() : {};

    const resetForm = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setSubmitted(false);
    };

    const saveExpense = () => {
        setSubmitted(true);
        const errs = validate();
        if (Object.keys(errs).length || amountCents === null) return;

        const values: Record<string, number> = {};
        if (form.mode === "exact") participants.forEach((pid) => (values[pid] = exactCents(pid)));
        if (form.mode === "shares") participants.forEach((pid) => (values[pid] = shareCount(pid)));

        const expense: Expense = {
            id: editingId ?? uid(),
            title: form.title.trim() || "Expense",
            amount: amountCents,
            paidBy: form.paidBy,
            mode: form.mode,
            participants,
            values,
        };
        updateGroup((g) => ({
            ...g,
            expenses: editingId ? g.expenses.map((e) => (e.id === editingId ? expense : e)) : [...g.expenses, expense],
        }));
        flash(editingId ? "Expense updated" : "Expense added");
        resetForm();
    };

    const editExpense = (e: Expense) => {
        setEditingId(e.id);
        setSubmitted(false);
        setForm({
            title: e.title,
            amount: centsToInput(e.amount),
            paidBy: e.paidBy,
            mode: e.mode,
            participants: e.participants,
            values: Object.fromEntries(
                Object.entries(e.values).map(([pid, v]) => [pid, e.mode === "exact" ? centsToInput(v) : String(v)])
            ),
        });
        document.getElementById(`${id}-expense`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const deleteExpense = (e: Expense) => {
        const index = group.expenses.findIndex((x) => x.id === e.id);
        updateGroup((g) => ({ ...g, expenses: g.expenses.filter((x) => x.id !== e.id) }));
        if (editingId === e.id) resetForm();
        setUndo({
            label: `Deleted “${e.title}”`,
            restore: () =>
                updateGroup((g) => {
                    const list = [...g.expenses];
                    list.splice(index, 0, e);
                    return { ...g, expenses: list };
                }),
        });
    };

    const toggleParticipant = (pid: string) =>
        setForm((f) => {
            const current = f.participants ?? group.people.map((p) => p.id);
            const next = current.includes(pid) ? current.filter((x) => x !== pid) : [...current, pid];
            return { ...f, participants: group.people.map((p) => p.id).filter((x) => next.includes(x)) };
        });

    // ─── Summary ─────────────────────────────────────────────────────────────

    const list = useMemo(() => balances(group), [group]);
    const transfers = useMemo(() => settleUp(list), [list]);
    const total = group.expenses.reduce((a, e) => a + e.amount, 0);

    const markPaid = (t: { from: string; to: string; amount: number }) =>
        updateGroup((g) => ({ ...g, payments: [...g.payments, { id: uid(), ...t }] }));

    const copyText = async (text: string, done: string) => {
        try {
            await navigator.clipboard.writeText(text);
            flash(done);
        } catch {
            flash("Couldn’t copy - your browser blocked the clipboard");
        }
    };

    const clearAll = () => {
        setGroup((prev) => newGroup(prev.currency));
        resetForm();
        setPersonError("");
        setRenaming(null);
        setUndo(null);
    };

    const canAddExpense = group.people.length >= 1;

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(340px,440px)]">
                {/* ── Left: people + expense form ── */}
                <div className="flex flex-col gap-8 p-5 sm:p-8">
                    <Card title="People">
                        <div className="flex gap-2">
                            <label htmlFor={`${id}-person`} className="sr-only">
                                Name
                            </label>
                            <input
                                id={`${id}-person`}
                                value={personName}
                                maxLength={MAX_NAME}
                                onChange={(e) => {
                                    setPersonName(e.target.value);
                                    setPersonError("");
                                }}
                                onKeyDown={(e) => e.key === "Enter" && addPerson()}
                                placeholder="Add a name"
                                autoComplete="off"
                                className={inputClass}
                            />
                            <button type="button" onClick={addPerson} disabled={!personName.trim()} className={cn(primaryButton, "shrink-0 px-4")}>
                                <Plus className="size-4" aria-hidden />
                                Add
                            </button>
                        </div>
                        {personError && (
                            <p role="alert" className="text-[13px] text-destructive">
                                {personError}
                            </p>
                        )}
                        {group.people.length > 0 ? (
                            <ul className="flex flex-wrap gap-2">
                                {group.people.map((p) =>
                                    renaming?.id === p.id ? (
                                        <li key={p.id} className="flex items-center gap-1">
                                            <input
                                                autoFocus
                                                aria-label={`Rename ${p.name}`}
                                                value={renaming.name}
                                                maxLength={MAX_NAME}
                                                onChange={(e) => setRenaming({ id: p.id, name: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveRename();
                                                    if (e.key === "Escape") setRenaming(null);
                                                }}
                                                className={cn(inputClass, "h-11 w-36 rounded-full px-4 text-sm")}
                                            />
                                            <button type="button" onClick={saveRename} aria-label="Save name" className={cn(iconButton, "bg-[#e3f1ee] text-teal hover:bg-[#d5ebe6]")}>
                                                <Check className="size-4" aria-hidden />
                                            </button>
                                        </li>
                                    ) : (
                                        <li key={p.id} className="flex h-11 items-center rounded-full bg-bg-soft pl-4 text-sm font-medium text-ink">
                                            {p.name}
                                            <button
                                                type="button"
                                                onClick={() => setRenaming({ id: p.id, name: p.name })}
                                                aria-label={`Rename ${p.name}`}
                                                className="ml-1 flex size-11 items-center justify-center rounded-full text-[#5b6068] transition-colors hover:bg-[#ece9e2] hover:text-ink"
                                            >
                                                <Pencil className="size-3.5" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removePerson(p.id)}
                                                aria-label={`Remove ${p.name}`}
                                                className="flex size-11 items-center justify-center rounded-full text-[#5b6068] transition-colors hover:bg-[#f3e7ec] hover:text-destructive"
                                            >
                                                <X className="size-3.5" aria-hidden />
                                            </button>
                                        </li>
                                    )
                                )}
                            </ul>
                        ) : (
                            <p className="text-sm text-[#5b6068]">Add everyone who shares costs - at least two people.</p>
                        )}
                    </Card>

                    <div id={`${id}-expense`} className="scroll-mt-28">
                        <Card
                            title={editingId ? "Edit expense" : "Add an expense"}
                            action={
                                editingId && (
                                    <button type="button" onClick={resetForm} className="inline-flex min-h-11 items-center text-[13px] font-semibold text-[#4a4f57] hover:text-ink">
                                        Cancel editing
                                    </button>
                                )
                            }
                        >
                            {!canAddExpense ? (
                                <p className="rounded-[20px] bg-bg-soft px-4 py-6 text-center text-sm text-[#5b6068]">
                                    Add people first, then log what each person paid.
                                </p>
                            ) : (
                                <div className="flex flex-col gap-5">
                                    <div className="grid gap-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
                                        <Field label="What for?" htmlFor={`${id}-title`}>
                                            <input
                                                id={`${id}-title`}
                                                value={form.title}
                                                maxLength={60}
                                                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                                placeholder="Dinner, tickets, groceries…"
                                                className={inputClass}
                                            />
                                        </Field>
                                        <Field label={group.currency ? `Amount (${group.currency})` : "Amount"} htmlFor={`${id}-amount`} error={errors.amount}>
                                            <input
                                                id={`${id}-amount`}
                                                inputMode="decimal"
                                                autoComplete="off"
                                                value={form.amount}
                                                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                                                placeholder="42.50"
                                                className={cn(inputClass, "font-semibold")}
                                                {...invalidProps(`${id}-amount`, errors.amount)}
                                            />
                                        </Field>
                                    </div>

                                    <Field label="Paid by" htmlFor={`${id}-paid`} error={errors.paidBy}>
                                        <select
                                            id={`${id}-paid`}
                                            value={form.paidBy}
                                            onChange={(e) => setForm((f) => ({ ...f, paidBy: e.target.value }))}
                                            className={cn(inputClass, "cursor-pointer", !form.paidBy && "text-[#5b6068]")}
                                            {...invalidProps(`${id}-paid`, errors.paidBy)}
                                        >
                                            <option value="">Choose a person</option>
                                            {group.people.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>

                                    <div className="flex flex-col gap-2.5">
                                        <span className="text-sm font-semibold text-ink">Split</span>
                                        <div role="group" aria-label="How to split" className="grid grid-cols-3 gap-2">
                                            {SPLIT_MODES.map((m) => (
                                                <Chip key={m.id} active={form.mode === m.id} onClick={() => setForm((f) => ({ ...f, mode: m.id, values: {} }))}>
                                                    {m.label}
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-ink">Between</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setForm((f) => ({
                                                        ...f,
                                                        participants: participants.length === group.people.length ? [] : null,
                                                    }))
                                                }
                                                className="inline-flex min-h-11 items-center text-[13px] font-semibold text-brand hover:text-teal"
                                            >
                                                {participants.length === group.people.length ? "Clear all" : "Select everyone"}
                                            </button>
                                        </div>
                                        <ul className="flex flex-col gap-1 rounded-[20px] bg-bg-soft p-1.5">
                                            {group.people.map((p) => {
                                                const on = participants.includes(p.id);
                                                return (
                                                    <li key={p.id} className="flex min-h-13 items-center gap-3 rounded-[14px] bg-white px-3.5 py-1.5">
                                                        <label className="flex flex-1 cursor-pointer items-center gap-3 py-2 text-sm font-medium text-ink">
                                                            <input
                                                                type="checkbox"
                                                                checked={on}
                                                                onChange={() => toggleParticipant(p.id)}
                                                                className="size-[18px] accent-brand"
                                                            />
                                                            {p.name}
                                                        </label>
                                                        {on && form.mode === "exact" && (
                                                            <input
                                                                inputMode="decimal"
                                                                aria-label={`Amount for ${p.name}`}
                                                                value={form.values[p.id] ?? ""}
                                                                onChange={(e) => setForm((f) => ({ ...f, values: { ...f.values, [p.id]: e.target.value } }))}
                                                                placeholder="0.00"
                                                                className={cn(inputClass, "h-11 w-28 rounded-[12px] px-3 text-right text-sm tabular-nums")}
                                                            />
                                                        )}
                                                        {on && form.mode === "shares" && (
                                                            <input
                                                                inputMode="numeric"
                                                                aria-label={`Shares for ${p.name}`}
                                                                value={form.values[p.id] ?? "1"}
                                                                onChange={(e) => setForm((f) => ({ ...f, values: { ...f.values, [p.id]: e.target.value } }))}
                                                                className={cn(inputClass, "h-11 w-16 rounded-[12px] px-3 text-center text-sm tabular-nums")}
                                                            />
                                                        )}
                                                        {on && form.mode !== "exact" && preview[p.id] !== undefined && (
                                                            <span className="w-24 text-right text-[13px] text-[#5b6068] tabular-nums">{money(preview[p.id])}</span>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                        {form.mode === "exact" && amountCents !== null && participants.length > 0 && !errors.split && (
                                            <p className={cn("text-[13px]", exactLeft === 0 ? "text-teal" : "text-[#5b6068]")}>
                                                {exactLeft === 0
                                                    ? "Everything assigned"
                                                    : exactLeft > 0
                                                      ? `${money(exactLeft)} left to assign`
                                                      : `${money(-exactLeft)} over the total`}
                                            </p>
                                        )}
                                        {(errors.participants || errors.split) && (
                                            <p role="alert" className="text-[13px] text-destructive">
                                                {errors.participants ?? errors.split}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                                        {editingId && (
                                            <button type="button" onClick={resetForm} className={secondaryButton}>
                                                Cancel
                                            </button>
                                        )}
                                        <button type="button" onClick={saveExpense} className={primaryButton}>
                                            {editingId ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                                            {editingId ? "Save changes" : "Add expense"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>

                {/* ── Right: summary ── */}
                <div className="px-5 pb-5 sm:px-8 sm:pb-8 lg:pt-8 lg:pl-0">
                    <div className="flex flex-col gap-6 rounded-[24px] bg-[#e9ecf3] p-5 sm:p-6 lg:sticky lg:top-24">
                        <div className="flex flex-col gap-2 rounded-[20px] bg-brand p-5 text-white">
                            <Eyebrow className="text-white">Total spent</Eyebrow>
                            <p className="text-[40px] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums">{money(total)}</p>
                            <p className="text-[13px] text-white/80">
                                {group.expenses.length} {group.expenses.length === 1 ? "expense" : "expenses"} · {group.people.length}{" "}
                                {group.people.length === 1 ? "person" : "people"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Eyebrow>Settle up</Eyebrow>
                            {transfers.length > 0 ? (
                                <ul className="flex flex-col gap-2">
                                    {transfers.map((t) => (
                                        <li key={`${t.from}-${t.to}`} className="flex items-center gap-3 rounded-[20px] bg-white py-2 pr-2 pl-4">
                                            <span className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1.5 text-sm text-ink">
                                                <strong className="font-semibold">{nameOf(t.from)}</strong>
                                                <ArrowRight className="size-3.5 text-[#5b6068]" aria-label="pays" />
                                                <strong className="font-semibold">{nameOf(t.to)}</strong>
                                            </span>
                                            <span className="text-sm font-semibold text-ink tabular-nums">{money(t.amount)}</span>
                                            <button
                                                type="button"
                                                onClick={() => markPaid(t)}
                                                className="h-11 shrink-0 rounded-full bg-[#e3f1ee] px-4 text-[13px] font-semibold text-teal transition-colors hover:bg-[#d5ebe6]"
                                            >
                                                Mark paid
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="rounded-[20px] bg-white px-4 py-3 text-sm text-[#4a4f57]">
                                    {group.expenses.length ? "Everyone is settled up." : "Payments to settle up will show here."}
                                </p>
                            )}
                            {group.payments.length > 0 && (
                                <ul className="flex flex-col gap-1">
                                    {group.payments.map((p) => (
                                        <li key={p.id} className="flex items-center justify-between gap-2 text-[13px] text-[#4a4f57]">
                                            <span className="flex items-center gap-1.5">
                                                <Check className="size-3.5 text-teal" aria-hidden />
                                                {nameOf(p.from)} paid {nameOf(p.to)} {money(p.amount)}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateGroup((g) => ({ ...g, payments: g.payments.filter((x) => x.id !== p.id) }))}
                                                className="inline-flex min-h-11 items-center px-2 font-semibold text-brand hover:text-teal"
                                            >
                                                Undo
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {group.people.length > 0 && group.expenses.length > 0 && (
                            <div className="flex flex-col gap-3">
                                <Eyebrow>Balances</Eyebrow>
                                <ul className="flex flex-col gap-1 rounded-[20px] bg-white p-1.5">
                                    {list.map((b) => (
                                        <li key={b.id} className="flex items-center justify-between gap-3 rounded-[14px] px-3.5 py-2.5">
                                            <span className="flex min-w-0 flex-col">
                                                <span className="truncate text-sm font-semibold text-ink">{nameOf(b.id)}</span>
                                                <span className="text-xs text-[#5b6068]">
                                                    paid {money(b.paid)} · share {money(b.share)}
                                                </span>
                                            </span>
                                            <span
                                                className={cn(
                                                    "shrink-0 text-sm font-semibold tabular-nums",
                                                    b.net > 0 ? "text-teal" : b.net < 0 ? "text-[#a2471a]" : "text-[#5b6068]"
                                                )}
                                            >
                                                {b.net > 0 ? `gets ${money(b.net)}` : b.net < 0 ? `owes ${money(-b.net)}` : "even"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => copyText(summaryText(group), "Summary copied - paste it in your group chat")}
                                disabled={!group.expenses.length}
                                className={cn(secondaryButton, "bg-white px-3 hover:bg-white/80")}
                            >
                                <Copy className="size-4" aria-hidden />
                                Copy summary
                            </button>
                            <button
                                type="button"
                                onClick={() => copyText(transactionsText(group), "All transactions copied")}
                                disabled={!group.expenses.length}
                                className={cn(secondaryButton, "bg-white px-3 hover:bg-white/80")}
                            >
                                <ListOrdered className="size-4" aria-hidden />
                                Copy transactions
                            </button>
                        </div>
                        <p aria-live="polite" className="-mt-3 min-h-5 text-center text-xs text-[#4a4f57]">
                            {notice}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Expenses ── */}
            <div className="flex flex-col gap-4 p-5 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">Expenses</h2>
                    {undo && (
                        <span className="flex items-center gap-2 text-[13px] text-[#4a4f57]">
                            {undo.label}
                            <button
                                type="button"
                                onClick={() => {
                                    undo.restore();
                                    setUndo(null);
                                }}
                                className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand hover:text-teal"
                            >
                                <Undo2 className="size-3.5" aria-hidden />
                                Undo
                            </button>
                        </span>
                    )}
                </div>
                {group.expenses.length ? (
                    <ul className="flex flex-col gap-1.5">
                        {group.expenses.map((e) => {
                            const shares = expenseShares(e);
                            const between =
                                e.participants.length === group.people.length
                                    ? "everyone"
                                    : e.participants.map(nameOf).join(", ");
                            return (
                                <li key={e.id} className={cn("flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[20px] px-4 py-3.5 sm:flex-nowrap", editingId === e.id ? "bg-[#e9ecf3]" : "bg-bg-soft")}>
                                    <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                                        <span className="truncate text-[15px] font-semibold text-ink">{e.title}</span>
                                        <span className="text-[13px] text-[#5b6068]">
                                            {nameOf(e.paidBy)} paid · split{" "}
                                            {e.mode === "equal" ? "equally" : e.mode === "exact" ? "by amount" : "by shares"} between {between}
                                        </span>
                                        {e.mode !== "equal" && (
                                            <span className="text-xs text-[#5b6068]">
                                                {e.participants.map((pid) => `${nameOf(pid)} ${money(shares[pid])}`).join(" · ")}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[15px] font-semibold text-ink tabular-nums">{money(e.amount)}</span>
                                    <div className="flex shrink-0 gap-1">
                                        <button
                                            type="button"
                                            onClick={() => editExpense(e)}
                                            aria-label={`Edit ${e.title}`}
                                            className={cn(iconButton, "bg-white text-[#4a4f57] hover:bg-white hover:text-ink")}
                                        >
                                            <Pencil className="size-4" aria-hidden />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteExpense(e)}
                                            aria-label={`Delete ${e.title}`}
                                            className={cn(iconButton, "bg-white text-[#4a4f57] hover:bg-[#f3e7ec] hover:text-destructive")}
                                        >
                                            <Trash2 className="size-4" aria-hidden />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="rounded-[20px] bg-bg-soft px-4 py-8 text-center text-sm text-[#5b6068]">
                        No expenses yet. Add the first one above.
                    </p>
                )}
            </div>

            {/* Settings */}
            <div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:pb-8">
                <div className="flex items-center gap-3">
                    <label htmlFor={`${id}-currency`} className="text-sm font-semibold text-ink">
                        Currency
                    </label>
                    <select
                        id={`${id}-currency`}
                        value={group.currency}
                        onChange={(e) => updateGroup((g) => ({ ...g, currency: e.target.value as Currency }))}
                        className={cn(inputClass, "h-11 w-44 cursor-pointer")}
                    >
                        {CURRENCY_OPTIONS.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger
                        render={
                            <button
                                type="button"
                                disabled={!group.people.length && !group.expenses.length}
                                className={cn(secondaryButton, "w-full bg-bg-soft px-4 text-[#4a4f57] hover:bg-[#f3e7ec] hover:text-destructive sm:w-auto")}
                            />
                        }
                    >
                        <Trash2 className="size-4" aria-hidden />
                        Delete all data
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete all data?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This removes {group.people.length} {group.people.length === 1 ? "person" : "people"},{" "}
                                {group.expenses.length} {group.expenses.length === 1 ? "expense" : "expenses"} and all payments from
                                this browser. It can’t be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={clearAll}>
                                Delete all data
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}

import { allocate, formatMoney, type Currency } from "./money";

export type Person = { id: string; name: string };

export type SplitMode = "equal" | "exact" | "shares";

export type Expense = {
    id: string;
    title: string;
    /** Total in cents */
    amount: number;
    paidBy: string;
    mode: SplitMode;
    /** People who share this expense */
    participants: string[];
    /** exact: cents per person · shares: share count per person */
    values: Record<string, number>;
};

/** A settle-up payment someone marked as done */
export type Payment = { id: string; from: string; to: string; amount: number };

export type Group = {
    id: string;
    currency: Currency;
    people: Person[];
    expenses: Expense[];
    payments: Payment[];
};

export function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function newGroup(currency: Currency = "EUR"): Group {
    return { id: uid(), currency, people: [], expenses: [], payments: [] };
}

/** Cents each participant owes for one expense */
export function expenseShares(e: Expense): Record<string, number> {
    const ids = e.participants;
    let parts: number[];
    if (e.mode === "exact") parts = ids.map((id) => e.values[id] ?? 0);
    else if (e.mode === "shares") parts = allocate(e.amount, ids.map((id) => e.values[id] ?? 1));
    else parts = allocate(e.amount, ids.map(() => 1));
    return Object.fromEntries(ids.map((id, i) => [id, parts[i]]));
}

export type Balance = { id: string; paid: number; share: number; net: number };

export function balances(group: Group): Balance[] {
    const paid: Record<string, number> = {};
    const share: Record<string, number> = {};
    const settled: Record<string, number> = {};
    for (const p of group.people) {
        paid[p.id] = 0;
        share[p.id] = 0;
        settled[p.id] = 0;
    }
    for (const e of group.expenses) {
        paid[e.paidBy] = (paid[e.paidBy] ?? 0) + e.amount;
        for (const [id, cents] of Object.entries(expenseShares(e))) share[id] = (share[id] ?? 0) + cents;
    }
    // A payment moves money from the debtor to the creditor
    for (const p of group.payments) {
        settled[p.from] = (settled[p.from] ?? 0) + p.amount;
        settled[p.to] = (settled[p.to] ?? 0) - p.amount;
    }
    return group.people.map((p) => ({
        id: p.id,
        paid: paid[p.id],
        share: share[p.id],
        net: paid[p.id] - share[p.id] + settled[p.id],
    }));
}

export type Transfer = { from: string; to: string; amount: number };

/** Few payments that bring everyone to zero (largest debtor pays largest creditor first) */
export function settleUp(list: Balance[]): Transfer[] {
    const creditors = list.filter((b) => b.net > 0).map((b) => ({ id: b.id, left: b.net })).sort((a, b) => b.left - a.left);
    const debtors = list.filter((b) => b.net < 0).map((b) => ({ id: b.id, left: -b.net })).sort((a, b) => b.left - a.left);
    const result: Transfer[] = [];
    let i = 0;
    let j = 0;
    while (i < creditors.length && j < debtors.length) {
        const amount = Math.min(creditors[i].left, debtors[j].left);
        if (amount > 0) result.push({ from: debtors[j].id, to: creditors[i].id, amount });
        creditors[i].left -= amount;
        debtors[j].left -= amount;
        if (creditors[i].left === 0) i++;
        if (debtors[j].left === 0) j++;
    }
    return result;
}

export function summaryText(group: Group): string {
    const name = (id: string) => group.people.find((p) => p.id === id)?.name ?? "?";
    const money = (c: number) => formatMoney(c, group.currency);
    const total = group.expenses.reduce((a, e) => a + e.amount, 0);
    const list = balances(group);
    const transfers = settleUp(list);
    const lines = [`Total spent: ${money(total)}`, ""];
    for (const b of list) lines.push(`${name(b.id)}: paid ${money(b.paid)}, share ${money(b.share)}`);
    lines.push("");
    if (transfers.length) {
        lines.push("To settle up:");
        for (const t of transfers) lines.push(`• ${name(t.from)} → ${name(t.to)}: ${money(t.amount)}`);
    } else {
        lines.push("Everyone is settled up.");
    }
    return lines.join("\n");
}

/** Every expense with its split, then payments - for pasting into a chat or notes */
export function transactionsText(group: Group): string {
    const name = (id: string) => group.people.find((p) => p.id === id)?.name ?? "?";
    const money = (c: number) => formatMoney(c, group.currency);
    const everyone = (e: Expense) => e.participants.length === group.people.length;
    const how: Record<Expense["mode"], string> = { equal: "split equally", exact: "split by amount", shares: "split by shares" };
    const total = group.expenses.reduce((a, e) => a + e.amount, 0);

    const lines = ["All transactions", ""];
    group.expenses.forEach((e, i) => {
        const shares = expenseShares(e);
        const parts = e.participants.map((id) => `${name(id)} ${money(shares[id])}`).join(", ");
        lines.push(`${i + 1}. ${e.title} - ${money(e.amount)}`);
        lines.push(`   Paid by ${name(e.paidBy)} · ${how[e.mode]}${everyone(e) && e.mode === "equal" ? " between everyone" : ""}: ${parts}`);
    });
    if (group.payments.length) {
        lines.push("", "Payments made:");
        for (const p of group.payments) lines.push(`• ${name(p.from)} paid ${name(p.to)} ${money(p.amount)}`);
    }
    lines.push("", `Total: ${money(total)}`);
    return lines.join("\n");
}

// ─── Old data (before September 2026) ─────────────────────────────────────────

type OldFriend = { id: string; name: string };
type OldExpense = { id: string; title: string; amount: number; paidBy: string; splitBetween: { id: string; amount: number }[] };

/** Converts the previous version's localStorage data into a group */
export function migrateOld(friendsRaw: string | null, expensesRaw: string | null): Group | null {
    try {
        const friends = friendsRaw ? (JSON.parse(friendsRaw) as OldFriend[]) : [];
        const expenses = expensesRaw ? (JSON.parse(expensesRaw) as OldExpense[]) : [];
        if (!friends.length && !expenses.length) return null;
        const group = newGroup();
        group.people = friends.map((f) => ({ id: f.id, name: f.name }));
        group.expenses = expenses.map((e) => {
            const values = Object.fromEntries(e.splitBetween.map((s) => [s.id, Math.round(s.amount * 100)]));
            const amount = Object.values(values).reduce((a, b) => a + b, 0);
            return {
                id: e.id,
                title: e.title,
                amount,
                paidBy: e.paidBy,
                mode: "exact" as const,
                participants: e.splitBetween.map((s) => s.id),
                values,
            };
        });
        return group;
    } catch {
        return null;
    }
}

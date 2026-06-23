"use client";

import { useState, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { PlusIcon, XIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type Friend = { id: string; name: string };
type Split = { id: string; amount: number };
type Expense = { id: string; title: string; amount: number; paidBy: string; splitBetween: Split[] };

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

const EMPTY_EXPENSE = { id: "", title: "", amount: 0, paidBy: "", splitBetween: [] };

export default function BillSplit() {
    const [friends, setFriends] = useLocalStorage<Friend[]>("nc_bill_friends", []);
    const [expenses, setExpenses] = useLocalStorage<Expense[]>("nc_bill_expenses", []);

    const [friendName, setFriendName] = useState("");
    const [friendError, setFriendError] = useState("");

    const [form, setForm] = useState<Omit<Expense, "id" | "splitBetween">>({ title: "", amount: 0, paidBy: "" });
    const [toSplitEqually, setToSplitEqually] = useState(true);
    const [customSplits, setCustomSplits] = useState<Record<string, string>>({});
    const [expenseError, setExpenseError] = useState("");

    const getName = (id: string) => friends.find((f) => f.id === id)?.name ?? "Unknown";

    const addFriend = () => {
        const name = friendName.trim();
        if (!name) return;
        if (friends.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
            setFriendError("This name already exists");
            setTimeout(() => setFriendError(""), 2000);
            return;
        }
        setFriends((prev) => [...prev, { id: uid(), name: name.charAt(0).toUpperCase() + name.slice(1) }]);
        setFriendName("");
    };

    const removeFriend = (id: string) => {
        if (expenses.some((e) => e.splitBetween.some((s) => s.id === id))) {
            setFriendError("Cannot remove a friend who is part of an expense");
            setTimeout(() => setFriendError(""), 2500);
            return;
        }
        setFriends((prev) => prev.filter((f) => f.id !== id));
    };

    const restFromSplit = useMemo(() => {
        if (toSplitEqually || form.amount <= 0) return 0;
        const total = Object.values(customSplits).reduce((a, b) => a + (parseFloat(b) || 0), 0);
        return parseFloat((form.amount - total).toFixed(2));
    }, [toSplitEqually, form.amount, customSplits]);

    const addExpense = () => {
        if (!form.title.trim() || form.amount <= 0 || !form.paidBy) {
            setExpenseError("Title, amount, and payer are required.");
            setTimeout(() => setExpenseError(""), 2500);
            return;
        }
        if (!toSplitEqually && restFromSplit !== 0) {
            setExpenseError(
                `Split amounts must equal the total (${restFromSplit > 0 ? "missing" : "over by"} ${Math.abs(restFromSplit).toFixed(2)}).`,
            );
            setTimeout(() => setExpenseError(""), 2500);
            return;
        }

        let splitBetween: Split[];
        if (toSplitEqually) {
            const eq = parseFloat((form.amount / friends.length).toFixed(2));
            splitBetween = friends.map((f, i) => ({
                id: f.id,
                amount: i === friends.length - 1 ? parseFloat((form.amount - eq * (friends.length - 1)).toFixed(2)) : eq,
            }));
        } else {
            splitBetween = friends
                .filter((f) => parseFloat(customSplits[f.id] || "0") > 0)
                .map((f) => ({ id: f.id, amount: parseFloat(customSplits[f.id]) }));
        }

        setExpenses((prev) => [...prev, { id: uid(), ...form, splitBetween }]);
        setForm({ title: "", amount: 0, paidBy: "" });
        setToSplitEqually(true);
        setCustomSplits({});
    };

    const { personPaid, personSpent, personBalance } = useMemo(() => {
        const paid: Record<string, number> = {};
        const spent: Record<string, number> = {};
        friends.forEach((f) => {
            paid[f.id] = 0;
            spent[f.id] = 0;
        });
        expenses.forEach((e) => {
            if (e.paidBy) paid[e.paidBy] = (paid[e.paidBy] ?? 0) + e.amount;
            e.splitBetween.forEach((s) => {
                spent[s.id] = (spent[s.id] ?? 0) + s.amount;
            });
        });
        const balance: Record<string, number> = {};
        friends.forEach((f) => {
            balance[f.id] = (paid[f.id] ?? 0) - (spent[f.id] ?? 0);
        });
        return { personPaid: paid, personSpent: spent, personBalance: balance };
    }, [friends, expenses]);

    const settlements = useMemo(() => {
        const creditors = Object.entries(personBalance)
            .filter(([, b]) => b > 0.01)
            .map(([id, balance]) => ({ id, balance }))
            .sort((a, b) => b.balance - a.balance);
        const debtors = Object.entries(personBalance)
            .filter(([, b]) => b < -0.01)
            .map(([id, balance]) => ({ id, balance: Math.abs(balance) }))
            .sort((a, b) => b.balance - a.balance);

        const result: { from: string; to: string; amount: number }[] = [];
        let i = 0,
            j = 0;
        while (i < creditors.length && j < debtors.length) {
            const creditor = creditors[i]!;
            const debtor = debtors[j]!;
            const amount = Math.min(creditor.balance, debtor.balance);
            if (amount > 0.01) result.push({ from: debtor.id, to: creditor.id, amount: Math.round(amount * 100) / 100 });
            creditor.balance -= amount;
            debtor.balance -= amount;
            if (creditor.balance <= 0.01) i++;
            if (debtor.balance <= 0.01) j++;
        }
        return result;
    }, [personBalance]);

    const totalExpenses = useMemo(() => expenses.reduce((a, e) => a + e.amount, 0), [expenses]);

    const hasData = friends.length > 0 || expenses.length > 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add People */}
                <div className="border rounded-xl p-4 bg-white space-y-3">
                    <p className="font-medium">Add People</p>
                    <div className="flex gap-2">
                        <Input
                            value={friendName}
                            onChange={(e) => setFriendName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addFriend()}
                            placeholder="Enter name"
                            maxLength={20}
                        />
                        <Button onClick={addFriend} disabled={!friendName.trim()} size="icon">
                            <PlusIcon className="w-4 h-4" />
                        </Button>
                    </div>
                    {friendError && <p className="text-destructive text-sm">{friendError}</p>}
                    {friends.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {friends.map((f) => (
                                <span
                                    key={f.id}
                                    className="inline-flex items-center gap-1 border rounded-md pl-2.5 pr-1 py-1 text-sm bg-muted/40"
                                >
                                    {f.name}
                                    <button onClick={() => removeFriend(f.id)} className="p-0.5 rounded hover:bg-muted transition-colors">
                                        <XIcon className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Add Expense */}
                <div className="border rounded-xl p-4 bg-white space-y-3">
                    <p className="font-medium">Add Expense</p>
                    <Input
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="Description"
                    />
                    <div className="flex gap-3">
                        <Input
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="0.00"
                            value={form.amount || ""}
                            onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
                            className="w-1/3"
                        />
                        <select
                            value={form.paidBy}
                            onChange={(e) => setForm((f) => ({ ...f, paidBy: e.target.value }))}
                            className="flex-1 border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Paid by…</option>
                            {friends.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                            type="checkbox"
                            checked={toSplitEqually}
                            onChange={(e) => {
                                setToSplitEqually(e.target.checked);
                                setCustomSplits({});
                            }}
                            className="accent-foreground"
                        />
                        Split equally
                    </label>

                    {!toSplitEqually && form.amount > 0 && (
                        <div className="space-y-2">
                            {friends.map((f) => (
                                <div key={f.id} className="flex items-center justify-between gap-3">
                                    <span className="text-sm truncate flex-1">{f.name}</span>
                                    <Input
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        placeholder="0.00"
                                        value={customSplits[f.id] ?? ""}
                                        onChange={(e) => setCustomSplits((prev) => ({ ...prev, [f.id]: e.target.value }))}
                                        className="w-24"
                                    />
                                </div>
                            ))}
                            {restFromSplit !== 0 && (
                                <p className={`text-sm ${restFromSplit > 0 ? "text-amber-600" : "text-destructive"}`}>
                                    {restFromSplit > 0
                                        ? `Remaining: ${restFromSplit.toFixed(2)}`
                                        : `Over by: ${Math.abs(restFromSplit).toFixed(2)}`}
                                </p>
                            )}
                        </div>
                    )}

                    {expenseError && <p className="text-destructive text-sm">{expenseError}</p>}

                    <div className="flex justify-end">
                        <Button onClick={addExpense} disabled={friends.length < 2}>
                            Add Expense
                        </Button>
                    </div>
                    {friends.length < 2 && <p className="text-muted-foreground text-xs text-right">Add at least 2 people first.</p>}
                </div>
            </div>

            {/* Expenses table */}
            <div className="border rounded-xl bg-white overflow-hidden">
                <div className="px-4 py-3 border-b">
                    <p className="font-medium text-sm">Expenses</p>
                </div>
                {expenses.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-muted/40 text-left">
                                    <th className="px-3 py-2 font-medium">Description</th>
                                    <th className="px-3 py-2 font-medium text-center">Amount</th>
                                    <th className="px-3 py-2 font-medium">Paid by</th>
                                    <th className="px-3 py-2 font-medium">Split between</th>
                                    <th className="px-3 py-2 w-8" />
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((e) => (
                                    <tr key={e.id} className="border-t hover:bg-muted/20 transition-colors">
                                        <td className="px-3 py-2 max-w-[120px] truncate">{e.title}</td>
                                        <td className="px-3 py-2 text-center font-mono">{e.amount.toFixed(2)}</td>
                                        <td className="px-3 py-2 max-w-[100px] truncate">{getName(e.paidBy)}</td>
                                        <td className="px-3 py-2">
                                            <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                                                {e.splitBetween.map((s) => (
                                                    <span key={s.id} className="whitespace-nowrap">
                                                        {getName(s.id)}{" "}
                                                        <span className="text-muted-foreground">({s.amount.toFixed(2)})</span>
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <button
                                                onClick={() => setExpenses((prev) => prev.filter((x) => x.id !== e.id))}
                                                className="p-1 rounded hover:bg-destructive/10 text-destructive transition-colors"
                                                title="Delete"
                                            >
                                                <XIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t bg-muted/40 font-medium">
                                    <td className="px-3 py-2">Total</td>
                                    <td className="px-3 py-2 text-center font-mono">{totalExpenses.toFixed(2)}</td>
                                    <td colSpan={3} />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ) : (
                    <p className="px-4 py-8 text-center text-muted-foreground text-sm">No expenses added yet.</p>
                )}
            </div>

            {/* Settlement Steps */}
            <div className="border rounded-xl bg-white overflow-hidden">
                <div className="px-4 py-3 border-b">
                    <p className="font-medium text-sm">Settlement Steps</p>
                </div>
                <div className="p-4">
                    {settlements.length > 0 ? (
                        <div className="space-y-2">
                            {settlements.map((s) => (
                                <div
                                    key={`${s.from}-${s.to}`}
                                    className="flex items-center justify-between bg-muted/40 px-3 py-2.5 rounded-lg border"
                                >
                                    <span className="text-sm">
                                        <strong>{getName(s.from)}</strong> pays <strong>{getName(s.to)}</strong>
                                    </span>
                                    <span className="font-bold text-green-600 font-mono">{s.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    ) : friends.length > 0 && expenses.length > 0 ? (
                        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
                            All expenses are settled - everyone is even.
                        </p>
                    ) : (
                        <p className="text-center text-muted-foreground text-sm py-4">No settlement steps to show yet.</p>
                    )}
                </div>
            </div>

            {/* Individual Balances */}
            {expenses.length > 0 && (
                <div className="border rounded-xl bg-white overflow-hidden">
                    <div className="px-4 py-3 border-b">
                        <p className="font-medium text-sm">Individual Balances</p>
                    </div>
                    <div className="p-4 overflow-x-auto">
                        <div className="flex gap-4">
                            {friends.map((f) => {
                                const balance = personBalance[f.id] ?? 0;
                                return (
                                    <div key={f.id} className="border rounded-lg p-4 min-w-[200px] shrink-0">
                                        <p className="font-medium mb-3">{f.name}</p>
                                        <div className="space-y-1.5 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Paid</span>
                                                <span className="font-mono text-green-600">{(personPaid[f.id] ?? 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Spent</span>
                                                <span className="font-mono text-red-500">{(personSpent[f.id] ?? 0).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between border-t pt-1.5 mt-1.5">
                                                <span className="font-medium">Balance</span>
                                                <span
                                                    className={`font-bold font-mono ${balance > 0.01 ? "text-green-600" : balance < -0.01 ? "text-red-500" : "text-muted-foreground"}`}
                                                >
                                                    {balance > 0.01
                                                        ? `+${balance.toFixed(2)}`
                                                        : balance < -0.01
                                                          ? balance.toFixed(2)
                                                          : "0.00"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Reset */}
            {hasData && (
                <div className="flex justify-end">
                    <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="ghost" className="text-destructive hover:text-destructive gap-1.5" />}>
                            <TrashIcon className="w-4 h-4" /> Delete All Data
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete all data?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will remove all friends and expenses. This cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    render={<Button />}
                                    onClick={() => {
                                        setFriends([]);
                                        setExpenses([]);
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )}
        </div>
    );
}

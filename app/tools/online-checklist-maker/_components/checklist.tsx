"use client";

import { useState, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { PencilIcon, TrashIcon, DownloadIcon, PrinterIcon, PlusIcon, XIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

type Task = { id: string; title: string; notes: string; completed: boolean };

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function Checklist() {
    const [tasks, setTasks] = useLocalStorage<Task[]>("nc_checklist_tasks", []);
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    const submit = () => {
        if (!title.trim()) return;
        if (editId) {
            setTasks((prev) => prev.map((t) => (t.id === editId ? { ...t, title, notes } : t)));
            setEditId(null);
        } else {
            setTasks((prev) => [...prev, { id: uid(), title, notes, completed: false }]);
        }
        setTitle("");
        setNotes("");
    };

    const startEdit = (task: Task) => {
        setEditId(task.id);
        setTitle(task.title);
        setNotes(task.notes);
        titleRef.current?.focus();
    };

    const cancelEdit = () => {
        setEditId(null);
        setTitle("");
        setNotes("");
    };

    const toggleTask = (id: string) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    };

    const removeTask = (id: string) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const exportText = () => {
        const header = `My Checklist - ${new Date().toLocaleDateString()}\n${"=".repeat(50)}\n\n`;
        const body = tasks.map((t) => `${t.completed ? "✓" : "☐"} ${t.title}${t.notes ? ` (${t.notes})` : ""}`).join("\n");
        const blob = new Blob([header + body], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `checklist-${new Date().toISOString().split("T")[0]}.txt`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const print = () => {
        const title = `My Checklist - ${new Date().toLocaleDateString()}`;
        const rows = tasks
            .map((t) => {
                const style = t.completed ? "text-decoration:line-through;color:#999" : "";
                return `<div style="margin:8px 0;${style}">${t.completed ? "✓" : "☐"} ${t.title}${t.notes ? ` <small>(${t.notes})</small>` : ""}</div>`;
            })
            .join("");
        const w = window.open("", "_blank")!;
        w.document.write(
            `<!DOCTYPE html><html><head><title>${title}</title><style>body{font-family:Arial,sans-serif;max-width:600px;margin:20px auto}h1{border-bottom:2px solid #333;padding-bottom:10px}</style></head><body><h1>${title}</h1>${rows}</body></html>`,
        );
        w.document.close();
        w.print();
    };

    const doneCount = tasks.filter((t) => t.completed).length;

    return (
        <div className="space-y-6">
            {/* Add / Edit form */}
            <div className="border rounded-xl p-4 bg-white space-y-3">
                <p className="font-medium">{editId ? "Edit Task" : "Add New Task"}</p>
                <div className="flex gap-2">
                    <Input
                        ref={titleRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submit()}
                        placeholder="What do you need to do?"
                    />
                    <Button onClick={submit} disabled={!title.trim()}>
                        {editId ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                    </Button>
                    {editId && (
                        <Button variant="ghost" onClick={cancelEdit}>
                            <XIcon className="w-4 h-4" />
                        </Button>
                    )}
                </div>
                {title.trim() && !editId && (
                    <div>
                        <Label className="text-xs text-muted-foreground">Notes (optional)</Label>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submit()}
                            placeholder="Add notes or details…"
                            className="min-h-[60px] resize-none mt-1 text-sm"
                        />
                    </div>
                )}
                {editId && (
                    <div>
                        <Label className="text-xs text-muted-foreground">Notes</Label>
                        <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes or details…"
                            className="min-h-[60px] resize-none mt-1 text-sm"
                        />
                    </div>
                )}
            </div>

            {/* Task list */}
            {tasks.length > 0 ? (
                <div className="border rounded-xl overflow-hidden bg-white">
                    <div className="px-4 py-3 border-b flex items-center justify-between">
                        <p className="font-medium text-sm">
                            Your Checklist
                            <span className="ml-2 text-muted-foreground font-normal">
                                {doneCount}/{tasks.length} done
                            </span>
                        </p>
                    </div>
                    <ul>
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0 group hover:bg-muted/40 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(task.id)}
                                    className="accent-foreground shrink-0 w-4 h-4 cursor-pointer"
                                />
                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`text-sm font-medium truncate ${task.completed ? "line-through text-muted-foreground" : ""}`}
                                    >
                                        {task.title}
                                    </p>
                                    {task.notes && <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.notes}</p>}
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <Button variant="ghost" size="icon-sm" onClick={() => startEdit(task)} title="Edit">
                                        <PencilIcon className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button variant="ghost" size="icon-sm" onClick={() => removeTask(task.id)} title="Delete">
                                        <TrashIcon className="w-3.5 h-3.5 text-destructive" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="border rounded-xl p-12 text-center text-muted-foreground bg-white">
                    <p className="text-3xl mb-2">📝</p>
                    <p className="font-medium text-sm">No tasks yet - add your first task above.</p>
                </div>
            )}

            {/* Actions */}
            {tasks.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="ghost" className="text-destructive hover:text-destructive gap-1.5" />}>
                            <TrashIcon className="w-4 h-4" /> Delete All
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete all tasks?</AlertDialogTitle>
                                <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel render={<Button variant="outline" />}>Cancel</AlertDialogCancel>
                                <AlertDialogAction render={<Button />} onClick={() => setTasks([])}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={exportText} className="gap-1.5">
                            <DownloadIcon className="w-4 h-4" /> Export
                        </Button>
                        <Button variant="outline" size="sm" onClick={print} className="gap-1.5">
                            <PrinterIcon className="w-4 h-4" /> Print
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

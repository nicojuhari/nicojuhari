"use client";

import { useId, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Check, Copy, Download, GripVertical, Pencil, Plus, Printer, RotateCcw, StickyNote, Trash2, Undo2 } from "lucide-react";
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
import { Eyebrow, inputClass, PillTabs, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import {
    downloadText,
    linesToTitles,
    MAX_NOTES,
    MAX_TASKS,
    MAX_TITLE,
    newTask,
    printChecklist,
    slugify,
    TEMPLATES,
    toText,
    type Task,
} from "./checklist-utils";

type Filter = "all" | "todo" | "done";

const DEFAULT_TITLE = "My checklist";
const EMPTY: Task[] = [];

const actionButton =
    "inline-flex h-11 items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-white hover:text-ink disabled:pointer-events-none disabled:opacity-40";

export default function Checklist() {
    const id = useId();
    // Same key as the previous version, so existing lists carry over
    const [tasks, setTasks] = useLocalStorage<Task[]>("nc_checklist_tasks", EMPTY, { initializeWithValue: false });
    const [title, setTitle] = useLocalStorage("nc_checklist_title", DEFAULT_TITLE, { initializeWithValue: false });

    const [draft, setDraft] = useState("");
    const [draftNotes, setDraftNotes] = useState("");
    const [showNotes, setShowNotes] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState<Filter>("all");
    const [editing, setEditing] = useState<{ id: string; title: string; notes: string } | null>(null);
    const [undo, setUndo] = useState<{ label: string; snapshot: Task[] } | null>(null);
    const [notice, setNotice] = useState("");
    const [dragOrder, setDragOrder] = useState<string[] | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);

    const titleRef = useRef<HTMLInputElement>(null);
    const rowRefs = useRef(new Map<string, HTMLLIElement>());

    const done = tasks.filter((t) => t.completed).length;
    const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
    const listTitle = title.trim() || DEFAULT_TITLE;

    const ordered = dragOrder ? dragOrder.map((tid) => tasks.find((t) => t.id === tid)!).filter(Boolean) : tasks;
    const visible = ordered.filter((t) => (filter === "todo" ? !t.completed : filter === "done" ? t.completed : true));
    const canReorder = filter === "all" && !editing;

    const flash = (text: string) => {
        setNotice(text);
        window.setTimeout(() => setNotice(""), 2200);
    };

    const withUndo = (label: string, change: (prev: Task[]) => Task[]) => {
        setUndo({ label, snapshot: tasks });
        setTasks(change);
    };

    // ─── Adding ──────────────────────────────────────────────────────────────

    const addTitles = (titles: string[], notes = "") => {
        const room = MAX_TASKS - tasks.length;
        if (room <= 0) {
            setError(`A list can hold up to ${MAX_TASKS} tasks.`);
            return 0;
        }
        const added = titles.slice(0, room).map((t, i) => newTask(t, i === 0 ? notes : ""));
        setTasks((prev) => [...prev, ...added]);
        setError(titles.length > room ? `Only ${room} tasks fit - a list can hold up to ${MAX_TASKS}.` : "");
        return added.length;
    };

    const submit = () => {
        const text = draft.trim();
        if (!text) {
            setError("Type a task first.");
            titleRef.current?.focus();
            return;
        }
        addTitles([text], draftNotes);
        setDraft("");
        setDraftNotes("");
        setShowNotes(false);
        titleRef.current?.focus();
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const text = e.clipboardData.getData("text");
        if (!text.includes("\n")) return;
        e.preventDefault();
        const count = addTitles(linesToTitles(text));
        if (count) flash(`Added ${count} tasks from your list`);
    };

    const addTemplate = (templateId: string) => {
        const template = TEMPLATES.find((t) => t.id === templateId);
        if (!template) return;
        const count = addTitles(template.tasks);
        if (tasks.length === 0 && title === DEFAULT_TITLE) setTitle(template.label);
        if (count) flash(`Added ${count} tasks`);
    };

    // ─── Editing ─────────────────────────────────────────────────────────────

    const toggle = (tid: string) => setTasks((prev) => prev.map((t) => (t.id === tid ? { ...t, completed: !t.completed } : t)));

    const saveEdit = () => {
        if (!editing) return;
        const text = editing.title.trim();
        if (!text) return setError("A task needs a title.");
        setTasks((prev) =>
            prev.map((t) =>
                t.id === editing.id ? { ...t, title: text.slice(0, MAX_TITLE), notes: editing.notes.trim().slice(0, MAX_NOTES) } : t
            )
        );
        setEditing(null);
        setError("");
    };

    const remove = (task: Task) => withUndo(`Deleted “${task.title}”`, (prev) => prev.filter((t) => t.id !== task.id));

    // ─── Reordering ──────────────────────────────────────────────────────────

    const move = (tid: string, delta: number) =>
        setTasks((prev) => {
            const from = prev.findIndex((t) => t.id === tid);
            const to = from + delta;
            if (from < 0 || to < 0 || to >= prev.length) return prev;
            const next = [...prev];
            const [item] = next.splice(from, 1);
            next.splice(to, 0, item);
            return next;
        });

    const startDrag = (e: React.PointerEvent, tid: string) => {
        if (!canReorder) return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        setDraggingId(tid);
        setDragOrder(tasks.map((t) => t.id));
    };

    const onDragMove = (e: React.PointerEvent) => {
        if (!draggingId || !dragOrder) return;
        // Find the row the pointer is over, ignoring the dragged one
        const others = dragOrder.filter((tid) => tid !== draggingId);
        let index = others.length;
        for (let i = 0; i < others.length; i++) {
            const rect = rowRefs.current.get(others[i])?.getBoundingClientRect();
            if (rect && e.clientY < rect.top + rect.height / 2) {
                index = i;
                break;
            }
        }
        const next = [...others];
        next.splice(index, 0, draggingId);
        if (next.join() !== dragOrder.join()) setDragOrder(next);
    };

    const endDrag = () => {
        if (dragOrder) {
            const order = dragOrder;
            setTasks((prev) => order.map((tid) => prev.find((t) => t.id === tid)!).filter(Boolean));
        }
        setDraggingId(null);
        setDragOrder(null);
    };

    // ─── Output ──────────────────────────────────────────────────────────────

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(toText(listTitle, tasks));
            flash("Checklist copied as text");
        } catch {
            flash("Couldn’t copy - your browser blocked the clipboard");
        }
    };

    const print = () => {
        if (!printChecklist(listTitle, tasks)) flash("Printing isn’t available in this browser");
    };

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
            {/* ── List ── */}
            <div className="flex min-w-0 flex-col gap-5 p-5 sm:p-8">
                <div className="flex flex-col gap-1">
                    <label htmlFor={`${id}-title`} className="sr-only">
                        List name
                    </label>
                    <input
                        id={`${id}-title`}
                        value={title}
                        maxLength={60}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={() => !title.trim() && setTitle(DEFAULT_TITLE)}
                        className="-mx-2 rounded-lg px-2 py-1 text-2xl font-semibold tracking-[-0.02em] text-ink outline-none hover:bg-[#faf9f6] focus:bg-[#faf9f6] focus:ring-4 focus:ring-brand/8"
                    />
                    <p className="text-[13px] text-ink-faint">Tap the name to rename your list.</p>
                </div>

                {/* Add */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex gap-2">
                        <label htmlFor={`${id}-new`} className="sr-only">
                            New task
                        </label>
                        <input
                            id={`${id}-new`}
                            ref={titleRef}
                            value={draft}
                            maxLength={MAX_TITLE}
                            onChange={(e) => {
                                setDraft(e.target.value);
                                setError("");
                            }}
                            onKeyDown={(e) => e.key === "Enter" && submit()}
                            onPaste={onPaste}
                            placeholder="Add a task, or paste a list"
                            autoComplete="off"
                            className={inputClass}
                            aria-invalid={Boolean(error) || undefined}
                            aria-describedby={error ? `${id}-error` : undefined}
                        />
                        <button type="button" onClick={submit} className={cn(primaryButton, "shrink-0 px-4")}>
                            <Plus className="size-4" aria-hidden />
                            Add
                        </button>
                    </div>
                    {showNotes ? (
                        <textarea
                            value={draftNotes}
                            maxLength={MAX_NOTES}
                            onChange={(e) => setDraftNotes(e.target.value)}
                            rows={2}
                            autoFocus
                            placeholder="Note for this task (optional)"
                            aria-label="Note for the new task"
                            className={cn(inputClass, "h-auto resize-y py-3 text-sm")}
                        />
                    ) : (
                        <button
                            type="button"
                            onClick={() => setShowNotes(true)}
                            className="inline-flex items-center gap-1.5 self-start py-1 text-[13px] font-semibold text-brand hover:text-teal"
                        >
                            <StickyNote className="size-3.5" aria-hidden />
                            Add a note
                        </button>
                    )}
                    {error && (
                        <p id={`${id}-error`} role="alert" className="text-[13px] text-destructive">
                            {error}
                        </p>
                    )}
                </div>

                {tasks.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <PillTabs
                            label="Show"
                            value={filter}
                            onChange={setFilter}
                            options={[
                                { id: "all", label: `All ${tasks.length}` },
                                { id: "todo", label: `To do ${tasks.length - done}` },
                                { id: "done", label: `Done ${done}` },
                            ]}
                        />
                        {undo && (
                            <span className="flex items-center gap-2 text-[13px] text-ink-muted">
                                <span className="max-w-48 truncate">{undo.label}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTasks(undo.snapshot);
                                        setUndo(null);
                                    }}
                                    className="inline-flex items-center gap-1 font-semibold text-brand hover:text-teal"
                                >
                                    <Undo2 className="size-3.5" aria-hidden />
                                    Undo
                                </button>
                            </span>
                        )}
                    </div>
                )}

                {/* Tasks */}
                {tasks.length === 0 ? (
                    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-rule px-5 py-10 text-center">
                        <p className="text-sm text-ink-muted">No tasks yet. Add one above, paste a list, or start from a template:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {TEMPLATES.map((t) => (
                                <button key={t.id} type="button" onClick={() => addTemplate(t.id)} className={cn(secondaryButton, "h-10 px-4 text-[13px]")}>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : visible.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-rule px-5 py-8 text-center text-sm text-ink-faint">
                        {filter === "todo" ? "Everything is done." : "Nothing ticked off yet."}
                    </p>
                ) : (
                    <ul className="flex flex-col divide-y divide-line rounded-2xl border border-rule" onPointerMove={onDragMove} onPointerUp={endDrag} onPointerCancel={endDrag}>
                        {visible.map((task) => {
                            const isEditing = editing?.id === task.id;
                            return (
                                <li
                                    key={task.id}
                                    ref={(el) => {
                                        if (el) rowRefs.current.set(task.id, el);
                                        else rowRefs.current.delete(task.id);
                                    }}
                                    className={cn(
                                        "flex items-start gap-1 py-1.5 pr-1.5 pl-1 transition-colors",
                                        draggingId === task.id && "relative z-10 rounded-xl bg-[#eef1f7] shadow-[0_8px_24px_-12px_rgba(22,40,77,0.4)]"
                                    )}
                                >
                                    {canReorder ? (
                                        <button
                                            type="button"
                                            onPointerDown={(e) => startDrag(e, task.id)}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                                    e.preventDefault();
                                                    move(task.id, e.key === "ArrowUp" ? -1 : 1);
                                                }
                                            }}
                                            aria-label={`Move “${task.title}” - drag, or use the arrow keys`}
                                            className="flex h-11 w-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-ink-faint/70 hover:text-ink active:cursor-grabbing"
                                        >
                                            <GripVertical className="size-4" aria-hidden />
                                        </button>
                                    ) : (
                                        <span className="w-2 shrink-0" />
                                    )}

                                    {isEditing ? (
                                        <div className="flex min-w-0 flex-1 flex-col gap-2 py-1.5 pr-1">
                                            <input
                                                autoFocus
                                                aria-label="Task"
                                                value={editing.title}
                                                maxLength={MAX_TITLE}
                                                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveEdit();
                                                    if (e.key === "Escape") setEditing(null);
                                                }}
                                                className={cn(inputClass, "h-11 text-[15px]")}
                                            />
                                            <textarea
                                                aria-label="Note"
                                                value={editing.notes}
                                                maxLength={MAX_NOTES}
                                                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                                                onKeyDown={(e) => e.key === "Escape" && setEditing(null)}
                                                rows={2}
                                                placeholder="Note (optional)"
                                                className={cn(inputClass, "h-auto resize-y py-2.5 text-sm")}
                                            />
                                            <div className="flex justify-end gap-2">
                                                <button type="button" onClick={() => setEditing(null)} className={cn(secondaryButton, "h-10 px-4 text-[13px]")}>
                                                    Cancel
                                                </button>
                                                <button type="button" onClick={saveEdit} className={cn(primaryButton, "h-10 px-4 text-[13px]")}>
                                                    <Check className="size-4" aria-hidden />
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 py-2.5">
                                                <input
                                                    type="checkbox"
                                                    checked={task.completed}
                                                    onChange={() => toggle(task.id)}
                                                    className="mt-0.5 size-5 shrink-0 cursor-pointer accent-teal"
                                                />
                                                <span className="flex min-w-0 flex-col gap-0.5">
                                                    <span
                                                        className={cn(
                                                            "text-[15px] leading-snug break-words text-ink",
                                                            task.completed && "text-ink-faint line-through"
                                                        )}
                                                    >
                                                        {task.title}
                                                    </span>
                                                    {task.notes && (
                                                        <span className="text-[13px] leading-snug break-words whitespace-pre-line text-ink-faint">
                                                            {task.notes}
                                                        </span>
                                                    )}
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditing({ id: task.id, title: task.title, notes: task.notes });
                                                    setError("");
                                                }}
                                                aria-label={`Edit “${task.title}”`}
                                                className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-[#f4f3ef] hover:text-ink"
                                            >
                                                <Pencil className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => remove(task)}
                                                aria-label={`Delete “${task.title}”`}
                                                className="flex size-10 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-[#f4f3ef] hover:text-destructive"
                                            >
                                                <Trash2 className="size-4" aria-hidden />
                                            </button>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* ── Side panel ── */}
            <div className="border-t border-rule bg-[#f5f7fb] lg:border-t-0 lg:border-l">
                <div className="flex flex-col gap-6 p-5 sm:p-8 lg:sticky lg:top-24">
                    <div className="flex flex-col gap-3">
                        <Eyebrow>Progress</Eyebrow>
                        <p className="flex items-baseline gap-2">
                            <span className="font-mono text-[40px] leading-none font-semibold tracking-[-0.03em] text-ink">{done}</span>
                            <span className="text-sm text-ink-muted">of {tasks.length} done</span>
                        </p>
                        <div
                            role="progressbar"
                            aria-label="Checklist progress"
                            aria-valuenow={percent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            className="h-2.5 overflow-hidden rounded-full bg-[#dfe4ee]"
                        >
                            <div className="h-full rounded-full bg-teal transition-[width] duration-300" style={{ width: `${percent}%` }} />
                        </div>
                        {tasks.length > 0 && done === tasks.length && <p className="text-[13px] font-semibold text-teal">All done - nice work.</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Eyebrow className="mb-1.5">Actions</Eyebrow>
                        <button type="button" onClick={copy} disabled={!tasks.length} className={actionButton}>
                            <Copy className="size-4" aria-hidden />
                            Copy as text
                        </button>
                        <button
                            type="button"
                            onClick={() => downloadText(`${slugify(listTitle)}.txt`, toText(listTitle, tasks))}
                            disabled={!tasks.length}
                            className={actionButton}
                        >
                            <Download className="size-4" aria-hidden />
                            Download .txt
                        </button>
                        <button type="button" onClick={print} disabled={!tasks.length} className={actionButton}>
                            <Printer className="size-4" aria-hidden />
                            Print
                        </button>
                        <div className="my-1.5 h-px bg-[#dce1eb]" />
                        <button
                            type="button"
                            onClick={() => withUndo("Unchecked all", (prev) => prev.map((t) => ({ ...t, completed: false })))}
                            disabled={!done}
                            className={actionButton}
                        >
                            <RotateCcw className="size-4" aria-hidden />
                            Uncheck all
                        </button>
                        <button
                            type="button"
                            onClick={() => withUndo(`Cleared ${done} done`, (prev) => prev.filter((t) => !t.completed))}
                            disabled={!done}
                            className={actionButton}
                        >
                            <Check className="size-4" aria-hidden />
                            Clear completed
                        </button>
                        <AlertDialog>
                            <AlertDialogTrigger
                                render={<button type="button" disabled={!tasks.length} className={cn(actionButton, "hover:text-destructive")} />}
                            >
                                <Trash2 className="size-4" aria-hidden />
                                Delete all tasks
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete all {tasks.length} tasks?</AlertDialogTitle>
                                    <AlertDialogDescription>This clears the list from this browser. It can’t be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        variant="destructive"
                                        onClick={() => {
                                            setTasks([]);
                                            setUndo(null);
                                            setEditing(null);
                                        }}
                                    >
                                        Delete all
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <p aria-live="polite" className="min-h-5 pt-1 text-xs text-ink-faint">
                            {notice}
                        </p>
                    </div>

                    {tasks.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                            <Eyebrow>Add from a template</Eyebrow>
                            <div className="flex flex-wrap gap-2">
                                {TEMPLATES.map((t) => (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => addTemplate(t.id)}
                                        className="h-9 rounded-full border border-[#dce1eb] bg-white px-3.5 text-[13px] font-semibold text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

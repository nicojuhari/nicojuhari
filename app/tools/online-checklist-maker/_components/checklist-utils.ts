export type Task = { id: string; title: string; notes: string; completed: boolean };

export const MAX_TITLE = 200;
export const MAX_NOTES = 1000;
export const MAX_TASKS = 500;

export function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function newTask(title: string, notes = ""): Task {
    return { id: uid(), title: title.trim().slice(0, MAX_TITLE), notes: notes.trim().slice(0, MAX_NOTES), completed: false };
}

/** Splits pasted text into task titles - one per line, list markers removed */
export function linesToTitles(text: string): string[] {
    return text
        .split(/\r?\n/)
        .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)]|\[[ xX]?\]|☐|✓)\s*/, "").trim())
        .filter(Boolean);
}

export const TEMPLATES: { id: string; label: string; tasks: string[] }[] = [
    {
        id: "packing",
        label: "Packing",
        tasks: ["Passport or ID", "Phone charger", "Toiletries", "Medication", "Clothes for each day", "Travel insurance details", "Tickets and bookings"],
    },
    {
        id: "moving",
        label: "Moving house",
        tasks: [
            "Book movers or a van",
            "Collect boxes and tape",
            "Change address at the bank",
            "Transfer internet and utilities",
            "Label boxes by room",
            "Take meter readings",
            "Return old keys",
        ],
    },
    {
        id: "groceries",
        label: "Groceries",
        tasks: ["Bread", "Milk", "Eggs", "Fruit", "Vegetables", "Coffee", "Cleaning supplies"],
    },
    {
        id: "launch",
        label: "Website launch",
        tasks: [
            "Check every page on mobile",
            "Test contact form",
            "Set page titles and descriptions",
            "Add analytics",
            "Submit sitemap to Google",
            "Check broken links",
        ],
    },
];

export function toText(title: string, tasks: Task[]) {
    const lines = [title, ""];
    for (const t of tasks) {
        lines.push(`${t.completed ? "[x]" : "[ ]"} ${t.title}`);
        if (t.notes) lines.push(...t.notes.split("\n").map((n) => `    ${n}`));
    }
    return lines.join("\n");
}

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Prints through a hidden iframe - no popup to block, and all text is escaped */
export function printChecklist(title: string, tasks: Task[]) {
    const rows = tasks
        .map(
            (t) =>
                `<li class="${t.completed ? "done" : ""}"><span class="box">${t.completed ? "✓" : ""}</span><div><p>${escapeHtml(t.title)}</p>${
                    t.notes ? `<small>${escapeHtml(t.notes).replace(/\n/g, "<br>")}</small>` : ""
                }</div></li>`
        )
        .join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>
body{font-family:system-ui,sans-serif;color:#111;max-width:640px;margin:32px auto;padding:0 16px}
h1{font-size:22px;margin:0 0 4px}.meta{color:#666;font-size:12px;margin:0 0 20px}
ul{list-style:none;padding:0;margin:0}li{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #ddd;break-inside:avoid}
.box{flex:none;width:16px;height:16px;border:1.5px solid #333;border-radius:3px;font-size:13px;line-height:16px;text-align:center}
p{margin:0;font-size:15px}small{color:#555;font-size:12px}.done p{text-decoration:line-through;color:#888}
</style></head><body><h1>${escapeHtml(title)}</h1><p class="meta">${tasks.filter((t) => t.completed).length} of ${tasks.length} done · ${escapeHtml(
        new Date().toLocaleDateString()
    )}</p><ul>${rows}</ul></body></html>`;

    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    if (!doc || !frame.contentWindow) {
        frame.remove();
        return false;
    }
    doc.open();
    doc.write(html);
    doc.close();
    frame.contentWindow.focus();
    frame.contentWindow.print();
    window.setTimeout(() => frame.remove(), 1000);
    return true;
}

export function downloadText(filename: string, text: string) {
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 40) || "checklist"
    );
}

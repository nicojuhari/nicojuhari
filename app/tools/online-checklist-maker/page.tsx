import type { Metadata } from "next";
import Checklist from "./_components/checklist";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

const DESCRIPTION =
    "Make a checklist in seconds - packing, moving, groceries or daily tasks. Paste a list, reorder, track progress, then copy, download or print. Free, no sign-up.";

export const metadata: Metadata = {
    title: "Online Checklist Maker | Create and Manage Tasks Fast",
    description: DESCRIPTION,
    alternates: { canonical: "https://nicojuhari.com/tools/online-checklist-maker" },
};

const tips = [
    {
        label: "Add",
        title: "Paste a whole list",
        text: "Copy lines from notes, email or a document and paste them into the task field - each line becomes a task.",
    },
    {
        label: "Organise",
        title: "Reorder and filter",
        text: "Drag the handle to reorder (or use the arrow keys), and switch between all, to do and done.",
    },
    {
        label: "Keep",
        title: "Saved on this device",
        text: "Your list stays in this browser - no account needed. Copy it as text, download it or print it to take it elsewhere.",
    },
];

export default function ChecklistPage() {
    return (
        <ToolPageShell
            currentSlug="online-checklist-maker"
            title="Online Checklist Maker"
            description="Build and track any checklist in seconds - packing, tasks, shopping or anything else."
            perks={["Free", "No sign-up", "Saved in your browser"]}
            schema={webAppSchema("Online Checklist Maker", DESCRIPTION, "online-checklist-maker")}
            tips={tips}
            bare
        >
            <Checklist />
        </ToolPageShell>
    );
}

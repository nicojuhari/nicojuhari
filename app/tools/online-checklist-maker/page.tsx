import type { Metadata } from "next";
import Checklist from "./_components/checklist";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Online Checklist Maker | Create and Manage Tasks Fast",
    description:
        "Create and share checklists in seconds - packing, wedding, camping, grocery, move-in, or daily tasks. Mobile-friendly, private, no signup, and FREE.",
    alternates: { canonical: "https://nicojuhari.com/tools/online-checklist-maker" },
};

export default function ChecklistPage() {
    return (
        <ToolPageShell
            currentSlug="online-checklist-maker"
            title="Online Checklist Maker"
            description="Build and track any checklist in seconds - packing, tasks, shopping, or anything else. No signup needed."
            schema={webAppSchema(
                "Online Checklist Maker",
                "Create and share checklists in seconds - packing, wedding, camping, grocery, move-in, or daily tasks. Mobile-friendly, private, no signup, and FREE.",
                "online-checklist-maker"
            )}
            notes={
                <>
                    <p>
                        Quickly build checklists by adding tasks and tracking progress - perfect for packing, wedding
                        planning, grocery lists, moving, camping, or everyday to-dos.
                    </p>
                    <p>Add and reorder items, check progress, and share your list with friends or coworkers instantly.</p>
                    <p>Works on mobile and desktop, and all data stays in your browser for privacy - no accounts, no setup.</p>
                </>
            }
        >
            <Checklist />
        </ToolPageShell>
    );
}

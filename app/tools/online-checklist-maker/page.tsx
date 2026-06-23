import type { Metadata } from "next";
import Checklist from "./_components/checklist";

export const metadata: Metadata = {
    title: "Online Checklist Maker | Create and Manage Tasks Fast",
    description:
        "Create and share checklists in seconds - packing, wedding, camping, grocery, move-in, or daily tasks. Mobile-friendly, private, no signup, and FREE.",
};

export default function ChecklistPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Online Checklist Maker</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">Build and track any checklist in seconds — packing, tasks, shopping, or anything else. No signup needed.</h2>
            <Checklist />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>
                    Quickly build checklists by adding tasks and tracking progress - perfect for packing, wedding planning, grocery lists,
                    moving, camping, or everyday to-dos.
                </p>
                <p>Add and reorder items, check progress, and share your list with friends or coworkers instantly.</p>
                <p>Export as text or print your checklist when you need a paper copy.</p>
                <p>Works on mobile and desktop, and all data stays in your browser for privacy - no accounts, no setup.</p>
            </div>
        </div>
    );
}

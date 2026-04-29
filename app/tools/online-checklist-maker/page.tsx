import type { Metadata } from "next"
import Checklist from "./_components/checklist"

export const metadata: Metadata = {
  title: "Online Checklist Maker | Create and Manage Tasks Fast",
  description: "Create and share checklists in seconds - packing, wedding, camping, grocery, move-in, or daily tasks. Mobile-friendly, private, no signup, and FREE.",
}

export default function ChecklistPage() {
  return (
    <div className="section px-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Online Checklist Maker</h1>
      <p className="text-muted-foreground mb-8">Build, share, and track checklists fast — no signup required.</p>
      <Checklist />
    </div>
  )
}

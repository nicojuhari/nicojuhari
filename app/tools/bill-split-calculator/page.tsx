import type { Metadata } from "next"
import BillSplit from "./_components/bill-split"

export const metadata: Metadata = {
  title: "Bill Split Calculator | Split Restaurant & Travel Costs Fast",
  description: "Free Bill Split Calculator - split restaurant and trip expenses, see who owes, and settle with minimal transfers. Works in-browser, no account.",
}

export default function BillSplitPage() {
  return (
    <div className="section px-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Bill Split Calculator</h1>
      <p className="text-muted-foreground mb-8">Perfect for splitting restaurant bills and travel expenses with friends.</p>
      <BillSplit />
    </div>
  )
}

import type { Metadata } from "next";
import BillSplit from "./_components/bill-split";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Bill Split Calculator | Split Restaurant & Travel Costs Fast",
    description:
        "Free Bill Split Calculator - split restaurant and trip expenses, see who owes, and settle with minimal transfers. Works in-browser, no account.",
    alternates: { canonical: "https://nicojuhari.com/tools/bill-split-calculator" },
};

export default function BillSplitPage() {
    return (
        <ToolPageShell
            currentSlug="bill-split-calculator"
            title="Bill Split Calculator"
            description="Add people, log expenses, and see exactly who owes what - with minimal transfers to settle up."
            schema={webAppSchema(
                "Bill Split Calculator",
                "Free Bill Split Calculator - split restaurant and trip expenses, see who owes, and settle with minimal transfers. Works in-browser, no account.",
                "bill-split-calculator"
            )}
            notes={
                <>
                    <p>
                        Split any bill - restaurant tabs, travel costs, shared subscriptions - by adding people, logging
                        expenses, and choosing equal or custom splits.
                    </p>
                    <p>See who paid and who owes, with clear step-by-step payments to settle balances.</p>
                    <p>Everything runs in your browser - no uploads, no accounts, and nothing is stored on our servers.</p>
                </>
            }
        >
            <BillSplit />
        </ToolPageShell>
    );
}

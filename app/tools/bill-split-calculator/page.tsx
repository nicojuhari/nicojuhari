import type { Metadata } from "next";
import BillSplit from "./_components/bill-split";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Bill Split Calculator | Split Restaurant & Travel Costs Fast",
    description:
        "Free Bill Split Calculator - split restaurant and trip expenses, see who owes, and settle with minimal transfers. Works in-browser, no account.",
    alternates: { canonical: "https://nicojuhari.com/tools/bill-split-calculator" },
};

export default function BillSplitPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        webAppSchema(
                            "Bill Split Calculator",
                            "Free Bill Split Calculator - split restaurant and trip expenses, see who owes, and settle with minimal transfers. Works in-browser, no account.",
                            "bill-split-calculator"
                        )
                    ),
                }}
            />
            <h1 className="text-3xl font-bold mb-2">Bill Split Calculator</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">
                Add people, log expenses, and see exactly who owes what - with minimal transfers to settle up.
            </h2>
            <BillSplit />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>
                    Split any bill - restaurant tabs, travel costs, shared subscriptions - by adding people, logging expenses, and choosing
                    equal or custom splits.
                </p>
                <p>See who paid and who owes, with clear step-by-step payments to settle balances.</p>
                <p>The calculator minimizes the number of transfers so groups settle up fast and fairly.</p>
                <p>Works on mobile and desktop with instant updates and a full expense history per person.</p>
                <p>Everything runs in your browser - no uploads, no accounts, and nothing is stored on our servers.</p>
            </div>
        </div>
    );
}

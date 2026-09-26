import type { Metadata } from "next";
import BillSplit from "./_components/bill-split";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Split a restaurant bill with tip in seconds, or track group costs for trips and shared flats - see who owes whom. Free, no sign-up.";

export const metadata: Metadata = pageMetadata({
    title: "Bill Split Calculator | Split Restaurant & Travel Costs Fast",
    description: DESCRIPTION,
    path: "/tools/bill-split-calculator",
});

const tips = [
    {
        label: "Dinner",
        title: "Quick split for one bill",
        text: "Enter the total, pick a tip and the number of people. Round each share up so nobody has to count cents.",
    },
    {
        label: "Trips",
        title: "Group expenses for shared costs",
        text: "Log who paid what and who it was for - split equally, by exact amounts or by shares when someone joined for part of it.",
    },
    {
        label: "Settle",
        title: "Fewest payments to even out",
        text: "Settle-up shows who pays whom. Mark payments as done, then copy a short summary or every transaction for the group chat.",
    },
];

export default function BillSplitPage() {
    return (
        <ToolPageShell
            currentSlug="bill-split-calculator"
            title="Bill Split Calculator"
            description="Split one bill in seconds, or track shared costs for a trip and settle up with the fewest payments."
            perks={["Free", "No sign-up", "Saved in your browser"]}
            schema={webAppSchema("Bill Split Calculator", DESCRIPTION, "bill-split-calculator")}
            tips={tips}
            bare
        >
            <BillSplit />
        </ToolPageShell>
    );
}

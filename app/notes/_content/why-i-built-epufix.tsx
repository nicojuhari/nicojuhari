import { FileText, Receipt, Send, Wallet } from "lucide-react";
import { Steps } from "../_components/visuals";
import type { Note } from "./types";

// Source: campaigns/epufix-launch/social/linkedin-founder-story.md + simple-tracker brand/marketing-plan.md (founder story). No price.
export const whyIBuiltEpufix: Note = {
    slug: "why-i-built-epufix",
    title: "Why I moved my invoices out of a spreadsheet",
    description:
        "I couldn't answer one question from my sheets: where do I stand? So I built EPUfix, one place for offers, invoices, payments and income.",
    date: "2026-11-02",
    tag: "tools",
    draft: false,
    body: (
        <>
            <p>
                Because one simple question was hard to answer: <strong>&quot;Where do I stand?&quot;</strong> (Wo stehe ich?) So I built
                one place for it, for myself first. It became <a href="https://epufix.at/?utm_source=nicojuhari&utm_campaign=why-i-built-epufix">EPUfix</a>.
            </p>
            <p>
                I started with Google Sheets. It&apos;s good for a lot of things. For my own businesses it stopped working: I typed in
                numbers, checked them, and still couldn&apos;t see much. My invoices (Rechnungen) were made in different places. I
                couldn&apos;t easily see which ones were paid.
            </p>

            <h2>One path, each number typed once</h2>
            <Steps
                items={[
                    { title: "Offer", text: "The quote for the work (Angebot).", icon: FileText },
                    { title: "Invoice", text: "One click turns the offer into an invoice.", icon: Receipt },
                    { title: "Payment", text: "Recording the payment books the income and marks the invoice paid.", icon: Wallet },
                    { title: "Steuerberater", text: "One file for the tax advisor when it's time.", icon: Send },
                ]}
            />
            <p>
                On any day I see my profit so far, the money customers still owe me, how close I am to the small business limit
                (Kleinunternehmergrenze), and an estimate of what to set aside for SVS and income tax.
            </p>

            <h2>What I left out on purpose</h2>
            <ul>
                <li>No bank sync. You record a payment once, on the invoice, and it&apos;s booked.</li>
                <li>No AI guessing categories. You choose, so you know why a number is where it is.</li>
                <li>No double-entry bookkeeping. That stays with the Steuerberater, who it&apos;s made for.</li>
            </ul>
            <p>
                It&apos;s made for one-person businesses (EPU) in Austria. It doesn&apos;t replace a tax advisor. It makes the handoff
                shorter.
            </p>
        </>
    ),
};

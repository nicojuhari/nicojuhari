import type { Note } from "./types";

// Source: campaigns/epufix-launch/social/linkedin-founder-story.md + simple-tracker brand/marketing-plan.md (founder story). No price.
export const whyIBuiltEpufix: Note = {
    slug: "why-i-built-epufix",
    title: "You have all the numbers. Do you know where you stand?",
    description:
        "Many small business owners have every number and still can't answer one question: where do I stand? That's why EPUfix exists.",
    date: "2026-11-02",
    tag: "tools",
    draft: false,
    body: (
        <>
            <p>Invoices in one place. Payments in another. Income typed into a sheet.</p>
            <p>
                Every number is there. And still one simple question is hard to answer: <strong>&quot;Where do I stand?&quot;</strong> (Wo
                stehe ich?)
            </p>
            <p>That was me, with my own two businesses. Google Sheets is good for a lot of things. But my numbers lived in too many spots.</p>
            <p>
                <strong>Having the numbers and seeing them are two different things.</strong>
            </p>
            <p>
                So I built one place for it, for myself first. It became{" "}
                <a href="https://epufix.at/?utm_source=nicojuhari&utm_campaign=why-i-built-epufix">EPUfix</a>.
            </p>

            <h2>One path, each number typed once</h2>
            <ol>
                <li>
                    <strong>Offer</strong> - the quote for the work (Angebot).
                </li>
                <li>
                    <strong>Invoice</strong> - one click turns the offer into an invoice (Rechnung).
                </li>
                <li>
                    <strong>Payment</strong> - recording it books the income and marks the invoice paid.
                </li>
                <li>
                    <strong>Steuerberater</strong> - one file for the tax advisor when it&apos;s time.
                </li>
            </ol>
            <p>On any day you see the profit so far and the money customers still owe.</p>
            <p>
                You also see how close you are to the small business limit (Kleinunternehmergrenze), and an estimate of what to set aside
                for SVS and income tax.
            </p>

            <h2>What&apos;s left out on purpose</h2>
            <ul>
                <li>No bank sync. You record a payment once, on the invoice, and it&apos;s booked.</li>
                <li>No AI guessing categories. You choose, so you know why a number is where it is.</li>
                <li>No double-entry bookkeeping. That stays with the Steuerberater, who it&apos;s made for.</li>
            </ul>
            <p>It&apos;s made for one-person businesses (EPU) in Austria.</p>
            <p>It doesn&apos;t replace a tax advisor. It makes the handoff shorter.</p>
        </>
    ),
};

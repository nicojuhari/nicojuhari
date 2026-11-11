/**
 * Engineering case studies, shown at /projects/<slug>. Keys match project slugs in projects.ts.
 * Facts come from the repos (2026-11-11). EPUfix rules: no user counts, no prices, tax numbers are estimates, "EU-hosted".
 * Ideal Credit: no client data, no endpoints, nothing about security internals.
 */

export type CaseStudy = {
    slug: string;
    title: string;
    /** One sentence under the title; also the meta description */
    summary: string;
    role: string;
    years: string;
    status: string;
    url?: string;
    stack: string[];
    numbers: { value: string; label: string }[];
    problem: string[];
    /** The hard parts - each one is a short section */
    parts: { title: string; text: string[] }[];
    tradeoffs: string[];
    next: string;
};

export const caseStudies: CaseStudy[] = [
    {
        slug: "epufix",
        title: "EPUfix",
        summary: "An invoicing and bookkeeping app for self-employed people in Austria, built so the money rules live in the database, not only in the UI.",
        role: "Solo founder and engineer: product, design, code, operations",
        years: "2026 - now",
        status: "Live since October 2026",
        url: "https://epufix.at",
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (Postgres)", "Stripe", "next-intl", "Tailwind CSS", "Vitest", "Vercel"],
        numbers: [
            { value: "20", label: "Postgres tables" },
            { value: "42", label: "database triggers" },
            { value: "31", label: "migrations" },
            { value: "~43k", label: "lines of TypeScript" },
        ],
        problem: [
            "One-person businesses in Austria (EPU) juggle offers in Word, invoices in Excel and receipts in a folder. Once a year they hand it all to a tax advisor.",
            "I run two small businesses myself, so I built the tool I needed: an offer becomes an invoice, a payment becomes income, and each income lands in the right line of the Austrian tax form (E1a). It is in German and English.",
        ],
        parts: [
            {
                title: "The database enforces the rules",
                text: [
                    "Every table has row-level security, so a user only ever sees their own workspace. Workspaces are created by one database function that also decides who gets a free trial. Users can't write billing fields at all.",
                    "Access after a subscription ends is checked by triggers on every table you can change. If a server action forgets a check, the database still refuses the write.",
                ],
            },
            {
                title: "Money moves in one step or not at all",
                text: [
                    "Turning an offer into an invoice, or recording a payment, runs as one Postgres function. It locks the row, checks the state, copies the items, assigns the next invoice number and books the income together.",
                    "Invoice status (unpaid, partly paid, paid) is owned by a trigger. Once a payment exists, the invoice lines and the payment booking are locked. Line totals are rounded by one rule that exists twice, in SQL and in TypeScript, and both give the same result.",
                ],
            },
            {
                title: "Austrian invoice law as code",
                text: [
                    "An Austrian invoice needs different details depending on its size and the seller: small-business VAT exemption, reverse charge for EU business clients, the €400 and €10,000 thresholds, service dates, tax numbers.",
                    "These rules are plain functions that block an incomplete invoice and print the legal note it needs. Issued invoices can't be deleted, because the law says they must be kept.",
                ],
            },
            {
                title: "A tax estimate you can follow",
                text: [
                    "Income tax and social insurance (SVS) are calculated from year-by-year tables for 2024 to 2026, checked against the official forms. The SVS part models the provisional payments and the back-payment that follows in later years.",
                    "One function feeds both the dashboard and the tax report, so the two numbers can never disagree. It is always shown as an estimate.",
                ],
            },
            {
                title: "Stripe webhooks that survive the real world",
                text: [
                    "The webhook checks the signature, records each event so a retry is never processed twice, and reads the subscription fresh from Stripe, because events can arrive out of order.",
                ],
            },
        ],
        tradeoffs: [
            "No PDF library: invoices print from one shared layout with print CSS. Less code, and the PDF looks exactly like the screen.",
            "A small ZIP and CSV writer in-house instead of new dependencies. The tax advisor package (3 CSV files in a ZIP) is built in the browser.",
            "Multi-currency was built, then removed. A guarded migration refused to run if any non-euro data existed.",
            "Clear scope: not accounting software, no bank sync. Those would make the product harder to trust, not easier to use.",
        ],
        next: "The test suite is thin (Vitest on the tax math and formatters). Next: tests around the invoice and payment functions in the database.",
    },
    {
        slug: "ideal-credit-system",
        title: "Ideal Credit Management",
        summary: "The loan management system a consumer credit company runs on every day - rebuilt from Express and MySQL to Next.js and Postgres without stopping the business.",
        role: "Sole engineer, and former credit officer at the same company",
        years: "2021 - now (rebuilt in 2026)",
        status: "Private, used every day",
        stack: ["Next.js 16", "React 19", "TypeScript", "Supabase (Postgres)", "TanStack Table", "Zod", "jsPDF", "Tailwind CSS"],
        numbers: [
            { value: "35", label: "Postgres tables" },
            { value: "16", label: "report pages" },
            { value: "~51k", label: "lines of TypeScript" },
            { value: "730+", label: "commits across two versions" },
        ],
        problem: [
            "A consumer credit company in Moldova needs to know, every day, what each client owes: principal, interest and penalties, per installment. It also has to send the national credit bureau and the regulators their reports on time.",
            "I built the previous version in 2021 on Node.js, Express and MySQL and ran it for five years. In 2026 I rebuilt it on Next.js and Postgres. I worked in credit at this company before I wrote code, so I know the rules from both sides.",
        ],
        parts: [
            {
                title: "A daily engine that catches up",
                text: [
                    "Every day, interest is added, installments change status, penalties are counted and contracts are re-classified by risk. The job starts from the last day it finished and processes each missed day in order, so a server outage never skips a day. A lock stops two runs at once.",
                ],
            },
            {
                title: "Repairing history, safely",
                text: [
                    "Interest and penalty history can be rebuilt from the schedule and the payments. The planner is idempotent: run it twice and the second run changes nothing.",
                    "About a dozen data checks (a closed contract with a balance, duplicate installments, a job running late) feed a report the team can act on.",
                ],
            },
            {
                title: "Splitting a payment correctly",
                text: [
                    "A payment is split into principal, interest and penalty per installment, oldest debt first, with optional reductions. After each payment the contract is checked again and closed and reported when it is fully paid. The same code serves cash payments and payments from other apps.",
                ],
            },
            {
                title: "Reports for regulators",
                text: [
                    "Loan-loss provisions by five risk classes, calculated for any past date. Portfolio-at-risk reports, central-bank and regulator reports, and an XML feed to the national credit bureau. Any contract can be reconstructed as it was on a given day.",
                ],
            },
            {
                title: "Moving five years of data",
                text: [
                    "About 25 migration modules moved the data from MySQL to Postgres, table by table: merging two client tables, fixing wrong legacy dates and moving collateral into its own tables.",
                    "The new API kept the old route shapes, so the other apps that talk to the system kept working on the day of the switch.",
                ],
            },
        ],
        tradeoffs: [
            "The loan math (repayment schedule, effective annual rate, debt-to-income ratio) lives in my own npm package, ideal-credit. Both versions of the system and the public website use the same code.",
            "Romanian-only UI, with domain names kept in Romanian in the code. The team and the regulators speak it, and nobody has to translate a term twice.",
            "Contracts are generated as Word files from templates, because the team edits them by hand before signing.",
        ],
        next: "Automated tests around the interest and penalty math, so the reconciliation checks become a safety net instead of the first line of defense.",
    },
    {
        slug: "handwerker-netz",
        title: "Handwerker Netz",
        summary: "A bilingual website for a Vienna handyman business I co-own - built to be found on Google and Google Maps, with no backend to run.",
        role: "Co-owner, engineer and marketer",
        years: "2026 - now",
        status: "Live",
        url: "https://handwerker-netz.at",
        stack: ["Next.js 16", "React 19", "TypeScript", "next-intl", "MDX", "Tailwind CSS", "Vercel"],
        numbers: [
            { value: "75+", label: "indexable pages, DE + EN" },
            { value: "39.5k", label: "Google impressions in 3 months" },
            { value: "625", label: "clicks from Google in 3 months" },
            { value: "30", label: "Google reviews" },
        ],
        problem: [
            "A small handyman business in Vienna lives on people searching \"furniture assembly Vienna\" and calling. The website has to rank for dozens of services in German and English, load fast on a phone, and turn a visit into a message.",
        ],
        parts: [
            {
                title: "Pages from data",
                text: [
                    "Each of the 15 services is one typed data file with both languages. The pages, the sitemap and the structured data are generated from it, so a new service is one file. German has no URL prefix and every path is translated (/leistungen/moebelmontage, /en/services/furniture-assembly).",
                ],
            },
            {
                title: "SEO in the code, not in a plugin",
                text: [
                    "Structured data for the business, services, prices, FAQs and how-tos. Hreflang and canonical URLs on every page. About 170 permanent redirects keep old URLs alive after each restructure, so no search ranking is lost.",
                ],
            },
            {
                title: "A small image pipeline",
                text: [
                    "A script converts photos to WebP, fixes rotation, strips location data from the files and records each image's size, so pages don't jump while loading.",
                ],
            },
            {
                title: "No backend on purpose",
                text: [
                    "The quote form builds a message and opens WhatsApp, with email as a fallback. No server, no database, no spam to filter - and clients reply where they already are.",
                ],
            },
        ],
        tradeoffs: [
            "Static pages everywhere: nothing to maintain at night, and fast on any phone.",
            "A blog in MDX with small React diagrams, instead of a CMS. One fewer service to pay for and keep up to date.",
        ],
        next: "A small request manager that collects the WhatsApp and email requests in one place - planned as a separate app.",
    },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

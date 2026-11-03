import Link from "next/link";
import { BarChart, Figure, Stats } from "../_components/visuals";
import type { Note } from "./types";

/**
 * TEMPLATE - not listed on the site. Copy to `<slug>.tsx`, rename the export, add it to index.ts.
 * Keep one or two visuals; delete the rest. Rules: brand/notes-and-uses-strategy.md
 */
export const templateNote: Note = {
    slug: "note-template",
    title: "A hook: a question, a strong claim, or the surprise. Under 60 characters",
    description: "The answer in one plain sentence. This is the meta description and the text in the notes list.",
    date: "2026-11-02",
    tag: "business",
    // source: { label: "LinkedIn", url: "https://www.linkedin.com/posts/..." },
    draft: true,
    body: (
        <>
            <p>
                Hook first: the surprise, the number, or the moment it went wrong. Then answer the title. This is the part search
                engines and AI answers quote.
            </p>
            <p>
                Then the context: what happened, what I noticed, one <strong>real detail</strong>. Link to a{" "}
                <Link href="/services">service</Link>, a tool or another note where it helps.
            </p>

            <Stats
                items={[
                    { value: "3×", label: "more calls" },
                    { value: "2 days", label: "to build" },
                    { value: "€0", label: "extra ad spend" },
                ]}
            />

            <BarChart
                unit=" calls"
                caption="Calls per month, before and after (example data)."
                data={[
                    { label: "Before", value: 12 },
                    { label: "After", value: 37, highlight: true },
                ]}
            />

            <h2>A short subheading if the note needs one</h2>

            {/* Lists: plain <ul>/<ol> with a <strong> lead word. No cards, no icons. */}
            <ol>
                <li>
                    <strong>Ad</strong> - someone sees the ad.
                </li>
                <li>
                    <strong>Page</strong> - one clear page, one button.
                </li>
                <li>
                    <strong>Call</strong> - they tap to call.
                </li>
            </ol>

            {/* Screenshot: put files in public/notes/<slug>/ */}
            {/* <Figure src="/notes/<slug>/before-after.png" alt="Describe what the image shows" caption="Fake data." /> */}

            <Figure caption="Custom SVG diagram - draw anything a chart can't show.">
                <svg viewBox="0 0 400 120" role="img" aria-label="Visitor to customer flow" className="h-auto w-full">
                    <rect x="0" y="35" width="110" height="50" rx="12" fill="#f6f5f1" stroke="#e6e3dc" />
                    <text x="55" y="65" textAnchor="middle" fontSize="15" fill="#111418">Visitor</text>
                    <path d="M118 60h50" stroke="#127a6f" strokeWidth="2" markerEnd="url(#arrow)" />
                    <rect x="175" y="35" width="110" height="50" rx="12" fill="#f6f5f1" stroke="#e6e3dc" />
                    <text x="230" y="65" textAnchor="middle" fontSize="15" fill="#111418">Lead</text>
                    <path d="M293 60h50" stroke="#127a6f" strokeWidth="2" markerEnd="url(#arrow)" />
                    <circle cx="372" cy="60" r="26" fill="#127a6f" />
                    <text x="372" y="65" textAnchor="middle" fontSize="13" fill="#fff">€</text>
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                            <path d="M0 0l10 5-10 5z" fill="#127a6f" />
                        </marker>
                    </defs>
                </svg>
            </Figure>

            <p>End with what I&apos;d do next, or what I&apos;m still not sure about. No call to action needed.</p>
        </>
    ),
};

import type { Metadata } from "next";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, collectionSchema, personRef } from "@/app/_lib/schema";
import NotesFilter from "./_components/notes-filter";
import { formatDate, notes } from "./_content";

const description = "Short notes on what I build, find and use: code, money, AI and small business. Real numbers, real screens, and simple words.";

export const metadata: Metadata = pageMetadata({ title: "Notes on Code, Money, AI and Small Business", description, path: "/notes" });

const schema = collectionSchema(
    "Notes",
    description,
    "/notes",
    notes.map((n) => ({
        type: "BlogPosting",
        name: n.title,
        description: n.description,
        url: absoluteUrl(`/notes/${n.slug}`),
        extra: { datePublished: n.date, author: personRef },
    }))
);

export default function NotesPage() {
    return (
        <div className="container-sm mt-8 flex flex-col gap-10 sm:mt-14">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex flex-col gap-5">
                <p className="eyebrow">Notes</p>
                <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px]">
                    What I build, find <span className="text-teal">and use.</span>
                </h1>
                <p className="text-lg leading-normal text-[#4a4f57] sm:text-xl">{description}</p>
            </section>

            <NotesFilter notes={notes.map((n) => ({ slug: n.slug, title: n.title, description: n.description, date: n.date, tag: n.tag, dateLabel: formatDate(n.date) }))} />
        </div>
    );
}

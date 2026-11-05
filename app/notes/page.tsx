import type { Metadata } from "next";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, collectionSchema, personRef } from "@/app/_lib/schema";
import NotesFilter from "./_components/notes-filter";
import { formatDate, notes } from "./_content";

const description = "Things I notice while building apps and running small businesses. Real numbers, real screens, simple words.";

export const metadata: Metadata = pageMetadata({ title: "Short Ideas on Software, Business and AI", description, path: "/notes" });

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
        <div className="container mt-8 flex flex-col gap-10 sm:mt-14">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex max-w-[720px] flex-col gap-5">
                <p className="eyebrow">Notes</p>
                <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-balance text-ink sm:text-[54px]">
                    Short ideas about <span className="text-teal">software, business and AI.</span>
                </h1>
                <p className="max-w-[60ch] text-lg leading-normal text-pretty text-[#4a4f57] sm:text-xl">{description}</p>
            </section>

            <NotesFilter notes={notes.map((n) => ({ slug: n.slug, title: n.title, description: n.description, date: n.date, tag: n.tag, dateLabel: formatDate(n.date) }))} />
        </div>
    );
}

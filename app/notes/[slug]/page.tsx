import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, breadcrumbSchema, personRef } from "@/app/_lib/schema";
import { PERSON_NAME } from "@/app/_lib/site";
import { formatDate, getNote, notes, noteTagLabel } from "../_content";

export const dynamicParams = false;

export function generateStaticParams() {
    return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const note = getNote((await params).slug);
    if (!note) return {};
    const meta = pageMetadata({ title: `${note.title} | ${PERSON_NAME}`, description: note.description, path: `/notes/${note.slug}` });
    return {
        ...meta,
        openGraph: { ...meta.openGraph, type: "article", publishedTime: note.date, modifiedTime: note.updated ?? note.date, authors: [PERSON_NAME] },
        ...(note.draft && { robots: { index: false } }),
    };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
    const note = getNote((await params).slug);
    if (!note) notFound();

    const path = `/notes/${note.slug}`;
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: note.title,
        description: note.description,
        url: absoluteUrl(path),
        mainEntityOfPage: absoluteUrl(path),
        datePublished: note.date,
        dateModified: note.updated ?? note.date,
        author: { ...personRef, "@type": "Person", name: PERSON_NAME, url: absoluteUrl("/") },
        image: absoluteUrl(`${path}/opengraph-image`),
        inLanguage: "en",
        keywords: noteTagLabel[note.tag],
    };
    const breadcrumb = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Notes", path: "/notes" },
        { name: note.title, path },
    ]);

    return (
        <div className="mt-8 flex flex-col gap-16 sm:mt-14">
            <article className="container-sm flex flex-col gap-8">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumb]) }} />
                <Link href="/notes" className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand hover:text-teal">
                    <ArrowLeft className="size-4" aria-hidden /> All notes
                </Link>
                <header className="flex flex-col gap-4">
                    <p className="text-sm text-ink-muted">
                        <time dateTime={note.date}>{formatDate(note.date)}</time> ·{" "}
                        <span className="font-semibold text-teal">{noteTagLabel[note.tag]}</span>
                        {note.updated && <> · Updated <time dateTime={note.updated}>{formatDate(note.updated)}</time></>}
                        {note.draft && <> · <span className="font-semibold text-brand-rose">Draft</span></>}
                    </p>
                    <h1 className="text-[34px] leading-[1.08] font-semibold tracking-[-0.035em] text-ink sm:text-[46px]">{note.title}</h1>
                </header>

                <div className="text-[17px] leading-[1.7] text-ink-soft sm:text-lg [&_a]:font-medium [&_a]:text-brand [&_a]:underline [&_a]:decoration-teal/40 [&_a]:underline-offset-4 hover:[&_a]:text-teal [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_li]:my-1 [&_ol:not([class])]:list-decimal [&_ol:not([class])]:pl-6 [&_p]:my-4 [&_strong]:font-semibold [&_strong]:text-ink [&_ul:not([class])]:list-disc [&_ul:not([class])]:pl-6">
                    {note.body}
                </div>

                <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-6 text-[15px] text-ink-muted">
                    <span>By {PERSON_NAME}</span>
                    {note.source && (
                        <a href={note.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-brand hover:text-teal">
                            Discuss on {note.source.label} <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                    )}
                </footer>
            </article>

            <CtaSection
                className="container"
                title="Want this kind of result for your business?"
                description="Tell me about your business on WhatsApp. I’ll reply within 24 hours with the first step."
                secondary={{ label: "See services", href: "/services" }}
            />
        </div>
    );
}

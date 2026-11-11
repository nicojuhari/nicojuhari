import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Mail } from "lucide-react";
import { ProjectMark } from "@/app/_components/icons";
import { caseStudies, getCaseStudy } from "@/app/_data/case-studies";
import { cvContact } from "@/app/_data/cv";
import { projects } from "@/app/_data/projects";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, breadcrumbSchema, personRef } from "@/app/_lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
    return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const c = getCaseStudy((await params).slug);
    if (!c) return {};
    return pageMetadata({ title: `${c.title}: Case Study`, description: c.summary, path: `/projects/${c.slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const c = getCaseStudy((await params).slug);
    const project = projects.find((p) => p.slug === c?.slug);
    if (!c || !project) notFound();

    const path = `/projects/${c.slug}`;
    const next = caseStudies[(caseStudies.indexOf(c) + 1) % caseStudies.length];
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${c.title}: Case Study`,
            description: c.summary,
            url: absoluteUrl(path),
            author: personRef,
            about: { "@type": "SoftwareApplication", name: c.title, ...(c.url && { url: c.url }) },
        },
        breadcrumbSchema([
            { name: "Work", path: "/projects" },
            { name: c.title, path },
        ]),
    ];

    return (
        <article className="container-sm mt-8 flex flex-col gap-14 sm:mt-12 sm:gap-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            <header className="flex flex-col gap-6">
                <Link href="/projects" className="inline-flex items-center gap-1.5 self-start py-2 text-[15px] font-semibold text-brand hover:text-teal">
                    <ArrowLeft className="size-4" aria-hidden /> All work
                </Link>
                <div className="flex items-center gap-4">
                    <ProjectMark project={project} className="size-14" />
                    <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px]">{c.title}</h1>
                </div>
                <p className="text-xl leading-normal text-balance text-[#4a4f57] sm:text-2xl">{c.summary}</p>
                <dl className="grid gap-x-8 gap-y-3 border-y border-rule py-5 text-[15px] sm:grid-cols-3">
                    <div className="flex flex-col gap-0.5">
                        <dt className="text-ink-muted">Role</dt>
                        <dd className="font-medium text-ink">{c.role}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <dt className="text-ink-muted">When</dt>
                        <dd className="font-medium text-ink">{c.years}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <dt className="text-ink-muted">Status</dt>
                        <dd className="font-medium text-ink">
                            {c.url ? (
                                <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-teal hover:underline">
                                    {c.status} · {new URL(c.url).hostname} <ArrowUpRight className="size-3.5" aria-hidden />
                                </a>
                            ) : (
                                c.status
                            )}
                        </dd>
                    </div>
                </dl>
                <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                    {c.stack.map((s) => (
                        <li key={s} className="rounded-full bg-white px-3 py-1 text-[13px] font-medium text-ink">
                            {s}
                        </li>
                    ))}
                </ul>
            </header>

            <dl className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
                {c.numbers.map((n) => (
                    <div key={n.label} className="flex flex-col gap-1 border-l border-rule pl-4">
                        <dt className="order-2 text-sm leading-snug text-ink-muted">{n.label}</dt>
                        <dd className="text-3xl font-semibold tracking-[-0.03em] text-ink tabular-nums">{n.value}</dd>
                    </div>
                ))}
            </dl>

            <section className="flex flex-col gap-4">
                <h2 className="section-title">The problem</h2>
                {c.problem.map((p) => (
                    <p key={p} className="text-[17px] leading-relaxed text-ink-soft sm:text-lg">
                        {p}
                    </p>
                ))}
            </section>

            <section className="flex flex-col gap-8">
                <h2 className="section-title">What I built</h2>
                <ol className="flex flex-col border-t border-rule">
                    {c.parts.map((part) => (
                        <li key={part.title} className="flex flex-col gap-3 border-b border-rule py-7">
                            <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{part.title}</h3>
                            {part.text.map((t) => (
                                <p key={t} className="text-[17px] leading-relaxed text-ink-soft">
                                    {t}
                                </p>
                            ))}
                        </li>
                    ))}
                </ol>
            </section>

            <section className="flex flex-col gap-5">
                <h2 className="section-title">Trade-offs</h2>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[17px] leading-relaxed text-ink-soft marker:text-teal">
                    {c.tradeoffs.map((t) => (
                        <li key={t}>{t}</li>
                    ))}
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-ink">What I’d do next</h2>
                <p className="text-[17px] leading-relaxed text-ink-soft">{c.next}</p>
            </section>

            <section className="flex flex-col items-start gap-5 rounded-[24px] bg-brand p-7 text-white sm:p-10">
                <h2 className="text-[28px] leading-tight font-semibold tracking-[-0.03em] sm:text-[34px]">Want to see the code?</h2>
                <p className="text-lg leading-normal text-[#c3cbe0]">I’m happy to walk you through it in an interview.</p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <a href={`mailto:${cvContact.email}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand transition-opacity hover:opacity-90">
                        <Mail className="size-[18px]" aria-hidden /> Email me
                    </a>
                    <Link href="/cv" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-[15px] font-semibold transition-colors hover:border-white/70">
                        <FileText className="size-[18px]" aria-hidden /> View CV
                    </Link>
                </div>
            </section>

            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-between gap-4 border-y border-rule py-6">
                <span className="flex flex-col gap-1">
                    <span className="text-sm text-ink-muted">Next case study</span>
                    <span className="text-2xl font-semibold tracking-[-0.02em] text-ink group-hover:text-teal">{next.title}</span>
                </span>
                <ArrowRight className="size-6 text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-teal" aria-hidden />
            </Link>
        </article>
    );
}

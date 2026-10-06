import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import CtaSection from "@/app/_components/cta-section";
import ProjectsFilter from "./_components/projects-filter";
import { pageMetadata } from "@/app/_lib/metadata";
import { collectionSchema, personRef } from "@/app/_lib/schema";

export const metadata: Metadata = pageMetadata({
    title: "Projects: Websites, Stores & Apps I Built | Nicolae Cojuhari",
    description:
        "Businesses I run, client websites, a Shopify store and web apps like Simple Trackr. What each one does, what I built, and where to try it.",
    path: "/projects",
});

const schema = collectionSchema(
    "Projects",
    "Businesses I run, client websites, a Shopify store and web apps like Simple Trackr. What each one does, what I built, and where to try it.",
    "/projects",
    [...projects]
        .sort((a, b) => a.sort - b.sort)
        .map((p) => ({
            type: "CreativeWork",
            name: p.title,
            description: p.description,
            url: p.url,
            extra: { dateCreated: String(p.year), creator: personRef },
        }))
);

const years = projects.map((p) => p.year);
const firstYear = Math.min(...years);
const lastYear = Math.max(...years);

const stats = [
    { value: String(projects.length), label: "Projects" },
    { value: String(projects.filter((p) => p.url).length), label: "Live to try" },
    {
        value: (
            <>
                {firstYear}
                <span className="text-[#9a9ea5]">–</span>
                {String(lastYear).slice(2)}
            </>
        ),
        label: "Years building",
    },
];

export default function ProjectsPage() {
    return (
        <div className="container mt-6 flex flex-col gap-8 sm:mt-16 sm:gap-10">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                <div className="flex flex-col gap-3.5 sm:gap-4.5">
                    <p className="eyebrow">Projects</p>
                    <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[56px] xl:leading-[1.02] xl:tracking-[-0.035em]">
                        Websites, stores and apps I’ve built.
                    </h1>
                    <p className="max-w-[620px] text-base leading-relaxed text-ink-muted sm:text-lg">
                        Businesses I run, websites for clients, and apps I made for my own work. See what each one does and
                        try the ones that are live.
                    </p>
                </div>
                <dl className="grid grid-cols-3 overflow-hidden rounded-[20px] border border-rule bg-white">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse gap-1 border-r border-line p-4 last:border-r-0 sm:p-5">
                            <dt className="text-xs text-ink-faint sm:text-[13px]">{stat.label}</dt>
                            <dd className="font-mono text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <ProjectsFilter projects={projects} />

            <CtaSection
                className="mt-2 sm:mt-6"
                title="Want something like this for your business?"
                description="Tell me about the workflow you want to improve. I reply within 24 hours, Monday to Friday."
                secondary={{ label: "See services", href: "/services" }}
            />
        </div>
    );
}

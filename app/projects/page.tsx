import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import CtaSection from "@/app/_components/cta-section";
import ProjectsFilter from "./_components/projects-filter";
import { pageMetadata } from "@/app/_lib/metadata";
import { collectionSchema, personRef } from "@/app/_lib/schema";

export const metadata: Metadata = pageMetadata({
    title: "Projects: Websites & Apps I Built | Nicolae Cojuhari",
    description:
        "Businesses I run, client websites and web apps like EPUfix. What each one does and where to try it.",
    path: "/projects",
});

const schema = collectionSchema(
    "Projects",
    "Businesses I run, client websites and web apps like EPUfix. What each one does and where to try it.",
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

export default function ProjectsPage() {
    return (
        <div className="container mt-8 flex flex-col gap-10 sm:mt-14 sm:gap-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="flex max-w-[720px] flex-col gap-5 sm:gap-6">
                <p className="eyebrow">Projects</p>
                <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px] xl:text-[64px]">
                    Websites and apps <span className="text-teal">in use today.</span>
                </h1>
                <p className="text-lg leading-normal text-[#4a4f57] sm:text-xl">
                    Businesses I run, websites for clients, and apps for my own work. Try the ones that are live.
                </p>
            </section>

            <ProjectsFilter projects={projects} />

            <CtaSection
                className="mt-6 sm:mt-12"
                title="Want a website or app like these?"
                description="Tell me about your business on WhatsApp. I’ll reply within 24 hours with the first step."
                secondary={{ label: "See services", href: "/services" }}
            />
        </div>
    );
}

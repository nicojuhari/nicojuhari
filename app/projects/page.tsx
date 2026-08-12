import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import ProjectsFilter from "./_components/projects-filter";

export const metadata: Metadata = {
    title: "Projects | Web Apps, Tools & Sites by Nicojuhari",
    description:
        "A curated look at web apps, tools, and client sites built with Next.js, React, and Shopify - from local business websites to custom web applications.",
    alternates: { canonical: "https://nicojuhari.com/projects" },
};

export default function ProjectsPage() {
    return (
        <div className="container py-6 sm:py-10">
            <header className="mb-10 max-w-2xl">
                <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink">Projects</h1>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted">
                    Apps and websites I&apos;ve built - for clients and as products of my own.
                </p>
            </header>
            <ProjectsFilter projects={projects} />
        </div>
    );
}

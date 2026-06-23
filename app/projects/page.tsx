import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import ProjectsFilter from "./_components/projects-filter";

export const metadata: Metadata = {
    title: "Projects | Web Apps, Tools & Sites by Nicojuhari",
    description:
        "A curated look at web apps, tools, and client sites built with Next.js, React, and Shopify — from local business websites to custom web applications.",
};

export default function ProjectsPage() {
    return (
        <div className="section container">
            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-3">Projects</h1>
                <p className="text-muted-foreground text-lg">A selection of web apps and tools I&apos;ve built.</p>
            </div>
            <ProjectsFilter projects={projects} />
        </div>
    );
}

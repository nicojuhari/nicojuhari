import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import ProjectsFilter from "./_components/projects-filter";

export const metadata: Metadata = {
    title: "Projects",
    description: "A selection of web apps and tools I've built.",
};

export default function ProjectsPage() {
    return (
        <div className="bg-muted/40">
            <div className="section container">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold mb-3">Projects</h1>
                    <p className="text-muted-foreground text-lg">A selection of web apps and tools I&apos;ve built.</p>
                </div>
                <ProjectsFilter projects={projects} />
            </div>
        </div>
    );
}

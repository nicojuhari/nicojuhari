"use client";

import { useState } from "react";
import ProjectCard from "@/app/_components/project-card";
import type { Project, ProjectType } from "@/app/_data/projects";
import { typeLabel } from "@/app/_data/projects";

const typeFilters: Array<"All" | ProjectType> = [
    "All",
    "web-app",
    "mobile",
    "business-website",
    "ecommerce",
];

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<"All" | ProjectType>("All");

    const sorted = [...projects].sort((a, b) => a.sort - b.sort);
    const availableTypes = new Set(projects.map((p) => p.type));
    const filters = typeFilters.filter((t) => t === "All" || availableTypes.has(t));
    const filtered = active === "All" ? sorted : sorted.filter((p) => p.type === active);

    return (
        <div>
            <div className="mb-8 flex flex-wrap gap-2">
                {filters.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => setActive(tag)}
                        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                            active === tag
                                ? "border-ink bg-ink text-white"
                                : "border-rule bg-white text-ink-muted hover:border-ink/30 hover:text-ink"
                        }`}
                    >
                        {tag === "All" ? "All" : typeLabel[tag]}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className="py-16 text-center text-ink-muted">No projects match this filter.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filtered.map((project) => (
                        <li key={project.slug}>
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

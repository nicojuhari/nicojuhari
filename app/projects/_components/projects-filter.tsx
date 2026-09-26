"use client";

import { useState } from "react";
import FilterPills from "@/app/_components/filter-pills";
import { FeaturedProjectCard, ProjectCard } from "@/app/_components/project-cards";
import type { Project, ProjectCategory } from "@/app/_data/projects";
import { categoryLabel } from "@/app/_data/projects";

type FilterId = "all" | ProjectCategory;

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<FilterId>("all");

    const sorted = [...projects].sort((a, b) => a.sort - b.sort);
    const categories = (Object.keys(categoryLabel) as ProjectCategory[]).filter((c) => projects.some((p) => p.category === c));
    const filters = [
        { id: "all" as FilterId, label: "All", count: projects.length },
        ...categories.map((c) => ({
            id: c as FilterId,
            label: categoryLabel[c],
            count: projects.filter((p) => p.category === c).length,
        })),
    ];

    const visible = active === "all" ? sorted : sorted.filter((p) => p.category === active);
    const featured = visible.filter((p) => p.featured);
    const rest = visible.filter((p) => !p.featured);

    return (
        <div className="flex flex-col gap-6 sm:gap-10">
            <FilterPills filters={filters} active={active} onChange={setActive} label="Filter projects by category" />

            {featured.map((project, i) => (
                <FeaturedProjectCard key={project.slug} project={project} flip={i % 2 === 1} />
            ))}

            {rest.length > 0 && (
                <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
                    {rest.map((project) => (
                        <li key={project.slug} className="min-w-0">
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

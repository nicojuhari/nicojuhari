"use client";

import { useState } from "react";
import ProjectDialog from "@/app/_components/project-dialog";
import type { Project } from "@/app/_data/projects";

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 border rounded-xl p-4 bg-white hover:shadow-md hover:border-foreground/20 transition-all text-left w-full"
        >
            {project.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.logo} alt={project.title} width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
            ) : (
                <span className="w-8 h-8 flex items-center justify-center text-lg font-bold text-muted-foreground/40 shrink-0">
                    {project.title[0]}
                </span>
            )}
            <div className="min-w-0">
                <p className="font-semibold text-sm">{project.title}</p>
                <p className="text-muted-foreground text-sm truncate">{project.description}</p>
            </div>
        </button>
    );
}

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState("All");
    const [selected, setSelected] = useState<Project | null>(null);

    const sorted = [...projects].sort((a, b) => a.sort - b.sort);
    const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.stack))).sort()];
    const filtered = active === "All" ? sorted : sorted.filter((p) => p.stack.includes(active));

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-10">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setActive(tag)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                            active === tag
                                ? "bg-foreground text-background border-foreground"
                                : "bg-white text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <p className="text-muted-foreground text-center py-16">No projects match this filter.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filtered.map((project) => (
                        <ProjectCard key={project.slug} project={project} onClick={() => setSelected(project)} />
                    ))}
                </div>
            )}

            <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </div>
    );
}

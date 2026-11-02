"use client";

import { useState } from "react";
import FilterPills from "@/app/_components/filter-pills";
import { BusinessCard, FeaturedProjectCard, ProjectCard } from "@/app/_components/project-cards";
import type { Project } from "@/app/_data/projects";

type GroupId = "business" | "client" | "apps";
type FilterId = "all" | GroupId;

const groups: { id: GroupId; label: string; title: string; note: string }[] = [
    { id: "business", label: "My businesses", title: "Businesses I run", note: "I test everything here first." },
    { id: "client", label: "Client websites", title: "Client websites", note: "Austria, the UK and Moldova." },
    { id: "apps", label: "Apps", title: "Apps and experiments", note: "Made for my own work. Try the live ones." },
];

/** Tints for the business cards, in order */
const tints = [
    { tint: "#E9ECF3", ink: "#16284D" },
    { tint: "#E3F1EE", ink: "#0B4C45" },
    { tint: "#F3E7EC", ink: "#7A2F55" },
];

function groupOf(p: Project): GroupId {
    if (p.category === "business" || p.featured) return "business";
    if (p.category === "client") return "client";
    return "apps";
}

export default function ProjectsFilter({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState<FilterId>("all");

    const sorted = [...projects].sort((a, b) => a.sort - b.sort);
    const byGroup = (id: GroupId) => sorted.filter((p) => groupOf(p) === id);
    const filters = [
        { id: "all" as FilterId, label: "All", count: projects.length },
        ...groups.map((g) => ({ id: g.id as FilterId, label: g.label, count: byGroup(g.id).length })),
    ];
    const shown = groups.filter((g) => active === "all" || active === g.id);

    return (
        <div className="flex flex-col gap-12 sm:gap-18">
            <FilterPills filters={filters} active={active} onChange={setActive} label="Filter projects" />

            {shown.map((g) => {
                const items = byGroup(g.id);
                const featured = items.filter((p) => p.featured);
                const rest = items.filter((p) => !p.featured);
                return (
                    <section key={g.id} className="flex flex-col gap-5 sm:gap-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">{g.title}</h2>
                            <p className="text-[15px] text-[#4a4f57] sm:text-base">{g.note}</p>
                        </div>
                        {featured.map((p) => (
                            <FeaturedProjectCard key={p.slug} project={p} />
                        ))}
                        <ul className={g.id === "business" ? "grid gap-4 lg:grid-cols-2 lg:gap-5" : "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"}>
                            {rest.map((p, i) => (
                                <li key={p.slug} className="min-w-0">
                                    {g.id === "business" ? <BusinessCard project={p} {...tints[i % tints.length]} /> : <ProjectCard project={p} />}
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}

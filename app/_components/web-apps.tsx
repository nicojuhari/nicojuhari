"use client";

import { useState } from "react";
import { projects } from "@/app/_data/projects";
import ProjectDialog from "./project-dialog";
import type { Project } from "@/app/_data/projects";

const homeApps = projects.filter((p) => p.showOnHome).sort((a, b) => a.sort - b.sort);

export default function WebApps() {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <section className="section container-sm">
            <h2 className="text-3xl font-bold text-center mb-10">Web Apps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {homeApps.map((app) => (
                    <button
                        key={app.slug}
                        onClick={() => setSelected(app)}
                        className="flex items-center gap-4 border rounded-xl p-4 bg-white hover:shadow-md hover:border-foreground/20 transition-all text-left"
                    >
                        {app.logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={app.logo} alt={app.title} width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
                        )}
                        <div>
                            <p className="font-semibold text-sm">{app.title}</p>
                            <p className="text-muted-foreground text-sm">{app.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            <ProjectDialog project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}

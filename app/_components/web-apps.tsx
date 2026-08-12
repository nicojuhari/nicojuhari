import Link from "next/link";
import { projects } from "@/app/_data/projects";
import ProjectCard from "./project-card";

const homeProjects = projects.filter((p) => p.showOnHome).sort((a, b) => a.sort - b.sort).slice(0, 4);

export default function WebApps() {
    return (
        <section className="section-band section-rule bg-bg-soft" id="work">
            <div className="mx-auto max-w-7xl">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <p className="eyebrow">Projects</p>
                        <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">
                            Selected work
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-1 text-[14px] font-medium text-ink transition-colors hover:text-brand-green"
                    >
                        All projects
                        <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                            →
                        </span>
                    </Link>
                </header>

                <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                    {homeProjects.map((project) => (
                        <li key={project.slug}>
                            <ProjectCard project={project} variant="compact" />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

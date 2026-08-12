import Link from "next/link";
import { projects } from "@/app/_data/projects";
import { tools } from "@/app/_data/tools";
import ProjectCard from "./project-card";
import ToolCard from "./tool-card";
import { cn } from "@/lib/utils";

const homeProjects = projects.filter((p) => p.showOnHome).sort((a, b) => a.sort - b.sort).slice(0, 4);
const homeTools = tools.slice(0, 4);

function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("eyebrow mb-0", className)}>{children}</p>;
}

export default function WorkBoard() {
    return (
        <div id="work" className="min-w-0 space-y-8 sm:space-y-10">
            <section>
                <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4 sm:gap-4">
                    <SectionLabel>Projects</SectionLabel>
                    <Link
                        href="/projects"
                        className="shrink-0 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
                    >
                        All projects →
                    </Link>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {homeProjects.map((project) => (
                        <li key={project.slug} className="min-w-0">
                            <ProjectCard project={project} variant="compact" />
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4 sm:gap-4">
                    <SectionLabel>Tools</SectionLabel>
                    <Link
                        href="/tools"
                        className="shrink-0 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink"
                    >
                        All tools →
                    </Link>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {homeTools.map((tool) => (
                        <li key={tool.slug} className="min-w-0">
                            <ToolCard tool={tool} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

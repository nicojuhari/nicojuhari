import { ExternalLinkIcon } from "lucide-react";
import type { Project } from "@/app/_data/projects";
import { typeLabel } from "@/app/_data/projects";
import { cn } from "@/lib/utils";

type Props = {
    project: Project;
    /** compact = homepage (logo, title, tagline, link); full = projects page */
    variant?: "compact" | "full";
    className?: string;
};

function ProjectLogo({ project, size = "md" }: { project: Project; size?: "sm" | "md" }) {
    const box = size === "sm" ? "size-8 text-[10px]" : "size-10 text-[12px]";
    const img = size === "sm" ? "size-8" : "size-10";

    if (project.logo) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={project.logo}
                alt=""
                width={size === "sm" ? 32 : 40}
                height={size === "sm" ? 32 : 40}
                className={cn(img, "shrink-0 object-contain")}
            />
        );
    }

    return (
        <span
            className={cn(
                "flex shrink-0 items-center justify-center rounded-lg bg-bg-soft font-mono font-semibold text-brand",
                box
            )}
        >
            {project.title.slice(0, 2).toUpperCase()}
        </span>
    );
}

export default function ProjectCard({ project, variant = "full", className }: Props) {
    if (variant === "compact") {
        const isLive = Boolean(project.url);

        return (
            <article className={cn("surface-card flex h-full flex-col gap-3 p-4 sm:p-5", className)}>
                <div className="flex items-center gap-3">
                    <ProjectLogo project={project} size="sm" />
                    <h3 className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-ink">
                        {project.title}
                    </h3>
                    {isLive ? (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded-md p-1 text-ink-muted transition-colors hover:bg-bg-soft hover:text-brand-green"
                            aria-label={`Visit ${project.title}`}
                        >
                            <ExternalLinkIcon className="size-3.5" aria-hidden />
                        </a>
                    ) : (
                        <span className="shrink-0 text-[11px] font-medium text-ink-muted">Discontinued</span>
                    )}
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-ink-muted">{project.description}</p>
            </article>
        );
    }

    const isLive = Boolean(project.url);

    return (
        <article className={cn("surface-card flex h-full flex-col p-5 sm:p-6", className)}>
            <div className="flex items-center gap-3">
                <ProjectLogo project={project} />
                <h3 className="min-w-0 text-base font-semibold tracking-tight text-ink sm:text-lg">{project.title}</h3>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[13px] text-ink-muted">
                    {typeLabel[project.type]} · {project.year}
                </span>
                {project.client && (
                    <span className="rounded-full bg-brand-green/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                        Built for a client
                    </span>
                )}
                {isLive ? (
                    <span className="rounded-full bg-brand-green/10 px-2.5 py-0.5 text-[11px] font-medium text-brand-green">
                        Live
                    </span>
                ) : (
                    <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                        Discontinued
                    </span>
                )}
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-muted">
                <p>{project.overview}</p>
                <p>{project.contribution}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                    <span
                        key={tech}
                        className="rounded-full bg-bg-soft px-2.5 py-0.5 text-[11px] font-medium text-ink-muted"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-brand-green"
                >
                    Visit {project.title}
                    <ExternalLinkIcon className="size-3.5" aria-hidden />
                </a>
            )}
        </article>
    );
}

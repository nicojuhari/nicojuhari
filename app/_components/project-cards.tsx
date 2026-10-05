import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/app/_data/projects";
import { categoryMetaLabel, typeLabel } from "@/app/_data/projects";
import { cn } from "@/lib/utils";
import { featureIcons, ProjectMark } from "./icons";

function hostname(url: string) {
    return new URL(url).hostname.replace(/^www\./, "");
}

export function LiveDot() {
    return (
        <span className="live-dot">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden />
            Live
        </span>
    );
}

const statusPill = {
    private: { label: "Private", className: "bg-[#eef1f7] text-brand" },
    "in-progress": { label: "In progress", className: "bg-[#fbf3e6] text-[#8a5a12]" },
    closed: { label: "Closed", className: "bg-[#f1efea] text-ink-faint" },
    deprecated: { label: "Deprecated", className: "bg-[#fbf3e6] text-[#8a5a12]" },
};

function StatusPill({ project }: { project: Project }) {
    if (project.status && project.status !== "live") {
        const { label, className } = statusPill[project.status];
        return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", className)}>{label}</span>;
    }
    if (project.category === "demo") {
        return <span className="rounded-full bg-[#f4eef1] px-2.5 py-1 text-xs font-semibold text-[#6b4f5f]">Demo</span>;
    }
    if (project.category === "other" && project.status !== "live") {
        return (
            <span className="rounded-full bg-[#f4eef1] px-2.5 py-1 text-xs font-semibold text-[#6b4f5f]">Experiment</span>
        );
    }
    if (!project.url) {
        return <span className="rounded-full bg-[#f1efea] px-2.5 py-1 text-xs font-semibold text-ink-faint">Closed</span>;
    }
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f5f3] px-2.5 py-1 text-xs font-semibold text-teal">
            <span className="size-1.5 rounded-full bg-brand-green" aria-hidden />
            Live
        </span>
    );
}

function StackChips({ stack }: { stack: string[] }) {
    return (
        <ul className="flex flex-wrap gap-1.5">
            {stack.map((tech) => (
                <li key={tech} className="chip">
                    {tech}
                </li>
            ))}
        </ul>
    );
}

function VisitButton({ project, size = "md" }: { project: Project; size?: "sm" | "md" }) {
    if (!project.url) return null;
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand/90",
                size === "sm" ? "h-[42px] px-4.5 text-[13px]" : "h-[46px] px-5.5 text-sm"
            )}
        >
            Visit {hostname(project.url)}
            <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
    );
}

function FeatureGrid({ project, variant }: { project: Project; variant: "home" | "page" }) {
    const panel = project.panel ?? { background: "#F5F7FB", border: "#DCE1EB", accent: "#16284D" };
    const page = variant === "page";

    return (
        <div
            className={cn("flex h-full flex-col border-rule", page ? "gap-6 p-6 sm:p-10" : "gap-5 p-6 sm:p-8")}
            style={{ backgroundColor: panel.background }}
        >
            <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">What’s inside</p>
            <ul className={cn("grid grid-cols-1 min-[420px]:grid-cols-2", page ? "gap-x-6 gap-y-7" : "gap-5")}>
                {project.features?.map((feature) => {
                    const Icon = featureIcons[feature.icon];
                    return (
                        <li key={feature.title} className={cn("flex flex-col", page ? "gap-2.5" : "gap-2")}>
                            <span
                                className={cn(
                                    "flex items-center justify-center border bg-white",
                                    page ? "size-11 rounded-xl" : "size-9 rounded-[10px]"
                                )}
                                style={{ borderColor: panel.border, color: panel.accent }}
                            >
                                <Icon className={page ? "size-5" : "size-[18px]"} strokeWidth={1.8} aria-hidden />
                            </span>
                            <span className={cn("font-semibold text-ink", page ? "text-base" : "text-sm")}>
                                {feature.title}
                            </span>
                            <span className={cn("leading-normal text-ink-muted", page ? "text-sm" : "text-[13px]")}>
                                {page ? feature.text : feature.short}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/** Homepage: the lead project, text on the left and "What's inside" on the right */
export function HomeFeaturedProject({ project }: { project: Project }) {
    return (
        <article className="grid overflow-hidden rounded-3xl border border-rule bg-white shadow-[0_1px_2px_rgba(17,20,24,0.04)] md:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-center gap-3">
                    <ProjectMark project={project} />
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{project.title}</h3>
                        <span className="font-mono text-xs text-ink-faint">
                            {categoryMetaLabel[project.category]} · {typeLabel[project.type]} · {project.year}
                        </span>
                    </div>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-soft">{project.description}</p>
                <StackChips stack={project.stack.filter((s) => s !== "React" && s !== "Tailwind CSS")} />
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                    <VisitButton project={project} size="sm" />
                    {project.url && <LiveDot />}
                </div>
            </div>
            <div className="border-t border-rule md:border-t-0 md:border-l">
                <FeatureGrid project={project} variant="home" />
            </div>
        </article>
    );
}

/** Homepage: small project card */
export function HomeProjectCard({ project }: { project: Project }) {
    return (
        <article className="flex h-full flex-col gap-3 rounded-[20px] border border-rule bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
                <ProjectMark project={project} />
                {project.url && <LiveDot />}
            </div>
            <div className="mt-1 flex flex-col gap-0.5">
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{project.title}</h3>
                <span className="font-mono text-xs text-ink-faint">
                    {categoryMetaLabel[project.category]} · {project.year}
                </span>
            </div>
            <p className="text-sm leading-normal text-ink-muted">{project.description}</p>
            {project.url && (
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-between border-t border-line pt-3.5 text-[13px] font-semibold text-brand transition-colors hover:text-teal"
                >
                    {hostname(project.url)}
                    <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
            )}
        </article>
    );
}

/** Projects page: large card; `flip` puts the "What's inside" panel first on desktop */
export function FeaturedProjectCard({ project, flip = false }: { project: Project; flip?: boolean }) {
    return (
        <article
            className={cn(
                "grid overflow-hidden rounded-3xl border border-rule bg-white shadow-[0_1px_2px_rgba(17,20,24,0.04),0_20px_40px_-28px_rgba(22,40,77,0.25)] sm:rounded-[28px]",
                flip ? "lg:grid-cols-[1.1fr_1fr]" : "lg:grid-cols-[1fr_1.1fr]"
            )}
        >
            <div className={cn("flex flex-col gap-5 p-6 sm:p-10", flip && "lg:order-2")}>
                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#eef1f7] px-2.5 py-1 text-xs font-semibold text-brand">Featured</span>
                    <StatusPill project={project} />
                </div>
                <div className="flex items-center gap-3.5">
                    <ProjectMark project={project} className="size-12 rounded-[14px] text-[17px]" />
                    <div className="flex flex-col gap-0.5">
                        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">{project.title}</h2>
                        <span className="font-mono text-xs text-ink-faint">
                            {categoryMetaLabel[project.category]} · {typeLabel[project.type]} · {project.year}
                        </span>
                    </div>
                </div>
                <p className="text-base leading-relaxed text-ink-soft">{project.overview}</p>
                <div className="flex flex-col gap-2 rounded-2xl bg-[#f8f7f3] px-5 py-4.5">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                        What I built
                    </span>
                    <p className="text-sm leading-relaxed text-ink-soft">{project.contribution}</p>
                </div>
                <StackChips stack={project.stack} />
                <div className="mt-auto">
                    <VisitButton project={project} />
                </div>
            </div>
            <div className={cn("border-t border-rule lg:border-t-0", flip ? "lg:order-1 lg:border-r" : "lg:border-l")}>
                <FeatureGrid project={project} variant="page" />
            </div>
        </article>
    );
}

/** Projects page: smaller card */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <article className="flex h-full flex-col gap-3.5 rounded-3xl border border-rule bg-white p-6 sm:p-7">
            <div className="mb-1 flex items-center justify-between">
                <ProjectMark project={project} className="size-12 rounded-[14px]" />
                <StatusPill project={project} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-ink">{project.title}</h3>
                <span className="font-mono text-xs text-ink-faint">
                    {categoryMetaLabel[project.category]} · {project.year}
                </span>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-soft">{project.overview}</p>
            <p className="text-sm leading-relaxed text-ink-muted">
                <span className="font-semibold text-ink">What I built:</span> {project.contribution}
            </p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-1.5">
                <span className="font-mono text-xs text-ink-faint">{project.stackShort}</span>
                {project.url && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1.5 py-2.5 text-sm font-semibold text-brand transition-colors hover:text-teal"
                    >
                        {project.linkLabel ?? "Visit site"}
                        <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                )}
            </div>
        </article>
    );
}

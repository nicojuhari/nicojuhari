import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getCaseStudy } from "@/app/_data/case-studies";
import type { Project } from "@/app/_data/projects";
import { categoryMetaLabel, typeLabel } from "@/app/_data/projects";
import { cn } from "@/lib/utils";
import { ProjectMark } from "./icons";

function hostname(url: string) {
    return new URL(url).hostname.replace(/^www\./, "");
}

const statusPill = {
    private: { label: "Private", className: "bg-[#e9ecf3] text-brand" },
    "in-progress": { label: "In progress", className: "bg-[#fbf3e6] text-[#8a5a12]" },
    closed: { label: "Closed", className: "bg-bg-soft text-ink-muted" },
    deprecated: { label: "Deprecated", className: "bg-[#fbf3e6] text-[#8a5a12]" },
};

function StatusPill({ project }: { project: Project }) {
    const pill = "rounded-full px-2.5 py-1 text-[13px] font-semibold";
    if (project.status && project.status !== "live") {
        const { label, className } = statusPill[project.status];
        return <span className={cn(pill, className)}>{label}</span>;
    }
    if (project.category === "demo") return <span className={cn(pill, "bg-[#f3e7ec] text-[#8c3a63]")}>Demo</span>;
    if (!project.url) return <span className={cn(pill, "bg-bg-soft text-ink-muted")}>Closed</span>;
    return (
        <span className={cn(pill, "inline-flex items-center gap-1.5 bg-[#e3f1ee] text-[#0b4c45]")}>
            <span className="size-1.5 rounded-full bg-teal" aria-hidden />
            Live
        </span>
    );
}

function VisitLink({ project, className }: { project: Project; className?: string }) {
    if (!project.url) return null;
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex shrink-0 items-center gap-1.5 py-2.5 text-sm font-semibold text-teal hover:underline", className)}
        >
            {project.linkLabel ?? (project.client || project.type === "business-website" ? "Visit site" : "Try it")}
            <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
    );
}

function CaseStudyLink({ project, className }: { project: Project; className?: string }) {
    if (!getCaseStudy(project.slug)) return null;
    return (
        <Link href={`/projects/${project.slug}`} className={cn("inline-flex shrink-0 items-center gap-1.5 py-2.5 text-sm font-semibold hover:underline", className)}>
            Case study
            <ArrowRight className="size-3.5" aria-hidden />
        </Link>
    );
}

/** Large dark card: a product I run, with its main features */
export function FeaturedProjectCard({ project }: { project: Project }) {
    return (
        <article className="grid gap-7 rounded-[26px] bg-brand p-6 text-white sm:rounded-[32px] sm:p-12 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col gap-4.5">
                <div className="flex items-center gap-3.5">
                    <span className="flex size-14 items-center justify-center rounded-2xl bg-white">
                        <ProjectMark project={project} className="size-9 rounded-lg" />
                    </span>
                    <span className="flex flex-col">
                        <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.title}</h3>
                        <span className="text-sm text-[#c3cbe0]">
                            {typeLabel[project.type]} · {project.year}
                        </span>
                    </span>
                </div>
                <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[28px]">{project.overview}</p>
                <p className="text-base leading-relaxed text-[#c3cbe0] sm:text-[17px]">{project.contribution}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2">
                    {project.url && (
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-semibold text-brand transition-opacity hover:opacity-90"
                        >
                            Visit {hostname(project.url)}
                            <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                    )}
                    <CaseStudyLink project={project} className="text-[15px] text-white" />
                </div>
            </div>
            {project.features && (
                <ul className="grid content-start gap-3 sm:grid-cols-2">
                    {project.features.map((f) => (
                        <li key={f.title} className="flex flex-col gap-2 rounded-[20px] bg-[#1f3561] p-5.5">
                            <span className="text-[17px] font-semibold">{f.title}</span>
                            <span className="text-[15px] leading-normal text-[#c3cbe0]">{f.text}</span>
                        </li>
                    ))}
                </ul>
            )}
        </article>
    );
}

/** Tinted card for a business I run, led by its real result */
export function BusinessCard({ project, tint, ink }: { project: Project; tint: string; ink: string }) {
    return (
        <article className="flex h-full flex-col gap-4 rounded-[24px] p-6 sm:rounded-[28px] sm:p-9" style={{ backgroundColor: tint }}>
            <div className="flex items-center gap-3.5">
                <span className="flex size-13 shrink-0 items-center justify-center rounded-[14px] bg-white">
                    <ProjectMark project={project} className="size-8.5 rounded-lg" />
                </span>
                <span className="flex flex-col">
                    <h3 className="text-xl font-semibold tracking-[-0.02em] sm:text-[21px]" style={{ color: ink }}>
                        {project.title}
                    </h3>
                    <span className="text-sm opacity-80" style={{ color: ink }}>
                        {typeLabel[project.type]} · {project.year}
                    </span>
                </span>
            </div>
            {project.result && (
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[44px] leading-none font-semibold tracking-[-0.04em] sm:text-5xl" style={{ color: ink }}>
                        {project.result.stat}
                    </span>
                    <span className="text-base font-semibold text-[#2c3440] sm:text-[17px]">{project.result.text}</span>
                </p>
            )}
            <p className="text-[15px] leading-relaxed text-[#2c3440] sm:text-base">{project.contribution}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-1">
                <CaseStudyLink project={project} className="text-[15px]" />
                {project.url ? (
                    <VisitLink project={project} className="text-[15px]" />
                ) : (
                    <StatusPill project={project} />
                )}
            </div>
        </article>
    );
}

/** White card for client work and apps */
export function ProjectCard({ project }: { project: Project }) {
    return (
        <article className="flex h-full flex-col gap-3.5 rounded-[22px] bg-white p-6 sm:rounded-[24px] sm:p-7">
            <div className="flex items-center justify-between gap-3">
                <span className="flex size-12 items-center justify-center rounded-[14px] bg-bg-soft">
                    <ProjectMark project={project} className="size-8 rounded-lg text-[13px]" />
                </span>
                <StatusPill project={project} />
            </div>
            <div className="flex flex-col gap-0.5">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{project.title}</h3>
                <span className="text-[13px] text-[#5b6068]">
                    {categoryMetaLabel[project.category]} · {project.year}
                </span>
            </div>
            <p className="text-[15px] leading-relaxed text-[#4a4f57]">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 pt-1">
                <span className="text-[13px] text-[#5b6068]">{project.stackShort}</span>
                <span className="flex items-center gap-4">
                    <CaseStudyLink project={project} className="text-brand" />
                    <VisitLink project={project} />
                </span>
            </div>
        </article>
    );
}

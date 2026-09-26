import type { Metadata } from "next";
import { projects } from "@/app/_data/projects";
import CtaSection from "@/app/_components/cta-section";
import ProjectsFilter from "./_components/projects-filter";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Projects - Web Apps & Products I Built | Nicojuhari",
    description:
        "Web apps I built and run, like Simple Trackr for freelance finances and 1FoodMenu digital menus - what each one does, the stack and what I built.",
    path: "/projects",
});

const years = projects.map((p) => p.year);
const firstYear = Math.min(...years);
const lastYear = Math.max(...years);

const stats = [
    { value: String(projects.length), label: "Products shipped" },
    { value: String(projects.filter((p) => p.url).length), label: "Live to try" },
    {
        value: (
            <>
                {firstYear}
                <span className="text-[#9a9ea5]">–</span>
                {String(lastYear).slice(2)}
            </>
        ),
        label: "Years building",
    },
];

export default function ProjectsPage() {
    return (
        <div className="container mt-6 flex flex-col gap-8 sm:mt-16 sm:gap-10">
            <section className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
                <div className="flex flex-col gap-3.5 sm:gap-4.5">
                    <p className="eyebrow">Projects</p>
                    <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[56px] xl:leading-[1.02] xl:tracking-[-0.035em]">
                        Apps I’ve designed, built and shipped.
                    </h1>
                    <p className="max-w-[620px] text-base leading-relaxed text-ink-muted sm:text-lg">
                        Each one started with a real problem - tracking money, running a menu, managing files. Here’s what it
                        does, what I built, and where you can try it.
                    </p>
                </div>
                <dl className="grid grid-cols-3 overflow-hidden rounded-[20px] border border-rule bg-white">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse gap-1 border-r border-line p-4 last:border-r-0 sm:p-5">
                            <dt className="text-xs text-ink-faint sm:text-[13px]">{stat.label}</dt>
                            <dd className="font-mono text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <ProjectsFilter projects={projects} />

            <CtaSection
                className="mt-2 sm:mt-6"
                title="Want something like this for your business?"
                description="Tell me about the workflow you want to improve. I reply within 24 hours, Monday to Friday."
                secondary={{ label: "See services", href: "/services" }}
            />
        </div>
    );
}

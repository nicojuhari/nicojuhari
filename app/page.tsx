import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartLine, Globe, PanelsTopLeft } from "lucide-react";
import ProfilePanel from "./_components/profile-panel";
import CtaSection from "./_components/cta-section";
import { HomeFeaturedProject, HomeProjectCard } from "./_components/project-cards";
import ToolTile, { ToolPromoTile } from "./_components/tool-tile";
import { projects } from "./_data/projects";
import { tools } from "./_data/tools";
import { personSchema, professionalServiceSchema, webSiteSchema } from "./_lib/schema";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./_lib/site";

export const metadata: Metadata = {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    alternates: { canonical: SITE_URL },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
};

const offers = [
    {
        icon: ChartLine,
        title: "Finance tools",
        text: "Invoicing, cash flow, budgets and reports - numbers you can trust at a glance.",
        href: "/services/custom-web-apps",
        accent: "#16284D",
        tint: "#EEF1F7",
    },
    {
        icon: PanelsTopLeft,
        title: "Business apps",
        text: "Internal tools, dashboards and client portals that fit your process.",
        href: "/services/custom-web-apps",
        accent: "#127A6F",
        tint: "#E9F5F3",
    },
    {
        icon: Globe,
        title: "Websites & stores",
        text: "Business sites, landing pages and Shopify stores that load fast and convert.",
        href: "/services",
        accent: "#7A5E6E",
        tint: "#F4EEF1",
    },
];

const steps = [
    { title: "Map the workflow", text: "We walk through how the work happens today and what the numbers need to show." },
    { title: "Ship a first version", text: "A working app early, so you test it with real data instead of a slide deck." },
    { title: "Refine and hand over", text: "Iterate on feedback, then hand over clean code you own." },
];

const stack = ["TypeScript", "React", "Next.js", "Node.js", "Supabase", "Firebase", "Tailwind CSS", "Shopify", "MySQL"];

const homeProjects = projects.filter((p) => p.showOnHome).sort((a, b) => a.sort - b.sort);
const [leadProject, ...otherProjects] = homeProjects;

function SectionHeader({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href: string; linkLabel: string }) {
    return (
        <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">{title}</h2>
            </div>
            <Link
                href={href}
                className="hidden shrink-0 items-center gap-1.5 py-2.5 text-sm font-semibold text-brand transition-colors hover:text-teal sm:inline-flex"
            >
                {linkLabel}
                <ArrowRight className="size-[15px]" aria-hidden />
            </Link>
        </div>
    );
}

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }} />

            <div className="container mt-6 sm:mt-12">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(300px,340px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-12">
                    <ProfilePanel />

                    <div className="flex min-w-0 flex-col gap-12 sm:gap-16">
                        {/* Intro */}
                        <section className="flex flex-col gap-5 sm:gap-7 lg:pt-2">
                            <p className="eyebrow">What I build</p>
                            <h2 className="max-w-[800px] text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-[44px] xl:text-[52px] xl:leading-[1.04] xl:tracking-[-0.035em]">
                                Your workflow, turned into a tool your team <span className="text-brand">actually uses.</span>
                            </h2>
                            <p className="max-w-[640px] text-base leading-relaxed text-ink-muted sm:text-lg">
                                Invoicing, expense tracking, approvals, reporting - the work that lives in files and inboxes
                                today. I turn it into a web app with one source of truth, built to fit how your business
                                already runs.
                            </p>

                            <ul className="mt-1 grid gap-3 sm:mt-2 md:grid-cols-3">
                                {offers.map(({ icon: Icon, ...offer }) => (
                                    <li key={offer.title}>
                                        <Link
                                            href={offer.href}
                                            className="flex h-full gap-3.5 rounded-[18px] border border-rule bg-white p-4.5 text-ink transition-colors hover:border-ink/20 md:flex-col md:gap-3 md:p-5.5"
                                        >
                                            <span
                                                className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                                                style={{ backgroundColor: offer.tint, color: offer.accent }}
                                            >
                                                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                                            </span>
                                            <span className="flex flex-col gap-1 md:gap-3">
                                                <span className="text-base font-semibold tracking-[-0.01em]">{offer.title}</span>
                                                <span className="text-sm leading-normal text-ink-muted">{offer.text}</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Projects */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader
                                eyebrow="Selected projects"
                                title="Products I built and run"
                                href="/projects"
                                linkLabel="All projects"
                            />
                            <HomeFeaturedProject project={leadProject} />
                            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                                {otherProjects.map((project) => (
                                    <li key={project.slug} className="min-w-0">
                                        <HomeProjectCard project={project} />
                                    </li>
                                ))}
                            </ul>
                            <Link href="/projects" className="btn-pill-secondary h-12 sm:hidden">
                                See all projects
                            </Link>
                        </section>

                        {/* Tools */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader
                                eyebrow="Free tools"
                                title="Small utilities, free to use"
                                href="/tools"
                                linkLabel="All tools"
                            />
                            <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
                                {tools.map((tool) => (
                                    <li key={tool.slug} className="min-w-0">
                                        <ToolTile tool={tool} variant="compact" />
                                    </li>
                                ))}
                                <li className="min-w-0">
                                    <ToolPromoTile
                                        href="/tools"
                                        variant="compact"
                                        eyebrow={`${tools.length} tools`}
                                        title="Free utilities for everyday tasks."
                                        linkLabel="Browse all tools"
                                    />
                                </li>
                            </ul>
                        </section>

                        {/* How a project runs + About */}
                        <section className="grid gap-3 md:grid-cols-2 md:gap-4">
                            <div className="flex flex-col gap-4.5 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                                <h2 className="eyebrow">How a project runs</h2>
                                <ol className="flex flex-col gap-4.5">
                                    {steps.map((step, i) => (
                                        <li key={step.title} className="flex gap-3.5">
                                            <span className="w-5.5 shrink-0 font-mono text-[13px] font-semibold text-teal">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="flex flex-col gap-0.5">
                                                <span className="text-[15px] font-semibold text-ink">{step.title}</span>
                                                <span className="text-sm leading-normal text-ink-muted">{step.text}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                                <ul className="mt-1 flex flex-wrap gap-1.5 border-t border-line pt-4.5">
                                    {stack.map((tech) => (
                                        <li key={tech} className="rounded-full bg-[#f4f3ef] px-2.5 py-1 text-xs font-medium text-ink-soft">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col gap-3.5 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                                <h2 className="eyebrow">About</h2>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">
                                    I started in finance and spent years inside the industry. Later I moved into software
                                    because I like to build - solving real problems and automating the workflows I used to do
                                    by hand.
                                </p>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">
                                    Today I build financial and business apps for web and mobile, plus websites and Shopify
                                    stores. AI is the tool I use most - for shipping faster and making products smarter when
                                    it actually helps.
                                </p>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">Outside of work I ski and play basketball.</p>
                                <div className="mt-auto flex items-center gap-3 pt-1.5">
                                    <Image
                                        src="/nick-profile-photo.webp"
                                        alt=""
                                        width={72}
                                        height={72}
                                        className="size-9 rounded-full object-cover"
                                    />
                                    <span className="flex flex-col">
                                        <span className="text-sm font-semibold text-ink">Cheers, Nick</span>
                                        <span className="text-xs text-ink-faint">Vienna, Austria</span>
                                    </span>
                                </div>
                            </div>
                        </section>

                        <CtaSection
                            title="Have a process you’d like to turn into an app?"
                            description="Tell me how it works today. I’ll reply within 24 hours with how I’d approach it."
                            primaryLabel="Start a conversation"
                            secondary={{ label: "Message on WhatsApp", href: "https://wa.me/+4369010196811" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

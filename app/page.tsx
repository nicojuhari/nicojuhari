import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProfilePanel from "./_components/profile-panel";
import CtaSection from "./_components/cta-section";
import ProofBlock from "./_components/proof-block";
import { serviceIcons } from "./_components/icons";
import { HomeFeaturedProject, HomeProjectCard } from "./_components/project-cards";
import ToolTile, { ToolPromoTile } from "./_components/tool-tile";
import { projects } from "./_data/projects";
import { services } from "./_data/services";
import { tools } from "./_data/tools";
import { homeSchema } from "./_lib/schema";
import { pageMetadata } from "./_lib/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "./_lib/site";

export const metadata: Metadata = pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" });

const proofs = services.flatMap((s) => (s.proof ? [s.proof] : []));

const steps = [
    { title: "A small check first", text: "I look at your site, store or process and tell you what I’d fix first. You decide what happens next." },
    { title: "Build or fix", text: "A fixed price, agreed before I start. You pay in stages, and you can ask for changes along the way." },
    { title: "Monthly plan", text: "I keep improving it each month and show you the numbers: calls, orders or hours saved." },
];

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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }} />

            <div className="container mt-6 sm:mt-12">
                <div className="grid items-start gap-12 lg:grid-cols-[minmax(300px,340px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-12">
                    <ProfilePanel />

                    <div className="flex min-w-0 flex-col gap-12 sm:gap-16">
                        {/* Intro */}
                        <section className="flex flex-col gap-5 sm:gap-7 lg:pt-2">
                            <p className="eyebrow">What I do</p>
                            <h2 className="max-w-[800px] text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-[44px] xl:text-[52px] xl:leading-[1.04] xl:tracking-[-0.035em]">
                                More clients and sales <span className="text-brand">for your business.</span>
                            </h2>
                            <p className="max-w-[640px] text-base leading-relaxed text-ink-muted sm:text-lg">
                                Choose what you need below. Every project starts with a free look at what you have today.
                            </p>

                            <ul className="mt-1 grid gap-3 sm:mt-2 md:grid-cols-3">
                                {services.map((service) => {
                                    const Icon = serviceIcons[service.slug];
                                    return (
                                        <li key={service.slug}>
                                            <Link
                                                href={service.href}
                                                className="flex h-full gap-3.5 rounded-[18px] border border-rule bg-white p-4.5 text-ink transition-colors hover:border-ink/20 md:flex-col md:gap-3 md:p-5.5"
                                            >
                                                <span
                                                    className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                                                    style={{ backgroundColor: service.tint, color: service.accent }}
                                                >
                                                    <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                                                </span>
                                                <span className="flex flex-col gap-1 md:gap-3">
                                                    <span className="text-base font-semibold tracking-[-0.01em]">{service.title}</span>
                                                    <span className="text-sm leading-normal text-ink-muted">{service.tagline}</span>
                                                    {service.firstStep && (
                                                        <span className="text-[13px] font-semibold" style={{ color: service.accent }}>
                                                            {service.firstStep.startsWith}
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>

                        {/* Results */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader
                                eyebrow="Results"
                                title="I run businesses on websites and apps I built"
                                href="/services"
                                linkLabel="See services"
                            />
                            {proofs.map((proof) => (
                                <ProofBlock key={proof.title} proof={proof} />
                            ))}
                        </section>

                        {/* Projects */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader
                                eyebrow="Projects"
                                title="An app I built and use every day"
                                href="/projects"
                                linkLabel="All projects"
                            />
                            <HomeFeaturedProject project={leadProject} />
                            {otherProjects.length > 0 && (
                                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                                    {otherProjects.map((project) => (
                                        <li key={project.slug} className="min-w-0">
                                            <HomeProjectCard project={project} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Link href="/projects" className="btn-pill-secondary h-12 sm:hidden">
                                See all projects
                            </Link>
                        </section>

                        {/* How we work + About */}
                        <section className="grid gap-3 md:grid-cols-2 md:gap-4">
                            <div className="flex flex-col gap-4.5 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                                <h2 className="eyebrow">How we work together</h2>
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
                            </div>

                            <div className="flex flex-col gap-3.5 rounded-[20px] border border-rule bg-white p-5.5 sm:p-7">
                                <h2 className="eyebrow">About</h2>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">
                                    I started in finance and spent years in the industry. Then I moved into software, because I
                                    like to build things that solve real problems.
                                </p>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">
                                    Today I help run two businesses. Both run on software I built. One is a consumer credit
                                    company I co-founded. The other is a local services business that gets most of its
                                    clients from its website.
                                </p>
                                <p className="text-[15px] leading-[1.65] text-ink-soft">
                                    I build the same things for other businesses. I use AI every day to work faster. Outside
                                    of work I ski and play basketball.
                                </p>
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

                        {/* Tools */}
                        <section className="flex flex-col gap-4">
                            <SectionHeader
                                eyebrow="Free tools"
                                title="Free tools for everyday tasks"
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
                                        title="See all free tools."
                                        linkLabel="Browse all tools"
                                    />
                                </li>
                            </ul>
                        </section>

                        <CtaSection
                            title="Want more clients, more sales or more time?"
                            description="Tell me about your business on WhatsApp. I’ll reply within 24 hours with the first thing I’d change."
                            whatsappText="Hi Nick, I’d like to talk about my business: "
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

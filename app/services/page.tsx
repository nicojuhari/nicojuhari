import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import ProofBlock from "@/app/_components/proof-block";
import { services, WHATSAPP_URL } from "@/app/_data/services";
import { pageMetadata } from "@/app/_lib/metadata";

export const metadata: Metadata = pageMetadata({
    title: "Web Development Services in Vienna | Nicojuhari",
    description:
        "Web development in Vienna - local business websites that bring in calls, Shopify stores that sell, and custom web apps that save your team time.",
    path: "/services",
});

const questions: Record<string, string> = {
    "local-business-websites": "Want more calls and bookings from Google and Maps?",
    "shopify-stores": "Selling products online, or planning to?",
    "custom-web-apps": "Need one tool your business runs on?",
};

const choose = [
    ...services.map((s) => ({ question: questions[s.slug], answer: s.singular, href: s.href, accent: s.accent, tint: s.tint })),
    { question: "Still not sure which fits?", answer: "Let’s talk", href: WHATSAPP_URL, accent: "#3F434A", tint: "#F1EFEA" },
];

export default function ServicesPage() {
    return (
        <div className="container mt-6 sm:mt-16">
            <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div className="flex flex-col gap-3.5 sm:gap-5">
                    <p className="eyebrow">Services</p>
                    <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[56px] xl:leading-[1.03] xl:tracking-[-0.035em]">
                        More clients, more sales, less manual work.
                    </h1>
                    <p className="max-w-[580px] text-base leading-relaxed text-ink-muted sm:text-lg">
                        I build websites that bring in calls from Google and Maps, Shopify stores that sell more, and web apps that
                        save your team hours every week.
                    </p>
                </div>

                <aside className="overflow-hidden rounded-3xl border border-rule bg-white shadow-[0_1px_2px_rgba(17,20,24,0.04),0_16px_36px_-20px_rgba(22,40,77,0.18)]">
                    <div className="flex flex-col gap-1 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
                        <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">Not sure which one fits?</h2>
                        <p className="text-sm text-ink-faint">Pick the question that sounds like you.</p>
                    </div>
                    <ul>
                        {choose.map((item) => {
                            const external = item.href.startsWith("http");
                            return (
                                <li key={item.question} className="border-t border-line">
                                    <Link
                                        href={item.href}
                                        target={external ? "_blank" : undefined}
                                        rel={external ? "noopener noreferrer" : undefined}
                                        className="group flex min-h-14 flex-col gap-2.5 px-5 py-4 text-ink transition-colors hover:bg-[#faf9f6] min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4 sm:px-6"
                                    >
                                        <span className="text-[15px]">{item.question}</span>
                                        <span
                                            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-[13px] font-semibold min-[480px]:self-auto"
                                            style={{ backgroundColor: item.tint, color: item.accent }}
                                        >
                                            {item.answer}
                                            <ArrowRight
                                                className="size-[13px] transition-transform group-hover:translate-x-0.5"
                                                strokeWidth={2.2}
                                                aria-hidden
                                            />
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </aside>
            </section>

            <div className="mt-12 flex flex-col gap-4 sm:mt-18 sm:gap-5">
                {services.map((service, i) => (
                    <article
                        key={service.slug}
                        className="grid overflow-hidden rounded-3xl border border-rule bg-white sm:rounded-[28px] lg:grid-cols-[1fr_1.25fr]"
                    >
                        <div className="flex flex-col gap-4 p-6 sm:p-10">
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex size-11 items-center justify-center rounded-xl font-mono text-sm font-semibold"
                                    style={{ backgroundColor: service.tint, color: service.accent }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="font-mono text-xs font-semibold tracking-[0.1em] text-ink-faint uppercase">
                                    {service.label}
                                </span>
                            </div>
                            <h2 className="mt-1 text-[28px] leading-[1.08] font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">
                                {service.title}
                            </h2>
                            <p className="text-base font-semibold" style={{ color: service.accent }}>
                                {service.tagline}
                            </p>
                            <p className="text-[15px] leading-[1.65] text-ink-muted">{service.summary}</p>
                            <Link href={service.href} className="btn-pill-primary mt-auto h-[46px] self-start px-5.5">
                                Explore {service.title}
                                <ArrowRight className="size-[15px]" aria-hidden />
                            </Link>
                        </div>

                        <div className="grid gap-8 border-t border-line bg-[#faf9f6] p-6 sm:grid-cols-2 sm:p-10 lg:border-t-0 lg:border-l">
                            <div className="flex flex-col gap-3.5">
                                <h3 className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                                    Good fit if…
                                </h3>
                                <ul className="flex flex-col gap-3.5">
                                    {service.goodFit.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <span
                                                className="mt-px flex size-5 shrink-0 items-center justify-center rounded-full"
                                                style={{ backgroundColor: service.tint, color: service.accent }}
                                            >
                                                <Check className="size-3" strokeWidth={2.6} aria-hidden />
                                            </span>
                                            <span className="text-sm leading-normal text-ink-soft">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3.5">
                                <h3 className="font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase">
                                    What’s included
                                </h3>
                                <ul className="flex flex-col gap-3.5">
                                    {service.included.map((item) => (
                                        <li key={item} className="flex items-center gap-2.5">
                                            <span
                                                className="size-1.5 shrink-0 rounded-full"
                                                style={{ backgroundColor: service.accent }}
                                                aria-hidden
                                            />
                                            <span className="text-sm leading-snug text-ink-soft">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {services[0].proof && <ProofBlock proof={services[0].proof} className="mt-4 sm:mt-5" />}

            <CtaSection
                className="mt-12 sm:mt-16"
                description="Tell me about your business and what you want more of - clients, sales or time. I’ll tell you where I’d start."
            />
        </div>
    );
}

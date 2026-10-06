import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import ProofBlock from "@/app/_components/proof-block";
import { services, whatsappLink } from "@/app/_data/services";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, areaServed, businessRef, collectionSchema } from "@/app/_lib/schema";

export const metadata: Metadata = pageMetadata({
    title: "Web Design, Shopify & Custom Apps in Vienna | Nicojuhari",
    description:
        "Find out why people don’t call or buy, then fix it. Websites for local businesses, Shopify store checks and redesigns, custom apps. Free first look.",
    path: "/services",
});

const questions: Record<string, string> = {
    "local-business-websites": "Want more calls and bookings from Google and Maps?",
    "shopify-stores": "Getting store traffic, but not enough sales?",
    "custom-web-apps": "Losing hours to the same manual task every week?",
};

const ladder = [
    { title: "You send a link", text: "Your website, store or business name. On WhatsApp or email." },
    { title: "I check and test", text: "I use your site like a customer and look at the numbers behind it." },
    { title: "You see what I found", text: "What’s wrong, what it costs you, and what to fix first. In plain words." },
    { title: "I fix it", text: "A fixed price, agreed before I start. Then I keep improving it, if you want." },
];

const SEND_TEXT = "Hi Nick, please take a look at my website or store: ";
const SEND_NOTE = "Free first look. I reply within 24 hours with what I found.";

/** The first two hidden problems of each service */
const hiddenPicks = services.flatMap((s) =>
    s.hidden.slice(0, 2).map((item) => ({ ...item, href: `${s.href}#problems`, service: s.title, accent: s.accent, tint: s.tint }))
);

const schema = collectionSchema(
    "Services",
    "Local business websites, Shopify store checks, redesign and CRO, and custom web apps - each starts with a check that finds what to fix first.",
    "/services",
    services.map((s) => ({
        type: "Service",
        name: s.title,
        description: s.summary,
        url: absoluteUrl(s.href),
        extra: { provider: businessRef, areaServed },
    }))
);

const proofs = services.flatMap((s) => (s.proof ? [s.proof] : []));

const choose = [
    ...services.map((s) => ({ question: questions[s.slug], answer: s.singular, href: s.href, accent: s.accent, tint: s.tint })),
    { question: "Still not sure which fits?", answer: "Ask on WhatsApp", href: whatsappLink(), accent: "#3F434A", tint: "#F1EFEA" },
];

export default function ServicesPage() {
    return (
        <div className="container mt-6 sm:mt-16">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <section className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div className="flex flex-col gap-3.5 sm:gap-5">
                    <p className="eyebrow">Services</p>
                    <h1 className="text-[34px] leading-[1.06] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[56px] xl:leading-[1.03] xl:tracking-[-0.035em]">
                        Find out why people don’t call or buy. Then fix it.
                    </h1>
                    <p className="max-w-[580px] text-base leading-relaxed text-ink-muted sm:text-lg">
                        Most problems are hard to see in your own business. A form that sends to an old inbox. Shipping costs
                        that scare buyers at the last step. Ads that pay for the wrong clicks. I check your website or store
                        like a customer, find what’s wrong, and fix it.
                    </p>
                    <div className="mt-1 flex flex-col gap-2.5">
                        <a
                            href={whatsappLink(SEND_TEXT)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary h-12 self-start px-6 text-[15px] sm:text-sm"
                        >
                            Send your website link
                            <ArrowRight className="size-4" aria-hidden />
                        </a>
                        <p className="text-sm font-medium text-ink-soft">{SEND_NOTE}</p>
                    </div>
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

            <section className="mt-12 flex flex-col gap-6 sm:mt-18 sm:gap-7">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                    <div className="flex max-w-[640px] flex-col gap-2.5">
                        <p className="eyebrow">What I check</p>
                        <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">
                            Problems most owners don’t see
                        </h2>
                    </div>
                    <p className="max-w-[380px] text-[15px] leading-relaxed text-ink-muted">
                        Nobody tells you about them. People just leave. I find them by testing, then I fix them.
                    </p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {hiddenPicks.map((item) => (
                        <li key={item.title}>
                            <Link
                                href={item.href}
                                className="group flex h-full flex-col gap-3 rounded-[20px] border border-rule bg-white p-5.5 transition-colors hover:border-ink/20 sm:p-6.5"
                            >
                                <span
                                    className="self-start rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase"
                                    style={{ backgroundColor: item.tint, color: item.accent }}
                                >
                                    {item.service}
                                </span>
                                <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
                                <p className="text-sm leading-relaxed text-ink-muted">{item.cost}</p>
                                <p className="mt-auto border-t border-line pt-3 text-sm leading-relaxed text-ink-soft">
                                    <span className="font-semibold" style={{ color: item.accent }}>
                                        Fix:{" "}
                                    </span>
                                    {item.fix}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
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
                            <div className="mt-auto flex flex-col gap-3 pt-1 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-5">
                                <Link href={service.href} className="btn-pill-primary h-[46px] self-start px-5.5">
                                    See the details
                                    <ArrowRight className="size-[15px]" aria-hidden />
                                </Link>
                                {service.firstStep && (
                                    <Link
                                        href={`${service.href}#${service.firstStep.id}`}
                                        className="py-2.5 text-sm font-semibold transition-colors hover:text-ink"
                                        style={{ color: service.accent }}
                                    >
                                        {service.firstStep.startsWith}
                                    </Link>
                                )}
                            </div>
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

            <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:gap-5">
                {proofs.map((proof) => (
                    <ProofBlock key={proof.title} proof={proof} />
                ))}
            </div>

            <section className="mt-12 flex flex-col gap-7 rounded-3xl border border-rule bg-white p-5.5 sm:mt-16 sm:rounded-[28px] sm:p-11">
                <div className="flex flex-col gap-2.5">
                    <p className="eyebrow">How it works</p>
                    <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">The same four steps for every service</h2>
                </div>
                <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {ladder.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[13px] font-semibold text-white">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="h-px grow bg-rule" aria-hidden />
                            </div>
                            <h3 className="text-[17px] font-semibold text-ink">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-muted">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <CtaSection
                className="mt-12 sm:mt-16"
                title="Let me take a look."
                description="Send me your website or store link. I’ll check it and reply within 24 hours with what I found. Free, no obligation."
                primaryLabel="Send your website link"
                whatsappText={SEND_TEXT}
            />
        </div>
    );
}

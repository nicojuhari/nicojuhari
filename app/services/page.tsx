import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import { WhatsAppIcon } from "@/app/_components/icons";
import { services, whatsappLink } from "@/app/_data/services";
import { pageMetadata } from "@/app/_lib/metadata";
import { absoluteUrl, areaServed, businessRef, collectionSchema } from "@/app/_lib/schema";

export const metadata: Metadata = pageMetadata({
    title: "Websites & Custom Apps in Vienna | Nicojuhari",
    description:
        "Find out why people don’t call or buy, then fix it. Websites and ad landing pages that bring customers, and AI automations that save time. Free first look.",
    path: "/services",
});

const ladder = [
    { title: "You send a link", text: "Your website, store or business name. On WhatsApp or email." },
    { title: "I check and test", text: "I use your site like a customer and look at the numbers behind it." },
    { title: "You see what I found", text: "What’s wrong and what to fix first. In plain words." },
    { title: "I fix it", text: "A fixed price, paid in stages. Then I keep improving it, if you want." },
];

const SEND_TEXT = "Hi Nick, please take a look at my website: ";

/** The first two hidden problems of each service - the rest live on the service page */
const hiddenPicks = services.flatMap((s) =>
    s.hidden.slice(0, 2).map((item) => ({ ...item, href: `${s.href}#problems`, tag: s.slug === "custom-web-apps" ? "Apps" : "Websites", ink: s.ink, tint: s.tint }))
);

const schema = collectionSchema(
    "Services",
    "Local business websites and custom web apps & automations - each starts with a check that finds what to fix first.",
    "/services",
    services.map((s) => ({
        type: "Service",
        name: s.title,
        description: s.summary,
        url: absoluteUrl(s.href),
        extra: { provider: businessRef, areaServed },
    }))
);

export default function ServicesPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

            {/* Hero + chooser */}
            <section className="container mt-8 grid items-center gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-5 sm:gap-6.5">
                    <p className="eyebrow">Services</p>
                    <h1 className="text-[40px] leading-[1.03] font-semibold tracking-[-0.04em] text-ink sm:text-[54px] xl:text-[64px]">
                        Find out why people don’t call or buy. <span className="text-teal">Then fix it.</span>
                    </h1>
                    <p className="max-w-[520px] text-lg leading-normal text-[#4a4f57] sm:text-xl">
                        Most problems are hard to see from the inside. I test your business like a customer and fix what I find.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <a
                            href={whatsappLink(SEND_TEXT)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary h-14 self-start px-6.5 text-base sm:text-[17px]"
                        >
                            Send your website link
                            <ArrowRight className="size-[18px]" aria-hidden />
                        </a>
                        <p className="text-[15px] text-[#4a4f57]">
                            <span className="font-semibold text-ink">Free first look.</span> Reply within 24 hours.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-[24px] bg-white p-4 sm:rounded-[28px] sm:p-8">
                    <p className="px-1 pb-1.5 text-lg font-semibold tracking-[-0.01em] text-ink">Which one fits you?</p>
                    {services.map((s) => (
                        <Link
                            key={s.slug}
                            href={s.href}
                            className="group flex items-center justify-between gap-4 rounded-[20px] p-5 transition-opacity hover:opacity-90 sm:px-5.5"
                            style={{ backgroundColor: s.tint }}
                        >
                            <span className="flex flex-col gap-1">
                                <span className="text-[15px] opacity-80 sm:text-base" style={{ color: s.ink }}>
                                    {s.question}
                                </span>
                                <span className="text-[17px] font-semibold sm:text-[19px]" style={{ color: s.ink }}>
                                    {s.singular}
                                </span>
                            </span>
                            <span
                                className="flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5"
                                style={{ backgroundColor: s.accent }}
                            >
                                <ArrowRight className="size-4" aria-hidden />
                            </span>
                        </Link>
                    ))}
                    <a
                        href={whatsappLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 rounded-[20px] bg-bg-soft p-5 transition-opacity hover:opacity-90 sm:px-5.5"
                    >
                        <span className="flex flex-col gap-1">
                            <span className="text-[15px] text-[#4a4f57] sm:text-base">Not sure which one?</span>
                            <span className="text-[17px] font-semibold text-ink sm:text-[19px]">Ask me on WhatsApp</span>
                        </span>
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                            <WhatsAppIcon className="size-4" />
                        </span>
                    </a>
                </div>
            </section>

            {/* One block per service */}
            <section className="container mt-16 flex flex-col gap-4 sm:mt-24 sm:gap-5">
                {services.map((s) => (
                    <article
                        key={s.slug}
                        className="grid gap-8 rounded-[26px] p-6 sm:rounded-[32px] sm:p-12 lg:grid-cols-2 lg:gap-14"
                        style={{ backgroundColor: s.tint }}
                    >
                        <div className="flex flex-col gap-4">
                            <p className="text-[13px] font-semibold opacity-80 sm:text-sm" style={{ color: s.ink }}>
                                {s.label}
                            </p>
                            <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[38px]" style={{ color: s.ink }}>
                                {s.title}
                            </h2>
                            <p className="text-[17px] leading-normal text-[#2c3440] sm:text-[19px]">{s.summary}</p>
                            {s.proof && (
                                <div className="mt-2 flex flex-col gap-1 rounded-[20px] bg-white p-5 sm:px-5.5">
                                    <p className="text-[30px] leading-tight font-semibold tracking-[-0.03em] sm:text-[34px]" style={{ color: s.accent }}>
                                        {s.proof.stat}
                                    </p>
                                    <p className="text-[15px] leading-snug text-[#2c3440]">{s.proof.title}.</p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[15px] font-semibold" style={{ color: s.ink }}>
                                    A good fit if
                                </h3>
                                <ul className="flex flex-col gap-2.5 text-[15px] text-[#2c3440] sm:text-base">
                                    {s.goodFit.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <Check className="mt-0.5 size-5 shrink-0" strokeWidth={2.4} style={{ color: s.accent }} aria-hidden />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[15px] font-semibold" style={{ color: s.ink }}>
                                    What’s included
                                </h3>
                                <ul className="flex flex-wrap gap-2 text-sm font-medium text-[#2c3440]">
                                    {s.included.map((item) => (
                                        <li key={item} className="rounded-full bg-white px-3.5 py-2">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div
                                className="mt-auto flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
                                style={{ borderColor: `color-mix(in srgb, ${s.accent} 15%, transparent)` }}
                            >
                                {s.firstStep && (
                                    <Link href={`${s.href}#${s.firstStep.id}`} className="text-[15px] font-semibold hover:underline" style={{ color: s.ink }}>
                                        {s.firstStep.startsWith}
                                    </Link>
                                )}
                                <Link
                                    href={s.href}
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: s.accent }}
                                >
                                    See the service
                                    <ArrowRight className="size-4" aria-hidden />
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* Problems I find most often */}
            <section className="container mt-16 flex flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">What I find most often</p>
                    <h2 className="section-title">Small problems that cost you customers.</h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {hiddenPicks.map((item) => (
                        <li key={item.title}>
                            <Link href={item.href} className="flex h-full flex-col gap-3 rounded-[24px] bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_-12px_rgba(22,40,77,0.25)] sm:p-7">
                                <span
                                    className="self-start rounded-full px-2.5 py-1 text-[13px] font-semibold"
                                    style={{ backgroundColor: item.tint, color: item.ink }}
                                >
                                    {item.tag}
                                </span>
                                <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-xl">{item.title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#4a4f57]">{item.cost}</p>
                                <p className="mt-auto pt-3 text-[15px] leading-normal text-ink">
                                    <span className="font-semibold" style={{ color: item.ink }}>
                                        The fix:{" "}
                                    </span>
                                    {item.fix}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            {/* How it works */}
            <section className="mt-16 bg-brand text-white sm:mt-24">
                <div className="container flex flex-col gap-8 py-14 sm:gap-12 sm:py-24">
                    <div className="flex max-w-[640px] flex-col gap-3">
                        <p className="eyebrow text-[#f2a9c9]">How it works</p>
                        <h2 className="section-title text-white">Same four steps for every project.</h2>
                    </div>
                    <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                        {ladder.map((step, i) => (
                            <li key={step.title} className="flex flex-col gap-3 rounded-[22px] bg-[#1f3561] p-6 sm:p-7">
                                <span className="flex size-9 items-center justify-center rounded-full bg-[#f2a9c9] text-[15px] font-bold text-brand">
                                    {i + 1}
                                </span>
                                <h3 className="text-xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#c3cbe0]">{step.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <div className="container mt-16 sm:mt-24">
                <CtaSection
                    title="Not sure where to start?"
                    description="Send me your website link. I’ll tell you the first thing I’d fix. Free, within 24 hours."
                    primaryLabel="Send your website link"
                    whatsappText={SEND_TEXT}
                />
            </div>
        </>
    );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import FaqSection from "@/app/_components/faq-section";
import { breadcrumbSchema, serviceSchema } from "@/app/_lib/schema";
import { getService, services, whatsappLink, type ServiceSlug } from "@/app/_data/services";

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Colours of the dark "first step" card, per service */
const firstCard: Record<ServiceSlug, { bg: string; panel: string; pop: string; muted: string }> = {
    "local-business-websites": { bg: "#16284D", panel: "#203868", pop: "#F2A9C9", muted: "#C3CBE0" },
    "custom-web-apps": { bg: "#0B4C45", panel: "#12625A", pop: "#A8E6DA", muted: "#CFE8E3" },
};

type Props = {
    slug: ServiceSlug;
    /** Name and description for the Service structured data */
    schemaName: string;
    schemaDescription: string;
};

export default function ServiceDetail({ slug, schemaName, schemaDescription }: Props) {
    const service = getService(slug);
    const related = services.filter((s) => s.slug !== slug);
    const first = service.firstStep;
    const card = firstCard[slug];
    const send = service.send;
    const sendLink = whatsappLink(send.whatsappText);
    const proofExternal = service.proof?.href?.startsWith("http");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(schemaName, schemaDescription, service.href)) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Services", path: "/services" },
                            { name: service.title, path: service.href },
                        ])
                    ),
                }}
            />

            {/* Hero */}
            <section className="container mt-6 grid items-start gap-10 sm:mt-10 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-5 sm:gap-6 lg:pt-2">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#5b6068]">
                        <Link href="/services" className="py-1.5 transition-colors hover:text-ink">
                            Services
                        </Link>
                        <ChevronRight className="size-3.5" aria-hidden />
                        <span aria-current="page" className="text-ink">
                            {service.title}
                        </span>
                    </nav>
                    <p
                        className="self-start rounded-full px-3.5 py-2 text-[13px] font-semibold sm:text-sm"
                        style={{ backgroundColor: service.tint, color: service.ink }}
                    >
                        {service.label}
                    </p>
                    <h1
                        className="text-[42px] leading-[1.02] font-semibold tracking-[-0.04em] sm:text-[56px] xl:text-[70px]"
                        style={{ color: service.ink }}
                    >
                        {service.headline}
                    </h1>
                    <p className="max-w-[540px] text-lg leading-normal text-[#4a4f57] sm:text-xl">{service.intro}</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a href={sendLink} target="_blank" rel="noopener noreferrer" className="btn-pill-primary h-14 px-6.5 text-base sm:text-[17px]">
                            {send.label}
                            <ArrowRight className="size-[18px]" aria-hidden />
                        </a>
                        <a
                            href="#problems"
                            className="inline-flex h-14 items-center justify-center rounded-full px-6 text-base font-semibold transition-opacity hover:opacity-85 sm:text-[17px]"
                            style={{ backgroundColor: service.tint, color: service.ink }}
                        >
                            What I check
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/nick-profile-photo.webp"
                            alt=""
                            width={80}
                            height={80}
                            className="size-10 rounded-full object-cover ring-3 ring-white"
                        />
                        <p className="text-sm leading-snug text-[#4a4f57] sm:text-[15px]">{send.note}</p>
                    </div>
                </div>

                {first && (
                    <aside
                        id={first.id}
                        className="flex scroll-mt-28 flex-col gap-5 rounded-[24px] p-6 text-white sm:rounded-[28px] sm:p-10"
                        style={{ backgroundColor: card.bg }}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs font-semibold tracking-[0.08em] uppercase sm:text-[13px]" style={{ color: card.pop }}>
                                The first step
                            </p>
                            <span className="rounded-full px-3 py-1.5 text-[13px] font-bold" style={{ backgroundColor: card.pop, color: card.bg }}>
                                {first.cost.split(/[.,]/)[0]}
                            </span>
                        </div>
                        <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[34px]">{first.title}</h2>
                        <p className="text-base leading-normal sm:text-[17px]" style={{ color: card.muted }}>
                            {first.intro}
                        </p>
                        <ul className="flex flex-col gap-3 rounded-[20px] p-5 text-[15px] sm:text-base" style={{ backgroundColor: card.panel }}>
                            {first.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <Check className="mt-0.5 size-5 shrink-0" strokeWidth={2.4} style={{ color: card.pop }} aria-hidden />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={whatsappLink(first.whatsappText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-white px-6 text-base font-semibold transition-opacity hover:opacity-90"
                            style={{ color: card.bg }}
                        >
                            {first.cta}
                        </a>
                    </aside>
                )}
            </section>

            {/* For you if */}
            <section className="container mt-16 sm:mt-24">
                <div
                    className="grid gap-7 rounded-[26px] p-6 sm:rounded-[32px] sm:p-12 lg:grid-cols-[1fr_2fr] lg:gap-14"
                    style={{ backgroundColor: service.tint }}
                >
                    <div className="flex flex-col gap-3">
                        <p className="eyebrow" style={{ color: service.ink }}>
                            Is this for you?
                        </p>
                        <h2 className="section-title" style={{ color: service.ink }}>
                            This is for you if…
                        </h2>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {service.forYouIf.map((item) => (
                            <li key={item} className="flex gap-3 rounded-[18px] bg-white p-4.5 text-[15px] leading-snug text-[#2c3440] sm:text-base">
                                <Check className="mt-0.5 size-5 shrink-0" strokeWidth={2.4} style={{ color: service.accent }} aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Hidden problems: what it costs, how I find it, how I fix it */}
            <section id="problems" className="container mt-16 flex scroll-mt-28 flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">What I check</p>
                    <h2 className="section-title">{service.hiddenTitle}</h2>
                    <p className="text-base leading-normal text-[#4a4f57] sm:text-lg">{service.hiddenIntro}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {service.hidden.map((item) => (
                        <li key={item.title} className="flex flex-col gap-3.5 rounded-[24px] bg-white p-6 sm:p-7">
                            <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-[21px]">{item.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#4a4f57]">{item.cost}</p>
                            <dl className="mt-auto flex flex-col gap-2 pt-1.5 text-sm leading-normal">
                                <div className="flex gap-2.5 rounded-[14px] bg-bg-soft px-3.5 py-3">
                                    <dt className="w-14 shrink-0 font-semibold text-[#5b6068]">I check</dt>
                                    <dd className="text-ink">{item.check}</dd>
                                </div>
                                <div className="flex gap-2.5 rounded-[14px] px-3.5 py-3" style={{ backgroundColor: service.tint }}>
                                    <dt className="w-14 shrink-0 font-semibold" style={{ color: service.ink }}>
                                        I fix
                                    </dt>
                                    <dd className="text-ink">{item.fix}</dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>
            </section>

            {/* What you get */}
            <section className="container mt-16 flex flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[680px] flex-col gap-3">
                    <p className="eyebrow">{service.buildTitle}</p>
                    <h2 className="section-title">{service.buildIntro}</h2>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {service.build.map((item, i) => (
                        <li key={item.title} className="flex flex-col gap-2.5 rounded-[22px] bg-white p-6 sm:p-7">
                            <span className="text-sm font-bold" style={{ color: service.accent }}>
                                {num(i)}
                            </span>
                            <h3 className="text-[19px] leading-tight font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#4a4f57]">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Proof */}
            {service.proof && (
                <section className="mt-16 bg-brand text-white sm:mt-24">
                    <div className="container grid items-center gap-7 py-14 sm:py-24 lg:grid-cols-2 lg:gap-16">
                        <div className="flex flex-col gap-2.5">
                            <p className="eyebrow text-[#f2a9c9]">Tested in my own business</p>
                            <p className="text-[64px] leading-none font-semibold tracking-[-0.05em] text-[#f2a9c9] sm:text-[96px] xl:text-[112px]">
                                {service.proof.stat}
                            </p>
                            <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em] sm:text-[28px]">{service.proof.title}.</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <p className="text-[17px] leading-relaxed text-[#c3cbe0] sm:text-[19px]">{service.proof.text}</p>
                            {service.proof.href && service.proof.linkLabel && (
                                <a
                                    href={service.proof.href}
                                    target={proofExternal ? "_blank" : undefined}
                                    rel={proofExternal ? "noopener noreferrer" : undefined}
                                    className="inline-flex h-12 items-center gap-2 self-start rounded-full bg-white px-5 text-[15px] font-semibold text-brand transition-opacity hover:opacity-90"
                                >
                                    {service.proof.linkLabel}
                                    <ArrowUpRight className="size-4" aria-hidden />
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* How it works */}
            <section id="how" className="container mt-16 flex scroll-mt-28 flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex flex-col gap-3">
                    <p className="eyebrow">How it works</p>
                    <h2 className="section-title">Four steps. No surprises.</h2>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {service.steps.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-3 rounded-[22px] bg-white p-6 sm:p-7">
                            <span
                                className="flex size-9 items-center justify-center rounded-full text-[15px] font-bold text-white"
                                style={{ backgroundColor: service.accent }}
                            >
                                {i + 1}
                            </span>
                            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink sm:text-xl">{step.title}</h3>
                            <p className="text-[15px] leading-relaxed text-[#4a4f57]">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {service.faq && <FaqSection faq={service.faq} className="container mt-16 sm:mt-24" />}

            {/* Other services */}
            <section className="container mt-16 sm:mt-24">
                {related.map((r) => (
                    <Link
                        key={r.slug}
                        href={r.href}
                        className="group flex items-center justify-between gap-4 rounded-[22px] p-5.5 transition-opacity hover:opacity-90 sm:p-7"
                        style={{ backgroundColor: r.tint }}
                    >
                        <span className="flex flex-col gap-1">
                            <span className="text-sm opacity-80 sm:text-[15px]" style={{ color: r.ink }}>
                                Also: {r.question}
                            </span>
                            <span className="text-lg font-semibold tracking-[-0.015em] sm:text-xl" style={{ color: r.ink }}>
                                {r.title}
                            </span>
                        </span>
                        <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5"
                            style={{ backgroundColor: r.accent }}
                        >
                            <ArrowRight className="size-4" aria-hidden />
                        </span>
                    </Link>
                ))}
            </section>

            <div className="container mt-12 sm:mt-16">
                <CtaSection title="Let me take a look." description={service.cta} primaryLabel={send.label} whatsappText={send.whatsappText} />
            </div>
        </>
    );
}

import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import FaqSection from "@/app/_components/faq-section";
import ContactButton from "@/app/_components/contact-button";
import { serviceIcons } from "@/app/_components/icons";
import { breadcrumbSchema, serviceSchema } from "@/app/_lib/schema";
import { getService, services, type ServiceSlug } from "@/app/_data/services";

const num = (i: number) => String(i + 1).padStart(2, "0");

type Props = {
    slug: ServiceSlug;
    /** Name and description for the Service structured data */
    schemaName: string;
    schemaDescription: string;
};

export default function ServiceDetail({ slug, schemaName, schemaDescription }: Props) {
    const service = getService(slug);
    const Icon = serviceIcons[slug];
    const related = services.filter((s) => s.slug !== slug);

    return (
        <div className="container mt-5 sm:mt-10">
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

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-ink-faint">
                <Link href="/services" className="py-1.5 font-medium text-ink-muted transition-colors hover:text-ink">
                    Services
                </Link>
                <ChevronRight className="size-3.5 text-[#9a9ea5]" aria-hidden />
                <span aria-current="page" className="font-medium text-ink">
                    {service.title}
                </span>
            </nav>

            {/* Hero */}
            <section className="mt-4 grid items-start gap-8 sm:mt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
                <div className="flex flex-col gap-4.5 sm:gap-5.5 lg:pt-3">
                    <span className="inline-flex items-center gap-2.5 self-start rounded-full border border-rule bg-white py-1.5 pr-3.5 pl-1.5 text-[13px] font-semibold text-ink-soft">
                        <span
                            className="flex size-7.5 items-center justify-center rounded-full"
                            style={{ backgroundColor: service.tint, color: service.accent }}
                        >
                            <Icon className="size-4" strokeWidth={1.8} aria-hidden />
                        </span>
                        {service.label}
                    </span>
                    <h1 className="text-[38px] leading-[1.04] font-semibold tracking-[-0.03em] text-ink sm:text-5xl xl:text-[60px] xl:leading-[1.02] xl:tracking-[-0.035em]">
                        {service.headline}
                    </h1>
                    <p className="max-w-[560px] text-base leading-relaxed text-ink-muted sm:text-lg">{service.intro}</p>
                    <div className="mt-1.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                        <ContactButton className="btn-pill-primary h-12 px-6 text-[15px] sm:text-sm">Get in touch</ContactButton>
                        <a href="#how" className="btn-pill-secondary h-12 px-5.5 text-[15px] sm:text-sm">
                            How it works
                        </a>
                    </div>
                    <span className="mt-1 font-mono text-xs text-ink-faint">Vienna · Replies within 24h, Mon–Fri</span>
                </div>

                <aside className="flex flex-col gap-4.5 rounded-3xl border border-rule bg-white p-5.5 shadow-[0_1px_2px_rgba(17,20,24,0.04),0_16px_36px_-20px_rgba(22,40,77,0.18)] sm:p-8">
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">Is this for you?</h2>
                        <p className="text-sm text-ink-faint">A good fit if any of these sound familiar:</p>
                    </div>
                    <ul>
                        {service.forYouIf.map((item) => (
                            <li key={item} className="flex items-start gap-3 border-t border-line py-3">
                                <span
                                    className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-full"
                                    style={{ backgroundColor: service.tint, color: service.accent }}
                                >
                                    <Check className="size-[13px]" strokeWidth={2.6} aria-hidden />
                                </span>
                                <span className="text-[15px] leading-normal text-ink-soft">{item}</span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </section>

            {/* What I build */}
            <section className="mt-16 flex flex-col gap-6 sm:mt-24 sm:gap-7">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                    <div className="flex flex-col gap-2.5">
                        <p className="eyebrow">What I build</p>
                        <h2 className="text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] text-ink sm:text-[38px]">
                            {service.buildTitle}
                        </h2>
                    </div>
                    <p className="max-w-[380px] text-[15px] leading-relaxed text-ink-muted">{service.buildIntro}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {service.build.map((item, i) => (
                        <li key={item.title} className="flex flex-col gap-3 rounded-[20px] border border-rule bg-white p-5.5 sm:p-6.5">
                            <span className="font-mono text-xs font-semibold" style={{ color: service.accent }}>
                                {num(i)}
                            </span>
                            <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-muted">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* How it works */}
            <section
                id="how"
                className="mt-16 flex scroll-mt-28 flex-col gap-7 rounded-3xl border border-rule bg-white p-5.5 sm:mt-24 sm:gap-8 sm:rounded-[28px] sm:p-11"
            >
                <div className="flex flex-col gap-2.5">
                    <p className="eyebrow">How it works</p>
                    <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-ink sm:text-[32px]">From first call to launch</h2>
                </div>
                <ol className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {service.steps.map((step, i) => (
                        <li key={step.title} className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[13px] font-semibold text-white">
                                    {num(i)}
                                </span>
                                <span className="h-px grow bg-rule" aria-hidden />
                            </div>
                            <h3 className="text-[17px] font-semibold text-ink">{step.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-muted">{step.description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {service.faq && <FaqSection faq={service.faq} className="mt-16 sm:mt-24" />}

            {/* Other services */}
            <section className="mt-12 flex flex-col gap-4 sm:mt-16">
                <h2 className="eyebrow">Other services</h2>
                <ul className="grid gap-3 md:grid-cols-2 md:gap-4">
                    {related.map((r) => (
                        <li key={r.slug}>
                            <Link
                                href={r.href}
                                className="group flex items-center gap-4 rounded-[20px] border border-rule bg-white p-5 text-ink transition-colors hover:border-ink/20 sm:gap-4.5 sm:p-6"
                            >
                                <span
                                    className="flex size-12 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-bold"
                                    style={{ backgroundColor: r.tint, color: r.accent }}
                                    aria-hidden
                                >
                                    {r.mark}
                                </span>
                                <span className="flex grow flex-col gap-1">
                                    <span className="text-lg font-semibold tracking-[-0.015em]">{r.title}</span>
                                    <span className="text-sm text-ink-muted">{r.tagline}</span>
                                </span>
                                <ArrowRight
                                    className="size-[18px] shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5"
                                    aria-hidden
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <CtaSection className="mt-12 sm:mt-16" description={service.cta} />
        </div>
    );
}

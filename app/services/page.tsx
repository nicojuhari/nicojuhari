import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Globe, ShoppingBag, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CtaSection from "@/app/_components/cta-section";

export const metadata: Metadata = {
    title: "Services - Web Design & Development | Nicojuhari",
    description:
        "Web design and development for businesses and growing teams - business websites, Shopify stores, and custom web apps.",
    alternates: { canonical: "https://nicojuhari.com/services" },
};

const services = [
    {
        icon: Globe,
        iconBg: "bg-brand/10",
        iconColor: "text-brand",
        label: "For local & service businesses",
        title: "Business Websites",
        tagline: "Show up. Get found. Turn visitors into customers.",
        description:
            "Most business websites look like a digital brochure. A good one works like a salesperson - ranking in search, loading fast on mobile, and making it easy for people to reach out, book, or buy.",
        forWho: [
            "You don't have a website, or the one you have looks outdated",
            "When people search locally, they find your competitors instead",
            "Visitors come to your site but don't reach out",
            "You're opening a new location or rebranding",
        ],
        includes: [
            "Website design & development",
            "Local SEO setup",
            "Google Business Profile optimization",
            "Booking & scheduling integrations",
            "Analytics & conversion tracking",
            "Mobile-first, fast-loading pages",
        ],
        href: "/services/business-websites",
        cta: "Learn more",
    },
    {
        icon: ShoppingBag,
        iconBg: "bg-brand-rose/10",
        iconColor: "text-brand-rose",
        label: "For online sellers & brands",
        title: "Shopify Stores",
        tagline: "A store built to sell - set up right from day one.",
        description:
            "Getting a Shopify store live is the easy part. Getting it to convert, retain customers, and run smoothly without eating your time - that's where most stores fall short.",
        forWho: [
            "You want to sell online but don't know where to start",
            "Your current store doesn't convert or looks outdated",
            "You're leaving money on the table with no email flows",
            "You're migrating from another platform",
        ],
        includes: [
            "Full Shopify store setup",
            "Product pages & collections",
            "Klaviyo email marketing flows",
            "Shipping & fulfillment integrations",
            "Reviews with Judge.me or Okendo",
            "Custom theme & app configuration",
        ],
        href: "/services/shopify-stores",
        cta: "Learn more",
    },
    {
        icon: Cpu,
        iconBg: "bg-brand-green/10",
        iconColor: "text-brand-green",
        label: "For teams & growing businesses",
        title: "Custom Web Apps",
        tagline: "Software built around your process - not the other way around.",
        description:
            "When off-the-shelf tools stop fitting, custom software gives your team exactly what it needs. Dashboards, automations, approval flows, payments, GPS tracking - built from scratch, no workarounds.",
        forWho: [
            "You're managing complex data in spreadsheets that are breaking",
            "Your team switches between tools that don't talk to each other",
            "A manual process is eating hours every week",
            "You need payments, location tracking, or AI built in",
        ],
        includes: [
            "Dashboards & internal tools",
            "Business process automation",
            "Workflow and approval systems",
            "Stripe payments & subscriptions",
            "GPS tracking & location features",
            "AI integrations (OpenAI, Claude)",
        ],
        href: "/services/custom-web-apps",
        cta: "Learn more",
    },
];

const howToChoose = [
    {
        question: "Need more customers to find you locally?",
        answer: "Business Website",
        href: "/services/business-websites",
    },
    {
        question: "Selling products online or planning to?",
        answer: "Shopify Store",
        href: "/services/shopify-stores",
    },
    {
        question: "Need a tool your team can actually use?",
        answer: "Custom Web App",
        href: "/services/custom-web-apps",
    },
    {
        question: "Not sure which fits?",
        answer: "Let's talk",
        href: "https://wa.me/+4369010196811",
        external: true,
    },
];

export default function ServicesPage() {
    return (
        <div className="container py-6 sm:py-10">
            <header className="mb-10 max-w-2xl">
                <p className="eyebrow">Services</p>
                <h1 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-ink">
                    The right kind of web presence for what you&apos;re building.
                </h1>
                <p className="mt-4 leading-relaxed text-ink-muted">
                    Whether you need customers to find you, a store that sells, or software your team can actually use - the work starts
                    with understanding your problem. Not a template.
                </p>
            </header>

            <div className="flex flex-col gap-5">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <article key={service.title} className="surface-card p-6 sm:p-8">
                            <div className="mb-5 flex items-center gap-2.5">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${service.iconBg}`}>
                                    <Icon className={`h-4 w-4 ${service.iconColor}`} />
                                </div>
                                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{service.label}</p>
                            </div>

                            <h2 className="text-2xl font-semibold tracking-tight text-ink">{service.title}</h2>
                            <p className="mt-1.5 text-sm font-medium text-brand">{service.tagline}</p>
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{service.description}</p>

                            <div className="mb-7 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">Good fit if…</p>
                                    <ul className="flex flex-col gap-2">
                                        {service.forWho.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">What&apos;s included</p>
                                    <ul className="flex flex-col gap-2">
                                        {service.includes.map((item) => (
                                            <li key={item} className="flex items-center gap-2.5 text-sm text-ink">
                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-rose" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button
                                nativeButton={false}
                                render={<Link href={service.href} />}
                                variant="outline"
                                className="gap-2 rounded-full"
                            >
                                {service.cta}
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </article>
                    );
                })}
            </div>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Not sure which one fits?</h2>
                <p className="mt-2 text-sm text-ink-muted">Answer one question and you&apos;ll know exactly where to start.</p>
                <div className="surface-card mt-6 divide-y divide-rule overflow-hidden">
                    {howToChoose.map((item) => (
                        <Link
                            key={item.question}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-bg-soft"
                        >
                            <span className="text-sm text-ink">{item.question}</span>
                            <span className="ml-4 flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand">
                                {item.answer}
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <div className="mt-12">
                <CtaSection
                    title="Let's work together."
                    description="Have a project in mind? Reach out and we'll figure out the best way to approach it."
                />
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Globe, ShoppingBag, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CtaSection from "@/app/_components/cta-section";

export const metadata: Metadata = {
    title: "Services - Web Design & Development | Nicojuhari",
    description:
        "Web design and development services for businesses, online sellers, and growing teams. Business websites, Shopify stores, and custom web apps - built to work.",
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
        <>
            {/* Intro */}
            <section className="container-sm my-10">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">Services</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
                    The right kind of web presence for what you&apos;re building.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Whether you need customers to find you, a store that sells, or software your team can actually use - the work starts
                    with understanding your problem. Not a template.
                </p>
            </section>

            {/* Services list */}
            <section className="container-sm my-10 flex flex-col gap-6">
                {services.map((service) => {
                    const Icon = service.icon;
                    return (
                        <div key={service.title} className="border rounded-2xl p-6 sm:p-8 bg-white">
                            <div className="flex items-center gap-2.5 mb-5">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${service.iconBg}`}>
                                    <Icon className={`w-4 h-4 ${service.iconColor}`} />
                                </div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{service.label}</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-1.5">{service.title}</h2>
                            <p className="text-sm font-medium text-brand mb-3">{service.tagline}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl">{service.description}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Good fit if…</p>
                                    <ul className="flex flex-col gap-2">
                                        {service.forWho.map((item) => (
                                            <li key={item} className="flex items-start gap-2.5 text-sm">
                                                <Check className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                                        What&apos;s included
                                    </p>
                                    <ul className="flex flex-col gap-2">
                                        {service.includes.map((item) => (
                                            <li key={item} className="flex items-center gap-2.5 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-rose shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button nativeButton={false} render={<Link href={service.href} />} variant="outline" className="gap-2">
                                {service.cta}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    );
                })}
            </section>

            {/* How to choose */}
            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-2">Not sure which one fits?</h2>
                <p className="text-sm text-muted-foreground mb-6">Answer one question and you&apos;ll know exactly where to start.</p>
                <div className="flex flex-col divide-y border rounded-xl overflow-hidden">
                    {howToChoose.map((item) => (
                        <Link
                            key={item.question}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-between px-5 py-4 bg-white hover:bg-muted/40 transition-colors group"
                        >
                            <span className="text-sm">{item.question}</span>
                            <span className="text-sm font-semibold text-brand flex items-center gap-1.5 shrink-0 ml-4">
                                {item.answer}
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container-sm my-10 bg-muted/60 border border-dashed rounded-xl">
                <CtaSection
                    tagline="Have a project in mind? Let's figure out the best way to approach it."
                    className="p-6 sm:justify-start"
                />
            </section>
        </>
    );
}

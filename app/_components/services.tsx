import Link from "next/link";

const services = [
    {
        title: "Custom web apps",
        oneLiner:
            "Replace spreadsheets and manual workflows with software your whole team can use - finance ops, dashboards, automation, AI where it helps.",
        href: "/services/custom-web-apps",
        cta: "Explore custom apps",
    },
    {
        title: "Business websites",
        oneLiner: "Fast, clear sites that show up in search and turn visitors into inquiries - built for how local businesses actually sell.",
        href: "/services/business-websites",
        cta: "Explore websites",
    },
    {
        title: "Shopify stores",
        oneLiner: "Stores set up to sell: clean theme, payments, email, and a checkout path that doesn’t fight your customers.",
        href: "/services/shopify-stores",
        cta: "Explore Shopify",
    },
];

export default function Services() {
    return (
        <section className="section-band section-rule" id="services">
            <div className="mx-auto max-w-7xl">
                <header className="max-w-3xl">
                    <p className="eyebrow">How I work with businesses</p>
                    <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">
                        Three clear ways to work together.
                    </h2>
                    <p className="mt-4 max-w-2xl leading-[1.6] text-ink-muted">
                        Select consulting only - fixed-scope projects after we talk through the problem. Not hourly
                        staff-aug by default.
                    </p>
                </header>

                <ul className="mt-12 divide-y divide-rule border-y border-rule">
                    {services.map((service) => (
                        <li key={service.title} className="grid gap-4 py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-center md:gap-8">
                            <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-muted">{service.oneLiner}</p>
                            <Link
                                href={service.href}
                                className="group inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-brand-green md:justify-end"
                            >
                                {service.cta}
                                <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                                    →
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

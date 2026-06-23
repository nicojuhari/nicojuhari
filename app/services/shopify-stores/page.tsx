import type { Metadata } from "next";
import { Check } from "lucide-react";
import CtaSection from "@/app/_components/cta-section";
import { serviceSchema, breadcrumbSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Shopify Store Setup & Development | Nicojuhari",
    description:
        "Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow.",
    alternates: { canonical: "https://nicojuhari.com/services/shopify-stores" },
};

const forYouIf = [
    "You want to sell online but don't know where to start",
    "Your current store looks outdated or isn't converting visitors into buyers",
    "You're migrating from another platform and need a clean, fresh Shopify setup",
    "You're leaving money on the table with no post-purchase email flow",
    "Managing your store takes too much time and you want it to run more smoothly",
    "You want a store you can actually be proud to send customers to",
];

const deliverables = [
    {
        title: "Full Shopify store setup",
        description:
            "Theme selection and customization, store settings, payment and tax configuration - everything done right from the start.",
    },
    {
        title: "Product pages & collections",
        description:
            "Product pages built to convert: clear descriptions, strong imagery structure, and collection pages that are easy to browse.",
    },
    {
        title: "Klaviyo email marketing",
        description:
            "Welcome sequences, abandoned cart flows, and post-purchase emails set up and running - so you earn more from every visitor.",
    },
    {
        title: "Shipping & fulfillment integrations",
        description: "Connect Shippo, Shipstation, or your carrier of choice. Automate labels, tracking, and fulfillment notifications.",
    },
    {
        title: "Reviews & social proof",
        description:
            "Judge.me or Okendo set up to collect and display reviews automatically - the single biggest trust signal you can add.",
    },
    {
        title: "Custom theme & app configuration",
        description: "Shopify apps selected and configured to fit your workflow - no bloat, no unused installs slowing your store down.",
    },
];

const steps = [
    {
        number: "01",
        title: "Discovery",
        description:
            "I learn about your products, your customers, and what success looks like - so the store is built around your business, not a generic template.",
    },
    {
        number: "02",
        title: "Design & structure",
        description:
            "Theme selection, layout decisions, and collection structure mapped out before anything is built. You approve the direction first.",
    },
    {
        number: "03",
        title: "Build & configure",
        description:
            "Store setup, product import, app configuration, and email flows built and tested. Every part of the buying experience checked.",
    },
    {
        number: "04",
        title: "Launch",
        description: "Go live with your domain connected, analytics in place, and a store that's ready to take orders from day one.",
    },
];

export default function ShopifyStoresPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        serviceSchema(
                            "Shopify Store Setup & Development",
                            "Shopify store setup and development - product pages, Klaviyo email flows, shipping integrations, reviews, and custom theme work. Built to launch and grow.",
                            "/services/shopify-stores"
                        )
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        breadcrumbSchema([
                            { name: "Home", path: "/" },
                            { name: "Services", path: "/services" },
                            { name: "Shopify Stores", path: "/services/shopify-stores" },
                        ])
                    ),
                }}
            />
            <section className="container-sm my-10">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">Service</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">A store built to sell.</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    Set up right, easy to manage, and built to grow. Whether you&apos;re starting from scratch or improving what you have,
                    the goal is a store your customers trust and keep coming back to.
                </p>
            </section>
            <section className="container-sm my-10 bg-muted/60 border border-dashed rounded-xl">
                <CtaSection className="p-6 sm:justify-start" />
            </section>
            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-2">Is this for you?</h2>
                <p className="text-sm text-muted-foreground mb-6">You might be a good fit if any of these sound familiar:</p>
                <ul className="flex flex-col gap-3">
                    {forYouIf.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-2">What I build</h2>
                <p className="text-sm text-muted-foreground mb-6">Depending on your needs, here&apos;s what the work typically covers:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {deliverables.map((item) => (
                        <div key={item.title} className="border rounded-xl p-5 bg-white">
                            <h3 className="font-semibold mb-1.5">{item.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="container-sm my-10">
                <h2 className="text-2xl font-bold mb-8">How it works</h2>
                <div className="flex flex-col gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="flex gap-5">
                            <span className="text-3xl font-bold text-muted-foreground/25 leading-none shrink-0 w-10">{step.number}</span>
                            <div>
                                <h3 className="font-semibold mb-1">{step.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="container-sm my-10 bg-muted/60 border border-dashed rounded-xl">
                <CtaSection className="p-6 sm:justify-start" />
            </section>
        </>
    );
}

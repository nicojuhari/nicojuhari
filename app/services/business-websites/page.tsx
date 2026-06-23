import type { Metadata } from "next";
import { Check } from "lucide-react";
import ContactForm from "../../_components/contact-form";
import CtaSection from "../../_components/cta-section";
import { serviceSchema, breadcrumbSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Business Website Design for Local Companies | Nicojuhari",
    description:
        "Clean, fast websites for local and service businesses - built to rank in search, load fast on mobile, and turn visitors into bookings, calls, and sales.",
    alternates: { canonical: "https://nicojuhari.com/services/business-websites" },
};

const forYouIf = [
    "You don't have a website, or the one you have looks outdated and you're embarrassed to share it",
    "When people search for what you offer locally, they find your competitors instead",
    "Your site gets visitors, but not enough of them call, book, or reach out",
    "Your online presence doesn't reflect the quality of your actual service",
    "You're opening a new location, rebranding, or launching something new",
    "You want a site that actually brings in leads - not just sits there",
];

const deliverables = [
    {
        title: "Business website design & redesign",
        description: "A clean, modern design built to convert visitors - not just look good. Every layout decision has a reason.",
    },
    {
        title: "Google Business Profile optimization",
        description: "Show up in local search and on Google Maps when people look for what you offer nearby.",
    },
    {
        title: "Local SEO setup",
        description: "Target the searches that actually bring customers to you - not just generic traffic that never converts.",
    },
    {
        title: "Booking & scheduling integrations",
        description: "Connect Calendly, Cal.com, or your booking system so visitors can book directly from your site without friction.",
    },
    {
        title: "Analytics & conversion tracking",
        description:
            "Google Analytics, Tag Manager, and event tracking set up properly - so you know where leads come from and what's working.",
    },
    {
        title: "Mobile-first, fast-loading pages",
        description: "Most visitors are on mobile. Every page loads fast and works perfectly on any screen, every time.",
    },
];

const steps = [
    {
        number: "01",
        title: "Discovery",
        description:
            "I learn what your business does, who your customers are, and what you want the site to actually achieve - not just look like.",
    },
    {
        number: "02",
        title: "Design",
        description:
            "A round of mockups for your feedback before a single line of code is written. You know what you're getting before it's built.",
    },
    {
        number: "03",
        title: "Build",
        description:
            "Responsive, fast, and tested across devices and browsers. Built with performance and search visibility in mind from the start.",
    },
    {
        number: "04",
        title: "Launch",
        description: "Go live with search engine submission, analytics in place, and a site that's ready to work - not just sit there.",
    },
];

export default function BusinessWebsitesPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        serviceSchema(
                            "Business Website Design",
                            "Clean, fast websites for local and service businesses - built to rank in search, load fast on mobile, and turn visitors into bookings, calls, and sales.",
                            "/services/business-websites"
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
                            { name: "Business Websites", path: "/services/business-websites" },
                        ])
                    ),
                }}
            />
            <section className="container-sm my-10">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">Service</p>
                <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">Websites that bring in customers.</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                    A good website isn&apos;t just online presence - it&apos;s your hardest-working salesperson. It shows up in search,
                    loads fast on mobile, and makes it easy for people to take the next step.
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

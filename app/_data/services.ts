export type ServiceSlug = "business-websites" | "shopify-stores" | "custom-web-apps";

type Item = { title: string; description: string };

export type Service = {
    slug: ServiceSlug;
    href: string;
    /** Short mark used in the "Other services" cards */
    mark: string;
    accent: string;
    tint: string;
    label: string;
    title: string;
    /** Singular name used in the chooser, e.g. "Business Website" */
    singular: string;
    tagline: string;
    /** Services hub card */
    summary: string;
    goodFit: string[];
    included: string[];
    /** Detail page */
    headline: string;
    intro: string;
    forYouIf: string[];
    buildTitle: string;
    buildIntro: string;
    build: Item[];
    steps: Item[];
    cta: string;
};

export const services: Service[] = [
    {
        slug: "business-websites",
        href: "/services/business-websites",
        mark: "W",
        accent: "#16284D",
        tint: "#EEF1F7",
        label: "For local & service businesses",
        title: "Business Websites",
        singular: "Business Website",
        tagline: "Show up. Get found. Turn visitors into customers.",
        summary:
            "A good business website works like a salesperson - ranking in search, loading fast on mobile, and making it easy for people to reach out, book or buy.",
        goodFit: [
            "You don’t have a website yet, or yours looks outdated",
            "Local searches find your competitors first",
            "Visitors come to your site but don’t reach out",
            "You’re opening a new location or rebranding",
        ],
        included: [
            "Website design & development",
            "Local SEO setup",
            "Google Business Profile",
            "Booking & scheduling",
            "Analytics & conversion tracking",
            "Mobile-first, fast pages",
        ],
        headline: "Websites that bring in customers.",
        intro: "A good website works like your hardest-working salesperson. It shows up in search, loads fast on mobile, and makes it easy for people to call, book or buy.",
        forYouIf: [
            "You don’t have a website yet, or the one you have looks outdated",
            "When people search locally for what you offer, they find competitors first",
            "Your site gets visitors, but not enough of them call, book or reach out",
            "Your online presence doesn’t reflect the quality of your service",
            "You’re opening a new location, rebranding or launching something new",
            "You want a site that brings in leads, not one that just sits there",
        ],
        buildTitle: "What the work typically covers",
        buildIntro: "Depending on your needs, a project includes some or all of these.",
        build: [
            {
                title: "Website design & redesign",
                description: "A clean, modern design built to turn visitors into enquiries. Every layout decision has a reason.",
            },
            {
                title: "Google Business Profile",
                description: "Show up in local search and on Google Maps when people look for what you offer nearby.",
            },
            {
                title: "Local SEO setup",
                description: "Target the searches that bring customers to you - not generic traffic that never converts.",
            },
            {
                title: "Booking & scheduling",
                description: "Connect Calendly, Cal.com or your booking system so visitors book straight from your site.",
            },
            {
                title: "Analytics & conversion tracking",
                description: "Google Analytics, Tag Manager and event tracking - so you know where leads come from.",
            },
            {
                title: "Mobile-first, fast pages",
                description: "Most visitors are on a phone. Every page loads fast and works on any screen.",
            },
        ],
        steps: [
            {
                title: "Discovery",
                description: "I learn what your business does, who your customers are and what the site needs to achieve.",
            },
            {
                title: "Design",
                description: "Mockups for your feedback before any code is written. You see what you get before it’s built.",
            },
            {
                title: "Build",
                description: "Responsive, fast and tested across devices - built with search visibility in mind from the start.",
            },
            {
                title: "Launch",
                description: "Go live with search engine submission and analytics in place, ready to bring in enquiries.",
            },
        ],
        cta: "Tell me about your business and what you want the site to do. We’ll figure out the rest from there.",
    },
    {
        slug: "shopify-stores",
        href: "/services/shopify-stores",
        mark: "S",
        accent: "#A63D6E",
        tint: "#FBEFF4",
        label: "For online sellers & brands",
        title: "Shopify Stores",
        singular: "Shopify Store",
        tagline: "A store built to sell - set up right from day one.",
        summary:
            "Getting a Shopify store live is the easy part. Getting it to convert, keep customers and run smoothly without eating your time is where the work is.",
        goodFit: [
            "You want to sell online but don’t know where to start",
            "Your store doesn’t convert or looks outdated",
            "You have no email flows set up yet",
            "You’re moving from another platform",
        ],
        included: [
            "Full Shopify store setup",
            "Product pages & collections",
            "Klaviyo email flows",
            "Shipping & fulfillment",
            "Reviews with Judge.me or Okendo",
            "Theme & app configuration",
        ],
        headline: "A store built to sell.",
        intro: "Set up right, easy to manage and built to grow. Whether you’re starting from scratch or improving what you have, the goal is a store customers trust and come back to.",
        forYouIf: [
            "You want to sell online but don’t know where to start",
            "Your current store looks outdated or isn’t turning visitors into buyers",
            "You’re moving from another platform and need a clean Shopify setup",
            "You have no post-purchase email flow yet",
            "Running your store takes too much time and you want it to run smoother",
            "You want a store you’re proud to send customers to",
        ],
        buildTitle: "What the work typically covers",
        buildIntro: "Depending on your needs, a project includes some or all of these.",
        build: [
            {
                title: "Full Shopify store setup",
                description: "Theme, store settings, payments and tax configured right from the start.",
            },
            {
                title: "Product pages & collections",
                description: "Clear product pages and collections that are easy to browse and built to convert.",
            },
            {
                title: "Klaviyo email marketing",
                description: "Welcome, abandoned-cart and post-purchase flows set up and running.",
            },
            {
                title: "Shipping & fulfillment",
                description: "Connect Shippo, ShipStation or your carrier. Automate labels, tracking and notifications.",
            },
            {
                title: "Reviews & social proof",
                description: "Judge.me or Okendo set up to collect and show reviews automatically.",
            },
            {
                title: "Theme & app configuration",
                description: "Apps chosen and configured to fit your workflow - no bloat slowing the store down.",
            },
        ],
        steps: [
            {
                title: "Discovery",
                description: "I learn about your products, your customers and what success looks like for the store.",
            },
            {
                title: "Design & structure",
                description: "Theme, layout and collection structure mapped out first. You approve the direction.",
            },
            {
                title: "Build & configure",
                description: "Store setup, product import, apps and email flows built and tested end to end.",
            },
            {
                title: "Launch",
                description: "Domain connected, analytics in place, and a store ready to take orders from day one.",
            },
        ],
        cta: "Tell me about your products and what you want the store to do. We’ll figure out the rest from there.",
    },
    {
        slug: "custom-web-apps",
        href: "/services/custom-web-apps",
        mark: "A",
        accent: "#127A6F",
        tint: "#E9F5F3",
        label: "For teams & growing businesses",
        title: "Custom Web Apps",
        singular: "Custom Web App",
        tagline: "Software built around your process.",
        summary:
            "When off-the-shelf tools stop fitting, custom software gives your team exactly what it needs - dashboards, automations, approvals, payments and AI.",
        goodFit: [
            "Business data lives in spreadsheets that have grown too complex",
            "Your team switches between tools that don’t connect",
            "A manual process takes hours every week",
            "You need payments, location or AI built in",
        ],
        included: [
            "Dashboards & internal tools",
            "Business process automation",
            "Workflow & approval systems",
            "Stripe payments & subscriptions",
            "GPS & location features",
            "AI integrations (OpenAI, Claude)",
        ],
        headline: "Software built around your process.",
        intro: "When off-the-shelf tools stop fitting, custom software gives your team exactly what it needs - dashboards, automations, approvals and payments, built around how you already work.",
        forYouIf: [
            "Important business data lives in spreadsheets that have grown too complex",
            "Your team switches between 4–5 tools that don’t talk to each other",
            "A manual process takes hours of your team’s time every week",
            "You need a dashboard, admin panel or reporting tool that fits how you work",
            "You’re building a fintech product, financial tool or calculator",
            "You need payments, location tracking or AI built into your product",
        ],
        buildTitle: "The most common types of work",
        buildIntro: "Every project is different - these are the pieces teams ask for most.",
        build: [
            {
                title: "Dashboards & internal tools",
                description:
                    "Real-time data views, KPI tracking and admin panels your team can actually use - built around your data.",
            },
            {
                title: "Business process automation",
                description: "Replace repetitive manual steps with automated workflows. Less clicking, fewer errors.",
            },
            {
                title: "Workflow & approval systems",
                description: "Multi-step approvals, task assignment and status tracking built for how your team operates.",
            },
            {
                title: "Stripe payments & subscriptions",
                description: "One-time payments, recurring billing, invoicing and subscriptions - built in, not bolted on.",
            },
            {
                title: "GPS tracking & location",
                description: "Delivery tracking, fleet management and geofencing with Google Maps or Radar.",
            },
            {
                title: "Third-party integrations",
                description: "Connect CRMs, ERPs, payment providers or any external service so your tools work together.",
            },
            {
                title: "Notifications & messaging",
                description: "SMS via Twilio, email via Resend and in-app alerts - the right update to the right person.",
            },
            {
                title: "AI integrations",
                description: "OpenAI or Claude in your workflow: document analysis, smart search, content generation.",
            },
            {
                title: "Reporting & fintech tools",
                description: "Custom reports, exports, loan calculators and investment trackers built to your exact logic.",
            },
        ],
        steps: [
            {
                title: "Discovery call",
                description:
                    "You explain the problem. I ask questions until I understand the process, the people and what success looks like.",
            },
            {
                title: "Scope & proposal",
                description: "A clear breakdown of what gets built, the timeline and the price. No hourly billing.",
            },
            {
                title: "Build",
                description:
                    "Regular updates so you see progress and give feedback at any stage. Nothing ships without your sign-off.",
            },
            {
                title: "Launch & handover",
                description: "Deployed, documented and yours to own. I can stay on for support or hand it off clean.",
            },
        ],
        cta: "Tell me about the problem you’re solving. We’ll figure out whether a custom app is the right move.",
    },
];

export function getService(slug: ServiceSlug): Service {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`Unknown service: ${slug}`);
    return service;
}

export const WHATSAPP_URL = "https://wa.me/+4369010196811";

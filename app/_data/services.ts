export type ServiceSlug = "local-business-websites" | "shopify-stores" | "custom-web-apps";

type Item = { title: string; description: string };

/** A real result from a business I run */
export type Proof = { stat: string; title: string; text: string; href?: string; linkLabel?: string };

export type Service = {
    slug: ServiceSlug;
    href: string;
    /** Short mark used in the "Other services" cards */
    mark: string;
    accent: string;
    tint: string;
    label: string;
    title: string;
    /** Singular name used in the chooser, e.g. "Local Business Website" */
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
    /** Omit when there is nothing public to show */
    proof?: Proof;
    steps: Item[];
    cta: string;
    /** Common questions - only facts stated elsewhere on the page */
    faq?: { question: string; answer: string }[];
};

export const services: Service[] = [
    {
        slug: "local-business-websites",
        href: "/services/local-business-websites",
        mark: "L",
        accent: "#16284D",
        tint: "#EEF1F7",
        label: "For trades, clinics, salons & local services",
        title: "Local Business Websites",
        singular: "Local Business Website",
        tagline: "More calls and bookings from Google and Maps.",
        summary:
            "When people nearby search for what you do, they should find you and call you. I build your website and your Google Maps profile to make that happen.",
        goodFit: [
            "People nearby find your competitors first",
            "Your site gets visitors, but few of them call",
            "Your Google Maps profile is empty or out of date",
            "You don’t have a website yet",
        ],
        included: [
            "Website design & build",
            "Google Business Profile",
            "A page for each service & area",
            "Call, WhatsApp & booking buttons",
            "Call & booking tracking",
            "Updates after launch",
        ],
        headline: "Get more calls from Google and Maps.",
        intro: "When someone nearby searches for what you do, they should find you first. I build your website and Google Business Profile so more of those searches turn into calls and bookings.",
        forYouIf: [
            "People search for your service nearby and find competitors first",
            "Your site gets visitors, but not many of them call or book",
            "Your Google Maps profile is empty, half done or out of date",
            "You don’t have a website yet, or it hasn’t changed in years",
            "You offer several services, but have one page for all of them",
            "You don’t know how many clients come from your website",
        ],
        buildTitle: "What you get",
        buildIntro: "Your website and your Google Maps profile, built to work together.",
        build: [
            {
                title: "Found on Google Maps",
                description: "Your Google Business Profile set up with the right services, photos and categories.",
            },
            {
                title: "Found for every service",
                description: "A page for each service and each area you cover, so you show up in more searches.",
            },
            {
                title: "Easy to call or book",
                description: "Call, WhatsApp and booking buttons on every page, easy to tap on a phone.",
            },
            {
                title: "A site people trust",
                description: "Clear pages with your services, real photos and your contact details where people look for them.",
            },
            {
                title: "Know where clients come from",
                description: "See how many calls, messages and bookings the website brings in each month.",
            },
            {
                title: "Better every week",
                description: "New pages, texts and photos after launch, so the site keeps bringing in clients.",
            },
        ],
        proof: {
            stat: "95%+",
            title: "of clients come from the website and Google Maps",
            text: "That’s the result for a local services business I co-own. I built its website and still improve it every week.",
            href: "https://handwerker-netz.at",
            linkLabel: "See handwerker-netz.at",
        },
        steps: [
            {
                title: "First call",
                description: "You tell me what you offer, where you work, and which jobs you want more of.",
            },
            {
                title: "Design",
                description: "You see the page layout and design before I build anything.",
            },
            {
                title: "Build",
                description: "I build the website and set up your Google Maps profile. Tested on phones.",
            },
            {
                title: "Launch & improve",
                description: "The site goes live with call tracking. Then I keep improving it, if you want.",
            },
        ],
        cta: "Tell me what you offer and where you work. I’ll tell you what I’d change first.",
        faq: [
            {
                question: "Do I need a website if I have a Google Maps profile?",
                answer: "The profile helps people find you. The website is where they check your services before they call. You get more calls with both.",
            },
            {
                question: "Can you keep improving the site after launch?",
                answer: "Yes. I can add pages and update texts and photos every week. You can pay a monthly fee, or a share of the new clients the site brings in.",
            },
            {
                question: "Who owns the website?",
                answer: "You do - the domain, the website and the Google Business Profile.",
            },
        ],
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
        tagline: "More sales from the visitors you already have.",
        summary:
            "More sales don’t always need more visitors. They need clear product pages, an easy checkout and emails that bring buyers back. I set this up and keep improving it.",
        goodFit: [
            "Your store gets visitors, but not enough sales",
            "Your store looks dated or is hard to manage",
            "You don’t send any automatic emails yet",
            "You want to start selling online",
        ],
        included: [
            "Shopify store setup",
            "Product pages & collections",
            "Klaviyo emails",
            "Shipping & tracking",
            "Reviews",
            "Updates after launch",
        ],
        headline: "A Shopify store that sells more.",
        intro: "Clear product pages, an easy checkout, and emails that bring buyers back. I build your store or fix the one you have - and keep improving it after launch.",
        forYouIf: [
            "Your store gets visitors, but not enough of them buy",
            "Your store looks dated or takes too long to manage",
            "You don’t send welcome, abandoned-cart or after-purchase emails",
            "You’re moving to Shopify from another platform",
            "You want to start selling online and set it up right",
            "You want someone to keep improving the store after launch",
        ],
        buildTitle: "What you get",
        buildIntro: "Depending on your store, some or all of these.",
        build: [
            {
                title: "Product pages that sell",
                description: "Clear photos, text and prices that answer buyers’ questions, so more visitors buy.",
            },
            {
                title: "Emails that bring buyers back",
                description: "Welcome, abandoned-cart and after-purchase emails with Klaviyo. They send on their own.",
            },
            {
                title: "Reviews on every product",
                description: "Judge.me or Okendo collects reviews and shows them automatically.",
            },
            {
                title: "Shipping without the busywork",
                description: "Labels, tracking and customer updates with Shippo, ShipStation or your carrier.",
            },
            {
                title: "A fast, simple store",
                description: "Only the apps you need, so the store loads fast and is easy to manage.",
            },
            {
                title: "Better every month",
                description: "After launch, I look at the sales numbers and fix what isn’t working.",
            },
        ],
        steps: [
            {
                title: "First call",
                description: "You tell me about your products, your customers and how the store sells today.",
            },
            {
                title: "Plan & design",
                description: "You see the layout and the structure of the store before I build it.",
            },
            {
                title: "Build",
                description: "Store setup, products, apps and emails - all tested before launch.",
            },
            {
                title: "Launch & improve",
                description: "The store goes live with sales tracking. Then I keep improving it, if you want.",
            },
        ],
        cta: "Tell me about your store and how it sells today. I’ll tell you where I’d start.",
        faq: [
            {
                question: "Can you improve my existing store?",
                answer: "Yes. I can redesign it, fix product pages, set up emails and reviews - without starting over.",
            },
            {
                question: "Can you keep working on the store after launch?",
                answer: "Yes, every month. You can pay a monthly fee, or a share of your online sales.",
            },
            {
                question: "Who owns the store?",
                answer: "You do - the Shopify account, the theme, the apps and the customer data.",
            },
        ],
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
        tagline: "Less manual work. Clear numbers.",
        summary:
            "When your business runs on spreadsheets and separate tools, a custom app puts it all in one place. Your team saves time, makes fewer mistakes, and you see your numbers any time.",
        goodFit: [
            "Several people edit the same spreadsheets",
            "Your tools don’t connect to each other",
            "The same manual task takes hours every week",
            "You wait for reports to see your numbers",
        ],
        included: [
            "Dashboards & reports",
            "Automation & approvals",
            "Stripe payments",
            "Connections to your tools",
            "AI features (OpenAI, Claude)",
            "Finance tools & calculators",
        ],
        headline: "Less manual work. Clear numbers.",
        intro: "A custom app puts your team’s work in one place. Less copying between tools, fewer mistakes, and your numbers on one screen whenever you need them.",
        forYouIf: [
            "Several people edit the same spreadsheets to run the business",
            "Your team switches between tools that don’t connect",
            "The same manual task takes hours every week",
            "You wait for someone to build a report before you see your numbers",
            "You need a finance tool, calculator or tracker built to your rules",
            "You want someone who keeps the app up to date after launch",
        ],
        buildTitle: "What you get",
        buildIntro: "Every business is different. These are the things teams ask for most.",
        build: [
            {
                title: "Your numbers on one screen",
                description: "Dashboards and reports that update on their own. No waiting for someone to build them.",
            },
            {
                title: "Less repeated work",
                description: "Automatic steps and approvals instead of copying data by hand.",
            },
            {
                title: "Payments in the app",
                description: "One-time payments, subscriptions and invoices with Stripe.",
            },
            {
                title: "Your tools connected",
                description: "Your CRM, email, SMS and payment tools share data, so nothing gets typed twice.",
            },
            {
                title: "AI that saves time",
                description: "OpenAI or Claude to read documents, search your data or draft texts.",
            },
            {
                title: "Finance tools",
                description: "Loan calculators, trackers and reports built to your exact rules.",
            },
        ],
        proof: {
            stat: "Every day",
            title: "a lending company runs on a system I built",
            text: "I co-founded a consumer credit company and built the internal system its daily work runs on. My own business runs on Simple Trackr, another app I built.",
            href: "/projects",
            linkLabel: "See my projects",
        },
        steps: [
            {
                title: "First call",
                description: "You explain the problem. I ask questions until I understand how the work is done today.",
            },
            {
                title: "Plan & price",
                description: "You get a clear list of what I’ll build, the timeline and a fixed price.",
            },
            {
                title: "Build",
                description: "You see progress every week and can give feedback at any time.",
            },
            {
                title: "Launch & improve",
                description: "The app goes live and it’s yours. Then I keep improving it, if you want.",
            },
        ],
        cta: "Tell me which task takes your team the most time. We’ll see if an app is the right fix.",
        faq: [
            {
                question: "When is a custom app better than a spreadsheet or a no-code tool?",
                answer: "When several people work on the same data and need approvals, history or permissions. If a spreadsheet or an existing tool still does the job, I’ll tell you.",
            },
            {
                question: "How is the price set?",
                answer: "After the first call you get a clear list of what I’ll build, the timeline and a fixed price. No hourly billing.",
            },
            {
                question: "Can it connect to the tools we already use?",
                answer: "Yes - CRMs, payment providers like Stripe, email and SMS services, or any tool with an API.",
            },
            {
                question: "Can you keep improving the app after launch?",
                answer: "Yes, with a monthly plan. If the app earns money directly, part of the pay can be a share of that instead.",
            },
            {
                question: "Who owns the app?",
                answer: "You do. The code and the data are yours.",
            },
        ],
    },
];

export function getService(slug: ServiceSlug): Service {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`Unknown service: ${slug}`);
    return service;
}

export const WHATSAPP_URL = "https://wa.me/+4369010196811";

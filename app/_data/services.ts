export type ServiceSlug = "local-business-websites" | "shopify-stores" | "custom-web-apps";

type Item = { title: string; description: string };

/** A real result from a business I run */
export type Proof = { stat: string; title: string; text: string; href?: string; linkLabel?: string };

/** The small first step before any build. `id` is the page anchor outreach emails link to */
export type FirstStep = {
    id: string;
    title: string;
    /** Card line on home and the services hub, e.g. "Starts with a store check" */
    startsWith: string;
    intro: string;
    /** Cost in words - no price numbers on the site */
    cost: string;
    items: string[];
    cta: string;
    /** Prefilled WhatsApp message */
    whatsappText: string;
};

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
    firstStep?: FirstStep;
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
            "When people nearby search for what you do, they should find you and call you. I build your website and your Google Maps profile to make that happen, then keep improving both every month.",
        goodFit: [
            "People nearby find your competitors first",
            "Your site gets visitors, but few of them call",
            "Your Google Maps profile is empty or out of date",
            "You don’t have a website yet",
        ],
        included: [
            "Free Google check",
            "Website design & build",
            "Google Business Profile",
            "A page for each service & area",
            "Review requests",
            "Monthly count of calls & requests",
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
        firstStep: {
            id: "google-check",
            title: "Free Google check",
            startsWith: "Starts with a free Google check",
            intro: "I look at what people see when they search for your service nearby. You get a short, clear answer.",
            cost: "Free. No obligation.",
            items: [
                "Your Google Maps listing: what’s missing or out of date",
                "Your website on a phone: how easy it is to call you",
                "What nearby competitors do better",
                "The one or two things I’d change first",
                "Sent as 3 screenshots or a 2-minute video",
            ],
            cta: "Ask for a free Google check",
            whatsappText: "Hi Nick, I’d like a free Google check. My business name and city: ",
        },
        buildTitle: "What you get",
        buildIntro: "Your website and your Google Maps profile, built to work together.",
        build: [
            {
                title: "Found on Google Maps",
                description: "Your Google Business Profile set up with the right categories, services and photos. The same name, address and phone everywhere you’re listed.",
            },
            {
                title: "Found for every service",
                description: "A page for each service and area you cover, written so Google and AI search tools understand what you offer.",
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
                description: "Each month you see how many calls and form requests came from the website.",
            },
            {
                title: "Better every month",
                description: "Profile posts, review requests and new pages after launch, so the site keeps bringing in clients.",
            },
        ],
        proof: {
            stat: "95%+",
            title: "of clients come from the website and Google Maps",
            text: "That’s the result for a local services business I founded. I built its website and still improve it every week.",
            href: "https://handwerker-netz.at",
            linkLabel: "See handwerker-netz.at",
        },
        steps: [
            {
                title: "Free Google check",
                description: "I show you how you look on Google and Maps, and what I’d change first.",
            },
            {
                title: "Website build",
                description: "A fast site with a page for each service and area, and your Google profile set up. Fixed price.",
            },
            {
                title: "Monthly plan",
                description: "Profile posts, review requests and new pages. Each month you see how many calls the site brought in.",
            },
        ],
        cta: "Send me your business name and city. I’ll send you a free Google check.",
        faq: [
            {
                question: "Do I need a website if I have a Google Maps profile?",
                answer: "The profile helps people find you. The website is where they check your services before they call. You get more calls with both.",
            },
            {
                question: "How soon will I get more calls?",
                answer: "Fixes to your Google profile can show within a few weeks. New pages usually take a few months to show up in search. It depends on your area and how many competitors you have.",
            },
            {
                question: "What’s in the monthly plan?",
                answer: "Google profile posts, review requests, new service or area pages, and small fixes. Each month you get a count of the calls and form requests the website brought in.",
            },
            {
                question: "What does it cost?",
                answer: "The Google check is free. The website is a fixed price, agreed before I start, with 50% upfront. The monthly plan is a fixed monthly fee. No hourly billing.",
            },
            {
                question: "Do you work outside Vienna?",
                answer: "Yes. I work with businesses across Austria, in Romania and Moldova, and with English-speaking clients anywhere. We talk on WhatsApp or Google Meet.",
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
        label: "For online stores that already get traffic",
        title: "Shopify Stores",
        singular: "Shopify Store",
        tagline: "More sales from the visitors you already have.",
        summary:
            "Your store gets visitors, but not enough of them buy. I find where buyers drop off, fix the biggest problems, and check the numbers after.",
        goodFit: [
            "You pay for ads, but the store doesn’t pay them back",
            "Your store gets visitors, but few of them buy",
            "You don’t know where buyers drop off",
            "You don’t send abandoned-cart emails yet",
        ],
        included: [
            "Store check",
            "Product page & checkout fixes",
            "Landing pages for ads",
            "Klaviyo email flows",
            "Speed fixes",
            "Monthly results note",
        ],
        headline: "More sales from the visitors you already pay for.",
        intro: "You pay for ads or get traffic, but few people buy. I check your store, fix the biggest problems, and look at the numbers again after 14 days.",
        forYouIf: [
            "You run Meta or Google ads, but the store doesn’t pay them back",
            "Your store gets visitors, but not enough of them buy",
            "You don’t know where buyers drop off",
            "Your ads person says the store is the problem",
            "You don’t send abandoned-cart or after-purchase emails",
            "You want someone to keep improving the store every month",
        ],
        firstStep: {
            id: "store-check",
            title: "Store check",
            startsWith: "Starts with a store check",
            intro: "Before I change anything, I find out where buyers drop off and why. You get a clear list of what to fix first.",
            cost: "Fixed price, agreed before I start. Credited toward the fixes if you go ahead.",
            items: [
                "Your sales funnel: visits, add to cart, checkout, orders",
                "Where your traffic comes from, and which visitors buy",
                "A test purchase on a phone, step by step",
                "A comparison with 3 competitors",
                "A written list of fixes, most important first",
                "A 10-minute video that walks you through it",
            ],
            cta: "Ask for a store check",
            whatsappText: "Hi Nick, I’d like a store check. My store: ",
        },
        buildTitle: "What I fix most often",
        buildIntro: "Every store is different. The store check shows which of these matter for yours.",
        build: [
            {
                title: "Product pages",
                description: "Photos, text, prices and shipping info that answer buyers’ questions before they leave.",
            },
            {
                title: "Mobile checkout",
                description: "Fewer steps and no surprises at the end, like shipping costs shown too late.",
            },
            {
                title: "Landing pages for ads",
                description: "A page that matches the ad, so people who click see what they came for.",
            },
            {
                title: "Emails that bring buyers back",
                description: "Welcome, abandoned-cart and after-purchase emails with Klaviyo. They send on their own.",
            },
            {
                title: "Reviews and trust",
                description: "Product reviews, clear returns and contact details, so new buyers trust the store.",
            },
            {
                title: "Speed",
                description: "Fewer apps and lighter pages, so the store loads fast on a phone.",
            },
        ],
        steps: [
            {
                title: "Store check",
                description: "I find where buyers drop off and send you a list of fixes, most important first.",
            },
            {
                title: "Fixes",
                description: "I make the top fixes for a fixed price. After 14 days of new traffic, we compare the numbers.",
            },
            {
                title: "Monthly plan",
                description: "New tests, ad landing pages, emails and speed work. Each month you get a one-page note with the results.",
            },
        ],
        cta: "Send me your store link. I’ll reply within 24 hours with the first things I noticed.",
        faq: [
            {
                question: "My store gets traffic but no sales. Where do you start?",
                answer: "With the numbers. I look at where people leave: the product page, the cart or the checkout. Then I make a test purchase on a phone. The cause is usually in one of those places.",
            },
            {
                question: "Do I need a new store?",
                answer: "Usually not. Most problems can be fixed in the store you have. I suggest a new store only when the current one can’t be fixed.",
            },
            {
                question: "Why fix the store before spending more on ads?",
                answer: "At a 0.25% conversion rate, you need 400 paid clicks for one order. At 1%, you need 100. The same ad budget brings four times the orders.",
            },
            {
                question: "How do we know if it worked?",
                answer: "We write down your numbers before I change anything. After 14 days of new traffic, we compare them. If your traffic is low, it takes longer to see a clear result.",
            },
            {
                question: "Do you run my ads?",
                answer: "No. I work on the store. If someone runs your ads, I work with them.",
            },
            {
                question: "What does it cost?",
                answer: "Every step has a fixed price, agreed before I start, with 50% upfront. The store check is credited toward the fixes. No hourly billing. If I can see your sales and ad data, part of the monthly fee can be a share of the extra sales instead.",
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
        label: "For businesses with repeat manual work",
        title: "Custom Web Apps & Automations",
        singular: "Custom Web App",
        tagline: "Less manual work. Clear numbers.",
        summary:
            "When the same task takes hours every week, an app or automation can do most of it. First I check how much time the task costs you. Then you decide if it’s worth building.",
        goodFit: [
            "Several people edit the same spreadsheets",
            "Your tools don’t connect to each other",
            "The same manual task takes hours every week",
            "You wait for reports to see your numbers",
        ],
        included: [
            "Process check",
            "Dashboards & reports",
            "Automations",
            "Connections to your tools",
            "AI features (OpenAI, Claude)",
            "Finance tools & calculators",
        ],
        headline: "Less manual work. Clear numbers.",
        intro: "An app or automation takes repeat work off your team. Before I build anything, I check how many hours the task costs you, so you can decide if it’s worth it.",
        forYouIf: [
            "Several people edit the same spreadsheets to run the business",
            "Your team switches between tools that don’t connect",
            "The same manual task takes hours every week",
            "You wait for someone to build a report before you see your numbers",
            "You need a finance tool, calculator or tracker built to your rules",
            "You want someone who keeps the app up to date after launch",
        ],
        firstStep: {
            id: "process-check",
            title: "Process check",
            startsWith: "Starts with a process check",
            intro: "We pick one manual task. I map how it’s done today and estimate the hours it costs you each month. Then you decide.",
            cost: "Fixed price, agreed before I start.",
            items: [
                "A call where you show me how the task is done today",
                "A simple map of the steps, who does them and where the data goes",
                "An estimate of the hours the task costs each month",
                "What can be automated, and what should stay manual",
                "A rough price and timeline for the build",
            ],
            cta: "Ask for a process check",
            whatsappText: "Hi Nick, I’d like a process check. The task that takes us the most time: ",
        },
        buildTitle: "Examples",
        buildIntro: "Every business is different. These are the things businesses ask for most.",
        build: [
            {
                title: "Orders to invoices",
                description: "New orders turn into invoices on their own. No copying between tools.",
            },
            {
                title: "Inquiries to WhatsApp",
                description: "A website inquiry lands in WhatsApp with the details filled in, so you can reply faster.",
            },
            {
                title: "Your numbers on one screen",
                description: "A dashboard that updates on its own, and a weekly report in your inbox.",
            },
            {
                title: "Payments in the app",
                description: "One-time payments, subscriptions and invoices with Stripe.",
            },
            {
                title: "AI that sorts and drafts",
                description: "OpenAI or Claude reads documents, sorts requests or drafts replies. You check before anything is sent.",
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
                title: "Process check",
                description: "I map one task and estimate the hours it costs you each month.",
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
                title: "Support plan",
                description: "Hosting, fixes and small improvements each month, if you want them.",
            },
        ],
        cta: "Tell me which task takes your team the most time. I’ll tell you if an app is the right fix.",
        faq: [
            {
                question: "When is a custom app better than a spreadsheet or a no-code tool?",
                answer: "When several people work on the same data and need approvals, history or permissions. If a spreadsheet or an existing tool still does the job, I’ll tell you.",
            },
            {
                question: "What does it cost?",
                answer: "The process check is a fixed price. After it, you get a list of what I’ll build, the timeline and a fixed price, with 50% upfront. No hourly billing.",
            },
            {
                question: "Can it connect to the tools we already use?",
                answer: "Yes - CRMs, payment providers like Stripe, email and SMS services, or any tool with an API.",
            },
            {
                question: "Can you keep improving the app after launch?",
                answer: "Yes, with a support plan: hosting, fixes and small improvements each month. If the app earns money directly, part of the pay can be a share of that instead.",
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

export const WHATSAPP_URL = "https://wa.me/4369010196811";

/** WhatsApp link with an optional prefilled message */
export function whatsappLink(text?: string): string {
    return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}

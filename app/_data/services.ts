export type ServiceSlug = "local-business-websites" | "custom-web-apps";

type Item = { title: string; description: string };

/** A problem the owner usually can't see, how I find it and how I fix it */
export type HiddenProblem = { title: string; cost: string; check: string; fix: string };

/** The easiest way to start: send a link, get a free first look */
export type SendLink = {
    /** Button label, e.g. "Send your store link" */
    label: string;
    /** What happens after, shown next to the button */
    note: string;
    /** Prefilled WhatsApp message */
    whatsappText: string;
};

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
    send: SendLink;
    hiddenTitle: string;
    hiddenIntro: string;
    hidden: HiddenProblem[];
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
        tagline: "More calls and bookings from Google search and Google Maps.",
        summary:
            "When people nearby search for your service, they should find you and call you. I build your website and Google Maps profile for that, and improve both every month.",
        goodFit: [
            "People nearby find your competitors first",
            "Your site gets visitors, but few of them call",
            "Your Google Maps profile is empty or out of date",
            "You don’t have a website yet",
        ],
        included: [
            "Free Google check",
            "Website design & build",
            "Google Business Profile & SEO",
            "A page for each service & area",
            "Landing pages for ads (funnels)",
            "Fixes that turn visitors into customers (CRO)",
            "Fast replies & follow-up",
            "Review requests",
            "Tracking calls, requests & sales",
            "Shopify stores too",
        ],
        headline: "Websites that bring customers.",
        intro: "More calls and booked jobs from Google search and Google Maps. When someone nearby searches for your service, they should find you first, call you, and book. Your website, Google Maps profile and replies work together to make that happen.",
        forYouIf: [
            "People nearby search for your service and find your competitors first",
            "Your site gets visitors, but not many of them call or book",
            "Your Google Maps profile is empty, half done or out of date",
            "You don’t have a website yet, or it hasn’t changed in years",
            "You offer several services, but have one page for all of them",
            "You don’t know how many clients come from your website",
        ],
        send: {
            label: "Send your business name",
            note: "Free. I reply within 24 hours with what I found.",
            whatsappText: "Hi Nick, please check my business on Google. Name and city: ",
        },
        hiddenTitle: "Why people don’t call you",
        hiddenIntro: "These are hard to see from your side. I find them by searching and testing like a customer.",
        hidden: [
            {
                title: "People can’t find you nearby",
                cost: "They search for your service, see your competitors, and call them. You never know they searched.",
                check: "I search for your service in your area on a phone, like a new customer.",
                fix: "The right categories and services on your Google profile, and a page for each service.",
            },
            {
                title: "Requests don’t reach you",
                cost: "Form messages land in spam or an old inbox. A client waits, then picks someone else.",
                check: "I send a test request from your site and see where it lands.",
                fix: "Forms that reach your phone, with WhatsApp as a second way in.",
            },
            {
                title: "Calling you is hard on a phone",
                cost: "The number is small, the button doesn’t work, or it’s hidden at the bottom. People give up.",
                check: "I try to call, write on WhatsApp and book from your site on a phone.",
                fix: "Clear call and WhatsApp buttons on every page, easy to tap.",
            },
            {
                title: "Old details online",
                cost: "A different phone or old opening hours on one site. People call a dead number or think you’re closed.",
                check: "I compare your details on Google, your website and business directories.",
                fix: "The same name, address, phone and hours everywhere.",
            },
            {
                title: "Few recent reviews",
                cost: "New clients pick the business with fresh reviews, even if your work is better.",
                check: "I compare your reviews with 3 competitors nearby.",
                fix: "A short message that asks every happy client for a review.",
            },
            {
                title: "Your ads count the wrong thing",
                cost: "In one store I checked, Google Ads showed 660 “conversions”. The store had 26 orders. So the ads brought more clicks, not more buyers.",
                check: "I compare what your ad account counts with the real calls, requests or orders.",
                fix: "Ads that count only real customers, so the budget goes to people who buy.",
            },
            {
                title: "You can’t tell what works",
                cost: "You don’t know how many clients came from the website, so you can’t tell what’s worth paying for.",
                check: "I check if calls and form requests from the site are counted.",
                fix: "A simple count each month: calls, messages and requests.",
            },
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
                description: "Your Google Maps profile set up with the right categories, services and photos. The same name, address and phone everywhere you’re listed.",
            },
            {
                title: "Found for every service",
                description: "A page for each service and area you cover, so Google and AI search show you for each of them.",
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
                title: "Fast replies and follow-up",
                description: "Every request reaches your phone right away. People who asked for a price but didn’t book get a friendly reminder.",
            },
            {
                title: "Know where clients come from",
                description: "Each month you see how many calls and form requests came from the website.",
            },
            {
                title: "Better every month",
                description: "After launch I add posts, new pages and review requests, so the site keeps bringing in clients.",
            },
        ],
        proof: {
            stat: "95%+",
            title: "of clients come from the website and Google Maps",
            text: "That’s a Vienna handyman business I co-own. I made its website and Google Maps profile, and I still improve them every week.",
            href: "https://handwerker-netz.at",
            linkLabel: "See handwerker-netz.at",
        },
        steps: [
            {
                title: "You send your business name",
                description: "Your business name and city on WhatsApp or email. That’s all I need.",
            },
            {
                title: "I check and test",
                description: "I search for you like a customer, test your site on a phone and look at nearby competitors.",
            },
            {
                title: "You see what I found",
                description: "3 screenshots or a 2-minute video: what’s wrong and what I’d fix first. Free.",
            },
            {
                title: "I fix it",
                description: "A fixed price, agreed before I start. After that, a monthly plan if you want one.",
            },
        ],
        cta: "Send me your business name and city. I’ll check how you look on Google and send you what I find. Free.",
        faq: [
            {
                question: "Do I need a website if I have a Google Maps profile?",
                answer: "The profile helps people find you. The website shows your services, so people trust you and call. You get more calls with both.",
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
                answer: "The Google check is free. The website is a fixed price, agreed before I start. You pay in stages, after each part is done. The monthly plan is a fixed monthly fee. No hourly billing.",
            },
            {
                question: "Do you work with Shopify stores?",
                answer: "Yes. Same approach: I find where buyers drop off, fix it, and count the orders before and after. You keep your store, products and customers.",
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
        slug: "custom-web-apps",
        href: "/services/custom-web-apps",
        mark: "A",
        accent: "#A63D6E",
        tint: "#FBEFF4",
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
        intro: "An app or automation does the repeat work, so your team doesn’t have to. Before I build anything, I count the hours the task costs you. Then you decide if it’s worth it.",
        forYouIf: [
            "Several people edit the same spreadsheets to run the business",
            "Your team switches between tools that don’t connect",
            "The same manual task takes hours every week",
            "You wait for someone to build a report before you see your numbers",
            "You need a finance tool, calculator or tracker built to your rules",
            "You want someone who keeps the app up to date after launch",
        ],
        send: {
            label: "Tell me the task",
            note: "I reply within 24 hours and tell you if an app or automation is worth it.",
            whatsappText: "Hi Nick, the task that takes us the most time is: ",
        },
        hiddenTitle: "Where your team loses time",
        hiddenIntro: "These feel normal because your team does them every day. I watch how the work is done and count the time.",
        hidden: [
            {
                title: "Small tasks add up to days",
                cost: "10 minutes, 20 times a week, is more than 3 hours. Every week, for every person who does it.",
                check: "You show me the task. I count how often it happens and how long it takes.",
                fix: "The repeat part runs on its own. Your team checks the result.",
            },
            {
                title: "The same data is typed twice",
                cost: "Orders, clients or invoices copied from one tool to another. Every copy is a chance for a mistake.",
                check: "I map where your data starts and every place it’s copied to.",
                fix: "Your tools connect, so data is entered once.",
            },
            {
                title: "Your numbers come too late",
                cost: "You wait for someone to build a report, so you decide with last month’s numbers.",
                check: "I look at which numbers you need, and how long it takes to get them today.",
                fix: "A screen with your numbers that updates on its own.",
            },
            {
                title: "Only one person knows how it works",
                cost: "When that person is sick or leaves, the work stops or goes wrong.",
                check: "I write down each step, who does it and why.",
                fix: "A simple tool that guides anyone through the steps.",
            },
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
                "What a tool can do, and what should stay manual",
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
                description: "AI reads documents, sorts requests or writes draft replies. You check them before anything is sent.",
            },
            {
                title: "Finance tools",
                description: "Loan calculators, trackers and reports that follow your own rules.",
            },
        ],
        proof: {
            stat: "Every day",
            title: "a lending company runs on a system I built",
            text: "I co-founded a consumer credit company and built the internal system its daily work runs on. My own business runs on EPUfix, another app I built.",
            href: "/projects",
            linkLabel: "See my projects",
        },
        steps: [
            {
                title: "You tell me the task",
                description: "A few lines on WhatsApp or email. I reply within 24 hours.",
            },
            {
                title: "Process check",
                description: "I map how the task is done today and count the hours it costs each month.",
            },
            {
                title: "You see what I found",
                description: "What to automate, what to keep manual, the timeline and a fixed price.",
            },
            {
                title: "I build it",
                description: "You see progress every week. After launch, a support plan if you want one.",
            },
        ],
        cta: "Tell me which task takes your team the most time. I’ll tell you if an app is the right fix.",
        faq: [
            {
                question: "When is a custom app better than a spreadsheet or a no-code tool?",
                answer: "When several people work on the same data, and you need to know who changed what or who can see what. If a spreadsheet or a ready-made tool still does the job, I’ll tell you.",
            },
            {
                question: "What does it cost?",
                answer: "The process check is a fixed price. After it, you get a list of what I’ll build, the timeline and a fixed price. You pay in stages, as each part is delivered. No hourly billing.",
            },
            {
                question: "Can it connect to the tools we already use?",
                answer: "Yes - CRMs, payment providers like Stripe, email and SMS services, or any tool with an API.",
            },
            {
                question: "Can you keep improving the app after launch?",
                answer: "Yes, with a support plan: hosting, fixes and small improvements each month. If the app brings in money, part of my pay can be a share of it.",
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

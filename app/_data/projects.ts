export type ProjectCategory = "finance" | "management" | "productivity" | "other";

export type ProjectType = "web-app" | "mobile" | "business-website" | "ecommerce";

export type ProjectIcon = "bookmark" | "wallet" | "folder-up" | "scissors";

export type FeatureIcon = "list" | "file" | "chart" | "download" | "phone" | "qr" | "truck" | "card";

export type ProjectFeature = {
    icon: FeatureIcon;
    title: string;
    /** Short line for the homepage card */
    short: string;
    /** Longer line for the projects page */
    text: string;
};

export type Project = {
    slug: string;
    title: string;
    year: number;
    stack: string[];
    /** Short stack line for small cards */
    stackShort: string;
    /** Homepage tagline - keep to ~2 lines */
    description: string;
    /** What the product does */
    overview: string;
    /** What you built / the result */
    contribution: string;
    type: ProjectType;
    /** Logo image, shown instead of the mark */
    logo?: string;
    /** Initials shown in the project mark (used when there is no logo or icon) */
    mark?: string;
    icon?: ProjectIcon;
    /** Mark background colour */
    color: string;
    /** Live URL - omit when discontinued / not public */
    url?: string;
    /** Link label on small cards, e.g. "Visit site" or "Play it" */
    linkLabel?: string;
    /** Built for a client (vs personal / product) */
    client?: boolean;
    sort: number;
    showOnHome: boolean;
    /** Large card on the projects page */
    featured?: boolean;
    /** "What's inside" list for featured cards */
    features?: ProjectFeature[];
    /** Colours of the "What's inside" panel */
    panel?: { background: string; border: string; accent: string };
    category: ProjectCategory;
};

export const typeLabel: Record<ProjectType, string> = {
    "web-app": "Web app",
    mobile: "Mobile",
    "business-website": "Business website",
    ecommerce: "Ecommerce",
};

export const categoryLabel: Record<ProjectCategory, string> = {
    finance: "Finance",
    productivity: "Productivity",
    management: "Management",
    other: "Experiments",
};

/** Singular label used in card meta lines, e.g. "Experiment · 2021" */
export const categoryMetaLabel: Record<ProjectCategory, string> = {
    finance: "Finance",
    productivity: "Productivity",
    management: "Management",
    other: "Experiment",
};

export const projects: Project[] = [
    {
        slug: "simple-trackr",
        logo: "https://simple-trackr.com/simple-trackr-logo.svg",
        title: "Simple Trackr",
        year: 2026,
        stack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Stripe"],
        stackShort: "Next.js · Supabase · Stripe",
        description:
            "Expense, income and invoice tracking for freelancers. Log every transaction, turn offers into branded invoices, and see the month in one dashboard.",
        overview:
            "Expense, income and invoice tracking for freelancers - log every transaction, turn offers into invoices, send branded invoices, and see the numbers in one dashboard.",
        contribution:
            "Built for my own freelance work first: transactions, offers, invoices, reports and CSV export - in one place instead of several files.",
        type: "web-app",
        mark: "ST",
        color: "#16284D",
        url: "https://simple-trackr.com",
        sort: 0,
        showOnHome: true,
        featured: true,
        panel: { background: "#F5F7FB", border: "#DCE1EB", accent: "#16284D" },
        features: [
            {
                icon: "list",
                title: "Transactions",
                short: "Income and expenses, categorised in one list.",
                text: "Log income and expenses and keep them categorised in one list.",
            },
            {
                icon: "file",
                title: "Offers → invoices",
                short: "Turn an accepted offer into a branded invoice.",
                text: "Turn an accepted offer into a branded invoice and send it.",
            },
            {
                icon: "chart",
                title: "Dashboard & reports",
                short: "See income, costs and net for any period.",
                text: "See income, costs and net for any period at a glance.",
            },
            {
                icon: "download",
                title: "CSV export",
                short: "Hand clean data to your accountant.",
                text: "Hand clean data to your accountant at year end.",
            },
        ],
        category: "finance",
    },
    {
        slug: "1food-menu",
        logo: "https://1food.menu/one-food-menu-logo.svg",
        title: "1FoodMenu",
        year: 2022,
        stack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Stripe"],
        stackShort: "Next.js · Supabase · Stripe",
        description: "Digital menus for restaurants and food trucks - a live page and QR code, updated from your phone.",
        overview:
            "A live digital menu for restaurants and food trucks - photos, prices, hours and a QR code. Update from your phone; guests open it in the browser, no app needed.",
        contribution:
            "I build and run it as my own product: menu editor, public menu pages, QR codes, restaurant and food-truck modes, and Stripe billing. Free to start.",
        type: "web-app",
        mark: "1F",
        color: "#C8551E",
        url: "https://1food.menu",
        sort: 1,
        showOnHome: true,
        featured: true,
        panel: { background: "#FBF5EF", border: "#EADFD4", accent: "#A2471A" },
        features: [
            {
                icon: "phone",
                title: "Edit from your phone",
                short: "Change prices, photos and hours in seconds.",
                text: "Change prices, photos and hours in seconds - the menu updates live.",
            },
            {
                icon: "qr",
                title: "QR code included",
                short: "Guests scan and open the menu in the browser.",
                text: "Guests scan and open the menu in the browser - no app needed.",
            },
            {
                icon: "truck",
                title: "Restaurants & food trucks",
                short: "Modes for a fixed restaurant and a food truck.",
                text: "Separate modes for a fixed restaurant and a food truck.",
            },
            {
                icon: "card",
                title: "Free to start",
                short: "Paid plans handled with Stripe billing.",
                text: "Paid plans handled with Stripe billing when you need more.",
            },
        ],
        category: "productivity",
    },
    {
        slug: "bookmark-manager",
        logo: "https://bookmarks-manager.online/logo.svg",
        title: "Bookmark Manager",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS", "Firebase"],
        stackShort: "Vue.js · Tailwind · Firebase",
        description: "Save and organize links with tags and notes - synced across devices.",
        overview:
            "A dedicated place to save links with tags and notes, then find them again without digging through browser folders.",
        contribution: "Firebase sync, tag filtering, search, and bulk import from browser export files.",
        type: "web-app",
        icon: "bookmark",
        color: "#127A6F",
        url: "https://bookmarks-manager.online/",
        sort: 2,
        showOnHome: true,
        category: "productivity",
    },
    {
        slug: "saver-wallet",
        logo: "https://saver-wallet.netlify.app/saver-wallet-logo.svg",
        title: "Saver Wallet",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS"],
        stackShort: "Vue.js · Tailwind · PWA",
        description: "Loyalty, membership and gift cards in one PWA - saved locally, no account needed.",
        overview: "Loyalty, membership and gift cards stored digitally, one tap away at checkout - no account needed.",
        contribution: "an installable PWA end to end - local storage, simple card UI, no backend or signup.",
        type: "web-app",
        icon: "wallet",
        color: "#7A5E6E",
        url: "https://saver-wallet.netlify.app/",
        sort: 3,
        showOnHome: true,
        category: "finance",
    },
    {
        slug: "bunny-cdn-manager",
        logo: "https://bunny-cdn.netlify.app/bunnyLogo.svg",
        title: "Bunny CDN Manager",
        year: 2023,
        stack: ["Vue.js", "Tailwind CSS"],
        stackShort: "Vue.js · Tailwind · Bunny API",
        description: "A cleaner Bunny CDN assets manager - uploads, folders, bulk delete, and image previews.",
        overview: "A faster layout for Bunny CDN storage zones - uploads, browsing and cleanup of assets in one clean view.",
        contribution: "a Vue UI on Bunny’s API with folders, drag-and-drop uploads, bulk delete and image previews.",
        type: "web-app",
        icon: "folder-up",
        color: "#A2471A",
        url: "https://bunny-cdn.netlify.app/",
        sort: 4,
        showOnHome: false,
        category: "management",
    },
    {
        slug: "rock-paper-scissors",
        logo: "https://rps-game.online/rock-paper-scissors-logo.svg",
        title: "Rock Paper Scissors",
        year: 2021,
        stack: ["Vue.js", "CSS"],
        stackShort: "Vue.js · CSS",
        description: "A quick Rock Paper Scissors game with animated results and session scores.",
        overview: "A quick browser game - pick your move, watch the animated reveal, and keep score for the session.",
        contribution: "the full game in Vue 3 as a playground for UI and motion. An experiment, not a product.",
        type: "web-app",
        icon: "scissors",
        color: "#7A5E6E",
        url: "https://rps-game.online/",
        linkLabel: "Play it",
        sort: 5,
        showOnHome: false,
        category: "other",
    },
];

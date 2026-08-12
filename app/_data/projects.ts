export type ProjectCategory = "finance" | "management" | "productivity" | "other";

export type ProjectType = "web-app" | "mobile" | "business-website" | "ecommerce";

export type Project = {
    slug: string;
    title: string;
    year: number;
    stack: string[];
    /** Homepage tagline - keep to ~2 lines */
    description: string;
    /** What the product does */
    overview: string;
    /** What you built / the result */
    contribution: string;
    type: ProjectType;
    logo?: string;
    /** Live URL - omit when discontinued / not public */
    url?: string;
    /** Built for a client (vs personal / product) */
    client?: boolean;
    images: string[];
    sort: number;
    showOnHome: boolean;
    featured?: boolean;
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
    management: "Management",
    productivity: "Productivity",
    other: "Other",
};

export const projects: Project[] = [
    {
        slug: "simple-trackr",
        title: "Simple Trackr",
        year: 2026,
        stack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Stripe"],
        description: "Expense, income, and invoice tracker for freelancers - replace the spreadsheet, not your accountant.",
        overview:
            "Expense, income, and invoice tracking for freelancers - log every dollar, turn offers into invoices, send branded invoices, and see the numbers in one dashboard.",
        contribution:
            "I built it for myself after my spreadsheet stopped being trustworthy. Transactions, offers, invoices, reports, and CSV export - one place instead of a broken workbook.",
        type: "web-app",
        logo: "https://simple-trackr.com/simple-trackr-logo.svg",
        url: "https://simple-trackr.com",
        images: [],
        sort: 0,
        showOnHome: true,
        featured: true,
        category: "finance",
    },
    {
        slug: "1food-menu",
        title: "1FoodMenu",
        year: 2022,
        stack: ["Next.js", "React", "Supabase", "Tailwind CSS", "Stripe"],
        description: "Digital menus for restaurants and food trucks - live page, QR code, update from your phone in seconds.",
        overview:
            "A live digital menu for restaurants and food trucks - photos, prices, hours, and a QR code. Update from your phone; customers open it in the browser, no app needed.",
        contribution:
            "I built and run 1FoodMenu as my own product: menu editor, public pages, QR codes, restaurant and food-truck modes, and Stripe billing. Free to start; 50+ restaurants online.",
        type: "web-app",
        logo: "https://1food.menu/one-food-menu-logo.svg",
        url: "https://1food.menu",
        images: [],
        sort: 1,
        showOnHome: true,
        featured: true,
        category: "productivity",
    },
    {
        slug: "saver-wallet",
        title: "Saver Wallet",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS"],
        description: "Loyalty, membership, and gift cards in one PWA - saved locally, no account needed.",
        overview:
            "People carry a pile of plastic loyalty cards they rarely use. Saver Wallet stores digital versions of those cards so they’re one tap away when you need them at checkout.",
        contribution:
            "I designed and built the progressive web app end to end: local storage, simple card UI, and a fast installable experience with no backend or signup friction.",
        type: "web-app",
        logo: "https://saver-wallet.netlify.app/saver-wallet-logo.svg",
        url: "https://saver-wallet.netlify.app/",
        images: [],
        sort: 2,
        showOnHome: false,
        featured: false,
        category: "finance",
    },
    {
        slug: "bunny-cdn-manager",
        title: "Bunny CDN Manager",
        year: 2023,
        stack: ["Vue.js", "Tailwind CSS"],
        description: "A cleaner Bunny CDN assets manager - uploads, folders, bulk delete, and image previews.",
        overview:
            "Bunny CDN’s official dashboard works, but managing files in storage zones feels dated. This tool wraps the same storage with a faster layout for uploads, browsing, and cleanup.",
        contribution:
            "I built a focused Vue UI on top of Bunny's API: folder navigation, drag-and-drop uploads, bulk delete, and an image preview grid meant for day-to-day asset work.",
        type: "web-app",
        logo: "https://bunny-cdn.netlify.app/bunnyLogo.svg",
        url: "https://bunny-cdn.netlify.app/",
        images: [],
        sort: 3,
        showOnHome: false,
        featured: false,
        category: "management",
    },
    {
        slug: "bookmark-manager",
        title: "Bookmark Manager",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS", "Firebase"],
        description: "Save and organize URLs with tags and notes - synced across devices.",
        overview:
            "Browser bookmarks get messy fast. This app is a dedicated place to save links with tags and notes, then find them again without digging through folders.",
        contribution:
            "I built the web app with Firebase sync, tag filtering, search, and bulk import from browser export files - a small productivity tool meant for daily use.",
        type: "web-app",
        logo: "https://bookmarks-manager.online/logo.svg",
        url: "https://bookmarks-manager.online/",
        images: [],
        sort: 4,
        showOnHome: true,
        featured: true,
        category: "productivity",
    },
    {
        slug: "rock-paper-scissors",
        title: "Rock Paper Scissors",
        year: 2021,
        stack: ["Vue.js", "CSS"],
        description: "A quick Rock Paper Scissors game with animated results and session scores.",
        overview:
            "A classic RPS game in the browser: pick your move, see the result, and keep score for the session. Built as a small playground for UI and motion.",
        contribution:
            "I built the full game in Vue 3 - animated reveal, score tracking, and a clean responsive layout. Lightweight experiment, not a product.",
        type: "web-app",
        logo: "https://rps-game.online/rock-paper-scissors-logo.svg",
        url: "https://rps-game.online/",
        images: [],
        sort: 5,
        showOnHome: true,
        featured: true,
        category: "other",
    },
];

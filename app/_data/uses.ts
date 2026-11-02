/** The /uses page. Only tools in use now; "why" = one plain line about my situation. Rules: brand/notes-and-uses-strategy.md */

export type UseItem = {
    name: string;
    url: string;
    why: string;
    /** Slug of a note about this tool */
    note?: string;
};

export type UseGroup = { id: "code" | "ai" | "business" | "marketing"; title: string; items: UseItem[] };

export const usesUpdated = "2026-11-02";

// DRAFT "why" lines - review before deploy
export const uses: UseGroup[] = [
    {
        id: "code",
        title: "Code",
        items: [
            { name: "Next.js", url: "https://nextjs.org", why: "Most of my websites and apps run on it, this site too. One setup for pages, SEO and the app itself." },
            { name: "Nuxt / Vue", url: "https://nuxt.com", why: "Where I started. Some older projects still run on it, and they run fine." },
            { name: "Tailwind CSS", url: "https://tailwindcss.com", why: "I style right in the markup, so a page change is one file, not two." },
            { name: "Supabase", url: "https://supabase.com", why: "Login, database and storage in one place. EPUfix runs on it." },
            { name: "Firebase", url: "https://firebase.google.com", why: "For small apps that need login and live data without a server." },
            { name: "Stripe", url: "https://stripe.com", why: "Payments and subscriptions in my apps. The dashboard shows me the real numbers." },
            { name: "Zod", url: "https://zod.dev", why: "Checks every form and every bit of data that comes in, before it can break something." },
            { name: "Vercel", url: "https://vercel.com", why: "Push to git, the site is live a minute later." },
            { name: "Expo", url: "https://expo.dev", why: "Mobile apps with the same React I use on the web." },
        ],
    },
    {
        id: "ai",
        title: "AI",
        items: [
            { name: "Claude Code", url: "https://claude.com/claude-code", why: "Writes and changes code with me in the terminal. I still read every change before it ships." },
        ],
    },
    {
        id: "business",
        title: "Business & numbers",
        items: [
            { name: "EPUfix", url: "https://epufix.at", why: "My own invoicing and income/expense tool for the self-employed in Austria. I use it for my own numbers." },
        ],
    },
    {
        id: "marketing",
        title: "Marketing",
        items: [
            { name: "Google Search Console", url: "https://search.google.com/search-console", why: "Shows which searches bring people to my sites, and which pages Google ignores." },
            { name: "Google Business Profile", url: "https://www.google.com/business/", why: "Most local customers find a business on Maps first. Handwerker Netz gets most of its calls from here." },
        ],
    },
];

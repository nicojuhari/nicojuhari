export type Project = {
    slug: string;
    title: string;
    year: number;
    stack: string[];
    description: string;
    longDescription: string;
    logo?: string;
    url?: string;
    images: string[];
    sort: number;
    showOnHome: boolean;
};

export const projects: Project[] = [
    {
        slug: "1food-menu",
        title: "1FoodMenu",
        year: 2022,
        stack: ["Vue.js", "Node.js", "Firebase", "Tailwind CSS"],
        description: "Digital menus for restaurants",
        longDescription:
            "1FoodMenu lets restaurant owners create a digital food menu accessible via QR code. Customers scan the code and instantly see the full menu on their phone - no app download required. Built with Vue 3, Firebase for real-time data, and a custom QR code generator.",
        logo: "https://1food.menu/one-food-menu-logo.svg",
        url: "https://1food.menu/",
        images: [],
        sort: 1,
        showOnHome: true,
    },
    {
        slug: "bunny-cdn-manager",
        title: "Bunny CDN Manager",
        year: 2023,
        stack: ["Vue.js", "Tailwind CSS"],
        description: "Assets manager with a better UI",
        longDescription:
            "Bunny CDN Manager provides a clean interface for managing assets in Bunny CDN storage zones. The official dashboard is functional but dated - this project reimagines it with drag-and-drop uploads, folder navigation, bulk delete, and a fast image preview grid.",
        logo: "https://bunny-cdn.netlify.app/bunnyLogo.svg",
        url: "https://bunny-cdn.netlify.app/",
        images: [],
        sort: 2,
        showOnHome: true,
    },
    {
        slug: "saver-wallet",
        title: "Saver Wallet",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS"],
        description: "Never forget your cards at home",
        longDescription:
            "Saver Wallet is a lightweight progressive web app that stores digital versions of your loyalty, membership, and gift cards. Cards are saved locally - no account required. Designed for simplicity and fast access.",
        logo: "https://saver-wallet.netlify.app/saver-wallet-logo.svg",
        url: "https://saver-wallet.netlify.app/",
        images: [],
        sort: 3,
        showOnHome: true,
    },
    {
        slug: "rock-paper-scissors",
        title: "Rock Paper Scissors",
        year: 2021,
        stack: ["Vue.js", "CSS"],
        description: "Play RPS game online",
        longDescription:
            "A single-page Rock Paper Scissors game built with Vue 3. Features animated result reveals, score tracking per session, and a clean responsive UI. A fun side project built to explore Vue animations.",
        logo: "https://rps-game.online/rock-paper-scissors-logo.svg",
        url: "https://rps-game.online/",
        images: [],
        sort: 4,
        showOnHome: true,
    },
    {
        slug: "bookmark-manager",
        title: "Bookmark Manager",
        year: 2022,
        stack: ["Vue.js", "Tailwind CSS", "Firebase"],
        description: "Manage your bookmarks easily",
        longDescription:
            "Bookmark Manager is a web app for saving and organizing URLs with custom tags and notes. Links are stored in Firebase so they sync across devices. Features include tag filtering, search, and bulk import from browser export files.",
        logo: "https://bookmarks-manager.online/logo.svg",
        url: "https://bookmarks-manager.online/",
        images: [],
        sort: 5,
        showOnHome: true,
    },
];

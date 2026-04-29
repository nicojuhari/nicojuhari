export type Project = {
  slug: string
  title: string
  year: number
  stack: string[]
  description: string
  longDescription: string
  url?: string
  images: string[] // paths under /public/projects/[slug]/
}

export const projects: Project[] = [
  {
    slug: "1food-menu",
    title: "1FoodMenu",
    year: 2022,
    stack: ["Vue.js", "Node.js", "Firebase", "Tailwind CSS"],
    description: "Digital food menu platform for restaurants — scan a QR code, browse the menu.",
    longDescription:
      "1FoodMenu lets restaurant owners create a digital food menu accessible via QR code. Customers scan the code and instantly see the full menu on their phone — no app download required. Built with Vue 3, Firebase for real-time data, and a custom QR code generator.",
    url: "https://1food.menu/",
    images: [],
  },
  {
    slug: "saver-wallet",
    title: "Saver Wallet",
    year: 2022,
    stack: ["Vue.js", "Tailwind CSS"],
    description: "Store and access your loyalty and membership cards digitally — never forget a card at home.",
    longDescription:
      "Saver Wallet is a lightweight progressive web app that stores digital versions of your loyalty, membership, and gift cards. Cards are saved locally — no account required. Designed for simplicity and fast access.",
    url: "https://saver-wallet.netlify.app/",
    images: [],
  },
  {
    slug: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    year: 2021,
    stack: ["Vue.js", "CSS"],
    description: "A clean online Rock Paper Scissors game with score tracking.",
    longDescription:
      "A single-page Rock Paper Scissors game built with Vue 3. Features animated result reveals, score tracking per session, and a clean responsive UI. A fun side project built to explore Vue animations.",
    url: "https://rps-game.online/",
    images: [],
  },
  {
    slug: "bookmark-manager",
    title: "Bookmark Manager",
    year: 2022,
    stack: ["Vue.js", "Tailwind CSS", "Firebase"],
    description: "Organize, tag, and search bookmarks — a cleaner alternative to browser bookmarks.",
    longDescription:
      "Bookmark Manager is a web app for saving and organizing URLs with custom tags and notes. Links are stored in Firebase so they sync across devices. Features include tag filtering, search, and bulk import from browser export files.",
    url: "https://bookmarks-manager.online/",
    images: [],
  },
  {
    slug: "bunny-cdn-manager",
    title: "Bunny CDN Manager",
    year: 2023,
    stack: ["Vue.js", "Tailwind CSS"],
    description: "A better UI for managing Bunny CDN storage zones — upload, browse, and delete assets.",
    longDescription:
      "Bunny CDN Manager provides a clean interface for managing assets in Bunny CDN storage zones. The official dashboard is functional but dated — this project reimagines it with drag-and-drop uploads, folder navigation, bulk delete, and a fast image preview grid.",
    url: "https://bunny-cdn.netlify.app/",
    images: [],
  },
]

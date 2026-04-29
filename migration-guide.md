# Migration & Redesign Guide

Rebuilding nicojuhari.com from Nuxt/Vue → Next.js 16 (App Router) with React 19, Tailwind CSS v4, and shadcn/ui. Each step below is self-contained and can be executed independently.

---

## Step 1 — Install shadcn/ui

shadcn/ui is the component foundation for the entire project.

```bash
npx shadcn@latest init
```

- Choose **Default** style, **Slate** base color (neutral, professional)
- Accept TypeScript, Tailwind CSS, and `app/` directory defaults
- Path alias `@/` should already be set in `tsconfig.json`

Install commonly needed components upfront:

```bash
npx shadcn@latest add button input textarea label card badge separator
```

> **Improvement:** The old project used Nuxt UI (`UButton`, `UInput`, etc.). shadcn/ui replaces all of that with unstyled, accessible primitives you can style with Tailwind.

---

## Step 2 — Global Layout (Header + Footer)

**Files to create:** `app/layout.tsx` (update), `app/_components/header.tsx`, `app/_components/footer.tsx`

### 2.1 — Root Layout

Update `app/layout.tsx`:
- Keep Geist Sans font (already set up)
- Add `<Header />` and `<Footer />` as Server Components
- Set metadata: title template `"%s | Nico Juhari"`, base description, canonical URL
- Add `lang="en"` and `suppressHydrationWarning` to `<html>`

### 2.2 — Header

Port from `old-project/app/components/includes/Header.vue`:
- Sticky, blurred background: `sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b`
- Logo SVG on the left (copy `/Logo.svg` from `old-project/public/` into `public/`)
- Add a navigation menu: Home, Tools, Projects, Demos, Playground — use `next/link`
- Add a **"Hire Me"** CTA button (links to `/#contact`) visible on desktop
- Add a mobile hamburger menu (shadcn `Sheet` component for the drawer)

> **Improvement:** Old header had no navigation. Add it. Keep it minimal — just the key sections.

### 2.3 — Footer

Port from `old-project/app/components/includes/Footer.vue`:
- GitHub, X (Twitter), and LinkedIn icon links with `rel="nofollow"` — copy SVGs from old footer
- Copyright line: `© {year} Nicolae Cojuhari`
- Update tagline: "Software Engineer" (new positioning, not "Shopify & JavaScript Developer")

---

## Step 3 — Home Page

**File:** `app/page.tsx` (Server Component)

Build section by section. All sections are pure Server Components except the contact form.

### 3.1 — Hero Section

Port from `old-project/app/components/main/home/Hero.vue`:
- Greeting `👋 Hello, I am Nick`
- Profile photo (copy `old-project/public/nick-profile-photo.webp` → `public/`) — use `next/image` with `priority`
- `<h1>`: **"Software Engineer"** (new positioning — builds any type of app: business, ecommerce, custom web apps)
- Subtitle: rewrite copy to reflect new positioning — "I architect and build modern web apps, from business websites to complex custom platforms."
- Two CTA buttons: **"WhatsApp"** (link to `https://wa.me/your-number`) and **"Contact Me"** (scroll to `#contact`) — these are the MAIN CTAs
- Years of experience badge (keep the calculation: `currentYear - 2019 + 1`)

> **Improvement:** New CTA is WhatsApp first (direct conversion). Remove GSAP dependency for entry animation — use `@keyframes` CSS animations via Tailwind (`animate-fade-in-up`) for the same effect with zero JS overhead.

### 3.2 — Web Apps Section

Port from `old-project/app/components/main/WebApps.vue`:
- Section title: "Web Apps"
- Grid of app cards (logo, title, short description) linking to external URLs
- Apps list (keep existing):
  - 1FoodMenu (`https://1food.menu/`)
  - Bunny CDN (`https://bunny-cdn.netlify.app/`)
  - Saver Wallet (`https://saver-wallet.netlify.app/`)
  - Rock Paper Scissors (`https://rps-game.online/`)
  - Bookmark Manager (`https://bookmarks-manager.online/`)
- `<img>` for logos, `target="_blank" rel="nofollow"` on links

> **Improvement:** Add a hover state to cards (slight shadow/border change). Consider showing a "live" badge or tech stack pill on each card.

### 3.3 — Tools List (Home)

Port from `old-project/app/components/main/ToolsList.vue`:
- Section title: "Simple Tools", subtitle: "Built for me, sharing with you."
- Grid of tool cards linking to `/tools/[slug]`
- Use the same tools list defined in Step 7

### 3.4 — Tech Stack Section

Port from `old-project/app/components/main/home/MyStack.vue`:
- Section title: "My Stack"
- Inline SVG icons in a wrapping flex grid
- Update the stack icons — remove Vue/Nuxt, add **React**, **Next.js**; keep the rest (TypeScript, Node, Tailwind, Firebase, Supabase, Shopify, etc.)
- SVGs are already inline in the old component — copy them directly

> **Improvement:** Add icon tooltips (HTML `title` attribute is fine) and consider grouping by category (Frontend / Backend / Tools) if the list grows.

### 3.5 — Playground List (Home Preview)

- Section title: "Playground"
- 2-column card grid linking to `/playground/*`
- Same 2 projects as old project (Rain of Emojis, Magic Wand Sparkles)

### 3.6 — Contact / Hire Me Section

Port from `old-project/app/components/main/home/HireMe.vue`. This is a Client Component (`'use client'`).

**File:** `app/_components/contact-form.tsx`

- Section title: "Contact me" with `id="contact"` anchor
- Form fields: Name, Email, Message
- WhatsApp CTA button above the form (link to `https://wa.me/...`) — **primary CTA**
- Web3Forms submission (access key: `8e14a520-e3cc-45e3-b53b-fa21f7a8f562`)
- Submit via `fetch` to `https://api.web3forms.com/submit` with JSON body
- Success state: show "Thank you for your message! I will contact you shortly." — auto-hide after 4s
- Validation: name required, valid email, message min 10 chars (client-side with `useState`)

> **Improvement:** Add a WhatsApp button prominently above the form — the PRD specifies WhatsApp as primary CTA. Use `react-hook-form` + `zod` for clean validation instead of manual checks.

---

## Step 4 — Projects Page

**Files:** `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `app/_data/projects.ts`

This is a new section that didn't exist in the old project.

### 4.1 — Projects Data File

Create `app/_data/projects.ts` with a typed array of projects:
```ts
type Project = {
  slug: string
  title: string
  year: number
  stack: string[]
  description: string
  longDescription: string
  url?: string
  images: string[]   // paths under /public/projects/[slug]/
}
```

Populate with real projects (manually — the old site fetched from Storyblok).

### 4.2 — Projects Index (`/projects`)

- Page title: "Projects"
- Grid of project cards: screenshot thumbnail, title, year, tech stack pills
- Each card links to `/projects/[slug]`
- Cards use `next/image` with `loading="lazy"`

> **Improvement:** Add a filter bar by tech stack (client component island). Static data makes this straightforward.

### 4.3 — Project Detail Page (`/projects/[slug]`)

- Generate static params from `projects.ts` via `generateStaticParams`
- Hero image (full-width) using `next/image`
- Title, year, tech stack badges, live URL button
- Description section (rich text or markdown via `next-mdx-remote` if needed)
- Screenshots gallery (lightbox optional)
- "Back to Projects" link

---

## Step 5 — Tools Section

**Files:** `app/tools/page.tsx`, `app/tools/[slug]/page.tsx`, `app/_data/tools.ts`

Each tool is a Client Component (all are interactive/browser-only). The tool page wrapper is a Server Component; only the interactive island is `'use client'`.

### 5.1 — Tools Layout & Index

- `app/tools/layout.tsx`: shared layout with a sidebar or breadcrumb showing other tools
- `app/tools/page.tsx`: tools index grid (title, description, icon, link)
- `app/_data/tools.ts`: typed array with slug, title, description, icon name, SEO meta

Tools list:
| Slug | Title |
|---|---|
| `qr-code-menu-generator` | QR Code Menu Generator |
| `square-image-cropper` | Square Image Cropper |
| `word-counter` | Word Counter Tool |
| `whitespace-remover` | Whitespace Remover |
| `online-checklist-maker` | Online Checklist Maker |
| `product-grid-generator` | Product Grid Generator |
| `bill-split-calculator` | Bill Split Calculator |

### 5.2 — Word Counter Tool

**File:** `app/tools/word-counter/_components/word-counter.tsx` (`'use client'`)

- `<textarea>` bound to `useState`
- Computed stats: words, characters, characters without spaces, spaces, sentences, lines, reading time (200 wpm)
- Stats grid on the right side (same layout as old)
- Clear button inside textarea

> **Improvement:** Add a character limit input — the old code had this commented out. Add copy-to-summary button.

### 5.3 — Whitespace Remover

**File:** `app/tools/whitespace-remover/_components/whitespace-remover.tsx` (`'use client'`)

Port all logic from old `whitespace-remover.vue`:
- `textRaw` input textarea
- `convertedText` computed (via `useMemo`)
- Replace options: dashes, underscores, slashes, keep spaces, new line, remove all spaces
- Transform options: none, lowercase, uppercase, capitalize
- Toggles: reverse text, keep new lines
- Copy to clipboard button

### 5.4 — Online Checklist Maker

**File:** `app/tools/online-checklist-maker/_components/checklist.tsx` (`'use client'`)

- Tasks stored in `localStorage` (use `useLocalStorage` hook — implement a simple one or use `usehooks-ts`)
- Add task (Enter key + button), with optional notes field that appears when title is typed
- Edit task inline
- Toggle completion (strikethrough)
- Delete individual task
- Export as `.txt` (Blob download)
- Print checklist (open new window with formatted HTML)
- Delete all modal confirmation (use shadcn `AlertDialog`)

> **Improvement:** Drag-to-reorder tasks using the `@dnd-kit/sortable` library. Add task count badge (e.g., "3/7 done").

### 5.5 — QR Code Menu Generator

**File:** `app/tools/qr-code-menu-generator/_components/qr-generator.tsx` (`'use client'`)

The old component used a custom Vue component wrapping `qr-code-styling`. Use the same library for React: install `qr-code-styling`.

- URL input field
- Style options: dots shape, corner shape, corner dot shape (radio groups)
- Color pickers: foreground and background
- Size slider
- Logo/image upload for center of QR code
- Preview renders in real-time
- Download button (PNG)

> **Improvement:** Add a "Copy to clipboard" option for the QR image data URL. Show a live preview that updates as the user types.

### 5.6 — Square Image Cropper

**File:** `app/tools/square-image-cropper/_components/image-cropper.tsx` (`'use client'`)

The old component used `vue-advanced-cropper`. Use `react-advanced-cropper` (same author, React version).

```bash
npm install react-advanced-cropper
```

- File upload input (drag & drop area)
- Cropper component with `aspectRatio: 1` (square only)
- Flip horizontal/vertical buttons
- Rotate ±90° buttons
- Output size presets: 600×600, 800×800, 1000×1000 + custom input
- Download cropped image as original type (JPEG/PNG/WebP)

### 5.7 — Product Grid Generator

**File:** `app/tools/product-grid-generator/_components/product-grid.tsx` (`'use client'`)

Port from `old-project/app/pages/tools/product-grid-generator.vue`:
- Product list management (add/remove, title, image URL, product URL, price, description)
- Design selector (square grid vs. carousel)
- Live HTML preview
- Copy generated HTML to clipboard

### 5.8 — Bill Split Calculator

**File:** `app/tools/bill-split-calculator/_components/bill-split.tsx` (`'use client'`)

This is the most complex tool. Port from `old-project/app/pages/tools/bill-split-calculator.vue`.

- State persisted in `localStorage` (friends list + expenses)
- Friends management: add (Enter key), remove (only if not in any expense)
- Add expense: title, amount, paid by (select), split mode (equal or custom)
- Expenses table: title, amount, paid by, split breakdown, delete
- Settlement algorithm: greedy creditor/debtor matching (copy the logic from old component)
- Individual balances: paid, spent, net balance per person
- Reset all with confirmation dialog

> **Improvement:** Add a currency selector. Show a summary total at the top. Allow editing existing expenses.

---

## Step 6 — Demos Page

**Files:** `app/demos/page.tsx`, `app/demos/layout.tsx`

### 6.1 — No-index Setup

```tsx
// app/demos/layout.tsx
export const metadata = {
  robots: { index: false, follow: false },
}
```

### 6.2 — Demos Index

Port from `old-project/app/pages/demos/index.vue`:
- Grid of demo cards with thumbnail, title, link
- Demos:
  - GUD Restaurant (`/demos/restaurants/gud`)
  - Lusin Restaurant (`/demos/restaurants/lusin`)
  - Bella Cucina Restaurant (`/demos/restaurants/bella-cucina`)
- Use CDN thumbnail URLs from old project

### 6.3 — Restaurant Demo Pages

Port the restaurant pages from `old-project/app/pages/demos/restaurants/`. Each is a standalone full-page layout (no site header/footer). Use a separate layout:

```tsx
// app/demos/layout.tsx — no header/footer, just renders {children}
```

These pages are largely static HTML/CSS — port them as Server Components.

---

## Step 7 — Playground Page

**Files:** `app/playground/page.tsx`, `app/playground/magic-wand/page.tsx`, `app/playground/rain-of-emojis/page.tsx`

### 7.1 — Playground Index

- Grid of project cards (emoji icon, title, short description)
- Links to individual playground routes

### 7.2 — Magic Wand Sparkles

**File:** `app/playground/magic-wand/page.tsx` (`'use client'`)

- Full-screen canvas/div
- On click/tap: spawn 12 star `<div>` elements at cursor position with random angle, distance, and rotation via CSS custom properties
- CSS `@keyframes` for the sparkle animation (port `old-project/app/assets/styles/magic-wand.css` into the component or `globals.css`)
- No site header/footer — use a minimal layout with a "← Back" link

### 7.3 — Rain of Emojis

**File:** `app/playground/rain-of-emojis/page.tsx` (`'use client'`)

- Full-screen container
- `setInterval` (200ms) spawning emoji elements at random horizontal positions, random size (24–48px), random duration (3–6s), remove after animation
- Emoji pool: 🎉🎊✨💫🌟🔥🚀🌈💥🍾🥳😄😆😁😂🤣😊😇🙂😉
- CSS `@keyframes fall` animation
- No site header/footer

---

## Step 8 — SEO & Metadata

### 8.1 — Root Metadata

In `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: { template: '%s | Nico Juhari', default: 'Nico Juhari — Software Engineer' },
  description: 'Software engineer specializing in building business websites, ecommerce, and custom web applications.',
  metadataBase: new URL('https://nicojuhari.com'),
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Nico Juhari' },
}
```

### 8.2 — Per-page Metadata

Each route exports its own `metadata` object (or `generateMetadata` for dynamic routes). Copy titles and descriptions from old Vue `useHead()` calls.

### 8.3 — Demos No-index

Already handled in Step 6.1 via the demos layout.

### 8.4 — Sitemap

Create `app/sitemap.ts` (Next.js built-in sitemap generation) excluding `/demos/*`.

---

## Step 9 — Assets & Static Files

- Copy `old-project/public/Logo.svg` → `public/Logo.svg`
- Copy `old-project/public/nick-profile-photo.webp` → `public/nick-profile-photo.webp`
- Copy favicon files from `old-project/public/` → `public/`
- Remove the placeholder SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) from `public/`

---

## Step 10 — Design System Tokens

Define custom tokens in `app/globals.css` under the `@theme` directive (Tailwind v4 — no `tailwind.config.js`):

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --color-brand: #171717;          /* near-black for professional look */
  --radius-card: 0.75rem;
  --shadow-card: 0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07);
}
```

Define utility classes for repeated patterns:
```css
@layer components {
  .section { @apply py-16 md:py-24; }
  .container-sm { @apply max-w-3xl mx-auto px-4; }
  .card { @apply rounded-xl border bg-white p-6 shadow-card; }
}
```

---

## Dependencies to Install

```bash
# shadcn/ui (run init first, then add components)
npx shadcn@latest init
npx shadcn@latest add button input textarea label card badge separator alert-dialog sheet

# Form validation
npm install react-hook-form zod @hookform/resolvers

# Hooks utilities (localStorage, etc.)
npm install usehooks-ts

# QR code
npm install qr-code-styling

# Image cropper
npm install react-advanced-cropper

# Drag-to-reorder (optional, for checklist)
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

---

## Execution Order

Execute steps in this order to always have a working site:

1. **Step 1** — shadcn/ui setup (unblocks all UI work)
2. **Step 10** — Design tokens (CSS foundation)
3. **Step 9** — Copy assets (logo, photo, favicons)
4. **Step 2** — Header + Footer + Root Layout
5. **Step 3** — Home page (section by section)
6. **Step 8** — Metadata (can be done alongside each page)
7. **Step 5.2 → 5.5** — Simpler tools first (word counter, whitespace remover, checklist, QR)
8. **Step 5.6 → 5.8** — Complex tools (image cropper, product grid, bill split)
9. **Step 4** — Projects page
10. **Step 6** — Demos page
11. **Step 7** — Playground

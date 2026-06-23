# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack by default in Next.js 16)
npm run build    # Production build (Turbopack by default)
npm run start    # Start production server
npm run lint     # Run ESLint directly (next lint is deprecated in v16)
```

## Architecture

This is a **Next.js 16 App Router** personal website being rebuilt from the Nuxt/Vue version in `old-project/`. The old project is the reference for content, structure, and features — not a codebase to port directly.

**Tech stack:** Next.js 16.2, React 19.2, TypeScript 5, Tailwind CSS v4, Vercel deployment.

**Route structure (planned):**

- `/` — Home: hero, web apps, tools list, tech stack, playground, contact form
- `/tools/[slug]` — Individual tools (bill splitter, QR code generator, checklist, etc.)
- `/projects/[slug]` — Project detail pages
- `/demos` — Demo pages (no Google indexing)
- `/playground` — Small fun projects

## Next.js 16 — Critical Differences

**Async Request APIs are mandatory.** `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are all async — never access them synchronously:

```tsx
// ✅ Correct
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
}
// Use npx next typegen to generate PageProps/LayoutProps/RouteContext helpers
```

**`proxy.ts` replaces `middleware.ts`.** The exported function must be named `proxy`, not `middleware`. The edge runtime is not supported in `proxy`.

**Turbopack is the default** for both `next dev` and `next build`. Custom `webpack` config in `next.config.ts` will cause build failures.

**Caching APIs:**

- `cacheLife` and `cacheTag` no longer need the `unstable_` prefix
- `revalidateTag(tag, cacheLifeProfile)` now requires a second argument (e.g. `'max'`)
- `updateTag(tag)` is the new API for read-your-writes semantics in Server Actions
- `refresh()` from `next/cache` refreshes the client router from a Server Action

**`ppr` config is removed.** Use `cacheComponents: true` in `next.config.ts` for Partial Prerendering.

**Instant navigation** requires exporting `unstable_instant` from route files when using `cacheComponents`. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md` before implementing.

## Tailwind CSS v4

This project uses **Tailwind v4**, not v3. The setup is different:

- Import: `@import "tailwindcss"` in `app/globals.css` (not `@tailwind base/components/utilities`)
- PostCSS: `@tailwindcss/postcss` plugin in `postcss.config.mjs`
- Theme customization: use `@theme` directive in CSS, not `tailwind.config.js` (no config file needed)

## Server vs. Client Components

Pages and layouts are Server Components by default. Add `'use client'` only when you need state, event handlers, browser APIs, or lifecycle hooks. Keep interactive islands small — pass data down as props from Server Components.

## Old Project Reference

`old-project/` contains the Nuxt/Vue source. Key files for porting content:

- `old-project/app/pages/index.vue` — home page sections
- `old-project/app/components/main/` — Hero, HireMe (contact form), MyStack, WebApps, ToolsList
- `old-project/app/components/includes/` — Header and Footer
- `old-project/app/pages/tools/` — all tool implementations
- Contact form uses `web3forms.com` API with access key `8e14a520-e3cc-45e3-b53b-fa21f7a8f562`

## Design

- The design should be clean, modern, and professional — an improvement over the old Nuxt version. Focus on clarity, usability, and strong visual hierarchy. Use consistent spacing, typography, and component patterns.
- Use shadcn/ui components where possible for consistency and faster development. Customize with Tailwind CSS for unique branding and layout needs.
- Don't use too many color overrides / classes — keep the design cohesive and avoid visual clutter. Use whitespace effectively to separate sections and guide the user's eye.

- add all the pages to sitemap
    - create reusable function to create schema.org for every page (if is needed)
    - add canonical urls
    - make sure all the images has alt attribute and maybe title
    - remove the nofollow attributes from external links ( I think it's a good idea for
      seo)

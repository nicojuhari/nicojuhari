# Website Design Guide - nicojuhari.com

## 2026-11-11 - Job-first polish (current rules for the home page and new pages)

Audience is now recruiters and engineering leads first, small-business clients second (`brand/positioning.md`). The visual world stays: DM Sans, navy `--brand` #16284d, teal `--teal` #127a6f, rose `--brand-rose`, warm canvas `--bg-soft` #f6f5f1, big rounded surfaces. What changed is restraint and structure:

- **No eyebrow labels above headings.** The heading carries the section. (Older pages still have `.eyebrow`; remove it when you touch them.)
- **No equal-card grids as page structure.** Work uses one lead project (wide, with its features) plus two smaller ones. Experience and notes are hairline-divided lists (`border-rule` / `border-white/15`), not cards.
- **Dates and numbers:** `tabular-nums` in the sans face. No monospace as decoration.
- **One authored motion moment per page.** Home: the headline rises in (`hero-rise`, ease-out-expo) and a rose dot travels down the career-path card (`flow`). Everything else is still, apart from hover nudges. Always `motion-safe:`.
- **Hero card = real content.** The navy card shows the career path (2009 credit → 2014 first code → 2020 bwin → now EPUfix), with the last step in white. No stat-box or "big number" templates.
- **Spacing rhythm:** sections `mt-20 sm:mt-28`; the freelance block and contact block sit together as one closing pair.
- **Depth:** one soft offset shadow on the hero card only (`0 24px 60px -24px` navy). Other surfaces are flat with a 1px `border-rule`.
- **Browser surfaces are themed** (globals.css): teal-tinted `::selection`, a 2px teal `:focus-visible` outline with 3px offset, smooth scroll only without reduced motion, and link underline offset 0.2em.
- **Recruiter CTAs:** "See my work", "View CV", email, LinkedIn. WhatsApp only on services pages.
- **CV sheet** (`/cv`) has its own world on purpose: it mirrors the PDF CV (Barlow, navy sidebar #313d5e, cream #fffcf7, light-blue chips #7dd3fc).

---

**Last updated:** 2026-08-12  
**Status:** v2 - hybrid layout (Aria visuals + Marc Lou clarity)

---

## Design intent

Combine two references without cloning either:

| From Aria (ariacodez.ai) | From Marc Lou (marclou.com) |
|---|---|
| Colors, pills, rounded surfaces | Sticky profile + work grid |
| Dot-grid / soft white space | Direct scan of shipped work |
| Floating pill nav, mono eyebrows | Simple cards for projects |
| Quiet motion, hairline rules | “Who + what I build” in one glance |

**Positioning (canonical - see `brand/positioning.md`):**  
Tagline: **Software Engineer · Finance · AI**. Builds financial and business apps for web and mobile using AI where it earns its place. Business websites, landing pages, and Shopify also in the offer (About + Services).

---

## Design principles

1. **Identity left, proof right.** Profile answers who you are; the grid answers what you ship.
2. **Scannable in 5 seconds.** Name, role, what you build, dual path (hire / freelance), then projects.
3. **Clarity over decoration.** Prefer one accent. Minimum shadows. Few grey steps.
4. **Cards only for work.** Project/tool tiles are interactive containers. Don’t cardify the profile or marketing copy.
5. **One system everywhere.** Shared tokens/utilities - don’t one-off style the same element type.
6. **Mobile-first stack.** Profile first, then work grid. Sticky sidebar from `lg` up.
7. **Small motions only.** Hover nudge, active scale. Respect `prefers-reduced-motion`.

---

## Visual system (Aria-led)

### Color

| Token | Value | Use |
|---|---|---|
| Background page | `#fafafa` (`--bg-soft`) | Home board canvas |
| Surface / cards | `#ffffff` | Profile panel, project cards, nav |
| Ink | `#0a0a0a` | Titles |
| Ink muted | `#737373` | Body / meta |
| Rule | `#e5e5e5` | Borders only |
| Brand navy | `#16284d` | Primary CTAs |
| Brand teal | `#1b998b` | Accent dots / hover accents only |

Avoid purple gradients, neon glow walls, cream/terracotta defaults, and many grey text steps.

### Typography

- **UI / headings:** DM Sans  
- **Eyebrows / meta:** Geist Mono, uppercase, `tracking-[0.18em]`, ~13px  
- Profile name: large semibold (~2rem–2.5rem)  
- Card titles: ~15–16px semibold  
- Card descriptions: 14px muted  

### Shape & space

- Primary CTA: `rounded-full`, navy fill  
- Cards / photo: `rounded-2xl` or `rounded-3xl`  
- Nav: floating pill bar  
- Gaps: generous (`gap-4`–`gap-6` between cards; airy profile stack)  
- Borders: 1px `rule` - no multi-shadow stacks  

### Utilities

- `.container` - `position: relative; width: calc(100% - 2rem); max-width: 1280px;` (no paddings; use site-wide)
- Body: soft bg + subtle dot grid (do not stack `.dot-grid` on cards)
- `.eyebrow` - mono label  
- `.surface-card` - white rounded bordered surface for work tiles / tool UIs  
- `.btn-pill` / `.btn-pill-primary` - shared CTA shapes  
- Tool cards: icon (brand-green) left + title; description on next line, one line truncate  

---

## Homepage layout (Marc Lou structure)

```
┌──────────────────────────────────────────────────────────┐
│  Floating pill header (site nav)                         │
├────────────────────┬─────────────────────────────────────┤
│  PROFILE (sticky)  │  WORK BOARD                         │
│  photo             │  Featured apps (taller cards)       │
│  name              │  More apps (compact cards)          │
│  role line         │  Tools (compact rows/cards)         │
│  short bio         │                                     │
│  [Hire me] [Work]  │                                     │
│  socials           │                                     │
└────────────────────┴─────────────────────────────────────┘
```

**Desktop (`lg+`):** ~320–360px sticky profile | fluid work grid (2 columns).  
**Mobile:** profile block on top → work sections below.

### Profile panel (left)

Shows professional identity at a glance:
1. Photo  
2. Name  
3. Role (Software Engineer · Finance background)  
4. What you build (financial + business · web & mobile · sites & Shopify)  
5. Dual CTA: contact for hire **and** freelance  
6. Social links  

Copy can stay placeholder; structure stays stable.

### Work board (right)

1. **Featured** - finance / business anchors (taller cards: logo, title, one line, optional badge)  
2. **More apps** - compact cards  
3. **Tools** - compact, secondary  

No revenue charts required (Marc Lou uses them for indie SaaS; optional later if you have real metrics).

---

## Site chrome

- **Header:** floating pill; Work / Services / Projects / Tools / Contact  
- **Footer:** slim; identity one-liner + links (don’t compete with profile panel)  
- Inner pages keep same tokens; can use standard section bands until redesigned  

---

## Accessibility & SEO

- Contrast ≥ 4.5:1  
- Visible focus rings  
- Canonical + schema on pages as needed  
- Images: descriptive `alt`  
- Tap targets ≥ 44px  

---

## Changelog

- **2026-08-12** - v2 hybrid: Aria visual system + Marc Lou profile/work-grid layout. Positioning reframed for finance-background engineer building apps (hire or freelance).  
- **2026-07-31** - v1 Aria-inspired long-scroll homepage.

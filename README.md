# Manny Develops

Photography portfolio + business site for **Manuel Peña** — street, wedding, fitness, and brand photography out of Manhattan, NYC.

Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint TypeScript + JSX |

## Project layout

```
app/
  layout.tsx              ← root: fonts (Newsreader / Manrope / JetBrains Mono), ThemeProvider, <html data-theme>
  globals.css             ← Tailwind v4 + @theme tokens + @keyframes + dark variant
  (site)/                 ← route group sharing Nav + Footer + StickyOptIn
    layout.tsx
    page.tsx              ← /         Home
    work/page.tsx         ← /work     Portfolio
    services/page.tsx
    shop/page.tsx
    about/page.tsx
    reviews/page.tsx
    journal/page.tsx      ← /journal  Blog
    contact/page.tsx
  links/page.tsx          ← /links    Bio-link page (standalone, no chrome)
components/
  Nav.tsx, Footer.tsx, StickyOptIn.tsx, ThemeToggle.tsx, ThemeProvider.tsx
  ui/Button.tsx, ui/Chip.tsx, ui/Label.tsx
lib/
  content.ts              ← typed content (photos, posts, prints, presets, reviews)
public/
  photos/                 ← 92 catalog JPEGs
  presets/                ← 10 preset card PNGs
  headshot.jpg
```

## Status — what isn't wired yet

The site renders the full design (all 9 routes, light + dark, responsive). Several flows are intentionally front-end only and need a backend pass before launch:

- **Inquiry form** (`/contact`) — no submission target
- **Lead-magnet email capture** (Home + Services pricing PDF + sticky bottom strip) — no list backend
- **Scheduler** (`/contact`) — visual mock; needs a real Calendly / Cal.com embed
- **Shop checkout** (`/shop`) — print + preset purchase isn't wired to Stripe / Shopify

## Placeholder content flagged for review

These numbers came from earlier design sessions and need owner confirmation before launch:

- **Pricing** — Half Day $850 / Full Day $2,400 / Story $5,800
- **Reviews stats** — `87 shoots`, `94% rebookings`, `5.0 / 38 reviews`
- **Testimonials** — 6 quotes; replace with real client emails before launch
- **Press logos** — keep only the ones that are actually real placements

## Tech notes

- **Theme** — `next-themes` with `attribute="data-theme"`. The dark Tailwind variant is wired via `@custom-variant dark` in `globals.css` so `dark:` utilities respond to the `data-theme` attribute, not `prefers-color-scheme`.
- **Images** — all photos served from `/public`. `next/image` with `fill` is used inside fixed-aspect-ratio containers across the site for automatic AVIF/WebP and responsive sizing.
- **Fonts** — `next/font/google` loads Newsreader, Manrope, JetBrains Mono and exposes them as CSS variables consumed by Tailwind v4's `@theme` block.

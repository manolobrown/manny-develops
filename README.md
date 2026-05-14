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

## Backend wiring — environment variables

Copy `.env.example` → `.env.local` and fill in the values for the services you've set up. The site **runs without any of these** — every form falls back to a console-warn dev mode that shows the "thanks" UI without delivering. Wire them in this order:

| Var | Purpose | Service to sign up for |
|---|---|---|
| `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL` | Contact form delivery | [Resend](https://resend.com) — verify `mannydevelops.com` first |
| `KIT_API_KEY` + four `KIT_FORM_*_ID` | Email lead-magnet captures (presets, pricing-guide, newsletter, sticky) | [Kit / ConvertKit](https://app.kit.com) — create three forms with auto-responders |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Contact spam protection (optional) | [Cloudflare Turnstile](https://dash.cloudflare.com/) |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Shop checkout (Phase 2 — not wired yet) | [Stripe](https://stripe.com) — Payment Links for each SKU |

`SITE_URL` defaults to `https://mannydevelops.com` — override via `NEXT_PUBLIC_SITE_URL` for preview deploys.

## Status — what isn't wired yet

The site renders the full design (all 9 routes, light + dark, responsive). Forms render with full validation + success/error UI, but actual delivery is opt-in via the env vars above. Specifically:

- **Inquiry form** (`/contact`) — wired through a Server Action; delivers via Resend when `RESEND_API_KEY` is set. Without it, requests log to the dev console and show the success UI.
- **Lead-magnet email capture** (Home + Services pricing PDF + Journal newsletter + sticky bottom strip) — all four post to `/api/subscribe`, which forwards to Kit when `KIT_API_KEY` + the appropriate `KIT_FORM_*_ID` are set.
- **Scheduler** (`/contact`) — visual mock; needs a real Cal.com / Calendly embed (Phase 2A in the roadmap).
- **Shop checkout** (`/shop`) — print + preset CTAs are visual; need Stripe Payment Links + a webhook for digital fulfillment (Phase 2B).

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

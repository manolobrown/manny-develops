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

## Status — what's wired

The site renders the full design (11 routes, light + dark, responsive). Phase 1 + Phase 2A + Phase 2C are live:

- **Inquiry form** (`/contact`) — Server Action with zod validation + Cloudflare Turnstile, delivers via Resend
- **Lead-magnet email capture** (4 surfaces) — posts to `/api/subscribe`, forwards to Kit (ConvertKit), source-tagged
- **Scheduler** (`/contact`) — Cal.com embed across 3 event types, theme-matched
- **OG images** — per-route dynamic generation via next/og
- **SEO** — sitemap.xml, robots.txt, per-route metadata, JSON-LD structured data

- **Shop checkout** (`/shop`) — interactive size picker + Stripe Payment Link wiring is in place. Each print/pack uses its `checkoutLink` URL when set, falls back to a `/contact` "Inquire" link otherwise. Configure links in `lib/content.ts` (see "Stripe Payment Links" below).
- **Privacy + Terms** (`/privacy` and `/terms`) — boilerplate copy with TODOs flagged in red. Fill in the entity, retainer, governing-law state, and hosting provider before launch.

Outstanding:

- **Stripe webhook** — Phase 2B.2; needed only if you want automated digital fulfillment for the preset pack. For v1, Stripe's built-in receipt + the Payment Link's after-payment redirect handle delivery.
- **Editorial depth** — per-print case studies, FAQ, real long-form journal posts (Phase 4)

## Stripe Payment Links

Each print SKU (one per size × edition) and the paid preset pack needs its own Stripe Payment Link. The shop UI uses these URLs directly — no Stripe API call from the site, no webhook required for v1.

1. **Create a Payment Link** for each item in the Stripe dashboard: [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links) → New
   - Product name: copy from `lib/content.ts` (e.g., "Chevy, Mount Sinai · 11×14")
   - Price: USD, one per size; match the `priceFrom` (or override per-size in `prices`)
   - Image: upload the print photo (helps cart conversion)
   - Shipping: set rates and zones (US, international)
   - After payment: for physical prints, the default Stripe confirmation page is fine; for the preset pack, redirect to a custom URL where the customer can download the file
2. **Paste the URL** into `lib/content.ts`:
   ```ts
   PRINTS[i].checkoutLinks = {
     "11×14": "https://buy.stripe.com/test_xxx",
     "16×20": "https://buy.stripe.com/test_yyy",
   };
   PRESET_PACKS[i].checkoutLink = "https://buy.stripe.com/test_zzz";
   ```
3. **Per-size price overrides** (optional): if any size price differs from `priceFrom`, set `PRINTS[i].prices = { "16×20": 145, ... }`. The card label switches from "From $X" to "$X" when a per-size price is set.
4. **Partial rollout is safe**: a print without a `checkoutLink` for the selected size shows "Inquire ↗" linking to the contact form. Roll out one collection at a time.

## Pre-launch checklist

Items that aren't code but must be true before the site goes public. Verify each before pointing DNS at this app.

### Email infrastructure
- [ ] **Resend domain verification** — `mannydevelops.com` shows ✅ on all DKIM/SPF/DMARC records in [Resend → Domains](https://resend.com/domains). Without this, inquiry-reply emails land in spam.
- [ ] **Resend sending limit** — confirm the free tier ceiling is enough, or upgrade.
- [ ] **Kit auto-responders** — each of the three Kit forms (Presets / Pricing guide / Newsletter) has an email template configured AND the asset URL points to a real file you've hosted somewhere:
  - [ ] Preset zip file uploaded (Cloudflare R2 / S3 / `public/downloads`)
  - [ ] Pricing-guide PDF uploaded
  - [ ] Newsletter welcome email is conversational (or stays empty if you'd rather not auto-send anything)

### Legal
- [ ] **Privacy + Terms TODOs** filled in. Open `/privacy` and `/terms` — every red `TODO` block has been resolved (business entity type, hosting provider, retainer %, governing-law state, etc.)
- [ ] **Privacy policy reviewed** by a lawyer if you can afford it. The current copy is a starting point, not legal advice.

### Content
- [ ] **Pricing confirmed** — Half Day $850 / Full Day $2,400 / Story $5,800 in `lib/content.ts` and the add-on table in `app/(site)/services/page.tsx` reflect your real rates.
- [ ] **Real testimonials** — all 6 entries in `REVIEWS` (lib/content.ts) replaced with real client quotes; consider keeping `name` + `role` permission-checked.
- [ ] **Real Reviews stats** — the four stats on `/reviews` (`5.0 / 38 reviews`, `87 shoots`, `94% rebookings`, `48hr replies`) are either accurate or removed.
- [ ] **Press logos on About** — `Essex Squeeze × Nike`, `LFI Gallery — Leica`, `@street_mp_`, `Streets in Frame`, `Subway Stories` are all real placements. Remove ones that aren't.
- [ ] **Google Reviews link on /reviews** — the "Open in Google" CTA currently points to `#`. Update with the real Google Business Profile review URL.
- [ ] **Dev/photographer positioning** — decide whether `/about`'s `Photographer & web developer` section stays, softens to one sentence, or splits to its own micro-site.

### Infrastructure
- [ ] **Hosting picked + DNS pointed** — Vercel, Cloudflare Pages, etc. Update the privacy policy's hosting-provider TODO once decided.
- [ ] **`NEXT_PUBLIC_SITE_URL`** set to the production URL on the host (defaults to `https://mannydevelops.com`).
- [ ] **HTTPS** — host should auto-provision a TLS cert.
- [ ] **`.env` vars set on production** — copy from `.env.local`, double-check that secret keys are production (not test) values for Stripe/Turnstile when those go live.
- [ ] **Google Search Console** — submit `https://mannydevelops.com/sitemap.xml` after first deploy.
- [ ] **Spam-test** the contact form from a fresh browser (no Turnstile cookies) — verify Turnstile challenge fires and a submission lands in inbox.

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

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use            # required — picks up .nvmrc (Node 20.19.0). System default is Node 11, which won't run Next 15.
npm install
npm run dev        # http://localhost:3000
npm run build      # static prerender of all 9 routes
npm run lint       # next lint (eslint flat config)
npm run start      # serve the production build
```

There are no tests in this project yet — the design was ported from a Claude Design HTML prototype and verification has been visual-parity against the source bundle.

## Architecture

**Single-purpose marketing site** — a photography portfolio + business site for Manuel Peña ("Manny Develops"). Built with **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + next-themes**. No backend; every form is currently a `preventDefault` stub plus a "thanks" state (see `components/EmailCaptureForm.tsx` for the pattern). Future work is wiring inquiry, lead-magnet, and scheduler flows to real services.

### Routes — two layout groups
- `app/(site)/*` — every page that shares the **Nav + Footer + StickyOptIn** chrome. The route group exists *only* to scope that layout; URLs are still `/`, `/work`, `/services`, `/shop`, `/about`, `/reviews`, `/journal`, `/contact`.
- `app/links/*` — the bio-link page is intentionally **outside** the group so it renders with no chrome at all. Don't move it inside `(site)` thinking it's a stray.

### Theming — `[data-theme]` not `prefers-color-scheme`
- `components/ThemeProvider.tsx` uses `next-themes` with `attribute="data-theme"` (set on `<html>`).
- `app/globals.css` declares `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` so Tailwind's `dark:` utilities respond to that attribute, not the OS preference.
- Color tokens live as CSS variables in `:root` and `[data-theme="dark"]` blocks; `@theme` in the same file maps them to Tailwind utilities (`bg-bg`, `text-fg`, `border-line-soft`, etc.).
- Don't add color literals to components. Reach for the token utilities.

### Styling — Tailwind v4 with `@theme` tokens, no `tailwind.config.js`
- Design tokens (colors, fonts, spacing, animation keyframes) all live in `app/globals.css` under `@theme { ... }`. There's no separate config file — Tailwind v4 is CSS-first.
- Fonts (Newsreader, Manrope, JetBrains Mono) come from `next/font/google` in `app/layout.tsx` and are exposed as CSS variables (`--font-newsreader`, etc.) that `@theme` consumes.
- The prototype's per-page CSS was converted to utility classes inline in JSX. Arbitrary values like `text-[clamp(72px,11vw,180px)]` and `tracking-[-0.035em]` are intentional — they preserve the prototype's typography exactly. Don't approximate.
- Shared UI primitives in `components/ui/` (`Button`, `Chip`, `Label`) — use these instead of hand-rolling button styles. Pages reach for them ~5+ times each.

### Server vs client components
- Pages are server components by default. Routes with **filter state or form interactivity** must opt into `"use client"` at the top: currently `/work`, `/shop`, `/journal`, `/contact` (state) and the chrome bits `Nav`, `ThemeToggle`, `StickyOptIn`, `ThemeProvider`, `EmailCaptureForm` (state or hooks).
- If you add a form to an otherwise-static page, **extract the form into a client component** rather than marking the whole page client — keeps SSR for the rest. `app/(site)/page.tsx` does this with `<EmailCaptureForm />`.

### Content / data
- `lib/content.ts` is the single source of truth for typed content: `IMG`, `POSTS`, `PRINTS`, `COLLECTIONS`, `PRESETS`, `PRESET_PACKS`, `REVIEWS`, `NAV_LINKS`. Image paths are absolute (`/photos/...`, `/presets/...`, `/headshot.jpg`) and resolve to `public/`.
- The portfolio page (`/work`) and Contact scheduler intentionally keep their local data inline because it's heavily UI-shaped (category counts, available days, time slots). Don't promote those into `lib/content.ts` unless they get reused.

### Images
- All 92 catalog photos + 10 preset PNGs + headshot live in `public/`. Total ~346MB. They're served via `next/image` with `fill` inside aspect-ratio containers. Don't add new photos without confirming they're meant to ship in the repo (vs. a CDN).
- Hero image (`night-4.jpg`) gets `priority` on the Home page. Everything else is lazy.

### Path alias
- `@/*` resolves to the repo root (see `tsconfig.json`). Use `@/components/...`, `@/lib/...` rather than relative `../../...`.

## Constraints / placeholders to know about

- **Pricing** (Half Day $850 / Full Day $2,400 / Story $5,800), **Reviews stats** (87 shoots / 94% rebook / 5.0 of 38 reviews), and the **6 testimonials** in `lib/content.ts` are placeholders from the design phase that need owner confirmation before launch. Flagged in `README.md`.
- The Contact scheduler is a **visual mock** — calendar days and time slots are hardcoded arrays in `app/(site)/contact/page.tsx`. Wiring a real Cal.com/Calendly embed is a future task.
- Shop checkout, inquiry submission, and email opt-ins do **not** post anywhere. The success state is local-only.

## Source bundle

The Claude Design handoff this repo was ported from lives at `/tmp/design-package/photography-portfolio/` (extracted from the `/v1/design/h/...` API). When questions come up about *why* something looks the way it does (copy choices, photo crops, design intent), `chats/chat1.md` in that bundle has the full iteration history — it's the most reliable source for designer intent.

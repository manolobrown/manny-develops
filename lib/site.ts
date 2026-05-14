/* Canonical site config — referenced by sitemap, robots, metadata, and JSON-LD.
 * Override SITE_URL via the NEXT_PUBLIC_SITE_URL env var for preview deploys.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mannydevelops.com";

export const SITE = {
  name: "Manny Develops",
  fullName: "Manuel Peña",
  description:
    "Manuel Peña — photographer in Manhattan, NYC. Weddings, portraits, fitness, and editorial. Pictures that last.",
  city: "Manhattan, NY",
  email: "hello@mannydevelops.com",
  instagram: "https://instagram.com/manolobrown",
  url: SITE_URL,
};

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  ogImageAlt?: string;
};

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Manny Develops · Manuel Peña — Photographer, NYC",
    description: SITE.description,
  },
  {
    path: "/work",
    title: "The Work · Manny Develops",
    description:
      "Selected photography across street, weddings, fitness, and brand commissions in NYC — curated from a 280,515-frame Lightroom catalog.",
  },
  {
    path: "/services",
    title: "Services & Rates · Manny Develops",
    description:
      "Three honest tiers — Half Day, Full Day, and Story — plus add-ons. Wedding, portrait, family, brand and editorial photography in Manhattan, NYC.",
  },
  {
    path: "/shop",
    title: "Shop — Prints & Lightroom Presets · Manny Develops",
    description:
      "Archival pigment prints on Hahnemühle Photo Rag, plus a Lightroom preset pack reverse-engineered from a 280K-frame catalog.",
  },
  {
    path: "/about",
    title: "About · Manuel Peña, Photographer in Manhattan",
    description:
      "Nine years, 280,515 photos, 1,159 five-star selections. Self-taught photographer based in Manhattan, NYC.",
  },
  {
    path: "/reviews",
    title: "Reviews · Manny Develops",
    description:
      "Three years, 80+ shoots, and unedited testimonials from wedding, family, fitness, and commercial clients.",
  },
  {
    path: "/journal",
    title: "Field Notes · Manny Develops Journal",
    description:
      "Long-form writing on photography, weddings, fitness shoots, and editing — from a working photographer in NYC.",
  },
  {
    path: "/contact",
    title: "Get in Touch · Manny Develops",
    description:
      "Inquire about a shoot or book a 15-minute discovery call. Replies within 48 hours.",
  },
  {
    path: "/links",
    title: "Manuel Peña — Bio Links",
    description:
      "All my links in one place: bookings, free preset pack, portfolio, prints, and the journal.",
  },
  {
    path: "/privacy",
    title: "Privacy Policy · Manny Develops",
    description:
      "What this site collects, why, and how to ask for it back. Plain-English summary, not legal advice.",
  },
  {
    path: "/terms",
    title: "Terms of Service · Manny Develops",
    description:
      "How I work with photography clients in plain English. Specific shoots are governed by their signed contracts.",
  },
];

export function routeFor(path: string): RouteMeta {
  return ROUTES.find((r) => r.path === path) ?? ROUTES[0];
}

/* Build a Next.js Metadata object from a route. Pass to `export const metadata`. */
import type { Metadata } from "next";

export function metadataFor(path: string): Metadata {
  const r = routeFor(path);
  const url = `${SITE_URL}${r.path === "/" ? "" : r.path}`;
  return {
    title: r.title,
    description: r.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: r.title,
      description: r.description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
    },
  };
}

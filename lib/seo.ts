/* JSON-LD builders. Each function returns a plain object that should be
 * serialized into a <script type="application/ld+json"> tag.
 * Use <JsonLd> from components/JsonLd.tsx to render.
 */

import { SITE, SITE_URL, ROUTES, routeFor } from "@/lib/site";
import { REVIEWS, PRINTS, PRESETS, IMG, NAV_LINKS } from "@/lib/content";

/* The photographer / person + business identity — used on Home and About. */
export function personAndBusinessSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE.fullName,
      alternateName: SITE.name,
      url: SITE_URL,
      image: `${SITE_URL}${IMG.about}`,
      jobTitle: "Photographer",
      sameAs: [SITE.instagram],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manhattan",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE.name,
      url: SITE_URL,
      image: `${SITE_URL}${IMG.hero}`,
      description: SITE.description,
      priceRange: "$$",
      telephone: undefined,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manhattan",
        addressRegion: "NY",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: "New York",
      },
      founder: { "@id": `${SITE_URL}/#person` },
      // NOTE: aggregateRating uses the placeholder stats that the Reviews page flags
      // as "needs owner confirmation" — keep this in sync with /reviews when those resolve.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: 38,
        bestRating: "5",
        worstRating: "1",
      },
    },
  ];
}

/* Review × N — for the Reviews page. */
export function reviewsSchema() {
  return REVIEWS.map((r, i) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${SITE_URL}/reviews#${i}`,
    itemReviewed: { "@id": `${SITE_URL}/#business` },
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.stars,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Person", name: r.name },
    reviewBody: r.quote,
    datePublished: r.date,
  }));
}

/* CollectionPage + ItemList for the print shop. */
export function shopSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/shop`,
    name: "Shop — Prints & Lightroom Presets",
    url: `${SITE_URL}/shop`,
    description:
      "Archival pigment prints and a Lightroom preset pack from Manuel Peña.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PRINTS.length + PRESETS.length,
      itemListElement: [
        ...PRINTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: p.title,
            image: `${SITE_URL}${p.img}`,
            sku: p.id,
            category: p.collection,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: p.priceFrom,
              availability: "https://schema.org/InStock",
            },
          },
        })),
        ...PRESETS.map((p, i) => ({
          "@type": "ListItem",
          position: PRINTS.length + i + 1,
          item: {
            "@type": "Product",
            name: `${p.name} (Lightroom preset)`,
            image: `${SITE_URL}${p.img}`,
            sku: p.id,
            category: "Lightroom preset",
            description: p.desc,
          },
        })),
      ],
    },
  };
}

/* Generic WebPage schema for a route. */
export function webPageSchema(path: string) {
  const meta = routeFor(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path === "/" ? "" : path}#webpage`,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

/* WebSite — used on Home only, with site-wide search action stub. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en-US",
  };
}

/* BreadcrumbList — every non-root page. */
export function breadcrumbsSchema(path: string) {
  if (path === "/") return null;
  const meta = routeFor(path);
  // Match nav-link label when available, fall back to route title prefix
  const navMatch = NAV_LINKS.find((l) => l.href === path);
  const label = navMatch?.label ?? meta.title.split(" · ")[0];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

/* Article schema — for the journal page's featured post + each listed entry.
 * The blog doesn't have detail pages yet (Phase 4 work), so this is light. */
export function blogSchema() {
  // Use the existing POSTS data from lib/content as a Blog with ItemList
  // (Skip for now — light surface; will become Article-per-post in Phase 4)
  return null;
}

// Reference unused exports to avoid lint warnings; consumed by future Phase-4 work.
void ROUTES;

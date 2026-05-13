/* Shared content for the Manny Develops site.
 * All photography by Manuel Peña — curated from his 280,515-photo Lightroom catalog.
 * Asset paths are relative to /public.
 */

export type Project = {
  id: string;
  title: string;
  cat: string;
  date: string;
  cover: string;
  thumbs: string[];
};

export const IMG = {
  hero: "/photos/night-4.jpg",
  about: "/headshot.jpg",
  projects: [
    {
      id: "001",
      title: "Emily & Erick — the dress",
      cat: "Wedding",
      date: "October 2025",
      cover: "/photos/wedding.jpg",
      thumbs: ["/photos/wedding-2.jpg", "/photos/wedding-3.jpg"],
    },
    {
      id: "002",
      title: "Through the glass",
      cat: "Subway",
      date: "February 2024",
      cover: "/photos/window.jpg",
      thumbs: ["/photos/window-2.jpg", "/photos/subway.jpg"],
    },
    {
      id: "003",
      title: "Krank — anniversary",
      cat: "Fitness",
      date: "September 2024",
      cover: "/photos/krank.jpg",
      thumbs: ["/photos/krank-2.jpg", "/photos/krank-3.jpg"],
    },
    {
      id: "004",
      title: "Doyers St., dusk",
      cat: "After Dark",
      date: "November 2023",
      cover: "/photos/night.jpg",
      thumbs: ["/photos/night-2.jpg", "/photos/night-3.jpg"],
    },
    {
      id: "005",
      title: "Steam, 5th & 28th",
      cat: "Steam City",
      date: "January 2024",
      cover: "/photos/steam.jpg",
      thumbs: ["/photos/steam-2.jpg", "/photos/steam-3.jpg"],
    },
    {
      id: "006",
      title: "Reflections, after rain",
      cat: "Reflections",
      date: "April 2024",
      cover: "/photos/reflection.jpg",
      thumbs: ["/photos/reflection-2.jpg", "/photos/reflection-3.jpg"],
    },
  ] as Project[],
  portfolio: [
    "/photos/window.jpg",
    "/photos/krank.jpg",
    "/photos/wedding-2.jpg",
    "/photos/night.jpg",
    "/photos/steam.jpg",
    "/photos/reflection.jpg",
    "/photos/shadow.jpg",
    "/photos/red.jpg",
    "/photos/snow.jpg",
    "/photos/subway.jpg",
    "/photos/wedding-5.jpg",
    "/photos/night-2.jpg",
  ],
  blog: [
    "/photos/wedding.jpg",
    "/photos/window-2.jpg",
    "/photos/steam.jpg",
    "/photos/wedding-3.jpg",
    "/photos/reflection.jpg",
    "/photos/red.jpg",
    "/photos/night.jpg",
  ],
};

export type Post = {
  date: string;
  cat: string;
  title: string;
  read: string;
  img: string;
};

export const POSTS: Post[] = [
  { date: "Apr 22, 2026", cat: "Wedding", title: "Your complete NYC wedding photography timeline.", read: "9 min", img: "/photos/wedding.jpg" },
  { date: "Apr 18, 2026", cat: "Shoots",  title: "Emily & Erick — a wedding in October.",            read: "8 min", img: "/photos/wedding-2.jpg" },
  { date: "Apr 12, 2026", cat: "Tips",    title: "What to wear for portraits — a soft guide.",       read: "5 min", img: "/photos/window-2.jpg" },
  { date: "Apr 06, 2026", cat: "Fitness", title: "How professional photos help personal trainers book out.", read: "6 min", img: "/photos/krank.jpg" },
  { date: "Apr 02, 2026", cat: "Journal", title: "On showing up early.",                              read: "3 min", img: "/photos/steam.jpg" },
  { date: "Mar 28, 2026", cat: "BTS",     title: "How I edit a wedding (without losing my mind).",   read: "6 min", img: "/photos/wedding-3.jpg" },
  { date: "Mar 22, 2026", cat: "Events",  title: "Why every corporate event needs a real photographer.", read: "4 min", img: "/photos/night-2.jpg" },
  { date: "Mar 19, 2026", cat: "Shoots",  title: "Krank · anniversary day.",                          read: "4 min", img: "/photos/krank-2.jpg" },
  { date: "Mar 14, 2026", cat: "Wedding", title: "Fifteen wedding photo locations across NYC, ranked.", read: "7 min", img: "/photos/wedding-5.jpg" },
  { date: "Mar 10, 2026", cat: "Tips",    title: "Five questions to ask before you book.",            read: "5 min", img: "/photos/red.jpg" },
];

export type Print = {
  id: string;
  title: string;
  edition: string;
  sizes: string[];
  priceFrom: number;
  collection: string;
  img: string;
};

export const PRINTS: Print[] = [
  { id: "P-001", title: "Through the Glass · Vol. 01", edition: "Open",          sizes: ["8×10", "11×14", "16×20"],          priceFrom: 95,  collection: "Through the Glass", img: "/photos/window.jpg" },
  { id: "P-002", title: "Shadow Play · Chambers",      edition: "Open",          sizes: ["8×10", "11×14", "16×20"],          priceFrom: 95,  collection: "Shadow Play",       img: "/photos/shadow.jpg" },
  { id: "P-003", title: "Steam, 5th & 28th",            edition: "Open",          sizes: ["11×14", "16×20", "24×36"],         priceFrom: 110, collection: "Steam City",        img: "/photos/steam.jpg" },
  { id: "P-004", title: "Subway, 8:47 AM",              edition: "Open",          sizes: ["8×10", "11×14", "16×20"],          priceFrom: 95,  collection: "Through the Glass", img: "/photos/subway.jpg" },
  { id: "P-005", title: "Chevy, Mount Sinai",           edition: "Limited / 25",  sizes: ["11×14", "16×20"],                  priceFrom: 165, collection: "After Dark",        img: "/photos/night-4.jpg" },
  { id: "P-006", title: "Reflections · 14th St.",       edition: "Limited / 25",  sizes: ["11×14", "16×20"],                  priceFrom: 165, collection: "Reflections",       img: "/photos/reflection.jpg" },
  { id: "P-007", title: "Doyers St., after dark",       edition: "Limited / 25",  sizes: ["11×14", "16×20", "24×36"],         priceFrom: 165, collection: "After Dark",        img: "/photos/night.jpg" },
  { id: "P-008", title: "White Out, January",           edition: "Seasonal / 30", sizes: ["8×10", "11×14", "16×20"],          priceFrom: 125, collection: "White Out",         img: "/photos/snow.jpg" },
  { id: "P-009", title: "Red, July",                    edition: "Limited / 15",  sizes: ["11×14", "16×20"],                  priceFrom: 195, collection: "Red",               img: "/photos/red.jpg" },
];

export type Collection = {
  id: string;
  label: string;
  count: number;
  sub?: string;
};

export const COLLECTIONS: Collection[] = [
  { id: "All",                label: "All collections",   count: 9 },
  { id: "Through the Glass",  label: "Through the Glass", count: 2, sub: "Window + Subway — 250+ photos" },
  { id: "Shadow Play",        label: "Shadow Play",        count: 1, sub: "109 photos in series" },
  { id: "Steam City",         label: "Steam City",         count: 1, sub: "72 photos in series" },
  { id: "After Dark",         label: "After Dark",         count: 2, sub: "86 photos — limited /25" },
  { id: "Reflections",        label: "Reflections",        count: 1, sub: "53 photos — limited /25" },
  { id: "Red",                label: "Red",                count: 1, sub: "28 photos — limited /15" },
  { id: "White Out",          label: "White Out",          count: 1, sub: "29 photos — seasonal" },
];

export type Preset = {
  id: string;
  n: string;
  name: string;
  desc: string;
  source: number;
  collection: string;
  accent: string;
  img: string;
};

export const PRESETS: Preset[] = [
  { id: "PR-01", n: "01", name: "Street Classic", desc: "Your signature look — moody highlights, lifted shadows, classic NYC.",   source: 340, collection: "Best Photos", accent: "#E0CFA8", img: "/presets/01_Street_Classic.png" },
  { id: "PR-02", n: "02", name: "Shadow Play",     desc: "Deep blacks and drama — pairs with alleys, fire escapes, hard light.",   source: 88,  collection: "Shadows",     accent: "#B5A47C", img: "/presets/02_Shadow_Play.png" },
  { id: "PR-03", n: "03", name: "NYC Golden",      desc: "Warm afternoon light, tuned to your 5–7pm captures.",                    source: 286, collection: "Golden hour", accent: "#E4B767", img: "/presets/03_NYC_Golden.png" },
  { id: "PR-04", n: "04", name: "Subway Moody",    desc: "Extra clarity and dehaze, built for fluorescent + tungsten underground.", source: 96,  collection: "Subway",      accent: "#5E6B7A", img: "/presets/04_Subway_Moody.png" },
  { id: "PR-05", n: "05", name: "Rainy Day",       desc: "Cool mood and reflections — for wet streets and overcast light.",         source: 37,  collection: "Umbrella",    accent: "#7A98B4", img: "/presets/05_Rainy_Day.png" },
  { id: "PR-06", n: "06", name: "Neon Nights",     desc: "Saturated, dehazed, vibrant — for after-dark city color.",                source: 148, collection: "Night",       accent: "#C7456F", img: "/presets/06_Neon_Nights.png" },
  { id: "PR-07", n: "07", name: "Steam City",      desc: "Industrial atmosphere — soft highlights, grain, gentle haze.",            source: 57,  collection: "Steam",       accent: "#A8A39A", img: "/presets/07_Steam_City.png" },
  { id: "PR-08", n: "08", name: "Red Pop",         desc: "Selective color punch — desaturates everything except reds.",             source: 23,  collection: "Red accents", accent: "#D7322C", img: "/presets/08_Red_Pop.png" },
  { id: "PR-09", n: "09", name: "Snow Day",        desc: "Bright and clean cold — built for winter and overcast captures.",         source: 21,  collection: "Snow",        accent: "#C7D1DC", img: "/presets/09_Snow_Day.png" },
  { id: "PR-10", n: "10", name: "Film Fade",       desc: "Muted analog tones with heavier grain — inspired by your Leica gallery.", source: 101, collection: "LFI Gallery", accent: "#BFA487", img: "/presets/10_Film_Fade.png" },
];

export type PresetPack = {
  id: string;
  name: string;
  size: string;
  price: number;
  includes: string[];
  desc: string;
  cta: string;
  featured?: boolean;
};

export const PRESET_PACKS: PresetPack[] = [
  {
    id: "PK-FREE",
    name: "Free Sampler",
    size: "3 presets",
    price: 0,
    includes: ["Street Classic", "Shadow Play", "NYC Golden"],
    desc: "Three of the recipes I reach for most. On the house — no email gate, no follow-up sequence.",
    cta: "Download free pack",
  },
  {
    id: "PK-FULL",
    name: "Full Pack",
    size: "10 presets",
    price: 38,
    includes: [
      "All 10 presets",
      ".xmp + .dng formats",
      "Lightroom Classic + CC + Mobile",
      "Install guide PDF",
      "Free updates",
    ],
    desc: "The complete set — every recipe extracted from 280,515 photos and 1,159 five-star selections in my catalog.",
    cta: "Buy the full pack",
    featured: true,
  },
];

export type Review = {
  quote: string;
  name: string;
  role: string;
  stars: number;
  date: string;
};

export const REVIEWS: Review[] = [
  { quote: "Manny made our wedding day feel like itself — quiet, warm, ours. We open the album every month.",                 name: "Jess & Sam",          role: "Wedding · Manhattan",   stars: 5, date: "Oct 2025" },
  { quote: "The campaign images outperformed every previous shoot. He sees what we couldn't have asked for.",                  name: "Studio Aro",          role: "Creative Director",     stars: 5, date: "Jun 2025" },
  { quote: "Booked a content day for our gym. Two weeks later, every trainer's feed looked like a magazine.",                   name: "Field House Fitness", role: "Owner · Chelsea",       stars: 5, date: "Feb 2026" },
  { quote: "Calm, fast, kind. Our family photos are the only ones our kids actually like.",                                     name: "The Hayes Family",    role: "Family · Park Slope",   stars: 5, date: "Sep 2024" },
  { quote: "I've worked with a lot of photographers. Manny is the only one who showed up an hour early just to walk the venue.", name: "Lila Marin",          role: "Wedding planner",       stars: 5, date: "Aug 2025" },
  { quote: "Honest pricing, beautiful work, fast turnaround. Re-booked him three times this year.",                              name: "Mara Editorial",      role: "Editor-in-Chief",       stars: 5, date: "Mar 2026" },
];

/* Nav links — single source of truth used by both Nav and Footer */
export const NAV_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/work",     label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/shop",     label: "Shop" },
  { href: "/about",    label: "About" },
  { href: "/journal",  label: "Journal" },
  { href: "/contact",  label: "Contact" },
];

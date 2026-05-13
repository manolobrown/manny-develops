"use client";

import Image from "next/image";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

type Cat = "All" | "Street" | "Wedding" | "Fitness" | "Brand";

type Item = {
  title: string;
  series: string;
  date: string;
  cat: Cat;
  img: string;
};

const CATS: { id: Cat; label: string; count: number }[] = [
  { id: "All",     label: "All",                count: 134 },
  { id: "Street",  label: "Street · Portrait",  count: 824 },
  { id: "Wedding", label: "Weddings",           count: 319 },
  { id: "Fitness", label: "Fitness & Gyms",     count: 487 },
  { id: "Brand",   label: "Brand & Commercial", count: 18  },
];

const ITEMS: Item[] = [
  { title: "Through the glass",            series: "Subway · Window",        date: "Feb 2024", cat: "Street",  img: "/photos/window.jpg" },
  { title: "Emily & Erick — the dress",    series: "Wedding · Emily & Erick", date: "Oct 2025", cat: "Wedding", img: "/photos/wedding.jpg" },
  { title: "Krank · anniversary",          series: "Fitness · Krank",         date: "Sep 2024", cat: "Fitness", img: "/photos/krank.jpg" },
  { title: "Doyers St., dusk",             series: "Street · Night",          date: "Nov 2023", cat: "Street",  img: "/photos/night.jpg" },
  { title: "Steam, 5th & 28th",            series: "Street · Steam",          date: "Jan 2024", cat: "Street",  img: "/photos/steam.jpg" },
  { title: "Reflections, after rain",      series: "Street · Reflection",     date: "Apr 2024", cat: "Street",  img: "/photos/reflection.jpg" },
  { title: "Essex Squeeze × Nike",         series: "Brand · Nike",            date: "Aug 2024", cat: "Brand",   img: "/photos/krank-3.jpg" },
  { title: "Shadow play, Chambers",        series: "Street · Shadow",         date: "Jul 2024", cat: "Street",  img: "/photos/shadow.jpg" },
  { title: "Emily & Erick — the walk in",  series: "Wedding · Emily & Erick", date: "Oct 2025", cat: "Wedding", img: "/photos/wedding-2.jpg" },
  { title: "Chevy, Mount Sinai",           series: "Street · Night",          date: "Dec 2023", cat: "Street",  img: "/photos/night-4.jpg" },
  { title: "Krank · games",                series: "Fitness · Krank",         date: "Jun 2024", cat: "Fitness", img: "/photos/krank-2.jpg" },
  { title: "White out, January",           series: "Street · Snow",           date: "Jan 2024", cat: "Street",  img: "/photos/snow.jpg" },
  { title: "Red, July",                    series: "Street · Red",            date: "Jul 2023", cat: "Street",  img: "/photos/red.jpg" },
  { title: "Emily & Erick — first look",   series: "Wedding · Emily & Erick", date: "Oct 2025", cat: "Wedding", img: "/photos/wedding-5.jpg" },
  { title: "Subway, late afternoon",       series: "Subway · Window",         date: "Mar 2024", cat: "Street",  img: "/photos/subway.jpg" },
  { title: "Krank · in the gym",           series: "Fitness · Krank",         date: "Feb 2024", cat: "Fitness", img: "/photos/krank-4.jpg" },
];

export default function WorkPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.cat === active);

  return (
    <div className="mx-auto w-full max-w-site px-(--spacing-gutter) animate-page-fade">
      <header className="flex flex-wrap items-end justify-between gap-7 border-b border-line-soft py-9">
        <div>
          <Label>— Archive · 2016 → 2026</Label>
          <h1 className="mt-3 font-serif text-[clamp(80px,12vw,200px)] font-extralight leading-[0.85] tracking-[-0.04em]">
            The <em className="font-light italic">work</em>.
          </h1>
        </div>
        <div className="flex flex-col items-end gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">
          <span><strong className="font-medium text-fg">1,159</strong> five-star frames</span>
          <span><strong className="font-medium text-fg">280,515</strong> photos curated from</span>
        </div>
      </header>

      <div
        className="sticky top-[65px] z-10 mb-9 flex flex-wrap items-center justify-between gap-3 border-b border-line-soft py-[22px] backdrop-blur-sm"
        style={{ background: "color-mix(in srgb, var(--color-bg) 92%, transparent)" }}
      >
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <Chip
              key={c.id}
              pressed={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.label} <span className="opacity-50">{c.count}</span>
            </Chip>
          ))}
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">Sort — Recent ↓</div>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-7 max-[880px]:grid-cols-2">
        {filtered.map((it, i) => (
          <article key={`${it.title}-${i}`} className="flex flex-col gap-3 cursor-pointer">
            <div className="group relative aspect-[4/5] overflow-hidden bg-bg-2">
              <Image
                src={it.img}
                alt={it.title}
                fill
                sizes="(max-width: 880px) 50vw, 33vw"
                className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-2">
              <span>
                {String(i + 1).padStart(3, "0")} · {it.series}
              </span>
              <span>{it.date}</span>
            </div>
            <div className="font-serif text-[22px] font-light leading-[1.1] tracking-[-0.01em]">
              <em className="italic">{it.title}.</em>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 flex justify-center border-t border-line-soft pt-8">
        <Button variant="ghost">
          Load more <span>↓</span>
        </Button>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { POSTS } from "@/lib/content";

const CATS = ["All", "Wedding", "Fitness", "Events", "Shoots", "Tips", "Journal", "BTS"];

export default function JournalPage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? POSTS : POSTS.filter((p) => p.cat === filter);
  const featured = filtered[0] ?? POSTS[0];
  const rest = filtered.slice(1);

  const lede =
    featured.cat === "Wedding"
      ? "Everything I wish every couple knew before the day — timeline, light, getting-ready, golden hour, and the small moments that always disappear without a plan."
      : featured.cat === "Fitness"
      ? "Why pro photos are the highest-leverage spend a personal trainer can make — with real before/after numbers from clients I've shot for."
      : featured.cat === "Events"
      ? "A practical guide to event coverage — what to brief, what to budget, and the shots that actually get used by marketing afterwards."
      : "A long-form piece with the pictures and the thinking behind a recent shoot. The kind of post that takes a quiet afternoon and a coffee to read.";

  return (
    <div className="mx-auto w-full max-w-site px-(--spacing-gutter) animate-page-fade">
      <header className="py-9">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>— The Journal · Issue 04</Label>
            <h1 className="mt-3 font-serif text-[clamp(80px,12vw,200px)] font-extralight leading-[0.85] tracking-[-0.04em]">
              Field <em className="font-light italic">notes</em>.
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Chip key={c} pressed={filter === c} onClick={() => setFilter(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </header>

      {featured && (
        <article className="mb-14 grid grid-cols-[1.3fr_1fr] items-center gap-12 border-b border-line-soft pb-16 pt-12 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden bg-bg-2">
            <Image
              src={featured.img}
              alt=""
              fill
              sizes="(max-width: 880px) 100vw, 60vw"
              className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">
              <span>Featured</span>
              <span>·</span>
              <span>{featured.cat}</span>
              <span>·</span>
              <span>{featured.date}</span>
            </div>
            <h2 className="mt-4 mb-6 font-serif text-[clamp(40px,5vw,72px)] font-light leading-[0.95] tracking-[-0.025em]">
              <em className="italic">{featured.title}</em>
            </h2>
            <p className="m-0 mb-7 font-serif text-[19px] font-light leading-[1.5] text-fg-2 text-balance">
              {lede}
            </p>
            <Button variant="ghost" arrow>Read the story</Button>
          </div>
        </article>
      )}

      <div className="grid grid-cols-3 gap-x-7 gap-y-9 max-[880px]:grid-cols-2">
        {rest.map((p, i) => (
          <article key={i} className="flex cursor-pointer flex-col gap-3.5">
            <div className="group relative aspect-[4/3] overflow-hidden bg-bg-2">
              <Image
                src={p.img}
                alt=""
                fill
                sizes="(max-width: 880px) 50vw, 33vw"
                className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-2">
              <span>{p.cat}</span>
              <span className="inline-block h-px w-3 bg-line-soft" />
              <span>{p.date}</span>
              <span className="inline-block h-px w-3 bg-line-soft" />
              <span>{p.read}</span>
            </div>
            <h3 className="m-0 font-serif text-[26px] font-light leading-[1.15] tracking-[-0.01em]">
              <em className="italic">{p.title}</em>
            </h3>
            <p className="m-0 font-sans text-[14px] leading-[1.5] text-fg-2">
              A short paragraph from the post — enough to give you a sense of what&rsquo;s inside, without giving the
              whole thing away.
            </p>
          </article>
        ))}
      </div>

      {/* Newsletter */}
      <section className="mt-24 grid grid-cols-2 items-center gap-16 border-y border-line-soft py-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
        <div>
          <Label>— Subscribe</Label>
          <h3 className="mt-3 font-serif text-[clamp(40px,5vw,64px)] font-light leading-none tracking-[-0.02em]">
            A letter,
            <br />
            <em className="italic">once a month</em>.
          </h3>
        </div>
        <div>
          <p className="m-0 mb-6 font-serif text-[18px] font-light leading-[1.5] text-fg-2">
            New shoots, the occasional tip, and a single picture I&rsquo;m thinking about. No spam.
          </p>
          <EmailCaptureForm cta="Subscribe ↗" />
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { COLLECTIONS, PRINTS, PRESET_PACKS, PRESETS } from "@/lib/content";

export default function ShopPage() {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? PRINTS : PRINTS.filter((p) => p.collection === filter);

  return (
    <div className="mx-auto w-full max-w-site px-(--spacing-gutter) animate-page-fade">
      {/* Header */}
      <section className="grid grid-cols-[1.4fr_1fr] items-end gap-12 border-b border-line-soft py-12 max-[880px]:grid-cols-1 max-[880px]:gap-6">
        <div>
          <Label>Shop · Prints &amp; Presets</Label>
          <h1 className="mt-4 font-serif text-[clamp(64px,9vw,144px)] font-extralight leading-[0.9] tracking-[-0.035em]">
            Take a <em className="font-light italic">piece</em>
            <br />
            of the city home.
          </h1>
        </div>
        <p className="m-0 font-serif text-[20px] font-light leading-[1.5] text-balance">
          Archival pigment prints on Hahnemühle Photo Rag. Signed and numbered for limited editions. Ships
          worldwide in 7–10 days from a Manhattan print lab.
        </p>
      </section>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line-soft py-6">
        {COLLECTIONS.map((c) => (
          <Chip key={c.id} pressed={filter === c.id} onClick={() => setFilter(c.id)}>
            {c.label} <span className="opacity-50">{c.count}</span>
          </Chip>
        ))}
        <span className="flex-1" />
        <Label className="self-center">
          {filtered.length} {filtered.length === 1 ? "print" : "prints"} ·{" "}
          {filter === "All" ? "sorted by collection" : filter}
        </Label>
      </div>

      {/* Print grid */}
      <section className="grid grid-cols-3 gap-x-6 gap-y-9 pb-16 pt-9 max-[880px]:grid-cols-2 max-[880px]:gap-x-4 max-[880px]:gap-y-6">
        {filtered.map((p) => (
          <article key={p.id} className="flex cursor-pointer flex-col gap-3">
            <div className="group relative aspect-[4/5] overflow-hidden bg-bg-2">
              <Image
                src={p.img}
                alt={p.title}
                fill
                sizes="(max-width: 880px) 50vw, 33vw"
                className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
              <span>{p.id}</span>
              <span>{p.edition}</span>
            </div>
            <div className="font-serif text-[22px] font-normal leading-[1.2] tracking-[-0.01em]">
              <em className="italic">{p.title}.</em>
            </div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {p.sizes.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line-soft px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-fg-2"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="font-mono text-[13px] text-fg">From ${p.priceFrom}</span>
              <span className="border-b border-line pb-0.5 font-mono text-[11px]">
                Add to cart ↗
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Preset section */}
      <section className="border-t border-line-soft pb-6 pt-20">
        <Label>Lightroom · Digital</Label>
        <h2 className="mt-2 font-serif text-[clamp(40px,5vw,72px)] font-light leading-none tracking-[-0.02em]">
          Edit like <em className="italic">me</em>.
        </h2>

        {/* Provenance story */}
        <div className="grid grid-cols-[1.2fr_1fr] items-center gap-12 border-b border-line-soft py-12 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <p className="m-0 font-serif text-[clamp(20px,1.8vw,26px)] font-light leading-[1.45] tracking-[-0.005em] text-balance">
            These aren&rsquo;t recipes I borrowed from Pinterest. They were{" "}
            <em className="italic">reverse-engineered from my actual Lightroom catalog</em> — median values pulled
            from how I edit each kind of shot, on the streets I actually walk. Real, mine, and tuned for NYC.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <Stat num="280,515" label="Photos in catalog" />
            <Stat num="1,159" italic label="Five-star selections" />
            <Stat num="10" label="Looks distilled" />
            <Stat num="0" italic label="Borrowed from anyone else" />
          </div>
        </div>

        {/* Two pack offer */}
        <div className="grid grid-cols-2 gap-5 pb-6 pt-12 max-[880px]:grid-cols-1">
          {PRESET_PACKS.map((pk) => {
            const featured = !!pk.featured;
            return (
              <div
                key={pk.id}
                className={`relative flex flex-col gap-3 border p-7 pt-7 transition-[border-color] duration-[240ms] hover:border-line ${
                  featured ? "bg-fg text-bg border-fg" : "border-line-soft bg-bg"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-65">{pk.size}</span>
                  <span className="font-serif text-[52px] font-light leading-none tracking-[-0.025em]">
                    {pk.price === 0 ? <em className="italic">Free</em> : `$${pk.price}`}
                  </span>
                </div>
                <div className="font-serif text-[28px] font-normal leading-[1.1] tracking-[-0.01em]">
                  <em className="italic">{pk.name}</em>
                </div>
                <p className="m-0 mt-1 mb-2 font-serif text-[17px] font-light leading-[1.45] opacity-85">
                  {pk.desc}
                </p>
                <ul className="m-0 mb-4.5 flex flex-1 list-none flex-col gap-2 p-0">
                  {pk.includes.map((i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 font-sans text-[13px] leading-[1.4] before:font-mono before:text-[11px] before:opacity-70 before:content-['✓']"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="primary"
                  tone={featured ? "onDark" : "default"}
                  fullWidth
                  arrow
                >
                  {pk.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Index header */}
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-3 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          <Label>— Index · 10 presets</Label>
          <span>What&rsquo;s inside the full pack</span>
        </div>

        {/* All 10 preset cards */}
        <div className="grid grid-cols-2 gap-4 pb-4 pt-8 max-[880px]:grid-cols-1">
          {PRESETS.map((p) => (
            <div
              key={p.id}
              style={{ "--preset-accent": p.accent } as CSSProperties}
              className="relative grid grid-cols-[140px_1fr] overflow-hidden border border-line-soft bg-bg transition-[border-color] duration-[240ms] hover:border-line before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-[3px] before:bg-[var(--preset-accent)] before:content-[''] max-[880px]:grid-cols-[110px_1fr]"
            >
              <div className="relative aspect-square bg-bg-2">
                <Image src={p.img} alt={p.name} fill sizes="140px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1.5 px-5 py-4.5">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-3">
                    {p.n}
                  </span>
                  <span className="font-serif text-[22px] font-normal leading-[1.1] tracking-[-0.01em]">
                    <em className="italic">{p.name}</em>
                  </span>
                </div>
                <div className="font-serif text-[14px] italic leading-[1.4] text-fg-2">
                  Built from {p.source} {p.collection.toLowerCase()} captures.
                </div>
                <div className="mt-0.5 text-[13px] leading-[1.45] text-fg-2">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-baseline justify-between border-b border-line-soft pb-16 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          <span>Works with Lightroom Classic · CC · Mobile</span>
          <span>.xmp + .dng</span>
        </div>
      </section>

      {/* Info row */}
      <section className="grid grid-cols-3 gap-6 border-t border-line-soft py-20 max-[880px]:grid-cols-1">
        <InfoCol numLabel="01 · Paper" head="Hahnemühle Photo Rag">
          Archival cotton rag, 308 gsm. Museum-grade — same paper used by major galleries for fine-art editions.
        </InfoCol>
        <InfoCol numLabel="02 · Editions" head="Signed & numbered">
          Limited editions are signed in pencil and stamped with a numbered certificate of authenticity.
        </InfoCol>
        <InfoCol numLabel="03 · Shipping" head="Worldwide, 7–10 days">
          Rolled in a heavy-walled tube for sizes 16×20 and up. Free shipping on orders over $200 in the US.
        </InfoCol>
      </section>
    </div>
  );
}

function Stat({ num, label, italic }: { num: string; label: string; italic?: boolean }) {
  return (
    <div className="border-l border-line-soft pl-4.5">
      <div className="font-serif text-[clamp(36px,4vw,56px)] font-light leading-none tracking-[-0.02em]">
        {italic ? <em className="italic">{num}</em> : num}
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase leading-[1.4] tracking-[0.14em] text-fg-3">{label}</div>
    </div>
  );
}

function InfoCol({
  numLabel,
  head,
  children,
}: {
  numLabel: string;
  head: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 pr-6">
      <Label>{numLabel}</Label>
      <h4 className="m-0 font-serif text-[22px] font-normal tracking-[-0.01em]">{head}</h4>
      <p className="m-0 text-[14px] leading-[1.5] text-fg-2">{children}</p>
    </div>
  );
}

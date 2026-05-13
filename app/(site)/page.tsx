import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { IMG } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="animate-page-fade">
      {/* Hero — full-bleed cinematic */}
      <section className="relative h-[calc(100vh-65px)] min-h-[640px] overflow-hidden">
        <Image
          src={IMG.hero}
          alt="Vintage Chevy at night, Mount Sinai"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/55" />
        <div className="absolute inset-0 z-[2] flex flex-col justify-between px-(--spacing-gutter) py-9 text-[#fafafa]">
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] opacity-85">
            <span>Manuel Peña — Photographer · NYC</span>
            <span>Est. 2026 · Now booking 2026 / 27</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h1 className="m-0 font-serif text-[clamp(72px,11vw,180px)] font-extralight leading-[0.9] tracking-[-0.035em] text-[#fafafa]">
              Pictures<br />
              that <em className="font-light italic">last</em>.
            </h1>
            <div className="flex flex-col items-start gap-[18px]">
              <p className="max-w-[380px] font-serif text-[18px] font-light leading-[1.4] opacity-90">
                Weddings, portraits &amp; editorial work, made carefully — across the city
                and beyond.
              </p>
              <div className="flex items-center gap-2.5">
                <ButtonLink href="/contact" variant="primary" tone="onDark" arrow>
                  Book a session
                </ButtonLink>
                <ButtonLink href="/work" variant="outline" tone="onDark" arrow>
                  See the work
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-site px-(--spacing-gutter)">
        {/* Intro */}
        <section className="grid grid-cols-[1fr_2fr] gap-16 py-[100px_64px] max-[880px]:grid-cols-1 max-[880px]:gap-6 max-[880px]:py-16">
          <div className="pt-3.5">
            <Label>A · Introduction</Label>
          </div>
          <div>
            <p className="m-0 mb-7 font-serif text-[clamp(28px,2.6vw,40px)] font-light leading-[1.25] tracking-[-0.015em] text-balance">
              I&rsquo;m <em className="italic">Manny</em> — a photographer based in
              Manhattan, NYC, working with couples, families, and brands who want
              pictures that feel like the people in them.
            </p>
            <ButtonLink href="/about" variant="ghost" arrow>
              About the studio
            </ButtonLink>
          </div>
        </section>

        {/* Selected work */}
        <section className="py-16">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div>
              <Label>B · Selected work</Label>
              <h2 className="mt-2 font-serif text-[clamp(40px,5vw,72px)] font-light leading-none tracking-[-0.02em]">
                Recent <em className="italic">shoots</em>.
              </h2>
            </div>
            <ButtonLink href="/work" variant="ghost" arrow>
              View all 18 projects
            </ButtonLink>
          </div>

          <div className="grid grid-cols-12 gap-5 max-[880px]:grid-cols-2 max-[880px]:gap-4">
            {/* Row 1: two wide tiles, 6 cols each, 16:11 */}
            <WorkTile project={IMG.projects[0]} num="001" colSpan="col-span-6 max-[880px]:col-span-1" aspect="aspect-[16/11]" />
            <WorkTile project={IMG.projects[1]} num="002" colSpan="col-span-6 max-[880px]:col-span-1" aspect="aspect-[16/11]" />
            {/* Row 2: three tiles, 4 cols each, 4:5 */}
            <WorkTile project={IMG.projects[2]} num="003" colSpan="col-span-4 max-[880px]:col-span-1" aspect="aspect-[4/5]" />
            <WorkTile project={IMG.projects[3]} num="004" colSpan="col-span-4 max-[880px]:col-span-1" aspect="aspect-[4/5]" />
            <WorkTile project={IMG.projects[4]} num="005" colSpan="col-span-4 max-[880px]:col-span-1" aspect="aspect-[4/5]" />
          </div>
        </section>

        {/* Recognition */}
        <section className="grid grid-cols-[1fr_2.4fr] gap-16 border-y border-line-soft py-20 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>C · Kind words</Label>
          </div>
          <div className="grid grid-cols-2 gap-12 max-[880px]:grid-cols-1">
            <blockquote className="m-0 font-serif text-[22px] font-light leading-[1.4] tracking-[-0.01em] before:mr-1 before:align-[-0.18em] before:text-[36px] before:leading-none before:text-fg-3 before:content-['“']">
              Manny made our wedding day feel like itself — quiet, warm, ours. We open the
              album every month.
              <cite className="mt-3.5 block font-mono text-[11px] uppercase not-italic tracking-[0.14em] text-fg-3">
                — J &amp; S, Manhattan
              </cite>
            </blockquote>
            <blockquote className="m-0 font-serif text-[22px] font-light leading-[1.4] tracking-[-0.01em] before:mr-1 before:align-[-0.18em] before:text-[36px] before:leading-none before:text-fg-3 before:content-['“']">
              The campaign images outperformed every previous shoot. He sees what we
              couldn&rsquo;t have asked for.
              <cite className="mt-3.5 block font-mono text-[11px] uppercase not-italic tracking-[0.14em] text-fg-3">
                — Studio Aro, Creative Director
              </cite>
            </blockquote>
          </div>
        </section>
      </div>

      {/* Lead magnet — full-bleed dark */}
      <section className="relative mt-20 overflow-hidden bg-fg px-(--spacing-gutter) py-20 text-bg">
        <Image
          src="/photos/night-2.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-[0.18] grayscale"
        />
        <div className="relative mx-auto grid w-full max-w-site grid-cols-[1.4fr_1fr] items-center gap-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgb(250_250_250_/_0.65)] before:h-px before:w-6 before:bg-[rgb(250_250_250_/_0.5)] before:content-['']">
              Free · Lightroom presets
            </span>
            <h2 className="mt-4 mb-6 font-serif text-[clamp(48px,6.4vw,96px)] font-extralight leading-[0.95] tracking-[-0.03em] text-[#fafafa]">
              The presets<br />
              I <em className="font-light italic">actually use</em>.
            </h2>
            <p className="m-0 mb-7 max-w-[520px] font-serif text-[19px] font-light leading-[1.5] text-[rgb(250_250_250_/_0.85)] text-balance">
              Three of my go-to recipes for street, golden hour, and overcast NYC light —
              the ones I reach for on every shoot. On the house. One email, one download,
              no follow-up sequence.
            </p>
            <EmailCaptureForm
              variant="dark"
              cta="Send the pack ↗"
              tinyLabel=".xmp + .dng files · Lightroom CC, Classic & Mobile"
            />
          </div>
          <div className="relative">
            <div className="grid grid-cols-3 gap-2 -rotate-2">
              {[IMG.portfolio[0], IMG.portfolio[2], IMG.portfolio[5], IMG.portfolio[3], IMG.portfolio[6], IMG.portfolio[8], IMG.portfolio[1], IMG.portfolio[4], IMG.portfolio[7]].map(
                (src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-[2px] border border-[rgb(250_250_250_/_0.2)]"
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                  </div>
                ),
              )}
              <span className="absolute left-1/2 -bottom-9 -translate-x-1/2 whitespace-nowrap font-serif text-[14px] italic text-[rgb(250_250_250_/_0.7)]">
                — 3 presets · before / after
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorkTile({
  project,
  num,
  colSpan,
  aspect,
}: {
  project: (typeof IMG.projects)[number];
  num: string;
  colSpan: string;
  aspect: string;
}) {
  return (
    <Link
      href="/work"
      className={`flex flex-col gap-3 ${colSpan}`}
    >
      <div className={`group relative overflow-hidden bg-bg-2 ${aspect}`}>
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 880px) 50vw, 50vw"
          className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">
        <span>
          {num} · {project.cat}
        </span>
        <span>{project.date}</span>
      </div>
      <div className="font-serif text-[26px] font-light leading-[1.1] tracking-[-0.01em]">
        <em className="italic">{project.title}.</em>
      </div>
    </Link>
  );
}

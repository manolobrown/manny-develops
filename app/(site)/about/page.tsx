import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { JsonLd } from "@/components/JsonLd";
import { IMG } from "@/lib/content";
import { metadataFor } from "@/lib/site";
import { personAndBusinessSchema, webPageSchema, breadcrumbsSchema } from "@/lib/seo";

export const metadata = metadataFor("/about");

export default function AboutPage() {
  return (
    <div className="animate-page-fade">
      <JsonLd
        data={[
          webPageSchema("/about"),
          breadcrumbsSchema("/about"),
          ...personAndBusinessSchema(),
        ]}
      />
      <div className="mx-auto w-full max-w-site px-(--spacing-gutter)">
        {/* Hero */}
        <section className="grid grid-cols-[1.1fr_1fr] items-end gap-16 py-16 max-[880px]:grid-cols-1 max-[880px]:gap-8">
          <div>
            <Label>About · M.P.</Label>
            <h1 className="mt-8 font-serif text-[clamp(64px,9vw,152px)] font-extralight leading-[0.9] tracking-[-0.035em]">
              Manhattan-based.
              <br />
              Always <em className="font-light italic">looking</em>.
            </h1>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-bg-2">
            <Image
              src={IMG.about}
              alt="Manuel Peña, photographer"
              fill
              sizes="(max-width: 880px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>

        {/* Catalog stats */}
        <section className="mb-6 grid grid-cols-4 border-y border-line py-9 max-[880px]:grid-cols-2 max-[880px]:gap-y-[18px] max-[880px]:py-5">
          <Stat num="9" label="Years shooting" first />
          <Stat num="280,515" label="Photos in the catalog" />
          <Stat num="1,159" italic label="Earned five stars" />
          <Stat
            label="1 in every 242 frames"
            num={
              <>
                0.41<span className="text-[0.55em]">%</span>
              </>
            }
          />
        </section>

        {/* Bio */}
        <section className="grid grid-cols-[1fr_2fr] gap-16 border-t border-line-soft py-20 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>A · The story</Label>
          </div>
          <div className="font-serif text-[clamp(22px,2vw,28px)] font-light leading-[1.45] tracking-[-0.01em]">
            <p className="mt-0 mb-6 text-balance">
              I&rsquo;m <em className="italic">Manuel Peña</em> — a self-taught photographer working out of Manhattan.
              I picked up a camera in 2015 to document my neighborhood and never quite stopped.
            </p>
            <p className="m-0 mb-6 text-balance">
              Nine years and fifteen-plus cameras later, my catalog sits at 280,515 frames. Of those,{" "}
              <em className="italic">1,159 earned five stars</em>. That&rsquo;s the work I&rsquo;m proud of — what
              you&rsquo;ll find on this site, in the prints, and in the preset pack.
            </p>
            <p className="m-0 mb-6 text-balance">
              Day-to-day I split my time between street work — most of which lives on my Instagram,{" "}
              <a
                href="https://instagram.com/manolobrown"
                target="_blank"
                rel="noreferrer"
                className="border-b border-current"
              >
                @manolobrown
              </a>{" "}
              — and commissioned shoots: weddings, fitness sessions, brand campaigns, and family portraits.
            </p>
            <p className="m-0 text-balance">
              My approach is quiet. I show up early, stay out of the way, and try to make pictures that look like
              the people in them, not the trends of the year.
            </p>
          </div>
        </section>

        {/* Noon-shadow pullquote */}
        <section className="mt-20 grid grid-cols-[1fr_2fr] items-start gap-16 border-t border-line-soft pt-20 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>B · The approach</Label>
          </div>
          <div>
            <blockquote className="m-0 font-serif text-[clamp(36px,4.6vw,64px)] font-light italic leading-[1.05] tracking-[-0.025em] text-balance">
              I don&rsquo;t chase golden hour —
              <br />I chase the <span className="not-italic">noon shadow</span>.
            </blockquote>
            <cite className="mt-5 block font-mono text-[11px] uppercase not-italic tracking-[0.14em] text-fg-3">
              — What the catalog actually shows
            </cite>
          </div>
        </section>
      </div>

      {/* Developer + photographer */}
      <section className="-mx-(--spacing-gutter) bg-bg-2 px-(--spacing-gutter) py-20">
        <div className="mx-auto grid w-full max-w-site grid-cols-[1fr_1.6fr] items-center gap-16 max-[880px]:grid-cols-1 max-[880px]:gap-8">
          <div>
            <Label>B · Dual practice</Label>
            <h2 className="mt-3 font-serif text-[clamp(36px,4.4vw,60px)] font-light leading-[1.05] tracking-[-0.02em]">
              Photographer
              <br />
              &amp; <em className="italic">web developer</em>.
            </h2>
          </div>
          <div className="font-serif text-[20px] font-light leading-[1.55]">
            <p className="m-0 mb-4">
              I built this site myself. I build booking systems, brand sites, and custom galleries for other
              photographers and small studios — the same tools I use to run my own practice.
            </p>
            <p className="m-0">
              For clients, that means technical precision <em className="italic">and</em> creative storytelling, in
              one person. For commercial shoots, it means I can deliver more than just files: galleries, microsites,
              embedded shop pages, the whole campaign.
            </p>
            <div className="mt-4.5 flex flex-wrap gap-2">
              {["React", "Next.js", "Tailwind", "Stripe", "Squarespace", "Webflow"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-line-soft px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-site px-(--spacing-gutter)">
        {/* What I shoot */}
        <section className="grid grid-cols-4 gap-6 py-20 max-[880px]:grid-cols-2">
          {[
            { t: "Weddings",        c: "From $1,500",    img: IMG.portfolio[2] },
            { t: "Fitness & gyms",  c: "From $200 / hr", img: IMG.portfolio[1] },
            { t: "Events",          c: "From $500",       img: IMG.portfolio[3] },
            { t: "Portraits",       c: "From $250",       img: IMG.portfolio[5] },
          ].map((s, i) => (
            <Link key={s.t} href="/services" className="flex cursor-pointer flex-col gap-3.5">
              <div className="group relative aspect-[4/5] overflow-hidden bg-bg-2">
                <Image
                  src={s.img}
                  alt=""
                  fill
                  sizes="(max-width: 880px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[600ms] ease-[var(--ease-design)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                <span>0{i + 1} · Service</span>
                <span>{s.c}</span>
              </div>
              <div className="font-serif text-[24px] font-light tracking-[-0.01em]">
                <em className="italic">{s.t}.</em>
              </div>
            </Link>
          ))}
        </section>

        {/* Press */}
        <section className="grid grid-cols-[1fr_3fr] items-center gap-12 border-t border-line-soft py-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>C · As featured on</Label>
          </div>
          <div className="flex flex-wrap items-center gap-x-14 gap-y-9">
            {["Essex Squeeze × Nike", "LFI Gallery — Leica", "@street_mp_", "Streets in Frame", "Subway Stories"].map(
              (p) => (
                <span
                  key={p}
                  className="font-serif text-[26px] font-normal italic tracking-[-0.01em] text-fg-2"
                >
                  {p}
                </span>
              ),
            )}
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-wrap gap-4 py-20">
          <ButtonLink href="/contact" variant="primary" arrow>Book a session</ButtonLink>
          <ButtonLink href="/work" variant="ghost">View portfolio</ButtonLink>
          <ButtonLink href="/reviews" variant="ghost">Read reviews</ButtonLink>
        </section>
      </div>
    </div>
  );
}

function Stat({
  num,
  label,
  italic,
  first,
}: {
  num: React.ReactNode;
  label: string;
  italic?: boolean;
  first?: boolean;
}) {
  return (
    <div
      className={`py-1 ${first ? "pl-0" : "pl-6 border-l border-line-soft"} max-[880px]:border-l-0 max-[880px]:pl-0 max-[880px]:pr-4`}
    >
      <div className="font-serif text-[clamp(36px,4.4vw,60px)] font-light leading-none tracking-[-0.025em]">
        {italic ? <em className="italic">{num}</em> : num}
      </div>
      <div className="mt-2.5 font-mono text-[10px] uppercase leading-[1.4] tracking-[0.14em] text-fg-3">
        {label}
      </div>
    </div>
  );
}

import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { REVIEWS } from "@/lib/content";

export default function ReviewsPage() {
  return (
    <div className="animate-page-fade">
      <div className="mx-auto w-full max-w-site px-(--spacing-gutter)">
        {/* Header */}
        <section className="grid grid-cols-[1.4fr_1fr] items-end gap-12 border-b border-line-soft py-12 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>Reviews · 2024 — 2026</Label>
            <h1 className="mt-4 font-serif text-[clamp(64px,9vw,144px)] font-extralight leading-[0.9] tracking-[-0.035em]">
              Kind words
              <br />
              from <em className="font-light italic">kind people</em>.
            </h1>
          </div>
          <p className="m-0 font-serif text-[20px] font-light leading-[1.5]">
            Three years, 80+ shoots, and a quiet pile of testimonials. A small selection — with no edits.
          </p>
        </section>

        {/* Stats — TODO: confirm before launch (audit flagged these as invented) */}
        <section className="grid grid-cols-4 gap-6 border-b border-line-soft py-9 max-[880px]:grid-cols-2 max-[880px]:gap-4">
          <Stat num={<em className="italic">5.0</em>} label="Google · 38 reviews" first />
          <Stat num="87" label="Shoots delivered" />
          <Stat
            label="Re-bookings + referrals"
            num={
              <>
                94<span className="text-[0.5em]">%</span>
              </>
            }
          />
          <Stat
            label="Avg. reply time"
            num={
              <>
                48<span className="text-[0.5em]"> hr</span>
              </>
            }
          />
        </section>

        {/* Grid of testimonials */}
        <section className="grid grid-cols-2 gap-x-14 gap-y-12 py-16 max-[880px]:grid-cols-1 max-[880px]:gap-y-10">
          {REVIEWS.map((r, i) => (
            <article key={i} className="flex flex-col gap-4.5 pr-4">
              <span className="font-sans text-[14px] tracking-[0.14em] text-fg">{"★".repeat(r.stars)}</span>
              <blockquote className="m-0 font-serif text-[clamp(20px,1.7vw,26px)] font-light leading-[1.4] tracking-[-0.005em] text-balance before:mr-1.5 before:align-[-0.18em] before:text-[48px] before:leading-none before:text-fg-3 before:content-['“']">
                {r.quote}
              </blockquote>
              <div className="flex items-baseline justify-between border-t border-dotted border-line-soft pt-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                <span>
                  <span className="text-fg">— {r.name}, </span>
                  <span>{r.role}</span>
                </span>
                <span>{r.date}</span>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Google CTA */}
      <section className="-mx-(--spacing-gutter) bg-bg-2 px-(--spacing-gutter) py-16">
        <div className="mx-auto grid w-full max-w-site grid-cols-[1fr_2fr] items-center gap-12 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>★★★★★ · Verified</Label>
            <h2 className="mt-3 font-serif text-[clamp(32px,4vw,52px)] font-light leading-[1.05] tracking-[-0.02em]">
              Read every
              <br />
              <em className="italic">Google review</em>.
            </h2>
          </div>
          <div>
            <p className="m-0 mb-4 font-serif text-[18px] font-light leading-[1.5] text-fg-2">
              All my client reviews are public on my Google Business Profile — including the unfiltered ones. The
              rating sits at a flat 5.0 across 38 reviews.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#" variant="primary" arrow external>
                Open in Google
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost" arrow>
                Become the next
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  num,
  label,
  first,
}: {
  num: React.ReactNode;
  label: string;
  first?: boolean;
}) {
  return (
    <div
      className={`py-1 ${first ? "pl-0" : "pl-4.5 border-l border-line-soft"} max-[880px]:border-l-0 max-[880px]:pl-0`}
    >
      <div className="font-serif text-[clamp(36px,4vw,56px)] font-light leading-none tracking-[-0.02em]">
        {num}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{label}</div>
    </div>
  );
}

import { ButtonLink } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { JsonLd } from "@/components/JsonLd";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";

export const metadata = metadataFor("/services");

type Pkg = {
  name: string;
  price: string;
  dur: string;
  best: string;
  feats: string[];
  featured?: boolean;
};

const PACKAGES: Pkg[] = [
  {
    name: "The Half Day",
    price: "850",
    dur: "2 hours",
    best: "Portraits, headshots, brand intros",
    feats: ["1 location", "50+ edited photos", "2-week delivery", "Online gallery", "Personal print release"],
  },
  {
    name: "The Full Day",
    price: "2,400",
    dur: "6 hours",
    best: "Engagements, families, lookbooks",
    feats: [
      "Up to 3 locations",
      "200+ edited photos",
      "1-week delivery",
      "Print + commercial release",
      "Travel within 30mi included",
      "Pre-shoot consult",
    ],
    featured: true,
  },
  {
    name: "The Story",
    price: "5,800",
    dur: "Full day +",
    best: "Weddings & multi-day events",
    feats: [
      "Up to 10 hours coverage",
      "400+ edited photos",
      "Two photographers",
      "Heirloom album included",
      "Engagement session",
      "5-day sneak peeks",
    ],
  },
];

const STEPS: [string, string, string][] = [
  ["01", "Inquire", "Send a note about what you have in mind. I reply within two days."],
  ["02", "Plan",    "A short call to talk through the shoot, locations, and what matters to you."],
  ["03", "Shoot",   "We meet, we make pictures. I bring backup gear, snacks, and a calm pace."],
  ["04", "Deliver", "A private gallery within 1–2 weeks. Print release and album options included."],
];

const ADDONS: [string, string][] = [
  ["Additional hour", "$300"],
  ["Second photographer", "$650"],
  ["Heirloom album (10×10\")", "from $480"],
  ["Same-day sneak peeks", "$200"],
  ["Travel beyond 30mi", "$1.20 / mi"],
  ["Rush delivery (72 hr)", "$400"],
  ["Engagement session add", "$550"],
  ["Printed proof box", "$320"],
];

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-site px-(--spacing-gutter) animate-page-fade">
      <JsonLd data={[webPageSchema("/services"), breadcrumbsSchema("/services")]} />
      <header className="border-b border-line-soft py-9">
        <div className="grid grid-cols-[1.4fr_1fr] items-end gap-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>— Services &amp; rates</Label>
            <h1 className="mt-3 font-serif text-[clamp(72px,10vw,160px)] font-extralight leading-[0.9] tracking-[-0.035em]">
              Pick a <em className="font-light italic">package</em>.
            </h1>
          </div>
          <p className="m-0 font-serif text-[22px] font-light leading-[1.4] text-fg-2 text-balance">
            Three honest tiers, plus add-ons. If nothing fits, write me — I build custom shoots all the time.
          </p>
        </div>
      </header>

      {/* Pricing cards */}
      <section className="grid grid-cols-3 gap-5 pb-8 pt-14 max-[880px]:grid-cols-1">
        {PACKAGES.map((p) => {
          const isFeatured = !!p.featured;
          return (
            <div
              key={p.name}
              className={`relative flex flex-col border px-7 pt-8 pb-7 transition-[border-color] duration-[240ms] ease-[var(--ease-design)] hover:border-line ${
                isFeatured
                  ? "bg-fg text-bg border-fg"
                  : "border-line-soft bg-bg"
              }`}
            >
              {isFeatured && (
                <span className="absolute -top-px right-6 bg-bg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
                  Most booked
                </span>
              )}
              <span className={`font-mono text-[11px] uppercase tracking-[0.14em] opacity-70`}>{p.dur}</span>
              <h3 className="mt-1.5 font-serif text-[40px] font-light leading-none tracking-[-0.02em]">
                <em className="italic">{p.name}</em>
              </h3>
              <div className="mt-[22px] font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">From</div>
              <div className="mt-1 font-serif text-[72px] font-extralight leading-none tracking-[-0.04em]">${p.price}</div>
              <p className="mt-3.5 mb-6 font-serif text-[16px] italic leading-[1.4] opacity-85">
                Best for {p.best.toLowerCase()}
              </p>
              <div className={`mb-[22px] h-px ${isFeatured ? "bg-[rgb(250_250_250_/_0.18)]" : "bg-line-soft"}`} />
              <ul className="m-0 mb-7 flex flex-1 list-none flex-col gap-3 p-0">
                {p.feats.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 font-sans text-[14px] leading-[1.4] before:mt-[8px] before:h-1.5 before:w-1.5 before:flex-shrink-0 before:rounded-full before:bg-current before:opacity-50 before:content-['']"
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/contact"
                variant="primary"
                tone={isFeatured ? "onDark" : "default"}
                fullWidth
                arrow
              >
                Book {p.name}
              </ButtonLink>
            </div>
          );
        })}
      </section>

      {/* Process */}
      <section className="border-t border-line-soft pt-24 pb-16">
        <Label>— How we work</Label>
        <h2 className="mt-3 mb-14 font-serif text-[clamp(40px,5vw,72px)] font-light leading-none tracking-[-0.02em]">
          Simple <em className="italic">and unhurried</em>.
        </h2>
        <div className="grid grid-cols-4 gap-8 max-[880px]:grid-cols-1">
          {STEPS.map(([n, t, d]) => (
            <div key={n}>
              <div className="font-serif text-[80px] font-light leading-[0.9] tracking-[-0.03em] text-fg-3">
                {n}
              </div>
              <h4 className="mt-3.5 mb-2.5 font-serif text-[24px] font-normal tracking-[-0.01em]">
                <em className="italic">{t}.</em>
              </h4>
              <p className="m-0 font-sans text-[14px] leading-[1.5] text-fg-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing guide PDF */}
      <section className="-mx-(--spacing-gutter) mt-8 bg-bg-2 px-(--spacing-gutter) py-20">
        <div className="mx-auto grid w-full max-w-site grid-cols-[1.2fr_1fr] items-center gap-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>— Lead magnet · Free PDF</Label>
            <h3 className="mt-2 mb-4.5 font-serif text-[clamp(40px,5vw,72px)] font-light leading-[0.95] tracking-[-0.025em]">
              The full <em className="italic">pricing guide</em>,<br />
              delivered to your inbox.
            </h3>
            <p className="m-0 mb-6 max-w-[540px] font-serif text-[18px] font-light leading-[1.55] text-fg-2">
              A 16-page PDF with every package broken down: what&rsquo;s included, sample galleries, a real wedding
              timeline, and a worksheet to figure out which tier fits your shoot. Free, no follow-ups.
            </p>
            <ul className="mb-7 grid grid-cols-2 gap-x-6 gap-y-2 list-none p-0 max-[880px]:grid-cols-1">
              {[
                "All three packages, line-by-line",
                "Sample galleries from past shoots",
                "Wedding-day timeline template",
                "Add-on calculator worksheet",
                "Travel & logistics FAQ",
                "Contract & deposit terms",
              ].map((b) => (
                <li
                  key={b}
                  className="flex gap-2.5 font-sans text-[14px] text-fg-2 before:font-mono before:text-[12px] before:text-fg before:content-['✓']"
                >
                  {b}
                </li>
              ))}
            </ul>
            <EmailCaptureForm
              source="pricing-guide"
              cta="Send me the guide ↗"
              tinyLabel="PDF · 16 pages · 2.4 MB · Updated April 2026"
            />
          </div>

          {/* PDF preview card */}
          <div className="relative aspect-[8.5/11] max-w-[360px] -rotate-[1.5deg] justify-self-end border border-line-soft bg-bg p-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] flex flex-col gap-3.5 max-[880px]:justify-self-start max-[880px]:max-w-[280px]">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-3">
              Manny Develops · 2026
            </span>
            <div className="font-serif text-[28px] font-light leading-none tracking-[-0.02em]">
              <em className="italic">Pricing</em>
              <br />
              guide.
            </div>
            <div className="mb-2 mt-1.5 h-px bg-line-soft" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">01 · The Half Day</span>
            <div className="h-1.5 rounded-[3px] bg-bg-2" />
            <div className="h-1.5 w-4/5 rounded-[3px] bg-bg-2" />
            <div className="h-1.5 w-3/5 rounded-[3px] bg-bg-2" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">02 · The Full Day</span>
            <div className="h-1.5 rounded-[3px] bg-bg-2" />
            <div className="h-1.5 w-4/5 rounded-[3px] bg-bg-2" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">03 · The Story</span>
            <div className="h-1.5 rounded-[3px] bg-bg-2" />
            <div className="h-1.5 w-3/5 rounded-[3px] bg-bg-2" />
            <div className="mt-auto flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-fg-3">
              <span className="font-serif text-[14px] italic tracking-[-0.005em] normal-case text-fg-2">
                — Manuel Peña
              </span>
              <span>p. 03 / 16</span>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="grid grid-cols-[1fr_2fr] gap-16 border-t border-line-soft py-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
        <div>
          <Label>— Add-ons</Label>
          <h3 className="mt-3 font-serif text-[48px] font-light leading-none tracking-[-0.02em]">
            Extras &amp;<br />
            <em className="italic">upgrades</em>.
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-x-12 max-[880px]:grid-cols-1">
          {ADDONS.map(([n, p]) => (
            <div
              key={n}
              className="flex items-baseline border-b border-line-soft py-4 font-serif text-[18px] font-normal"
            >
              <span>{n}</span>
              <span className="ml-auto whitespace-nowrap font-mono text-[13px] font-medium tracking-[0.04em]">
                {p}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

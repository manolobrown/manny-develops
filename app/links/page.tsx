import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { IMG } from "@/lib/content";
import { metadataFor } from "@/lib/site";
import { webPageSchema } from "@/lib/seo";

export const metadata = metadataFor("/links");

type Tile = {
  href: string;
  icon: string;
  ttl: string;
  sub: string;
  primary?: boolean;
};

const TILES: Tile[] = [
  { href: "/contact",   icon: "✦", ttl: "Book a session",       sub: "Inquire · 48 hr reply",       primary: true },
  { href: "/shop",      icon: "↓", ttl: "Free preset pack",     sub: "Email signup · download" },
  { href: "/work",      icon: "◇", ttl: "View my portfolio",    sub: "Weddings · Events · Fitness" },
  { href: "/shop",      icon: "✱", ttl: "Shop prints",          sub: "Limited editions · NYC" },
  { href: "/journal",   icon: "§", ttl: "Latest journal entry", sub: "A Vermont wedding" },
  { href: "/about",     icon: "✎", ttl: "About me",             sub: "Manuel Peña · Manhattan" },
];

export default function LinksPage() {
  return (
    <div className="animate-page-fade">
      <JsonLd data={webPageSchema("/links")} />
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-bg px-5 pb-16 pt-12 before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(800px_400px_at_50%_-100px,var(--color-bg-2)_0%,transparent_70%)] before:content-['']">
        <div className="relative z-10 flex w-full max-w-[460px] flex-col items-center gap-1">
          <div className="h-24 w-24 overflow-hidden rounded-full border border-line-soft">
            <Image
              src={IMG.about}
              alt="Manuel Peña"
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4.5 font-serif text-[32px] font-normal tracking-[-0.015em]">
            Manuel <em className="italic">Peña</em>
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
            @manolobrown
          </div>
          <p className="mt-3.5 max-w-[360px] text-center font-serif text-[16px] font-light leading-[1.5] text-fg-2 text-balance">
            NYC street &amp; event photographer.
            <br />
            Weddings · Fitness · Events · Prints.
          </p>

          <div className="mt-9 flex w-full flex-col gap-3">
            {TILES.map((l, i) => {
              const cls = l.primary
                ? "bg-fg text-bg border-fg"
                : "bg-bg text-fg border-line-soft hover:border-line";
              return (
                <Link
                  key={i}
                  href={l.href}
                  className={`group/link flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4.5 text-left transition-[border-color,transform,background] duration-[240ms] ease-[var(--ease-design)] hover:-translate-y-px ${cls}`}
                >
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg font-serif text-[18px] italic ${
                      l.primary ? "bg-[rgb(255_255_255_/_0.15)] text-bg" : "bg-bg-2 text-fg"
                    }`}
                  >
                    {l.icon}
                  </span>
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="font-serif text-[18px] font-normal tracking-[-0.01em]">
                      <em className="italic">{l.ttl}</em>
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                        l.primary ? "text-[rgb(255_255_255_/_0.7)]" : "text-fg-3"
                      }`}
                    >
                      {l.sub}
                    </span>
                  </span>
                  <span className="font-mono text-[14px] opacity-50 transition-[transform,opacity] duration-[240ms] ease-[var(--ease-design)] group-hover/link:translate-x-[2px] group-hover/link:-translate-y-[2px] group-hover/link:opacity-100">
                    ↗
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-7 flex gap-2.5">
            <a
              href="https://instagram.com/manolobrown"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-line-soft font-mono text-[11px] tracking-[0.06em] text-fg-2 transition-colors duration-[240ms] hover:border-line hover:text-fg"
            >
              IG
            </a>
            <a
              href="#"
              title="TikTok"
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-line-soft font-mono text-[11px] tracking-[0.06em] text-fg-2 transition-colors duration-[240ms] hover:border-line hover:text-fg"
            >
              TT
            </a>
            <a
              href="#"
              title="Are.na"
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-line-soft font-mono text-[11px] tracking-[0.06em] text-fg-2 transition-colors duration-[240ms] hover:border-line hover:text-fg"
            >
              AR
            </a>
            <a
              href="mailto:hello@mannydevelops.com"
              title="Email"
              className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-line-soft font-mono text-[11px] tracking-[0.06em] text-fg-2 transition-colors duration-[240ms] hover:border-line hover:text-fg"
            >
              @
            </a>
          </div>

          <div className="mt-9 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
            <span>mannydevelops.com/links</span>
            <span className="inline-block h-1 w-1 rounded-full bg-fg-3" />
            <span>v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

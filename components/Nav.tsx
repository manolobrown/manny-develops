"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/content";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center border-b border-line-soft px-(--spacing-gutter) py-[18px] backdrop-blur-md transition-[background,border-color] duration-[240ms] ease-[var(--ease-design)] max-[880px]:grid-cols-[1fr_auto]"
        style={{ background: "color-mix(in srgb, var(--color-bg) 88%, transparent)" }}>
      <Link href="/" className="flex items-center gap-2.5 font-serif text-[22px] font-normal leading-none tracking-[-0.01em]">
        <span className="inline-block h-[7px] w-[7px] rounded-full bg-fg" />
        <span>
          Manny Develops <span className="font-light italic">— studio</span>
        </span>
      </Link>

      <div className="flex justify-center gap-1 max-[880px]:hidden">
        {NAV_LINKS.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative px-[14px] py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-[240ms] ease-[var(--ease-design)] ${
                active ? "text-fg" : "text-fg-2 hover:text-fg"
              } ${active ? "after:absolute after:left-[14px] after:right-[14px] after:bottom-[2px] after:h-px after:bg-fg" : ""}`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-end gap-[14px]">
        <ThemeToggle />
        <Link
          href="/contact"
          className="rounded-full border border-line bg-fg px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity duration-[240ms] hover:opacity-85"
        >
          Book a session ↗
        </Link>
      </div>
    </nav>
  );
}

import Link from "next/link";

export function Footer() {
  const studio = [
    { href: "/",         label: "Home" },
    { href: "/work",     label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/shop",     label: "Shop" },
    { href: "/about",    label: "About" },
    { href: "/reviews",  label: "Reviews" },
    { href: "/journal",  label: "Journal" },
    { href: "/contact",  label: "Contact" },
  ];
  const elsewhere = [
    { label: "Instagram", href: "https://instagram.com/manolobrown", external: true },
    { label: "Are.na",    href: "#",                                   external: false },
    { label: "Vimeo",     href: "#",                                   external: false },
    { label: "Newsletter", href: "/journal",                            external: false },
  ];

  return (
    <footer className="mx-auto mt-24 grid w-full max-w-site grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 border-t border-line-soft px-(--spacing-gutter) pt-16 pb-9 max-[880px]:grid-cols-2">
      <div>
        <h3 className="m-0 mb-6 font-serif text-[clamp(48px,6vw,88px)] font-light leading-[0.95] tracking-[-0.02em]">
          Let&rsquo;s make<br />
          <em className="font-light italic">something good</em>.
        </h3>
        <Link
          href="/contact"
          className="group/btn inline-flex items-center gap-2.5 rounded-full border border-line bg-fg px-[22px] py-[14px] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-bg transition-opacity duration-[240ms] hover:opacity-85"
        >
          Start an inquiry{" "}
          <span className="inline-block transition-transform duration-[240ms] ease-[var(--ease-design)] group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]">
            ↗
          </span>
        </Link>
      </div>

      <FooterCol heading="Studio">
        {studio.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="font-sans text-[14px] text-fg hover:text-fg-2">
              {l.label}
            </Link>
          </li>
        ))}
      </FooterCol>

      <FooterCol heading="Elsewhere">
        {elsewhere.map((l) =>
          l.external ? (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="font-sans text-[14px] text-fg hover:text-fg-2"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.label}>
              <Link href={l.href} className="font-sans text-[14px] text-fg hover:text-fg-2">
                {l.label}
              </Link>
            </li>
          ),
        )}
      </FooterCol>

      <FooterCol heading="Contact">
        <li>
          <a
            href="mailto:hello@mannydevelops.com"
            className="font-sans text-[14px] text-fg hover:text-fg-2"
          >
            hello@mannydevelops.com
          </a>
        </li>
        <li className="font-sans text-[14px] text-fg">Studio · Manhattan, NYC</li>
        <li className="font-sans text-[13px] text-fg-3">Replies in 48 hrs</li>
      </FooterCol>

      <div className="col-span-full mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line-soft pt-7 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
        <span>© 2026 Manuel Peña</span>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link href="/privacy" className="hover:text-fg">Privacy</Link>
          <Link href="/terms" className="hover:text-fg">Terms</Link>
        </div>
        <span>Made in Manhattan</span>
        <span>v1.0</span>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="m-0 mb-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-3">
        {heading}
      </h4>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">{children}</ul>
    </div>
  );
}

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";
type Tone = "default" | "onDark";

type Common = {
  variant?: Variant;
  tone?: Tone;
  arrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center gap-2.5 rounded-full font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-[background,color,opacity,border-color] duration-[240ms] ease-[var(--ease-design)] px-[22px] py-[14px] border";

function classes({
  variant = "outline",
  tone = "default",
  fullWidth,
  className,
}: Pick<Common, "variant" | "tone" | "fullWidth" | "className">) {
  const variants: Record<Variant, string> = {
    primary:
      tone === "onDark"
        ? "bg-bg text-fg border-bg hover:opacity-85"
        : "bg-fg text-bg border-line hover:opacity-85",
    ghost:
      "bg-transparent text-fg border-line-soft hover:border-line hover:bg-hover",
    outline:
      tone === "onDark"
        ? "bg-transparent text-bg border-[rgb(250_250_250_/_0.4)] hover:bg-[rgb(250_250_250_/_0.08)]"
        : "bg-transparent text-fg border-line hover:bg-hover",
  };
  return [base, variants[variant], fullWidth && "w-full justify-center", className]
    .filter(Boolean)
    .join(" ");
}

function Arrow() {
  return (
    <span className="inline-block transition-transform duration-[240ms] ease-[var(--ease-design)] group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]">
      ↗
    </span>
  );
}

export function Button({
  variant,
  tone,
  arrow,
  fullWidth,
  className,
  children,
  type = "button",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      type={type}
      className={`group/btn ${classes({ variant, tone, fullWidth, className })}`}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  tone,
  arrow,
  fullWidth,
  className,
  children,
  external,
}: Common & { href: string; external?: boolean }) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`group/btn ${classes({ variant, tone, fullWidth, className })}`}
      >
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={`group/btn ${classes({ variant, tone, fullWidth, className })}`}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
  tone?: "default" | "accent" | "muted" | "onDark";
};

export function Label({ children, className = "", as = "span", tone = "default" }: Props) {
  const Component = as;
  const toneClass =
    tone === "accent"
      ? "text-fg"
      : tone === "muted"
      ? "text-fg-3"
      : tone === "onDark"
      ? "text-[rgb(250_250_250_/_0.65)]"
      : "text-fg-2";
  return (
    <Component
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${toneClass} ${className}`}
    >
      {children}
    </Component>
  );
}

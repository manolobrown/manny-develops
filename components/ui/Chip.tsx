import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
  children: ReactNode;
};

export function Chip({ pressed, children, className = "", ...rest }: Props) {
  const tone = pressed
    ? "bg-fg text-bg border-fg"
    : "bg-transparent text-fg-2 border-line-soft hover:border-line hover:text-fg";
  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      aria-pressed={pressed}
      className={`inline-flex items-center gap-2 rounded-full border px-[14px] py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-[background,color,border-color] duration-[240ms] ease-[var(--ease-design)] ${tone} ${className}`}
    >
      {children}
    </button>
  );
}

"use client";

import { useState, type FormEvent } from "react";

type Variant = "dark" | "light";

type Props = {
  variant?: Variant;
  cta: string;
  placeholder?: string;
  tinyLabel?: string;
  className?: string;
};

export function EmailCaptureForm({
  variant = "light",
  cta,
  placeholder = "your@email.com",
  tinyLabel,
  className = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <p
        className={`font-serif text-[16px] italic ${
          variant === "dark" ? "text-[rgb(250_250_250_/_0.9)]" : "text-fg-2"
        } ${className}`}
      >
        ✓ Thanks — keep an eye on your inbox.
      </p>
    );
  }

  const inputCls =
    variant === "dark"
      ? "flex-1 border-none bg-transparent px-0 py-3.5 font-sans text-[16px] text-[#fafafa] outline-none placeholder:text-[rgb(250_250_250_/_0.5)]"
      : "flex-1 border-none bg-transparent px-0 py-3.5 font-sans text-[16px] text-fg outline-none placeholder:text-fg-3";

  const buttonCls =
    variant === "dark"
      ? "whitespace-nowrap border-none bg-transparent py-3.5 pl-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-[#fafafa]"
      : "whitespace-nowrap border-none bg-transparent py-3.5 pl-[18px] font-mono text-[11px] uppercase tracking-[0.14em] text-fg";

  const lineCls =
    variant === "dark" ? "border-[rgb(250_250_250_/_0.4)]" : "border-line";

  const tinyCls =
    variant === "dark"
      ? "mt-3.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-[rgb(250_250_250_/_0.45)]"
      : "mt-3.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3";

  return (
    <div className={className}>
      <form
        onSubmit={handle}
        className={`flex max-w-[520px] border-b pb-1 ${lineCls}`}
      >
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputCls}
        />
        <button type="submit" className={buttonCls}>
          {cta}
        </button>
      </form>
      {tinyLabel && <span className={tinyCls}>{tinyLabel}</span>}
    </div>
  );
}

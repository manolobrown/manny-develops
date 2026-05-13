"use client";

import { useEffect, useState, type FormEvent } from "react";

export function StickyOptIn() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      if (window.scrollY > 600) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setDismissed(true), 1400);
    }
  };

  if (dismissed || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Free preset pack"
      className="fixed bottom-[18px] left-1/2 z-[60] flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-[18px] rounded-full bg-fg py-2.5 pr-3.5 pl-[22px] text-bg shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] animate-so-rise max-[880px]:flex-wrap max-[880px]:rounded-[18px] max-[880px]:px-[18px] max-[880px]:py-3 max-[880px]:bottom-3"
    >
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] opacity-70 max-[880px]:w-full">
        ★ Free · Lightroom preset pack
      </span>
      <span className="whitespace-nowrap font-serif text-[17px] font-normal tracking-[-0.005em] max-[880px]:whitespace-normal max-[880px]:text-[15px]">
        Three presets, on the house. <em className="italic">One email.</em>
      </span>
      {!submitted ? (
        <form
          onSubmit={handle}
          className="flex items-center gap-1 rounded-full bg-[rgb(255_255_255_/_0.1)] py-1 pr-1 pl-3.5 max-[880px]:flex-1"
        >
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[180px] border-none bg-transparent font-sans text-[13px] text-bg outline-none placeholder:text-[rgb(255_255_255_/_0.5)] max-[880px]:w-full max-[880px]:min-w-0"
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-full border-none bg-bg px-3.5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg"
          >
            Send it ↗
          </button>
        </form>
      ) : (
        <span className="px-3.5 py-2 font-serif text-[16px] italic">
          ✓ On its way — check your inbox.
        </span>
      )}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="flex h-7 w-7 items-center justify-center rounded-full border border-[rgb(255_255_255_/_0.18)] bg-transparent text-[12px] text-bg transition-[border-color] duration-[240ms] hover:border-[rgb(255_255_255_/_0.4)]"
      >
        ✕
      </button>
    </div>
  );
}

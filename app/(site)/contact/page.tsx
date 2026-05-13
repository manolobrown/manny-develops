"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";

const SHOOT_TYPES = ["Wedding", "Portrait", "Family", "Commercial", "Editorial", "Other"];
const TIME_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];
const AVAIL_DAYS = [3, 5, 8, 10, 12, 15, 17, 19, 22, 24, 26];
const CALL_TYPES = [
  { id: "Discovery", name: "Discovery",      dur: "15 min · Free" },
  { id: "Wedding",   name: "Wedding consult", dur: "30 min · Free" },
  { id: "Studio",    name: "Studio visit",    dur: "45 min · Manhattan" },
];

export default function ContactPage() {
  const [shoot, setShoot] = useState("Wedding");
  const [day, setDay] = useState(12);
  const [time, setTime] = useState("2:00 PM");
  const [callType, setCallType] = useState("Discovery");

  return (
    <div className="mx-auto w-full max-w-site px-(--spacing-gutter) animate-page-fade">
      <header className="py-9">
        <div className="grid grid-cols-[1.4fr_1fr] items-end gap-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
          <div>
            <Label>— Get in touch</Label>
            <h1 className="mt-3 font-serif text-[clamp(72px,10vw,160px)] font-extralight leading-[0.9] tracking-[-0.035em]">
              Let&rsquo;s make
              <br />
              <em className="font-light italic">something</em>.
            </h1>
          </div>
          <p className="m-0 font-serif text-[22px] font-light leading-[1.4] text-fg-2 text-balance">
            Send a note about your shoot, or grab a 15-minute discovery call. I reply within 48 hours.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-[1.1fr_1fr] gap-16 py-14 max-[880px]:grid-cols-1 max-[880px]:gap-8">
        {/* Inquiry form */}
        <div>
          <Label className="mb-5 block">A · Inquiry form</Label>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5.5">
            <div className="grid grid-cols-2 gap-5 max-[880px]:grid-cols-1">
              <Field label="Your name">
                <input
                  placeholder="First and last"
                  className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                />
              </Field>
            </div>

            <Field label="Type of shoot">
              <div className="flex flex-wrap gap-2">
                {SHOOT_TYPES.map((t) => (
                  <Chip key={t} pressed={shoot === t} onClick={() => setShoot(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-5 max-[880px]:grid-cols-1">
              <Field label="Date (approx)">
                <input
                  placeholder="MM / DD / YYYY"
                  className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                />
              </Field>
              <Field label="Budget">
                <select
                  defaultValue=""
                  className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] focus:border-line"
                >
                  <option value="" disabled>Select a range</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $3,000</option>
                  <option>$3,000 – $6,000</option>
                  <option>$6,000+</option>
                </select>
              </Field>
            </div>

            <Field label="Tell me about it">
              <textarea
                placeholder="Who, where, the vibe, any must-haves…"
                rows={4}
                className="w-full min-h-[100px] resize-y appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
              />
            </Field>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                Replies within 48 hours
              </span>
              <Button type="submit" variant="primary" arrow>Send inquiry</Button>
            </div>
          </form>
        </div>

        {/* Scheduler */}
        <div>
          <Label className="mb-5 block">B · Or book a 15-min call</Label>
          <div className="border border-line-soft bg-bg-2 p-7">
            {/* Call types */}
            <div className="mb-5.5 flex flex-wrap gap-1.5 border-b border-dashed border-line-soft pb-5.5">
              {CALL_TYPES.map((t) => {
                const pressed = callType === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCallType(t.id)}
                    aria-pressed={pressed}
                    className={`flex flex-1 min-w-0 cursor-pointer flex-col gap-1 rounded-md border px-2 py-3 text-left transition-all duration-[240ms] ${
                      pressed
                        ? "border-line bg-bg shadow-[0_0_0_1px_var(--color-line)]"
                        : "border-line-soft hover:border-line"
                    }`}
                  >
                    <span className="font-serif text-[16px] font-normal tracking-[-0.005em]">
                      <em className="italic">{t.name}</em>
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-3">{t.dur}</span>
                  </button>
                );
              })}
            </div>

            <div className="mb-4.5 flex items-center justify-between">
              <h3 className="m-0 font-serif text-[32px] font-light leading-none tracking-[-0.01em]">
                <em className="italic">May</em> 2026
              </h3>
              <div className="flex gap-1 font-mono text-[14px]">
                <button
                  aria-label="Previous month"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line-soft bg-transparent hover:border-line"
                >
                  ‹
                </button>
                <button
                  aria-label="Next month"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-line-soft bg-transparent hover:border-line"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="py-1.5 text-center">{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                const d = i - 4;
                const inMonth = d > 0 && d < 32;
                const avail = inMonth && AVAIL_DAYS.includes(d);
                const today = d === 7;
                const selected = d === day;
                const cls = [
                  "aspect-square flex items-center justify-center rounded-full font-mono text-[13px] border transition-all duration-[240ms]",
                  inMonth ? "text-fg" : "text-fg-3",
                  selected
                    ? "bg-fg text-bg border-fg"
                    : today
                    ? "bg-bg border-line font-semibold"
                    : avail
                    ? "border-line-soft cursor-pointer hover:border-line"
                    : "border-transparent",
                ].join(" ");
                return (
                  <button
                    key={i}
                    className={cls}
                    onClick={() => avail && setDay(d)}
                    disabled={!avail}
                  >
                    {inMonth ? d : ""}
                  </button>
                );
              })}
            </div>

            <div className="mt-5.5 mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-2">
              Tue · May {day} · available times
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => {
                const pressed = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setTime(t)}
                    className={`rounded-full border py-2.5 text-center font-mono text-[12px] tracking-[0.04em] transition-all duration-[240ms] ${
                      pressed
                        ? "border-fg bg-fg text-bg"
                        : "border-line-soft text-fg hover:border-line"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="mt-4.5 flex flex-wrap items-center justify-between gap-3 rounded-md border border-line-soft bg-bg p-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-3">You&rsquo;re booking</span>
              <span className="font-serif text-[16px] italic tracking-[-0.005em]">
                {CALL_TYPES.find((t) => t.id === callType)?.name} · Tue May {day} · {time}
              </span>
            </div>
            <Button variant="primary" fullWidth arrow className="mt-4.5">
              Confirm booking
            </Button>
          </div>
        </div>
      </section>

      {/* Other contact methods */}
      <section className="grid grid-cols-3 gap-8 border-t border-line-soft py-16 max-[880px]:grid-cols-1 max-[880px]:gap-6">
        <OtherCard label="— Email" head="Direct." body="For inquiries, press, or just to say hello.">
          <a className="inline-flex items-baseline gap-2 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.14em]" href="mailto:hello@mannydevelops.com">
            hello@mannydevelops.com
          </a>
        </OtherCard>
        <OtherCard label="— Studio" head="Manhattan, NYC." body="By appointment for casting & reviews.">
          <Link className="inline-flex items-baseline gap-2 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.14em]" href="#">
            Get directions →
          </Link>
        </OtherCard>
        <OtherCard label="— Elsewhere" head="Follow along." body="Day-to-day work, behind the scenes.">
          <a className="inline-flex items-baseline gap-2 border-b border-line pb-1 font-mono text-[11px] uppercase tracking-[0.14em]" href="https://instagram.com/manolobrown" target="_blank" rel="noreferrer">
            @mannydevelops →
          </a>
        </OtherCard>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-2">{label}</span>
      {children}
    </label>
  );
}

function OtherCard({
  label,
  head,
  body,
  children,
}: {
  label: string;
  head: string;
  body: string;
  children: React.ReactNode;
}) {
  // head is rendered with italic styling on the noun part — we wrap in <em> via a known structure
  const parts = head.split(/(\.|,)/);
  return (
    <div className="py-6">
      <Label>{label}</Label>
      <h4 className="mt-2 font-serif text-[32px] font-light tracking-[-0.01em]">
        <em className="italic">{parts[0]}</em>
        {parts.slice(1).join("")}
      </h4>
      <p className="m-0 mb-3 font-sans text-[14px] leading-[1.5] text-fg-2">{body}</p>
      {children}
    </div>
  );
}

"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { useTheme } from "next-themes";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Label } from "@/components/ui/Label";
import { sendInquiry, type InquiryState } from "./actions";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const CAL_LINKS = {
  Discovery: process.env.NEXT_PUBLIC_CAL_LINK_DISCOVERY ?? "manuel-pena-i7ohok/15min",
  Wedding: process.env.NEXT_PUBLIC_CAL_LINK_WEDDING ?? "manuel-pena-i7ohok/30min",
  Studio: process.env.NEXT_PUBLIC_CAL_LINK_STUDIO ?? "manuel-pena-i7ohok/45min",
} as const;

const SHOOT_TYPES = ["Wedding", "Portrait", "Family", "Commercial", "Editorial", "Other"];
const CALL_TYPES = [
  { id: "Discovery", name: "Discovery",       dur: "15 min · Free" },
  { id: "Wedding",   name: "Wedding consult", dur: "30 min · Free" },
  { id: "Studio",    name: "Studio visit",    dur: "45 min · Manhattan" },
] as const;

type CallTypeId = (typeof CALL_TYPES)[number]["id"];

export function ContactPageClient() {
  const [shoot, setShoot] = useState("Wedding");
  const [callType, setCallType] = useState<CallTypeId>("Discovery");
  const [formState, formAction, pending] = useActionState<InquiryState, FormData>(
    sendInquiry,
    { status: "idle" },
  );
  const { resolvedTheme } = useTheme();
  const calTheme = resolvedTheme === "dark" ? "dark" : "light";

  // Configure the Cal.com embed UI to match the site's theme.
  useEffect(() => {
    (async () => {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: calTheme,
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (e) {
        console.warn("[contact] Cal.com getCalApi failed", e);
      }
    })();
  }, [calTheme]);

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
          {formState.status === "ok" ? (
            <div className="border border-line-soft bg-bg-2 p-7">
              <Label>— Sent</Label>
              <h3 className="mt-3 font-serif text-[clamp(32px,4vw,52px)] font-light leading-[1.05] tracking-[-0.02em]">
                Thanks. <em className="italic">I&rsquo;ll be in touch.</em>
              </h3>
              <p className="m-0 mt-3 font-serif text-[18px] font-light leading-[1.5] text-fg-2">
                Replies usually land within 48 hours. If anything&rsquo;s urgent,{" "}
                <a className="border-b border-line" href="mailto:hello@mannydevelops.com">
                  email me directly
                </a>
                .
              </p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-5.5">
              {/* Honeypot — bots fill this; real users don't see it */}
              <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
                <label>
                  Website (leave empty)
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-5 max-[880px]:grid-cols-1">
                <Field label="Your name" error={formState.status === "error" ? formState.fieldErrors?.name?.[0] : undefined}>
                  <input
                    name="name"
                    required
                    placeholder="First and last"
                    className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                  />
                </Field>
                <Field label="Email" error={formState.status === "error" ? formState.fieldErrors?.email?.[0] : undefined}>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                  />
                </Field>
              </div>

              <Field label="Type of shoot">
                <input type="hidden" name="shootType" value={shoot} />
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
                    name="dateApprox"
                    placeholder="MM / DD / YYYY"
                    className="w-full appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                  />
                </Field>
                <Field label="Budget">
                  <select
                    name="budget"
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

              <Field label="Tell me about it" error={formState.status === "error" ? formState.fieldErrors?.message?.[0] : undefined}>
                <textarea
                  name="message"
                  required
                  placeholder="Who, where, the vibe, any must-haves…"
                  rows={4}
                  className="w-full min-h-[100px] resize-y appearance-none border-0 border-b border-line-soft bg-transparent px-0 py-3 font-sans text-[16px] outline-none transition-colors duration-[240ms] placeholder:text-fg-3 focus:border-line"
                />
              </Field>

              {formState.status === "error" && !formState.fieldErrors && (
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[#c0392b]">
                  {formState.message}
                </p>
              )}

              {TURNSTILE_SITE_KEY && (
                <div className="pt-1">
                  <Turnstile
                    siteKey={TURNSTILE_SITE_KEY}
                    options={{
                      theme: resolvedTheme === "dark" ? "dark" : "light",
                      size: "flexible",
                    }}
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                  Replies within 48 hours
                </span>
                <Button type="submit" variant="primary" arrow disabled={pending}>
                  {pending ? "Sending…" : "Send inquiry"}
                </Button>
              </div>
            </form>
          )}
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

            <div className="overflow-hidden rounded-md border border-line-soft bg-bg">
              <Cal
                key={callType}
                calLink={CAL_LINKS[callType]}
                style={{ width: "100%", height: "640px", overflow: "auto" }}
                config={{ layout: "month_view", theme: calTheme }}
              />
            </div>
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

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-fg-2">
        {label}
      </span>
      {children}
      {error && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#c0392b]">
          {error}
        </span>
      )}
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

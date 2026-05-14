/* Centralized env-var access. Read once; surface clear errors when wiring is
 * incomplete. Server-only — do NOT import from a client component.
 */

import "server-only";

function read(name: string): string | undefined {
  const v = process.env[name];
  if (!v || v.trim() === "") return undefined;
  return v;
}

export const env = {
  resend: {
    apiKey: read("RESEND_API_KEY"),
    from: read("INQUIRY_FROM_EMAIL"),
    to: read("INQUIRY_TO_EMAIL"),
  },
  kit: {
    apiKey: read("KIT_API_KEY"),
    formIds: {
      presets: read("KIT_FORM_PRESETS_ID"),
      pricingGuide: read("KIT_FORM_PRICING_GUIDE_ID"),
      newsletter: read("KIT_FORM_NEWSLETTER_ID"),
      sticky: read("KIT_FORM_STICKY_ID") ?? read("KIT_FORM_PRESETS_ID"),
    },
  },
  turnstile: {
    siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    secretKey: read("TURNSTILE_SECRET_KEY"),
  },
};

export const RESEND_READY = Boolean(
  env.resend.apiKey && env.resend.from && env.resend.to,
);

export const KIT_READY = Boolean(env.kit.apiKey);

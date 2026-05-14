import { NextResponse } from "next/server";
import { z } from "zod";
import { env, KIT_READY } from "@/lib/env";

const SOURCES = ["presets", "pricing-guide", "newsletter", "sticky"] as const;

const Body = z.object({
  email: z.string().trim().email(),
  source: z.enum(SOURCES),
  // honeypot — accept any value at the schema, absorb silently in the handler
  website: z.string().optional(),
});

const FORM_IDS: Record<(typeof SOURCES)[number], string | undefined> = {
  presets: env.kit.formIds.presets,
  "pricing-guide": env.kit.formIds.pricingGuide,
  newsletter: env.kit.formIds.newsletter,
  sticky: env.kit.formIds.sticky,
};

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot tripped → pretend success
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { email, source } = parsed.data;
  const formId = FORM_IDS[source];

  if (!KIT_READY || !formId) {
    // Dev mode without credentials — log and pretend success so the UI is testable
    console.warn(
      `[subscribe] Kit not configured (set KIT_API_KEY + KIT_FORM_${source.toUpperCase().replace("-", "_")}_ID). ` +
        `Would have subscribed ${email} to ${source}.`,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: env.kit.apiKey, email }),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      console.error("[subscribe] Kit error", res.status, text);
      return NextResponse.json({ ok: false, error: "Subscribe failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe] Kit request threw", e);
    return NextResponse.json({ ok: false, error: "Subscribe failed" }, { status: 502 });
  }
}

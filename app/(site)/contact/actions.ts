"use server";

import { Resend } from "resend";
import { z } from "zod";
import { env, RESEND_READY } from "@/lib/env";

async function verifyTurnstile(token: string | null): Promise<boolean> {
  // Dev fallback — if no secret configured, skip verification entirely
  if (!env.turnstile.secretKey) return true;
  if (!token) return false;
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: env.turnstile.secretKey,
          response: token,
        }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (e) {
    console.error("[contact] Turnstile verify threw", e);
    return false;
  }
}

const SHOOT_TYPES = ["Wedding", "Portrait", "Family", "Commercial", "Editorial", "Other"] as const;

const InquirySchema = z.object({
  name: z.string().trim().min(2, "Please share your name.").max(120),
  email: z.string().trim().email("That doesn't look like a valid email."),
  shootType: z.enum(SHOOT_TYPES),
  dateApprox: z.string().trim().max(60).optional(),
  budget: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, "A few sentences, please.").max(4000),
  // Honeypot — bots fill this; real users never see it. Accept any value at the
  // schema layer so we can silently absorb the submission in the handler.
  website: z.string().optional(),
});

export type InquiryState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

const resend = env.resend.apiKey ? new Resend(env.resend.apiKey) : null;

export async function sendInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = InquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    shootType: formData.get("shootType"),
    dateApprox: formData.get("dateApprox") ?? undefined,
    budget: formData.get("budget") ?? undefined,
    message: formData.get("message"),
    website: formData.get("website") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Some fields need a fix.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  // Honeypot tripped — silently pretend success
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "ok" };
  }

  // Turnstile verification (skipped automatically in dev if no secret set)
  const tsToken = formData.get("cf-turnstile-response");
  const tsOk = await verifyTurnstile(typeof tsToken === "string" ? tsToken : null);
  if (!tsOk) {
    return {
      status: "error",
      message: "Couldn't verify you're human. Refresh the page and try again.",
    };
  }

  if (!RESEND_READY || !resend) {
    // Dev mode without credentials — log and pretend success so the UI is testable
    console.warn(
      "[contact] Resend not configured (set RESEND_API_KEY, INQUIRY_FROM_EMAIL, INQUIRY_TO_EMAIL). " +
        "Inquiry would have been:",
      parsed.data,
    );
    return { status: "ok" };
  }

  const { name, email, shootType, dateApprox, budget, message } = parsed.data;

  try {
    await resend.emails.send({
      from: env.resend.from!,
      to: env.resend.to!,
      replyTo: email,
      subject: `New inquiry · ${shootType} · ${name}`,
      html: `
        <p><strong>${name}</strong> &lt;${email}&gt;</p>
        <p><strong>Shoot:</strong> ${shootType}</p>
        ${dateApprox ? `<p><strong>Date (approx):</strong> ${dateApprox}</p>` : ""}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
        <hr />
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });
    return { status: "ok" };
  } catch (e) {
    console.error("[contact] Resend send failed", e);
    return {
      status: "error",
      message: "Something broke on our side. Try again, or email hello@mannydevelops.com directly.",
    };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

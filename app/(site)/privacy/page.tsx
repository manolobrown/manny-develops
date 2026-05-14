import { JsonLd } from "@/components/JsonLd";
import { Label } from "@/components/ui/Label";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";

export const metadata = metadataFor("/privacy");

const LAST_UPDATED = "May 14, 2026";

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={[webPageSchema("/privacy"), breadcrumbsSchema("/privacy")]} />
      <div className="mx-auto w-full max-w-3xl px-(--spacing-gutter) py-16 animate-page-fade">
        <Label>Legal</Label>
        <h1 className="mt-3 mb-2 font-serif text-[clamp(48px,6vw,88px)] font-extralight leading-[0.95] tracking-[-0.03em]">
          Privacy <em className="font-light italic">policy</em>.
        </h1>
        <p className="m-0 mb-12 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          Last updated · {LAST_UPDATED}
        </p>

        <Note>
          <strong className="font-semibold">Not legal advice.</strong> This is a plain-English summary of what
          this site collects and why. For anything formal, consult a lawyer in your jurisdiction.
        </Note>

        <Section title="Who runs this site">
          <p>
            <em>Manny Develops</em> is the photography practice of Manuel Peña, working out of Manhattan, NYC.
            Reach me at{" "}
            <a className="border-b border-current" href="mailto:hello@mannydevelops.com">
              hello@mannydevelops.com
            </a>
            .
          </p>
          <Todo>
            [TODO: confirm whether the business is a sole proprietorship, LLC, or other legal entity. Add the
            registered legal name + address if different from the practice name.]
          </Todo>
        </Section>

        <Section title="What this site collects">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Inquiry form data</strong> — when you fill out the Contact form, I receive your name,
              email, shoot type, approximate date, budget, and message. This goes to my inbox via Resend; I do
              not store it anywhere else.
            </li>
            <li>
              <strong>Email-list signups</strong> — when you opt in to the preset pack, pricing guide, or
              newsletter, your email is stored by Kit (ConvertKit) with a tag for which form you used.
              You can unsubscribe at any time using the link in every email.
            </li>
            <li>
              <strong>Scheduler bookings</strong> — when you book a call via the Cal.com widget on Contact,
              your name, email, and answers to any intake questions are stored by Cal.com.
            </li>
            <li>
              <strong>Spam protection</strong> — the Contact form runs Cloudflare Turnstile to filter bots.
              Cloudflare sees your IP and basic browser fingerprint for a few seconds while it scores the
              submission. No persistent profile is built.
            </li>
            <li>
              <strong>Hosting logs</strong> — my hosting provider keeps short-lived request logs (IP,
              timestamp, route) for security and performance, in line with their standard policy.
            </li>
          </ul>
          <Todo>
            [TODO: name your hosting provider explicitly once decided — e.g., Vercel, Cloudflare Pages,
            Netlify. Add a link to their privacy policy.]
          </Todo>
        </Section>

        <Section title="What I don't do">
          <ul className="list-disc pl-5 space-y-2">
            <li>I don&rsquo;t run third-party advertising trackers (no Facebook Pixel, no Google Ads, etc.).</li>
            <li>I don&rsquo;t sell or rent your email or any other data to anyone.</li>
            <li>I don&rsquo;t use cookies to track you across other websites.</li>
          </ul>
        </Section>

        <Section title="Cookies">
          <p>
            The site itself sets one cookie / localStorage key to remember your light or dark theme
            preference. The Cal.com booking widget and Cloudflare Turnstile each set their own
            functional cookies while you interact with them — see{" "}
            <a className="border-b border-current" href="https://cal.com/privacy" target="_blank" rel="noreferrer">
              Cal.com&rsquo;s policy
            </a>{" "}
            and{" "}
            <a className="border-b border-current" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
              Cloudflare&rsquo;s policy
            </a>{" "}
            for details.
          </p>
        </Section>

        <Section title="Who I share data with">
          <p>I use a small set of well-known processors:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Resend</strong> — sends the inquiry email to my inbox.{" "}
              <a className="border-b border-current" href="https://resend.com/legal/privacy-policy" target="_blank" rel="noreferrer">
                Privacy
              </a>
              .
            </li>
            <li>
              <strong>Kit (ConvertKit)</strong> — stores the email list and delivers auto-responders.{" "}
              <a className="border-b border-current" href="https://kit.com/privacy" target="_blank" rel="noreferrer">
                Privacy
              </a>
              .
            </li>
            <li>
              <strong>Cal.com</strong> — handles the booking flow.{" "}
              <a className="border-b border-current" href="https://cal.com/privacy" target="_blank" rel="noreferrer">
                Privacy
              </a>
              .
            </li>
            <li>
              <strong>Cloudflare Turnstile</strong> — bot detection on the Contact form.{" "}
              <a className="border-b border-current" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">
                Privacy
              </a>
              .
            </li>
          </ul>
          <Todo>
            [TODO: add Stripe to this list once shop checkout goes live. Add Google Analytics or any other
            analytics tool if you add one.]
          </Todo>
        </Section>

        <Section title="Your rights">
          <p>
            You can ask me at any time to access, correct, or delete data I have on you. Email{" "}
            <a className="border-b border-current" href="mailto:hello@mannydevelops.com">
              hello@mannydevelops.com
            </a>{" "}
            with the subject &ldquo;Data request&rdquo; and I&rsquo;ll respond within 30 days. Most jurisdictions
            give you the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Know what data I hold about you</li>
            <li>Ask me to correct or delete it</li>
            <li>Withdraw consent (e.g., unsubscribe from the email list)</li>
            <li>Lodge a complaint with your local data-protection authority</li>
          </ul>
        </Section>

        <Section title="Children">
          <p>
            This site is intended for adults. I don&rsquo;t knowingly collect data from anyone under 13. If
            you believe a child has submitted information here, email me and I&rsquo;ll delete it.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            I&rsquo;ll update the &ldquo;last updated&rdquo; date at the top whenever this page changes
            materially. For minor copy edits, no announcement. For anything substantive, I&rsquo;ll email the
            list.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy:{" "}
            <a className="border-b border-current" href="mailto:hello@mannydevelops.com">
              hello@mannydevelops.com
            </a>
            .
          </p>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="m-0 mb-4 font-serif text-[28px] font-light leading-[1.1] tracking-[-0.015em]">
        <em className="italic">{title}</em>.
      </h2>
      <div className="font-sans text-[16px] leading-[1.6] text-fg-2 space-y-4">{children}</div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-10 rounded-md border border-line-soft bg-bg-2 px-5 py-4 font-sans text-[14px] leading-[1.5] text-fg-2">
      {children}
    </div>
  );
}

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 border-l-2 border-[#c0392b] bg-[rgb(192_57_43_/_0.06)] px-4 py-2 font-mono text-[12px] leading-[1.5] text-[#c0392b]">
      {children}
    </div>
  );
}

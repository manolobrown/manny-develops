import { JsonLd } from "@/components/JsonLd";
import { Label } from "@/components/ui/Label";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";

export const metadata = metadataFor("/terms");

const LAST_UPDATED = "May 14, 2026";

export default function TermsPage() {
  return (
    <>
      <JsonLd data={[webPageSchema("/terms"), breadcrumbsSchema("/terms")]} />
      <div className="mx-auto w-full max-w-3xl px-(--spacing-gutter) py-16 animate-page-fade">
        <Label>Legal</Label>
        <h1 className="mt-3 mb-2 font-serif text-[clamp(48px,6vw,88px)] font-extralight leading-[0.95] tracking-[-0.03em]">
          Terms of <em className="font-light italic">service</em>.
        </h1>
        <p className="m-0 mb-12 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
          Last updated · {LAST_UPDATED}
        </p>

        <Note>
          <strong className="font-semibold">Not legal advice.</strong> These terms describe how I work with
          clients in plain English. Anything formal — wedding contracts, commercial licenses — is signed
          separately as part of a specific booking and supersedes anything here.
        </Note>

        <Section title="Acceptance">
          <p>
            By using this site or booking with me, you agree to these terms. If you don&rsquo;t, please don&rsquo;t
            use the site.
          </p>
        </Section>

        <Section title="What I offer">
          <p>
            Photography services (weddings, portraits, family, fitness, brand, editorial), printed work
            (archival pigment prints), and digital products (Lightroom preset packs). Detailed deliverables
            and pricing for each are described on{" "}
            <a className="border-b border-current" href="/services">
              /services
            </a>{" "}
            and{" "}
            <a className="border-b border-current" href="/shop">
              /shop
            </a>
            .
          </p>
        </Section>

        <Section title="Bookings & cancellations">
          <p>
            A signed agreement and a non-refundable retainer reserve your date. Final balance is due before
            delivery.
          </p>
          <Todo>
            [TODO: confirm retainer percentage (commonly 25–50%), final-balance timing (e.g., 30 days before
            shoot, day of, on delivery), cancellation/refund window, rescheduling policy, and weather
            policy for outdoor shoots. Numbers vary by package; this section should match your contract
            template.]
          </Todo>
        </Section>

        <Section title="Payment">
          <p>
            Payment is in USD via the methods I&rsquo;ll provide on invoice. Late payments accrue interest at
            the lower of 1.5% per month or the maximum allowed by law.
          </p>
          <Todo>
            [TODO: confirm payment methods accepted (Stripe, bank transfer, check), invoice timing, and
            whether you charge sales tax on prints / digital products in your jurisdiction.]
          </Todo>
        </Section>

        <Section title="Copyright & usage rights">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Copyright stays with me.</strong> Manuel Peña retains copyright to all photographs.
            </li>
            <li>
              <strong>Personal-use license.</strong> Every package includes a personal print and personal-use
              social media license — you can print, share, and post your photos. You can&rsquo;t resell them
              or license them to a third party.
            </li>
            <li>
              <strong>Commercial license.</strong> Brand, editorial, and commercial uses require a separate
              commercial license — described on the invoice for each commissioned shoot.
            </li>
            <li>
              <strong>My portfolio rights.</strong> I may use a portion of the work in my portfolio, blog,
              social media, and submissions to publications, unless you ask me in writing not to.
            </li>
          </ul>
        </Section>

        <Section title="Prints & shop purchases">
          <p>
            Prints are made-to-order and final sale unless they arrive damaged in transit — in which case I
            replace them. Digital products (preset packs) are non-refundable once downloaded.
          </p>
          <Todo>
            [TODO: confirm return window for damaged prints (commonly 7–14 days from receipt), and whether
            limited editions can be re-ordered after sellout.]
          </Todo>
        </Section>

        <Section title="Disclaimer of warranties">
          <p>
            The site is provided &ldquo;as is&rdquo; without warranties. I try to keep everything accurate
            and working, but I can&rsquo;t guarantee uninterrupted availability or that all information is
            current.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            My total liability for any claim related to this site or my services is limited to the amount
            you paid me in the 12 months before the claim. I&rsquo;m not liable for indirect or
            consequential damages.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These terms are governed by the laws of the State of New York, USA, without regard to its
            conflict-of-laws principles. Disputes will be resolved in courts located in New York County, NY.
          </p>
          <Todo>
            [TODO: if you incorporate in a different state, update the governing-law state here. If you want
            mandatory arbitration instead of court, add an arbitration clause — talk to a lawyer.]
          </Todo>
        </Section>

        <Section title="Changes">
          <p>
            I may update these terms. Material changes will be noted by bumping the &ldquo;last updated&rdquo;
            date at the top of this page.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions:{" "}
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

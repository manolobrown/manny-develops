import { JsonLd } from "@/components/JsonLd";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";
import { JournalPageClient } from "./page.client";

export const metadata = metadataFor("/journal");

export default function Page() {
  return (
    <>
      <JsonLd data={[webPageSchema("/journal"), breadcrumbsSchema("/journal")]} />
      <JournalPageClient />
    </>
  );
}

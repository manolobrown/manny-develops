import { JsonLd } from "@/components/JsonLd";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";
import { ContactPageClient } from "./page.client";

export const metadata = metadataFor("/contact");

export default function Page() {
  return (
    <>
      <JsonLd data={[webPageSchema("/contact"), breadcrumbsSchema("/contact")]} />
      <ContactPageClient />
    </>
  );
}

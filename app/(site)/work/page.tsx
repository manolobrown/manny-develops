import { JsonLd } from "@/components/JsonLd";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema } from "@/lib/seo";
import { WorkPageClient } from "./page.client";

export const metadata = metadataFor("/work");

export default function Page() {
  return (
    <>
      <JsonLd data={[webPageSchema("/work"), breadcrumbsSchema("/work")]} />
      <WorkPageClient />
    </>
  );
}

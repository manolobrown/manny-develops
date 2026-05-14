import { JsonLd } from "@/components/JsonLd";
import { metadataFor } from "@/lib/site";
import { webPageSchema, breadcrumbsSchema, shopSchema } from "@/lib/seo";
import { ShopPageClient } from "./page.client";

export const metadata = metadataFor("/shop");

export default function Page() {
  return (
    <>
      <JsonLd data={[webPageSchema("/shop"), breadcrumbsSchema("/shop"), shopSchema()]} />
      <ShopPageClient />
    </>
  );
}

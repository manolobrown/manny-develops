/* Renders one or more JSON-LD objects as a server-rendered <script> tag.
 * Pass a single object or an array.
 */

type Props = {
  data: object | object[] | null | undefined;
};

export function JsonLd({ data }: Props) {
  if (!data) return null;
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.filter(Boolean).map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Server-rendered only; safe because the input is typed (not user input)
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

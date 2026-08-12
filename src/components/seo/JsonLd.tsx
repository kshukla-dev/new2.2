/**
 * Renders JSON-LD structured data for SEO. Server-only; no client state or useEffect.
 * Use with buildPageSchemaGraph() from @/lib/schema.
 *
 * - data: single schema object (e.g. @graph from buildPageSchemaGraph) → one script tag
 * - data: array of schema objects → multiple script tags (each with own @context if needed)
 */
export function JsonLd({
  data,
}: {
  data: object | object[]
}) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

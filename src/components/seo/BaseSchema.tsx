import { JsonLd } from './JsonLd'
import { buildPageSchemaGraph } from '@/lib/schema'

/**
 * Emits the Organization + WebSite base graph as a single JSON-LD block.
 *
 * Drop this into any route that has no richer page-specific schema so it still
 * carries the site's base entities. Pages that DO have their own schema use
 * buildPageSchemaGraph() instead (which already prepends the base), giving them
 * one combined block. The root layout intentionally does NOT emit a base block,
 * so page-level schema is the first JSON-LD block a crawler/inspector sees.
 */
export function BaseSchema() {
  // buildPageSchemaGraph([]) yields the base-only graph (Organization + WebSite).
  return <JsonLd data={buildPageSchemaGraph([])} />
}

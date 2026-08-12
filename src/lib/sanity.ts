import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Server-only token (NO NEXT_PUBLIC_ prefix so it never reaches the browser
// bundle). When set, reads are authenticated and skip the CDN so newly
// published blog posts appear immediately instead of waiting for CDN cache
// to expire. Without it, the client keeps the previous public/CDN behaviour.
const sanityToken = process.env.SANITY_API_TOKEN

// True only when a non-empty token is configured. Callers use this to skip
// Sanity requests (and prompt to add the token) instead of erroring.
export const hasSanityToken = Boolean(sanityToken && sanityToken.trim())

export const sanityClient = createClient({
  projectId: 'ahga2z6q',
  dataset: 'production',
  apiVersion: '2023-05-03',
  // Fresh, uncached reads when authenticated; CDN otherwise.
  useCdn: !sanityToken,
  token: sanityToken || undefined,
  // Only ever return published documents, never drafts.
  perspective: 'published',
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

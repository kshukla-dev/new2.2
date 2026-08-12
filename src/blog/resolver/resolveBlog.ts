import { fetchBlogBySlug } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'

/**
 * Resolve a blog post by its URL slug.
 * Tries manual posts first, then Sanity, then the legacy CMS API.
 */
export async function resolveBlog(slug: string): Promise<BlogPost | null> {
  return fetchBlogBySlug(slug)
}

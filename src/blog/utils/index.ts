// Re-export all blog utility functions from the canonical utils location
export {
  ensureImageAlt,
  applyStatCorrections,
  demoteBodyH1s,
  formatBlogDate,
} from '@/utils/blog'

import type { BlogPost } from '@/types/blog'

/**
 * Returns up to 3 related blog posts for a given post.
 * First uses the post's own related_articles field, then falls back to
 * posts that share a category, then fills with the most recent posts.
 */
export function getRelatedBlogs(post: BlogPost, all: BlogPost[]): BlogPost[] {
  const others = all.filter(b => b.slug !== post.slug)

  // 1. Use explicitly linked related articles if available
  if (post.related_articles && post.related_articles.length > 0) {
    const relatedSlugs = new Set(post.related_articles.map(r => r.slug))
    const fromRelated = others.filter(b => relatedSlugs.has(b.slug))
    if (fromRelated.length >= 3) return fromRelated.slice(0, 3)
  }

  // 2. Same category fallback
  const postCats = (post.category_ids ?? '').split(',').map(s => s.trim()).filter(Boolean)
  const sameCat = others.filter(b => {
    const bCats = (b.category_ids ?? '').split(',').map(s => s.trim()).filter(Boolean)
    return bCats.some(c => postCats.includes(c))
  })

  if (sameCat.length >= 3) return sameCat.slice(0, 3)

  // 3. Fill remainder with most recent
  const remaining = others.filter(b => !sameCat.includes(b))
  const sorted = remaining.sort((a, b) => {
    return (b.publish_date ? +new Date(b.publish_date) : 0) - (a.publish_date ? +new Date(a.publish_date) : 0)
  })

  return [...sameCat, ...sorted].slice(0, 3)
}

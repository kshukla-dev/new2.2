// ============================================================
// @/blog — Central blog module entry point
// All blog-related imports should come from here.
// ============================================================

// Types
export type { Author, Category, Tag, RelatedArticle, BlogPost } from './types'

// Data fetching services (delegates to src/lib/blog.ts)
export { fetchAllBlogs, fetchBlogSummaries, fetchBlogBySlug, fetchBlogPage, fetchCategories, fetchTags } from './services'

// Slug resolver
export { resolveBlog } from './resolver/resolveBlog'

// Content utilities + getRelatedBlogs
export { ensureImageAlt, applyStatCorrections, demoteBodyH1s, formatBlogDate, getRelatedBlogs } from './utils'

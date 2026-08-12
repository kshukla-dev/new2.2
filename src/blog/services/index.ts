// Re-export all blog service functions from the canonical lib location
export {
  fetchAllBlogs,
  fetchBlogSummaries,
  fetchBlogBySlug,
  fetchBlogPage,
  fetchCategories,
  fetchTags,
} from '@/lib/blog'

import { unstable_cache } from 'next/cache'
import { resolveBlog, fetchBlogSummaries } from '@/blog'
import type { BlogPost } from '@/types/blog'

// The blog data comes from Sanity via GROQ, which is sent as an HTTP POST for
// anything but the shortest query. Next's fetch cache only caches GET requests,
// so `next: { revalidate }` on those reads never engages and a single uncached
// read drags the whole /blog/[slug] route into dynamic rendering (the cause of
// the multi-second blog load times).
//
// unstable_cache caches the function's *return value* regardless of how the
// data was fetched, and forms a cache boundary so the inner POST no longer
// forces the route dynamic. That lets the page be statically cached (ISR) and
// regenerate hourly. Both the page and its generateMetadata share these keys,
// so the post is fetched once per render, not twice. Bust with
// revalidateTag('blogs') from a Sanity publish webhook for instant freshness.

export const getCachedBlog = unstable_cache(
  async (slug: string): Promise<BlogPost | null> => resolveBlog(slug),
  ['blog-detail'],
  { revalidate: 3600, tags: ['blogs'] }
)

export const getCachedBlogSummaries = unstable_cache(
  async (): Promise<BlogPost[]> => fetchBlogSummaries(),
  ['blog-summaries'],
  { revalidate: 3600, tags: ['blogs'] }
)

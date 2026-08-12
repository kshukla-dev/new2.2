import { notFound } from 'next/navigation'
import { fetchAllBlogs, getRelatedBlogs } from '@/blog'
import { getCachedBlog, getCachedBlogSummaries } from './cached-data'
import {
  buildPageSchemaGraph,
  buildArticleSchema,
  buildFaqSchema,
  WORK_VISA_EUROPE_GUIDE_GRAPH,
} from '@/lib/schema'
import { WORK_VISA_EUROPE_GUIDE_SLUG } from '@/data/manual-blog-posts'
import { JsonLd } from '@/components/seo/JsonLd'
import type { BlogPost } from '@/types/blog'
import BlogDetailClient from './BlogDetailClient'

// ISR: statically cache each post and regenerate at most once per hour. This
// keeps crawler/user load times to a cached-HTML response (a few hundred ms)
// instead of re-running the CMS fetches on every request, while published
// edits still go live within the hour. On-demand revalidation can be layered
// on later (revalidatePath('/blog/<slug>') from a Sanity publish webhook) for
// instant freshness.
export const revalidate = 3600

// Prebuild every known post at build time so they ship as static HTML (fast for
// crawlers and users from the first hit). Uses fetchAllBlogs so legacy old-CMS
// posts are covered too, not just Sanity/manual ones — this runs once per build,
// so the heavier full fetch is fine here. Unknown slugs still render on demand
// and are then cached (dynamicParams defaults to true).
export async function generateStaticParams() {
  try {
    const posts = await fetchAllBlogs()
    const slugs = posts
      .map((p) => p.slug)
      .filter((s): s is string => Boolean(s))
    // De-duplicate — the same slug can appear across sources.
    return Array.from(new Set(slugs)).map((slug) => ({ slug }))
  } catch {
    return []
  }
}

/** Split a comma-separated CMS field into clean tokens. */
function splitTokens(raw?: string): string[] {
  return (raw || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

/**
 * Article/BlogPosting structured data for the post. Drives article rich results
 * (headline, author, dates, image) and carries the E-E-A-T signals: a resolvable
 * author Person entity, publisher Organization, and published/modified dates.
 */
function buildBlogSchema(post: BlogPost, slug: string) {
  // FAQPage from the same faq_items the page renders (BlogDetailClient →
  // FAQSection). Without this the visible FAQ ships no structured data, so it
  // is ineligible for FAQ rich results. Built once and merged into every blog
  // graph below (hand-authored and auto-generated alike).
  const faqItems = (post.faq_items ?? []).filter(
    (f) => f?.question?.trim() && f?.answer?.trim()
  )
  const faqGraph = faqItems.length
    ? buildFaqSchema({ path: `/blog/${slug}`, faq: faqItems })
    : []

  // This guide has a hand-authored graph with reviewer + citation nodes.
  if (slug === WORK_VISA_EUROPE_GUIDE_SLUG) {
    return buildPageSchemaGraph([...WORK_VISA_EUROPE_GUIDE_GRAPH, ...faqGraph])
  }

  const categories = splitTokens(post.category_ids)
  const tags = splitTokens(post.tag_ids)

  return buildPageSchemaGraph([
    ...buildArticleSchema({
      path: `/blog/${slug}`,
      name: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      datePublished: post.publish_date,
      dateModified: post.updated_at || post.publish_date,
      image: post.image_url || undefined,
      author: post.author?.name || undefined,
      pageNameForBreadcrumb: post.title,
      ...(tags.length && { keywords: tags }),
      ...(categories.length && { articleSection: categories[0] }),
    }),
    ...faqGraph,
  ])
}

/**
 * Server component: resolves the post before rendering so the article body,
 * headings and internal links are present in the HTML. Crawlers that do not
 * execute JavaScript (AI crawlers, social scrapers) can therefore read the
 * article, and an unknown slug returns the not-found page.
 */
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await getCachedBlog(slug)
  if (!post) notFound()

  let related: BlogPost[] = []
  try {
    // Lightweight summaries (no article body), cached so this stays inside a
    // cache boundary and the page remains statically cacheable (ISR).
    const all = await getCachedBlogSummaries()
    related = getRelatedBlogs(post, all)
  } catch {
    related = []
  }

  return (
    <>
      <JsonLd data={buildBlogSchema(post, slug)} />
      <BlogDetailClient post={post} related={related} slug={slug} />
    </>
  )
}

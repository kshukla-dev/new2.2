'use server'

import type { BlogPost, Category, Tag } from '@/types/blog'
import { mergeManualBlogPosts, getManualBlogBySlug } from '@/data/manual-blog-posts'
import { sanityClient, hasSanityToken } from './sanity'

let API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ?? 'https://www.jacksonandfrank.com/api/v1'
if (API_BASE.startsWith('/')) {
  API_BASE = 'https://www.jacksonandfrank.com' + API_BASE
}
const TIMEOUT_MS = 15000

// Cache CMS reads (Sanity + old API) for an hour so blog pages render from the
// ISR cache instead of re-fetching on every request — the previous behaviour
// (force-dynamic) is what caused the multi-second blog load times. Bust the
// cache on publish with revalidateTag('blogs') from a webhook when instant
// freshness is needed.
const BLOG_CACHE = { next: { revalidate: 3600, tags: ['blogs'] } }

async function getJson<T>(path: string): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${API_BASE}/${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...BLOG_CACHE,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} for ${path}`)
    return (await res.json()) as T
  } finally {
    clearTimeout(timer)
  }
}

// Maps the `blogPost` Sanity schema (project ahga2z6q) onto the BlogPost shape
// the UI expects. Every field has a fallback (coalesce / literal) so a partially
// filled document still renders instead of throwing. The article body is
// Portable Text (`body`) — the detail page renders it via <PortableText/>, and
// falls back to `page_content` HTML only when there is no body.
const POST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  "page_content": "",
  "image_url": coalesce(coverImage.asset->url, coverImageUrl, ""),
  "image_alt": coalesce(coverImage.alt, title),
  "page_type": "blog",
  "featured_page": select(featured == true => 1, 0),
  "estimated_reading_time": estimatedReadingTime,
  "meta_title": coalesce(metaTitle, title),
  "meta_description": coalesce(metaDescription, excerpt, ""),
  "canonical_url": coalesce(canonicalUrl, ""),
  "keywords": coalesce(keywords, ""),
  "status": "PUBLISHED",
  "publish_date": coalesce(publishDate, _createdAt),
  "updated_at": coalesce(updatedDate, _updatedAt),
  "created_at": _createdAt,
  "toc_items": tocItems[]{ "title": title, "anchor": anchor, "level": level },
  "faq_title": faqTitle,
  "faq_subtitle": faqSubtitle,
  "faq_items": faqItems[]{ question, answer },
  "author": coalesce(
    author->{ "id": _id, "name": name, "email": coalesce(email, "") },
    contributors[0].person->{ "id": _id, "name": name, "email": coalesce(email, "") }
  ),
  "categories": categories[]->{ "id": _id, "category_name": name, "slug": slug.current }
`

// Lightweight projection for list/related-post candidates. Everything
// getRelatedBlogs and the blog cards need (slug, title, excerpt, image, date,
// category) and nothing heavy — notably NOT the article `body` Portable Text.
// Keeping this small keeps the cached fetch entry under Next's 2MB data-cache
// limit, so pages that only need summaries stay statically cacheable (ISR)
// instead of silently falling back to dynamic rendering.
const SUMMARY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  "image_url": coalesce(coverImage.asset->url, coverImageUrl, ""),
  "image_alt": coalesce(coverImage.alt, title),
  "page_type": "blog",
  "featured_page": select(featured == true => 1, 0),
  "meta_title": coalesce(metaTitle, title),
  "meta_description": coalesce(metaDescription, excerpt, ""),
  "keywords": coalesce(keywords, ""),
  "publish_date": coalesce(publishDate, _createdAt),
  "updated_at": coalesce(updatedDate, _updatedAt),
  "created_at": _createdAt,
  "categories": categories[]->{ "id": _id, "category_name": name, "slug": slug.current }
`

function mapSanityPost(post: any): BlogPost {
  if (!post) return post
  const keywords: string = typeof post.keywords === 'string' ? post.keywords : ''
  const tags = keywords
    ? keywords.split(',').map((s: string) => s.trim()).filter(Boolean)
    : []
  const inThisGuide = Array.isArray(post.toc_items)
    ? post.toc_items
        .filter((t: any) => t?.title && t?.anchor)
        .map((t: any) => ({ title: t.title as string, url: `#${t.anchor}` }))
    : []
  return {
    ...post,
    // Normalize slugs authored with a leading/trailing slash (e.g. "/my-post")
    // so links (/blog/my-post) and lookups resolve regardless of how the slug
    // was typed in the Studio.
    slug: normalizeSlug(post.slug),
    related_articles: Array.isArray(post.related_articles)
      ? post.related_articles.map((r: any) => ({ ...r, slug: normalizeSlug(r?.slug) }))
      : post.related_articles,
    publish_date: post.publish_date || post.created_at || new Date().toISOString(),
    category_ids: post.categories?.map((c: any) => c?.slug).filter(Boolean).join(',') || '',
    tag_ids: tags.join(','),
    in_this_guide: inThisGuide.length ? inThisGuide : post.in_this_guide,
  }
}

/** Strip leading/trailing slashes from a CMS slug. */
function normalizeSlug(slug: unknown): string {
  return typeof slug === 'string' ? slug.replace(/^\/+|\/+$/g, '') : (slug as string)
}

export async function fetchBlogPage(
  page = 1,
  limit = 50
): Promise<{ results: BlogPost[]; count: number }> {
  const start = (page - 1) * limit
  const end = start + limit

  if (!hasSanityToken) {
    console.log('please add sanity token')
    return { results: [], count: 0 }
  }

  const query = `*[_type == "blogPost"] | order(coalesce(publishDate, _createdAt) desc) [${start}...${end}] {
    ${POST_FIELDS}
  }`
  const countQuery = `count(*[_type == "blogPost"])`

  try {
    const [results, count] = await Promise.all([
      sanityClient.fetch(query, {}, BLOG_CACHE),
      sanityClient.fetch(countQuery, {}, BLOG_CACHE)
    ])
    return {
      results: results.map(mapSanityPost),
      count
    }
  } catch {
    console.log('sanity empty')
    return { results: [], count: 0 }
  }
}

export async function fetchAllBlogs(): Promise<BlogPost[]> {
  const all: BlogPost[] = []

  // 1. Fetch from Old CMS API
  try {
    let page = 1
    let guard = 0
    while (guard++ < 20) {
      const json = await getJson<any>(`dynamic-page?page=${page}&limit=50`)
      const results = json?.data?.results || json?.data?.data || []
      if (results.length === 0) break
      all.push(...results)
      if (results.length < 50) break
      page++
    }
  } catch (err) {
    console.error('Error fetching blogs from old CMS API:', err)
  }

  // 2. Fetch from Sanity (blogs only — nothing else is sourced from Sanity)
  if (!hasSanityToken) {
    // No token configured — prompt to add it, don't error.
    console.log('please add sanity token')
  } else {
    try {
      // perspective:'published' (see sanity.ts) already excludes drafts, so no
      // custom status filter — publishing in the Studio makes a post live.
      const query = `*[_type == "blogPost"] | order(coalesce(publishDate, _createdAt) desc) {
        ${POST_FIELDS}
      }`
      const sanityResults = await sanityClient.fetch(query, {}, BLOG_CACHE)
      if (!sanityResults || sanityResults.length === 0) {
        // No published blogs came back from Sanity.
        console.log('sanity empty')
      } else {
        // Blogs found — stay silent.
        all.push(...sanityResults.map(mapSanityPost))
      }
    } catch {
      // Treat any Sanity failure as "no blogs came back".
      console.log('sanity empty')
    }
  }

  // 3. Merge with manual blogs
  return mergeManualBlogPosts(all)
}

/**
 * Lightweight list of all published blogs (no article body) for use as
 * related-post candidates and card grids. Much cheaper than fetchAllBlogs and,
 * crucially, small enough to stay inside Next's fetch data-cache so the calling
 * page can be statically cached (ISR). Sourced from Sanity + manual posts —
 * the live content set — and skips the legacy old-CMS pagination loop.
 */
export async function fetchBlogSummaries(): Promise<BlogPost[]> {
  const all: BlogPost[] = []

  if (hasSanityToken) {
    try {
      const query = `*[_type == "blogPost"] | order(coalesce(publishDate, _createdAt) desc) {
        ${SUMMARY_FIELDS}
      }`
      const results = await sanityClient.fetch(query, {}, BLOG_CACHE)
      if (results?.length) all.push(...results.map(mapSanityPost))
    } catch {
      // Treat any Sanity failure as "no blogs came back".
    }
  }

  return mergeManualBlogPosts(all)
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const manual = getManualBlogBySlug(slug)
  if (manual) return manual

  // 1. Try Sanity (only when a token is configured)
  if (hasSanityToken) try {
    // Match the slug with or without a leading slash. Visibility is controlled
    // by the client's perspective:'published' (native Sanity publish state), so
    // no custom status filter is needed.
    const query = `*[_type == "blogPost" && (slug.current == $slug || slug.current == "/" + $slug)][0] {
      ${POST_FIELDS},
      "related_articles": relatedPosts[]->{
        "id": _id,
        title,
        "slug": slug.current,
        excerpt,
        "image_url": coalesce(coverImage.asset->url, coverImageUrl, ""),
        "publish_date": coalesce(publishDate, _createdAt),
        "page_type": "blog"
      }
    }`
    const result = await sanityClient.fetch(query, { slug }, BLOG_CACHE)
    if (result) return mapSanityPost(result)
  } catch {
    // Silent — fall through to the old API / manual lookup.
  }

  // 2. Try Old API
  try {
    const json = await getJson<any>(`dynamic-page/slug/${encodeURIComponent(slug)}`)
    if (json?.success && json?.data) return json.data
    if (json?.slug) return json
  } catch (err) {
    console.error('Error fetching blog by slug from old CMS API:', err)
  }

  return null
}

export async function fetchCategories(): Promise<Category[]> {
  const allCats: Category[] = []

  // 1. Fetch Old API Categories
  try {
    const json = await getJson<any>('category')
    const results = json?.data?.rows || json?.data || []
    allCats.push(...results)
  } catch (err) {
    console.error('Error fetching categories from old CMS API:', err)
  }

  // 2. Fetch Sanity blog categories (needed to label/filter Sanity blog posts).
  //    Skipped silently when no token is configured; never logs on failure.
  if (hasSanityToken) try {
    const query = `*[_type == "blogCategory"] {
      "id": _id,
      "category_name": name,
      "slug": slug.current
    }`
    const sanityCats = await sanityClient.fetch(query, {}, BLOG_CACHE)
    allCats.push(...sanityCats)
  } catch {
    // Silent.
  }

  return allCats
}

export async function fetchTags(): Promise<Tag[]> {
  if (!hasSanityToken) return []
  try {
    // The blogPost schema has no tags array — keywords is a comma-separated
    // string. Collect and de-duplicate them into tag objects.
    const raw: string[] = await sanityClient.fetch(
      `*[_type == "blogPost" && status == "published" && defined(keywords)].keywords`,
      {},
      BLOG_CACHE
    )
    const set = new Set<string>()
    ;(raw || []).forEach((k) =>
      (k || '').split(',').forEach((t) => {
        const v = t.trim()
        if (v) set.add(v)
      })
    )
    return Array.from(set).map((t, i) => ({ id: i, tag_name: t, name: t, tag: t }))
  } catch {
    return []
  }
}

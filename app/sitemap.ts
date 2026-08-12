import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'
import { fetchAllBlogs } from '@/blog'

/**
 * Regenerate hourly so newly published posts (CMS or Sanity) enter the sitemap
 * without a redeploy. Kept as ISR rather than force-dynamic so repeated crawler
 * or bot hits don't re-query the CMS on every request.
 */
export const revalidate = 3600

import caseStudiesData from '@/data/case-studies.json'

// Static routes that exist as real pages in this repo.
const STATIC_ROUTES = [
  '',
  '/about-us',
  '/advantages',
  '/career',
  '/compliance',
  '/contact',
  '/contractor',
  '/cost-calculator',
  '/employer-of-record',
  '/events',
  '/faq',
  '/global-hiring-guide',
  '/immigration',
  '/payroll',
  '/privacy-policy',
  '/testimonials',
  '/blog',
  '/case-studies',
  '/sitemaps',
  '/resources/events/china-europe-2026',
]

const COUNTRY_ROUTES = [
  '/united-kingdom',
  '/poland',
  '/germany',
  '/italy',
  '/india',
  '/czech-republic',
  '/france',
  '/belgium',
  '/spain',
  '/uae',
  '/netherlands',
  '/china',
  '/hong-kong',
  '/netherlands-contractor',
  '/united-kingdom-contractor',
  '/poland-contractor',
  '/germany-contractor',
  '/italy-contractor',
  '/india-contractor',
  '/czech-republic-contractor',
  '/france-contractor',
  '/belgium-contractor',
  '/spain-contractor',
  '/uae-contractor',
]

const INSIGHT_INDEX = new Set(['/blog', '/case-studies', '/global-hiring-guide', '/events'])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url
  const now = new Date()

  const routes = Array.from(new Set([...STATIC_ROUTES, ...COUNTRY_ROUTES]))

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => {
    const isHome = route === ''
    const isIndex = INSIGHT_INDEX.has(route)
    return {
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: (isHome || isIndex ? 'daily' : 'weekly') as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: isHome ? 1 : isIndex ? 0.9 : 0.8,
    }
  })

  // Case study detail pages
  const caseStudyPages: MetadataRoute.Sitemap = (caseStudiesData.caseStudies || [])
    .filter((cs: { slug?: string }) => cs?.slug)
    .map((cs: { slug: string; date?: string }) => ({
      url: `${baseUrl}/case-studies/${cs.slug}`,
      lastModified: cs.date ? new Date(cs.date) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Blog pages (custom CMS + Sanity + manual posts, already merged)
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const blogs = await fetchAllBlogs()
    blogPages = blogs
      .filter((b) => b?.slug && b.slug.trim() !== '')
      .map((b) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.updated_at || b.publish_date || now.toISOString()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
  } catch {
    blogPages = []
  }

  return [...staticRoutes, ...caseStudyPages, ...blogPages]
}

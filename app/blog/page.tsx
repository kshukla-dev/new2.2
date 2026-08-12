import { fetchAllBlogs, fetchCategories } from '@/lib/blog'
import {
  buildPageSchemaGraph,
  buildCollectionPageSchema,
  buildFaqSchema,
} from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import type { BlogPost, Category } from '@/types/blog'
import blogData from '@/data/blog.json'
import BlogListClient from './BlogListClient'

// Always serve the freshest post list from the CMS, matching jf_website_2.0.
export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Server component: loads the post list before rendering so every post link
 * and title is in the HTML. Without this the list only appeared after
 * hydration, leaving crawlers with no path from /blog to individual articles.
 */
export default async function BlogPage() {
  let blogs: BlogPost[] = []
  let categories: Category[] = []

  try {
    const [bs, cats] = await Promise.all([fetchAllBlogs(), fetchCategories()])
    blogs = bs
    categories = cats
  } catch {
    // Still render the page shell if the CMS is unreachable.
    blogs = []
    categories = []
  }

  const schema = buildPageSchemaGraph([
    ...buildCollectionPageSchema({
      path: '/blog',
      name: 'Blog - Global HR & EOR Insights',
      description:
        'Insights on global workforce management, hiring trends, payroll, immigration, and Employer of Record best practices across 17+ countries.',
      numberOfItems: blogs.length,
      pageNameForBreadcrumb: 'Blog',
    }),
    ...buildFaqSchema({ path: '/blog', faq: blogData.faqs.items }),
  ])

  return (
    <>
      <JsonLd data={schema} />
      <BlogListClient blogs={blogs} categories={categories} />
    </>
  )
}

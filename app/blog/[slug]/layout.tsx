import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getCachedBlog } from './cached-data'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getCachedBlog(slug)

  if (!post) {
    return genMeta({
      title: 'Post not found',
      path: `/blog/${slug}`,
      noIndex: true,
      absoluteTitle: true,
    })
  }

  return genMeta({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/blog/${slug}`,
    image: post.image_url,
    type: 'article',
    publishedTime: post.publish_date,
    modifiedTime: post.updated_at,
    authors: post.author ? [post.author.name] : undefined,
    absoluteTitle: true,
  })
}

export default function BlogSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

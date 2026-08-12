import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import caseData from '@/data/case-studies.json'

interface CaseStudy {
  slug: string
  title: string
  excerpt?: string
  image?: string
  date?: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = (caseData.caseStudies as CaseStudy[]).find((c) => c.slug === slug)

  if (!study) {
    return genMeta({
      title: 'Case study not found',
      path: `/case-studies/${slug}`,
      noIndex: true,
      absoluteTitle: true,
    })
  }

  return genMeta({
    title: study.title,
    description: study.excerpt,
    path: `/case-studies/${slug}`,
    image: study.image,
    type: 'article',
    publishedTime: study.date,
    absoluteTitle: true,
  })
}

export default function CaseStudySlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

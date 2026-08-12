import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import caseData from '@/data/case-studies.json'

export const metadata: Metadata = genMeta({
  title: caseData.metadata.title,
  description: caseData.metadata.description,
  path: '/case-studies',
})

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Blog - Global HR & EOR Insights',
  description:
    'Insights on global workforce management, hiring trends, payroll, immigration, and Employer of Record best practices across 17+ countries.',
  path: '/blog',
})

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

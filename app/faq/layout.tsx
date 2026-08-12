import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import faqData from '@/data/faq-page.json'

export const metadata: Metadata = genMeta({
  title: `${faqData.title} | Jackson & Frank`,
  description: faqData.subtitle,
  path: '/faq',
})

export default function FaqLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

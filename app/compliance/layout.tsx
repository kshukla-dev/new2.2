import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import compliance from '@/data/compliance.json'

export const metadata: Metadata = genMeta({
  title: compliance.metadata.title,
  description: compliance.metadata.description,
  path: '/compliance',
  image: compliance.metadata.openGraph?.images?.[0]?.url,
})

export default function ComplianceLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

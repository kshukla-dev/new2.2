import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import contractor from '@/data/contractor.json'

export const metadata: Metadata = genMeta({
  title: contractor.metadata.title,
  description: contractor.metadata.description,
  path: '/contractor',
  image: contractor.metadata.openGraph?.images?.[0]?.url,
})

export default function ContractorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

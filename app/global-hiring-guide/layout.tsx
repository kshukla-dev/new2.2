import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import ghg from '@/data/global-hiring.json'

export const metadata: Metadata = genMeta({
  title: ghg.metadata.title,
  description: ghg.metadata.description,
  path: '/global-hiring-guide',
  image: ghg.metadata.openGraph?.images?.[0]?.url,
})

export default function GlobalHiringGuideLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

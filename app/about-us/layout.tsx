import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import about from '@/data/about-us.json'

export const metadata: Metadata = genMeta({
  title: about.metadata.title,
  description: about.metadata.description,
  path: '/about-us',
  image: about.metadata.openGraph?.images?.[0]?.url,
})

export default function AboutUsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import advantages from '@/data/advantages.json'

export const metadata: Metadata = genMeta({
  title: advantages.metadata.title,
  description: advantages.metadata.description,
  path: '/advantages',
  image: advantages.metadata.openGraph?.images?.[0]?.url,
})

export default function AdvantagesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

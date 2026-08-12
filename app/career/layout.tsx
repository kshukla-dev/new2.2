import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import career from '@/data/career.json'

export const metadata: Metadata = genMeta({
  title: career.definition.title,
  description: career.definition.description,
  path: '/career',
  image: career.definition.image,
})

export default function CareerLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

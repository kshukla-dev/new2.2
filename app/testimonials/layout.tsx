import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import tp from '@/data/testimonials-page.json'

export const metadata: Metadata = genMeta({
  title: tp.metadata.title,
  description: tp.metadata.description,
  path: '/testimonials',
})

export default function TestimonialsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import contactData from '@/data/contact.json'

export const metadata: Metadata = genMeta({
  title: contactData.metadata.title,
  description: contactData.metadata.description,
  path: '/contact',
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

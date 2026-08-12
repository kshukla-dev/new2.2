import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import ev from '@/data/china-europe-event.json'

export const metadata: Metadata = genMeta({
  title: ev.metadata.title,
  description: ev.metadata.description,
  path: '/resources/events/china-europe-2026',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

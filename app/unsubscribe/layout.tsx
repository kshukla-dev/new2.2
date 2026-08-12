import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Unsubscribe from Newsletter',
  description: 'Unsubscribe from the Jackson & Frank newsletter. Stop receiving marketing and update emails at any time.',
  path: '/unsubscribe',
  noIndex: true,
})

export default function UnsubscribeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import eorData from '@/data/eor.json'

export const metadata: Metadata = genMeta({
  title: eorData.metadata.title,
  description: eorData.metadata.description,
  path: '/employer-of-record',
  image: eorData.metadata.openGraph?.images?.[0]?.url,
})

export default function EmployerOfRecordLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import payroll from '@/data/payroll.json'

export const metadata: Metadata = genMeta({
  title: payroll.metadata.title,
  description: payroll.metadata.description,
  path: '/payroll',
  image: payroll.metadata.openGraph?.images?.[0]?.url,
})

export default function PayrollLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

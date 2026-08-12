import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'

// Duplicate of the root homepage kept out of search to avoid duplicate-content issues.
export const metadata: Metadata = genMeta({
  title: 'Global HR Solutions - EOR & Payroll | Jackson & Frank',
  description:
    'Hire, pay, and manage talent in 17+ countries without opening a local entity. Employer of Record, global payroll, and compliance solutions.',
  path: '/home',
  noIndex: true,
})

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

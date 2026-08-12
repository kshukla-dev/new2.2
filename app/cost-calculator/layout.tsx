import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import cc from '@/data/cost-calculator.json'

export const metadata: Metadata = genMeta({
  title: `${cc.hero.title} | Jackson & Frank`,
  description: cc.hero.description,
  path: '/cost-calculator',
})

export default function CostCalculatorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}

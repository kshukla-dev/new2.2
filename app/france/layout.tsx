import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll Services | France'
const description = 'Expand your business in France with EOR services. Expert payroll, compliance, and HR solutions. Navigate French labor laws with confidence.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/france',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/france',
    name: title,
    description,
    pageNameForBreadcrumb: 'France',
  })
)

export default function FranceLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

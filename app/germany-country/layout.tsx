import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll Services | Germany'
const description = 'Expand your business in Germany with EOR services. Expert payroll, compliance, and HR solutions. Full compliance with German employment regulations and labor laws.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/germany',
})

const germanyPageSchema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/germany',
    name: title,
    description,
    pageNameForBreadcrumb: 'Germany',
  })
)

export default function GermanyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={germanyPageSchema} />
      {children}
    </>
  )
}

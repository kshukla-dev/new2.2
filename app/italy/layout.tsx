import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll Services | Italy'
const description = 'Expand your business in Italy with EOR services. Expert payroll, compliance, and HR solutions. Full compliance with Italian employment regulations.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/italy',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/italy',
    name: title,
    description,
    pageNameForBreadcrumb: 'Italy',
  })
)

export default function ItalyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

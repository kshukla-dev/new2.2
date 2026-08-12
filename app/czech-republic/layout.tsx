import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

const title = 'Employer of Record & Payroll | Czech Republic'
const description = 'Expand your business in Czech Republic with EOR services. Expert payroll, compliance, and HR solutions. Fast onboarding and full compliance.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/czech-republic',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/czech-republic',
    name: title,
    description,
    pageNameForBreadcrumb: 'Czech Republic',
  })
)

export default function CzechRepublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import uaeContractorData from '@/data/uae-contractor.json'

const { title, description } = uaeContractorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/uae-contractor',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/uae-contractor',
    name: title,
    description,
    pageNameForBreadcrumb: 'UAE Contractor',
  })
)

export default function UAEContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

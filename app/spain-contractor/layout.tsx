import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import spainContractorData from '@/data/spain-contractor.json'

const { title, description } = spainContractorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/spain-contractor',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/spain-contractor',
    name: title,
    description,
    pageNameForBreadcrumb: 'Spain Contractor',
  })
)

export default function SpainContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import uaeEorData from '@/data/uae-eor.json'

const { title, description } = uaeEorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/uae',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/uae',
    name: title,
    description,
    pageNameForBreadcrumb: 'UAE',
  })
)

export default function UAELayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

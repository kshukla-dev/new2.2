import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import chinaEorData from '@/data/china-eor.json'

const { title, description } = chinaEorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/china',
  image: 'countries/china.webp',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/china',
    name: title,
    description,
    pageNameForBreadcrumb: 'China',
  })
)

export default function ChinaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

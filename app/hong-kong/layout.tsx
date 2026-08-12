import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import hkEorData from '@/data/hong-kong-eor.json'

const { title, description } = hkEorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/hong-kong',
  image: 'countries/hong-kong.webp',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/hong-kong',
    name: title,
    description,
    pageNameForBreadcrumb: 'Hong Kong',
  })
)

export default function HongKongLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

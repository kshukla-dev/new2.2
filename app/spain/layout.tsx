import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildWebPageSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import spainEorData from '@/data/spain-eor.json'

const { title, description } = spainEorData.metadata as {
  title: string
  description: string
}

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/spain',
})

const schema = buildPageSchemaGraph(
  buildWebPageSchema({
    path: '/spain',
    name: title,
    description,
    pageNameForBreadcrumb: 'Spain',
  })
)

export default function SpainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  )
}

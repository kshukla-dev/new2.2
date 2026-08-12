import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import belgiumEorData from '@/data/belgium-eor.json'

const data = belgiumEorData as {
  metadata: { title: string; description: string }
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const title = data.metadata.title
const description = data.metadata.description

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/belgium',
  image: '/assets/logo-dark.svg',
})

const belgiumPageSchema = buildPageSchemaGraph([
  ...buildServiceSchema({
    path: '/belgium',
    name: title,
    description,
    serviceType: 'Employer of Record Belgium',
    pageNameForBreadcrumb: 'Belgium EOR',
    hasFaq: true,
  }),
  ...buildFaqSchema({
    path: '/belgium',
    faq: data.faqs.items,
    name: data.faqs.title,
    description: data.faqs.subtitle,
  }),
])

export default function BelgiumLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={belgiumPageSchema} />
      {children}
    </>
  )
}

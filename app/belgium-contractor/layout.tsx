import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import belgiumContractorData from '@/data/belgium-contractor.json'

const data = belgiumContractorData as {
  metadata: { title: string; description: string }
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const title = data.metadata.title
const description = data.metadata.description

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/belgium-contractor',
  image: '/assets/logo-dark.svg',
})

const belgiumContractorPageSchema = buildPageSchemaGraph([
  ...buildServiceSchema({
    path: '/belgium-contractor',
    name: title,
    description,
    serviceType: 'Belgium Contractor Management',
    pageNameForBreadcrumb: 'Belgium Contractor',
    hasFaq: true,
  }),
  ...buildFaqSchema({
    path: '/belgium-contractor',
    faq: data.faqs.items,
    name: data.faqs.title,
    description: data.faqs.subtitle,
  }),
])

export default function BelgiumContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={belgiumContractorPageSchema} />
      {children}
    </>
  )
}

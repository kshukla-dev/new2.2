import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import immigrationData from '@/data/immigration.json'

const data = immigrationData as {
  metadata: { title: string; description: string }
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const title = data.metadata.title
const description = data.metadata.description

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/immigration',
  image: '/services/service-page/immigration.webp',
})

const immigrationPageSchema = buildPageSchemaGraph([
  ...buildServiceSchema({
    path: '/immigration',
    name: title,
    description,
    serviceType: 'Immigration and Visa Sponsorship',
    pageNameForBreadcrumb: 'Immigration',
    hasFaq: true,
  }),
  ...buildFaqSchema({
    path: '/immigration',
    faq: data.faqs.items,
    name: data.faqs.title,
    description: data.faqs.subtitle,
  }),
])

export default function ImmigrationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={immigrationPageSchema} />
      {children}
    </>
  )
}

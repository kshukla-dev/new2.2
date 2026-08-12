import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import netherlandsEorData from '@/data/netherlands-eor.json'

const data = netherlandsEorData as {
  metadata: { title: string; description: string }
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const title = data.metadata.title
const description = data.metadata.description

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/netherlands',
  image: '/assets/logo-dark.svg',
})

const netherlandsPageSchema = buildPageSchemaGraph([
  ...buildServiceSchema({
    path: '/netherlands',
    name: title,
    description,
    serviceType: 'Employer of Record Netherlands',
    pageNameForBreadcrumb: 'Netherlands EOR',
    hasFaq: true,
  }),
  ...buildFaqSchema({
    path: '/netherlands',
    faq: data.faqs.items,
    name: data.faqs.title,
    description: data.faqs.subtitle,
  }),
])

export default function NetherlandsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={netherlandsPageSchema} />
      {children}
    </>
  )
}

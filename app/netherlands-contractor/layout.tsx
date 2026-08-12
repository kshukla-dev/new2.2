import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { buildPageSchemaGraph, buildServiceSchema, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'
import netherlandsContractorData from '@/data/netherlands-contractor.json'

const data = netherlandsContractorData as {
  metadata: { title: string; description: string }
  faqs: { title: string; subtitle: string; items: { question: string; answer: string }[] }
}

const title = data.metadata.title
const description = data.metadata.description

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/netherlands-contractor',
  image: '/assets/logo-dark.svg',
})

const netherlandsContractorPageSchema = buildPageSchemaGraph([
  ...buildServiceSchema({
    path: '/netherlands-contractor',
    name: title,
    description,
    serviceType: 'Netherlands Contractor Management',
    pageNameForBreadcrumb: 'Netherlands Contractor',
    hasFaq: true,
  }),
  ...buildFaqSchema({
    path: '/netherlands-contractor',
    faq: data.faqs.items,
    name: data.faqs.title,
    description: data.faqs.subtitle,
  }),
])

export default function NetherlandsContractorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={netherlandsContractorPageSchema} />
      {children}
    </>
  )
}

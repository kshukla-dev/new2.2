import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getGermanySchema } from './seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import GermanyLandingPageClient from './GermanyLandingPageClient'

export const dynamic = 'force-dynamic'

const title = 'Employer of Record & Payroll Services | Germany'
const description = 'Expand your business in Germany with EOR services. Expert payroll, compliance, and HR solutions. Full compliance with German employment regulations and labor laws.'

export const metadata: Metadata = genMeta({
  title,
  description,
  path: '/germany',
})

const schema = getGermanySchema('/germany', title, description)

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GermanyPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const rawIntent = resolvedSearchParams?.intent

  if (rawIntent) {
    const intentStr = Array.isArray(rawIntent) ? rawIntent[0] : rawIntent
    let redirectPath = ''
    if (intentStr === 'solution') {
      redirectPath = '/germany/employer-of-record'
    } else if (intentStr === 'problem') {
      redirectPath = '/germany/hire'
    } else if (intentStr === 'comparison') {
      redirectPath = '/germany/compare'
    }

    if (redirectPath) {
      const newParams = new URLSearchParams()
      Object.entries(resolvedSearchParams).forEach(([key, val]) => {
        if (key !== 'intent' && val !== undefined) {
          if (Array.isArray(val)) {
            val.forEach((v) => newParams.append(key, v))
          } else {
            newParams.set(key, val)
          }
        }
      })
      const queryString = newParams.toString()
      redirect(redirectPath + (queryString ? `?${queryString}` : ''))
    }
  }

  return (
    <>
      <JsonLd data={schema} />
      <GermanyLandingPageClient initialIntent="solution" />
    </>
  )
}

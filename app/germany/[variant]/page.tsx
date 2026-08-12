import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { getGermanySchema } from '../seo-config'
import { JsonLd } from '@/components/seo/JsonLd'
import GermanyLandingPageClient from '../GermanyLandingPageClient'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ variant: string }>
}

const variantConfig: Record<string, { intent: string; path: string; title: string; description: string }> = {
  'employer-of-record': {
    intent: 'solution',
    path: '/germany/employer-of-record',
    title: 'Employer of Record & Payroll Services | Germany',
    description: 'Expand your business in Germany with EOR services. Expert payroll, compliance, and HR solutions. Full compliance with German employment regulations and labor laws.'
  },
  'hire': {
    intent: 'problem',
    path: '/germany/hire',
    title: 'Hire Employees in Germany | Compliance & Payroll',
    description: 'Hire talent in Germany legally and compliantly without setting up a local entity. Direct GmbH support, AÜG-licensed, onboard in 2–3 business days.'
  },
  'compare': {
    intent: 'comparison',
    path: '/germany/compare',
    title: 'Compare EOR Providers in Germany | Jackson & Frank',
    description: 'Compare Jackson & Frank EOR services vs Deel, Remote, and other platforms. Own German GmbH, dedicated account manager, transparent flat fees.'
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { variant } = await params
  const config = variantConfig[variant]

  if (!config) {
    return {}
  }

  return genMeta({
    title: config.title,
    description: config.description,
    path: config.path,
  })
}

export default async function GermanyVariantPage({ params }: PageProps) {
  const { variant } = await params
  const config = variantConfig[variant]

  if (!config) {
    redirect('/germany')
  }

  const schema = getGermanySchema(config.path, config.title, config.description)

  return (
    <>
      <JsonLd data={schema} />
      <GermanyLandingPageClient initialIntent={config.intent} />
    </>
  )
}

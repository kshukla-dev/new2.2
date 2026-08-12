import GermanyLandingPageClient from './GermanyLandingPageClient'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ intent?: string }>
}

export default async function GermanyPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const rawIntent = resolvedSearchParams?.intent

  const intent =
    rawIntent === 'solution' ||
      rawIntent === 'problem' ||
      rawIntent === 'comparison'
      ? rawIntent
      : 'solution'

  return <GermanyLandingPageClient initialIntent={intent} />
}

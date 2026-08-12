import type { Metadata } from 'next'
import Link from 'next/link'
import { BaseSchema } from '@/components/seo/BaseSchema'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = genMeta({
  title: 'Thank you | Jackson & Frank',
  description: 'We have received your details and will be in touch within 24 hours with a clear eligibility assessment.',
  path: '/thank-you',
  // Conversion / thank-you page — kept out of organic search.
  noIndex: true,
})

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#0F1F3D] text-white px-4 py-24">
      <BaseSchema />
      <div className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">We&apos;ve received your details.</h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          You&apos;ll hear from us within 24 hours with a clear eligibility assessment and next steps. Check your inbox, including spam, just in case.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#F7931E] hover:bg-[#e07d10] text-white font-bold px-7 py-3.5 rounded-lg transition-colors"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  )
}

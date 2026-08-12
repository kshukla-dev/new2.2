import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '34.247.171.220',
      },
      {
        protocol: 'https',
        hostname: 'jafuploads.s3.eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  compress: true,

  poweredByHeader: false,

  // Optimize production bundle
  productionBrowserSourceMaps: false,

  // Optimize CSS
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Proxy internal /api/* calls (contact, blog, newsletter) to the live
  // backend. The contact forms and blog service post to relative /api/v1/*
  // URLs which this rewrite forwards server-side.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://jacksonandfrank.com/api/:path*',
      },
    ]
  },

  async redirects() {
    return [
      // www → apex (fallback in case DNS/hosting doesn't already handle it)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.jacksonandfrank.com' }],
        destination: 'https://jacksonandfrank.com/:path*',
        permanent: true,
      },

      // Renamed/typo URL fixes
      {
        source: '/employer-of-records',
        destination: '/employer-of-record',
        permanent: true,
      },
      {
        source: '/blog/work-visa-europe-guide-2025',
        destination: '/blog/work-visa-europe-guide',
        permanent: true,
      },
      {
        source: '/blog/hire-contractors-in-czech_republic',
        destination: '/blog/hire-contractors-in-czech-republic',
        permanent: true,
      },
      {
        source: '/blog/expansion-mistakes-chinese-companies-europe',
        destination: '/blog/chinese-companies-europe-expansion-mistakes',
        permanent: true,
      },
      {
        source: '/blog/hire in the netherlands without an entity eor netherlands',
        destination: '/blog/hire-in-the-netherlands-without-an-entity-eor-netherlands',
        permanent: true,
      },
      {
        source: '/blog/hire-non-eu-employees-europ',
        destination: '/blog/hire-non-eu-employees-europe',
        permanent: true,
      },
      {
        source: '/blog/global-hiring-models-explained',
        destination: '/blog/global-hiring-models-guide',
        permanent: true,
      },
      {
        source: '/blog/eor-vs-payroll-outsourcing',
        destination: '/blog/payroll-outsourcing-vs-eor-europe',
        permanent: true,
      },
      {
        source: '/blog/independent-contractor-5-steps',
        destination: '/blog/how-to-become-independent-contractor',
        permanent: true,
      },
      {
        source: '/blog/bank-holidays-italy-2025',
        destination: '/blog/italy-bank-holidays-2026',
        permanent: true,
      },

      // Old path-based category URLs (/blog/category/42) → /blog.
      // NOTE: /blog?category=42 is intentionally NOT redirected — it is a working
      // user-facing filter (the chips on blog posts link here). It is kept out of
      // the index via noindex on any query-string variant (see app/blog/page.tsx).
      {
        source: '/blog/category/:id',
        destination: '/blog',
        permanent: true,
      },

      // Career listing redirects
      { source: '/career/country-manager-hr-consultant', destination: '/career', permanent: true },
      { source: '/career/full-stack-developer', destination: '/career', permanent: true },
      { source: '/career/sales-manager', destination: '/career', permanent: true },

      // Legacy page aliases
      { source: '/site-map', destination: '/', permanent: true },
      { source: '/sitemap', destination: '/', permanent: true },
      { source: '/solution', destination: '/employer-of-record', permanent: true },
      { source: '/how-it-works', destination: '/employer-of-record', permanent: true },
      { source: '/countries', destination: '/global-hiring-guide', permanent: true },
      { source: '/salary-calculator', destination: '/global-hiring-guide', permanent: true },
      { source: '/client-portal', destination: '/', permanent: true },
      { source: '/private-policy', destination: '/privacy-policy', permanent: true },

      // Country URL aliases
      { source: '/netherland-contractor', destination: '/netherlands', permanent: true },
      { source: '/czechrepublic', destination: '/czech-republic', permanent: true },
      { source: '/unitedkingdom', destination: '/united-kingdom', permanent: true },

      // Old blog slugs
      { source: '/permanent-establishment-risk-3-questions-remote-hire', destination: '/blog/permanent-establishment-work-from-anywhere-trap', permanent: true },
      { source: '/blog/eu-blue-card-for-us-citizens-pick-the-right-country-in-15-minutes', destination: '/blog/work-visa-europe-guide', permanent: true },
      { source: '/blog/payroll-updates-netherlands-2025', destination: '/netherlands', permanent: true },
      { source: '/blog/employer-of-record-services/eor-software-vs-eor-service', destination: '/employer-of-record', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },

      // Long-lived caching for our own static files in public/assets.
      // Note: /_next/static and /_next/image are deliberately NOT set here.
      // Next.js already applies optimal immutable caching to those itself, and
      // overriding them triggers a build warning and can break dev behaviour.
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
    ]
  },
}

export default nextConfig


import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/user/', '/delete/', '/api/', '/hire-non-eu-employees-netherlands', '/home'],
      },
      {
        userAgent: 'Googlebot',
        disallow: ['/user/', '/delete/', '/api/', '/hire-non-eu-employees-netherlands', '/home'],
      },
      {
        userAgent: 'Bingbot',
        disallow: ['/user/', '/delete/', '/api/', '/hire-non-eu-employees-netherlands', '/home'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      {
        userAgent: 'BadBot',
        disallow: ['/'],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}


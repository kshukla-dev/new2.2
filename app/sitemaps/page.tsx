import Link from 'next/link'
import type { Metadata } from 'next'
import { fetchAllBlogs } from '@/lib/blog'
import { BaseSchema } from '@/components/seo/BaseSchema'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Browse all pages across Jackson & Frank.',
}

const groups = [
  {
    title: 'Services',
    links: [
      { label: 'Employer of Record', to: '/employer-of-record' },
      { label: 'Payroll', to: '/payroll' },
      { label: 'Compliance', to: '/compliance' },
      { label: 'Immigration', to: '/immigration' },
      { label: 'Contractor management', to: '/contractor' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about-us' },
      { label: 'Our advantages', to: '/advantages' },
      { label: 'Client testimonials', to: '/testimonials' },
      { label: 'Careers', to: '/career' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Case studies', to: '/case-studies' },
      { label: 'Global hiring guide', to: '/global-hiring-guide' },
      { label: 'Events', to: '/events' },
      { label: 'Cost calculator', to: '/cost-calculator' },
      { label: 'FAQs', to: '/faq' },
    ],
  },
  {
    title: 'Countries - EOR',
    links: [
      { label: 'The Netherlands', to: '/netherlands' },
      { label: 'Germany', to: '/germany' },
      { label: 'United Kingdom', to: '/united-kingdom' },
      { label: 'France', to: '/france' },
      { label: 'Italy', to: '/italy' },
      { label: 'Spain', to: '/spain' },
      { label: 'Belgium', to: '/belgium' },
      { label: 'Poland', to: '/poland' },
      { label: 'Czech Republic', to: '/czech-republic' },
      { label: 'India', to: '/india' },
      { label: 'UAE', to: '/uae' },
      { label: 'China', to: '/china' },
      { label: 'Hong Kong', to: '/hong-kong' },
    ],
  },
  {
    title: 'Countries - Contractor',
    links: [
      { label: 'The Netherlands', to: '/netherlands-contractor' },
      { label: 'Germany', to: '/germany-contractor' },
      { label: 'United Kingdom', to: '/united-kingdom-contractor' },
      { label: 'France', to: '/france-contractor' },
      { label: 'Italy', to: '/italy-contractor' },
      { label: 'Spain', to: '/spain-contractor' },
      { label: 'Belgium', to: '/belgium-contractor' },
      { label: 'Poland', to: '/poland-contractor' },
      { label: 'Czech Republic', to: '/czech-republic-contractor' },
      { label: 'India', to: '/india-contractor' },
      { label: 'UAE', to: '/uae-contractor' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Unsubscribe', to: '/unsubscribe' },
    ],
  },
]

export default async function SitemapPage() {
  const blogs = await fetchAllBlogs()
  const blogLinks = blogs
    .filter((blog) => blog?.slug && typeof blog.slug === 'string')
    .map((blog) => ({
      label: blog.title || blog.slug,
      to: `/blog/${blog.slug}`,
    }))

  return (
    <>
      <BaseSchema />
      <style>{`
        .sm-hero{padding:140px 32px 40px;text-align:center;max-width:760px}
        .sm-hero .tag{margin-bottom:16px}
        .sm-hero .section-title{margin-bottom:16px}
        .sm-hero p{font-size:17px;color:var(--ink-soft)}
        .sm-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:40px}
        .sm-group h2{font-family:var(--serif);font-size:22px;margin-bottom:18px;padding-bottom:12px;border-bottom:1px solid var(--border)}
        .sm-group ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px}
        .sm-group ul{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px}
        .blog-links{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px}
        .blog-links li{margin-left:0}
        .blog-links a{font-size:13px;color:var(--ink-muted);transition:color 0.2s,padding-left 0.2s}
        .blog-links a:hover{color:var(--accent);padding-left:4px}
        .sm-group a{font-size:14px;color:var(--ink-soft);transition:color 0.2s,padding-left 0.2s}
        .sm-group a:hover{color:var(--accent);padding-left:4px}
        @media(max-width:900px){.sm-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:640px){.sm-hero{padding-top:110px}.sm-grid{grid-template-columns:1fr}}
      `}</style>

      <header className="container sm-hero">
        <h1 className="section-title">Everything on <em>one page</em></h1>
        <p>Browse all pages across Jackson &amp; Frank.</p>
      </header>

      <div className="home-content-scale">
      <section className="section container">
        <div className="sm-grid">
          {groups.map(g => (
            <div key={g.title} className="sm-group">
              <h2>{g.title}</h2>
              <ul>
                {g.links.map(l => (
                  <li key={l.to}>
                    <Link href={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      </div>

      {blogLinks.length > 0 && (
        <div className="home-content-scale">
      <section className="section container">
          <div className="sm-group">
            <h2>Blog posts</h2>
            <ul className="blog-links">
              {blogLinks.map((blog) => (
                <li key={blog.to}>
                  <Link href={blog.to}>{blog.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      )}
    </>
  )
}

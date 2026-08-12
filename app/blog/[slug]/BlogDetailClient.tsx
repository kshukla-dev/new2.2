'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  applyStatCorrections,
  ensureImageAlt,
  demoteBodyH1s,
  fixInvalidHtmlNesting,
  balanceHtmlTags,
  formatBlogDate,
} from '@/utils/blog'

import AuthorAvatar from '@/components/ui/AuthorAvatar'
import LeadModal from '@/components/ui/LeadModal'
import FAQSection from '@/components/templates/FAQSection'
import type { BlogPost } from '@/types/blog'
import { SITE_CONFIG } from '@/lib/constants'
import { PortableText } from '@portabletext/react'
import type { PortableTextReactComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import '../../countries.css'

interface BlogDetailClientProps {
  post: BlogPost
  related: BlogPost[]
  slug: string
}

/**
 * Interactive shell for a blog post. The post itself is fetched on the server
 * (see page.tsx) and handed in as a prop, so the article body is present in the
 * server-rendered HTML and is crawlable without running JavaScript.
 */
export default function BlogDetailClient({ post, related, slug }: BlogDetailClientProps) {
  const blog = post

  // Absolute, deterministic share URL. Building this from window.location caused
  // a hydration mismatch (empty on the server, populated on the client) and
  // leaked localhost URLs in dev; the canonical/site URL is identical on both
  // sides and is the correct public URL to share.
  const shareUrl = blog?.canonical_url?.trim() || `${SITE_CONFIG.url}/blog/${slug}`

  // Lead-capture modal
  const [modalOpen, setModalOpen] = useState(false)
  function openModal() {
    setModalOpen(true)
  }

  function generateId(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
  }

  const ptComponents: Partial<PortableTextReactComponents> = {
    block: {
      h2: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        return <h2 id={generateId(text)}>{children}</h2>
      },
      h3: ({ children, value }: any) => {
        const text = value.children?.map((c: any) => c.text).join('') || ''
        return <h3 id={generateId(text)}>{children}</h3>
      }
    },
    // Custom block types from the blogPost schema. Each renders defensively so a
    // partially filled block never crashes the page.
    types: {
      htmlBlock: ({ value }: any) =>
        value?.html ? <div className="blog-html-block" dangerouslySetInnerHTML={{ __html: balanceHtmlTags(fixInvalidHtmlNesting(value.html)) }} /> : null,
      calloutBlock: ({ value }: any) => (
        <div className={`blog-callout blog-callout-${value?.variant || 'info'}`}>
          {value?.heading && <strong className="blog-callout-heading">{value.heading}</strong>}
          {value?.body && <p>{value.body}</p>}
        </div>
      ),
      codeBlock: ({ value }: any) => (
        <pre className="blog-code-block" data-language={value?.language || 'text'}>
          {value?.filename && <span className="blog-code-filename">{value.filename}</span>}
          <code>{value?.code || ''}</code>
        </pre>
      ),
      imageBlock: ({ value }: any) => {
        if (!value?.image) return null
        let src = ''
        try { src = urlFor(value.image).width(1200).fit('max').url() } catch { src = '' }
        if (!src) return null
        return (
          <figure className={`blog-image blog-image-${value?.width || 'full'}`}>
            <img src={src} alt={value?.alt || ''} loading="lazy" />
            {value?.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        )
      },
      ctaBannerBlock: ({ value }: any) => {
        // Use the BEM classes the CSS actually styles (blog-cta-banner__*), so
        // the heading renders white and the buttons get proper button styling
        // and spacing. `--accent` is the orange variant.
        const accent = value?.variant === 'orange' || value?.variant === 'accent'
        const hasButtons = value?.primaryButtonText || value?.secondaryButtonText
        return (
          <div className={`blog-cta-banner${accent ? ' blog-cta-banner--accent' : ''}`}>
            <div className="blog-cta-banner__inner">
              {value?.heading && <h3 className="blog-cta-banner__title">{value.heading}</h3>}
              {value?.body && <p className="blog-cta-banner__text">{value.body}</p>}
              {hasButtons && (
                <div className="blog-cta-banner__actions">
                  {value?.primaryButtonText && (
                    <a href={value?.primaryButtonHref || '/contact'} className="blog-cta-banner__btn">{value.primaryButtonText}</a>
                  )}
                  {value?.secondaryButtonText && (
                    <a href={value?.secondaryButtonHref || '#'} className="blog-cta-banner__btn">{value.secondaryButtonText}</a>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      },
    },
    marks: {
      externalLink: ({ children, value }: any) => (
        <a href={value?.href} target={value?.blank ? '_blank' : undefined} rel={value?.rel || 'noopener'}>{children}</a>
      ),
      internalLink: ({ children, value }: any) => (
        <a href={value?.href || '#'}>{children}</a>
      ),
    },
  }

  const [activeId, setActiveId] = useState<string>('')

  const TOC_MARKER = '<!--BLOG_TOC_INSERT-->'

  // Process CMS HTML once per blog change
  const renderedContent = useMemo(() => {
    if (!blog) return ''
    let html = blog.page_content || blog.excerpt || ''
    html = ensureImageAlt(html, blog.title)
    html = applyStatCorrections(html)
    html = demoteBodyH1s(html)

    if (html.includes(TOC_MARKER)) {
      html = html.replace(TOC_MARKER, '')
    }

    // Fix invalid HTML nesting (such as block-level table/div inside <p>) to prevent React hydration/DOM errors
    html = fixInvalidHtmlNesting(html)

    // Close any unclosed/stray tags (CMS posts often ship unclosed <div>s).
    // Must run last so the injected HTML is well-formed and hydration matches.
    html = balanceHtmlTags(html)

    return html
  }, [blog])

  // Extract headings for Table of Contents
  const dynamicToc = useMemo(() => {
    if (!blog) return []

    // Prefer the TOC authored in the CMS (Sanity `tocItems`, mapped to
    // in_this_guide as { title, url:"#anchor" }). The htmlBlock headings carry
    // matching id attributes, so these anchors scroll correctly. Falls through
    // to the auto-generated sources below when a post has no authored TOC.
    if (Array.isArray(blog.in_this_guide) && blog.in_this_guide.length) {
      return blog.in_this_guide
        .filter((t) => t?.title && t?.url)
        .map((t) => ({ href: t.url, text: t.title }))
    }

    if (blog.toc_html) {
      const matches = [...blog.toc_html.matchAll(/href="([^"]+)"[^>]*>([^<]+)<\/a>/gi)]
      return matches.map(m => ({
        href: m[1],
        text: m[2].replace(/&amp;/g, '&')
      }))
    }

    // Fallback: Parse h2 and h3 elements from renderedContent
    const html = blog.page_content || blog.rawHtml || ''
    const headingMatches = [...html.matchAll(/<h([23])\b[^>]*\bid="([^"]+)"[^>]*>(.*?)<\/h\1>/gi)]
    if (headingMatches.length > 0) {
      return headingMatches.map(m => ({
        href: `#${m[2]}`,
        text: m[3].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&')
      }))
    }

    // Fallback for PortableText blocks
    if (blog.body && Array.isArray(blog.body)) {
      const ptHeadings: any[] = []
      blog.body.forEach((block: any) => {
        if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
          const text = block.children?.map((c: any) => c.text).join('') || ''
          const id = generateId(text)
          if (text && id) {
            ptHeadings.push({
              href: `#${id}`,
              text
            })
          }
        }
      })
      return ptHeadings
    }

    return []
  }, [blog, renderedContent])

  // Get author initials
  const authorInitials = useMemo(() => {
    if (!blog?.author?.name) return 'JF'
    const parts = blog.author.name.split(' ')
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
  }, [blog])

  // Authors metadata lookup
  const AUTHORS_INFO: Record<string, { title: string; bio: string }> = {
    'vibhu agarwal': {
      title: 'Author',
      bio: 'Vibhu is a co-founder and director at Jackson & Frank, specializing in global workforce operations, expansion strategies, and compliance frameworks across Europe and Asia.'
    },
    'pawel michalkiewicz': {
      title: 'Founder & CSO',
      bio: 'Pawel has 20+ years of experience helping international companies expand globally. He is a trusted advisor for market entry, HR, and compliance across Europe.'
    },
    'gaurav yelve': {
      title: 'Immigration & Global Mobility Specialist',
      bio: 'Gaurav has extensive experience in immigration services, visa sponsorships, and navigating complex mobility regulations for international hires.'
    }
  }

  const authorInfo = useMemo(() => {
    const name = (blog?.author?.name ?? '').trim().toLowerCase()
    return AUTHORS_INFO[name] || {
      title: 'Global Mobility Expert',
      bio: 'The team of global expansion specialists at Jackson & Frank helps companies hire, pay, and manage talent across international borders.'
    }
  }, [blog])

  // Active section scroll detection
  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('.blog-detail-body h2, .blog-detail-body h3'))
    if (headingElements.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160 // Header buffer offset
      let currentActive = ''

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i]
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= scrollPosition) {
          currentActive = el.getAttribute('id') || ''
        } else {
          break
        }
      }
      setActiveId(currentActive)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [blog, renderedContent])

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      })
      setActiveId(targetId)
      window.history.pushState(null, '', href)
    }
  }



  if (blog) {
    return (
      <>
        <style>{`
          .blog-detail-wrapper {
            padding-top: 50px;
            padding-bottom: 100px;
            background-color: #ffffff;
            color: #0f172a;
          }

          /* ====== BREADCRUMBS ====== */
          .blog-breadcrumbs-nav {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #64748b;
            margin-bottom: 24px;
            font-family: var(--sans);
          }
          .blog-breadcrumbs-nav a {
            color: #64748b;
            text-decoration: none;
            transition: color 0.2s;
          }
          .blog-breadcrumbs-nav a:hover {
            color: #143369;
          }
          .blog-breadcrumbs-nav .sep {
            color: #cbd5e1;
          }
          .blog-breadcrumbs-nav .current {
            color: #0f172a;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 320px;
          }

          /* ====== HERO SECTION ====== */
          .blog-hero-section {
            margin-bottom: 40px;
          }
          .blog-title-main {
            font-family: var(--serif);
            font-size: clamp(32px, 4.5vw, 56px);
            line-height: 1.15;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 28px;
            letter-spacing: -0.02em;
          }

          /* ====== AUTHOR & STATS BAR ====== */
          .blog-author-bar {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 32px;
          }
          .author-badge-circle {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background-color: #3b82f6;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 15px;
            font-family: var(--sans);
          }
          .author-meta-details {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .author-meta-name {
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
          }
          .author-meta-role {
            font-size: 12px;
            color: #64748b;
          }
          .blog-stat-divider {
            width: 1px;
            height: 28px;
            background-color: #e2e8f0;
            margin: 0 4px;
          }
          .blog-stat-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: #64748b;
          }
          .blog-stat-icon {
            width: 16px;
            height: 16px;
            color: #94a3b8;
          }

          /* ====== MOBILE HEADER SPACING ====== */
          @media (max-width: 640px) {
            .blog-detail-wrapper {
              padding-top: 28px;
            }
            .blog-hero-section {
              margin-bottom: 28px;
            }
            .blog-breadcrumbs-nav {
              font-size: 13px;
              gap: 6px;
              row-gap: 4px;
              flex-wrap: wrap;
              margin-bottom: 18px;
            }
            .blog-breadcrumbs-nav .current {
              max-width: 200px;
            }
            .blog-title-main {
              font-size: 28px;
              line-height: 1.25;
              margin-bottom: 22px;
            }
            /* Let the date / reading-time wrap under the author instead of
               cramming everything into one tight row, and centre the wrapped
               row so the reading-time sits in the middle rather than orphaned
               on the left. */
            .blog-author-bar {
              flex-wrap: wrap;
              justify-content: center;
              gap: 12px 14px;
              margin-bottom: 26px;
            }
            .blog-stat-badge {
              font-size: 13px;
            }
            .blog-stat-divider {
              height: 18px;
              margin: 0 2px;
            }
          }

          /* ====== FEATURED IMAGE ====== */
          .blog-featured-img-container {
            width: 100%;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
            margin-bottom: 48px;
          }
          .blog-featured-img-container img {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            display: block;
          }

          /* ====== GRID LAYOUT ====== */
          .blog-detail-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 48px;
          }
          @media (min-width: 1024px) {
            .blog-detail-grid {
              grid-template-columns: 1.05fr 360px;
              gap: 64px;
              align-items: start;
            }
          }
          .blog-content-col {
            min-width: 0;
          }

          /* ====== STICKY SIDEBAR STACK ====== */
          .blog-sticky-sidebar {
            position: sticky;
            top: 120px;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          /* ====== IN THIS GUIDE CARD ====== */
          .toc-card-container {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
            overflow: hidden;
          }
          .toc-card-header {
            background-color: #143369;
            color: #ffffff;
            padding: 14px 18px;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          .toc-card-body {
            max-height: 260px;
            overflow-y: auto;
            overscroll-behavior: contain;
            padding: 0;
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
            pointer-events: auto;
          }
          .toc-card-body::-webkit-scrollbar { width: 4px; }
          .toc-card-body::-webkit-scrollbar-track { background: transparent; }
          .toc-card-body::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .toc-card-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
          }
          .toc-card-item {
            border-bottom: 1px solid #f1f5f9;
          }
          .toc-card-item:last-child {
            border-bottom: none;
          }
          .toc-card-item a {
            display: block;
            font-size: 13.5px;
            color: #1e40af;
            text-decoration: none;
            line-height: 1.45;
            transition: all 0.18s ease;
            border-left: 3px solid transparent;
            padding: 12px 18px;
          }
          .toc-card-item a:hover {
            color: #143369;
            border-left-color: #3b82f6;
          }
          .toc-card-item.active a {
            color: #143369;
            font-weight: 600;
            border-left-color: #143369;
            background-color: #f8fafc;
          }

          /* ====== SIDEBAR CTA CARD ====== */
          .sidebar-cta-card {
            background:#112d57;
            border-radius: 14px;
            padding: 24px 20px;
            box-shadow: 0 8px 32px rgba(20, 51, 105, 0.22);
            color: #ffffff;
          }
          .sidebar-cta-heading {
            font-family: var(--serif);
            font-size: 19px;
            font-weight: 700;
            line-height: 1.25;
            color: #ffffff;
            margin: 0 0 10px 0;
          }
          .sidebar-cta-body {
            font-size: 13.5px;
            color: rgba(255,255,255,0.82);
            line-height: 1.6;
            margin: 0 0 18px 0;
          }
          .sidebar-cta-input {
            width: 100%;
            padding: 11px 16px;
            border-radius: 50px;
            border: none;
            font-size: 13.5px;
            color: #0f172a;
            background: #ffffff;
            outline: none;
            box-sizing: border-box;
            margin-bottom: 10px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);
          }
          .sidebar-cta-input::placeholder { color: #94a3b8; }
          .sidebar-cta-btn {
            width: 100%;
            padding: 11px 16px;
            border-radius: 50px;
            border: none;
            background: #ffffff;
            color: #143369;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .sidebar-cta-btn:hover {
            background: #f1f5f9;
            transform: translateY(-1px);
          }

          /* ====== SHARE ARTICLE CARD ====== */
          .sidebar-share-card {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 20px 18px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.05);
          }
          .sidebar-share-heading {
            font-family: var(--serif);
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 14px 0;
          }
          .sidebar-share-btns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .share-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 13.5px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            border: 1.5px solid;
          }
          .share-btn-linkedin {
            background-color: #143369;
            color: #ffffff;
            border-color: #143369;
          }
          .share-btn-linkedin:hover {
            background-color: #0f2850;
            border-color: #0f2850;
            transform: translateY(-1px);
          }
          .share-btn-email {
            background-color: #ffffff;
            color: #334155;
            border-color: #e2e8f0;
          }
          .share-btn-email:hover {
            border-color: #143369;
            color: #143369;
            transform: translateY(-1px);
          }

          /* ====== CONTENT TYPOGRAPHY ====== */
          .blog-detail-body {
            font-size: 17px;
            line-height: 1.8;
            color: #334155;
            font-family: var(--sans);
          }
          .blog-detail-body h2 {
            font-family: var(--serif);
            font-size: clamp(24px, 3.5vw, 32px);
            font-weight: 700;
            color: #0f172a;
            margin-top: 48px;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
            line-height: 1.25 !important;
                letter-spacing: 0px !important;
          }
          .blog-detail-body h3 {
            font-family: var(--serif);
            font-size: 22px;
            font-weight: 600;
            color: #0f172a;
            line-height: 1.3;
          }
          .blog-detail-body p {
            margin: 20px 0;
          }
          .blog-detail-body strong {
            color: #0f172a;
            font-weight: 600;
          }
          .blog-detail-body a {
            color: #143369;
            text-decoration: underline;
            text-underline-offset: 4px;
            font-weight: 500;
            transition: color 0.2s;
          }
          .blog-detail-body a:hover {
            color: #F7931E;
          }

          /* Bullet Lists */
          .blog-detail-body ul {
            list-style: none;
            padding-left: 0;
            margin: 24px 0;
          }
          .blog-detail-body li {
            position: relative;
            padding-left: 28px;
            margin-bottom: 12px;
          }
          .blog-detail-body li::before {
            content: "";
            position: absolute;
            left: 0;
            top: 6px;
            width: 16px;
            height: 16px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23143369' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
          }

/* Stat Cards Grid */
.blog-detail-body .stat-cards,
.blog-content .stat-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1.75rem 0 2rem;
}
@media (max-width: 640px) {
  .blog-detail-body .stat-cards,
  .blog-content .stat-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
.blog-detail-body .stat-card,
.blog-content .stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 0.75rem;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 12px;
  text-align: center;
  gap: 0.35rem;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  transition: transform 0.2s, box-shadow 0.2s;
}
.blog-detail-body .stat-card:hover,
.blog-content .stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.blog-detail-body .stat-number,
.blog-content .stat-number {
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  color: #0c3372;
  line-height: 1.1;
  white-space: nowrap;
  max-width: 100%;
}
.blog-detail-body .stat-label,
.blog-content .stat-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-muted, #6b7280);
}

/* Status Badges & Note Tags */
.blog-detail-body .status-yes,
.blog-content .status-yes {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: #dcfce7;
  color: #166534;
  font-weight: 600;
  font-size: 0.85em;
  white-space: nowrap;
}
.blog-detail-body .status-no,
.blog-content .status-no {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: #fee2e2;
  color: #991b1b;
  font-weight: 600;
  font-size: 0.85em;
  white-space: nowrap;
}
.blog-detail-body .note-tag,
.blog-content .note-tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 9999px;
  font-size: 0.75em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  margin-right: 0.35rem;
}
.blog-detail-body .tag-mandatory,
.blog-content .tag-mandatory {
  background: #fee2e2;
  color: #991b1b;
}
.blog-detail-body .tag-sat,
.blog-detail-body .tag-sun,
.blog-content .tag-sat,
.blog-content .tag-sun {
  background: #fef3c7;
  color: #92400e;
}
.blog-detail-body .tag-alsace,
.blog-content .tag-alsace {
  background: #f3e8ff;
  color: #6b21a8;
}

/* Count Badges & CTA Banners */
.blog-detail-body h3 .count-badge,
.blog-content h3 .count-badge {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  border-radius: 9999px;
  background: #0c3372;
  color: white;
  font-size: 0.55em;
  font-weight: 600;
  vertical-align: middle;
  margin-left: 0.6rem;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.blog-detail-body .blog-cta-banner,
.blog-content .blog-cta-banner {
  margin: 2rem 0 0.5rem;
  padding: 1.75rem 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #0c3372 0%, #1e40af 55%, #1e3a8a 100%);
  color: #ffffff;
  box-shadow: 0 12px 40px -12px rgba(12, 51, 114, 0.45);
}
.blog-detail-body .blog-cta-banner--accent,
.blog-content .blog-cta-banner--accent {
  /* Match the "Book a consultation" button orange (#F7931E) */
  background: linear-gradient(135deg, #f7931e 0%, #ef8a16 55%, #e07f12 100%);
  box-shadow: 0 12px 40px -12px rgba(224, 127, 18, 0.45);
}
.blog-detail-body .blog-cta-banner__inner,
.blog-content .blog-cta-banner__inner {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
}
.blog-detail-body .blog-cta-banner__title,
.blog-content .blog-cta-banner__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  text-align: center;
  color: #ffffff;
}
.blog-detail-body .blog-cta-banner__text,
.blog-content .blog-cta-banner__text {
  margin: 0 0 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.65;
  opacity: 0.95;
  text-align: center;
  color: #ffffff;
}
.blog-detail-body .blog-cta-banner__btn,
.blog-content .blog-cta-banner__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  background: #ffffff;
  color: #0c3372;
  text-decoration: none;
  border: 2px solid transparent;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.blog-detail-body .blog-cta-banner__btn:hover,
.blog-content .blog-cta-banner__btn:hover {
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px -4px rgba(0,0,0,0.2);
}
.blog-detail-body .blog-cta-banner__actions,
.blog-content .blog-cta-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 0.25rem;
}

.blog-detail-body p.reviewed-by,
.blog-content p.reviewed-by {
  font-size: 0.8125rem;
  color: var(--ink-muted, #6b7280);
  margin-top: 0.5rem !important;
  margin-bottom: 0;
}

/* Table container details */
.blog-detail-body .blog-table-wrap {
  overflow-x: auto;
  margin: 36px 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.01);
}
.blog-detail-body table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  min-width: 800px;
}
.blog-detail-body th,
.blog-detail-body td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 1.5;
}
.blog-detail-body th:last-child,
.blog-detail-body td:last-child {
  border-right: none;
}
.blog-detail-body tr:last-child td {
  border-bottom: none;
}
.blog-detail-body thead th {
  background-color:#0c3372;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  font-size: 11px;
}
.blog-detail-body tbody tr:nth-child(even) {
  background-color: #ffffff;
}

          /* Blockquotes */
          .blog-detail-body blockquote {
            border-left: 4px solid #F7931E;
            background-color: #f8fafc;
            padding: 16px 24px;
            margin: 32px 0;
            font-style: italic;
            border-radius: 0 8px 8px 0;
            color: #475569;
          }

          /* Info & Warning Panels */
          .blog-detail-body .info,
          .blog-detail-body .warning,
          .blog-detail-body .highlight {
            padding: 24px 28px;
            border-radius: 12px;
            margin: 32px 0;
            font-size: 15px;
            line-height: 1.65;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
            border: 1px solid #e2e8f0;
          }
          .blog-detail-body .info {
          background-color: #f8fafc;
            border-left: 4px solid #14366b;
            color: #1e3a8a;
          }
          .blog-detail-body .warning {
            background-color: #fffbeb;
            border-left: 4px solid #d97706;
            color: #92400e;
          }
          .blog-detail-body .highlight {
            background-color: #f8fafc;
            border-left: 4px solid #3b82f6;
            color: #1e3a8a;
          }

          /* Responsive Tables */
          .blog-table-wrap {
            overflow-x: auto;
            margin: 36px 0;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          }
          .blog-detail-body table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14.5px;
            min-width: 800px;
          }
          .blog-detail-body th,
          .blog-detail-body td {
            padding: 14px 20px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0;
            line-height: 1.5;
          }
          .blog-detail-body th:last-child,
          .blog-detail-body td:last-child {
            border-right: none;
          }
          .blog-detail-body tr:last-child td {
            border-bottom: none;
          }
          .blog-detail-body thead th {
            background-color: #143369;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            font-size: 11.5px;
          }
          .blog-detail-body tbody tr:nth-child(even) {
            background-color: #f8fafc;
          }

          /* Country Accordions – Reference Match */
          .blog-detail-body details.country-accordion {
            border: 1px solid #dce6f7;
            border-left: 3px solid #143369;
            border-radius: 10px;
            margin: 16px 0;
            background-color: #eef2fb;
            overflow: hidden;
            transition: border-color 0.2s, background-color 0.2s;
          }
          .blog-detail-body details.country-accordion:hover {
            background-color: #e8eef8;
            border-left-color: #1e4d9b;
          }
          .blog-detail-body details.country-accordion[open] {
            background-color: #f4f7fd;
            border-left-color: #143369;
          }
          .blog-detail-body details.country-accordion > summary {
            cursor: pointer;
            user-select: none;
            font-size: 15px;
            font-weight: 700;
            color: #0f2850;
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: color 0.15s;
          }
          .blog-detail-body details.country-accordion > summary::-webkit-details-marker { display: none; }
          .blog-detail-body details.country-accordion > summary::marker { display: none; }
          .blog-detail-body details.country-accordion[open] > summary {
            color: #143369;
            border-bottom: 1px solid #d0dcf0;
          }
         
          .blog-detail-body details.country-accordion > summary::after {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-size: contain;
            transition: transform 0.25s ease;
          }
          .blog-detail-body details.country-accordion[open] > summary::after {
            transform: rotate(180deg);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23143369' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          }
          /* Hide the old .accordion-chevron span if it exists in HTML */
          .accordion-chevron { display: none; }
          .accordion-flag {
            font-size: 16px;
            line-height: 1;
            flex-shrink: 0;
          }
          .blog-detail-body details.country-accordion > div {
            padding: 16px 20px 20px;
            background-color: #ffffff;
          }
          .blog-detail-body details.country-accordion > div p {
            margin: 0 0 12px;
            font-size: 14.5px;
            line-height: 1.7;
            color: #334155;
          }
          .blog-detail-body details.country-accordion > div ul {
            padding-left: 0;
            margin: 12px 0;
          }
          .blog-detail-body details.country-accordion > div li {
            padding-left: 22px;
            margin-bottom: 8px;
            font-size: 14px;
            color: #334155;
          }

          /* Bottom Consultation Banner */
          .consultation-cta-banner {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            margin-top: 64px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            align-items: flex-start;
          }
          @media (min-width: 768px) {
            .consultation-cta-banner {
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            }
          }
          .consultation-cta-info {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .consultation-cta-circle {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background-color: #143369;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .consultation-cta-circle svg {
            width: 22px;
            height: 22px;
          }
          .consultation-cta-text h3 {
            font-family: var(--serif);
            font-size: 20px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 4px 0;
          }
          .consultation-cta-text p {
            font-size: 14px;
            color: #64748b;
            margin: 0;
          }
          .consultation-cta-btn {
            background-color: #F7931E;
            color: #ffffff;
            font-weight: 600;
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
            white-space: nowrap;
          }
          .consultation-cta-btn:hover {
            background-color: #e07d10;
          }

          /* ============================================================
             SPECIFIC REDESIGN STYLES FOR WORK VISA EUROPE GUIDE SLUG
             ============================================================ */
          .guide-active-styles table {
            min-width: 1400px !important;
          }
          .guide-active-styles .blog-table-wrap {
            max-height: 800px;
            overflow-y: auto;
          }
          .guide-active-styles th {
            position: sticky;
            top: 0;
            z-index: 10;
            background-color: #143369 !important;
          }
          /* Custom cell widths in salary thresholds comparison table */
          .guide-active-styles td:nth-child(1) { min-width: 160px; font-weight: 700; } /* Country */
          .guide-active-styles td:nth-child(2) { min-width: 210px; } /* Route */
          .guide-active-styles td:nth-child(3) { min-width: 240px; } /* Suited for */
          .guide-active-styles td:nth-child(4) { min-width: 380px; line-height: 1.6; } /* Threshold */
          .guide-active-styles td:nth-child(5) { min-width: 110px; }  /* Job offer */
          .guide-active-styles td:nth-child(6) { min-width: 180px; } /* Sponsor */
          .guide-active-styles td:nth-child(7) { min-width: 180px; } /* Processing */
          .guide-active-styles td:nth-child(8) { min-width: 160px; } /* Source */

          /* Custom CTA Card styling in Guide – Matches Reference */
          .blog-detail-body.guide-active-styles .highlight {
            background-color: #2d4a8a !important;
            color: #ffffff !important;
            border: none !important;
            padding: 36px 40px !important;
            border-radius: 14px !important;
            box-shadow: 0 8px 32px rgba(20, 51, 105, 0.2) !important;
            text-align: center !important;
            margin: 40px 0 !important;
          }
          @media (max-width: 640px) {
            .blog-detail-body.guide-active-styles .highlight {
              padding: 28px 20px !important;
            }
          }
          .blog-detail-body.guide-active-styles .highlight h3,
          .blog-detail-body.guide-active-styles .highlight h2 {
            color: #ffffff !important;
            font-family: var(--serif);
            font-size: 20px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            margin: 0 0 14px 0 !important;
            letter-spacing: 0 !important;
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
          .blog-detail-body.guide-active-styles .highlight p strong {
            color: #ffffff !important;
            font-weight: 700;
          }
          .blog-detail-body.guide-active-styles .highlight p {
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 14.5px !important;
            margin: 0 auto 24px !important;
            line-height: 1.7 !important;
            max-width: 620px !important;
          }
          .blog-detail-body.guide-active-styles .highlight a {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #ffffff !important;
            color: #143369 !important;
            font-weight: 600 !important;
            font-size: 14.5px !important;
            padding: 12px 32px !important;
            border-radius: 8px !important;
            border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
            text-decoration: none !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
            min-height: 44px !important;
          }
          .blog-detail-body.guide-active-styles .highlight a:hover {
            background-color: #f8fafc !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16) !important;
          }

          /* ====== "Need help with European hiring?" banner card ====== */
          .blog-detail-body .blog-cta-banner {
            background-color: #2d4a8a;
            border-radius: 14px;
            box-shadow: 0 8px 32px rgba(20, 51, 105, 0.2);
            margin: 40px 0;
            padding: 36px 40px;
            text-align: center;
            border: none;
          }
          @media (max-width: 640px) {
            .blog-detail-body .blog-cta-banner {
              padding: 28px 20px;
            }
          }
          .blog-detail-body .blog-cta-banner__inner {
            max-width: 620px;
            margin: 0 auto;
          }
          .blog-detail-body .blog-cta-banner__title {
            color: #ffffff !important;
            font-family: var(--serif);
            font-size: 20px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
            margin: 0 0 14px 0 !important;
          }
          .blog-detail-body .blog-cta-banner__text {
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 14.5px !important;
            line-height: 1.7 !important;
            margin: 0 0 24px 0 !important;
          }
          .blog-detail-body .blog-cta-banner__btn {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            background-color: #ffffff !important;
            color: #143369 !important;
            font-weight: 600 !important;
            font-size: 14.5px !important;
            padding: 12px 32px !important;
            border-radius: 8px !important;
            border: 1.5px solid rgba(255, 255, 255, 0.6) !important;
            text-decoration: none !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
            min-height: 44px !important;
          }
          .blog-detail-body .blog-cta-banner__btn:hover {
            background-color: #f8fafc !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16) !important;
          }

          .about-article-section {
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            margin: 64px 0;
            background-color: #ffffff;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
          }
          .about-article-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }
          .about-article-icon {
            width: 22px;
            height: 22px;
            color: #143369;
          }
          .about-article-header h2 {
            font-size: 22px !important;
            letter-spacing:0 !important;
              letter-spacing: 0px !important;
          }
          .about-article-intro {
            font-size: 14px;
            color: #64748b;
            margin-top: 0 !important;
            margin-bottom: 32px !important;
          }
          .profile-container {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
          .profile-card {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          @media (min-width: 640px) {
            .profile-card {
              flex-direction: row;
              align-items: flex-start;
            }
          }
          .profile-img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
          }
          .profile-details {
            display: flex;
            flex-direction: column;
          }
          .profile-label {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #94a3b8;
            margin-bottom: 4px;
          }
          .profile-name {
            font-family: var(--serif);
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 2px 0;
          }
          .profile-designation {
            font-size: 13px;
            color: #64748b;
            margin-bottom: 12px;
          }
          .profile-bio {
            font-size: 14px;
            line-height: 1.6;
            color: #475569;
            margin: 0 0 16px 0 !important;
          }
          .profile-linkedin {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            font-weight: 600;
            color: #143369 !important;
            text-decoration: none !important;
          }
          .profile-linkedin:hover {
            color: #F7931E !important;
          }
          .li-icon {
            width: 16px;
            height: 16px;
          }
          .profile-card-divider {
            height: 1px;
            background-color: #f1f5f9;
          }

          /* Related Articles Redesign */
          .related-section-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 24px;
            margin-top: 64px;
          }
          .related-section-header svg {
            width: 22px;
            height: 22px;
            color: #143369;
          }
          .related-section-header h2 {
            font-family: var(--serif);
            font-size: 22px;
            color: #143369;
            margin: 0;
              letter-spacing: 0px !important;
          }
          .related-cards-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }
          @media (min-width: 640px) {
            .related-cards-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .related-card-item {
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            text-decoration: none;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
            position: relative;
          }
          .related-card-item:hover {
            transform: translateY(-2px);
            border-color: #3b82f6;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          }
          .related-card-icon-box {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background-color: #f1f5f9;
            color: #143369;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 18px;
            transition: background-color 0.2s, color 0.2s;
          }
          .related-card-item:hover .related-card-icon-box {
            background-color: #143369;
            color: #ffffff;
          }
          .related-card-icon-box svg {
            width: 20px;
            height: 20px;
          }
          .related-card-title {
            font-family: var(--serif);
            font-size: 16px;
            font-weight: 700;
            line-height: 1.4;
            color: #0f172a;
            margin-bottom: auto;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .related-card-meta {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: #64748b;
            margin-top: 20px;
          }
        `}</style>

        <article className="blog-detail-wrapper">
          <header className="container blog-hero-section">
            {/* Breadcrumbs */}
            <div className="blog-breadcrumbs-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">&gt;</span>
              <Link href="/blog">Resources</Link>
              <span className="sep">&gt;</span>
              <Link href="/blog">Blog</Link>
              <span className="sep">&gt;</span>
              <span className="current">{blog.title}</span>
            </div>

            {/* Title */}
            <h1 className="blog-title-main">{blog.title}</h1>

            {/* Author bar */}
            <div className="blog-author-bar">
              {blog.author?.name && (
                <>
                  <div className="author-badge-circle">
                    {authorInitials}
                  </div>
                  <div className="author-meta-details">
                    <span className="author-meta-name">{blog.author.name}</span>
                    <span className="author-meta-role">{authorInfo.title}</span>
                  </div>
                  <div className="blog-stat-divider"></div>
                </>
              )}
              <div className="blog-stat-badge">
                <svg className="blog-stat-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatBlogDate(blog.publish_date)}
              </div>
              {blog.estimated_reading_time && (
                <>
                  <div className="blog-stat-divider"></div>
                  <div className="blog-stat-badge">
                    <svg className="blog-stat-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {blog.estimated_reading_time} min read
                  </div>
                </>
              )}
            </div>

            {/* Featured Image */}
            <div className="blog-featured-img-container">
              <img src={blog.image_url} alt={blog.title} />
            </div>
          </header>

          {/* Grid Layout */}
          <div className="container blog-detail-grid">
            {/* Left Content Column */}
            <main className="blog-content-col">
              <div className={`blog-detail-body ${slug === 'work-visa-europe-guide' ? 'guide-active-styles' : ''}`}>
                {blog.body ? (
                  <PortableText value={blog.body} components={ptComponents} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
                )}
              </div>

              {/* About This Article Profiles (only for work visa guide) */}
              {slug === 'work-visa-europe-guide' && (
                <div className="about-article-section">
                  <div className="about-article-header">
                    <svg className="about-article-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2>About this article</h2>
                  </div>
                  <p className="about-article-intro">Written and independently reviewed by Jackson &amp; Frank specialists.</p>

                  <div className="profile-container">
                    {/* Writer Profile */}
                    <div className="profile-card">
                      <img className="profile-img" src="/speakers/Vibhu.webp" alt="Vibhu Agarwal" />
                      <div className="profile-details">
                        <span className="profile-label">Written by</span>
                        <h3 className="profile-name">Vibhu Agarwal</h3>
                        <span className="profile-designation">Marketing Manager, Jackson &amp; Frank</span>
                        <p className="profile-bio">
                          Vibhu leads content strategy at Jackson &amp; Frank, translating complex immigration and employment law into practical guidance for global HR teams. Drawing on his consulting background with Fortune 500 companies, he specializes in breaking down European hiring routes, visa sponsorship requirements, and cross-border compliance challenges that businesses face when expanding internationally.
                        </p>
                        <a className="profile-linkedin" href="https://www.linkedin.com/in/vibhu-agarwal-0453531b7" target="_blank" rel="noopener noreferrer">
                          <svg className="li-icon" fill="#143369" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                          Connect with Vibhu on LinkedIn
                        </a>
                      </div>
                    </div>

                    <div className="profile-card-divider"></div>

                    {/* Reviewer Profile */}
                    <div className="profile-card">
                      <img className="profile-img" src="/speakers/Gaurav.webp" alt="Gaurav Yelve" />
                      <div className="profile-details">
                        <span className="profile-label">Reviewed by</span>
                        <h3 className="profile-name">Gaurav Yelve</h3>
                        <span className="profile-designation">Immigration and global mobility specialist, Jackson &amp; Frank</span>
                        <p className="profile-bio">
                          This article was reviewed for immigration and global mobility accuracy before publication. Visa rules, salary thresholds, and application procedures can change during the year, so readers should always confirm details with the official immigration authority for the destination country.
                        </p>
                        <a className="profile-linkedin" href="https://www.linkedin.com/in/gaurav-yelve-10050118b/" target="_blank" rel="noopener noreferrer">
                          <svg className="li-icon" fill="#143369" viewBox="0 0 24 24" style={{ marginRight: '4px' }}>
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                          Connect with Gaurav on LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* FAQ Section. id="faq" is an alias so CMS TOC entries that link
                  to #faq resolve (the section itself uses #frequently-asked-questions). */}
              {blog.faq_items && blog.faq_items.length > 0 && (
                <div id="faq" style={{ marginTop: '40px' }}>
                  <FAQSection
                    id="frequently-asked-questions"
                    title={blog.faq_title || 'Frequently asked questions'}
                    subtitle={blog.faq_subtitle}
                    items={blog.faq_items}
                    align="left"
                    embedded={true}
                    useContactModal={true}
                  />
                </div>
              )}

              {/* Bottom Consultation Banner (generic fallback) */}
              {slug !== 'work-visa-europe-guide' && (
                <div className="consultation-cta-banner">
                  <div className="consultation-cta-info">
                    <div className="consultation-cta-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    </div>
                    <div className="consultation-cta-text">
                      <h3>Ready to expand your business to Europe?</h3>
                      <p>Our experts can help you navigate every step of your expansion journey.</p>
                    </div>
                  </div>
                  <button className="consultation-cta-btn" onClick={() => window.dispatchEvent(new CustomEvent('jf:open-contact-modal'))}>
                    Book a Consultation <span className="arrow">→</span>
                  </button>
                </div>
              )}

              {/* Related Articles section */}
              {related.length > 0 && (
                <div className="related-articles-outer">
                  <div className="related-section-header">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h2>Related Articles</h2>
                  </div>
                  <div className="related-cards-grid">
                    {related.slice(0, 3).map(post => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="related-card-item"
                      >
                        <div className="related-card-icon-box">
                          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                          </svg>
                        </div>
                        <h3 className="related-card-title">{post.title}</h3>
                        <div className="related-card-meta">
                          <span>{formatBlogDate(post.publish_date)}</span>
                          <span>•</span>
                          <span>{post.estimated_reading_time || 5} min read</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </main>

            {/* Right Sidebar Column with Sticky TOC */}
            <aside className="blog-sticky-sidebar">

              {/* A. In This Guide card */}
              {dynamicToc.length > 0 && (
                <div className="toc-card-container">
                  <div className="toc-card-header">In This Guide</div>
                  {/* data-lenis-prevent lets the mouse wheel scroll this box
                      instead of the Lenis-controlled page scroll. */}
                  <div className="toc-card-body" data-lenis-prevent>
                    <ul className="toc-card-list">
                      {dynamicToc.map((item, index) => {
                        const isCurrentActive = activeId === item.href.replace('#', '')
                        return (
                          <li key={index} className={`toc-card-item ${isCurrentActive ? 'active' : ''}`}>
                            <a href={item.href} onClick={(e) => handleTocClick(e, item.href)}>
                              {item.text}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )}

              {/* B. CTA Card */}
              <div className="sidebar-cta-card">
                <p className="sidebar-cta-heading">Ready to grow your global team?</p>
                <p className="sidebar-cta-body">Drop your work email and our team will show you how to hire, pay, and stay compliant in 17+ countries.</p>
                <input
                  type="email"
                  className="sidebar-cta-input"
                  placeholder="Enter your work email*"
                />
                <button className="sidebar-cta-btn" onClick={openModal}>
                  Get started &nbsp;→
                </button>
              </div>

              {/* C. Share Article Card */}
              <div className="sidebar-share-card">
                <p className="sidebar-share-heading">Share this article</p>
                <div className="sidebar-share-btns">
                  <a
                    className="share-btn share-btn-linkedin"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a
                    className="share-btn share-btn-email"
                    href={`mailto:?subject=${encodeURIComponent(blog?.title || '')}&body=${encodeURIComponent(shareUrl)}`}
                  >
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>

            </aside>
          </div>

          {/* Lead-capture modal */}
          <LeadModal
            open={modalOpen}
            title={`Talk to us about ${blog.title.length > 40 ? 'this topic' : blog.title}`}
            subtitle="Share your details and our team will get back to you within 24 hours."
            reason="general_inquiry"
            sourceLabel="Blog post"
            sourceTitle={blog.title}
            sourceUrl={`/blog/${slug}`}
            sourceCategories={blog.category_ids || ''}
            onClose={() => setModalOpen(false)}
          />
        </article>
      </>
    )
  }

  return null
}
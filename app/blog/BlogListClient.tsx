'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import CandidateCTA from '@/components/sections/CandidateCTA'
import { SlideIn } from '@/components/animations/SlideIn'
import { formatBlogDate } from '@/utils/blog'
import type { BlogPost, Category } from '@/types/blog'
import blogData from '@/data/blog.json'
import '@/styles/global.css'

interface BlogListClientProps {
  blogs: BlogPost[]
  categories: Category[]
}

/**
 * Interactive shell for the blog index. Posts are fetched on the server (see
 * page.tsx) and passed in, so the post links and titles are present in the
 * server-rendered HTML rather than appearing only after hydration.
 * Search, category filtering and pagination stay client-side.
 */
export default function BlogListClient({ blogs, categories }: BlogListClientProps) {
  const loading = false
  const error: string | null = null

  const [openFaq, setOpenFaq] = useState(0)
  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const [searchQuery, setSearchQuery] = useState('')
  const manualCategories = [
    { name: 'EOR', count: 11 },
    { name: 'Payroll', count: 13 },
    { name: 'Immigration', count: 6 },
    { name: 'Global Hiring', count: 7 },
    { name: 'Bank Holiday', count: 3 },
    { name: 'Contractor', count: 6 },
    { name: 'Leave', count: 6 },
    { name: 'Talent Acquisition', count: 7 },
    { name: 'Global Mobility', count: 4 },
    { name: 'Visa Sponsorship', count: 6 },
    { name: 'Contractor Management', count: 2 },
    { name: 'Employee Benefits', count: 2 },
    { name: 'Compliance', count: 1 },
    { name: 'MSP', count: 1 },
  ]

  const [selectedCategoryName, setSelectedCategoryName] = useState<string>('')

  const toolbarRef = useRef<HTMLDivElement>(null)
  function scrollTabs(direction: 'left' | 'right') {
    if (!toolbarRef.current) return
    const scrollAmount = 300
    if (direction === 'left') {
      toolbarRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      toolbarRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategoryName])

  const sortedBlogs = useMemo(() =>
    [...blogs].sort((a, b) => {
      const da = a.publish_date ? +new Date(a.publish_date) : 0
      const db = b.publish_date ? +new Date(b.publish_date) : 0
      return (Number.isNaN(db) ? 0 : db) - (Number.isNaN(da) ? 0 : da)
    })
    , [blogs])

  const categoryById = useMemo(() => {
    const map = new Map<string, string>()
    for (const c of categories) map.set(String(c.id), c.category_name)
    return map
  }, [categories])

  function blogCategory(b: BlogPost): string {
    const first = (b.category_ids ?? '').split(',')[0]?.trim()
    if (!first) return 'Insights'
    return categoryById.get(first) ?? 'Insights'
  }

  function getCatId(b: BlogPost): number {
    const first = (b.category_ids ?? '').split(',')[0]?.trim()
    return first ? parseInt(first) : 0
  }

  const filteredBlogs = useMemo(() => {
    let list = sortedBlogs
    if (selectedCategoryName) {
      const target = selectedCategoryName.toLowerCase()
      list = list.filter(b => {
        const catName = blogCategory(b).toLowerCase()
        if (catName === target) return true
        const slugified = target.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        if (b.category_ids?.toLowerCase().includes(slugified)) return true
        return false
      })
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(b => b.title.toLowerCase().includes(q) || (b.excerpt && b.excerpt.toLowerCase().includes(q)))
    }
    return list
  }, [sortedBlogs, selectedCategoryName, searchQuery, categoryById])

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>()
    counts.set('All', sortedBlogs.length)

    manualCategories.forEach(cat => {
      const target = cat.name.toLowerCase()
      const slugified = target.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      let count = 0
      for (const b of sortedBlogs) {
        const catName = blogCategory(b).toLowerCase()
        if (catName === target || b.category_ids?.toLowerCase().includes(slugified)) {
          count++
        }
      }
      counts.set(cat.name, count)
    })

    return counts
  }, [sortedBlogs, categoryById])

  const ITEMS_PER_PAGE = 6
  const totalPages = Math.ceil(Math.max(filteredBlogs.length - 1, 0) / ITEMS_PER_PAGE)
  const paginatedBlogs = useMemo(() => {
    const items = filteredBlogs.slice(1)
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return items.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredBlogs, currentPage])

  // Windowed page list: always the first and last page plus the current page
  // and its immediate neighbours, with gaps collapsed to an ellipsis. Keeps
  // the control to a fixed width no matter how many pages of posts exist.
  const pageItems = useMemo(() => {
    const items: Array<number | 'gap'> = []
    for (let page = 1; page <= totalPages; page++) {
      const isEdge = page === 1 || page === totalPages
      const isNearCurrent = Math.abs(page - currentPage) <= 1
      if (isEdge || isNearCurrent) {
        items.push(page)
      } else if (items[items.length - 1] !== 'gap') {
        items.push('gap')
      }
    }
    return items
  }, [totalPages, currentPage])

  async function submitNewsletter(e: React.FormEvent) {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    setNewsletterStatus('sending')
    try {
      const res = await fetch('/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail.trim() }),
      })
      setNewsletterStatus(res.ok ? 'ok' : 'error')
      if (res.ok) setNewsletterEmail('')
    } catch {
      setNewsletterStatus('error')
    }
  }

  return (
    <div className="blog-page-wrapper">
      <style>{`
/* ============= HERO WITH MAP BACKGROUND ============= */
.blog-hero {
  position: relative;
  margin-top:-70px;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  box-sizing: border-box;
  padding: 88px 0 96px;
  display: block;
  background-color: #0E0F3B;
  background-size: cover;
  background-position: center right;
  background-repeat: no-repeat;
  color: #ffffff;
  min-height: auto;
  overflow: hidden;
  margin-bottom: 0px;
  
}
.blog-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #0e0f3b 0%, rgba(14, 15, 59, 0.9) 35%, transparent 100%);
  z-index: 1;
}
.blog-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/services/service-page/map.webp');
  background-size: contain;
  background-position: 75% center;
  background-repeat: no-repeat;
  filter: invert(1) grayscale(1) brightness(1.5);
  mix-blend-mode: screen;
  opacity: 0.35;
  z-index: 0;
}
.blog-hero-inner {
  position: relative;
  z-index: 2;
  display: flex;
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: clamp(16px, 4vw, 32px);
}
.blog-hero-content {
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 99px;
  background: rgba(14, 15, 59, 0.1);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.blog-hero-title {
  padding-top: 10rem;

}
.blog-hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}
.blog-search {
  position: relative;
  margin-top: 10px;
  width: 100%;
  max-width: 400px;
}
.blog-search svg {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
}
.blog-search input {
  width: 100%;
  padding: 16px 20px 16px 48px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: var(--sans);
  font-size: 14px;
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.blog-search input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.blog-search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(14, 15, 59, 0.15);
}

/* Hero Floating Cards */
.hero-floating-cards {
    position: absolute;
    right: -20px;
    top: 0;
    bottom: 0;
    width: 55%;
    max-width: 700px;
    pointer-events: none;
    z-index: 2;
}
.float-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  padding: 6px 12px 6px 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 12px 30px rgba(14, 15, 59, 0.08);
  pointer-events: auto;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.3s, box-shadow 0.3s;
  width: max-content;
  max-width: 220px;
}
.float-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(14, 15, 59, 0.12);
}
.float-card-img-wrap {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f0f0;
}
.float-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.float-card-body {
  display: flex;
  flex-direction: column;
}
.float-card-cat {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.float-card-title {
  font-family: var(--sans);
  font-size: 10px;
  line-height: 1.3;
  margin-bottom: 2px;
  color: #0E0F3B;
}
.float-card-time {
  font-size: 9px;
  color: var(--ink-muted);
}
.card-1 { top: 15%; right: 5%; z-index: 1; }
.card-2 { top: 45%; left: 10%; z-index: 3; }
.card-3 { bottom: 15%; right: 20%; z-index: 2; }


/* ============= TOOLBAR ============= */
.toolbar-slider-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background: #ffffff;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid rgb(14 15 59 / 25%);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
}
.blog-toolbar {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  padding: 8px 0;
  flex: 1;
}
.blog-toolbar::-webkit-scrollbar {
  display: none;
}
.slider-btn {
  background: #f4f5f7;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink-soft);
  flex-shrink: 0;
  transition: all 0.2s;
}
.slider-btn.left { margin-right: 12px; }
.slider-btn.right { margin-left: 12px; }
.slider-btn:hover {
  background: #e2e4e8;
  color: var(--ink);
}
.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  background: transparent;
  border: none;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.filter-pill:hover {
  background: rgba(0, 0, 0, 0.03);
  color: var(--ink);
}
.filter-pill.active {
  background: var(--accent); /* using theme accent color for active state */
  color: #ffffff;
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 600;
  border-radius: 99px;
  padding: 2px 8px;
  min-width: 24px;
}
.resources-text p {
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
}

/* FAQ Typography Standardizations */
.faq-q {
  font-family: var(--sans);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s;
}
.faq-item.open .faq-q {
  color: var(--accent);
}
.faq-toggle {
  font-size: 24px;
  color: var(--ink-muted);
  line-height: 1;
  transition: color 0.2s;
}
.faq-item.open .faq-toggle {
  color: var(--accent);
}
.faq-a {
  grid-column: 1 / -1;
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

.filter-pill.active .count-badge {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}
.text-cat-2 { color: #1A8A47; }
.text-cat-3 { color: #7B4FB3; }
.text-cat-4 { color: var(--accent); }

/* ============= MAIN LAYOUT ============= */

.section-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}
.section-heading h2 {
  font-family: var(--sans);
  
  color: var(--ink);
}
.mt-40 { margin-top: 24px; }

/* ============= FEATURED CARD ============= */
.featured-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 420px;
}
.featured-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(14, 15, 59, 0.1);
}
.featured-card-body {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.featured-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.featured-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 32px);
  
  color: var(--ink);
  line-height: 1.2;
  margin-bottom: 16px;
}
.featured-excerpt {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 90%;
}
.btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  background: var(--accent);
  color: var(--btn-text, #ffffff);
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.2s, background 0.2s;
}
.btn-accent:hover {
  background: var(--ink);
  transform: translateY(-2px);
}
.featured-card-img-wrap {
  position: relative;
  background: #fdfaf5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.featured-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  mask-image: linear-gradient(to right, transparent, black 40%);
}
.featured-globe-overlay {
  position: absolute;
  inset: 0;
 }

/* ============= ARTICLES GRID ============= */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.blog-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.blog-card-inner {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.blog-card:hover .blog-card-inner {
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.06);
}
.blog-card-img-wrap {
  aspect-ratio: 16 / 9;
  background: #f3f3f3;
  overflow: hidden;
}
.blog-card-img {
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}
.blog-card:hover .blog-card-img {
  transform: scale(1.05);
}
.blog-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-card-title {
  font-family: var(--sans, 'DM Sans', sans-serif);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.45;
  color: #0c3372;
  margin-top: 8px;
  margin-bottom: 0;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-card:hover .blog-card-title {
  color: var(--accent);
}
.blog-card-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 12px;
  color: var(--ink-muted);
  font-weight: 500;
}
.blog-card-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.blog-card-excerpt {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-top: 12px;
  margin-bottom: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.blog-card-readmore {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 700;
  color: #0c3372;
  margin-top: auto;
}
.blog-card-readmore .icon-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #0c3372;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}
.blog-card:hover .icon-circle {
  transform: translateX(4px);
}
.pagination-container {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.pagination-numbers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}
.pagination-btn {
  background: transparent;
  border: none;
  font-family: var(--sans);
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Never let a narrow row squash the buttons out of shape. */
  flex-shrink: 0;
  white-space: nowrap;
}
.pagination-btn.number {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 8px;
  color: #0c3372;
}
.pagination-gap {
  flex-shrink: 0;
  color: var(--ink-muted);
  font-family: var(--sans);
  font-weight: 600;
  font-size: 15px;
  line-height: 1;
  padding: 0 2px;
  user-select: none;
}
.pagination-btn.number:hover {
  background: rgba(12, 51, 114, 0.05);
}
.pagination-btn.number.active {
  background: #0c3372;
  color: #ffffff;
}
.pagination-btn.text:disabled {
  color: var(--ink-muted);
  opacity: 0.5;
  cursor: not-allowed;
}
.pagination-btn.text:not(:disabled):hover {
  color: #0c3372;
}
@media (max-width: 600px) {
  .pagination-container {
    margin-top: 32px;
    gap: 6px;
  }
  .pagination-numbers {
    gap: 4px;
  }
  .pagination-btn {
    font-size: 14px;
  }
  .pagination-btn.number {
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
  }
}

/* ============= SIDEBAR ============= */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.sidebar-widget {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}
.btn-link-small {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  padding: 0;
  margin-top: 20px;
}

/* Trending List */
.trending-widget {
  height: 420px;
  display: flex;
  flex-direction: column;
}
.trending-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.trending-item {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  align-items: center;
  text-decoration: none;
  color: var(--ink);
}
.trending-item:hover h4 { color: var(--accent); }
.trending-img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: #f0f0f0;
  overflow: hidden;
}
.trending-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.trending-info h4 {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 4px;
  transition: color 0.2s;
}
.trending-info span {
  font-size: 12px;
  color: var(--ink-muted);
}

/* Newsletter Widget */
.newsletter-widget p {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 16px;
}
.sidebar-newsletter-form {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
.sidebar-newsletter-form input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 13px;
  outline: none;
  min-width: 0;
}
.sidebar-newsletter-form input:focus {
  border-color: var(--accent);
}
.sidebar-newsletter-form .btn-primary {
  width: auto;
  padding: 10px 16px;
  background: var(--accent-warm);
  color: var(--btn-text, #fff);
  border-radius: 8px;
  font-size: 13px;
}
.sidebar-newsletter-form .btn-primary:hover {
  background: var(--ink);
}

/* Topics Widget */
.topic-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.topic-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--ink-soft);
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.2s;
}
.topic-list li:hover { color: var(--accent); }
.topic-count {
  font-size: 12px;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 8px;
  border-radius: 99px;
  color: var(--ink-muted);
}

/* ============= RESOURCES BANNER ============= */
.resources-banner {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}
.resources-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  box-shadow: 0 4px 16px rgba(14, 15, 59, 0.1);
  flex-shrink: 0;
}
.resources-text { flex: 1; }
.resources-text h3 {
  font-family: var(--serif);
  font-size: 24px;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 8px;
}
.resources-text p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
}

/* ============= RESPONSIVE ============= */
@media (max-width: 1440px) {
  .hero-floating-cards {
    width: 45%;
  }
  .float-card {
    max-width: 200px;
  }
  .card-1 { top: 20%; right: 10%; }
  .card-2 { top: 50%; left: 5%; }
  .card-3 { bottom: 10%; right: 20%; }
}
@media (max-width: 1280px) {
  .blog-hero {
    padding: 160px 0 80px;
  
  padding-inline: clamp(16px, 4vw, 32px);}
  .blog-hero-content {
    max-width: 500px;
  }
  .hero-floating-cards {
    width: 40%;
  }
  .float-card {
    max-width: 180px;
  }
  .float-card-img-wrap {
    width: 36px;
    height: 36px;
  }
  .float-card-title {
    font-size: 9px;
  }
  .card-1 { top: 20%; right: 5%; }
  .card-2 { top: 50%; left: 0%; }
  .card-3 { bottom: 10%; right: 10%; }
}
@media (max-width: 1024px) {
  .hero-floating-cards { display: none; }
  .blog-main-layout {
    grid-template-columns: 1fr;
  }
  .blog-hero {
    padding: 100px 0 60px;
  
  padding-inline: clamp(16px, 4vw, 32px);}
  .resources-banner {
    flex-direction: column;
    text-align: center;
    padding: 32px;
  }
  .featured-card,
  .trending-widget {
    height: auto;
  }
}
@media (max-width: 768px) {
  .blog-hero {
    min-height: auto;
    padding: 260px 20px 60px;
    background-image: none;
    background-color: #0E0F3B;
  
  padding-inline: clamp(16px, 4vw, 32px);}
  .blog-hero::before {
    background: url('/services/service-page/map.webp');
    background-size: 150% auto;
    background-position: top center;
    background-repeat: no-repeat;
    bottom: auto;
    height: 280px;
    -webkit-mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 50%, transparent 100%);
  }
  .blog-hero-inner {
    padding-left: 0;
    padding-right: 0;
  }
  .featured-card {
    grid-template-columns: 1fr;
  }
  .featured-card-body {
    padding: 24px;
  }
  .featured-title {
    font-size: 24px;
  }
  .featured-card-img-wrap {
    aspect-ratio: 16 / 9;
    order: -1;
  }
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .toolbar-slider-wrap {
    padding: 6px 8px;
    border-radius: 24px;
    margin-bottom: 32px;
  }
  .slider-btn {
    width: 28px;
    height: 28px;
  }
  .slider-btn.left { margin-right: 8px; }
  .slider-btn.right { margin-left: 8px; }
  .blog-toolbar {
    gap: 8px;
  }
  .filter-pill {
    padding: 8px 14px;
    font-size: 12px;
  }
  .count-badge {
    padding: 2px 6px;
    min-width: 20px;
  }
  .sidebar-newsletter-form {
    flex-direction: column;
  }
  .sidebar-newsletter-form .btn-primary {
    width: 100%;
  }
}

/* ============= FAQ ============= */
.faq-section {
  padding: 60px 0;
}
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
@media (max-width: 900px) {
  .faq-block {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid #e2e8f0;
  display: block;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
}

.faq-q {
  font-family: var(--sans);
  font-size: 19px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ink);
  transition: color 0.2s;
}
.faq-item:hover .faq-q {
  color: var(--accent);
  transform: translateX(6px);
}
.faq-item.open .faq-q {
  color: var(--accent);
}
.faq-toggle {
  font-size: 24px;
  color: var(--ink-muted);
  line-height: 1;
  transition: color 0.2s;
}
.faq-item.open .faq-toggle {
  color: var(--accent);
}
.faq-a {
  grid-column: 1 / -1;
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}


/* ============= SKELETON LOADING ============= */
.skeleton-box {
  background-color: #e2e5e9;
  position: relative;
  overflow: hidden;
}
.skeleton-box::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

/* ============= BLOG INTRO ============= */
.blog-intro-section {
  padding: 40px 20px;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
}
.blog-intro-title {
  color: #0E0F3B;
  margin-bottom: 32px;
}
.blog-intro-content {
  text-align: left;
  font-size: 15px;
  color: var(--ink-soft, #475569);
  line-height: 1.7;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}
.blog-intro-link {
  display: inline-block;
  font-size: 15px;
  font-weight: 700;
  color: #0c3372;
  text-decoration: underline;
  transition: color 0.2s;
}
.blog-intro-link:hover {
  color: var(--accent);
}



`}</style>

      <header className="blog-hero">
        <div className="container blog-hero-inner">
          <div className="blog-hero-content">
            <SlideIn direction="fade-down" delay={0.1}>
              <h1 className="blog-hero-title">Insights, Trends &<br /><em style={{ color: '#F7931E', fontStyle: 'normal' }}>Global Hiring Intelligence</em></h1>
              <p className="blog-hero-subtitle">
                Expert insights on EOR, global hiring, compliance, payroll, visas, and workforce management.
              </p>
            </SlideIn>
            <SlideIn direction="fade-up" delay={0.3}>
              <div className="blog-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search articles..." />
              </div>
            </SlideIn>
          </div>

          <div className="hero-floating-cards">
            {/* Card 1 */}
            <div className="card-1" style={{ position: 'absolute' }}>
              <SlideIn direction="zoom-in" delay={0.4}>
                <Link href="/blog" className="float-card" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                  <div className="float-card-img-wrap"><img src="/services/service-page/global-hiring-j&f.webp" alt="Global Hiring" className="float-card-img" /></div>
                  <div className="float-card-body">
                    <span className="float-card-cat text-cat-4">Global Hiring</span>
                    <h4 className="float-card-title">Top 10 Global Hiring Trends to Watch in 2026</h4>
                    <span className="float-card-time">5 min read</span>
                  </div>
                </Link>
              </SlideIn>
            </div>

            {/* Card 2 */}
            <div className="card-2" style={{ position: 'absolute' }}>
              <SlideIn direction="zoom-in" delay={0.5}>
                <Link href="/blog" className="float-card" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                  <div className="float-card-img-wrap"><img src="/services/service-page/immigration.webp" alt="Visas" className="float-card-img" /></div>
                  <div className="float-card-body">
                    <span className="float-card-cat text-cat-4">Visas & Mobility</span>
                    <h4 className="float-card-title">Work Visa Guide for Europe 2026</h4>
                    <span className="float-card-time">6 min read</span>
                  </div>
                </Link>
              </SlideIn>
            </div>

            {/* Card 3 */}
            <div className="card-3" style={{ position: 'absolute' }}>
              <SlideIn direction="zoom-in" delay={0.6}>
                <Link href="/blog" className="float-card" style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
                  <div className="float-card-img-wrap"><img src="/services/main-page/compliance.webp" alt="Compliance" className="float-card-img" /></div>
                  <div className="float-card-body">
                    <span className="float-card-cat text-cat-4">Compliance</span>
                    <h4 className="float-card-title">2026 Compliance Updates You Should Know</h4>
                    <span className="float-card-time">4 min read</span>
                  </div>
                </Link>
              </SlideIn>
            </div>
          </div>
        </div>
      </header>

      {/* ============= BLOG INTRO ============= */}
      <div className="home-content-scale">
        <section className="blog-intro-section">
          <SlideIn direction="fade-up" delay={0.1}>
            <h2 className="blog-intro-title">{blogData.intro.title}</h2>
            <div className="blog-intro-content">
              {blogData.intro.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link href="/case-studies" className="blog-intro-link">
              Explore our success stories
            </Link>
          </SlideIn>
        </section>
      </div>

      {/* ============= TOOLBAR & GRID ============= */}
      <div className="home-content-scale">
        <section className="section container bor-buttom">
          <SlideIn direction="fade-up" delay={0.2} className="toolbar-slider-wrap">
            <button className="slider-btn left" onClick={() => scrollTabs('left')} aria-label="Scroll left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>

            <div className="blog-toolbar" ref={toolbarRef}>
              <button className={`filter-pill ${selectedCategoryName === '' ? 'active' : ''}`} onClick={() => setSelectedCategoryName('')}>
                All Categories
                <span className="count-badge">{categoryCounts.get('All') || 0}</span>
              </button>
              {manualCategories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`filter-pill ${selectedCategoryName === cat.name ? 'active' : ''}`}
                  onClick={() => setSelectedCategoryName(cat.name)}
                >
                  {cat.name}
                  <span className="count-badge">{categoryCounts.get(cat.name) || 0}</span>
                </button>
              ))}
            </div>

            <button className="slider-btn right" onClick={() => scrollTabs('right')} aria-label="Scroll right">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </SlideIn>

          {loading ? (
            <div className="blog-main-layout">
              {/* LEFT COLUMN: Skeleton */}
              <div className="blog-main-content">
                <div className="section-heading">
                  <div className="skeleton-box" style={{ width: '20px', height: '20px', borderRadius: '4px' }}></div>
                  <div className="skeleton-box" style={{ width: '200px', height: '32px', borderRadius: '4px' }}></div>
                </div>

                <div className="featured-card">
                  <div className="featured-card-body">
                    <div className="skeleton-box" style={{ width: '80px', height: '24px', borderRadius: '12px', marginBottom: '24px' }}></div>
                    <div className="skeleton-box" style={{ width: '90%', height: '32px', borderRadius: '4px', marginBottom: '12px' }}></div>
                    <div className="skeleton-box" style={{ width: '60%', height: '32px', borderRadius: '4px', marginBottom: '24px' }}></div>
                    <div className="skeleton-box" style={{ width: '100%', height: '80px', borderRadius: '4px', marginBottom: '32px' }}></div>
                    <div className="skeleton-box" style={{ width: '140px', height: '20px', borderRadius: '4px' }}></div>
                  </div>
                  <div className="featured-card-img-wrap skeleton-box">
                  </div>
                </div>

                <div className="section-heading mt-40">
                  <div className="skeleton-box" style={{ width: '180px', height: '32px', borderRadius: '4px' }}></div>
                </div>

                <div className="blog-grid">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="blog-card">
                      <div className="blog-card-inner">
                        <div className="blog-card-img-wrap skeleton-box"></div>
                        <div className="blog-card-body">
                          <div className="skeleton-box" style={{ width: '80px', height: '14px', marginBottom: '12px', borderRadius: '4px' }}></div>
                          <div className="skeleton-box" style={{ width: '100%', height: '22px', marginBottom: '8px', borderRadius: '4px' }}></div>
                          <div className="skeleton-box" style={{ width: '70%', height: '22px', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          ) : error ? (
            <p className="blog-error">Couldn&apos;t load articles right now. Please refresh.</p>
          ) : filteredBlogs.length === 0 ? (
            <div className="blog-error">No articles found matching your search.</div>
          ) : (
            <div className="blog-main-layout">
              {/* LEFT COLUMN: Main Articles */}
              <div className="blog-main-content">
                <div className="section-heading">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <h2>Featured Insight</h2>
                </div>

                {/* Featured Card (First blog) */}
                {filteredBlogs.length > 0 && (
                  <SlideIn direction="fade-right" delay={0.2}>
                    <Link href={`/blog/${filteredBlogs[0].slug}`} className="featured-card">
                      <div className="featured-card-body">
                        <span className="featured-tag">FEATURED</span>
                        <h3 className="featured-title">{filteredBlogs[0].title}</h3>
                        <p className="featured-excerpt">{filteredBlogs[0].excerpt}</p>
                        <span className="btn-accent">Read Article </span>
                      </div>
                      <div className="featured-card-img-wrap">
                        {filteredBlogs[0].image_url && <img src={filteredBlogs[0].image_url} alt={filteredBlogs[0].title} className="featured-card-img" />}
                        {/* Mock globe vectors as placeholder */}
                        <div className="featured-globe-overlay"></div>
                      </div>
                    </Link>
                  </SlideIn>
                )}

                <div className="section-heading mt-40">
                  <h2>Recent articles</h2>
                </div>

                {/* Recent articles Grid */}
                <div className="blog-grid">
                  {paginatedBlogs.map((post, i) => (
                    <SlideIn key={post.id} direction="zoom-in" delay={i * 0.1}>
                      <Link href={`/blog/${post.slug}`} className="blog-card" style={{ height: '100%' }}>
                        <div className="blog-card-inner">
                          <div className="blog-card-img-wrap">
                            {post.image_url && <img src={post.image_url} alt={post.title} className="blog-card-img" loading="lazy" />}
                          </div>
                          <div className="blog-card-body">
                            <div className="blog-card-meta">
                              <span className="blog-card-date">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                {formatBlogDate(post.publish_date)}
                              </span>
                            </div>
                            <h3 className="blog-card-title">{post.title}</h3>
                            {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                            <div className="blog-card-readmore">
                              Read more
                              <span className="icon-circle">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SlideIn>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container">
                    <button
                      className="pagination-btn text"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    >
                      Previous
                    </button>
                    <div className="pagination-numbers">
                      {pageItems.map((item, i) => (
                        item === 'gap' ? (
                          <span key={`gap-${i}`} className="pagination-gap" aria-hidden="true">…</span>
                        ) : (
                          <button
                            key={item}
                            className={`pagination-btn number ${currentPage === item ? 'active' : ''}`}
                            onClick={() => setCurrentPage(item)}
                            aria-label={`Go to page ${item}`}
                            aria-current={currentPage === item ? 'page' : undefined}
                          >
                            {item}
                          </button>
                        )
                      ))}
                    </div>
                    <button
                      className="pagination-btn text"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ============= EXPLORE RESOURCES BANNER ============= */}
      <div className="home-content-scale">
        <section className="container mb-80">
          <SlideIn direction="fade-up" delay={0.2} className="resources-banner">
            <div className="resources-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            </div>
            <div className="resources-text">
              <h3>Explore In-Depth Resources</h3>
              <p>Access guides, checklists, and reports to help you build and manage your global workforce.</p>
            </div>
            <Link href="/global-hiring-guide" className="btn-primary">Global Hiring Guide &rarr;</Link>
          </SlideIn>
        </section>
      </div>

      {/* ============= FAQ SECTION ============= */}
      <div className="home-content-scale">
        <section className="section faq-section">
          <div className="container">
            <div className="faq-block">
              <SlideIn direction="fade-up" className="faq-head">
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: blogData.faqs.title }}></h2>
              </SlideIn>
              <div className="faq-list">
                {blogData.faqs.items.map((faq: any, i: number) => (
                  <SlideIn key={i} direction="fade-left" delay={i * 0.1}>
                    <button
                      className={`faq-item ${openFaq === i ? 'open' : ''}`}
                      onClick={() => toggleFaq(i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="faq-q">{faq.question}</span>
                      <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                      <p style={{ display: openFaq === i ? 'block' : 'none' }} className="faq-a">{faq.answer}</p>
                    </button>
                  </SlideIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ============= CTA ============= */}
      <CandidateCTA imageSrc="/footerCTAImages/immigration.jpg" imageAlt="Ready to scale your global workforce?" />
    </div >
  )
}

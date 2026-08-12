'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import caseData from '@/data/case-studies.json'
import LeadModal from '@/components/ui/LeadModal'

export default function CaseStudyDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // Lead-capture modal (carries the case study as the lead source)
  const [modalOpen, setModalOpen] = useState(false)

  const study = useMemo(() =>
    caseData.caseStudies.find((c: any) => c.slug === slug) ?? null
    , [slug])

  const others = useMemo(() =>
    caseData.caseStudies.filter((c: any) => c.slug !== slug).slice(0, 2)
    , [slug])

  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const parseMd = (text: string) => {
    if (!text) return ''
    let parsed = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="cs-link">$1</a>')
    parsed = parsed.replace(/\[\[([^\]]+)\]\]/g, '<strong>$1</strong>')
    return parsed
  }


  if (!study) {
    return (
      <>
        <style>{`

:deep(.cs-link) {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s;
}
:deep(.cs-link:hover) {
  text-decoration-color: var(--accent);
}

/* --------------------
   NEW PREMIUM LAYOUT 
   -------------------- */
.cs-hero {
  position: relative;
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
  margin-bottom: 40px;
  
}
@media (min-width: 1024px) {
  .cs-hero { min-height: 540px; padding-bottom: 80px; }
}
.cs-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.cs-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7), rgba(0,0,0,0.4));
}
.cs-hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1100px;
}
.cs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.cs-back-link:hover { color: #fff; }
.cs-back-link .icon { transition: transform 0.2s; }
.cs-back-link:hover .icon { transform: translateX(-4px); }

.cs-hero-tag {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.75);
  margin-bottom: 12px;
}
.cs-hero-title {
  font-family: var(--sans);
  font-size: clamp(22px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  max-width: 800px;
}
@media (min-width: 1024px) {
  .cs-hero-title { font-size: clamp(28px, 4vw, 48px); }
}
.cs-hero-excerpt {
  font-size: 18px;
  color: rgba(255,255,255,0.95);
  max-width: 640px;
  line-height: 1.6;
  margin-bottom: 32px;
}
.cs-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.meta-item svg {
  opacity: 0.9;
}

/* BODY */
.cs-body-wrapper {
  padding: 80px 0;
}

.cs-section {
  margin-bottom: 64px;
  scroll-margin-top: 100px;
}
.cs-section-title {
  font-family: var(--sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.cs-subtitle {
  font-size: 14px;
  color: var(--ink-soft);
  margin-bottom: 24px;
}
.cs-text {
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.7;
}
.cs-list {
  list-style: disc;
  padding-left: 24px;
  margin: 16px 0;
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.7;
}
.cs-list li {
  margin-bottom: 8px;
}
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mt-6 { margin-top: 24px; }
.m-0 { margin: 0; }

/* SERVICES CARDS */
.cs-cards-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cs-service-card {
  background: #fff;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
}
.cs-service-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-color: rgba(9, 64, 123, 0.2);
}
.cs-service-inner {
  padding: 24px;
  display: flex;
  gap: 20px;
}
.cs-service-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}
.cs-service-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 12px;
  margin-top: 8px;
}
.cs-service-content .cs-list {
  margin: 0;
  font-size: 16px;
}

/* TIMELINE */
.cs-timeline-card {
  background: var(--bg-card);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 28px;
}
.cs-timeline {
  position: relative;
  padding-left: 12px;
  margin-top: 24px;
}
.cs-timeline-line {
  position: absolute;
  left: 23px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: var(--border);
}
.cs-timeline-item {
  position: relative;
  display: flex;
  gap: 20px;
  padding-bottom: 32px;
}
.cs-timeline-item:last-child {
  padding-bottom: 0;
}
.cs-timeline-dot {
  position: relative;
  z-index: 2;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-soft);
}
.cs-timeline-content {
  flex: 1;
}
.cs-timeline-phase {
  display: inline-block;
  background: rgba(0,0,0,0.06);
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

/* RESULTS GRID */
.cs-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 32px;
}
.cs-result-item {
  background: #fff;
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 12px;
}
.cs-result-metric {
  font-family: var(--sans);
  font-size: clamp(25px, 4vw, 42px);
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 12px;
}
.cs-result-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 8px;
}
.cs-result-desc {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

/* TESTIMONIAL */
.cs-blockquote {
  background: rgba(9, 64, 123, 0.03);
  border: 1px solid rgba(9, 64, 123, 0.1);
  border-radius: 16px;
  padding: 40px;
  position: relative;
}
.cs-quote-icon {
  color: var(--accent);
  opacity: 0.2;
  margin-bottom: 20px;
}
.cs-quote-text {
  font-family: var(--serif);
  font-size: 22px;
  color: var(--ink);
  line-height: 1.5;
  margin-bottom: 24px;
}
.cs-quote-author {
  font-weight: 700;
  color: var(--ink);
  font-size: 16px;
}
.cs-quote-role {
  color: var(--ink-soft);
  font-size: 14px;
}



/* FALLBACK STYLES */
.cs-detail { padding-top: 20px; }
.cs-breadcrumb {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 32px;
  align-items: center;
}
.cs-breadcrumb a { color: var(--ink-soft); }
.cs-breadcrumb a:hover { color: var(--accent); }
.cs-breadcrumb .current {
  color: var(--ink);
  max-width: 360px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cs-detail-header {
  max-width: 820px;
  margin: 0 auto 40px;
  text-align: center;
}
.cs-detail-header .tag { margin-bottom: 20px; }
.cs-detail-header h1 {
  font-family: "IBM Plex Serif";
  font-size: clamp(34px, 4.5vw, 48px);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
}
.cs-detail-excerpt {
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1.55;
}
.cs-detail-hero {
  position: relative;
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
  margin-bottom: 40px;
  
}
.cs-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
.stats-strip { margin-top: 0; }
.cs-detail-body {
  max-width: 760px;
  margin: 80px auto 0;
}
.cs-section .tag { margin-bottom: 12px; }

/* OTHER CASE STUDIES */
.cs-other-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}
.cs-other-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.3s;
}
.cs-other-card:hover { transform: translateY(-3px); }
.cs-other-img { aspect-ratio: 16 / 9; overflow: hidden; background: var(--accent-soft); }
.cs-other-img img { width: 100%; height: 100%; object-fit: cover; }
.cs-other-body { padding: 24px; }
.cs-other-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.cs-other-body h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.25;
  margin-top: 8px;
}

.cs-404 { padding: 200px 0 120px; text-align: center; }
.cs-404 h1 { margin-bottom: 28px; }

/* NEW CARD-BASED UI EXTENSIONS */
.cs-overview-section {
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
  position: relative;
  align-items: center;
}
.cs-overview-left {
  flex: 1;
}
.cs-pill {
  display: inline-block;
  background: rgba(9, 64, 123, 0.05);
  color: var(--accent);
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}
.cs-section-title-large {
  font-family: var(--sans);
  font-size: clamp(25px, 4vw, 42px);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.1;
}
.title-underline {
  width: 40px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 32px;
}
.cs-text-large {
  font-size: 19px;
  color: var(--ink);
  line-height: 1.6;
  white-space: pre-wrap;
}
.cs-overview-right {
  width: 320px;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}
.cs-stats-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
}
.cs-stat-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.cs-stat-row:last-child {
  margin-bottom: 0;
}
.cs-stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(9, 64, 123, 0.04);
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cs-stat-metric {
  font-family: var(--sans);
  font-size: 24px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.2;
}
.cs-stat-label {
  font-size: 13px;
  color: var(--ink-soft);
}

.cs-challenge-section, .cs-solution-section {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 40px;
}
.cs-challenge-split {
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
}
.cs-challenge-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.cs-challenge-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.cs-challenge-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.04);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cs-challenge-text {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.cs-challenge-text strong {
  display: block;
  font-size: 16px;
  color: var(--ink);
  margin-bottom: 4px;
}
.cs-challenge-image {
  width: 300px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}
.cs-challenge-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-challenge-bottom-bar {
  background: #1e3a8a; /* deep blue */
  color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.cs-bottom-bar-icon {
  color: #60a5fa;
}
.cs-bottom-bar-text {
  font-size: 17px;
  margin: 0;
}
.cs-bottom-bar-text :deep(a.cs-link),
.cs-bottom-bar-text :deep(strong) {
  color: #fff;
  text-decoration-color: rgba(255, 255, 255, 0.4);
}
.cs-bottom-bar-text :deep(a.cs-link:hover) {
  text-decoration-color: #fff;
}

.cs-stacked-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cs-stacked-card {
  display: flex;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  min-height: 120px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.cs-stacked-num {
  width: 80px;
  background: #1e3a8a;
  color: #fff;
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cs-stacked-header {
  width: 240px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-right: 1px solid var(--border);
}
.cs-stacked-icon {
  color: var(--accent);
}
.cs-stacked-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}
.cs-stacked-body {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  align-items: center;
}
.cs-list-custom {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cs-list-custom li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--ink-soft);
}
.cs-list-custom li:last-child { margin-bottom: 0; }
.cs-list-custom li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.cs-stacked-graphic {
  width: 180px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(9, 64, 123, 0.02);
}
.cs-placeholder-graphic {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(9, 64, 123, 0.1), rgba(9, 64, 123, 0.02));
}

@media (max-width: 900px) {
  .cs-other-grid { grid-template-columns: 1fr; }
  .cs-overview-section { flex-direction: column; gap: 32px; }
  .cs-overview-right { width: 100%; }
  .cs-challenge-split { flex-direction: column; }
  .cs-challenge-image { width: 100%; height: 240px; }
  .cs-challenge-grid { grid-template-columns: 1fr; }
  .cs-stacked-card { flex-direction: column; }
  .cs-stacked-num { width: 100%; height: 60px; }
  .cs-stacked-header { width: 100%; border-right: none; border-bottom: 1px solid var(--border); padding: 16px 20px; }
  .cs-stacked-graphic { display: none; }
  .cs-challenge-section, .cs-solution-section { padding: 24px; border-radius: 16px; }
  .cs-section-title-large { font-size: clamp(22px, 4vw, 32px); }
  .cs-text-large { font-size: 16px; }
  .cs-stats-card { padding: 24px; }
  .cs-challenge-bottom-bar { flex-direction: column; align-items: flex-start; padding: 20px; gap: 12px; }
  .cs-stacked-body { padding: 20px; }
}
@media (max-width: 768px) {
  .cs-breadcrumb {
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .cs-detail-header {
    margin-bottom: 32px;
  }
  .cs-detail-header h1 {
    font-size: clamp(22px, 4vw, 32px);
    margin-bottom: 16px;
  }
  .cs-detail-excerpt {
    font-size: 16px;
  }
  .cs-detail-body {
    margin: 48px auto 0;
  }
  .cs-section {
    margin-bottom: 32px;
  }
  .cs-other-grid {
    margin-top: 24px;
  }
  .cs-hero-title {
    font-size: 28px;
  }
  .cs-service-inner {
    flex-direction: column;
    padding: 20px;
  }
  .cs-timeline-item {
    padding-bottom: 24px;
  }
  .cs-results-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>
        <div className="container cs-404">
          <h1 className="section-title">We couldn&apos;t find that <em>case study</em></h1>
          <Link href="/case-studies" className="btn-primary">
            All case studies <span className="arrow">→</span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Base (Organization + WebSite) + FAQ (when present) as one combined block */}
      <JsonLd
        data={buildPageSchemaGraph(
          study.faqs?.items?.length
            ? buildFaqSchema({
                path: `/case-studies/${slug}`,
                faq: study.faqs.items.map((item: any) => ({
                  question: item.question,
                  answer: parseMd(item.answer).replace(/<[^>]*>/g, ''),
                })),
              })
            : []
        )}
      />
      <style>{`

:deep(.cs-link) {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.2s;
}
:deep(.cs-link:hover) {
  text-decoration-color: var(--accent);
}

/* --------------------
   NEW PREMIUM LAYOUT 
   -------------------- */
.cs-hero {
  position: relative;
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
  margin-bottom: 40px;
  
}
@media (min-width: 1024px) {
  .cs-hero { min-height: 540px; padding-bottom: 80px; }
}
.cs-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.cs-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.7), rgba(0,0,0,0.4));
}
.cs-hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1100px;
}
.cs-back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 24px;
  transition: color 0.2s;
}
.cs-back-link:hover { color: #fff; }
.cs-back-link .icon { transition: transform 0.2s; }
.cs-back-link:hover .icon { transform: translateX(-4px); }

.cs-hero-tag {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.75);
  margin-bottom: 12px;
}
.cs-hero-title {
  font-family: var(--sans);
  font-size: clamp(22px, 4vw, 36px);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
  max-width: 800px;
}
@media (min-width: 1024px) {
  .cs-hero-title { font-size: clamp(28px, 4vw, 48px); }
}
.cs-hero-excerpt {
  font-size: 18px;
  color: rgba(255,255,255,0.95);
  max-width: 640px;
  line-height: 1.6;
  margin-bottom: 32px;
}
.cs-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}
.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.meta-item svg {
  opacity: 0.9;
}

/* BODY */
.cs-body-wrapper {
  padding: 80px 0;
}

.cs-section {
  margin-bottom: 64px;
  scroll-margin-top: 100px;
}
.cs-section-title {
  font-family: var(--sans);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}
.cs-subtitle {
  font-size: 14px;
  color: var(--ink-soft);
  margin-bottom: 24px;
}
.cs-text {
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.7;
}
.cs-list {
  list-style: disc;
  padding-left: 24px;
  margin: 16px 0;
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.7;
}
.cs-list li {
  margin-bottom: 8px;
}
.mb-8 { margin-bottom: 32px; }
.mb-6 { margin-bottom: 24px; }
.mt-6 { margin-top: 24px; }
.m-0 { margin: 0; }

/* SERVICES CARDS */
.cs-cards-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cs-service-card {
  background: #fff;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
}
.cs-service-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  border-color: rgba(9, 64, 123, 0.2);
}
.cs-service-inner {
  padding: 24px;
  display: flex;
  gap: 20px;
}
.cs-service-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  flex-shrink: 0;
}
.cs-service-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 12px;
  margin-top: 8px;
}
.cs-service-content .cs-list {
  margin: 0;
  font-size: 16px;
}

/* TIMELINE */
.cs-timeline-card {
  background: var(--bg-card);
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 28px;
}
.cs-timeline {
  position: relative;
  padding-left: 12px;
  margin-top: 24px;
}
.cs-timeline-line {
  position: absolute;
  left: 23px;
  top: 12px;
  bottom: 12px;
  width: 2px;
  background: var(--border);
}
.cs-timeline-item {
  position: relative;
  display: flex;
  gap: 20px;
  padding-bottom: 32px;
}
.cs-timeline-item:last-child {
  padding-bottom: 0;
}
.cs-timeline-dot {
  position: relative;
  z-index: 2;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-soft);
}
.cs-timeline-content {
  flex: 1;
}
.cs-timeline-phase {
  display: inline-block;
  background: rgba(0,0,0,0.06);
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
}

/* RESULTS GRID */
.cs-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 32px;
}
.cs-result-item {
  background: #fff;
  border: 1px solid var(--border);
  padding: 24px;
  border-radius: 12px;
}
.cs-result-metric {
  font-family: var(--sans);
  font-size: clamp(25px, 4vw, 42px);
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 12px;
}
.cs-result-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 8px;
}
.cs-result-desc {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
}

/* TESTIMONIAL */
.cs-blockquote {
  background: rgba(9, 64, 123, 0.03);
  border: 1px solid rgba(9, 64, 123, 0.1);
  border-radius: 16px;
  padding: 40px;
  position: relative;
}
.cs-quote-icon {
  color: var(--accent);
  opacity: 0.2;
  margin-bottom: 20px;
}
.cs-quote-text {
  font-family: var(--serif);
  font-size: 22px;
  color: var(--ink);
  line-height: 1.5;
  margin-bottom: 24px;
}
.cs-quote-author {
  font-weight: 700;
  color: var(--ink);
  font-size: 16px;
}
.cs-quote-role {
  color: var(--ink-soft);
  font-size: 14px;
}



/* FALLBACK STYLES */
.cs-detail { padding-top: 20px; }
.cs-breadcrumb {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-muted);
  margin-bottom: 32px;
  align-items: center;
}
.cs-breadcrumb a { color: var(--ink-soft); }
.cs-breadcrumb a:hover { color: var(--accent); }
.cs-breadcrumb .current {
  color: var(--ink);
  max-width: 360px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cs-detail-header {
  max-width: 820px;
  margin: 0 auto 40px;
  text-align: center;
}
.cs-detail-header .tag { margin-bottom: 20px; }
.cs-detail-header h1 {
  font-family: "IBM Plex Serif";
  font-size: clamp(34px, 4.5vw, 48px);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 24px;
}
.cs-detail-excerpt {
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1.55;
}
.cs-detail-hero {
  position: relative;
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
  margin-bottom: 40px;
  
}
.cs-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
.stats-strip { margin-top: 0; }
.cs-detail-body {
  max-width: 760px;
  margin: 80px auto 0;
}
.cs-section .tag { margin-bottom: 12px; }

/* OTHER CASE STUDIES */
.cs-other-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 40px;
}
.cs-other-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: var(--ink);
  transition: transform 0.3s;
}
.cs-other-card:hover { transform: translateY(-3px); }
.cs-other-img { aspect-ratio: 16 / 9; overflow: hidden; background: var(--accent-soft); }
.cs-other-img img { width: 100%; height: 100%; object-fit: cover; }
.cs-other-body { padding: 24px; }
.cs-other-meta {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.cs-other-body h3 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  line-height: 1.25;
  margin-top: 8px;
}

.cs-404 { padding: 200px 0 120px; text-align: center; }
.cs-404 h1 { margin-bottom: 28px; }

/* NEW CARD-BASED UI EXTENSIONS */
.cs-overview-section {
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
  position: relative;
  align-items: center;
}
.cs-overview-left {
  flex: 1;
}
.cs-pill {
  display: inline-block;
  background: rgba(9, 64, 123, 0.05);
  color: var(--accent);
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 24px;
}
.cs-section-title-large {
  font-family: var(--sans);
  font-size: clamp(25px, 4vw, 42px);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.1;
}
.title-underline {
  width: 40px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 32px;
}
.cs-text-large {
  font-size: 19px;
  color: var(--ink);
  line-height: 1.6;
  white-space: pre-wrap;
}
.cs-overview-right {
  width: 320px;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}
.cs-stats-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 40px rgba(9, 64, 123, 0.08);
}
.cs-stat-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.cs-stat-row:last-child {
  margin-bottom: 0;
}
.cs-stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(9, 64, 123, 0.04);
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cs-stat-metric {
  font-family: var(--sans);
  font-size: 24px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.2;
}
.cs-stat-label {
  font-size: 13px;
  color: var(--ink-soft);
}

.cs-challenge-section, .cs-solution-section {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 10px 30px rgba(0,0,0,0.02);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 40px;
}
.cs-challenge-split {
  display: flex;
  gap: 40px;
  margin-bottom: 32px;
}
.cs-challenge-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
.cs-challenge-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.cs-challenge-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(9, 64, 123, 0.04);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cs-challenge-text {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.cs-challenge-text strong {
  display: block;
  font-size: 16px;
  color: var(--ink);
  margin-bottom: 4px;
}
.cs-challenge-image {
  width: 300px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
}
.cs-challenge-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cs-challenge-bottom-bar {
  background: #1e3a8a; /* deep blue */
  color: #fff;
  border-radius: 12px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.cs-bottom-bar-icon {
  color: #60a5fa;
}
.cs-bottom-bar-text {
  font-size: 17px;
  margin: 0;
}
.cs-bottom-bar-text :deep(a.cs-link),
.cs-bottom-bar-text :deep(strong) {
  color: #fff;
  text-decoration-color: rgba(255, 255, 255, 0.4);
}
.cs-bottom-bar-text :deep(a.cs-link:hover) {
  text-decoration-color: #fff;
}

.cs-stacked-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.cs-stacked-card {
  display: flex;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  min-height: 120px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.cs-stacked-num {
  width: 80px;
  background: #1e3a8a;
  color: #fff;
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cs-stacked-header {
  width: 240px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-right: 1px solid var(--border);
}
.cs-stacked-icon {
  color: var(--accent);
}
.cs-stacked-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
}
.cs-stacked-body {
  flex: 1;
  padding: 24px 32px;
  display: flex;
  align-items: center;
}
.cs-list-custom {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cs-list-custom li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--ink-soft);
}
.cs-list-custom li:last-child { margin-bottom: 0; }
.cs-list-custom li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}
.cs-stacked-graphic {
  width: 180px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(9, 64, 123, 0.02);
}
.cs-placeholder-graphic {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(9, 64, 123, 0.1), rgba(9, 64, 123, 0.02));
}

@media (max-width: 900px) {
  .cs-other-grid { grid-template-columns: 1fr; }
  .cs-overview-section { flex-direction: column; gap: 32px; }
  .cs-overview-right { width: 100%; }
  .cs-challenge-split { flex-direction: column; }
  .cs-challenge-image { width: 100%; height: 240px; }
  .cs-challenge-grid { grid-template-columns: 1fr; }
  .cs-stacked-card { flex-direction: column; }
  .cs-stacked-num { width: 100%; height: 60px; }
  .cs-stacked-header { width: 100%; border-right: none; border-bottom: 1px solid var(--border); padding: 16px 20px; }
  .cs-stacked-graphic { display: none; }
  .cs-challenge-section, .cs-solution-section { padding: 24px; border-radius: 16px; }
  .cs-section-title-large { font-size: clamp(22px, 4vw, 32px); }
  .cs-text-large { font-size: 16px; }
  .cs-stats-card { padding: 24px; }
  .cs-challenge-bottom-bar { flex-direction: column; align-items: flex-start; padding: 20px; gap: 12px; }
  .cs-stacked-body { padding: 20px; }
}
@media (max-width: 768px) {
  .cs-breadcrumb {
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  .cs-detail-header {
    margin-bottom: 32px;
  }
  .cs-detail-header h1 {
    font-size: clamp(22px, 4vw, 32px);
    margin-bottom: 16px;
  }
  .cs-detail-excerpt {
    font-size: 16px;
  }
  .cs-detail-body {
    margin: 48px auto 0;
  }
  .cs-section {
    margin-bottom: 32px;
  }
  .cs-other-grid {
    margin-top: 24px;
  }
  .cs-hero-title {
    font-size: 28px;
  }
  .cs-service-inner {
    flex-direction: column;
    padding: 20px;
  }
  .cs-timeline-item {
    padding-bottom: 24px;
  }
  .cs-results-grid {
    grid-template-columns: 1fr;
  }
}
`}</style>
      <article className="cs-detail">
        {study.fullContent ? (
          <>
            {/* HERO SECTION */}
            <div className="home-content-scale">
              <section className="cs-hero">
                <div className="cs-hero-bg">
                  <img src={study.image} alt={study.title} className="cs-hero-img" />
                  <div className="cs-hero-overlay"></div>
                </div>
                <div className="container cs-hero-content">
                  <Link href="/case-studies" className="cs-back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                    <span>Back to case studies</span>
                  </Link>

                  <p className="cs-hero-tag">{study.industry}</p>
                  <h1 className="cs-hero-title">{study.title}</h1>
                  <div className="cs-hero-excerpt" dangerouslySetInnerHTML={{ __html: parseMd(study.excerpt) }}></div>

                  <div className="cs-hero-meta">
                    {study.date && (
                      <span className="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>
                        {new Date(study.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    )}
                    {study.countries && (
                      <span className="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                        {study.countries.join(', ')}
                      </span>
                    )}
                    {study.duration && (
                      <span className="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
                        {study.duration}
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* MAIN CONTENT */}
            <div className="cs-body-wrapper">
              <div className="container cs-body-container">

                {/* Overview (New Layout) */}
                {study.fullContent.executiveSummary && (
                  <div className="home-content-scale">
                    <section className="cs-overview-section">
                      <div className="cs-overview-left">
                        <span className="cs-pill">CASE STUDY</span>
                        <h2 className="cs-section-title-large">Overview</h2>
                        <div className="cs-text-large" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.executiveSummary) }}></div>
                      </div>
                      <div className="cs-overview-right">
                        {study.results && (
                          <div className="cs-stats-card">
                            {study.results.slice(0, 3).map((res: any, idx: number) => (
                              <div key={idx} className="cs-stat-row">
                                <div className="cs-stat-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                                </div>
                                <div className="cs-stat-content">
                                  <div className="cs-stat-metric">{res.metric}</div>
                                  <div className="cs-stat-label">{res.label}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {/* Client Challenge (New Layout) */}
                {study.fullContent.businessChallenge && (
                  <div className="home-content-scale">
                    <section className="cs-challenge-section">
                      <h2 className="cs-section-title">Client challenge</h2>

                      {study.fullContent.businessChallenge.intro && (
                        <div className="cs-text mb-8" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.businessChallenge.intro) }}></div>
                      )}

                      <div className="cs-challenge-split">
                        {study.fullContent.businessChallenge.bullets && (
                          <div className="cs-challenge-grid">
                            {study.fullContent.businessChallenge.bullets.map((bullet: string, idx: number) => (
                              <div key={idx} className="cs-challenge-item">
                                <div className="cs-challenge-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                </div>
                                <div className="cs-challenge-text" dangerouslySetInnerHTML={{ __html: parseMd(bullet) }}></div>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="cs-challenge-image">
                          <img src={study.image || '/case-study/case.webp'} alt="Challenge" />
                        </div>
                      </div>

                      {study.fullContent.businessChallenge.closing && (
                        <div className="cs-challenge-bottom-bar">
                          <div className="cs-bottom-bar-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                          </div>
                          <div className="cs-bottom-bar-text" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.businessChallenge.closing) }}></div>
                        </div>
                      )}
                    </section>
                  </div>
                )}

                {/* Our Solution (New Layout) */}
                {study.fullContent.solutionIntro && (
                  <div className="home-content-scale">
                    <section className="cs-solution-section">
                      <h2 className="cs-section-title">Our solution</h2>
                      <p className="cs-subtitle">What we delivered.</p>
                      <div className="cs-text mb-8" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.solutionIntro) }}></div>

                      {study.fullContent.keyServices && (
                        <div className="cs-stacked-cards">
                          {study.fullContent.keyServices.map((service: any, idx: number) => (
                            <div key={idx} className="cs-stacked-card">
                              <div className="cs-stacked-num">{idx + 1}</div>
                              <div className="cs-stacked-header">
                                <h3 className="cs-stacked-title" dangerouslySetInnerHTML={{ __html: parseMd(service.title.replace(/^\d+\.\s*/, '')) }}></h3>
                              </div>
                              <div className="cs-stacked-body">
                                <ul className="cs-list-custom">
                                  {service.items.map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: parseMd(item) }}></li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </section>
                  </div>
                )}

                {/* How We Did It */}
                {study.fullContent.implementationApproach && (
                  <div className="home-content-scale">
                    <section className="cs-section">
                      <h2 className="cs-section-title">How we did it</h2>
                      <p className="cs-subtitle">Phased approach and timeline.</p>

                      <div className="cs-timeline-card">
                        {study.fullContent.implementationApproach.intro && (
                          <div className="cs-text mb-6" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.implementationApproach.intro) }}></div>
                        )}
                        {study.fullContent.implementationApproach.steps && (
                          <div className="cs-timeline">
                            <div className="cs-timeline-line"></div>
                            {study.fullContent.implementationApproach.steps.map((step: string, idx: number) => (
                              <div key={idx} className="cs-timeline-item">
                                <div className="cs-timeline-dot">{idx + 1}</div>
                                <div className="cs-timeline-content">
                                  <span className="cs-timeline-phase">Phase {idx + 1}</span>
                                  <div className="cs-text m-0" dangerouslySetInnerHTML={{ __html: parseMd(step.replace(/^[^:]+:\s*/, '')) }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {study.fullContent.implementationApproach.closing && (
                          <div className="cs-text mt-6" dangerouslySetInnerHTML={{ __html: parseMd(study.fullContent.implementationApproach.closing) }}></div>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {/* Results Grid */}
                {study.results && study.results.length > 0 && (
                  <div className="home-content-scale">
                    <section className="cs-section">
                      <h2 className="cs-section-title">Results</h2>
                      <p className="cs-subtitle">The impact of our partnership.</p>
                      <div className="cs-results-grid">
                        {study.results.map((res: any, idx: number) => (
                          <div key={idx} className="cs-result-item">
                            <div className="cs-result-metric">{res.metric}</div>
                            <div className="cs-result-label">{res.label}</div>
                            <div className="cs-result-desc">{res.description}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="home-content-scale">
                    <section className="cs-section">
                      <blockquote className="cs-blockquote">
                        <svg className="cs-quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 21L16.41 14.536C14.53 14.268 13.048 12.723 13.048 10.741C13.048 8.672 14.73 7 16.804 7C18.878 7 20.56 8.672 20.56 10.741C20.56 14.394 18.064 19.382 14.869 21H14.017ZM5.00403 21L7.39703 14.536C5.51703 14.268 4.03503 12.723 4.03503 10.741C4.03503 8.672 5.71703 7 7.79103 7C9.86503 7 11.547 8.672 11.547 10.741C11.547 14.394 9.05103 19.382 5.85603 21H5.00403Z" /></svg>
                        <p className="cs-quote-text">&quot;{study.testimonial}&quot;</p>
                        <div className="home-content-scale">
                          <footer className="cs-quote-footer">
                            <div className="cs-quote-author">{study.clientName}</div>
                            <div className="cs-quote-role">{study.clientRole}</div>
                          </footer>
                        </div>
                      </blockquote>
                    </section>
                  </div>
                )}
              </div>
            </div>

            {/* FAQ Section */}
            {study.faqs && (
              <div className="home-content-scale">
                <section className="section container">
                  <div className="faq-block">
                    <div className="faq-head">
                      <h2 className="section-title">{study.faqs.title}</h2>
                      <p style={{ color: 'var(--ink-soft)', fontSize: '18px', marginTop: '12px' }}>{study.faqs.subtitle}</p>
                    </div>
                    <div className="faq-list">
                      {study.faqs.items.map((item: any, index: number) => (
                        <button
                          key={index}
                          className={`faq-item ${activeFaq === index ? 'open' : ''}`}
                          onClick={() => toggleFaq(index)}
                          aria-expanded={activeFaq === index}
                        >
                          <span className="faq-q">{item.question}</span>
                          <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: activeFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          </span>
                          <div style={{ display: activeFaq === index ? 'block' : 'none' }} className="faq-a" dangerouslySetInnerHTML={{ __html: parseMd(item.answer) }}></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </>
        ) : (
          <>
            {/* FALLBACK TO OLD LAYOUT IF NO fullContent */}
            <nav className="container cs-breadcrumb">
              <Link href="/">Home</Link>
              <span className="sep">/</span>
              <Link href="/case-studies">Case studies</Link>
              <span className="sep">/</span>
              <span className="current">{study.title}</span>
            </nav>

            <header className="container cs-detail-header">
              <h1>{study.title}</h1>
              <p className="cs-detail-excerpt">{study.excerpt}</p>
            </header>

            <figure className="container cs-detail-hero">
              <img src={study.image} alt={study.title} />
            </figure>

            {study.results && (
              <div className="home-content-scale">
                <section className="stats-strip">
                  <div className="container stats-strip-inner">
                    {study.results.map((r: any, i: number) => (
                      <div key={i} className="stat-item">
                        <strong>{r.metric}</strong>
                        <span className="stat-label">{r.label}</span>
                        <span className="stat-desc">{r.description}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            <div className="container cs-detail-body">
              {study.background && (
                <div className="cs-section">
                  <span className="tag">{study.background.title}</span>
                  <p>{study.background.content}</p>
                </div>
              )}
              {study.problem && (
                <div className="cs-section">
                  <span className="tag">{study.problem.title}</span>
                  <p>{study.problem.content}</p>
                </div>
              )}
              {study.solution && (
                <div className="cs-section">
                  <span className="tag">{study.solution.title}</span>
                  <p>{study.solution.content}</p>
                </div>
              )}

              {study.testimonial && (
                <blockquote className="cs-quote">
                  &quot;{study.testimonial}&quot;
                  <div className="home-content-scale">
                    <footer>
                      <strong>{study.clientName}</strong>
                      <span>{study.clientRole}</span>
                    </footer>
                  </div>
                </blockquote>
              )}
            </div>
          </>
        )}

        {/* OTHER CASE STUDIES */}
        {others.length > 0 && (
          <div className="home-content-scale">
            <section className="section container">
              <h2 className="section-title">More <em>stories</em></h2>
              <div className="cs-other-grid">
                {others.map((o: any) => (
                  <Link key={o.id} href={`/case-studies/${o.slug}`} className="cs-other-card">
                    <div className="cs-other-img"><img src={o.image} alt={o.title} loading="lazy" /></div>
                    <div className="cs-other-body">
                      <span className="cs-other-meta">{o.industry}</span>
                      <h3>{o.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* GLOBAL CTA */}
        <div className="home-content-scale">
          <section className="cta-warm-wrap">
            <div className="cta-warm">
              <span className="cta-tag">Get started</span>
              <h2>Ready for a similar <em>outcome?</em></h2>
              <p>Tell us your expansion plan and we&apos;ll outline a tailored approach.</p>
              <div className="cta-warm-buttons">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Get a proposal <span className="arrow">→</span>
                </button>
                <Link href="/case-studies" className="btn-secondary">All case studies</Link>
              </div>
            </div>
          </section>
        </div>

        {/* Lead-capture modal — attributes the lead to this case study */}
        <LeadModal
          open={modalOpen}
          title="Get a proposal"
          subtitle="Tell us your expansion plan and our team will outline a tailored approach within 24 hours."
          reason="general_inquiry"
          sourceLabel="Case study"
          sourceTitle={study.title}
          sourceUrl={`/case-studies/${slug}`}
          sourceCategories={(study.tags ?? []).join(', ')}
          onClose={() => setModalOpen(false)}
        />
      </article>
    </>
  )
}

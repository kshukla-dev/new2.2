import Link from 'next/link'
import type { Metadata } from 'next'
import eventsData from '@/data/events.json'
import { BaseSchema } from '@/components/seo/BaseSchema'

export const metadata: Metadata = {
  title: 'Events',
  description: (eventsData as any).metadata?.description ?? 'Upcoming events by Jackson & Frank.',
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EventsPage() {
  return (
    <>
      <BaseSchema />
      <style>{`
        .ev-hero{padding:140px 32px 40px;text-align:center;max-width:760px}
        .ev-hero .tag{margin-bottom:16px}
        .ev-hero .section-title{margin-bottom:16px}
        .ev-hero p{font-size:17px;color:var(--ink-soft);max-width:560px;margin:0 auto}
        .ev-list{display:flex;flex-direction:column;gap:20px}
        .ev-card{display:grid;grid-template-columns:90px 1fr auto;gap:28px;align-items:center;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:32px;text-decoration:none;color:var(--ink);transition:border-color 0.2s,transform 0.2s}
        .ev-card:hover{border-color:var(--accent);transform:translateY(-2px)}
        .ev-card-date{display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--ink);color:var(--bg);border-radius:14px;padding:16px 0}
        .ev-day{font-family:var(--serif);font-size:clamp(22px,4vw,34px);line-height:1}
        .ev-month{font-size:12px;letter-spacing:0.1em;text-transform:uppercase;margin-top:4px;color:var(--accent-warm)}
        .ev-type{font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent)}
        .ev-card-body h3{font-family:var(--serif);font-size:28px;font-weight:400;line-height:1.15;margin:8px 0 10px}
        .ev-card-body p{font-size:14px;color:var(--ink-soft);line-height:1.6;margin-bottom:12px}
        .ev-meta{display:flex;gap:20px;flex-wrap:wrap;font-size:13px;color:var(--ink-muted)}
        .ev-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 22px;border-radius:999px;background:var(--ink);color:var(--bg);font-size:13px;font-weight:500;white-space:nowrap;transition:background 0.2s}
        .ev-card:hover .ev-cta{background:var(--accent)}
        @media(max-width:768px){.ev-hero{padding-top:110px}.ev-card{grid-template-columns:1fr;gap:16px;text-align:left}.ev-card-date{flex-direction:row;gap:8px;align-self:flex-start;padding:10px 18px}}
      `}</style>

      <header className="container ev-hero">
        <h1 className="section-title">Where we&apos;ll <em>be next</em></h1>
        <p>{(eventsData as any).metadata?.description}</p>
      </header>

      <div className="home-content-scale">
      <section className="section container">
        <div className="ev-list">
          {(eventsData as any).events?.map((ev: any) => (
            <Link key={ev.id} href="/resources/events/china-europe-2026" className="ev-card">
              <div className="ev-card-date">
                <span className="ev-day">{new Date(ev.startDate).getDate()}</span>
                <span className="ev-month">{new Date(ev.startDate).toLocaleDateString('en-US', { month: 'short' })}</span>
              </div>
              <div className="ev-card-body">
                <span className="ev-type">{ev.type}</span>
                <h3>{ev.title}</h3>
                <p>{ev.excerpt}</p>
                <div className="ev-meta">
                  <span>📍 {ev.venue}</span>
                  <span>🕒 {ev.time} · {fmtDate(ev.startDate)}</span>
                </div>
              </div>
              <span className="ev-cta">View details <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>
      </div>

      <div className="home-content-scale">
      <section className="cta-warm-wrap">
        <div className="cta-warm">
          <span className="cta-tag">Stay in the loop</span>
          <h2>Never miss an <em>event</em></h2>
          <p>Get notified about upcoming workshops, webinars, and conferences.</p>
          <div className="cta-warm-buttons">
            <Link href="/contact" className="btn-primary">
              Get in touch <span className="arrow">→</span>
            </Link>
            <Link href="/blog" className="btn-secondary">Read the blog</Link>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}

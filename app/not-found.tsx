import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <style>{`
        .not-found-container{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:80px 0;background-color:var(--bg)}
        .text-center{text-align:center;max-width:600px;margin:0 auto}
        .error-code{font-family:var(--serif);font-size:120px;line-height:1;color:var(--accent);margin-bottom:24px}
        .error-title{font-size:clamp(22px,4vw,32px);font-family:var(--serif);color:var(--ink);margin-bottom:16px}
        .error-desc{font-size:16px;color:var(--ink-soft);margin-bottom:40px;line-height:1.6}
        .actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
        .nf-btn-primary{display:inline-flex;padding:12px 28px;background-color:var(--accent-warm);color:#fff;font-weight:600;text-decoration:none;border-radius:8px;transition:all 0.2s}
        .nf-btn-primary:hover{background-color:#e07d10;transform:translateY(-2px)}
        .nf-btn-secondary{display:inline-flex;padding:12px 28px;background-color:transparent;color:var(--ink);font-weight:600;text-decoration:none;border-radius:8px;border:1px solid var(--border);transition:all 0.2s}
        .nf-btn-secondary:hover{background-color:var(--accent-soft);border-color:var(--accent)}
      `}</style>
      <div className="not-found-container">
        <div className="container text-center">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page not found</h2>
          <p className="error-desc">We can&apos;t seem to find the page you&apos;re looking for. It might have been removed or the link may be broken.</p>
          <div className="actions">
            <Link href="/" className="nf-btn-primary">Return to Homepage</Link>
            <Link href="/contact" className="nf-btn-secondary">Contact Support</Link>
          </div>
        </div>
      </div>
    </>
  )
}

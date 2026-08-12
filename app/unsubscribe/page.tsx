'use client'
import { BaseSchema } from '@/components/seo/BaseSchema'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { unsubscribeNewsletter } from '@/lib/contact'

import { Suspense } from 'react'

function UnsubscribeForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const e = searchParams.get('email')
    if (e) setEmail(e)
  }, [searchParams])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    if (!email.trim()) return
    setStatus('sending')
    const result = await unsubscribeNewsletter(email.trim())
    if (result.success) {
      setStatus('ok')
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong.')
    }
  }

  return (
    <div className="unsub-card">
      <h1 className="section-title">Unsubscribe</h1>

      {status === 'ok' ? (
        <>
          <p className="unsub-msg ok">
            You&apos;ve been unsubscribed. We&apos;re sorry to see you go - you can resubscribe
            anytime from our blog.
          </p>
          <Link href="/blog" className="btn-primary">Back to the blog <span className="arrow">→</span></Link>
        </>
      ) : (
        <>
          <p className="unsub-lede">
            Enter your email to stop receiving our newsletter. You can resubscribe whenever you like.
          </p>
          <form onSubmit={submit} className="unsub-form">
            <label className="usub-field">
              <span>Email address</span>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="you@company.com"
                required
                disabled={status === 'sending'}
              />
            </label>
            {status === 'error' && <p className="unsub-msg error">{errorMessage}</p>}
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Processing…' : 'Unsubscribe'}
              <span className="arrow">→</span>
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <>
      <BaseSchema />
      <style>{`
        .unsub{padding:160px 32px 120px;display:flex;justify-content:center}
        .unsub-card{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:56px 48px;max-width:520px;width:100%;text-align:center}
        .unsub-card .tag{margin-bottom:16px}
        .unsub-card .section-title{margin-bottom:16px}
        .unsub-lede{font-size:15px;color:var(--ink-soft);line-height:1.6;margin-bottom:28px}
        .unsub-form{display:flex;flex-direction:column;gap:16px;text-align:left}
        .usub-field{display:flex;flex-direction:column;gap:8px}
        .usub-field span{font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:500}
        .usub-field input{font-family:var(--sans);font-size:15px;padding:13px 16px;border:1px solid var(--border);border-radius:10px;background:var(--bg);outline:none}
        .usub-field input:focus{border-color:var(--accent)}
        .unsub-form .btn-primary{justify-content:center}
        .unsub-msg{font-size:14px;line-height:1.6}
        .unsub-msg.ok{color:var(--ink-soft);margin-bottom:24px}
        .unsub-msg.error{color:#b54234}
        @media(max-width:640px){.unsub{padding-top:120px}.unsub-card{padding:40px 28px}}
      `}</style>
      <div className="home-content-scale">
      <section className="container unsub">
        <Suspense fallback={<div className="unsub-card"><p>Loading...</p></div>}>
          <UnsubscribeForm />
        </Suspense>
      </section>
      </div>
    </>
  )
}

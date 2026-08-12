'use client'

import { useEffect, useState } from 'react'
import { submitContactForm, appendLeadContext } from '@/lib/contact'
import { hasSubmittedEmail, recordEmailSubmission } from '@/lib/formSubmission'

interface LeadModalProps {
  open: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  reason?: string
  /** Source type shown in the internal lead block, e.g. "Blog post" / "Case study". */
  sourceLabel?: string
  /** Title of the page this lead came from. */
  sourceTitle?: string
  /** Path this lead came from, e.g. "/blog/some-slug". */
  sourceUrl?: string
  /** Comma-separated categories/tags of the source page. */
  sourceCategories?: string
}

type Status = 'idle' | 'sending' | 'success' | 'error' | 'duplicate'

/**
 * Lead-capture modal that supports custom title, subtitle, and reason fields.
 * Closes on Escape key press or backdrop click.
 *
 * Submissions carry an internal lead-source block (which page produced the
 * lead) and are guarded against a repeat submission of the same email within
 * 24h, matching the contact page and DelayedContactPopup.
 */
export default function LeadModal({
  open,
  onClose,
  title = 'Talk to an expert',
  subtitle,
  reason,
  sourceLabel,
  sourceTitle,
  sourceUrl,
  sourceCategories,
}: LeadModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function closeAndReset() {
    setFirstName('')
    setLastName('')
    setEmail('')
    setMessage('')
    setStatus('idle')
    setErrorMessage('')
    onClose()
  }

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAndReset()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return

    // Duplicate guard: same email already submitted from this browser in the
    // last 24h, so skip the API call and show the "already received" state.
    if (hasSubmittedEmail(email)) {
      setStatus('duplicate')
      return
    }

    setStatus('sending')
    const result = await submitContactForm({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      work_email: email.trim(),
      phone_number: '',
      company_name: '',
      help_reason: reason || 'general_inquiry',
      message: appendLeadContext(message.trim(), {
        label: sourceLabel,
        title: sourceTitle,
        url: sourceUrl,
        categories: sourceCategories,
      }),
    })

    if (result.success) {
      recordEmailSubmission(email)
      setStatus('success')
      setTimeout(closeAndReset, 2000)
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'There was an issue sending your message. Please try again later.')
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(14,15,59,0.55)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAndReset()
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 20,
          padding: '48px 40px',
          maxWidth: 480,
          width: '90%',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(14,15,59,0.18)',
        }}
      >
        {/* Close button */}
        <button
          onClick={closeAndReset}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer',
            color: '#666',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0E0F3B' }}>
          {title}
        </h2>

        {subtitle && (
          <p style={{ fontSize: 15, color: '#555', marginBottom: 24, lineHeight: 1.6 }}>
            {subtitle}
          </p>
        )}

        {status === 'success' ? (
          <p style={{ fontSize: 15, color: '#1a7f4b', lineHeight: 1.6 }}>
            Thanks, {firstName.trim()}! We&apos;ve received your message and will be in touch shortly.
          </p>
        ) : status === 'duplicate' ? (
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6 }}>
            We&apos;ve already received your enquiry and our team will be in touch. Need to talk
            sooner? Email us at{' '}
            <a href="mailto:info@jacksonandfrank.com" style={{ color: '#0E0F3B', fontWeight: 600 }}>
              info@jacksonandfrank.com
            </a>
            .
          </p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={status === 'sending'}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 15,
                  outline: 'none',
                  fontFamily: 'inherit',
                  flex: 1,
                  minWidth: 0,
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={status === 'sending'}
                style={{
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  fontSize: 15,
                  outline: 'none',
                  fontFamily: 'inherit',
                  flex: 1,
                  minWidth: 0,
                }}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Work email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending'}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 15,
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <textarea
              name="message"
              placeholder="How can we help?"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'sending'}
              style={{
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: 15,
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            {status === 'error' && (
              <p style={{ fontSize: 13, color: '#b54234', margin: 0 }}>{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                padding: '14px 24px',
                borderRadius: 8,
                background: '#0E0F3B',
                color: '#ffffff',
                fontSize: 15,
                fontWeight: 600,
                border: 'none',
                cursor: status === 'sending' ? 'default' : 'pointer',
                opacity: status === 'sending' ? 0.7 : 1,
                fontFamily: 'inherit',
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

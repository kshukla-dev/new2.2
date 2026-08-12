'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { submitContactForm, appendLeadContext } from '@/lib/contact'
import { hasSubmittedEmail, recordEmailSubmission } from '@/lib/formSubmission'
import { CALENDLY_URL, CONTACT_INFO } from '@/lib/constants'
import { Calendar } from 'lucide-react'

export default function DelayedContactPopup() {
  const [open, setOpen] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', reason: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'duplicate'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const pathname = usePathname()

  // Reset triggered state on path change
  useEffect(() => {
    setHasTriggered(false)
  }, [pathname])

  // Scroll depth trigger: Show popup when user reaches 75% of any blog page or post
  useEffect(() => {
    const isBlogPage = pathname === '/blog' || pathname?.startsWith('/blog')

    if (!isBlogPage || hasTriggered) return

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100
        if (scrollPercent >= 75) {
          setOpen(true)
          setHasTriggered(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, hasTriggered])

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('jf:open-contact-modal', handleOpen)
    return () => window.removeEventListener('jf:open-contact-modal', handleOpen)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const handleChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    if (!form.firstName || !form.lastName || !form.email || !form.reason || !form.message) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }
    // Duplicate guard: same email already submitted from this browser in the
    // last 24h — skip the API call and show the "already received" screen.
    if (hasSubmittedEmail(form.email)) {
      setStatus('duplicate')
      return
    }
    setStatus('sending')
    const result = await submitContactForm({
      first_name: form.firstName,
      last_name: form.lastName,
      work_email: form.email,
      phone_number: form.phone,
      company_name: form.company,
      help_reason: form.reason,
      // Popup fires on blog pages, so record which page the lead came from.
      message: appendLeadContext(form.message, { label: 'Page', url: pathname || '' }),
    })
    if (result.success) {
      recordEmailSubmission(form.email)
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMessage(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <div className="popup-header">
          <div>
            <h2>Get in touch</h2>
            <p>Learn more about our workforce solutions</p>
          </div>
          <button className="popup-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>

        <div className="popup-content" data-lenis-prevent>
          <a href="/contact?reason=book_call" className="popup-book-btn">
            <Calendar size={18} /> Book a call
          </a>

          <div className="popup-divider">
            <span>Or fill out the form below to send us a message</span>
          </div>

          <div className="popup-form-title">SEND US A MESSAGE</div>

          {status === 'success' || status === 'duplicate' ? (
            <div className="popup-success">
              <span className="popup-success-icon">✓</span>
              <h3>{status === 'duplicate' ? "We've already received your response" : 'Message Sent!'}</h3>
              {status === 'duplicate' ? (
                <p>
                  We&apos;ve received your inquiry and our team will be in touch. Need to talk sooner?{' '}
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a call</a>{' '}
                  or email <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>.
                </p>
              ) : (
                <p>We'll be in touch with you shortly.</p>
              )}
              <button className="popup-btn-primary" onClick={() => setOpen(false)}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit} className="popup-form">
              <div className="popup-row">
                <div className="popup-field">
                  <label>FIRST NAME <span>*</span></label>
                  <input type="text" placeholder="John" value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} required />
                </div>
                <div className="popup-field">
                  <label>LAST NAME <span>*</span></label>
                  <input type="text" placeholder="Doe" value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} required />
                </div>
              </div>

              <div className="popup-row">
                <div className="popup-field">
                  <label>EMAIL <span>*</span></label>
                  <input type="email" placeholder="john.doe@company.com" value={form.email} onChange={e => handleChange('email', e.target.value)} required />
                </div>
                <div className="popup-field">
                  <label>PHONE</label>
                  <input type="tel" placeholder="+1 234 567 8900" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                </div>
              </div>

              <div className="popup-row">
                <div className="popup-field">
                  <label>COMPANY</label>
                  <input type="text" placeholder="Your Company Name" value={form.company} onChange={e => handleChange('company', e.target.value)} />
                </div>
                <div className="popup-field">
                  <label>REASON <span>*</span></label>
                  <select value={form.reason} onChange={e => handleChange('reason', e.target.value)} required>
                    <option value="" disabled>Select a reason</option>
                    <option value="General inquiry">General inquiry</option>
                    <option value="Employer of Record services">Employer of Record services</option>
                    <option value="Payroll services">Payroll services</option>
                    <option value="Contractor management">Contractor management</option>
                    <option value="Immigration services">Immigration services</option>
                    <option value="Compliance questions">Compliance questions</option>
                    <option value="Partnership opportunities">Partnership opportunities</option>
                    <option value="Support request">Support request</option>
                    <option value="Careers">Careers</option>
                  </select>
                </div>
              </div>

              <div className="popup-field">
                <label>MESSAGE <span>*</span></label>
                <textarea rows={3} placeholder="Tell us about your needs..." value={form.message} onChange={e => handleChange('message', e.target.value)} required></textarea>
              </div>

              {status === 'error' && <p className="popup-error">{errorMessage}</p>}

              <div className="popup-actions">
                <button type="button" className="popup-btn-outline" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" className="popup-btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

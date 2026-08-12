'use client'
import { buildPageSchemaGraph, buildFaqSchema } from '@/lib/schema'
import { JsonLd } from '@/components/seo/JsonLd'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { SlideIn } from '@/components/animations/SlideIn'
import { submitContactForm } from '@/lib/contact'
import { hasSubmittedEmail, recordEmailSubmission } from '@/lib/formSubmission'
import { contactFormSchema } from '@/lib/validations/contactFormSchema'
import { CALENDLY_URL, CONTACT_INFO } from '@/lib/constants'
import contactData from '@/data/contact.json'
import ghgData from '@/data/global-hiring.json'

export default function ContactPage() {
  const availableCountries = useMemo(() => {
    return ghgData.countries.filter((c: any) => c.status === 'Available')
  }, [])

  const comingSoonCountries = useMemo(() => {
    return ghgData.countries.filter((c: any) => c.status === 'Coming soon')
  }, [])

  const [openFaq, setOpenFaq] = useState(0)
  function toggleFaq(i: number) {
    setOpenFaq(prev => prev === i ? -1 : i)
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: '',
    consent: false,
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'duplicate'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const r = searchParams.get('reason')
    const emailParam = searchParams.get('email')

    setForm(prev => {
      let updated = { ...prev }
      if (emailParam) {
        updated.email = emailParam
      }
      if (r) {
        const match = contactData.form.contactReasons.find((opt: any) => opt.value === r)
        if (match) {
          updated.reason = match.value
        }
      }
      return updated
    })
  }, [])

  const getFlag = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '🇳🇱', 'India': '🇮🇳', 'Poland': '🇵🇱', 'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪', 'Italy': '🇮🇹', 'Czech Republic': '🇨🇿', 'France': '🇫🇷',
      'Belgium': '🇧🇪', 'Spain': '🇪🇸', 'UAE': '🇦🇪', 'Hong Kong': '🇭🇰',
      'China': '🇨🇳', 'Portugal': '🇵🇹', 'Sweden': '🇸🇪', 'Hungary': '🇭🇺',
      'Romania': '🇷🇴', 'Singapore': '🇸🇬', 'United States': '🇺🇸',
      'New York': '🇺🇸', 'Australia': '🇦🇺'
    }
    return map[name] || '🌍'
  }

  const getCountryImage = (name: string) => {
    const map: Record<string, string> = {
      'The Netherlands': '/countries/eor-netherlands.webp',
      'India': '/countries/eor-india.webp',
      'Poland': '/countries/eor-poland.webp',
      'United Kingdom': '/countries/eor-uk.webp',
      'Germany': '/countries/eor-germany.webp',
      'Italy': '/countries/eor-Italy.webp',
      'Czech Republic': '/countries/eor-czech.webp',
      'France': '/countries/eor-france.webp',
      'Belgium': '/countries/eor-belgium.webp',
      'Spain': '/countries/eor-spain.webp',
      'UAE': '/countries/eor-uae.webp',
      'Hong Kong': '/countries/eor-hong-kong.webp',
      'Singapore': '/countries/eor-hong-kong.webp',
      'China': '/countries/eor-china.webp',
      'United States': '/countries/eor-spain.webp',
      'New York': '/countries/eor-spain.webp',
      'Portugal': '/countries/portugal.webp',
      'Sweden': '/countries/sweden.webp',
      'Hungary': '/countries/hungary.webp',
      'Romania': '/countries/romania.webp'
    }
    return map[name] || '/countries/eor-spain.webp'
  }

  const getPhone = (name: string) => {
    const map: Record<string, string> = {
      'United Kingdom': '+44 20 4572 2467',
      'Poland': '+48 22 208 27 00',
      'The Netherlands': '+31 20 808 2967',
      'Singapore': '+65 6950 2185',
      'United States': '+1 646 993 9004',
      'New York': '+1 646 993 9004'
    }
    return map[name] || ''
  }

  const handleFieldChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('idle')
    setErrorMessage('')
    setErrors({})

    const parsed = contactFormSchema.safeParse(form)

    if (!parsed.success) {
      setStatus('error')
      setShowValidation(true)

      const fieldErrors: Record<string, string> = {}
      parsed.error.issues.forEach(issue => {
        const path = issue.path[0] as string
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message
        }
      })
      setErrors(fieldErrors)

      // Focus the first invalid field
      const firstErrorField = parsed.error.issues[0]?.path[0] as string
      if (firstErrorField) {
        let inputElement: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null = null
        if (firstErrorField === 'firstName') {
          inputElement = document.querySelector('input[aria-label="First Name"]')
        } else if (firstErrorField === 'lastName') {
          inputElement = document.querySelector('input[aria-label="Last Name"]')
        } else if (firstErrorField === 'email') {
          inputElement = document.querySelector('input[aria-label="Work Email"]')
        } else if (firstErrorField === 'phone') {
          inputElement = document.querySelector('input[aria-label="Phone Number"]')
        } else if (firstErrorField === 'company') {
          inputElement = document.querySelector('input[aria-label="Company Name"]')
        } else if (firstErrorField === 'reason') {
          inputElement = document.querySelector('select[aria-label="What can we help you with?"]')
        } else if (firstErrorField === 'message') {
          inputElement = document.querySelector('textarea[aria-label="Your Message"]')
        } else if (firstErrorField === 'consent') {
          inputElement = document.querySelector('input[type="checkbox"]')
        }

        if (inputElement) {
          inputElement.focus()
        }
      }
      return
    }

    // Duplicate guard: same email already submitted from this browser in the
    // last 24h — skip the API call and show the "already received" screen.
    if (hasSubmittedEmail(form.email)) {
      setStatus('duplicate')
      setShowValidation(false)
      return
    }

    setStatus('sending')

    // Use the shared helper so the payload shape (snake_case) and error
    // handling match the contact modals (DelayedContactPopup/LeadModal).
    const result = await submitContactForm({
      first_name: form.firstName,
      last_name: form.lastName,
      work_email: form.email,
      phone_number: form.phone,
      company_name: form.company,
      help_reason: form.reason,
      message: form.message,
    })

    if (result.success) {
      recordEmailSubmission(form.email)
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        reason: '',
        message: '',
        consent: false,
      })
      setStatus('success')
      setShowValidation(false)
      setErrors({})
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'There was an issue sending your message. Please try again later.')
    }
  }

  const carouselTrack = useRef<HTMLDivElement>(null)

  function slide(direction: 'next' | 'prev') {
    if (!carouselTrack.current) return
    const card = carouselTrack.current.querySelector('.office-location-card') as HTMLElement
    if (!card) return
    const cardWidth = card.offsetWidth
    const gap = 24
    const scrollAmount = direction === 'next' ? (cardWidth + gap) : -(cardWidth + gap)
    carouselTrack.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  const comingSoonTrack = useRef<HTMLDivElement>(null)

  function slideComingSoon(direction: 'next' | 'prev') {
    if (!comingSoonTrack.current) return
    const card = comingSoonTrack.current.querySelector('.coming-soon-card') as HTMLElement
    if (!card) return
    const cardWidth = card.offsetWidth
    const gap = window.innerWidth >= 900 ? 20 : 16
    const scrollAmount = direction === 'next' ? (cardWidth + gap) : -(cardWidth + gap)
    comingSoonTrack.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <div className="contact-page-container">
      {/* Base (Organization + WebSite) + FAQ as one combined JSON-LD block */}
      <JsonLd
        data={buildPageSchemaGraph(
          contactData.faqs?.items?.length
            ? buildFaqSchema({ path: '/contact', faq: contactData.faqs.items })
            : []
        )}
      />
      <style>{`
.contact-page-container {
padding-top: 4rem;
  background-color: #f8fafc;
  font-family: var(--sans);
  color: var(--ink);
}

/* ============= HERO & FORM ============= */
.contact-hero-section {
  position: relative;
  left: 50%;
  right: 50%;
  margin-top: -80px;
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

.contact-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 280px;
  background-image: url('/case-study/contact-bg.webp');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 65%, transparent 100%);
  filter: invert(1) grayscale(1) brightness(1.5);
  mix-blend-mode: screen;
  opacity: 0.35;
  pointer-events: none;
  z-index: 1;
}

@media (min-width: 1024px) {
  .contact-hero-section {
    padding: 40px 20px 100px;
  }
  .contact-hero-section::before {
    display: none;
  }
}

.hero-bg-map {
  display: none;
}

@media (min-width: 1024px) {
  .hero-bg-map {
    display: block;
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 1100px;
    height: 100%;
    background-image: url('/case-study/contact-bg-removebg-preview.webp');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(1) grayscale(1) brightness(1.5);
    mix-blend-mode: screen;
    opacity: 0.35;
    pointer-events: none;
    z-index: 1;
  }
}

.hero-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
  padding: 1rem;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 80px;
  }
}

.hero-left-content {
  max-width: 640px;
}

@media (min-width: 1024px) {
  .hero-left-content {
    margin-top: -36px;
  }
}

.tag-eyebrow {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 16px;
  text-transform: uppercase;
}

.hero-left-content h1 {
  font-family: "IBM Plex Serif";
  font-size: clamp(38px, 4.8vw, 48px);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin-bottom: 24px;
  color: #ffffff;
}

.highlight-gold {
    color: #F7931E;
    font-style: italic;
  }

.hero-desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.contact-info-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 18px 24px;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;
}

.info-card:not(.no-hover):hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.3);
}


.info-card .icon-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: transparent;
  color: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background-color 0.2s;
}

.info-card:hover .icon-circle {
  border-color: #F7931E;
  background-color: rgba(247, 147, 30, 0.1);
}

.info-card .icon-circle svg {
  width: 18px;
  height: 18px;
}

.info-card-text {
  display: flex;
  flex-direction: column;
}

.info-card-text .label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 3px;
}

.info-card-text .value {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* Contact details cards (left column, on dark hero) */
.contact-details-block {
  margin-top: 28px;
  margin-bottom: 32px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  max-width: 640px;
}
.contact-details-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}
.contact-details-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 480px) {
  .contact-details-cards {
    grid-template-columns: 1fr 1fr;
  }
  .cd-card.cd-wide {
    grid-column: 1 / -1;
  }
}
.cd-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  text-decoration: none;
  color: inherit;
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
a.cd-card:hover {
  transform: translateY(-2px);
  border-color: #F7931E;
  background: rgba(247, 147, 30, 0.08);
}
.cd-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #F7931E;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background-color 0.2s;
}
a.cd-card:hover .cd-icon {
  border-color: #F7931E;
  background: rgba(247, 147, 30, 0.1);
}
.cd-icon svg { width: 18px; height: 18px; }
.cd-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.cd-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 4px;
}
.cd-value {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.5;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* Form block */
.hero-right-form {
  min-width: 0;
}

.floating-contact-form-card {
  background-color: #ffffffc9;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(20, 51, 105, 0.03);
}

@media (min-width: 768px) {
  .floating-contact-form-card {
    padding: 40px;
  }
}

.floating-contact-form-card h2 {
  font-family: var(--serif);
  font-size: 28px;
  
  color: var(--ink);
  margin-bottom: 28px;
  letter-spacing: -0.01em !important;
}

.form-grid-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 580px) {
  .form-grid-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-field {
  margin-bottom: 20px;
}

.form-field input,
.form-field select,
.form-field textarea {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: #ffffff85;
  font-family: var(--sans);
  font-size: 14px;
  color: var(--ink);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus,
.form-field input:focus-visible,
.form-field select:focus-visible,
.form-field textarea:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(20, 51, 105, 0.1);
  outline: none;
}

form.was-validated .form-field input:invalid,
form.was-validated .form-field select:invalid,
form.was-validated .form-field textarea:invalid {
  border-color: #b54234;
  background-color: #fffaf9;
}

form.was-validated .custom-checkbox input:invalid + .checkmark {
  border-color: #b54234;
}

.form-field textarea {
  resize: vertical;
}

/* Select custom dropdown arrow */
.select-field {
  position: relative;
}

.select-field select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 44px;
}

.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--ink-soft);
  display: flex;
  align-items: center;
}

.select-arrow svg {
  width: 16px;
  height: 16px;
}

/* Custom Checkbox */
.form-consent-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 28px;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.custom-checkbox input {
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.custom-checkbox input:checked + .checkmark {
  background-color: var(--accent);
  border-color: var(--accent);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked + .checkmark:after {
  display: block;
}

.consent-text {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.45;
}

.consent-text a {
  color: var(--accent);
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background-color: #143369;
  color: #ffffff;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 15px;
  transition: background-color 0.2s, transform 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0e254e;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.submit-btn .arrow {
  transition: transform 0.2s;
}

.submit-btn:hover .arrow {
  transform: translateX(4px);
}

.error-msg-banner {
  color: #b54234;
  font-size: 13px;
  margin-bottom: 16px;
  font-weight: 500;
}

.form-footer-lock {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 24px;
  color: var(--ink-muted);
}

.form-footer-lock svg {
  width: 14px;
  height: 14px;
}

.form-footer-lock span {
  font-size: 12px;
}

.form-success-card {
  text-align: center;
  padding: 48px 24px;
  animation: successFade 0.45s ease both;
}
@keyframes successFade {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.success-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #dcfce7;
  color: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 22px;
  box-shadow: 0 0 0 8px rgba(22, 163, 74, 0.08);
  animation: successPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes successPop {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
.success-icon-circle svg {
  width: 36px;
  height: 36px;
}

.form-success-card strong {
  display: block;
  font-family: var(--serif);
  font-size: 27px;
  color: var(--ink);
  margin-bottom: 10px;
}

.form-success-card p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  max-width: 360px;
  margin: 0 auto;
}
.form-success-card p a {
  color: var(--accent);
  text-decoration: underline;
  font-weight: 600;
}

.success-reset-btn {
  margin-top: 26px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--accent);
  border: 1.5px solid var(--border);
  padding: 11px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, transform 0.2s;
}
.success-reset-btn:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
  transform: translateY(-1px);
}

/* Consent validation feedback */
.form-consent-row.consent-invalid .checkmark {
  border-color: #b54234;
  background-color: #fff5f4;
  box-shadow: 0 0 0 3px rgba(181, 66, 52, 0.12);
}
.consent-error {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #b54234;
  font-size: 13px;
  font-weight: 600;
  margin: -14px 0 20px 30px;
}

/* ============= WHY JACKSON & FRANK ============= */
.why-us-section {
  padding: 40px 0;
  background-color: #f8fafc33;
  border-top: 1px solid var(--border);
}

.why-us-card-container {
  position: relative;
  background-color: #ffffff87;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.01);
}

@media (min-width: 768px) {
  .why-us-card-container {
    padding: 60px 48px;
  }
}

.why-us-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.grid-divider {
  display: none;
}

@media (min-width: 1024px) {
  .why-us-grid {
    grid-template-columns: 1.25fr 0.95fr 0.95fr 0.95fr;
    row-gap: 48px;
    column-gap: 0;
  }

  .why-us-left-col {
    grid-column: 1;
    grid-row: 1 / 3;
    padding-right: 48px;
  }

  .feature-item.col-2 {
    grid-column: 2;
    padding-left: 48px;
    padding-right: 24px;
  }

  .feature-item.col-3 {
    grid-column: 3;
    padding-left: 48px;
    padding-right: 24px;
  }

  .feature-item.col-4 {
    grid-column: 4;
    padding-left: 48px;
  }

  .grid-divider {
    display: block;
    position: absolute;
    top: 60px;
    bottom: 60px;
    width: 1px;
    background-color: var(--border);
  }

  .divider-1 {
    left: calc(48px + (100% - 96px) * 0.3048);
  }

  .divider-2 {
    left: calc(48px + (100% - 96px) * 0.5365);
  }

  .divider-3 {
    left: calc(48px + (100% - 96px) * 0.7682);
  }
}

/* The col-2..col-4 and row-1/row-2 classes on the feature items are also
   Tailwind utilities (col-4 gives grid-column:4, row-1 gives grid-row:1), so
   they apply at EVERY width, not just inside the min-width:1024px block above.
   Below 1024px that pinned all six cards into two grid rows: three cards
   stacked invisibly in each cell, and the heading pushed down to row 3.
   Reset the placement so the items flow in DOM order. */
@media (max-width: 1023px) {
  .why-us-grid > .feature-item {
    grid-column: auto !important;
    grid-row: auto !important;
  }
}

.why-us-left-col h2 {
  font-family: var(--serif);
  font-size: clamp(28px, 3.2vw, 36px);
  line-height: 1.15;
  
  margin-bottom: 20px;
  letter-spacing: -0.015em;
  color: var(--ink);
}

.why-us-left-col p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 32px;
}

.learn-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 14px;
  color: var(--accent);
  transition: all 0.2s;
}

.learn-more-btn:hover {
  background-color: var(--accent-soft);
  border-color: var(--accent);
}

.learn-more-btn .arrow {
  transition: transform 0.2s;
}

.learn-more-btn:hover .arrow {
  transform: translateX(4px);
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.feature-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(20, 51, 105, 0.2);
  background: radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 10px rgba(20, 51, 105, 0.05);
}

.feature-icon-wrap svg {
  width: 22px;
  height: 22px;
}

.feature-item h5 {
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 8px;
}

.feature-item p {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-soft);
  margin: 0;
}

/* ============= OUR OFFICES ============= */
.offices-section {
  padding: 40px 0;
  background-color: #ffffff;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

@media (min-width: 768px) {
  .offices-section {
    padding: 40px 0;
  }
}

.offices-header-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .offices-header-row {
    flex-direction: row;
    align-items: flex-end;
  }
}

.carousel-arrow-btn {
  display: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background-color: #ffffff;
  color: var(--ink);
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

@media (min-width: 1024px) {
  .carousel-arrow-btn {
    display: flex;
  }
}

.carousel-arrow-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
  background-color: var(--accent-soft);
  box-shadow: 0 6px 16px rgba(20, 51, 105, 0.15);
}

.prev-btn {
  left: -24px;
}

.next-btn {
  right: -24px;
}

@media (max-width: 1280px) and (min-width: 1024px) {
  .prev-btn {
    left: 0;
  }
  .next-btn {
    right: 0;
  }
}

.carousel-arrow-btn svg {
  width: 18px;
  height: 18px;
}

.view-locations-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border: 1px solid var(--border);
  background-color: #ffffff;
  border-radius: 999px;
  font-family: var(--sans);
  font-weight: 500;
  font-size: 14px;
  color: var(--ink);
  transition: all 0.2s;
  cursor: pointer;
  margin-left: 8px;
}

.view-locations-btn:hover {
  background-color: var(--ink);
  color: #ffffff;
  border-color: var(--ink);
}

.view-locations-btn .arrow {
  transition: transform 0.2s;
}

.view-locations-btn:hover .arrow {
  transform: translateX(4px);
}

.carousel-track-wrapper {
  width: 100%;
  overflow: visible;
  position: relative;
}

.offices-carousel-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 10px 4px 20px;
  margin: -10px -4px -20px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.offices-carousel-track::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.offices-carousel-track {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.office-location-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

@media (min-width: 768px) {
  .office-location-card {
    flex: 0 0 300px;
  }
}

@media (min-width: 1024px) {
  .office-location-card {
    flex: 0 0 310px;
  }
}

@media (min-width: 1200px) {
  .office-location-card {
    flex: 0 0 330px;
  }
}

.office-location-card {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.01);
  transition: transform 0.25s, box-shadow 0.25s;
}

.office-location-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(20, 51, 105, 0.05);
}

.office-img-wrap {
  position: relative;
  overflow: hidden;
  height: 140px;
}

.office-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.office-location-card:hover .office-img {
  transform: scale(1.05);
}

.card-inner-body {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.country-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.country-row .flag {
  font-size: 16px;
}

.country-row .country-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
}

.badge-hq {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  background-color: var(--accent-soft);
  color: var(--accent);
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  margin-left: auto;
}

.office-location-card .address {
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--ink-soft);
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
}

.office-location-card .phone-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.office-location-card .phone-link:hover {
  text-decoration: underline;
}

.loc-icon {
  width: 14px;
  height: 14px;
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

/* ============= MAP OVERLAY STRIP ============= */
.map-overlay-section {
  background-color: #f8fafc;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

@media (min-width: 900px) {
  .map-overlay-section {
    padding: 40px 0;
  }
}

.map-strip-container {
  position: relative;
  width: 100%;
}

.dotted-map-backdrop {
  height: 220px;
  border-radius: 16px;
  background-color: #f6f8fc;
  background-image: url('/case-study/contact-bg.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  border: 1px solid #0e0f3b29;
}

@media (min-width: 900px) {
  .dotted-map-backdrop {
    height: 400px;
    background-position: left 50px center;
  }
}

/* World pins overlay styling */
.map-pin {
  display: none;
}

@media (min-width: 900px) {
  .map-pin {
    display: block;
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: var(--accent);
    border: 2px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(20, 51, 105, 0.8);
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(20, 51, 105, 0.7); }
  70% { box-shadow: 0 0 0 8px rgba(20, 51, 105, 0); }
  100% { box-shadow: 0 0 0 0 rgba(20, 51, 105, 0); }
}

.stats-overlay-card {
  background-color: #ffffff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 15px 40px rgba(20, 51, 105, 0.04);
  text-align: center;
  width: 100%;
  max-width: 320px;
  margin: 32px auto 0;
}

@media (min-width: 900px) {
  .stats-overlay-card {
    position: absolute;
    right: 140px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    padding: 40px;
  }
}

.operating-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}

.countries-count {
  font-family: var(--serif);
  font-size: clamp(43px, 4vw, 72px);
  line-height: 1;
  font-weight: 400;
  color: var(--accent);
  margin: 12px 0;
}

.countries-label {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink);
  display: block;
  margin-bottom: 16px;
}

.stats-overlay-card .desc {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin: 0;
}

/* Tablet specific styles (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .hero-left-content {
    margin: 0 auto;
    text-align: center;
    max-width: 580px;
  }
  .contact-info-cards {
    align-items: center;
  }
  .info-card {
    width: 100%;
    max-width: 480px;
  }
  .floating-contact-form-card {
    max-width: 580px;
    margin: 0 auto;
  }
  .why-us-grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px 40px;
  }
  .why-us-left-col {
    grid-column: 1 / -1;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 16px;
  }
}

/* Mobile specific styles (up to 767px) */
@media (max-width: 767px) {
  .hero-left-content {
    margin: 0 auto;
  }
  .contact-info-cards {
    align-items: center;
  }
  .info-card {
    width: 100%;
  }
  .why-us-card-container {
    padding: 24px 16px;
  }
  .why-us-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .why-us-left-col {
    grid-column: 1 / -1;
    text-align: left;
    margin-bottom: 8px;
  }
  .why-us-left-col h2 {
    font-size: 28px;
  }
  /* Left-aligned to share one alignment axis with the heading block above,
     instead of centred text sitting under left-aligned copy. */
  .feature-item {
    grid-column: 1 / -1 !important;
    align-items: flex-start;
    text-align: left;
    padding: 16px;
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  .feature-item h5 {
    font-size: 13px;
  }
  .feature-item p {
    font-size: 11.5px;
  }
}

/* COMING SOON SECTION */
.coming-soon-section {
  padding: 40px 20px;
  background-color: #ffffff;
}
.coming-soon-title {
  color: #0E0F3B;
  font-size: clamp(22px, 4vw, 32px);
  font-weight: 700;
  margin-bottom: 24px;
}
.coming-soon-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding-bottom: 16px;
  scrollbar-width: none;
}
.coming-soon-grid::-webkit-scrollbar {
  display: none;
}
@media (min-width: 580px) {
  .coming-soon-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: visible;
    padding-bottom: 0;
  }
}
@media (min-width: 900px) {
  .coming-soon-grid {
    grid-template-columns: repeat(6, minmax(260px, 1fr));
    gap: 20px;
  }
}
.coming-soon-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  color: #fff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 240px;
  flex: 0 0 85%;
  max-width: 85%;
  scroll-snap-align: start;
}
@media (min-width: 580px) {
  .coming-soon-card {
    flex: auto;
    scroll-snap-align: none;
    max-width: none;
  }
}
.cs-arrow-btn {
  display: none !important;
}
.cs-bg-image {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  transition: transform 0.4s ease;
}
.cs-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(71, 85, 105, 0.95), rgba(51, 65, 85, 0.98));
  z-index: 1;
  transition: background 0.4s ease, opacity 0.4s ease;
}
.coming-soon-card:hover .cs-bg-image {
  transform: scale(1.05);
}
.coming-soon-card:hover .cs-overlay {
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.8));
}
.cs-card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.cs-country-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.cs-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 8px;
}
.cs-icon-wrap svg {
  width: 16px;
  height: 16px;
}
.cs-country-name {
  font-size: 20px;
  font-weight: 600;
}
.cs-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  line-height: 1.5;
  flex-grow: 1;
}
.cs-contact-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
}
.cs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.2);
  font-weight: 600;
  font-size: 14px;
  z-index: 3;
  white-space: nowrap;
  backdrop-filter: blur(4px);
  opacity: 1;
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none;
}
.coming-soon-card:hover .cs-badge {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.learn-more-link {
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  width: 100%;
}
.learn-more-link span {
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
}

/* ============= FAQ ============= */
.faq-section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}
@media (max-width: 900px) {
  .faq-block {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.faq-head .section-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 48px);
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.1;
}
.faq-head .section-lead {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid var(--border);
  display: block;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
}
}



/* ============= FAQ ============= */
.faq-section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.faq-block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 24px;
}
@media (max-width: 900px) {
  .faq-block {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
.faq-head .section-title {
  font-family: var(--serif);
  font-size: clamp(22px, 4vw, 48px);
  color: var(--ink);
  margin-bottom: 16px;
  line-height: 1.1;
}
.faq-head .section-lead {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.5;
}
.faq-list {
  display: flex;
  flex-direction: column;
}
.faq-item {
  text-align: left;
  background: transparent;
  border: none;
  border-top: 1px solid var(--border);
  display: block;
  cursor: pointer;
  font-family: inherit;
  width: 100%;
  padding: 20px 0;
}

.faq-q-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}
.faq-toggle-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-muted);
  flex-shrink: 0;
  margin-left: auto;
  transition: color 0.3s, border-color 0.3s;
}

.faq-item.open .faq-toggle-circle {
  color: var(--accent);
  border-color: var(--accent);
}

.faq-q {
  font-family: var(--sans);
    font-size: 19px;
    font-weight: 600;
    line-height: 1.3;
    color: var(--ink);
    transition: color 0.2s, transform 0.2s;
}
.faq-item:hover .faq-q {
  color: var(--accent);
  transform: translateX(6px);
}
.faq-item.open .faq-q {
  color: var(--accent);
}

.faq-item.open 
.faq-a {
  margin-top: 14px;
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.65;
}

/* ============= WHAT HAPPENS NEXT ============= */
.what-happens-section {
  background-color: #f8fafc;
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
  padding: 100px 20px;
  color: var(--ink);
  text-align: center;
  position: relative;
}

.what-happens-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.what-happens-header {
  margin-bottom: 60px;
}

.what-happens-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #F7931E;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.what-happens-eyebrow::before,
.what-happens-eyebrow::after {
  content: '';
  width: 24px;
  height: 1px;
  background-color: #F7931E;
}

.what-happens-title {
  font-family: var(--serif);
  font-size: clamp(32px, 4vw, 48px);
  color: #0E0F3B;
  margin-bottom: 16px;
  font-weight: 400;
}

.what-happens-subtitle {
  font-size: 16px;
  color: var(--ink-soft);
  max-width: 600px;
  margin: 0 auto 24px;
}

.expert-content-inner {
  max-width: 640px;
}

.hero-left-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #F7931E;
  margin-bottom: 8px;
}
.hero-left-eyebrow::before {
  content: '';
  width: 28px;
  height: 1px;
  background: #F7931E;
}

.expert-content-inner h1 .highlight-gold {
  color: #F7931E;
  font-style: italic;
}

.expert-content-inner p {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 24px;
  font-weight: 400;
  max-width: 580px;
}

.expert-steps-block {
  margin-top: 24px;
  max-width: 640px;
}

.expert-steps-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 18px;
}

/* Steps in a horizontal flow */
.expert-list {
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: expert-counter;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  max-width: 640px;
}

@media (min-width: 520px) {
  .expert-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
  }
}

@media (min-width: 1024px) {
  .expert-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

.expert-list li {
  position: relative;
  padding-left: 0;
  padding-top: 46px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12.5px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}

/* Numbered badge */
.expert-list li::before {
  counter-increment: expert-counter;
  content: counter(expert-counter);
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(247, 147, 30, 0.12);
  border: 1px solid rgba(247, 147, 30, 0.45);
  color: #F7931E;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  line-height: 30px;
}

/* Horizontal connecting line between step badges on desktop */
.expert-list li::after {
  content: '';
  position: absolute;
  left: 38px;
  top: 16px;
  right: -8px;
  height: 1px;
  background: linear-gradient(to right, rgba(247, 147, 30, 0.45), rgba(247, 147, 30, 0.08));
}
.expert-list li:last-child::after {
  display: none;
}

@media (max-width: 1023px) {
  .expert-list li::after {
    display: none;
  }
}

/* Mobile: vertical stepper. The badge moves to the left of the copy and the
   ::after pseudo-element is reused as the vertical rail joining the badges,
   so the four steps read as one connected flow instead of four loose blocks. */
@media (max-width: 519px) {
  .expert-list {
    gap: 0;
  }
  .expert-list li {
    padding-top: 0;
    padding-left: 46px;
    padding-bottom: 22px;
    min-height: 32px;
  }
  .expert-list li:last-child {
    padding-bottom: 0;
  }
  .expert-list li::after {
    display: block;
    left: 15px;
    right: auto;
    top: 36px;
    bottom: -4px;
    width: 1px;
    height: auto;
    background: linear-gradient(to bottom, rgba(247, 147, 30, 0.45), rgba(247, 147, 30, 0.12));
  }
  .expert-list li:last-child::after {
    display: none;
  }
}

.expert-list li strong {
  display: block;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 4px;
  letter-spacing: -0.01em;
}

.gartner-review {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 48px;
}

.gartner-logo {
  color: #ffffff;
  line-height: 1.1;
}

.gartner-logo strong {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.gartner-rating {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rating-text {
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.stars {
  display: flex;
  gap: 4px;
}

.star-icon {
  width: 16px;
  height: 16px;
}

.process-card-divider {
  width: 24px;
  height: 2px;
  margin-bottom: 24px;
}
.bg-blue { background-color: #143369; }
.bg-gold { background-color: #F7931E; }

.process-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0E0F3B;
  margin-bottom: 12px;
}

.process-card p {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0;
}

.process-arrow {
  display: none;
  position: absolute;
  top: 50%;
  right: -24px;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 50%;
  border: 1px solid var(--border);
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  align-items: center;
  justify-content: center;
  color: var(--ink-muted);
  z-index: 10;
}
@media (min-width: 1024px) {
  .process-arrow {
    display: flex;
  }
}
.process-arrow svg {
  width: 16px;
  height: 16px;
}

.process-cta-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.process-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background-color: #0E0F3B;
  color: #ffffff;
  padding: 16px 32px;
  border-radius: 8px;
  font-family: var(--sans);
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, background-color 0.2s;
}
.process-btn:hover {
  background-color: #143369;
  transform: translateY(-2px);
}
.process-btn .calendar-icon {
  color: #F7931E;
}
.process-btn .arrow-icon {
  color: #F7931E;
  transition: transform 0.2s;
}
.process-btn:hover .arrow-icon {
  transform: translateX(4px);
}

.process-secure {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--ink-soft);
}
.process-secure svg {
  width: 16px;
  height: 16px;
}
`}</style>

      {/* ============= HERO & FORM SECTION ============= */}
      <section className="contact-hero-section">
        <div className="container hero-grid">
          {/* Left Content */}
          <SlideIn direction="fade-right" delay={0.1} className="hero-left-content">
            <div className="expert-content-inner">
              <h1>Let&apos;s build your<br />global success <span className="highlight-gold">together.</span></h1>
              <p>A simple, transparent process to help you hire globally with confidence.</p>

              <div className="contact-details-block">
                <div className="contact-details-title">Prefer to reach us directly?</div>
                <div className="contact-details-cards">
                  <a
                    className="cd-card cd-wide"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="cd-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </span>
                    <span className="cd-text">
                      <span className="cd-label">Office</span>
                      <span className="cd-value">{CONTACT_INFO.address.replace('Jackson & Frank, ', '')}</span>
                    </span>
                  </a>
                  <a className="cd-card" href={`mailto:${CONTACT_INFO.email}`}>
                    <span className="cd-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </span>
                    <span className="cd-text">
                      <span className="cd-label">Email</span>
                      <span className="cd-value">{CONTACT_INFO.email}</span>
                    </span>
                  </a>
                  <a className="cd-card" href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}>
                    <span className="cd-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </span>
                    <span className="cd-text">
                      <span className="cd-label">Phone</span>
                      <span className="cd-value">{CONTACT_INFO.phone}</span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="expert-steps-block">
                <div className="expert-steps-title">How it works</div>
                <ol className="expert-list">
                  <li><strong>Submit your inquiry</strong> Fill out the form with your details and tell us about your hiring needs.</li>
                  <li><strong>We reach out</strong> Our team contacts you via email or phone within 24 hours.</li>
                  <li><strong>Consultation call</strong> We schedule a call to understand your needs and recommend the right solution.</li>
                  <li><strong>Get started</strong> Once everything is aligned, we handle the setup and you begin your global expansion journey.</li>
                </ol>
              </div>
            </div>
          </SlideIn>

          {/* Right Floating Form */}
          <SlideIn direction="fade-left" delay={0.2} className="hero-right-form">
            <div className="floating-contact-form-card">
              <form onSubmit={handleSubmit} noValidate className={showValidation ? 'was-validated' : ''}>
                <h2>Send us a message</h2>

                {status === 'success' || status === 'duplicate' ? (
                  <div className="form-success-card">
                    <div className="success-icon-circle" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </div>
                    <strong>{status === 'duplicate' ? "We've already received your response" : 'Message sent!'}</strong>
                    {status === 'duplicate' ? (
                      <p>
                        We&apos;ve received your inquiry and our team will be in touch. Need to talk sooner?{' '}
                        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">Book a call</a>{' '}
                        or email <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>.
                      </p>
                    ) : (
                      <>
                        <p>Thanks for reaching out — a specialist will get back to you within <b>24 hours</b>. Please keep an eye on your inbox (and spam, just in case).</p>
                        <button
                          type="button"
                          className="success-reset-btn"
                          onClick={() => { setStatus('idle'); setShowValidation(false); setErrorMessage('') }}
                        >
                          Send another message
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="form-grid-row">
                      <div className="form-field">
                        <input value={form.firstName} onChange={e => handleFieldChange('firstName', e.target.value)} type="text" placeholder="First name" required aria-label="First Name" />
                        {errors.firstName && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.firstName}</span>}
                      </div>
                      <div className="form-field">
                        <input value={form.lastName} onChange={e => handleFieldChange('lastName', e.target.value)} type="text" placeholder="Last name" required aria-label="Last Name" />
                        {errors.lastName && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.lastName}</span>}
                      </div>
                    </div>

                    <div className="form-field">
                      <input value={form.email} onChange={e => handleFieldChange('email', e.target.value)} type="email" placeholder="Work email" required aria-label="Work Email" />
                      {errors.email && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
                    </div>

                    <div className="form-grid-row">
                      <div className="form-field">
                        <input value={form.phone} onChange={e => handleFieldChange('phone', e.target.value)} type="tel" placeholder="Phone number" aria-label="Phone Number" />
                        {errors.phone && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                      </div>
                      <div className="form-field">
                        <input value={form.company} onChange={e => handleFieldChange('company', e.target.value)} type="text" placeholder="Company name" aria-label="Company Name" />
                        {errors.company && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.company}</span>}
                      </div>
                    </div>

                    <div className="form-field select-field">
                      <select value={form.reason} onChange={e => handleFieldChange('reason', e.target.value)} required aria-label="What can we help you with?">
                        <option value="" disabled>How can we help you?</option>
                        {contactData.form.contactReasons.map((r: any) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                      <div className="select-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                      {errors.reason && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.reason}</span>}
                    </div>

                    <div className="form-field">
                      <textarea value={form.message} onChange={e => handleFieldChange('message', e.target.value)} placeholder="Your message" rows={4} required aria-label="Your Message"></textarea>
                      {errors.message && <span className="field-error-text" style={{ color: '#b54234', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                    </div>

                    <div className={`form-consent-row${showValidation && !form.consent ? ' consent-invalid' : ''}`}>
                      <label className="custom-checkbox">
                        <input checked={form.consent} onChange={e => handleFieldChange('consent', e.target.checked)} type="checkbox" required />
                        <span className="checkmark"></span>
                      </label>
                      <span className="consent-text">
                        I agree to receive communications from Jackson &amp; Frank. View our <Link href="/privacy-policy">Privacy policy</Link>.
                      </span>
                    </div>

                    {(errors.consent || (showValidation && !form.consent)) && (
                      <p className="consent-error">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        {errors.consent || 'Please tick the box above to agree before sending.'}
                      </p>
                    )}

                    {status === 'error' && errorMessage && <p className="error-msg-banner">{errorMessage}</p>}

                    <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                      {status === 'sending' && <span className="spinner"></span>}
                      <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>

                    </button>

                    <div className="form-footer-lock">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      <span>Your information is secure and confidential.</span>
                    </div>
                  </>
                )}
              </form>
            </div>
          </SlideIn>
        </div>
      </section>



      {/* ============= WHY GET IN TOUCH ============= */}
      <div className="home-content-scale">
        <section className="why-us-section">
          <div className="container">
            <div className="why-us-card-container">
              <SlideIn direction="fade-up" delay={0.2} className="why-us-grid">
                <div className="why-us-left-col">
                  <span className="tag-eyebrow">WHY GET IN TOUCH WITH JACKSON &amp; FRANK</span>
                  <h2>Your trusted partner<br />for <span className="highlight-gold">global expansion</span></h2>
                  <p>We combine local expertise with global experience to make your expansion simple, compliant, and successful.</p>
                  <Link href="/about-us" className="learn-more-btn">
                    Learn more about us
                  </Link>
                </div>

                <div className="feature-item col-2 row-1">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                  </div>
                  <h5>Local Expertise, Global Reach</h5>
                  <p>Our teams in 17+ countries understand local markets, laws, and business culture.</p>
                </div>

                <div className="feature-item col-3 row-1">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 11 2 2 4-4"></path></svg>
                  </div>
                  <h5>Compliance You Can Trust</h5>
                  <p>Stay compliant with local laws, tax regulations, and labor requirements.</p>
                </div>

                <div className="feature-item col-4 row-1">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                  </div>
                  <h5>Fast &amp; Efficient</h5>
                  <p>Most first hires go live within 48–72 hours.</p>
                </div>

                <div className="feature-item col-2 row-2">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h5>End-to-End Support</h5>
                  <p>From entity setup to payroll and HR, we handle it all.</p>
                </div>

                <div className="feature-item col-3 row-2">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                  </div>
                  <h5>Cost Effective</h5>
                  <p>Save time and costs with our streamlined solutions.</p>
                </div>

                <div className="feature-item col-4 row-2">
                  <div className="feature-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                  </div>
                  <h5>Human Support</h5>
                  <p>Real people, real support, whenever you need us.</p>
                </div>
              </SlideIn>

              <div className="grid-divider divider-1"></div>
              <div className="grid-divider divider-2"></div>
              <div className="grid-divider divider-3"></div>
            </div>
          </div>
        </section>
      </div>

      {/* ============= OUR OFFICES ============= */}
      <div className="home-content-scale">
        <section className="offices-section">
          <div className="container">
            <SlideIn direction="fade-up" className="offices-header-row">
              <div>
                <span className="tag-eyebrow">OUR OFFICES</span>
                <h2>A global presence, <span className="highlight-gold">wherever you grow.</span></h2>
              </div>
            </SlideIn>

            <SlideIn direction="fade-up" delay={0.1} className="carousel-track-wrapper">
              <button onClick={() => slide('prev')} className="carousel-arrow-btn prev-btn" aria-label="Previous Location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>

              <div ref={carouselTrack} className="offices-carousel-track">
                {availableCountries.map((country: any, idx: number) => (
                  <div key={idx} className="office-location-card">
                    <div className="office-img-wrap">
                      <img src={getCountryImage(country.name)} alt={country.name} className="office-img" />
                    </div>
                    <div className="card-inner-body">
                      <div className="country-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="flag" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', border: '1.5px solid #E2E8F0', borderRadius: '50%', fontSize: '13px', fontWeight: 600, background: '#fff', color: '#0E0F3B' }}>
                          {getFlag(country.name)}
                        </span>
                        <span className="country-name">{country.name}</span>
                        {country.name === 'The Netherlands' && <span className="badge-hq">Head Office</span>}
                      </div>
                      <p className="address">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loc-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {country.address}
                      </p>
                      {country.href && (
                        <Link href={country.href} className="learn-more-link">
                          Learn more about {country.name} <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => slide('next')} className="carousel-arrow-btn next-btn" aria-label="Next Location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </SlideIn>
          </div>
        </section>
      </div>

      {/* ============= COMING SOON OFFICES ============= */}
      {comingSoonCountries.length > 0 && (
        <div className="home-content-scale">
          <section className="coming-soon-section">
            <div className="container">
              <SlideIn direction="fade-up" delay={0.1}>
                <h2 className="coming-soon-title">Coming soon</h2>
                <div className="carousel-track-wrapper">
                  <button onClick={() => slideComingSoon('prev')} className="carousel-arrow-btn prev-btn cs-arrow-btn" aria-label="Previous">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <div className="coming-soon-grid" ref={comingSoonTrack}>
                    {comingSoonCountries.map((country: any, idx: number) => (
                      <div key={idx} className="coming-soon-card">
                        <div className="cs-bg-image" style={{ backgroundImage: `url(${getCountryImage(country.name)})` }}></div>
                        <div className="cs-overlay"></div>
                        <div className="cs-card-content">
                          <div className="cs-country-header">
                            <span className="cs-icon-wrap">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            <span className="cs-country-name">{country.name}</span>
                          </div>
                          <p className="cs-desc">Full country guide and local EOR details:<br />Launching soon. Contact us to plan ahead.</p>
                          <Link href="/#contact" className="cs-contact-link">
                            Contact us to plan ahead <span>→</span>
                          </Link>
                        </div>
                        <div className="cs-badge">Coming soon</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => slideComingSoon('next')} className="carousel-arrow-btn next-btn cs-arrow-btn" aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </SlideIn>
            </div>
          </section>
        </div>
      )}

      {/* ============= MAP OVERLAY STRIP ============= */}
      <div className="home-content-scale">
        <section className="map-overlay-section">
          <SlideIn direction="fade-up" className="container">
            <div className="map-strip-container">
              <div className="dotted-map-backdrop">
                <div className="map-pin pin-us" style={{ top: '35%', left: '22%' }}></div>
                <div className="map-pin pin-uk" style={{ top: '25%', left: '46%' }}></div>
                <div className="map-pin pin-nl" style={{ top: '24%', left: '49%' }}></div>
                <div className="map-pin pin-pl" style={{ top: '26%', left: '53%' }}></div>
                <div className="map-pin pin-in" style={{ top: '52%', left: '68%' }}></div>
                <div className="map-pin pin-sg" style={{ top: '66%', left: '74%' }}></div>
              </div>

              <div className="stats-overlay-card">
                <span className="operating-label">Operating in</span>
                <div className="countries-count">17+</div>
                <span className="countries-label">countries</span>
                <p className="desc">Supporting companies worldwide with local expertise.</p>
              </div>
            </div>
          </SlideIn>
        </section>
      </div>

      {/* ============= FAQ ============= */}
      <div className="home-content-scale">
        <section className="section container faq-section">
          <div className="faq-block">
            <SlideIn direction="fade-up" className="faq-head">
              <h2 className="section-title">{contactData.faqs.title}</h2>
              <p className="section-lead">{contactData.faqs.subtitle}</p>
            </SlideIn>
            <div className="faq-list">
              {contactData.faqs.items.map((item: any, i: number) => (
                <SlideIn key={i} direction="fade-left" delay={0.1 * i}>
                  <button
                    className={`faq-item ${openFaq === i ? 'open' : ''}`}
                    onClick={() => toggleFaq(i)}
                    aria-expanded={openFaq === i}
                  >
                    <div className="faq-q-row">
                      <span className="faq-q">{item.question}</span>
                      <span className="faq-toggle-circle" aria-hidden="true" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                    </div>
                    {openFaq === i && <p className="faq-a">{item.answer}</p>}
                  </button>
                </SlideIn>
              ))}
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

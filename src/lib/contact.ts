// Contact form submission - posts to the live jacksonandfrank.com CMS API.
// Mirrors the payload shape used by jf_website_2.0 (snake_case fields).

const API_BASE =
  (process.env.NEXT_PUBLIC_API_BASE_URL as string | undefined) ?? '/api/v1'

export interface ContactFormValues {
  first_name: string
  last_name: string
  work_email: string
  phone_number: string
  company_name: string
  help_reason: string
  message: string
}

export interface ContactSubmitResult {
  success: boolean
  error?: string
}

export interface LeadSource {
  /** Source type shown before the title, e.g. "Blog post" or "Case study". */
  label?: string
  title?: string
  /** Path the lead came from, e.g. "/blog/some-slug". */
  url?: string
  categories?: string
}

/**
 * Appends an internal lead-source block to a message body so the team can see
 * which page produced the lead. Format mirrors jf_website_2.0's contact modal
 * so anyone already reading these submissions sees the same shape.
 * Returns the message unchanged when there's no source to report.
 */
export function appendLeadContext(message: string, source: LeadSource): string {
  const { label = 'Blog post', title, url, categories } = source
  if (!title && !url) return message

  const lines = ['--- Lead Source (internal) ---']
  if (title) lines.push(`${label}: ${title}`)
  if (url) lines.push(`URL: ${url}`)
  if (categories) lines.push(`Categories: ${categories}`)

  return message ? `${message}\n\n${lines.join('\n')}` : lines.join('\n')
}

/**
 * Normalise a phone number to the shape the backend accepts:
 *   /^[+]?[1-9]\d{0,15}$/  (optional +, no leading 0, digits only).
 * Strips spaces/dashes/parentheses and any leading zeros (national trunk
 * prefix), so "0930 910 9229" or "(030) 123-4567" pass. Empty stays empty.
 */
function normalizePhone(raw: string): string {
  if (!raw) return ''
  const hasPlus = raw.trim().startsWith('+')
  const digits = raw.replace(/\D/g, '').replace(/^0+/, '')
  if (!digits) return ''
  return hasPlus ? `+${digits}` : digits
}

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactSubmitResult> {
  const payload = { ...values, phone_number: normalizePhone(values.phone_number) }
  try {
    const res = await fetch(`${API_BASE}/contact-us`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      // Surface the backend's validation message (e.g. a bad phone/email)
      // instead of a generic "Request failed".
      let error = `Request failed (${res.status}). Please try again.`
      try {
        const data = await res.json()
        error = data?.details?.[0]?.message || data?.message || error
      } catch {
        /* non-JSON error body — keep the generic message */
      }
      return { success: false, error }
    }
    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Could not reach the server. Check your connection and try again.',
    }
  }
}

// Newsletter subscribe - used by the Footer newsletter form.
export async function subscribeNewsletter(email: string): Promise<ContactSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) return { success: false, error: `Request failed (${res.status}).` }
    return { success: true }
  } catch {
    return { success: false, error: 'Could not reach the server. Try again.' }
  }
}

// Newsletter unsubscribe - used by /unsubscribe page.
export async function unsubscribeNewsletter(email: string): Promise<ContactSubmitResult> {
  try {
    const res = await fetch(`${API_BASE}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) return { success: false, error: `Request failed (${res.status}).` }
    return { success: true }
  } catch {
    return { success: false, error: 'Could not reach the server. Try again.' }
  }
}

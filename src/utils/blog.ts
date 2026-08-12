// Blog content sanitizers - applied to CMS HTML at render time.
// Ports the same logic from jf_website_2.0/lib/utils/blog.utils.ts so legacy
// CMS posts render with correct alt text and up-to-date stats.

/**
 * Inject a fallback alt attribute into any <img> tag in HTML that doesn't have one.
 * Protects CMS-authored blog HTML from failing SEO/accessibility audits when
 * authors forget to fill in alt text.
 */
export function ensureImageAlt(html: string, fallbackAlt: string): string {
  const safeAlt = fallbackAlt.replace(/"/g, '&quot;')
  return html.replace(
    /<img\b(?![^>]*\salt=)([^>]*?)\/?>/gi,
    (_m, attrs) => `<img${attrs} alt="${safeAlt}">`
  )
}

// CMS authors typically wrap each number in <strong>…</strong>. The patterns
// below treat those tags as OPTIONAL so they match whether or not the post
// uses bold formatting. The replacement always emits <strong> for consistent
// visual styling across all blogs.
const S_OPEN = '(?:<strong\\b[^>]*>\\s*)?'
const S_CLOSE = '(?:\\s*</strong>)?'

const STAT_CORRECTIONS: ReadonlyArray<{ pattern: RegExp; replacement: string }> = [
  // Footer sentence variants - "300+ companies, and 1,000+ employees across 15+ countries"
  {
    pattern: new RegExp(
      `${S_OPEN}700\\s*\\+\\s*companies${S_CLOSE}\\s*,\\s*and\\s+${S_OPEN}1[,.]?000\\s*\\+\\s*employees${S_CLOSE}\\s+across\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}`,
      'gi'
    ),
    replacement:
      '<strong>700+ companies</strong>, and <strong>2,000+ employees</strong> across <strong>12+ countries</strong>',
  },
  {
    pattern: new RegExp(
      `${S_OPEN}700\\s*\\+\\s*companies${S_CLOSE}\\s*,\\s*and\\s+${S_OPEN}1[,.]?400\\s*\\+\\s*employees${S_CLOSE}\\s+across\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}`,
      'gi'
    ),
    replacement:
      '<strong>700+ companies</strong>, and <strong>2,000+ employees</strong> across <strong>12+ countries</strong>',
  },
  // "Employ talent in 15+ countries through our own offices"
  {
    pattern: new RegExp(
      `Employ\\s+talent\\s+in\\s+${S_OPEN}15\\s*\\+\\s*countries${S_CLOSE}\\s+through\\s+our\\s+own\\s+offices?`,
      'gi'
    ),
    replacement: 'Employ talent in <strong>12+ countries</strong> through our own offices',
  },
]

export function applyStatCorrections(html: string): string {
  if (!html) return html
  return STAT_CORRECTIONS.reduce(
    (out, { pattern, replacement }) => out.replace(pattern, replacement),
    html
  )
}

/**
 * Convert all <h1> tags in CMS HTML to <h2> so the page has a single H1
 * (rendered separately by the page header from blog.title).
 */
export function demoteBodyH1s(html: string): string {
  return html.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>')
}

/**
 * Ensures HTML injected into dangerouslySetInnerHTML does not contain invalid
 * HTML nesting (e.g. block-level elements like <div>, <table>, <ul>, <section> inside <p> tags).
 * Browsers automatically close <p> tags when encountering block elements,
 * which alters the DOM tree structure and causes React DOM reconciliation errors
 * ("Failed to execute 'insertBefore'/'removeChild' on 'Node'").
 */
export function fixInvalidHtmlNesting(html: string): string {
  if (!html) return ''

  let clean = html

  // 1. Unwrap <table> from <p>...</p> if present
  clean = clean.replace(/<p>\s*(<table[\s\S]*?<\/table>)\s*<\/p>/gi, '$1')

  // 2. Remove legacy blog-table-wrap class wrappers if they exist
  clean = clean.replace(/<div class="blog-table-wrap">\s*(<table\b[\s\S]*?<\/table>)\s*<\/div>/gi, '$1')
  clean = clean.replace(/<div class="blog-table-wrap">/gi, '')

  // 3. Wrap <table> with horizontal scroll container if not already wrapped in blog-table-scroll
  clean = clean.replace(/(<div class="blog-table-scroll(?:--wide)?">\s*)?<table\b([\s\S]*?)<\/table>(\s*<\/div>)?/gi, (match, opening, body, closing) => {
    if (opening && closing) {
      return match
    }
    return `<div class="blog-table-scroll"><table${body}</table></div>`
  })

  // 3. Remove <p> wrappers surrounding block elements (div, table, section, article, ul, ol, blockquote, figure, hr, pre, h1-h6)
  const blockPattern = /<p>\s*(<(?:div|table|section|article|aside|ul|ol|blockquote|figure|fieldset|footer|header|hr|pre|h[1-6])\b[^>]*>[\s\S]*?<\/(?:div|table|section|article|aside|ul|ol|blockquote|figure|fieldset|footer|header|pre|h[1-6])>|<hr\b[^>]*\/?>)\s*<\/p>/gi
  clean = clean.replace(blockPattern, '$1')

  // 4. Remove empty <p></p> tags resulting from cleanups
  clean = clean.replace(/<p>\s*<\/p>/gi, '')

  return clean
}

// HTML void elements never have a closing tag, so they never go on the stack.
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
])

/**
 * Balance unclosed / stray HTML tags so the string is well-formed.
 *
 * CMS-authored blog HTML frequently ships with unclosed <div> tags (and the
 * like). When the browser parses such HTML it auto-closes those elements at the
 * container boundary, which nests following siblings (the FAQ section, related
 * posts) *inside* the content div. React's server output is the raw string, so
 * the hydrated DOM no longer matches React's tree -> "Hydration failed ...",
 * the subtree is regenerated, and that regeneration is what triggers the
 * insertBefore/removeChild NotFoundError crashes.
 *
 * This walks the tags with a stack and approximates the browser's own
 * auto-closing: when a closing tag matches an element deeper in the stack, the
 * intervening unclosed elements are closed first; stray closing tags with no
 * matching open are dropped; anything still open at the end is closed in LIFO
 * order. The result parses to the same DOM on server and client, so hydration
 * matches. Runs in the same render pipeline (SSR + client), so it is
 * deterministic.
 */
export function balanceHtmlTags(html: string): string {
  if (!html) return ''

  const stack: string[] = []
  let out = ''
  // Match an opening/closing tag OR a run of text (incl. comments/CDATA as text).
  const tokenRe = /<!--[\s\S]*?-->|<\/([a-zA-Z][a-zA-Z0-9-]*)\s*>|<([a-zA-Z][a-zA-Z0-9-]*)\b([^>]*)>|[^<]+|</g

  let m: RegExpExecArray | null
  while ((m = tokenRe.exec(html)) !== null) {
    const token = m[0]
    if (token === '') continue

    // Closing tag
    if (m[1]) {
      const tag = m[1].toLowerCase()
      const idx = stack.lastIndexOf(tag)
      if (idx === -1) continue // stray close: browser ignores it
      // Close intervening unclosed elements, then the matched tag itself.
      for (let i = stack.length - 1; i >= idx; i--) {
        out += `</${stack[i]}>`
      }
      stack.length = idx
      continue
    }

    // Opening tag
    if (m[2]) {
      const tag = m[2].toLowerCase()
      const attrs = m[3] || ''
      const selfClosed = /\/\s*$/.test(attrs)
      out += token
      if (!selfClosed && !VOID_TAGS.has(tag)) stack.push(tag)
      continue
    }

    // Text, comment, or a lone '<'
    out += token
  }

  // Close anything left open (unclosed at end of fragment).
  for (let i = stack.length - 1; i >= 0; i--) {
    out += `</${stack[i]}>`
  }

  return out
}

/**
 * Format an ISO date string for blog display (e.g. "April 21, 2026").
 */
export function formatBlogDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Site-wide phrase → href map for inline interlinking (case studies, blog, etc.).
 * Longer phrases must appear before shorter ones so "Employer of Record" matches before "EOR".
 */
export const SITE_PHRASE_LINKS: { phrase: string; href: string }[] = [
  { phrase: "Employer of Record", href: "/employer-of-record" },
  { phrase: "global hiring", href: "/global-hiring-guide" },
  { phrase: "global payroll", href: "/payroll" },
  { phrase: "contractor management", href: "/contractor" },
  { phrase: "contact form", href: "/contact" },
  { phrase: "Contact us", href: "/contact" },
  { phrase: "contact us", href: "/contact" },
  { phrase: "United Kingdom", href: "/united-kingdom" },
  { phrase: "Hong Kong", href: "/hong-kong" },
  { phrase: "Czech Republic", href: "/czech-republic" },
  { phrase: "The Netherlands", href: "/netherlands" },
  { phrase: "Netherlands", href: "/netherlands" },
  { phrase: "Italy", href: "/italy" },
  { phrase: "Germany", href: "/germany" },
  { phrase: "France", href: "/france" },
  { phrase: "Spain", href: "/spain" },
  { phrase: "Poland", href: "/poland" },
  { phrase: "Belgium", href: "/belgium" },
  { phrase: "India", href: "/india" },
  { phrase: "UAE", href: "/uae" },
  { phrase: "China", href: "/china" },
  { phrase: "EOR", href: "/employer-of-record" },
  { phrase: "Payroll", href: "/payroll" },
  { phrase: "payroll", href: "/payroll" },
  { phrase: "Compliance", href: "/compliance" },
  { phrase: "compliance", href: "/compliance" },
  { phrase: "Immigration", href: "/immigration" },
  { phrase: "immigration", href: "/immigration" },
  { phrase: "case studies", href: "/case-studies" },
  { phrase: "case study", href: "/case-studies" },
  { phrase: "blog", href: "/blog" },
  { phrase: "Blog", href: "/blog" },
  { phrase: "About us", href: "/about-us" },
  { phrase: "about us", href: "/about-us" },
  { phrase: "Career", href: "/career" },
  { phrase: "career", href: "/career" },
  { phrase: "sitemap", href: "/sitemaps" },
  { phrase: "Sitemap", href: "/sitemaps" },
];

/** Tag or service keyword → { label, href } for Related reading blocks */
export const RELATED_LINK_MAP: Record<string, { label: string; href: string }> = {
  "EOR services": { label: "Employer of records", href: "/employer-of-record" },
  "EOR": { label: "Employer of records", href: "/employer-of-record" },
  "Payroll": { label: "Payroll", href: "/payroll" },
  "Compliance": { label: "Compliance", href: "/compliance" },
  "Immigration": { label: "Immigration", href: "/immigration" },
  "Contractor": { label: "Contractor management", href: "/contractor" },
};

export type LinkSegment = { type: "text"; value: string } | { type: "link"; href: string; value: string };

/** Placeholder used for [[no-link]] phrases so they are not linkified. Keys are placeholders, values are the original text. */
export type PlainReplacements = Record<string, string>;

const NOLINK_START = "\uE000";
const NOLINK_END = "\uE001";

function makeNoLinkPlaceholder(index: number): string {
  return `${NOLINK_START}${index}${NOLINK_END}`;
}

/**
 * Dynamic links you can pass from content (e.g. case study JSON) to add or override phrase → href.
 */
export type ExtraLink = { phrase: string; href: string };

/**
 * Phrase-only linkify (no markdown). Used internally and when you don't need [text](url) parsing.
 */
function linkifyPhrasesOnly(
  text: string,
  phraseHrefs: { phrase: string; href: string }[]
): LinkSegment[] {
  if (!text?.trim()) return [{ type: "text", value: text || "" }];

  const segments: LinkSegment[] = [];
  let remaining = text;
  const sorted = [...phraseHrefs].sort((a, b) => b.phrase.length - a.phrase.length);

  while (remaining.length > 0) {
    let best: { index: number; phrase: string; href: string } | null = null;

    for (const { phrase, href } of sorted) {
      if (!phrase) continue;
      const index = remaining.indexOf(phrase);
      if (index === -1) continue;
      if (best === null || index < best.index || (index === best.index && phrase.length > best.phrase.length)) {
        best = { index, phrase, href };
      }
    }

    if (best === null) {
      segments.push({ type: "text", value: remaining });
      break;
    }

    if (best.index > 0) {
      segments.push({ type: "text", value: remaining.slice(0, best.index) });
    }
    segments.push({ type: "link", href: best.href, value: best.phrase });
    remaining = remaining.slice(best.index + best.phrase.length);
  }

  return segments;
}

/**
 * Build phrase list: extra links first (so they override), then site links.
 */
function buildPhraseList(extraLinks?: ExtraLink[]): { phrase: string; href: string }[] {
  const extra = extraLinks ?? [];
  const seen = new Set(extra.map((e) => e.phrase.toLowerCase()));
  const site = SITE_PHRASE_LINKS.filter((p) => !seen.has(p.phrase.toLowerCase()));
  return [...extra, ...site];
}

/**
 * Result of linkifyText: segments to render and map to expand [[no-link]] placeholders in text segments.
 */
export interface LinkifyResult {
  segments: LinkSegment[];
  plainReplacements: PlainReplacements;
}

/**
 * Splits text into segments: plain text, markdown-style links [text](url), phrase-matched links,
 * and optional no-link phrases [[phrase]] (same name, but do not link here).
 * - [link text](/path) = link here.
 * - [[phrase]] = show "phrase" as plain text (no link), e.g. when the same word is linked elsewhere.
 */
export function linkifyText(text: string, extraLinks?: ExtraLink[]): LinkifyResult {
  const plainReplacements: PlainReplacements = {};
  if (!text?.trim()) {
    return { segments: [{ type: "text", value: text || "" }], plainReplacements };
  }

  // 1) Replace [[phrase]] with a placeholder so it won’t be linkified; store original text.
  const noLinkRegex = /\[\[([^\]]+)\]\]/g;
  let processed = text;
  let match: RegExpExecArray | null;
  let noLinkIndex = 0;
  const replacements: { start: number; end: number; placeholder: string; original: string }[] = [];
  while ((match = noLinkRegex.exec(text)) !== null) {
    const placeholder = makeNoLinkPlaceholder(noLinkIndex);
    plainReplacements[placeholder] = match[1].trim();
    replacements.push({
      start: match.index,
      end: match.index + match[0].length,
      placeholder,
      original: match[0],
    });
    noLinkIndex += 1;
  }
  // Apply from end to start so indices stay valid
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, placeholder } = replacements[i];
    processed = processed.slice(0, start) + placeholder + processed.slice(end);
  }

  const phraseHrefs = buildPhraseList(extraLinks);
  const segments: LinkSegment[] = [];
  const mdRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastEnd = 0;
  let m: RegExpExecArray | null;

  while ((m = mdRegex.exec(processed)) !== null) {
    if (m.index > lastEnd) {
      const before = processed.slice(lastEnd, m.index);
      segments.push(...linkifyPhrasesOnly(before, phraseHrefs));
    }
    segments.push({ type: "link", href: m[2].trim(), value: m[1].trim() });
    lastEnd = mdRegex.lastIndex;
  }

  if (lastEnd < processed.length) {
    segments.push(...linkifyPhrasesOnly(processed.slice(lastEnd), phraseHrefs));
  }

  return {
    segments: segments.length > 0 ? segments : [{ type: "text", value: processed }],
    plainReplacements,
  };
}

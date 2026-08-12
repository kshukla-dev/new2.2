import { SITE_CONFIG, CONTACT_INFO } from "./constants"

export const ORGANIZATION_ID = `${SITE_CONFIG.url}/#organization`
export const WEBSITE_ID = `${SITE_CONFIG.url}/#website`

export const VIBHU_AGARWAL_ID = `${SITE_CONFIG.url}/#vibhu-agarwal`
export const VIBHU_AGARWAL_PERSON: Record<string, unknown> = {
  "@type": "Person",
  "@id": VIBHU_AGARWAL_ID,
  name: "Vibhu Agarwal",
  jobTitle: "Marketing Manager",
  url: "https://www.linkedin.com/in/agarwal-vibhu/",
  image: `${SITE_CONFIG.url}/speakers/Vibhu.webp`,
  sameAs: ["https://www.linkedin.com/in/agarwal-vibhu/"],
  worksFor: { "@id": ORGANIZATION_ID },
}

/**
 * Build Organization schema for JSON-LD. Used in root layout / page graphs so all pages can reference it by @id.
 * Includes full company details for SEO: name, description, logo, address, contact (email, phone, url),
 * contact points, and social profiles (sameAs). Detailed for rich results and knowledge panels.
 */
export function buildOrganizationSchema(): Record<string, unknown> {
  const logoUrl = `${SITE_CONFIG.url}/assets/logo-light.svg`
  const address = CONTACT_INFO.addressStructured
  const contactUrl = `${SITE_CONFIG.url}/contact`
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    image: logoUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
      addressRegion: address.addressRegion,
      addressCountry: address.addressCountry,
    },
    /** Primary contact: email, phone, contact page URL, type, area served, language */
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT_INFO.phone,
      email: CONTACT_INFO.email,
      contactType: "customer service",
      areaServed: "Worldwide",
      availableLanguage: "English",
      url: contactUrl,
    },
    /** All official social media profiles for identity and rich results */
    sameAs: [SITE_CONFIG.links.linkedin, SITE_CONFIG.links.youtube, SITE_CONFIG.links.wechat],
  }
}

/**
 * Build WebSite schema for JSON-LD. Used in root layout so all pages can reference it by @id.
 * Enables sitelinks and site search eligibility in search results.
 */
export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: {
        "@type": "EntryPoint",
        url: SITE_CONFIG.url,
      },
    },
  }
}

/**
 * Base graph (Organization + WebSite) included in every page via buildPageSchemaGraph().
 * Organization includes: name, logo, address, contactPoint (email, phone, url, contactType, areaServed, availableLanguage), sameAs (social).
 * All page-level schemas reference these by @id.
 */
export function getBaseSchemaGraph(): unknown[] {
  return [buildOrganizationSchema(), buildWebSiteSchema()]
}

/** Human-readable label for path segment (e.g. employer-of-record -> Employer of record) */
const PATH_LABELS: Record<string, string> = {
  "": "Home",
  "about-us": "About us",
  "advantages": "Advantages",
  "employer-of-record": "Employer of record",
  "payroll": "Payroll",
  "compliance": "Compliance",
  "immigration": "Immigration",
  "contractor": "Contractor",
  "career": "Career",
  "case-studies": "Success stories",
  "global-hiring-guide": "Global hiring guide",
  "cost-calculator": "Cost calculator",
  "privacy-policy": "Privacy policy",
  "sitemap": "Sitemap",
  "faq": "FAQ",
  "contact": "Contact us",
  "united-kingdom": "United Kingdom",
  "united-kingdom-contractor": "United Kingdom Contractor",
  "netherlands": "Netherlands",
  "netherlands-contractor": "Netherlands Contractor",
  "germany": "Germany",
  "germany-contractor": "Germany Contractor",
  "france": "France",
  "france-contractor": "France Contractor",
  "belgium": "Belgium",
  "belgium-contractor": "Belgium Contractor",
  "spain": "Spain",
  "spain-contractor": "Spain Contractor",
  "italy": "Italy",
  "italy-contractor": "Italy Contractor",
  "poland": "Poland",
  "poland-contractor": "Poland Contractor",
  "czech-republic": "Czech Republic",
  "czech-republic-contractor": "Czech Republic Contractor",
  "india": "India",
  "india-contractor": "India Contractor",
  "uae": "UAE",
  "uae-contractor": "UAE Contractor",
  "china": "China",
  "hong-kong": "Hong Kong",
  "resources": "Resources",
  "events": "Events",
}

function pathSegmentToName(segment: string): string {
  if (PATH_LABELS[segment]) return PATH_LABELS[segment]
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Build BreadcrumbList schema from pathname and optional page title.
 * pathname e.g. "/employer-of-record" or "/blog/my-post"
 * Each ListItem has position, name, item (URL), and @id for valid breadcrumb rich results and SEO.
 */
export function buildBreadcrumbList(
  pathname: string,
  pageName?: string
): { "@type": "BreadcrumbList"; "@id": string; itemListElement: unknown[]; numberOfItems: number } {
  const base = pathname.replace(/\/$/, "") || "/"
  const url = `${SITE_CONFIG.url}${base === "/" ? "" : base}`
  const segments = base === "/" ? [] : base.slice(1).split("/")
  const itemListElement = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: SITE_CONFIG.url,
    },
    ...segments.map((segment, i) => {
      const segmentPath = "/" + segments.slice(0, i + 1).join("/")
      const name =
        i === segments.length - 1 && pageName
          ? pageName
          : pathSegmentToName(segment)
      return {
        "@type": "ListItem" as const,
        position: i + 2,
        name,
        item: `${SITE_CONFIG.url}${segmentPath}`,
      }
    }),
  ]
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement,
    numberOfItems: itemListElement.length,
  }
}

export interface WebPageSchemaParams {
  path: string
  name: string
  description: string
  pageNameForBreadcrumb?: string
  /** Override WebPage subtype: ContactPage, AboutPage, CollectionPage, etc. */
  pageType?: "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage" | "ItemPage"
  /** Optional: last modified date (ISO 8601) for better SEO */
  dateModified?: string
  /** Set true for FAQ-dedicated pages so WebPage mainEntity points to this page's FAQPage. */
  mainEntityFaq?: boolean
}

/**
 * Build WebPage (or subtype) + BreadcrumbList for any page.
 * Uses full name and description for proper SEO and rich results.
 * BreadcrumbList is returned as a separate entity in the graph (not as a property of WebPage).
 */
export function buildWebPageSchema(params: WebPageSchemaParams): unknown[] {
  const { path, name, description, pageNameForBreadcrumb, pageType = "WebPage", dateModified, mainEntityFaq } = params
  const pathname = path.startsWith("/") ? path : `/${path}`
  const url = `${SITE_CONFIG.url}${pathname === "/" ? "" : pathname}`
  const breadcrumb = buildBreadcrumbList(pathname, pageNameForBreadcrumb ?? name)

  const webPage: Record<string, unknown> = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
    ...(dateModified && { dateModified }),
    ...(mainEntityFaq && { mainEntity: { "@id": `${url}#faqpage` } }),
    ...(pageType === "ContactPage" && !mainEntityFaq && {
      mainEntity: {
        "@type": "ContactPoint",
        telephone: CONTACT_INFO.phone,
        email: CONTACT_INFO.email,
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: "English",
        url: `${SITE_CONFIG.url}/contact`,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT_INFO.addressStructured.streetAddress,
          addressLocality: CONTACT_INFO.addressStructured.addressLocality,
          postalCode: CONTACT_INFO.addressStructured.postalCode,
          addressRegion: CONTACT_INFO.addressStructured.addressRegion,
          addressCountry: CONTACT_INFO.addressStructured.addressCountry,
        },
      },
    }),
  }

  return [breadcrumb, webPage]
}

export interface ArticleSchemaParams {
  path: string
  name: string
  description: string
  datePublished?: string
  dateModified?: string
  image?: string
  author?: string
  pageNameForBreadcrumb?: string
  /** schema.org keywords (topics) */
  keywords?: string[]
  /** High-level category e.g. Press release, Events */
  articleSection?: string
  /** Use NewsArticle for press releases / timely coverage */
  useNewsArticle?: boolean
}

/**
 * Build Article + BreadcrumbList for blog posts and case studies.
 * Includes headline, publisher, author, and image for full Article rich result eligibility.
 * BreadcrumbList is returned as a separate entity in the graph (not as a property of Article).
 */
export function buildArticleSchema(params: ArticleSchemaParams): unknown[] {
  const {
    path,
    name,
    description,
    datePublished,
    dateModified,
    image,
    author = SITE_CONFIG.name,
    pageNameForBreadcrumb,
    keywords,
    articleSection,
    useNewsArticle = false,
  } = params
  const pathname = path.startsWith("/") ? path : `/${path}`
  const url = `${SITE_CONFIG.url}${pathname}`
  const breadcrumb = buildBreadcrumbList(pathname, pageNameForBreadcrumb ?? name)
  const imageUrl = image?.startsWith("http") ? image : image ? `${SITE_CONFIG.url}${image.startsWith("/") ? image : `/${image}`}` : undefined

  const isOrgAuthor = author === SITE_CONFIG.name;
  const isVibhuAuthor = author === "Vibhu Agarwal";

  let authorRef: Record<string, unknown>;
  if (isOrgAuthor) {
    authorRef = { "@id": ORGANIZATION_ID };
  } else if (isVibhuAuthor) {
    authorRef = { "@id": VIBHU_AGARWAL_ID };
  } else {
    authorRef = { "@type": "Person", name: author };
  }

  const article: Record<string, unknown> = {
    "@type": useNewsArticle ? "NewsArticle" : "Article",
    "@id": `${url}#article`,
    headline: name,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
    author: authorRef,
    inLanguage: "en-US",
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(imageUrl && { image: [imageUrl] }),
    ...(keywords?.length && { keywords: keywords.map((k) => k.trim()).filter(Boolean) }),
    ...(articleSection && { articleSection }),
  }

  // Include the full Vibhu Person entity in the graph so the @id reference resolves.
  return isVibhuAuthor
    ? [breadcrumb, VIBHU_AGARWAL_PERSON, article]
    : [breadcrumb, article];
}

export interface ServiceSchemaParams {
  path: string
  name: string
  description: string
  serviceType?: string
  pageNameForBreadcrumb?: string
  /** Set true when this page also has FAQ content so WebPage gets hasPart pointing to FAQPage. */
  hasFaq?: boolean
}

/**
 * Build BreadcrumbList + WebPage + Service for service pages (EOR, Payroll, Compliance, etc.).
 * WebPage represents the full page with mainEntity: Service; optional hasPart links to FAQPage when hasFaq.
 * Ensures whole page content (breadcrumb, page, service, and when present FAQ) is in the graph.
 */
export function buildServiceSchema(params: ServiceSchemaParams): unknown[] {
  const { path, name, description, serviceType, pageNameForBreadcrumb, hasFaq } = params
  const pathname = path.startsWith("/") ? path : `/${path}`
  const url = `${SITE_CONFIG.url}${pathname}`
  const breadcrumb = buildBreadcrumbList(pathname, pageNameForBreadcrumb ?? name)

  const service: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    inLanguage: "en-US",
    ...(serviceType && { serviceType }),
  }

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    mainEntity: { "@id": `${url}#service` },
    inLanguage: "en-US",
    ...(hasFaq && { hasPart: { "@id": `${url}#faqpage` } }),
  }

  return [breadcrumb, webPage, service]
}

export interface CollectionPageSchemaParams {
  path: string
  name: string
  description: string
  numberOfItems?: number
  pageNameForBreadcrumb?: string
}

/**
 * Build CollectionPage + BreadcrumbList for blog list, case-studies list.
 * BreadcrumbList is returned as a separate entity in the graph (not as a property of CollectionPage).
 */
export function buildCollectionPageSchema(
  params: CollectionPageSchemaParams
): unknown[] {
  const { path, name, description, numberOfItems, pageNameForBreadcrumb } = params
  const pathname = path.startsWith("/") ? path : `/${path}`
  const url = `${SITE_CONFIG.url}${pathname}`
  const breadcrumb = buildBreadcrumbList(pathname, pageNameForBreadcrumb ?? name)

  const collectionPage: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
    ...(numberOfItems !== undefined && { numberOfItems }),
  }

  return [breadcrumb, collectionPage]
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSchemaParams {
  /** Page path for FAQPage @id and url (e.g. "/contact") */
  path: string
  /** List of Q&A pairs. Rendered as Question/Answer in schema. */
  faq: FaqItem[]
  /** Optional page name for FAQPage (recommended for standalone FAQ pages). */
  name?: string
  /** Optional page description for FAQPage. */
  description?: string
  /** Override the default `@id` (defaults to `<url>#faqpage`). */
  idSuffix?: string
  /** Override the default `url` (e.g. to point at an anchor within the page). */
  urlOverride?: string
}

/**
 * Build FAQPage schema for Google FAQ rich results.
 * Each question/answer must be clear and complete for eligibility.
 * Include name/description when building for a dedicated FAQ page so the entity represents the whole page.
 * Returns a single graph item; merge with other schemas and pass to buildPageSchemaGraph().
 */
export function buildFaqSchema(params: FaqSchemaParams): Record<string, unknown>[] {
  const { path, faq, name, description, idSuffix, urlOverride } = params
  if (!faq?.length) return []

  const pathname = path.startsWith("/") ? path : `/${path}`
  const baseUrl = `${SITE_CONFIG.url}${pathname === "/" ? "" : pathname}`
  const id = `${baseUrl}#${idSuffix || "faqpage"}`
  const url = urlOverride || baseUrl

  const faqPage: Record<string, unknown> = {
    "@type": "FAQPage",
    "@id": id,
    ...(name && { name }),
    ...(description && { description }),
    url,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.trim(),
      },
    })),
  }

  return [faqPage]
}

/**
 * Build a page @graph for the JsonLd component: base (Organization + WebSite)
 * followed by the page-specific entities, as ONE self-contained block.
 *
 * Each page emits its own complete graph (rather than the root layout emitting a
 * separate base block) so there is exactly ONE JSON-LD block per page. That
 * block leads with the page's real schema context and avoids a generic
 * base-only block appearing first - which schema inspectors surface, making it
 * look like the page has no Article/FAQ/Service schema. Schema-less pages render
 * <BaseSchema /> (which calls buildPageSchemaGraph([])) so they still carry
 * Organization + WebSite.
 * Pass the result of buildWebPageSchema, buildArticleSchema, buildFaqSchema, etc.
 */
export function buildPageSchemaGraph(graphItems: unknown[]): {
  "@context": string
  "@graph": unknown[]
} {
  return {
    "@context": "https://schema.org",
    "@graph": [...getBaseSchemaGraph(), ...graphItems],
  }
}

/**
 * Hand-crafted @graph items for /blog/work-visa-europe-guide.
 * Replaces the auto-generated buildArticleSchema output for this page only.
 * Includes: Organization, two Person nodes (author + reviewer), WebSite, WebPage,
 * BreadcrumbList, and BlogPosting with full E-E-A-T signals (reviewedBy, citation, keywords).
 * Merged with buildFaqSchema output in app/blog/[slug]/page.tsx → one single JSON-LD block.
 */
export const WORK_VISA_EUROPE_GUIDE_GRAPH: Record<string, unknown>[] = [
  // Organization + WebSite are prepended once by buildPageSchemaGraph (which
  // wraps this array in page.tsx). The nodes below reference them by @id.
  {
    "@type": "Person",
    "@id": "https://jacksonandfrank.com/#vibhu-agarwal",
    name: "Vibhu Agarwal",
    jobTitle: "Marketing Manager",
    url: "https://www.linkedin.com/in/agarwal-vibhu/",
    image: "https://jacksonandfrank.com/speakers/Vibhu.webp",
    sameAs: ["https://www.linkedin.com/in/agarwal-vibhu/"],
    worksFor: { "@id": "https://jacksonandfrank.com/#organization" },
  },
  {
    "@type": "Person",
    "@id": "https://jacksonandfrank.com/#work-visa-reviewer",
    name: "Gaurav Yelve",
    jobTitle: "Immigration and global mobility specialist",
    url: "https://www.linkedin.com/in/gaurav-yelve-10050118b/",
    image: "https://jacksonandfrank.com/speakers/Gaurav.webp",
    sameAs: ["https://www.linkedin.com/in/gaurav-yelve-10050118b/"],
    worksFor: { "@id": "https://jacksonandfrank.com/#organization" },
  },
  {
    "@type": "WebPage",
    "@id": "https://jacksonandfrank.com/blog/work-visa-europe-guide#webpage",
    url: "https://jacksonandfrank.com/blog/work-visa-europe-guide",
    name: "Step-by-Step Guide to Getting a Work Visa in Europe (2026 Update)",
    description:
      "A 2026 guide to work visa routes, salary thresholds, job offer requirements, sponsor rules, and application steps for non-EU workers in Europe.",
    isPartOf: { "@id": "https://jacksonandfrank.com/#website" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": "https://jacksonandfrank.com/blog/work-visa-europe-guide#primaryimage",
      url: "https://jacksonandfrank.com/blog-images/work-visa-in-europe.webp",
      caption: "Work Visa Europe Guide 2026",
    },
    about: [
      { "@type": "Thing", name: "Work visa in Europe" },
      { "@type": "Thing", name: "EU Blue Card" },
      { "@type": "Thing", name: "Highly Skilled Migrant visa" },
      { "@type": "Thing", name: "Digital nomad visa" },
      { "@type": "Thing", name: "Employer of Record" },
      { "@type": "Thing", name: "Visa sponsorship" },
    ],
    datePublished: "2025-03-10",
    dateModified: "2026-05-13",
    inLanguage: "en",
  },
  {
    "@type": "BreadcrumbList",
    "@id": "https://jacksonandfrank.com/blog/work-visa-europe-guide#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jacksonandfrank.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://jacksonandfrank.com/blog" },
      { "@type": "ListItem", position: 3, name: "Work Visa in Europe Guide 2026", item: "https://jacksonandfrank.com/blog/work-visa-europe-guide" },
    ],
  },
  {
    "@type": "BlogPosting",
    "@id": "https://jacksonandfrank.com/blog/work-visa-europe-guide#article",
    mainEntityOfPage: { "@id": "https://jacksonandfrank.com/blog/work-visa-europe-guide#webpage" },
    headline: "Step-by-Step Guide to Getting a Work Visa in Europe (2026 Update)",
    alternativeHeadline:
      "Work visa in Europe: 2026 salary thresholds, visa routes, sponsor rules, and application steps",
    name: "Step-by-Step Guide to Getting a Work Visa in Europe (2026 Update)",
    description:
      "A 2026 guide to work visa routes, salary thresholds, job offer requirements, sponsor rules, and application steps for non-EU workers in Europe.",
    url: "https://jacksonandfrank.com/blog/work-visa-europe-guide",
    image: ["https://jacksonandfrank.com/blog-images/work-visa-in-europe.webp"],
    thumbnailUrl: "https://jacksonandfrank.com/blog-images/work-visa-in-europe.webp",
    datePublished: "2025-03-10",
    dateModified: "2026-05-13",
    timeRequired: "PT25M",
    author: { "@id": "https://jacksonandfrank.com/#vibhu-agarwal" },
    publisher: { "@id": "https://jacksonandfrank.com/#organization" },
    reviewedBy: { "@id": "https://jacksonandfrank.com/#work-visa-reviewer" },
    articleSection: ["Immigration", "Global Hiring", "Visa Sponsorship", "Employer of Record"],
    keywords: [
      "work visa Europe 2026",
      "Europe work permit",
      "EU Blue Card salary 2026",
      "Germany EU Blue Card",
      "Netherlands Highly Skilled Migrant visa",
      "Portugal Digital Nomad visa",
      "Ireland Critical Skills Employment Permit",
      "UK Skilled Worker visa",
      "visa sponsorship Europe",
      "work visa salary thresholds Europe",
    ],
    citation: [
      "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card",
      "https://ind.nl/en/news/fees-and-required-amounts-for-2026-known",
      "https://france-visas.gouv.fr",
      "https://www.service-public.fr",
      "https://www.gov.uk/skilled-worker-visa",
      "https://enterprise.gov.ie",
      "https://vistos.mne.gov.pt",
      "https://home-affairs.ec.europa.eu",
      "https://www.vlaanderen.be",
      "https://ipc.gov.cz",
      "https://www.esteri.it",
    ],
    inLanguage: "en",
  },
]

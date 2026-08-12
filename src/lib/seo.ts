import type { Metadata } from "next"
import { SITE_CONFIG } from "./constants"

interface GenerateMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
  /**
   * Set true for routes resolved via an async `generateMetadata` function
   * (e.g. dynamic [slug] layouts). Those bypass the root layout's
   * `title.template`, so the brand suffix has to be appended here instead
   * of relying on inheritance.
   */
  absoluteTitle?: boolean
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  /** Open Graph article:section (e.g. "Press release", "Events") */
  articleSection?: string
  /** Open Graph article:tag — same topics as meta/structured data */
  articleTags?: string[]
}

function truncateTitle(title: string, maxLength: number = 65): string {
  if (title.length <= maxLength) return title
  return title.substring(0, maxLength - 3) + '...'
}

// Root layout's title.template already appends " | Jackson & Frank" to every
// page title. Strip a brand suffix here in case the caller's title (JSON
// data, hardcoded string, etc.) already bakes one in, so it's never doubled.
function stripBrandSuffix(title: string): string {
  return title.replace(/\s*[|\-–—]\s*Jackson\s*&\s*Frank\s*$/i, "").trim()
}

function optimizeDescription(description: string): string {
  const minLength = 70
  const maxLength = 155
  
  if (description.length >= minLength && description.length <= maxLength) {
    return description
  }
  
  if (description.length < minLength) {
    return description
  }
  
  const truncated = description.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')
  return lastSpace > minLength 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  articleSection,
  articleTags,
}: GenerateMetadataOptions = {}): Metadata {
  const maxPageTitleLength = 65 - SITE_CONFIG.name.length

  const strippedTitle = stripBrandSuffix(title || "")
  const finalTitle = absoluteTitle ? `${strippedTitle} | ${SITE_CONFIG.name}` : strippedTitle
 
  
  
  
  const fullDescription = optimizeDescription(description || SITE_CONFIG.description)
  const url = `${SITE_CONFIG.url}${path}`
  const ogImage = image
    ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image.startsWith("/") ? image : `/${image}`}`)
    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`

  const metadata: Metadata = {
    title: finalTitle,
    description: fullDescription,
    authors: authors?.map(name => ({ name })) || [{ name: SITE_CONFIG.name }],
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: fullDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: "en_US",
      type: (type === "product" ? "website" : (type || "website")) as "website" | "article",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(type === "article" && articleSection ? { section: articleSection } : {}),
      ...(type === "article" && articleTags?.length ? { tags: articleTags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: fullDescription,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      other: {
        "msvalidate.01": "60E5EC820D7200BA2607ABDCD07B0CFF",
      },
    },
  }

  return metadata
}


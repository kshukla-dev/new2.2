export const SITE_CONFIG = {
  name: "Jackson & Frank",
  description: "Global HR Solutions - EOR & Payroll Services",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jacksonandfrank.com",
  // Falls back to the homepage hero background when a page doesn't supply
  // its own `image`. /images/og-image.jpg never existed in public/.
  ogImage: "/home-hero-bg2.webp",
  links: {
    linkedin: "https://www.linkedin.com/company/jacksonandfrank/",
    youtube: "https://www.youtube.com/@JacksonAndFrank",
    wechat: "https://u.wechat.com/EIC3m9H1Odk7U7NAvPHSDjg?s=2",
  },
} as const

/**
 * Single source of truth for the Calendly booking link used site-wide.
 * Change it here (or set NEXT_PUBLIC_CALENDLY_URL) to update every page at once.
 */
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://calendly.com/piyush-jacksonandfrank/30min"

export const NAVIGATION = {
  main: [
    { name: "Home", href: "/" },
    { name: "Career", href: "/career" },
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact" },
  ],
  footer: {
    company: [
      { name: "About us", href: "/about-us" },
      { name: "Services", href: "/employer-of-record" },
      { name: "Career", href: "/career" },
    ],
    legal: [
      { name: "Privacy policy", href: "/privacy-policy" },
      { name: "Sitemap", href: "/sitemaps" },
    ],
    social: [
      { name: "Linkedin", href: "https://www.linkedin.com/company/jacksonandfrank/", kind: "link" },
      { name: "Youtube", href: "https://www.youtube.com/@JacksonAndFrank", kind: "link" },
      { name: "WeChat", href: "https://u.wechat.com/EIC3m9H1Odk7U7NAvPHSDjg?s=2", kind: "modal" },
    ],
  },
} as const

export const CONTACT_INFO = {
  email: "info@jacksonandfrank.com",
  phone: "+31 26 74 40 024",
  address: "Jackson & Frank, Nieuwe Stationsstraat 10, 6811 KS Arnhem, The Netherlands",
  /** Structured address for JSON-LD and forms */
  addressStructured: {
    streetAddress: "Nieuwe Stationsstraat 10",
    addressLocality: "Arnhem",
    postalCode: "6811 KS",
    addressRegion: "Gelderland",
    addressCountry: "NL",
  },
} as const


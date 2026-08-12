// Blog post shape returned by jacksonandfrank.com/api/v1/dynamic-page

export interface Author {
  id: number
  name: string
  email: string
}

export interface Category {
  id: number | string
  category_name: string
  slug?: string
}

export interface Tag {
  id: number | string
  tag?: string
  tag_name?: string
  name?: string
}

export interface RelatedArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  page_content: string
  author_id: number
  image_url: string
  page_type: string
  estimated_reading_time: number
  category_ids: string
  meta_title: string
  meta_description: string
  status: string
  publish_date: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  page_content: string
  author_id: number
  image_url: string
  page_type: string
  featured_page: number
  estimated_reading_time: number | null
  related_article_ids: string
  tag_ids: string
  category_ids: string
  meta_title: string
  meta_description: string
  canonical_url: string
  status: string
  publish_date: string
  created_at: string
  updated_at: string
  author?: Author
  related_articles?: RelatedArticle[]
  in_this_guide?: { title: string; url: string }[]
  toc_html?: string
  // Optional fields carried by manual (hardcoded) blog posts
  created_by?: number
  updated_by?: number
  featuredServiceData?: unknown[]
  otherServiceData?: unknown[]
  recommendedBlogsData?: unknown[]
  body?: any
  rawHtml?: string
  faq_title?: string
  faq_subtitle?: string
  faq_items?: { question: string; answer: string }[]
}

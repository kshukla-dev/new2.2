# Jackson & Frank website (nextjs_ui)

Marketing site for Jackson & Frank: Employer of Record, payroll, immigration and
compliance services. Next.js 16 App Router with Turbopack, TypeScript, and a
three-source blog (legacy CMS API, Sanity, and hardcoded manual posts).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values, see "Environment" below
npm run dev                  # http://localhost:3001
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server on port **3001** (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the repo |
| `npm run indexnow` | Bulk-submit the sitemap to IndexNow (Bing/Yandex) |

Verifying SEO output requires a production build, because the dev server does not
represent what crawlers receive:

```bash
npm run build && npm start
curl -s http://localhost:3000/blog/<slug> | grep -c '<h1'
```

## Environment

Every variable is documented inline in [`.env.example`](.env.example). Summary:

| Variable | Required | Purpose |
|---|---|---|
| `SANITY_API_TOKEN` | Recommended | Server-only Sanity read token. See below. |
| `NEXT_PUBLIC_API_BASE_URL` | No | Backend base URL. Defaults to `/api/v1`, which `next.config.ts` rewrites to `https://jacksonandfrank.com/api/*`. |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical origin for SEO. Defaults to `https://jacksonandfrank.com`. |
| `NEXT_PUBLIC_CALENDLY_URL` | No | "Book a call" link. Has a hardcoded fallback. |
| `GOOGLE_VERIFICATION_ID` | Production | Google Search Console verification. |
| `INDEXNOW_SECRET` | No | Authorizes the `/indexnow` route. |

Anything without the `NEXT_PUBLIC_` prefix is server-only and never reaches the
browser bundle. `SANITY_API_TOKEN` must stay unprefixed.

## Blog content sources

Posts come from three places, merged in [`src/lib/blog.ts`](src/lib/blog.ts).

**Listing (`fetchAllBlogs`)** builds the union of:

1. **Legacy CMS API** at `{API_BASE}/dynamic-page` (paginated, 50 per page)
2. **Sanity** (`_type == "blogPost"`), skipped entirely when no token is set
3. **Manual posts** in [`src/data/manual-blog-posts.ts`](src/data/manual-blog-posts.ts)

On a slug collision the API/Sanity version wins over the manual one. Results are
sorted newest-first by `publish_date`.

**Single post (`fetchBlogBySlug`)** resolves in a different order, first match wins:

1. Manual posts
2. Sanity
3. Legacy CMS API

So a manual post shadows a CMS post with the same slug. Worth remembering when a
CMS edit appears to have no effect.

## Sanity

Config lives in [`src/lib/sanity.ts`](src/lib/sanity.ts). Project ID and dataset
are public and hardcoded:

| Setting | Value |
|---|---|
| Project ID | `ahga2z6q` |
| Dataset | `production` |
| API version | `2023-05-03` |
| Perspective | `published` (drafts are never returned) |
| CDN | Used only when no token is set (`useCdn: !token`) |

### The token

`SANITY_API_TOKEN` is optional but recommended. Create it in Sanity under
**Manage > API > Tokens** with **Viewer** (read) permission.

- **With a token:** reads are authenticated and bypass the CDN, so a newly
  published post appears immediately.
- **Without a token:** every Sanity code path is skipped and the server logs
  `please add sanity token`. The site still works, serving legacy CMS posts plus
  manual posts only.

### Document type and fields

Queries expect a document type named **`blogPost`**. The projection is
`POST_FIELDS` in [`src/lib/blog.ts`](src/lib/blog.ts); each field has a
`coalesce` fallback so a partially filled document still renders.

| Sanity field | Maps to | Notes |
|---|---|---|
| `title` | `title` | |
| `slug.current` | `slug` | URL segment |
| `excerpt` | `excerpt` | Also the meta description fallback |
| `body` | `body` | **Portable Text**, rendered via `<PortableText/>` |
| `coverImage.asset->url` / `coverImageUrl` | `image_url` | First non-empty wins |
| `coverImage.alt` | `image_alt` | Falls back to `title` |
| `featured` | `featured_page` | Boolean to 1/0 |
| `estimatedReadingTime` | `estimated_reading_time` | |
| `metaTitle` / `metaDescription` | `meta_title` / `meta_description` | Fall back to `title` / `excerpt` |
| `canonicalUrl` | `canonical_url` | |
| `keywords` | `tag_ids` | Comma-separated string, split into tags. Feeds schema.org `keywords`. |
| `publishDate` | `publish_date` | Falls back to `_createdAt` |
| `updatedDate` | `updated_at` | Falls back to `_updatedAt` |
| `tocItems[]` | `in_this_guide` | `{ title, anchor, level }` to in-page anchors |
| `faqTitle` / `faqSubtitle` / `faqItems[]` | FAQ block | `{ question, answer }` |
| `author->` or `contributors[0].person->` | `author` | Author reference preferred, first contributor used otherwise |
| `categories[]->` | `category_ids` | Joined slugs. The first becomes schema.org `articleSection`. |

### Publishing checklist

A post must satisfy all of these to appear:

- Document type is `blogPost`
- `status` is exactly `published`
- `slug.current` is set
- The document is published in Sanity, not left as a draft

Once published it is live on `/blog` and `/blog/<slug>` immediately (both routes
are `force-dynamic`), and enters `/sitemap.xml` within the hour (ISR, 1h).
To push it to Bing/Yandex sooner, run `npm run indexnow`.

If the build logs `sanity empty`, the query ran but matched zero documents:
check the type name and the `status` value.

## Rendering architecture

Blog routes use a server component for data plus a client component for
interactivity. This matters: the article body must exist in the server HTML so
crawlers that do not run JavaScript (AI crawlers, social scrapers) can read it.

```
app/blog/page.tsx              server: fetches list, emits CollectionPage JSON-LD
  └─ BlogListClient.tsx        client: search, category filter, pagination

app/blog/[slug]/page.tsx       server: resolves post, emits Article JSON-LD
  └─ BlogDetailClient.tsx      client: TOC scroll-spy, lead modal, accordions
```

Do not move data fetching into a `useEffect` in these files. That is what
previously left the article absent from the server HTML.

Most other pages are client components reading local JSON from `src/data/`, which
still server-renders correctly because the data is available at render time.

## SEO

| Concern | Where |
|---|---|
| Shared metadata builder | [`src/lib/seo.ts`](src/lib/seo.ts) (`generateMetadata`) |
| Per-page metadata | `layout.tsx` beside each client page |
| Structured data builders | [`src/lib/schema.ts`](src/lib/schema.ts) |
| Sitemap | [`app/sitemap.ts`](app/sitemap.ts), ISR 1h |
| robots.txt | [`app/robots.ts`](app/robots.ts) |
| IndexNow | [`app/indexnow/route.ts`](app/indexnow/route.ts) |

Notes:

- There is deliberately **no `<meta name="keywords">`** tag. The `keywords` field
  in `schema.ts` is schema.org structured data, a different thing, and is
  intentional.
- `generateMetadata` strips a trailing brand suffix from titles, because the root
  layout's `title.template` already appends `| Jackson & Frank`. Do not add it
  manually or it appears twice.
- Blog and case-study detail pages get their own canonical URL from their
  `generateMetadata`. Without it they inherit the homepage canonical.
- `robots.ts` explicitly allows GPTBot, OAI-SearchBot, PerplexityBot and
  ClaudeBot, none of which execute JavaScript. That is why server-rendering the
  blog matters.
- Do not add `Cache-Control` headers for `/_next/static` or `/_next/image` in
  `next.config.ts`. Next.js already applies optimal immutable caching there, and
  overriding it triggers a build warning.

## Forms

All forms post to the same backend via [`src/lib/contact.ts`](src/lib/contact.ts):

| Form | Endpoint |
|---|---|
| `/contact`, `DelayedContactPopup`, `LeadModal` | `POST {API_BASE}/contact-us` |
| Footer newsletter | `POST {API_BASE}/newsletter/subscribe` |
| `/unsubscribe` | `POST {API_BASE}/newsletter/unsubscribe` |
| `/hire-non-eu-employees-netherlands` | Embedded HubSpot form (bypasses this API) |

`appendLeadContext()` appends an internal `--- Lead Source (internal) ---` block
to the message so the team can see which page produced a lead. Blog and
case-study modals pass the page title, URL and categories.

Duplicate submissions are guarded per browser for 24h via
[`src/lib/formSubmission.ts`](src/lib/formSubmission.ts) (localStorage). It is a
convenience guard, not real deduplication; that must be enforced server-side.

## Conventions

See [`AGENTS.md`](AGENTS.md). Two that matter most:

- This Next.js version has breaking changes versus older documentation. Check
  `node_modules/next/dist/docs/` before relying on remembered APIs.
- Do not use em dashes in source files. Use a hyphen, comma, or colon.
"# new2.2" 

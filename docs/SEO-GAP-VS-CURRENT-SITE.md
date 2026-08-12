# New Repo (`nextjs_ui`) vs. Current Site (`jf_website_2.0`) — SEO Gap Analysis

> **Purpose:** Compare this new repo against the current live site's SEO/technical setup, and list exactly what must be updated/added before this can safely replace the live site on the same domain.
> **Prepared:** 2026-07-01.
> **New repo:** `github.com/kshukla-dev/nextjs_ui` → cloned to `D:\Jackson and Frank\next js ui new one website`.
> **Current repo:** `D:\Jackson and Frank\jf_website_2.0`.
> **Companion docs (in the current repo `docs/`):** `SEO-STRATEGY.md` (competitor benchmark + target state), `SEO-CURRENT-SITE-AUDIT.md` (current-site baseline).

---

## TL;DR

The new repo is a **promising redesign with better architecture** — modern stack, a **dynamic programmatic country route**, Sanity CMS, and migrated content data. **But it currently has almost none of the SEO infrastructure the live site depends on.** Structured data, per-page metadata, canonical URLs, the XML sitemap, the AI-crawler robots rules, and `llms.txt` are all missing. **Launching it as-is on the same domain would cause a major SEO regression.**

The core task is **not to build SEO from scratch** — it's to **port the proven SEO engine from the current repo** (`lib/schema.ts`, `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`) into this repo and wire it into every route, then finish the half-migrated pages.

---

## 1. What the new repo IS

| Aspect | Detail |
|---|---|
| Framework | **Next.js 16.2.9**, React 19.2.4 (newer than current site's Next 15) |
| Code layout | Under **`src/`** (`src/components/{layout,sections,ui}`, `src/lib`, `src/services`, `src/data`, `src/types`, `src/utils`) |
| CMS | **Sanity** (`@sanity/client`, `@sanity/image-url`, `@portabletext/react`) + `next.config.ts` proxies `/api/*` → `jacksonandfrank.com/api/*` (custom CMS) |
| Fonts | DM Sans + DM Serif Display (design refresh; current site uses Poppins) |
| Country pages | **Dynamic `app/[country]/page.tsx`** — programmatic, data-driven (vs. current site's static per-country layouts). *This is an SEO architecture upgrade.* |
| Content data | Migrated: `src/data/*` has per-country EOR/contractor JSON, `country-config.ts`, `seo-keywords.json`, `manual-blog-posts.ts`, blog `*.content.ts` files, `site-map.json`, `navigation.json` |
| State | **In progress** — 18 `*.part` files (half-converted pages from the `convert_*.js` scripts at repo root) |

---

## 2. Side-by-side: SEO/technical feature parity

| Feature | Current site (`jf_website_2.0`) | New repo (`nextjs_ui`) | Verdict |
|---|---|---|---|
| **Structured-data engine** | `lib/schema.ts` — full builder suite, one `@graph`/page | **Only a hardcoded stub `Organization`** in `app/layout.tsx` | 🔴 **Regression** |
| WebSite / WebPage schema | Yes, every page | No | 🔴 Missing |
| Article / BlogPosting schema | Yes (blog + case studies) | No | 🔴 Missing |
| Service schema | Yes (EOR, payroll, compliance, contractor…) | No | 🔴 Missing |
| FAQPage schema | Yes (services, blog, home, contact, calculator) | No | 🔴 Missing |
| BreadcrumbList schema | Yes, sitewide | No | 🔴 Missing |
| Person / author (E-E-A-T) | Yes (`ArticleCredibility` + Person node) | No | 🔴 Missing |
| **Per-page metadata** | Every route via `lib/seo.ts` `generateMetadata()` | **Only 5 of ~25 routes** export metadata | 🔴 Regression |
| Canonical URLs | Yes (self-referential, `metadataBase`) | **None** (no `metadataBase`, no `alternates.canonical`) | 🔴 Missing |
| OpenGraph / Twitter | Per-page, image-aware | Root default only; single OG image on **old domain** | 🟠 Weak |
| **XML sitemap** | `app/sitemap.ts` (dynamic, CMS + manual + case studies) | **None** | 🔴 Missing |
| **robots** | `app/robots.ts` — **allows GPTBot/ClaudeBot/PerplexityBot**, blocks bad paths | **Static `public/robots.txt`**, generic, **points sitemap to OLD domain**, no AI-crawler rules | 🔴 Regression |
| **`llms.txt`** (GEO) | Yes — rich, hand-authored | **None** | 🔴 Missing |
| Manifest | `public/manifest.json` | None | 🟡 Minor |
| HTML sitemap | `/sitemaps` (content-driven) | `/sitemaps` page exists (verify it's wired to data) | 🟡 Verify |
| URL preservation / redirects | slugs stable; `next.config.ts` redirects | `next.config.ts` has **no redirects**; dynamic `[country]` may change URL shape | 🟠 Verify parity |
| **Programmatic country pages** | Static per-country layouts | **Dynamic `[country]` route** | 🟢 **Upgrade** |
| Modern framework | Next 15 | **Next 16 / React 19** | 🟢 Upgrade |
| Content migrated | — | Country JSON, blog content, manual posts, seo-keywords | 🟢 Good |

🟢 better · 🟡 minor/verify · 🟠 needs work · 🔴 missing/regression

---

## 3. What the new repo HAS going for it (keep these)

1. **Dynamic `[country]` route** — programmatic country pages are exactly what Remote/Deel do and what our strategy recommends. Better SEO-scaling foundation than the current static layouts. Reuse `src/data/*-eor.json` + `country-config.ts` to populate data tables.
2. **Migrated content** — country data, blog `*.content.ts`, `manual-blog-posts.ts`, and a `seo-keywords.json` are already in `src/data/`. Little content re-work needed.
3. **Modern stack** — Next 16 + React 19; strong Core Web Vitals ceiling.
4. **CMS wiring** — Sanity client + `/api` proxy to the existing custom CMS already scaffolded.

---

## 4. What the new repo LACKS (must fix before launch)

### 🔴 P0 — SEO infrastructure (launch-blockers; porting existing code)
1. **Structured data engine.** Port `lib/schema.ts` from the current repo → `src/lib/schema.ts`. Replace the `app/layout.tsx` stub with `Organization` + `WebSite` sitewide, and add per-page graphs.
2. **Metadata helper + coverage.** Port `lib/seo.ts` `generateMetadata()` → `src/lib/seo.ts`. Add `metadataBase` + **self-referential canonical** on every route. Today only 5 of ~25 routes have any metadata; the rest inherit a generic title/description.
3. **XML sitemap.** Port `app/sitemap.ts` (dynamic, pulling CMS + manual posts + case studies + all routes).
4. **robots.** Replace static `public/robots.txt` with `app/robots.ts` that (a) points the sitemap to the **correct domain**, and (b) explicitly **allows AI crawlers** (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended). *Current `robots.txt` even points the sitemap at the old site's `/sitemap.xml`.*
5. **`llms.txt`.** Port `public/llms.txt` (and keep it updated with the dynamic country/visa pages).

### 🔴 P0 — schema on page types (wire the ported engine everywhere)
6. **Blog posts / case studies:** `Article`/`BlogPosting` + `Person` author + `FAQPage` + `BreadcrumbList`.
7. **Service pages** (EOR, payroll, compliance, immigration, contractor): `Service` + `FAQPage` + `BreadcrumbList`.
8. **Country pages** (`[country]`): `Service` + `FAQPage` + `BreadcrumbList` + statutory **data tables** — do this once in the dynamic template and it applies to every country (an advantage over the current site, where country pages lack Service/FAQ schema).

### 🟠 P1 — finish & verify
9. **Complete the `.part` pages** (18 half-converted routes) — they must render real content, not conversion stubs.
10. **URL parity.** Confirm the dynamic `[country]` route produces the **same slugs** as the live site (`/germany`, `/spain`, …) and that every current URL still resolves; add `301`s in `next.config.ts` for any drift.
11. **Per-page OG images**; fix the root OG image (currently `jacksonandfrank.com/og-image.jpg` — verify it exists / use per-page).
12. **E-E-A-T.** Port the `ArticleCredibility` author/reviewer card + `Person` schema.
13. **Manifest** (`app/manifest.ts` or `public/manifest.json`).

### 🟡 P2 — strategy upgrades (from `SEO-STRATEGY.md`)
14. Glossary with `DefinedTerm` schema; comparison/"vs" pages; visa/work-permit programmatic cluster; hreflang if multilingual.

---

## 5. Migration risk callout

**Do not point the domain at this repo until P0 is complete.** As it stands, the new site would ship to Google with: no XML sitemap, a robots file advertising the *old* sitemap, no canonical tags, generic duplicate titles/descriptions on ~20 pages, and no structured data. That is the classic "rebuild tanked our rankings" scenario. The good news: every P0 item is a **port** of code that already exists and works in the current repo, not new invention.

### Content-source note (confirm with stakeholder)
This repo introduces **Sanity** as a CMS while also proxying the existing `jacksonandfrank.com/api`. The current live site had **removed Sanity** and reads only the custom CMS + manual posts. Decide explicitly: which content (blogs, countries, case studies) is served by Sanity vs. the custom API, so the sitemap/schema pull from the right source and nothing 404s at cutover.

---

## 6. Suggested order of work

1. Port `schema.ts`, `seo.ts`, `sitemap.ts`, `robots.ts`, `llms.txt` (P0 #1–5).
2. Wire `generateMetadata` + JSON-LD into `app/layout.tsx` and every route, including the dynamic `[country]` and `blog/[slug]` templates (P0 #6–8).
3. Finish the `.part` pages and verify URL parity (P1 #9–10).
4. Staging deploy → run the checklist in `SEO-STRATEGY.md` §11 → go/no-go.
5. Then layer P2 strategy upgrades.

*Re-audit as the repo changes; this reflects the clone taken 2026-07-01.*

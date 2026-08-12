#!/usr/bin/env node
/**
 * Bulk-submits every URL from the live sitemap to IndexNow.
 *
 * Usage:
 *   node scripts/indexnow-bulk.mjs
 *   node scripts/indexnow-bulk.mjs --host https://staging.jacksonandfrank.com
 *
 * IndexNow accepts up to 10,000 URLs per request. We chunk to 1,000 to stay safe.
 */

const KEY = '4a4e6028efc346a7ba19dddc62d3adf7'
const DEFAULT_HOST = 'https://jacksonandfrank.com'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'
const BATCH_SIZE = 1000

function parseArgs() {
  const args = process.argv.slice(2)
  const hostIdx = args.indexOf('--host')
  const host = hostIdx >= 0 ? args[hostIdx + 1] : DEFAULT_HOST
  return { host: host.replace(/\/$/, '') }
}

function hostnameOf(url) {
  return new URL(url).hostname
}

async function fetchSitemapUrls(host) {
  const sitemapUrl = `${host}/sitemap.xml`
  console.log(`Fetching ${sitemapUrl}`)
  const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'indexnow-bulk-script' } })
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`)
  }
  const xml = await res.text()
  const matches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  const urls = matches.map((m) => m[1].trim()).filter(Boolean)
  return Array.from(new Set(urls))
}

async function submitBatch(host, urls) {
  const payload = {
    host: hostnameOf(host),
    key: KEY,
    keyLocation: `${host}/${KEY}.txt`,
    urlList: urls,
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })
  const text = await res.text()
  return { status: res.status, body: text }
}

async function main() {
  const { host } = parseArgs()
  console.log(`IndexNow host: ${host}`)
  console.log(`Key file: ${host}/${KEY}.txt`)

  const verify = await fetch(`${host}/${KEY}.txt`)
  if (!verify.ok) {
    console.error(`\n✗ Key file not reachable (${verify.status}). Deploy public/${KEY}.txt first.`)
    process.exit(1)
  }
  const keyContent = (await verify.text()).trim()
  if (keyContent !== KEY) {
    console.error(`\n✗ Key file content mismatch. Expected "${KEY}", got "${keyContent}".`)
    process.exit(1)
  }
  console.log('✓ Key file verified')

  const urls = await fetchSitemapUrls(host)
  console.log(`Found ${urls.length} URLs in sitemap`)

  if (urls.length === 0) {
    console.error('Nothing to submit.')
    process.exit(1)
  }

  let submitted = 0
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    const { status, body } = await submitBatch(host, batch)
    const ok = status >= 200 && status < 300
    console.log(`Batch ${i / BATCH_SIZE + 1}: ${batch.length} URLs → ${status}${ok ? ' OK' : ` FAIL: ${body}`}`)
    if (ok) submitted += batch.length
  }

  console.log(`\nDone. Submitted ${submitted}/${urls.length} URLs to IndexNow.`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})

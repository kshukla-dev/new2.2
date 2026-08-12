import { NextRequest, NextResponse } from 'next/server'
import sitemap from '../sitemap'
import { SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-dynamic'

const KEY = '4a4e6028efc346a7ba19dddc62d3adf7'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'
const BATCH_SIZE = 1000

function hostnameOf(urlStr: string): string {
  try {
    return new URL(urlStr).hostname
  } catch {
    return urlStr
  }
}

async function submitBatch(host: string, urls: string[]) {
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
  return { status: res.status, body: text, ok: res.ok }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('key') || searchParams.get('token')
  const secret = process.env.INDEXNOW_SECRET

  // Authorization check
  if (token !== KEY && (!secret || token !== secret)) {
    return NextResponse.json(
      { error: 'Unauthorized. Please provide valid ?key= or ?token=' },
      { status: 401 }
    )
  }

  try {
    // 1. Determine current host
    const hostHeader = request.headers.get('x-forwarded-host') || request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const currentHost = hostHeader ? `${protocol}://${hostHeader}` : SITE_CONFIG.url
    const cleanHost = currentHost.replace(/\/$/, '')

    // 2. Fetch sitemap URLs dynamically
    const sitemapEntries = await sitemap()
    const urls = sitemapEntries.map((entry) => entry.url).filter(Boolean)

    if (urls.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No URLs found in sitemap to submit.' },
        { status: 400 }
      )
    }

    // 3. Submit in batches
    let submittedCount = 0
    const results = []

    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE)
      const { status, body, ok } = await submitBatch(cleanHost, batch)
      results.push({
        batchIndex: i / BATCH_SIZE + 1,
        urlsCount: batch.length,
        status,
        response: body,
      })
      if (ok) {
        submittedCount += batch.length
      }
    }

    const success = submittedCount > 0
    return NextResponse.json({
      success,
      host: hostnameOf(cleanHost),
      keyLocation: `${cleanHost}/${KEY}.txt`,
      totalUrls: urls.length,
      submittedCount,
      batches: results,
    }, { status: success ? 200 : 500 })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred during bulk sitemap submission'
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { urlList, host, key, keyLocation } = body

    if (!urlList || !Array.isArray(urlList) || urlList.length === 0) {
      return NextResponse.json({ error: 'urlList must be a non-empty array of URLs' }, { status: 400 })
    }

    const hostHeader = request.headers.get('x-forwarded-host') || request.headers.get('host')
    const protocol = request.headers.get('x-forwarded-proto') || 'https'
    const defaultHost = hostHeader ? `${protocol}://${hostHeader}` : SITE_CONFIG.url
    
    const cleanHost = (host || defaultHost).replace(/\/$/, '')
    const selectedKey = key || KEY

    const payload = {
      host: hostnameOf(cleanHost),
      key: selectedKey,
      keyLocation: keyLocation || `${cleanHost}/${selectedKey}.txt`,
      urlList: urlList,
    }

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    const responseText = await response.text()
    
    return new NextResponse(responseText || JSON.stringify({ success: response.ok }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid request body'
    return NextResponse.json({ error: errorMessage }, { status: 400 })
  }
}

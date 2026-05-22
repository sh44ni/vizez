import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { path, referrer, sessionId, visitorId } = body

    // Parse user agent
    const userAgent = req.headers.get('user-agent') || ''
    const device = parseDevice(userAgent)
    const browser = parseBrowser(userAgent)

    // Record page view
    await prisma.pageView.create({
      data: {
        path: path || '/',
        referrer: referrer || null,
        userAgent,
        device,
        browser,
        sessionId: sessionId || 'unknown',
        visitorId: visitorId || null,
      },
    })

    // Upsert visitor
    if (visitorId) {
      await prisma.visitor.upsert({
        where: { visitorId },
        update: { lastSeen: new Date(), device, browser },
        create: { visitorId, device, browser },
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}

function parseDevice(ua: string): string {
  if (/mobile|android|iphone|ipad|ipod/i.test(ua)) {
    if (/ipad|tablet/i.test(ua)) return 'Tablet'
    return 'Mobile'
  }
  return 'Desktop'
}

function parseBrowser(ua: string): string {
  if (/edg/i.test(ua)) return 'Edge'
  if (/chrome|chromium|crios/i.test(ua)) return 'Chrome'
  if (/firefox|fxios/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  if (/opera|opr/i.test(ua)) return 'Opera'
  return 'Other'
}

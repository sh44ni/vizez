import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const pageViews = await prisma.pageView.findMany({
      where: { createdAt: { gte: since } },
      select: { device: true, browser: true },
    })

    // Device breakdown
    const deviceMap = new Map<string, number>()
    const browserMap = new Map<string, number>()

    for (const pv of pageViews) {
      const device = pv.device || 'Unknown'
      const browser = pv.browser || 'Unknown'
      deviceMap.set(device, (deviceMap.get(device) || 0) + 1)
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1)
    }

    const devices = Array.from(deviceMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    const browsers = Array.from(browserMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)

    return NextResponse.json({ devices, browsers })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 })
  }
}

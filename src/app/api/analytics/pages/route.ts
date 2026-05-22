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
      select: { path: true, visitorId: true },
    })

    // Group by page path
    const pageMap = new Map<string, { views: number; visitors: Set<string> }>()

    for (const pv of pageViews) {
      const path = pv.path || '/'
      if (!pageMap.has(path)) {
        pageMap.set(path, { views: 0, visitors: new Set() })
      }
      const entry = pageMap.get(path)!
      entry.views++
      if (pv.visitorId) entry.visitors.add(pv.visitorId)
    }

    const pages = Array.from(pageMap.entries())
      .map(([path, data]) => ({
        path,
        views: data.views,
        uniqueVisitors: data.visitors.size,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20)

    return NextResponse.json({ pages })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

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
      select: { createdAt: true, visitorId: true },
      orderBy: { createdAt: 'asc' },
    })

    // Group by day
    const dailyMap = new Map<string, { views: number; visitors: Set<string> }>()

    for (let i = 0; i < days; i++) {
      const date = new Date(Date.now() - (days - 1 - i) * 24 * 60 * 60 * 1000)
      const key = date.toISOString().split('T')[0]
      dailyMap.set(key, { views: 0, visitors: new Set() })
    }

    for (const pv of pageViews) {
      const key = pv.createdAt.toISOString().split('T')[0]
      const entry = dailyMap.get(key)
      if (entry) {
        entry.views++
        if (pv.visitorId) entry.visitors.add(pv.visitorId)
      }
    }

    const labels: string[] = []
    const views: number[] = []
    const visitors: number[] = []

    for (const [date, data] of dailyMap) {
      labels.push(date)
      views.push(data.views)
      visitors.push(data.visitors.size)
    }

    return NextResponse.json({ labels, views, visitors })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 })
  }
}

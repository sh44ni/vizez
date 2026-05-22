import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

    // Current period stats
    const [totalPageViews, uniqueVisitors, totalContacts, newContacts] = await Promise.all([
      prisma.pageView.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.pageView.groupBy({
        by: ['visitorId'],
        where: { createdAt: { gte: thirtyDaysAgo }, visitorId: { not: null } },
      }),
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: { status: 'new' },
      }),
    ])

    // Previous period for trend comparison
    const [prevPageViews, prevVisitors] = await Promise.all([
      prisma.pageView.count({
        where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
      }),
      prisma.pageView.groupBy({
        by: ['visitorId'],
        where: {
          createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
          visitorId: { not: null },
        },
      }),
    ])

    const currentVisitors = uniqueVisitors.length
    const previousVisitors = prevVisitors.length

    const visitorTrend = previousVisitors > 0
      ? Math.round(((currentVisitors - previousVisitors) / previousVisitors) * 100)
      : currentVisitors > 0 ? 100 : 0

    const pageViewTrend = prevPageViews > 0
      ? Math.round(((totalPageViews - prevPageViews) / prevPageViews) * 100)
      : totalPageViews > 0 ? 100 : 0

    return NextResponse.json({
      visitors: { value: currentVisitors, trend: visitorTrend },
      pageViews: { value: totalPageViews, trend: pageViewTrend },
      contacts: { value: totalContacts, new: newContacts },
      bounceRate: { value: 0, trend: 0 },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch overview' }, { status: 500 })
  }
}

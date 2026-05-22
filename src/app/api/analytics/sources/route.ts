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
      select: { referrer: true },
    })

    const sourceMap = new Map<string, number>()
    const colors: Record<string, string> = {
      'Direct': '#0388CB',
      'Google': '#34A853',
      'Facebook': '#1877F2',
      'Twitter': '#1DA1F2',
      'LinkedIn': '#0A66C2',
      'Instagram': '#E4405F',
      'Other': '#8B5CF6',
    }

    for (const pv of pageViews) {
      let source = 'Direct'
      if (pv.referrer) {
        const ref = pv.referrer.toLowerCase()
        if (ref.includes('google')) source = 'Google'
        else if (ref.includes('facebook') || ref.includes('fb.')) source = 'Facebook'
        else if (ref.includes('twitter') || ref.includes('t.co')) source = 'Twitter'
        else if (ref.includes('linkedin')) source = 'LinkedIn'
        else if (ref.includes('instagram')) source = 'Instagram'
        else source = 'Other'
      }
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1)
    }

    const sources = Array.from(sourceMap.entries())
      .map(([name, value]) => ({
        name,
        value,
        color: colors[name] || '#8B5CF6',
      }))
      .sort((a, b) => b.value - a.value)

    return NextResponse.json({ sources })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch sources' }, { status: 500 })
  }
}

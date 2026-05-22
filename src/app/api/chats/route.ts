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
    const sessionId = searchParams.get('sessionId')

    // If sessionId provided, return that session's messages
    if (sessionId) {
      const chatSession = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: {
          messages: { orderBy: { createdAt: 'asc' } },
        },
      })

      if (!chatSession) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      return NextResponse.json({ session: chatSession })
    }

    // Otherwise return all sessions with message count
    const sessions = await prisma.chatSession.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 50,
      include: {
        _count: { select: { messages: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 1,
          where: { role: 'user' },
        },
      },
    })

    const formatted = sessions.map((s) => ({
      id: s.id,
      visitorId: s.visitorId,
      status: s.status,
      messageCount: s._count.messages,
      firstMessage: s.messages[0]?.content || '',
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }))

    return NextResponse.json({ sessions: formatted })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
  }
}

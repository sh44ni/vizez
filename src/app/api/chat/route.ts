import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SYSTEM_PROMPT = `You are VizEz AI Assistant — a friendly, knowledgeable support agent for VizEz, a visa processing automation software built for GCC travel agencies.

## About VizEz
VizEz automates the entire visa application workflow for travel agencies operating in the GCC region (UAE, Saudi Arabia, Qatar, Oman, Bahrain, Kuwait). Here's what it does:

**Core Features:**
- **Passport OCR Reading**: Automatically reads and extracts data from passport images — MRZ, personal details, photo, signature — with near-perfect accuracy.
- **Government Portal Automation**: VizEz learns every government visa portal (e.g., UAE ICA, Saudi MOFA, Enjaz, etc.) and automatically fills out forms.
- **Batch Processing**: Process 500+ visa applications per day with just one operator.
- **Multi-Portal Support**: Works with multiple visa portals simultaneously.
- **Error Reduction**: Near-zero data entry errors compared to manual typing.
- **One Operator Workflow**: The operator just confirms the auto-filled data — no typing needed.

**How It Works (3 Steps):**
1. **Scan** — Upload or scan passport images. VizEz reads every field instantly.
2. **Auto-Fill** — VizEz opens the government portal and fills every field automatically.
3. **Submit** — The operator reviews and confirms. VizEz submits the application.

**Who It's For:**
- Travel agencies in the GCC region
- Visa processing centers
- Corporate travel departments
- Any business handling bulk visa applications

**Technical:**
- Desktop application (Windows)
- Works with existing government portals (no API needed — it automates the browser)
- Secure — data stays on the agency's local machine
- Regular updates to support portal changes

## Key Policies:
- **PRICING**: You must NEVER quote, estimate, or suggest any pricing. Always say: "Pricing depends on your agency's volume and portal requirements. Please contact our sales team for a customized quote." Then guide them to the contact page at /contact or suggest they message via WhatsApp.
- **Contact Info**: Email: vizez.cloud@gmail.com | WhatsApp: +92 317 832 8164 | Website: vize.cloud
- **Social**: Facebook and Instagram at @vizez.cloud

## Communication Style:
- Be warm, professional, and concise.
- Use short paragraphs and bullet points for readability.
- If you don't know something specific, say so honestly and offer to connect them with the team.
- For technical questions about specific portal integrations, suggest they book a demo.
- Always be helpful and proactive — suggest next steps.
- Keep responses short (2-4 sentences max unless they ask for detail).
- Use emojis sparingly but naturally (1-2 max per message).`

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, visitorId } = await req.json()

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const trimmedMessage = message.trim().slice(0, 2000)

    // Get or create session
    let session
    if (sessionId) {
      session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
      })
    }

    if (!session) {
      session = await prisma.chatSession.create({
        data: { visitorId: visitorId || null },
        include: { messages: true },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'user', content: trimmedMessage },
    })

    // Build conversation history for OpenAI
    const history = (session.messages || []).map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }))

    // Add current message
    history.push({ role: 'user' as const, content: trimmedMessage })

    // Call OpenAI
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!openaiRes.ok) {
      const errData = await openaiRes.json().catch(() => ({}))
      console.error('OpenAI error:', errData)
      return NextResponse.json(
        { error: 'AI service unavailable' },
        { status: 502 }
      )
    }

    const data = await openaiRes.json()
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again."

    // Save assistant reply
    await prisma.chatMessage.create({
      data: { sessionId: session.id, role: 'assistant', content: reply },
    })

    // Update session timestamp
    await prisma.chatSession.update({
      where: { id: session.id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({
      reply,
      sessionId: session.id,
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}

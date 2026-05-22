'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { usePathname } from 'next/navigation'

interface ActionButton {
  label: string
  icon: string
  href: string
  external?: boolean
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  actions?: ActionButton[]
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('vizez_visitor_id') || ''
}

/* ── Smart action button detection ── */
function detectActions(text: string): ActionButton[] {
  const lower = text.toLowerCase()
  const actions: ActionButton[] = []

  // WhatsApp
  if (
    lower.includes('whatsapp') ||
    lower.includes('+92 317') ||
    lower.includes('+923178')
  ) {
    actions.push({
      label: 'Open WhatsApp',
      icon: '💬',
      href: 'https://wa.me/923178328164?text=' + encodeURIComponent("Hi, I'd like to see VizEz for my agency"),
      external: true,
    })
  }

  // Email
  if (
    lower.includes('vizez.cloud@gmail.com') ||
    lower.includes('email us') ||
    lower.includes('send us an email') ||
    lower.includes('reach out via email') ||
    lower.includes('our email')
  ) {
    actions.push({
      label: 'Send Email',
      icon: '✉️',
      href: 'mailto:vizez.cloud@gmail.com',
      external: true,
    })
  }

  // Contact / Demo / Sales
  if (
    lower.includes('/contact') ||
    lower.includes('contact page') ||
    lower.includes('contact our sales') ||
    lower.includes('contact the sales') ||
    lower.includes('contact sales') ||
    lower.includes('book a demo') ||
    lower.includes('schedule a demo') ||
    lower.includes('get in touch') ||
    lower.includes('fill out the form') ||
    lower.includes('customized quote')
  ) {
    actions.push({
      label: 'Contact Sales',
      icon: '📋',
      href: '/contact',
    })
  }

  // Privacy
  if (
    lower.includes('privacy policy') ||
    lower.includes('privacy page') ||
    lower.includes('/privacy')
  ) {
    actions.push({
      label: 'Privacy Policy',
      icon: '🔒',
      href: '/privacy',
    })
  }

  // Terms
  if (
    lower.includes('terms of service') ||
    lower.includes('terms and conditions') ||
    lower.includes('/terms')
  ) {
    actions.push({
      label: 'Terms of Service',
      icon: '📄',
      href: '/terms',
    })
  }

  // Facebook
  if (lower.includes('facebook')) {
    actions.push({
      label: 'Facebook',
      icon: '👍',
      href: 'https://www.facebook.com/profile.php?id=61590168394681',
      external: true,
    })
  }

  // Instagram
  if (lower.includes('instagram')) {
    actions.push({
      label: 'Instagram',
      icon: '📸',
      href: 'https://instagram.com/vizez.cloud',
      external: true,
    })
  }

  return actions
}

/* ── Quick Suggestion Chips ── */
const QUICK_SUGGESTIONS = [
  'What does VizEz do?',
  'Which portals do you support?',
  'How do I get started?',
  'Contact sales',
]

export default function ChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi there! 👋 I'm the VizEz AI assistant. Ask me anything about our visa automation software — how it works, what portals we support, or how to get started!",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Don't show on admin pages
  if (pathname.startsWith('/admin')) return null

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (open) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [open, messages])

  const sendMessage = async (msg: string) => {
    if (!msg || loading) return

    const userMsg: Message = { id: generateId(), role: 'user', content: msg }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          sessionId,
          visitorId: getVisitorId(),
        }),
      })

      if (!res.ok) throw new Error('Failed')

      const data = await res.json()
      setSessionId(data.sessionId)

      const reply = data.reply
      const actions = detectActions(reply)

      const botMsg: Message = {
        id: generateId(),
        role: 'assistant',
        content: reply,
        actions: actions.length > 0 ? actions : undefined,
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment, or reach out to us directly at vizez.cloud@gmail.com",
          actions: [
            { label: 'Send Email', icon: '✉️', href: 'mailto:vizez.cloud@gmail.com', external: true },
            { label: 'Open WhatsApp', icon: '💬', href: 'https://wa.me/923178328164', external: true },
          ],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input.trim())
  }

  // Show quick suggestions only when there's just the welcome message
  const showSuggestions = messages.length === 1

  return (
    <>
      {/* Floating bubble */}
      <button
        className={`chat-bubble ${open ? 'chat-bubble-hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        id="chat-bubble"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.55 6.8 19.75L2 21L3.25 16.2C2.45 14.8 2 13.2 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="11.5" r="1" fill="currentColor" />
          <circle cx="11.5" cy="11.5" r="1" fill="currentColor" />
          <circle cx="15" cy="11.5" r="1" fill="currentColor" />
        </svg>
        <span className="chat-bubble-pulse" />
      </button>

      {/* Chat panel */}
      <div className={`chat-panel ${open ? 'chat-panel-open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-header-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="currentColor"
                  opacity="0.2"
                />
                <path
                  d="M12 6c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z"
                  fill="currentColor"
                />
                <path
                  d="M16 11c0 2.21-1.79 4-4 4s-4-1.79-4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line x1="12" y1="15" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="18" x2="15" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <span className="chat-header-name">VizEz AI</span>
              <span className="chat-header-status">
                <span className="chat-status-dot" />
                Online
              </span>
            </div>
          </div>
          <button
            className="chat-close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            id="chat-close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-msg ${msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-bot'}`}
            >
              {msg.role === 'assistant' && (
                <div className="chat-msg-avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.15" />
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div className="chat-msg-content-wrap">
                <div className="chat-msg-bubble">
                  {msg.content}
                </div>
                {/* Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="chat-actions">
                    {msg.actions.map((action, i) => (
                      <a
                        key={i}
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="chat-action-btn"
                      >
                        <span className="chat-action-icon">{action.icon}</span>
                        <span className="chat-action-label">{action.label}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="chat-action-arrow">
                          {action.external ? (
                            <path d="M3 9L9 3M9 3H4.5M9 3V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          ) : (
                            <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Quick Suggestions */}
          {showSuggestions && !loading && (
            <div className="chat-suggestions">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chat-suggestion-chip"
                  onClick={() => sendMessage(s)}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="chat-msg chat-msg-bot">
              <div className="chat-msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" opacity="0.15" />
                  <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="chat-msg-bubble chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chat-input-bar" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Ask about VizEz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            id="chat-input"
            maxLength={2000}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={loading || !input.trim()}
            id="chat-send"
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7 9M14 2L10 14L7 9M14 2L2 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}

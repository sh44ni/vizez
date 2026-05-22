'use client'

import { useEffect, useState, useCallback } from 'react'

interface ChatSession {
  id: string
  visitorId: string | null
  status: string
  messageCount: number
  firstMessage: string
  createdAt: string
  updatedAt: string
}

interface ChatMsg {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface SessionDetail {
  id: string
  visitorId: string | null
  createdAt: string
  messages: ChatMsg[]
}

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [selected, setSelected] = useState<SessionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)

  const fetchSessions = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/chats', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setSessions(data.sessions ?? [])
      }
    } catch {
      /* silent */
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  async function openSession(id: string) {
    setDetailLoading(true)
    try {
      const res = await fetch(`/api/chats?sessionId=${id}`, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setSelected(data.session)
      }
    } catch {
      /* silent */
    } finally {
      setDetailLoading(false)
    }
  }

  function formatTime(dateStr: string) {
    const d = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    const diffHr = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHr / 24)

    if (diffMin < 1) return 'Just now'
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHr < 24) return `${diffHr}h ago`
    if (diffDay < 7) return `${diffDay}d ago`
    return d.toLocaleDateString()
  }

  return (
    <div className="admin-chats">
      <div className="admin-chats-layout">
        {/* Sessions list */}
        <div className="admin-chats-sidebar">
          <div className="admin-chats-sidebar-header">
            <h3 className="admin-chats-sidebar-title">Chat Sessions</h3>
            <span className="admin-chats-count">{sessions.length}</span>
          </div>

          {loading ? (
            <div className="admin-chats-loading">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="admin-skeleton" style={{ height: '68px', marginBottom: '8px' }} />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="admin-empty" style={{ padding: '40px 20px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 12px', display: 'block', opacity: 0.3 }}>
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.55 6.8 19.75L2 21L3.25 16.2C2.45 14.8 2 13.2 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="admin-empty-title">No chats yet</p>
              <p className="admin-empty-desc">Chat conversations will appear here when visitors use the chatbot.</p>
            </div>
          ) : (
            <ul className="admin-chats-list">
              {sessions.map((s) => (
                <li key={s.id}>
                  <button
                    className={`admin-chats-session ${selected?.id === s.id ? 'admin-chats-session-active' : ''}`}
                    onClick={() => openSession(s.id)}
                    id={`chat-session-${s.id}`}
                  >
                    <div className="admin-chats-session-top">
                      <span className="admin-chats-visitor">
                        {s.visitorId ? `Visitor ${s.visitorId.slice(0, 6)}…` : 'Anonymous'}
                      </span>
                      <span className="admin-chats-time">{formatTime(s.updatedAt)}</span>
                    </div>
                    <p className="admin-chats-preview">
                      {s.firstMessage
                        ? s.firstMessage.length > 60
                          ? s.firstMessage.slice(0, 60) + '…'
                          : s.firstMessage
                        : 'No messages'}
                    </p>
                    <span className="admin-chats-badge">{s.messageCount} msgs</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chat detail */}
        <div className="admin-chats-detail">
          {detailLoading ? (
            <div className="admin-chats-loading" style={{ padding: '40px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="admin-skeleton" style={{ height: '48px', marginBottom: '12px', width: i % 2 === 0 ? '60%' : '80%' }} />
              ))}
            </div>
          ) : selected ? (
            <>
              <div className="admin-chats-detail-header">
                <div>
                  <h3>
                    {selected.visitorId
                      ? `Visitor ${selected.visitorId.slice(0, 8)}…`
                      : 'Anonymous Session'}
                  </h3>
                  <span className="admin-chats-detail-meta">
                    Started {new Date(selected.createdAt).toLocaleString()} · {selected.messages.length} messages
                  </span>
                </div>
              </div>
              <div className="admin-chats-transcript">
                {selected.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`admin-chats-msg ${msg.role === 'user' ? 'admin-chats-msg-user' : 'admin-chats-msg-bot'}`}
                  >
                    <div className="admin-chats-msg-label">
                      {msg.role === 'user' ? '👤 Visitor' : '🤖 VizEz AI'}
                      <span className="admin-chats-msg-time">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="admin-chats-msg-content">{msg.content}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="admin-chats-empty-detail">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.2 }}>
                <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.55 6.8 19.75L2 21L3.25 16.2C2.45 14.8 2 13.2 2 11.5C2 6.25 6.25 2 11.5 2C16.75 2 21 6.25 21 11.5Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p>Select a chat session to view the conversation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

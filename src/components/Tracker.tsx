'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function getVisitorId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('vizez_visitor_id')
  if (!id) {
    id = generateId()
    localStorage.setItem('vizez_visitor_id', id)
  }
  return id
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('vizez_session_id')
  if (!id) {
    id = generateId()
    sessionStorage.setItem('vizez_session_id', id)
  }
  return id
}

export default function Tracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return

    const visitorId = getVisitorId()
    const sessionId = getSessionId()

    const data = {
      path: pathname,
      referrer: document.referrer || null,
      visitorId,
      sessionId,
    }

    // Use sendBeacon for reliability, fallback to fetch
    const payload = JSON.stringify(data)
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
    } else {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  }, [pathname])

  return null
}

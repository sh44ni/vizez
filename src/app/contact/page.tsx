'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import Image from 'next/image'

/* ── Country code data (GCC-first, then common countries) ── */
const COUNTRY_CODES = [
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
]

/* ── Searchable Country Code Selector ── */
function CountryCodeSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (code: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const selected = COUNTRY_CODES.find((c) => c.code === value) || COUNTRY_CODES[0]

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(
        (c) =>
          c.country.toLowerCase().includes(search.toLowerCase()) ||
          c.code.includes(search)
      )
    : COUNTRY_CODES

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search on open
  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus()
    }
  }, [open])

  return (
    <div className="country-code-select" ref={ref}>
      <button
        type="button"
        className="country-code-trigger"
        onClick={() => {
          setOpen(!open)
          setSearch('')
        }}
        id="country-code-btn"
      >
        <span className="country-code-flag">{selected.flag}</span>
        <span className="country-code-value">{selected.code}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`country-code-chevron ${open ? 'country-code-chevron-open' : ''}`}
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="country-code-dropdown">
          <div className="country-code-search-wrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="country-code-search-icon">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              className="country-code-search"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="country-code-search"
            />
          </div>
          <ul className="country-code-list">
            {filtered.length === 0 ? (
              <li className="country-code-empty">No results</li>
            ) : (
              filtered.map((c, i) => (
                <li key={`${c.code}-${c.country}-${i}`}>
                  <button
                    type="button"
                    className={`country-code-option ${c.code === value ? 'country-code-option-active' : ''}`}
                    onClick={() => {
                      onChange(c.code)
                      setOpen(false)
                      setSearch('')
                    }}
                    id={`country-option-${c.country.replace(/\s/g, '-').toLowerCase()}`}
                  >
                    <span className="country-code-flag">{c.flag}</span>
                    <span className="country-code-name">{c.country}</span>
                    <span className="country-code-dial">{c.code}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ── Contact Page ── */
export default function ContactPage() {
  const whatsappUrl =
    'https://wa.me/923178328164?text=' +
    encodeURIComponent("Hi, I'd like to see VizEz for my agency")

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '+971',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          phone: form.phone ? `${form.countryCode} ${form.phone}` : '',
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
      setForm({ name: '', email: '', company: '', phone: '', countryCode: '+971', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="contact-page section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact VizEz AI Sales Team',
            description: 'Request a live AI demo of VizEz visa automation. See AI process your real passports on your real portal.',
            url: 'https://vize.cloud/contact',
          }),
        }}
      />
      <div className="container">
        <div className="contact-hero-row">
          {/* Left: heading + form */}
          <div className="contact-left">
            <h1>Request Your AI Demo</h1>
            <p className="contact-intro">
              See VizEz AI running on your real passports and your real portal. No
              slides, no mockups — just our intelligent automation processing your workflow live.
            </p>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-form-success">
                  <div className="contact-form-success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#22C55E" strokeWidth="2" />
                      <path
                        d="M8 12L11 15L16 9"
                        stroke="#22C55E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    className="btn-secondary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-name">Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="contact-email">Email *</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-company">Company</label>
                      <input
                        id="contact-company"
                        type="text"
                        placeholder="Travel agency name"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                      />
                    </div>
                    <div className="contact-form-group">
                      <label htmlFor="contact-phone">Phone</label>
                      <div className="contact-phone-field">
                        <CountryCodeSelect
                          value={form.countryCode}
                          onChange={(code) =>
                            setForm({ ...form, countryCode: code })
                          }
                        />
                        <input
                          id="contact-phone"
                          type="tel"
                          placeholder="XX XXX XXXX"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="contact-phone-input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us about your agency, how many visas you process daily, and which portals you use..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  {error && <p className="contact-form-error">{error}</p>}
                  <button
                    type="submit"
                    className="btn-primary btn-lg"
                    disabled={submitting}
                    id="contact-submit-btn"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="btn-icon"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="contact-right">
            <div className="contact-image-wrap">
              <Image
                src="/contact-form.jpeg"
                alt="VizEz visa automation in action"
                width={600}
                height={750}
                className="contact-hero-image"
                priority
              />
              <div className="contact-image-glow" />
            </div>
          </div>
        </div>

        {/* Quick Contact Methods */}
        <div className="contact-grid">
          <div className="contact-method">
            <h3>WhatsApp</h3>
            <p>
              The fastest way to reach our AI team. Send a message and we&apos;ll typically
              respond within a few hours.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Message us on WhatsApp
            </a>
          </div>

          <div className="contact-method">
            <h3>Email</h3>
            <p>
              Prefer email? Reach our AI team and we&apos;ll get back to you within one
              business day.
            </p>
            <a href="mailto:vizez.cloud@gmail.com" className="btn-secondary">
              vizez.cloud@gmail.com
            </a>
          </div>
        </div>

        <div className="contact-social" style={{ marginTop: '64px' }}>
          <h3>Follow VizEz AI</h3>
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
            <a
              href="https://www.facebook.com/profile.php?id=61590168394681"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/vizez.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

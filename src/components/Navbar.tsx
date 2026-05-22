'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner container">
          <Link href="/" className="navbar-logo">
            <Image
              src="/logo.svg"
              alt="VizEz"
              width={100}
              height={36}
              priority
              className="navbar-logo-img"
            />
          </Link>

          <nav className="navbar-links" aria-label="Main navigation">
            <Link href="/product">Product</Link>
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
          </nav>

          <Link href="/contact" className="btn-primary navbar-cta">
            Contact Sales
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="btn-icon">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`hamburger ${mobileOpen ? 'hamburger-open' : ''}`}>
              <span /><span /><span />
            </span>
          </button>
        </div>
      </header>

      {/* Backdrop overlay — closes menu on tap */}
      {mobileOpen && (
        <div
          className="navbar-mobile-overlay"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile slide-in menu */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'navbar-mobile-menu-open' : ''}`}>
        {/* Close button inside the menu */}
        <button
          className="navbar-mobile-close"
          onClick={closeMobile}
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <nav className="navbar-mobile-links">
          <Link href="/product" onClick={closeMobile}>Product</Link>
          <Link href="/how-it-works" onClick={closeMobile}>How It Works</Link>
          <Link href="/about" onClick={closeMobile}>About</Link>
          <Link href="/faq" onClick={closeMobile}>FAQ</Link>
          <Link href="/contact" className="btn-primary" onClick={closeMobile}>
            Contact Sales
          </Link>
        </nav>
      </div>
    </>
  )
}

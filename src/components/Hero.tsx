'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Hero() {

  const prefersReducedMotion = useReducedMotion()

  const easing = [0.25, 0.1, 0.25, 1] as const

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: easing },
      }

  const fadeUpDelay = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: easing },
        }

  return (
    <section className="hero">
      {/* Animated background orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

      {/* Grid overlay */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-inner container">
        <div className="hero-content">
          <motion.h1 {...fadeUp} className="hero-headline">
            AI That Sees Every Passport.
            <br />
            <span className="gradient-text">Fills Every Portal. Instantly.</span>
          </motion.h1>

          <motion.p {...fadeUpDelay(0.15)} className="hero-subline">
            VizEz deploys neural OCR and intelligent automation to read any passport, verify every field, and auto-fill government visa portals — so one operator can process 500+ applications a day with near-zero errors.
          </motion.p>

          <motion.div {...fadeUpDelay(0.25)} className="hero-buttons">
            <a href="/contact" className="btn-primary btn-glow">
              <span className="btn-text">Request Your AI Demo</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#hero-video" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon-left">
                <path d="M6 4L11 8L6 12V4Z" fill="currentColor"/>
              </svg>
              See the AI in action
            </a>
          </motion.div>
        </div>

        {/* Cinematic 3D Mockup */}
        <motion.div
          className="hero-mockup"
          id="hero-video"
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 60 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
              })}
        >
          {/* Gradient edge glow */}
          <div className="hero-mockup-border-glow" aria-hidden="true" />

          {/* Ambient underglow */}
          <div className="hero-mockup-underglow" aria-hidden="true" />

          {/* The screen */}
          <div className="hero-mockup-screen">
            <div className="hero-mockup-screen-shine" aria-hidden="true" />
            <video
              src="/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="VizEz AI automatically filling a visa portal form in real-time"
              className="hero-mockup-video"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

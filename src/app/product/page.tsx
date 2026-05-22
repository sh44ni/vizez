import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI-Powered Visa Automation Platform — VizEz Features',
  description:
    'Explore VizEz: neural passport OCR, intelligent portal auto-fill, AI batch processing, and adaptive multi-portal support. The complete AI platform for travel agency visa automation.',
}

const features = [
  {
    title: 'Neural Passport OCR',
    description:
      'AI reads the MRZ code and visual zone of every passport page. Extracts full name, nationality, date of birth, passport number, expiry, photo, and signature — in under two seconds per document using deep learning models trained on 190+ countries.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <circle cx="9" cy="11" r="2.5" />
        <path d="M14 9h4M14 12h3M6 17h12" />
      </svg>
    ),
  },
  {
    title: 'Intelligent Portal Automation',
    description:
      'VizEz AI learns the layout of each government visa portal — fields, dropdowns, date pickers, file uploads. It auto-fills every form element with the precision of an expert operator, but at machine speed and with zero typos.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 9v12" />
      </svg>
    ),
  },
  {
    title: 'AI Batch Processing',
    description:
      'Process 500+ visa applications per day with a single operator. Load a stack of passports, scan them in sequence, and let VizEz AI fill and submit each application back-to-back — intelligently handling variations across documents.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <rect x="6" y="4" width="12" height="2" rx="1" />
        <rect x="8" y="2" width="8" height="2" rx="1" />
        <path d="M9 13l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Adaptive Multi-Portal AI',
    description:
      'One AI platform, every portal. VizEz supports UAE ICA, Saudi MOFA, Enjaz, Bahrain LMRA, Qatar MOI, Oman ROP, Kuwait MOI, and more — with new portals learned by our AI regularly based on agency demand.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
  },
  {
    title: 'AI Error Elimination',
    description:
      'Near-zero data entry errors through machine intelligence. Neural OCR reads directly from the passport — no manual transcription, no typos, no mismatched fields. Every entry is AI-validated before submission.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
  },
  {
    title: 'Security',
    description:
      'Your data never leaves your machine. VizEz runs as a Windows desktop application — passport images and applicant data stay on your local system. No cloud uploads, no third-party storage. AI processing happens locally.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l7 4v5c0 5.25-3.5 9.74-7 11-3.5-1.26-7-5.75-7-11V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
]

export default function ProductPage() {
  return (
    <div className="product-page">
      {/* Hero */}
      <section className="section product-hero">
        <div className="container">
          <span className="section-label">Product</span>
          <h1>
            The Complete <span className="gradient-text">AI Visa Automation</span> Platform
          </h1>
          <p className="product-hero-description">
            From passport scan to portal submission — VizEz AI handles the entire visa workflow with machine intelligence. Built for travel agencies that process hundreds of visas daily and demand near-zero errors.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section product-features">
        <div className="container">
          <span className="section-label">AI Capabilities</span>
          <h2>
            Everything you need to <span className="gradient-text">automate visa processing with AI</span>
          </h2>
          <p className="product-features-subtitle">
            Six AI-powered capabilities that replace hours of manual data entry with seconds of intelligent, automated processing.
          </p>
          <div className="product-features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="product-feature-card">
                <div className="product-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Integrates */}
      <section className="section product-integration">
        <div className="container">
          <span className="section-label">AI Integration</span>
          <h2>
            AI that works with your <span className="gradient-text">existing portals</span>
          </h2>
          <div className="product-integration-content">
            <div className="product-integration-block">
              <h3>No API required — AI adapts</h3>
              <p>
                Government visa portals don&apos;t offer APIs — they weren&apos;t built for
                automation. VizEz AI doesn&apos;t need one. It intelligently automates the browser itself, interacting
                with portal forms exactly as a human operator would, but faster and without mistakes.
              </p>
            </div>
            <div className="product-integration-block">
              <h3>AI that learns any portal</h3>
              <p>
                VizEz AI maps the structure of each visa portal — input fields, dropdowns, date
                selectors, file uploads, captcha flows. When portals update their layouts, the AI
                adapts automatically. Your workflow never breaks.
              </p>
            </div>
            <div className="product-integration-block">
              <h3>Zero workflow disruption</h3>
              <p>
                You don&apos;t need to change how your agency operates. VizEz AI plugs into your
                existing process — same portals, same credentials, same submission flow. The only
                difference: it&apos;s 10x faster and powered by machine intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Portals */}
      <section className="section product-portals">
        <div className="container">
          <span className="section-label">AI Portal Support</span>
          <h2>
            Portals our AI <span className="gradient-text">automates</span>
          </h2>
          <div className="product-portals-grid">
            {[
              'UAE ICA',
              'Saudi MOFA',
              'Enjaz',
              'Bahrain LMRA',
              'Qatar MOI',
              'Oman ROP',
              'Kuwait MOI',
              'And more...',
            ].map((portal) => (
              <div key={portal} className="product-portal-tag">
                {portal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section product-cta">
        <div className="container">
          <h2>
            Ready to automate your <span className="gradient-text">visa workflow with AI</span>?
          </h2>
          <p className="product-cta-description">
            See VizEz AI process real passports on your real portal. Book a live demo with our AI team.
          </p>
          <div className="product-cta-buttons">
            <Link href="/contact" className="btn-primary">
              Book an AI Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              See How AI Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How AI Processes Visa Applications — VizEz Workflow',
  description:
    'Three AI-powered steps: scan the passport, auto-fill the portal with neural OCR, review and submit. See how VizEz AI automates your entire visa processing workflow.',
}

const steps = [
  {
    number: '01',
    title: 'Scan',
    heading: 'Upload or scan passport images for AI processing',
    description:
      'Place the passport on your scanner or snap a photo with your camera. VizEz AI reads every field instantly — full name, nationality, passport number, date of birth, expiry date, photo, and signature — using neural OCR that processes the MRZ code and visual zone simultaneously.',
    details: [
      'Supports flatbed scanners, document cameras, and phone cameras',
      'AI reads MRZ (Machine Readable Zone) and visual zone fields',
      'Extracts photo and signature automatically',
      'AI processes each passport in under 2 seconds',
      'AI handles worn, faded, and non-Latin script passports',
    ],
  },
  {
    number: '02',
    title: 'Auto-Fill',
    heading: 'VizEz AI fills the portal automatically',
    description:
      'VizEz AI opens the government visa portal in your browser and fills every field automatically — text inputs, dropdowns, date pickers, nationality selectors, file uploads. Its intelligent automation interacts with the portal exactly as a human would, but at machine speed and without errors.',
    details: [
      'Fills text fields, dropdowns, radio buttons, and date pickers',
      'Uploads passport photo and signature to the correct fields',
      'Handles multi-page forms and conditional fields',
      'Adapts when portal layouts change',
      'No API or portal integration required — works via AI browser automation',
    ],
  },
  {
    number: '03',
    title: 'Review & Submit',
    heading: 'Operator confirms, AI submits',
    description:
      'Before submission, VizEz AI pauses for operator review. The operator verifies the auto-filled data against the original passport, makes any adjustments if needed, and confirms. VizEz then submits the application and intelligently moves to the next passport in the queue.',
    details: [
      'Visual diff between OCR output and filled form for quick verification',
      'One-click corrections for any field',
      'Automatic queue progression — next passport loads immediately',
      'AI batch mode for processing 500+ applications per day',
      'AI-generated audit trail of every submission',
    ],
  },
]

const portals = [
  { name: 'UAE ICA', country: 'United Arab Emirates' },
  { name: 'Saudi MOFA', country: 'Saudi Arabia' },
  { name: 'Enjaz', country: 'Saudi Arabia' },
  { name: 'Bahrain LMRA', country: 'Bahrain' },
  { name: 'Qatar MOI', country: 'Qatar' },
  { name: 'Oman ROP', country: 'Oman' },
  { name: 'Kuwait MOI', country: 'Kuwait' },
]

const requirements = [
  {
    title: 'Operating System',
    value: 'Windows 10 or later (64-bit)',
  },
  {
    title: 'Internet',
    value: 'Standard broadband connection',
  },
  {
    title: 'Scanner',
    value: 'Any flatbed scanner, document camera, or phone camera',
  },
  {
    title: 'Browser',
    value: 'Google Chrome (latest version recommended)',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="hiw-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Process Visa Applications with VizEz AI',
            description: 'Three AI-powered steps to automate visa processing: scan passports, AI auto-fill portal forms, and review before submission.',
            step: [
              { '@type': 'HowToStep', name: 'Scan', text: 'Upload or scan passport images for AI processing' },
              { '@type': 'HowToStep', name: 'Auto-Fill', text: 'VizEz AI fills the government portal automatically' },
              { '@type': 'HowToStep', name: 'Review & Submit', text: 'Operator confirms the AI-filled data and submits' },
            ],
          }),
        }}
      />
      {/* Hero */}
      <section className="section hiw-hero">
        <div className="container">
          <span className="section-label">How It Works</span>
          <h1>
            Three AI-powered steps from <span className="gradient-text">passport to submission</span>
          </h1>
          <p className="hiw-hero-description">
            VizEz AI replaces the most time-consuming part of visa processing — manual data entry.
            Scan, AI auto-fill, review. That&apos;s it.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section hiw-steps">
        <div className="container">
          {steps.map((step) => (
            <div key={step.number} className="hiw-step">
              <div className="hiw-step-header">
                <span className="hiw-step-number">{step.number}</span>
                <span className="hiw-step-title">{step.title}</span>
              </div>
              <div className="hiw-step-body">
                <h2>{step.heading}</h2>
                <p className="hiw-step-description">{step.description}</p>
                <ul className="hiw-step-details">
                  {step.details.map((detail) => (
                    <li key={detail}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="hiw-check-icon">
                        <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portal Compatibility */}
      <section className="section hiw-portals">
        <div className="container">
          <span className="section-label">AI Compatibility</span>
          <h2>
            Portals our AI <span className="gradient-text">supports</span>
          </h2>
          <p className="hiw-portals-subtitle">
            VizEz AI works with the major GCC government visa portals. New portals are learned by our AI regularly based on agency demand.
          </p>
          <div className="hiw-portals-grid">
            {portals.map((portal) => (
              <div key={portal.name} className="hiw-portal-card">
                <h3>{portal.name}</h3>
                <p>{portal.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="section hiw-requirements">
        <div className="container">
          <span className="section-label">Setup Requirements</span>
          <h2>
            What you <span className="gradient-text">need to deploy AI</span>
          </h2>
          <div className="hiw-requirements-grid">
            {requirements.map((req) => (
              <div key={req.title} className="hiw-requirement-card">
                <h3>{req.title}</h3>
                <p>{req.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section hiw-cta">
        <div className="container">
          <h2>
            See the AI <span className="gradient-text">live</span>
          </h2>
          <p className="hiw-cta-description">
            The best way to understand VizEz is to watch our AI process your real passports on your real portal. Book a live demo — we&apos;ll set everything up and walk you through the full AI-powered workflow.
          </p>
          <div className="hiw-cta-buttons">
            <Link href="/contact" className="btn-primary">
              Book a Live AI Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/product" className="btn-secondary">
              Explore AI Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

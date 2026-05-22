'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: 'What is VizEz AI?',
    answer:
      'VizEz is an AI-powered visa processing automation platform built for travel agencies. It uses neural OCR to read passport data, intelligent verification to validate every field, and adaptive automation to fill government visa portal forms — letting operators process hundreds of applications per day with near-zero errors. It runs as a Windows desktop application — your data never leaves your machine.',
  },
  {
    question: 'How does VizEz AI read passports?',
    answer:
      'VizEz uses deep learning neural OCR to read both the MRZ (Machine Readable Zone) and the visual zone of passport pages. The AI extracts full name, nationality, passport number, date of birth, expiry date, photo, and signature — all in under two seconds. It handles worn passports, faded text, and non-Latin scripts with near-perfect accuracy across 190+ countries.',
  },
  {
    question: 'Which government portals does VizEz AI support?',
    answer:
      'VizEz AI currently supports UAE ICA, Saudi MOFA, Enjaz, Bahrain LMRA, Qatar MOI, Oman ROP, and Kuwait MOI. Our adaptive AI learns new portals regularly based on agency demand. If your portal isn\'t listed, contact us — our AI can typically learn support within weeks.',
  },
  {
    question: 'Do I need to change my current workflow?',
    answer:
      'No. VizEz AI integrates seamlessly with your existing portals, credentials, and submission process. The AI works through your same government portals — it just handles the data entry intelligently. Same login, same portal, same workflow — minus the manual typing.',
  },
  {
    question: 'Is passport data secure with AI processing?',
    answer:
      'Yes. VizEz runs as a local Windows desktop application. Passport images and applicant data stay on your machine — nothing is uploaded to external AI cloud services or third-party servers. All AI processing happens locally with end-to-end encryption.',
  },
  {
    question: 'How many visas can AI process per day?',
    answer:
      'A single operator using VizEz AI can process 500+ visa applications per day, compared to 50–80 without AI assistance. The speed gain comes from eliminating manual data entry entirely and enabling intelligent batch queue processing.',
  },
  {
    question: 'What are the system requirements for VizEz AI?',
    answer:
      'VizEz AI requires Windows 10 or later (64-bit), a standard broadband internet connection, Google Chrome (latest version), and a scanner or camera for passport capture. Any flatbed scanner, document camera, or smartphone camera works.',
  },
  {
    question: 'How much does AI-powered visa automation cost?',
    answer:
      'Pricing depends on your agency\'s volume, portal requirements, and scale. Our AI platform delivers ROI from day one by replacing manual data entry costs. Contact our team for a customized quote and live AI demo.',
  },
  {
    question: 'Who built VizEz AI?',
    answer:
      'VizEz is built by Projekts (projekts.pk), a custom AI software studio based in Pakistan serving businesses across Pakistan, Oman, the US, and Switzerland. Projekts builds high-performance AI systems, web platforms, and intelligent automation tools — with 15+ projects shipped across 4 countries.',
  },
  {
    question: 'How do I get started with VizEz AI?',
    answer:
      'Contact our team to schedule a live AI demo. We\'ll show you VizEz AI processing real passports on your actual portal — no slides, no mockups. If our AI fits your workflow, we\'ll have your team running within days.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      {/* Hero */}
      <section className="section faq-hero">
        <div className="container">
          <span className="section-label">FAQ</span>
          <h1>
            Frequently Asked <span className="gradient-text">Questions</span> About VizEz AI
          </h1>
          <p className="faq-hero-description">
            Everything you need to know about VizEz AI — how it works, what our AI does, and how to get
            started. Can&apos;t find your answer?{' '}
            <Link href="/contact" className="faq-hero-link">
              Talk to our team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section faq-list">
        <div className="container">
          <div className="faq-accordion">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`faq-chevron ${openIndex === index ? 'faq-chevron-open' : ''}`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className={`faq-answer ${openIndex === index ? 'faq-answer-open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section faq-cta">
        <div className="container">
          <h2>
            Still have <span className="gradient-text">questions about AI</span>?
          </h2>
          <p className="faq-cta-description">
            Our AI team is happy to walk you through VizEz, answer technical questions about our neural OCR and automation, or schedule a live AI demo for your agency.
          </p>
          <div className="faq-cta-buttons">
            <Link href="/contact" className="btn-primary">
              Contact Sales
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/product" className="btn-secondary">
              Explore the Product
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

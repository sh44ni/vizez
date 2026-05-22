'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'

const faqs = [
  {
    q: 'Is AI-powered visa application automation legal?',
    a: 'Absolutely. VizEz AI does not submit applications autonomously — it intelligently fills form fields while a human operator reviews every entry and clicks submit. This human-in-the-loop approach keeps your agency fully compliant with government portal terms of use.',
  },
  {
    q: 'Will government portals detect or ban AI-assisted form filling?',
    a: 'No. VizEz operates like an intelligent digital assistant for your operator. Every submission is confirmed and triggered by a real person using a real browser session. There are no bots, no headless browsers, and no automated submissions — just AI-accelerated data entry.',
  },
  {
    q: 'What happens when a portal updates its form layout?',
    a: 'VizEz Brain uses adaptive learning to retrain on updated portals in minutes. When a government portal changes its structure, our AI team updates the portal configuration and pushes it to your extension — typically within hours of the change.',
  },
  {
    q: 'Can the AI read Arabic, Hindi, and Nepali passports?',
    a: 'Yes. VizEz Cortex uses multi-language neural OCR trained on passports from 190+ countries. It reads Arabic, Hindi, Nepali, Urdu, Filipino, Cyrillic, and all Latin-script languages — extracting fields from both the visual zone and MRZ with near-perfect accuracy.',
  },
  {
    q: 'How quickly can AI learn a new government portal?',
    a: 'VizEz Brain can map a new government portal in a single AI training session — typically 15 to 30 minutes. Once trained, the AI model works for every operator in your agency immediately.',
  },
  {
    q: 'How does AI protect our clients\' passport data?',
    a: 'All passport data is processed in real-time with end-to-end encryption and is never stored after the session ends. We operate on a zero-retention policy — VizEz AI does not build databases of your clients\' personal information.',
  },
  {
    q: 'Which GCC government portals does VizEz AI support?',
    a: 'VizEz AI is currently live on ROP Oman with pre-trained models ready. Our adaptive AI can be trained on any web-based portal — including UAE ICA, Saudi Enjaz, Qatar MOI, Bahrain NPRA, and Kuwait MOI — in a single session.',
  },
  {
    q: 'How much does AI-powered visa automation cost?',
    a: 'Pricing scales with your agency\'s volume and portal requirements. Our AI platform is designed to deliver ROI from day one by replacing manual data entry costs. Contact our team for a personalized quote and live AI demo.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <section className="faq section" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container">
        <ScrollReveal>
          <h2>Frequently asked questions about VizEz AI</h2>
        </ScrollReveal>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.q}</span>
                  <span className={`faq-icon ${openIndex === i ? 'faq-icon-open' : ''}`}>+</span>
                </button>
                <div
                  className={`faq-answer ${openIndex === i ? 'faq-answer-open' : ''}`}
                  style={{
                    maxHeight: openIndex === i ? '400px' : '0',
                    opacity: openIndex === i ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                  }}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

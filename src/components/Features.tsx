import ScrollReveal from './ScrollReveal'

const engines = [
  {
    name: 'VizEz Lens',
    title: 'AI-enhanced image preprocessing',
    desc: 'Computer vision algorithms automatically correct lighting, skew, glare, and blur — transforming even crumpled or photographed passports into pixel-perfect scans. Your operators never retake a single image.',
    pattern: 'lens',
    image: '/engine-lens.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/>
        <circle cx="11" cy="11" r="3"/>
      </svg>
    ),
  },
  {
    name: 'VizEz Cortex',
    title: 'Neural OCR that decodes any document',
    desc: 'Deep learning models read every field from any passport, ID card, or permit — in any language or script. Arabic, Hindi, Nepali, Filipino, Cyrillic. No manual typing, no language barriers.',
    pattern: 'cortex',
    image: '/engine-cortex.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <path d="M9 9h.01M15 9h.01"/>
      </svg>
    ),
  },
  {
    name: 'VizEz Shield',
    title: 'MRZ checksum verification engine',
    desc: 'AI cross-validates every extracted field against the passport\'s machine-readable zone using ICAO 9303 checksum algorithms — the same standard used by international border control. Errors are caught before they ever reach a portal.',
    pattern: 'shield',
    image: '/engine-shield.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    name: 'VizEz Guard',
    title: 'Intelligent anomaly detection',
    desc: 'Machine learning models flag wrong date formats, mismatched nationalities, impossible birthdates, and logical inconsistencies before submission. A second layer of AI defense your operators don\'t have to think about.',
    pattern: 'guard',
    image: '/engine-guard.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    name: 'VizEz Brain',
    title: 'Adaptive portal automation engine',
    desc: 'An AI-driven browser extension that learns any government portal\'s form structure and fills it field by field while the operator watches and confirms. Live on ROP Oman today — and trains on new portals in minutes.',
    pattern: 'brain',
    image: '/engine-brain.jpeg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="features section" id="product">
      <div className="container">
        <ScrollReveal>
          <div className="features-header">
            <span className="section-label">AI Engine Suite</span>
            <h2>Five AI engines. One intelligent pipeline.</h2>
            <p className="features-subtitle">From scan to submitted application — every step powered by AI, every value verified by machine intelligence.</p>
          </div>
        </ScrollReveal>

        {engines.map((engine, i) => (
          <ScrollReveal key={engine.name} delay={0.1}>
            <div className={`feature-row ${i % 2 === 1 ? 'feature-row-reverse' : ''}`}>
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  {engine.icon}
                </div>
                <span className="feature-label">{engine.name}</span>
                <h3 className="feature-title">{engine.title}</h3>
                <p className="feature-desc">{engine.desc}</p>
              </div>
              <div className="feature-visual">
                <img
                  src={engine.image}
                  alt={`${engine.name} — ${engine.title}`}
                  className="feature-image"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

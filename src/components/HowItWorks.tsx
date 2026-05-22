import ScrollReveal from './ScrollReveal'

const steps = [
  {
    num: '01',
    name: 'Upload',
    desc: 'Scan or photograph any passport document',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Clean',
    desc: 'AI vision corrects the image automatically',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71"/>
        <circle cx="12" cy="12" r="4"/>
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Extract',
    desc: 'Neural OCR reads every field in seconds',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Verify',
    desc: 'AI verification checks every extracted value',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    num: '05',
    name: 'Fill',
    desc: 'Intelligent automation fills the portal form',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: '06',
    name: 'Confirm',
    desc: 'Your operator reviews and confirms',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    num: '07',
    name: 'Submit',
    desc: 'One click submits the AI-prepared application',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="how-it-works section section-subtle" id="how-it-works">
      <div className="container">
        <ScrollReveal>
          <div className="how-it-works-header">
            <span className="section-label">AI Pipeline</span>
            <h2>Passport to portal in under 60 seconds</h2>
            <p className="how-it-works-subtitle">Seven AI-orchestrated stages from passport scan to submitted visa application.</p>
          </div>
        </ScrollReveal>

        <div className="steps-track">
          {/* Connector line */}
          <div className="steps-line" aria-hidden="true" />

          <div className="steps-container">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.08}>
                <div className="step">
                  <div className="step-icon-ring">
                    <span className="step-icon">{step.icon}</span>
                  </div>
                  <div className="step-content">
                    <span className="step-num">{step.num}</span>
                    <span className="step-name">{step.name}</span>
                  </div>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

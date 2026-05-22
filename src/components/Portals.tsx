import ScrollReveal from './ScrollReveal'

const portals = [
  'ROP Oman',
  'UAE Immigration',
  'Saudi Enjaz',
  'Qatar MOI',
  'Bahrain NPRA',
  'Kuwait MOI',
]

export default function Portals() {
  return (
    <section className="portals section section-subtle">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">AI Coverage</span>
          <h2>AI that adapts to any government portal</h2>
          <p className="portals-subtitle">
            Pre-trained AI models available for major GCC immigration portals. Our adaptive learning system maps any new portal in minutes — no code changes, no waiting.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="portals-grid">
            {portals.map((name) => (
              <div key={name} className="portal-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="portal-check">
                  <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {name}
              </div>
            ))}
            <div className="portal-item portal-item-more">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="portal-check">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Any other portal
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

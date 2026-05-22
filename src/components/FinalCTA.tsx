import ScrollReveal from './ScrollReveal'

export default function FinalCTA() {


  return (
    <section className="final-cta section">
      {/* Background effects */}
      <div className="final-cta-orb final-cta-orb-1" aria-hidden="true" />
      <div className="final-cta-orb final-cta-orb-2" aria-hidden="true" />

      <div className="container">
        <ScrollReveal>
          <div className="final-cta-inner">
            <span className="section-label">Get Started with AI</span>
            <h2>See our AI running on your own portal</h2>
            <p>Book a live AI demo with your real passports and your real portal. No slides, no mockups — just VizEz AI processing your actual workflow in real-time.</p>
            <div className="final-cta-buttons">
              <a href="/contact" className="btn-primary btn-glow btn-lg">
                <span className="btn-text">Request Your AI Demo</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="btn-icon">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="mailto:vizez.cloud@gmail.com" className="btn-secondary">
                Or email our AI team
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

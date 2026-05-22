import ScrollReveal from './ScrollReveal'

export default function Trust() {
  return (
    <section className="trust section">
      <div className="container">
        <ScrollReveal>
          <div className="trust-inner">
            <div className="trust-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span className="section-label">Responsible AI</span>
            <h2>VizEz is AI that keeps humans in control</h2>
            <p>
              Government portals prohibit fully automated submission — and we agree. VizEz AI fills every form field intelligently, but a human operator reviews each entry and clicks submit. Your agency stays fully compliant. Passport data is processed with end-to-end encryption and never stored beyond the active session.
            </p>
            <div className="trust-badges">
              <div className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Human-in-the-loop AI
              </div>
              <div className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Zero data retention
              </div>
              <div className="trust-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                End-to-end encryption
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

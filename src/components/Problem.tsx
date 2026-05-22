import ScrollReveal from './ScrollReveal'

export default function Problem() {
  return (
    <section className="problem section section-subtle">
      <div className="container">
        <div className="problem-layout">
          {/* Left — Content */}
          <ScrollReveal>
            <div className="problem-content">
              <span className="section-label">Before AI</span>
              <h2>The daily grind AI was built to eliminate</h2>
              <p className="problem-text">
                Every morning starts the same — a mountain of passports, a government portal built to resist automation, and hours of typing each field by hand. Copy-paste is blocked. Auto-fill is useless. A single wrong keystroke rejects the entire application.
              </p>

              <div className="problem-points">
                <div className="problem-point">
                  <span className="problem-point-marker" />
                  <div>
                    <span className="problem-point-title">Portals designed to resist automation</span>
                    <span className="problem-point-desc">Government portals actively block paste, autocomplete, and every shortcut — they were never designed for speed</span>
                  </div>
                </div>
                <div className="problem-point">
                  <span className="problem-point-marker" />
                  <div>
                    <span className="problem-point-title">Zero-tolerance accuracy demands</span>
                    <span className="problem-point-desc">One mistyped character in a passport number or date triggers an instant rejection — and hours of rework</span>
                  </div>
                </div>
                <div className="problem-point">
                  <span className="problem-point-marker" />
                  <div>
                    <span className="problem-point-title">Weeks of training per portal</span>
                    <span className="problem-point-desc">Training a new operator on a single portal takes weeks of hands-on practice — and your agency supports multiple</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Illustration */}
          <ScrollReveal delay={0.2}>
            <div className="problem-visual">
              <div className="problem-visual-glow" aria-hidden="true" />
              <img
                src="/problem-illustration.svg"
                alt="Illustration showing the complexity of manual visa processing"
                className="problem-illustration"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

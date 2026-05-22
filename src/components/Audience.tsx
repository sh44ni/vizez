import ScrollReveal from './ScrollReveal'

const audiences = [
  {
    title: 'For agency owners',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    points: [
      'AI processes more visas with fewer staff',
      'Near-zero errors through machine verification',
      'New hires productive in hours, not weeks',
      'Complete AI-generated audit trail on every application',
      'Reclaim your weekends',
    ],
  },
  {
    title: 'For operators',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    points: [
      'AI handles the typing — you handle the clients',
      'You confirm every field — AI assists, you decide',
      'Master any new portal in minutes with AI guidance',
      'Focus on relationships, not keystrokes',
      'Dramatically less daily fatigue',
    ],
  },
]

export default function Audience() {
  return (
    <section className="audience section">
      <div className="container">
        <ScrollReveal>
          <div className="audience-header">
            <span className="section-label">Built For You</span>
            <h2>AI that works for both sides of the desk</h2>
          </div>
        </ScrollReveal>

        <div className="audience-columns">
          {audiences.map((aud, idx) => (
            <ScrollReveal key={aud.title} delay={idx * 0.15}>
              <div className="audience-col">
                <div className="audience-col-header">
                  <div className="audience-icon">{aud.icon}</div>
                  <h3>{aud.title}</h3>
                </div>
                <ul className="audience-list">
                  {aud.points.map((point) => (
                    <li key={point}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="audience-check">
                        <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

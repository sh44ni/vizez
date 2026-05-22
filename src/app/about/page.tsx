import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About VizEz — AI Visa Automation by Projekts',
  description:
    'VizEz is built by Projekts (projekts.pk), a custom AI software studio. We created the intelligent visa automation platform that GCC travel agencies trust to process 500+ applications daily.',
}

const values = [
  {
    title: 'AI-First Automation',
    description:
      'If a human is doing something AI can do faster and more accurately, we automate it. Every feature starts with one question: how do we eliminate manual work through intelligent automation?',
  },
  {
    title: 'Precision Engineering',
    description:
      'A single typo in a visa application means a rejected applicant. We engineer our AI models for near-zero error rates — not "good enough" accuracy.',
  },
  {
    title: 'Agency-Centric',
    description:
      'We build for the operators who face visa portals eight hours a day. Every AI model, every workflow, every feature is shaped by their real daily pain points.',
  },
  {
    title: 'Ship & Iterate',
    description:
      'We ship intelligent software, deploy it in real agencies, learn what breaks, and improve. No six-month roadmaps — just rapid AI iteration.',
  },
]

const stats = [
  { value: '15+', label: 'Projects Shipped' },
  { value: '4', label: 'Countries Served' },
  { value: '2+', label: 'Years Running' },
  { value: '24/7', label: 'Support' },
]

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="section about-hero">
        <div className="container">
          <span className="section-label">About</span>
          <h1>
            Built by <span className="gradient-text">Projekts</span>, powered by AI for the world&apos;s travel agencies
          </h1>
          <p className="about-hero-description">
            VizEz exists because travel agencies deserve more than manual data entry. We built the AI-powered automation platform we wish existed — one that reads, verifies, and fills with machine intelligence.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section about-story">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h2>
            Born from watching agencies <span className="gradient-text">need AI</span>
          </h2>
          <div className="about-story-content">
            <p>
              VizEz was born from watching travel agencies across the GCC lose thousands of hours to manual passport data entry. Every day, operators would open a passport, squint at the MRZ line, and manually key in names, numbers, dates, and nationalities — field by field, applicant by applicant, portal by portal.
            </p>
            <p>
              One mistyped character meant a rejected application. One slow day created a backlog that bled into the next week. Agencies were hiring more staff not because business was growing, but because manual data entry was drowning them.
            </p>
            <p>
              Projekts.pk, a custom AI software studio operating across Pakistan and Oman, saw this problem firsthand. We didn&apos;t want to build another generic OCR tool. We wanted to build genuine artificial intelligence — a system that sees passports the way a human does, but processes them at machine speed, with machine accuracy, and with zero fatigue.
            </p>
            <p>That&apos;s VizEz — the AI that reads, verifies, and fills.</p>
          </div>
        </div>
      </section>

      {/* Parent Company */}
      <section className="section about-company">
        <div className="container">
          <span className="section-label">Parent Company</span>
          <h2>
            Powered by <span className="gradient-text">Projekts AI</span>
          </h2>
          <div className="about-company-content">
            <div className="about-company-text">
              <p>
                <a href="https://projekts.pk" target="_blank" rel="noopener noreferrer" className="about-link">
                  Projekts
                </a>{' '}
                builds high-performance AI systems, web platforms, and mobile apps for businesses across Pakistan, Oman, the United States, and Switzerland. 15+ projects shipped across 4 countries — from intelligent automation systems to enterprise AI dashboards, from real-time delivery platforms to neural processing engines.
              </p>
              <p>
                Custom AI, not templates. Intelligence that does real work. One team from start to finish. Ship, then improve. That&apos;s how we operate, and that&apos;s how we built VizEz.
              </p>
            </div>
            <div className="about-company-tech">
              <h3>Our AI Stack</h3>
              <div className="about-tech-tags">
                {['Next.js', 'React', 'Node.js', 'PostgreSQL', 'React Native', 'OpenAI', 'LangChain', 'Python'].map(
                  (tech) => (
                    <span key={tech} className="about-tech-tag">
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values">
        <div className="container">
          <span className="section-label">Values</span>
          <h2>
            What drives <span className="gradient-text">how we build</span>
          </h2>
          <div className="about-values-grid">
            {values.map((value) => (
              <div key={value.title} className="about-value-card">
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-team">
        <div className="container">
          <span className="section-label">Team</span>
          <h2>
            The AI team behind <span className="gradient-text">VizEz</span>
          </h2>
          <p className="about-team-description">
            A cross-functional team of AI engineers, computer vision specialists, and automation architects based in Pakistan and serving GCC agencies. We combine deep expertise in neural OCR, browser automation, and machine learning with firsthand understanding of how travel agencies operate in the Gulf region.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section about-stats">
        <div className="container">
          <div className="about-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section about-cta">
        <div className="container">
          <h2>
            Ready to see VizEz AI <span className="gradient-text">in action</span>?
          </h2>
          <p className="about-cta-description">
            Let us show you how VizEz AI can transform your agency&apos;s visa processing workflow. Book a live demo — no slides, no mockups, just your passports processed by our AI on your portals.
          </p>
          <div className="about-cta-buttons">
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

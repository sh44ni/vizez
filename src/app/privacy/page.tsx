import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Privacy Policy — VizEz',
  description:
    'Privacy Policy for VizEz and the VizEz Brain Chrome extension. Learn how we handle your data.',
}

const sections = [
  {
    id: 'overview',
    num: '01',
    title: 'Overview',
    content: (
      <>
        <p>
          This Privacy Policy applies to the <strong>VizEz web dashboard</strong> (
          <a href="https://vizez.cloud" className="privacy-link">
            vizez.cloud
          </a>
          ) and the <strong>VizEz Brain Chrome extension</strong>. Both products are operated by the
          VizEz team and share the same privacy principles.
        </p>
        <p>
          We built VizEz for visa processing agencies and immigration consultants. Because our
          customers handle sensitive personal data — passport numbers, dates of birth, national IDs —
          we treat data minimisation and local-first processing as core product requirements, not
          afterthoughts.
        </p>
      </>
    ),
  },
  {
    id: 'data-we-collect',
    num: '02',
    title: 'What Data We Collect',
    content: (
      <>
        <h3>VizEz Web Dashboard</h3>
        <ul>
          <li>
            <strong>Account information</strong> — name, email address, and organisation name
            provided at sign-up.
          </li>
          <li>
            <strong>Document extraction results</strong> — structured data fields (e.g. passport
            number, full name, nationality) extracted from documents you upload. These are stored in
            your account to enable the fill queue feature.
          </li>
          <li>
            <strong>Portal configurations</strong> — the field mappings you create between portal
            form fields and applicant data points.
          </li>
          <li>
            <strong>Usage logs</strong> — anonymised request logs for debugging and uptime
            monitoring. No applicant data is included in these logs.
          </li>
        </ul>
        <h3>VizEz Brain Chrome Extension</h3>
        <ul>
          <li>
            <strong>Portal field mappings</strong> — saved locally in your browser&apos;s{' '}
            <code>chrome.storage.local</code>. Never transmitted to any external server.
          </li>
          <li>
            <strong>Fill queue</strong> — applicant records loaded for the current session are stored
            locally in <code>chrome.storage.local</code> and cleared when you close the queue. Never
            transmitted to any external server.
          </li>
          <li>
            <strong>No analytics, no telemetry.</strong> The extension does not collect browsing
            history, keystrokes, or any data about pages you visit.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-we-do-not-collect',
    num: '03',
    title: 'What We Do Not Collect',
    content: (
      <ul>
        <li>We do not sell, rent, or share applicant personal data with any third party.</li>
        <li>
          The VizEz Brain extension does not transmit applicant data to our servers or any
          third-party servers.
        </li>
        <li>We do not use cookies for advertising or cross-site tracking.</li>
        <li>We do not build profiles on visa applicants or end users.</li>
      </ul>
    ),
  },
  {
    id: 'how-we-use-data',
    num: '04',
    title: 'How We Use Your Data',
    content: (
      <ul>
        <li>
          <strong>To provide the service</strong> — document extraction results and portal
          configurations are used solely to power the fill queue and auto-fill feature you explicitly
          trigger.
        </li>
        <li>
          <strong>To communicate with you</strong> — we may email you about your account, product
          updates, or support requests. You can opt out of marketing emails at any time.
        </li>
        <li>
          <strong>To maintain uptime</strong> — anonymised server logs help us diagnose errors and
          monitor reliability.
        </li>
      </ul>
    ),
  },
  {
    id: 'extension-permissions',
    num: '05',
    title: 'Chrome Extension Permissions',
    content: (
      <>
        <p>
          VizEz Brain requests the minimum permissions needed for auto-fill to work. Here is what
          each permission is used for:
        </p>
        <div className="privacy-permissions">
          <div className="privacy-permission">
            <p className="privacy-permission-name">storage</p>
            <p>
              Stores portal field mappings, the applicant fill queue, and user preferences locally in
              your browser. Allows the extension to remember which portal fields map to which
              document data points between sessions without a server round-trip.
            </p>
          </div>
          <div className="privacy-permission">
            <p className="privacy-permission-name">activeTab</p>
            <p>
              Required to access the currently active tab when you click &quot;Fill&quot; in the
              extension popup. The extension reads form elements on the active portal page and fills
              them with the applicant&apos;s mapped data. No tab content is accessed without explicit
              user action.
            </p>
          </div>
          <div className="privacy-permission">
            <p className="privacy-permission-name">scripting</p>
            <p>
              Used to inject the form-field scanner into government portal tabs when you initiate a
              scan. This allows the extension to detect input fields, dropdowns, and other form
              elements on pages where the content script has not been pre-loaded.
            </p>
          </div>
          <div className="privacy-permission">
            <p className="privacy-permission-name">tabs</p>
            <p>
              Used to identify which open tab contains the government visa portal so the extension
              can target it for scanning and filling. Also used to filter out the VizEz dashboard tab
              to avoid accidentally scanning the extension&apos;s own web app.
            </p>
          </div>
          <div className="privacy-permission">
            <p className="privacy-permission-name">
              Host permissions (&lt;all_urls&gt;)
            </p>
            <p>
              Visa portals exist across hundreds of different government domains worldwide. Broad
              host access lets the extension scan and fill forms on any portal URL. The extension
              only interacts with a page when you explicitly trigger a scan or fill action from the
              popup.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'data-storage-security',
    num: '06',
    title: 'Data Storage & Security',
    content: (
      <ul>
        <li>
          Dashboard data is stored on servers located in the region you select at account creation.
          Data at rest is encrypted with AES-256. Data in transit uses TLS 1.2 or higher.
        </li>
        <li>
          Extension data lives exclusively in your browser&apos;s local storage and is never
          transmitted outside your device.
        </li>
        <li>
          We apply the principle of least privilege to all internal data access and conduct regular
          access reviews.
        </li>
      </ul>
    ),
  },
  {
    id: 'data-retention',
    num: '07',
    title: 'Data Retention',
    content: (
      <ul>
        <li>
          Extracted document data is retained for as long as your account is active or as needed to
          provide the service.
        </li>
        <li>
          You can delete individual applicant records or your entire account at any time from the
          dashboard. Deletion is permanent and irreversible.
        </li>
        <li>
          Extension local storage is cleared when you manually delete the extension or clear your
          browser data.
        </li>
      </ul>
    ),
  },
  {
    id: 'third-parties',
    num: '08',
    title: 'Third-Party Services',
    content: (
      <>
        <p>
          The VizEz dashboard uses a limited number of third-party infrastructure providers
          (hosting, database, transactional email). These providers are bound by data processing
          agreements and are not permitted to use your data for their own purposes.
        </p>
        <p>
          The VizEz Brain extension communicates <strong>only</strong> with the VizEz dashboard
          instance you configure. No other third-party endpoints are contacted by the extension.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    num: '09',
    title: 'Your Rights',
    content: (
      <>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Correct inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Export your data in a portable format.</li>
          <li>Object to or restrict processing in certain circumstances.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{' '}
          <a href="mailto:support@vizez.cloud" className="privacy-link">
            support@vizez.cloud
          </a>
          . We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: 'children',
    num: '10',
    title: "Children's Privacy",
    content: (
      <p>
        VizEz is a B2B tool intended for use by businesses and professionals. We do not knowingly
        collect data from individuals under the age of 18. If you believe a minor has provided us
        with personal data, please contact us immediately.
      </p>
    ),
  },
  {
    id: 'changes',
    num: '11',
    title: 'Changes to This Policy',
    content: (
      <p>
        We may update this policy from time to time. When we make material changes, we will notify
        you by email or via a notice in the dashboard at least 14 days before the changes take
        effect. The date of the most recent revision appears at the top of this page.
      </p>
    ),
  },
  {
    id: 'contact',
    num: '12',
    title: 'Contact Us',
    content: (
      <>
        <p>If you have questions about this policy or our data practices, please reach out:</p>
        <div className="privacy-contact-box">
          <p>
            <span className="privacy-contact-label">Email</span>{' '}
            <a href="mailto:support@vizez.cloud" className="privacy-link">
              support@vizez.cloud
            </a>
          </p>
          <p>
            <span className="privacy-contact-label">Product</span> VizEz — vizez.cloud
          </p>
        </div>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      {/* Header */}
      <header className="privacy-header">
        <div className="container">
          <div className="privacy-header-inner">
            <Link href="/" className="navbar-logo">
              <Image src="/logo.svg" alt="VizEz" width={90} height={32} className="navbar-logo-img" />
            </Link>
            <Link href="/" className="privacy-back">
              ← Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Title banner */}
      <div className="privacy-banner">
        <div className="container">
          <span className="section-label">Legal</span>
          <h1>Privacy Policy</h1>
          <p className="privacy-banner-sub">
            Applies to the <span>VizEz web dashboard</span> and the{' '}
            <span>VizEz Brain Chrome extension</span>.
          </p>
          <p className="privacy-date">Last updated: May 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="privacy-content">
        <div className="container">
          <div className="privacy-layout">
            {/* Sidebar nav */}
            <aside className="privacy-sidebar">
              <p className="privacy-sidebar-label">Contents</p>
              <nav>
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="privacy-sidebar-link">
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Article */}
            <article className="privacy-article">
              {sections.map((s) => (
                <section key={s.id} id={s.id} className="privacy-section">
                  <div className="privacy-section-header">
                    <span className="privacy-section-num">{s.num}</span>
                    <h2>{s.title}</h2>
                  </div>
                  <div className="privacy-divider" />
                  <div className="privacy-prose">{s.content}</div>
                </section>
              ))}
            </article>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="privacy-footer">
        <div className="container">
          <span>
            &copy; 2026 VizEz by{' '}
            <a href="https://projekts.pk" target="_blank" rel="noopener noreferrer">
              Projekts
            </a>
            . All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

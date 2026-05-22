import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — VizEz AI Visa Automation',
  description: 'Terms of Service for VizEz AI-powered visa processing automation software. Covers usage, data handling, and operator responsibilities for GCC travel agencies.',
}

export default function TermsPage() {
  return (
    <div className="legal-page section">
      <div className="container">
        <h1>Terms of Service</h1>
        <p className="legal-page-date">Last updated: May 2026</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing or using VizEz software and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services.</p>

        <h2>Description of Service</h2>
        <p>VizEz provides AI-powered visa processing automation tools for travel agencies, including neural passport OCR data extraction, intelligent document verification, and government portal form-filling automation. Our AI software assists human operators — it does not submit applications autonomously.</p>

        <h2>User Responsibilities</h2>
        <ul>
          <li>You are responsible for the accuracy and legality of all visa applications submitted through government portals using VizEz</li>
          <li>You must ensure that human operators review and confirm every form submission</li>
          <li>You must have proper authorization to process the passport and identity documents you upload</li>
          <li>You must comply with all applicable laws, regulations, and government portal terms of use</li>
        </ul>

        <h2>Data and Privacy</h2>
        <p>Your use of VizEz is also governed by our <a href="/privacy">Privacy Policy</a>. You are responsible for obtaining appropriate consent from your clients for processing their passport data through our platform.</p>

        <h2>Intellectual Property</h2>
        <p>VizEz software, including all code, designs, algorithms, and documentation, is the intellectual property of VizEz. You are granted a limited, non-exclusive license to use the software for your agency&apos;s visa processing operations.</p>

        <h2>Limitation of Liability</h2>
        <p>VizEz is a tool that assists with data entry and form-filling. We are not responsible for rejected visa applications, government portal changes, or any losses arising from the use of our software. The operator is always the final authority on every submission.</p>

        <h2>Service Availability</h2>
        <p>We strive to maintain high availability of our services but do not guarantee uninterrupted access. Government portal changes may temporarily affect functionality until our configurations are updated.</p>

        <h2>Modifications</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of VizEz after changes constitutes acceptance of the revised terms.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact us at <a href="mailto:vizez.cloud@gmail.com">vizez.cloud@gmail.com</a>.</p>
      </div>
    </div>
  )
}

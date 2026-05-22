import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const title = 'VizEz — AI-Powered Visa Processing Automation for GCC Travel Agencies'
const description =
  'VizEz is the AI-powered visa automation platform that reads passports, verifies data with neural OCR, and auto-fills government portal forms. Process 500+ visa applications per day with one operator and near-zero errors.'

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | VizEz',
  },
  description,
  metadataBase: new URL('https://vize.cloud'),
  alternates: { canonical: 'https://vize.cloud' },
  keywords: ['AI visa automation', 'passport OCR', 'visa processing software', 'GCC travel agency automation', 'government portal automation', 'automated visa application', 'visa form filling AI', 'travel agency software'],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title,
    description,
    url: 'https://vize.cloud',
    siteName: 'VizEz',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'VizEz',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows',
    description: 'AI-powered visa processing automation platform for GCC travel agencies. Uses neural OCR to read passports, verifies data against MRZ checksums, and auto-fills government portal forms.',
    url: 'https://vize.cloud',
    offers: {
      '@type': 'Offer',
      category: 'Contact for pricing',
    },
    featureList: ['Passport OCR', 'MRZ Verification', 'Portal Auto-Fill', 'Batch Processing', 'Multi-Language Support'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VizEz',
    url: 'https://vize.cloud',
    logo: 'https://vize.cloud/logo.svg',
    description: 'AI-powered visa processing automation for travel agencies across the GCC.',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61590168394681',
      'https://instagram.com/vizez.cloud',
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'Projekts',
      url: 'https://projekts.pk',
    },
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}

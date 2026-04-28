import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import NavHeader from '@/components/NavHeader';

const DOMAIN = 'https://paychecktaxcalc.com';

export const metadata: Metadata = {
  title: 'Paycheck Tax Calculator 2026 — Free Take-Home Pay Calculator by State',
  description:
    'Calculate your exact take-home pay after federal and state taxes. Free paycheck calculator for all 50 US states + Canada with 2026 tax brackets.',
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: DOMAIN },
  openGraph: {
    title: 'Paycheck Tax Calculator 2026',
    description: 'Calculate your exact take-home pay after federal and state taxes.',
    url: DOMAIN,
    siteName: 'PaycheckTaxCalc',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Tax Calculator 2026',
    description: 'Calculate your exact take-home pay after federal and state taxes.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Paycheck Tax Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description:
    'Free paycheck tax calculator for all 50 US states. Calculates federal income tax, FICA, and state income tax to show your exact take-home pay.',
  url: DOMAIN,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased" style={{ backgroundColor: '#EDEAE3', color: '#1C1917' }}>
        <NavHeader />

        <main className="mx-auto max-w-6xl px-4 py-10">
          {children}
        </main>

        <footer className="mt-20 border-t" style={{ borderColor: '#D6D1C8' }}>
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mx-auto mb-6 max-w-[728px]">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-8870870806520160"
                data-ad-slot="footer"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm" style={{ color: '#78716C' }}>
              <p>© {new Date().getFullYear()} PaycheckTaxCalc · Built for clarity, not advice.</p>
              <nav aria-label="Footer navigation">
                <ul className="flex gap-5 list-none">
                  <li><a href="/how-it-works" className="hover:text-ink transition-colors">Methodology</a></li>
                  <li><a href="/privacy" className="hover:text-ink transition-colors">Privacy</a></li>
                  <li><a href="/faq" className="hover:text-ink transition-colors">FAQ</a></li>
                </ul>
              </nav>
            </div>
            <p className="mt-3 text-xs" style={{ color: '#A8A29E' }}>
              Tax information is based on 2026 IRS guidelines and state revenue department rules.
              Always consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </footer>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DGW7VDJ86N"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DGW7VDJ86N');`}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8870870806520160"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}

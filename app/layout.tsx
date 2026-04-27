import type { Metadata } from 'next';
import './globals.css';
import NavHeader from '@/components/NavHeader';

const DOMAIN = 'https://paychecktaxcalc.com';

export const metadata: Metadata = {
  title: 'Paycheck Tax Calculator 2025 & 2026 — Free Take-Home Pay Calculator by State',
  description:
    'Calculate your exact take-home pay after federal and state taxes. Free paycheck calculator for all 50 US states + Canada with 2025 and 2026 tax brackets.',
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: DOMAIN },
  openGraph: {
    title: 'Paycheck Tax Calculator 2025 & 2026',
    description: 'Calculate your exact take-home pay after federal and state taxes.',
    url: DOMAIN,
    siteName: 'PaycheckTaxCalc',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paycheck Tax Calculator 2025 & 2026',
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-DGW7VDJ86N" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-DGW7VDJ86N');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8870870806520160"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <NavHeader />

        <main className="mx-auto max-w-6xl px-4 py-8">
          {children}
        </main>

        <footer className="mt-16 border-t border-gray-200 bg-white">
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
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} PaycheckTaxCalc. For informational purposes only.</p>
              <nav aria-label="Footer navigation">
                <ul className="flex gap-4 list-none">
                  <li><a href="/privacy" className="hover:text-blue-700">Privacy Policy</a></li>
                  <li><a href="/faq" className="hover:text-blue-700">FAQ</a></li>
                  <li><a href="/how-it-works" className="hover:text-blue-700">Methodology</a></li>
                </ul>
              </nav>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Tax information is based on 2025 & 2026 IRS guidelines and state revenue department rules.
              Always consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

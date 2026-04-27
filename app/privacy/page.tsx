import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — PaycheckTaxCalc',
  description: 'PaycheckTaxCalc privacy policy: no personal data stored, analytics via GA4, ads via Google AdSense.',
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-gray max-w-3xl">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-gray-500">Effective date: January 1, 2024</p>

      <p>
        PaycheckTaxCalc (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website paychecktaxcalc.com. This page informs
        you of our policies regarding the collection, use, and disclosure of personal information.
      </p>

      <h2>1. No Personal Data Stored</h2>
      <p>
        All tax calculations are performed entirely in your browser using client-side JavaScript. The salary
        and tax information you enter into the calculator is <strong>never sent to our servers</strong>, stored
        in a database, or logged in any way. We do not have access to your financial information.
      </p>

      <h2>2. Analytics — Google Analytics 4 (GA4)</h2>
      <p>
        We use Google Analytics 4 to understand aggregate traffic patterns — for example, which pages are
        most visited and how long visitors stay. GA4 collects anonymized data including:
      </p>
      <ul>
        <li>Pages visited and time on page</li>
        <li>Approximate geographic location (country/region, not precise location)</li>
        <li>Browser type and operating system</li>
        <li>Referring website</li>
      </ul>
      <p>
        GA4 uses cookies to distinguish unique visitors. You can opt out by installing the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          Google Analytics Opt-out Browser Add-on
        </a>.
      </p>

      <h2>3. Advertising — Google AdSense</h2>
      <p>
        We display advertisements served by Google AdSense. Google uses cookies to serve ads based on your
        prior visits to our site and other sites on the Internet. You can opt out of personalized advertising
        by visiting{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google&apos;s Ads Settings
        </a>.
      </p>

      <h2>4. Email Newsletter</h2>
      <p>
        If you voluntarily subscribe to our email newsletter, we collect your email address solely to send
        the newsletters you requested. We do not sell or share your email address with third parties for
        marketing purposes. You can unsubscribe at any time via the link in any email we send.
      </p>

      <h2>5. Cookies</h2>
      <p>
        We use the following cookies:
      </p>
      <ul>
        <li><strong>Google Analytics:</strong> _ga, _ga_*, _gid — analytics tracking, expires up to 2 years</li>
        <li><strong>Google AdSense:</strong> NID, IDE — ad personalization, expires up to 13 months</li>
      </ul>
      <p>
        You can disable cookies in your browser settings. Some functionality may be reduced if cookies are
        disabled.
      </p>

      <h2>6. No Sale of Personal Data</h2>
      <p>
        We do not sell, trade, or otherwise transfer your personal information to third parties. We do not
        have access to the calculator inputs you enter.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Our website is not directed at children under 13. We do not knowingly collect personal information
        from children under 13.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you of any changes by posting
        the new policy on this page with an updated effective date.
      </p>

      <h2>9. Contact</h2>
      <p>
        If you have questions about this privacy policy, you can reach us at:
        <br />
        <strong>privacy@paychecktaxcalc.com</strong>
      </p>
    </article>
  );
}

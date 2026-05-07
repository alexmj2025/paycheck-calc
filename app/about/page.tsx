import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About PaycheckTaxCalc — Free Paycheck Calculator for the US, Canada & UK',
  description:
    'Learn about PaycheckTaxCalc: who built it, our methodology, and our commitment to accurate, free tax calculations for US, Canadian, and UK workers.',
  alternates: { canonical: 'https://paychecktaxcalc.com/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Hero */}
      <div className="mb-10">
        <p className="phase-label text-muted mb-3">About Us</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          Built to answer one question:<br />what will I actually take home?
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: '#78716C' }}>
          PaycheckTaxCalc is a free, browser-based paycheck calculator for employees in the United States,
          Canada, and the United Kingdom. Every calculation runs entirely on your device — no data is sent
          to any server, no account is needed, and nothing is stored.
        </p>
      </div>

      {/* Why section */}
      <section className="mt-10 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #C17F3E' }}>
          <span className="phase-label" style={{ color: '#C17F3E' }}>Phase 1 · The Problem</span>
        </div>
        <div className="px-8 py-7 space-y-4 text-sm leading-relaxed" style={{ color: '#44403C' }}>
          <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Why we built this</h2>
          <p>
            Gross salary numbers are everywhere — job listings, offer letters, LinkedIn. But the number that
            matters is the one that lands in your bank account. That number is surprisingly hard to find out
            before you accept an offer, plan a budget, or compare two jobs in different states.
          </p>
          <p>
            Existing paycheck calculators were either locked behind paywalls, cluttered with ads that obscured
            the results, required account sign-ups, or gave answers that didn&rsquo;t match real paychecks because
            they used outdated tax tables. We wanted something different: accurate, fast, free, and private.
          </p>
          <p>
            The result is PaycheckTaxCalc — a tool that shows you your federal tax, state tax, FICA, and any
            pre-tax deductions, broken down per paycheck and annually, with nothing standing between you and
            the answer.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label" style={{ color: '#B5533C' }}>Phase 2 · The Methodology</span>
        </div>
        <div className="px-8 py-7 space-y-6 text-sm leading-relaxed" style={{ color: '#44403C' }}>
          <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>How our calculations work</h2>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1C1917' }}>United States</h3>
            <p>
              US calculations use the 2026 IRS tax brackets (sourced from IRS Revenue Procedure 2025-32),
              the 2026 standard deductions ($16,100 single / $32,200 married filing jointly / $24,150 head
              of household), and the 2026 Social Security wage base of $184,500. FICA taxes — Social
              Security at 6.2% and Medicare at 1.45% — are applied before income tax on gross wages.
              State income tax is computed using each state&rsquo;s published brackets and rates for 2026.
            </p>
            <p className="mt-2">
              Pre-tax deductions (traditional 401(k), health insurance, HSA, FSA) reduce the federal and
              state income tax base but not the FICA base, matching IRS rules. Roth 401(k) contributions
              have no tax effect on the paycheck.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1C1917' }}>Canada</h3>
            <p>
              Canadian calculations use 2026 federal brackets (15%–33%), CPP contribution rates
              (5.95% up to the Year&rsquo;s Maximum Pensionable Earnings of $74,600), and EI premium rates
              (1.63% up to maximum insurable earnings of $68,900). Quebec residents pay QPP (6.4%) and
              QPIP (0.494%) instead of CPP, and EI premiums at a separate rate. Each province&rsquo;s income tax
              brackets and surtaxes are applied separately.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1C1917' }}>United Kingdom</h3>
            <p>
              UK calculations use 2025/26 HMRC rates. Income Tax is calculated above the Personal Allowance
              of £12,570 — which tapers by £1 for every £2 of income above £100,000. England, Wales, and
              Northern Ireland use basic (20%), higher (40%), and additional (45%) rates. Scotland uses the
              Scottish Rate of Income Tax (SRIT) with six bands from 19% to 48%.
            </p>
            <p className="mt-2">
              National Insurance Class 1 (employee) is 8% on earnings between the Primary Threshold
              (£12,570) and the Upper Earnings Limit (£50,270), and 2% above that. Pension salary sacrifice
              reduces both the Income Tax and NI base. Student Loan repayments are calculated for Plans 1,
              2, 4, and postgraduate loans.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1C1917' }}>What we don&rsquo;t cover</h3>
            <p>
              Our calculator is designed for standard W-2 employment income. It does not account for:
              tax credits (Child Tax Credit, Earned Income Credit, etc.), Alternative Minimum Tax (AMT),
              itemized deductions beyond the standard deduction, self-employment income or Schedule C,
              investment income, or state-specific tax credits. For complex tax situations, we recommend
              consulting a Certified Public Accountant (CPA) or Enrolled Agent (EA).
            </p>
          </div>
        </div>
      </section>

      {/* Data & Privacy */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #4A5F6E' }}>
          <span className="phase-label" style={{ color: '#4A5F6E' }}>Phase 3 · Privacy</span>
        </div>
        <div className="px-8 py-7 space-y-4 text-sm leading-relaxed" style={{ color: '#44403C' }}>
          <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Your data stays with you</h2>
          <p>
            Every tax calculation on PaycheckTaxCalc runs entirely in your browser using JavaScript. When
            you enter your salary and deductions, that information never leaves your device. We do not
            collect, store, or transmit your income data.
          </p>
          <p>
            We use Google Analytics to understand aggregate traffic (page views, country of origin, device
            type) and Google AdSense to serve ads. Neither of these services receives your salary or tax
            inputs. You can read our full <a href="/privacy" className="underline" style={{ color: '#B5533C' }}>Privacy Policy</a> for
            complete details on what data is collected and how it is used.
          </p>
        </div>
      </section>

      {/* Data sources */}
      <section className="mt-8 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
          <span className="phase-label text-muted">Data Sources</span>
        </div>
        <div className="px-8 py-7 text-sm leading-relaxed" style={{ color: '#44403C' }}>
          <ul className="space-y-2 list-disc list-inside">
            <li>IRS Revenue Procedure 2025-32 (2026 tax brackets and standard deductions)</li>
            <li>IRS Publication 15-T (federal income tax withholding tables)</li>
            <li>Social Security Administration (2026 OASDI wage base)</li>
            <li>State revenue department websites (state income tax rates)</li>
            <li>Canada Revenue Agency T1 General (2026 federal and provincial brackets)</li>
            <li>Employment and Social Development Canada (2026 CPP/EI rates)</li>
            <li>HMRC (2025/26 Income Tax bands, National Insurance rates, Personal Allowance)</li>
            <li>Revenue Scotland (2025/26 Scottish Rate of Income Tax)</li>
            <li>Student Loans Company (repayment plan thresholds 2025/26)</li>
          </ul>
          <p className="mt-4 text-xs" style={{ color: '#A8A29E' }}>
            Tax rates are reviewed and updated annually. Last update: April 2026.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 text-center">
        <a
          href="/"
          className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#B5533C' }}
        >
          Try the Calculator
        </a>
        <p className="mt-3 text-xs" style={{ color: '#A8A29E' }}>
          Questions or feedback? <a href="/contact" className="underline" style={{ color: '#B5533C' }}>Contact us</a>
        </p>
      </div>
    </div>
  );
}

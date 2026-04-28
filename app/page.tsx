import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import FaqAccordion from '@/components/FaqAccordion';
import { STATES } from '@/lib/stateData';
import { PROVINCES } from '@/lib/provinceData';

const TOP_STATES = [
  'CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI',
  'NJ', 'VA', 'WA', 'AZ', 'MA', 'TN', 'IN', 'MO', 'MD', 'CO',
];

const FAQ_ITEMS = [
  {
    q: 'How is my federal income tax calculated?',
    a: 'Federal income tax uses a progressive bracket system. Your adjusted gross income (after the standard deduction and pre-tax deductions) is taxed at increasing rates as it passes through each bracket. Only the income within each bracket is taxed at that bracket\'s rate — not your entire income. In 2026, rates range from 10% to 37%.',
  },
  {
    q: 'What is the difference between gross pay and net pay?',
    a: 'Gross pay is your total earnings before any taxes or deductions are taken out. Net pay — also called take-home pay — is what you actually receive after federal income tax, FICA taxes, state income tax, and any deductions are subtracted.',
  },
  {
    q: 'How do pre-tax deductions reduce my taxes?',
    a: 'Pre-tax deductions (traditional 401(k), health insurance, HSA, FSA) are subtracted from your gross pay before income taxes are calculated. This lowers your taxable income, which reduces both your federal and state income tax bills. FICA taxes are typically still calculated on the full gross wage.',
  },
  {
    q: 'What is FICA tax?',
    a: 'FICA stands for the Federal Insurance Contributions Act. It covers two taxes: Social Security (6.2% of wages up to $184,500 in 2026) and Medicare (1.45% of all wages). Your employer matches these amounts. High earners pay an additional 0.9% Medicare surtax above $200,000 in wages.',
  },
  {
    q: 'How do I change my withholding?',
    a: 'Submit a new Form W-4 to your employer\'s payroll department. Increasing the dollar amount in Step 4(c) will withhold more each paycheck. If you expect a large refund, you can decrease withholding to get more money each pay period instead.',
  },
  {
    q: 'Is this calculator accurate?',
    a: 'This calculator uses 2026 IRS tax brackets and published state tax rates and is accurate for most standard employment situations. It does not account for tax credits, alternative minimum tax (AMT), itemized deductions above the standard deduction, or self-employment income. For complex tax situations, consult a CPA.',
  },
  {
    q: 'What if I have multiple jobs?',
    a: 'If you have multiple jobs or a spouse who works, the IRS recommends using the Tax Withholding Estimator at IRS.gov to ensure enough is withheld. You can also check the Step 2 box on your W-4, which adjusts withholding for the higher-bracket effect of combined incomes.',
  },
  {
    q: 'How do I calculate my effective tax rate?',
    a: 'Your effective tax rate is your total tax paid divided by your total gross income. It is always lower than your marginal (top bracket) rate because the progressive system taxes your first dollars at low rates. Our calculator shows both rates automatically once you enter your income.',
  },
  {
    q: 'How does the Canadian paycheck calculator work?',
    a: 'For Canadian paychecks, the calculator deducts federal income tax (15%–33%), CPP contributions (5.95% up to $74,600 YMPE in 2026), EI premiums (1.63% up to $68,900), and provincial income tax. Quebec workers pay QPP (6.4%) and QPIP (0.494%) instead of CPP. RRSP contributions and group benefits reduce your taxable income. Switch to Canada using the 🇨🇦 button in the calculator.',
  },
];

export default function HomePage() {
  const topStateLinks = TOP_STATES.map((abbr) => STATES.find((s) => s.abbreviation === abbr)!).filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 text-center">
        <p className="phase-label text-muted mb-3">Tax Year 2026 · Updated April 2026</p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: '#1C1917' }}>
          Paycheck tax<br />calculator, made plain.
        </h1>
        <p className="mt-4 mx-auto max-w-xl text-base" style={{ color: '#78716C' }}>
          Free take-home pay calculator for all 50 US states and all 10 Canadian provinces.
          Covers federal, state/provincial, and payroll taxes with 2026 brackets. Calculations run entirely in your browser — nothing is sent to a server.
        </p>
      </div>

      <Calculator />

      <AffiliateCTA />
      <EmailCapture />

      {/* ── Phase 2: The Mechanics ── */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">Phase 2 · The Mechanics</span>
        </div>
        <div className="px-8 py-7 space-y-8" style={{ color: '#44403C' }}>

          <div>
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#1C1917' }}>How to use this calculator</h2>
            <p className="leading-relaxed text-sm">
              Enter your gross salary as an annual amount or per paycheck, select your pay frequency, choose your
              filing status, and pick your state or province. For a more precise result, fill in the pre-tax
              deductions — 401(k), health insurance, HSA and FSA (US), or RRSP and group benefits (Canada) —
              to see how each one shifts your net.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#1C1917' }}>How paycheck taxes work in the US</h2>
            <p className="leading-relaxed text-sm">
              <strong>Federal income tax</strong> uses progressive brackets — you pay a lower rate on your first dollars
              and a higher rate only on income above each threshold. In 2026, rates range from 10% (up to $12,400 single)
              to 37% (above $640,600).
            </p>
            <p className="mt-3 leading-relaxed text-sm">
              <strong>FICA taxes</strong> cover Social Security (6.2% on the first $184,500) and Medicare (1.45% on all wages).
              High earners pay an additional 0.9% Medicare surtax above $200K single / $250K MFJ.
            </p>
            <p className="mt-3 leading-relaxed text-sm">
              <strong>State income tax</strong> varies widely — nine states levy none at all, while others use progressive
              brackets or flat rates.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#1C1917' }}>2026 Federal Income Tax Brackets</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Rate', 'Single', 'Married · Joint', 'Head of Household'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['10%', '$0 – $12,400', '$0 – $24,800', '$0 – $18,600'],
                    ['12%', '$12,401 – $50,400', '$24,801 – $100,800', '$18,601 – $75,600'],
                    ['22%', '$50,401 – $105,700', '$100,801 – $211,400', '$75,601 – $158,550'],
                    ['24%', '$105,701 – $201,775', '$211,401 – $403,550', '$158,551 – $302,650'],
                    ['32%', '$201,776 – $256,225', '$403,551 – $512,450', '$302,651 – $384,325'],
                    ['35%', '$256,226 – $640,600', '$512,451 – $768,700', '$384,326 – $704,650'],
                    ['37%', '$640,601+', '$768,701+', '$704,651+'],
                  ].map(([rate, single, mfj, hoh]) => (
                    <tr key={rate} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{single}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{mfj}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{hoh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              Standard deductions (2026): Single $16,100 · MFJ $32,200 · HoH $24,150. SS wage base: $184,500. Source: IRS Rev. Proc. 2025-32.
            </p>
          </div>

          {/* FAQ accordion */}
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#1C1917' }}>Frequently Asked Questions</h2>
            <FaqAccordion items={FAQ_ITEMS} />
          </div>

        </div>
      </section>

      <AffiliateCTA />
      <EmailCapture />

      {/* State + Province links */}
      <section className="mt-16">
        <p className="phase-label text-muted mb-2">By Location</p>
        <h2 className="text-3xl font-bold mb-6" style={{ color: '#1C1917' }}>Calculate your take-home pay by state</h2>
        <div className="flex flex-wrap gap-2">
          {topStateLinks.map((state) => (
            <a
              key={state.abbreviation}
              href={`/${state.slug}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
            >
              {state.name}
            </a>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-10 mb-6" style={{ color: '#1C1917' }}>Calculate by Canadian province</h2>
        <div className="flex flex-wrap gap-2">
          {PROVINCES.map((p) => (
            <a
              key={p.abbreviation}
              href={`/canada/${p.slug}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
            >
              {p.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

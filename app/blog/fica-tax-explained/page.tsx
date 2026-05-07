import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FICA Tax Explained: Social Security & Medicare Withholding — PaycheckTaxCalc',
  description:
    'Everything you need to know about FICA taxes — Social Security (6.2%), Medicare (1.45%), the wage base cap, the Additional Medicare Tax, and why your FICA bill is different from your income tax.',
  alternates: { canonical: 'https://paychecktaxcalc.com/blog/fica-tax-explained' },
};

export default function FICAArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="phase-label px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: '#7B5EA7', fontSize: '10px' }}
          >
            FICA
          </span>
          <span className="phase-label text-muted">April 28, 2026 · 6 min read</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl mb-4" style={{ color: '#1C1917' }}>
          FICA Tax Explained: Social Security &amp; Medicare Withholding
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#78716C' }}>
          FICA is the one tax that nearly every worker pays regardless of their filing status, state, or
          deductions. Yet most people don&rsquo;t fully understand how it&rsquo;s calculated — or why it can be a
          larger burden than income tax for lower earners. Here&rsquo;s how it works.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#44403C' }}>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #7B5EA7' }}>
            <span className="phase-label" style={{ color: '#7B5EA7' }}>What Is FICA?</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>The Federal Insurance Contributions Act</h2>
            <p>
              FICA stands for the Federal Insurance Contributions Act — the law that authorizes the collection
              of payroll taxes to fund Social Security and Medicare. These are the two federal programs that
              provide retirement, disability, and healthcare benefits to retirees and certain other Americans.
            </p>
            <p>
              Unlike federal income tax, which depends on your total income, filing status, deductions, and
              credits, FICA taxes are flat-rate taxes that apply to most types of earned income. Your employer
              matches your FICA contribution dollar-for-dollar — so for every $100 in FICA you pay, your
              employer also pays $100, for a combined $200 flowing to Social Security and Medicare.
            </p>
            <p>
              Self-employed individuals pay <em>both</em> the employee and employer shares — a combined
              15.3% — under the Self-Employment Tax (though they can deduct the employer half).
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
            <span className="phase-label" style={{ color: '#B5533C' }}>The Two Parts</span>
          </div>
          <div className="px-8 py-7 space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Social Security tax (OASDI)</h2>

            <div>
              <p>
                The Social Security portion of FICA is officially called OASDI: Old-Age, Survivors, and
                Disability Insurance. In 2026, it is withheld at a flat <strong>6.2%</strong> of your gross wages —
                but only up to the annual wage base. In 2026, that wage base is <strong>$184,500</strong>.
              </p>
              <p className="mt-2">
                Once your wages from a single employer reach $184,500 in a calendar year, Social Security
                withholding stops for the rest of the year. Your paychecks effectively get larger. For
                someone paid bi-weekly ($184,500 ÷ 26 = $7,096/paycheck), the wage base is hit roughly
                in October.
              </p>
              <p className="mt-2">
                The maximum employee Social Security tax in 2026 is: $184,500 × 6.2% = <strong>$11,439</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Medicare tax (HI)</h2>
              <p>
                The Medicare portion is officially called HI: Hospital Insurance. It is withheld at
                <strong> 1.45%</strong> of all wages — there is no wage base cap. Every dollar you earn
                is subject to Medicare tax.
              </p>
              <p className="mt-2">
                Employees earning above $200,000 also pay an <strong>Additional Medicare Tax of 0.9%</strong> on
                wages above that threshold. However, the threshold for couples is $250,000 for married
                filing jointly (or $125,000 for married filing separately) — calculated on the tax return,
                not per employer.
              </p>
              <p className="mt-2">
                Your employer is required to begin withholding the Additional Medicare Tax once your wages
                at that job exceed $200,000, regardless of your filing status or your spouse&rsquo;s income. If
                you&rsquo;re married and your combined income is below $250,000 but your employer withheld the
                additional 0.9%, you&rsquo;ll get a credit when you file your return.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Tax', 'Rate', 'Wage Limit (2026)', 'Max Employee Tax'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Social Security', '6.2%', '$184,500', '$11,439'],
                    ['Medicare', '1.45%', 'No cap', 'No limit'],
                    ['Additional Medicare', '0.9%', 'Above $200K single / $250K MFJ', 'No limit'],
                  ].map(([tax, rate, limit, max]) => (
                    <tr key={tax} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: '#1C1917' }}>{tax}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#7B5EA7' }}>{rate}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{limit}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #4A5F6E' }}>
            <span className="phase-label" style={{ color: '#4A5F6E' }}>What FICA Applies To</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>What income is subject to FICA?</h2>
            <p>
              FICA applies to <strong>earned income</strong> — wages, salaries, bonuses, tips, and other
              compensation for services rendered. It does not apply to investment income (dividends, capital
              gains, interest), rental income, or certain types of pension or retirement distributions.
            </p>
            <p>
              There are important distinctions in how pre-tax deductions interact with FICA:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong>Traditional 401(k) contributions</strong> — reduce federal income tax, but FICA
                is still calculated on the full gross wage before the 401(k) is taken out.
              </li>
              <li>
                <strong>Health insurance premiums, HSA, FSA contributions via payroll</strong> — under
                Section 125 cafeteria plans, these reduce both income tax <em>and</em> FICA. This is an
                additional saving beyond the income tax benefit.
              </li>
              <li>
                <strong>Tips</strong> — fully subject to FICA. Employees are responsible for reporting
                tips to employers so FICA can be withheld.
              </li>
            </ul>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
            <span className="phase-label text-muted">FICA vs. Income Tax</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>How FICA differs from income tax</h2>
            <p>
              FICA and federal income tax are fundamentally different systems that happen to be collected
              together on your paycheck. The key differences:
            </p>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['', 'Federal Income Tax', 'FICA (SS + Medicare)'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Rate structure', 'Progressive (10%–37%)', 'Flat (7.65% total for most workers)'],
                    ['Filing status matters?', 'Yes — dramatically', 'No'],
                    ['Standard deduction applies?', 'Yes', 'No'],
                    ['Pre-tax 401(k) reduces it?', 'Yes', 'No'],
                    ['Health insurance (Section 125) reduces it?', 'Yes', 'Yes'],
                    ['Wage cap?', 'No', 'Yes — SS capped at $184,500'],
                    ['Goes to:', 'General federal revenue', 'Social Security & Medicare trust funds'],
                  ].map(([feature, income, fica]) => (
                    <tr key={feature} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: '#1C1917' }}>{feature}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{income}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{fica}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              For lower-income workers, FICA can actually exceed their federal income tax burden. A worker
              earning $30,000/year pays $2,295 in FICA (7.65%) — but after the standard deduction, their
              federal income tax is only $1,370. For these workers, FICA is their biggest federal tax bill.
            </p>
          </div>
        </section>

        {/* Quick tip */}
        <div
          className="rounded-xl px-6 py-5 text-sm leading-relaxed"
          style={{ backgroundColor: '#F5F2ED', border: '1px solid #E2DDD6' }}
        >
          <p className="font-semibold mb-2" style={{ color: '#1C1917' }}>See your exact FICA breakdown</p>
          <p style={{ color: '#44403C' }}>
            Our <a href="/" className="underline" style={{ color: '#B5533C' }}>paycheck calculator</a> shows
            your Social Security and Medicare withholding separately from your income taxes. You can also see
            exactly how health insurance premiums or HSA contributions reduce your FICA bill — enter them in
            the deductions section and watch the FICA line change.
          </p>
        </div>

        {/* Related links */}
        <div>
          <p className="font-semibold mb-3" style={{ color: '#1C1917' }}>Related guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/blog/pretax-deductions-guide', label: 'Pre-tax deductions explained' },
              { href: '/blog/effective-vs-marginal-tax-rate', label: 'Effective vs marginal tax rate' },
              { href: '/blog/how-to-read-your-pay-stub', label: 'How to read your pay stub' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E2DDD6' }}>
        <a href="/blog" className="text-sm font-medium" style={{ color: '#B5533C' }}>
          ← Back to all articles
        </a>
      </div>
    </article>
  );
}

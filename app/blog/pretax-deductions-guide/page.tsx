import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pre-Tax Deductions Explained: 401(k), HSA, FSA & Health Insurance — PaycheckTaxCalc',
  description:
    'How pre-tax deductions work, how much they save you, and which ones reduce FICA in addition to income tax. Includes real examples for 401(k), HSA, FSA, and health insurance.',
  alternates: { canonical: 'https://paychecktaxcalc.com/blog/pretax-deductions-guide' },
};

export default function PreTaxDeductionsArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="phase-label px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: '#5A7A52', fontSize: '10px' }}
          >
            Deductions
          </span>
          <span className="phase-label text-muted">April 28, 2026 · 9 min read</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl mb-4" style={{ color: '#1C1917' }}>
          Pre-Tax Deductions Explained: 401(k), HSA, FSA & Health Insurance
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#78716C' }}>
          Pre-tax deductions are one of the most powerful tools available to W-2 employees. They reduce your
          taxable income before federal and state income taxes are applied — meaning every dollar you
          contribute to a 401(k), HSA, or FSA saves you real money on your current tax bill. Here&rsquo;s exactly
          how each type works.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#44403C' }}>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #5A7A52' }}>
            <span className="phase-label" style={{ color: '#5A7A52' }}>How It Works</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>The basic mechanism</h2>
            <p>
              A pre-tax deduction is an amount subtracted from your gross pay <em>before</em> your employer
              calculates how much income tax to withhold. The key word is &ldquo;before.&rdquo; Because your taxable
              income is reduced, you pay less in federal income tax and state income tax on those dollars.
            </p>
            <p>
              Some pre-tax deductions also reduce your FICA (Social Security and Medicare) tax base. Others
              only reduce income taxes. The distinction matters because FICA is 7.65% on top of income taxes.
            </p>

            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Deduction Type', 'Reduces Federal/State Income Tax?', 'Reduces FICA?'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Traditional 401(k) / 403(b)', 'Yes', 'No'],
                    ['Health insurance (Section 125)', 'Yes', 'Yes'],
                    ['HSA (employer or employee)', 'Yes', 'Yes'],
                    ['FSA (Health or Dependent Care)', 'Yes', 'Yes'],
                    ['Commuter benefits (transit/parking)', 'Yes', 'Yes'],
                    ['Roth 401(k)', 'No', 'No'],
                  ].map(([type, income, fica]) => (
                    <tr key={type} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: '#1C1917' }}>{type}</td>
                      <td className="px-4 py-3" style={{ color: fica === 'Yes' ? '#5A7A52' : '#B5533C' }}>{income}</td>
                      <td className="px-4 py-3" style={{ color: fica === 'Yes' ? '#5A7A52' : '#B5533C' }}>{fica}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
            <span className="phase-label" style={{ color: '#B5533C' }}>401(k) & 403(b)</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Traditional 401(k) and 403(b)</h2>
            <p>
              A traditional 401(k) contribution goes into a tax-deferred retirement account. You don&rsquo;t pay
              income tax on the contributed dollars now — you pay tax when you withdraw the money in
              retirement (when you may be in a lower bracket). The contribution is <em>not</em> exempt from
              FICA — Social Security and Medicare taxes still apply to the full gross wage.
            </p>

            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>2026 contribution limits</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Employee elective deferrals: <strong>$23,500</strong> (up from $23,000 in 2025)</li>
                <li>Catch-up contribution (age 50–59 and 64+): additional <strong>$7,500</strong></li>
                <li>Catch-up contribution (age 60–63): additional <strong>$11,250</strong> (new for 2026)</li>
                <li>Total (employee + employer): <strong>$70,000</strong></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>How much does a $500/month contribution save?</p>
              <p>
                For someone in the 22% federal bracket paying 5% state income tax, contributing $500/month
                ($6,000/year) to a traditional 401(k) saves:
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1 ml-2">
                <li>Federal income tax: $6,000 × 22% = <strong>$1,320/year</strong></li>
                <li>State income tax: $6,000 × 5% = <strong>$300/year</strong></li>
                <li>Total savings: <strong>$1,620/year</strong> (or $135/month)</li>
              </ul>
              <p className="mt-2">
                So $500/month into a 401(k) only costs you $365/month in take-home pay — the other $135
                comes from what you would have paid in taxes. This is the &ldquo;tax match&rdquo; effect.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #4A5F6E' }}>
            <span className="phase-label" style={{ color: '#4A5F6E' }}>HSA</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Health Savings Account (HSA)</h2>
            <p>
              An HSA is available to people enrolled in a High-Deductible Health Plan (HDHP). It is often
              called the &ldquo;triple tax advantage&rdquo; account because contributions are pre-tax (or tax-deductible),
              growth is tax-free, and withdrawals for qualified medical expenses are also tax-free.
            </p>
            <p>
              When contributions are made through payroll (your employer deducts them from your paycheck),
              they avoid both income tax <strong>and FICA</strong>. This is a meaningful extra saving that
              direct contributions (made on your own, outside payroll) do not receive.
            </p>

            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>2026 HSA contribution limits</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Self-only coverage: <strong>$4,400</strong></li>
                <li>Family coverage: <strong>$8,750</strong></li>
                <li>Catch-up (age 55+): additional <strong>$1,000</strong></li>
              </ul>
            </div>

            <p>
              Unlike an FSA, HSA funds roll over indefinitely. You can invest the balance and let it grow
              for decades. Many people use HSAs as a secondary retirement account, paying medical expenses
              out of pocket now and saving receipts to reimburse themselves tax-free later.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
            <span className="phase-label text-muted">FSA</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Flexible Spending Account (FSA)</h2>
            <p>
              A Health FSA lets you set aside pre-tax dollars for qualified medical expenses. Like HSA payroll
              contributions, FSA contributions reduce both income tax and FICA. The key differences from an HSA:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>You can use an FSA with any health plan (not just an HDHP)</li>
              <li>Funds generally do not roll over — use it or lose it (up to $660 carryover allowed in 2026)</li>
              <li>The full election amount is available from day one of the plan year</li>
            </ul>

            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>2026 FSA contribution limit</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Health FSA: <strong>$3,300</strong></li>
                <li>Dependent Care FSA: <strong>$5,000</strong> (married filing jointly or single) / $2,500 (married filing separately)</li>
              </ul>
            </div>

            <p>
              A Dependent Care FSA is for childcare and elder care expenses, not medical. It also reduces
              income tax and FICA on contributions, making it one of the most tax-efficient ways to pay for
              daycare.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
            <span className="phase-label text-muted">Health Insurance Premiums</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Employer-sponsored health insurance premiums</h2>
            <p>
              Most employer-sponsored health insurance is offered through a <strong>Section 125 Cafeteria Plan</strong>.
              Under these plans, your share of the health insurance premium is deducted pre-tax. This means
              you don&rsquo;t pay federal income tax, state income tax, or FICA on those premium dollars.
            </p>
            <p>
              If you pay $250/month toward your health plan, and you&rsquo;re in the 22% federal bracket with 5%
              state tax, your actual cost is:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Tax savings: $250 × (22% + 5% + 7.65%) = $250 × 34.65% = <strong>$86.63/month</strong></li>
              <li>Actual net cost: $250 − $86.63 = <strong>$163.37/month</strong></li>
            </ul>
            <p className="mt-2">
              Check your benefits enrollment materials or payroll portal to confirm whether your premiums
              are withheld pre-tax or post-tax. Most employer plans are pre-tax, but some are not.
            </p>
          </div>
        </section>

        {/* Quick tip */}
        <div
          className="rounded-xl px-6 py-5 text-sm leading-relaxed"
          style={{ backgroundColor: '#F5F2ED', border: '1px solid #E2DDD6' }}
        >
          <p className="font-semibold mb-2" style={{ color: '#1C1917' }}>Model your deductions in the calculator</p>
          <p style={{ color: '#44403C' }}>
            Our <a href="/" className="underline" style={{ color: '#B5533C' }}>free paycheck calculator</a> lets
            you enter your 401(k), health insurance, HSA, and FSA contributions and see exactly how each one
            changes your take-home pay. It&rsquo;s the fastest way to answer &ldquo;should I increase my 401(k)
            contribution?&rdquo; — because you can see the real net cost before you decide.
          </p>
        </div>

        {/* Related links */}
        <div>
          <p className="font-semibold mb-3" style={{ color: '#1C1917' }}>Related guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/blog/effective-vs-marginal-tax-rate', label: 'Effective vs marginal tax rate' },
              { href: '/blog/fica-tax-explained', label: 'FICA tax explained' },
              { href: '/blog/how-to-fill-out-w4-2026', label: 'How to fill out your W-4' },
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Read Your Pay Stub: Every Line Explained — PaycheckTaxCalc',
  description:
    'A complete guide to reading your pay stub. Understand gross pay, federal and state taxes, FICA, pre-tax deductions, net pay, and year-to-date totals.',
  alternates: { canonical: 'https://paychecktaxcalc.com/blog/how-to-read-your-pay-stub' },
};

export default function PayStubArticle() {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="phase-label px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: '#C17F3E', fontSize: '10px' }}
          >
            Basics
          </span>
          <span className="phase-label text-muted">April 28, 2026 · 7 min read</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl mb-4" style={{ color: '#1C1917' }}>
          How to Read Your Pay Stub: Every Line Explained
        </h1>
        <p className="text-base leading-relaxed" style={{ color: '#78716C' }}>
          Most people glance at their pay stub long enough to confirm the deposit amount — then move on. But
          your pay stub contains a detailed accounting of exactly where your money went. Understanding it takes
          five minutes and can save you from tax surprises all year long.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#44403C' }}>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #C17F3E' }}>
            <span className="phase-label" style={{ color: '#C17F3E' }}>Section 1 · The Basics</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>What a pay stub is</h2>
            <p>
              A pay stub (also called a pay slip, paycheck stub, or earnings statement) is a document from
              your employer that details your earnings and deductions for a specific pay period. In the US,
              employers are generally required to provide this information to employees, either as a paper
              stub attached to a physical check or as a digital document through a payroll portal like ADP,
              Gusto, or Workday.
            </p>
            <p>
              Pay stubs typically cover two time frames simultaneously: the <strong>current pay period</strong> (this paycheck)
              and <strong>year-to-date (YTD)</strong> totals (everything accumulated since January 1st). Both columns matter —
              the current period tells you what happened this paycheck, and the YTD column helps you spot
              problems and project your annual tax situation.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
            <span className="phase-label" style={{ color: '#B5533C' }}>Section 2 · Earnings</span>
          </div>
          <div className="px-8 py-7 space-y-5">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>The earnings section</h2>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Gross Pay</h3>
              <p>
                Gross pay is your total earnings before any deductions. For salaried employees, this is your
                annual salary divided by the number of pay periods (26 for bi-weekly, 24 for semi-monthly,
                12 for monthly). For hourly employees, it is your hours worked multiplied by your hourly rate,
                plus any overtime.
              </p>
              <p className="mt-2">
                <strong>Example:</strong> A $78,000/year salary paid bi-weekly produces a gross pay of
                $78,000 ÷ 26 = <strong>$3,000.00</strong> per paycheck.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Regular Pay, Overtime, Bonus</h3>
              <p>
                Many pay stubs break gross pay into components. <strong>Regular pay</strong> is your base
                earnings. <strong>Overtime</strong> is hours worked beyond 40 per week, typically paid at
                1.5× your regular rate. <strong>Bonus</strong> or <strong>supplemental pay</strong> may
                appear as a separate line — bonuses are still subject to all taxes, but employers can use
                either the flat 22% supplemental rate or the aggregate method for withholding.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Hours Worked</h3>
              <p>
                Hourly employees will see hours worked listed. Salaried employees may see a note that salary
                is not based on hours, or a nominal hours figure. This section also often shows vacation and
                sick leave balances, accruals, and usage.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #4A5F6E' }}>
            <span className="phase-label" style={{ color: '#4A5F6E' }}>Section 3 · Taxes</span>
          </div>
          <div className="px-8 py-7 space-y-5">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>The tax deductions section</h2>
            <p>
              This is the largest section on most pay stubs and the one most people skip. It lists every tax
              withheld from your paycheck, usually grouped into federal, FICA, and state/local categories.
            </p>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Federal Income Tax (FIT)</h3>
              <p>
                This is the amount withheld for your federal income tax liability. The amount is determined
                by your gross pay, pay frequency, and the elections you made on your W-4 form — specifically
                your filing status and any additional withholding you requested. This is not a flat percentage;
                it is calculated using IRS withholding tables that approximate the progressive bracket system.
              </p>
              <p className="mt-2">
                If the FIT line looks unexpectedly high or low, check whether your W-4 is up to date.
                Life events like marriage, divorce, a new child, or a side job should trigger a W-4 update.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Social Security Tax (OASDI)</h3>
              <p>
                Social Security tax is always 6.2% of your gross wages, up to the annual wage base. In 2026,
                that cap is $184,500. Once your YTD earnings exceed $184,500, Social Security withholding
                stops for the rest of the year. If you earn above that threshold, you&rsquo;ll notice your
                paychecks get slightly larger after the cap is hit.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Medicare Tax (Med)</h3>
              <p>
                Medicare tax is 1.45% of all wages — there is no cap. High earners (above $200,000 for single
                filers; $250,000 for married filing jointly) also pay an additional 0.9% Additional Medicare
                Tax. Employers are required to withhold the extra 0.9% once your wages from that employer
                exceed $200,000 in a year, even if your combined household income is below the threshold.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>State Income Tax (SIT)</h3>
              <p>
                If you live in a state with an income tax, you&rsquo;ll see a state income tax line. Nine states —
                Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming
                — have no state income tax, so residents there won&rsquo;t see this line (or it will show $0.00).
              </p>
              <p className="mt-2">
                Some states require a state-specific withholding form similar to the W-4. Others use your
                federal W-4 elections as the basis for withholding.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Local / City Tax</h3>
              <p>
                Some cities and counties levy their own income tax. New York City, Philadelphia, Columbus,
                and Portland (Oregon) are examples. If you work or live in one of these jurisdictions, you&rsquo;ll
                see a separate local tax line.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
            <span className="phase-label text-muted">Section 4 · Deductions</span>
          </div>
          <div className="px-8 py-7 space-y-5">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Pre-tax and post-tax deductions</h2>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Pre-Tax Deductions</h3>
              <p>
                Pre-tax deductions come out of your gross pay <em>before</em> income taxes are calculated.
                This lowers the amount of income you&rsquo;re taxed on, which saves you money. Common pre-tax
                deductions include:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
                <li><strong>Traditional 401(k) / 403(b) contributions</strong> — reduces federal and state taxable income, but not FICA</li>
                <li><strong>Health insurance premiums</strong> — if offered through an employer Section 125 plan, reduces federal income tax and FICA</li>
                <li><strong>HSA contributions</strong> (Health Savings Account) — reduces federal income tax and FICA</li>
                <li><strong>FSA contributions</strong> (Flexible Spending Account) — reduces federal income tax and FICA</li>
                <li><strong>Dependent Care FSA</strong> — reduces federal income tax and FICA</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Post-Tax Deductions</h3>
              <p>
                Post-tax deductions come out of your pay <em>after</em> taxes have been calculated and do not
                reduce your taxable income. Examples include:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1 ml-2">
                <li><strong>Roth 401(k) contributions</strong> — no current tax benefit, but withdrawals in retirement are tax-free</li>
                <li><strong>Life insurance premiums</strong> (if above the employer-provided $50,000 limit)</li>
                <li><strong>Wage garnishments</strong> — court-ordered deductions for child support, student loans, or debt</li>
                <li><strong>Charity contributions</strong> — some employers allow direct payroll giving</li>
                <li><strong>Union dues</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-8 pt-6 pb-4" style={{ borderBottom: '1px solid #E2DDD6' }}>
            <span className="phase-label text-muted">Section 5 · Net Pay & YTD</span>
          </div>
          <div className="px-8 py-7 space-y-4">
            <h2 className="text-xl font-semibold" style={{ color: '#1C1917' }}>Net pay and year-to-date totals</h2>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Net Pay</h3>
              <p>
                Net pay — also called take-home pay — is the amount that actually lands in your bank account.
                It equals gross pay minus all taxes and deductions. This is the number you should be using for
                budgeting, not gross pay.
              </p>
              <p className="mt-2">
                <strong>Formula:</strong> Net Pay = Gross Pay − Federal Tax − FICA (SS + Medicare) − State Tax − Local Tax − All Deductions
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-1" style={{ color: '#1C1917' }}>Year-to-Date (YTD) Totals</h3>
              <p>
                The YTD column is extremely useful for projecting your tax situation. By looking at your YTD
                federal income tax withheld and comparing it to your expected annual tax liability, you can
                tell whether you&rsquo;re on track for a refund, a balance due, or a roughly breakeven situation.
              </p>
              <p className="mt-2">
                The YTD Social Security earnings line is also important — once it approaches $184,500 (the
                2026 wage base), you know your Social Security withholding will stop, effectively giving you
                a raise in your net pay.
              </p>
            </div>
          </div>
        </section>

        {/* Quick tip box */}
        <div
          className="rounded-xl px-6 py-5 text-sm leading-relaxed"
          style={{ backgroundColor: '#F5F2ED', border: '1px solid #E2DDD6' }}
        >
          <p className="font-semibold mb-2" style={{ color: '#1C1917' }}>Pro tip: Check your pay stub against the calculator</p>
          <p style={{ color: '#44403C' }}>
            Enter your gross pay, deductions, and state into our{' '}
            <a href="/" className="underline" style={{ color: '#B5533C' }}>free paycheck calculator</a> and
            compare the results to your actual pay stub. If the numbers are significantly different, it
            usually means your W-4 elections are set differently from the calculator&rsquo;s assumptions — or
            it can reveal an error in your payroll.
          </p>
        </div>

        {/* Related links */}
        <div>
          <p className="font-semibold mb-3" style={{ color: '#1C1917' }}>Related guides</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/blog/how-to-fill-out-w4-2026', label: 'How to fill out your W-4' },
              { href: '/blog/pretax-deductions-guide', label: 'Pre-tax deductions explained' },
              { href: '/blog/fica-tax-explained', label: 'FICA tax explained' },
              { href: '/faq', label: 'FAQ' },
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

      {/* Back to blog */}
      <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E2DDD6' }}>
        <a href="/blog" className="text-sm font-medium" style={{ color: '#B5533C' }}>
          ← Back to all articles
        </a>
      </div>
    </article>
  );
}

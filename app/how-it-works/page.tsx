import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Our Paycheck Tax Calculator Works — Methodology & Sources',
  description:
    'Full transparency on how PaycheckTaxCalc computes federal income tax, FICA, and state income tax. All 2024 tax rates and sources listed.',
};

export default function HowItWorksPage() {
  return (
    <article className="prose prose-gray max-w-3xl">
      <h1>How Our Paycheck Tax Calculator Works</h1>
      <p className="lead">
        This page explains the exact calculation methodology used by PaycheckTaxCalc. All calculations are
        performed client-side in your browser — no data is sent to a server.
      </p>
      <p className="text-sm text-gray-500">Last updated: January 2024</p>

      <h2>Step 1 — Annualize gross pay</h2>
      <p>
        We first convert your entry to an annual figure. If you entered a per-paycheck amount, we multiply by
        your pay period count: weekly × 52, bi-weekly × 26, semi-monthly × 24, monthly × 12, annually × 1.
      </p>

      <h2>Step 2 — Subtract pre-tax deductions</h2>
      <p>
        Pre-tax deductions (traditional 401(k), health insurance, HSA, FSA, and other pre-tax items) are
        subtracted from annual gross pay to arrive at <strong>federal taxable wages</strong>. These deductions
        reduce your taxable income before federal and most state income taxes are calculated.
      </p>
      <p>
        Note: Social Security and Medicare (FICA) taxes are typically calculated on gross wages before
        pre-tax deductions, with the exception of certain Section 125 (cafeteria plan) contributions such as
        health insurance and FSA deposits, which are FICA-exempt. For simplicity, this calculator applies
        FICA to full gross wages — the error is negligible for most users.
      </p>

      <h2>Step 3 — Federal income tax (2024 brackets)</h2>
      <p>
        We subtract the 2024 standard deduction from federal taxable wages to get <strong>federal taxable
        income</strong>, then apply the IRS 2024 tax brackets:
      </p>
      <table>
        <thead>
          <tr>
            <th>Rate</th>
            <th>Single</th>
            <th>Married Filing Jointly</th>
            <th>Head of Household</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['10%', '$0–$11,600', '$0–$23,200', '$0–$16,550'],
            ['12%', '$11,601–$47,150', '$23,201–$94,300', '$16,551–$63,100'],
            ['22%', '$47,151–$100,525', '$94,301–$201,050', '$63,101–$100,500'],
            ['24%', '$100,526–$191,950', '$201,051–$383,900', '$100,501–$191,950'],
            ['32%', '$191,951–$243,725', '$383,901–$487,450', '$191,951–$243,700'],
            ['35%', '$243,726–$609,350', '$487,451–$731,200', '$243,701–$609,350'],
            ['37%', '$609,351+', '$731,201+', '$609,351+'],
          ].map(([r, s, m, h]) => (
            <tr key={r}><td>{r}</td><td>{s}</td><td>{m}</td><td>{h}</td></tr>
          ))}
        </tbody>
      </table>
      <p>
        Standard deductions: Single $14,600 · Married $29,200 · Head of household $21,900.
        Source: <a href="https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024" target="_blank" rel="noopener noreferrer">IRS Rev. Proc. 2023-34</a>.
      </p>

      <h2>Step 4 — FICA taxes</h2>
      <ul>
        <li><strong>Social Security:</strong> 6.2% on wages up to $168,600 (2024 wage base). Source: SSA.gov.</li>
        <li><strong>Medicare:</strong> 1.45% on all wages.</li>
        <li>
          <strong>Additional Medicare:</strong> 0.9% on wages above $200,000 (single) or $250,000 (married
          filing jointly). Source: IRS Notice 2013-45.
        </li>
      </ul>

      <h2>Step 5 — State income tax</h2>
      <p>
        State taxable income is calculated as federal taxable wages minus the state&apos;s own standard deduction
        (where applicable). We then apply 2024 state tax brackets or flat rates.
      </p>
      <p>
        States with no income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee,
        Texas, Washington, Wyoming.
      </p>
      <p>
        Flat-rate states: Colorado (4.4%), Illinois (4.95%), Indiana (3.15%), Kentucky (4.0%),
        Massachusetts (5.0%), Michigan (4.25%), North Carolina (4.75%), Pennsylvania (3.07%), Utah (4.65%).
      </p>
      <p>
        All other states use progressive brackets. Data sourced from each state&apos;s department of revenue
        as published for tax year 2024.
      </p>

      <h2>Step 6 — State-specific taxes</h2>
      <p>
        Some states levy additional employee payroll taxes:
      </p>
      <ul>
        <li><strong>California SDI:</strong> 0.9% on all wages (State Disability Insurance). Source: CA EDD.</li>
        <li><strong>New Jersey SDI/TDI &amp; FLI:</strong> 0.09% each, on wages up to $161,400. Source: NJ DOL.</li>
      </ul>

      <h2>Step 7 — Per-period calculation</h2>
      <p>
        All annual figures are divided by the number of pay periods: weekly 52, bi-weekly 26,
        semi-monthly 24, monthly 12, annually 1.
      </p>

      <h2>Step 8 — Net pay</h2>
      <pre className="rounded bg-gray-100 p-4 text-sm overflow-x-auto">
{`netPay = grossPay
       − federalIncomeTax
       − socialSecurity
       − medicare
       − additionalMedicare
       − stateIncomeTax
       − stateOtherTaxes
       − preTaxDeductions
       − postTaxDeductions
       − additionalFederalWithholding
       − additionalStateWithholding`}
      </pre>

      <h2>Limitations</h2>
      <ul>
        <li>Does not calculate tax credits (child tax credit, earned income credit, etc.).</li>
        <li>Does not account for Alternative Minimum Tax (AMT).</li>
        <li>Does not handle itemized deductions above the standard deduction.</li>
        <li>Does not account for local/city income taxes (e.g., New York City, Philadelphia).</li>
        <li>Self-employment income is not covered — the self-employment tax rate differs from W-2 employment.</li>
      </ul>

      <h2>Data sources</h2>
      <ul>
        <li>Federal brackets: IRS Publication 15-T (2024)</li>
        <li>Social Security wage base: Social Security Administration (SSA.gov)</li>
        <li>State rates: Individual state department of revenue websites (2024 tax year)</li>
        <li>California SDI: California Employment Development Department (EDD)</li>
        <li>New Jersey TDI/FLI: New Jersey Department of Labor</li>
      </ul>

      <p className="text-sm text-gray-500 mt-8">
        Always verify with a qualified tax professional for your specific situation. Tax laws change; rates
        above reflect the 2024 tax year. PaycheckTaxCalc makes no warranty of accuracy.
      </p>
    </article>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paycheck Tax FAQ 2026 — Frequently Asked Questions',
  description:
    'Answers to 20+ common paycheck tax questions: 2026 federal brackets, FICA, state taxes, W-4, effective vs marginal rate, and more.',
};

const FAQS: { q: string; a: string }[] = [
  {
    q: 'How is federal income tax calculated from my paycheck?',
    a: 'Your employer uses IRS Publication 15-T to calculate withholding. They start with your gross pay, annualize it, subtract your W-4 allowances, then apply the 2026 tax brackets for the year. The result is divided by your pay periods to determine each paycheck\'s federal withholding.',
  },
  {
    q: 'What is the difference between gross pay and net pay?',
    a: 'Gross pay is your total compensation before any taxes or deductions. Net pay (take-home pay) is what you receive after federal income tax, Social Security, Medicare, state income tax, and any voluntary deductions are subtracted.',
  },
  {
    q: 'What does FICA stand for, and what does it cover?',
    a: 'FICA stands for the Federal Insurance Contributions Act. It covers Social Security (6.2% of wages up to $184,500 in 2026) and Medicare (1.45% on all wages). Your employer matches both contributions. The money funds retirement benefits (Social Security) and hospital insurance (Medicare).',
  },
  {
    q: 'What is the additional Medicare surtax?',
    a: 'High earners pay an extra 0.9% Medicare tax on wages above $200,000 (single) or $250,000 (married filing jointly). Unlike the base Medicare tax, employers do not match this additional 0.9%.',
  },
  {
    q: 'How do pre-tax deductions reduce my taxes?',
    a: 'Pre-tax deductions — including traditional 401(k) contributions, health insurance premiums (employer-sponsored plans), HSA deposits, and FSA contributions — are subtracted from your gross pay before income taxes are calculated. This lowers your taxable income and reduces both federal and state income tax withholding.',
  },
  {
    q: 'What is the 2026 standard deduction?',
    a: 'The 2026 standard deduction is $16,100 for single filers, $32,200 for married filing jointly, and $24,150 for head of household. This amount is subtracted from your income before tax brackets are applied, reducing your taxable income.',
  },
  {
    q: 'What is my marginal tax rate vs my effective tax rate?',
    a: 'Your marginal rate is the rate applied to your last dollar of income (your "top bracket"). Your effective rate is your total tax divided by total income — it is always lower than the marginal rate because lower brackets apply to earlier income. For example, a $100,000 single filer has a 22% marginal rate but roughly a 15% effective federal rate in 2026.',
  },
  {
    q: 'How do I update my W-4 to change my withholding?',
    a: 'Submit a new IRS Form W-4 to your employer\'s payroll department. You can increase withholding by adding an extra dollar amount in Step 4(c), or decrease it by claiming additional deductions in Step 4(b). The IRS W-4 estimator at IRS.gov can help you fill it out accurately.',
  },
  {
    q: 'Why do I owe taxes at the end of the year?',
    a: 'You may owe at filing if you were under-withheld during the year. This happens when multiple jobs push you into a higher bracket, you have side income not subject to withholding, or your W-4 was not updated after a life change (marriage, new job, etc.). Adding extra withholding in Step 4(c) of your W-4 can prevent a balance due.',
  },
  {
    q: 'What states have no income tax?',
    a: 'Nine states levy no income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. New Hampshire taxes investment income but not earned wages.',
  },
  {
    q: 'How does filing status affect my take-home pay?',
    a: 'Married filing jointly gets a higher standard deduction ($32,200 vs $16,100 in 2026) and wider tax brackets than single filers, generally resulting in lower tax withholding per dollar of income. Head of household gets a deduction between the two ($24,150) and is available to unmarried individuals who pay more than half the cost of maintaining a home for a qualifying person.',
  },
  {
    q: 'What is a 401(k) and how does it reduce taxes?',
    a: 'A traditional 401(k) is an employer-sponsored retirement account funded with pre-tax dollars. Contributions are not subject to federal or state income tax in the year contributed, reducing your taxable income. The 2026 contribution limit is $23,500 ($31,000 for those 50 or older). Taxes are deferred until withdrawal in retirement.',
  },
  {
    q: 'What is the difference between a traditional and Roth 401(k)?',
    a: 'Traditional 401(k) contributions are made pre-tax, reducing your current taxable income. Roth 401(k) contributions are post-tax — you pay taxes on the money now, but qualified withdrawals in retirement are tax-free. This calculator shows both separately in the deductions breakdown.',
  },
  {
    q: 'What is an HSA and how much can I contribute?',
    a: 'A Health Savings Account (HSA) is a tax-advantaged account for medical expenses, available only with a high-deductible health plan (HDHP). Contributions are pre-tax, growth is tax-free, and withdrawals for qualified medical expenses are tax-free. 2026 limits: $4,400 (self-only) and $8,750 (family).',
  },
  {
    q: 'What is an FSA?',
    a: 'A Flexible Spending Account (FSA) lets you set aside pre-tax dollars for qualified medical or dependent care expenses. The 2026 healthcare FSA limit is $3,300. Unlike an HSA, most FSA balances must be used within the plan year (with a grace period or $640 rollover allowed by some plans).',
  },
  {
    q: 'How do I calculate my own paycheck taxes manually?',
    a: 'Annualize your gross pay, subtract pre-tax deductions and the 2026 standard deduction ($16,100 single) to get federal taxable income, apply the 2026 bracket table to find federal income tax, calculate Social Security (6.2%) and Medicare (1.45%) on gross wages, add state income tax, then divide all annual amounts by your pay periods per year.',
  },
  {
    q: 'Does overtime pay get taxed at a higher rate?',
    a: 'Overtime pay is taxed the same as regular wages — at your marginal bracket rate. However, because a larger paycheck is annualized for withholding purposes, your employer may withhold at a higher rate for that pay period. Your actual tax for the year is the same regardless of how income is distributed across paychecks.',
  },
  {
    q: 'Are bonuses taxed differently?',
    a: 'Supplemental wages like bonuses are often withheld at a flat 22% federal rate (up to $1 million). However, your actual tax liability is the same as if the bonus were regular wages — you reconcile any over- or under-withholding when you file your annual return.',
  },
  {
    q: 'What if I work in a different state than I live in?',
    a: 'Many states have reciprocity agreements where you only pay taxes in your home state. If no agreement exists, you may owe taxes in both states, though most states offer a credit for taxes paid to another state to prevent full double taxation. This calculator handles single-state scenarios.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'This calculator uses 2026 IRS brackets and published state tax rates to produce accurate estimates for standard W-2 employment. It does not account for tax credits, AMT, local city taxes, itemized deductions, or self-employment. For complex situations — multiple income sources, significant investment income, or business income — consult a CPA or enrolled agent.',
  },
  {
    q: 'What are Social Security and Medicare wage bases in 2026?',
    a: 'In 2026, Social Security tax applies to the first $184,500 of wages (the "wage base"). Medicare applies to all wages with no cap. An additional 0.9% Medicare surtax applies to wages above $200,000 (single) or $250,000 (married filing jointly).',
  },
  {
    q: 'Can I use this calculator for self-employment income?',
    a: 'This calculator is designed for W-2 employees. Self-employed individuals pay the full 15.3% self-employment tax (both employee and employer share of FICA) and may use Schedule C deductions. A different calculator specifically for self-employment income would be more appropriate.',
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
        Paycheck Tax FAQ 2026
      </h1>
      <p className="mb-10 text-gray-600">
        Answers to the most common questions about paycheck withholding, federal and state taxes, and how to
        maximize your take-home pay — updated for 2026.
      </p>

      <div className="space-y-8 max-w-3xl">
        {FAQS.map(({ q, a }, i) => (
          <div key={i} className="border-b border-gray-200 pb-8 last:border-0">
            <h2 className="text-lg font-semibold text-gray-900">{q}</h2>
            <p className="mt-2 leading-relaxed text-gray-700">{a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-blue-50 border border-blue-200 p-6">
        <p className="text-sm text-blue-800">
          <strong>Ready to calculate your take-home pay?</strong>{' '}
          <a href="/" className="underline hover:text-blue-900">Use our free paycheck calculator</a> for all 50
          US states with 2026 tax brackets.
        </p>
      </div>
    </div>
  );
}

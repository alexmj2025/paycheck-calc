import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paycheck & Tax Glossary — PaycheckTaxCalc',
  description:
    'Plain-English definitions for every term on your pay stub and tax form. W-4, FICA, gross pay, net pay, marginal rate, standard deduction, and more.',
  alternates: { canonical: 'https://paychecktaxcalc.com/glossary' },
};

const TERMS = [
  {
    term: 'Additional Medicare Tax',
    definition:
      'An extra 0.9% Medicare tax on wages above $200,000 (single) or $250,000 (married filing jointly). Introduced by the Affordable Care Act. Employers withhold it once your wages at that job exceed $200,000, regardless of filing status.',
  },
  {
    term: 'Adjusted Gross Income (AGI)',
    definition:
      'Your total income minus certain "above the line" deductions like student loan interest, alimony, and contributions to traditional IRAs. AGI is the starting point for calculating your federal income tax before you subtract the standard or itemized deduction.',
  },
  {
    term: 'Cafeteria Plan (Section 125)',
    definition:
      'An employer benefit plan that allows employees to pay for certain benefits (health insurance premiums, HSA, FSA) with pre-tax dollars. Named after IRS Code Section 125. Reduces both income tax and FICA taxes.',
  },
  {
    term: 'Canada Pension Plan (CPP)',
    definition:
      'The mandatory Canadian retirement savings program. In 2026, employees contribute 5.95% of pensionable earnings up to the Year\'s Maximum Pensionable Earnings (YMPE) of $74,600. Quebec residents pay QPP instead.',
  },
  {
    term: 'Deduction (Pre-Tax)',
    definition:
      'An amount subtracted from gross pay before income taxes are calculated, reducing taxable income. Examples include traditional 401(k) contributions, health insurance premiums, HSA, and FSA contributions.',
  },
  {
    term: 'Deduction (Post-Tax)',
    definition:
      'An amount subtracted from pay after taxes are calculated. Does not reduce taxable income. Examples include Roth 401(k) contributions, union dues, and wage garnishments.',
  },
  {
    term: 'Earned Income Credit (EIC / EITC)',
    definition:
      'A refundable federal tax credit for lower- and moderate-income workers, especially those with children. Not factored into paycheck withholding — claimed on the annual tax return.',
  },
  {
    term: 'Effective Tax Rate',
    definition:
      'Your total tax paid divided by your total gross income. Because the tax system is progressive, your effective rate is always lower than your marginal (top bracket) rate. Example: paying $11,000 on $80,000 income = 13.75% effective rate.',
  },
  {
    term: 'EI Premium (Employment Insurance)',
    definition:
      'A mandatory Canadian payroll deduction that funds EI benefits for workers who lose their jobs. In 2026, the rate is 1.63% on insurable earnings up to $68,900.',
  },
  {
    term: 'FICA',
    definition:
      'Federal Insurance Contributions Act. The law that authorizes Social Security (6.2%) and Medicare (1.45%) payroll taxes. Employers match the employee contributions dollar-for-dollar. There is no filing status or deduction that reduces FICA (except Section 125 benefits).',
  },
  {
    term: 'Filing Status',
    definition:
      'A category on your federal tax return that determines your tax bracket thresholds and standard deduction amount. The five federal statuses are: Single, Married Filing Jointly, Married Filing Separately, Head of Household, and Qualifying Surviving Spouse.',
  },
  {
    term: 'Flexible Spending Account (FSA)',
    definition:
      'An employer-sponsored account that allows pre-tax contributions for qualified medical or dependent care expenses. Health FSA limit in 2026: $3,300. Dependent Care FSA: $5,000. FSA funds generally do not roll over ("use it or lose it"), though up to $660 may carry over.',
  },
  {
    term: 'Gross Pay',
    definition:
      'Your total earnings before any taxes or deductions are taken out. For salaried employees: annual salary ÷ number of pay periods. For hourly: hours × hourly rate + overtime.',
  },
  {
    term: 'Head of Household',
    definition:
      'A filing status for unmarried individuals who pay more than half the cost of maintaining a home for a qualifying person (such as a child or dependent parent). Provides a larger standard deduction and lower tax brackets than Single.',
  },
  {
    term: 'Health Savings Account (HSA)',
    definition:
      'A tax-advantaged account available to employees enrolled in a High-Deductible Health Plan (HDHP). Contributions made through payroll are exempt from both income tax and FICA. Funds roll over indefinitely. 2026 limits: $4,400 (self-only) / $8,750 (family).',
  },
  {
    term: 'Income Tax (Federal)',
    definition:
      'A progressive tax on individual income, administered by the IRS. Calculated on taxable income (gross income minus the standard or itemized deduction). Rates range from 10% to 37% for 2026.',
  },
  {
    term: 'Income Tax (State)',
    definition:
      'Income tax levied by a state government. Rates and structures vary widely — nine states levy no income tax at all; others use flat rates or progressive brackets.',
  },
  {
    term: 'Marginal Tax Rate',
    definition:
      'The tax rate applied to your last (highest) dollar of income — the top bracket you reach. Any additional income (raise, bonus, side project) is taxed at this rate at the margin. Not the same as your effective (average) tax rate.',
  },
  {
    term: 'Married Filing Jointly (MFJ)',
    definition:
      'A filing status for married couples who combine their income and deductions on a single tax return. Provides the largest standard deduction ($32,200 in 2026) and the widest bracket thresholds.',
  },
  {
    term: 'Medicare Tax',
    definition:
      'The Medicare portion of FICA — 1.45% of all wages with no cap. High earners also pay an additional 0.9% Additional Medicare Tax above $200,000 (single) or $250,000 (married filing jointly).',
  },
  {
    term: 'National Insurance (UK)',
    definition:
      'The UK\'s social insurance tax, equivalent to FICA in the US. Employee Class 1 NI is 8% on earnings between £12,570 and £50,270, and 2% above £50,270. The same rates apply in England, Scotland, Wales, and Northern Ireland.',
  },
  {
    term: 'Net Pay',
    definition:
      'Take-home pay — the amount deposited in your bank account after all taxes and deductions are subtracted from gross pay. The number you should use for budgeting.',
  },
  {
    term: 'OASDI',
    definition:
      'Old-Age, Survivors, and Disability Insurance — the official name for the Social Security program funded by the Social Security portion of FICA (6.2% up to $184,500 in 2026).',
  },
  {
    term: 'Pay Frequency',
    definition:
      'How often you receive a paycheck. Common frequencies: weekly (52 paychecks/year), bi-weekly (26), semi-monthly (24), monthly (12). Your gross pay per period equals annual salary ÷ number of periods.',
  },
  {
    term: 'Personal Allowance (UK)',
    definition:
      'The amount of income you can earn before paying UK Income Tax — £12,570 in 2025/26. The allowance tapers by £1 for every £2 of income above £100,000 and is fully withdrawn at £125,140.',
  },
  {
    term: 'Pre-Tax Deduction',
    definition:
      'See: Deduction (Pre-Tax).',
  },
  {
    term: 'Progressive Tax',
    definition:
      'A tax system where higher income is taxed at higher rates. In the US federal system, the first dollars of income are taxed at 10%; as income rises, additional dollars are taxed at 12%, 22%, 24%, and so on up to 37%.',
  },
  {
    term: 'QPIP (Quebec Parental Insurance Plan)',
    definition:
      'A Quebec-specific payroll deduction (0.494% in 2026) for parental leave benefits. Replaces part of EI for Quebec residents for parental, maternity, and adoption leave.',
  },
  {
    term: 'QPP (Quebec Pension Plan)',
    definition:
      'Quebec\'s provincial pension plan — functionally equivalent to CPP but administered separately. In 2026, the QPP employee contribution rate is 6.4% on the same pensionable earnings as CPP.',
  },
  {
    term: 'Roth 401(k)',
    definition:
      'A 401(k) variant where contributions are made with after-tax dollars. No current tax deduction, but qualified withdrawals in retirement are entirely tax-free, including growth. Same contribution limits as traditional 401(k).',
  },
  {
    term: 'Social Security Tax',
    definition:
      'The Social Security portion of FICA — 6.2% on wages up to the annual wage base ($184,500 in 2026). Once wages exceed the base, Social Security withholding stops for that calendar year.',
  },
  {
    term: 'Standard Deduction',
    definition:
      'A fixed dollar amount that reduces your taxable income before tax brackets are applied. In 2026: $16,100 (Single), $32,200 (Married Filing Jointly), $24,150 (Head of Household). Most taxpayers take the standard deduction rather than itemizing.',
  },
  {
    term: 'Student Loan Repayment (UK)',
    definition:
      'UK student loan repayments are deducted after tax. Plan 1 threshold: £24,990 at 9%. Plan 2: £27,295 at 9%. Plan 4 (Scotland): £31,395 at 9%. Postgraduate loans: £21,000 at 6%. Repayments stop when the balance is cleared or after a set term.',
  },
  {
    term: 'Supplemental Wage Withholding',
    definition:
      'The method used to withhold federal income tax from bonuses, commissions, and other supplemental pay. Employers can use a flat 22% withholding rate (for amounts under $1 million) or the aggregate method based on your regular withholding rate.',
  },
  {
    term: 'Taxable Income',
    definition:
      'The portion of your income subject to income tax. For most employees: Gross income − Standard deduction − Pre-tax deductions (401k, HSA, etc.) = Taxable income. Tax brackets are applied to this amount, not gross income.',
  },
  {
    term: 'W-4',
    definition:
      'IRS Form W-4, Employee\'s Withholding Certificate. Submitted to your employer to determine federal income tax withholding. Key inputs: filing status, whether you have multiple jobs, dependent credits, and any extra withholding. Submit a new W-4 whenever your tax situation changes.',
  },
  {
    term: 'Wage Base (Social Security)',
    definition:
      'The maximum amount of earnings subject to Social Security tax in a calendar year. In 2026: $184,500. Earnings above this threshold are not subject to the 6.2% Social Security tax (but remain subject to Medicare).',
  },
  {
    term: 'YMPE (Year\'s Maximum Pensionable Earnings)',
    definition:
      'The maximum earnings amount subject to CPP contributions in Canada. In 2026: $74,600. Earnings above this threshold are not subject to the 5.95% CPP rate.',
  },
  {
    term: 'Year-to-Date (YTD)',
    definition:
      'A running total of earnings, taxes withheld, and deductions from January 1st through the current pay period. The YTD column on your pay stub is useful for checking whether you\'re on track with withholding and whether you\'ve hit any caps (like the Social Security wage base).',
  },
];

export default function GlossaryPage() {
  const grouped: Record<string, typeof TERMS> = {};
  TERMS.forEach((t) => {
    const letter = t.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  });
  const letters = Object.keys(grouped).sort();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="phase-label text-muted mb-3">Reference</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          Paycheck &amp; Tax Glossary
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: '#78716C' }}>
          Plain-English definitions for every term you&rsquo;ll encounter on your pay stub, W-4, or tax return.
          Covers US, Canadian, and UK payroll terminology.
        </p>
      </div>

      {/* Alphabet nav */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors"
            style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
          >
            {l}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-8">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <div
              className="mb-4 px-4 py-2 rounded-lg inline-block"
              style={{ backgroundColor: '#F5F2ED', border: '1px solid #E2DDD6' }}
            >
              <span className="text-lg font-bold" style={{ color: '#B5533C' }}>{letter}</span>
            </div>
            <div className="space-y-4">
              {grouped[letter].map((item) => (
                <div
                  key={item.term}
                  className="overflow-hidden rounded-xl bg-white px-6 py-5"
                  style={{ border: '1px solid #E2DDD6' }}
                >
                  <dt className="font-semibold mb-1.5" style={{ color: '#1C1917' }}>{item.term}</dt>
                  <dd className="text-sm leading-relaxed" style={{ color: '#44403C' }}>{item.definition}</dd>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm mb-4" style={{ color: '#78716C' }}>
          Want to see these concepts in action?
        </p>
        <a
          href="/"
          className="inline-block rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#B5533C' }}
        >
          Try the Paycheck Calculator
        </a>
      </div>
    </div>
  );
}

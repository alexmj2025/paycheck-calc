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
      <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
        Paycheck Tax Calculator 2026
      </h1>
      <p className="mb-8 text-gray-600">
        Free take-home pay calculator for all 50 US states and all 10 Canadian provinces.
        Covers federal, state/provincial, and payroll taxes with <strong>2026</strong> tax brackets.
      </p>

      <Calculator />

      <AffiliateCTA />
      <EmailCapture />

      {/* ── SEO content ── */}
      <section className="mt-16 space-y-12 text-gray-700">

        {/* How to use */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How to use this calculator</h2>
          <p className="leading-relaxed">
            Enter your gross salary as an annual amount or per paycheck, select your pay frequency, choose your
            filing status, and pick your state or province. The calculator shows your estimated take-home pay
            instantly along with a full annual breakdown.
          </p>
          <p className="mt-3 leading-relaxed">
            For a more precise result, fill in the pre-tax deductions section. Contributions to a traditional
            401(k), health insurance premiums, HSA and FSA contributions (US), or RRSP and group benefits (Canada)
            all reduce your taxable income before taxes are calculated.
          </p>
          <p className="mt-3 leading-relaxed">
            Switch between the 🇺🇸 US and 🇨🇦 Canada tabs to calculate for either country.
          </p>
        </div>

        {/* US taxes */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How paycheck taxes work in the US</h2>
          <p className="leading-relaxed">
            Every paycheck is subject to several layers of taxation. <strong>Federal income tax</strong> is
            calculated using progressive brackets — you pay a lower rate on the first dollars of income and a
            higher rate only on income above each threshold. In 2026, rates range from 10% (on income up to
            $12,400 for single filers) to 37% (on income above $640,600).
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>FICA taxes</strong> cover Social Security and Medicare. You pay 6.2% of your wages toward
            Social Security on the first $184,500 of earnings (2026), and 1.45% toward Medicare on all wages.
            High earners pay an additional 0.9% Medicare surtax on wages above $200,000 (single) or $250,000
            (married filing jointly).
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>State income tax</strong> varies widely. Nine states — Alaska, Florida, Nevada, New Hampshire,
            South Dakota, Tennessee, Texas, Washington, and Wyoming — levy no state income tax at all. Most other
            states use progressive brackets similar to the federal system, though rates and thresholds differ
            significantly.
          </p>
          <div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">
            <p className="font-medium text-gray-900">Example: $60,000 salary, Texas (no state tax), single, bi-weekly (2026)</p>
            <ul className="mt-2 list-inside list-disc space-y-1 leading-relaxed">
              <li>Annual gross: $60,000 | Per paycheck: $2,307.69</li>
              <li>Federal taxable income: $60,000 − $16,100 (std. deduction) = $43,900</li>
              <li>Federal tax: 10% × $12,400 + 12% × $31,500 = $1,240 + $3,780 = <strong>$5,020/yr</strong></li>
              <li>Social Security: 6.2% × $60,000 = <strong>$3,720/yr</strong></li>
              <li>Medicare: 1.45% × $60,000 = <strong>$870/yr</strong></li>
              <li>State tax: <strong>$0</strong> (Texas)</li>
              <li>Total taxes: $9,610/yr → Net annual: $50,390 → <strong>~$1,938 per paycheck</strong></li>
            </ul>
          </div>
        </div>

        {/* US brackets table */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">2026 Federal Income Tax Brackets</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Rate</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Single</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Married Filing Jointly</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Head of Household</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['10%', '$0 – $12,400', '$0 – $24,800', '$0 – $18,600'],
                  ['12%', '$12,401 – $50,400', '$24,801 – $100,800', '$18,601 – $75,600'],
                  ['22%', '$50,401 – $105,700', '$100,801 – $211,400', '$75,601 – $158,550'],
                  ['24%', '$105,701 – $201,775', '$211,401 – $403,550', '$158,551 – $302,650'],
                  ['32%', '$201,776 – $256,225', '$403,551 – $512,450', '$302,651 – $384,325'],
                  ['35%', '$256,226 – $640,600', '$512,451 – $768,700', '$384,326 – $704,650'],
                  ['37%', '$640,601+', '$768,701+', '$704,651+'],
                ].map(([rate, single, mfj, hoh]) => (
                  <tr key={rate} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium text-blue-700">{rate}</td>
                    <td className="border border-gray-200 px-4 py-2">{single}</td>
                    <td className="border border-gray-200 px-4 py-2">{mfj}</td>
                    <td className="border border-gray-200 px-4 py-2">{hoh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Standard deductions (2026): Single $16,100 · Married filing jointly $32,200 · Head of household $24,150.
            Social Security wage base: $184,500. Source: IRS Rev. Proc. 2025-32.
          </p>

        </div>

        {/* No income tax states */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">States with No Income Tax</h2>
          <p className="leading-relaxed">
            Nine states levy no individual income tax on wages: <strong>Alaska, Florida, Nevada, New Hampshire,
            South Dakota, Tennessee, Texas, Washington,</strong> and <strong>Wyoming</strong>. New Hampshire taxes
            investment income but not earned wages.
          </p>
          <p className="mt-3 leading-relaxed">
            A worker earning $75,000 in California might pay $4,000–$6,000 more in state taxes annually than the
            same worker in Texas. However, no-income-tax states often offset this through higher property taxes or
            sales taxes — the total burden depends on your full financial picture.
          </p>
        </div>

        {/* Canada section */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How Canadian paycheck taxes work</h2>
          <p className="leading-relaxed">
            Every Canadian paycheck is subject to four main deductions: <strong>federal income tax</strong> (15%–33%
            on progressive brackets), <strong>CPP contributions</strong> (5.95% on earnings between $3,500 and
            $74,600 YMPE in 2026), <strong>EI premiums</strong> (1.63% up to $68,900), and{' '}
            <strong>provincial income tax</strong> at each province&apos;s own rates.
          </p>
          <p className="mt-3 leading-relaxed">
            The federal Basic Personal Amount of $16,452 (2026) generates a 15% non-refundable credit, effectively
            sheltering the first ~$16,452 of income from federal tax. Quebec workers pay QPP (6.4%) instead of CPP
            and QPIP (0.494%) in addition to a reduced EI rate. Pre-tax deductions like RRSP contributions and
            group benefits reduce your taxable income for both federal and provincial purposes.
          </p>
          <p className="mt-3 leading-relaxed">
            Alberta is the most tax-friendly province with a 10% flat rate up to $148,269 and a BPA of $21,003.
            Ontario applies a provincial surtax on higher earners. Use the calculator above — switch to 🇨🇦 Canada
            and select your province to see your exact take-home pay.
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>

        {/* US state links */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Calculate your take-home pay by state
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {topStateLinks.map((state) => (
              <a
                key={state.abbreviation}
                href={`/${state.slug}`}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {state.name}
              </a>
            ))}
          </div>
        </div>

        {/* Canada province links */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Calculate by Canadian province
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {PROVINCES.map((p) => (
              <a
                key={p.abbreviation}
                href={`/canada/${p.slug}`}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

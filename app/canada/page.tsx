import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { PROVINCES } from '@/lib/provinceData';

export const metadata: Metadata = {
  title: 'Canada Paycheck Tax Calculator 2025 & 2026 — Free Take-Home Pay by Province',
  description:
    'Calculate your exact Canadian take-home pay after federal and provincial taxes. Free paycheck calculator for all 10 provinces with 2025 and 2026 tax brackets, CPP, and EI.',
  alternates: { canonical: 'https://paychecktaxcalc.com/canada' },
};

export default function CanadaPage() {
  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
        Canada Paycheck Tax Calculator 2024 &amp; 2025
      </h1>
      <p className="mb-8 text-gray-600">
        Calculate your exact Canadian take-home pay after federal income tax, CPP contributions, EI premiums,
        and provincial income tax. Covers all 10 provinces with 2025 and 2026 rates.
      </p>

      <Calculator defaultCountry="CA" />

      <AffiliateCTA />
      <EmailCapture />

      {/* Province links */}
      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Calculate by province
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
      </section>

      {/* SEO content */}
      <section className="mt-16 space-y-10 text-gray-700">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">How Canadian paycheck taxes work</h2>
          <p className="leading-relaxed">
            Every Canadian paycheck is subject to four main deductions. <strong>Federal income tax</strong> uses
            progressive brackets ranging from 15% to 33% in 2025. The federal Basic Personal Amount (BPA) of
            $16,129 (2025) generates a non-refundable tax credit that reduces your federal tax owing.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>CPP contributions</strong> (Canada Pension Plan) are 5.95% of pensionable earnings between
            $3,500 and $71,300 (2025 YMPE). High earners also contribute CPP2 at 4% on earnings between the YMPE
            and the Year&apos;s Additional Maximum Pensionable Earnings ($81,900 in 2025). Quebec workers contribute
            to QPP instead of CPP at a higher rate of 6.4%.
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>EI premiums</strong> (Employment Insurance) are 1.64% (2025) on insurable earnings up to
            $65,700. Quebec workers pay a reduced EI rate of 1.30% because they also pay into the Quebec Parental
            Insurance Plan (QPIP).
          </p>
          <p className="mt-3 leading-relaxed">
            <strong>Provincial income tax</strong> is levied by each province at its own set of progressive
            brackets. Ontario and most other provinces use the same taxable income base as the federal calculation.
            Ontario also has a surtax on higher provincial tax amounts. Alberta is Canada&apos;s most tax-friendly
            province, with a 10% rate on the first $148,269 of income and one of the highest basic personal amounts
            in the country at $21,003.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">2026 Canadian Federal Income Tax Brackets</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Rate</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Income Range (all filing statuses)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['15%', '$0 – $58,523'],
                  ['20.5%', '$58,524 – $117,045'],
                  ['26%', '$117,046 – $161,689'],
                  ['29%', '$161,690 – $258,482'],
                  ['33%', '$258,483+'],
                ].map(([rate, range]) => (
                  <tr key={rate} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium text-red-700">{rate}</td>
                    <td className="border border-gray-200 px-4 py-2">{range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Federal Basic Personal Amount (2026): $16,452. Canada uses a single set of brackets (no separate
            married/single rates). Source: CRA T4032 Payroll Deductions Tables.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">CPP and EI rates 2026</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Contribution</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Employee Rate</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Maximum Earnings</th>
                  <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Max Employee Contribution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ['CPP', '5.95%', '$74,600 (YMPE)', '~$4,230'],
                  ['CPP2', '4.00%', '$85,000 (YAMPE)', '~$416'],
                  ['EI', '1.63%', '$68,900 (MIE)', '~$1,123'],
                  ['QPP (QC)', '6.40%', '$74,600 (YMPE)', '~$4,550'],
                  ['QPIP (QC)', '0.494%', '$103,000', '~$509'],
                  ['EI – QC', '1.30%', '$68,900 (MIE)', '~$896'],
                ].map(([name, rate, max, contrib]) => (
                  <tr key={name} className="even:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium">{name}</td>
                    <td className="border border-gray-200 px-4 py-2">{rate}</td>
                    <td className="border border-gray-200 px-4 py-2">{max}</td>
                    <td className="border border-gray-200 px-4 py-2">{contrib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Employers match CPP/QPP at 1:1 and EI at 1.4× the employee premium. These employer contributions
            are shown informational-only in the breakdown table.
          </p>
        </div>
      </section>
    </div>
  );
}

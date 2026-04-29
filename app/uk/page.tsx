import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { UK_REGIONS } from '@/lib/ukRegionData';

export const metadata: Metadata = {
  title: 'UK Paycheck Tax Calculator 2025/26 — Free Take-Home Pay by Region',
  description:
    'Calculate your exact UK take-home pay after income tax and National Insurance. Free paycheck calculator for England, Scotland, Wales and Northern Ireland with 2025/26 tax rates.',
  alternates: { canonical: 'https://paychecktaxcalc.com/uk' },
};

export default function UKPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="phase-label text-muted mb-3">Tax Year 2025/26 · United Kingdom</p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          UK Paycheck Tax Calculator 2025/26
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-sm" style={{ color: '#78716C' }}>
          Calculate your exact UK take-home pay after Income Tax and National Insurance.
          Covers England, Scotland, Wales and Northern Ireland with 2025/26 rates, Student Loan repayments,
          and pension salary sacrifice.
        </p>
      </div>

      <Calculator defaultCountry="UK" />

      <AffiliateCTA />
      <EmailCapture />

      {/* Region links */}
      <section className="mt-12">
        <p className="phase-label text-muted mb-2">By Region</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C1917' }}>Calculate by UK region</h2>
        <div className="flex flex-wrap gap-2">
          {UK_REGIONS.map((r) => (
            <a
              key={r.abbreviation}
              href={`/uk/${r.slug}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
            >
              {r.name}
            </a>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">How UK Paycheck Taxes Work</span>
        </div>
        <div className="px-6 py-6 space-y-8" style={{ color: '#44403C' }}>

          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Every UK paycheck is subject to two main deductions: <strong>Income Tax</strong> and{' '}
              <strong>National Insurance (Class 1)</strong>. Student Loan repayments and pension
              contributions may also apply depending on your situation.
            </p>
            <p>
              <strong>Income Tax</strong> is calculated above your Personal Allowance of £12,570.
              In England, Wales, and Northern Ireland, the basic rate is 20% (up to £50,270), higher
              rate 40% (up to £125,140), and additional rate 45% above that. Scotland uses different
              rates set by the Scottish Parliament — from 19% (starter) to 48% (top rate).
            </p>
            <p>
              <strong>National Insurance</strong> (Class 1 employee) is 8% on earnings between £12,570
              and £50,270, and 2% on earnings above £50,270. Unlike Income Tax, there is no personal
              allowance equivalent — NI starts at the Primary Threshold.
            </p>
            <p>
              <strong>Pension contributions</strong> via salary sacrifice reduce both your Income Tax and
              National Insurance bill since they come off your gross salary before either is calculated.
            </p>
            <p>
              <strong>Student Loan</strong> repayments are deducted after tax at 9% above the plan threshold
              (Plan 1: £24,990 · Plan 2: £27,295 · Plan 4 Scotland: £31,395) or 6% for postgraduate loans
              above £21,000.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>2025/26 Income Tax Brackets — England, Wales & N. Ireland</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Band', 'Taxable Income', 'Rate'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Personal Allowance', 'Up to £12,570', '0%'],
                    ['Basic Rate', '£12,571 – £50,270', '20%'],
                    ['Higher Rate', '£50,271 – £125,140', '40%'],
                    ['Additional Rate', 'Over £125,140', '45%'],
                  ].map(([band, range, rate]) => (
                    <tr key={band} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3" style={{ color: '#1C1917' }}>{band}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{range}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              Personal Allowance tapers by £1 for every £2 of income over £100,000 (fully withdrawn at £125,140).
              Source: HMRC 2025/26.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>2025/26 Income Tax Brackets — Scotland</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Band', 'Taxable Income', 'Rate'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Personal Allowance', 'Up to £12,570', '0%'],
                    ['Starter Rate', '£12,571 – £14,876', '19%'],
                    ['Basic Rate', '£14,877 – £26,561', '20%'],
                    ['Intermediate Rate', '£26,562 – £43,662', '21%'],
                    ['Higher Rate', '£43,663 – £75,000', '42%'],
                    ['Advanced Rate', '£75,001 – £125,140', '45%'],
                    ['Top Rate', 'Over £125,140', '48%'],
                  ].map(([band, range, rate]) => (
                    <tr key={band} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3" style={{ color: '#1C1917' }}>{band}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{range}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              Scotland sets its own income tax rates via the Scottish Parliament. Source: Revenue Scotland 2025/26.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>National Insurance Rates 2025/26</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Earnings', 'Employee NI Rate'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Up to £12,570 (Primary Threshold)', '0%'],
                    ['£12,571 – £50,270 (Upper Earnings Limit)', '8%'],
                    ['Above £50,270', '2%'],
                  ].map(([earnings, rate]) => (
                    <tr key={earnings} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{earnings}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              Employer NI (15% above the secondary threshold) is not included — this shows employee deductions only. Source: HMRC.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

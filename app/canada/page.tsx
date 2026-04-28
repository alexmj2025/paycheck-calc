import type { Metadata } from 'next';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { PROVINCES } from '@/lib/provinceData';

export const metadata: Metadata = {
  title: 'Canada Paycheck Tax Calculator 2026 — Free Take-Home Pay by Province',
  description:
    'Calculate your exact Canadian take-home pay after federal and provincial taxes. Free paycheck calculator for all 10 provinces with 2026 tax brackets, CPP, and EI.',
  alternates: { canonical: 'https://paychecktaxcalc.com/canada' },
};

export default function CanadaPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <p className="phase-label text-muted mb-3">Tax Year 2026 · All 10 Provinces</p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          Canada Paycheck Tax Calculator 2026
        </h1>
        <p className="mt-3 mx-auto max-w-xl text-sm" style={{ color: '#78716C' }}>
          Calculate your exact Canadian take-home pay after federal income tax, CPP contributions, EI premiums,
          and provincial income tax. Covers all 10 provinces with 2026 rates.
        </p>
      </div>

      <Calculator defaultCountry="CA" />

      <AffiliateCTA />
      <EmailCapture />

      {/* Province links */}
      <section className="mt-12">
        <p className="phase-label text-muted mb-2">By Province</p>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C1917' }}>Calculate by province</h2>
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

      {/* SEO content */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">How Canadian Paycheck Taxes Work</span>
        </div>
        <div className="px-6 py-6 space-y-8" style={{ color: '#44403C' }}>

          <div className="space-y-3 text-sm leading-relaxed">
            <p>
              Every Canadian paycheck is subject to four main deductions. <strong>Federal income tax</strong> uses
              progressive brackets ranging from 15% to 33% in 2026. The federal Basic Personal Amount (BPA) of
              $16,452 (2026) generates a non-refundable tax credit that reduces your federal tax owing.
            </p>
            <p>
              <strong>CPP contributions</strong> (Canada Pension Plan) are 5.95% of pensionable earnings between
              $3,500 and $74,600 (2026 YMPE). High earners also contribute CPP2 at 4% on earnings between the YMPE
              and the Year&apos;s Additional Maximum Pensionable Earnings ($85,000 in 2026). Quebec workers contribute
              to QPP instead of CPP at a higher rate of 6.4%.
            </p>
            <p>
              <strong>EI premiums</strong> (Employment Insurance) are 1.63% (2026) on insurable earnings up to
              $68,900. Quebec workers pay a reduced EI rate of 1.30% because they also pay into the Quebec Parental
              Insurance Plan (QPIP).
            </p>
            <p>
              <strong>Provincial income tax</strong> is levied by each province at its own set of progressive
              brackets. Alberta is Canada&apos;s most tax-friendly province, with a 10% rate on the first $148,269 of income.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>2026 Canadian Federal Income Tax Brackets</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Rate', 'Income Range'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['15%', '$0 – $58,523'],
                    ['20.5%', '$58,524 – $117,045'],
                    ['26%', '$117,046 – $161,689'],
                    ['29%', '$161,690 – $258,482'],
                    ['33%', '$258,483+'],
                  ].map(([rate, range]) => (
                    <tr key={rate} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              BPA (2026): $16,452. Single bracket set — no separate married/single rates. Source: CRA T4032.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>CPP and EI Rates 2026</h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Contribution', 'Rate', 'Max Earnings', 'Max Employee'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CPP', '5.95%', '$74,600 (YMPE)', '~$4,230'],
                    ['CPP2', '4.00%', '$85,000 (YAMPE)', '~$416'],
                    ['EI', '1.63%', '$68,900 (MIE)', '~$1,123'],
                    ['QPP (QC)', '6.40%', '$74,600 (YMPE)', '~$4,550'],
                    ['QPIP (QC)', '0.494%', '$103,000', '~$509'],
                    ['EI – QC', '1.30%', '$68,900 (MIE)', '~$896'],
                  ].map(([name, rate, max, contrib]) => (
                    <tr key={name} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: '#1C1917' }}>{name}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{rate}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{max}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{contrib}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
              Employers match CPP/QPP at 1:1 and EI at 1.4× the employee premium.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

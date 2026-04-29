import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { UK_REGIONS, UK_REGION_MAP } from '@/lib/ukRegionData';
import { UKRegion } from '@/lib/ukTaxRates';

export async function generateStaticParams() {
  return UK_REGIONS.map((r) => ({ region: r.slug }));
}

interface Props {
  params: { region: string };
}

function getRegionBySlug(slug: string) {
  return UK_REGIONS.find((r) => r.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const region = getRegionBySlug(params.region);
  if (!region) return {};
  return {
    title: `${region.name} Paycheck Tax Calculator 2025/26 — UK Take-Home Pay`,
    description: `Calculate your exact ${region.name} take-home pay after Income Tax and National Insurance. Free 2025/26 paycheck calculator.`,
    alternates: { canonical: `https://paychecktaxcalc.com/uk/${region.slug}` },
  };
}

const REGION_NOTES: Partial<Record<UKRegion, string>> = {
  SCT: 'Scotland sets its own income tax rates via the Scottish Parliament (Scottish Rate of Income Tax — SRIT). Rates differ from the rest of the UK: a 19% starter rate, 20% basic, 21% intermediate, 42% higher, 45% advanced, and 48% top rate. National Insurance rates are the same as the rest of the UK.',
  WLS: 'Wales has devolved income tax powers (Welsh Rates of Income Tax — WRIT) but currently mirrors the England rates. Basic rate 20%, higher rate 40%, additional rate 45%.',
  NIR: 'Northern Ireland uses the same income tax rates as England — basic 20%, higher 40%, additional 45%. National Insurance rates are also the same across the UK.',
};

export default function UKRegionPage({ params }: Props) {
  const region = getRegionBySlug(params.region);
  if (!region) notFound();

  const abbr = region.abbreviation as UKRegion;
  const note = REGION_NOTES[abbr];
  const isScotland = abbr === 'SCT';

  return (
    <div>
      <div className="mb-8">
        <p className="phase-label text-muted mb-2">Tax Year 2025/26 · United Kingdom</p>
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-3" style={{ color: '#1C1917' }}>
          {region.name} Paycheck Tax Calculator 2025/26
        </h1>
        {note && (
          <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{note}</p>
        )}
      </div>

      <Calculator defaultCountry="UK" defaultUKRegion={abbr} />

      <AffiliateCTA />
      <EmailCapture />

      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">{region.name} Tax Details</span>
        </div>
        <div className="px-6 py-6 space-y-6 text-sm leading-relaxed" style={{ color: '#44403C' }}>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>
              {isScotland ? 'Scotland Income Tax Brackets 2025/26' : 'Income Tax Brackets 2025/26'}
            </h2>
            <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                    {['Band', 'Income', 'Rate'].map(h => (
                      <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(isScotland ? [
                    ['Personal Allowance', 'Up to £12,570', '0%'],
                    ['Starter Rate', '£12,571 – £14,876', '19%'],
                    ['Basic Rate', '£14,877 – £26,561', '20%'],
                    ['Intermediate Rate', '£26,562 – £43,662', '21%'],
                    ['Higher Rate', '£43,663 – £75,000', '42%'],
                    ['Advanced Rate', '£75,001 – £125,140', '45%'],
                    ['Top Rate', 'Over £125,140', '48%'],
                  ] : [
                    ['Personal Allowance', 'Up to £12,570', '0%'],
                    ['Basic Rate', '£12,571 – £50,270', '20%'],
                    ['Higher Rate', '£50,271 – £125,140', '40%'],
                    ['Additional Rate', 'Over £125,140', '45%'],
                  ]).map(([band, range, rate]) => (
                    <tr key={band} style={{ borderBottom: '1px solid #F0EDE7' }}>
                      <td className="px-4 py-3" style={{ color: '#1C1917' }}>{band}</td>
                      <td className="px-4 py-3" style={{ color: '#44403C' }}>{range}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1C1917' }}>National Insurance 2025/26</h2>
            <p>Employee Class 1 NI: <strong>8%</strong> on earnings £12,570–£50,270 and <strong>2%</strong> above £50,270. The same rates apply across all UK regions.</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: '#1C1917' }}>How to use this calculator</h2>
            <ol className="list-inside list-decimal space-y-1.5">
              <li>Enter your gross annual salary or per-paycheck amount.</li>
              <li>Select your pay frequency — monthly is most common in the UK.</li>
              <li>Confirm {region.name} is selected as your region.</li>
              <li>Add pension salary sacrifice contributions to see the NI and tax savings.</li>
              <li>Select your Student Loan plan if applicable.</li>
            </ol>
          </div>

        </div>
      </section>

      <section className="mt-10">
        <p className="phase-label text-muted mb-2">Compare</p>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Other UK regions</h2>
        <div className="flex flex-wrap gap-2">
          {UK_REGIONS.filter((r) => r.abbreviation !== abbr).map((r) => (
            <a
              key={r.abbreviation}
              href={`/uk/${r.slug}`}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
            >
              {r.name} Calculator
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

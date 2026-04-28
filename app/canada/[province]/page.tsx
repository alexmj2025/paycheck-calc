import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { PROVINCES, getProvinceBySlug, PROVINCE_MAP } from '@/lib/provinceData';
import { PROVINCE_TAX_CONFIGS, ProvinceTaxConfig, CABracket } from '@/lib/canadaTaxRates';
import { Province } from '@/lib/canadaTaxRates';

export async function generateStaticParams() {
  return PROVINCES.map((p) => ({ province: p.slug }));
}

interface Props {
  params: { province: string };
}

function formatBracketTable(brackets: CABracket[], bpa: number, provinceName: string) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
      <table className="min-w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
            <th className="px-4 py-3 text-left phase-label text-muted font-normal">Taxable Income</th>
            <th className="px-4 py-3 text-left phase-label text-muted font-normal">Provincial Rate</th>
          </tr>
        </thead>
        <tbody>
          {brackets.map((b, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #F0EDE7' }}>
              <td className="px-4 py-3" style={{ color: '#44403C' }}>
                {b.max === Infinity
                  ? `$${b.min.toLocaleString()}+`
                  : `$${b.min.toLocaleString()} – $${b.max.toLocaleString()}`}
              </td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>
                {(b.rate * 100).toFixed(4).replace(/\.?0+$/, '')}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-4 pb-3 mt-1 text-xs" style={{ color: '#A8A29E' }}>
        {provinceName} Basic Personal Amount: ${bpa.toLocaleString()} — generates a non-refundable credit.
      </p>
    </div>
  );
}

function getProvinceIntro(name: string, abbr: Province, config: ProvinceTaxConfig): string {
  const topBracket = config.brackets[config.brackets.length - 1];
  const topRate = (topBracket.rate * 100).toFixed(topBracket.rate < 0.1 ? 4 : 2).replace(/\.?0+$/, '');
  const lowestRate = (config.lowestRate * 100).toFixed(4).replace(/\.?0+$/, '');

  if (abbr === 'AB') {
    return `Alberta is Canada's most tax-friendly province, with a 10% flat rate on income up to $148,269 and one of the highest basic personal amounts at $21,003 — meaning more income is sheltered from tax before a single dollar is collected. High earners face a top provincial rate of ${topRate}%. Combined with federal tax, CPP (5.95%), and EI (1.63%), use the calculator above to find your exact Alberta take-home pay for 2026.`;
  }
  if (abbr === 'QC') {
    return `Quebec has its own provincial tax system administered by Revenu Québec, with brackets ranging from 14% to 25.75%. Workers in Quebec pay QPP (Québec Pension Plan) at 6.4% instead of the federal CPP, and QPIP (Québec Parental Insurance Plan) at 0.494%, while paying a reduced EI rate of 1.30%. The provincial Basic Personal Amount is $17,183. Use the calculator above to get your exact Quebec take-home pay for 2026.`;
  }
  if (abbr === 'ON') {
    return `Ontario workers face a provincial income tax starting at ${lowestRate}% and rising to ${topRate}%, plus a unique provincial surtax on higher earners — an extra 20% on provincial tax exceeding $5,315, and an additional 36% on tax exceeding $6,802. The provincial Basic Personal Amount is $11,141. Combined with federal tax, CPP, and EI, Ontario's total tax burden can be significant for high earners. Use the calculator to see your exact take-home pay.`;
  }
  if (abbr === 'BC') {
    return `British Columbia uses a seven-bracket provincial income tax system, with rates ranging from ${lowestRate}% to ${topRate}% for the highest earners above $240,716. The provincial Basic Personal Amount is $11,981. BC is among the higher-tax provinces for top earners but competitive in the lower brackets. Combined with federal tax, CPP, and EI, use the calculator above to find your exact BC take-home pay.`;
  }
  if (abbr === 'NS') {
    return `Nova Scotia has one of the higher top provincial tax rates in Canada at ${topRate}%, applying to income above $150,000. The provincial Basic Personal Amount is $8,481 — one of the lowest in the country. The lowest bracket rate is ${lowestRate}%. Combined with federal tax, CPP, and EI, use the calculator above to find your exact Nova Scotia take-home pay for 2026.`;
  }
  if (abbr === 'NL') {
    return `Newfoundland and Labrador has a seven-bracket provincial system with Canada's highest top marginal rate at ${topRate}%, applying to income above $551,739. The Basic Personal Amount is $10,818. The lowest rate starts at ${lowestRate}%. Combined with federal tax, CPP, and EI, use the calculator above to calculate your exact Newfoundland take-home pay for 2026.`;
  }

  return `${name} uses a progressive provincial income tax system with brackets starting at ${lowestRate}% and reaching ${topRate}% for the highest earners. The provincial Basic Personal Amount is $${config.basicPersonalAmount.toLocaleString()}, which generates a non-refundable tax credit reducing the tax you owe. On top of provincial tax, ${name} workers also pay federal income tax (15%–33%), CPP contributions (5.95% up to YMPE), and EI premiums (1.63% up to MIE). Pre-tax deductions such as RRSP contributions, group benefits, and pension contributions can reduce your taxable income. Use the calculator above to calculate your exact ${name} take-home pay for 2026.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const provinceInfo = getProvinceBySlug(params.province);
  if (!provinceInfo) return {};
  const title = `${provinceInfo.name} Paycheck Tax Calculator 2026 — Free Take-Home Pay`;
  const description = `Calculate your exact ${provinceInfo.name} take-home pay after federal and provincial taxes, CPP, and EI. Free calculator with 2026 tax brackets.`;
  return {
    title,
    description,
    alternates: { canonical: `https://paychecktaxcalc.com/canada/${provinceInfo.slug}` },
    openGraph: { title, description, url: `https://paychecktaxcalc.com/canada/${provinceInfo.slug}` },
  };
}

export default function ProvincePage({ params }: Props) {
  const provinceInfo = getProvinceBySlug(params.province);
  if (!provinceInfo) notFound();

  const abbr = provinceInfo.abbreviation as Province;
  const config = PROVINCE_TAX_CONFIGS[abbr];
  const intro = getProvinceIntro(provinceInfo.name, abbr, config);
  const topRate = (config.brackets[config.brackets.length - 1].rate * 100)
    .toFixed(4).replace(/\.?0+$/, '');

  const nearbyLinks = provinceInfo.nearbyProvinces
    .map((a) => PROVINCE_MAP[a])
    .filter(Boolean)
    .slice(0, 5);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://paychecktaxcalc.com' },
      { '@type': 'ListItem', position: 2, name: 'Canada', item: 'https://paychecktaxcalc.com/canada' },
      { '@type': 'ListItem', position: 3, name: `${provinceInfo.name} Paycheck Calculator`, item: `https://paychecktaxcalc.com/canada/${provinceInfo.slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the provincial income tax rate in ${provinceInfo.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${provinceInfo.name} uses a progressive provincial income tax system. The lowest rate is ${(config.lowestRate * 100).toFixed(4).replace(/\.?0+$/, '')}% and the top rate is ${topRate}%. The provincial Basic Personal Amount of $${config.basicPersonalAmount.toLocaleString()} generates a non-refundable credit that reduces your tax owing.`,
        },
      },
      {
        '@type': 'Question',
        name: `How is CPP calculated in ${provinceInfo.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: abbr === 'QC'
            ? `Quebec workers pay QPP (Québec Pension Plan) at 6.4% on pensionable earnings between $3,500 and the YMPE ($74,600 in 2026) instead of the federal CPP.`
            : `Workers in ${provinceInfo.name} pay CPP at 5.95% on pensionable earnings between $3,500 and the Year's Maximum Pensionable Earnings ($74,600 in 2026).`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the EI rate in ${provinceInfo.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: abbr === 'QC'
            ? `Quebec workers pay a reduced EI rate of 1.30% (2026) on insurable earnings up to $68,900.`
            : `Workers in ${provinceInfo.name} pay EI premiums at 1.63% (2026) on insurable earnings up to $68,900.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do RRSP contributions affect my ${provinceInfo.name} taxes?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `RRSP contributions reduce your federal and provincial taxable income dollar-for-dollar. The 2026 RRSP contribution limit is 18% of your previous year's earned income, up to $32,490.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the effective total tax rate on an $80,000 salary in ${provinceInfo.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `On an $80,000 annual salary in ${provinceInfo.name}, the combined effective tax rate (federal + provincial + CPP + EI) typically falls between 25% and 35%, depending on deductions. Use the calculator above to get a precise figure.`,
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm" style={{ color: '#78716C' }}>
        <ol className="flex flex-wrap items-center gap-1 list-none">
          <li><a href="/" style={{ color: '#78716C' }} className="hover:underline">Home</a></li>
          <li aria-hidden="true">›</li>
          <li><a href="/canada" style={{ color: '#78716C' }} className="hover:underline">Canada</a></li>
          <li aria-hidden="true">›</li>
          <li style={{ color: '#1C1917' }}>{provinceInfo.name} Calculator</li>
        </ol>
      </nav>

      <div className="mb-8">
        <p className="phase-label text-muted mb-2">Tax Year 2026 · Canada</p>
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-3" style={{ color: '#1C1917' }}>
          {provinceInfo.name} Paycheck Tax Calculator 2026
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{intro}</p>
      </div>

      <Calculator defaultCountry="CA" defaultProvince={abbr} />

      <AffiliateCTA />
      <EmailCapture />

      {/* Content section */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">{provinceInfo.name} Tax Details</span>
        </div>
        <div className="px-6 py-6 space-y-8" style={{ color: '#44403C' }}>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>
              How {provinceInfo.name} paycheck taxes work
            </h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                Every {provinceInfo.name} paycheck is subject to four main deductions: federal income tax,{' '}
                {abbr === 'QC' ? 'QPP (Québec Pension Plan)' : 'CPP (Canada Pension Plan)'},
                {abbr === 'QC' ? ' EI (with QPIP),' : ' EI (Employment Insurance),'} and{' '}
                {provinceInfo.name} provincial income tax.
              </p>
              <p>
                <strong>Federal income tax</strong> uses progressive brackets from 15% to 33% in 2026.
                The federal Basic Personal Amount of $16,452 (2026) generates a 15% non-refundable credit
                reducing your federal tax owing.
              </p>
              <p>
                {abbr === 'QC' ? (
                  <>
                    <strong>QPP contributions</strong> are 6.4% on earnings between $3,500 and $74,600 (2026 YMPE).
                    QPP2 applies at 4% on earnings between the YMPE and $85,000 (YAMPE). Quebec workers also pay
                    QPIP at 0.494% on earnings up to $98,000, and a reduced EI rate of 1.30%.
                  </>
                ) : (
                  <>
                    <strong>CPP contributions</strong> are 5.95% on earnings between $3,500 and $74,600
                    (2026 YMPE). CPP2 applies at 4% on earnings between $74,600 and $85,000 (YAMPE). EI premiums
                    are 1.63% on insurable earnings up to $68,900.
                  </>
                )}
              </p>
              <p>
                <strong>{provinceInfo.name} provincial income tax</strong> uses brackets starting at{' '}
                {(config.lowestRate * 100).toFixed(4).replace(/\.?0+$/, '')}% and reaching {topRate}% at the top.
                The provincial Basic Personal Amount of ${config.basicPersonalAmount.toLocaleString()} generates
                a non-refundable credit.
                {config.hasSurtax && (
                  ` Ontario also levies a provincial surtax: 20% on provincial tax exceeding $5,315 and an
                  additional 36% on provincial tax exceeding $6,802.`
                )}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>
              {provinceInfo.name} provincial income tax brackets 2026
            </h2>
            {formatBracketTable(config.brackets, config.basicPersonalAmount, provinceInfo.name)}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>How to use this calculator</h2>
            <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed">
              <li>Enter your gross salary as an annual amount or per paycheck.</li>
              <li>Select your pay frequency (weekly, bi-weekly, semi-monthly, monthly, or annually).</li>
              <li>Confirm Canada is selected and {provinceInfo.name} appears in the province dropdown.</li>
              <li>Add pre-tax deductions (RRSP, group benefits, pension) to lower your taxable income.</li>
              <li>View your full 2026 tax breakdown including federal, provincial, CPP, and EI.</li>
            </ol>
          </div>

          <div aria-label={`${provinceInfo.name} paycheck tax FAQ`}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1C1917' }}>
              {provinceInfo.name} Paycheck Tax FAQ
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: `What is the provincial income tax rate in ${provinceInfo.name}?`,
                  a: `${provinceInfo.name} uses progressive provincial income tax brackets. The lowest rate is ${(config.lowestRate * 100).toFixed(4).replace(/\.?0+$/, '')}% and the top rate is ${topRate}%. The provincial Basic Personal Amount of $${config.basicPersonalAmount.toLocaleString()} generates a non-refundable credit that reduces your tax owing.`,
                },
                {
                  q: `How is CPP calculated in ${provinceInfo.name}?`,
                  a: abbr === 'QC'
                    ? `Quebec workers pay QPP at 6.4% on pensionable earnings between $3,500 and the YMPE ($74,600 in 2026). QPP2 applies at 4% on earnings between $74,600 and $85,000.`
                    : `Workers in ${provinceInfo.name} pay CPP at 5.95% on pensionable earnings between $3,500 and $74,600 (2026 YMPE). CPP2 at 4% applies on earnings from $74,600 to $85,000.`,
                },
                {
                  q: `Do RRSP contributions reduce taxes in ${provinceInfo.name}?`,
                  a: `Yes. RRSP contributions reduce both your federal and ${provinceInfo.name} provincial taxable income dollar-for-dollar. The 2026 RRSP limit is 18% of your 2025 earned income, up to $32,490.`,
                },
                {
                  q: `What is the effective tax rate on an $80,000 salary in ${provinceInfo.name}?`,
                  a: `On an $80,000 annual salary in ${provinceInfo.name} with no additional deductions, the combined effective rate (federal + provincial + CPP + EI) typically falls between 25% and 35%. Use the calculator for the exact figure.`,
                },
                {
                  q: `How do I calculate my biweekly take-home pay in ${provinceInfo.name}?`,
                  a: `Divide your annual salary by 26 to get your gross biweekly pay, then subtract federal income tax, ${abbr === 'QC' ? 'QPP and QPIP' : 'CPP'}, EI, and ${provinceInfo.name} provincial income tax. The calculator above does all of this automatically.`,
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="font-semibold text-sm" style={{ color: '#1C1917' }}>{q}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: '#44403C' }}>{a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Nearby province links */}
      {nearbyLinks.length > 0 && (
        <section className="mt-10">
          <p className="phase-label text-muted mb-2">Compare</p>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Compare with other provinces</h2>
          <div className="flex flex-wrap gap-2">
            {nearbyLinks.map((p) => (
              <a
                key={p.abbreviation}
                href={`/canada/${p.slug}`}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
              >
                {p.name} Calculator
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

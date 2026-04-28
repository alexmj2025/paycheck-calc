import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import AffiliateCTA from '@/components/AffiliateCTA';
import EmailCapture from '@/components/EmailCapture';
import { STATES, getStateBySlug, STATE_MAP } from '@/lib/stateData';
import { STATE_TAX_CONFIGS, StateTaxConfig } from '@/lib/taxRates';

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

interface Props {
  params: { state: string };
}

function formatBracketTable(config: StateTaxConfig, stateName: string) {
  if (config.type === 'none') return null;
  if (config.type === 'flat' && config.flatRate) {
    return (
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
              <th className="px-4 py-3 text-left phase-label text-muted font-normal">Income Range</th>
              <th className="px-4 py-3 text-left phase-label text-muted font-normal">Tax Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3" style={{ color: '#44403C' }}>All taxable income</td>
              <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>
                {(config.flatRate * 100).toFixed(2)}%
              </td>
            </tr>
          </tbody>
        </table>
        <p className="px-4 pb-3 mt-1 text-xs" style={{ color: '#A8A29E' }}>
          {stateName} uses a flat income tax rate applied to all taxable income.
        </p>
      </div>
    );
  }
  if (config.type === 'brackets' && config.brackets) {
    const brackets = config.brackets.single;
    return (
      <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
              <th className="px-4 py-3 text-left phase-label text-muted font-normal">Income (Single)</th>
              <th className="px-4 py-3 text-left phase-label text-muted font-normal">Tax Rate</th>
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
                  {(b.rate * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {config.standardDeduction && (
          <p className="px-4 pb-3 mt-1 text-xs" style={{ color: '#A8A29E' }}>
            {stateName} standard deduction: ${config.standardDeduction.single.toLocaleString()} (single) ·
            ${config.standardDeduction.married.toLocaleString()} (married filing jointly)
          </p>
        )}
      </div>
    );
  }
  return null;
}

function getStateIntro(name: string, abbr: string, config: StateTaxConfig): string {
  if (config.type === 'none') {
    return `${name} is one of nine US states that levies no individual income tax on wages, making it one of the most tax-friendly states for workers. Residents pay only federal income tax and FICA taxes (Social Security and Medicare) on their paychecks — there is no ${name} state withholding. While ${name} has no income tax, the state may generate revenue through other means such as sales taxes or property taxes. For most workers, living in ${name} results in a meaningfully higher take-home pay compared to high-tax states like California or New York. Use the calculator above to see exactly how much you keep after federal taxes.`;
  }
  if (config.type === 'flat' && config.flatRate) {
    const rate = (config.flatRate * 100).toFixed(2);
    return `${name} uses a flat income tax rate of ${rate}%, meaning all taxable income is taxed at the same rate regardless of how much you earn. This simple structure makes it easy to estimate your ${name} state tax withholding — multiply your taxable income by ${rate}% to get your annual state tax. On top of state income tax, workers in ${name} also pay federal income tax at progressive rates and FICA taxes for Social Security and Medicare. Pre-tax deductions like 401(k) contributions and health insurance premiums can reduce your taxable income and lower both your federal and state tax bills. Use the calculator above to see a complete breakdown of your ${name} take-home pay.`;
  }
  const topBracket = config.brackets?.single[config.brackets.single.length - 1];
  const topRate = topBracket ? (topBracket.rate * 100).toFixed(1) : '';
  return `${name} uses a progressive income tax system with multiple brackets, reaching a top rate of ${topRate}% for high earners. Like the federal system, you only pay each rate on the income within that bracket — not on your entire income. ${name} also offers a standard deduction that reduces your taxable income before brackets are applied. In addition to state income tax, ${name} workers pay federal income tax at rates between 10% and 37%, plus 6.2% Social Security and 1.45% Medicare. Pre-tax deductions such as 401(k) contributions, health insurance, HSA, and FSA contributions reduce your taxable income and lower your overall tax burden. Enter your details above for a precise ${name} paycheck calculation.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stateInfo = getStateBySlug(params.state);
  if (!stateInfo) return {};
  const title = `${stateInfo.name} Paycheck Tax Calculator 2026 — Free Take-Home Pay Calculator`;
  const description = `Calculate your exact ${stateInfo.name} take-home pay after federal and state taxes. Free ${stateInfo.name} paycheck calculator with 2026 tax brackets and rates.`;
  return {
    title,
    description,
    alternates: { canonical: `https://paychecktaxcalc.com/${stateInfo.slug}` },
    openGraph: { title, description, url: `https://paychecktaxcalc.com/${stateInfo.slug}` },
  };
}

export default function StatePage({ params }: Props) {
  const stateInfo = getStateBySlug(params.state);
  if (!stateInfo) notFound();

  const config = STATE_TAX_CONFIGS[stateInfo.abbreviation] ?? { type: 'none' as const };
  const intro = getStateIntro(stateInfo.name, stateInfo.abbreviation, config);

  const nearbyStateLinks = stateInfo.nearbyStates
    .map((abbr) => STATE_MAP[abbr])
    .filter(Boolean)
    .slice(0, 5);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://paychecktaxcalc.com' },
      { '@type': 'ListItem', position: 2, name: `${stateInfo.name} Paycheck Tax Calculator`, item: `https://paychecktaxcalc.com/${stateInfo.slug}` },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does ${stateInfo.name} have state income tax?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: config.type === 'none'
            ? `No. ${stateInfo.name} does not levy a state income tax on wages.`
            : `Yes. ${stateInfo.name} has a state income tax${config.type === 'flat' ? ` at a flat rate of ${((config.flatRate ?? 0) * 100).toFixed(2)}%` : ' with progressive brackets'}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are ${stateInfo.name} payroll taxes?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${stateInfo.name} workers pay federal income tax, Social Security (6.2%), Medicare (1.45%)${config.type !== 'none' ? `, and ${stateInfo.name} state income tax` : ''}. Some states also have additional taxes like state disability insurance.`,
        },
      },
    ],
  };

  const exampleSalary = stateInfo.abbreviation === 'CA' ? 80000 : stateInfo.abbreviation === 'NY' ? 70000 : 60000;

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm" style={{ color: '#78716C' }}>
        <ol className="flex flex-wrap items-center gap-1 list-none">
          <li><a href="/" style={{ color: '#78716C' }} className="hover:underline">Home</a></li>
          <li aria-hidden="true">›</li>
          <li style={{ color: '#1C1917' }}>{stateInfo.name} Calculator</li>
        </ol>
      </nav>

      <div className="mb-8">
        <p className="phase-label text-muted mb-2">Tax Year 2026</p>
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl mb-3" style={{ color: '#1C1917' }}>
          {stateInfo.name} Paycheck Tax Calculator 2026
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: '#78716C' }}>{intro}</p>
      </div>

      <Calculator defaultState={stateInfo.abbreviation} />

      <AffiliateCTA />
      <EmailCapture />

      {/* Content section */}
      <section className="mt-12 overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label text-phase2">{stateInfo.name} Tax Details</span>
        </div>
        <div className="px-6 py-6 space-y-8" style={{ color: '#44403C' }}>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>
              How {stateInfo.name} paycheck taxes work
            </h2>
            <div className="space-y-3 text-sm leading-relaxed">
              {config.type === 'none' ? (
                <>
                  <p>
                    Workers in {stateInfo.name} are not subject to state income tax withholding. Your employer will
                    only withhold federal income tax and FICA taxes (Social Security and Medicare) from each paycheck.
                  </p>
                  <p>
                    Federal income tax is calculated using 2026 progressive brackets ranging from 10% to 37%. The
                    standard deduction ($16,100 for single filers, $32,200 for married filing jointly) is subtracted
                    from your gross income before brackets are applied.
                  </p>
                  <p>
                    Social Security tax is 6.2% of wages up to $184,500. Medicare is 1.45% on all wages, plus an
                    extra 0.9% on wages above $200,000 (single) or $250,000 (married).
                  </p>
                </>
              ) : (
                <>
                  <p>
                    In addition to federal taxes, {stateInfo.name} workers have state income tax withheld from each
                    paycheck.{' '}
                    {config.type === 'flat'
                      ? `${stateInfo.name} applies a flat ${((config.flatRate ?? 0) * 100).toFixed(2)}% rate to all taxable income.`
                      : `${stateInfo.name} uses progressive brackets — you pay a lower rate on your first dollars and a higher rate only on income above each threshold.`}
                  </p>
                  {config.standardDeduction && (
                    <p>
                      {stateInfo.name}&apos;s standard deduction is ${config.standardDeduction.single.toLocaleString()} for
                      single filers and ${config.standardDeduction.married.toLocaleString()} for married filing jointly.
                    </p>
                  )}
                  <p>
                    Federal income tax is also withheld, using 2026 brackets from 10% to 37%. The federal standard
                    deduction ($16,100 single, $32,200 MFJ) is separate from any {stateInfo.name} state deduction.
                  </p>
                </>
              )}
              {config.additionalTax && config.additionalTax.length > 0 && (
                <p>
                  {stateInfo.name} also withholds additional payroll taxes:{' '}
                  {config.additionalTax.map((t) => `${t.name} at ${(t.rate * 100).toFixed(2)}%${t.wageBase ? ` (on wages up to $${t.wageBase.toLocaleString()})` : ''}`).join(', ')}.
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>
              {stateInfo.name} income tax brackets 2026
            </h2>
            {config.type === 'none' ? (
              <p className="text-sm" style={{ color: '#44403C' }}>
                {stateInfo.name} has no state income tax. Workers pay only federal income tax and FICA on their wages.
              </p>
            ) : (
              formatBracketTable(config, stateInfo.name)
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: '#1C1917' }}>How to use this calculator</h2>
            <ol className="list-inside list-decimal space-y-2 text-sm leading-relaxed">
              <li>Enter your gross salary as an annual amount or per paycheck.</li>
              <li>Select your pay frequency (weekly, bi-weekly, semi-monthly, monthly, or annually).</li>
              <li>Choose your filing status and confirm {stateInfo.name} is selected.</li>
              <li>Add any pre-tax deductions (401k, health insurance, HSA, FSA) to lower your taxable income.</li>
              <li>View your take-home pay, effective tax rate, and full annual breakdown in the result panel.</li>
            </ol>
          </div>

          <div aria-label={`${stateInfo.name} paycheck tax FAQ`}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#1C1917' }}>
              {stateInfo.name} Paycheck Tax FAQ
            </h2>
            <div className="space-y-5">
              {[
                {
                  q: `How much tax is taken from a $${exampleSalary.toLocaleString()} paycheck in ${stateInfo.name}?`,
                  a: `On a $${exampleSalary.toLocaleString()} annual salary in ${stateInfo.name}, a single filer paying bi-weekly can expect federal income tax, Social Security, and Medicare to take roughly 20–25% of gross pay. ${config.type !== 'none' ? `${stateInfo.name} state income tax adds further withholding. ` : `Because ${stateInfo.name} has no state income tax, you keep more of each paycheck than in states like California. `}Use the calculator above to get an exact number based on your deductions and filing status.`,
                },
                {
                  q: `Does ${stateInfo.name} have state income tax?`,
                  a: config.type === 'none'
                    ? `No. ${stateInfo.name} is one of nine states that does not tax individual wage income. You will not see a ${stateInfo.name} state income tax line on your pay stub.`
                    : `Yes. ${stateInfo.name} has a state income tax. ${config.type === 'flat' ? `The rate is a flat ${((config.flatRate ?? 0) * 100).toFixed(2)}% on all taxable income.` : `Rates are progressive, rising with income.`} Use the calculator above to see your exact ${stateInfo.name} withholding.`,
                },
                {
                  q: `What is the ${stateInfo.name} standard deduction?`,
                  a: config.standardDeduction
                    ? `${stateInfo.name}'s standard deduction is $${config.standardDeduction.single.toLocaleString()} for single filers and $${config.standardDeduction.married.toLocaleString()} for married filing jointly (2026).`
                    : config.type === 'none'
                    ? `${stateInfo.name} does not have a state income tax, so there is no ${stateInfo.name} standard deduction. The federal standard deduction ($16,100 single, $32,200 MFJ for 2026) still applies to your federal tax calculation.`
                    : `${stateInfo.name} may offer a standard deduction or personal exemption that reduces your state taxable income. Check with the ${stateInfo.name} Department of Revenue for the current amount.`,
                },
                {
                  q: `How do I reduce my tax withholding in ${stateInfo.name}?`,
                  a: `To reduce withholding, submit a new W-4 form to your employer. Increase your pre-tax contributions to a 401(k), HSA, or FSA to lower your federal and state taxable income. ${config.type !== 'none' ? `${stateInfo.name} may also have its own withholding certificate. ` : ''}Contributing to tax-advantaged accounts is the most direct way to legally reduce the taxes withheld from each paycheck.`,
                },
                {
                  q: `What are ${stateInfo.name} payroll taxes?`,
                  a: `Every ${stateInfo.name} worker pays federal payroll taxes: Social Security (6.2% on wages up to $184,500) and Medicare (1.45% on all wages). ${config.type !== 'none' ? `In addition, ${stateInfo.name} state income tax is withheld from each paycheck. ` : `${stateInfo.name} does not withhold additional state income tax. `}${config.additionalTax && config.additionalTax.length > 0 ? `${stateInfo.name} also collects ${config.additionalTax.map((t) => t.name).join(' and ')}.` : ''}`,
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

      {/* Nearby state links */}
      {nearbyStateLinks.length > 0 && (
        <section className="mt-10">
          <p className="phase-label text-muted mb-2">Compare</p>
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1C1917' }}>Compare with nearby states</h2>
          <div className="flex flex-wrap gap-2">
            {nearbyStateLinks.map((s) => (
              <a
                key={s.abbreviation}
                href={`/${s.slug}`}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#44403C' }}
              >
                {s.name} Calculator
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

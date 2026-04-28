import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Our Paycheck Tax Calculator Works — Methodology & Sources',
  description:
    'Full transparency on how PaycheckTaxCalc computes federal income tax, FICA, and state income tax. All 2026 tax rates and sources listed.',
};

const NO_TAX_STATES = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'];
const FLAT_RATE_STATES = ['CO', 'IL', 'IN', 'KY', 'MA', 'MI', 'NC', 'PA', 'UT'];

function PhaseCard({
  phase, label, color, children,
}: {
  phase: string; label: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="relative mt-14">
      <div className="absolute left-0 z-10" style={{ top: '-1px', transform: 'translateY(-100%)' }}>
        <span
          className="inline-block rounded-t-lg px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
          style={{ backgroundColor: color }}
        >
          {phase} · {label}
        </span>
      </div>
      <div className="overflow-hidden rounded-b-2xl rounded-tr-2xl bg-white" style={{ border: '1px solid #E2DDD6', borderTop: `3px solid ${color}` }}>
        {children}
      </div>
    </div>
  );
}

function StepCell({
  num, title, phaseColor, children,
}: {
  num: string; title: string; phaseColor: string; children: React.ReactNode;
}) {
  return (
    <div className="p-7 flex flex-col gap-4" style={{ borderRight: '1px solid #F0EDE7', borderBottom: '1px solid #F0EDE7' }}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-bold" style={{ color: '#1C1917' }}>{title}</h3>
        <span className="text-5xl font-bold leading-none shrink-0" style={{ color: phaseColor, opacity: 0.25 }}>{num}</span>
      </div>
      <div className="text-sm leading-relaxed" style={{ color: '#44403C' }}>
        {children}
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="phase-label text-muted mb-3">Methodology · Updated April 2026</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl mb-4" style={{ color: '#1C1917' }}>
          Untangling the math<br />behind your paycheck.
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed" style={{ color: '#78716C' }}>
          We transform messy tax code into a predictable, transparent formula. Below is the exact
          eight-step methodology PaycheckTaxCalc uses to calculate your true take-home pay —
          entirely in your browser, with no data sent to a server.
        </p>
      </div>

      {/* ── PHASE 1: THE BASELINE ── */}
      <PhaseCard phase="Phase 1" label="The Baseline" color="#C17F3E">
        <div className="grid sm:grid-cols-2">
          <StepCell num="01" title="Annualize gross pay" phaseColor="#C17F3E">
            <p>
              We convert your entry to an annual figure. Per-paycheck amounts are multiplied by the
              pay-period count: weekly × 52, bi-weekly × 26, semi-monthly × 24, monthly × 12, annually × 1.
            </p>
            <div className="mt-4 flex items-center gap-2 flex-wrap text-sm">
              <span className="rounded-lg px-3 py-1.5 font-medium" style={{ border: '1px solid #E2DDD6', color: '#44403C' }}>$3,250</span>
              <span style={{ color: '#A8A29E' }}>×</span>
              <span className="rounded-lg px-3 py-1.5 font-medium" style={{ border: '1px solid #E2DDD6', color: '#44403C' }}>Bi-weekly · 26</span>
              <span style={{ color: '#A8A29E' }}>=</span>
              <span className="rounded-lg px-3 py-1.5 font-semibold" style={{ border: '1px solid #E8D9C4', backgroundColor: '#FBF6EE', color: '#C17F3E' }}>$84,500</span>
            </div>
          </StepCell>
          <StepCell num="02" title="Pre-tax deductions" phaseColor="#C17F3E">
            <p>
              Traditional 401(k), health insurance, HSA, FSA, and other pre-tax items are subtracted from
              annual gross pay to arrive at <strong>federal taxable wages</strong>.
            </p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: '#78716C' }}>
              Note: FICA is typically calculated on gross wages before pre-tax deductions, with exceptions
              for Section 125 plans. For simplicity, we apply FICA to full gross wages — the error is
              negligible for most users.
            </p>
          </StepCell>
        </div>
      </PhaseCard>

      {/* ── PHASE 2: THE ASSESSMENT ── */}
      <PhaseCard phase="Phase 2" label="The Assessment" color="#B5533C">

        {/* Step 03 — full width */}
        <div className="p-7" style={{ borderBottom: '1px solid #F0EDE7' }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold" style={{ color: '#1C1917' }}>Federal income tax · 2026 brackets</h3>
            <span className="text-5xl font-bold leading-none shrink-0" style={{ color: '#B5533C', opacity: 0.25 }}>03</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#44403C' }}>
            We subtract the 2026 standard deduction from federal taxable wages to get{' '}
            <strong>federal taxable income</strong>, then apply the IRS progressive brackets.
            Income fills sequential tiers — each taxed at its own rate.
          </p>
          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid #E2DDD6' }}>
            <table className="min-w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid #E2DDD6' }}>
                  {['Rate', 'Single', 'Married · Joint', 'Head of Household'].map(h => (
                    <th key={h} className="px-4 py-3 text-left phase-label text-muted font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['10%', '$0–$12,400', '$0–$24,800', '$0–$18,600'],
                  ['12%', '$12,401–$50,400', '$24,801–$100,800', '$18,601–$75,600'],
                  ['22%', '$50,401–$105,700', '$100,801–$211,400', '$75,601–$158,550'],
                  ['24%', '$105,701–$201,775', '$211,401–$403,550', '$158,551–$302,650'],
                  ['32%', '$201,776–$256,225', '$403,551–$512,450', '$302,651–$384,325'],
                  ['35%', '$256,226–$640,600', '$512,451–$768,700', '$384,326–$704,650'],
                  ['37%', '$640,601+', '$768,701+', '$704,651+'],
                ].map(([rate, s, m, h]) => (
                  <tr key={rate} style={{ borderBottom: '1px solid #F0EDE7' }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#B5533C' }}>{rate}</td>
                    <td className="px-4 py-3" style={{ color: '#44403C' }}>{s}</td>
                    <td className="px-4 py-3" style={{ color: '#44403C' }}>{m}</td>
                    <td className="px-4 py-3" style={{ color: '#44403C' }}>{h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs" style={{ color: '#A8A29E' }}>
            Standard deductions: Single $16,100 · Married $32,200 · Head of household $24,150.
            Source: IRS Rev. Proc. 2025-32.
          </p>
        </div>

        {/* Steps 04 + 05 side by side */}
        <div className="grid sm:grid-cols-2">
          <StepCell num="04" title="FICA taxes" phaseColor="#B5533C">
            <div className="space-y-3">
              {[
                { rate: '6.2%', desc: 'Social Security on wages up to $184,500 (2026 wage base).' },
                { rate: '1.45%', desc: 'Medicare on all wages.' },
                { rate: '0.9%', desc: 'Additional Medicare on wages above $200K (single) or $250K (MFJ).' },
              ].map(({ rate, desc }) => (
                <div key={rate} className="flex gap-3">
                  <span className="font-semibold shrink-0 w-12" style={{ color: '#B5533C' }}>{rate}</span>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </StepCell>
          <StepCell num="05" title="State income tax" phaseColor="#B5533C">
            <p>
              State taxable income equals federal taxable wages minus the state&apos;s own standard deduction.
              We then apply 2026 brackets or flat rates.
            </p>
            <div className="mt-3 space-y-2">
              <div>
                <span className="text-xs" style={{ color: '#78716C' }}>No income tax:&nbsp;</span>
                <span className="inline-flex flex-wrap gap-1 mt-1">
                  {NO_TAX_STATES.map(s => (
                    <span key={s} className="rounded px-2 py-0.5 text-xs font-medium" style={{ border: '1px solid #E2DDD6', color: '#44403C' }}>{s}</span>
                  ))}
                </span>
              </div>
              <div>
                <span className="text-xs" style={{ color: '#78716C' }}>Flat rate:&nbsp;</span>
                <span className="inline-flex flex-wrap gap-1 mt-1">
                  {FLAT_RATE_STATES.map(s => (
                    <span key={s} className="rounded px-2 py-0.5 text-xs font-medium" style={{ border: '1px solid #E2DDD6', color: '#44403C' }}>{s}</span>
                  ))}
                </span>
              </div>
            </div>
          </StepCell>
        </div>

        {/* Step 06 — full width */}
        <div className="p-7" style={{ borderTop: '1px solid #F0EDE7' }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold" style={{ color: '#1C1917' }}>State-specific payroll taxes</h3>
            <span className="text-5xl font-bold leading-none shrink-0" style={{ color: '#B5533C', opacity: 0.25 }}>06</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#44403C' }}>
            Some states levy additional employee payroll taxes layered on top of state income tax.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { name: 'California SDI', desc: '0.9% on all wages (State Disability Insurance). Source: CA EDD.' },
              { name: 'New Jersey SDI/TDI & FLI', desc: '0.09% each, on wages up to $161,400. Source: NJ DOL.' },
            ].map(({ name, desc }) => (
              <div key={name} className="rounded-xl p-4 text-sm" style={{ border: '1px solid #E2DDD6' }}>
                <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>{name}</p>
                <p style={{ color: '#78716C' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </PhaseCard>

      {/* ── PHASE 3: THE RESULT ── */}
      <PhaseCard phase="Phase 3" label="The Result" color="#4A5F6E">
        <div className="grid sm:grid-cols-2">
          <StepCell num="07" title="Per-period apportionment" phaseColor="#4A5F6E">
            <p>
              All annual figures are divided by your number of pay periods — weekly 52, bi-weekly 26,
              semi-monthly 24, monthly 12, annually 1.
            </p>
          </StepCell>
          <StepCell num="08" title="Net pay formula" phaseColor="#4A5F6E">
            <div className="rounded-xl overflow-hidden text-sm" style={{ border: '1px solid #E2DDD6' }}>
              {[
                { label: 'Gross pay', sign: '+', bold: false },
                { label: 'Federal income tax', sign: '−', bold: false },
                { label: 'Social Security & Medicare', sign: '−', bold: false },
                { label: 'State income tax', sign: '−', bold: false },
                { label: 'Pre/post-tax deductions', sign: '−', bold: false },
              ].map(({ label, sign }) => (
                <div key={label} className="flex justify-between items-center px-4 py-2.5" style={{ borderBottom: '1px solid #F0EDE7', color: '#44403C' }}>
                  <span>{label}</span>
                  <span className="font-medium" style={{ color: '#78716C' }}>{sign}</span>
                </div>
              ))}
              <div className="flex justify-between items-center px-4 py-3 font-semibold" style={{ color: '#4A5F6E' }}>
                <span>Net take-home pay</span>
                <span>=</span>
              </div>
            </div>
          </StepCell>
        </div>
      </PhaseCard>

      {/* ── Limitations + Sources ── */}
      <div className="mt-14 grid sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: '#1C1917' }}>Limitations</h2>
          <ul className="space-y-2 text-sm" style={{ color: '#78716C' }}>
            {[
              'Does not calculate tax credits (CTC, EITC, etc.).',
              'Does not account for Alternative Minimum Tax (AMT).',
              'Does not handle itemized deductions above the standard deduction.',
              'Does not account for local/city income taxes (NYC, Philadelphia).',
              'Self-employment income is not covered.',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span style={{ color: '#C17F3E' }}>·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold mb-3" style={{ color: '#1C1917' }}>Data sources</h2>
          <ul className="space-y-2 text-sm" style={{ color: '#78716C' }}>
            {[
              'Federal brackets — IRS Rev. Proc. 2025-32 (2026)',
              'Social Security wage base — SSA.gov',
              'State rates — individual state revenue depts.',
              'California SDI — CA EDD',
              'New Jersey TDI/FLI — NJ Dept. of Labor',
            ].map(item => (
              <li key={item} className="flex gap-2">
                <span style={{ color: '#C17F3E' }}>·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-xs text-center" style={{ color: '#A8A29E' }}>
        Always verify with a qualified tax professional for your specific situation. Tax laws change;
        rates above reflect the 2026 tax year. PaycheckTaxCalc makes no warranty of accuracy.
      </p>

    </div>
  );
}

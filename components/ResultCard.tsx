'use client';
import { TaxResult, formatCurrency, formatPercent, PAY_FREQUENCY_LABELS, PayFrequency } from '@/lib/calculateTax';

interface Props {
  result: TaxResult;
  payFrequency: PayFrequency;
  locationLabel: string;
}

export default function ResultCard({ result, payFrequency, locationLabel }: Props) {
  const cur = result.currency;
  const freqLabel = payFrequency === 'annually' ? 'Annual' : PAY_FREQUENCY_LABELS[payFrequency];

  function handleShare() {
    const text = `My take-home pay in ${locationLabel} is ${formatCurrency(result.netPay.perPaycheck, cur)}/paycheck after taxes. Calculate yours free at paychecktaxcalc.com`;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  const rows: { label: string; value: number; negative?: boolean }[] = [
    { label: 'Gross pay', value: result.grossPerPaycheck },
    { label: result.federalIncomeTax.label, value: result.federalIncomeTax.perPaycheck, negative: true },
    { label: result.socialSecurity.label, value: result.socialSecurity.perPaycheck, negative: true },
    { label: result.medicare.label, value: result.medicare.perPaycheck, negative: true },
  ];
  if (result.additionalMedicare.annual > 0) rows.push({ label: result.additionalMedicare.label, value: result.additionalMedicare.perPaycheck, negative: true });
  if (result.stateIncomeTax.annual > 0) rows.push({ label: result.stateIncomeTax.label, value: result.stateIncomeTax.perPaycheck, negative: true });
  for (const ot of result.stateOtherTaxes) rows.push({ label: ot.label, value: ot.perPaycheck, negative: true });
  if (result.preTaxDeductionsTotal.annual > 0) rows.push({ label: result.preTaxDeductionsTotal.label, value: result.preTaxDeductionsTotal.perPaycheck, negative: true });
  if (result.postTaxDeductionsTotal.annual > 0) rows.push({ label: result.postTaxDeductionsTotal.label, value: result.postTaxDeductionsTotal.perPaycheck, negative: true });
  if (result.additionalFederalWithholding.annual > 0) rows.push({ label: result.additionalFederalWithholding.label, value: result.additionalFederalWithholding.perPaycheck, negative: true });
  if (result.additionalStateWithholding.annual > 0) rows.push({ label: result.additionalStateWithholding.label, value: result.additionalStateWithholding.perPaycheck, negative: true });

  return (
    <div aria-live="polite" aria-atomic="true" aria-label="Tax calculation results">
      {/* Big number */}
      <div className="mb-6">
        <p className="phase-label text-muted mb-1">Per Paycheck · {freqLabel}</p>
        <p className="text-5xl font-bold tracking-tight" style={{ color: '#1C1917' }}>
          {formatCurrency(result.netPay.perPaycheck, cur)}
        </p>
        <p className="mt-1 text-sm" style={{ color: '#78716C' }}>
          Annual net: {formatCurrency(result.netPay.annual, cur)}
        </p>
        {cur === 'CAD' && <p className="mt-0.5 text-xs" style={{ color: '#A8A29E' }}>All amounts in CAD</p>}
      </div>

      {/* Breakdown rows */}
      <div className="space-y-0 mb-6" style={{ borderTop: '1px solid #E2DDD6' }}>
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F0EDE7' }}>
            <span className="text-sm" style={{ color: '#78716C' }}>{row.label}</span>
            <span className="text-sm font-medium tabular-nums" style={{ color: row.negative ? '#DC2626' : '#1C1917' }}>
              {row.negative ? '−' : '+'}{formatCurrency(row.value, cur)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between py-3">
          <span className="text-sm font-semibold" style={{ color: '#1C1917' }}>Net Take-Home Pay</span>
          <span className="text-base font-bold tabular-nums" style={{ color: '#16A34A' }}>
            {formatCurrency(result.netPay.perPaycheck, cur)}
          </span>
        </div>
      </div>

      {/* Effective rates */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { label: 'Effective Federal Rate', value: result.effectiveFederalRate },
          { label: 'Effective Total Rate', value: result.effectiveTotalRate },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ backgroundColor: '#F5F2ED' }}>
            <p className="phase-label text-muted mb-1">{label}</p>
            <p className="text-xl font-semibold" style={{ color: '#1C1917' }}>{formatPercent(value)}</p>
          </div>
        ))}
      </div>

      {/* AdSense */}
      <div className="mb-4">
        <ins className="adsbygoogle" style={{ display: 'block' }}
          data-ad-client="ca-pub-8870870806520160" data-ad-slot="below-result"
          data-ad-format="auto" data-full-width-responsive="true" />
      </div>

      {/* Share */}
      <button
        onClick={handleShare}
        className="w-full rounded-xl py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2"
        style={{ backgroundColor: '#1C1917', color: '#FFFFFF' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2D2926')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C1917')}
      >
        Copy &amp; share result
      </button>
    </div>
  );
}

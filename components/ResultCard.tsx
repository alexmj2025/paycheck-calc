'use client';
import { TaxResult, formatCurrency, formatPercent, PAY_FREQUENCY_LABELS, PayFrequency } from '@/lib/calculateTax';

interface Props {
  result: TaxResult;
  payFrequency: PayFrequency;
  locationLabel: string; // state name or province name
}

export default function ResultCard({ result, payFrequency, locationLabel }: Props) {
  const cur = result.currency;
  const label = payFrequency === 'annually' ? 'Annual' : `Per Paycheck (${PAY_FREQUENCY_LABELS[payFrequency]})`;

  function handleShare() {
    const text = `My take-home pay in ${locationLabel} is ${formatCurrency(result.netPay.perPaycheck, cur)}/paycheck after taxes. Calculate yours free at paychecktaxcalc.com`;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  const rows: { label: string; value: number; negative?: boolean }[] = [
    { label: 'Gross Pay', value: result.grossPerPaycheck },
    { label: result.federalIncomeTax.label, value: result.federalIncomeTax.perPaycheck, negative: true },
    { label: result.socialSecurity.label, value: result.socialSecurity.perPaycheck, negative: true },
    { label: result.medicare.label, value: result.medicare.perPaycheck, negative: true },
  ];

  if (result.additionalMedicare.annual > 0) {
    rows.push({ label: result.additionalMedicare.label, value: result.additionalMedicare.perPaycheck, negative: true });
  }
  if (result.stateIncomeTax.annual > 0) {
    rows.push({ label: result.stateIncomeTax.label, value: result.stateIncomeTax.perPaycheck, negative: true });
  }
  for (const ot of result.stateOtherTaxes) {
    rows.push({ label: ot.label, value: ot.perPaycheck, negative: true });
  }
  if (result.preTaxDeductionsTotal.annual > 0) {
    rows.push({ label: result.preTaxDeductionsTotal.label, value: result.preTaxDeductionsTotal.perPaycheck, negative: true });
  }
  if (result.postTaxDeductionsTotal.annual > 0) {
    rows.push({ label: result.postTaxDeductionsTotal.label, value: result.postTaxDeductionsTotal.perPaycheck, negative: true });
  }
  if (result.additionalFederalWithholding.annual > 0) {
    rows.push({ label: result.additionalFederalWithholding.label, value: result.additionalFederalWithholding.perPaycheck, negative: true });
  }
  if (result.additionalStateWithholding.annual > 0) {
    rows.push({ label: result.additionalStateWithholding.label, value: result.additionalStateWithholding.perPaycheck, negative: true });
  }

  return (
    <div
      className="rounded-xl border border-gray-200 bg-white shadow-md"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Tax calculation results"
    >
      <div className="rounded-t-xl bg-blue-600 px-6 py-6 text-center text-white">
        <p className="text-sm font-medium uppercase tracking-wide opacity-80">{label} Take-Home Pay</p>
        <p className="mt-1 text-5xl font-bold tabular-nums">{formatCurrency(result.netPay.perPaycheck, cur)}</p>
        <p className="mt-2 text-sm opacity-75">Annual: {formatCurrency(result.netPay.annual, cur)}</p>
        {cur === 'CAD' && <p className="mt-1 text-xs opacity-60">All amounts in Canadian dollars (CAD)</p>}
      </div>

      <div className="divide-y divide-gray-100 px-6 py-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">{row.label}</span>
            <span className={`text-sm font-medium tabular-nums ${row.negative ? 'text-red-600' : 'text-gray-900'}`}>
              {row.negative ? '−' : ''}{formatCurrency(row.value, cur)}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between py-3">
          <span className="text-base font-semibold text-gray-900">Net Take-Home Pay</span>
          <span className="text-base font-bold text-green-600 tabular-nums">
            {formatCurrency(result.netPay.perPaycheck, cur)}
          </span>
        </div>
      </div>

      <div className="rounded-b-xl bg-gray-50 px-6 py-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Effective Federal Rate</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{formatPercent(result.effectiveFederalRate)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Effective Total Rate</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{formatPercent(result.effectiveTotalRate)}</p>
          </div>
        </div>

        <div
          data-ad-slot="below-result"
          data-ad-format="horizontal"
          className="mt-4 min-h-[90px] w-full rounded bg-gray-100"
          aria-hidden="true"
        />

        <button
          onClick={handleShare}
          className="mt-4 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Share your result
        </button>
      </div>
    </div>
  );
}

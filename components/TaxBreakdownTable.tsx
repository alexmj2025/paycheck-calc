'use client';
import { TaxResult, formatCurrency, formatPercent } from '@/lib/calculateTax';

interface Props {
  result: TaxResult;
}

export default function TaxBreakdownTable({ result }: Props) {
  const cur = result.currency;
  const isCA = cur === 'CAD';
  const employerSS = result.annualGross * (isCA ? 0.0595 : 0.062);
  const employerMedicare = result.annualGross * (isCA ? 0.0145 : 0.0145);

  const rows = [
    { label: 'Gross Pay', annual: result.annualGross, perPaycheck: result.grossPerPaycheck, type: 'income' as const },
    { label: result.federalIncomeTax.label, annual: result.federalIncomeTax.annual, perPaycheck: result.federalIncomeTax.perPaycheck, type: 'tax' as const },
    { label: result.socialSecurity.label, annual: result.socialSecurity.annual, perPaycheck: result.socialSecurity.perPaycheck, type: 'tax' as const },
    { label: result.medicare.label, annual: result.medicare.annual, perPaycheck: result.medicare.perPaycheck, type: 'tax' as const },
    ...(result.additionalMedicare.annual > 0 ? [{ label: result.additionalMedicare.label, annual: result.additionalMedicare.annual, perPaycheck: result.additionalMedicare.perPaycheck, type: 'tax' as const }] : []),
    ...(result.stateIncomeTax.annual > 0 ? [{ label: result.stateIncomeTax.label, annual: result.stateIncomeTax.annual, perPaycheck: result.stateIncomeTax.perPaycheck, type: 'tax' as const }] : []),
    ...result.stateOtherTaxes.map((t) => ({ label: t.label, annual: t.annual, perPaycheck: t.perPaycheck, type: 'tax' as const })),
    ...(result.preTaxDeductionsTotal.annual > 0 ? [{ label: result.preTaxDeductionsTotal.label, annual: result.preTaxDeductionsTotal.annual, perPaycheck: result.preTaxDeductionsTotal.perPaycheck, type: 'deduction' as const }] : []),
    ...(result.postTaxDeductionsTotal.annual > 0 ? [{ label: result.postTaxDeductionsTotal.label, annual: result.postTaxDeductionsTotal.annual, perPaycheck: result.postTaxDeductionsTotal.perPaycheck, type: 'deduction' as const }] : []),
    ...(result.additionalFederalWithholding.annual > 0 ? [{ label: result.additionalFederalWithholding.label, annual: result.additionalFederalWithholding.annual, perPaycheck: result.additionalFederalWithholding.perPaycheck, type: 'tax' as const }] : []),
    ...(result.additionalStateWithholding.annual > 0 ? [{ label: result.additionalStateWithholding.label, annual: result.additionalStateWithholding.annual, perPaycheck: result.additionalStateWithholding.perPaycheck, type: 'tax' as const }] : []),
    { label: 'Net Take-Home Pay', annual: result.netPay.annual, perPaycheck: result.netPay.perPaycheck, type: 'net' as const },
  ];

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <caption className="px-4 py-2 text-left text-xs text-gray-500">
          Full-year breakdown × {result.payPeriodsPerYear} pay periods
        </caption>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">Line Item</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">Per Paycheck</th>
            <th scope="col" className="px-4 py-3 text-right font-semibold text-gray-700">Annual</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr
              key={row.label}
              className={
                row.type === 'net'
                  ? 'bg-green-50 font-semibold'
                  : row.type === 'income'
                  ? 'bg-blue-50'
                  : ''
              }
            >
              <td className="px-4 py-2 text-gray-800">{row.label}</td>
              <td className={`px-4 py-2 text-right tabular-nums ${row.type === 'tax' || row.type === 'deduction' ? 'text-red-600' : row.type === 'net' ? 'text-green-700' : 'text-gray-900'}`}>
                {row.type === 'tax' || row.type === 'deduction' ? '−' : ''}{formatCurrency(row.perPaycheck, cur)}
              </td>
              <td className={`px-4 py-2 text-right tabular-nums ${row.type === 'tax' || row.type === 'deduction' ? 'text-red-600' : row.type === 'net' ? 'text-green-700' : 'text-gray-900'}`}>
                {row.type === 'tax' || row.type === 'deduction' ? '−' : ''}{formatCurrency(row.annual, cur)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-50">
            <td colSpan={3} className="px-4 py-3 text-xs text-gray-500">
              {isCA
                ? `Employer's share (informational): CPP match ${formatCurrency(employerSS, cur)}/yr · EI match (1.4×) ${formatCurrency(result.medicare.annual * 1.4, cur)}/yr`
                : `Employer's share (informational): Social Security ${formatCurrency(employerSS, cur)}/yr · Medicare ${formatCurrency(employerMedicare, cur)}/yr`}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Effective rates */}
      <div className="flex flex-wrap gap-6 px-4 py-4">
        <div>
          <span className="text-xs text-gray-500">Effective Federal Rate: </span>
          <span className="font-medium text-gray-900">{formatPercent(result.effectiveFederalRate)}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500">Effective Total Rate: </span>
          <span className="font-medium text-gray-900">{formatPercent(result.effectiveTotalRate)}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500">Federal Taxable Income: </span>
          <span className="font-medium text-gray-900">{formatCurrency(result.federalTaxableIncome, cur)}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500">{isCA ? 'Provincial' : 'State'} Taxable Income: </span>
          <span className="font-medium text-gray-900">{formatCurrency(result.stateTaxableIncome, cur)}</span>
        </div>
      </div>
    </div>
  );
}

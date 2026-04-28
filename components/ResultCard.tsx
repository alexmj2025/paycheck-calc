'use client';
import { useState } from 'react';
import { TaxResult, formatCurrency, formatPercent, PAY_FREQUENCY_LABELS, PayFrequency } from '@/lib/calculateTax';

interface Props {
  result: TaxResult;
  payFrequency: PayFrequency;
  locationLabel: string;
}

export default function ResultCard({ result, payFrequency, locationLabel }: Props) {
  const cur = result.currency;
  const freqLabel = payFrequency === 'annually' ? 'Annual' : PAY_FREQUENCY_LABELS[payFrequency];
  const [showMenu, setShowMenu] = useState(false);

  function buildRows() {
    const r: { label: string; value: number; negative: boolean }[] = [
      { label: 'Gross pay', value: result.grossPerPaycheck, negative: false },
      { label: result.federalIncomeTax.label, value: result.federalIncomeTax.perPaycheck, negative: true },
      { label: result.socialSecurity.label, value: result.socialSecurity.perPaycheck, negative: true },
      { label: result.medicare.label, value: result.medicare.perPaycheck, negative: true },
    ];
    if (result.additionalMedicare.annual > 0) r.push({ label: result.additionalMedicare.label, value: result.additionalMedicare.perPaycheck, negative: true });
    if (result.stateIncomeTax.annual > 0) r.push({ label: result.stateIncomeTax.label, value: result.stateIncomeTax.perPaycheck, negative: true });
    for (const ot of result.stateOtherTaxes) r.push({ label: ot.label, value: ot.perPaycheck, negative: true });
    if (result.preTaxDeductionsTotal.annual > 0) r.push({ label: result.preTaxDeductionsTotal.label, value: result.preTaxDeductionsTotal.perPaycheck, negative: true });
    if (result.postTaxDeductionsTotal.annual > 0) r.push({ label: result.postTaxDeductionsTotal.label, value: result.postTaxDeductionsTotal.perPaycheck, negative: true });
    if (result.additionalFederalWithholding.annual > 0) r.push({ label: result.additionalFederalWithholding.label, value: result.additionalFederalWithholding.perPaycheck, negative: true });
    if (result.additionalStateWithholding.annual > 0) r.push({ label: result.additionalStateWithholding.label, value: result.additionalStateWithholding.perPaycheck, negative: true });
    return r;
  }

  function downloadCSV() {
    const rows = buildRows();
    const periods = result.payPeriodsPerYear;
    const lines = [
      ['PaycheckTaxCalc — Tax Breakdown', '', ''],
      [`Location: ${locationLabel}`, `Pay frequency: ${freqLabel}`, ''],
      ['', '', ''],
      ['Line Item', 'Per Paycheck', 'Annual'],
      ...rows.map(r => [r.label, (r.negative ? '-' : '') + r.value.toFixed(2), (r.negative ? '-' : '') + (r.value * periods).toFixed(2)]),
      ['Net Take-Home Pay', result.netPay.perPaycheck.toFixed(2), result.netPay.annual.toFixed(2)],
      ['', '', ''],
      ['Effective Federal Rate', formatPercent(result.effectiveFederalRate), ''],
      ['Effective Total Rate', formatPercent(result.effectiveTotalRate), ''],
    ];
    const csv = lines.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paycheck-breakdown-${locationLabel.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  }

  function downloadPDF() {
    const rows = buildRows();
    const periods = result.payPeriodsPerYear;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Paycheck Breakdown — ${locationLabel}</title>
<style>
  body{font-family:system-ui,sans-serif;padding:32px;color:#1C1917;max-width:600px;margin:0 auto}
  h1{font-size:20px;margin:0 0 4px}
  .sub{color:#78716C;font-size:13px;margin:0 0 24px}
  .big{font-size:42px;font-weight:700;margin:0 0 4px}
  .ann{color:#78716C;font-size:14px;margin:0 0 20px}
  table{width:100%;border-collapse:collapse;font-size:14px}
  td{padding:9px 0;border-bottom:1px solid #F0EDE7}
  td:last-child{text-align:right;font-weight:500}
  .neg{color:#DC2626}.pos{color:#1C1917}.net td{font-weight:700}.net td:last-child{color:#16A34A}
  .rates{display:flex;gap:12px;margin-top:20px}
  .rate-box{flex:1;background:#F5F2ED;border-radius:10px;padding:12px;text-align:center}
  .rate-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#78716C}
  .rate-val{font-size:20px;font-weight:600;margin-top:4px}
  .footer{margin-top:28px;font-size:11px;color:#A8A29E}
  @media print{body{padding:16px}}
</style></head><body>
<h1>Paycheck Tax Breakdown</h1>
<p class="sub">${locationLabel} · ${freqLabel} · Tax Year 2026</p>
<p class="big">${formatCurrency(result.netPay.perPaycheck, cur)}</p>
<p class="ann">Annual net: ${formatCurrency(result.netPay.annual, cur)}</p>
<table>
${rows.map(r => `<tr><td>${r.label}</td><td class="${r.negative ? 'neg' : 'pos'}">${r.negative ? '−' : '+'}${formatCurrency(r.value, cur)}</td></tr>`).join('')}
<tr class="net"><td>Net Take-Home Pay</td><td>${formatCurrency(result.netPay.perPaycheck, cur)}</td></tr>
</table>
<div class="rates">
  <div class="rate-box"><div class="rate-label">Effective Federal Rate</div><div class="rate-val">${formatPercent(result.effectiveFederalRate)}</div></div>
  <div class="rate-box"><div class="rate-label">Effective Total Rate</div><div class="rate-val">${formatPercent(result.effectiveTotalRate)}</div></div>
</div>
<p class="footer">Generated by paychecktaxcalc.com · Tax Year 2026</p>
<script>window.onload=function(){window.print();}<\/script>
</body></html>`;
    const win = window.open('', '_blank');
    if (win) { win.document.write(html); win.document.close(); }
    setShowMenu(false);
  }

  const rows = buildRows();

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
          data-ad-client="ca-pub-8870870806520160" data-ad-slot="1337972327"
          data-ad-format="auto" data-full-width-responsive="true" />
      </div>

      {/* Download */}
      <div className="relative">
        <button
          onClick={() => setShowMenu(v => !v)}
          className="w-full rounded-xl py-3 text-sm font-semibold transition-colors focus:outline-none flex items-center justify-center gap-2"
          style={{ backgroundColor: '#1C1917', color: '#FFFFFF' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2D2926')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1C1917')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <path d="M8 1v9M5 7l3 3 3-3M2 12v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download result
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 ml-1">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {showMenu && (
          <div className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-lg" style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF' }}>
            <button
              onClick={downloadCSV}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-[#F5F2ED]"
              style={{ color: '#1C1917', borderBottom: '1px solid #F0EDE7' }}
            >
              <span className="text-base">📊</span>
              <div>
                <div className="font-medium">Excel / CSV</div>
                <div className="text-xs" style={{ color: '#78716C' }}>Full breakdown, opens in Excel or Google Sheets</div>
              </div>
            </button>
            <button
              onClick={downloadPDF}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-[#F5F2ED]"
              style={{ color: '#1C1917' }}
            >
              <span className="text-base">📄</span>
              <div>
                <div className="font-medium">PDF</div>
                <div className="text-xs" style={{ color: '#78716C' }}>Print or save as PDF via browser dialog</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

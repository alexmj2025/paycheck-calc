'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FilingStatus, TaxYear } from '@/lib/taxRates';
import { PayFrequency, TaxInput, TaxResult, calculateTax } from '@/lib/calculateTax';
import { Province } from '@/lib/canadaTaxRates';
import { CATaxInput, calculateTaxCA } from '@/lib/calculateTaxCA';
import StateSelector from './StateSelector';
import PayPeriodSelector from './PayPeriodSelector';
import FilingStatusSelector from './FilingStatusSelector';
import ProvinceSelector from './ProvinceSelector';
import ResultCard from './ResultCard';
import TaxBreakdownTable from './TaxBreakdownTable';

interface Props {
  defaultState?: string;
  defaultProvince?: Province;
  defaultCountry?: 'US' | 'CA';
}

const DEFAULT_US: TaxInput = {
  grossPay: 75000,
  grossPayType: 'annual',
  payFrequency: 'biweekly',
  filingStatus: 'single',
  state: 'TX',
  taxYear: 2026,
  preTaxDeductions: { traditional401k: 0, healthInsurance: 0, hsa: 0, fsa: 0, other: 0 },
  postTaxDeductions: { roth401k: 0, other: 0 },
  additionalFederalWithholding: 0,
  additionalStateWithholding: 0,
};

const DEFAULT_CA: CATaxInput = {
  grossPay: 80000,
  grossPayType: 'annual',
  payFrequency: 'biweekly',
  province: 'ON',
  taxYear: 2026,
  preTaxDeductions: { rrsp: 0, groupBenefits: 0, pensionContrib: 0, other: 0 },
  postTaxDeductions: { other: 0 },
  additionalFederalWithholding: 0,
  additionalProvincialWithholding: 0,
};

function NumberInput({
  id, label, value, onChange, min = 0, prefix, error,
}: {
  id: string; label: string; value: number; onChange: (v: number) => void;
  min?: number; prefix?: string; error?: string;
}) {
  const [raw, setRaw] = useState(value === 0 ? '' : String(value));
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const v = parseFloat(raw);
    if (!isNaN(v) && v !== value) setRaw(value === 0 ? '' : String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const str = e.target.value;
    setRaw(str);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const n = parseFloat(str);
      onChange(isNaN(n) || n < min ? 0 : n);
    }, 300);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative flex items-center">
        {prefix && <span className="pointer-events-none absolute left-3 text-gray-500 select-none">{prefix}</span>}
        <input
          id={id} type="number" inputMode="decimal" min={min} value={raw} onChange={handleChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={`w-full rounded-md border bg-white px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1
            ${prefix ? 'pl-7' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
        />
      </div>
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

function YearToggle({ year, onChange }: { year: TaxYear; onChange: (y: TaxYear) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1" role="group" aria-label="Tax year">
      {([2025, 2026] as TaxYear[]).map((yr) => (
        <button
          key={yr} type="button" onClick={() => onChange(yr)} aria-pressed={year === yr}
          className={`rounded-md px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            year === yr ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {yr}
        </button>
      ))}
    </div>
  );
}

export default function Calculator({ defaultState, defaultProvince, defaultCountry }: Props) {
  const [country, setCountry] = useState<'US' | 'CA'>(defaultCountry ?? 'US');
  const [usInput, setUsInput] = useState<TaxInput>({
    ...DEFAULT_US,
    state: defaultState ?? DEFAULT_US.state,
  });
  const [caInput, setCAInput] = useState<CATaxInput>({
    ...DEFAULT_CA,
    province: defaultProvince ?? DEFAULT_CA.province,
  });
  const [result, setResult] = useState<TaxResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (country === 'US') {
      if (usInput.grossPay <= 0) { setError('Enter a valid gross pay.'); setResult(null); return; }
      setError('');
      setResult(calculateTax(usInput));
    } else {
      if (caInput.grossPay <= 0) { setError('Enter a valid gross pay.'); setResult(null); return; }
      setError('');
      setResult(calculateTaxCA(caInput));
    }
  }, [country, usInput, caInput]);

  // US updaters
  const updateUS = useCallback(<K extends keyof TaxInput>(key: K, val: TaxInput[K]) => {
    setUsInput((p) => ({ ...p, [key]: val }));
  }, []);
  const updateUSPreTax = useCallback(<K extends keyof TaxInput['preTaxDeductions']>(key: K, val: number) => {
    setUsInput((p) => ({ ...p, preTaxDeductions: { ...p.preTaxDeductions, [key]: val } }));
  }, []);
  const updateUSPostTax = useCallback(<K extends keyof TaxInput['postTaxDeductions']>(key: K, val: number) => {
    setUsInput((p) => ({ ...p, postTaxDeductions: { ...p.postTaxDeductions, [key]: val } }));
  }, []);

  // CA updaters
  const updateCA = useCallback(<K extends keyof CATaxInput>(key: K, val: CATaxInput[K]) => {
    setCAInput((p) => ({ ...p, [key]: val }));
  }, []);
  const updateCAPreTax = useCallback(<K extends keyof CATaxInput['preTaxDeductions']>(key: K, val: number) => {
    setCAInput((p) => ({ ...p, preTaxDeductions: { ...p.preTaxDeductions, [key]: val } }));
  }, []);

  const locationLabel = country === 'US' ? usInput.state : caInput.province;
  const currYear = country === 'US' ? usInput.taxYear : caInput.taxYear;

  return (
    <div className="w-full">
      <div
        data-ad-slot="top-banner" data-ad-format="leaderboard"
        className="mx-auto mb-6 hidden min-h-[90px] max-w-[728px] rounded bg-gray-100 md:block"
        aria-hidden="true"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">

          {/* ── Country + year selector ── */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1" role="group" aria-label="Country">
                {(['US', 'CA'] as const).map((c) => (
                  <button
                    key={c} type="button" onClick={() => setCountry(c)} aria-pressed={country === c}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      country === c ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{c === 'US' ? '🇺🇸' : '🇨🇦'}</span>
                    <span>{c === 'US' ? 'United States' : 'Canada'}</span>
                  </button>
                ))}
              </div>
              <YearToggle
                year={currYear}
                onChange={(yr) => country === 'US' ? updateUS('taxYear', yr) : updateCA('taxYear', yr)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="grossPayType" className="text-sm font-medium text-gray-700">Gross Pay Type</label>
                <select
                  id="grossPayType"
                  value={country === 'US' ? usInput.grossPayType : caInput.grossPayType}
                  onChange={(e) => country === 'US'
                    ? updateUS('grossPayType', e.target.value as 'annual' | 'perPaycheck')
                    : updateCA('grossPayType', e.target.value as 'annual' | 'perPaycheck')}
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="annual">Annual Salary</option>
                  <option value="perPaycheck">Per Paycheck</option>
                </select>
              </div>

              <NumberInput
                id="grossPay"
                label={`${(country === 'US' ? usInput.grossPayType : caInput.grossPayType) === 'annual' ? 'Annual' : 'Per Paycheck'} Gross (${country === 'US' ? 'USD' : 'CAD'})`}
                value={country === 'US' ? usInput.grossPay : caInput.grossPay}
                onChange={(v) => country === 'US' ? updateUS('grossPay', v) : updateCA('grossPay', v)}
                prefix="$"
                error={error}
              />

              <PayPeriodSelector
                value={country === 'US' ? usInput.payFrequency : caInput.payFrequency}
                onChange={(v) => country === 'US' ? updateUS('payFrequency', v) : updateCA('payFrequency', v)}
              />

              {country === 'US' ? (
                <>
                  <FilingStatusSelector value={usInput.filingStatus} onChange={(v) => updateUS('filingStatus', v as FilingStatus)} />
                  <StateSelector value={usInput.state} onChange={(v) => updateUS('state', v)} />
                </>
              ) : (
                <ProvinceSelector value={caInput.province} onChange={(v) => updateCA('province', v)} />
              )}
            </div>
          </section>

          {/* ── Pre-tax deductions ── */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Pre-Tax Deductions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {country === 'US' ? (
                <>
                  <NumberInput id="k401" label="Traditional 401(k) (annual)" value={usInput.preTaxDeductions.traditional401k} onChange={(v) => updateUSPreTax('traditional401k', v)} prefix="$" />
                  <NumberInput id="health" label="Health Insurance (annual)" value={usInput.preTaxDeductions.healthInsurance} onChange={(v) => updateUSPreTax('healthInsurance', v)} prefix="$" />
                  <NumberInput id="hsa" label="HSA Contribution (annual)" value={usInput.preTaxDeductions.hsa} onChange={(v) => updateUSPreTax('hsa', v)} prefix="$" />
                  <NumberInput id="fsa" label="FSA Contribution (annual)" value={usInput.preTaxDeductions.fsa} onChange={(v) => updateUSPreTax('fsa', v)} prefix="$" />
                  <NumberInput id="otherPreTax" label="Other Pre-Tax (annual)" value={usInput.preTaxDeductions.other} onChange={(v) => updateUSPreTax('other', v)} prefix="$" />
                </>
              ) : (
                <>
                  <NumberInput id="rrsp" label="RRSP Contribution (annual)" value={caInput.preTaxDeductions.rrsp} onChange={(v) => updateCAPreTax('rrsp', v)} prefix="$" />
                  <NumberInput id="groupBenefits" label="Group Benefits / Health (annual)" value={caInput.preTaxDeductions.groupBenefits} onChange={(v) => updateCAPreTax('groupBenefits', v)} prefix="$" />
                  <NumberInput id="pensionContrib" label="Pension Contributions (annual)" value={caInput.preTaxDeductions.pensionContrib} onChange={(v) => updateCAPreTax('pensionContrib', v)} prefix="$" />
                  <NumberInput id="otherPreTaxCA" label="Other Pre-Tax (annual)" value={caInput.preTaxDeductions.other} onChange={(v) => updateCAPreTax('other', v)} prefix="$" />
                </>
              )}
            </div>
          </section>

          {/* ── Post-tax deductions ── */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Post-Tax Deductions</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {country === 'US' ? (
                <>
                  <NumberInput id="roth401k" label="Roth 401(k) (annual)" value={usInput.postTaxDeductions.roth401k} onChange={(v) => updateUSPostTax('roth401k', v)} prefix="$" />
                  <NumberInput id="otherPostTax" label="Other Post-Tax (annual)" value={usInput.postTaxDeductions.other} onChange={(v) => updateUSPostTax('other', v)} prefix="$" />
                </>
              ) : (
                <NumberInput id="otherPostTaxCA" label="Other Post-Tax (annual)" value={caInput.postTaxDeductions.other} onChange={(v) => setCAInput((p) => ({ ...p, postTaxDeductions: { other: v } }))} prefix="$" />
              )}
            </div>
          </section>

          {/* ── Additional withholding ── */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">Additional Withholding</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                id="addlFederal" label="Additional Federal (per paycheck)"
                value={country === 'US' ? usInput.additionalFederalWithholding : caInput.additionalFederalWithholding}
                onChange={(v) => country === 'US' ? updateUS('additionalFederalWithholding', v) : updateCA('additionalFederalWithholding', v)}
                prefix="$"
              />
              <NumberInput
                id="addlProv"
                label={`Additional ${country === 'US' ? 'State' : 'Provincial'} (per paycheck)`}
                value={country === 'US' ? usInput.additionalStateWithholding : caInput.additionalProvincialWithholding}
                onChange={(v) => country === 'US'
                  ? updateUS('additionalStateWithholding', v)
                  : updateCA('additionalProvincialWithholding', v)}
                prefix="$"
              />
            </div>
          </section>
        </div>

        {/* ── Right: results ── */}
        <div className="space-y-4">
          <div
            data-ad-slot="sidebar" data-ad-format="rectangle"
            className="hidden min-h-[250px] w-full rounded bg-gray-100 md:block"
            aria-hidden="true"
          />
          {result ? (
            <>
              <ResultCard result={result} payFrequency={country === 'US' ? usInput.payFrequency : caInput.payFrequency} locationLabel={locationLabel} />
              <TaxBreakdownTable result={result} />
            </>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400 shadow-sm">
              Enter your salary information to see your take-home pay.
            </div>
          )}
        </div>
      </div>

      <div
        data-ad-slot="in-content" data-ad-format="horizontal"
        className="mx-auto mt-8 min-h-[90px] max-w-[728px] rounded bg-gray-100"
        aria-hidden="true"
      />
    </div>
  );
}

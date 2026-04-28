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
import AdSlot from './AdSlot';

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

const inputBase = 'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors';
const inputNormal = 'border-border hover:border-muted/60';
const inputError = 'border-red-400 focus:ring-red-200';
const labelBase = 'phase-label text-muted mb-1 block';

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
    <div className="flex flex-col">
      <label htmlFor={id} className={labelBase}>{label}</label>
      <div className="relative flex items-center">
        {prefix && <span className="pointer-events-none absolute left-3 text-muted text-sm select-none">{prefix}</span>}
        <input
          id={id} type="number" inputMode="decimal" min={min} value={raw} onChange={handleChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={`${inputBase} ${error ? inputError : inputNormal} ${prefix ? 'pl-7' : ''}`}
        />
      </div>
      {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function Calculator({ defaultState, defaultProvince, defaultCountry }: Props) {
  const [country, setCountry] = useState<'US' | 'CA'>(defaultCountry ?? 'US');
  const [showAdvanced, setShowAdvanced] = useState(false);
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

  const updateUS = useCallback(<K extends keyof TaxInput>(key: K, val: TaxInput[K]) => {
    setUsInput((p) => ({ ...p, [key]: val }));
  }, []);
  const updateUSPreTax = useCallback(<K extends keyof TaxInput['preTaxDeductions']>(key: K, val: number) => {
    setUsInput((p) => ({ ...p, preTaxDeductions: { ...p.preTaxDeductions, [key]: val } }));
  }, []);
  const updateUSPostTax = useCallback(<K extends keyof TaxInput['postTaxDeductions']>(key: K, val: number) => {
    setUsInput((p) => ({ ...p, postTaxDeductions: { ...p.postTaxDeductions, [key]: val } }));
  }, []);
  const updateCA = useCallback(<K extends keyof CATaxInput>(key: K, val: CATaxInput[K]) => {
    setCAInput((p) => ({ ...p, [key]: val }));
  }, []);
  const updateCAPreTax = useCallback(<K extends keyof CATaxInput['preTaxDeductions']>(key: K, val: number) => {
    setCAInput((p) => ({ ...p, preTaxDeductions: { ...p.preTaxDeductions, [key]: val } }));
  }, []);

  const locationLabel = country === 'US' ? usInput.state : caInput.province;
  const selectBase = `${inputBase} ${inputNormal} appearance-none`;

  return (
    <div className="w-full">
      <div className="mx-auto mb-6 hidden max-w-[728px] md:block">
        <AdSlot slot="3621580228" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

        {/* ── PHASE 1: INPUTS ── */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #C17F3E' }}>
            <span className="phase-label text-phase1">Phase 1 · Your Inputs</span>
          </div>

          <div className="px-6 py-5 space-y-5">

            {/* Country + year */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 rounded-full p-1" style={{ backgroundColor: '#F0EDE7', border: '1px solid #E2DDD6' }} role="group" aria-label="Country">
                {(['US', 'CA'] as const).map((c) => (
                  <button
                    key={c} type="button" onClick={() => setCountry(c)} aria-pressed={country === c}
                    className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all focus:outline-none"
                    style={country === c
                      ? { backgroundColor: '#FFFFFF', color: '#1C1917', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
                      : { color: '#78716C' }}
                  >
                    <span>{c === 'US' ? '🇺🇸' : '🇨🇦'}</span>
                    <span>{c === 'US' ? 'United States' : 'Canada'}</span>
                  </button>
                ))}
              </div>
              <span className="phase-label rounded-full px-3 py-1.5" style={{ backgroundColor: '#F5F0E8', color: '#C17F3E', border: '1px solid #E8D9C4' }}>
                Tax Year 2026
              </span>
            </div>

            {/* Gross pay type toggle */}
            <div>
              <span className={labelBase}>Gross Pay Type</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E2DDD6' }}>
                {(['annual', 'perPaycheck'] as const).map((t) => {
                  const active = (country === 'US' ? usInput.grossPayType : caInput.grossPayType) === t;
                  return (
                    <button key={t} type="button"
                      onClick={() => country === 'US' ? updateUS('grossPayType', t) : updateCA('grossPayType', t)}
                      className="flex-1 py-2.5 text-sm font-medium transition-colors focus:outline-none"
                      style={active ? { backgroundColor: '#1C1917', color: '#FFFFFF' } : { backgroundColor: '#FFFFFF', color: '#78716C' }}
                    >
                      {t === 'annual' ? 'Annual Salary' : 'Per Paycheck'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main inputs grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput
                id="grossPay"
                label={`${(country === 'US' ? usInput.grossPayType : caInput.grossPayType) === 'annual' ? 'Annual Gross' : 'Per Paycheck Gross'} (${country === 'US' ? 'USD' : 'CAD'})`}
                value={country === 'US' ? usInput.grossPay : caInput.grossPay}
                onChange={(v) => country === 'US' ? updateUS('grossPay', v) : updateCA('grossPay', v)}
                prefix="$" error={error}
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

            {/* Pre-tax deductions */}
            <div>
              <p className={`${labelBase} flex items-center gap-2`}>
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#C17F3E' }} />
                Pre-Tax Deductions <span className="normal-case font-normal text-muted">(annual)</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {country === 'US' ? (
                  <>
                    <NumberInput id="k401" label="Traditional 401(k)" value={usInput.preTaxDeductions.traditional401k} onChange={(v) => updateUSPreTax('traditional401k', v)} prefix="$" />
                    <NumberInput id="health" label="Health Insurance" value={usInput.preTaxDeductions.healthInsurance} onChange={(v) => updateUSPreTax('healthInsurance', v)} prefix="$" />
                    <NumberInput id="hsa" label="HSA Contribution" value={usInput.preTaxDeductions.hsa} onChange={(v) => updateUSPreTax('hsa', v)} prefix="$" />
                    <NumberInput id="fsa" label="FSA Contribution" value={usInput.preTaxDeductions.fsa} onChange={(v) => updateUSPreTax('fsa', v)} prefix="$" />
                    <NumberInput id="otherPreTax" label="Other Pre-Tax" value={usInput.preTaxDeductions.other} onChange={(v) => updateUSPreTax('other', v)} prefix="$" />
                  </>
                ) : (
                  <>
                    <NumberInput id="rrsp" label="RRSP Contribution" value={caInput.preTaxDeductions.rrsp} onChange={(v) => updateCAPreTax('rrsp', v)} prefix="$" />
                    <NumberInput id="groupBenefits" label="Group Benefits / Health" value={caInput.preTaxDeductions.groupBenefits} onChange={(v) => updateCAPreTax('groupBenefits', v)} prefix="$" />
                    <NumberInput id="pensionContrib" label="Pension Contributions" value={caInput.preTaxDeductions.pensionContrib} onChange={(v) => updateCAPreTax('pensionContrib', v)} prefix="$" />
                    <NumberInput id="otherPreTaxCA" label="Other Pre-Tax" value={caInput.preTaxDeductions.other} onChange={(v) => updateCAPreTax('other', v)} prefix="$" />
                  </>
                )}
              </div>
            </div>

            {/* Advanced: post-tax + withholding */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(v => !v)}
                className="flex items-center gap-2 text-sm transition-colors focus:outline-none"
                style={{ color: '#78716C' }}
              >
                <p className={`${labelBase} flex items-center gap-2 mb-0`}>
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#4A5F6E' }} />
                  Post-Tax &amp; Additional Withholding
                </p>
                <span className="ml-auto text-xs">{showAdvanced ? 'Hide' : 'Show advanced'}</span>
              </button>
              {showAdvanced && (
                <div className="grid gap-3 sm:grid-cols-2 mt-3">
                  {country === 'US' ? (
                    <>
                      <NumberInput id="roth401k" label="Roth 401(k)" value={usInput.postTaxDeductions.roth401k} onChange={(v) => updateUSPostTax('roth401k', v)} prefix="$" />
                      <NumberInput id="otherPostTax" label="Other Post-Tax" value={usInput.postTaxDeductions.other} onChange={(v) => updateUSPostTax('other', v)} prefix="$" />
                    </>
                  ) : (
                    <NumberInput id="otherPostTaxCA" label="Other Post-Tax" value={caInput.postTaxDeductions.other} onChange={(v) => setCAInput((p) => ({ ...p, postTaxDeductions: { other: v } }))} prefix="$" />
                  )}
                  <NumberInput id="addlFederal" label="Extra Federal Withholding / paycheck"
                    value={country === 'US' ? usInput.additionalFederalWithholding : caInput.additionalFederalWithholding}
                    onChange={(v) => country === 'US' ? updateUS('additionalFederalWithholding', v) : updateCA('additionalFederalWithholding', v)}
                    prefix="$" />
                  <NumberInput id="addlProv" label={`Extra ${country === 'US' ? 'State' : 'Provincial'} Withholding / paycheck`}
                    value={country === 'US' ? usInput.additionalStateWithholding : caInput.additionalProvincialWithholding}
                    onChange={(v) => country === 'US' ? updateUS('additionalStateWithholding', v) : updateCA('additionalProvincialWithholding', v)}
                    prefix="$" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── PHASE 3: RESULTS ── */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm" style={{ border: '1px solid #E2DDD6' }}>
          <div className="px-6 pt-5 pb-4" style={{ borderBottom: '3px solid #4A5F6E' }}>
            <span className="phase-label text-phase3">Phase 3 · Your Take-Home</span>
          </div>
          <div className="px-6 py-5">
            {result ? (
              <>
                <ResultCard result={result} payFrequency={country === 'US' ? usInput.payFrequency : caInput.payFrequency} locationLabel={locationLabel} />
                <TaxBreakdownTable result={result} />
              </>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center text-center" style={{ color: '#A8A29E' }}>
                <div>
                  <p className="text-4xl mb-3">$—</p>
                  <p className="text-sm">Enter your salary to see take-home pay</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[728px]">
        <AdSlot slot="7771744079" />
      </div>
    </div>
  );
}

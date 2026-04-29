'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { FilingStatus, TaxYear } from '@/lib/taxRates';
import { PayFrequency, TaxInput, TaxResult, calculateTax } from '@/lib/calculateTax';
import { Province } from '@/lib/canadaTaxRates';
import { CATaxInput, calculateTaxCA } from '@/lib/calculateTaxCA';
import { UKTaxInput, calculateTaxUK } from '@/lib/calculateTaxUK';
import { UKRegion, StudentLoanPlan } from '@/lib/ukTaxRates';
import StateSelector from './StateSelector';
import PayPeriodSelector from './PayPeriodSelector';
import FilingStatusSelector from './FilingStatusSelector';
import ProvinceSelector from './ProvinceSelector';
import UKRegionSelector from './UKRegionSelector';
import ResultCard from './ResultCard';
import TaxBreakdownTable from './TaxBreakdownTable';
import AdSlot from './AdSlot';

interface Props {
  defaultState?: string;
  defaultProvince?: Province;
  defaultCountry?: 'US' | 'CA' | 'UK';
  defaultUKRegion?: UKRegion;
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

const DEFAULT_UK: UKTaxInput = {
  grossPay: 45000,
  grossPayType: 'annual',
  payFrequency: 'monthly',
  region: 'ENG',
  taxYear: 2025,
  preTaxDeductions: { pension: 0, other: 0 },
  studentLoan: 'none',
  additionalFederalWithholding: 0,
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

const COUNTRY_CONFIG = [
  { id: 'US' as const, flag: '🇺🇸', label: 'United States' },
  { id: 'CA' as const, flag: '🇨🇦', label: 'Canada' },
  { id: 'UK' as const, flag: '🇬🇧', label: 'United Kingdom' },
];

const STUDENT_LOAN_OPTIONS: { value: StudentLoanPlan; label: string }[] = [
  { value: 'none', label: 'No student loan' },
  { value: 'plan1', label: 'Plan 1 (pre-2012 / NI/Scotland pre-2007)' },
  { value: 'plan2', label: 'Plan 2 (post-2012 England/Wales)' },
  { value: 'plan4', label: 'Plan 4 (Scotland post-2007)' },
  { value: 'postgrad', label: 'Postgraduate Loan' },
];

export default function Calculator({ defaultState, defaultProvince, defaultCountry, defaultUKRegion }: Props) {
  const [country, setCountry] = useState<'US' | 'CA' | 'UK'>(defaultCountry ?? 'US');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [usInput, setUsInput] = useState<TaxInput>({
    ...DEFAULT_US,
    state: defaultState ?? DEFAULT_US.state,
  });
  const [caInput, setCAInput] = useState<CATaxInput>({
    ...DEFAULT_CA,
    province: defaultProvince ?? DEFAULT_CA.province,
  });
  const [ukInput, setUKInput] = useState<UKTaxInput>({
    ...DEFAULT_UK,
    region: defaultUKRegion ?? DEFAULT_UK.region,
  });
  const [result, setResult] = useState<TaxResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (country === 'US') {
      if (usInput.grossPay <= 0) { setError('Enter a valid gross pay.'); setResult(null); return; }
      setError(''); setResult(calculateTax(usInput));
    } else if (country === 'CA') {
      if (caInput.grossPay <= 0) { setError('Enter a valid gross pay.'); setResult(null); return; }
      setError(''); setResult(calculateTaxCA(caInput));
    } else {
      if (ukInput.grossPay <= 0) { setError('Enter a valid gross pay.'); setResult(null); return; }
      setError(''); setResult(calculateTaxUK(ukInput));
    }
  }, [country, usInput, caInput, ukInput]);

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
  const updateUK = useCallback(<K extends keyof UKTaxInput>(key: K, val: UKTaxInput[K]) => {
    setUKInput((p) => ({ ...p, [key]: val }));
  }, []);
  const updateUKPreTax = useCallback(<K extends keyof UKTaxInput['preTaxDeductions']>(key: K, val: number) => {
    setUKInput((p) => ({ ...p, preTaxDeductions: { ...p.preTaxDeductions, [key]: val } }));
  }, []);

  const currentGrossPayType = country === 'US' ? usInput.grossPayType : country === 'CA' ? caInput.grossPayType : ukInput.grossPayType;
  const currentPayFrequency = country === 'US' ? usInput.payFrequency : country === 'CA' ? caInput.payFrequency : ukInput.payFrequency;
  const currencySymbol = country === 'UK' ? '£' : '$';
  const currencyCode = country === 'US' ? 'USD' : country === 'CA' ? 'CAD' : 'GBP';
  const locationLabel = country === 'US' ? usInput.state : country === 'CA' ? caInput.province : ukInput.region;

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
                {COUNTRY_CONFIG.map((c) => (
                  <button
                    key={c.id} type="button" onClick={() => setCountry(c.id)} aria-pressed={country === c.id}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all focus:outline-none"
                    style={country === c.id
                      ? { backgroundColor: '#FFFFFF', color: '#1C1917', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
                      : { color: '#78716C' }}
                  >
                    <span>{c.flag}</span>
                    <span className="hidden sm:inline">{c.label}</span>
                    <span className="sm:hidden">{c.id}</span>
                  </button>
                ))}
              </div>
              <span className="phase-label rounded-full px-3 py-1.5" style={{ backgroundColor: '#F5F0E8', color: '#C17F3E', border: '1px solid #E8D9C4' }}>
                {country === 'UK' ? 'Tax Year 2025/26' : 'Tax Year 2026'}
              </span>
            </div>

            {/* Gross pay type toggle */}
            <div>
              <span className={labelBase}>Gross Pay Type</span>
              <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #E2DDD6' }}>
                {(['annual', 'perPaycheck'] as const).map((t) => {
                  const active = currentGrossPayType === t;
                  return (
                    <button key={t} type="button"
                      onClick={() => {
                        if (country === 'US') updateUS('grossPayType', t);
                        else if (country === 'CA') updateCA('grossPayType', t);
                        else updateUK('grossPayType', t);
                      }}
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
                label={`${currentGrossPayType === 'annual' ? 'Annual Gross' : 'Per Paycheck Gross'} (${currencyCode})`}
                value={country === 'US' ? usInput.grossPay : country === 'CA' ? caInput.grossPay : ukInput.grossPay}
                onChange={(v) => country === 'US' ? updateUS('grossPay', v) : country === 'CA' ? updateCA('grossPay', v) : updateUK('grossPay', v)}
                prefix={currencySymbol} error={error}
              />
              <PayPeriodSelector
                value={currentPayFrequency}
                onChange={(v) => country === 'US' ? updateUS('payFrequency', v) : country === 'CA' ? updateCA('payFrequency', v) : updateUK('payFrequency', v)}
              />
              {country === 'US' && (
                <>
                  <FilingStatusSelector value={usInput.filingStatus} onChange={(v) => updateUS('filingStatus', v as FilingStatus)} />
                  <StateSelector value={usInput.state} onChange={(v) => updateUS('state', v)} />
                </>
              )}
              {country === 'CA' && (
                <ProvinceSelector value={caInput.province} onChange={(v) => updateCA('province', v)} />
              )}
              {country === 'UK' && (
                <UKRegionSelector value={ukInput.region} onChange={(v) => updateUK('region', v)} />
              )}
            </div>

            {/* UK: Student Loan */}
            {country === 'UK' && (
              <div className="flex flex-col">
                <label htmlFor="studentLoan" className={labelBase}>Student Loan</label>
                <select
                  id="studentLoan"
                  value={ukInput.studentLoan}
                  onChange={(e) => updateUK('studentLoan', e.target.value as StudentLoanPlan)}
                  className={`${inputBase} ${inputNormal} appearance-none`}
                >
                  {STUDENT_LOAN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Pre-tax deductions */}
            <div>
              <p className={`${labelBase} flex items-center gap-2`}>
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#C17F3E' }} />
                Pre-Tax Deductions <span className="normal-case font-normal text-muted">(annual)</span>
              </p>
              <div className="grid gap-3 sm:grid-cols-2 mt-2">
                {country === 'US' && (
                  <>
                    <NumberInput id="k401" label="Traditional 401(k)" value={usInput.preTaxDeductions.traditional401k} onChange={(v) => updateUSPreTax('traditional401k', v)} prefix="$" />
                    <NumberInput id="health" label="Health Insurance" value={usInput.preTaxDeductions.healthInsurance} onChange={(v) => updateUSPreTax('healthInsurance', v)} prefix="$" />
                    <NumberInput id="hsa" label="HSA Contribution" value={usInput.preTaxDeductions.hsa} onChange={(v) => updateUSPreTax('hsa', v)} prefix="$" />
                    <NumberInput id="fsa" label="FSA Contribution" value={usInput.preTaxDeductions.fsa} onChange={(v) => updateUSPreTax('fsa', v)} prefix="$" />
                    <NumberInput id="otherPreTax" label="Other Pre-Tax" value={usInput.preTaxDeductions.other} onChange={(v) => updateUSPreTax('other', v)} prefix="$" />
                  </>
                )}
                {country === 'CA' && (
                  <>
                    <NumberInput id="rrsp" label="RRSP Contribution" value={caInput.preTaxDeductions.rrsp} onChange={(v) => updateCAPreTax('rrsp', v)} prefix="$" />
                    <NumberInput id="groupBenefits" label="Group Benefits / Health" value={caInput.preTaxDeductions.groupBenefits} onChange={(v) => updateCAPreTax('groupBenefits', v)} prefix="$" />
                    <NumberInput id="pensionContrib" label="Pension Contributions" value={caInput.preTaxDeductions.pensionContrib} onChange={(v) => updateCAPreTax('pensionContrib', v)} prefix="$" />
                    <NumberInput id="otherPreTaxCA" label="Other Pre-Tax" value={caInput.preTaxDeductions.other} onChange={(v) => updateCAPreTax('other', v)} prefix="$" />
                  </>
                )}
                {country === 'UK' && (
                  <>
                    <NumberInput id="ukPension" label="Pension (salary sacrifice)" value={ukInput.preTaxDeductions.pension} onChange={(v) => updateUKPreTax('pension', v)} prefix="£" />
                    <NumberInput id="ukOtherPreTax" label="Other Pre-Tax" value={ukInput.preTaxDeductions.other} onChange={(v) => updateUKPreTax('other', v)} prefix="£" />
                  </>
                )}
              </div>
            </div>

            {/* Advanced: post-tax + withholding */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(v => !v)}
                className="flex items-center gap-2 text-sm transition-colors focus:outline-none w-full"
                style={{ color: '#78716C' }}
              >
                <p className={`${labelBase} flex items-center gap-2 mb-0`}>
                  <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#4A5F6E' }} />
                  {country === 'UK' ? 'Additional Withholding' : 'Post-Tax & Additional Withholding'}
                </p>
                <span className="ml-auto text-xs">{showAdvanced ? 'Hide' : 'Show advanced'}</span>
              </button>
              {showAdvanced && (
                <div className="grid gap-3 sm:grid-cols-2 mt-3">
                  {country === 'US' && (
                    <>
                      <NumberInput id="roth401k" label="Roth 401(k)" value={usInput.postTaxDeductions.roth401k} onChange={(v) => updateUSPostTax('roth401k', v)} prefix="$" />
                      <NumberInput id="otherPostTax" label="Other Post-Tax" value={usInput.postTaxDeductions.other} onChange={(v) => updateUSPostTax('other', v)} prefix="$" />
                    </>
                  )}
                  {country === 'CA' && (
                    <NumberInput id="otherPostTaxCA" label="Other Post-Tax" value={caInput.postTaxDeductions.other} onChange={(v) => setCAInput((p) => ({ ...p, postTaxDeductions: { other: v } }))} prefix="$" />
                  )}
                  {country !== 'UK' && (
                    <>
                      <NumberInput id="addlFederal" label={`Extra ${country === 'US' ? 'Federal' : 'Federal'} Withholding / paycheck`}
                        value={country === 'US' ? usInput.additionalFederalWithholding : caInput.additionalFederalWithholding}
                        onChange={(v) => country === 'US' ? updateUS('additionalFederalWithholding', v) : updateCA('additionalFederalWithholding', v)}
                        prefix="$" />
                      <NumberInput id="addlProv" label={`Extra ${country === 'US' ? 'State' : 'Provincial'} Withholding / paycheck`}
                        value={country === 'US' ? usInput.additionalStateWithholding : caInput.additionalProvincialWithholding}
                        onChange={(v) => country === 'US' ? updateUS('additionalStateWithholding', v) : updateCA('additionalProvincialWithholding', v)}
                        prefix="$" />
                    </>
                  )}
                  {country === 'UK' && (
                    <NumberInput id="addlUK" label="Extra Withholding / paycheck"
                      value={ukInput.additionalFederalWithholding}
                      onChange={(v) => updateUK('additionalFederalWithholding', v)}
                      prefix="£" />
                  )}
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
                <ResultCard result={result} payFrequency={currentPayFrequency} locationLabel={locationLabel} />
                <TaxBreakdownTable result={result} />
              </>
            ) : (
              <div className="flex min-h-[300px] items-center justify-center text-center" style={{ color: '#A8A29E' }}>
                <div>
                  <p className="text-4xl mb-3">{currencySymbol}—</p>
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

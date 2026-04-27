import {
  FilingStatus,
  TaxYear,
  TaxBracket,
  FEDERAL_BRACKETS_BY_YEAR,
  FEDERAL_STANDARD_DEDUCTIONS_BY_YEAR,
  SOCIAL_SECURITY_RATE,
  SOCIAL_SECURITY_WAGE_BASE_BY_YEAR,
  MEDICARE_RATE,
  ADDITIONAL_MEDICARE_RATE,
  ADDITIONAL_MEDICARE_THRESHOLD,
  STATE_TAX_CONFIGS,
  STATE_FLAT_RATE_OVERRIDES,
} from './taxRates';

export type { TaxYear };

export type PayFrequency = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';

export const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annually: 1,
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: 'Weekly',
  biweekly: 'Bi-weekly',
  semimonthly: 'Semi-monthly',
  monthly: 'Monthly',
  annually: 'Annually',
};

export interface PreTaxDeductions {
  traditional401k: number; // dollar amount annual
  healthInsurance: number; // annual
  hsa: number; // annual
  fsa: number; // annual
  other: number; // annual
}

export interface PostTaxDeductions {
  roth401k: number; // annual
  other: number; // annual
}

export interface TaxInput {
  grossPay: number;
  grossPayType: 'annual' | 'perPaycheck';
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
  state: string;
  taxYear: TaxYear;
  preTaxDeductions: PreTaxDeductions;
  postTaxDeductions: PostTaxDeductions;
  additionalFederalWithholding: number; // per paycheck
  additionalStateWithholding: number; // per paycheck
}

export interface TaxLineItem {
  label: string;
  annual: number;
  perPaycheck: number;
}

export interface TaxResult {
  grossPerPaycheck: number;
  annualGross: number;
  federalIncomeTax: TaxLineItem;
  socialSecurity: TaxLineItem;
  medicare: TaxLineItem;
  additionalMedicare: TaxLineItem;
  stateIncomeTax: TaxLineItem;
  stateOtherTaxes: TaxLineItem[];
  preTaxDeductionsTotal: TaxLineItem;
  postTaxDeductionsTotal: TaxLineItem;
  additionalFederalWithholding: TaxLineItem;
  additionalStateWithholding: TaxLineItem;
  netPay: TaxLineItem;
  effectiveFederalRate: number;
  effectiveTotalRate: number;
  payPeriodsPerYear: number;
  federalTaxableIncome: number;
  stateTaxableIncome: number;
  currency: 'USD' | 'CAD';
}

function calcBracketTax(income: number, brackets: TaxBracket[]): number {
  if (income <= 0) return 0;
  let tax = 0;
  for (const bracket of brackets) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function annualize(amount: number, grossPayType: 'annual' | 'perPaycheck', periods: number): number {
  return grossPayType === 'annual' ? amount : amount * periods;
}

export function calculateTax(input: TaxInput): TaxResult {
  const periods = PAY_PERIODS[input.payFrequency];
  const year = input.taxYear;

  // Step 1 — annualize gross pay
  const annualGross = annualize(input.grossPay, input.grossPayType, periods);
  const grossPerPaycheck = annualGross / periods;

  // Step 2 — pre-tax deductions (annual)
  const preTaxTotal =
    input.preTaxDeductions.traditional401k +
    input.preTaxDeductions.healthInsurance +
    input.preTaxDeductions.hsa +
    input.preTaxDeductions.fsa +
    input.preTaxDeductions.other;

  const federalTaxableWages = Math.max(0, annualGross - preTaxTotal);

  // Step 3 — federal income tax (year-specific brackets)
  const standardDeduction = FEDERAL_STANDARD_DEDUCTIONS_BY_YEAR[year][input.filingStatus];
  const federalTaxableIncome = Math.max(0, federalTaxableWages - standardDeduction);
  const annualFederalTax = calcBracketTax(federalTaxableIncome, FEDERAL_BRACKETS_BY_YEAR[year][input.filingStatus]);

  // Step 4 — FICA (year-specific SS wage base)
  const ssWages = Math.min(annualGross, SOCIAL_SECURITY_WAGE_BASE_BY_YEAR[year]);
  const annualSS = ssWages * SOCIAL_SECURITY_RATE;
  const annualMedicare = annualGross * MEDICARE_RATE;
  const additionalMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD[input.filingStatus];
  const annualAddlMedicare =
    annualGross > additionalMedicareThreshold
      ? (annualGross - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE
      : 0;

  // Step 5 — state income tax (apply 2025 overrides for states with confirmed rate changes)
  const stateConfig = STATE_TAX_CONFIGS[input.state];
  let annualStateTax = 0;
  const stateStdDed = stateConfig?.standardDeduction?.[input.filingStatus] ?? 0;
  const stateTaxableIncome = Math.max(0, federalTaxableWages - stateStdDed);

  if (stateConfig) {
    const stateOverride = STATE_FLAT_RATE_OVERRIDES[year]?.[input.state];
    if (stateOverride !== undefined) {
      annualStateTax = stateTaxableIncome * stateOverride;
    } else if (stateConfig.type === 'flat' && stateConfig.flatRate) {
      annualStateTax = stateTaxableIncome * stateConfig.flatRate;
    } else if (stateConfig.type === 'brackets' && stateConfig.brackets) {
      const brackets = stateConfig.brackets[input.filingStatus];
      annualStateTax = calcBracketTax(stateTaxableIncome, brackets);
    }
  }

  // Step 6 — state-specific additional taxes (SDI, TDI, etc.)
  const stateOtherTaxItems: TaxLineItem[] = [];
  if (stateConfig?.additionalTax) {
    for (const addl of stateConfig.additionalTax) {
      if (addl.rate === 0) continue;
      const base = addl.wageBase !== undefined ? Math.min(annualGross, addl.wageBase) : annualGross;
      const annualAmount = base * addl.rate;
      stateOtherTaxItems.push({
        label: addl.name,
        annual: annualAmount,
        perPaycheck: annualAmount / periods,
      });
    }
  }
  const stateOtherAnnualTotal = stateOtherTaxItems.reduce((s, t) => s + t.annual, 0);

  // Additional withholding (per paycheck → annual)
  const annualAddlFederal = input.additionalFederalWithholding * periods;
  const annualAddlState = input.additionalStateWithholding * periods;

  // Post-tax deductions (annual)
  const postTaxTotal = input.postTaxDeductions.roth401k + input.postTaxDeductions.other;

  // Step 8 — net pay
  const annualNet =
    annualGross -
    annualFederalTax -
    annualSS -
    annualMedicare -
    annualAddlMedicare -
    annualStateTax -
    stateOtherAnnualTotal -
    preTaxTotal -
    postTaxTotal -
    annualAddlFederal -
    annualAddlState;

  const totalAnnualTax =
    annualFederalTax + annualSS + annualMedicare + annualAddlMedicare + annualStateTax + stateOtherAnnualTotal;

  const effectiveFederalRate = annualGross > 0 ? annualFederalTax / annualGross : 0;
  const effectiveTotalRate = annualGross > 0 ? totalAnnualTax / annualGross : 0;

  function lineItem(label: string, annual: number): TaxLineItem {
    return { label, annual, perPaycheck: annual / periods };
  }

  return {
    grossPerPaycheck,
    annualGross,
    federalIncomeTax: lineItem('Federal Income Tax', annualFederalTax),
    socialSecurity: lineItem('Social Security (6.2%)', annualSS),
    medicare: lineItem('Medicare (1.45%)', annualMedicare),
    additionalMedicare: lineItem('Additional Medicare (0.9%)', annualAddlMedicare),
    stateIncomeTax: lineItem(`${input.state} State Income Tax`, annualStateTax),
    stateOtherTaxes: stateOtherTaxItems,
    preTaxDeductionsTotal: lineItem('Pre-tax Deductions', preTaxTotal),
    postTaxDeductionsTotal: lineItem('Post-tax Deductions', postTaxTotal),
    additionalFederalWithholding: lineItem('Additional Federal Withholding', annualAddlFederal),
    additionalStateWithholding: lineItem('Additional State Withholding', annualAddlState),
    netPay: lineItem('Net Take-Home Pay', annualNet),
    effectiveFederalRate,
    effectiveTotalRate,
    payPeriodsPerYear: periods,
    federalTaxableIncome,
    stateTaxableIncome,
    currency: 'USD',
  };
}

export function formatCurrency(amount: number, currency: 'USD' | 'CAD' = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return (rate * 100).toFixed(2) + '%';
}

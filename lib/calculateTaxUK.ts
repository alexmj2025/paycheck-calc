import { TaxResult, TaxLineItem, PayFrequency, PAY_PERIODS } from './calculateTax';
import {
  UKRegion, StudentLoanPlan,
  UK_PERSONAL_ALLOWANCE, UK_ENGLAND_BRACKETS, UK_SCOTLAND_BRACKETS,
  UK_NI, UK_STUDENT_LOAN,
} from './ukTaxRates';

export interface UKPreTaxDeductions {
  pension: number; // annual salary sacrifice
  other: number;   // annual
}

export interface UKTaxInput {
  grossPay: number;
  grossPayType: 'annual' | 'perPaycheck';
  payFrequency: PayFrequency;
  region: UKRegion;
  taxYear: number;
  preTaxDeductions: UKPreTaxDeductions;
  studentLoan: StudentLoanPlan;
  additionalFederalWithholding: number; // per paycheck extra
}

function bracketTax(income: number, brackets: { min: number; max: number; rate: number }[]): number {
  if (income <= 0) return 0;
  let tax = 0;
  for (const b of brackets) {
    if (income <= b.min) break;
    tax += (Math.min(income, b.max) - b.min) * b.rate;
  }
  return tax;
}

function line(label: string, annual: number, periods: number): TaxLineItem {
  const a = Math.max(0, annual);
  return { label, annual: a, perPaycheck: a / periods };
}

export function calculateTaxUK(input: UKTaxInput): TaxResult {
  const periods = PAY_PERIODS[input.payFrequency];
  const annualGross = input.grossPayType === 'annual'
    ? input.grossPay
    : input.grossPay * periods;

  // Pre-tax deductions (pension salary sacrifice reduces both IT and NI)
  const pensionAnnual = input.preTaxDeductions.pension;
  const otherPreTax = input.preTaxDeductions.other;
  const totalPreTax = pensionAnnual + otherPreTax;

  // Adjusted gross for income tax purposes
  const adjustedGross = Math.max(0, annualGross - totalPreTax);

  // Personal Allowance taper: £1 less per £2 over £100,000
  let personalAllowance = UK_PERSONAL_ALLOWANCE;
  if (adjustedGross > 100000) {
    personalAllowance = Math.max(0, UK_PERSONAL_ALLOWANCE - Math.floor((adjustedGross - 100000) / 2));
  }

  // Taxable income = above personal allowance
  const taxableIncome = Math.max(0, adjustedGross - personalAllowance);

  // Income Tax
  const brackets = input.region === 'SCT' ? UK_SCOTLAND_BRACKETS : UK_ENGLAND_BRACKETS;
  const incomeTaxAnnual = bracketTax(taxableIncome, brackets);

  // National Insurance (pension salary sacrifice reduces NI base)
  const niBase = Math.max(0, annualGross - pensionAnnual);
  const { primaryThreshold: pt, upperEarningsLimit: uel, rateMain, rateUpper } = UK_NI;
  let niAnnual = 0;
  if (niBase > pt) {
    niAnnual += (Math.min(niBase, uel) - pt) * rateMain;
    if (niBase > uel) niAnnual += (niBase - uel) * rateUpper;
  }

  // Student Loan (post-income-tax, based on gross pay)
  let studentLoanAnnual = 0;
  if (input.studentLoan !== 'none') {
    const plan = UK_STUDENT_LOAN[input.studentLoan];
    if (annualGross > plan.threshold) {
      studentLoanAnnual = (annualGross - plan.threshold) * plan.rate;
    }
  }

  const addlAnnual = input.additionalFederalWithholding * periods;

  const totalDeductions = incomeTaxAnnual + niAnnual + studentLoanAnnual + totalPreTax + addlAnnual;
  const netAnnual = annualGross - totalDeductions;

  const effectiveFederalRate = annualGross > 0 ? incomeTaxAnnual / annualGross : 0;
  const effectiveTotalRate = annualGross > 0
    ? (incomeTaxAnnual + niAnnual + studentLoanAnnual) / annualGross
    : 0;

  const slPlanLabel = input.studentLoan === 'plan1' ? 'Plan 1'
    : input.studentLoan === 'plan2' ? 'Plan 2'
    : input.studentLoan === 'plan4' ? 'Plan 4'
    : input.studentLoan === 'postgrad' ? 'Postgrad'
    : '';

  return {
    grossPerPaycheck: annualGross / periods,
    annualGross,
    federalIncomeTax: line('Income Tax', incomeTaxAnnual, periods),
    socialSecurity: line('National Insurance', niAnnual, periods),
    medicare: line(`Student Loan (${slPlanLabel})`, studentLoanAnnual, periods),
    additionalMedicare: line('', 0, periods),
    stateIncomeTax: line('', 0, periods),
    stateOtherTaxes: [],
    preTaxDeductionsTotal: line('Pension & Pre-Tax Deductions', totalPreTax, periods),
    postTaxDeductionsTotal: line('', 0, periods),
    additionalFederalWithholding: line('Extra Withholding', addlAnnual, periods),
    additionalStateWithholding: line('', 0, periods),
    netPay: { label: 'Net Take-Home Pay', annual: Math.max(0, netAnnual), perPaycheck: Math.max(0, netAnnual) / periods },
    effectiveFederalRate,
    effectiveTotalRate,
    payPeriodsPerYear: periods,
    federalTaxableIncome: taxableIncome,
    stateTaxableIncome: 0,
    currency: 'GBP',
  };
}

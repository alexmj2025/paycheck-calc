import { TaxYear } from './taxRates';
import { PAY_PERIODS, PayFrequency, TaxResult, TaxLineItem } from './calculateTax';
import {
  Province,
  CABracket,
  CA_FEDERAL_BRACKETS_BY_YEAR,
  CA_FEDERAL_BPA_BY_YEAR,
  CPP_RATE, CPP2_RATE, CPP_BASIC_EXEMPTION, CPP_BY_YEAR,
  QPP_RATE, QPP2_RATE,
  EI_BY_YEAR, EI_QC_BY_YEAR, QPIP_BY_YEAR,
  PROVINCE_TAX_CONFIGS,
} from './canadaTaxRates';

export interface CAPreTaxDeductions {
  rrsp: number;           // RRSP contribution (annual)
  groupBenefits: number;  // Health/dental benefits (annual)
  pensionContrib: number; // Defined benefit pension contribution (annual)
  other: number;
}

export interface CATaxInput {
  grossPay: number;
  grossPayType: 'annual' | 'perPaycheck';
  payFrequency: PayFrequency;
  province: Province;
  taxYear: TaxYear;
  preTaxDeductions: CAPreTaxDeductions;
  postTaxDeductions: { other: number };
  additionalFederalWithholding: number;  // per paycheck
  additionalProvincialWithholding: number; // per paycheck
}

function calcBrackets(income: number, brackets: CABracket[]): number {
  if (income <= 0) return 0;
  let tax = 0;
  for (const b of brackets) {
    if (income <= b.min) break;
    tax += (Math.min(income, b.max) - b.min) * b.rate;
  }
  return tax;
}

export function calculateTaxCA(input: CATaxInput): TaxResult {
  const periods = PAY_PERIODS[input.payFrequency];
  const year = input.taxYear;
  const prov = input.province;
  const provConfig = PROVINCE_TAX_CONFIGS[prov];
  const isQC = provConfig.isQuebec === true;

  // Step 1 — annualize
  const annualGross =
    input.grossPayType === 'annual'
      ? input.grossPay
      : input.grossPay * periods;
  const grossPerPaycheck = annualGross / periods;

  // Step 2 — pre-tax deductions
  const preTaxTotal =
    input.preTaxDeductions.rrsp +
    input.preTaxDeductions.groupBenefits +
    input.preTaxDeductions.pensionContrib +
    input.preTaxDeductions.other;

  const taxableIncome = Math.max(0, annualGross - preTaxTotal);

  // Step 3 — Federal income tax
  // Tax = brackets applied to taxable income, minus Basic Personal Amount credit
  const federalBPA = CA_FEDERAL_BPA_BY_YEAR[year];
  const federalTaxBeforeCredit = calcBrackets(taxableIncome, CA_FEDERAL_BRACKETS_BY_YEAR[year]);
  const federalBPACredit = Math.min(federalTaxBeforeCredit, federalBPA * 0.15);
  const annualFederalTax = Math.max(0, federalTaxBeforeCredit - federalBPACredit);

  // Step 4 — CPP / QPP
  const { ympe, yampe } = CPP_BY_YEAR[year];
  let annualCPP = 0;
  let annualCPP2 = 0;

  if (isQC) {
    // QPP
    annualCPP = Math.max(0, Math.min(annualGross, ympe) - CPP_BASIC_EXEMPTION) * QPP_RATE;
    annualCPP2 = annualGross > ympe
      ? Math.min(annualGross, yampe) - ympe > 0
        ? (Math.min(annualGross, yampe) - ympe) * QPP2_RATE
        : 0
      : 0;
  } else {
    annualCPP = Math.max(0, Math.min(annualGross, ympe) - CPP_BASIC_EXEMPTION) * CPP_RATE;
    annualCPP2 = annualGross > ympe
      ? Math.min(annualGross, yampe) - ympe > 0
        ? (Math.min(annualGross, yampe) - ympe) * CPP2_RATE
        : 0
      : 0;
  }

  // Step 5 — EI / QPIP
  const eiConfig = isQC ? EI_QC_BY_YEAR[year] : EI_BY_YEAR[year];
  const annualEI = Math.min(annualGross, eiConfig.maximumInsurableEarnings) * eiConfig.rate;

  let annualQPIP = 0;
  const qpipItems: TaxLineItem[] = [];
  if (isQC) {
    const qpip = QPIP_BY_YEAR[year];
    annualQPIP = Math.min(annualGross, qpip.maxInsurableEarnings) * qpip.rate;
    qpipItems.push({
      label: `QPIP (${(qpip.rate * 100).toFixed(3)}%)`,
      annual: annualQPIP,
      perPaycheck: annualQPIP / periods,
    });
  }

  // Step 6 — Provincial income tax
  // Tax = brackets applied to taxable income, minus provincial BPA credit
  const provincialBPA = provConfig.basicPersonalAmount;
  const provTaxBeforeCredit = calcBrackets(taxableIncome, provConfig.brackets);
  const provincialBPACredit = Math.min(provTaxBeforeCredit, provincialBPA * provConfig.lowestRate);
  let annualProvincialTax = Math.max(0, provTaxBeforeCredit - provincialBPACredit);

  // Ontario surtax
  if (provConfig.hasSurtax && provConfig.surtaxThresholds) {
    let surtax = 0;
    const t = provConfig.surtaxThresholds;
    if (annualProvincialTax > t[0].threshold) {
      surtax += (Math.min(annualProvincialTax, t[1].threshold) - t[0].threshold) * t[0].rate;
    }
    if (annualProvincialTax > t[1].threshold) {
      surtax += (annualProvincialTax - t[1].threshold) * t[1].rate;
    }
    annualProvincialTax += surtax;
  }

  // Additional withholding
  const annualAddlFederal = input.additionalFederalWithholding * periods;
  const annualAddlProv = input.additionalProvincialWithholding * periods;

  // Post-tax deductions
  const postTaxTotal = input.postTaxDeductions.other;

  // Net pay
  const annualNet =
    annualGross -
    annualFederalTax -
    annualCPP -
    annualCPP2 -
    annualEI -
    annualQPIP -
    annualProvincialTax -
    preTaxTotal -
    postTaxTotal -
    annualAddlFederal -
    annualAddlProv;

  const totalTax = annualFederalTax + annualCPP + annualCPP2 + annualEI + annualQPIP + annualProvincialTax;

  function li(label: string, annual: number): TaxLineItem {
    return { label, annual, perPaycheck: annual / periods };
  }

  const cppLabel = isQC
    ? `QPP (${(QPP_RATE * 100).toFixed(2)}%)`
    : `CPP (${(CPP_RATE * 100).toFixed(2)}%)`;
  const cpp2Label = isQC ? 'QPP2 (4%)' : 'CPP2 (4%)';
  const eiLabel = isQC
    ? `EI - QC (${(eiConfig.rate * 100).toFixed(2)}%)`
    : `EI (${(eiConfig.rate * 100).toFixed(2)}%)`;

  return {
    grossPerPaycheck,
    annualGross,
    federalIncomeTax: li('Federal Income Tax', annualFederalTax),
    socialSecurity: li(cppLabel, annualCPP),         // CPP/QPP → socialSecurity slot
    medicare: li(eiLabel, annualEI),                  // EI → medicare slot
    additionalMedicare: li(cpp2Label, annualCPP2),    // CPP2/QPP2 → additionalMedicare slot
    stateIncomeTax: li(`${prov} Provincial Income Tax`, annualProvincialTax),
    stateOtherTaxes: qpipItems,
    preTaxDeductionsTotal: li('Pre-tax Deductions', preTaxTotal),
    postTaxDeductionsTotal: li('Post-tax Deductions', postTaxTotal),
    additionalFederalWithholding: li('Additional Federal Withholding', annualAddlFederal),
    additionalStateWithholding: li('Additional Provincial Withholding', annualAddlProv),
    netPay: li('Net Take-Home Pay', annualNet),
    effectiveFederalRate: annualGross > 0 ? annualFederalTax / annualGross : 0,
    effectiveTotalRate: annualGross > 0 ? totalTax / annualGross : 0,
    payPeriodsPerYear: periods,
    federalTaxableIncome: taxableIncome,
    stateTaxableIncome: taxableIncome,
    currency: 'CAD',
  };
}

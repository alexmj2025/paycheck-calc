import { TaxYear } from './taxRates';

export type Province = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'ON' | 'PE' | 'QC' | 'SK';

export interface CABracket {
  min: number;
  max: number;
  rate: number;
}

export interface ProvinceTaxConfig {
  brackets: CABracket[];
  basicPersonalAmount: number;
  lowestRate: number; // used to calculate BPA credit
  hasSurtax?: boolean;
  surtaxThresholds?: { threshold: number; rate: number }[];
  isQuebec?: boolean; // uses QPP + QPIP instead of CPP + EI
}

// ── Canadian Federal Brackets ──────────────────────────────────────────────
// Source: CRA T4032 — 2025 rates; 2026 indexed at 2% per CRA announcement
export const CA_FEDERAL_BRACKETS_BY_YEAR: Record<TaxYear, CABracket[]> = {
  2025: [
    { min: 0, max: 57375, rate: 0.15 },
    { min: 57375, max: 114750, rate: 0.205 },
    { min: 114750, max: 158519, rate: 0.26 },
    { min: 158519, max: 253414, rate: 0.29 },
    { min: 253414, max: Infinity, rate: 0.33 },
  ],
  2026: [
    { min: 0, max: 58523, rate: 0.15 },
    { min: 58523, max: 117045, rate: 0.205 },
    { min: 117045, max: 161689, rate: 0.26 },
    { min: 161689, max: 258482, rate: 0.29 },
    { min: 258482, max: Infinity, rate: 0.33 },
  ],
};

export const CA_FEDERAL_BPA_BY_YEAR: Record<TaxYear, number> = {
  2025: 16129,
  2026: 16452,
};

// ── CPP (Canada Pension Plan) ──────────────────────────────────────────────
export const CPP_RATE = 0.0595;
export const CPP2_RATE = 0.04;
export const CPP_BASIC_EXEMPTION = 3500;

export const CPP_BY_YEAR: Record<TaxYear, { ympe: number; yampe: number }> = {
  2025: { ympe: 71300, yampe: 81900 },
  2026: { ympe: 74600, yampe: 85000 },
};

// QPP (Quebec Pension Plan) — same structure, different rate
export const QPP_RATE = 0.064;
export const QPP2_RATE = 0.04;

// ── EI (Employment Insurance) ─────────────────────────────────────────────
export const EI_BY_YEAR: Record<TaxYear, { rate: number; maximumInsurableEarnings: number }> = {
  2025: { rate: 0.0164, maximumInsurableEarnings: 65700 },
  2026: { rate: 0.0163, maximumInsurableEarnings: 68900 },
};

// Quebec EI is reduced (workers pay into QPIP separately)
export const EI_QC_BY_YEAR: Record<TaxYear, { rate: number; maximumInsurableEarnings: number }> = {
  2025: { rate: 0.013, maximumInsurableEarnings: 65700 },
  2026: { rate: 0.013, maximumInsurableEarnings: 68900 },
};

// QPIP (Quebec Parental Insurance Plan)
export const QPIP_BY_YEAR: Record<TaxYear, { rate: number; maxInsurableEarnings: number }> = {
  2025: { rate: 0.00494, maxInsurableEarnings: 98000 },
  2026: { rate: 0.00494, maxInsurableEarnings: 103000 },
};

// ── Provincial Tax Configurations (2024 — used for both years; small year-to-year indexation) ──
export const PROVINCE_TAX_CONFIGS: Record<Province, ProvinceTaxConfig> = {
  AB: {
    brackets: [
      { min: 0, max: 148269, rate: 0.10 },
      { min: 148269, max: 177922, rate: 0.12 },
      { min: 177922, max: 237230, rate: 0.13 },
      { min: 237230, max: 355845, rate: 0.14 },
      { min: 355845, max: Infinity, rate: 0.15 },
    ],
    basicPersonalAmount: 21003,
    lowestRate: 0.10,
  },
  BC: {
    brackets: [
      { min: 0, max: 45654, rate: 0.0506 },
      { min: 45654, max: 91310, rate: 0.077 },
      { min: 91310, max: 104835, rate: 0.105 },
      { min: 104835, max: 127299, rate: 0.1229 },
      { min: 127299, max: 172602, rate: 0.147 },
      { min: 172602, max: 240716, rate: 0.168 },
      { min: 240716, max: Infinity, rate: 0.205 },
    ],
    basicPersonalAmount: 11981,
    lowestRate: 0.0506,
  },
  MB: {
    brackets: [
      { min: 0, max: 36842, rate: 0.108 },
      { min: 36842, max: 79625, rate: 0.1275 },
      { min: 79625, max: Infinity, rate: 0.174 },
    ],
    basicPersonalAmount: 15780,
    lowestRate: 0.108,
  },
  NB: {
    brackets: [
      { min: 0, max: 47715, rate: 0.1482 },
      { min: 47715, max: 95431, rate: 0.1652 },
      { min: 95431, max: 176756, rate: 0.195 },
      { min: 176756, max: Infinity, rate: 0.195 },
    ],
    basicPersonalAmount: 12458,
    lowestRate: 0.1482,
  },
  NL: {
    brackets: [
      { min: 0, max: 43198, rate: 0.087 },
      { min: 43198, max: 86395, rate: 0.145 },
      { min: 86395, max: 154244, rate: 0.158 },
      { min: 154244, max: 215943, rate: 0.178 },
      { min: 215943, max: 275870, rate: 0.198 },
      { min: 275870, max: 551739, rate: 0.208 },
      { min: 551739, max: Infinity, rate: 0.213 },
    ],
    basicPersonalAmount: 10818,
    lowestRate: 0.087,
  },
  NS: {
    brackets: [
      { min: 0, max: 29590, rate: 0.0879 },
      { min: 29590, max: 59180, rate: 0.1495 },
      { min: 59180, max: 93000, rate: 0.1667 },
      { min: 93000, max: 150000, rate: 0.175 },
      { min: 150000, max: Infinity, rate: 0.21 },
    ],
    basicPersonalAmount: 8481,
    lowestRate: 0.0879,
  },
  ON: {
    brackets: [
      { min: 0, max: 51446, rate: 0.0505 },
      { min: 51446, max: 102894, rate: 0.0915 },
      { min: 102894, max: 150000, rate: 0.1116 },
      { min: 150000, max: 220000, rate: 0.1216 },
      { min: 220000, max: Infinity, rate: 0.1316 },
    ],
    basicPersonalAmount: 11141,
    lowestRate: 0.0505,
    hasSurtax: true,
    // Ontario surtax 2024: 20% on provincial tax > $5,315; additional 36% on tax > $6,802
    surtaxThresholds: [
      { threshold: 5315, rate: 0.20 },
      { threshold: 6802, rate: 0.36 },
    ],
  },
  PE: {
    brackets: [
      { min: 0, max: 32656, rate: 0.0965 },
      { min: 32656, max: 64313, rate: 0.1363 },
      { min: 64313, max: 105000, rate: 0.1665 },
      { min: 105000, max: 140000, rate: 0.18 },
      { min: 140000, max: Infinity, rate: 0.1875 },
    ],
    basicPersonalAmount: 12000,
    lowestRate: 0.0965,
  },
  QC: {
    brackets: [
      { min: 0, max: 51780, rate: 0.14 },
      { min: 51780, max: 103545, rate: 0.19 },
      { min: 103545, max: 126000, rate: 0.24 },
      { min: 126000, max: Infinity, rate: 0.2575 },
    ],
    basicPersonalAmount: 17183,
    lowestRate: 0.14,
    isQuebec: true,
  },
  SK: {
    brackets: [
      { min: 0, max: 49720, rate: 0.105 },
      { min: 49720, max: 142058, rate: 0.125 },
      { min: 142058, max: Infinity, rate: 0.145 },
    ],
    basicPersonalAmount: 17661,
    lowestRate: 0.105,
  },
};

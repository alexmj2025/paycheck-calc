export type FilingStatus = 'single' | 'married' | 'head';
export type TaxYear = 2025 | 2026;

export interface TaxBracket {
  min: number;
  max: number;
  rate: number; // decimal, e.g. 0.10 for 10%
}

export interface StateTaxConfig {
  type: 'none' | 'flat' | 'brackets';
  flatRate?: number;
  brackets?: {
    single: TaxBracket[];
    married: TaxBracket[];
    head: TaxBracket[];
  };
  standardDeduction?: {
    single: number;
    married: number;
    head: number;
  };
  // Additional state-specific taxes (SDI, TDI, etc.)
  additionalTax?: {
    name: string;
    rate: number;
    wageBase?: number; // undefined = no cap
  }[];
}

// Federal Tax Brackets by year
// 2025: IRS Rev. Proc. 2024-40 | 2026: IRS Rev. Proc. 2025-32
export const FEDERAL_BRACKETS_BY_YEAR: Record<TaxYear, Record<FilingStatus, TaxBracket[]>> = {
  2025: {
    single: [
      { min: 0, max: 11925, rate: 0.10 },
      { min: 11925, max: 48475, rate: 0.12 },
      { min: 48475, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250525, rate: 0.32 },
      { min: 250525, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 23850, rate: 0.10 },
      { min: 23850, max: 96950, rate: 0.12 },
      { min: 96950, max: 206700, rate: 0.22 },
      { min: 206700, max: 394600, rate: 0.24 },
      { min: 394600, max: 501050, rate: 0.32 },
      { min: 501050, max: 751600, rate: 0.35 },
      { min: 751600, max: Infinity, rate: 0.37 },
    ],
    head: [
      { min: 0, max: 17000, rate: 0.10 },
      { min: 17000, max: 64850, rate: 0.12 },
      { min: 64850, max: 103350, rate: 0.22 },
      { min: 103350, max: 197300, rate: 0.24 },
      { min: 197300, max: 250500, rate: 0.32 },
      { min: 250500, max: 626350, rate: 0.35 },
      { min: 626350, max: Infinity, rate: 0.37 },
    ],
  },
  2026: {
    single: [
      { min: 0, max: 12400, rate: 0.10 },
      { min: 12400, max: 50400, rate: 0.12 },
      { min: 50400, max: 105700, rate: 0.22 },
      { min: 105700, max: 201775, rate: 0.24 },
      { min: 201775, max: 256225, rate: 0.32 },
      { min: 256225, max: 640600, rate: 0.35 },
      { min: 640600, max: Infinity, rate: 0.37 },
    ],
    married: [
      { min: 0, max: 24800, rate: 0.10 },
      { min: 24800, max: 100800, rate: 0.12 },
      { min: 100800, max: 211400, rate: 0.22 },
      { min: 211400, max: 403550, rate: 0.24 },
      { min: 403550, max: 512450, rate: 0.32 },
      { min: 512450, max: 768700, rate: 0.35 },
      { min: 768700, max: Infinity, rate: 0.37 },
    ],
    head: [
      { min: 0, max: 18600, rate: 0.10 },
      { min: 18600, max: 75600, rate: 0.12 },
      { min: 75600, max: 158550, rate: 0.22 },
      { min: 158550, max: 302650, rate: 0.24 },
      { min: 302650, max: 384325, rate: 0.32 },
      { min: 384325, max: 704650, rate: 0.35 },
      { min: 704650, max: Infinity, rate: 0.37 },
    ],
  },
};

// Convenience alias (default to 2026)
export const FEDERAL_BRACKETS = FEDERAL_BRACKETS_BY_YEAR[2026];

export const FEDERAL_STANDARD_DEDUCTIONS_BY_YEAR: Record<TaxYear, Record<FilingStatus, number>> = {
  2025: { single: 15000, married: 30000, head: 22500 },
  2026: { single: 16100, married: 32200, head: 24150 },
};

export const FEDERAL_STANDARD_DEDUCTIONS = FEDERAL_STANDARD_DEDUCTIONS_BY_YEAR[2026];

// FICA — rate unchanged; wage base increases annually
export const SOCIAL_SECURITY_RATE = 0.062;
export const SOCIAL_SECURITY_WAGE_BASE_BY_YEAR: Record<TaxYear, number> = {
  2025: 176100,
  2026: 184500,
};
export const SOCIAL_SECURITY_WAGE_BASE = SOCIAL_SECURITY_WAGE_BASE_BY_YEAR[2026];
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married: 250000,
  head: 200000,
};

// State flat-rate overrides for states with confirmed rate changes vs base STATE_TAX_CONFIGS
export const STATE_FLAT_RATE_OVERRIDES: Partial<Record<TaxYear, Record<string, number>>> = {
  // 2025: IN 3.05%, NC 4.6%, GA 5.39%, MS 4.4%
  2025: { IN: 0.0305, NC: 0.046, GA: 0.0539, MS: 0.044 },
  // 2026: same confirmed rates carried forward (update when states finalize)
  2026: { IN: 0.0305, NC: 0.046, GA: 0.0539, MS: 0.044 },
};

// State Tax Configurations — 2024 rates
export const STATE_TAX_CONFIGS: Record<string, StateTaxConfig> = {
  AK: { type: 'none' },
  FL: { type: 'none' },
  NV: { type: 'none' },
  NH: { type: 'none' },
  SD: { type: 'none' },
  TN: { type: 'none' },
  TX: { type: 'none' },
  WA: { type: 'none' },
  WY: { type: 'none' },

  // Flat-rate states
  CO: { type: 'flat', flatRate: 0.044 },
  IL: { type: 'flat', flatRate: 0.0495 },
  IN: { type: 'flat', flatRate: 0.0315 },
  KY: { type: 'flat', flatRate: 0.04 },
  MA: { type: 'flat', flatRate: 0.05 },
  MI: { type: 'flat', flatRate: 0.0425 },
  NC: { type: 'flat', flatRate: 0.0475 },
  PA: { type: 'flat', flatRate: 0.0307 },
  UT: { type: 'flat', flatRate: 0.0465 },

  // Bracket states
  AL: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: Infinity, rate: 0.05 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 6000, rate: 0.04 },
        { min: 6000, max: Infinity, rate: 0.05 },
      ],
      head: [
        { min: 0, max: 500, rate: 0.02 },
        { min: 500, max: 3000, rate: 0.04 },
        { min: 3000, max: Infinity, rate: 0.05 },
      ],
    },
    standardDeduction: { single: 2500, married: 7500, head: 4700 },
  },

  AZ: {
    type: 'flat',
    flatRate: 0.025,
    standardDeduction: { single: 13850, married: 27700, head: 20800 },
  },

  AR: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 5099, rate: 0.0 },
        { min: 5099, max: 10299, rate: 0.044 },
        { min: 10299, max: Infinity, rate: 0.049 },
      ],
      married: [
        { min: 0, max: 5099, rate: 0.0 },
        { min: 5099, max: 10299, rate: 0.044 },
        { min: 10299, max: Infinity, rate: 0.049 },
      ],
      head: [
        { min: 0, max: 5099, rate: 0.0 },
        { min: 5099, max: 10299, rate: 0.044 },
        { min: 10299, max: Infinity, rate: 0.049 },
      ],
    },
    standardDeduction: { single: 2200, married: 4400, head: 2200 },
  },

  CA: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 10756, rate: 0.01 },
        { min: 10756, max: 25499, rate: 0.02 },
        { min: 25499, max: 40245, rate: 0.04 },
        { min: 40245, max: 55866, rate: 0.06 },
        { min: 55866, max: 70606, rate: 0.08 },
        { min: 70606, max: 360659, rate: 0.093 },
        { min: 360659, max: 432787, rate: 0.103 },
        { min: 432787, max: 721314, rate: 0.113 },
        { min: 721314, max: 1000000, rate: 0.123 },
        { min: 1000000, max: Infinity, rate: 0.133 },
      ],
      married: [
        { min: 0, max: 21512, rate: 0.01 },
        { min: 21512, max: 50998, rate: 0.02 },
        { min: 50998, max: 80490, rate: 0.04 },
        { min: 80490, max: 111732, rate: 0.06 },
        { min: 111732, max: 141212, rate: 0.08 },
        { min: 141212, max: 721318, rate: 0.093 },
        { min: 721318, max: 865574, rate: 0.103 },
        { min: 865574, max: 1000000, rate: 0.113 },
        { min: 1000000, max: 2000000, rate: 0.123 },
        { min: 2000000, max: Infinity, rate: 0.133 },
      ],
      head: [
        { min: 0, max: 21512, rate: 0.01 },
        { min: 21512, max: 50998, rate: 0.02 },
        { min: 50998, max: 65744, rate: 0.04 },
        { min: 65744, max: 81364, rate: 0.06 },
        { min: 81364, max: 96107, rate: 0.08 },
        { min: 96107, max: 490493, rate: 0.093 },
        { min: 490493, max: 588593, rate: 0.103 },
        { min: 588593, max: 1000000, rate: 0.113 },
        { min: 1000000, max: Infinity, rate: 0.133 },
      ],
    },
    standardDeduction: { single: 5202, married: 10404, head: 10404 },
    additionalTax: [{ name: 'CA SDI', rate: 0.009 }],
  },

  CT: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 50000, rate: 0.05 },
        { min: 50000, max: 100000, rate: 0.055 },
        { min: 100000, max: 200000, rate: 0.06 },
        { min: 200000, max: 250000, rate: 0.065 },
        { min: 250000, max: 500000, rate: 0.069 },
        { min: 500000, max: Infinity, rate: 0.0699 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.03 },
        { min: 20000, max: 100000, rate: 0.05 },
        { min: 100000, max: 200000, rate: 0.055 },
        { min: 200000, max: 400000, rate: 0.06 },
        { min: 400000, max: 500000, rate: 0.065 },
        { min: 500000, max: 1000000, rate: 0.069 },
        { min: 1000000, max: Infinity, rate: 0.0699 },
      ],
      head: [
        { min: 0, max: 16000, rate: 0.03 },
        { min: 16000, max: 80000, rate: 0.05 },
        { min: 80000, max: 160000, rate: 0.055 },
        { min: 160000, max: 320000, rate: 0.06 },
        { min: 320000, max: 400000, rate: 0.065 },
        { min: 400000, max: 800000, rate: 0.069 },
        { min: 800000, max: Infinity, rate: 0.0699 },
      ],
    },
  },

  DE: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
      head: [
        { min: 0, max: 2000, rate: 0.0 },
        { min: 2000, max: 5000, rate: 0.022 },
        { min: 5000, max: 10000, rate: 0.039 },
        { min: 10000, max: 20000, rate: 0.048 },
        { min: 20000, max: 25000, rate: 0.052 },
        { min: 25000, max: 60000, rate: 0.0555 },
        { min: 60000, max: Infinity, rate: 0.066 },
      ],
    },
    standardDeduction: { single: 3250, married: 6500, head: 3250 },
  },

  GA: {
    type: 'flat',
    flatRate: 0.0549,
    standardDeduction: { single: 12000, married: 24000, head: 18000 },
  },

  HI: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 2400, rate: 0.014 },
        { min: 2400, max: 4800, rate: 0.032 },
        { min: 4800, max: 9600, rate: 0.055 },
        { min: 9600, max: 14400, rate: 0.064 },
        { min: 14400, max: 19200, rate: 0.068 },
        { min: 19200, max: 24000, rate: 0.072 },
        { min: 24000, max: 36000, rate: 0.076 },
        { min: 36000, max: 48000, rate: 0.079 },
        { min: 48000, max: 150000, rate: 0.0825 },
        { min: 150000, max: 175000, rate: 0.09 },
        { min: 175000, max: 200000, rate: 0.10 },
        { min: 200000, max: Infinity, rate: 0.11 },
      ],
      married: [
        { min: 0, max: 4800, rate: 0.014 },
        { min: 4800, max: 9600, rate: 0.032 },
        { min: 9600, max: 19200, rate: 0.055 },
        { min: 19200, max: 28800, rate: 0.064 },
        { min: 28800, max: 38400, rate: 0.068 },
        { min: 38400, max: 48000, rate: 0.072 },
        { min: 48000, max: 72000, rate: 0.076 },
        { min: 72000, max: 96000, rate: 0.079 },
        { min: 96000, max: 300000, rate: 0.0825 },
        { min: 300000, max: 350000, rate: 0.09 },
        { min: 350000, max: 400000, rate: 0.10 },
        { min: 400000, max: Infinity, rate: 0.11 },
      ],
      head: [
        { min: 0, max: 3600, rate: 0.014 },
        { min: 3600, max: 7200, rate: 0.032 },
        { min: 7200, max: 14400, rate: 0.055 },
        { min: 14400, max: 21600, rate: 0.064 },
        { min: 21600, max: 28800, rate: 0.068 },
        { min: 28800, max: 36000, rate: 0.072 },
        { min: 36000, max: 54000, rate: 0.076 },
        { min: 54000, max: 72000, rate: 0.079 },
        { min: 72000, max: 225000, rate: 0.0825 },
        { min: 225000, max: 262500, rate: 0.09 },
        { min: 262500, max: 300000, rate: 0.10 },
        { min: 300000, max: Infinity, rate: 0.11 },
      ],
    },
    standardDeduction: { single: 2200, married: 4400, head: 3212 },
  },

  ID: {
    type: 'flat',
    flatRate: 0.058,
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  IA: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 6210, rate: 0.044 },
        { min: 6210, max: 31050, rate: 0.0482 },
        { min: 31050, max: 62100, rate: 0.057 },
        { min: 62100, max: Infinity, rate: 0.06 },
      ],
      married: [
        { min: 0, max: 6210, rate: 0.044 },
        { min: 6210, max: 31050, rate: 0.0482 },
        { min: 31050, max: 62100, rate: 0.057 },
        { min: 62100, max: Infinity, rate: 0.06 },
      ],
      head: [
        { min: 0, max: 6210, rate: 0.044 },
        { min: 6210, max: 31050, rate: 0.0482 },
        { min: 31050, max: 62100, rate: 0.057 },
        { min: 62100, max: Infinity, rate: 0.06 },
      ],
    },
    standardDeduction: { single: 2210, married: 5450, head: 2210 },
  },

  KS: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: Infinity, rate: 0.057 },
      ],
      married: [
        { min: 0, max: 30000, rate: 0.031 },
        { min: 30000, max: 60000, rate: 0.0525 },
        { min: 60000, max: Infinity, rate: 0.057 },
      ],
      head: [
        { min: 0, max: 15000, rate: 0.031 },
        { min: 15000, max: 30000, rate: 0.0525 },
        { min: 30000, max: Infinity, rate: 0.057 },
      ],
    },
    standardDeduction: { single: 3000, married: 7500, head: 3000 },
  },

  LA: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: Infinity, rate: 0.0425 },
      ],
      married: [
        { min: 0, max: 25000, rate: 0.0185 },
        { min: 25000, max: 100000, rate: 0.035 },
        { min: 100000, max: Infinity, rate: 0.0425 },
      ],
      head: [
        { min: 0, max: 12500, rate: 0.0185 },
        { min: 12500, max: 50000, rate: 0.035 },
        { min: 50000, max: Infinity, rate: 0.0425 },
      ],
    },
    standardDeduction: { single: 4500, married: 9000, head: 4500 },
  },

  ME: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 24500, rate: 0.058 },
        { min: 24500, max: 58050, rate: 0.0675 },
        { min: 58050, max: Infinity, rate: 0.0715 },
      ],
      married: [
        { min: 0, max: 49050, rate: 0.058 },
        { min: 49050, max: 116100, rate: 0.0675 },
        { min: 116100, max: Infinity, rate: 0.0715 },
      ],
      head: [
        { min: 0, max: 36750, rate: 0.058 },
        { min: 36750, max: 87100, rate: 0.0675 },
        { min: 87100, max: Infinity, rate: 0.0715 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  MD: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 100000, rate: 0.0475 },
        { min: 100000, max: 125000, rate: 0.05 },
        { min: 125000, max: 150000, rate: 0.0525 },
        { min: 150000, max: 250000, rate: 0.055 },
        { min: 250000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: Infinity, rate: 0.0575 },
      ],
      head: [
        { min: 0, max: 1000, rate: 0.02 },
        { min: 1000, max: 2000, rate: 0.03 },
        { min: 2000, max: 3000, rate: 0.04 },
        { min: 3000, max: 150000, rate: 0.0475 },
        { min: 150000, max: 175000, rate: 0.05 },
        { min: 175000, max: 225000, rate: 0.0525 },
        { min: 225000, max: 300000, rate: 0.055 },
        { min: 300000, max: Infinity, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 2400, married: 4850, head: 2400 },
  },

  MN: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 31690, rate: 0.0535 },
        { min: 31690, max: 104090, rate: 0.068 },
        { min: 104090, max: 193240, rate: 0.0785 },
        { min: 193240, max: Infinity, rate: 0.0985 },
      ],
      married: [
        { min: 0, max: 46330, rate: 0.0535 },
        { min: 46330, max: 184040, rate: 0.068 },
        { min: 184040, max: 329600, rate: 0.0785 },
        { min: 329600, max: Infinity, rate: 0.0985 },
      ],
      head: [
        { min: 0, max: 39410, rate: 0.0535 },
        { min: 39410, max: 158140, rate: 0.068 },
        { min: 158140, max: 261060, rate: 0.0785 },
        { min: 261060, max: Infinity, rate: 0.0985 },
      ],
    },
    standardDeduction: { single: 14575, married: 29150, head: 21900 },
  },

  MS: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.0 },
        { min: 10000, max: Infinity, rate: 0.047 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.0 },
        { min: 10000, max: Infinity, rate: 0.047 },
      ],
      head: [
        { min: 0, max: 10000, rate: 0.0 },
        { min: 10000, max: Infinity, rate: 0.047 },
      ],
    },
    standardDeduction: { single: 2300, married: 4600, head: 3400 },
  },

  MO: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 1207, rate: 0.0 },
        { min: 1207, max: 2414, rate: 0.02 },
        { min: 2414, max: 3622, rate: 0.025 },
        { min: 3622, max: 4829, rate: 0.03 },
        { min: 4829, max: 6035, rate: 0.035 },
        { min: 6035, max: 7242, rate: 0.04 },
        { min: 7242, max: 8449, rate: 0.045 },
        { min: 8449, max: Infinity, rate: 0.048 },
      ],
      married: [
        { min: 0, max: 1207, rate: 0.0 },
        { min: 1207, max: 2414, rate: 0.02 },
        { min: 2414, max: 3622, rate: 0.025 },
        { min: 3622, max: 4829, rate: 0.03 },
        { min: 4829, max: 6035, rate: 0.035 },
        { min: 6035, max: 7242, rate: 0.04 },
        { min: 7242, max: 8449, rate: 0.045 },
        { min: 8449, max: Infinity, rate: 0.048 },
      ],
      head: [
        { min: 0, max: 1207, rate: 0.0 },
        { min: 1207, max: 2414, rate: 0.02 },
        { min: 2414, max: 3622, rate: 0.025 },
        { min: 3622, max: 4829, rate: 0.03 },
        { min: 4829, max: 6035, rate: 0.035 },
        { min: 6035, max: 7242, rate: 0.04 },
        { min: 7242, max: 8449, rate: 0.045 },
        { min: 8449, max: Infinity, rate: 0.048 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  MT: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 41000, rate: 0.047 },
        { min: 41000, max: Infinity, rate: 0.059 },
      ],
      head: [
        { min: 0, max: 20500, rate: 0.047 },
        { min: 20500, max: Infinity, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 5540, married: 11080, head: 5540 },
  },

  NE: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 35730, rate: 0.0501 },
        { min: 35730, max: Infinity, rate: 0.0584 },
      ],
      married: [
        { min: 0, max: 7390, rate: 0.0246 },
        { min: 7390, max: 44350, rate: 0.0351 },
        { min: 44350, max: 71460, rate: 0.0501 },
        { min: 71460, max: Infinity, rate: 0.0584 },
      ],
      head: [
        { min: 0, max: 3700, rate: 0.0246 },
        { min: 3700, max: 22170, rate: 0.0351 },
        { min: 22170, max: 35730, rate: 0.0501 },
        { min: 35730, max: Infinity, rate: 0.0584 },
      ],
    },
    standardDeduction: { single: 7900, married: 15800, head: 7900 },
  },

  NJ: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 50000, rate: 0.0175 },
        { min: 50000, max: 70000, rate: 0.0245 },
        { min: 70000, max: 80000, rate: 0.035 },
        { min: 80000, max: 150000, rate: 0.05525 },
        { min: 150000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
      head: [
        { min: 0, max: 20000, rate: 0.014 },
        { min: 20000, max: 35000, rate: 0.0175 },
        { min: 35000, max: 40000, rate: 0.035 },
        { min: 40000, max: 75000, rate: 0.05525 },
        { min: 75000, max: 500000, rate: 0.0637 },
        { min: 500000, max: 1000000, rate: 0.0897 },
        { min: 1000000, max: Infinity, rate: 0.1075 },
      ],
    },
    additionalTax: [
      { name: 'NJ SDI/TDI', rate: 0.0009, wageBase: 161400 },
      { name: 'NJ FLI', rate: 0.0009, wageBase: 161400 },
    ],
  },

  NM: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 5500, rate: 0.017 },
        { min: 5500, max: 11000, rate: 0.032 },
        { min: 11000, max: 16000, rate: 0.047 },
        { min: 16000, max: 210000, rate: 0.049 },
        { min: 210000, max: Infinity, rate: 0.059 },
      ],
      married: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: Infinity, rate: 0.059 },
      ],
      head: [
        { min: 0, max: 8000, rate: 0.017 },
        { min: 8000, max: 16000, rate: 0.032 },
        { min: 16000, max: 24000, rate: 0.047 },
        { min: 24000, max: 315000, rate: 0.049 },
        { min: 315000, max: Infinity, rate: 0.059 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  NY: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 17150, rate: 0.04 },
        { min: 17150, max: 23600, rate: 0.045 },
        { min: 23600, max: 27900, rate: 0.0525 },
        { min: 27900, max: 161550, rate: 0.0585 },
        { min: 161550, max: 323200, rate: 0.0625 },
        { min: 323200, max: 2155350, rate: 0.0685 },
        { min: 2155350, max: 5000000, rate: 0.0965 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
      married: [
        { min: 0, max: 27900, rate: 0.04 },
        { min: 27900, max: 43000, rate: 0.045 },
        { min: 43000, max: 161550, rate: 0.0525 },
        { min: 161550, max: 323200, rate: 0.0585 },
        { min: 323200, max: 2155350, rate: 0.0625 },
        { min: 2155350, max: 5000000, rate: 0.0685 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
      head: [
        { min: 0, max: 23600, rate: 0.04 },
        { min: 23600, max: 27900, rate: 0.045 },
        { min: 27900, max: 161550, rate: 0.0525 },
        { min: 161550, max: 323200, rate: 0.0585 },
        { min: 323200, max: 2155350, rate: 0.0625 },
        { min: 2155350, max: 5000000, rate: 0.0685 },
        { min: 5000000, max: 25000000, rate: 0.103 },
        { min: 25000000, max: Infinity, rate: 0.109 },
      ],
    },
    standardDeduction: { single: 8000, married: 16050, head: 11200 },
    additionalTax: [{ name: 'NY SDI', rate: 0.000, wageBase: 0 }], // negligible (<$32/yr), effectively 0
  },

  ND: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 44725, rate: 0.0195 },
        { min: 44725, max: Infinity, rate: 0.025 },
      ],
      married: [
        { min: 0, max: 74750, rate: 0.0195 },
        { min: 74750, max: Infinity, rate: 0.025 },
      ],
      head: [
        { min: 0, max: 59875, rate: 0.0195 },
        { min: 59875, max: Infinity, rate: 0.025 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  OH: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.02765 },
        { min: 100000, max: 115300, rate: 0.03226 },
        { min: 115300, max: Infinity, rate: 0.03688 },
      ],
      married: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.02765 },
        { min: 100000, max: 115300, rate: 0.03226 },
        { min: 115300, max: Infinity, rate: 0.03688 },
      ],
      head: [
        { min: 0, max: 26050, rate: 0.0 },
        { min: 26050, max: 100000, rate: 0.02765 },
        { min: 100000, max: 115300, rate: 0.03226 },
        { min: 115300, max: Infinity, rate: 0.03688 },
      ],
    },
  },

  OK: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: Infinity, rate: 0.0475 },
      ],
      married: [
        { min: 0, max: 2000, rate: 0.0025 },
        { min: 2000, max: 5000, rate: 0.0075 },
        { min: 5000, max: 7500, rate: 0.0175 },
        { min: 7500, max: 9800, rate: 0.0275 },
        { min: 9800, max: 12200, rate: 0.0375 },
        { min: 12200, max: Infinity, rate: 0.0475 },
      ],
      head: [
        { min: 0, max: 1000, rate: 0.0025 },
        { min: 1000, max: 2500, rate: 0.0075 },
        { min: 2500, max: 3750, rate: 0.0175 },
        { min: 3750, max: 4900, rate: 0.0275 },
        { min: 4900, max: 7200, rate: 0.0375 },
        { min: 7200, max: Infinity, rate: 0.0475 },
      ],
    },
    standardDeduction: { single: 6350, married: 12700, head: 9350 },
  },

  OR: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 18400, rate: 0.0475 },
        { min: 18400, max: 46200, rate: 0.0675 },
        { min: 46200, max: 250000, rate: 0.0875 },
        { min: 250000, max: Infinity, rate: 0.099 },
      ],
      married: [
        { min: 0, max: 36800, rate: 0.0475 },
        { min: 36800, max: 92400, rate: 0.0675 },
        { min: 92400, max: 400000, rate: 0.0875 },
        { min: 400000, max: Infinity, rate: 0.099 },
      ],
      head: [
        { min: 0, max: 23300, rate: 0.0475 },
        { min: 23300, max: 58400, rate: 0.0675 },
        { min: 58400, max: 250000, rate: 0.0875 },
        { min: 250000, max: Infinity, rate: 0.099 },
      ],
    },
    standardDeduction: { single: 2420, married: 4840, head: 3895 },
  },

  RI: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: Infinity, rate: 0.0599 },
      ],
      married: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: Infinity, rate: 0.0599 },
      ],
      head: [
        { min: 0, max: 77450, rate: 0.0375 },
        { min: 77450, max: 176050, rate: 0.0475 },
        { min: 176050, max: Infinity, rate: 0.0599 },
      ],
    },
    standardDeduction: { single: 9300, married: 18600, head: 13950 },
  },

  SC: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 6920, rate: 0.03 },
        { min: 6920, max: 10380, rate: 0.04 },
        { min: 10380, max: 13840, rate: 0.05 },
        { min: 13840, max: 17300, rate: 0.06 },
        { min: 17300, max: Infinity, rate: 0.064 },
      ],
      married: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 6920, rate: 0.03 },
        { min: 6920, max: 10380, rate: 0.04 },
        { min: 10380, max: 13840, rate: 0.05 },
        { min: 13840, max: 17300, rate: 0.06 },
        { min: 17300, max: Infinity, rate: 0.064 },
      ],
      head: [
        { min: 0, max: 3460, rate: 0.0 },
        { min: 3460, max: 6920, rate: 0.03 },
        { min: 6920, max: 10380, rate: 0.04 },
        { min: 10380, max: 13840, rate: 0.05 },
        { min: 13840, max: 17300, rate: 0.06 },
        { min: 17300, max: Infinity, rate: 0.064 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },

  VT: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 45400, rate: 0.0335 },
        { min: 45400, max: 110050, rate: 0.066 },
        { min: 110050, max: 229550, rate: 0.076 },
        { min: 229550, max: Infinity, rate: 0.0875 },
      ],
      married: [
        { min: 0, max: 75850, rate: 0.0335 },
        { min: 75850, max: 183400, rate: 0.066 },
        { min: 183400, max: 279450, rate: 0.076 },
        { min: 279450, max: Infinity, rate: 0.0875 },
      ],
      head: [
        { min: 0, max: 60850, rate: 0.0335 },
        { min: 60850, max: 156700, rate: 0.066 },
        { min: 156700, max: 254500, rate: 0.076 },
        { min: 254500, max: Infinity, rate: 0.0875 },
      ],
    },
    standardDeduction: { single: 6500, married: 13000, head: 9750 },
  },

  VA: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
      married: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
      head: [
        { min: 0, max: 3000, rate: 0.02 },
        { min: 3000, max: 5000, rate: 0.03 },
        { min: 5000, max: 17000, rate: 0.05 },
        { min: 17000, max: Infinity, rate: 0.0575 },
      ],
    },
    standardDeduction: { single: 8000, married: 16000, head: 8000 },
  },

  WV: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 25000, rate: 0.04 },
        { min: 25000, max: 40000, rate: 0.045 },
        { min: 40000, max: 60000, rate: 0.06 },
        { min: 60000, max: Infinity, rate: 0.065 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 25000, rate: 0.04 },
        { min: 25000, max: 40000, rate: 0.045 },
        { min: 40000, max: 60000, rate: 0.06 },
        { min: 60000, max: Infinity, rate: 0.065 },
      ],
      head: [
        { min: 0, max: 10000, rate: 0.03 },
        { min: 10000, max: 25000, rate: 0.04 },
        { min: 25000, max: 40000, rate: 0.045 },
        { min: 40000, max: 60000, rate: 0.06 },
        { min: 60000, max: Infinity, rate: 0.065 },
      ],
    },
    standardDeduction: { single: 2000, married: 4000, head: 2000 },
  },

  WI: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 13810, rate: 0.0354 },
        { min: 13810, max: 27630, rate: 0.0465 },
        { min: 27630, max: 304170, rate: 0.053 },
        { min: 304170, max: Infinity, rate: 0.0765 },
      ],
      married: [
        { min: 0, max: 18420, rate: 0.0354 },
        { min: 18420, max: 36840, rate: 0.0465 },
        { min: 36840, max: 405550, rate: 0.053 },
        { min: 405550, max: Infinity, rate: 0.0765 },
      ],
      head: [
        { min: 0, max: 13810, rate: 0.0354 },
        { min: 13810, max: 27630, rate: 0.0465 },
        { min: 27630, max: 304170, rate: 0.053 },
        { min: 304170, max: Infinity, rate: 0.0765 },
      ],
    },
    standardDeduction: { single: 11590, married: 21820, head: 15110 },
  },

  DC: {
    type: 'brackets',
    brackets: {
      single: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 350000, rate: 0.085 },
        { min: 350000, max: 1000000, rate: 0.0925 },
        { min: 1000000, max: 2000000, rate: 0.0975 },
        { min: 2000000, max: Infinity, rate: 0.1075 },
      ],
      married: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 350000, rate: 0.085 },
        { min: 350000, max: 1000000, rate: 0.0925 },
        { min: 1000000, max: 2000000, rate: 0.0975 },
        { min: 2000000, max: Infinity, rate: 0.1075 },
      ],
      head: [
        { min: 0, max: 10000, rate: 0.04 },
        { min: 10000, max: 40000, rate: 0.06 },
        { min: 40000, max: 60000, rate: 0.065 },
        { min: 60000, max: 350000, rate: 0.085 },
        { min: 350000, max: 1000000, rate: 0.0925 },
        { min: 1000000, max: 2000000, rate: 0.0975 },
        { min: 2000000, max: Infinity, rate: 0.1075 },
      ],
    },
    standardDeduction: { single: 14600, married: 29200, head: 21900 },
  },
};

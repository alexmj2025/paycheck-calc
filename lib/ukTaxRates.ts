export type UKRegion = 'ENG' | 'SCT' | 'WLS' | 'NIR';

// 2025/26 tax year
export const UK_PERSONAL_ALLOWANCE = 12570;

// England, Wales, Northern Ireland — brackets on income above PA
export const UK_ENGLAND_BRACKETS = [
  { min: 0, max: 37700, rate: 0.20 },       // Basic rate (50270 - 12570)
  { min: 37700, max: 112570, rate: 0.40 },   // Higher rate (125140 - 12570)
  { min: 112570, max: Infinity, rate: 0.45 }, // Additional rate
];

// Scotland SRIT — brackets on income above PA
export const UK_SCOTLAND_BRACKETS = [
  { min: 0, max: 2306, rate: 0.19 },         // Starter (14876 - 12570)
  { min: 2306, max: 13991, rate: 0.20 },     // Basic (26561 - 12570)
  { min: 13991, max: 31092, rate: 0.21 },    // Intermediate (43662 - 12570)
  { min: 31092, max: 62430, rate: 0.42 },    // Higher (75000 - 12570)
  { min: 62430, max: 112570, rate: 0.45 },   // Advanced (125140 - 12570)
  { min: 112570, max: Infinity, rate: 0.48 }, // Top rate
];

// National Insurance Class 1 (Employee) 2025/26
export const UK_NI = {
  primaryThreshold: 12570,
  upperEarningsLimit: 50270,
  rateMain: 0.08,  // 8% PT → UEL
  rateUpper: 0.02, // 2% above UEL
};

// Student Loan repayment thresholds 2025/26
export const UK_STUDENT_LOAN = {
  plan1:    { threshold: 24990, rate: 0.09 },
  plan2:    { threshold: 27295, rate: 0.09 },
  plan4:    { threshold: 31395, rate: 0.09 }, // Scotland Plan 4
  postgrad: { threshold: 21000, rate: 0.06 },
} as const;

export type StudentLoanPlan = 'none' | 'plan1' | 'plan2' | 'plan4' | 'postgrad';

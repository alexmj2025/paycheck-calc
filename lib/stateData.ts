export interface StateInfo {
  name: string;
  abbreviation: string;
  slug: string;
  noIncomeTax: boolean;
  nearbyStates: string[]; // abbreviations
}

export const STATES: StateInfo[] = [
  { name: 'Alabama', abbreviation: 'AL', slug: 'alabama-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MS', 'TN', 'GA', 'FL', 'SC'] },
  { name: 'Alaska', abbreviation: 'AK', slug: 'alaska-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['WA', 'OR', 'ID', 'MT', 'WY'] },
  { name: 'Arizona', abbreviation: 'AZ', slug: 'arizona-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['CA', 'NV', 'UT', 'CO', 'NM'] },
  { name: 'Arkansas', abbreviation: 'AR', slug: 'arkansas-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MO', 'TN', 'MS', 'LA', 'TX'] },
  { name: 'California', abbreviation: 'CA', slug: 'california-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['OR', 'NV', 'AZ', 'WA', 'ID'] },
  { name: 'Colorado', abbreviation: 'CO', slug: 'colorado-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['WY', 'NE', 'KS', 'OK', 'NM'] },
  { name: 'Connecticut', abbreviation: 'CT', slug: 'connecticut-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NY', 'MA', 'RI', 'NH', 'VT'] },
  { name: 'Delaware', abbreviation: 'DE', slug: 'delaware-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MD', 'PA', 'NJ', 'VA', 'NY'] },
  { name: 'Florida', abbreviation: 'FL', slug: 'florida-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['GA', 'AL', 'SC', 'TN', 'MS'] },
  { name: 'Georgia', abbreviation: 'GA', slug: 'georgia-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['FL', 'AL', 'TN', 'SC', 'NC'] },
  { name: 'Hawaii', abbreviation: 'HI', slug: 'hawaii-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['CA', 'AK', 'WA', 'OR', 'NV'] },
  { name: 'Idaho', abbreviation: 'ID', slug: 'idaho-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MT', 'WY', 'UT', 'NV', 'OR'] },
  { name: 'Illinois', abbreviation: 'IL', slug: 'illinois-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['WI', 'IA', 'MO', 'KY', 'IN'] },
  { name: 'Indiana', abbreviation: 'IN', slug: 'indiana-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['IL', 'MI', 'OH', 'KY', 'WI'] },
  { name: 'Iowa', abbreviation: 'IA', slug: 'iowa-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MN', 'WI', 'IL', 'MO', 'NE'] },
  { name: 'Kansas', abbreviation: 'KS', slug: 'kansas-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NE', 'MO', 'OK', 'CO', 'IA'] },
  { name: 'Kentucky', abbreviation: 'KY', slug: 'kentucky-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['TN', 'VA', 'WV', 'OH', 'IN'] },
  { name: 'Louisiana', abbreviation: 'LA', slug: 'louisiana-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['TX', 'AR', 'MS', 'TN', 'AL'] },
  { name: 'Maine', abbreviation: 'ME', slug: 'maine-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NH', 'VT', 'MA', 'CT', 'NY'] },
  { name: 'Maryland', abbreviation: 'MD', slug: 'maryland-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['VA', 'DC', 'DE', 'PA', 'WV'] },
  { name: 'Massachusetts', abbreviation: 'MA', slug: 'massachusetts-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['CT', 'RI', 'NH', 'VT', 'NY'] },
  { name: 'Michigan', abbreviation: 'MI', slug: 'michigan-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['OH', 'IN', 'WI', 'MN', 'IL'] },
  { name: 'Minnesota', abbreviation: 'MN', slug: 'minnesota-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['WI', 'IA', 'SD', 'ND', 'MI'] },
  { name: 'Mississippi', abbreviation: 'MS', slug: 'mississippi-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['AL', 'TN', 'AR', 'LA', 'GA'] },
  { name: 'Missouri', abbreviation: 'MO', slug: 'missouri-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['IA', 'IL', 'KY', 'TN', 'AR'] },
  { name: 'Montana', abbreviation: 'MT', slug: 'montana-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['ID', 'WY', 'ND', 'SD', 'WA'] },
  { name: 'Nebraska', abbreviation: 'NE', slug: 'nebraska-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['SD', 'IA', 'MO', 'KS', 'CO'] },
  { name: 'Nevada', abbreviation: 'NV', slug: 'nevada-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['CA', 'AZ', 'UT', 'ID', 'OR'] },
  { name: 'New Hampshire', abbreviation: 'NH', slug: 'new-hampshire-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['ME', 'VT', 'MA', 'CT', 'NY'] },
  { name: 'New Jersey', abbreviation: 'NJ', slug: 'new-jersey-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NY', 'PA', 'DE', 'MD', 'CT'] },
  { name: 'New Mexico', abbreviation: 'NM', slug: 'new-mexico-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['AZ', 'CO', 'TX', 'OK', 'UT'] },
  { name: 'New York', abbreviation: 'NY', slug: 'new-york-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NJ', 'PA', 'CT', 'VT', 'MA'] },
  { name: 'North Carolina', abbreviation: 'NC', slug: 'north-carolina-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['VA', 'SC', 'GA', 'TN', 'MD'] },
  { name: 'North Dakota', abbreviation: 'ND', slug: 'north-dakota-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MN', 'SD', 'MT', 'WY', 'NE'] },
  { name: 'Ohio', abbreviation: 'OH', slug: 'ohio-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['PA', 'WV', 'KY', 'IN', 'MI'] },
  { name: 'Oklahoma', abbreviation: 'OK', slug: 'oklahoma-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['TX', 'KS', 'MO', 'AR', 'CO'] },
  { name: 'Oregon', abbreviation: 'OR', slug: 'oregon-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['CA', 'WA', 'ID', 'NV', 'MT'] },
  { name: 'Pennsylvania', abbreviation: 'PA', slug: 'pennsylvania-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NY', 'NJ', 'DE', 'MD', 'OH'] },
  { name: 'Rhode Island', abbreviation: 'RI', slug: 'rhode-island-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['CT', 'MA', 'NY', 'NH', 'VT'] },
  { name: 'South Carolina', abbreviation: 'SC', slug: 'south-carolina-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NC', 'GA', 'TN', 'VA', 'AL'] },
  { name: 'South Dakota', abbreviation: 'SD', slug: 'south-dakota-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['ND', 'MN', 'NE', 'IA', 'WY'] },
  { name: 'Tennessee', abbreviation: 'TN', slug: 'tennessee-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['KY', 'VA', 'NC', 'GA', 'AL'] },
  { name: 'Texas', abbreviation: 'TX', slug: 'texas-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['OK', 'AR', 'LA', 'NM', 'CO'] },
  { name: 'Utah', abbreviation: 'UT', slug: 'utah-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NV', 'AZ', 'CO', 'WY', 'ID'] },
  { name: 'Vermont', abbreviation: 'VT', slug: 'vermont-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['NH', 'ME', 'MA', 'NY', 'CT'] },
  { name: 'Virginia', abbreviation: 'VA', slug: 'virginia-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MD', 'DC', 'NC', 'WV', 'KY'] },
  { name: 'Washington', abbreviation: 'WA', slug: 'washington-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['OR', 'ID', 'MT', 'CA', 'NV'] },
  { name: 'West Virginia', abbreviation: 'WV', slug: 'west-virginia-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['VA', 'MD', 'PA', 'OH', 'KY'] },
  { name: 'Wisconsin', abbreviation: 'WI', slug: 'wisconsin-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MN', 'IA', 'IL', 'MI', 'IN'] },
  { name: 'Wyoming', abbreviation: 'WY', slug: 'wyoming-paycheck-tax-calculator', noIncomeTax: true, nearbyStates: ['MT', 'SD', 'NE', 'CO', 'UT'] },
  { name: 'District of Columbia', abbreviation: 'DC', slug: 'district-of-columbia-paycheck-tax-calculator', noIncomeTax: false, nearbyStates: ['MD', 'VA', 'PA', 'DE', 'NJ'] },
];

export const STATE_MAP: Record<string, StateInfo> = Object.fromEntries(
  STATES.map((s) => [s.abbreviation, s])
);

export const SLUG_MAP: Record<string, StateInfo> = Object.fromEntries(
  STATES.map((s) => [s.slug, s])
);

export const NO_INCOME_TAX_STATES = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'];

export function getStateBySlug(slug: string): StateInfo | undefined {
  return SLUG_MAP[slug];
}

export function getStateByAbbr(abbr: string): StateInfo | undefined {
  return STATE_MAP[abbr];
}

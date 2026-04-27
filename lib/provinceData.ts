export interface ProvinceInfo {
  name: string;
  abbreviation: string;
  slug: string;
  nearbyProvinces: string[]; // abbreviations
}

export const PROVINCES: ProvinceInfo[] = [
  { name: 'Alberta', abbreviation: 'AB', slug: 'alberta-paycheck-tax-calculator', nearbyProvinces: ['BC', 'SK', 'MB', 'ON', 'QC'] },
  { name: 'British Columbia', abbreviation: 'BC', slug: 'british-columbia-paycheck-tax-calculator', nearbyProvinces: ['AB', 'SK', 'MB', 'ON', 'QC'] },
  { name: 'Manitoba', abbreviation: 'MB', slug: 'manitoba-paycheck-tax-calculator', nearbyProvinces: ['SK', 'ON', 'AB', 'BC', 'QC'] },
  { name: 'New Brunswick', abbreviation: 'NB', slug: 'new-brunswick-paycheck-tax-calculator', nearbyProvinces: ['NS', 'PE', 'QC', 'ON', 'NL'] },
  { name: 'Newfoundland and Labrador', abbreviation: 'NL', slug: 'newfoundland-and-labrador-paycheck-tax-calculator', nearbyProvinces: ['NB', 'NS', 'PE', 'QC', 'ON'] },
  { name: 'Nova Scotia', abbreviation: 'NS', slug: 'nova-scotia-paycheck-tax-calculator', nearbyProvinces: ['NB', 'PE', 'QC', 'ON', 'NL'] },
  { name: 'Ontario', abbreviation: 'ON', slug: 'ontario-paycheck-tax-calculator', nearbyProvinces: ['QC', 'MB', 'BC', 'AB', 'SK'] },
  { name: 'Prince Edward Island', abbreviation: 'PE', slug: 'prince-edward-island-paycheck-tax-calculator', nearbyProvinces: ['NS', 'NB', 'QC', 'ON', 'NL'] },
  { name: 'Quebec', abbreviation: 'QC', slug: 'quebec-paycheck-tax-calculator', nearbyProvinces: ['ON', 'NB', 'NS', 'PE', 'NL'] },
  { name: 'Saskatchewan', abbreviation: 'SK', slug: 'saskatchewan-paycheck-tax-calculator', nearbyProvinces: ['AB', 'MB', 'BC', 'ON', 'QC'] },
];

export const PROVINCE_MAP: Record<string, ProvinceInfo> = Object.fromEntries(
  PROVINCES.map((p) => [p.abbreviation, p])
);

export const PROVINCE_SLUG_MAP: Record<string, ProvinceInfo> = Object.fromEntries(
  PROVINCES.map((p) => [p.slug, p])
);

export function getProvinceBySlug(slug: string): ProvinceInfo | undefined {
  return PROVINCE_SLUG_MAP[slug];
}

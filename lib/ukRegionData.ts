import { UKRegion } from './ukTaxRates';

export interface UKRegionInfo {
  abbreviation: UKRegion;
  name: string;
  slug: string;
}

export const UK_REGIONS: UKRegionInfo[] = [
  { abbreviation: 'ENG', name: 'England', slug: 'england' },
  { abbreviation: 'SCT', name: 'Scotland', slug: 'scotland' },
  { abbreviation: 'WLS', name: 'Wales', slug: 'wales' },
  { abbreviation: 'NIR', name: 'Northern Ireland', slug: 'northern-ireland' },
];

export const UK_REGION_MAP: Record<UKRegion, UKRegionInfo> = Object.fromEntries(
  UK_REGIONS.map((r) => [r.abbreviation, r])
) as Record<UKRegion, UKRegionInfo>;

'use client';
import { UK_REGIONS } from '@/lib/ukRegionData';
import { UKRegion } from '@/lib/ukTaxRates';

interface Props {
  value: UKRegion;
  onChange: (r: UKRegion) => void;
  id?: string;
}

export default function UKRegionSelector({ value, onChange, id = 'ukRegion' }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="phase-label text-muted mb-1">Region</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as UKRegion)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors"
      >
        {UK_REGIONS.map((r) => (
          <option key={r.abbreviation} value={r.abbreviation}>{r.name}</option>
        ))}
      </select>
    </div>
  );
}

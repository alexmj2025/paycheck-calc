'use client';
import { PROVINCES } from '@/lib/provinceData';
import { Province } from '@/lib/canadaTaxRates';

interface Props {
  value: Province;
  onChange: (p: Province) => void;
  id?: string;
}

export default function ProvinceSelector({ value, onChange, id = 'province' }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="phase-label text-muted mb-1">Province</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Province)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors"
      >
        {PROVINCES.map((p) => (
          <option key={p.abbreviation} value={p.abbreviation}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

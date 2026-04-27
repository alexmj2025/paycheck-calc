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
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        Province
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as Province)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

'use client';
import { FilingStatus } from '@/lib/taxRates';

interface Props {
  value: FilingStatus;
  onChange: (status: FilingStatus) => void;
  id?: string;
}

const OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'head', label: 'Head of Household' },
];

export default function FilingStatusSelector({ value, onChange, id = 'filingStatus' }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        Filing Status
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as FilingStatus)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

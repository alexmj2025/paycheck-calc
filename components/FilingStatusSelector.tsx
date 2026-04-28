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
    <div className="flex flex-col">
      <label htmlFor={id} className="phase-label text-muted mb-1">Filing Status</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as FilingStatus)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors"
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

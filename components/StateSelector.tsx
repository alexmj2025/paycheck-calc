'use client';
import { STATES } from '@/lib/stateData';

interface Props {
  value: string;
  onChange: (state: string) => void;
  id?: string;
}

export default function StateSelector({ value, onChange, id = 'state' }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="phase-label text-muted mb-1">State</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors"
      >
        {STATES.map((s) => (
          <option key={s.abbreviation} value={s.abbreviation}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}

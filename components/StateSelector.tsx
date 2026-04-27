'use client';
import { STATES } from '@/lib/stateData';

interface Props {
  value: string;
  onChange: (state: string) => void;
  id?: string;
}

export default function StateSelector({ value, onChange, id = 'state' }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        State
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

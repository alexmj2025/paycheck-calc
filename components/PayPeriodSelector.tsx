'use client';
import { PayFrequency, PAY_FREQUENCY_LABELS } from '@/lib/calculateTax';

interface Props {
  value: PayFrequency;
  onChange: (freq: PayFrequency) => void;
  id?: string;
}

const FREQUENCIES: PayFrequency[] = ['weekly', 'biweekly', 'semimonthly', 'monthly', 'annually'];

export default function PayPeriodSelector({ value, onChange, id = 'payFrequency' }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        Pay Frequency
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as PayFrequency)}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {FREQUENCIES.map((f) => (
          <option key={f} value={f}>
            {PAY_FREQUENCY_LABELS[f]}
          </option>
        ))}
      </select>
    </div>
  );
}

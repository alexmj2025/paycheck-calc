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
    <div className="flex flex-col">
      <label htmlFor={id} className="phase-label text-muted mb-1">Pay Frequency</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as PayFrequency)}
        className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-phase1/40 transition-colors"
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

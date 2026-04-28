'use client';
import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else throw new Error('failed');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  return (
    <section
      className="mt-8 rounded-2xl px-8 py-8"
      style={{ border: '1px solid #E2DDD6', backgroundColor: '#F5F2ED' }}
      aria-label="Email newsletter signup"
    >
      {status === 'success' ? (
        <p className="text-center font-medium" style={{ color: '#1C1917' }}>
          You&apos;re subscribed! Check your inbox for a confirmation.
        </p>
      ) : (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Get 2026 tax tips in your inbox.</h2>
            <p className="mt-1 text-sm" style={{ color: '#78716C' }}>
              Bracket updates, deduction strategies, and withholding guides — free. No spam.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0 sm:w-auto w-full">
            <div className="flex-1 sm:w-64">
              <label htmlFor="emailCapture" className="sr-only">Email address</label>
              <input
                id="emailCapture" type="email" required placeholder="you@email.com"
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ border: '1px solid #E2DDD6', backgroundColor: '#FFFFFF', color: '#1C1917' }}
              />
              {status === 'error' && <p className="mt-1 text-xs text-red-500">{errorMsg}</p>}
            </div>
            <button
              type="submit" disabled={status === 'loading'}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-60 focus:outline-none whitespace-nowrap"
              style={{ backgroundColor: '#1C1917', color: '#FFFFFF' }}
            >
              {status === 'loading' ? 'Sending…' : 'Send me tips'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

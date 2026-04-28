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
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  }

  return (
    <section className="mt-12 rounded-xl bg-blue-700 px-6 py-8 text-white" aria-label="Email newsletter signup">
      <h2 className="text-xl font-bold">Get 2026 tax tips in your inbox</h2>
      <p className="mt-1 text-sm text-blue-100">
        Bracket updates, deduction strategies, and withholding guides — free.
      </p>

      {status === 'success' ? (
        <p className="mt-4 rounded-md bg-white/10 px-4 py-3 text-sm font-medium">
          You&apos;re subscribed! Check your inbox for a confirmation email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <label htmlFor="emailCapture" className="sr-only">
              Email address
            </label>
            <input
              id="emailCapture"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby={status === 'error' ? 'emailError' : undefined}
              className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-blue-200 focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
            {status === 'error' && (
              <p id="emailError" role="alert" className="mt-1 text-xs text-red-200">
                {errorMsg}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-60"
          >
            {status === 'loading' ? 'Sending…' : 'Send me tips'}
          </button>
        </form>
      )}

      <p className="mt-3 text-xs text-blue-200">No spam. Unsubscribe anytime.</p>
    </section>
  );
}

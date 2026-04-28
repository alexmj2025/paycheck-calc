'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function NavHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: 'Calculator' },
    { href: '/canada', label: 'Canada' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <header style={{ borderBottom: '1px solid #D6D1C8' }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="/" className="no-underline flex-shrink-0">
          <Image src="/logo.png" alt="PaycheckTaxCalc" width={180} height={44} className="h-9 w-auto" priority />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden sm:block">
          <ul className="flex gap-1 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{ color: '#78716C' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = '#E2DDD6'; (e.target as HTMLElement).style.color = '#1C1917'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = '#78716C'; }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg transition-colors"
          style={{ color: '#78716C' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav aria-label="Mobile navigation" style={{ borderTop: '1px solid #E2DDD6', backgroundColor: '#EDEAE3' }}>
          <ul className="list-none px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-3 text-sm font-medium transition-colors"
                  style={{ color: '#1C1917', borderBottom: '1px solid #E2DDD6' }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

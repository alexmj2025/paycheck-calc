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
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="no-underline">
          <Image src="/logo.png" alt="PaycheckTaxCalc" width={200} height={50} className="h-10 w-auto" priority />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden sm:block">
          <ul className="flex gap-6 text-sm text-gray-600 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-blue-700 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center gap-1.5 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-5 bg-gray-600 transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-gray-600 transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-gray-600 transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-gray-100 bg-white"
        >
          <ul className="list-none px-4 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block py-3 text-sm font-medium text-gray-700 hover:text-blue-700 border-b border-gray-100 last:border-0"
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

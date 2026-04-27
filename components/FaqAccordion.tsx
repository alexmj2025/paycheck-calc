'use client';
import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="font-semibold text-gray-900 text-sm sm:text-base">{item.q}</span>
              <span
                className={`flex-shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-gray-700">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

import { MetadataRoute } from 'next';
import { STATES } from '@/lib/stateData';
import { PROVINCES } from '@/lib/provinceData';

const BASE = 'https://paychecktaxcalc.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const stateEntries: MetadataRoute.Sitemap = STATES.map((s) => ({
    url: `${BASE}/${s.slug}`,
    lastModified: new Date('2026-04-28'),
    changeFrequency: 'yearly',
    priority: 0.9,
  }));

  const provinceEntries: MetadataRoute.Sitemap = PROVINCES.map((p) => ({
    url: `${BASE}/canada/${p.slug}`,
    lastModified: new Date('2026-04-28'),
    changeFrequency: 'yearly',
    priority: 0.9,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE}/canada`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    ...stateEntries,
    ...provinceEntries,
    {
      url: `${BASE}/how-it-works`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE}/faq`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date('2026-04-28'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

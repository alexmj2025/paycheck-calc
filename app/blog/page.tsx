import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax & Paycheck Blog — PaycheckTaxCalc',
  description:
    'Plain-English guides on how paycheck taxes work in the US, Canada, and UK. Learn about W-4 forms, pre-tax deductions, FICA, effective tax rates, and more.',
  alternates: { canonical: 'https://paychecktaxcalc.com/blog' },
};

const ARTICLES = [
  {
    slug: 'how-to-read-your-pay-stub',
    title: 'How to Read Your Pay Stub: Every Line Explained',
    description:
      'Your pay stub contains more information than most people realize. We walk through every section — gross pay, deductions, YTD totals — so nothing is confusing.',
    date: '2026',
    readTime: '7 min read',
    tag: 'Basics',
  },
  {
    slug: 'how-to-fill-out-w4-2026',
    title: 'How to Fill Out Your W-4 in 2026 (Step-by-Step)',
    description:
      'The W-4 form determines how much federal income tax is withheld from each paycheck. Getting it right means no surprise bill — and no unnecessarily large refund.',
    date: '2026',
    readTime: '8 min read',
    tag: 'US Taxes',
  },
  {
    slug: 'effective-vs-marginal-tax-rate',
    title: 'Effective Tax Rate vs. Marginal Tax Rate: What\'s the Difference?',
    description:
      'Saying "I\'m in the 22% bracket" does not mean you pay 22% on all your income. Understanding the difference between marginal and effective rates changes how you think about salary negotiations and raises.',
    date: '2026',
    readTime: '6 min read',
    tag: 'Tax Concepts',
  },
  {
    slug: 'pretax-deductions-guide',
    title: 'Pre-Tax Deductions Explained: 401(k), HSA, FSA & Health Insurance',
    description:
      'Pre-tax deductions lower your taxable income before federal and state income taxes are calculated. Here is exactly how much each type saves you — with real numbers.',
    date: '2026',
    readTime: '9 min read',
    tag: 'Deductions',
  },
  {
    slug: 'fica-tax-explained',
    title: 'FICA Tax Explained: Social Security & Medicare Withholding',
    description:
      'FICA is the one tax you pay regardless of your state, filing status, or deductions. Here is how Social Security and Medicare withholding actually works — including the wage base cap and the high-earner surtax.',
    date: '2026',
    readTime: '6 min read',
    tag: 'FICA',
  },
];

const TAG_COLORS: Record<string, string> = {
  Basics: '#C17F3E',
  'US Taxes': '#B5533C',
  'Tax Concepts': '#4A5F6E',
  Deductions: '#5A7A52',
  FICA: '#7B5EA7',
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <p className="phase-label text-muted mb-3">Blog</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          Paycheck &amp; Tax Guides
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: '#78716C' }}>
          Plain-English articles on how paycheck taxes work. No jargon, no fluff — just clear explanations
          of the rules that affect every paycheck.
        </p>
      </div>

      <div className="space-y-5">
        {ARTICLES.map((article) => (
          <a
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-md"
            style={{ border: '1px solid #E2DDD6', textDecoration: 'none' }}
          >
            <div className="px-8 py-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="phase-label px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: TAG_COLORS[article.tag] || '#78716C', fontSize: '10px' }}
                >
                  {article.tag}
                </span>
                <span className="phase-label text-muted">{article.date} · {article.readTime}</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug mb-2" style={{ color: '#1C1917' }}>
                {article.title}
              </h2>
              <p className="leading-relaxed" style={{ color: '#78716C' }}>
                {article.description}
              </p>
              <p className="mt-4 text-sm font-medium" style={{ color: '#B5533C' }}>
                Read article →
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm" style={{ color: '#78716C' }}>
          Have a topic you want us to cover?{' '}
          <a href="/contact" className="underline" style={{ color: '#B5533C' }}>
            Let us know
          </a>
        </p>
      </div>
    </div>
  );
}

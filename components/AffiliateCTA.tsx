export default function AffiliateCTA() {
  const cards = [
    {
      title: 'File your taxes free',
      description: 'File federal and state taxes at no cost with TurboTax Free Edition.',
      cta: 'Start for free →',
      href: '#affiliate-turbotax',
      accent: '#C17F3E',
    },
    {
      title: 'Open a tax-advantaged 401(k)',
      description: "Reduce your taxable income today with Betterment's automated portfolios.",
      cta: 'Open account →',
      href: '#affiliate-betterment',
      accent: '#B5533C',
    },
    {
      title: 'Compare payroll services',
      description: 'Automated payroll, benefits, and compliance in one place with Gusto.',
      cta: 'Compare plans →',
      href: '#affiliate-gusto',
      accent: '#4A5F6E',
    },
  ];

  return (
    <section className="mt-16" aria-label="Tax tools and services">
      <p className="phase-label text-muted mb-2">Next Steps</p>
      <h2 className="mb-6 text-3xl font-bold" style={{ color: '#1C1917' }}>Ready to optimize your taxes?</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.href}
            className="rounded-2xl bg-white p-6"
            style={{ border: '1px solid #E2DDD6' }}
          >
            <div className="mb-4 h-0.5 w-8 rounded-full" style={{ backgroundColor: card.accent }} />
            <h3 className="font-semibold mb-2" style={{ color: '#1C1917' }}>{card.title}</h3>
            <p className="text-sm mb-5" style={{ color: '#78716C' }}>{card.description}</p>
            <a
              href={card.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: card.accent }}
            >
              {card.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

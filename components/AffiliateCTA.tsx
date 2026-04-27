export default function AffiliateCTA() {
  const cards = [
    {
      title: 'File your taxes free',
      description: 'File federal and state taxes at no cost with TurboTax Free Edition.',
      cta: 'Start for free →',
      href: '#affiliate-turbotax',
      color: 'bg-green-50 border-green-200',
      btnColor: 'bg-green-600 hover:bg-green-700',
    },
    {
      title: 'Open a tax-advantaged 401(k)',
      description: "Reduce your taxable income today. Invest with Betterment's automated portfolios.",
      cta: 'Open account →',
      href: '#affiliate-betterment',
      color: 'bg-blue-50 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      title: 'Compare payroll services',
      description: 'Automated payroll, benefits, and compliance in one place with Gusto.',
      cta: 'Compare plans →',
      href: '#affiliate-gusto',
      color: 'bg-purple-50 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <section className="mt-12" aria-label="Tax tools and services">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Ready to optimize your taxes?</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.href} className={`rounded-xl border p-5 ${card.color}`}>
            <h3 className="font-semibold text-gray-900">{card.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{card.description}</p>
            <a
              href={card.href}
              className={`mt-4 inline-block rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${card.btnColor} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              {card.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

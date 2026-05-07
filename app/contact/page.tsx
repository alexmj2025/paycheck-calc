import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact PaycheckTaxCalc — Questions, Feedback & Corrections',
  description:
    'Get in touch with the PaycheckTaxCalc team. Report tax rate errors, suggest improvements, or ask questions about our free paycheck calculator.',
  alternates: { canonical: 'https://paychecktaxcalc.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-10">
        <p className="phase-label text-muted mb-3">Contact</p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl" style={{ color: '#1C1917' }}>
          Get in touch
        </h1>
        <p className="mt-4 text-base leading-relaxed" style={{ color: '#78716C' }}>
          We read every message and aim to respond within 1–2 business days. Whether you&rsquo;ve spotted an
          error in our tax rates, have a feature suggestion, or just have a question — we want to hear it.
        </p>
      </div>

      {/* Contact card */}
      <section className="overflow-hidden rounded-2xl bg-white" style={{ border: '1px solid #E2DDD6' }}>
        <div className="px-8 pt-6 pb-4" style={{ borderBottom: '3px solid #B5533C' }}>
          <span className="phase-label" style={{ color: '#B5533C' }}>Reach Us</span>
        </div>
        <div className="px-8 py-8 space-y-6 text-sm" style={{ color: '#44403C' }}>

          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: '#F5F2ED' }}
            >
              ✉️
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>Email</p>
              <a
                href="mailto:hello@paychecktaxcalc.com"
                className="text-base underline"
                style={{ color: '#B5533C' }}
              >
                hello@paychecktaxcalc.com
              </a>
              <p className="mt-1 leading-relaxed" style={{ color: '#78716C' }}>
                For general questions, feedback, and bug reports.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: '#F5F2ED' }}
            >
              🔍
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>Tax rate corrections</p>
              <p className="leading-relaxed" style={{ color: '#78716C' }}>
                If you believe a tax rate or bracket in our calculator is incorrect, please email us with
                the state/province/region, the rate you see, and a link to the official source. We take
                accuracy seriously and will review and update within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: '#F5F2ED' }}
            >
              💡
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>Feature requests</p>
              <p className="leading-relaxed" style={{ color: '#78716C' }}>
                Have an idea for something the calculator should support — a new country, a new deduction
                type, or a different view of the results? We&rsquo;d love to hear it.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: '#F5F2ED' }}
            >
              🤝
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#1C1917' }}>Partnerships & media</p>
              <p className="leading-relaxed" style={{ color: '#78716C' }}>
                For editorial mentions, affiliate partnerships, or media inquiries, please use the same
                email address above and include &ldquo;Partnership&rdquo; in the subject line.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Response time note */}
      <div
        className="mt-6 rounded-xl px-6 py-4 text-sm leading-relaxed"
        style={{ backgroundColor: '#F5F2ED', border: '1px solid #E2DDD6', color: '#78716C' }}
      >
        <strong style={{ color: '#1C1917' }}>Response times:</strong> We aim to respond to all emails within
        1–2 business days. Tax rate correction reports are prioritized and typically addressed within 24 hours.
        We are a small team — we appreciate your patience.
      </div>

      {/* Disclaimer */}
      <p className="mt-8 text-xs leading-relaxed text-center" style={{ color: '#A8A29E' }}>
        PaycheckTaxCalc does not provide tax, legal, or financial advice. For advice specific to your tax
        situation, please consult a Certified Public Accountant (CPA) or other qualified tax professional.
      </p>
    </div>
  );
}

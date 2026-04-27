# PaycheckTaxCalc

Free paycheck tax calculator for all 50 US states. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

## Build for production

```bash
npm run build
npm start
```

## Deployment

Deployed on Vercel. Push to `main` to trigger a deploy.

## How to update tax rates

All tax rate data is in **`/lib/taxRates.ts`**.

- **Federal brackets**: Update `FEDERAL_BRACKETS` and `FEDERAL_STANDARD_DEDUCTIONS` constants.
- **FICA wage base**: Update `SOCIAL_SECURITY_WAGE_BASE` and `ADDITIONAL_MEDICARE_THRESHOLD`.
- **State rates**: Find the state key in `STATE_TAX_CONFIGS` (e.g., `CA`, `NY`) and update brackets/flat rate.

After updating, run `npm run build` to verify no TypeScript errors.

## How to add affiliate links

Edit **`/components/AffiliateCTA.tsx`** and replace the placeholder `href` values:

```tsx
{ href: '#affiliate-turbotax' }   // → 'https://turbotax.intuit.com/?cid=your_id'
{ href: '#affiliate-betterment' } // → 'https://betterment.com/refer/...'
{ href: '#affiliate-gusto' }      // → 'https://gusto.com/partner/...'
```

## How to connect email capture (ConvertKit / Mailchimp)

The stub is in **`/app/api/subscribe/route.ts`**.

**ConvertKit:** Set `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID` env vars in Vercel, then POST to:
`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

**Mailchimp:** Set `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`, then use the Mailchimp Members API.

## Project structure

```
app/
  page.tsx                Homepage + SEO content
  layout.tsx              Root layout, metadata, JSON-LD
  [state]/page.tsx        51 static state pages
  sitemap.ts              Auto-generated sitemap
  faq/page.tsx            22 FAQ questions
  how-it-works/page.tsx   Calculation methodology
  privacy/page.tsx        Privacy policy
  api/subscribe/route.ts  Email subscribe API stub

components/
  Calculator.tsx           All inputs, debounced, accessible
  ResultCard.tsx           Per-paycheck result + share button
  TaxBreakdownTable.tsx    Full-year itemized table
  StateSelector.tsx        State dropdown
  PayPeriodSelector.tsx    Pay frequency dropdown
  FilingStatusSelector.tsx Filing status dropdown
  AffiliateCTA.tsx         Affiliate offer cards
  EmailCapture.tsx         Email newsletter signup

lib/
  taxRates.ts     2024 federal + all state tax rate data
  calculateTax.ts Pure calculation functions (zero deps)
  stateData.ts    State metadata and slug mapping

public/
  robots.txt      Search engine crawl rules
  og-image.svg    Open Graph image
```

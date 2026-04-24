# Vercel Analytics and Marketing Tracking

This site now uses:

- `@vercel/analytics` for Vercel Web Analytics
- `@vercel/speed-insights` for Vercel Speed Insights
- Custom marketing events for lead intent, CTA clicks, phone/email clicks, quote-form progress, gallery engagement, and review engagement
- Session-level attribution capture for UTM and paid-click traffic
- Lead attribution added to quote emails so conversions can be tied back to source/campaign

## What Was Added

### Automatic Vercel Dashboard Data

Once enabled in the Vercel dashboard, you will get:

- Visitors
- Page views
- Top pages
- Referrers
- Countries
- Devices
- Browsers
- Operating systems
- Bounce rate
- Core Web Vitals and route performance in Speed Insights

### Marketing/Lead Events Added

These custom events are now tracked:

- `High Intent Page Viewed`
- `Quote CTA Clicked`
- `Portfolio CTA Clicked`
- `Service Navigation Clicked`
- `Phone Link Clicked`
- `Email Link Clicked`
- `Social Link Clicked`
- `Outbound Link Clicked`
- `Google Business Profile Clicked`
- `Quote Form Viewed`
- `Quote Form Started`
- `SMS Consent Checked`
- `Quote Form Submitted`
- `Quote Form Error`
- `Gallery Filter Selected`
- `Gallery Lightbox Opened`
- `Reviews Carousel Navigated`
- `Review Expanded`

## Attribution Captured

The site now captures session attribution from:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`
- `msclkid`
- referrer hostname fallback

That attribution is used in two places:

1. Custom events sent to Vercel Web Analytics
2. Quote lead emails sent from `/api/quote`

The quote email now includes:

- consent source URL
- attribution summary
- landing page
- conversion page
- source / medium / campaign when available

## What You Need To Enable in Vercel

In the Vercel dashboard for this project:

1. Open `Analytics` and enable Web Analytics
2. Open `Speed Insights` and enable Speed Insights

Without those two dashboard toggles, the code is installed but Vercel will not show production analytics data.

## How To Read This for Marketing

Use this funnel in Vercel:

1. `Top Pages` and `Referrers`
2. `High Intent Page Viewed`
3. `Quote CTA Clicked`
4. `Quote Form Viewed`
5. `Quote Form Started`
6. `Quote Form Submitted`
7. `Phone Link Clicked` / `Email Link Clicked`

That gives you a practical lead-intent funnel by source and landing page.

## ROI Reality Check

Vercel can show traffic, engagement, lead-intent, and conversion proxy events.

Vercel does **not** natively calculate:

- closed revenue
- cost per lead
- cost per acquisition
- ROAS
- job value by campaign

To get real ROI:

1. Add UTM parameters to every ad and campaign link
2. Use the new attribution data in quote emails or your CRM
3. Match submitted leads to closed jobs and revenue outside Vercel
4. Compare that against ad spend

## Plan Notes

- Web Analytics page views and visitor data are available on all plans
- Custom events require a Vercel plan that supports them
- UTM reporting in the Vercel dashboard itself is plan-dependent
- Speed Insights usage can be tuned later with `sampleRate` if you want to lower event volume

## Implementation Notes

- This repo is a Vite React app, not a Next.js App Router app
- Because of that, the correct integration is `@vercel/analytics/react`, not `@vercel/analytics/next`
- Route-aware wrappers were added so Vercel can track this SPA cleanly across React Router navigation

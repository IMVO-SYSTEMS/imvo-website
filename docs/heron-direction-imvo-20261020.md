# IMVO Studio — Heron-inspired design direction (20 October 2026)

Heron was reviewed across Home, About, Chat Widget, Dashboard, Pricing, Contact, Resources and three legal pages.

## Adopt as experience principles, not copyrighted content
- Large architectural hero that nearly fills the first viewport, with a complete interactive elevation and 1–100% build animation.
- Fine architectural grid, aligned dividers, crosshair/corner marks, strongly intentional typographic scale and interaction states.
- Status panel as an honest **public IMVO design desk**: CMS-driven Kigali studio availability, local context, drawing progress, and actual navigation to projects/services/enquiries. Never invent Heron's AI/model-health percentages, activity events, project approvals, tasks or savings.
- IMVO team portraits use the real team's existing image paths and generated monochrome pencil-style derivatives; photo is revealed on hover and keyboard focus, with touch devices showing a readable static image.
- Distinct IMVO footer columns with functional links to Studio, Systems, DŌMICILE, legal and contact routes. Do not copy reference branding, team identities, addresses, illustrations or page text.
- Keep full native IMVO Systems red developer and DŌMICILE imperial-blue product websites independent.

## Free, safe caching strategy
- Use Cloudflare Workers Static Assets `public/_headers` to add a short browser cache for **static public asset paths only**. No new billable Cloudflare resource or subscription.
- Do not cache SSR HTML/RSC, personalized flows, contact form data, CMS editor data, or live studio status.
- Durable ISR and globally shared HTML caching through vinext Workers Response Store needs R2 and Durable Object; Workers Cache + KV needs a KV namespace. These are a separate opt-in with cost and data-freshness review.

## Release QA
- Verify 320/390px and desktop hero height, no overlap between new panel, annotations, completion bar and menu.
- Verify keyboard focus and reduced-motion photo state, and all four local sketch files.
- Verify Cloudflare static cache headers and confirm pages remain dynamic.
- Run npm install/build and 63 Systems routes plus Studio asset, interaction and font smoke tests.
- Run mobile Lighthouse without claiming a guaranteed 100/100 score.

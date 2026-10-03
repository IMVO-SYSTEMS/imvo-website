# IMVO Group Website

Official web platform for **IMVO Group**, maintained by **IMVO Systems**.

This repository contains the public IMVO digital experience, including Studio, Systems and DŌMICILE, together with the shared design system and CMS integration.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS
- Cloudflare Workers

## Local development

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run lint
npm run build:next
npx vinext check
npm run build:cloudflare
```

## Structure

- `app/` — routes and application pages
- `components/` — shared UI components
- `public/` — production media and static assets
- `sanity/` — CMS schemas and integration
- `scripts/` — maintenance and migration tooling
- `docs/` — active technical and handoff documentation
- `.github/` — GitHub workflows
- `wrangler.jsonc` — Cloudflare Worker runtime configuration

## Security

Keep credentials in local or deployment environment variables. Never commit production tokens, API keys, passwords, or private credentials.

## Deployment

Production hosting is prepared for **Cloudflare Workers**. Sanity remains the content-management backend.

The canonical deployment branch is **main** under the **IMVO-SYSTEMS** GitHub organization.

A pre-transfer recovery branch is retained for rollback and historical reference.

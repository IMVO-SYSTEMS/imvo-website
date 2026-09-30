# IMVO Group Website

Official web platform for **IMVO Group**, maintained by **IMVO Systems**.

This repository contains the public IMVO digital experience, including Studio, Systems and DŌMICILE, together with the shared design system and CMS integration.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Sanity CMS
- Vercel

## Local development

```bash
npm ci
npm run dev
```

Before merging production changes:

```bash
npm run lint
npm run build
```

## Structure

- `app/` — routes and application pages
- `components/` — shared UI components
- `public/` — production media and static assets
- `sanity/` — CMS schemas and integration
- `scripts/` — maintenance and migration tooling
- `docs/` — active technical and handoff documentation
- `.github/` — GitHub workflows

## Security

Keep credentials in local or deployment environment variables. Never commit production tokens, API keys, passwords, or private credentials.

## Deployment

Production is managed through Vercel. GitHub ownership is under the **IMVO-SYSTEMS** organization.

A pre-transfer recovery branch is retained for rollback and historical reference.

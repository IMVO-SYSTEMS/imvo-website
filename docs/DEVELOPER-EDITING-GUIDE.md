# IMVO developer editing guide

Use this map for routine website edits.

## Main website
- Homepage layout and fallback wording: `app/HomePageClient.tsx`
- About page: `app/about/AboutPageClient.tsx`
- Services page: `app/services/ServicesPageClient.tsx`
- Contact page: `app/contact/ContactPageClient.tsx`
- Projects fallback data: `app/projects/projectsData.ts`
- Project presentation: `app/projects/`
- Header: `app/components/SiteHeader.tsx`
- Footer: `app/components/SiteFooter.tsx`
- Shared editorial enhancements: `app/components/IMVOEditorialEnhancements.tsx`
- Shared editorial corrections: `app/components/IMVOEditorialCorrections.tsx`

## IMVO Systems
- Main Systems experience: `app/systems/SystemsPageClient.tsx`

## DŌMICILE
- Current public experience: `app/domicile/DomicileEditorial.tsx`
- DŌMICILE styles: `app/domicile/DomicileEditorial.module.css`
- CMS hydration: `app/domicile/DomicileCmsHydratorSafe.tsx`

## CMS
Much of IMVO's public content can also come from Sanity.

- CMS queries and mappings: `sanity/lib/`
- CMS schemas: `sanity/schemaTypes/`
- Migration/seeding utilities: `scripts/`

If wording is controlled by Sanity, changing only the fallback source code may not change the live CMS value.

## Editing in VS Code
Use **Ctrl + Shift + F** and search the exact wording shown on the website.

Do not edit generated folders such as `.next`, `node_modules`, or local Vercel cache files.

Before committing, run:

```bash
npm run lint
npm run build
```

Keep credentials in local/deployment environment variables. Never commit private tokens or secrets.

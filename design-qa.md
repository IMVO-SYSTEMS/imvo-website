# IMVO Systems release design QA

Date: 19 October 2026. Target: the user's approved IMVO Systems preview, based on https://vinova.sg/, integrated at `/systems` in the existing IMVO Group site. Red, white and charcoal; preserve Studio and DŌMICILE.

## Visual comparison

Opened the reference and the production Worker preview in the same browser. Inspected their combined screenshot: [desktop comparison](docs/systems/qa/desktop-comparison.jpg). Both use the wide split hero, Poppins type, restrained grey secondary text, rounded red contact action, full-width technology film, service tabs, presence map, logo rows, testimonial columns, consultation banner, insights and substantial footer. Header height, page gutters, headline scale, film boundary and overall density follow the approved preview.

Intentional adaptations: IMVO Systems wordmark and Kigali copy; actual IMVO team and collaborator photographs/logos; Web/Mobile/Cloud/AI capabilities in place of third-party certifications; published IMVO Group testimonials with explicit Group attribution; IMVO product directions using clearly described temporary illustrative interface imagery; tools grid and IMVO division footer links. No copied claims of delivery, ratings, certifications or overseas offices.

Fonts: local Poppins 300/400/600/700; restrained Roboto Mono labels. Red accent `#e51320`, charcoal text and footer, white sections. Tools use official Simple Icons SVGs. Reference media is local with provenance in `docs/systems/reference-imagery.json`.

## Viewports and interactions

- Desktop: production page inspected at 1363 CSS pixels. No horizontal document overflow or broken loaded images. Tools: All 11, Cloud & delivery 3, restore All 11. Film dialog opens and closes. Service footer `?group=market-expansion` lands at the correct section below the fixed header. Contact `?section=enquiry` lands at the form. Gallery opens, advances 1/3 to 2/3 and closes with Escape. Collaboration dialog opens and links to a correctly scoped enquiry.
- Phone 390: [service page](docs/systems/qa/systems-phone390.jpg). Mobile menu → Services → Digital Experience → Mobile App Development navigates to its native route and closes the drawer. Measured document client/scroll width both 390; no broken loaded images.
- Tablet 768: [long service heading](docs/systems/qa/systems-tablet768.jpg). Heading and image fit; client/scroll width both 768.
- Phone 320: [final contact layout](docs/systems/qa/systems-phone320-final.jpg). Header contact label stays on one line, navigation remains usable, and client/scroll width both 320. Empty enquiry blocks review with six invalid controls. Dummy details successfully review; Edit retains the values. Send was deliberately not exercised, so no test email was delivered.
- Testimonials retain the verified 3-second transition on a 5-second interval, providing about 2 seconds stationary between moves. Manual previous/next, pause/play, hover/focus pause, loop snapping and visibility gating are present. Manual next advances the track. Prior timing trace verified repeated movement and stops; this release preserves that motion code.
- Logo rows have computed normal/reverse directions at 68 seconds. Pause control stops both tracks. Repeated copies are hidden from assistive technology. Reduced-motion CSS and controls are implemented and reviewed; OS-level emulation was not available in this browser.
- The approved preview's service/industry menus, tabs, filters, pagination, article search, process/FAQ, country selector and enquiry download behavior are retained. Additional native route smoke tests cover every published Systems route.

## Verification and corrections

The first automated route check found that a client search-parameter hook inside Suspense omitted content from the initial HTML. Query values now pass from native server pages to the client experience. Both Next.js and Cloudflare production builds, lint, compatibility and the complete HTTP suite pass on commit `7ec1dafdd420fbfaadb1ee42fb3f7d840ecdbf9d` (Actions run `39181511989`). The suite verifies 63 Systems routes, division footer links, six essential media assets, five Group routes and unknown-route 404 behavior. TypeScript passes locally.

Final screenshot review caught a wrapping contact label at 320 pixels. The final CSS reduces the small-screen logo and uses a non-wrapping contact action; the final production build and browser measurements pass. All changes are scoped to Systems except the existing public enquiry identifier shared with Studio and the public CMS request timeout/fallback safeguard.

Console: no application errors in the production preview. Browser extension metadata noise was excluded by its `chrome-extension://` source.

Open P0/P1/P2 design issues: none. Email-delivery success is not claimed as an exercised test; the form uses the existing production service and reports success only after a successful service response. Temporary reference images remain as the user requested.

Final result: passed

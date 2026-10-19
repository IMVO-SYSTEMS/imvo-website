# IMVO Studio architectural canvas — design QA

Date: 19 October 2026. Scope: the complete Studio homepage and shared public Studio frame. The latest brief supersedes the former additive-chapter scope: remove the video hero, carry the Heron architectural direction through the page, and keep original IMVO content and section order.

## Source of visual truth

The live `https://heronaiapp.com/` experience and the user's sequential screenshots are the chosen references. The reference was loaded, allowed to complete delayed effects, and scrolled through its plan assembly. Rejected generated concepts are not implementation targets.

IMVO adopts the architectural sheet, line-to-shade house, square navigation, drafting corners, live annotation boxes, wall/furniture/dimension sequence, lateral reveal, alternating drawing studies and large brand finish. The black default, white option, real studio status, original copy, people, project photography, regional content and inquiry paths are intentional IMVO adaptations. Product claims and orange compliance alerts are not copied into IMVO's content.

## Browser-rendered comparison inputs

Both combined images below were opened and inspected as side-by-side visual inputs:

- `/workspace/scratch/934a30c439ff/canvas-qa/hero-comparison.jpg`: live Heron hero alongside final IMVO white and black renders.
- `/workspace/scratch/934a30c439ff/canvas-qa/plan-comparison.jpg`: live Heron assembled plan alongside IMVO technical and lateral principles stages.

The desktop browser reports 1363 × 936 CSS pixels; individual capture content areas differ slightly with scrollbar handling. Comparison panels uniformly fit each capture without distortion. They check hierarchy, line/image alignment, plan layers and spatial relationships; they are not a claim of a pixel-identical clone. IMVO's longer original headline intentionally wraps differently.

Additional inspected evidence in that folder: `hero-final-black.jpg`, `hero-final-white.jpg`, `plan-final-white.jpg`, `plan-final-black.jpg`, `portfolio.jpg`, `team.jpg`, `mobile-final-360.jpg`, and `wide-final-1920-scaled.jpg`. The last capture displays a real 1920 × 1080 iframe at a fitted review scale; its CSS viewport remains 1920 pixels.

## Findings resolved

1. [P1] The previous page retained its old visual structure with one added chapter. Replaced the full homepage composition while retaining original content queries, section order and CMS visibility controls.
2. [P1] Legacy PNG/JPEG paths relied on imperative photo replacement. Added an explicit mapping to actual existing WebP assets. The rendered-home check validates all 46 local images; browser captures show actual project and team photographs.
3. [P1] Transparent furniture/dimension images require a different filter from white-paper studies. Theme-specific transparent-layer filters now retain the thin details on black and white.
4. [P2] Phone status cards could cover the elevation. The cards now sit below the house. The 360/390 layouts retain visible clock, hours, location and inquiry action without document overflow.
5. [P2] Status styles inherited dark-only metadata colors. Scoped overrides make the real status component readable in both themes. The inquiry label also inherits the inverted hover color.
6. [P2] The DŌMICILE SVG wrapper referenced an external raster which cannot render inside an SVG image. The header now displays the actual raster directly, cropped through CSS and filtered for the selected theme. All three division logos are visible in final captures.
7. [P2] Final plan movement clipped peripheral dimensions and crowded the heading. Reduced lateral travel and widened the heading allowance. Final captures show the complete dimension extent and a clear two-line heading.
8. [P2] Invisible principle controls are inert until their stage; the drawing container uses a group role so interactive markers remain accessible.
9. [P3] Added pause/play to the repeating discipline ticker. Hover/focus pauses it, and reduced motion makes it static.

## Content and fidelity

- Fonts: the existing local Inter family supplies consistent weights; small drafting labels use a scoped monospace token. Original copy remains sentence case with responsive line wrapping.
- Rhythm: fine square frames, large drawings, small captions, boxed status, alternating services, horizontal photography and the final brand sheet form one visual system across the homepage.
- Colors: charcoal/white/gray tokens govern the homepage. Primary and secondary text have readable contrast in both themes; focus outlines remain visible. Original photography reveals color on hover/focus.
- Assets: original project/team photos and existing source vectors are reused at preserved aspect ratios. Temporary public reference studies are labeled illustrative and their origins are listed in `docs/studio-architectural-canvas.md`.
- Content: hero, regional reach, quick look, project intelligence, principles, manifesto/metrics, all 14 curated portfolio projects, work in progress, services, four biographies and CTA remain in order. CMS section controls, team overrides, status schedules and notices remain connected.

## Interactions and responsive checks

- The hero completes without scrolling; Replay is available. There is no video element on the homepage.
- Theme switching and persistence work. Final desktop and phone captures confirm white-theme status metadata.
- The technical stage reaches approximately 69% with walls, furniture and dimensions. The final stage reaches approximately 97%, reveals the original principles, and shifts the plan aside without clipping its peripheral dimensions.
- Plan markers and principle rows reveal the associated original text. Mobile controls select stages directly, and all principle content stays available below the drawing.
- Portfolio Next selects project 02; focusing project 14 reveals CASA SIENA and disables Next at the end. All 14 original projects remain present.
- Regional selection changes the pressed state and country readout (Kenya was activated). The Consultancy study's second marker changes its note to Clear project direction.
- The team accordion reveals the original biography; all four portraits render.
- The phone menu opens with all Studio/division destinations; Escape closes it and restores the trigger. Keyboard focus is visible in both themes.
- Responsive CSS viewports: 360 × 800 (document width 345), 390 × 844 (document width 375), 1920 × 1080 (document width 1905). The difference is the browser scrollbar; none has horizontal document overflow.
- Discuss your project reaches `/contact#quote` and the existing Submit your inquiry form. No test inquiry was sent.
- Browser application errors: zero. Extension-origin messages are excluded.

## Engineering checks and limits

- `npx tsc --noEmit`: passed.
- `npm run build:cloudflare`: passed on the final application source.
- `npm run test:studio`: passed — one H1, no video, four valid section anchors, 46 local image responses and nine navigation destinations.
- Existing `npm run test:systems`: passed — 63 Systems pages, six media assets, division/footer links, five Group routes and 404 handling.
- `git diff --check`: passed.
- Scroll effects use passive listeners, frame-scheduled updates, proximity gating and cleanup. Reduced-motion rules expose complete content and remove pinning and the decorative cursor.

Reduced motion was reviewed in code; this browser does not expose OS motion-preference emulation. Phone layouts were checked in actual CSS-width frames rather than on physical touch hardware. No blanket accessibility certification is claimed. Reference drawings remain temporary illustrative studies as requested. The responsive review harness exists only in local compiled output and is excluded from source and production builds.

final result: passed

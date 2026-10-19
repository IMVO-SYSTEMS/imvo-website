# IMVO Studio homepage design QA

Date: 19 October 2026. Scope: the official Studio homepage `/` in the existing
IMVO Group repository. Source visual truth: https://heronaiapp.com/ and its
captured drawing states. The user's brief preserves IMVO colours and content,
while closely adapting the CAD cursor, drawing assembly, pinned scroll and
sideways movement. Existing Systems and DŌMICILE destinations remain in place.

## Evidence and comparison

Desktop browser viewport: 1363 × 936 CSS pixels; both source and implementation
captures are 1363 × 936 image pixels, density 1. No density resampling was needed
before the combined comparison. Evidence lives in the task QA workspace:

- Source hero: `/workspace/scratch/934a30c439ff/reference/heron-hero.jpg`.
- Source completed plan: `/workspace/scratch/934a30c439ff/reference/heron-plan.jpg`.
- Implementation hero: `/workspace/scratch/934a30c439ff/imvo-hero-final.jpg`.
- Implementation completed plan: `/workspace/scratch/934a30c439ff/imvo-plan-final.jpg`.
- Full-view combined comparison: `/workspace/scratch/934a30c439ff/imvo-desktop-comparison.jpg`.
- Completed-plan combined comparison: `/workspace/scratch/934a30c439ff/imvo-plan-comparison.jpg`.
- Focused header/type comparison: `/workspace/scratch/934a30c439ff/imvo-focused-comparison.jpg`.
- Phone comparison: `/workspace/scratch/934a30c439ff/imvo-mobile-comparison.jpg`.
- Wide implementation: `/workspace/scratch/934a30c439ff/imvo-wide-final.jpg`.
- Horizontal projects: `/workspace/scratch/934a30c439ff/imvo-projects-final.jpg`.

Both full-view and focused comparisons were opened together and inspected.
The hero retains the framed drawing, large house elevation, restrained metadata,
CAD coordinates, split headline/copy band and bordered navigation. Intentional
adaptations: IMVO Studio wordmark, sentence-case IMVO copy, existing monochrome
paper/ink theme, a larger readable headline band, and IMVO division links. The
completed plan is the same source geometry, with IMVO's dark presentation and
right-hand design-process narrative. Original raster bytes and vector paths are
local source assets; no illustrative geometry was approximated.

## Required fidelity surfaces

- Typography: Arial/Helvetica continues the site's neutral sans-serif direction;
  Courier labels provide a compact technical hierarchy. BT Grotesk is not copied.
  Desktop and phone headings wrap intentionally; no clipped navigation labels.
- Spacing/layout: the thin frame, split copy band and generous drawing canvas
  follow the reference. Intentional darker process sheet, clear captions and
  a horizontal IMVO project rail. Header and pinned sheet positions were measured.
- Colours/tokens: existing paper, ink and black palette; no reference orange.
  Drawing layers brightened for contrast against the black process sheet.
  Focus indicators, pressed buttons and expanded panels are visible.
- Image quality: source elevation and all plan layers remain sharp, aligned to
  their original aspect ratios. Existing IMVO projects and team photos are used.
  No broken loaded images. Five known PNG covers use existing WebP equivalents.
- Content: IMVO service descriptions, regional positioning, project collection,
  team and legal destinations are retained through existing data sources.
  Temporary reference illustrations are labelled Drawing study and separated
  from the IMVO portfolio; provenance/replacement points are documented.

## Interactions and responsive verification

- Desktop: elevation progression, CAD crosshair/coordinates, plan assembly,
  furniture and dimension layers, leftward plan transition and caption changes.
  Buttons 03 and 04 select the expected stages; the sheet stays pinned at y=0.
- Project Next moves the rail; observed offset -987.36 px at progress 0.3554.
  A project card opens `/projects/project-02`, headed URBAN VILLA Apartment.
- Service 02 opens with `aria-expanded=true`; scope CTAs lead to `/contact#quote`.
- Phone layouts were rendered inside real 390 × 844 and 320 × 844 iframe
  viewports. Client/scroll widths matched at 375/375 and 305/305 respectively
  (15 px browser scrollbars). No document horizontal overflow. The actual
  device OS and touch input were not emulated.
- Phone menu opens; Escape closes it and restores the toggle. Process stage 03
  becomes pressed and its corresponding caption is shown. The phone project
  rail uses native horizontal overflow with arrow controls.
- Wide desktop: 2048 × 1152 iframe, client/scroll widths 2033/2033; full-view
  screenshot inspected. Header, drawing and headline band fit without clipping.
- Main desktop document widths 1348/1348; no horizontal document overflow.
- Existing `/systems` and `/domicile` pages opened successfully in the same
  Worker preview; DŌMICILE heading: A better view of every property.
- Page console checked: no application errors or warnings. Browser-extension
  metadata errors were excluded as unrelated to the application.
- Reduced-motion styles and event preference handling were reviewed in source;
  OS-level preference emulation was unavailable. Completed drawings and native
  horizontal overflow are the reduced-motion fallback.

## Comparison history and fixes

1. P1: the first hero frame showed sparse unrecognisable line fragments.
   Fixed with a complete underlying drawing and a restrained vector overlay.
   Reopened the final hero and combined comparison: the house is clear at entry.
2. P1: inherited body overflow created a second scroll container, defeating
   sticky sheets. Scoped html/body overflow to clip/visible only when this
   homepage is mounted. Re-tested: process sticky y=0 while stages advance.
3. P2: facade vector/raster overlap was too strong. Reduced and aligned the
   source-vector overlay; inspected the final hero at desktop and phone sizes.
4. P2: the plan's original grey walls were too dim on IMVO black. Brightened
   walls, furniture and dimensions; re-captured the completed plan and compared.
5. P2: Discuss this scope initially led to Services. Corrected to the existing
   project enquiry destination; final rendered link verified in the wide frame.

No actionable P0/P1/P2 findings remain for this approved adaptation.

## Validation and limits

TypeScript and the Cloudflare production build pass for this source. `git diff
--check` passes. The existing 63-route CLI suite was attempted but its separate
Worker could not start in this execution environment (`uv_interface_addresses`);
it is not reported as passing. The primary division routes were checked in the
supervised browser preview. The earlier Systems release report is preserved at
`docs/systems/qa/previous-release-report.md`.

## Follow-up polish

Replace the temporary drawing studies with IMVO-owned elevation and plan layers,
using the documented shared crop and coordinate system. This is the user's
explicitly deferred asset refinement, not a blocking interaction issue.

final result: passed

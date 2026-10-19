# IMVO Studio preservation and drawing integration — design QA

Date: 19 October 2026. Scope: restore the approved IMVO homepage foundation and integrate an additive architectural drawing chapter. This is a review preview, not a replacement visual direction or a production release.

## Source visual truth and scope

- Original IMVO homepage and shared shell: commit `3fa1aadf6a5d2e0b9cac9c1ad6064b03c2140990`.
- Browser-captured original hero: `/workspace/scratch/934a30c439ff/imvo-backbone-hero.jpg`.
- Heron drawing workspace: `https://heronaiapp.com/`; source capture `/workspace/scratch/934a30c439ff/reference/heron-plan.jpg`.
- Source elevation capture: `/workspace/scratch/934a30c439ff/reference/heron-hero.jpg`.
- New chapter uses the original source vector geometry and supplied reference illustration layers. Its visible study label distinguishes those drawings from the actual adjacent IMVO project.

The user's correction is the controlling brief: keep the video hero, live studio status, division logos, rolling header text, photography, content structure and existing behavior. Bring the reference's drafting cursor, assembling floor plan and lateral scroll into that foundation. This is not a pixel clone of Heron's entire homepage.

## Browser-rendered evidence

Primary desktop viewport: 1363 × 936 CSS pixels; captures are 1363 × 936 pixels at density 1. Both source and implementation use this viewport for the full-view comparisons. Browser scrollbar leaves a document content width of 1348px. Comparison sheets fit both captures to identical panels without distorting their aspect ratio; focused crops retain source pixel density.

- Restored original hero: `/workspace/scratch/934a30c439ff/imvo-restored-hero-final.jpg`.
- Matched original/new hero comparison: `/workspace/scratch/934a30c439ff/imvo-preservation-hero-comparison.jpg`.
- Elevation transition after alignment fix: `/workspace/scratch/934a30c439ff/imvo-integrated-elevation-final.jpg`.
- Completed floor plan after final scroll-controller fix: `/workspace/scratch/934a30c439ff/imvo-integrated-plan-final.jpg`.
- First full-view plan comparison: `/workspace/scratch/934a30c439ff/imvo-integration-qa-first.jpg`.
- Final full-view plan comparison: `/workspace/scratch/934a30c439ff/imvo-integration-qa-final.jpg`.
- Focused original/new headers, elevation alignment, dimensions and controls: `/workspace/scratch/934a30c439ff/imvo-integration-focused-final.jpg`.
- Sideways reveal of actual IMVO project photography: `/workspace/scratch/934a30c439ff/imvo-integrated-project-v1.jpg`. The final controller changes the scroll synchronization, not this panel's geometry.
- Final phone layouts: `/workspace/scratch/934a30c439ff/imvo-integrated-mobile-final.jpg`.
- Wide screen review: `/workspace/scratch/934a30c439ff/imvo-integrated-wide-final.jpg`.

Phone iframe CSS viewports: 390 × 844 and 320 × 812; document content widths 375 and 305, respectively. Neither document overflows horizontally. All five controls measure 44 × 44. The smallest phone's final stage was activated and then returned to the technical stage.

Wide iframe CSS viewport: 2048 × 1152; document width and scroll width both 2033. It was displayed at scale 0.55 in the review harness so the full sheet and its controls could be inspected within the cloud browser. The wide evidence is a layout check, not a 1:1 pixel comparison.

## Findings and comparison history

1. [P1, resolved] The previous release replaced the homepage structure and bypassed the shared shell. Restored the exact earlier `app/page.tsx` pipeline and root shell behavior. The original header, division switcher, video, studio signal, photo enhancements, original project rail, portfolio and footer now render. The matched hero comparison confirms the retained composition, type wrapping, CTA, imagery and status position.
2. [P1, resolved] First-pass elevation vectors did not align with the shaded source asset. Aligned the source vector viewport with the illustration canvas and faded the drawing strokes as shading completes. Post-fix elevation and focused crops show continuous floor lines and matching building edges.
3. [P2, resolved] The first plan framing crowded the dimensions against the bottom controls. Reduced the plan's viewport-relative size and separated the footer with the paper surface. The final plan and focused crop show the complete dimension extent above the controls.
4. [P2, resolved] The phone drawing was wide enough to clip peripheral dimensions, and controls risked overlap with the retained DŌMICILE widget. Reduced the phone plan width, kept 44px targets and moved stage controls left. The final 390/320 captures show the complete plan and a reachable fifth control.
5. [P1, resolved] Native stage jumps could be overridden by the existing smooth-scroll inertia. Exposed a stable position function from the existing Lenis provider and used it for stage navigation and continuing through the studio. Final browser checks hold the technical stage at approximately 70% on desktop and the smallest phone after changing direction; the continue link lands at the original approach section with focus and a top offset of 0.375px.
6. [P3, resolved] The initial drawing grid was more prominent than the reference. Reduced its ink contribution to keep the drawings dominant.

## Required fidelity surfaces

- Fonts and typography: existing homepage family, header rolling text, original heading scale, copy wrapping and labels are retained. New chapter display text inherits the site family; small drafting labels use a scoped monospace token. Long project titles wrap on phones. The two hero captures and focused header comparison show no font or hierarchy replacement.
- Spacing and layout rhythm: original homepage sections remain in their original order, with the drawing chapter inserted after principles. The sheet uses a fine frame, large centered drawing and small lower-left caption. Full-view and focused comparisons check the source proportions, completed dimension extent, foot controls and mobile spacing.
- Colors and tokens: the chapter references IMVO's existing paper/ink tokens. The dark cinematic hero, original header treatment, studio signal and dark content sections remain. A paper drawing chapter is the intentional addition. No Heron orange product alerts or unrelated brand palette is introduced.
- Image quality and assets: source vector/raster layers remain original reference geometry/assets rather than approximations. Source illustrations retain transparency. The adjacent project reveal uses actual IMVO project data and cover photography. All five chapter images completed loading with non-zero intrinsic dimensions. Original team photography enhancement remains present.
- Copy and content: existing CMS-backed home content and visibility pipeline is restored. Project intelligence, studio principles, manifesto, metrics, full portfolio, work in progress, services, team and CTA are present. Added captions describe IMVO's process; reference drawings carry an illustrative-study label and do not claim to be the adjacent project.

## Interaction and preservation checks

- Hero video loaded `/hero-1.mp4`, `readyState` 4, `paused` false.
- Live studio signal renders current Kigali time and operating state.
- Exactly one original primary header renders; original division logos and rolling navigation implementation are unchanged.
- Original hero, header, switcher, welcome enhancements, portfolio slider and photo components match their original source. The smooth-scroll provider adds a context API without replacing its animation or route-reset behavior.
- Original project rail Next control remains available and functional.
- Drawing stages move forward and backward; walls, furniture and dimensions build in order; lateral travel reaches -100% at selected work.
- Keyboard traversal from stage controls to the project link reveals its panel. Enter opens `/projects/project-01`; the existing project detail renders the correct title.
- Continue link exits the long drawing sequence, focuses the original approach section and updates the anchor.
- Fine-pointer crosshair and coordinate readout appear only within the drawing sheet. It does not capture pointer events or keyboard focus.
- Browser application errors/warnings: zero. Browser-extension metadata errors were excluded because they do not originate in the application.
- TypeScript: `npx tsc --noEmit` passed.
- Build: `npm run build:cloudflare` passed.
- Patch whitespace: `git diff --check` passed.

## Limits and follow-up polish

The reduced-motion/static version was reviewed in code: it unpins the chapter, exposes complete drawings and explanations, disables obsolete stage navigation and removes image transforms. The cloud browser did not expose OS motion-preference emulation, so that setting was not dynamically exercised. Touch layouts were inspected through real-width browser iframes; physical touchscreen gesture feel is a follow-up check. No blanket accessibility compliance claim is made.

The retained global header may cover the sheet's top annotations while reappearing during reverse scrolling; the drawings and stage controls remain usable. This follows the existing approved header behavior. Source plans remain temporary illustrative studies until replaced with IMVO drawing layers.

## Implementation checklist

- [x] Preserve the approved homepage and its existing content pipeline.
- [x] Add the drawing chapter without new replacement navigation or footer.
- [x] Compare the restored hero and source drawing experience at matched viewports.
- [x] Resolve actionable P1/P2 visual and scrolling issues and recapture the result.
- [x] Verify narrow phones, desktop, wide layout, stage controls, project link and skip path.
- [x] Review cleanup, passive listeners, isolated CSS and reduced-motion fallback.
- [x] Build and check TypeScript successfully.
- [x] Keep this revision as a separate review preview.

final result: passed

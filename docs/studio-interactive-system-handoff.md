# IMVO interactive architectural system — 20 October 2026

## User-approved direction
Continue the deployed architectural canvas, preserving all original content and working integrations. Apply reference typography, interactive drawings, global drafting cursor, centered division marks, an anchored studio status, a tower that fills on scroll, one compact changing service scene, section shortcuts and useful linked annotations. Extend black/white styling through all public page bodies, including division marketing surfaces. The user has authorized completing and publishing the checked work.

## Durable checkpoint
Branch: `feat/studio-interactive-system-20261020`. Base: `e729edad12992163a7f2b6231bedfbbfda1b00f4` (PR #53). This document travels with every checkpoint so another model can continue without reconstructing the approved design.

Implemented so far:
- Actual BT Grotesk regular/medium/semibold/bold and Geist Mono medium, from the reference's observed public font-face rules. Locally hosted under public/fonts/studio; exact CDN sources recorded below.
- Hero percentage and construction line share one progress source; initial automatic build, pointer/keyboard hold to redraw, release to pause, accessible complete button.
- Studio status stays anchored; no dismissal or dragging.
- Shared DrawingInteraction and DrawingExplorer: hover areas, numbered keyboard controls, connected useful notes, actual service links, Escape returns focus, restrained zoom/reset.
- Drawing overlays on hero, main assembling plan, all three intelligence studies and tower.
- ServiceJourney replaces three stacked rows with one 180svh desktop scene, direct accessible stage controls and a compact mobile version.
- Centered division logos including mobile second row, global drafting pointer with trailing line, native cursor fallback for touch/reduced motion, discreet page navigator.
- TypeScript passes at checkpoint.

Additional implementation completed:
- About, Services and all service details, Projects and project details, Contact, Careers and all legal page bodies now consume the shared palette and typography. Section framing, spacing and controls follow the homepage system; old DOM-rewriting enhancement layers are no longer mounted.
- Projects index has an interactive plan-led introduction. Published project plans support location selection, 100–300% zoom, reset and bounded drag; selected drawing links carry the real project title into the Contact brief without inventing room or dimensional data.
- Systems and DŌMICILE marketing pages share the font pair, black/white themes, corner language and global cursor through DivisionFrame. Native navigation, routes, enquiries, review source, carousel behavior, workspace tabs and Android download remain intact.
- Every homepage plan study, including the closing CTA, is interactive. Desktop services occupy 180svh total; mobile offers one scene and direct stage controls.
- Existing Cloudflare compatibility CI now includes the expanded Studio smoke test.

Verification completed locally:
- `npx tsc --noEmit`: passed.
- `npm run build:cloudflare`: passed.
- `npm run test:studio`: passed: one H1, no video hero, live progress markup, non-dismissible status, 4 valid anchors, 45 image assets, 14 themed destinations, actual published plan controls and five valid WOFF2 files.
- `git diff --check`: passed after whitespace cleanup.

Release state as of 20 October 2026:
- PR #54 merged as `af11175fca888281bd1a3bf1a54f530c980b9e5f`; tree `afb309de53189a154051e8aa0ab17c100f808a32`.
- Compatibility run `39340528175`, job `118360635340`: all steps passed, including lint, Next.js build, Cloudflare compatibility/build, 63 Systems routes and the expanded Studio suite.
- Production deployment run `39365056360`, job `118439883115`: success.
- Actual official site verified in the cloud browser: https://www.imvogroup.com/.

Live browser verification completed:
- Hero automatic construction reaches 100%; a 1.2-second hold redraws to 21%, release pauses, a second hold resumes to 42%, and Complete reaches 100%.
- House detail annotation opens with /services/design; Escape dismisses and restores focus; studio status has no dismissal control.
- White/black themes work. Computed hero font is BT Grotesk, 44.1713px at the observed 1363px viewport, matching the reference measurement. Three division marks are centered within the document viewport.
- Section shortcuts work. One 180svh service scene changes to Strategy by native scrolling and to Execution by keyboard controls.
- Assembling plan reaches its technical stage; selectable room note and linked design action work.
- Tower fill changed from 69% to 94% during scrolling.
- Projects index displays its interactive plan introduction. Published project-plan zoom reaches 150%, selection opens its note, and Discuss this drawing transfers the project title to the Contact brief.
- Contact form is present with the expected prefilled brief; it was not submitted.
- Systems and DŌMICILE render in the shared theme; native division menus and the Android download URL remain present. About and Services page-body font/theme coverage and the global drafting cursor were also checked (native cursor computed as none after pointer movement). No horizontal overflow or broken loaded images was observed at the desktop viewport.

Final display corrections on branch `fix/studio-drawing-release-qa-20261020`:
- Invert white-on-alpha /drawings/ project images in the white theme so real plans stay visible.
- Give opened assembling-plan annotations a bounded width, full opacity and exclusive use of the caption area.
- Compact the title-only About introduction so its frame no longer reserves a large empty hero area.

Remaining before final handoff:
1. Pass the existing CI for this narrow correction, merge its exact head and await deployment.
2. Recheck actual plan visibility and annotation/caption separation, return the official URL and leave the live homepage open.
3. Mobile and wide CSS were reviewed, but native responsive browser emulation and the managed control-browser skill are unavailable in this environment. Do not claim a fresh mobile screenshot verification. Existing responsive breakpoints and reduced-motion alternatives are preserved.

## Runtime
- Repository checkout: /workspace/scratch/934a30c439ff/imvo-studio-redesign (may reset; clone remote branch if absent).
- Shell: /bin/bash with login:false.
- npm ci succeeds. Scripts: build:cloudflare, test:studio, test:systems, npx tsc --noEmit.
- Cloudflare builds dist/client + dist/server; preview launcher scripts/preview-cloudflare.mjs.
- Do not rebuild while a compiled preview is running.
- Official root: https://www.imvogroup.com/
- GitHub: IMVO-SYSTEMS/imvo-website; native GitHub blob/tree/commit/ref tools available. Use expected_sha when advancing branch; never overwrite unknown changes.
- app/systems/AGENTS.md requires preserving native routes, enquiry delivery, published reviews and Studio/DŌMICILE links. Latest user explicitly requests shared black/white theme, overriding earlier red visual preference.

## Fonts observed on Heron on 20 October 2026
Base: https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/
- 6a69a764736de82b5ed81ccd_BTGrotesk-Regular.woff2
- 6a69a764e3c7de325a7f0c08_BTGrotesk-Medium.woff2
- 6a69a76433bc3835bce3ed52_BTGrotesk-SemiBold.woff2
- 6a69a764af469793ef4762c6_BTGrotesk-Bold.woff2
- 6a4b5161f0d11f1602cc3c95_GeistMono-Medium.woff2

All interactive studies are illustrative; their annotations describe IMVO services, not statutory findings, surveyed dimensions or claims about specific project drawings.

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
- ServiceJourney replaces three stacked rows with one 235svh desktop scene, direct accessible stage controls and a compact mobile version.
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

Remaining release work:
1. Record Systems route-check result, push the checked source and open PR.
2. Await existing GitHub compatibility/Next build/Cloudflare/route CI before merging the exact head.
3. Await official Cloudflare deployment; verify actual website interactions and both themes in the browser and correct observed issues. Internal managed preview is unavailable because the environment has no control-browser skill; do not claim pre-deployment visual QA.
4. Add final release evidence and update this handoff if further work remains.

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

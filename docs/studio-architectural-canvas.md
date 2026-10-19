# Studio architectural canvas

The current brief replaces the video-led homepage with an architectural drawing experience throughout, retaining IMVO content and its section order. The live Heron site and supplied sequential screenshots are the chosen references. The rejected generated concepts are not implementation targets.

`app/page.tsx` retains the existing CMS content, projects, featured-projects, structured-team and section-visibility queries. The original status component is exported for direct reuse rather than mounting it through a DOM portal. `StudioImage` resolves retired local PNG/JPEG paths to actual WebP files; remote CMS URLs pass through unchanged.

The shared frame provides the original logos, rolling navigation, black default and persistent white theme. Systems, DŌMICILE and CMS routes keep their existing shells. The homepage keeps the original sections, all 14 curated portfolio projects, actual photos, people, biographies and inquiry destinations.

## Motion and accessibility

The hero completes its line/shading reveal without scrolling and provides Replay. The plan assembles walls, furniture and dimensions before sliding aside to reveal the original IMVO principles. Five stage controls support keyboard navigation. Phones use a short timed assembly and direct stage selection with vertically arranged principles. The portfolio supports horizontal travel, previous/next controls, keyboard focus and native mobile swiping.

The drawing cursor is decorative, ignores controls, and is disabled for coarse pointers or reduced motion. Reduced-motion rules remove pinning/animation and expose complete drawings and content. The mobile menu closes with Escape and restores its trigger; hidden sequence controls are inert.

## Asset provenance

Existing `public/studio/*.svg` layers and `app/studio-home/sourceDrawings.ts` retain the previously integrated source geometry. The following public Heron studies are temporary source illustrations reused at the user's explicit request. They are labeled illustrative and do not claim to be IMVO project drawings. Replace them with IMVO exports when available.

- `public/studio/study-elevation.jpg` — https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/6a670fa1cfadff37a55ba10b_8b74c365290a3a568eb43a2526db7de5_Illust%20why%20us%20section%20(1).jpg
- `public/studio/study-office.jpg` — https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/6a6715f67b405f421aeee3d4_1d0ff022380f5c6528ed6d4cd29accf8_Illust%20why%20us%20section.jpg
- `public/studio/study-residential.jpg` — https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/6a672d855c5776ffd13a0b9f_61fddc00f08323cea212d4479c223bf4_Frame%202087327318%20(1).jpg
- `public/studio/study-development.jpg` — https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/6a6731092c23e6c739091db5_43da788ecab201c1c711273e28d8f0b4_Illust%20why%20us%20section.jpg
- `public/studio/study-tower-plan.jpg` — https://cdn.prod.website-files.com/6a4b5161f0d11f1602cc3bbf/6a672d855c5776ffd13a0b9b_660f6807d3ea3c427c195ecf4c16359d_Frame%202087327319%20(1).jpg

## Validation

Run `npx tsc --noEmit`, `npm run build:cloudflare`, `npm run test:studio`, and the existing `npm run test:systems`. The Studio check validates the rendered homepage, one H1, no video element, all section anchors, every local image response, and nine main destinations. Set `IMVO_STUDIO_TEST_ORIGIN` for a running preview or public deployment.

Stop a preview before building into its `dist` tree, then restart it after compilation. Replacing served assets during a build can otherwise produce transient missing-image responses. Contact form submission and division-specific functionality remain existing behavior. No test inquiry is sent by these checks.

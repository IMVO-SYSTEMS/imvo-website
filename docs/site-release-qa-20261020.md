# IMVO website — post-release QA, 20 October 2026

## Protected approved design
- IMVO Studio: architectural canvas, locally hosted BT Grotesk, drawing interactions, uppercase h1/h2, responsive navigation.
- IMVO Systems: its own native red/white/charcoal Poppins/Roboto Mono developer-site styling, independent header.
- DŌMICILE: its own Inter/imperial-blue styling, independent header and copy.
- Do not reintroduce `DivisionFrame` around Systems/DŌMICILE.
- Do not change service enquiries, backend integrations, customer data, CMS entries or Android links as part of cosmetic QA.

## Shipped base release
- PR #56, main commit `9e72d436e4910227e78a672e4e1d26ca3d20a220`.
- Both Cloudflare production deployment and compatibility GitHub Actions completed successfully.
- Cloudflare Worker deployment is serving 100% traffic.

## Live browser checks, after PR #56
Measured using actual Chromium rendering through Cloudflare Browser Rendering:
- Studio at 320px: document scroll width 320px, zero broken loaded images, BT Grotesk heading and uppercase CSS, Studio-specific frame present.
- Studio at 1363px: document scroll width 1363px, zero broken loaded images, uppercase BT Grotesk heading.
- Studio after fonts settle: `BT Grotesk` 400/500/600/700 all loaded, five WOFF2 font resources requested including Geist Mono.
- Systems at 390px: native red contact control, native Systems branding and original Poppins typography visible. (Screenshot reviewed; not a full automated interaction test.)
- DŌMICILE at 390px: document scroll width 390px, zero broken loaded images, `DomicileInter` 40px hero title, no Studio frame.
- Recheck interaction usability and mobile screenshots after future significant UI changes.

## Fresh Lighthouse mobile results — 20 October, live site before targeted follow-up
Workflow: Lighthouse Production Baseline (re-run mobile job, run #39218219030).
| Route | Score | FCP | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 68 | 2921ms | 4923ms | 356ms | 0.010 |
| `/projects` | 81 | 3098ms | 4059ms | 51ms | 0.011 |
| `/contact` | 59 | 2960ms | 8897ms | 392ms | 0.000 |
Lighthouse recommendations: homepage image sizing, server response time and unused JS; Contact unused JS and preconnects. These are lab scores, not guarantees for all users.

## Follow-up QA patch
- Align the Contact client hero image URL, `fetchPriority`, and `sizes` with its server-first-paint image to prevent different responsive image requests during hydration.
- Replace a reserved `module` variable in the live Contact code.
- Escape two apostrophes in retained older DŌMICILE JSX design variants.
- Run CI before merge; retest Lighthouse after deployment to see if actual LCP improves.
- Remaining historical lint issues should be addressed separately with behavioral tests, not blanket suppressions.

## Fonts and permissions
- Uploaded `font.zip` has BTGrotesk Regular, Bold, RegularItalic, and Mono in WOFF2/WOFF/TTF/EOT plus demo and stylesheet.
- It has **no license certificate or distribution permission document**. Do not replace approved website fonts with it or assume ownership of redistribution rights without confirmation.
- Current production uses four local BT Grotesk weights and Geist Mono. These were confirmed loaded in a Chromium browser after font settlement.
- Confirm license for all live fonts directly with the owner/licensor as a separate release requirement.

## Outstanding
1. Verify Contact mobile performance after this follow-up deployment.
2. Track lighthouse homepage images/unused JS if improvements are worth the risk of modifying approved design.
3. Resolve remaining lint debt with independent tests.
4. Verify font web-hosting permissions. Avoid sharing actual font binaries.

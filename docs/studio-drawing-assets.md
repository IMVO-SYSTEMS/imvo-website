# Studio homepage drawing assets

The homepage was adapted from the user-selected Heron reference on 19 October
2026. IMVO's existing paper, ink and black theme, project collection, team,
division destinations and service content remain the basis of the page.

The architectural illustrations and floor-plan study are temporary reference
assets, supplied for this direction by the user. They appear as "Drawing study",
separately from the selected IMVO project portfolio. Replace them with matching
IMVO drawings before treating these specific studies as portfolio projects.

- Source: https://heronaiapp.com/
- Original facade sketch: `6a703ca7b25c47076637c631_4f993b1a199968429382e85294f3e6d1_Full.webp`
- Original facade vectors: the source loading illustration, viewBox `0 0 1712 890`.
- Plan wall vectors: `.home-map-img-svg`, viewBox `0 0 1156 1117`.
- Plan layers: `6a4b5161f0d11f1602cc3c77_kk.png`,
  `6a4b5161f0d11f1602cc3c84_fff.png`,
  `6a4b5161f0d11f1602cc3c5e_Dimensions.png`.
- Exploded tower study: `6a69a23dcc24456128e2afe3_image%20345.avif`.

`public/studio/*.svg` embed the original raster bytes locally so the page has no
runtime dependency on the reference host. `sourceDrawings.ts` contains copied
source geometry, not approximations. Colours are adapted through IMVO tokens.
Replace all plan layers together using the same crop, aspect ratio and coordinate
system. Keep the facade outline and final illustration aligned when replacing.

The scroll engine only schedules work on scroll/resize. Small screens use native
horizontal swiping and a complete plan with selectable process captions. Reduced
motion removes pinned travel and exposes complete drawings immediately. The
homepage bypasses legacy DOM-mutating homepage enhancements in `SiteShell`.
Existing routes continue using their existing shells.

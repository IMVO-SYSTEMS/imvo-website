# IMVO Studio interactive Africa map + approved team portraits (20 October 2026)

## Map implementation
- Design direction: [MapChart Africa](https://www.mapchart.net/africa.html).
- The proprietary MapChart application and HTML/JavaScript are **not copied or embedded**; MapChart's application terms restrict this. Its exported map-image license is distinct from its application code.
- Country borders: public-domain [Natural Earth vector maps](https://github.com/nvkelso/natural-earth-vector), 110m geometry simplified for the existing IMVO architectural SVG. Small island countries use labeled geographic markers at this scale.
- 56 clickable country/territory targets in the built map, including Western Sahara and Somaliland separately as disputed geographical territories. The map is not an authoritative political-boundary reference.
- Controls: select country by clicking its geometry or using a keyboard-accessible select; animated pull-out and travel to the selected country; zoom in/out; return to Kigali. Over 50 named cities with WGS84 coordinates, each selectable from the country panel where available.
- IMVO Studio's true home base: **Kigali, Rwanda**. Highlight the original nine regional-focus countries, but do not claim permanent offices, completed projects, or staff in those places without evidence.
- All map controls are boxed and adapt to mobile, 390px screens, and reduced-motion preference.

## Portrait installation
- Eight **user-approved** portrait files installed to `public/studio-portraits/team{1..4}-{dark,light}.webp` on this branch. The 8 exact files were validated from the approved archive using SHA-256 `059f20189e5fbc55316197e0ff60c8591002428ddb72b3e719a88e044d36bcba`.
- A one-time import workflow downloaded the files from a temporary file staging URL, checked the checksum, imported all eight, and committed them. The workflow was subsequently deleted.
- `StudioPortrait` already supports the theme-appropriate sketch and grayscale photo reveal. The `build-studio-thumbnails` script avoids overwriting approved files.
- Four portraits per desktop row; two per mobile row. IMVO Systems and DŌMICILE remain independent.

## Verification
- Check Next/Cloudflare builds, 63 native Systems routes, Studio regression tests.
- Use browser QA for cities selected from the map, rendering map markers, theme variants on portraits, keyboard focus to photo, and no mobile document overflow.
- Do not claim 100/100 Lighthouse based on responsive or visual checks.

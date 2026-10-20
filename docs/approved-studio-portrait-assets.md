# IMVO Studio — approved portrait assets

The user-approved portrait variants have been optimized from the eight supplied sketches at 760×950 WebP. The paired files are delivered in `IMVO-Studio-Approved-Portraits.zip`, organized under `public/studio-portraits/`.

Mapping is intentional and based on the real staff photos:
- `team1` — Benjamin: black-ink/black background and pencil/white background
- `team2` — Antonella: black-ink/black background and pencil/white background
- `team3` — Prince: black-ink/black background and pencil/white background
- `team4` — Sharon: black-ink/black background and pencil/white background

The `team1-dark.webp` etc. assets must be committed in `public/studio-portraits/` to go live. The site's existing build script writes fallback sketches **only when those files do not exist**; the approved variants take precedence. It must not overwrite these files. On portrait hover or keyboard focus the real staff photograph still replaces the sketch.

The approved images are original IMVO assets supplied by the site owner; never substitute reference-site portraits. The black/white site mode is controlled by the enclosing `StudioFrame` `data-theme`; don't use `prefers-color-scheme` to choose portrait variants.

Other completed constraints remain: exactly four desktop portraits, responsive 2×2 on mobile, Kigali as the atlas base with fly-out/fly-in to the other country selected, boxed structural layout, and explicit drawing detail docks avoiding overlaid content.

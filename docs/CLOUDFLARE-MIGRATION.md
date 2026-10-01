# Cloudflare migration

This branch prepares the IMVO website for an isolated Cloudflare Workers deployment.

- Current production hosting and official domains stay untouched until staging passes.
- Sanity remains the CMS; its public project defaults remain unchanged.
- Cloudflare staging uses Wrangler with `--keep-vars`.
- The production cutover happens only after Studio, Systems, DŌMICILE and the embedded Sanity Studio are verified.

# IMVO Studio CMS — adding projects & managing testimonials

## Login
Open https://www.imvogroup.com/studio — the existing integrated Sanity Studio, not the public Studio homepage.
Editors must sign in with the Sanity project account. If the Studio isn't configured/authorized, stop; do not expose a public unauthenticated editing route.

## Add a project without changing existing work
1. Choose **Projects → Create Project**.
2. Enter the proper title and click **Generate** on the page address/slug. Slugs are public links. Keep them stable after publishing.
3. Choose category (Residential, Commercial, Institutional, Urban, Hospitality), real location, four-digit year, and project summary (30–600 characters).
4. Upload the **Cover image** and an accurate accessible alternate description; this is required. Upload up to 30 gallery photos and up to 12 floor-plan/drawing images. Images can be reordered and cropped within Sanity's image hotspot editor.
5. Optional: add project status, IMVO scope, dimensions/area, timeline milestones and real Map embed URL. Never enter an invented area or project location.
6. Choose **Featured** for homepage eligibility, then **Publish**. A draft is not public. Drag projects into the intended order from the Projects list; a featured project will be included in homepage's first three featured results.
7. Open https://www.imvogroup.com/projects and your published project URL after the website's 300-second content revalidation. If the new project isn't there after several minutes, confirm the published document, slug and cover are valid, and check CMS project connectivity before editing code.

## Testimonials
- Open **Testimonials** in Sanity. Real quotes need an author, quote, optional company/role, and **Active** enabled.
- **Featured** and **Display order** control review ordering; do not create mock reviews, attribution or star ratings.
- The homepage testimonial slider and About page now read the same CMS testimonial records, so new verified feedback appears without a developer code deployment (subject to the 300-second revalidation).
- There is an existing published-review snapshot used as an emergency homepage fallback if the structured testimonial collection has no active reviews. It is never interpreted as new CMS data or new feedback.
- Avoid displaying a testimonial until publication rights and the quote's accuracy have been confirmed.

## Team
- The public Studio team-wide illustration is the owner-approved hand-drawn image at `/studio/team-portrait-drawing-approved.png` in **both** themes, replacing the old group photograph.
- The individual four portrait sketch pairs are already installed and will remain reusable. The **NGUTETE K. Sharon** display spelling is currently enforced in the homepage code while CMS team records are cleaned.
- Future CMS adjustments must retain name/image pairing; update any old person name in the Sanity **Team** collection before dropping the code-level spelling fallback.

## Design and publishing safety
- Site's publicly accessible Studio/Systems/DŌMICILE designs are separate. `/studio` is the admin, not a replacement marketing page.
- Do not upload copyrighted architectural drawings without the right to publish them.
- Before announcing a project, check the cover, images, plan viewer, project metadata, SEO and mobile site display.
- CMS editing changes *content*, not website code, country map geometry, interactive drawing callout positions or Cloudflare Worker configuration.

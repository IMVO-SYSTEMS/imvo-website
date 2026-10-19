# Studio drawing journey

## Overview

An additive architectural drawing chapter between the existing studio principles and architectural approach. It develops an elevation, assembles a floor plan, adds furniture and dimensions, then travels sideways to selected IMVO work.

The existing homepage remains the foundation: video hero, live studio signal, rolling header text, division logo switcher, project rail, project intelligence, principles, manifesto, portfolio, work in progress, services, team, photography enhancements, metrics, contact and footer. The homepage content and visibility controls continue to come from the existing CMS pipeline.

Use this chapter to explain design development. Do not use it as a replacement homepage or treat its illustrative source drawings as an IMVO project submission.

## Tokens and foundations

`StudioDrawingJourney.module.css` scopes visual tokens to the chapter. `--drawing-paper` and `--drawing-ink` reference the established `--paper` and `--ink`. Borders, muted copy and the faint grid derive from those colors. Typography inherits the existing homepage; small drawing annotations use `--drawing-mono`. Spacing, type sizes, target sizes and transition duration use the local `--drawing-*` tokens. The source assets and their provenance are recorded in `studio-drawing-assets.md`.

## Anatomy and variants

- Sheet: framed, full-screen drawing workspace.
- Elevation: original source vector geometry followed by the shaded source illustration. The vector viewport aligns the source loader geometry with the illustration canvas.
- Plan: thirteen original source wall parts, furniture layer and dimension layer.
- Project panel: a genuine IMVO project cover, title, location, category and working detail link.
- Caption: compact current-stage description at the lower left.
- Stage controls: five labeled native buttons with selected state.
- Cursor: non-interactive crosshair guides and coordinates for fine mouse pointers.
- Static version: completed drawings, project image and all explanations in normal document flow, used before enhancement and for reduced motion.

Props: `projects?: Project[]`. The first project with a cover is used; an empty collection falls back to the existing `PROJECTS` source. No new data service is introduced.

Desktop uses a sticky sheet and continuous vertical-to-horizontal travel. At widths up to 760px, the illustration fits the screen width, captions sit below the plan and controls remain reachable. The actual header and photo components retain their existing responsive behavior.

## States and interactions

| State | Behavior |
| --- | --- |
| Default | Server-rendered, complete drawing content is available before enhancement. |
| Active scroll | Drawing progress is derived from the section position, in both scroll directions. |
| Hover | The mouse crosshair shows coordinates; links and buttons change contrast. |
| Focus | Visible outline; the project link brings its horizontal panel into view. |
| Pressed | A native stage button jumps to its corresponding point and exposes `aria-pressed`. |
| Reduced motion | Unpinned completed drawings and explanatory copy; stage navigation is disabled because no scroll animation is needed. |
| Empty projects | Uses the established fallback project collection. |
| Loading | The source vectors remain available while lazy images load. No task submission is involved. |
| Data error | Uses the existing homepage data fallbacks. There is no new form or independent API error state. |

Tab reaches the continue link, project link and stage buttons. Enter or Space activates the buttons. The continue link skips the long drawing sequence and lands at the original architectural approach. Ordinary scrolling, wheel and touch gestures retain native document control. No scroll lock or pointer capture is used.

Observers, scroll listeners and animation frames are cleaned up on unmount. Work runs only while the chapter is near the viewport. Scroll updates use CSS properties; React state changes only when the explanatory stage changes.

Stage navigation and the continue link use the existing smooth-scroll provider through `useStudioScroll`. The provider synchronizes immediate jumps with its Lenis instance, preventing a pending smooth scroll from overriding the chosen stage. The provider's normal scrolling behavior and route-reset behavior remain intact.

## Accessibility

The section has a heading and accessible name. The two drawings have descriptive image roles; decorative vector and image layers are hidden from assistive technology. Actual project photography retains its alt text. The cursor is decorative and never receives focus. Button labels describe their stages, and selected state is exposed through `aria-pressed`; ordinary scrolling does not cause repeated live-region announcements. Controls retain visible focus and sufficient hit areas. No interactive elements are nested.

Pass criteria: heading and section are named, all links resolve, all stages are reachable by keyboard, the skip link leaves the sequence, reduced-motion rendering exposes the complete content, and no control is hidden by horizontal travel.

## Content guidelines

Keep stage labels short and explanations to one sentence. Preserve actual IMVO titles and project metadata. Allow long project names to wrap. Keep the small “Illustrative drawing study” label visible so reference drawings cannot be confused with the adjacent IMVO project.

## Anti-patterns

- Replacing the video hero or original navigation with this sheet loses the approved homepage identity.
- Replacing the full portfolio with the single reveal project removes useful existing content.
- Presenting the reference plan as the drawing for the adjacent IMVO project misrepresents the illustrative material.
- Adding `overflow: hidden` to a parent scroll container breaks the sticky drawing sequence. Use clipping that preserves document scrolling.
- Animating the whole page when reduced motion is requested defeats the static reading path.

## QA checklist

- Confirm the original hero video, studio signal, navigation roll and division logos.
- Compare original photo treatments, portfolio, services, team and footer.
- Check outline, wall assembly, furniture, dimensions and sideways reveal in both directions.
- Check stage controls, project link, skip link and keyboard focus.
- Check narrow phones, desktop and a wide viewport for overflow and overlap.
- Inspect static fallback and reduced-motion implementation.
- Check the build, TypeScript and browser errors before handoff.

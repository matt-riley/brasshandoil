# 2026-05-31 Mouse Census

## Concept

A night-field plague survey from "Field Station 7" that weaponises the
computer-mouse / rodent-mouse pun: every sweep of your cursor breeds more
literal mice across a moonlit wheat field. The satire is the observer effect of
plague bureaucracy — the act of *surveying* the population is what makes it
explode, and the official "Deploy Mitigation" button only doubles the swarm.
Seeded by the BBC story on Australia's farmland mouse plague.

## Test Plan

- Confirm the experiment page exists.
- Confirm a `#census-canvas` stage with a 2D drawing context.
- Confirm pointer/mouse movement breeds/spawns mice.
- Confirm the swarm animates with `requestAnimationFrame` and ellipse/arc drawing.
- Confirm live readouts (`#mouse-count`, `#status-line`, `aria-live`).
- Confirm a mitigation control that makes the plague worse.
- Confirm rural census/plague framing with no API names in user copy.
- Confirm the experiments index lists the page.

## What Shipped

- A full-canvas spectacle at `/experiments/mouse-census`: a receding wheat field
  lit by a warm station lamp, with a capped swarm (1,100 max) of scurrying mice
  that crowd toward and jostle away from the cursor.
- Breeding scales with survey speed; "mice per hectare" readout, worsening
  containment status, a critical-state pulse, and a `document.title` plague counter.
- "Deploy Mitigation" surges/doubles the swarm with sardonic departmental lines;
  "Order Official Recount" resets to the approved baseline (never zero).
- Structural tests in `clients/web/tests/mouse-census.test.mjs` (8) and a browser
  smoke spec in `clients/web/tests/e2e/mouse-census.spec.js` (3, all green).

## Feedback To Carry Forward

- Awaiting first review.
- Self-check: this rotates away from the over-used "Bureau" wrapper into a
  rural/agricultural motif while keeping a sharp institutional joke, addressing
  the Oil Telegraph note about narrative-wrapper fatigue.

## Skills Or Patterns Learned

- A literal browser-object pun (mouse → mouse) is a strong satirical engine: the
  interaction *is* the joke, so the satire survives with almost no explanatory text.
- Canvas swarms keep mobile performance acceptable when the actor count is hard-capped
  and per-mouse drawing stays to a few primitives — promoted to `news-to-satire-pun.md`.
- TS narrowing of `document.querySelector` results is lost inside nested closures; alias
  the guarded node to a fresh `const` before the animation loop captures it.

## Next Sparks

- A faint cheese-wedge "bait" the cursor can drop, which (of course) breeds faster.
- An audio layer of tiny scurries that rises with population — only if it stays subtle.

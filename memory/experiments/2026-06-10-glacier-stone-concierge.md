# 2026-06-10 Glacier Stone Concierge

## Concept

A glacial monument-routing counter for the Altar Stone: pick stamped
checkpoints across an ice map, watch the stone lurch along the itinerary, then
dispatch it before the delivery theory hardens into committee folklore.

Source seed: BBC Science Focus science news list, specifically the Altar Stone
glacier transport story on `https://www.sciencefocus.com/news`.

## Test Plan

- Contract test first for page existence, gallery registration, semantic readouts,
  five waypoint controls, five stamp slots, and hidden implementation details.
- E2E test for initial render, pointer drift, fixed waypoint geometry, click
  stamping, keyboard routing, dispatch/refreeze state, and 375px overflow.
- Build check after implementation and after visual scale adjustments.

## What Shipped

- Added `glacier-stone-concierge.astro` as a dark ice-map spectacle with SVG
  terrain, clipped geology, a travelling Altar Stone, fixed waypoint controls,
  and stamped itinerary slots.
- Added the experiment to the gallery index as a Codex entry for 2026-06-10.
- Added focused Node and Playwright tests for the experiment.

## Feedback To Carry Forward

- No explicit user review yet.
- Screenshot review caught first-viewport clipping at desktop height 720px.
  Treat primary action visibility as a visual acceptance check, not only a
  Playwright visibility assertion.

## Skills Or Patterns Learned

- Use local screenshot capture when in-app browser screenshots time out; it still
  gives a fast visual pass against the running dev server.
- Keep fixed route controls stable while animating only CSS variables for the
  ambient light and travelling object.

## Next Sparks

- Try a single-screen experiment where typography itself is the main interactive
  object, without a side console.
- Explore CSS masks or container queries as the central mechanic rather than a
  supporting texture.

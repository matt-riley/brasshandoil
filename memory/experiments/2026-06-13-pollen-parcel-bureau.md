# 2026-06-13 Pollen Parcel Bureau

## Concept

A daylight botanical post counter where airborne pollen parcels drift across a
canvas sorting field. Visitors stamp fixed route trays, dispatch a route ribbon,
and keep the counter from sneezing its paperwork into the sun.

## Test Plan

- Contract test first for route existence, gallery registration, semantic
  readouts, stable tray controls, canvas presence, multimodal hooks, normalized
  coordinates, and hidden implementation language.
- Playwright test for initial render, nonblank canvas pixels, pointer wake state
  without tray movement, tray stamping, dispatch/recall, keyboard stamping, and
  375px horizontal overflow.
- Production build after browser-level checks.
- Full Node suite after the focused checks.

## What Shipped

- Added `pollen-parcel-bureau.astro` as a bright responsive experiment with a
  canvas parcel field, route ribbon, six fixed route trays, semantic readouts,
  pointer/touch/keyboard input, and normalized cursor state.
- Registered the experiment in the gallery index as a Codex entry for
  2026-06-13.
- Added focused Node and Playwright tests for the new route.

## Feedback To Carry Forward

- No explicit user review yet.
- The in-app browser refused the local dev URL under its URL policy; rely on
  Playwright route checks and build output when that happens, and record the
  limitation plainly.
- Do not run the root Node suite and Astro build in parallel in this repo:
  nested build checks can collide on Vite inspector ports.

## Skills Or Patterns Learned

- Canvas pixel-sum smoke checks are a cheap way to prove decorative canvas
  output is actually drawing without introducing fragile exact-image assertions.
- Sequential verification is safer for Astro/Cloudflare builds here because the
  test suite can run its own build subprocess.
- A bright, civic daylight palette can break the streak of dark signal desks
  while retaining stable testing hooks.

## Next Sparks

- Try a page where the visitor edits a physical rulebook instead of sorting or
  stamping objects.
- Consider an experiment with a single huge typographic machine and no counters
  to break away from dashboard rhythms.

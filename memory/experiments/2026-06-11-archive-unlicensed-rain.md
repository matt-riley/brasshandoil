# 2026-06-11 Archive of Unlicensed Rain

## Concept

A municipal weather archive where individual raindrops queue for paperwork.
Select a drop, stamp its permit, and watch the storm debt climb while the desk
tries to make precipitation administratively compliant.

## Test Plan

- Contract test first for page existence, gallery registration, semantic
  counters, drop controls, permit slips, multimodal interaction hooks, and
  hidden implementation language.
- E2E test for initial render, pointer wake state, stable drop geometry,
  click-and-stamp state, keyboard selection, reset behavior, and 375px overflow.
- Production build after the focused tests.

## What Shipped

- Added `archive-unlicensed-rain.astro` as a responsive weather-clerk desk with
  animated rain, seven drop controls, a central stamp pad, and matching permit
  slips.
- Added the experiment to the gallery index as a Codex entry for 2026-06-11.
- Added focused Node and Playwright tests for the new route.

## Feedback To Carry Forward

- No explicit user review yet.
- Focused E2E caught a transform regression: a shared hover rule replaced the
  drop button's base transform and made normal clicks miss the intended target.

## Skills Or Patterns Learned

- Keep hit-target transforms complete across base, hover, selected, and active
  states; partial hover transforms can erase positioning transforms.
- Attribute checks such as `data-licensed` and `data-stamped` make whimsical
  visual state testable without tying tests to animation timing.

## Next Sparks

- Try an experiment where the main controls are stamps, seals, or embossers that
  leave lasting marks on the scene.
- Explore a single-screen archive where rain is sorted by sound rather than by
  labels.

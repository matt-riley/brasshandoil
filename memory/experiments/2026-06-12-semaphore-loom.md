# 2026-06-12 Semaphore Loom for Stray Colors

## Concept

A roof-station signal loom where stray colors become a broadcast phrase.
Visitors strike color keys to light matching threads, build a phrase ribbon,
and send the signal before the night misaddresses every hue.

## Test Plan

- Contract test first for page existence, gallery registration, semantic
  readouts, color key controls, visible signal threads, multimodal hooks, and
  hidden implementation language.
- E2E test for initial render, pointer wake state, stable key geometry,
  click-to-weave state, keyboard weaving, broadcast/reset, and 375px overflow.
- Visual smoke screenshot after green tests to catch composition issues that
  semantic state checks miss.
- Production build and full Node suite after final polish.

## What Shipped

- Added `semaphore-loom.astro` as a responsive color-signal rig with six stable
  keys, animated light threads, a central mast, phrase ribbon, and live readouts.
- Added the experiment to the gallery index as a Codex entry for 2026-06-12.
- Added focused Node and Playwright tests for the new route.

## Feedback To Carry Forward

- No explicit user review yet.
- Visual smoke caught polish that tests did not: headline clearance was too
  tight and idle resonance was drifting above zero before interaction.

## Skills Or Patterns Learned

- Gate animated readouts behind explicit awake or active state so initial UI
  contracts stay truthful and less flaky.
- Screenshots remain useful after green semantic tests; they catch composition
  and proximity defects that DOM assertions intentionally ignore.

## Next Sparks

- Explore a page where signals are composed by cutting or splicing ribbons
  instead of pressing keys.
- Try a bright daylight experiment next to avoid overusing nocturnal control
  rooms and dark signal palettes.

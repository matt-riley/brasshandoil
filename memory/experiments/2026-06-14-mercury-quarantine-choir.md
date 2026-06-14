# 2026-06-14 Mercury Quarantine Choir

## Concept

A sealed metallurgical recital desk where mercury droplets bead across a
canvas retort and get quarantined into fixed tone wells. The scene leans into
silver laboratory hardware, colored assay wells, vapor readouts, and a choir
that becomes more official as it gets less sensible.

## Test Plan

- Added a Node contract first for the Astro page, index entry, semantic
  readouts, tone well controls, canvas, and multimodal interaction hooks.
- Added a Playwright spec before implementation covering initial render, drawn
  canvas alpha, pointer wake state, fixed well geometry, well clicks, keyboard
  digits and arrows, sealing and venting, and mobile overflow.

## What Shipped

- `clients/web/src/pages/experiments/mercury-quarantine-choir.astro`
  with an animated mercury droplet canvas, retort geometry, fixed tone wells,
  normalized cursor tracking, touch support, keyboard digit shortcuts, and
  observable `data-sealed` state.
- Experiments index entry for `mercury-quarantine-choir`.
- Targeted Node and Playwright tests plus a full root Node suite/build pass.

## Feedback To Carry Forward

- Awaiting review.
- The in-app browser's page evaluation can read DOM and overflow reliably, but
  the full canvas pixel assertion should stay in Playwright where real canvas
  APIs are available.

## Skills Or Patterns Learned

- Use `script is:inline` for one-off plain browser JavaScript experiments when
  Astro's processed-script TypeScript checks add noisy DOM narrowing work.
- Keep a separate production build in the verification loop; the contract and
  E2E tests can pass while Astro check still catches build-only diagnostics.

## Next Sparks

- A chromatograph that prints fake alibis in colored vapor bands.
- A pressure-sealed glass harmonica that only plays after every label is wrong.

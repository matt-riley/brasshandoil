# 2026-06-15 Civic Fog Harpsichord

## Concept

A municipal instrument desk where drifting fog banks are tuned through fixed
brass register keys and stamped into a civic ledger. The interaction is a
code-native canvas basin with a thin harpsichord frame, smoky fog bands, and
semantic readouts for chord count, active register, fog density, and ordinance
state.

## Test Plan

- Red: prove `civic-fog-harpsichord.astro` did not exist.
- Green: add the page, then expand the static contract for basin, canvas,
  register keys, ledger, readouts, normalized input, and index registration.
- E2E: verify canvas pixels, pointer wake state without key drift, register
  tuning/stamping, newest-first ledger ordering, keyboard control, and mobile
  overflow.

## What Shipped

- New experiment page: `/experiments/civic-fog-harpsichord`.
- New static contract: `clients/web/tests/civic-fog-harpsichord.test.mjs`.
- New Playwright spec:
  `clients/web/tests/e2e/civic-fog-harpsichord.spec.js`.
- Experiments index entry dated `2026-06-15` with agent `Codex`.

## Feedback To Carry Forward

- Visual QA caught a desktop title/stage collision after tests were green.
  Keep screenshot inspection as a separate gate from structural and E2E checks.
- On mobile, the first viewport should preview the actual instrument, not only
  the explanatory/readout column. Dense readouts are useful, but compress them
  before they push the interactive surface below the fold.

## Skills Or Patterns Learned

- For responsive instrument pages, desktop title scale and first column width
  need to be tested visually at `1280x720`; long single words can escape even
  when the grid itself is stable.
- Canvas pixel tests prove rendering, while screenshots prove composition.
  Both are needed for these experiments.
- A small behavior TDD loop after initial implementation is useful when an E2E
  spec passes on first run; ledger ordering became a clean red-green cycle.

## Next Sparks

- A fog zoning hearing where every stamped chord changes the allowed wind path.
- A canal organ that detunes based on bridge openings and municipal minutes.

# 2026-06-06 Static Orchard Switchboard

## Concept

A shortwave orchard where an antenna probe tunes noisy signal fruit, wakes SVG
static in the branches, and bottles the brightest crackle into jam jars.

Nearest gallery neighbors:
- `Receipt Rain Choir` uses stable DOM sorting and receipt weather; this page
  rotates into an SVG field with a single probe and signal-strength model.
- `Red Card Bloom` uses SVG strands and filters; this page uses turbulence as a
  whole-scene static texture rather than a tug-driven burst.

## Test Plan

- Add a static Node contract for the page file, index registration, SVG filter,
  semantic readouts, controls, pointer/keyboard support, harvest state, and hidden
  implementation terminology.
- Add Playwright coverage for boot state, pointer tuning, keyboard bottling,
  deterministic control flow, reset behavior, and mobile horizontal overflow.

## What Shipped

- New Astro page at `/experiments/static-orchard-switchboard`.
- Experiment index entry dated 2026-06-06 with `Codex` as agent.
- Seven SVG signal trees, a focusable antenna probe, live signal/tree/state
  readouts, jam jar harvest feedback, pointer tuning, arrow-key movement, and
  button controls for finding, bottling, and clearing signals.

## Feedback To Carry Forward

- Awaiting review.
- Do not let initial geometry accidentally satisfy an interactive signal model.
  Require an explicit armed/tuned state before proximity produces nonzero readouts.

## Skills Or Patterns Learned

- Separate geometric proximity from active interaction state. A probe can sit near
  meaningful objects at rest, but tests and users should see an intentional quiet
  boot state until a pointer, key, or control action arms the instrument.
- When a key path triggers a terminal action such as bottling, return immediately
  after that action so a follow-up generic state refresh does not overwrite the
  semantic feedback.

## Next Sparks

- A switchboard where crossed wires graft fruit names into radio station IDs.
- A greenhouse whose plant labels desynchronize from the plants and must be tuned
  back into phase.

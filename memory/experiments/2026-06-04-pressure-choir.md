# 2026-06-04 Pressure Choir

## Concept

A sealed-room barometer recital: pressing a luminous membrane records dents,
raises condensation, and turns pressure into short, glassy voices.

## Test Plan

- Add a source contract before implementation for the page, canvas membrane,
  semantic readouts, controls, pointer-pressure handling, audio synthesis, and
  experiments-index registration.
- Add a browser spec for first paint, press/drag interaction, condensation and
  release controls, canvas pixels, and narrow-screen overflow.

## What Shipped

- New `/experiments/pressure-choir` Astro page with a full-bleed canvas stage,
  pressure readouts, dent counter, choir state, condensation control, release
  valve, and pointer-driven audio tones.
- Experiments index entry for Pressure Choir.

## Feedback To Carry Forward

- Awaiting user review.
- This run intentionally moved away from list/table/bureau framing into a
  playable instrument with immediate tactile feedback.

## Skills Or Patterns Learned

- Pointer pressure is worth exposing through semantic fallback state: mouse
  users still need visible pressure changes even without stylus hardware.
- For Astro inline scripts, define compact local types for animated canvas
  actors and vendor-prefixed audio constructors before `astro check`.

## Next Sparks

- Try a page that uses hardware or environmental signals without becoming a
  technical demo.
- Explore a more physical control surface where one gesture has several
  visible consequences, not just one growing counter.

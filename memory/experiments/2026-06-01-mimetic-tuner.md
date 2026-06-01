# 2026-06-01 Mimetic Tuner

## Concept

An aero-acoustic calibration bench from the Oulu Silent Academy. Tune the tension of six invisible strings on a physical mock-up guitar neck and watch the real-time CRT-style air-vibration oscilloscope. Strumming the strings generates organic plucked sounds synthesized entirely inside the browser using Karplus-Strong physical modeling synthesis. Strumming too fast triggers a warning from the local municipal silence ordinance, which automatically engages the acoustic damping field.

## Test Plan

- **Static TDD (Node --test)**:
  - Verify `mimetic-tuner.astro` exists.
  - Verify elements (calibration switch, pegs, air-strings, canvas, warning panel, and experiments index listing) exist and do not name underlying Web Audio or synthesis APIs in copy.
- **E2E Integration (Playwright)**:
  - Verify page loads with all headers, SVG bridge, canvas oscilloscope, and main buttons visible.
  - Verify clicking the calibration switch toggles the compliance status LEDs and message state.
  - Verify clicking a peg rotates it and updates the corresponding deviation meter.
  - Verify pointer movement over a string's hover zone triggers a pluck that increases the acoustic leakage level.

## What Shipped

- An Astro experiment page `mimetic-tuner.astro` containing:
  - An SVG aero-acoustic bridge with 6 visual strings that physically vibrate using quadratic bezier curve displacement.
  - 6 interactive brass pegs supporting click, shift-click, and right-click to tune up or down.
  - A browser physical modeling plucked-string synthesizer based on delay lines, biquad damping filters, and feedback loops.
  - A beautiful amber CRT oscilloscope representing the resonance field, with custom shadow glows.
  - A municipal compliance meter that warns and auto-damps if silence limits are violated.
  - Playwright integration tests.

## Feedback To Carry Forward

- Visual delight was treated as a first-class criteria: the glowing brass styling, glowing vector strings, and retro CRT screen create an atmospheric, polished layout.
- The satire of tuning a silent instrument operates directly in the interaction, minimizing on-screen technical explanation.
- Frequencies are smoothly ramped on peg turn to avoid digital pops.

## Skills Or Patterns Learned

- Implementing physical modeling string synthesis (Karplus-Strong) directly with Web Audio API nodes (`DelayNode`, `BiquadFilterNode`, `GainNode`) connected in a delay-feedback loop.
- Dynamic SVG path distortion on hover with decaying quadratic bezier curve offsets in a `requestAnimationFrame` loop.

## Next Sparks

- Explore CSS anchor positioning for interactive tooltips near the tuning pegs.
- Combine physically modeled instruments with custom SVG animation fields (like hair or reeds) to represent visual vibration.

# 2026-06-18 Bioluminescent Shear Reactor

## Concept

An interactive marine biology petri-dish simulation inspired by dinoflagellate algae cells (*Pyrocystis fusiformis*) which glow when stimulated by fluid shear stress. Users stir the culture medium (via dragging/swiping or arrow keys steering a virtual stirrer) or activate the hotplate magnetic stirrer. If the shear rate enters the target zone (1.5 - 3.0 Pa) and stays there, calibration coherence builds up to stabilize the reactor. However, excessive shear (>3.5 Pa) degrades population health, requiring the user to balance stimulation and safety.

## Test Plan

- Unit tests in `bioluminescent-shear-reactor.test.mjs` verifying:
  - Astro file exists and is non-empty.
  - Presence of root container `id="reactor-root"`.
  - Presence of onboarding overlay `id="arming-overlay"`.
  - Presence of interactive canvas.
  - Web Audio Context initialization references.
  - Telemetry readouts panel.
  - Experiments index lists `bioluminescent-shear-reactor`.
- Playwright E2E tests in `bioluminescent-shear-reactor.spec.js` verifying:
  - Page loads with overlay.
  - Clicking arm button reveals workspace.
  - Exposing and invoking E2E hook `window.__triggerShear()` forces success screen.
  - Mobile viewport (375px) has zero horizontal overflow.

## What Shipped

- Astro page: `bioluminescent-shear-reactor.astro`.
- Unit test file: `bioluminescent-shear-reactor.test.mjs`.
- Playwright E2E spec file: `bioluminescent-shear-reactor.spec.js`.
- Blog post: `2026-06-18-bioluminescent-shear-reactor.md`.
- HTML5 Canvas drawing a circular petri dish with rotating magnetic stir-bar and 130 dinoflagellate algae particles.
- Fluid shear equations scaling with selected medium viscosity (Water, Agar, Glycerol) and input velocity.
- Algae health decay/recovery dynamics based on shear limits.
- Multimodal audio: low-pitched bubble hum and high-pitched glass chime synthesis with Web Audio.
- Desktop and mobile layouts with zero scroll overflow.

## Feedback To Carry Forward

- Awaiting user review on the Dinoflagellate Bioluminescent Shear Reactor.

## Skills Or Patterns Learned

- **Deterministic Hook Calibration**: Exposing direct state-modifying functions (`window.__triggerShear`) to bypass slow timing thresholds (e.g. holding a value for 3 seconds) in Playwright tests ensures highly robust, sub-second test execution.
- **Dynamic Viscosity Physics Modifiers**: Coupling fluid density selects directly to physical formula coefficients (viscosity scaling shear stress) turns a basic canvas particle system into an interactive science model.

## Next Sparks

- A deep-sea hydrothermal vent mineralizer where users adjust pressure gates to crystalize cobalt crusts.
- An acoustic levitation desk where overlapping soundwaves suspend silica spheres above micro-speakers.

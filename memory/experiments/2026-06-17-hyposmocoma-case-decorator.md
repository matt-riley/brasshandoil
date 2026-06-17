# 2026-06-17 Hyposmocoma Case Decorator (Oahu Web Camouflage Atelier)

## Concept

An interactive Hawaiian spider web simulation inspired by the newly discovered carnivorous caterpillar *Hyposmocoma* that harvests insect remains to camouflage its silken case. The user navigates a delicate web to harvest trapped fly wings, ant heads, and weevil legs without causing high physical vibrations that trigger the resident spider. Once collected, they calibrate their silken case segments (top, mid, bottom) to match the spider's blindness expectations, enabling them to slip past the resident spider.

## Test Plan

- Unit tests in `hyposmocoma-case-decorator.test.mjs` verifying:
  - File exists and is non-empty.
  - Presence of root container `id="case-decorator-root"`.
  - Presence of arming overlay `id="arming-overlay"`.
  - Canvas elements for the spider web.
  - AudioContext initialization.
  - Camouflage calibration panel presence.
  - Experiments index contains reference to `hyposmocoma-case-decorator`.
- Playwright E2E tests in `hyposmocoma-case-decorator.spec.js` verifying:
  - Page loads with overlay.
  - Clicking the arm button boots the workspace and shows the stage.
  - E2E test-helper `window.__revealAll()` unlocks calibration selects.
  - Selecting correct camouflage parameters enables the "Execute Slip-Past Walk" button.
  - Clicking release reveals the success overlay.
  - Mobile viewport (375px) has zero horizontal overflow.

## What Shipped

- An Astro page: `hyposmocoma-case-decorator.astro`.
- A unit test file: `hyposmocoma-case-decorator.test.mjs`.
- An E2E test file: `hyposmocoma-case-decorator.spec.js`.
- An interactive canvas drawing a mathematical spider web (concentric circles, radiating rays) with physics-based string vibrations that decay over time.
- A relative coordinate pluck mechanic that increments "Spider Alertness" based on movement velocity.
- Web Audio synthesis: low ambient sine hum modulated by a slow LFO to mimic forest winds, high triangle/sawtooth pluck chimes with fast exponential decay for string vibrations, and successful escape chimes.
- Mobile responsiveness adjustments: scrollable overlay content container for small screens.

## Feedback To Carry Forward

- Awaiting user feedback on the Oahu Web Camouflage Atelier.

## Skills Or Patterns Learned

- **Physics-Damped Thread Vibrations**: Simulated silk thread vibrations using decaying amplitude vectors linked to rendering line widths.
- **Scrollable Overlay Mobile Safety**: Prevented Playwright scrolling failure on narrow viewports by adding `overflow-y: auto` and margins to fixed overlays, scaling down element spacing to ensure click actionability.

## Next Sparks

- A lava tube geothermal heat exchanger simulator where users steer vents to balance turbine load.
- A bioluminescent algae petri-dish culture terminal with fluid flow stirrers and light pulse chimes.

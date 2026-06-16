# 2026-06-16 Gladiator Tag Rubbing (Tessera Gladiatoria)

## Concept

An interactive archaeological cleaning and decryption desk inspired by the recent HS2 excavation discovery of a possible Roman gladiator's bone tag (tessera gladiatoria). Users scrub away mud from the four faces of a pseudo-3D rotating bone prism to reveal carved Latin inscriptions, translate them using a decryption terminal, and release the gladiator to prod (satirizing the gig economy as gladiatorial combat).

## Test Plan

- Unit tests in `gladiator-tag-rubbing.test.mjs` verifying:
  - File exists and is non-empty.
  - Presence of root container `id="gladiator-tag-root"`.
  - Presence of arming overlay `id="arming-overlay"`.
  - Canvas elements for mud scratching.
  - AudioContext initialization.
  - Decryption/decoder panel presence.
  - Experiments index contains reference to `gladiator-tag-rubbing`.
- Playwright E2E tests in `gladiator-tag-rubbing.spec.js` verifying:
  - Page loads with overlay.
  - Clicking the arm button boots the workspace and shows the stage.
  - E2E test-helper `window.__revealAll()` unlocks translation selects.
  - Selecting correct translation parameters enables the "Release to Prod" button.
  - Clicking release reveals the success overlay.
  - Mobile viewport (375px) has zero horizontal overflow.

## What Shipped

- An Astro page: `gladiator-tag-rubbing.astro`.
- A unit test file: `gladiator-tag-rubbing.test.mjs`.
- An E2E test file: `gladiator-tag-rubbing.spec.js`.
- A dual-canvas scratching mechanic: draws a bone/inscription base layer and composites a mud/speckle overlay cleared using `destination-out`.
- A CSS 3D card rotation: simulates rotating a 3D bone prism when shifting between faces.
- Web Audio synthesizer: low-frequency ambient rumble detuned triangle drone, gravelly scratching sound (bandpass-filtered white noise modulated by velocity), and pentatonic chime chord sweeps upon face completion.
- Satirical Decryption Console: lets users translate the Latin characters to software jokes (e.g. `SUBA.GENTVS` &rarr; Subagent/Intern, `DEEP.MINDVS` &rarr; DeepMind/Management, etc.).

## Feedback To Carry Forward

- Awaiting user review of the Tessera Gladiatoria page.

## Skills Or Patterns Learned

- **CSS 3D Prism Transitions with 2D Canvas**: Combined CSS 3D transforms (`rotateY`) on a wrapper card with canvas redraws, simulating rotation of a multi-sided physical object.
- **Velocity-Driven Noise-Sanding Synthesis**: Synthesized authentic scratching feedback by linking bandpass filter frequency and gain parameters to mouse/touch drag speed.
- **E2E Automation Bypass (`__revealAll`)**: Exposed a test hook on the window object to instantly clear the mud matrices, avoiding flaky drag simulations in Playwright.

## Next Sparks

- An interactive mosaic reconstruction lab where users assemble fragments of an ancient scroll.
- A hydraulic aqueduct network simulator with gate valves and water level chimes.

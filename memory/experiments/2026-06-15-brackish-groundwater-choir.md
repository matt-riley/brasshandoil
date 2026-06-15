# 2026-06-15 Brackish Groundwater Choir

## Concept

A coastal hydrologic terminal monitoring saltwater intrusion. Pull down the hydraulic freshwater head to hold back the ocean tide. Toggling municipal extraction wells alters the pitch, filter cutoffs, and distortion of the aquifer's ambient synthesizer voices, while encroaching salinity crystallizes salt crusts across the canvas cross-section.

## Test Plan

- Unit tests in `brackish-groundwater-choir.test.mjs` verifying:
  - File exists and is non-empty.
  - Presence of the main root container `id="brackish-root"`.
  - Presence of the arming overlay `id="arming-overlay"`.
  - Canvas elements for aquifer simulation.
  - AudioContext initialization.
  - Well extraction controls and recharge slider.
  - Salinity and pressure readouts.
  - Experiments index contains reference to `brackish-groundwater-choir`.
- Playwright E2E tests in `brackish-groundwater-choir.spec.js` verifying:
  - Page loads with overlay.
  - Clicking the arm button boots the workspace and shows the active synth.
  - Dragging/changing recharge slider or toggling wells updates the salinity readout.
  - Salinity level changes background state (e.g., data attributes like `data-status`).
  - Mobile viewport doesn't overflow.

## What Shipped

- An Astro experiment page: `brackish-groundwater-choir.astro`
- A unit test file: `brackish-groundwater-choir.test.mjs`
- An E2E test file: `brackish-groundwater-choir.spec.js`
- A visual simulation canvas drawing freshwater particles, saline particles, and salt crystals growing on intake well tips.
- An interactive dashboard with a recharge head slider, well switches, and live diagnostics.
- Web Audio synthesizer with multiple voices (ambient hums, brackish triangle waves, crackle oscillators) modulated dynamically by salinity levels.

## Feedback To Carry Forward

- Awaiting user review of the Brackish Groundwater Choir page.

## Skills Or Patterns Learned

- **Multi-channel Web Audio Modulation under Salinity Pressure**: Implemented a dynamic synthesizer graph where frequency, low-pass filter cutoff, and WaveShaper distortion curves respond continuously to salinity values, simulating underground acoustics.
- **Physical Boundary Growth (Salt Crystallization)**: Modeled salt crystals branching as random/branching lines from specific coordinates (well intake screens) triggered when regional salinity thresholds are crossed.

## Next Sparks

- An interactive soil percolation desk where you guide water droplets through varying clay/sand strata to filters.
- A geothermal pressure valve system using HTML5 sliders and Web Audio steam whistles.

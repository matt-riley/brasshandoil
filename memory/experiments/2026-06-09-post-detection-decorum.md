# 2026-06-09 Post-Detection Decorum

## Concept

An interstellar diplomatic authentication desk inspired by the updated 2026 SETI first contact protocols. Rotate the coordinate receiver wheel to calibrate the signal across three independent validation nodes before drafting the official sanitised announcement.

## Test Plan

- Wrote the static unit tests verifying page existence, validation-wheel element, validator-node elements, requestAnimationFrame usage, AudioContext usage, keyboard controls support, diplomatic mad-libs, and index entry.
- Wrote the Playwright E2E spec verifying correct boot state, keyboard rotation, node calibration/verification, diplomatic draft reveal, custom note real-time auto-sanitisation, and mobile viewport scroll check.

## What Shipped

- Added `/experiments/post-detection-decorum` with an SVG calibration wheel, coordinate axes, and concentric rings.
- Implemented three validator nodes placed at 45°, 180°, and 300° that react to correct dial alignment.
- Integrated Web Audio API with a deep cosmic hum, movement-modulated static white noise, proximity harmonic chimes, and verification chimes.
- Added a diplomatic mad-libs draft panel with real-time text sanitisation and auto-replacement typing logic.
- Registered the experiment at the top of the main index directory page.

## Feedback To Carry Forward

- Real-time text replacements can confuse screen readers; using clear helper text or badge states (e.g. "REAL-TIME SANITIZER: ACTIVE") communicates the mechanism.
- SVG translations and scale transforms should be updated inside a `requestAnimationFrame` loop to prevent paint/layout stuttering.

## Skills Or Patterns Learned

- Type-narrowing on SVG elements (`as unknown as SVGGraphicsElement`) allows standard Vite/TypeScript compilation to pass successfully without throwing mismatch errors during the production build.
- Combining whitespace-noise looping buffers with dynamic bandpass filters allows simulating retro tuning radio static.

## Next Sparks

- An atmospheric pressure choir where clicking or moving triggers choral voices modulated by simulated air pressure.
- A customs checkpoint where color gradients are scanned, classified, and declared as contraband.

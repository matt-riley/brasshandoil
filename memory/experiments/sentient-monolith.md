# Experiment: The Sentient Monolith

**Date:** 2026-05-31
**Concept:** A highly accessible, high-contrast wall of text that reacts to user proximity using variable fonts and the Web Audio API.

## Implementation Details
- Used `Roboto Flex` from Google Fonts to access `wght` (weight) and `wdth` (width) axes.
- Intercepted `pointermove` to calculate distance from the cursor to each span of text.
- Mapped distance to font-variation-settings directly in the DOM.
- Initialized Web Audio API on first interaction (to bypass autoplay restrictions) and modulated a Sine wave `OscillatorNode`'s detune and a `GainNode`'s volume based on aggregate proximity energy.

## TDD Status
- [x] Initial assertions created before DOM logic.
- [x] Web Audio elements verified.
- [x] Tests passing successfully via node:test.

## Lessons Learned
- Modulating many spans with `font-variation-settings` on pointer move can cause layout thrashing if not handled carefully, but for ~50 words it performs beautifully without requestAnimationFrame.
- AudioContext requires a user interaction gesture (click or pointermove in some cases) to resume from `suspended` state, which must be handled to avoid silent failures.
- Web Audio API's `setTargetAtTime` is crucial for smooth audio parameter modulation instead of direct `.value` assignment, which causes clicking artifacts.

## Next Steps / Feedback Requested
- Wait for user feedback on whether this hits the right tone for "weird and wonderful" while respecting the accessibility constraint (high contrast).

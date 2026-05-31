# Experiment: Scroll Symphony

**Date:** 2026-05-31
**Concept:** A scroll-driven visual kaleidoscope and interactive synthesizer driven by CSS Scroll-Driven Animations and Web Audio.

## Implementation Details
- Created a 400vh scroll container. The visualizer stage is pinned via `position: fixed`.
- **CSS Scroll-Driven Animations**: Uses `animation-timeline: scroll()` to tie the rotation and scale morphing of nesting text rings directly to the body scroll offset. It runs fully natively on the GPU without JavaScript event binding.
- **CSS `@starting-style`**: Handled entry transition animations on load for the HUD overlays declaratively, keeping layouts clean.
- **Web Audio Synth**: Initialized on first scroll. Synthesizes a detuned multi-oscillator low-drone chord. Cutoff frequency of a resonant low-pass filter sweeps based on scroll depth. Detune modulates based on progress. High crystal chime chords trigger at distinct 25% scroll marks (0%, 25%, 50%, 75%).
- **High Contrast**: Keeps the stark dark style with clear neon glows, resolving the readability limits from past experiments.

## TDD Status
- [x] Initial assertions created before DOM logic.
- [x] Tests passing successfully (43 tests total).

## Lessons Learned
- **CSS `scroll()` timelines** are fully GPU-accelerated and do not trigger layout recalculations, making them incredibly smooth for creative UI.
- Synthesizing drones with detuned oscillators (`sawtooth` + `triangle`) creates a very organic synth pad sound.
- Using `@starting-style` is a powerful tool for setting initial pre-render animation states, eliminating flash-of-unstyled-content (FOUC) and visual jumps.

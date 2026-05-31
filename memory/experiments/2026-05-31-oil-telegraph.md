# 2026-05-31 Oil Telegraph

## Concept

A high-contrast telegraph key that turns press durations into oily Morse (· / —), then “translates” it into a Bureau memo. It self-calibrates your dot threshold over time and preserves a tiny archive.

## Test Plan

- Assert the experiment page exists and includes the key DOM nodes (`telegraph-stage`, `telegraph-key`, `signal-readout`).
- Assert core primitives exist in source: Pointer Events (`pointerdown`/`pointerup`), `requestAnimationFrame`, Web Audio (`AudioContext` + `OscillatorNode`), and persistence (`localStorage`).
- Assert the experiments index lists the new entry (slug/title/agent/date).

## What Shipped

- New page: `/experiments/oil-telegraph` with:
  - Press/hold telegraph key + Spacebar support.
  - Audio tone on press via Web Audio (triangle oscillator + gain envelope).
  - Animated gap-detection loop (letter/word breaks) using `requestAnimationFrame`.
  - Local, lightweight self-calibration of dot timing + archive count in `localStorage`.

## Feedback To Carry Forward

- “Weird UI” works best when the instructions are tiny and the payoff is immediate (signal readout updates on every press).
- Keep “Bureau voice” short and declarative; long paragraphs read like explanations.

## Skills Or Patterns Learned

- For sandbox/dev environments that forbid binding ports (EPERM on `listen()`), build-regression tests that invoke toolchains may need a preflight socket check and a skip path.
- “Self-calibration” can be as simple as a moving average; it makes the interaction feel personal without needing complex ML.

## Next Sparks

- Let archived signals “bleed” into the UI as faint background stamps (CSS-only, no canvas).
- Add a “retransmit last” control that replays the signal as haptics + audio.


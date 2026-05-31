# Brasshandoil Memory

Project memory stored in-repo so it persists across machines and accumulates with the codebase.

## Experiments Log

<!-- Each experiment added here by the daily task -->

## Feedback from Matt

<!-- Matt's feedback on experiments, added here after review -->

## Techniques & Skills Learned

<!-- Cross-project transferable techniques discovered during experiments -->

### 2026-05-31 — General creative direction
The web audio theremin was a good start technically but needs to go much further conceptually. Think **Dada, Absurdism, Monty Python, Surrealism**. The ideas themselves should be weird and funny and unsettling — not just "cool web tech demo". Push the boundaries of creativity, not just the browser platform. The concept should be as surprising as the implementation.

## Experiments Log

### 2026-05-31 — The Anxiety Engine
**Concept:** A Dadaist bureaucratic dashboard from the "Department of Ambient Dread" that measures and amplifies your generalized anxiety, with a CALM DOWN button that makes everything worse.
**Technique:** CSS `@property` (registered custom properties) — declaring `syntax`, `inherits`, and `initial-value` so the browser can tween custom property values in transitions/animations (e.g., animating a `<angle>` hue value inside `hsl()`).
**File:** clients/web/src/pages/experiments/anxiety-engine.astro

## Techniques & Skills Learned

#### CSS @property (Registered Custom Properties)
Declaring `@property --name { syntax: "<angle>"; inherits: false; initial-value: 0deg; }` tells the browser the type of a custom property, enabling smooth CSS transitions and animations through values that would otherwise just snap (e.g., hue angles in `hsl()`, raw numbers in `calc()`). Without registration, `transition: --my-var 1s` does nothing — with it, the browser interpolates correctly. Available in all modern browsers since ~2023.

### 2026-05-31 — COMPLAINT RECEIVED
**Concept:** A 1970s bureaucratic complaint portal from the "Department of Unresolved Matters" that accepts your grievances, processes them through theatrical committee delays, then delivers absurd official non-answers read aloud by the browser using Web Speech API.
**Technique:** Web Speech API `SpeechSynthesis` — `speechSynthesis.speak(utterance)` with voice selection via `getVoices()`, rate/pitch control, and `voiceschanged` event for lazy browser voice loading.
**File:** clients/web/src/pages/experiments/complaint-received.astro

#### Web Speech API — SpeechSynthesis
`window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))` reads text aloud. Voices load asynchronously — listen for `voiceschanged` before calling `getVoices()`. Control pacing with `utterance.rate` (0.1–10), `utterance.pitch` (0–2), `utterance.volume`. Call `speechSynthesis.cancel()` before speaking to avoid queuing. In Playwright tests, stub the entire API with an `addInitScript` since headless Chrome has no audio output.

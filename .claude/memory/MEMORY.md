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

### 2026-05-31 — Office of Evaporated Things
**Concept:** A Borgesian lost-property bureau where you are appointed "Night Looker." Items in the inventory only exist while you regard them — switch tabs and they begin evaporating; the document title pleads with you to return; coming back files a bureaucratic "Return Notice" itemising what ceased while you were elsewhere.
**Technique:** Page Visibility API (`document.hidden`, `visibilitychange`) combined with live `document.title` mutation as an out-of-tab communication channel.
**File:** clients/web/src/pages/experiments/office-evaporated-things.astro

#### Page Visibility API + live document.title as a notification channel
`document.addEventListener("visibilitychange", ...)` fires when the tab loses or gains visibility; `document.hidden` (or `document.visibilityState`) tells you which. While hidden, you can mutate `document.title` on a timer — the user sees the new title in their tab strip even though the page is backgrounded, which is a surprisingly powerful "speak through the chrome" channel. Pair with a `Date.now()` snapshot at `hidden` to compute elapsed away-time when visibility returns. In Playwright, simulate hidden state with `Object.defineProperty(document, "hidden", { configurable: true, get: () => true })` then dispatch a synthetic `visibilitychange` event — `document.hidden` is read-only so direct assignment is a no-op.

### 2026-06-01 — The Backrooms
**Concept:** Inspired by the BBC story about the Backrooms getting a Hollywood film. A first-person liminal space corridor navigator — endless yellow corridors, buzzing fluorescents, damp carpet. Arrow keys to move. Step counter climbs. Cryptic wall notes appear every 5 steps. There is no exit.
**Technique:** CSS 3D transforms — `perspective`, `transform-style: preserve-3d`, `translateZ()` for creating a navigable 3D corridor entirely from DOM elements. `requestAnimationFrame` eased camera movement with perspective-origin bob for a walking feel.
**File:** clients/web/src/pages/experiments/backrooms.astro

#### CSS 3D Corridor (perspective + preserve-3d)
Set `perspective: 400px` on a container, then child elements with `rotateX(90deg)` / `rotateY(90deg)` + `translateZ()` form floor/ceiling/walls. Move "forward" by translating a segments container along Z. Eased animation via `requestAnimationFrame` + quadratic easing gives a walking feel. `perspective-origin` shifts create head-bob and look-left/right. Gotcha: `transform-style: preserve-3d` must be on every ancestor between the perspective container and the 3D-transformed children, or the 3D collapses.

## Feedback from Matt

### 2026-05-31 — COMPLAINT RECEIVED
Read the full signature/sign-off block aloud, not just the body text. All text visible in the response — including closing pleasantries, names, titles, and footnotes — should be included in the speechSynthesis utterance.

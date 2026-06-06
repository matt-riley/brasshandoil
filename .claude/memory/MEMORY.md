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

### 2026-06-02 — Pigeon Magnetoreception Simulator
**Concept:** Inspired by the discovery that pigeons have iron-filled magnetic sensor cells in their livers. You are a pigeon navigating home blind — the only input is a living magnetic field gradient visualization and a vague compass sense from your liver. Click to engage Pointer Lock, then move the mouse to fly.
**Technique:** Pointer Lock API — `element.requestPointerLock()`, `document.pointerLockElement`, `mousemove` event's `movementX`/`movementY` for raw movement deltas without cursor bounds. Also: Canvas `ImageData` pixel manipulation for the magnetic field visualization.
**File:** clients/web/src/pages/experiments/pigeon-magnetoreception.astro

#### Pointer Lock API
`element.requestPointerLock()` hides the cursor and delivers raw `movementX`/`movementY` deltas on `mousemove` events, unbounded by screen edges. Listen for `pointerlockchange` on `document` and check `document.pointerLockElement` to know when lock is active. Requires a user gesture (click) to engage. `document.exitPointerLock()` releases. In Playwright tests, stub via `element.requestPointerLock = () => { ... }` and dispatch synthetic `pointerlockchange` events since headless browsers don't support real pointer lock.

#### Canvas gravitational lensing (position-based)
Rather than warping pixels with ImageData, you can simulate gravitational lensing by displacing the *draw positions* of background objects. For each star, compute deflection from nearby masses: `deflection = mass * strength / (distance + epsilon)`, applied radially outward from the mass. Modulate by a "probe" factor (e.g., cursor proximity) so lensing only appears when the user is near. Much cheaper than pixel-level distortion and produces convincing Einstein-ring-like effects. Add brightness magnification (`1 + distortion * N`) for realism.

#### CSS backdrop-filter as interactive lens
A positioned `<div>` with `backdrop-filter: contrast(N) saturate(N) brightness(N)` and `border-radius: 50%` creates a magnifying/enhancing lens that follows the cursor. Elements behind it that are nearly invisible (opacity ~0.03) become readable through the lens without JavaScript opacity manipulation — the filter chain amplifies whatever light is there. Combine with `mix-blend-mode: screen` on the lens for additive light effects. Update position via `mousemove` + `style.transform`. The key insight: backdrop-filter operates on rendered pixels behind the element, so you can "reveal" low-opacity content without changing its actual opacity. Gotcha: `backdrop-filter` doesn't work if any ancestor has `overflow: hidden` with certain compositing — test stacking context carefully.

#### SVG feTurbulence + feDisplacementMap (organic distortion)
`<feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="42">` generates Perlin-style noise; `<feDisplacementMap in="SourceGraphic" in2="noise" scale="N">` warps the source pixels by that noise. Animate `seed` (increment each frame) and modulate `baseFrequency` with `Math.sin()` for a writhing, organic feel. `scale` controls intensity (0 = none, 30+ = heavy distortion). Apply to any element via `filter: url(#id)`. Use separate filters for different intensities on different parts of the page. Gotcha: filter region defaults can clip distorted pixels — use `x="-20%" y="-20%" width="140%" height="140%"` to avoid.

#### Canvas ImageData pixel manipulation
`ctx.createImageData(w, h)` + direct RGBA writes to `imgData.data[idx]` + `ctx.putImageData()` gives per-pixel control for procedural visualizations. Process in 4×4 blocks for performance. Combine with `requestAnimationFrame` and `Date.now()` for animated fields. Much faster than drawing thousands of individual rects.

### 2026-06-03 — The Spin Room
**Concept:** Inspired by Spencer Pratt's reality-TV-to-politics run for LA mayor. Campaign signs dangle on verlet-physics ropes in a neon void. Grab and fling them with the mouse. When signs collide, their reality-TV/political hybrid slogans merge into something worse. New signs spawn endlessly.
**Technique:** Verlet integration for rope/pendulum physics — position-based dynamics with constraint solving, no velocity storage. Mouse interaction via direct position manipulation of verlet points.
**File:** clients/web/src/pages/experiments/spin-room.astro

#### Verlet Integration (rope/pendulum physics)
Store current and previous position per point; velocity is implicit as `pos - oldPos`. Each frame: (1) compute new pos from current + (current - old) * damping + gravity, (2) iteratively solve distance constraints between connected points (divide error equally, skip pinned points). 5 iterations is enough for stiff ropes. Pinned points act as anchors. Mouse interaction: directly set a grabbed point's position each frame — the verlet integration naturally generates momentum on release since oldPos lags behind. Much simpler than force-based physics for rope/cloth/pendulum effects.

### 2026-06-04 — Dark Star Observatory
**Concept:** Inspired by the theory that the universe's first stars emitted no light. A black void with 600 faint background stars and 7 hidden "dark stars." Move your cursor to probe — near a dark star, background stars bend via gravitational lensing. Dwell to catalogue each one.
**Technique:** Canvas-based gravitational lensing — per-frame displacement of star positions based on inverse-distance deflection from hidden point masses, modulated by cursor proximity. Einstein ring hint rendering.
**File:** clients/web/src/pages/experiments/dark-star-observatory.astro

### 2026-06-05 — Love in the West
**Concept:** Inspired by the Venus-Jupiter conjunction happening June 9, 2026. A twilight sky with two glowing planets drifting toward each other over 20 seconds. Your cursor is a telescope lens — move it over the sky to reveal hidden love letters the planets are writing to each other. When they finally meet, a white flash and all letters become visible.
**Technique:** CSS `backdrop-filter` as interactive game mechanic — a div with `backdrop-filter: contrast(2.5) saturate(1.8) brightness(1.4)` and `mix-blend-mode: screen` follows the cursor via `clip-path`/positioning, creating a "telescope lens" that amplifies near-invisible elements into readability. Also: `mix-blend-mode: screen` for additive light blending on planet conjunction.
**File:** clients/web/src/pages/experiments/love-in-the-west.astro

### 2026-06-06 — Specimen 4471
**Concept:** Inspired by the flesh-eating New World screwworm fly confirmed in a Texas calf — the first US detection in decades. A pristine USDA veterinary inspection report. Your cursor is a UV lamp; hover over the tissue sample to reveal larvae writhing beneath. The longer you inspect, the more the infestation spreads into the document itself — text distorts, notes rewrite, the status escalates from CLEAR to QUARANTINE FAILURE.
**Technique:** SVG `<feTurbulence>` + `<feDisplacementMap>` — generating organic, animated distortion by mutating the turbulence `seed` and `baseFrequency` each frame via `requestAnimationFrame`. Applied both to the specimen area and to text elements as infestation spreads.
**File:** clients/web/src/pages/experiments/specimen-4471.astro

## Feedback from Matt

### 2026-05-31 — COMPLAINT RECEIVED
Read the full signature/sign-off block aloud, not just the body text. All text visible in the response — including closing pleasantries, names, titles, and footnotes — should be included in the speechSynthesis utterance.

### 2026-06-02 — Pigeon Magnetoreception Simulator
Liked the concept and execution. Two issues: (1) wasn't immediately clear what to do — the interaction needs to be more self-evident, (2) the "pigeon" looked like a small chick/dot, not a pigeon. Lesson: onboard visually, and if you name a creature, make it recognizable.

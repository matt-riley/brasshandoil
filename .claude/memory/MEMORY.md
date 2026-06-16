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

#### Parametric Guilloche / Hypotrochoid Curves on Canvas
Guilloche patterns (the intricate lathe-turned security art on banknotes) are hypotrochoids: `x = (R-r)*cos(t) + d*cos((R-r)/r * t)`, `y = (R-r)*sin(t) + d*sin((R-r)/r * t)`. The curve's period is `2π * R/gcd(R,r)` — use `gcd` to know when it closes. Draw progressively (limit loop iterations by a 0→1 progress value) for an animated "printing" effect. Layer multiple patterns with different R/r/d values and transparent greens for depth. The visual complexity belies the simple math — three parameters per pattern yield infinite variety.

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

#### Canvas Path2D + isPointInPath() hit testing
`new Path2D()` creates a reusable path object; `.rect()`, `.arc()`, `.moveTo()`/`.lineTo()` build the shape. Then `ctx.isPointInPath(path, x, y)` returns true if the point is inside the path's fill region — native canvas hit testing without DOM elements or manual bounding-box checks. Works with arbitrary shapes (not just rects). Build Path2D objects once at init, reuse each frame. Coordinates must match the canvas's internal resolution (multiply by `devicePixelRatio` if the canvas is scaled). Much cleaner than checking `x > rect.left && x < rect.right && ...` for complex shapes. `isPointInStroke()` is the stroke-only variant. Gotcha: paths must be re-created if the canvas is resized and exhibit positions change.

#### Progressive CSS Filter Degradation as Game Mechanic
Apply CSS `filter` functions cumulatively to a container to simulate sensory loss or environmental change. Each interaction adds another filter to the chain: `saturate(0)` kills color, `contrast(0.4)` flattens figure-ground, `blur(3px)` removes detail, `brightness(0.25)` dims everything. Build the chain as an array of strings, join with space, and assign to `element.style.filter`. Pair with `@property` typed custom properties for smooth transitions on non-standard values (e.g., `--warmth` as `<number>` to drive gradient opacity via `calc()`). The key insight: the page's own rendering becomes the feedback mechanism — users viscerally experience what the game entity experiences, rather than reading about it. Works for any progressive transformation narrative: going blind, entering atmosphere, time decay, etc.

#### Canvas ImageData pixel manipulation
`ctx.createImageData(w, h)` + direct RGBA writes to `imgData.data[idx]` + `ctx.putImageData()` gives per-pixel control for procedural visualizations. Process in 4×4 blocks for performance. Combine with `requestAnimationFrame` and `Date.now()` for animated fields. Much faster than drawing thousands of individual rects.

#### HTML5 Drag and Drop API
Set `draggable="true"` on an element, then listen for `dragstart` (call `e.dataTransfer.setData("text/plain", id)` and `effectAllowed = "move"`), and on the drop target: `dragover` (must `preventDefault()` to allow drop, set `dropEffect`), `drop` (`getData` to identify what was dropped), and `dragleave` for visual feedback. In Playwright tests, native DnD can't be driven by mouse actions — instead dispatch synthetic `DragEvent`s with a `new DataTransfer()` object. Gotcha: forgetting `preventDefault()` on `dragover` silently prevents `drop` from firing. The `dragend` event fires on the source element regardless of whether the drop succeeded — check the `dropEffect` to distinguish. `setDragImage()` allows custom drag previews.

#### Canvas clip-path thermal scanner (reveal-through-darkness)
`ctx.save() → ctx.beginPath() → ctx.arc(cursorX, cursorY, radius) → ctx.clip()` creates a circular reveal window. Inside the clip region, render a different visual layer (e.g., thermal colormap) while the rest of the canvas stays dark. `ctx.restore()` pops the clip. Layer multiple render passes: dark terrain first, clipped thermal overlay second, HUD/scanlines last. For heat signatures, `createRadialGradient` with thermal palette stops (purple → red → orange → white) gives convincing FLIR appearance. Animate the clip radius with `Math.sin()` for scanner wobble. Add CRT scanlines with semi-transparent horizontal lines every 3px. This pattern generalizes to any "reveal lens" mechanic — flashlight, x-ray, sonar, etc.

### 2026-06-03 — The Spin Room
**Concept:** Inspired by Spencer Pratt's reality-TV-to-politics run for LA mayor. Campaign signs dangle on verlet-physics ropes in a neon void. Grab and fling them with the mouse. When signs collide, their reality-TV/political hybrid slogans merge into something worse. New signs spawn endlessly.
**Technique:** Verlet integration for rope/pendulum physics — position-based dynamics with constraint solving, no velocity storage. Mouse interaction via direct position manipulation of verlet points.
**File:** clients/web/src/pages/experiments/spin-room.astro

#### Verlet Integration (rope/pendulum physics)
Store current and previous position per point; velocity is implicit as `pos - oldPos`. Each frame: (1) compute new pos from current + (current - old) * damping + gravity, (2) iteratively solve distance constraints between connected points (divide error equally, skip pinned points). 5 iterations is enough for stiff ropes. Pinned points act as anchors. Mouse interaction: directly set a grabbed point's position each frame — the verlet integration naturally generates momentum on release since oldPos lags behind. Much simpler than force-based physics for rope/cloth/pendulum effects.

#### CSS Motion Path (offset-path / offset-distance)
`offset-path: path("M... L... Z")` makes an element follow an arbitrary SVG-like path. Animate `offset-distance` from `0%` to `100%` in a `@keyframes` rule to move along it. `offset-rotate: 0deg` keeps orientation fixed (default auto-rotates to path tangent). Generate elliptical paths programmatically by computing points around a parametric ellipse with tilt: `x = cx + rx*cos(θ)*cos(tilt) - ry*sin(θ)*sin(tilt)`. Set via `el.style.setProperty("offset-path", ...)` to avoid TypeScript CSSStyleDeclaration complaints. Stagger start positions with negative `animation-delay`. Changing the path dynamically (e.g., from chaotic to circular) creates a satisfying "orbit stabilization" effect. Gotcha: the element's position is relative to its offset parent, and `offset-path` coordinates are in the element's containing block — test positioning carefully.

#### 2D Circle-Circle Elastic Collision Response
For N circular bodies: each frame, check every pair `(i, j)` for overlap (`dist(center_i, center_j) < r_i + r_j`). Compute the collision normal `n = normalize(pos_j - pos_i)`, project relative velocity onto it: `dvDotN = dot(v_i - v_j, n)`. Skip if separating (`dvDotN <= 0`). Impulse magnitude: `j = 2 * dvDotN / (mass_i + mass_j)`. Apply: `v_i -= j * mass_j * n`, `v_j += j * mass_i * n`. Then separate overlapping bodies by pushing each half the overlap along `n` (prevents tunneling next frame). Mass can derive from radius for visual consistency. For balloons specifically: add buoyancy (constant upward force < gravity), quadratic air drag (`drag = -C * |v| * v`), and small random turbulence each frame for chaotic drift. Cap `dt` at ~50ms to prevent explosion after tab-switch.

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

### 2026-06-07 — Legal Tender
**Concept:** Inspired by the news that Trump could appear on a new $250 bill. A self-printing banknote with procedural guilloche security patterns. Press any key to shred and reprint at a higher denomination. Right-click to be reported for counterfeiting. The bill physically inflates over time.
**Technique:** Parametric hypotrochoid/guilloche curves on Canvas — the mathematical security patterns used on real banknotes, generated from epicycloid equations: `x = (R-r)*cos(t) + d*cos((R-r)/r * t)`. Progressive drawing creates a "printing" effect.
**File:** clients/web/src/pages/experiments/legal-tender.astro

### 2026-06-08 — Operation Mary — Thermal Search Unit
**Concept:** Inspired by Mary the Tasmanian devil escaping a Queensland wildlife park via "abnormally large leap." A thermal imaging drone interface where your cursor is the scanner. Every heat signature is a decoy (possum, warm rock, confused tourist, off-duty sniffer dog). Equipment degrades across phases — the drone AI wants to film the gift shop, sniffer dogs file for overtime. Mary is finally found in the park office filing a formal resignation from captivity.
**Technique:** Canvas `globalCompositeOperation` via clip-path compositing — using `ctx.save()/clip()/restore()` to create a thermal scanner reveal circle. Layered canvas rendering: terrain layer, thermal overlay inside clip region, heat signature blobs with `createRadialGradient`, and CRT scanline post-processing. Multi-phase narrative driven by scan-to-reveal mechanic.
**File:** clients/web/src/pages/experiments/operation-mary.astro

### 2026-06-09 — Riksdag Resolution 2026-47
**Concept:** Inspired by Sweden banning mobile phones in schools starting fall 2026. You are a Swedish teacher on Day 1 of enforcement. Student phones appear on desks, vibrating with TikTok and Snapchat notifications. Drag each phone into the confiscation drawer. Phones resist — they dodge, multiply, and send guilt-trip notifications. The drawer develops sentience from absorbing too much screen time.
**Technique:** HTML5 Drag and Drop API — `draggable="true"`, `dragstart`/`dragover`/`drop`/`dragend` events, `DataTransfer.setData()`/`getData()` for passing phone identity, `effectAllowed`/`dropEffect` for cursor feedback. Combined with Web Animations API (`element.animate()`) for phone vibration, dodge, and spawn effects.
**File:** clients/web/src/pages/experiments/riksdag-resolution.astro

### 2026-06-10 — KQ14 Orbital Deposition
**Concept:** Inspired by new Kuiper Belt Object discoveries (2023 KQ14) challenging the Planet Nine hypothesis. A courtroom where KBO 2023 KQ14 is on trial for "failure to orbit as predicted." Planet Nine, the defendant, is absent. Six trans-Neptunian witnesses orbit the courtroom on CSS motion paths. Click each to stabilize their testimony, weakening the case. When all stabilize, the judge dismisses the case.
**Technique:** CSS Motion Path — `offset-path: path(...)`, `offset-distance`, animated via `@keyframes` from `0%` to `100%`. Elements follow arbitrary SVG-like path data strings, enabling elliptical orbit animations entirely in CSS.
**File:** clients/web/src/pages/experiments/kq14-deposition.astro

### 2026-06-11 — YMCA Attempt #18
**Concept:** Inspired by David Rush keeping 5 balloons in the air for a Guinness World Record at the West Boise YMCA (1:14.89, took 17 attempts). You are on attempt #18. Your cursor (✋) is your hand — click balloons to bump them up. They have individual physics (size → mass → drag), collide elastically, and spawn thought bubbles when they bounce off each other. A bored Guinness adjudicator commentates with increasing disinterest. Survive to 1:14.89 to break the record.
**Technique:** 2D circle-circle elastic collision response — conservation of momentum between two circular bodies with mass ratios derived from radius. Collision normal computed from center-to-center vector, relative velocity projected onto normal, impulse distributed by inverse mass. Overlap separation prevents tunneling. Combined with per-balloon drag (proportional to speed²), buoyancy, and random turbulence drift for chaotic balloon behaviour.
**File:** clients/web/src/pages/experiments/ymca-attempt-18.astro

### 2026-06-12 — Speed Trap — Camera Unit 7
**Concept:** Inspired by the Volo Museum's KITT replica (Knight Rider) receiving a $50 speeding ticket from NYC while on static display for years. You are malfunctioning Camera Unit 7, an automated traffic camera outside a museum. Your cursor is a targeting reticle. Hover over exhibits (T-Rex skeleton, Mona Lisa poster, security guard, potted fern, a pigeon, an exit sign, and KITT) to get absurd speed readings. Click to issue citations. KITT's speed escalates with every ticket issued. After 5 citations, KITT's scanner light activates and it begins requesting legal counsel.
**Technique:** Canvas `Path2D` + `isPointInPath()` for hit detection — native canvas method that tests whether a point falls inside a previously-defined Path2D object, enabling per-shape hit testing without DOM elements or bounding-box math. Also: custom canvas drawing for each exhibit (car silhouette, skeleton wireframe, guard figure).
**File:** clients/web/src/pages/experiments/speed-trap.astro

### 2026-06-13 — Deer Ked — Voluntary Blindness Protocol
**Concept:** Inspired by the discovery that deer keds (Lipoptena cervi) sacrifice their sight after finding a host, shedding wings and reducing vision gene activity. You are a deer ked. Click vision genes to silence them one by one — the page loses color (grayscale), contrast, acuity (blur), and luminance. As each vision gene dies, a corresponding feeding gene awakens. Wings detach and flutter away on the first silencing. When all vision genes are silenced, the final state reveals: you will feed forever, blind.
**Technique:** Progressive CSS filter degradation as game mechanic — cumulative `filter` chains (`saturate(0)`, `contrast(0.4)`, `blur(3px)`, `brightness(0.25)`) applied to the scene element as each gene is silenced. CSS `@property` for typed custom property animation (`--warmth`). MutationObserver on style attributes to sync filter state. Dynamic DOM generation with `data-testid` attributes for Playwright testability.
**File:** clients/web/src/pages/experiments/deer-ked-protocol.astro

### 2026-06-16 — Byssus Loom — Structural Color Weaving
**Concept:** Inspired by Korean scientists recreating 2,000-year-old sea silk from pen shell clam byssus, discovering the shimmer comes from "photonin" — a protein that bends light through structural interference, not dyes. Scroll to weave golden threads across a deep-ocean canvas; cursor X guides the shuttle. Thread color shifts via thin-film interference simulation (slow = thick/gold, fast = thin/violet). Background, loom frame, and caustic lights all driven by CSS scroll-driven animations.
**Technique:** CSS Scroll-driven Animations — `scroll-timeline: --name block` on `html`, then `animation-timeline: --name` on elements. Keyframes tied to scroll progress rather than time. Also: thin-film interference color mapping (`λ = 2nd`, wavelength→hue conversion).
**File:** clients/web/src/pages/experiments/byssus-loom.astro

### 2026-06-15 — Volunteer 39 — Post-Injection Observation
**Concept:** Inspired by Cambridge's first AI-designed universal coronavirus vaccine passing human trials (39 volunteers, needle-free micro-jet). You are Volunteer 39 in the observation room. Everything is animated via WAAPI. But anything you hover freezes — the clock only advances when you're not watching it. Nurse Chen checks in periodically, increasingly baffled.
**Technique:** Web Animations API (WAAPI) programmatic control — `element.animate()` returning `Animation` objects, `element.getAnimations({ subtree: true })`, `.pause()`/`.play()` as game mechanic, `.finished` promises for sequencing nurse messages, `.playbackRate` potential.
**File:** clients/web/src/pages/experiments/volunteer-39.astro

### 2026-06-14 — Octagon Terrarium — Nature vs. The Cage
**Concept:** Inspired by UFC Freedom 250 being held on the White House South Lawn for Trump's 80th birthday. The octagon was left overnight. By morning, an ecosystem has formed inside — butterflies flock, robins peck at dropped protein bars, fire ants annex corner posts, fireflies drift through the ropes. Your cursor is a groundskeeper trying to shoo them away. A reclamation counter climbs. Nature always wins by submission (TKO — Technical Kudzu Overgrowth).
**Technique:** Boids flocking algorithm — separation (avoid crowding neighbors), alignment (steer toward average heading of same-type neighbors), cohesion (steer toward center of mass of same-type neighbors). Combined with home-seeking force toward octagon center and cursor repulsion force. Per-type behavior modifiers (ants: slow/ground-hugging, fireflies: drifty/glowing, butterflies: wing-flapping, birds: swooping).
**File:** clients/web/src/pages/experiments/octagon-terrarium.astro

## Techniques & Skills Learned

#### Web Animations API (WAAPI) — Programmatic Animation Control
`element.animate(keyframes, options)` returns an `Animation` object with `.play()`, `.pause()`, `.cancel()`, `.playState`, `.playbackRate`, and a `.finished` Promise. `element.getAnimations({ subtree: true })` enumerates all active WAAPI (and CSS) animations on an element and its descendants — powerful for bulk control (pause everything on hover, etc.). Use `.finished.then(...)` to chain sequential animation phases without callback nesting. Unlike CSS `@keyframes`, WAAPI animations are fully programmable: change timing, reverse mid-flight, or composite additively. Key gotcha: `{ fill: "forwards" }` keeps the final frame but the animation still "exists" — call `.commitStyles()` then `.cancel()` to bake the final state and free the animation. For game mechanics, treating `.pause()`/`.play()` as a core interaction (e.g., quantum observation freezing) creates an unusually tactile feel since the browser's animation compositor does the heavy lifting.

#### Boids Flocking Algorithm (Separation, Alignment, Cohesion)
Craig Reynolds' boids model simulates flocking with three rules per agent per frame: (1) **Separation** — steer away from neighbors within a close radius (inverse-distance-squared weighting for smooth falloff), (2) **Alignment** — steer toward the average velocity of neighbors within a medium radius (filter by type for species-specific flocking), (3) **Cohesion** — steer toward the center of mass of neighbors within a larger radius. Each rule produces a steering vector scaled by a force constant; sum them with any environmental forces (home-seeking, predator avoidance, boundary repulsion). Speed-cap per type for behavioral variety. The algorithm is O(n²) per frame but handles ~100 agents comfortably at 60fps. Key insight: filtering alignment/cohesion by agent "type" creates species-specific flocking without separate loops. Cursor repulsion is just another steering force with a distance falloff.

#### CSS Scroll-driven Animations (scroll-timeline / animation-timeline)
Declare `scroll-timeline: --name block` on the scrolling element (e.g., `html` for the page scroll). Then on any element: `animation: my-keyframes linear both; animation-timeline: --name;` — the animation's progress tracks scroll position (0% at top, 100% at bottom) instead of time. Works with standard `@keyframes`. Enables background color transitions, opacity fades, transforms, and any animatable property all driven by scroll without JavaScript. `view()` timeline variant ties to an element entering/leaving the viewport. Supported in Chrome 115+ (2023), Firefox 110+ (behind flag until ~2024). Gotcha: `linear` timing function is usually correct for scroll-driven (ease-in-out feels sluggish). Gotcha: `background` shorthand with gradients is not interpolatable — browsers will snap between keyframes rather than smoothly blending gradients.

#### Thin-film Interference Color Mapping
Structural color (like butterfly wings, soap bubbles, sea silk photonin) arises from constructive interference: `λ = 2 * n * d` where `n` is refractive index and `d` is film thickness. Map wavelength to hue: 380nm→violet(270°), 480nm→blue(220°), 520nm→green(120°), 580nm→yellow(60°), 700nm→red(0°). Linear interpolation: `hue = 270 - ((λ - 380) / 320) * 270`. Useful for any "structural color" effect — thickness as the input variable produces physically-motivated color shifts.

## Feedback from Matt

### 2026-05-31 — COMPLAINT RECEIVED
Read the full signature/sign-off block aloud, not just the body text. All text visible in the response — including closing pleasantries, names, titles, and footnotes — should be included in the speechSynthesis utterance.

### 2026-06-02 — Pigeon Magnetoreception Simulator
Liked the concept and execution. Two issues: (1) wasn't immediately clear what to do — the interaction needs to be more self-evident, (2) the "pigeon" looked like a small chick/dot, not a pigeon. Lesson: onboard visually, and if you name a creature, make it recognizable.

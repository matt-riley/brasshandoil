# Feedback Log

Use this file as the running source of truth for review notes after each daily experiment.

## Feedback Entries

### Seed Entry

Date: 2026-05-31
Experiment: Theremin
Feedback:
- Awaiting first review.
Carry Forward:
- Continue capturing one dated entry per review.
- When feedback becomes a repeatable preference, promote it into `memory/skills/`.

### Session Entry

Date: 2026-05-31
Experiment: Moth Oracle
Feedback:
- The idea and concept landed well.
- The color contrast for the text was not accessible enough.
- Future experiments should preserve the creativity while ensuring legible text contrast.
Carry Forward:
- Track whether surreal text-plus-motion scenes feel stronger than pure single-API demos.
- Check in the next review whether the project wants more atmospheric visual work, more sound work, or sharper conceptual constraints.
- Treat accessible contrast as a default requirement, not a polish step.

### Session Entry

Date: 2026-05-31
Experiment: The Sentient Monolith
Feedback:
- Liked the switch in color (high contrast works well).
- The text can jump and flicker when hovering.
Carry Forward:
- The high contrast direction is a success and should be kept as a baseline.
- Variable font width changes (layout-affecting changes) on hover cause jitter. We promoted this to a new skill (`avoiding-layout-jitter.md`) to use `lerp` or non-layout affecting transforms in future experiments to ensure smoother interactions.

### Session Entry

Date: 2026-05-31
Experiment: Orbital Harmonics
Feedback:
- Liked the concept and the switch in colors.
- Bug: Words were staying mostly to the left of the browser window.
- Request: Research new CSS/browser APIs to push creative limits.
Carry Forward:
- Limit layout wrappers to 100% width rather than viewport-stretching `100vw` inside layout constraints to prevent offset clipping.
- Continually explore cutting-edge APIs (like Scroll-Driven Animations, @starting-style, etc.) for creative coding.

### Session Entry

Date: 2026-05-31
Experiment: Lost & Found Futures
Feedback:
- Loved the idea.
- The interactions did not feel like the promised effects were actually working.
- Experiments should not explain what technologies or APIs they are using inside the artwork itself.
Carry Forward:
- Check whether the high-contrast bureaucratic direction still feels playful enough.
- See if native UI primitives like Popover and View Transitions feel meaningfully fresh to you, or if the next experiment should chase a different class of browser weirdness.
- User feedback should always be captured in the project memory without exception.
- If an effect is conceptually central, it needs to read clearly in the browser rather than only existing in implementation details.

### Session Entry

Date: 2026-05-31
Experiment: Chrono-Spatial Calibration
Feedback:
- Awaiting review.
Carry Forward:
- Ensure the popovers stay positioned cleanly near anchors in both standard and polyfilled settings.
- Monitor whether multi-dimensional resonance and FM synth timbres feel engaging.
- Ensure no implementation leakage exists in user-facing HUD panels.

### Session Entry

Date: 2026-05-31
Experiment: Oil Telegraph
Feedback:
- Not very attractive to look at; it reads like a plain box with text.
- The “Bureau” framing is showing up too often now; the joke is wearing thin.
- Future concepts should pull from recent news (reliable sources like the BBC) to broaden idea space beyond the dystopian Bureau arc.
Carry Forward:
- Treat “visual delight” as a first-class acceptance criterion (shape, motion, light, texture), not a later polish pass.
- Avoid repeating the same narrative wrapper back-to-back; rotate motifs (nature, sports, science, local oddities, etc.).
- Start each daily experiment by scanning 1–3 BBC stories and extracting one concrete constraint (object, place, verb) to anchor the concept.

### Session Entry

Date: 2026-05-31
Experiment: Boatfire Regatta
Feedback:
- Creative; the visual direction landed well.
- Make future experiments more satirical while preserving the inventive presentation.
Carry Forward:
- The move from text-box UI to a full-canvas spectacle addressed the Oil Telegraph visual feedback.
- Keep news inspiration in memory notes rather than explaining the source inside the artwork.
- Preserve immediate semantic feedback even when the main payoff is visual and animated.
- Use the source story as material for a satirical point of view, not only as a bag of visual objects.

### Session Entry

Date: 2026-05-31
Experiment: Red Card Bloom
Feedback:
- The concept is interesting and the core idea landed.
- The dragging/pulling interaction feels limited in scope and distance.
- The design could improve by becoming more realistic and more absurd at the same time.
- Mobile performance is poor; on a top-of-the-range iPhone it feels very sluggish.
- Overall, the experiment was done fairly well.
Carry Forward:
- Give the primary gesture a larger expressive range and a more dramatic visual consequence.
- Ground surreal scenes in more convincing physical detail, then exaggerate the payoff further.
- Treat mobile performance as a first-class acceptance criterion for SVG-heavy scenes (reduce path count, reduce per-frame work, consider quality modes).
- Continue using recent source stories as material for a satirical point of view.

### Session Entry

Date: 2026-05-31
Experiment: Office of Evaporated Things
Feedback:
- Awaiting review.
Carry Forward:
- Ensure Visibility API state changes trigger and resume correctly across mobile browsers.
- Monitor whether watch streaks and item deficit values compute seamlessly on low-power devices.
- Treat mobile responsiveness and layout stacking as a default requirement.

### Session Entry

Date: 2026-05-31
Experiment: Mouse Census
Feedback:
- Awaiting review.
Carry Forward:
- News-seeded satire works best when the joke lives in the interaction itself; the
  computer-mouse / rodent-mouse pun let the observer-effect satire land with almost no
  on-screen explanation.
- Rotated off the "Bureau" wrapper into a rural/agricultural motif (Field Station 7) to
  keep the institutional joke fresh, per the Oil Telegraph fatigue note.
- Hard-cap canvas actor counts (1,100 mice) up front so swarm spectacles stay smooth on
  mobile rather than treating performance as a later pass.

### Session Entry

Date: 2026-06-01
Experiment: Abyssal Naming Committee
Feedback:
- Good, but the experiments are all very similar in concept.
Carry Forward:
- A canvas atmosphere can stay cheap while a central DOM specimen carries the visual
  detail, glow, and interaction response.
- Preserve explicit animation ceilings and reduced-motion variants from the first pass.
- Treat the canvas-atmosphere plus DOM-focal-object composition as an implementation
  option, not a default concept generator.
- Reject the next idea if it repeats the ambient scene, central prop, escalating metric,
  and accumulating actor structure.

### Session Entry

Date: 2026-06-02
Experiment: Dependency Caterpillar
Feedback:
- Nice idea, well executed. Visually very similar to other pages though, I'm not sure why this is the trend during this experiment.
Carry Forward:
- In inline Astro scripts, guard required DOM nodes once, then copy them into explicitly typed non-null aliases to keep type narrowing across nested animation closures and event listeners.
- Proactively verify header and card metadata element widths on narrow mobile viewports (e.g., using `flex-wrap: wrap` and reduced text font-sizing) to prevent horizontal overflow.

### Session Entry

Date: 2026-06-02
Experiment: Ghost Kitchen District
Feedback:
- Awaiting review.
Carry Forward:
- Keep the meaningful joke in DOM actors and reserve canvas for inexpensive atmosphere.
- Hard-cap persistent actors, remove transient animation actors, and verify narrow-screen overflow.
- Repeated interactions read clearly when a growing visual result contradicts one unchanged metric.

### Session Entry

Date: 2026-06-02
Experiment: Daily experiment loop
Feedback:
- Good, functional, and works.
- The experiments are repeating similar styles and approaches.
- Wants different ideas, different styles, real adventure, and more innovation.
- Claude was noticed for pushing the boundaries a little even when the result was rough.
- Do not only compare against one agent's previous work. Review the experiments pages
  from every agent and do not copy their concepts either.
- Wants genuinely new, original daily ideas.
Carry Forward:
- Treat style rotation as a requirement, not a nice-to-have.
- Change the interaction grammar and visual language from one experiment to the next.
- Prefer riskier, more distinct concepts when they can still be made legible and testable.
- Before choosing a daily concept, audit the full experiments gallery across Codex,
  Claude, and Antigravity. Reject ideas that reuse another agent's premise, visitor
  role, interaction loop, or visual framing.

### Session Entry

Date: 2026-06-02
Experiment: Indisputable Permanence
Feedback:
- I liked this, it is a bold take on the idea. The way it is let down is by us never actually being able to fully read the text, which is slightly disappointing.
Carry Forward:
- Do not immediately force absolute positioning on elements meant to be read. Keep layout fully fluid and readable in the initial state, only converting to absolute coordinates upon deconstruction.
- Cleanly restore absolute deconstructed elements back to their original DOM parent flow upon reassembly, removing all inline absolute properties to restore native browser layout and viewport responsiveness.

### Session Entry

Date: 2026-06-02
Experiment: Pigeon Magnetoreception
Feedback:
- Good but it didn't quite work and it was unclear what the user was supposed to do.
Carry Forward:
- Interactive simulations must have highly explicit instructions and onboarding states (e.g. a tutorial overlay card with a "BEGIN" trigger).
- Never rely solely on pointer lock or relative mouse movement; always provide fallback inputs like keyboard controls (WASD/Arrow keys) and touch dragging.

### Session Entry

Date: 2026-06-04
Experiment: Pressure Choir
Feedback:
- Awaiting review.
Carry Forward:
- Rotated toward a tactile instrument concept: a pressure membrane, visible
  dents, and short audio voices rather than another institutional workflow.
- Keep semantic readouts tied to the weird gesture so Playwright can verify the
  interaction without treating the canvas as an opaque screenshot.

### Session Entry

Date: 2026-06-03
Experiment: Tidal Type Foundry
Feedback:
- Awaiting review.
Carry Forward:
- Rotated into a type-composition instrument to avoid repeating the recent simulator,
  bureau, and accumulating-actor structures.
- Every primary action should alter semantic feedback, not only canvas pixels.
- Browser sanity checks should scope experiment-local headings because shared chrome
  can own the first page heading.

### Session Entry

Date: 2026-06-03
Experiment: Trionda Calibration Cradle
Feedback:
- Awaiting review.
Carry Forward:
- Guard AudioContext activation correctly in Astro/TypeScript by pulling it into window-exposed checks or casting global win variables to prevent dev compilation warnings.
- Keep strict TDD alignment with UI selectors from the outset.

### Session Entry

Date: 2026-06-03
Experiment: Mobile Optimization Audit
Feedback:
- Run through all of the pages in the site and make sure they all perform and display well on mobile devices.
Carry Forward:
- Avoid using hardcoded `width: 100vw` for full-width components when nested inside layouts with default side padding (like `.container` which adds `padding-inline`), as this results in horizontal overflow (e.g. 391px on a 375px mobile viewport). Use `width: 100%` and relative/dynamic heights (`calc(100dvh - headerHeight)`) instead.
- Follow a strict TDD loop for viewport audits: expand viewport-based E2E test suites first to cover all missing pages, run test suites to identify layout regressions, fix CSS/HTML constraints, and verify the changes against the automated tests.

### Session Entry

Date: 2026-06-04
Experiment: Lichen Ledger
Feedback:
- Awaiting review.
Carry Forward:
- Ensure visual highlights of composted items have high accessible contrast against dark backdrops.
- In paint/drawing loops, use `document.elementFromPoint` to perform cheap, native grid collision checks on DOM entities.
- Support key navigation loops (Up/Down arrow keys + Enter/Space) for gesture fallbacks as standard design patterns.

### Session Entry

Date: 2026-06-05
Experiment: Abyssal Nodule Patchbay
Feedback:
- Awaiting review.
Carry Forward:
- Ensure custom toggle checkbox components are selected by targeting their visible labels in E2E tests.
- Avoid using technology terminology in code comments to prevent false positives in copy verification.
- Map coordinates dynamically when linking elements across canvas/SVG boundaries.

### Session Entry

Date: 2026-06-05
Experiment: Receipt Rain Choir
Feedback:
- Awaiting review.
Carry Forward:
- Rotate away from the recent central-canvas/HUD pattern with stable DOM objects and
  a physical sorting grammar.
- Do not animate transforms on click targets; keep receipts geometrically stable and
  move the surrounding weather instead.
- Run build-shelling tests sequentially because parallel `astro build` invocations
  can collide on inspector ports and produce false failures.

### Session Entry

Date: 2026-06-06
Experiment: Quebec Biosphere
Feedback:
- Awaiting review.
Carry Forward:
- Structure coordinate-mapped dual pane layouts (e.g. blueprint vs. organic canvas) to capture interactions across grid spaces.
- Keep interactive canvas/SVG nodes aligned with normalized relative coords in event handlers to resist layout shifts.
- Establish a virtual keyboard cursor and arrow-key bindings for complex canvas/SVG pointer controls.

### Session Entry

Date: 2026-06-06
Experiment: Static Orchard Switchboard
Feedback:
- Awaiting review.
Carry Forward:
- Require explicit interaction arming for proximity-driven instruments so boot and reset states stay quiet.
- When keyboard activation performs a terminal action, return before generic movement refresh can overwrite the semantic status.
- Keep mobile overflow checks in every new experiment spec; SVG-heavy layouts can still overflow through console controls.

### Session Entry

Date: 2026-06-07
Experiment: Glasshouse Parliament
Feedback:
- Awaiting review.
Carry Forward:
- Rotated into a greenhouse-roof voting surface to avoid another central probe,
  sorting desk, or canvas/HUD composition.
- Pointer-following visual overlays can block stable controls; keep decorative
  layers pointer-transparent unless they are the actual target.
- Focused browser and build tests can pass different failure modes, so run both
  before calling a daily experiment done.

### Session Entry

Date: 2026-06-08
Experiment: The Enhanced Browser Games
Feedback:
- Awaiting review.
Carry Forward:
- Seeded from recent news: "The Enhanced Games" allowing performance-enhancing modifications.
- Implemented "client-side browser doping" pun using Anabolic rAF, setTimeout Beta-Blockers, and Layout EPO to assist game actions at the expense of UI stability and rendering integrity.
- Ensured a full screen overlay is shown initially to explicitly arm AudioContext and unlock synthesized audio waves.
- Mitigated layout jitter side effects by using CSS transforms (`translate`) instead of layout-altering dimensions for target displacement.
- Added full keyboard overrides (arrow keys, space/enter) for pointer-less testing and mobile accessibility.

### Session Entry

Date: 2026-06-08
Experiment: Bureau of Borrowed Shadows
Feedback:
- Awaiting review.
Carry Forward:
- Rotated into a projection-ledger desk with fixed DOM controls and visual-only
  shadow transforms to avoid another canvas/HUD pattern.
- Desktop visual smoke checks can catch composition defects that interaction and
  overflow specs miss.
- Compare target geometry relative to the stage after hover interactions because
  visibility scrolling can move viewport-space bounding boxes.

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

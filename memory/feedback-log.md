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

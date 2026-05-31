# Experiment: Orbital Harmonics

**Date:** 2026-05-31
**Concept:** A gravity-based word-orbit visualizer and synthesizer that generates music from the orbits of typed words.

## Implementation Details
- Words are represented as physical objects orbiting a central gravity well that can follow the pointer.
- Calculated orbital speed using Keplerian/Newtonian circular velocity approximations ($v = \sqrt{\frac{GM}{r}}$) to start planets in stable circular orbits, preventing them from flying away or collapsing instantly.
- Handled physics state in a `requestAnimationFrame` loop.
- **No Layout Jitter**: Elements are positioned using CSS `transform: translate3d(x, y, 0) translate(-50%, -50%)`. Since this does not affect layout coordinates or cause DOM reflow, interaction is butter-smooth and immune to layout jitter.
- The gravity well position itself is smoothed via linear interpolation (`lerp`) to prevent sharp steps.
- **Spatial Audio**: Audio is triggered when a word crosses the vertical meridian ($x = 0$ in the well's local frame). Pitch is mapped using a pentatonic scale relative to the word length and first letter. Panning is computed based on relative $y$-coordinate offset (leveraging `StereoPannerNode`).

## TDD Status
- [x] Initial assertions created before DOM logic.
- [x] Web Audio and transforms verified.
- [x] Tests passing successfully via node:test.

## Lessons Learned
- Creating stable circular orbits dynamically requires matching the velocity perpendicular to the radius: $v_x = -\sin(\theta) \cdot v$, $v_y = \cos(\theta) \cdot v$, where $v = \sqrt{GM/r}$.
- Using CSS `translate3d` with absolute positioned elements keeps the rendering pipeline extremely lightweight and performs significantly better than updating `left` or `top` attributes.
- Spatial panning adds an extra layer of magic and visual/auditory alignment that makes browser canvas/physics experiments feel premium.
- `StereoPannerNode` is highly portable and simple compared to full 3D PannerNode, perfect for 2D screen coordinate panning.

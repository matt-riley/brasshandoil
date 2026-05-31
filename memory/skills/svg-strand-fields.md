# SVG Strand Fields With Semantic Controls

## When To Use

- Use generated SVG paths when an experiment needs dozens of organic lines, visible light effects,
  and DOM-level inspectability without another canvas scene.
- Keep the central action in semantic HTML and layer it over the SVG field.

## Daily Experiment Pattern

1. Hand-author the large visual anchors first: background, light source, and stage geometry.
2. Generate repeated strands with `createElementNS`, storing per-strand phase, reach, and sway.
3. Update only each strand's `d` and color attributes inside one `requestAnimationFrame` loop.
4. Translate pointer drag distance into one normalized strain value and ease toward it. Give the
   gesture enough travel to feel physically expressive; a technically functional short drag reads
   as constrained.
5. Listen for release on both the dragged handle and `window`; pointer capture is the primary path,
   while the window listener prevents a visually stuck drag when release lands elsewhere.
6. Use Web Animations for short-lived SVG particles, then remove them when `finished` settles.
7. Mirror the visual response in a compact `aria-live` readout so the interaction stays testable.

## Mobile Performance Budget

- Default to fewer strands on small screens; treat iPhone Safari as the baseline.
- Consider a quality mode gate:
  - Reduce strand count and/or update every other frame.
  - Avoid filter-heavy compositions on mobile (`feGaussianBlur` + large glow regions can be expensive).
  - Prefer a small number of “hero” strands plus a subtle static texture.
- Make the resting frame beautiful, then let motion be sparse and intentional.

## Review Questions

- Does the resting scene already look intentional?
- Is the handle visibly part of the artwork rather than a detached control panel?
- Can the primary gesture travel far enough to feel satisfying and change the composition?
- Does tapping still provide a payoff when the user does not discover dragging?
- Does the copy remain readable over the brightest strand glow?

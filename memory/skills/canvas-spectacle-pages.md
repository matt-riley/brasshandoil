# Canvas Spectacle Pages With Testable Contracts

## When To Use

- Use a canvas when the page needs many moving particles, custom light fields, or fluid
  atmosphere that would become awkward as a large DOM tree.
- Keep controls and visible state in semantic HTML layered above the canvas.

## Daily Experiment Pattern

1. Test for the canvas stage, one clear action, one visible state change, and the core drawing
   primitives before implementation.
2. Make the first frame attractive before interaction: ambient actors, texture, and one strong
   light source should already be visible.
3. Give the interaction an immediate DOM response while the canvas animation continues its
   longer payoff.
4. Keep user-facing text high contrast and compact. The artwork should not explain its own
   implementation.
5. Validate queried DOM nodes, then assign fresh non-null aliases before canvas helpers capture
   them so Astro TypeScript checks remain clean.
6. Let canvas carry cheap atmosphere while a small number of layered DOM props carry the focal
   detail. CSS gradients, shadows, and transitions can make one hero object feel rich without
   adding per-frame drawing work.
7. For nested perspective scenes, paint the distant fill once and then layer surfaces from far
   to near. Filling every ring interior will let the nearest pass erase the depth behind it.
8. Cap redraw frequency when an atmospheric loop creates gradients or other expensive paint
   work. A steady 30 FPS is often enough for ambience and leaves interaction responsive.
9. Keep structural perspective bands anchored during walk animations. Move the camera with a
   small eased bob instead of sliding dark ribs toward the viewer, which can read as flashing.
10. Full-bleed experiment stages should still fit below shared site chrome. Size the canvas from
   its stage element and keep HUD layers local to that stage rather than the browser viewport.

## Review Questions

- Is the primary visual effect obvious within three seconds?
- Does interaction visibly alter the canvas and a semantic readout?
- Does the page still look intentional before the first interaction?
- Can the narrow viewport preserve readable copy and a clear launch control?
- Is the focal prop visually strong without forcing the canvas loop to redraw unnecessary detail?

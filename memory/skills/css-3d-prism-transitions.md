# CSS 3D Prism Transitions with 2D Canvas

Combine CSS 3D transforms (`rotateY` / `rotateX`) on container cards with 2D canvas redrawing to simulate tactile rotation of multi-sided physical objects (prisms, boxes, wheels).

## Problem

Simulating a 3D multi-sided specimen (such as a 4-sided Roman gladiator tag or a prism) inside standard 2D canvas requires complex projection mathematics or WebGL engines, which are expensive to implement and maintain for small creative experiments.

## Solution

1. **Card perspective setup**: Wrap the canvas in a container with perspective:
   ```css
   .canvas-perspective-wrapper {
     perspective: 800px;
   }
   .prism-3d-card {
     transform-style: preserve-3d;
     transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
   }
   ```
2. **Synchronized flip trigger**: When a user rotates the face:
   - Temporarily animate the card rotation: e.g. `rotateY(-90deg)`.
   - Halfway through the transition (using a timed `setTimeout`), swap the underlying face parameters and canvas data state.
   - Instantly snap the card to the opposite angle (e.g. `rotateY(90deg)`) without a transition.
   - Animate the card back to `rotateY(0deg)`.
3. **Outcome**: The user experiences a seamless, GPU-accelerated 3D flip effect, while the canvas continues to render high-performance 2D operations.

## Checks

- Ensure that layout/size properties on the canvas wrapper remain constant during the Y-axis rotation to prevent parent reflows.
- Clear and reset pointer state variables (like `isDrawing` and `lastCoordinates`) before starting the rotation to prevent drawing trailing lines during flips.

# Skill: Avoiding Layout Jitter in Interactive DOM

**Origin:** Sentient Monolith experiment

When mapping pointer positions to CSS properties (like variable font `wdth` or `scale`), if the change affects the element's layout size or position, it can cause the element to move away from under the pointer. 

This creates an immediate feedback loop:
1. Pointer hovers element.
2. Element expands/moves.
3. Element is no longer under pointer.
4. Element shrinks back to original size.
5. Element is under pointer again.
**(Result: Rapid, flickery jitter)**

## How to avoid:
- **Prefer Transforms**: Use `transform: scale()` or `translate()` over `width`, `height`, `margin`, or layout-affecting variable axes (like `wdth`) when possible, as transforms don't reflow the document.
- **Debounce/Lerp**: Use linear interpolation (`lerp`) within a `requestAnimationFrame` loop to smooth out the values over time instead of instantly applying them on `pointermove`.
- **Anchor Elements**: Apply the interaction state to a non-moving container/wrapper, while animating the inner child. This ensures the hit-area for the pointer remains stable.

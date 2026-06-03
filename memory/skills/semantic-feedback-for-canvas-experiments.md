# Semantic Feedback For Canvas Experiments

Use this when the main spectacle happens on canvas but the visitor still needs
clear, testable feedback outside the pixels.

## Pattern

1. Pair every primary gesture with a DOM readout that changes immediately.
2. Include a count, label, status phrase, or rack/list that can be asserted without
   reading canvas internals.
3. Keep the canvas actor cap and the DOM readout in the same state update path.
4. Test the semantic state separately from pixel paint so failures explain whether
   the bug is interaction, state, or rendering.
5. Avoid tests that require one internal variable name when a visible behavior is
   what matters.

## Useful Checks

- Click the primary control twice and confirm the status text differs each time.
- Drag on the stage and confirm both canvas actors and DOM state react.
- In app-browser checks, scope page headings when shared chrome also contains
  prominent headings.

# Explicit Interaction Arming

Use this when an experiment derives live readouts from proximity, pressure, hover,
or any other continuous geometry that could be nonzero at page load.

## Signal

- The initial Playwright boot test expects a quiet state, but the default pointer,
  probe, or cursor position starts near an active object.
- Reset code recomputes a nonzero reading even though the user has asked to clear
  or quiet the instrument.
- A terminal action such as "bottle" or "submit" briefly appears, then is replaced
  by a generic tuned/hovering state.

## Practice

1. Track a boolean such as `hasTuned`, `isArmed`, or `hasInteracted` separately
   from normalized coordinates.
2. Keep boot and reset states quiet by returning zero readouts until an explicit
   pointer, keyboard, or control action arms the instrument.
3. Set the armed flag before recalculating proximity during user-driven movement.
4. For terminal keyboard actions, call the semantic action, prevent default, and
   return before the generic movement refresh runs.
5. Assert both text state and `data-*` state in E2E tests so the behavior is visible
   to users and deterministic for automation.

## Checks

- Does the page boot with the expected quiet readout every time?
- Does reset clear both counters and the armed flag?
- Can keyboard and pointer paths reach the same semantic state without relying on
  the browser's initial cursor position?

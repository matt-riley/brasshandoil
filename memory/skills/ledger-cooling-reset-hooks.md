# Ledger Cooling Reset Hooks

Ledger-style experiments often prove the "add a record" path but leave the
state hard to clear without reloading. A quiet reset path makes the interaction
feel more instrument-like and gives tests a second state transition to verify.

## When To Use

- Pages that stamp, seal, archive, release, notarize, or otherwise append
  entries into a visible ledger.
- E2E tests that need to verify both mutation and recovery without navigating
  away.
- Interfaces where an extra visible reset button would add clutter.

## Pattern

- Keep the primary creation path as a real click or form submission.
- Add a keyboard reset, usually Escape, that returns counts, `data-*` state, and
  live-region ledger copy to the initial state.
- Expose a deterministic reset hook only after the user-facing path exists:
  `window.__coolParaffinLedgerForTest = coolParaffinLedger`.
- Make the empty-state copy identical before and after reset so tests can assert
  a stable recovery point.

## Test Guidance

- Write a browser test that first creates one ledger entry, then triggers the
  reset and asserts the root attribute, count readout, and empty ledger copy.
- Avoid using reload as the only cleanup proof; reload verifies routing, not
  the instrument's own state machine.

# 2026-06-05 Receipt Rain Choir

## Concept

A thermal-paper weather desk where falling receipts must be sorted into Archive,
Shred, or Audit bins before their ink fades into a choral storm of totals.

Nearest gallery neighbors:
- `Lichen Ledger` also uses accounting satire, but this page changes the role from
  painting/rewilding rows to sorting free-floating paper strips into physical bins.
- `Pressure Choir` also has a chorus metaphor, but this page avoids the central
  canvas instrument and uses stable DOM receipt objects instead.

## Test Plan

- Add a static Node contract for the page file, index registration, semantic totals,
  receipt strips, sorting bins, pointer/keyboard support, and hidden implementation
  terminology.
- Add Playwright coverage for boot state, pointer sorting, keyboard sorting, weather
  reset, and mobile horizontal overflow.

## What Shipped

- New Astro page at `/experiments/receipt-rain-choir`.
- Experiment index entry dated 2026-06-05 with `Codex` as agent.
- Nine receipt strips with sortable bin states, live sorted/unsorted totals, choir
  mode feedback, keyboard shortcuts, and a weather reset.

## Feedback To Carry Forward

- Awaiting review.
- DOM-based experiments still need Playwright-stable hit targets; avoid animating
  the transform/position of elements that tests and users need to click.

## Skills Or Patterns Learned

- Animate the surrounding field, shadows, filters, or pseudo-weather while keeping
  interactive DOM nodes geometrically stable.
- Run full project tests sequentially when the suite itself shells out to `pnpm build`;
  parallel builds can collide on inspector ports and create false failures.

## Next Sparks

- A page where printed labels are physically peeled off items and recombined into
  nonsense provenance chains.
- A receipt copier that recursively audits its own toner until the page becomes a
  black square.

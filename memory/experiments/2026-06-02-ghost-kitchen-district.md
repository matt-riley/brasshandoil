# 2026-06-02 Ghost Kitchen District

## Concept

A midnight street where ordering dinner reveals more glowing restaurant aliases
behind one dark doorway. Couriers multiply, the menu expands, and the delivered
meal count remains zero.

Seed: [BBC News, "China goes after 'ghost kitchens' to rein in cut-throat food delivery apps"](https://www.bbc.com/news/articles/cj4p7zglq5no)

## Test Plan

- Write the structural contract before the page exists.
- Require bounded steam particles, bounded couriers, and bounded aliases.
- Verify that ordering increases aliases and couriers while meals stay at zero.
- Verify that a 390px-wide viewport has no horizontal overflow.

## What Shipped

- A full-screen midnight district with CSS storefronts and an atmospheric canvas.
- DOM signs that accrete into a neon wall as orders are placed.
- Delivery riders that cross the street and clean themselves up after animation.
- A reduced-motion branch and narrow-layout panel stacking.

## Feedback To Carry Forward

- Awaiting review.
- Keep testing mobile overflow explicitly for spectacle pages.

## Skills Or Patterns Learned

- Use DOM actors for the meaningful joke and canvas for cheap atmosphere.
- Hard-cap visual accretion and remove transient actors on `animationend`.
- A repeated action can carry satire clearly when its visual result contradicts its label.

## Next Sparks

- A customs carousel where every inspection produces more identical luggage.
- A weather map where refreshing the forecast manufactures additional suns.

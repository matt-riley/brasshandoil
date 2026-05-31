# News-to-Satire Pun Engine

## When To Use

- A daily experiment is news-seeded and you want the satire to carry itself with
  little or no explanatory text on screen.

## The Move

1. Read the headline for its underlying tension (here: a real-world plague that
   institutions claim to "manage" while it grows).
2. Find a **literal browser object** that puns on the story. The pun should make the
   interaction itself the joke.
   - Example: Australia's *mouse* plague ↔ the computer *mouse*. Moving the cursor
     breeds rodents, so the act of surveying is what worsens the plague.
3. Wire the primary gesture to the satirical consequence, not to a separate readout.
   The visitor *causes* the absurdity by doing the obvious thing.
4. Add one official-sounding control that promises a fix and instead makes it worse
   (mitigation that doubles the swarm). Let the consequence, not the label, land the joke.

## Guardrails

- The pun must survive without naming any browser API in user-facing copy.
- Pair grounded physical detail (a moonlit wheat field, station lamp) with one
  excessive consequence (exponential rodents) so the satire reads as commentary, not
  a tidy illustration.
- Rotate the institutional motif (rural field station, museum, port) instead of reusing
  the generic "Bureau" wrapper back-to-back.

## Performance Note

- Swarm/particle puns must hard-cap the actor count from the first commit (e.g. 1,100
  mice) and keep per-actor drawing to a few canvas primitives; treat smooth mobile
  motion as an acceptance criterion, not a polish pass.

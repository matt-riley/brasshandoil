---
name: execute
description: >-
  Implementation methodology for executing backlog items. Handles scoping, decomposition,
  worktree workflow, strict TDD, verification, and commit conventions. Triggers: "execute",
  "implement", "build this", "code this".
schedule: "When backlog items are ready for implementation"
---

# Execute

Implementation methodology. Operate fully autonomously. Never ask the user. Don't stop until the work is complete.

## Scope

Read the assigned backlog item from `todos.md`.
- Use the item title as the main scope
- If the item is ambiguous, choose the simplest interesting interpretation that fits the repo
- Preserve existing conventions in `clients/web/`

Output: a clear, bounded description of what changes and what doesn't.

## Decompose

Break the work into small changes. Each change should be independently testable.

## Worktree First

Never edit files on `main`.
If you are not already in a worktree, create one with `noodle worktree create <slug>`.
Use absolute paths or `noodle worktree exec <name> <cmd>`. Never `cd` into a worktree.
Merge when done: `noodle worktree merge <name>`.

## TDD

Write or update tests first.
- Unit tests: colocated with the code they cover
- E2E tests: `clients/web/tests/`
- Run `npm test`
- Run `npm run test:e2e`
Never commit failing tests.

## Implement

Keep changes tightly scoped to the experiment. Use the repo's existing patterns.
Commit convention: `feat(web): <brief experiment name>` - one commit per logical change.

## Verify

Run the relevant test suite before committing. If the change touches browser behavior, verify in the browser too.

## Yield

After committing and verifying:

```bash
noodle event emit --session $NOODLE_SESSION_ID stage_yield --payload '{"message": "Implemented: <brief summary>"}'
```

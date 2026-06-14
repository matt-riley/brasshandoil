---
name: schedule
description: Orders scheduler. Reads .noodle/mise.json, writes .noodle/orders-next.json. Schedules work orders based on backlog state and session history. Triggers when orders are empty, after backlog changes, or when the loop re-evaluates.
schedule: "When orders are empty, after backlog changes, or when session history suggests re-evaluation"
---

# Schedule

Read `.noodle/mise.json`, write `.noodle/orders-next.json`.
The loop atomically promotes `orders-next.json` into `orders.json` - never write `orders.json` directly.
Use `noodle schema mise` and `noodle schema orders` as the schema source of truth.

Operate fully autonomously. Never ask the user to choose or pause for confirmation.

## Project Context

Brass Hand Oil is a daily web-art playground for weird browser experiments.
- Work lives in `clients/web/`
- The backlog is `todos.md` at the repo root via the backlog adapter
- Tests: `npm test` and `npm run test:e2e`

## Scheduling Rule

Pick the highest-priority open backlog item and schedule it. In this project, the backlog order in `todos.md` is the priority order.

If there are no open items, write `{"orders":[]}`.

## Orders Model

Output is `{orders:[...]}` where each order is a pipeline of stages executed sequentially.

Each order must include:
- `id`: the backlog item ID
- `title`: the backlog item title
- `rationale`: why this item is next
- `stages`: one or more stages using `do`

## Stage Shape

Each stage can include:
- `do`: task key matching `task_types`
- `prompt`: task-specific instructions
- `extra_prompt`: supplemental context
- `group`: concurrency group
- `runtime`: set to `"process"` for this project
- `model` / `with`: override routing only when needed
- `extra`: opaque data passed through the loop

Do not include `status` or `skill` fields. The loop sets those automatically.

## Execution Pipeline

For a normal backlog item, schedule a single `execute` stage.

Use the backlog item title as the `prompt`, and include any useful item context in `extra_prompt` if needed. Keep the prompt concise and concrete.

## Output

Write valid JSON to `.noodle/orders-next.json` matching `noodle schema orders`.

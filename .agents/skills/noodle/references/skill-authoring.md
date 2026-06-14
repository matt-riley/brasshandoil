# Skill Authoring

How to create and update Noodle skills — task-type skills that plug into the scheduling loop, domain skills that teach agents about the codebase, and workflow skills.

## The Pipeline

Understand this before writing any skill:

```
backlog (todos.md or adapter)
  ↓ sync
mise.json       ← backlog + task_types[] + recent_events + resources
  ↓ schedule skill reads mise, writes orders
orders-next.json ← orders with staged pipelines
  ↓ loop promotes atomically
orders.json     ← live orders dispatched to cook sessions
  ↓ skill loaded into session
agent runs      ← SKILL.md body is the agent's instructions
```

The `schedule` skill is the only writer of `orders-next.json`. Skills influence scheduling through their `schedule` frontmatter field — the scheduler reads these from `task_types` in mise.

## Skill Anatomy

```
skill-name/
├── SKILL.md          ← required: frontmatter + instructions
├── references/       ← optional: docs loaded on demand
├── scripts/          ← optional: deterministic executable code
└── assets/           ← optional: files used in output, not loaded into context
```

**SKILL.md** has two parts:
1. **Frontmatter** (YAML) — `name`, `description`, and optionally `schedule`. Only frontmatter is always in context; the body loads after triggering.
2. **Body** (markdown) — what the agent should do when this skill runs.

### Context Budget

The context window is a shared resource. Only add what Claude doesn't already know. Prefer concise examples over verbose explanations. Keep SKILL.md under 500 lines; split into references when approaching that limit.

Three-level loading:
1. **Metadata** (~100 words) — always in context
2. **SKILL.md body** (<5k words) — loaded on trigger
3. **References/scripts** — loaded on demand by the agent

### Frontmatter

```yaml
---
name: my-skill
description: >-
  What the skill does and when to trigger it. Put ALL trigger info here —
  the body only loads after triggering.
schedule: "When and where to place this task type in order pipelines"
---
```

- `name` + `description`: Required. Description is the primary trigger mechanism.
- `schedule`: Optional. Presence makes this a **task type** discoverable by the scheduling loop.

### Two Kinds of Skills

**Task-type skills** have a `schedule` field and appear in `mise.json` as `task_types`. The scheduler places them as stages in orders. Examples: execute, quality, reflect, meditate.

**Domain/workflow skills** have no `schedule` field. They're loaded alongside task-type skills to provide context. Examples: go-best-practices, react-best-practices, noodle.

## Writing Task-Type Skills

### The schedule Field

This is the scheduler's instruction for when and how to use this task type. Answer: **when should this appear, and where in the pipeline?**

Three positioning patterns:

| Pattern | When | Schedule hint |
|---------|------|---------------|
| **Follow-up stage** | Runs after another stage in the same order | `"Follow-up stage after execute. Cross-provider review preferred."` |
| **Standalone order** | Own order, triggered by conditions | `"Standalone order when [condition]. [constraints]."` |
| **Primary stage** | The main work of an order | `"When backlog items [condition]"` |

### The Skill Body

Write instructions for what the agent should do when dispatched. The body should NOT describe when to schedule itself — that's the `schedule` field's job. Keep these concerns separate.

## Orders Schema

Run `noodle schema orders` for the canonical schema. Key structure:

```json
{
  "orders": [{
    "id": "string — backlog item ID or slug",
    "title": "brief description",
    "rationale": "why scheduled, citing a principle",
    "status": "active",
    "stages": [{
      "task_key": "execute",
      "skill": "execute",
      "provider": "claude",
      "model": "claude-opus-4-6",
      "runtime": "process",
      "status": "pending",
      "prompt": "full task prompt",
      "extra_prompt": "supplemental approach instructions (~1000 chars max)"
    }]
  }]
}
```

### Stage Composition

**Sequential pipeline** — most common:
```json
[
  {"task_key": "execute", "provider": "claude", "runtime": "process", ...},
  {"task_key": "reflect", "provider": "claude", "runtime": "process", ...}
]
```

**Nothing to schedule:**
```json
{"orders": []}
```

## Creating a Skill

1. `mkdir -p .agents/skills/<name>`
2. Write `SKILL.md` with frontmatter. Add `schedule:` if it's a task type.
3. Add `references/` for large docs, `scripts/` for deterministic code.
4. The loop discovers it automatically — appears in `task_types` on next mise generation.

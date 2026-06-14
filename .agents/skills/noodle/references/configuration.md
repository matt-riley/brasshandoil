# Configuration Reference

Noodle reads `.noodle.toml` at project root. When no config file exists, `noodle start` uses sensible defaults.

## Minimal config

```toml
[routing.defaults]
provider = "claude"
model = "claude-opus-4-6"

[skills]
paths = [".agents/skills"]
```

## `mode`

Controls human oversight level: `auto` (full automation), `supervised` (human approves merges), `manual` (human triggers everything).

```toml
mode = "supervised"
```

## `[routing.defaults]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `provider` | string | `"claude"` | Agent provider (`"claude"`, `"codex"`) |
| `model` | string | `"claude-opus-4-6"` | Model identifier |

## `[skills]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `paths` | string[] | `[".agents/skills"]` | Directories to scan for SKILL.md files |

## `[concurrency]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `max_concurrency` | int | `4` | Maximum concurrent agent sessions |

## `[agents.claude]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | string | `""` | Path to Claude CLI binary |
| `args` | string[] | `[]` | Extra CLI arguments for every invocation |

## `[runtime]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `default` | string | `"process"` | Default runtime: `"process"` or `"sprites"` |

## `[server]`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `port` | int | `3000` | Web UI server port |
| `enabled` | bool | auto | Start server (auto-starts in interactive terminals when omitted) |

## `[adapters.<name>]`

Adapters bridge external systems into the backlog.

| Field | Type | Description |
|-------|------|-------------|
| `skill` | string | Skill name this adapter extends |
| `scripts` | map | Named shell commands (`sync`, `add`, `done`, `edit`) |

```toml
[adapters.backlog]
skill = "backlog"

[adapters.backlog.scripts]
sync = "adapters/backlog-sync"
add = "adapters/backlog-add"
done = "adapters/backlog-done"
edit = "adapters/backlog-edit"
```

import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const skillPath = resolve(__dirname, "../.agents/skills/experiment-blog-post/SKILL.md")

let source

test("experiment blog post skill exists", () => {
  source = readFileSync(skillPath, "utf8")
  assert.ok(source.length > 0, "Skill file should not be empty")
})

test("experiment blog post skill is scheduled after execute", () => {
  assert.match(source, /^name:\s*experiment-blog-post/m, "Skill should have a stable name")
  assert.match(
    source,
    /^schedule:\s*"Follow-up stage after execute\./m,
    "Skill should run after experiment execution"
  )
})

test("experiment blog post skill targets the blog content collection", () => {
  assert.match(
    source,
    /clients\/web\/src\/content\/blog\//,
    "Skill should write posts into the blog collection"
  )
  assert.match(
    source,
    /memory\/experiments\//,
    "Skill should read the experiment note as source material"
  )
})

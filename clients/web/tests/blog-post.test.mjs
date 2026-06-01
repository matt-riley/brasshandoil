import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/blog/[slug].astro")

let source

test("blog/[slug].astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("blog post renders content without interactive comments", () => {
  assert.match(source, /render\(entry\)/, "Should render blog content")
  assert.doesNotMatch(source, /comment-form/, "Should not include a comment form")
  assert.doesNotMatch(source, /localStorage/, "Should not persist browser comments")
})

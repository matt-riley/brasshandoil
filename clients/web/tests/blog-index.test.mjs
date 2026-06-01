import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const pagePath = resolve(__dirname, "../src/pages/blog/index.astro")

let source

test("blog/index.astro file exists", () => {
  source = readFileSync(pagePath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("blog index renders a list of posts", () => {
  assert.match(source, /getCollection\(\"blog\"\)/, "Should load blog collection entries")
  assert.match(source, /href=\{`\/blog\/\$\{post\.id\}`\}/, "Should link each post to its detail page")
})

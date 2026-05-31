import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const componentPath = resolve(__dirname, "../src/components/Header.astro")

let source
test("Header.astro file exists", () => {
  source = readFileSync(componentPath, "utf8")
  assert.ok(source.length > 0, "File should not be empty")
})

test("header nav includes a GitHub repository link", () => {
  assert.ok(
    source.includes("https://github.com/matt-riley/brasshandoil"),
    "Should link to the Brass Hand Oil GitHub repository"
  )
  assert.match(source, /aria-label="GitHub"/i, "Should expose an accessible GitHub label")
  assert.match(source, /<svg[\s\S]*viewBox="0 0 24 24"/i, "Should render a GitHub logo as SVG")
})

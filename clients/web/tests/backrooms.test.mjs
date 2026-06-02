import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const pagePath = new URL("../src/pages/experiments/backrooms.astro", import.meta.url)
const page = await readFile(pagePath, "utf8")

test("backrooms walk animation keeps structural depth bands anchored", () => {
  assert.doesNotMatch(page, /\(i - offset\) \/ rings/)
  assert.match(page, /Math\.sin\(offset \* Math\.PI\)/)
})

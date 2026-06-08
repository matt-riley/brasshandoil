# Relative Stage Geometry in E2E

When checking that animated or pointer-driven visuals do not move interactive
targets, compare target coordinates relative to the containing stage, not raw
viewport coordinates.

## Why

`locator.hover()` and other visibility helpers can scroll the page before the
interaction. That changes `boundingBox().x/y` in viewport space even when the
target stayed perfectly fixed inside its stage.

## Pattern

Capture both boxes before and after:

```js
const stageBefore = await stage.boundingBox()
const targetBefore = await target.boundingBox()

await stage.hover()

const stageAfter = await stage.boundingBox()
const targetAfter = await target.boundingBox()

expect(Math.round(targetAfter.x - stageAfter.x)).toBe(
  Math.round(targetBefore.x - stageBefore.x)
)
expect(Math.round(targetAfter.y - stageAfter.y)).toBe(
  Math.round(targetBefore.y - stageBefore.y)
)
```

## Use When

- A test simulates hover or focus on a lower page region.
- The page has shared chrome or vertical scrolling.
- The assertion is about layout stability inside an experiment stage rather than
  fixed viewport placement.

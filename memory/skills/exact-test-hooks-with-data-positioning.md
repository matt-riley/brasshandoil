# Exact Test Hooks With Data Positioning

When a source contract checks for literal class hooks such as
`class="thing-control"`, keep that class exact in the markup and move per-item
positioning or variant identity into `data-*` attributes.

## Why

Exact hook assertions make tests easy to scan, but class strings become brittle
when implementation also needs `thing-control-a`, `thing-control-active`, or
other visual variants. Data attributes preserve stable selectors for tests while
leaving CSS enough structure to place and style individual targets.

## Pattern

```html
<button class="thing-control" data-index="0" data-name="first"></button>
<button class="thing-control" data-index="1" data-name="second"></button>
```

```css
.thing-control[data-index="0"] { left: 18%; top: 20%; }
.thing-control[data-index="1"] { left: 42%; top: 12%; }
```

## Use When

- Node source tests assert literal class markers.
- Playwright tests count a shared class and need a fixed number of controls.
- The experiment has many absolutely positioned, repeated controls.
- Variant classes would make the contract less precise without improving
  behavior.

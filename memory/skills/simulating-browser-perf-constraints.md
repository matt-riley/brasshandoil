# Simulating Browser Performance Constraints in Interactive UI

Use this when designing satirical or educational web pages that simulate slow rendering, input delays, layout shifts, or thread crashes without actually locking up the browser or causing E2E test failures.

## 1. Input Latency Injection (`setTimeout`)
When simulating poor network responsiveness or cursor latency (e.g. "Beta-Blockers"):
- **Avoid global blocking**: Do not use synchronous sleep loops (like `while(Date.now() - start < delay)`), as they block the main thread, freeze CSS transitions, and crash test runners.
- **De-couple event emission and state mutation**: 
  - Capture event values in the listener.
  - Wrap the inner state mutation logic in a `setTimeout` callback.
  ```javascript
  const handleInput = (value) => {
    state.value = value;
  };
  slider.addEventListener('input', (e) => {
    if (state.hasLatency) {
      setTimeout(() => handleInput(e.target.value), 180);
    } else {
      handleInput(e.target.value);
    }
  });
  ```

## 2. Interactive Displacement (CSS `translate` over layout resizing)
When simulating chaotic layout shifts (e.g. "EPO displacement"):
- **Avoid layout reflows**: Do not mutate margins, padding, width, or height. Resizing forces the browser to recalculate layout offsets, causing rapid hover jitter and cursor tracking loops.
- **Translate bounding boxes**: Apply dynamic offset positions using CSS `transform: translate(x, y)` on the interactive target container. This keeps the physical layout stable while displacing the interactive target, letting the user chase the button without losing hover state bindings.

## 3. Graceful Call Stack Limits (Mock Stack Overflow)
When simulating thread crashes or stack overflows (e.g. "Load Lifter crash"):
- **Prevent actual memory leaks**: Do not write infinite recursion lines (like `function f() { f(); }`) as they freeze the test browser instantly.
- **Simulate execution stack errors**: Check progress boundaries programmatically. If they cross the threshold, interrupt the loop, clean up animation frames, and output a mock stack trace in a code block:
  ```javascript
  if (state.progress >= 98.0) {
    state.active = false;
    cancelAnimationFrame(loopId);
    consoleContainer.innerHTML = '<div class="error">Uncaught RangeError: Maximum call stack size exceeded</div>';
    return;
  }
  ```

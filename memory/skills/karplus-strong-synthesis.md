# Physical Modeling Plucked String Synthesis (Karplus-Strong)

## When To Use

- You want to synthesize highly organic, realistic acoustic plucked instrument sounds (guitars, harps, sitars) directly in the browser without loading heavy audio samples.
- You need reactive audio feedback that alters pitch/sustain dynamically based on real-time user gestures (pegs, dragging, tension sliders).

## The Move (Implementation Pattern)

1. **Shared Noise Buffer**: Create a short noise burst (white noise) that acts as the initial pluck excitation.
   ```javascript
   const bufferSize = audioCtx.sampleRate * 0.03; // ~30ms burst
   const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
   const data = buffer.getChannelData(0);
   for (let i = 0; i < bufferSize; i++) {
     data[i] = Math.random() * 2 - 1;
   }
   ```
2. **The Feedback Loop**: Connect a `DelayNode`, a `BiquadFilterNode` (lowpass), and a feedback `GainNode` in a cycle. In Web Audio, this is valid as long as the delay is greater than one sample.
   - `DelayNode` value = $1 / f$, where $f$ is the target frequency.
   - `BiquadFilterNode` frequency acts as the decay damping (e.g. 1000Hz - 2000Hz). Higher frequencies sound brighter; lower frequencies sound warmer and damp quicker.
   - `GainNode` gain controls feedback/decay rate (e.g. 0.990 - 0.995).
3. **Pluck Triggering**: Instantiate a temporary `AudioBufferSourceNode` pointing to the noise buffer. Route it through a quick exponential amplitude envelope into the delay line.
4. **Dynamic Pitch Bend**: Alter the delay node's `delayTime` using `setTargetAtTime` or `linearRampToValueAtTime` when adjusting the tuning controls to create smooth slides rather than clicking audio artifacts.

## Performance Guardrails

- **Reuse Nodes**: Instantiate the feedback loops *once* per string/oscillator on initialization. Do not recreate `DelayNode` or `BiquadFilterNode` on every pluck. Reusing pre-wired loops and only generating the transient `AudioBufferSourceNode` minimizes garbage collection and audio glitches on low-power devices.
- **Damping Control**: To manually mute strings, scale the feedback gain to 0, then restore it back to standard gain levels.

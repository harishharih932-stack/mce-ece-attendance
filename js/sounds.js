// ── SOUNDS — Web Audio API (no external files) ───────────────────────────────

function playPresent() {
  const ctx = new AudioContext();
  [[1200, 0], [1600, 0.16]].forEach(([freq, delay]) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq;
    const t = ctx.currentTime + delay;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
    gain.gain.linearRampToValueAtTime(0,    t + 0.18);
    osc.start(t); osc.stop(t + 0.18);
  });
}

function playAbsent() {
  const ctx  = new AudioContext();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = 160;
  osc.type = 'sine';
  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.45);
  osc.start(); osc.stop(ctx.currentTime + 0.45);
}

function playTick() {
  const ctx  = new AudioContext();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = 1050;
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06);
  osc.start(); osc.stop(ctx.currentTime + 0.06);
}

function playDone() {
  const ctx  = new AudioContext();
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = 880;
  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7);
  osc.start(); osc.stop(ctx.currentTime + 0.7);
}

// Calibrate both renderers, then fix the hotel's live wall clock as well.
(() => {
  GH.debug.view(-9.5, 1.5, 8.6, 0, 0, 65);
  if (__audit.frames < 12) __audit.step(12 - __audit.frames);
  const NativeDate = Date;
  window.Date = new Proxy(NativeDate, {
    construct(target, args) { return new target(...(args.length ? args : [1794467441000 + __audit.now])); },
    apply() { return new NativeDate(1794467441000 + __audit.now).toString(); },
  });
  __audit.step(1);
  for (const animation of document.getAnimations()) {
    try { animation.finish(); } catch {}
  }
  return { frames: __audit.frames, randomCalls: __audit.randomCalls };
})()

// Inject only into disposable regression tabs, before the game starts.
(() => {
  let seed = 0x7a11c0de;
  const audit = (window.__audit = { now: 1000, frames: 0, randomCalls: 0, errors: [], randomPerFrame: [] });
  Math.random = () => {
    audit.randomCalls++;
    seed = (seed + 0x6d2b79f5) >>> 0;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  Object.defineProperty(performance, "now", { value: () => audit.now });
  Date.now = () => 1794467441000 + audit.now;
  const NativeDate = Date;
  window.Date = new Proxy(NativeDate, {
    construct(target, args) { return new target(...(args.length ? args : [1794467441000 + audit.now])); },
    apply() { return new NativeDate(1794467441000 + audit.now).toString(); },
  });
  const NativeAudioContext = window.AudioContext;
  if (NativeAudioContext) window.AudioContext = new Proxy(NativeAudioContext, {
    construct(target, args) {
      const context = new target(...args);
      Object.defineProperty(context, "currentTime", { get: () => audit.now / 1000 });
      return context;
    },
  });
  const queue = new Map();
  let next = 0;
  window.requestAnimationFrame = (callback) => {
    queue.set(++next, callback);
    return next;
  };
  window.cancelAnimationFrame = (id) => queue.delete(id);
  audit.step = (count = 1, milliseconds = 1000 / 60) => {
    for (let i = 0; i < count; i++) {
      audit.now += milliseconds;
      audit.frames++;
      const pending = [...queue.values()];
      queue.clear();
      for (const callback of pending) callback(audit.now);
      audit.randomPerFrame.push(audit.randomCalls);
    }
    return audit.frames;
  };
  for (const name of ["golden-hour-settings-v1", "golden-hour-builds-v1", "golden-hour-profile-v1", "golden-hour-hud-v1", "golden-hour-language-v1"]) localStorage.removeItem(name);
  localStorage.setItem("golden-hour-settings-v1", JSON.stringify({ quality: "high", motionBlur: "high" }));
  addEventListener("error", (event) => audit.errors.push(String(event.message)));
  addEventListener("unhandledrejection", (event) => audit.errors.push(String(event.reason)));
})();

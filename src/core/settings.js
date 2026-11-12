// core/settings.js: recovered from the verified GOLDEN HOUR release.

var SETTINGS_KEY = "golden-hour-settings-v1";
var DEFAULT_SETTINGS = {
  sens: 1,
  adsSens: 0.9,
  fov: 100,
  master: 0.8,
  sfx: 1,
  music: 0.6,
  quality: "high",
  motionBlur: "high",
  difficulty: "regular",
  primary: "ar",
  invertY: !1,
};
var DIFFICULTIES = {
  recruit: {
    label: "RECRUIT",
    react: 0.55,
    aim: 2.3,
    dmg: 0.55,
    burst: 0.7,
  },
  regular: {
    label: "REGULAR",
    react: 0.36,
    aim: 1.55,
    dmg: 0.8,
    burst: 0.85,
  },
  hardened: {
    label: "HARDENED",
    react: 0.24,
    aim: 1.05,
    dmg: 1,
    burst: 1,
  },
  veteran: {
    label: "VETERAN",
    react: 0.15,
    aim: 0.7,
    dmg: 1.15,
    burst: 1.15,
  },
};
var settings = {
  ...DEFAULT_SETTINGS,
};
try {
  Object.assign(
    settings,
    JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"),
  );
} catch {}
for (let o of Object.keys(settings))
  o in DEFAULT_SETTINGS || delete settings[o];
DIFFICULTIES[settings.difficulty] ||
  (settings.difficulty = DEFAULT_SETTINGS.difficulty);
["ar", "smg", "shotgun"].includes(settings.primary) ||
  (settings.primary = DEFAULT_SETTINGS.primary);
["off", "low", "high"].includes(settings.motionBlur) ||
  (settings.motionBlur = DEFAULT_SETTINGS.motionBlur);
function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {}
}
function horizontalFov(o, t) {
  return (
    (2 *
      Math.atan(
        ((Math.tan((o * Math.PI) / 360) / Math.max(1, t)) * (16 / 9)) /
          (16 / 9),
      ) *
      180) /
    Math.PI
  );
}

export { DIFFICULTIES, horizontalFov, saveSettings, settings };

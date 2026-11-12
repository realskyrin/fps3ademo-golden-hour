// ui/preferences.js: recovered from the verified GOLDEN HOUR release.

var CU = "golden-hour-hud-v1";
var LC = {
  minimap: "rotate",
  xhair: "white",
  hudScale: 1,
  hints: !0,
  seen: 0,
  k9seen: 0,
};
var Oa = {
  ...LC,
};
try {
  let o = JSON.parse(localStorage.getItem(CU) || "{}");
  for (let t in LC) typeof o[t] == typeof LC[t] && (Oa[t] = o[t]);
} catch {}
function i6() {
  try {
    localStorage.setItem(CU, JSON.stringify(Oa));
  } catch {}
}
var D7 = {
  white: "#ffffff",
  cyan: "#6fdcff",
  lime: "#9dff6a",
  amber: "#ffb35c",
};

export { D7, Oa, i6 };

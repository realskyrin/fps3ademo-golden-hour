// ui/camo-preview.js: recovered from the verified GOLDEN HOUR release.
import { HF } from "../weapons/models/camos.js";

var xs0 = 128;
var FU = new Map();
function OU(o) {
  let t = FU.get(o);
  return (t || ((t = HF(o, xs0)), FU.set(o, t)), t);
}
function r6(o, t = 96) {
  let e = document.createElement("canvas");
  e.width = e.height = t;
  let s = e.getContext("2d");
  return (
    (s.imageSmoothingQuality = "high"),
    s.drawImage(OU(o), 0, 0, t, t),
    e
  );
}
function NU(o) {
  let t = performance.now();
  for (let e of o) OU(e);
  return performance.now() - t;
}

export { NU, r6 };

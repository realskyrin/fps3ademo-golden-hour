// core/math.js: recovered from the verified GOLDEN HOUR release.
import { BufferAttribute, Vector3 } from "../vendor/three-r180.js";

var TAU = Math.PI * 2;
var DEG_TO_RAD = Math.PI / 180;
var clamp = (o, t, e) => (o < t ? t : o > e ? e : o);
var saturate = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var lerp = (o, t, e) => o + (t - o) * e;
var EY = (o, t, e) => saturate((e - o) / (t - o));
var smoothstep = (o, t, e) => {
  let s = EY(o, t, e);
  return s * s * (3 - 2 * s);
};
var damp = (o, t, e, s) => lerp(o, t, 1 - Math.exp(-e * s));
var TL = (o) => 1 - Math.pow(1 - saturate(o), 3);
var db = (o) => ((o = saturate(o)), o * o * (3 - 2 * o));
function angleDelta(o, t) {
  let e = (t - o) % TAU;
  return (e > Math.PI ? (e -= TAU) : e < -Math.PI && (e += TAU), e);
}
var dampAngle = (o, t, e, s) => o + angleDelta(o, t) * (1 - Math.exp(-e * s));
function createRandom(o = 1) {
  let t = o >>> 0,
    e = () => {
      t = (t + 1831565813) >>> 0;
      let s = t;
      return (
        (s = Math.imul(s ^ (s >>> 15), s | 1)),
        (s ^= s + Math.imul(s ^ (s >>> 7), s | 61)),
        ((s ^ (s >>> 14)) >>> 0) / 4294967296
      );
    };
  return (
    (e.range = (s, n) => s + (n - s) * e()),
    (e.int = (s, n) => Math.floor(s + (n - s + 1) * e())),
    (e.pick = (s) => s[Math.floor(e() * s.length)]),
    (e.sign = () => (e() < 0.5 ? -1 : 1)),
    e
  );
}
var randomRange = (o = 0, t = 1) => o + (t - o) * Math.random();
var SL = (o) => o[Math.floor(Math.random() * o.length)];
function prepareGeometry(o) {
  let t = o.index ? o.toNonIndexed() : o;
  (t.attributes.normal || t.computeVertexNormals(),
    t.attributes.uv ||
      t.setAttribute(
        "uv",
        new BufferAttribute(
          new Float32Array(t.attributes.position.count * 2),
          2,
        ),
      ));
  for (let e of Object.keys(t.attributes))
    e !== "position" && e !== "normal" && e !== "uv" && t.deleteAttribute(e);
  return ((t.morphAttributes = {}), t);
}
var gn0 = new Vector3(0, 1, 0);
var xn0 = new Vector3();
function createCanvas(o, t = o) {
  let e = document.createElement("canvas");
  return ((e.width = o), (e.height = t), e);
}
function createNoise(o = 1) {
  let t = createRandom(o),
    e = new Uint8Array(512),
    s = Array.from(
      {
        length: 256,
      },
      (c, h) => h,
    );
  for (let c = 255; c > 0; c--) {
    let h = Math.floor(t() * (c + 1));
    [s[c], s[h]] = [s[h], s[c]];
  }
  for (let c = 0; c < 512; c++) e[c] = s[c & 255];
  let n = new Float32Array(256);
  for (let c = 0; c < 256; c++) n[c] = t();
  let i = (c, h) => n[e[(c & 255) + e[h & 255]] & 255],
    a = (c) => c * c * c * (c * (c * 6 - 15) + 10);
  function r(c, h, f = 0) {
    let u = Math.floor(c),
      d = Math.floor(h),
      m = a(c - u),
      p = a(h - d),
      x = u + 1,
      g = d + 1;
    f &&
      ((u = ((u % f) + f) % f),
      (d = ((d % f) + f) % f),
      (x = ((x % f) + f) % f),
      (g = ((g % f) + f) % f));
    let b = i(u, d),
      v = i(x, d),
      y = i(u, g),
      M = i(x, g);
    return lerp(lerp(b, v, m), lerp(y, M, m), p);
  }
  function l(c, h, f = 4, u = 0, d = 0.5, m = 2) {
    let p = 0.5,
      x = 0,
      g = 0,
      b = u;
    for (let v = 0; v < f; v++)
      ((x += p * r(c, h, b)), (g += p), (c *= m), (h *= m), (b *= m), (p *= d));
    return x / g;
  }
  return {
    noise: r,
    fbm: l,
  };
}

export {
  DEG_TO_RAD,
  SL,
  TAU,
  TL,
  angleDelta,
  clamp,
  createCanvas,
  createNoise,
  createRandom,
  damp,
  dampAngle,
  db,
  lerp,
  prepareGeometry,
  randomRange,
  saturate,
  smoothstep,
};

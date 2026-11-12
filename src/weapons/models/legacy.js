// weapons/models/legacy.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  CanvasTexture,
  CapsuleGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Path,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { Vn, th } from "../../vendor/geometry-utils.js";
import { Ll } from "../../scene/geometry.js";
import { createCanvas, createNoise, createRandom } from "../../core/math.js";

var hh = (o) => (o * Math.PI) / 180;
var hs = (o, t, e) => new Vector3(o, t, e);
var $n = (o, t, e) => new Vector3(o, t, -e);
var Bi = !1;
var Vg = new Matrix4();
var kZ = new Quaternion();
var mR = new Vector3();
var MR = new Vector3(0, 1, 0);
function Mr(o) {
  (o.index && (o = o.toNonIndexed()),
    o.attributes.normal || o.computeVertexNormals());
  let t = o.attributes.position.count;
  o.attributes.uv ||
    o.setAttribute("uv", new BufferAttribute(new Float32Array(t * 2), 2));
  for (let e of Object.keys(o.attributes))
    e !== "position" &&
      e !== "normal" &&
      e !== "uv" &&
      e !== "color" &&
      o.deleteAttribute(e);
  return (
    o.attributes.color ||
      o.setAttribute(
        "color",
        new BufferAttribute(new Float32Array(t * 3).fill(1), 3),
      ),
    o.clearGroups(),
    o
  );
}
function $2(o, t, e) {
  let s = o.attributes.uv;
  for (let n = 0; n < s.count; n++) s.setXY(n, s.getX(n) * t, s.getY(n) * e);
  return o;
}
var DI = (o) => {
  let t = 0;
  for (let e = 0; e < o.length; e++) {
    let s = o[e],
      n = o[(e + 1) % o.length];
    t += s[0] * n[1] - n[0] * s[1];
  }
  return t;
};
function II(o, t) {
  let e = t.length;
  for (let s = 0; s < e; s++) {
    let n = t[s],
      i = t[(s + e - 1) % e],
      a = t[(s + 1) % e],
      r = Bi && (n[2] || 0) < 0.008 ? 0 : n[2] || 0;
    if (r > 0) {
      let l = Math.hypot(i[0] - n[0], i[1] - n[1]),
        c = Math.hypot(a[0] - n[0], a[1] - n[1]),
        h = Math.min(r, l * 0.48),
        f = Math.min(r, c * 0.48),
        u = n[0] + ((i[0] - n[0]) * h) / l,
        d = n[1] + ((i[1] - n[1]) * h) / l,
        m = n[0] + ((a[0] - n[0]) * f) / c,
        p = n[1] + ((a[1] - n[1]) * f) / c;
      (s === 0 ? o.moveTo(u, d) : o.lineTo(u, d),
        o.quadraticCurveTo(n[0], n[1], m, p));
    } else s === 0 ? o.moveTo(n[0], n[1]) : o.lineTo(n[0], n[1]);
  }
  o.closePath();
}
function UI(o, t) {
  DI(o) < 0 && (o = o.slice().reverse());
  let e = new Shape();
  if ((II(e, o), t))
    for (let s of t) {
      DI(s) > 0 && (s = s.slice().reverse());
      let n = new Path();
      (II(n, s), e.holes.push(n));
    }
  return e;
}
function CZ(o) {
  let t = o.attributes.position,
    e = t.count,
    s = new Float32Array(e * 3).fill(1),
    n = new Vector3(),
    i = new Vector3(),
    a = new Vector3();
  for (let r = 0; r < e; r += 3) {
    (n.fromBufferAttribute(t, r),
      i.fromBufferAttribute(t, r + 1),
      a.fromBufferAttribute(t, r + 2),
      i.sub(n),
      a.sub(n),
      i.cross(a));
    let l = i.length();
    if (l < 1e-12) continue;
    let c = Math.abs(i.z / l);
    c > 0.12 && c < 0.985 && s.fill(2, r * 3, r * 3 + 9);
  }
  o.setAttribute("color", new BufferAttribute(s, 3));
}
function wR(o, t, e) {
  let s = Bi ? 0 : Math.min(e.b ?? 8e-4, t * 0.45),
    n = new ExtrudeGeometry(UI(o, Bi && !e.keepHoles ? null : e.holes), {
      depth: t - 2 * s,
      steps: 1,
      curveSegments: Bi ? 1 : (e.cs ?? 4),
      bevelEnabled: s > 0,
      bevelThickness: s,
      bevelSize: s,
      bevelOffset: -s,
      bevelSegments: e.bs ?? 1,
    });
  return (
    s > 0 && CZ(n),
    e.soft && !Bi && (n = th(n, e.soft === !0 ? 0.85 : e.soft)),
    (n.userData.b = s),
    (n.userData.depth = t - 2 * s),
    n
  );
}
function te(o, t, e = {}) {
  let s = wR(o, t, e);
  return (
    Vg.set(
      0,
      0,
      1,
      (e.x || 0) - s.userData.depth / 2,
      0,
      1,
      0,
      0,
      -1,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
    ),
    Mr(s.applyMatrix4(Vg))
  );
}
function pl(o, t, e = {}) {
  let s = (i) => i.map((a) => [-a[0], a[1], a[2]]),
    n = wR(s(o), t, {
      ...e,
      holes: e.holes ? e.holes.map(s) : null,
    });
  if (
    (Vg.set(
      -1,
      0,
      0,
      e.x || 0,
      0,
      1,
      0,
      e.y || 0,
      0,
      0,
      -1,
      -((e.u || 0) + n.userData.b),
      0,
      0,
      0,
      1,
    ),
    e.swapUV)
  ) {
    let i = n.attributes.uv;
    for (let a = 0; a < i.count; a++) i.setXY(a, i.getY(a), i.getX(a));
  }
  return Mr(n.applyMatrix4(Vg));
}
function bR(o, t, e = {}) {
  let s = wR(o, t, e);
  return (
    Vg.set(
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      (e.y || 0) + s.userData.b,
      0,
      -1,
      0,
      0,
      0,
      0,
      0,
      1,
    ),
    Mr(s.applyMatrix4(Vg))
  );
}
var es = (o, t, e, s, n = 0) => [
  [o, t, n],
  [e, t, n],
  [e, s, n],
  [o, s, n],
];
var yR = (o, t, e, s) =>
  es(o - e / 2, t - s / 2, o + e / 2, t + s / 2, s * 0.49);
var a2 = (o, t, e, s = 14) =>
  Array.from(
    {
      length: s,
    },
    (n, i) => [
      o + Math.cos((i / s) * Math.PI * 2) * e,
      t + Math.sin((i / s) * Math.PI * 2) * e,
    ],
  );
var tE = (o) =>
  Array.from(
    {
      length: 8,
    },
    (t, e) => {
      let s = hh(22.5 + 45 * e),
        n = o / Math.cos(hh(22.5));
      return [Math.cos(s) * n, Math.sin(s) * n];
    },
  );
function Kc(o, t) {
  let e = [],
    s = [],
    n = o.length;
  for (let i = 0; i < n; i++) {
    let a = o[Math.max(0, i - 1)],
      r = o[Math.min(n - 1, i + 1)],
      l = r[0] - a[0],
      c = r[1] - a[1],
      h = Math.hypot(l, c) || 1;
    ((l /= h), (c /= h));
    let f = (o[i][2] ?? t) / 2;
    (e.push([o[i][0] - c * f, o[i][1] + l * f]),
      s.push([o[i][0] + c * f, o[i][1] - l * f]));
  }
  return e.concat(s.reverse());
}
function ki(o, t, e = {}) {
  let s = Bi ? Math.max(6, (e.seg || 16) >> 1) : e.seg || 16,
    n = new CylinderGeometry(e.r2 ?? o, o, t, s, 1, !!e.open);
  return (
    $2(n, Math.PI * 2 * o, t),
    n.rotateX(-Math.PI / 2),
    n.translate(e.x || 0, e.y || 0, -((e.u || 0) + t / 2)),
    Mr(n)
  );
}
function Xo(o, t, e = {}) {
  let s = new CylinderGeometry(o, o, t, Bi ? 6 : e.seg || 12);
  return (
    $2(s, Math.PI * 2 * o, t),
    s.rotateZ(Math.PI / 2),
    s.translate(e.x || 0, e.y || 0, -(e.u || 0)),
    Mr(s)
  );
}
function Ug(o, t, e = {}) {
  let s = new CylinderGeometry(e.r2 ?? o, o, t, Bi ? 6 : e.seg || 12);
  return (
    $2(s, Math.PI * 2 * o, t),
    s.translate(e.x || 0, (e.y || 0) + t / 2, -(e.u || 0)),
    Mr(s)
  );
}
function Y2(o, t = {}) {
  let e = new LatheGeometry(
    o.map(([s, n]) => new Vector2(Math.max(n, 1e-5), s)),
    Bi ? 8 : t.seg || 20,
  );
  return (
    $2(e, 0.06, 0.2),
    Bi || (e = th(e, t.crease ?? 0.6)),
    e.rotateX(-Math.PI / 2),
    e.translate(t.x || 0, t.y || 0, 0),
    Mr(e)
  );
}
function gR(o, t, e, s = 4, n = 10) {
  mR.subVectors(t, o);
  let i = mR.length(),
    a = new CapsuleGeometry(e, i, Bi ? 2 : s, Bi ? 6 : n);
  return (
    $2(a, Math.PI * 2 * e, i + 2 * e),
    a.applyQuaternion(kZ.setFromUnitVectors(MR, mR.normalize())),
    a.translate((o.x + t.x) / 2, (o.y + t.y) / 2, (o.z + t.z) / 2),
    Mr(a)
  );
}
function Ng(o, t, e, s, n = 3) {
  let i = new Ll(o, t, e, Bi ? 1 : n, s);
  return ($2(i, Math.max(o, e), Math.max(t, e)), Mr(i));
}
function eE(o, t = 12, e = 8) {
  let s = new SphereGeometry(o, t, e);
  return ($2(s, Math.PI * 2 * o, Math.PI * o), Mr(s));
}
var sE = (o, t, e) => (
  o.translate(0, -e, 0),
  o.rotateZ(hh(t)),
  o.translate(0, e, 0),
  o
);
var i2 = (o, t, e, s) => (o.translate(t, e, -s), o);
function j2(o, t) {
  let e = o.clone().normalize(),
    s = t.clone().addScaledVector(e, -t.dot(e)).normalize(),
    n = new Vector3().crossVectors(e, s);
  return new Quaternion().setFromRotationMatrix(
    new Matrix4().makeBasis(n, e, s),
  );
}
function Ra() {
  let o = new Map();
  return {
    add(t, ...e) {
      let s = Bi ? HI : t,
        n = o.get(s);
      n || o.set(s, (n = []));
      let i = t.userData.wear || 1,
        a = t.userData.base;
      for (let r of e) {
        if (!r) continue;
        let l = r.attributes.color.array;
        for (let c = 0; c < l.length; c += 3) {
          let h = l[c] > 1.5 ? i : 1;
          Bi
            ? ((l[c] = a.r * h), (l[c + 1] = a.g * h), (l[c + 2] = a.b * h))
            : (l[c] = l[c + 1] = l[c + 2] = h);
        }
        n.push(r);
      }
    },
    build(t, e) {
      for (let [s, n] of o) {
        let i = n.length > 1 ? Vn(n, !1) : n[0];
        e && i.translate(-e.x, -e.y, -e.z);
        let a = s === HI ? tp().world : s,
          r = new Mesh(i, a);
        ((r.castShadow = !a.transparent),
          (r.receiveShadow = !a.transparent),
          a.userData.keep &&
            ((r.userData.keep = !0), (r.name = a.userData.keep)),
          a.transparent && (r.renderOrder = 2),
          t.add(r));
      }
      o.clear();
    },
  };
}
var HI = {};
function Bg(o, t, e, s) {
  let n = new Float32Array(o * o);
  for (let u = 0; u < o; u++)
    for (let d = 0; d < o; d++) n[u * o + d] = t(d, u);
  let i = createCanvas(o),
    a = i.getContext("2d"),
    r = a.createImageData(o, o),
    l = createCanvas(o),
    c = l.getContext("2d"),
    h = c.createImageData(o, o);
  for (let u = 0; u < o; u++)
    for (let d = 0; d < o; d++) {
      let m = (u * o + d) * 4,
        p = (n[u * o + ((d + 1) % o)] - n[u * o + ((d + o - 1) % o)]) * e,
        x = (n[((u + 1) % o) * o + d] - n[((u + o - 1) % o) * o + d]) * e,
        g = 1 / Math.hypot(p, x, 1);
      ((r.data[m] = (-p * g * 0.5 + 0.5) * 255),
        (r.data[m + 1] = (x * g * 0.5 + 0.5) * 255),
        (r.data[m + 2] = (g * 0.5 + 0.5) * 255),
        (r.data[m + 3] = 255));
      let b = Math.max(0, Math.min(1, s ? s(d, u, n[u * o + d]) : 1)) * 255;
      ((h.data[m] = h.data[m + 1] = h.data[m + 2] = b), (h.data[m + 3] = 255));
    }
  (a.putImageData(r, 0, 0), c.putImageData(h, 0, 0));
  let f = (u) => {
    let d = new CanvasTexture(u);
    return ((d.wrapS = d.wrapT = RepeatWrapping), (d.anisotropy = 4), d);
  };
  return {
    n: f(i),
    r: f(l),
  };
}
var Wb = (o, t, e = t) => {
  let s = o.clone();
  return (s.repeat.set(t, e), (s.needsUpdate = !0), s);
};
var xR = null;
function tp() {
  if (xR) return xR;
  let o = createNoise(4107),
    t = createRandom(99),
    e = 256,
    s = new Float32Array(e * e);
  for (let L = 0; L < 60; L++) {
    let A = t() * e,
      O = t() * e,
      H = (t() - 0.5) * 0.9 + (t() < 0.5 ? 0 : 1.57),
      F = 4 + t() * 22,
      P = Math.cos(H),
      z = Math.sin(H),
      k = 0.25 + t() * 0.5;
    for (let I = 0; I < F; I++)
      ((s[(((O | 0) + e) % e) * e + (((A | 0) + e) % e)] = k),
        (A += P),
        (O += z));
  }
  let n = new Float32Array(e * e);
  for (let L = 0; L < n.length; L++) n[L] = t();
  let i = Bg(
      e,
      (L, A) => n[A * e + L] * 0.55 + o.fbm(L / 8, A / 8, 3, 32) * 0.9,
      1.1,
      (L, A) =>
        0.8 + 0.26 * o.fbm(L / 32 + 9, A / 32, 3, 8) - s[A * e + L] * 0.16,
    ),
    a = Bg(
      e,
      (L, A) => o.fbm(L / 2, A / 2, 2, 128) + n[A * e + L] * 0.3,
      1.8,
      (L, A) =>
        0.84 + 0.2 * o.fbm(L / 32, A / 32 + 4, 3, 8) - s[A * e + L] * 0.14,
    ),
    r = Bg(
      e,
      (L, A) => {
        let O = o.fbm(L / 3.2, A / 3.2, 2, e / 3.2);
        return O * O * 2.2;
      },
      2.6,
      (L, A) => 0.86 + 0.16 * o.fbm(L / 32 + 2, A / 32, 2, e / 32),
    ),
    l = Bg(
      e,
      (L, A) => {
        let H = Math.floor(A / 8),
          F = ((L + ((H & 1) * 8) / 2) % 8) - 8 / 2,
          P = (A % 8) - 8 / 2;
        return Math.max(0, 1 - Math.hypot(F, P) / 3.4);
      },
      4.5,
      (L, A, O) => 0.95 - O * 0.25,
    ),
    c = Bg(
      e,
      (L, A) =>
        Math.sin((L * Math.PI) / 4) * Math.sin((A * Math.PI) / 4) * 0.5 +
        0.5 +
        n[A * e + L] * 0.35,
      2.2,
      (L, A) => 0.9 + 0.1 * o.noise(L / 16, A / 16, e / 16),
    ),
    h = Bg(
      e,
      (L, A) =>
        (Math.sin(((L + A) * Math.PI) / 3) * 0.5 + 0.5) * 0.6 +
        o.fbm(L / 32, A / 32, 3, 8) * 2.4 +
        n[A * e + L] * 0.3,
      2.4,
      () => 1,
    ),
    f = createCanvas(512, 256),
    u = f.getContext("2d"),
    d = u.createImageData(512, 256);
  for (let L = 0; L < 256; L++)
    for (let A = 0; A < 512; A++) {
      let O = o.fbm(A / 200, L / 50, 3, 0) * 34,
        H =
          Math.sin((L + O) * 0.85 + o.fbm(A / 110, L / 18, 2, 0) * 4) * 0.5 +
          0.5,
        F = o.fbm(A / 140, L / 2.2, 3, 0),
        P = o.fbm(A / 260 + 3, L / 90, 2, 0),
        z = Math.pow(H, 2.2) * 0.16 + F * 0.52 + P * 0.32,
        k = (L * 512 + A) * 4;
      ((d.data[k] = 44 + z * 50),
        (d.data[k + 1] = 25 + z * 30),
        (d.data[k + 2] = 15 + z * 17),
        (d.data[k + 3] = 255));
    }
  u.putImageData(d, 0, 0);
  let m = new CanvasTexture(f);
  ((m.wrapS = m.wrapT = RepeatWrapping),
    (m.colorSpace = SRGBColorSpace),
    m.repeat.set(3.2, 9),
    (m.anisotropy = 8));
  let p = createCanvas(256),
    x = p.getContext("2d"),
    g = x.createImageData(256, 256),
    b = [
      [52, 54, 46],
      [70, 68, 54],
      [36, 39, 35],
      [88, 80, 62],
    ];
  for (let L = 0; L < 256; L++)
    for (let A = 0; A < 256; A++) {
      let O = o.fbm(A / 42, L / 30, 3, 0),
        H = o.fbm(A / 20 + 40, L / 26 + 7, 2, 0),
        F = b[O > 0.56 ? (H > 0.5 ? 3 : 1) : H > 0.58 ? 2 : 0],
        P = (L * 256 + A) * 4,
        z = 0.9 + n[(L * 256 + A) % n.length] * 0.2;
      ((g.data[P] = F[0] * z),
        (g.data[P + 1] = F[1] * z),
        (g.data[P + 2] = F[2] * z),
        (g.data[P + 3] = 255));
    }
  x.putImageData(g, 0, 0);
  let v = new CanvasTexture(p);
  ((v.wrapS = v.wrapT = RepeatWrapping),
    (v.colorSpace = SRGBColorSpace),
    v.repeat.set(5, 5));
  let y = (L, A, O, H, F, P, z = {}) => {
      let k = new MeshStandardMaterial({
        color: L,
        metalness: A,
        roughness: O,
        vertexColors: !0,
        ...(H
          ? {
              normalMap: Wb(H.n, F),
              roughnessMap: Wb(H.r, H === l ? F : 12),
              normalScale: new Vector2(P, P),
            }
          : {}),
        ...z,
      });
      return (
        (k.userData.base = new Color(L)),
        (k.userData.wear = z.wear || 1),
        delete k.wear,
        k
      );
    },
    M = {
      alu: y(2434602, 0.62, 0.44, i, 90, 0.2),
      aluLt: y(3421755, 0.62, 0.42, i, 90, 0.18),
      steel: y(2829359, 0.88, 0.4, a, 80, 0.2),
      steelBright: y(9409174, 1, 0.27, i, 90, 0.16),
      poly: y(1447447, 0, 0.6, r, 60, 0.26),
      polyMag: y(2303014, 0, 0.55, r, 60, 0.24),
      polyFDE: y(6706751, 0, 0.58, r, 60, 0.22),
      gripFDE: y(6246459, 0, 0.7, l, 34, 0.8),
      grip: y(1315861, 0, 0.72, l, 34, 0.9),
      rubber: y(855310, 0, 0.86, r, 50, 0.4),
      brass: y(12159548, 1, 0.26, i, 90, 0.14),
      copper: y(11823678, 1, 0.3, null),
      black: y(263172, 0, 1, null),
      white: y(14211282, 0, 0.6, null),
      red: y(11871772, 0, 0.5, null),
      wood: y(16777215, 0, 0.46, h, 0, 0, {
        map: m,
      }),
      olive: y(3883056, 0.25, 0.62, r, 60, 0.3),
      trit: y(1845786, 0, 0.4, null, 0, 0, {
        emissive: 9305978,
        emissiveIntensity: 2.6,
      }),
      fiber: y(2754566, 0, 0.4, null, 0, 0, {
        emissive: 16726562,
        emissiveIntensity: 2.2,
      }),
      glove: y(1382170, 0, 0.86, c, 0, 0.8),
      gloveRub: y(526602, 0, 0.56, r, 0, 0.5),
      leather: y(1447706, 0, 0.62, r, 0, 0.7),
      strap: y(2369066, 0, 0.9, c, 0, 1),
      sleeve: y(16777215, 0, 0.92, h, 0, 1, {
        map: v,
      }),
      watch: y(723724, 0, 0.5, null),
      world: new MeshStandardMaterial({
        vertexColors: !0,
        metalness: 0.45,
        roughness: 0.5,
      }),
    },
    w = {
      alu: 2.6,
      aluLt: 2.2,
      steel: 2,
      steelBright: 1.25,
      poly: 1.3,
      polyMag: 1.35,
      polyFDE: 1.18,
      gripFDE: 1.1,
      grip: 1.2,
      brass: 1.15,
      wood: 1,
      olive: 1.5,
      gloveRub: 1.6,
    };
  for (let L in w) M[L].userData.wear = w[L];
  ((M.wood.userData.base = new Color(4204570)),
    (M.sleeve.userData.base = new Color(3816498)));
  for (let [L, A] of [
    ["glove", 260],
    ["gloveRub", 60],
    ["leather", 70],
    ["strap", 300],
    ["sleeve", 26],
  ]) {
    let O = {
      glove: c,
      gloveRub: r,
      leather: r,
      strap: c,
      sleeve: h,
    }[L];
    ((M[L].normalMap = Wb(O.n, A)), (M[L].roughnessMap = Wb(O.r, A)));
  }
  ((M.wood.normalMap = Wb(i.n, 46)),
    M.wood.normalScale.set(0.14, 0.14),
    (M.wood.roughnessMap = null));
  let T = createCanvas(1024, 512),
    S = T.getContext("2d");
  ((S.fillStyle = "#fff"), (S.textBaseline = "middle"));
  let E = {},
    _ = (L, A, O, H, F, P) => {
      (S.save(),
        S.translate(A, O),
        P(H, F),
        S.restore(),
        (E[L] = [A / 1024, 1 - (O + F) / 512, (A + H) / 1024, 1 - O / 512]));
    },
    R = (L, A = 600) =>
      `${A} ${L}px Bahnschrift, "Segoe UI", Arial, sans-serif`;
  (_("ar", 0, 0, 384, 160, (L) => {
    ((S.font = R(74, 700)),
      S.fillText("KR-7", 8, 44),
      (S.font = R(30)),
      S.fillText("CAL 5.56 NATO", 10, 100),
      S.fillText("SN GH07731", 10, 136),
      (S.strokeStyle = "#fff"),
      (S.lineWidth = 4),
      S.strokeRect(250, 14, 118, 58),
      (S.font = R(26, 700)),
      S.fillText("MK II", 272, 45));
  }),
    _("smg", 384, 0, 384, 160, () => {
      ((S.font = R(64, 700)),
        S.fillText("VESPER 9", 8, 42),
        (S.font = R(30)),
        S.fillText("9x19  PARABELLUM", 10, 98),
        S.fillText("SN V9-20418", 10, 134));
    }),
    _("sg", 0, 160, 448, 128, () => {
      ((S.font = R(58, 700)),
        S.fillText("M12 BREACHER", 8, 40),
        (S.font = R(30)),
        S.fillText('12 GA  2\xBE" & 3"   SN B12-0932', 10, 96));
    }),
    _("pistol", 448, 160, 448, 128, () => {
      ((S.font = R(66, 700)),
        S.fillText("STRIX 9", 8, 44),
        (S.font = R(30)),
        S.fillText("9x19   GH-ARMS", 10, 100));
    }),
    _("safe", 0, 300, 120, 44, () => {
      ((S.font = R(34, 700)), S.fillText("SAFE", 4, 24));
    }),
    _("semi", 128, 300, 120, 44, () => {
      ((S.font = R(34, 700)), S.fillText("SEMI", 4, 24));
    }),
    _("auto", 256, 300, 120, 44, () => {
      ((S.font = R(34, 700)), S.fillText("AUTO", 4, 24));
    }),
    _("picto", 384, 300, 200, 60, () => {
      (S.fillRect(8, 8, 36, 44),
        S.clearRect(14, 14, 24, 32),
        S.fillRect(22, 20, 8, 20));
      for (let L = 0; L < 3; L++)
        (S.fillRect(70 + L * 40, 8, 30, 44),
          S.clearRect(75 + L * 40, 13, 20, 34),
          S.fillRect(81 + L * 40, 18, 8, 24));
    }),
    _("warn", 600, 300, 400, 44, () => {
      ((S.font = R(24)),
        S.fillText("WARNING - REFER TO OPERATORS MANUAL", 4, 24));
    }),
    _("nums", 0, 360, 60, 150, () => {
      ((S.font = R(22, 700)),
        [10, 20, 30].forEach((L, A) => S.fillText(String(L), 6, 24 + A * 48)));
    }));
  let C = new CanvasTexture(T);
  return (
    (C.anisotropy = 8),
    (C.colorSpace = SRGBColorSpace),
    (M.mark = new MeshStandardMaterial({
      map: C,
      color: 11843773,
      transparent: !0,
      roughness: 0.5,
      metalness: 0.2,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    })),
    (M.mark.userData = {
      base: new Color(6974576),
      wear: 1,
      cells: E,
    }),
    (M.markRed = M.mark.clone()),
    M.markRed.color.set(12728874),
    (M.markRed.userData = M.mark.userData),
    (M.lens = new ShaderMaterial({
      transparent: !0,
      depthWrite: !1,
      side: DoubleSide,
      premultipliedAlpha: !0,
      uniforms: {
        uDot: {
          value: 0.0027,
        },
        uColor: {
          value: new Vector3(6, 0.3, 0.2),
        },
      },
      vertexShader: `varying vec3 vView; varying vec3 vFwd; varying vec3 vN;
      void main(){ vec4 p = modelViewMatrix * vec4(position, 1.0); vView = p.xyz;
        vFwd = normalize((modelViewMatrix * vec4(0.0, 0.0, -1.0, 0.0)).xyz); vN = normalMatrix * normal;
        gl_Position = projectionMatrix * p; }`,
      fragmentShader: `uniform float uDot; uniform vec3 uColor; varying vec3 vView; varying vec3 vFwd; varying vec3 vN;
      void main(){ vec3 d = normalize(vView); vec3 f = normalize(vFwd);
        float fres = pow(1.0 - abs(dot(d, normalize(vN))), 3.0); vec3 col; float a;
        if (dot(d, f) > 0.0) {
          a = 0.035 + 0.3 * fres; col = vec3(0.03, 0.07, 0.08) * a;
          vec2 dl = d.xy / max(-d.z, 1e-4) - f.xy / max(-f.z, 1e-4); float r = length(dl);
          col += uColor * ((1.0 - smoothstep(uDot * 0.5, uDot, r)) + 0.09 * exp(-r * r / (uDot * uDot * 16.0)));
        } else { a = 0.42 + 0.5 * fres; col = vec3(1.1, 0.32, 0.10) * a * 0.55; }
        gl_FragColor = vec4(col, a); }`,
    })),
    (M.lens.userData = {
      base: new Color(3149834),
      wear: 1,
      keep: "lens",
    }),
    (xR = M)
  );
}
function Jd(o, t, e, s, n, i, a, r) {
  let l = tp(),
    c = l.mark.userData.cells[o],
    h = new PlaneGeometry(t, e),
    f = h.attributes.uv;
  for (let u = 0; u < f.count; u++)
    f.setXY(
      u,
      c[0] + f.getX(u) * (c[2] - c[0]),
      c[1] + f.getY(u) * (c[3] - c[1]),
    );
  return (
    h.rotateY(a < 0 ? -Math.PI / 2 : Math.PI / 2),
    h.translate(s, n, -i),
    Mr(h)
  );
}
var FI = {
  grip: {
    f: [
      [10, 24, 36],
      [80, 160, 212],
      [82, 162, 214],
      [84, 164, 216],
    ],
    splay: [0.36, 0.02, 0, -0.02],
    cup: 50,
    thumb: [
      [0.3, 0.3, 0.9],
      [0.22, 0.86, 0.46],
      [0.06, 0.985, 0.16],
    ],
  },
  cup: {
    f: [
      [6, 84, 150],
      [8, 87, 152],
      [10, 89, 154],
      [12, 91, 156],
    ],
    cup: 30,
    thumb: [
      [0.25, 0.51, 0.82],
      [0.53, 0.75, 0.4],
      [0.64, 0.76, 0.13],
    ],
  },
  wrap: {
    f: [
      [66, 146, 200],
      [70, 150, 204],
      [72, 152, 206],
      [74, 154, 208],
    ],
    cup: 38,
    thumb: [
      [0.3, 0.45, 0.84],
      [0.16, 0.92, 0.36],
      [0.02, 0.99, 0.12],
    ],
  },
};
function OI(o, t, e) {
  let s = tp(),
    n = Ra(),
    i = FI[t] || FI.grip,
    a = new Group();
  a.name = o > 0 ? "handR" : "handL";
  let r = [
      [0.03, 0.046],
      [0.0105, 0.05],
      [-0.0095, 0.047],
      [-0.0285, 0.039],
    ],
    l = [
      [0.044, 0.026, 0.022],
      [0.048, 0.03, 0.023],
      [0.044, 0.028, 0.022],
      [0.034, 0.021, 0.019],
    ],
    c = [0.0098, 0.0091, 0.0085];
  for (let y = 0; y < 4; y++) {
    let M = hs(o * r[y][0], r[y][1], -0.0125),
      w = y === 3 ? 0.9 : 1;
    n.add(s.glove, i2(eE(0.0108 * w), M.x, M.y, -M.z));
    for (let T = 0; T < 3; T++) {
      let S = hh(i.f[y][T]),
        E = i.splay ? i.splay[y] : (1.5 - y) * 0.012,
        _ = hs(o * E, Math.cos(S), Math.sin(S)).normalize(),
        R = M.clone().addScaledVector(_, l[y][T]);
      if ((n.add(s.glove, gR(M, R, c[T] * w)), !Bi && T < 2)) {
        let C = hs(0, Math.sin(S), -Math.cos(S)),
          L = Ng(0.0135 * w, l[y][T] * 0.62, 0.006, 0.0026, 2);
        L.applyQuaternion(j2(_, C.clone().negate()));
        let A = M.clone()
          .lerp(R, 0.5)
          .addScaledVector(C, c[T] * w * 0.72);
        (L.translate(A.x, A.y, A.z), n.add(s.gloveRub, L));
      }
      M = R;
    }
  }
  n.add(s.leather, i2(Ng(0.087, 0.068, 0.028, 0.011), 0, 0.017, 0.014));
  let h = hh(i.cup),
    f = hs(0, -0.014, -0.014),
    u = hs(0, -Math.cos(h), Math.sin(h)),
    d = hs(0, Math.sin(h), Math.cos(h)),
    m = new Quaternion().setFromAxisAngle(hs(1, 0, 0), -h),
    p = (y, M, w) =>
      hs(o * y, M, w)
        .applyQuaternion(m)
        .add(f);
  {
    let y = Ng(0.083, 0.056, 0.03, 0.012);
    y.applyQuaternion(m);
    let M = p(0, -0.022, 0);
    (y.translate(M.x, M.y, M.z), n.add(s.leather, y));
  }
  if (
    (n.add(s.gloveRub, i2(Ng(0.08, 0.021, 0.011, 0.004, 2), 0, 0.041, 0.0295)),
    !Bi)
  ) {
    for (let y = 0; y < 4; y++) {
      let M = eE(0.0092);
      (M.scale(1, 1, 0.62),
        M.translate(o * r[y][0], r[y][1] - 0.003, -0.0325),
        n.add(s.gloveRub, M));
    }
    n.add(
      s.gloveRub,
      i2(Ng(0.05, 0.03, 0.006, 0.0025, 2), -o * 0.004, 0.006, 0.0285),
    );
  }
  {
    let y = p(0.035, -0.006, 0.004),
      M = [0.034, 0.03, 0.025],
      w = [0.0124, 0.0106, 0.0095];
    n.add(s.leather, i2(eE(0.0175), y.x, y.y, -y.z));
    for (let T = 0; T < 3; T++) {
      let S = i.thumb[T],
        E = hs(o * S[0], S[1], S[2]).normalize(),
        _ = y.clone().addScaledVector(E, M[T]);
      (n.add(s.glove, gR(y, _, w[T])), (y = _));
    }
  }
  let x = p(0, -0.05, -0.002),
    g = e.clone().normalize(),
    b = new Quaternion().setFromUnitVectors(MR, g),
    v = (y) => x.clone().addScaledVector(g, y);
  n.add(s.glove, gR(v(-0.012), v(0.05), 0.0315, 4, 12));
  {
    let y = new CylinderGeometry(0.0338, 0.0338, 0.021, 14, 1, !0);
    ($2(y, 0.21, 0.021), y.applyQuaternion(b));
    let M = v(0.034);
    (y.translate(M.x, M.y, M.z), n.add(s.strap, Mr(y)));
  }
  if (!Bi) {
    let y = d.clone().negate(),
      M = Ng(0.026, 0.017, 0.004, 0.0015, 1);
    M.applyQuaternion(j2(g, y));
    let w = v(0.034).addScaledVector(y, 0.0345);
    if ((M.translate(w.x, w.y, w.z), n.add(s.gloveRub, M), o < 0)) {
      let T = j2(y, g),
        S = v(0.068).addScaledVector(y, 0.039),
        E = new CylinderGeometry(0.0185, 0.0195, 0.01, 10);
      (E.applyQuaternion(T), E.translate(S.x, S.y, S.z), n.add(s.watch, Mr(E)));
      let _ = new CylinderGeometry(0.0372, 0.0372, 0.02, 14, 1, !0);
      _.applyQuaternion(b);
      let R = v(0.068);
      (_.translate(R.x, R.y, R.z), n.add(s.watch, Mr(_)));
      let C = new CylinderGeometry(0.0145, 0.0145, 0.0012, 14);
      C.applyQuaternion(T);
      let L = S.clone().addScaledVector(y, 0.0052);
      (C.translate(L.x, L.y, L.z),
        n.add(s.watchFace || (s.watchFace = PZ()), Mr(C)));
    }
  }
  {
    let M = new CylinderGeometry(
        0.064,
        0.0355,
        0.82,
        Bi ? 8 : 16,
        Bi ? 2 : 18,
        !1,
      ),
      w = createNoise(o > 0 ? 311 : 733),
      T = M.attributes.position;
    for (let E = 0; E < T.count; E++) {
      let _ = T.getX(E),
        R = T.getY(E),
        C = T.getZ(E);
      if (Math.hypot(_, C) < 1e-4) continue;
      let A = Math.atan2(C, _),
        O = (R + 0.82 / 2) / 0.82,
        H =
          1 +
          (w.fbm(A * 2.2 + 5, O * 13, 3, 0) - 0.5) * 0.2 +
          Math.sin(O * 66 + A * 2) * 0.018 +
          (O < 0.035 ? 0.07 : 0);
      T.setXYZ(E, _ * H, R, C * H * 0.9);
    }
    (M.computeVertexNormals(),
      $2(M, 0.28, 0.82),
      M.translate(0, 0.82 / 2, 0),
      M.applyQuaternion(b));
    let S = v(0.046);
    (M.translate(S.x, S.y, S.z), n.add(s.sleeve, Mr(M)));
  }
  return (n.build(a), a);
}
function PZ() {
  let o = createCanvas(64),
    t = o.getContext("2d");
  ((t.fillStyle = "#031008"),
    t.fillRect(0, 0, 64, 64),
    (t.fillStyle = "#9dffc8"),
    (t.font = "700 22px Consolas, monospace"),
    (t.textAlign = "center"),
    (t.textBaseline = "middle"),
    t.fillText("18:47", 32, 34));
  let e = new CanvasTexture(o);
  e.colorSpace = SRGBColorSpace;
  let s = new MeshStandardMaterial({
    color: 132099,
    emissive: 16777215,
    emissiveMap: e,
    emissiveIntensity: 0.9,
    roughness: 0.2,
  });
  return (
    (s.userData = {
      base: new Color(663572),
      wear: 1,
    }),
    s
  );
}
function zZ(o = {}) {
  let t = o.right || {},
    e = o.left || {};
  return {
    right: OI(1, t.pose || "grip", t.arm || hs(-0.42, -0.86, -0.28)),
    left: OI(-1, e.pose || "cup", e.arm || hs(0.72, -0.48, -0.5)),
  };
}
var VI = {
  lin: (o) => o,
  io: (o) => o * o * (3 - 2 * o),
  in: (o) => o * o,
  out: (o) => 1 - (1 - o) * (1 - o),
  snap: (o) => o * o * o * o,
  back: (o) => 1 + (1.9 + 1) * Math.pow(o - 1, 3) + 1.9 * Math.pow(o - 1, 2),
};
function un(o, t) {
  if (o <= t[0][0]) return t[0][1];
  for (let e = 1; e < t.length; e++)
    if (o <= t[e][0]) {
      let s = t[e - 1],
        n = t[e],
        i = VI[n[2] || "io"]((o - s[0]) / (n[0] - s[0]));
      return s[1] + (n[1] - s[1]) * i;
    }
  return t[t.length - 1][1];
}
function vR(o, t, e) {
  let s = t[0],
    n = t[0],
    i = 0;
  if (o > t[0][0]) {
    s = n = t[t.length - 1];
    for (let a = 1; a < t.length; a++)
      if (o <= t[a][0]) {
        ((s = t[a - 1]),
          (n = t[a]),
          (i = VI[n[2] || "io"]((o - s[0]) / (n[0] - s[0]))));
        break;
      }
  }
  return e.set(
    s[1][0] + (n[1][0] - s[1][0]) * i,
    s[1][1] + (n[1][1] - s[1][1]) * i,
    s[1][2] + (n[1][2] - s[1][2]) * i,
  );
}
var LZ = {
  pos: new Vector3(),
  rot: new Euler(),
};
var Ta0 = new Euler();
var Sa0 = new Vector3();
var i5 = new Quaternion();
var DZ = new Quaternion();
var Jw = new Vector3();
var _a = (o, t) => ({
  t: o,
  type: "sfx",
  id: t,
});
function nE(o, t) {
  let e = o.hands.left,
    s = o.anchors.gripL,
    n = s.quaternion.clone().invert(),
    i = new Vector3(),
    a = new Quaternion(),
    r = {
      parts: t,
      part(l, c, h, f, u = 0, d = 0, m = 0) {
        let p = t[l];
        if (!p) return;
        let x = p.userData.rest;
        (p.position.set(x.x + c, x.y + h, x.z + f), p.rotation.set(u, d, m));
      },
      begin(l) {
        (l.pos.set(0, 0, 0),
          l.rot.set(0, 0, 0),
          i.copy(s.position),
          a.copy(s.quaternion));
      },
      hand(l, c, h) {
        h <= 0 || (i.lerp(l, h), a.slerp(c, h));
      },
      handAway(l, c, h, f, u, d = 0) {
        u <= 0 ||
          (i5.setFromEuler(l.rot).invert(),
          Jw.set(s.position.x + c, s.position.y + h, s.position.z + f)
            .sub(l.pos)
            .applyQuaternion(i5),
          i5.multiply(s.quaternion),
          d && i5.multiply(DZ.setFromAxisAngle(MR, hh(d))),
          i.lerp(Jw, u),
          a.slerp(i5, u));
      },
      handOn(l, c, h) {
        if (h <= 0) return;
        let f = t[l];
        (Jw.copy(c.p).applyQuaternion(f.quaternion).add(f.position),
          i5.copy(f.quaternion).multiply(c.q),
          i.lerp(Jw, h),
          a.slerp(i5, h));
      },
      end() {
        (e.position.copy(i).sub(s.position).applyQuaternion(n),
          e.quaternion.copy(n).multiply(a));
      },
      hp: i,
      hq: a,
    };
  return (
    (o.resetPose = () => {
      for (let l in t) {
        let c = t[l];
        (c.position.copy(c.userData.rest),
          c.rotation.set(0, 0, 0),
          c.scale.set(1, 1, 1),
          (c.visible = !c.userData.hidden));
      }
      (e.position.set(0, 0, 0),
        e.quaternion.identity(),
        o.hands.right.position.set(0, 0, 0),
        o.hands.right.quaternion.identity());
    }),
    r
  );
}
var Xc = (o, t, e) => ({
  duration: o,
  events: t.sort((s, n) => s.t - n.t),
  apply(s, n) {
    e(Math.min(Math.max(s, 0), o), n || LZ);
  },
});
var r2 = (o, t, e, s = 38, n = 16) =>
  o < t ? 0 : e * Math.sin((o - t) * s) * Math.exp(-(o - t) * n);
function oE(o, t, e = {}) {
  let s = e.idle || (() => {}),
    n = e.away || [-0.03, -0.11, 0.07];
  return {
    draw: Xc(0.4, [_a(0.02, "cloth")], (i, a) => {
      (t.begin(a),
        s(i),
        a.pos.set(
          0.02 *
            (1 -
              un(i, [
                [0, 0],
                [0.34, 1, "out"],
              ])),
          un(i, [
            [0, -0.3],
            [0.3, 0.012, "out"],
            [0.4, 0],
          ]),
          un(i, [
            [0, 0.06],
            [0.34, 0, "out"],
          ]),
        ),
        a.rot.set(
          un(i, [
            [0, -0.85],
            [0.28, 0.05, "out"],
            [0.4, 0],
          ]),
          un(i, [
            [0, 0.25],
            [0.34, 0, "out"],
          ]),
          un(i, [
            [0, 0.3],
            [0.36, 0, "out"],
          ]),
        ),
        t.end());
    }),
    holster: Xc(0.25, [_a(0.02, "cloth")], (i, a) => {
      (t.begin(a),
        s(i),
        a.pos.set(
          0,
          un(i, [
            [0, 0],
            [0.25, -0.32, "in"],
          ]),
          un(i, [
            [0, 0],
            [0.25, 0.05],
          ]),
        ),
        a.rot.set(
          un(i, [
            [0, 0],
            [0.25, -0.8, "in"],
          ]),
          un(i, [
            [0, 0],
            [0.25, 0.2],
          ]),
          un(i, [
            [0, 0],
            [0.25, 0.25],
          ]),
        ),
        t.end());
    }),
    inspect: Xc(
      e.inspectDur || 3.6,
      [_a(0.1, "cloth"), _a(1.75, "cloth"), _a(3, "cloth")],
      (i, a) => {
        (t.begin(a), s(i));
        let r = e.inspectDur || 3.6,
          l = r - 0.75,
          c = un(i, [
            [0.05, 0],
            [0.55, 1],
            [1.55, 1],
            [2.05, 0],
          ]),
          h = un(i, [
            [1.6, 0],
            [2.15, 1],
            [l, 1],
            [r - 0.1, 0],
          ]),
          f = Math.sin(i * 1.7) * 0.03;
        (a.rot.set(
          0.2 * c + 0.12 * h,
          (1.02 + f) * c + (0.78 + f) * h,
          -0.22 * c + 1.32 * h,
        ),
          a.pos.set(
            (e.inspX ?? -0.04) * c + (e.inspX2 ?? -0.06) * h,
            0.035 * c + 0.085 * h,
            -0.02 * c - 0.03 * h,
          ),
          t.handAway(
            a,
            n[0],
            n[1],
            n[2],
            un(i, [
              [0.05, 0],
              [0.4, 1],
              [l + 0.1, 1],
              [r - 0.12, 0],
            ]),
            20,
          ),
          t.end());
      },
    ),
    melee: Xc(0.45, [_a(0.03, "cloth")], (i, a) => {
      (t.begin(a), s(i));
      let r = un(i, [
        [0, 0],
        [0.07, -0.25, "out"],
        [0.17, 1, "snap"],
        [0.24, 0.9],
        [0.45, 0],
      ]);
      (a.rot.set(0.25 * r, 1.15 * r, -0.5 * r),
        a.pos.set(-0.11 * r, 0.03 * r, -0.17 * r + (r < 0 ? -0.2 * r : 0)),
        t.end());
    }),
  };
}
function GI(o, t, e) {
  let s = new Vector3(),
    n = new Vector3(),
    i = e.pull || 0.105,
    a = (r) => {
      let l = r ? e.durEmpty : e.dur,
        c = e.dur / 2,
        h = (r && e.pre) || 0,
        f = (b) => h + b * c,
        u = l - (e.relTail ?? 0.72),
        d = [
          _a(0.04, "cloth"),
          _a(f(0.33), "magout"),
          _a(f(1.19), "magin"),
          {
            t: f(1.22),
            type: "ammo",
          },
          _a(f(1.5), "cloth"),
        ];
      r && (d.push(_a(u, "bolt")), e.pre && d.push(_a(e.pre * 0.7, "bolt")));
      let m = [
          [f(0.32), [0, 0, 0]],
          [f(0.5), [0, -i, 0.004], "in"],
          [f(0.78), e.awayMag],
          [f(0.88), e.awayMag],
          [f(1.08), [-0.004, -i - 0.012, 0.004], "out"],
          [f(1.14), [0, -i, 0]],
          [f(1.23), [0, 0, 0], "in"],
        ],
        p = [
          [f(0.32), [0, 0, 0]],
          [f(0.5), [0.1, 0, 0.05]],
          [f(0.78), [0.7, 0.2, 0.6]],
          [f(0.88), [0.7, 0.2, 0.6]],
          [f(1.08), [0.08, 0, 0.05], "out"],
          [f(1.23), [0, 0, 0]],
        ],
        x = r ? u + 0.12 : f(1.36),
        g =
          r && e.cantKeys
            ? e.cantKeys(f, u, l)
            : [
                [0, 0],
                [0.3 * c, 1],
                [x, 1],
                [l - 0.04, 0],
              ];
      return Xc(l, d, (b, v) => {
        (t.begin(v),
          vR(b, m, s),
          vR(b, p, n),
          t.part("mag", s.x, s.y, s.z, n.x, n.y, n.z));
        let y = un(b, g);
        if (
          (v.rot.set(
            e.cant[0] * y,
            e.cant[1] * y,
            e.cant[2] * y + r2(b, f(1.23), 0.02),
          ),
          v.pos.set(
            e.shift[0] * y,
            e.shift[1] * y + r2(b, f(1.23), 0.006, 30, 14),
            e.shift[2] * y,
          ),
          t.handOn(
            "mag",
            e.hold,
            un(b, [
              [f(0.05), 0],
              [f(0.3), 1],
              [f(1.3), 1],
              [f(1.64), 0],
            ]),
          ),
          r)
        ) {
          let M = b >= u ? Math.min(1, (b - u) / 0.045) : 0;
          e.charge
            ? e.charge(b, t, v, u, M, l)
            : (t.part("bolt", 0, 0, e.boltBack * (1 - M)),
              e.catchPose &&
                t.hand(
                  e.catchPose.p,
                  e.catchPose.q,
                  un(b, [
                    [f(1.3), 0],
                    [u - 0.04, 1, "out"],
                    [u + 0.08, 1],
                    [l - 0.18, 0],
                  ]),
                ),
              (v.rot.z += r2(b, u, -0.035, 34, 15)));
        }
        t.end();
      });
    };
  return {
    reload: a(!1),
    reloadEmpty: a(!0),
  };
}
function NI(o, t, e, s = 0.0206) {
  if (Bi) return te(es(o, e, t, e + 0.0075), s);
  let n = 0.0052,
    i = 0.0042,
    a = 0.0075,
    r = [
      [o, e],
      [o, e + i],
    ];
  for (let l = o + 0.0024; l + n < t - 0.0012; l += 0.01)
    r.push([l, e + i], [l, e + a], [l + n, e + a], [l + n, e + i]);
  return (
    r.push([t, e + i], [t, e]),
    te(r, s, {
      b: 6e-4,
    })
  );
}
function ER(o, t, e, s, n, i, a, r) {
  (t.add(
    o.brass,
    ki(a, i, {
      x: e,
      y: s,
      u: n,
      seg: 10,
    }),
  ),
    t.add(
      o.copper,
      Y2(
        [
          [n + i, a * 0.98],
          [n + i + r * 0.25, a * 0.86],
          [n + i + r * 0.7, a * 0.5],
          [n + i + r, a * 0.08],
        ],
        {
          x: e,
          y: s,
          seg: 10,
          crease: 1.2,
        },
      ),
    ));
}
function mc(o, t, e, s) {
  let n = new Group();
  return (
    (n.name = e),
    n.position.copy(s),
    (n.userData.keep = !0),
    (n.userData.rest = s.clone()),
    o.add(n),
    (t[e] = n),
    n
  );
}
function qb(o, t, e, s, n) {
  let i = new Object3D();
  return (
    (i.name = t),
    i.position.copy(e),
    i.quaternion.copy(j2(s, n)),
    o.add(i),
    i
  );
}
function iE(o, t, e, s = hs(0, 0, 0)) {
  let n = hh(t),
    i = hs(0, -Math.sin(n), -Math.cos(n)),
    a = hs(-1, 0, 0),
    r = qb(o, "gripR", hs(0, 0, 0), i, a);
  return (
    r.position.copy(s).sub(hs(0.04, -0.012, e).applyQuaternion(r.quaternion)),
    (r.position.x = e + 5e-4),
    r
  );
}
function aE(o, t, e, s, n, i) {
  if (!t) {
    o.hands = null;
    return;
  }
  let a = (l, c) =>
      c.clone().normalize().applyQuaternion(l.quaternion.clone().invert()),
    r = zZ({
      right: {
        pose: e,
        arm: a(o.anchors.gripR, n),
      },
      left: {
        pose: s,
        arm: a(o.anchors.gripL, i),
      },
    });
  (o.anchors.gripR.add(r.right), o.anchors.gripL.add(r.left), (o.hands = r));
}
function IZ(o) {
  let t = tp(),
    e = Ra(),
    s = new Group(),
    n = {},
    i = 0.046,
    a = 0.067,
    r = a + 0.0075,
    l = r + 0.0345,
    c = [
      [-0.034, 0.024],
      [0.16, 0.024],
      [0.16, 0.061],
      [0.154, a],
      [-0.016, a],
      [-0.034, 0.058],
    ];
  if (o) {
    (e.add(
      t.alu,
      te(c, 0.0325, {
        x: -0.00175,
        b: 0.0012,
      }),
    ),
      e.add(
        t.alu,
        te(c, 0.0035, {
          x: 0.01625,
          b: 7e-4,
          holes: [es(0.06, 0.039, 0.128, 0.0585, 0.003)],
        }),
      ),
      e.add(
        t.black,
        te(es(0.058, 0.037, 0.13, 0.06), 3e-4, {
          x: 0.01465,
          b: 0,
        }),
      ));
    let T = te(es(0.058, 0.0205, 0.13, 0.0375, 0.002), 0.0013, {
      x: 0,
      b: 4e-4,
    });
    (T.translate(0, -0.0375, 0),
      T.rotateZ(hh(-14)),
      T.translate(0.0192, 0.0375, 0),
      e.add(t.alu, T),
      e.add(
        t.steel,
        ki(0.0016, 0.076, {
          x: 0.0188,
          y: 0.0378,
          u: 0.056,
          seg: 6,
        }),
      ),
      e.add(
        t.alu,
        te(es(-0.01, 0.038, 0.014, 0.057, 0.004), 0.006, {
          x: 0.0195,
          b: 0.002,
          bs: 2,
        }),
      ),
      e.add(
        t.steel,
        ki(0.0058, 0.02, {
          x: 0.0215,
          y: 0.0475,
          u: -0.028,
          seg: 12,
        }),
        ki(0.0072, 0.004, {
          x: 0.0215,
          y: 0.0475,
          u: -0.031,
          seg: 12,
        }),
      ),
      e.add(
        t.alu,
        bR(
          [
            [0.0175, 0.03],
            [0.0175, 0.057],
            [0.0265, 0.051, 0.002],
          ],
          0.021,
          {
            y: 0.0385,
            b: 0.001,
          },
        ),
      ),
      e.add(
        t.alu,
        te(
          [
            [0.018, 0.029, 0.003],
            [0.152, 0.029, 0.003],
            [0.152, 0.058, 0.004],
            [0.06, 0.062, 0.004],
            [0.03, 0.05, 0.006],
          ],
          0.0014,
          {
            x: -0.0185,
            b: 6e-4,
          },
        ),
      ),
      e.add(
        t.alu,
        te(es(-0.03, 0.03, 0.006, 0.052, 0.004), 0.0012, {
          x: -0.0184,
          b: 5e-4,
        }),
      ));
  } else e.add(t.alu, te(c, 0.036));
  e.add(t.alu, NI(-0.014, 0.1585, a));
  let h = mc(s, n, "bolt", $n(0.0161, 0.048, 0.094));
  if (o) {
    let T = Ra();
    (T.add(
      t.steelBright,
      te(es(0.062, 0.0405, 0.1265, 0.057, 0.002), 0.0022, {
        x: 0.0161,
        b: 5e-4,
      }),
    ),
      T.add(
        t.black,
        te(es(0.094, 0.0455, 0.0985, 0.0495, 0.001), 4e-4, {
          x: 0.0173,
          b: 0,
        }),
        te(es(0.104, 0.0455, 0.1085, 0.0495, 0.001), 4e-4, {
          x: 0.0173,
          b: 0,
        }),
      ),
      T.build(h, h.position));
  }
  let f = mc(s, n, "chargingHandle", $n(0, 0.062, -0.045));
  {
    let T = o ? Ra() : e;
    (T.add(
      t.steel,
      bR(
        [
          [-0.0055, 0.02],
          [0.0055, 0.02],
          [0.0055, -0.04],
          [0.0245, -0.0425, 0.003],
          [0.0245, -0.0515, 0.004],
          [-0.0245, -0.0515, 0.004],
          [-0.0245, -0.0425, 0.003],
          [-0.0055, -0.04],
        ],
        0.0052,
        {
          y: 0.0592,
          b: 0.0012,
        },
      ),
    ),
      o &&
        (T.add(
          t.steel,
          te(es(-0.0505, 0.0585, -0.0455, 0.0655, 0.001), 0.01, {
            x: -0.0195,
            b: 8e-4,
          }),
        ),
        T.build(f, f.position)));
  }
  let u = [
    [-0.048, 0.066, 0.005],
    [-0.034, 0.066],
    [-0.034, 0.024],
    [0.176, 0.024],
    [0.178, 0.011, 0.004],
    [0.16, 0.004, 0.002],
    [0.157, -0.04],
    [0.161, -0.046, 0.0015],
    [0.088, -0.038, 0.003],
    [0.086, -0.012, 0.003],
    [0.04, -0.012],
    [0.034, -0.007],
    [-0.004, -0.007],
    [-0.018, 0.004, 0.006],
    [-0.048, 0.012, 0.006],
  ];
  if (
    (e.add(
      t.alu,
      te(u, 0.031, {
        b: 0.0012,
      }),
    ),
    e.add(
      t.poly,
      te(
        Kc(
          [
            [0.037, -0.028],
            [0.046, -0.0425],
            [0.074, -0.0445],
            [0.0875, -0.036],
          ],
          0.003,
        ),
        0.014,
        {
          b: 9e-4,
        },
      ),
    ),
    o)
  ) {
    e.add(
      t.black,
      te(
        Kc(
          [
            [0.093, -0.0388],
            [0.156, -0.0458],
          ],
          6e-4,
        ),
        0.022,
        {
          b: 0,
        },
      ),
    );
    for (let [T, S, E] of [
      [-0.02, 0.017, 0.0036],
      [0.166, 0.0145, 0.0036],
      [0.05, 0.003, 0.0019],
      [0.029, 0.008, 0.0019],
    ])
      e.add(
        t.steel,
        Xo(E, 0.0336, {
          y: S,
          u: T,
        }),
      );
    (e.add(
      t.steel,
      Xo(0.0052, 0.003, {
        x: -0.0166,
        y: 0.012,
        u: 0.01,
      }),
      te(
        [
          [0.004, 0.0095, 0.001],
          [0.027, 0.0125, 0.0015],
          [0.027, 0.0165, 0.0015],
          [0.004, 0.0145, 0.001],
        ],
        0.0032,
        {
          x: -0.0186,
          b: 0.001,
        },
      ),
    ),
      e.add(
        t.steel,
        Xo(0.0045, 0.002, {
          x: 0.0162,
          y: 0.012,
          u: 0.01,
        }),
      ),
      e.add(
        t.steel,
        te(
          [
            [0.098, 0.02, 0.002],
            [0.114, 0.02, 0.002],
            [0.116, 0.046, 0.003],
            [0.104, 0.05, 0.003],
            [0.1, 0.034],
          ],
          0.0035,
          {
            x: -0.0172,
            b: 0.001,
          },
        ),
      ));
    for (let T = 0; T < 4; T++)
      e.add(
        t.steel,
        te(es(0.104, 0.036 + T * 0.0032, 0.1145, 0.0372 + T * 0.0032), 0.001, {
          x: -0.0193,
          b: 3e-4,
        }),
      );
    (e.add(
      t.steel,
      Xo(0.0042, 0.003, {
        x: 0.0168,
        y: 0.006,
        u: 0.078,
      }),
    ),
      e.add(
        t.alu,
        te(
          Kc(
            [
              [0.068, 0.0125],
              [0.07, -0.002],
              [0.086, -0.002],
              [0.088, 0.0125],
            ],
            0.0022,
          ),
          0.003,
          {
            x: 0.0165,
            b: 7e-4,
          },
        ),
      ));
    for (let T = 0; T < 4; T++)
      e.add(
        t.alu,
        te(es(0.1575, -0.034 + T * 0.008, 0.1592, -0.0305 + T * 0.008), 0.022, {
          b: 5e-4,
        }),
      );
    for (let T of [-1, 1])
      (e.add(
        t.alu,
        te(
          [
            [0.092, -0.034, 0.003],
            [0.154, -0.041, 0.002],
            [0.1545, 0.018, 0.003],
            [0.1, 0.018, 0.006],
            [0.092, 0.004, 0.004],
          ],
          0.0013,
          {
            x: T * 0.0161,
            b: 6e-4,
          },
        ),
      ),
        e.add(
          t.alu,
          Xo(0.0068, 0.0012, {
            x: T * 0.0161,
            y: 0.017,
            u: -0.02,
            seg: 16,
          }),
          Xo(0.0068, 0.0012, {
            x: T * 0.0161,
            y: 0.0145,
            u: 0.166,
            seg: 16,
          }),
        ),
        e.add(
          t.alu,
          te(
            [
              [-0.012, -0.004, 0.003],
              [0.07, -0.009, 0.003],
              [0.07, 5e-4, 0.002],
              [-0.01, 0.0035, 0.002],
            ],
            0.001,
            {
              x: T * 0.016,
              b: 4e-4,
            },
          ),
        ));
    (e.add(
      t.mark,
      Jd("ar", 0.046, 0.019, -0.0171, -0.012, 0.1235, -1),
      Jd("safe", 0.011, 0.004, -0.0158, 0.0205, 0.004, -1),
      Jd("semi", 0.011, 0.004, -0.0158, 0.019, 0.028, -1),
    ),
      e.add(t.mark, Jd("warn", 0.05, 0.0055, 0.0183, 0.03, 0.03, 1)));
  }
  (e.add(
    t.alu,
    ki(0.0148, 0.186, {
      y: i,
      u: -0.22,
      seg: 18,
    }),
  ),
    o &&
      (e.add(
        t.steel,
        ki(0.0196, 0.009, {
          y: i,
          u: -0.0585,
          seg: 12,
        }),
      ),
      e.add(
        t.steel,
        pl(es(-0.0175, i - 0.027, 0.0175, i + 0.021, 0.005), 0.003, {
          u: -0.0515,
          b: 8e-4,
        }),
      )));
  let d = [
    [0.04, -0.01],
    [0.0405, -0.022, 0.003],
    [0.033, -0.036, 0.006],
    [0.011, -0.104, 0.008],
    [-0.04, -0.1, 0.01],
    [-0.016, -0.034, 0.03],
    [-0.005, -0.004, 0.008],
    [-0.018, 0.004, 0.003],
    [-0.016, 0.009],
    [0.03, -0.006],
  ];
  e.add(
    t.gripFDE,
    te(d, 0.033, {
      b: 0.0045,
      bs: 3,
      soft: !0,
    }),
  );
  let m = mc(s, n, "trigger", $n(0, -0.007, 0.0605));
  {
    let T = o ? Ra() : e;
    (T.add(
      t.steel,
      te(
        Kc(
          [
            [0.061, -0.007],
            [0.0588, -0.015],
            [0.0574, -0.022],
            [0.0576, -0.029],
            [0.0598, -0.0345],
          ],
          0.0042,
        ),
        0.0066,
        {
          b: 0.0013,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      o && T.build(m, m.position));
  }
  let p = [
    [-0.094, 0.066, 0.004],
    [-0.262, 0.066, 0.006],
    [-0.272, 0.056, 0.004],
    [-0.274, -0.064, 0.008],
    [-0.256, -0.068, 0.004],
    [-0.205, -0.016, 0.012],
    [-0.118, 0.02, 0.006],
    [-0.094, 0.022, 0.003],
  ];
  if (
    (e.add(
      t.polyFDE,
      te(p, 0.036, {
        b: 0.004,
        bs: 2,
        soft: !0,
        keepHoles: !0,
        holes: [
          [
            [-0.214, 0.014, 0.004],
            [-0.25, 0.012, 0.004],
            [-0.252, -0.034, 0.005],
          ],
          yR(-0.258, 0.045, 0.006, 0.02),
        ],
      }),
    ),
    e.add(
      t.polyFDE,
      te(
        [
          [-0.096, 0.068, 0.004],
          [-0.25, 0.068, 0.006],
          [-0.25, 0.046, 0.004],
          [-0.17, 0.04, 0.004],
          [-0.096, 0.046, 0.004],
        ],
        0.042,
        {
          b: 0.006,
          bs: 3,
          soft: !0,
        },
      ),
    ),
    e.add(
      t.polyFDE,
      te(
        [
          [-0.252, 0.066, 0.004],
          [-0.2735, 0.06, 0.004],
          [-0.2745, -0.066, 0.006],
          [-0.258, -0.069, 0.004],
          [-0.246, -0.052, 0.004],
          [-0.262, -0.02, 0.01],
          [-0.262, 0.03, 0.01],
        ],
        0.042,
        {
          b: 0.004,
          bs: 2,
          soft: !0,
        },
      ),
    ),
    o)
  )
    for (let T = 0; T < 5; T++)
      e.add(
        t.polyFDE,
        te(
          es(-0.156 + T * 0.012, 0.05, -0.151 + T * 0.012, 0.064, 0.001),
          0.0432,
          {
            b: 7e-4,
          },
        ),
      );
  if (
    (e.add(
      t.rubber,
      te(
        [
          [-0.2725, 0.06, 0.003],
          [-0.283, 0.056, 0.004],
          [-0.285, -0.064, 0.005],
          [-0.2745, -0.068, 0.003],
        ],
        0.0385,
        {
          b: 0.004,
          bs: 2,
          soft: !0,
        },
      ),
    ),
    o)
  ) {
    e.add(
      t.polyFDE,
      te(
        [
          [-0.16, 0.0035, 0.002],
          [-0.122, 0.014, 0.002],
          [-0.118, 0.021],
          [-0.165, 0.012, 0.002],
        ],
        0.015,
        {
          b: 0.002,
          bs: 2,
        },
      ),
    );
    for (let T of [-1, 1])
      e.add(
        t.steel,
        Xo(0.0062, 0.0016, {
          x: T * 0.0203,
          y: 0.046,
          u: -0.243,
          seg: 14,
        }),
        i2(
          Xo(0.0038, 0.0018, {
            seg: 10,
          }),
          T * 0.0204,
          0.046,
          -0.243,
        ),
      );
    for (let T = 0; T < 7; T++)
      e.add(
        t.rubber,
        te(
          es(-0.2862, -0.058 + T * 0.017, -0.2845, -0.05 + T * 0.017, 6e-4),
          0.032,
          {
            b: 5e-4,
          },
        ),
      );
  }
  if (
    (e.add(
      t.steel,
      Y2(
        [
          [0.15, 0.0125],
          [0.196, 0.0125],
          [0.2, 0.0108],
          [0.318, 0.0108],
          [0.318, 0.0122],
          [0.346, 0.0122],
          [0.346, 0.0092],
          [0.447, 0.0092],
        ],
        {
          y: i,
        },
      ),
    ),
    o)
  ) {
    (e.add(
      t.steel,
      te(es(0.32, i + 0.008, 0.344, i + 0.0185, 0.002), 0.012, {
        b: 0.001,
      }),
      ki(0.0024, 0.166, {
        y: i + 0.0152,
        u: 0.156,
        seg: 8,
      }),
    ),
      e.add(
        t.steel,
        Y2(
          [
            [0.447, 0.0092],
            [0.447, 0.0116],
            [0.4615, 0.0116],
            [0.4635, 0.0106],
          ],
          {
            y: i,
          },
        ),
      ));
    for (let T = 0; T < 6; T++)
      e.add(
        t.steel,
        sE(
          i2(
            te(es(0.462, 0.0074, 0.5008, 0.0113), 0.0056, {
              b: 7e-4,
            }),
            0,
            i,
            0,
          ),
          T * 60,
          i,
        ),
      );
    (e.add(
      t.steel,
      Y2(
        [
          [0.5, 0.0106],
          [0.5018, 0.0116],
          [0.5095, 0.0116],
          [0.512, 0.0102],
          [0.512, 0.0056],
          [0.466, 0.0056],
        ],
        {
          y: i,
        },
      ),
    ),
      e.add(
        t.black,
        ki(0.0066, 0.039, {
          y: i,
          u: 0.4625,
          seg: 10,
        }),
        ki(0.0056, 5e-4, {
          y: i,
          u: 0.4662,
          seg: 10,
        }),
      ));
  } else
    e.add(
      t.steel,
      ki(0.0114, 0.065, {
        y: i,
        u: 0.447,
        seg: 12,
      }),
    );
  let x = 0.163,
    g = 0.432,
    b = 0.021;
  if (o) {
    let S = 2 * b * Math.tan(Math.PI / 8) + 0.0022,
      E = (_, R, C, L, A) =>
        Array.from(
          {
            length: _,
          },
          (O, H) => yR(R + H * C, 0, L, A),
        );
    for (let _ of [0, 45, 90, 135, 180, 225, 270, 315]) {
      let R =
          _ === 90
            ? null
            : _ % 90
              ? E(9, x + 0.034, 0.0265, 0.015, 0.0062)
              : E(5, x + 0.048, 0.047, 0.032, 0.0072),
        C = te(
          es(
            x + 0.014,
            -S / 2,
            g - (_ === 270 ? 0.012 : _ === 90 ? 0 : 0.005),
            S / 2,
          ),
          0.0028,
          {
            x: b - 0.0028 / 2,
            b: 6e-4,
            holes: R,
          },
        );
      (C.rotateZ(hh(_)), C.translate(0, i, 0), e.add(t.alu, C));
    }
    (e.add(
      t.alu,
      pl(tE(b + 9e-4), 0.018, {
        u: x - 0.002,
        y: i,
        holes: [a2(0, 0, 0.0128)],
        b: 9e-4,
      }),
    ),
      e.add(
        t.alu,
        pl(tE(b + 5e-4), 0.0045, {
          u: g - 0.0085,
          y: i,
          holes: [a2(0, 0, 0.0138)],
          b: 8e-4,
        }),
      ));
    for (let _ of [-1, 1])
      for (let R of [0.168, 0.176])
        e.add(
          t.steel,
          Xo(0.0022, 0.0012, {
            x: _ * (b + 0.0012),
            y: i - 0.006,
            u: R,
            seg: 6,
          }),
        );
    for (let _ of [-1, 1])
      e.add(
        t.steel,
        Xo(0.0062, 0.0014, {
          x: _ * (b + 6e-4),
          y: i + 5e-4,
          u: 0.1925,
          seg: 14,
        }),
        Xo(0.0036, 0.0016, {
          x: _ * (b + 6e-4),
          y: i + 5e-4,
          u: 0.1925,
          seg: 10,
        }),
      );
  } else
    e.add(
      t.alu,
      pl(tE(b), g - x, {
        u: x,
        y: i,
      }),
    );
  if ((e.add(t.alu, NI(x, g, a)), o)) {
    let T = (S, E) => {
      let _ = (R) => S + R * E;
      (e.add(
        t.steel,
        te(
          [
            [_(0), r],
            [_(0.038), r],
            [_(0.038), r + 0.0072, 0.002],
            [_(0.008), r + 0.0098, 0.002],
            [_(0), r + 0.008, 0.002],
          ],
          0.0235,
          {
            b: 0.001,
          },
        ),
      ),
        e.add(
          t.steel,
          Xo(0.0026, 0.027, {
            y: r + 0.0048,
            u: _(0.006),
            seg: 8,
          }),
          te(
            es(
              Math.min(_(0.012), _(0.034)),
              r + 0.0085,
              Math.max(_(0.012), _(0.034)),
              r + 0.0108,
              0.001,
            ),
            0.011,
            {
              b: 6e-4,
            },
          ),
        ));
    };
    (T(-0.012, 1), T(0.4275, -1));
  }
  {
    e.add(
      t.aluLt,
      te(
        [
          [0.046, r],
          [0.112, r],
          [0.112, r + 0.012],
          [0.102, r + 0.0165, 0.003],
          [0.06, r + 0.0165, 0.003],
          [0.046, r + 0.01, 0.003],
        ],
        0.034,
        {
          b: 0.0016,
        },
      ),
    );
    let T = 0.0212,
      S = 0.017,
      E = 0.0044,
      _ = (R, C, L, A, O) => [
        [R, C, O],
        [L, C, O],
        [L, A, O],
        [R, A, O],
      ];
    if (o) {
      e.add(
        t.aluLt,
        pl(_(-T, l - S, T, l + S, 0.008), 0.018, {
          u: 0.093,
          holes: [_(-T + E, l - S + E, T - E, l + S - E, 0.0045)],
          b: 0.001,
        }),
      );
      for (let C of [-1, 1])
        e.add(
          t.aluLt,
          te(
            [
              [0.06, r + 0.015],
              [0.096, r + 0.015],
              [0.096, l + 0.004],
              [0.09, l + 0.008, 0.002],
            ],
            0.0042,
            {
              x: C * 0.019,
              b: 0.0012,
            },
          ),
        );
      (e.add(
        t.aluLt,
        te(es(0.05, r + 0.012, 0.068, r + 0.019, 0.002), 0.019, {
          b: 0.0012,
        }),
      ),
        e.add(
          t.black,
          te(es(0.0676, r + 0.0135, 0.0682, r + 0.0178), 0.006, {
            b: 0,
          }),
        ));
      for (let C of [0.066, 0.094])
        e.add(
          t.steel,
          Xo(0.0056, 0.0065, {
            x: -0.0198,
            y: r + 0.0042,
            u: C,
            seg: 6,
          }),
          Xo(0.003, 0.004, {
            x: 0.0185,
            y: r + 0.0042,
            u: C,
            seg: 8,
          }),
        );
      e.add(
        t.steel,
        Xo(0.0078, 0.004, {
          x: 0.0188,
          y: r + 0.0105,
          u: 0.082,
          seg: 16,
        }),
        te(es(0.0765, r + 0.0098, 0.0875, r + 0.0112), 8e-4, {
          x: 0.021,
          b: 0,
        }),
      );
      for (let C of [0.076, 0.088])
        e.add(
          t.rubber,
          te(es(C - 0.004, r + 0.0065, C + 0.004, r + 0.0135, 0.002), 0.0016, {
            x: -0.0178,
            b: 6e-4,
          }),
        );
      let R = new ShapeGeometry(
        UI(
          _(-T + E * 0.6, l - S + E * 0.6, T - E * 0.6, l + S - E * 0.6, 0.005),
        ),
        4,
      );
      (R.translate(0, 0, -0.1035), e.add(t.lens, Mr(R)));
    } else
      e.add(
        t.aluLt,
        pl(_(-T, l - S, T, l + S, 0.007), 0.012, {
          u: 0.097,
        }),
      );
  }
  let v = mc(s, n, "mag", $n(0, -0.04, 0.122));
  {
    let T = o ? Ra() : e,
      S = [
        [0.09, 0.012],
        [0.1525, 0.012],
        [0.1525, -0.046],
        [0.156, -0.096],
        [0.166, -0.15, 0.004],
        [0.107, -0.166, 0.004],
        [0.095, -0.104],
        [0.09, -0.046],
      ];
    if (
      (T.add(
        t.polyMag,
        te(S, 0.0224, {
          b: 0.002,
          bs: 2,
          soft: !0,
        }),
      ),
      T.add(
        t.polyMag,
        te(
          [
            [0.1035, -0.1595],
            [0.168, -0.1435, 0.003],
            [0.1705, -0.152, 0.003],
            [0.105, -0.1725, 0.003],
            [0.101, -0.168, 0.002],
          ],
          0.0264,
          {
            b: 0.0016,
            bs: 2,
          },
        ),
      ),
      o)
    ) {
      let E = (_, R) => {
        let C = R
            ? [
                [0.09, -0.046],
                [0.095, -0.104],
                [0.107, -0.166],
              ]
            : [
                [0.1525, -0.046],
                [0.156, -0.096],
                [0.166, -0.15],
              ],
          L = _ > C[1][1] ? 0 : 1,
          A = C[L],
          O = C[L + 1];
        return A[0] + ((O[0] - A[0]) * (_ - A[1])) / (O[1] - A[1]);
      };
      for (let _ of [-0.064, -0.086, -0.108, -0.13])
        T.add(
          t.polyMag,
          te(
            es(E(_, !0) + 0.005, _ - 0.004, E(_, !1) - 0.005, _ + 0.004, 0.002),
            0.024,
            {
              b: 7e-4,
            },
          ),
        );
      (T.add(
        t.polyMag,
        te(
          Kc(
            [
              [0.1545, -0.05],
              [0.158, -0.096],
              [0.167, -0.146],
            ],
            0.0028,
          ),
          0.01,
          {
            b: 9e-4,
          },
        ),
      ),
        ER(t, T, 0.0028, 0.0128, 0.094, 0.0445, 0.0047, 0.0135),
        T.add(
          t.black,
          te(es(0.094, 0.0118, 0.15, 0.0124), 0.016, {
            b: 0,
          }),
        ),
        T.build(v, v.position));
    }
  }
  let y = {
    id: "ar",
    root: s,
    parts: n,
    anchors: {
      muzzle: $n(0, i, 0.512),
      eject: $n(0.019, 0.049, 0.096),
      ejectDir: hs(0.86, 0.36, 0.36).normalize(),
      sight: $n(0, l, 0.05),
      gripR: iE(s, 22, 0.0165),
      gripL: qb(
        s,
        "gripL",
        $n(-0.029, i - b - 0.0015, 0.28),
        hs(0.62, 0, -0.78),
        hs(0.25, 0.97, 0),
      ),
    },
    hip: {
      pos: hs(0.115, -0.15, -0.27),
      rot: new Euler(0.03, 0.07, 0),
    },
    adsDist: 0.11,
  };
  if (
    (e.build(s),
    aE(y, o, "grip", "cup", hs(0.26, -0.4, 0.88), hs(-0.44, -0.5, 0.75)),
    !o)
  )
    return y;
  let M = nE(y, n),
    w = () => {};
  return (
    (y.clips = {
      fire: Xc(
        0.09,
        [
          {
            t: 0.02,
            type: "eject",
          },
        ],
        (T, S) => {
          (M.begin(S),
            M.part(
              "bolt",
              0,
              0,
              un(T, [
                [0, 0],
                [0.034, 0.058, "out"],
                [0.05, 0.058],
                [0.09, 0, "in"],
              ]),
            ),
            M.part(
              "trigger",
              0,
              0,
              0,
              un(T, [
                [0, 0],
                [0.012, -0.22],
                [0.05, -0.22],
                [0.09, 0],
              ]),
            ),
            M.end());
        },
      ),
      ...GI(y, M, {
        dur: 2,
        durEmpty: 2.5,
        boltBack: 0.058,
        cant: [0.15, 0.45, -0.6],
        shift: [0, 0.05, 0],
        pull: 0.105,
        awayMag: [-0.1, -0.42, 0.1],
        hold: {
          p: hs(-0.0122, -0.062, 0.004),
          q: j2(hs(0.02, 0.16, -1), hs(1, 0, 0.05)),
        },
        catchPose: {
          p: $n(-0.028, 0.01, 0.088),
          q: j2(hs(0.12, 0.45, -0.88), hs(1, 0.05, 0.1)),
        },
      }),
      ...oE(y, M, {
        idle: w,
      }),
    }),
    y
  );
}
function HZ(o) {
  let t = tp(),
    e = Ra(),
    s = new Group(),
    n = {},
    i = 0.036,
    a = 0.06,
    r = 0.068,
    l = a + 0.025;
  if (
    (e.add(
      t.steel,
      te(
        [
          [-0.062, 0.016, 0.006],
          [0.17, 0.016],
          [0.17, r, 0.004],
          [-0.05, r, 0.01],
          [-0.062, 0.056, 0.006],
        ],
        0.038,
        {
          b: 0.008,
          bs: 3,
          soft: !0,
        },
      ),
    ),
    e.add(
      t.steel,
      te(
        [
          [-0.074, 0.022, 0.008],
          [-0.06, 0.019],
          [-0.06, 0.065],
          [-0.074, 0.06, 0.008],
        ],
        0.035,
        {
          b: 0.008,
          bs: 3,
          soft: !0,
        },
      ),
    ),
    o)
  ) {
    (e.add(
      t.steel,
      te(es(-0.04, 0.0455, 0.15, 0.0515, 0.003), 0.0396, {
        b: 0.001,
      }),
      te(es(-0.04, 0.0265, 0.06, 0.0315, 0.0025), 0.0394, {
        b: 0.001,
      }),
    ),
      e.add(
        t.steel,
        te(es(0.068, 0.0345, 0.124, 0.0575, 0.004), 0.0014, {
          x: 0.0197,
          b: 5e-4,
          holes: [es(0.073, 0.0385, 0.119, 0.0535, 0.0025)],
        }),
      ),
      e.add(
        t.black,
        te(es(0.073, 0.0385, 0.119, 0.0535), 3e-4, {
          x: 0.01915,
          b: 0,
        }),
      ));
    for (let [y, M] of [
      [-0.03, 0.022],
      [0.062, 0.022],
      [0.15, 0.024],
    ])
      e.add(
        t.steelBright,
        Xo(0.0026, 0.0388, {
          y: M,
          u: y,
          seg: 8,
        }),
      );
    (e.add(
      t.steel,
      Xo(0.0032, 0.037, {
        y: 0.058,
        u: -0.067,
        seg: 10,
      }),
    ),
      e.add(t.mark, Jd("smg", 0.046, 0.019, -0.01925, 0.034, 0.112, -1)));
  }
  let c = mc(s, n, "bolt", $n(0.0195, 0.046, 0.096));
  if (o) {
    let y = Ra();
    (y.add(
      t.steelBright,
      te(es(0.0745, 0.0395, 0.118, 0.0525, 0.002), 9e-4, {
        x: 0.0196,
        b: 3e-4,
      }),
    ),
      y.add(
        t.black,
        te(es(0.1, 0.044, 0.11, 0.048, 0.001), 3e-4, {
          x: 0.0202,
          b: 0,
        }),
      ),
      y.build(c, c.position));
  }
  if (
    (e.add(
      t.steel,
      ki(0.0115, 0.166, {
        y: a,
        u: 0.168,
        seg: 18,
      }),
      Y2(
        [
          [0.334, 0.0115],
          [0.337, 0.0105],
          [0.337, 1e-4],
        ],
        {
          y: a,
        },
      ),
    ),
    e.add(
      t.steel,
      Y2(
        [
          [0.168, 0.0095],
          [0.3, 0.0095],
          [0.3, 0.0084],
          [0.336, 0.0084],
          [0.336, 0.0104],
          [0.3505, 0.0104],
          [0.3525, 0.0094],
          [0.3525, 0.0047],
          [0.32, 0.0047],
        ],
        {
          y: i,
        },
      ),
    ),
    o)
  ) {
    e.add(
      t.black,
      ki(0.0047, 5e-4, {
        y: i,
        u: 0.32,
        seg: 10,
      }),
    );
    for (let y = 0; y < 3; y++)
      e.add(
        t.steel,
        sE(
          i2(
            te(es(0.338, 0.01, 0.3445, 0.0122, 6e-4), 0.006, {
              b: 6e-4,
            }),
            0,
            i,
            0,
          ),
          y * 120 + 60,
          i,
        ),
      );
    for (let y of [
      es(0.2, -0.0014, 0.302, 0.0014, 0.0012),
      es(0.2, -0.0062, 0.212, -0.001, 0.0015),
    ]) {
      let M = te(y, 5e-4, {
        x: 0.01152,
        b: 0,
      });
      (M.rotateZ(hh(150)), M.translate(0, a, 0), e.add(t.black, M));
    }
  }
  let h = mc(s, n, "chargingHandle", $n(0, a, 0.292));
  {
    let y = o ? Ra() : e,
      M = Xo(0.0042, 0.016, {
        x: 0.0195,
        seg: 10,
      }),
      w = Xo(0.0072, 0.013, {
        x: 0.031,
        seg: 12,
      });
    for (let T of [M, w]) (T.rotateZ(hh(150)), T.translate(0, a, -0.292));
    (y.add(t.steel, M), y.add(t.poly, w), o && y.build(h, h.position));
  }
  if (
    (e.add(
      t.steel,
      te(
        [
          [0.312, a + 0.009],
          [0.336, a + 0.009],
          [0.334, a + 0.0145, 0.002],
          [0.314, a + 0.0145, 0.002],
        ],
        0.014,
        {
          b: 0.001,
        },
      ),
    ),
    o
      ? (e.add(
          t.steel,
          pl(a2(0, 0, 0.0128, 20), 0.013, {
            u: 0.3175,
            y: l,
            holes: [a2(0, 0, 0.0102, 18)],
            b: 9e-4,
          }),
        ),
        e.add(
          t.steel,
          te(
            [
              [0.3222, a + 0.013],
              [0.3258, a + 0.013],
              [0.3252, l],
              [0.3228, l],
            ],
            0.0022,
            {
              b: 3e-4,
            },
          ),
        ),
        e.add(
          t.steel,
          te(es(-0.048, r - 0.001, -0.014, r + 0.0055, 0.002), 0.024, {
            b: 0.0012,
          }),
        ),
        e.add(
          t.steel,
          Ug(0.0088, 0.0052, {
            y: r + 0.0045,
            u: -0.031,
            seg: 16,
          }),
        ),
        e.add(
          t.steel,
          pl(a2(0, 0, 0.0074, 22), 0.0045, {
            u: -0.0335,
            y: l,
            holes: [a2(0, 0, 0.0053, 18)],
            b: 6e-4,
          }),
        ),
        e.add(
          t.white,
          te(es(-0.0318, r + 0.0052, -0.0302, r + 0.0108), 6e-4, {
            x: -0.0093,
            b: 0,
          }),
        ))
      : e.add(
          t.steel,
          te(es(0.318, a + 0.012, 0.33, l + 0.012), 0.012),
          te(es(-0.046, r, -0.018, l + 0.008), 0.016),
        ),
    e.add(
      t.poly,
      te(
        [
          [0.172, 0.013, 0.004],
          [0.298, 0.013, 0.006],
          [0.305, 0.03, 0.006],
          [0.3, 0.0565, 0.004],
          [0.172, 0.0565, 0.003],
        ],
        0.043,
        {
          b: 0.008,
          bs: 3,
          soft: !0,
        },
      ),
    ),
    o)
  ) {
    for (let y = 0; y < 6; y++)
      e.add(
        t.poly,
        te(
          es(0.186 + y * 0.018, 0.022, 0.1925 + y * 0.018, 0.048, 0.002),
          0.0448,
          {
            b: 0.0011,
          },
        ),
      );
    (e.add(
      t.poly,
      te(
        [
          [0.276, 0.016],
          [0.299, 0.016],
          [0.303, 0.001, 0.004],
          [0.288, 0.001, 0.004],
        ],
        0.022,
        {
          b: 0.003,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      e.add(
        t.steel,
        Xo(0.003, 0.045, {
          y: 0.019,
          u: 0.18,
          seg: 8,
        }),
      ));
  }
  let f = [
    [-0.04, 0.018],
    [0.09, 0.018],
    [0.09, -0.01],
    [0.089, -0.044, 0.006],
    [0.042, -0.049, 0.006],
    [0.037, -0.04, 0.004],
    [0.014, -0.108, 0.008],
    [-0.036, -0.104, 0.01],
    [-0.014, -0.034, 0.03],
    [-0.004, -0.003, 0.008],
    [-0.02, 0.008, 0.004],
    [-0.04, 0.008, 0.003],
  ];
  (e.add(
    t.poly,
    te(f, 0.033, {
      b: 0.003,
      bs: 2,
      soft: !0,
      keepHoles: !0,
      holes: [
        [
          [0.046, -0.013, 0.004],
          [0.083, -0.013, 0.004],
          [0.083, -0.039, 0.006],
          [0.048, -0.042, 0.006],
        ],
      ],
    }),
  ),
    o &&
      (e.add(
        t.grip,
        te(
          [
            [0.031, -0.046, 0.004],
            [0.011, -0.1, 0.004],
            [-0.029, -0.096, 0.006],
            [-0.011, -0.04, 0.008],
          ],
          0.0338,
          {
            b: 6e-4,
          },
        ),
      ),
      e.add(
        t.steel,
        Xo(0.0055, 0.036, {
          y: 0.008,
          u: 0.02,
          seg: 14,
        }),
        te(
          [
            [0.016, 0.0055, 0.001],
            [0.04, 0.009, 0.0015],
            [0.04, 0.0125, 0.0015],
            [0.016, 0.0105, 0.001],
          ],
          0.003,
          {
            x: -0.019,
            b: 0.001,
          },
        ),
      ),
      e.add(t.mark, Jd("picto", 0.022, 0.0066, -0.0168, -0.003, 0.058, -1)),
      e.add(
        t.red,
        te(es(0.0425, -0.0058, 0.0465, -2e-4), 2e-4, {
          x: -0.01665,
          b: 0,
        }),
      )));
  let u = mc(s, n, "trigger", $n(0, -0.011, 0.066));
  {
    let y = o ? Ra() : e;
    (y.add(
      t.steel,
      te(
        Kc(
          [
            [0.0665, -0.011],
            [0.0642, -0.018],
            [0.0628, -0.025],
            [0.063, -0.031],
            [0.0652, -0.0365],
          ],
          0.0042,
        ),
        0.0066,
        {
          b: 0.0013,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      o && y.build(u, u.position));
  }
  (e.add(
    t.steel,
    te(
      [
        [0.094, 0.018],
        [0.137, 0.018],
        [0.139, -0.03, 0.003],
        [0.096, -0.034, 0.003],
      ],
      0.03,
      {
        b: 0.0016,
      },
    ),
  ),
    o &&
      (e.add(
        t.steel,
        te(
          [
            [0.0905, -0.034],
            [0.0965, -0.034],
            [0.0945, -0.054, 0.002],
            [0.089, -0.052, 0.002],
          ],
          0.016,
          {
            b: 0.001,
          },
        ),
      ),
      e.add(
        t.black,
        te(
          Kc(
            [
              [0.099, -0.0338],
              [0.136, -0.0306],
            ],
            6e-4,
          ),
          0.021,
          {
            b: 0,
          },
        ),
      )));
  let d = mc(s, n, "mag", $n(0, -0.03, 0.116));
  {
    let y = o ? Ra() : e,
      M = [
        [0.1155, 0.012],
        [0.116, -0.03],
        [0.119, -0.066],
        [0.125, -0.102],
        [0.134, -0.134],
        [0.142, -0.156],
      ];
    if (
      (y.add(
        t.steel,
        te(Kc(M, 0.034), 0.0212, {
          b: 0.0016,
          bs: 2,
        }),
      ),
      o)
    ) {
      for (let w of [-0.008, 0.008])
        y.add(
          t.steel,
          te(
            Kc(
              M.slice(1).map(([T, S]) => [T + w, S]),
              0.0045,
            ),
            0.0228,
            {
              b: 8e-4,
            },
          ),
        );
      (y.add(
        t.poly,
        te(
          Kc(
            [
              [0.1405, -0.152],
              [0.1445, -0.162],
            ],
            0.04,
          ),
          0.0245,
          {
            b: 0.0015,
            bs: 2,
          },
        ),
      ),
        ER(t, y, 0.0022, 0.0102, 0.101, 0.019, 0.0049, 0.0105),
        y.add(
          t.black,
          te(es(0.1, 0.0118, 0.131, 0.0124), 0.016, {
            b: 0,
          }),
        ),
        y.build(d, d.position));
    }
  }
  for (let y of [-1, 1])
    e.add(
      t.steel,
      ki(0.0042, 0.15, {
        x: y * 0.0222,
        y: 0.031,
        u: -0.136,
        seg: 10,
      }),
    );
  if (
    (e.add(
      t.poly,
      te(
        [
          [-0.136, 0.066, 0.006],
          [-0.149, 0.062, 0.006],
          [-0.151, -0.046, 0.008],
          [-0.138, -0.052, 0.006],
          [-0.1315, -0.02, 0.012],
          [-0.1315, 0.04, 0.012],
        ],
        0.046,
        {
          b: 0.006,
          bs: 3,
          soft: !0,
        },
      ),
    ),
    o)
  ) {
    e.add(
      t.steel,
      te(es(-0.137, 0.024, -0.126, 0.038, 0.003), 0.052, {
        b: 0.0016,
      }),
    );
    for (let y of [-1, 1])
      e.add(
        t.steel,
        te(es(-0.03, 0.0255, 0.03, 0.0365, 0.003), 0.004, {
          x: y * 0.0212,
          b: 0.0012,
        }),
      );
    for (let y = 0; y < 6; y++)
      e.add(
        t.rubber,
        te(
          es(-0.1522, -0.04 + y * 0.017, -0.1505, -0.032 + y * 0.017, 6e-4),
          0.036,
          {
            b: 5e-4,
          },
        ),
      );
  }
  let m = {
    id: "smg",
    root: s,
    parts: n,
    anchors: {
      muzzle: $n(0, i, 0.3525),
      eject: $n(0.0205, 0.046, 0.096),
      ejectDir: hs(0.88, 0.34, 0.33).normalize(),
      sight: $n(0, l, -0.031),
      gripR: iE(s, 21, 0.0165),
      gripL: qb(
        s,
        "gripL",
        $n(-0.029, 0.0115, 0.232),
        hs(0.62, 0, -0.78),
        hs(0.25, 0.97, 0),
      ),
    },
    hip: {
      pos: hs(0.112, -0.142, -0.3),
      rot: new Euler(0.03, 0.07, 0),
    },
    adsDist: 0.11,
  };
  if (
    (e.build(s),
    aE(m, o, "grip", "cup", hs(0.26, -0.4, 0.88), hs(-0.44, -0.5, 0.75)),
    !o)
  )
    return m;
  let p = nE(m, n),
    x = {
      p: hs(-0.034, 0.01, 0.004),
      q: j2(hs(0.25, 0.45, -0.86), hs(0.9, -0.42, 0.1)),
    },
    g = $n(-0.03, a + 0.05, 0.215),
    b = j2(hs(0.3, 0.2, -0.93), hs(0.55, -0.83, 0)),
    v = new Vector3();
  return (
    (m.clips = {
      fire: Xc(
        0.09,
        [
          {
            t: 0.02,
            type: "eject",
          },
        ],
        (y, M) => {
          (p.begin(M),
            p.part(
              "bolt",
              0,
              0,
              un(y, [
                [0, 0],
                [0.034, 0.046, "out"],
                [0.05, 0.046],
                [0.09, 0, "in"],
              ]),
            ),
            p.part(
              "trigger",
              0,
              0,
              0,
              un(y, [
                [0, 0],
                [0.012, -0.22],
                [0.05, -0.22],
                [0.09, 0],
              ]),
            ),
            p.end());
        },
      ),
      ...GI(m, p, {
        dur: 1.8,
        durEmpty: 2.2,
        pre: 0.3,
        relTail: 0.36,
        cant: [0.15, 0.45, -0.6],
        shift: [0, 0.05, 0],
        pull: 0.095,
        awayMag: [-0.1, -0.42, 0.1],
        hold: {
          p: hs(-0.0118, -0.078, 0),
          q: j2(hs(0.02, 0.16, -1), hs(1, 0, 0.05)),
        },
        cantKeys: (y, M, w) => [
          [0.24, 0],
          [y(0.3), 1],
          [y(1.36), 1],
          [M - 0.1, 0.22],
          [M + 0.1, 0.22],
          [w - 0.04, 0],
        ],
        charge(y, M, w, T, S, E) {
          let _ =
              un(y, [
                [0.13, 0],
                [0.24, 1, "out"],
              ]) *
              (1 - S),
            R =
              un(y, [
                [0.22, 0],
                [0.28, 1],
              ]) *
              (1 - S);
          (M.part("chargingHandle", 0, 0, 0.085 * _, 0, 0, -0.55 * R),
            M.part("bolt", 0, 0, 0.046 * _),
            M.handOn(
              "chargingHandle",
              x,
              un(y, [
                [0.02, 0],
                [0.13, 1],
                [0.28, 1],
                [0.42, 0],
              ]),
            ),
            v.copy(g),
            (v.y -=
              0.055 *
              un(y, [
                [T - 0.05, 0],
                [T + 0.03, 1, "in"],
              ])),
            M.hand(
              v,
              b,
              un(y, [
                [T - 0.26, 0],
                [T - 0.05, 1],
                [T + 0.1, 1],
                [E - 0.1, 0],
              ]),
            ),
            (w.rot.z += r2(y, T, -0.05, 34, 15)),
            (w.pos.y += r2(y, T, -0.006, 30, 14)));
        },
      }),
      ...oE(m, p, {}),
    }),
    m
  );
}
function FZ(o) {
  let t = tp(),
    e = Ra(),
    s = new Group(),
    n = {},
    i = 0.042,
    a = 0.0145,
    r = 0.0645,
    l = [
      [0.02, 0.004, 0.003],
      [0.228, 0.004, 0.002],
      [0.228, 0.058, 0.004],
      [0.05, 0.06, 0.012],
      [0.02, 0.048, 0.008],
    ];
  o
    ? (e.add(
        t.steel,
        te(l, 0.0046, {
          x: -0.0177,
          b: 0.0017,
        }),
      ),
      e.add(
        t.steel,
        te(l, 0.0046, {
          x: 0.0177,
          b: 0.0017,
          holes: [es(0.118, 0.0305, 0.188, 0.0515, 0.005)],
        }),
      ),
      e.add(
        t.steel,
        te(
          [
            [0.0205, 0.0045],
            [0.06, 0.0045],
            [0.064, 0.012],
            [0.152, 0.012],
            [0.156, 0.0045],
            [0.2275, 0.0045],
            [0.2275, 0.0575],
            [0.05, 0.0595, 0.012],
            [0.0205, 0.048, 0.008],
          ],
          0.031,
          {
            b: 6e-4,
          },
        ),
      ),
      e.add(
        t.black,
        te(es(0.116, 0.029, 0.19, 0.053), 3e-4, {
          x: 0.01567,
          b: 0,
        }),
      ),
      e.add(
        t.steelBright,
        te(es(0.066, 0.0095, 0.15, 0.0112, 5e-4), 0.024, {
          b: 4e-4,
        }),
      ),
      e.add(
        t.black,
        te(es(0.085, 0.0092, 0.128, 0.0094), 0.008, {
          b: 0,
        }),
      ),
      e.add(
        t.steel,
        Xo(0.0024, 0.0412, {
          y: 0.02,
          u: 0.07,
          seg: 8,
        }),
        Xo(0.0024, 0.0412, {
          y: 0.022,
          u: 0.165,
          seg: 8,
        }),
      ),
      e.add(t.mark, Jd("sg", 0.066, 0.0188, -0.0203, 0.041, 0.15, -1)))
    : e.add(t.steel, te(l, 0.04));
  let c = mc(s, n, "bolt", $n(0.0165, 0.041, 0.15));
  if (o) {
    let A = Ra();
    (A.add(
      t.steelBright,
      te(es(0.12, 0.032, 0.186, 0.05, 0.003), 0.002, {
        x: 0.0168,
        b: 6e-4,
      }),
    ),
      A.add(
        t.black,
        te(es(0.17, 0.037, 0.18, 0.045, 0.001), 3e-4, {
          x: 0.01795,
          b: 0,
        }),
      ),
      A.build(c, c.position));
  }
  (e.add(
    t.poly,
    te(es(0.026, 0, 0.1, 0.0055, 0.0015), 0.028, {
      b: 0.0012,
    }),
  ),
    e.add(
      t.poly,
      te(
        Kc(
          [
            [0.03, 0.003],
            [0.0305, -0.01],
            [0.034, -0.021],
            [0.041, -0.028],
            [0.052, -0.0315],
            [0.066, -0.0315],
            [0.078, -0.027],
            [0.087, -0.018],
            [0.092, -0.007],
            [0.094, 0.003],
          ],
          0.0034,
        ),
        0.016,
        {
          b: 0.001,
        },
      ),
    ));
  let h = mc(s, n, "trigger", $n(0, 0.001, 0.066));
  {
    let A = o ? Ra() : e;
    (A.add(
      t.steel,
      te(
        Kc(
          [
            [0.0665, 0.002],
            [0.0642, -0.005],
            [0.0628, -0.012],
            [0.063, -0.018],
            [0.0652, -0.0235],
          ],
          0.0042,
        ),
        0.0062,
        {
          b: 0.0013,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      o && A.build(h, h.position));
  }
  if (
    (o &&
      e.add(
        t.steel,
        Xo(0.0038, 0.031, {
          y: -0.001,
          u: 0.0375,
          seg: 10,
        }),
        te(es(0.093, -0.007, 0.101, 0.002, 0.001), 0.004, {
          x: -0.011,
          b: 0.001,
        }),
      ),
    e.add(
      t.steel,
      Y2(
        [
          [0.226, 0.0138],
          [0.25, 0.0138],
          [0.253, 0.0122],
          [0.604, 0.0118],
        ],
        {
          y: i,
        },
      ),
    ),
    o)
  ) {
    (e.add(
      t.steel,
      Y2(
        [
          [0.598, 0.0118],
          [0.598, 0.0152],
          [0.627, 0.0152],
          [0.63, 0.014],
          [0.63, 0.0098],
          [0.57, 0.0098],
        ],
        {
          y: i,
        },
      ),
    ),
      e.add(
        t.black,
        ki(0.0098, 5e-4, {
          y: i,
          u: 0.57,
          seg: 12,
        }),
      ));
    for (let F = 0; F < 8; F++)
      (e.add(
        t.steel,
        sE(
          i2(
            te(
              [
                [0.629, 0.0102],
                [0.6425, 0.0128, 5e-4],
                [0.629, 0.0152],
              ],
              0.0062,
              {
                b: 7e-4,
              },
            ),
            0,
            i,
            0,
          ),
          F * 45,
          i,
        ),
      ),
        e.add(
          t.black,
          sE(
            i2(
              te(es(0.604, 0.01522, 0.622, 0.0154), 0.0042, {
                b: 0,
              }),
              0,
              i,
              0,
            ),
            F * 45 + 22.5,
            i,
          ),
        ));
    (e.add(
      t.steel,
      te(
        [
          [0.566, i + 0.0118],
          [0.598, i + 0.0152],
          [0.598, r - 0.0035],
          [0.59, r - 0.0035],
          [0.57, i + 0.013],
        ],
        0.0056,
        {
          b: 8e-4,
        },
      ),
    ),
      e.add(t.fiber, i2(eE(0.0027, 10, 8), 0, r - 0.0012, 0.5935)));
    let A = 0.0168,
      O = 0.0012,
      H = 2 * A * Math.tan(Math.PI / 8) + 0.0012;
    for (let F of [0, 45, 90, 135, 180]) {
      let P = Array.from(
          {
            length: 11,
          },
          (k, I) => yR(0.279 + I * 0.026, 0, 0.016, 0.0058),
        ),
        z = te(es(0.262, -H / 2, 0.556, H / 2), O, {
          x: A - O / 2,
          b: 4e-4,
          holes: P,
          cs: 2,
        });
      (z.rotateZ(hh(F)), z.translate(0, i, 0), e.add(t.steel, z));
    }
    for (let F of [0.266, 0.546])
      e.add(
        t.steel,
        pl(tE(A + 8e-4), 0.007, {
          u: F,
          y: i,
          holes: [a2(0, 0, 0.0124, 12)],
          b: 8e-4,
        }),
      );
  } else
    e.add(
      t.steel,
      ki(0.015, 0.032, {
        y: i,
        u: 0.598,
        seg: 10,
      }),
    );
  (e.add(
    t.steel,
    ki(0.0125, 0.376, {
      y: a,
      u: 0.228,
      seg: 16,
    }),
  ),
    o &&
      (e.add(
        t.steel,
        Y2(
          [
            [0.604, 0.0125],
            [0.604, 0.014],
            [0.616, 0.014],
            [0.6185, 0.0118],
            [0.6185, 1e-4],
          ],
          {
            y: a,
            seg: 14,
          },
        ),
      ),
      e.add(
        t.steel,
        pl(
          [
            [-0.0165, a - 0.015, 0.013],
            [0.0165, a - 0.015, 0.013],
            [0.0165, i + 0.015, 0.013],
            [-0.0165, i + 0.015, 0.013],
          ],
          0.012,
          {
            u: 0.572,
            holes: [a2(0, i, 0.0121, 14), a2(0, a, 0.0127, 14)],
            b: 0.001,
          },
        ),
      ),
      e.add(
        t.steel,
        Ug(0.003, 0.008, {
          y: a - 0.0225,
          u: 0.578,
          seg: 8,
        }),
      )));
  let f = mc(s, n, "pump", $n(0, a, 0.38));
  {
    let A = o ? Ra() : e,
      O = [
        [-0.0245, -0.0125, 0.012],
        [0.0245, -0.0125, 0.012],
        [0.0255, 0.012, 0.005],
        [0.016, 0.02, 0.004],
        [-0.016, 0.02, 0.004],
        [-0.0255, 0.012, 0.005],
      ];
    if (o)
      for (let H = 0; H < 10; H++)
        A.add(
          t.wood,
          pl(O, 0.0165, {
            u: 0.298 + H * 0.0163,
            y: a,
            b: 0.0019,
            bs: 2,
            soft: !0,
            swapUV: !0,
          }),
        );
    else
      A.add(
        t.wood,
        pl(O, 0.163, {
          u: 0.298,
          y: a,
        }),
      );
    for (let H of [-1, 1])
      A.add(
        t.steel,
        ki(0.0022, 0.086, {
          x: H * 0.0148,
          y: a + 0.0065,
          u: 0.221,
          seg: 6,
        }),
      );
    o && A.build(f, f.position);
  }
  let u = [
    [0.022, 0.052],
    [0.004, 0.03, 0.01],
    [-0.014, 0.004, 0.02],
    [-0.07, 0.006, 0.03],
    [-0.115, 0.028, 0.03],
    [-0.29, 0.016, 0.006],
    [-0.295, -0.1, 0.006],
    [-0.14, -0.066, 0.03],
    [-0.086, -0.078, 0.012],
    [-0.052, -0.086, 0.008],
    [-0.02, -0.04, 0.02],
    [0.012, -0.012, 0.01],
    [0.022, 0.002],
  ];
  if (
    (e.add(
      t.wood,
      te(u, 0.042, {
        b: 0.01,
        bs: 4,
        soft: !0,
      }),
    ),
    e.add(
      t.rubber,
      te(
        [
          [-0.2925, 0.0165, 0.003],
          [-0.306, 0.014, 0.005],
          [-0.311, -0.101, 0.005],
          [-0.2975, -0.1005, 0.003],
        ],
        0.04,
        {
          b: 0.006,
          bs: 2,
          soft: !0,
        },
      ),
    ),
    o)
  ) {
    (e.add(
      t.poly,
      te(
        [
          [-0.0885, -0.0795, 0.002],
          [-0.0505, -0.0885, 0.002],
          [-0.0495, -0.0845],
          [-0.0875, -0.0755],
        ],
        0.034,
        {
          b: 0.004,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      e.add(
        t.steel,
        Ug(0.003, 0.009, {
          y: -0.086,
          u: -0.215,
          seg: 8,
        }),
      ));
    for (let A = 0; A < 7; A++)
      e.add(
        t.rubber,
        te(
          es(-0.3125, -0.094 + A * 0.016, -0.3108, -0.086 + A * 0.016, 6e-4),
          0.03,
          {
            b: 5e-4,
          },
        ),
      );
  }
  let d = mc(s, n, "shell", $n(0, -0.02, 0.06));
  if (((d.userData.hidden = !0), (d.visible = !1), o)) {
    let A = Ra();
    (A.add(
      t.red,
      ki(0.0101, 0.046, {
        u: -0.015,
        seg: 12,
      }),
    ),
      A.add(
        t.brass,
        ki(0.0104, 0.014, {
          u: -0.029,
          seg: 12,
        }),
        ki(0.0112, 0.0018, {
          u: -0.0308,
          seg: 12,
        }),
      ),
      A.build(d));
  }
  let m = {
    id: "shotgun",
    root: s,
    parts: n,
    anchors: {
      muzzle: $n(0, i, 0.63),
      eject: $n(0.021, 0.041, 0.152),
      ejectDir: hs(0.9, 0.28, 0.33).normalize(),
      sight: $n(0, r, 0.11),
      gripR: iE(s, 27, 0.0185, hs(0, 0.004, 0.022)),
      gripL: qb(
        s,
        "gripL",
        $n(-0.031, a - 0.0135, 0.372),
        hs(0.62, 0, -0.78),
        hs(0.25, 0.97, 0),
      ),
    },
    hip: {
      pos: hs(0.118, -0.142, -0.25),
      rot: new Euler(0.03, 0.07, 0),
    },
    adsDist: 0.13,
  };
  if (
    (e.build(s),
    aE(m, o, "grip", "cup", hs(0.26, -0.4, 0.88), hs(-0.44, -0.5, 0.75)),
    !o)
  )
    return m;
  let p = nE(m, n),
    x = {
      p: m.anchors.gripL.position.clone().sub(f.userData.rest),
      q: m.anchors.gripL.quaternion.clone(),
    },
    g = [0.2, 0.28, -0.95],
    b = [-0.015, 0.05, 0],
    v = [-0.06, -0.24, 0.12],
    y = (A, O, H) => {
      (A.rot.set(
        g[0] * O,
        g[1] * O,
        g[2] * O + (H >= 0 ? r2(H, 0.3, 0.03) : 0),
      ),
        A.pos.set(
          b[0] * O,
          b[1] * O + (H >= 0 ? r2(H, 0.3, 0.006, 30, 14) : 0),
          b[2] * O,
        ));
    },
    M = $n(0.006, -0.032, 0.082),
    w = j2(hs(0, 0.12, -1), hs(-0.1, 1, 0.1)),
    T = new Vector3(),
    S = hs(0, 0.03, 0.015),
    E = new Quaternion().setFromAxisAngle(hs(1, 0, 0), Math.PI / 2),
    _ = $n(0, 0.016, 0.165),
    R = new Vector3(),
    C = new Quaternion(),
    L = new Quaternion();
  return (
    (m.clips = {
      fire: Xc(0.09, [], (A, O) => {
        (p.begin(O),
          p.part(
            "trigger",
            0,
            0,
            0,
            un(A, [
              [0, 0],
              [0.012, -0.22],
              [0.05, -0.22],
              [0.09, 0],
            ]),
          ),
          p.end());
      }),
      pump: Xc(
        0.5,
        [
          _a(0.06, "pump_back"),
          {
            t: 0.15,
            type: "eject",
          },
          _a(0.27, "pump_fwd"),
        ],
        (A, O) => {
          p.begin(O);
          let H = un(A, [
            [0.04, 0],
            [0.17, 1, "out"],
            [0.24, 1],
            [0.37, 0, "in"],
          ]);
          (p.part("pump", 0, 0, 0.075 * H),
            p.part("bolt", 0, 0, 0.062 * H),
            p.handOn("pump", x, 1),
            O.rot.set(0.035 * H + r2(A, 0.37, 0.012), 0, -0.05 * H),
            O.pos.set(0, -0.004 * H, 0.014 * H),
            p.end());
        },
      ),
      reloadStart: Xc(0.45, [_a(0.03, "cloth")], (A, O) => {
        (p.begin(O),
          y(
            O,
            un(A, [
              [0, 0],
              [0.36, 1],
            ]),
            -1,
          ),
          p.handAway(
            O,
            v[0],
            v[1],
            v[2],
            un(A, [
              [0.04, 0],
              [0.4, 1],
            ]),
          ),
          p.end());
      }),
      reloadShell: Xc(
        0.5,
        [
          _a(0.27, "shell"),
          {
            t: 0.3,
            type: "ammo",
          },
        ],
        (A, O) => {
          (p.begin(O),
            y(O, 1, A),
            T.copy(M),
            (T.z -=
              0.032 *
              un(A, [
                [0.22, 0],
                [0.33, 1],
              ])),
            p.hand(T, w, 1),
            p.handAway(
              O,
              v[0],
              v[1],
              v[2],
              un(A, [
                [0, 1],
                [0.22, 0, "out"],
                [0.36, 0],
                [0.5, 1, "in"],
              ]),
            ),
            R.copy(S).applyQuaternion(p.hq).add(p.hp),
            C.copy(p.hq).multiply(E));
          let H = un(A, [
            [0.24, 0],
            [0.34, 1],
          ]);
          (d.position.copy(R).lerp(_, H),
            d.quaternion.copy(C).slerp(L, H),
            (d.visible = A < 0.35),
            p.end());
        },
      ),
      reloadEnd: Xc(0.45, [_a(0.05, "cloth")], (A, O) => {
        (p.begin(O),
          y(
            O,
            un(A, [
              [0.06, 1],
              [0.42, 0],
            ]),
            -1,
          ),
          p.handAway(
            O,
            v[0],
            v[1],
            v[2],
            un(A, [
              [0, 1],
              [0.34, 0],
            ]),
          ),
          p.end());
      }),
      ...oE(m, p, {}),
    }),
    m
  );
}
function OZ(o) {
  let t = tp(),
    e = Ra(),
    s = new Group(),
    n = {},
    i = 0.0235,
    a = 0.009,
    r = 0.04,
    l = 0.0463,
    c = mc(s, n, "slide", $n(0, 0.025, 0.05));
  {
    let y = o ? Ra() : e,
      M = [
        [-0.04, a],
        [0.136, a, 0.003],
        [0.136, r - 0.003, 0.002],
        [0.133, r],
        [-0.037, r],
        [-0.04, r - 0.003],
      ],
      w = [
        [-0.0128, a],
        [0.0128, a],
        [0.0128, r - 0.002],
        [0.0108, r],
        [-0.0108, r],
        [-0.0128, r - 0.002],
      ];
    if (o) {
      let T = [
        [-0.04, a],
        [0.136, a, 0.003],
        [0.136, r - 0.003, 0.002],
        [0.133, r],
        [0.0565, r],
        [0.0565, 0.0255, 0.002],
        [0.0215, 0.0255, 0.002],
        [0.0215, r],
        [-0.037, r],
        [-0.04, r - 0.003],
      ];
      (y.add(
        t.steel,
        te(M, 0.0052, {
          x: -0.0102,
          b: 0.002,
        }),
        te(T, 0.0052, {
          x: 0.0102,
          b: 0.002,
        }),
      ),
        y.add(
          t.steel,
          bR(
            [
              [-0.0078, -0.04],
              [0.0078, -0.04],
              [0.0078, 0.0215],
              [0.0012, 0.0215],
              [0.0012, 0.0565],
              [0.0078, 0.0565],
              [0.0078, 0.136],
              [-0.0078, 0.136],
            ],
            0.0045,
            {
              y: r - 0.0047,
              b: 5e-4,
            },
          ),
        ),
        y.add(
          t.steel,
          pl(w, 0.012, {
            u: -0.04,
            b: 8e-4,
          }),
          te(es(-0.03, a + 0.001, 0.0215, r - 0.004), 0.0154, {
            b: 0,
          }),
        ),
        y.add(
          t.steel,
          pl(w, 0.014, {
            u: 0.122,
            b: 8e-4,
            holes: [a2(0, i, 0.0072, 16), a2(0, 0.0135, 0.0037, 10)],
          }),
        ),
        y.add(
          t.black,
          pl(es(-0.004, 0.016, 0.004, 0.033, 0.001), 4e-4, {
            u: -0.0403,
            b: 0,
          }),
        ));
      for (let S of [-1, 1])
        for (let [E, _] of [
          [-0.034, 9],
          [0.094, 6],
        ])
          for (let R = 0; R < _; R++) {
            let C = E + R * 0.0038;
            y.add(
              t.steel,
              te(
                [
                  [C, a + 0.004],
                  [C + 0.0017, a + 0.004],
                  [C + 0.0057, r - 0.0065],
                  [C + 0.004, r - 0.0065],
                ],
                7e-4,
                {
                  x: S * 0.01305,
                  b: 25e-5,
                },
              ),
            );
          }
      (y.add(
        t.steel,
        pl(
          [
            [-0.009, r - 5e-4],
            [0.009, r - 5e-4],
            [0.009, l],
            [0.0021, l],
            [0.0021, l - 0.0042],
            [-0.0021, l - 0.0042],
            [-0.0021, l],
            [-0.009, l],
          ],
          0.009,
          {
            u: -0.036,
            b: 5e-4,
          },
        ),
      ),
        y.add(
          t.steel,
          te(
            [
              [0.12, r - 5e-4],
              [0.13, r - 5e-4],
              [0.129, l],
              [0.1225, l],
            ],
            0.0036,
            {
              b: 4e-4,
            },
          ),
        ));
      for (let S of [-1, 1])
        y.add(
          t.trit,
          ki(0.0011, 5e-4, {
            x: S * 0.0054,
            y: l - 0.0024,
            u: -0.0364,
            seg: 10,
          }),
        );
      (y.add(
        t.trit,
        ki(0.0011, 7e-4, {
          y: l - 0.0024,
          u: 0.1209,
          seg: 10,
        }),
      ),
        y.add(
          t.steel,
          te(es(-0.004, 0.0235, 0.02, 0.0268, 8e-4), 5e-4, {
            x: 0.01305,
            b: 2e-4,
          }),
        ),
        y.add(t.mark, Jd("pistol", 0.046, 0.0131, -0.01293, 0.0252, 0.052, -1)),
        y.build(c, c.position));
    } else
      y.add(
        t.steel,
        pl(w, 0.176, {
          u: -0.04,
        }),
        te(es(-0.036, r, -0.027, l), 0.016),
        te(es(0.121, r, 0.129, l), 0.004),
      );
  }
  (e.add(
    t.steelBright,
    ki(0.0068, 0.1145, {
      y: i,
      u: 0.022,
      seg: 14,
    }),
  ),
    o &&
      (e.add(
        t.steelBright,
        Y2(
          [
            [0.1365, 0.0068],
            [0.1388, 0.0062],
            [0.1388, 0.0046],
            [0.12, 0.0046],
          ],
          {
            y: i,
            seg: 14,
          },
        ),
      ),
      e.add(
        t.black,
        ki(0.0046, 5e-4, {
          y: i,
          u: 0.12,
          seg: 10,
        }),
      ),
      e.add(
        t.steelBright,
        te(es(0.0222, i - 0.002, 0.0558, r - 6e-4, 8e-4), 0.015, {
          b: 6e-4,
        }),
      ),
      e.add(
        t.steel,
        ki(0.0034, 0.01, {
          y: 0.0135,
          u: 0.1275,
          seg: 10,
        }),
      )));
  let h = [
    [0.118, a - 6e-4],
    [0.118, -0.006, 0.003],
    [0.07, -0.009, 0.002],
    [0.068, -0.012],
    [0.066, -0.048, 0.007],
    [0.026, -0.053, 0.007],
    [0.021, -0.044, 0.004],
    [0.005, -0.112, 0.006],
    [-0.046, -0.103, 0.008],
    [-0.034, -0.06, 0.02],
    [-0.008, -0.006, 0.01],
    [-0.024, 0.004, 0.004],
    [-0.036, 0.006, 0.002],
    [-0.036, a - 6e-4],
  ];
  (e.add(
    t.poly,
    te(h, 0.0295, {
      b: 0.0032,
      bs: 2,
      soft: !0,
      keepHoles: !0,
      holes: [
        [
          [0.03, -0.014, 0.005],
          [0.06, -0.014, 0.004],
          [0.061, -0.042, 0.006],
          [0.031, -0.045, 0.007],
        ],
      ],
    }),
  ),
    o &&
      (e.add(
        t.poly,
        te(
          [
            [0.074, -0.0085],
            [0.116, -0.0058],
            [0.116, -0.0108, 0.001],
            [0.105, -0.0116],
            [0.105, -0.0088],
            [0.099, -0.0092],
            [0.099, -0.0122],
            [0.074, -0.0138, 0.001],
          ],
          0.0215,
          {
            b: 8e-4,
          },
        ),
      ),
      e.add(
        t.grip,
        te(
          [
            [0.0135, -0.05, 0.004],
            [-0.002, -0.104, 0.004],
            [-0.04, -0.097, 0.006],
            [-0.029, -0.058, 0.01],
            [-0.015, -0.032, 0.006],
            [0.011, -0.035, 0.004],
          ],
          0.0303,
          {
            b: 6e-4,
          },
        ),
      ),
      e.add(
        t.steel,
        te(
          [
            [0.006, 0.0028, 0.001],
            [0.04, 0.0042, 0.001],
            [0.04, 0.0074, 0.001],
            [0.014, 0.0078, 0.001],
            [0.006, 0.006, 0.001],
          ],
          0.0016,
          {
            x: -0.0155,
            b: 5e-4,
          },
        ),
      ),
      e.add(
        t.steel,
        te(es(0.046, -0.0042, 0.054, -6e-4, 0.0012), 0.0312, {
          b: 6e-4,
        }),
        Xo(0.0042, 0.0026, {
          x: -0.0156,
          y: -0.03,
          u: 0.0175,
          seg: 12,
        }),
      ),
      e.add(
        t.steel,
        Xo(0.0016, 0.03, {
          y: -0.004,
          u: 0.064,
          seg: 6,
        }),
        Xo(0.0016, 0.03, {
          y: 5e-4,
          u: -0.02,
          seg: 6,
        }),
      )));
  let f = mc(s, n, "trigger", $n(0, -0.011, 0.05));
  {
    let y = o ? Ra() : e;
    (y.add(
      t.poly,
      te(
        Kc(
          [
            [0.0505, -0.011],
            [0.0482, -0.018],
            [0.0468, -0.025],
            [0.047, -0.032],
            [0.0492, -0.0385],
          ],
          0.0046,
        ),
        0.0058,
        {
          b: 0.0013,
          bs: 2,
          soft: !0,
        },
      ),
    ),
      o && y.build(f, f.position));
  }
  let u = mc(s, n, "mag", $n(0, -0.105, -0.02));
  {
    let y = o ? Ra() : e;
    (y.add(
      t.polyMag,
      te(
        [
          [0.0075, -0.11, 0.002],
          [-0.049, -0.1005, 0.003],
          [-0.051, -0.1105, 0.003],
          [0.0065, -0.1215, 0.003],
        ],
        0.0312,
        {
          b: 0.0018,
          bs: 2,
        },
      ),
    ),
      o &&
        (y.add(
          t.steel,
          te(
            [
              [0.012, 0.006],
              [-0.014, 0.006],
              [-0.04, -0.106],
              [-0.001, -0.113],
            ],
            0.0222,
            {
              b: 0.0012,
            },
          ),
        ),
        ER(t, y, 0, 0.0052, -0.012, 0.019, 0.0049, 0.0105),
        y.build(u, u.position)));
  }
  let d = {
    id: "pistol",
    root: s,
    parts: n,
    anchors: {
      muzzle: $n(0, i, 0.1388),
      eject: $n(0.01, 0.035, 0.04),
      ejectDir: hs(0.72, 0.58, 0.38).normalize(),
      sight: $n(0, l - 4e-4, -0.036),
      gripR: iE(s, 17, 0.0148),
      gripL: qb(
        s,
        "gripL",
        $n(-0.0345, -0.066, -0.012),
        hs(0, -0.68, -0.73),
        hs(1, 0, 0),
      ),
    },
    hip: {
      pos: hs(0.085, -0.118, -0.4),
      rot: new Euler(0.02, 0.05, 0),
    },
    adsDist: 0.24,
  };
  if (
    (e.build(s),
    aE(d, o, "grip", "wrap", hs(0.22, -0.3, 0.93), hs(-0.5, -0.35, 0.79)),
    !o)
  )
    return d;
  let m = nE(d, n),
    p = hs(0, -0.985, 0.17),
    x = {
      p: d.anchors.gripL.position
        .clone()
        .sub(u.userData.rest)
        .addScaledVector(p, 0.045),
      q: d.anchors.gripL.quaternion.clone(),
    },
    g = [-0.05, -0.26, 0.1],
    b = new Vector3(),
    v = (y) => {
      let M = y ? 1.7 : 1.4,
        w = 1.22,
        T = [
          _a(0.02, "cloth"),
          _a(0.14, "magout"),
          _a(0.93, "magin"),
          {
            t: 0.95,
            type: "ammo",
          },
        ];
      y && T.push(_a(w, "slide"));
      let S = [
        [0.6, [-0.06, -0.34, 0.1]],
        [0.84, [p.x * 0.115 - 0.004, p.y * 0.115, p.z * 0.115], "out"],
        [0.88, [p.x * 0.1, p.y * 0.1, p.z * 0.1]],
        [0.95, [0, 0, 0], "in"],
      ];
      return Xc(M, T, (E, _) => {
        m.begin(_);
        let R = un(E, [
          [0.04, 0],
          [0.26, 1],
          [y ? w + 0.1 : 1.02, 1],
          [M - 0.04, 0],
        ]);
        if (
          (_.rot.set(0.26 * R, 0.3 * R, -0.5 * R + r2(E, 0.95, 0.03)),
          _.pos.set(
            -0.03 * R,
            0.035 * R + r2(E, 0.95, 0.007, 30, 14),
            0.03 * R,
          ),
          E < 0.58)
        ) {
          let C = Math.max(0, E - 0.14);
          (b.copy(p).multiplyScalar(6.4 * C * C),
            m.part("mag", b.x, b.y, b.z, C * 1.2, 0, 0));
        } else
          (vR(E, S, b),
            m.part(
              "mag",
              b.x,
              b.y,
              b.z,
              un(E, [
                [0.6, 0.5],
                [0.84, 0.05],
                [0.95, 0],
              ]),
              0,
              0,
            ));
        if (
          (m.handAway(
            _,
            g[0],
            g[1],
            g[2],
            un(E, [
              [0.02, 0],
              [0.24, 1],
              [0.6, 1],
              [0.62, 0],
            ]),
          ),
          m.handOn(
            "mag",
            x,
            un(E, [
              [0.5, 0],
              [0.6, 1],
              [1, 1],
              [1.26, 0],
            ]),
          ),
          y)
        ) {
          let C = E >= w ? Math.min(1, (E - w) / 0.04) : 0;
          (m.part("slide", 0, 0, 0.04 * (1 - C)),
            (_.rot.x += r2(E, w, 0.03, 34, 15)));
        }
        m.end();
      });
    };
  return (
    (d.clips = {
      fire: Xc(
        0.09,
        [
          {
            t: 0.02,
            type: "eject",
          },
        ],
        (y, M) => {
          (m.begin(M),
            m.part(
              "slide",
              0,
              0,
              un(y, [
                [0, 0],
                [0.032, 0.042, "out"],
                [0.045, 0.042],
                [0.09, 0, "in"],
              ]),
            ),
            m.part(
              "trigger",
              0,
              0,
              0,
              un(y, [
                [0, 0],
                [0.012, -0.2],
                [0.05, -0.2],
                [0.09, 0],
              ]),
            ),
            m.end());
        },
      ),
      reload: v(!1),
      reloadEmpty: v(!0),
      ...oE(d, m, {
        away: [-0.04, -0.16, 0.08],
        inspX: 0,
        inspX2: -0.02,
      }),
    }),
    d
  );
}
var BI = {
  ar: IZ,
  smg: HZ,
  shotgun: FZ,
  pistol: OZ,
};
function buildLegacyGun(o, { detail: t = "view" } = {}) {
  let e = BI[o] || BI.ar;
  Bi = t !== "view";
  let s;
  try {
    s = e(!Bi);
  } finally {
    Bi = !1;
  }
  return (
    (s.id = o),
    (s.root.name = "gun_" + o),
    t !== "view" &&
      ((s.hands = null), (s.clips = null), (s.resetPose = () => {})),
    s
  );
}
function buildGrenade() {
  let o = tp(),
    t = Ra(),
    e = new Group();
  e.name = "grenade";
  let s = new SphereGeometry(0.031, 64, 44),
    n = s.attributes.position,
    i = new Vector3(),
    a = (r, l, c) => {
      let h = Math.min(1, Math.max(0, (c - r) / (l - r)));
      return h * h * (3 - 2 * h);
    };
  for (let r = 0; r < n.count; r++) {
    i.fromBufferAttribute(n, r);
    let l = Math.atan2(i.z, i.x) / (Math.PI * 2) + 0.5,
      c = Math.acos(Math.max(-1, Math.min(1, i.y / 0.031))) / Math.PI,
      h = (l * 8) % 1,
      f = (c * 7 + 0.5) % 1,
      u = a(0.1, 0.2, c) * a(0.1, 0.2, 1 - c),
      d = Math.min(
        1 - u + u * a(0.02, 0.11, Math.min(h, 1 - h)),
        a(0.03, 0.16, Math.min(f, 1 - f)) + (1 - u),
      );
    (i.multiplyScalar(1 - 0.095 * (1 - Math.min(1, d))),
      (i.y *= 1.13),
      n.setXYZ(r, i.x, i.y, i.z));
  }
  (s.computeVertexNormals(),
    $2(s, 0.19, 0.11),
    t.add(o.olive, Mr(s)),
    t.add(
      o.steel,
      Ug(0.0118, 0.007, {
        y: 0.0325,
        seg: 14,
      }),
      Ug(0.0088, 0.017, {
        y: 0.039,
        seg: 12,
      }),
      Ug(0.0105, 0.004, {
        y: 0.047,
        seg: 6,
      }),
    ),
    t.add(
      o.olive,
      te(
        Kc(
          [
            [0.006, 0.0572],
            [-0.013, 0.0572],
            [-0.027, 0.043],
            [-0.0345, 0.016],
            [-0.0345, -0.012],
          ],
          0.0016,
        ),
        0.013,
        {
          b: 5e-4,
        },
      ),
    ),
    t.add(
      o.steelBright,
      Xo(0.0012, 0.026, {
        x: 0.004,
        y: 0.0505,
        seg: 6,
      }),
    ));
  {
    let r = new TorusGeometry(0.0105, 0.0011, 6, 18);
    (r.rotateY(Math.PI / 2),
      r.rotateX(0.5),
      r.translate(0.0175, 0.043, 0.004),
      t.add(o.steelBright, Mr(r)));
  }
  return (t.build(e), e);
}

export { buildGrenade, buildLegacyGun };

// weapons/models/geometry.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  CanvasTexture,
  Color,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Path,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  Shape,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { Vn, th } from "../../vendor/geometry-utils.js";
import { createCanvas, createNoise, createRandom } from "../../core/math.js";

var Ze = (o) => (o * Math.PI) / 180;
var Bt = (o, t, e) => new Vector3(o, t, e);
var Gt = (o, t, e) => new Vector3(o, t, -e);
var C1 = !1;
var p4 = new Matrix4();
var hr0 = new Quaternion();
var fr0 = new Vector3();
var ur0 = new Vector3(0, 1, 0);
function Qe(o) {
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
function JE(o, t, e) {
  let s = o.attributes.uv;
  for (let n = 0; n < s.count; n++) s.setXY(n, s.getX(n) * t, s.getY(n) * e);
  return o;
}
var KH = (o) => {
  let t = 0;
  for (let e = 0; e < o.length; e++) {
    let s = o[e],
      n = o[(e + 1) % o.length];
    t += s[0] * n[1] - n[0] * s[1];
  }
  return t;
};
function XH(o, t) {
  let e = t.length;
  for (let s = 0; s < e; s++) {
    let n = t[s],
      i = t[(s + e - 1) % e],
      a = t[(s + 1) % e],
      r = C1 && (n[2] || 0) < 0.008 ? 0 : n[2] || 0;
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
function PQ(o, t) {
  KH(o) < 0 && (o = o.slice().reverse());
  let e = new Shape();
  if ((XH(e, o), t))
    for (let s of t) {
      KH(s) > 0 && (s = s.slice().reverse());
      let n = new Path();
      (XH(n, s), e.holes.push(n));
    }
  return e;
}
function zQ(o) {
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
function bp(o, t, e) {
  let s = C1 ? 0 : Math.min(e.b ?? 8e-4, t * 0.45),
    n = new ExtrudeGeometry(PQ(o, C1 && !e.keepHoles ? null : e.holes), {
      depth: t - 2 * s,
      steps: 1,
      curveSegments: C1 ? 1 : (e.cs ?? 4),
      bevelEnabled: s > 0,
      bevelThickness: s,
      bevelSize: s,
      bevelOffset: -s,
      bevelSegments: e.bs ?? 1,
    });
  return (
    s > 0 && zQ(n),
    e.soft && !C1 && (n = th(n, e.soft === !0 ? 0.85 : e.soft)),
    (n.userData.b = s),
    (n.userData.depth = t - 2 * s),
    n
  );
}
function us(o, t, e = {}) {
  let s = bp(o, t, e);
  return (
    p4.set(
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
    Qe(s.applyMatrix4(p4))
  );
}
function si(o, t, e = {}) {
  let s = (i) => i.map((a) => [-a[0], a[1], a[2]]),
    n = bp(s(o), t, {
      ...e,
      holes: e.holes ? e.holes.map(s) : null,
    });
  if (
    (p4.set(
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
  return Qe(n.applyMatrix4(p4));
}
function jc(o, t, e = {}) {
  let s = bp(o, t, e);
  return (
    p4.set(
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
    Qe(s.applyMatrix4(p4))
  );
}
var se = (o, t, e, s, n = 0) => [
  [o, t, n],
  [e, t, n],
  [e, s, n],
  [o, s, n],
];
var m4 = (o, t, e, s) =>
  se(o - e / 2, t - s / 2, o + e / 2, t + s / 2, s * 0.49);
var Kr = (o, t, e, s = 14) =>
  Array.from(
    {
      length: s,
    },
    (n, i) => [
      o + Math.cos((i / s) * Math.PI * 2) * e,
      t + Math.sin((i / s) * Math.PI * 2) * e,
    ],
  );
var tT = (o) =>
  Array.from(
    {
      length: 8,
    },
    (t, e) => {
      let s = Ze(22.5 + 45 * e),
        n = o / Math.cos(Ze(22.5));
      return [Math.cos(s) * n, Math.sin(s) * n];
    },
  );
function Sc(o, t) {
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
function fa(o, t, e = {}) {
  let s = C1 ? Math.max(6, (e.seg || 16) >> 1) : e.seg || 16,
    n = new CylinderGeometry(e.r2 ?? o, o, t, s, 1, !!e.open);
  return (
    JE(n, Math.PI * 2 * o, t),
    n.rotateX(-Math.PI / 2),
    n.translate(e.x || 0, e.y || 0, -((e.u || 0) + t / 2)),
    Qe(n)
  );
}
function Wn(o, t, e = {}) {
  let s = new CylinderGeometry(o, o, t, C1 ? 6 : e.seg || 12);
  return (
    JE(s, Math.PI * 2 * o, t),
    s.rotateZ(Math.PI / 2),
    s.translate(e.x || 0, e.y || 0, -(e.u || 0)),
    Qe(s)
  );
}
function T5(o, t, e = {}) {
  let s = new CylinderGeometry(e.r2 ?? o, o, t, C1 ? 6 : e.seg || 12);
  return (
    JE(s, Math.PI * 2 * o, t),
    s.translate(e.x || 0, (e.y || 0) + t / 2, -(e.u || 0)),
    Qe(s)
  );
}
function ni(o, t = {}) {
  let e = new LatheGeometry(
    o.map(([s, n]) => new Vector2(Math.max(n, 1e-5), s)),
    C1 ? 8 : t.seg || 20,
  );
  return (
    JE(e, 0.06, 0.2),
    C1 || (e = th(e, t.crease ?? 0.6)),
    e.rotateX(-Math.PI / 2),
    e.translate(t.x || 0, t.y || 0, 0),
    Qe(e)
  );
}
var xh = (o, t, e) => (
  o.translate(0, -e, 0),
  o.rotateZ(Ze(t)),
  o.translate(0, e, 0),
  o
);
var bh = (o, t, e, s) => (o.translate(t, e, -s), o);
function JR(o, t) {
  let e = o.clone().normalize(),
    s = t.clone().addScaledVector(e, -t.dot(e)).normalize(),
    n = new Vector3().crossVectors(e, s);
  return new Quaternion().setFromRotationMatrix(
    new Matrix4().makeBasis(n, e, s),
  );
}
function g4() {
  let o = new Map();
  return {
    add(t, ...e) {
      let s = C1 ? YH : t,
        n = o.get(s);
      n || o.set(s, (n = []));
      let i = t.userData.wear || 1,
        a = t.userData.base;
      for (let r of e) {
        if (!r) continue;
        let l = r.attributes.color.array;
        for (let c = 0; c < l.length; c += 3) {
          let h = l[c] > 1.5 ? i : 1;
          C1
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
        let a = s === YH ? ao().world : s,
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
var YH = {};
function ff(o, t, e, s) {
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
var x2 = (o, t, e = t) => {
  let s = o.clone();
  return (s.repeat.set(t, e), (s.needsUpdate = !0), s);
};
var QR = null;
function ao() {
  if (QR) return QR;
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
  let i = ff(
      e,
      (L, A) => n[A * e + L] * 0.55 + o.fbm(L / 8, A / 8, 3, 32) * 0.9,
      1.1,
      (L, A) =>
        0.8 + 0.26 * o.fbm(L / 32 + 9, A / 32, 3, 8) - s[A * e + L] * 0.16,
    ),
    a = ff(
      e,
      (L, A) => o.fbm(L / 2, A / 2, 2, 128) + n[A * e + L] * 0.3,
      1.8,
      (L, A) =>
        0.84 + 0.2 * o.fbm(L / 32, A / 32 + 4, 3, 8) - s[A * e + L] * 0.14,
    ),
    r = ff(
      e,
      (L, A) => {
        let O = o.fbm(L / 3.2, A / 3.2, 2, e / 3.2);
        return O * O * 2.2;
      },
      2.6,
      (L, A) => 0.86 + 0.16 * o.fbm(L / 32 + 2, A / 32, 2, e / 32),
    ),
    l = ff(
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
    c = ff(
      e,
      (L, A) =>
        Math.sin((L * Math.PI) / 4) * Math.sin((A * Math.PI) / 4) * 0.5 +
        0.5 +
        n[A * e + L] * 0.35,
      2.2,
      (L, A) => 0.9 + 0.1 * o.noise(L / 16, A / 16, e / 16),
    ),
    h = ff(
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
              normalMap: x2(H.n, F),
              roughnessMap: x2(H.r, H === l ? F : 12),
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
    ((M[L].normalMap = x2(O.n, A)), (M[L].roughnessMap = x2(O.r, A)));
  }
  ((M.wood.normalMap = x2(i.n, 46)),
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
    (QR = M)
  );
}
function x4(o, t, e, s, n, i, a, r) {
  let l = ao(),
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
    Qe(h)
  );
}
function xy(o, t, e, s = 0.0206) {
  if (C1) return us(se(o, e, t, e + 0.0075), s);
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
    us(r, s, {
      b: 6e-4,
    })
  );
}
function eT(o, t, e, s, n, i, a, r) {
  (t.add(
    o.brass,
    fa(a, i, {
      x: e,
      y: s,
      u: n,
      seg: 10,
    }),
  ),
    t.add(
      o.copper,
      ni(
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
function Du(o, t, e, s) {
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
var jH = new Matrix4();
var LQ = new Quaternion();
function Zn(o, t, e = 0, s = null) {
  let n = t[0] - e,
    i = t[1] - e,
    a = t[2] - e,
    r = o[0],
    l = o[1],
    c = o[2],
    h = null;
  return (
    s &&
      (jH.makeRotationFromQuaternion(LQ.copy(s).invert()),
      (h = jH.elements.slice())),
    (f, u, d) => {
      if (((f -= r), (u -= l), (d -= c), h)) {
        let y = h[0] * f + h[4] * u + h[8] * d,
          M = h[1] * f + h[5] * u + h[9] * d,
          w = h[2] * f + h[6] * u + h[10] * d;
        ((f = y), (u = M), (d = w));
      }
      let m = Math.abs(f) - n,
        p = Math.abs(u) - i,
        x = Math.abs(d) - a,
        g = Math.max(m, 0),
        b = Math.max(p, 0),
        v = Math.max(x, 0);
      return (
        Math.sqrt(g * g + b * b + v * v) + Math.min(Math.max(m, p, x), 0) - e
      );
    }
  );
}
function b2(o, t, e) {
  let s = o[0],
    n = o[1],
    i = o[2],
    a = t[0] - s,
    r = t[1] - n,
    l = t[2] - i,
    c = 1 / (a * a + r * r + l * l);
  return (h, f, u) => {
    ((h -= s), (f -= n), (u -= i));
    let d = (h * a + f * r + u * l) * c;
    return (
      (d = d < 0 ? 0 : d > 1 ? 1 : d),
      (h -= a * d),
      (f -= r * d),
      (u -= l * d),
      Math.sqrt(h * h + f * f + u * u) - e
    );
  };
}
function ml(o, t, e, s = 0) {
  let n = o[0],
    i = o[1],
    a = o[2],
    r = t[0] - n,
    l = t[1] - i,
    c = t[2] - a,
    h = Math.hypot(r, l, c);
  return (
    (r /= h),
    (l /= h),
    (c /= h),
    (f, u, d) => {
      ((f -= n), (u -= i), (d -= a));
      let m = f * r + u * l + d * c;
      ((f -= r * m), (u -= l * m), (d -= c * m));
      let p = Math.sqrt(f * f + u * u + d * d) - (e - s),
        x = Math.abs(m - h / 2) - (h / 2 - s),
        g = Math.max(p, 0),
        b = Math.max(x, 0);
      return Math.sqrt(g * g + b * b) + Math.min(Math.max(p, x), 0) - s;
    }
  );
}
function $H(o) {
  let t = o.length,
    e = new Float64Array(t),
    s = new Float64Array(t);
  for (let n = 0; n < t; n++) ((e[n] = o[n][0]), (s[n] = o[n][1]));
  return (n, i) => {
    let a = 1 / 0,
      r = 1;
    for (let l = 0, c = t - 1; l < t; c = l, l++) {
      let h = e[c] - e[l],
        f = s[c] - s[l],
        u = n - e[l],
        d = i - s[l],
        m = (u * h + d * f) / (h * h + f * f);
      m = m < 0 ? 0 : m > 1 ? 1 : m;
      let p = u - h * m,
        x = d - f * m,
        g = p * p + x * x;
      g < a && (a = g);
      let b = i >= s[l],
        v = i < s[c],
        y = h * d > f * u;
      ((b && v && y) || (!b && !v && !y)) && (r = -r);
    }
    return r * Math.sqrt(a);
  };
}
var ZH = (o, t, e) => {
  let s = Math.max(o + e, 0),
    n = Math.max(t + e, 0);
  return Math.sqrt(s * s + n * n) + Math.min(Math.max(o + e, t + e), 0) - e;
};
function Zs(o, t, e = {}) {
  let s = $H(o),
    n = t / 2,
    i = e.x || 0,
    a = e.r || 0;
  return (r, l, c) => ZH(s(-c, l), Math.abs(r - i) - n, a);
}
function Iu(o, t, e, s = {}) {
  let n = $H(o),
    i = (t + e) / 2,
    a = (e - t) / 2,
    r = s.r || 0,
    l = s.y || 0;
  return (c, h, f) => ZH(n(c, h - l), Math.abs(-f - i) - a, r);
}
function QH(o, t, e, s, n, i = 0, a = Math.PI / 8) {
  let r = [],
    l = t / Math.cos(Math.PI / o);
  for (let c = 0; c < o; c++) {
    let h = a + (c * 2 * Math.PI) / o;
    r.push([Math.cos(h) * l, Math.sin(h) * l]);
  }
  return Iu(r, s, n, {
    y: e,
    r: i,
  });
}
function ds(...o) {
  o = o.flat().filter(Boolean);
  let t = o.length;
  return (e, s, n) => {
    let i = 1 / 0;
    for (let a = 0; a < t; a++) {
      let r = o[a](e, s, n);
      r < i && (i = r);
    }
    return i;
  };
}
var sT = (o, t, e, s) => (n, i, a) => o(n - t, i - e, a - s);

export {
  Bt,
  Du,
  Gt,
  Iu,
  JR,
  Kr,
  QH,
  Qe,
  Sc,
  T5,
  Wn,
  Ze,
  Zn,
  Zs,
  ao,
  b2,
  bh,
  bp,
  ds,
  eT,
  fa,
  ff,
  g4,
  jc,
  m4,
  ml,
  ni,
  sT,
  se,
  si,
  tT,
  us,
  x2,
  x4,
  xh,
  xy,
};

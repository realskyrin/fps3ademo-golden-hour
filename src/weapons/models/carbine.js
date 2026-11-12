// weapons/models/carbine.js: recovered from the verified GOLDEN HOUR release.
import { A5, Ja, Mp, Ou, Rc, Sy, Yr, gf, wp } from "./shared.js";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  DataTexture,
  Euler,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderMaterial,
  ShapeUtils,
  TubeGeometry,
  UnsignedByteType,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";
import {
  Bt,
  Gt,
  Iu,
  Qe,
  Ze,
  Zn,
  Zs,
  ao,
  b2,
  bp,
  ds,
  jc,
  ml,
  sT,
  si,
  us,
} from "./geometry.js";
import { Vn, th } from "../../vendor/geometry-utils.js";
import { createCanvas, createNoise, createRandom } from "../../core/math.js";
import {
  E5,
  Mn,
  QE,
  Qa,
  Tc,
  Ui,
  Yo,
  gs,
  hf,
  pn,
  u4,
  xp,
  yi,
  yo,
  zi,
} from "../../player/rig.js";
import { buildGrenade } from "./legacy.js";
import { xl } from "./camos.js";

var sn = () => Ja;
var WF = new Quaternion();
var VF = new Euler();
var pJ = new Vector3();
var mJ = new Matrix4();
var Nu = new Vector3();
var Bu = new Vector3();
var v2 = new Vector3();
var dT = (o) => o.map((t) => ((t[2] || 0) < 2.5 ? [t[0], t[1]] : t));
var pA = (o) => ({
  x: o.x,
  y: o.y,
  u: o.u,
  b: 0,
  cs: 1,
  holes: o.keepHoles ? o.holes : null,
  keepHoles: o.keepHoles,
});
var Pe = (o, t, e = {}) =>
  Ja
    ? us(dT(o), t, pA(e))
    : us(o, t, {
        b: 0.5,
        soft: 0.5,
        cs: 2,
        ...e,
      });
var pa = (o, t, e = {}) =>
  Ja
    ? si(dT(o), t, pA(e))
    : si(o, t, {
        b: 0.5,
        soft: 0.5,
        cs: 2,
        ...e,
      });
var R4 = (o, t, e = {}) =>
  Ja
    ? jc(dT(o), t, pA(e))
    : jc(o, t, {
        b: 0.5,
        soft: 0.5,
        cs: 2,
        ...e,
      });
var mn = (o, t, e, s, n = 0) => [
  [o, t, n],
  [e, t, n],
  [e, s, n],
  [o, s, n],
];
var Er = (o, t, e = 0, s = 0, n = 0) => [
  [s - o / 2, n - t / 2, e],
  [s + o / 2, n - t / 2, e],
  [s + o / 2, n + t / 2, e],
  [s - o / 2, n + t / 2, e],
];
var e1 = (o, t, e = 0, s = 0, n = 0) =>
  Array.from(
    {
      length: o,
    },
    (i, a) => [
      s + Math.cos(e + (a / o) * A5) * t,
      n + Math.sin(e + (a / o) * A5) * t,
    ],
  );
function Eh(o, t) {
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
function qF(o, t) {
  let e = o.length;
  if (t <= o[0][0]) return o[0].map((u, d) => (d ? u : t));
  if (t >= o[e - 1][0]) return o[e - 1].map((u, d) => (d ? u : t));
  let s = 0;
  for (; s < e - 2 && t > o[s + 1][0];) s++;
  let n = o[Math.max(0, s - 1)],
    i = o[s],
    a = o[s + 1],
    r = o[Math.min(e - 1, s + 2)],
    l = a[0] - i[0],
    c = (t - i[0]) / l,
    h = c * c,
    f = h * c;
  return i.map((u, d) => {
    if (d === 0) return t;
    let m = ((a[d] - n[d]) / (a[0] - n[0])) * l,
      p = ((r[d] - i[d]) / (r[0] - i[0])) * l;
    return (
      (2 * f - 3 * h + 1) * i[d] +
      (f - 2 * h + c) * m +
      (-2 * f + 3 * h) * a[d] +
      (f - h) * p
    );
  });
}
function A4(o, t, e, s) {
  return (
    e &&
      (s && o.translate(-s[0], -s[1], s[2]),
      VF.set(e[0] * Yr, e[1] * Yr, e[2] * Yr, "XYZ"),
      o.applyQuaternion(WF.setFromEuler(VF)),
      s && o.translate(s[0], s[1], -s[2])),
    t && o.translate(t[0], t[1], -t[2]),
    o
  );
}
var gJ = {
  "x+": [1, 0, 0],
  "x-": [-1, 0, 0],
  "y+": [0, 1, 0],
  "y-": [0, -1, 0],
  "u+": [0, 0, -1],
  "u-": [0, 0, 1],
};
var xJ = new Vector3(0, 0, -1);
function Uu(o, t, e) {
  let s = typeof t == "string" ? gJ[t] : t;
  return (
    o.applyQuaternion(
      WF.setFromUnitVectors(xJ, pJ.set(s[0], s[1], s[2]).normalize()),
    ),
    e && o.translate(e[0], e[1], -e[2]),
    o
  );
}
var bJ = {
  L: [
    [-1, 0, 0],
    [0, 1, 0],
  ],
  R: [
    [1, 0, 0],
    [0, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [0, 0, -1],
  ],
  B: [
    [0, 0, 1],
    [0, 1, 0],
  ],
  F: [
    [0, 0, -1],
    [0, 1, 0],
  ],
  D: [
    [0, -1, 0],
    [0, 0, -1],
  ],
};
function cs(o, t, e, s = 0) {
  let [n, i] = typeof e == "string" ? bJ[e] : e;
  return (
    v2.set(n[0], n[1], n[2]).normalize(),
    Bu.set(i[0], i[1], i[2]),
    Bu.addScaledVector(v2, -Bu.dot(v2)).normalize(),
    Nu.crossVectors(Bu, v2),
    s && o.rotateZ(s * Yr),
    o.applyMatrix4(mJ.makeBasis(Nu, Bu, v2)),
    t && o.translate(t[0], t[1], -t[2]),
    o
  );
}
var KF = (o, t, e, s = 0) => (
  o.translate(-s, -e, 0),
  o.rotateZ(t * Yr),
  o.translate(s, e, 0),
  o
);
var Ep = class {
  constructor() {
    ((this.p = []), (this.n = []), (this.c = []));
  }
  tri(t, e, s, n, i = 1) {
    let a = e[0] - t[0],
      r = e[1] - t[1],
      l = e[2] - t[2],
      c = s[0] - t[0],
      h = s[1] - t[1],
      f = s[2] - t[2],
      u = r * f - l * h,
      d = l * c - a * f,
      m = a * h - r * c,
      p = Math.hypot(u, d, m);
    p < 1e-9 ||
      (this.p.push(t[0], t[1], t[2], e[0], e[1], e[2], s[0], s[1], s[2]),
      n
        ? this.n.push(
            n[0][0],
            n[0][1],
            n[0][2],
            n[1][0],
            n[1][1],
            n[1][2],
            n[2][0],
            n[2][1],
            n[2][2],
          )
        : ((u /= p),
          (d /= p),
          (m /= p),
          this.n.push(u, d, m, u, d, m, u, d, m)),
      this.c.push(i, i, i, i, i, i, i, i, i));
  }
  quad(t, e, s, n, i, a = 1) {
    (this.tri(t, e, n, i && [i[0], i[1], i[3]], a),
      this.tri(e, s, n, i && [i[1], i[2], i[3]], a));
  }
  geo() {
    let t = new BufferGeometry(),
      e = this.p.length / 3;
    return (
      t.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(this.p), 3),
      ),
      t.setAttribute(
        "normal",
        new BufferAttribute(new Float32Array(this.n), 3),
      ),
      t.setAttribute("uv", new BufferAttribute(new Float32Array(e * 2), 2)),
      t.setAttribute("color", new BufferAttribute(new Float32Array(this.c), 3)),
      t
    );
  }
};
function uo(o, t = {}) {
  let e = !Ja && t.flute ? t.flute : null,
    s = e ? (e.trap ? [0, 0, 1, 1] : [0, 1]) : [0],
    n = e ? e.n * s.length : Ja ? Math.max(6, (t.seg || 20) >> 1) : t.seg || 20,
    i = o.length,
    a = Math.cos((t.crease ?? 32) * Yr),
    r = t.arc ? t.arc[0] * Yr : 0,
    l = t.arc ? (t.arc[1] - t.arc[0]) * Yr : A5,
    c = [];
  for (let p = 0; p < i - 1; p++) {
    let x = o[p + 1][0] - o[p][0],
      g = o[p + 1][1] - o[p][1],
      b = Math.hypot(x, g) || 1;
    c.push([-g / b, x / b]);
  }
  let h = new Ep(),
    f = t.x || 0,
    u = t.y || 0,
    d = (p, x) => {
      let g = o[p],
        b = Math.max(0, g[1] - (e ? (g[3] || 0) * s[x % s.length] : 0)),
        v = r + (x / n) * l;
      return [f + b * Math.cos(v), u + b * Math.sin(v), -g[0]];
    },
    m = (p, x) => {
      let g = p[0] + x[0],
        b = p[1] + x[1],
        v = Math.hypot(g, b) || 1;
      return [g / v, b / v];
    };
  for (let p = 0; p < i - 1; p++) {
    let x = o[p],
      g = o[p + 1],
      b = e && ((x[3] || 0) > 0 || (g[3] || 0) > 0),
      v = c[p],
      y = c[p];
    (p > 0 &&
      c[p - 1][0] * c[p][0] + c[p - 1][1] * c[p][1] > a &&
      (v = m(c[p - 1], c[p])),
      p < i - 2 &&
        c[p + 1][0] * c[p][0] + c[p + 1][1] * c[p][1] > a &&
        (y = m(c[p + 1], c[p])));
    for (let M = 0; M < n; M++) {
      let w = d(p, M),
        T = d(p + 1, M),
        S = d(p + 1, M + 1),
        E = d(p, M + 1),
        _ = r + (M / n) * l,
        R = r + ((M + 1) / n) * l,
        C = g[2] ? 2 : 1,
        L = null;
      if (b) s[M % s.length] === 0 && s[(M + 1) % s.length] === 0 && (C = 2);
      else if (!t.flat) {
        let A = Math.cos(_),
          O = Math.sin(_),
          H = Math.cos(R),
          F = Math.sin(R);
        L = [
          [v[1] * A, v[1] * O, -v[0]],
          [y[1] * A, y[1] * O, -y[0]],
          [y[1] * H, y[1] * F, -y[0]],
          [v[1] * H, v[1] * F, -v[0]],
        ];
      }
      h.quad(w, T, S, E, L, C);
    }
  }
  return h.geo();
}
function s1(o, t, e, s = {}) {
  let n = Ja ? 0 : Math.min(s.c ?? 0.3, o * 0.5),
    i = s.ri || 0,
    a = [
      [t, i],
      [t, o - n],
      [t + n, o, 1],
      [e - n, o],
      [e, o - n, 1],
      [e, i],
    ];
  return (
    i && a.push([t, i]),
    uo(
      n
        ? a
        : [
            [t, i],
            [t, o],
            [e, o],
            [e, i],
          ],
      {
        seg: s.seg || 12,
        x: s.x,
        y: s.y,
        crease: 20,
      },
    )
  );
}
var bl = (o, t, e, s, n = {}) => Uu(s1(o, 0, t, n), e, s);
function yJ(o) {
  let t = 0,
    e = 0,
    s = 0,
    n = o.length;
  for (let a = 0; a < n; a++) {
    let r = o[a],
      l = o[(a + 1) % n];
    ((t += (r[1] - l[1]) * (r[2] + l[2])),
      (e += (r[2] - l[2]) * (r[0] + l[0])),
      (s += (r[0] - l[0]) * (r[1] + l[1])));
  }
  (v2.set(t, e, s).normalize(),
    Nu.set(Math.abs(v2.x) < 0.9 ? 1 : 0, Math.abs(v2.x) < 0.9 ? 0 : 1, 0),
    Nu.addScaledVector(v2, -Nu.dot(v2)).normalize(),
    Bu.crossVectors(v2, Nu));
  let i = o.map(
    (a) =>
      new Vector2(
        a[0] * Nu.x + a[1] * Nu.y + a[2] * Nu.z,
        a[0] * Bu.x + a[1] * Bu.y + a[2] * Bu.z,
      ),
  );
  return ShapeUtils.triangulateShape(i, []);
}
function k4(o, t = {}) {
  let e = o.length,
    s = o[0].length,
    n = [];
  for (let m = 0; m < e - 1; m++)
    for (let p = 0; p < s; p++) {
      let x = (p + 1) % s,
        g = o[m][p],
        b = o[m][x],
        v = o[m + 1][x],
        y = o[m + 1][p],
        M = t.flag ? t.flag(m, p) : 1;
      (typeof M == "number" && (M = [M, 1]),
        n.push([g, b, y, M[0], M[1]], [b, v, y, M[0], M[1]]));
    }
  for (let [m, p] of [
    [t.capA, o[0]],
    [t.capB, o[e - 1]],
  ]) {
    if (!m) continue;
    let x = typeof m == "number" ? m : 1;
    for (let g of yJ(p)) n.push([p[g[0]], p[g[1]], p[g[2]], 1, x, !0]);
  }
  let i = o.map((m) => {
      let p = [0, 0, 0];
      for (let x of m)
        ((p[0] += x[0] / s), (p[1] += x[1] / s), (p[2] += x[2] / s));
      return p;
    }),
    a = 0,
    r = (m) => {
      let p = m[0],
        x = m[1],
        g = m[2];
      return [
        (x[1] - p[1]) * (g[2] - p[2]) - (x[2] - p[2]) * (g[1] - p[1]),
        (x[2] - p[2]) * (g[0] - p[0]) - (x[0] - p[0]) * (g[2] - p[2]),
        (x[0] - p[0]) * (g[1] - p[1]) - (x[1] - p[1]) * (g[0] - p[0]),
      ];
    },
    l = 0;
  for (let m = 0; m < e - 1; m++)
    for (let p = 0; p < s * 2; p++) {
      let x = n[l++],
        g = r(x),
        b = i[m];
      a +=
        g[0] * (x[0][0] - b[0]) +
        g[1] * (x[0][1] - b[1]) +
        g[2] * (x[0][2] - b[2]);
    }
  let c = t.inside ? a > 0 : a < 0,
    h = [i[0][0], i[0][1], i[0][2]];
  e > 1 &&
    ((h[0] = (i[0][0] + i[e - 1][0]) / 2),
    (h[1] = (i[0][1] + i[e - 1][1]) / 2),
    (h[2] = (i[0][2] + i[e - 1][2]) / 2));
  let f = [],
    u = [];
  for (let m of n) {
    let p = m[0],
      x = m[1],
      g = m[2];
    if (m[5]) {
      let b = r(m);
      if (
        b[0] * (p[0] - h[0]) + b[1] * (p[1] - h[1]) + b[2] * (p[2] - h[2]) <
          0 !=
        !!t.inside
      ) {
        let y = x;
        ((x = g), (g = y));
      }
    } else if (c) {
      let b = x;
      ((x = g), (g = b));
    }
    f.push(p[0], p[1], p[2], x[0], x[1], x[2], g[0], g[1], g[2]);
    for (let b = 0; b < 3; b++) u.push(m[3], m[4], 0);
  }
  let d = new BufferGeometry();
  return (
    d.setAttribute("position", new BufferAttribute(new Float32Array(f), 3)),
    d.setAttribute("color", new BufferAttribute(new Float32Array(u), 3)),
    (d = th(d, Ja ? 0.9 : (t.crease ?? 0.6))),
    d.setAttribute(
      "uv",
      new BufferAttribute(new Float32Array(d.attributes.position.count * 2), 2),
    ),
    (d.userData.aoBaked = !0),
    d
  );
}
function vJ(o, t = 0.5) {
  if (Ja) return o.map((n) => [n[0], n[1], 0]);
  let e = o.length,
    s = [];
  for (let n = 0; n < e; n++) {
    let i = o[n],
      a = o[(n + e - 1) % e],
      r = o[(n + 1) % e],
      l = i[2] ?? t;
    if (!(l > 0)) {
      s.push([i[0], i[1], 0]);
      continue;
    }
    let c = Math.hypot(a[0] - i[0], a[1] - i[1]),
      h = Math.hypot(r[0] - i[0], r[1] - i[1]),
      f = Math.min(l, c * 0.45),
      u = Math.min(l, h * 0.45);
    s.push(
      [i[0] + ((a[0] - i[0]) * f) / c, i[1] + ((a[1] - i[1]) * f) / c, 2],
      [i[0] + ((r[0] - i[0]) * u) / h, i[1] + ((r[1] - i[1]) * u) / h, 0],
    );
  }
  return s;
}
function GF(o, t) {
  let e = o.length,
    s = [],
    n = 0;
  for (let a = 0; a < e; a++) {
    let r = o[a],
      l = o[(a + 1) % e];
    n += r[0] * l[1] - l[0] * r[1];
  }
  let i = n > 0 ? 1 : -1;
  for (let a = 0; a < e; a++) {
    let r = o[a],
      l = o[(a + e - 1) % e],
      c = o[(a + 1) % e],
      h = r[0] - l[0],
      f = r[1] - l[1],
      u = c[0] - r[0],
      d = c[1] - r[1],
      m = Math.hypot(h, f) || 1,
      p = Math.hypot(u, d) || 1;
    ((h /= m), (f /= m), (u /= p), (d /= p));
    let x = -(f + d) * i,
      g = (h + u) * i,
      b = Math.hypot(x, g) || 1;
    ((x /= b), (g /= b));
    let v = t / Math.max(0.35, -f * i * x + h * i * g);
    s.push([r[0] + x * v, r[1] + g * v, r[2]]);
  }
  return s;
}
function xf(o, t = {}) {
  let e = o.map((r) => ({
      u: r.u,
      pts: r.pts,
    })),
    s = Ja ? 0 : t.bevA || 0,
    n = Ja ? 0 : t.bevB || 0;
  if (s) {
    let r = e[0];
    ((e[0] = {
      u: r.u + s,
      pts: r.pts,
    }),
      e.unshift({
        u: r.u,
        pts: GF(r.pts, s),
      }));
  }
  if (n) {
    let r = e[e.length - 1];
    ((e[e.length - 1] = {
      u: r.u - n,
      pts: r.pts,
    }),
      e.push({
        u: r.u,
        pts: GF(r.pts, n),
      }));
  }
  let i = e.map((r) => r.pts.map((l) => [l[0], l[1], -r.u])),
    a = e.length;
  return k4(i, {
    capA: t.capA,
    capB: t.capB,
    crease: t.crease ?? 0.3,
    inside: t.inside,
    flag: (r, l) => [
      (s && r === 0) ||
      (n && r === a - 2) ||
      e[r].pts[l][2] === 2 ||
      e[r + 1].pts[l][2] === 2
        ? 2
        : 1,
      t.ao ? t.ao(r, l, e[r].pts[l]) : 1,
    ],
  });
}
var mA = (o, t, e, s = {}) => {
  let n = vJ(o, s.c ?? 0.5);
  return xf(
    [
      {
        u: t,
        pts: n,
      },
      {
        u: e,
        pts: n,
      },
    ],
    {
      capA: !0,
      capB: !0,
      bevA: s.b ?? 0.5,
      bevB: s.b ?? 0.5,
      ...s,
    },
  );
};
function Th(o, t, e = 0.03) {
  let s = new PlaneGeometry(o, t);
  return (s.translate(0, 0, e), Qe(s));
}
function yl(o, t = 12, e = 0.03) {
  let s = new CircleGeometry(o, Ja ? 6 : t);
  return (s.translate(0, 0, e), Qe(s));
}
function n1(o, t, e = {}) {
  let s = Ja
    ? bp(dT(o), t, {
        b: 0,
        cs: 1,
      })
    : bp(o, t, {
        b: 0.3,
        soft: 0.5,
        cs: 2,
        ...e,
      });
  return (s.translate(0, 0, s.userData.b), Qe(s));
}
var gA = (o, t = 0.6) => th(o, t);
var xA = (o, t) => ((o.userData.ao = (o.userData.ao ?? 1) * t), o);
var jr = (o) => ((o.userData.alt = 1), o);
function C4(o, t) {
  let e = o.attributes.position,
    s = o.attributes.color,
    n = o.userData.aoBaked;
  for (let i = 0; i < e.count; i++)
    s.setY(i, (n ? s.getY(i) : 1) * t(e.getX(i), e.getY(i), -e.getZ(i)));
  return ((o.userData.aoBaked = !0), o);
}
var da = (o) => new Color(o);
var MJ = {
  steel: {
    c: da(5197645),
    m: 0.5,
    r: 0.56,
    wear: 1.7,
  },
  oxide: {
    c: da(4342599),
    m: 0.55,
    r: 0.4,
    wear: 1.8,
  },
  bright: {
    c: da(10724776),
    m: 1,
    r: 0.26,
    wear: 1.15,
  },
  nib: {
    c: da(9407104),
    m: 1,
    r: 0.33,
    wear: 1.2,
  },
  alu: {
    c: da(5395289),
    m: 0.3,
    r: 0.53,
    wear: 1.5,
  },
  bronze: {
    c: da(8021320),
    m: 0.6,
    r: 0.4,
    wear: 1.5,
  },
  black: {
    c: da(328966),
    m: 1,
    r: 1,
    wear: 1,
  },
  shadow: {
    c: da(1184533),
    m: 1,
    r: 0.85,
    wear: 1.3,
  },
  rubber: {
    c: da(4013118),
    m: 0,
    r: 0.88,
    wear: 1.1,
  },
  poly: {
    c: da(4145220),
    m: 0,
    r: 0.56,
    wear: 1.3,
  },
  fde: {
    c: da(9205591),
    m: 0,
    r: 0.64,
    wear: 1.2,
  },
  orange: {
    c: da(12867354),
    m: 0,
    r: 0.55,
    wear: 1.1,
  },
  brass: {
    c: da(12028735),
    m: 1,
    r: 0.3,
    wear: 1.15,
  },
  copper: {
    c: da(11889730),
    m: 1,
    r: 0.32,
    wear: 1.1,
  },
  white: {
    c: da(14079180),
    m: 0,
    r: 0.6,
    wear: 1,
  },
  red: {
    c: da(11740700),
    m: 0,
    r: 0.5,
    wear: 1,
  },
};
var wJ = {
  metal: da(5395289),
  poly: da(4145220),
  furn: da(9205591),
};
var EJ = {
  metal: da(4868945),
  poly: da(9205591),
  furn: da(9205591),
};
function bA(o = {}) {
  let t = {
      metal: [],
      poly: [],
      furn: [],
      hard: [],
      mark: [],
    },
    e = !!o.paint,
    s =
      (i) =>
      (...a) => {
        for (let r of a.flat()) {
          if (!r) continue;
          r.index && (r = r.toNonIndexed());
          let l = r.attributes.color.array,
            c = r.userData.ao ?? 1,
            h = null,
            f = r.userData.aoBaked;
          if (Ja && !e) {
            let u = (r.userData.alt ? EJ : wJ)[i];
            for (let d = 0; d < l.length; d += 3) {
              let m = c * (f ? l[d + 1] : 1) * (h ? h[d / 3] : 1);
              ((l[d] = u.r * m), (l[d + 1] = u.g * m), (l[d + 2] = u.b * m));
            }
            t.hard.push(r);
            continue;
          }
          for (let u = 0; u < l.length; u += 3)
            ((l[u] = l[u] > 1.5 ? 2 : 1),
              (l[u + 1] = c * (f ? l[u + 1] : 1) * (h ? h[u / 3] : 1)),
              (l[u + 2] = r.userData.alt || 0));
          t[i].push(r);
        }
        return n;
      },
    n = {
      metal: s("metal"),
      poly: s("poly"),
      furn: s("furn"),
      hard(i, ...a) {
        let r = typeof i == "string" ? MJ[i] : i;
        if (!r) throw new Error("kr7: unknown look " + i);
        for (let l of a.flat()) {
          if (!l) continue;
          l.index && (l = l.toNonIndexed());
          let c = l.attributes.color.array,
            h = c.length / 3,
            f = l.userData.ao ?? 1,
            u = null,
            d = l.userData.aoBaked,
            m = Ja ? null : new Float32Array(h * 3);
          for (let p = 0; p < h; p++) {
            let x = c[p * 3] > 1.5,
              g =
                f *
                (d ? c[p * 3 + 1] : 1) *
                (u ? u[p] : 1) *
                (x && !Ja ? r.wear : 1);
            ((c[p * 3] = r.c.r * g),
              (c[p * 3 + 1] = r.c.g * g),
              (c[p * 3 + 2] = r.c.b * g),
              m &&
                ((m[p * 3] = r.m),
                (m[p * 3 + 1] = r.r * (x ? 0.86 : 1)),
                (m[p * 3 + 2] = x ? 1 : 0)));
          }
          (m && l.setAttribute("aMR", new BufferAttribute(m, 3)),
            t.hard.push(l));
        }
        return n;
      },
      mark(...i) {
        if (!Ja)
          for (let a of i.flat())
            a && t.mark.push(a.index ? a.toNonIndexed() : a);
        return n;
      },
      empty() {
        return (
          !t.metal.length &&
          !t.poly.length &&
          !t.furn.length &&
          !t.hard.length &&
          !t.mark.length
        );
      },
      finish() {
        let i = {
          tris: 0,
        };
        for (let a in t) {
          if (!t[a].length) {
            i[a] = null;
            continue;
          }
          let r =
              a === "hard"
                ? Ja
                  ? ["position", "normal", "color"]
                  : ["position", "normal", "uv", "color", "aMR"]
                : a === "mark"
                  ? ["position", "normal", "uv"]
                  : ["position", "normal", "uv", "color"],
            l = t[a].map((h) => {
              for (let f of Object.keys(h.attributes))
                r.includes(f) || h.deleteAttribute(f);
              for (let f of r)
                if (!h.attributes[f])
                  throw new Error(`kr7: ${a} part without ${f}`);
              return ((h.morphAttributes = {}), h.clearGroups(), h);
            }),
            c = l.length > 1 ? Vn(l, !1) : l[0];
          (c.scale(0.001, 0.001, 0.001),
            a !== "mark" && !(Ja && a === "hard") && (c = Rc(c)),
            (i[a] = c),
            (i.tris += c.attributes.position.count / 3));
        }
        return i;
      },
    };
  return n;
}
function yA(o) {
  let t = {
    tris: 0,
  };
  for (let e of ["metal", "poly", "furn", "hard", "mark"]) {
    let s = o.map((n) => n && n[e]).filter(Boolean);
    ((t[e] = s.length ? (s.length === 1 ? s[0] : Vn(s, !1)) : null),
      t[e] && (t.tris += t[e].attributes.position.count / 3));
  }
  return t;
}
var XF = Math.PI / 180;
var vA = null;
function TJ() {
  let t = createNoise(7707),
    e = createRandom(31),
    s = new Uint8Array(256 * 256 * 4),
    n = new Float32Array(256 * 256);
  for (let a = 0; a < 150; a++) {
    let r = e() * 256,
      l = e() * 256,
      c = (e() - 0.5) * 0.7 + (e() < 0.75 ? 0 : 1.57),
      h = 3 + e() * 26,
      f = Math.cos(c),
      u = Math.sin(c),
      d = 0.35 + e() * 0.65;
    for (let m = 0; m < h; m++) {
      let p = (((l | 0) + 256) % 256) * 256 + (((r | 0) + 256) % 256);
      ((n[p] = Math.max(n[p], d * (1 - Math.abs(m / h - 0.5) * 1.2))),
        (r += f),
        (l += u));
    }
  }
  for (let a = 0; a < 256; a++)
    for (let r = 0; r < 256; r++) {
      let l = (a * 256 + r) * 4,
        c = t.fbm(r / 20, a / 20, 4, 256 / 20),
        h = t.fbm(r / 3.1, a / 3.1, 2, Math.round(256 / 3.1)),
        f = Math.min(1, c * 0.62 + h * 0.3 + n[a * 256 + r] * 0.55);
      ((s[l] = f * 255),
        (s[l + 1] = t.fbm(r / 34 + 5, a / 34, 3, 256 / 32) * 255),
        (s[l + 2] =
          t.fbm(r / 60 + 11, a / 60 + 3, 3, Math.round(256 / 64)) * 255),
        (s[l + 3] = 255));
    }
  let i = new DataTexture(s, 256, 256, RGBAFormat, UnsignedByteType);
  return (
    (i.wrapS = i.wrapT = RepeatWrapping),
    (i.magFilter = LinearFilter),
    (i.minFilter = LinearMipmapLinearFilter),
    (i.generateMipmaps = !0),
    (i.anisotropy = 4),
    (i.needsUpdate = !0),
    i
  );
}
var gT = (o, t) => {
  let e = o.clone();
  return (e.repeat.set(t, t), (e.needsUpdate = !0), e);
};
function MA(o, t, e) {
  let s = new MeshStandardMaterial({
      color: t.color,
      metalness: t.metal,
      roughness: t.rough,
      vertexColors: !0,
      normalMap: gT(t.n, t.nRep),
      roughnessMap: gT(t.r, 14),
      normalScale: new Vector2(t.ns, t.ns),
    }),
    n = {
      uWearMap: {
        value: e,
      },
      uWear: {
        value: new Vector4(
          t.wear[0],
          t.wear[1],
          t.wear[2],
          t.wearTile / t.nRep,
        ),
      },
      uBareCol: {
        value: new Color(t.bare),
      },
      uBareRM: {
        value: new Vector2(t.bareRM[0], t.bareRM[1]),
      },
      uAltCol: {
        value: new Color(t.alt ?? t.color),
      },
      uAltBare: {
        value: new Color(t.altBare ?? t.bare),
      },
      uEdge: {
        value: new Vector2(t.edge[0], t.edge[1]),
      },
    };
  return (
    (s.onBeforeCompile = (i) => {
      (Object.assign(i.uniforms, n),
        (i.fragmentShader = i.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform sampler2D uWearMap; uniform vec4 uWear; uniform vec3 uBareCol; uniform vec2 uBareRM; uniform vec3 uAltCol; uniform vec3 uAltBare; uniform vec2 uEdge;`,
          )
          .replace(
            "#include <color_fragment>",
            `
float krEdge = 0.0; float krAO = 1.0; float krAlt = 0.0;
#ifdef USE_COLOR
	krEdge = smoothstep( 1.05, 1.9, vColor.r ); krAO = clamp( vColor.g, 0.0, 1.0 ); krAlt = clamp( vColor.b, 0.0, 1.0 );
	diffuseColor.rgb = mix( diffuseColor.rgb, uAltCol, krAlt );
#endif`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
{
	vec4 kw = texture2D( uWearMap, vNormalMapUv * uWear.w );
	vec4 kv = texture2D( uWearMap, vNormalMapUv * uWear.w * 0.27 + vec2( 0.37, 0.11 ) );
	float lvl = mix( uWear.x, uWear.y, krEdge );
	float kt = smoothstep( 0.98 - lvl, 1.08 - lvl, kw.r * 0.8 + kv.r * 0.2 ) * step( 0.001, lvl ) * uWear.z;
	// burnished edges: a little lighter and smoother even where the finish has not worn through
	diffuseColor.rgb *= 1.0 + uEdge.x * krEdge;
	roughnessFactor *= 1.0 - uEdge.y * krEdge;
	diffuseColor.rgb *= 0.88 + 0.24 * kv.b;
	roughnessFactor = clamp( roughnessFactor * ( 0.86 + 0.28 * kv.g ), 0.04, 1.0 );
	diffuseColor.rgb = mix( diffuseColor.rgb, mix( uBareCol, uAltBare, krAlt ), kt );
	roughnessFactor = mix( roughnessFactor, uBareRM.x, kt ); metalnessFactor = mix( metalnessFactor, uBareRM.y, kt );
	diffuseColor.rgb *= mix( 0.3, 1.0, krAO );
	roughnessFactor = mix( min( 1.0, roughnessFactor + 0.35 ), roughnessFactor, krAO );
}`,
          )));
    }),
    (s.customProgramCacheKey = () => "kr7-body-1"),
    (s.name = "kr7:" + o),
    (s.userData = {
      base: new Color(t.color),
      wear: 1,
      kr: n,
    }),
    s
  );
}
function SJ(o, t) {
  let e = new MeshStandardMaterial({
      color: 16777215,
      metalness: 1,
      roughness: 1,
      vertexColors: !0,
      normalMap: gT(o.steel.normalMap, 80),
      roughnessMap: gT(o.steel.roughnessMap, 14),
      normalScale: new Vector2(0.22, 0.22),
    }),
    s = {
      uWearMap: {
        value: t,
      },
    };
  return (
    (e.onBeforeCompile = (n) => {
      (Object.assign(n.uniforms, s),
        (n.vertexShader = n.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
attribute vec3 aMR;
varying vec3 vMR;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vMR = aMR;`,
          )),
        (n.fragmentShader = n.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vMR;
uniform sampler2D uWearMap;`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
vec4 kv = texture2D( uWearMap, vNormalMapUv * 0.045 + vec2( 0.2, 0.6 ) );
roughnessFactor = clamp( roughnessFactor * vMR.y * ( 0.88 + 0.26 * kv.g ), 0.04, 1.0 );
diffuseColor.rgb *= 0.9 + 0.2 * kv.b;`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
metalnessFactor = vMR.x;`,
          )));
    }),
    (e.customProgramCacheKey = () => "kr7-hard-1"),
    (e.name = "kr7:hardware"),
    (e.userData = {
      base: new Color(3881786),
      wear: 1,
    }),
    e
  );
}
var pT = "#c9ccd1";
var $r = "#ecebe4";
var k5 = "#d6432e";
var mT = "#8d9096";
function _J() {
  let e = createCanvas(2048, 1024),
    s = e.getContext("2d"),
    n = {};
  s.textBaseline = "middle";
  let i = (p, x = 600) =>
      `${x} ${p}px Bahnschrift, "DIN Alternate", "Segoe UI", Arial, sans-serif`,
    a = 0,
    r = 0,
    l = 0,
    c = (p, x, g, b) => {
      (a + x > 2048 && ((a = 0), (r += l + 6), (l = 0)),
        s.save(),
        s.translate(a, r),
        s.beginPath(),
        s.rect(0, 0, x, g),
        s.clip(),
        (s.fillStyle = pT),
        (s.strokeStyle = pT),
        (s.lineWidth = 3),
        (s.textAlign = "left"),
        b(x, g),
        s.restore(),
        (n[p] = [
          a / 2048,
          1 - (r + g) / 1024,
          (a + x) / 2048,
          1 - r / 1024,
          x / g,
        ]),
        (a += x + 6),
        (l = Math.max(l, g)));
    },
    h = (p, x, g, b, v, y, M = 0) => {
      if (((s.font = i(x, v)), y && (s.fillStyle = y), !M)) {
        s.fillText(p, g, b);
        return;
      }
      let w = g;
      for (let T of p) (s.fillText(T, w, b), (w += s.measureText(T).width + M));
    },
    f = (p, x, g, b = pT) => {
      (s.save(),
        (s.strokeStyle = b),
        (s.fillStyle = b),
        (s.lineWidth = Math.max(2, g * 0.11)),
        s.beginPath(),
        s.arc(p, x, g, 0, 6.2832),
        s.stroke(),
        s.beginPath(),
        s.arc(p, x + g * 0.12, g * 0.44, Math.PI, 0),
        s.closePath(),
        s.fill());
      for (let v = 0; v < 5; v++) {
        let y = Math.PI + ((v + 0.5) / 5) * Math.PI;
        (s.beginPath(),
          s.moveTo(
            p + Math.cos(y) * g * 0.56,
            x + g * 0.12 + Math.sin(y) * g * 0.56,
          ),
          s.lineTo(
            p + Math.cos(y) * g * 0.82,
            x + g * 0.12 + Math.sin(y) * g * 0.82,
          ),
          s.stroke());
      }
      (s.fillRect(p - g * 0.66, x + g * 0.3, g * 1.32, g * 0.11),
        s.fillRect(p - g * 0.46, x + g * 0.52, g * 0.92, g * 0.1),
        s.restore());
    },
    u = (p, x, g, b, v = !0) => {
      let y = g * 0.3;
      (s.save(),
        (s.fillStyle = b),
        (s.strokeStyle = b),
        (s.lineWidth = 4),
        s.beginPath(),
        s.moveTo(p - y / 2, x + g / 2),
        s.lineTo(p - y / 2, x - g * 0.12),
        s.quadraticCurveTo(p - y / 2, x - g * 0.36, p, x - g / 2),
        s.quadraticCurveTo(p + y / 2, x - g * 0.36, p + y / 2, x - g * 0.12),
        s.lineTo(p + y / 2, x + g / 2),
        s.closePath(),
        v ? s.fill() : s.stroke(),
        s.restore());
    };
  (c("kr7", 760, 300, () => {
    (f(84, 92, 62),
      h("KR-7", 150, 176, 84, 700),
      (s.lineWidth = 5),
      s.strokeRect(574, 34, 168, 78),
      h("MK II", 46, 596, 76, 700),
      h("CAL 5.56\xD745 NATO", 50, 16, 206, 600, null, 2),
      h("GH-ARMS  \xB7  SOLSTICE CITY", 36, 18, 266, 500, mT, 1.5));
  }),
    c("sn", 420, 56, () => {
      h("SN GH07731", 46, 6, 30, 600, null, 3);
    }),
    c("safe", 110, 110, () => {
      ((s.strokeStyle = $r),
        (s.lineWidth = 6),
        s.strokeRect(8, 8, 94, 94),
        u(55, 55, 66, $r),
        (s.strokeStyle = $r),
        (s.lineWidth = 8),
        s.beginPath(),
        s.moveTo(20, 90),
        s.lineTo(90, 20),
        s.stroke());
    }),
    c("semi", 110, 110, () => {
      ((s.strokeStyle = k5),
        (s.lineWidth = 6),
        s.strokeRect(8, 8, 94, 94),
        u(55, 55, 66, k5));
    }),
    c("auto", 110, 110, () => {
      ((s.strokeStyle = k5), (s.lineWidth = 6), s.strokeRect(8, 8, 94, 94));
      for (let p of [-24, 0, 24]) u(55 + p, 55, 62, k5);
    }),
    c("dm", 260, 110, () => {
      let p = createRandom(77),
        x = 14,
        g = 7;
      s.fillStyle = pT;
      for (let b = 0; b < x; b++)
        for (let v = 0; v < x; v++)
          (v === 0 ||
            b === x - 1 ||
            (b === 0 && v % 2 === 0) ||
            (v === x - 1 && b % 2 === 1) ||
            (v > 0 && b > 0 && b < x - 1 && v < x - 1 && p() < 0.5)) &&
            s.fillRect(6 + v * g, 6 + b * g, g, g);
      (h("UID", 30, 116, 26, 700),
        h("1005-GH-07731", 22, 116, 60, 500),
        h("MFR 7GH42", 22, 116, 88, 500, mT));
    }),
    c("warn", 760, 44, () => {
      h(
        "WARNING \u2014 REFER TO OPERATOR MANUAL BEFORE USE",
        30,
        4,
        24,
        500,
        null,
        1,
      );
    }),
    c("proof", 150, 60, () => {
      ((s.lineWidth = 4), s.beginPath());
      for (let p = 0; p < 10; p++) {
        let x = (p / 10) * 6.2832 - 1.5708,
          g = p % 2 ? 9 : 22;
        s[p ? "lineTo" : "moveTo"](30 + Math.cos(x) * g, 30 + Math.sin(x) * g);
      }
      (s.closePath(),
        s.stroke(),
        h("NP", 34, 62, 32, 700),
        s.strokeRect(112, 12, 30, 36));
    }),
    c("brl", 620, 44, () => {
      h("5.56 NATO  1/7  CHF  GH 11\xB726", 32, 4, 24, 600, null, 2);
    }),
    c("hg", 520, 44, () => {
      h("KR-7 MLR\xB710   M-LOK", 32, 4, 24, 600, null, 2);
    }),
    c("torque", 300, 40, () => {
      h("35 IN\xB7LB  \u27F3", 28, 4, 22, 600, mT, 1);
    }),
    c("gas", 230, 60, () => {
      (h("S", 40, 14, 32, 700, $r),
        h("N", 40, 98, 32, 700, $r),
        h("A", 40, 182, 32, 700, k5));
    }),
    c("mag30", 420, 150, () => {
      (f(46, 48, 34),
        h("KR\xB7MAG", 62, 98, 46, 700),
        h("30 RD  5.56\xD745", 40, 8, 116, 600, null, 1.5));
    }),
    c("mag45", 420, 150, () => {
      (f(46, 48, 34),
        h("KR\xB7MAG", 62, 98, 46, 700),
        h("45 RD  5.56\xD745", 40, 8, 116, 600, null, 1.5));
    }),
    c("speed", 420, 70, () => {
      h("SPEED\xB7PLATE", 54, 6, 38, 700, $r, 2);
    }),
    c("pane", 96, 256, (p, x) => {
      ((s.fillStyle = "rgba(14,16,20,0.36)"), s.fillRect(0, 0, p, x));
      let g = s.createLinearGradient(0, 0, p, 0);
      (g.addColorStop(0, "rgba(8,9,12,0.34)"),
        g.addColorStop(0.3, "rgba(8,9,12,0)"),
        g.addColorStop(0.72, "rgba(8,9,12,0)"),
        g.addColorStop(1, "rgba(8,9,12,0.3)"),
        (s.fillStyle = g),
        s.fillRect(0, 0, p, x));
      let b = s.createLinearGradient(0, 0, p, x * 0.5);
      (b.addColorStop(0.36, "rgba(205,215,230,0)"),
        b.addColorStop(0.47, "rgba(205,215,230,0.13)"),
        b.addColorStop(0.55, "rgba(205,215,230,0)"),
        (s.fillStyle = b),
        s.fillRect(0, 0, p, x),
        (s.strokeStyle = "rgba(215,222,232,0.2)"),
        (s.lineWidth = 1.2),
        s.beginPath(),
        s.moveTo(22, 40),
        s.lineTo(58, 150),
        s.moveTo(64, 96),
        s.lineTo(80, 232),
        s.stroke());
    }),
    c("stockn", 420, 56, () => {
      for (let p = 0; p < 6; p++)
        h(String(p + 1), 40, 14 + p * 68, 30, 700, $r);
    }),
    c("roundel", 150, 150, () => {
      f(75, 75, 62);
    }),
    c("gh", 300, 80, () => {
      h("GH-ARMS", 60, 6, 42, 700, null, 3);
    }),
    c("arrow", 60, 60, () => {
      ((s.fillStyle = $r),
        s.beginPath(),
        s.moveTo(30, 6),
        s.lineTo(54, 52),
        s.lineTo(6, 52),
        s.closePath(),
        s.fill());
    }),
    c("rdot", 60, 60, () => {
      ((s.fillStyle = k5),
        s.beginPath(),
        s.arc(30, 30, 24, 0, 6.2832),
        s.fill());
    }),
    c("wdot", 60, 60, () => {
      ((s.fillStyle = $r),
        s.beginPath(),
        s.arc(30, 30, 24, 0, 6.2832),
        s.fill());
    }),
    c("wline", 60, 60, () => {
      ((s.fillStyle = $r), s.fillRect(0, 0, 60, 60));
    }),
    c("rline", 60, 60, () => {
      ((s.fillStyle = k5), s.fillRect(0, 0, 60, 60));
    }),
    c("up", 190, 56, () => {
      (h("UP", 40, 6, 30, 700, $r),
        (s.strokeStyle = $r),
        (s.lineWidth = 5),
        s.beginPath(),
        s.arc(120, 30, 18, Math.PI * 0.9, Math.PI * 1.95),
        s.stroke(),
        (s.fillStyle = $r),
        s.beginPath(),
        s.moveTo(140, 22),
        s.lineTo(148, 36),
        s.lineTo(130, 34),
        s.closePath(),
        s.fill());
    }),
    c("lr", 150, 56, () => {
      (h("L", 40, 6, 30, 700, $r),
        h("R", 40, 116, 30, 700, $r),
        (s.strokeStyle = $r),
        (s.lineWidth = 5),
        s.beginPath(),
        s.moveTo(40, 30),
        s.lineTo(104, 30),
        s.stroke());
    }),
    c("zero", 240, 44, () => {
      h("200 \xB7 300 \xB7 400", 30, 4, 24, 600, $r, 1);
    }),
    c("push", 190, 44, () => {
      h("PUSH", 34, 6, 24, 700, mT, 3);
    }));
  for (let p = 2; p <= 44; p += 2)
    c("t" + p, p < 10 ? 34 : 54, 44, () => {
      h(String(p), 40, 3, 24, 700, $r);
    });
  let d = new CanvasTexture(e);
  ((d.anisotropy = 8), (d.colorSpace = SRGBColorSpace));
  let m = new MeshStandardMaterial({
    map: d,
    color: 16777215,
    transparent: !0,
    roughness: 0.6,
    metalness: 0.1,
    depthWrite: !1,
    polygonOffset: !0,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  return (
    (m.name = "kr7:marks"),
    (m.userData = {
      base: new Color(6974576),
      wear: 1,
      cells: n,
    }),
    m
  );
}
function P4() {
  if (vA) return vA;
  let o = ao(),
    t = TJ(),
    e = globalThis.GH_TUNE || {},
    s = (r, l) => (e[r] != null ? e[r] : l),
    n = {
      metal: MA(
        "anodised",
        {
          color: s("cMetal", 5395289),
          metal: s("mMetal", 0.3),
          rough: s("rMetal", 0.4),
          n: o.alu.normalMap,
          r: o.alu.roughnessMap,
          nRep: 90,
          ns: 0.3,
          wear: [s("wFlat", 0.025), s("wEdge", 0.31), 0.8],
          edge: [0.55, 0.22],
          wearTile: 16,
          bare: 9409175,
          bareRM: [0.4, 1],
          alt: s("cMetal2", 4868945),
        },
        t,
      ),
      poly: MA(
        "polymer",
        {
          color: s("cPoly", 4145220),
          metal: 0,
          rough: s("rPoly", 0.52),
          n: o.poly.normalMap,
          r: o.poly.roughnessMap,
          nRep: 60,
          ns: 0.3,
          wear: [0.015, 0.2, 0.7],
          edge: [0.3, 0.18],
          wearTile: 13,
          bare: 6711147,
          bareRM: [0.42, 0],
          alt: s("cFde", 9205591),
          altBare: 11245690,
        },
        t,
      ),
      furn: MA(
        "furniture",
        {
          color: s("cFurn", 9205591),
          metal: 0,
          rough: s("rFurn", 0.68),
          n: o.gripFDE.normalMap,
          r: o.gripFDE.roughnessMap,
          nRep: 34,
          ns: 0.9,
          wear: [0.015, 0.18, 0.7],
          edge: [0.25, 0.15],
          wearTile: 13,
          bare: 11245690,
          bareRM: [0.5, 0],
        },
        t,
      ),
      hard: SJ(o, t),
      mark: _J(),
      world: new MeshStandardMaterial({
        vertexColors: !0,
        metalness: 0.42,
        roughness: 0.56,
      }),
    };
  ((n.world.name = "kr7:world"),
    (n.world.userData = {
      base: new Color(3421755),
      wear: 1,
    }));
  let i = (n.studio = {
      ...n,
    }),
    a = (r, l, c, h, f) => {
      let u = r.clone();
      return (
        u.color.setHex(l),
        f != null && (u.metalness = f),
        (u.userData = {
          ...r.userData,
          kr: {
            ...r.userData.kr,
            uAltCol: {
              value: new Color(c),
            },
            uAltBare: {
              value: new Color(h),
            },
          },
        }),
        (u.onBeforeCompile = (d) => {
          (r.onBeforeCompile(d), Object.assign(d.uniforms, u.userData.kr));
        }),
        (u.customProgramCacheKey = r.customProgramCacheKey),
        u
      );
    };
  return (
    (i.metal = a(n.metal, 3685185, 3356220, 10330278, 0.74)),
    (i.poly = a(n.poly, 2368550, 6182983, 8747368)),
    (i.furn = a(n.furn, 6182983, 6182983, 9667178)),
    (i.hard = n.hard.clone()),
    i.hard.color.setScalar(0.6),
    (i.hard.onBeforeCompile = n.hard.onBeforeCompile),
    (i.hard.customProgramCacheKey = n.hard.customProgramCacheKey),
    (i.hard.userData = n.hard.userData),
    (vA = n)
  );
}
function tr(o, t, e) {
  let s = P4().mark.userData.cells[o];
  if (!s) throw new Error("kr7: unknown label " + o);
  e || (e = t / s[4]);
  let n = new PlaneGeometry(t, e),
    i = n.attributes.uv;
  for (let a = 0; a < i.count; a++)
    i.setXY(
      a,
      s[0] + i.getX(a) * (s[2] - s[0]),
      s[1] + i.getY(a) * (s[3] - s[1]),
    );
  return (n.translate(0, 0, 0.05), Qe(n));
}
function YF(o, t, e, s = {}) {
  let n = P4().mark.userData.cells[o];
  if (!n) throw new Error("kr7: unknown label " + o);
  let i = s.h || e / n[4],
    a = (s.phi ?? 180) * XF,
    r = s.u || 0,
    l = s.x || 0,
    c = s.y || 0,
    h = t + 0.05,
    f = new Ep(),
    u = [],
    d = Math.max(2, Math.ceil(i / t / (10 * XF))),
    m = Math.cos(a) < -1e-6 ? 1 : -1;
  for (let x = 0; x < d; x++) {
    let g = [];
    for (let [b, v] of [
      [0, x / d],
      [1, x / d],
      [1, (x + 1) / d],
      [0, (x + 1) / d],
    ]) {
      let y = a - (m * (v - 0.5) * i) / t,
        M = -r + m * (b - 0.5) * e;
      g.push({
        p: [l + h * Math.cos(y), c + h * Math.sin(y), M],
        n: [Math.cos(y), Math.sin(y), 0],
        t: [n[0] + b * (n[2] - n[0]), n[1] + v * (n[3] - n[1])],
      });
    }
    for (let [b, v, y] of [
      [g[0], g[1], g[2]],
      [g[0], g[2], g[3]],
    ]) {
      let M = v.p[0] - b.p[0],
        w = v.p[1] - b.p[1],
        T = v.p[2] - b.p[2],
        S = y.p[0] - b.p[0],
        E = y.p[1] - b.p[1],
        _ = y.p[2] - b.p[2];
      (w * _ - T * E) * b.n[0] + (T * S - M * _) * b.n[1] > 0
        ? (f.tri(b.p, v.p, y.p, [b.n, v.n, y.n]),
          u.push(...b.t, ...v.t, ...y.t))
        : (f.tri(b.p, y.p, v.p, [b.n, y.n, v.n]),
          u.push(...b.t, ...y.t, ...v.t));
    }
  }
  let p = f.geo();
  return (p.setAttribute("uv", new BufferAttribute(new Float32Array(u), 2)), p);
}
var Ms = {
  B: 46,
  DECK: 24,
  TOP: 67,
  RT: 77,
  HG0: 163,
  HG1: 432,
  HGW: 19.5,
  CROWN: 452,
  FH: 50,
  RIB0: 163.23,
  PITCH: 10,
  RIB: 4.77,
  SIGHT: 35,
  TUBE: 14.8,
};
var P5 = (o) => Ms.RIB0 - 2.615 - Ms.PITCH * o;
function QF(o) {
  let t = o
    .slice()
    .reverse()
    .map(([e, s]) => [-e, s, 0]);
  for (let e = 0; e < o.length; e++)
    o[e][2] === 2 && (t[o.length - 2 - e][2] = 2);
  return o.map((e) => [e[0], e[1], e[2] || 0]).concat(t);
}
var RJ = [
  [15.2, 24],
  [15.2, 26],
  [16, 26.8],
  [16, 59.15, 2],
  [15.75, 59.75],
  [10.8, 64.7],
  [10.8, Ms.TOP],
];
var AJ = [
  [15.2, 24],
  [15.2, 26],
  [16, 26.8],
  [16, 51.65, 2],
  [15.75, 52.25],
  [11.5, 57.5],
  [10.8, 58.5],
];
var _A = QF(RJ);
var RA = [
  [11, -19.5],
  [19.5, -11],
  [19.5, 9],
  [9, 19.5],
  [-9, 19.5],
  [-19.5, 9],
  [-19.5, -11],
  [-11, -19.5],
];
var AA = [
  [-48, 13, 4],
  [-18, 4, 6],
  [-4, -7, 4],
  [34, -7, 1.5],
  [40, -12, 1.5],
  [86, -12],
  [88, 14],
  [-34, 14],
  [-34, 38],
  [-48, 38],
];
var kA = [
  [-34, 24],
  [176, 24],
  [178, 12, 2],
  [171.5, 5, 3],
  [158, 5],
  [150, 13],
  [-30, 13],
  [-34, 16],
];
var C5 = (o) => -38 - (o - 88) * 0.11;
var bT = [
  [86, 22],
  [160, 22],
  [160, 4],
  [157.6, C5(157.6)],
  [87.4, C5(87.4)],
  [86, -12],
];
var CA = [
  [31.5, -20.6],
  [35.5, -26.5],
  [43, -37.5],
  [51, -42.8],
  [76, -43.6],
  [87.5, -36],
];
var PA = [
  [61, -7],
  [58.8, -15],
  [57.4, -22],
  [57.6, -29],
  [59.8, -34.5],
];
var oi = {
  c0: [14.5, -8],
  ax: [-0.2924, -0.9563],
  keys: [
    [-8, 1.5, 22.5, 12.3, 3.2],
    [6, 2.25, 23.25, 14.6, 3],
    [22, 0.6, 20.2, 15.9, 3.1],
    [44, 0, 20.5, 16.4, 3.5],
    [66, -0.1, 20.7, 15.9, 3.5],
    [80, 0.25, 21.6, 15.5, 2.8],
    [88, 0.5, 22.3, 15.7, 3],
  ],
  s0: -8,
  s1: 88,
};
var jF = !1;
var _y = (o) => {
  if (!jF) {
    jF = !0;
    let t = (globalThis.GH_TUNE && globalThis.GH_TUNE.heel) ?? 4;
    for (let [e, s] of [
      [4, 0.5],
      [5, 0.85],
      [6, 1],
    ])
      ((oi.keys[e][1] -= t * s), (oi.keys[e][2] += t * s));
  }
  return qF(oi.keys, o);
};
var z4 = null;
var kJ = () => {
  if (z4) return z4;
  let o = globalThis.GH_TUNE || {},
    t = o.swell ?? 1;
  return (
    (z4 = [
      [2, -0.5, 10, 0.45, (o.sw1 ?? 3.6) * t],
      [22, -0.35, 11, 0.4, (o.sw2 ?? 2.2) * t],
      [42, -0.6, 11, 0.4, (o.sw3 ?? 0.4) * t],
      [
        o.sw4p ?? 60,
        o.sw4q ?? -1,
        o.sw4s ?? 12,
        o.sw4c ?? 0.35,
        (o.sw4 ?? 0) * t,
      ],
    ]),
    (z4.g0 = o.swg0 ?? 0.05),
    (z4.g1 = o.swg1 ?? 0.3),
    z4
  );
};
var EA = (o, t) => {
  let e = 0,
    s = kJ(),
    n = Math.min(1, Math.max(0, (s.g0 - o) / s.g1));
  if (n <= 0) return 1;
  for (let i of s) {
    let a = (t - i[0]) / i[2],
      r = (o - i[1]) / i[3];
    e += i[4] * Math.exp(-a * a - (r > 0 ? r * r : 0));
  }
  return (
    1 +
    ((e * n * n * (3 - 2 * n)) / 16) *
      Math.min(1, Math.max(0, (t + 8) / 5)) *
      Math.min(1, Math.max(0, (88 - t) / 10))
  );
};
function JF(o, t, e) {
  let s = o * 1e3,
    n = -e * 1e3 - oi.c0[0],
    i = t * 1e3 - oi.c0[1],
    a = n * oi.ax[0] + i * oi.ax[1],
    r = a < oi.s0 ? oi.s0 : a > oi.s1 ? oi.s1 : a,
    l = _y(r),
    c = n * -oi.ax[1] + i * oi.ax[0] - l[1],
    h = l[4],
    f = Math.abs(s) / (l[3] * EA(c / l[2], r)),
    u = Math.abs(c) / l[2],
    d = Math.pow(f, h),
    m = Math.pow(u, h),
    p = Math.pow(d + m, 1 / h),
    x;
  if (p < 1e-4) x = -Math.min(l[2], l[3]);
  else {
    let v = Math.pow(f, h - 1) / l[3],
      y = Math.pow(u, h - 1) / l[2],
      M = Math.pow(p, 1 - h) * Math.hypot(v, y);
    x = (p - 1) / Math.max(M, 1e-6);
  }
  let g =
    a < oi.s0
      ? oi.s0 - a
      : a > oi.s1
        ? a - oi.s1
        : -Math.min(a - oi.s0, oi.s1 - a);
  return (x > 0 && g > 0 ? Math.hypot(x, g) : Math.max(x, g)) / 1e3;
}
var _h = {
  std: {
    len: 113.4,
    rounds: 30,
    pad: 6.5,
  },
  ext: {
    len: 176,
    rounds: 45,
    pad: 6.5,
  },
  fast: {
    len: 113.4,
    rounds: 30,
    pad: 15,
  },
};
var yf = 419;
var er = 31.25;
var L4 = 121.25;
var $F = 12;
var CJ = 22.4;
var Vi = (o, t) => {
  let e = o / yf;
  return [
    L4 + yf * (1 - Math.cos(e)) + t * Math.cos(e),
    -46 - yf * Math.sin(e) + t * Math.sin(e),
  ];
};
var yT = (o, t) => Vi(o, t);
function zA(o) {
  let t = _h[o],
    e = sn() ? 3 : Math.max(5, Math.round(t.len / 19)),
    s = [
      [L4 + er, $F],
      [L4 + er, -46],
    ];
  for (let n = 1; n <= e; n++) s.push(Vi((t.len * n) / e, er));
  for (let n = e; n >= 1; n--) s.push(Vi((t.len * n) / e, -er));
  return (s.push([L4 - er, -46], [L4 - er, $F]), s);
}
function LA(o) {
  let t = _h[o],
    e = o === "fast";
  return [
    Vi(t.len - 1.5, er + 2.4),
    Vi(t.len + t.pad, er + (e ? 4.5 : 2.6)),
    Vi(t.len + t.pad, -er - (e ? 3.5 : 2.2)),
    Vi(t.len - 1.5, -er - 2),
  ];
}
function DA(o) {
  let t = _h[o],
    e = [],
    s = [];
  for (let n = 4; n < t.len - 4; n += 12)
    (e.push(Vi(n, er + 0.9)), s.push(Vi(n, -er - 0.7)));
  return (
    e.push(Vi(t.len - 4, er + 0.9)),
    s.push(Vi(t.len - 4, -er - 0.7)),
    {
      front: Eh(e, 2.6),
      fw: 9.5,
      rear: Eh(s, 2.2),
      rw: 7,
    }
  );
}
function vT(o) {
  let t = _h[o],
    e = t.len + t.pad,
    s = e / yf;
  return {
    p: Vi(e, 0),
    down: [Math.sin(s), -Math.cos(s)],
    len: e,
    hw: o === "fast" ? 14.5 : 13.2,
  };
}
function TA(o, t, e, s, n = {}) {
  let i = Ms.RT,
    a = i - 3,
    r = n.alt ? (h) => o.metal(jr(h)) : (h) => o.metal(h);
  if (sn()) {
    let h = [
      [t, s],
      [t, a],
    ];
    for (
      let f = Math.ceil((t + 0.6 - Ms.RIB0) / Ms.PITCH);
      Ms.RIB0 + f * Ms.PITCH + Ms.RIB <= e - 0.4;
      f++
    ) {
      let u = Ms.RIB0 + f * Ms.PITCH;
      h.push([u, a], [u, i], [u + Ms.RIB, i], [u + Ms.RIB, a]);
    }
    (h.push([e, a], [e, s]), r(Pe(h, 19.4)));
    return;
  }
  let l = [
    [-8.2, s],
    [8.2, s],
    [8.2, a - 1.9],
    [10.1, a],
    [-10.1, a],
    [-8.2, a - 1.9],
  ];
  r(
    xf(
      [
        {
          u: t,
          pts: l,
        },
        {
          u: e,
          pts: l,
        },
      ],
      {
        capA: !0,
        capB: !0,
        bevA: n.bevA ?? 0.5,
        bevB: n.bevB ?? 0.5,
      },
    ),
  );
  let c = [
    [-10.1, a],
    [10.1, a],
    [10.35, a + 0.25],
    [7.6, i],
    [-7.6, i],
    [-10.35, a + 0.25],
  ];
  for (
    let h = Math.ceil((t + 0.6 - Ms.RIB0) / Ms.PITCH);
    Ms.RIB0 + h * Ms.PITCH + Ms.RIB <= e - 0.4;
    h++
  ) {
    let f = Ms.RIB0 + h * Ms.PITCH;
    r(
      xf(
        [
          {
            u: f,
            pts: c,
          },
          {
            u: f + Ms.RIB,
            pts: c,
          },
        ],
        {
          capA: !0,
          capB: !0,
          bevA: 0.35,
          bevB: 0.35,
        },
      ),
    );
  }
}
function tO(o, t, e, s) {
  let n = s;
  for (let i = 60; i >= -40; i--) {
    let a = P5(i);
    a < t + 3 ||
      a > e - 3 ||
      i & 1 ||
      (n <= 44 &&
        o.mark(
          cs(tr("t" + n, n < 10 ? 2.2 : 3.4, 2.9), [0, Ms.RT - 3, a], "T", 90),
        ),
      (n += 2));
  }
}
var wn = {
  u0: 58,
  u1: 130,
  y0: 39,
  y1: 57.5,
  r: 13.2,
};
function IA(o) {
  let t = _A,
    e = QF(AJ);
  if (
    (o.metal(
      xf(
        [
          {
            u: -34,
            pts: e,
          },
          {
            u: -15,
            pts: t,
          },
          {
            u: wn.u0,
            pts: t,
          },
        ],
        {
          capA: !0,
          capB: 0.3,
          bevA: 0.6,
        },
      ),
    ),
    sn())
  )
    (o.metal(
      xf(
        [
          {
            u: wn.u0,
            pts: t,
          },
          {
            u: wn.u1,
            pts: t,
          },
        ],
        {},
      ),
    ),
      o.hard(
        "black",
        cs(
          Th(wn.u1 - wn.u0, wn.y1 - wn.y0, 0.25),
          [16, (wn.y0 + wn.y1) / 2, (wn.u0 + wn.u1) / 2],
          "R",
        ),
      ),
      o.hard(
        "nib",
        cs(
          Th(wn.u1 - wn.u0 - 8, 9, 0.4),
          [16, Ms.B + 2, (wn.u0 + wn.u1) / 2 - 2],
          "R",
        ),
      ));
  else {
    let a = Math.asin((wn.y0 - Ms.B) / wn.r),
      r = Math.asin((wn.y1 - Ms.B) / wn.r) - A5,
      l = 22,
      c = [
        [15.2, 24, 0],
        [15.2, 26, 0],
        [16, 26.8, 0],
        [16, wn.y0, 0],
      ];
    for (let h = 0; h <= l; h++) {
      let f = a + ((r - a) * h) / l;
      c.push([Math.cos(f) * wn.r, Ms.B + Math.sin(f) * wn.r, 9]);
    }
    (c.push([16, wn.y1, 0], ...t.slice(3)),
      o.metal(
        xf(
          [
            {
              u: wn.u0,
              pts: c,
            },
            {
              u: wn.u1,
              pts: c,
            },
          ],
          {
            ao: (h, f, u) => (u[2] === 9 ? 0.32 : 1),
            crease: 0.35,
          },
        ),
      ));
  }
  o.metal(
    xf(
      [
        {
          u: wn.u1,
          pts: t,
        },
        {
          u: 160,
          pts: t,
        },
      ],
      {
        capA: 0.3,
        capB: !0,
        bevB: 0.6,
      },
    ),
  );
  let s = [
      [-30, 30, 1],
      [156, 30, 1.5],
      [156, 58.4, 1.5],
      [-14.5, 58.4, 1],
      [-30, 51.8, 1],
    ],
    n = [
      [-6, 36.5, 1.5],
      [84, 36.5, 1.5],
      [90, 42.5, 1.5],
      [90, 54, 1.5],
      [1, 54, 1.5],
      [-6, 47, 1.5],
    ],
    i = [
      [124, 36.5, 1.5],
      [150, 36.5, 1.5],
      [150, 54, 1.5],
      [124, 54, 1.5],
    ];
  if (
    (o.metal(
      Pe(s, 1.2, {
        x: -16.6,
        b: 0.4,
        holes: [n, i],
      }),
    ),
    o.metal(
      Pe(s, 1.2, {
        x: 16.6,
        b: 0.4,
        holes: [
          mn(wn.u0 + 1.6, wn.y0 + 0.5, wn.u1 - 1.6, wn.y1 - 0.5, 2.2),
          [
            [-8, 36.5, 1.5],
            [30, 36.5, 1.5],
            [30, 46, 1.5],
            [22, 54, 1.5],
            [-8, 54, 1.5],
          ],
        ],
      }),
    ),
    sn() ||
      (o.metal(
        mA(
          [
            [-10.8, Ms.TOP - 0.1],
            [10.8, Ms.TOP - 0.1],
            [9.6, Ms.TOP + 2.2],
            [-9.6, Ms.TOP + 2.2],
          ],
          -15,
          -11.4,
          {
            c: 0.3,
            b: 0.3,
          },
        ),
      ),
      o.mark(
        cs(tr("proof", 7.5), [-16.02, 45.5, 137], "L"),
        cs(tr("warn", 40), [17.22, 33.4, 96], "R"),
      )),
    o.metal(
      R4(
        [
          [16.4, 31],
          [16.4, 57.5],
          [23, 54.5, 1.5],
          [23, 49.5, 1.5],
        ],
        17.5,
        {
          y: 40.5,
          b: 1,
        },
      ),
    ),
    o.hard(
      "steel",
      s1(1.5, wn.u0 - 3, wn.u1 + 3, {
        x: Tp.x,
        y: Tp.y,
        seg: 8,
      }),
    ),
    !sn())
  )
    for (let a of [wn.u0 - 3.4, wn.u1 + 2.2])
      o.hard(
        "steel",
        s1(2.1, a, a + 1.2, {
          x: Tp.x,
          y: Tp.y,
          seg: 8,
        }),
      );
  (sn() && HA(o), TA(o, -11.5, 158, Ms.TOP), sn() || tO(o, -11.5, 158, 2));
}
var Tp = {
  x: 17.9,
  y: wn.y0 - 1.3,
  u: (wn.u0 + wn.u1) / 2,
};
function HA(o) {
  let t = [
    Pe(mn(wn.u0 + 0.5, 19.2, wn.u1 - 0.5, 36.4, 2), 1.3, {
      x: 0,
      b: 0.4,
    }),
  ];
  sn() ||
    t.push(
      Pe(mn(wn.u0 + 5, 22.4, wn.u1 - 5, 33.4, 1.5), 0.7, {
        x: 0.9,
        b: 0.3,
      }),
      Pe(mn(91, 19.6, 97, 22.6, 0.8), 2.2, {
        x: 0.4,
        b: 0.3,
      }),
    );
  for (let e of t) o.metal(A4(e, [18.3, 0, 0], [0, 0, 7], [0, 37.7, 0]));
}
function eO(o) {
  let t = Ms.B;
  if (!sn()) {
    o.hard(
      "nib",
      uo(
        [
          [36, 0],
          [36, 12.5],
          [104, 12.5],
          [106, 11.6, 1],
          [124, 11.6],
          [125.5, 10.4, 1],
          [125.5, 0],
        ],
        {
          y: t,
          seg: 16,
        },
      ),
    );
    for (let e = 0; e < 7; e++)
      o.hard(
        "steel",
        xA(cs(Th(1.3, 4.6, 0.05), [12.5, t - 0.5, 78 + e * 3.4], "R"), 0.55),
      );
    for (let e of [111, 116.5])
      o.hard(
        "black",
        cs(
          yl(1.3, 8, 0.05),
          [10.05, t + 5.84, e],
          [
            [0.86, 0.5, 0],
            [0, 0, -1],
          ],
        ),
      );
    o.hard(
      "steel",
      uo(
        [
          [125.5, 0],
          [125.5, 9.3],
          [143, 9.3],
          [144, 8.6, 1],
          [149, 8.6],
          [149, 0],
        ],
        {
          y: t,
          seg: 14,
        },
      ),
    );
    for (let e = 0; e < 7; e++)
      o.hard(
        "steel",
        KF(
          Pe(mn(143.5, t + 7.6, 149, t + 10.4), 3.4, {
            b: 0.4,
          }),
          (e * 360) / 7 + 12,
          t,
        ),
      );
    o.hard(
      "oxide",
      Pe(mn(133, t - 2.6, 148.6, t + 2.6, 0.6), 2.2, {
        x: 9.2,
        b: 0.4,
      }),
    );
  }
}
function sO(o) {
  sn() || SA(o, 0, Ms.B, 149.2);
}
var ma = {
  y0: 59.2,
  h: 5.2,
  u0: -51.5,
  u1: -41,
  hw: 24.5,
  hinge: [-8, 61.8, -43],
};
var nO = (o) => [
  [o * 7, -41, 0.6],
  [o * 25.5, -41.6, 1.2],
  [o * 27.6, -45.2, 1.5],
  [o * 25, -46.6, 1],
  [o * 7, -44.4, 0.6],
];
function FA(o) {
  let t = ma.y0;
  if (
    (o.hard(
      "alu",
      R4(
        [
          [-5.5, 20],
          [5.5, 20],
          [5.5, -40.5],
          [7.5, -44.6, 1],
          [24.5, -46.6, 1.5],
          [24.5, -51.5, 3],
          [-24.5, -51.5, 3],
          [-24.5, -46.6, 1.5],
          [-7.5, -44.6, 1],
          [-5.5, -40.5],
        ],
        ma.h,
        {
          y: t,
          b: 0.9,
        },
      ),
    ),
    o.hard(
      "steel",
      R4(nO(1), 4.2, {
        y: t + 0.5,
        b: 0.7,
      }),
    ),
    !sn())
  ) {
    o.hard("shadow", cs(Th(22, 3.2, 0.04), [0, t + ma.h, -28], "T", 90));
    for (let e = 0; e < 5; e++)
      o.hard(
        "alu",
        Pe(mn(-52.1, t + 0.9, -51.3, t + ma.h - 0.9), 3, {
          x: -9 + e * 4.5,
          b: 0.25,
        }),
      );
    for (let e = 0; e < 4; e++)
      o.hard(
        "steel",
        Pe(mn(-41.9 - e * 0.07, t + 1.1, -40.9 - e * 0.07, t + 4.1), 1.3, {
          x: 14 + e * 2.6,
          b: 0.25,
        }),
      );
    o.hard(
      "oxide",
      Uu(
        s1(1.5, 0, ma.h + 0.5, {
          seg: 8,
        }),
        "y+",
        [8, t - 0.25, -43],
      ),
    );
  }
}
function OA(o) {
  let t = ma.y0;
  if (
    (o.hard(
      "steel",
      R4(nO(-1), 4.2, {
        y: t + 0.5,
        b: 0.7,
      }),
    ),
    !sn())
  ) {
    for (let e = 0; e < 4; e++)
      o.hard(
        "steel",
        Pe(mn(-41.9 - e * 0.07, t + 1.1, -40.9 - e * 0.07, t + 4.1), 1.3, {
          x: -14 - e * 2.6,
          b: 0.25,
        }),
      );
    o.hard(
      "oxide",
      Uu(
        s1(1.5, 0, ma.h + 0.5, {
          seg: 8,
        }),
        "y+",
        [-8, t - 0.25, -43],
      ),
    );
  }
}
var qn = {
  selector: [10, 12],
  catchPivot: [106, 23.4],
  magRel: [78, 6],
  trigPivot: [60.5, -7],
  takedown: [-20, 17],
  pivot: [166, 14.5],
  trigPin: [50, 3],
  hamPin: [29, 8],
  housingHW: 12.5,
  deckHW: 15.2,
  wellHW: 14.5,
  wellIn: 11.6,
  catchX: -20.8,
  magRelX: 16.4,
  selX: 16.7,
};
function NA(o) {
  let t = qn.housingHW,
    e = qn.deckHW,
    s = qn.wellHW;
  (o.metal(
    Pe(AA, t * 2, {
      b: 0.9,
    }),
  ),
    o.metal(
      Pe(kA, e * 2, {
        b: 0.7,
      }),
    ),
    o.metal(
      uo(
        [
          [-48, 14.9],
          [-48, 17],
          [-47.2, 17.8, 1],
          [-34.8, 17.8],
          [-34, 17, 1],
          [-34, 14.9],
        ],
        {
          y: Ms.B,
          seg: 24,
        },
      ),
    ));
  let n = [
      [97, -29, 2],
      [150.5, -34.8, 2],
      [151.5, 13.5, 2],
      [105, 13.5, 4],
      [97, 5.5, 3],
    ],
    i = [
      [97, -29, 2],
      [150.5, -34.8, 2],
      [151.5, -4, 2],
      [97, -4, 2],
    ];
  for (let a of [-1, 1])
    (o.metal(
      Pe(bT, 1.9, {
        x: a * 12.55,
        b: 0.3,
      }),
    ),
      o.metal(
        Pe(bT, 1, {
          x: a * 14,
          b: 0.4,
          holes: [a < 0 ? n : i],
        }),
      ));
  if (
    (o.metal(
      Pe(
        [
          [155.2, 22],
          [160, 22],
          [160, 4],
          [157.6, C5(157.6)],
          [155.2, C5(155.2)],
        ],
        s * 2,
        {
          b: 0.6,
        },
      ),
    ),
    o.metal(
      Pe(
        [
          [86, 20],
          [89.2, 20],
          [89.2, C5(89.2)],
          [87.4, C5(87.4)],
          [86, -12],
        ],
        s * 2,
        {
          b: 0.6,
        },
      ),
    ),
    !sn())
  ) {
    let a = (r, l, c, h, f) => {
      let u = [],
        m = [
          [c - f, r - f, 0],
          [l + f, r - f, 90],
          [l + f, -r + f, 180],
          [c - f, -r + f, 270],
        ];
      for (let [p, x, g] of m)
        for (let b = 0; b <= 4; b++) {
          let v = (g + (90 * b) / 4) * Yr,
            y = p + Math.cos(v) * f,
            M = x + Math.sin(v) * f;
          u.push([M, C5(y) + h, -y]);
        }
      return u;
    };
    o.metal(
      k4(
        [
          a(14.5, 86, 160, 9, 2.5),
          a(14.6, 85.9, 160.2, 7, 2.6),
          a(17, 83.6, 162.6, 0.6, 4),
          a(16.6, 84, 162.2, 0, 3.8),
          a(15.2, 85.4, 160.8, 0, 2.8),
          a(11.7, 89.1, 155.3, 6.5, 1.2),
        ],
        {
          crease: 0.5,
          flag: (r) => [r === 2 || r === 3 ? 2 : 1, r === 4 ? 0.55 : 1],
        },
      ),
    );
    for (let r of [-1, 1])
      o.hard(
        "shadow",
        xA(
          Pe(mn(89.4, -32, 155, 21), 0.2, {
            x: r * 11.55,
            b: 0,
          }),
          0.6,
        ),
      );
    (o.hard(
      "black",
      Pe(mn(89.4, 21, 155, 21.6), 23, {
        b: 0,
      }),
      pa(Er(23.2, 52, 0, 0, -6), 0.2, {
        u: 89.3,
        b: 0,
      }),
      pa(Er(23.2, 60, 0, 0, -10), 0.2, {
        u: 155,
        b: 0,
      }),
    ),
      o.hard(
        "steel",
        Pe(mn(134, 18.6, 153, 20.4, 0.4), 14, {
          b: 0.3,
        }),
      ));
    for (let r = 0; r < 5; r++)
      o.metal(
        Pe(mn(159.6, -33 + r * 7.4, 161, -30.2 + r * 7.4), 22, {
          b: 0.45,
        }),
      );
    for (let r of [-1, 1]) {
      let l = r > 0 ? "R" : "L";
      (o.metal(
        R4(
          [
            [r * 12.2, 62],
            [r * 14.4, 86.4],
            [r * 12.2, 86.4],
          ],
          24,
          {
            y: -11.5,
            b: 0.5,
          },
        ),
      ),
        o.metal(
          cs(
            n1(e1(10, 6.9), 0.9, {
              b: 0.35,
            }),
            [r * e, qn.pivot[1], qn.pivot[0]],
            l,
          ),
          cs(
            n1(e1(10, 6.9), 0.9, {
              b: 0.35,
            }),
            [r * e, qn.takedown[1], qn.takedown[0]],
            l,
          ),
        ),
        o.metal(
          Pe(
            [
              [-10, -3.2, 1.2],
              [52, -8.4, 1.2],
              [64, -8.4, 1.2],
              [70, -1.5, 1],
              [-12, 3, 1],
            ],
            0.8,
            {
              x: r * (t + 0.4),
              b: 0.35,
            },
          ),
        ));
    }
  }
  for (let a of [-1, 1]) {
    for (let [r, l] of [qn.pivot, qn.takedown])
      (o.hard(
        "oxide",
        bl(3.7, 1.3, a > 0 ? "x+" : "x-", [a * (e + 0.7), l, r], {
          seg: 10,
          c: 0.45,
        }),
      ),
        !sn() &&
          a < 0 &&
          o.hard("black", cs(yl(1.1, 8, 0.03), [a * (e + 2), l, r], "L")));
    if (!sn())
      for (let [r, l] of [qn.trigPin, qn.hamPin])
        o.hard(
          "oxide",
          bl(1.95, 0.9, a > 0 ? "x+" : "x-", [a * (t + 0.1), l, r], {
            seg: 10,
            c: 0.3,
          }),
        );
  }
  if (
    (o.metal(
      Pe(Eh(CA, 3.2), 15, {
        b: 0.9,
      }),
    ),
    !sn())
  ) {
    (o.metal(
      cs(
        n1(e1(14, 7.6), 2.6, {
          b: 0.6,
          holes: [e1(10, 5)],
        }),
        [t, qn.magRel[1], qn.magRel[0]],
        "R",
      ),
    ),
      o.hard(
        "shadow",
        cs(yl(5, 14, 0.05), [t, qn.magRel[1], qn.magRel[0]], "R"),
      ));
    for (let a of [98.5, 111.5])
      o.metal(
        Pe(mn(a, 16.5, a + 3, 26.5, 0.8), 3.6, {
          x: -(e + 1.5),
          b: 0.5,
        }),
      );
    o.hard(
      "oxide",
      s1(1.1, 98, 115, {
        x: -(e + 1.8),
        y: qn.catchPivot[1],
        seg: 6,
        c: 0,
      }),
    );
    for (let a of [-1, 1]) {
      let r = a > 0 ? "R" : "L",
        [l, c] = qn.selector,
        h = a * (t + 0.02);
      (o.metal(
        cs(
          n1(e1(12, 6.6), 0.7, {
            b: 0.3,
          }),
          [a * t, c, l],
          r,
        ),
      ),
        o.mark(
          cs(tr("safe", 4.6), [h, c - 1.6, l + 21.5], r),
          cs(tr("semi", 4.6), [a * (e + 0.02), c + 7.6, l], r),
          cs(tr("auto", 4.6), [h, c - 5.6, l - 15.5], r),
        ));
    }
    (o.mark(
      cs(tr("kr7", 44), [-(s - 1 + 0.02), -6.5, 125], "L"),
      cs(tr("sn", 21), [-(t + 0.02), 7.6, 48], "L"),
    ),
      o.mark(
        cs(tr("dm", 17), [s - 1 + 0.02, -17, 124], "R"),
        cs(tr("gh", 15), [t + 0.02, 6.5, 43], "R"),
      ));
  }
}
function BA(o) {
  let [t, e] = qn.selector,
    s = qn.housingHW;
  for (let n of [-1, 1]) {
    let i = n > 0 ? "R" : "L",
      a = n < 0 ? 21 : 14,
      r = n < 0 ? 1 : -1;
    if (
      (o.hard(
        "oxide",
        bl(4.6, 3.4, n > 0 ? "x+" : "x-", [n * (s + 0.6), e, t], {
          seg: 10,
          c: 0.5,
        }),
      ),
      !sn())
    ) {
      o.hard(
        "oxide",
        cs(
          n1(
            [
              [-3 * r, -3.2, 1],
              [a * r, -2.4, 1.6],
              [a * r, 2.4, 1.6],
              [-3 * r, 3.2, 1],
            ],
            2.6,
            {
              b: 0.6,
            },
          ),
          [n * (s + 1.6), e, t],
          i,
        ),
      );
      for (let l = 0; l < 4; l++)
        o.hard(
          "oxide",
          cs(
            n1(Er(1, 4.2, 0, r * (a - 2.2 - l * 2.2), 0), 0.6, {
              b: 0.2,
            }),
            [n * (s + 4.2), e, t],
            i,
          ),
        );
      o.mark(cs(tr("wline", 4.5, 0.7), [n * (s + 4.22), e, t - 5], i));
    }
  }
}
function UA(o) {
  let t = qn.catchX;
  if (
    (o.hard(
      "steel",
      Pe(
        [
          [100.5, 17.5, 1],
          [111, 17.5, 1],
          [112, 29, 1],
          [117, 33, 2],
          [117, 47, 3],
          [105, 51, 3],
          [99.5, 36, 2],
        ],
        3.2,
        {
          x: t + 1.6,
          b: 0.8,
        },
      ),
    ),
    !sn())
  ) {
    for (let e = 0; e < 5; e++)
      o.hard(
        "steel",
        Pe(mn(103.5, 35.6 + e * 3, 115, 37 + e * 3), 0.9, {
          x: t - 0.3,
          b: 0.3,
        }),
      );
    o.hard(
      "steel",
      Pe(mn(101, 18.5, 110.5, 23.5), 1, {
        x: t - 0.2,
        b: 0.3,
      }),
    );
  }
}
function VA(o) {
  let [t, e] = qn.magRel,
    s = qn.housingHW;
  if (
    (o.hard(
      "steel",
      bl(4.5, qn.magRelX - s, "x+", [s, e, t], {
        seg: 12,
        c: 0.5,
      }),
    ),
    !sn())
  ) {
    for (let n = 0; n < 4; n++)
      o.hard(
        "steel",
        Pe(mn(t - 3.6 + n * 2.1, e - 3, t - 2.7 + n * 2.1, e + 3), 0.5, {
          x: qn.magRelX + 0.15,
          b: 0.2,
        }),
      );
    (o.hard(
      "steel",
      Pe(mn(70, e - 3.3, 90.5, e + 3.3, 1.2), 1.8, {
        x: -(s + 0.5),
        b: 0.5,
      }),
    ),
      o.hard(
        "oxide",
        bl(1.5, 0.5, "x-", [-(s + 1.4), e, t], {
          seg: 8,
          c: 0.2,
        }),
      ));
  }
}
function GA(o) {
  o.hard(
    "oxide",
    Pe(Eh(PA, 4.2), 6.6, {
      b: 1.3,
      bs: 2,
      soft: !0,
    }),
  );
}
function WA(o) {
  let t = sn()
      ? [-8, 20, 50, 88]
      : [-8, -2, 6, 14, 22, 30, 38, 46, 54, 62, 70, 78, 84, 88],
    e = sn() ? 10 : 24,
    s = [],
    n = (h, f, u) => [
      u,
      oi.c0[1] + oi.ax[1] * h + oi.ax[0] * f,
      -(oi.c0[0] + oi.ax[0] * h - oi.ax[1] * f),
    ];
  for (let h of t) {
    let [, f, u, d, m] = _y(h),
      p = [],
      x = 2 / m;
    for (let g = 0; g < e; g++) {
      let b = (g / e) * A5,
        v = Math.cos(b),
        y = Math.sin(b),
        M = Math.sign(v) * Math.pow(Math.abs(v), x);
      p.push(
        n(h, f + u * M, d * EA(M, h) * Math.sign(y) * Math.pow(Math.abs(y), x)),
      );
    }
    s.push(p);
  }
  if (!sn()) {
    let [, h, f, u] = _y(88),
      d = [];
    for (let m = 0; m < e; m++) {
      let p = (m / e) * A5;
      d.push(n(89.8, h + (f - 2.4) * Math.cos(p), (u - 2.4) * Math.sin(p)));
    }
    s.push(d);
  }
  if (
    (o.furn(
      k4(s, {
        capB: !0,
        crease: 0.75,
      }),
    ),
    sn())
  )
    return;
  let i = (h, f, u) => {
      let [, d, m, p, x] = _y(h),
        g = 2 / x,
        b = Math.cos(f),
        v = Math.sin(f),
        y = m * Math.sign(b) * Math.pow(Math.abs(b), g),
        M = p * EA(y / m, h) * Math.sign(v) * Math.pow(Math.abs(v), g),
        w = Math.hypot(y / m, M / p) || 1;
      return n(h, d + y + (u * (y / m)) / w, M + (u * (M / p)) / w);
    },
    a = (h, f, u, d, m, p, x, g = 1) => {
      let b = new Ep(),
        v = (y, M) =>
          i(
            h + ((f - h) * y) / p,
            u + ((d - u) * M) / x,
            y === 0 || y === p || M === 0 || M === x ? 0.05 : m,
          );
      for (let y = 0; y < p; y++)
        for (let M = 0; M < x; M++)
          b.quad(
            v(y, M),
            v(y, M + 1),
            v(y + 1, M + 1),
            v(y + 1, M),
            null,
            y === 0 || y === p - 1 || M === 0 || M === x - 1 ? g : 1,
          );
      return gA(b.geo(), 0.9);
    };
  for (let h = 0; h < 9; h++)
    o.furn(a(26 + h * 6.2, 29.4 + h * 6.2, -0.62, 0.62, 0.9, 2, 4, 2));
  o.hard("rubber", a(14, 80, Math.PI - 0.5, Math.PI + 0.5, 0.7, 11, 4, 2));
  let r = (h, f, u, d, m, p, x, g = 3.2) => {
    let b = new Ep(),
      v = (h + f) / 2,
      y = (f - h) / 2,
      M = (u + d) / 2,
      w = (d - u) / 2,
      T = (S, E) => {
        let _ = h + ((f - h) * S) / p,
          R = Math.pow(
            Math.max(0, 1 - Math.pow(Math.abs(_ - v) / y, g)),
            1 / g,
          );
        return i(
          _,
          M + w * (0.45 + 0.55 * R) * ((2 * E) / x - 1),
          S === 0 || S === p || E === 0 || E === x ? 0.05 : m,
        );
      };
    for (let S = 0; S < p; S++)
      for (let E = 0; E < x; E++)
        b.quad(
          T(S, E),
          T(S, E + 1),
          T(S + 1, E + 1),
          T(S + 1, E),
          null,
          S === 0 || S === p - 1 || E === 0 || E === x - 1 ? 2 : 1,
        );
    return gA(b.geo(), 0.9);
  };
  for (let h of [1, -1]) {
    let f = h > 0 ? Math.PI / 2 : (3 * Math.PI) / 2,
      u = h > 0 ? f - 0.56 : f - 0.66,
      d = h > 0 ? f + 0.66 : f + 0.56;
    o.hard("rubber", r(11, 70, u, d, 0.75, 14, 6));
    for (let m of [75.5, 79.5])
      o.furn(a(m, m + 1.9, u + 0.08, d - 0.08, 0.5, 2, 5, 2));
  }
  {
    let h = i(40, (3 * Math.PI) / 2 + 0.03, 0.82);
    o.mark(cs(tr("roundel", 9.5), [h[0], h[1], -h[2]], "L", 17));
  }
  let l = n(89.9, _y(88)[1], 0),
    c = [
      [0, oi.ax[1], -oi.ax[0]],
      [1, 0, 0],
    ];
  (o.hard(
    "poly",
    cs(
      n1(Er(24, 19, 5), 0.8, {
        b: 0.3,
      }),
      [l[0], l[1], -l[2]],
      c,
    ),
  ),
    o.hard(
      "oxide",
      cs(
        n1(e1(12, 2.6), 0.5, {
          b: 0.2,
        }),
        [l[0], l[1] - 0.7, -l[2] - 0.2],
        c,
      ),
    ));
}
function qA(o, t) {
  let e = Ms.B,
    s = (n) => C4(n, (i, a, r) => (r > Ms.HG0 && r < Ms.HG1 - 4 ? 0.6 : 1));
  if (
    (o.hard(
      "steel",
      uo(
        [
          [160, 14],
          [160, 16.8, 1],
          [166.5, 16.8],
          [167, 14, 1],
        ],
        {
          y: e,
          seg: 20,
        },
      ),
    ),
    o.hard(
      "steel",
      s(
        uo(
          [
            [164, 12.6],
            [198, 12.6],
            [203, 10.6, 1],
            [317, 10.6],
            [318, 11.2],
            [348, 11.2],
            [349, 9.3, 1],
            [444, 9.3],
            [445, 9.8, 1],
            [Ms.CROWN - 0.4, 9.8],
            [Ms.CROWN, 9.3, 1],
            [Ms.CROWN, 3.4],
          ],
          {
            y: e,
            seg: 18,
          },
        ),
      ),
    ),
    sn())
  )
    o.hard("steel", Pe(mn(319, e + 7, 347, e + 16), 13));
  else {
    (o.hard(
      "steel",
      s(
        uo(
          [
            [319, 11.2],
            [319, 13.4],
            [320, 14, 1],
            [345, 14],
            [346, 13.4, 1],
            [346, 11.2],
          ],
          {
            y: e,
            seg: 16,
          },
        ),
      ),
    ),
      o.hard(
        "steel",
        s(
          Pe(
            [
              [318.5, e + 7, 1],
              [347, e + 7, 1],
              [347, e + 16.4, 2],
              [322, e + 16.4, 2],
              [318.5, e + 13.5, 1],
            ],
            13.5,
            {
              b: 0.7,
            },
          ),
        ),
      ),
      o.hard(
        "oxide",
        s(
          uo(
            [
              [346.5, 3.2],
              [347.5, 4.3, 1, 0.5],
              [354, 4.3, 0, 0.5],
              [354.8, 3.6, 1],
              [354.8, 0],
            ],
            {
              y: e + 12.2,
              flute: {
                n: 10,
              },
            },
          ),
        ),
      ),
      o.hard(
        "steel",
        s(
          uo(
            [
              [296, 3.6],
              [297, 4.1, 1],
              [318.5, 4.1],
            ],
            {
              y: e + 12.2,
              seg: 10,
            },
          ),
        ),
        s(
          s1(2.4, 166, 297, {
            y: e + 12.2,
            seg: 8,
            c: 0,
          }),
        ),
      ));
    for (let n of [-1, 1])
      o.hard(
        "oxide",
        s(
          bl(1.6, 0.6, n > 0 ? "x+" : "x-", [n * 6.6, e + 12, 332], {
            seg: 8,
            c: 0.2,
          }),
        ),
      );
    o.mark(
      YF("brl", 9.3, 34, {
        phi: 148,
        u: 414,
        y: e,
        h: 2.6,
      }),
    );
  }
  t ? KA(o) : o.hard("black", cs(yl(3.4, 10, 0.02), [0, e, Ms.CROWN], "F"));
}
function KA(o) {
  let t = Ms.B,
    e = Ms.CROWN,
    s = Ms.FH;
  if (sn()) {
    o.hard(
      "steel",
      uo(
        [
          [e, 9.3],
          [e + 2, 11.2],
          [e + 11, 11.2],
          [e + 12, 10.6],
          [e + 17, 10.6],
          [e + 18, 9.8],
          [e + s - 3, 9.8],
          [e + s, 8.4],
          [e + s, 5.6],
          [e + 18, 5.6],
        ],
        {
          y: t,
          seg: 12,
        },
      ),
    );
    return;
  }
  (o.hard(
    "bright",
    uo(
      [
        [e, 8.4],
        [e + 0.3, 9.6, 1],
        [e + 1.7, 9.6],
        [e + 2, 8.4, 1],
      ],
      {
        y: t,
        seg: 16,
      },
    ),
  ),
    o.hard(
      "steel",
      pa(e1(8, 11.2 / Math.cos(Math.PI / 8), Math.PI / 8, 0, t), 9, {
        u: e + 2.1,
        b: 0.6,
      }),
    ),
    o.hard(
      "steel",
      uo(
        [
          [e + 11, 5.4],
          [e + 11, 10.2],
          [e + 11.6, 10.8, 1],
          [e + 17, 10.8],
          [e + 17.6, 10.3, 1],
          [e + 17.6, 5.6],
        ],
        {
          y: t,
          seg: 20,
        },
      ),
    ),
    o.hard(
      "black",
      uo(
        [
          [e + 17.5, 5.5],
          [e + 9, 5.5],
          [e + 9, 0],
        ],
        {
          y: t,
          seg: 12,
        },
      ),
    ));
  for (let n = 0; n < 3; n++) {
    let i = (90 + n * 120 - 36) * Yr,
      a = (90 + n * 120 + 36) * Yr,
      r = 5,
      l = (c, h, f) => {
        let u = [];
        for (let d = 0; d <= r; d++) {
          let m = i + f + ((a - i - 2 * f) * d) / r;
          u.push([Math.cos(m) * c, t + Math.sin(m) * c, 0]);
        }
        for (let d = r; d >= 0; d--) {
          let m = i + f + ((a - i - 2 * f) * d) / r;
          u.push([Math.cos(m) * h, t + Math.sin(m) * h, d === 0 ? 0 : 9]);
        }
        return u;
      };
    o.hard(
      "steel",
      xf(
        [
          {
            u: e + 17.2,
            pts: l(10.3, 5.6, 0),
          },
          {
            u: e + s - 3,
            pts: l(10, 5.6, 0.02),
          },
          {
            u: e + s,
            pts: l(8.6, 6.4, 0.12),
          },
        ],
        {
          capB: !0,
          crease: 0.45,
          ao: (c, h, f) => (f[2] === 9 ? 0.45 : 1),
        },
      ),
    );
  }
}
function XA(o) {
  let t = Ms.B,
    e = 2.6,
    s = Ms.HG0,
    n = Ms.HG1,
    i = RA,
    a = i.map((u) => [u[0], u[1] + t]);
  if (sn()) {
    let u = (d, m, p) => [
      [d - m, -p],
      [d + m, -p],
      [d + m, p],
      [d - m, p],
    ];
    for (let d = 0; d < 8; d++) {
      let m = i[d],
        p = i[(d + 1) % 8],
        x = (m[0] + p[0]) / 2,
        g = (m[1] + p[1]) / 2,
        b = Math.hypot(p[0] - m[0], p[1] - m[1]),
        v = Math.hypot(x, g),
        y = Math.atan2(g, x),
        M = Math.abs(x) < 1 && g > 0,
        w = Math.abs(g) < 1 || Math.abs(x) < 1,
        T = M
          ? null
          : w
            ? [205, 245, 285, 325, 365, 405].map((E) => u(E, 16, 3.5))
            : g > 0
              ? [225, 265, 305, 345, 385].map((E) => u(E, 13, 2.4))
              : [245, 285, 325, 365].map((E) => u(E, 11, 2.6)),
        S = Pe(mn(s + 21, -b / 2, n, b / 2), e, {
          x: v - e / 2,
          keepHoles: !0,
          holes: T,
        });
      (S.rotateZ(y), S.translate(0, t, 0), o.metal(jr(S)));
    }
    (o.metal(
      jr(
        xf(
          [
            {
              u: s,
              pts: a,
            },
            {
              u: s + 21,
              pts: a,
            },
          ],
          {
            capA: !0,
            capB: !0,
          },
        ),
      ),
    ),
      o.metal(
        jr(
          Pe(
            [
              [s + 0.6, t - 27.5],
              [s + 18, t - 27.5],
              [s + 21, t - 19.4],
              [s + 0.6, t - 19.4],
            ],
            17,
          ),
        ),
      ),
      TA(o, s + 0.6, n - 1, t + 19.3, {
        alt: !0,
      }));
    return;
  }
  let r = (u) => mn(u - 16, -3.5, u + 16, 3.5, 1.3),
    l = (u, d, m, p, x, g) =>
      Array.from(
        {
          length: u,
        },
        (b, v) =>
          mn(
            d + v * m - p / 2,
            -x / 2,
            d + v * m + p / 2,
            x / 2,
            g ?? x * 0.49,
          ),
      ),
    c = s + 21.2,
    h = n - 3.5;
  for (let u = 0; u < 8; u++) {
    let d = i[u],
      m = i[(u + 1) % 8],
      p = (d[0] + m[0]) / 2,
      x = (d[1] + m[1]) / 2,
      g = Math.hypot(m[0] - d[0], m[1] - d[1]) + 0.9,
      b = Math.hypot(p, x),
      v = Math.atan2(x, p),
      y = Math.abs(p) < 1 && x > 0,
      M = Math.abs(x) < 1 || Math.abs(p) < 1,
      w = !M && x > 0,
      T = y
        ? null
        : M
          ? [205, 245, 285, 325, 365, 405].map(r)
          : w
            ? l(5, 225, 40, 26, 4.8, 1.6)
            : l(4, 245, 40, 22, 5.2, 1.6),
      S = Pe(mn(c, -g / 2, h, g / 2), e, {
        x: b - e / 2,
        b: 0.55,
        cs: 1,
        holes: T,
      });
    (C4(S, (E) => (E < b - e + 0.4 ? 0.3 : 1)),
      S.rotateZ(v),
      S.translate(0, t, 0),
      o.metal(jr(S)));
  }
  let f = i.map((u) => [u[0] * 0.84, u[1] * 0.84 + t]);
  (o.metal(
    jr(
      pa(a, 21, {
        u: s + 0.4,
        b: 0.6,
        holes: [f],
      }),
    ),
  ),
    o.metal(
      jr(
        pa(a, 3.2, {
          u: n - 3.4,
          b: 0.7,
          holes: [e1(12, 15.2, 0, 0, t)],
        }),
      ),
    ),
    o.metal(
      jr(
        Pe(
          [
            [s + 0.6, t - 27.5, 1.5],
            [s + 18, t - 27.5, 3],
            [s + 21, t - 19.4],
            [s + 0.6, t - 19.4],
          ],
          17,
          {
            b: 0.8,
          },
        ),
      ),
    ),
    o.hard(
      "black",
      Pe(mn(s + 0.5, t - 27.7, s + 19, t - 19.6), 0.7, {
        b: 0,
      }),
    ));
  for (let u of [s + 5.5, s + 14])
    (o.hard(
      "oxide",
      bl(3, 1.2, "x+", [8.5, t - 23.6, u], {
        seg: 12,
        c: 0.4,
      }),
      bl(3.3, 1, "x-", [-8.5, t - 23.6, u], {
        seg: 6,
        c: 0.3,
      }),
    ),
      o.hard("black", cs(yl(1.5, 6, 0.03), [9.7, t - 23.6, u], "R")));
  for (let u of [-1, 1])
    (o.metal(
      jr(
        Pe(
          [
            [150, 50, 1],
            [s + 1, 50],
            [s + 1, 59],
            [152, 59, 1.5],
          ],
          2,
          {
            x: u * 18.2,
            b: 0.6,
          },
        ),
      ),
    ),
      xT(
        o,
        [u * 14.28, t + 14.28, s + 11],
        [
          [u * 0.7071, 0.7071, 0],
          [0, 0, -1],
        ],
      ));
  (o.hard(
    "oxide",
    bl(4.5, 7.4, [-0.7071, 0.7071, 0], [-14.28, t + 14.28, s + 11], {
      seg: 10,
      c: 0.5,
    }),
    s1(4.9, Sh.u - 3.1, Sh.u + 3.1, {
      x: Sh.x,
      y: Sh.y,
      seg: 10,
      c: 0.8,
    }),
  ),
    o.hard(
      "bright",
      bl(1.7, 0.5, [-0.7071, 0.7071, 0], [Sh.x - 3.5, Sh.y + 3.5, Sh.u], {
        seg: 8,
        c: 0.15,
      }),
    ),
    o.mark(
      cs(tr("hg", 19), [-19.55, t + 4.5, s + 11], "L"),
      cs(tr("torque", 12), [19.55, t - 6.5, s + 11], "R"),
    ),
    TA(o, s + 0.6, n - 1, t + 19.3, {
      bevA: 0.3,
      alt: !0,
    }),
    tO(o, s + 0.6, n - 1, 20));
}
var Sh = {
  x: -14.28 - 7.1,
  y: Ms.B + 14.28 + 7.1,
  u: Ms.HG0 + 11,
  drop: 23,
  half: 12.5,
};
function oO(o) {
  let { x: t, y: e, u: s, drop: n, half: i } = Sh,
    a = 4.2,
    r = [];
  for (let [l, c, h] of [
    [i - a, -a, 90],
    [i - a, -n + a, 0],
    [-i + a, -n + a, -90],
    [-i + a, -a, -180],
  ])
    for (let f = 0; f <= 3; f++) {
      let u = (h - f * 30) * Yr;
      r.push(
        new Vector3(t, e + c + Math.sin(u) * a, -(s + l + Math.cos(u) * a)),
      );
    }
  o.hard(
    "steel",
    Qe(
      new TubeGeometry(
        new CatmullRomCurve3(r, !0, "centripetal", 0.5),
        sn() ? 12 : 32,
        1.35,
        5,
        !0,
      ),
    ),
  );
}
function xT(o, t, e) {
  (o.hard(
    "steel",
    cs(
      uo(
        [
          [0, 6],
          [1, 6],
          [1.3, 5.7, 1],
          [1.3, 4.4],
          [0.2, 4.4],
        ],
        {
          seg: 14,
        },
      ).rotateX(Math.PI),
      t,
      e,
    ),
  ),
    o.hard("black", cs(yl(4.4, 12, 0.2), t, e)));
}
function YA(o) {
  let t = Ms.B;
  if (
    (o.hard(
      "alu",
      uo(
        [
          [-232, 0],
          [-232, 13.6],
          [-231, 14.8, 1],
          [-56, 14.8],
        ],
        {
          y: t,
          seg: 20,
        },
      ),
    ),
    o.hard(
      "steel",
      uo(
        [
          [-60, 14.8],
          [-60, 18.4, 0, 1.6],
          [-59.4, 19.6, 1, 1.6],
          [-54.6, 19.6, 0, 1.6],
          [-54, 19.6],
          [-51.8, 19.6],
          [-51.4, 18.6, 1],
          [-51.4, 14.8],
        ],
        {
          y: t,
          flute: {
            n: 6,
            trap: !0,
          },
        },
      ),
    ),
    o.hard(
      "steel",
      pa(
        [
          [-17.5, t - 27, 5],
          [17.5, t - 27, 5],
          [19.5, t, 3],
          [17.5, t + 20.5, 6],
          [-17.5, t + 20.5, 6],
          [-19.5, t, 3],
        ],
        3,
        {
          u: -51.2,
          b: 0.7,
        },
      ),
    ),
    !sn())
  ) {
    for (let e of [38, 142])
      o.hard(
        "black",
        cs(
          yl(0.9, 6, 0.03),
          [Math.cos(e * Yr) * 16.5, t + Math.sin(e * Yr) * 16.5, -51.2],
          "B",
        ),
      );
    for (let e = 0; e < 6; e++)
      o.hard("black", cs(yl(2.1, 8, 0.02), [0, t - 14.8, -92 - e * 19], "D"));
  }
}
var jA = {
  std: [
    [-96, 67],
    [-268, 67],
    [-283, 58],
    [-284, -60],
    [-262, -63],
    [-196, -18],
    [-128, 26],
    [-96, 26],
  ],
  light: [
    [-150, 67],
    [-262, 67],
    [-272, 60],
    [-272, -44],
    [-256, -46],
    [-166, 26],
    [-150, 26],
  ],
  heavy: [
    [-92, 82],
    [-266, 82],
    [-296, 64],
    [-297, -72],
    [-262, -74],
    [-150, -22],
    [-110, 24],
    [-92, 24],
  ],
};
function wA(o, t, e, s) {
  if (
    (o.hard(
      "rubber",
      Pe(t, e, {
        b: 3.2,
        bs: 1,
        soft: !0,
      }),
    ),
    sn() || !s)
  )
    return;
  let n = t.map((l) => l[1]),
    i = Math.min(...n) + 9,
    a = Math.max(...n) - 9,
    r = Math.min(...t.map((l) => l[0]));
  for (let l = 0; l < s; l++) {
    let c = i + ((a - i) * l) / (s - 1);
    o.hard(
      "rubber",
      Pe(mn(r - 0.7, c - 2.2, r + 0.8, c + 2.2), e - 9, {
        b: 0.45,
      }),
    );
  }
}
function $A(o, t) {
  let e = Ms.B;
  if (t === "light") {
    if (
      (o.metal(
        mA(e1(8, 19.2 / Math.cos(Math.PI / 8), Math.PI / 8, 0, e), -236, -150, {
          c: 0.8,
          b: 0.8,
        }),
      ),
      o.metal(
        Pe(
          [
            [-236, 66, 2],
            [-262, 66, 3],
            [-264, -44, 4],
            [-252, -46, 3],
            [-250, 30, 6],
            [-236, 30, 2],
          ],
          22,
          {
            b: 1.4,
            bs: 2,
            soft: 0.6,
          },
        ),
      ),
      o.metal(
        Pe(
          Eh(
            [
              [-166, 31],
              [-206, 0],
              [-254, -37],
            ],
            7.5,
          ),
          11,
          {
            b: 1,
            soft: 0.6,
          },
        ),
      ),
      wA(
        o,
        [
          [-263, 65, 2],
          [-271, 60, 4],
          [-272, -42, 4],
          [-264, -46, 2],
        ],
        24,
        5,
      ),
      sn())
    )
      return;
    for (let r of [-162, -224])
      o.hard(
        "oxide",
        bl(2.6, 1.2, "x+", [19.2, e - 7, r], {
          seg: 10,
          c: 0.4,
        }),
        bl(2.9, 1, "x-", [-19.2, e - 7, r], {
          seg: 6,
          c: 0.3,
        }),
      );
    for (let r = 0; r < 3; r++)
      o.hard(
        "shadow",
        cs(Th(16, 5, 0.04), [-19.22, e + 5, -176 - r * 21], "L"),
        cs(Th(16, 5, 0.04), [19.22, e + 5, -176 - r * 21], "R"),
      );
    (xT(o, [-11.05, 20, -243], "L"), xT(o, [11.05, 20, -243], "R"));
    return;
  }
  let s = t === "heavy",
    n = s ? 68.5 : 67,
    i = s ? -92 : -96,
    a = s ? -266 : -254;
  if (
    (o.poly(
      jr(
        pa(
          [
            [-17.5, 25, 3],
            [17.5, 25, 3],
            [20.8, 46, 6],
            [14.5, n, 8],
            [-14.5, n, 8],
            [-20.8, 46, 6],
          ],
          i - a + 2,
          {
            u: a - 2,
            b: 1.6,
            bs: 2,
            cs: 3,
            soft: !0,
          },
        ),
      ),
    ),
    s)
  ) {
    (o.poly(
      jr(
        Pe(
          [
            [-108, 30, 3],
            [-266, 30, 3],
            [-266, -70, 6],
            [-248, -74, 5],
            [-160, -24, 12],
          ],
          30,
          {
            b: 3.2,
            bs: 2,
            soft: !0,
            keepHoles: !0,
            holes: [
              [
                [-196, 12, 4],
                [-250, 12, 4],
                [-250, -40, 5],
                [-232, -40, 5],
              ],
            ],
          },
        ),
      ),
    ),
      o.poly(
        jr(
          Pe(
            [
              [-262, 70, 4],
              [-282, 70, 4],
              [-284, -72, 5],
              [-262, -74, 4],
            ],
            42,
            {
              b: 3,
              bs: 2,
              soft: !0,
            },
          ),
        ),
      ),
      wA(
        o,
        [
          [-282, 68, 3],
          [-295.5, 62, 6],
          [-297, -66, 7],
          [-284, -72, 3],
        ],
        39,
        6,
      ),
      o.poly(
        jr(
          pa(
            [
              [-16.5, 71, 2],
              [16.5, 71, 2],
              [17.5, 76, 4],
              [11, 81, 5],
              [-11, 81, 5],
              [-17.5, 76, 4],
            ],
            104,
            {
              u: -236,
              b: 1.6,
              bs: 1,
              cs: 3,
              soft: !0,
            },
          ),
        ),
      ),
      o.hard(
        "rubber",
        pa(
          [
            [-10.5, 80.4],
            [10.5, 80.4],
            [9.5, 82.6],
            [-9.5, 82.6],
          ],
          92,
          {
            u: -230,
            b: 0.8,
            soft: !0,
          },
        ),
      ));
    for (let r of [-214, -154])
      o.hard(
        "steel",
        Uu(
          s1(4.2, 0, 6, {
            seg: 10,
          }),
          "y+",
          [0, 66.5, r],
        ),
      );
    if (!sn()) {
      (o.hard(
        "steel",
        Uu(
          uo(
            [
              [0, 3],
              [0.6, 8.8, 1, 0.9],
              [5.2, 8.8, 0, 0.9],
              [5.8, 7.6, 1],
              [5.8, 0],
            ],
            {
              flute: {
                n: 14,
              },
            },
          ),
          "x+",
          [20.2, 52, -184],
        ),
      ),
        o.metal(
          Pe(mn(-246, -76.5, -206, -72.5, 1), 15, {
            b: 0.6,
          }),
        ));
      for (let r = 0; r < 3; r++)
        o.metal(
          Pe(mn(-243 + r * 12.6, -79.6, -237 + r * 12.6, -76.2, 0.4), 15, {
            b: 0.5,
          }),
        );
    }
  } else
    (o.poly(
      jr(
        Pe(
          [
            [-126, 30, 3],
            [-256, 30, 3],
            [-256, -58, 6],
            [-242, -61, 5],
            [-190, -17, 14],
          ],
          27,
          {
            b: 3.2,
            bs: 2,
            soft: !0,
            keepHoles: !0,
            holes: [
              [
                [-212, 15, 4],
                [-246, 15, 4],
                [-246, -30, 5],
              ],
            ],
          },
        ),
      ),
    ),
      o.poly(
        jr(
          Pe(
            [
              [-252, 68, 4],
              [-269, 68, 4],
              [-271, -61, 5],
              [-252, -63, 4],
            ],
            40,
            {
              b: 3,
              bs: 2,
              soft: !0,
            },
          ),
        ),
      ),
      wA(
        o,
        [
          [-269, 66, 3],
          [-281.5, 61, 5],
          [-283, -57, 6],
          [-271, -61, 3],
        ],
        37,
        6,
      ));
  if (!sn()) {
    (o.poly(
      jr(
        Pe(
          Eh(
            [
              [i - 14, 22.5],
              [i - 40, 15.5, 3.4],
              [i - 62, 16.5, 2.6],
            ],
            4,
          ),
          15,
          {
            b: 1.2,
            soft: !0,
          },
        ),
      ),
    ),
      o.hard(
        "oxide",
        bl(2.2, 36.4, "x+", [-18.2, 27.5, i - 14], {
          seg: 8,
          c: 0.3,
        }),
      ));
    for (let r of [-1, 1]) {
      for (let l = 0; l < 5; l++)
        o.poly(
          jr(
            Pe(mn(i - 22 - l * 9, 37, i - 18 - l * 9, 51), 1, {
              x: r * 20.2,
              b: 0.45,
              soft: !0,
            }),
          ),
        );
      xT(o, [r * 20.7, 44, a + 14], r > 0 ? "R" : "L");
    }
    o.mark(
      cs(tr("roundel", 9), [-20.82, 45, i - 92], "L"),
      cs(tr("stockn", 30), [0, n + 0.03, i - 50], "T", 90),
    );
  }
}
function SA(o, t, e, s, n, i = 12) {
  let a = (r) => (n ? C4(r, n) : r);
  (o.hard(
    "brass",
    a(
      uo(
        [
          [s, 0],
          [s, 4.2],
          [s + 0.45, 4.75, 1],
          [s + 1.2, 4.75],
          [s + 1.5, 4.1],
          [s + 2.6, 4.1],
          [s + 3.1, 4.75],
          [s + 36.5, 4.5],
          [s + 39.8, 3.22],
          [s + 44.5, 3.2],
          [s + 44.7, 3, 1],
        ],
        {
          x: t,
          y: e,
          seg: i,
          crease: 50,
        },
      ),
    ),
  ),
    o.hard(
      "copper",
      a(
        uo(
          [
            [s + 44.6, 2.84],
            [s + 46.2, 2.84],
            [s + 46.5, 2.7],
            [s + 46.9, 2.84],
            [s + 49, 2.72],
            [s + 52, 2.2],
            [s + 55, 1.35],
            [s + 56.9, 0.62],
            [s + 57.2, 0.5, 1],
            [s + 57.2, 0],
          ],
          {
            x: t,
            y: e,
            seg: i,
            crease: 60,
          },
        ),
      ),
    ),
    sn() ||
      o.hard(
        "bright",
        cs(yl(2.1, 10, 0.03), [t, e, s], "B"),
        cs(yl(0.55, 6, 0.06), [t, e, s], "B"),
      ));
}
var PJ = 5.2;
var zJ = 15;
var Ry = (o) => PJ * (o - 1) - (zJ + 46);
function iO(o) {
  let t = _h[o],
    e = 24,
    s = t.len - 20,
    n = 1,
    i = t.rounds;
  for (; Ry(n) < e + 2.6;) n++;
  for (; Ry(i) > s - 2.6;) i--;
  return {
    s0: e,
    s1: s,
    o0: 3,
    o1: 20,
    i0: n,
    i1: i,
    part: Math.round(t.rounds * 0.7),
  };
}
var bf = (o, t, e = 0, s = 0) => {
  let n = t >= 0 ? Vi(t, e) : [L4 + e, -46 - t];
  return A4(o, [s, n[1], n[0]], [t > 0 ? t / yf / Yr : 0, 0, 0]);
};
var ZF = (o, t, e, s, n = 0, i = 8) => {
  let a = [];
  for (let r = 0; r <= i; r++)
    a.push([...Vi(o + ((t - o) * r) / i, s), r === 0 || r === i ? n : 0]);
  for (let r = i; r >= 0; r--)
    a.push([...Vi(o + ((t - o) * r) / i, e), r === 0 || r === i ? n : 0]);
  return a;
};
function ZA(o, t) {
  let e = _h[t],
    s = CJ,
    n = (f) => f / yf / Yr,
    i = iO(t);
  o.poly(
    Pe(zA(t), s, {
      b: 2,
      bs: 2,
      soft: !0,
      holes: sn()
        ? null
        : [
            ZF(
              i.s0,
              i.s1,
              i.o0,
              i.o1,
              3.2,
              Math.max(6, Math.round((i.s1 - i.s0) / 9)),
            ),
          ],
    }),
  );
  let a = LA(t);
  if (t === "fast") {
    if (
      (o.hard(
        "bronze",
        Pe(
          a.map((f, u) => [f[0], f[1], [1.2, 3.5, 3.5, 1.2][u]]),
          29,
          {
            b: 1.4,
            bs: 2,
            soft: 0.6,
          },
        ),
      ),
      !sn())
    ) {
      let f = Vi(e.len + 8, 0),
        u = n(e.len + 8);
      for (let d = -1; d <= 1; d++)
        o.hard(
          "shadow",
          A4(
            cs(Th(11, 4.2, 0.05), [14.52, 0, d * 16], "R"),
            [0, f[1], f[0]],
            [u, 0, 0],
          ),
        );
      o.mark(
        A4(
          cs(tr("speed", 34), [-14.52, 0, 0], "L"),
          [0, f[1], f[0]],
          [u, 0, 0],
        ),
      );
    }
  } else
    o.poly(
      Pe(
        a.map((f, u) => [f[0], f[1], [1, 2.2, 2.2, 1][u]]),
        26.4,
        {
          b: 1.3,
          bs: 2,
          soft: !0,
        },
      ),
    );
  if (sn()) {
    o.hard("brass", Pe(mn(96, 9, 148, 15), 12));
    return;
  }
  let r = t === "fast" ? 29 : 26.4,
    l = e.len + e.pad,
    c = [
      [0, -Math.cos(l / yf), -Math.sin(l / yf)],
      [1, 0, 0],
    ];
  o.hard(
    "shadow",
    Pe(
      Eh([Vi(e.len - 1.7, -er - 1.95), Vi(e.len - 1.7, er + 2.35)], 0.55),
      r + 0.16,
      {
        b: 0,
      },
    ),
  );
  {
    let f = Vi(l, 1.5),
      u = Vi(l, 18),
      d = Vi(l, -16);
    (o.hard(
      "shadow",
      cs(
        n1(Er(12.4, 17.6, 2.4), 0.12, {
          b: 0,
        }),
        [0, f[1], f[0]],
        c,
      ),
    ),
      o.hard(
        t === "fast" ? "alu" : "poly",
        cs(
          n1(Er(10, 15.2, 1.8), 0.7, {
            b: 0.35,
          }),
          [0, f[1], f[0]],
          c,
        ),
      ));
    for (let m = -1; m <= 1; m++) {
      let p = Vi(l, 1.5 + m * 2.6);
      o.hard(
        "shadow",
        cs(
          n1(Er(0.9, 10.6, 0), 0.74, {
            b: 0,
          }),
          [0, p[1], p[0]],
          c,
        ),
      );
    }
    (o.hard("black", cs(yl(1.5, 8, 0.05), [0, u[1], u[0]], c)),
      o.hard(
        "shadow",
        cs(
          n1(Er(4, 8, 0.8), 0.1, {
            b: 0,
          }),
          [0, d[1], d[0]],
          c,
        ),
      ));
  }
  if (t !== "fast")
    for (let f of [-13, 0, 13])
      o.poly(
        bf(
          Pe(mn(-3.6, -1.9, 3.6, 1.9, 0.9), r + 1.1, {
            b: 0.5,
            cs: 1,
            soft: !0,
          }),
          e.len + e.pad * 0.5 + 0.4,
          f,
        ),
      );
  for (let f = i.s0 - 1; f <= e.len - 10.5; f += 6.4)
    (o.poly(
      bf(
        Pe(mn(-3.6, -1.55, 3.6, 1.55, 1.3), s + 1.5, {
          b: 0.62,
          cs: 1,
          soft: !0,
        }),
        f,
        25.6,
      ),
    ),
      o.poly(
        bf(
          Pe(mn(-12.6, -1.55, 12.6, 1.55, 1.3), s + 1.5, {
            b: 0.62,
            cs: 1,
            soft: !0,
          }),
          f,
          -11.6,
        ),
      ));
  let h = DA(t);
  o.poly(
    Pe(h.front, h.fw, {
      b: 0.8,
      soft: !0,
    }),
    Pe(h.rear, h.rw, {
      b: 0.7,
      soft: !0,
    }),
  );
  for (let f = 9; f <= e.len - 6; f += 4.3)
    o.poly(
      bf(
        Pe(mn(-1, -1, 1, 1, 0.4), 8.4, {
          b: 0.45,
          cs: 1,
        }),
        f,
        er + 1.5,
      ),
    );
  {
    let f = Vi(12.5, 1);
    o.mark(
      A4(
        cs(
          tr(t === "ext" ? "mag45" : "mag30", 26),
          [-(s / 2 + 0.03), 0, 0],
          "L",
        ),
        [0, f[1], f[0]],
        [n(12.5), 0, 0],
      ),
    );
  }
  for (let f of [-1, 1]) {
    let u = f > 0 ? "R" : "L";
    for (let p = 0; p < 2; p++)
      for (let x = 0; x < 10; x++)
        o.hard(
          "shadow",
          bf(
            cs(yl(0.8, 6, 0.05), [0, 0, 0], u),
            e.len - 4.2 - p * 2.9,
            -21 + x * 4.6 + p * 2.3 - 1,
            (f * s) / 2,
          ),
        );
    let d = Math.max(3, Math.round((i.s1 - i.s0) / 24)),
      m = (i.s1 - i.s0) / d;
    for (let p = 0; p < d; p++) {
      let x = i.s0 + m * (p + 0.5);
      o.mark(
        bf(
          cs(tr("pane", i.o1 - i.o0 + 6, m + 1.2), [0, 0, 0], u),
          x,
          (i.o0 + i.o1) / 2,
          f * (s / 2 - 1.55),
        ),
      );
    }
    o.hard(
      "shadow",
      cs(
        n1(f < 0 ? Er(10.5, 5.4, 0.6) : Er(6, 3.2, 0.6), 0.12, {
          b: 0,
        }),
        [(f * s) / 2, 6, f < 0 ? 97.2 : 99],
        u,
      ),
    );
  }
  (o.hard(
    "black",
    Pe(ZF(i.s0 - 4, i.s1 + 4, i.o0 - 4, i.o1 + 4, 0, 6), 5.6, {
      b: 0,
    }),
  ),
    o.hard(
      "black",
      Pe(mn(92.5, 11.6, 150.5, 12.1), 18, {
        b: 0,
      }),
    ));
  for (let f of [-1, 1])
    o.poly(
      pa(
        [
          [f * 11.2, 10.5],
          [f * 11.2, 16.2, 1.5],
          [f * 7.2, 18, 0.6],
          [f * 6.6, 16.8],
          [f * 9.6, 15.2, 1],
          [f * 9.6, 10.5],
        ],
        47,
        {
          u: 91.5,
          b: 0.4,
        },
      ),
    );
  (o.poly(
    Pe(mn(90, 10.5, 93.5, 17.2, 0.8), 20, {
      b: 0.6,
    }),
  ),
    o.hard(
      "orange",
      Pe(
        [
          [94.5, 9.5],
          [150, 9.5],
          [150, 12.2, 1],
          [118, 13.6, 2],
          [94.5, 12.8, 1],
        ],
        13,
        {
          b: 0.8,
        },
      ),
    ),
    o.hard(
      "orange",
      uo(
        [
          [96, 3.6],
          [130, 3.4],
          [139, 2.4, 1],
          [146, 0.8],
        ],
        {
          x: -2.6,
          y: 10.2,
          seg: 10,
          arc: [20, 160],
          crease: 40,
        },
      ),
    ));
}
function aO(o) {
  if (sn()) return;
  let t = (e, s) => (s < 11.5 ? 0.35 : 1);
  (SA(o, 3, 15, 94.5, t), SA(o, -3, 9.8, 94.5, t));
}
function rO(o, t, e) {
  if (sn()) return;
  let s = _h[t],
    n = iO(t),
    i = e === "full" ? n.i1 : e === "part" ? Math.min(n.i1, n.part) : 0,
    a = (l) => {
      let c = Math.min(1, Math.max(0, (Math.abs(l) - 1.5) / 7.6));
      return 0.26 + 0.62 * c * c;
    };
  for (let l = n.i0; l <= i; l++) {
    let c = l & 1 ? 1 : -1;
    (o.hard(
      "brass",
      bf(
        C4(
          uo(
            [
              [-1.5, 4.71],
              [9.75, 4.5],
              [13.05, 3.22, 1],
              [17.75, 3.2],
              [17.95, 3.02, 1],
            ],
            {
              seg: 10,
              crease: 40,
            },
          ),
          a,
        ),
        Ry(l),
        0,
        c * 4.4,
      ),
    ),
      o.hard(
        "copper",
        bf(
          C4(
            uo(
              [
                [17.85, 2.84],
                [19.5, 2.84],
                [19.8, 2.7],
                [20.2, 2.84],
                [22.6, 2.66],
              ],
              {
                seg: 10,
                crease: 60,
              },
            ),
            a,
          ),
          Ry(l),
          0,
          c * 4.4,
        ),
      ));
  }
  if (e === "full") return;
  let r = e === "part" ? Ry(i + 1) + 1.6 : n.s0 - 7;
  if (e === "part") {
    o.hard(
      "orange",
      bf(
        Pe(
          [
            [-14, -3.4, 0.8],
            [11, -3.4, 0.8],
            [11, 3, 1.2],
            [-14, 3, 1.2],
          ],
          18.6,
          {
            b: 0.7,
          },
        ),
        r + 0.4,
        0,
      ),
    );
    for (let l of [-1, 1])
      for (let c of [-9.5, 5.5])
        o.hard(
          "orange",
          bf(
            Pe(mn(-2.2, -9, 2.2, -3, 0.8), 1.6, {
              x: l * 8.5,
              b: 0.4,
            }),
            r + 0.4,
            c,
          ),
        );
  }
  for (let l of [-1, 1]) {
    let c = [],
      h = 0;
    for (let f = r + 6; f <= s.len - 5; f += 5.6, h++)
      c.push(Vi(f, (h & 1) === (l > 0 ? 0 : 1) ? -13.5 : 9.5));
    c.length > 1 &&
      o.hard(
        "bright",
        Pe(Eh(c, 4.6), 1.15, {
          x: l * 7.9,
          b: 0.3,
          cs: 1,
        }),
      );
  }
}
var vl = {
  rearU: P5(15),
  frontU: P5(-25),
  hingeY: 6.2,
  apR: 3,
  arm: Ms.SIGHT - 6.2,
};
function lO(o, t, e) {
  let s = Ms.RT,
    n = t - 17,
    i = t + 13 * e;
  if (
    (o.hard(
      "alu",
      pa(
        [
          [-10.5, s],
          [-10.5, s - 5.2],
          [-12.4, s - 5.2],
          [-14.2, s - 2.8],
          [-14.2, s + 3.2],
          [-11.8, s + 4.6],
          [11.8, s + 4.6],
          [14.2, s + 3.2],
          [14.2, s - 2.8],
          [12.4, s - 5.2],
          [10.5, s - 5.2],
          [10.5, s],
        ],
        34,
        {
          u: n,
          b: 0.5,
        },
      ),
    ),
    !sn())
  ) {
    (o.hard(
      "oxide",
      bl(2.7, 1.6, "x+", [14.2, s - 0.6, t - 9 * e], {
        seg: 12,
        c: 0.4,
      }),
      bl(3, 1.2, "x-", [-14.2, s - 0.6, t - 9 * e], {
        seg: 6,
        c: 0.3,
      }),
    ),
      o.hard("black", cs(yl(1.4, 6, 0.03), [15.82, s - 0.6, t - 9 * e], "R")));
    for (let a of [-1, 1])
      o.hard(
        "alu",
        Pe(
          [
            [i - 3.2, s + 4.4],
            [i + 3.2, s + 4.4],
            [i + 3.2, s + 7.6],
            [i + 1.6, s + 9.2],
            [i - 1.6, s + 9.2],
            [i - 3.2, s + 7.6],
          ],
          3,
          {
            x: a * 9.7,
            b: 0.5,
          },
        ),
      );
    o.hard(
      "oxide",
      bl(1.5, 23, "x+", [-11.5, s + vl.hingeY, i], {
        seg: 8,
        c: 0.3,
      }),
    );
  }
}
function cO(o, t, e, s, n) {
  let i = e + 13 * s,
    a = (s > 0 ? 1 : -1) * 88 * Yr;
  for (let [r, l] of t)
    (n || l.rotateX(a), l.translate(0, Ms.RT + vl.hingeY, -i), o.hard(r, l));
}
function MT(o, t, e = "all") {
  let s = vl.rearU,
    n = vl.arm,
    i = [];
  (e !== "arm" && lO(o, s, -1),
    e !== "base" &&
      (i.push([
        "alu",
        pa(
          [
            [-8.6, -1.4],
            [-7.4, -2.6],
            [7.4, -2.6],
            [8.6, -1.4],
            [8.6, n - 9],
            [6.6, n + 3.6],
            [4.2, n + 6.4],
            [-4.2, n + 6.4],
            [-6.6, n + 3.6],
            [-8.6, n - 9],
          ],
          4.4,
          {
            u: -2.2,
            b: 0.6,
            keepHoles: !0,
            holes: sn()
              ? [e1(8, 3.6, 0, 0, n)]
              : [
                  e1(20, 5, 0, 0, n),
                  [
                    [-4.2, 3.6, 1.2],
                    [4.2, 3.6, 1.2],
                    [4.2, n - 13, 1.2],
                    [-4.2, n - 13, 1.2],
                  ],
                ],
          },
        ),
      ]),
      sn() ||
        (i.push([
          "oxide",
          uo(
            [
              [-2.6, vl.apR + 0.25],
              [-2.6, 4.8],
              [-2.2, 5.2, 1],
              [2.2, 5.2],
              [2.6, 4.8, 1],
              [2.6, 3.9],
              [-1.9, vl.apR, 1],
              [-2.6, vl.apR + 0.25],
            ],
            {
              y: n,
              seg: 24,
            },
          ),
        ]),
        i.push([
          "steel",
          Uu(
            uo(
              [
                [0, 2.2],
                [0.5, 4.4, 1, 0.5],
                [3.6, 4.4, 0, 0.5],
                [4.2, 3.6, 1],
                [4.2, 0],
              ],
              {
                flute: {
                  n: 9,
                },
              },
            ),
            "x+",
            [8.6, n - 2.5, 0],
          ),
        ]),
        i.push(["white", cs(Th(0.5, 2.2, 0.03), [0, n + 5.2, 2.2], "B")])),
      cO(o, i, s, -1, t)));
}
function wT(o, t, e = "all") {
  let s = vl.frontU,
    n = vl.arm,
    i = [];
  if ((e !== "arm" && lO(o, s, 1), e !== "base")) {
    i.push([
      "alu",
      pa(
        [
          [-8.2, -1.4],
          [-7, -2.6],
          [7, -2.6],
          [8.2, -1.4],
          [8.2, n - 12],
          [6.4, n - 8.4],
          [-6.4, n - 8.4],
          [-8.2, n - 12],
        ],
        5,
        {
          u: -2.5,
          b: 0.6,
          keepHoles: !0,
          holes: sn()
            ? null
            : [
                [
                  [-4, 3.4, 1.2],
                  [4, 3.4, 1.2],
                  [4, n - 15, 1.2],
                  [-4, n - 15, 1.2],
                ],
              ],
        },
      ),
    ]);
    for (let a of [-1, 1])
      i.push([
        "alu",
        Pe(
          [
            [-2.3, n - 9],
            [2.3, n - 9],
            [1.3, n + 4.6],
            [-1.3, n + 4.6],
          ],
          2.2,
          {
            x: a * 5.6,
            b: 0.5,
          },
        ),
      ]);
    (i.push([
      "oxide",
      Uu(
        s1(1.15, 0, 8.6, {
          seg: 8,
          c: 0.2,
        }),
        "y+",
        [0, n - 8.6, 0],
      ),
    ]),
      sn() ||
        i.push([
          "oxide",
          Uu(
            uo(
              [
                [0, 3.3, 0, 0.4],
                [1.1, 3.3, 0, 0.4],
                [1.1, 1.2],
              ],
              {
                flute: {
                  n: 8,
                },
              },
            ),
            "y+",
            [0, n - 8.5, 0],
          ),
        ]),
      cO(o, i, s, 1, t));
  }
}
var vf = Vector3;
var z5 = Quaternion;
var DJ = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var L5 = {
  lin: (o) => o,
  io: (o) => o * o * (3 - 2 * o),
  io2: (o) => o * o * o * (o * (o * 6 - 15) + 10),
  in: (o) => o * o,
  in3: (o) => o * o * o,
  out: (o) => 1 - (1 - o) * (1 - o),
  out3: (o) => 1 - Math.pow(1 - o, 3),
  snap: (o) => 1 - Math.pow(1 - o, 4),
  back: (o) => {
    let e = Math.pow(o, 1.5) - 1;
    return 1 + (1.6 + 1) * e * e * e + 1.6 * e * e;
  },
  back2: (o) => {
    let e = Math.pow(o, 1.5) - 1;
    return 1 + (2.6 + 1) * e * e * e + 2.6 * e * e;
  },
  ant: (o) => (1.4 + 1) * o * o * o - 1.4 * o * o,
  step: (o) => (o < 1 ? 0 : 1),
};
function jt(o) {
  let t = o.length;
  return (e) => {
    if (e <= o[0][0]) return o[0][1];
    if (e >= o[t - 1][0]) return o[t - 1][1];
    let s = 1;
    for (; e > o[s][0];) s++;
    let n = o[s - 1],
      i = o[s];
    return n[1] + (i[1] - n[1]) * L5[i[2] || "io"]((e - n[0]) / (i[0] - n[0]));
  };
}
var vi = (o, t, e, s = 38, n = 16) =>
  o < t ? 0 : e * Math.sin((o - t) * s) * Math.exp(-(o - t) * n);
var be = (o, t, e, s, n) =>
  o <= t || o >= n
    ? 0
    : o < e
      ? L5.io((o - t) / (e - t))
      : o <= s
        ? 1
        : 1 - L5.io((o - s) / (n - s));
var hO = new vf();
var Ay = new vf();
var ET = new vf();
var fO = new vf();
var QA = new vf();
var JA = new vf();
var uO = new z5();
var dO = new z5();
var Xs = class {
  constructor(t) {
    this.keys = t.slice().sort((e, s) => e.t - s.t);
  }
  eval(t, e, s, n) {
    let i = this.keys,
      a = i.length;
    if (t <= i[0].t) return e.resolve(i[0], s, n);
    if (t >= i[a - 1].t) return e.resolve(i[a - 1], s, n);
    let r = 0;
    for (; t > i[r + 1].t;) r++;
    let l = i[r],
      c = i[r + 1],
      h = c.t - l.t,
      f = (t - l.t) / h,
      u;
    if (c.ease) u = L5[c.ease](f);
    else {
      let d = l.pass ? 1 : 0,
        m = c.pass ? 1 : 0,
        p = f * f,
        x = p * f;
      u = (x - 2 * p + f) * d + (-2 * x + 3 * p) + (x - p) * m;
    }
    if (
      (e.resolve(l, Ay, uO),
      e.resolve(c, ET, dO),
      Ay.distanceToSquared(ET) < 1e-12)
    )
      s.copy(Ay);
    else {
      if (l.vel) e.dir(l, l.vel, QA).multiplyScalar(h);
      else {
        let p = i[r > 0 ? r - 1 : 0];
        (e.resolve(p, hO, null),
          QA.subVectors(ET, hO).multiplyScalar(
            (h / Math.max(c.t - p.t, 1e-4)) * (l.tens ?? (l.pass ? 1 : 0.3)),
          ));
      }
      if (c.vel) e.dir(c, c.vel, JA).multiplyScalar(h);
      else {
        let p = i[r + 2 < a ? r + 2 : a - 1];
        (e.resolve(p, fO, null),
          JA.subVectors(fO, Ay).multiplyScalar(
            (h / Math.max(p.t - l.t, 1e-4)) * (c.tens ?? (c.pass ? 1 : 0.3)),
          ));
      }
      let d = u * u,
        m = d * u;
      s.copy(Ay)
        .multiplyScalar(2 * m - 3 * d + 1)
        .addScaledVector(QA, m - 2 * d + u)
        .addScaledVector(ET, -2 * m + 3 * d)
        .addScaledVector(JA, m - d);
    }
    (c.arc && s.addScaledVector(c.arc, 4 * u * (1 - u)),
      n && n.copy(uO).slerp(dO, u < 0 ? 0 : u > 1 ? 1 : u));
  }
};
var IJ = {
  index: [0, 1, 2, 3, 0.5],
  little: [3, 2, 1, 0, 2.5],
  thumb: [1, 2, 3, 4, 0],
  none: [0, 0, 0, 0, 0],
};
var Gs = class {
  constructor(t, e) {
    ((this.first = t), (this.keys = e.slice().sort((s, n) => s.t - n.t)));
  }
  eval(t, e) {
    e.set(this.first);
    for (let s of this.keys) {
      if (t <= s.t) break;
      let n = s.dur ?? 0.12,
        i = s.stagger ?? 0.028,
        a = IJ[s.from || "index"],
        r = L5[s.ease || "io"],
        l = s.pose,
        c = s.digits,
        h = 0,
        f = 0;
      for (let u = 0; u < 5; u++) {
        if (c && c.indexOf(u) < 0) continue;
        let d = (t - s.t - a[u] * i) / n;
        if (d <= 0) continue;
        let m = d >= 1 ? 1 : r(d),
          p = u4[u];
        for (let x = p[0]; x < p[1]; x++) e[x] += (l[x] - e[x]) * m;
        (u === 2 || u === 3) && ((h += m), f++);
      }
      f && (e[21] += (l[21] - e[21]) * (h / f));
    }
    return e;
  }
};
function Do(o, t) {
  let e = t.n,
    s = 240,
    n = Math.ceil(o * s) + 1,
    i = new Float32Array(n * e),
    a = new Float64Array(e),
    r = new Float64Array(e),
    l = new Float64Array(e),
    c = 4,
    h = 1 / (s * c),
    f = (t.impulses || []).slice().sort((x, g) => x.t - g.t),
    u = t.fade ?? 0.12,
    d = Array.isArray(t.k) ? t.k : new Array(e).fill(t.k),
    m = Array.isArray(t.c) ? t.c : new Array(e).fill(t.c),
    p = 0;
  for (let x = 0; x < n; x++) {
    let g = x / s,
      b = Math.min(1, g / 0.02) * DJ((o - g) / u),
      v = b * b * (3 - 2 * b);
    for (let y = 0; y < e; y++) i[x * e + y] = a[y] * v;
    for (let y = 0; y < c; y++) {
      let M = g + y * h;
      for (; p < f.length && f[p].t <= M;) {
        for (let w = 0; w < e; w++) r[w] += f[p].v[w] || 0;
        p++;
      }
      t.target && t.target(M, l);
      for (let w = 0; w < e; w++)
        ((r[w] += ((l[w] - a[w]) * d[w] - r[w] * m[w]) * h),
          (a[w] += r[w] * h));
    }
  }
  return (x, g) => {
    let b = Math.min(Math.max(x, 0), o) * s,
      v = Math.min(n - 2, Math.floor(b)),
      y = b - v;
    for (let M = 0; M < e; M++)
      g[M] = i[v * e + M] + (i[(v + 1) * e + M] - i[v * e + M]) * y;
    return g;
  };
}
var HJ = new Euler();
var FJ = {
  pos: new vf(),
  rot: new Euler(),
};
var Mf = class {
  constructor(t) {
    ((this.gun = t),
      (this.parts = t.parts),
      (this.arms = t.arms),
      (this.cp = new vf()),
      (this.cq = new z5()),
      (this.cqi = new z5()),
      (this._q = new z5()));
  }
  grip(t, e = {}) {
    let s = this.gun.grips[t],
      n = s.pos.clone(),
      i = s.quat.clone();
    if ((e.d && n.add(new vf(e.d[0], e.d[1], e.d[2])), e.r)) {
      let a = new z5().setFromEuler(new Euler(e.r[0], e.r[1], e.r[2])),
        r = (e.about || n).clone();
      (n.sub(r).applyQuaternion(a).add(r), i.premultiply(a));
    }
    return {
      p: n,
      q: i,
      f: e.f || s.part || "root",
    };
  }
  partKey(t, e = [0, 0, 0], s = [0, 0, 0], n = "root") {
    return {
      p: this.parts[t].userData.rest.clone().add(new vf(e[0], e[1], e[2])),
      q: new z5().setFromEuler(new Euler(s[0], s[1], s[2])),
      f: n,
    };
  }
  begin(t) {
    let e = this.parts;
    for (let s in e) {
      let n = e[s];
      (n.position.copy(n.userData.rest),
        n.quaternion.identity(),
        (n.visible = !n.userData.hidden));
    }
    (this.arms.reset(),
      t.pos.set(0, 0, 0),
      t.rot.set(0, 0, 0),
      this.cp.set(0, 0, 0),
      this.cq.identity(),
      this.cqi.identity());
  }
  gunAt(t, e, s, n, i, a, r) {
    (t.pos.set(e, s, n),
      t.rot.set(i, a, r, "XYZ"),
      this.cp.copy(t.pos),
      this.cq.setFromEuler(t.rot),
      this.cqi.copy(this.cq).invert());
  }
  resolve(t, e, s) {
    let n = t.f;
    if (!n || n === "root") (e.copy(t.p), s && s.copy(t.q));
    else if (n === "view")
      (e.copy(t.p).sub(this.cp).applyQuaternion(this.cqi),
        s && s.copy(this.cqi).multiply(t.q));
    else {
      let i = this.parts[n];
      (e
        .copy(t.p)
        .sub(i.userData.rest)
        .applyQuaternion(i.quaternion)
        .add(i.position),
        s && s.copy(i.quaternion).multiply(t.q));
    }
  }
  dir(t, e, s) {
    let n = t.f;
    return (
      s.copy(e),
      n === "view"
        ? s.applyQuaternion(this.cqi)
        : n && n !== "root" && s.applyQuaternion(this.parts[n].quaternion),
      s
    );
  }
  part(t, e, s, n, i = 0, a = 0, r = 0) {
    let l = this.parts[t],
      c = l.userData.rest;
    (l.position.set(c.x + e, c.y + s, c.z + n),
      i || a || r
        ? l.quaternion.setFromEuler(HJ.set(i, a, r))
        : l.quaternion.identity());
  }
  partXf(t, e, s) {
    let n = this.parts[t];
    e.eval(s, this, n.position, n.quaternion);
  }
  hand(t, e, s) {
    let n = this.arms.clip[t];
    e.eval(s, this, n.pos, n.quat);
  }
  pose(t, e, s) {
    e.eval(s, this.arms.clip[t].pose);
  }
  end(t) {
    this.arms.flush(t);
  }
  clip(t, e, s) {
    let n = this;
    return {
      duration: t,
      events: e.slice().sort((i, a) => i.t - a.t),
      apply(i, a) {
        ((a = a || FJ),
          n.begin(a),
          s(Math.min(Math.max(i, 0), t), a),
          n.end(a));
      },
    };
  }
};
var ye = (o, t) => ({
  t: o,
  type: "sfx",
  id: t,
});
var Kl = Vector3;
var mO = Quaternion;
var gO = (o, t, e) => (o < t ? t : o > e ? e : o);
var pO = (o, t, e) => {
  let s = gO((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
var tk = new Matrix4();
var TT = new mO();
var ek = new mO();
var OJ = new Euler();
var Sp = new Kl();
var _p = new Kl();
var NJ = new Kl(0, -1, 0);
var L1 = class {
  constructor(t, e, s = -1 / 0, n = 1 / 0) {
    let i = 2 * Math.PI * t;
    ((this.k = i * i),
      (this.c = 2 * e * i),
      (this.lo = s),
      (this.hi = n),
      (this.x = 0),
      (this.v = 0));
  }
  step(t, e) {
    let s = Math.max(1, Math.ceil(t / 0.003)),
      n = t / s;
    for (let i = 0; i < s; i++)
      ((this.v += (e - this.k * this.x - this.c * this.v) * n),
        (this.x += this.v * n),
        this.x < this.lo
          ? ((this.x = this.lo), this.v < 0 && (this.v *= -0.25))
          : this.x > this.hi &&
            ((this.x = this.hi), this.v > 0 && (this.v *= -0.25)));
    return this.x;
  }
  reset() {
    ((this.x = 0), (this.v = 0));
  }
};
var D4 = class {
  constructor(t) {
    ((this.l = t),
      (this.p = new Kl()),
      (this.v = new Kl()),
      (this.a = new Kl()),
      (this.ok = 0));
  }
  step(t, e, s) {
    if ((Sp.copy(this.l).applyMatrix4(e), this.ok > 0)) {
      if ((_p.subVectors(Sp, this.p).multiplyScalar(1 / t), this.ok > 1)) {
        this.a.subVectors(_p, this.v).multiplyScalar(1 / t);
        let n = this.a.length();
        n > 90 && this.a.multiplyScalar(90 / n);
      }
      this.v.copy(_p);
    }
    return (
      this.p.copy(Sp),
      this.ok < 2 && this.ok++,
      _p.copy(this.a).applyQuaternion(s)
    );
  }
};
function xO(o, t, e, s) {
  let n = o.arms,
    i = o.parts,
    a = o.root,
    r = (b) => i[b].userData.rest,
    l = {
      posed: "clip",
      fireT: 9,
      sinceFire: 9,
      shots: 0,
      seen: 0,
      heat: 0,
      t: 0,
      idleT: 0,
      ads: 0,
      adsSq: 0,
      adsPulse: 0,
      sprint: 0,
      wasSprint: !1,
      reseat: -1,
      thumb: 0,
      fired: 0,
      magOwned: !1,
      magShow: null,
      partAt: Math.round(
        (_h[o.build && o.build.magazine] || _h.std).rounds * 0.3,
      ),
    },
    c = {
      mag: new D4(
        r("mag")
          .clone()
          .add(new Kl(0, -0.11, -0.012)),
      ),
      ch: new D4(r("chargingHandle")),
      sling: new D4(r("slingLoop")),
      front: new D4(r("buisFrontArm")),
    },
    h = {
      magRz: new L1(13, 0.12, -0.011, 0.011),
      magRx: new L1(15, 0.14, -0.008, 0.008),
      magY: new L1(17, 0.2, -5e-4, 2e-4),
      latch: new L1(19, 0.14, -0.06, 0.02),
      handle: new L1(24, 0.25, 0, 0.0016),
      cover: new L1(6.5, 0.09, -0.16, 0.16),
      buisR: new L1(31, 0.18, -0.008, 0.008),
      buisF: new L1(27, 0.16, -0.009, 0.009),
      catchP: new L1(25, 0.2, -0.012, 0.012),
      rootY: new L1(3.4, 0.45),
      rootZ: new L1(3, 0.5),
    },
    f = {
      d: new Kl(0, -1, 0),
      v: new Kl(),
      n: new Kl(-0.7071, 0.7071, 0),
      len: 0.019,
    },
    u = (b, v, y, M) => {
      i[b].quaternion.multiply(TT.setFromEuler(OJ.set(v, y, M)));
    },
    d = !1,
    m = {
      mag: new Kl(),
      ch: new Kl(),
      sling: new Kl(),
      front: new Kl(),
    },
    p = new Kl(),
    x = new Kl(),
    g = () => {
      for (let b in c) c[b].ok = 0;
      d = !1;
    };
  return (
    (l.shot = () => {
      (l.shots++, l.fired++);
    }),
    (l.snap = g),
    (l.step = (b, v) => {
      ((l.t += b), (l.sinceFire += b));
      let y = l.posed === "clip";
      (l.posed || t.begin(s),
        (l.idleT = l.posed ? 0 : l.idleT + b),
        !l.magOwned &&
          l.magShow &&
          l.fired >= l.partAt &&
          l.magShow("part", !1),
        (l.magOwned = !1));
      let M = !1;
      if ((p.set(0, -1, 0), v.rig)) {
        (a.updateWorldMatrix(!0, !1),
          v.rig.updateWorldMatrix(!0, !1),
          tk.copy(v.rig.matrixWorld).invert().multiply(a.matrixWorld),
          tk.decompose(Sp, TT, _p),
          ek.copy(TT).invert(),
          d && Sp.distanceToSquared(x) > 0.04 && g(),
          x.copy(Sp),
          (d = !0));
        for (let k in c) m[k].copy(c[k].step(b, tk, ek));
        (p.applyQuaternion(ek), (M = c.mag.ok > 1));
      }
      if (!M) for (let k in m) m[k].set(0, 0, 0);
      let w = l.shots - l.seen;
      if (
        ((l.seen = l.shots),
        w > 0 &&
          ((l.heat = Math.min(1.25, l.heat + 0.042 * w)),
          (h.cover.v += 2.2 * w),
          (h.magRz.v += l.shots & 1 ? 0.5 : -0.5),
          (f.v.z += 0.22),
          (f.v.x -= 0.1)),
        (l.heat = Math.max(0, l.heat - b * 0.085 * (0.25 + l.heat))),
        o.heat)
      ) {
        let k = pO(0.28, 1.1, l.heat);
        ((o.heat.visible = k > 0.004),
          (o.heat.material.uniforms.uHeat.value = k));
      }
      let T =
          i.mag.visible && i.mag.position.distanceToSquared(r("mag")) < 1e-8
            ? 1
            : 0,
        S = h.magRz.step(b, -m.mag.x * 7.5 * T),
        E = h.magRx.step(b, m.mag.z * 5.5 * T),
        _ = h.magY.step(b, -Math.max(0, m.mag.y) * 0.9 * T);
      T
        ? ((i.mag.position.y += _), u("mag", E, 0, S))
        : (h.magRz.reset(), h.magRx.reset());
      let R = h.handle.step(b, -m.ch.z * 1.5);
      ((i.chargingHandle.position.z += R),
        u("chLatch", 0, h.latch.step(b, m.ch.z * 55 - m.ch.x * 20), 0),
        u("dustCover", 0, 0, h.cover.step(b, m.mag.x * 17 - p.x * 60)),
        u("buisRearArm", h.buisR.step(b, m.ch.z * 16), 0, 0),
        u(
          "buisFrontArm",
          h.buisF.step(b, m.front.z * 16 + m.front.y * 6),
          0,
          0,
        ),
        u("boltCatch", 0, 0, h.catchP.step(b, m.mag.x * 22)));
      {
        let k = f.d,
          I = f.v,
          G = Math.min(b, 0.033),
          K = Math.max(1, Math.ceil(G / 0.004)),
          $ = G / K;
        _p.copy(p).multiplyScalar(9.81).addScaledVector(m.sling, -0.5);
        for (let n0 = 0; n0 < K; n0++) {
          (Sp.copy(_p)
            .addScaledVector(k, -_p.dot(k))
            .multiplyScalar(1 / f.len),
            I.addScaledVector(Sp, $).multiplyScalar(Math.max(0, 1 - 6.5 * $)),
            k.addScaledVector(I, $).normalize(),
            I.addScaledVector(k, -I.dot(k)));
          let e0 = -0.715 - k.dot(f.n);
          if (e0 > 0) {
            k.addScaledVector(f.n, e0).normalize();
            let p0 = I.dot(f.n);
            p0 < 0 && I.addScaledVector(f.n, -1.3 * p0);
          }
        }
        (I.lengthSq() > 400 && I.setLength(20),
          i.slingLoop.quaternion.multiply(TT.setFromUnitVectors(NJ, k)));
      }
      let C = v.ads || 0,
        L = (C - l.ads) / b;
      (C >= 0.9 && l.ads < 0.9 && ((h.rootY.v -= 0.02), (h.rootZ.v += 0.026)),
        C <= 0.12 && l.ads > 0.12 && (h.rootY.v += 0.012),
        (l.adsPulse = Math.max(
          0,
          l.adsPulse + Math.max(0, L) * b * 1.6 - l.adsPulse * 6.5 * b,
        )),
        (l.adsSq += (C - l.adsSq) * (1 - Math.exp(-9 * b))),
        (l.ads = C),
        a.position.set(0, h.rootY.step(b, 0), h.rootZ.step(b, 0)));
      let A = n.clip.R.pose,
        O = n.clip.L.pose,
        H = y ? 0.3 : 1,
        F = (1 * l.adsSq + 2.6 * l.adsPulse) * H;
      for (let k of [6, 10, 14]) ((A[k] += 2 * F), (A[k - 2] += 1 * F));
      for (let k of [2, 6, 10, 14]) O[k] += 1.7 * F;
      O[19] += 2 * F;
      let P = v.sprint || 0;
      if (
        (P > 0.75
          ? (l.wasSprint = !0)
          : P < 0.35 &&
            l.wasSprint &&
            ((l.wasSprint = !1),
            (l.reseat = 0),
            !l.posed && n.regripT < 0 && ((n.regripT = 0), (n.idleT = 0))),
        l.reseat >= 0)
      )
        if (((l.reseat += b), l.reseat > 0.5)) l.reseat = -1;
        else
          for (let k = 1; k < 4; k++) {
            let I = gO((l.reseat - (3 - k) * 0.05) / 0.36, 0, 1),
              G = Math.sin(Math.PI * I) * (1 - 0.4 * I) * H;
            ((A[k * 4] -= 7 * G),
              (A[k * 4 + 2] -= 9 * G),
              (A[k * 4 + 3] -= 5 * G));
          }
      let z = e.thumbSel;
      if (z && z.miss < 0.004) {
        let k = l.idleT > 2.5 && (l.t * 0.085) % 1 < 0.34,
          I = !y && P < 0.5 && (C > 0.5 || k) ? 1 : 0;
        if (
          ((l.thumb += (I - l.thumb) * (1 - Math.exp(-(I ? 7 : 4.5) * b))),
          l.thumb > 0.002)
        ) {
          let G = l.thumb * l.thumb * (3 - 2 * l.thumb);
          for (let K = 16; K < 21; K++) A[K] += (z.pose[K] - A[K]) * G;
        }
      }
      if (!y) {
        let k = pO(1.5, 4, l.idleT + (l.posed === "fire" ? 0 : 1.5)),
          I = l.t;
        ((A[0] +=
          (1.4 * Math.sin(I * 0.43) + 0.7 * Math.sin(I * 1.07 + 2)) * k),
          (A[1] += 1.1 * Math.sin(I * 0.29 + 1) * k),
          (A[14] -=
            2.2 * Math.pow(Math.max(0, Math.sin(I * 0.21 + 2.4)), 6) * k),
          (A[12] -=
            1.6 * Math.pow(Math.max(0, Math.sin(I * 0.21 + 2.4)), 6) * k),
          (O[18] += 1.5 * Math.sin(I * 0.37 + 0.7) * k));
      }
      l.posed = null;
    }),
    l
  );
}
var D1 = (o, t, e) => new Vector3(o, t, e);
var gn = new Float64Array(6);
var sk = new Vector3();
var nk = new Quaternion();
var BJ = new Euler();
var ok = null;
function UJ() {
  if (ok) return ok;
  let o = D1(-0.005, 0.071, 0.0405),
    t = 0.0335,
    e = (i, a, r) => Math.hypot(i - o.x, a - o.y, r - o.z) - t,
    s = gs(
      {
        t: [-14, 50, -70, 0, 0],
        cup: 10,
      },
      pn.pre,
    ),
    n = yo(-1, D1(0, 0, 0), new Quaternion(), s, e, {
      fingers: [0, 1, 2, 3],
      thumb: [
        [16, 44],
        [19, 55],
        [20, 70],
      ],
    });
  return (ok = {
    proto: buildGrenade(),
    pose: n,
    off: o,
    quat: new Quaternion().setFromEuler(new Euler(0.25, 0.4, 1.25)),
  });
}
function bO(o) {
  let t = o.arms,
    e = o.grips,
    s = o.parts,
    n = new Mf(o);
  (t.setRest("R", e.fire.pos, e.fire.quat, e.fire.pose),
    t.setRest("L", e.support.pos, e.support.quat, e.support.pose),
    (t.trigPose = e.trigger.pose),
    (t.pressPose = e.press.pose),
    o.anchors.gripR.position.copy(e.fire.pos),
    o.anchors.gripR.quaternion.copy(e.fire.quat),
    o.anchors.gripL.position.copy(e.support.pos),
    o.anchors.gripL.quaternion.copy(e.support.quat));
  let i = !1,
    a = {
      pos: D1(0, 0, 0),
      rot: new Euler(),
    },
    r = (o.life = xO(o, n, e, a)),
    l = (q0, v0) => {
      let x0 = v0.apply;
      return (
        (v0.apply = (C0, k0) => {
          ((r.posed = q0), x0(C0, k0));
        }),
        v0
      );
    },
    c = (q0, v0, x0, C0 = null) =>
      n.clip(q0, v0, (k0, O0) => {
        x0(k0, O0);
        let B0 = globalThis.GH_TUNE;
        B0 && B0.nolife
          ? ((t.clip.L.life = 0), (t.clip.R.life = 0))
          : C0 && (t.clip.L.life = C0(k0));
      }),
    h = 0.054,
    f = 0.0437,
    u = 0.09,
    d = (r.magShow = (q0, v0 = !0) => {
      ((s.magFillFull.visible = q0 === "full"),
        (s.magFillPart.visible = q0 === "part"),
        (s.magFillEmpty.visible = q0 === "empty"),
        (s.magRounds.visible = q0 !== "empty"),
        v0 && (r.magOwned = !0));
    }),
    m = (q0, v0, x0) => xp(new Float32Array(Ui), q0, v0, x0),
    p = (q0, v0) => (globalThis.GH_TUNE || {})[q0] ?? v0,
    x = o.build ? o.build.underbarrel : "none",
    g = (q0, v0) => {
      if (x === "vgrip" || x === "angled") {
        for (let x0 = 16; x0 < 21; x0++) q0[x0] = v0[x0];
        ((q0[17] = Math.min(58, v0[17] + 30)),
          (q0[16] = v0[16] - 14),
          (q0[19] = Math.max(0, v0[19] - 10)));
      }
      return q0;
    },
    b = pn.loose,
    v = pn.carry,
    y = pn.loose,
    M = (q0, v0 = 1, x0 = 1) => {
      let C0 = new Float32Array(q0);
      for (let k0 = 0; k0 < 4; k0++) {
        let O0 = k0 * 4;
        ((C0[O0] = Math.max(-4, C0[O0] - (24 + 3 * k0) * v0)),
          (C0[O0 + 2] = Math.max(8 + 4 * k0, C0[O0 + 2] * (1 - 0.5 * v0))),
          (C0[O0 + 3] = Math.max(5 + 2 * k0, C0[O0 + 3] * (1 - 0.45 * v0))));
      }
      return (
        (C0[16] -= 12 * x0),
        (C0[17] = Math.min(58, C0[17] + 20 * x0)),
        (C0[19] *= 1 - 0.5 * x0),
        (C0[20] *= 1 - 0.4 * x0),
        (C0[21] *= 0.7),
        C0
      );
    },
    w = g(Qa(e.support.pose, p("sll", 1)), e.support.pose);
  for (let q0 = 0; q0 < 4; q0++) {
    let v0 = q0 * 4,
      x0 = e.support.pose;
    ((w[v0] = Math.max(-6, x0[v0] - 31)),
      (w[v0 + 2] = Math.min(
        x0[v0 + 2],
        Math.max(4, x0[v0 + 2] - 36, [26, 22, 16, 9][q0]),
      )),
      (w[v0 + 3] = Math.max(x0[v0 + 3], [12, 10, 8, 6][q0])));
  }
  let T = (q0, v0 = 0.02, x0 = 0.1) => [
      {
        t: q0 - 0.21,
        pose: pn.relaxed,
        dur: 0.1,
        digits: [0, 1, 2, 3],
      },
      {
        t: q0 - 0.21,
        pose: w,
        dur: 0.09,
        digits: [4],
      },
      {
        t: q0 - 0.12,
        pose: w,
        dur: 0.05,
        stagger: 0.005,
        from: "little",
        digits: [0, 1, 2, 3],
      },
      {
        t: q0 - 0.055,
        pose: e.support.pose,
        dur: x0,
        stagger: v0,
        from: "index",
        ease: "out",
        digits: [0, 1, 2, 3],
      },
      {
        t: q0 - 0.01,
        pose: e.support.pose,
        dur: 0.06,
        digits: [4],
        ease: "out",
      },
    ],
    S = M(e.mag.pose, p("mpo", x === "vgrip" || x === "angled" ? 1 : 0.55), 1),
    E = new Float32Array(S);
  for (let q0 = 0; q0 < 4; q0++) {
    let v0 = q0 * 4,
      x0 = e.mag.pose;
    ((E[v0] = x0[v0] - p("mrm", 40)),
      (E[v0 + 2] = Math.max(x0[v0 + 2], p("mrp", 32) + 3 * q0)),
      (E[v0 + 3] = Math.max(x0[v0 + 3], 22 + 2 * q0)));
  }
  let _ = m(M(e.mag.pose, 0.6, 1.2), v, p("mof", 0.25)),
    R = M(e.magPush.pose, 0.18, 0.6),
    C = M(e.magPush.pose, p("pof", 0.25), 0.5),
    L = new Float32Array(e.catch.pose),
    A = new Float32Array(e.catch.pose),
    O = m(M(e.catch.pose, p("cop", 0.5), 0), b, 0.2);
  ((L[17] -= 8), (L[20] = Math.max(0, L[20] - 6)), (A[17] += 1), (A[20] += 4));
  for (let q0 = 16; q0 < 21; q0++) O[q0] = L[q0];
  let H = {
      t: 0,
      ...n.grip("support"),
    },
    F = e.support.n || D1(0.44, 0.9, 0),
    P = e.support.nk || 1,
    z = (q0, v0 = 0, x0 = 0, C0 = 0) =>
      n.grip("support", {
        d: [-F.x * q0 * P + v0, -F.y * q0 * P + x0, -F.z * q0 * P + C0],
      }),
    k = (q0, v0, x0, C0 = null, k0 = 0) => ({
      p: e.support.pos.clone().add(D1(q0, v0, x0)),
      q: C0 ? e.support.quat.clone().slerp(C0, k0) : e.support.quat.clone(),
      f: "view",
    }),
    I = (q0) => {
      let v0 = s.mag.userData.rest;
      return {
        p: e.mag.pos.clone().sub(v0).applyQuaternion(q0.q).add(q0.p),
        q: q0.q.clone().multiply(e.mag.quat),
        f: q0.f,
      };
    },
    G = new Quaternion().setFromEuler(o.hip.rot).invert(),
    K = (q0, v0, x0, C0, k0) => {
      let O0 = QE(
        -1,
        D1(q0, v0, x0),
        D1(C0[0], C0[1], C0[2]),
        D1(k0[0], k0[1], k0[2]),
      );
      return {
        p: O0.pos.sub(o.hip.pos).applyQuaternion(G),
        q: G.clone().multiply(O0.quat),
        f: "view",
      };
    },
    $ = Math.max(0, (o.magLen || 0.12) - 0.12),
    n0 = x === "vgrip" ? p("fgv", 0.085) : x === "angled" ? p("fga", 0.035) : 0,
    e0 = jt([
      [0, 0],
      [0.03, 0.058, "out"],
      [0.044, 0.058],
      [0.076, 0, "in"],
    ]),
    p0 = jt([
      [0, 0],
      [0.012, 1, "out"],
      [0.05, 1],
      [0.09, 0],
    ]),
    t0 = l(
      "fire",
      c(
        0.09,
        [
          {
            t: 0.02,
            type: "eject",
          },
        ],
        (q0, v0) => {
          if (q0 === f) {
            (n.part("bolt", 0, 0, h),
              n.part("boltCatch", 0, 0, 0, 0, 0, u),
              d("empty"),
              (t.clip.trig = 1));
            return;
          }
          ((q0 < r.fireT - 1e-4 || r.sinceFire > 0.06) && r.shot(),
            (r.fireT = q0),
            (r.sinceFire = 0));
          let x0 = p0(q0),
            C0 = t.clip.R.pose,
            k0 = t.clip.L.pose,
            O0 = q0 > 0.07 ? 1 - L5.io((q0 - 0.07) / 0.02) : 1,
            B0 = (o.fireN || 1) <= 1 ? 1 : 0,
            ot = o.heatK || 0,
            Q0 = ot * ot * (3 - 2 * ot);
          (n.part("bolt", 0, 0, e0(q0)),
            n.part("trigger", 0, 0, 0, -0.22 * x0),
            (s.chamberRound.visible = q0 < 0.021 || q0 > 0.05));
          let nt = vi(q0, 0, O0, 170, 50),
            L0 = vi(q0, 0.004, O0, 150, 44),
            ht = vi(q0, 0.01, O0, 105, 38);
          (n.part("chargingHandle", 0, 0, Math.max(0, 0.0012 * L0)),
            n.part("chLatch", 0, 0, 0, 0, -0.06 * Math.max(0, L0), 0),
            n.part("dustCover", 0, 0, 0, 0, 0, 0.1 * ht),
            n.part("buisRearArm", 0, 0, 0, 0.007 * L0, 0, 0),
            n.part("buisFrontArm", 0, 0, 0, -0.009 * ht, 0, 0),
            n.part("boltCatch", 0, 0, 0, 0, 0, 0.014 * L0),
            n.part(
              "mag",
              0,
              -3e-4 * Math.max(0, ht),
              0,
              0.004 * ht,
              0,
              0.003 * L0,
            ));
          {
            let V0 = 1 - 0.45 * (r.ads || 0);
            n.gunAt(
              v0,
              0,
              3e-4 * L0 * V0,
              8e-4 * nt * V0,
              0.0034 * L0 * V0,
              0,
              0.0042 * ht * V0,
            );
          }
          ((t.clip.trig = 1), (t.clip.press = x0));
          for (let V0 of [6, 10, 14])
            ((C0[V0] += (2.2 + 0.9 * B0) * x0 + 1.4 * Q0),
              (C0[V0 + 1] += 1.2 * x0 + 0.8 * Q0));
          C0[19] += 1.5 * x0 + 1 * Q0;
          let pt = Math.max(0, vi(q0, 0, O0, 60, 26)) * (1 + 0.5 * B0);
          for (let V0 of [2, 6, 10, 14]) k0[V0] += 1.8 * pt + 1.5 * Q0;
          k0[19] += 1.2 * Q0;
        },
      ),
    );
  t0.holdT = f;
  let M0 = globalThis.GH_TUNE || {},
    f0 = (q0, v0) => M0[q0] ?? v0,
    _0 = [f0("rpx", 0.04), f0("rpy", 0.11), f0("rpz", -0.04)],
    F0 = [f0("rrx", 0.2), f0("rry", 0.1), f0("rrz", -0.7)],
    m0 = n.partKey(
      "mag",
      [f0("awx", -0.15), f0("awy", -0.215) - $, f0("awz", 0.07)],
      [0.75, 0.45, 0.55],
      "view",
    ),
    S0 = (q0) => {
      let v0 = q0 ? 2.15 : 1.9,
        x0 = 0.31,
        C0 = 0.27,
        k0 = 0.345,
        O0 = q0 ? C0 - 0.045 : 0.355,
        B0 = 0.405,
        ot = q0 ? 0.6 : 0.76,
        Q0 = ot + 0.19,
        nt = ot + 0.275,
        L0 = ot + 0.29,
        ht = ot + 0.44,
        pt = ot - 0.02,
        V0 = q0 ? ht + 0.34 : 0,
        c0 = V0 - 0.06,
        Z = q0 ? V0 + 0.44 : ht + 0.5,
        r0 = Z - 0.3,
        b0 = Z + 0.05,
        d0 = jt([
          [0.06, 0],
          [0.31, 1, "back"],
          [r0, 1],
          [b0, 0, "io"],
        ]),
        V = jt([
          [0, 0],
          [0.07, -0.07, "out"],
          [0.3, 1, "back"],
          [r0 + 0.02, 1],
          [b0 - 0.02, 0, "io"],
        ]),
        B = jt([
          [0.04, 0],
          [0.29, 1, "out"],
          [r0, 1],
          [b0 - 0.03, 0, "io"],
        ]),
        j = jt([
          [0.03, 0],
          [0.27, 1, "io"],
          [r0 - 0.02, 1],
          [b0 - 0.05, 0, "io"],
        ]),
        s0 = jt([
          [0, 0],
          [0.06, -0.05, "out"],
          [0.32, 1, "back"],
          [r0 + 0.03, 1],
          [b0, -0.06, "io"],
          [b0 + 0.09, 0, "io"],
        ]),
        l0 = q0
          ? jt([
              [C0 - 0.07, 0],
              [C0 + 0.03, 1, "in"],
              [C0 + 0.11, -0.25, "out"],
              [C0 + 0.24, 0, "io"],
            ])
          : () => 0,
        E0 = (X0) => be(X0, 0.06, 0.2, Z - 0.1, Z + 0.05),
        U = [
          {
            t: Q0,
            v: [-0.012, 0.03, 0, 0.09, 0.02, -0.07],
          },
          {
            t: nt - 0.03,
            v: [0, 0.07, 0.01, 0.2, 0.02, -0.09],
          },
          {
            t: ht - 0.004,
            v: [0.01, 0.18, 0.03, 0.56, 0.07, -0.26],
          },
          {
            t: ht + 0.1,
            v: [0, -0.05, 0, -0.14, 0, 0.06],
          },
          {
            t: Z - 0.02,
            v: [0, 0.03, 0, 0.1, 0, 0.05],
          },
        ];
      q0
        ? U.push(
            {
              t: k0,
              v: [0, 0.03, 0, 0.1, 0, 0.1],
            },
            {
              t: c0,
              v: [0.02, 0.01, 0, 0.04, -0.05, 0.08],
            },
            {
              t: V0,
              v: [0.03, 0, 0, 0, -0.06, 0.1],
            },
            {
              t: V0 + 0.035,
              v: [0.01, -0.02, -0.1, -0.26, 0.06, 0.22],
            },
          )
        : U.push(
            {
              t: x0 - 0.01,
              v: [0.012, -0.01, 0.02, -0.07, 0.04, 0.07],
            },
            {
              t: O0 + 0.03,
              v: [0, -0.025, 0, -0.07, 0, 0.03],
            },
            {
              t: B0 + 0.035,
              v: [0, 0.08, 0, 0.32, 0, 0.12],
            },
          );
      let X = Do(v0, {
          n: 6,
          k: [300, 300, 300, 330, 330, 300],
          c: [15, 15, 15, 14, 14, 13],
          impulses: U,
          target: (X0, ut) => {
            let z0 = E0(X0);
            ((ut[0] = 0.0025 * Math.sin(X0 * 2.9 + 0.5) * z0),
              (ut[1] = (-0.005 + 0.003 * Math.sin(X0 * 3.7)) * z0),
              (ut[2] = 0.002 * Math.sin(X0 * 2.1 + 2) * z0),
              (ut[3] = (-0.038 + 0.014 * Math.sin(X0 * 2.3)) * z0),
              (ut[4] = 0.018 * Math.sin(X0 * 1.7 + 1) * z0),
              (ut[5] = (0.026 + 0.016 * Math.sin(X0 * 3.1 + 2)) * z0));
          },
        }),
        N = q0 ? k0 : B0 + 0.08,
        q = jt([
          [N, 0],
          [Math.min(N + 0.22, ot - 0.02), 1, "io"],
          [ot + 0.06, 1],
          [ot + 0.26, 0, "io"],
        ]),
        o0 = q0 ? 0.36 : B0 + 0.22,
        h0 = jt([
          [o0 - 0.16, 0],
          [o0 + 0.02, 1, "io"],
          [ot + 0.02, 0.8],
          [ot + 0.2, 0, "io"],
        ]),
        y0 = (X0, ut) => {
          X(X0, gn);
          let z0 = q(X0),
            I0 = l0(X0),
            vt = h0(X0);
          ((gn[1] -= 0.006 * z0 + 0.011 * vt),
            (gn[0] -= 0.007 * vt),
            (gn[3] += 0.035 * z0 - 0.03 * vt),
            (gn[5] -= 0.075 * z0 - 0.05 * vt),
            (gn[4] += 0.02 * z0),
            n.gunAt(
              ut,
              _0[0] * d0(X0) + gn[0] - 0.012 * I0,
              _0[1] * V(X0) + gn[1] + 0.006 * I0,
              _0[2] * d0(X0) + gn[2],
              F0[0] * B(X0) + gn[3] - 0.05 * I0,
              F0[1] * j(X0) + gn[4] + 0.06 * I0,
              F0[2] * s0(X0) + gn[5] - 0.2 * I0,
            ));
        },
        D = 0.014,
        W = [
          {
            t: ot,
            ...m0,
          },
          {
            t: ot + 0.12,
            ...n.partKey(
              "mag",
              [-0.046, -0.178 - 0.4 * $, 0.04],
              [0.26, 0.1, 0.3],
            ),
            pass: !0,
          },
          {
            t: Q0,
            ...n.partKey("mag", [-0.0045, -0.073, 0.009], [-0.13, 0, 0.085]),
          },
          {
            t: Q0 + 0.04,
            ...n.partKey("mag", [-0.0015, -0.054, 0.003], [-0.06, 0, 0.03]),
            pass: !0,
          },
          {
            t: nt,
            ...n.partKey("mag", [0, -D, 0]),
            ease: "out",
          },
          {
            t: ht - 0.016,
            ...n.partKey("mag", [0, -D, 0]),
          },
          {
            t: ht,
            ...n.partKey("mag"),
            ease: "in",
          },
        ],
        Y = q0
          ? [
              {
                t: 0,
                ...n.partKey("mag"),
              },
              {
                t: C0,
                ...n.partKey("mag"),
              },
              {
                t: k0,
                ...n.partKey("mag", [0, -0.08, 0]),
                ease: "in",
              },
              {
                t: k0 + 0.001,
                ...m0,
              },
              ...W,
            ]
          : [
              {
                t: 0,
                ...n.partKey("mag"),
              },
              {
                t: O0 + 0.012,
                ...n.partKey("mag"),
              },
              {
                t: O0 + 0.04,
                ...n.partKey("mag", [0, -0.0048, 0]),
                ease: "out",
              },
              {
                t: B0,
                ...n.partKey("mag", [0, -0.0048, 0]),
              },
              {
                t: B0 + 0.06,
                ...n.partKey("mag", [0, -0.064, 0]),
                pass: !0,
              },
              {
                t: B0 + 0.11,
                ...n.partKey("mag", [-0.008, -0.118, 0.01], [0.08, 0, 0.1]),
                pass: !0,
              },
              {
                t: B0 + 0.19,
                ...n.partKey(
                  "mag",
                  [-0.06, -0.192 - 0.4 * $, 0.04],
                  [0.35, 0.15, 0.4],
                ),
                pass: !0,
              },
              {
                t: B0 + 0.27,
                ...m0,
              },
              ...W,
            ],
        R0 = new Xs(Y),
        U0 = null;
      if (q0) {
        let X0 = {
            pos: D1(0, 0, 0),
            rot: new Euler(),
          },
          ut = D1(0, 0, 0),
          z0 = D1(0, 0, 0),
          I0 = new Quaternion(),
          vt = new Quaternion(),
          wt = (Et, zt, J) => {
            (y0(Et, X0),
              R0.eval(Et, n, zt, J),
              zt.applyQuaternion(n.cq).add(n.cp),
              J.premultiply(n.cq));
          };
        (wt(k0 - 0.012, ut, I0), wt(k0, z0, vt));
        let _t = z0
          .clone()
          .sub(ut)
          .multiplyScalar(1 / 0.012);
        U0 = {
          p: z0.clone(),
          v: D1(_t.x * 0.3 - 0.7, _t.y * 0.22 + 0.42, _t.z * 0.3 - 0.22),
          q: vt.clone(),
          axis: D1(0.25, 0.1, 1).normalize(),
          tExit: 0.5,
        };
        let Pt = o.hip.pos,
          bt = Math.tan((27.5 * Math.PI) / 180);
        for (let Et = 0.04; Et < 0.6; Et += 0.01) {
          let zt = U0.p.y + U0.v.y * Et - 4.5 * Et * Et + Pt.y,
            J = U0.p.z + U0.v.z * Et + Pt.z;
          if (zt < J * bt - 0.11) {
            U0.tExit = Et;
            break;
          }
        }
      }
      let $0 = [
        H,
        {
          t: 0.07,
          ...n.grip("support"),
        },
        {
          t: 0.12,
          ...z(0.05, -0.012),
          pass: !0,
        },
      ];
      (q0
        ? $0.push(
            {
              t: 0.19,
              ...k(-0.07 - 1.4 * $, -0.1, 0),
              pass: !0,
            },
            {
              t: 0.27,
              ...k(-0.12 - $, -0.17 - 0.6 * $, 0.07 - 1.2 * $),
              pass: !0,
            },
            {
              t: 0.4,
              ...I(m0),
            },
            {
              t: pt,
              ...I(m0),
            },
            {
              t: pt + 0.001,
              ...n.grip("mag"),
            },
          )
        : $0.push(
            {
              t: 0.185,
              ...k(
                -0.06 - $,
                -0.125 + n0 - 0.5 * $,
                -0.3 * $ - 0.4 * n0,
                e.mag.quat,
                n0 ? 0.6 : 0,
              ),
              pass: !0,
            },
            {
              t: 0.25,
              ...n.grip("mag", {
                d: [-0.012 - (n0 ? p("fgx", 0.02) : 0), -0.014, -0.062],
                f: "root",
              }),
              pass: !0,
            },
            {
              t: x0 - 0.035,
              ...n.grip("mag", {
                d: [-0.001, -0.001, -0.02],
                f: "root",
              }),
              pass: !0,
            },
            {
              t: x0,
              ...n.grip("mag"),
            },
          ),
        $0.push(
          {
            t: L0,
            ...n.grip("mag"),
          },
          {
            t: L0 + 0.045,
            ...n.grip("mag", {
              d: [-0.004, -0.014, -0.024],
            }),
            pass: !0,
          },
          {
            t: ht - 0.05,
            ...n.grip("magPush", {
              d: [-0.004, -0.044, -0.016],
            }),
            pass: !0,
          },
          {
            t: ht - 0.016,
            ...n.grip("magPush"),
            pass: !0,
          },
          {
            t: ht + 0.022,
            ...n.grip("magPush", {
              d: [0, 7e-4, 0],
            }),
            ease: "out",
          },
          {
            t: ht + 0.075,
            ...n.grip("magPush", {
              d: [0, 4e-4, 0],
            }),
          },
        ),
        q0
          ? $0.push(
              {
                t: ht + 0.118,
                ...n.grip("magPush", {
                  d: [0.002, -0.026, -0.008],
                }),
                pass: !0,
              },
              {
                t: ht + 0.175,
                ...n.grip("magPush", {
                  d: [-0.034, -0.048, -0.044],
                  f: "root",
                }),
                pass: !0,
              },
              {
                t: c0 - 0.035,
                ...n.grip("catch", {
                  d: [-0.034, -0.012, -0.008],
                }),
                pass: !0,
              },
              {
                t: c0 + 0.025,
                ...n.grip("catch", {
                  d: [-0.008, 0, 0],
                }),
                pass: !0,
              },
              {
                t: V0,
                ...n.grip("catch", {
                  d: [4e-4, 0, 0],
                }),
              },
              {
                t: V0 + 0.06,
                ...n.grip("catch"),
              },
              {
                t: V0 + 0.11,
                ...n.grip("catch", {
                  d: [-0.03, -0.004, -0.004],
                }),
                pass: !0,
              },
              {
                t: V0 + 0.18,
                ...n.grip("catch", {
                  d: [-0.064, -0.04, -0.02],
                }),
                pass: !0,
              },
              {
                t: V0 + 0.29,
                ...k(-0.06 - 0.8 * $, -0.1, -0.015),
                pass: !0,
              },
              {
                t: Z - 0.09,
                ...z(0.055),
                pass: !0,
              },
              {
                t: Z,
                ...n.grip("support"),
              },
            )
          : $0.push(
              {
                t: ht + 0.118,
                ...n.grip("magPush", {
                  d: [0.002, -0.026, -0.008],
                }),
                pass: !0,
              },
              {
                t: ht + 0.16,
                ...n.grip("magPush", {
                  d: [0.003, -0.046, -0.034],
                  f: "root",
                }),
                pass: !0,
              },
              {
                t: ht + 0.29,
                ...k(-0.075 - 0.8 * $, -0.095, -0.015),
                pass: !0,
              },
              {
                t: Z - 0.09,
                ...z(0.055),
                pass: !0,
              },
              {
                t: Z,
                ...n.grip("support"),
              },
            ));
      let g0 = new Xs($0),
        G0 = q0
          ? [
              {
                t: 0,
                pose: w,
                dur: 0.09,
                stagger: 0.012,
                from: "thumb",
              },
              {
                t: 0.12,
                pose: b,
                dur: 0.16,
              },
              {
                t: 0.4,
                pose: e.mag.pose,
                dur: 0.1,
                stagger: 0,
              },
            ]
          : [
              {
                t: 0,
                pose: w,
                dur: 0.1,
                stagger: 0.012,
                from: "thumb",
              },
              {
                t: 0.1,
                pose: b,
                dur: 0.1,
              },
              {
                t: n0 ? p("fgt", x === "vgrip" ? 0.235 : 0.165) : 0.165,
                pose: E,
                dur: x === "vgrip" ? 0.04 : 0.06,
                digits: [4],
              },
              {
                t: 0.14,
                pose: E,
                dur: 0.05,
                digits: [0, 1, 2, 3],
              },
              {
                t: x0 - 0.115,
                pose: S,
                dur: 0.035,
                stagger: 0.003,
                from: "little",
                digits: [0, 1, 2, 3],
              },
              {
                t: x0 - 0.035,
                pose: e.mag.pose,
                dur: 0.065,
                stagger: 0.012,
                from: "little",
                ease: "out",
              },
            ];
      (G0.push(
        {
          t: L0 - 0.012,
          pose: _,
          dur: 0.055,
          stagger: 0.008,
          from: "little",
        },
        {
          t: L0 + 0.045,
          pose: R,
          dur: 0.07,
        },
        {
          t: ht - 0.035,
          pose: e.magPush.pose,
          dur: 0.05,
          ease: "out",
        },
      ),
        G0.push({
          t: ht + 0.07,
          pose: C,
          dur: 0.06,
          stagger: 0.006,
          from: "little",
        }),
        q0
          ? G0.push(
              {
                t: ht + 0.18,
                pose: O,
                dur: 0.09,
                stagger: 0.006,
                from: "thumb",
              },
              {
                t: c0 - 0.012,
                pose: L,
                dur: 0.065,
                stagger: 0.012,
                from: "little",
                ease: "out",
              },
              {
                t: V0 - 0.04,
                pose: A,
                dur: 0.045,
                digits: [4],
                ease: "in",
              },
              {
                t: V0 + 0.05,
                pose: O,
                dur: 0.05,
                stagger: 0.004,
                from: "index",
                digits: [0, 1, 2, 3],
              },
              {
                t: V0 + p("ctf", 0.065),
                pose: b,
                dur: 0.06,
                digits: [4],
              },
              {
                t: V0 + 0.15,
                pose: b,
                dur: 0.1,
                stagger: 0.008,
                from: "index",
                digits: [0, 1, 2, 3],
              },
            )
          : G0.push({
              t: ht + 0.13,
              pose: y,
              dur: 0.15,
              stagger: 0.012,
              from: "index",
            }),
        G0.push(...T(Z)));
      let K0 = new Gs(e.support.pose, G0),
        it = new Gs(e.fire.pose, [
          {
            t: O0 - 0.13,
            pose: e.magRel.pose,
            dur: 0.11,
            digits: [0],
          },
          {
            t: O0 + 0.12,
            pose: e.fire.pose,
            dur: 0.16,
            digits: [0],
          },
        ]),
        ft = jt([
          [O0 - 0.025, 0],
          [O0 + 0.005, 1, "out"],
          [O0 + 0.07, 1],
          [O0 + 0.12, 0],
        ]),
        gt = (X0) => be(X0, 0.1, 0.26, Z - 0.12, Z + 0.06),
        rt = jt([
          [V0 + 0.012, 0],
          [V0 + 0.05, 1, "in"],
        ]),
        dt = jt([
          [V0 - 0.005, u],
          [V0 + 0.02, -0.11, "out"],
          [V0 + 0.05, -0.11],
          [V0 + 0.12, 0],
        ]),
        tt = [
          ye(0.05, "cloth"),
          ye(q0 ? C0 + 0.01 : O0 + 0.02, "magout"),
          ye(ht - 0.03, "magin"),
          {
            t: ht + 0.02,
            type: "ammo",
          },
          ye(Z - 0.12, "cloth"),
        ];
      return (
        q0 &&
          tt.push(
            {
              t: Math.min(pt - 0.02, k0 + U0.tExit),
              type: "magdrop",
            },
            ye(V0 + 0.03, "bolt"),
          ),
        l(
          "clip",
          c(v0, tt, (X0, ut) => {
            if (
              ((!q0 || X0 < k0 || X0 >= pt) && (i = !1),
              y0(X0, ut),
              d(X0 >= pt ? "full" : q0 ? "empty" : "part"),
              X0 >= ht && (r.fired = 0),
              q0 && X0 >= k0 && X0 < pt)
            ) {
              let _t = X0 - k0,
                Pt = s.mag;
              (i && (Pt.visible = !1),
                sk.copy(U0.p).addScaledVector(U0.v, _t),
                (sk.y -= 0.5 * 9 * _t * _t),
                nk.setFromAxisAngle(U0.axis, -7.5 * _t).premultiply(U0.q),
                Pt.position.copy(sk).sub(n.cp).applyQuaternion(n.cqi),
                Pt.quaternion.copy(n.cqi).multiply(nk));
            } else {
              n.partXf("mag", R0, X0);
              let _t = be(X0, Q0 - 0.08, Q0 - 0.02, Q0 + 0.005, Q0 + 0.04);
              if (_t > 0) {
                let Pt = s.mag,
                  bt = Math.sin((X0 - ot) * 64);
                ((Pt.position.x += 0.0018 * bt * _t),
                  (Pt.position.z += 0.0013 * Math.cos((X0 - ot) * 51) * _t),
                  Pt.quaternion.multiply(
                    nk.setFromEuler(
                      BJ.set(
                        0.024 * bt * _t,
                        0,
                        0.028 * Math.cos((X0 - ot) * 47) * _t,
                      ),
                    ),
                  ));
              }
            }
            (q0 &&
              (n.part("bolt", 0, 0, h * (1 - rt(X0))),
              n.part("boltCatch", 0, 0, 0, 0, 0, dt(X0))),
              n.part("magRelease", -0.0022 * ft(X0), 0, 0),
              n.hand("L", g0, X0),
              n.pose("L", K0, X0),
              n.pose("R", it, X0));
            let z0 = t.clip.R.pose,
              I0 =
                gt(X0) +
                1.2 * be(X0, ht - 0.03, ht + 0.02, ht + 0.08, ht + 0.24) +
                0.8 * be(X0, B0 - 0.02, B0 + 0.04, B0 + 0.1, B0 + 0.25);
            for (let _t of [6, 10, 14])
              ((z0[_t] += 1.1 * I0), (z0[_t + 1] += 0.7 * I0));
            let vt = t.clip.L.pose,
              wt = q0 ? 0 : be(X0, O0, O0 + 0.04, B0 + 0.08, B0 + 0.2);
            if (wt > 0) {
              for (let _t of [2, 6, 10, 14]) vt[_t] += 1.6 * wt;
              vt[19] += 2 * wt;
            }
          }),
        )
      );
    },
    T0 = z(0.07, -0.02, -0.05, 0.035),
    j0 = (() => {
      let q0 = jt([
          [0, -0.3],
          [0.3, 0.012, "out3"],
          [0.4, 0],
        ]),
        v0 = jt([
          [0, -0.85],
          [0.28, 0.05, "out3"],
          [0.4, 0],
        ]),
        x0 = jt([
          [0, 1],
          [0.34, 0, "out"],
        ]),
        C0 = jt([
          [0, 0.3],
          [0.3, -0.03, "out"],
          [0.4, 0],
        ]),
        k0 = new Xs([
          {
            t: 0,
            ...T0,
          },
          {
            t: 0.06,
            ...T0,
          },
          {
            t: 0.2,
            ...z(0.035),
            pass: !0,
          },
          {
            t: 0.27,
            ...n.grip("support"),
          },
        ]),
        O0 = new Gs(m(b, w, 0.5), T(0.27).slice(1));
      return l(
        "clip",
        c(0.4, [ye(0.02, "cloth")], (B0, ot) => {
          (n.gunAt(
            ot,
            0.02 * x0(B0),
            q0(B0),
            0.06 * x0(B0),
            v0(B0),
            0.25 * x0(B0),
            C0(B0),
          ),
            n.hand("L", k0, B0),
            n.pose("L", O0, B0));
        }),
      );
    })(),
    Z0 = (() => {
      let q0 = jt([
          [0, 0],
          [0.05, 0.008, "out"],
          [0.25, -0.32, "in"],
        ]),
        v0 = jt([
          [0, 0],
          [0.05, 0.03, "out"],
          [0.25, -0.8, "in"],
        ]),
        x0 = jt([
          [0.03, 0],
          [0.25, 1, "in"],
        ]),
        C0 = new Xs([
          H,
          {
            t: 0.05,
            ...n.grip("support"),
          },
          {
            t: 0.12,
            ...z(0.035),
            pass: !0,
          },
          {
            t: 0.23,
            ...T0,
          },
        ]),
        k0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: w,
            dur: 0.07,
            stagger: 0.006,
            from: "thumb",
          },
        ]);
      return l(
        "clip",
        c(0.25, [ye(0.02, "cloth")], (O0, B0) => {
          (n.gunAt(
            B0,
            0,
            q0(O0),
            0.05 * x0(O0),
            v0(O0),
            0.2 * x0(O0),
            0.25 * x0(O0),
          ),
            n.hand("L", C0, O0),
            n.pose("L", k0, O0));
        }),
      );
    })(),
    lt = (() => {
      let C0 = [
          f0("ibx", -0.06),
          f0("iby", 0.07),
          f0("ibz", -0.08),
          f0("ibrx", 0.9),
          f0("ibry", 1),
          f0("ibrz", 1.5),
        ],
        k0 = jt([
          [0.05, 0],
          [0.52, 1, "back"],
          [1.36, 1],
          [1.9, 0, "io"],
        ]),
        O0 = jt([
          [1.42, 0],
          [1.98, 1, "back"],
          [2.86, 1],
          [3.42, 0, "io"],
        ]),
        B0 = jt([
          [2.16, 0],
          [2.16 + 0.16, 1, "out"],
          [2.62, 1],
          [2.62 + 0.035, 0, "in"],
        ]),
        ot = jt([
          [2.16 - 0.05, 0],
          [2.16, 1],
          [2.62, 1],
          [2.62 + 0.05, 0],
        ]),
        Q0 = Do(3.6, {
          n: 6,
          k: 260,
          c: 13,
          impulses: [
            {
              t: 1.44,
              v: [0, -0.03, 0, -0.1, 0, 0.1],
            },
            {
              t: 2.02,
              v: [0, 0.02, 0, 0.06, 0, -0.14],
            },
            {
              t: 2.16 + 0.03,
              v: [0, 0, 0.05, 0.1, 0, 0.05],
            },
            {
              t: 2.62 + 0.035,
              v: [0, -0.01, -0.09, -0.16, 0.03, -0.08],
            },
            {
              t: 3.22,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
          target: (Z, r0) => {
            let b0 = be(Z, 1.36, 1.56, 3.12, 3.26),
              d0 = be(Z, 0.4, 0.7, 3, 3.3);
            ((r0[0] = 0.002 * Math.sin(Z * 2.7) * d0),
              (r0[2] = 0),
              (r0[1] = -0.004 * b0 + 0.002 * Math.sin(Z * 3.3 + 1) * d0),
              (r0[3] = -0.03 * b0 + 0.01 * Math.sin(Z * 2.1) * d0),
              (r0[4] = 0.012 * Math.sin(Z * 1.6 + 2) * d0),
              (r0[5] = 0.02 * b0 + 0.012 * Math.sin(Z * 2.9) * d0));
          },
        }),
        nt = e.ch.pose,
        L0 = new Xs([
          H,
          {
            t: 1.36,
            ...n.grip("support"),
          },
          {
            t: 1.5,
            ...z(0.075, -0.035, -0.04, 0),
            pass: !0,
          },
          {
            t: 1.66,
            ...n.grip("ch", {
              d: [-0.15, -0.05, -0.09],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 1.84,
            ...n.grip("ch", {
              d: [-0.034, 0.034, -0.034],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 1.96,
            ...n.grip("ch", {
              d: [-0.006, 0.004, -0.012],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 2.04,
            ...n.grip("ch"),
          },
          {
            t: 2.62 + 0.06,
            ...n.grip("ch"),
          },
          {
            t: 2.62 + 0.1,
            ...n.grip("ch", {
              d: [-0.006, 0.004, -0.012],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 2.62 + 0.17,
            ...n.grip("ch", {
              d: [-0.03, 0.034, -0.032],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 2.62 + 0.27,
            ...n.grip("ch", {
              d: [-0.11, 0.03, -0.01],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 2.62 + 0.4,
            ...z(0.13, -0.06, -0.05, 0.06),
            pass: !0,
          },
          {
            t: 3.16,
            ...z(0.035),
            pass: !0,
          },
          {
            t: 3.24,
            ...n.grip("support"),
          },
        ]),
        ht = m(e.support.pose, w, 0.55),
        pt = new Gs(e.support.pose, [
          {
            t: 0.66,
            pose: ht,
            dur: 0.12,
            stagger: 0.04,
            from: "little",
          },
          {
            t: 0.8,
            pose: e.support.pose,
            dur: 0.14,
            stagger: 0.04,
            from: "little",
            ease: "out",
          },
          {
            t: 1.27,
            pose: w,
            dur: 0.11,
            stagger: 0.01,
            from: "thumb",
          },
          {
            t: 1.4,
            pose: b,
            dur: 0.16,
          },
          {
            t: 1.62,
            pose: nt,
            dur: 0.22,
          },
          {
            t: 2.035,
            pose: e.ch.pose,
            dur: 0.08,
            stagger: 0.015,
            from: "index",
            ease: "out",
          },
          {
            t: 2.62 + 0.16,
            pose: b,
            dur: 0.14,
          },
          ...T(3.24),
        ]),
        V0 = (Z) =>
          be(Z, 0.86, 0.93, 0.95, 1.04) + be(Z, 1.06, 1.12, 1.13, 1.22),
        c0 = (Z) => be(Z, 1.4, 1.6, 3.05, 3.25);
      return l(
        "clip",
        c(
          3.6,
          [
            ye(0.1, "cloth"),
            ye(1.44, "cloth"),
            ye(2.16 + 0.02, "slide"),
            ye(2.62 + 0.03, "bolt"),
            ye(2.95, "cloth"),
          ],
          (Z, r0) => {
            let b0 = k0(Z),
              d0 = O0(Z),
              V =
                Math.sin(Z * 1.7) * 0.03 * Math.max(b0, d0) +
                0.16 * (Z - 0.9) * b0 -
                0.1 * (Z - 2.35) * d0;
            (Q0(Z, gn),
              (gn[5] += 0.1 * (Z - 0.9) * b0 + 0.12 * (Z - 2.35) * d0),
              (gn[3] += 0.05 * (Z - 2.35) * d0),
              n.gunAt(
                r0,
                -0.045 * b0 + C0[0] * d0 + gn[0],
                0.06 * b0 + C0[1] * d0 + gn[1],
                -0.01 * b0 + C0[2] * d0 + gn[2],
                0.22 * b0 + C0[3] * d0 + gn[3],
                (0.95 + V) * b0 + (C0[4] + V) * d0 + gn[4],
                -0.3 * b0 + C0[5] * d0 + gn[5],
              ));
            let B = B0(Z);
            ((s.chamberRound.visible = B > 0.02),
              n.part("chargingHandle", 0, 0, 0.026 * B),
              n.part("bolt", 0, 0, 0.026 * B),
              n.part("chLatch", 0, 0, 0, 0, -0.3 * ot(Z), 0),
              n.hand("L", L0, Z),
              n.pose("L", pt, Z));
            let j = t.clip.R.pose,
              s0 = V0(Z),
              l0 = c0(Z) + 0.8 * be(Z, 2.16, 2.16 + 0.1, 2.62, 2.62 + 0.15);
            ((j[0] -= 13 * s0), (j[2] -= 5 * s0));
            for (let E0 of [6, 10, 14])
              ((j[E0] += 1.2 * l0), (j[E0 + 1] += 0.8 * l0));
          },
        ),
      );
    })(),
    H0 = (() => {
      let v0 = jt([
        [0, 0],
        [0.045, -0.08, "out"],
        [0.2, 1, "io"],
        [0.27, 0.92, "out"],
        [0.45, 0, "io"],
      ]);
      return l(
        "clip",
        c(0.45, [ye(0.03, "cloth")], (x0, C0) => {
          let k0 = v0(x0),
            O0 = vi(x0, 0.2, 1, 44, 15) * (1 - x0 / 0.45);
          n.gunAt(
            C0,
            -0.38 * k0,
            0.145 * k0 + 0.004 * O0,
            -0.173 * k0 + 0.008 * O0,
            0.15 * k0 - 0.02 * O0,
            1.25 * k0 + 0.03 * O0,
            -0.45 * k0 + 0.035 * O0,
          );
          let B0 = be(x0, 0.02, 0.1, 0.26, 0.4),
            ot = t.clip.R.pose,
            Q0 = t.clip.L.pose;
          for (let nt of [6, 10, 14])
            ((ot[nt] += 2 * B0), (ot[nt + 1] += 1.2 * B0));
          for (let nt of [2, 6, 10, 14]) Q0[nt + 1] += 1.5 * B0;
        }),
      );
    })(),
    Y0 = (() => {
      let C0 = jt([
          [0, 1],
          [0.27, 0, "out3"],
        ]),
        k0 = jt([
          [0, 0.45],
          [0.24, 1, "out"],
          [0.36 + 0.07, 1],
          [0.72 - 0.07, -0.05, "io"],
          [0.86 - 0.03, 0, "io"],
        ]),
        O0 = Do(0.86, {
          n: 6,
          k: 300,
          c: 14,
          impulses: [
            {
              t: 0.36 - 0.004,
              v: [0.01, 0.12, 0.02, 0.38, 0.04, -0.2],
            },
            {
              t: 0.36 + 0.1,
              v: [0, -0.04, 0, -0.1, 0, 0.05],
            },
            {
              t: 0.72 - 0.02,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
        }),
        B0 = n.grip("magPush", {
          d: [-0.03 - 0.3 * $, -0.1, 0.01 - 0.5 * $],
          f: "root",
        }),
        ot = new Xs([
          {
            t: 0,
            ...B0,
          },
          {
            t: 0.12,
            ...B0,
          },
          {
            t: 0.36 - 0.07,
            ...n.grip("magPush", {
              d: [-0.008, -0.042, -0.012],
            }),
            pass: !0,
          },
          {
            t: 0.36 - 0.014,
            ...n.grip("magPush"),
            pass: !0,
          },
          {
            t: 0.36 + 0.024,
            ...n.grip("magPush", {
              d: [0, 7e-4, 0],
            }),
            ease: "out",
          },
          {
            t: 0.36 + 0.06,
            ...n.grip("magPush", {
              d: [0, 4e-4, 0],
            }),
          },
          {
            t: 0.36 + 0.105,
            ...n.grip("magPush", {
              d: [0.002, -0.024, -0.008],
            }),
            pass: !0,
          },
          {
            t: 0.36 + 0.15,
            ...n.grip("magPush", {
              d: [-0.008, -0.044, -0.03],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 0.36 + 0.24,
            ...k(-0.07, -0.09, -0.015),
            pass: !0,
          },
          {
            t: 0.72 - 0.08,
            ...z(0.05),
            pass: !0,
          },
          {
            t: 0.72,
            ...n.grip("support"),
          },
        ]),
        Q0 = new Gs(M(e.magPush.pose, p("pwo", 0.5), 0.6), [
          {
            t: 0.36 - 0.085,
            pose: R,
            dur: 0.05,
          },
          {
            t: 0.36 - 0.035,
            pose: e.magPush.pose,
            dur: 0.05,
            ease: "out",
          },
          {
            t: 0.36 + 0.06,
            pose: C,
            dur: 0.06,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.36 + 0.13,
            pose: y,
            dur: 0.13,
            stagger: 0.012,
            from: "index",
          },
          ...T(0.72, 0.02, 0.1),
        ]),
        nt = 0.006,
        L0 = jt([
          [0.36 - 0.014, 1],
          [0.36, 0, "in"],
        ]);
      return l(
        "clip",
        c(
          0.86,
          [
            ye(0.03, "cloth"),
            ye(0.36 - 0.03, "magin"),
            ye(0.72 - 0.1, "cloth"),
          ],
          (ht, pt) => {
            let V0 = C0(ht),
              c0 = k0(ht);
            (O0(ht, gn),
              n.gunAt(
                pt,
                0.01 * V0 + 0.036 * c0 + gn[0],
                -0.25 * V0 + 0.104 * c0 + gn[1],
                0.04 * V0 - 0.036 * c0 + gn[2],
                -0.55 * V0 + 0.19 * c0 + gn[3],
                0.16 * V0 + 0.1 * c0 + gn[4],
                0.12 * V0 - 0.64 * c0 + gn[5],
              ),
              n.part("mag", 0, -nt * L0(ht), 0),
              (r.fired = 0),
              n.hand("L", ot, ht),
              n.pose("L", Q0, ht));
            let Z = t.clip.R.pose,
              r0 = be(ht, 0.36 - 0.06, 0.36, 0.36 + 0.06, 0.36 + 0.22);
            for (let b0 of [6, 10, 14])
              ((Z[b0] += 1.2 * r0), (Z[b0 + 1] += 0.8 * r0));
          },
        ),
      );
    })(),
    et = (() => {
      let q0 = UJ(),
        v0 = q0.proto.clone();
      return (
        (v0.name = "frag"),
        (v0.visible = !1),
        (v0.userData.keep = !0),
        (v0.userData.hidden = !0),
        (v0.userData.rest = new Vector3()),
        o.root.add(v0),
        (s.frag = v0),
        q0
      );
    })(),
    ct = gs({
      i: [4, 2, 12, 6],
      m: [9, 0, 18, 9],
      r: [15, -1, 25, 12],
      l: [22, -3, 32, 16],
      t: [6, 26, -14, 8, 10],
      cup: 5,
    }),
    D0 = (() => {
      let C0 = jt([
          [0.02, 0],
          [0.17, 1, "out"],
          [0.36, 1],
          [0.61, 0, "io"],
        ]),
        k0 = Do(0.68, {
          n: 6,
          k: 300,
          c: 15,
          impulses: [
            {
              t: 0.05,
              v: [0, -0.02, 0, -0.06, 0, 0.05],
            },
            {
              t: 0.3 - 0.02,
              v: [0.03, -0.02, 0.05, -0.1, -0.12, -0.14],
            },
            {
              t: 0.6 - 0.02,
              v: [0, 0.03, 0, 0.1, 0, 0.05],
            },
          ],
        }),
        O0 = new Xs([
          H,
          {
            t: 0.05,
            ...n.grip("support"),
          },
          {
            t: 0.105,
            ...z(0.06, -0.03, -0.03, 0.03),
            pass: !0,
          },
          {
            t: 0.185,
            ...K(-0.27, -0.31, -0.07, [-0.2, -0.75, -0.6], [0.75, 0.1, -0.6]),
            pass: !0,
          },
          {
            t: 0.245,
            ...K(
              -0.26,
              -0.215,
              -0.19,
              [-0.15, -0.25, -0.95],
              [0.9, -0.3, -0.05],
            ),
            pass: !0,
          },
          {
            t: 0.3,
            ...K(-0.058, -0.105, -0.435, [0.12, 0.05, -1], [0.85, -0.52, 0.05]),
            pass: !0,
          },
          {
            t: 0.3 + 0.075,
            ...K(-0.012, -0.15, -0.5, [0.22, -0.3, -0.93], [0.55, -0.8, -0.1]),
            ease: "out",
          },
          {
            t: 0.6 - 0.14,
            ...z(0.11, -0.02, -0.03, -0.02),
            pass: !0,
          },
          {
            t: 0.6 - 0.07,
            ...z(0.05),
            pass: !0,
          },
          {
            t: 0.6,
            ...n.grip("support"),
          },
        ]),
        B0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: w,
            dur: 0.07,
            stagger: 0.01,
            from: "thumb",
          },
          {
            t: 0.07,
            pose: b,
            dur: 0.07,
          },
          {
            t: 0.155,
            pose: et.pose,
            dur: 0.06,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.3 - 0.018,
            pose: ct,
            dur: 0.055,
            stagger: 0.009,
            from: "little",
            ease: "out",
          },
          {
            t: 0.3 + 0.06,
            pose: y,
            dur: 0.08,
            stagger: 0.008,
            from: "little",
            digits: [0, 1, 2, 3],
          },
          ...T(0.6, 0.012, 0.09),
        ]),
        ot = l(
          "clip",
          c(0.68, [ye(0.03, "cloth"), ye(0.6 - 0.1, "cloth")], (Q0, nt) => {
            let L0 = C0(Q0);
            (k0(Q0, gn),
              n.gunAt(
                nt,
                0.024 * L0 + gn[0],
                -0.03 * L0 + gn[1],
                0.034 * L0 + gn[2],
                -0.075 * L0 + gn[3],
                -0.17 * L0 + gn[4],
                -0.25 * L0 + gn[5],
              ),
              n.hand("L", O0, Q0),
              n.pose("L", B0, Q0));
            let ht = s.frag,
              pt = t.clip.L;
            Q0 > 0.175 &&
              Q0 < 0.3 &&
              ((ht.visible = !0),
              ht.position.copy(et.off).applyQuaternion(pt.quat).add(pt.pos),
              ht.quaternion.copy(pt.quat).multiply(et.quat));
            let V0 = t.clip.R.pose,
              c0 = be(Q0, 0.03, 0.12, 0.6 - 0.1, 0.6 + 0.05);
            for (let Z of [6, 10, 14])
              ((V0[Z] += 1.6 * c0), (V0[Z + 1] += 1 * c0));
            V0[19] += 2 * c0;
          }),
        );
      return ((ot.releaseT = 0.3), ot);
    })(),
    u0 = gs({
      i: [-4, 4, 10, 5],
      m: [-1, 1, 13, 7],
      r: [3, -2, 17, 9],
      l: [8, -6, 22, 11],
      t: [-10, 38, -10, 4, 6],
      cup: 3,
    }),
    w0 = gs({
      i: [4, -3, 6, 3],
      m: [3, 0, 6, 3],
      r: [5, 2, 8, 4],
      l: [8, 4, 11, 6],
      t: [16, 5, -26, 10, 8],
      cup: 3,
    }),
    P0 = gs({
      i: [62, 2, 74, 40],
      m: [68, 0, 80, 44],
      r: [70, -1, 82, 46],
      l: [72, -3, 80, 44],
      t: [30, 20, -40, 24, 30],
      cup: 12,
    }),
    st = (() => {
      let B0 = [
          f0("lrx", 0.06),
          f0("lry", 0.012),
          f0("lrz", 0),
          f0("lrrx", -0.3),
          f0("lrry", 0.06),
          f0("lrrz", 0.24),
        ],
        ot = jt([
          [0.02, 0],
          [0.3, 1, "back"],
          [3.08, 1],
          [3.4 - 0.04, 0, "back"],
          [3.4, 0],
        ]),
        Q0 = Do(1, {
          n: 6,
          k: 280,
          c: 15,
          fade: 0.2,
          impulses: [
            {
              t: 0.06,
              v: [0, -0.02, 0, -0.06, 0, 0.05],
            },
            {
              t: 0.34 - 0.02,
              v: [0.02, -0.03, 0.04, -0.1, -0.08, -0.1],
            },
            {
              t: 0.66,
              v: [0, -0.01, 0.01, -0.03, -0.02, -0.03],
            },
            {
              t: 0.93 - 0.02,
              v: [0, 0.02, 0, 0.06, 0, 0.03],
            },
          ],
        }),
        nt = new Xs([
          H,
          {
            t: 0.05,
            ...n.grip("support"),
          },
          {
            t: 0.105,
            ...z(0.06, -0.03, -0.03, 0.03),
            pass: !0,
          },
          {
            t: 0.2,
            ...K(-0.27, -0.43, -0.01, [0.1, -0.9, -0.4], [0.5, 0.3, -0.8]),
            pass: !0,
          },
          {
            t: 0.27,
            ...K(-0.23, -0.4, -0.15, [0.1, -0.8, -0.6], [0.2, 0.6, -0.77]),
            pass: !0,
          },
          {
            t: 0.34,
            ...K(-0.052, -0.192, -0.455, [0.1, -0.45, -0.89], [0, 0.89, -0.45]),
            pass: !0,
          },
          {
            t: 0.34 + 0.09,
            ...K(-0.075, -0.22, -0.49, [0.5, -0.34, -0.8], [0.2, 0.9, -0.3]),
            ease: "out",
          },
          {
            t: 0.56,
            ...K(-0.185, -0.175, -0.33, [0.56, 0, -0.83], [0.8, -0.25, 0.54]),
            pass: !0,
          },
          {
            t: 0.655,
            ...K(
              -0.095,
              -0.195,
              -0.455,
              [0.52, -0.14, -0.84],
              [0.82, -0.28, 0.5],
            ),
            ease: "out",
          },
          {
            t: 0.72,
            ...K(
              -0.095,
              -0.198,
              -0.457,
              [0.52, -0.14, -0.84],
              [0.82, -0.28, 0.5],
            ),
          },
          {
            t: 0.93 - 0.13,
            ...z(0.11, -0.02, -0.03, -0.02),
            pass: !0,
          },
          {
            t: 0.93 - 0.07,
            ...z(0.05),
            pass: !0,
          },
          {
            t: 0.93,
            ...n.grip("support"),
          },
        ]),
        L0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: w,
            dur: 0.07,
            stagger: 0.01,
            from: "thumb",
          },
          {
            t: 0.07,
            pose: b,
            dur: 0.07,
          },
          {
            t: 0.16,
            pose: P0,
            dur: 0.07,
          },
          {
            t: 0.34 - 0.03,
            pose: u0,
            dur: 0.07,
            stagger: 0.01,
            from: "index",
            ease: "out",
          },
          {
            t: 0.34 + 0.045,
            pose: b,
            dur: 0.08,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.565,
            pose: w0,
            dur: 0.075,
            stagger: 0.006,
            from: "index",
          },
          {
            t: 0.7,
            pose: y,
            dur: 0.08,
            digits: [0, 1, 2, 3],
          },
          ...T(0.93, 0.012, 0.08),
        ]),
        ht = l(
          "clip",
          c(
            3.4,
            [
              ye(0.03, "cloth"),
              ye(0.93 - 0.1, "cloth"),
              ye(3.08 + 0.02, "cloth"),
            ],
            (pt, V0) => {
              let c0 = ot(pt);
              (Q0(pt, gn),
                n.gunAt(
                  V0,
                  B0[0] * c0 + gn[0],
                  B0[1] * c0 + gn[1],
                  B0[2] * c0 + gn[2],
                  B0[3] * c0 + gn[3],
                  B0[4] * c0 + gn[4],
                  B0[5] * c0 + gn[5],
                ),
                n.hand("L", nt, pt),
                n.pose("L", L0, pt));
              let Z = t.clip.R.pose,
                r0 = be(pt, 0.03, 0.14, 0.93 - 0.1, 0.93 + 0.02);
              for (let b0 of [6, 10, 14])
                ((Z[b0] += 1.6 * r0), (Z[b0 + 1] += 1 * r0));
              Z[19] += 2 * r0;
            },
          ),
        );
      return ((ht.releaseT = 0.34), (ht.holdFrom = 1), (ht.returnT = 0.32), ht);
    })();
  ((o.clips = {
    fire: t0,
    reload: S0(!1),
    reloadEmpty: S0(!0),
    draw: j0,
    holster: Z0,
    inspect: lt,
    melee: H0,
    first: Y0,
    throw: D0,
    k9: st,
  }),
    (o.resetPose = () => {
      ((i = !1), n.begin(a), t.flush(null), (r.posed = "clip"));
    }),
    (o.update = (q0, v0) => {
      (q0 > 0 && r.step(q0, v0 || a), t.update(q0, v0));
    }));
  {
    let q0 = t.snap.bind(t);
    t.snap = () => {
      (q0(), r.snap());
    };
  }
  let J0 = 0.052;
  ((o.spawnMag = () => {
    let q0 = s.mag,
      v0 = new Group();
    return (
      (v0.name = "magProp"),
      q0.traverse((x0) => {
        if (x0.isMesh && x0.parent.visible) {
          let C0 = new Mesh(x0.geometry, x0.material);
          ((C0.renderOrder = x0.renderOrder),
            (C0.position.y = -J0),
            v0.add(C0));
        }
      }),
      v0.quaternion.copy(q0.quaternion),
      v0.position.set(0, J0, 0).applyQuaternion(q0.quaternion).add(q0.position),
      (i = !0),
      v0
    );
  }),
    (o.showGrip = (q0) => {
      o.resetPose();
      let v0 = e[q0],
        x0 = t.clip[v0.side];
      (x0.pos.copy(v0.pos),
        x0.quat.copy(v0.quat),
        x0.pose.set(v0.pose),
        t.flush(null));
    }),
    o.resetPose());
}
var Ce = Ms;
var ie = (o) => o / 1e3;
var Rh = (o) => o.map((t) => [t[0] / 1e3, t[1] / 1e3]);
var VJ = {
  camo: "factory",
  optic: "reflex",
  muzzle: "none",
  underbarrel: "none",
  magazine: "std",
  stock: "std",
};
var ST = {
  reflex: 8,
  holo: 7,
  prism: 6,
};
var SO = {
  reflex: 0.062,
  holo: 0.076,
  prism: 0.05,
  irons: 0.052,
};
var zy = {
  vgrip: 292,
  angled: 286,
  laser: 385,
};
var _O = (o) => {
  let t = {
    ...VJ,
    ...(o || {}),
  };
  return (
    _h[t.magazine] || (t.magazine = "std"),
    jA[t.stock] || (t.stock = "std"),
    ST[t.optic] || (t.optic = t.optic === "irons" ? "irons" : "reflex"),
    zy[t.underbarrel] || (t.underbarrel = "none"),
    ["suppressor", "comp", "brake"].includes(t.muzzle) || (t.muzzle = "none"),
    t
  );
};
var yO = new Map();
function o1(o, t, e = !1, s = null) {
  let n = (e ? "L:" : "H:") + o,
    i = yO.get(n);
  if (!i) {
    Sy(e);
    try {
      let a = bA();
      (t(a), (i = a.finish()));
    } finally {
      Sy(!1);
    }
    if (s)
      for (let a of ["metal", "poly", "furn", "hard", "mark"])
        i[a] && i[a].translate(-s.x, -s.y, -s.z);
    for (let a of ["metal", "poly", "furn", "hard", "mark"])
      i[a] && (i[a].computeBoundingBox(), i[a].computeBoundingSphere());
    yO.set(n, i);
  }
  return i;
}
var vO = new Map();
function GJ(o, t) {
  let e = o.muzzle === "none",
    s = `${e ? 1 : 0}|${o.stock}|${t ? 1 : 0}`,
    n = vO.get(s);
  if (!n) {
    n = yA([
      o1("upper", IA),
      o1("lower", NA),
      o1("grip", WA),
      o1("barrel" + (e ? ":fh" : ""), (i) => qA(i, e)),
      o1("handguard", XA),
      o1("tube", YA),
      o1("stock:" + o.stock, (i) => $A(i, o.stock)),
      o1("buisRB", (i) => MT(i, !1, "base")),
      o1("buisFB", (i) => wT(i, !1, "base")),
    ]);
    for (let i of ["metal", "poly", "furn", "hard", "mark"])
      n[i] && (n[i].computeBoundingBox(), n[i].computeBoundingSphere());
    vO.set(s, n);
  }
  return n;
}
var RO = !1;
function ky(o, t, e, s = !1) {
  let n = RO ? P4().studio : P4(),
    i = [],
    a = (l, c, h) => {
      if (!l) return;
      let f = new Mesh(l, c);
      return (
        (f.name = h),
        (f.castShadow = f.receiveShadow = s),
        o.add(f),
        i.push(f),
        f
      );
    };
  (a(t.metal, xl(e, "metal") || n.metal, "metal"),
    a(t.poly, xl(e, "polymer") || n.poly, "poly"),
    a(t.furn, xl(e, "furniture") || n.furn, "furn"),
    a(t.hard, n.hard, "hardware"));
  let r = a(t.mark, n.mark, "marks");
  return (r && ((r.renderOrder = 1), (r.castShadow = !1)), i);
}
var WJ = (o) => {
  let t = 0;
  return (
    o.traverse((e) => {
      e.isMesh &&
        !e.isSkinnedMesh &&
        (t +=
          (e.geometry.index
            ? e.geometry.index.count
            : e.geometry.attributes.position.count) / 3);
    }),
    Math.round(t)
  );
};
var Cy = {
  bolt: Gt(0, ie(Ce.B), 0.094),
  chargingHandle: Gt(0, 0.062, -0.045),
  selector: Gt(0, ie(qn.selector[1]), ie(qn.selector[0])),
  boltCatch: Gt(-0.0172, ie(qn.catchPivot[1]), ie(qn.catchPivot[0])),
  magRelease: Gt(ie(qn.housingHW), ie(qn.magRel[1]), ie(qn.magRel[0])),
  trigger: Gt(0, ie(qn.trigPivot[1]), ie(qn.trigPivot[0])),
  mag: Gt(0, -0.04, 0.122),
  chLatch: Gt(ie(ma.hinge[0]), ie(ma.hinge[1]), ie(ma.hinge[2])),
  dustCover: Gt(ie(Tp.x), ie(Tp.y), ie(Tp.u)),
  slingLoop: Gt(ie(Sh.x), ie(Sh.y), ie(Sh.u)),
  buisRearArm: Gt(0, ie(Ce.RT + vl.hingeY), ie(vl.rearU - 13)),
  buisFrontArm: Gt(0, ie(Ce.RT + vl.hingeY), ie(vl.frontU + 13)),
};
function AO(o) {
  let t = {
    ironsUp: o.optic === "irons",
  };
  return (
    (t.muzzleP = Gt(0, ie(Ce.B), ie(Ce.CROWN))),
    (t.underP =
      o.underbarrel !== "none"
        ? Gt(0, ie(Ce.B - Ce.HGW), ie(zy[o.underbarrel]))
        : Gt(0, ie(Ce.B - Ce.HGW), 0.3)),
    (t.opticP = Gt(0, ie(Ce.RT), ie(P5(ST[o.optic] || 8)))),
    (t.adsDist = SO[o.optic] || 0.07),
    t
  );
}
function buildCarbine(o = {}) {
  if (o.detail === "world") return JJ(o);
  let t = _O(o.build),
    e = AO(t),
    s = new Group(),
    n = {};
  ((s.name = "gun_ar"), (RO = o.portal === !1));
  let i = performance.now();
  ky(s, GJ(t, e.ironsUp), t.camo);
  let a = (m, p, x, g = s, b = null) => {
      let v = Cy[m],
        y = new Group();
      return (
        (y.name = m),
        (y.userData.keep = !0),
        y.position.copy(v),
        b && y.position.sub(b),
        (y.userData.rest = y.position.clone()),
        g.add(y),
        (n[m] = y),
        ky(y, o1(p, x, !1, v), t.camo),
        y
      );
    },
    r = a("bolt", "bolt", eO);
  {
    let m = new Group();
    ((m.name = "chamberRound"),
      (m.userData.keep = !0),
      (m.userData.hidden = !0),
      (m.visible = !1),
      (m.userData.rest = new Vector3()),
      r.add(m),
      (n.chamberRound = m),
      ky(m, o1("chamberRound", sO, !1, Cy.bolt), t.camo));
  }
  let l = a("chargingHandle", "ch", FA);
  (a("chLatch", "chLatch", OA, l, Cy.chargingHandle),
    a("selector", "selector", BA),
    a("boltCatch", "boltCatch", UA),
    a("magRelease", "magRelease", VA),
    a("trigger", "trigger", GA),
    a("dustCover", "dustCover", HA),
    a("slingLoop", "slingLoop", oO),
    a("buisRearArm", "buisRA:" + e.ironsUp, (m) => MT(m, e.ironsUp, "arm")),
    a("buisFrontArm", "buisFA:" + e.ironsUp, (m) => wT(m, e.ironsUp, "arm")));
  let c = a("mag", "mag:" + t.magazine, (m) => ZA(m, t.magazine));
  {
    let m = new Group();
    ((m.name = "magRounds"),
      (m.userData.keep = !0),
      (m.userData.rest = new Vector3()),
      c.add(m),
      (n.magRounds = m),
      ky(m, o1("magRounds", aO, !1, Cy.mag), t.camo));
  }
  for (let m of ["full", "part", "empty"]) {
    let p = "magFill" + m[0].toUpperCase() + m.slice(1),
      x = new Group();
    ((x.name = p),
      (x.userData.keep = !0),
      (x.userData.rest = new Vector3()),
      m !== "full" && ((x.userData.hidden = !0), (x.visible = !1)),
      c.add(x),
      (n[p] = x),
      ky(
        x,
        o1(
          `magFill:${t.magazine}:${m}`,
          (g) => rO(g, t.magazine, m),
          !1,
          Cy.mag,
        ),
        t.camo,
      ));
  }
  let h = {},
    f = {};
  for (let [m, p] of [
    ["optic", e.opticP],
    ["muzzle", e.muzzleP],
    ["underbarrel", e.underP],
  ]) {
    let x = new Object3D();
    ((x.name = "mount_" + m),
      x.position.copy(p),
      (x.userData.keep = !0),
      s.add(x),
      (h[m] = x));
  }
  (t.optic !== "irons" &&
    ((f.optic = Mp(t.optic, {
      portal: o.portal !== !1,
    })),
    h.optic.add(f.optic.group)),
    t.muzzle !== "none" &&
      ((f.muzzle = gf(t.muzzle, {
        caliber: "rifle",
      })),
      h.muzzle.add(f.muzzle.group)),
    t.underbarrel !== "none" &&
      ((f.underbarrel = wp(t.underbarrel, {
        mount: "mlok",
      })),
      h.underbarrel.add(f.underbarrel.group)));
  for (let m in f) Ou(f[m], t.camo);
  let u = f.optic
      ? e.opticP.clone().add(f.optic.eye)
      : Gt(0, ie(Ce.RT + Ce.SIGHT), ie(vl.rearU - 13) - SO.irons),
    d = {
      id: "ar",
      root: s,
      parts: n,
      build: t,
      mounts: h,
      attachments: f,
      anchors: {
        muzzle: f.muzzle
          ? e.muzzleP.clone().add(Bt(0, 0, -f.muzzle.length))
          : Gt(0, ie(Ce.B), ie(Ce.CROWN + Ce.FH)),
        eject: Gt(0.019, 0.049, 0.096),
        ejectDir: Bt(0.86, 0.36, 0.36).normalize(),
        sight: u.clone().add(Bt(0, 0, -e.adsDist)),
        eye: u,
        gripR: new Object3D(),
        gripL: new Object3D(),
      },
      hip: {
        pos: Bt(0.112, -0.152, -0.275),
        rot: new Euler(0.03, 0.07, 0),
      },
      adsDist: e.adsDist,
      zoomHint: f.optic ? f.optic.zoomHint : 1,
    };
  (f.underbarrel &&
    f.underbarrel.laser &&
    (d.anchors.laser = e.underP.clone().add(f.underbarrel.laser)),
    (d.anchors.gripR.name = "gripR"),
    (d.anchors.gripL.name = "gripL"),
    s.add(d.anchors.gripR, d.anchors.gripL));
  {
    let m = f.muzzle
        ? f.muzzle.group.children.find((g) => g.name === "body")
        : null,
      p = f.muzzle ? f.muzzle.length : ie(Ce.FH),
      x = new Mesh(
        m ? m.geometry : o1("fh", KA).hard,
        qJ(f.muzzle ? 0 : -ie(Ce.CROWN), p),
      );
    ((x.name = "heat"),
      (x.visible = !1),
      (x.renderOrder = 3),
      (x.userData.keep = !0),
      (f.muzzle ? h.muzzle : s).add(x),
      (d.heat = x));
  }
  return (
    (d.magLen = vT(t.magazine).len / 1e3),
    (d.proxies = XJ(t, e, f)),
    (d.tris = WJ(s)),
    (d.arms = new hf(d, KJ)),
    (d.hands = {
      right: d.arms.R.root,
      left: d.arms.L.root,
    }),
    YJ(d),
    bO(d),
    (d.buildMs = performance.now() - i),
    d
  );
}
function qJ(o, t) {
  return new ShaderMaterial({
    transparent: !0,
    depthWrite: !1,
    blending: AdditiveBlending,
    polygonOffset: !0,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
    fog: !1,
    uniforms: {
      uHeat: {
        value: 0,
      },
      uZ: {
        value: new Vector2(o, t),
      },
    },
    vertexShader:
      "uniform vec2 uZ; varying float vK; varying vec3 vN; varying vec3 vV; void main(){ vK = clamp((uZ.x - position.z) / uZ.y, 0.0, 1.0); vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalMatrix * normal; vV = -mv.xyz; gl_Position = projectionMatrix * mv; }",
    fragmentShader:
      "uniform float uHeat; varying float vK; varying vec3 vN; varying vec3 vV; void main(){ float f = 0.5 + 0.5 * abs(dot(normalize(vN), normalize(vV))); float k = smoothstep(0.1, 1.0, vK); vec3 c = mix(vec3(0.85, 0.05, 0.01), vec3(2.4, 0.62, 0.1), k * uHeat) * uHeat * (0.16 + 0.84 * k) * f; gl_FragColor = vec4(c, 1.0); }",
  });
}
var KJ = {
  shoulderL: new Vector3(-0.54, -0.32, -0.08),
};
function XJ(o, t, e) {
  let s = {},
    n = qn,
    i = ie(Ce.B);
  ((s.grip = JF),
    (s.lower = ds(
      Zs(Rh(AA), ie(n.housingHW * 2), {
        r: 9e-4,
      }),
      Zs(Rh(kA), ie(n.deckHW * 2), {
        r: 7e-4,
      }),
      Zs(Rh(bT), ie(n.wellHW * 2), {
        r: 6e-4,
      }),
      Zn(
        [0, -0.0405, -0.123],
        [0.017, 0.004, 0.0395],
        0.002,
        new Quaternion().setFromEuler(new Euler(-0.11, 0, 0)),
      ),
    )),
    (s.upper = ds(
      Iu(Rh(_A), -0.034, 0.16, {
        r: 4e-4,
      }),
      Zn([0, 0.0442, -0.063], [0.0172, 0.0142, 0.093], 5e-4),
      Zn([0.0198, 0.049, -0.047], [0.0033, 0.009, 0.011], 0.001),
      Zn([0.0192, 0.028, -0.094], [0.001, 0.009, 0.036], 5e-4),
    )),
    (s.fence = ds(
      ml(
        [ie(n.housingHW), ie(n.magRel[1]), -ie(n.magRel[0])],
        [ie(n.housingHW + 2.6), ie(n.magRel[1]), -ie(n.magRel[0])],
        0.0076,
        6e-4,
      ),
      ml(
        [ie(n.housingHW), ie(n.magRel[1]), -ie(n.magRel[0])],
        [ie(n.magRelX + 0.4), ie(n.magRel[1]), -ie(n.magRel[0])],
        0.0045,
        5e-4,
      ),
    )),
    (s.tguard = Zs(Rh(Eh(CA, 3.2)), 0.015, {
      r: 9e-4,
    })),
    (s.trigger = Zs(Rh(Eh(PA, 4.2)), 0.0066, {
      r: 0.0013,
    })));
  {
    let m = DA(o.magazine);
    s.mag = ds(
      Zs(Rh(zA(o.magazine)), 0.0224, {
        r: 0.002,
      }),
      Zs(Rh(LA(o.magazine)), o.magazine === "fast" ? 0.029 : 0.0264, {
        r: 0.0013,
      }),
      Zs(Rh(m.front), ie(m.fw), {
        r: 8e-4,
      }),
      Zs(Rh(m.rear), ie(m.rw), {
        r: 7e-4,
      }),
    );
  }
  let a = [
    Iu(Rh(RA), ie(Ce.HG0), ie(Ce.HG1), {
      y: i,
      r: 6e-4,
    }),
    Zn(
      [0, ie(Ce.RT - 5.5), -ie((Ce.HG0 + Ce.HG1) / 2)],
      [0.0104, 0.0055, ie((Ce.HG1 - Ce.HG0) / 2)],
      6e-4,
    ),
    Zn([0, i - 0.0235, -ie(Ce.HG0 + 10.5)], [0.0085, 0.004, 0.0105], 0.001),
  ];
  if (e.underbarrel) {
    let m = e.underbarrel,
      p = t.underP;
    ((s.under = m.grip
      ? sT(m.grip, p.x, p.y, p.z)
      : Zn([p.x, p.y - m.drop / 2, p.z], [0.022, m.drop / 2, 0.04], 0.002)),
      a.push(s.under));
  }
  s.handguard = ds(a);
  let r = e.muzzle ? Ce.CROWN + e.muzzle.length * 1e3 : Ce.CROWN + Ce.FH,
    l = e.muzzle ? e.muzzle.radius : 0.0108;
  ((s.barrel = ds(
    b2([0, i, -0.43], [0, i, -ie(Ce.CROWN)], 0.0098),
    ml([0, i, -ie(Ce.CROWN)], [0, i, -ie(r)], l, 0.001),
  )),
    (s.tube = ml([0, i, 0.034], [0, i, 0.232], 0.0196, 0.002)),
    (s.stock = Zs(Rh(jA[o.stock]), o.stock === "light" ? 0.038 : 0.042, {
      r: 0.004,
    })),
    (s.rail = Zn([0, ie(Ce.RT - 5), -0.0733], [0.0104, 0.005, 0.0848], 6e-4)));
  let c = (m, p, x, g, b, v) =>
      Zn(
        [0, ie(Ce.RT) + (x + g) / 2, -(m + (v - b) / 2)],
        [p, (g - x) / 2, (v + b) / 2],
        0.003,
      ),
    h = ie(P5(ST[o.optic] || 8)),
    f = t.ironsUp,
    u = f ? ie(Ce.SIGHT + 7) : 0.011,
    d =
      o.optic === "reflex"
        ? c(h, 0.023, -0.0054, 0.055, 0.029, 0.029)
        : o.optic === "holo"
          ? c(h, 0.027, -0.0054, 0.058, 0.043, 0.046)
          : o.optic === "prism"
            ? c(h, 0.03, -0.0054, 0.0705, 0.0746, 0.054)
            : null;
  return (
    (s.sight = ds(
      d,
      c(ie(vl.rearU), 0.0142, -0.005, u, 0.017, f ? 0.017 : 0.024),
      c(ie(vl.frontU), 0.0142, -0.005, u, f ? 0.017 : 0.024, 0.017),
    )),
    (s.catch = Zn(
      [ie(n.catchX) + 0.0016, 0.041, -0.108],
      [0.0021, 0.0105, 0.0092],
      0.001,
    )),
    (s.chHandle = Zn(
      [0, ie(ma.y0 + ma.h / 2), -ie((ma.u0 + ma.u1) / 2)],
      [ie(ma.hw + 2), ie(ma.h / 2), ie((ma.u1 - ma.u0) / 2)],
      0.001,
    )),
    (s.selector = Zn(
      [
        -ie((n.housingHW + n.selX + 0.6) / 2),
        ie(n.selector[1]),
        -ie(n.selector[0] - 9),
      ],
      [ie((n.selX + 0.6 - n.housingHW) / 2), 0.0034, 0.0125],
      0.001,
    )),
    (s.tower = ml([0, i, 0.034], [0, i, 0.048], 0.0178, 0.001)),
    (s.body = ds(
      s.grip,
      s.lower,
      s.upper,
      s.fence,
      s.tguard,
      s.tube,
      s.tower,
      s.stock,
      s.rail,
      s.sight,
      s.catch,
      s.chHandle,
      s.selector,
    )),
    (s.all = ds(s.body, s.trigger, s.mag, s.handguard, s.barrel)),
    s
  );
}
var MO = new Map();
function YJ(o) {
  let t = o.proxies,
    e = o.build,
    s = qn,
    n = performance.now(),
    i = globalThis.GH_TUNE || {},
    a = (f, u) => i[f] ?? u,
    r = (o.grips = {}),
    l = (o.bakeTimes = {}),
    c = (f, u, d) => {
      let m = !globalThis.GH_TUNE && MO.get(f),
        p = performance.now();
      if (m) {
        for (let g of u) {
          let b = m[g];
          r[g] = {
            ...b,
            pos: b.pos.clone(),
            quat: b.quat.clone(),
            pose: new Float32Array(b.pose),
          };
        }
        return;
      }
      d();
      let x = {};
      for (let g of u) {
        let b = r[g],
          v = b.side === "R" ? 1 : -1;
        ((b.pen = yi(v, b.pos, b.quat, b.pose, b.sd)),
          (b.gaps = Tc(v, b.pos, b.quat, b.pose, b.sd)),
          (x[g] = b));
      }
      (MO.set(f, x), (l[f] = Math.round(performance.now() - p)));
    },
    h = (f, u, d, m, p, x = {}) =>
      (r[f] = {
        name: f,
        side: u,
        pos: d.pos,
        quat: d.quat,
        pose: m,
        sd: p,
        ...x,
      });
  (c("R", ["fire", "trigger", "press", "magRel", "thumbSel"], () => {
    let { fr: f, a: u, sd: d } = ZJ(t, a);
    ((u[16] = 32),
      (u[17] = 38),
      (u[18] = -90),
      (u[19] = 30),
      (u[20] = 12),
      Mn(
        1,
        f.pos,
        f.quat,
        u,
        4,
        Gt(-ie(s.housingHW) - 0.0036, a("ty", -0.003), a("tu", 0.026)),
        d,
        {
          normal: Bt(1, 0, 0),
          lim: {
            16: [0, 60],
            17: [0, 58],
            18: [-115, -50],
            19: [0, 60],
            20: [0, 45],
          },
        },
      ),
      (u[0] = 4),
      (u[1] = 12),
      (u[2] = 6),
      (u[3] = 3),
      Mn(
        1,
        f.pos,
        f.quat,
        u,
        0,
        Gt(ie(s.housingHW) + 0.0028, -0.0055, 0.074),
        d,
        {
          normal: Bt(-1, 0, 0),
          skin: 3e-4,
          normalW: 0.004,
        },
      ),
      h("fire", "R", f, u, d));
    let m = new Float32Array(u);
    ((m[0] = 30),
      (m[1] = 0),
      (m[2] = 60),
      (m[3] = 30),
      Mn(1, f.pos, f.quat, m, 0, Gt(5e-4, -0.0215, 0.0606), d),
      h("trigger", "R", f, m, d));
    let p = ds(t.grip, t.lower, t.upper, t.fence, t.tguard, t.mag),
      x = new Float32Array(m);
    (Mn(1, f.pos, f.quat, x, 0, Gt(5e-4, -0.0215, 0.057), p),
      h("press", "R", f, x, p));
    let g = new Float32Array(u);
    ((g[0] = 6),
      (g[1] = 14),
      (g[2] = 30),
      (g[3] = 14),
      Mn(
        1,
        f.pos,
        f.quat,
        g,
        0,
        Gt(
          ie(s.magRelX) + 0.0012,
          ie(s.magRel[1]) - 0.001,
          ie(s.magRel[0]) - 0.001,
        ),
        d,
        {
          pad: [0, 0.0205, 0.0045],
          skin: 3e-4,
          free: [0, 1, 2, 3],
          lim: {
            0: [-20, 40],
            1: [-15, 24],
            2: [0, 70],
            3: [0, 50],
          },
        },
      ),
      h("magRel", "R", f, g, d));
    let b = new Float32Array(u),
      v = Mn(
        1,
        f.pos,
        f.quat,
        b,
        4,
        Gt(
          -ie(s.selX) - a("tsx", 6e-4),
          ie(s.selector[1]) + a("tsy", 8e-4),
          ie(s.selector[0]) - a("tsu", 0.006),
        ),
        d,
        {
          normal: Bt(1, 0, 0),
          lim: {
            16: [0, 60],
            17: [0, 58],
            18: [-115, -40],
            19: [0, 65],
            20: [0, 60],
          },
        },
      );
    h("thumbSel", "R", f, b, d, {
      miss: v,
    });
  }),
    c("support:" + e.underbarrel, ["support"], () => {
      let f = o.attachments.underbarrel,
        u = ds(t.handguard, t.barrel, t.lower, t.upper);
      if (f && f.grip && f.grip.hold) {
        let T = f.grip.hold,
          S = o.mounts.underbarrel.position,
          E = Bt(T.at[0], T.at[1], T.at[2]).add(S),
          _ = Bt(T.fingers[0], T.fingers[1], T.fingers[2]).normalize(),
          R = Bt(T.palm[0], T.palm[1], T.palm[2]).normalize(),
          C = Yo(-1, E, _, R, [0.004, a("sp", 0.058), 0.0125]),
          L = gs(
            {
              t: [-18, 40, -60, 0, 0],
              cup: 6,
            },
            pn.pre,
          );
        zi(-1, C.pos, C.quat, L, u, R, {
          max: 0.025,
        });
        let A = yo(-1, C.pos, C.quat, L, u, {
          fingers: [0, 1, 2, 3],
        });
        (e.underbarrel === "vgrip"
          ? TO(-1, C, A, u, Bt(0.75, -0.45, 0.5).normalize(), [30, 50, 70])
          : TO(-1, C, A, u, Bt(0.1, 0.25, -0.96).normalize()),
          h(
            "support",
            "L",
            C,
            A,
            u,
            e.underbarrel === "vgrip"
              ? {
                  n: Bt(0, 1, -0.035).normalize(),
                  nk: 1.9,
                }
              : {
                  n: R,
                },
          ));
        return;
      }
      let d = Ze(a("sb", 64)),
        m = Ze(a("sg", 16)),
        p = Bt(Math.cos(d), Math.sin(d), 0),
        g = Bt(Math.sin(d), -Math.cos(d), 0)
          .clone()
          .multiplyScalar(Math.cos(m))
          .add(Bt(0, 0, -Math.sin(m))),
        b = a("su", 0.262),
        v = Gt(-p.x * ie(Ce.HGW), ie(Ce.B) - p.y * ie(Ce.HGW), b),
        y = Yo(-1, v, g, p, [0.004, a("sp", 0.052), 0.0125]),
        M = gs(
          {
            t: [-22, 18, 0, 6, 0],
            cup: a("scup", 8),
          },
          pn.pre,
        );
      zi(-1, y.pos, y.quat, M, u, p, {
        max: 0.03,
      });
      let w = yo(-1, y.pos, y.quat, M, u, {
        fingers: [0, 1, 2, 3],
      });
      ((w[16] = 0),
        (w[17] = 20),
        (w[18] = -50),
        (w[19] = 8),
        (w[20] = 5),
        Mn(
          -1,
          y.pos,
          y.quat,
          w,
          4,
          Gt(a("stx", -0.015), ie(Ce.B) + a("sty", 0.015), b + a("stu", 0.078)),
          u,
          {
            normal: Bt(0.6, -0.8, 0),
            lim: {
              16: [-25, 40],
              17: [-10, 50],
              18: [-115, 20],
              19: [0, 40],
              20: [-5, 40],
            },
          },
        ),
        h("support", "L", y, w, u, {
          n: p,
        }));
    }),
    c("mag:" + e.magazine, ["mag"], () => {
      let f = vT(e.magazine),
        u = f.len - a("mh", 56),
        d = u / yf,
        m = Ze(a("ma", 36)),
        p = Bt(0, Math.cos(d), Math.sin(d)),
        x = Bt(0, Math.sin(d), -Math.cos(d)),
        g = yT(u, er + 2.2),
        b = Bt(1, 0, 0)
          .multiplyScalar(Math.cos(m))
          .addScaledVector(p, Math.sin(m)),
        v = x.clone().negate(),
        y = Yo(-1, Gt(a("mx", 0.001), ie(g[1]), ie(g[0])), b, v, [
          a("mpx", 0.006),
          a("mp", 0.06),
          0.0125,
        ]),
        M = ds(t.mag, t.lower, t.tguard),
        w = gs(
          {
            t: [-16, 48, -60, 0, 0],
            cup: 4,
          },
          pn.pre,
        );
      zi(-1, y.pos, y.quat, w, M, v, {
        max: 0.02,
        bones: [0, 1],
      });
      let T = yo(-1, y.pos, y.quat, w, M, {
        fingers: [0, 1, 2, 3],
        curl: 70,
      });
      (ik(-1, y, T, M),
        (T[16] = 20),
        (T[17] = 40),
        (T[18] = -80),
        (T[19] = 20),
        (T[20] = 15));
      let S = yT(u + a("mts", -16), er - a("mto", 27)),
        E = Mn(
          -1,
          y.pos,
          y.quat,
          T,
          4,
          Gt(-0.0112 - 0.0012, ie(S[1]), ie(S[0])),
          M,
          {
            normal: Bt(1, 0, 0),
            normalW: 0.02,
            lim: {
              16: [-10, 60],
              17: [5, 60],
              18: [-115, -30],
              19: [0, 60],
              20: [0, 60],
            },
          },
        );
      h("mag", "L", y, T, M, {
        part: "mag",
        miss: E,
      });
    }),
    c("push:" + e.magazine, ["magPush"], () => {
      let f = vT(e.magazine),
        u = Bt(0, -f.down[1], f.down[0]).normalize(),
        d = Bt(0, u.z, -u.y),
        m = Ze(a("pphi", 30)),
        p = d
          .clone()
          .multiplyScalar(Math.cos(m))
          .addScaledVector(Bt(1, 0, 0), Math.sin(m)),
        x = Yo(-1, Gt(0, ie(f.p[1]), ie(f.p[0])), p, u, [
          a("ppx", 0.003),
          a("ppy", 0.04),
          0.0125,
        ]),
        g = ds(t.mag, t.lower, t.tguard),
        b = gs({
          i: [6, 5, 8, 4],
          m: [8, 0, 8, 4],
          r: [10, -2, 10, 5],
          l: [12, -6, 12, 6],
          t: [-16, 46, -55, 0, 0],
          cup: 10,
        });
      zi(-1, x.pos, x.quat, b, g, u, {
        max: 0.03,
        bones: [0, 1],
      });
      for (let w = 0; w < 6; w++) {
        let T = yi(-1, x.pos, x.quat, b, g, [0, 1, 14]).depth;
        if (T < 4e-4) break;
        x.pos.addScaledVector(u, -(T - 2e-4));
      }
      let v = yo(-1, x.pos, x.quat, b, g, {
        fingers: [0, 1, 2, 3],
        curl: a("pcurl", 58),
        max: {
          mcp: a("pmcp", 56),
          pip: 76,
        },
      });
      for (let w = 0; w < 4; w++) {
        let T = w * 4,
          S = [-7, 0, 5, 9][w];
        v[T] > 40 &&
          ((v[T] += S), (v[T + 2] += S * 1.3), (v[T + 3] += S * 0.7));
      }
      (ik(-1, x, v, g),
        (v[16] = 10),
        (v[17] = 40),
        (v[18] = -70),
        (v[19] = 15),
        (v[20] = 10));
      let y = yT(f.len - a("pts", 46), a("pto", -6)),
        M = Mn(
          -1,
          x.pos,
          x.quat,
          v,
          4,
          Gt(-0.0112 - 0.0012, ie(y[1]), ie(y[0])),
          g,
          {
            normal: Bt(1, 0, 0),
            normalW: 0.02,
            lim: {
              16: [-20, 60],
              17: [5, 60],
              18: [-115, -20],
              19: [0, 60],
              20: [0, 60],
            },
          },
        );
      h("magPush", "L", x, v, g, {
        part: "mag",
        miss: M,
      });
    }),
    c("catch:" + e.magazine, ["catch"], () => {
      let f = Bt(a("cfx", 0.05), a("cfy", 0.36), -1).normalize(),
        u = Bt(1, 0, 0),
        d = ds(
          t.grip,
          t.lower,
          t.upper,
          t.fence,
          t.tguard,
          t.catch,
          t.mag,
          t.handguard,
          t.barrel,
        ),
        m = Yo(
          -1,
          Gt(-ie(s.wellHW) - a("cgap", 0.012), a("cy", -0.052), a("cu", 0.134)),
          f,
          u,
          [0, 0.06, 0.0125],
        ),
        p = gs({
          i: [8, 4, 10, 5],
          m: [10, 0, 12, 6],
          r: [12, -2, 14, 7],
          l: [14, -6, 16, 8],
          t: [-14, 14, 0, 4, 0],
          cup: 8,
        }),
        x = {
          16: [-30, 30],
          17: [-6, 40],
          18: [-60, 30],
          19: [a("ctm", 10), 50],
          20: [a("cti", 14), 60],
        },
        g = Gt(ie(s.catchX) - 6e-4, a("cty", 0.04), 0.109),
        b = new Float32Array(p),
        v = 0;
      for (let w = 0; w < 4; w++) {
        ((b[16] = -15),
          (b[17] = 10),
          (b[18] = -10),
          (b[19] = 10),
          (b[20] = 10),
          (v = Mn(-1, m.pos, m.quat, b, 4, g, d, {
            normal: Bt(1, 0, 0),
            lim: x,
          })));
        let T = yi(-1, m.pos, m.quat, b, d, [0, 1, 14, 15, 16]).depth;
        if (T < 4e-4) break;
        m.pos.x -= T - 2e-4;
      }
      let y = b.slice(16, 21),
        M = yo(-1, m.pos, m.quat, p, d, {
          fingers: [0, 1, 2, 3],
          curl: a("ccurl", 62),
          max: {
            mcp: a("cmcp", 60),
            pip: 80,
          },
        });
      (ik(-1, m, M, d),
        b.set(M),
        b.set(y, 16),
        h("catch", "L", m, b, d, {
          miss: v,
        }));
    }),
    c("ch", ["ch"], () => {
      let f = Bt(1, 0.12, 0.1).normalize(),
        u = Bt(0, -0.25, 1).normalize(),
        d = ds(
          t.grip,
          t.lower,
          t.upper,
          t.tube,
          t.tower,
          t.stock,
          t.rail,
          t.sight,
          t.chHandle,
          t.mag,
        ),
        m = Yo(
          -1,
          Gt(a("hx", -0.125), a("hy", 0.036), a("hu", -0.047)),
          f,
          u,
          [0, 0.06, 0.0125],
        ),
        p = gs({
          i: [20, 0, 30, 15],
          m: [55, 0, 70, 35],
          r: [62, 0, 78, 40],
          l: [66, -2, 80, 40],
          t: [12, 4, -30, 12, 10],
          cup: 8,
        }),
        x = ie(ma.y0 + ma.h / 2),
        g = ie(ma.u1) + 4e-4;
      (Mn(-1, m.pos, m.quat, p, 0, Gt(-0.0205, x + 0.002, g), d, {
        normal: Bt(0, 0, 1),
        skin: 4e-4,
      }),
        Mn(-1, m.pos, m.quat, p, 1, Gt(-0.0235, x - 0.0034, g), d, {
          normal: Bt(0, 0, 1),
          skin: 4e-4,
        }),
        (p[16] = 12),
        (p[17] = 4),
        (p[18] = -30),
        (p[19] = 12),
        (p[20] = 10),
        h("ch", "L", m, p, d, {
          part: "chargingHandle",
        }));
    }),
    (o.bakeMs = performance.now() - n));
}
function ik(o, t, e, s, n = 25e-5) {
  for (let i = 0; i < 4; i++) {
    let a = i * 4,
      r = [2 + 3 * i, 3 + 3 * i, 4 + 3 * i];
    for (let l = 0; l < 40 && yi(o, t.pos, t.quat, e, s, r).depth > n; l++)
      e[a + 2] > 6 && l & 1
        ? (e[a + 2] -= 1)
        : e[a] > -8
          ? (e[a] -= 1)
          : (e[a + 2] -= 1);
  }
  return e;
}
var wO = new Vector3();
var EO = new Vector3();
var jJ = new Vector3();
var $J = new Vector3(0, 0.03, 0);
function TO(o, t, e, s, n, i = [6, 26, 46]) {
  let a = null;
  for (let r of [-20, -5, 10, 25, 40])
    for (let l of [5, 18, 31, 44, 57])
      for (let c of [-105, -80, -55, -30, -5])
        for (let h of i) {
          if (
            ((e[16] = r),
            (e[17] = l),
            (e[18] = c),
            (e[19] = h),
            (e[20] = h * 0.8),
            yi(o, t.pos, t.quat, e, s, [14, 15, 16]).depth > 6e-4)
          )
            continue;
          let u = Tc(o, t.pos, t.quat, e, s)[4];
          (E5(o, t.pos, t.quat, e, 16, jJ, wO),
            E5(o, t.pos, t.quat, e, 16, $J, EO));
          let d =
            Math.abs(u - 0.001) + 0.012 * (1 - EO.sub(wO).normalize().dot(n));
          (!a || d < a.cost) &&
            (a = {
              cost: d,
              v: [r, l, c, h, h * 0.8],
            });
        }
  a ||
    (a = {
      v: [-10, 40, -30, 6, 6],
    });
  for (let r = 0; r < 5; r++) e[16 + r] = a.v[r];
}
function ZJ(o, t) {
  let e = Bt(0, -0.33, -0.944).normalize(),
    s = Bt(-1, 0, 0),
    n = Ze(t("fpsi", 12)),
    i = e.clone().multiplyScalar(Math.cos(n)).addScaledVector(s, -Math.sin(n)),
    a = s.clone().multiplyScalar(Math.cos(n)).addScaledVector(e, Math.sin(n)),
    r = Yo(
      1,
      Gt(t("fx", 0.0125), t("fy", -0.027), t("fu", 0)),
      i,
      a,
      [0.0065, 0.086, 0.0125],
      t("froll", 0),
    ),
    l = ds(
      o.grip,
      o.lower,
      o.upper,
      o.fence,
      o.tguard,
      o.tower,
      o.catch,
      o.selector,
      o.trigger,
      o.mag,
    ),
    c = gs(
      {
        i: [-6, 13, 4, 2],
        t: [t("pt0", -20), t("pt1", 30), 0, 0, 0],
        cup: t("fcup", 0),
      },
      pn.pre,
    ),
    h = ds(
      o.grip,
      o.lower,
      o.upper,
      o.fence,
      o.tower,
      o.catch,
      o.selector,
      o.trigger,
      o.mag,
    ),
    f = t("fseat", 0),
    u = f
      ? gs(
          {
            m: [f, 0, 30, 10],
            r: [f, -1, 30, 10],
            l: [f, -3, 30, 10],
          },
          c,
        )
      : c,
    d = zi(1, r.pos, r.quat, u, h, a, {
      max: 0.03,
      skin: t("fskin", 4e-4),
      bones: f ? [0, 1] : void 0,
    }),
    m = yo(
      1,
      r.pos,
      r.quat,
      yo(1, r.pos, r.quat, c, h, {
        fingers: [1, 2],
      }),
      h,
      {
        fingers: [3],
        max: {
          mcp: t("lmcp", 30),
        },
      },
    );
  for (let p of [1, 2, 3])
    for (let x = 0; x < 30 && Tc(1, r.pos, r.quat, m, h)[p] < 0.0012; x++)
      m[p * 4 + 3] > 0 ? (m[p * 4 + 3] -= 1) : (m[p * 4 + 2] -= 1);
  return {
    fr: r,
    a: m,
    sd: l,
    seat: d,
  };
}
var Py = new Map();
function QJ(o, t) {
  let e = [
      o.optic,
      o.muzzle,
      o.underbarrel,
      o.magazine,
      o.stock,
      o.camo === "factory" ? 0 : 1,
    ].join("|"),
    s = Py.get(e);
  if (s) return s;
  Sy(!0);
  try {
    let n = bA({
        paint: o.camo !== "factory",
      }),
      i = o.muzzle === "none",
      a = Ce.B,
      r = Ce.RT;
    (IA(n),
      NA(n),
      WA(n),
      qA(n, i),
      XA(n),
      YA(n),
      $A(n, o.stock),
      MT(n, t.ironsUp),
      wT(n, t.ironsUp),
      FA(n),
      OA(n),
      BA(n),
      UA(n),
      VA(n),
      GA(n),
      ZA(n, o.magazine));
    let l = P5(ST[o.optic] || 8),
      c = {
        c: new Color(1451050),
        m: 0,
        r: 0.12,
        wear: 1,
      };
    if (
      (o.optic === "reflex"
        ? (n.hard(
            "alu",
            Pe(
              [
                [l - 29, r - 5],
                [l + 29, r - 5],
                [l + 29, r + 12.5],
                [l + 26.5, r + 14.5],
                [l - 6, r + 14.5],
                [l - 9.5, r + 19.5],
                [l - 25, r + 19.5],
                [l - 29, r + 15.5],
              ],
              30,
            ),
          ),
          n.hard(
            "alu",
            pa(Er(43, 36, 7, 0, r + 34.5), 10, {
              u: l + 12,
              keepHoles: !0,
              holes: [Er(34, 25, 4, 0, r + 34.5)],
            }),
            pa(Er(41, 12, 0, 0, r + 15), 18, {
              u: l + 9,
            }),
          ),
          n.hard(
            c,
            pa(Er(34, 25, 4, 0, r + 34.5), 0.8, {
              u: l + 16.5,
            }),
          ))
        : o.optic === "holo"
          ? (n.hard(
              "alu",
              Pe(
                [
                  [l - 43, r - 5],
                  [l + 34.5, r - 5],
                  [l + 34.5, r + 24],
                  [l - 18, r + 24],
                  [l - 43, r + 18],
                ],
                34,
              ),
              pa(Er(45, 33, 3, 0, r + 40.5), 31, {
                u: l - 16,
                keepHoles: !0,
                holes: [Er(31.8, 24, 2, 0, r + 38)],
              }),
            ),
            n.hard(
              c,
              pa(Er(31.8, 24, 2, 0, r + 38), 0.8, {
                u: l + 8,
              }),
            ))
          : o.optic === "prism" &&
            (n.hard(
              "alu",
              Pe(
                [
                  [l - 33, r - 5],
                  [l + 33, r - 5],
                  [l + 29, r + 20.6],
                  [l - 29, r + 20.6],
                ],
                22,
              ),
              pa(e1(8, 21.6, Math.PI / 8, 0, r + 40), 44, {
                u: l - 26,
              }),
            ),
            n.hard(
              "alu",
              uo(
                [
                  [l - 54.5, 15.6],
                  [l - 54.5, 19.6],
                  [l - 37, 19.6],
                  [l - 36, 17.6],
                  [l - 26, 18.9],
                ],
                {
                  y: r + 40,
                  seg: 12,
                },
              ),
              uo(
                [
                  [l + 18, 17.4],
                  [l + 23, 17.4],
                  [l + 30.5, 19.7],
                  [l + 54, 19.7],
                  [l + 54, 16],
                ],
                {
                  y: r + 40,
                  seg: 12,
                },
              ),
            ),
            n.hard(
              "alu",
              s1(9, 0, 10.4, {
                seg: 8,
                c: 0,
              })
                .applyMatrix4(new Matrix4().makeRotationX(Math.PI / 2))
                .translate(0, r + 60, -(l - 2)),
              s1(9, 0, 10.4, {
                seg: 8,
                c: 0,
              })
                .applyMatrix4(new Matrix4().makeRotationY(-Math.PI / 2))
                .translate(20, r + 40, -(l - 2)),
            ),
            n.hard(
              c,
              uo(
                [
                  [l - 46, 13.5],
                  [l - 46, 0],
                ],
                {
                  y: r + 40,
                  seg: 12,
                },
              ),
              uo(
                [
                  [l + 44, 0],
                  [l + 44, 14.7],
                ],
                {
                  y: r + 40,
                  seg: 12,
                },
              ),
            )),
      o.muzzle !== "none")
    ) {
      let u = gf(o.muzzle, {
          caliber: "rifle",
        }),
        d = u.radius * 1e3,
        m = u.length * 1e3,
        p = 3.4;
      if (o.muzzle === "suppressor")
        n.hard(
          "steel",
          uo(
            [
              [Ce.CROWN, 0],
              [Ce.CROWN, 13],
              [Ce.CROWN + 11, 13],
              [Ce.CROWN + 12, 16],
              [Ce.CROWN + 19, 16],
              [Ce.CROWN + 20, 14],
              [Ce.CROWN + 29, d],
              [Ce.CROWN + 42, d],
              [Ce.CROWN + 42, d - 1.4],
              [Ce.CROWN + m - 46, d - 1.4],
              [Ce.CROWN + m - 46, d],
              [Ce.CROWN + m - 13, d],
              [Ce.CROWN + m - 13, d - 0.6],
              [Ce.CROWN + m - 1.2, d - 0.6],
              [Ce.CROWN + m, d - 1.8],
              [Ce.CROWN + m, p + 5],
              [Ce.CROWN + m - 2.4, p + 5],
              [Ce.CROWN + m - 2.4, p],
              [Ce.CROWN + m - 17, p],
            ],
            {
              y: a,
              seg: 12,
            },
          ),
        );
      else {
        n.hard(
          "steel",
          uo(
            [
              [Ce.CROWN, 0],
              [Ce.CROWN, d * 0.86],
              [Ce.CROWN + 2, d + 0.9],
              [Ce.CROWN + 10, d + 0.9],
              [Ce.CROWN + 11, d],
              [Ce.CROWN + m - 1, d],
              [Ce.CROWN + m, d - 1.1],
              [Ce.CROWN + m, p],
              [Ce.CROWN + 14, p],
            ],
            {
              y: a,
              seg: 12,
            },
          ),
        );
        for (let x of [0.3, 0.52, 0.74]) {
          let g = Ce.CROWN + 13 + (m - 17) * x;
          if (o.muzzle === "comp")
            n.hard("black", cs(Th(7, 5, 0.2), [0, a + d, g], "T"));
          else
            for (let b of [-1, 1])
              n.hard(
                "black",
                cs(Th(8, 9, 0.2), [b * d, a, g], b > 0 ? "R" : "L"),
              );
        }
      }
    }
    let h = zy[o.underbarrel],
      f = a - Ce.HGW;
    if (o.underbarrel === "vgrip") {
      n.hard(
        "poly",
        Pe(mn(h - 30, f - 7.5, h + 30, f), 20.6),
        Pe(mn(h - 22, f - 16.5, h + 22, f - 2), 29),
      );
      let u = (d, m, p) => {
        let x = [];
        for (let g = 0; g < 10; g++) {
          let b = (g / 10) * Math.PI * 2;
          x.push([
            m * Math.cos(b),
            f - 7.5 - d,
            -(h - (d - 9) * 0.035 + p * Math.sin(b)),
          ]);
        }
        return x;
      };
      n.hard(
        "poly",
        k4(
          [
            u(9, 14.6, 21.6),
            u(17.5, 13, 16.8),
            u(50, 15.4, 19.4),
            u(68, 14.7, 18.5),
            u(84, 16, 20),
            u(92, 14.3, 18.3),
          ],
          {
            capB: !0,
            crease: 0.9,
          },
        ),
      );
    } else
      o.underbarrel === "angled"
        ? n.hard(
            "poly",
            Pe(
              [
                [h - 62, f - 7.8],
                [h + 62, f - 7.8],
                [h + 62, f - 17.5],
                [h + 57, f - 26.5],
                [h + 49, f - 27],
                [h + 43, f - 21],
                [h + 30, f - 23.5],
                [h - 30, f - 51.5],
                [h - 42, f - 54.5],
                [h - 55, f - 47.5],
                [h - 62, f - 23.5],
              ],
              31,
              {
                keepHoles: !0,
                holes: [
                  [
                    [h - 46, f - 16.5],
                    [h - 8, f - 16.5],
                    [h - 41, f - 37.5],
                  ],
                ],
              },
            ),
            Pe(mn(h - 61, f - 7.5, h + 61, f), 20.6),
          )
        : o.underbarrel === "laser" &&
          (n.hard(
            "alu",
            Pe(mn(h - 30, f - 7.5, h + 30, f), 20.6),
            pa(
              [
                [-18, f - 12.5],
                [18, f - 12.5],
                [18, f - 33.5],
                [14.5, f - 38.5],
                [-14.5, f - 38.5],
                [-18, f - 33.5],
              ],
              62,
              {
                u: h - 31,
              },
            ),
          ),
          n.hard(c, cs(yl(7.3, 8, 0.2), [7, f - 25.5, h + 31], "F")),
          n.hard(
            {
              c: new Color(11740700),
              m: 0,
              r: 0.3,
              wear: 1,
            },
            cs(yl(3.5, 6, 0.2), [-9, f - 20, h + 31], "F"),
          ));
    s = n.finish();
  } finally {
    Sy(!1);
  }
  for (let n of ["metal", "poly", "furn", "hard"])
    s[n] && (s[n].computeBoundingBox(), s[n].computeBoundingSphere());
  return (Py.set(e, s), s);
}
function JJ(o) {
  let t = _O(o.build),
    e = AO(t),
    s = new Group(),
    n = P4(),
    i = QJ(t, e);
  s.name = "gun_ar";
  let a = new Mesh(i.hard, n.world);
  if (
    ((a.name = "world"),
    (a.castShadow = !0),
    (a.receiveShadow = !0),
    s.add(a),
    t.camo !== "factory")
  ) {
    let m = Py.get(i);
    m ||
      ((m = yA([
        {
          metal: i.metal,
        },
        {
          metal: i.poly,
        },
        {
          metal: i.furn,
        },
      ]).metal),
      m.computeBoundingSphere(),
      Py.set(i, m));
    let p = new Mesh(m, xl(t.camo, "metal") || n.world);
    ((p.name = "world_paint"),
      (p.castShadow = !0),
      (p.receiveShadow = !0),
      s.add(p));
  }
  let r =
      t.muzzle !== "none"
        ? gf(t.muzzle, {
            caliber: "rifle",
          }).length * 1e3
        : Ce.FH,
    l =
      t.optic === "irons"
        ? Ce.RT + Ce.SIGHT
        : Ce.RT +
          {
            reflex: 34.5,
            holo: 38,
            prism: 40,
          }[t.optic],
    c = {
      id: "ar",
      root: s,
      build: t,
      hands: null,
      clips: null,
      resetPose() {},
      anchors: {
        muzzle: Gt(0, ie(Ce.B), ie(Ce.CROWN + r)),
        eject: Gt(0.019, 0.049, 0.096),
        ejectDir: Bt(0.86, 0.36, 0.36).normalize(),
        sight: Gt(0, ie(l), 0.02),
        gripR: new Object3D(),
        gripL: new Object3D(),
      },
      tris:
        (i.hard ? i.hard.attributes.position.count / 3 : 0) +
        (t.camo !== "factory" ? Py.get(i).attributes.position.count / 3 : 0),
    },
    h = (m, p) => {
      let x = m.clone().normalize(),
        g = p.clone().addScaledVector(x, -p.dot(x)).normalize(),
        b = new Vector3().crossVectors(x, g);
      return new Quaternion().setFromRotationMatrix(
        new Matrix4().makeBasis(b, x, g),
      );
    },
    f = Ze(20),
    u = c.anchors.gripR,
    d = c.anchors.gripL;
  return (
    (u.name = "gripR"),
    u.quaternion.copy(h(Bt(0, -Math.sin(f), -Math.cos(f)), Bt(-1, 0, 0))),
    u.position.copy(
      Bt(0.04, -0.012, 0.0165).applyQuaternion(u.quaternion).negate(),
    ),
    (u.position.x = 0.0166),
    (d.name = "gripL"),
    d.quaternion.copy(h(Bt(0.62, 0, -0.78), Bt(0.25, 0.97, 0))),
    d.position.copy(
      t.underbarrel === "vgrip"
        ? Gt(-0.016, ie(Ce.B - Ce.HGW) - 0.055, ie(zy.vgrip))
        : t.underbarrel === "angled"
          ? Gt(-0.02, ie(Ce.B - Ce.HGW) - 0.034, ie(zy.angled))
          : Gt(-0.027, ie(Ce.B - Ce.HGW) - 0.0015, 0.27),
    ),
    s.add(u, d),
    c
  );
}
var Qn = (o, t, e) => new Vector3(o, t, e);
var kn = new Float64Array(6);
var rk = new Vector3();
var kO = new Quaternion();
var t00 = new Vector3(1, 0, 0);
var lk = (o, t, e) => (o < t ? t : o > e ? e : o);
var e00 = (o, t, e) => {
  let s = lk((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
var CO = null;
function PO(o) {
  let t = o.arms,
    e = o.grips,
    s = o.parts,
    n = new Mf(o),
    i = o.dims,
    a = o.fx || {};
  (t.setRest("R", e.fire.pos, e.fire.quat, e.fire.pose),
    t.setRest("L", e.support.pos, e.support.quat, e.support.pose),
    (t.trigPose = e.trigger.pose),
    (t.pressPose = e.press.pose),
    o.anchors.gripR.position.copy(e.fire.pos),
    o.anchors.gripR.quaternion.copy(e.fire.quat),
    o.anchors.gripL.position.copy(e.support.pos),
    o.anchors.gripL.quaternion.copy(e.support.quat));
  let r = !1,
    l = {
      clip: null,
      t: 0,
      ads: 0,
      elbL: 0,
    },
    c = (CO || (CO = buildGrenade())).clone();
  ((c.name = "fragInHand"),
    (c.visible = !1),
    o.root.add(c),
    c.traverse((N) => {
      N.isMesh &&
        ((N.frustumCulled = !1), (N.castShadow = !1), (N.receiveShadow = !1));
    }));
  let h = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2),
    f = (N, q, o0, h0) =>
      n.clip(q, o0, (y0, D) => {
        ((l.clip = N), (l.t = y0), (l.elbL = 0), (c.visible = !1), h0(y0, D));
      }),
    u = globalThis.GH_TUNE || {},
    d = (N, q) => u[N] ?? q,
    m = (N, q, o0) => xp(new Float32Array(Ui), N, q, o0),
    p = i.BOLT_TRAVEL,
    x = i.CH_PULL,
    g = i.CH_LOCK,
    b = -0.22,
    v = 0.15,
    y = o.build.underbarrel === "vgrip",
    M = o.build.underbarrel === "laser",
    w = pn.loose,
    T = gs({
      i: [26, 0, 32, 16],
      m: [32, 0, 40, 20],
      r: [37, 2, 48, 23],
      l: [42, 5, 55, 26],
      t: [8, 22, -18, 10, 12],
      cup: 8,
    }),
    S = gs({
      i: [8, 0, 10, 5],
      m: [13, 0, 15, 8],
      r: [64, 2, 82, 42],
      l: [68, 4, 86, 44],
      t: [26, 4, -32, 22, 26],
      cup: 10,
    }),
    E = gs({
      i: [60, 0, 82, 44],
      m: [66, 0, 86, 46],
      r: [70, 0, 88, 48],
      l: [72, -2, 88, 48],
      t: [30, 14, -30, 26, 34],
      cup: 14,
    }),
    _ = gs({
      i: [14, -2, 16, 8],
      m: [21, 0, 24, 12],
      r: [29, 2, 34, 16],
      l: [37, 5, 44, 20],
      t: [12, 14, -20, 14, 16],
      cup: 8,
    }),
    R = Qa(e.support.pose, y ? 0.4 : M ? d("lzl", 1.5) : 1),
    C = m(R, w, y ? 0.25 : 0.7),
    L = (N, q = 0.3) => {
      let o0 = new Float32Array(N);
      for (let h0 = 0; h0 < 4; h0++) {
        let y0 = h0 * 4;
        ((o0[y0] = N[y0] - 8),
          (o0[y0 + 2] = N[y0 + 2] * (h0 === 3 ? q * 0.8 : q)),
          (o0[y0 + 3] = N[y0 + 3] * q * 0.7));
      }
      return (
        (o0[16] = N[16] - 8),
        (o0[17] = N[17] + 6),
        (o0[19] = N[19] * 0.5),
        (o0[20] = N[20] * 0.5),
        o0
      );
    },
    A = L(e.mag.pose, d("mlk", 0.78)),
    O = L(e.magSeat.pose, d("slk", 0.6)),
    H = new Float32Array(e.cock.pose);
  H[0] -= 4;
  let F = new Float32Array(e.cock.pose);
  ((F[0] = 50), (F[2] = 62), (F[3] = 30));
  let P = m(e.slap.pose, w, 0.55),
    z = {
      pos: Qn(0, 0, 0),
      rot: new Euler(),
    },
    k = {
      pos: Qn(0, 0, 0),
      rot: new Euler(),
    },
    I = {
      t: 0,
      ...n.grip("support"),
    },
    G = (N, q) => {
      let o0 = s.mag.userData.rest;
      return {
        p: N.pos.clone().sub(o0).applyQuaternion(q.q).add(q.p),
        q: q.q.clone().multiply(N.quat),
        f: q.f,
      };
    },
    K = (N) => {
      let q = Qn(0, 0, 0),
        o0 = new Quaternion();
      return (
        n.resolve(N, q, o0),
        {
          p: q,
          q: o0,
          f: "root",
        }
      );
    },
    $ = (N, q) => (o0, h0) => {
      (N(h0, k), q && q(h0));
      let y0 = Qn(0, 0, 0),
        D = new Quaternion();
      return (
        n.resolve(o0, y0, D),
        {
          p: y0.applyQuaternion(n.cq).add(n.cp),
          q: n.cq.clone().multiply(D),
          f: "view",
        }
      );
    },
    n0 = (N, q, o0, h0 = [0, 0, 0]) => ({
      p: N.p
        .clone()
        .lerp(q.p, o0)
        .add(Qn(h0[0], h0[1], h0[2])),
      q: N.q.clone().slerp(q.q, o0),
      f: "view",
    }),
    e0 = new Quaternion().setFromEuler(o.hip.rot).invert(),
    p0 = (N, q, o0) => {
      let h0 = QE(
        -1,
        Qn(N[0], N[1], N[2]).sub(o.hip.pos).applyQuaternion(e0),
        Qn(q[0], q[1], q[2]).applyQuaternion(e0),
        Qn(o0[0], o0[1], o0[2]).applyQuaternion(e0),
      );
      return {
        p: h0.pos,
        q: h0.quat,
        f: "view",
      };
    },
    t0 = n.grip("support"),
    M0 = n.grip("cock"),
    f0 = n.grip("slap"),
    _0 = n.grip("mag"),
    F0 = n.grip("magSeat"),
    m0 = n.grip("support", {
      d: y
        ? [0, -0.082, 0.004]
        : M
          ? [d("lzx", -0.006), d("lzy", -0.072), d("lzz", 0.008)]
          : [-0.004, -0.045, 0.004],
    }),
    S0 = n.grip("support", {
      d: y
        ? [-0.004, -0.1, 0.006]
        : M
          ? [-0.03, -0.088, 0.012]
          : [-0.022, -0.062, 0.006],
    }),
    T0 = (N, q, o0 = S0) =>
      y || M
        ? [
            {
              t: N + (q - N) * 0.55,
              ...m0,
              pass: !0,
            },
            {
              t: q,
              ...o0,
              pass: !0,
            },
          ]
        : [
            {
              t: q,
              ...o0,
              pass: !0,
            },
          ],
    j0 = n.grip("mag", {
      d: [d("mgx", -0.004), d("mgy", -0.125), d("mgz", -0.022)],
      f: "root",
    }),
    Z0 = (N, q = 0.7, o0 = 0) => ({
      p: j0.p
        .clone()
        .add(Qn(d("mwx", -0.055) + o0, d("mwy", -0.035), d("mwz", 0))),
      q: N.q.clone().slerp(j0.q, q),
      f: "root",
      arc: Qn(d("mwa", -0.035), 0, 0),
    }),
    lt = n.grip("magSeat", {
      d: [d("sox", -0.052), d("soy", -0.022), d("soz", 0.01)],
    }),
    H0 = n.grip("support", {
      d: y
        ? [-0.004, -0.135, 0.008]
        : M
          ? [d("lux", -0.05), d("luy", -0.12), 0.012]
          : [d("ux", -0.05), d("uy", -0.1), d("uz", 0.03)],
    }),
    Y0 = n.grip("magSeat", {
      d: [d("sdx", -0.055), d("sdy", -0.08), d("sdz", 0.006)],
    }),
    et = [
      Math.cos((i.CH_ANG * Math.PI) / 180),
      Math.sin((i.CH_ANG * Math.PI) / 180),
    ],
    ct = [et[0] * 0.03, et[1] * 0.03, 0.003];
  n.part("chargingHandle", 0, 0, x, 0, 0, g);
  let D0 = n.grip("cock", {
      d: [ct[0] * 1.15, ct[1] * 1.15, 0],
    }),
    u0 = K(
      n.grip("cock", {
        d: ct,
      }),
    );
  n.part("chargingHandle", 0, 0, 0);
  let w0 = (N, q) => {
      for (let o0 of [6, 10, 14]) ((N[o0] += 1.1 * q), (N[o0 + 1] += 0.7 * q));
    },
    P0 = (N, q) => {
      for (let o0 of [0, 4, 8, 12]) ((N[o0] += 1 * q), (N[o0 + 2] += 1.3 * q));
      N[19] += 1.5 * q;
    },
    st = (N, q = 0.15) => [
      {
        t: N - (y ? Math.max(q, 0.2) : q),
        pose: R,
        dur: 0.06,
        stagger: 0.006,
      },
      {
        t: N - 0.05,
        pose: e.support.pose,
        dur: 0.11,
        stagger: 0.02,
        from: "index",
        ease: "out",
      },
    ],
    J0 = jt([
      [0, 0],
      [0.02, p, "out"],
      [0.031, p],
      [0.056, 0, "in"],
    ]),
    q0 = jt([
      [0, 0],
      [0.01, 1, "out"],
      [0.038, 1],
      [0.06, 0],
    ]),
    v0 = jt([
      [0, 0],
      [0.012, 1, "out"],
      [0.03, 0.34, "out"],
      [0.058, 0, "io"],
    ]),
    x0 = f(
      "fire",
      0.064,
      [
        {
          t: 0.014,
          type: "eject",
        },
      ],
      (N, q) => {
        let o0 = q0(N),
          h0 = v0(N),
          y0 = 1 - 0.5 * l.ads,
          D = t.clip.R.pose,
          W = t.clip.L.pose;
        {
          let $0 = o.kickK ?? 1,
            g0 = 0.22 + 0.78 * $0;
          n.gunAt(
            q,
            0,
            5e-4 * h0 * y0 * g0,
            d("fkz", 0.0046) * h0 * y0 * g0,
            d("fkr", 0.0075) * h0 * y0 * g0,
            0,
            0,
          );
        }
        (n.part("bolt", 0, 0, J0(N)),
          n.part("trigger", 0, 0, 0, b * o0),
          n.part("chargingHandle", 0, 0, 7e-4 * h0),
          (t.clip.trig = 1),
          (t.clip.press = o0));
        let Y = (o.fireN || 1) <= 1 ? 1 : 0,
          R0 = o.heatK || 0,
          U0 = R0 * R0 * (3 - 2 * R0);
        for (let $0 of [6, 10, 14])
          ((D[$0] += (1.4 + 0.7 * Y) * o0 + 0.9 * h0 + 0.8 * U0),
            (D[$0 + 1] += 0.8 * o0 + 0.5 * h0 + 0.4 * U0));
        ((D[19] += 1.5 * o0), P0(W, (1.1 + 0.5 * Y) * h0 + 0.7 * U0));
      },
    ),
    C0 = [
      d("rpx", -0.005),
      d("rpy", 0.088),
      d("rpz", 0),
      d("rrx", -0.07),
      d("rry", 0.06),
      d("rrz", -0.84),
    ],
    k0 = [
      d("ckx", 0.02),
      d("cky", -0.035),
      d("ckz", 0.07),
      d("ckrx", -0.1),
      d("ckry", 0.2),
      d("ckrz", -0.45),
    ],
    O0 = [
      d("slx", 0.05),
      d("sly", -0.07),
      d("slz", 0),
      d("slrx", -0.08),
      d("slry", 0.1),
      d("slrz", -0.3),
    ],
    B0 = (N) => {
      let q = N ? 2.3 : 1.8,
        o0 = 0.21,
        h0 = o0 + 0.095,
        y0 = o0 + 0.155,
        D = o0 + 0.19,
        W = N ? D + 0.2 : 0.3,
        Y = W + 0.035,
        R0 = W + 0.09,
        U0 = R0 + 0.11,
        $0 = N ? U0 + 0.12 : R0 + 0.2,
        g0 = $0 + 0.02,
        G0 = g0 + 0.02,
        K0 = G0 + 0.13,
        it = G0 + (N ? 0.27 : 0.42),
        ft = it + 0.07,
        gt = ft + 0.085,
        rt = gt - 0.05,
        dt = gt + 0.34,
        tt = N ? dt + 0.37 : gt + 0.4,
        X0 = tt - 0.26,
        ut = tt + 0.04,
        z0;
      if (N) {
        let re = [0.02, 0, 0.02, -0.012, -0.022, 0.012],
          Ae = ["back", "back", "io", "out", "io", "back"],
          ws = re.map((Os, va) =>
            jt([
              [Math.max(0.004, 0.015 + Os), 0],
              [o0 - 0.035 + Os, 1, Ae[va]],
              [D + 0.03 + Os, 1],
              [W - 0.05 + Os, 0, "io"],
            ]),
          ),
          Zo = re.map((Os, va) =>
            jt([
              [D + 0.03 + Os, 0],
              [W - 0.01 + Os, 1, Ae[va]],
              [gt + 0.07 + Os, 1],
              [dt - 0.12 + Os, 0, "io"],
            ]),
          ),
          so = re.map((Os, va) =>
            jt([
              [gt + 0.07 + Os, 0],
              [dt - 0.12 + Os, 1, "io"],
              [dt + 0.08 + Os, 1],
              [tt + 0.03 + Os, 0, "io"],
            ]),
          );
        z0 = (Os, va) =>
          k0[Os] * ws[Os](va) + C0[Os] * Zo[Os](va) + O0[Os] * so[Os](va);
      } else {
        let re = [
          jt([
            [0.08, 0],
            [0.33, 1, "back"],
            [X0, 1],
            [ut, 0, "io"],
          ]),
          jt([
            [0, 0],
            [0.07, -0.06, "out"],
            [0.31, 1, "back"],
            [X0 + 0.02, 1],
            [ut - 0.02, 0, "io"],
          ]),
          null,
          jt([
            [0.05, 0],
            [0.3, 1, "out"],
            [X0, 1],
            [ut - 0.03, 0, "io"],
          ]),
          jt([
            [0.04, 0],
            [0.28, 1, "io"],
            [X0 - 0.02, 1],
            [ut - 0.05, 0, "io"],
          ]),
          jt([
            [0, 0],
            [0.07, -0.05, "out"],
            [0.34, 1, "back"],
            [X0 + 0.03, 1],
            [ut, -0.06, "io"],
            [ut + 0.1, 0, "io"],
          ]),
        ];
        ((re[2] = re[0]), (z0 = (Ae, ws) => C0[Ae] * re[Ae](ws)));
      }
      let I0 = (re) => be(re, 0.06, 0.2, tt - 0.1, tt + 0.05),
        vt = [
          {
            t: R0 + 0.02,
            v: [0, 0.06, 0, 0.26, 0, 0.12],
          },
          {
            t: it,
            v: [0, 0.02, 0, 0.07, 0, -0.06],
          },
          {
            t: ft,
            v: [0, 0.03, 0, 0.08, 0, -0.05],
          },
          {
            t: gt,
            v: [0.01, 0.17, 0.02, 0.4, 0.05, -0.26],
          },
          {
            t: tt - 0.02,
            v: [0, 0.03, 0, 0.1, 0, 0.05],
          },
        ];
      N &&
        vt.push(
          {
            t: o0 + 0.015,
            v: [-0.02, 0.02, 0.2, 0.22, 0.22, 0.1],
          },
          {
            t: h0,
            v: [0.02, 0.03, -0.14, -0.14, -0.16, -0.22],
          },
          {
            t: U0,
            v: [0, 0.02, 0, 0.08, 0, -0.05],
          },
          {
            t: dt + 0.004,
            v: [-0.03, -0.26, 0.02, -0.5, 0.08, 0.5],
          },
          {
            t: dt + 0.046,
            v: [0.01, 0.06, -0.26, -0.24, -0.05, -0.3],
          },
        );
      let wt = Do(q, {
          n: 6,
          k: [300, 300, 300, 330, 330, 300],
          c: [15, 15, 15, 14, 14, 13],
          impulses: vt,
          target: (re, Ae) => {
            let ws = I0(re);
            ((Ae[0] = 0),
              (Ae[1] = -0.004 * ws),
              (Ae[2] = 0),
              (Ae[3] = (-0.02 + 0.006 * Math.sin(re * 2.3)) * ws),
              (Ae[4] = 0.008 * Math.sin(re * 1.7 + 1) * ws),
              (Ae[5] = 0.02 * ws));
          },
        }),
        _t = jt([
          [(N ? U0 : R0) + 0.06, 0],
          [$0 + 0.02, 1, "io"],
          [G0 + 0.1, 1],
          [it - 0.04, 0, "io"],
        ]),
        Pt = (re, Ae) => {
          wt(re, kn);
          let ws = _t(re);
          ((kn[1] -= 0.005 * ws),
            (kn[3] += 0.04 * ws),
            (kn[5] -= 0.07 * ws),
            (kn[4] += 0.03 * ws),
            n.gunAt(
              Ae,
              z0(0, re) + kn[0],
              z0(1, re) + kn[1],
              z0(2, re) + kn[2],
              z0(3, re) + kn[3],
              z0(4, re) + kn[4],
              z0(5, re) + kn[5],
            ));
        },
        bt = jt([
          [Y + 0.005, 0],
          [Y + 0.04, 1, "out"],
          [R0 + 0.05, 1],
          [R0 + 0.11, 0],
        ]),
        Et = jt([
          [o0 + 0.012, 0],
          [h0, 1, "out"],
          [dt + 0.014, 1],
          [dt + 0.05, 0, "in"],
        ]),
        zt = jt([
          [h0 - 0.006, 0],
          [y0, 1, "back"],
          [dt, 1],
          [dt + 0.018, 0, "in"],
        ]),
        J = n.partKey(
          "mag",
          [d("mox", -0.1), d("moy", -0.19), 0.1],
          [0.9, 0.25, 0.5],
          "view",
        ),
        Q = n.partKey(
          "mag",
          [d("mix", -0.1), d("moy", -0.19), 0.1],
          [0.9, 0.25, 0.5],
          "view",
        ),
        i0 = n.partKey(
          "mag",
          [d("msx", -0.026), d("msy", -0.112), d("msz", 0.04)],
          [d("msrx", 0.5), 0.08, d("msrz", -0.22)],
        ),
        A0 = n.partKey("mag", [-0.018, -0.094, 0.028], [0.38, 0.06, -0.17]),
        N0 = n.partKey("mag", [-0.005, -0.055, -0.004], [0.13, 0, -0.1]),
        mt = n.partKey("mag", [0, -0.0225, 0], [0.012, 0, -0.012]),
        xt = new Xs([
          {
            t: 0,
            ...n.partKey("mag"),
          },
          {
            t: R0,
            ...n.partKey("mag"),
          },
          {
            t: R0 + 0.045,
            ...n.partKey("mag", [0, -0.032, -0.002], [0.04, 0, 0]),
            pass: !0,
          },
          {
            t: R0 + 0.095,
            ...n.partKey("mag", [0, -0.088, -0.006], [0.12, 0, 0.06]),
            pass: !0,
          },
          {
            t: R0 + 0.15,
            ...n.partKey("mag", [-0.02, -0.165, 0.02], [0.4, 0.12, 0.25]),
            pass: !0,
          },
          ...(N
            ? [
                {
                  t: g0 - 0.001,
                  ...J,
                },
                {
                  t: g0,
                  ...Q,
                },
              ]
            : [
                {
                  t: $0,
                  ...J,
                },
                {
                  t: g0,
                  ...J,
                },
              ]),
          {
            t: K0,
            ...i0,
            pass: !0,
            tens: 0.6,
          },
          ...(N
            ? []
            : [
                {
                  t: K0 + 0.13,
                  ...A0,
                  pass: !0,
                  tens: 0.5,
                },
              ]),
          {
            t: it,
            ...N0,
          },
          {
            t: ft,
            ...mt,
            ease: "out",
          },
          {
            t: rt,
            ...mt,
          },
          {
            t: gt,
            ...n.partKey("mag"),
            ease: "in",
          },
        ]),
        yt = null,
        Mt = (re, Ae, ws, Zo) => {
          (Pt(re, Ae),
            xt.eval(re, n, ws, Zo),
            ws.applyQuaternion(n.cq).add(n.cp),
            Zo.premultiply(n.cq));
        };
      if (N) {
        let re = {
            pos: Qn(0, 0, 0),
            rot: new Euler(),
          },
          Ae = Qn(0, 0, 0),
          ws = Qn(0, 0, 0),
          Zo = new Quaternion(),
          so = new Quaternion();
        (Mt(U0 - 0.012, re, Ae, Zo), Mt(U0, re, ws, so));
        let Os = ws
          .clone()
          .sub(Ae)
          .multiplyScalar(1 / 0.012);
        yt = {
          p: ws.clone(),
          v0: Os,
          v: Qn(Os.x * 0.35, Os.y * 0.9 - 0.15, Os.z * 0.6),
          q: so.clone(),
          axis: Qn(-1, 0.2, -0.3).normalize(),
        };
      }
      let St = $(Pt, (re) => {
          (N && n.part("chargingHandle", 0, 0, x * Et(re), 0, 0, g * zt(re)),
            n.partXf("mag", xt, re));
        }),
        Rt = [I];
      if (N) {
        let re = n.grip("support", {
          d: y
            ? [-0.004, -0.105, 0.004]
            : M
              ? [-0.035, -0.09, 0.012]
              : [d("c0x", -0.02), d("c0y", -0.065), 0],
        });
        Rt.push(
          {
            t: 0.05,
            ...t0,
          },
          ...T0(0.05, 0.1, re),
          {
            t: 0.145,
            ...n0(St(re, 0.1), St(D0, o0 - 0.04), 0.6, [
              d("c1x", -0.065),
              d("c1y", -0.03),
              0.01,
            ]),
            pass: !0,
          },
          {
            t: o0 - 0.04,
            ...D0,
            pass: !0,
          },
          {
            t: o0,
            ...M0,
            ease: "out",
          },
          {
            t: D - 0.02,
            ...M0,
          },
          {
            t: D + 0.03,
            ...St(u0, D + 0.03),
            pass: !0,
          },
          {
            t: D + 0.105,
            ...Z0(u0, 0.92),
            pass: !0,
          },
        );
      } else
        Rt.push(
          {
            t: 0.06,
            ...t0,
          },
          ...(M
            ? T0(0.06, 0.125)
            : [
                {
                  t: 0.11,
                  ...m0,
                  pass: !0,
                },
              ]),
          {
            t: 0.19,
            ...Z0(m0),
            pass: !0,
          },
        );
      if (
        (Rt.push(
          {
            t: W - 0.085,
            ...j0,
            pass: !0,
          },
          {
            t: W,
            ..._0,
            ease: "out",
          },
        ),
        N)
      ) {
        let re = {
            p: yt.p,
            q: yt.q,
            f: "view",
          },
          Ae = G(e.magSeat, Q);
        Rt.push(
          {
            t: U0 - 0.001,
            ..._0,
          },
          {
            t: U0,
            ...G(e.mag, re),
            pass: !0,
            vel: yt.v0.clone().multiplyScalar(0.5),
          },
          {
            t: U0 + 0.07,
            ...(() => {
              let ws = G(e.mag, re);
              return (ws.p.add(Qn(-0.16, 0.03, 0.07)), ws);
            })(),
            pass: !0,
          },
          {
            t: $0,
            ...Ae,
          },
          {
            t: g0,
            ...Ae,
          },
          {
            t: g0 + 0.001,
            ...F0,
          },
        );
      } else
        Rt.push(
          {
            t: $0,
            ..._0,
          },
          {
            t: g0,
            ...F0,
          },
        );
      Rt.push(
        {
          t: gt + 0.035,
          ...F0,
        },
        {
          t: gt + 0.095,
          ...lt,
          pass: !0,
        },
      );
      let Ot = n.grip("slap", {
          d: [d("sux", -0.034), d("suy", 0.03), d("suz", 0.03)],
          r: [d("surx", 0.1), 0, d("surz", 0.22)],
        }),
        Jt = n.grip("slap", {
          d: [
            d("sux", -0.034) * 1.1,
            d("suy", 0.03) * 1.14,
            d("suz", 0.03) * 1.1,
          ],
          r: [d("surx", 0.1) * 1.2, 0, d("surz", 0.22) * 1.2],
        }),
        ee = n.grip("slap", {
          d: [d("stx", -0.055), d("sty", 0.04), d("stz", 0.03)],
          r: [0.2, 0, 0.1],
        });
      N
        ? Rt.push(
            {
              t: gt + 0.2,
              ...n0(St(lt, gt + 0.095), St(Ot, dt - 0.09), 0.5, [
                d("s1x", -0.07),
                d("s1y", 0),
                0.03,
              ]),
              pass: !0,
            },
            {
              t: dt - 0.09,
              ...Ot,
              ease: "out",
            },
            {
              t: dt - 0.05,
              ...Jt,
            },
            {
              t: dt,
              ...f0,
              ease: "in3",
            },
            {
              t: dt + 0.03,
              ...n.grip("slap", {
                d: [-0.01, -0.016, 0],
                r: [0, 0, 0.18],
              }),
              ease: "out",
            },
            {
              t: dt + 0.1,
              ...ee,
              pass: !0,
            },
            {
              t: dt + 0.18,
              ...n.grip("support", {
                d: [d("s2x", -0.1), d("s2y", -0.04), 0.016],
                r: [d("s2r", 0.9), 0, 0],
              }),
              pass: !0,
            },
            {
              t: tt - 0.115,
              ...(M || y
                ? H0
                : n.grip("support", {
                    d: [-0.05, -0.105, 0.012],
                    r: [0.25, 0, 0],
                  })),
              pass: !0,
            },
            {
              t: tt - 0.05,
              ...m0,
              pass: !0,
            },
            {
              t: tt,
              ...t0,
            },
          )
        : Rt.push(
            {
              t: gt + 0.155,
              ...Y0,
              pass: !0,
            },
            {
              t: gt + 0.26,
              ...H0,
              pass: !0,
            },
            {
              t: tt - 0.05,
              ...m0,
              pass: !0,
            },
            {
              t: tt,
              ...t0,
            },
          );
      let Nt = new Xs(Rt),
        ge = [
          {
            t: 0,
            pose: R,
            dur: N ? 0.045 : 0.06,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: N ? 0.105 : 0.085,
            pose: w,
            dur: N ? 0.055 : 0.07,
            stagger: N ? 0.005 : 0.008,
            from: "little",
          },
        ];
      (N &&
        ge.push(
          {
            t: o0 - 0.085,
            pose: H,
            dur: 0.05,
            stagger: 0.004,
          },
          {
            t: o0 - 0.03,
            pose: e.cock.pose,
            dur: 0.045,
            stagger: 0.008,
            from: "index",
            ease: "out",
          },
          {
            t: D + 0.005,
            pose: F,
            dur: 0.04,
          },
          {
            t: D + 0.045,
            pose: w,
            dur: 0.05,
            stagger: 0.004,
          },
        ),
        ge.push(
          {
            t: W - 0.15,
            pose: A,
            dur: 0.055,
            stagger: 0.005,
          },
          {
            t: W - 0.025,
            pose: e.mag.pose,
            dur: 0.06,
            stagger: 0.01,
            from: "index",
            ease: "out",
          },
          {
            t: Y,
            pose: e.magPress.pose,
            dur: 0.04,
            digits: [4],
            ease: "out",
          },
          {
            t: R0 + 0.03,
            pose: e.mag.pose,
            dur: 0.08,
            digits: [4],
          },
        ),
        N &&
          ge.push(
            {
              t: U0 - 0.045,
              pose: A,
              dur: 0.05,
              stagger: 0.005,
              from: "thumb",
            },
            {
              t: U0 + 0.035,
              pose: w,
              dur: 0.05,
            },
          ),
        ge.push(
          {
            t: $0 - (N ? 0.025 : 0),
            pose: e.magSeat.pose,
            dur: N ? 0.04 : 0.018,
            stagger: 0,
          },
          {
            t: gt + 0.03,
            pose: O,
            dur: 0.05,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: gt + 0.085,
            pose: w,
            dur: 0.09,
            stagger: 0.008,
            from: "little",
          },
        ),
        N
          ? ge.push(
              {
                t: dt - 0.15,
                pose: P,
                dur: 0.07,
                stagger: 0.006,
              },
              {
                t: dt - 0.055,
                pose: e.slap.pose,
                dur: 0.04,
                stagger: 0.003,
                ease: "out",
              },
              {
                t: dt + 0.07,
                pose: w,
                dur: 0.09,
                stagger: 0.006,
                from: "little",
              },
              ...st(tt, 0.19),
            )
          : ge.push(...st(tt)));
      let Le = new Gs(e.support.pose, ge),
        xn = (re) =>
          be(re, 0.1, 0.26, tt - 0.12, tt + 0.06) +
          1.2 * be(re, gt - 0.03, gt + 0.01, gt + 0.06, gt + 0.16) +
          (N
            ? 0.9 * be(re, o0 - 0.02, o0 + 0.05, y0, D + 0.05) +
              1.3 * be(re, dt - 0.08, dt - 0.01, dt + 0.06, dt + 0.16)
            : 0),
        js = (re) => be(re, rt - 0.02, rt + 0.02, gt + 0.01, gt + 0.05),
        Un = [
          ye(0.04, "cloth"),
          ye(R0, "magout"),
          ye(rt + 0.01, "magin"),
          {
            t: gt + 0.02,
            type: "ammo",
          },
          ye(tt - 0.12, "cloth"),
        ];
      return (
        N &&
          Un.push(
            ye(o0 + 0.03, "slide"),
            {
              t: U0,
              type: "magdrop",
            },
            ye(dt - 0.004, "bolt"),
          ),
        n.begin(z),
        f(N ? "reloadEmpty" : "reload", q, Un, (re, Ae) => {
          if (((!N || re < U0 || re >= g0) && (r = !1), Pt(re, Ae), N)) {
            let ws = Et(re);
            (n.part("chargingHandle", 0, 0, x * ws, 0, 0, g * zt(re)),
              n.part("bolt", 0, 0, p * Math.min(1, ws * 1.15)),
              (s.chamberRound.visible = re > dt + 0.05));
          }
          if (N && re >= U0 && re < g0) {
            let ws = re - U0,
              Zo = s.mag;
            (r && (Zo.visible = !1),
              rk.copy(yt.p).addScaledVector(yt.v, ws),
              (rk.y -= 0.5 * 9 * ws * ws),
              kO.setFromAxisAngle(yt.axis, 5.5 * ws).premultiply(yt.q),
              Zo.position.copy(rk).sub(n.cp).applyQuaternion(n.cqi),
              Zo.quaternion.copy(n.cqi).multiply(kO));
          } else n.partXf("mag", xt, re);
          if (N) {
            let ws = re >= g0;
            ((s.magRounds.visible = ws), (s.magFollower.visible = !ws));
          }
          (n.part("magPaddle", 0, 0, 0, v * bt(re)),
            n.hand("L", Nt, re),
            n.pose("L", Le, re));
          {
            let ws = t.clip.L.pose,
              Zo = js(re);
            for (let so of [0, 4, 8])
              ((ws[so + 2] += 2.5 * Zo), (ws[so + 3] += 1.5 * Zo));
            ws[19] += 3 * Zo;
          }
          (w0(t.clip.R.pose, xn(re)),
            N && (l.elbL = be(re, dt - 0.24, dt - 0.09, dt + 0.02, dt + 0.15)));
        })
      );
    },
    ot = n.grip("support", {
      d: M
        ? [-0.06, -0.095, 0]
        : y
          ? [-0.006, -0.11, 0.01]
          : [-0.045, -0.095, 0.035],
    }),
    Q0 = (() => {
      let N = jt([
          [0, -0.3],
          [0.27, 0.014, "out3"],
          [0.4, 0],
        ]),
        q = jt([
          [0, -0.85],
          [0.25, 0.06, "out3"],
          [0.4, 0],
        ]),
        o0 = jt([
          [0, 1],
          [0.31, 0, "out"],
        ]),
        h0 = jt([
          [0, 0.34],
          [0.27, -0.045, "out"],
          [0.4, 0],
        ]),
        y0 = new Xs([
          {
            t: 0,
            ...ot,
          },
          {
            t: 0.06,
            ...ot,
          },
          {
            t: 0.25,
            ...n.grip("support"),
            arc: y ? null : Qn(-0.01, -0.02, 0),
          },
        ]),
        D = new Gs(C, [
          {
            t: 0.05,
            pose: R,
            dur: 0.07,
            stagger: 0.005,
          },
          {
            t: 0.17,
            pose: e.support.pose,
            dur: 0.12,
            stagger: 0.02,
            from: "index",
            ease: "out",
          },
        ]);
      return f("draw", 0.4, [ye(0.02, "cloth")], (W, Y) => {
        (n.gunAt(
          Y,
          0.02 * o0(W),
          N(W),
          0.06 * o0(W),
          q(W),
          0.25 * o0(W),
          h0(W),
        ),
          n.hand("L", y0, W),
          n.pose("L", D, W),
          w0(t.clip.R.pose, 1.4 * be(W, 0.2, 0.27, 0.3, 0.4)));
      });
    })(),
    nt = (() => {
      let W = [0.03, -0.3, 0.07, -0.8, 0.3, 0.2],
        Y = [
          d("fpx", -0.012),
          d("fpy", 0.085),
          0.008,
          -0.02,
          0.06,
          d("fprz", -0.76),
        ],
        R0 = jt([
          [0, 1],
          [0.3, 0, "out3"],
        ]),
        U0 = [0.01, 0, 0.01, -0.01, 0, 0.015].map((dt) =>
          jt([
            [0.03 + dt, 0],
            [0.31 + dt, 1, "out"],
            [0.52 + 0.02 + dt, 1],
            [0.755 + 0.03 + dt, 0, "io"],
          ]),
        ),
        $0 = Do(0.9, {
          n: 6,
          k: [320, 320, 320, 340, 340, 320],
          c: [15, 15, 15, 14, 14, 14],
          impulses: [
            {
              t: 0.3,
              v: [0, 0.05, 0, 0.12, 0, -0.1],
            },
            {
              t: 0.4 + 0.004,
              v: [0.01, 0.15, 0, 0.28, 0.04, -0.2],
            },
            {
              t: 0.48,
              v: [0, -0.11, 0, -0.2, 0, 0.12],
            },
            {
              t: 0.755 - 0.01,
              v: [0, 0.03, -0.03, 0.08, 0, 0.06],
            },
          ],
        }),
        g0 = (dt, tt) => {
          $0(dt, kn);
          let X0 = R0(dt);
          n.gunAt(
            tt,
            W[0] * X0 + Y[0] * U0[0](dt) + kn[0],
            W[1] * X0 + Y[1] * U0[1](dt) + kn[1],
            W[2] * X0 + Y[2] * U0[2](dt) + kn[2],
            W[3] * X0 + Y[3] * U0[3](dt) + kn[3],
            W[4] * X0 + Y[4] * U0[4](dt) + kn[4],
            W[5] * X0 + Y[5] * U0[5](dt) + kn[5],
          );
        },
        G0 = $(g0),
        K0 = n.grip("magSeat", {
          d: [-0.04, -0.11, 0.02],
        }),
        it = new Xs([
          {
            t: 0,
            ...K0,
          },
          {
            t: 0.17,
            ...K0,
          },
          {
            t: 0.34 - 0.06,
            ...lt,
            pass: !0,
          },
          {
            t: 0.34,
            ...F0,
            ease: "out",
          },
          {
            t: 0.52,
            ...F0,
          },
          {
            t: 0.52 + 0.045,
            ...lt,
            pass: !0,
          },
          {
            t: 0.52 + 0.085,
            ...Y0,
            pass: !0,
          },
          {
            t: 0.52 + 0.145,
            ...H0,
            pass: !0,
          },
          {
            t: 0.755 - 0.05,
            ...m0,
            pass: !0,
          },
          {
            t: 0.755,
            ...t0,
          },
        ]),
        ft = new Gs(w, [
          {
            t: 0.34 - 0.16,
            pose: O,
            dur: 0.055,
            stagger: 0.006,
          },
          {
            t: 0.34 - 0.04,
            pose: e.magSeat.pose,
            dur: 0.065,
            stagger: 0.012,
            from: "index",
            ease: "out",
          },
          {
            t: 0.52 - 0.01,
            pose: O,
            dur: 0.045,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.52 + 0.03,
            pose: w,
            dur: 0.05,
            stagger: 0.004,
            from: "little",
          },
          ...st(0.755, 0.115),
        ]),
        gt = (dt) =>
          0.0012 * vi(dt, 0.4, 1, 52, 22) -
          7e-4 * be(dt, 0.48 - 0.03, 0.48, 0.48 + 0.02, 0.48 + 0.07),
        rt = (dt) => be(dt, 0.4 - 0.04, 0.4, 0.48 + 0.02, 0.52);
      return (
        n.begin(z),
        f(
          "first",
          0.9,
          [ye(0.03, "cloth"), ye(0.4, "magin"), ye(0.755 - 0.04, "cloth")],
          (dt, tt) => {
            (g0(dt, tt),
              n.part("mag", 0, gt(dt), 0),
              n.hand("L", it, dt),
              n.pose("L", ft, dt));
            let X0 = t.clip.R.pose,
              ut = t.clip.L.pose,
              z0 = rt(dt);
            for (let I0 of [0, 4, 8])
              ((ut[I0 + 2] += 2.5 * z0), (ut[I0 + 3] += 1.5 * z0));
            ((ut[19] += 3 * z0),
              w0(
                X0,
                1.6 * be(dt, 0.4 - 0.05, 0.4 + 0.01, 0.48 + 0.06, 0.52 + 0.1) +
                  1.2 * be(dt, 0.755 - 0.02, 0.755 + 0.05, 0.755 + 0.08, 0.9),
              ),
              (X0[17] += 9 * be(dt, 0.56, 0.62, 0.66, 0.78)),
              (X0[16] -= 5 * be(dt, 0.56, 0.62, 0.66, 0.78)));
          },
        )
      );
    })(),
    L0 = (() => {
      let N = jt([
          [0, 0],
          [0.05, 0.008, "out"],
          [0.25, -0.32, "in"],
        ]),
        q = jt([
          [0, 0],
          [0.05, 0.03, "out"],
          [0.25, -0.8, "in"],
        ]),
        o0 = jt([
          [0.03, 0],
          [0.25, 1, "in"],
        ]),
        h0 = new Xs([
          I,
          {
            t: 0.06,
            ...n.grip("support"),
          },
          {
            t: 0.23,
            ...ot,
            ease: "in",
          },
        ]),
        y0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: R,
            dur: 0.07,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.13,
            pose: C,
            dur: 0.1,
          },
        ]);
      return f("holster", 0.25, [ye(0.02, "cloth")], (D, W) => {
        (n.gunAt(W, 0, N(D), 0.05 * o0(D), q(D), 0.2 * o0(D), 0.25 * o0(D)),
          n.hand("L", h0, D),
          n.pose("L", y0, D));
      });
    })(),
    ht = (() => {
      let y0 = 2.2800000000000002,
        D = y0 + 0.48,
        W = D + 0.1,
        Y = W + 0.52,
        R0 = Y - 0.02,
        U0 = jt([
          [0.05, 0],
          [0.5, 1, "back"],
          [1.36, 1],
          [1.92 - 0.06, 0, "io"],
        ]),
        $0 = jt([
          [1.36 + 0.04, 0],
          [1.92, 1, "back"],
          [W, 1],
          [Y, 0, "io"],
        ]),
        g0 = [
          d("iax", -0.045),
          d("iay", 0.062),
          d("iaz", -0.01),
          d("iarx", 0.22),
          d("iary", 0.95),
          d("iarz", -0.3),
        ],
        G0 = [
          d("ibx", 0.03),
          d("iby", -0.02),
          d("ibz", 0.03),
          d("ibrx", 0.1),
          d("ibry", 0),
          d("ibrz", 1.02),
        ],
        K0 = [
          d("pkx", -0.006),
          d("pky", 0.014),
          d("pkz", 0.03),
          d("pkrx", 0.05),
          d("pkry", -0.05),
          d("pkrz", 0.1),
        ],
        it = 0.026,
        ft = jt([
          [2.08 + 0.015, 0],
          [y0, 1, "io"],
          [D, 1],
          [D + 0.034, 0, "in"],
        ]),
        gt = (Et) => be(Et, y0 - 0.02, y0 + 0.14, D - 0.1, D + 0.02),
        rt = (Et) => be(Et, 0.04, 0.16, 0.24, 0.46),
        dt = Do(3.8, {
          n: 6,
          k: 260,
          c: 13,
          impulses: [
            {
              t: 1.36 + 0.08,
              v: [0, -0.03, 0, -0.1, 0, 0.1],
            },
            {
              t: 1.92 + 0.02,
              v: [0, 0.02, 0, 0.06, 0, -0.12],
            },
            {
              t: 2.08 + 0.02,
              v: [0, 0.01, 0.05, 0.06, 0.05, 0],
            },
            {
              t: D + 0.035,
              v: [0, 0, -0.07, -0.09, -0.06, 0.05],
            },
            {
              t: R0 - 0.02,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
          target: (Et, zt) => {
            let J = be(Et, 1.36, 1.56, R0 - 0.12, R0 + 0.03);
            ((zt[0] = zt[2] = zt[4] = 0),
              (zt[1] = -0.004 * J),
              (zt[3] = -0.02 * J),
              (zt[5] = 0.015 * J));
          },
        }),
        tt = (Et, zt) => {
          let J = U0(Et),
            Q = $0(Et),
            i0 = Math.sin(Et * 1.7) * 0.03 * Math.max(J, Q),
            A0 = gt(Et),
            N0 = rt(Et);
          (dt(Et, kn),
            n.gunAt(
              zt,
              g0[0] * J + G0[0] * Q + K0[0] * A0 + kn[0],
              g0[1] * J + G0[1] * Q + K0[1] * A0 + kn[1] + d("idy", -0.04) * N0,
              g0[2] * J + G0[2] * Q + K0[2] * A0 + kn[2],
              g0[3] * J + G0[3] * Q + K0[3] * A0 + kn[3] + d("idr", -0.14) * N0,
              (g0[4] + i0) * J + (G0[4] + i0 * 0.4) * Q + K0[4] * A0 + kn[4],
              g0[5] * J + G0[5] * Q + K0[5] * A0 + kn[5],
            ));
        },
        X0 = $(tt, (Et) => n.part("chargingHandle", 0, 0, ft(Et) * it));
      n.part("chargingHandle", 0, 0, it);
      let ut = K(
          n.grip("cock", {
            d: ct,
          }),
        ),
        z0 = K(
          n.grip("cock", {
            d: [ct[0] * 1.7 - 0.01, ct[1] * 1.7 - 0.03, 0.008],
          }),
        );
      n.part("chargingHandle", 0, 0, 0);
      let I0 = D0,
        vt = new Xs([
          I,
          {
            t: 1.36 - 0.06,
            ...t0,
          },
          ...T0(1.36 - 0.06, 1.36 + 0.05),
          {
            t: 1.36 + 0.34,
            ...n0(X0(S0, 1.36 + 0.05), X0(I0, 2.08 - 0.06), 0.55, [
              d("i1x", -0.05),
              d("i1y", -0.08),
              0.02,
            ]),
            pass: !0,
          },
          {
            t: 2.08 - 0.06,
            ...I0,
            pass: !0,
          },
          {
            t: 2.08,
            ...M0,
            ease: "out",
          },
          {
            t: D - 0.07,
            ...M0,
          },
          {
            t: D - 0.005,
            ...n.grip("cock", {
              d: ct,
            }),
          },
          {
            t: D,
            ...ut,
          },
          {
            t: D + 0.09,
            ...z0,
            pass: !0,
          },
          {
            t: D + 0.3,
            ...n0(X0(z0, D + 0.09), X0(m0, R0 - 0.06), 0.5, [
              d("i2x", -0.05),
              d("i2y", -0.08),
              0,
            ]),
            pass: !0,
          },
          {
            t: R0 - 0.06,
            ...m0,
            pass: !0,
          },
          {
            t: R0,
            ...t0,
          },
        ]),
        wt = m(e.support.pose, R, 0.55),
        _t = new Gs(e.support.pose, [
          {
            t: 0.64,
            pose: wt,
            dur: 0.12,
            stagger: 0.04,
            from: "little",
          },
          {
            t: 0.78,
            pose: e.support.pose,
            dur: 0.14,
            stagger: 0.04,
            from: "little",
            ease: "out",
          },
          {
            t: 1.36 - 0.12,
            pose: R,
            dur: 0.06,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 1.36 + 0.02,
            pose: w,
            dur: 0.07,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 2.08 - 0.12,
            pose: H,
            dur: 0.07,
            stagger: 0.004,
          },
          {
            t: 2.08 - 0.03,
            pose: e.cock.pose,
            dur: 0.05,
            stagger: 0.01,
            from: "index",
            ease: "out",
          },
          {
            t: D - 0.02,
            pose: F,
            dur: 0.06,
          },
          {
            t: D + 0.06,
            pose: w,
            dur: 0.09,
            stagger: 0.006,
          },
          ...st(R0, 0.2),
        ]),
        Pt = (Et) =>
          be(Et, 0.84, 0.91, 0.93, 1.02) + be(Et, 1.04, 1.1, 1.11, 1.2),
        bt = (Et) => be(Et, 1.36, 1.36 + 0.2, R0 - 0.14, R0 + 0.04);
      return (
        n.begin(z),
        f(
          "inspect",
          3.8,
          [
            ye(0.1, "cloth"),
            ye(1.36 + 0.04, "cloth"),
            ye(2.08 + 0.03, "slide"),
            ye(D - 0.05, "bolt"),
            ye(R0 - 0.2, "cloth"),
          ],
          (Et, zt) => {
            tt(Et, zt);
            let J = ft(Et) * it;
            (n.part("chargingHandle", 0, 0, J),
              n.part("bolt", 0, 0, J),
              n.part("chamberRound", 0, 0, J),
              n.hand("L", vt, Et),
              n.pose("L", _t, Et));
            let Q = t.clip.R.pose,
              i0 = Pt(Et);
            ((Q[0] -= 13 * i0), (Q[2] -= 5 * i0), w0(Q, 1.1 * bt(Et)));
          },
        )
      );
    })(),
    pt = (() => {
      let N = jt([
        [0, 0],
        [0.085, -0.22, "out"],
        [0.185, 1, "in"],
        [0.26, 0.9, "out"],
        [0.45, 0, "io"],
      ]);
      return f("melee", 0.45, [ye(0.03, "cloth")], (q, o0) => {
        let h0 = N(q),
          y0 = vi(q, 0.185, 1, 46, 17) * (1 - q / 0.45);
        n.gunAt(
          o0,
          -0.14 * h0,
          0.045 * h0 + 0.004 * y0,
          -0.2 * h0 + (h0 < 0 ? -0.2 * h0 : 0) + 0.006 * y0,
          0.2 * h0 - 0.02 * y0,
          1.46 * h0 + 0.03 * y0,
          -0.4 * h0 + 0.035 * y0,
        );
        let D = be(q, 0.02, 0.1, 0.26, 0.4),
          W = t.clip.R.pose,
          Y = t.clip.L.pose;
        for (let R0 of [6, 10, 14]) ((W[R0] += 2 * D), (W[R0 + 1] += 1.2 * D));
        for (let R0 of [2, 6, 10, 14]) Y[R0 + 1] += 1.5 * D;
      });
    })(),
    V0 = (() => {
      let o0 = [d("tpx", 0.03), d("tpy", -0.035), 0.02, -0.12, -0.1, 0.14],
        h0 = jt([
          [0.02, 0],
          [0.17, 1, "out"],
          [0.43, 1],
          [0.64, 0, "io"],
        ]),
        y0 = jt([
          [0, 0],
          [0.05, -0.08, "out"],
          [0.19, 1, "back"],
          [0.43, 1],
          [0.62, -0.05, "io"],
          [0.69, 0, "io"],
        ]),
        D = Do(0.7, {
          n: 6,
          k: 300,
          c: 15,
          impulses: [
            {
              t: 0.09,
              v: [0, -0.03, 0, -0.1, 0, 0.06],
            },
            {
              t: 0.33 - 0.03,
              v: [0.01, -0.03, -0.06, -0.12, 0.1, -0.16],
            },
            {
              t: 0.61,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
        }),
        W = (dt, tt) => {
          D(dt, kn);
          let X0 = h0(dt),
            ut = y0(dt);
          n.gunAt(
            tt,
            o0[0] * X0 + kn[0],
            o0[1] * X0 + kn[1],
            o0[2] * X0 + kn[2],
            o0[3] * X0 + kn[3],
            o0[4] * X0 + kn[4],
            o0[5] * ut + kn[5],
          );
        },
        Y = p0([-0.21, -0.36, -0.17], [0.3, -0.2, -0.93], [0.85, 0.45, 0.2]),
        R0 = p0(
          [d("twx", -0.19), d("twy", -0.15), d("twz", -0.36)],
          [0.2, 0.55, -0.81],
          [0.9, 0.1, 0.42],
        ),
        U0 = p0(
          [
            d("twx", -0.19) - 0.008,
            d("twy", -0.15) - 0.004,
            d("twz", -0.36) + 0.022,
          ],
          [0.18, 0.62, -0.76],
          [0.9, 0.1, 0.42],
        ),
        $0 = p0(
          [d("thx", -0.135), d("thy", -0.135), d("thz", -0.46)],
          [0.22, 0.2, -0.95],
          [0.55, -0.75, 0.3],
        ),
        g0 = p0([-0.115, -0.152, -0.5], [0.18, -0.3, -0.94], [0.1, -0.95, 0.3]),
        G0 = p0(
          [-0.118, -0.165, -0.49],
          [0.16, -0.38, -0.91],
          [0.1, -0.92, 0.38],
        ),
        K0 = $(W),
        it = new Xs([
          I,
          {
            t: 0.05,
            ...t0,
          },
          ...T0(0.05, 0.095),
          {
            t: 0.15,
            ...Y,
            pass: !0,
          },
          {
            t: 0.225,
            ...R0,
            ease: "out",
          },
          {
            t: 0.26,
            ...U0,
          },
          {
            t: 0.33,
            ...$0,
            pass: !0,
          },
          {
            t: 0.33 + 0.07,
            ...g0,
            ease: "out",
          },
          {
            t: 0.33 + 0.12,
            ...G0,
          },
          {
            t: 0.53,
            ...n0(G0, K0(m0, 0.585), 0.55, [
              d("tmx", -0.02),
              d("tmy", -0.06),
              0.03,
            ]),
            pass: !0,
          },
          {
            t: 0.585,
            ...m0,
            pass: !0,
          },
          {
            t: 0.635,
            ...t0,
          },
        ]),
        ft = new Gs(e.support.pose, [
          {
            t: 0,
            pose: R,
            dur: 0.05,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.08,
            pose: w,
            dur: 0.05,
            stagger: 0.005,
            from: "little",
          },
          {
            t: 0.13,
            pose: e.frag.pose,
            dur: 0.03,
            stagger: 0,
          },
          {
            t: 0.33 - 0.028,
            pose: _,
            dur: 0.05,
            stagger: 0.007,
            from: "little",
          },
          {
            t: 0.33 + 0.11,
            pose: w,
            dur: 0.09,
            stagger: 0.01,
            from: "little",
          },
          {
            t: 0.525,
            pose: R,
            dur: 0.045,
            stagger: 0.004,
          },
          {
            t: 0.575,
            pose: e.support.pose,
            dur: 0.085,
            stagger: 0.012,
            from: "index",
            ease: "out",
          },
        ]),
        gt = e.frag.at,
        rt = f(
          "throw",
          0.7,
          [ye(0.03, "cloth"), ye(0.54, "cloth")],
          (dt, tt) => {
            if (
              (W(dt, tt),
              n.hand("L", it, dt),
              n.pose("L", ft, dt),
              dt >= 0.14 && dt < 0.33)
            ) {
              let X0 = t.clip.L;
              ((c.visible = !0),
                c.position
                  .set(-gt[0], gt[1], gt[2])
                  .applyQuaternion(X0.quat)
                  .add(X0.pos),
                c.quaternion.copy(X0.quat).multiply(h));
            }
            w0(t.clip.R.pose, 1.5 * be(dt, 0.04, 0.12, 0.54, 0.66));
          },
        );
      return ((rt.releaseT = 0.33), rt);
    })(),
    c0 = (() => {
      let D = [
          d("k9x", 0.12),
          d("k9y", 0),
          0.02,
          d("k9rx", -0.55),
          d("k9ry", 0.1),
          d("k9rz", 0.3),
        ],
        W = ["io", "back", "io", "out", "io", "back"],
        R0 = [0.02, 0, 0.02, -0.01, 0.01, 0.02].map((z0, I0) =>
          jt([
            [0.02 + z0, 0],
            [0.25 + z0, 1, W[I0]],
            [3.1 + Math.abs(z0) * 0.5, 1],
            [
              3.1 + 0.22 + Math.abs(z0) * 0.5,
              I0 === 3 || I0 === 1 ? -0.07 : 0,
              "io",
            ],
            [3.4 - 0.01, 0, "io"],
          ]),
        ),
        U0 = Do(3.4, {
          n: 6,
          k: 280,
          c: 15,
          impulses: [
            {
              t: 0.1,
              v: [0, -0.03, 0, -0.1, 0, 0.06],
            },
            {
              t: 0.36 - 0.02,
              v: [0.02, -0.05, -0.06, -0.16, 0.1, -0.14],
            },
            {
              t: 0.36 + 0.27,
              v: [0, 0, -0.02, -0.04, 0.02, 0],
            },
            {
              t: 0.8,
              v: [0, 0.02, 0, 0.06, 0, 0.04],
            },
            {
              t: 3.1 + 0.24,
              v: [0, 0.02, 0, 0.05, 0, -0.04],
            },
          ],
        }),
        $0 = (z0) =>
          z0 < 0.98 ? 1 - e00(0.88, 0.98 - 0.01, z0) : z0 >= 3.1 ? 1 : 0,
        g0 = (z0, I0) => {
          U0(z0, kn);
          let vt = $0(z0);
          n.gunAt(
            I0,
            D[0] * R0[0](z0) + kn[0] * vt,
            D[1] * R0[1](z0) + kn[1] * vt,
            D[2] * R0[2](z0) + kn[2] * vt,
            D[3] * R0[3](z0) + kn[3] * vt,
            D[4] * R0[4](z0) + kn[4] * vt,
            D[5] * R0[5](z0) + kn[5] * vt,
          );
        },
        G0 = p0([-0.3, -0.5, -0.02], [0.1, -0.75, -0.65], [0.5, 0.5, -0.7]),
        K0 = p0([-0.23, -0.45, -0.2], [0.08, -0.8, -0.6], [0.1, 0.55, -0.83]),
        it = p0(
          [d("khx", -0.15), d("khy", -0.33), d("khz", -0.44)],
          [0.05, -0.72, -0.69],
          [0, 0.69, -0.72],
        ),
        ft = p0(
          [-0.135, -0.185, -0.54],
          [0.08, -0.36, -0.93],
          [0.15, -0.92, 0.36],
        ),
        gt = p0([-0.145, -0.175, -0.42], [0.14, 0.1, -0.98], [0.96, 0.1, 0.25]),
        rt = p0([-0.125, -0.18, -0.5], [0.14, -0.08, -0.99], [0.96, 0.1, 0.25]),
        dt = $(g0),
        tt = new Xs([
          I,
          {
            t: 0.05,
            ...t0,
          },
          ...T0(0.05, 0.11),
          {
            t: 0.2,
            ...G0,
          },
          {
            t: 0.29,
            ...K0,
            pass: !0,
          },
          {
            t: 0.36,
            ...it,
            pass: !0,
          },
          {
            t: 0.36 + 0.09,
            ...ft,
            ease: "out",
          },
          {
            t: 0.36 + 0.2,
            ...gt,
            ease: "io",
          },
          {
            t: 0.36 + 0.27,
            ...rt,
            ease: "in",
          },
          {
            t: 0.36 + 0.34,
            ...rt,
          },
          {
            t: 0.78,
            ...n0(rt, dt(m0, 0.84), 0.6, [
              d("kmx", -0.03),
              d("kmy", -0.105),
              0.04,
            ]),
            pass: !0,
          },
          {
            t: 0.84,
            ...m0,
            pass: !0,
          },
          {
            t: 0.89,
            ...t0,
          },
        ]),
        X0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: R,
            dur: 0.05,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.09,
            pose: w,
            dur: 0.06,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.16,
            pose: E,
            dur: 0.04,
          },
          {
            t: 0.36 - 0.035,
            pose: T,
            dur: 0.07,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.36 + 0.11,
            pose: S,
            dur: 0.08,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.36 + 0.34,
            pose: w,
            dur: 0.06,
            stagger: 0.005,
            from: "index",
          },
          {
            t: 0.745,
            pose: R,
            dur: 0.05,
            stagger: 0.004,
          },
          {
            t: 0.84,
            pose: e.support.pose,
            dur: 0.09,
            stagger: 0.012,
            from: "index",
            ease: "out",
          },
        ]),
        ut = f(
          "k9",
          3.4,
          [ye(0.03, "cloth"), ye(0.82, "cloth"), ye(3.1 + 0.02, "cloth")],
          (z0, I0) => {
            (g0(z0, I0),
              n.hand("L", tt, z0),
              n.pose("L", X0, z0),
              w0(t.clip.R.pose, 1.5 * be(z0, 0.04, 0.14, 0.84, 0.97)));
          },
        );
      return (
        (ut.releaseT = 0.36),
        (ut.holdFrom = 0.98),
        (ut.returnT = 0.3),
        ut
      );
    })();
  ((o.clips = {
    fire: x0,
    reload: B0(!1),
    reloadEmpty: B0(!0),
    draw: Q0,
    first: nt,
    holster: L0,
    inspect: ht,
    melee: pt,
    throw: V0,
    k9: c0,
  }),
    n.begin(z));
  let Z = {
      pos: Qn(0, 0, 0),
      rot: new Euler(),
    },
    r0 = o.root,
    b0 = () => Math.random() * 2 - 1,
    d0 = {
      ok: !1,
      t: 0,
      elbL: 0,
      prevFire: 1 / 0,
      shots: 0,
      heat: 0,
      jit: new Float64Array(6),
      elb: 0,
      stock: new Float64Array(6),
      mag: new Float64Array(4),
      magK: 1,
      sl: [
        {
          g: a.slingF,
          a: 0,
          w: 0,
          lo: -2.5,
          hi: 0.16,
          L: 0.011,
          p: Qn(0, 0, 0),
          v: Qn(0, 0, 0),
          ok: !1,
        },
        {
          g: a.slingR,
          a: 0,
          w: 0,
          lo: -2.4,
          hi: 0.1,
          L: 0.013,
          p: Qn(0, 0, 0),
          v: Qn(0, 0, 0),
          ok: !1,
        },
      ],
      pt: [
        {
          l: Qn(0, 0.031, 0.17),
          p: Qn(0, 0, 0),
          v: Qn(0, 0, 0),
          a: Qn(0, 0, 0),
        },
        {
          l: Qn(0, -0.11, -i.MAG_C0),
          p: Qn(0, 0, 0),
          v: Qn(0, 0, 0),
          a: Qn(0, 0, 0),
        },
      ],
      adsPrev: 0,
      seat: 9,
      unseat: 9,
      breath: 0,
      breathV: 0,
      sprPeak: 0,
      reg: 9,
      idle: 0,
      idleAt: 6.5,
      fid: 9,
      fidK: 0,
      shrug: 0,
      shrugV: 0,
      R: new Float32Array(Ui),
      L: new Float32Array(Ui),
      st: {
        rig: null,
        trigger: 0,
        ads: 0,
        sprint: 0,
        elbowR: Qn(0, 0, 0),
        elbowL: Qn(0, 0, 0),
      },
    },
    V = new Matrix4(),
    B = new Quaternion(),
    j = Qn(0, 0, 0),
    s0 = Qn(0, 0, 0),
    l0 = Qn(0, 0, 0),
    E0 = (N, q) => (N <= 0 ? 0 : (N / q) * Math.exp(1 - N / q)),
    U = () => {
      ((d0.ok = !1),
        d0.jit.fill(0),
        d0.stock.fill(0),
        d0.mag.fill(0),
        (d0.heat = 0),
        (d0.elb = 0),
        (d0.seat = d0.unseat = d0.reg = d0.fid = 9),
        (d0.breath = d0.breathV = d0.shrug = d0.shrugV = 0),
        (d0.prevFire = 1 / 0),
        (d0.sprPeak = 0),
        (d0.idle = 0));
      for (let N of d0.sl) ((N.ok = !1), (N.w = 0));
    };
  {
    let N = t.snap.bind(t);
    t.snap = () => {
      (N(), U());
    };
  }
  ((o.resetPose = () => {
    ((r = !1),
      (l.clip = null),
      (l.elbL = 0),
      (c.visible = !1),
      n.begin(Z),
      (s.magRounds.visible = !0),
      t.flush(null));
  }),
    (o.update = (N, q = {}) => {
      let o0 = t.touched,
        h0 = o0 ? l.clip : null;
      ((l.clip = null), o0 ? (d0.elbL = l.elbL) : N > 0 && (d0.elbL = 0));
      let y0 = d0.elbL,
        D = q.ads || 0,
        W = q.trigger || 0,
        Y = q.sprint || 0,
        R0 = r0.parent;
      if (((l.ads = D), N > 0 && N < 0.2)) {
        d0.t += N;
        let X0 = !1;
        h0 === "fire"
          ? (l.t <= d0.prevFire + 1e-6 && (X0 = !0), (d0.prevFire = l.t))
          : (d0.prevFire = 1 / 0);
        let ut = 1 - 0.55 * D;
        if (X0) {
          (d0.shots++, (d0.heat = Math.min(1, d0.heat + 0.22)));
          let vt = d0.jit,
            wt = d0.shots & 1 ? 1 : -1;
          ((vt[0] += b0() * 7e-4 * ut),
            (vt[1] += (3e-4 + b0() * 4e-4) * ut),
            (vt[3] += b0() * 0.003 * ut),
            (vt[4] += (wt * 0.0016 + b0() * 0.0022) * ut),
            (vt[5] += (wt * 0.005 + b0() * 0.0045) * ut),
            (d0.stock[3] += b0() * 0.55),
            (d0.stock[4] += wt * 0.35 + b0() * 0.4),
            (d0.stock[5] += -0.1),
            (d0.mag[2] += 0.5 + b0() * 0.5),
            (d0.mag[3] += b0() * 0.7));
          for (let _t of d0.sl)
            _t.w +=
              (1.5 + Math.random() * 2.5) * (Math.random() < 0.7 ? -1 : 0.4);
          d0.elb = 1;
        }
        let z0 = Math.exp(-N / 0.02);
        for (let vt = 0; vt < 6; vt++) d0.jit[vt] *= z0;
        if (
          ((d0.heat = Math.max(0, d0.heat - N * (W > 0.5 ? 0.8 : 2.6))),
          (d0.elb *= Math.exp(-N / 0.035)),
          R0)
        ) {
          (V.copy(R0.matrixWorld), B.setFromRotationMatrix(V).invert());
          let vt = !d0.ok;
          for (let J of d0.pt)
            (l0.copy(J.l).applyMatrix4(V),
              vt
                ? (J.p.copy(l0), J.v.set(0, 0, 0), J.a.set(0, 0, 0))
                : (j.copy(l0).sub(J.p).divideScalar(N),
                  J.a.copy(j).sub(J.v).divideScalar(N),
                  J.v.copy(j),
                  J.p.copy(l0),
                  J.a.lengthSq() > 3600 && J.a.setLength(60),
                  J.a.applyQuaternion(B)));
          s0.set(0, -9.81, 0).applyQuaternion(B);
          for (let J of d0.sl) {
            if (!J.g) continue;
            if ((l0.copy(J.g.position).applyMatrix4(V), !J.ok || vt)) {
              (J.p.copy(l0),
                J.v.set(0, 0, 0),
                (J.ok = !0),
                (J.a = lk(Math.atan2(s0.x, -s0.y), J.lo, J.hi)),
                (J.w = 0));
              continue;
            }
            j.copy(l0).sub(J.p).divideScalar(N);
            let Q = (j.x - J.v.x) / N,
              i0 = (j.y - J.v.y) / N,
              A0 = (j.z - J.v.z) / N;
            (J.v.copy(j),
              J.p.copy(l0),
              j.set(Q, i0, A0),
              j.lengthSq() > 3600 && j.setLength(60),
              j.applyQuaternion(B));
            let N0 = s0.x - j.x,
              mt = s0.y - j.y,
              xt = Math.max(1, Math.ceil(N / 0.004)),
              yt = N / xt;
            for (let Mt = 0; Mt < xt; Mt++)
              ((J.w +=
                ((N0 * Math.cos(J.a) + mt * Math.sin(J.a)) / J.L -
                  5.5 * J.w -
                  2 * Math.sign(J.w)) *
                yt),
                (J.a += J.w * yt),
                J.a > J.hi
                  ? ((J.a = J.hi), (J.w = -0.3 * J.w))
                  : J.a < J.lo && ((J.a = J.lo), (J.w = -0.3 * J.w)));
          }
          let wt = d0.pt[0].a,
            _t = d0.pt[1].a,
            Pt = Math.max(1, Math.ceil(N / 0.004)),
            bt = N / Pt,
            Et = d0.stock,
            zt = d0.mag;
          d0.magK +=
            ((h0 === "reload" || h0 === "reloadEmpty" || h0 === "first"
              ? 0
              : 1) -
              d0.magK) *
            (1 - Math.exp(-N * 14));
          for (let J = 0; J < Pt; J++) {
            ((Et[3] += (-3200 * Et[0] - 13 * Et[3] + 2.4 * wt.y) * bt),
              (Et[4] += (-3200 * Et[1] - 13 * Et[4] - 2.4 * wt.x) * bt),
              (Et[5] += (-5200 * Et[2] - 16 * Et[5] - 0.02 * wt.z) * bt),
              (zt[2] +=
                (-4800 * zt[0] - 12 * zt[2] + 3.4 * _t.z + 1.5 * _t.y) * bt),
              (zt[3] += (-4800 * zt[1] - 12 * zt[3] - 3.4 * _t.x) * bt));
            for (let Q = 0; Q < 3; Q++) Et[Q] += Et[Q + 3] * bt;
            ((zt[0] += zt[2] * bt), (zt[1] += zt[3] * bt));
          }
          for (let J = 0; J < 2; J++)
            (Math.abs(Et[J]) > 0.011 &&
              ((Et[J] = 0.011 * Math.sign(Et[J])), (Et[J + 3] *= -0.35)),
              Math.abs(zt[J]) > 0.013 &&
                ((zt[J] = 0.013 * Math.sign(zt[J])), (zt[J + 2] *= -0.35)));
          (Math.abs(Et[2]) > 7e-4 &&
            ((Et[2] = 7e-4 * Math.sign(Et[2])), (Et[5] *= -0.35)),
            (d0.ok = !0));
        }
        (D > 0.82 &&
          d0.adsPrev <= 0.82 &&
          ((d0.seat = 0), (d0.breathV -= 0.02)),
          D < 0.25 && d0.adsPrev >= 0.25 && (d0.unseat = 0),
          (d0.adsPrev = D),
          (d0.seat += N),
          (d0.unseat += N),
          (d0.breathV += (-52 * d0.breath - 5.2 * d0.breathV) * N),
          (d0.breath += d0.breathV * N),
          (d0.sprPeak = Math.max(d0.sprPeak - N * 0.4, Y)),
          Y < 0.3 &&
            d0.sprPeak > 0.8 &&
            ((d0.reg = 0), (d0.sprPeak = 0), (d0.shrugV += 0.9)),
          (d0.reg += N),
          (d0.shrugV += (-180 * d0.shrug - 15 * d0.shrugV) * N),
          (d0.shrug += d0.shrugV * N));
        let I0 = !o0 && W < 0.02 && D < 0.05 && Y < 0.05 && d0.reg > 1;
        ((d0.idle = I0 ? d0.idle + N : 0),
          I0 ||
            ((d0.idleAt = 5 + Math.random() * 4), d0.fid < 1.2 && (d0.fid = 9)),
          I0 &&
            d0.idle > d0.idleAt &&
            ((d0.fid = 0),
            (d0.fidK = (d0.fidK + 1 + (Math.random() < 0.3 ? 1 : 0)) % 3),
            (d0.idleAt = d0.idle + 5.5 + Math.random() * 5)),
          (d0.fid += N));
      }
      let $0 = d0.jit,
        g0 = d0.breath,
        G0 = d0.shrug;
      (r0.position.set($0[0], $0[1] + g0 * 0.35 - 0.012 * G0, $0[2]),
        r0.rotation.set($0[3] + g0 + 0.05 * G0, $0[4], $0[5] + 0.16 * G0));
      let K0 = t.clip.R.pose,
        it = t.clip.L.pose;
      (d0.R.set(K0), d0.L.set(it));
      let ft = d0.heat,
        gt = ft * ft * (3 - 2 * ft);
      if (
        (P0(it, 2.4 * gt),
        (it[16] += 3 * gt),
        (it[20] += 4 * gt),
        w0(K0, 1.2 * gt),
        d0.seat < 0.9)
      ) {
        let X0 = E0(d0.seat, 0.075);
        for (let ut = 0; ut < 4; ut++) {
          let z0 = E0(d0.seat - 0.018 * ut, 0.075),
            I0 = ut * 4;
          ((it[I0] += 1.8 * z0),
            (it[I0 + 2] += 2.6 * z0),
            ut > 0 && ((K0[I0] += 1.4 * z0), (K0[I0 + 2] += 2 * z0)));
        }
        ((it[19] += 2.5 * X0), (K0[19] += 3 * X0), (K0[20] += 3 * X0));
      }
      if (d0.unseat < 0.7) {
        let X0 = E0(d0.unseat, 0.12);
        for (let ut = 0; ut < 4; ut++)
          ((it[ut * 4 + 2] -= 2.2 * X0), (it[ut * 4 + 3] -= 1.2 * X0));
      }
      if (d0.reg < 0.8) {
        for (let ut = 0; ut < 4; ut++) {
          let z0 = lk((d0.reg - 0.04 - ut * 0.055) / 0.42, 0, 1),
            I0 = Math.sin(Math.PI * Math.pow(z0, 0.6)) * (1 - z0) * 2.4,
            vt = ut * 4;
          ((it[vt] -= 11 * I0),
            (it[vt + 2] -= 15 * I0),
            (it[vt + 3] -= 7 * I0));
        }
        let X0 = E0(d0.reg - 0.02, 0.1);
        ((it[17] += 9 * X0),
          (it[19] -= 6 * X0),
          w0(K0, 1.8 * E0(d0.reg - 0.16, 0.11)),
          (K0[17] += 7 * E0(d0.reg - 0.05, 0.1)));
      }
      if (d0.fid < 1.1) {
        let X0 = d0.fid;
        if (d0.fidK === 0) {
          let ut = be(X0, 0, 0.22, 0.4, 0.8);
          ((K0[17] += 13 * ut), (K0[16] -= 7 * ut), (K0[19] -= 9 * ut));
        } else if (d0.fidK === 1) {
          let ut = be(X0, 0, 0.09, 0.13, 0.25) + be(X0, 0.3, 0.39, 0.43, 0.56);
          ((K0[0] -= 7 * ut), (K0[2] -= 6 * ut));
        } else {
          let ut = be(X0, 0, 0.25, 0.45, 0.9);
          ((it[16] += 7 * ut),
            (it[18] += 9 * ut),
            (it[20] -= 6 * ut),
            (it[3] += 4 * ut));
        }
      }
      let rt = d0.st;
      ((rt.rig = q.rig),
        (rt.trigger = q.trigger),
        (rt.ads = D),
        (rt.sprint = Y),
        q.elbowR ? rt.elbowR.copy(q.elbowR) : rt.elbowR.set(0, 0, 0),
        q.elbowL ? rt.elbowL.copy(q.elbowL) : rt.elbowL.set(0, 0, 0),
        (rt.elbowR.z += 0.016 * d0.elb),
        (rt.elbowR.y -= 0.004 * d0.elb),
        (rt.elbowL.z += 0.022 * d0.elb),
        (rt.elbowL.y -= 0.02 * gt + 0.006 * d0.elb),
        (rt.elbowL.x += 0.01 * gt + d("elx", -0.09) * y0),
        (rt.elbowL.y += d("ely", 0.1) * y0),
        (rt.elbowL.z += d("elz", 0) * y0),
        t.update(N, rt),
        K0.set(d0.R),
        it.set(d0.L),
        a.stock &&
          (a.stock.rotation.set(d0.stock[0], d0.stock[1], 0),
          (a.stock.position.z = a.stock.userData.z0 + d0.stock[2])),
        a.magIn &&
          a.magIn.rotation.set(d0.mag[0] * d0.magK, 0, d0.mag[1] * d0.magK));
      for (let X0 of d0.sl) X0.g && (X0.g.rotation.z = X0.a);
      let dt = q.trigger != null,
        tt = (dt ? q.trigger : t.clip.press) * t.trig;
      s.trigger.quaternion.setFromAxisAngle(t00, b * tt);
    }),
    a.stock && (a.stock.userData.z0 = a.stock.position.z));
  let X = 0.052;
  ((o.spawnMag = () => {
    let N = s.mag,
      q = new Group();
    return (
      (q.name = "magProp"),
      N.traverse((o0) => {
        if (o0.isMesh && o0.parent.visible) {
          let h0 = new Mesh(o0.geometry, o0.material);
          ((h0.position.y = -X), q.add(h0));
        }
      }),
      q.quaternion.copy(N.quaternion),
      q.position.set(0, X, 0).applyQuaternion(N.quaternion).add(N.position),
      (r = !0),
      q
    );
  }),
    (o.showGrip = (N) => {
      o.resetPose();
      let q = e[N],
        o0 = t.clip[q.side];
      (o0.pos.copy(q.pos),
        o0.quat.copy(q.quat),
        o0.pose.set(q.pose),
        t.flush(null));
    }),
    o.resetPose());
}

export { Do, Gs, Mf, PO, Xs, be, buildCarbine, jt, vi, ye };

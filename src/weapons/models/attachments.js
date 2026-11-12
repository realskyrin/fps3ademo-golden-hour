// weapons/models/attachments.js: recovered from the verified GOLDEN HOUR release.
import {
  AddEquation,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  CustomBlending,
  DoubleSide,
  Euler,
  FrontSide,
  Matrix4,
  MeshStandardMaterial,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";
import { Qe, Zn, Zs, ao, bp, ds, jc, se, si, us } from "./geometry.js";
import { createCanvas } from "../../core/math.js";
import { Vn } from "../../vendor/geometry-utils.js";

var Hs = Math.PI / 180;
var Pn = Math.PI * 2;
var nF = new Quaternion();
var JH = new Euler();
var DQ = new Vector3();
var IQ = new Matrix4();
var tF = new Vector3();
var by = new Vector3();
var yy = new Vector3();
var HQ = new Vector3(0, 0, -1);
var wr = (o, t, e = {}) =>
  us(o, t, {
    b: 0.5,
    ...e,
  });
var jo = (o, t, e = {}) =>
  si(o, t, {
    b: 0.5,
    ...e,
  });
var oF = (o, t, e = {}) =>
  jc(o, t, {
    b: 0.5,
    ...e,
  });
var gl = (o, t, e = 0, s = 0, n = 0) => [
  [s - o / 2, n - t / 2, e],
  [s + o / 2, n - t / 2, e],
  [s + o / 2, n + t / 2, e],
  [s - o / 2, n + t / 2, e],
];
var yh = (o, t, e = 0, s = 0, n = 0) =>
  Array.from(
    {
      length: o,
    },
    (i, a) => [
      s + Math.cos(e + (a / o) * Pn) * t,
      n + Math.sin(e + (a / o) * Pn) * t,
    ],
  );
function b4(o, t, e) {
  return (
    e &&
      (JH.set(e[0] * Hs, e[1] * Hs, e[2] * Hs, "XYZ"),
      o.applyQuaternion(nF.setFromEuler(JH))),
    t && o.translate(t[0], t[1], -t[2]),
    o
  );
}
var FQ = {
  "x+": [1, 0, 0],
  "x-": [-1, 0, 0],
  "y+": [0, 1, 0],
  "y-": [0, -1, 0],
  "u+": [0, 0, -1],
  "u-": [0, 0, 1],
};
function _c(o, t, e) {
  let s = typeof t == "string" ? FQ[t] : t;
  return (
    o.applyQuaternion(
      nF.setFromUnitVectors(HQ, DQ.set(s[0], s[1], s[2]).normalize()),
    ),
    e && o.translate(e[0], e[1], -e[2]),
    o
  );
}
var OQ = {
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
function Ie(o, t, e, s = 0) {
  let [n, i] = typeof e == "string" ? OQ[e] : e;
  return (
    yy.set(n[0], n[1], n[2]).normalize(),
    by.set(i[0], i[1], i[2]),
    by.addScaledVector(yy, -by.dot(yy)).normalize(),
    tF.crossVectors(by, yy),
    s && o.rotateZ(s * Hs),
    o.applyMatrix4(IQ.makeBasis(tF, by, yy)),
    t && o.translate(t[0], t[1], -t[2]),
    o
  );
}
var tA = [0, 0];
var $c = class {
  constructor() {
    ((this.p = []), (this.n = []), (this.t = []), (this.c = []));
  }
  tri(t, e, s, n, i, a = 1) {
    let r = e[0] - t[0],
      l = e[1] - t[1],
      c = e[2] - t[2],
      h = s[0] - t[0],
      f = s[1] - t[1],
      u = s[2] - t[2],
      d = l * u - c * f,
      m = c * h - r * u,
      p = r * f - l * h,
      x = Math.hypot(d, m, p);
    if (x < 1e-7) return;
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
        : ((d /= x),
          (m /= x),
          (p /= x),
          this.n.push(d, m, p, d, m, p, d, m, p)));
    let g = i ? i[0] : tA,
      b = i ? i[1] : tA,
      v = i ? i[2] : tA;
    (this.t.push(g[0], g[1], b[0], b[1], v[0], v[1]),
      this.c.push(a, a, a, a, a, a, a, a, a));
  }
  quad(t, e, s, n, i, a, r = 1) {
    (this.tri(t, e, n, i && [i[0], i[1], i[3]], a && [a[0], a[1], a[3]], r),
      this.tri(e, s, n, i && [i[1], i[2], i[3]], a && [a[1], a[2], a[3]], r));
  }
  quadFacing(t, e, s, n, i, a = 1, r = !1) {
    let l = e[0] - t[0],
      c = e[1] - t[1],
      h = e[2] - t[2],
      f = n[0] - t[0],
      u = n[1] - t[1],
      d = n[2] - t[2],
      m = c * d - h * u,
      p = h * f - l * d,
      x = l * u - c * f;
    m * (i[0] - t[0]) + p * (i[1] - t[1]) + x * (i[2] - t[2]) >= 0 !== r
      ? this.quad(t, e, s, n, null, null, a)
      : this.quad(t, n, s, e, null, null, a);
  }
  geo() {
    let t = new BufferGeometry();
    return (
      t.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(this.p), 3),
      ),
      t.setAttribute(
        "normal",
        new BufferAttribute(new Float32Array(this.n), 3),
      ),
      t.setAttribute("uv", new BufferAttribute(new Float32Array(this.t), 2)),
      t.setAttribute("color", new BufferAttribute(new Float32Array(this.c), 3)),
      t
    );
  }
};
function cn(o, t = {}) {
  let e = t.flute || null,
    s = e ? (e.trap ? [0, 0, 1, 1] : [0, 1]) : [0],
    n = e ? e.n * s.length : t.seg || 24,
    i = o.length,
    a = Math.cos((t.crease ?? 32) * Hs),
    r = [];
  for (let p = 0; p < i - 1; p++) {
    let x = o[p + 1][0] - o[p][0],
      g = o[p + 1][1] - o[p][1],
      b = Math.hypot(x, g) || 1;
    r.push([-g / b, x / b]);
  }
  let l = 0;
  for (let p of o) l = Math.max(l, p[1]);
  let c = new $c(),
    h = t.x || 0,
    f = t.y || 0,
    u = (p, x) => {
      let g = o[p],
        b = Math.max(0, g[1] - (g[3] || 0) * s[x % s.length]),
        v = (x / n) * Pn;
      return [h + b * Math.cos(v), f + b * Math.sin(v), -g[0]];
    },
    d = (p, x) => {
      let g = p[0] + x[0],
        b = p[1] + x[1],
        v = Math.hypot(g, b) || 1;
      return [g / v, b / v];
    },
    m = 0;
  for (let p = 0; p < i - 1; p++) {
    let x = o[p],
      g = o[p + 1],
      b = Math.hypot(g[0] - x[0], g[1] - x[1]),
      v = e && ((x[3] || 0) > 0 || (g[3] || 0) > 0),
      y = r[p],
      M = r[p];
    (p > 0 &&
      r[p - 1][0] * r[p][0] + r[p - 1][1] * r[p][1] > a &&
      (y = d(r[p - 1], r[p])),
      p < i - 2 &&
        r[p + 1][0] * r[p][0] + r[p + 1][1] * r[p][1] > a &&
        (M = d(r[p + 1], r[p])));
    for (let w = 0; w < n; w++) {
      let T = u(p, w),
        S = u(p + 1, w),
        E = u(p + 1, w + 1),
        _ = u(p, w + 1),
        R = (w / n) * Pn,
        C = ((w + 1) / n) * Pn,
        L = [
          [R * l, m],
          [R * l, m + b],
          [C * l, m + b],
          [C * l, m],
        ],
        A = g[2] ? 2 : 1,
        O = null;
      if (v)
        e.wear &&
          s[w % s.length] === 0 &&
          s[(w + 1) % s.length] === 0 &&
          (A = 2);
      else if (!t.flat) {
        let H = Math.cos(R),
          F = Math.sin(R),
          P = Math.cos(C),
          z = Math.sin(C);
        O = [
          [y[1] * H, y[1] * F, -y[0]],
          [M[1] * H, M[1] * F, -M[0]],
          [M[1] * P, M[1] * z, -M[0]],
          [y[1] * P, y[1] * z, -y[0]],
        ];
      }
      c.quad(T, S, E, _, O, L, A);
    }
    m += b;
  }
  return c.geo();
}
var Zc = (o, t) => cn(o, t).rotateX(Math.PI);
function vh(o, t, e = {}) {
  let s = bp(o, t, {
    b: 0.3,
    ...e,
  });
  return (s.translate(0, 0, s.userData.b), Qe(s));
}
function iT(o) {
  let t = o.a00 ?? -90,
    e = o.step || 15,
    s = o.ch ?? 0.35,
    n = o.x || 0,
    i = o.y || 0,
    a = o.ports || [],
    r = o.rFn || (() => o.r),
    l = o.ri,
    c = 1e-4,
    h = s / o.r / Hs,
    f = (w, T, S, E) => {
      w = w
        .filter((R) => R >= T - E && R <= S + E)
        .map((R) => Math.min(S, Math.max(T, R)))
        .sort((R, C) => R - C);
      let _ = [];
      for (let R of w) (!_.length || R - _[_.length - 1] > E) && _.push(R);
      return _;
    },
    u = [];
  for (let w = 0; w <= 360 + c; w += e) u.push(t + w);
  let d = [o.u0, o.u1];
  for (let w of a)
    (u.push(w.a0, w.a1, w.a0 - h, w.a1 + h),
      d.push(w.u0, w.u1, w.u0 - s, w.u1 + s));
  for (let w of o.breaks || []) u.push(w);
  ((u = f(u, t, t + 360, 0.05)), (d = f(d, o.u0, o.u1, 0.01)));
  let m = (w, T) => a.some((S) => w > S.a0 && w < S.a1 && T > S.u0 && T < S.u1),
    p = (w, T) =>
      a.some(
        (S) =>
          w >= S.a0 - 0.02 &&
          w <= S.a1 + 0.02 &&
          T >= S.u0 - 0.002 &&
          T <= S.u1 + 0.002,
      ),
    x = (w, T, S) => [n + S * Math.cos(w * Hs), i + S * Math.sin(w * Hs), -T],
    g = (w, T) => r(w) - (p(w, T) ? s : 0),
    b = (w, T) => {
      let S = (w + T * 0.05) * Hs,
        E = r(w + T * 0.05),
        _ = (r(w + T * 0.05 + 0.02) - r(w + T * 0.05 - 0.02)) / (0.04 * Hs),
        R = _ * Math.sin(S) + E * Math.cos(S),
        C = -_ * Math.cos(S) + E * Math.sin(S),
        L = Math.hypot(R, C);
      return [R / L, C / L, 0];
    },
    v = new $c(),
    y = new $c(),
    M = [n, i];
  for (let w = 0; w < u.length - 1; w++) {
    let T = u[w],
      S = u[w + 1],
      E = (T + S) / 2,
      _ = b(T, 1),
      R = b(S, -1),
      C = [-Math.cos(T * Hs), -Math.sin(T * Hs), 0],
      L = [-Math.cos(S * Hs), -Math.sin(S * Hs), 0],
      A = -1,
      O = (P) => {
        if (A < 0) return;
        let z = d[A],
          k = d[P];
        (v.quad(
          x(T, z, r(T)),
          x(T, k, r(T)),
          x(S, k, r(S)),
          x(S, z, r(S)),
          [_, _, R, R],
          [
            [T * Hs * o.r, z],
            [T * Hs * o.r, k],
            [S * Hs * o.r, k],
            [S * Hs * o.r, z],
          ],
          1,
        ),
          (A = -1));
      },
      H = -1,
      F = (P) => {
        if (H < 0) return;
        let z = d[H],
          k = d[P];
        (y.quad(
          x(T, z, l),
          x(S, z, l),
          x(S, k, l),
          x(T, k, l),
          [C, L, L, C],
          null,
          1,
        ),
          (H = -1));
      };
    for (let P = 0; P < d.length - 1; P++) {
      let z = d[P],
        k = d[P + 1],
        I = (z + k) / 2;
      if (m(E, I)) {
        (O(P), F(P));
        continue;
      }
      if ((H < 0 && (H = P), p(T, z) || p(T, k) || p(S, z) || p(S, k))) {
        O(P);
        let K = [
            x(T, z, g(T, z)),
            x(T, k, g(T, k)),
            x(S, k, g(S, k)),
            x(S, z, g(S, z)),
          ],
          $ = p(T, z),
          n0 = p(S, k);
        $ !== n0
          ? (v.tri(K[0], K[1], K[3], null, null, 2),
            v.tri(K[1], K[2], K[3], null, null, 2))
          : (v.tri(K[0], K[1], K[2], null, null, 2),
            v.tri(K[0], K[2], K[3], null, null, 2));
      } else A < 0 && (A = P);
    }
    (O(d.length - 1), F(d.length - 1));
    for (let [P, z, k] of [
      [o.capRear, o.u0, 1],
      [o.capFront, o.u1, -1],
    ])
      !P ||
        m(E, z + k * 0.01) ||
        y.quadFacing(
          x(T, z, g(T, z)),
          x(S, z, g(S, z)),
          x(S, z, l),
          x(T, z, l),
          [n, i, -(z - k * 100)],
          1,
        );
  }
  for (let w of a) {
    let T = x((w.a0 + w.a1) / 2, (w.u0 + w.u1) / 2, (o.r + l) / 2);
    for (let _ = 0; _ < u.length - 1; _++) {
      let R = u[_],
        C = u[_ + 1];
      if (!(R < w.a0 - 0.02 || C > w.a1 + 0.02))
        for (let L of [w.u0, w.u1])
          L <= o.u0 + 0.01 ||
            L >= o.u1 - 0.01 ||
            y.quadFacing(
              x(R, L, r(R) - s),
              x(C, L, r(C) - s),
              x(C, L, l),
              x(R, L, l),
              T,
              1,
            );
    }
    let S = Math.max(w.u0, o.u0),
      E = Math.min(w.u1, o.u1);
    for (let _ of [w.a0, w.a1])
      y.quadFacing(
        x(_, S, r(_) - s),
        x(_, E, r(_) - s),
        x(_, E, l),
        x(_, S, l),
        T,
        1,
      );
  }
  return {
    outer: v.geo(),
    inner: y.geo(),
  };
}
function Qc(o, t, e, s = 1, n = {}) {
  if (o > t) {
    let h = o;
    ((o = t), (t = h));
  }
  let i = n.seg || 20,
    a = new $c(),
    r = n.x || 0,
    l = n.y || 0,
    c = [0, 0, -s];
  for (let h = 0; h < i; h++) {
    let f = (h / i) * Pn,
      u = ((h + 1) / i) * Pn,
      d = [r + t * Math.cos(f), l + t * Math.sin(f), -e],
      m = [r + t * Math.cos(u), l + t * Math.sin(u), -e],
      p = [r + o * Math.cos(u), l + o * Math.sin(u), -e],
      x = [r + o * Math.cos(f), l + o * Math.sin(f), -e];
    s > 0
      ? a.quad(d, x, p, m, [c, c, c, c], null, n.flag || 1)
      : a.quad(d, m, p, x, [c, c, c, c], null, n.flag || 1);
  }
  return a.geo();
}
function iF(o, t = {}) {
  let e = o.length,
    s = o[0].length,
    n = new Float32Array(e * s * 3),
    i = [];
  for (let p = 0; p < e; p++)
    for (let x = 0; x < s; x++) n.set(o[p][x], (p * s + x) * 3);
  for (let p = 0; p < e - 1; p++)
    for (let x = 0; x < s; x++) {
      let g = p * s + x,
        b = p * s + ((x + 1) % s),
        v = (p + 1) * s + ((x + 1) % s),
        y = (p + 1) * s + x;
      i.push(g, b, y, b, v, y);
    }
  let a = new BufferGeometry();
  (a.setAttribute("position", new BufferAttribute(n, 3)),
    a.setIndex(i),
    a.computeVertexNormals());
  let r = a.attributes.normal,
    l = 0;
  for (let p = 0; p < e; p++) {
    let x = 0,
      g = 0,
      b = 0;
    for (let v of o[p]) ((x += v[0]), (g += v[1]), (b += v[2]));
    ((x /= s), (g /= s), (b /= s));
    for (let v = 0; v < s; v++) {
      let y = o[p][v],
        M = p * s + v;
      l +=
        (y[0] - x) * r.getX(M) +
        (y[1] - g) * r.getY(M) +
        (y[2] - b) * r.getZ(M);
    }
  }
  let c = l < 0,
    h = new $c(),
    f = (p) => {
      let x = c ? -1 : 1;
      return [r.getX(p) * x, r.getY(p) * x, r.getZ(p) * x];
    },
    u = o.map((p) => {
      let x = [0];
      for (let g = 0; g < s; g++) {
        let b = p[g],
          v = p[(g + 1) % s];
        x.push(x[g] + Math.hypot(v[0] - b[0], v[1] - b[1], v[2] - b[2]));
      }
      return x;
    }),
    d = u[0].map((p, x) => u.reduce((g, b) => g + b[x], 0) / e),
    m = 0;
  for (let p = 0; p < e - 1; p++) {
    let x = Math.hypot(
        o[p + 1][0][0] - o[p][0][0],
        o[p + 1][0][1] - o[p][0][1],
        o[p + 1][0][2] - o[p][0][2],
      ),
      g = t.flag ? t.flag(p) : 1;
    for (let b = 0; b < s; b++) {
      let v = (b + 1) % s,
        y = p * s + b,
        M = p * s + v,
        w = (p + 1) * s + v,
        T = (p + 1) * s + b,
        S = o[p][b],
        E = o[p][v],
        _ = o[p + 1][v],
        R = o[p + 1][b],
        C = [
          [d[b], m],
          [d[b + 1], m],
          [d[b + 1], m + x],
          [d[b], m + x],
        ];
      c
        ? h.quad(
            S,
            R,
            _,
            E,
            [f(y), f(T), f(w), f(M)],
            [C[0], C[3], C[2], C[1]],
            g,
          )
        : h.quad(S, E, _, R, [f(y), f(M), f(w), f(T)], C, g);
    }
    m += x;
  }
  for (let [p, x, g] of [
    [t.capA, o[0], o[1]],
    [t.capB, o[e - 1], o[e - 2]],
  ]) {
    if (!p) continue;
    let b = [0, 0, 0],
      v = [0, 0, 0];
    for (let y = 0; y < s; y++)
      for (let M = 0; M < 3; M++)
        ((b[M] += x[y][M] / s), (v[M] += g[y][M] / s));
    for (let y = 0; y < s; y++) {
      let M = x[y],
        w = x[(y + 1) % s],
        T = M[0] - b[0],
        S = M[1] - b[1],
        E = M[2] - b[2],
        _ = w[0] - b[0],
        R = w[1] - b[1],
        C = w[2] - b[2],
        L = S * C - E * R,
        A = E * _ - T * C,
        O = T * R - S * _;
      L * (b[0] - v[0]) + A * (b[1] - v[1]) + O * (b[2] - v[2]) >= 0
        ? h.tri(b, M, w)
        : h.tri(b, w, M);
    }
  }
  return h.geo();
}
function Mh(o, t, e = {}) {
  let s = new CatmullRomCurve3(
      o.map((i) => new Vector3(i[0], i[1], -i[2])),
      !1,
      "centripetal",
    ),
    n = new TubeGeometry(s, e.seg || o.length * 4, t, e.radial || 6, !1);
  return Qe(n);
}
function y4(o, t, e = 1, s = {}) {
  let n = o.attributes.position,
    i = o.attributes.normal,
    a = n.count,
    r = new Float32Array(a * 3),
    l = s.x || 0,
    c = s.y || 0;
  for (let h = 0; h < a; h += 3) {
    let f = !0,
      u = [0, 0, 0];
    for (let m = 0; m < 3; m++)
      (Math.abs(i.getZ(h + m)) > (s.cone ?? 0.6) && (f = !1),
        (u[m] = Math.atan2(n.getY(h + m) - c, n.getX(h + m) - l)));
    if (!f) continue;
    let d = Math.max(u[0], u[1], u[2]);
    for (let m = 0; m < 3; m++) {
      d - u[m] > Math.PI && (u[m] += Pn);
      let p = Math.hypot(n.getX(h + m) - l, n.getY(h + m) - c),
        x = (Pn * (s.r || p)) / t;
      ((r[(h + m) * 3] = (u[m] / Pn) * t),
        (r[(h + m) * 3 + 1] = -n.getZ(h + m) / x),
        (r[(h + m) * 3 + 2] = e));
    }
  }
  return (o.setAttribute("aK", new BufferAttribute(r, 3)), o);
}
function aF(o, t, e = 4, s = {}) {
  let n = o.attributes.position,
    i = o.attributes.normal,
    a = n.count,
    r = new Float32Array(a * 3);
  for (let l = 0; l < a; l++)
    i.getZ(l) < (s.minZ ?? 0.5) ||
      ((r[l * 3] = n.getX(l) / t),
      (r[l * 3 + 1] = n.getY(l) / t),
      (r[l * 3 + 2] = e));
  return (o.setAttribute("aK", new BufferAttribute(r, 3)), o);
}
function nA(o, t) {
  let e = o.attributes.position,
    s = o.attributes.color;
  for (let n = 0; n < e.count; n++) {
    let i = t(e.getX(n), e.getY(n), e.getZ(n));
    i && s.setXYZ(n, s.getX(n) * i[0], s.getY(n) * i[1], s.getZ(n) * i[2]);
  }
  return o;
}
var Xr = (o) => new Color(o);
var NQ = {
  steel: {
    c: Xr(2829359),
    m: 0.88,
    r: 0.4,
    wear: 2,
  },
  oxide: {
    c: Xr(1513498),
    m: 0.85,
    r: 0.44,
    wear: 2.6,
  },
  bright: {
    c: Xr(9409174),
    m: 1,
    r: 0.27,
    wear: 1.25,
  },
  alu: {
    c: Xr(2434602),
    m: 0.62,
    r: 0.44,
    wear: 2.6,
  },
  aluLt: {
    c: Xr(3421755),
    m: 0.62,
    r: 0.42,
    wear: 2.2,
  },
  black: {
    c: Xr(263172),
    m: 1,
    r: 1,
    wear: 1,
  },
  matte: {
    c: Xr(657931),
    m: 0.75,
    r: 0.8,
    wear: 1.5,
  },
  rubber: {
    c: Xr(855310),
    m: 0.5,
    r: 0.84,
    wear: 1.15,
  },
  poly: {
    c: Xr(1447447),
    m: 0,
    r: 0.6,
    wear: 1.3,
  },
  brass: {
    c: Xr(12159548),
    m: 1,
    r: 0.28,
    wear: 1.15,
  },
  ti: {
    c: Xr(9078144),
    m: 0.95,
    r: 0.34,
    wear: 1.2,
  },
  soot: {
    c: Xr(789517),
    m: 0.35,
    r: 0.88,
    wear: 1.6,
  },
  glass: {
    c: Xr(263946),
    m: 0,
    r: 0.05,
    wear: 1,
  },
  amber: {
    c: Xr(2757126),
    m: 0,
    r: 0.06,
    wear: 1,
  },
  redGlass: {
    c: Xr(3802371),
    m: 0,
    r: 0.08,
    wear: 1,
  },
  white: {
    c: Xr(14211282),
    m: 0,
    r: 0.6,
    wear: 1,
  },
  redPaint: {
    c: Xr(11871772),
    m: 0,
    r: 0.5,
    wear: 1,
  },
};
var v4 = (o, t) => ({
  c: Xr(o),
  m: 0,
  r: 0.4,
  wear: 1,
  e: t,
});
var BQ = `
#ifdef USE_NORMALMAP_TANGENTSPACE
{
	vec2 kq = vK.xy;
	float kfw = max( fwidth( kq.x ), fwidth( kq.y ) ) + 1e-5;
	mat3 ktb = getTangentFrame( - vViewPosition, normal, kq );
	if ( vK.z > 0.5 ) {
		float kfade = 1.0 - smoothstep( 0.28, 0.85, kfw );
		float kw = kfw * 1.2 + 0.03;
		vec2 kg = vec2( 0.0 ); float kh = 0.5;
		if ( vK.z < 1.5 ) {
			vec2 kp = vec2( kq.x + kq.y, kq.x - kq.y );
			vec2 kt = fract( kp ) - 0.5; vec2 ka = abs( kt );
			kh = 1.0 - 2.0 * max( ka.x, ka.y );
			vec2 ks = clamp( kt / kw, -1.0, 1.0 ) * clamp( ( 0.5 - ka ) / kw, 0.0, 1.0 );
			vec2 gp = ka.x > ka.y ? vec2( -ks.x, 0.0 ) : vec2( 0.0, -ks.y );
			kg = vec2( gp.x + gp.y, gp.x - gp.y );
		} else if ( vK.z < 2.5 ) {
			float kt = fract( kq.x ) - 0.5; kh = 1.0 - 2.0 * abs( kt );
			kg = vec2( -clamp( kt / kw, -1.0, 1.0 ) * clamp( ( 0.5 - abs( kt ) ) / kw, 0.0, 1.0 ), 0.0 ) * 1.3;
		} else if ( vK.z < 3.5 ) {
			float kt = fract( kq.y ) - 0.5; kh = 1.0 - 2.0 * abs( kt );
			kg = vec2( 0.0, -clamp( kt / kw, -1.0, 1.0 ) * clamp( ( 0.5 - abs( kt ) ) / kw, 0.0, 1.0 ) ) * 1.3;
		} else {
			vec2 kc = kq; kc.x += 0.5 * mod( floor( kc.y ), 2.0 );
			vec2 kt = fract( kc ) - 0.5; float kd = length( kt );
			kh = 1.0 - smoothstep( 0.10, 0.44, kd );
			kg = kd > 1e-4 ? -( kt / kd ) * smoothstep( 0.06, 0.2, kd ) * ( 1.0 - smoothstep( 0.36, 0.46, kd ) ) * 1.5 : vec2( 0.0 );
		}
		normal = normalize( normal - ( ktb[ 0 ] * kg.x + ktb[ 1 ] * kg.y ) * kfade );
		diffuseColor.rgb *= mix( 1.0, 0.62 + 0.78 * kh * kh, kfade );
	}
}
#endif
`;
var eA = null;
function rF() {
  if (eA) return eA;
  let o = ao(),
    t = new MeshStandardMaterial({
      color: 16777215,
      metalness: 1,
      roughness: 1,
      vertexColors: !0,
      normalMap: o.steel.normalMap,
      roughnessMap: o.steel.roughnessMap,
      normalScale: new Vector2(0.2, 0.2),
    });
  return (
    (t.onBeforeCompile = (e) => {
      ((e.vertexShader = e.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute vec3 aMR;
attribute vec3 aK;
varying vec3 vMR;
varying vec3 vK;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vMR = aMR; vK = aK;`,
        )),
        (e.fragmentShader = e.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vMR;
varying vec3 vK;`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
roughnessFactor = clamp( roughnessFactor * vMR.y, 0.03, 1.0 );`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
metalnessFactor = vMR.x;`,
          )
          .replace(
            "#include <normal_fragment_maps>",
            `#include <normal_fragment_maps>
` + BQ,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
totalEmissiveRadiance += vColor.rgb * vMR.z;`,
          )));
    }),
    (t.customProgramCacheKey = () => "gh-att-hard-1"),
    (t.name = "att:hardware"),
    (t.userData = {
      base: new Color(2829359),
      wear: 1,
    }),
    (eA = t)
  );
}
var nT = "#b9bdc2";
var ua = "#e6e3da";
var eF = "#c9412f";
var oT = "#e2b320";
var sA = null;
function aT() {
  if (sA) return sA;
  let o = 2048,
    t = 1024,
    e = createCanvas(o, t),
    s = e.getContext("2d"),
    n = {};
  ((s.textBaseline = "middle"), (s.fillStyle = nT), (s.strokeStyle = nT));
  let i = (x, g = 600) =>
      `${g} ${x}px Bahnschrift, "Segoe UI", Arial, sans-serif`,
    a = 0,
    r = 0,
    l = 0,
    c = (x, g, b, v) => {
      if ((a + g > o && ((a = 0), (r += l + 4), (l = 0)), r + b > t))
        throw new Error("attachments: label atlas is full at " + x);
      (s.save(),
        s.translate(a, r),
        s.beginPath(),
        s.rect(0, 0, g, b),
        s.clip(),
        (s.fillStyle = nT),
        (s.strokeStyle = nT),
        (s.lineWidth = 3),
        v(g, b),
        s.restore(),
        (n[x] = [a / o, 1 - (r + b) / t, (a + g) / o, 1 - r / t, g / b]),
        (a += g + 4),
        (l = Math.max(l, b)));
    },
    h = (x, g, b, v, y, M) => {
      ((s.font = i(g, y)), M && (s.fillStyle = M), s.fillText(x, b, v));
    },
    f = (x, g, b, v, y = 7) => {
      let M = Math.atan2(v - g, b - x);
      (s.beginPath(),
        s.moveTo(x, g),
        s.lineTo(b - Math.cos(M) * y, v - Math.sin(M) * y),
        s.stroke(),
        s.beginPath(),
        s.moveTo(b, v),
        s.lineTo(b - Math.cos(M - 0.5) * y * 2, v - Math.sin(M - 0.5) * y * 2),
        s.lineTo(b - Math.cos(M + 0.5) * y * 2, v - Math.sin(M + 0.5) * y * 2),
        s.closePath(),
        s.fill());
    },
    u = (x, g, b, v, y, M, w = 3) => {
      for (let T = 0; T < v; T++) {
        let S = (T / v) * Pn - Math.PI / 2,
          E = T % y === 0 ? M * 1.8 : M;
        ((s.lineWidth = T % y === 0 ? w * 1.4 : w),
          s.beginPath(),
          s.moveTo(x + Math.cos(S) * b, g + Math.sin(S) * b),
          s.lineTo(x + Math.cos(S) * (b - E), g + Math.sin(S) * (b - E)),
          s.stroke());
      }
    },
    d = (x, g, b, v, y, M, w, T = 700) => {
      ((s.font = i(y, T)), (s.textAlign = "center"));
      for (let S = 0; S < x.length; S++) {
        let E = M + S * w;
        (s.save(),
          s.translate(g + Math.sin(E) * v, b - Math.cos(E) * v),
          s.rotate(E),
          s.fillText(x[S], 0, 0),
          s.restore());
      }
      s.textAlign = "left";
    };
  (c("kite", 300, 112, () => {
    (h("KITE", 84, 6, 46, 700),
      h("RDS-2 \xB7 2 MOA", 26, 9, 94),
      (s.lineWidth = 4),
      s.beginPath(),
      s.moveTo(214, 70),
      s.lineTo(250, 14),
      s.lineTo(286, 70),
      s.lineTo(250, 52),
      s.closePath(),
      s.stroke());
  }),
    c("kiteSN", 300, 40, () => {
      h("SN KR2-118406   GH-ARMS", 24, 4, 22);
    }),
    c("halo", 372, 112, () => {
      (h("HALO", 84, 6, 46, 700),
        (s.lineWidth = 5),
        s.beginPath(),
        s.arc(316, 44, 30, 0, Pn),
        s.stroke(),
        s.beginPath(),
        s.arc(316, 44, 5, 0, Pn),
        s.fill());
      for (let x = 0; x < 4; x++) {
        let g = (x * Math.PI) / 2;
        (s.beginPath(),
          s.moveTo(316 + Math.cos(g) * 30, 44 + Math.sin(g) * 30),
          s.lineTo(316 + Math.cos(g) * 42, 44 + Math.sin(g) * 42),
          s.stroke());
      }
      h("HOLOGRAPHIC WEAPON SIGHT", 22, 9, 96);
    }),
    c("haloSN", 330, 64, () => {
      (h("MODEL H1   SN 3310476", 24, 4, 18),
        h("GH-ARMS  \xB7  1\xD7 \xB7 68 MOA RING", 20, 4, 48));
    }),
    c("vantage", 430, 104, () => {
      (h("VANTAGE", 70, 6, 40, 700),
        h("2.5\xD732 PRISM  \xB7  FOV 12.4\xB0", 26, 9, 86));
    }),
    c("vantSN", 300, 40, () => {
      h("SN VP25-01937", 26, 4, 22);
    }),
    c("micro", 300, 76, () => {
      (h("KITE\xB7MICRO", 46, 4, 26, 700),
        h("3.25 MOA   SN KM-55218", 20, 6, 60));
    }),
    c("up", 120, 72, () => {
      (h("UP", 40, 6, 38, 700),
        (s.lineWidth = 5),
        s.beginPath(),
        s.arc(86, 40, 20, Math.PI * 0.9, Math.PI * 1.9),
        s.stroke(),
        f(100, 26, 106, 40, 6));
    }),
    c("rt", 120, 72, () => {
      (h("R", 40, 10, 38, 700),
        (s.lineWidth = 5),
        s.beginPath(),
        s.arc(76, 40, 20, Math.PI * 0.9, Math.PI * 1.9),
        s.stroke(),
        f(90, 26, 96, 40, 6));
    }),
    c("plus", 64, 64, () => {
      ((s.fillStyle = ua),
        s.fillRect(12, 27, 40, 10),
        s.fillRect(27, 12, 10, 40));
    }),
    c("minus", 64, 64, () => {
      ((s.fillStyle = ua), s.fillRect(12, 27, 40, 10));
    }),
    c("nv", 64, 64, () => {
      h("NV", 34, 8, 34, 700, ua);
    }),
    c("tri", 64, 64, () => {
      ((s.fillStyle = ua),
        s.beginPath(),
        s.moveTo(32, 10),
        s.lineTo(56, 52),
        s.lineTo(8, 52),
        s.closePath(),
        s.fill());
    }),
    c("ticks", 256, 256, () => {
      (u(128, 128, 124, 36, 3, 14),
        d("0369", 128, 128, 84, 34, 0, Math.PI / 2));
    }),
    c("dial", 256, 256, () => {
      (u(128, 128, 124, 16, 2, 12, 4),
        d("0123456N", 128, 128, 88, 34, 0, Pn / 8));
    }),
    c("modes", 256, 256, () => {
      ((s.fillStyle = ua),
        (s.strokeStyle = ua),
        u(128, 128, 122, 8, 2, 12, 5),
        (s.font = i(30, 700)),
        (s.textAlign = "center"));
      let x = ["OFF", "VIS", "IR", "DUAL"];
      for (let g = 0; g < 4; g++) {
        let b = -Math.PI * 0.42 + g * Math.PI * 0.28;
        (s.save(),
          s.translate(128 + Math.sin(b) * 84, 128 - Math.cos(b) * 84),
          s.rotate(b),
          s.fillText(x[g], 0, 0),
          s.restore());
      }
      s.textAlign = "left";
    }),
    c("batt", 210, 44, () => {
      h("CR2032  3V  +", 28, 4, 24);
    }),
    c("batt123", 210, 44, () => {
      h("CR123A  3V", 28, 4, 24);
    }),
    c("focus", 200, 44, () => {
      h("\u2212   0   +", 34, 22, 23, 700, ua);
    }),
    c("lock", 200, 44, () => {
      ((s.fillStyle = ua),
        (s.strokeStyle = ua),
        h("LOCK", 30, 70, 24, 700, ua),
        f(60, 22, 8, 22, 8));
    }),
    c("warnY", 320, 160, (x, g) => {
      ((s.fillStyle = oT),
        s.fillRect(0, 0, x, g),
        (s.fillStyle = "#0c0c0c"),
        (s.strokeStyle = "#0c0c0c"),
        s.fillRect(6, 6, x - 12, 34),
        h("DANGER", 30, 104, 24, 700, oT),
        (s.fillStyle = "#0c0c0c"),
        (s.lineWidth = 3));
      for (let b = 0; b < 12; b++) {
        let v = (b / 12) * Pn;
        (s.beginPath(),
          s.moveTo(50 + Math.cos(v) * 10, 98 + Math.sin(v) * 10),
          s.lineTo(
            50 + Math.cos(v) * (b % 2 ? 26 : 36),
            98 + Math.sin(v) * (b % 2 ? 26 : 36),
          ),
          s.stroke());
      }
      (s.beginPath(),
        s.arc(50, 98, 7, 0, Pn),
        s.fill(),
        h("LASER RADIATION", 24, 100, 62, 700),
        h("AVOID DIRECT EYE", 21, 100, 90, 600),
        h("EXPOSURE", 21, 100, 114, 600),
        h("635 nm / 850 nm  <5 mW  CLASS 3R", 15, 100, 142, 600));
    }),
    c("class", 236, 60, (x, g) => {
      ((s.fillStyle = oT),
        s.fillRect(0, 0, x, g),
        (s.fillStyle = "#0c0c0c"),
        h("CLASS 2 LASER PRODUCT", 19, 8, 20, 700),
        h("DO NOT STARE INTO BEAM", 17, 8, 43, 600));
    }),
    c("mono", 560, 92, () => {
      (h("MONOLITH", 78, 6, 44, 700),
        (s.lineWidth = 4),
        s.strokeRect(404, 12, 96, 58),
        h("QD", 40, 424, 42, 700));
    }),
    c("cal556", 300, 44, () => {
      h("CAL 5.56 NATO", 32, 4, 24);
    }),
    c("cal9", 300, 44, () => {
      h("CAL 9\xD719 MM", 32, 4, 24);
    }),
    c("cal12", 300, 44, () => {
      h("12 GAUGE", 32, 4, 24);
    }),
    c("suppSN", 420, 44, () => {
      h("SN MS-04417   GH-ARMS", 30, 4, 24);
    }),
    c("suppWarn", 520, 36, () => {
      h("ENSURE MOUNT IS LOCKED BEFORE FIRING", 22, 4, 19);
    }),
    c("choke", 620, 52, () => {
      h("FULL  \xB7  .690  \xB7  12 GA  \xB7  STEEL OK", 36, 4, 28, 700);
    }),
    c("comp", 170, 40, () => {
      h("PC-556", 30, 4, 22, 700);
    }),
    c("brake", 170, 40, () => {
      h("SB-3M", 30, 4, 22, 700);
    }),
    c("vfg", 250, 90, () => {
      ((s.lineWidth = 5),
        s.strokeRect(6, 8, 74, 70),
        h("GH", 46, 14, 45, 700),
        h("VFG-2", 48, 96, 44, 700));
    }),
    c("afg", 250, 90, () => {
      ((s.lineWidth = 5),
        s.strokeRect(6, 8, 74, 70),
        h("GH", 46, 14, 45, 700),
        h("AFG-K", 48, 96, 44, 700));
    }),
    c("tl1", 300, 84, () => {
      (h("TL-1", 60, 4, 32, 700, ua),
        h("TAC LASER  \xB7  VIS / IR", 22, 6, 68, 600, ua));
    }),
    c("fire", 110, 40, () => {
      h("FIRE", 32, 6, 22, 700, ua);
    }),
    c("el", 110, 44, () => {
      ((s.fillStyle = ua),
        (s.strokeStyle = ua),
        h("EL", 30, 4, 24, 700, ua),
        f(62, 34, 62, 8, 6),
        f(88, 8, 88, 36, 6));
    }),
    c("wd", 110, 44, () => {
      ((s.fillStyle = ua),
        (s.strokeStyle = ua),
        h("WD", 28, 4, 24, 700, ua),
        f(64, 14, 104, 14, 6),
        f(104, 32, 64, 32, 6));
    }),
    c("remote", 150, 36, () => {
      h("REMOTE", 26, 4, 20, 700, ua);
    }),
    c("redDot", 40, 40, () => {
      ((s.fillStyle = eF), s.beginPath(), s.arc(20, 20, 15, 0, Pn), s.fill());
    }),
    c("whiteDot", 40, 40, () => {
      ((s.fillStyle = ua), s.beginPath(), s.arc(20, 20, 15, 0, Pn), s.fill());
    }),
    c("line", 40, 40, () => {
      ((s.fillStyle = ua), s.fillRect(0, 0, 40, 40));
    }),
    c("redLine", 40, 40, () => {
      ((s.fillStyle = eF), s.fillRect(0, 0, 40, 40));
    }),
    c("whiteLine", 40, 40, () => {
      ((s.fillStyle = "#d9d4c6"), s.fillRect(0, 0, 40, 40));
    }),
    c("yelLine", 40, 40, () => {
      ((s.fillStyle = oT), s.fillRect(0, 0, 40, 40));
    }));
  let m = new CanvasTexture(e);
  ((m.anisotropy = 8), (m.colorSpace = SRGBColorSpace));
  let p = new MeshStandardMaterial({
    map: m,
    color: 16777215,
    transparent: !0,
    roughness: 0.55,
    metalness: 0.15,
    depthWrite: !1,
    polygonOffset: !0,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  return (
    (p.name = "att:marks"),
    (p.userData = {
      base: new Color(6974576),
      wear: 1,
      cells: n,
    }),
    (sA = p)
  );
}
function An(o, t, e) {
  let s = aT().userData.cells[o];
  if (!s) throw new Error("attachments: unknown label " + o);
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
function M4(o, t, e, s = {}) {
  let n = aT().userData.cells[o];
  if (!n) throw new Error("attachments: unknown label " + o);
  let i = s.h || e / n[4],
    a = (s.phi ?? 180) * Hs,
    r = s.u || 0,
    l = s.x || 0,
    c = s.y || 0,
    h = t + 0.05,
    f = new $c(),
    u = s.along !== !1,
    d = u ? i : e,
    m = Math.max(2, Math.ceil(d / t / (9 * Hs))),
    p =
      Math.cos(a) < -1e-6 || (Math.abs(Math.cos(a)) <= 1e-6 && s.flip) ? 1 : -1;
  for (let x = 0; x < m; x++) {
    let g = x / m,
      b = (x + 1) / m,
      v = [];
    for (let [y, M] of u
      ? [
          [0, g],
          [1, g],
          [1, b],
          [0, b],
        ]
      : [
          [g, 0],
          [b, 0],
          [b, 1],
          [g, 1],
        ]) {
      let w, T;
      (u
        ? ((w = a - (p * (M - 0.5) * i) / t), (T = -r + p * (y - 0.5) * e))
        : ((w = a - ((y - 0.5) * e) / t), (T = -(r + (M - 0.5) * i))),
        v.push({
          p: [l + h * Math.cos(w), c + h * Math.sin(w), T],
          n: [Math.cos(w), Math.sin(w), 0],
          t: [n[0] + y * (n[2] - n[0]), n[1] + M * (n[3] - n[1])],
        }));
    }
    for (let [y, M, w] of [
      [v[0], v[1], v[2]],
      [v[0], v[2], v[3]],
    ]) {
      let T = M.p[0] - y.p[0],
        S = M.p[1] - y.p[1],
        E = M.p[2] - y.p[2],
        _ = w.p[0] - y.p[0],
        R = w.p[1] - y.p[1],
        C = w.p[2] - y.p[2];
      (S * C - E * R) * y.n[0] + (E * _ - T * C) * y.n[1] > 0
        ? f.tri(y.p, M.p, w.p, [y.n, M.n, w.n], [y.t, M.t, w.t])
        : f.tri(y.p, w.p, M.p, [y.n, w.n, M.n], [y.t, w.t, M.t]);
    }
  }
  return f.geo();
}
function sF(o, t, e, s, n) {
  let i = o.attributes.color.array;
  for (let a = 0; a < i.length; a += 3) {
    let r = i[a] > 1.5 ? n : 1;
    ((i[a] = t * r), (i[a + 1] = e * r), (i[a + 2] = s * r));
  }
}
function Jc(o) {
  let t = {
      body: [],
      hard: [],
      mark: [],
      lens: [],
    },
    e = (o && o.userData.wear) || 1,
    s = {
      body(...n) {
        for (let i of n.flat()) i && (sF(i, 1, 1, 1, e), t.body.push(i));
        return s;
      },
      hard(n, ...i) {
        let a = typeof n == "string" ? NQ[n] : n;
        if (!a) throw new Error("attachments: unknown look " + n);
        for (let r of i.flat()) {
          if (!r) continue;
          sF(r, a.c.r, a.c.g, a.c.b, a.wear || 1);
          let l = r.attributes.position.count,
            c = new Float32Array(l * 3);
          for (let h = 0; h < l; h++)
            ((c[h * 3] = a.m), (c[h * 3 + 1] = a.r), (c[h * 3 + 2] = a.e || 0));
          (r.setAttribute("aMR", new BufferAttribute(c, 3)),
            r.attributes.aK ||
              r.setAttribute(
                "aK",
                new BufferAttribute(new Float32Array(l * 3), 3),
              ),
            t.hard.push(r));
        }
        return s;
      },
      mark(...n) {
        for (let i of n.flat()) i && t.mark.push(i);
        return s;
      },
      lens(...n) {
        for (let i of n.flat()) i && t.lens.push(i);
        return s;
      },
      screw(n, i, a = {}) {
        let r = a.r || 1.9,
          l = a.h ?? 0.8,
          c = Math.min(0.35, l * 0.45, r * 0.3),
          h = a.seg || 10,
          f = a.drive || "torx";
        s.hard(
          a.look || "oxide",
          Ie(
            Zc(
              [
                [0, r],
                [l - c, r],
                [l, r - c, 1],
                [l, 0],
              ],
              {
                seg: h,
              },
            ),
            n,
            i,
          ),
        );
        let u = null;
        if (f === "hex") u = yh(6, r * 0.56, a.roll ? a.roll * Hs : 0.3);
        else if (f === "torx")
          u = Array.from(
            {
              length: 12,
            },
            (d, m) => {
              let p = (m / 12) * Pn + 0.2,
                x = m % 2 ? r * 0.34 : r * 0.62;
              return [Math.cos(p) * x, Math.sin(p) * x];
            },
          );
        else if (f === "slot") {
          let d = (a.roll || 0) * Hs,
            m = Math.cos(d),
            p = Math.sin(d),
            x = r * 0.86,
            g = Math.max(0.22, r * 0.16);
          u = [
            [-x, -g],
            [x, -g],
            [x, g],
            [-x, g],
          ].map(([b, v]) => [b * m - v * p, b * p + v * m]);
        }
        if (u) {
          let d = new Shape();
          d.moveTo(u[0][0], u[0][1]);
          for (let p = 1; p < u.length; p++) d.lineTo(u[p][0], u[p][1]);
          d.closePath();
          let m = new ShapeGeometry(d);
          (m.translate(0, 0, l + 0.02), s.hard("black", Ie(Qe(m), n, i)));
        }
        return s;
      },
      stripe(n, i, a = 4.2, r = 30, l = "redLine") {
        let c = An(l, a, 0.55);
        return (c.translate(a * 0.32, 0, 0), s.mark(Ie(c, n, i, r)), s);
      },
      finish() {
        let n = {
          tris: 0,
          parts: {},
        };
        for (let i in t) {
          if (!t[i].length) {
            n[i] = null;
            continue;
          }
          let a =
              i === "body"
                ? ["position", "normal", "uv", "color"]
                : i === "hard"
                  ? ["position", "normal", "uv", "color", "aMR", "aK"]
                  : i === "mark"
                    ? ["position", "normal", "uv"]
                    : ["position", "normal", "aGlass"],
            r = t[i].map((c) => {
              c.index && (c = c.toNonIndexed());
              for (let h of Object.keys(c.attributes))
                a.includes(h) || c.deleteAttribute(h);
              for (let h of a)
                if (!c.attributes[h])
                  throw new Error(`attachments: ${i} part without ${h}`);
              return ((c.morphAttributes = {}), c.clearGroups(), c);
            }),
            l = r.length > 1 ? Vn(r, !1) : r[0];
          if ((l.scale(0.001, 0.001, 0.001), l.attributes.uv)) {
            let c = l.attributes.uv.array;
            for (let h = 0; h < c.length; h++) c[h] *= i === "mark" ? 1 : 0.001;
          }
          (l.computeBoundingBox(),
            l.computeBoundingSphere(),
            (n[i] = l),
            (n.parts[i] = l.attributes.position.count / 3),
            (n.tris += n.parts[i]));
        }
        return n;
      },
    };
  return s;
}
function lF(o, t, e, s = 1, n = 20.6) {
  let i = [
    [o, e + s * 7.5],
    [o, e + s * 3.3],
  ];
  for (let a = o + 2.4; a + 5.2 < t - 1.2; a += 10)
    i.push([a, e + s * 3.3], [a, e], [a + 5.2, e], [a + 5.2, e + s * 3.3]);
  return (
    i.push([t, e + s * 3.3], [t, e + s * 7.5]),
    wr(i, n, {
      b: 0.45,
    })
  );
}
function rT(o, t, e = {}) {
  let s = e.hw || 14.3,
    n = e.top ?? 9,
    i = e.u0 ?? -t / 2;
  o.body(
    jo(
      [
        [-10.4, 0],
        [-10.4, -5.4],
        [-12.4, -5.4, 0.5],
        [-16, -2.4, 0.8],
        [-16, 5.2, 0.8],
        [-s, 7.4, 0.5],
        [-s, n],
        [s, n],
        [s, 3.2],
        [10.4, 3.2],
        [10.4, 0],
      ],
      t,
      {
        u: i,
        b: 0.5,
      },
    ),
  );
  let a = t - (e.inset ?? 6);
  o.body(
    jo(
      [
        [10.45, 2.9],
        [16.2, 2.9, 0.8],
        [16.2, -2.4, 0.8],
        [12.6, -5.4, 0.5],
        [10.45, -5.4],
      ],
      a,
      {
        u: i + (t - a) / 2,
        b: 0.5,
      },
    ),
  );
}
function cF(o, t, e, s = {}) {
  let n = s.hw || 14.3,
    i = e - (s.depth ?? 9),
    a = s.u0 ?? -t / 2,
    r = (h) => e - h,
    l = (h) => (s.look ? o.hard(s.look, h) : o.body(h));
  l(
    jo(
      [
        [-10.4, r(0)],
        [-10.4, r(-5.4)],
        [-12.4, r(-5.4), 0.5],
        [-16, r(-2.4), 0.8],
        [-16, r(5.2), 0.8],
        [-n, r(7.4), 0.5],
        [-n, i],
        [n, i],
        [n, r(3.2)],
        [10.4, r(3.2)],
        [10.4, r(0)],
      ],
      t,
      {
        u: a,
        b: 0.5,
      },
    ),
  );
  let c = t - (s.inset ?? 6);
  l(
    jo(
      [
        [10.45, r(2.9)],
        [16.2, r(2.9), 0.8],
        [16.2, r(-2.4), 0.8],
        [12.6, r(-5.4), 0.5],
        [10.45, r(-5.4)],
      ],
      c,
      {
        u: a + (t - c) / 2,
        b: 0.5,
      },
    ),
  );
}
function w4(o, t, e = {}) {
  let s = o / 2 / Math.cos(Math.PI / 6),
    n = Math.min(0.6, t * 0.3);
  return cn(
    [
      [0, s],
      [t - n, s],
      [t, s - n * 1.2, 1],
      [t, e.bore ?? 0],
    ],
    {
      seg: 6,
      flat: !0,
    },
  ).rotateX(Math.PI);
}
function oA(o, t, e, s = 5) {
  let n = [],
    i = o / 2,
    a = t / 2;
  e = Math.min(e, i, a);
  for (let [r, l, c] of [
    [i - e, a - e, 0],
    [-i + e, a - e, 0.25],
    [-i + e, -a + e, 0.5],
    [i - e, -a + e, 0.75],
  ])
    for (let h = 0; h <= s; h++) {
      let f = (c + (h / s) * 0.25) * Pn;
      n.push([r + Math.cos(f) * e, l + Math.sin(f) * e]);
    }
  return n;
}
var iA = (o, t = 28) =>
  Array.from(
    {
      length: t,
    },
    (e, s) => [Math.cos((s / t) * Pn) * o, Math.sin((s / t) * Pn) * o],
  );
function fF(o, t) {
  let e = new Float32Array(o.length * 3),
    s = new Map(),
    n = [],
    i = (h) => {
      let f =
          Math.round(h[0] * 1e4) +
          "," +
          Math.round(h[1] * 1e4) +
          "," +
          Math.round(h[2] * 1e4),
        u = s.get(f);
      return (
        u === void 0 && ((u = n.length), s.set(f, u), n.push([0, 0, 0])),
        u
      );
    },
    a = o.map(i);
  for (let h = 0; h < o.length; h += 3) {
    let f = o[h],
      u = o[h + 1],
      d = o[h + 2],
      m = [
        (u[1] - f[1]) * (d[2] - f[2]) - (u[2] - f[2]) * (d[1] - f[1]),
        (u[2] - f[2]) * (d[0] - f[0]) - (u[0] - f[0]) * (d[2] - f[2]),
        (u[0] - f[0]) * (d[1] - f[1]) - (u[1] - f[1]) * (d[0] - f[0]),
      ];
    for (let p = 0; p < 3; p++) {
      let x = n[a[h + p]];
      ((x[0] += m[0]), (x[1] += m[1]), (x[2] += m[2]));
    }
  }
  let r = new Float32Array(o.length * 3),
    l = new Float32Array(o.length).fill(t);
  o.forEach((h, f) => {
    e.set(h, f * 3);
    let u = n[a[f]],
      d = Math.hypot(u[0], u[1], u[2]) || 1;
    r.set([u[0] / d, u[1] / d, u[2] / d], f * 3);
  });
  let c = new BufferGeometry();
  return (
    c.setAttribute("position", new BufferAttribute(e, 3)),
    c.setAttribute("normal", new BufferAttribute(r, 3)),
    c.setAttribute("aGlass", new BufferAttribute(l, 1)),
    c
  );
}
function Hu(o, t = {}) {
  let e = o.r ? iA(o.r, o.n || 28) : oA(o.w, o.h, o.rc || 0, 5),
    s = t.x || 0,
    n = t.y || 0,
    i = t.back ? 1 : -1,
    a = -(t.u || 0),
    r = t.bulge || 0,
    l = [0.5, 1],
    c = [],
    h = (d, m) => {
      let p = e[(d + e.length) % e.length];
      return [s + p[0] * m, n + p[1] * m, a + i * r * (1 - m * m)];
    },
    f = (d, m, p) => {
      t.back ? c.push(d, m, p) : c.push(d, p, m);
    },
    u = [s, n, a + i * r];
  for (let d = 0; d < e.length; d++) {
    f(u, h(d, l[0]), h(d + 1, l[0]));
    for (let m = 0; m < l.length - 1; m++) {
      let p = h(d, l[m]),
        x = h(d + 1, l[m]),
        g = h(d + 1, l[m + 1]),
        b = h(d, l[m + 1]);
      (f(p, b, g), f(p, g, x));
    }
  }
  return fF(c, t.kind ?? 0);
}
function S5(o, t, e = {}) {
  let s = o.r ? iA(o.r, o.n || 28) : oA(o.w, o.h, o.rc || 0, 5),
    n = o.r
      ? iA(o.r - t, o.n || 28)
      : oA(o.w - 2 * t, o.h - 2 * t, Math.max(0.2, (o.rc || 0) - t), 5),
    i = e.x || 0,
    a = e.y || 0,
    r = [];
  for (let l = 0; l < s.length; l++) {
    let c = (l + 1) % s.length,
      h = [i + s[l][0], a + s[l][1], -e.u0],
      f = [i + s[c][0], a + s[c][1], -e.u0],
      u = [i + n[c][0], a + n[c][1], -e.u1],
      d = [i + n[l][0], a + n[l][1], -e.u1];
    e.back ? r.push(h, f, u, h, u, d) : r.push(h, u, f, h, d, u);
  }
  return fF(r, 2);
}
var UQ = `
attribute float aGlass;
uniform vec3 uCenter;
varying vec3 vView; varying vec3 vN; varying vec3 vF; varying vec3 vR; varying vec3 vU; varying vec3 vC; varying vec3 vLocal; varying float vGlass;
void main() {
	vec4 p = modelViewMatrix * vec4( position, 1.0 );
	vView = p.xyz;
	vF = normalize( ( modelViewMatrix * vec4( 0.0, 0.0, -1.0, 0.0 ) ).xyz );
	vR = normalize( ( modelViewMatrix * vec4( 1.0, 0.0, 0.0, 0.0 ) ).xyz );
	vU = normalize( ( modelViewMatrix * vec4( 0.0, 1.0, 0.0, 0.0 ) ).xyz );
	vC = ( modelViewMatrix * vec4( uCenter, 1.0 ) ).xyz;
	vN = normalMatrix * normal;
	vLocal = position; vGlass = aGlass;
	gl_Position = projectionMatrix * p;
}`;
var VQ = `
uniform vec3 uColor; uniform float uBright; uniform vec4 uTint; uniform vec4 uCoat; uniform vec4 uRet; uniform vec4 uScope; uniform vec3 uCenter; uniform float uObjR;
varying vec3 vView; varying vec3 vN; varying vec3 vF; varying vec3 vR; varying vec3 vU; varying vec3 vC; varying vec3 vLocal; varying float vGlass;
// what the glass mirrors, in the gun's own frame (x right, y up, z back): teal sky, warm horizon, a low orange sun
// behind the shooter's left shoulder
vec3 envMap( vec3 r ) {
	vec3 c = mix( vec3( 0.075, 0.055, 0.042 ), vec3( 0.15, 0.25, 0.36 ), smoothstep( -0.3, 0.6, r.y ) );
	// a run of tall sunset-lit windows all around (bright panes, dark mullions), strongest towards the sun
	float az = atan( r.x, r.z );
	float pane = smoothstep( 0.15, 0.5, sin( az * 7.0 + 0.9 ) );
	float band = smoothstep( -0.16, -0.05, r.y ) * ( 1.0 - smoothstep( 0.38, 0.5, r.y ) );
	float sunSide = 0.22 + 0.78 * max( 0.0, dot( normalize( r.xz + 1e-5 ), vec2( -0.464, 0.886 ) ) );
	c += vec3( 1.9, 1.1, 0.52 ) * pane * band * sunSide;
	c += vec3( 0.5, 0.56, 0.62 ) * smoothstep( 0.80, 0.9, r.y ) * 0.5;                  // soft ceiling light
	float sun = max( dot( r, vec3( -0.44, 0.31, 0.84 ) ), 0.0 );
	c += vec3( 5.2, 2.7, 1.1 ) * ( pow( sun, 70.0 ) + 0.08 * pow( sun, 6.0 ) );
	return c;
}
float seg( vec2 p, vec2 a, vec2 b ) { vec2 pa = p - a, ba = b - a; return length( pa - ba * clamp( dot( pa, ba ) / dot( ba, ba ), 0.0, 1.0 ) ); }
float hash( vec2 p ) { return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
void main() {
	vec3 d = normalize( vView ), f = normalize( vF ), rr = normalize( vR ), uu = normalize( vU );
	vec3 n = normalize( vN ); if ( ! gl_FrontFacing ) n = -n;
	float ndv = clamp( -dot( d, n ), 0.0, 1.0 ), fres = pow( 1.0 - ndv, 4.0 );
	vec3 rv = reflect( d, n );
	vec3 E = envMap( vec3( dot( rv, rr ), dot( rv, uu ), -dot( rv, f ) ) );
	float fz = dot( d, f );
	vec2 ang = vec2( dot( d, rr ), dot( d, uu ) ) / max( abs( fz ), 1e-4 );      // tan-angles off the optical axis
	vec2 fwa = fwidth( ang ); float px = 0.7 * max( fwa.x, fwa.y ) + 1e-6;
	float rad = length( ang );
	vec3 col = vec3( 0.0 ); float a = 0.0;
	if ( vGlass > 1.5 && vGlass < 2.5 ) {
		// ground edge: frosted, greenish, catches the light
		a = 0.62 + 0.3 * fres;
		col = vec3( 0.035, 0.07, 0.062 ) * ( 0.25 + 0.9 * E.g ) + E * ( 0.05 + 0.5 * fres );
	} else if ( vGlass > 2.5 ) {
		// objective: you look into a black tube through multi-coated glass
		float t = 1.0 - ndv;
		vec3 coat = mix( vec3( 0.16, 0.85, 0.42 ), vec3( 0.78, 0.22, 0.95 ), smoothstep( 0.03, 0.55, t ) );
		float lr = length( vLocal.xy - uCenter.xy ) / uObjR;
		vec3 rv2 = reflect( d, normalize( n + f * 1.35 ) );                        // ghost off the inner elements
		vec3 E2 = envMap( vec3( dot( rv2, rr ), dot( rv2, uu ), -dot( rv2, f ) ) );
		col = vec3( 0.004, 0.005, 0.007 ) + E * coat * ( 0.05 + 0.8 * fres ) + E2 * coat.zxy * 0.025 * ( 1.0 - lr * lr );
		col += coat * 0.01 * smoothstep( 0.55, 1.0, lr );
		a = 1.0;
	} else if ( fz > 0.0 ) {
		// looking down-range through the glass
#if RET == 2
		if ( vGlass < 0.5 ) {
			vec3 e = vec3( -dot( vC, rr ), -dot( vC, uu ), dot( vC, f ) );          // eye in the scope's frame, metres; e.z = behind the ocular
			float fs = 1.0 - smoothstep( uScope.z - 0.016, uScope.z, rad );          // field stop
			vec2 bp = e.xy + ang * ( e.z - uScope.x );                               // where this field angle's beam passes the eye
			float ep = 1.0 - smoothstep( uScope.y * 0.5, uScope.y, length( bp ) );   // exit pupil (scope shadow)
			float vis = fs * ep * step( 0.0, e.z );
#ifdef NO_PORTAL
			vis = 0.0;
#endif
			vis *= 1.0 - 0.32 * smoothstep( uScope.z * 0.62, uScope.z, rad );        // falloff towards the edge of the field
			vec2 p = ang / uRet.x;
			// etched glass reticle
			float chev = min( seg( p, vec2( 0.0 ), vec2( -0.0105, -0.0185 ) ), seg( p, vec2( 0.0 ), vec2( 0.0105, -0.0185 ) ) ) - 0.0016;
			float pa = atan( p.x, -p.y ), pr = length( p ), g0 = 0.72;
			float shoe = abs( pr - 0.052 ) - 0.0024;
			if ( abs( pa ) < g0 ) shoe = min( length( p - 0.052 * vec2( sin( g0 ), -cos( g0 ) ) ), length( p - 0.052 * vec2( -sin( g0 ), -cos( g0 ) ) ) ) - 0.0024;
			float lit = min( chev, shoe );
			float etch = seg( p, vec2( 0.0, -0.030 ), vec2( 0.0, -0.152 ) ) - 0.0008;
			etch = min( etch, seg( p, vec2( -0.020, -0.047 ), vec2( 0.020, -0.047 ) ) - 0.0010 );
			etch = min( etch, seg( p, vec2( -0.016, -0.072 ), vec2( 0.016, -0.072 ) ) - 0.0010 );
			etch = min( etch, seg( p, vec2( -0.0125, -0.100 ), vec2( 0.0125, -0.100 ) ) - 0.0010 );
			etch = min( etch, seg( p, vec2( -0.0095, -0.131 ), vec2( 0.0095, -0.131 ) ) - 0.0010 );
			vec2 q = abs( p );
			etch = min( etch, max( abs( q.y ) - 0.0042 * smoothstep( 0.098, 0.125, q.x ) - 0.0006, 0.100 - q.x ) );      // side posts, tapered tips
			etch = min( etch, max( abs( p.x ) - 0.0042 * smoothstep( 0.168, 0.195, -p.y ) - 0.0006, 0.170 + p.y ) );     // bottom post
			float w = px / uRet.x;
			float mEtch = 1.0 - smoothstep( -w, w, min( etch, lit ) );
			float mLit = 1.0 - smoothstep( -w, w, lit );
			float glow = exp( -max( lit, 0.0 ) / 0.0045 ) * 0.16;
			float clearA = uTint.a;
			a = 1.0 - vis * ( 1.0 - clearA ) * ( 1.0 - 0.95 * mEtch );
			col = uTint.rgb * clearA * vis;
			col += uColor * uBright * uScope.w * vis * ( mLit + glow * ( 1.0 - mLit ) );
			col += E * vec3( 0.55, 0.36, 0.8 ) * ( 0.006 + 0.5 * ( 1.0 - ndv ) * ( 1.0 - ndv ) );   // coating sheen on the eyepiece
		} else
#endif
		{
			a = uTint.a + 0.22 * fres;
			col = uTint.rgb * a + E * ( 0.004 + 0.34 * fres );
			if ( vGlass < 0.5 ) {
#if RET == 0
				float core = 1.0 - smoothstep( uRet.x - px, uRet.x + px, rad );
				float halo = 0.11 * exp( -rad * rad / ( uRet.x * uRet.x * 14.0 ) ) + 0.018 * exp( -rad / ( uRet.x * 7.0 ) );
				col += uColor * uBright * ( core + halo );
#elif RET == 1
				float ring = abs( rad - uRet.x ) - uRet.y;
				vec2 q = abs( ang ); vec2 t = q.x > q.y ? q : q.yx;
				float tick = max( t.y - uRet.y * 0.9, max( uRet.x - t.x, t.x - uRet.x - uRet.z ) );
				float m = 1.0 - smoothstep( -px, px, min( ring, tick ) );
				float core = 1.0 - smoothstep( uRet.w - px, uRet.w + px, rad );
				float sp = 0.74 + 0.5 * hash( floor( ang * 4200.0 ) );                 // laser speckle
				float halo = 0.07 * exp( -max( min( ring, tick ), 0.0 ) / ( uRet.y * 3.0 ) ) + 0.10 * exp( -rad * rad / ( uRet.w * uRet.w * 12.0 ) );
				col += uColor * uBright * ( ( m * 0.82 + core ) * sp + halo );
#endif
			}
		}
	} else {
		// from the muzzle side: the coating mirrors the world
		a = uCoat.a + ( 1.0 - uCoat.a ) * fres;
		col = uCoat.rgb * ( E * 0.9 + 0.035 ) * a;
	}
	gl_FragColor = vec4( col, a );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;
var GQ = {
  reflex: {
    ret: 0,
    color: [6.5, 0.32, 0.2],
    tint: [0.03, 0.07, 0.08, 0.045],
    coat: [1.05, 0.36, 0.13, 0.46],
    dims: [0.0021, 0, 0, 0],
  },
  microdot: {
    ret: 0,
    color: [6.5, 0.32, 0.2],
    tint: [0.03, 0.07, 0.08, 0.04],
    coat: [1.05, 0.36, 0.13, 0.46],
    dims: [0.0024, 0, 0, 0],
  },
  holo: {
    ret: 1,
    color: [6, 0.36, 0.22],
    tint: [0.03, 0.06, 0.045, 0.04],
    coat: [0.36, 0.62, 0.5, 0.34],
    dims: [0.015, 85e-5, 0.0036, 0.0012],
  },
  prism: {
    ret: 2,
    color: [5, 0.42, 0.16],
    tint: [0.05, 0.05, 0.07, 0.03],
    coat: [0.5, 0.4, 0.8, 1],
    dims: [1, 0, 0, 0],
  },
};
var hF = new Map();
function vy(o, t = {}) {
  let e = o === "prism" && t.portal !== !1,
    s = o + (o === "prism" && !e ? ":solid" : ""),
    n = hF.get(s);
  if (n) return n;
  let i = GQ[o];
  return (
    (n = new ShaderMaterial({
      defines:
        o === "prism" && !e
          ? {
              RET: i.ret,
              NO_PORTAL: 1,
            }
          : {
              RET: i.ret,
            },
      uniforms: {
        uColor: {
          value: new Vector3(...i.color),
        },
        uBright: {
          value: 1,
        },
        uTint: {
          value: new Vector4(...i.tint),
        },
        uCoat: {
          value: new Vector4(...i.coat),
        },
        uRet: {
          value: new Vector4(...i.dims),
        },
        uScope: {
          value: new Vector4(
            t.relief || 0.05,
            t.pupil || 0.0075,
            t.field || 0.24,
            1,
          ),
        },
        uCenter: {
          value: new Vector3(...(t.center || [0, 0, 0])),
        },
        uObjR: {
          value: (t.objective && t.objective.r) || 0.014,
        },
      },
      vertexShader: UQ,
      fragmentShader: VQ,
      ...(e
        ? {
            transparent: !1,
            depthWrite: !0,
            side: FrontSide,
            blending: CustomBlending,
            blendEquation: AddEquation,
            blendSrc: OneFactor,
            blendDst: OneMinusSrcAlphaFactor,
            blendSrcAlpha: OneFactor,
            blendDstAlpha: OneMinusSrcAlphaFactor,
          }
        : {
            transparent: !0,
            depthWrite: !1,
            side: DoubleSide,
            premultipliedAlpha: !0,
          }),
    })),
    (n.name = "att:lens:" + s),
    (n.userData = {
      base: new Color(3149834),
      wear: 1,
      keep: "lens",
      portal: e,
    }),
    hF.set(s, n),
    n
  );
}
function My(o, t, e, s, n = 0.9, i = 0, a = "black") {
  let r = new PlaneGeometry(s, n);
  (r.translate(0, 0, 0.03), o.hard(a, Ie(Qe(r), t, e, i)));
}
var wy = (o) => (o > 0 ? "R" : "L");
function uF() {
  let o = ao(),
    t = Jc(o.aluLt),
    e = 34.5;
  rT(t, 58);
  for (let i of [-20, 20])
    (t.screw([16.2, 0.2, i], "R", {
      r: 2.6,
      h: 1.7,
      drive: "torx",
      seg: 12,
    }),
      t.stripe([17.92, 0.2, i], "R", 3, i > 0 ? 40 : 155),
      t.screw([-16, 0.6, i], "L", {
        r: 2,
        h: 0.45,
        drive: "none",
        seg: 8,
      }));
  t.body(
    wr(
      [
        [-29, 9],
        [29, 9],
        [29, 12.5, 1],
        [26.5, 14.5, 1],
        [-6, 14.5, 1.2],
        [-9.5, 19.5, 1.5],
        [-25, 19.5, 2],
        [-29, 15.5, 1.5],
      ],
      28.6,
      {
        b: 1.1,
      },
    ),
  );
  for (let i of [-1, 1])
    t.body(
      wr(
        [
          [-27.8, 10.2, 1],
          [-8.2, 10.2, 1],
          [-8.2, 13.4, 1],
          [-10.8, 18, 1.2],
          [-24.4, 18, 1.6],
          [-27.8, 14.8, 1.2],
        ],
        1.3,
        {
          x: i * 14.9,
          b: 0.45,
        },
      ),
    );
  for (let i = 0; i < 5; i++)
    t.body(
      wr(se(-3.6 + i * 2.6, 14.2, -2.3 + i * 2.6, 15.15), 20, {
        b: 0.3,
      }),
    );
  for (let [i, a] of [
    [-22.6, "plus"],
    [-14.6, "minus"],
  ])
    (t.hard(
      "rubber",
      Ie(
        vh(gl(6.4, 4.8, 1.4), 1, {
          b: 0.4,
        }),
        [-15.55, 14.1, i],
        "L",
      ),
    ),
      t.mark(Ie(An(a, 2.9), [-16.56, 14.1, i], "L")));
  for (let [i, a] of [
    [-22.2, 20],
    [-13.8, 75],
  ])
    (t.screw([15.55, 14.1, i], "R", {
      r: 2.1,
      h: 0.45,
      drive: "slot",
      look: "steel",
      roll: a,
    }),
      t.mark(Ie(An("ticks", 7.4), [15.55, 14.1, i], "R")));
  {
    let i = [0, 19.5, -17.2];
    (t.hard(
      "rubber",
      Ie(
        Zc(
          [
            [0, 6.25],
            [0.35, 6.25],
          ],
          {
            seg: 20,
          },
        ),
        i,
        "T",
      ),
    ),
      t.hard(
        "alu",
        Ie(
          Zc(
            [
              [0.35, 5.7, 0, 0.32],
              [1.5, 5.7, 0, 0.32],
              [1.9, 5.25, 1],
            ],
            {
              flute: {
                n: 20,
                wear: !0,
              },
            },
          ),
          i,
          "T",
        ),
      ),
      t.hard(
        "alu",
        Ie(
          vh(yh(18, 5.27), 0.75, {
            b: 0.15,
            holes: [gl(7.8, 1.3, 0.3)],
          }).translate(0, 0, 1.15),
          i,
          "T",
          18,
        ),
      ),
      My(t, [0, 19.5 + 1.2, -17.2], "T", 7.8, 1.3, 18),
      t.mark(Ie(An("batt", 7.2), [-10.2, 19.5, -12.3], "T", 0)));
  }
  (t.mark(
    Ie(
      An("kite", 10.5),
      [0, 17.5, -27],
      [
        [0, 0.7071, 0.7071],
        [0, 0.7071, -0.7071],
      ],
    ),
  ),
    t.mark(Ie(An("kiteSN", 15), [0, 12, -29], "B")));
  {
    let i = [0, 17, -7.75],
      a = [
        [0, 0.573, -0.819],
        [0, 0.819, 0.573],
      ];
    (t.hard(
      "matte",
      Ie(
        vh(gl(9.6, 3.9, 0.9), 0.3, {
          b: 0.12,
        }),
        i,
        a,
      ),
    ),
      t.hard(
        "amber",
        Ie(
          vh(gl(8, 2.6, 0.6), 0.25, {
            b: 0.1,
          }).translate(0, 0, 0.2),
          i,
          a,
        ),
      ),
      t.hard(
        v4(16722450, 7),
        Ie(
          vh(yh(8, 0.5), 0.1, {
            b: 0,
          }).translate(0, 0, 0.46),
          i,
          a,
        ),
      ));
  }
  (t.body(
    jo(
      [
        [-20.5, 9, 1.2],
        [20.5, 9, 1.2],
        [20.5, 21, 1.5],
        [-20.5, 21, 1.5],
      ],
      18,
      {
        u: 9,
        b: 0.8,
      },
    ),
  ),
    t.body(
      jo(
        [
          [-20.5, 18],
          [20.5, 18],
          [20.5, 51.5, 7.5],
          [-20.5, 51.5, 7.5],
        ],
        9,
        {
          u: 13,
          b: 0.8,
          cs: 8,
          soft: 0.5,
          holes: [
            [
              [-17.5, 22, 4.5],
              [17.5, 22, 4.5],
              [17.5, 47, 4.5],
              [-17.5, 47, 4.5],
            ],
          ],
        },
      ),
    ),
    t.hard(
      "rubber",
      jo(gl(37, 27, 5.5, 0, e), 0.4, {
        u: 12.6,
        b: 0,
        holes: [gl(35, 25, 4.5, 0, e)],
      }),
    ));
  for (let i of [-1, 1]) {
    t.hard(
      "steel",
      wr(
        [
          [8.5, 10, 1],
          [26.6, 10, 1],
          [27.4, 42],
          [10, 42],
          [7.5, 24, 3],
        ],
        1.1,
        {
          x: i * 21.75,
          b: 0.35,
          holes: [
            [
              [11.8, 18, 2],
              [24.2, 18, 2],
              [24.6, 38, 2],
              [12.4, 38, 2],
            ],
          ],
        },
      ),
    );
    for (let a of [11.4, 24.6])
      (t.hard(
        "steel",
        Ie(
          Zc(
            [
              [0, 2.5],
              [0.72, 2.5],
            ],
            {
              seg: 8,
            },
          ),
          [i * 20.5, 14, a],
          wy(i),
        ),
      ),
        t.screw([i * 22.3, 14, a], wy(i), {
          r: 1.8,
          h: 0.7,
          seg: 8,
        }));
  }
  t.hard(
    "steel",
    jo(
      [
        [-22.3, 41],
        [-22.3, 48.4],
        [-16.2, 54.9],
        [16.2, 54.9],
        [22.3, 48.4],
        [22.3, 41],
        [21.2, 41],
        [21.2, 47.95],
        [15.75, 53.8],
        [-15.75, 53.8],
        [-21.2, 47.95],
        [-21.2, 41],
      ],
      17.4,
      {
        u: 10,
        b: 0.35,
      },
    ),
  );
  let s = {
      w: 35.8,
      h: 25.8,
      rc: 4.9,
    },
    n = {
      w: 33.6,
      h: 23.6,
      rc: 3.8,
    };
  return (
    t.lens(
      Hu(n, {
        y: e,
        u: 18.5,
        back: !1,
        bulge: 0.45,
        kind: 1,
      }),
      S5(s, 1.1, {
        y: e,
        u0: 18,
        u1: 18.5,
        back: !1,
      }),
    ),
    t.lens(
      S5(s, 1.1, {
        y: e,
        u0: 17,
        u1: 16.5,
        back: !0,
      }),
      Hu(n, {
        y: e,
        u: 16.5,
        back: !0,
        bulge: -0.3,
        kind: 0,
      }),
    ),
    {
      ...t.finish(),
      bodyMat: o.aluLt,
      paint: "metal",
      lensMat: vy("reflex"),
      eye: [0, e, -107],
      height: e,
      zoom: 1,
      relief: 123.5,
      window: [33.6, 23.6],
      bolts: [-20, 20],
    }
  );
}
function dF() {
  let o = ao(),
    t = Jc(o.aluLt),
    e = 38;
  (rT(t, 84, {
    top: 10,
  }),
    t.hard(
      "steel",
      _c(
        cn(
          [
            [0, 0],
            [0, 3.3],
            [0.5, 3.8, 1],
            [6.9, 3.8],
            [7.4, 3.3, 1],
            [7.4, 0],
          ],
          {
            seg: 14,
          },
        ),
        "y+",
        [-18.4, -3.9, -28],
      ),
    ),
    t.hard(
      "steel",
      oF(
        [
          [-16.3, -30, 1],
          [-16.3, 20, 1],
          [-18.6, 23.5, 1.5],
          [-22.8, 22, 1.2],
          [-22.4, 14.5, 2.5],
          [-19.6, 8, 4],
          [-19.6, -30, 1],
        ],
        6.4,
        {
          y: -3.4,
          b: 0.7,
        },
      ),
    ));
  for (let i = 0; i < 4; i++)
    t.hard(
      "steel",
      jo(se(-23.3, -2.6, -22.5, 2.2), 0.8, {
        u: 15.2 + i * 1.7,
        b: 0.2,
      }),
    );
  (t.screw([-18.4, 3.5, -28], "T", {
    r: 1.9,
    h: 0.4,
    drive: "slot",
    look: "bright",
    roll: 35,
  }),
    t.mark(Ie(An("lock", 9.5), [-19.65, -0.2, -8], "L")),
    t.hard("steel", Ie(w4(7.4, 3), [16.2, 0.2, -28], "R", 10)),
    t.screw([19.2, 0.2, -28], "R", {
      r: 1.9,
      h: 0.5,
      drive: "slot",
      look: "bright",
      roll: 50,
    }),
    t.screw([16.2, 0.2, 20], "R", {
      r: 2.6,
      h: 1.7,
      drive: "torx",
      seg: 12,
    }),
    t.body(
      wr(
        [
          [-43, 10],
          [34.5, 10],
          [34.5, 24],
          [-18, 24, 2.5],
          [-43, 18, 2],
        ],
        34,
        {
          b: 0.8,
        },
      ),
    ),
    t.body(
      jo(
        [
          [-17, 10],
          [17, 10],
          [20.2, 13, 0.5],
          [20.2, 24.6, 1],
          [-20.2, 24.6, 1],
          [-20.2, 13, 0.5],
        ],
        31,
        {
          u: -16.5,
          b: 0.7,
        },
      ),
    ),
    t.body(
      _c(
        cn(
          [
            [-18.5, 0],
            [-18.5, 9.7],
            [-17.4, 10.8, 1],
            [18.5, 10.8],
          ],
          {
            seg: 24,
          },
        ),
        "x+",
        [0, 19.3, 34.5],
      ),
    ));
  {
    let i = [18.8, 19.3, 34.5];
    (t.hard(
      "rubber",
      _c(
        cn(
          [
            [-0.3, 10.3],
            [0.05, 10.3],
          ],
          {
            seg: 24,
          },
        ),
        "x+",
        i,
      ),
    ),
      t.hard(
        "alu",
        _c(
          cn(
            [
              [0, 10.5],
              [0.7, 10.5],
              [0.9, 11.5, 1, 0.5],
              [5, 11.5, 0, 0.5],
              [5.9, 10.6, 1, 0],
              [5.9, 0],
            ],
            {
              flute: {
                n: 24,
                wear: !0,
              },
            },
          ),
          "x+",
          i,
        ),
      ),
      My(t, [18.8 + 5.92, 19.3, 34.5], "R", 14, 1.7, 20),
      t.hard(
        "rubber",
        Mh(
          [
            [23.6, 30, 34.5],
            [26.5, 32.5, 31],
            [26, 31, 24.5],
            [21, 26.5, 19.5],
            [17.4, 22.5, 18.2],
          ],
          0.5,
          {
            seg: 14,
            radial: 5,
          },
        ),
      ),
      t.screw([17, 22.3, 18], "R", {
        r: 1.5,
        h: 0.6,
        drive: "hex",
      }),
      t.mark(Ie(An("batt123", 10), [-18.55, 19.3, 34.5], "L")));
  }
  for (let i of [-11, 11])
    t.screw([i, 24, 19.6], "T", {
      r: 1.6,
      h: 0.5,
      drive: "hex",
    });
  (t.body(
    jo(gl(37, 28.5, 3.5, 0, 38.25), 26, {
      u: -14,
      b: 0.8,
      cs: 6,
      soft: 0.5,
      holes: [gl(31.8, 24, 2.2, 0, e)],
    }),
  ),
    t.hard(
      "matte",
      jo(gl(31.8, 24, 2.2, 0, e), 25.2, {
        u: -13.6,
        b: 0,
        holes: [gl(31, 23.2, 1.9, 0, e)],
      }),
    ));
  for (let i of [-1, 1]) {
    t.body(
      wr(
        [
          [-16.5, 11.5, 1.2],
          [14.5, 11.5, 1.2],
          [14.5, 22, 1],
          [13.5, 50],
          [-15.5, 50],
          [-16.5, 22, 1],
        ],
        2.2,
        {
          x: i * 21.3,
          b: 0.6,
          holes: [
            [
              [-10.5, 29, 2.5],
              [8.5, 29, 2.5],
              [8.5, 46, 2.5],
              [-10.5, 46, 2.5],
            ],
          ],
        },
      ),
    );
    for (let a of [-12.5, 10.5])
      t.screw([i * 22.4, 17, a], wy(i), {
        r: 2.1,
        h: 0.8,
      });
  }
  t.body(
    jo(
      [
        [20.2, 49.5],
        [22.4, 49.5],
        [22.4, 51.6, 0.6],
        [17.6, 56.8, 0.6],
        [-17.6, 56.8, 0.6],
        [-22.4, 51.6, 0.6],
        [-22.4, 49.5],
        [-20.2, 49.5],
        [-20.2, 50.8],
        [-16.7, 54.6],
        [16.7, 54.6],
        [20.2, 50.8],
      ],
      29,
      {
        u: -15.5,
        b: 0.5,
      },
    ),
  );
  for (let i of [-12.2, -4.1, 4.1, 12.2])
    t.body(
      jo(
        [
          [i - 1.1, 56.5],
          [i + 1.1, 56.5],
          [i + 0.8, 57.8],
          [i - 0.8, 57.8],
        ],
        24,
        {
          u: -13,
          b: 0.3,
        },
      ),
    );
  (t.mark(
    Ie(An("halo", 19), [-22.45, 23.2, -1], "L"),
    Ie(An("haloSN", 17), [22.45, 23.4, -1], "R"),
  ),
    t.body(
      wr(
        [
          [-40.8, 11.6, 1.4],
          [-17.6, 11.6, 1.4],
          [-17.6, 22.2, 1.4],
          [-40.8, 17.4, 1.4],
        ],
        1,
        {
          x: -17.5,
          b: 0.4,
        },
      ),
    ));
  for (let [i, a] of [
    [-35.4, 0],
    [-27, 180],
  ])
    (t.hard(
      "rubber",
      Ie(
        vh(gl(7, 4.6, 1.4), 1, {
          b: 0.4,
        }),
        [-18, 14.5, i],
        "L",
      ),
    ),
      t.mark(Ie(An("tri", 2.6), [-19.01, 14.5, i], "L", a)));
  (t.hard(
    "rubber",
    Ie(
      Zc(
        [
          [0, 2.3],
          [0.7, 2.3],
          [1, 1.9, 1],
          [1, 0],
        ],
        {
          seg: 12,
        },
      ),
      [-18, 16.4, -20.6],
      "L",
    ),
  ),
    t.mark(Ie(An("nv", 2.3), [-19.01, 16.4, -20.6], "L")));
  for (let [i, a, r] of [
    [-35.5, 14.4, 25],
    [-25, 15.4, 70],
  ])
    (t.screw([17, a, i], "R", {
      r: 2.7,
      h: 0.7,
      drive: "slot",
      look: "steel",
      seg: 12,
      roll: r,
    }),
      t.mark(Ie(An("ticks", 8.6), [17, a, i], "R")));
  (t.mark(Ie(An("up", 4.4), [17.05, 20.6, -22.5], "R")),
    t.mark(Ie(An("class", 14.5), [0, 13.9, -43], "B")));
  let s = {
      w: 31,
      h: 23.2,
      rc: 1.9,
    },
    n = {
      w: 29.2,
      h: 21.4,
      rc: 1.2,
    };
  return (
    t.lens(
      Hu(n, {
        y: e,
        u: 9.3,
        back: !1,
        kind: 1,
      }),
      S5(s, 0.9, {
        y: e,
        u0: 8.5,
        u1: 9.3,
        back: !1,
      }),
    ),
    t.lens(
      S5(s, 0.9, {
        y: e,
        u0: -10.5,
        u1: -11.3,
        back: !0,
      }),
      Hu(n, {
        y: e,
        u: -11.3,
        back: !0,
        kind: 0,
      }),
    ),
    {
      ...t.finish(),
      bodyMat: o.aluLt,
      paint: "metal",
      lensMat: vy("holo"),
      eye: [0, e, -121],
      height: e,
      zoom: 1,
      relief: 109.7,
      window: [29.2, 21.4],
      bolts: [-28, 20],
    }
  );
}
function pF(o = !0) {
  let t = ao(),
    e = Jc(t.aluLt),
    s = 40,
    n = {
      y: s,
    },
    i = 50,
    a = 13.5;
  rT(e, 70, {
    top: 9,
  });
  for (let l of [-20, 20])
    (e.hard(
      "steel",
      Ie(
        Zc(
          [
            [0, 5.4],
            [0.6, 5.4],
            [0.6, 0],
          ],
          {
            seg: 14,
          },
        ),
        [16.2, 0, l],
        "R",
      ),
    ),
      e.hard(
        "steel",
        Ie(w4(8.6, 3.6).translate(0, 0, 0.6), [16.2, 0, l], "R", 15 + l),
      ),
      My(e, [16.2 + 4.22, 0, l], "R", 8.2, 1.3, 15 + l),
      e.stripe([16.2 + 4.24, 0, l], "R", 5.2, 105 + l, "whiteLine"),
      e.screw([-16, 0.6, l], "L", {
        r: 2.3,
        h: 0.5,
        drive: "none",
      }));
  (e.body(
    wr(
      [
        [-33, 9],
        [33, 9],
        [29, 20.6, 2],
        [-29, 20.6, 2],
      ],
      22,
      {
        b: 0.8,
        holes: [se(-18, 12.2, 18, 16.8, 2.2)],
      },
    ),
  ),
    e.body(
      jo(
        [
          [-13, 20],
          [13, 20],
          [20, 27, 1],
          [20, 53, 1],
          [13, 60, 1],
          [-13, 60, 1],
          [-20, 53, 1],
          [-20, 27, 1],
        ],
        44,
        {
          u: -26,
          b: 1,
        },
      ),
    ));
  for (let l of [-1, 1])
    for (let c of [-1, 1])
      (e.screw([l * 15.2, s + c * 15.2, -26], "B", {
        r: 1.5,
        h: 0.5,
        drive: "hex",
      }),
        e.screw([l * 15.2, s + c * 15.2, 18], "F", {
          r: 1.5,
          h: 0.5,
          drive: "hex",
        }));
  (e.body(
    cn(
      [
        [-36.4, 16.6],
        [-36, 17.6, 1],
        [-29.5, 17.6],
        [-28.5, 18.9, 1],
        [-26, 18.9],
      ],
      {
        seg: 28,
        ...n,
      },
    ),
  ),
    e.hard(
      "alu",
      cn(
        [
          [-47.1, 17.6],
          [-46.7, 18.6, 1],
          [-46.2, 19.5, 0, 1],
          [-37.6, 19.5, 0, 1],
          [-37.1, 18.6, 0, 0],
          [-36.7, 17.6, 1],
        ],
        {
          flute: {
            n: 14,
            trap: !0,
            wear: !0,
          },
          ...n,
        },
      ),
    ),
    e.hard(
      "rubber",
      cn(
        [
          [-53.4, 15.6],
          [-54.4, 16.5],
          [-54.6, 18.4],
          [-53.8, 19.5],
          [-48.4, 19.7],
          [-47.5, 18.9],
          [-47.2, 17.7],
        ],
        {
          seg: 40,
          crease: 50,
          ...n,
        },
      ),
    ),
    e.hard(
      "matte",
      cn(
        [
          [-46, a],
          [-46.6, a + 0.9],
          [-49.5, 14.6],
          [-49.5, 15.1],
          [-53.4, 15.6],
        ],
        {
          seg: 40,
          ...n,
        },
      ),
    ),
    e.mark(
      Ie(An("whiteDot", 1.3), [0, s + 17.62, -33], "T"),
      M4("focus", 17.65, 9, {
        phi: 128,
        u: -32.6,
        y: s,
      }),
    ),
    e.body(
      cn(
        [
          [18, 17.4],
          [23, 17.4],
          [30.5, 19.7],
          [50.6, 19.7],
          [51, 20.1, 1],
          [53.2, 20.1],
          [54, 19.3, 1],
          [54, 17.7],
        ],
        {
          seg: 28,
          ...n,
        },
      ),
    ),
    e.hard(
      "matte",
      y4(
        cn(
          [
            [54, 17.7],
            [50.2, 17.7],
            [50.2, 16.7],
            [47.4, 16.7],
            [47.4, 15.7],
            [44.6, 15.7],
            [44.6, 14.7],
            [44, 14.7],
          ],
          {
            seg: 28,
            ...n,
          },
        ),
        150,
        3,
        n,
      ),
    ),
    e.mark(
      M4("vantage", 19.72, 19, {
        phi: 150,
        u: 40.4,
        y: s,
      }),
      Ie(An("vantSN", 13), [-11.05, 18.7, 0], "L"),
    ));
  for (let [l, c, h, f, u] of [
    [[0, 60, -2], "y+", "T", [0, 60, 12.5], "up"],
    [[20, s, -2], "x+", "R", [20, s, 12.5], "rt"],
  ]) {
    (e.body(
      _c(
        cn(
          [
            [0, 9.8],
            [2, 9.8],
            [2.6, 9.2, 1],
            [2.6, 8],
          ],
          {
            seg: 20,
          },
        ),
        c,
        l,
      ),
    ),
      e.hard(
        "alu",
        _c(
          cn(
            [
              [2.7, 8.3],
              [3.2, 8.3],
              [3.5, 9, 1, 0.75],
              [9.6, 9, 0, 0.75],
              [10.4, 8, 1, 0],
              [10.4, 0],
            ],
            {
              flute: {
                n: 16,
                wear: !0,
              },
            },
          ),
          c,
          l,
        ),
      ));
    let d = c === "y+" ? [0, 70.4, -2] : [30.4, s, -2];
    (e.mark(
      Ie(An("ticks", 13), d, h),
      Ie(An(u, 5), c === "y+" ? [0, 60, 13] : [20, s, 13], h),
    ),
      My(e, c === "y+" ? [0, 70.42, -2] : [30.42, s, -2], h, 5.4, 0.9, 0));
  }
  {
    let l = [-20, s, -2];
    (e.body(
      _c(
        cn(
          [
            [0, 11.2],
            [1.4, 11.2],
            [1.9, 10.6, 1],
            [1.9, 9],
          ],
          {
            seg: 22,
          },
        ),
        "x-",
        l,
      ),
    ),
      e.hard(
        "alu",
        _c(
          cn(
            [
              [2, 10],
              [2.4, 10],
              [2.7, 10.9, 1, 0.6],
              [7.8, 10.9, 0, 0.6],
              [8.6, 10, 1, 0],
              [8.6, 6.2],
              [9.2, 5.8, 1],
              [9.2, 0],
            ],
            {
              flute: {
                n: 20,
                wear: !0,
              },
            },
          ),
          "x-",
          l,
        ),
      ),
      e.mark(Ie(An("dial", 19.4), [-28.6, s, -2], "L")),
      My(e, [-29.22, s, -2], "L", 8, 1.1, 30));
  }
  (e.lens(
    Hu(
      {
        r: a,
        n: 40,
      },
      {
        y: s,
        u: -46,
        back: !0,
        kind: 0,
        bulge: 0.5,
      },
    ),
  ),
    e.lens(
      Hu(
        {
          r: 14.7,
        },
        {
          y: s,
          u: 44,
          back: !1,
          kind: 3,
          bulge: 1.4,
        },
      ),
    ));
  let r = vy("prism", {
    portal: o,
    center: [0, s / 1e3, 0.046],
    relief: (i + 10) / 1e3,
    pupil: 0.0115,
    field: (0.93 * a) / i,
    objective: {
      r: 0.0147,
    },
  });
  return {
    ...e.finish(),
    bodyMat: t.aluLt,
    paint: "metal",
    lensMat: r,
    eye: [0, s, -46 - i],
    height: s,
    zoom: 2.5,
    relief: i,
    window: [a * 2, a * 2],
    bolts: [-20, 20],
    portal: o,
  };
}
function mF() {
  let o = ao(),
    t = Jc(o.aluLt),
    e = 17.3;
  (t.hard(
    "steel",
    wr(
      [
        [-23.5, 0],
        [23.5, 0],
        [23.5, 1.5, 0.5],
        [22.9, 2.2],
        [-22.9, 2.2],
        [-23.5, 1.5, 0.5],
      ],
      27.2,
      {
        b: 0.4,
      },
    ),
  ),
    t.body(
      wr(
        [
          [-23, 2.2],
          [23, 2.2],
          [23, 5, 0.8],
          [21, 7.5, 0.8],
          [-6, 7.5, 0.8],
          [-9, 10.6, 1],
          [-20, 10.6, 1.5],
          [-23, 8, 1],
        ],
        26,
        {
          b: 0.6,
        },
      ),
    ),
    t.body(
      jo(
        [
          [-14, 4.6, 1],
          [14, 4.6, 1],
          [14, 24.5, 2.5],
          [9, 28, 2],
          [-9, 28, 2],
          [-14, 24.5, 2.5],
        ],
        10.5,
        {
          u: 9,
          b: 0.6,
          cs: 6,
          soft: 0.5,
          holes: [gl(22.4, 15, 2.6, 0, e)],
        },
      ),
    ));
  for (let s of [-1, 1])
    (t.body(
      wr(
        [
          [9.2, 7.5],
          [9.2, 21.5, 1.5],
          [-3.5, 7.5, 1],
        ],
        2.6,
        {
          x: s * 12.7,
          b: 0.6,
        },
      ),
    ),
      t.screw([s * 7.4, 7.5, 2.6], "T", {
        r: 2.3,
        h: 0.5,
        drive: "torx",
        seg: 12,
      }),
      t.hard(
        "rubber",
        Ie(
          vh(gl(6, 3.4, 1.2), 0.8, {
            b: 0.3,
            bs: 2,
          }),
          [s * 13, 6.3, -15],
          wy(s),
        ),
      ),
      t.mark(
        Ie(An(s < 0 ? "plus" : "minus", 2.1), [s * 13.81, 6.3, -15], wy(s)),
      ));
  (t.screw([0, 10.6, -14.5], "T", {
    r: 2.1,
    h: 0.35,
    drive: "slot",
    look: "steel",
    seg: 12,
    roll: 60,
  }),
    t.mark(Ie(An("ticks", 7.6), [0, 10.6, -14.5], "T")),
    t.screw([13, 5, 3], "R", {
      r: 1.5,
      h: 0.4,
      drive: "slot",
      look: "steel",
      roll: 15,
    }),
    t.mark(Ie(An("micro", 9.6), [-14.05, 8.4, 14.25], "L")));
  for (let s of [-7, 7])
    t.body(
      jo(se(s - 2.2, 3.4, s + 2.2, 9.2), 0.9, {
        u: -23.5,
        b: 0.3,
      }),
    );
  {
    let s = [0, 9.05, -7.5],
      n = [
        [0, 0.696, -0.719],
        [0, 0.719, 0.696],
      ];
    (t.hard(
      "amber",
      Ie(
        vh(gl(7, 2.2, 0.5), 0.25, {
          b: 0.1,
        }),
        s,
        n,
      ),
    ),
      t.hard(
        v4(16722450, 7),
        Ie(
          vh(yh(8, 0.4), 0.1, {
            b: 0,
          }).translate(0, 0, 0.27),
          s,
          n,
        ),
      ));
  }
  return (
    t.lens(
      Hu(
        {
          w: 20.6,
          h: 13.2,
          rc: 1.8,
        },
        {
          y: e,
          u: 15.6,
          back: !1,
          bulge: 0.3,
          kind: 1,
        },
      ),
      S5(
        {
          w: 22.9,
          h: 15.5,
          rc: 2.9,
        },
        1.15,
        {
          y: e,
          u0: 15,
          u1: 15.6,
          back: !1,
        },
      ),
    ),
    t.lens(
      S5(
        {
          w: 22.9,
          h: 15.5,
          rc: 2.9,
        },
        1.15,
        {
          y: e,
          u0: 13.8,
          u1: 13.2,
          back: !0,
        },
      ),
      Hu(
        {
          w: 20.6,
          h: 13.2,
          rc: 1.8,
        },
        {
          y: e,
          u: 13.2,
          back: !0,
          bulge: -0.2,
          kind: 0,
        },
      ),
    ),
    {
      ...t.finish(),
      bodyMat: o.aluLt,
      paint: "metal",
      lensMat: vy("microdot"),
      eye: [0, e, -265],
      height: e,
      zoom: 1,
      relief: 278,
      window: [20.6, 13.2],
      bolts: [],
    }
  );
}
var E4 = {
  rifle: {
    bore: 3.3,
    rear: 10.6,
    lab: "cal556",
    supp: [19.5, 168],
    comp: 56,
    brake: 60,
    choke: 40,
  },
  pistol: {
    bore: 5,
    rear: 9.6,
    lab: "cal9",
    supp: [17.5, 150],
    comp: 46,
    brake: 52,
    choke: 36,
  },
  shotgun: {
    bore: 9.4,
    rear: 13,
    lab: "cal12",
    supp: [23.5, 190],
    comp: 62,
    brake: 68,
    choke: 43,
  },
};
var aA = (o, t) =>
  o.hard(
    "bright",
    cn(
      [
        [0, t.rear - 1.3],
        [0.35, t.rear - 0.5, 1],
        [1.7, t.rear - 0.5],
        [2.05, t.rear - 1.3, 1],
      ],
      {
        seg: 20,
      },
    ),
  );
var lT = (o, t, e) =>
  o.hard(
    "black",
    Qc(0.01, t, e, 1, {
      seg: 12,
    }),
  );
function WQ(o, t, e, s, n, i = 0) {
  let a = new PlaneGeometry(s, n);
  (a.translate(0, 0, 0.03), o.hard("black", Ie(Qe(a), t, e, i)));
}
function gF(o) {
  let t = E4[o],
    e = ao(),
    s = Jc(e.steel),
    [n, i] = t.supp,
    a = t.rear;
  (aA(s, t),
    s.hard(
      "steel",
      jo(yh(8, (a + 2.4) / Math.cos(Math.PI / 8), Math.PI / 8), 8.8, {
        u: 2.2,
        b: 0.6,
      }),
    ),
    s.hard(
      "steel",
      cn(
        [
          [11.2, a + 2.6],
          [11.6, a + 4.4, 1],
          [12, a + 5.4, 0, 1.2],
          [18.4, a + 5.4, 0, 1.2],
          [18.9, a + 4.4, 0, 0],
          [19.4, a + 3, 1],
        ],
        {
          flute: {
            n: 11,
            trap: !0,
            wear: !0,
          },
        },
      ),
    ));
  let r = 42,
    l = i - 46,
    c = n * 0.925,
    h = Math.acos(0.925) / Hs;
  s.body(
    cn(
      [
        [19.2, a + 3.2],
        [20.4, a + 4.4],
        [28.6, n - 0.8],
        [30, n, 1],
        [34, n],
        [34.4, n - 0.7, 1],
        [35.4, n - 0.7],
        [35.8, n, 1],
        [38, n],
        [38.4, n - 0.7, 1],
        [39.4, n - 0.7],
        [39.8, n, 1],
        [r, n],
      ],
      {
        seg: 24,
      },
    ),
  );
  let f = [];
  for (let v = 0; v < 6; v++) {
    let y = 90 + v * 60;
    for (let M of [y - h, y + h, y + 30])
      f.push([Math.cos(M * Hs) * n, Math.sin(M * Hs) * n]);
  }
  (s.body(
    jo(f, l - r, {
      u: r,
      b: 0.5,
    }),
  ),
    s.body(
      Qc(c - 1.5, n, r, 1, {
        seg: 24,
      }),
      Qc(c - 1.5, n, l, -1, {
        seg: 24,
      }),
    ));
  let u = cn(
    [
      [l, n],
      [l + 6, n],
      [l + 6.4, n - 0.6, 1],
      [l + 7.6, n - 0.6],
      [l + 8, n, 1],
      [l + 13, n],
      [l + 13.4, n - 0.6, 1],
      [l + 14.6, n - 0.6],
      [l + 15, n, 1],
      [l + 20, n],
      [l + 20.4, n - 0.6, 1],
      [l + 21.6, n - 0.6],
      [l + 22, n, 1],
      [i - 13.6, n],
      [i - 13, n - 0.5, 1],
      [i - 13, n - 1.6],
    ],
    {
      seg: 24,
    },
  );
  s.body(u);
  let d = (v) =>
    v <= 0
      ? null
      : v < 0.4
        ? [1 + 0.05 * (v / 0.4), 1 - 0.2 * (v / 0.4), 1 - 0.5 * (v / 0.4)]
        : v < 0.75
          ? [
              1.05 - 0.35 * ((v - 0.4) / 0.35),
              0.8 - 0.1 * ((v - 0.4) / 0.35),
              0.5 + 0.5 * ((v - 0.4) / 0.35),
            ]
          : [
              0.7 - 0.2 * ((v - 0.75) / 0.25),
              0.7 + 0.1 * ((v - 0.75) / 0.25),
              1 + 0.5 * ((v - 0.75) / 0.25),
            ];
  nA(u, (v, y, M) => d((-M - (i - 44)) / 30));
  let m = cn(
    [
      [i - 12.7, n - 0.5],
      [i - 1.2, n - 0.5],
      [i, n - 1.7, 1],
      [i, n - 5.2],
      [i - 0.5, n - 5.8, 1],
      [i - 2.4, n - 5.8],
      [i - 2.4, t.bore + 5.2],
      [i - 0.6, t.bore + 4.4, 1],
      [i - 0.6, t.bore + 1.1],
      [i - 1.7, t.bore, 1],
      [i - 17, t.bore],
    ],
    {
      seg: 36,
    },
  );
  (s.hard("ti", m),
    nA(m, (v, y, M) => {
      let w = Math.hypot(v, y),
        T = (w - t.bore) / (n - t.bore),
        S = -M;
      return S < i - 3
        ? [
            0.86 - 0.3 * Math.max(0, (S - (i - 12)) / 9),
            0.72,
            0.62 + 0.5 * Math.max(0, (S - (i - 12)) / 9),
          ]
        : T < 0.3
          ? [0.32, 0.42, 0.95]
          : T < 0.55
            ? [0.62, 0.36, 0.78]
            : T < 0.8
              ? [0.98, 0.66, 0.34]
              : [0.95, 0.86, 0.7];
    }),
    lT(s, t.bore, i - 16.5));
  for (let v = 0; v < 4; v++) {
    let y = (45 + v * 90) * Hs,
      M = (n - 5.8 + t.bore + 5.2) / 2;
    WQ(
      s,
      [Math.cos(y) * M, Math.sin(y) * M, i - 2.38],
      "F",
      3.2,
      2,
      -(45 + v * 90),
    );
  }
  let p = (r + l) / 2,
    x = (v, y) => [
      [Math.cos(v * Hs), Math.sin(v * Hs), 0],
      y
        ? [-Math.sin(v * Hs), Math.cos(v * Hs), 0]
        : [Math.sin(v * Hs), -Math.cos(v * Hs), 0],
    ],
    g = (v, y) => [Math.cos(v * Hs) * c, Math.sin(v * Hs) * c, y],
    b = n / 19.5;
  return (
    s.mark(Ie(An("mono", 46 * b), g(150, p), x(150, !1))),
    s.mark(
      Ie(An(t.lab, 21 * b), g(90, p + 18 * b), x(90, !1)),
      Ie(An("suppSN", 30 * b), g(90, p - 12 * b), x(90, !1)),
    ),
    s.mark(Ie(An("suppWarn", 44 * b), g(30, p), x(30, !0))),
    {
      ...s.finish(),
      bodyMat: e.steel,
      paint: "metal",
      length: i,
      radius: n,
      rear: a + 5.4,
    }
  );
}
function xF(o) {
  let t = E4[o],
    e = ao(),
    s = Jc(e.steel),
    n = t.comp,
    i = t.rear + 0.6,
    a = t.bore + 2.2,
    r = t.bore + 0.3,
    l = i + 0.9;
  (aA(s, t),
    s.hard(
      "steel",
      cn(
        [
          [2.3, l - 1.4],
          [3.1, l, 1],
          [8.7, l],
          [9.5, l - 1.4, 1],
          [9.5, i - 2.2],
        ],
        {
          seg: 6,
          flat: !0,
        },
      ),
    ),
    s.body(
      cn(
        [
          [9.7, i - 2.2],
          [10.2, i - 1.3, 1],
          [11, i - 1.3],
          [11.3, i - 1.9, 1],
          [11.9, i - 1.9],
          [12.2, i - 1.3, 1],
          [12.5, i - 1.3],
          [13, i, 1],
        ],
        {
          seg: 24,
        },
      ),
    ));
  let c = 13,
    h = n - 4,
    f = h - c,
    u = [],
    d = [0.17, 0.42, 0.67].map((x) => c + f * x),
    m = Math.max(4, f * 0.115);
  for (let x of d)
    u.push({
      a0: 52,
      a1: 128,
      u0: x - m / 2,
      u1: x + m / 2,
    });
  for (let x of [-25, 155])
    u.push({
      a0: x,
      a1: x + 50,
      u0: c + f * 0.79,
      u1: c + f * 0.95,
    });
  let p = iT({
    r: i,
    ri: a,
    u0: c,
    u1: h,
    ports: u,
    step: 18,
    ch: 0.4,
  });
  (s.body(p.outer), s.hard("soot", p.inner));
  for (let x of [0.295, 0.545, 0.74]) {
    let g = c + f * x;
    s.hard(
      "soot",
      Qc(r, a, g - 0.9, -1, {
        seg: 16,
      }),
      Qc(r, a, g + 0.9, 1, {
        seg: 16,
      }),
    );
  }
  return (
    s.hard(
      "soot",
      Qc(r, a, c + 0.4, 1, {
        seg: 16,
      }),
    ),
    s.body(
      cn(
        [
          [h, i],
          [n - 3.2, i],
          [n - 0.9, i - 1.5, 1],
          [n, i - 2.3, 1],
          [n, r + 2.6],
          [n - 0.7, r + 1.9, 1],
          [n - 0.7, r + 1.1],
          [n - 1.6, r, 1],
        ],
        {
          seg: 24,
        },
      ),
    ),
    s.hard(
      "soot",
      cn(
        [
          [n - 1.6, r],
          [h - 0.2, r],
          [h - 0.2, a],
        ],
        {
          seg: 16,
        },
      ),
    ),
    lT(s, r, c + 0.5),
    s.mark(
      M4("comp", i, 9, {
        phi: 180,
        u: c + f * 0.3,
      }),
    ),
    {
      ...s.finish(),
      bodyMat: e.steel,
      paint: "metal",
      length: n,
      radius: i,
      rear: l,
    }
  );
}
function bF(o) {
  let t = E4[o],
    e = ao(),
    s = Jc(e.steel),
    n = t.brake,
    i = t.rear + 2,
    a = i * 0.82,
    r = t.bore + 3.6,
    l = t.bore + 0.3;
  (aA(s, t),
    s.body(
      jo(yh(8, (i - 1) / Math.cos(Math.PI / 8), Math.PI / 8), 10.4, {
        u: 2.3,
        b: 0.7,
      }),
    ),
    s.body(
      cn(
        [
          [12.6, i - 2.6],
          [14.2, i - 2.6],
        ],
        {
          seg: 20,
        },
      ),
    ));
  let c = 14.2,
    h = n,
    f = h - c,
    u = [],
    d = 3,
    m = f * 0.085,
    p = (f - m * (d + 1)) / d,
    x = Math.asin(a / i) / Hs,
    g = (y) => {
      let M = Math.abs(Math.sin(y * Hs));
      return M * i > a ? a / M : i;
    },
    b = [];
  for (let y = 0; y < d; y++) {
    let M = c + m + y * (p + m),
      w = M + p;
    b.push([M, w]);
    for (let T of [-40, 140])
      u.push({
        a0: T,
        a1: T + 80,
        u0: M,
        u1: w,
      });
  }
  for (let y of [1, 2]) {
    let M = (b[y][0] + b[y][1]) / 2;
    u.push({
      a0: 77,
      a1: 103,
      u0: M - p * 0.24,
      u1: M + p * 0.24,
    });
  }
  let v = iT({
    r: i,
    ri: r,
    u0: c,
    u1: h,
    ports: u,
    step: 20,
    ch: 0.45,
    rFn: g,
    breaks: [x, 180 - x, 180 + x, -x],
    capRear: !0,
    capFront: !0,
  });
  (s.body(v.outer), s.hard("soot", v.inner));
  for (let y = 0; y < d; y++)
    s.hard(
      "soot",
      Qc(l, r, b[y][0], 1, {
        seg: 16,
      }),
      Qc(l, r, b[y][1], -1, {
        seg: 16,
      }),
    );
  return (
    s.hard(
      "steel",
      cn(
        [
          [h, r + 0.02],
          [h - 1.3, l + 0.9, 1],
          [h - 2.6, l],
        ],
        {
          seg: 16,
        },
      ),
    ),
    lT(s, l, c + 1),
    s.mark(Ie(An("brake", 8.5), [0, a, (b[0][0] + b[0][1]) / 2], "T", -90)),
    {
      ...s.finish(),
      bodyMat: e.steel,
      paint: "metal",
      length: n,
      radius: i,
      rear: i,
    }
  );
}
function yF(o) {
  let t = E4[o],
    e = ao(),
    s = Jc(e.steel),
    n = t.choke,
    i = t.rear,
    a = i + 0.3,
    r = t.bore + 0.5;
  s.body(
    cn(
      [
        [0, i - 1.2],
        [0, i - 0.4],
        [2.6, i - 0.4],
        [3, i + 0.3, 1],
      ],
      {
        seg: 28,
      },
    ),
  );
  let l = cn(
    [
      [3, i + 0.2],
      [3.5, i + 1, 1],
      [12.3, i + 1],
      [12.8, i + 0.2, 1],
    ],
    {
      seg: 32,
    },
  );
  (s.hard("steel", y4(l, Math.round((Pn * (i + 1)) / 1.15), 1)),
    s.hard(
      "brass",
      cn(
        [
          [12.9, i - 0.3],
          [13.2, i + 0.25, 1],
          [14.6, i + 0.25],
          [14.9, i - 0.3, 1],
        ],
        {
          seg: 28,
        },
      ),
    ),
    s.body(
      cn(
        [
          [15, i - 0.3],
          [15.4, a, 1],
          [23, a],
        ],
        {
          seg: 28,
        },
      ),
    ));
  let c = [],
    h = n - 23;
  for (let u = 0; u < 10; u++)
    (c.push({
      a0: -81 + u * 36 - 6.5,
      a1: -81 + u * 36 + 6.5,
      u0: 23 + h * 0.1,
      u1: 23 + h * 0.4,
    }),
      c.push({
        a0: -63 + u * 36 - 6.5,
        a1: -63 + u * 36 + 6.5,
        u0: 23 + h * 0.52,
        u1: 23 + h * 0.82,
      }));
  for (let u of [-45, 45, 135, 225])
    c.push({
      a0: u - 7,
      a1: u + 7,
      u0: n - 2.4,
      u1: n + 1,
    });
  let f = iT({
    r: a,
    ri: r,
    u0: 23,
    u1: n,
    ports: c,
    step: 36,
    ch: 0.3,
    capFront: !0,
  });
  return (
    s.body(f.outer),
    s.hard("steel", f.inner),
    s.hard(
      "bright",
      cn(
        [
          [23, r],
          [0, r - 0.3],
        ],
        {
          seg: 20,
        },
      ),
    ),
    lT(s, r - 0.3, 0.2),
    s.mark(
      M4("choke", a, 34, {
        phi: 120,
        u: 19,
        along: !1,
      }),
    ),
    {
      ...s.finish(),
      bodyMat: e.steel,
      paint: "metal",
      length: n,
      radius: i + 1,
      rear: i + 1,
    }
  );
}
var rA = (o) => (o > 0 ? "R" : "L");
function cT(o, t, e, s, n, i, a = 0) {
  let r = new PlaneGeometry(n, i);
  (r.translate(0, 0, 0.03), o.hard(t, Ie(Qe(r), e, s, a)));
}
function vF(o, t, e, s = {}) {
  let n = t === "rail" ? 0 : -7.5;
  if (t !== "rail") {
    let i = lF(-30, 30, -7.5, 1);
    s.look ? o.hard(s.look, i) : o.body(i);
    for (let a of [-25, 25])
      o.screw([0, -7.5, a], "D", {
        r: 2.2,
        h: 0.3,
        drive: "hex",
        seg: 8,
      });
  }
  return (cF(o, e, n, s), n);
}
function MF(
  o,
  t,
  e,
  s,
  n = {
    n: 10,
    wear: !0,
  },
) {
  (o.hard(
    "steel",
    _c(
      cn(
        [
          [0, 3.4],
          [0.9, 3.4],
          [1.1, 7.2, 1, 0.9],
          [5, 7.2, 0, 0.9],
          [5.8, 6.3, 1, 0],
          [5.8, 0],
        ],
        {
          flute: n,
        },
      ),
      s < 0 ? "x-" : "x+",
      [s * 16.1, t - 0.4, e],
    ),
  ),
    cT(o, "black", [s * 21.9, t - 0.4, e], rA(s), 9.6, 1.5, 25),
    o.hard("steel", Ie(w4(7.6, 2.6), [-s * 16.1, t - 0.4, e], rA(-s), 12)));
}
function qQ(o, t) {
  let e = 0;
  for (; e < o.length - 2 && t > o[e + 1][0];) e++;
  let s = o[Math.max(0, e - 1)],
    n = o[e],
    i = o[e + 1],
    a = o[Math.min(o.length - 1, e + 2)],
    r = Math.min(1, Math.max(0, (t - n[0]) / (i[0] - n[0])));
  return n.map((l, c) => {
    if (c === 0) return t;
    let h = ((i[c] - s[c]) / (i[0] - s[0])) * (i[0] - n[0]),
      f = ((a[c] - n[c]) / (a[0] - n[0])) * (i[0] - n[0]),
      u = r * r,
      d = u * r;
    return (
      (2 * d - 3 * u + 1) * n[c] +
      (d - 2 * u + r) * h +
      (-2 * d + 3 * u) * i[c] +
      (d - u) * f
    );
  });
}
function wF(o = "mlok") {
  let t = ao(),
    e = Jc(t.grip),
    s = vF(e, o, 44, {
      look: "poly",
    });
  MF(e, s, 0, -1, {
    n: 8,
    trap: !0,
    wear: !0,
  });
  let n = [
      [9, 14.6, 21.6, 5],
      [12.5, 13.9, 19.2, 3.6],
      [17.5, 13, 16.8, 2.8],
      [30, 14, 17.7, 2.6],
      [50, 15.4, 19.4, 2.5],
      [68, 14.7, 18.5, 2.5],
      [79, 15.5, 19.5, 2.6],
      [84, 16, 20, 2.8],
      [86.4, 15.3, 19.3, 2.8],
    ],
    i = [9, 10.6, 12.5, 15, 17.5, 21];
  for (let u = 0; u <= 20; u++) i.push(24 + u * 2.1);
  i.push(69, 73, 77, 80.5, 83.2, 84.8, 86.4);
  let a = 22,
    r = (u) => -(u - 9) * 0.035,
    l = [];
  (i.forEach((u) => {
    let [, d, m, p] = qQ(n, u),
      x = u >= 24 && u <= 66 ? (Math.round((u - 24) / 2.1) % 2) * 0.95 : 0,
      g = [];
    for (let b = 0; b < a; b++) {
      let v = (b / a) * Pn,
        y = Math.cos(v),
        M = Math.sin(v),
        w = 2 / p,
        T =
          d *
          Math.sign(y) *
          Math.pow(Math.abs(y), w) *
          (1 - 0.07 * Math.max(0, -M)),
        S = m * Math.sign(M) * Math.pow(Math.abs(M), w),
        E = Math.min(1, Math.max(0, (Math.abs(M) - 0.5) / 0.35)),
        _ = 1 - (x * E * E * (3 - 2 * E)) / Math.hypot(T, S);
      g.push([T * _, s - u, S * _ + r(u)]);
    }
    l.push(g);
  }),
    e.body(
      iF(l, {
        capB: !0,
      }),
    ));
  let c = r(86.4),
    h = [0, s - 86.3, -c];
  (e.hard(
    "rubber",
    _c(
      cn(
        [
          [-0.6, 13.7],
          [0.1, 13.7],
        ],
        {
          seg: 22,
        },
      ),
      "y-",
      h,
    ),
  ),
    e.hard(
      "poly",
      _c(
        cn(
          [
            [0, 13.2],
            [0.7, 13.2],
            [0.9, 14.3, 1, 0.55],
            [4.8, 14.3, 0, 0.55],
            [5.6, 13.5, 1, 0],
            [5.6, 0],
          ],
          {
            flute: {
              n: 18,
              wear: !0,
            },
          },
        ),
        "y-",
        h,
      ),
    ),
    cT(e, "black", [0, s - 86.3 - 5.6, -c], "D", 15, 2.2));
  for (let u of [-1, 1])
    e.screw([u * 15.05, s - 75.5, -r(75.5)], rA(u), {
      r: 1.5,
      h: 0.25,
      drive: "none",
      look: "steel",
      seg: 8,
    });
  e.mark(Ie(An("vfg", 13), [-15.42, s - 45, -r(45)], "L"));
  let f = ds(
    Zn([0, (s - 49) / 1e3, r(49) / 1e3], [0.0154, 0.0405, 0.0194], 0.0148),
    Zn([0, (s - 2) / 1e3, 0], [0.0162, 0.0075, 0.022], 0.001),
  );
  return (
    (f.hold = {
      at: [-0.0154, (s - 46) / 1e3, r(46) / 1e3],
      fingers: [0, 0.12, -1],
      palm: [1, 0, 0],
    }),
    {
      ...e.finish(),
      bodyMat: t.grip,
      paint: "furniture",
      grip: f,
      drop: 92 - s,
      yR: s,
    }
  );
}
function EF(o = "mlok") {
  let t = ao(),
    e = Jc(t.poly),
    s = o === "rail" ? 0 : -7.5;
  o !== "rail" &&
    e.body(
      wr(se(-61, -7.5, 61, 0, 1.2), 20.6, {
        b: 0.6,
      }),
    );
  let n = (c) => c.map(([h, f, u]) => [h, s + f, u]),
    i = [
      [-62, -0.3, 2],
      [62, -0.3, 2],
      [62, -10, 3],
      [57, -19, 5],
      [49, -19.5, 4],
      [43, -13.5, 6],
      [30, -16, 10],
      [-30, -44, 12],
      [-42, -47, 7],
      [-55, -40, 8],
      [-62, -16, 6],
    ],
    a = [
      [14, -4.5, 1.5],
      [58, -4.5, 2],
      [60, -9, 2],
      [22, -11.5, 2],
    ];
  (e.body(
    wr(n(i), 31, {
      b: 2.6,
      bs: 3,
      soft: !0,
      holes: [
        n([
          [-46, -9, 3.5],
          [-8, -9, 3.5],
          [-41, -30, 3.5],
        ]),
      ],
    }),
  ),
    e.body(
      wr(n(a), 41, {
        b: 2.2,
        bs: 2,
        soft: !0,
      }),
    ));
  for (let c of [-1, 1]) {
    e.body(
      jo(
        [
          [c * 10.4, s - 4],
          [c * 10.4, s + 5.2],
          [c * 12.4, s + 5.2, 0.5],
          [c * 15.5, s + 2.4, 0.8],
          [c * 15.5, s - 4],
        ],
        112,
        {
          u: -56,
          b: 0.5,
        },
      ),
    );
    for (let h = 0; h < 5; h++)
      e.body(
        wr(se(24 + h * 6.5, s - 4.7, 25.5 + h * 6.5, s - 3.95), 4, {
          x: c * 18.1,
          b: 0.25,
        }),
      );
  }
  for (let c of [-22, 38])
    (e.screw([15.5, s - 0.9, c], "R", {
      r: 2.4,
      h: 1.1,
      drive: "torx",
      seg: 12,
    }),
      e.hard("steel", Ie(w4(5.6, 1.5), [-15.5, s - 0.9, c], "L", 8)));
  for (let c = 0; c < 9; c++) {
    let h = 9 + c * 6;
    e.body(
      b4(
        wr(se(-0.9, -0.2, 0.9, 0.8), 21, {
          b: 0.3,
        }),
        [0, s - 16 - 0.423 * h, 30 - 0.906 * h],
        [205, 0, 0],
      ),
    );
  }
  e.mark(Ie(An("afg", 13), [-15.56, s - 20, 6], "L"));
  let r = (c) => c.map(([h, f]) => [h / 1e3, (s + f) / 1e3]),
    l = ds(
      Zs(r(i), 0.031, {
        r: 0.0026,
      }),
      Zs(r(a), 0.041, {
        r: 0.0022,
      }),
    );
  return (
    (l.hold = {
      at: [0, (s - 30) / 1e3, 0],
      fingers: [1, 0, 0],
      palm: [0, 0.906, 0.423],
    }),
    {
      ...e.finish(),
      bodyMat: t.poly,
      paint: "polymer",
      grip: l,
      drop: 47 - s,
      yR: s,
    }
  );
}
function TF(o = "mlok") {
  let t = ao(),
    e = Jc(t.aluLt),
    s = vF(e, o, 44, {
      depth: 6,
    }),
    n = (c) => s + c;
  MF(e, s, 0, 1);
  let i = (c, h) => [
    [-18 + c, n(-5 - c), h && 1.5],
    [18 - c, n(-5 - c), h && 1.5],
    [18 - c, n(-26), h],
    [14.5 - c * 0.6, n(-31 + c), h],
    [-14.5 + c * 0.6, n(-31 + c), h],
    [-18 + c, n(-26), h],
  ];
  e.body(
    jo(i(0, 1), 58, {
      u: -29,
      b: 0.8,
    }),
  );
  let a = [-9, n(-12.5)],
    r = [-9, n(-23.5)],
    l = [7, n(-18)];
  (e.hard(
    "alu",
    jo(i(1, 0), 2.6, {
      u: 29,
      b: 0.4,
      holes: [
        yh(10, 3.5, 0, a[0], a[1]),
        yh(10, 3.5, 0, r[0], r[1]),
        yh(14, 7.3, 0, l[0], l[1]),
      ],
    }),
  ),
    e.hard(
      "redGlass",
      Qc(0.01, 3.7, 29.9, 1, {
        x: a[0],
        y: a[1],
        seg: 10,
      }),
    ),
    e.hard(
      v4(16720916, 6),
      Qc(0.01, 0.9, 30.05, 1, {
        x: a[0],
        y: a[1],
        seg: 8,
      }),
    ),
    e.hard(
      "glass",
      Qc(0.01, 3.7, 29.9, 1, {
        x: r[0],
        y: r[1],
        seg: 10,
      }),
    ),
    e.hard(
      "bright",
      cn(
        [
          [30.8, 7.4],
          [25.6, 2.3],
          [25.6, 0],
        ],
        {
          seg: 14,
          x: l[0],
          y: l[1],
        },
      ),
    ),
    e.hard(
      v4(16767108, 0.9),
      Qc(0.01, 1.3, 25.9, 1, {
        x: l[0],
        y: l[1],
        seg: 4,
      }),
    ));
  for (let [c, h, f] of [
    [a, 3.5, 10],
    [r, 3.5, 10],
  ])
    e.hard(
      "steel",
      cn(
        [
          [31.6, h + 1.3],
          [32.5, h + 1.3],
          [32.9, h + 0.9, 1],
          [32.9, h + 0.1],
          [31.6, h + 0.1],
        ],
        {
          seg: f,
          x: c[0],
          y: c[1],
        },
      ),
    );
  (e.hard(
    "steel",
    y4(
      cn(
        [
          [31.6, 9],
          [33.2, 9],
          [33.7, 8.5, 1],
          [33.7, 7.4],
          [31.6, 7.4],
        ],
        {
          seg: 16,
          x: l[0],
          y: l[1],
        },
      ),
      36,
      2,
      {
        x: l[0],
        y: l[1],
      },
    ),
  ),
    e.hard(
      "alu",
      jo(i(1, 0), 2, {
        u: -31,
        b: 0.4,
      }),
    ));
  {
    let c = [7.5, n(-17.5), -31];
    (e.hard(
      "steel",
      Ie(
        Zc(
          [
            [0, 6.3],
            [0.8, 6.3],
            [1, 5.8, 1, 0.5],
            [4.2, 5.8, 0, 0.5],
            [4.8, 5.1, 1, 0],
            [4.8, 0],
          ],
          {
            flute: {
              n: 9,
              wear: !0,
            },
          },
        ),
        c,
        "B",
      ),
    ),
      cT(e, "white", [7.5, n(-17.5) + 2.5, -35.8], "B", 0.9, 4.4),
      e.mark(Ie(An("modes", 20.5), c, "B")));
  }
  {
    let c = [-10.5, n(-23), -31];
    (e.hard(
      "steel",
      Ie(
        Zc(
          [
            [0, 3.1],
            [1.2, 3.1],
            [1.5, 2.8, 1],
            [1.5, 1.7],
          ],
          {
            seg: 10,
          },
        ),
        c,
        "B",
      ),
    ),
      e.hard(
        "rubber",
        Ie(
          Zc(
            [
              [1, 2.3],
              [5.5, 2.3],
              [6.8, 1.5],
            ],
            {
              seg: 8,
            },
          ),
          c,
          "B",
        ),
      ),
      e.mark(Ie(An("remote", 8.5), [-10.5, n(-17.4), -31], "B")));
  }
  for (let c of [-1, 1])
    e.screw([c * 14.6, n(-8.6), -31], "B", {
      r: 1.3,
      h: 0.4,
      drive: "hex",
      seg: 8,
    });
  (e.hard(
    "rubber",
    Ie(
      aF(
        vh(gl(26, 6.2, 2), 2.4, {
          b: 0.8,
        }),
        1.7,
        2,
      ),
      [-16, n(-1.4), 2],
      "L",
    ),
  ),
    e.hard(
      "rubber",
      Mh(
        [
          [-18, n(-1.4), -11.3],
          [-18.9, n(-3.6), -19],
          [-19.7, n(-10), -28.6],
          [-18, n(-19), -37],
          [-13.2, n(-22.8), -39.6],
          [-10.5, n(-23), -37.6],
        ],
        1.2,
        {
          seg: 14,
          radial: 5,
        },
      ),
    ),
    e.hard(
      "poly",
      jo(se(-21.5, n(-12.2), -17.8, n(-7.6)), 3.2, {
        u: -30.2,
        b: 0.6,
      }),
    ));
  {
    let c = [-18, n(-15.5), -12];
    (e.hard(
      "steel",
      Ie(
        Zc(
          [
            [0, 6.7],
            [0.8, 6.7],
            [1.1, 6.3, 1],
            [1.1, 5.5],
          ],
          {
            seg: 14,
          },
        ),
        c,
        "L",
      ),
    ),
      e.hard(
        "rubber",
        Ie(
          Zc(
            [
              [0.2, 5.3],
              [1.5, 5.3],
              [2.3, 4.2],
              [2.5, 0],
            ],
            {
              seg: 12,
              crease: 50,
            },
          ),
          c,
          "L",
        ),
      ),
      e.mark(Ie(An("fire", 6), [-18.05, n(-24.3), -12], "L")));
  }
  for (let [c, h] of [
    [-11, "el"],
    [-21.5, "wd"],
  ])
    (e.screw([-18.2, n(c), 15], "L", {
      r: 2.5,
      h: 0.7,
      drive: "hex",
      look: "brass",
      seg: 10,
    }),
      e.mark(Ie(An(h, 5.6), [-18.05, n(c), 23], "L")));
  e.mark(Ie(An("tl1", 11.5), [-18.05, n(-8.3), 2.5], "L"));
  {
    let c = [18, n(-16), 13];
    (e.hard(
      "alu",
      Ie(
        Zc(
          [
            [0, 6.6],
            [0.5, 6.6],
            [0.7, 7.2, 1, 0.45],
            [2.6, 7.2, 0, 0.45],
            [3.2, 6.5, 1, 0],
            [3.2, 0],
          ],
          {
            flute: {
              n: 11,
              wear: !0,
            },
          },
        ),
        c,
        "R",
      ),
    ),
      cT(e, "black", [21.2, n(-16), 13], "R", 9, 1.3, 35));
  }
  return (
    e.mark(Ie(An("warnY", 17), [18.05, n(-15.5), -12], "R")),
    {
      ...e.finish(),
      bodyMat: t.aluLt,
      paint: "metal",
      laser: [a[0], a[1], 33],
      drop: 31 - s,
      yR: s,
    }
  );
}

export {
  $c,
  E4,
  EF,
  Hs,
  Ie,
  Mh,
  Pn,
  TF,
  _c,
  aT,
  b4,
  bF,
  cn,
  dF,
  gF,
  mF,
  pF,
  rF,
  uF,
  wF,
  xF,
  yF,
};

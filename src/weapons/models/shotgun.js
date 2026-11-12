// weapons/models/shotgun.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  Euler,
  Float32BufferAttribute,
  Group,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { Vn, th } from "../../vendor/geometry-utils.js";
import { createCanvas, createRandom } from "../../core/math.js";
import {
  Bt,
  Du,
  Gt,
  JR,
  Kr,
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
  ds,
  fa,
  ff,
  g4,
  jc,
  ml,
  ni,
  se,
  si,
  us,
  x2,
  x4,
  xh,
  xy,
} from "./geometry.js";
import { Mn, Tc, Yo, gs, hf, pn, yi, yo, zi } from "../../player/rig.js";
import { TN } from "./pistol.js";
import { Mp, Ou, Rc, gf, wp } from "./shared.js";
import { buildGrenade } from "./legacy.js";
import { xl } from "./camos.js";

var l1 = {
  BORE: 0.042,
  TUBEY: 0.0145,
  RW: 0.0195,
  RB: 0.0045,
  RT: 0.0585,
  U0: 0.022,
  U1: 0.228,
  RAIL0: 0.064,
  RAIL1: 0.174,
  RAILY: 0.059,
  PUMP0: 0.314,
  PUMP1: 0.474,
  STROKE: 0.082,
  BOLT: 0.076,
  UNLOCK: 0.006,
  MUZ: 0.64,
  TUBE_STD: 0.552,
  TUBE_EXT: 0.626,
  PORT: {
    u0: 0.13,
    u1: 0.206,
    y0: 0.0315,
    y1: 0.0525,
  },
  LOAD: {
    u0: 0.104,
    u1: 0.206,
    hw: 0.0136,
    top: 0.0538,
  },
  SHELL: {
    r: 0.0101,
    len: 0.06,
    rim: 0.0112,
    head: 0.016,
  },
  SHELL_REST: [0, 0.0145, 0.166],
  LIFT_PIVOT: [0, 0.006, 0.06],
};
var {
  BORE: Ws,
  TUBEY: Ts,
  RW: po,
  RB: Li,
  RT: c1,
  U0: SN,
  U1: qT,
  RAIL0: Xu,
  RAIL1: V5,
  RAILY: Np,
  PUMP0: ir,
  PUMP1: Zr,
  MUZ: xa,
  PORT: Ro,
  LOAD: hn,
  SHELL: La,
} = l1;
var Ch = Np + 0.0075;
var Ef = Ch + 0.0125;
var W4 = 0.0236;
var Wy = 1.07;
var Gy = Ts + 0.019;
var qy = 0.0142;
var _N = (o) => o.map((t) => [t[0], t[1]]);
var Bp = (o, t, e) => (o < t ? t : o > e ? e : o);
var Tf = (o, t, e) => {
  let s = Bp((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
function V00(o) {
  let t = o.length,
    e = o[0].length - 1;
  return (s, n = new Array(e)) => {
    if (s <= o[0][0]) {
      for (let m = 0; m < e; m++) n[m] = o[0][m + 1];
      return n;
    }
    if (s >= o[t - 1][0]) {
      for (let m = 0; m < e; m++) n[m] = o[t - 1][m + 1];
      return n;
    }
    let i = 0;
    for (; s > o[i + 1][0];) i++;
    let a = o[Math.max(0, i - 1)],
      r = o[i],
      l = o[i + 1],
      c = o[Math.min(t - 1, i + 2)],
      h = l[0] - r[0],
      f = (s - r[0]) / h,
      u = f * f,
      d = u * f;
    for (let m = 1; m <= e; m++) {
      let p = ((l[m] - a[m]) / (l[0] - a[0])) * h,
        x = ((c[m] - r[m]) / (c[0] - r[0])) * h;
      n[m - 1] =
        (2 * d - 3 * u + 1) * r[m] +
        (d - 2 * u + f) * p +
        (-2 * d + 3 * u) * l[m] +
        (d - u) * x;
    }
    return n;
  };
}
function U5(o, t, e = {}) {
  let s = o.map((v, y) => t(v, y)),
    n = o.length,
    i = s[0].length,
    a = [0];
  for (let v = 1; v < n; v++) {
    let y = 0;
    for (let M = 0; M < i; M++)
      y += Math.hypot(
        s[v][M][0] - s[v - 1][M][0],
        s[v][M][1] - s[v - 1][M][1],
        o[v] - o[v - 1],
      );
    a.push(a[v - 1] + y / i);
  }
  let r = a[n - 1],
    l = [],
    c = [],
    h = [],
    f = 0;
  {
    let v = s[n >> 1];
    for (let y = 0; y < i; y++) {
      let M = v[y],
        w = v[(y + 1) % i];
      f += Math.hypot(M[0] - w[0], M[1] - w[1]);
    }
  }
  for (let v = 0; v < n; v++)
    for (let y = 0; y <= i; y++) {
      let M = s[v][y % i];
      (l.push(M[0], M[1], -o[v]),
        e.metric ? c.push(a[v], (y / i) * f) : c.push(a[v] / r, y / i));
    }
  for (let v = 0; v < n - 1; v++)
    for (let y = 0; y < i; y++) {
      let M = v * (i + 1) + y,
        w = M + 1,
        T = M + i + 1,
        S = T + 1;
      h.push(M, T, w, w, T, S);
    }
  for (let [v, y] of [
    [e.capA, 0],
    [e.capB, n - 1],
  ]) {
    if (!v) continue;
    let M = 0,
      w = 0;
    for (let E of s[y]) ((M += E[0] / i), (w += E[1] / i));
    let T = l.length / 3;
    for (let E = 0; E <= i; E++) {
      let _ = s[y][E % i];
      (l.push(_[0], _[1], -o[y]),
        c.push(e.metric ? a[y] : a[y] / r, e.metric ? (E / i) * f : E / i));
    }
    let S = l.length / 3;
    (l.push(M, w, -o[y]), c.push(e.metric ? a[y] : a[y] / r, 0.5));
    for (let E = 0; E < i; E++)
      y === 0 ? h.push(S, T + E, T + E + 1) : h.push(S, T + E + 1, T + E);
  }
  let u = new BufferGeometry();
  (u.setAttribute("position", new Float32BufferAttribute(l, 3)),
    u.setAttribute("uv", new Float32BufferAttribute(c, 2)));
  let d = 0,
    m = 0,
    p = 0;
  for (let v = 0; v < l.length; v += 3)
    ((p += l[v]), (m += l[v + 1]), (d += l[v + 2]));
  ((p /= l.length / 3), (m /= l.length / 3), (d /= l.length / 3));
  let x = 0;
  for (let v = 0; v < h.length; v += 3) {
    let y = h[v] * 3,
      M = h[v + 1] * 3,
      w = h[v + 2] * 3,
      T = l[y] - p,
      S = l[y + 1] - m,
      E = l[y + 2] - d,
      _ = l[M] - p,
      R = l[M + 1] - m,
      C = l[M + 2] - d,
      L = l[w] - p,
      A = l[w + 1] - m,
      O = l[w + 2] - d;
    x += T * (R * O - C * A) - S * (_ * O - C * L) + E * (_ * A - R * L);
  }
  if (x < 0)
    for (let v = 0; v < h.length; v += 3) {
      let y = h[v + 1];
      ((h[v + 1] = h[v + 2]), (h[v + 2] = y));
    }
  (u.setIndex(h),
    (u = e.flat ? u.toNonIndexed() : th(u, e.crease ?? 0.75)),
    e.flat && u.computeVertexNormals());
  let g = [0, 0];
  return {
    geo: u,
    at: (v, y, M) => {
      let w = v * r,
        T = 0;
      for (; T < n - 2 && a[T + 1] < w;) T++;
      let S = a[T + 1] > a[T] ? Bp((w - a[T]) / (a[T + 1] - a[T]), 0, 1) : 0,
        E = (((y % 1) + 1) % 1) * i,
        _ = Math.floor(E) % i,
        R = E - Math.floor(E),
        C = (_ + 1) % i,
        L = s[T],
        A = s[T + 1];
      return (
        (g[0] =
          (L[_][0] * (1 - R) + L[C][0] * R) * (1 - S) +
          (A[_][0] * (1 - R) + A[C][0] * R) * S),
        (g[1] =
          (L[_][1] * (1 - R) + L[C][1] * R) * (1 - S) +
          (A[_][1] * (1 - R) + A[C][1] * R) * S),
        M.set(g[0], g[1], -(o[T] * (1 - S) + o[T + 1] * S))
      );
    },
    L: r,
    per: f,
  };
}
function Ik(o, t) {
  let e = [],
    s = o[2],
    n = o[3],
    i = o[4],
    a = o[0] - o[1];
  if (n + i > a) {
    let c = a / (n + i);
    ((n *= c), (i *= c));
  }
  let r = o[0] - n,
    l = o[1] + i;
  for (let c = 0; c <= t; c++) {
    let h = (Math.PI * c) / t,
      f = Math.cos(h),
      u = Math.sin(h);
    e.push([
      s * Math.sign(f) * Math.pow(Math.abs(f), 2 / o[5]),
      r + n * Math.pow(u, 2 / o[5]),
    ]);
  }
  for (let c = 0; c <= t; c++) {
    let h = (Math.PI * c) / t,
      f = -Math.cos(h),
      u = Math.sin(h);
    e.push([
      s * Math.sign(f) * Math.pow(Math.abs(f), 2 / o[6]),
      l - i * Math.pow(u, 2 / o[6]),
    ]);
  }
  return e;
}
function G00(o, t) {
  let e = o[3],
    s = o[4],
    n = o[0] - o[1];
  if (e + s > n) {
    let r = n / (e + s);
    ((e *= r), (s *= r));
  }
  let i = o[0] - e,
    a = o[1] + s;
  return t > o[0] || t < o[1]
    ? 0
    : t > i
      ? o[2] * Math.pow(Math.max(0, 1 - Math.pow((t - i) / e, o[5])), 1 / o[5])
      : t < a
        ? o[2] *
          Math.pow(Math.max(0, 1 - Math.pow((a - t) / s, o[6])), 1 / o[6])
        : o[2];
}
function W00(o, t, e) {
  let n = Math.round((e - t) / 5e-4) + 1,
    i = new Float64Array(n * 7),
    a = new Array(7);
  for (let c = 0; c < n; c++) {
    o(t + c * 5e-4, a);
    let h = a[3],
      f = a[4],
      u = a[0] - a[1];
    if (h + f > u) {
      let d = u / (h + f);
      ((h *= d), (f *= d));
    }
    i.set([a[0], a[1], a[2], h, f, a[5], a[6]], c * 7);
  }
  let r = (c, h, f) => {
      let u = Bp((f - t) / 5e-4, 0, n - 1.0001),
        d = Math.floor(u) * 7,
        m = u - Math.floor(u),
        p = (w) => i[d + w] + (i[d + 7 + w] - i[d + w]) * m,
        x = p(2),
        g = p(3),
        b = p(4),
        v = p(0) - g,
        y = p(1) + b,
        M = Math.abs(c) / x;
      if (h > v) {
        let w = p(5);
        return Math.pow(Math.pow(M, w) + Math.pow((h - v) / g, w), 1 / w) - 1;
      }
      if (h < y) {
        let w = p(6);
        return Math.pow(Math.pow(M, w) + Math.pow((y - h) / b, w), 1 / w) - 1;
      }
      return M - 1;
    },
    l = 4e-4;
  return (c, h, f) => {
    let u = -f,
      d = Bp(u, t, e),
      m = r(c, h, d),
      p = r(c + l, h, d) - r(c - l, h, d),
      x = r(c, h + l, d) - r(c, h - l, d),
      g = r(c, h, Math.min(e, d + l)) - r(c, h, Math.max(t, d - l)),
      b = (m * 2 * l) / Math.max(Math.hypot(p, x, g), 1e-4),
      v = Math.max(t - u, u - e);
    return v > 0 ? Math.hypot(Math.max(b, 0), v) : Math.max(b, v);
  };
}
var q00 = [
  [-0.295, 0.0165, -0.101, 0.0208, 0.014, 0.014, 2.8, 2.8],
  [-0.25, 0.02, -0.09, 0.0208, 0.014, 0.015, 2.6, 2.5],
  [-0.2, 0.024, -0.079, 0.0204, 0.013, 0.016, 2.5, 2.4],
  [-0.15, 0.0272, -0.069, 0.0196, 0.012, 0.016, 2.5, 2.3],
  [-0.12, 0.0275, -0.07, 0.019, 0.012, 0.016, 2.5, 2.3],
  [-0.104, 0.025, -0.0745, 0.0188, 0.013, 0.015, 2.4, 2.3],
  [-0.09, 0.02, -0.081, 0.0187, 0.014, 0.013, 2.3, 2.4],
  [-0.078, 0.014, -0.085, 0.0186, 0.015, 0.012, 2.2, 2.6],
  [-0.066, 0.0092, -0.086, 0.0184, 0.016, 0.014, 2.2, 2.6],
  [-0.054, 0.0068, -0.081, 0.018, 0.016, 0.02, 2.2, 2.3],
  [-0.04, 0.006, -0.067, 0.0176, 0.016, 0.023, 2.2, 2.2],
  [-0.026, 0.0066, -0.05, 0.0174, 0.0155, 0.023, 2.2, 2.2],
  [-0.012, 0.0085, -0.033, 0.0176, 0.015, 0.021, 2.2, 2.2],
  [0, 0.0128, -0.018, 0.0182, 0.014, 0.016, 2.4, 2.3],
  [0.01, 0.0215, -0.0065, 0.0192, 0.012, 0.01, 2.8, 2.8],
  [0.022, 0.033, 0.0015, 0.0187, 0.009, 0.004, 3.4, 3.6],
];
var G4 = V00(q00);
var K00 = [
  -0.295, -0.272, -0.246, -0.218, -0.19, -0.165, -0.146, -0.132, -0.121, -0.112,
  -0.104, -0.097, -0.09, -0.083, -0.076, -0.069, -0.062, -0.055, -0.048, -0.041,
  -0.034, -0.027, -0.02, -0.013, -0.006, 0, 0.005, 0.01, 0.014, 0.018, 0.022,
];
var zN = 11;
var LN = 0.0128;
var DN = ir + 0.016;
function X00(o) {
  let t = W4;
  for (let s = 0; s < zN; s++) {
    let n = Math.abs(o - (DN + s * LN));
    n < 0.0024 && (t -= 0.0015 * (1 - Tf(5e-4, 0.0024, n)));
  }
  let e = Math.min(o - ir, Zr - o);
  return (
    e < 0.0045 &&
      (t -=
        0.0045 * (1 - Math.sqrt(Math.max(0, 1 - Math.pow(1 - e / 0.0045, 2))))),
    t
  );
}
function Y00(o, t) {
  let e = Ws - Ts;
  return t.map((s) => {
    let n = Math.cos(s),
      i = Math.sin(s),
      a = Wy * n,
      r = o;
    if (i > 0) {
      r = Math.min(r, (Gy - Ts) / i);
      let l = a * a + i * i,
        c = e * e * i * i - l * (e * e - qy * qy);
      c > 0 && (r = Math.min(r, (e * i - Math.sqrt(c)) / l));
    }
    return [Wy * r * n, Ts + r * i];
  });
}
function j00(o) {
  let t = Ws - Ts,
    e = Math.asin(Bp((Gy - Ts) / W4, -1, 1)),
    s = Math.atan2(
      (Gy - Ts) * Wy,
      Math.sqrt(Math.max(1e-9, qy * qy - Math.pow(t - (Gy - Ts), 2))),
    ),
    n = [],
    i = (l, c, h) => {
      for (let f = 0; f < h; f++) n.push(l + ((c - l) * f) / h);
    },
    a = Math.PI - e,
    r = e;
  return (
    i(a, Math.PI + 0.35, o ? 4 : 2),
    i(Math.PI + 0.35, 2 * Math.PI - 0.35, o ? 12 : 5),
    i(2 * Math.PI - 0.35, 2 * Math.PI + r, o ? 4 : 2),
    i(r, s, o ? 2 : 1),
    i(s, Math.PI - s, o ? 5 : 2),
    i(Math.PI - s, a, o ? 2 : 1),
    n
  );
}
var $00 = (() => {
  let o = (ir + Zr) / 2,
    t = (Zr - ir) / 2,
    e = 0.003;
  return (s, n, i) => {
    let a = Math.max(
        Math.hypot(s / Wy, n - Ts) - (W4 - 2e-4),
        n - Gy,
        qy - Math.hypot(s, n - Ws),
      ),
      r = Math.abs(-i - o) - t,
      l = Math.max(a + e, 0),
      c = Math.max(r + e, 0);
    return Math.sqrt(l * l + c * c) + Math.min(Math.max(a + e, r + e), 0) - e;
  };
})();
function KT(o) {
  let t = createRandom(o),
    e = new Float32Array(4096);
  for (let l = 0; l < 4096; l++) e[l] = t();
  let s = (l, c, h) =>
      e[
        (Math.imul(l, 73856093) ^
          Math.imul(c, 19349663) ^
          Math.imul(h, 83492791)) &
          4095
      ],
    n = (l) => l * l * (3 - 2 * l),
    i = (l, c, h) => l + (c - l) * h,
    a = (l, c, h) => {
      let f = Math.floor(l),
        u = Math.floor(c),
        d = Math.floor(h),
        m = n(l - f),
        p = n(c - u),
        x = n(h - d);
      return i(
        i(
          i(s(f, u, d), s(f + 1, u, d), m),
          i(s(f, u + 1, d), s(f + 1, u + 1, d), m),
          p,
        ),
        i(
          i(s(f, u, d + 1), s(f + 1, u, d + 1), m),
          i(s(f, u + 1, d + 1), s(f + 1, u + 1, d + 1), m),
          p,
        ),
        x,
      );
    };
  return {
    noise: a,
    fbm: (l, c, h, f) => {
      let u = 0.5,
        d = 0,
        m = 0;
      for (let p = 0; p < f; p++)
        ((d += u * a(l, c, h)),
          (m += u),
          (l *= 2.03),
          (c *= 2.03),
          (h *= 2.03),
          (u *= 0.5));
      return d / m;
    },
  };
}
var Tl = (o, t) => (globalThis.GH_TUNE || {})[o] ?? t;
function Z00(o, t, e, s, n) {
  let i = o - 0.055 - e * 0.09,
    a = t + 0.11 * n.off + e * 0.22 * n.skew,
    r = Math.hypot(i, a);
  r +=
    (s.fbm(o * 6, t * 6, e * 1.6, 3) - 0.5) * 0.075 +
    (s.fbm(o * 30, t * 30, e * 5, 2) - 0.5) * 0.004;
  let l = r / 0.009,
    c = l - Math.floor(l),
    h = Tf(0.25, 0.85, c) * (1 - Tf(0.85, 1, c)),
    f = s.fbm(o * 44, t * 44, e * 2.2, 4),
    u = Tf(0.46, 0.74, s.fbm(o * 13 + 7, t * 13, e * 1.2 + 3, 3)),
    d = Tf(0.61, 0.66, s.fbm(o * 90 + 3, t * 90, e * 1, 3)),
    m = Tf(0.7, 0.9, s.fbm(o * 900, t * 900, e * 150, 2)) * (0.4 + 0.6 * c),
    p = Tf(0.42, 0.72, s.fbm(o * 7 + 11, t * 7, e * 2.4, 2)),
    x =
      (Math.sin(e * 250 + s.fbm(o * 16, t * 16, e * 9, 2) * 28) * 0.5 + 0.5) *
        p +
      0.5 * (1 - p),
    g = s.fbm(o * 420, t * 420, e * 9, 2),
    b = s.fbm(o * 9 + 2, t * 9, e * 6 + 5, 3);
  return Bp(
    0.58 +
      (f - 0.5) * Tl("ws", 0.36) +
      (b - 0.5) * 0.3 -
      h * Tl("wl", 0.034) -
      u * Tl("wm", 0.2) -
      d * 0.17 -
      m * 0.2 +
      (g - 0.5) * 0.22 +
      (x - 0.5) * 0.17 * n.curl,
    0,
    1,
  );
}
var WT = [
  [19, 11, 7],
  [38, 22, 13],
  [61, 37, 22],
  [86, 54, 33],
  [110, 73, 47],
];
function RN(o, t, e, s, n) {
  let i = createCanvas(o, t),
    a = i.getContext("2d"),
    r = a.createImageData(o, t),
    l = r.data,
    c = new Vector3(),
    h = KT(s);
  for (let u = 0; u < t; u++)
    for (let d = 0; d < o; d++) {
      e((d + 0.5) / o, (u + 0.5) / t, c);
      let m = Z00(c.x, c.y, c.z, h, n) * (WT.length - 1),
        p = Math.min(WT.length - 2, Math.floor(m)),
        x = m - p,
        g = WT[p],
        b = WT[p + 1],
        v = (u * o + d) * 4;
      ((l[v] = g[0] + (b[0] - g[0]) * x),
        (l[v + 1] = g[1] + (b[1] - g[1]) * x),
        (l[v + 2] = g[2] + (b[2] - g[2]) * x),
        (l[v + 3] = 255));
    }
  a.putImageData(r, 0, 0);
  let f = new CanvasTexture(i);
  return (
    (f.flipY = !1),
    (f.colorSpace = SRGBColorSpace),
    (f.anisotropy = 8),
    (f.wrapS = ClampToEdgeWrapping),
    (f.wrapT = RepeatWrapping),
    f
  );
}
var Hk = null;
function Q00() {
  if (Hk) return Hk;
  let o = ao(),
    t = createRandom(71),
    e = 256,
    s = (v, y, M, w, T = 1) => {
      let S = v.clone();
      return (
        S.color.set(y),
        (S.roughness = M),
        (S.envMapIntensity = T),
        (S.userData = {
          base: new Color(y),
          wear: w,
        }),
        S
      );
    },
    n = new Float32Array(e * e);
  for (let v = 0; v < n.length; v++) n[v] = t();
  let i = KT(5),
    a = ff(
      e,
      (v, y) => {
        let M = i.noise(v / 18, y / 1.3, 0.5);
        return (
          (M > 0.62 ? -(M - 0.62) * 3.2 : 0) +
          i.noise(v / 60, y / 5, 9) * 0.25 +
          n[y * e + v] * 0.05
        );
      },
      2.2,
      (v, y) =>
        0.42 +
        0.3 * i.noise(v / 18, y / 1.3, 0.5) +
        0.12 * i.noise(v / 40, y / 40, 4),
    ),
    r = {},
    l = (v, y, M, w) => {
      if (r[v]) return r[v];
      let T = new MeshPhysicalMaterial({
        map: y(),
        roughness: 1,
        metalness: 0,
        clearcoat: Tl("wcc", 0.34),
        clearcoatRoughness: Tl("wcr", 0.3),
        normalMap: x2(a.n, M, w),
        normalScale: new Vector2(0.55, 0.55),
        roughnessMap: x2(a.r, M, w),
      });
      return (
        (T.userData = {
          base: new Color(4860437),
          wear: 1,
        }),
        (r[v] = T)
      );
    },
    c = (() => {
      let T = Ze(16),
        S = Math.sin(T),
        E = Math.cos(T),
        _ = 1.45,
        R = 0.55,
        C = Math.sin(Ze(32)),
        L = Math.cos(Ze(32)),
        A = new Float32Array(512 * 256),
        O = new Float32Array(512 * 256),
        H = new Float32Array(512 * 256),
        F = KT(41),
        P = (-73.7 / 2) * S + (30 / 2) * E,
        z = (73.7 / 2) * S + (30 / 2) * E,
        k = (M0) => 1 - Math.abs(2 * (M0 - Math.floor(M0)) - 1);
      for (let M0 = 0; M0 < 256; M0++)
        for (let f0 = 0; f0 < 512; f0++) {
          let _0 = ((f0 + 0.5) / 512) * 73.7,
            F0 = ((M0 + 0.5) / 256) * 30,
            m0 = -_0 * S + F0 * E,
            S0 = _0 * S + F0 * E,
            T0 = Math.min(
              13.4 - Math.abs(F0 - 30 / 2),
              (35.2 - Math.abs(_0 - 73.7 / 2)) * C - Math.abs(F0 - 30 / 2) * L,
            ),
            j0 = M0 * 512 + f0;
          O[j0] = T0;
          let Z0 = Bp(
            1.15 * (1 - Tf(0.8, 5.5, T0)) +
              1.5 * Tf(0.52, 0.78, F.fbm(_0 * 0.16, F0 * 0.16, 2.5, 3)) -
              0.15,
            0,
            1,
          );
          H[j0] = Z0;
          let lt = Math.min(k(m0 / _), k(S0 / _));
          A[j0] = T0 < 0.25 ? 1 : T0 < 0.8 ? 0.05 : Math.min(lt, 1 - 0.72 * Z0);
        }
      let I = (M0) => {
          let f0 = createCanvas(512, 256),
            _0 = f0.getContext("2d");
          return {
            c: f0,
            g: _0,
            img: _0.createImageData(512, 256),
            srgb: M0,
          };
        },
        G = I(!0),
        K = I(!1),
        $ = I(!1),
        n0 = R / (73.7 / 512),
        e0 = R / (30 / 256);
      for (let M0 = 0; M0 < 256; M0++)
        for (let f0 = 0; f0 < 512; f0++) {
          let _0 = M0 * 512 + f0,
            F0 = _0 * 4,
            m0 = A[_0],
            S0 =
              A[M0 * 512 + Math.min(511, f0 + 1)] -
              A[M0 * 512 + Math.max(0, f0 - 1)],
            T0 =
              A[Math.min(255, M0 + 1) * 512 + f0] -
              A[Math.max(0, M0 - 1) * 512 + f0],
            j0 = -S0 * 0.5 * n0,
            Z0 = -T0 * 0.5 * e0,
            lt = 1 / Math.hypot(j0, Z0, 1);
          ((K.img.data[F0] = (j0 * lt * 0.5 + 0.5) * 255),
            (K.img.data[F0 + 1] = (Z0 * lt * 0.5 + 0.5) * 255),
            (K.img.data[F0 + 2] = (lt * 0.5 + 0.5) * 255),
            (K.img.data[F0 + 3] = 255));
          let H0 = m0 >= 1 - 0.72 * H[_0] - 1e-4 && O[_0] >= 0.8 ? H[_0] : 0,
            Y0 = 0.4 + 0.46 * m0 + 0.5 * H0,
            et = 0.92 + 0.16 * F.noise(f0 * 0.9, M0 * 0.9, 7);
          ((G.img.data[F0] = Math.min(255, 58 * Y0 * et)),
            (G.img.data[F0 + 1] = Math.min(255, 31 * Y0 * et)),
            (G.img.data[F0 + 2] = Math.min(255, 15 * Y0 * et)),
            (G.img.data[F0 + 3] = O[_0] > 0.25 ? 255 : 0));
          let ct = Bp(0.92 - 0.42 * H0 - 0.1 * m0, 0.3, 1) * 255;
          (($.img.data[F0] = $.img.data[F0 + 1] = $.img.data[F0 + 2] = ct),
            ($.img.data[F0 + 3] = 255));
        }
      let p0 = (M0) => {
          M0.g.putImageData(M0.img, 0, 0);
          let f0 = new CanvasTexture(M0.c);
          return (
            (f0.flipY = !1),
            (f0.anisotropy = 8),
            M0.srgb && (f0.colorSpace = SRGBColorSpace),
            f0
          );
        },
        t0 = new MeshStandardMaterial({
          map: p0(G),
          normalMap: p0(K),
          roughnessMap: p0($),
          roughness: 1,
          metalness: 0,
          normalScale: new Vector2(1.9, 1.9),
          alphaTest: 0.5,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
        });
      return (
        (t0.userData = {
          base: new Color(2889483),
          wear: 1,
        }),
        t0
      );
    })(),
    h = J00(),
    f = createCanvas(1024, 256),
    u = f.getContext("2d"),
    d = {};
  ((u.fillStyle = "#fff"), (u.textBaseline = "middle"));
  let m = (v, y = 600) =>
      y + " " + v + 'px Bahnschrift, "Segoe UI", Arial, sans-serif',
    p = (v, y, M, w, T, S) => {
      (u.save(),
        u.translate(y, M),
        S(w, T),
        u.restore(),
        (d[v] = [y / 1024, 1 - (M + T) / 256, (y + w) / 1024, 1 - M / 256]));
    };
  (p("gauge", 0, 0, 640, 64, () => {
    ((u.font = m(40, 700)),
      u.fillText("12 GA", 6, 34),
      (u.font = m(30)),
      u.fillText("FOR 2\xBE AND 3 INCH SHELLS", 150, 35));
  }),
    p("maker", 0, 72, 800, 56, () => {
      ((u.font = m(30)),
        u.fillText(
          "GH-ARMS  \xB7  SOLSTICE WORKS  \xB7  CYL BORE  \xB7  STEEL SHOT OK",
          6,
          30,
        ));
    }),
    p("proof", 0, 136, 200, 80, () => {
      ((u.lineWidth = 4),
        (u.strokeStyle = "#fff"),
        u.beginPath(),
        u.arc(38, 40, 28, 0, 6.283),
        u.stroke(),
        (u.font = m(30, 700)),
        u.fillText("GH", 17, 42),
        u.strokeRect(84, 14, 52, 52),
        u.fillText("P", 100, 42),
        (u.font = m(24, 700)),
        u.fillText("N", 152, 42));
    }),
    p("safe", 220, 136, 150, 80, () => {
      ((u.font = m(26, 700)),
        u.fillText("PUSH", 4, 22),
        u.fillText("SAFE", 4, 56),
        u.beginPath(),
        u.moveTo(96, 40),
        u.lineTo(140, 40),
        u.lineTo(126, 28),
        u.moveTo(140, 40),
        u.lineTo(126, 52),
        (u.lineWidth = 5),
        (u.strokeStyle = "#fff"),
        u.stroke());
    }));
  let x = new CanvasTexture(f);
  ((x.anisotropy = 8), (x.colorSpace = SRGBColorSpace));
  let g = o.mark.clone();
  return (
    (g.map = x),
    (g.userData = {
      base: new Color(6974576),
      wear: 1,
      cells: d,
    }),
    (Hk = {
      mark: g,
      sgDecal: (v, y, M, w, T, S) => {
        let E = d[v],
          _ = (y * ((E[3] - E[1]) * 256)) / ((E[2] - E[0]) * 1024),
          R = new PlaneGeometry(y, _),
          C = R.attributes.uv;
        for (let L = 0; L < C.count; L++)
          C.setXY(
            L,
            E[0] + C.getX(L) * (E[2] - E[0]),
            E[1] + C.getY(L) * (E[3] - E[1]),
          );
        return (
          R.rotateY(S < 0 ? -Math.PI / 2 : Math.PI / 2),
          R.translate(M, w, -T),
          Qe(R)
        );
      },
      blued: s(o.steel, 2106153, Tl("brg", 0.45), 2.1, Tl("ben", 0.85)),
      bluedMatte: s(o.steel, 2303531, Tl("mrg", 0.9), 2.1, 0.5),
      carrier: s(o.steel, 5001044, Tl("crg", 0.85), 1.6, 0.6),
      tubeSteel: s(o.steel, 2369067, 0.38, 1.9),
      barrel: s(o.steel, 1908516, 0.34, 1.8),
      bolt: s(o.steelBright, 10132898, 0.24, 1.2),
      plate: s(o.alu, 1776671, Tl("prg", 0.95), 2.4, Tl("pen", 0.5)),
      pad: s(o.rubber, 789517, 0.9, 1),
      spacer: s(o.poly, 14209732, 0.6, 1),
      riser: s(o.leather, 1184532, 0.74, 1),
      wood: l,
      chequer: c,
      shell: h,
      pores: a,
    })
  );
}
var IN = {
  W: 1024,
  H: 512,
  SW: 640,
  LT: 0.07,
  DX: 939,
  DR: 82,
  DY: [86, 256, 426],
  SX0: 664,
  SX1: 836,
  FOLDS: 6,
};
function J00() {
  let {
      W: o,
      H: t,
      SW: e,
      LT: s,
      DX: n,
      DR: i,
      DY: a,
      SX0: r,
      SX1: l,
      FOLDS: c,
    } = IN,
    h = createRandom(1207),
    f = KT(77),
    u = t / s,
    d = e / (2 * Math.PI * La.r),
    m = i / La.rim,
    p = (t0) => t - t0 * u,
    x = createCanvas(o, t),
    g = x.getContext("2d"),
    b = createCanvas(o, t),
    v = b.getContext("2d"),
    y = createCanvas(o, t),
    M = y.getContext("2d"),
    w = (t0, M0) => `rgb(255,${Math.round(t0 * 255)},${Math.round(M0 * 255)})`,
    T = (t0) => {
      let M0 = Math.round(128 + t0 * 127);
      return `rgb(${M0},${M0},${M0})`;
    },
    S = (t0, M0 = 700) =>
      `${M0} ${t0}px Bahnschrift, "Segoe UI", Arial, sans-serif`;
  ((v.fillStyle = T(0)),
    v.fillRect(0, 0, o, t),
    (M.fillStyle = w(0.9, 0)),
    M.fillRect(0, 0, o, t),
    (g.fillStyle = "#1a1512"),
    g.fillRect(0, 0, o, t));
  let E = p(La.head),
    _ = p(0.0548);
  {
    let t0 = g.createLinearGradient(0, 0, 0, E);
    (t0.addColorStop(0, "#84120e"),
      t0.addColorStop(0.22, "#a21811"),
      t0.addColorStop(0.8, "#a61912"),
      t0.addColorStop(1, "#8e1510"),
      (g.fillStyle = t0),
      g.fillRect(0, 0, e, E));
  }
  ((M.fillStyle = w(0.36, 0)), M.fillRect(0, 0, e, E));
  let R = 80,
    C = e / R;
  for (let t0 = 0; t0 < R; t0++) {
    let M0 = t0 * C;
    ((g.fillStyle = `rgba(40,0,0,${0.16 + 0.1 * h()})`),
      g.fillRect(M0, _ - 6, 1.6, E - _ + 6),
      (g.fillStyle = "rgba(255,120,90,0.10)"),
      g.fillRect(M0 + C * 0.5, _ - 6, 1.4, E - _ + 6),
      (v.fillStyle = T(-0.5)),
      v.fillRect(M0, _ - 4, 2, E - _ + 4),
      (v.fillStyle = T(0.3)),
      v.fillRect(M0 + C * 0.45, _ - 4, 2.4, E - _ + 4));
  }
  ((g.fillStyle = "rgba(30,0,0,0.35)"),
    g.fillRect(e * 0.5 - 1, 0, 1.5, E),
    (v.fillStyle = T(0.5)),
    v.fillRect(e * 0.5 - 1.5, 0, 3, E));
  for (let t0 = 0; t0 < 2 * c; t0++) {
    let M0 = ((t0 + 0.5) / (2 * c)) * e,
      f0 = t0 % 2 === 0,
      _0 = g.createLinearGradient(0, _ + 10, 0, 0);
    (_0.addColorStop(0, "rgba(40,0,0,0)"),
      _0.addColorStop(0.3, f0 ? "rgba(40,0,0,0.5)" : "rgba(255,150,120,0.28)"),
      _0.addColorStop(1, f0 ? "rgba(40,0,0,0.6)" : "rgba(255,150,120,0.34)"),
      (g.fillStyle = _0),
      g.fillRect(M0 - 1.5, 0, 3, _ + 10),
      (v.fillStyle = T(f0 ? -0.8 : 0.6)),
      v.fillRect(M0 - 2, 0, 4, _ + 4));
  }
  {
    let t0 = g.createLinearGradient(0, 0, 0, _);
    (t0.addColorStop(0, "rgba(255,190,170,0.20)"),
      t0.addColorStop(1, "rgba(255,190,170,0)"),
      (g.fillStyle = t0),
      g.fillRect(0, 0, e, _));
  }
  let L = "#f2e2b4";
  for (let t0 of [e * 0.25, e * 0.75])
    (g.save(),
      g.translate(t0, (_ + E) / 2 + 4),
      g.rotate(-Math.PI / 2),
      (g.textAlign = "center"),
      (g.textBaseline = "middle"),
      (g.fillStyle = L),
      (g.font = S(64, 800)),
      g.fillText("00 BUCK", 0, -46),
      (g.font = S(33, 700)),
      g.fillText("BREACHER  12 GA", 0, 8),
      (g.font = S(23, 600)),
      g.fillText("2\xBE IN \xB7 9 PELLETS \xB7 1325 FPS", 0, 46),
      g.fillRect(-128, 70, 256, 5),
      (g.font = S(17, 600)),
      g.fillText("GH-ARMS  LOT 24B-0932", 0, 92),
      g.restore(),
      M.save(),
      M.translate(t0, (_ + E) / 2 + 4),
      M.rotate(-Math.PI / 2),
      (M.textAlign = "center"),
      (M.textBaseline = "middle"),
      (M.fillStyle = w(0.55, 0)),
      (M.font = S(64, 800)),
      M.fillText("00 BUCK", 0, -46),
      (M.font = S(33, 700)),
      M.fillText("BREACHER  12 GA", 0, 8),
      M.restore());
  ((g.fillStyle = L),
    g.fillRect(0, _ + 12, e, 3),
    g.fillRect(0, _ + 19, e, 1.5),
    (g.fillStyle = "rgba(40,0,0,0.5)"),
    g.fillRect(0, E - 5, e, 5));
  for (let t0 = 0; t0 < 90; t0++) {
    let M0 = h() * e,
      f0 = _ + h() * (E - _),
      _0 = 6 + h() * 34,
      F0 = 0.6 + h() * 1.2;
    ((g.fillStyle = `rgba(255,205,190,${0.05 + 0.13 * h()})`),
      g.fillRect(M0, f0, F0, _0),
      (M.fillStyle = w(0.6, 0)),
      M.fillRect(M0, f0, F0, _0));
  }
  {
    let t0 = g.createLinearGradient(0, E, 0, t);
    (t0.addColorStop(0, "#c7a04e"),
      t0.addColorStop(0.5, "#d8b662"),
      t0.addColorStop(0.86, "#cfa954"),
      t0.addColorStop(1, "#e6cb82"),
      (g.fillStyle = t0),
      g.fillRect(0, E, e, t - E));
  }
  ((M.fillStyle = w(0.3, 1)), M.fillRect(0, E, e, t - E));
  for (let t0 = Math.floor(E); t0 < t; t0++) {
    let M0 = h();
    ((g.fillStyle =
      M0 > 0.5
        ? `rgba(255,240,190,${(M0 - 0.5) * 0.22})`
        : `rgba(70,45,10,${(0.5 - M0) * 0.26})`),
      g.fillRect(0, t0, e, 1),
      (M.fillStyle = w(0.24 + 0.16 * M0, 1)),
      M.fillRect(0, t0, e, 1));
  }
  for (let t0 = 0; t0 < 60; t0++) {
    let M0 = h() * e,
      f0 = E + h() * (t - E),
      _0 = 5 + h() * 22,
      F0 = g.createRadialGradient(M0, f0, 0, M0, f0, _0);
    (F0.addColorStop(0, `rgba(96,62,22,${0.1 + 0.14 * h()})`),
      F0.addColorStop(1, "rgba(96,62,22,0)"),
      (g.fillStyle = F0),
      g.fillRect(M0 - _0, f0 - _0, 2 * _0, 2 * _0));
  }
  for (let t0 of [0.0104, 0.0128]) {
    let M0 = p(t0);
    ((g.fillStyle = "rgba(60,36,6,0.55)"),
      g.fillRect(0, M0 - 2, e, 4),
      (g.fillStyle = "rgba(255,236,170,0.30)"),
      g.fillRect(0, M0 + 2, e, 1.2),
      (v.fillStyle = T(-0.85)),
      v.fillRect(0, M0 - 2.5, e, 5),
      (M.fillStyle = w(0.5, 1)),
      M.fillRect(0, M0 - 2, e, 4),
      (v.strokeStyle = T(-0.2)),
      (v.lineWidth = 1),
      v.beginPath());
    for (let f0 = -8; f0 < e + 8; f0 += 4)
      (v.moveTo(f0, M0 + 2.5), v.lineTo(f0 + 5, M0 - 2.5));
    v.stroke();
  }
  ((g.fillStyle = "rgba(50,30,6,0.5)"),
    g.fillRect(0, E, e, 2.5),
    (g.fillStyle = "rgba(255,240,180,0.35)"),
    g.fillRect(0, E + 2.5, e, 1.5),
    (v.fillStyle = T(0.5)),
    v.fillRect(0, E, e, 4));
  {
    let t0 = p(0.0019);
    ((g.fillStyle = "rgba(60,36,6,0.45)"),
      g.fillRect(0, t0 - 2, e, 3),
      (g.fillStyle = "rgba(255,244,200,0.45)"),
      g.fillRect(0, t0 + 1, e, t - t0),
      (M.fillStyle = w(0.2, 1)),
      M.fillRect(0, t0 + 1, e, t - t0));
  }
  {
    let t0 = g.createLinearGradient(0, 0, 0, t);
    (t0.addColorStop(0, "#5a2a1c"),
      t0.addColorStop(0.12, "#2b201b"),
      t0.addColorStop(1, "#0d0c0b"),
      (g.fillStyle = t0),
      g.fillRect(r, 0, l - r, t));
  }
  for (let t0 = 0; t0 < 260; t0++)
    ((g.fillStyle = `rgba(${150 + 60 * h()},${130 + 50 * h()},${110 + 40 * h()},${0.03 + 0.07 * h()})`),
      g.fillRect(r + h() * (l - r), h() * t, 1 + h() * 2, 4 + h() * 40));
  ((M.fillStyle = w(0.92, 0)), M.fillRect(r - 8, 0, l - r + 16, t));
  let A = (t0, M0) => {
      for (let f0 of [g, v, M]) (f0.save(), f0.translate(n, a[t0]));
      M0();
      for (let f0 of [g, v, M]) f0.restore();
    },
    O = (t0, M0, f0, _0) => {
      ((t0.fillStyle = _0),
        t0.beginPath(),
        t0.arc(0, 0, f0, 0, 6.2832),
        t0.arc(0, 0, M0, 0, 6.2832, !0),
        t0.fill("evenodd"));
    },
    H = (t0, M0) =>
      A(t0, () => {
        let f0 = i + 3,
          _0 = 0.0031 * m,
          F0 = 0.0038 * m;
        {
          let S0 = g.createRadialGradient(0, 0, F0, 0, 0, f0);
          (S0.addColorStop(0, "#caa552"),
            S0.addColorStop(0.7, "#d6b560"),
            S0.addColorStop(0.93, "#cda852"),
            S0.addColorStop(1, "#ecd590"),
            O(g, 0, f0, S0));
        }
        O(M, 0, f0, w(0.3, 1));
        for (let S0 = F0; S0 < f0; S0 += 1) {
          let T0 = h();
          ((g.strokeStyle =
            T0 > 0.5
              ? `rgba(255,240,190,${(T0 - 0.5) * 0.3})`
              : `rgba(70,45,10,${(0.5 - T0) * 0.3})`),
            (g.lineWidth = 1),
            g.beginPath(),
            g.arc(0, 0, S0, 0, 6.2832),
            g.stroke(),
            (M.strokeStyle = w(0.22 + 0.18 * T0, 1)),
            (M.lineWidth = 1),
            M.beginPath(),
            M.arc(0, 0, S0, 0, 6.2832),
            M.stroke());
        }
        let m0 = (S0, T0, j0) => {
          for (let [Z0, lt] of [
            [g, "rgba(58,36,8,0.82)"],
            [v, T(-0.9)],
            [M, w(0.55, 1)],
          ])
            (Z0.save(),
              Z0.rotate(T0),
              Z0.translate(0, -0.0071 * m),
              (Z0.font = S(j0, 800)),
              (Z0.textAlign = "center"),
              (Z0.textBaseline = "middle"),
              (Z0.fillStyle = lt),
              Z0.fillText(S0, 0, 0),
              Z0.restore());
        };
        (m0("12", 0, 25),
          m0("12", Math.PI, 25),
          m0("GH", Math.PI / 2, 21),
          m0("GA", -Math.PI / 2, 21));
        for (let S0 of [0.25, 0.75, 1.25, 1.75]) m0("\u2605", S0 * Math.PI, 13);
        (O(g, _0, F0, "#3a2610"),
          O(v, _0 - 1, F0 + 1, T(-0.9)),
          O(
            g,
            _0 - 0.5,
            _0 + 2.2,
            M0 ? "rgba(40,20,12,0.9)" : "rgba(150,26,18,0.85)",
          ),
          O(M, _0, F0, w(0.7, 0.3)));
        {
          let S0 = g.createRadialGradient(-_0 * 0.25, -_0 * 0.3, 0, 0, 0, _0);
          (S0.addColorStop(0, "#f1eee6"),
            S0.addColorStop(0.7, "#c9c6bd"),
            S0.addColorStop(1, "#8f8c84"),
            O(g, 0, _0, S0));
        }
        O(M, 0, _0, w(0.22, 1));
        {
          let S0 = v.createRadialGradient(0, 0, 0, 0, 0, _0);
          (S0.addColorStop(0, T(0.5)),
            S0.addColorStop(1, T(0.1)),
            O(v, 0, _0, S0));
        }
        if (M0) {
          let S0 = 4e-4 * m,
            T0 = -3e-4 * m,
            j0 = 0.0011 * m;
          for (let [Z0, lt, H0] of [
            [g, "rgba(30,26,22,0.95)", "rgba(30,26,22,0)"],
            [v, T(-1), T(0.2)],
          ]) {
            let Y0 = Z0.createRadialGradient(S0, T0, 0, S0, T0, j0);
            (Y0.addColorStop(0, lt),
              Y0.addColorStop(0.55, lt),
              Y0.addColorStop(1, H0),
              (Z0.fillStyle = Y0),
              Z0.beginPath(),
              Z0.arc(S0, T0, j0, 0, 6.2832),
              Z0.fill());
          }
          {
            let Z0 = g.createRadialGradient(0, 0, F0, 0, 0, F0 * 2.3);
            (Z0.addColorStop(0, "rgba(30,22,16,0.6)"),
              Z0.addColorStop(1, "rgba(30,22,16,0)"),
              O(g, F0, F0 * 2.3, Z0),
              O(M, F0, F0 * 1.8, w(0.7, 0.6)));
          }
        }
      });
  (H(0, !1),
    H(2, !0),
    A(1, () => {
      let t0 = i * 0.72;
      {
        let M0 = g.createRadialGradient(0, 0, 0, 0, 0, t0);
        (M0.addColorStop(0, "#7c120d"),
          M0.addColorStop(0.5, "#a51912"),
          M0.addColorStop(1, "#b21c14"),
          O(g, 0, t0, M0));
      }
      O(M, 0, t0, w(0.42, 0));
      {
        let M0 = v.createRadialGradient(0, 0, 0, 0, 0, t0);
        (M0.addColorStop(0, T(-0.5)),
          M0.addColorStop(1, T(0.2)),
          O(v, 0, t0, M0));
      }
      for (let M0 = 0; M0 < c; M0++) {
        let f0 = ((M0 + 0.5) / c) * 6.2832;
        for (let [F0, m0, S0] of [
          [g, "rgba(34,0,0,0.75)", 2.4],
          [v, T(-1), 4.5],
        ])
          (F0.save(),
            F0.rotate(f0),
            (F0.strokeStyle = m0),
            (F0.lineWidth = S0),
            (F0.lineCap = "round"),
            F0.beginPath(),
            F0.moveTo(1.5, 0),
            F0.lineTo(t0 * 0.93, 0),
            F0.stroke(),
            F0.restore());
        (g.save(), g.rotate(f0 + (0.5 / c) * 6.2832));
        let _0 = g.createLinearGradient(0, 0, t0, 0);
        (_0.addColorStop(0.2, "rgba(255,170,140,0)"),
          _0.addColorStop(0.75, "rgba(255,170,140,0.26)"),
          _0.addColorStop(1, "rgba(255,170,140,0.05)"),
          (g.strokeStyle = _0),
          (g.lineWidth = 7),
          g.beginPath(),
          g.moveTo(t0 * 0.2, 0),
          g.lineTo(t0 * 0.95, 0),
          g.stroke(),
          g.restore());
      }
      (O(g, 0, 4.5, "#2a0503"), O(v, 0, 5, T(-1)));
    }));
  let F = v.getImageData(0, 0, o, t).data,
    P = createCanvas(o, t),
    z = P.getContext("2d"),
    k = z.createImageData(o, t),
    I = k.data,
    G = g.getImageData(0, 0, o, t),
    K = G.data,
    $ = (t0, M0) =>
      F[
        (Math.min(t - 1, Math.max(0, M0)) * o +
          Math.min(o - 1, Math.max(0, t0))) *
          4
      ] / 255;
  for (let t0 = 0; t0 < t; t0++)
    for (let M0 = 0; M0 < o; M0++) {
      let f0 = (t0 * o + M0) * 4,
        _0 = M0 < e ? d / u : 1,
        F0 = ($(M0 + 1, t0) - $(M0 - 1, t0)) * 2.2 * _0,
        m0 = ($(M0, t0 + 1) - $(M0, t0 - 1)) * 2.2,
        S0 = 1 / Math.hypot(F0, m0, 1);
      ((I[f0] = (-F0 * S0 * 0.5 + 0.5) * 255),
        (I[f0 + 1] = (m0 * S0 * 0.5 + 0.5) * 255),
        (I[f0 + 2] = (S0 * 0.5 + 0.5) * 255),
        (I[f0 + 3] = 255));
      let T0 = 0.94 + 0.12 * f.fbm(M0 / 40, t0 / 40, 3.3, 3);
      ((K[f0] *= T0), (K[f0 + 1] *= T0), (K[f0 + 2] *= T0));
    }
  (z.putImageData(k, 0, 0), g.putImageData(G, 0, 0));
  let n0 = (t0, M0) => {
      let f0 = new CanvasTexture(t0);
      return (M0 && (f0.colorSpace = SRGBColorSpace), (f0.anisotropy = 8), f0);
    },
    e0 = n0(y, !1),
    p0 = new MeshStandardMaterial({
      map: n0(x, !0),
      normalMap: n0(P, !1),
      normalScale: new Vector2(0.9, 0.9),
      roughnessMap: e0,
      metalnessMap: e0,
      roughness: 1,
      metalness: 1,
    });
  return (
    (p0.name = "shell"),
    (p0.userData = {
      base: new Color(9050644),
      wear: 1,
    }),
    p0
  );
}
var Fk = {};
function AN(o = !1) {
  let t = o ? "fired" : "live";
  if (Fk[t]) return Fk[t];
  let {
      W: e,
      H: s,
      SW: n,
      LT: i,
      DX: a,
      DR: r,
      DY: l,
      SX0: c,
      SX1: h,
      FOLDS: f,
    } = IN,
    u = 6 * f,
    d = La.len,
    m = La.r,
    p = La.rim,
    x = m + 3e-4,
    g = Math.PI * 2,
    b = [],
    v = [],
    y = [],
    M = (P) => 0.5 + 0.5 * Math.cos(((P / u) * f - 0.5) * g),
    w = (P, z, k = 0) => {
      let I = b.length / 3;
      for (let G = 0; G <= u; G++) {
        let K = (G / u) * g,
          $ = z + k * (0.35 - M(G));
        (b.push(Math.cos(K) * $, Math.sin(K) * $, d / 2 - P),
          v.push(((1 - G / u) * n) / e, P / i));
      }
      return I;
    },
    T = (P, z, k, I = 0, G = k) => {
      let K = b.length / 3;
      for (let $ = 0; $ <= u; $++) {
        let n0 = ($ / u) * g,
          e0 = Math.cos(n0),
          p0 = Math.sin(n0);
        (b.push(e0 * k, p0 * k, d / 2 - z + I * M($)),
          v.push(
            (a + ((e0 * G) / p) * r) / e,
            1 - (l[P] - ((p0 * G) / p) * r) / s,
          ));
      }
      return K;
    },
    S = (P, z, k = 0) => {
      let I = b.length / 3;
      for (let G = 0; G <= u; G++) {
        let K = (G / u) * g,
          $ = z + k * (0.35 - M(G));
        (b.push(Math.cos(K) * $, Math.sin(K) * $, d / 2 - P),
          v.push((c + ((h - c) * G) / u) / e, 1 - (0.07 - P) / 0.045));
      }
      return I;
    },
    E = (P, z) => {
      for (let k = 0; k < u; k++)
        y.push(P + k, P + k + 1, z + k, P + k + 1, z + k + 1, z + k);
    },
    _ = (P, z, k, I, G = !1) => {
      let K = b.length / 3;
      (b.push(0, 0, d / 2 - z), v.push(k, I));
      for (let $ = 0; $ < u; $++)
        G ? y.push(K, P + $ + 1, P + $) : y.push(K, P + $, P + $ + 1);
    },
    R = (P) => {
      for (let z = 0; z < P.length - 1; z++) E(P[z], P[z + 1]);
    },
    C = o ? 2 : 0,
    L = a / e,
    A = (P) => 1 - l[P] / s;
  {
    let P = [];
    (o && P.push(T(C, 75e-5, 7e-4)),
      P.push(
        T(C, o ? 12e-5 : -4e-5, 0.0016),
        T(C, 8e-5, 0.003),
        T(C, 4e-4, 0.00325),
        T(C, 4e-4, 0.0037),
        T(C, 0, 0.004),
        T(C, 0, p - 5e-4),
        T(C, 45e-5, p),
      ),
      _(P[0], o ? 95e-5 : -8e-5, L, A(C), !0),
      R(P));
  }
  let O = [
    w(45e-5, p),
    w(0.00145, p),
    w(0.00185, x + 12e-5),
    w(0.0022, x),
    w(0.01, x),
    w(0.0104, x - 16e-5),
    w(0.0108, x),
    w(0.0124, x),
    w(0.0128, x - 16e-5),
    w(0.0132, x),
    w(La.head - 3e-4, x),
    w(La.head, x - 12e-5),
    w(La.head + 1e-4, m),
    w(0.035, m),
    w(0.0548, m),
  ];
  if (o) {
    (O.push(
      w(0.06, m, 12e-5),
      w(0.065, m + 1e-4, 42e-5),
      w(0.0688, m + 3e-4, 62e-5),
      w(0.07, m + 1e-4, 66e-5),
    ),
      R(O));
    let P = [
      S(0.07, m - 5e-4, 6e-4),
      S(0.065, m - 7e-4, 3e-4),
      S(0.05, m - 8e-4),
      S(0.03, m - 8e-4),
      S(0.0292, m - 0.003),
    ];
    (E(O[O.length - 1], P[0]),
      R(P),
      _(P[P.length - 1], 0.0286, (c + h) / 2 / e, 0.02));
  } else {
    (O.push(
      w(0.057, m - 5e-4),
      w(0.0586, m - 0.0016),
      w(0.05955, m - 0.003, 2e-4),
    ),
      R(O));
    let P = [
      T(1, 0.05955, m - 0.003, 0, 0.008),
      T(1, 0.0596, 0.0054, 5e-4, 0.006),
      T(1, 0.0593, 0.0036, 85e-5, 0.004),
      T(1, 0.0588, 0.0018, 7e-4, 0.002),
      T(1, 0.0582, 6e-4, 0, 7e-4),
    ];
    {
      let z = O[O.length - 1] * 3,
        k = P[0] * 3;
      for (let I = 0; I < (u + 1) * 3; I++) b[k + I] = b[z + I];
    }
    (R(P), _(P[P.length - 1], 0.0576, L, A(1)));
  }
  let H = 0;
  for (let P = 0; P < y.length; P += 3) {
    let z = y[P] * 3,
      k = y[P + 1] * 3,
      I = y[P + 2] * 3;
    H +=
      b[z] * (b[k + 1] * b[I + 2] - b[k + 2] * b[I + 1]) -
      b[z + 1] * (b[k] * b[I + 2] - b[k + 2] * b[I]) +
      b[z + 2] * (b[k] * b[I + 1] - b[k + 1] * b[I]);
  }
  if (H < 0)
    for (let P = 0; P < y.length; P += 3) {
      let z = y[P + 1];
      ((y[P + 1] = y[P + 2]), (y[P + 2] = z));
    }
  let F = new BufferGeometry();
  return (
    F.setAttribute("position", new Float32BufferAttribute(b, 3)),
    F.setAttribute("uv", new Float32BufferAttribute(v, 2)),
    F.setIndex(y),
    (F = th(F, 0.8)),
    (Fk[t] = F)
  );
}
function HN(o, t) {
  let n = Math.min(0.0125, (o - Li) * 0.45),
    i = o - n,
    a = t > 2 ? 2 : 1,
    r = 7e-4,
    l = [[-po, Li + 0.0022 + r]],
    c = [[po - 0.0022 - r, Li]],
    h = [[po, i - r]],
    f = [[-0.0075 + r, o]];
  for (let u = 0; u <= a; u++) {
    let d = Math.PI * (1 + (0.5 * u) / a);
    l.push([
      -po + 0.0022 + 0.0022 * Math.cos(d),
      Li + 0.0022 + 0.0022 * Math.sin(d),
    ]);
  }
  for (let u = 0; u <= a; u++) {
    let d = Math.PI * (1.5 + (0.5 * u) / a);
    c.push([
      po - 0.0022 + 0.0022 * Math.cos(d),
      Li + 0.0022 + 0.0022 * Math.sin(d),
    ]);
  }
  for (let u = 0; u <= t; u++) {
    let d = ((Math.PI / 2) * u) / t;
    h.push([0.0075 + (po - 0.0075) * Math.cos(d), i + n * Math.sin(d)]);
  }
  for (let u = 0; u <= t; u++) {
    let d = (Math.PI / 2) * (1 + u / t);
    f.push([-0.0075 + (po - 0.0075) * Math.cos(d), i + n * Math.sin(d)]);
  }
  return (
    l.push([-po + 0.0022 + r, Li]),
    c.push([po, Li + 0.0022 + r]),
    h.push([0.0075 - r, o]),
    f.push([-po, i - r]),
    {
      BL: l,
      BR: c,
      SR: h,
      SL: f,
      ys: i,
      sh: n,
      xf: 0.0075,
    }
  );
}
var kN = (o, t) => {
  let e = HN(o, t);
  return [...e.BL, ...e.BR, ...e.SR, ...e.SL];
};
var tt0 = (o) =>
  o >= 0.066 ? c1 : c1 - (c1 - 0.0343) * Math.pow((0.066 - o) / 0.044, 2.2);
var CN = new Map();
var et0 = !0;
var st0 = {
  camo: "factory",
  optic: "irons",
  muzzle: "none",
  underbarrel: "none",
  magazine: "std",
  stock: "std",
};
function buildShotgun(o = {}) {
  let t = {
    ...st0,
    ...(o.build || {}),
  };
  if (!((o.detail || "view") === "view")) return ot0(t, o.build || null);
  let s = performance.now(),
    n = FN(t, !0),
    i = performance.now();
  ((n.build = o.build || null),
    (n.arms = new hf(n)),
    (n.hands = {
      right: n.arms.R.root,
      left: n.arms.L.root,
    }),
    at0(n));
  let a = performance.now();
  return (
    TN(n),
    (n.buildMs = {
      model: Math.round(i - s),
      grips: Math.round(a - i),
      clips: Math.round(performance.now() - a),
      total: Math.round(performance.now() - s),
    }),
    n
  );
}
function FN(o, t) {
  let e = ao(),
    s = Q00(),
    n = new Group(),
    i = {};
  n.name = "gun_shotgun";
  let a = g4(),
    r = g4(),
    l = (k) =>
      t
        ? k
        : {
            ...k,
            b: 0,
            soft: !1,
            cs: 1,
            bs: 1,
          },
    c = (k, I, G = {}) => us(k, I, l(G)),
    h = (k, I, G = {}) => si(k, I, l(G)),
    f = (k, I, G = {}) => jc(k, I, l(G)),
    u = (k) => (t ? k : Math.max(8, Math.round(k * 0.6))),
    d = o.camo && o.camo !== "factory" ? o.camo : null,
    m = [],
    p = (k, I, G, K = !1) => {
      let $ = Du(n, i, k, I);
      K && (($.userData.hidden = !0), ($.visible = !1));
      let n0 = g4(),
        e0 = G(n0, $) || [];
      n0.build($, I);
      for (let p0 of e0) (p0.position.sub(I), $.add(p0));
      return $;
    },
    x = t ? 6 : 3;
  {
    let k = HN(c1, x),
      I = hn.hw,
      G = hn.top,
      K = [...k.BL, ...k.BR, ...k.SR, ...k.SL],
      $ = {
        b: 0,
        soft: !0,
      },
      n0 = (p0) => r.add(s.blued, Rc(p0)),
      e0 = t
        ? Array.from(
            {
              length: 23,
            },
            (p0, t0) => 0.022 + (0.044 * t0) / 22,
          )
        : [0.022, 0.03, 0.042, 0.054, 0.066];
    if (
      (n0(
        Qe(
          U5(e0, (p0) => kN(tt0(p0), x), {
            metric: !0,
            capA: !0,
            crease: 0.9,
          }).geo,
        ),
      ),
      n0(
        h(K, hn.u0 - 0.066, {
          ...$,
          u: 0.066,
        }),
      ),
      t)
    ) {
      n0(
        h(
          [
            [-I, Li],
            ...k.BL.slice().reverse(),
            ...k.SL.slice().reverse(),
            ...k.SR.slice().reverse(),
            ...k.BR.slice().reverse(),
            [I, Li],
            [I, G],
            [-I, G],
          ],
          Ro.u0 - hn.u0,
          {
            ...$,
            u: hn.u0,
          },
        ),
      );
      let p0 = Math.asin((Ro.y1 - k.ys) / k.sh),
        t0 = [k.xf + (po - k.xf) * Math.cos(p0), Ro.y1],
        M0 = k.SR.filter((f0) => f0[1] > Ro.y1 + 1e-5);
      (n0(
        h(
          [
            [-I, Li],
            ...k.BL.slice().reverse(),
            ...k.SL.slice().reverse(),
            ...M0.reverse(),
            t0,
            [I, Ro.y1],
            [I, G],
            [-I, G],
          ],
          Ro.u1 - Ro.u0,
          {
            ...$,
            u: Ro.u0,
          },
        ),
      ),
        n0(
          h([[I, Li], ...k.BR, [po, Ro.y0], [I, Ro.y0]], Ro.u1 - Ro.u0, {
            ...$,
            u: Ro.u0,
          }),
        ),
        r.add(
          s.blued,
          c(
            Sc(
              [
                [Ro.u0 - 0.0012, Ro.y0 - 0.0012],
                [Ro.u1 + 0.0012, Ro.y0 - 0.0012],
              ],
              0.0012,
            ),
            0.0014,
            {
              x: po - 4e-4,
              b: 6e-4,
            },
          ),
        ),
        r.add(
          s.blued,
          c(
            se(Ro.u0 - 0.0018, Ro.y0 - 0.0016, Ro.u0, Ro.y1 - 0.001, 6e-4),
            0.0014,
            {
              x: po - 4e-4,
              b: 6e-4,
            },
          ),
          c(
            se(Ro.u1, Ro.y0 - 0.0016, Ro.u1 + 0.0018, Ro.y1 - 0.001, 6e-4),
            0.0014,
            {
              x: po - 4e-4,
              b: 6e-4,
            },
          ),
        ),
        a.add(
          e.black,
          c(se(hn.u0, Li + 4e-4, hn.u1, G), 3e-4, {
            x: -I + 3e-4,
            b: 0,
          }),
          c(se(hn.u0, Li + 4e-4, Ro.u0, G), 3e-4, {
            x: I - 3e-4,
            b: 0,
          }),
          c(se(Ro.u0, Li + 4e-4, Ro.u1, Ro.y0), 3e-4, {
            x: I - 3e-4,
            b: 0,
          }),
        ),
        a.add(
          e.black,
          c(se(hn.u0, G - 6e-4, hn.u1, G - 3e-4), 2 * I, {
            b: 0,
          }),
          h(se(-I, Li, I, G), 3e-4, {
            u: hn.u0 + 2e-4,
            b: 0,
          }),
          h(se(-I, Li, I, G), 3e-4, {
            u: hn.u1 - 6e-4,
            b: 0,
          }),
        ),
        a.add(
          s.bolt,
          ni(
            [
              [hn.u1 - 8e-4, 0.0103],
              [hn.u1 - 0.003, 0.0112],
              [hn.u1 - 0.003, 0.0138],
            ],
            {
              y: Ws,
              seg: 16,
            },
          ),
        ),
        a.add(
          e.steel,
          ni(
            [
              [hn.u1 - 8e-4, 0.0105],
              [hn.u1 - 0.0022, 0.0112],
              [hn.u1 - 0.0022, 0.0128],
            ],
            {
              y: Ts,
              seg: 16,
            },
          ),
        ));
      for (let f0 of [-1, 1])
        a.add(
          s.bolt,
          c(
            se(hn.u1 - 0.016, Ts - 0.003, hn.u1 - 0.001, Ts + 0.003, 0.001),
            0.0012,
            {
              x: f0 * (I - 0.0012),
              b: 4e-4,
            },
          ),
        );
    } else
      n0(
        h(K, hn.u1 - hn.u0, {
          ...$,
          u: hn.u0,
        }),
      );
    if (
      (n0(
        h(K, qT - hn.u1, {
          ...$,
          u: hn.u1,
        }),
      ),
      t)
    ) {
      for (let [p0, t0, M0, f0] of [
        [-0.0173, hn.u0, -I - 1e-4, hn.u1],
        [I + 1e-4, hn.u0, 0.0173, hn.u1],
        [-0.0173, hn.u1, 0.0173, qT - 4e-4],
      ])
        r.add(
          s.bluedMatte,
          Rc(
            f(se(p0, t0, M0, f0), 25e-5, {
              y: Li - 25e-5,
              b: 0,
            }),
          ),
        );
      r.add(
        s.blued,
        h(
          kN(c1 - 0.0012, x).map((p0) => [
            p0[0] * 0.95,
            Li + 0.001 + (p0[1] - Li) * 0.965,
          ]),
          0.0022,
          {
            u: qT - 2e-4,
            b: 8e-4,
          },
        ),
      );
      for (let [p0, t0] of [
        [0.058, 0.0165],
        [0.118, 0.02],
      ])
        a.add(
          e.steel,
          Wn(0.0026, 2 * po + 6e-4, {
            y: t0,
            u: p0,
            seg: 10,
          }),
        );
      for (let p0 of [-1, 1])
        a.add(
          e.black,
          Wn(0.0011, 2e-4, {
            x: p0 * (po + 35e-5),
            y: 0.0165,
            u: 0.058,
            seg: 6,
          }),
          Wn(0.0011, 2e-4, {
            x: p0 * (po + 35e-5),
            y: 0.02,
            u: 0.118,
            seg: 6,
          }),
        );
      (a.add(e.mark, x4("sg", 0.07, 0.02, -(po + 25e-5), 0.033, 0.156, -1)),
        a.add(
          s.mark,
          s.sgDecal("gauge", 0.062, po + 25e-5, 0.0185, 0.08, 1),
          s.sgDecal("proof", 0.012, po + 25e-5, 0.04, 0.214, 1),
          s.sgDecal("proof", 0.011, -(po + 25e-5), 0.013, 0.212, -1),
        ));
      {
        let p0 = s.sgDecal("maker", 0.098, 0, 0, 0, -1);
        (p0.translate(0, 0, 0),
          p0.rotateZ(Ze(-38)),
          p0.translate(
            -0.0124 * Math.cos(Ze(38)) - 1e-4,
            Ws + 0.0124 * Math.sin(Ze(38)) + 1e-4,
            -0.33,
          ),
          a.add(s.mark, p0));
      }
      for (let p0 = 0; p0 < 12; p0++)
        a.add(
          e.black,
          f(
            se(
              -0.0068,
              V5 + 0.0065 + p0 * 0.0038,
              0.0068,
              V5 + 0.0078 + p0 * 0.0038,
            ),
            2e-4,
            {
              y: c1 - 5e-5,
              b: 0,
            },
          ),
        );
    }
    if (
      (r.add(
        s.blued,
        c(se(Xu - 0.003, c1 - 0.004, V5 + 0.003, Np + 2e-4, 0.001), 0.0176, {
          b: 8e-4,
        }),
      ),
      r.add(s.blued, t ? xy(Xu, V5, Np) : c(se(Xu, Np, V5, Ch), 0.0206)),
      t)
    )
      for (let p0 of [Xu + 0.02, V5 - 0.02])
        a.add(
          e.steel,
          T5(0.0024, 6e-4, {
            y: Np + 0.0042,
            u: p0 + 0.0074,
            seg: 6,
          }),
        );
  }
  (p("bolt", Gt(0, Ws, 0.16), (k) => {
    t &&
      (k.add(
        s.bolt,
        ni(
          [
            [0.128, 0.01],
            [0.13, 0.0115],
            [0.201, 0.0115],
            [0.2032, 0.0106],
            [0.2032, 1e-4],
          ],
          {
            y: Ws,
            seg: 16,
          },
        ),
      ),
      k.add(
        e.steel,
        c(se(0.176, Ws - 0.0032, 0.2032, Ws + 0.0032, 8e-4), 0.0016, {
          x: 0.0112,
          b: 5e-4,
        }),
      ),
      k.add(
        e.black,
        c(se(0.176, Ws - 0.004, 0.1765, Ws + 0.004), 4e-4, {
          x: 0.01165,
          b: 0,
        }),
        c(se(0.13, Ws + 0.0012, 0.168, Ws + 0.002), 4e-4, {
          x: 0.01158,
          b: 0,
        }),
        c(se(0.13, Ws - 0.006, 0.16, Ws - 0.0052), 4e-4, {
          x: 0.01012,
          b: 0,
        }),
      ),
      k.add(
        e.steel,
        c(se(0.138, Ws + 0.006, 0.172, Ws + 0.0104, 0.001), 0.009, {
          b: 6e-4,
        }),
      ),
      k.add(
        e.steel,
        c(
          [
            [0.112, Ws - 0.0165],
            [0.196, Ws - 0.0165],
            [0.2, Ws - 0.0105],
            [0.112, Ws - 0.0105],
          ],
          0.02,
          {
            b: 8e-4,
          },
        ),
      ),
      k.add(
        e.black,
        fa(0.0052, 4e-4, {
          y: Ws,
          u: 0.2031,
          seg: 10,
        }),
      ));
  }),
    p("lifter", Gt(...l1.LIFT_PIVOT), (k) => {
      if (!t) return;
      let I = 0.005,
        G = 0.0068;
      (k.add(
        s.carrier,
        f(
          [
            [-0.0114, 0.108, 0.001],
            [0.0114, 0.108, 0.001],
            [0.0114, 0.196, 0.003],
            [0.004, 0.2015, 0.002],
            [0.004, 0.16, 0.002],
            [-0.004, 0.16, 0.002],
            [-0.004, 0.2015, 0.002],
            [-0.0114, 0.196, 0.003],
          ],
          G - I,
          {
            y: I,
            b: 4e-4,
          },
        ),
      ),
        k.add(
          e.black,
          f(se(-0.004, 0.16, 0.004, 0.2015), 2e-4, {
            y: G - 1e-4,
            b: 0,
          }),
        ),
        k.add(
          e.steel,
          Wn(0.0019, 2 * hn.hw, {
            y: 0.006,
            u: 0.1085,
            seg: 8,
          }),
        ));
      for (let K = 0; K < 3; K++)
        k.add(
          e.black,
          f(se(-0.0085, 0.118 + K * 0.006, 0.0085, 0.1192 + K * 0.006), 2e-4, {
            y: I - 2e-4,
            b: 0,
          }),
        );
    }));
  let g = t ? 17 : 9,
    b = Sc(
      Array.from(
        {
          length: g,
        },
        (k, I) => {
          let G = Math.PI * (1 + I / (g - 1)),
            K = Math.cos(G),
            $ = Math.abs(Math.sin(G));
          return [
            0.0618 + 0.0318 * Math.sign(K) * Math.pow(Math.abs(K), 2 / 2.7),
            0.0022 - 0.0342 * Math.pow($, 2 / 2.7),
          ];
        },
      ),
      0.0036,
    ),
    v = Sc(
      [
        [0.0668, 0.0016],
        [0.0646, -0.005],
        [0.0632, -0.012],
        [0.0634, -0.0182],
        [0.0656, -0.0238],
      ],
      0.0044,
    );
  (r.add(
    s.plate,
    c(
      [
        [0.0245, 2e-4, 0.001],
        [0.1035, 2e-4, 0.001],
        [0.1035, 0.0048],
        [0.0245, 0.0048],
      ],
      0.03,
      {
        b: 0.001,
      },
    ),
  ),
    r.add(
      s.plate,
      c(b, 0.0158, {
        b: 0.0011,
        bs: 2,
      }),
    ),
    p("trigger", Gt(0, 0.0012, 0.0668), (k) => {
      k.add(
        e.steel,
        c(v, 0.0064, {
          b: 0.0013,
          bs: 2,
          soft: !0,
        }),
      );
    }),
    p("safety", Gt(0, -0.003, 0.0385), (k) => {
      t &&
        (k.add(
          e.steel,
          Wn(0.0036, 0.033, {
            x: -0.0012,
            y: -0.003,
            u: 0.0385,
            seg: 12,
          }),
        ),
        k.add(
          e.red,
          Wn(0.00365, 0.0016, {
            x: -0.0148,
            y: -0.003,
            u: 0.0385,
            seg: 12,
          }),
        ));
    }),
    t &&
      a.add(
        s.plate,
        Wn(0.005, 0.0318, {
          y: -0.003,
          u: 0.0385,
          seg: 12,
        }),
      ),
    p("actionRelease", Gt(-0.0075, 5e-4, 0.0985), (k) => {
      if (t) {
        k.add(
          e.steel,
          c(
            [
              [0.095, 0.0012],
              [0.101, 0.0012],
              [0.1016, -0.0048, 0.0012],
              [0.0962, -0.006, 0.0012],
            ],
            0.0074,
            {
              x: -0.0072,
              b: 8e-4,
            },
          ),
        );
        for (let I = 0; I < 3; I++)
          k.add(
            e.black,
            c(
              se(0.0966 + I * 0.0015, -0.0061, 0.0972 + I * 0.0015, -0.0057),
              0.0066,
              {
                x: -0.0072,
                b: 0,
              },
            ),
          );
      }
    }),
    a.add(
      s.barrel,
      ni(
        [
          [0.2262, 0.0138],
          [0.25, 0.0138],
          [0.262, 0.0124],
          [0.6, 0.0116],
          [xa - 0.0016, 0.0114],
          [xa, 0.0106],
          [xa, 0.0094],
        ],
        {
          y: Ws,
          seg: u(20),
        },
      ),
    ),
    a.add(
      e.black,
      ni(
        [
          [xa, 0.0094],
          [xa - 0.0015, 0.0092],
          [xa - 0.045, 0.0092],
          [xa - 0.045, 1e-4],
        ],
        {
          y: Ws,
          seg: u(16),
        },
      ),
    ),
    t &&
      a.add(
        s.barrel,
        ni(
          [
            [0.25, 0.0138],
            [0.25, 0.0146],
            [0.256, 0.0146],
            [0.2575, 0.0138],
          ],
          {
            y: Ws,
            seg: 20,
          },
        ),
      ));
  {
    let k = Ef + 0.0016,
      I = Ws + 0.0113;
    if (
      (a.add(
        e.steel,
        ni(
          [
            [0.604, 0.0116],
            [0.605, 0.0136],
            [0.631, 0.0136],
            [0.632, 0.0116],
          ],
          {
            y: Ws,
            seg: u(18),
          },
        ),
      ),
      a.add(
        e.steel,
        c(
          [
            [0.6045, I],
            [0.6315, I],
            [0.63, k - 0.005],
            [0.6235, k, 0.001],
            [0.617, k, 0.001],
            [0.606, I + 0.006],
          ],
          0.004,
          {
            b: 7e-4,
          },
        ),
      ),
      t)
    ) {
      for (let G of [-1, 1])
        a.add(
          e.steel,
          c(
            [
              [0.605, I - 0.001],
              [0.631, I - 0.001],
              [0.63, k - 0.001, 0.002],
              [0.623, k + 0.0032, 0.003],
              [0.613, k + 0.001, 0.003],
              [0.6055, I + 0.005],
            ],
            0.0022,
            {
              x: G * 0.0086,
              b: 8e-4,
            },
          ),
        );
      (a.add(
        e.steel,
        c(se(0.605, I - 0.001, 0.631, I + 0.0034, 0.001), 0.0194, {
          b: 8e-4,
        }),
      ),
        a.add(
          e.fiber,
          fa(0.0016, 0.01, {
            y: Ef - 2e-4,
            u: 0.6162,
            seg: 10,
          }),
        ));
    }
  }
  let y = o.magazine === "ext",
    M = y ? l1.TUBE_EXT : l1.TUBE_STD;
  r.add(
    s.tubeSteel,
    fa(0.0125, l1.TUBE_STD - 0.2275, {
      y: Ts,
      u: 0.2275,
      seg: u(18),
    }),
  );
  let w = (k, I) => {
    let K = Ws - Ts,
      $ = Math.acos(K / 2 / 0.0156),
      n0 = [],
      e0 = t ? 10 : 5;
    for (let p0 = 0; p0 <= e0; p0++) {
      let t0 = -Math.PI / 2 + $ + ((2 * Math.PI - 2 * $) * p0) / e0;
      n0.push([0.0156 * Math.cos(t0), Ws + 0.0156 * Math.sin(t0)]);
    }
    for (let p0 = 1; p0 < e0; p0++) {
      let t0 = Math.PI / 2 + $ + ((2 * Math.PI - 2 * $) * p0) / e0;
      n0.push([0.0156 * Math.cos(t0), Ts + 0.0156 * Math.sin(t0)]);
    }
    return h(n0, I, {
      u: k,
      b: 9e-4,
      holes: t ? [Kr(0, Ws, 0.0117, 14), Kr(0, Ts, 0.0124, 14)] : null,
    });
  };
  (a.add(e.steel, w(0.529, 0.011)),
    t &&
      a.add(
        e.steel,
        Wn(0.0026, 0.035, {
          y: (Ws + Ts) / 2,
          u: 0.5345,
          seg: 6,
        }),
        Wn(0.0042, 0.002, {
          x: 0.0172,
          y: (Ws + Ts) / 2,
          u: 0.5345,
          seg: 6,
        }),
        Wn(0.0042, 0.002, {
          x: -0.0172,
          y: (Ws + Ts) / 2,
          u: 0.5345,
          seg: 6,
        }),
      ));
  let T = (k, I, G) => {
    if (
      (k.add(
        I,
        ni(
          [
            [G, 0.0125],
            [G, 0.0142],
            [G + 0.0014, 0.0147],
            [G + 0.013, 0.0147],
            [G + 0.0152, 0.0138],
            [G + 0.017, 0.0118],
            [G + 0.017, 1e-4],
          ],
          {
            y: Ts,
            seg: u(18),
          },
        ),
      ),
      !!t)
    ) {
      for (let K = 0; K < 18; K++)
        a.add(
          e.black,
          xh(
            bh(
              c(se(G + 0.0022, 0.01472, G + 0.0122, 0.0149), 0.0011, {
                b: 0,
              }),
              0,
              Ts,
              0,
            ),
            K * 20,
            Ts,
          ),
        );
      (a.add(
        e.steel,
        T5(0.0026, 0.006, {
          y: Ts - 0.0205,
          u: G + 0.008,
          seg: 8,
        }),
        Wn(0.004, 0.003, {
          y: Ts - 0.0222,
          u: G + 0.008,
          seg: 10,
        }),
      ),
        p("swivelF", Gt(0, Ts - 0.0222, G + 0.008), (K) => {
          let $ = new TorusGeometry(0.0072, 0.0011, 6, 16);
          ($.rotateY(Math.PI / 2),
            $.translate(0, Ts - 0.0222 - 0.0066, -(G + 0.008)),
            K.add(e.steel, Qe($)));
        }));
    }
  };
  if (!y) T(r, s.tubeSteel, l1.TUBE_STD);
  else {
    let k = l1.TUBE_STD;
    if (
      (r.add(
        s.tubeSteel,
        ni(
          [
            [k - 0.001, 0.0125],
            [k, 0.015],
            [k + 0.0125, 0.015],
            [k + 0.014, 0.0131],
            [M, 0.0131],
          ],
          {
            y: Ts,
            seg: u(18),
          },
        ),
      ),
      t)
    )
      for (let I = 0; I < 6; I++)
        a.add(
          e.black,
          xh(
            bh(
              c(se(k + 0.002, 0.01502, k + 0.0105, 0.0152), 0.0042, {
                b: 0,
              }),
              0,
              Ts,
              0,
            ),
            I * 60,
            Ts,
          ),
        );
    (a.add(e.steel, w(0.588, 0.01)),
      t &&
        a.add(
          e.steel,
          Wn(0.0026, 0.035, {
            y: (Ws + Ts) / 2,
            u: 0.593,
            seg: 6,
          }),
          Wn(0.0042, 0.002, {
            x: 0.0172,
            y: (Ws + Ts) / 2,
            u: 0.593,
            seg: 6,
          }),
          Wn(0.0042, 0.002, {
            x: -0.0172,
            y: (Ws + Ts) / 2,
            u: 0.593,
            seg: 6,
          }),
        ),
      T(r, s.tubeSteel, M));
  }
  let S = null;
  p("pump", Gt(0, Ts, (ir + Zr) / 2), (k) => {
    let I = j00(t),
      G = [],
      K = [ir, ir + 0.0012, ir + 0.0028, ir + 0.0046];
    for (let n0 = 0; n0 < zN; n0++) {
      let e0 = DN + n0 * LN;
      t
        ? K.push(e0 - 0.0024, e0 - 6e-4, e0 + 6e-4, e0 + 0.0024)
        : K.push(e0 - 0.0024, e0, e0 + 0.0024);
    }
    (K.push(Zr - 0.0046, Zr - 0.0028, Zr - 0.0012, Zr), G.push(ir, ...K, Zr));
    let $ = 0.0139;
    if (
      ((S = U5(
        G,
        (n0, e0) => Y00(e0 === 0 || e0 === G.length - 1 ? $ : X00(n0), I),
        {
          crease: 0.62,
        },
      )),
      k.add(
        e.steel,
        fa(0.0137, Zr - ir + 0.004, {
          y: Ts,
          u: ir - 0.002,
          seg: u(16),
          open: !0,
        }),
      ),
      k.add(
        e.steel,
        ni(
          [
            [Zr - 5e-4, 0.0137],
            [Zr - 5e-4, 0.0166],
            [Zr + 0.0042, 0.0166],
            [Zr + 0.0055, 0.015],
            [Zr + 0.0055, 0.0128],
          ],
          {
            y: Ts,
            seg: u(16),
          },
        ),
      ),
      k.add(
        e.steel,
        ni(
          [
            [ir - 0.01, 0.0128],
            [ir - 0.01, 0.0152],
            [ir - 0.0085, 0.016],
            [ir + 5e-4, 0.016],
            [ir + 5e-4, 0.0137],
          ],
          {
            y: Ts,
            seg: u(16),
          },
        ),
      ),
      t)
    )
      for (let n0 = 0; n0 < 4; n0++)
        k.add(
          e.black,
          xh(
            bh(
              c(se(Zr + 8e-4, 0.01662, Zr + 0.0036, 0.0168), 0.0046, {
                b: 0,
              }),
              0,
              Ts,
              0,
            ),
            n0 * 90 + 45,
            Ts,
          ),
        );
    for (let n0 of [-1, 1])
      k.add(
        e.steel,
        c(
          [
            [0.199, Ts + 0.0015, 0.001],
            [ir - 0.004, Ts + 0.0015],
            [ir - 0.004, Ts + 0.0105],
            [0.26, Ts + 0.0105, 0.004],
            [0.252, Ts + 0.009, 0.003],
            [0.199, Ts + 0.009, 0.001],
          ],
          0.0021,
          {
            x: n0 * 0.01415,
            b: 6e-4,
          },
        ),
      );
  });
  {
    let k = i.pump.userData.rest,
      I = S.geo;
    I.translate(-k.x, -k.y, -k.z);
    let G = new Mesh(
      I,
      t && !d
        ? s.wood(
            "forend",
            () =>
              RN(512, 256, S.at, 23, {
                off: 1.25,
                skew: -0.7,
                curl: 0.6,
              }),
            22,
            9,
          )
        : null,
    );
    ((G.name = "forend"),
      (G.userData.base = 4860437),
      i.pump.add(G),
      m.push([G, "furniture", k]));
  }
  let E = o.stock === "heavy",
    _ = E ? -0.327 : -0.311;
  {
    let k = t ? 12 : 6,
      G = U5(
        t
          ? K00
          : [
              -0.295, -0.24, -0.19, -0.15, -0.124, -0.102, -0.085, -0.069,
              -0.053, -0.037, -0.021, -0.006, 0.007, 0.022,
            ],
        (M0) => Ik(G4(M0), k),
        {
          crease: 0.9,
        },
      ),
      K = new Mesh(
        G.geo,
        t && !d
          ? s.wood(
              "stock",
              () =>
                RN(1024, 1024, G.at, 11, {
                  off: 1,
                  skew: 1,
                  curl: 1,
                }),
              46,
              18,
            )
          : null,
      );
    ((K.name = "stock"),
      (K.userData.base = 4860437),
      n.add(K),
      m.push([K, "furniture", null]));
    let $ = G4(-0.295),
      n0 = ($[0] + $[1]) / 2,
      e0 = (M0) =>
        Ik($, k).map((f0) => [
          f0[0] * M0,
          n0 + (f0[1] - n0) * (1 - (1 - M0) * 0.4),
        ]);
    a.add(
      s.spacer,
      Qe(
        U5([-0.295, -0.2972], () => e0(1.004), {
          metric: !0,
          crease: 0.9,
        }).geo,
      ),
    );
    let p0 = E
        ? [-0.2972, -0.319, -0.324, -0.3262, _]
        : [-0.2972, -0.305, -0.3086, -0.3104, _],
      t0 = [1, 0.992, 0.972, 0.93, 0.8];
    if (
      (a.add(
        s.pad,
        Qe(
          U5(p0, (M0, f0) => e0(t0[f0]), {
            metric: !0,
            capB: !0,
            crease: 0.9,
          }).geo,
        ),
      ),
      t)
    ) {
      for (let M0 = 0; M0 < 7; M0++)
        a.add(
          s.pad,
          c(
            se(
              _ - 0.001,
              $[1] + 0.012 + M0 * 0.0145,
              _ + 8e-4,
              $[1] + 0.019 + M0 * 0.0145,
              6e-4,
            ),
            0.03,
            {
              b: 5e-4,
            },
          ),
        );
      if (E)
        for (let M0 of [-1, 1])
          for (let f0 = 0; f0 < 3; f0++)
            a.add(
              e.black,
              c(
                se(
                  -0.3165,
                  $[1] + 0.024 + f0 * 0.03,
                  -0.303,
                  $[1] + 0.04 + f0 * 0.03,
                  0.003,
                ),
                3e-4,
                {
                  x: M0 * ($[2] * 0.994 + 1e-4),
                  b: 0,
                },
              ),
            );
      if (
        (a.add(
          e.steel,
          T5(0.0026, 0.0165, {
            y: -0.102,
            u: -0.236,
            seg: 8,
          }),
          T5(0.0048, 0.0016, {
            y: -0.0885,
            u: -0.236,
            seg: 12,
          }),
          Wn(0.004, 0.003, {
            y: -0.101,
            u: -0.236,
            seg: 10,
          }),
        ),
        p("swivelR", Gt(0, -0.101, -0.236), (M0) => {
          let f0 = new TorusGeometry(0.0085, 0.0011, 6, 16);
          (f0.rotateY(Math.PI / 2),
            f0.translate(0, -0.101 - 0.0078, 0.236),
            M0.add(e.steel, Qe(f0)));
        }),
        !d)
      )
        for (let M0 of [-1, 1]) {
          let f0 = [-0.004, -0.005],
            _0 = [-0.05, -0.0625],
            F0 = [-0.076, -0.052],
            m0 = [-0.036, 0],
            S0 = 18,
            T0 = 8,
            j0 = [],
            Z0 = [],
            lt = [],
            H0 = new Array(7),
            Y0 = [_0[0] - f0[0], _0[1] - f0[1]],
            et = Math.hypot(Y0[0], Y0[1]);
          ((Y0[0] /= et), (Y0[1] /= et));
          let ct = Ze(17),
            D0 = [
              Y0[0] * Math.sin(ct) + Y0[1] * Math.cos(ct),
              Y0[1] * Math.sin(ct) - Y0[0] * Math.cos(ct),
            ],
            u0 = [
              Y0[0] * Math.sin(ct) - Y0[1] * Math.cos(ct),
              Y0[1] * Math.sin(ct) + Y0[0] * Math.cos(ct),
            ],
            w0 = 0.00135;
          for (let J0 = 0; J0 <= T0; J0++)
            for (let q0 = 0; q0 <= S0; q0++) {
              let v0 = q0 / S0,
                x0 = J0 / T0,
                C0 = 0.004 * Math.sin(Math.PI * v0),
                k0 =
                  (f0[0] + (_0[0] - f0[0]) * v0) * (1 - x0) +
                  (m0[0] + (F0[0] - m0[0]) * v0) * x0 +
                  C0 * (x0 - 0.5) * 0.6,
                O0 =
                  (f0[1] + (_0[1] - f0[1]) * v0) * (1 - x0) +
                  (m0[1] + (F0[1] - m0[1]) * v0) * x0,
                B0 = G00(G4(k0, H0), O0) + 16e-5;
              (j0.push(M0 * B0, O0, -k0), Z0.push(v0, x0));
            }
          for (let J0 = 0; J0 < T0; J0++)
            for (let q0 = 0; q0 < S0; q0++) {
              let v0 = J0 * (S0 + 1) + q0,
                x0 = v0 + 1,
                C0 = v0 + S0 + 1,
                k0 = C0 + 1;
              M0 > 0
                ? lt.push(v0, x0, C0, x0, k0, C0)
                : lt.push(v0, C0, x0, x0, C0, k0);
            }
          let P0 = new BufferGeometry();
          if (
            (P0.setAttribute("position", new Float32BufferAttribute(j0, 3)),
            P0.setAttribute("uv", new Float32BufferAttribute(Z0, 2)),
            P0.setIndex(lt),
            P0.computeVertexNormals(),
            P0.attributes.normal.getX(0) * M0 < 0)
          ) {
            for (let J0 = 0; J0 < lt.length; J0 += 3) {
              let q0 = lt[J0 + 1];
              ((lt[J0 + 1] = lt[J0 + 2]), (lt[J0 + 2] = q0));
            }
            (P0.setIndex(lt), P0.computeVertexNormals());
          }
          let st = new Mesh(P0, s.chequer);
          ((st.name = "chequer"), n.add(st));
        }
    }
    if (E) {
      let _0 = t
          ? [-0.262, -0.258, -0.25, -0.22, -0.18, -0.145, -0.13, -0.122, -0.118]
          : [-0.262, -0.25, -0.19, -0.13, -0.118],
        F0 = new Array(7),
        m0 = (S0) => {
          let T0 = G4(S0, F0),
            j0 = Tf(0, 0.014, Math.min(S0 - -0.262, -0.118 - S0)),
            Z0 = T0[0] - 0.036,
            lt = T0[2] + 0.0016 + 0.003 * j0,
            H0 = T0[0] + 0.002 + 0.0105 * j0,
            Y0 = 0.0125,
            et = t ? 10 : 4,
            ct = [[lt, Z0]];
          for (let D0 = 0; D0 <= et; D0++) {
            let u0 = (Math.PI * D0) / et,
              w0 = Math.cos(u0);
            ct.push([
              lt * Math.sign(w0) * Math.pow(Math.abs(w0), 2 / 2.7),
              H0 - Y0 + Y0 * Math.pow(Math.sin(u0), 2 / 2.7),
            ]);
          }
          return (
            ct.push([-lt, Z0], [-T0[2] * 0.9, Z0], [T0[2] * 0.9, Z0]),
            ct
          );
        };
      if (
        (a.add(
          s.riser,
          Qe(
            U5(_0, m0, {
              metric: !0,
              capA: !0,
              capB: !0,
              crease: 1,
            }).geo,
          ),
        ),
        t)
      )
        for (let S0 of [-0.238, -0.142]) {
          let T0 = G4(S0, F0);
          a.add(
            e.strap,
            Qe(
              U5(
                [S0 - 0.011, S0 + 0.011],
                (j0) =>
                  Ik(
                    [
                      T0[0] + 0.015,
                      T0[1] - 0.0012,
                      T0[2] + 0.0062,
                      T0[3] + 0.004,
                      T0[4],
                      2.4,
                      T0[6],
                    ],
                    8,
                  ),
                {
                  metric: !0,
                  crease: 0.9,
                },
              ).geo,
            ),
          );
        }
    }
  }
  let R = 0.5225,
    C = Ts - 0.0125 - 0.008,
    L = {
      optic: new Object3D(),
      muzzle: new Object3D(),
      underbarrel: new Object3D(),
    };
  (L.optic.position.copy(Gt(0, Ch, Xu + 0.06)),
    L.muzzle.position.copy(Gt(0, Ws, xa)),
    L.underbarrel.position.copy(Gt(0, C, R)));
  for (let k in L) ((L[k].name = "mount_" + k), n.add(L[k]));
  let A = {
    muzzle: Gt(0, Ws, xa),
    eject: Gt(po + 0.003, Ws, 0.17),
    ejectDir: Bt(0.86, 0.36, 0.36).normalize(),
    sight: Gt(0, Ef, Xu + 0.012),
    gripR: new Object3D(),
    gripL: new Object3D(),
  };
  ((A.gripR.name = "gripR"), (A.gripL.name = "gripL"), n.add(A.gripR, A.gripL));
  let O = 0.13,
    H = null,
    F = [];
  if (o.optic === "reflex")
    ((O = 0.1),
      (H = Mp("reflex")),
      L.optic.add(H.group),
      F.push(H),
      (A.sight = L.optic.position.clone().add(H.eye)),
      (A.sight.z -= O));
  else {
    let k = Xu + 0.002,
      I = 0.0105;
    if (
      (a.add(
        e.steel,
        c(
          [
            [k - 0.004, Np + 0.0012, 0.001],
            [k + 0.024, Np + 0.0012, 0.001],
            [k + 0.024, Ch + 0.0022],
            [k + 0.018, Ch + 0.004, 0.002],
            [k - 0.004, Ch + 0.004, 0.002],
          ],
          0.024,
          {
            b: 0.0012,
          },
        ),
      ),
      t)
    ) {
      a.add(
        e.steel,
        h(Kr(0, 0, 0.0082, 24), 0.0032, {
          u: k + 0.009,
          y: Ef,
          holes: [Kr(0, 0, 0.0058, 20)],
          b: 6e-4,
        }),
      );
      for (let G of [-1, 1])
        a.add(
          e.steel,
          c(
            [
              [k - 0.002, Ch + 0.003],
              [k + 0.022, Ch + 0.003],
              [k + 0.02, Ef + 0.005, 0.004],
              [k + 0.01, Ef + 0.01, 0.004],
              [k + 0.002, Ef + 0.005, 0.004],
            ],
            0.002,
            {
              x: G * 0.0112,
              b: 8e-4,
            },
          ),
        );
      a.add(
        e.steel,
        Wn(0.005, 0.005, {
          x: I + 0.003,
          y: Ch + 0.009,
          u: k + 0.01,
          seg: 12,
        }),
        Wn(0.0036, 0.0036, {
          x: -0.0148,
          y: Np + 0.0038,
          u: k + 0.01,
          seg: 6,
        }),
      );
      for (let G = 0; G < 8; G++) {
        let K = (G * Math.PI) / 4;
        a.add(
          e.black,
          Wn(7e-4, 0.0052, {
            x: I + 0.003,
            y: Ch + 0.009 + 0.005 * Math.sin(K),
            u: k + 0.01 + 0.005 * Math.cos(K),
            seg: 4,
          }),
        );
      }
    } else
      a.add(
        e.steel,
        h(Kr(0, 0, 0.009, 8), 0.0036, {
          u: k + 0.009,
          y: Ef,
        }),
      );
  }
  if (o.muzzle === "choke" || o.muzzle === "brake") {
    let k = gf(o.muzzle, {
      caliber: "shotgun",
    });
    ((A.muzzle = Gt(0, Ws, xa + k.length)),
      t
        ? (L.muzzle.add(k.group), F.push(k))
        : a.add(
            e.steel,
            ni(
              [
                [xa - 0.002, 0.0114],
                [xa, k.radius],
                [xa + k.length - 0.004, k.radius],
                [xa + k.length, k.radius - 0.003],
                [xa + k.length, 0.0095],
              ],
              {
                y: Ws,
                seg: 10,
              },
            ),
          ));
  } else if (t) {
    a.add(
      e.steel,
      ni(
        [
          [xa - 0.0125, 0.01155],
          [xa - 0.012, 0.0125],
          [xa - 0.003, 0.0125],
          [xa - 0.002, 0.01145],
        ],
        {
          y: Ws,
          seg: 20,
        },
      ),
    );
    for (let k = 0; k < 18; k++)
      a.add(
        e.black,
        xh(
          bh(
            c(se(xa - 0.0108, 0.01252, xa - 0.0042, 0.0127), 0.001, {
              b: 0,
            }),
            0,
            Ws,
            0,
          ),
          k * 20,
          Ws,
        ),
      );
  }
  if (o.underbarrel === "laser") {
    for (let k of [R - 0.0245, R + 0.0235])
      (a.add(
        e.steel,
        ni(
          [
            [k - 0.0045, 0.0125],
            [k - 0.0045, 0.0146],
            [k - 0.0033, 0.0152],
            [k + 0.0033, 0.0152],
            [k + 0.0045, 0.0146],
            [k + 0.0045, 0.0125],
          ],
          {
            y: Ts,
            seg: u(18),
          },
        ),
      ),
        t &&
          a.add(
            e.steel,
            Wn(0.0024, 0.033, {
              y: Ts - 0.0168,
              u: k,
              seg: 6,
            }),
            Wn(0.004, 0.002, {
              x: 0.0172,
              y: Ts - 0.0168,
              u: k,
              seg: 6,
            }),
            Wn(0.004, 0.002, {
              x: -0.0172,
              y: Ts - 0.0168,
              u: k,
              seg: 6,
            }),
          ));
    a.add(
      e.steel,
      c(
        [
          [R - 0.031, C + 0.0062, 0.001],
          [R + 0.03, C + 0.0062, 0.001],
          [R + 0.03, C, 0.0012],
          [R - 0.031, C, 0.0012],
        ],
        0.023,
        {
          b: 9e-4,
        },
      ),
    );
    for (let k of [-1, 1])
      a.add(
        e.steel,
        c(se(R - 0.029, C + 0.004, R + 0.028, Ts - 0.004, 0.001), 0.0022, {
          x: k * 0.0142,
          b: 7e-4,
        }),
      );
    {
      let k = wp("laser", {
        mount: "mlok",
      });
      (L.underbarrel.add(k.group),
        F.push(k),
        (A.laser = L.underbarrel.position.clone().add(k.laser)));
    }
  }
  if (t) {
    let k = AN(!1),
      I = AN(!0);
    {
      let G = new BufferGeometry();
      (G.setAttribute(
        "position",
        new Float32BufferAttribute([0, 0, 0, 4e-4, 0, 0, 0, 4e-4, 0], 3),
      ),
        G.setAttribute(
          "normal",
          new Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3),
        ),
        G.setAttribute(
          "uv",
          new Float32BufferAttribute([0, 0, 0, 0, 0, 0], 2),
        ));
      let K = new Mesh(G, s.shell);
      ((K.name = "shellWarm"), K.position.copy(Gt(0, Ws, 0.15)), n.add(K));
    }
    for (let G of ["shell", "hull", "liftShell"]) {
      let K = Du(n, i, G, Gt(...l1.SHELL_REST));
      ((K.userData.hidden = !0), (K.visible = !1));
      let $ = new Mesh(G === "hull" ? I : k, s.shell);
      (($.name = G + "Mesh"), K.add($));
    }
  }
  if (t) {
    let k = Du(n, i, "frag", Gt(0, -0.075, 0.17));
    ((k.userData.hidden = !0), (k.visible = !1));
    let I = buildGrenade();
    ((I.name = "fragMesh"), k.add(I));
  }
  let P = new Group();
  ((P.name = "painted"), r.build(P), n.add(P));
  for (let k of P.children) m.push([k, "metal", null]);
  a.build(n);
  let z = {
    id: "shotgun",
    root: n,
    parts: i,
    anchors: A,
    mounts: L,
    hip: {
      pos: Bt(Tl("hx", 0.104), Tl("hy", -0.118), Tl("hz", -0.33)),
      rot: new Euler(Tl("hrx", 0.035), Tl("hry", 0.095), Tl("hrz", 0.09)),
    },
    adsDist: O,
    painted: m,
    optic: H,
    fitted: F,
    dim: {
      ...l1,
      TGUARD: b,
      TRIG: v,
      tubeEnd: M,
      IRON: Ef,
      RAILTOP: Ch,
      ext: y,
      heavy: E,
      padEnd: _,
    },
  };
  if (t && d) {
    nt0(z, d);
    for (let k of F) Ou(k, d);
  }
  return z;
}
function nt0(o, t) {
  let e = new Matrix4();
  for (let [s, n, i] of o.painted) {
    let a = xl(t, n);
    a &&
      ((s.geometry = Rc(
        s.geometry.clone(),
        i ? e.makeTranslation(i.x, i.y, i.z) : null,
      )),
      s.geometry.attributes.color ||
        s.geometry.setAttribute(
          "color",
          new BufferAttribute(
            new Float32Array(s.geometry.attributes.position.count * 3).fill(1),
            3,
          ),
        ),
      (s.material = a));
  }
}
function ot0(o, t) {
  let e = ["optic", "muzzle", "underbarrel", "magazine", "stock", "camo"]
      .map((c) => o[c] || "-")
      .join("."),
    s = CN.get(e);
  if (!s) {
    let c = FN(o, !1),
      h = ao(),
      f = [],
      u = {
        metal: [],
        furniture: [],
      },
      d = new Matrix4(),
      m = new Color(),
      p = o.camo && o.camo !== "factory" ? o.camo : null,
      x = new Map(c.painted.map((g) => [g[0], g[1]]));
    (c.root.updateMatrixWorld(!0),
      c.root.traverse((g) => {
        if (!g.isMesh || !g.visible) return;
        for (let w = g.parent; w; w = w.parent)
          if (w.userData && w.userData.hidden) return;
        if (
          (g.material &&
            (g.material.transparent ||
              g.material === h.mark ||
              g.name === "marks" ||
              g.name === "lens")) ||
          (g.name === "hardware" &&
            g.parent &&
            /laser|optic/.test(g.parent.name) &&
            et0)
        )
          return;
        let b = g.geometry.clone();
        (b.applyMatrix4(d.copy(g.matrixWorld)),
          b.index && (b = b.toNonIndexed()));
        for (let w of Object.keys(b.attributes))
          w !== "position" &&
            w !== "normal" &&
            w !== "uv" &&
            w !== "color" &&
            b.deleteAttribute(w);
        b.attributes.uv ||
          b.setAttribute(
            "uv",
            new BufferAttribute(
              new Float32Array(b.attributes.position.count * 2),
              2,
            ),
          );
        let v = x.get(g) || (g.userData.paint ? "metal" : null);
        if (p && v) {
          ((b = Rc(b, null)),
            b.setAttribute(
              "color",
              new BufferAttribute(
                new Float32Array(b.attributes.position.count * 3).fill(1),
                3,
              ),
            ),
            (u[v] || u.metal).push(b));
          return;
        }
        let y = g.material
          ? g.material.userData.base || g.material.color
          : null;
        (y && y.isColor ? m.copy(y) : m.set(g.userData.base ?? 3355443),
          g.material &&
            g.material.emissive &&
            g.material.emissiveIntensity > 1 &&
            m.set(16728096));
        let M = new Float32Array(b.attributes.position.count * 3);
        for (let w = 0; w < M.length; w += 3)
          ((M[w] = m.r), (M[w + 1] = m.g), (M[w + 2] = m.b));
        (b.setAttribute("color", new BufferAttribute(M, 3)), f.push(b));
      }),
      (s = {
        plain: f.length ? Vn(f, !1) : null,
        metal: u.metal.length ? Vn(u.metal, !1) : null,
        furniture: u.furniture.length ? Vn(u.furniture, !1) : null,
        muzzle: c.anchors.muzzle.clone(),
        gripR: null,
        gripL: null,
        camo: p,
      }),
      s.metal && s.furniture
        ? ((s.metal = Vn([s.metal, s.furniture], !1)), (s.furniture = null))
        : s.furniture && ((s.metal = s.furniture), (s.furniture = null)),
      CN.set(e, s));
  }
  let n = ao(),
    i = new Group();
  i.name = "gun_shotgun";
  let a = (c, h) => {
    if (!c) return;
    let f = new Mesh(c, h);
    ((f.castShadow = !0), (f.receiveShadow = !0), i.add(f));
  };
  (a(s.plain, n.world), a(s.metal, s.camo ? xl(s.camo, "metal") : n.world));
  let r = new Object3D(),
    l = new Object3D();
  return (
    (r.name = "gripR"),
    (l.name = "gripL"),
    r.position.copy(Gt(0.019, -0.03, -0.02)),
    r.quaternion.copy(
      JR(Bt(0, -Math.sin(Ze(27)), -Math.cos(Ze(27))), Bt(-1, 0, 0)),
    ),
    l.position.copy(Gt(-0.012, Ts - W4 - 0.004, (ir + Zr) / 2 - 0.01)),
    l.quaternion.copy(JR(Bt(0.62, 0, -0.78), Bt(0.25, 0.97, 0))),
    i.add(r, l),
    {
      id: "shotgun",
      root: i,
      build: t,
      hands: null,
      clips: null,
      resetPose() {},
      anchors: {
        muzzle: s.muzzle.clone(),
        eject: Gt(po + 0.003, Ws, 0.17),
        ejectDir: Bt(0.86, 0.36, 0.36).normalize(),
        sight: Gt(0, Ef, Xu + 0.012),
        gripR: r,
        gripL: l,
      },
      hip: {
        pos: Bt(0.104, -0.118, -0.33),
        rot: new Euler(0.035, 0.095, 0.09),
      },
      adsDist: 0.13,
    }
  );
}
var PN = new Map();
function it0(o) {
  let t = (o.proxies = {}),
    e = hn.hw,
    s = (n, i, a, r, l, c, h = 0.001) =>
      Zn(
        [(n + i) / 2, (a + r) / 2, -(l + c) / 2],
        [(i - n) / 2, (r - a) / 2, (c - l) / 2],
        h,
      );
  ((t.stock = W00(G4, -0.2972, 0.022)),
    (t.receiver = ds(
      Zs(
        [
          [SN, Li],
          [hn.u0, Li],
          [hn.u0, c1],
          [0.066, c1],
          [0.052, 0.0562],
          [0.04, 0.0505],
          [0.03, 0.0432],
          [SN, 0.0343],
        ],
        2 * po,
        {
          r: 0.002,
        },
      ),
      s(-po, po, Li, c1, hn.u1, qT),
      s(-po, -e, Li, c1, hn.u0, hn.u1),
      s(e, po, Li, Ro.y0, hn.u0, hn.u1),
      s(e, po, Li, c1, hn.u0, Ro.u0),
      s(-po, po, hn.top, c1, hn.u0, hn.u1),
    )),
    (t.tplate = Zs(
      [
        [0.0245, 2e-4],
        [0.1035, 2e-4],
        [0.1035, 0.0048],
        [0.0245, 0.0048],
      ],
      0.03,
      {
        r: 0.001,
      },
    )),
    (t.tguard = Zs(_N(o.dim.TGUARD), 0.0158, {
      r: 0.0011,
    })),
    (t.trigger = Zs(_N(o.dim.TRIG), 0.0064, {
      r: 0.0013,
    })),
    (t.release = s(-0.0109, -0.0035, -0.006, 0.0012, 0.095, 0.1016, 8e-4)),
    (t.forend = $00),
    (t.tube = ml(
      [0, Ts, -0.2275],
      [0, Ts, -(o.dim.tubeEnd + 0.017)],
      0.0125 + (o.dim.ext ? 6e-4 : 0),
      0.001,
    )),
    (t.barrel = ml([0, Ws, -0.226], [0, Ws, -xa], 0.0126, 0.001)),
    (t.rail = s(-0.0103, 0.0103, c1 - 0.003, Ch, Xu - 0.003, V5 + 0.003, 6e-4)),
    (t.shell = ml(
      [0, l1.SHELL_REST[1], -(l1.SHELL_REST[2] - La.len / 2)],
      [0, l1.SHELL_REST[1], -(l1.SHELL_REST[2] + La.len / 2)],
      La.r + 2e-4,
      0.0012,
    )),
    (t.body = ds(
      t.stock,
      t.receiver,
      t.tplate,
      t.tguard,
      t.rail,
      t.tube,
      t.barrel,
    )),
    (t.all = ds(t.body, t.trigger, t.forend)));
}
function at0(o) {
  it0(o);
  let t = o.proxies,
    e = performance.now(),
    s = globalThis.GH_TUNE || {},
    n = (u, d) => s[u] ?? d,
    i = o.id + "|" + (o.dim.ext ? "ext" : "std"),
    a = !globalThis.GH_TUNE && PN.get(i);
  if (a) {
    let u = (o.grips = {});
    for (let d in a) {
      let m = a[d];
      u[d] = {
        ...m,
        pos: m.pos.clone(),
        quat: m.quat.clone(),
        pose: new Float32Array(m.pose),
      };
    }
    o.bakeMs = performance.now() - e;
    return;
  }
  let r = (o.grips = {}),
    l = performance.now(),
    c = (o.bakeTimes = {}),
    h = (u, d, m, p, x, g = {}) => {
      let b = performance.now();
      return (
        (c[u] = Math.round(b - l)),
        (l = b),
        (r[u] = {
          name: u,
          side: d,
          pos: m.pos.clone(),
          quat: m.quat.clone(),
          pose: p,
          sd: x,
          ...g,
        })
      );
    };
  {
    let u = Ze(n("frake", 27)),
      d = Bt(0, -Math.sin(u), -Math.cos(u)),
      m = Bt(-1, 0, 0),
      p = Ze(n("fpsi", -14)),
      x = d
        .clone()
        .multiplyScalar(Math.cos(p))
        .addScaledVector(m, -Math.sin(p)),
      g = m.clone().multiplyScalar(Math.cos(p)).addScaledVector(d, Math.sin(p)),
      b = Yo(
        1,
        Gt(0.0178, n("fy", -0.03), n("fu", -0.02)),
        x,
        g,
        [0.0065, 0.0905, 0.0125],
      ),
      v = ds(t.body, t.trigger),
      y = gs(
        {
          i: [-6, 12, 4, 2],
          t: [n("pt0", -6), n("pt1", 30), n("pt2", -30), 0, 0],
          cup: n("fcup", 9),
        },
        pn.pre,
      ),
      M = [0, 1];
    (zi(1, b.pos, b.quat, y, t.stock, g, {
      max: 0.03,
      bones: M,
    }),
      zi(1, b.pos, b.quat, y, t.stock, Bt(0, -1, 0), {
        max: 0.02,
        bones: [0, 14],
      }),
      zi(1, b.pos, b.quat, y, t.stock, g, {
        max: 0.012,
        bones: M,
      }),
      (b.pos.y += n("fdy", 0)));
    let w = y;
    for (let [L, A] of [
      [1, n("mc1", 46)],
      [2, n("mc2", 52)],
      [3, n("mc3", 60)],
    ])
      w = yo(1, b.pos, b.quat, w, v, {
        fingers: [L],
        max: {
          mcp: A,
          pip: n("fpip", 74),
        },
      });
    ((w[16] = 30),
      (w[17] = 40),
      (w[18] = -80),
      (w[19] = 30),
      (w[20] = 25),
      Mn(
        1,
        b.pos,
        b.quat,
        w,
        4,
        Gt(n("tx", -0.0168), n("ty", -0.009), n("tu", -0.008)),
        v,
        {
          normal: Bt(1, -0.25, 0),
          lim: {
            16: [0, 60],
            17: [0, 58],
            18: [-115, -40],
            19: [0, 62],
            20: [0, 75],
          },
        },
      ));
    let T = {
      0: [-20, 45],
      1: [-15, n("isp", 26)],
      2: [0, 70],
    };
    ((w[0] = n("i0", 0)),
      (w[1] = 15),
      (w[2] = n("i2", 12)),
      (w[3] = 6),
      Mn(
        1,
        b.pos,
        b.quat,
        w,
        0,
        Gt(n("ix", 0.0152), n("iy", 0.003), n("iu", 0.062)),
        v,
        {
          normal: Bt(-1, 0, 0),
          lim: T,
        },
      ),
      h("fire", "R", b, w, v));
    let S = new Float32Array(w);
    ((S[0] = n("t0", 8)),
      (S[1] = 8),
      (S[2] = n("t2", 35)),
      (S[3] = 18),
      Mn(1, b.pos, b.quat, S, 0, Gt(0.001, n("trY", -0.012), 0.0662), v, {
        normal: Bt(-0.35, 0, 0.94),
        lim: T,
      }),
      h("trigger", "R", b, S, v));
    let E = t.body,
      _ = new Float32Array(S);
    (Mn(1, b.pos, b.quat, _, 0, Gt(0.001, n("trY", -0.012), 0.063), E, {
      normal: Bt(-0.35, 0, 0.94),
      lim: T,
    }),
      h("press", "R", b, _, E));
    let R = new Float32Array(w);
    ((R[0] = 20),
      (R[1] = -6),
      (R[2] = 24),
      (R[3] = 12),
      Mn(
        1,
        b.pos,
        b.quat,
        R,
        0,
        Gt(-0.003, -0.0068, 0.0985),
        ds(v, t.release),
        {
          lim: {
            0: [-10, 60],
            1: [-15, 15],
            2: [0, 70],
          },
        },
      ),
      h("release", "R", b, R, ds(v, t.release)));
    let C = new Float32Array(w);
    ((C[0] = 4),
      (C[1] = 12),
      (C[2] = 14),
      (C[3] = 8),
      Mn(
        1,
        b.pos,
        b.quat,
        C,
        0,
        Gt(po + 6e-4, n("ihy", 0.0165), n("ihu", 0.07)),
        v,
        {
          normal: Bt(-1, 0, 0),
          lim: T,
        },
      ),
      h("fireHigh", "R", b, C, v));
  }
  let f = (u, d, m, p, x, g) => {
    let b = Bt(Math.cos(d), Math.sin(d), 0),
      y = Bt(Math.sin(d), -Math.cos(d), 0)
        .clone()
        .multiplyScalar(Math.cos(m))
        .add(Bt(0, 0, -Math.sin(m))),
      M = Gt(-b.x * W4 * Wy, Ts - b.y * W4, p),
      w = Yo(-1, M, y, b, [0.004, n("sp", 0.072), 0.0125]),
      T = ds(t.forend, t.barrel, t.tube),
      S = gs(
        {
          t: [-22, 18, 0, 6, 0],
          cup: n("scup", 7),
        },
        pn.pre,
      );
    zi(-1, w.pos, w.quat, S, T, b, {
      max: 0.02,
    });
    let E = yo(-1, w.pos, w.quat, S, T, {
      fingers: [0, 1, 2, 3],
    });
    ((E[16] = 0),
      (E[17] = 20),
      (E[18] = -50),
      (E[19] = 8),
      (E[20] = 5),
      Mn(-1, w.pos, w.quat, E, 4, x, T, {
        normal: g,
        lim: {
          16: [-25, 45],
          17: [-10, 50],
          18: [-115, 20],
          19: [0, 45],
          20: [-5, 45],
        },
      }),
      h(u, "L", w, E, T, {
        part: "pump",
      }));
  };
  {
    let u = n("su", 0.392);
    f(
      "pump",
      Ze(n("sb", 60)),
      Ze(n("sg", 46)),
      u,
      Gt(n("stx", -0.0246), Ts + n("sty", 0.0105), u + n("stu", 0.062)),
      Bt(0.95, -0.3, 0),
    );
  }
  {
    let u = l1.SHELL_REST,
      d = u[1],
      m = u[2],
      p = (S0, T0) =>
        Gt(
          Math.cos(Ze(S0)) * (La.r + 3e-4),
          d + Math.sin(Ze(S0)) * (La.r + 3e-4),
          m + T0,
        ),
      x = (S0) => Bt(-Math.cos(Ze(S0)), -Math.sin(Ze(S0)), 0),
      g = new Quaternion(),
      b = Bt(0, 0, 0),
      v = (S0) => Bt(-S0.x, S0.y, S0.z),
      y = gs({
        i: [n("ci0", 45), 4, n("ci2", 60), 30],
        m: [54, 0, 70, 36],
        r: [66, -1, 80, 44],
        l: [72, -4, 84, 46],
        t: [0, 30, -40, 5, 10],
        cup: 8,
      }),
      M = Bt(0, n("cay", 1), n("caz", 0)).normalize(),
      w = Bt(0.06, n("cby", 0.085), n("cbz", 0.018)),
      T = (S0) => {
        let T0 = S0.clone().addScaledVector(M, La.len);
        return ml([S0.x, S0.y, S0.z], [T0.x, T0.y, T0.z], La.r + 2e-4, 0.0012);
      };
    {
      let S0 = -0.03,
        T0 = 0.03,
        j0 = (Z0) =>
          -yi(1, b, g, y, T(Bt(w.x - Z0, w.y, w.z)), [0, 1, 2, 3, 4, 5, 6, 7])
            .depth;
      for (let Z0 = 0; Z0 < 18; Z0++) {
        let lt = (S0 + T0) / 2;
        j0(lt) >= 8e-4 ? (S0 = lt) : (T0 = lt);
      }
      w.x -= S0;
    }
    let S = T(w),
      E = Bt(1, 0, 0).addScaledVector(M, -M.x).normalize(),
      _ = Bt(0, 0, 0).crossVectors(M, E),
      R = (S0, T0) =>
        w
          .clone()
          .addScaledVector(M, T0)
          .addScaledVector(E, Math.cos(Ze(S0)) * (La.r + 3e-4))
          .addScaledVector(_, Math.sin(Ze(S0)) * (La.r + 3e-4)),
      C = (S0) =>
        E.clone()
          .multiplyScalar(-Math.cos(Ze(S0)))
          .addScaledVector(_, -Math.sin(Ze(S0))),
      L = {
        16: [-25, 60],
        17: [-10, 60],
        18: [-115, 20],
        19: [-5, 60],
        20: [-5, 75],
      },
      A = new Float32Array(y),
      O = n("cta", 20),
      H = Mn(1, b, g, A, 4, R(O, n("ctx", 0.01)), S, {
        normal: C(O),
        lim: L,
      }),
      P = ((S0) => {
        let T0 = v(M),
          j0 = v(E),
          Z0 = Bt(0, 0, 0).crossVectors(T0, j0),
          lt = Bt(Math.cos(Ze(S0)), Math.sin(Ze(S0)), 0),
          H0 = Bt(0, 0, -1),
          Y0 = Bt(0, 0, 0).crossVectors(H0, lt),
          et = new Quaternion()
            .setFromRotationMatrix(new Matrix4().makeBasis(lt, Y0, H0))
            .multiply(
              new Quaternion()
                .setFromRotationMatrix(new Matrix4().makeBasis(j0, Z0, T0))
                .invert(),
            );
        return {
          quat: et,
          pos: Gt(0, d, m - La.len / 2).sub(v(w).applyQuaternion(et)),
        };
      })(n("lth", 146));
    ((o.shellFit = {
      missMm: +(H * 1e3).toFixed(2),
      penMm: +(yi(-1, P.pos, P.quat, A, t.shell).depth * 1e3).toFixed(2),
    }),
      h("shell", "L", P, A, t.shell, {
        part: "shell",
      }));
    let z = t.body,
      k = ds(t.shell, z),
      I = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      G = Ze(n("prl", 20)),
      K = Bt(-Math.sin(G), Math.cos(G), 0),
      $ = Bt(0, 0, -1),
      n0 = Yo(-1, Gt(0, d, m - 0.012), $, K, [0.018, 0.118, 0.046]);
    n0.pos
      .add(Bt(n("pdx", 0.022), 0, n("pdz", -0.02)))
      .addScaledVector(K, -0.03);
    let e0 = gs(
      {
        i: [4, 4, 14, 8],
        m: [6, 0, 16, 9],
        r: [10, -2, 22, 12],
        l: [14, -5, 28, 15],
        t: [10, 24, -30, 6, 8],
        cup: 8,
      },
      pn.relaxed,
    );
    (zi(-1, n0.pos, n0.quat, e0, z, K, {
      bones: [0, 1, 2, 5, 8, 11, 14],
      max: 0.045,
    }),
      (n0.pos.y -= n("ply", 0.008)));
    let p0 = e0;
    for (let [S0, T0, j0] of [
      [0, 26, 40],
      [1, 32, 48],
      [2, 38, 56],
      [3, 44, 62],
    ])
      p0 = yo(-1, n0.pos, n0.quat, p0, z, {
        fingers: [S0],
        max: {
          mcp: T0,
        },
        curl: j0,
      });
    let t0 = {
        pad: [0, 0.03, 0.003],
        lim: {
          16: [-25, 60],
          17: [-10, 55],
          18: [-110, 20],
          19: [-10, 65],
          20: [-10, 80],
        },
      },
      M0 = Gt(0, d, m - La.len / 2 - n("pgap", 0.0045)),
      f0 = (S0, T0, j0, Z0, lt) => {
        let H0 = null;
        for (let Y0 of [
          [10, 10, -20, 6, 8],
          [0, 25, -30, 10, 20],
          [20, 30, -50, 20, 20],
          [30, 30, -36, 0, 10],
          [30, 15, -50, 20, 20],
          [-10, 20, -10, 15, 25],
        ]) {
          let et = new Float32Array(j0);
          (et.set(Y0, 16), Mn(-1, S0, T0, et, 4, Z0, t.shell, t0));
          let ct = Mn(-1, S0, T0, et, 4, Z0, lt, t0),
            D0 = yi(-1, S0, T0, et, lt, I).depth,
            u0 = ct + Math.max(0, D0 + 4e-4) * 4;
          (!H0 || u0 < H0.score) &&
            (H0 = {
              score: u0,
              miss: ct,
              pen: D0,
              c: et,
            });
        }
        return H0;
      },
      _0 = f0(n0.pos, n0.quat, p0, M0, k),
      F0 = _0.c,
      m0 = {
        pos: n0.pos.clone(),
        quat: n0.quat.clone(),
      };
    ((o.pushFit = {
      missMm: +(_0.miss * 1e3).toFixed(2),
      penMm: +(_0.pen * 1e3).toFixed(2),
    }),
      h("push", "L", m0, F0, k, {
        part: "shell",
      }));
    {
      let S0 = m0.pos
          .clone()
          .add(Bt(n("mdx", 0), n("mdy", -0.014), n("mdz", 0.004))),
        T0 = new Float32Array(F0);
      for (let lt = 0; lt < 16; lt++) T0[lt] = A[lt] + (F0[lt] - A[lt]) * 0.5;
      let j0 = Ze(n("rla", 270)),
        Z0 = f0(
          S0,
          m0.quat,
          T0,
          Gt(
            Math.cos(j0) * 0.0085,
            d + Math.sin(j0) * 0.0085,
            m - La.len / 2 - n("rlg", 0.01),
          ),
          k,
        );
      (T0.set(Z0.c),
        (o.rollFit = {
          missMm: +(Z0.miss * 1e3).toFixed(2),
          penMm: +(Z0.pen * 1e3).toFixed(2),
        }),
        h(
          "roll",
          "L",
          {
            pos: S0,
            quat: m0.quat.clone(),
          },
          T0,
          t.shell,
          {
            part: "shell",
          },
        ));
    }
  }
  if (o.parts.frag) {
    let u = o.parts.frag.userData.rest,
      d = b2([u.x, u.y - 0.004, u.z], [u.x, u.y + 0.004, u.z], 0.0308),
      m = Yo(
        -1,
        u,
        Bt(0.1, 0.2, -0.97).normalize(),
        Bt(1, 0, 0),
        [0.002, 0.056, 0.046],
      ),
      p = gs(
        {
          t: [-14, 44, -40, 4, 0],
          cup: 10,
        },
        pn.pre,
      );
    zi(-1, m.pos, m.quat, p, d, Bt(1, 0, 0), {
      max: 0.03,
      bones: [0, 1],
    });
    let x = yo(-1, m.pos, m.quat, p, d, {
      fingers: [0, 1, 2, 3],
      thumb: [
        [16, 46],
        [19, 55],
        [20, 70],
      ],
    });
    h("frag", "L", m, x, d, {
      part: "frag",
    });
  }
  for (let u in r) {
    let d = r[u],
      m = d.side === "R" ? 1 : -1;
    ((d.pen = yi(m, d.pos, d.quat, d.pose, d.sd)),
      (d.gaps = Tc(m, d.pos, d.quat, d.pose, d.sd)));
  }
  ((o.bakeMs = performance.now() - e), globalThis.GH_TUNE || PN.set(i, r));
}

export { buildShotgun };

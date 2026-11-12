// scene/materials.js: recovered from the verified GOLDEN HOUR release.
import { createCanvas, createNoise } from "../core/math.js";
import {
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  DoubleSide,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  ShaderChunk,
  UnsignedByteType,
  Vector2,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";

var Hr = 256;
var Vm = Hr - 1;
var Wo = Math.PI * 2;
function yb(o, t, e, s = 0.5) {
  let n = createNoise(o),
    i = new Float32Array(Hr * Hr),
    a = t / Hr,
    r = 1,
    l = 0;
  for (let h = 0, f = 0; h < Hr; h++)
    for (let u = 0; u < Hr; u++, f++) {
      let d = n.fbm(u * a, h * a, e, t, s);
      ((i[f] = d), d < r && (r = d), d > l && (l = d));
    }
  let c = 1 / (l - r);
  for (let h = 0; h < i.length; h++) i[h] = (i[h] - r) * c;
  return i;
}
function ZY(o, t) {
  let e = new Float32Array(t * t),
    s = new Float32Array(t * t);
  for (let r = 0; r < t; r++)
    for (let l = 0; l < t; l++)
      ((e[r * t + l] = l + 0.1 + 0.8 * Rn(l, r, o)),
        (s[r * t + l] = r + 0.1 + 0.8 * Rn(l, r, o + 1)));
  let n = new Float32Array(Hr * Hr),
    i = new Float32Array(Hr * Hr),
    a = t / Hr;
  for (let r = 0; r < Hr; r++)
    for (let l = 0; l < Hr; l++) {
      let c = (l + 0.5) * a,
        h = (r + 0.5) * a,
        f = Math.floor(c),
        u = Math.floor(h),
        d = 9,
        m = 9;
      for (let p = -1; p <= 1; p++)
        for (let x = -1; x <= 1; x++) {
          let g = f + x,
            b = u + p,
            v = ((g % t) + t) % t,
            y = ((b % t) + t) % t,
            M = y * t + v,
            w = e[M] + (g - v) - c,
            T = s[M] + (b - y) - h,
            S = Math.sqrt(w * w + T * T);
          S < d ? ((m = d), (d = S)) : S < m && (m = S);
        }
      ((n[r * Hr + l] = d > 1 ? 1 : d),
        (i[r * Hr + l] = m - d > 1 ? 1 : m - d));
    }
  return [n, i];
}
var Ga;
var yn;
var En;
var qo;
var Va;
var E9;
var T9;
function Be(o, t, e) {
  let s = Math.floor(t),
    n = Math.floor(e),
    i = t - s,
    a = e - n;
  ((s &= Vm), (n &= Vm));
  let r = (s + 1) & Vm,
    l = n << 8,
    c = ((n + 1) & Vm) << 8,
    h = o[l + s],
    f = o[l + r],
    u = o[c + s],
    d = o[c + r];
  return h + (f - h) * i + (u - h) * a + (h - f - u + d) * i * a;
}
var QY = Array.from(
  {
    length: 14,
  },
  () => new Float32Array(Hr + 1),
);
function Oe(o, t, e) {
  let s = QY[o],
    n = Math.floor(e),
    i = e - n;
  n &= Vm;
  let a = n << 8,
    r = ((n + 1) & Vm) << 8;
  for (let l = 0; l < Hr; l++) {
    let c = t[a + l];
    s[l] = c + (t[r + l] - c) * i;
  }
  return ((s[Hr] = s[0]), s);
}
function Ne(o, t) {
  let e = Math.floor(t),
    s = e & Vm;
  return o[s] + (o[s + 1] - o[s]) * (t - e);
}
function Rn(o, t, e = 0) {
  let s =
    (Math.imul(o | 0, 374761393) +
      Math.imul(t | 0, 668265263) +
      Math.imul(e | 0, 1442695041)) |
    0;
  return (
    (s = Math.imul(s ^ (s >>> 13), 1274126177)),
    (s ^= s >>> 16),
    (s >>> 0) / 4294967296
  );
}
function ze(o, t, e) {
  let s = (e - o) / (t - o);
  return ((s = s < 0 ? 0 : s > 1 ? 1 : s), s * s * (3 - 2 * s));
}
var Gm = (o, t) => ((o % t) + t) % t;
var xe = (o, t, e) => o + (t - o) * e;
var S9 = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
function oh(o) {
  let t = o >>> 0;
  return () => (t = (Math.imul(t, 1664525) + 1013904223) >>> 0) / 4294967296;
}
var _9 = 8;
function Dd(o, t, e, s, n) {
  let i = new DataTexture(
    new Uint8Array(o.buffer),
    t,
    e,
    RGBAFormat,
    UnsignedByteType,
  );
  return (
    (i.wrapS = i.wrapT = RepeatWrapping),
    (i.magFilter = LinearFilter),
    (i.minFilter = LinearMipmapLinearFilter),
    (i.generateMipmaps = !0),
    (i.anisotropy = _9),
    s && (i.colorSpace = SRGBColorSpace),
    i.repeat.set(1 / n[0], 1 / n[1]),
    (i.userData.tile = n),
    (i.needsUpdate = !0),
    i
  );
}
function nD(o, t, e, s, n, i = 1) {
  let a = new Uint8ClampedArray(t * e * 4),
    r = t - 1,
    l = e - 1,
    c = (i * 0.125) / s,
    h = (i * 0.125) / n;
  for (let f = 0; f < e; f++) {
    let u = ((f - 1) & l) * t,
      d = f * t,
      m = ((f + 1) & l) * t;
    for (let p = 0; p < t; p++) {
      let x = (p - 1) & r,
        g = (p + 1) & r,
        b = o[u + x],
        v = o[u + g],
        y = o[m + x],
        M = o[m + g],
        w = -(v + 2 * o[d + g] + M - (b + 2 * o[d + x] + y)) * c,
        T = -(y + 2 * o[m + p] + M - (b + 2 * o[u + p] + v)) * h,
        S = 1 / Math.sqrt(w * w + T * T + 1),
        E = (d + p) << 2;
      ((a[E] = (w * S * 0.5 + 0.5) * 255 + 0.5),
        (a[E + 1] = (T * S * 0.5 + 0.5) * 255 + 0.5),
        (a[E + 2] = (S * 0.5 + 0.5) * 255 + 0.5),
        (a[E + 3] = 255));
    }
  }
  return a;
}
function Wa(o) {
  let t = Array.isArray(o.tile) ? o.tile : [o.tile, o.tile],
    e = {
      tile: t,
    };
  return (
    o.alb && (e.map = Dd(o.alb, o.W, o.H, !0, t)),
    o.hgt &&
      (e.normalMap = Dd(
        nD(
          o.hgt,
          o.W,
          o.H,
          (t[0] * 1e3) / o.W,
          (t[1] * 1e3) / o.H,
          o.gain ?? 1,
        ),
        o.W,
        o.H,
        !1,
        t,
      )),
    o.orm && (e.roughnessMap = Dd(o.orm, o.W, o.H, !1, t)),
    e
  );
}
var Dn = (o) => new Uint8ClampedArray(o * 4);
function vb(o, t, e, s, n, i, a) {
  let r = n - e,
    l = i - s,
    c = Math.max(1, Math.ceil(Math.hypot(r, l) * 1.4)),
    h = t - 1,
    f = a / 1.4;
  for (let u = 0; u <= c; u++) {
    let d = u / c,
      m = e + r * d,
      p = s + l * d,
      x = Math.floor(m),
      g = Math.floor(p),
      b = m - x,
      v = p - g,
      y = f * Math.min(1, 6 * d, 6 * (1 - d)),
      M = (g & h) * t,
      w = ((g + 1) & h) * t,
      T = x & h,
      S = (x + 1) & h;
    ((o[M + T] += y * (1 - b) * (1 - v)),
      (o[M + S] += y * b * (1 - v)),
      (o[w + T] += y * (1 - b) * v),
      (o[w + S] += y * b * v));
  }
}
function Mg(o, t, e, s, n, i, a = 0.5) {
  let r = t - 1,
    l = Math.floor(e - n - 1),
    c = Math.ceil(e + n + 1),
    h = Math.floor(s - n - 1),
    f = Math.ceil(s + n + 1);
  for (let u = h; u <= f; u++)
    for (let d = l; d <= c; d++) {
      let m = Math.hypot(d + 0.5 - e, u + 0.5 - s) / n,
        p = i * (1 - ze(a, 1.15, m)),
        x = (u & r) * t + (d & r);
      p > o[x] && (o[x] = p);
    }
}
function nw(o, t, e, s, n, i, a, r, l = 0.012) {
  let c = 0;
  for (let h = 0; h < a;) {
    let f = 3 + e() * 6;
    c = c * 0.7 + (e() - 0.5) * 0.9;
    let u = i + c,
      d = s + Math.cos(u) * f,
      m = n + Math.sin(u) * f;
    (vb(
      o,
      t,
      s,
      n,
      d,
      m,
      r * (0.55 + 0.45 * e()) * Math.min(1, (a - h) / 40 + 0.25),
    ),
      (s = d),
      (n = m),
      (h += f),
      (i += (e() - 0.5) * 0.12),
      e() < l * f &&
        a - h > 30 &&
        nw(
          o,
          t,
          e,
          s,
          n,
          i + (e() < 0.5 ? -1 : 1) * (0.5 + e() * 0.6),
          (a - h) * 0.45,
          r * 0.7,
          0,
        ));
  }
}
function Mb(o, t, e, s, n, i) {
  let a = nD(t, o, o, 1, 1, n),
    r = o * o,
    l = 0,
    c = 0;
  for (let f = 0; f < r; f++)
    (e && (l += e[f] < -1 ? -1 : e[f] > 1 ? 1 : e[f]),
      s && (c += s[f] < -1 ? -1 : s[f] > 1 ? 1 : s[f]));
  ((l /= r), (c /= r));
  for (let f = 0, u = 0; f < r; f++, u += 4)
    ((a[u + 2] =
      127.5 + 127.5 * (e ? (e[f] < -1 ? -1 : e[f] > 1 ? 1 : e[f]) - l : 0)),
      (a[u + 3] =
        127.5 + 127.5 * (s ? (s[f] < -1 ? -1 : s[f] > 1 ? 1 : s[f]) - c : 0)));
  let h = Dd(a, o, o, !1, [1, 1]);
  return ((h.userData.tile = [i, i]), h);
}
function JY() {
  let e = new Float32Array(262144),
    s = new Float32Array(262144),
    n = oh(4101);
  for (let l = 0; l < 230; l++) {
    let c = n() * Wo,
      h = 14 + n() * n() * 150,
      f = n() * 512,
      u = n() * 512;
    vb(
      e,
      512,
      f,
      u,
      f + Math.cos(c) * h,
      u + Math.sin(c) * h,
      0.25 + n() * 0.75,
    );
  }
  for (let l = 0; l < 7; l++) {
    let c = n() * Wo,
      h = n() * 512,
      f = n() * 512,
      u = 60 + n() * 150;
    for (let d = 0; d < 9; d++) {
      let m = (n() - 0.5) * 16,
        p = c + (n() - 0.5) * 0.08,
        x = (n() - 0.5) * 30,
        g = h - Math.sin(c) * m + Math.cos(c) * x,
        b = f + Math.cos(c) * m + Math.sin(c) * x;
      vb(
        e,
        512,
        g,
        b,
        g + Math.cos(p) * u * (0.4 + n() * 0.6),
        b + Math.sin(p) * u * (0.4 + n() * 0.6),
        0.2 + n() * 0.5,
      );
    }
  }
  for (let l = 0; l < 110; l++)
    Mg(
      s,
      512,
      n() * 512,
      n() * 512,
      0.7 + n() * n() * 1.6,
      0.4 + n() * 0.6,
      0.3,
    );
  let i = new Float32Array(262144),
    a = new Float32Array(262144),
    r = new Float32Array(262144);
  for (let l = 0, c = 0; l < 512; l++)
    for (let h = 0; h < 512; h++, c++) {
      let f = e[c] > 1 ? 1 : e[c],
        u = Be(En, h + 9, l + 31) - 0.5,
        d = Be(yn, h * 0.5 + 77, l * 0.5 + 5) - 0.5;
      ((i[c] = -f * 0.5 - s[c] * 1.6 + u * 1.1),
        (a[c] = f * 0.9 + s[c] * 0.7 + d * 0.35 + (Rn(h, l, 5) - 0.5) * 0.12),
        (r[c] =
          -s[c] * 0.8 -
          f * 0.1 +
          (Be(E9, h * 3 + 5, l * 3 + 9) - 0.5) * 0.3 +
          (Rn(h, l, 6) - 0.5) * 0.1));
    }
  return Mb(512, i, a, r, 1, 0.33);
}
function tj() {
  let e = new Float32Array(262144),
    s = oh(4202);
  for (let r = 0; r < 620; r++)
    Mg(
      e,
      512,
      s() * 512,
      s() * 512,
      0.8 + s() * s() * s() * 4.2,
      0.45 + s() * 0.55,
      0.35,
    );
  let n = new Float32Array(262144),
    i = new Float32Array(262144),
    a = new Float32Array(262144);
  for (let r = 0, l = 0; r < 512; r++)
    for (let c = 0; c < 512; c++, l++) {
      let h = 0.45 * Rn(c, r, 7) + 0.55 * Be(qo, c * 2 + 3, r * 2 + 8),
        f = Be(En, c + 40, r + 12) - 0.5,
        u = e[l];
      ((n[l] = (h - 0.5) * 1.5 + f * 1.2 - u * 3.4),
        (i[l] = (h - 0.5) * 0.9 + u * 0.5 + f * 0.3),
        (a[l] = (h - 0.5) * 0.42 + f * 0.2 - u * 1));
    }
  return Mb(512, n, i, a, 1, 0.31);
}
function ej() {
  let s = 0.0859375,
    n = new Float32Array(22 * 22),
    i = new Float32Array(22 * 22),
    a = new Float32Array(22 * 22),
    r = new Float32Array(22 * 22);
  for (let h = 0; h < 22; h++)
    for (let f = 0; f < 22; f++) {
      let u = h * 22 + f;
      ((n[u] = f + 0.15 + 0.7 * Rn(f, h, 31)),
        (i[u] = h + 0.15 + 0.7 * Rn(f, h, 32)),
        (a[u] = Rn(f, h, 33)),
        (r[u] = Rn(f, h, 34) * Wo));
    }
  let l = new Float32Array(65536),
    c = new Float32Array(65536);
  for (let h = 0, f = 0; h < 256; h++)
    for (let u = 0; u < 256; u++, f++) {
      let d = (u + 0.5) * s,
        m = (h + 0.5) * s,
        p = Math.floor(d),
        x = Math.floor(m),
        g = 9,
        b = 9,
        v = 0,
        y = 0,
        M = 0;
      for (let E = -1; E <= 1; E++)
        for (let _ = -1; _ <= 1; _++) {
          let R = p + _,
            C = x + E,
            L = Gm(R, 22),
            A = Gm(C, 22),
            O = A * 22 + L,
            H = n[O] + (R - L) - d,
            F = i[O] + (C - A) - m,
            P = Math.sqrt(H * H + F * F);
          P < g
            ? ((b = g), (g = P), (v = O), (y = H), (M = F))
            : P < b && (b = P);
        }
      let w = ze(0, 0.42, b - g),
        T = 0.5 + 0.5 * Math.sin(Math.atan2(M, y) * 3 + r[v] + g * 9),
        S = Rn(u, h, 35);
      ((l[f] =
        w * (2.2 + 0.9 * T) +
        (y * Math.cos(r[v]) + M * Math.sin(r[v])) * 1.3 +
        S * 0.5),
        (c[f] =
          (w - 0.62) * 1 +
          (a[v] - 0.5) * 0.7 +
          (T - 0.5) * 0.22 * w +
          (S - 0.5) * 0.25));
    }
  return Mb(256, l, null, c, 0.55, 0.07);
}
function sj() {
  let e = new Float32Array(262144),
    s = oh(4404);
  for (let l = 0; l < 46; l++) {
    let c = (s() - 0.5) * 2.4 + (s() < 0.5 ? 0 : Math.PI / 2),
      h = 20 + s() * 130,
      f = s() * 512,
      u = s() * 512;
    vb(e, 512, f, u, f + Math.cos(c) * h, u + Math.sin(c) * h, 0.3 + s() * 0.7);
  }
  let n = new Float32Array(262144),
    i = new Float32Array(262144),
    a = new Float32Array(262144),
    r = (l, c, h, f) => {
      let u = l / h,
        d = Math.floor(u),
        m = u - d,
        p = m * m * (3 - 2 * m),
        x = 512 / h;
      return xe(Rn(d % x, c, f), Rn((d + 1) % x, c, f), p);
    };
  for (let l = 0, c = 0; l < 512; l++)
    for (let h = 0; h < 512; h++, c++) {
      let f = (l + 1) & 511,
        u =
          0.42 * Rn(7, l, 40) +
          0.3 * r(h, l, 128, 41) +
          0.28 * r(h + 37, l, 32, 42),
        d =
          0.42 * Rn(7, f, 40) +
          0.3 * r(h, f, 128, 41) +
          0.28 * r(h + 37, f, 32, 42),
        m = u * 0.75 + d * 0.25,
        p = e[c] > 1 ? 1 : e[c],
        x = Be(yn, h * 0.5, l * 0.5) - 0.5;
      ((n[c] = m * 1.6 - p * 1.5),
        (i[c] = (m - 0.5) * 1.5 + p * 0.6 + x * 0.08),
        (a[c] = (m - 0.5) * 0.6 - p * 0.2));
    }
  return Mb(512, n, i, a, 0.75, 0.24);
}
function nj() {
  let e = new Float32Array(262144),
    s = oh(4505),
    n = 511;
  for (let c = 0; c < 40; c++) {
    let h = s() * 512,
      f = s() * 512,
      u = s() * Wo,
      d = 7 + s() * 7,
      m = d * (1.3 + s() * 0.6),
      p = 0.35 + s() * 0.65,
      x = Math.cos(u),
      g = Math.sin(u),
      b = Math.ceil(m + 2);
    for (let v = -b; v <= b; v++)
      for (let y = -b; y <= b; y++) {
        let M = (y * x + v * g) / d,
          w = (-y * g + v * x) / m,
          T = Math.sqrt(M * M + w * w);
        if (T >= 1.1) continue;
        let S = (((f + v) | 0) & n) * 512 + (((h + y) | 0) & n),
          E =
            0.72 +
            0.28 * Math.sin((Math.hypot(M * d, w * m * 0.8) + M * 2) * 2.6),
          _ =
            p *
            (1 - ze(0.55, 1.05, T)) *
            E *
            (0.6 + 0.4 * Be(qo, (h + y) * 2, (f + v) * 2));
        _ > e[S] && (e[S] = _);
      }
  }
  let i = new Float32Array(262144);
  for (let c = 0; c < 9; c++) {
    let h = s() * 512,
      f = s() * 512,
      u = s() * Wo,
      d = (s() - 0.5) * 0.02,
      m = 0.05 + s() * 0.08;
    for (let p = 0; p < 70; p++) {
      let x = h + Math.cos(u) * 6,
        g = f + Math.sin(u) * 6;
      for (let b = -7; b <= 7; b += 1.4)
        vb(
          i,
          512,
          h - Math.sin(u) * b,
          f + Math.cos(u) * b,
          x - Math.sin(u) * b,
          g + Math.cos(u) * b,
          m * (0.4 + 0.6 * Rn(b * 10, c, 46)),
        );
      ((h = x), (f = g), (u += d));
    }
  }
  let a = new Float32Array(262144),
    r = new Float32Array(262144),
    l = new Float32Array(262144);
  for (let c = 0; c < 262144; c++)
    ((r[c] = e[c] + Math.min(0.5, i[c]) - 0.08), (l[c] = -e[c] * 0.06));
  return Mb(512, a, r, l, 1, 0.3);
}
function oj() {
  let e = Dn(262144),
    s = new Float32Array(262144),
    n = new Float32Array(262144);
  for (let a = 0, r = 0; a < 512; a++) {
    let l = a * 0.5,
      c = Oe(0, Ga, l),
      h = Oe(1, yn, l + 90),
      f = Oe(2, Va, l + 30),
      u = Oe(3, yn, l * 2 + 3),
      d = Oe(4, Ga, l + 5),
      m = Oe(5, Ga, l + 33),
      p = Oe(6, En, l * 2 + 70),
      x = Oe(7, En, l + 9),
      g = Oe(8, qo, l + 3),
      b = Oe(9, yn, l + 77);
    for (let v = 0; v < 512; v++, r++) {
      let y = v * 0.5,
        M = r << 2;
      ((e[M] = (Ne(c, y) * 0.65 + Ne(h, y + 40) * 0.35) * 255),
        (e[M + 1] = (Ne(f, y + 120) * 0.7 + Ne(u, y * 2 + 7) * 0.3) * 255));
      let w = (Ne(d, y + 17) - 0.5) * 70,
        T = (Ne(m, y + 91) - 0.5) * 70;
      ((s[r] =
        Be(Va, y + w + 60, l + T + 10) * 0.5 +
        Be(yn, y * 2 + w + 11, l * 2 + T + 50) * 0.32 +
        Ne(p, y * 2 + 3) * 0.18),
        (n[r] =
          Ne(x, y * 8 + 5) * 0.5 +
          Ne(g, y * 4 + 9) * 0.3 +
          Ne(b, y * 2) * 0.2));
    }
  }
  let i = (a, r) => {
    let l = new Uint32Array(4096);
    for (let f = 0; f < 262144; f++) l[Math.min(4095, (a[f] * 4096) | 0)]++;
    let c = new Float32Array(4096),
      h = 0;
    for (let f = 0; f < 4096; f++) ((h += l[f]), (c[f] = h / 262144));
    for (let f = 0; f < 262144; f++)
      e[(f << 2) + r] = c[Math.min(4095, (a[f] * 4096) | 0)] * 255;
  };
  return (i(s, 2), i(n, 3), Dd(e, 512, 512, !1, [1, 1]));
}
function w9(o, t, e, s, n) {
  let i = Dd(new Uint8ClampedArray([o, t, e, s]), 1, 1, n, [1, 1]);
  return (
    (i.generateMipmaps = !1),
    (i.minFilter = LinearFilter),
    (i.anisotropy = 1),
    i
  );
}
function ij() {
  let e = Dn(1048576),
    s = Dn(1048576),
    n = new Float32Array(1048576);
  for (let i = 0; i < 1024; i++) {
    let a = i / 1024,
      r = i * 0.25,
      l = Oe(0, Ga, r),
      c = Oe(1, Va, r + 77),
      h = Oe(2, En, r * 2 + 40),
      f = Oe(3, qo, i * 0.5 + 9),
      u = Oe(4, yn, r + 40),
      d = Oe(5, Va, r * 2 + 10),
      m = Oe(6, En, r * 2 + 17),
      p = Oe(7, yn, r * 2 + 150),
      x = Oe(8, yn, r * 2 + 190),
      g = Oe(9, yn, r + 250),
      b = Oe(10, Va, r * 2 + 140);
    for (let v = 0; v < 1024; v++) {
      let y = v / 1024,
        M = v * 0.25,
        w = i * 1024 + v,
        T = Ne(l, M) - 0.5,
        S = Ne(c, M + 31) - 0.5,
        E = Ne(h, M * 2 + 5) - 0.5,
        _ = Ne(f, v * 0.5 + 3) - 0.5,
        R = Ne(u, M + 200),
        C = Ne(d, M * 2 + 300),
        L = ze(0.3, 0.6, C),
        A = Ne(m, M * 2 + 61),
        O = 2 * y + a + T * 0.42 + S * 0.22 + E * 0.04 + _ * 0.002,
        H = Math.abs(O - Math.floor(O) - 0.5),
        F = 0.006 + 0.04 * R * R,
        P = (1 - ze(F * 0.15, F, H)) * L * (0.45 + 0.75 * A),
        z = Math.abs(H - F * (0.35 + 0.5 * A)),
        k = (1 - ze(4e-4, 0.004, z)) * L * ze(0.2, 0.5, R + A * 0.4),
        I = (1 - ze(4e-4, 0.0034 + 0.004 * R, H)) * (0.25 + 0.75 * L),
        G = (1 - ze(0, F * 2.2 + 0.02, H)) * L,
        K = Ne(p, M * 2 + 70);
      O += 0.035 + (K - 0.5) * 0.12;
      let $ = Math.abs(O - Math.floor(O) - 0.5),
        n0 = (1 - ze(5e-4, 0.0042, $)) * ze(0.34, 0.6, K) * 0.6,
        e0 = Ne(x, M * 2 + 9);
      O = -y + 2 * a + T * 0.5 - S * 0.6 + E * 0.05 + _ * 0.002;
      let p0 = Math.abs(O - Math.floor(O) - 0.5),
        t0 = (1 - ze(8e-4, 0.005, p0)) * ze(0.56, 0.8, e0) * 0.55,
        M0 = ze(0.3, 0.8, Ne(g, M + 400));
      O = 3 * y - a + S * 0.7 + T * 0.3 + E * 0.08;
      let f0 = Math.abs(O - Math.floor(O) - 0.5),
        _0 =
          (1 - ze(3e-4, 0.0032, f0)) * ze(0.6, 0.85, Ne(b, M * 2 + 90)) * 0.3,
        F0 = ze(0.02, 0.22, S) * ze(0.35, 0.6, A),
        m0 = 230,
        S0 = 225,
        T0 = 216;
      ((m0 = xe(m0, 213, M0 * 0.5)),
        (S0 = xe(S0, 207, M0 * 0.5)),
        (T0 = xe(T0, 199, M0 * 0.5)));
      let j0 = G * 0.24;
      ((m0 = xe(m0, 194, j0)), (S0 = xe(S0, 188, j0)), (T0 = xe(T0, 180, j0)));
      let Z0 = Math.min(1, P) * 0.72;
      ((m0 = xe(m0, xe(156, 196, F0), Z0)),
        (S0 = xe(S0, xe(154, 172, F0), Z0)),
        (T0 = xe(T0, xe(155, 136, F0), Z0)));
      let lt = Math.min(1, k * 0.8 + I * 0.9);
      ((m0 = xe(m0, xe(92, 150, F0), lt)),
        (S0 = xe(S0, xe(91, 116, F0), lt)),
        (T0 = xe(T0, xe(96, 70, F0), lt)),
        (m0 = xe(m0, 128, n0)),
        (S0 = xe(S0, 121, n0)),
        (T0 = xe(T0, 114, n0)),
        (m0 = xe(m0, 146, t0)),
        (S0 = xe(S0, 137, t0)),
        (T0 = xe(T0, 126, t0)),
        (m0 = xe(m0, 160, _0)),
        (S0 = xe(S0, 152, _0)),
        (T0 = xe(T0, 142, _0)));
      let H0 = 1 + E * 0.035 + _ * 0.025,
        Y0 = w << 2;
      ((e[Y0] = m0 * H0),
        (e[Y0 + 1] = S0 * H0),
        (e[Y0 + 2] = T0 * H0),
        (e[Y0 + 3] = 255),
        (n[w] = T * 5 + S * 2.4 + E * 0.3 - lt * 0.035 - n0 * 0.015));
      let et = R * 0.5 + A * 0.5;
      ((s[Y0] = 255 * (1 - 0.1 * lt)),
        (s[Y0 + 1] =
          255 *
          Math.min(
            1,
            0.066 +
              0.07 * et * et +
              lt * 0.07 +
              n0 * 0.03 +
              t0 * 0.02 +
              Z0 * 0.02,
          )),
        (s[Y0 + 2] = 255),
        (s[Y0 + 3] = 0));
    }
  }
  return Wa({
    W: 1024,
    H: 1024,
    alb: e,
    hgt: n,
    orm: s,
    tile: 2.4,
  });
}
function aj() {
  let e = Dn(1048576),
    s = Dn(1048576),
    n = new Float32Array(1048576);
  for (let i = 0; i < 1024; i++) {
    let a = i / 1024,
      r = i * 0.25,
      l = Oe(0, Ga, r),
      c = Oe(1, Va, r + 77),
      h = Oe(2, En, r + 40),
      f = Oe(3, qo, i * 0.5 + 9),
      u = Oe(4, yn, r + 40),
      d = Oe(5, Va, r + 10),
      m = Oe(6, En, r * 2 + 3),
      p = Oe(7, yn, r + 150),
      x = Oe(8, yn, r * 2 + 190),
      g = Oe(9, yn, r + 250),
      b = Oe(10, En, r * 2 + 71),
      v = Oe(11, Va, r * 2 + 140),
      y = Oe(12, Ga, r + 3),
      M = Oe(13, En, r);
    for (let w = 0; w < 1024; w++) {
      let T = w / 1024,
        S = w * 0.25,
        E = i * 1024 + w,
        _ = Ne(l, S) - 0.5,
        R = Ne(c, S + 31) - 0.5,
        C = Ne(h, S + 5) - 0.5,
        L = Ne(f, w * 0.5 + 3) - 0.5,
        A = Ne(u, S + 200),
        O = ze(0.36, 0.7, Ne(d, S + 300)),
        H = 2 * T + a + _ * 1 + R * 0.5 + C * 0.05 + L * 0.004,
        F = Math.abs(H - Math.floor(H) - 0.5),
        P = 0.005 + 0.026 * A * A,
        z =
          (1 -
            ze(
              P * 0.08,
              P * 0.45,
              Math.abs(F - P * 0.3 * (Ne(m, S * 2 + 80) - 0.3)),
            )) *
          O,
        k = (1 - ze(P * 0.3, P, F)) * O,
        I = (1 - ze(0, P * 3 + 0.03, F)) * O * 0.5;
      H = 2 * T + a + 0.37 + R * 1.4 - _ * 0.45 + C * 0.1 + L * 0.004;
      let G = Math.abs(H - Math.floor(H) - 0.5),
        K = (1 - ze(0.0025, 0.01, G)) * ze(0.58, 0.82, Ne(p, S + 70)) * 0.85;
      H = -T + 3 * a + _ * 0.8 - R * 1.2 + C * 0.16 + L * 0.005;
      let $ = Math.abs(H - Math.floor(H) - 0.5),
        n0 =
          (1 - ze(0.002, 0.009, $)) * ze(0.62, 0.86, Ne(x, S * 2 + 9)) * 0.55,
        e0 = Ne(g, S + 400),
        p0 = ze(0.6, 0.9, Ne(b, S * 2 + 33)) * ze(0.4, 0.7, e0),
        t0 = ze(0.55, 0.8, Ne(v, S * 2 + 90));
      H = 3 * T - 2 * a + R * 0.9 + _ * 0.4 + C * 0.12;
      let M0 = Math.abs(H - Math.floor(H) - 0.5),
        f0 = (1 - ze(6e-4, 0.003, M0)) * t0 * 0.35,
        _0 = 48 + e0 * 12,
        F0 = 45 + e0 * 10,
        m0 = 46 + e0 * 9;
      ((_0 = xe(_0, 74, p0 * 0.45)),
        (F0 = xe(F0, 72, p0 * 0.45)),
        (m0 = xe(m0, 74, p0 * 0.45)),
        (_0 = xe(_0, 92, I * 0.3)),
        (F0 = xe(F0, 66, I * 0.3)),
        (m0 = xe(m0, 38, I * 0.3)),
        (_0 = xe(_0, 190, k)),
        (F0 = xe(F0, 142, k)),
        (m0 = xe(m0, 70, k)),
        (_0 = xe(_0, 232, z * 0.8)),
        (F0 = xe(F0, 190, z * 0.8)),
        (m0 = xe(m0, 112, z * 0.8)),
        (_0 = xe(_0, 176, K)),
        (F0 = xe(F0, 132, K)),
        (m0 = xe(m0, 70, K)),
        (_0 = xe(_0, 208, n0)),
        (F0 = xe(F0, 203, n0)),
        (m0 = xe(m0, 192, n0)),
        (_0 = xe(_0, 150, f0)),
        (F0 = xe(F0, 146, f0)),
        (m0 = xe(m0, 140, f0)));
      let S0 = 1 + L * 0.08 + C * 0.05,
        T0 = E << 2;
      ((e[T0] = _0 * S0),
        (e[T0 + 1] = F0 * S0),
        (e[T0 + 2] = m0 * S0),
        (e[T0 + 3] = 255),
        (n[E] = (Ne(y, S + 77) - 0.5) * 3.2 + R * 1.2 - k * 0.05 - n0 * 0.02),
        (s[T0] = 255 * (1 - 0.12 * k)),
        (s[T0 + 1] =
          255 * (0.06 + 0.07 * Ne(M, S) + k * 0.09 + n0 * 0.05 + f0 * 0.04)),
        (s[T0 + 2] = 255),
        (s[T0 + 3] = 0));
    }
  }
  return Wa({
    W: 1024,
    H: 1024,
    alb: e,
    hgt: n,
    orm: s,
    tile: 2,
  });
}
function eD(o) {
  let n = Dn(524288),
    i = Dn(524288),
    a = new Float32Array(524288),
    r = o.early,
    l = o.late,
    c = o.pore;
  for (let h = 0; h < 512; h++) {
    let f = h / 512,
      u = h * 0.5,
      d = Oe(0, Ga, u),
      m = Oe(1, yn, u + 9),
      p = Oe(2, En, u * 2 + o.seed),
      x = Oe(3, yn, u * 2 + 13),
      g = Oe(4, qo, h * 4 + 3),
      b = Oe(5, En, h * 2 + 51),
      v = Oe(6, qo, h * 4 + 77),
      y = Oe(7, qo, h * 2 + 19),
      M = Oe(8, yn, u + 60);
    for (let w = 0; w < 1024; w++) {
      let T = h * 1024 + w,
        S = w * 0.25,
        E = Ne(d, S + o.seed) - 0.5,
        _ = Ne(m, S + 40 + o.seed) - 0.5,
        R = Ne(p, S + 7) - 0.5,
        C = o.rings * f + E * o.sweep + _ * o.sweep * 0.45 + R * 0.5,
        L = Math.floor(C),
        A = C - L,
        O = Gm(L, o.rings),
        H = Rn(O, 3, o.seed),
        F = Rn(O, 5, o.seed),
        P =
          ze(0.35 + 0.2 * H, 0.9, A) *
          (1 - ze(0.94, 1, A)) *
          (0.35 + 0.65 * F) *
          (0.45 + 0.55 * Ne(x, S + 77 + o.seed)),
        z = Ne(g, S + 11) * 0.6 + Ne(b, S + 90) * 0.4,
        k = Ne(v, w + 7),
        I =
          ze(o.poreLo, o.poreLo + 0.16, k) *
          (o.ringPorous ? (1 - ze(0.05, 0.6, A)) * 0.85 + 0.15 : 0.6),
        G = o.rays ? ze(0.8, 0.92, Ne(y, w * 2 + 31)) * o.rays : 0,
        K = Ne(M, S + 140),
        $ = o.streak
          ? ze(0.62, 0.9, Be(Va, S + 9 + o.seed, u * 2 + 33 + E * 30)) *
            o.streak
          : 0,
        n0 = xe(r[0], l[0], P),
        e0 = xe(r[1], l[1], P),
        p0 = xe(r[2], l[2], P),
        t0 = (0.9 + 0.2 * z) * (0.93 + 0.14 * K) * (1 - 0.3 * $);
      ((n0 *= t0),
        (e0 *= t0 * (1 - 0.05 * $)),
        (p0 *= t0 * (1 - 0.02 * $)),
        (n0 = xe(n0, c[0], I * 0.8)),
        (e0 = xe(e0, c[1], I * 0.8)),
        (p0 = xe(p0, c[2], I * 0.8)),
        (n0 *= 1 - 0.22 * G),
        (e0 *= 1 - 0.26 * G),
        (p0 *= 1 - 0.3 * G));
      let M0 = T << 2;
      ((n[M0] = n0),
        (n[M0 + 1] = e0),
        (n[M0 + 2] = p0),
        (n[M0 + 3] = 255),
        (a[T] = P * 0.035 - I * 0.09 + (z - 0.5) * 0.03 - G * 0.015 + _ * 0.2),
        (i[M0] = 255 * (1 - 0.45 * I - 0.1 * G)),
        (i[M0 + 1] =
          255 *
          Math.min(
            1,
            o.rough + 0.1 * (1 - P) + I * 0.3 + (z - 0.5) * 0.1 + G * 0.06,
          )),
        (i[M0 + 2] = 255),
        (i[M0 + 3] = 0));
    }
  }
  return Wa({
    W: 1024,
    H: 512,
    alb: n,
    hgt: a,
    orm: i,
    tile: o.tile,
    gain: o.gain,
  });
}
var rj = {
  seed: 0,
  tile: [1.8, 0.18],
  rings: 34,
  sweep: 7,
  ringPorous: !0,
  poreLo: 0.6,
  rays: 0.8,
  streak: 0,
  rough: 0.33,
  gain: 1.6,
  early: [208, 172, 124],
  late: [164, 123, 80],
  pore: [112, 80, 50],
};
var lj = {
  seed: 97,
  tile: [2.4, 0.3],
  rings: 44,
  sweep: 11,
  ringPorous: !1,
  poreLo: 0.66,
  rays: 0,
  streak: 0.8,
  rough: 0.3,
  gain: 1.6,
  early: [102, 76, 55],
  late: [74, 53, 38],
  pore: [46, 32, 23],
};
function oD(o, t, e, { carve: s = 1.6, shade: n = 0.12 } = {}) {
  let a = o
      .getContext("2d", {
        willReadFrequently: !0,
      })
      .getImageData(0, 0, t, t).data,
    r = new Float32Array(t * t),
    l = 256 / t;
  for (let c = 0; c < t; c++) {
    let h = Oe(0, yn, c * l),
      f = Oe(1, Va, c * l * 2),
      u = Oe(2, En, c * l * 2 + 30),
      d = Rn(3, c >> 1, 6) - 0.5;
    for (let m = 0; m < t; m++) {
      let p = c * t + m,
        x = p << 2,
        g = Ne(h, m * l) * 0.6 + Ne(f, m * l * 2 + 40) * 0.4,
        b = Ne(u, m * l * 2),
        v = ze(4, 46, a[x] - a[x + 2]),
        y = (0.92 + 0.16 * b + 0.05 * d) * (1 - n + 2 * n * g);
      ((a[x] *= y),
        (a[x + 1] *= y),
        (a[x + 2] *= y),
        (r[p] = -v * s + g * 1.2 + b * 0.5 + d * 0.25));
    }
  }
  return Wa({
    W: t,
    H: t,
    alb: a,
    hgt: r,
    tile: e,
    gain: 0.8,
  });
}
function cj() {
  let e = createCanvas(1024),
    s = e.getContext("2d", {
      willReadFrequently: !0,
    });
  ((s.fillStyle = "#12263a"), s.fillRect(0, 0, 1024, 1024));
  let n = "#a98a52",
    i = "#8a7346";
  for (let a = -1; a <= 1024 / 256 + 1; a++)
    for (let r = -1; r <= 1024 / (2 * 256) + 1; r++) {
      let l = r * 2 * 256 + (a & 1) * 256,
        c = a * 256,
        h = ((r + (a >> 1)) & 1) === 0,
        f = s.createRadialGradient(l, c, 256 * 0.1, l, c, 256);
      (h
        ? (f.addColorStop(0, "#1f5058"), f.addColorStop(1, "#163c45"))
        : (f.addColorStop(0, "#1b3852"), f.addColorStop(1, "#132a42")),
        (s.fillStyle = f),
        s.beginPath(),
        s.arc(l, c, 257, 0, Wo),
        s.fill(),
        (s.strokeStyle = i),
        (s.lineWidth = 3),
        (s.lineCap = "butt"));
      for (let u = 1; u < 16; u++) {
        let d = Math.PI + (u / 16) * Math.PI;
        (s.beginPath(),
          s.moveTo(l + Math.cos(d) * 256 * 0.3, c + Math.sin(d) * 256 * 0.3),
          s.lineTo(
            l + Math.cos(d) * 256 * 0.955,
            c + Math.sin(d) * 256 * 0.955,
          ),
          s.stroke());
      }
      ((s.strokeStyle = n),
        (s.lineWidth = 8),
        s.beginPath(),
        s.arc(l, c, 252, Math.PI, Wo),
        s.stroke(),
        (s.lineWidth = 3),
        s.beginPath(),
        s.arc(l, c, 256 * 0.93, Math.PI, Wo),
        s.stroke(),
        (s.lineWidth = 3),
        s.beginPath(),
        s.arc(l, c, 256 * 0.64, Math.PI, Wo),
        s.stroke(),
        (s.lineWidth = 5),
        s.beginPath(),
        s.arc(l, c, 256 * 0.3, Math.PI, Wo),
        s.stroke(),
        (s.lineWidth = 2.5),
        s.beginPath(),
        s.arc(l, c, 256 * 0.24, Math.PI, Wo),
        s.stroke(),
        (s.fillStyle = h ? "#9a5a34" : n),
        s.beginPath(),
        s.arc(l, c, 256 * 0.12, Math.PI, Wo),
        s.fill());
    }
  return oD(e, 1024, 2.4, {
    carve: 1.8,
    shade: 0.12,
  });
}
function hj() {
  let e = createCanvas(1024),
    s = e.getContext("2d", {
      willReadFrequently: !0,
    });
  ((s.fillStyle = "#39373b"), s.fillRect(0, 0, 1024, 1024));
  let n = (i, a, r) => {
    (s.beginPath(),
      s.moveTo(i, a - r),
      s.lineTo(i + r, a),
      s.lineTo(i, a + r),
      s.lineTo(i - r, a),
      s.closePath());
  };
  for (let i = -1; i <= 1024 / 256 + 1; i++)
    for (let a = -1; a <= 1024 / 256 + 1; a++) {
      let r = a * 256,
        l = i * 256;
      ((s.strokeStyle = "#514a45"),
        (s.lineWidth = 3.2),
        n(r, l, 256 * 0.5 - 12),
        s.stroke(),
        (s.strokeStyle = "#8f4d2c"),
        (s.lineWidth = 8),
        n(r, l, 256 * 0.5),
        s.stroke(),
        (s.fillStyle = "#3f2e28"),
        n(r, l, 256 * 0.2),
        s.fill(),
        (s.strokeStyle = "#8f4d2c"),
        (s.lineWidth = 4),
        n(r, l, 256 * 0.2),
        s.stroke(),
        (s.fillStyle = "#9a8054"),
        n(r + 256 * 0.5, l + 256 * 0.5, 10),
        s.fill());
    }
  return oD(e, 1024, 1.6, {
    carve: 1.3,
    shade: 0.16,
  });
}
function fj() {
  let e = Dn(1048576),
    s = Dn(1048576),
    n = new Float32Array(1048576);
  for (let i = 0; i < 1024; i++) {
    let a = i * 0.25,
      r = Oe(0, yn, a),
      l = Oe(1, En, a + 20),
      c = Oe(2, yn, i * 0.5 + 77),
      h = Oe(3, En, i * 0.5 + 41),
      f = Oe(4, En, i + 5),
      u = Oe(5, Ga, a + 60);
    for (let d = 0; d < 1024; d++) {
      let m = i * 1024 + d,
        p = d * 0.25,
        x = (Ne(r, p) - 0.5) * 44 + (Ne(l, p + 50) - 0.5) * 9,
        g = i + x,
        b = Be(Ga, p + 11, g),
        v = Be(En, p + 71, g + 30),
        y = Be(qo, p, g + 5),
        M = Ne(c, d * 0.5 + 9) * 0.6 + Ne(h, d * 0.5 + 3) * 0.4,
        w = 0.3 * b + 0.28 * v + 0.14 * y + 0.28 * M,
        T = ze(0.56, 0.78, Be(yn, p + 91, g * 0.5 + 17)),
        S = 0,
        E = 0,
        _ = 0;
      if (T > 0) {
        let F = Be(qo, d + 3, g * 2 + 8),
          P = ze(0.7, 0.79, F) * T;
        ((S = P * ze(0.6, 0.72, Ne(f, d + 13))),
          (E = P - S),
          (_ = ze(0.64, 0.7, F) * T * (1 - P)));
      }
      let R = ze(0.66, 0.9, Be(Va, p + 200, g * 0.5 + 90)) * 0.5,
        C = w < 0.5 ? xe(180, 205, w * 2) : xe(205, 226, w * 2 - 1),
        L = w < 0.5 ? xe(162, 190, w * 2) : xe(190, 214, w * 2 - 1),
        A = w < 0.5 ? xe(137, 167, w * 2) : xe(167, 194, w * 2 - 1);
      ((C = xe(C, 196, R * 0.3)),
        (L = xe(L, 160, R * 0.3)),
        (A = xe(A, 118, R * 0.3)),
        (C = xe(C, 214, E * 0.75)),
        (L = xe(L, 205, E * 0.75)),
        (A = xe(A, 188, E * 0.75)));
      let O = 1 - 0.62 * S - 0.14 * _,
        H = m << 2;
      ((e[H] = C * O),
        (e[H + 1] = L * O),
        (e[H + 2] = A * O * (1 - 0.05 * S)),
        (e[H + 3] = 255),
        (n[m] =
          -S * 1.7 -
          E * 0.06 +
          (y - 0.5) * 0.3 +
          (v - 0.5) * 0.3 +
          (Ne(u, p + 150) - 0.5) * 2.2),
        (s[H] = 255 * (1 - 0.6 * S - 0.1 * _)),
        (s[H + 1] =
          255 *
          Math.min(1, 0.6 + 0.14 * (1 - w) + S * 0.25 + E * 0.14 + 0.06 * M)),
        (s[H + 2] = 255 * (0.12 + 0.88 * T) * (1 - E)),
        (s[H + 3] = 0));
    }
  }
  return Wa({
    W: 1024,
    H: 1024,
    alb: e,
    hgt: n,
    orm: s,
    tile: 1.8,
  });
}
var sD = [
  [17, 90, 118],
  [26, 128, 142],
  [70, 176, 172],
];
function uj() {
  let e = Dn(262144),
    s = Dn(262144),
    n = new Float32Array(262144),
    i = new Float32Array(262144),
    a = oh(606);
  for (let r = 0; r < 260; r++)
    Mg(i, 512, a() * 512, a() * 512, 0.8 + a() * 1.6, 0.5 + a() * 0.5, 0.2);
  for (let r = 0; r < 512; r++)
    for (let l = 0; l < 512; l++) {
      let c = r * 512 + l,
        h = l * 0.5,
        f = r * 0.5,
        u = (Be(yn, h + 30, f + 80) - 0.5) * 24,
        d = Be(Ga, h + u, f - u),
        m = S9(d * 1.2 - 0.1) * 1.999,
        p = m | 0,
        x = m - p,
        g = sD[p],
        b = sD[p + 1],
        v = Be(En, h + u * 0.5, f * 4 + 7) - 0.5,
        y = Be(qo, l, r * 2) - 0.5,
        M = i[c],
        w = 1 + v * 0.05 + y * 0.04 + M * 0.22,
        T = c << 2;
      ((e[T] = xe(g[0], b[0], x) * w),
        (e[T + 1] = xe(g[1], b[1], x) * w),
        (e[T + 2] = xe(g[2], b[2], x) * w),
        (e[T + 3] = 255),
        (n[c] = v * 0.05 + (Be(En, l + 5, r + 9) - 0.5) * 0.05 - M * 0.05),
        (s[T] = 255),
        (s[T + 1] = 255 * (0.07 + 0.07 * Be(yn, h + 111, f + 3) + M * 0.1)),
        (s[T + 2] = 255),
        (s[T + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: n,
    orm: s,
    tile: 0.32,
  });
}
function dj() {
  let e = Dn(262144),
    s = Dn(262144),
    n = new Float32Array(262144),
    i = new Float32Array(262144),
    a = oh(707);
  for (let r = 0; r < 420; r++)
    Mg(
      i,
      512,
      a() * 512,
      a() * 512,
      0.7 + a() * a() * 2.6,
      0.4 + a() * 0.6,
      0.3,
    );
  for (let r = 0; r < 512; r++)
    for (let l = 0; l < 512; l++) {
      let c = r * 512 + l,
        h = l * 0.5,
        f = r * 0.5,
        u = Be(yn, h, f),
        d = Be(En, h + 31, f + 9),
        m = Be(qo, h, r * 2 + 5),
        p = ze(0.86, 0.95, Be(qo, l * 2 + 1, r * 2 + 3)),
        x = i[c],
        g = (0.86 + 0.2 * d + 0.1 * (m - 0.5)) * (1 - 0.45 * p) * (1 - 0.5 * x),
        b = c << 2;
      ((e[b] = xe(70, 84, u) * g),
        (e[b + 1] = xe(58, 62, u) * g),
        (e[b + 2] = xe(52, 49, u) * g),
        (e[b + 3] = 255),
        (n[c] =
          (d - 0.5) * 0.25 +
          (m - 0.5) * 0.1 -
          x * 0.7 +
          (Be(Ga, h + 70, f) - 0.5) * 1.2),
        (s[b] = 255 * (1 - 0.5 * x)),
        (s[b + 1] = 255 * Math.min(1, 0.42 + 0.22 * d + 0.1 * u + x * 0.2)),
        (s[b + 2] = 255 * (1 - x)),
        (s[b + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: n,
    orm: s,
    tile: 0.8,
  });
}
function pj() {
  let e = Dn(262144),
    s = Dn(262144),
    n = new Float32Array(262144),
    i = new Float32Array(262144),
    a = oh(808);
  for (let r = 0; r < 90; r++)
    Mg(i, 512, a() * 512, a() * 512, 0.6 + a() * 0.9, 0.5 + a() * 0.5, 0.2);
  for (let r = 0; r < 512; r++)
    for (let l = 0; l < 512; l++) {
      let c = r * 512 + l,
        h = l * 0.5,
        f = r * 0.5,
        u = Be(yn, h, f) - 0.5,
        d = Be(En, l + 3, r + 7) - 0.5,
        m = Be(qo, h + 9, f + 4) - 0.5,
        p = ze(0.66, 0.86, Be(Va, h + 40, f + 90)),
        x = p > 0 ? (1 - ze(0.01, 0.045, Be(T9, l * 2 + 5, r * 2 + 9))) * p : 0,
        g = i[c],
        b = 1 + u * 0.03 - x * 0.1 - g * 0.35,
        v = c << 2;
      ((e[v] = 232 * b),
        (e[v + 1] = 229 * b),
        (e[v + 2] = 222 * b * (1 - x * 0.06)),
        (e[v + 3] = 255),
        (n[c] = d * 0.2 + m * 0.05 + u * 0.5 - g * 0.15 - x * 0.01),
        (s[v] = 255 * (1 - 0.3 * g)),
        (s[v + 1] = 255 * (0.07 + 0.06 * (u + 0.5) + g * 0.3 + x * 0.06)),
        (s[v + 2] = 255),
        (s[v + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: n,
    orm: s,
    tile: 0.6,
  });
}
function mj() {
  let e = Dn(1048576),
    s = Dn(1048576),
    n = Dn(1048576),
    i = new Float32Array(1048576),
    a = new Float32Array(1048576),
    r = oh(909);
  for (let h = 0; h < 5; h++)
    nw(
      a,
      1024,
      r,
      r() * 1024,
      r() * 1024,
      r() < 0.6 ? Math.PI / 2 + (r() - 0.5) * 0.7 : r() * Wo,
      160 + r() * 300,
      0.8,
      0.006,
    );
  for (let h = 0; h < 1024; h++) {
    let f = h * 0.25,
      u = Oe(0, Ga, f),
      d = Oe(1, Va, f * 2 + 60),
      m = Oe(2, qo, h * 0.5 + 60);
    for (let p = 0; p < 1024; p++) {
      let x = h * 1024 + p,
        g = p * 0.25,
        b = Ne(u, g),
        v = Ne(d, g * 2 + 30),
        y = Be(En, (p + h) * 0.25, (h * 4 - p) * 0.25),
        M = Be(En, (p * 3 - h) * 0.25 + 90, (p + h * 2) * 0.25 + 17),
        w = y * 0.6 + M * 0.4,
        T = Ne(m, p * 0.5 + 5),
        S = ze(
          0.55,
          0.8,
          Be(yn, (p * 2 + h) * 0.25 + 31, (h * 2 - p) * 0.25 + 7),
        ),
        E = a[x] > 1 ? 1 : a[x];
      i[x] =
        (b - 0.5) * 8 + (v - 0.5) * 3.6 + (w - 0.5) * 1.7 + (T - 0.5) * 0.14;
      let _ =
          0.95 +
          0.06 * v +
          0.05 * (w - 0.5) +
          0.03 * (b - 0.5) +
          (T - 0.5) * 0.03 +
          S * 0.012,
        R = x << 2;
      ((e[R] = 226 * _),
        (e[R + 1] = 214 * _),
        (e[R + 2] = 197 * _),
        (e[R + 3] = 255));
      let C = 0.82 + 0.26 * v + 0.2 * (w - 0.5) + 0.12 * S + (T - 0.5) * 0.08;
      ((s[R] = 56 * C),
        (s[R + 1] = 54 * C),
        (s[R + 2] = 55 * C),
        (s[R + 3] = 255),
        (n[R] = 255),
        (n[R + 1] =
          255 * (0.86 + 0.1 * (w - 0.5) - 0.13 * S + 0.04 * (T - 0.5))),
        (n[R + 2] = 255),
        (n[R + 3] = 255 * E));
    }
  }
  let l = Wa({
      W: 1024,
      H: 1024,
      alb: e,
      hgt: i,
      orm: n,
      tile: 3,
    }),
    c = Wa({
      W: 1024,
      H: 1024,
      alb: s,
      tile: 3,
    });
  return (
    (c.normalMap = l.normalMap),
    (c.roughnessMap = l.roughnessMap),
    {
      light: l,
      dark: c,
    }
  );
}
function gj() {
  let s = Dn(1048576),
    n = Dn(1048576),
    i = new Float32Array(1048576),
    a = new Float32Array(1048576),
    r = new Float32Array(1048576),
    l = oh(1010);
  for (let c = 0; c < 1150; c++) {
    let h = l() < 0.03;
    Mg(
      a,
      1024,
      l() * 1024,
      l() * 1024,
      h ? 2.2 + l() * 2.6 : 0.6 + l() * l() * 1.8,
      0.5 + l() * 0.5,
      0.45,
    );
  }
  for (let c = 0; c < 4; c++)
    nw(
      r,
      1024,
      l,
      l() * 1024,
      l() * 1024,
      l() * Wo,
      150 + l() * 300,
      0.8,
      0.006,
    );
  for (let c = 0; c < 1024; c++) {
    let h = c >> 6,
      f = ((c & 63) + 0.5) / 64,
      u = Rn(h, 1, 71),
      d = Rn(h, 2, 72),
      m = Rn(h, 3, 73),
      p = c * 0.25,
      x = Math.min(f, 1 - f) * 64,
      g = 1 - ze(0, 1.5, x),
      b =
        ze(0.6, 1, Rn(c >> 8, 9, 74)) *
        (1 - ze(0, 26, Math.abs((c & 255) - 128))),
      v = Oe(0, En, f * 48 + d * 256),
      y = Oe(1, qo, f * 100 + u * 256),
      M = Oe(2, Ga, p),
      w = Oe(3, yn, p + 20),
      T = Oe(4, En, c * 0.5 + 7),
      S = Oe(5, Va, p),
      E = Oe(6, yn, p + 40),
      _ = Oe(7, En, 3);
    for (let R = 0; R < 1024; R++) {
      let C = c * 1024 + R,
        L = R * 0.25,
        A = Ne(v, L + u * 256) * 0.6 + Ne(y, L * 2 + d * 256) * 0.4,
        O = Ne(M, L) * 0.6 + Ne(w, L + 60) * 0.4,
        H = Ne(T, R * 0.5 + 3),
        F = ze(0.55, 0.9, Ne(S, L * 4)) * ze(0.3, 0.7, Ne(E, L + 99)),
        P = g * (0.4 + 0.6 * Ne(_, R * 0.5 + m * 256)),
        z = a[C],
        k = r[C] > 1 ? 1 : r[C],
        I = Gm(R - 256, 512) - 256,
        G = Gm(c - 128, 256) - 128,
        K = Math.sqrt(I * I + G * G),
        $ = 1 - ze(3.6, 5.4, K),
        n0 = 1 - ze(0, 5.4, K),
        e0 = (1 - ze(5.4, 9, K)) * (1 - $),
        p0 =
          0.86 +
          0.13 * O +
          0.09 * (A - 0.5) +
          0.07 * (H - 0.5) -
          0.05 * F -
          0.05 * P +
          (u - 0.5) * 0.06 -
          0.04 * b;
      p0 *= (1 - 0.45 * z) * (1 - 0.6 * $) * (1 + 0.06 * e0);
      let t0 = C << 2;
      ((s[t0] = 153 * p0),
        (s[t0 + 1] = 148 * p0),
        (s[t0 + 2] = 139 * p0 * (1 - 0.03 * F)),
        (s[t0 + 3] = 255),
        (i[C] =
          (A - 0.5) * 0.4 +
          (u - 0.5) * 0.9 +
          P * 0.8 -
          z * 2.4 -
          $ * 3 -
          n0 * 4 +
          (O - 0.5) * 1.6 +
          e0 * 0.2),
        (n[t0] = 255 * (1 - 0.6 * z) * (1 - 0.75 * $) * (1 - 0.12 * g)),
        (n[t0 + 1] =
          255 * Math.min(1, 0.76 + 0.14 * A + 0.06 * F + 0.06 * (H - 0.5))),
        (n[t0 + 2] = 255 * (1 - z) * (1 - $)),
        (n[t0 + 3] = 255 * k));
    }
  }
  return Wa({
    W: 1024,
    H: 1024,
    alb: s,
    hgt: i,
    orm: n,
    tile: 2.4,
  });
}
function xj() {
  let e = Dn(262144),
    s = Dn(262144),
    n = new Float32Array(262144);
  for (let i = 0; i < 512; i++)
    for (let a = 0; a < 512; a++) {
      let r = i * 512 + a,
        l =
          ze(0.72, 0.82, Be(qo, a * 0.5 + 17, i * 1.5 + 3)) *
          ze(0.35, 0.6, Be(En, a * 0.5, i * 0.5)),
        c =
          ze(0.8, 0.88, Be(qo, a * 1.5 + 40, i * 0.5 + 77)) *
          ze(0.5, 0.7, Be(En, a * 0.5 + 60, i * 0.5 + 20)) *
          0.7,
        h = Rn(a, i, 81) > 0.985 ? 1 : 0,
        f = Math.min(1, l + c + h),
        u = Be(qo, a, i) - 0.5,
        d = Be(yn, a * 0.5 + 9, i * 0.5 + 5) - 0.5,
        m = 1 - 0.45 * f + u * 0.05 + d * 0.025,
        p = r << 2;
      ((e[p] = 226 * m),
        (e[p + 1] = 223 * m),
        (e[p + 2] = 215 * m),
        (e[p + 3] = 255),
        (n[r] = -f * 1.8 + u * 0.5),
        (s[p] = 255 * (1 - 0.6 * f)),
        (s[p + 1] = 244),
        (s[p + 2] = 255 * (1 - f)),
        (s[p + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: n,
    orm: s,
    tile: 0.6,
  });
}
function bj() {
  let e = Dn(262144),
    s = Dn(262144),
    n = new Float32Array(262144);
  for (let i = 0; i < 512; i++)
    for (let a = 0; a < 512; a++) {
      let r = i * 512 + a,
        l = a * 0.5,
        c = i * 0.5,
        h = Be(En, l, i * 4 + 9) * 0.6 + Be(qo, l + 30, i * 4) * 0.4,
        f = Be(yn, l + 60, c + 14),
        u = Be(Ga, l, c + 90),
        d = Be(Ga, l + 120, c + 33) - 0.5,
        m = 0.9 + (h - 0.5) * 0.07 + (f - 0.5) * 0.14 + (u - 0.5) * 0.1,
        p = r << 2;
      ((e[p] = xe(96, 104, u) * m),
        (e[p + 1] = xe(80, 78, u) * m),
        (e[p + 2] = xe(62, 56, u) * m),
        (e[p + 3] = 255),
        (n[r] = d * 10 + (h - 0.5) * 0.3),
        (s[p] = 255),
        (s[p + 1] = 255 * (0.3 + 0.1 * h + 0.14 * f)),
        (s[p + 2] = 255),
        (s[p + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: n,
    orm: s,
    tile: 2.4,
  });
}
function yj() {
  let s = Dn(262144),
    n = Dn(262144),
    i = new Float32Array(262144),
    a = new Float32Array(262144),
    r = oh(1111);
  for (let h = 0; h < 7; h++)
    nw(a, 512, r, r() * 512, r() * 512, r() * Wo, 140 + r() * 260, 1, 0.006);
  for (let h = 0; h < 2; h++) {
    let f = a.slice(),
      u = 511;
    for (let d = 0; d < 512; d++)
      for (let m = 0; m < 512; m++) {
        let p = ((d - 1) & u) * 512,
          x = d * 512,
          g = ((d + 1) & u) * 512,
          b = (m - 1) & u,
          v = (m + 1) & u;
        a[x + m] =
          (f[p + b] +
            f[p + m] * 2 +
            f[p + v] +
            f[x + b] * 2 +
            f[x + m] * 4 +
            f[x + v] * 2 +
            f[g + b] +
            f[g + m] * 2 +
            f[g + v]) /
          16;
      }
  }
  let l = new Float32Array(104 * 104),
    c = new Float32Array(104 * 104);
  for (let h = 0; h < 104; h++)
    for (let f = 0; f < 104; f++)
      ((l[h * 104 + f] = f + 0.12 + 0.76 * Rn(f, h, 111)),
        (c[h * 104 + f] = h + 0.12 + 0.76 * Rn(f, h, 112)));
  for (let h = 0; h < 512; h++)
    for (let f = 0; f < 512; f++) {
      let u = 1 + (Be(yn, f * 0.5, h * 0.5) - 0.5) * 0.5,
        d = ((f + 0.5) / 512) * 104,
        m = ((h + 0.5) / 512) * 104,
        p = Math.floor(d),
        x = Math.floor(m),
        g = 9,
        b = 9;
      for (let _ = -1; _ <= 1; _++)
        for (let R = -1; R <= 1; R++) {
          let C = p + R,
            L = x + _,
            A = Gm(C, 104),
            O = Gm(L, 104),
            H = O * 104 + A,
            F = l[H] + (C - A) - d,
            P = (c[H] + (L - O) - m) * u,
            z = Math.sqrt(F * F + P * P);
          z < g ? ((b = g), (g = z)) : z < b && (b = z);
        }
      let v = h * 512 + f,
        y = ze(0.03, 0.34, b - g),
        M = Math.min(1, a[v] * 1.6),
        w = Be(yn, f * 0.5 + 40, h * 0.5 + 9),
        T = Rn(f, h, 113) - 0.5;
      i[v] =
        y * (0.11 - 0.04 * g) -
        M * 0.35 +
        T * 0.012 +
        (Be(Ga, f * 0.5, h * 0.5 + 30) - 0.5) * 0.5;
      let S = (0.76 + 0.24 * y) * (0.92 + 0.16 * w) * (1 - 0.2 * M) + T * 0.03,
        E = v << 2;
      ((s[E] = 255 * S),
        (s[E + 1] = 255 * S * (0.985 + 0.015 * y)),
        (s[E + 2] = 255 * S * (0.96 + 0.04 * y)),
        (s[E + 3] = 255),
        (n[E] = 255 * (0.62 + 0.38 * y) * (1 - 0.35 * M)),
        (n[E + 1] =
          255 * (0.66 - 0.24 * y + 0.1 * Be(En, f * 0.5, h * 0.5) + M * 0.12)),
        (n[E + 2] = 255),
        (n[E + 3] = 0));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: s,
    hgt: i,
    orm: n,
    tile: 0.16,
  });
}
function vj() {
  let s = Dn(65536),
    n = Dn(65536),
    i = new Float32Array(65536);
  for (let a = 0; a < 256; a++)
    for (let r = 0; r < 256; r++) {
      let l = r >> 3,
        c = a >> 3,
        h = ((r & 7) + 0.5) / 8,
        f = ((a & 7) + 0.5) / 8,
        u = a * 256 + r,
        d = Math.sin(Math.PI * h),
        m = Math.sin(Math.PI * f),
        p = 0.75 + 0.5 * Rn(l, 0, 121) * Be(yn, l * 9, a),
        x = 0.75 + 0.5 * Rn(0, c, 122) * Be(yn, r, c * 9),
        g = ((l + c) & 1) === 0,
        b = g ? d * (0.55 + 0.45 * m) * p : m * (0.55 + 0.45 * d) * x,
        v = 0.5 + 0.5 * Math.sin((g ? a + r * 0.6 : r + a * 0.6) * 2.4),
        y = Rn(r, a, 123) - 0.5;
      i[u] = b * 0.3 + v * 0.03 * b + y * 0.03;
      let M = 1 + (Rn(g ? l : 7, g ? 9 : c, 124) - 0.5) * 0.14,
        w = (0.6 + 0.4 * ze(0.05, 0.75, b)) * M * (0.95 + 0.07 * v) + y * 0.04,
        T = u << 2;
      ((s[T] = 255 * w),
        (s[T + 1] = 255 * w),
        (s[T + 2] = 255 * w),
        (s[T + 3] = 255),
        (n[T] = 255 * (0.55 + 0.45 * ze(0.05, 0.7, b))),
        (n[T + 1] = 255 * (0.98 - 0.08 * b)),
        (n[T + 2] = 255),
        (n[T + 3] = 0));
    }
  return Wa({
    W: 256,
    H: 256,
    alb: s,
    hgt: i,
    orm: n,
    tile: 0.1,
    gain: 0.9,
  });
}
function Mj() {
  let e = Dn(262144),
    s = new Float32Array(262144);
  for (let n = 0; n < 512; n++)
    for (let i = 0; i < 512; i++) {
      let a = n * 512 + i,
        r = i * 0.5,
        l = n * 0.5,
        c = (Be(Ga, r + 9, l + 70) - 0.5) * 50,
        h = Be(yn, r + c, l * 2 - c) * 0.6 + Be(En, r * 2 + c, l + 31) * 0.4,
        f = Be(Va, r + 100, l + 3),
        d =
          0.78 +
          0.34 * (ze(0.3, 0.85, h) * 0.36 + (f - 0.5) * 0.24) +
          (Be(qo, i, n) - 0.5) * 0.06,
        m = a << 2;
      ((e[m] = 255 * Math.min(1, d)),
        (e[m + 1] = 255 * Math.min(1, d * 1.01)),
        (e[m + 2] = 255 * Math.min(1, d * 1.02)),
        (e[m + 3] = 255),
        (s[a] = h * 2.2 + f * 1.5 + (Be(qo, i * 2, n * 2) - 0.5) * 0.25));
    }
  return Wa({
    W: 512,
    H: 512,
    alb: e,
    hgt: s,
    tile: 0.6,
  });
}
function wj() {
  let e = Dn(65536),
    s = new Float32Array(65536);
  for (let n = 0; n < 256; n++)
    for (let i = 0; i < 256; i++) {
      let a = n * 256 + i,
        r = Be(En, i + 77, n) * 0.6 + Be(qo, i, n + 77) * 0.4,
        l = Be(T9, i * 2, n * 2),
        c = Rn(i, n, 131),
        h = Rn(i >> 1, n >> 1, 132) > 0.985 ? 1 : 0,
        f = ze(0.8, 0.9, Be(qo, i * 2 + 9, n + 3));
      s[a] = r * 5 + ze(0, 0.3, l) * 2 + c * 0.8 + h * 1.5;
      let u =
          (0.62 + 0.55 * r) * (0.75 + 0.25 * ze(0, 0.25, l)) + (c - 0.5) * 0.12,
        d = a << 2;
      ((e[d] = 255 * Math.min(1, u * (1 + 0.5 * f) + h * 0.8)),
        (e[d + 1] = 255 * Math.min(1, u * (1 + 0.25 * f) + h * 0.8)),
        (e[d + 2] = 255 * Math.min(1, u + h * 0.75)),
        (e[d + 3] = 255));
    }
  return Wa({
    W: 256,
    H: 256,
    alb: e,
    hgt: s,
    tile: 0.5,
    gain: 0.6,
  });
}
function Ej() {
  let e = Dn(65536),
    s = new Float32Array(65536);
  for (let n = 0; n < 256; n++)
    for (let i = 0; i < 256; i++) {
      let a = n * 256 + i,
        r = Rn(i, n, 141),
        l = Be(qo, i * 2, n * 2),
        c = Be(En, i * 2 + 9, n * 2 + 40),
        h = a << 2;
      ((s[a] = r * 0.02 + l * 0.03 + c * 0.05),
        (e[h] = 255),
        (e[h + 1] = 255 * (0.82 + 0.18 * (0.5 * r + 0.5 * l))),
        (e[h + 2] = 255),
        (e[h + 3] = 0));
    }
  return Wa({
    W: 256,
    H: 256,
    hgt: s,
    orm: e,
    tile: 0.12,
  });
}
function Tj() {
  let s = Dn(65536),
    n = Dn(65536),
    i = new Float32Array(65536);
  for (let r = 0; r < 256; r++)
    for (let l = 0; l < 256; l++) {
      let c = l >> 2,
        h = r >> 2,
        f = ((l & 3) + 0.5) / 4,
        u = ((r & 3) + 0.5) / 4,
        d = r * 256 + l,
        m = Math.sin(Math.PI * f),
        p = Math.sin(Math.PI * u),
        x = 0.82 + 0.3 * Rn(c, 1, 151) * Be(yn, c * 7, r),
        g = 0.82 + 0.3 * Rn(2, h, 152) * Be(yn, l, h * 7),
        b = Math.min(1, Math.max(m * x, p * g)),
        v =
          ze(0.86, 0.97, Rn(c, 5, 153)) * ze(0.45, 0.75, Be(En, c * 3, r)) +
          ze(0.88, 0.98, Rn(6, h, 154)) * ze(0.45, 0.75, Be(En, l, h * 3)),
        y = Be(yn, l, r) - 0.5;
      i[d] =
        ((c + h) & 1 ? p * (0.5 + 0.5 * m) * g : m * (0.5 + 0.5 * p) * x) *
        0.18;
      let M = Math.min(
          1,
          (1 - 0.26 * b) * (1 - 0.1 * Math.min(1, v)) * (1 + y * 0.06),
        ),
        w = 0.72 + 0.28 * b,
        T = d << 2;
      ((n[T] = 255 * M),
        (n[T + 1] = 255 * M * (0.9 + 0.1 * (1 - b))),
        (n[T + 2] = 255 * M * (0.8 + 0.2 * (1 - b))),
        (n[T + 3] = 255),
        (s[T] = 255 * w),
        (s[T + 1] = 255 * w),
        (s[T + 2] = 255 * w),
        (s[T + 3] = 255));
    }
  let a = Wa({
    W: 256,
    H: 256,
    alb: s,
    hgt: i,
    tile: 0.06,
  });
  return ((a.emissiveMap = Dd(n, 256, 256, !0, a.tile)), a);
}
var JM = (o) => (
  (o -= Math.floor(o)),
  (o = o < 0.5 ? o * 2 : 2 - o * 2),
  o * o * (3 - 2 * o)
);
var tw = [
  [0, 122, 40, 6],
  [0.38, 196, 88, 15],
  [0.72, 236, 142, 42],
  [1, 255, 196, 104],
];
function Sj() {
  let e = Dn(1048576),
    s = Dn(1048576),
    n = new Float32Array(1048576);
  for (let i = 0; i < 1024; i++) {
    let a = i / 1024,
      r = i * 0.25,
      l = Oe(0, Ga, r),
      c = Oe(1, Va, r + 90),
      h = Oe(2, yn, r),
      f = Oe(3, En, r * 2 + 9),
      u = Oe(4, Va, r + 20),
      d = Oe(5, En, r),
      m = Oe(6, Va, r * 2 + 33),
      p = Oe(7, En, r + 20),
      x = Oe(8, E9, i * 2 + 3),
      g = Oe(9, qo, i);
    for (let b = 0; b < 1024; b++) {
      let v = b / 1024,
        y = b * 0.25,
        M = i * 1024 + b,
        w = Ne(l, y),
        T = Ne(c, y + 50),
        S = Ne(h, y),
        E = Ne(f, y * 2 + 21),
        _ = 2 * v + a + (w - 0.5) * 1.15 + (T - 0.5) * 0.45 + (E - 0.5) * 0.03,
        R = JM(_),
        C = JM(_ * 4 + S * 0.56),
        L = JM(_ * 13 + T * 1.43),
        A = JM(_ * 47 + E * 0.8),
        O = 0.48 * R + 0.2 * C + 0.07 * L + 0.035 * A + 0.215 * S;
      O = ze(0.08, 0.95, O);
      let H = 0;
      for (; H < tw.length - 2 && O > tw[H + 1][0];) H++;
      let F = tw[H],
        P = tw[H + 1],
        z = (O - F[0]) / (P[0] - F[0]),
        k = xe(F[1], P[1], z),
        I = xe(F[2], P[2], z),
        G = xe(F[3], P[3], z),
        K =
          ze(0.55, 0.9, Ne(u, y + 170)) * (0.4 + 0.6 * Ne(d, y + w * 60)) * 0.6;
      ((k = xe(k, 255, K * 0.75)),
        (I = xe(I, 214, K * 0.75)),
        (G = xe(G, 150, K * 0.75)));
      let $ =
        (1 -
          ze(
            0.003,
            0.012,
            Math.abs(Be(yn, y * 2 + w * 50, r * 2 + T * 50) - 0.5),
          )) *
        ze(0.5, 0.8, T) *
        0.55;
      ((k = xe(k, 255, $)), (I = xe(I, 234, $)), (G = xe(G, 194, $)));
      let n0 =
        (1 -
          ze(
            0.002,
            0.012,
            Math.abs(Be(Va, y * 2 + S * 40 + 9, r * 2 + w * 40 + 70) - 0.47),
          )) *
        ze(0.45, 0.75, S) *
        0.6;
      ((k = xe(k, 150, n0)), (I = xe(I, 44, n0)), (G = xe(G, 12, n0)));
      let e0 = ze(0.5, 0.8, Ne(m, y * 2 + 240)),
        p0 =
          3 * v - 2 * a + (T - 0.5) * 1.3 + (S - 0.5) * 0.6 + (E - 0.5) * 0.1,
        t0 =
          (1 - ze(0.001, 0.006, Math.abs(p0 - Math.floor(p0) - 0.5))) *
          e0 *
          0.5;
      ((k = xe(k, 255, t0)), (I = xe(I, 224, t0)), (G = xe(G, 170, t0)));
      let M0 = ze(0.76, 0.94, Ne(p, y + 140)) * ze(0.4, 0.7, w) * 0.4;
      ((k *= 1 - M0 * 0.6), (I *= 1 - M0 * 0.8), (G *= 1 - M0));
      let f0 = 1 + (Ne(x, b * 2 + 5) - 0.5) * 0.09 + (Ne(g, b) - 0.5) * 0.05,
        _0 = M << 2;
      ((e[_0] = k * f0),
        (e[_0 + 1] = I * f0),
        (e[_0 + 2] = G * f0),
        (e[_0 + 3] = 255),
        (n[M] =
          (w - 0.5) * 3 +
          (S - 0.5) * 1 -
          n0 * 0.06 -
          t0 * 0.04 +
          (A - 0.5) * 0.012),
        (s[_0] = 255),
        (s[_0 + 1] = 255 * (0.1 + 0.07 * E + n0 * 0.1 + M0 * 0.2)),
        (s[_0 + 2] = 255 * S9(1 - M0 * 1.6 - n0 * 0.7 + K * 0.2)),
        (s[_0 + 3] = 0));
    }
  }
  return Wa({
    W: 1024,
    H: 1024,
    alb: e,
    hgt: n,
    orm: s,
    tile: 2,
  });
}
function R9(o, { srgb: t = !0 } = {}) {
  let e = new CanvasTexture(o);
  return (
    t && (e.colorSpace = SRGBColorSpace),
    (e.anisotropy = _9),
    (e.generateMipmaps = !0),
    (e.minFilter = LinearMipmapLinearFilter),
    e
  );
}
function _j(o, t, e = 0.4) {
  let s = o.width,
    n = o.height,
    i = o
      .getContext("2d", {
        willReadFrequently: !0,
      })
      .getImageData(0, 0, s, n).data,
    a = new Float32Array(s * n),
    r = 256 / s;
  for (let u = 0, d = 0, m = 0; u < n; u++)
    for (let p = 0; p < s; p++, d++, m += 4) {
      let x = i[m],
        g = i[m + 1],
        b = i[m + 2],
        v = x > g ? (x > b ? x : b) : g > b ? g : b,
        y = x < g ? (x < b ? x : b) : g < b ? g : b,
        M = (x * 0.3 + g * 0.59 + b * 0.11) * 0.0063 + (v - y) * 0.0055,
        w = (Be(qo, p * r * 4 + M * 25, u * r * 1.5) - 0.5) * (0.5 + M);
      a[d] =
        M +
        w * 0.9 +
        (((p >> 1) + (u >> 1)) & 1) * e * (1.3 - Math.min(1, M * 0.6)) +
        Rn(p, u, 151) * 0.1;
    }
  let l = Dn(s * n),
    c = Dn(s * n),
    h = t * 0.5;
  for (let u = 0; u < n; u++) {
    let d = Math.max(0, u - 1) * s,
      m = Math.min(n - 1, u + 1) * s,
      p = (n - 1 - u) * s;
    for (let x = 0; x < s; x++) {
      let g = Math.max(0, x - 1),
        b = Math.min(s - 1, x + 1),
        v = u * s + x,
        y = -(a[u * s + b] - a[u * s + g]) * h,
        M = (a[m + x] - a[d + x]) * h,
        w = 1 / Math.sqrt(y * y + M * M + 1),
        T = (p + x) << 2;
      ((l[T] = (y * w * 0.5 + 0.5) * 255),
        (l[T + 1] = (M * w * 0.5 + 0.5) * 255),
        (l[T + 2] = (w * 0.5 + 0.5) * 255),
        (l[T + 3] = 255),
        (c[T] = 255),
        (c[T + 1] = 255 * (0.8 - 0.4 * S9(a[v] * 0.3))),
        (c[T + 2] = 255),
        (c[T + 3] = 255));
    }
  }
  let f = (u) => {
    let d = Dd(u, s, n, !1, [1, 1]);
    return ((d.wrapS = d.wrapT = ClampToEdgeWrapping), d);
  };
  return {
    normalMap: f(l),
    roughnessMap: f(c),
  };
}
var ac = {
  cream: "#e9dfc8",
  bone: "#d8ccb0",
  teal: "#1f5f66",
  deepTeal: "#123a40",
  rust: "#a8502a",
  ember: "#c96b2c",
  gold: "#c39a4a",
  charcoal: "#26272a",
  ink: "#1c1e22",
  sand: "#cdb48a",
};
function ew(o, t, e, s, n) {
  let i = o.getImageData(0, 0, t, e),
    a = i.data,
    r = 512 / t;
  for (let l = 0, c = 0; l < t * e; l++, c += 4) {
    let h = (l % t) * r,
      f = ((l / t) | 0) * r,
      u =
        1 +
        (Rn(l % t, (l / t) | 0, s) - 0.5) * n +
        (Be(En, h * 0.7, f * 0.7) - 0.5) * n * 1.4 +
        (Be(Ga, h * 0.33, f * 0.33) - 0.5) * n;
    ((a[c] *= u), (a[c + 1] *= u), (a[c + 2] *= u));
  }
  o.putImageData(i, 0, 0);
}
function lu(o, t, e, s, n, i, a, r, l, c, h = 0.9, f = 24, u = 0.9) {
  let d = Math.max(5, Math.floor(l * u));
  o.lineCap = "round";
  for (let m = 0; m < d; m++) {
    let p = (m / (d - 1) - 0.5) * l,
      x = t(),
      g = -(r - s),
      b = a - e,
      v = Math.hypot(g, b) || 1,
      y = (g / v) * p,
      M = (b / v) * p;
    ((o.strokeStyle = c),
      (o.globalAlpha = h * (0.35 + 0.65 * t())),
      (o.lineWidth = 0.8 + t() * 2.2));
    let w = t() * 0.08,
      T = 1 - x * x * 0.45;
    o.beginPath();
    for (let S = 0; S <= f; S++) {
      let E = w + (T - w) * (S / f),
        _ = 1 - E,
        R = _ * _ * e + 2 * _ * E * n + E * E * a + y + (t() - 0.5) * 1.2,
        C = _ * _ * s + 2 * _ * E * i + E * E * r + M + (t() - 0.5) * 1.2;
      S === 0 ? o.moveTo(R, C) : o.lineTo(R, C);
    }
    o.stroke();
  }
  o.globalAlpha = 1;
}
function vg(o, t, e, s, n, i, a, r = 3) {
  (o.save(), (o.shadowColor = i), (o.shadowBlur = a), (o.fillStyle = i));
  for (let l = 0; l < r; l++) o.fillRect(t, e, s, n);
  o.restore();
}
function Ld(o, t, e, s, n, i, a, r, l, c, h) {
  for (let f = 0; f < r; f++) {
    let u = e + t() * n,
      d = s + t() * i,
      m = (t() - 0.5) * 1.2 + (t() < 0.2 ? 1.57 : 0),
      p = l * (0.4 + t());
    lu(
      o,
      t,
      u,
      d,
      u + Math.cos(m) * p * 0.5 + (t() - 0.5) * 8,
      d + Math.sin(m) * p * 0.5 + (t() - 0.5) * 8,
      u + Math.cos(m) * p,
      d + Math.sin(m) * p,
      c * (0.5 + t()),
      a[(t() * a.length) | 0],
      h * 1.5,
      5,
      0.3,
    );
  }
}
function sw(o) {
  let e = createCanvas(640),
    s = e.getContext("2d", {
      willReadFrequently: !0,
    }),
    n = oh(900 + o * 77);
  if (o === 0) {
    ((s.fillStyle = ac.cream),
      s.fillRect(0, 0, 640, 640),
      Ld(
        s,
        n,
        0,
        0,
        640,
        640,
        ["#efe6d2", "#e2d6bb", "#dccfb2"],
        60,
        90,
        30,
        0.16,
      ),
      (s.fillStyle = ac.deepTeal),
      s.beginPath(),
      s.arc(640 * 0.36, 640 * 0.6, 640 * 0.3, Math.PI, Wo),
      s.fill(),
      (s.fillStyle = ac.rust),
      s.beginPath(),
      s.arc(640 * 0.36, 640 * 0.6, 640 * 0.3, 0, Math.PI),
      s.fill(),
      (s.fillStyle = ac.gold),
      s.beginPath(),
      s.arc(640 * 0.68, 640 * 0.3, 640 * 0.13, 0, Wo),
      s.fill(),
      (s.fillStyle = ac.charcoal),
      s.fillRect(640 * 0.6, 640 * 0.5, 640 * 0.08, 640 * 0.38),
      (s.fillStyle = ac.teal),
      s.fillRect(640 * 0.72, 640 * 0.62, 640 * 0.16, 640 * 0.26),
      (s.fillStyle = ac.sand),
      s.beginPath(),
      s.arc(640 * 0.36, 640 * 0.6, 640 * 0.13, 0, Wo),
      s.fill(),
      s.save(),
      s.beginPath(),
      s.arc(640 * 0.36, 640 * 0.6, 640 * 0.3, Math.PI, Wo),
      s.clip(),
      Ld(
        s,
        n,
        640 * 0.06,
        640 * 0.3,
        640 * 0.6,
        640 * 0.3,
        ["#1a4f57", "#0e3036", "#22606a"],
        30,
        110,
        26,
        0.3,
      ),
      s.restore(),
      s.save(),
      s.beginPath(),
      s.arc(640 * 0.36, 640 * 0.6, 640 * 0.3, 0, Math.PI),
      s.clip(),
      Ld(
        s,
        n,
        640 * 0.06,
        640 * 0.6,
        640 * 0.6,
        640 * 0.3,
        ["#b85a2e", "#974424", "#c56a36"],
        30,
        110,
        26,
        0.3,
      ),
      s.restore(),
      s.save(),
      s.beginPath(),
      s.arc(640 * 0.68, 640 * 0.3, 640 * 0.13, 0, Wo),
      s.clip(),
      Ld(
        s,
        n,
        640 * 0.55,
        640 * 0.17,
        640 * 0.26,
        640 * 0.26,
        ["#d2aa58", "#b48a3c", "#e0bd72"],
        16,
        60,
        16,
        0.35,
      ),
      s.restore(),
      (s.strokeStyle = ac.ink),
      (s.lineWidth = 3.5),
      s.beginPath(),
      s.moveTo(640 * 0.08, 640 * 0.6),
      s.lineTo(640 * 0.94, 640 * 0.6),
      s.stroke(),
      s.beginPath(),
      s.arc(640 * 0.68, 640 * 0.3, 640 * 0.2, Math.PI * 0.9, Math.PI * 1.9),
      s.stroke(),
      (s.lineWidth = 2.4));
    for (let i = 0; i < 5; i++)
      (s.beginPath(),
        s.moveTo(640 * 0.1, 640 * (0.14 + i * 0.03)),
        s.lineTo(640 * 0.36, 640 * (0.14 + i * 0.03)),
        s.stroke());
    ew(s, 640, 640, 201, 0.1);
  } else if (o === 1) {
    ((s.fillStyle = "#242224"),
      s.fillRect(0, 0, 640, 640),
      Ld(
        s,
        n,
        0,
        0,
        640,
        640,
        ["#2c292a", "#1e1c1e", "#33302f"],
        40,
        120,
        34,
        0.25,
      ),
      vg(s, 640 * 0.13, 640 * 0.1, 640 * 0.74, 640 * 0.4, "#b4532a", 56, 4),
      vg(s, 640 * 0.16, 640 * 0.13, 640 * 0.68, 640 * 0.3, "#cf6e2e", 72, 2),
      vg(s, 640 * 0.13, 640 * 0.58, 640 * 0.74, 640 * 0.3, "#174a52", 56, 4),
      vg(s, 640 * 0.18, 640 * 0.62, 640 * 0.64, 640 * 0.2, "#1f6068", 72, 2),
      vg(s, 640 * 0.13, 640 * 0.525, 640 * 0.74, 640 * 0.012, "#c8a257", 16, 2),
      Ld(
        s,
        n,
        640 * 0.12,
        640 * 0.1,
        640 * 0.76,
        640 * 0.4,
        ["#d67a36", "#a94a24", "#e08a44", "#8f3c1e"],
        50,
        150,
        30,
        0.12,
      ),
      Ld(
        s,
        n,
        640 * 0.12,
        640 * 0.58,
        640 * 0.76,
        640 * 0.3,
        ["#256e76", "#123e45", "#2d7c82"],
        40,
        150,
        30,
        0.12,
      ));
    for (let i = 0; i < 40; i++)
      lu(
        s,
        n,
        640 * 0.12,
        640 * (0.1 + n() * 0.8),
        640 * 0.5,
        640 * (0.1 + n() * 0.8),
        640 * 0.88,
        640 * (0.1 + n() * 0.8),
        10,
        i % 3 ? "#000000" : "#e8c9a0",
        0.05,
        12,
      );
    ew(s, 640, 640, 202, 0.16);
  } else if (o === 2) {
    ((s.fillStyle = ac.bone),
      s.fillRect(0, 0, 640, 640),
      Ld(
        s,
        n,
        0,
        0,
        640,
        640,
        ["#e0d5ba", "#cfc2a4", "#d4c8ac"],
        50,
        100,
        32,
        0.2,
      ),
      vg(s, 640 * 0.1, 640 * 0.55, 640 * 0.5, 640 * 0.3, "#cdbf9f", 96, 2),
      lu(
        s,
        n,
        640 * 0.08,
        640 * 0.72,
        640 * 0.4,
        640 * 0.1,
        640 * 0.9,
        640 * 0.36,
        144,
        ac.ink,
        0.9,
      ),
      lu(
        s,
        n,
        640 * 0.2,
        640 * 0.9,
        640 * 0.7,
        640 * 0.75,
        640 * 0.86,
        640 * 0.5,
        84,
        ac.teal,
        0.85,
      ),
      lu(
        s,
        n,
        640 * 0.14,
        640 * 0.3,
        640 * 0.5,
        640 * 0.55,
        640 * 0.92,
        640 * 0.2,
        52,
        ac.gold,
        0.9,
      ),
      lu(
        s,
        n,
        640 * 0.55,
        640 * 0.92,
        640 * 0.62,
        640 * 0.6,
        640 * 0.5,
        640 * 0.4,
        32,
        ac.rust,
        0.9,
      ),
      lu(
        s,
        n,
        640 * 0.1,
        640 * 0.16,
        640 * 0.3,
        640 * 0.1,
        640 * 0.46,
        640 * 0.2,
        18,
        "#f1e8d2",
        0.8,
      ));
    for (let i = 0; i < 56; i++) {
      let a = n() * Wo,
        r = Math.pow(n(), 2) * 640 * 0.33;
      ((s.fillStyle = i % 4 ? ac.ink : ac.gold),
        (s.globalAlpha = 0.85),
        s.beginPath(),
        s.arc(
          640 * 0.56 + Math.cos(a) * r,
          640 * 0.4 + Math.sin(a) * r,
          1 + n() * n() * 11,
          0,
          Wo,
        ),
        s.fill());
    }
    ((s.globalAlpha = 1), ew(s, 640, 640, 203, 0.09));
  } else {
    let i = [
      "#16282d",
      "#1c3d44",
      "#22575c",
      "#6a4a38",
      "#a5552c",
      "#cf7b33",
      "#d9a257",
      "#e6cf9c",
      "#ece2c8",
    ];
    ((s.fillStyle = i[i.length - 1]), s.fillRect(0, 0, 640, 640));
    for (let a = i.length - 2; a >= 0; a--) {
      let r = 640 * (0.2 + (i.length - 2 - a) * 0.092),
        l = 640 * (0.012 + n() * 0.03),
        c = n() * Wo,
        h = 1 + n() * 2.2,
        f = (u) =>
          r +
          Math.sin((u / 640) * Wo * h + c) * l +
          Math.sin((u / 640) * Wo * h * 2.7 + c * 2) * l * 0.35;
      ((s.fillStyle = i[a]), s.beginPath(), s.moveTo(0, 640));
      for (let u = 0; u <= 640; u += 8) s.lineTo(u, f(u));
      (s.lineTo(640, 640), s.closePath(), s.fill());
      for (let u = 0; u < 12; u++) {
        let d = n() * 640,
          m = 40 + n() * 120,
          p = f(d) + 4 + n() * 22;
        lu(
          s,
          n,
          d,
          p,
          d + m * 0.5,
          p + (n() - 0.5) * 6,
          d + m,
          f(d + m) + 4 + n() * 22,
          8 + n() * 12,
          i[a + 1],
          0.3,
          6,
          0.4,
        );
      }
      if (a % 2 === 0) {
        ((s.strokeStyle = "#d7b46a"),
          (s.lineWidth = 1.9),
          (s.globalAlpha = 0.8),
          s.beginPath());
        for (let u = 0; u <= 640; u += 8) {
          let d = f(u) + 5;
          u === 0 ? s.moveTo(u, d) : s.lineTo(u, d);
        }
        (s.stroke(), (s.globalAlpha = 1));
      }
    }
    ((s.fillStyle = "#f0c36a"),
      s.beginPath(),
      s.arc(640 * 0.7, 640 * 0.2, 640 * 0.07, 0, Wo),
      s.fill());
    for (let a = 0; a < 30; a++)
      lu(
        s,
        n,
        0,
        640 * n(),
        640 * 0.5,
        640 * n(),
        640,
        640 * n(),
        14,
        a % 2 ? "#000000" : "#fff2d0",
        0.04,
        12,
      );
    ew(s, 640, 640, 204, 0.12);
  }
  return {
    map: R9(e),
    ..._j(e, o === 2 ? 2.4 : 1.7, o === 1 ? 0.55 : 0.4),
  };
}
function Rj() {
  let e = createCanvas(1280, 720),
    s = e.getContext("2d"),
    n = oh(1717),
    i = 1280 / 1024,
    a = s.createLinearGradient(0, 0, 0, 720);
  (a.addColorStop(0, "#0a1a2a"),
    a.addColorStop(0.42, "#23344a"),
    a.addColorStop(0.62, "#8a4a36"),
    a.addColorStop(0.72, "#e08a3c"),
    a.addColorStop(0.78, "#f6c070"),
    a.addColorStop(1, "#2a1a14"),
    (s.fillStyle = a),
    s.fillRect(0, 0, 1280, 720));
  let r = 1280 * 0.74,
    l = 720 * 0.7,
    c = s.createRadialGradient(r, l, 8, r, l, 420 * i);
  (c.addColorStop(0, "rgba(255,214,150,0.95)"),
    c.addColorStop(0.2, "rgba(255,160,80,0.5)"),
    c.addColorStop(1, "rgba(240,110,40,0)"),
    (s.fillStyle = c),
    s.fillRect(0, 0, 1280, 720),
    (s.fillStyle = "#fff0cc"),
    s.beginPath(),
    s.arc(r, l, 34 * i, 0, Wo),
    s.fill());
  for (let g = 0; g < 26; g++) {
    let b = 720 * (0.2 + n() * 0.45),
      v = n() * 1280,
      y = (120 + n() * 380) * i,
      M = s.createLinearGradient(v, 0, v + y, 0),
      w = b > 720 * 0.5 ? "255,170,110" : "150,150,190";
    (M.addColorStop(0, `rgba(${w},0)`),
      M.addColorStop(0.5, `rgba(${w},${0.1 + n() * 0.16})`),
      M.addColorStop(1, `rgba(${w},0)`),
      (s.fillStyle = M),
      s.fillRect(v, b, y, (2 + n() * 7) * i));
  }
  for (let g = 0; g < 2; g++) {
    let b = -20;
    for (; b < 1280;) {
      let v = (26 + n() * 60) * i,
        y = 720 * (g ? 0.1 + n() * 0.2 : 0.06 + n() * 0.13),
        M = 720 * 0.79 - y;
      if (
        ((s.fillStyle = g ? "#0c1118" : "#3a2c33"),
        s.fillRect(b, M, v, y + 720 * 0.03),
        g)
      )
        for (let w = M + 6; w < 720 * 0.78; w += 7 * i)
          for (let T = b + 4; T < b + v - 4; T += 6 * i)
            n() < 0.24 &&
              ((s.fillStyle =
                n() < 0.8 ? "rgba(255,196,120,0.85)" : "rgba(190,220,255,0.8)"),
              s.fillRect(T, w, 2.6 * i, 3.2 * i));
      b += v + n() * 8 * i;
    }
  }
  let h = s.createLinearGradient(0, 720 * 0.8, 0, 720);
  (h.addColorStop(0, "#c9783a"),
    h.addColorStop(0.25, "#3c4a5a"),
    h.addColorStop(1, "#0a1620"),
    (s.fillStyle = h),
    s.fillRect(0, 720 * 0.81, 1280, 720 * 0.19));
  for (let g = 0; g < 40; g++) {
    s.fillStyle = `rgba(255,200,130,${0.05 + n() * 0.2})`;
    let b = 720 * (0.82 + n() * 0.17);
    s.fillRect(
      r - (60 + n() * 240) * i * (b / 720 - 0.78) * 4,
      b,
      (40 + n() * 200) * i,
      1.6 * i,
    );
  }
  let f = s.createLinearGradient(0, 0, 1280 * 0.62, 0);
  (f.addColorStop(0, "rgba(6,14,22,0.82)"),
    f.addColorStop(0.7, "rgba(6,14,22,0.5)"),
    f.addColorStop(1, "rgba(6,14,22,0)"),
    (s.fillStyle = f),
    s.fillRect(0, 0, 1280 * 0.62, 720));
  let u = 'Bahnschrift, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    d = (g) => Math.round(g * i);
  ((s.textBaseline = "alphabetic"),
    (s.strokeStyle = "#e9c98a"),
    (s.lineWidth = 2 * i),
    s.beginPath(),
    s.arc(d(88), d(84), d(22), Math.PI, Wo),
    s.stroke(),
    s.beginPath(),
    s.moveTo(d(56), d(84)),
    s.lineTo(d(120), d(84)),
    s.stroke());
  for (let g = 0; g < 5; g++) {
    let b = Math.PI + ((g + 1) / 6) * Math.PI;
    (s.beginPath(),
      s.moveTo(d(88) + Math.cos(b) * d(27), d(84) + Math.sin(b) * d(27)),
      s.lineTo(d(88) + Math.cos(b) * d(35), d(84) + Math.sin(b) * d(35)),
      s.stroke());
  }
  ((s.fillStyle = "#e9c98a"),
    (s.font = `500 ${d(20)}px ${u}`),
    s.fillText("W E L C O M E   T O", d(64), d(156)),
    (s.fillStyle = "#ffffff"),
    (s.font = `300 ${d(84)}px ${u}`),
    s.fillText("SOLSTICE", d(58), d(240)),
    (s.fillStyle = "#e9c98a"),
    (s.font = `400 ${d(24)}px ${u}`),
    s.fillText("H O T E L   &   S K Y   L O U N G E", d(64), d(280)),
    (s.fillStyle = "rgba(233,201,138,0.7)"),
    s.fillRect(d(64), d(304), d(300), Math.max(1, d(1.5))),
    (s.fillStyle = "rgba(255,255,255,0.9)"),
    (s.font = `400 ${d(23)}px ${u}`),
    s.fillText("Suite 4701  \xB7  Level 47", d(64), d(346)),
    (s.fillStyle = "rgba(255,255,255,0.62)"),
    (s.font = `400 ${d(18)}px ${u}`),
    s.fillText(
      "Sunset 19:58   \xB7   24\xB0 Clear   \xB7   Pool terrace open until 23:00",
      d(64),
      d(378),
    ));
  let m = ["ROOM SERVICE", "SPA", "CONCIERGE", "SKY BAR", "CHECK-OUT"],
    p = ["\u25D4", "\u274B", "\u260E", "\u266A", "\u2794"];
  for (let g = 0; g < m.length; g++) {
    let b = d(64 + g * 184),
      v = d(452),
      y = d(170),
      M = d(84);
    ((s.fillStyle = g === 3 ? "rgba(233,150,70,0.94)" : "rgba(14,26,36,0.62)"),
      s.fillRect(b, v, y, M),
      (s.strokeStyle =
        g === 3 ? "rgba(255,230,190,0.9)" : "rgba(255,255,255,0.26)"),
      (s.lineWidth = Math.max(1, 1.5 * i)),
      s.strokeRect(b + 0.5, v + 0.5, y - 1, M - 1),
      (s.fillStyle = g === 3 ? "#1a1008" : "#e9c98a"),
      (s.font = `400 ${d(22)}px "Segoe UI Symbol", ${u}`),
      s.fillText(p[g], b + d(14), v + d(34)),
      (s.fillStyle = g === 3 ? "#1a1008" : "#ffffff"),
      (s.font = `600 ${d(16)}px ${u}`),
      s.fillText(m[g], b + d(14), v + d(64)));
  }
  ((s.fillStyle = "rgba(255,255,255,0.5)"),
    (s.font = `400 ${d(14)}px ${u}`),
    s.fillText(
      "\u25C0 \u25B6  Navigate      OK  Select      \u2302  Home",
      d(64),
      d(566),
    ),
    (s.fillStyle = "rgba(255,255,255,0.86)"),
    (s.font = `300 ${d(46)}px ${u}`),
    (s.textAlign = "right"),
    s.fillText("19:42", 1280 - d(60), d(96)),
    (s.fillStyle = "rgba(255,255,255,0.6)"),
    (s.font = `400 ${d(16)}px ${u}`),
    s.fillText("FRI 14 JUNE", 1280 - d(62), d(122)),
    (s.textAlign = "left"));
  let x = s.createRadialGradient(
    1280 / 2,
    720 / 2,
    720 * 0.3,
    1280 / 2,
    720 / 2,
    1280 * 0.7,
  );
  return (
    x.addColorStop(0, "rgba(0,0,0,0)"),
    x.addColorStop(1, "rgba(0,0,0,0.28)"),
    (s.fillStyle = x),
    s.fillRect(0, 0, 1280, 720),
    R9(e)
  );
}
function iD(o = 8) {
  _9 = o;
  let t = {
      timings: {},
    },
    e = performance.now(),
    s = (n) => {
      let i = performance.now();
      ((t.timings[n] = Math.round(i - e)), (e = i));
    };
  return (
    (Ga = yb(11, 3, 2)),
    (yn = yb(23, 6, 3)),
    (En = yb(37, 16, 4)),
    (qo = yb(53, 48, 2)),
    (Va = yb(71, 5, 4)),
    ([E9, T9] = ZY(5, 16)),
    s("fields"),
    (t.flat = w9(128, 128, 255, 255, !1)),
    (t.white = w9(255, 255, 255, 255, !0)),
    (t.ormWhite = w9(255, 255, 255, 0, !1)),
    (t.macro = oj()),
    s("macro"),
    (t.detail = {
      polish: JY(),
      grit: tj(),
      fibre: ej(),
      brushed: sj(),
      smudge: nj(),
    }),
    s("detail"),
    (t.marble = ij()),
    s("marble"),
    (t.marbleDark = aj()),
    s("marbleDark"),
    (t.oak = eD(rj)),
    (t.walnut = eD(lj)),
    s("wood"),
    (t.carpetLobby = cj()),
    s("carpetLobby"),
    (t.carpetHall = hj()),
    s("carpetHall"),
    (t.travertine = fj()),
    s("travertine"),
    (t.poolGlass = uj()),
    (t.quarry = dj()),
    (t.glaze = pj()),
    s("tiles"),
    (t.plaster = mj()),
    s("plaster"),
    (t.concrete = gj()),
    s("concrete"),
    (t.ceilingFibre = xj()),
    (t.bronze = bj()),
    s("ceiling+bronze"),
    (t.leather = yj()),
    (t.weave = vj()),
    (t.velvet = Mj()),
    (t.soil = wj()),
    (t.speckle = Ej()),
    (t.shade = Tj()),
    s("small"),
    (t.onyx = Sj()),
    s("onyx"),
    (t.art = [sw(0), sw(1), sw(2), sw(3)]),
    s("art"),
    (t.screen = Rj()),
    s("screen"),
    t
  );
}
function aD(o, { w: t, h: e, color: s, bg: n, font: i }) {
  let r = Math.max(64, Math.round((1024 * e) / t)),
    l = createCanvas(1024, r),
    c = l.getContext("2d");
  n
    ? ((c.fillStyle = n), c.fillRect(0, 0, 1024, r))
    : ((c.globalAlpha = 2 / 255),
      (c.fillStyle = s),
      c.fillRect(0, 0, 1024, r),
      (c.globalAlpha = 1));
  let h = /(\d+(?:\.\d+)?)px/.exec(i),
    f = h ? parseFloat(h[1]) : 120,
    u = () => {
      c.font = h ? i.replace(h[0], f + "px") : i;
    };
  u();
  let d = Math.min(
    (1024 * 0.92) / Math.max(1, c.measureText(o).width),
    (r * 0.74) / f,
  );
  return (
    (f *= d),
    u(),
    (c.textAlign = "center"),
    (c.textBaseline = "middle"),
    (c.fillStyle = s),
    c.fillText(o, 1024 / 2, r / 2 + f * 0.04),
    R9(l)
  );
}
var A9 = {
  marbleFloor: "marble",
  marbleDark: "marble",
  oakFloor: "wood",
  carpetLobby: "carpet",
  carpetHall: "carpet",
  terraceStone: "stone",
  poolTile: "tile",
  kitchenFloor: "tile",
  kitchenTile: "tile",
  plaster: "plaster",
  plasterDark: "plaster",
  walnut: "wood",
  woodDark: "wood",
  woodLight: "wood",
  concrete: "concrete",
  ceiling: "plaster",
  ceilingTile: "plaster",
  exterior: "metal",
  brass: "metal",
  steel: "metal",
  chrome: "metal",
  blackMetal: "metal",
  leatherTan: "fabric",
  leatherBlack: "fabric",
  velvetTeal: "fabric",
  fabricCream: "fabric",
  fabricCharcoal: "fabric",
  bedLinen: "fabric",
  onyx: "stone",
  lampShade: "fabric",
  bulbWarm: "glass",
  bulbCool: "glass",
  ledStrip: "plastic",
  screenOn: "glass",
  screenOff: "glass",
  foliage: "foliage",
  soil: "foliage",
  terracotta: "ceramic",
  ceramicWhite: "ceramic",
  ceramicBlack: "ceramic",
  rubber: "plastic",
  plasticBlack: "plastic",
  plasticWhite: "plastic",
  paper: "fabric",
  bottleGreen: "glass",
  bottleAmber: "glass",
  bottleClear: "glass",
  art1: "fabric",
  art2: "fabric",
  art3: "fabric",
  art4: "fabric",
  brassAged: "metal",
  marbleHoned: "marble",
  oakPlank: "wood",
  travertineWall: "stone",
};
var Aj = `
varying vec2 vGhUv;
varying vec2 vGhW;
`;
var kj = `
	vGhUv = uv;
	{
		vec4 ghWp = vec4( transformed, 1.0 );
		vec3 ghWn = objectNormal;
		#ifdef USE_INSTANCING
			ghWp = instanceMatrix * ghWp; ghWn = mat3( instanceMatrix ) * ghWn;
		#endif
		vGhW = vec2( ( modelMatrix * ghWp ).y, normalize( mat3( modelMatrix ) * ghWn ).y );
	}
`;
var Cj = `
uniform sampler2D ghMacro;
#ifdef GH_DETAIL
	uniform sampler2D ghDetail;
#endif
uniform vec4 ghP, ghT, ghL, ghX, ghD, ghD2, ghJ, ghJc, ghC, ghW0, ghW1, ghW2, ghFl;
uniform vec3 ghWc;
varying vec2 vGhUv;
varying vec2 vGhW;
float ghHash( vec2 p ) { vec3 p3 = fract( vec3( p.xyx ) * 0.1031 ); p3 += dot( p3, p3.yzx + 33.33 ); return fract( ( p3.x + p3.y ) * p3.z ); }
`;
var Pj = `
	vec2 ghM = vGhUv, ghDxM = dFdx( vGhUv ), ghDyM = dFdy( vGhUv );
	vec2 ghUv = ghM * ghT.xy, ghDx = ghDxM * ghT.xy, ghDy = ghDyM * ghT.xy;
	mat2 ghR = mat2( 1.0, 0.0, 0.0, 1.0 );
	vec3 ghH = vec3( 0.5 );
	vec2 ghEn = vec2( 0.0 ), ghCc = vec2( 0.0 );
	float ghE = 1.0, ghLod = 1.0, ghJt = 0.0, ghBv = 0.0, ghAO = 1.0;
	if ( ghL.x > 0.5 ) {
		// ghL.x: 1 grid \xB7 2 boards along V \xB7 3 herringbone \xB7 4 strips along U
		vec2 gId, gL0, gAx = vec2( 1.0, 0.0 ), gAy = vec2( 0.0, 1.0 );
		float gCs = ghT.z;
		bool gHerr = ghL.x > 2.5 && ghL.x < 3.5;
		if ( ghL.x < 1.5 ) {
			// rectangular tiles, optional rounded corners (ghL.z = radius)
			vec2 gt = ghM / ghT.zw, gf = fract( gt );
			gId = floor( gt );
			vec2 ed = min( gf, 1.0 - gf ) * ghT.zw, sg = vec2( gf.x < 0.5 ? -1.0 : 1.0, gf.y < 0.5 ? -1.0 : 1.0 ), rk = max( ghL.z - ed, 0.0 );
			bool crn = rk.x > 0.0 && rk.y > 0.0;
			ghE = crn ? ghL.z - length( rk ) : min( ed.x, ed.y );
			ghEn = ( crn ? normalize( rk ) : ( ed.x < ed.y ? vec2( 1.0, 0.0 ) : vec2( 0.0, 1.0 ) ) ) * sg;
			ghCc = gf * 2.0 - 1.0;
			gL0 = ( gf - 0.5 ) * ghT.zw;
			gCs = min( ghT.z, ghT.w );
		} else if ( gHerr ) {
			// 45\xB0 herringbone: planks ghT.z wide, ghL.w widths long; texture U follows each plank
			vec2 hp = ghM / ghT.z;
			float hX = ( hp.x + hp.y ) * 0.70710678, hY = ( hp.x - hp.y ) * 0.70710678, hn = ghL.w;
			float hrow = floor( hY ), hxs = hX - hrow, hm = mod( floor( hxs ), 2.0 * hn ), ha, hc;
			if ( hm < hn ) {
				float hb = floor( hxs / ( 2.0 * hn ) ) * 2.0 * hn;
				ha = hxs - hb; hc = hY - hrow; gId = vec2( hb + hrow, hrow );
				gAx = vec2( 0.70710678, 0.70710678 ); gAy = vec2( 0.70710678, -0.70710678 );
			} else {
				float hcx = floor( hX ), hj = 2.0 * hn - 1.0 - hm;
				ha = hj + ( hY - hrow ); hc = hX - hcx; gId = vec2( hcx + 0.5, hrow - hj );
				gAx = vec2( 0.70710678, -0.70710678 ); gAy = vec2( 0.70710678, 0.70710678 );
			}
			vec2 ed = vec2( min( ha, hn - ha ), min( hc, 1.0 - hc ) ) * ghT.z;
			ghE = min( ed.x, ed.y );
			ghEn = ed.x < ed.y ? gAx * ( ha < hn * 0.5 ? -1.0 : 1.0 ) : gAy * ( hc < 0.5 ? -1.0 : 1.0 );
			gL0 = vec2( ha - hn * 0.5, hc - 0.5 ) * ghT.z;
		} else {
			// boards: running along V (wall panelling) or along U (furniture staves); texture U follows the board
			bool gU = ghL.x > 3.5;
			float gt = ( gU ? ghM.y : ghM.x ) / ghT.z, gi = floor( gt ), gf = gt - gi;
			vec2 gAc = gU ? vec2( 0.0, 1.0 ) : vec2( 1.0, 0.0 );
			gId = vec2( gi, 7.0 );
			ghE = min( gf, 1.0 - gf ) * ghT.z;
			ghEn = gAc * ( gf < 0.5 ? -1.0 : 1.0 );
			ghCc = gAc * ( gf * 2.0 - 1.0 );
			gAx = gU ? vec2( 1.0, 0.0 ) : vec2( 0.0, 1.0 ); gAy = gAc;
			gL0 = vec2( gU ? ghM.x : ghM.y, ( gf - 0.5 ) * ghT.z );
		}
		// every cell crops its own window of the slab: random offset, mirror / half turn, optional quarter turn
		ghH = vec3( ghHash( gId + 17.0 ), ghHash( gId.yx + vec2( 59.0, 3.0 ) ), ghHash( gId * 1.31 + 113.5 ) );
		float gSx = ghH.z > 0.5 ? -1.0 : 1.0;
		float gSy = ghL.x < 1.5 ? ( fract( ghH.z * 2.0 ) > 0.5 ? -1.0 : 1.0 ) : ( gHerr ? gSx : 1.0 );
		gL0 *= vec2( gSx, gSy ); gAx *= gSx; gAy *= gSy;
		if ( fract( ghH.z * 4.0 ) < ghL.y ) { gL0 = gL0.yx; vec2 gsw = gAx; gAx = gAy; gAy = gsw; }
		ghUv = gL0 * ghT.xy + ghH.xy * vec2( 7.31, 5.77 );
		ghDx = vec2( dot( ghDxM, gAx ), dot( ghDxM, gAy ) ) * ghT.xy;
		ghDy = vec2( dot( ghDyM, gAx ), dot( ghDyM, gAy ) ) * ghT.xy;
		ghR = mat2( gAx, gAy );
		// per-cell variation fades once cells approach a pixel (geometric-mean footprint: survives grazing views)
		ghLod = clamp( 1.5 - 1.6 * sqrt( length( ghDxM ) * length( ghDyM ) ) / gCs, 0.0, 1.0 );
		// tiny cells (mosaic): as they shrink to a pixel each one samples a wider average of the slab (no sparkle)
		float gCb = 1.0 + ( 1.0 - ghLod ) * ghX.z;
		ghDx *= gCb; ghDy *= gCb;
		// analytic joint: grout line, bevelled arris, contact AO \u2014 all box-filtered by the pixel footprint
		float gAa = abs( dot( ghDxM, ghEn ) ) + abs( dot( ghDyM, ghEn ) ) + 1e-5, gBw = max( ghJ.y, 1e-6 );
		ghJt = clamp( ( ghJ.x - ghE ) / gAa + 0.5, 0.0, 1.0 ) * min( 1.0, 2.0 * ghJ.x / ( ghJ.x + 0.5 * gAa ) );
		ghBv = clamp( ( ghE - ghJ.x ) / gAa + 0.5, 0.0, 1.0 ) * clamp( ( ghJ.x + ghJ.y - ghE ) / gAa + 0.5, 0.0, 1.0 )
			* min( 1.0, ghJ.y / gAa ) * ( 1.0 - 0.6 * clamp( ( ghE - ghJ.x ) / gBw, 0.0, 1.0 ) );
		float gAw = ghJ.x + 2.5 * ghJ.y + 1e-6;
		ghAO *= 1.0 - ghJ.w * ( 1.0 - smoothstep( 0.0, gAw + gAa, ghE ) ) * min( 1.0, gAw / ( 0.5 * gAw + gAa ) );
	}
	vec4 ghMc = texture2D( ghMacro, ghM * ghP.z );
	if ( ghX.x > 0.0 ) {
		vec2 gWs = vec2( ghP.z * 1.7 );
		ghUv += ( textureGrad( ghMacro, ghM * gWs + 0.31, ghDxM * gWs, ghDyM * gWs ).rg - 0.5 ) * ghX.x;
	}
	float ghPa = 0.0, ghRim = 0.0, ghSt = 0.0, ghBd = 0.0;
	#ifdef GH_WEAR
		vec4 ghWr = texture2D( ghMacro, ghM * ghP.w + vec2( 0.37, 0.61 ) );
		ghPa = smoothstep( ghW0.x, ghW0.y, ghWr.b + ( ghMc.g - 0.5 ) * ghW0.z );
		ghSt = ghWr.a - 0.5;
		if ( ghFl.z + ghFl.w > 0.0 ) {
			// height above the floor it stands on: grime line at the skirting, hand polish at rail height
			float gHt = vGhW.x - ( vGhW.x > ghFl.y - 0.06 ? ghFl.y : ghFl.x );
			float gWall = 1.0 - smoothstep( 0.35, 0.75, abs( vGhW.y ) );
			float gSc = textureGrad( ghMacro, vec2( gHt * 2.3 + 0.11, ghM.x * 0.21 ), vec2( 0.0, length( ghDxM ) * 0.21 ), vec2( 0.0, length( ghDyM ) * 0.21 ) ).a;
			ghBd = ghFl.z * gWall * ( exp( - max( gHt, 0.0 ) * 13.0 ) * ( 0.3 + 1.4 * ghWr.b )
				+ 0.5 * smoothstep( 0.9, 0.97, gSc ) * smoothstep( 0.0, 0.03, gHt ) * ( 1.0 - smoothstep( 0.1, 0.3, gHt ) ) );
			ghPa *= 1.0 - ghFl.w * exp( - ( gHt - 1.0 ) * ( gHt - 1.0 ) * 14.0 );
		}
		ghRim = ghPa * ( 1.0 - ghPa ) * 4.0;
	#endif
	vec4 ghOrm = textureGrad( roughnessMap, ghUv, ghDx, ghDy );
	vec4 ghDt = vec4( 0.5 );
	#ifdef GH_DETAIL
		ghDt = texture2D( ghDetail, ghM * ghD.xy );
	#endif
	float ghDm = mix( 1.0, ghOrm.b, ghD2.y ) * ( 1.0 - ghJt );
	ghAO *= ghOrm.r;
`;
var zj = `
	vec4 sampledDiffuseColor = textureGrad( map, ghUv, ghDx, ghDy );
	if ( ghX.y > 0.0 ) {
		// second, rotated + rescaled sample max-blended in (bright veins on dark stone never line up)
		mat2 gDu = mat2( 0.57524, 0.44968, -0.44968, 0.57524 );
		sampledDiffuseColor.rgb = max( sampledDiffuseColor.rgb, textureGrad( map, gDu * ( ghM * ghT.xy ) + vec2( 0.37, 0.61 ), gDu * ( ghDxM * ghT.xy ), gDu * ( ghDyM * ghT.xy ) ).rgb * ghX.y );
	}
	diffuseColor *= sampledDiffuseColor;
	diffuseColor.rgb *= ( 1.0 + ( ghH.x - 0.5 ) * ghC.x * ghLod ) * ( 1.0 + ( ghMc.r - 0.5 ) * 2.0 * ghP.x ) * ( 1.0 + ( ghDt.a - 0.5 ) * ghD2.x * ghDm );
#ifdef GH_WEAR
	diffuseColor.rgb *= mix( vec3( 1.0 ), ghWc, ghPa ) * ( 1.0 + ghW1.y * ghRim + ghW2.x * ghSt ) * ( 1.0 - ghW1.x * ghBd );
	diffuseColor.rgb *= 1.0 - ghOrm.a * ghW0.w * smoothstep( 0.84, 0.92, ghMc.b );
#endif
	diffuseColor.rgb *= 1.0 + ghD2.w * ghBv;
	diffuseColor.rgb = mix( diffuseColor.rgb, ghJc.rgb * ( 0.7 + 0.6 * ghDt.a ) * ( 1.0 - 0.3 * ghPa ), ghJt );
`;
var Lj = `
float roughnessFactor = roughness * ghOrm.g;
roughnessFactor *= ( 1.0 + ( ghH.y - 0.5 ) * ghC.w * ghLod ) * ( 1.0 + ( ghMc.g - 0.5 ) * 2.0 * ghP.y );
roughnessFactor += ghW1.z * ghPa + ghW1.w * ghRim + ghW2.y * ghSt + ghW2.z * ghBd;
roughnessFactor += ( ghDt.b - 0.5 ) * ghD.w * ghDm * ( 1.0 + ghD2.z * ghPa ) - 0.5 * ghD2.w * ghBv;
roughnessFactor = clamp( mix( roughnessFactor, ghJc.a, ghJt ), 0.04, 1.0 );
`;
var Dj = ShaderChunk.normal_fragment_begin.replace("vNormalMapUv", "vGhUv");
var Ij = `
	vec3 mapN = textureGrad( normalMap, ghUv, ghDx, ghDy ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	mapN.xy = ghR * mapN.xy + ( ghDt.rg - 0.5 ) * 2.0 * ghD.z * ghDm;
	mapN.xy += ( ( ghH.xy - 0.5 ) * ghC.y + ghCc * ghCc * ghCc * ghC.z ) * ghLod;
	mapN.xy = mapN.xy * ( 1.0 - ghJt ) + ghEn * ( ghJ.z * ghBv );
	normal = normalize( tbn * mapN );
`;
var Hj = `
#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = textureGrad( emissiveMap, ghUv, ghDx, ghDy );
	#ifdef GH_DEPTH
	{
		// back-lit stone: a deeper layer of the same slab, seen through the surface, slides with the eye
		vec3 ghV = normalize( vViewPosition );
		vec2 ghPx = vec2( dot( ghV, tbn[ 0 ] ), dot( ghV, tbn[ 1 ] ) ) / max( dot( ghV, nonPerturbedNormal ), 0.3 );
		vec2 ghUd = ( ghUv - ghPx * ghT.xy * GH_DEPTH ) * 0.57 + vec2( 0.31, 0.67 );
		vec3 ghDeep = textureGrad( emissiveMap, ghUd, ghDx * 0.57, ghDy * 0.57 ).rgb;
		vec2 ghUe = ( ghUv - ghPx * ghT.xy * GH_DEPTH * 0.4 ) * 1.31 + vec2( 0.13, 0.41 );
		vec3 ghMid = textureGrad( emissiveMap, ghUe, ghDx * 1.31, ghDy * 1.31 ).rgb;
		emissiveColor.rgb = emissiveColor.rgb * ( 0.34 + 0.66 * ghOrm.b ) * ( 0.46 + 1.0 * ghDeep.g + 0.3 * ghMid.r ) + ghDeep * 0.05;
		emissiveColor.rgb *= 1.0 + ( ghMc.r - 0.5 ) * 0.5;
	}
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif
`;
var Fj = `
	reflectedLight.indirectDiffuse *= ghAO;
	reflectedLight.indirectSpecular *= ghAO;
	reflectedLight.directDiffuse *= 0.55 + 0.45 * ghAO;
	reflectedLight.directSpecular *= ghAO;
`;
var Oj = {
  grid: 1,
  boards: 2,
  herringbone: 3,
  strips: 4,
};
var rD = (o) => {
  let t = new Color(o);
  return [t.r, t.g, t.b];
};
function Nj(o, t, e = {}) {
  let s = e.tile ||
      (o.map && o.map.userData.tile) ||
      (o.roughnessMap && o.roughnessMap.userData.tile) ||
      (o.normalMap && o.normalMap.userData.tile) || [1, 1],
    n = (o.defines = o.defines || {}),
    i = e.layout ? (Array.isArray(e.cell) ? e.cell : [e.cell, e.cell]) : [1, 1],
    a = e.layout ? e.joint : null,
    r = e.cellVar || {},
    l = t.lite ? null : e.detail,
    c = t.lite ? null : e.wear;
  (t.lite || ((n.GH_DETAIL = ""), (n.GH_WEAR = "")),
    e.depth && (n.GH_DEPTH = Number(e.depth).toFixed(5)),
    o.map || (o.map = t.white),
    o.roughnessMap || (o.roughnessMap = t.ormWhite),
    o.normalMap || ((o.normalMap = t.flat), o.normalScale.set(1, 1)));
  let h = l ? (Array.isArray(l.tile) ? l.tile : [l.tile, l.tile]) : [1, 1],
    f = a ? rD(a.color ?? 2105376) : [0, 0, 0],
    u =
      c && c.tint !== void 0
        ? Array.isArray(c.tint)
          ? c.tint
          : rD(c.tint)
        : [1, 1, 1],
    d = (v, y, M, w) => ({
      value: new Vector4(v, y, M, w),
    }),
    m = {
      ghMacro: {
        value: t.macro,
      },
      ghDetail: {
        value: l ? l.map : t.anyDetail,
      },
      ghP: d(
        e.macro || 0,
        e.macroRough || 0,
        1 / (e.period || 13.7),
        c ? 1 / (c.period || 6.3) : 1,
      ),
      ghT: d(1 / s[0], 1 / s[1], i[0], i[1]),
      ghL: d(
        e.layout ? Oj[e.layout] : 0,
        (e.layout === "grid" && e.turn) || 0,
        e.round || 0,
        e.herr || 5,
      ),
      ghX: d(e.warp || 0, e.dual ? 0.9 : 0, e.chips ? 15 : 0, 0),
      ghD: l
        ? d(1 / h[0], 1 / h[1], l.normal ?? 0.3, l.rough ?? 0.1)
        : d(1, 1, 0, 0),
      ghD2: d(
        l ? (l.albedo ?? 0) : 0,
        l ? (l.mask ?? 0) : 0,
        l ? (l.boost ?? 0) : 0,
        (a && a.burnish) || 0,
      ),
      ghJ: a
        ? d(a.w ?? 0.001, a.bevel ?? 0.002, a.slope ?? 0.6, a.ao ?? 0.5)
        : d(0, 0, 0, 0),
      ghJc: d(f[0], f[1], f[2], a ? (a.rough ?? 0.85) : 1),
      ghC: d(r.tone || 0, r.tilt || 0, r.pillow || 0, r.rough || 0),
      ghW0: c
        ? d(c.lo ?? 0.55, c.hi ?? 0.7, c.breakup ?? 0.3, c.crack || 0)
        : d(2, 3, 0, 0),
      ghW1: c
        ? d(c.baseAlbedo ?? 0.45, c.rim || 0, c.rough || 0, c.rimRough || 0)
        : d(0, 0, 0, 0),
      ghW2: c
        ? d(c.streak || 0, c.streakRough || 0, c.baseRough ?? 0.25, 0)
        : d(0, 0, 0, 0),
      ghFl: d(
        t.floors[0],
        t.floors[1],
        (c && e.world !== !1 && c.base) || 0,
        (c && c.hand) || 0,
      ),
      ghWc: {
        value: new Vector3(u[0], u[1], u[2]),
      },
    };
  Object.defineProperty(o, "ghUniforms", {
    value: m,
    configurable: !0,
  });
  let p = (v) => {
      (Object.assign(v.uniforms, m),
        (v.vertexShader = v.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
` + Aj,
          )
          .replace(
            "#include <project_vertex>",
            `#include <project_vertex>
` + kj,
          )),
        (v.fragmentShader = v.fragmentShader
          .replace("void main() {", Cj + "void main() {" + Pj)
          .replace("#include <map_fragment>", zj)
          .replace("#include <roughnessmap_fragment>", Lj)
          .replace("#include <normal_fragment_begin>", Dj)
          .replace("#include <normal_fragment_maps>", Ij)
          .replace("#include <emissivemap_fragment>", Hj)
          .replace("#include <aomap_fragment>", Fj)));
    },
    x = o.onBeforeCompile,
    g = Object.prototype.hasOwnProperty.call(o, "onBeforeCompile");
  o.onBeforeCompile = g
    ? (v, y) => {
        (x(v, y), p(v));
      }
    : p;
  let b = Object.prototype.hasOwnProperty.call(o, "customProgramCacheKey")
    ? o.customProgramCacheKey
    : null;
  return (
    (o.customProgramCacheKey = () => (b ? b() : "") + "gh-surface2"),
    (o.clone = function () {
      let v = Object.getPrototypeOf(this).clone.call(this);
      return (
        (v.onBeforeCompile = this.onBeforeCompile),
        (v.customProgramCacheKey = this.customProgramCacheKey),
        Object.assign(v.defines, this.defines),
        (v.clone = this.clone),
        Object.defineProperty(v, "ghUniforms", {
          value: m,
          configurable: !0,
        }),
        v
      );
    }),
    o
  );
}
function createMaterials({
  anisotropy: o = 8,
  floors: t = [0, 3.8],
  detail: e = !0,
} = {}) {
  globalThis.GH_MAT_LITE && (e = !1);
  let s = performance.now(),
    n = iD(o),
    i = performance.now() - s,
    a = {
      macro: n.macro,
      flat: n.flat,
      white: n.white,
      ormWhite: n.ormWhite,
      anyDetail: n.detail.polish,
      floors: t,
      lite: !e,
    },
    r = (C, L) => Nj(C, a, L),
    l = n.detail,
    c = (C, L = C) => new Vector2(C, L),
    h = (C) => {
      for (let L of Object.keys(C)) C[L] === void 0 && delete C[L];
      return C;
    },
    f = (C) => new MeshStandardMaterial(h(C)),
    u = (C) => new MeshPhysicalMaterial(h(C)),
    d = (C, L = {}) => ({
      map: C.map,
      normalMap: C.normalMap,
      roughnessMap: C.roughnessMap,
      roughness: 1,
      metalness: 0,
      ...L,
    }),
    m = (C, L, A = L) => {
      let O = C.clone();
      return (
        O.repeat.set(1 / L, 1 / A),
        (O.userData = {
          tile: [L, A],
        }),
        (O.needsUpdate = !0),
        O
      );
    },
    p = {};
  ((p.marbleFloor = r(
    f(
      d(n.marble, {
        envMapIntensity: 1.2,
      }),
    ),
    {
      layout: "grid",
      cell: 1.2,
      joint: {
        w: 0.0011,
        bevel: 0.0026,
        slope: 0.85,
        ao: 0.55,
        color: 9077364,
        rough: 0.9,
      },
      cellVar: {
        tone: 0.05,
        tilt: 0.014,
        rough: 0.3,
      },
      macro: 0.03,
      macroRough: 0.3,
      detail: {
        map: l.polish,
        tile: 0.33,
        normal: 0.035,
        rough: 0.07,
        albedo: 0.12,
        boost: 2.2,
      },
      wear: {
        period: 7.9,
        lo: 0.3,
        hi: 0.85,
        breakup: 0.35,
        tint: [0.975, 0.97, 0.96],
        rough: 0.12,
        streakRough: 0.03,
      },
    },
  )),
    (p.marbleDark = r(
      f(
        d(n.marbleDark, {
          envMapIntensity: 1.2,
        }),
      ),
      {
        dual: !0,
        warp: 0.3,
        macroRough: 0.3,
        detail: {
          map: l.polish,
          tile: 0.29,
          normal: 0.03,
          rough: 0.07,
          albedo: 0.04,
          boost: 1.5,
        },
        wear: {
          period: 2.9,
          lo: 0.3,
          hi: 0.9,
          tint: [0.98, 0.98, 0.98],
          rough: 0.07,
          streakRough: 0.025,
          base: 0.5,
          baseAlbedo: 0.25,
          baseRough: 0.3,
        },
      },
    )),
    (p.oakFloor = r(
      f(
        d(n.oak, {
          color: 14201996,
        }),
      ),
      {
        layout: "herringbone",
        cell: 0.09,
        herr: 5,
        joint: {
          w: 35e-5,
          bevel: 0.0011,
          slope: 0.7,
          ao: 0.6,
          color: 1839884,
          rough: 0.9,
          burnish: 0.1,
        },
        cellVar: {
          tone: 0.42,
          tilt: 0.012,
          rough: 0.3,
        },
        macro: 0.07,
        macroRough: 0.2,
        detail: {
          map: l.polish,
          tile: 0.27,
          normal: 0.03,
          rough: 0.07,
          boost: 1.6,
        },
        wear: {
          period: 6.7,
          lo: 0.3,
          hi: 0.85,
          tint: [1.04, 1.03, 1.02],
          rough: 0.12,
          streakRough: 0.04,
        },
      },
    )));
  let x = (C, L = {}) =>
    r(
      f(
        d(C, {
          roughness: 1,
          envMapIntensity: 0.5,
        }),
      ),
      {
        macro: 0.08,
        detail: {
          map: l.fibre,
          tile: 0.07,
          normal: 0.85,
          rough: 0,
          albedo: 0.55,
        },
        wear: {
          period: 4.3,
          lo: 0.3,
          hi: 0.9,
          breakup: 0.5,
          tint: [1.1, 1.09, 1.08],
          streak: 0.08,
          base: 0,
        },
        ...L,
      },
    );
  ((p.carpetLobby = x(n.carpetLobby)),
    (p.carpetHall = x(n.carpetHall)),
    (p.terraceStone = r(f(d(n.travertine)), {
      layout: "grid",
      cell: 0.9,
      turn: 0.3,
      joint: {
        w: 0.0028,
        bevel: 0.004,
        slope: 0.75,
        ao: 0.6,
        color: 7234130,
        rough: 0.95,
      },
      cellVar: {
        tone: 0.1,
        tilt: 0.02,
        rough: 0.12,
      },
      macro: 0.06,
      macroRough: 0.1,
      detail: {
        map: l.grit,
        tile: 0.31,
        normal: 0.5,
        rough: 0.14,
        albedo: 0.36,
        mask: 0.55,
      },
      wear: {
        period: 5.3,
        lo: 0.8,
        hi: 0.87,
        breakup: 0.5,
        tint: [0.86, 0.84, 0.81],
        rim: 0.06,
        rough: -0.3,
        rimRough: 0.06,
        streak: 0.03,
      },
    })),
    (p.poolTile = r(f(d(n.poolGlass)), {
      layout: "grid",
      cell: 0.04,
      round: 0.004,
      chips: !0,
      joint: {
        w: 0.0012,
        bevel: 0.0022,
        slope: 0.9,
        ao: 0.5,
        color: 12174012,
        rough: 0.85,
      },
      cellVar: {
        tone: 0.4,
        tilt: 0.05,
        pillow: 0.06,
        rough: 0.5,
      },
      macro: 0.08,
      detail: {
        map: l.polish,
        tile: 0.17,
        normal: 0.05,
        rough: 0.06,
      },
      wear: {
        period: 3.1,
        lo: 0.5,
        hi: 0.8,
        tint: [1.05, 1.06, 1.05],
        rough: 0.14,
        streakRough: 0.05,
      },
    })),
    (p.kitchenFloor = r(f(d(n.quarry)), {
      layout: "grid",
      cell: 0.2,
      turn: 0.5,
      joint: {
        w: 0.0026,
        bevel: 0.003,
        slope: 0.8,
        ao: 0.6,
        color: 4867392,
        rough: 0.9,
      },
      cellVar: {
        tone: 0.28,
        tilt: 0.03,
        pillow: 0.03,
        rough: 0.35,
      },
      macro: 0.06,
      macroRough: 0.25,
      detail: {
        map: l.grit,
        tile: 0.23,
        normal: 0.3,
        rough: 0.12,
        albedo: 0.3,
      },
      wear: {
        period: 3.7,
        lo: 0.3,
        hi: 0.9,
        tint: [0.93, 0.92, 0.91],
        rough: -0.1,
        streakRough: 0.06,
        streak: 0.04,
      },
    })),
    (p.kitchenTile = r(f(d(n.glaze)), {
      layout: "grid",
      cell: 0.15,
      turn: 0.5,
      joint: {
        w: 0.0014,
        bevel: 0.0035,
        slope: 0.8,
        ao: 0.4,
        color: 10328204,
        rough: 0.9,
      },
      cellVar: {
        tone: 0.035,
        tilt: 0.03,
        pillow: 0.05,
        rough: 0.4,
      },
      macroRough: 0.3,
      detail: {
        map: l.polish,
        tile: 0.21,
        normal: 0.04,
        rough: 0.05,
      },
      wear: {
        period: 2.7,
        lo: 0.5,
        hi: 0.8,
        tint: [0.985, 0.975, 0.955],
        rough: 0.12,
        streakRough: 0.06,
        base: 0.5,
        baseAlbedo: 0.2,
        baseRough: 0.3,
      },
    })));
  let g = {
    period: 5.9,
    lo: 0.4,
    hi: 0.95,
    tint: [0.985, 0.98, 0.975],
    rough: -0.04,
    streak: 0.012,
    crack: 0.5,
    base: 0.55,
    baseAlbedo: 0.22,
    baseRough: 0.1,
  };
  ((p.plaster = r(f(d(n.plaster.light)), {
    warp: 0.12,
    macro: 0.05,
    macroRough: 0.06,
    detail: {
      map: l.grit,
      tile: 0.37,
      normal: 0.22,
      rough: 0.08,
      albedo: 0.1,
    },
    wear: g,
  })),
    (p.plasterDark = r(
      f(
        d(n.plaster.dark, {
          roughness: 0.82,
        }),
      ),
      {
        warp: 0.12,
        macro: 0.1,
        macroRough: 0.1,
        detail: {
          map: l.grit,
          tile: 0.37,
          normal: 0.2,
          rough: 0.1,
          albedo: 0.14,
        },
        wear: {
          ...g,
          tint: [1.05, 1.05, 1.05],
          rough: -0.07,
          baseAlbedo: -0.25,
          crack: 0.3,
        },
      },
    )),
    (p.walnut = r(f(d(n.walnut)), {
      layout: "boards",
      cell: 0.15,
      joint: {
        w: 6e-4,
        bevel: 0.0032,
        slope: 1.1,
        ao: 0.6,
        color: 1182728,
        rough: 0.9,
        burnish: 0.22,
      },
      cellVar: {
        tone: 0.34,
        tilt: 0.012,
        rough: 0.25,
      },
      macro: 0.07,
      macroRough: 0.2,
      detail: {
        map: l.polish,
        tile: 0.23,
        normal: 0.02,
        rough: 0.05,
      },
      wear: {
        period: 3.3,
        lo: 0.5,
        hi: 0.8,
        tint: [1.03, 1.02, 1.01],
        rough: -0.06,
        streakRough: 0.05,
        base: 0.45,
        baseAlbedo: 0.2,
        baseRough: 0.25,
      },
    })));
  let b = (C, L) =>
    r(
      f(
        d(C, {
          color: L,
        }),
      ),
      {
        layout: "strips",
        cell: 0.11,
        cellVar: {
          tone: 0.16,
          rough: 0.2,
        },
        detail: {
          map: l.polish,
          tile: 0.21,
          normal: 0.02,
          rough: 0.06,
        },
        wear: {
          period: 1.3,
          lo: 0.5,
          hi: 0.8,
          tint: [1.03, 1.02, 1.01],
          rough: -0.07,
          streakRough: 0.04,
        },
      },
    );
  ((p.woodDark = b(n.walnut, 15117706)),
    (p.woodLight = b(n.oak, 16777215)),
    (p.concrete = r(f(d(n.concrete)), {
      macro: 0.14,
      macroRough: 0.06,
      detail: {
        map: l.grit,
        tile: 0.29,
        normal: 0.45,
        rough: 0.1,
        albedo: 0.4,
        mask: 0.5,
      },
      wear: {
        period: 6.1,
        lo: 0.66,
        hi: 0.76,
        breakup: 0.5,
        tint: [0.91, 0.905, 0.895],
        rim: 0.11,
        rough: 0.03,
        streak: 0.05,
        crack: 0.6,
        base: 0.4,
        baseAlbedo: -0.12,
        baseRough: 0.1,
      },
    })),
    (p.ceiling = r(
      f({
        color: 15131352,
        roughness: 1,
        metalness: 0,
        normalMap: n.plaster.light.normalMap,
        normalScale: c(0.3),
        roughnessMap: n.plaster.light.roughnessMap,
      }),
      {
        tile: n.plaster.light.tile,
        macro: 0.03,
        detail: {
          map: l.grit,
          tile: 0.41,
          normal: 0.14,
          rough: 0.05,
          albedo: 0.06,
        },
      },
    )),
    (p.ceilingTile = r(f(d(n.ceilingFibre)), {
      layout: "grid",
      cell: 0.6,
      turn: 0.5,
      joint: {
        w: 0.012,
        bevel: 0.004,
        slope: -0.7,
        ao: 0.45,
        color: 14605266,
        rough: 0.5,
      },
      cellVar: {
        tone: 0.03,
        tilt: 0.012,
      },
      macro: 0.03,
      detail: {
        map: l.grit,
        tile: 0.19,
        normal: 0.3,
        rough: 0.05,
        albedo: 0.3,
      },
    })),
    (p.exterior = r(
      f(
        d(n.bronze, {
          metalness: 1,
        }),
      ),
      {
        layout: "grid",
        cell: [1.2, 0.6],
        joint: {
          w: 0.005,
          bevel: 0.006,
          slope: 0.9,
          ao: 0.7,
          color: 723465,
          rough: 0.9,
        },
        cellVar: {
          tone: 0.16,
          tilt: 0.03,
          pillow: 0.02,
          rough: 0.2,
        },
        macro: 0.08,
        macroRough: 0.12,
        detail: {
          map: l.brushed,
          tile: 0.24,
          normal: 0.12,
          rough: 0.08,
          albedo: 0.06,
        },
        wear: {
          period: 4.7,
          lo: 0.35,
          hi: 0.9,
          tint: [0.96, 0.965, 0.965],
          rough: 0.03,
          streak: 0.035,
          streakRough: 0.02,
          base: 0.4,
          baseAlbedo: 0.25,
          baseRough: 0.15,
        },
      },
    )));
  let v = (C, L = {}) => {
      let A = (C.sheen !== void 0 ? u : f)({
        map: n.white,
        normalMap: n.flat,
        roughnessMap: n.ormWhite,
        metalness: 0,
        ...C,
      });
      return r(A, {
        tile: [1, 1],
        ...L,
        detail: L.detail || {
          map: l.polish,
          tile: 0.2,
          normal: 0,
          rough: 0,
        },
        wear: {
          period: 1.1,
          ...(L.wear || {}),
        },
      });
    },
    y = (C, L = {}) => ({
      lo: 0.25,
      hi: 0.9,
      breakup: 0.4,
      tint: [0.98, 0.98, 0.98],
      rough: C,
      streakRough: C * 0.4,
      ...L,
    });
  ((p.brass = v(
    {
      color: 14464104,
      metalness: 1,
      roughness: 0.2,
    },
    {
      detail: {
        map: l.brushed,
        tile: 0.17,
        normal: 0.035,
        rough: 0.05,
        albedo: 0.03,
      },
      wear: {
        period: 0.83,
        lo: 0.3,
        hi: 0.9,
        breakup: 0.5,
        tint: [0.9, 0.85, 0.76],
        rough: 0.1,
        streakRough: 0.03,
        hand: 0.85,
      },
    },
  )),
    (p.steel = v(
      {
        color: 11975358,
        metalness: 1,
        roughness: 0.34,
      },
      {
        detail: {
          map: l.brushed,
          tile: 0.21,
          normal: 0.12,
          rough: 0.13,
          albedo: 0.05,
        },
        wear: {
          period: 0.9,
          lo: 0.3,
          hi: 0.9,
          breakup: 0.5,
          tint: [0.987, 0.985, 0.98],
          rough: 0.028,
          streakRough: 0.03,
        },
      },
    )),
    (p.chrome = v(
      {
        color: 15264492,
        metalness: 1,
        roughness: 0.035,
      },
      {
        detail: {
          map: l.smudge,
          tile: 0.31,
          normal: 0,
          rough: 0.1,
        },
        wear: {
          period: 0.7,
          ...y(0.045),
        },
      },
    )),
    (p.blackMetal = v(
      {
        color: 3158325,
        roughness: 0.52,
        normalMap: n.speckle.normalMap,
        normalScale: c(0.5),
        roughnessMap: n.speckle.roughnessMap,
      },
      {
        tile: n.speckle.tile,
        detail: {
          map: l.smudge,
          tile: 0.37,
          normal: 0,
          rough: 0.1,
        },
        wear: {
          period: 1.3,
          lo: 0.3,
          hi: 0.9,
          tint: [1.08, 1.07, 1.06],
          rough: 0.06,
          streakRough: 0.03,
        },
      },
    )));
  let M = (C) =>
    v(
      {
        color: C,
        roughness: 1,
        map: n.leather.map,
        normalMap: n.leather.normalMap,
        normalScale: c(1),
        roughnessMap: n.leather.roughnessMap,
      },
      {
        tile: n.leather.tile,
        detail: {
          map: l.smudge,
          tile: 0.43,
          normal: 0,
          rough: 0.08,
        },
        wear: {
          period: 0.9,
          lo: 0.3,
          hi: 0.9,
          breakup: 0.5,
          tint: [1.05, 1.045, 1.04],
          rough: -0.1,
          streakRough: 0.03,
        },
      },
    );
  ((p.leatherTan = M(9064744)),
    (p.leatherBlack = M(4472120)),
    (p.velvetTeal = v(
      {
        color: 1332058,
        roughness: 0.95,
        sheen: 1,
        sheenColor: new Color(7391422),
        sheenRoughness: 0.42,
        map: n.velvet.map,
        normalMap: n.velvet.normalMap,
        normalScale: c(0.7),
      },
      {
        tile: n.velvet.tile,
        detail: {
          map: l.fibre,
          tile: 0.034,
          normal: 0.25,
          rough: 0,
          albedo: 0.3,
        },
        wear: {
          period: 0.8,
          lo: 0.25,
          hi: 0.95,
          breakup: 0.6,
          tint: [1.14, 1.13, 1.12],
          streak: 0.08,
        },
      },
    )));
  let w = (C, L, A = {}) =>
    v(
      {
        color: C,
        roughness: 0.96,
        map: L.map,
        normalMap: L.normalMap,
        normalScale: c(0.9),
        roughnessMap: L.roughnessMap,
        ...A,
      },
      {
        tile: L.tile,
        detail: {
          map: l.fibre,
          tile: 0.021,
          normal: 0.12,
          rough: 0,
          albedo: 0.14,
        },
        wear: {
          period: 0.9,
          lo: 0.4,
          hi: 0.8,
          tint: [1.05, 1.05, 1.05],
          streak: 0.03,
        },
      },
    );
  ((p.fabricCream = w(15129282, n.weave)),
    (p.fabricCharcoal = w(4145479, n.weave)));
  let T = {
    map: m(n.weave.map, 0.045),
    normalMap: m(n.weave.normalMap, 0.045),
    roughnessMap: m(n.weave.roughnessMap, 0.045),
    tile: [0.045, 0.045],
  };
  ((p.bedLinen = w(15328733, T, {
    roughness: 0.9,
    normalScale: c(0.45),
  })),
    (p.onyx = r(
      f({
        color: 13816530,
        map: n.onyx.map,
        emissiveMap: n.onyx.map,
        emissive: 16777215,
        emissiveIntensity: 2.5,
        roughness: 1,
        metalness: 0,
        normalMap: n.onyx.normalMap,
        normalScale: c(0.6),
        roughnessMap: n.onyx.roughnessMap,
      }),
      {
        warp: 0.28,
        depth: 0.045,
        detail: {
          map: l.polish,
          tile: 0.31,
          normal: 0.03,
          rough: 0.07,
        },
        wear: {
          period: 2.3,
          lo: 0.5,
          hi: 0.8,
          rough: 0.07,
          streakRough: 0.04,
        },
      },
    )),
    (p.lampShade = f({
      color: 15783590,
      map: n.shade.map,
      emissive: 16757866,
      emissiveMap: n.shade.emissiveMap,
      emissiveIntensity: 1.6,
      roughness: 0.9,
      metalness: 0,
      normalMap: n.shade.normalMap,
      normalScale: c(0.7),
      side: DoubleSide,
    })),
    (p.bulbWarm = f({
      color: 2759696,
      emissive: 16757866,
      emissiveIntensity: 8,
      roughness: 0.4,
      metalness: 0,
    })),
    (p.bulbCool = f({
      color: 1843752,
      emissive: 13625599,
      emissiveIntensity: 6,
      roughness: 0.4,
      metalness: 0,
    })),
    (p.ledStrip = f({
      color: 2757640,
      emissive: 16747068,
      emissiveIntensity: 5,
      roughness: 0.5,
      metalness: 0,
    })),
    (p.screenOn = f({
      color: 0,
      emissive: 16777215,
      emissiveMap: n.screen,
      emissiveIntensity: 2.2,
      roughness: 0.22,
      metalness: 0,
    })),
    (p.screenOff = v(
      {
        color: 2500137,
        roughness: 0.06,
        envMapIntensity: 1.3,
      },
      {
        detail: {
          map: l.smudge,
          tile: 0.29,
          normal: 0,
          rough: 0.14,
        },
        wear: {
          period: 0.8,
          ...y(0.05, {
            tint: [1.12, 1.12, 1.12],
          }),
        },
      },
    )),
    (p.foliage = f({
      color: 4156717,
      roughness: 0.52,
      metalness: 0,
      side: DoubleSide,
    })),
    (p.foliage.onBeforeCompile = (C) => {
      C.fragmentShader = C.fragmentShader.replace(
        "#include <lights_physical_pars_fragment>",
        `#include <lights_physical_pars_fragment>
void RE_Direct_Leaf( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	float back = saturate( dot( -geometryNormal, directLight.direction ) );
	reflectedLight.directDiffuse += back * directLight.color * material.diffuseColor * vec3( 0.95, 1.0, 0.3 ) * ( 0.62 * RECIPROCAL_PI );
}
#undef RE_Direct
#define RE_Direct RE_Direct_Leaf`,
      );
    }),
    (p.foliage.customProgramCacheKey = () => "gh-foliage"),
    (p.soil = v(
      {
        color: 4995371,
        roughness: 1,
        normalMap: n.soil.normalMap,
        normalScale: c(1.3),
        map: n.soil.map,
      },
      {
        tile: n.soil.tile,
        detail: {
          map: l.grit,
          tile: 0.13,
          normal: 0.6,
          rough: 0,
          albedo: 0.5,
        },
      },
    )),
    (p.terracotta = v(
      {
        color: 11624506,
        roughness: 0.84,
        normalMap: n.speckle.normalMap,
        normalScale: c(0.8),
      },
      {
        tile: n.speckle.tile,
        detail: {
          map: l.grit,
          tile: 0.17,
          normal: 0.35,
          rough: 0.1,
          albedo: 0.3,
        },
        wear: {
          period: 0.6,
          lo: 0.4,
          hi: 0.85,
          breakup: 0.6,
          tint: [0.94, 0.935, 0.93],
          rim: 0.06,
          rough: 0.05,
          streak: 0.04,
        },
      },
    )));
  let S = (C, L) =>
    v(
      {
        color: C,
        roughness: L,
      },
      {
        detail: {
          map: l.smudge,
          tile: 0.33,
          normal: 0,
          rough: 0.08,
        },
        wear: {
          period: 0.7,
          ...y(0.04),
        },
      },
    );
  ((p.ceramicWhite = S(15328731, 0.14)),
    (p.ceramicBlack = S(3158068, 0.16)),
    (p.rubber = v(
      {
        color: 3158064,
        roughness: 0.9,
        normalMap: n.speckle.normalMap,
        normalScale: c(0.5),
      },
      {
        tile: n.speckle.tile,
        detail: {
          map: l.grit,
          tile: 0.11,
          normal: 0.25,
          rough: 0.06,
          albedo: 0.2,
        },
        wear: {
          lo: 0.5,
          hi: 0.8,
          tint: [1.25, 1.22, 1.18],
          rough: 0.06,
        },
      },
    )),
    (p.plasticBlack = v(
      {
        color: 3158065,
        roughness: 0.46,
        roughnessMap: n.speckle.roughnessMap,
        normalMap: n.speckle.normalMap,
        normalScale: c(0.4),
      },
      {
        tile: n.speckle.tile,
        detail: {
          map: l.smudge,
          tile: 0.31,
          normal: 0,
          rough: 0.12,
        },
        wear: {
          ...y(-0.07, {
            tint: [1.08, 1.08, 1.08],
          }),
        },
      },
    )),
    (p.plasticWhite = v(
      {
        color: 15131612,
        roughness: 0.4,
        roughnessMap: n.speckle.roughnessMap,
        normalMap: n.speckle.normalMap,
        normalScale: c(0.3),
      },
      {
        tile: n.speckle.tile,
        detail: {
          map: l.smudge,
          tile: 0.31,
          normal: 0,
          rough: 0.1,
        },
        wear: {
          ...y(0.06, {
            tint: [0.97, 0.965, 0.95],
          }),
        },
      },
    )),
    (p.paper = v(
      {
        color: 15525332,
        roughness: 0.92,
      },
      {
        detail: {
          map: l.fibre,
          tile: 0.045,
          normal: 0.1,
          rough: 0,
          albedo: 0.07,
        },
      },
    )));
  let E = (C, L) =>
    f({
      color: C,
      transparent: !0,
      opacity: L,
      roughness: 0.06,
      metalness: 0,
      envMapIntensity: 1.6,
    });
  ((p.bottleGreen = E(1923628, 0.58)),
    (p.bottleAmber = E(8141838, 0.6)),
    (p.bottleClear = E(13624038, 0.34)));
  for (let C = 0; C < 4; C++) {
    let L = n.art[C];
    p["art" + (C + 1)] = f({
      map: L.map,
      normalMap: L.normalMap,
      normalScale: c(0.6),
      roughnessMap: L.roughnessMap,
      roughness: 1,
      metalness: 0,
    });
  }
  ((p.brassAged = v(
    {
      color: 11569740,
      metalness: 1,
      roughness: 0.38,
    },
    {
      detail: {
        map: l.brushed,
        tile: 0.17,
        normal: 0.1,
        rough: 0.14,
        albedo: 0.1,
      },
      wear: {
        period: 0.6,
        lo: 0.2,
        hi: 0.8,
        breakup: 0.6,
        tint: [0.66, 0.6, 0.5],
        rough: 0.2,
        streak: 0.08,
        streakRough: 0.06,
        hand: 0.9,
      },
    },
  )),
    (p.marbleHoned = r(
      f(
        d(n.marble, {
          roughness: 3.4,
        }),
      ),
      {
        layout: "grid",
        cell: [1.2, 0.6],
        joint: {
          w: 9e-4,
          bevel: 0.002,
          slope: 0.7,
          ao: 0.5,
          color: 9077364,
          rough: 0.9,
        },
        cellVar: {
          tone: 0.05,
          tilt: 0.008,
          rough: 0.15,
        },
        macro: 0.03,
        macroRough: 0.15,
        detail: {
          map: l.grit,
          tile: 0.27,
          normal: 0.07,
          rough: 0.08,
          albedo: 0.04,
        },
        wear: {
          period: 3.1,
          lo: 0.5,
          hi: 0.8,
          rough: -0.06,
          base: 0.4,
          baseAlbedo: 0.2,
        },
      },
    )),
    (p.oakPlank = r(
      f(
        d(n.oak, {
          color: 14861472,
        }),
      ),
      {
        layout: "boards",
        cell: 0.14,
        joint: {
          w: 6e-4,
          bevel: 0.002,
          slope: 0.9,
          ao: 0.6,
          color: 1839884,
          rough: 0.9,
        },
        cellVar: {
          tone: 0.26,
          tilt: 0.01,
          rough: 0.25,
        },
        macro: 0.06,
        macroRough: 0.2,
        detail: {
          map: l.polish,
          tile: 0.23,
          normal: 0.02,
          rough: 0.05,
        },
        wear: {
          period: 3.3,
          lo: 0.5,
          hi: 0.8,
          tint: [1.03, 1.02, 1.01],
          rough: -0.05,
          streakRough: 0.05,
          base: 0.4,
          baseAlbedo: 0.2,
        },
      },
    )),
    (p.travertineWall = r(f(d(n.travertine)), {
      layout: "grid",
      cell: [0.6, 0.3],
      joint: {
        w: 0.0015,
        bevel: 0.003,
        slope: 0.7,
        ao: 0.55,
        color: 7234130,
        rough: 0.95,
      },
      cellVar: {
        tone: 0.12,
        tilt: 0.015,
        rough: 0.12,
      },
      macro: 0.06,
      macroRough: 0.1,
      detail: {
        map: l.grit,
        tile: 0.31,
        normal: 0.5,
        rough: 0.14,
        albedo: 0.5,
        mask: 0.8,
      },
      wear: {
        period: 4.1,
        lo: 0.6,
        hi: 0.8,
        tint: [0.93, 0.92, 0.9],
        streak: 0.05,
        base: 0.5,
        baseAlbedo: 0.25,
      },
    })));
  for (let C of Object.keys(p)) p[C].name = C;
  let _ = new Map();
  ((p.makeSign = (
    C,
    {
      w: L = 1,
      h: A = 0.25,
      color: O = "#e9c98a",
      bg: H = null,
      glow: F = 0,
      font: P = '600 120px Bahnschrift, "Segoe UI", sans-serif',
    } = {},
  ) => {
    let z = aD(String(C), {
        w: L,
        h: A,
        color: O,
        bg: H,
        font: P,
      }),
      k = new MeshStandardMaterial({
        map: z,
        roughness: 0.45,
        metalness: 0,
        transparent: !H,
        alphaTest: H ? 0 : 0.03,
        depthWrite: !!H,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
    (F > 0 &&
      (k.emissive.set(16777215),
      (k.emissiveMap = z),
      (k.emissiveIntensity = F)),
      (k.name = "sign"));
    let I = L + "x" + A;
    _.has(I) || _.set(I, new PlaneGeometry(L, A));
    let G = new Mesh(_.get(I), k);
    return ((G.name = "sign"), (G.userData.sign = !0), G);
  }),
    (p.textures = n));
  let R = performance.now() - s;
  return (
    (p.genTimeMs = R),
    console.log(
      `[materials] ${Object.keys(A9).length} materials, textures painted in ${i.toFixed(0)} ms (total ${R.toFixed(0)} ms)`,
    ),
    p
  );
}

export { A9, createMaterials };

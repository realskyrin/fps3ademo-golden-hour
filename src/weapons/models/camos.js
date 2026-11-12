// weapons/models/camos.js: recovered from the verified GOLDEN HOUR release.
import {
  Color,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  UnsignedByteType,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";

var Oo = Math.PI * 2;
var t1 = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var Wl = (o, t, e) => o + (t - o) * e;
var $o = (o, t, e) => {
  let s = (e - o) / (t - o);
  return ((s = s < 0 ? 0 : s > 1 ? 1 : s), s * s * (3 - 2 * s));
};
function wh(o = 1) {
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
function ql(o, t, e) {
  e = e || new Float32Array(o * o);
  let s = (Math.imul(t | 0, 2654435761) ^ 2654435769) | 0;
  s || (s = 1);
  for (let n = 0; n < e.length; n++)
    ((s ^= s << 13),
      (s ^= s >>> 17),
      (s ^= s << 5),
      (e[n] = (s >>> 8) / 16777216));
  return e;
}
function T4(o, t, e, s, n, i = 1) {
  let a = wh(n),
    r = e * s,
    l = new Float32Array(r),
    c = new Float32Array(r);
  for (let x = 0; x < r; x++) {
    let g = a() * Oo;
    ((l[x] = Math.cos(g)), (c[x] = Math.sin(g)));
  }
  let h = new Int32Array(t),
    f = new Int32Array(t),
    u = new Float32Array(t),
    d = new Float32Array(t);
  for (let x = 0; x < t; x++) {
    let g = (x * e) / t,
      b = Math.floor(g),
      v = g - b;
    ((h[x] = b % e),
      (f[x] = (b + 1) % e),
      (u[x] = v),
      (d[x] = v * v * v * (v * (v * 6 - 15) + 10)));
  }
  let m = i * 1.5,
    p = 0;
  for (let x = 0; x < t; x++) {
    let g = (x * s) / t,
      b = Math.floor(g),
      v = g - b,
      y = v * v * v * (v * (v * 6 - 15) + 10),
      M = v - 1,
      w = (b % s) * e,
      T = ((b + 1) % s) * e;
    for (let S = 0; S < t; S++) {
      let E = w + h[S],
        _ = w + f[S],
        R = T + h[S],
        C = T + f[S],
        L = u[S],
        A = L - 1,
        O = d[S],
        H = l[E] * L + c[E] * v,
        F = l[_] * A + c[_] * v,
        P = l[R] * L + c[R] * M,
        z = l[C] * A + c[C] * M,
        k = H + (F - H) * O,
        I = P + (z - P) * O;
      o[p++] += m * (k + (I - k) * y);
    }
  }
  return o;
}
function uf(o, t, e, s, n, i = 0.5) {
  let a = new Float32Array(o * o),
    r = 1,
    l = 0;
  for (let h = 0; h < s && !(t > o / 2 || e > o / 2); h++)
    (T4(a, o, t, e, n + h * 131, r), (l += r), (r *= i), (t *= 2), (e *= 2));
  let c = 0.5 / l;
  for (let h = 0; h < a.length; h++) a[h] = a[h] * c + 0.5;
  return a;
}
function _o(o, t, e, s, n, i = 0.5, a = 256) {
  return a >= o ? uf(o, t, e, s, n, i) : df(uf(a, t, e, s, n, i), a, o);
}
function df(o, t, e, s) {
  s = s || new Float32Array(e * e);
  let n = t / e,
    i = new Int32Array(e),
    a = new Int32Array(e),
    r = new Float32Array(e);
  for (let c = 0; c < e; c++) {
    let h = (c + 0.5) * n - 0.5,
      f = Math.floor(h);
    ((i[c] = (f + t) % t), (a[c] = (f + 1 + t) % t), (r[c] = h - f));
  }
  let l = 0;
  for (let c = 0; c < e; c++) {
    let h = (c + 0.5) * n - 0.5,
      f = Math.floor(h),
      u = h - f,
      d = ((f + t) % t) * t,
      m = ((f + 1 + t) % t) * t;
    for (let p = 0; p < e; p++) {
      let x = o[d + i[p]],
        g = o[d + a[p]],
        b = o[m + i[p]],
        v = o[m + a[p]],
        y = r[p],
        M = x + (g - x) * y,
        w = b + (v - b) * y;
      s[l++] = M + (w - M) * u;
    }
  }
  return s;
}
function lA(o, t, e, s = 2) {
  let n = new Float32Array(o),
    i = new Float32Array(t * t),
    a = 2 * e + 1,
    r = 1 / a,
    l = new Float64Array(t);
  for (let c = 0; c < s; c++) {
    for (let h = 0; h < t; h++) {
      let f = h * t,
        u = 0;
      for (let d = -e; d <= e; d++) u += n[f + (((d % t) + t) % t)];
      for (let d = 0; d < t; d++) {
        i[f + d] = u * r;
        let m = d + e + 1;
        m >= t && (m -= t);
        let p = d - e;
        (p < 0 && (p += t), (u += n[f + m] - n[f + p]));
      }
    }
    l.fill(0);
    for (let h = -e; h <= e; h++) {
      let f = (((h % t) + t) % t) * t;
      for (let u = 0; u < t; u++) l[u] += i[f + u];
    }
    for (let h = 0; h < t; h++) {
      let f = h * t,
        u = h + e + 1;
      u >= t && (u -= t);
      let d = h - e;
      d < 0 && (d += t);
      let m = u * t,
        p = d * t;
      for (let x = 0; x < t; x++)
        ((n[f + x] = l[x] * r), (l[x] += i[m + x] - i[p + x]));
    }
  }
  return n;
}
function pf(o, t, e = 1) {
  let s = new Float32Array(o),
    n = new Float32Array(t * t);
  for (let i = 0; i < e; i++) {
    for (let a = 0; a < t; a++) {
      let r = a * t;
      n[r] = (s[r + t - 1] + 2 * s[r] + s[r + 1]) * 0.25;
      for (let l = 1; l < t - 1; l++)
        n[r + l] = (s[r + l - 1] + 2 * s[r + l] + s[r + l + 1]) * 0.25;
      n[r + t - 1] = (s[r + t - 2] + 2 * s[r + t - 1] + s[r]) * 0.25;
    }
    for (let a = 0; a < t; a++) {
      let r = a * t,
        l = (a ? a - 1 : t - 1) * t,
        c = (a < t - 1 ? a + 1 : 0) * t;
      for (let h = 0; h < t; h++)
        s[r + h] = (n[l + h] + 2 * n[r + h] + n[c + h]) * 0.25;
    }
  }
  return s;
}
function hT(o, t, e, s, n, i = null, a = 0) {
  let r = new Float32Array(t * t),
    l = t - 1,
    c = 0;
  for (let h = 0; h < t; h++)
    for (let f = 0; f < t; f++, c++) {
      let u = f + (e[c] - 0.5) * n + (i ? (i[c] - 0.5) * a : 0) + t,
        d = h + (s[c] - 0.5) * n + t,
        m = Math.floor(u),
        p = Math.floor(d),
        x = u - m,
        g = d - p,
        b = m & l,
        v = (m + 1) & l,
        y = (p & l) * t,
        M = ((p + 1) & l) * t,
        w = o[y + b],
        T = o[y + v],
        S = o[M + b],
        E = o[M + v],
        _ = w + (T - w) * x,
        R = S + (E - S) * x;
      r[c] = _ + (R - _) * g;
    }
  return r;
}
function P1(o, t) {
  let e = Math.max(1, Math.floor(o.length / 16384)),
    s = Math.floor(o.length / e),
    n = new Float32Array(s);
  for (let i = 0; i < s; i++) n[i] = o[i * e];
  return (n.sort(), n[Math.min(s - 1, Math.max(0, Math.floor(t * s)))]);
}
function _5(o) {
  let t = document.createElement("canvas");
  t.width = t.height = o;
  let e = t.getContext("2d", {
    willReadFrequently: !0,
  });
  return ((e.fillStyle = "#000"), e.fillRect(0, 0, o, o), e);
}
function y2(o, t, e, s, n, i) {
  for (let a = -t; a <= t; a += t)
    if (!(s + a + n < 0 || s + a - n > t))
      for (let r = -t; r <= t; r += t)
        e + r + n < 0 ||
          e + r - n > t ||
          (o.save(), o.translate(r, a), i(), o.restore());
}
function S4(o, t, e = "r") {
  let s = o.getImageData(0, 0, t, t).data,
    n = [];
  for (let i of e) {
    let a = "rgba".indexOf(i),
      r = new Float32Array(t * t);
    for (let l = 0, c = a; l < r.length; l++, c += 4) r[l] = s[c] * (1 / 255);
    n.push(r);
  }
  return n;
}
function z1(o, t, e, s, n = 7, i = null, a = null) {
  let r = (n * 7919 + 13) | 0,
    l = 0;
  for (let c = 0; c < t; c++) {
    let h = c * t,
      f = (c < t - 1 ? c + 1 : 0) * t,
      u = (c ? c - 1 : t - 1) * t;
    for (let d = 0; d < t; d++, l += 4) {
      let m = d ? d - 1 : t - 1,
        p = d < t - 1 ? d + 1 : 0,
        x = (o[h + p] - o[h + m]) * e,
        g = (o[f + d] - o[u + d]) * e;
      i && ((x += i[h + d]), (g += a[h + d]));
      let b = 1 / Math.sqrt(x * x + g * g + 1);
      ((r ^= r << 13), (r ^= r >>> 17), (r ^= r << 5));
      let v = (r & 255) / 255,
        y = ((r >>> 8) & 255) / 255;
      ((s[l] = (-x * b * 0.5 + 0.5) * 255 + v),
        (s[l + 1] = (-g * b * 0.5 + 0.5) * 255 + y),
        (s[l + 2] = (b * 0.5 + 0.5) * 255 + 0.5),
        (s[l + 3] = 255));
    }
  }
  return s;
}
function SF(o, t, e, s, n) {
  let i = wh(e),
    a = o / t,
    r = t * t,
    l = new Float32Array(r),
    c = new Float32Array(r),
    h = new Uint16Array(r);
  for (let y = 0; y < t; y++)
    for (let M = 0; M < t; M++)
      ((l[y * t + M] = (M + 0.5 + (i() - 0.5) * s) * a),
        (c[y * t + M] = (y + 0.5 + (i() - 0.5) * s) * a));
  if (n) {
    let y = [],
      M = [];
    for (let w = 0; w < n; w++) (y.push(i() * o), M.push(i() * o));
    for (let w = 0; w < r; w++) {
      let T = 1e9,
        S = 0;
      for (let E = 0; E < n; E++) {
        let _ = Math.abs(l[w] - y[E]),
          R = Math.abs(c[w] - M[E]);
        (_ > o / 2 && (_ = o - _), R > o / 2 && (R = o - R));
        let C = _ * _ + R * R;
        C < T && ((T = C), (S = E));
      }
      h[w] = S;
    }
  }
  let f = new Float32Array(r * 9),
    u = new Float32Array(r * 9),
    d = new Int32Array(r * 9);
  for (let y = 0; y < t; y++)
    for (let M = 0; M < t; M++) {
      let w = (y * t + M) * 9;
      for (let T = -1; T <= 1; T++)
        for (let S = -1; S <= 1; S++, w++) {
          let E = M + S,
            _ = y + T,
            R = (E + t) % t,
            C = (_ + t) % t,
            L = C * t + R;
          ((f[w] = l[L] + (E - R) * a),
            (u[w] = c[L] + (_ - C) * a),
            (d[w] = L));
        }
    }
  let m = new Uint16Array(o * o),
    p = new Float32Array(o * o),
    x = new Float32Array(o * o),
    g = new Float32Array(o * o),
    b = new Float32Array(o * o),
    v = 0;
  for (let y = 0; y < o; y++) {
    let M = Math.min(t - 1, Math.floor(y / a));
    for (let w = 0; w < o; w++, v++) {
      let T = Math.min(t - 1, Math.floor(w / a)),
        S = (M * t + T) * 9,
        E = 1e9,
        _ = 0;
      for (let k = S; k < S + 9; k++) {
        let I = f[k] - w,
          G = u[k] - y,
          K = I * I + G * G;
        K < E && ((E = K), (_ = k));
      }
      let R = d[_],
        C = f[_],
        L = u[_],
        A = h[R],
        O = C - l[R],
        H = L - c[R],
        F = R * 9,
        P = 1e9,
        z = 1e9;
      for (let k = F; k < F + 9; k++) {
        let I = d[k];
        if (I === R) continue;
        let G = f[k] + O,
          K = u[k] + H,
          $ = G - C,
          n0 = K - L,
          e0 =
            (((C + G) * 0.5 - w) * $ + ((L + K) * 0.5 - y) * n0) /
            Math.sqrt($ * $ + n0 * n0);
        (e0 < P && (P = e0), h[I] !== A && e0 < z && (z = e0));
      }
      ((m[v] = R), (p[v] = P), (x[v] = z), (g[v] = w - C), (b[v] = y - L));
    }
  }
  return {
    id: m,
    edge: p,
    crack: x,
    vx: g,
    vy: b,
    plate: h,
    cells: r,
  };
}
var Fu = (o) => ({
  alb: new Uint8ClampedArray(o * o * 4),
  nrm: new Uint8ClampedArray(o * o * 4),
  orm: new Uint8ClampedArray(o * o * 4),
});
function KQ(
  o,
  t,
  {
    n: e = 60,
    len: s = [20, 200],
    alpha: n = [0.15, 1],
    width: i = [0.8, 1.4],
    bias: a = 0.6,
    scuffs: r = 0,
    scuffAlpha: l = 0.2,
  } = {},
) {
  let c = _5(o),
    h = wh(t);
  ((c.globalCompositeOperation = "lighter"), (c.lineCap = "round"));
  let f = (u, d, m, p, x, g) => {
    let b = (Math.cos(m) * p) / 2,
      v = (Math.sin(m) * p) / 2,
      y = (h() - 0.5) * p * 0.14;
    ((c.strokeStyle = `rgba(255,255,255,${x.toFixed(3)})`),
      (c.lineWidth = g),
      y2(c, o, u, d, p / 2 + 6, () => {
        (c.beginPath(),
          c.moveTo(u - b, d - v),
          c.quadraticCurveTo(
            u - Math.sin(m) * y,
            d + Math.cos(m) * y,
            u + b,
            d + v,
          ),
          c.stroke());
      }));
  };
  for (let u = 0; u < e; u++) {
    let d = h() < a ? (h() - 0.5) * 0.5 + (h() < 0.5 ? 0 : Math.PI) : h() * Oo,
      m = h();
    f(
      h() * o,
      h() * o,
      d,
      s[0] + (s[1] - s[0]) * h() * h(),
      n[0] + (n[1] - n[0]) * m * m * m,
      i[0] + (i[1] - i[0]) * h(),
    );
  }
  for (let u = 0; u < r; u++) {
    let d = h() * o,
      m = h() * o,
      p = h() * Oo,
      x = 8 + ((h() * 22) | 0),
      g = 6 + h() * 26,
      b = 14 + h() * 60,
      v = l * (0.4 + h());
    for (let y = 0; y < x; y++) {
      let M = (h() - 0.5) * g,
        w = (h() - 0.5) * b * 0.6;
      f(
        d - Math.sin(p) * M + Math.cos(p) * w,
        m + Math.cos(p) * M + Math.sin(p) * w,
        p + (h() - 0.5) * 0.08,
        b * (0.4 + h() * 0.8),
        v * (0.5 + h()),
        0.8,
      );
    }
  }
  return S4(c, o, "r")[0];
}
var _F = new Map();
function yp(o) {
  let t = _F.get(o);
  return (
    t ||
      _F.set(
        o,
        (t = {
          S: KQ(o, 106, {
            n: 44,
            len: [16, 300],
            alpha: [0.12, 1],
            bias: 0.7,
            scuffs: 24,
            scuffAlpha: 0.18,
          }),
          chip: uf(o, 44, 44, 3, 1047, 0.62),
        }),
      ),
    t
  );
}
function Ey(o, t, e, s = 0.94, n = 1) {
  let { S: i, chip: a } = yp(o),
    r = _o(o, 6, 6, 3, t),
    l = new Float32Array(o * o);
  for (let f = 0; f < l.length; f++) l[f] = r[f] * 0.6 + a[f] * 0.4;
  let c = P1(l, 0.02),
    h = 1 / (P1(l, 0.995) - c);
  for (let f = 0; f < l.length; f++) {
    let u = (l[f] - c) * h;
    ((u = u < 0 ? 0 : u > 1 ? 1 : u), (u *= s * (e ? 0.84 + 0.16 * e[f] : 1)));
    let d = i[f] * n;
    l[f] = u > d ? u : d;
  }
  return l;
}
var Ty = 0.1;
function XQ(o = 1024) {
  let e = 200 / o,
    s = Fu(o),
    { alb: n, orm: i } = s,
    a = _o(o, 3, 3, 4, 101),
    r = _o(o, 6, 6, 3, 102),
    l = _o(o, 2, 3, 3, 103),
    c = _o(o, 1, 8, 2, 109),
    h = ql(o, 105),
    f = ql(o, 108),
    u = yp(o).S,
    d = Ey(o, 104, l),
    m = pf(h, o, 2),
    p = new Float32Array(o * o),
    x = 1 - Ty;
  for (let g = 0, b = 0; g < p.length; g++, b += 4) {
    let v = $o(0.55, 0.76, l[g]),
      y = u[g],
      M = d[g],
      w = $o(x - 0.05, x + 0.02, M),
      T =
        0.8 +
        0.24 * a[g] +
        0.16 * c[g] +
        (h[g] - 0.5) * 0.04 +
        (m[g] - 0.5) * 0.09 -
        v * 0.15;
    f[g] > 0.992 ? (T *= 0.88) : f[g] < 0.008 && (T *= 1.08);
    let S = r[g] - 0.5;
    ((n[b] = (119 + S * 13) * T + y * 22),
      (n[b + 1] = (106 + S * 2) * T + y * 20),
      (n[b + 2] = (83 - S * 14) * T + y * 16),
      (n[b + 3] = 255),
      (i[b] = M * 255),
      (i[b + 1] =
        (0.62 -
          v * 0.26 +
          (h[g] - 0.5) * 0.07 -
          y * 0.2 +
          (c[g] - 0.5) * 0.14) *
        255),
      (i[b + 2] = 0),
      (i[b + 3] = 255),
      (p[g] = -0.04 * w - 0.025 * y + (m[g] - 0.5) * 0.02));
  }
  return (
    z1(p, o, 1.6 / (2 * e), s.nrm, 11),
    {
      N: o,
      tile: 0.2,
      ...s,
    }
  );
}
function YQ(o = 1024) {
  let e = 320 / o,
    s = 1 / e,
    n = Fu(o),
    { alb: i, orm: a } = n,
    r = wh(2207),
    l = _o(o, 3, 3, 4, 201),
    c = _o(o, 5, 5, 3, 202),
    h = _o(o, 2, 3, 3, 203),
    f = ql(o, 204),
    u = _5(o);
  u.globalCompositeOperation = "lighter";
  let d = (P, z, k, I, G) =>
      y2(u, o, P, z, k, () => {
        let K = u.createRadialGradient(P, z, 0, P, z, k);
        (K.addColorStop(0, `rgba(${I},${G})`),
          K.addColorStop(0.45, `rgba(${I},${G * 0.72})`),
          K.addColorStop(1, `rgba(${I},0)`),
          (u.fillStyle = K),
          u.fillRect(P - k, z - k, k * 2, k * 2));
      }),
    m = [];
  for (let P = 0; P < 400 && m.length < 15; P++) {
    let z = r() * o,
      k = r() * o,
      I = !0;
    for (let G of m) {
      let K = Math.abs(z - G[0]),
        $ = Math.abs(k - G[1]);
      if (
        (K > o / 2 && (K = o - K),
        $ > o / 2 && ($ = o - $),
        K * K + $ * $ < (62 * s) ** 2)
      ) {
        I = !1;
        break;
      }
    }
    I && m.push([z, k]);
  }
  u.fillStyle = "rgb(0,255,0)";
  let p = (P, z) => {
    (u.beginPath(),
      u.moveTo(0, 0),
      u.bezierCurveTo(P * 0.25, -z, P * 0.7, -z * 0.8, P, 0),
      u.bezierCurveTo(P * 0.7, z * 0.8, P * 0.25, z, 0, 0),
      u.fill());
  };
  m.forEach(([P, z], k) => {
    let I = r() * Oo,
      G = k % 3 !== 2,
      K = (G ? r.range(58, 92) : r.range(40, 58)) * s,
      $ = r.range(-0.5, 0.5);
    y2(u, o, P, z, K, () => {
      if (
        (u.save(), u.translate(P, z), u.rotate(I), u.translate(-K / 2, 0), G)
      ) {
        let p0 = Math.floor(K / (5.2 * s));
        for (let t0 = 0; t0 <= p0; t0++) {
          let M0 = t0 / p0,
            f0 = M0 * K,
            _0 = Math.sin(M0 * 2.2) * $ * K * 0.25,
            F0 = Math.sin(Math.PI * Math.pow(M0, 0.62)) * (1 - M0 * 0.35),
            m0 = (5 + 17 * F0) * s,
            S0 = (1.1 + 1.5 * F0) * s;
          for (let T0 of [-1, 1])
            (u.save(),
              u.translate(f0, _0),
              u.rotate(T0 * (1.02 - M0 * 0.35) + $ * 0.3),
              p(m0, S0),
              u.restore());
        }
        u.fillRect(0, -0.6 * s, K, 1.2 * s);
      } else {
        let p0 = 4 + ((r() * 3) | 0);
        for (let t0 = 0; t0 < p0; t0++) {
          let M0 = t0 / (p0 - 1),
            f0 = t0 % 2 ? 1 : -1;
          (u.save(),
            u.translate(M0 * K * 0.8, 0),
            u.rotate(t0 === p0 - 1 ? 0 : f0 * r.range(0.55, 0.95)),
            p(r.range(20, 30) * s, r.range(4.5, 7) * s),
            u.restore());
        }
        u.fillRect(0, -0.7 * s, K * 0.8, 1.4 * s);
      }
      u.restore();
    });
    let n0 = Math.cos(I),
      e0 = Math.sin(I);
    for (let p0 = -1; p0 <= 1; p0++)
      d(
        P + n0 * p0 * K * 0.3 + r.range(-8, 8) * s,
        z + e0 * p0 * K * 0.3 + r.range(-8, 8) * s,
        K * r.range(0.5, 0.68),
        "255,0,0",
        0.85,
      );
  });
  for (let P = 0; P < 9; P++) {
    let z = r() * o,
      k = r() * o;
    (d(z, k, r.range(38, 62) * s, "0,0,255", 0.95),
      d(
        z + r.range(-30, 30) * s,
        k + r.range(-30, 30) * s,
        r.range(26, 40) * s,
        "0,0,255",
        0.8,
      ));
  }
  let [x, g, b] = S4(u, o, "rgb"),
    v = pf(g, o, 2),
    y = yp(o).S,
    M = Ey(o, 205, h, 0.955),
    w = o / 45,
    T = o / 26,
    S = Math.sqrt(3) / 2,
    E = new Float32Array(o * o),
    _ = 1 - Ty,
    R = P1(l, 0.62),
    C = [142, 129, 93],
    L = [82, 61, 43],
    A = [70, 80, 45],
    O = [35, 43, 31],
    H = 0,
    F = 0;
  for (let P = 0; P < o; P++)
    for (let z = 0; z < o; z++, H++, F += 4) {
      let k = f[H] - 0.5,
        I = $o(R - 0.015, R + 0.06, l[H]),
        G = t1(x[H] * 1.45) * (1 - 0.94 * v[H]),
        K = t1(b[H] * 1.5);
      if (K > 0.01) {
        let F0 = z + (l[H] - 0.5) * 110,
          m0 = P + (c[H] - 0.5) * 110,
          S0 = F0 / w,
          T0 = m0 / T;
        ((S0 -= Math.floor(S0)), (T0 -= Math.floor(T0)));
        let j0 = S0 + 0.5,
          Z0 = T0 + 0.5;
        ((j0 -= Math.floor(j0)),
          (Z0 -= Math.floor(Z0)),
          (S0 = Math.abs(S0 - 0.5) * w),
          (T0 = Math.abs(T0 - 0.5) * w * 1.7320508),
          (j0 = Math.abs(j0 - 0.5) * w),
          (Z0 = Math.abs(Z0 - 0.5) * w * 1.7320508));
        let lt = Math.max(S0, S0 * 0.5 + T0 * S),
          H0 = Math.max(j0, j0 * 0.5 + Z0 * S),
          Y0 = w * 0.5 - Math.min(lt, H0);
        K *= 1 - (0.3 + 0.5 * c[H]) * (1 - $o(0.3, 4, Y0));
      }
      ((I = t1(I + k * 0.5 * (4 * I * (1 - I)))),
        (G = t1(G + k * 0.9 * (4 * G * (1 - G)))),
        (K = t1(K + k * 0.9 * (4 * K * (1 - K)))));
      let $ = 0.92 + 0.16 * c[H] + k * 0.05,
        n0 = y[H],
        e0 = $o(0.58, 0.8, h[H]),
        p0 = C[0],
        t0 = C[1],
        M0 = C[2];
      ((p0 += (L[0] - p0) * I * 0.96),
        (t0 += (L[1] - t0) * I * 0.96),
        (M0 += (L[2] - M0) * I * 0.96),
        (p0 += (A[0] - p0) * G),
        (t0 += (A[1] - t0) * G),
        (M0 += (A[2] - M0) * G),
        (p0 += (O[0] - p0) * K),
        (t0 += (O[1] - t0) * K),
        (M0 += (O[2] - M0) * K));
      let f0 = $ * (1 - e0 * 0.06);
      ((i[F] = p0 * f0 + n0 * 20),
        (i[F + 1] = t0 * f0 + n0 * 19),
        (i[F + 2] = M0 * f0 + n0 * 16),
        (i[F + 3] = 255));
      let _0 = 4 * (G * (1 - G) + K * (1 - K));
      ((a[F] = M[H] * 255),
        (a[F + 1] =
          (0.72 +
            _0 * 0.12 -
            e0 * 0.24 +
            k * 0.06 -
            n0 * 0.2 +
            (c[H] - 0.5) * 0.12) *
          255),
        (a[F + 2] = 0),
        (a[F + 3] = 255),
        (E[H] =
          0.012 * (I + G + K) +
          _0 * k * 0.02 +
          k * 0.008 -
          0.045 * $o(_ - 0.05, _ + 0.02, M[H]) -
          0.025 * n0));
    }
  return (
    z1(E, o, 1.7 / (2 * e), n.nrm, 12),
    {
      N: o,
      tile: 0.32,
      ...n,
    }
  );
}
function jQ(o = 1024) {
  let e = 240 / o,
    s = 1 / e,
    n = Fu(o),
    { alb: i, orm: a } = n,
    r = wh(3301),
    l = _5(o);
  l.globalCompositeOperation = "lighter";
  let c = [-0.56, 0.3, 1.24],
    h = (R, C, L) => {
      let A = r() * o,
        O = r() * o,
        H = r.pick(c) + r.range(-0.13, 0.13) + (r() < 0.5 ? Math.PI : 0),
        F = r.range(C[0], C[1]) * s,
        P = r.range(L[0], L[1]) * s,
        z =
          r() < 0.35
            ? [
                [-F / 2, r.range(-0.2, 0.2) * P],
                [F * r.range(-0.2, 0.25), P / 2],
                [F / 2, r.range(-0.5, 0.1) * P],
              ]
            : [
                [-F / 2, r.range(-0.3, 0.3) * P],
                [F * r.range(-0.3, 0.05), P / 2],
                [F / 2, r.range(-0.1, 0.4) * P],
                [F * r.range(0, 0.35), -P / 2],
              ];
      ((l.fillStyle = R),
        y2(l, o, A, O, F / 2 + 2, () => {
          (l.save(),
            l.translate(A, O),
            l.rotate(H),
            l.beginPath(),
            z.forEach((k, I) =>
              I ? l.lineTo(k[0], k[1]) : l.moveTo(k[0], k[1]),
            ),
            l.closePath(),
            l.fill(),
            l.restore());
        }));
    };
  for (let R = 0; R < 92; R++) h("rgb(255,0,0)", [18, 62], [6, 19]);
  for (let R = 0; R < 70; R++) h("rgb(0,255,0)", [14, 50], [4, 14]);
  for (let R = 0; R < 30; R++) h("rgb(0,0,255)", [10, 30], [2.5, 7]);
  let [f, u, d] = S4(l, o, "rgb"),
    m = pf(f, o, 1),
    p = pf(u, o, 1),
    x = pf(d, o, 1),
    g = _o(o, 4, 4, 4, 302),
    b = _o(o, 2, 3, 3, 303),
    v = ql(o, 304),
    y = yp(o).S,
    M = Ey(o, 305, b, 0.93),
    w = new Float32Array(o * o),
    T = 1 - Ty,
    S = [112, 119, 126],
    E = [68, 74, 83],
    _ = [30, 33, 40];
  for (let R = 0, C = 0; R < w.length; R++, C += 4) {
    let L = f[R],
      A = u[R],
      O = d[R],
      H = v[R] - 0.5,
      F = y[R],
      P = S[0] + (E[0] - S[0]) * L,
      z = S[1] + (E[1] - S[1]) * L,
      k = S[2] + (E[2] - S[2]) * L;
    ((P += (_[0] - P) * A),
      (z += (_[1] - z) * A),
      (k += (_[2] - k) * A),
      (P += (S[0] * 1.05 - P) * O),
      (z += (S[1] * 1.05 - z) * O),
      (k += (S[2] * 1.05 - k) * O));
    let I = 0.9 + 0.2 * g[R] + H * 0.05,
      G = 1 - P / 118;
    ((i[C] = P * I + F * 34 * G),
      (i[C + 1] = z * I + F * 34 * G),
      (i[C + 2] = k * I + F * 34 * G),
      (i[C + 3] = 255));
    let K = $o(0.58, 0.8, b[R]);
    ((a[C] = M[R] * 255),
      (a[C + 1] =
        (0.56 - G * 0.1 - K * 0.18 + H * 0.06 - F * 0.2 + (g[R] - 0.5) * 0.14) *
        255),
      (a[C + 2] = 0),
      (a[C + 3] = 255));
    let $ = 4 * m[R] * (1 - m[R]),
      n0 = 4 * p[R] * (1 - p[R]),
      e0 = 4 * x[R] * (1 - x[R]);
    w[R] =
      0.02 * (m[R] + p[R] + x[R]) +
      0.03 * ($ * $ + n0 * n0 + e0 * e0) -
      0.045 * $o(T - 0.05, T + 0.02, M[R]) -
      0.022 * F +
      H * 0.006;
  }
  return (
    z1(w, o, 2.2 / (2 * e), n.nrm, 13),
    {
      N: o,
      tile: 0.24,
      ...n,
    }
  );
}
function $Q(o = 1024) {
  let e = 300 / o,
    s = Fu(o),
    { alb: n, orm: i } = s,
    a = _o(o, 2, 2, 3, 401),
    r = _o(o, 3, 2, 3, 402),
    l = new Float32Array(o * o);
  (T4(l, o, 3, 96, 412, 0.32), T4(l, o, 7, 210, 413, 0.16));
  for (let S = 0; S < l.length; S++) l[S] += 0.5;
  let c = hT(_o(o, 3, 9, 4, 403, 0.5, 512), o, a, r, 120, l, 40),
    h = hT(_o(o, 6, 21, 4, 404, 0.5, 512), o, r, a, 170, l, 50),
    f = new Float32Array(o * o);
  (T4(f, o, 9, 240, 405, 0.55), T4(f, o, 21, 480, 406, 0.45));
  let u = _o(o, 4, 4, 3, 407),
    d = _o(o, 2, 3, 3, 408),
    m = ql(o, 409),
    p = yp(o).S,
    x = Ey(o, 410, d, 0.945),
    g = P1(c, 0.42),
    b = P1(h, 0.68),
    v = new Float32Array(o * o),
    y = 1 - Ty,
    M = [126, 112, 80],
    w = [68, 75, 44],
    T = [21, 21, 20];
  for (let S = 0, E = 0; S < v.length; S++, E += 4) {
    let _ = f[S],
      R = m[S] - 0.5,
      C = p[S],
      L = $o(g - 0.003, g + 0.006, c[S] + _ * 0.012),
      A = h[S] - b + _ * 0.012,
      O = $o(-0.003, 0.005, A),
      H = O * (1 - $o(0, 0.06, A)),
      F = H * t1(-_ * 3.2 - 0.3),
      P = O * (1 - 0.85 * F),
      z = M[0] + (w[0] - M[0]) * L,
      k = M[1] + (w[1] - M[1]) * L,
      I = M[2] + (w[2] - M[2]) * L;
    ((z += (T[0] - z) * P), (k += (T[1] - k) * P), (I += (T[2] - I) * P));
    let G = 0.93 + 0.14 * u[S] + R * 0.04 + _ * 0.07 * (L + P);
    ((n[E] = z * G + C * 24),
      (n[E + 1] = k * G + C * 23),
      (n[E + 2] = I * G + C * 19),
      (n[E + 3] = 255));
    let K = $o(0.58, 0.8, d[S]),
      $ =
        0.66 -
        L * 0.1 -
        P * 0.26 +
        _ * 0.22 * (0.5 * L + P) -
        K * 0.16 +
        R * 0.05 -
        C * 0.2;
    ((i[E] = x[S] * 255),
      (i[E + 1] = $ * 255),
      (i[E + 2] = 0),
      (i[E + 3] = 255),
      (v[S] =
        (0.02 * L + 0.05 * P) * (0.8 + _ * 1.1) +
        R * 0.006 -
        0.05 * $o(y - 0.05, y + 0.02, x[S]) -
        0.022 * C));
  }
  return (
    z1(v, o, 2 / (2 * e), s.nrm, 14),
    {
      N: o,
      tile: 0.3,
      ...s,
    }
  );
}
function ZQ(o = 1024) {
  let e = 200 / o,
    s = Fu(o),
    { alb: n, orm: i } = s,
    a = uf(o, 3, 3, 3, 501, 0.4),
    r = _o(o, 4, 4, 3, 502),
    l = _o(o, 2, 3, 3, 503),
    c = ql(o, 504),
    h = yp(o).S,
    f = Ey(o, 505, l, 0.93),
    u = new Float32Array(o * o);
  for (let E = 0, _ = 0; E < o; E++) {
    let R = (E < o - 1 ? E + 1 : 0) * o,
      C = (E ? E - 1 : o - 1) * o,
      L = E * o;
    for (let A = 0; A < o; A++, _++) {
      let O =
          (a[L + (A < o - 1 ? A + 1 : 0)] - a[L + (A ? A - 1 : o - 1)]) * 0.5,
        H = (a[R + A] - a[C + A]) * 0.5;
      u[_] = Math.sqrt(O * O + H * H);
    }
  }
  let d = P1(u, 0.5),
    m = Math.max(4, Math.round(1 / ((5.5 / e) * d))),
    p = d * 0.22,
    x = P1(a, 0.03),
    g = 1 / (P1(a, 0.97) - x),
    b = new Float32Array(o * o);
  for (let E = 0; E < b.length; E++) {
    let _ = a[E] * m,
      R = Math.round(_),
      C = Math.abs(_ - R) / (m * (u[E] > p ? u[E] : p)),
      L = (R % 5 === 0 ? 0.42 : 0.2) / e;
    b[E] = 1 - $o(L - 0.6, L + 0.6, C);
  }
  let v = pf(b, o, 1),
    y = new Float32Array(o * o),
    M = 1 - Ty,
    w = o / 8,
    T = 0,
    S = 0;
  for (let E = 0; E < o; E++)
    for (let _ = 0; _ < o; _++, T++, S += 4) {
      let R = b[T],
        C = c[T] - 0.5,
        L = h[T],
        A = Math.abs(((_ + w / 2) % w) - w / 2),
        O = Math.abs(((E + w / 2) % w) - w / 2),
        H = (A < 7 && O < 0.9) || (O < 7 && A < 0.9) ? 1 : 0,
        F = Math.max(1 - $o(0.4, 1.3, Math.min(A, O)), H) * (1 - R),
        P = t1((a[T] - x) * g),
        z = (0.72 + 0.62 * P * P) * (0.92 + 0.16 * r[T]) + C * 0.08,
        k = 0.9 + 0.14 * r[T] + C * 0.05;
      ((n[S] = Wl(19 * z, 194 * k, R) + L * 24),
        (n[S + 1] = Wl(20 * z, 90 * k, R) + L * 22),
        (n[S + 2] = Wl(24 * z, 22 * k, R) + L * 20),
        (n[S + 3] = 255));
      let I = $o(0.58, 0.8, l[T]);
      ((i[S] = f[T] * 255),
        (i[S + 1] =
          (Wl(0.72 - F * 0.34, 0.3, R) -
            I * 0.2 * (1 - R) +
            C * 0.06 -
            L * 0.2) *
          255),
        (i[S + 2] = 0),
        (i[S + 3] = 255),
        (y[T] =
          0.034 * v[T] +
          0.008 * F +
          C * 0.006 * (1 - R) -
          0.045 * $o(M - 0.05, M + 0.02, f[T]) -
          0.022 * L));
    }
  return (
    z1(y, o, 2 / (2 * e), s.nrm, 15),
    {
      N: o,
      tile: 0.2,
      ...s,
    }
  );
}
function QQ(o = 1024) {
  let s = 96 / o,
    n = o / 48,
    i = Fu(o),
    { alb: a, orm: r } = i,
    l = _o(o, 2, 2, 2, 601),
    c = _o(o, 2, 2, 2, 602),
    h = _o(o, 3, 3, 2, 603),
    f = ql(o, 604),
    u = wh(605),
    d = 16,
    m = new Float32Array(48 * 2),
    p = new Float32Array(48 * 2 * d);
  for (let y = 0; y < m.length; y++) m[y] = u();
  for (let y = 0; y < p.length; y++) p[y] = u();
  let x = new Float32Array(o * o),
    g = new Uint8ClampedArray(o * o * 4),
    b = 0,
    v = 0;
  for (let y = 0; y < o; y++)
    for (let M = 0; M < o; M++, b++, v += 4) {
      let w = (M + (l[b] - 0.5) * n * 1.3) / n + 48,
        T = (y + (c[b] - 0.5) * n * 1.3) / n + 48,
        S = Math.floor(w),
        E = Math.floor(T),
        _ = w - S,
        R = T - E,
        C = (((S - E) % 4) + 4) % 4,
        L,
        A,
        O;
      C < 2
        ? ((L = _), (A = 1 - C + R), (O = S % 48))
        : ((L = R), (A = C - 2 + _), (O = 48 + (E % 48)));
      let H = Math.abs(L * 2 - 1),
        F = H * H,
        P = 1 - F * F,
        z = Math.sin(Math.PI * A * 0.5),
        k = 0.5 + 0.5 * z,
        I = L * (d - 1),
        G = Math.floor(I),
        K = I - G,
        $ = O * d + G,
        n0 = p[$] + (p[$ + (G < d - 1 ? 1 : 0)] - p[$]) * K;
      x[b] = 0.11 * P * k + 0.02 * (n0 - 0.5) * P + (f[b] - 0.5) * 0.004;
      let e0 = F * F * F * F,
        p0 =
          (0.45 + 0.55 * k) *
          (1 - 0.8 * e0) *
          (0.84 + 0.32 * m[O]) *
          (0.9 + 0.2 * h[b]),
        t0 = 0.88 + 0.24 * n0;
      ((a[v] = 70 * p0 * t0),
        (a[v + 1] = 72 * p0 * t0),
        (a[v + 2] = 78 * p0 * t0),
        (a[v + 3] = 255),
        (r[v] = 0),
        (r[v + 1] = (0.34 + e0 * 0.3 + (n0 - 0.5) * 0.12) * 255),
        (r[v + 2] = 255),
        (r[v + 3] = 255),
        C < 2
          ? ((g[v] = 255), (g[v + 1] = 128))
          : ((g[v] = 128), (g[v + 1] = 255)),
        (g[v + 2] = 255 * P * (0.75 + 0.25 * k)),
        (g[v + 3] = 255));
    }
  return (
    z1(x, o, 1.3 / (2 * s), i.nrm, 16),
    {
      N: o,
      tile: 0.096,
      ...i,
      ani: g,
    }
  );
}
function JQ(o = 1024) {
  let e = 200 / o,
    s = Fu(o),
    { alb: n, orm: i } = s,
    a = _o(o, 2, 2, 3, 701),
    r = _o(o, 2, 3, 3, 702),
    l = hT(uf(o, 2, 3, 4, 703, 0.48), o, a, r, 150),
    c = _o(o, 5, 9, 2, 704),
    h = ql(o, 705),
    f = _o(o, 3, 3, 3, 706),
    u = yp(o).S,
    d = 38,
    m = 19,
    p = new Float32Array(o * o);
  for (let M = 0, w = 0; M < o; M++) {
    let T = (m * M) / o;
    for (let S = 0; S < o; S++, w++) p[w] = d * l[w] + T;
  }
  let x = new Float32Array(o * o),
    g = wh(708),
    b = new Float32Array(256);
  for (let M = 0; M < 256; M++) b[M] = g();
  let v = 0,
    y = 0;
  for (let M = 0; M < o; M++) {
    let w = (M < o - 1 ? M + 1 : 0) * o,
      T = (M ? M - 1 : o - 1) * o,
      S = M * o;
    for (let E = 0; E < o; E++, v++, y += 4) {
      let _ =
          (p[S + (E < o - 1 ? E + 1 : 0)] - p[S + (E ? E - 1 : o - 1)]) * 0.5,
        R = p[w + E] - p[T + E];
      ((M === 0 || M === o - 1) && (R += m), (R *= 0.5));
      let C = Math.sqrt(_ * _ + R * R) * Oo,
        L = p[v],
        A = (c[v] - 0.5) * 1.1,
        O = Math.sin(Oo * L) + A + 0.4 * Math.sin(Oo * 2 * L + 1.3),
        H = Math.max(0.02, C * 1.1),
        F = $o(-H, H, O),
        P = $o(0.5, 1.6, C);
      F = F + (0.55 - F) * P;
      let z = b[Math.floor(L) & 255],
        k = h[v] - 0.5,
        I = u[v] * 0.5,
        G = 0.9 + 0.16 * f[v],
        K = 0.84 + 0.32 * z,
        $ = (122 + z * 10) * K,
        n0 = (117 + z * 4) * K,
        e0 = (112 - z * 8 + 8) * K;
      ((n[y] = Wl($, 200 * G, F) + I * 60 * (1 - F)),
        (n[y + 1] = Wl(n0, 197 * G, F) + I * 60 * (1 - F)),
        (n[y + 2] = Wl(e0, 190 * G, F) + I * 60 * (1 - F)),
        (n[y + 3] = 255),
        (i[y] = I * 0.5 * 255),
        (i[y + 1] =
          (Wl(0.5 + k * 0.16, 0.19 + k * 0.04, F) +
            I * 0.1 * F -
            I * 0.12 * (1 - F)) *
          255),
        (i[y + 2] = 255),
        (i[y + 3] = 255),
        (x[v] = 0.05 * F + (1 - F) * k * 0.014 - 0.012 * I));
    }
  }
  return (
    z1(pf(x, o, 1), o, 1.5 / (2 * e), s.nrm, 17),
    {
      N: o,
      tile: 0.2,
      ...s,
    }
  );
}
function tJ(o = 2048) {
  let e = 180 / o,
    s = 1 / e,
    n = Fu(o),
    { alb: i, orm: a } = n,
    r = wh(8088),
    l = _5(o);
  ((l.lineCap = "round"), (l.lineJoin = "round"));
  let c = (H) => {
      ((l.globalCompositeOperation = "source-over"),
        H > 0 &&
          ((l.strokeStyle = d ? "rgb(0,0,255)" : "#000"),
          (l.lineWidth = H * 2),
          l.stroke()),
        (l.fillStyle = d ? "rgb(255,0,255)" : "rgb(255,0,0)"),
        l.fill());
    },
    h = (H) => {
      ((l.globalCompositeOperation = "lighter"),
        (l.strokeStyle = "rgb(0,255,0)"),
        (l.lineWidth = H),
        l.stroke());
    },
    f = 0.17 * s,
    u = [],
    d = !1,
    m = (H, F, P) => {
      for (let z of u) {
        let k = Math.abs(H - z[0]),
          I = Math.abs(F - z[1]);
        if (
          (k > o / 2 && (k = o - k),
          I > o / 2 && (I = o - I),
          k * k + I * I < (P + z[2]) * (P + z[2]))
        )
          return !1;
      }
      return !0;
    },
    p = [
      [o * 0.27, o * 0.3, 15.5 * s],
      [o * 0.77, o * 0.8, 15.5 * s],
    ];
  for (let H of p) u.push([H[0], H[1], H[2] * 1.05]);
  let x = (H, F, P) => {
      y2(l, o, H, F, P * 1.1, () => {
        (l.save(),
          l.translate(H, F),
          (l.globalCompositeOperation = "multiply"),
          (l.fillStyle = "rgb(0,0,255)"),
          l.beginPath(),
          l.arc(0, 0, P * 1.035, 0, Oo),
          l.fill(),
          (l.globalCompositeOperation = "lighter"),
          (l.fillStyle = "rgb(0,0,255)"),
          l.beginPath(),
          l.arc(0, 0, P * 0.985, 0, Oo),
          l.fill(),
          l.beginPath(),
          l.arc(0, 0, P, 0, Oo),
          l.arc(0, 0, P * 0.925, 0, Oo, !0),
          c(f * 0.5));
        let z = 46;
        for (let I = 0; I < z; I++) {
          let G = (I / z) * Oo;
          (l.beginPath(),
            l.arc(
              Math.cos(G) * P * 0.868,
              Math.sin(G) * P * 0.868,
              P * 0.036,
              0,
              Oo,
            ),
            c(0));
        }
        (l.beginPath(),
          l.arc(0, 0, P * 0.812, 0, Oo),
          l.arc(0, 0, P * 0.785, 0, Oo, !0),
          c(0));
        let k = 16;
        for (let I = 0; I < k * 2; I++) {
          let G = (I / (k * 2)) * Oo,
            K = I % 2 === 0,
            $ = P * 0.25,
            n0 = P * (K ? 0.765 : 0.54),
            e0 = P * (K ? 0.052 : 0.036);
          (l.save(),
            l.rotate(G),
            l.beginPath(),
            l.moveTo($, -e0),
            l.lineTo(n0, 0),
            l.lineTo($, e0),
            l.closePath(),
            c(0),
            K &&
              (l.beginPath(),
              l.moveTo($ * 1.15, 0),
              l.lineTo(n0 * 0.9, 0),
              h(0.12 * s)),
            l.restore());
        }
        (l.beginPath(),
          l.arc(0, 0, P * 0.24, 0, Oo),
          c(f * 0.6),
          l.beginPath(),
          l.arc(0, 0, P * 0.165, 0, Oo),
          h(0.2 * s),
          l.beginPath(),
          l.arc(0, 0, P * 0.963, 0, Oo),
          h(0.16 * s),
          l.restore());
      });
    },
    g = 1.6,
    b = 1 / g,
    v = [];
  for (let [H, F] of [
    [10.5, 500],
    [8.6, 800],
    [7, 1200],
    [5.6, 2e3],
    [4.4, 3e3],
    [3.4, 4500],
    [2.7, 5e3],
  ])
    for (let P = 0; P < F; P++) {
      let z = H * (0.93 + 0.14 * r()) * s,
        k = r() * o,
        I = r() * o;
      if (!m(k, I, z * 0.8)) continue;
      let G = 1e9,
        K = r() * Oo;
      for (let n0 of u) {
        let e0 = n0[0] - k,
          p0 = n0[1] - I;
        (e0 > o / 2 ? (e0 -= o) : e0 < -o / 2 && (e0 += o),
          p0 > o / 2 ? (p0 -= o) : p0 < -o / 2 && (p0 += o));
        let t0 = Math.hypot(e0, p0) - n0[2];
        t0 < G && ((G = t0), (K = Math.atan2(p0, e0)));
      }
      let $ = v.length % 2 ? 1 : -1;
      (u.push([k, I, z]),
        v.push({
          x: k,
          y: I,
          R0: z,
          hand: $,
          a0: K + $ * 2,
        }));
    }
  let y = (H) => {
    let { R0: F, hand: P, a0: z } = H,
      k = F * 0.8,
      I = ($) =>
        $ < 0 ? k * (1 - $ * 1.5) : k * (0.9 * Math.pow(1 - $, 0.82) + 0.1);
    return {
      rad: I,
      wid: ($) =>
        F *
        ($ < 0
          ? 0.082 * Math.pow(Math.max(0, 1 + $ / 0.2), 0.8)
          : 0.082 - 0.04 * $),
      pt: ($) => {
        let n0 = z + P * $ * g * Oo,
          e0 = I($);
        return [Math.cos(n0) * e0, Math.sin(n0) * e0, n0, e0];
      },
    };
  };
  for (let H of v) {
    let { wid: F, pt: P } = y(H),
      z = 84;
    y2(l, o, H.x, H.y, H.R0 * 1.25, () => {
      (l.save(), l.translate(H.x, H.y));
      let k = [],
        I = [];
      for (let K = -17; K <= z; K++) {
        let $ = K / z,
          n0 = P($),
          e0 = Math.max(0.2, F($)),
          p0 = Math.cos(n0[2]),
          t0 = Math.sin(n0[2]);
        (k.push([n0[0] + p0 * e0, n0[1] + t0 * e0]),
          I.push([n0[0] - p0 * e0, n0[1] - t0 * e0]));
      }
      (l.beginPath(),
        k.forEach((K, $) => ($ ? l.lineTo(K[0], K[1]) : l.moveTo(K[0], K[1]))));
      for (let K = I.length - 1; K >= 0; K--) l.lineTo(I[K][0], I[K][1]);
      (l.closePath(), c(f));
      let G = P(1);
      (l.beginPath(),
        l.arc(G[0], G[1], H.R0 * 0.115, 0, Oo),
        c(f),
        l.beginPath());
      for (let K = -6; K < z - 8; K++) {
        let $ = P(K / z);
        K === -6 ? l.moveTo($[0], $[1]) : l.lineTo($[0], $[1]);
      }
      (h(0.13 * s), l.restore());
    });
  }
  for (let H of v) {
    let { rad: F, wid: P, pt: z } = y(H),
      { R0: k, hand: I } = H,
      G = k < 4.6 * s,
      K = Math.round((G ? 9 : 13) + k / (1.6 * s));
    y2(l, o, H.x, H.y, k * 1.25, () => {
      (l.save(), l.translate(H.x, H.y));
      for (let $ = 0; $ < K; $++) {
        let n0 = -0.06 + (($ + 0.5) / K) * 0.92,
          e0 = z(n0),
          p0 = P(n0),
          M0 = (n0 < b ? k * 1.2 : F(n0 - b) - P(n0 - b) * 1.2) - e0[3] - p0;
        if (M0 < k * 0.07) continue;
        let f0 = 0.92,
          _0 =
            Math.min((M0 / Math.cos(f0)) * 0.98, k * 0.62) * (0.9 + 0.2 * r()),
          F0 = Math.min(_0 * 0.56, k * 0.3);
        if (
          (l.save(),
          l.translate(
            e0[0] + Math.cos(e0[2]) * p0 * 0.7,
            e0[1] + Math.sin(e0[2]) * p0 * 0.7,
          ),
          l.rotate(e0[2] - I * f0),
          I > 0 && l.scale(1, -1),
          l.beginPath(),
          l.moveTo(0, F0 * 0.28),
          l.bezierCurveTo(
            _0 * 0.22,
            F0 * 0.62,
            _0 * 0.72,
            F0 * 0.5,
            _0,
            -F0 * 0.28,
          ),
          l.bezierCurveTo(
            _0 * 0.82,
            -F0 * 0.2,
            _0 * 0.6,
            -F0 * 0.6,
            _0 * 0.3,
            -F0 * 0.52,
          ),
          l.bezierCurveTo(_0 * 0.12, -F0 * 0.46, 0, -F0 * 0.3, 0, F0 * 0.28),
          c(f),
          _0 > 1.3 * s &&
            (l.beginPath(),
            l.moveTo(_0 * 0.06, 0),
            l.quadraticCurveTo(_0 * 0.5, F0 * 0.16, _0 * 0.9, -F0 * 0.2),
            h(0.12 * s)),
          _0 > 2.6 * s)
        )
          for (let m0 = 1; m0 <= 2; m0++) {
            let S0 = 0.22 + m0 * 0.2;
            (l.beginPath(),
              l.moveTo(_0 * S0, F0 * 0.05),
              l.quadraticCurveTo(
                _0 * (S0 + 0.1),
                -F0 * 0.2,
                _0 * (S0 + 0.05),
                -F0 * 0.4,
              ),
              h(0.09 * s));
          }
        l.restore();
      }
      l.restore();
    });
  }
  for (let H = 0; H < 4200; H++) {
    let F = r.range(0.36, 0.62) * s,
      P = r() * o,
      z = r() * o;
    m(P, z, F + 0.5 * s) &&
      (u.push([P, z, F + 0.4 * s]),
      y2(l, o, P, z, F + f, () => {
        (l.beginPath(), l.arc(P, z, F, 0, Oo), c(0));
      }));
  }
  d = !0;
  for (let H of p) x(H[0], H[1], H[2]);
  let M = l.getImageData(0, 0, o, o).data,
    w = o * o,
    T = new Float32Array(w);
  for (let H = 0, F = 0; H < w; H++, F += 4) T[H] = M[F] * (1 / 255);
  let S = lA(T, o, 2, 2),
    E = o >> 1,
    _ = new Float32Array(E * E);
  for (let H = 0; H < E; H++)
    for (let F = 0; F < E; F++) {
      let P = H * 2 * o + F * 2;
      _[H * E + F] = (T[P] + T[P + 1] + T[P + o] + T[P + o + 1]) * 0.25;
    }
  let R = df(lA(_, E, 4, 2), E, o),
    C = ql(o, 801),
    L = _o(o, 3, 3, 3, 802),
    A = df(yp(E).S, E, o),
    O = new Float32Array(w);
  for (let H = 0, F = 0; H < w; H++, F += 4) {
    let P = T[H],
      z = S[H],
      k = R[H],
      I = M[F + 1] * (1 / 255) * P,
      G = C[H] - 0.5,
      K = A[H] * 0.45,
      $ = $o(0.3, 0.92, z) * 0.55 + $o(0.35, 1, k) * 0.45,
      n0 = 1 - $o(0.12, 0.5, z),
      e0 = M[F + 2] > 128 ? 1 : 0;
    O[H] = 0.17 * $ - 0.06 * I + n0 * G * (e0 ? 0.035 : 0.085) - 0.005 * K * P;
    let p0 = 4 * z * (1 - z),
      t0 = t1(n0 * 0.7 + p0 * 0.3 + I * 0.8),
      M0 = 0.95 + 0.1 * L[H];
    ((i[F] = Wl(250 * M0, 146, t0) - G * 26 * n0),
      (i[F + 1] = Wl(203 * M0, 98, t0) - G * 20 * n0),
      (i[F + 2] = Wl(108 * M0, 36, t0) - G * 8 * n0),
      (i[F + 3] = 255));
    let f0 = Wl(
      0.12 + (L[H] - 0.5) * 0.1 + K * 0.3,
      0.5 + G * 0.22,
      t1(n0 + I * 0.85),
    );
    ((a[F] = 0), (a[F + 1] = f0 * 255), (a[F + 2] = 255), (a[F + 3] = 255));
  }
  return (
    z1(O, o, 1.2 / (2 * e), n.nrm, 18),
    {
      N: o,
      tile: 0.18,
      ...n,
    }
  );
}
function eJ(o = 1024) {
  let e = 200 / o,
    s = Fu(o),
    { alb: n, orm: i } = s,
    a = o >> 1,
    r = e * 2,
    l = SF(a, 13, 901, 0.9, 20),
    c = wh(902),
    h = l.cells,
    f = new Float32Array(h),
    u = new Float32Array(h),
    d = new Float32Array(h),
    m = new Float32Array(h),
    p = new Float32Array(h),
    x = new Float32Array(h),
    g = new Float32Array(h),
    b = new Float32Array(h);
  for (let $ = 0; $ < h; $++) {
    let n0 = c() * Oo,
      e0 = 0.015 + 0.05 * c();
    ((f[$] = Math.cos(n0) * e0),
      (u[$] = Math.sin(n0) * e0),
      (d[$] = (c() < 0.8 ? 1 : -0.6) * (0.012 + 0.022 * c())));
    let p0 = c() * Oo,
      t0 = 13 + 9 * c();
    ((m[$] = Math.cos(p0) * t0),
      (p[$] = Math.sin(p0) * t0),
      (x[$] = c() < 0.55 ? 2.4 + 2.6 * c() : 0),
      (g[$] = c() < 0.08 ? 0.16 + 0.2 * c() : 0),
      (b[$] = c()));
  }
  let v = new Float32Array(a * a),
    y = new Float32Array(a * a),
    M = new Float32Array(a * a),
    w = new Float32Array(a * a);
  for (let $ = 0; $ < v.length; $++) {
    let n0 = l.id[$],
      e0 = l.vx[$] * r,
      p0 = l.vy[$] * r,
      t0 = e0 - m[n0],
      M0 = p0 - p[n0],
      f0 = Math.hypot(t0, M0) + 0.001,
      _0 = x[n0]
        ? Math.sin((f0 * Oo) / x[n0]) * 0.2 * Math.exp(-f0 * 0.085)
        : 0;
    ((v[$] = f[n0] + e0 * d[n0] + (t0 / f0) * _0),
      (y[$] = u[n0] + p0 * d[n0] + (M0 / f0) * _0),
      (M[$] = g[n0]),
      (w[$] = b[n0]));
  }
  let T = df(v, a, o),
    S = df(y, a, o),
    E = df(M, a, o),
    _ = df(w, a, o),
    R = df(l.edge, a, o),
    C = df(l.crack, a, o),
    L = _o(o, 2, 2, 3, 903),
    A = _o(o, 2, 2, 2, 904),
    O = _o(o, 9, 9, 2, 905),
    H = ql(o, 906),
    F = _o(o, 4, 4, 3, 907),
    P = new Uint8ClampedArray(o * o * 4),
    z = new Float32Array(o * o),
    k = P1(L, 0.22),
    I = P1(L, 0.75),
    G = P1(A, 0.01),
    K = 1 / (P1(A, 0.99) - G);
  for (let $ = 0, n0 = 0; $ < z.length; $++, n0 += 4) {
    let e0 = C[$] * r,
      p0 = R[$] * r,
      t0 = H[$] - 0.5,
      M0 = 0.2 + 0.6 * O[$] * O[$],
      f0 = 1 - $o(M0 * 0.55, M0 * 1.25, e0),
      _0 = 1 - $o(M0, M0 + 0.8, e0),
      F0 = 1 - $o(0, 0.35, p0),
      m0 = $o(k, I, L[$]),
      S0 = (1 - $o(M0 * 0.15, M0 * 0.95, e0)) * (0.25 + 0.75 * m0),
      T0 = e0 < 6 ? Math.exp(-e0 / 0.9) * m0 * 0.12 : 0;
    z[$] = -0.4 * f0 - 0.05 * _0 + 0.012 * F0;
    let j0 = _[$],
      Z0 = 0.8 + 0.4 * F[$],
      lt = E[$],
      H0 = (9 + j0 * 7 + lt * 26) * Z0,
      Y0 = (9 + j0 * 2 + lt * 25) * Z0,
      et = (11 - j0 * 3 + lt * 26) * Z0;
    ((n[n0] = Wl(H0, 30, f0 * 0.6) + t0 * 2),
      (n[n0 + 1] = Wl(Y0, 22, f0 * 0.6) + t0 * 2),
      (n[n0 + 2] = Wl(et, 18, f0 * 0.6) + t0 * 2),
      (n[n0 + 3] = 255),
      (i[n0] = 0),
      (i[n0 + 1] = (0.055 + lt + f0 * 0.6 + F0 * 0.08 + t0 * 0.025) * 255),
      (i[n0 + 2] = 0),
      (i[n0 + 3] = 255),
      (P[n0] = 255 * t1(S0 * 1.2 + T0 * 2.2)),
      (P[n0 + 1] = 255 * t1(S0 * S0 * 0.6 + T0 * 0.3)),
      (P[n0 + 2] = 255 * t1(S0 * S0 * S0 * 0.2)),
      (P[n0 + 3] = t1((A[$] - G) * K) * 255));
    let ct = 1 - f0;
    ((T[$] *= ct), (S[$] *= ct));
  }
  return (
    z1(z, o, 1.2 / (2 * e), s.nrm, 19, T, S),
    {
      N: o,
      tile: 0.2,
      ...s,
      emi: P,
    }
  );
}
var RF = {
  dune: XQ,
  timberline: YQ,
  fracture: jQ,
  tigerstripe: $Q,
  topo: ZQ,
  carbon: QQ,
  damascus: JQ,
  gold: tJ,
  obsidian: eJ,
};
var sJ = {};
var hA = {
  metal: {
    detail: "spray",
    dN: 0.26,
    dR: 0.1,
    under: 3421242,
    underRM: [0.42, 0.65],
    bare: 11119794,
    bareRM: [0.42, 1],
    bareK: 0.86,
    edgeMul: 1,
    roughAdd: 0,
    metalMul: 1,
  },
  polymer: {
    detail: "grain",
    dN: 0.5,
    dR: 0.12,
    under: 2828840,
    underRM: [0.55, 0],
    bare: 2828840,
    bareRM: [0.55, 0],
    bareK: 0,
    edgeMul: 0.8,
    roughAdd: 0.05,
    metalMul: 0.6,
  },
  furniture: {
    detail: "stipple",
    dN: 0.9,
    dR: 0.14,
    under: 2039325,
    underRM: [0.66, 0],
    bare: 2039325,
    bareRM: [0.66, 0],
    bareK: 0,
    edgeMul: 0.7,
    roughAdd: 0.09,
    metalMul: 0.45,
  },
};
var R5 = {
  dune: {
    span: 0.062,
    at: [0.5, 0.5],
    all: {
      wear: [0.1, 0.34],
    },
  },
  timberline: {
    span: 0.15,
    at: [0.42, 0.5],
    all: {
      wear: [0.1, 0.42],
    },
  },
  fracture: {
    span: 0.105,
    at: [0.5, 0.5],
    all: {
      wear: [0.1, 0.3],
    },
  },
  tigerstripe: {
    span: 0.125,
    at: [0.5, 0.5],
    all: {
      wear: [0.1, 0.34],
    },
  },
  topo: {
    span: 0.075,
    at: [0.5, 0.5],
    all: {
      wear: [0.1, 0.3],
    },
  },
  carbon: {
    span: 0.036,
    at: [0.5, 0.5],
    physical: !0,
    all: {
      wear: [0, 0],
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      dN: 0,
      dR: 0,
      anisotropy: 0.8,
    },
    polymer: {
      clearcoat: 0.8,
      clearcoatRoughness: 0.09,
      dN: 0.16,
      dR: 0.06,
      metalMul: 1,
      roughAdd: 0.04,
    },
    furniture: {
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
      dN: 0.5,
      dR: 0.1,
      metalMul: 1,
      roughAdd: 0.1,
    },
  },
  damascus: {
    span: 0.075,
    at: [0.5, 0.5],
    all: {
      wear: [0.06, 0.3],
      under: 12172221,
      underRM: [0.26, 1],
      bareK: 0,
    },
    metal: {
      detail: "hairline",
      dN: 0.12,
      dR: 0.1,
    },
    polymer: {
      metalMul: 0.95,
      roughAdd: 0.05,
      dN: 0.34,
    },
    furniture: {
      metalMul: 0.92,
      roughAdd: 0.09,
      dN: 0.6,
    },
  },
  gold: {
    span: 0.066,
    at: [0.27, 0.3],
    all: {
      wear: [0, 0],
    },
    metal: {
      detail: "hairline",
      dN: 0.07,
      dR: 0.16,
    },
    polymer: {
      metalMul: 0.97,
      roughAdd: 0.05,
      dN: 0.26,
    },
    furniture: {
      metalMul: 0.95,
      roughAdd: 0.09,
      dN: 0.36,
    },
  },
  obsidian: {
    span: 0.085,
    at: [0.5, 0.5],
    physical: !0,
    emissive: 4.6,
    all: {
      wear: [0, 0],
      ior: 2,
    },
    metal: {
      detail: "hairline",
      dN: 0.04,
      dR: 0.05,
    },
    polymer: {
      roughAdd: 0.2,
      dN: 0.12,
      ior: 1.7,
    },
    furniture: {
      roughAdd: 0.3,
      dN: 0.4,
      ior: 1.6,
    },
  },
};
var PF = (o, t) => ({
  ...hA[t],
  ...(R5[o].all || {}),
  ...(R5[o][t] || {}),
});
var fT = new Map();
var _4 = null;
function fA(o) {
  let t = fT.get(o);
  return (t || fT.set(o, (t = {})), t);
}
function zF(o) {
  let t = fA(o);
  if (!t.raw) {
    let e = performance.now();
    if (
      ((t.raw = RF[o]()),
      (sJ[o] = performance.now() - e),
      (t.N = t.raw.N),
      (t.tile = t.raw.tile),
      LF(o),
      !t.tex)
    ) {
      if (_4 && _4 !== o) {
        let s = fT.get(_4);
        s && !s.tex && (s.raw = null);
      }
      _4 = o;
    }
  }
  return t.raw;
}
function LF(o) {
  let t = fA(o);
  if (t.crop) return t.crop;
  let e = o === "factory" ? rJ() : zF(o);
  if (t.crop) return t.crop;
  let s = R5[o] || {
      span: 0.05,
      at: [0.5, 0.5],
    },
    n = e.N,
    i = n - 1,
    a = (s.span / e.tile) * n,
    r = Math.max(1, Math.ceil(a / 512)),
    l = Math.round(a / r),
    c = Math.round(s.at[0] * n - a / 2),
    h = Math.round(s.at[1] * n - a / 2),
    f = 1 / (r * r),
    u = (d) => {
      if (!d) return null;
      let m = new Uint8ClampedArray(l * l * 4);
      for (let p = 0, x = 0; p < l; p++)
        for (let g = 0; g < l; g++, x += 4) {
          let b = 0,
            v = 0,
            y = 0,
            M = 0;
          for (let w = 0; w < r; w++) {
            let T = ((h + p * r + w) & i) * n;
            for (let S = 0; S < r; S++) {
              let E = (T + ((c + g * r + S) & i)) * 4;
              ((b += d[E]), (v += d[E + 1]), (y += d[E + 2]), (M += d[E + 3]));
            }
          }
          ((m[x] = b * f),
            (m[x + 1] = v * f),
            (m[x + 2] = y * f),
            (m[x + 3] = M * f));
        }
      return m;
    };
  return (t.crop = {
    n: l,
    alb: u(e.alb),
    nrm: u(e.nrm),
    orm: u(e.orm),
    emi: u(e.emi),
  });
}
function nJ(o) {
  let t = fA(o);
  if (t.tex) return t.tex;
  let e = zF(o),
    s = (n, i) => {
      let a = new DataTexture(
        new Uint8Array(n.buffer),
        e.N,
        e.N,
        RGBAFormat,
        UnsignedByteType,
      );
      return (
        (a.wrapS = a.wrapT = RepeatWrapping),
        (a.magFilter = LinearFilter),
        (a.minFilter = LinearMipmapLinearFilter),
        (a.generateMipmaps = !0),
        (a.anisotropy = 8),
        a.repeat.set(1 / e.tile, 1 / e.tile),
        i && (a.colorSpace = SRGBColorSpace),
        (a.needsUpdate = !0),
        a
      );
    };
  return (
    (t.tex = {
      map: s(e.alb, !0),
      normalMap: s(e.nrm, !1),
      orm: s(e.orm, !1),
    }),
    e.emi && (t.tex.emissiveMap = s(e.emi, !0)),
    e.ani && (t.tex.anisotropyMap = s(e.ani, !1)),
    (t.raw = null),
    _4 === o && (_4 = null),
    t.tex
  );
}
var oJ = {
  spray: 0.032,
  grain: 0.04,
  stipple: 0.0324,
  hairline: 0.05,
  none: 1,
};
var cA = {};
function iJ(o) {
  if (cA[o]) return cA[o];
  let t = o === "none" ? 2 : 512,
    e = new Float32Array(t * t),
    s = new Float32Array(t * t).fill(0.5),
    n = 1;
  if (o === "spray") {
    let r = ql(t, 31),
      l = pf(r, t, 1),
      c = uf(t, 90, 90, 2, 32);
    for (let h = 0; h < e.length; h++)
      ((e[h] = (l[h] - 0.5) * 1.3 + (c[h] - 0.5) * 2.2 + (r[h] - 0.5) * 0.22),
        (s[h] = 0.5 + (r[h] - 0.5) * 0.5 + (c[h] - 0.5) * 0.9));
    n = 1;
  } else if (o === "grain") {
    let r = uf(t, 104, 104, 2, 33),
      l = ql(t, 34);
    for (let c = 0; c < e.length; c++) {
      let h = r[c] * 1.6 - 0.3;
      ((e[c] = h * h * 2.4 + (l[c] - 0.5) * 0.12),
        (s[c] = 0.5 + (r[c] - 0.5) * 1.2));
    }
    n = 1.25;
  } else if (o === "stipple") {
    let c = t / 36,
      h = t / 42,
      f = ql(t, 35);
    for (let u = 0, d = 0; u < t; u++)
      for (let m = 0; m < t; m++, d++) {
        let p = Math.floor(u / h),
          x = ((m + (p & 1) * c * 0.5) % c) / c - 0.5,
          g = (u % h) / h - 0.5,
          b = Math.hypot(x * c, g * h) / (c * 0.44),
          v = b < 1 ? Math.cos(b * Math.PI * 0.5) : 0;
        ((e[d] = v * 2.6 + (f[d] - 0.5) * 0.12), (s[d] = 0.62 - v * 0.3));
      }
    n = 1;
  } else if (o === "hairline") {
    let r = _5(t),
      l = wh(36);
    r.globalCompositeOperation = "lighter";
    for (let h = 0; h < 1300; h++) {
      let f = l() * t,
        u = l() * t,
        d = l() < 0.5 ? (l() - 0.5) * 0.7 : l() * Oo,
        m = 20 + l() * l() * 300,
        p = 0.05 + 0.5 * l() * l() * l();
      ((r.strokeStyle = `rgba(255,255,255,${p.toFixed(3)})`),
        (r.lineWidth = 0.7 + l() * 0.5),
        y2(r, t, f, u, m / 2 + 2, () => {
          (r.beginPath(),
            r.moveTo(f - (Math.cos(d) * m) / 2, u - (Math.sin(d) * m) / 2),
            r.lineTo(f + (Math.cos(d) * m) / 2, u + (Math.sin(d) * m) / 2),
            r.stroke());
        }));
    }
    let c = S4(r, t, "r")[0];
    for (let h = 0; h < e.length; h++)
      ((e[h] = -c[h] * 1.6), (s[h] = 0.5 + Math.min(0.5, c[h] * 0.9)));
    n = 1;
  }
  let i = new Uint8ClampedArray(t * t * 4);
  z1(e, t, n * 0.5, i, 3);
  for (let r = 0, l = 0; r < s.length; r++, l += 4)
    ((i[l + 2] = s[r] * 255), (i[l + 3] = 255));
  let a = new DataTexture(
    new Uint8Array(i.buffer),
    t,
    t,
    RGBAFormat,
    UnsignedByteType,
  );
  return (
    (a.wrapS = a.wrapT = RepeatWrapping),
    (a.magFilter = LinearFilter),
    (a.minFilter = LinearMipmapLinearFilter),
    (a.generateMipmaps = !0),
    (a.anisotropy = 4),
    (a.needsUpdate = !0),
    (cA[o] = a)
  );
}
var DF = {
  value: 0,
};
var AF = new Map();
function aJ(o, t, e) {
  ((o.onBeforeCompile = (s) => {
    (Object.assign(s.uniforms, t),
      (s.fragmentShader = s.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
uniform sampler2D uDetailMap; uniform vec3 uDetail; uniform vec3 uWear; uniform vec3 uUnderCol; uniform vec3 uBareCol; uniform vec4 uWearRM; uniform vec2 uRoughMA; uniform float uCamoTime; uniform vec4 uEmber;`,
        )
        .replace(
          "#include <color_fragment>",
          `
vec4 camoD = texture2D( uDetailMap, vNormalMapUv * uDetail.x );
float camoEdge = 0.0;
float camoWorn = 0.0;
#ifdef USE_COLOR
	camoEdge = step( 1.05, vColor.r );
#endif`,
        )
        .replace(
          "#include <metalnessmap_fragment>",
          `#include <metalnessmap_fragment>
{
	float cw = texelRoughness.r;
	float lvl = mix( uWear.x, uWear.y, camoEdge );
	float t1 = smoothstep( 0.96 - lvl, 1.03 - lvl, cw ) * step( 0.001, lvl );
	float l2 = lvl * uWear.z;
	float t2 = smoothstep( 0.955 - l2, 1.045 - l2, cw ) * step( 0.001, l2 );
	roughnessFactor = clamp( roughnessFactor * uRoughMA.x + uRoughMA.y + ( camoD.b - 0.5 ) * uDetail.z, 0.03, 1.0 );
	diffuseColor.rgb = mix( diffuseColor.rgb, uUnderCol, t1 );
	roughnessFactor = mix( roughnessFactor, uWearRM.x, t1 ); metalnessFactor = mix( metalnessFactor, uWearRM.y, t1 );
	diffuseColor.rgb = mix( diffuseColor.rgb, uBareCol, t2 );
	roughnessFactor = mix( roughnessFactor, uWearRM.z, t2 ); metalnessFactor = mix( metalnessFactor, uWearRM.w, t2 );
	camoWorn = t1;
}`,
        )
        .replace(
          "#include <normal_fragment_maps>",
          `
vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
mapN.xy *= normalScale;
mapN.xy += ( camoD.xy * 2.0 - 1.0 ) * uDetail.y * ( 1.0 - 0.7 * camoWorn );
normal = normalize( tbn * mapN );`,
        )),
      e &&
        (s.fragmentShader = s.fragmentShader.replace(
          "#include <emissivemap_fragment>",
          `
vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
float cph = 0.5 + 0.5 * sin( 6.2831853 * ( emissiveColor.a * uEmber.x - uCamoTime * uEmber.y ) );
cph = cph * cph * ( 3.0 - 2.0 * cph );
float cbr = 0.84 + 0.16 * sin( uCamoTime * uEmber.z );
// cooler embers are redder: green and blue fall away first
totalEmissiveRadiance *= emissiveColor.rgb * vec3( 1.0, mix( 0.5, 1.0, cph ), mix( 0.25, 1.0, cph ) ) * mix( uEmber.w, 1.0, cph ) * cbr;`,
        )));
  }),
    (o.customProgramCacheKey = () => "gh-camo-2" + (e ? "-ember" : "")));
}
function xl(o, t = "metal") {
  if (o === "factory" || !R5[o]) return null;
  hA[t] || (t = "metal");
  let e = o + "|" + t,
    s = AF.get(e);
  if (s) return s;
  let n = R5[o],
    i = PF(o, t),
    a = nJ(o),
    r = fT.get(o),
    l = {
      map: a.map,
      normalMap: a.normalMap,
      roughnessMap: a.orm,
      metalnessMap: a.orm,
      roughness: 1,
      metalness: i.metalMul,
      vertexColors: !0,
      envMapIntensity: 1,
    };
  (a.emissiveMap &&
    ((l.emissiveMap = a.emissiveMap),
    (l.emissive = new Color(16777215)),
    (l.emissiveIntensity = n.emissive)),
    n.physical
      ? ((s = new MeshPhysicalMaterial(l)),
        i.clearcoat != null &&
          ((s.clearcoat = i.clearcoat),
          (s.clearcoatRoughness = i.clearcoatRoughness)),
        i.ior != null && (s.ior = i.ior),
        i.anisotropy &&
          a.anisotropyMap &&
          ((s.anisotropy = i.anisotropy), (s.anisotropyMap = a.anisotropyMap)))
      : (s = new MeshStandardMaterial(l)));
  let c = {
    uDetailMap: {
      value: iJ(i.dN || i.dR ? i.detail : "none"),
    },
    uDetail: {
      value: new Vector3(r.tile / oJ[i.detail], i.dN, i.dR),
    },
    uWear: {
      value: new Vector3(i.wear[0], i.wear[1] * i.edgeMul, i.bareK),
    },
    uUnderCol: {
      value: new Color(i.under),
    },
    uBareCol: {
      value: new Color(i.bare),
    },
    uWearRM: {
      value: new Vector4(i.underRM[0], i.underRM[1], i.bareRM[0], i.bareRM[1]),
    },
    uRoughMA: {
      value: new Vector2(1, i.roughAdd),
    },
    uCamoTime: DF,
    uEmber: {
      value: new Vector4(2, 0.07, 0.55, 0.14),
    },
  };
  return (
    aJ(s, c, !!a.emissiveMap),
    (s.name = "camo:" + e),
    (s.userData.camo = o),
    (s.userData.part = t),
    (s.userData.tile = r.tile),
    AF.set(e, s),
    s
  );
}
function IF(o) {
  DF.value = o;
}
var mf = new Float32Array(256);
for (let o = 0; o < 256; o++) {
  let t = o / 255;
  mf[o] = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
}
var kF = (o) => [mf[(o >> 16) & 255], mf[(o >> 8) & 255], mf[o & 255]];
function rJ() {
  let t = new Uint8ClampedArray(262144),
    e = new Uint8ClampedArray(256 * 256 * 4),
    s = new Uint8ClampedArray(256 * 256 * 4),
    n = ql(256, 5),
    i = uf(256, 4, 4, 4, 6),
    a = new Float32Array(256 * 256);
  for (let r = 0, l = 0; r < a.length; r++, l += 4) {
    let c = 0.9 + 0.2 * i[r] + (n[r] - 0.5) * 0.08;
    ((t[l] = 40 * c),
      (t[l + 1] = 41 * c),
      (t[l + 2] = 46 * c),
      (t[l + 3] = 255),
      (s[l] = i[r] * 200),
      (s[l + 1] = (0.42 + (n[r] - 0.5) * 0.08) * 255),
      (s[l + 2] = 0.65 * 255),
      (s[l + 3] = 255),
      (a[r] = n[r] * 0.01));
  }
  return (
    z1(a, 256, 1, e, 4),
    {
      N: 256,
      tile: 0.06,
      alb: t,
      nrm: e,
      orm: s,
    }
  );
}
function CF(o, t, e, s, n) {
  let i = t > 0 ? t : 0,
    a = t < 0 ? -t : 0,
    r = 0.05 + 0.13 * i - 0.03 * a,
    l = 0.058 + 0.16 * i - 0.036 * a,
    c = 0.07 + 0.21 * i - 0.045 * a,
    h = 0.1 + s * 0.5,
    f = Math.exp(-(t * t) / (h * h)) * (0.9 - s * 0.5);
  ((r += f * 0.66), (l += f * 0.62), (c += f * 0.58));
  let u = o * -0.52 + t * 0.66 + e * 0.54,
    d = 0.9 - s * 0.36,
    m = (u - d) / (1 - d + 0.02);
  ((m = m < 0 ? 0 : m > 1 ? 1 : m),
    (m = m * m * (3 - 2 * m) * (5.5 - s * 4.2)),
    (n[0] = r + m),
    (n[1] = l + m * 0.985),
    (n[2] = c + m * 0.96));
}
var vp = [0, 0, 0];
function lJ(o, t, e) {
  let s = document.createElement("canvas");
  s.width = s.height = e;
  let n = s.getContext("2d"),
    i = n.createImageData(e, e),
    a = i.data,
    { n: r, alb: l, nrm: c, orm: h, emi: f } = o,
    u = r - 1,
    d = R5[t] || {
      span: 0.05,
      at: [0.5, 0.5],
    },
    m =
      t === "factory"
        ? {
            ...hA.metal,
            wear: [0.06, 0.42],
          }
        : PF(t, "metal"),
    p = kF(m.under),
    x = kF(m.bare),
    g = 3,
    b = 0.88,
    v = 0.2,
    y = 0.12,
    M = [-0.47, 0.62, 0.63],
    w = [2.9, 2.84, 2.76],
    T = [0.66, -0.28, 0.7],
    S = [0.22, 0.32, 0.5],
    E = (d.emissive || 0) * 0.55,
    _ = m.ior ? Math.pow((m.ior - 1) / (m.ior + 1), 2) : 0.04;
  for (let R = 0; R < e; R++)
    for (let C = 0; C < e; C++) {
      let L = (R * e + C) * 4,
        A = ((C + 0.5) / e) * 2 - 1,
        O = 1 - ((R + 0.5) / e) * 2,
        H = Math.abs(A) - (b - v),
        F = Math.abs(O) - (b - v),
        P = H > 0 ? H : 0,
        z = F > 0 ? F : 0,
        k = Math.hypot(P, z),
        I = k + Math.min(Math.max(H, F), 0) - v,
        G = Math.max(0, Math.min(1, 0.5 - I * e * 0.5));
      if (G <= 0) {
        a[L + 3] = 0;
        continue;
      }
      let K, $;
      k > 1e-5
        ? ((K = (P / k) * Math.sign(A)), ($ = (z / k) * Math.sign(O)))
        : H > F
          ? ((K = Math.sign(A)), ($ = 0))
          : ((K = 0), ($ = Math.sign(O)));
      let n0 = Math.min(1, -I / y),
        e0 = Math.pow(1 - n0, 1.6) * 1.25,
        p0 = 1 - n0 * n0 * n0,
        t0 = 0,
        M0 = 0,
        f0 = 0,
        _0 = 0,
        F0 = 0,
        m0 = 0,
        S0 = 0,
        T0 = 0,
        j0 = 0,
        Z0 = 0;
      for (let ht = 0; ht < g; ht++)
        for (let pt = 0; pt < g; pt++) {
          let V0 = Math.min(u, Math.floor(((C + (pt + 0.5) / g) / e) * r)),
            c0 = Math.min(
              u,
              Math.floor(((e - 1 - R + (ht + 0.5) / g) / e) * r),
            ),
            Z = (c0 * r + V0) * 4,
            r0 = mf[l[Z]],
            b0 = mf[l[Z + 1]],
            d0 = mf[l[Z + 2]],
            V = h[Z + 1] / 255 + m.roughAdd,
            B = (h[Z + 2] / 255) * m.metalMul,
            j = h[Z] / 255,
            s0 = m.wear[0] + (m.wear[1] - m.wear[0]) * p0;
          if (s0 > 0.001) {
            let E0 = (j - (0.96 - s0)) / 0.07;
            ((E0 = E0 < 0 ? 0 : E0 > 1 ? 1 : E0),
              (r0 += (p[0] - r0) * E0),
              (b0 += (p[1] - b0) * E0),
              (d0 += (p[2] - d0) * E0),
              (V += (m.underRM[0] - V) * E0),
              (B += (m.underRM[1] - B) * E0));
            let U = s0 * m.bareK;
            if (U > 0.001) {
              let X = (j - (0.955 - U)) / 0.09;
              ((X = X < 0 ? 0 : X > 1 ? 1 : X),
                (r0 += (x[0] - r0) * X),
                (b0 += (x[1] - b0) * X),
                (d0 += (x[2] - d0) * X),
                (V += (m.bareRM[0] - V) * X),
                (B += (m.bareRM[1] - B) * X));
            }
          }
          let l0 = Math.max(0.2, c[Z + 2] / 127.5 - 1);
          ((t0 += r0),
            (M0 += b0),
            (f0 += d0),
            (m0 += V),
            (S0 += B),
            (_0 += (c[Z] / 127.5 - 1) / l0),
            (F0 += (c[Z + 1] / 127.5 - 1) / l0),
            f &&
              ((T0 += mf[f[Z]]), (j0 += mf[f[Z + 1]]), (Z0 += mf[f[Z + 2]])));
        }
      let lt = 1 / (g * g);
      ((t0 *= lt),
        (M0 *= lt),
        (f0 *= lt),
        (m0 = Math.max(0.05, Math.min(1, m0 * lt))),
        (S0 *= lt),
        (_0 *= lt),
        (F0 *= lt));
      let H0 = K * e0 - _0,
        Y0 = $ * e0 - F0,
        et = 1;
      {
        let ht = 1 / Math.hypot(H0, Y0, et);
        ((H0 *= ht), (Y0 *= ht), (et *= ht));
      }
      let ct = _ + (t0 - _) * S0,
        D0 = _ + (M0 - _) * S0,
        u0 = _ + (f0 - _) * S0,
        w0 = t0 * (1 - S0),
        P0 = M0 * (1 - S0),
        st = f0 * (1 - S0),
        J0 = Math.max(0.002, m0 * m0 * m0 * m0),
        q0 = Math.max(0.05, et),
        v0 = 0,
        x0 = 0,
        C0 = 0;
      for (let ht = 0; ht < 2; ht++) {
        let pt = ht ? T : M,
          V0 = ht ? S : w,
          c0 = H0 * pt[0] + Y0 * pt[1] + et * pt[2];
        if (c0 <= 0) continue;
        let Z = pt[0],
          r0 = pt[1],
          b0 = pt[2] + 1,
          d0 = 1 / Math.hypot(Z, r0, b0);
        ((Z *= d0), (r0 *= d0), (b0 *= d0));
        let V = Math.max(0, H0 * Z + Y0 * r0 + et * b0),
          B = b0,
          j = V * V * (J0 - 1) + 1,
          s0 = J0 / (Math.PI * j * j),
          l0 = 0.25 / (c0 * q0 * (1 - m0 * 0.5) + m0 * 0.5 + 0.02),
          E0 = Math.pow(1 - B, 5),
          U = Math.min(s0 * l0, 40) * c0;
        ((v0 += (w0 * c0 * 0.32 + U * (ct + (1 - ct) * E0)) * V0[0]),
          (x0 += (P0 * c0 * 0.32 + U * (D0 + (1 - D0) * E0)) * V0[1]),
          (C0 += (st * c0 * 0.32 + U * (u0 + (1 - u0) * E0)) * V0[2]));
      }
      let k0 = 0.5 + 0.5 * Y0;
      ((v0 += w0 * (0.1 + 0.16 * k0)),
        (x0 += P0 * (0.11 + 0.19 * k0)),
        (C0 += st * (0.13 + 0.24 * k0)));
      let O0 = 2 * et * H0,
        B0 = 2 * et * Y0,
        ot = 2 * et * et - 1,
        Q0 = Math.pow(1 - q0, 5) * (1 - m0),
        nt = 1 - m0 * 0.55;
      if (
        (CF(O0, B0, ot, m0, vp),
        (v0 += vp[0] * (ct * nt + (1 - ct) * Q0)),
        (x0 += vp[1] * (D0 * nt + (1 - D0) * Q0)),
        (C0 += vp[2] * (u0 * nt + (1 - u0) * Q0)),
        m.clearcoat)
      ) {
        ((v0 *= 0.6), (x0 *= 0.6), (C0 *= 0.6));
        let ht = K * e0,
          pt = $ * e0,
          V0 = 1,
          c0 = 1 / Math.hypot(ht, pt, V0);
        ((ht *= c0), (pt *= c0), (V0 *= c0));
        let Z = m.clearcoat,
          r0 = (0.045 + 0.955 * Math.pow(1 - V0, 5)) * Z;
        (CF(2 * V0 * ht, 2 * V0 * pt, 2 * V0 * V0 - 1, 0.04, vp),
          (v0 = v0 * (1 - r0) + vp[0] * r0),
          (x0 = x0 * (1 - r0) + vp[1] * r0),
          (C0 = C0 * (1 - r0) + vp[2] * r0));
      }
      f &&
        ((v0 += T0 * lt * E),
        (x0 += j0 * lt * E * 0.8),
        (C0 += Z0 * lt * E * 0.7));
      let L0 = (ht) => {
        ht *= 0.85;
        let pt = (ht * (2.51 * ht + 0.03)) / (ht * (2.43 * ht + 0.59) + 0.14);
        return Math.pow(pt < 0 ? 0 : pt > 1 ? 1 : pt, 1 / 2.2) * 255;
      };
      ((a[L] = L0(v0)),
        (a[L + 1] = L0(x0)),
        (a[L + 2] = L0(C0)),
        (a[L + 3] = G * 255));
    }
  return (n.putImageData(i, 0, 0), s);
}
function HF(o, t = 256) {
  let e = R5[o] ? o : "factory";
  return lJ(LF(e), e, t);
}

export { HF, IF, xl };

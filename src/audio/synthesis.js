// audio/synthesis.js: recovered from the verified GOLDEN HOUR release.

var qc = Math.PI * 2;
var qt = (o = 0, t = 1) => o + (t - o) * Math.random();
var Fl = (o, t) => Math.floor(qt(o, t + 1));
var zw = (o) => o[(Math.random() * o.length) | 0];
var fl = (o, t, e) => (o < t ? t : o > e ? e : o);
var Ai = (o) => fl(o, 0, 1);
var Gc = (o, t, e) => o + (t - o) * e;
var Lw = (o, t, e) => {
  let s = Ai((e - o) / (t - o));
  return s * s * (3 - 2 * s);
};
var s2 = (o) => 440 * Math.pow(2, (o - 69) / 12);
var JD = (o) => Math.pow(10, o / 20);
var rh = (o, t) => (typeof o == "number" && isFinite(o) ? o : t);
function Pg(o) {
  let t = o >>> 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function Iw(o) {
  let t = 2166136261;
  for (let e = 0; e < o.length; e++)
    ((t ^= o.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
function Ka(o, t) {
  let e = new Float32Array(o);
  for (let s = 0; s < o; s++) e[s] = t() * 2 - 1;
  return e;
}
var pc = 0;
var ca = 1;
var Wc = 2;
var Hw = 3;
function rn(o, t, e, s, n = 0.707, i = 0, a = 0, r = 0) {
  let l = o.length,
    c = 1 / n,
    h = t * 0.45,
    f = i > 0 && a > 0,
    u = f ? Math.exp(-16 / (t * a)) : 1,
    d = 0,
    m = 0,
    p = 0,
    x = 0,
    g = 0,
    b = 0,
    v = f ? s - i : 0,
    y = (M) => {
      ((p = Math.tan((Math.PI * fl(M, 10, h)) / t)),
        (x = 1 / (1 + p * (p + c))),
        (g = p * x),
        (b = p * g));
    };
  y(s);
  for (let M = 0; M < l; M++) {
    f && !(M & 15) && (y(i + v), (v *= u));
    let w = o[M] - m,
      T = x * d + g * w,
      S = m + g * d + b * w;
    ((d = 2 * T - d),
      (m = 2 * S - m),
      (o[M] =
        e === pc
          ? S
          : e === ca
            ? o[M] - c * T - S
            : e === Wc
              ? c * T
              : o[M] + r * c * T));
  }
  return o;
}
function Zm(o) {
  let t = 0;
  for (let e = 0; e < o.length; e++) {
    let s = o[e] < 0 ? -o[e] : o[e];
    s > t && (t = s);
  }
  return t;
}
function dc(o, t = 0, e = o.length) {
  let s = 0;
  for (let n = t; n < e; n++) s += o[n] * o[n];
  return Math.sqrt(s / Math.max(1, e - t));
}
function lh(o, t) {
  for (let e = 0; e < o.length; e++) o[e] *= t;
  return o;
}
function ul(o, t, e, s, n = 0, i = 0) {
  let a = e > 0 ? Math.exp(-1 / (t * e)) : 0,
    r = Math.exp(-1 / (t * s)),
    l = n > 0 ? Math.exp(-1 / (t * n)) : 0,
    c = 1,
    h = 1 - i,
    f = i;
  for (let u = 0; u < o.length; u++)
    ((o[u] *= (1 - c) * (h + f)), (c *= a), (h *= r), (f *= l));
  return o;
}
function Xa(o, t, e = 1, s = 0) {
  let n = Math.min(t.length, o.length - s);
  for (let i = 0; i < n; i++) o[s + i] += t[i] * e;
}
function xu(o, t, e, s, n, i, a, r) {
  if (s > t * 0.45 || e >= o.length) return;
  let l = (qc * s) / t,
    c = Math.exp(-1 / (t * n)),
    h = 2 * c * Math.cos(l),
    f = c * c,
    u = Math.min(o.length - e, Math.ceil(t * n * 7)),
    d = 0,
    m = Math.sin(l);
  for (let p = 0; p < u; p++) {
    ((o[e + p] += m * i), a && (a[e + p] += m * r));
    let x = h * m - f * d;
    ((d = m), (m = x));
  }
}
function Qm(o, t, e = 0.012) {
  let s = Math.min(o.length, Math.floor(t * e));
  for (let n = 0; n < s; n++) o[o.length - 1 - n] *= n / s;
  return o;
}
function rI(o, t, e) {
  let s = 1 / Math.tanh(t),
    n = t / e;
  for (let i = 0; i < o.length; i++) o[i] = Math.tanh(o[i] * n) * s;
  return o;
}
function tI(o, t, e) {
  let s = Math.floor(o * t),
    n = Math.floor(o * 0.06),
    i = Pg(e === "white" ? 20973 : 46087),
    a = new Float32Array(s + n);
  if (e === "white") for (let l = 0; l < a.length; l++) a[l] = i() * 2 - 1;
  else {
    let l = 0,
      c = 1e-6;
    for (let f = 0; f < a.length; f++)
      ((l = (l + 0.02 * (i() * 2 - 1)) / 1.02),
        (a[f] = l),
        Math.abs(l) > c && (c = Math.abs(l)));
    let h = 0.95 / c;
    for (let f = 0; f < a.length; f++) a[f] *= h;
  }
  let r = new Float32Array(s);
  r.set(a.subarray(0, s));
  for (let l = 0; l < n; l++) {
    let c = l / n;
    r[l] = a[l] * c + a[s + l] * (1 - c);
  }
  return r;
}
function P$(o, t) {
  let e = Pg(t === "in" ? 6923 : 32324),
    s = [],
    n = t === "in" ? 2.3 : 3,
    i = Math.floor(o * n);
  for (let a = 0; a < 2; a++) {
    let r = new Float32Array(i);
    if (t === "in") {
      let l = Ka(i, e),
        c = Float32Array.from(l),
        h = Float32Array.from(l);
      (rn(c, o, pc, 420, 0.6),
        rn(h, o, ca, 3e3, 0.6),
        rn(l, o, ca, 420, 0.6),
        rn(l, o, pc, 3e3, 0.6));
      let f = 1 / dc(c),
        u = 1 / dc(l),
        d = 1 / dc(h),
        m = Math.pow(10, -3 / (1.55 * o)),
        p = Math.pow(10, -3 / (1.25 * o)),
        x = Math.pow(10, -3 / (0.6 * o)),
        g = Math.exp(-1 / (o * 0.014)),
        b = 0.45 * f,
        v = 1 * u,
        y = 1.6 * d,
        M = 1;
      for (let E = 0; E < i; E++)
        ((r[E] = (1 - M) * (c[E] * b + l[E] * v + h[E] * y)),
          (b *= m),
          (v *= p),
          (y *= x),
          (M *= g));
      let w = dc(r) * Math.sqrt(i),
        T = new Float32Array(i);
      for (let E = 0; E < 34; E++) {
        let _ = 0.0048 + 0.088 * Math.pow((E + e()) / 34, 1.5),
          R = Math.floor(_ * o * (a ? 1.07 : 1)),
          C = (e() < 0.5 ? -1 : 1) * Math.exp(-_ / 0.034) * (0.55 + 0.45 * e()),
          L = 1 + Math.floor(_ * 60);
        for (let A = 0; A < L && R + A < i; A++)
          T[R + A] += (C * (1 - A / L)) / Math.sqrt(L);
      }
      let S = dc(T) * Math.sqrt(i);
      for (let E = 0; E < i; E++) r[E] += T[E] * ((0.78 * w) / S);
    } else {
      {
        let x = Math.floor(o * 0.0065 * (a ? 1.08 : 1));
        for (let g = 0; g < 6; g++)
          r[x + g] += 0.55 * (1 - g / 6) * (g & 1 ? -0.6 : 1);
      }
      let l = [
        [0.094, 0.5, 5, 5200],
        [0.151, 0.4, 8, 3800],
        [0.212, 0.31, 12, 2700],
        [0.289, 0.24, 16, 2e3],
      ];
      for (let [x, g, b, v] of l) {
        let y = Math.floor(((o * b) / 1e3) * 4),
          M = Ka(y, e);
        (rn(M, o, pc, v, 0.6), rn(M, o, ca, 180, 0.6), ul(M, o, 6e-4, b / 1e3));
        let w = 0.45 + 0.55 * (a ? 1 - e() : e()),
          T = Math.floor(o * x * (1 + 0.1 * (e() - 0.5)));
        Xa(r, M, (g * w) / Math.max(1e-6, dc(M) * Math.sqrt(y)), T);
      }
      let c = dc(r) * Math.sqrt(i),
        h = Ka(i, e);
      (rn(h, o, ca, 320, 0.6), rn(h, o, pc, 2300, 0.6));
      let f = Math.pow(10, -3 / (2.6 * o)),
        u = Math.exp(-1 / (o * 0.11)),
        d = 1,
        m = 1;
      for (let x = 0; x < i; x++) ((h[x] *= (1 - m) * d), (d *= f), (m *= u));
      let p = dc(h) * Math.sqrt(i);
      for (let x = 0; x < i; x++) r[x] += h[x] * ((0.5 * c) / p);
    }
    (Qm(r, o, 0.08), lh(r, 1 / (dc(r) * Math.sqrt(i))), s.push(r));
  }
  return s;
}
var gu = {
  ar: {
    level: -6,
    len: 0.46,
    rev: 0.3,
    width: 0.3,
    pulseT: 21e-5,
    pulse: 1,
    atk: 12e-5,
    drive: 2.23,
    bands: [
      [250, 800, 0.026, 0.492, 0.065, 0.3],
      [800, 2500, 0.014, 0.574, 0.04, 0.15],
      [2500, 6e3, 0.0065, 0.995, 0.02, 0.1],
      [6e3, 15e3, 0.0032, 0.0339, 0, 0],
    ],
    res: [
      [540, 1.3, 0.9],
      [1350, 1.6, 0.5],
    ],
    th: {
      f0: 172,
      f1: 72,
      ft: 0.017,
      a: 0.0042,
      d: 0.055,
      g: 0.359,
    },
    boom: {
      f: 230,
      d: 0.055,
      g: 0.179,
    },
    mech: [
      {
        t: 0.027,
        g: 0.085,
        f: [2150, 3420, 5300],
        d: 0.0065,
        click: 3500,
        thunk: 0.6,
        ring: 1830,
      },
      {
        t: 0.061,
        g: 0.05,
        f: [2700, 4300],
        d: 0.0045,
        click: 4300,
        thunk: 0.25,
      },
    ],
    spring: {
      f: 742,
      d: 0.055,
      g: 0.012,
    },
    far: {
      len: 0.7,
      atk: 0.003,
      drive: 1.4,
      bands: [
        [60, 250, 0.07, 0.511, 0.16, 0.4],
        [250, 800, 0.045, 0.708, 0.13, 0.35],
        [800, 2500, 0.022, 0.478, 0.07, 0.2],
        [2500, 6e3, 0.008, 0.0943, 0, 0],
      ],
      th: {
        f0: 118,
        f1: 62,
        ft: 0.03,
        a: 0.007,
        d: 0.075,
        g: 0.383,
      },
    },
    sup: {
      level: -21,
      len: 0.36,
      atk: 0.0011,
      drive: 2.43,
      rev: 0.12,
      mech: 2.6,
      bands: [
        [250, 800, 0.0162, 0.655, 0.0455, 0.35],
        [800, 2500, 0.0108, 0.756, 0.039, 0.3],
        [2500, 6e3, 0.005, 545e-6, 0.04, 0.2],
      ],
      th: {
        f0: 235,
        f1: 128,
        ft: 0.01,
        a: 0.0015,
        d: 0.022,
        g: 0.344,
      },
    },
  },
  smg: {
    level: -6.5,
    len: 0.36,
    rev: 0.25,
    width: 0.28,
    pulseT: 17e-5,
    pulse: 1,
    atk: 1e-4,
    drive: 2.3,
    bands: [
      [250, 800, 0.017, 0.573, 0.035, 0.2],
      [800, 2500, 0.0105, 0.56, 0.028, 0.15],
      [2500, 6e3, 0.005, 0.958, 0.014, 0.1],
      [6e3, 15e3, 0.0026, 0.0515, 0, 0],
    ],
    res: [
      [820, 1.5, 0.8],
      [1900, 1.8, 0.55],
    ],
    th: {
      f0: 215,
      f1: 104,
      ft: 0.012,
      a: 0.003,
      d: 0.036,
      g: 0.224,
    },
    boom: {
      f: 300,
      d: 0.034,
      g: 0.0865,
    },
    mech: [
      {
        t: 0.022,
        g: 0.1,
        f: [1650, 2850, 4500],
        d: 0.006,
        click: 3e3,
        thunk: 0.8,
        ring: 1420,
      },
      {
        t: 0.047,
        g: 0.06,
        f: [2400, 3900],
        d: 0.004,
        click: 3900,
        thunk: 0.3,
      },
    ],
    far: {
      len: 0.55,
      atk: 0.0025,
      drive: 1.81,
      bands: [
        [60, 250, 0.05, 0.334, 0.11, 0.35],
        [250, 800, 0.032, 0.67, 0.09, 0.3],
        [800, 2500, 0.017, 0.663, 0.05, 0.2],
        [2500, 6e3, 0.007, 0.00764, 0, 0],
      ],
      th: {
        f0: 150,
        f1: 85,
        ft: 0.025,
        a: 0.006,
        d: 0.05,
        g: 0.238,
      },
    },
    sup: {
      level: -22,
      len: 0.34,
      atk: 0.001,
      drive: 2.5,
      rev: 0.1,
      mech: 2.4,
      bands: [
        [250, 800, 0.0121, 0.584, 0.0338, 0.35],
        [800, 2500, 0.00877, 0.812, 0.0286, 0.3],
        [2500, 6e3, 0.004, 0.00426, 0.035, 0.2],
      ],
      th: {
        f0: 270,
        f1: 150,
        ft: 0.01,
        a: 0.0015,
        d: 0.016,
        g: 0.27,
      },
    },
  },
  shotgun: {
    level: -5,
    len: 0.8,
    rev: 0.32,
    width: 0.34,
    pulseT: 42e-5,
    pulse: 1.5,
    atk: 2e-4,
    drive: 2.95,
    bands: [
      [250, 800, 0.04, 0.722, 0.11, 0.3],
      [800, 2500, 0.022, 0.462, 0.07, 0.2],
      [2500, 6e3, 0.011, 0.91, 0.03, 0.1],
      [6e3, 15e3, 0.0055, 0.00506, 0, 0],
    ],
    res: [
      [330, 1.2, 1],
      [880, 1.4, 0.5],
    ],
    th: {
      f0: 132,
      f1: 61,
      ft: 0.03,
      a: 0.005,
      d: 0.085,
      g: 0.527,
    },
    boom: {
      f: 170,
      d: 0.11,
      g: 0.335,
    },
    mech: [
      {
        t: 0.034,
        g: 0.04,
        f: [640, 1210, 2150],
        d: 0.03,
        click: 1800,
        thunk: 1.2,
        ring: 0,
      },
    ],
    far: {
      len: 1,
      atk: 0.002,
      drive: 1.8,
      bands: [
        [60, 250, 0.08, 0.667, 0.2, 0.35],
        [250, 800, 0.07, 0.556, 0.18, 0.35],
        [800, 2500, 0.03, 0.496, 0.09, 0.2],
        [2500, 6e3, 0.01, 541e-6, 0, 0],
      ],
      th: {
        f0: 92,
        f1: 48,
        ft: 0.04,
        a: 0.009,
        d: 0.12,
        g: 0.467,
      },
    },
    sup: {
      level: -19.5,
      len: 0.48,
      atk: 0.0014,
      drive: 2.3,
      rev: 0.14,
      mech: 1.6,
      bands: [
        [250, 800, 0.027, 0.807, 0.078, 0.35],
        [800, 2500, 0.0175, 0.49, 0.0585, 0.3],
        [2500, 6e3, 0.007, 0.33, 0.05, 0.2],
      ],
      th: {
        f0: 180,
        f1: 95,
        ft: 0.014,
        a: 0.002,
        d: 0.04,
        g: 0.559,
      },
    },
  },
  pistol: {
    level: -6.5,
    len: 0.36,
    rev: 0.27,
    width: 0.26,
    pulseT: 24e-5,
    pulse: 1,
    atk: 1e-4,
    drive: 2.35,
    bands: [
      [250, 800, 0.018, 0.576, 0.038, 0.2],
      [800, 2500, 0.011, 0.617, 0.03, 0.15],
      [2500, 6e3, 0.0052, 0.921, 0.015, 0.1],
      [6e3, 15e3, 0.0027, 0.00345, 0, 0],
    ],
    res: [
      [700, 1.6, 1],
      [1650, 1.8, 0.5],
    ],
    th: {
      f0: 205,
      f1: 96,
      ft: 0.013,
      a: 0.0032,
      d: 0.04,
      g: 0.3,
    },
    boom: {
      f: 280,
      d: 0.038,
      g: 0.107,
    },
    mech: [
      {
        t: 0.019,
        g: 0.085,
        f: [2800, 4600, 6900],
        d: 0.005,
        click: 4200,
        thunk: 0.5,
        ring: 2300,
      },
      {
        t: 0.043,
        g: 0.06,
        f: [3300, 5200],
        d: 0.004,
        click: 5e3,
        thunk: 0.3,
      },
    ],
    far: {
      len: 0.55,
      atk: 0.0025,
      drive: 1.85,
      bands: [
        [60, 250, 0.05, 0.416, 0.115, 0.35],
        [250, 800, 0.033, 0.628, 0.095, 0.3],
        [800, 2500, 0.017, 0.657, 0.055, 0.2],
        [2500, 6e3, 0.007, 0.0193, 0, 0],
      ],
      th: {
        f0: 140,
        f1: 80,
        ft: 0.025,
        a: 0.006,
        d: 0.055,
        g: 0.297,
      },
    },
    sup: {
      level: -22,
      len: 0.34,
      atk: 0.001,
      drive: 2.44,
      rev: 0.1,
      mech: 2.4,
      bands: [
        [250, 800, 0.0128, 0.674, 0.0364, 0.35],
        [800, 2500, 0.00945, 0.739, 0.0312, 0.3],
        [2500, 6e3, 0.0045, 0.0151, 0.035, 0.2],
      ],
      th: {
        f0: 255,
        f1: 140,
        ft: 0.01,
        a: 0.0015,
        d: 0.018,
        g: 0.372,
      },
    },
  },
};
var Cg = {
  near: 5,
  far: 3,
  sup: 4,
};
function z$(o, t, e, s, n, i, a) {
  let r = o.length,
    l = Math.floor(e * (n.t + (s() - 0.5) * 0.005)) + 2,
    c = n.g * i * (0.8 + 0.4 * s());
  if (l >= r) return;
  let h = Math.min(r - l, Math.floor(e * 0.012)),
    f = Ka(h, s);
  (rn(f, e, Wc, n.click * (0.94 + 0.12 * s()), 1.5),
    ul(f, e, 8e-5, 0.0011),
    Xa(o, f, c * 2.6, l),
    t && Xa(t, f, -c * 2.6 * a, l));
  for (let u = 0; u < n.f.length; u++) {
    let d = (c * (0.55 + 0.45 * s())) / Math.sqrt(u + 1);
    xu(
      o,
      e,
      l,
      n.f[u] * (0.97 + 0.06 * s()),
      n.d * (0.7 + 0.6 * s()),
      d,
      t,
      -d * a * s(),
    );
  }
  if (n.ring) {
    let u = n.ring * (0.97 + 0.06 * s()),
      d = u * 1.4142,
      m = Math.min(r - l, Math.floor(e * n.d * 10)),
      p = Math.exp(-1 / (e * 0.003)),
      x = Math.exp(-1 / (e * n.d * 1.6)),
      g = 2.6,
      b = c * 0.5;
    for (let v = 0; v < m; v++) {
      let y = v / e;
      ((o[l + v] += b * Math.sin(qc * u * y + g * Math.sin(qc * d * y))),
        (g *= p),
        (b *= x));
    }
  }
  if (n.thunk) {
    let u = Math.min(r - l, Math.floor(e * 0.07)),
      d = Math.exp(-1 / (e * 0.012)),
      m = Math.exp(-1 / (e * 0.011)),
      p = Math.exp(-1 / (e * 6e-4)),
      x = 0,
      g = 95,
      b = c * n.thunk * 1.3,
      v = 1;
    for (let y = 0; y < u; y++)
      ((x += (qc * (165 + g)) / e),
        (o[l + y] += (1 - v) * b * Math.sin(x)),
        (g *= d),
        (b *= m),
        (v *= p));
  }
}
function L$(o, t, e, s, n, i, a, r, l, c) {
  let h = o.length;
  for (let [f, u, d, m, p, x] of i) {
    let g = Math.min(h - c - 8, Math.floor(e * Math.max(d, p || 0) * 8.5)),
      b = d * n(0.1),
      v = (p || 0) * n(0.1),
      y = m * n(0.1);
    for (let M of [o, f >= 800 ? t : null]) {
      if (!M) continue;
      let w = Ka(g, s);
      if ((rn(w, e, ca, f, 0.7), rn(w, e, pc, u, 0.7), M === o && l))
        for (let [T, S, E] of l)
          T > f * 0.8 && T < u * 1.25 && rn(w, e, Hw, T * n(0.05), S, 0, 0, E);
      (lh(w, 1 / dc(w)),
        ul(w, e, a, b, v, x || 0),
        Xa(M, w, M === o ? y : y * r, c));
    }
  }
}
function D$(o, t, e, s, n) {
  let i = s.f1 * e(0.04),
    a = Math.exp(-1 / (t * s.ft)),
    r = Math.exp(-1 / (t * s.a)),
    l = Math.exp(-1 / (t * s.d * e(0.08))),
    c = s.g * e(0.08),
    h = 0,
    f = s.f0 * e(0.05) - i,
    u = 1,
    d = 1;
  for (let m = n; m < o.length; m++)
    ((h += (qc * (i + f)) / t),
      (f *= a),
      (o[m] += c * (1 - u) * d * (Math.sin(h) + 0.1 * Math.sin(2 * h))),
      (u *= r),
      (d *= l));
}
function I$(o, t, e, s) {
  let n = gu[t],
    i = e === "near" ? n : n[e],
    a = Pg(Iw(t + ":" + e + ":" + s)),
    r = (m) => 1 + m * (a() * 2 - 1),
    l = 2,
    c = Math.floor(o * i.len),
    h = new Float32Array(c),
    f = e === "far" ? null : new Float32Array(c),
    u = 0;
  for (let m of i.bands) u += m[3] * m[3];
  if (((u = 2.4 * Math.sqrt(u)), e === "near")) {
    let m = n.pulseT * r(0.08) * o,
      p = Math.min(c - l, Math.ceil(m * 10)),
      x = n.pulse;
    h[l - 1] += 0.38 * x;
    for (let g = 0; g < p; g++) {
      let b = g / m;
      h[l + g] += x * (1 - b) * Math.exp(-b);
    }
    u += x * 0.6;
  }
  if (
    (L$(h, f, o, a, r, i.bands, i.atk, n.width, e === "near" ? n.res : null, l),
    D$(h, o, r, i.th, l),
    i.boom)
  ) {
    let m = Math.floor(o * Math.min(i.len - 0.02, i.boom.d * 8)),
      p = Ka(m, a);
    (rn(p, o, pc, i.boom.f * r(0.06), 0.6),
      rn(p, o, pc, i.boom.f * 1.4, 0.6),
      rn(p, o, ca, 42, 0.7),
      lh(p, 1 / dc(p)),
      ul(p, o, 0.004, i.boom.d * r(0.1)),
      Xa(h, p, i.boom.g * r(0.1), l));
  }
  if (e === "sup")
    for (let m of [h, f]) {
      let p = Ka(Math.floor(o * 0.22), a);
      (rn(p, o, Wc, 2300 * r(0.1), 0.7),
        rn(p, o, pc, 4200, 0.7),
        lh(p, 1 / dc(p)),
        ul(p, o, 0.004, 0.038),
        Xa(m, p, (m === h ? 1 : n.width) * 0.11, l));
    }
  if ((rI(h, i.drive, u), f)) {
    let m = Math.min(c, Math.floor(o * 0.04)),
      p = (n.width * 0.55 * dc(h, 0, m)) / Math.max(1e-9, dc(f, 0, m)),
      x = Math.exp(-1 / (o * 0.003)),
      g = 1;
    for (let b = 0; b < c; b++) ((f[b] *= p * (1 - g)), (g *= x));
  }
  if (e !== "far") {
    for (let m of n.mech) z$(h, f, o, a, m, e === "sup" ? i.mech : 1, 0.35);
    n.spring &&
      xu(
        h,
        o,
        l + Math.floor(o * 0.03),
        n.spring.f * r(0.03),
        n.spring.d,
        n.spring.g * (e === "sup" ? 2 : 1),
      );
  }
  (rn(h, o, ca, 24, 0.7), Qm(h, o), f && Qm(f, o));
  let d = 0;
  if (f)
    for (let m = 0; m < c; m++) {
      let p = Math.abs(h[m] + f[m]),
        x = Math.abs(h[m] - f[m]);
      (p > d && (d = p), x > d && (d = x));
    }
  else d = Zm(h);
  return (
    lh(h, 1 / d),
    f && lh(f, 1 / d),
    {
      M: h,
      S: f,
    }
  );
}
function H$(o, t, e) {
  let s = Pg(Iw("glass:" + t + ":" + e)),
    n = t === "crash" ? 2 : t === "debris" ? 1.1 : 0.5,
    i = Math.floor(o * n),
    a = new Float32Array(i),
    r = new Float32Array(i),
    l = (f, u, d, m) => {
      let p = s(),
        x = Math.floor(o * f);
      xu(
        a,
        o,
        x,
        u,
        d,
        m * Math.cos((p * Math.PI) / 2),
        r,
        m * Math.sin((p * Math.PI) / 2),
      );
    },
    c = (f, u) => f * Math.pow(u / f, s());
  if (t === "crash") {
    for (let f of [a, r]) {
      let u = Math.floor(o * 1.2),
        d = Ka(u, s);
      (rn(d, o, ca, 1300, 0.7),
        rn(d, o, Hw, 4600, 0.8, 0, 0, 1),
        ul(d, o, 8e-4, 0.035, 0.24, 0.22),
        Xa(f, d, 0.5, 2));
      let m = Ka(Math.floor(o * 0.3), s);
      (rn(m, o, Wc, 380, 1.1), ul(m, o, 0.001, 0.045), Xa(f, m, 1.5, 2));
    }
    for (let f = 0; f < 460; f++) {
      let u = Math.pow(s(), 2.3),
        d = 0.004 + 1.55 * u;
      l(
        d,
        c(2300, 13e3),
        0.005 + 0.06 * s() * s(),
        (0.02 + 0.07 * s()) * (1 - 0.75 * u),
      );
    }
    for (let f = 0; f < 34; f++) {
      let u = Math.pow(s(), 1.6),
        d = 0.01 + 1.2 * u,
        m = c(1100, 3600),
        p = (0.05 + 0.08 * s()) * (1 - 0.6 * u),
        x = 0.03 + 0.09 * s();
      (l(d, m, x, p),
        l(d, m * 1.47, x * 0.6, p * 0.5),
        l(d, m * 2.09, x * 0.4, p * 0.35));
    }
  } else if (t === "debris") {
    let f = 9 + Math.floor(s() * 8);
    for (let u = 0; u < f; u++) {
      let d = 0.005 + 0.6 * Math.pow(s(), 1.3),
        m = 0.12 + 0.22 * s(),
        p = 0.05 + 0.09 * s(),
        x = c(2600, 9500);
      for (let g = 0; g < 1 + Math.floor(s() * 3) && d < n - 0.15; g++)
        (l(d, x * (1 + 0.04 * (s() - 0.5)), 0.012 + 0.04 * s(), m),
          l(d, x * 1.52, 0.012, m * 0.45),
          l(d, c(900, 1800), 0.004, m * 0.5),
          (d += p),
          (p *= 0.55),
          (m *= 0.5));
    }
    for (let u of [a, r])
      for (let d = 0; d < 14; d++) {
        let m = Math.floor(o * 0.75 * s()),
          p = Ka(Math.floor(o * 0.004), s);
        (rn(p, o, ca, 4200, 0.7),
          ul(p, o, 5e-5, 7e-4),
          Xa(u, p, 0.1 + 0.15 * s(), m));
      }
  } else {
    for (let f of [a, r]) {
      let u = Ka(Math.floor(o * 0.02), s);
      (rn(u, o, ca, 3800, 0.7), ul(u, o, 5e-5, 0.0016), Xa(f, u, 0.9, 2));
      let d = Ka(Math.floor(o * 0.05), s);
      (rn(d, o, Wc, 2300, 1.2), ul(d, o, 2e-4, 0.006), Xa(f, d, 0.7, 2));
      for (let m = 0; m < 9; m++) {
        let p = Math.floor(o * (0.004 + 0.07 * Math.pow(s(), 1.5))),
          x = Ka(Math.floor(o * 0.003), s);
        (rn(x, o, ca, 5e3, 0.7),
          ul(x, o, 4e-5, 5e-4),
          Xa(f, x, 0.25 + 0.3 * s(), p));
      }
    }
    (l(5e-4, 4300 + 900 * s(), 0.03, 0.3),
      l(5e-4, 7100 + 1200 * s(), 0.022, 0.22));
    for (let f = 0; f < 9; f++)
      l(
        0.012 + 0.26 * Math.pow(s(), 1.6),
        c(3400, 10500),
        0.02 + 0.07 * s(),
        0.05 + 0.1 * s(),
      );
  }
  (Qm(a, o, 0.03), Qm(r, o, 0.03));
  let h = Math.max(Zm(a), Zm(r));
  return (lh(a, 1 / h), lh(r, 1 / h), [a, r]);
}
function F$(o, t) {
  let e = Pg(Iw("exp:" + t)),
    s = Math.floor(o * 3.2),
    n = new Float32Array(s),
    i = 2;
  {
    let r = 0.0011 * o,
      l = Math.ceil(r * 10);
    n[i - 1] += 0.4;
    for (let c = 0; c < l; c++) {
      let h = c / r;
      n[i + c] += (1 - h) * Math.exp(-h);
    }
  }
  {
    let r = Ka(Math.floor(o * 0.08), e);
    (rn(r, o, ca, 900, 0.7),
      rn(r, o, Hw, 2800, 0.8, 0, 0, 0.8),
      ul(r, o, 1e-4, 0.005, 0.02, 0.3),
      Xa(n, r, 0.75, i));
  }
  {
    let r = Math.floor(o * 1.6),
      l = Ka(r, e);
    (rn(l, o, pc, 5200, 0.7, 210, 0.11), rn(l, o, ca, 60, 0.7));
    let c = Float32Array.from(l);
    rn(c, o, pc, 380, 0.6);
    for (let h = 0; h < r; h++) l[h] = l[h] * 0.55 + c[h] * 2.6;
    (ul(l, o, 8e-4, 0.045, 0.3, 0.42), Xa(n, l, 0.75, i));
  }
  {
    let r = Math.exp(-1 / (o * 0.09)),
      l = Math.exp(-1 / (o * 0.006)),
      c = Math.exp(-1 / (o * 0.24)),
      h = 0,
      f = 58,
      u = 1,
      d = 1;
    for (let m = i; m < s; m++)
      ((h += (qc * (27 + f)) / o),
        (f *= r),
        (n[m] += 1 * (1 - u) * d * (Math.sin(h) + 0.15 * Math.sin(2 * h))),
        (u *= l),
        (d *= c));
  }
  {
    let r = Math.floor(o * 2.4),
      l = Ka(r, e);
    (rn(l, o, pc, 130, 0.6),
      rn(l, o, pc, 170, 0.6),
      rn(l, o, ca, 28, 0.7),
      ul(l, o, 0.012, 0.42),
      Xa(n, l, 5.5, i));
  }
  rI(n, 2.6, Zm(n));
  let a = 46 + Math.floor(e() * 16);
  for (let r = 0; r < a; r++) {
    let l = 0.24 + 1.5 * Math.pow(e(), 1.5),
      c = Math.floor(o * l),
      h = (0.012 + 0.04 * e()) * (1 - (0.5 * (l - 0.24)) / 1.5);
    if (e() < 0.3) {
      xu(n, o, c, 1800 + 4200 * e(), 0.008 + 0.03 * e(), h * 0.8);
      continue;
    }
    let f = Ka(Math.floor(o * (0.01 + 0.03 * e())), e);
    (rn(f, o, Wc, 700 + 3600 * e() * e(), 1.3),
      ul(f, o, 3e-4, 0.004 + 0.01 * e()),
      Xa(n, f, h * 3, c));
  }
  return (rn(n, o, ca, 20, 0.7), Qm(n, o, 0.05), lh(n, 1 / Zm(n)), n);
}
function Hb(o, t) {
  if (t <= o[0][0]) return o[0][1];
  for (let e = 1; e < o.length; e++)
    if (t <= o[e][0]) {
      let s = o[e - 1],
        n = o[e];
      return s[1] + ((n[1] - s[1]) * (t - s[0])) / (n[0] - s[0] || 1e-9);
    }
  return o[o.length - 1][1];
}
function Ob(o, t, e) {
  let s = Math.floor(o * e.dur),
    n = new Float32Array(s),
    i = o * 0.45,
    a = [e.F1, e.F2, e.F3 || [[0, 2900]]],
    r = e.fg || [1, 0.7, 0.35],
    l = e.fq || [5, 7, 8],
    c = a.map(() => ({
      ic1: 0,
      ic2: 0,
      a1: 0,
      a2: 0,
      a3: 0,
      k: 0,
    })),
    h = e.ring || 0,
    f = e.grit || 0,
    u = e.noise || 0,
    d = e.step || 0,
    m = e.jitter ?? 0.02,
    p = e.dry ?? 0.06,
    x = e.drive || 1.5,
    g = Math.max(8, Math.round(o * (e.comb || 0.0021))),
    b = new Float32Array(g),
    v = e.fb ?? 0.4,
    y = Math.max(1, Math.round(o / 13e3)),
    M = 0,
    w = 0,
    T = 0,
    S = 0,
    E = 0,
    _ = 0,
    R = 0,
    C = 0,
    L = Hb(e.amp, 0),
    A = 0;
  for (let O = 0; O < s; O++) {
    let H = O / o;
    if (!(O & 31))
      for (let I = 0; I < 3; I++) {
        let G = c[I],
          K = Math.tan((Math.PI * fl(Hb(a[I], H), 60, i)) / o);
        ((G.k = 1 / l[I]),
          (G.a1 = 1 / (1 + K * (K + G.k))),
          (G.a2 = K * G.a1),
          (G.a3 = K * G.a2));
      }
    if (!(O & 7)) {
      let I = Math.log2(Hb(e.f, H));
      (d && (I = (Math.round((I * 12) / d) * d) / 12),
        (R = Math.pow(2, I) / o),
        (C =
          typeof e.rough == "number" ? e.rough : e.rough ? Hb(e.rough, H) : 0),
        (A = (Hb(e.amp, H + 8 / o) - L) / 8));
    }
    ((w += 0.004 * (t() * 2 - 1 - w)), (M += R * (1 + m * w * 8)));
    let F = M - Math.floor(M);
    T += 0.01 * (t() * 2 - 1 - T);
    let P =
      (2 * F - 1) * (1 - C * 0.55 * (Math.floor(M) & 1)) * (1 + C * 5 * T);
    if (((_ += 0.45 * (P - _)), (P = _), u)) {
      let I = (t() * 2 - 1) * u;
      (e.snarl && (I *= Math.sin(qc * e.snarl * H) > 0 ? 1 : 0.15), (P += I));
    }
    let z = P * p;
    for (let I = 0; I < 3; I++) {
      let G = c[I],
        K = P - G.ic2,
        $ = G.a1 * G.ic1 + G.a2 * K,
        n0 = G.ic2 + G.a2 * G.ic1 + G.a3 * K;
      ((G.ic1 = 2 * $ - G.ic1), (G.ic2 = 2 * n0 - G.ic2), (z += r[I] * $));
    }
    (h && (z *= 1 - h + h * Math.sin(qc * (e.ringHz || 233) * H)),
      f && (O % y === 0 && (S = z), (z += f * (S - z))));
    let k = b[E];
    ((z += v * k),
      (b[E] = z),
      (E = (E + 1) % g),
      (n[O] = Math.tanh(z * x) * L),
      (L += A));
  }
  return n;
}
var O$ = {
  A4: 440,
  D5: 587.33,
  A5: 880,
  D4: 293.66,
  Eb4: 311.13,
};
function S1(o, t, e, s, n = {}) {
  let i = n.scoop ?? -3,
    a = n.end ?? 1,
    r = n.dark ? 0.75 : 1;
  return Ob(o, t, {
    dur: s,
    step: n.step ?? 1,
    jitter: 0.012,
    f: [
      [0, e * Math.pow(2, i / 12)],
      [0.034, e],
      [s * 0.6, e],
      [s, e * a],
    ],
    F1: [
      [0, 480 * r],
      [0.04, 820 * r],
      [s, 620 * r],
    ],
    F2: [
      [0, 1250 * r],
      [0.04, 1950 * r],
      [s, 1650 * r],
    ],
    F3: [[0, 3100 * r]],
    fg: [1, 0.85, 0.45],
    rough: n.rough ?? 0.1,
    ring: 0.08,
    ringHz: e * 1.5,
    grit: 0.16,
    noise: 0.03,
    fb: 0.32,
    drive: 1.3,
    amp: [
      [0, 0],
      [0.006, 1],
      [s * 0.45, 0.72],
      [s, 0],
    ],
  });
}
function mu(o, t, e, s, n, i, a, r = 0.002) {
  let l = Math.min(o.length - e, Math.ceil(t * i * 7)),
    c = Math.exp(-1 / (t * i * 0.6)),
    h = Math.exp(-1 / (t * i)),
    f = Math.exp(-1 / (t * r)),
    u = 0,
    d = s - n,
    m = a,
    p = 1;
  for (let x = 0; x < l; x++)
    ((u += (qc * (n + d)) / t),
      (o[e + x] += (1 - p) * m * Math.sin(u)),
      (d *= c),
      (m *= h),
      (p *= f));
}
var tR = {
  "bark:f": 3,
  "bark:h": 3,
  "step:hard": 4,
  "step:wood": 3,
  "step:metal": 2,
  "step:soft": 3,
  "step:wet": 2,
  zip: 3,
  arc: 2,
};
function N$(o, t, e, s) {
  let n = Pg(Iw("k9:" + t + ":" + e + ":" + s)),
    i = (c) => 1 + c * (n() * 2 - 1),
    a = O$,
    r,
    l = (c, h, f = 1) => Xa(r, c, f, Math.floor(o * h));
  if (t === "motif")
    e === "ready"
      ? ((r = new Float32Array(Math.floor(o * 0.62))),
        l(S1(o, n, a.A4, 0.085), 0, 0.8),
        l(S1(o, n, a.D5, 0.085), 0.1, 0.88),
        l(
          S1(o, n, a.A5, 0.36, {
            rough: 0.06,
          }),
          0.2,
        ))
      : e === "boot"
        ? ((r = new Float32Array(Math.floor(o * 0.4))),
          l(S1(o, n, a.A4, 0.055), 0, 0.8),
          l(S1(o, n, a.D5, 0.055), 0.065, 0.88),
          l(
            S1(o, n, a.A5, 0.22, {
              rough: 0.06,
            }),
            0.13,
          ))
        : e === "expire"
          ? ((r = new Float32Array(Math.floor(o * 1))),
            l(
              S1(o, n, a.A5, 0.13, {
                scoop: 0,
                dark: 1,
              }),
              0,
              0.85,
            ),
            l(
              S1(o, n, a.D5, 0.13, {
                scoop: 0,
                dark: 1,
              }),
              0.17,
              0.85,
            ),
            l(
              S1(o, n, a.A4, 0.56, {
                scoop: 0,
                dark: 1,
                end: 0.62,
                step: 0,
                rough: [
                  [0, 0.05],
                  [0.56, 0.6],
                ],
              }),
              0.34,
            ))
          : ((r = new Float32Array(Math.floor(o * 0.26))),
            l(
              S1(o, n, a.D4, 0.075, {
                scoop: 2,
                dark: 1,
                end: 0.94,
                rough: 0.3,
              }),
              0,
            ),
            l(
              S1(o, n, a.D4, 0.09, {
                scoop: 2,
                dark: 1,
                end: 0.9,
                rough: 0.3,
              }),
              0.115,
            ));
  else if (t === "howlv") {
    let c = e === "a" ? 554.4 : 392,
      h = e === "a" ? 1.5 : 1.4;
    return Ob(o, n, {
      dur: h,
      jitter: 0.03,
      f: [
        [0, c * 0.67],
        [0.24, c],
        [h * 0.45, c * 0.985],
        [h, c * 0.72],
      ],
      F1: [
        [0, 350],
        [0.3, 640],
        [h, 380],
      ],
      F2: [
        [0, 800],
        [0.3, 1280],
        [h, 860],
      ],
      F3: [[0, 2500]],
      fg: [1, 0.7, 0.25],
      rough: [
        [0, 0.15],
        [h * 0.5, 0.3],
        [h, 0.75],
      ],
      ring: 0.22,
      ringHz: 311,
      grit: 0.25,
      noise: 0.07,
      fb: 0.45,
      drive: 1.5,
      amp: [
        [0, 0],
        [0.16, 1],
        [h * 0.5, 0.85],
        [h, 0],
      ],
    });
  } else if (t === "howl") {
    ((r = new Float32Array(Math.floor(o * 1.9))),
      l(Nb(o, "k9:howlv:a:0").mono[0], 0.1, 1),
      l(Nb(o, "k9:howlv:b:0").mono[0], 0.22, 0.6),
      mu(r, o, Math.floor(o * 0.01), 82, 55, 0.06, 0.5, 0.006),
      mu(r, o, Math.floor(o * 0.21), 78, 52, 0.07, 0.38, 0.006));
    for (let c = 0; c < r.length; c++) {
      let h = c / o,
        f = Math.sin(Math.PI * Ai((h - 0.15) / 1.5));
      r[c] +=
        0.035 *
        f *
        f *
        (Math.sin(qc * 3520 * h) + Math.sin(qc * 3729 * h)) *
        (0.6 + 0.4 * Math.sin(qc * 7 * h));
    }
  } else if (t === "bark") {
    if (e === "h") {
      ((r = new Float32Array(Math.floor(o * 1))),
        l(
          Ob(o, n, {
            dur: 0.95,
            jitter: 0.06,
            f: [
              [0, 68],
              [0.5, 74],
              [0.95, 58],
            ],
            F1: [
              [0, 340],
              [0.95, 300],
            ],
            F2: [
              [0, 980],
              [0.95, 880],
            ],
            F3: [[0, 2200]],
            fg: [1, 0.6, 0.2],
            rough: 0.9,
            ring: 0.3,
            ringHz: 155.6,
            grit: 0.35,
            noise: 0.25,
            snarl: 37,
            fb: 0.5,
            drive: 2.2,
            amp: [
              [0, 0],
              [0.12, 0.5],
              [0.7, 0.6],
              [0.95, 0],
            ],
          }),
          0,
          0.42,
        ));
      let h = (f, u, d, m, p) =>
        l(
          Ob(o, n, {
            dur: f,
            step: 0,
            jitter: 0.05,
            f: [
              [0, u * 0.85],
              [0.015, u],
              [f, d],
            ],
            F1: [
              [0, 430],
              [f * 0.3, 830 * i(0.06)],
              [f, 400],
            ],
            F2: [
              [0, 1100],
              [f * 0.3, 1750 * i(0.05)],
              [f, 1e3],
            ],
            F3: [[0, 2600]],
            fg: [1, 0.75, 0.55],
            rough: 0.7,
            ring: 0.42,
            ringHz: 233.1,
            grit: 0.4,
            noise: 0.34,
            snarl: 41,
            fb: 0.5,
            drive: 2.6,
            amp: [
              [0, 0],
              [0.004, 1],
              [f * 0.55, 0.75],
              [f, 0],
            ],
          }),
          p,
          m,
        );
      (h(0.13, 196 * i(0.03), 120, 0.8, 0.17),
        h(0.14, 180 * i(0.03), 108, 0.9, 0.36),
        h(0.24, 165 * i(0.03), 78, 1, 0.56));
      for (let f of [0.17, 0.36, 0.56])
        mu(r, o, Math.floor(o * f), 95, 52, 0.035, 0.6, 0.003);
      {
        let f = Math.floor(o * 0.19),
          u = 0;
        for (let d = 0; d < f; d++) {
          let m = d / f,
            p = 720 * Math.pow(3.7, m);
          ((u += (qc * p) / o),
            (r[d] +=
              0.1 *
              Math.sin(Math.PI * m) *
              (Math.sin(u) + 0.4 * Math.sin(2.01 * u))));
        }
      }
    } else {
      r = new Float32Array(Math.floor(o * 0.62));
      let h = (f, u, d, m, p) =>
        l(
          Ob(o, n, {
            dur: f,
            step: 0,
            jitter: 0.03,
            f: [
              [0, u * 0.8],
              [0.018, u],
              [f, d],
            ],
            F1: [
              [0, 520],
              [f * 0.35, 980 * i(0.06)],
              [f, 600],
            ],
            F2: [
              [0, 1400],
              [f * 0.35, 2050 * i(0.05)],
              [f, 1500],
            ],
            F3: [[0, 3e3]],
            fg: [1, 0.8, 0.6],
            rough: 0.3,
            ring: 0.14,
            ringHz: 293.7,
            grit: 0.22,
            noise: 0.16,
            fb: 0.38,
            drive: 2,
            amp: [
              [0, 0],
              [0.005, 1],
              [f * 0.5, 0.7],
              [f, 0],
            ],
          }),
          p,
          m,
        );
      (h(0.1, 330 * i(0.04), 250, 0.8, 0),
        h(0.16, 365 * i(0.04), 225, 1, 0.17),
        mu(r, o, Math.floor(o * 0.002), 120, 70, 0.02, 0.35),
        mu(r, o, Math.floor(o * 0.172), 125, 70, 0.025, 0.45),
        l(
          S1(o, n, 1174.7, 0.05, {
            scoop: -2,
          }),
          0.37,
          0.22,
        ),
        l(
          S1(o, n, 1760, 0.11, {
            scoop: -2,
          }),
          0.425,
          0.24,
        ));
    }
  } else if (t === "step") {
    r = new Float32Array(Math.floor(o * 0.17));
    let c = (h, f, u, d, m, p, x, g, b = 0, v = 0) => {
      let y = Ka(Math.floor(o * f), n);
      (rn(y, o, u, d, m, b, v),
        lh(y, 1 / Math.max(1e-9, dc(y))),
        ul(y, o, p, x),
        l(y, h, g));
    };
    if (e === "soft")
      (c(0, 0.12, pc, 360 * i(0.1), 0.7, 0.003, 0.016, 0.5),
        c(0.002, 0.1, Wc, 1700 * i(0.1), 0.5, 0.004, 0.018, 0.07),
        mu(r, o, 2, 120 * i(0.08), 72, 0.02, 0.5, 0.003));
    else if (e === "wet")
      (c(0, 0.15, Wc, 1100 * i(0.1), 0.9, 0.003, 0.035, 0.4, 2900, 0.03),
        c(0.004, 0.1, ca, 3200, 0.7, 0.004, 0.02, 0.1),
        mu(r, o, Math.floor(o * 0.028), 700 * i(0.2), 1500, 0.012, 0.18),
        mu(r, o, 2, 240, 130, 0.02, 0.35));
    else {
      (c(0, 0.08, Wc, 250 * i(0.1), 1.1, 8e-4, 0.009, 0.42),
        c(0, 0.05, Wc, 920 * i(0.12), 0.9, 5e-4, 0.005, 0.26),
        mu(r, o, 2, 150 * i(0.08), 88, 0.014, 0.3));
      let h = e === "wood" ? 0.4 : 1,
        f = 0.006 + 0.007 * n();
      if (
        (c(0.001, 0.01, ca, 3800, 0.7, 5e-5, 6e-4, 0.5 * h),
        c(f, 0.01, ca, 4300, 0.7, 5e-5, 5e-4, 0.24 * h),
        e !== "wood" &&
          (xu(r, o, Math.floor(o * 0.001), 5200 * i(0.12), 0.003, 0.2),
          xu(r, o, Math.floor(o * f), 6100 * i(0.12), 0.0025, 0.1)),
        e === "wood" &&
          (c(0, 0.1, Wc, 300 * i(0.08), 4, 6e-4, 0.02, 0.5),
          c(0, 0.06, Wc, 760 * i(0.08), 3, 6e-4, 0.01, 0.2)),
        e === "metal")
      ) {
        let u = 430 * i(0.08);
        (xu(r, o, 2, u, 0.05, 0.12),
          xu(r, o, 2, u * 2.63, 0.03, 0.08),
          xu(r, o, 2, u * 4.35, 0.018, 0.05));
      }
    }
  } else if (t === "zip") {
    let c = Math.floor(o * 0.07),
      h = 820 * i(0.1);
    r = new Float32Array(c);
    let f = 0,
      u = 0;
    for (let d = 0; d < c; d++) {
      let m = d / c,
        p = h * Math.pow(1.8, m);
      ((f += p / o),
        (u += (p * 1.013) / o),
        (r[d] =
          (2 * (f % 1) - 1 + 0.7 * (2 * (u % 1) - 1)) *
          Math.sin(Math.PI * Math.pow(m, 0.7))));
    }
    (rn(r, o, Wc, 2300, 2), rn(r, o, pc, 6e3, 0.7));
  } else if (t === "arc") {
    let c = Math.floor(o * 1.5);
    r = new Float32Array(c);
    let h = new Float32Array(c),
      f = 1,
      u = 0,
      d = 0;
    for (let b = 0; b < c; b++) {
      (b >= u &&
        ((f = n() < 0.68 ? 0.5 + 0.5 * n() : 0.04),
        (u = b + Math.floor(o * (0.006 + 0.022 * n())))),
        (d += 100 / o));
      let v = 2 * (d % 1) - 1;
      h[b] = (v * Math.abs(v) + 0.3 * (n() * 2 - 1)) * f;
    }
    (rn(h, o, ca, 1500, 0.7), rn(h, o, Hw, 3200, 1.2, 0, 0, 2), Xa(r, h, 0.5));
    let m = Ka(c, n);
    rn(m, o, Wc, 900, 0.8);
    for (let b = 0; b < c; b++)
      m[b] *= 0.5 + 0.5 * Math.sin((qc * 100 * b) / o);
    Xa(r, m, 0.35);
    for (let b = 0; b < 1.48; b += -Math.log(1 - n() * 0.999) / 75) {
      let v = Math.floor(o * (6e-4 + 0.0018 * n())),
        y = Ka(v, n);
      (rn(y, o, ca, 2500, 0.7),
        ul(y, o, 4e-5, 4e-4 + 6e-4 * n()),
        Xa(r, y, 0.5 + 1.2 * n() * n(), Math.floor(o * b)));
    }
    let p = Math.floor(o * 0.03),
      x = c - p,
      g = r.subarray(0, x);
    for (let b = 0; b < p; b++) {
      let v = b / p;
      g[b] = r[b] * v + r[x + b] * (1 - v);
    }
    return ((r = Float32Array.from(g)), lh(r, 1 / Zm(r)), r);
  } else return null;
  return (
    rn(r, o, ca, t === "step" ? 60 : 45, 0.7),
    Qm(r, o, t === "step" || t === "zip" ? 0.004 : 0.02),
    lh(r, 1 / Zm(r)),
    r
  );
}
var eI = {};
function Dw(o) {
  return (
    eI[o] ||
    (eI[o] = {
      sr: o,
      d: {},
      noise: null,
      queue: null,
    })
  );
}
function Nb(o, t) {
  let e = Dw(o);
  if (e.d[t]) return e.d[t];
  let s = t.split(":"),
    n;
  if (s[0] === "gun") {
    let i = I$(o, s[1], s[2], +s[3]);
    n = i.S
      ? {
          st: [sI(i.M, i.S, 1), sI(i.M, i.S, -1)],
          mono: [i.M],
        }
      : {
          mono: [i.M],
        };
  } else if (s[0] === "glass")
    n = {
      st: H$(o, s[1], +s[2]),
    };
  else if (s[0] === "exp")
    n = {
      mono: [F$(o, +s[1])],
    };
  else if (s[0] === "ir")
    n = {
      st: P$(o, s[1]),
    };
  else if (s[0] === "k9") {
    let i = N$(o, s[1], s[2], +s[3] || 0);
    if (!i) return null;
    n = {
      mono: [i],
    };
  } else return null;
  return (e.d[t] = n);
}
function sI(o, t, e) {
  let s = new Float32Array(o.length);
  for (let n = 0; n < s.length; n++) s[n] = o[n] + e * t[n];
  return s;
}
function B$() {
  let o = [];
  for (let t in gu) o.push(`gun:${t}:near:0`);
  o.push("glass:crack:0", "glass:crash:0", "glass:debris:0", "exp:0");
  for (let t in gu)
    for (let e = 1; e < Cg.near; e++) o.push(`gun:${t}:near:${e}`);
  for (let t in gu) o.push(`gun:${t}:far:0`);
  for (let t in gu) gu[t].sup && o.push(`gun:${t}:sup:0`);
  o.push(
    "glass:crack:1",
    "glass:crack:2",
    "glass:crash:1",
    "glass:debris:1",
    "glass:debris:2",
    "exp:1",
  );
  for (let t in gu) {
    for (let e = 1; e < Cg.far; e++) o.push(`gun:${t}:far:${e}`);
    for (let e = 1; e < Cg.sup; e++) o.push(`gun:${t}:sup:${e}`);
  }
  for (let t of ["ready", "denied", "boot", "expire"])
    o.push(`k9:motif:${t}:0`);
  o.push("k9:howlv:a:0", "k9:howlv:b:0", "k9:howl:-:0");
  for (let t in tR)
    for (let e = 0; e < tR[t]; e++)
      o.push(t.includes(":") ? `k9:${t}:${e}` : `k9:${t}:-:${e}`);
  return o;
}
var Xd = {
  crack: 3,
  crash: 2,
  debris: 3,
};
var U$ = 2;
function V$(o, t, e) {
  let s = (d) => Math.pow(10, d / 20),
    n = (d) => 20 * Math.log10(d),
    i = s(o),
    a = 1 / e,
    r = (d, m) => (d < i ? d : i + (1 - Math.exp(-m * (d - i))) / m),
    l = s(o + t),
    c = 0.1,
    h = 1e4,
    f = 5;
  for (let d = 0; d < 15; d++)
    ((n(r(l * 1.001, f)) - n(r(l, f))) / (n(l * 1.001) - n(l)) < a
      ? (h = f)
      : (c = f),
      (f = Math.sqrt(c * h)));
  let u = 1 < l ? r(1, f) : s(n(r(l, f)) + a * (0 - (o + t)));
  return Math.pow(1 / u, 0.6);
}
var Yd = {
  thr: -5,
  knee: 5,
  ratio: 12,
  attack: 0.002,
  release: 0.11,
};
var G$ = {
  own: 10,
  gun: 18,
  exp: 4,
  casing: 6,
  impact: 10,
  step: 8,
  ownstep: 4,
  foley: 8,
  glass: 7,
  debris: 5,
  prop: 8,
  ui: 10,
  big: 5,
  misc: 12,
  k9: 8,
  k9step: 6,
};
var W$ = 1;
var q$ = 0.62;
var K$ = 0.7;
var X$ = 0.56;
var nI = 0.7;
var oI = 63e-5;
var iI = 0.12;
var Y$ = 0.22;
var eR = 72;
var Fb = 240 / eR;
var j$ = [
  [38, 50, 53, 57, 64],
  [34, 46, 53, 58, 62],
  [31, 43, 50, 58, 65],
  [33, 45, 52, 57, 61],
];
var $$ = [
  [0, 0, 69, 1.5],
  [0, 1.5, 74, 0.5],
  [0, 2, 76, 2],
  [1, 0, 69, 1.5],
  [1, 1.5, 74, 0.5],
  [1, 2, 77, 2],
  [2, 0, 67, 1.5],
  [2, 1.5, 74, 0.5],
  [2, 2, 76, 1.5],
  [2, 3.5, 74, 0.5],
  [3, 0, 73, 3],
];
var J9 = [
  {
    v: [58, 62, 63, 67],
    r: 36,
    th: 3,
    fi: 7,
    s: [60, 62, 63, 65, 67, 69, 70],
    t: [3, 7, 10, 2],
  },
  {
    v: [57, 62, 63, 67],
    r: 41,
    th: 4,
    fi: 7,
    s: [60, 62, 63, 65, 67, 69, 70],
    t: [9, 3, 2, 7],
  },
  {
    v: [57, 60, 62, 65],
    r: 34,
    th: 4,
    fi: 7,
    s: [60, 62, 63, 65, 67, 69, 70],
    t: [2, 5, 9, 0],
  },
  {
    v: [55, 58, 62, 65],
    r: 39,
    th: 4,
    fi: 7,
    s: [60, 62, 63, 65, 67, 69, 70],
    t: [7, 10, 2, 5],
  },
  {
    v: [55, 60, 63, 67],
    r: 33,
    th: 3,
    fi: 6,
    s: [60, 62, 63, 65, 67, 69, 70],
    t: [0, 3, 7],
  },
  {
    v: [54, 58, 60, 63],
    r: 38,
    th: 4,
    fi: 7,
    s: [60, 62, 63, 66, 67, 69, 70],
    t: [6, 0, 3, 9],
  },
  {
    v: [58, 62, 64, 69],
    r: 31,
    th: 3,
    fi: 7,
    s: [60, 62, 64, 65, 67, 69, 70],
    t: [10, 2, 4, 7],
  },
  {
    v: [58, 62, 64, 67],
    r: 31,
    th: 3,
    fi: 7,
    s: [60, 62, 64, 65, 67, 69, 70],
    t: [10, 2, 7],
  },
];
var Z$ = [
  [
    [0, 0],
    [1, 0.64],
  ],
  [
    [0, 0.64],
    [2, 0],
  ],
  [
    [0, 0],
    [2, 0.64],
    [3, 0.64],
  ],
  [
    [1, 0],
    [2, 0.64],
  ],
  [
    [0, 0],
    [3, 0],
  ],
  [
    [1, 0.64],
    [3, 0],
  ],
];
var Q$ = {
  ar: 1,
  smg: 1.1,
  shotgun: 0.84,
  pistol: 1.22,
};
var aI = Object.freeze({
  relay: 0,
  whine: [0.02, 0.55],
  legs: [0.1, 0.17, 0.24, 0.31],
  lift1: [0.36, 0.5],
  lift2: [0.53, 0.65],
  head: 0.62,
  ears: [0.71, 0.75],
  antenna: 0.78,
  taps: [0.8, 0.83, 0.86, 0.89],
  shake: [0.91, 1],
});
var J$ = 0.3;
var tZ = 0.05;

export {
  $$,
  Ai,
  B$,
  Cg,
  Dw,
  Fb,
  Fl,
  G$,
  Gc,
  J$,
  J9,
  JD,
  K$,
  Lw,
  Nb,
  Q$,
  U$,
  V$,
  W$,
  X$,
  Xd,
  Y$,
  Yd,
  Z$,
  aI,
  eR,
  fl,
  gu,
  iI,
  j$,
  nI,
  oI,
  q$,
  qt,
  rh,
  s2,
  tI,
  tR,
  tZ,
  zw,
};

// player/operator-mesh.js: recovered from the verified GOLDEN HOUR release.
import { createNoise } from "../core/math.js";
import {
  Au,
  CR,
  Ca,
  DE,
  FR,
  JI,
  OR,
  PE,
  Pi,
  Ru,
  Tu,
  Ve,
  Xg,
  Yg,
  d5,
  dh,
  e4,
  eH,
  en,
  io,
  iy,
  ku,
  l2,
  l5,
  np,
  qr,
  tH,
  tf,
  ti,
  u2,
  uh,
  vH,
  yE,
} from "./rig.js";
import { Matrix4, Vector3 } from "../vendor/three-r180.js";

var _f = Math.PI * 2;
var lo = Math.PI;
var JT = (o, t, e) => (o < t ? t : o > e ? e : o);
var _2 = (o, t, e) => {
  let s = JT((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
var XT = (o, t) => Math.exp(-(o * o) / (t * t));
var ct0 = (o, t, e) => JT((e - o) / (t - o), 0, 1);
var ZT = (o) => ((o = (o + lo) % _f), o < 0 && (o += _f), o - lo);
var ht0 = createNoise(905);
var ro = [0, 0, 0, 0, 0];
var Rs = [0, 0, 0, 0, 0, 0];
var ON = (o, t, e, s) => [
  [t, s, 0.7, 0.7],
  [o, s, -0.7, 0.7],
  [o, e, -0.7, -0.7],
  [t, e, 0.7, -0.7],
];
function mo(o, t, e = 0, s = 0, n = 0, i = 0) {
  return ti(
    o,
    t[0] + t[3] * e,
    t[1],
    t[2] + t[4] * e,
    s,
    Math.atan2(-t[3], -t[4]) + i,
    n,
  );
}
function YT(o, t, e, s = 0) {
  let n = new Vector3(-e[0], -e[1], -e[2]).normalize(),
    i = new Vector3(0, 1, 0),
    a = new Vector3().crossVectors(i, n).normalize(),
    r = new Vector3().crossVectors(n, a);
  return yE(
    o,
    new Matrix4()
      .makeBasis(a, r, n)
      .setPosition(t[0] + e[0] * s, t[1] + e[1] * s, t[2] + e[2] * s),
  );
}
function G5(o, t, e, s, n, i = 0, a = _f) {
  let r = [],
    l = a - i >= _f - 1e-6,
    c = l ? n : n + 1;
  for (let h = 0; h < c; h++) {
    let f = a - (a - i) * (h / n),
      u = o(t, f, e, s, [0, 0, 0, 0, 0]);
    r.push({
      p: [u[0], u[1], u[2]],
      b: [0, 1, 0],
      n: [u[3], 0, u[4]],
    });
  }
  return r;
}
var jl = {
  yc: 1.706,
  cz: 0.004,
  a: 0.109,
  bb: 0.134,
  bf: 0.13,
  ry: 0.122,
};
function Sf(o, t, e, s) {
  let n = Math.sin(o),
    i = -Math.cos(o),
    a = tf(n, i, jl.a, jl.bb, jl.bf, 2.25),
    r = Math.pow(Math.max(Math.cos(t), 0), 0.85),
    l = Math.sin(t),
    c = a * r * n,
    h = jl.ry * l,
    f = a * r * i,
    u = c / (jl.a * jl.a),
    d = h / (jl.ry * jl.ry),
    m = f / (i >= 0 ? jl.bb * jl.bb : jl.bf * jl.bf),
    p = Math.hypot(u, d, m) || 1;
  return (
    (u /= p),
    (d /= p),
    (m /= p),
    (s[0] = c + u * e),
    (s[1] = jl.yc + h + d * e),
    (s[2] = jl.cz + f + m * e),
    (s[3] = u),
    (s[4] = d),
    (s[5] = m),
    s
  );
}
var q4 = (o) => {
  let t = Math.abs(ZT(o));
  return 1.744 - 0.008 * _2(0.6, 1.2, t) - 0.062 * _2(1.95, 2.5, t);
};
var QT = (o) => Math.asin(JT((o - jl.yc) / jl.ry, -0.99, 0.99));
function jT(o, t, e, s, n, i = 3, a = 4) {
  return uh(i, a, (r, l, c) => {
    (Sf(o + ((t - o) * l) / a, e + ((s - e) * r) / i, n, Rs),
      (c[0] = Rs[0]),
      (c[1] = Rs[1]),
      (c[2] = Rs[2]));
  });
}
function $T(o, t, e, s, n) {
  let i = [];
  for (let a = 0; a <= e; a++) {
    let r = t + (o - t) * (a / e);
    Sf(r, QT(s(r)), n, Rs);
    let l = Math.hypot(Rs[3], Rs[5]) || 1;
    i.push({
      p: [Rs[0], Rs[1], Rs[2]],
      b: [0, 1, 0],
      n: [Rs[3] / l, 0, Rs[5] / l],
    });
  }
  return i;
}
var Xy = [];
function NN(o, t, e, s, n, i, a) {
  let r = s + 1,
    l = [];
  for (let g = 0; g <= s; g++) l.push(g);
  for (let g = 1; g <= e; g++) l.push(g * r + s);
  for (let g = s - 1; g >= 0; g--) l.push(e * r + g);
  for (let g = e - 1; g >= 1; g--) l.push(g * r);
  let c = (g) => [t.p[g * 3], t.p[g * 3 + 1], t.p[g * 3 + 2]],
    h = (g) => [t.n[g * 3], t.n[g * 3 + 1], t.n[g * 3 + 2]],
    f = 0,
    u = 0,
    d = 0;
  for (let g of l) {
    let b = c(g);
    ((f += b[0]), (u += b[1]), (d += b[2]));
  }
  ((f /= l.length), (u /= l.length), (d /= l.length));
  let m = {
      p: [],
      n: [],
      uv: [],
      idx: [],
    },
    p = [];
  for (let g = 0; g < l.length; g++) {
    let b = l[g],
      v = l[(g + 1) % l.length],
      y = c(b),
      M = c(v),
      w = h(b),
      T = h(v),
      S = [M[0] - T[0] * i, M[1] - T[1] * i, M[2] - T[2] * i],
      E = [y[0] - w[0] * i, y[1] - w[1] * i, y[2] - w[2] * i],
      _ = M[0] - y[0],
      R = M[1] - y[1],
      C = M[2] - y[2],
      L = E[0] - y[0],
      A = E[1] - y[1],
      O = E[2] - y[2],
      H = R * O - C * A,
      F = C * L - _ * O,
      P = _ * A - R * L,
      z = Math.hypot(H, F, P) || 1;
    ((H /= z), (F /= z), (P /= z));
    let k =
        H * ((y[0] + M[0]) / 2 - f) +
          F * ((y[1] + M[1]) / 2 - u) +
          P * ((y[2] + M[2]) / 2 - d) >=
        0,
      I = k ? 1 : -1,
      G = m.p.length / 3;
    for (let K of [y, M, S, E])
      (m.p.push(K[0], K[1], K[2]),
        m.n.push(H * I, F * I, P * I),
        m.uv.push(0, 0));
    (p.push(b, v, v, b),
      k
        ? m.idx.push(G, G + 1, G + 2, G, G + 2, G + 3)
        : m.idx.push(G, G + 2, G + 1, G, G + 3, G + 2));
  }
  let x = p.map((g) => [
    o.si[(n + g) * 4],
    o.sw[(n + g) * 4],
    o.si[(n + g) * 4 + 1],
    o.sw[(n + g) * 4 + 1],
  ]);
  return {
    pt: m,
    opts: {
      ...a,
      weights: (g, b, v, y, M) => {
        let w = x[M];
        ((y[0] = w[0]), (y[1] = w[1]), (y[2] = w[2]), (y[3] = w[3]));
      },
    },
  };
}
function BN(o, t) {
  JI(o);
  for (let e of Xy) o.add(e.pt, e.opts);
  Xy.length = 0;
}
function UN(o, t) {
  Xy.length = 0;
  let e = PE(),
    s = (d, m) => o.add(d, m),
    n = (d, m) => ({
      color: d,
      rough: 0.82,
      surf: 1,
      nrm: 1,
      ...m,
    }),
    i = (d, m) => ({
      color: d,
      rough: 0.5,
      surf: 1,
      nrm: 0.12,
      ...m,
    }),
    a = (d) => ({
      color: t.glow,
      glow: t.glowK,
      rough: 0.3,
      nrm: 0,
      ...d,
    }),
    r = {
      knit: 2895665,
      suede: 7298373,
      panel: 8021321,
      rubber: 1250067,
    },
    l = (d, m, p, x, g, b = 0.004, v = 1, y) =>
      Tu(d, () => (b > 0 ? Yg(m, p, x, g, b, v) : ON(m, p, x, g)), y),
    c = {
      bone: Ve.chest,
    },
    h = 1.33,
    f = 0.006,
    u = 0.032;
  {
    let d = (p, x, g) => {
      let b = ku(h, p - 1.06, p + 1.06, 16, f);
      return Tu(b, (v) => {
        let y = Math.abs(ZT(b[v].az - p));
        return Yg(x - h, g - 0.085 * _2(0.45, 1.06, y) - h, 0, u, 0.011, 2);
      });
    };
    (s(d(0, 1.15, 1.47), n(t.gear, c)), s(d(lo, 1.145, 1.474), n(t.gear, c)));
    for (let p of [1, -1]) {
      let x = p > 0 ? 0.98 : -(lo - 0.98),
        g = p > 0 ? lo - 0.98 : -0.98;
      s(
        l(ku(1.235, x, g, 10, 0.003), -0.078, 0.072, 0, 0.015, 0.005, 1),
        n(t.gear, c),
      );
      for (let b of [1.185, 1.225, 1.265])
        s(
          l(
            ku(1.235, x + 0.06, g - 0.06, 8, 0.018),
            b - 1.235 - 0.012,
            b - 1.235 + 0.012,
            0,
            0.0032,
            0,
          ),
          n(t.web, c),
        );
      s(
        mo(en(0.03, 0.046, 0.012, 0.004), io(1.235, p * 1.09, 0.022, ro)),
        i(t.hard, c),
      );
    }
    for (let p = 0; p < 5; p++) {
      let x = 1.185 + p * 0.042;
      s(
        l(
          ku(h, lo - 0.9, lo + 0.9, 8, f + u),
          x - h - 0.0125,
          x - h + 0.0125,
          0,
          0.0034,
          0,
        ),
        n(t.web, c),
      );
    }
    {
      io(h, lo, f + u, ro);
      let p = [];
      for (let x = 0; x <= 8; x++) {
        let g = x / 8,
          b = -0.05 + 0.1 * g,
          v = 0.014 * Math.sin(lo * g);
        p.push({
          p: [b, 1.432 + v * 0.5, ro[2] + 0.002 + v],
          b: [0, 1, 0],
          n: [0, 0, 1],
        });
      }
      (s(l(p, -0.013, 0.013, 0, 0.005, 0.002, 1), n(t.gearDk, c)),
        s(
          mo(en(0.15, 0.04, 0.006, 0.002), io(1.398, lo, f + u + 0.003, ro)),
          n(t.gearDk, {
            ...c,
            surf: 0,
          }),
        ),
        s(mo(Xg(0.125, 0.022, 0.004), io(1.398, lo, f + u + 0.007, ro)), a(c)));
    }
    (s(
      l(ku(h, -0.6, 0.6, 8, f + u), 1.385 - h, 1.452 - h, 0, 0.004, 0.002, 1),
      n(t.gearDk, {
        ...c,
        surf: 0,
      }),
    ),
      s(mo(Xg(0.085, 0.018, 0.004), io(1.425, 0.26, f + u + 0.0055, ro)), a(c)),
      s(
        mo(en(0.05, 0.03, 0.005, 0.002), io(1.418, -0.26, f + u + 0.0055, ro)),
        n(t.gearLt, c),
      ),
      s(
        l(
          ku(h, -0.92, 0.92, 10, f + u),
          1.158 - h,
          1.325 - h,
          0,
          0.006,
          0.003,
          1,
        ),
        n(t.gearLt, c),
      ));
    let m = {
      ...c,
      fp: 2,
    };
    for (let p of [-0.52, 0, 0.52]) {
      let x = f + u + 0.006;
      (s(
        mo(en(0.071, 0.112, 0.036, 0.009), io(1.222, p, x + 0.017, ro)),
        n(t.gear, m),
      ),
        s(
          mo(en(0.071, 0.018, 0.038, 0.004), io(1.174, p, x + 0.018, ro)),
          n(t.gearDk, m),
        ),
        s(
          mo(
            en(0.058, 0.062, 0.021, 0.005),
            io(1.294, p, x + 0.018, ro),
            0,
            -0.05,
          ),
          i(t.mag, {
            ...m,
            rough: 0.42,
          }),
        ),
        s(
          mo(Xg(0.05, 0.004, 0.0225), io(1.307, p, x + 0.018, ro), 0, -0.05),
          i(t.metal, {
            ...m,
            rough: 0.35,
            metal: 0.6,
          }),
        ));
      let g = io(1.276, p, x, [0, 0, 0, 0, 0]),
        b = [];
      for (let v = 0; v <= 6; v++) {
        let y = v / 6,
          M = lo * y;
        b.push([0, 0.058 * Math.sin(M) * 1.02, -0.0185 - 0.0185 * Math.cos(M)]);
      }
      (s(mo(dh(b, 0.0026, 4, !1), g, 0, 0, 0), n(t.hard, m)),
        s(
          mo(
            en(0.014, 0.024, 0.004, 0.0015),
            io(1.348, p, x + 0.018, ro),
            0,
            -0.25,
          ),
          n(t.web, m),
        ));
    }
    for (let p of [1, -1]) {
      let x = p * 0.094,
        g = io(1.452, p * 0.62, f + u * 0.5, [0, 0, 0, 0, 0]),
        b = io(1.455, lo - p * 0.62, f + u * 0.5, [0, 0, 0, 0, 0]),
        v = [
          [1.44, g[2] - 0.004],
          [1.476, g[2] + 0.01],
        ];
      for (let w = 0; w <= 7; w++) {
        let T = g[2] + 0.034 + ((b[2] - 0.034 - (g[2] + 0.034)) * w) / 7;
        v.push([DE(Math.abs(x), T) + 0.002, T]);
      }
      v.push([1.48, b[2] - 0.01], [1.44, b[2] + 0.004]);
      let y = [];
      for (let w = 0; w < v.length * 2 - 1; w++) {
        let T = v[w >> 1],
          S = v[Math.min((w + 1) >> 1, v.length - 1)];
        y.push({
          y: (T[0] + S[0]) / 2,
          z: (T[1] + S[1]) / 2,
        });
      }
      let M = y.map((w, T) => {
        let S = y[Math.max(T - 1, 0)],
          E = y[Math.min(T + 1, y.length - 1)],
          _ = E.y - S.y,
          R = E.z - S.z,
          C = Math.hypot(_, R) || 1;
        ((_ /= C), (R /= C));
        let L = _2(1.47, 1.5, w.y),
          A =
            Math.atan(
              (DE(Math.abs(x) + 0.02, w.z) - DE(Math.abs(x) - 0.02, w.z)) /
                0.04,
            ) *
            p *
            L *
            0.85,
          O = Math.cos(A),
          H = Math.sin(A);
        return {
          p: [x, w.y, w.z],
          b: [O, H, 0],
          n: [-R * H, R * O, -_ * O],
        };
      });
      (s(l(M, -0.028, 0.028, 0, 0.009, 0.003, 1), n(t.gear, c)),
        s(
          l(M.slice(5, M.length - 5), -0.031, 0.031, 0.006, 0.015, 0.005, 1),
          n(t.gearDk, c),
        ),
        s(
          ti(
            en(0.044, 0.026, 0.012, 0.004),
            x,
            1.468,
            g[2] - 0.006,
            -0.45,
            0,
            0,
          ),
          i(t.hard, c),
        ),
        s(
          ti(en(0.03, 0.05, 0.005, 0.002), x, 1.428, g[2] - 0.017, -0.12, 0, 0),
          n(t.web, c),
        ));
    }
    {
      let p = io(1.275, -2.06, 0.018, [0, 0, 0, 0, 0]);
      (s(mo(en(0.064, 0.14, 0.038, 0.008), p, 0.02), n(t.gear, c)),
        s(
          mo(en(0.056, 0.05, 0.036, 0.006), io(1.352, -2.06, 0.018, ro), 0.02),
          i(t.hard, c),
        ));
      let x = p[0] + p[3] * 0.02 - 0.012,
        g = p[2] + p[4] * 0.02;
      (s(ti(l5(0.007, 0.008, 0.03, 7), x, 1.39, g), i(t.hard, c)),
        s(
          ti(l5(0.006, 0.006, 0.014, 7), x + 0.03, 1.384, g),
          i(t.metal, {
            ...c,
            metal: 0.5,
          }),
        ),
        s(
          dh(
            [
              [x, 1.4, g],
              [x - 0.002, 1.47, g + 0.004],
              [x - 0.008, 1.56, g + 0.016],
              [x - 0.02, 1.66, g + 0.04],
            ],
            (b) => 0.0042 - 0.0018 * b,
            5,
          ),
          i(t.hard, {
            ...c,
            rough: 0.6,
            fp: 1,
          }),
        ));
    }
    (s(
      mo(en(0.055, 0.095, 0.036, 0.01), io(1.245, 2.02, 0.036, ro)),
      n(t.gearLt, c),
    ),
      s(
        mo(en(0.057, 0.03, 0.038, 0.006), io(1.283, 2.02, 0.037, ro)),
        n(t.gear, c),
      ),
      s(
        mo(ti(l5(0.029, 0.029, 0.105, 12), 0, 0, 0), io(1.25, 1.42, 0.047, ro)),
        n(t.gear, c),
      ),
      s(
        mo(
          ti(l5(0.021, 0.024, 0.02, 10), 0, 0.062, 0),
          io(1.25, 1.42, 0.047, ro),
        ),
        i(t.metal, {
          ...c,
          metal: 0.5,
          rough: 0.4,
        }),
      ),
      s(
        ti(en(0.034, 0.046, 0.02, 0.006), -0.094, 1.405, -0.158, -0.2, 0.1, 0),
        i(t.hard, c),
      ));
  }
  {
    let d = {
        bone: Ve.pelvis,
      },
      m = (p) => {
        let x = ku(1.062, -lo, lo, 40, p);
        return (x.pop(), x);
      };
    (s(
      l(m(0.002), -0.036, 0.036, 0, 0.009, 0.004, 1, {
        closed: !0,
      }),
      n(t.gearDk, d),
    ),
      s(
        l(m(0.011), -0.024, 0.024, 0, 0.006, 0.002, 1, {
          closed: !0,
        }),
        n(t.gear, d),
      ),
      s(
        mo(en(0.054, 0.042, 0.014, 0.005), io(1.062, 0, 0.022, ro)),
        i(t.metal, {
          ...d,
          metal: 0.7,
          rough: 0.38,
        }),
      ),
      s(
        mo(en(0.024, 0.03, 0.017, 0.004), io(1.062, 0, 0.023, ro)),
        i(t.hard, d),
      ),
      s(
        l(
          ku(1.062, lo - 0.34, lo + 0.34, 5, 0.0175),
          -0.009,
          0.009,
          0,
          0.003,
          0,
        ),
        a(d),
      ));
    {
      let p = io(1.03, 1.5, 0.017, [0, 0, 0, 0, 0]);
      (s(mo(en(0.07, 0.1, 0.012, 0.004), p, 0.006, 0, 0), i(t.hard, d)),
        s(
          mo(
            ti(en(0.088, 0.165, 0.042, 0.012), 0.008, -0.085, 0, 0, 0, 0.14),
            p,
            0.034,
          ),
          i(t.hard, {
            ...d,
            rough: 0.42,
          }),
        ),
        s(
          mo(
            ti(en(0.04, 0.085, 0.03, 0.008), 0.045, 0.045, 0, 0, 0, 0.34),
            p,
            0.034,
          ),
          i(t.mag, {
            ...d,
            rough: 0.55,
          }),
        ),
        s(
          mo(
            ti(en(0.105, 0.03, 0.027, 0.006), 0.005, 0.012, 0, 0, 0, 0.14),
            p,
            0.034,
          ),
          i(t.metal, {
            ...d,
            metal: 0.6,
            rough: 0.35,
          }),
        ),
        s(
          mo(
            ti(en(0.02, 0.05, 0.05, 0.004), -0.02, -0.03, 0, 0, 0, 0.14),
            p,
            0.056,
          ),
          i(t.hard, d),
        ));
    }
    for (let p of [-0.6, -0.93])
      (s(
        mo(en(0.031, 0.082, 0.027, 0.006), io(1.048, p, 0.031, ro)),
        i(t.hard, {
          ...d,
          rough: 0.45,
        }),
      ),
        s(
          mo(en(0.023, 0.022, 0.015, 0.003), io(1.096, p, 0.031, ro)),
          i(t.mag, d),
        ));
    (s(
      mo(en(0.078, 0.118, 0.034, 0.008), io(1.036, -1.52, 0.034, ro)),
      n(t.gear, d),
    ),
      s(
        mo(en(0.062, 0.04, 0.022, 0.004), io(1.108, -1.52, 0.034, ro)),
        i(t.mag, {
          ...d,
          rough: 0.42,
        }),
      ),
      s(
        mo(
          ti(l5(0.034, 0.034, 0.115, 10), 0, 0, 0, 0, 0, lo / 2),
          io(1.02, -2.5, 0.045, ro),
        ),
        n(t.gearLt, d),
      ),
      s(
        mo(en(0.03, 0.075, 0.006, 0.002), io(1.03, -2.5, 0.082, ro)),
        n(t.web, d),
      ),
      s(
        mo(en(0.13, 0.09, 0.058, 0.016), io(1.04, 2.56, 0.046, ro)),
        n(t.gearLt, d),
      ),
      s(
        mo(en(0.132, 0.02, 0.06, 0.006), io(1.058, 2.56, 0.047, ro)),
        n(t.gear, d),
      ),
      s(
        mo(en(0.022, 0.03, 0.004, 0.001), io(1.03, 2.56, 0.078, ro)),
        n(6954262, d),
      ));
  }
  for (let d = 0; d < 2; d++) {
    let m = d ? 1 : -1,
      p = d ? Au.legR : Au.legL,
      x = qr,
      g = d * d5,
      b = [0, 0, 0, 0, 0],
      v = (w, T, S, E) => FR(T, d, E),
      y = (w, T, S) =>
        uh(6, 7, (E, _, R) => {
          let C = -1 + (2 * _) / 7,
            L = -1 + (2 * E) / 6,
            A =
              Math.pow(Math.max(1 - Math.pow(Math.abs(C), 2.6), 0), 0.5) *
              Math.pow(Math.max(1 - Math.pow(Math.abs(L), 2.6), 0), 0.5);
          (e4(
            x + 0.002 + L * 0.058 * w,
            lo / 2 + C * 0.84 * w,
            m,
            T + S * A * (1 + 0.45 * Math.exp((-C * C) / 0.1) * (1 - L * L)),
            b,
          ),
            (R[0] = b[0]),
            (R[1] = b[1]),
            (R[2] = b[2]));
        });
    {
      let w = y(1, 0.005, 0.013),
        T = o.count;
      (s(
        w,
        i(t.pad, {
          m: p,
          weights: v,
          rough: 0.62,
          nrm: 0.3,
        }),
      ),
        Xy.push(
          NN(
            o,
            w,
            6,
            7,
            T,
            0.009,
            i(t.pad, {
              rough: 0.7,
              nrm: 0.3,
              ao: 0.7,
            }),
          ),
        ));
      let S = y(1.12, 0.0025, 0.006),
        E = o.count;
      (s(
        S,
        n(t.gearDk, {
          m: p,
          weights: v,
        }),
      ),
        Xy.push(
          NN(
            o,
            S,
            6,
            7,
            E,
            0.0065,
            n(t.gearDk, {
              ao: 0.6,
            }),
          ),
        ));
    }
    s(
      l(G5(e4, x + 0.074, m, 0.003, 18), -0.011, 0.011, 0, 0.004, 0),
      n(t.gearDk, {
        m: p,
        weights: v,
      }),
    );
    let M = d ? 0 : lo;
    (s(
      l(
        G5(e4, 0.235, m, 0.002, 7, M - 0.82, M + 0.82),
        -0.075,
        0.075,
        0,
        0.02,
        0.008,
        1,
      ),
      {
        color: 16777215,
        camo: 1,
        surf: 0,
        rough: 0.9,
        m: p,
        weights: v,
      },
    ),
      s(
        l(
          G5(e4, 0.18, m, 0.018, 7, M - 0.86, M + 0.86),
          -0.026,
          0.026,
          0,
          0.007,
          0.003,
          1,
        ),
        {
          color: 15263976,
          camo: 1,
          surf: 0,
          rough: 0.9,
          m: p,
          weights: v,
        },
      ),
      s(
        l(
          G5(e4, 0.18, m, 0.0255, 5, M - 0.62, M + 0.62),
          -0.008,
          0.008,
          0,
          0.003,
          0,
        ),
        a({
          m: p,
          weights: v,
        }),
      ));
  }
  for (let d = 0; d < 2; d++) {
    let m = d ? 1 : -1,
      p = d ? Au.armR : Au.armL,
      x = Ca,
      g = d * Ru,
      b = [0, 0, 0, 0, 0],
      v = (w, T, S, E) => OR(T, d, E),
      y = (w, T, S) =>
        uh(5, 6, (E, _, R) => {
          let C = -1 + (2 * _) / 6,
            L = -1 + (2 * E) / 5,
            A =
              Math.pow(Math.max(1 - Math.pow(Math.abs(C), 2.6), 0), 0.5) *
              Math.pow(Math.max(1 - Math.pow(Math.abs(L), 2.6), 0), 0.5);
          (iy(
            x + 0.008 + L * 0.046 * w,
            -lo / 2 + C * 0.8 * w,
            m,
            T + S * A,
            b,
          ),
            (R[0] = b[0]),
            (R[1] = b[1]),
            (R[2] = b[2]));
        });
    (s(
      y(1, 0.0045, 0.01),
      i(t.pad, {
        m: p,
        weights: v,
        rough: 0.62,
        nrm: 0.3,
      }),
    ),
      s(
        y(1.1, 0.0025, 0.005),
        n(t.gearDk, {
          m: p,
          weights: v,
        }),
      ));
    let M = d ? 0 : lo;
    (s(
      l(
        G5(iy, 0.118, m, 0.002, 7, M - 1, M + 1),
        -0.052,
        0.052,
        0,
        0.007,
        0.003,
        1,
      ),
      {
        color: 15790320,
        camo: 1,
        surf: 0,
        rough: 0.9,
        m: p,
        weights: v,
      },
    ),
      s(
        l(
          G5(iy, 0.105, m, 0.009, 7, M - 0.92, M + 0.92),
          -0.033,
          0.033,
          0,
          0.003,
          0,
        ),
        n(t.gearDk, {
          surf: 0,
          m: p,
          weights: v,
        }),
      ),
      s(
        l(
          G5(iy, 0.105, m, 0.012, 6, M - 0.8, M + 0.8),
          -0.021,
          0.021,
          0,
          0.0035,
          0,
        ),
        a({
          m: p,
          weights: v,
        }),
      ));
  }
  for (let d = 0; d < 2; d++) {
    let m = e[Ve.hand + d * Ru],
      p = {
        bone: Ve.hand + d * Ru,
        m,
      },
      x = d
        ? {
            f: [
              [40, 62, 30],
              [62, 88, 48],
              [64, 90, 50],
              [66, 92, 52],
            ],
            th: [
              [0.036, -0.02, -0.004],
              [0.054, 0.004, 0.016],
              [0.052, 0.034, 0.034],
              [0.042, 0.058, 0.042],
            ],
          }
        : {
            f: [
              [52, 74, 40],
              [60, 82, 44],
              [62, 84, 46],
              [64, 86, 48],
            ],
            th: [
              [0.036, -0.02, -0.004],
              [0.056, 0.002, 0.018],
              [0.057, 0.032, 0.038],
              [0.05, 0.058, 0.05],
            ],
          },
      g = (S) => (d ? S : tH(S)),
      b = [
        [0.031, 0.046],
        [0.0095, 0.05],
        [-0.0125, 0.047],
        [-0.033, 0.04],
      ],
      v = [
        [0.045, 0.027, 0.023],
        [0.05, 0.03, 0.024],
        [0.046, 0.028, 0.023],
        [0.036, 0.022, 0.021],
      ],
      y = [5, 0, -4, -10];
    (s(g(ti(en(0.088, 0.102, 0.031, 0.013), 0, -0.004, -0.0125)), {
      color: (S, E, _) => (_ > -0.0125 ? r.suede : r.knit),
      rough: 0.95,
      surf: 0,
      nrm: 0.9,
      ...p,
    }),
      s(
        g(ti(en(0.078, 0.024, 0.008, 0.004), 0, 0.037, -0.0295)),
        i(r.rubber, {
          ...p,
          rough: 0.78,
        }),
      ),
      s(
        g(ti(en(0.05, 0.032, 0.005, 0.002), 0.002, -0.02, -0.0295)),
        n(r.panel, {
          ...p,
          surf: 0,
          rough: 0.95,
        }),
      ));
    for (let S = 0; S < 4; S++) {
      let E = [],
        _ = 0.0125 - S * 4e-4,
        R = (y[S] * lo) / 180,
        C = b[S][1],
        L = -0.012,
        A = b[S][0],
        O = 0;
      (E.push([A, C - 0.012, L]), E.push([A, C, L]));
      for (let H = 0; H < 3; H++) {
        let F = O + (x.f[S][H] * lo) / 180,
          P = v[S][H],
          z = (O + F) / 2,
          k = [
            Math.sin(R) * Math.cos(z),
            Math.cos(R) * Math.cos(z),
            Math.sin(z),
          ];
        ((A += k[0] * 0.006),
          (C += k[1] * 0.006),
          (L += k[2] * 0.006),
          E.push([A, C, L]));
        let I = [
          Math.sin(R) * Math.cos(F),
          Math.cos(R) * Math.cos(F),
          Math.sin(F),
        ];
        ((A += I[0] * (P - 0.006)),
          (C += I[1] * (P - 0.006)),
          (L += I[2] * (P - 0.006)),
          E.push([A, C, L]),
          (O = F));
      }
      s(g(dh(E, (H) => _ * (1 - 0.2 * H), 7, !0)), {
        color: S === 0 ? r.panel : r.knit,
        rough: 0.92,
        surf: 0,
        nrm: 0.9,
        ...p,
      });
    }
    {
      let S = x.th;
      s(
        g(
          dh(
            [[0.02, -0.036, -0.012], S[0], S[1], S[2], S[3]],
            (E) => 0.0155 - 0.0045 * E,
            7,
            !0,
          ),
        ),
        {
          color: r.suede,
          rough: 0.95,
          surf: 0,
          nrm: 0.8,
          ...p,
        },
      );
    }
    let M = (S, E, _, R) => {
        let C = ct0(-0.09, -0.045, E);
        ((R[0] = Ve.farmTw + d * Ru),
          (R[1] = 1 - C),
          (R[2] = Ve.hand + d * Ru),
          (R[3] = C));
      },
      w = l2([
        [-0.105, 0, 0, 0.0385, 0.037, 0.037],
        [-0.085, 0, 0, 0.04, 0.038, 0.038],
        [-0.055, 0, 0, 0.036, 0.031, 0.031],
        [-0.04, 0, 0, 0.038, 0.022, 0.022],
      ]),
      T = uh(
        5,
        12,
        (S, E, _) => {
          let R = -0.105 + (0.065 * S) / 5,
            C = (_f * E) / 12,
            L = [0, 0, 0, 0, 0];
          w(R, L);
          let A = Math.cos(C),
            O = Math.sin(C),
            H = tf(A, O, L[2], L[3], L[4], 2.2);
          ((_[0] = H * A), (_[1] = R), (_[2] = -0.012 + H * O));
        },
        {
          wrapJ: !0,
        },
      );
    (s(g(T), {
      color: r.knit,
      rough: 0.92,
      surf: 0,
      nrm: 1,
      m,
      weights: M,
    }),
      s(
        g(ti(en(0.034, 0.026, 0.006, 0.002), 0, -0.078, -0.051)),
        n(r.panel, {
          m,
          weights: M,
          surf: 0,
        }),
      ));
  }
  for (let d = 0; d < 2; d++) {
    let m = d ? Pi : -Pi,
      p = d * d5,
      x = Ve.foot + p,
      g = Ve.toe + p,
      b = Ve.shin + p,
      v = (z, k, I, G) => {
        if (k > 0.1) {
          let K = _2(0.1, 0.165, k);
          ((G[0] = x), (G[1] = 1 - K), (G[2] = b), (G[3] = K));
        } else {
          let K = _2(-(u2 - 0.03), -(u2 + 0.03), I);
          ((G[0] = x), (G[1] = 1 - K), (G[2] = g), (G[3] = K));
        }
      },
      y = l2([
        [-0.214, 0.01, 0.02],
        [-0.198, 0.034, 0.04],
        [-0.165, 0.046, 0.05],
        [-0.115, 0.05, 0.056],
        [-0.065, 0.048, 0.078],
        [-0.025, 0.045, 0.108],
        [0.03, 0.043, 0.112],
        [0.066, 0.036, 0.104],
        [0.084, 0.012, 0.06],
      ]),
      M = [];
    for (let z = 0; z <= 16; z++) M.push(-0.214 + 0.298 * (z / 16));
    let w = [0, 0],
      T = uh(
        16,
        12,
        (z, k, I) => {
          y(M[z], w);
          let G = (_f * k) / 12,
            K = Math.cos(G),
            $ = Math.sin(G),
            n0 = w[1],
            e0 = w[0],
            p0 = tf(K, $, e0, n0 * 0.72, n0 * 0.28, 2.5);
          ((I[0] = m + p0 * K),
            (I[1] = 0.022 + n0 * 0.28 + p0 * $),
            (I[2] = M[z]));
        },
        {
          wrapJ: !0,
          flip: !0,
        },
      ),
      S = (z, k, I) =>
        I < -0.148 + 0.01 * Math.cos((z - m) * 60) || (I > 0.04 && k < 0.095)
          ? t.sole
          : t.boot;
    {
      let z = o.count;
      (s(T, {
        color: S,
        rough: 0.62,
        surf: 0,
        nrm: 0.45,
        weights: v,
      }),
        np(o, z, 0, 12, {
          dir: [0, 0, -1],
          depth: 0.006,
          color: t.sole,
        }),
        np(o, z, 16 * 13, 12, {
          dir: [0, 0, 1],
          depth: 0.006,
          color: t.boot,
        }));
    }
    let E = l2([
        [0.085, 0.01, 0.045, 0.052, 0.06, 2.2],
        [0.12, 0.011, 0.045, 0.051, 0.054, 2.2],
        [0.16, 0.012, 0.046, 0.05, 0.049, 2.2],
        [0.2, 0.012, 0.049, 0.051, 0.048, 2.2],
        [0.218, 0.012, 0.052, 0.054, 0.051, 2.2],
        [0.229, 0.012, 0.047, 0.049, 0.046, 2.2],
      ]),
      _ = [
        0.085, 0.105, 0.125, 0.145, 0.165, 0.185, 0.2, 0.21, 0.218, 0.224,
        0.229,
      ],
      R = [0, 0, 0, 0, 0],
      C = uh(
        _.length - 1,
        14,
        (z, k, I) => {
          E(_[z], R);
          let G = (_f * k) / 14,
            K = Math.cos(G),
            $ = Math.sin(G),
            n0 = tf(K, $, R[1], R[2], R[3], R[4]);
          ((I[0] = m + n0 * K), (I[1] = _[z]), (I[2] = R[0] + n0 * $));
        },
        {
          wrapJ: !0,
        },
      );
    {
      let z = o.count;
      (s(C, {
        color: (k, I) => (I > 0.205 ? t.gearDk : t.boot),
        rough: 0.66,
        surf: 0,
        nrm: 0.45,
        weights: v,
      }),
        np(o, z, (_.length - 1) * 15, 14, {
          dir: [0, -1, 0],
          face: [0, 1, 0],
          depth: 0.012,
          shrink: 0.05,
          color: t.gearDk,
        }));
    }
    let A = [
        -0.218, -0.21, -0.19, -0.15, -0.1, -0.05, -0.036, -0.03, 0.006, 0.012,
        0.04, 0.07, 0.082, 0.088,
      ]
        .slice()
        .reverse()
        .map((z) => ({
          p: [m, 0, z],
          b: [-1, 0, 0],
          n: [0, 1, 0],
          z,
        })),
      O = Tu(A, (z) => {
        let k = A[z].z;
        y(JT(k, -0.214, 0.084), w);
        let I =
            Math.max(w[0] + 0.005, 0.012) * (k < -0.212 || k > 0.085 ? 0.6 : 1),
          G =
            0.014 * _2(-0.15, -0.218, k) +
            (k > -0.033 && k < 0.009 ? 0.011 : 0);
        return Yg(-I, I, G, 0.03 + 0.012 * _2(-0.17, -0.218, k), 0.006, 1);
      });
    s(O, {
      color: t.sole,
      rough: 0.95,
      nrm: 0.5,
      surf: 1,
      weights: v,
    });
    for (let z of [-1, 1])
      for (let k of [
        -0.185, -0.155, -0.125, -0.095, -0.065, 0.025, 0.05, 0.073,
      ])
        (y(k, w),
          s(
            ti(
              Xg(0.008, 0.016, 0.017),
              m + z * (w[0] + 0.006),
              0.009 + 0.012 * _2(-0.15, -0.218, k),
              k,
            ),
            {
              color: t.sole,
              rough: 0.95,
              nrm: 0.3,
              weights: v,
            },
          ));
    let H = (z, k) => {
        if (z < 0.45) {
          let I = -0.118 + (z / 0.45) * 0.088;
          (y(I, w),
            (k[0] = m),
            (k[1] = 0.022 + w[1] + 0.0015),
            (k[2] = I),
            (k[3] = 0),
            (k[4] = 0.5));
        } else {
          let I = 0.128 + ((z - 0.45) / 0.55) * 0.082;
          (E(I, R),
            (k[0] = m),
            (k[1] = I),
            (k[2] = R[0] - R[3] - 0.002),
            (k[3] = 1),
            (k[4] = 0));
        }
        return k;
      },
      F = [0, 0, 0, 0, 0],
      P = [0, 0, 0, 0, 0];
    for (let z = 0; z < 8; z++) {
      (H(z / 8, F), H((z + 1) / 8, P));
      let k = 0.016,
        I = 0.016;
      for (let G of [-1, 1])
        s(
          dh(
            [
              [m + G * k, F[1] - 0.003, F[2]],
              [
                m,
                (F[1] + P[1]) / 2 + 0.002 * F[4],
                (F[2] + P[2]) / 2 - 0.003 * F[3],
              ],
              [m - G * I, P[1] - 0.003, P[2]],
            ],
            0.0021,
            4,
            !1,
          ),
          {
            color: t.hard,
            rough: 0.8,
            nrm: 0.4,
            weights: v,
          },
        );
    }
    s(
      dh(
        [
          [m, 0.2, 0.064],
          [m, 0.218, 0.073],
          [m, 0.236, 0.066],
          [m, 0.226, 0.058],
        ],
        0.0035,
        4,
        !1,
      ),
      n(t.gearDk, {
        weights: v,
      }),
    );
  }
  {
    let d = {
        bone: Ve.head,
      },
      m = 9,
      p = 34,
      x = uh(
        m,
        p,
        (g, b, v) => {
          let y = (_f * b) / p,
            M = QT(q4(y)),
            w = g / m,
            T = M + (lo / 2 - 0.02 - M) * (1 - Math.pow(1 - w, 1.25));
          Sf(y, T, 0, Rs);
          let S = 0.0025 * XT(Math.abs(ZT(y)) - 1.45, 0.5) * XT(T - 0.45, 0.25);
          ((v[0] = Rs[0] + Rs[3] * S),
            (v[1] = Rs[1] + Rs[4] * S),
            (v[2] = Rs[2] + Rs[5] * S));
        },
        {
          wrapJ: !0,
        },
      );
    s(x, {
      color: (g, b, v) => {
        let y = ht0.fbm(g * 22 + 3, (b + v) * 22, 3);
        return y > 0.56 ? t.gearLt : y < 0.4 ? t.gearDk : t.helmet;
      },
      rough: 0.62,
      surf: 1,
      nrm: 0.25,
      ...d,
    });
    {
      let g = $T(-lo, lo, 40, q4, 5e-4);
      (g.pop(),
        s(
          Tu(g, () => CR(0.0048, 5), {
            closed: !0,
          }),
          i(t.hard, {
            ...d,
            rough: 0.7,
          }),
        ));
    }
    s(
      uh(
        1,
        p,
        (g, b, v) => {
          let y = (_f * b) / p;
          (Sf(y, QT(q4(y)) + 0, -g * 0.014, Rs),
            (v[0] = Rs[0]),
            (v[1] = Rs[1] - g * 0.004),
            (v[2] = Rs[2]));
        },
        {
          wrapJ: !0,
          flip: !0,
        },
      ),
      i(t.hard, {
        ...d,
        rough: 0.9,
      }),
    );
    for (let g of [1, -1]) {
      let b = g > 0 ? 0.78 : -2.05,
        v = g > 0 ? 2.05 : -0.78;
      (s(
        l(
          $T(b, v, 9, (y) => q4(y) + 0.019, 0.001),
          -0.012,
          0.012,
          0,
          0.009,
          0.003,
          1,
        ),
        i(t.hard, d),
      ),
        s(
          l(
            $T(
              g > 0 ? 1 : -1.85,
              g > 0 ? 1.85 : -1,
              6,
              (y) => q4(y) + 0.019,
              0.0095,
            ),
            -0.004,
            0.004,
            0,
            0.002,
            0,
          ),
          i(t.metal, d),
        ),
        Sf(g * 1.93, QT(q4(g * 1.93) + 0.019), 0.011, Rs),
        s(YT(Xg(0.046, 0.013, 0.004), Rs, [Rs[3], Rs[4], Rs[5]]), a(d)),
        s(
          jT(g * 1.1, g * 1.78, 0.42, 0.78, 0.0018),
          n(t.gearDk, {
            ...d,
            surf: 0,
          }),
        ));
    }
    (s(
      jT(-0.42, 0.42, 0.96, 1.36, 0.0018, 3, 5),
      n(t.gearDk, {
        ...d,
        surf: 0,
      }),
    ),
      s(
        jT(lo - 0.4, lo + 0.4, 0.5, 0.86, 0.0018, 3, 5),
        n(t.gearDk, {
          ...d,
          surf: 0,
        }),
      ),
      Sf(0, 0.6, 0, Rs),
      s(
        YT(en(0.046, 0.052, 0.014, 0.005), Rs, [Rs[3], Rs[4], Rs[5]], 0.005),
        i(t.hard, d),
      ),
      s(
        YT(en(0.03, 0.03, 0.016, 0.003), Rs, [Rs[3], Rs[4], Rs[5]], 0.006),
        i(t.metal, {
          ...d,
          metal: 0.5,
          rough: 0.4,
        }),
      ));
    for (let g of [-1, 1]) {
      Sf(g * 0.2, 0.6 + 0.2, 0, Rs);
      let b = [Rs[0], Rs[1], Rs[2]];
      (Sf(g * 0.95, 0.5, 0.002, Rs),
        s(
          dh(
            [
              [b[0], b[1], b[2] - 0.004],
              [
                (b[0] + Rs[0]) / 2,
                (b[1] + Rs[1]) / 2 + 0.008,
                (b[2] + Rs[2]) / 2 - 0.012,
              ],
              [Rs[0], Rs[1], Rs[2]],
            ],
            0.002,
            4,
            !1,
          ),
          i(t.hard, {
            ...d,
            rough: 0.8,
          }),
        ));
    }
    (Sf(lo, 0.36, 0, Rs),
      s(
        YT(en(0.088, 0.05, 0.026, 0.009), Rs, [Rs[3], Rs[4], Rs[5]], 0.011),
        n(t.gear, d),
      ),
      Sf(lo, 0.02, 0.004, Rs),
      s(jT(lo - 0.36, lo + 0.36, -0.085, 0.085, 0.0035, 2, 5), a(d)));
    for (let g of [1, -1])
      (s(
        ti(en(0.036, 0.088, 0.068, 0.015, 2), g * 0.1015, 1.688, 0.016),
        i(t.hard, {
          ...d,
          rough: 0.48,
        }),
      ),
        s(
          ti(en(0.016, 0.074, 0.056, 0.007), g * 0.082, 1.688, 0.016),
          n(t.gearDk, {
            ...d,
            surf: 0,
          }),
        ),
        s(
          ti(en(0.006, 0.05, 0.036, 0.002), g * 0.121, 1.69, 0.016),
          i(t.metal, {
            ...d,
            rough: 0.42,
          }),
        ),
        s(
          ti(l5(0.006, 0.006, 0.012, 6), g * 0.118, 1.664, 0.036, 0, 0, lo / 2),
          i(t.metal, d),
        ),
        s(
          dh(
            [
              [g * 0.106, 1.728, 0.016],
              [g * 0.112, 1.745, 0.02],
              [g * 0.111, 1.757, 0.022],
            ],
            0.004,
            5,
            !1,
          ),
          i(t.hard, d),
        ));
    (s(
      dh(
        [
          [-0.108, 1.668, -0.012],
          [-0.106, 1.652, -0.05],
          [-0.088, 1.642, -0.086],
          [-0.05, 1.638, -0.108],
        ],
        0.003,
        5,
        !1,
      ),
      i(t.hard, d),
    ),
      s(
        ti(eH(0.011, 8, 6), -0.044, 1.638, -0.11, 0, 0, 0, 1.3, 1, 1),
        n(t.hard, {
          ...d,
          surf: 0,
          rough: 0.95,
        }),
      ));
    {
      let g = [];
      for (let w = 0; w <= 16; w++) {
        let T = 1.13 - (2.26 * w) / 16;
        (vH(1.699, T, 0.003, ro),
          g.push({
            p: [ro[0], ro[1], ro[2]],
            b: [0, 1, 0],
            n: [ro[3], 0, ro[4]],
            az: T,
          }));
      }
      let b = (w) => 1 - 0.55 * _2(0.75, 1.13, Math.abs(w));
      s(
        Tu(g, (w) => {
          let T = g[w].az,
            S = b(T);
          return Yg(
            (-0.031 + 0.013 * XT(T, 0.17)) * S,
            0.031 * S,
            0,
            0.021,
            0.008,
            2,
          );
        }),
        i(t.hard, {
          ...d,
          rough: 0.55,
        }),
      );
      let v = g.slice(1, 16);
      s(
        Tu(v, (w) => {
          let T = v[w].az,
            S = b(T);
          return Yg(
            (-0.021 + 0.013 * XT(T, 0.17)) * S,
            0.022 * S,
            0.019,
            0.0232,
            0.002,
            1,
          );
        }),
        {
          color: 461067,
          rough: 0.1,
          nrm: 0,
          ...d,
        },
      );
      let y = g.slice(2, 15);
      s(
        Tu(y, (w) => {
          let T = b(y[w].az);
          return ON(0.0035 * T, 0.0165 * T, 0.0228, 0.0246);
        }),
        {
          color: t.lens,
          glow: t.glowK,
          rough: 0.2,
          nrm: 0,
          ...d,
        },
      );
      let M = $T(
        1.22,
        _f - 1.22,
        22,
        (w) => 1.712 + 0.036 * _2(1.2, 1.7, Math.abs(ZT(w))),
        0.003,
      );
      s(
        l(M, -0.014, 0.014, 0, 0.003, 0),
        n(t.gearDk, {
          ...d,
          surf: 0,
        }),
      );
      for (let w of [1, -1])
        s(
          ti(
            en(0.012, 0.034, 0.03, 0.004),
            w * 0.094,
            1.703,
            -0.052,
            0,
            w * -0.5,
            0,
          ),
          i(t.hard, d),
        );
    }
    for (let g of [1, -1])
      (s(
        dh(
          [
            [g * 0.088, 1.735, -0.03],
            [g * 0.086, 1.69, -0.052],
            [g * 0.074, 1.645, -0.064],
            [g * 0.045, 1.612, -0.082],
            [g * 0.016, 1.603, -0.094],
          ],
          0.0032,
          5,
          !1,
        ),
        n(t.gearDk, d),
      ),
        s(
          dh(
            [
              [g * 0.09, 1.7, 0.07],
              [g * 0.084, 1.655, 0.03],
              [g * 0.074, 1.645, -0.064],
            ],
            0.0028,
            4,
            !1,
          ),
          n(t.gearDk, d),
        ));
    (s(
      ti(en(0.05, 0.02, 0.03, 0.008), 0, 1.602, -0.094, 0.25, 0, 0),
      n(t.gearDk, d),
    ),
      s(
        ti(en(0.016, 0.022, 0.008, 0.002), -0.078, 1.652, -0.062, 0, 0.9, 0),
        i(t.hard, d),
      ));
  }
  s(
    en(0.022, 0.118, 0.06, 0.005),
    i(t.mag, {
      bone: Ve.mag,
      rough: 0.42,
    }),
  );
}

export { BN, UN };

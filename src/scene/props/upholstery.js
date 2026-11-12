// scene/props/upholstery.js: recovered from the verified GOLDEN HOUR release.
import { THREE } from "../../vendor/three-r180.js";
import {
  $s,
  C9,
  De,
  Id,
  Jo,
  Qo,
  Sa,
  Te,
  Wm,
  Yi,
  _i,
  cu,
  dr,
  ke,
  ks,
  lc,
  pe,
  rc,
  rs,
  rw,
  zs,
} from "../geometry.js";
import { TAU, clamp, createNoise, lerp, smoothstep } from "../../core/math.js";
import { Vn } from "../../vendor/geometry-utils.js";

var jm = Math.PI;
var Or = jm / 2;
function T1(o, t, e, { wrapU: s = !1, flip: n = !1 } = {}) {
  let i = s ? o : o + 1,
    a = new Float32Array(i * (t + 1) * 3),
    r = [],
    l = new THREE.Vector3();
  for (let h = 0; h <= t; h++)
    for (let f = 0; f < i; f++) {
      e(f, h, l);
      let u = (h * i + f) * 3;
      ((a[u] = l.x), (a[u + 1] = l.y), (a[u + 2] = l.z));
    }
  for (let h = 0; h < t; h++)
    for (let f = 0; f < o; f++) {
      let u = h * i + f,
        d = h * i + ((f + 1) % i),
        m = u + i,
        p = d + i;
      n ? r.push(u, m, d, d, m, p) : r.push(u, d, m, d, p, m);
    }
  let c = new THREE.BufferGeometry();
  return (
    c.setAttribute("position", new THREE.BufferAttribute(a, 3)),
    c.setIndex(r),
    c.computeVertexNormals(),
    c
  );
}
function Vd(o, t, e, s = "z", n = 0.004) {
  let i = new THREE.Shape(),
    a = o / 2,
    r = t / 2;
  (i.moveTo(-a + n, -r),
    i.lineTo(a - n, -r),
    i.lineTo(a, -r + n),
    i.lineTo(a, r - n),
    i.lineTo(a - n, r),
    i.lineTo(-a + n, r),
    i.lineTo(-a, r - n),
    i.lineTo(-a, -r + n),
    i.closePath());
  let l = C9(i, e, 0).translate(0, 0, -e / 2);
  return (s === "x" ? l.rotateY(Or) : s === "y" && l.rotateX(-Or), pe(l, 50));
}
function r$(o, t) {
  let e = o.attributes.position,
    s = o.index.array,
    n = [],
    i = (a) => t(e.getX(a), e.getY(a), e.getZ(a));
  for (let a = 0; a < s.length; a += 3)
    (i(s[a]) && i(s[a + 1]) && i(s[a + 2])) || n.push(s[a], s[a + 1], s[a + 2]);
  return (o.setIndex(n), o);
}
function Db(o, t, e, s = {}) {
  let n = s.nu || 12,
    i = s.nv || n,
    a = s.plump ?? 2.4,
    r = s.round ?? 0.6,
    l = s.pinch ?? 0.05,
    c = s.sag || 0,
    h = s.lump ?? 0.005,
    f = s.seed || 3,
    u = createNoise(f),
    d = s.pucker ?? 0.2,
    m = s.npuck || 6,
    p = s.back ?? 1,
    x = s.crease ?? 0.22,
    g = s.wave ?? 0.004,
    b = s.droop || 0,
    v = n + 1,
    y = [],
    M = [],
    w = new THREE.Vector3(),
    T = (A, O) => {
      let H = (A / O) * 2 - 1;
      return lerp(H, Math.sin(H * Or), 0.5);
    },
    S = (A, O, H) => {
      let F = T(A, n),
        P = T(O, i),
        z = Math.abs(F),
        k = Math.abs(P),
        I = Math.pow(1 - Math.pow(z, a), r) * Math.pow(1 - Math.pow(k, a), r),
        G = I,
        K = Math.exp(-Math.pow((1 - k) / 0.34, 2)),
        $ = Math.exp(-Math.pow((1 - z) / 0.34, 2));
      I *=
        1 +
        d *
          (K * (1 - $) * Math.cos(m * jm * F + H + f) +
            $ * (1 - K) * Math.cos((m * jm * P * t) / o + 1.7 * H + f));
      let n0 = 1 - z,
        e0 = 1 - k;
      ((I *=
        1 +
        x *
          Math.cos(6 * Math.atan2(e0, n0) + f * 1.3) *
          Math.exp(-(n0 * n0 + e0 * e0) / 0.09)),
        (I *= 1 - c * P * 0.45));
      let p0 = (u.fbm(F * 2.1 + 9 + H * 3.3, P * 2.1 + 4, 3) - 0.5) * 2 * h,
        t0 = g * Math.sin(F * 4.3 + P * 3.1 + f) - b * F * F * P * P,
        M0;
      return (
        H > 0
          ? (M0 = (e / 2 + p0) * I)
          : s.flat
            ? (M0 = -s.flat * (1 - Math.pow(1 - Math.min(1, G * 1.45), 2.2)))
            : (M0 = -(e / 2 + p0) * I * p),
        w.set(
          ((F * o) / 2) * (1 - l * (1 - P * P)) * (1 - c * 0.05 * P),
          ((P * t) / 2) * (1 - l * (1 - F * F)),
          t0 + M0,
        ),
        s.sculpt && s.sculpt(w, H, F, P),
        y.push(w.x, w.y, w.z),
        y.length / 3 - 1
      );
    },
    E = [],
    _ = [];
  for (let A = 0; A <= i; A++) for (let O = 0; O <= n; O++) E.push(S(O, A, 1));
  for (let A = 0; A <= i; A++)
    for (let O = 0; O <= n; O++)
      _.push(
        O === 0 || A === 0 || O === n || A === i ? E[A * v + O] : S(O, A, -1),
      );
  for (let A = 0; A < i; A++)
    for (let O = 0; O < n; O++) {
      let H = A * v + O,
        F = H + 1,
        P = H + v,
        z = P + 1;
      M.push(
        E[H],
        E[F],
        E[P],
        E[F],
        E[z],
        E[P],
        _[H],
        _[P],
        _[F],
        _[F],
        _[P],
        _[z],
      );
    }
  let R = new THREE.BufferGeometry();
  (R.setAttribute("position", new THREE.Float32BufferAttribute(y, 3)),
    R.setIndex(M),
    R.computeVertexNormals());
  let C = [],
    L = (A, O) => {
      let H = E[O * v + A] * 3;
      return {
        p: De(y[H], y[H + 1], y[H + 2]),
        ox: A === 0 ? -1 : A === n ? 1 : 0,
        oy: O === 0 ? -1 : O === i ? 1 : 0,
      };
    };
  for (let A = 0; A < n; A++) C.push(L(A, 0));
  for (let A = 0; A < i; A++) C.push(L(n, A));
  for (let A = n; A > 0; A--) C.push(L(A, i));
  for (let A = i; A > 0; A--) C.push(L(0, A));
  return ((R.userData.edge = C), R);
}
var yw = (o, t = 0.0045, e = 4) =>
  Qo(
    o.userData.edge.map((s) => s.p),
    t,
    e,
    !0,
  );
function l$(o, t, e = 0.004) {
  let s = o.userData.edge,
    n = s.length;
  return cu(
    T1(
      n,
      2,
      (i, a, r) => {
        let l = s[i % n],
          c = a / 2;
        r.set(
          l.p.x + l.ox * t * c,
          l.p.y + l.oy * t * c,
          l.p.z + e * c * Math.sin(i * 1.9) - 0.006 * c * c,
        );
      },
      {
        wrapU: !0,
      },
    ),
  );
}
function c$(o, t, e = 0.009, s = 0.9) {
  let i = (c) => o - e + (e * c) / 16,
    a = t / 2,
    r = [
      [-a + 0.006, 0],
      [-a - 0.002, 0.45],
      [-a - 0.004, 0.8],
      [-a, 0.95],
      [-a + 0.014, 1],
      [-a * 0.5, 1.015],
      [0, 1.02],
      [a * 0.5, 1.015],
      [a - 0.014, 1],
      [a, 0.95],
      [a + 0.004, 0.8],
      [a + 0.002, 0.45],
      [a - 0.006, 0],
    ],
    l = (c, h, f, u) => {
      let d = s + (f / 16) * TAU,
        m = r[h];
      c.set(
        m[0],
        Math.max(Math.cos(d) * u * m[1], -o * 0.94),
        Math.sin(d) * u * m[1],
      );
    };
  return Vn(
    [
      T1(16, r.length - 1, (c, h, f) => l(f, h, c, i(c))),
      T1(1, r.length - 1, (c, h, f) => l(f, h, 0, i(c ? 0 : 16))),
    ],
    !1,
  );
}
function B9(o, t, e) {
  let s = new THREE.BoxGeometry(o, e, t).translate(0, e / 2, 0).toNonIndexed(),
    n = s.attributes.position,
    i = s.attributes.normal,
    a = s.attributes.uv;
  for (let r = 0; r < n.count; r++)
    Math.abs(i.getX(r)) > 0.5
      ? a.setXY(r, n.getY(r), n.getZ(r) + 0.13)
      : Math.abs(i.getZ(r)) > 0.5
        ? a.setXY(r, n.getY(r), n.getX(r) + 0.31)
        : a.setXY(r, n.getX(r), n.getZ(r));
  return s;
}
function registerUpholstery({
  M: o,
  L: t,
  def: e,
  lib: s,
  mt: n,
  fine: i,
  P: a,
}) {
  (e(
    "cushion",
    (l) => (o[l.mat] ? l.mat : "velvetTeal"),
    (l, c) => {
      let h = i(n(c.mat, "velvetTeal")),
        f = 0.062,
        u = Db(0.45, 0.45, 0.244, {
          nu: 12,
          plump: 2.5,
          pinch: 0.055,
          lump: 0.004,
          seed: 5,
          flat: f,
          droop: 0.014,
          npuck: 5,
          pucker: 0.2,
          wave: 0.003,
        });
      return (
        l.add(u, h, [0, f, 0], [-Or, 0, 0]),
        l.add(yw(u, 0.005, 4), h, [0, f, 0], [-Or, 0, 0]),
        rs("cushion", [0.46, 0.17, 0.46], {
          surf: "fabric",
          dynamic: !0,
          mass: 0.6,
        })
      );
    },
  ),
    e("sunLounger", null, (l) => {
      let h = Math.cos(0.56),
        f = Math.sin(0.56),
        u = -0.26,
        d = 0.325,
        m = o.woodLight,
        p = o.steel,
        x = o.fabricCream,
        g = ke(
          [
            [0, 0.0032],
            [0.0045, 0.0024],
            [0.0065, 0],
          ],
          6,
        ),
        b = (E, _, R, C) => l.add(g, p, [E, _, R], [0, 0, -C * Or]),
        v = (E) => Vd(0.062, 0.016, E, "x", 0.0035);
      for (let E of [-1, 1]) {
        let _ = E * 0.3125;
        (l.add(
          Vd(0.045, 0.058, 1.98, "z", 0.005),
          m,
          [_, 0.286, 0],
          null,
          null,
          "z",
        ),
          l.add(
            Yi(Vd(0.045, 0.07, 0.256, "y", 0.005), (R) => {
              R.z *= 0.8 + 0.2 * (R.y / 0.256 + 0.5);
            }),
            m,
            [_, 0.134, 0.82],
            null,
            null,
            "y",
          ),
          l.add(ks(0.017, 0.019, 0.007, 6), o.rubber, [_, 0.0035, 0.82]),
          l.add(
            Yi(Vd(0.045, 0.07, 0.212, "y", 0.005), (R) => {
              R.z *= 0.72 + 0.28 * (R.y / 0.212 + 0.5);
            }),
            m,
            [_, 0.156, -0.82],
            null,
            null,
            "y",
          ));
        for (let R of [0.82, -0.82])
          for (let C of [-0.017, 0.017]) b(E * 0.3355, 0.288, R + C, E);
        for (let R of [-0.9675, 0.9675])
          l.add(
            zs(0.003, 0.03, 0.019),
            m,
            [E * 0.3352, 0.287, R],
            null,
            null,
            "y",
          );
        (l.at([E * 0.258, 0.085, -0.82], [0, 0, Or], null, () => {
          for (let R of [-1, 1])
            l.add(
              pe(
                ke(
                  R < 0
                    ? [
                        [0.014, -0.012],
                        [0.03, -0.0145],
                        [0.071, -0.0145],
                      ]
                    : [
                        [0.071, 0.0145],
                        [0.03, 0.0145],
                        [0.014, 0.012],
                      ],
                  20,
                ),
                40,
              ),
              m,
              null,
              null,
              null,
              "x",
            );
          (l.add(
            ke(
              [
                [0.069, -0.0155],
                [0.082, -0.0135],
                [0.085, -0.006],
                [0.085, 0.006],
                [0.082, 0.0135],
                [0.069, 0.0155],
              ],
              20,
            ),
            o.rubber,
          ),
            l.add(
              pe(
                ke(
                  [
                    [0.006, -0.02],
                    [0.016, -0.018],
                    [0.016, 0.018],
                    [0.006, 0.02],
                  ],
                  6,
                ),
                40,
              ),
              p,
            ));
        }),
          b(E * 0.3355, 0.085, -0.82, E));
      }
      l.rod(p, [-0.335, 0.085, -0.82], [0.335, 0.085, -0.82], 0.0055, 6);
      for (let E of [-0.9675, 0.9675])
        l.add(
          Vd(0.035, 0.05, 0.58, "x", 0.004),
          m,
          [0, 0.287, E],
          null,
          null,
          "x",
        );
      for (let E of [-0.225, 0.37])
        l.add(
          Vd(0.03, 0.036, 0.58, "x", 0.003),
          m,
          [0, 0.283, E],
          null,
          null,
          "x",
        );
      for (let E = 0; E < 14; E++)
        l.add(
          zs(0.6, 0.016, 0.062),
          m,
          [0, 0.323, -0.19 + E * 0.0885],
          null,
          null,
          "x",
        );
      let y = (E, _, R) => (C, L) => {
          for (let A of E) {
            let O = C.z - A,
              H = Math.abs(O);
            if (H > R * 1.5) continue;
            let F = H < R * 0.5 ? 1 : 0.1;
            (H > R * 0.5 && (C.z = A + Math.sign(O) * 0.021),
              (C.x -= L.x * 0.006 * F),
              (C.y -= Math.max(0, L.y) * 0.011 * F));
          }
          if (L.y > 0.5)
            for (let [A, O] of _) {
              let H = C.x - A,
                F = C.z - O,
                P = Math.hypot(H, F);
              if (P > 0.095) continue;
              if (P < 0.001) {
                C.y -= 0.012;
                continue;
              }
              let z = Math.max(0.03, 0.03 + (P - 0.05) * 0.42);
              ((C.x = A + (H / P) * z),
                (C.z = O + (F / P) * z),
                (C.y -= 0.012 * Math.exp(-Math.pow(z / 0.03, 2) * 1.25)));
            }
        },
        M = ke(
          [
            [0.013, 0],
            [0.0095, 0.004],
            [0, 0.006],
          ],
          6,
        ),
        w = (E, _, R, C, L, A, O, H) => {
          let P = (R - 0.056) / C,
            z = Jo(E, _, R, {
              r: 0.028,
              seg: [8, 1, C],
              arc: 2,
              crown: {
                py: 0.003,
              },
              plateau: 5,
              lump: 0.001,
              lumpScale: 5,
              seed: O,
              sculpt: y(L, A, P),
            });
          l.add(H ? r$(z, (k, I) => I < -_ / 2 + 0.004) : z, x);
          for (let k of [1, -1]) {
            let G = 0.0302 * Math.SQRT1_2,
              K = E / 2 - 0.028,
              $ = R / 2 - 0.028,
              n0 = k * (_ / 2 - 0.028 + G),
              e0 = [],
              p0 = (t0) => {
                for (let M0 of t0 < 0 ? [...L].reverse() : L)
                  for (let f0 of t0 < 0
                    ? [2, 1, 0, -1, -2]
                    : [-2, -1, 0, 1, 2]) {
                    let _0 = [1, 0.45, 0.04][Math.abs(f0)];
                    e0.push(
                      De(
                        t0 * (K + G - 0.0042 * _0),
                        n0 - 0.0078 * _0,
                        M0 + f0 * 0.019,
                      ),
                    );
                  }
              };
            for (let t0 = 0; t0 < 4; t0++) {
              let M0 = (t0 === 0 || t0 === 3 ? 1 : -1) * K,
                f0 = (t0 < 2 ? 1 : -1) * $;
              for (let _0 = 0; _0 <= 3; _0++) {
                let F0 = (t0 + _0 / 3) * Or;
                e0.push(De(M0 + Math.cos(F0) * G, n0, f0 + Math.sin(F0) * G));
              }
              (t0 === 1 && k > 0 && p0(-1), t0 === 3 && k > 0 && p0(1));
            }
            l.add(Qo(e0, 0.004, 4, !0), x);
          }
          for (let [k, I] of A) l.add(M, x, [k, _ / 2 + 0.003 - 0.0125, I]);
        };
      l.at([0, d, u], [0.56, 0, 0], null, () => {
        for (let _ of [-1, 1])
          (l.add(
            Vd(0.04, 0.04, 0.78, "z", 0.004),
            m,
            [_ * 0.27, -0.006, -0.39],
            null,
            null,
            "z",
          ),
            l.add(zs(0.014, 0.02, 0.032), p, [_ * 0.27, -0.035, -0.5]),
            l.add(
              ks(0.004, 0.004, 0.03, 6),
              p,
              [_ * 0.27, -0.038, -0.5],
              [0, 0, Or],
            ));
        l.add(
          Vd(0.036, 0.04, 0.5, "x", 0.004),
          m,
          [0, -0.006, -0.762],
          null,
          null,
          "x",
        );
        for (let _ = 0; _ < 7; _++)
          l.add(v(0.56), m, [0, 0.012, -(0.085 + _ * 0.1)], null, null, "x");
        l.at([0, 0.0635, -0.4], null, null, () =>
          w(
            0.6,
            0.082,
            0.78,
            12,
            [0],
            [
              [-0.136, -0.181],
              [0.136, -0.181],
              [-0.136, 0.181],
              [0.136, 0.181],
            ],
            21,
          ),
        );
        let E = Db(0.42, 0.2, 0.1, {
          nu: 10,
          nv: 6,
          plump: 2.6,
          pinch: 0.04,
          lump: 0.003,
          seed: 9,
          flat: 0.026,
          npuck: 5,
          pucker: 0.16,
          crease: 0.15,
        });
        (l.add(E, x, [0, 0.13, -0.615], [-Or, 0, 0]),
          l.add(yw(E, 0.004, 4), x, [0, 0.13, -0.615], [-Or, 0, 0]));
        for (let _ of [-1, 1]) {
          let R = [
            [0.128, -0.7],
            [0.113, -0.755],
            [0.104, -0.785],
            [0.082, -0.7975],
            [0.03, -0.797],
            [-0.03, -0.79],
            [-0.075, -0.787],
          ];
          l.add(
            cu(
              T1(1, R.length - 1, (C, L, A) =>
                A.set(_ * 0.12 + (C - 0.5) * 0.03, R[L][0], R[L][1]),
              ),
            ),
            x,
          );
        }
      });
      for (let E of [-1, 1]) {
        (l.add(zs(0.03, 0.004, 0.06), p, [E * 0.3125, 0.317, u]),
          l.add(zs(0.005, 0.026, 0.03), p, [E * 0.2935, 0.326, u]),
          l.add(
            ks(0.0055, 0.0055, 0.05, 8),
            p,
            [E * 0.283, d - 0.004, u],
            [0, 0, Or],
          ));
        let _ = new THREE.Shape();
        (_.moveTo(-0.93, 0.287),
          _.lineTo(-0.63, 0.287),
          _.lineTo(-0.63, 0.31),
          _.lineTo(-0.645, 0.319));
        for (let R of [-0.715, -0.775, -0.835, -0.895])
          (_.lineTo(R + 0.013, 0.319),
            _.lineTo(R + 0.004, 0.305),
            _.lineTo(R - 0.006, 0.305),
            _.lineTo(R - 0.013, 0.319));
        (_.lineTo(-0.93, 0.319),
          _.closePath(),
          l.add(
            pe(Wm(_, 0.022, 0), 40),
            m,
            [E * 0.279, 0, 0],
            null,
            null,
            "z",
          ));
      }
      let T = d + f * 0.5 - 0.038 * h,
        S = u - h * 0.5 - 0.038 * f;
      return (
        l.add(
          lc(
            [
              [-0.27, T, S],
              [-0.27, 0.312, -0.775],
              [0.27, 0.312, -0.775],
              [0.27, T, S],
            ],
            0.006,
            0.022,
            6,
            !1,
            3,
          ),
          p,
        ),
        l.at([0, 0.3725, 0.37], null, null, () =>
          w(
            0.6,
            0.082,
            1.22,
            18,
            [-0.194, 0.194],
            [-0.388, 0, 0.388].flatMap((E) => [
              [-0.136, E],
              [0.136, E],
            ]),
            11,
            !0,
          ),
        ),
        l.add(c$(0.062, 0.46), o.velvetTeal, [0, 0.4745, 0.8], [0, 0.04, 0]),
        l.add(
          T1(16, 1, (E, _, R) => {
            let C = 0.9 + (E / 16) * TAU,
              L = (0.062 - 0.009 + (0.009 * E) / 16) * 1.02 + 0.0015;
            R.set(
              (_ - 0.5) * 0.05,
              Math.max(Math.cos(C) * L, -0.06),
              Math.sin(C) * L,
            );
          }),
          x,
          [0, 0.4745, 0.8],
          [0, 0.04, 0],
        ),
        rs("sunLounger", [0.68, 0.82, 2], {
          surf: "wood",
          mass: 22,
          colliders: [
            $s(-0.34, 0, -1, 0.34, 0.42, 1),
            $s(-0.34, 0.42, -0.98, 0.34, 0.78, -0.4),
          ],
        })
      );
    }),
    e(
      "parasol",
      (l) => (l.open === !1 ? "c" : "o"),
      (l, c) => {
        let h = c.open !== !1,
          f = o.woodLight,
          u = o.steel,
          d = o.fabricCream,
          m = o.rubber,
          p = 8,
          x = 2.58,
          g = 2.165,
          b = 0.03,
          v = 1.49;
        (l.add(
          pe(
            ke(
              [
                [0.266, 0],
                [0.278, 0.008],
                [0.28, 0.022],
                [0.277, 0.06],
                [0.264, 0.076],
                [0.24, 0.084],
                [0.07, 0.096],
              ],
              26,
            ),
            32,
          ),
          o.concrete,
        ),
          l.add(
            pe(
              ke(
                [
                  [0.078, 0.094],
                  [0.078, 0.101],
                  [0.074, 0.105],
                  [0.037, 0.105],
                  [0.037, 0.3],
                  [0.034, 0.305],
                  [0.0235, 0.305],
                ],
                14,
              ),
              40,
            ),
            u,
          ));
        let y = ke(
          [
            [0, 0.0045],
            [0.006, 0.0035],
            [0.008, 0],
          ],
          6,
        );
        for (let z = 0; z < 4; z++) {
          let k = (z + 0.5) * Or;
          l.add(y, u, [Math.sin(k) * 0.06, 0.105, Math.cos(k) * 0.06]);
        }
        (l.rod(u, [0.03, 0.235, 0], [0.066, 0.235, 0], 0.005, 6),
          l.add(
            pe(
              ke(
                [
                  [0, 0],
                  [0.017, 0],
                  [0.023, 0.004],
                  [0.023, 0.014],
                  [0.016, 0.02],
                  [0, 0.021],
                ],
                7,
              ),
              40,
            ),
            m,
            [0.058, 0.235, 0],
            [0, 0, -Or],
          ));
        for (let z of [-1, 1])
          l.add(
            lc(
              [
                [-0.05, 0.08, 0],
                [-0.05, 0.122, 0],
                [0.05, 0.122, 0],
                [0.05, 0.08, 0],
              ],
              0.0055,
              0.016,
              5,
              !1,
              2,
            ),
            u,
            [0, 0, z * 0.172],
          );
        (l.add(
          ks(0.0235, 0.0235, 2.28, 12, !0),
          f,
          [0, 1.44, 0],
          null,
          null,
          "y",
        ),
          l.add(
            pe(
              ke(
                [
                  [0.0235, -0.05],
                  [0.027, -0.045],
                  [0.027, 0.045],
                  [0.0235, 0.05],
                ],
                12,
              ),
              40,
            ),
            u,
            [0, 1.3, 0],
          ));
        for (let z of [1.275, 1.325]) l.add(y, u, [0.027, z, 0], [0, 0, -Or]);
        (l.add(Te(0.07, 0.125, 0.086, 0.014), u, [0, 0.8, 0.01]),
          l.add(ks(0.012, 0.012, 0.012, 8), u, [0, 0.79, 0.058], [Or, 0, 0]),
          l.add(
            Te(0.016, 0.092, 0.007, 0.003),
            u,
            [0.022, 0.76, 0.068],
            [0, 0, 0.65],
          ),
          l.add(
            pe(
              ke(
                [
                  [0, 0],
                  [0.009, 0],
                  [0.012, 0.004],
                  [0.0125, 0.05],
                  [0.009, 0.056],
                  [0, 0.056],
                ],
                8,
              ),
              40,
            ),
            m,
            [0.046, 0.729, 0.071],
            [Or, 0, 0],
          ),
          l.add(
            pe(
              ke(
                [
                  [0.03, 2.6],
                  [0.035, 2.607],
                  [0.035, 2.616],
                  [0.02, 2.628],
                  [0.017, 2.642],
                  [0.03, 2.66],
                  [0.031, 2.672],
                  [0.018, 2.695],
                  [0.007, 2.707],
                  [0.003, 2.71],
                  [0, 2.71],
                ],
                12,
              ),
              35,
            ),
            f,
          ));
        let M = (z) => x - ((x - g) * (z - b)) / (v - b),
          w = (z) => {
            let k = (z / p) * TAU;
            return [Math.sin(k), Math.cos(k)];
          },
          T = Te(0.036, 0.062, 0.03, 0.006);
        if (h) {
          (l.add(
            Qo(
              [
                [0.012, 0.862, 0.03],
                [0.026, 1.2, 0.012],
                [0.034, 1.95 - 0.06, 0.006],
              ],
              0.0024,
              3,
              !1,
              !1,
            ),
            d,
          ),
            l.add(
              pe(
                ke(
                  [
                    [0.0235, 2.535],
                    [0.04, 2.54],
                    [0.052, 2.555],
                    [0.052, 2.575],
                    [0.044, 2.582],
                    [0.044, 2.594],
                    [0.03, 2.6],
                  ],
                  12,
                ),
                40,
              ),
              f,
            ),
            l.add(
              pe(
                ke(
                  [
                    [0.0235, -0.045],
                    [0.036, -0.045],
                    [0.04, -0.038],
                    [0.04, -0.016],
                    [0.052, -0.008],
                    [0.052, 0.014],
                    [0.044, 0.02],
                    [0.044, 0.034],
                    [0.0235, 0.04],
                  ],
                  12,
                ),
                40,
              ),
              f,
              [0, 1.95, 0],
            ),
            l.add(
              Sa(0.053, 0.0028, 4, 16),
              u,
              [0, 1.95 + 0.003, 0],
              [Or, 0, 0],
            ));
          let k = new THREE.Vector3(),
            I = new THREE.Vector3(),
            G = De(0, 1, 0);
          for (let e0 = 0; e0 < p; e0++) {
            let [p0, t0] = w(e0);
            (k.set(p0 * b, x, t0 * b), I.set(p0 * v, g, t0 * v));
            let M0 = I.clone().sub(k),
              f0 = M0.length();
            (l.addM(B9(0.02, 0.016, f0), f, rc(k, M0, G), !0),
              l.addM(
                T,
                d,
                rc(k.clone().addScaledVector(M0, (f0 - 0.022) / f0), M0, G),
              ));
            let _0 = 0.72,
              F0 = De(p0 * _0, M(_0) - 0.011, t0 * _0),
              m0 = De(p0 * 0.04, 1.95 + 0.003, t0 * 0.04),
              S0 = F0.clone().sub(m0);
            (l.addM(B9(0.017, 0.013, S0.length()), f, rc(m0, S0, G), !0),
              l.addM(
                zs(0.026, 0.034, 0.024),
                u,
                rc(F0.clone().addScaledVector(S0, -0.012 / S0.length()), M0, G),
              ));
          }
          let K = (e0, p0, t0) => {
              let [M0, f0] = w(e0);
              return t0.set(M0 * p0, M(p0), f0 * p0);
            },
            $ = (e0, p0, t0, M0, f0, _0, F0, m0 = 1) =>
              T1(
                f0,
                M0,
                (S0, T0, j0) => {
                  let Z0 = T0 / M0,
                    lt = S0 / f0,
                    H0 = p0 + (t0 - p0) * Z0,
                    Y0 = 4 * lt * (1 - lt);
                  (K(e0, H0, k),
                    K(e0 + 1, H0, I),
                    j0.lerpVectors(k, I, lt),
                    (j0.y =
                      x + (j0.y - x) * m0 + F0 - _0 * Math.pow(Z0, 1.25) * Y0));
                  let et = 1 - 0.022 * Y0 * Math.pow(Z0, 5);
                  ((j0.x *= et), (j0.z *= et));
                },
                {
                  flip: !0,
                },
              ),
            n0 = [];
          for (let e0 = 0; e0 < p; e0++) {
            let p0 = $(e0, 0.25, 1.5, 7, 8, 0.06, 0.011),
              t0 = p0.attributes.position,
              M0 = 7 * 9;
            (n0.push(p0),
              n0.push(
                T1(
                  16,
                  1,
                  (F0, m0, S0) => {
                    let T0 = M0 + (F0 >> 1),
                      j0 = M0 + ((F0 + 1) >> 1),
                      Z0 = F0 / 16;
                    if (
                      (S0.set(
                        (t0.getX(T0) + t0.getX(j0)) / 2,
                        (t0.getY(T0) + t0.getY(j0)) / 2,
                        (t0.getZ(T0) + t0.getZ(j0)) / 2,
                      ),
                      m0)
                    ) {
                      let lt =
                        1 +
                        (0.004 + 0.007 * Math.sin(Z0 * 9.4 + e0 * 2.1)) / 1.45;
                      ((S0.x *= lt),
                        (S0.z *= lt),
                        (S0.y -=
                          0.088 +
                          0.04 *
                            Math.pow(Math.abs(Math.sin(3 * jm * Z0)), 0.7)));
                    }
                  },
                  {
                    flip: !0,
                  },
                ),
              ));
            let f0 = $(e0, 0.026, 0.37, 2, 3, 0.012, 0.046, 0.86),
              _0 = f0.attributes.position;
            (n0.push(f0),
              n0.push(
                T1(
                  3,
                  1,
                  (F0, m0, S0) => {
                    let T0 = 8 + F0;
                    (S0.set(_0.getX(T0), _0.getY(T0) - m0 * 0.032, _0.getZ(T0)),
                      m0 && ((S0.x *= 1.004), (S0.z *= 1.004)));
                  },
                  {
                    flip: !0,
                  },
                ),
              ));
          }
          return (
            l.add(cu(Vn(n0, !1)), d),
            rs("parasol", [3, 2.71, 3], {
              surf: "fabric",
              mass: 35,
              colliders: [
                $s(-0.06, 0, -0.06, 0.06, 2.6, 0.06),
                $s(-0.28, 0, -0.28, 0.28, 0.1, 0.28),
              ],
            })
          );
        }
        let S = createNoise(17),
          E = 2.6,
          _ = 1,
          R = 1.56,
          C = 32,
          L = 16,
          A = (z) =>
            Math.atan2(0.78 * Math.sin(z), 1 - 0.78 * Math.cos(z)) / 0.895,
          O = (z) => {
            let k = (E - z) / (E - _),
              I =
                0.03 +
                0.105 * Math.pow(k, 0.8) +
                0.018 * smoothstep(0.86, 1, k);
            return (
              (I +=
                0.012 *
                Math.exp(-Math.pow((z - 2.42) / 0.035, 2)) *
                (z < 2.42 ? 0.3 : 1)),
              I * (1 - 0.3 * Math.exp(-Math.pow((z - R) / 0.085, 2)))
            );
          },
          H = (z, k, I, G = 0) => {
            let K = (E - k) / (E - _),
              $ = (z / C) * TAU,
              n0 = $ * p + 2.4 * K + 0.6 * Math.sin(K * 5),
              e0 =
                (0.1 + 0.3 * K) *
                (1 - 0.7 * Math.exp(-Math.pow((k - R) / 0.07, 2))),
              p0 =
                O(k) * (1 + e0 * A(n0)) +
                (S.fbm($ * 3 + 2, k * 6, 2) - 0.5) * 0.012 * K +
                G;
            return I.set(Math.sin($) * p0, k, Math.cos($) * p0);
          },
          F = [...Array(L + 1)].map((z, k) =>
            lerp(E, _, Math.pow(k / L, 0.92)),
          );
        ((F[2] = 2.42), (F[10] = R), F.sort((z, k) => k - z));
        let P = (z) => 0.03 * Math.cos((z / C) * TAU * p + 2.4) - 0.012;
        (l.add(
          T1(
            C,
            L,
            (z, k, I) => {
              (H(z, F[k], I), k === L && (I.y += P(z)));
            },
            {
              wrapU: !0,
              flip: !0,
            },
          ),
          d,
        ),
          l.add(
            T1(
              C,
              1,
              (z, k, I) => {
                k ? I.set(0, _ + 0.2, 0) : (H(z, _, I), (I.y += P(z)));
              },
              {
                wrapU: !0,
                flip: !0,
              },
            ),
            d,
          ),
          l.add(
            T1(C, 1, (z, k, I) => H(z, R + (k ? -0.02 : 0.02), I, 0.004), {
              wrapU: !0,
              flip: !0,
            }),
            d,
          ));
        {
          let z = H(4, R, new THREE.Vector3(), 0.006);
          (l.add(
            Te(0.034, 0.046, 0.008, 0.003),
            u,
            [z.x, z.y, z.z],
            [0, Math.atan2(z.x, z.z), 0],
          ),
            l.add(
              cu(
                T1(1, 3, (k, I, G) =>
                  G.set(
                    z.x * (1 + 0.03 * I) + (k - 0.5) * 0.03,
                    R - 0.01 - I * 0.045,
                    z.z * (1.02 + 0.05 * I) + 0.012,
                  ),
                ),
              ),
              d,
            ));
        }
        for (let z = 0; z < p; z++) {
          let k = ((z + 0.3) / p) * TAU,
            I = Math.sin(k),
            G = Math.cos(k),
            K = De(I * 0.07, 1.4, G * 0.07),
            $ = De(I * 0.105, 1.062, G * 0.105).sub(K);
          (l.addM(B9(0.02, 0.016, $.length()), f, rc(K, $, De(I, 0, G)), !0),
            l.addM(
              T,
              d,
              rc(
                K.clone().addScaledVector($, 1 - 0.02 / $.length()),
                $,
                De(I, 0, G),
              ),
            ));
        }
        return (
          l.add(
            pe(
              ke(
                [
                  [0.0235, 2.56],
                  [0.034, 2.585],
                  [0.03, 2.6],
                ],
                10,
              ),
              40,
            ),
            f,
          ),
          rs("parasol", [0.56, 2.71, 0.56], {
            surf: "fabric",
            mass: 35,
            colliders: [
              $s(-0.1, 0, -0.1, 0.1, 2.6, 0.1),
              $s(-0.28, 0, -0.28, 0.28, 0.1, 0.28),
            ],
          })
        );
      },
    ));
  function r(
    l,
    c,
    h,
    f,
    {
      r: u = 0.06,
      nx: d = 24,
      nz: m = 20,
      ne: p = 7,
      quilt: x = 0,
      cellsX: g = 6,
      cellsZ: b = 5,
      seed: v = 5,
      fold: y = 0.016,
      foot: M = !0,
      rumple: w = 0.01,
    } = {},
  ) {
    let T = (jm * u) / 2,
      S = createNoise(v),
      E = [],
      _ = [];
    for (let C = p; C >= 1; C--) E.push(-l - (T + f) * Math.pow(C / p, 1.2));
    for (let C = 0; C <= d; C++) E.push(-l + (2 * l * C) / d);
    for (let C = 1; C <= p; C++) E.push(l + (T + f) * Math.pow(C / p, 1.2));
    for (let C = 0; C <= m; C++) _.push(c + ((h - c) * C) / m);
    if (M)
      for (let C = 1; C <= p; C++) _.push(h + (T + f) * Math.pow(C / p, 1.2));
    let R = (C) =>
      C <= 0
        ? [0, 0]
        : C < T
          ? [u * Math.sin(C / u), u * (1 - Math.cos(C / u))]
          : [u, u + C - T];
    return T1(
      E.length - 1,
      _.length - 1,
      (C, L, A) => {
        let O = E[C],
          H = _[L],
          F = R(Math.abs(O) - l),
          P = R(M ? H - h : -1),
          z = Math.max(F[1], P[1]),
          k = clamp((z - u) / f, 0, 1),
          I = Math.sign(O) * (Math.min(Math.abs(O), l) + F[0]),
          G = Math.min(H, M ? h : H) + P[0],
          K = -z;
        if (z <= 1e-6) {
          let $ = Math.abs(Math.sin(((jm * (I + l)) / (2 * l)) * g)),
            n0 = Math.abs(Math.sin(((jm * (G - c)) / (h - c)) * b));
          K +=
            x * Math.pow($ * n0, 0.45) +
            (S.fbm(I * 1.7 + 3, G * 1.7, 3) - 0.5) * 2 * w;
        } else {
          let $ = F[1] > P[1],
            n0 = $ ? G : I,
            e0 = y * k * (0.55 + 0.9 * S.noise(n0 * 2.3 + 1.7, v * 1.3)),
            p0 =
              Math.sin(n0 * 8.5 + S.fbm(n0 * 1.4 + 7, 1.5, 2) * 7) * e0 +
              e0 * 0.6 +
              0;
          if (
            ($ ? (I += Math.sign(O) * p0) : (G += p0), F[1] > 0 && P[1] > 0)
          ) {
            let t0 = Math.min(F[1], P[1]) / (u + f);
            ((I -= Math.sign(O) * 0.07 * t0), (G -= 0.07 * t0));
          }
        }
        A.set(I, K, G);
      },
      {
        flip: !0,
      },
    );
  }
  e("bed", null, (l) => {
    let c = o.woodDark,
      h = o.bedLinen,
      f = o.fabricCharcoal,
      u = o.velvetTeal,
      d = o.brass;
    (l.add(zs(1.9, 0.05, 1.98), c, [0, 0.025, 0]),
      l.add(
        _i(
          [
            [-0.03, 0],
            [0, 0],
            [0, 0.012],
            [-0.004, 0.016],
            [-0.004, 0.2],
            [0, 0.204],
            [0, 0.238],
            [-0.006, 0.25],
            [-0.03, 0.25],
          ],
          [
            [-1.01, 0.05, 1.05],
            [1.01, 0.05, 1.05],
            [1.01, 0.05, -1.05],
            [-1.01, 0.05, -1.05],
          ],
          {
            deg: 40,
          },
        ),
        c,
        null,
        null,
        null,
        "x",
      ),
      l.add(zs(1.97, 0.02, 2.05), c, [0, 0.288, 0]),
      l.add(
        _i(
          [
            [-0.0035, 0],
            [0.0012, 0],
            [0.0012, 0.008],
            [-0.0035, 0.008],
          ],
          [
            [-1.006, 0.262, 1.046],
            [1.006, 0.262, 1.046],
            [1.006, 0.262, -1.046],
            [-1.006, 0.262, -1.046],
          ],
          {
            deg: 60,
          },
        ),
        d,
      ));
    for (let p of [-1, 1])
      l.add(Te(0.05, 0.07, 0.05, 0.004), d, [p * 0.992, 0.086, 1.032]);
    (l.add(
      Jo(1.94, 0.25, 2.02, {
        r: 0.06,
        seg: [6, 1, 6],
        arc: 4,
        crown: {
          py: 0.01,
        },
        plateau: 4,
        lump: 0.002,
        seed: 2,
      }),
      h,
      [0, 0.42, 0],
    ),
      l.add(Id(1.94, 0.25, 2.02, 0.06, "tb", 0.005, 4, 4), h, [0, 0.42, 0]),
      l.add(
        r(0.985, -0.34, 1.02, 0.2, {
          r: 0.06,
          quilt: 0.013,
          seed: 5,
          fold: 0.017,
        }),
        h,
        [0, 0.6, 0],
      ),
      l.add(
        Jo(2.07, 0.058, 0.3, {
          r: 0.0285,
          seg: [14, 1, 3],
          arc: 4,
          crown: {
            py: 0.009,
          },
          lump: 0.009,
          lumpScale: 3.2,
          seed: 9,
        }),
        h,
        [0, 0.606, -0.4],
        [0.035, 0, 0],
      ),
      l.add(
        Jo(2.09, 0.02, 0.17, {
          r: 0.009,
          seg: [12, 1, 2],
          arc: 2,
          crown: {
            py: 0.003,
          },
          lump: 0.003,
          lumpScale: 5,
          seed: 12,
        }),
        h,
        [0, 0.642, -0.335],
        [0.02, 0.004, 0],
      ));
    for (let p of [-1, 1])
      l.add(
        Jo(0.02, 0.2, 0.3, {
          r: 0.009,
          seg: [1, 3, 3],
          arc: 2,
          lump: 0.004,
          seed: 14 + p,
        }),
        h,
        [p * 1.043, 0.52, -0.4],
        [0, 0, p * 0.05],
      );
    l.add(
      r(0.992, 0.42, 0.94, 0.3, {
        r: 0.068,
        nx: 20,
        nz: 6,
        ne: 6,
        seed: 21,
        fold: 0.012,
        foot: !1,
        rumple: 0.004,
      }),
      f,
      [0, 0.63, 0],
    );
    for (let p of [0.42, 0.94])
      l.add(
        Qo(
          [
            [-0.99, 0.631, p],
            [-0.5, 0.633, p + 0.004],
            [0, 0.631, p - 0.003],
            [0.5, 0.633, p + 0.003],
            [0.99, 0.631, p],
          ],
          0.006,
          5,
        ),
        f,
      );
    for (let p of [-1, 1]) {
      let x = Db(0.74, 0.48, 0.2, {
          nu: 12,
          nv: 10,
          plump: 2.3,
          pinch: 0.035,
          lump: 0.006,
          seed: 30 + p,
          sag: 0.25,
          npuck: 7,
          pucker: 0.14,
        }),
        g = [p * 0.47, 0.775, -0.905],
        b = [-0.36, p * 0.03, p * -0.015];
      (l.add(x, h, g, b), l.add(l$(x, 0.045, 0.004), h, g, b));
      let v = Db(0.46, 0.46, 0.17, {
          nu: 10,
          plump: 2.4,
          pinch: 0.05,
          lump: 0.006,
          seed: 40 + p,
          sag: 0.2,
          npuck: 5,
          pucker: 0.18,
        }),
        y = [p * 0.34, 0.76, -0.72],
        M = [-0.52, p * 0.14, p * 0.03];
      (l.add(v, u, y, M), l.add(yw(v, 0.0045, 4), u, y, M));
    }
    {
      let p = Db(0.7, 0.3, 0.15, {
        nu: 12,
        nv: 7,
        plump: 2.6,
        pinch: 0.03,
        lump: 0.004,
        seed: 50,
        sag: 0.15,
        npuck: 6,
        pucker: 0.12,
      });
      (l.add(p, f, [0, 0.768, -0.585], [-0.62, 0, 0]),
        l.add(yw(p, 0.0045, 4), f, [0, 0.768, -0.585], [-0.62, 0, 0]));
    }
    l.add(Te(2.24, 1.2, 0.05, 0.008), c, [0, 0.62, -1.165], null, null, "x");
    let m = [];
    for (let p = 0; p <= 4; p++)
      for (let x = 0; x <= 8; x++)
        (x + p) % 2 === 0 &&
          p > 0 &&
          p < 4 &&
          x > 0 &&
          x < 8 &&
          m.push([-1.016 + x * 0.254, -0.448 + p * 0.224]);
    (l.add(
      Jo(2.13, 0.996, 0.1, {
        r: 0.05,
        seg: [16, 8, 1],
        arc: 4,
        crown: {
          pz: 0.014,
        },
        plateau: 5,
        lump: 0.002,
        seed: 60,
        sculpt: (p, x) => {
          x.z > 0.3 && (p.z -= 0.026 * rw(p.x, p.y, m, 0.085));
        },
      }),
      f,
      [0, 0.715, -1.095],
    ),
      l.add(
        Id(2.13, 0.996, 0.1, 0.05, "f", 0.0055, 5, 4),
        f,
        [0, 0.715, -1.095],
      ));
    for (let [p, x] of m)
      l.add(dr(0.014, 7, 4), f, [p, 0.715 + x, -1.0535], null, [1, 1, 0.5]);
    return (
      l.add(
        _i(
          [
            [-0.028, -0.062],
            [0.028, -0.062],
            [0.028, 0.055],
            [0.022, 0.062],
            [-0.022, 0.062],
            [-0.028, 0.055],
          ],
          [
            [-1.092, 0.02, -1.118],
            [-1.092, 1.222, -1.118],
            [1.092, 1.222, -1.118],
            [1.092, 0.02, -1.118],
          ],
          {
            closed: !1,
            up: De(0, 0, 1),
            deg: 40,
          },
        ),
        c,
        null,
        null,
        null,
        "y",
      ),
      l.add(
        Te(2.24, 0.03, 0.15, 0.006),
        c,
        [0, 1.235, -1.115],
        null,
        null,
        "x",
      ),
      rs("bed", [2.24, 1.25, 2.38], {
        surf: "fabric",
        mass: 140,
        colliders: [
          $s(-1.03, 0, -1.05, 1.03, 0.64, 1.05),
          $s(-1.12, 0, -1.19, 1.12, 1.25, -1.03),
        ],
      })
    );
  });
}

export { registerUpholstery };

// scene/props/plants.js: recovered from the verified GOLDEN HOUR release.
import {
  TAU,
  clamp,
  createCanvas,
  createNoise,
  createRandom,
  lerp,
  smoothstep,
} from "../../core/math.js";
import { THREE } from "../../vendor/three-r180.js";
import { $s, De, _i, di, ke, pe, qa, ra, rc, rs } from "../geometry.js";

var K2 = Math.PI / 180;
var uw = typeof location < "u" && /[?&]atlas=1/.test(location.search);
var la = 2048;
var gr = 1024;
var mr = (o, t, e, s, n = !0, i = 4) => ({
  x: o,
  y: t,
  w: e,
  h: s,
  horiz: n,
  pad: i,
});
var Ks = {
  leaflet: [0, 1, 2, 3].map((o) => mr(0, o * 56, 640, 56)),
  pampas: [0, 1].map((o) => mr(640, o * 112, 448, 112)),
  sans: [0, 1].map((o) => mr(0, 224 + o * 112, 1024, 112)),
  fig: [
    mr(1088, 0, 320, 448, !1),
    mr(1408, 0, 320, 448, !1),
    mr(1728, 0, 320, 448, !1),
    mr(1152, 448, 320, 448, !1),
  ],
  fan: mr(0, 448, 384, 200, !1),
  mulch: mr(384, 448, 256, 256, !1, 2),
  pebble: mr(640, 448, 256, 256, !1, 2),
  moss: mr(896, 448, 256, 256, !1, 2),
  bark: mr(0, 896, 512, 128),
  petiole: mr(512, 896, 384, 128),
  trunk: mr(896, 896, 256, 128),
  branch: mr(1152, 896, 256, 128),
  straw: mr(1408, 896, 128, 128),
  dark: mr(1536, 896, 64, 128),
  twig: mr(1600, 896, 256, 128),
  spear: mr(1856, 896, 192, 128),
};
var Ab = (o, t, e) =>
  o.horiz
    ? [
        o.x + o.pad + t * (o.w - 2 * o.pad),
        o.y + o.h / 2 - e * (o.h / 2 - o.pad),
      ]
    : [
        o.x + o.w / 2 + e * (o.w / 2 - o.pad),
        o.y + o.h - o.pad - t * (o.h - 2 * o.pad),
      ];
var pw = (o, t, e) => {
  let s = Ab(o, t, e);
  return [s[0] / la, 1 - s[1] / gr];
};
var kb = (o) =>
  0.9 *
  (o < 0.28
    ? 0.3 + 0.7 * Math.sin(((Math.PI / 2) * o) / 0.28)
    : Math.pow(Math.max(0, 1 - Math.pow((o - 0.28) / 0.72, 1.9)), 0.85));
var Cb = (o) =>
  0.9 *
  lerp(0.58, 1, smoothstep(0, 0.4, o)) *
  (o > 0.6
    ? Math.pow(Math.max(0, 1 - Math.pow((o - 0.6) / 0.4, 2.3)), 0.9)
    : 1);
var Pb = (o) =>
  o < 0.1
    ? 0.05
    : Math.max(
        0.05,
        0.94 *
          Math.pow(Math.sin(Math.PI * Math.pow((o - 0.1) / 0.9, 0.62)), 0.8),
      );
var Km = [
  [0.085, 0],
  [0.068, 0.1],
  [0.06, 0.22],
  [0.072, 0.33],
  [0.11, 0.44],
  [0.16, 0.52],
  [0.24, 0.575],
  [0.34, 0.56],
  [0.44, 0.52],
  [0.55, 0.66],
  [0.66, 0.88],
  [0.76, 0.98],
  [0.85, 0.95],
  [0.92, 0.78],
  [0.97, 0.48],
  [0.995, 0.14],
  [1, 0],
];
var I9 = 0.93;
var Zj = [
  [0, 0.07],
  [0.055, 0.44],
  [0.16, 0.6],
  [0.42, 0.58],
  [0.62, 0.89],
  [0.78, 0.99],
  [0.92, 0.87],
  [1, 0.3],
];
var F9 = (o, t, e = 1.06) =>
  t.map((s, n) => {
    let i = (s + t[Math.max(0, n - 1)]) / 2,
      a = (s + t[Math.min(t.length - 1, n + 1)]) / 2,
      r = 0;
    for (let l = 0; l <= 12; l++) r = Math.max(r, o(i + ((a - i) * l) / 12));
    return [s, clamp(r * e, 0.05, 1)];
  });
var Qj = F9(kb, [0, 0.3, 0.68, 1]);
var Jj = [
  [0, 0.6],
  [0.42, 0.95],
  [1, 0.25],
];
var t$ = F9(Cb, [0, 0.14, 0.3, 0.48, 0.64, 0.78, 0.9, 1]);
var e$ = F9(Pb, [0, 0.1, 0.24, 0.44, 0.72, 1], 1.03);
var dw = 12;
var zb = 1.5;
var ED = 0.6;
function s$() {
  let o = [0, 1, 2, 3].map(() => createCanvas(la, gr)),
    [t, e, s, n] = o.map((F) =>
      F.getContext("2d", {
        willReadFrequently: !0,
      }),
    ),
    i = [t, e, s, n],
    a = (F, P = 1) => {
      let z = Math.round(clamp(F, 0, 1) * 255);
      return `rgba(${z},${z},${z},${P})`;
    },
    r = (F, P, z) => {
      ((F.fillStyle = z), F.fillRect(P.x, P.y, P.w, P.h));
    };
  ((t.fillStyle = "#2f4f22"),
    t.fillRect(0, 0, la, gr),
    (e.fillStyle = "#000"),
    e.fillRect(0, 0, la, gr),
    (s.fillStyle = a(0.5)),
    s.fillRect(0, 0, la, gr),
    (n.fillStyle = a(0.6)),
    n.fillRect(0, 0, la, gr));
  let l = (F, P) => {
      for (let z of i)
        (z.save(),
          z.beginPath(),
          z.rect(F.x, F.y, F.w, F.h),
          z.clip(),
          (z.lineCap = "round"),
          (z.lineJoin = "round"));
      P();
      for (let z of i) z.restore();
    },
    c = (F, P, z) => {
      (F.beginPath(), F.moveTo(P[0][0], P[0][1]));
      for (let k = 1; k < P.length; k++) F.lineTo(P[k][0], P[k][1]);
      (F.closePath(), z && ((F.fillStyle = z), F.fill()));
    },
    h = (F, P, z, k) => {
      (F.beginPath(), F.moveTo(P[0][0], P[0][1]));
      for (let I = 1; I < P.length; I++) F.lineTo(P[I][0], P[I][1]);
      ((F.lineWidth = z), (F.strokeStyle = k), F.stroke());
    },
    f = (F, P, z, k, I) => {
      F.strokeStyle = I;
      for (let G = 1; G < P.length; G++)
        (F.beginPath(),
          F.moveTo(P[G - 1][0], P[G - 1][1]),
          F.lineTo(P[G][0], P[G][1]),
          (F.lineWidth = lerp(z, k, (G - 0.5) / (P.length - 1))),
          F.stroke());
    },
    u = (F, P, z, k, I, G, K = k) => {
      let $ = F.createRadialGradient(0, 0, 0, 0, 0, k);
      ($.addColorStop(0, `rgba(${I},${G})`),
        $.addColorStop(1, `rgba(${I},0)`),
        F.save(),
        F.translate(P, z),
        F.scale(1, K / k),
        (F.fillStyle = $),
        F.fillRect(-k, -k, 2 * k, 2 * k),
        F.restore());
    },
    d = (F, P, z, k = 10) => {
      let I = [];
      for (let G = 0; G <= k; G++) {
        let K = G / k,
          $ = (1 - K) * (1 - K),
          n0 = 2 * K * (1 - K),
          e0 = K * K;
        I.push([
          F[0] * $ + P[0] * n0 + z[0] * e0,
          F[1] * $ + P[1] * n0 + z[1] * e0,
        ]);
      }
      return I;
    },
    m = (F, P, { base: z, hi: k, lo: I, rib: G, tip: K = 0, wash: $ = null }) =>
      l(F, () => {
        let n0 = createRandom(P),
          e0 = (m0, S0) => Ab(F, m0, S0),
          p0 = 48,
          t0 = [];
        for (let m0 = 0; m0 <= p0; m0++) t0.push(e0(m0 / p0, kb(m0 / p0)));
        for (let m0 = p0; m0 >= 0; m0--) t0.push(e0(m0 / p0, -kb(m0 / p0)));
        (r(t, F, z), r(s, F, a(0.5)), r(n, F, a(0.4)), c(e, t0, "#fff"));
        let M0 = e0(0, 0)[0],
          f0 = e0(1, 0)[0],
          _0 = t.createLinearGradient(M0, 0, f0, 0);
        (_0.addColorStop(0, k),
          _0.addColorStop(0.2, z),
          _0.addColorStop(0.75, z),
          _0.addColorStop(1, I),
          (t.globalAlpha = 0.6),
          r(t, F, _0),
          (t.globalAlpha = 1));
        for (let m0 = 0; m0 < 30; m0++) {
          let S0 = e0(n0(), n0.range(-0.8, 0.8)),
            T0 = n0() < 0.5;
          u(
            t,
            S0[0],
            S0[1],
            8 + n0() * 26,
            T0 ? "10,34,8" : "128,168,62",
            0.1 + n0() * 0.12,
            5 + n0() * 6,
          );
        }
        for (let m0 = 0; m0 <= 18; m0++) {
          let S0 = -1 + (2 * m0) / 18,
            T0 = [];
          for (let Z0 = 0; Z0 <= 20; Z0++) {
            let lt = Z0 / 20;
            T0.push(e0(lt, S0 * kb(lt) * 0.97));
          }
          let j0 = m0 % 2 === 0;
          (h(
            t,
            T0,
            0.8 + n0() * 1.1,
            j0
              ? `rgba(156,196,96,${0.1 + n0() * 0.16})`
              : `rgba(8,26,6,${0.12 + n0() * 0.18})`,
          ),
            h(s, T0, 2.4, a(j0 ? 0.68 : 0.34)));
        }
        let F0 = [e0(0, 0), e0(0.985, 0)];
        (h(t, F0, 4, "rgba(16,36,10,0.4)"),
          f(t, d(F0[0], e0(0.5, 0), F0[1], 6), 2.6, 1.1, G),
          h(s, F0, 6, a(0.7)),
          h(s, F0, 2.4, a(0.92)),
          h(n, F0, 3, a(0.32)));
        for (let m0 of [-1, 1]) {
          let S0 = [];
          for (let T0 = 1; T0 <= 19; T0++) {
            let j0 = T0 / 20;
            S0.push(e0(j0, m0 * 0.5 * kb(j0)));
          }
          (h(t, S0, 1.3, "rgba(120,160,70,0.4)"), h(s, S0, 3, a(0.74)));
        }
        if (
          ($ && ((t.globalAlpha = $[1]), r(t, F, $[0]), (t.globalAlpha = 1)),
          K > 0)
        ) {
          let m0 = e0(1 - K * 2.1, 0)[0],
            S0 = t.createLinearGradient(m0, 0, f0, 0);
          (S0.addColorStop(0, "rgba(176,166,60,0)"),
            S0.addColorStop(0.32, "rgba(178,164,62,0.8)"),
            S0.addColorStop(0.5, "rgba(170,132,72,1)"),
            S0.addColorStop(1, "rgba(104,72,40,1)"),
            (t.fillStyle = S0),
            t.fillRect(m0, F.y, f0 - m0 + 8, F.h));
          let T0 = n.createLinearGradient(m0, 0, f0, 0);
          (T0.addColorStop(0, a(0.85, 0)),
            T0.addColorStop(0.5, a(0.85, 1)),
            (n.fillStyle = T0),
            n.fillRect(m0, F.y, f0 - m0 + 8, F.h));
          for (let j0 = 0; j0 < 14; j0++) {
            let Z0 = e0(n0.range(1 - K * 1.6, 1), n0.range(-0.4, 0.4));
            u(t, Z0[0], Z0[1], 2 + n0() * 4, "70,46,24", 0.5);
          }
        }
      }),
    p = (
      F,
      P,
      {
        base: z,
        vein: k,
        mott: I,
        dark: G,
        pet: K,
        rough: $ = 0.33,
        brown: n0 = 0,
        soft: e0 = 1,
      },
    ) =>
      l(F, () => {
        let p0 = createRandom(P),
          t0 = (Y0, et) => Ab(F, Y0, et),
          M0 = Km.length,
          f0 = (Y0, et, ct) => {
            let D0 = [];
            for (let u0 = 0; u0 < M0 - 1; u0++)
              for (let w0 = 0; w0 < 6; w0++) {
                let P0 = w0 / 6,
                  st = Km[Math.max(0, u0 - 1)],
                  J0 = Km[u0],
                  q0 = Km[u0 + 1],
                  v0 = Km[Math.min(M0 - 1, u0 + 2)],
                  x0 = (O0, B0, ot, Q0) =>
                    0.5 *
                    (2 * B0 +
                      (ot - O0) * P0 +
                      (2 * O0 - 5 * B0 + 4 * ot - Q0) * P0 * P0 +
                      (3 * B0 - O0 - 3 * ot + Q0) * P0 * P0 * P0),
                  C0 = x0(st[0], J0[0], q0[0], v0[0]),
                  k0 = Math.max(0, x0(st[1], J0[1], q0[1], v0[1]));
                D0.push(
                  t0(
                    C0,
                    Y0 *
                      k0 *
                      I9 *
                      ct *
                      (1 +
                        0.032 * Math.sin(C0 * 34 + et) +
                        0.014 * Math.sin(C0 * 83 + et * 2.3)),
                  ),
                );
              }
            return (D0.push(t0(1, 0)), D0);
          },
          _0 = (Y0) => {
            for (let et = 3; et < M0 - 1; et++) {
              let ct = Km[et],
                D0 = Km[et + 1];
              if (Y0 <= D0[0])
                return (
                  I9 *
                  lerp(
                    ct[1],
                    D0[1],
                    clamp((Y0 - ct[0]) / (D0[0] - ct[0]), 0, 1),
                  )
                );
            }
            return 0;
          },
          F0 = f0(1, p0() * 6, 1),
          m0 = f0(-1, p0() * 6, 0.96),
          S0 = [...F0, ...m0.reverse()];
        (r(t, F, z), r(s, F, a(0.5)), r(n, F, a($)), c(e, S0, "#fff"));
        let T0 = [t0(0, 0), t0(0.1, 0)];
        h(e, T0, 11, "#fff");
        for (let Y0 = 0; Y0 < 90; Y0++) {
          let et = p0.range(0.08, 0.99),
            ct = t0(et, p0.range(-1, 1) * _0(et)),
            D0 = p0() < 0.45;
          u(t, ct[0], ct[1], 12 + p0() * 38, D0 ? G : I, 0.1 + p0() * 0.16);
        }
        (t.save(),
          c(t, S0),
          t.clip(),
          (t.lineJoin = "round"),
          h(t, [...S0, S0[0]], 16, `rgba(${G},0.22)`),
          h(t, [...S0, S0[0]], 5, `rgba(${G},0.25)`),
          t.restore(),
          s.save(),
          c(s, S0),
          s.clip(),
          h(s, [...S0, S0[0]], 22, a(0.38, 0.5)),
          s.restore());
        let j0 = [0.1, 0.118, 0.2, 0.31, 0.42, 0.53, 0.635, 0.735, 0.825, 0.9],
          Z0 = {
            "-1": [],
            1: [],
          };
        for (let Y0 of [-1, 1])
          j0.forEach((et, ct) => {
            let D0 = p0.range(-0.012, 0.012),
              u0,
              w0;
            (ct === 0
              ? ((u0 = 0.078), (w0 = 0.29 * I9))
              : ct === 1
                ? ((u0 = 0.19), (w0 = _0(0.19) * 0.9))
                : ((u0 = Math.min(
                    0.985,
                    et + 0.1 + 0.05 * p0() - (ct > 7 ? 0.035 : 0),
                  )),
                  (w0 = _0(u0) * 0.87)),
              Z0[Y0].push(
                d(
                  t0(et + D0, 0),
                  t0(et + D0 + (u0 - et) * 0.22, Y0 * w0 * 0.66),
                  t0(u0, Y0 * w0),
                  12,
                ),
              ));
          });
        let lt = `rgba(${k},${0.95 * e0})`;
        for (let Y0 of [-1, 1]) {
          let et = Z0[Y0];
          for (let ct = 1; ct < et.length - 1; ct++) {
            let D0 = et[ct],
              u0 = et[ct + 1];
            for (let q0 = 3; q0 <= 11; q0++) {
              let v0 = D0[q0],
                x0 = u0[Math.max(1, q0 - 1)],
                C0 = [
                  (v0[0] + x0[0]) / 2 + p0.range(-3, 3),
                  (v0[1] + x0[1]) / 2 + p0.range(-3, 3),
                ],
                k0 = d(v0, C0, x0, 4);
              (h(t, k0, 1, `rgba(${k},${0.28 * e0})`),
                h(s, k0, 2.2, a(0.36, 0.7)));
            }
            for (let q0 = 3; q0 <= 10; q0 += 2) {
              let v0 = D0[q0],
                x0 = u0[q0 - 1];
              u(
                s,
                (v0[0] + x0[0]) / 2,
                (v0[1] + x0[1]) / 2,
                13 + q0 * 1.3,
                "235,235,235",
                0.45,
              );
            }
            let w0 = D0[12],
              P0 = u0[10],
              st = (j0[ct] + j0[ct + 1]) / 2 + 0.11,
              J0 = d(
                w0,
                t0(Math.min(0.99, st), Y0 * _0(Math.min(0.99, st)) * 0.94),
                P0,
                6,
              );
            (h(t, J0, 1.6, `rgba(${k},${0.6 * e0})`), h(s, J0, 3, a(0.3, 0.8)));
          }
          for (let ct of et)
            (f(s, ct, 9, 4, a(0.2, 0.55)),
              f(s, ct, 4, 1.6, a(0.12)),
              f(t, ct, 5.5, 2.4, `rgba(${G},0.3)`),
              f(t, ct, 3.4, 1.3, lt),
              f(n, ct, 4, 2, a(0.44)));
        }
        let H0 = [t0(0.085, 0), t0(0.3, 0.004), t0(0.6, -0.004), t0(0.99, 0)];
        (f(s, H0, 15, 5, a(0.22, 0.6)),
          f(s, H0, 8, 2, a(0.1)),
          f(t, H0, 11, 4, `rgba(${G},0.35)`),
          f(t, H0, 7.5, 1.8, `rgb(${k})`),
          f(t, H0, 2, 0.6, "rgba(235,240,190,0.5)"),
          f(n, H0, 8, 2, a(0.4)),
          h(t, T0, 13, K),
          h(t, T0, 3, "rgba(230,235,180,0.35)"),
          h(s, T0, 10, a(0.8)),
          h(n, T0, 13, a(0.5)));
        for (let Y0 = 0; Y0 < n0; Y0++) {
          let et = p0.range(0.35, 0.95),
            ct = p0.sign(),
            D0 = t0(et, ct * _0(et) * 0.97),
            u0 = 16 + p0() * 22;
          (u(t, D0[0], D0[1], u0 * 1.7, "168,150,64", 0.55),
            u(t, D0[0], D0[1], u0, "92,62,34", 1),
            u(t, D0[0], D0[1], u0 * 0.6, "70,46,26", 0.9),
            u(n, D0[0], D0[1], u0 * 1.2, "225,225,225", 1),
            u(s, D0[0], D0[1], u0, "70,70,70", 0.6));
          for (let w0 = 0; w0 < 5; w0++) {
            let P0 = t0(p0.range(0.2, 0.95), p0.range(-0.8, 0.8) * _0(0.6));
            u(t, P0[0], P0[1], 2.5 + p0() * 4, "84,58,30", 0.8);
          }
        }
      }),
    x = (F, P, { dark: z, band: k, margin: I, mw: G }) =>
      l(F, () => {
        let K = createRandom(P),
          $ = createNoise(P + 3),
          n0 = (T0, j0) => Ab(F, T0, j0),
          e0 = 64,
          p0 = [],
          t0 = [];
        for (let T0 = 0; T0 <= e0; T0++)
          (p0.push(n0(T0 / e0, Cb(T0 / e0))),
            t0.push(
              n0(
                T0 / e0,
                Math.max(
                  0,
                  Cb(T0 / e0) - G * (0.75 + 0.5 * $.noise(T0 * 0.35, 1)),
                ),
              ),
            ));
        for (let T0 = e0; T0 >= 0; T0--)
          (p0.push(n0(T0 / e0, -Cb(T0 / e0))),
            t0.push(
              n0(
                T0 / e0,
                -Math.max(
                  0,
                  Cb(T0 / e0) - G * (0.75 + 0.5 * $.noise(T0 * 0.35, 9)),
                ),
              ),
            ));
        (r(t, F, I), r(s, F, a(0.56)), r(n, F, a(0.36)), c(e, p0, "#fff"));
        for (let T0 = 0; T0 < 40; T0++) {
          let j0 = n0(K(), K.sign() * K.range(0.6, 1));
          u(
            t,
            j0[0],
            j0[1],
            10 + K() * 30,
            K() < 0.5 ? "226,214,150" : "176,150,58",
            0.25,
            6,
          );
        }
        (t.save(), c(t, t0), t.clip(), r(t, F, z));
        let M0 = n0(0, 0)[0],
          f0 = n0(1, 0)[0],
          _0 = t.createLinearGradient(M0, 0, f0, 0);
        (_0.addColorStop(0, "rgba(150,170,120,0.5)"),
          _0.addColorStop(0.12, "rgba(60,90,50,0)"),
          _0.addColorStop(1, "rgba(10,30,14,0.25)"),
          r(t, F, _0));
        let F0 = 0.012;
        for (; F0 < 0.975;) {
          let T0 = K.range(0.004, 0.012),
            j0 = [],
            Z0 = [];
          for (let lt = 0; lt <= 16; lt++) {
            let H0 = -1 + (2 * lt) / 16,
              Y0 =
                ($.noise(F0 * 60, lt * 0.8) - 0.5) * 0.02 +
                0.004 * Math.sin(lt * 2.3 + F0 * 70);
            (j0.push(n0(F0 + Y0 + T0 * (0.4 + K() * 0.9), H0)),
              Z0.push(n0(F0 + Y0 - T0 * (0.4 + K() * 0.9), H0)));
          }
          (c(t, [...j0, ...Z0.reverse()], `rgba(${k},${0.42 + K() * 0.45})`),
            (F0 += T0 + K.range(0.01, 0.03)));
        }
        for (let T0 = 0; T0 < 44; T0++) {
          let j0 = K.range(-1, 1),
            Z0 = [n0(0, j0 * 0.6), n0(0.4, j0), n0(1, j0 * 0.2)];
          (h(
            t,
            d(Z0[0], Z0[1], Z0[2], 8),
            1,
            T0 % 2 ? "rgba(8,24,10,0.14)" : "rgba(170,200,160,0.1)",
          ),
            h(s, d(Z0[0], Z0[1], Z0[2], 8), 1.6, a(T0 % 2 ? 0.44 : 0.62, 0.6)));
        }
        (t.restore(),
          h(t, t0.slice(0, e0 + 1), 1.6, "rgba(24,48,22,0.55)"),
          h(t, t0.slice(e0 + 1), 1.6, "rgba(24,48,22,0.55)"),
          h(s, p0.slice(0, e0 + 1), 5, a(0.4, 0.8)),
          h(s, p0.slice(e0 + 1), 5, a(0.4, 0.8)));
        let m0 = n0(0.965, 0)[0],
          S0 = t.createLinearGradient(m0, 0, f0, 0);
        (S0.addColorStop(0, "rgba(150,120,70,0)"),
          S0.addColorStop(0.6, "rgba(138,104,62,1)"),
          S0.addColorStop(1, "rgba(90,62,38,1)"),
          (t.fillStyle = S0),
          t.fillRect(m0, F.y, f0 - m0 + 8, F.h));
      }),
    g = (F, P) =>
      l(F, () => {
        let z = createRandom(P),
          k = ($, n0) => Ab(F, $, n0),
          I = [];
        (r(t, F, "#d6c6a2"), r(s, F, a(0.3)), r(n, F, a(0.96)));
        for (let $ = 0; $ <= 30; $++) {
          let n0 = 0.1 + (0.86 * $) / 30;
          I.push(k(n0, Pb(n0) * 0.42));
        }
        for (let $ = 30; $ >= 0; $--) {
          let n0 = 0.1 + (0.86 * $) / 30;
          I.push(k(n0, -Pb(n0) * 0.42));
        }
        (c(e, I, "#fff"), c(s, I, a(0.5)));
        let G = [
          "236,226,200",
          "222,208,174",
          "204,186,146",
          "242,236,216",
          "190,170,128",
        ];
        for (let $ = 0; $ < 620; $++) {
          let n0 = Math.pow(z(), 0.8) * 0.84 + 0.1,
            e0 = z.sign(),
            p0 = z.range(0.07, 0.2),
            t0 = Math.min(0.995, n0 + p0),
            M0 = Pb(t0) * z.range(0.3, 1),
            f0 = d(
              k(n0, e0 * 0.02),
              k(n0 + p0 * 0.6, e0 * M0 * 0.3),
              k(t0, e0 * M0),
              6,
            );
          (h(e, f0, 2.6 + z() * 1.2, "#fff"),
            h(
              t,
              f0,
              1.4 + z() * 1.6,
              `rgba(${z.pick(G)},${0.55 + z() * 0.45})`,
            ),
            h(s, f0, 2, a(0.5 + z() * 0.45)));
        }
        for (let $ = 0; $ < 260; $++) {
          let n0 = z.range(0.12, 0.97),
            e0 = k(n0, z.range(-1, 1) * Pb(n0) * 0.8);
          u(
            t,
            e0[0],
            e0[1],
            2 + z() * 3,
            z() < 0.5 ? "250,246,232" : "170,148,104",
            0.5,
          );
        }
        let K = [k(0, 0), k(0.6, 0)];
        (h(e, [k(0, 0), k(0.14, 0)], 6, "#fff"),
          f(t, d(K[0], k(0.3, 0), K[1], 6), 5, 1.5, "rgb(170,146,98)"),
          h(s, K, 4, a(0.8)));
      }),
    b = (F) =>
      l(F, () => {
        let P = createRandom(31),
          z = F.x + F.w / 2,
          k = F.y + F.h - F.pad,
          I = Math.min(F.h - 2 * F.pad, F.w / 2 - F.pad),
          G = (K, $) => [z + Math.sin(K) * $, k - Math.cos(K) * $];
        (r(t, F, "#cdb98e"), r(s, F, a(0.5)), r(n, F, a(0.8)));
        for (let K = 0; K < dw; K++) {
          let $ = -zb + (2 * zb * (K + 0.5)) / dw,
            n0 = zb / dw,
            e0 = I * P.range(0.86, 0.99),
            p0 = I * ED,
            t0 = G($, 0),
            M0 = G($ - n0, p0),
            f0 = G($ + n0, p0),
            _0 = G($ + P.range(-0.02, 0.02), e0);
          (c(e, [t0, M0, _0, f0], "#fff"),
            c(t, [t0, M0, _0], K % 2 ? "#d8c89e" : "#cfbd92"),
            c(t, [t0, _0, f0], K % 2 ? "#bca97c" : "#c4b084"),
            c(s, [t0, M0, _0], a(0.34)),
            c(s, [t0, _0, f0], a(0.66)));
          for (let F0 = 0; F0 < 5; F0++) {
            let m0 = P.range(-0.8, 0.8);
            h(t, [t0, G($ + n0 * m0, p0), _0], 0.8, "rgba(120,98,60,0.22)");
          }
          (h(t, [t0, _0], 1.6, "rgba(150,128,84,0.9)"),
            h(t, [t0, M0], 1.2, "rgba(110,90,56,0.5)"),
            h(s, [t0, _0], 2.5, a(0.9)),
            u(t, _0[0], _0[1], 12, "150,116,70", 0.5));
        }
        u(t, z, k, 40, "150,124,78", 0.6);
      }),
    v = (F) =>
      l(F, () => {
        let P = createRandom(57),
          z = F.x + F.w / 2,
          k = F.y + F.h / 2,
          I = [
            "92,58,34",
            "108,70,40",
            "64,42,26",
            "124,86,52",
            "78,50,30",
            "54,36,24",
          ];
        (r(t, F, "#4a3020"),
          r(s, F, a(0.2)),
          r(n, F, a(0.95)),
          u(e, z, k, 86, "255,255,255", 1),
          (e.fillStyle = "#fff"),
          e.beginPath(),
          e.arc(z, k, 62, 0, TAU),
          e.fill(),
          u(t, z, k, 120, "30,20,14", 0.9));
        for (let G = 0; G < 230; G++) {
          let K = G > 90,
            $ = P() * TAU,
            n0 = Math.sqrt(P()) * (K ? 108 : 100),
            e0 = z + Math.cos($) * n0,
            p0 = k + Math.sin($) * n0,
            t0 = P.range(7, 19) * (K ? 1 : 0.8),
            M0 = t0 * P.range(0.35, 0.6),
            f0 = P() * Math.PI,
            _0 = 5 + ((P() * 3) | 0),
            F0 = [];
          for (let Z0 = 0; Z0 < _0; Z0++) {
            let lt = (Z0 / _0) * TAU + P.range(-0.3, 0.3),
              H0 = P.range(0.75, 1.1),
              Y0 = Math.cos(lt) * t0 * H0,
              et = Math.sin(lt) * M0 * H0;
            F0.push([
              e0 + Y0 * Math.cos(f0) - et * Math.sin(f0),
              p0 + Y0 * Math.sin(f0) + et * Math.cos(f0),
            ]);
          }
          let m0 = P.pick(I),
            S0 = t.createLinearGradient(e0 - t0, p0 - t0, e0 + t0, p0 + t0);
          (S0.addColorStop(0, `rgb(${m0})`),
            S0.addColorStop(1, "rgb(40,26,18)"),
            c(e, F0, "#fff"),
            c(t, F0, S0),
            h(t, [...F0, F0[0]], 1, "rgba(20,12,8,0.6)"));
          for (let Z0 = 0; Z0 < 3; Z0++) {
            let lt = P.range(-0.6, 0.6);
            h(
              t,
              [
                [
                  e0 - Math.cos(f0) * t0 * 0.8 - Math.sin(f0) * M0 * lt,
                  p0 - Math.sin(f0) * t0 * 0.8 + Math.cos(f0) * M0 * lt,
                ],
                [
                  e0 + Math.cos(f0) * t0 * 0.8 - Math.sin(f0) * M0 * lt,
                  p0 + Math.sin(f0) * t0 * 0.8 + Math.cos(f0) * M0 * lt,
                ],
              ],
              0.8,
              "rgba(160,120,80,0.25)",
            );
          }
          let T0 = P.range(0.35, 0.95),
            j0 = s.createLinearGradient(e0 - t0, p0 - t0, e0 + t0, p0 + t0);
          (j0.addColorStop(0, a(T0)),
            j0.addColorStop(1, a(T0 * 0.55)),
            c(s, F0, j0));
        }
      }),
    y = (F) =>
      l(F, () => {
        let P = createRandom(83),
          z = F.x + F.w / 2,
          k = F.y + F.h / 2,
          I = [
            "214,208,194",
            "188,180,166",
            "150,144,134",
            "228,222,208",
            "170,160,142",
            "108,102,94",
            "200,188,168",
          ];
        (r(t, F, "#6e6a60"),
          r(s, F, a(0.12)),
          r(n, F, a(0.62)),
          (e.fillStyle = "#fff"),
          e.beginPath(),
          e.arc(z, k, 70, 0, TAU),
          e.fill(),
          u(t, z, k, 124, "34,30,26", 0.95));
        let G = [];
        for (let K = 0; K < 900 && G.length < 150; K++) {
          let $ = P() * TAU,
            n0 = Math.sqrt(P()) * 112,
            e0 = z + Math.cos($) * n0,
            p0 = k + Math.sin($) * n0,
            t0 = P.range(6, 15) * (G.length < 60 ? 1.15 : 0.75);
          if (
            G.some(
              (m0) => Math.hypot(m0[0] - e0, m0[1] - p0) < (m0[2] + t0) * 0.82,
            )
          )
            continue;
          G.push([e0, p0, t0]);
          let M0 = t0 * P.range(0.62, 0.92),
            f0 = P() * Math.PI,
            _0 = P.pick(I);
          for (let [m0, S0] of [
            [e, "#fff"],
            [t, `rgb(${_0})`],
          ])
            ((m0.fillStyle = S0),
              m0.beginPath(),
              m0.ellipse(e0, p0, t0, M0, f0, 0, TAU),
              m0.fill());
          (t.save(),
            t.beginPath(),
            t.ellipse(e0, p0, t0, M0, f0, 0, TAU),
            t.clip(),
            u(t, e0 - t0 * 0.3, p0 - t0 * 0.35, t0 * 1.1, "255,252,244", 0.35),
            u(t, e0 + t0 * 0.5, p0 + t0 * 0.55, t0 * 1.2, "20,16,12", 0.5));
          for (let m0 = 0; m0 < 6; m0++)
            u(
              t,
              e0 + P.range(-t0, t0),
              p0 + P.range(-M0, M0),
              1 + P() * 2,
              P() < 0.5 ? "90,84,76" : "240,236,226",
              0.35,
            );
          (P() < 0.25 &&
            h(
              t,
              [
                [e0 - t0, p0 + P.range(-M0, M0) * 0.6],
                [e0 + t0, p0 + P.range(-M0, M0) * 0.6],
              ],
              1 + P() * 1.5,
              "rgba(250,246,236,0.4)",
            ),
            t.restore(),
            s.save(),
            s.translate(e0, p0),
            s.rotate(f0),
            s.scale(1, M0 / t0));
          let F0 = s.createRadialGradient(0, 0, 0, 0, 0, t0);
          (F0.addColorStop(0, a(1)),
            F0.addColorStop(0.55, a(0.86)),
            F0.addColorStop(0.85, a(0.5)),
            F0.addColorStop(1, a(0.14)),
            (s.fillStyle = F0),
            s.beginPath(),
            s.arc(0, 0, t0, 0, TAU),
            s.fill(),
            s.restore(),
            (n.fillStyle = a(P() < 0.3 ? 0.36 : 0.6)),
            n.beginPath(),
            n.ellipse(e0, p0, t0, M0, f0, 0, TAU),
            n.fill());
        }
      }),
    M = (F) =>
      l(F, () => {
        let P = createRandom(29),
          z = createNoise(41),
          k = F.x + F.w / 2,
          I = F.y + F.h / 2,
          G = [
            "74,104,34",
            "96,124,40",
            "58,84,28",
            "118,138,48",
            "48,70,24",
            "136,150,62",
          ];
        (r(t, F, "#44601f"), r(s, F, a(0.2)), r(n, F, a(0.97)));
        for (let K = 0; K < 1500; K++) {
          let $ = P() * TAU,
            n0 =
              78 + 34 * z.fbm(Math.cos($) * 1.6 + 5, Math.sin($) * 1.6 + 5, 3),
            e0 = Math.sqrt(P()) * n0,
            p0 = k + Math.cos($) * e0,
            t0 = I + Math.sin($) * e0,
            M0 = P.range(2.5, 6.5);
          ((e.fillStyle = "#fff"),
            e.beginPath(),
            e.arc(p0, t0, M0 * 0.9, 0, TAU),
            e.fill(),
            u(t, p0, t0, M0 * 1.5, P.pick(G), 0.9),
            u(t, p0 - M0 * 0.3, t0 - M0 * 0.3, M0 * 0.6, "176,190,90", 0.35),
            u(s, p0, t0, M0 * 1.4, "255,255,255", 0.75));
        }
        for (let K = 0; K < 60; K++) {
          let $ = P() * TAU,
            n0 = Math.sqrt(P()) * 80;
          u(
            t,
            k + Math.cos($) * n0,
            I + Math.sin($) * n0,
            8 + P() * 14,
            P() < 0.5 ? "30,48,16" : "150,150,60",
            0.25,
          );
        }
      }),
    w = (F, P, z, k) =>
      l(F, () => {
        (r(t, F, P),
          r(e, F, "#fff"),
          r(s, F, a(0.5)),
          r(n, F, a(z)),
          k(createRandom(F.x + 7), F));
      }),
    T = (F, P, z, k, I) => {
      ((F.fillStyle = I), F.fillRect(P.x + z, P.y, k, P.h));
    },
    S = (F, P, z, k, I, G, K = 2) => {
      let $ = [];
      for (let n0 = 0; n0 <= P.w; n0 += 16)
        $.push([P.x + n0, P.y + k + z.range(-K, K)]);
      h(F, $, I, G);
    };
  (w(Ks.bark, "#8b7b67", 0.9, (F, P) => {
    for (let z = 0; z < 46; z++)
      u(
        t,
        P.x + F() * P.w,
        P.y + F() * P.h,
        14 + F() * 40,
        F.pick([
          "150,140,124",
          "96,82,66",
          "120,104,84",
          "168,160,146",
          "86,78,60",
        ]),
        0.3,
        10 + F() * 20,
      );
    for (let z = 0; z < 40; z++) {
      let k = F() * P.h;
      (S(t, P, F, k, 0.8 + F(), `rgba(50,40,30,${0.12 + F() * 0.2})`, 3),
        S(s, P, F, k, 2, a(0.3, 0.5), 3));
    }
    for (let z = 12 + F() * 30; z < P.w; z += 34 + F() * 52)
      (T(t, P, z, 2.5, "rgba(60,48,36,0.5)"),
        T(t, P, z + 2.5, 2, "rgba(176,164,144,0.5)"),
        T(s, P, z - 1, 6, a(0.72, 0.8)),
        T(s, P, z + 1, 2, a(0.3)));
    for (let z = 0; z < 150; z++) {
      let k = P.x + F() * P.w,
        I = P.y + F() * P.h,
        G = 4 + F() * 12;
      ((t.fillStyle = "rgba(190,176,150,0.75)"),
        t.fillRect(k, I, 2, G),
        (t.fillStyle = "rgba(50,40,30,0.4)"),
        t.fillRect(k + 2, I, 1, G),
        (s.fillStyle = a(0.85)),
        s.fillRect(k - 0.5, I, 3, G));
    }
  }),
    w(Ks.petiole, "#4f7a30", 0.46, (F, P) => {
      let z = t.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (z.addColorStop(0, "#5a4c2a"),
        z.addColorStop(0.1, "#5e6130"),
        z.addColorStop(0.3, "#4c7430"),
        z.addColorStop(1, "#6c9640"),
        r(t, P, z));
      for (let I = 0; I < 26; I++) {
        let G = F() * P.h;
        (S(
          t,
          P,
          F,
          G,
          1 + F() * 2,
          I % 2 ? "rgba(150,190,96,0.16)" : "rgba(14,34,10,0.2)",
          1,
        ),
          S(s, P, F, G, 3, a(I % 2 ? 0.66 : 0.36, 0.6), 1));
      }
      for (let I = 0; I < 260; I++) {
        let G = Math.pow(F(), 2.6);
        u(
          t,
          P.x + G * P.w * 0.5,
          P.y + F() * P.h,
          1.5 + F() * 3,
          "52,34,18",
          0.7 * (1 - G),
        );
      }
      let k = n.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (k.addColorStop(0, a(0.85)), k.addColorStop(0.25, a(0.46)), r(n, P, k));
    }),
    w(Ks.trunk, "#5f7438", 0.62, (F, P) => {
      for (let k = 0; k < 30; k++)
        u(
          t,
          P.x + F() * P.w,
          P.y + F() * P.h,
          10 + F() * 30,
          F.pick(["84,106,52", "70,86,40", "110,116,60", "96,84,50"]),
          0.3,
        );
      let z = t.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (z.addColorStop(0, "rgba(96,74,46,0.85)"),
        z.addColorStop(0.35, "rgba(96,84,48,0.25)"),
        z.addColorStop(1, "rgba(96,84,48,0)"),
        r(t, P, z));
      for (let k = 10; k < P.w; k += 22 + F() * 16) {
        let I = t.createLinearGradient(P.x + k, 0, P.x + k + 16, 0);
        (I.addColorStop(0, "rgba(30,40,16,0.5)"),
          I.addColorStop(1, "rgba(30,40,16,0)"),
          (t.fillStyle = I),
          t.fillRect(P.x + k, P.y, 16, P.h),
          T(t, P, k - 3, 3.5, "rgba(176,158,110,0.9)"),
          T(t, P, k - 4, 1, "rgba(70,56,34,0.7)"),
          T(s, P, k - 4, 5, a(0.82)),
          T(s, P, k + 1, 3, a(0.3)),
          T(n, P, k - 3, 4, a(0.85)));
      }
      for (let k = 0; k < 20; k++) {
        let I = F() * P.h;
        S(t, P, F, I, 1, "rgba(20,30,12,0.18)", 2);
      }
    }),
    w(Ks.branch, "#4c3b2d", 0.9, (F, P) => {
      for (let z = 0; z < 30; z++)
        u(
          t,
          P.x + F() * P.w,
          P.y + F() * P.h,
          8 + F() * 26,
          F.pick(["88,68,50", "50,38,30", "110,90,68", "66,52,42"]),
          0.4,
        );
      for (let z = 0; z < 26; z++) {
        let k = F() * P.h;
        (S(
          t,
          P,
          F,
          k,
          1,
          z % 2 ? "rgba(140,116,90,0.25)" : "rgba(20,14,10,0.3)",
          2,
        ),
          S(s, P, F, k, 2.5, a(z % 2 ? 0.7 : 0.3, 0.7), 2));
      }
      for (let z = 20; z < P.w; z += 40 + F() * 40)
        (T(t, P, z, 4, "rgba(120,98,74,0.6)"), T(s, P, z, 5, a(0.8, 0.8)));
      for (let z = 0; z < 70; z++)
        u(
          t,
          P.x + F() * P.w,
          P.y + F() * P.h,
          1.5 + F() * 2,
          "170,150,120",
          0.6,
        );
    }),
    w(Ks.straw, "#c5ab74", 0.8, (F, P) => {
      for (let z = 0; z < 22; z++) {
        let k = F() * P.h;
        (S(
          t,
          P,
          F,
          k,
          1 + F() * 2,
          z % 2 ? "rgba(232,214,160,0.4)" : "rgba(120,96,54,0.35)",
          1,
        ),
          S(s, P, F, k, 3, a(z % 2 ? 0.68 : 0.34, 0.7), 1));
      }
      for (let z = 30; z < P.w; z += 44)
        (T(t, P, z, 3, "rgba(110,88,50,0.6)"), T(s, P, z, 4, a(0.78)));
    }),
    w(Ks.dark, "#050505", 1, () => {}),
    w(Ks.twig, "#7b6a52", 0.8, (F, P) => {
      let z = t.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (z.addColorStop(0, "#85745f"),
        z.addColorStop(0.5, "#7a6c4c"),
        z.addColorStop(0.8, "#727a40"),
        z.addColorStop(1, "#7c9044"),
        r(t, P, z));
      for (let I = 0; I < 20; I++)
        u(
          t,
          P.x + F() * P.w,
          P.y + F() * P.h,
          8 + F() * 22,
          F.pick(["150,138,116", "90,76,56", "110,110,64"]),
          0.3,
        );
      for (let I = 8; I < P.w; I += 16 + F() * 14)
        (T(t, P, I, 2, "rgba(58,44,30,0.6)"),
          T(t, P, I + 2, 1.5, "rgba(190,176,140,0.5)"),
          T(s, P, I - 1, 5, a(0.78, 0.9)),
          T(s, P, I + 3, 2, a(0.3)));
      for (let I = 0; I < 60; I++) {
        let G = P.x + F() * P.w,
          K = P.y + F() * P.h;
        ((t.fillStyle = "rgba(200,188,160,0.7)"),
          t.fillRect(G, K, 1.5, 3 + F() * 5));
      }
      let k = n.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (k.addColorStop(0.5, a(0.82)), k.addColorStop(1, a(0.5)), r(n, P, k));
    }),
    w(Ks.spear, "#7ea446", 0.42, (F, P) => {
      let z = t.createLinearGradient(P.x, 0, P.x + P.w, 0);
      (z.addColorStop(0, "#6b9440"),
        z.addColorStop(0.7, "#86ab4a"),
        z.addColorStop(1, "#a4b858"),
        r(t, P, z));
      for (let k = 3; k < P.h; k += 9)
        (S(t, P, F, k, 2, "rgba(30,56,16,0.45)", 0.6),
          S(t, P, F, k + 4, 1.6, "rgba(190,220,120,0.3)", 0.6),
          S(s, P, F, k, 3.5, a(0.2), 0.6),
          S(s, P, F, k + 4.5, 3.5, a(0.82), 0.6));
    }),
    m(Ks.leaflet[0], 11, {
      base: "#3b6b2b",
      hi: "#5b8a38",
      lo: "#44742c",
      rib: "rgb(150,184,90)",
    }),
    m(Ks.leaflet[1], 12, {
      base: "#2f5c27",
      hi: "#4f7e34",
      lo: "#356428",
      rib: "rgb(132,170,84)",
    }),
    m(Ks.leaflet[2], 13, {
      base: "#3a6427",
      hi: "#5c8436",
      lo: "#6a7c30",
      rib: "rgb(150,176,84)",
      tip: 0.085,
      wash: ["#8a8a30", 0.12],
    }),
    m(Ks.leaflet[3], 14, {
      base: "#5d9238",
      hi: "#86b04a",
      lo: "#6aa03c",
      rib: "rgb(190,214,120)",
    }),
    x(Ks.sans[0], 21, {
      dark: "#274a2b",
      band: "128,156,124",
      margin: "#cdb957",
      mw: 0.2,
    }),
    x(Ks.sans[1], 22, {
      dark: "#2d5230",
      band: "146,170,136",
      margin: "#d6c66c",
      mw: 0.16,
    }),
    g(Ks.pampas[0], 41),
    g(Ks.pampas[1], 42),
    p(Ks.fig[0], 61, {
      base: "#2b4a1d",
      vein: "168,190,104",
      mott: "70,112,44",
      dark: "14,30,10",
      pet: "#75803e",
    }),
    p(Ks.fig[1], 62, {
      base: "#31531f",
      vein: "176,196,110",
      mott: "82,122,48",
      dark: "18,36,12",
      pet: "#75803e",
    }),
    p(Ks.fig[2], 63, {
      base: "#5c8f33",
      vein: "200,220,130",
      mott: "128,166,64",
      dark: "50,90,28",
      pet: "#93a850",
      rough: 0.28,
      soft: 0.8,
    }),
    p(Ks.fig[3], 64, {
      base: "#2f4c1c",
      vein: "170,186,100",
      mott: "96,116,44",
      dark: "16,30,10",
      pet: "#75803e",
      brown: 3,
    }),
    b(Ks.fan),
    v(Ks.mulch),
    y(Ks.pebble),
    M(Ks.moss));
  let E = t.getImageData(0, 0, la, gr).data,
    _ = e.getImageData(0, 0, la, gr).data,
    R = s.getImageData(0, 0, la, gr).data,
    C = n.getImageData(0, 0, la, gr).data,
    L = new Uint8Array(la * gr * 4),
    A = new Uint8Array(la * gr * 4),
    O = 2.6 / 255;
  for (let F = 0; F < gr; F++) {
    let P = F * la * 4,
      z = (gr - 1 - F) * la * 4,
      k = Math.max(0, F - 1) * la * 4,
      I = Math.min(gr - 1, F + 1) * la * 4;
    for (let G = 0; G < la; G++) {
      let K = G * 4,
        $ = Math.max(0, G - 1) * 4,
        n0 = Math.min(la - 1, G + 1) * 4;
      ((L[z + K] = E[P + K]),
        (L[z + K + 1] = E[P + K + 1]),
        (L[z + K + 2] = E[P + K + 2]),
        (L[z + K + 3] = _[P + K]));
      let e0 = (R[P + n0] - R[P + $]) * O,
        p0 = (R[I + K] - R[k + K]) * O,
        t0 = 1 / Math.hypot(e0, p0, 1);
      ((A[z + K] = (-e0 * t0 * 0.5 + 0.5) * 255),
        (A[z + K + 1] = (p0 * t0 * 0.5 + 0.5) * 255),
        (A[z + K + 2] = (t0 * 0.5 + 0.5) * 255),
        (A[z + K + 3] = C[P + K]));
    }
  }
  let H = (F, P) => {
    let z = new THREE.DataTexture(
      F,
      la,
      gr,
      THREE.RGBAFormat,
      THREE.UnsignedByteType,
    );
    return (
      P && (z.colorSpace = THREE.SRGBColorSpace),
      (z.generateMipmaps = !0),
      (z.minFilter = THREE.LinearMipmapLinearFilter),
      (z.magFilter = THREE.LinearFilter),
      (z.anisotropy = 8),
      (z.needsUpdate = !0),
      z
    );
  };
  return (
    uw && (window.__plantAtlas = o),
    {
      map: H(L, !0),
      normalMap: H(A, !1),
    }
  );
}
function hw(
  o,
  t,
  e,
  s,
  {
    segW: n = 2,
    bend: i = 0.5,
    bendPow: a = 1.6,
    cup: r = 0.2,
    cupPow: l = 1,
    belly: c = 0,
    twist: h = 0,
    side: f = 0,
    wave: u = 0,
    waveN: d = 3,
    wavePh: m = 0,
    edge: p = !1,
  } = {},
) {
  let x = [],
    g = [],
    b = [],
    v = n + 1,
    y = 0,
    M = 0,
    w = 0;
  return (
    s.forEach(([T, S], E) => {
      let _ = i * Math.pow(T, a);
      if (E) {
        let P = (T + w) / 2,
          z = i * Math.pow(P, a),
          k = (T - w) * t;
        ((y += Math.cos(z) * k), (M += Math.sin(z) * k));
      }
      w = T;
      let R = (S * e) / 2,
        C = h * T,
        L = Math.cos(C),
        A = Math.sin(C),
        O = -Math.sin(_),
        H = Math.cos(_),
        F = f * t * T * T;
      for (let P = 0; P <= n; P++) {
        let z = (P / n) * 2 - 1,
          k = Math.abs(z),
          I =
            r * R * Math.pow(k, l) -
            c * R * Math.sin(Math.PI * k) +
            u * R * k * Math.sin(T * d * Math.PI + m + (z > 0 ? 0 : 1.9)),
          G = p ? I : z * R * L - I * A,
          K = p ? z * R : z * R * A + I * L,
          $ = pw(o, T, z * S);
        (x.push(G + F, y + O * K, M + H * K), g.push($[0], $[1]));
      }
      if (E)
        for (let P = 0; P < n; P++) {
          let z = (E - 1) * v + P,
            k = E * v + P;
          b.push(z, z + 1, k, z + 1, k + 1, k);
        }
    }),
    mw(x, g, b)
  );
}
function mw(o, t, e) {
  let s = new THREE.BufferGeometry();
  return (
    s.setAttribute("position", new THREE.Float32BufferAttribute(o, 3)),
    s.setAttribute("uv", new THREE.Float32BufferAttribute(t, 2)),
    s.setIndex(e),
    s.computeVertexNormals(),
    s
  );
}
function fu(o, t, e, s = 5, { rep: n = 1, u0: i = 0, u1: a = 1 } = {}) {
  let r = t.length,
    l = [],
    c = [],
    h = [],
    f = [],
    u = [0];
  for (let g = 0; g < r; g++)
    f.push(
      t[Math.min(r - 1, g + 1)]
        .clone()
        .sub(t[Math.max(0, g - 1)])
        .normalize(),
    );
  for (let g = 1; g < r; g++) u.push(u[g - 1] + t[g].distanceTo(t[g - 1]));
  let d = Math.abs(f[0].y) < 0.9 ? De(0, 1, 0) : De(1, 0, 0),
    m = new THREE.Quaternion(),
    p = new THREE.Vector3(),
    x = d.addScaledVector(f[0], -d.dot(f[0])).normalize();
  for (let g = 0; g < r; g++) {
    (g &&
      (m.setFromUnitVectors(f[g - 1], f[g]),
      (x = x.clone().applyQuaternion(m).normalize())),
      p.crossVectors(f[g], x));
    let b = u[g] / u[r - 1],
      v = typeof e == "function" ? e(b) : e,
      y = (i + (a - i) * b) * n;
    ((y -= Math.floor(y / 2) * 2), y > 1 && (y = 2 - y));
    for (let M = 0; M < s; M++) {
      let w = (M / s) * TAU,
        T = Math.cos(w) * v,
        S = Math.sin(w) * v,
        E = pw(
          o,
          0.015 + 0.97 * y,
          (1 - Math.abs((2 * M) / s - 1)) * 1.84 - 0.92,
        );
      (l.push(
        t[g].x + x.x * T + p.x * S,
        t[g].y + x.y * T + p.y * S,
        t[g].z + x.z * T + p.z * S,
      ),
        c.push(E[0], E[1]));
    }
  }
  for (let g = 0; g < r - 1; g++)
    for (let b = 0; b < s; b++) {
      let v = g * s + b,
        y = g * s + ((b + 1) % s),
        M = v + s,
        w = y + s;
      h.push(v, M, y, y, M, w);
    }
  return mw(l, c, h);
}
function Xm(o, t, e = 8) {
  let s = [0, 0, 0],
    n = pw(o, 0.5, 0),
    i = [n[0], n[1]],
    a = [];
  for (let r = 0; r < e; r++) {
    let l = ((r + 0.5) / e) * TAU,
      c = pw(o, 0.5 + 0.5 * Math.cos(l), Math.sin(l));
    (s.push(Math.sin(l) * t, 0, Math.cos(l) * t),
      i.push(c[0], c[1]),
      a.push(0, 1 + r, 1 + ((r + 1) % e)));
  }
  return mw(s, i, a);
}
function n$(o, t, e = 0.012, s = 0.25) {
  let n = o.x + o.w / 2,
    i = o.y + o.h - o.pad,
    a = Math.min(o.h - 2 * o.pad, o.w / 2 - o.pad),
    r = [0, 0, 0],
    l = [n / la, 1 - i / gr],
    c = [],
    h = dw * 2,
    f = [0.34, 1];
  for (let u = 0; u <= h; u++) {
    let d = -zb + (2 * zb * u) / h,
      m = u % 2 === 1;
    for (let p of f) {
      let x = p === 1 ? (m ? 1 : ED + 0.04) : p * (m ? 1 : 0.9),
        g = x * t;
      (r.push(
        Math.sin(d) * g,
        Math.cos(d) * g,
        (m ? e : -e) * x + s * t * x * x,
      ),
        l.push(
          (n + Math.sin(d) * x * a) / la,
          1 - (i - Math.cos(d) * x * a) / gr,
        ));
    }
  }
  for (let u = 0; u < h; u++) {
    let d = 1 + u * 2,
      m = d + 2;
    c.push(0, m, d, d, m, d + 1, m, m + 1, d + 1);
  }
  return mw(r, l, c);
}
var H9 = (o) => {
  let t = new THREE.Box3(),
    e = new THREE.Vector3();
  for (let { geo: s, m: n } of o) {
    let i = s.attributes.position;
    for (let a = 0; a < i.count; a++)
      (e.fromBufferAttribute(i, a), n && e.applyMatrix4(n), t.expandByPoint(e));
  }
  return t;
};
var fw = (o, t = 20) => new THREE.CircleGeometry(o, t).rotateX(-Math.PI / 2);
function registerPlants({ M: o, def: t, lib: e }) {
  let s = () =>
    e("leaf", () => {
      let r = s$(),
        l = new THREE.MeshStandardMaterial({
          map: r.map,
          normalMap: r.normalMap,
          normalScale: new THREE.Vector2(1, 1),
          roughness: 1,
          metalness: 0,
          alphaTest: 0.5,
          side: THREE.DoubleSide,
        });
      return (
        (l.alphaToCoverage = !0),
        (l.onBeforeCompile = (c) => {
          c.fragmentShader = c.fragmentShader
            .replace(
              "#include <lights_physical_pars_fragment>",
              `#include <lights_physical_pars_fragment>
void RE_Direct_Leaf( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	float back = saturate( dot( -geometryNormal, directLight.direction ) );
	vec3 dc = material.diffuseColor;
	float green = saturate( ( dc.g - max( dc.r, dc.b ) ) / max( dc.g, 0.001 ) * 4.0 );
	vec3 tint = mix( vec3( 1.0, 0.82, 0.55 ), vec3( 0.95, 1.0, 0.3 ), green );
	reflectedLight.directDiffuse += back * directLight.color * dc * tint * ( 0.62 * RECIPROCAL_PI ) * step( 0.126, vMapUv.y );
}
#undef RE_Direct
#define RE_Direct RE_Direct_Leaf`,
            )
            .replace(
              "#include <map_fragment>",
              `#include <map_fragment>
	{
		vec2 ghT = vMapUv * vec2( ${la}.0, ${gr}.0 ), ghDx = dFdx( ghT ), ghDy = dFdy( ghT );
		diffuseColor.a *= 1.0 + max( 0.0, 0.5 * log2( max( dot( ghDx, ghDx ), dot( ghDy, ghDy ) ) ) ) * 0.3;
		if ( gl_FrontFacing && vMapUv.y > 0.126 ) diffuseColor.rgb = mix( diffuseColor.rgb, vec3( dot( diffuseColor.rgb, vec3( 0.3, 0.6, 0.1 ) ) ) * vec3( 1.05, 1.12, 0.9 ) + 0.012, 0.35 );
	}`,
            )
            .replace(
              "#include <roughnessmap_fragment>",
              `#include <roughnessmap_fragment>
	roughnessFactor *= texture2D( normalMap, vNormalMapUv ).a;`,
            );
        }),
        (l.customProgramCacheKey = () => "gh-leaf-atlas"),
        l
      );
    });
  function n(r, l) {
    let c = s(),
      h = createRandom(4107),
      f = [],
      u = (v, y) =>
        f.push({
          geo: v,
          m: y || null,
        }),
      d = [
        [0.06, 20, 0.3, 0.033, 5],
        [0.064, 150, 0.22, 0.029, 7],
        [0.06, 262, 0.15, 0.026, 9],
      ].map(([v, y, M, w, T]) => {
        let S = y * K2,
          E = De(Math.sin(S), 0, Math.cos(S)),
          _ = E.clone()
            .multiplyScalar(v)
            .setY(l - 0.025),
          R = qa
            .clone()
            .addScaledVector(E, Math.tan(T * K2))
            .normalize(),
          C = _.clone().addScaledVector(R, M + 0.025),
          L = [];
        for (let A = 0; A <= 5; A++) L.push(_.clone().lerp(C, A / 5));
        return (
          u(
            fu(
              Ks.trunk,
              L,
              (A) => w * (0.94 + 0.36 * Math.pow(1 - A, 2.5)),
              7,
              {
                u0: 0,
                u1: 0.4 + M,
              },
            ),
          ),
          {
            top: C,
            axis: R,
            r: w,
          }
        );
      }),
      m = [
        [0, 10, 1.9, 7, 80, 2.2, 0.5, 0.1],
        [0, 148, 1.98, 10, 94, 2, 0.48, 0.3],
        [0, 285, 1.9, 14, 106, 1.9, 0.47, 0.5],
        [0, 62, 1.78, 21, 118, 1.8, 0.45, 0.7],
        [1, 200, 1.84, 12, 98, 2, 0.48, 0.35],
        [1, 338, 1.76, 18, 112, 1.8, 0.46, 0.6],
        [1, 115, 1.6, 27, 126, 1.7, 0.44, 0.85],
        [2, 245, 1.7, 16, 106, 1.9, 0.47, 0.45],
        [2, 30, 1.56, 25, 122, 1.7, 0.45, 0.78],
        [2, 172, 1.4, 36, 138, 1.6, 0.42, 1],
      ],
      p = ([v, y, M, w, T, S, E, _], R) => {
        let C = d[v],
          L = y * K2,
          A = De(Math.sin(L), 0, Math.cos(L)),
          O = De(Math.cos(L), 0, -Math.sin(L)),
          H = C.top
            .clone()
            .addScaledVector(C.axis, -0.03 - Math.max(0, _) * 0.1)
            .addScaledVector(A, C.r * 0.5),
          F = 10,
          P = [H.clone()],
          z = H.clone(),
          k = h.range(-0.12, 0.12);
        for (let K = 1; K <= F; K++) {
          let $ = (K - 0.5) / F,
            n0 = (w + (T - w) * Math.pow($, S)) * K2;
          (z
            .addScaledVector(qa, (Math.cos(n0) * M) / F)
            .addScaledVector(A, (Math.sin(n0) * M) / F)
            .addScaledVector(O, (k * $ * M) / F),
            P.push(z.clone()));
        }
        u(
          fu(
            Ks.petiole,
            P,
            (K) =>
              0.003 +
              0.0056 * (1 - K) +
              0.012 * Math.pow(Math.max(0, 1 - K / 0.08), 2),
            4,
            {
              u0: R ? 0.3 : 0,
              u1: 1,
            },
          ),
        );
        let I = (K) => {
            let $ = K * F,
              n0 = Math.min(F - 1, Math.floor($));
            return [
              P[n0].clone().lerp(P[n0 + 1], $ - n0),
              P[n0 + 1].clone().sub(P[n0]).normalize(),
            ];
          },
          G = R ? 12 : Math.round(15 + (4 * (M - 1.4)) / 0.6);
        for (let K = 0; K < G; K++) {
          let $ = (K + 0.5) / G,
            [n0, e0] = I(E + (1 - E) * Math.pow($, 0.9) * 0.99),
            p0 = new THREE.Vector3().crossVectors(e0, O).normalize(),
            t0 = 0.5 + 0.5 * Math.sin(Math.PI * Math.pow($, 0.7)),
            M0 =
              (R ? 0.27 : 0.41 - 0.05 * _) *
              (M / 1.9) *
              t0 *
              (1 - 0.32 * $ * $ * $),
            f0 = (R ? lerp(24, 12, $) : lerp(64, 28, Math.pow($, 1.3))) * K2,
            _0 = (R ? 14 : lerp(18, 6, $)) * K2;
          for (let F0 of [-1, 1]) {
            let m0 = e0
                .clone()
                .multiplyScalar(Math.cos(f0))
                .addScaledVector(O, F0 * Math.sin(f0) * Math.cos(_0))
                .addScaledVector(p0, Math.sin(f0) * Math.sin(_0))
                .normalize(),
              S0 = R
                ? h.range(0.1, 0.3)
                : (0.95 + 0.4 * _) *
                  h.range(0.82, 1.18) *
                  clamp(1 + m0.y * 0.7, 0.3, 1.25),
              T0 = R
                ? 3
                : _ > 0.75
                  ? h() < 0.45
                    ? 2
                    : 1
                  : h() < 0.06
                    ? 2
                    : h() < 0.5
                      ? 0
                      : 1,
              j0 = hw(
                Ks.leaflet[T0],
                M0 * h.range(0.93, 1.05),
                0.048 * (0.72 + 0.28 * t0),
                K >= G - 5 ? Jj : Qj,
                {
                  segW: 2,
                  bend: S0,
                  bendPow: 1.5,
                  cup: R ? 0.7 : 0.42,
                  twist: F0 * h.range(-0.3, 0.12),
                },
              );
            u(
              j0,
              rc(
                n0.clone().addScaledVector(p0, 0.002),
                m0,
                De(0, -1, 0).addScaledVector(p0, -0.35),
              ),
            );
          }
        }
      };
    (m.forEach((v) => p(v, !1)), p([1, 60, 1.5, 3, 24, 1.5, 0.56, -0.2], !0));
    for (let [v, y, M, w] of [
      [0, 215, 1, 5],
      [2, 320, 0.62, 9],
    ]) {
      let T = d[v],
        S = y * K2,
        E = De(Math.sin(S), 0, Math.cos(S)),
        _ = [];
      for (let R = 0; R <= 6; R++) {
        let C = R / 6;
        _.push(
          T.top
            .clone()
            .addScaledVector(T.axis, -0.03)
            .addScaledVector(qa, M * C)
            .addScaledVector(E, Math.tan(w * K2) * M * C * (0.5 + 0.5 * C)),
        );
      }
      u(fu(Ks.spear, _, (R) => 0.0012 + 0.0075 * Math.pow(1 - R, 0.7), 5));
    }
    let x = H9(f),
      g = [
        2.44 / (x.max.x - x.min.x),
        (2.195 - l) / (x.max.y - l),
        2.54 / (x.max.z - x.min.z),
      ];
    uw &&
      console.log(
        "palm fit",
        g.map((v) => v.toFixed(3)).join(" "),
        "bbox",
        [x.min.x, x.max.x, x.min.z, x.max.z, x.max.y]
          .map((v) => v.toFixed(2))
          .join(" "),
      );
    let b = new THREE.Matrix4()
      .makeTranslation(0, l, 0)
      .multiply(new THREE.Matrix4().makeScale(g[0], g[1], g[2]))
      .multiply(new THREE.Matrix4().makeTranslation(0, -l, 0));
    for (let { geo: v, m: y } of f)
      r.addM(v, c, y ? b.clone().multiply(y) : b, !0);
    r.add(Xm(Ks.mulch, 0.1), c, [0, l + 0.004, 0], [0, 0.4, 0], null, !0);
    for (let v = 0; v < 6; v++) {
      let y = (v / 6) * TAU + 0.3;
      r.add(
        Xm(Ks.mulch, 0.098),
        c,
        [
          Math.sin(y) * 0.132,
          l + 0.001 + (v % 3) * 0.0025,
          Math.cos(y) * 0.132,
        ],
        [0, v * 1.9, 0],
        [1, 1, v % 2 ? -1 : 1],
        !0,
      );
    }
    for (let v = 0; v < 6; v++) {
      let y = ((v + 0.5) / 6) * TAU + 0.3;
      r.add(
        Xm(Ks.mulch, 0.05),
        c,
        [Math.sin(y) * 0.183, l + 0.006, Math.cos(y) * 0.183],
        [0, v * 2.7, 0],
        null,
        !0,
      );
    }
  }
  function i(r, l) {
    let c = s(),
      h = createRandom(2311),
      f = [],
      u = (y, M) =>
        f.push({
          geo: y,
          m: M || null,
        }),
      d = ra(
        [
          [0, l - 0.03, 0],
          [0.003, l + 0.06, 0.002],
          [0.02, 0.68, 0.014],
          [0.024, 0.92, -0.006],
          [0.004, 1.1, -0.016],
          [0, 1.2, -0.008],
        ],
        15,
      ),
      m = (y) => 0.0165 + 0.0065 * (1 - y) + 0.02 * Math.exp(-y * 34);
    u(
      fu(Ks.bark, d, m, 8, {
        rep: 2,
      }),
    );
    for (let y = 0; y < 5; y++) {
      let M = y * 1.26 + 0.5 + h.range(-0.2, 0.2),
        w = De(Math.sin(M), 0, Math.cos(M)),
        T = h.range(0.07, 0.11),
        S = ra(
          [
            De(0, l + 0.035, 0).addScaledVector(w, 0.012),
            De(0, l + 0.014, 0).addScaledVector(w, T * 0.5),
            De(0, l - 0.012, 0).addScaledVector(w, T),
          ],
          4,
        );
      u(
        fu(Ks.bark, S, (E) => lerp(0.014, 0.005, E), 5, {
          u0: 0.1,
          u1: 0.3,
        }),
      );
    }
    [
      [1, 40, 0.035, 0.4, 13],
      [0.9, 35, 0.25, 0.3, 10],
      [0.84, 160, 0.27, 0.25, 10],
      [0.95, 275, 0.23, 0.33, 10],
    ].forEach(([y, M, w, T, S], E) => {
      let _ = M * K2,
        R = De(Math.sin(_), 0, Math.cos(_)),
        C = d[Math.round(y * 15)].clone(),
        L =
          E === 0
            ? ra(
                [
                  C,
                  C.clone()
                    .addScaledVector(qa, T * 0.5)
                    .addScaledVector(R, w),
                  C.clone().addScaledVector(qa, T),
                ],
                7,
              )
            : ra(
                [
                  C,
                  C.clone()
                    .addScaledVector(R, w * 0.62)
                    .addScaledVector(qa, T * 0.3),
                  C.clone().addScaledVector(R, w).addScaledVector(qa, T),
                ],
                7,
              ),
        A = (P) => lerp(E === 0 ? 0.0155 : 0.0125, 0.0065, P);
      u(
        fu(Ks.twig, L, A, 6, {
          u0: E === 0 ? 0.25 : 0.1,
          u1: 1,
        }),
      );
      let O = (P) => {
        let z = P * 7,
          k = Math.min(6, Math.floor(z));
        return [
          L[k].clone().lerp(L[k + 1], z - k),
          L[k + 1].clone().sub(L[k]).normalize(),
        ];
      };
      for (let P = 0; P < S; P++) {
        let z = P / (S - 1),
          k = 0.16 + 0.84 * Math.pow(z, 0.85),
          [I, G] = O(k),
          K = P >= S - 1,
          $ = E > 0 && P < 2,
          n0 = new THREE.Vector3()
            .crossVectors(G, Math.abs(G.y) < 0.95 ? qa : De(1, 0, 0))
            .normalize(),
          e0 = new THREE.Vector3().crossVectors(G, n0),
          p0 = P * 2.39996 + E * 1.7,
          t0 = n0
            .multiplyScalar(Math.cos(p0))
            .addScaledVector(e0, Math.sin(p0)),
          M0 =
            (K
              ? 10
              : $
                ? h.range(108, 128)
                : lerp(92, 34, Math.pow(z, 0.8)) + h.range(-8, 8)) * K2,
          f0 = G.clone()
            .multiplyScalar(Math.cos(M0))
            .addScaledVector(t0, Math.sin(M0));
        ((f0.y -= 0.22 * (1 - z) * (K ? 0 : 1)), f0.normalize());
        let _0 = K
            ? h.range(0.16, 0.2)
            : lerp(0.37, 0.27, z) * h.range(0.88, 1.1),
          F0 =
            K || (P === S - 2 && h() < 0.7)
              ? 2
              : h() < 0.34 - 0.3 * z
                ? 3
                : h() < 0.5
                  ? 0
                  : 1,
          m0 = hw(Ks.fig[F0], _0, _0 * (320 / 448), Zj, {
            segW: 4,
            bend: K ? 0.1 : h.range(0.25, 0.5) + 0.35 * (1 - z),
            bendPow: 1.5,
            cup: K ? -0.7 : -h.range(0.16, 0.3),
            belly: 0.07,
            twist: h.range(-0.22, 0.22),
            wave: K ? 0.04 : h.range(0.08, 0.15),
            waveN: 4.5,
            wavePh: h() * 6,
          });
        u(
          m0,
          rc(
            I.clone().addScaledVector(t0, A(k) * 0.8),
            f0,
            G.clone().multiplyScalar(-1).addScaledVector(qa, -0.15),
          ),
        );
      }
      let [H, F] = O(1);
      u(
        fu(
          Ks.branch,
          [
            H.clone(),
            H.clone().addScaledVector(F, 0.022),
            H.clone().addScaledVector(F, 0.05),
          ],
          (P) => 0.0062 * (1 - P) + 6e-4,
          4,
          {
            u0: 0.2,
            u1: 0.5,
          },
        ),
      );
    });
    let x = f.slice(6),
      g = H9(x),
      b = Math.min(
        0.86 / (g.max.x - g.min.x),
        0.86 / (g.max.z - g.min.z),
        1.15,
      );
    uw &&
      console.log(
        "fig fit",
        b.toFixed(3),
        ((1.845 - l) / (g.max.y - l)).toFixed(3),
        "bbox",
        [g.min.x, g.max.x, g.min.z, g.max.z, g.max.y]
          .map((y) => y.toFixed(2))
          .join(" "),
      );
    let v = new THREE.Matrix4()
      .makeTranslation(0, l, 0)
      .multiply(
        new THREE.Matrix4().makeScale(b, (1.845 - l) / (g.max.y - l), b),
      )
      .multiply(new THREE.Matrix4().makeTranslation(0, -l, 0));
    for (let { geo: y, m: M } of f)
      r.addM(y, c, M ? v.clone().multiply(M) : v, !0);
    for (let [y, M, w, T] of [
      [0.09, 0.05, 0.085, 0.3],
      [-0.08, 0.08, 0.075, 2.1],
      [-0.07, -0.09, 0.09, 4],
      [0.1, -0.08, 0.07, 5.2],
      [0, 0.13, 0.055, 1.2],
      [-0.135, -0.01, 0.05, 3.3],
    ])
      r.add(
        Xm(Ks.moss, w),
        c,
        [y, l + 0.004 + w * 0.03, M],
        [0, T, 0],
        null,
        !0,
      );
  }
  function a(r, l) {
    let c = s(),
      h = createRandom(913),
      f = [];
    [
      [-0.288, 0.006, 9],
      [0.022, -0.016, 8],
      [0.292, 0.01, 9],
    ].forEach(([m, p, x], g) => {
      for (let b = 0; b < x; b++) {
        let v = b / (x - 1),
          y = b * 2.39996 + g * 1.9,
          M = De(Math.sin(y), 0, Math.cos(y) * 0.7).normalize(),
          w = lerp(0.095, 0.014, Math.pow(v, 0.8)) * h.range(0.85, 1.15),
          T = b === x - 1,
          S = De(m + M.x * w, l - 0.012, p + M.z * w * 0.62),
          E =
            lerp(0.26, 0.03, v) *
            h.range(0.6, 1.2) *
            (Math.abs(M.z) > 0.6 ? 0.55 : 1),
          _ = T
            ? h.range(0.3, 0.42)
            : lerp(0.5, 0.96, Math.pow(v, 0.6)) * h.range(0.86, 1.04),
          R = (T ? 0.05 : lerp(0.088, 0.07, v) * h.range(0.92, 1.08)) / 0.9,
          C = hw(Ks.sans[(b + g) % 2], _, R, t$, {
            segW: 4,
            bend: h.range(0.04, 0.22),
            bendPow: 1.4,
            cup: T ? -1.1 : -h.range(0.35, 0.6),
            cupPow: 2,
            twist: h.sign() * h.range(0.35, 1.25),
            side: h.range(-0.035, 0.035),
          });
        f.push({
          geo: C,
          m: rc(S, qa.clone().addScaledVector(M, Math.tan(E)), M),
        });
      }
    });
    let u = H9(f);
    uw &&
      console.log(
        "snake fit",
        ((1.395 - l) / (u.max.y - l)).toFixed(3),
        "bbox",
        [u.min.x, u.max.x, u.min.z, u.max.z, u.max.y]
          .map((m) => m.toFixed(2))
          .join(" "),
      );
    let d = new THREE.Matrix4()
      .makeTranslation(0, l, 0)
      .multiply(
        new THREE.Matrix4().makeScale(1, (1.395 - l) / (u.max.y - l), 1),
      )
      .multiply(new THREE.Matrix4().makeTranslation(0, -l, 0));
    for (let { geo: m, m: p } of f) r.addM(m, c, d.clone().multiply(p), !0);
  }
  (t(
    "planter",
    (r) => (r.variant | 0) % 3,
    (r, l) => {
      let c = (l.variant | 0) % 3;
      if (c === 0)
        return (
          r.add(
            pe(
              ke(
                [
                  [0.16, 0],
                  [0.172, 0.004],
                  [0.172, 0.02],
                  [0.18, 0.03],
                  [0.212, 0.19],
                  [0.238, 0.35],
                  [0.258, 0.49],
                  [0.27, 0.503],
                  [0.2725, 0.518],
                  [0.266, 0.531],
                  [0.25, 0.535],
                  [0.24, 0.528],
                  [0.235, 0.47],
                ],
                28,
              ),
              40,
            ),
            o.ceramicBlack,
          ),
          r.add(
            pe(
              ke(
                [
                  [0.2, 0],
                  [0.216, 0.007],
                  [0.222, 0.026],
                  [0.214, 0.0275],
                  [0.206, 0.011],
                  [0.17, 0.011],
                ],
                28,
              ),
              40,
            ),
            o.ceramicBlack,
          ),
          r.add(fw(0.237), o.soil, [0, 0.482, 0]),
          n(r, 0.485),
          rs("planter", [2.5, 2.2, 2.6], {
            surf: "ceramic",
            mass: 45,
            colliders: [$s(-0.26, 0, -0.26, 0.26, 0.56, 0.26)],
          })
        );
      if (c === 1)
        return (
          r.add(
            pe(
              ke(
                [
                  [0.162, 0],
                  [0.168, 0.004],
                  [0.168, 0.014],
                  [0.19, 0.022],
                  [0.208, 0.04],
                  [0.215, 0.07],
                  [0.215, 0.392],
                  [0.214, 0.404],
                  [0.208, 0.412],
                  [0.199, 0.409],
                  [0.195, 0.398],
                  [0.195, 0.36],
                ],
                28,
              ),
              40,
            ),
            o.ceramicWhite,
          ),
          r.add(
            pe(
              ke(
                [
                  [0.205, 0],
                  [0.229, 0.006],
                  [0.236, 0.026],
                  [0.2335, 0.031],
                  [0.228, 0.031],
                  [0.2225, 0.014],
                  [0.19, 0.012],
                ],
                28,
              ),
              40,
            ),
            o.ceramicWhite,
          ),
          r.add(fw(0.196), o.soil, [0, 0.373, 0]),
          i(r, 0.375),
          rs("planter", [0.9, 1.85, 0.9], {
            surf: "ceramic",
            mass: 30,
            colliders: [$s(-0.22, 0, -0.22, 0.22, 0.45, 0.22)],
          })
        );
      (r.add(
        _i(
          [
            [0.002, 0],
            [0, 0.002],
            [0, 0.027],
            [0.003, 0.03],
          ],
          di(0.86, 0.26, 0.008, 0, 3),
          {
            profClosed: !1,
          },
        ),
        o.brass,
      ),
        r.add(
          _i(
            [
              [0.02, 0.03],
              [0.004, 0.03],
              [0, 0.034],
              [0, 0.445],
              [0.004, 0.45],
              [0.013, 0.45],
              [0.016, 0.447],
              [0.016, 0.43],
            ],
            di(0.9, 0.3, 0.022, 0, 4),
            {
              profClosed: !1,
            },
          ),
          o.ceramicBlack,
        ),
        r.add(
          _i(
            [
              [8e-4, 0.396],
              [-0.0012, 0.3975],
              [-0.0012, 0.4045],
              [8e-4, 0.406],
            ],
            di(0.9, 0.3, 0.022, 0, 4),
            {
              profClosed: !1,
            },
          ),
          o.brass,
        ),
        r.add(
          new THREE.PlaneGeometry(0.87, 0.27).rotateX(-Math.PI / 2),
          o.soil,
          [0, 0.444, 0],
        ));
      let h = s(),
        f = createRandom(5);
      for (let u = 0; u < 9; u++)
        r.add(
          Xm(Ks.pebble, 0.125),
          h,
          [
            (u - 4) * 0.076 + f.range(-0.01, 0.01),
            0.4465 + (u % 3) * 0.0022,
            f.range(-0.006, 0.006),
          ],
          [0, f() * TAU, 0],
          [1, 1, u % 2 ? -1 : 1],
          !0,
        );
      for (let u of [-1, 1])
        for (let d of [-1, 1])
          r.add(
            Xm(Ks.pebble, 0.062),
            h,
            [u * 0.366, 0.4475, d * 0.068],
            [0, f() * TAU, 0],
            null,
            !0,
          );
      return (
        a(r, 0.447),
        rs("planter", [0.9, 1.4, 0.36], {
          surf: "ceramic",
          mass: 40,
          colliders: [$s(-0.45, 0, -0.15, 0.45, 0.5, 0.15)],
        })
      );
    },
  ),
    t(
      "vase",
      (r) => (r.variant | 0) % 3,
      (r, l) => {
        let c = (l.variant | 0) % 3,
          h = {
            surf: "ceramic",
            dynamic: !0,
            mass: 3,
            breakable: "ceramic",
          };
        if (c === 0)
          return (
            r.add(
              pe(
                ke(
                  [
                    [0, 0],
                    [0.069, 0],
                    [0.072, 0.003],
                    [0.072, 0.011],
                    [0.066, 0.017],
                    [0.058, 0.024],
                    [0.064, 0.05],
                    [0.086, 0.095],
                    [0.112, 0.15],
                    [0.13, 0.205],
                    [0.135, 0.25],
                    [0.129, 0.3],
                    [0.11, 0.35],
                    [0.082, 0.395],
                    [0.058, 0.43],
                    [0.0465, 0.455],
                    [0.0445, 0.472],
                    [0.05, 0.488],
                    [0.059, 0.498],
                    [0.0575, 0.5],
                    [0.0525, 0.4985],
                    [0.046, 0.488],
                    [0.04, 0.47],
                    [0.041, 0.452],
                    [0.045, 0.44],
                  ],
                  24,
                ),
                40,
              ),
              o.ceramicWhite,
            ),
            r.add(fw(0.047, 12), o.rubber, [0, 0.44, 0]),
            rs("vase", [0.27, 0.5, 0.27], h)
          );
        if (c === 1)
          return (
            r.add(
              pe(
                ke(
                  [
                    [0, 0],
                    [0.06, 0],
                    [0.064, 0.004],
                    [0.062, 0.012],
                    [0.086, 0.036],
                    [0.118, 0.074],
                    [0.14, 0.115],
                    [0.15, 0.16],
                    [0.146, 0.205],
                    [0.128, 0.245],
                    [0.1, 0.273],
                    [0.074, 0.289],
                    [0.069, 0.296],
                    [0.069, 0.311],
                    [0.0735, 0.317],
                    [0.071, 0.32],
                    [0.063, 0.317],
                    [0.059, 0.302],
                    [0.063, 0.28],
                  ],
                  24,
                ),
                40,
              ),
              o.ceramicBlack,
            ),
            r.add(
              pe(
                ke(
                  [
                    [0.0685, 0.292],
                    [0.0765, 0.2935],
                    [0.078, 0.297],
                    [0.0755, 0.3025],
                    [0.078, 0.308],
                    [0.0745, 0.3125],
                    [0.0685, 0.3125],
                  ],
                  24,
                ),
                36,
              ),
              o.brass,
            ),
            r.add(fw(0.066, 12), o.rubber, [0, 0.28, 0]),
            rs("vase", [0.3, 0.32, 0.3], h)
          );
        r.add(
          pe(
            ke(
              [
                [0, 0],
                [0.074, 0],
                [0.08, 0.004],
                [0.08, 0.014],
                [0.076, 0.02],
                [0.086, 0.06],
                [0.094, 0.13],
                [0.096, 0.2],
                [0.091, 0.28],
                [0.079, 0.36],
                [0.064, 0.44],
                [0.05, 0.51],
                [0.041, 0.57],
                [0.0375, 0.62],
                [0.0385, 0.66],
                [0.0445, 0.685],
                [0.051, 0.697],
                [0.0495, 0.7],
                [0.044, 0.699],
                [0.038, 0.688],
                [0.032, 0.66],
                [0.032, 0.62],
              ],
              20,
            ),
            40,
          ),
          o.terracotta,
        );
        let f = s(),
          u = createRandom(5);
        r.add(Xm(Ks.dark, 0.034, 10), f, [0, 0.62, 0], null, null, !0);
        let d = (m, p, x, g, b, v, y = 3, M = 8) => {
          let w = ra([De(p, 0.6, x), ...g.map((T) => De(T[0], T[1], T[2]))], M);
          return (
            r.addM(
              fu(m, w, (T) => lerp(b, v, T), y, {
                rep: 2,
              }),
              f,
              null,
              !0,
            ),
            w
          );
        };
        for (let [m, p, x, g, b, v, y] of [
          [-0.004, -0.008, -0.03, -0.035, 0.86, 0.44, 0],
          [0.012, 0.004, 0.1, 0.02, 0.8, 0.4, 1],
          [-0.012, 0.008, -0.12, 0.04, 0.74, 0.36, 0],
        ]) {
          let M = d(
              Ks.straw,
              m,
              p,
              [
                [m + x * 0.25, 0.72, p + g * 0.25],
                [x * 0.75, b, g * 0.75],
                [x * 0.82, b + 0.03, g * 0.82],
              ],
              0.0034,
              0.0024,
              4,
              5,
            ),
            w = M[M.length - 2],
            T = M[M.length - 1]
              .clone()
              .sub(M[M.length - 3])
              .normalize(),
            S = De(x, -0.05, g).normalize();
          for (let E = 0; E < 2; E++)
            r.addM(
              hw(Ks.pampas[(y + E) % 2], v, 0.125, e$, {
                segW: 2,
                bend: 0.55 + y * 0.12,
                bendPow: 1.7,
                cup: E ? 0.12 : 0.22,
                edge: E === 1,
              }),
              f,
              rc(w, T, S),
              !0,
            );
        }
        for (let [m, p, x, g, b, v, y] of [
          [0.016, -0.004, 0.13, 0.84, 0.07, 0.115, 0.5],
          [-0.016, -0.002, -0.125, 0.78, -0.06, 0.1, -0.7],
        ]) {
          let M = d(
              Ks.straw,
              m,
              p,
              [
                [m + x * 0.2, 0.7, p + b * 0.2],
                [x * 0.8, g - 0.06, b * 0.8],
                [x, g, b],
              ],
              0.003,
              0.002,
              3,
              5,
            ),
            w = M[M.length - 1]
              .clone()
              .sub(M[M.length - 2])
              .normalize()
              .lerp(qa, 0.35)
              .normalize();
          r.addM(
            n$(Ks.fan, v, 0.008, 0.22),
            f,
            rc(M[M.length - 1], w, De(Math.sin(y), -0.2, Math.cos(y))),
            !0,
          );
        }
        for (let [m, p, x] of [
          [
            0.006,
            0.012,
            [
              [0.03, 0.76, 0.03],
              [0.1, 0.9, 0.01],
              [0.13, 1.03, -0.05],
              [0.19, 1.14, -0.03],
            ],
          ],
          [
            -0.008,
            -0.012,
            [
              [-0.03, 0.78, -0.03],
              [-0.06, 0.94, -0.07],
              [-0.14, 1.02, -0.04],
              [-0.19, 1.07, -0.09],
            ],
          ],
          [
            0.002,
            -0.014,
            [
              [0.02, 0.8, -0.04],
              [0, 0.98, -0.09],
              [0.05, 1.12, -0.08],
              [0.04, 1.27, -0.11],
            ],
          ],
          [
            -0.01,
            0.01,
            [
              [-0.04, 0.74, 0.04],
              [-0.05, 0.86, 0.09],
              [-0.1, 0.95, 0.1],
              [-0.09, 1.04, 0.13],
            ],
          ],
        ]) {
          let g = d(Ks.branch, m, p, x, 0.0042, 0.0012, 3, 9);
          for (let [b, v] of [
            [4, 1],
            [6, -1],
          ]) {
            let y = g[b],
              M = g[b + 1]
                .clone()
                .sub(g[b - 1])
                .normalize(),
              w = new THREE.Vector3()
                .crossVectors(M, De(0.3, 0.2, 1))
                .normalize()
                .multiplyScalar(v),
              T = u.range(0.1, 0.17),
              S = ra(
                [
                  y,
                  y
                    .clone()
                    .addScaledVector(M, T * 0.4)
                    .addScaledVector(w, T * 0.35),
                  y
                    .clone()
                    .addScaledVector(M, T * 0.75)
                    .addScaledVector(w, T * 0.5)
                    .addScaledVector(qa, T * 0.25),
                ],
                4,
              );
            r.addM(
              fu(Ks.branch, S, (E) => lerp(0.0022, 8e-4, E), 3, {
                u0: 0.3,
                u1: 0.8,
              }),
              f,
              null,
              !0,
            );
          }
        }
        return rs("vase", [0.45, 1.3, 0.3], {
          ...h,
          mass: 4,
        });
      },
    ));
}

export { registerPlants };

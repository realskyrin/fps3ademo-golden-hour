// scene/dress/lobby.js: recovered from the verified GOLDEN HOUR release.
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  CylinderGeometry,
  DoubleSide,
  Euler,
  ExtrudeGeometry,
  LatheGeometry,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Shape,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { Js, Qt, Ye } from "../hotel.js";

var Hl = Math.PI;
var Y9 = new Vector3(0, 1, 0);
function dressLobby(o, t) {
  let { world: e, fx: s, M: n, K: i } = o,
    { deco: a } = t.helpers,
    r = new MeshStandardMaterial({
      color: 659475,
      roughness: 0.04,
      metalness: 0,
      transparent: !0,
      opacity: 0.34,
      depthWrite: !1,
      envMapIntensity: 2.6,
      side: DoubleSide,
    }),
    l = new MeshStandardMaterial({
      color: 7614490,
      roughness: 0.93,
      metalness: 0,
    }),
    c = new MeshStandardMaterial({
      color: 10687503,
      roughness: 0.42,
      metalness: 0.1,
    });
  (e.surfOf.set(l, "fabric"), e.surfOf.set(c, "metal"));
  let h = new Set([
      n.ceiling,
      n.woodDark,
      n.ledStrip,
      n.bulbWarm,
      n.bulbCool,
      r,
    ]),
    f = e.addGeometry.bind(e),
    u = e.box.bind(e);
  ((e.addGeometry = (c0, Z, r0, b0, d0) => f(c0, Z, r0, !h.has(Z), d0)),
    (e.box = (c0, Z, r0, b0, d0, V, B, j = {}) =>
      u(c0, Z, r0, b0, d0, V, B, {
        ...j,
        shadow: !h.has(B),
      })));
  let d = () => {
      let c0 = 0;
      for (let Z of e.batches.values()) c0 += Z.pos.length;
      return c0 / 9;
    },
    m = d(),
    p = new Matrix4();
  function x(c0, Z, r0, b0) {
    let d0 = c0 / 2,
      V = Z / 2,
      B = r0 / 2;
    b0 = Math.max(5e-4, Math.min(b0, d0 * 0.49, V * 0.49, B * 0.49));
    let j = (N, q, o0, h0) =>
        h0 === 0
          ? [N * d0, q * (V - b0), o0 * (B - b0)]
          : h0 === 1
            ? [N * (d0 - b0), q * V, o0 * (B - b0)]
            : [N * (d0 - b0), q * (V - b0), o0 * B],
      s0 = [],
      l0 = (N, q, o0, h0) => {
        s0.push(N, q, o0, N, o0, h0);
      };
    for (let N of [-1, 1])
      (l0(j(N, -1, -1, 0), j(N, 1, -1, 0), j(N, 1, 1, 0), j(N, -1, 1, 0)),
        l0(j(-1, N, -1, 1), j(1, N, -1, 1), j(1, N, 1, 1), j(-1, N, 1, 1)),
        l0(j(-1, -1, N, 2), j(1, -1, N, 2), j(1, 1, N, 2), j(-1, 1, N, 2)));
    for (let N of [-1, 1])
      for (let q of [-1, 1])
        (l0(j(N, q, -1, 0), j(N, q, 1, 0), j(N, q, 1, 1), j(N, q, -1, 1)),
          l0(j(N, -1, q, 0), j(N, 1, q, 0), j(N, 1, q, 2), j(N, -1, q, 2)),
          l0(j(-1, N, q, 1), j(1, N, q, 1), j(1, N, q, 2), j(-1, N, q, 2)));
    for (let N of [-1, 1])
      for (let q of [-1, 1])
        for (let o0 of [-1, 1])
          s0.push(j(N, q, o0, 0), j(N, q, o0, 1), j(N, q, o0, 2));
    let E0 = new Float32Array(s0.length * 3),
      U = new Float32Array(s0.length * 3);
    for (let N = 0; N < s0.length; N += 3) {
      let q = s0[N],
        o0 = s0[N + 1],
        h0 = s0[N + 2],
        y0 = o0[0] - q[0],
        D = o0[1] - q[1],
        W = o0[2] - q[2],
        Y = h0[0] - q[0],
        R0 = h0[1] - q[1],
        U0 = h0[2] - q[2],
        $0 = D * U0 - W * R0,
        g0 = W * Y - y0 * U0,
        G0 = y0 * R0 - D * Y,
        K0 = q[0] + o0[0] + h0[0],
        it = q[1] + o0[1] + h0[1],
        ft = q[2] + o0[2] + h0[2];
      if ($0 * K0 + g0 * it + G0 * ft < 0) {
        let rt = o0;
        ((o0 = h0), (h0 = rt), ($0 = -$0), (g0 = -g0), (G0 = -G0));
      }
      let gt = Math.hypot($0, g0, G0) || 1;
      (($0 /= gt),
        (g0 /= gt),
        (G0 /= gt),
        E0.set(q, N * 3),
        E0.set(o0, N * 3 + 3),
        E0.set(h0, N * 3 + 6));
      for (let rt = 0; rt < 3; rt++)
        ((U[(N + rt) * 3] = $0),
          (U[(N + rt) * 3 + 1] = g0),
          (U[(N + rt) * 3 + 2] = G0));
    }
    let X = new BufferGeometry();
    return (
      X.setAttribute("position", new BufferAttribute(E0, 3)),
      X.setAttribute("normal", new BufferAttribute(U, 3)),
      X
    );
  }
  function g(c0, Z, r0, b0, d0, V, B, j = 0.006, s0 = {}) {
    (c0 > b0 && ([c0, b0] = [b0, c0]),
      Z > d0 && ([Z, d0] = [d0, Z]),
      r0 > V && ([r0, V] = [V, r0]),
      i.add(x(b0 - c0, d0 - Z, V - r0, j), B, {
        matrix: p.makeTranslation((c0 + b0) / 2, (Z + d0) / 2, (r0 + V) / 2),
        shadow: s0.shadow,
      }));
  }
  let b = (c0, Z, r0, b0, d0, V, B, j) => a(c0, Z, r0, b0, d0, V, B, j);
  function v(c0, Z, r0, b0, d0, V, B, j, s0, l0, E0 = "c", U = 0.005, X) {
    let N = Z + r0 * j,
      q = Z + r0 * s0,
      o0 = c0 === "x" ? Math.min(N, q) : b0,
      h0 = c0 === "x" ? Math.max(N, q) : d0,
      y0 = c0 === "x" ? b0 : Math.min(N, q),
      D = c0 === "x" ? d0 : Math.max(N, q);
    E0 === "b"
      ? b(o0, V, y0, h0, B, D, l0, X)
      : E0 === "r"
        ? i.bbox(o0, V, y0, h0, B, D, l0, {
            r: U,
            seg: 1,
            ...(X || {}),
          })
        : g(o0, V, y0, h0, B, D, l0, U, X || {});
  }
  let y = (c0, Z, r0, b0, d0, V) =>
      c0 === "x" ? [Z + r0 * V, d0, b0] : [b0, d0, Z + r0 * V],
    M = (c0, Z) => (c0 === "x" ? new Vector3(Z, 0, 0) : new Vector3(0, 0, Z));
  function w(c0, Z, r0, b0, d0, V = {}) {
    r0 > b0 && ([r0, b0] = [b0, r0]);
    let B = new Shape(
        Z.map(
          ([l0, E0]) =>
            new Vector2(
              c0 === "z" ? l0 : c0 === "x" ? -l0 : l0,
              c0 === "y" ? -E0 : E0,
            ),
        ),
      ),
      j = new ExtrudeGeometry(B, {
        depth: b0 - r0,
        bevelEnabled: !1,
        steps: 1,
      }),
      s0 = new Matrix4();
    (c0 === "z"
      ? s0.makeTranslation(0, 0, r0)
      : c0 === "x"
        ? s0.makeRotationY(Hl / 2).setPosition(r0, 0, 0)
        : s0.makeRotationX(-Hl / 2).setPosition(0, r0, 0),
      i.add(j, d0, {
        matrix: s0,
        shadow: V.shadow,
      }));
  }
  function T(c0, Z, r0, b0 = 0) {
    let d0 = r0
        .map(([j, s0]) => [j - b0, s0 + b0])
        .sort((j, s0) => j[0] - s0[0]),
      V = [],
      B = c0;
    for (let [j, s0] of d0)
      if (
        (j > B + 0.001 && V.push([B, Math.min(j, Z)]),
        (B = Math.max(B, s0)),
        B >= Z)
      )
        break;
    return (
      B < Z - 0.001 && V.push([B, Z]),
      V.filter(([j, s0]) => s0 - j > 0.02)
    );
  }
  function S(c0, Z) {
    let r0 = [];
    for (let b0 of t.walls)
      if (b0.axis === c0 && Math.abs(b0.pos - Z) < 0.02)
        for (let d0 of b0.openings)
          (d0.y0 ?? b0.y0) <= b0.y0 + 0.01 &&
            r0.push([d0.a0, d0.a1, d0.y1 ?? b0.y1]);
    return r0;
  }
  function E(c0, Z, r0, b0 = {}) {
    let d0 = b0.r ?? 0.05;
    (i.cyl(c0, Z - 0.012, r0, d0 + 0.014, 0.012, b0.trim || n.blackMetal, {
      seg: 12,
      shadow: !1,
    }),
      i.disc(c0, Z - 0.0128, r0, d0, b0.cool ? n.bulbCool : n.bulbWarm, {
        seg: 12,
      }),
      b0.glow &&
        s.addGlow(
          new Vector3(c0, b0.floor ?? 0, r0),
          Y9,
          b0.size ?? 2.2,
          b0.size ?? 2.2,
          b0.cool ? 13625087 : 16757866,
          b0.glow,
        ));
  }
  function _(c0, Z, r0) {
    (i.cyl(c0, Z - 0.018, r0, 0.011, 0.018, n.chrome, {
      seg: 6,
      shadow: !1,
    }),
      i.cyl(c0, Z - 0.03, r0, 0.022, 0.004, n.chrome, {
        seg: 8,
        shadow: !1,
      }),
      i.cyl(c0, Z - 0.006, r0, 0.03, 0.006, n.plasticWhite, {
        seg: 10,
        shadow: !1,
      }));
  }
  function R(c0, Z, r0) {
    (i.cyl(c0, Z - 0.012, r0, 0.062, 0.012, n.plasticWhite, {
      seg: 14,
      shadow: !1,
    }),
      i.cyl(c0, Z - 0.034, r0, 0.046, 0.022, n.plasticWhite, {
        seg: 14,
        r2: 0.058,
        shadow: !1,
      }),
      b(
        c0 + 0.02,
        Z - 0.036,
        r0 - 0.004,
        c0 + 0.028,
        Z - 0.034,
        r0 + 0.004,
        n.ledStrip,
        {
          shadow: !1,
        },
      ));
  }
  function C(c0) {
    let {
        ax: Z,
        sign: r0,
        start: b0,
        s0: d0,
        s1: V,
        y0: B,
        y1: j,
        n: s0,
        rise: l0,
        tread: E0,
        mat: U,
        led: X,
      } = c0,
      N = Z === "x",
      q = 0.045,
      o0 = 0.034,
      h0 = q / 2,
      y0 = N ? n.exterior : n.marbleDark,
      D = N ? n.blackMetal : n.brass,
      W = N ? n.steel : n.brass,
      Y = b0 + r0 * E0 * s0,
      R0 = (G0) => B + l0 * (((G0 - b0) * r0) / E0 + 1),
      U0 = (G0, K0, it, ft, gt, rt, dt, tt = "b", X0 = 0.004, ut) => {
        let z0 = Math.min(G0, K0),
          I0 = Math.max(G0, K0),
          vt = Math.min(it, ft),
          wt = Math.max(it, ft);
        N
          ? tt === "b"
            ? b(z0, gt, vt, I0, rt, wt, dt, ut)
            : g(z0, gt, vt, I0, rt, wt, dt, X0, ut || {})
          : tt === "b"
            ? b(vt, gt, z0, wt, rt, I0, dt, ut)
            : g(vt, gt, z0, wt, rt, I0, dt, X0, ut || {});
      },
      $0 = (G0, K0, it) => (N ? [G0, it, K0] : [K0, it, G0]),
      g0 = [
        [0, l0 - q],
        [E0 + o0 - h0, l0 - q],
      ];
    for (let G0 = 1; G0 < 5; G0++) {
      let K0 = -Hl / 2 + (G0 / 5) * Hl;
      g0.push([E0 + o0 - h0 + Math.cos(K0) * h0, l0 - h0 + Math.sin(K0) * h0]);
    }
    g0.push([E0 + o0 - h0, l0], [0, l0]);
    for (let G0 = 0; G0 < s0; G0++) {
      let K0 = b0 + r0 * E0 * G0,
        it = K0 + r0 * E0,
        ft = B + l0 * (G0 + 1),
        gt = ft - l0;
      (i.sweep(N ? "x" : "z", it, d0, V, gt, g0, U, {
        dir: -r0,
      }),
        U0(it, K0 + r0 * 0.016, d0, V, gt, ft - q, y0, "b", 0, {
          faces: "tb",
        }),
        X &&
          U0(
            K0 + r0 * 0.016,
            K0 - r0 * 0.004,
            d0 + 0.05,
            V - 0.05,
            ft - q - 0.016,
            ft - q - 0.001,
            n.ledStrip,
            "b",
            0,
            {
              shadow: !1,
            },
          ),
        U0(
          K0 + r0 * 0.05,
          K0 + r0 * 0.064,
          d0 + 0.03,
          V - 0.03,
          ft,
          ft + 0.0016,
          N ? n.blackMetal : n.brass,
          "b",
          0,
          {
            shadow: !1,
          },
        ));
    }
    if ((U0(Y, Y - r0 * 0.03, d0, V, B, j - q - 0.002, y0), !N)) {
      let G0 = Y + r0 * 0.001,
        K0 = r0 * 0.006;
      for (let [it, ft, gt, rt] of [
        [d0 + 0.12, V - 0.12, 0.3, 0.325],
        [d0 + 0.12, V - 0.12, 3.05, 3.075],
        [d0 + 0.12, d0 + 0.145, 0.3, 3.075],
        [V - 0.145, V - 0.12, 0.3, 3.075],
      ])
        U0(G0, G0 + K0, it, ft, gt, rt, n.brass);
      for (let it = 1; it <= 3; it++) {
        let ft = d0 + ((V - d0) * it) / 4;
        U0(G0, G0 + K0 * 0.6, ft - 0.006, ft + 0.006, 0.325, 3.05, n.brass);
      }
    }
    for (let G0 of c0.sides) {
      let K0 = (G0.a0 + G0.a1) / 2,
        it = G0.a1 - G0.a0,
        ft = G0.a1 <= d0 + 0.001 ? G0.a1 : G0.a0,
        gt = G0.a1 <= d0 + 0.001 ? 1 : -1,
        rt = G0.cap || 0,
        dt = rt || j + 0.17,
        tt = (Q) => Math.min(R0(Q) + 0.17, dt),
        X0 = b0 - r0 * 0.045,
        ut = b0 + r0 * E0 * ((dt - 0.17 - B) / l0 - 1),
        z0 = [
          [X0, B],
          [Y, B],
          [Y, dt],
          [ut, dt],
          [X0, tt(X0)],
        ];
      w(N ? "z" : "x", z0, G0.a0, G0.a1, N ? G0.mat : n.marbleDark);
      let I0 = [
        [X0, tt(X0)],
        [ut, dt],
        [Y, dt],
        [Y, dt + 0.022],
        [ut, dt + 0.022],
        [X0, tt(X0) + 0.022],
      ];
      (w(N ? "z" : "x", I0, G0.a0 - 0.012, G0.a1 + 0.012, D),
        G0.blocks.forEach((Q, i0) => {
          let A0 = Q.lo,
            N0 = Q.hi,
            mt = Q.top;
          (U0(A0, N0, K0 - 0.036, K0 + 0.036, mt - 0.04, mt, D, "c", 0.006),
            (!rt || mt < rt - 0.01) &&
              U0(
                A0 + 0.02,
                N0 - 0.02,
                K0 - 0.012,
                K0 + 0.012,
                mt,
                mt + 0.012,
                W,
                "c",
                0.004,
              ));
          for (let Mt of [A0 + 0.022, N0 - 0.022])
            U0(
              Mt - 0.022,
              Mt + 0.022,
              K0 - 0.042,
              K0 + 0.042,
              Math.min(tt(A0), tt(N0)) - 0.02,
              mt - 0.03,
              D,
              "c",
              0.005,
            );
          let xt = Math.round((N0 - A0 - 0.12) / 0.1);
          for (let Mt = 1; Mt < xt; Mt++) {
            let St = A0 + 0.06 + ((N0 - A0 - 0.12) * Mt) / xt,
              Rt = tt(St) - 0.008;
            mt - 0.04 - Rt < 0.06 ||
              U0(
                St - 0.006,
                St + 0.006,
                K0 - 0.027,
                K0 + 0.027,
                Rt,
                mt - 0.038,
                D,
                "b",
              );
          }
          let yt = r0 > 0 ? A0 : N0;
          mt - tt(yt) > 1.25 &&
            U0(
              A0 + 0.03,
              N0 - 0.03,
              K0 - 0.016,
              K0 + 0.016,
              mt - 0.36,
              mt - 0.335,
              D,
              "c",
              0.003,
            );
        }));
      let vt = (r0 > 0, G0.blocks[0]),
        wt = b0,
        _t = vt.top + 0.05;
      (U0(
        wt,
        wt + r0 * 0.17,
        K0 - Math.max(0.085, it / 2 + 0.015),
        K0 + Math.max(0.085, it / 2 + 0.015),
        B,
        _t,
        N ? G0.mat : n.marbleDark,
        "c",
        0.012,
      ),
        U0(
          wt - r0 * 0.012,
          wt + r0 * 0.182,
          K0 - Math.max(0.097, it / 2 + 0.027),
          K0 + Math.max(0.097, it / 2 + 0.027),
          B,
          B + 0.14,
          D,
          "c",
          0.008,
        ),
        U0(
          wt - r0 * 0.012,
          wt + r0 * 0.182,
          K0 - Math.max(0.097, it / 2 + 0.027),
          K0 + Math.max(0.097, it / 2 + 0.027),
          _t,
          _t + 0.035,
          D,
          "c",
          0.008,
        ),
        i.lathe(
          ...$0(wt + r0 * 0.085, K0, _t + 0.035),
          [
            [0.05, 0],
            [0.058, 0.012],
            [0.03, 0.03],
            [0.045, 0.06],
            [0.05, 0.085],
            [0.036, 0.115],
            [0, 0.13],
          ],
          D,
          {
            seg: 14,
          },
        ));
      let Pt = ft + gt * 0.07,
        bt = (Q) => R0(Q) + 0.86,
        Et = b0 + r0 * 0.22,
        zt = Y - r0 * (rt ? 0.06 : 0.16);
      i.rod($0(Et, Pt, bt(Et)), $0(zt, Pt, bt(zt)), 0.021, W, {
        seg: 10,
      });
      for (let Q of [Et, zt]) {
        i.rod(
          $0(Q, Pt, bt(Q)),
          $0(Q, ft - gt * (rt && Q === zt ? 0.03 : -0.005), bt(Q)),
          0.021,
          W,
          {
            seg: 10,
          },
        );
        let i0 = $0(Q, Pt, bt(Q));
        i.add(new SphereGeometry(0.0215, 10, 8), W, {
          matrix: new Matrix4().makeTranslation(i0[0], i0[1], i0[2]),
        });
      }
      let J = Math.round(Math.abs(zt - Et) / 0.9);
      for (let Q = 1; Q < J; Q++) {
        let i0 = Et + ((zt - Et) * Q) / J,
          A0 = bt(i0);
        if (rt && A0 - 0.085 > rt - 0.04) continue;
        (i.rod($0(i0, Pt, A0 - 0.02), $0(i0, Pt, A0 - 0.06), 0.007, W, {
          seg: 6,
        }),
          i.rod(
            $0(i0, Pt, A0 - 0.06),
            $0(i0, ft + gt * 0.004, A0 - 0.085),
            0.007,
            W,
            {
              seg: 6,
            },
          ));
        let N0 = $0(i0, ft + gt * 0.006, A0 - 0.085);
        i.add(new CylinderGeometry(0.022, 0.022, 0.008, 10), W, {
          matrix: new Matrix4()
            .makeRotationFromEuler(new Euler(N ? Hl / 2 : 0, 0, N ? 0 : Hl / 2))
            .setPosition(N0[0], N0[1], N0[2]),
        });
      }
    }
    if (N) {
      let K0 = (ut) => R0(ut) + 0.1,
        it = b0 - r0 * 0.045,
        ft = j + 0.1,
        gt = b0 + r0 * E0 * ((ft - 0.1 - B) / l0 - 1);
      (w(
        "z",
        [
          [it, B],
          [Y, B],
          [Y, ft],
          [gt, ft],
          [it, K0(it)],
        ],
        10.1,
        d0,
        n.exterior,
      ),
        w(
          "z",
          [
            [it, K0(it)],
            [gt, ft],
            [Y, ft],
            [Y, ft + 0.018],
            [gt, ft + 0.018],
            [it, K0(it) + 0.018],
          ],
          10.1,
          d0 + 0.012,
          n.blackMetal,
        ));
      let rt = (ut) => R0(ut) + 0.86,
        dt = 10.1 + 0.075,
        tt = b0 + r0 * 0.22,
        X0 = Y - r0 * 0.16;
      i.rod([tt, rt(tt), dt], [X0, rt(X0), dt], 0.021, n.steel, {
        seg: 10,
      });
      for (let ut of [tt, X0])
        i.rod([ut, rt(ut), dt], [ut, rt(ut), 10.1 + 0.004], 0.021, n.steel, {
          seg: 10,
        });
      for (let ut = 1; ut < 6; ut++) {
        let z0 = tt + ((X0 - tt) * ut) / 6,
          I0 = rt(z0);
        (i.rod([z0, I0 - 0.02, dt], [z0, I0 - 0.07, dt], 0.007, n.steel, {
          seg: 6,
        }),
          i.rod(
            [z0, I0 - 0.07, dt],
            [z0, I0 - 0.09, 10.1 + 0.004],
            0.007,
            n.steel,
            {
              seg: 6,
            },
          ),
          g(
            z0 - 0.03,
            I0 - 0.13,
            10.1,
            z0 + 0.03,
            I0 - 0.05,
            10.1 + 0.008,
            n.steel,
            0.003,
          ));
      }
    }
  }
  function L(c0) {
    let { x: Z, z: r0, s: b0, y0: d0, y1: V } = c0,
      B = b0 / 2;
    (g(Z - B, d0, r0 - B, Z + B, d0 + 0.2, r0 + B, n.marbleDark, 0.014),
      g(
        Z - B + 0.025,
        d0 + 0.2,
        r0 - B + 0.025,
        Z + B - 0.025,
        d0 + 0.235,
        r0 + B - 0.025,
        n.brass,
        0.008,
      ),
      g(
        Z - B + 0.05,
        d0 + 0.235,
        r0 - B + 0.05,
        Z + B - 0.05,
        d0 + 0.36,
        r0 + B - 0.05,
        n.marbleDark,
        0.02,
      ),
      i.lathe(
        Z,
        d0 + 0.36,
        r0,
        [
          [0.31, 0],
          [0.318, 0.012],
          [0.305, 0.03],
          [0.295, 0.04],
        ],
        n.brass,
        {
          seg: 24,
        },
      ));
    let j = d0 + 0.4,
      s0 = V - 0.44,
      l0 = 0.292,
      E0 = l0 * Math.cos(Hl / 8),
      U = new CylinderGeometry(l0, l0, s0 - j, 8, 1, !0);
    (U.rotateY(Hl / 8),
      i.add(U, c0.mat || n.marbleDark, {
        matrix: p.makeTranslation(Z, (j + s0) / 2, r0),
      }));
    for (let X = 0; X < 4; X++) {
      let N = Hl / 4 + (X * Hl) / 2,
        q = new BoxGeometry(0.05, s0 - j - 0.12, 0.006);
      i.add(q, n.brass, {
        matrix: new Matrix4()
          .makeRotationY(N)
          .setPosition(
            Z + Math.sin(N) * (E0 + 0.002),
            (j + s0) / 2,
            r0 + Math.cos(N) * (E0 + 0.002),
          ),
      });
    }
    for (let X of [j + 0.02, j + 0.5, s0 - 0.5, s0 - 0.02])
      i.lathe(
        Z,
        X - 0.012,
        r0,
        [
          [l0 + 0.001, 0],
          [l0 + 0.012, 0.006],
          [l0 + 0.012, 0.018],
          [l0 + 0.001, 0.024],
        ],
        n.brass,
        {
          seg: 24,
        },
      );
    (i.lathe(
      Z,
      s0,
      r0,
      [
        [l0 + 0.003, 0],
        [l0 + 0.003, 0.035],
      ],
      n.ledStrip,
      {
        seg: 24,
        shadow: !1,
      },
    ),
      i.lathe(
        Z,
        s0 + 0.035,
        r0,
        [
          [l0 + 0.004, 0],
          [l0 + 0.02, 0.01],
          [l0 + 0.03, 0.05],
          [l0 + 0.055, 0.1],
          [l0 + 0.06, 0.125],
        ],
        n.brass,
        {
          seg: 24,
        },
      ),
      g(
        Z - B + 0.04,
        s0 + 0.16,
        r0 - B + 0.04,
        Z + B - 0.04,
        s0 + 0.27,
        r0 + B - 0.04,
        n.marbleDark,
        0.016,
      ),
      g(
        Z - B + 0.015,
        s0 + 0.27,
        r0 - B + 0.015,
        Z + B - 0.015,
        s0 + 0.31,
        r0 + B - 0.015,
        n.brass,
        0.008,
      ),
      g(Z - B, s0 + 0.31, r0 - B, Z + B, V, r0 + B, n.marbleDark, 0.014),
      s.addGlow(
        new Vector3(Z, V - 0.001, r0),
        new Vector3(0, -1, 0),
        1.7,
        1.7,
        16747068,
        0.16,
      ));
  }
  let A = Ye - 0.04;
  function O() {
    let c0 = [-8, -4, 0, 4, 8],
      Z = [-4, 1, 6];
    for (let B of c0) {
      for (let j of [-1, 1])
        b(
          B + j * 0.18 - 0.012,
          Js - 0.362,
          -7.94,
          B + j * 0.18 + 0.012,
          Js - 0.338,
          9.89,
          n.brass,
          {
            shadow: !1,
          },
        );
      b(B - 0.012, Js - 0.353, -7.94, B + 0.012, Js - 0.349, 9.89, n.brass, {
        shadow: !1,
      });
    }
    for (let B of Z) {
      for (let j of [-1, 1])
        b(
          -11.94,
          Js - 0.362,
          B + j * 0.18 - 0.012,
          11.94,
          Js - 0.338,
          B + j * 0.18 + 0.012,
          n.brass,
          {
            shadow: !1,
          },
        );
      b(-11.94, Js - 0.353, B - 0.012, 11.94, Js - 0.349, B + 0.012, n.brass, {
        shadow: !1,
      });
    }
    for (let B of c0)
      for (let j of Z)
        (g(
          B - 0.1,
          Js - 0.372,
          j - 0.1,
          B + 0.1,
          Js - 0.35,
          j + 0.1,
          n.brass,
          0.008,
          {
            shadow: !1,
          },
        ),
          i.lathe(
            B,
            Js - 0.39,
            j,
            [
              [0, 0],
              [0.04, 0.004],
              [0.05, 0.012],
              [0.03, 0.018],
            ],
            n.brass,
            {
              seg: 12,
              shadow: !1,
            },
          ));
    let r0 = [
        -11.94, -8.18, -7.82, -4.18, -3.82, -0.18, 0.18, 3.82, 4.18, 7.82, 8.18,
        11.94,
      ],
      b0 = [-7.94, -4.18, -3.82, 0.82, 1.18, 5.82, 6.18, 9.89],
      d0 = [
        [0, 0],
        [0.018, 0],
        [0.03, 0.03],
        [0.062, 0.07],
        [0.105, 0.088],
        [0.105, 0.1],
        [0, 0.1],
      ];
    for (let B = 0; B < r0.length; B += 2)
      for (let j = 0; j < b0.length; j += 2) {
        let s0 = r0[B],
          l0 = r0[B + 1],
          E0 = b0[j],
          U = b0[j + 1];
        (i.sweep("x", s0, E0, U, Js - 0.1, d0, n.ceiling, {
          dir: 1,
          shadow: !1,
        }),
          i.sweep("x", l0, E0, U, Js - 0.1, d0, n.ceiling, {
            dir: -1,
            shadow: !1,
          }),
          i.sweep("z", E0, s0, l0, Js - 0.1, d0, n.ceiling, {
            dir: 1,
            shadow: !1,
          }),
          i.sweep("z", U, s0, l0, Js - 0.1, d0, n.ceiling, {
            dir: -1,
            shadow: !1,
          }));
        let X = s0 + 0.42,
          N = l0 - 0.42,
          q = E0 + 0.42,
          o0 = U - 0.42;
        g(X, Js - 0.045, q, N, Js, o0, n.ceiling, 0.008, {
          shadow: !1,
        });
        for (let [h0, y0, D, W] of [
          [X + 0.1, q + 0.1, N - 0.1, q + 0.118],
          [X + 0.1, o0 - 0.118, N - 0.1, o0 - 0.1],
          [X + 0.1, q + 0.1, X + 0.118, o0 - 0.1],
          [N - 0.118, q + 0.1, N - 0.1, o0 - 0.1],
        ])
          b(h0, Js - 0.0475, y0, D, Js - 0.045, W, n.brass, {
            shadow: !1,
          });
        for (let h0 of [X + 0.38, N - 0.38])
          for (let y0 of [q + 0.38, o0 - 0.38])
            E(h0, Js - 0.045, y0, {
              r: 0.055,
            });
        _((X + N) / 2, Js - 0.045, (q + o0) / 2);
      }
    let V = [
      [0, 0],
      [0.03, 0],
      [0.045, 0.06],
      [0.09, 0.1],
      [0.11, 0.16],
      [0.2, 0.2],
      [0.26, 0.2],
      [0.26, 0.385],
      [0.232, 0.385],
      [0.232, 0.3],
      [0, 0.3],
    ];
    (i.sweep("z", -7.94, -11.94, 11.94, 7.2, V, n.plaster, {
      dir: 1,
    }),
      i.sweep("x", -11.94, -7.94, 9.89, 7.2, V, n.plaster, {
        dir: 1,
      }),
      i.sweep("x", 11.94, -7.94, 9.89, 7.2, V, n.plaster, {
        dir: -1,
      }));
    for (let B of [-1, 1])
      (b(
        Math.min(B * 11.9, B * 11.74),
        7.5,
        -7.7,
        Math.max(B * 11.9, B * 11.74),
        7.555,
        9.85,
        n.ledStrip,
        {
          shadow: !1,
        },
      ),
        s.addGlow(
          new Vector3(B * 11.93, 7.79, 1),
          new Vector3(-B, 0, 0),
          17.5,
          0.85,
          16751164,
          0.5,
        ),
        b(
          Math.min(B * 11.94, B * 11.905),
          7.14,
          -7.94,
          Math.max(B * 11.94, B * 11.905),
          7.2,
          9.89,
          n.brass,
          {
            shadow: !1,
          },
        ));
    (s.addGlow(
      new Vector3(0, 7.79, -7.93),
      new Vector3(0, 0, 1),
      23.5,
      0.85,
      16751164,
      0.5,
    ),
      b(-11.94, 7.14, -7.94, 11.94, 7.2, -7.905, n.brass, {
        shadow: !1,
      }));
  }
  function H() {
    let c0 = Ye,
      Z = (r0, b0, d0, V) =>
        b(r0, c0 - 0.004, b0, d0, c0 + 0.001, V, n.blackMetal, {
          shadow: !1,
        });
    for (let r0 = -11; r0 <= 11.01; r0 += 2)
      E(r0, c0, -6.55, {
        glow: 0.13,
        size: 2.6,
      });
    for (let r0 = -10; r0 <= 10.01; r0 += 2)
      Z(r0 - 0.006, -7.9, r0 + 0.006, -5.14);
    (Z(-11.9, -7.56, 11.9, -7.548), Z(-11.9, -5.5, 11.9, -5.488));
    for (let r0 of [-10, -2, 2, 10]) _(r0, c0, -7);
    for (let r0 of [-1, 1]) {
      for (let b0 = -3.5; b0 <= 8.6; b0 += 2)
        E(r0 * 10.5, c0, b0, {
          glow: 0.13,
          size: 2.6,
        });
      for (let b0 = -4.5; b0 <= 9.6; b0 += 2)
        Z(
          Math.min(r0 * 11.9, r0 * 9.14),
          b0 - 0.006,
          Math.max(r0 * 11.9, r0 * 9.14),
          b0 + 0.006,
        );
      (Z(
        Math.min(r0 * 11.56, r0 * 11.548),
        -5,
        Math.max(r0 * 11.56, r0 * 11.548),
        9.85,
      ),
        Z(
          Math.min(r0 * 9.5, r0 * 9.488),
          -5,
          Math.max(r0 * 9.5, r0 * 9.488),
          9.85,
        ));
      for (let b0 of [-2.5, 2.5, 7.5]) _(r0 * 11.1, c0, b0);
      R(r0 * 10.5, c0, 0.5);
    }
    R(0, c0, -6);
  }
  function F() {
    for (let r0 = 0; r0 <= 88; r0++) {
      let b0 = -7.8 + 0.2 * r0;
      b(-27.9, A - 0.075, b0 - 0.026, -12.1, A, b0 + 0.026, n.walnut, {
        shadow: !1,
      });
    }
    for (let r0 of [-5.1, -0.9, 3.3, 7.5])
      b(
        -27.9 + 0.1,
        A - 0.022,
        r0 - 0.03,
        -12.1 - 0.1,
        A - 0.006,
        r0 + 0.03,
        n.ledStrip,
        {
          shadow: !1,
        },
      );
    (g(-27.9, A - 0.13, -7.9, -27.9 + 0.14, A, 9.9, n.woodDark, 0.01, {
      shadow: !1,
    }),
      g(-12.1 - 0.14, A - 0.13, -7.9, -12.1, A, 9.9, n.woodDark, 0.01, {
        shadow: !1,
      }),
      g(-27.9, A - 0.13, -7.9, -12.1, A, -7.76, n.woodDark, 0.01, {
        shadow: !1,
      }),
      g(-27.9, A - 0.13, 9.76, -12.1, A, 9.9, n.woodDark, 0.01, {
        shadow: !1,
      }));
    for (let r0 of [-24, -20, -16])
      b(r0 - 0.012, A - 0.083, -7.76, r0 + 0.012, A - 0.075, 9.76, n.brass, {
        shadow: !1,
      });
    for (let [r0, b0] of [
      [-25.5, -2.1],
      [-18.3, -2.1],
      [-25.5, 5.1],
      [-18.3, 5.1],
      [-14, 8.5],
      [-14, -3],
    ])
      _(r0, A - 0.075, b0);
    (R(-21.9, A - 0.075, 1.5), R(-15.9, A - 0.075, 6.3));
  }
  function P(c0, Z, r0, b0, d0, V, B = {}) {
    let j = A - V,
      s0 = B.mat || n.ceiling;
    (g(c0, j, Z, r0, A, Z + d0, s0, 0.012, {
      shadow: !1,
    }),
      g(c0, j, b0 - d0, r0, A, b0, s0, 0.012, {
        shadow: !1,
      }),
      g(c0, j, Z + d0, c0 + d0, A, b0 - d0, s0, 0.012, {
        shadow: !1,
      }),
      g(r0 - d0, j, Z + d0, r0, A, b0 - d0, s0, 0.012, {
        shadow: !1,
      }));
    let l0 = B.cool ? n.bulbCool : n.ledStrip,
      E0 = 0.012;
    (b(c0 + d0, A - 0.05, Z + d0, r0 - d0, A - 0.025, Z + d0 + E0, l0, {
      shadow: !1,
    }),
      b(c0 + d0, A - 0.05, b0 - d0 - E0, r0 - d0, A - 0.025, b0 - d0, l0, {
        shadow: !1,
      }),
      b(c0 + d0, A - 0.05, Z + d0, c0 + d0 + E0, A - 0.025, b0 - d0, l0, {
        shadow: !1,
      }),
      b(r0 - d0 - E0, A - 0.05, Z + d0, r0 - d0, A - 0.025, b0 - d0, l0, {
        shadow: !1,
      }));
    let U = B.bead || n.brass;
    (b(
      c0 + d0 - 0.004,
      j - 0.004,
      Z + d0 - 0.004,
      r0 - d0 + 0.004,
      j + 0.012,
      Z + d0 + 0.014,
      U,
      {
        shadow: !1,
      },
    ),
      b(
        c0 + d0 - 0.004,
        j - 0.004,
        b0 - d0 - 0.014,
        r0 - d0 + 0.004,
        j + 0.012,
        b0 - d0 + 0.004,
        U,
        {
          shadow: !1,
        },
      ),
      b(
        c0 + d0 - 0.004,
        j - 0.004,
        Z + d0,
        c0 + d0 + 0.014,
        j + 0.012,
        b0 - d0,
        U,
        {
          shadow: !1,
        },
      ),
      b(
        r0 - d0 - 0.014,
        j - 0.004,
        Z + d0,
        r0 - d0 + 0.004,
        j + 0.012,
        b0 - d0,
        U,
        {
          shadow: !1,
        },
      ));
    let X = [
      [0, 0],
      [0.012, 0],
      [0.02, 0.025],
      [0.045, 0.05],
      [0.07, 0.058],
      [0.07, 0.07],
      [0, 0.07],
    ];
    return (
      i.sweep("x", c0, Z, b0, j - 0.07, X, s0, {
        dir: 1,
        shadow: !1,
      }),
      i.sweep("x", r0, Z, b0, j - 0.07, X, s0, {
        dir: -1,
        shadow: !1,
      }),
      i.sweep("z", Z, c0, r0, j - 0.07, X, s0, {
        dir: 1,
        shadow: !1,
      }),
      i.sweep("z", b0, c0, r0, j - 0.07, X, s0, {
        dir: -1,
        shadow: !1,
      }),
      j
    );
  }
  function z(c0, Z, r0, b0 = 0.28) {
    i.cyl(c0, Z - 0.012, r0, b0, 0.012, n.plasticWhite, {
      seg: 20,
      shadow: !1,
    });
    for (let d0 of [0.78, 0.56, 0.34])
      i.lathe(
        c0,
        Z - 0.03,
        r0,
        [
          [b0 * d0 - 0.012, 0.018],
          [b0 * d0, 0],
          [b0 * d0 + 0.012, 0.004],
          [b0 * d0 + 0.002, 0.018],
        ],
        n.plasticWhite,
        {
          seg: 20,
          shadow: !1,
        },
      );
    i.disc(c0, Z - 0.0125, r0, b0 * 0.2, n.blackMetal, {
      seg: 12,
    });
  }
  function k(c0, Z, r0, b0, d0) {
    if (
      (g(c0, d0 - 0.008, Z, r0, d0, b0, n.blackMetal, 0.003, {
        shadow: !1,
      }),
      r0 - c0 > b0 - Z)
    ) {
      let B = (Z + b0) / 2;
      b(
        c0 + 0.02,
        d0 - 0.0095,
        B - 0.004,
        r0 - 0.02,
        d0 - 0.008,
        B + 0.004,
        n.steel,
        {
          shadow: !1,
        },
      );
    } else {
      let B = (c0 + r0) / 2;
      b(
        B - 0.004,
        d0 - 0.0095,
        Z + 0.02,
        B + 0.004,
        d0 - 0.008,
        b0 - 0.02,
        n.steel,
        {
          shadow: !1,
        },
      );
    }
  }
  function I() {
    let V = P(-27.9, -19.9, -6.1, -8.1, 0.85, 0.16);
    for (let W = -26.6; W <= -7.3; W += 2.14)
      (E(W, V, -19.9 + 0.45, {
        glow: 0.1,
        size: 2.2,
      }),
        E(W, V, -8.1 - 0.45, {
          glow: 0.1,
          size: 2.2,
        }));
    for (let W of [-17.2, -14.9, -12.6, -10.3])
      (E(-27.9 + 0.45, V, W, {
        glow: 0.1,
        size: 2.2,
      }),
        (W < -15.4 || W > -13) &&
          E(-6.1 - 0.45, V, W, {
            glow: 0.1,
            size: 2.2,
          }));
    let B = -27.9 + 0.85,
      j = -6.1 - 0.85,
      s0 = -19.9 + 0.85,
      l0 = -8.1 - 0.85,
      E0 = 5,
      U = 3,
      X = 0.11,
      N = 0.1,
      q = [],
      o0 = [];
    for (let W = 1; W < E0; W++) q.push(B + ((j - B) * W) / E0);
    for (let W = 1; W < U; W++) o0.push(s0 + ((l0 - s0) * W) / U);
    for (let W of q) {
      g(W - X, A - N, s0, W + X, A, l0, n.ceiling, 0.01, {
        shadow: !1,
      });
      for (let Y of [-1, 1])
        b(
          W + Y * X - 0.007,
          A - N - 0.004,
          s0 + 0.02,
          W + Y * X + 0.007,
          A - N + 0.009,
          l0 - 0.02,
          n.brass,
          {
            shadow: !1,
          },
        );
    }
    for (let W of o0) {
      g(B, A - N, W - X, j, A, W + X, n.ceiling, 0.01, {
        shadow: !1,
      });
      for (let Y of [-1, 1])
        b(
          B + 0.02,
          A - N - 0.004,
          W + Y * X - 0.007,
          j - 0.02,
          A - N + 0.009,
          W + Y * X + 0.007,
          n.brass,
          {
            shadow: !1,
          },
        );
    }
    for (let W of q)
      for (let Y of o0)
        (g(
          W - 0.075,
          A - N - 0.012,
          Y - 0.075,
          W + 0.075,
          A - N,
          Y + 0.075,
          n.brass,
          0.006,
          {
            shadow: !1,
          },
        ),
          i.lathe(
            W,
            A - N - 0.026,
            Y,
            [
              [0, 0],
              [0.03, 0.003],
              [0.038, 0.009],
              [0.022, 0.014],
            ],
            n.brass,
            {
              seg: 12,
              shadow: !1,
            },
          ));
    let h0 = [B, ...q.flatMap((W) => [W - X, W + X]), j],
      y0 = [s0, ...o0.flatMap((W) => [W - X, W + X]), l0],
      D = [
        [0, 0],
        [0.012, 0],
        [0.02, 0.02],
        [0.04, 0.046],
        [0.072, 0.058],
        [0.072, 0.066],
        [0, 0.066],
      ];
    for (let W = 0; W < E0; W++)
      for (let Y = 0; Y < U; Y++) {
        let R0 = h0[W * 2],
          U0 = h0[W * 2 + 1],
          $0 = y0[Y * 2],
          g0 = y0[Y * 2 + 1],
          G0 = W * U + Y;
        (W > 0 &&
          i.sweep("x", R0, $0, g0, A - 0.066, D, n.ceiling, {
            dir: 1,
            shadow: !1,
          }),
          W < E0 - 1 &&
            i.sweep("x", U0, $0, g0, A - 0.066, D, n.ceiling, {
              dir: -1,
              shadow: !1,
            }),
          Y > 0 &&
            i.sweep("z", $0, R0, U0, A - 0.066, D, n.ceiling, {
              dir: 1,
              shadow: !1,
            }),
          Y < U - 1 &&
            i.sweep("z", g0, R0, U0, A - 0.066, D, n.ceiling, {
              dir: -1,
              shadow: !1,
            }));
        let K0 = R0 + 0.4,
          it = U0 - 0.4,
          ft = $0 + 0.4,
          gt = g0 - 0.4,
          rt = A - 0.022;
        g(K0, rt, ft, it, A, gt, n.ceiling, 0.006, {
          shadow: !1,
        });
        for (let [X0, ut, z0, I0] of [
          [K0 + 0.09, ft + 0.09, it - 0.09, ft + 0.104],
          [K0 + 0.09, gt - 0.104, it - 0.09, gt - 0.09],
          [K0 + 0.09, ft + 0.09, K0 + 0.104, gt - 0.09],
          [it - 0.104, ft + 0.09, it - 0.09, gt - 0.09],
        ])
          b(X0, rt - 0.0025, ut, z0, rt, I0, n.brass, {
            shadow: !1,
          });
        for (let X0 of [K0 + 0.36, it - 0.36])
          for (let ut of [ft + 0.36, gt - 0.36])
            E(X0, rt, ut, {
              r: 0.045,
            });
        let dt = (K0 + it) / 2 + ((W + Y) % 2 ? 0.55 : -0.55),
          tt = (ft + gt) / 2 + 0.5;
        (G0 % 2 === 0 ? z(dt, rt, tt, 0.24) : _(dt, rt, tt),
          (G0 === 4 || G0 === 13) &&
            R((K0 + it) / 2 - 0.9, rt, (ft + gt) / 2 - 0.4));
      }
  }
  function G() {
    let r0 = [
      [0, 0],
      [0.014, 0],
      [0.024, 0.03],
      [0.055, 0.062],
      [0.085, 0.072],
      [0.085, 0.085],
      [0, 0.085],
    ];
    (i.sweep("x", 12.1, -7.9, 9.9, A - 0.085, r0, n.ceiling, {
      dir: 1,
      shadow: !1,
    }),
      i.sweep("x", 15.9, -7.9, 9.9, A - 0.085, r0, n.ceiling, {
        dir: -1,
        shadow: !1,
      }),
      i.sweep("z", -7.9, 12.1, 15.9, A - 0.085, r0, n.ceiling, {
        dir: 1,
        shadow: !1,
      }),
      i.sweep("z", 9.9, 12.1, 15.9, A - 0.085, r0, n.ceiling, {
        dir: -1,
        shadow: !1,
      }));
    let b0 = [-6.4, -3.4, -0.4, 2.6, 5.6, 8.6];
    for (let d0 of b0)
      (g(12.1, A - 0.11, d0 - 0.14, 15.9, A, d0 + 0.14, n.ceiling, 0.014, {
        shadow: !1,
      }),
        b(
          12.1 + 0.1,
          A - 0.114,
          d0 - 0.006,
          15.9 - 0.1,
          A - 0.11,
          d0 + 0.006,
          n.brass,
          {
            shadow: !1,
          },
        ));
    for (let d0 = 0; d0 < b0.length - 1; d0++) {
      let V = (b0[d0] + b0[d0 + 1]) / 2;
      (g(
        12.1 + 0.5,
        A - 0.03,
        b0[d0] + 0.45,
        15.9 - 0.5,
        A,
        b0[d0 + 1] - 0.45,
        n.ceiling,
        0.008,
        {
          shadow: !1,
        },
      ),
        k(13.975, b0[d0] + 0.75, 14.025, b0[d0 + 1] - 0.75, A - 0.03),
        E(13, A - 0.03, V, {
          glow: 0.12,
          size: 2.3,
        }),
        E(15, A - 0.03, V, {
          glow: 0.12,
          size: 2.3,
        }));
    }
    (_(14, A, -6.9),
      _(13.4, A, 1.1),
      _(14.6, A, 7.1),
      R(14.6, A - 0.03, -1.9),
      R(13.4, A - 0.03, 4.1));
  }
  function K() {
    let d0 = P(16.1, -7.9, 27.9, -0.1, 0.6, 0.12, {
      cool: !0,
      bead: n.steel,
    });
    for (let E0 of [17.6, 20.2, 22.9, 25.6])
      (E(E0, d0, -7.9 + 0.3, {
        cool: !0,
      }),
        E(E0, d0, -0.1 - 0.3, {
          cool: !0,
        }));
    let V = 19.95,
      B = 24.05,
      j = -5.35,
      s0 = -2.65,
      l0 = A - 0.2;
    (i.bbox(V, l0, j, B, l0 + 0.08, s0, n.ceiling, {
      r: 0.02,
      seg: 1,
      shadow: !1,
    }),
      b(
        V + 0.03,
        l0 + 0.08,
        j + 0.03,
        B - 0.03,
        l0 + 0.095,
        s0 - 0.03,
        n.bulbCool,
        {
          shadow: !1,
        },
      ),
      b(
        V - 0.004,
        l0 + 0.03,
        j - 0.004,
        B + 0.004,
        l0 + 0.042,
        s0 + 0.004,
        n.steel,
        {
          shadow: !1,
        },
      ));
    for (let E0 of [V + 0.25, B - 0.25])
      for (let U of [j + 0.25, s0 - 0.25])
        i.rod([E0, l0 + 0.08, U], [E0, A, U], 0.006, n.steel, {
          seg: 6,
        });
    (k(V + 0.5, -4.42, B - 0.5, -4.37, l0),
      k(V + 0.5, -3.63, B - 0.5, -3.58, l0));
    for (let E0 of [20.6, 22, 23.4])
      (E(E0, l0, -4.95, {
        cool: !0,
        r: 0.045,
      }),
        E(E0, l0, -3.05, {
          cool: !0,
          r: 0.045,
        }));
    (s.addGlow(
      new Vector3(22, A - 0.001, -4),
      new Vector3(0, -1, 0),
      6.4,
      4.6,
      13625087,
      0.22,
    ),
      _(18.2, A, -4),
      _(26, A, -4),
      R(25.6, A, -6.2));
  }
  function $() {
    let d0 = P(16.1, 0.1, 27.9, 9.9, 0.7, 0.14);
    for (let X of [18, 20.9, 23.8, 26.7])
      (E(X, d0, 9.9 - 0.38, {
        glow: 0.09,
        size: 2,
      }),
        X < 24 &&
          E(X, d0, 0.1 + 0.38, {
            r: 0.04,
          }));
    for (let X of [2.4, 5, 7.6])
      (E(16.1 + 0.38, d0, X, {
        glow: 0.09,
        size: 2,
      }),
        E(27.9 - 0.38, d0, X, {
          glow: 0.09,
          size: 2,
        }));
    let V = 17.75,
      B = 26.25,
      j = 1.75,
      s0 = 8.25,
      l0 = A - 0.055;
    (g(
      V + 0.07,
      l0 + 0.02,
      j + 0.07,
      B - 0.07,
      A,
      s0 - 0.07,
      n.ceiling,
      0.004,
      {
        shadow: !1,
      },
    ),
      g(V, l0, j, B, l0 + 0.028, s0, n.ceiling, 0.008, {
        shadow: !1,
      }));
    for (let [X, N, q, o0] of [
      [V, j, B, j + 0.012],
      [V, s0 - 0.012, B, s0],
      [V, j, V + 0.012, s0],
      [B - 0.012, j, B, s0],
    ])
      b(
        X - 0.002,
        l0 - 0.003,
        N - 0.002,
        q + 0.002,
        l0 + 0.006,
        o0 + 0.002,
        n.brass,
        {
          shadow: !1,
        },
      );
    let E0 = (X, N, q, o0, h0, y0, D, W, Y) => {
        for (let [R0, U0, $0, g0] of [
          [X, N, q, N + h0],
          [X, o0 - h0, q, o0],
          [X, N + h0, X + h0, o0 - h0],
          [q - h0, N + h0, q, o0 - h0],
        ])
          Y
            ? g(R0, y0, U0, $0, D, g0, W, Y, {
                shadow: !1,
              })
            : b(R0, y0, U0, $0, D, g0, W, {
                shadow: !1,
              });
      },
      U = (X, N, q, o0, h0 = 0.04, y0 = 0.022) => {
        (E0(X, N, q, o0, h0, l0 - y0, l0, n.ceiling, 0.007),
          E0(
            X + h0 + 0.05,
            N + h0 + 0.05,
            q - h0 - 0.05,
            o0 - h0 - 0.05,
            0.012,
            l0 - 0.0025,
            l0,
            n.brass,
            0,
          ));
      };
    (U(V + 0.3, j + 0.3, 20.35, s0 - 0.3),
      U(23.65, j + 0.3, B - 0.3, s0 - 0.3),
      U(20.65, j + 0.3, 23.35, s0 - 0.3),
      i.lathe(
        22,
        l0 - 0.062,
        5,
        [
          [0, 0.006],
          [0.05, 0],
          [0.085, 0.014],
          [0.12, 0.01],
          [0.14, 0.03],
          [0.24, 0.026],
          [0.275, 0.044],
          [0.37, 0.04],
          [0.4, 0.052],
          [0.5, 0.05],
          [0.53, 0.062],
        ],
        n.ceiling,
        {
          seg: 48,
          shadow: !1,
        },
      ),
      i.lathe(
        22,
        l0 - 0.012,
        5,
        [
          [0.6, 0.012],
          [0.612, 0],
          [0.63, 0],
          [0.642, 0.012],
        ],
        n.brass,
        {
          seg: 48,
          shadow: !1,
        },
      ),
      i.lathe(
        22,
        l0 - 0.074,
        5,
        [
          [0, 0],
          [0.03, 0.003],
          [0.044, 0.014],
        ],
        n.brass,
        {
          seg: 16,
          shadow: !1,
        },
      ),
      z(24.6, A, 1.3, 0.2),
      _(19.2, l0, 5),
      _(24.8, l0, 5),
      R(22, l0, 7.2));
  }
  function n0() {
    for (let [c0, Z] of [
      [9.5, -17],
      [9.5, -11],
      [15, -17],
      [15, -10.6],
      [20.5, -18.4],
      [20.5, -10.6],
      [25.5, -17],
      [25.5, -11],
    ])
      _(c0, A, Z);
    (R(12, A, -9.4), R(23.4, A, -14.2));
  }
  function e0() {
    let r0 = A,
      b0 = (D, W, Y) =>
        i.rod([D, W, Y], [D, r0, Y], 0.006, n.steel, {
          seg: 5,
          shadow: !1,
        }),
      d0 = -3.5,
      V = -2.6,
      B = 2.84,
      j = 3.24;
    for (let D = -19.75; D < -8.25 - 0.2; D += 1.4375) {
      let W = Math.min(D + 1.4375, -8.25);
      (g(d0, B, D + 0.012, V, j, W - 0.012, n.steel, 0.012),
        g(
          d0 - 0.028,
          B - 0.028,
          D - 0.014,
          V + 0.028,
          j + 0.028,
          D + 0.014,
          n.steel,
          0.006,
        ),
        g(
          d0 - 0.1,
          B - 0.062,
          D + 0.69,
          V + 0.1,
          B - 0.03,
          D + 0.73,
          n.blackMetal,
          0.005,
        ),
        b0(d0 - 0.07, B - 0.03, D + 0.71),
        b0(V + 0.07, B - 0.03, D + 0.71),
        b(V, B + 0.05, D + 0.3, V + 0.003, j - 0.05, D + 0.312, n.steel, {
          shadow: !1,
        }),
        b(V, B + 0.05, W - 0.312, V + 0.003, j - 0.05, W - 0.3, n.steel, {
          shadow: !1,
        }));
    }
    g(
      d0 - 0.028,
      B - 0.028,
      -8.25 - 0.014,
      V + 0.028,
      j + 0.028,
      -8.25 + 0.014,
      n.steel,
      0.006,
    );
    for (let D of [-17.3, -12.2]) {
      g(
        d0 + 0.12,
        B - 0.02,
        D - 0.2,
        V - 0.12,
        B,
        D + 0.2,
        n.blackMetal,
        0.006,
        {
          shadow: !1,
        },
      );
      for (let W = 0; W < 7; W++)
        b(
          d0 + 0.15,
          B - 0.028,
          D - 0.17 + W * 0.055,
          V - 0.15,
          B - 0.02,
          D - 0.155 + W * 0.055,
          n.steel,
          {
            shadow: !1,
          },
        );
    }
    (g(-5.9, 2.9, -10.75, d0, 3.2, -10.25, n.steel, 0.012),
      g(-5.2, 2.875, -10.775, -5.17, 3.225, -10.225, n.steel, 0.005),
      g(-4.3, 2.875, -10.775, -4.27, 3.225, -10.225, n.steel, 0.005),
      g(-5.905, 2.86, -10.8, -5.88, 3.24, -10.2, n.steel, 0.005));
    let s0 = -1.76,
      l0 = -1.24,
      E0 = 3;
    (g(s0, E0, -19.75, s0 + 0.022, E0 + 0.075, -8.25, n.blackMetal, 0.004),
      g(l0 - 0.022, E0, -19.75, l0, E0 + 0.075, -8.25, n.blackMetal, 0.004));
    for (let D = -19.75 + 0.15; D < -8.25; D += 0.3)
      b(
        s0 + 0.02,
        E0 + 0.008,
        D - 0.015,
        l0 - 0.02,
        E0 + 0.024,
        D + 0.015,
        n.blackMetal,
        {
          shadow: !1,
        },
      );
    for (let D = -19.75 + 1; D < -8.25; D += 2.1)
      (g(
        s0 - 0.06,
        E0 - 0.03,
        D - 0.02,
        l0 + 0.06,
        E0,
        D + 0.02,
        n.steel,
        0.004,
      ),
        b0(s0 - 0.04, E0, D),
        b0(l0 + 0.04, E0, D));
    let U = [
      [-1.66, 0.021, n.rubber],
      [-1.61, 0.016, n.plasticBlack],
      [-1.565, 0.013, n.plasticWhite],
      [-1.5, 0.024, n.rubber],
      [-1.44, 0.014, n.plasticBlack],
      [-1.4, 0.014, n.rubber],
      [-1.34, 0.018, n.plasticBlack],
    ];
    for (let [D, W, Y] of U)
      i.rod([D, E0 + 0.024 + W, -19.75], [D, E0 + 0.024 + W, -8.25], W, Y, {
        seg: 6,
        shadow: !1,
      });
    i.tube(
      [
        [-1.5, E0 + 0.05, -8.6],
        [-1.9, E0 + 0.03, -8.38],
        [-2.6, 2.9, -8.2],
        [-3.2, 2.5, -8.16],
        [-3.2, 2.2, -8.16],
      ],
      0.016,
      n.rubber,
      {
        seg: 20,
        rseg: 6,
      },
    );
    let X = [
        [2, 0.068, n.plasticWhite],
        [2.2, 0.068, n.plasticWhite],
        [2.42, 0.03, n.brass],
        [2.55, 0.02, n.steel],
      ],
      N = 3.03;
    for (let [D, W, Y] of X) {
      i.rod([D, N + W, -19.75 - 0.1], [D, N + W, -8.25 + 0.1], W, Y, {
        seg: 12,
      });
      for (let R0 = -19.75 + 1.6; R0 < -8.25; R0 += 2.9)
        i.rod(
          [D, N + W, R0 - 0.03],
          [D, N + W, R0 + 0.03],
          W + (W > 0.05 ? 0.006 : 0.008),
          W > 0.05 ? n.steel : Y,
          {
            seg: 12,
          },
        );
      for (let R0 of [-19.75 + 0.02, -8.25 - 0.02])
        i.rod(
          [D, N + W, R0 - 0.012],
          [D, N + W, R0 + 0.012],
          W + 0.025,
          n.steel,
          {
            seg: 12,
          },
        );
    }
    for (let D = -19.75 + 0.9; D < -8.25; D += 2.05) {
      (g(1.86, N - 0.038, D - 0.02, 2.7, N, D + 0.02, n.steel, 0.004),
        b0(1.89, N, D),
        b0(2.67, N, D));
      for (let [W, Y] of X)
        g(
          W - Y - 0.006,
          N,
          D - 0.012,
          W + Y + 0.006,
          N + 0.012,
          D + 0.012,
          n.blackMetal,
          0.002,
          {
            shadow: !1,
          },
        );
    }
    (i.rod([2.42, N + 0.03, -11.5], [2.42, N + 0.03, -11.32], 0.05, n.brass, {
      seg: 10,
    }),
      i.rod(
        [2.42, N + 0.03, -11.41],
        [2.42, N - 0.12, -11.41],
        0.012,
        n.steel,
        {
          seg: 6,
        },
      ),
      i.add(new TorusGeometry(0.06, 0.009, 6, 16), c, {
        matrix: new Matrix4()
          .makeRotationX(Hl / 2)
          .setPosition(2.42, N - 0.12, -11.41),
      }));
    for (let D = 0; D < 3; D++) {
      let W = (D * Hl) / 3;
      i.rod(
        [2.42 - Math.cos(W) * 0.06, N - 0.12, -11.41 - Math.sin(W) * 0.06],
        [2.42 + Math.cos(W) * 0.06, N - 0.12, -11.41 + Math.sin(W) * 0.06],
        0.005,
        c,
        {
          seg: 5,
        },
      );
    }
    let q = 4.35,
      o0 = 3.3;
    i.rod([q, o0, -19.75 - 0.1], [q, o0, -8.25 + 0.1], 0.042, c, {
      seg: 12,
    });
    for (let D = -19.75 + 1.2; D < -8.25; D += 2.6)
      (i.rod([q, o0, D - 0.035], [q, o0, D + 0.035], 0.055, c, {
        seg: 12,
      }),
        b0(q, o0 + 0.04, D + 0.3));
    for (let D of [-17.6, -15.7, -12.6, -10.6, -8.9]) {
      (i.rod([q, o0, D], [-4.7, o0, D], 0.019, c, {
        seg: 8,
      }),
        i.rod([q - 0.07, o0, D - 0.001], [q + 0, o0, D + 0.001], 0.03, c, {
          seg: 8,
        }));
      for (let W of [3.3, 0.6, -0.9, -4.5])
        (i.rod([W, o0, D], [W, o0 - 0.07, D], 0.012, c, {
          seg: 6,
        }),
          i.cyl(W, o0 - 0.095, D, 0.011, 0.025, n.brass, {
            seg: 6,
            shadow: !1,
          }),
          i.cyl(W, o0 - 0.1, D, 0.026, 0.004, n.brass, {
            seg: 8,
            shadow: !1,
          }));
      i.rod([-4.7, o0, D - 0.02], [-4.7, o0, D + 0.02], 0.024, c, {
        seg: 8,
      });
    }
    let h0 = 5.9 - 0.02;
    for (let D of [2.56, 2.63])
      i.rod([h0, D, -19.6], [h0, D, -8.4], 0.011, n.steel, {
        seg: 6,
        shadow: !1,
      });
    for (let D = -19; D < -8.4; D += 1.5)
      g(h0 - 0.02, 2.53, D - 0.012, 5.9, 2.66, D + 0.012, n.steel, 0.003, {
        shadow: !1,
      });
    for (let D of [-16.4, -12.9])
      (g(5.9 - 0.06, 2.5, D - 0.07, 5.9, 2.7, D + 0.07, n.steel, 0.008),
        i.rod([h0, 2.5, D], [h0, 1.36, D], 0.011, n.steel, {
          seg: 6,
          shadow: !1,
        }),
        g(5.9 - 0.045, 1.2, D - 0.05, 5.9, 1.36, D + 0.05, n.steel, 0.006),
        g(
          5.9 - 0.05,
          1.25,
          D - 0.012,
          5.9 - 0.044,
          1.31,
          D + 0.012,
          n.plasticBlack,
          0.002,
          {
            shadow: !1,
          },
        ));
    let y0 = -8.1;
    (g(-3.55, 1.05, y0 - 0.15, -2.85, 2.05, y0, n.steel, 0.012),
      g(-3.5, 1.1, y0 - 0.158, -2.9, 2, y0 - 0.15, n.steel, 0.006),
      g(-2.97, 1.5, y0 - 0.175, -2.94, 1.62, y0 - 0.158, n.blackMetal, 0.004));
    for (let D of [-3.42, -3.3, -3])
      i.rod([D, 2.05, y0 - 0.06], [D, A, y0 - 0.06], 0.013, n.steel, {
        seg: 6,
      });
    (g(-3.44, 1.72, y0 - 0.162, -3.1, 1.86, y0 - 0.158, n.plasticWhite, 0.002, {
      shadow: !1,
    }),
      R(0.4, A, -17.2));
  }
  let p0 = {
      bar: {
        x0: -27.9,
        x1: -12.1,
        z0: -7.9,
        z1: 9.9,
      },
      rest: {
        x0: -27.9,
        x1: -6.1,
        z0: -19.9,
        z1: -8.1,
      },
      serv: {
        x0: -5.9,
        x1: 5.9,
        z0: -19.9,
        z1: -8.1,
      },
      kit: {
        x0: 6.1,
        x1: 27.9,
        z0: -19.9,
        z1: -8.1,
      },
      corr: {
        x0: 12.1,
        x1: 15.9,
        z0: -7.9,
        z1: 9.9,
      },
      conf: {
        x0: 16.1,
        x1: 27.9,
        z0: -7.9,
        z1: -0.1,
      },
      suite: {
        x0: 16.1,
        x1: 27.9,
        z0: 0.1,
        z1: 9.9,
      },
      lobby: {
        x0: -11.9,
        x1: 11.9,
        z0: -7.9,
        z1: 9.89,
      },
    },
    t0 = (c0, Z) =>
      Z === "W"
        ? {
            axis: "x",
            face: c0.x0,
            dir: 1,
            a0: c0.z0,
            a1: c0.z1,
            wp: c0.x0 - 0.1,
          }
        : Z === "E"
          ? {
              axis: "x",
              face: c0.x1,
              dir: -1,
              a0: c0.z0,
              a1: c0.z1,
              wp: c0.x1 + 0.1,
            }
          : Z === "N"
            ? {
                axis: "z",
                face: c0.z0,
                dir: 1,
                a0: c0.x0,
                a1: c0.x1,
                wp: c0.z0 - 0.1,
              }
            : {
                axis: "z",
                face: c0.z1,
                dir: -1,
                a0: c0.x0,
                a1: c0.x1,
                wp: c0.z1 + 0.1,
              },
    M0 = {},
    f0 = (c0, Z) => c0 + Z.toFixed(2),
    _0 = (c0, Z, r0, b0) => {
      (M0[f0(c0, Z)] = M0[f0(c0, Z)] || []).push([r0, b0]);
    };
  function F0(c0, Z = 0.11, r0 = []) {
    let b0 = S(c0.axis, c0.wp)
      .map(([d0, V]) => [
        d0 - (V - d0 > 3 ? 0.28 : Z),
        V + (V - d0 > 3 ? 0.28 : Z),
      ])
      .concat(M0[f0(c0.axis, c0.face)] || [], r0);
    return T(c0.a0, c0.a1, b0);
  }
  let m0 = (c0, Z, r0, b0, d0, V) =>
      i.sweep(c0.axis, c0.face, Z, r0, b0, d0, V, {
        dir: c0.dir,
      }),
    S0 = (c0, Z, r0, b0, d0, V, B, j, s0, l0, E0) =>
      v(c0.axis, c0.face, c0.dir, Z, r0, b0, d0, V, B, j, s0, l0, E0);
  function T0(c0, Z, r0, b0, d0, V, B, j = B, s0 = 0.09) {
    (v(c0, Z, r0, b0 - s0, b0, 0, V + s0, 0, 0.018, B, "c", 0.004),
      v(c0, Z, r0, d0, d0 + s0, 0, V + s0, 0, 0.018, B, "c", 0.004),
      v(c0, Z, r0, b0 - s0, d0 + s0, V, V + s0, 0, 0.018, B, "c", 0.004),
      v(
        c0,
        Z,
        r0,
        b0 - s0 - 0.006,
        b0 - s0 + 0.022,
        0,
        V + s0 + 0.006,
        0,
        0.032,
        j,
        "c",
        0.006,
      ),
      v(
        c0,
        Z,
        r0,
        d0 + s0 - 0.022,
        d0 + s0 + 0.006,
        0,
        V + s0 + 0.006,
        0,
        0.032,
        j,
        "c",
        0.006,
      ),
      v(
        c0,
        Z,
        r0,
        b0 - s0 - 0.006,
        d0 + s0 + 0.006,
        V + s0 - 0.022,
        V + s0 + 0.006,
        0,
        0.032,
        j,
        "c",
        0.006,
      ),
      v(
        c0,
        Z,
        r0,
        b0 - s0 - 0.012,
        b0 + 0.004,
        0,
        0.17,
        0,
        0.04,
        B,
        "c",
        0.006,
      ),
      v(
        c0,
        Z,
        r0,
        d0 - 0.004,
        d0 + s0 + 0.012,
        0,
        0.17,
        0,
        0.04,
        B,
        "c",
        0.006,
      ),
      _0(c0, Z, b0 - s0 - 0.02, d0 + s0 + 0.02));
  }
  function j0(c0, Z, r0, b0, d0, V, B, j) {
    (v(c0, Z, r0, b0 - 0.26, b0, 0, V + 0.3, 0, 0.05, B, "c", 0.012),
      v(c0, Z, r0, d0, d0 + 0.26, 0, V + 0.3, 0, 0.05, B, "c", 0.012),
      v(
        c0,
        Z,
        r0,
        b0 - 0.26 - 0.05,
        d0 + 0.26 + 0.05,
        V,
        V + 0.3,
        0,
        0.065,
        B,
        "c",
        0.012,
      ),
      v(
        c0,
        Z,
        r0,
        b0 - 0.26 - 0.07,
        d0 + 0.26 + 0.07,
        V + 0.3,
        V + 0.345,
        0,
        0.085,
        j,
        "c",
        0.008,
      ));
    for (let l0 of [b0 - 0.045, d0 + 0.02])
      v(c0, Z, r0, l0, l0 + 0.025, 0.2, V, 0.05, 0.058, j, "c", 0.003);
    v(
      c0,
      Z,
      r0,
      b0 - 0.02,
      d0 + 0.02,
      V + 0.03,
      V + 0.055,
      0.065,
      0.073,
      j,
      "c",
      0.003,
    );
    for (let l0 of [b0 - 0.26 - 0.02, d0 - 0.02])
      v(c0, Z, r0, l0, l0 + 0.26 + 0.04, 0, 0.2, 0, 0.07, B, "c", 0.012);
    (v(
      c0,
      Z,
      r0,
      (b0 + d0) / 2 - 0.16,
      (b0 + d0) / 2 + 0.16,
      V + 0.06,
      V + 0.26,
      0.065,
      0.078,
      j,
      "c",
      0.01,
    ),
      _0(c0, Z, b0 - 0.26 - 0.08, d0 + 0.26 + 0.08));
  }
  function Z0(c0, Z, r0, b0, d0, V, B, j) {
    let s0 = Math.min(b0, b0 + d0 * V),
      l0 = Math.max(b0, b0 + d0 * V),
      E0 = b0 + d0 * V,
      U = 0.014,
      X = 0.058,
      N = B - 0.014,
      q = (y0, D, W) => y(c0, Z, r0, y0, D, W);
    _0(c0, Z, s0 - 0.03, l0 + 0.03);
    for (let y0 of [0.26, B * 0.5, B - 0.28])
      i.rod(
        q(b0, y0 - 0.05, X - 0.004),
        q(b0, y0 + 0.05, X - 0.004),
        0.009,
        j === "walnut" ? n.brass : n.steel,
        {
          seg: 6,
        },
      );
    if (j === "glazed") {
      (v(c0, Z, r0, s0, s0 + 0.075, 0.01, N, U, X, n.blackMetal, "c", 0.005),
        v(c0, Z, r0, l0 - 0.075, l0, 0.01, N, U, X, n.blackMetal, "c", 0.005),
        v(
          c0,
          Z,
          r0,
          s0 + 0.075,
          l0 - 0.075,
          0.01,
          0.2,
          U,
          X,
          n.blackMetal,
          "c",
          0.005,
        ),
        v(
          c0,
          Z,
          r0,
          s0 + 0.075,
          l0 - 0.075,
          N - 0.1,
          N,
          U,
          X,
          n.blackMetal,
          "c",
          0.005,
        ),
        v(
          c0,
          Z,
          r0,
          s0 + 0.075,
          l0 - 0.075,
          1.02,
          1.07,
          U + 0.006,
          X - 0.006,
          n.blackMetal,
          "c",
          0.004,
        ),
        v(
          c0,
          Z,
          r0,
          s0 + 0.075,
          l0 - 0.075,
          0.2,
          N - 0.1,
          0.033,
          0.039,
          r,
          "b",
        ));
      let D = E0 - d0 * (0.075 / 2);
      i.rod(q(D, 0.82, X + 0.05), q(D, 1.5, X + 0.05), 0.014, n.brass, {
        seg: 8,
      });
      for (let W of [0.92, 1.4])
        i.rod(q(D, W, X), q(D, W, X + 0.05), 0.008, n.brass, {
          seg: 6,
        });
      return;
    }
    let o0 = j === "steel",
      h0 = (y0, D, W) => {
        for (let [U0, $0, g0, G0] of [
          [s0 + 0.11, l0 - 0.11, y0, y0 + 0.022],
          [s0 + 0.11, l0 - 0.11, D - 0.022, D],
          [s0 + 0.11, s0 + 0.11 + 0.022, y0, D],
          [l0 - 0.11 - 0.022, l0 - 0.11, y0, D],
        ])
          v(c0, Z, r0, U0, $0, g0, G0, X, X + 0.009, W, "c", 0.004);
      };
    if (o0) {
      let y0 = (s0 + l0) / 2,
        D = d0,
        W = new Quaternion().setFromUnitVectors(Y9, M(c0, r0)),
        Y = (U0, $0, g0, G0, K0, it) => {
          let ft = q(g0, G0, K0);
          i.add(U0, $0, {
            matrix: new Matrix4().compose(
              new Vector3(ft[0], ft[1], ft[2]),
              W,
              new Vector3(1, 1, 1),
            ),
            ...(it || {}),
          });
        },
        R0 = (U0, $0, g0, G0 = 0.0052) =>
          Y(
            new CylinderGeometry(G0 * 0.72, G0, 0.0024, 6),
            n.chrome,
            U0,
            $0,
            g0 + 0.0012,
            {
              shadow: !1,
            },
          );
      v(c0, Z, r0, s0, l0, 0.01, N, U, X, n.steel, "c", 0.004);
      {
        let $0 = X + 0.0026;
        (v(
          c0,
          Z,
          r0,
          s0 + 0.004,
          l0 - 0.004,
          N - 0.024,
          N - 0.004,
          X,
          $0,
          n.steel,
          "c",
          0.0012,
        ),
          v(
            c0,
            Z,
            r0,
            s0 + 0.004,
            l0 - 0.004,
            0.014,
            0.014 + 0.024 - 0.004,
            X,
            $0,
            n.steel,
            "c",
            0.0012,
          ),
          v(
            c0,
            Z,
            r0,
            s0 + 0.004,
            s0 + 0.024,
            0.034,
            N - 0.024,
            X,
            $0,
            n.steel,
            "c",
            0.0012,
          ),
          v(
            c0,
            Z,
            r0,
            l0 - 0.024,
            l0 - 0.004,
            0.034,
            N - 0.024,
            X,
            $0,
            n.steel,
            "c",
            0.0012,
          ));
      }
      (v(
        c0,
        Z,
        r0,
        s0 + 0.041,
        l0 - 0.041,
        0.046,
        0.334,
        X,
        X + 0.0012,
        n.rubber,
        "b",
      ),
        v(
          c0,
          Z,
          r0,
          s0 + 0.045,
          l0 - 0.045,
          0.05,
          0.33,
          X,
          X + 0.0042,
          n.steel,
          "c",
          0.002,
        ));
      for (let U0 of [s0 + 0.065, y0, l0 - 0.065])
        for (let $0 of [0.07, 0.31]) R0(U0, $0, X + 0.0042);
      v(
        c0,
        Z,
        r0,
        s0 + 0.035,
        l0 - 0.035,
        0.845,
        0.915,
        X + 0.006,
        X + 0.03,
        n.rubber,
        "r",
        0.011,
      );
      for (let U0 of [s0 + 0.1, l0 - 0.1])
        (v(
          c0,
          Z,
          r0,
          U0 - 0.03,
          U0 + 0.03,
          0.835,
          0.925,
          X,
          X + 0.008,
          n.steel,
          "c",
          0.002,
        ),
          R0(U0, 0.829 + 0.004, X + 0.008, 0.0044),
          R0(U0, 0.921, X + 0.008, 0.0044));
      {
        let U0 = E0 - D * 0.215,
          $0 = E0 - D * 0.065,
          g0 = Math.min(U0, $0),
          G0 = Math.max(U0, $0);
        (v(
          c0,
          Z,
          r0,
          g0 - 0.004,
          G0 + 0.004,
          1.016,
          1.424,
          X,
          X + 0.0012,
          n.rubber,
          "b",
        ),
          v(c0, Z, r0, g0, G0, 1.02, 1.42, X, X + 0.0042, n.steel, "c", 0.002));
        for (let K0 of [g0 + 0.016, G0 - 0.016])
          for (let it of [1.036, 1.404]) R0(K0, it, X + 0.0042);
      }
      {
        (Y(
          new LatheGeometry(
            [
              [0.148 + 0.05, 0],
              [0.148 + 0.046, 0.011],
              [0.148 + 0.034, 0.0185],
              [0.148 + 0.006, 0.0185],
              [0.148, 0.0135],
              [0.148, 0.004],
            ].map(([g0, G0]) => new Vector2(g0, G0)),
            44,
          ),
          n.steel,
          y0,
          1.58,
          X,
        ),
          Y(
            new TorusGeometry(0.148 + 0.001, 0.0048, 6, 44).rotateX(Hl / 2),
            n.rubber,
            y0,
            1.58,
            X + 0.006,
            {
              shadow: !1,
            },
          ),
          Y(
            new CylinderGeometry(0.148 + 0.002, 0.148 + 0.002, 0.003, 44),
            n.plasticBlack,
            y0,
            1.58,
            X + 0.0016,
            {
              shadow: !1,
            },
          ),
          Y(
            new CircleGeometry(0.148, 44).rotateX(-Hl / 2),
            r,
            y0,
            1.58,
            X + 0.0045,
            {
              shadow: !1,
            },
          ));
        for (let g0 = 0; g0 < 8; g0++) {
          let G0 = ((g0 + 0.5) * Hl) / 4;
          R0(
            y0 + Math.cos(G0) * (0.148 + 0.02),
            1.58 + Math.sin(G0) * (0.148 + 0.02),
            X + 0.0185,
            0.0042,
          );
        }
      }
      v(
        c0,
        Z,
        r0,
        Math.min(E0, E0 - D * 0.012),
        Math.max(E0, E0 - D * 0.012),
        0.02,
        N - 0.01,
        U - 0.003,
        X + 0.005,
        n.rubber,
        "c",
        0.003,
      );
      for (let [U0, $0] of [
        [0.012, 0.05],
        [N - 0.05, N - 0.004],
      ])
        v(
          c0,
          Z,
          r0,
          Math.min(b0, b0 + D * 0.13),
          Math.max(b0, b0 + D * 0.13),
          U0,
          $0,
          X,
          X + 0.01,
          n.steel,
          "c",
          0.003,
        );
      {
        let U0 = b0 + D * 0.16,
          $0 = b0 + D * 0.44,
          g0 = N - 0.118,
          G0 = Math.min(U0, $0),
          K0 = Math.max(U0, $0);
        v(
          c0,
          Z,
          r0,
          G0,
          K0,
          g0,
          g0 + 0.06,
          X,
          X + 0.046,
          n.blackMetal,
          "r",
          0.009,
        );
        for (let it of [G0 + 0.018, K0 - 0.018])
          R0(it, g0 + 0.03, X + 0.046, 0.004);
        (i.rod(
          q(U0 + D * 0.05, g0 + 0.03, X + 0.05),
          q(U0 + D * 0.05, g0 + 0.03, X + 0.066),
          0.011,
          n.steel,
          {
            seg: 8,
          },
        ),
          i.rod(
            q(U0 + D * 0.05, g0 + 0.03, X + 0.06),
            q(b0 + D * 0.02, g0 + 0.066, X + 0.06),
            0.0065,
            n.steel,
            {
              seg: 6,
            },
          ),
          i.rod(
            q(b0 + D * 0.02, g0 + 0.066, X + 0.06),
            q(b0 - D * 0.012, g0 + 0.066, X + 0.012),
            0.0065,
            n.steel,
            {
              seg: 6,
            },
          ));
      }
    } else {
      (v(c0, Z, r0, s0, l0, 0.01, N, U, X, n.walnut, "c", 0.005),
        h0(0.34, 1.02, n.woodDark),
        h0(1.14, B - 0.2, n.woodDark),
        v(
          c0,
          Z,
          r0,
          s0 + 0.015,
          l0 - 0.015,
          0.02,
          0.22,
          X,
          X + 0.004,
          n.brass,
          "c",
          0.002,
        ));
      let y0 = E0 - d0 * 0.075;
      (i.rod(q(y0, 1.03, X), q(y0, 1.03, X + 0.05), 0.011, n.brass, {
        seg: 8,
      }),
        i.rod(
          q(y0, 1.03, X + 0.05),
          q(y0 - d0 * 0.13, 1.03, X + 0.05),
          0.009,
          n.brass,
          {
            seg: 8,
          },
        ),
        v(
          c0,
          Z,
          r0,
          y0 - 0.028,
          y0 + 0.028,
          0.9,
          1.1,
          X,
          X + 0.006,
          n.brass,
          "c",
          0.003,
        ));
    }
  }
  function lt() {
    (T0("z", -7.9, 1, 2.2, 3.6, 2.3, n.marbleDark, n.brass),
      T0("z", -8.1, -1, 2.2, 3.6, 2.3, n.steel, n.steel, 0.06),
      Z0("z", -8.1, -1, 2.2, -1, 0.7, 2.3, "steel"),
      Z0("z", -8.1, -1, 3.6, 1, 0.7, 2.3, "steel"));
    for (let c0 of [-1, 1]) {
      let Z = c0 * 11.9,
        r0 = c0 * 12.1;
      (T0("x", Z, -c0, -7, -5.4, 2.4, n.marbleDark, n.brass),
        T0("x", r0, c0, -7, -5.4, 2.4, n.woodDark, n.woodDark),
        Z0("x", r0, c0, -7, -1, 0.8, 2.4, "walnut"),
        Z0("x", r0, c0, -5.4, 1, 0.8, 2.4, "walnut"),
        j0("x", Z, -c0, 2, 6, 2.9, n.marbleDark, n.brass),
        j0("x", r0, c0, 2, 6, 2.9, n.woodDark, n.brass));
    }
    (T0("z", 9.9, -1, -21, -19, 2.5, n.woodDark, n.brass),
      T0("z", 10.1, 1, -21, -19, 2.5, n.blackMetal, n.blackMetal, 0.07),
      Z0("z", 10.1, 1, -21, -1, 0.94, 2.5, "glazed"),
      Z0("z", 10.1, 1, -19, 1, 0.94, 2.5, "glazed"),
      T0("z", -7.9, 1, -14.6, -13.1, 2.4, n.woodDark, n.brass),
      T0("z", -8.1, -1, -14.6, -13.1, 2.4, n.woodDark, n.woodDark),
      Z0("z", -8.1, -1, -14.6, -1, 0.75, 2.4, "walnut"),
      Z0("z", -8.1, -1, -13.1, 1, 0.75, 2.4, "walnut"),
      T0("x", 15.9, -1, 4, 5.1, 2.3, n.woodDark, n.brass),
      T0("x", 16.1, 1, 4, 5.1, 2.3, n.woodDark, n.woodDark),
      Z0("x", 16.1, 1, 5.1, 1, 1.05, 2.3, "walnut"),
      T0("z", -7.9, 1, 13.2, 14.8, 2.3, n.woodDark, n.woodDark),
      T0("z", -8.1, -1, 13.2, 14.8, 2.3, n.steel, n.steel, 0.06),
      Z0("z", -8.1, -1, 13.2, -1, 0.8, 2.3, "steel"),
      Z0("z", -8.1, -1, 14.8, 1, 0.8, 2.3, "steel"),
      T0("x", -6.1, -1, -15, -13.4, 2.3, n.woodDark, n.woodDark),
      T0("x", -5.9, 1, -15, -13.4, 2.3, n.steel, n.steel, 0.06),
      Z0("x", -5.9, 1, -15, -1, 0.8, 2.3, "steel"),
      Z0("x", -5.9, 1, -13.4, 1, 0.8, 2.3, "steel"),
      T0("x", 5.9, -1, -15, -13.4, 2.3, n.steel, n.steel, 0.06),
      T0("x", 6.1, 1, -15, -13.4, 2.3, n.steel, n.steel, 0.06),
      Z0("x", 6.1, 1, -15, -1, 0.8, 2.3, "steel"),
      Z0("x", 6.1, 1, -13.4, 1, 0.8, 2.3, "steel"));
    for (let [c0, Z, r0, b0] of [
      ["x", -5.9, 1, -15],
      ["x", -5.9, 1, -13.4],
      ["x", 6.1, 1, -15],
      ["x", 6.1, 1, -13.4],
      ["z", -8.1, -1, 13.2],
      ["z", -8.1, -1, 14.8],
      ["z", -8.1, -1, 2.2],
      ["z", -8.1, -1, 3.6],
    ])
      v(
        c0,
        Z,
        r0,
        b0 - 0.035,
        b0 + 0.035,
        0.02,
        1.25,
        0.018,
        0.024,
        n.chrome,
        "c",
        0.002,
      );
  }
  let H0 = [
      [0, 0],
      [0.018, 0],
      [0.018, 0.085],
      [0.013, 0.105],
      [0.006, 0.12],
      [0, 0.12],
    ],
    Y0 = [
      [0, 0],
      [0.1, 0],
      [0.1, 0.006],
      [0.062, 0.018],
      [0.032, 0.046],
      [0.014, 0.085],
      [0.008, 0.1],
      [0, 0.1],
    ],
    et = [
      [0, 0],
      [0.024, 0],
      [0.024, 0.27],
      [0.017, 0.3],
      [0, 0.3],
    ],
    ct = [
      [0, 0.3],
      [0.021, 0.3],
      [0.024, 0.312],
      [0.013, 0.326],
      [0, 0.326],
    ];
  function D0() {
    let c0 = (r0, b0, d0, V = {}) => {
      for (let B of b0) {
        let j = t0(p0[r0], B);
        for (let [s0, l0] of F0(j, 0.11, V[B] || [])) d0(j, s0, l0);
      }
    };
    (c0("bar", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, H0, n.woodDark)),
      c0("rest", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, H0, n.woodDark)),
      c0("corr", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, H0, n.woodDark)),
      c0("conf", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, H0, n.woodDark)),
      c0("suite", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, H0, n.woodDark), {
        N: [[24, 27.9]],
        E: [[0.1, 1.76]],
      }),
      c0("serv", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, Y0, n.steel)),
      c0("kit", "WENS", (r0, b0, d0) => m0(r0, b0, d0, 0, Y0, n.steel)));
    let Z = [-9.7, -6.5, 6.5, 9.7].map((r0) => [r0 - 0.74, r0 + 0.74]);
    c0(
      "lobby",
      "WEN",
      (r0, b0, d0) => {
        (m0(r0, b0, d0, 0, et, n.marbleDark), m0(r0, b0, d0, 0, ct, n.brass));
      },
      {
        N: Z,
      },
    );
  }
  let u0 = [
    [0, 0],
    [0.012, 0],
    [0.026, 0.012],
    [0.03, 0.03],
    [0.022, 0.05],
    [0.01, 0.06],
    [0, 0.06],
  ];
  function w0() {
    let c0 = [-9.7, -6.5, 6.5, 9.7].map((b0) => [b0 - 0.74, b0 + 0.74]),
      Z = (b0, d0, V = {}) => {
        let B = F0(b0, 0.11, V.more || []),
          j = (l0, E0 = 0.03) =>
            B.some(([U, X]) => l0 - E0 >= U && l0 + E0 <= X);
        for (let [l0, E0] of B)
          (m0(b0, l0, E0, 0.96, u0, n.woodDark),
            S0(b0, l0, E0, 1.02, 1.032, 0, 0.006, n.brass, "b"));
        for (let [l0, E0] of T(b0.a0, b0.a1, []))
          (S0(b0, l0, E0, 3.04, 3.07, 0, 0.012, n.brass, "c", 0.004),
            S0(b0, l0, E0, A + 0.012, A + 0.04, 0, 0.02, n.brass, "c", 0.004));
        for (let l0 of d0) {
          if (!j(l0, 0.05)) continue;
          (S0(
            b0,
            l0 - 0.03,
            l0 + 0.03,
            0.326,
            0.96,
            0,
            0.014,
            n.woodDark,
            "c",
            0.004,
          ),
            (V.upperSkip || []).some(([U, X]) => l0 > U && l0 < X) ||
              (S0(
                b0,
                l0 - 0.007,
                l0 + 0.007,
                1.035,
                3.04,
                0,
                0.005,
                n.brass,
                "b",
              ),
              S0(
                b0,
                l0 - 0.03,
                l0 + 0.03,
                3,
                3.04,
                0,
                0.009,
                n.brass,
                "c",
                0.003,
              ),
              S0(
                b0,
                l0 - 0.03,
                l0 + 0.03,
                1.035,
                1.075,
                0,
                0.009,
                n.brass,
                "c",
                0.003,
              )));
        }
        let s0 = d0.filter((l0) => j(l0, 0.05)).sort((l0, E0) => l0 - E0);
        for (let l0 = 0; l0 < s0.length - 1; l0++) {
          let E0 = s0[l0] + 0.09,
            U = s0[l0 + 1] - 0.09;
          if (!(
            U - E0 < 0.25 ||
            U - E0 > 3.4 ||
            !B.some(([X, N]) => E0 >= X && U <= N)
          ))
            for (let [X, N, q, o0] of [
              [E0, U, 0.4, 0.418],
              [E0, U, 0.87, 0.888],
              [E0, E0 + 0.018, 0.4, 0.888],
              [U - 0.018, U, 0.4, 0.888],
            ])
              S0(b0, X, N, q, o0, 0, 0.008, n.woodDark, "c", 0.003);
        }
      },
      r0 = [-7.6, -4.4, -3.3, -0.1, 0.9, 7.4, 8.6, 9.55];
    (Z(t0(p0.lobby, "W"), r0, {
      upperSkip: [[-2.9, -0.5]],
    }),
      Z(t0(p0.lobby, "E"), r0, {
        upperSkip: [[-2.9, -0.5]],
      }),
      Z(
        t0(p0.lobby, "N"),
        [
          -11.3, -10.6, -8.8, -8.1, -7.4, -5.6, -4.9, -4, -2.9, 4, 4.9, 5.6,
          7.4, 8.1, 8.8, 10.6, 11.3,
        ],
        {
          more: c0,
          upperSkip: [[-2.5, 2.5]],
        },
      ));
    for (let b0 of [-4.45, 4.45])
      P0("z", -7.9, 1, b0, 0.64, 0.58, 0.2, n.brass);
  }
  function P0(c0, Z, r0, b0, d0, V, B, j, s0 = {}) {
    (v(
      c0,
      Z,
      r0,
      b0 - V / 2,
      b0 + V / 2,
      d0 - B / 2,
      d0 + B / 2,
      0,
      0.012,
      j,
      "c",
      0.004,
    ),
      v(
        c0,
        Z,
        r0,
        b0 - V / 2 + 0.02,
        b0 + V / 2 - 0.02,
        d0 - B / 2 + 0.02,
        d0 + B / 2 - 0.02,
        0.012,
        0.0135,
        n.plasticBlack,
        "b",
      ));
    let l0 = Math.max(3, Math.round((B - 0.04) / 0.022));
    for (let E0 = 0; E0 < l0; E0++) {
      let U = d0 - B / 2 + 0.02 + ((B - 0.04) * (E0 + 0.5)) / l0;
      v(
        c0,
        Z,
        r0,
        b0 - V / 2 + 0.02,
        b0 + V / 2 - 0.02,
        U - 0.004,
        U + 0.004,
        0.012,
        0.02,
        j,
        "b",
      );
    }
  }
  function st() {
    let c0 = [
        [0, 0],
        [0.01, 0],
        [0.024, 0.012],
        [0.028, 0.03],
        [0.018, 0.048],
        [0, 0.055],
      ],
      Z = [
        [0, 0],
        [0.02, 0],
        [0.03, 0.02],
        [0.06, 0.05],
        [0.075, 0.07],
        [0.075, 0.095],
        [0, 0.095],
      ],
      r0 = [
        [0, 0],
        [0.02, 0],
        [0.02, 0.1],
        [0.014, 0.125],
        [0.006, 0.14],
        [0, 0.14],
      ],
      b0 = (B, j) => {
        (S0(B, j - 0.18, j + 0.18, Qt, 7.2, 0, 0.04, n.plaster, "c", 0.008),
          S0(
            B,
            j - 0.21,
            j + 0.21,
            Qt,
            Qt + 0.24,
            0,
            0.058,
            n.marbleDark,
            "c",
            0.01,
          ),
          S0(
            B,
            j - 0.215,
            j + 0.215,
            Qt + 0.24,
            Qt + 0.27,
            0,
            0.062,
            n.brass,
            "c",
            0.006,
          ),
          S0(B, j - 0.2, j + 0.2, 6.98, 7.02, 0, 0.055, n.brass, "c", 0.006),
          S0(
            B,
            j - 0.215,
            j + 0.215,
            7.02,
            7.2,
            0,
            0.062,
            n.plaster,
            "c",
            0.01,
          ),
          S0(
            B,
            j - 0.008,
            j + 0.008,
            Qt + 0.34,
            6.9,
            0.04,
            0.045,
            n.brass,
            "b",
          ),
          S0(B, j - 0.1, j - 0.092, Qt + 0.34, 6.9, 0.04, 0.044, n.brass, "b"),
          S0(B, j + 0.092, j + 0.1, Qt + 0.34, 6.9, 0.04, 0.044, n.brass, "b"));
      },
      d0 = (B, j, s0) => {
        for (let [l0, E0, U, X] of [
          [j, s0, 6.86, 6.878],
          [j, s0, 7.07, 7.088],
          [j, j + 0.018, 6.86, 7.088],
          [s0 - 0.018, s0, 6.86, 7.088],
        ])
          S0(B, l0, E0, U, X, 0, 0.01, n.plaster, "c", 0.004);
      };
    for (let B of [-1, 1]) {
      let j = {
          axis: "x",
          face: B * 11.94,
          dir: -B,
          a0: -7.94,
          a1: 9.89,
        },
        s0 = [-2.6, 2.4, 7.2],
        l0 = s0.map((X) => [X - 0.6, X + 0.6]);
      for (let [X, N] of T(j.a0, j.a1, l0))
        (m0(j, X, N, Qt, r0, n.brass), m0(j, X, N, Qt + 0.93, c0, n.plaster));
      m0(j, j.a0, j.a1, 6.72, c0, n.plaster);
      let E0 = [-5.1, -0.1, 4.8, 9];
      for (let X of E0) b0(j, X);
      let U = [-7.94, ...E0, 9.89];
      for (let X = 0; X < U.length - 1; X++) {
        let N = U[X] + (X ? 0.3 : 0.12),
          q = U[X + 1] - (X < U.length - 2 ? 0.3 : 0.12);
        q - N > 0.5 && d0(j, N, q);
      }
      for (let X of s0) {
        (m0(j, X - 0.66, X + 0.66, Qt + 2.25, Z, n.plaster),
          S0(
            j,
            X - 0.6,
            X + 0.6,
            Qt + 2.345,
            Qt + 2.36,
            0,
            0.08,
            n.brass,
            "c",
            0.004,
          ));
        for (let [o0, h0] of [
          [Qt + 0.32, Qt + 0.98],
          [Qt + 1.1, Qt + 1.98],
        ])
          for (let [y0, D, W, Y] of [
            [X - 0.36, X + 0.36, o0, o0 + 0.02],
            [X - 0.36, X + 0.36, h0 - 0.02, h0],
            [X - 0.36, X - 0.34, o0, h0],
            [X + 0.34, X + 0.36, o0, h0],
          ])
            S0(j, y0, D, W, Y, 0.04, 0.05, n.woodDark, "c", 0.004);
        S0(
          j,
          X - 0.48,
          X + 0.48,
          Qt + 0.02,
          Qt + 0.2,
          0.04,
          0.044,
          n.brass,
          "c",
          0.002,
        );
        let N = X + 0.4,
          q = (o0, h0, y0) => y(j.axis, j.face, j.dir, o0, h0, y0);
        (S0(
          j,
          N - 0.03,
          N + 0.03,
          Qt + 0.9,
          Qt + 1.13,
          0.04,
          0.047,
          n.brass,
          "c",
          0.003,
        ),
          i.rod(
            q(N, Qt + 1.02, 0.047),
            q(N, Qt + 1.02, 0.095),
            0.011,
            n.brass,
            {
              seg: 8,
            },
          ),
          i.rod(
            q(N, Qt + 1.02, 0.095),
            q(N - 0.13, Qt + 1.02, 0.095),
            0.009,
            n.brass,
            {
              seg: 8,
            },
          ),
          S0(
            j,
            X + 0.66,
            X + 0.72,
            Qt + 1.05,
            Qt + 1.19,
            0,
            0.018,
            n.plasticBlack,
            "c",
            0.004,
          ),
          S0(
            j,
            X + 0.682,
            X + 0.698,
            Qt + 1.15,
            Qt + 1.162,
            0.018,
            0.0195,
            n.ledStrip,
            "b",
          ),
          i.cyl(
            ...q(X, Qt + 1.55, 0.04).map((o0, h0) =>
              h0 === 1 ? o0 - 0.004 : o0,
            ),
            0.012,
            0.008,
            n.brass,
            {
              seg: 8,
            },
          ));
      }
    }
    let V = {
      axis: "z",
      face: -7.94,
      dir: 1,
      a0: -11.94,
      a1: 11.94,
    };
    (m0(V, V.a0, V.a1, Qt, r0, n.brass),
      m0(V, V.a0, V.a1, Qt + 0.93, c0, n.plaster));
    for (let [B, j] of [
      [-11.94, -4.6],
      [4.6, 11.94],
    ])
      m0(V, B, j, 6.72, c0, n.plaster);
    for (let B of [-8.2, -4.6, 4.6, 8.2]) b0(V, B);
    for (let [B, j] of [
      [-11.8, -8.5],
      [-7.9, -4.9],
      [4.9, 7.9],
      [8.5, 11.8],
    ])
      d0(V, B, j);
    for (let B of [-6.4, 6.4]) J0("z", -7.94, 1, B, Qt + 2.66, 1.5);
  }
  function J0(c0, Z, r0, b0, d0, V) {
    let B = (j, s0, l0) => y(c0, Z, r0, j, s0, l0);
    (v(
      c0,
      Z,
      r0,
      b0 - 0.06,
      b0 + 0.06,
      d0 - 0.03,
      d0 + 0.03,
      0,
      0.012,
      n.brass,
      "c",
      0.004,
    ),
      i.rod(B(b0, d0, 0.012), B(b0, d0 + 0.03, 0.16), 0.008, n.brass, {
        seg: 6,
      }),
      i.rod(
        B(b0 - V / 2, d0 + 0.03, 0.16),
        B(b0 + V / 2, d0 + 0.03, 0.16),
        0.02,
        n.brass,
        {
          seg: 8,
        },
      ),
      v(
        c0,
        Z,
        r0,
        b0 - V / 2 + 0.03,
        b0 + V / 2 - 0.03,
        d0 + 0.008,
        d0 + 0.013,
        0.148,
        0.172,
        n.bulbWarm,
        "b",
      ),
      s.addGlow(
        new Vector3(...B(b0, d0 - 0.55, 0.05)),
        M(c0, r0),
        V * 1.5,
        1.3,
        16763024,
        0.18,
      ));
  }
  function q0() {
    let c0 = A - 0.13,
      Z = (r0, b0) => {
        for (let [d0, V] of F0(r0, 0.14, b0)) {
          let B = Math.max(1, Math.round((V - d0) / 0.9));
          for (let j = 0; j <= B; j++) {
            let s0 = d0 + 0.06 + ((V - d0 - 0.12) * j) / B;
            S0(r0, s0 - 0.005, s0 + 0.005, 0.12, c0, 0, 0.004, n.brass, "b");
          }
          S0(r0, d0, V, 2.42, 2.432, 0, 0.004, n.brass, "b");
        }
      };
    (Z(t0(p0.bar, "W"), [[-1.2, 9.2]]),
      Z(t0(p0.bar, "S"), [
        [-27.2, -22.8],
        [-16.1, -13.9],
      ]),
      Z(t0(p0.bar, "E"), []),
      P0("x", -12.1, -1, -3, 2.86, 1, 0.26, n.blackMetal));
  }
  function v0(c0, Z, r0 = !0, b0 = []) {
    if (r0)
      for (let [d0, V] of F0(c0, 0.11, b0)) m0(c0, d0, V, 0.93, u0, n.plaster);
    for (let [d0, V] of Z)
      for (let [B, j] of [
        [0.24, 0.8],
        [1.12, 2.86],
      ])
        for (let [s0, l0, E0, U] of [
          [d0, V, B, B + 0.03],
          [d0, V, j - 0.03, j],
          [d0, d0 + 0.03, B, j],
          [V - 0.03, V, B, j],
        ])
          S0(c0, s0, l0, E0, U, 0, 0.012, n.plaster, "c", 0.005);
  }
  function x0() {
    (v0(t0(p0.rest, "S"), [
      [-27.6, -25.5],
      [-24.5, -21.3],
      [-18.7, -15.75],
      [-11.9, -10],
      [-9, -6.4],
    ]),
      v0(t0(p0.rest, "E"), [
        [-19.6, -17.5],
        [-17.2, -15.3],
        [-13.1, -12.05],
      ]),
      J0("z", -8.1, -1, -20, 2.62, 1),
      J0("x", -6.1, -1, -10.6, 2.76, 1.5),
      P0("z", -8.1, -1, -20, 3, 0.9, 0.2, n.plasticWhite));
  }
  function C0() {
    let c0 = (Z, r0) => {
      for (let [b0, d0] of F0(Z, 0.11, r0)) {
        (S0(Z, b0, d0, 0.12, 0.98, 0, 0.012, n.walnut, "b"),
          m0(Z, b0, d0, 0.98, u0, n.woodDark),
          S0(Z, b0, d0, 0.12, 0.2, 0.012, 0.024, n.woodDark, "c", 0.004),
          S0(Z, b0, d0, 0.9, 0.98, 0.012, 0.024, n.woodDark, "c", 0.004));
        let V = Math.max(1, Math.round((d0 - b0) / 0.8));
        for (let B = 0; B <= V; B++) {
          let j = b0 + 0.035 + ((d0 - b0 - 0.07) * B) / V;
          S0(
            Z,
            j - 0.035,
            j + 0.035,
            0.2,
            0.9,
            0.012,
            0.024,
            n.woodDark,
            "c",
            0.004,
          );
        }
      }
    };
    for (let Z of "WENS") c0(t0(p0.corr, Z), []);
    (J0("x", 15.9, -1, 7.6, 2.5, 1),
      P0("z", 9.9, -1, 14, 2.9, 0.8, 0.2, n.plasticWhite));
  }
  function k0() {
    let Z = [-7.4, -6, -4.6, -3.4, -2, -0.6];
    for (let r0 of Z) {
      (g(
        16 - 0.056,
        0,
        r0 - 0.056,
        16 + 0.056,
        2.72,
        r0 + 0.056,
        n.blackMetal,
        0.009,
      ),
        g(
          16 - 0.075,
          0,
          r0 - 0.075,
          16 + 0.075,
          0.1,
          r0 + 0.075,
          n.blackMetal,
          0.012,
        ),
        g(
          16 - 0.078,
          0.1,
          r0 - 0.078,
          16 + 0.078,
          0.112,
          r0 + 0.078,
          n.brass,
          0.004,
        ));
      for (let b0 of [-1, 1])
        b(
          16 + b0 * 0.0562 - 6e-4,
          0.13,
          r0 - 0.012,
          16 + b0 * 0.0562 + 6e-4,
          2.7,
          r0 + 0.012,
          n.brass,
          {
            shadow: !1,
          },
        );
    }
    for (let [r0, b0] of [
      [-7.4, -6],
      [-6, -4.6],
      [-3.4, -2],
      [-2, -0.6],
    ]) {
      g(
        16 - 0.028,
        0,
        r0 + 0.056,
        16 + 0.028,
        0.045,
        b0 - 0.056,
        n.blackMetal,
        0.006,
      );
      for (let d0 of [-1, 1])
        b(
          16 + d0 * 0.0285 - 5e-4,
          0.03,
          r0 + 0.06,
          16 + d0 * 0.0285 + 5e-4,
          0.04,
          b0 - 0.06,
          n.brass,
          {
            shadow: !1,
          },
        );
    }
    g(16 - 0.062, 2.7, -7.47, 16 + 0.062, 2.83, -0.53, n.blackMetal, 0.01);
    for (let r0 of [-1, 1])
      b(
        16 + r0 * 0.0625 - 6e-4,
        2.712,
        -7.44,
        16 + r0 * 0.0625 + 6e-4,
        2.726,
        -0.56,
        n.brass,
        {
          shadow: !1,
        },
      );
    b(16 - 0.03, 5e-4, -4.544, 16 + 0.03, 0.004, -3.456, n.brass, {
      faces: "b",
    });
    for (let r0 of [-4.6, -3.4])
      for (let b0 of [-1, 1]) {
        let d0 = 16 + b0 * 0.1;
        i.rod([d0, 0.86, r0], [d0, 1.46, r0], 0.013, n.brass, {
          seg: 10,
        });
        for (let V of [0.94, 1.38])
          i.rod([16 + b0 * 0.056, V, r0], [d0, V, r0], 0.008, n.brass, {
            seg: 8,
          });
        for (let V of [0.86, 1.46])
          i.add(new SphereGeometry(0.013, 10, 6), n.brass, {
            matrix: p.makeTranslation(d0, V, r0),
          });
      }
  }
  function O0() {
    for (let c0 of t.railings) {
      let { axis: Z, pos: r0, a0: b0, a1: d0, y: V, h: B, n: j } = c0,
        s0 = (d0 - b0) / j,
        l0 = (E0, U, X, N, q, o0, h0, y0) => {
          h0 === "b"
            ? Z === "x"
              ? b(r0 - q, X, E0, r0 + q, N, U, o0)
              : b(E0, X, r0 - q, U, N, r0 + q, o0)
            : Z === "x"
              ? h0 === "r"
                ? i.bbox(r0 - q, X, E0, r0 + q, N, U, o0, {
                    r: y0,
                    seg: 2,
                  })
                : g(r0 - q, X, E0, r0 + q, N, U, o0, y0)
              : h0 === "r"
                ? i.bbox(E0, X, r0 - q, U, N, r0 + q, o0, {
                    r: y0,
                    seg: 2,
                  })
                : g(E0, X, r0 - q, U, N, r0 + q, o0, y0);
        };
      (l0(
        b0 - 0.004,
        d0 + 0.004,
        V + B - 0.052,
        V + B + 0.006,
        0.036,
        n.brass,
        "r",
        0.02,
      ),
        l0(b0, d0, V - 0.002, V + 0.078, 0.041, n.blackMetal, "c", 0.008),
        l0(
          b0 + 0.01,
          d0 - 0.01,
          V + 0.076,
          V + 0.082,
          0.03,
          n.brass,
          "c",
          0.002,
        ));
      for (let E0 = 0; E0 <= j; E0++) {
        let U = Math.min(d0 - 0.024, Math.max(b0 + 0.024, b0 + E0 * s0));
        (l0(
          U - 0.024,
          U + 0.024,
          V + 0.08,
          V + B - 0.05,
          0.024,
          n.brass,
          "c",
          0.006,
        ),
          l0(U - 0.04, U + 0.04, V + 0.078, V + 0.1, 0.044, n.brass, "b"),
          l0(
            U - 0.045,
            U + 0.045,
            V + B - 0.078,
            V + B - 0.05,
            0.04,
            n.brass,
            "b",
          ),
          E0 > 0 &&
            E0 < j &&
            l0(
              U - 0.014,
              U + 0.014,
              V + B - 0.056,
              V + B + 0.009,
              0.039,
              n.brass,
              "b",
            ));
      }
    }
  }
  function B0() {
    let c0 = t0(p0.conf, "N");
    for (let r0 = 16.7; r0 < 27.2; r0 += 1.18)
      i.bbox(
        r0,
        0.36,
        c0.face,
        r0 + 1.15,
        2.92,
        c0.face + 0.035,
        n.fabricCharcoal,
        {
          r: 0.014,
          seg: 1,
        },
      );
    (S0(c0, 16.6, 27.4, 0.3, 0.33, 0, 0.045, n.steel, "c", 0.004),
      S0(c0, 16.6, 27.4, 2.95, 2.98, 0, 0.045, n.steel, "c", 0.004));
    let Z = t0(p0.conf, "S");
    S0(Z, 20.3, 23.7, 0.45, 2.85, 0, 0.016, n.walnut, "c", 0.006);
    for (let [r0, b0, d0, V] of [
      [20.28, 23.72, 0.43, 0.45],
      [20.28, 23.72, 2.85, 2.87],
      [20.28, 20.3, 0.43, 2.87],
      [23.7, 23.72, 0.43, 2.87],
    ])
      S0(Z, r0, b0, d0, V, 0, 0.02, n.brass, "c", 0.004);
    S0(Z, 20.4, 23.6, 0.5, 0.515, 0.016, 0.03, n.ledStrip, "b");
  }
  function ot() {
    let c0 = t0(p0.suite, "N");
    S0(c0, 19.1, 23.9, 0.2, 1.62, 0, 0.03, n.woodDark, "c", 0.008);
    for (let r0 = 19.2; r0 < 23.75; r0 += 0.23)
      i.bbox(
        r0,
        0.3,
        c0.face + 0.03,
        r0 + 0.22,
        1.52,
        c0.face + 0.085,
        n.velvetTeal,
        {
          r: 0.03,
          seg: 1,
        },
      );
    S0(c0, 19.1, 23.9, 1.62, 1.645, 0, 0.04, n.brass, "c", 0.004);
    for (let r0 of [19.95, 23.05])
      (S0(
        c0,
        r0 - 0.045,
        r0 + 0.045,
        0.92,
        1,
        0.085,
        0.092,
        n.brass,
        "c",
        0.003,
      ),
        i.rod(
          [r0, 1.38, c0.face + 0.085],
          [r0, 1.42, c0.face + 0.19],
          0.008,
          n.brass,
          {
            seg: 6,
          },
        ),
        i.cyl(r0, 1.375, c0.face + 0.19, 0.022, 0.05, n.brass, {
          seg: 8,
          r2: 0.03,
        }));
    let Z = t0(p0.suite, "W");
    S0(Z, 6.6, 8.6, 0.5, 2.55, 0, 0.014, n.walnut, "c", 0.006);
    for (let [r0, b0, d0, V] of [
      [6.58, 8.62, 0.48, 0.5],
      [6.58, 8.62, 2.55, 2.57],
    ])
      S0(Z, r0, b0, d0, V, 0, 0.018, n.brass, "c", 0.004);
    (S0(c0, 26.34, 27.9, 0.02, 2.34, 0, 0.01, n.kitchenTile, "b"),
      S0(t0(p0.suite, "E"), 0.1, 1.72, 0.02, 2.34, 0, 0.01, n.kitchenTile, "b"),
      i.rod([27.82, 2.05, 0.9], [27.5, 2.1, 0.9], 0.012, n.chrome, {
        seg: 8,
      }),
      i.cyl(27.5, 2.06, 0.9, 0.11, 0.02, n.chrome, {
        seg: 16,
      }),
      i.rod([27.86, 0.95, 0.9], [27.86, 2.05, 0.9], 0.012, n.chrome, {
        seg: 8,
      }),
      S0(
        t0(p0.suite, "E"),
        0.82,
        0.98,
        1,
        1.16,
        0.01,
        0.04,
        n.chrome,
        "c",
        0.008,
      ));
  }
  function Q0(c0, Z, r0, b0, d0, V, B, j, s0 = {}) {
    let l0 = s0.off ?? 0.15,
      E0 = s0.fold ?? 0.085,
      U = s0.amp ?? 0.032,
      X = s0.seed ?? 0,
      N = s0.tie ?? 1.12,
      q = s0.anchor ?? b0,
      o0 = d0 - b0,
      h0 = Math.max(10, Math.ceil(o0 / 0.018)),
      y0 = 7,
      D = 0.012,
      W = (h0 + 1) * (y0 + 1),
      Y = new Float32Array(W * 6),
      R0 = [];
    for (let $0 = 0; $0 <= y0; $0++)
      for (let g0 = 0; g0 <= h0; g0++) {
        let G0 = g0 / h0,
          K0 = $0 / y0,
          it = V + K0 * (B - V),
          ft =
            s0.tie === 0
              ? 1
              : 1 - 0.45 * Math.exp(-Math.pow((it - N) / 0.28, 2)),
          gt = q + (b0 + G0 * o0 - q) * ft,
          rt = ((G0 * o0) / E0) * Hl * 2 + X,
          dt =
            (Math.sin(rt) + 0.3 * Math.sin(rt * 2.3 + 1.7 + X)) *
            U *
            (0.8 + 0.4 * (1 - K0)) *
            (0.55 + 0.45 * ft),
          tt = $0 * (h0 + 1) + g0;
        (Y.set(y(c0, Z, r0, gt, it, l0 + dt), tt * 3),
          Y.set(y(c0, Z, r0, gt, it, l0 + dt - D), (W + tt) * 3));
      }
    for (let $0 = 0; $0 < y0; $0++)
      for (let g0 = 0; g0 < h0; g0++) {
        let G0 = $0 * (h0 + 1) + g0,
          K0 = G0 + 1,
          it = G0 + h0 + 1,
          ft = it + 1;
        R0.push(
          G0,
          K0,
          ft,
          G0,
          ft,
          it,
          W + G0,
          W + ft,
          W + K0,
          W + G0,
          W + it,
          W + ft,
        );
      }
    let U0 = new BufferGeometry();
    if (
      (U0.setAttribute("position", new BufferAttribute(Y, 3)),
      U0.setIndex(R0),
      U0.computeVertexNormals(),
      i.add(U0, j),
      s0.tie !== 0)
    ) {
      let $0 = q === b0 ? d0 : b0,
        g0 = q + ($0 - q) * 0.55,
        G0 = Math.min(q, g0) - 0.01,
        K0 = Math.max(q, g0) + 0.01;
      (v(
        c0,
        Z,
        r0,
        G0,
        K0,
        N - 0.03,
        N + 0.03,
        l0 - U - 0.022,
        l0 + U + 0.012,
        j,
        "c",
        0.01,
      ),
        i.rod(
          y(c0, Z, r0, q, N, 0),
          y(c0, Z, r0, q, N, l0 - U),
          0.007,
          n.brass,
          {
            seg: 6,
          },
        ),
        i.add(new SphereGeometry(0.016, 8, 6), n.brass, {
          matrix: new Matrix4().makeTranslation(
            ...y(c0, Z, r0, q, N, l0 - U - 0.005),
          ),
        }));
    }
  }
  function nt() {
    for (let c0 of t.windows) {
      let { axis: Z, pos: r0, a0: b0, a1: d0, y0: V, y1: B } = c0,
        j = Z === "x" ? (r0 < 0 ? 1 : -1) : r0 > 0 ? -1 : 1,
        s0 = r0 + j * 0.1,
        l0 = r0 - j * 0.1,
        E0 =
          Z === "z"
            ? r0 > 0
              ? b0 < 0
                ? "bar"
                : "suite"
              : "rest"
            : r0 < 0
              ? b0 > -8
                ? "bar"
                : "rest"
              : b0 < 0
                ? "conf"
                : "suite",
        U = E0 === "bar" ? n.blackMetal : n.woodDark,
        X =
          E0 === "bar"
            ? n.marbleDark
            : E0 === "rest"
              ? n.woodDark
              : n.marbleFloor;
      (v(Z, s0, j, b0 - 0.075, b0, V - 0.02, B + 0.075, 0, 0.02, U, "c", 0.005),
        v(
          Z,
          s0,
          j,
          d0,
          d0 + 0.075,
          V - 0.02,
          B + 0.075,
          0,
          0.02,
          U,
          "c",
          0.005,
        ),
        v(
          Z,
          s0,
          j,
          b0 - 0.075,
          d0 + 0.075,
          B,
          B + 0.075,
          0,
          0.02,
          U,
          "c",
          0.005,
        ),
        v(
          Z,
          s0,
          j,
          b0 - 0.1,
          d0 + 0.1,
          B + 0.075,
          B + 0.1,
          0,
          0.034,
          U,
          "c",
          0.006,
        ),
        v(
          Z,
          s0,
          j,
          b0 - 0.11,
          d0 + 0.11,
          V - 0.045,
          V,
          -0.02,
          0.075,
          X,
          "r",
          0.014,
        ),
        v(
          Z,
          s0,
          j,
          b0 - 0.075,
          d0 + 0.075,
          V - 0.13,
          V - 0.045,
          0,
          0.016,
          U,
          "c",
          0.005,
        ),
        v(
          Z,
          l0,
          -j,
          b0 - 0.06,
          b0,
          V,
          B + 0.06,
          0,
          0.09,
          n.blackMetal,
          "c",
          0.006,
        ),
        v(
          Z,
          l0,
          -j,
          d0,
          d0 + 0.06,
          V,
          B + 0.06,
          0,
          0.09,
          n.blackMetal,
          "c",
          0.006,
        ),
        v(
          Z,
          l0,
          -j,
          b0 - 0.06,
          d0 + 0.06,
          B,
          B + 0.06,
          0,
          0.11,
          n.blackMetal,
          "c",
          0.006,
        ),
        v(
          Z,
          l0,
          -j,
          b0 - 0.08,
          d0 + 0.08,
          V - 0.04,
          V,
          0,
          0.13,
          n.blackMetal,
          "c",
          0.008,
        ));
      let N =
          E0 === "bar"
            ? A - 0.13
            : E0 === "rest"
              ? A - 0.16
              : E0 === "conf"
                ? A - 0.12
                : A - 0.14,
        q = p0[E0],
        o0 = (Z === "x" ? q.z0 : q.x0) + 0.03,
        h0 = (Z === "x" ? q.z1 : q.x1) - 0.03,
        y0 = Math.max(o0, b0 - 0.66),
        D = Math.min(h0, d0 + 0.66);
      (v(
        Z,
        s0,
        j,
        y0,
        D,
        N - 0.14,
        N,
        0.02,
        0.25,
        E0 === "bar"
          ? n.woodDark
          : E0 === "conf"
            ? n.fabricCharcoal
            : n.woodDark,
        "c",
        0.01,
      ),
        v(
          Z,
          s0,
          j,
          y0,
          D,
          N - 0.15,
          N - 0.14,
          0.235,
          0.255,
          n.brass,
          "c",
          0.004,
        ));
      let W =
          E0 === "bar"
            ? l
            : E0 === "rest"
              ? n.velvetTeal
              : E0 === "conf"
                ? n.fabricCharcoal
                : n.fabricCream,
        Y = N - 0.1,
        R0 = Math.max(o0, b0 - 0.57),
        U0 = Math.min(h0, d0 + 0.57),
        $0 = r0 * 3.1 + b0;
      (Q0(Z, s0, j, R0, b0 + 0.012, 0.03, Y, W, {
        anchor: R0,
        seed: $0,
      }),
        Q0(Z, s0, j, d0 - 0.012, U0, 0.03, Y, W, {
          anchor: U0,
          seed: $0 + 2.1,
        }),
        E0 === "suite" &&
          (Q0(
            Z,
            s0,
            j,
            R0,
            Math.min(b0 + 0.012, R0 + 0.34),
            0.03,
            Y,
            n.fabricCharcoal,
            {
              anchor: R0,
              seed: $0 + 4,
              off: 0.09,
              tie: 0,
              amp: 0.024,
            },
          ),
          Q0(
            Z,
            s0,
            j,
            Math.max(d0 - 0.012, U0 - 0.34),
            U0,
            0.03,
            Y,
            n.fabricCharcoal,
            {
              anchor: U0,
              seed: $0 + 5,
              off: 0.09,
              tie: 0,
              amp: 0.024,
            },
          )));
    }
  }
  for (let c0 of t.stairs) C(c0);
  for (let c0 of t.columns) L(c0);
  (O(),
    H(),
    F(),
    I(),
    G(),
    K(),
    $(),
    n0(),
    e0(),
    lt(),
    D0(),
    w0(),
    st(),
    q0(),
    x0(),
    C0(),
    B0(),
    k0(),
    O0(),
    ot(),
    nt(),
    ht(),
    pt(),
    V0());
  function L0(c0, Z, r0, b0, d0) {
    let B = 10.11 + b0;
    (g(c0, r0, 10.11, Z, r0 + 0.07, B, n.blackMetal, 0.012),
      b(
        c0 - 0.006,
        r0 + 0.02,
        B - 0.004,
        Z + 0.006,
        r0 + 0.045,
        B + 0.006,
        n.brass,
      ),
      b(c0 - 0.006, r0 + 0.02, 10.11, c0 + 0.004, r0 + 0.045, B, n.brass),
      b(Z - 0.004, r0 + 0.02, 10.11, Z + 0.006, r0 + 0.045, B, n.brass));
    for (let j of [c0 + 0.12, Z - 0.12])
      i.rod(
        [j, r0 + 0.07, B - 0.12],
        [j, r0 + 0.07 + b0 * 0.55, 10.11],
        0.009,
        n.blackMetal,
        {
          seg: 6,
        },
      );
    for (let j = 0; j < d0; j++) {
      let s0 = c0 + ((Z - c0) * (j + 0.5)) / d0;
      E(s0, r0, (10.11 + B) / 2 + 0.05, {
        r: 0.045,
      });
    }
    s.addGlow(
      new Vector3((c0 + Z) / 2, 0.012, 10.11 + b0 * 0.62),
      Y9,
      (Z - c0) * 1.25,
      b0 * 2.4,
      16757866,
      0.2,
    );
  }
  function ht() {
    for (let Z = 0; Z <= 12; Z++) {
      let r0 = -12 + Z * 2;
      (b(
        r0 - 0.05,
        0.1,
        10 + 0.11,
        r0 + 0.05,
        Js - 0.1,
        10 + 0.125,
        n.blackMetal,
      ),
        b(
          r0 - 0.022,
          0.1,
          10 + 0.125,
          r0 + 0.022,
          Js - 0.1,
          10 + 0.2,
          n.blackMetal,
        ),
        b(
          r0 - 0.02,
          0.13,
          10 - 0.122,
          r0 + 0.02,
          Js - 0.1,
          10 - 0.11,
          n.brass,
        ));
    }
    (g(-10, 3.35, 10 + 0.1, 10, 3.43, 10 + 0.26, n.blackMetal, 0.01),
      b(-10, 3.43, 10 + 0.1, 10, 3.445, 10 + 0.2, n.brass),
      b(-11.93, 3.385, 10 - 0.122, 11.93, 3.415, 10 - 0.1, n.brass));
    for (let Z = 1; Z <= 10; Z++) {
      let r0 = -12 + Z * 2 + 0.07,
        b0 = -10 + Z * 2 - 0.07;
      (b(r0, 5.655, 10 - 0.035, b0, 5.705, 10 + 0.035, n.blackMetal),
        b(r0, 5.665, 10 + 0.035, b0, 5.695, 10 + 0.09, n.blackMetal));
    }
    for (let [Z, r0] of [
      [-9.93, -8.07],
      [-5.93, 5.93],
      [8.07, 9.93],
    ])
      (g(Z, 0, 10 + 0.11, r0, 0.13, 10 + 0.25, n.marbleDark, 0.012),
        g(Z, 0, 10 - 0.25, r0, 0.13, 10 - 0.11, n.marbleDark, 0.012),
        b(Z, 0.13, 10 - 0.25, r0, 0.142, 10 - 0.11, n.brass));
    for (let Z of [-1, 1]) {
      let r0 = Math.min(Z * 11.93, Z * 10.07),
        b0 = Math.max(Z * 11.93, Z * 10.07);
      (g(r0, Qt, 10 - 0.13, r0 + 0.08, 6.2, 10 + 0.13, n.brass, 0.008),
        g(b0 - 0.08, Qt, 10 - 0.13, b0, 6.2, 10 + 0.13, n.brass, 0.008),
        g(r0, 6.14, 10 - 0.13, b0, 6.3, 10 + 0.13, n.brass, 0.008),
        b(r0 + 0.08, Qt, 10 - 0.1, b0 - 0.08, Qt + 0.012, 10 + 0.1, n.brass));
    }
    for (let Z of [-7, 7]) {
      let r0 = Z - 0.93,
        b0 = Z + 0.93;
      (g(r0, 0, 10 - 0.14, r0 + 0.09, 2.7, 10 + 0.14, n.brass, 0.01),
        g(b0 - 0.09, 0, 10 - 0.14, b0, 2.7, 10 + 0.14, n.brass, 0.01),
        g(r0, 2.64, 10 - 0.14, b0, 2.8, 10 + 0.14, n.brass, 0.01),
        b(r0 + 0.09, 0, 10 - 0.11, b0 - 0.09, 0.012, 10 + 0.11, n.steel));
      for (let d0 of [r0 + 0.045, b0 - 0.045])
        for (let V of [-1, 1]) {
          let B = 10 + V * 0.2;
          i.rod([d0, 0.55, B], [d0, 1.8, B], 0.016, n.brass, {
            seg: 8,
          });
          for (let j of [0.72, 1.63])
            i.rod([d0, j, 10 + V * 0.14], [d0, j, B], 0.009, n.brass, {
              seg: 6,
            });
        }
      for (let [d0, V] of [
        [8.5, 9.72],
        [10.3, 11.5],
      ]) {
        let B = Z - 0.8,
          j = Z + 0.8;
        b(B, 0.001, d0, j, 0.007, V, n.rubber, {
          faces: "b",
        });
        for (let [s0, l0, E0, U] of [
          [B - 0.03, d0 - 0.03, j + 0.03, d0],
          [B - 0.03, V, j + 0.03, V + 0.03],
          [B - 0.03, d0, B, V],
          [j, d0, j + 0.03, V],
        ])
          b(s0, 0.001, l0, E0, 0.009, U, n.steel, {
            faces: "b",
          });
        for (let s0 = d0 + 0.05; s0 < V - 0.03; s0 += 0.075)
          b(B + 0.02, 0.007, s0, j - 0.02, 0.0095, s0 + 0.03, n.steel, {
            faces: "b",
          });
      }
      L0(Z - 1.15, Z + 1.15, 2.86, 0.95, 3);
    }
    (L0(-21.25, -18.75, 2.66, 0.85, 2),
      b(-12.3, 7.865, 10.4, 12.3, 7.885, 10.43, n.brass));
    for (let Z = -11; Z <= 11.01; Z += 2)
      E(Z, 7.88, 10.27, {
        r: 0.04,
      });
  }
  function pt() {
    for (let [b0, d0] of [
      [-28, -12.02],
      [12.02, 28],
    ])
      (g(b0, Ye - 0.01, 10, d0, Ye + 0.07, 10.14, n.blackMetal, 0.012),
        b(b0, Ye + 0.07, 10, d0, Ye + 0.085, 10.09, n.brass));
    let c0 = [1, 0, 0, 1, 0, 1, 0, 0];
    for (let b0 of [-1, 1]) {
      let d0 = b0 < 0 ? -27 : 13;
      for (let V = 0; V <= 4; V++) {
        let B =
          V === 0
            ? d0 - 0.62
            : V === 4
              ? d0 + 11.399999999999999 + 2.6 + 0.62
              : d0 + V * 3.8 - 0.6;
        g(B - 0.07, Ye + 0.085, 10, B + 0.07, 8.6, 10.06, n.blackMetal, 0.008);
      }
      for (let V of [4.25, 7.8])
        b(
          b0 < 0 ? -28 : 12.1,
          V,
          10,
          b0 < 0 ? -12.1 : 28,
          V + 0.03,
          10.014,
          n.blackMetal,
        );
      for (let V = 0; V < 4; V++) {
        let B = d0 + V * 3.8,
          j = B + 2.6,
          s0 = c0[(V + (b0 > 0 ? 4 : 0)) % 8];
        (g(B - 0.07, 4.5, 10, B, 7.5, 10.1, n.blackMetal, 0.008),
          g(j, 4.5, 10, j + 0.07, 7.5, 10.1, n.blackMetal, 0.008),
          g(B - 0.1, 7.44, 10, j + 0.1, 7.53, 10.14, n.blackMetal, 0.008),
          g(B - 0.1, 4.5, 10, j + 0.1, 4.57, 10.16, n.blackMetal, 0.008),
          b(
            (B + j) / 2 - 0.025,
            4.6,
            10.04,
            (B + j) / 2 + 0.025,
            7.4,
            10.075,
            n.blackMetal,
          ),
          b(B, 6.62, 10.04, j, 6.66, 10.07, n.blackMetal));
        let l0 = s0 ? n.fabricCharcoal : n.fabricCream;
        for (let [E0, U] of [
          [B + 0.02, B + 0.4],
          [j - 0.4, j - 0.02],
        ])
          for (let X = 0; X < 5; X++) {
            let N = E0 + ((U - E0) * X) / 5;
            b(
              N,
              4.62,
              10.041,
              N + (U - E0) / 5 - 0.012,
              7.38,
              10.046 + (X % 2) * 0.006,
              l0,
            );
          }
        if (s0)
          for (let E0 = 7.34; E0 > 6.3; E0 -= 0.075)
            b(
              B + 0.42,
              E0,
              10.041,
              j - 0.42,
              E0 + 0.045,
              10.045,
              n.fabricCharcoal,
            );
        (b(B - 0.02, 4.62, 10.2, j + 0.02, 5.62, 10.212, r),
          i.rod(
            [B - 0.05, 5.65, 10.206],
            [j + 0.05, 5.65, 10.206],
            0.018,
            n.steel,
            {
              seg: 8,
            },
          ));
        for (let E0 of [B - 0.04, j + 0.04])
          (b(E0 - 0.012, 4.57, 10.19, E0 + 0.012, 5.65, 10.222, n.steel),
            b(E0 - 0.012, 5.2, 10.1, E0 + 0.012, 5.224, 10.2, n.steel));
        b(B - 0.05, 4.57, 10.16, j + 0.05, 4.61, 10.225, n.steel);
      }
    }
    (g(18.06, 0, 10.1, 21.9, 0.12, 10.2, n.marbleDark, 0.01),
      b(-28.1, -1, 10, -22, 0, 10.1, n.exterior),
      b(22, -1, 10, 28.1, 0, 10.1, n.exterior));
    let Z = (b0, d0, V, B) => {
      (i.cyl(
        b0 + B[0] * 0.07,
        d0 - 0.12,
        V + B[2] * 0.07,
        0.045,
        0.24,
        n.blackMetal,
        {
          seg: 12,
        },
      ),
        b(
          b0 - 0.03,
          d0 - 0.03,
          V - 0.03,
          b0 + B[0] * 0.05 + 0.03,
          d0 + 0.03,
          V + B[2] * 0.05 + 0.03,
          n.blackMetal,
        ),
        i.disc(
          b0 + B[0] * 0.07,
          d0 + 0.1215,
          V + B[2] * 0.07,
          0.036,
          n.bulbWarm,
          {
            up: !0,
            seg: 10,
          },
        ),
        i.disc(
          b0 + B[0] * 0.07,
          d0 - 0.1215,
          V + B[2] * 0.07,
          0.036,
          n.bulbWarm,
          {
            seg: 10,
          },
        ));
      let j = new Vector3(B[0], 0, B[2]);
      (s.addGlow(new Vector3(b0, d0 + 0.75, V), j, 0.9, 1.6, 16757866, 0.3),
        s.addGlow(new Vector3(b0, d0 - 0.75, V), j, 0.9, 1.6, 16757866, 0.3));
    };
    (Z(-22.45, 2.05, 10.1, [0, 0, 1]), Z(22.15, 2.05, 10.1, [0, 0, 1]));
    for (let b0 of [-1, 1])
      (Z(b0 * 16.2, 2.98, 10.1, [0, 0, 1]),
        Z(b0 * 12.38, 5.3, 10.06, [0, 0, 1]),
        Z(b0 * 11, 2, 12, [0, 0, 1]));
    let r0 = [
      [-0.34, 0],
      [0.07, 0],
      [0.07, 0.022],
      [0.045, 0.06],
      [-0.34, 0.06],
    ];
    (i.sweep("z", 10.42, -28.2, 28.2, 8.78, r0, n.blackMetal, {
      dir: 1,
    }),
      i.sweep("x", -28.2, 6, 10.42, 8.78, r0, n.blackMetal, {
        dir: -1,
      }),
      i.sweep("x", 28.2, 6, 10.42, 8.78, r0, n.blackMetal, {
        dir: 1,
      }));
  }
  function V0() {
    let c0 = (j, s0, l0, E0, U, X = 1, N = n.plasticWhite) => {
        let q = 0.078 * X + 0.012;
        v(
          j,
          s0,
          l0,
          E0 - q / 2,
          E0 + q / 2,
          U - 0.045,
          U + 0.045,
          0,
          0.008,
          N,
          "c",
          0.004,
        );
        for (let o0 = 0; o0 < X; o0++) {
          let h0 = E0 - q / 2 + 0.045 + o0 * 0.078;
          v(
            j,
            s0,
            l0,
            h0 - 0.014,
            h0 + 0.014,
            U - 0.024,
            U + 0.024,
            0.008,
            0.012,
            N === n.brass ? n.brass : n.plasticWhite,
            "b",
          );
        }
      },
      Z = (j, s0, l0, E0, U, X = n.plasticWhite) => {
        v(
          j,
          s0,
          l0,
          E0 - 0.075,
          E0 + 0.075,
          U - 0.045,
          U + 0.045,
          0,
          0.008,
          X,
          "c",
          0.004,
        );
        for (let N of [-0.036, 0.036])
          v(
            j,
            s0,
            l0,
            E0 + N - 0.016,
            E0 + N + 0.016,
            U - 0.016,
            U + 0.016,
            0.008,
            0.0095,
            n.plasticBlack,
            "b",
          );
      },
      r0 = (j, s0, l0, E0, U) => {
        (v(
          j,
          s0,
          l0,
          E0 - 0.045,
          E0 + 0.045,
          U - 0.06,
          U + 0.06,
          0,
          0.018,
          n.plasticWhite,
          "c",
          0.006,
        ),
          v(
            j,
            s0,
            l0,
            E0 - 0.03,
            E0 + 0.03,
            U - 0.01,
            U + 0.04,
            0.018,
            0.0195,
            n.plasticBlack,
            "b",
          ),
          v(
            j,
            s0,
            l0,
            E0 - 0.022,
            E0 - 0.006,
            U + 0.008,
            U + 0.02,
            0.0195,
            0.0205,
            n.ledStrip,
            "b",
          ));
      },
      b0 = (j, s0, l0, E0) => {
        (v(
          j,
          s0,
          l0,
          E0 - 0.055,
          E0 + 0.055,
          1.23,
          1.37,
          0,
          0.04,
          c,
          "c",
          0.006,
        ),
          v(
            j,
            s0,
            l0,
            E0 - 0.03,
            E0 + 0.03,
            1.27,
            1.3,
            0.04,
            0.05,
            n.plasticWhite,
            "c",
            0.003,
          ),
          v(
            j,
            s0,
            l0,
            E0 - 0.06,
            E0 + 0.06,
            2.3,
            2.44,
            0,
            0.045,
            n.plasticWhite,
            "c",
            0.006,
          ),
          v(j, s0, l0, E0 - 0.035, E0 + 0.035, 2.33, 2.38, 0.045, 0.06, r, "b"),
          v(j, s0, l0, E0 - 0.05, E0 + 0.05, 2.39, 2.43, 0.045, 0.048, c, "b"));
      },
      d0 = (j, s0, l0 = n.brass) => {
        (b(j - 0.09, 0.001, s0 - 0.09, j + 0.09, 0.005, s0 + 0.09, l0, {
          faces: "b",
        }),
          b(
            j - 0.07,
            0.005,
            s0 - 0.07,
            j + 0.07,
            0.0062,
            s0 + 0.07,
            l0 === n.brass ? n.blackMetal : n.steel,
            {
              faces: "b",
            },
          ));
      };
    for (let j of [-1, 1])
      (c0("x", j * 11.9, -j, 1.45, 1.2, 2, n.brass),
        Z("x", j * 11.9, -j, -0.9, 0.62, n.brass));
    (r0("z", -7.9, 1, 5.25, 1.5),
      d0(-2.6, -2.7),
      d0(2.6, -2.7),
      d0(-4.5, 4.2),
      d0(4.5, 4.2));
    for (let j of [-1, 1]) c0("x", j * 11.94, -j, 9.55, Qt + 1.2, 2, n.brass);
    (c0("z", 9.9, -1, -18.72, 1.2, 2, n.brass),
      c0("x", -12.1, -1, 1.5, 1.2, 1, n.brass),
      r0("x", -12.1, -1, -4.3, 1.5),
      Z("z", 9.9, -1, -17.5, 0.3, n.brass),
      c0("z", -8.1, -1, -12.13, 1.2, 2),
      r0("x", -6.1, -1, -12.6, 1.5),
      Z("z", -8.1, -1, -22.9, 0.3),
      Z("x", -6.1, -1, -18.5, 0.3),
      c0("x", 15.9, -1, 3.79, 1.2, 1),
      r0("x", 12.1, 1, -2.6, 1.5),
      b0("z", -7.9, 1, 15.3),
      Z("x", 15.9, -1, 6.4, 1.2),
      g(12.75, A - 0.006, -5.5, 13.25, A, -5, n.plasticWhite, 0.003),
      c0("z", -0.1, -1, 19.85, 1.2, 2),
      r0("z", -0.1, -1, 24.6, 1.5),
      Z("x", 27.9, -1, -4, 0.3),
      Z("z", -0.1, -1, 17.4, 0.3),
      d0(21.3, -4, n.steel),
      d0(22.7, -4, n.steel),
      c0("x", 16.1, 1, 3.78, 1.2, 2),
      r0("x", 16.1, 1, 3.5, 1.5),
      Z("x", 27.9, -1, 5.2, 0.3),
      Z("x", 16.1, 1, 9, 0.3),
      P0("x", 16.1, 1, 4.55, 2.82, 0.7, 0.18, n.plasticWhite));
    for (let [j, s0, l0, E0] of [
      ["x", 6.1, 1, -11.8],
      ["z", -19.9, 1, 11.9],
      ["z", -8.1, -1, 17.2],
      ["z", -8.1, -1, 22.4],
      ["x", 27.9, -1, -15],
    ]) {
      v(
        j,
        s0,
        l0,
        E0 - 0.08,
        E0 + 0.08,
        1.08,
        1.22,
        0,
        0.045,
        n.steel,
        "c",
        0.006,
      );
      for (let U of [-0.04, 0.04])
        v(
          j,
          s0,
          l0,
          E0 + U - 0.018,
          E0 + U + 0.018,
          1.13,
          1.17,
          0.045,
          0.047,
          n.plasticBlack,
          "b",
        );
      i.rod(
        y(j, s0, l0, E0, 1.22, 0.02),
        y(j, s0, l0, E0, A, 0.02),
        0.009,
        n.steel,
        {
          seg: 6,
        },
      );
    }
    (b0("z", -8.1, -1, 15.95), b0("z", -8.1, -1, 1.2));
    let V = [
      [0, 0],
      [0.012, 0],
      [0.03, 0.012],
      [0.034, 0.05],
      [0.03, 0.088],
      [0.012, 0.1],
      [0, 0.1],
    ];
    for (let j of ["kit", "serv"])
      for (let s0 of "WENS") {
        let l0 = t0(p0[j], s0);
        for (let [E0, U] of F0(l0, 0.12)) {
          m0(l0, E0, U, 0.86, V, n.steel);
          for (let X = E0 + 0.25; X < U - 0.1; X += 1.4)
            S0(l0, X - 0.02, X + 0.02, 0.89, 0.93, 0.034, 0.038, n.chrome, "b");
        }
      }
    let B = (j, s0, l0, E0) => {
      let U = l0 - j > E0 - s0;
      b(j, 8e-4, s0, l0, 0.004, E0, n.plasticBlack, {
        faces: "b",
      });
      for (let X = 0; X < 6; X++) {
        let N = (X + 0.5) / 6;
        U
          ? b(
              j,
              0.004,
              s0 + (E0 - s0) * N - 0.006,
              l0,
              0.0065,
              s0 + (E0 - s0) * N + 0.006,
              n.brass,
              {
                faces: "b",
              },
            )
          : b(
              j + (l0 - j) * N - 0.006,
              0.004,
              s0,
              j + (l0 - j) * N + 0.006,
              0.0065,
              E0,
              n.brass,
              {
                faces: "b",
              },
            );
      }
    };
    for (let [j, s0] of [
      [-9.9, -8.1],
      [-5.9, 5.9],
      [8.1, 9.9],
    ])
      B(j, 9.52, s0, 9.68);
    (B(-27.6, -0.9, -27.44, 8.9),
      B(-26.9, -19.6, -7.1, -19.44),
      B(-27.6, -18.9, -27.44, -9.1));
  }
  ((e.addGeometry = f), (e.box = u), (t.archTris = Math.round(d() - m)));
}

export { dressLobby };

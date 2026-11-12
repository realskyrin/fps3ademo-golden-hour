// scene/hotel.js: recovered from the verified GOLDEN HOUR release.
import { SUN_DIRECTION, pb } from "./sky.js";
import {
  DirectionalLight,
  FogExp2,
  HemisphereLight,
  Mesh,
  PlaneGeometry,
  PointLight,
  ShaderMaterial,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";

var p$ = new Float32Array(16);
var Ye = 3.4;
var Qt = 3.8;
var Js = 8;
var ms = {
  x0: -7,
  x1: 7,
  z0: 14.5,
  z1: 20.5,
  floor: -1.1,
  water: -0.14,
};
function createHotel(context) {
  let { scene: t, world: e, glass: s, fx: n, M: i, SURF_OF: a } = context,
    r = {
      lights: {},
      shafts: [],
      update: [],
      spawns: [],
      zones: [],
      pool: ms,
      walls: [],
      windows: [],
      railings: [],
      columns: [],
      stairs: [],
      basic: [],
    };
  for (let P of Object.keys(a || {})) i[P] && e.surfOf.set(i[P], a[P]);
  let l = (P) => e.surfOf.get(P) || "concrete",
    c = (P, z, k, I, G, K, $, n0) => e.box(P, z, k, I, G, K, $, n0),
    h = (P, z, k, I, G, K, $, n0) =>
      e.box(P, z, k, I, G, K, $, {
        collide: !1,
        ...n0,
      }),
    f = SUN_DIRECTION.clone().negate();
  function u(P, z, k, I, G, K, $, n0, e0 = [], p0 = {}) {
    let t0 = (p0.t ?? 0.2) / 2;
    r.walls.push({
      axis: P,
      pos: z,
      a0: k,
      a1: I,
      y0: G,
      y1: K,
      mNeg: $,
      mPos: n0,
      openings: e0,
      t: t0 * 2,
    });
    let M0 = (F0, m0, S0, T0) => {
        m0 - F0 < 0.001 ||
          T0 - S0 < 0.001 ||
          (P === "x"
            ? ($ === n0
                ? h(z - t0, S0, F0, z + t0, T0, m0, $)
                : (h(z - t0, S0, F0, z, T0, m0, $, {
                    faces: "e",
                  }),
                  h(z, S0, F0, z + t0, T0, m0, n0, {
                    faces: "w",
                  })),
              e.addCollider(z - t0, S0, F0, z + t0, T0, m0, p0.surf || l(n0)),
              S0 < 0.02 &&
                p0.ao !== !1 &&
                e.aoSkirt(z - t0, F0, z + t0, m0, S0, 0.45, 0.42))
            : ($ === n0
                ? h(F0, S0, z - t0, m0, T0, z + t0, $)
                : (h(F0, S0, z - t0, m0, T0, z, $, {
                    faces: "s",
                  }),
                  h(F0, S0, z, m0, T0, z + t0, n0, {
                    faces: "n",
                  })),
              e.addCollider(F0, S0, z - t0, m0, T0, z + t0, p0.surf || l(n0)),
              S0 < 0.02 &&
                p0.ao !== !1 &&
                e.aoSkirt(F0, z - t0, m0, z + t0, S0, 0.45, 0.42)));
      },
      f0 = e0.slice().sort((F0, m0) => F0.a0 - m0.a0),
      _0 = k;
    for (let F0 of f0) {
      M0(_0, F0.a0, G, K);
      let m0 = F0.y0 ?? G,
        S0 = F0.y1 ?? K;
      (m0 > G && M0(F0.a0, F0.a1, G, m0),
        S0 < K && M0(F0.a0, F0.a1, S0, K),
        (_0 = F0.a1),
        F0.frame && d(P, z, F0.a0, F0.a1, m0, S0, F0.frame, t0));
    }
    M0(_0, I, G, K);
  }
  function d(P, z, k, I, G, K, $, n0) {
    let e0 = n0 + 0.025,
      p0 = 0.06,
      t0 = (M0, f0, _0, F0) =>
        P === "x"
          ? h(z - e0, _0, M0, z + e0, F0, f0, $)
          : h(M0, _0, z - e0, f0, F0, z + e0, $);
    (t0(k, k + p0, G, K), t0(I - p0, I, G, K), t0(k, I, K - p0, K));
  }
  function m(P, z, k, I, G, K, $, n0 = {}) {
    r.windows.push({
      axis: P,
      pos: z,
      a0: k,
      a1: I,
      y0: G,
      y1: K,
      n: $,
      sun: !!n0.shaft,
    });
    let e0 = 0.07,
      p0 = 0.09,
      t0 = n0.mat || i.blackMetal,
      M0 = (_0, F0, m0, S0, T0) =>
        P === "x"
          ? e.box(z - p0, m0, _0, z + p0, S0, F0, t0, {
              collide: T0,
              surf: "metal",
            })
          : e.box(_0, m0, z - p0, F0, S0, z + p0, t0, {
              collide: T0,
              surf: "metal",
            });
    (M0(k, I, G, G + e0, !1),
      M0(k, I, K - e0, K, !1),
      M0(k, k + e0, G, K, !1),
      M0(I - e0, I, G, K, !1));
    let f0 = (I - k - e0 * 2 - ($ - 1) * e0) / $;
    for (let _0 = 0; _0 < $; _0++) {
      let F0 = k + e0 + _0 * (f0 + e0);
      (_0 > 0 && M0(F0 - e0, F0, G + e0, K - e0, !0),
        s.addPane({
          axis: P,
          pos: z,
          a0: F0,
          a1: F0 + f0,
          y0: G + e0,
          y1: K - e0,
          support: "frame",
          cell: n0.cell || 0.2,
        }),
        n0.shaft &&
          r.shafts.push({
            axis: P,
            pos: z,
            a0: F0,
            a1: F0 + f0,
            y0: G + e0,
            y1: K - e0,
            maxLen: n0.shaft,
          }));
    }
  }
  function p(P, z, k, I, G, K = {}) {
    let $ = K.h || 1.08,
      n0 = K.len || 1.5,
      e0 = Math.max(1, Math.round((I - k) / n0)),
      p0 = (I - k) / e0;
    r.railings.push({
      axis: P,
      pos: z,
      a0: k,
      a1: I,
      y: G,
      h: $,
      n: e0,
    });
    let t0 = (M0, f0, _0, F0, m0, S0, T0 = !0) =>
      P === "x"
        ? e.box(z - S0, _0, M0, z + S0, F0, f0, m0, {
            collide: T0,
            surf: "metal",
          })
        : e.box(M0, _0, z - S0, f0, F0, z + S0, m0, {
            collide: T0,
            surf: "metal",
          });
    (t0(k, I, G, G + 0.07, i.blackMetal, 0.035, !1),
      t0(k, I, G + $ - 0.045, G + $, i.brass, 0.03));
    for (let M0 = 0; M0 <= e0; M0++) {
      let f0 = k + M0 * p0;
      t0(
        Math.max(k, f0 - 0.02),
        Math.min(I, f0 + 0.02),
        G,
        G + $,
        i.brass,
        0.02,
        M0 === 0 || M0 === e0,
      );
    }
    for (let M0 = 0; M0 < e0; M0++)
      s.addPane({
        axis: P,
        pos: z,
        a0: k + M0 * p0 + 0.03,
        a1: k + (M0 + 1) * p0 - 0.03,
        y0: G + 0.07,
        y1: G + $ - 0.05,
        support: "bottom",
        cell: 0.16,
      });
  }
  function x(P, z, k, I, G, K, $, n0, e0 = {}) {
    let p0 = (K - G) / $,
      t0 = e0.tread || 0.3,
      M0 = P[0] === "+" ? 1 : -1,
      f0 = P[1],
      _0 = {
        dir: P,
        ax: f0,
        sign: M0,
        start: z,
        s0: k,
        s1: I,
        y0: G,
        y1: K,
        n: $,
        rise: p0,
        tread: t0,
        mat: n0,
        led: !!e0.led,
        sides: [],
      };
    r.stairs.push(_0);
    let F0 = l(n0);
    for (let T0 = 0; T0 < $; T0++) {
      let j0 = z + M0 * t0 * T0,
        Z0 = z + M0 * t0 * (T0 + 1),
        lt = G + p0 * (T0 + 1);
      (f0 === "z"
        ? e.addCollider(k, G, Math.min(j0, Z0), I, lt, Math.max(j0, Z0), F0)
        : e.addCollider(Math.min(j0, Z0), G, k, Math.max(j0, Z0), lt, I, F0),
        r.basic.push(() => {
          f0 === "z"
            ? (h(k, G, Math.min(j0, Z0), I, lt, Math.max(j0, Z0), n0, {
                faces: "b",
              }),
              e0.led &&
                h(
                  k + 0.04,
                  lt - 0.035,
                  j0 - M0 * 0.012,
                  I - 0.04,
                  lt - 0.015,
                  j0 + M0 * 0.004,
                  i.ledStrip,
                  {
                    shadow: !1,
                  },
                ))
            : (h(Math.min(j0, Z0), G, k, Math.max(j0, Z0), lt, I, n0, {
                faces: "b",
              }),
              e0.led &&
                h(
                  j0 - M0 * 0.012,
                  lt - 0.035,
                  k + 0.04,
                  j0 + M0 * 0.004,
                  lt - 0.015,
                  I - 0.04,
                  i.ledStrip,
                  {
                    shadow: !1,
                  },
                ));
        }));
    }
    let m0 = e0.blocks || 4,
      S0 = $ / m0;
    for (let T0 of e0.sides || []) {
      let j0 = T0.mat || i.marbleDark,
        Z0 = {
          a0: T0.a0,
          a1: T0.a1,
          cap: T0.cap || 0,
          mat: j0,
          blocks: [],
        };
      _0.sides.push(Z0);
      for (let lt = 0; lt < m0; lt++) {
        let H0 = z + M0 * t0 * S0 * lt,
          Y0 = z + M0 * t0 * S0 * (lt + 1),
          et = G + p0 * S0 * (lt + 1) + 0.95;
        T0.cap && (et = Math.min(et, T0.cap));
        let ct = Math.min(H0, Y0),
          D0 = Math.max(H0, Y0);
        (Z0.blocks.push({
          lo: ct,
          hi: D0,
          top: et,
        }),
          f0 === "z"
            ? e.addCollider(T0.a0, G, ct, T0.a1, et, D0, l(j0))
            : e.addCollider(ct, G, T0.a0, D0, et, T0.a1, l(j0)),
          r.basic.push(() => {
            f0 === "z"
              ? (h(T0.a0, G, ct, T0.a1, et, D0, j0, {
                  faces: "b",
                }),
                T0.cap ||
                  h(
                    T0.a0 - 0.015,
                    et,
                    ct,
                    T0.a1 + 0.015,
                    et + 0.03,
                    D0,
                    i.brass,
                  ))
              : (h(ct, G, T0.a0, D0, et, T0.a1, j0, {
                  faces: "b",
                }),
                T0.cap ||
                  h(
                    ct,
                    et,
                    T0.a0 - 0.015,
                    D0,
                    et + 0.03,
                    T0.a1 + 0.015,
                    i.brass,
                  ));
          }));
      }
    }
  }
  function g(P, z, k, I, G, K = i.marbleDark) {
    let $ = k / 2;
    (r.columns.push({
      x: P,
      z,
      s: k,
      y0: I,
      y1: G,
      mat: K,
    }),
      e.addCollider(P - $, I, z - $, P + $, G, z + $, l(K)),
      e.aoSkirt(P - $, z - $, P + $, z + $, I, 0.5, 0.5),
      r.basic.push(() => {
        (h(P - $, I, z - $, P + $, G, z + $, K),
          h(
            P - $ - 0.03,
            I,
            z - $ - 0.03,
            P + $ + 0.03,
            I + 0.16,
            z + $ + 0.03,
            i.brass,
          ),
          h(
            P - $ - 0.03,
            G - 0.12,
            z - $ - 0.03,
            P + $ + 0.03,
            G,
            z + $ + 0.03,
            i.brass,
          ));
      }));
  }
  function b(P, z, k, I, G, K, $) {
    let n0 = new PointLight(G, K, $, 2);
    return (
      n0.position.set(z, k, I),
      t.add(n0),
      (r.lights[P] = {
        light: n0,
        base: K,
        k: 1,
      }),
      n0
    );
  }
  r.helpers = {
    wall: u,
    casing: d,
    windowRow: m,
    railing: p,
    stairs: x,
    column: g,
    box: c,
    deco: h,
    surf: l,
  };
  let v = -0.5;
  (c(-12, v, -8, 12, 0, 10, i.marbleFloor),
    c(-28, v, -8, -12, 0, 10, i.oakFloor),
    c(12, v, -8, 16, 0, 10, i.carpetHall),
    c(16, v, -8, 28, 0, 0, i.carpetLobby),
    c(16, v, 0, 28, 0, 10, i.oakFloor),
    c(-28, v, -20, -6, 0, -8, i.oakFloor),
    c(-6, v, -20, 6, 0, -8, i.concrete),
    c(6, v, -20, 28, 0, -8, i.kitchenFloor));
  let y = -1.6;
  (c(-22, y, 10, 22, 0, ms.z0, i.terraceStone),
    c(-22, y, ms.z0, ms.x0, 0, ms.z1, i.terraceStone),
    c(ms.x1, y, ms.z0, 22, 0, ms.z1, i.terraceStone),
    c(-22, y, ms.z1, 22, 0, 22, i.terraceStone),
    c(ms.x0, y, ms.z0, ms.x1, ms.floor, ms.z1, i.poolTile, {
      surf: "tile",
    }),
    h(ms.x0, ms.floor, ms.z0, ms.x0 + 0.02, -0.02, ms.z1, i.poolTile),
    h(ms.x1 - 0.02, ms.floor, ms.z0, ms.x1, -0.02, ms.z1, i.poolTile),
    h(ms.x0, ms.floor, ms.z0, ms.x1, -0.02, ms.z0 + 0.02, i.poolTile),
    h(ms.x0, ms.floor, ms.z1 - 0.02, ms.x1, -0.02, ms.z1, i.poolTile));
  for (let P = 0; P < 3; P++)
    c(
      ms.x0 + P * 0.5,
      ms.floor,
      16.2,
      ms.x0 + (P + 1) * 0.5,
      -0.28 * (P + 1),
      18.8,
      i.poolTile,
      {
        surf: "tile",
      },
    );
  (c(-22, 0, 21.82, 22, 0.25, 22, i.terraceStone),
    c(-22, 0, 10, -21.82, 0.25, 22, i.terraceStone),
    c(21.82, 0, 10, 22, 0.25, 22, i.terraceStone),
    p("z", 21.91, -21.8, 21.8, 0.25, {
      len: 2,
      h: 0.95,
    }),
    p("x", -21.91, 10.1, 21.8, 0.25, {
      len: 2,
      h: 0.95,
    }),
    p("x", 21.91, 10.1, 21.8, 0.25, {
      len: 2,
      h: 0.95,
    }),
    c(-28, Ye, -20, -12, 8.6, 10, i.exterior),
    c(12, Ye, -20, 28, 8.6, 10, i.exterior),
    c(-12, Ye, -20, 12, 8.6, -8, i.exterior),
    c(-12, Js, -8, 12, 8.6, 10.1, i.ceiling),
    h(-12.3, Js - 0.12, 10.1, 12.3, 8.75, 10.42, i.exterior),
    h(-28.2, 8.6, -20.2, 28.2, 8.78, 10.42, i.exterior),
    h(-12, Qt, -8, -11.94, Js, 10, i.plaster),
    h(11.94, Qt, -8, 12, Js, 10, i.plaster),
    h(-12, Qt, -8, 12, Js, -7.94, i.plaster));
  let M = (P, z, k, I, G) => (
    h(P, Ye - 0.04, z, k, Ye, I, G, {
      shadow: !1,
    }),
    e.addCollider(P, Ye - 0.04, z, k, Ye, I, l(G), {
      noMove: !0,
    })
  );
  (M(-28, -8, -12, 10, i.woodDark),
    M(-28, -20, -6, -8, i.ceiling),
    M(-6, -20, 6, -8, i.concrete),
    M(12, -8, 16, 10, i.ceiling),
    M(16, -8, 28, 0, i.ceiling),
    M(16, 0, 28, 10, i.ceiling),
    (r.kitchenCeil = M(6, -20, 28, -8, i.ceilingTile)),
    u("z", -8, -12, -6, 0, Ye, i.plaster, i.walnut),
    u("z", -8, -6, 6, 0, Ye, i.concrete, i.walnut, [
      {
        a0: 2.2,
        a1: 3.6,
        y1: 2.3,
        frame: i.brass,
      },
    ]),
    u("z", -8, 6, 12, 0, Ye, i.kitchenTile, i.walnut));
  let w = [
    {
      a0: -7,
      a1: -5.4,
      y1: 2.4,
      frame: i.brass,
    },
    {
      a0: 2,
      a1: 6,
      y1: 2.9,
      frame: i.brass,
    },
  ];
  (u("x", -12, -8, 10, 0, Ye, i.plasterDark, i.walnut, w),
    u("x", 12, -8, 10, 0, Ye, i.walnut, i.plaster, w));
  let T = (P, z, k, I) => {
    (h(P, Ye, z, k, Qt - 0.03, I, i.ceiling, {
      faces: "t",
    }),
      h(P, Qt - 0.03, z, k, Qt, I, i.carpetLobby, {
        faces: "b",
      }),
      e.addCollider(P, Ye, z, k, Qt, I, "carpet"));
  };
  (T(-12, -8, 12, -5), T(-12, -5, -9, 10), T(9, -5, 12, 10));
  let S = (P, z, k, I) => {
    h(P, Ye - 0.02, z, k, Qt + 0.02, I, i.brass);
  };
  (S(-9, -5, 9, -4.96),
    S(-9, -5, -8.96, 10),
    S(8.96, -5, 9, 10),
    h(-8.9, Ye - 0.03, -5.12, 8.9, Ye - 0.005, -5.06, i.ledStrip, {
      shadow: !1,
    }),
    h(-9.12, Ye - 0.03, -5, -9.06, Ye - 0.005, 9.9, i.ledStrip, {
      shadow: !1,
    }),
    h(9.06, Ye - 0.03, -5, 9.12, Ye - 0.005, 9.9, i.ledStrip, {
      shadow: !1,
    }),
    p("z", -4.95, -7.2, 7.2, Qt, {
      len: 1.6,
    }),
    p("x", -8.95, -4.95, 9.85, Qt, {
      len: 1.48,
    }),
    p("x", 8.95, -4.95, 9.85, Qt, {
      len: 1.48,
    }),
    x("-z", 1, -8.9, -7.3, 0, Qt, 20, i.marbleFloor, {
      led: !0,
      sides: [
        {
          a0: -9,
          a1: -8.9,
          cap: Ye,
        },
        {
          a0: -7.3,
          a1: -7.2,
        },
      ],
    }),
    x("-z", 1, 7.3, 8.9, 0, Qt, 20, i.marbleFloor, {
      led: !0,
      sides: [
        {
          a0: 8.9,
          a1: 9,
          cap: Ye,
        },
        {
          a0: 7.2,
          a1: 7.3,
        },
      ],
    }),
    e.aoSkirt(-9, -5, -7.2, 1, 0, 0.5, 0.4),
    e.aoSkirt(7.2, -5, 9, 1, 0, 0.5, 0.4));
  for (let P of [-1, 1])
    (g(P * 9.5, 4, 0.7, 0, Ye),
      g(P * 9.5, 9.4, 0.7, 0, Ye),
      g(P * 4.6, -5.4, 0.7, 0, Ye));
  for (let P = -8; P <= 8; P += 4)
    h(P - 0.18, Js - 0.35, -8, P + 0.18, Js, 10, i.walnut, {
      shadow: !1,
    });
  for (let P = -4; P <= 6; P += 5)
    h(-12, Js - 0.35, P - 0.18, 12, Js, P + 0.18, i.walnut, {
      shadow: !1,
    });
  h(-11.9, Js - 0.5, -7.9, 11.9, Js - 0.44, -7.7, i.ledStrip, {
    shadow: !1,
  });
  let E = 10;
  for (let P = 0; P <= 12; P++) {
    let z = -12 + P * 2;
    c(z - 0.07, 0, E - 0.11, z + 0.07, Js, E + 0.11, i.blackMetal, {
      surf: "metal",
    });
  }
  (h(-12, 0, E - 0.1, 12, 0.1, E + 0.1, i.blackMetal),
    h(-12, 3.33, E - 0.1, 12, 3.47, E + 0.1, i.blackMetal),
    h(-12, Js - 0.1, E - 0.1, 12, Js, E + 0.1, i.blackMetal));
  for (let P = 0; P < 12; P++) {
    let z = -12 + P * 2 + 0.07,
      k = -10 + P * 2 - 0.07;
    P === 0 || P === 11
      ? (c(z, 0.1, E - 0.08, k, 3.33, E + 0.08, i.exterior),
        h(z, 6.2, E - 0.06, k, 6.3, E + 0.06, i.blackMetal),
        s.addPane({
          axis: "z",
          pos: E,
          a0: z,
          a1: k,
          y0: 6.3,
          y1: Js - 0.1,
        }),
        r.shafts.push({
          axis: "z",
          pos: E,
          a0: z,
          a1: k,
          y0: Qt,
          y1: 6.2,
          maxLen: 9,
        }))
      : (P === 2 || P === 9
          ? (h(z, 2.7, E - 0.06, k, 2.8, E + 0.06, i.blackMetal),
            e.addCollider(z, 2.7, E - 0.06, k, 2.8, E + 0.06, "metal"),
            s.addPane({
              axis: "z",
              pos: E,
              a0: z,
              a1: k,
              y0: 2.8,
              y1: 3.33,
            }),
            r.shafts.push({
              axis: "z",
              pos: E,
              a0: z,
              a1: k,
              y0: 0.05,
              y1: 3.33,
              maxLen: 12,
            }))
          : (s.addPane({
              axis: "z",
              pos: E,
              a0: z,
              a1: k,
              y0: 0.1,
              y1: 3.33,
            }),
            r.shafts.push({
              axis: "z",
              pos: E,
              a0: z,
              a1: k,
              y0: 0.1,
              y1: 3.33,
              maxLen: 12,
            })),
        s.addPane({
          axis: "z",
          pos: E,
          a0: z,
          a1: k,
          y0: 3.47,
          y1: Js - 0.1,
          cell: 0.24,
        }),
        r.shafts.push({
          axis: "z",
          pos: E,
          a0: z,
          a1: k,
          y0: 3.47,
          y1: Js - 0.1,
          maxLen: 19,
        }));
  }
  for (let P of [-1, 1]) {
    let z = P < 0 ? -12 : 10,
      k = P < 0 ? -10 : 12;
    (h(z, 0, 10.11, k, Qt - 0.03, 12, i.exterior, {
      ao: 0.5,
      faces: "t",
    }),
      h(z, Qt - 0.03, 10.11, k, Qt, 12, i.terraceStone, {
        faces: "b",
      }),
      e.addCollider(z, 0, 10.11, k, Qt, 12, "stone"),
      x(P < 0 ? "+x" : "-x", P * 18, 10.2, 11.8, 0, Qt, 20, i.terraceStone, {
        sides: [
          {
            a0: 11.8,
            a1: 12,
            mat: i.exterior,
          },
        ],
      }),
      e.aoSkirt(
        Math.min(P * 12, P * 18),
        10.2,
        Math.max(P * 12, P * 18),
        12,
        0,
        0.5,
        0.4,
      ),
      p("z", 11.95, z + 0.02, k - 0.02, Qt, {
        len: 2,
      }),
      p("x", P < 0 ? k - 0.05 : z + 0.05, 10.15, 11.9, Qt, {
        len: 1.8,
      }));
  }
  (u("z", 10, -28, -12, 0, Ye, i.plasterDark, i.exterior, [
    {
      a0: -27,
      a1: -23,
      y0: 0.6,
      y1: 2.9,
    },
    {
      a0: -21,
      a1: -19,
      y1: 2.5,
      frame: i.blackMetal,
    },
  ]),
    m("z", 10, -27, -23, 0.6, 2.9, 2, {
      shaft: 8,
    }),
    u("x", -28, -8, 10, 0, Ye, i.exterior, i.plasterDark, [
      {
        a0: -1,
        a1: 9,
        y0: 0.5,
        y1: 3,
      },
    ]),
    m("x", -28, -1, 9, 0.5, 3, 5, {
      shaft: 9,
    }),
    u("z", -8, -28, -12, 0, Ye, i.plaster, i.walnut, [
      {
        a0: -14.6,
        a1: -13.1,
        y1: 2.4,
        frame: i.brass,
      },
    ]),
    u("x", 16, -8, 10, 0, Ye, i.plaster, i.plaster, [
      {
        a0: -7.4,
        a1: -0.6,
        y1: 2.8,
      },
      {
        a0: 4,
        a1: 5.1,
        y1: 2.3,
        frame: i.walnut,
      },
    ]));
  {
    let z = (k) =>
      c(15.95, 0, k - 0.05, 16.05, 2.8, k + 0.05, i.blackMetal, {
        surf: "metal",
      });
    for (let k of [-7.4, -6, -4.6, -3.4, -2, -0.6]) z(k);
    h(15.95, 2.72, -7.4, 16.05, 2.8, -0.6, i.blackMetal);
    for (let [k, I] of [
      [-7.4, -6],
      [-6, -4.6],
      [-3.4, -2],
      [-2, -0.6],
    ])
      s.addPane({
        axis: "x",
        pos: 16,
        a0: k + 0.05,
        a1: I - 0.05,
        y0: 0.04,
        y1: 2.72,
        cell: 0.18,
      });
  }
  (u("z", 0, 16, 28, 0, Ye, i.plaster, i.walnut),
    u("x", 28, -8, 10, 0, Ye, i.plaster, i.exterior, [
      {
        a0: -7,
        a1: -1,
        y0: 0.6,
        y1: 2.9,
      },
      {
        a0: 6.4,
        a1: 9.4,
        y0: 0.6,
        y1: 2.9,
      },
    ]),
    m("x", 28, -7, -1, 0.6, 2.9, 3),
    m("x", 28, 6.4, 9.4, 0.6, 2.9, 2),
    u("z", 10, 12, 28, 0, Ye, i.plaster, i.exterior, [
      {
        a0: 18.5,
        a1: 21.5,
        y0: 0.35,
        y1: 2.9,
      },
      {
        a0: 22.8,
        a1: 27.2,
        y0: 0.35,
        y1: 2.9,
      },
    ]),
    m("z", 10, 18.5, 21.5, 0.35, 2.9, 2, {
      shaft: 8,
    }),
    m("z", 10, 22.8, 27.2, 0.35, 2.9, 2, {
      shaft: 8,
    }),
    u("z", -8, 12, 28, 0, Ye, i.kitchenTile, i.plaster, [
      {
        a0: 13.2,
        a1: 14.8,
        y1: 2.3,
        frame: i.steel,
      },
    ]),
    s.addPane({
      axis: "x",
      pos: 26.3,
      a0: 0.15,
      a1: 1.7,
      y0: 0.05,
      y1: 2.3,
      cell: 0.16,
    }),
    s.addPane({
      axis: "z",
      pos: 1.72,
      a0: 26.32,
      a1: 27.88,
      y0: 0.05,
      y1: 2.3,
      cell: 0.16,
    }),
    h(26.27, 0, 0.1, 26.33, 0.05, 1.75, i.chrome),
    h(26.27, 2.3, 0.1, 26.33, 2.34, 1.75, i.chrome),
    h(26.3, 2.3, 1.69, 27.9, 2.34, 1.75, i.chrome),
    c(26.26, 0, 1.68, 26.34, 2.34, 1.76, i.chrome, {
      surf: "metal",
    }),
    h(26.34, 0.001, 0.1, 27.9, 0.02, 1.7, i.kitchenTile),
    u("z", -20, -28, -6, 0, Ye, i.exterior, i.plaster, [
      {
        a0: -27,
        a1: -7,
        y0: 0.6,
        y1: 2.9,
      },
    ]),
    m("z", -20, -27, -7, 0.6, 2.9, 8),
    u("z", -20, -6, 6, 0, Ye, i.exterior, i.concrete),
    u("z", -20, 6, 28, 0, Ye, i.exterior, i.kitchenTile),
    u("x", -28, -20, -8, 0, Ye, i.exterior, i.plaster, [
      {
        a0: -19,
        a1: -9,
        y0: 0.5,
        y1: 3,
      },
    ]),
    m("x", -28, -19, -9, 0.5, 3, 5, {
      shaft: 9,
    }),
    u("x", 28, -20, -8, 0, Ye, i.kitchenTile, i.exterior),
    u("x", -6, -20, -8, 0, Ye, i.plaster, i.concrete, [
      {
        a0: -15,
        a1: -13.4,
        y1: 2.3,
        frame: i.steel,
      },
    ]),
    u("x", 6, -20, -8, 0, Ye, i.concrete, i.kitchenTile, [
      {
        a0: -15,
        a1: -13.4,
        y1: 2.3,
        frame: i.steel,
      },
    ]));
  {
    let P = [1, 0, 0, 1, 0, 1, 0, 0];
    for (let z of [-1, 1])
      for (let k = 0; k < 4; k++) {
        let I = z < 0 ? -27 + k * 3.8 : 13 + k * 3.8;
        (h(
          I,
          4.6,
          10,
          I + 2.6,
          7.4,
          10.04,
          P[(k + (z > 0 ? 4 : 0)) % 8] ? i.lampShade : i.screenOff,
          {
            shadow: !1,
          },
        ),
          h(I - 0.06, 4.54, 10, I + 2.66, 4.6, 10.07, i.blackMetal),
          h(I - 0.06, 7.4, 10, I + 2.66, 7.46, 10.07, i.blackMetal));
      }
  }
  let _ = new ShaderMaterial({
      transparent: !0,
      depthWrite: !1,
      fog: !1,
      uniforms: {
        uTime: {
          value: 0,
        },
        uSun: {
          value: SUN_DIRECTION,
        },
        uSunCol: {
          value: pb,
        },
        uRipple: {
          value: [
            new Vector4(0, 0, -9, 0),
            new Vector4(0, 0, -9, 0),
            new Vector4(0, 0, -9, 0),
            new Vector4(0, 0, -9, 0),
          ],
        },
      },
      vertexShader:
        "varying vec3 vW; void main() { vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }",
      fragmentShader: `
      uniform float uTime; uniform vec3 uSun, uSunCol; uniform vec4 uRipple[4]; varying vec3 vW;
      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
      float height(vec2 p) {
        float t = uTime;
        float w = sin(dot(p, vec2(1.3, 0.9)) * 1.7 + t * 1.15) * 0.16 + sin(dot(p, vec2(-0.8, 1.5)) * 2.4 - t * 1.4) * 0.11
                + sin(dot(p, vec2(0.4, -1.9)) * 4.6 + t * 2.1) * 0.05 + vn(p * 2.3 + vec2(t * 0.22, -t * 0.18)) * 0.30 + vn(p * 7.0 - t * 0.45) * 0.09;
        for (int i = 0; i < 4; i++) { float age = t - uRipple[i].z; if (age > 0.0 && age < 3.0) { float d = length(p - uRipple[i].xy); w += sin(d * 9.0 - age * 9.0) * exp(-age * 1.4) * smoothstep(age * 3.2 + 0.4, age * 3.2 - 0.6, d) * uRipple[i].w * 2.0; } }
        return w;
      }
      // light network on the pool floor
      float caustic(vec2 p, float t) {
        p = mod(p * 6.2831853, 6.2831853) - 250.0;
        vec2 i = p; float c = 1.0; const float inten = 0.005;
        for (int n = 0; n < 4; n++) {
          float tt = t * (1.0 - (3.5 / float(n + 1)));
          i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
          c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
        }
        c /= 4.0; c = 1.17 - pow(c, 1.4);
        return pow(abs(c), 8.0);
      }
      void main() {
        vec2 p = vW.xz; float e = 0.05;
        float h0 = height(p), hx = height(p + vec2(e, 0.0)), hz = height(p + vec2(0.0, e));
        vec3 n = normalize(vec3((h0 - hx) * 0.36, 1.0, (h0 - hz) * 0.36));
        vec3 V = normalize(cameraPosition - vW);
        float ndv = clamp(dot(n, V), 0.0, 1.0);
        float fres = 0.025 + 0.975 * pow(1.0 - ndv, 5.0);
        vec3 R = reflect(-V, n);
        float az = clamp(dot(normalize(R.xz + 1e-4), normalize(uSun.xz)) * 0.5 + 0.5, 0.0, 1.0);
        vec3 sky = mix(vec3(0.05, 0.09, 0.20), mix(vec3(0.40, 0.27, 0.36), vec3(2.4, 1.0, 0.30), pow(az, 1.6)), pow(clamp(1.0 - R.y, 0.0, 1.0), 3.0));
        float sd = clamp(dot(R, uSun), 0.0, 1.0);
        vec3 spec = uSunCol * (pow(sd, 1400.0) * 120.0 + pow(sd, 90.0) * 1.3);
        // where the (refracted) view ray meets the floor ~1 m down
        vec2 fl = p - V.xz / max(V.y, 0.22) * 0.72 + n.xz * 0.55;
        float ca = caustic(fl * 0.42 + n.xz * 0.05, uTime * 0.55);
        float path = 0.96 / max(V.y, 0.25);
        vec3 tint = exp(-path * vec3(0.62, 0.11, 0.09));                 // water eats red first
        vec3 body = vec3(0.02, 0.19, 0.21) * (0.35 + 0.65 * tint) + vec3(0.30, 0.62, 0.52) * ca * 0.55 * tint.g;
        float alpha = mix(0.50, 0.92, clamp(1.0 - tint.r + ca * 0.4, 0.0, 1.0));
        gl_FragColor = vec4(mix(body, sky, fres) + spec, mix(alpha, 1.0, fres));
      }`,
    }),
    R = new Mesh(new PlaneGeometry(ms.x1 - ms.x0, ms.z1 - ms.z0), _);
  ((R.rotation.x = -Math.PI / 2),
    R.position.set((ms.x0 + ms.x1) / 2, ms.water, (ms.z0 + ms.z1) / 2),
    (R.renderOrder = 5),
    t.add(R));
  let C = 0,
    L = 0;
  ((r.ripple = (P, z, k = 1) => {
    (_.uniforms.uRipple.value[C].set(P, z, L, k), (C = (C + 1) % 4));
  }),
    (r.inPool = (P, z) => P > ms.x0 && P < ms.x1 && z > ms.z0 && z < ms.z1),
    e.addCollider(
      ms.x0,
      ms.water - 0.05,
      ms.z0,
      ms.x1,
      ms.water,
      ms.z1,
      "water",
      {
        noMove: !0,
        water: !0,
      },
    ),
    r.update.push((P) => {
      ((L += P), (_.uniforms.uTime.value = L));
    }));
  let A = new DirectionalLight(pb, 9);
  (A.position
    .copy(SUN_DIRECTION)
    .multiplyScalar(70)
    .add(new Vector3(0, 2, 1)),
    A.target.position.set(0, 2, 1),
    (A.castShadow = !0));
  let O = A.shadow.camera;
  ((O.left = -37),
    (O.right = 37),
    (O.top = 17),
    (O.bottom = -15),
    (O.near = 20),
    (O.far = 130),
    A.shadow.mapSize.set(4096, 4096),
    (A.shadow.bias = -35e-5),
    (A.shadow.normalBias = 0.035),
    (A.shadow.radius = 2.2),
    t.add(A, A.target),
    (r.sun = A));
  let H = new HemisphereLight(8368328, 2759700, 0.26);
  (t.add(H),
    (r.hemi = H),
    b("bounce", 2.5, 0.5, 4.5, 16747077, 9, 14),
    b("chandelier", 0, 5.4, 3.2, 16763024, 20, 18),
    b("reception", 0, 1.4, -2.9, 16741410, 16, 9),
    b("bar", -20.5, 1.7, -5.6, 16738848, 24, 11),
    b("restaurant", -17, 1.7, -13.5, 16754784, 16, 15),
    b("service", 0, 2.2, -14, 12574975, 11, 12),
    b("kitchen", 17, 2.1, -14, 13625087, 36, 19),
    b("conference", 22, 1.9, -4, 14674431, 12, 11),
    b("suite", 21.5, 1.6, 3.5, 16754784, 11, 11),
    b("pool", 0, -0.4, 17.5, 3725004, 18, 12),
    b("fire", -15, 0.95, 17.2, 16742946, 30, 9),
    (t.fog = new FogExp2(6044972, 0.0072)));
  let F = 0;
  return (
    r.update.push((P) => {
      F += P;
      let z = r.lights.fire;
      z.light.intensity =
        z.base *
        z.k *
        (0.8 +
          0.2 * Math.sin(F * 13) * Math.sin(F * 7.3) +
          0.12 * Math.sin(F * 31));
      let k = r.lights.service,
        I =
          Math.sin(F * 2.1) > 0.93 ||
          Math.sin(F * 17) * Math.sin(F * 0.7) > 0.97
            ? 0.25
            : 1;
      k.light.intensity = k.base * k.k * I;
    }),
    (r.indoor = (P, z) => (z < 10 && z > -20 && P > -28 && P < 28 ? 1 : 0)),
    r
  );
}

export { Js, Qt, Ye, createHotel, ms, p$ };

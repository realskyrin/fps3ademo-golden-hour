// scene/dress/base.js: recovered from the verified GOLDEN HOUR release.
import {
  BoxGeometry,
  BufferGeometry,
  CircleGeometry,
  Color,
  Euler,
  ExtrudeGeometry,
  Float32BufferAttribute,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  OctahedronGeometry,
  PlaneGeometry,
  Quaternion,
  Shape,
  SphereGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { createRandom, randomRange } from "../../core/math.js";
import { Js, Qt, Ye } from "../hotel.js";

var Kd = Math.PI;
var Oi = Kd / 2;
var $i = -Kd / 2;
var Br = 0;
var Il = Kd;
var qd = new Vector3(0, 1, 0);
var uc = new Vector3();
var m$ = new Matrix4();
var OD = new Quaternion();
var g$ = new Vector3();
var Rw = new Matrix4().makeScale(0, 0, 0);
var x$ = {
  wood: "wood",
  metal: "metal",
  ceramic: "ceramic",
  plastic: "plastic",
  fabric: "soft",
  foliage: "soft",
  stone: "ceramic",
  glass: "ceramic",
};
function dressHotelBase(context, hotel) {
  let {
      scene: e,
      world: s,
      glass: n,
      physics: i,
      fx: a,
      M: r,
      P: l,
      K: c,
      audio: h,
    } = context,
    { box: f, deco: u, railing: d } = hotel.helpers,
    m = [],
    p = [];
  hotel.resetDress = () => {
    for (let E of m) E();
  };
  function x(E, _, R, C, L = 0, A = {}) {
    let O = E.userData;
    if (
      (O.wall && R === null && (R = O.mountY || 1.5),
      E.position.set(_, R || 0, C),
      (E.rotation.y = L),
      E.updateMatrixWorld(!0),
      O.dynamic && !A.fixed)
    ) {
      let P = O.size || [0.4, 0.4, 0.4];
      return (
        E.traverse((z) => {
          z.isMesh && ((z.castShadow = !0), (z.receiveShadow = !0));
        }),
        i.addProp(E, {
          size: P,
          center: [0, P[1] / 2, 0],
          mass: O.mass || 6,
          mat: x$[O.surf] || "wood",
          breakable: O.breakable || null,
        })
      );
    }
    let H = s.addObject(E),
      F = [];
    for (let P of O.colliders || []) {
      uc.set(P.min[0], P.min[1], P.min[2]).applyMatrix4(E.matrixWorld);
      let z = uc.clone();
      (uc.set(P.max[0], P.max[1], P.max[2]).applyMatrix4(E.matrixWorld),
        F.push(
          s.addCollider(
            z.x,
            z.y,
            z.z,
            uc.x,
            uc.y,
            uc.z,
            O.surf || "wood",
            A.col,
          ),
        ));
    }
    if (!O.wall && !O.ceiling && O.size && A.ao !== !1 && O.kind !== "rug") {
      let P = Math.abs(Math.cos(L)) > 0.5;
      s.aoBlob(
        _,
        C,
        R || 0,
        (P ? O.size[0] : O.size[2]) * 0.62 + 0.1,
        (P ? O.size[2] : O.size[0]) * 0.62 + 0.1,
        0.42,
      );
    }
    return (
      O.light &&
        p.push({
          g: E,
          ud: O,
          kept: H,
          x: _,
          y: R || 0,
          z: C,
          rot: L,
          o: A,
        }),
      {
        kept: H,
        cols: F,
        ud: O,
      }
    );
  }
  function g() {
    for (let E of p) {
      let _ = uc
          .set(...E.ud.light.pos)
          .applyMatrix4(E.g.matrixWorld)
          .clone(),
        R = E.ud.light.color || 16757866,
        C = E.ud.light.intensity || 1,
        L = [];
      if (E.ud.wall) {
        let k = new Vector3(Math.sin(E.rot), 0, Math.cos(E.rot));
        L.push(
          a.addGlow(new Vector3(E.x, E.y + 0.1, E.z), k, 2.2, 2.8, R, 0.3 * C),
        );
      } else {
        let k = s.groundAt(_.x, _.z, _.y - 0.25);
        k > -50 &&
          _.y - k < 4.5 &&
          L.push(a.addGlow(new Vector3(_.x, k, _.z), qd, 3.4, 3.4, R, 0.2 * C));
      }
      let A = E.kept.filter((k) => k.name === "bulb"),
        O = A.map((k) => k.material.emissiveIntensity),
        H = !1,
        F = (k) => {
          H ||
            ((H = !0),
            A.forEach((I) => {
              I.material.emissiveIntensity = 0;
            }),
            L.forEach((I) => a.setGlow(I, 0)),
            a.sparks(_.x, _.y, _.z, 0, -0.3, 0, 14, {
              speed: 4,
            }),
            a.glowPuff(_.x, _.y, _.z, 0.8, [4, 3, 2], 0.07),
            h.breakProp(_, "bulb"),
            h.sparks(_),
            i.burst(_, 5, 15394524, 0.03, 1.6, 0.6),
            (z.off = !0),
            E.o.onKill && E.o.onKill());
        },
        P = E.ud.kind === "chandelier" ? 0 : 0.2,
        z = s.addCollider(
          _.x - P,
          _.y - P,
          _.z - P,
          _.x + P,
          _.y + P,
          _.z + P,
          "glass",
          {
            noMove: !0,
            onShot: F,
            onBlast: (k, I) => {
              I < 4 && F();
            },
          },
        );
      (P || (z.off = !0),
        m.push(() => {
          ((H = !1),
            (z.off = !P),
            A.forEach((k, I) => {
              k.material.emissiveIntensity = O[I];
            }),
            L.forEach((k) => a.setGlow(k, 1)));
        }));
    }
  }
  let b = 0.1,
    v = 0.055;
  function y(E) {
    let _ = b / 2,
      R = v / 2,
      C = 0.006,
      L = 0.007,
      A = 0.003,
      O = 0.0045,
      H = new Shape(
        [
          [_ - C, -R],
          [_, -R + C],
          [_, R - C],
          [_ - C, R],
          [L, R],
          [L - A, R - O],
          [-(L - A), R - O],
          [-L, R],
          [-_ + C, R],
          [-_, R - C],
          [-_, -R + C],
          [-_ + C, -R],
          [-L, -R],
          [-(L - A), -R + O],
          [L - A, -R + O],
          [L, -R],
        ].map(([I, G]) => new Vector2(I, G)),
      ),
      F = new ExtrudeGeometry(H, {
        depth: E,
        bevelEnabled: !1,
        steps: 1,
        curveSegments: 1,
      });
    (F.rotateX(-Math.PI / 2), F.translate(0, -E / 2, 0));
    let P = F.attributes.position,
      z = F.attributes.normal,
      k = F.attributes.uv;
    for (let I = 0; I < P.count; I++) {
      let G = P.getX(I),
        K = P.getY(I),
        $ = P.getZ(I),
        n0 = z.getX(I),
        e0 = z.getY(I),
        p0 = z.getZ(I);
      Math.abs(e0) > 0.7
        ? k.setXY(I, 9.3 + $, 0.03 + G * 0.5)
        : Math.abs(n0) > 0.9
          ? k.setXY(
              I,
              K + (n0 > 0 ? 4.1 : 6.6),
              1.215 + $ + R + (n0 > 0 ? 0 : 0.33),
            )
          : k.setXY(
              I,
              K + (p0 > 0 ? 0 : 1.73),
              (p0 > 0 ? 0.335 : 0.775) + G + _,
            );
    }
    return F;
  }
  function M(E, _, R, C, L, A, O = r.woodLight) {
    let H = Math.floor((C - R) / 0.19),
      F = A - L,
      P = new InstancedMesh(y(F), O, H);
    ((P.castShadow = !0), (P.receiveShadow = !0));
    let z = [],
      k = [],
      I = createRandom(Math.round(_ * 131 + R * 17 + 977)),
      G = new Color(),
      K = (p0, t0, M0, f0, _0, F0, m0) =>
        E === "x"
          ? c.bbox(_ - _0, M0, p0, _ + _0, f0, t0, F0, {
              r: m0,
              seg: 1,
            })
          : c.bbox(p0, M0, _ - _0, t0, f0, _ + _0, F0, {
              r: m0,
              seg: 1,
            }),
      $ = (p0, t0) =>
        E === "x"
          ? s.addCollider(
              _ - 0.05,
              p0,
              R - 0.04,
              _ + 0.05,
              t0,
              C + 0.04,
              "metal",
            )
          : s.addCollider(
              R - 0.04,
              p0,
              _ - 0.05,
              C + 0.04,
              t0,
              _ + 0.05,
              "metal",
            );
    if (
      ($(L - 0.08, L),
      $(A, A + 0.06),
      K(
        R - 0.05,
        C + 0.05,
        Math.max(0, L - 0.1),
        L - 0.014,
        0.058,
        r.blackMetal,
        0.008,
      ),
      K(R - 0.045, C + 0.045, L - 0.016, L, 0.05, r.brass, 0.003),
      K(R - 0.045, C + 0.045, A, A + 0.012, 0.05, r.brass, 0.003),
      K(R - 0.05, C + 0.05, A + 0.01, A + 0.06, 0.058, r.blackMetal, 0.008),
      A + 0.06 < Ye - 0.06 && A > Ye - 0.5)
    ) {
      let p0 = Math.max(2, Math.round((C - R) / 1.15));
      for (let t0 = 0; t0 <= p0; t0++) {
        let M0 = R + 0.06 + ((C - R - 0.12) * t0) / p0,
          f0 = E === "x" ? _ : M0,
          _0 = E === "x" ? M0 : _;
        (c.cyl(
          f0,
          A + 0.055,
          _0,
          0.009,
          Ye - 0.04 - (A + 0.055),
          r.blackMetal,
          {
            seg: 8,
          },
        ),
          c.cyl(f0, A + 0.058, _0, 0.02, 0.014, r.brass, {
            seg: 12,
          }));
      }
    }
    let n0 = E === "x" ? Math.PI / 2 : 0,
      e0 = new Euler();
    for (let p0 = 0; p0 < H; p0++) {
      let t0 = R + 0.06 + p0 * ((C - R - 0.12) / (H - 1)),
        M0 = E === "x" ? _ : t0,
        f0 = E === "x" ? t0 : _,
        _0 = E === "x" ? 0.055 : 0.1,
        F0 = E === "x" ? 0.1 : 0.055,
        m0 = new Matrix4().compose(
          new Vector3(M0, (L + A) / 2, f0),
          new Quaternion().setFromEuler(
            e0.set(
              0,
              n0 + (I() < 0.5 ? Math.PI : 0),
              I() < 0.5 ? Math.PI : 0,
              "YXZ",
            ),
          ),
          new Vector3(1, 1, 1),
        );
      (P.setMatrixAt(p0, m0), z.push(m0));
      let S0 = I.range(0.8, 1.06),
        T0 = I.range(-0.035, 0.035);
      P.setColorAt(p0, G.setRGB(S0 + T0, S0, S0 - T0 * 1.4));
      for (let [H0, Y0, et] of [
        [L, L + 0.055, "b"],
        [A - 0.04, A, "t"],
      ])
        u(
          M0 - _0 / 2 - 0.003,
          H0,
          f0 - F0 / 2 - 0.003,
          M0 + _0 / 2 + 0.003,
          Y0,
          f0 + F0 / 2 + 0.003,
          r.brass,
          {
            faces: et,
          },
        );
      let j0 = 2,
        Z0 = (H0) => {
          if (lt.off) return;
          ((lt.off = !0),
            P.setMatrixAt(p0, Rw),
            (P.instanceMatrix.needsUpdate = !0));
          let Y0 = H0 ? H0.y : (L + A) / 2;
          for (let et = 0; et < 7; et++)
            i.debris(
              M0 + randomRange(-0.03, 0.03),
              L + ((A - L) * (et + 0.5)) / 7,
              f0 + randomRange(-0.03, 0.03),
              randomRange(-1.6, 1.6),
              randomRange(0, 2.2),
              randomRange(-1.6, 1.6),
              0.16,
              11569754,
              6,
            );
          (a.chips(M0, Y0, f0, 0, 0.4, 0, 10, [0.72, 0.56, 0.36], {
            speed: 3.5,
            size: 1.6,
          }),
            h.breakProp(uc.set(M0, Y0, f0), "wood"));
        },
        lt = s.addCollider(
          M0 - _0 / 2,
          L,
          f0 - F0 / 2,
          M0 + _0 / 2,
          A,
          f0 + F0 / 2,
          "wood",
          {
            onShot: (H0) => {
              --j0 <= 0 && Z0(H0);
            },
            onBlast: () => Z0(null),
          },
        );
      (k.push(lt),
        m.push(() => {
          j0 = 2;
        }));
    }
    ((P.instanceColor.needsUpdate = !0),
      e.add(P),
      m.push(() => {
        (k.forEach((p0, t0) => {
          ((p0.off = !1), P.setMatrixAt(t0, z[t0]));
        }),
          (P.instanceMatrix.needsUpdate = !0));
      }));
  }
  function w(E, _, R, C, L = 1.4) {
    let A = l.tv({
        w: L,
      }),
      H = x(A, E, _, R, C).kept.find(($) => $.name === "screen");
    if (!H) return;
    let F = new Vector3(Math.sin(C), 0, Math.cos(C)),
      P = L * 0.58,
      z = 0.06,
      k = Math.abs(F.x) > 0.5 ? z : L / 2,
      I = Math.abs(F.x) > 0.5 ? L / 2 : z,
      G = !1,
      K = s.addCollider(
        E - k,
        _ - P / 2,
        R - I,
        E + k,
        _ + P / 2,
        R + I,
        "glass",
        {
          noMove: !0,
          onShot: ($) => {
            G ||
              ((G = !0),
              (H.material = r.screenOff),
              a.sparks($.x, $.y, $.z, F.x, 0.2, F.z, 16, {
                speed: 5,
              }),
              h.sparks($),
              h.breakProp($, "glass"));
          },
        },
      );
    m.push(() => {
      ((G = !1), (H.material = r.screenOn));
    });
  }
  function T(E, _, R) {
    let C = l.extinguisher();
    x(C, E, null, _, R);
    let L = C.position.y,
      A = new Vector3(Math.sin(R), 0, Math.cos(R)),
      O = !1,
      H = new Vector3(E + A.x * 0.12, L + 0.1, _ + A.z * 0.12);
    (s.addCollider(
      H.x - 0.14,
      L - 0.3,
      H.z - 0.14,
      H.x + 0.14,
      L + 0.3,
      H.z + 0.14,
      "metal",
      {
        noMove: !0,
        onShot: () => {
          if (O) return;
          ((O = !0), h.extinguisher(H, 4.5));
          let F = 0,
            P = new Vector3(
              A.x + randomRange(-0.5, 0.5),
              0.25,
              A.z + randomRange(-0.5, 0.5),
            ).normalize();
          a.emitters.push((z) => {
            if (((F += z), F > 4.5)) return !1;
            let k = 1 - F / 4.5;
            for (let I = 0; I < 2; I++)
              a.smoke(H.x, H.y, H.z, 1, {
                size: 0.16,
                life: 1.5,
                a: 0.5 * k + 0.12,
                dx: P.x,
                dy: P.y,
                dz: P.z,
                speed: 5.5 * k + 1,
                color: [0.92, 0.94, 0.96],
                bright: 1.4,
                drag: 2.2,
                spread: 0.03,
              });
          });
        },
      },
    ),
      m.push(() => {
        O = !1;
      }));
  }
  (f(-4, 0, -4.4, 4, 1.1, -3.7, r.marbleDark, {
    ao: 0.5,
  }),
    u(-4.06, 1.1, -4.46, 4.06, 1.14, -3.64, r.brass),
    u(-3.8, 0.22, -3.7, 3.8, 0.96, -3.675, r.onyx, {
      shadow: !1,
    }),
    u(-3.86, 0.16, -3.7, 3.86, 0.22, -3.66, r.brass),
    u(-3.86, 0.96, -3.7, 3.86, 1.02, -3.66, r.brass),
    u(-3.9, 0.02, -3.7, 3.9, 0.07, -3.685, r.ledStrip, {
      shadow: !1,
    }),
    a.addGlow(new Vector3(0, 0, -2.9), qd, 9, 2.4, 16742954, 0.55),
    f(-3.6, 0, -7.9, -0.4, 0.9, -7.45, r.walnut),
    u(-3.62, 0.9, -7.9, -0.38, 0.93, -7.43, r.marbleDark),
    x(l.laptop(), -2.2, 1.14, -4.12, Il),
    x(l.laptop(), 2.3, 1.14, -4.12, Il));
  {
    let E = x(l.receptionBell(), 1.1, 1.14, -3.86, Br);
    for (let _ of E.cols) ((_.noMove = !0), (_.onShot = (R) => h.bell(R)));
    E.cols.length ||
      s.addCollider(1.02, 1.14, -3.94, 1.18, 1.26, -3.78, "metal", {
        noMove: !0,
        onShot: (_) => h.bell(_),
      });
  }
  (x(
    l.vase({
      variant: 1,
    }),
    -3.3,
    1.14,
    -4.05,
    Br,
  ),
    x(
      l.books({
        variant: 0,
      }),
      3.3,
      1.14,
      -4.1,
      Br,
    ));
  {
    let E = r.makeSign("SOLSTICE", {
      w: 4.4,
      h: 0.72,
      color: "#f1cf8e",
      glow: 2.2,
    });
    (E.position.set(0, 2.5, -7.885), s.loose.push(E));
    let _ = r.makeSign("S O L S T I C E", {
      w: 8.2,
      h: 0.9,
      color: "#f3d59a",
      glow: 2.6,
    });
    (_.position.set(0, 6.35, -7.93), s.loose.push(_));
    let R = r.makeSign("H O T E L   &   S K Y   L O U N G E", {
      w: 5.2,
      h: 0.22,
      color: "#caa56a",
      glow: 1.2,
    });
    (R.position.set(0, 5.62, -7.93),
      s.loose.push(R),
      a.addGlow(
        new Vector3(0, 6.3, -7.93),
        new Vector3(0, 0, 1),
        10,
        3.2,
        16751164,
        0.35,
      ));
  }
  for (let E of [-9.7, -6.5, 6.5, 9.7])
    x(l.elevatorDoor(), E, null, -7.895, Br);
  {
    let C = (A, O = 0.003) => {
        let H = [];
        return (
          A.forEach((F, P) => {
            let z = A[P - 1],
              k = A[P + 1];
            if (z) {
              let I = Math.hypot(F[0] - z[0], F[1] - z[1]);
              I > O * 3 &&
                H.push([
                  F[0] + ((z[0] - F[0]) * O) / I,
                  F[1] + ((z[1] - F[1]) * O) / I,
                ]);
            }
            if ((H.push(F), k)) {
              let I = Math.hypot(k[0] - F[0], k[1] - F[1]);
              I > O * 3 &&
                H.push([
                  F[0] + ((k[0] - F[0]) * O) / I,
                  F[1] + ((k[1] - F[1]) * O) / I,
                ]);
            }
          }),
          H
        );
      },
      L = (A, O, H) =>
        c.lathe(0, 0, 3.2, H === 0 ? A : C(A, H), O, {
          seg: 112,
        });
    (L(
      [
        [1.36, 0],
        [1.43, 0],
        [1.43, 0.085],
        [1.36, 0.085],
      ],
      r.marbleDark,
    ),
      L(
        [
          [1.42, 0.082],
          [1.512, 0.082],
          [1.524, 0.09],
          [1.527, 0.102],
          [1.524, 0.114],
          [1.512, 0.122],
          [1.492, 0.122],
        ],
        r.brass,
        0,
      ));
    {
      let k = [],
        I = [],
        G = [],
        K = (n0, e0) => {
          let p0 = e0 / 4,
            t0 = ((n0 + p0) / 288) * Math.PI * 2,
            M0 = Math.sin(Math.PI * p0),
            f0 = 1.49 + 0.0115 * Math.pow(M0, 0.75),
            _0 =
              (0.0115 *
                0.75 *
                Math.pow(Math.max(M0, 0.001), -0.25) *
                Math.cos(Math.PI * p0) *
                Math.PI *
                288) /
              (Math.PI * 2),
            F0 = Math.cos(t0),
            m0 = Math.sin(t0),
            S0 = f0 * F0 + _0 * m0,
            T0 = f0 * m0 - _0 * F0,
            j0 = Math.hypot(S0, T0) || 1;
          return {
            x: f0 * F0,
            z: f0 * m0,
            nx: S0 / j0,
            nz: T0 / j0,
            v: t0 * 1.49,
          };
        };
      for (let n0 = 0; n0 < 288; n0++)
        for (let e0 = 0; e0 < 4; e0++) {
          let p0 = K(n0, e0),
            t0 = K(n0, e0 + 1);
          for (let [M0, f0] of [
            [p0, 0.12],
            [t0, 0.412],
            [t0, 0.12],
            [p0, 0.12],
            [p0, 0.412],
            [t0, 0.412],
          ])
            (k.push(0 + M0.x, f0, 3.2 + M0.z),
              I.push(M0.nx, 0, M0.nz),
              G.push(f0 + 2.3, M0.v));
        }
      let $ = new BufferGeometry();
      ($.setAttribute("position", new Float32BufferAttribute(k, 3)),
        $.setAttribute("normal", new Float32BufferAttribute(I, 3)),
        $.setAttribute("uv", new Float32BufferAttribute(G, 2)),
        c.add($, r.woodDark, {
          keepUV: !0,
        }));
    }
    (L(
      [
        [1.48, 0.405],
        [1.508, 0.405],
        [1.52, 0.411],
        [1.523, 0.4215],
        [1.52, 0.432],
        [1.508, 0.438],
        [1.48, 0.438],
      ],
      r.brass,
      0,
    ),
      L(
        [
          [1.47, 0.436],
          [1.548, 0.436],
          [1.561, 0.442],
          [1.568, 0.455],
          [1.57, 0.4665],
          [1.568, 0.478],
          [1.561, 0.491],
          [1.548, 0.497],
          [1.452, 0.497],
        ],
        r.marbleDark,
        0.0025,
      ),
      L(
        [
          [1.452, 0.497],
          [1.438, 0.497],
        ],
        r.brass,
        0,
      ),
      L(
        [
          [1.438, 0.497],
          [1.316, 0.497],
          [1.306, 0.489],
          [1.306, 0.45],
        ],
        r.marbleDark,
        0.0025,
      ),
      L(
        [
          [1.306, 0.474],
          [1.292, 0.474],
          [1.292, 0.45],
        ],
        r.brass,
        0.002,
      ),
      c.add(new CircleGeometry(1.3, 72), r.terracotta, {
        matrix: new Matrix4()
          .makeRotationX(-Math.PI / 2)
          .setPosition(0, 0.456, 3.2),
      }));
    {
      let A = createRandom(4711),
        O = new Matrix4(),
        H = new Quaternion(),
        F = new Euler(),
        P = (z) => {
          let k = z
              ? new IcosahedronGeometry(1, 0)
              : new OctahedronGeometry(1, 0),
            I = k.attributes.position,
            G = k.attributes.normal,
            K = new Vector3();
          for (let $ = 0; $ < I.count; $++)
            (K.fromBufferAttribute(I, $).normalize(),
              G.setXYZ($, K.x, K.y, K.z));
          return k;
        };
      for (let z = 0; z < 1300; z++) {
        let k = A() * Math.PI * 2,
          I = 1.288 - Math.pow(A(), 1.35) * 0.78,
          G = A.range(0.017, 0.036),
          K = A() < 0.14;
        c.add(P(I > 1.14 && z % 3 === 0), K ? r.plasterDark : r.terracotta, {
          matrix: O.compose(
            new Vector3(
              0 + Math.cos(k) * I,
              0.457 + G * 0.28 + (I > 1.2 ? (I - 1.2) * 0.12 : 0),
              3.2 + Math.sin(k) * I,
            ),
            H.setFromEuler(
              F.set(A.range(-0.3, 0.3), A() * 6.28, A.range(-0.3, 0.3)),
            ),
            new Vector3(
              G * A.range(0.95, 1.6),
              G * A.range(0.42, 0.62),
              G * A.range(0.8, 1.15),
            ),
          ),
        });
      }
    }
    (s.addCollider(-1.15, 0, 2.05, 1.15, 0.5, 4.35, "marble"),
      s.addCollider(-1.5, 0, 2.75, 1.5, 0.5, 3.65, "marble"),
      s.addCollider(-0.45, 0, 1.7, 0.45, 0.5, 4.7, "marble"),
      s.aoBlob(0, 3.2, 0, 2.1, 2.1, 0.5));
    for (let [A, O, H, F] of [
      [0, 0, 1.45, 0.4],
      [0.72, 0.38, 0.95, 2.1],
      [-0.62, 0.5, 1.05, 4],
      [-0.1, -0.78, 0.9, 5.3],
    ]) {
      let P = l.planter({
        variant: 0,
      });
      (P.scale.setScalar(H),
        x(P, A, 0.49 - 0.3 * H, 3.2 + O, F, {
          ao: !1,
          col: {
            off: !0,
          },
        }));
    }
  }
  for (let E of [-1, 1]) {
    let _ = E * 4.5;
    (x(
      l.rug({
        w: 4.6,
        d: 3.6,
        variant: E < 0 ? 0 : 1,
      }),
      _,
      0.002,
      6.35,
      0,
    ),
      x(
        l.sofa({
          seats: 3,
          mat: E < 0 ? "leatherTan" : "velvetTeal",
        }),
        _,
        0,
        7.55,
        Il,
      ),
      x(
        l.sofa({
          seats: 2,
          mat: E < 0 ? "leatherTan" : "velvetTeal",
        }),
        _,
        0,
        5.1,
        Br,
      ),
      x(
        l.coffeeTable({
          variant: E < 0 ? 0 : 1,
        }),
        _,
        0,
        6.35,
        0,
      ),
      x(
        l.armchair({
          mat: E < 0 ? "velvetTeal" : "leatherTan",
        }),
        _ - E * 2.35,
        0,
        6.35,
        E < 0 ? $i : Oi,
      ),
      x(l.sideTable(), _ + E * 1.95, 0, 7.6, 0, {
        fixed: !0,
      }),
      x(
        l.tableLamp({
          variant: 0,
        }),
        _ + E * 1.95,
        l.sideTable().userData.size[1],
        7.6,
        0,
        {
          fixed: !0,
        },
      ),
      x(
        l.vase({
          variant: E < 0 ? 0 : 2,
        }),
        _ + E * 0.3,
        0.42,
        6.3,
        0,
      ),
      x(
        l.books({
          variant: 1,
        }),
        _ - E * 0.4,
        0.42,
        6.5,
        0.4,
      ),
      x(l.floorLamp(), _ - E * 1.9, 0, 4.7, 0, {
        fixed: !0,
      }));
  }
  (x(l.piano(), 4.9, 0, -0.6, 0, {
    col: {
      onShot: (E) => h.pianoNote(E),
    },
  }),
    x(l.luggageCart(), 10.5, 0, 6.6, 0.2),
    x(
      l.suitcase({
        variant: 0,
      }),
      10.9,
      0,
      5.5,
      0.3,
    ),
    x(
      l.suitcase({
        variant: 1,
      }),
      10.1,
      0,
      5.3,
      -0.4,
    ),
    x(
      l.suitcase({
        variant: 2,
      }),
      11,
      0,
      7.8,
      1.2,
    ),
    x(l.wetFloorSign(), -2.4, 0, -0.9, 0.5),
    x(l.trashBin(), -11.45, 0, 1.3, 0),
    x(l.trashBin(), 11.45, 0, 1.3, 0),
    x(
      l.planter({
        variant: 1,
      }),
      -11.3,
      0,
      -4.6,
      0,
    ),
    x(
      l.planter({
        variant: 1,
      }),
      11.3,
      0,
      -4.6,
      1,
    ),
    x(
      l.planter({
        variant: 1,
      }),
      -11.25,
      0,
      7.2,
      2,
    ),
    x(
      l.planter({
        variant: 2,
      }),
      0,
      0,
      9.45,
      0,
    ),
    x(
      l.painting({
        variant: 0,
        w: 2.2,
        h: 1.4,
        frame: "brass",
      }),
      -11.895,
      1.85,
      -1.7,
      Oi,
    ),
    x(
      l.painting({
        variant: 1,
        w: 2.2,
        h: 1.4,
        frame: "brass",
      }),
      11.895,
      1.85,
      -1.7,
      $i,
    ));
  for (let E of [-1, 1])
    (x(l.wallSconce(), E * 11.895, 2.1, 7.4, E < 0 ? Oi : $i),
      x(l.wallSconce(), E * 11.895, 2.1, 0.9, E < 0 ? Oi : $i),
      x(l.wallSconce(), E * 11.895, 2.1, -4.4, E < 0 ? Oi : $i));
  (x(
    l.exitSign({
      ceiling: !0,
    }),
    -7,
    Ye - 0.001,
    9.3,
    0,
  ),
    x(
      l.exitSign({
        ceiling: !0,
      }),
      7,
      Ye - 0.001,
      9.3,
      0,
    ));
  {
    let E = 4701;
    for (let _ of [-1, 1])
      for (let R of [-2.6, 2.4, 7.2]) {
        let C = _ * 11.94;
        (u(
          _ < 0 ? C : C - 0.04,
          Qt,
          R - 0.5,
          _ < 0 ? C + 0.04 : C,
          Qt + 2.15,
          R + 0.5,
          r.woodDark,
        ),
          u(
            _ < 0 ? C : C - 0.06,
            Qt,
            R - 0.58,
            _ < 0 ? C + 0.06 : C,
            Qt + 2.23,
            R - 0.5,
            r.brass,
          ),
          u(
            _ < 0 ? C : C - 0.06,
            Qt,
            R + 0.5,
            _ < 0 ? C + 0.06 : C,
            Qt + 2.23,
            R + 0.58,
            r.brass,
          ),
          u(
            _ < 0 ? C : C - 0.06,
            Qt + 2.15,
            R - 0.58,
            _ < 0 ? C + 0.06 : C,
            Qt + 2.23,
            R + 0.58,
            r.brass,
          ));
        let L = r.makeSign(String(E++), {
          w: 0.36,
          h: 0.13,
          color: "#e7c586",
          glow: 0.8,
        });
        (L.position.set(C + (_ < 0 ? 0.012 : -0.012), Qt + 1.75, R - 0.86),
          (L.rotation.y = _ < 0 ? Oi : $i),
          s.loose.push(L),
          x(
            l.wallSconce(),
            C + (_ < 0 ? 0.005 : -0.005),
            Qt + 1.95,
            R + 1.05,
            _ < 0 ? Oi : $i,
          ));
      }
    (x(
      l.painting({
        variant: 2,
        w: 2.6,
        h: 1.6,
        frame: "black",
      }),
      -6.4,
      Qt + 1.75,
      -7.935,
      Br,
    ),
      x(
        l.painting({
          variant: 3,
          w: 2.6,
          h: 1.6,
          frame: "black",
        }),
        6.4,
        Qt + 1.75,
        -7.935,
        Br,
      ));
    for (let _ of [-1, 1])
      (x(l.sideTable(), _ * 11.5, Qt, 0, 0, {
        fixed: !0,
      }),
        x(
          l.vase({
            variant: _ < 0 ? 2 : 0,
          }),
          _ * 11.5,
          Qt + l.sideTable().userData.size[1],
          0,
          0,
        ),
        x(
          l.planter({
            variant: 1,
          }),
          _ * 11.35,
          Qt,
          -7.3,
          0,
        ),
        x(
          l.armchair({
            mat: "leatherBlack",
          }),
          _ * 11.3,
          Qt,
          5.75,
          _ < 0 ? Oi : $i,
        ));
    (x(
      l.exitSign({
        ceiling: !1,
      }),
      -11,
      Qt + 2.5,
      9.88,
      Il,
    ),
      x(
        l.exitSign({
          ceiling: !1,
        }),
        11,
        Qt + 2.5,
        9.88,
        Il,
      ));
  }
  (f(-25, 0, -6.3, -16, 1.05, -5.6, r.marbleDark, {
    ao: 0.5,
  }),
    u(-25.08, 1.05, -6.42, -15.92, 1.1, -5.48, r.marbleFloor),
    u(-24.9, 0.03, -5.6, -16.1, 0.08, -5.585, r.ledStrip, {
      shadow: !1,
    }));
  {
    let L = 1.4800000000000004;
    (c.bbox(-24.94, 0.955, -5.6 - 0.002, -16.06, 0.985, -5.6 + 0.012, r.brass, {
      r: 0.004,
      seg: 1,
    }),
      c.bbox(
        -24.94,
        0.118,
        -5.6 - 0.002,
        -16.06,
        0.142,
        -5.6 + 0.012,
        r.brass,
        {
          r: 0.004,
          seg: 1,
        },
      ));
    for (let F = 0; F <= 6; F++) {
      let P = -24.94 + F * L;
      c.bbox(
        P - 0.011,
        0.142,
        -5.6 - 0.002,
        P + 0.011,
        0.955,
        -5.6 + 0.009,
        r.brass,
        {
          r: 0.003,
          seg: 1,
        },
      );
    }
    for (let F = 0; F < 6; F++) {
      let P = -24.94 + F * L + 0.085,
        z = -24.94 + (F + 1) * L - 0.085;
      c.bbox(P, 0.215, -5.6 - 0.002, z, 0.885, -5.6 + 0.016, r.marbleDark, {
        r: 0.008,
        seg: 1,
      });
      for (let [k, I, G, K] of [
        [P + 0.06, 0.275, z - 0.06, 0.281],
        [P + 0.06, 0.819, z - 0.06, 0.825],
        [P + 0.06, 0.281, P + 0.066, 0.819],
        [z - 0.066, 0.281, z - 0.06, 0.819],
      ])
        u(k, I, -5.6 + 0.016, G, K, -5.6 + 0.0172, r.brass, {
          shadow: !1,
        });
    }
    let A = 0.2,
      O = -5.44,
      H = 0.019;
    c.rod([-24.94 + 0.1, A, O], [-16.06 - 0.1, A, O], H, r.brass, {
      seg: 14,
    });
    for (let F of [-24.94 + 0.1, -16.06 - 0.1])
      c.add(new SphereGeometry(H * 1.25, 12, 8), r.brass, {
        matrix: new Matrix4().makeTranslation(F, A, O),
      });
    for (let F = -24.94 + 0.42; F < -16.06 - 0.2; F += 1.146)
      (c.rod([F, A, -5.6 + 0.012], [F, A, O - 0.004], 0.011, r.brass, {
        seg: 10,
      }),
        c.rod([F, A, -5.6 + 0.008], [F, A, -5.6 + 0.02], 0.03, r.brass, {
          seg: 14,
          r2: 0.022,
        }),
        c.rod([F - 0.03, A, O], [F + 0.03, A, O], H + 0.006, r.brass, {
          seg: 14,
        }));
  }
  (a.addGlow(new Vector3(-20.5, 0, -4.9), qd, 10, 2.2, 16738848, 0.5),
    f(-25, 0, -7.9, -16, 0.95, -7.3, r.woodDark),
    u(-25.02, 0.95, -7.9, -15.98, 0.99, -7.28, r.marbleDark),
    u(-25, 1, -7.9, -16, 3.05, -7.86, r.onyx, {
      shadow: !1,
    }),
    u(-25.06, 0.99, -7.9, -25, 3.1, -7.6, r.brass),
    u(-16, 0.99, -7.9, -15.94, 3.1, -7.6, r.brass),
    u(-25.06, 3.05, -7.9, -15.94, 3.1, -7.6, r.brass));
  let S = [1.42, 1.94, 2.46];
  for (let E of S)
    (u(-24.98, E - 0.025, -7.86, -16.02, E, -7.6, r.brass),
      s.addCollider(-24.98, E - 0.025, -7.86, -16.02, E, -7.6, "metal", {
        noMove: !0,
      }));
  {
    let E = createRandom(77),
      _ = [[], [], []];
    for (let C of S)
      for (let L = -24.75; L < -16.2; L += E.range(0.3, 0.52))
        _[E.int(0, 2)].push([L, C, -7.72 + E.range(-0.04, 0.04), E() * 6.28]);
    for (let C = -24.4; C < -16.5; C += E.range(1.4, 2.4))
      _[E.int(0, 2)].push([C, 1.1, -6 + E.range(-0.15, 0.15), E() * 6.28]);
    let R = [3496239, 8014364, 13623524];
    _.forEach((C, L) => {
      let { geometry: A, material: O } = l.bottleGeometry(L),
        H = new InstancedMesh(A, O, C.length);
      H.castShadow = !0;
      let F = [],
        P = [];
      (C.forEach(([z, k, I, G], K) => {
        let $ = new Matrix4().compose(
          new Vector3(z, k, I),
          new Quaternion().setFromAxisAngle(qd, G),
          new Vector3(1, 1, 1),
        );
        (H.setMatrixAt(K, $), F.push($));
        let n0 = () => {
            e0.off ||
              ((e0.off = !0),
              H.setMatrixAt(K, Rw),
              (H.instanceMatrix.needsUpdate = !0),
              uc.set(z, k + 0.15, I),
              i.burst(uc, 7, R[L], 0.035, 2.2, 1.2),
              a.splash(uc, 0.35),
              h.breakProp(uc, "glass"));
          },
          e0 = s.addCollider(
            z - 0.05,
            k,
            I - 0.05,
            z + 0.05,
            k + 0.31,
            I + 0.05,
            "glass",
            {
              noMove: !0,
              silent: !0,
              onShot: n0,
              onBlast: n0,
            },
          );
        P.push(e0);
      }),
        e.add(H),
        m.push(() => {
          (P.forEach((z, k) => {
            ((z.off = !1), H.setMatrixAt(k, F[k]));
          }),
            (H.instanceMatrix.needsUpdate = !0));
        }));
    });
  }
  for (let E = 0; E < 7; E++)
    x(l.barStool(), -24.1 + E * 1.2, 0, -4.95, randomRange(-0.4, 0.4));
  for (let E = 0; E < 5; E++)
    x(
      l.pendantLamp({
        drop: 0.95,
      }),
      -24 + E * 1.75,
      Ye - 0.04,
      -5.95,
      0,
    );
  for (let E of [1.9, 6.6])
    (x(
      l.sofa({
        seats: 2,
        mat: "leatherBlack",
      }),
      -26.6,
      0,
      E,
      Oi,
    ),
      x(
        l.coffeeTable({
          variant: 1,
        }),
        -25.2,
        0,
        E,
        Oi,
      ),
      x(
        l.loungeChair({
          mat: "leatherTan",
        }),
        -23.7,
        0,
        E,
        $i,
      ));
  (x(
    l.rug({
      w: 4.6,
      d: 7.6,
      variant: 2,
    }),
    -25.2,
    0.002,
    4.25,
    0,
  ),
    x(l.floorLamp(), -27.2, 0, 4.25, 0, {
      fixed: !0,
    }));
  for (let [E, _] of [
    [-19.4, 5.6],
    [-21.3, 7.6],
  ])
    (x(
      l.diningTable({
        r: 0.42,
      }),
      E,
      0,
      _,
      0,
    ),
      x(l.barStool(), E + 0.75, 0, _ + 0.2, 1),
      x(l.barStool(), E - 0.6, 0, _ - 0.55, 2));
  M("x", -17, 0.2, 5, 0.1, 3.2);
  {
    let E = x(l.speaker(), -12.45, 0, 8.3, $i),
      _ = new Vector3(-12.5, 0.9, 8.3);
    hotel.speakerPos = _;
    let R = E.kept.find((A) => A.name === "bulb"),
      C = R ? R.material.emissiveIntensity : 0,
      L = !1;
    for (let A of E.cols)
      A.onShot = (O) => {
        L ||
          ((L = !0),
          h.lounge.kill(),
          R && (R.material.emissiveIntensity = 0),
          a.sparks(O.x, O.y, O.z, -1, 0.4, 0, 14, {
            speed: 4,
          }),
          h.sparks(O));
      };
    m.push(() => {
      ((L = !1), R && (R.material.emissiveIntensity = C), h.lounge.start(_));
    });
  }
  (x(
    l.painting({
      variant: 3,
      w: 1.8,
      h: 1.2,
      frame: "brass",
    }),
    -15,
    1.85,
    9.895,
    Il,
  ),
    x(
      l.planter({
        variant: 2,
      }),
      -22.4,
      0,
      9.45,
      0,
    ),
    x(
      l.planter({
        variant: 1,
      }),
      -12.7,
      0,
      -4.3,
      0,
    ),
    x(l.wallSconce(), -12.105, 2.05, 0.6, $i),
    x(l.wallSconce(), -27.895, 2.05, -4.5, Oi),
    x(
      l.exitSign({
        ceiling: !0,
      }),
      -20,
      Ye - 0.041,
      9.2,
      0,
    ),
    x(l.trashBin(), -15.4, 0, -7.4, 0),
    [
      [-20.8, -16],
      [-20.6, -10.6],
      [-14.2, -16.1],
      [-26, -14.8],
      [-16.4, -10.5],
    ].forEach(([_, R], C) => {
      x(
        l.diningTable({
          r: 0.62,
        }),
        _,
        0,
        R,
        0,
      );
      let L = 4,
        A = Kd / 4;
      for (let O = 0; O < L; O++) {
        let H = A + O * ((Kd * 2) / L);
        x(
          l.diningChair({
            mat: C % 2 ? "velvetTeal" : "leatherTan",
          }),
          _ + Math.sin(H) * 1.02,
          0,
          R + Math.cos(H) * 1.02,
          H + Kd,
        );
      }
      C % 2 === 0 &&
        x(
          l.vase({
            variant: C % 3,
          }),
          _,
          0.76,
          R,
          0,
        );
    }),
    x(
      l.sofa({
        seats: 3,
        mat: "leatherTan",
      }),
      -23.2,
      0,
      -19.35,
      Br,
    ),
    x(
      l.sofa({
        seats: 3,
        mat: "leatherTan",
      }),
      -12.6,
      0,
      -19.35,
      Br,
    ),
    M("z", -13, -12.4, -9, 0.1, 3.2),
    x(l.serviceTrolley(), -8, 0, -10.6, 0.3),
    x(
      l.planter({
        variant: 0,
      }),
      -27,
      0,
      -8.9,
      0,
    ),
    x(
      l.planter({
        variant: 1,
      }),
      -6.8,
      0,
      -19.2,
      0,
    ),
    x(
      l.painting({
        variant: 2,
        w: 1.6,
        h: 1.1,
        frame: "brass",
      }),
      -20,
      1.9,
      -8.105,
      Il,
    ));
  for (let E of [-25, -9.5]) x(l.wallSconce(), E, 2.1, -8.105, Il);
  for (let [E, _] of [
    [-20.8, -16],
    [-14.2, -16.1],
    [-20.6, -10.6],
  ])
    x(
      l.pendantLamp({
        drop: 1.25,
      }),
      E,
      Ye - 0.04,
      _,
      0,
    );
  (x(
    l.exitSign({
      ceiling: !0,
    }),
    -13.85,
    Ye - 0.041,
    -8.8,
    0,
  ),
    x(l.shelfRack(), -5.55, 0, -10.2, Oi),
    x(l.shelfRack(), -5.55, 0, -17.8, Oi),
    x(l.shelfRack(), 5.55, 0, -10.4, $i),
    x(l.shelfRack(), 5.55, 0, -18, $i),
    x(l.luggageCart(), -2, 0, -18.9, Oi),
    x(
      l.suitcase({
        variant: 0,
      }),
      -3.3,
      0,
      -18.4,
      0.5,
    ),
    x(
      l.suitcase({
        variant: 2,
      }),
      -0.6,
      0,
      -19.2,
      -0.3,
    ),
    x(
      l.suitcase({
        variant: 1,
      }),
      -2,
      0.232,
      -18.9,
      1.4,
    ),
    f(2.4, 0, -19.6, 3.4, 0.9, -18.7, r.woodLight, {
      ao: 0.4,
    }),
    f(3.5, 0, -19.5, 4.3, 0.7, -18.8, r.woodLight, {
      ao: 0.4,
    }),
    f(2.6, 0.9, -19.5, 3.3, 1.5, -18.85, r.woodLight),
    x(l.trashBin(), 4.9, 0, -8.6, 0),
    x(l.wetFloorSign(), -1.2, 0, -12.4, 1.2),
    T(-1.2, -8.105, Il),
    x(
      l.exitSign({
        ceiling: !0,
      }),
      2.9,
      Ye - 0.041,
      -8.6,
      0,
    ),
    u(-0.9, Ye - 0.1, -14.4, 0.9, Ye - 0.04, -14.1, r.bulbCool, {
      shadow: !1,
    }),
    a.addGlow(new Vector3(0, 0, -14.25), qd, 6, 4, 12574975, 0.22));
  {
    for (let [A, O] of [
      [13, -12.2],
      [20.5, -12.2],
      [13, -16.4],
      [20.5, -16.4],
    ])
      (x(
        l.kitchenCounter({
          len: 5,
        }),
        A,
        0,
        O,
        0,
      ),
        x(
          l.pot({
            variant: 0,
          }),
          A - 1.6,
          0.92,
          O + randomRange(-0.1, 0.1),
          randomRange(0, 6),
        ),
        x(
          l.pot({
            variant: 1,
          }),
          A + 0.4,
          0.92,
          O + randomRange(-0.1, 0.1),
          randomRange(0, 6),
        ),
        x(
          l.pot({
            variant: 2,
          }),
          A + 1.8,
          0.92,
          O,
          randomRange(0, 6),
        ));
    for (let A of [14.5, 15.6, 16.7, 21.5]) x(l.stove(), A, 0, -19.55, Br);
    (x(l.fridge(), 27.5, 0, -11.15, $i),
      x(l.fridge(), 27.5, 0, -12.6, $i),
      x(l.shelfRack(), 27.5, 0, -16.6, $i),
      x(l.shelfRack(), 9.2, 0, -19.55, Br),
      x(l.serviceTrolley(), 8.4, 0, -17.2, 0.6),
      x(l.trashBin(), 6.6, 0, -9.2, 0),
      T(6.105, -10.4, Oi),
      x(
        l.exitSign({
          ceiling: !0,
        }),
        14,
        Ye - 0.041,
        -8.7,
        0,
      ));
    for (let [A, O] of [
      [11.5, -14.3],
      [17, -14.3],
      [22.5, -14.3],
    ])
      (u(
        A - 0.9,
        Ye - 0.1,
        O - 0.12,
        A + 0.9,
        Ye - 0.04,
        O + 0.12,
        r.bulbCool,
        {
          shadow: !1,
        },
      ),
        a.addGlow(new Vector3(A, 0, O), qd, 7, 5, 14216447, 0.2));
    let _ = hotel.kitchenCeil,
      R = new InstancedMesh(
        new PlaneGeometry(0.6, 0.6),
        new MeshBasicMaterial({
          color: 328965,
          fog: !1,
        }),
        16,
      );
    for (let A = 0; A < 16; A++) R.setMatrixAt(A, Rw);
    e.add(R);
    let C = new Set(),
      L = 0;
    ((_.onShot = (A) => {
      let O = Math.floor((A.x - 6) / 0.6),
        H = Math.floor((A.z + 20) / 0.6),
        F = O * 100 + H;
      if (C.has(F) || C.size >= 16) return;
      C.add(F);
      let P = 6 + (O + 0.5) * 0.6,
        z = -20 + (H + 0.5) * 0.6;
      (OD.setFromAxisAngle(uc.set(1, 0, 0), Kd / 2),
        R.setMatrixAt(
          L++ % 16,
          m$.compose(uc.set(P, _.y0 - 0.003, z), OD, g$.set(1, 1, 1)),
        ),
        (R.instanceMatrix.needsUpdate = !0));
      let k = new Mesh(new BoxGeometry(0.58, 0.02, 0.58), r.ceilingTile);
      (k.position.set(P, _.y0 - 0.05, z),
        k.rotation.set(randomRange(-0.3, 0.3), 0, randomRange(-0.3, 0.3)),
        (k.castShadow = !0));
      let I = i.addProp(k, {
        size: [0.58, 0.04, 0.58],
        center: [0, 0, 0],
        mass: 2,
        mat: "plastic",
      });
      ((I.temp = !0),
        (I.life = 40),
        i.wake(I),
        a.smoke(P, _.y0 - 0.1, z, 3, {
          size: 0.3,
          life: 1.6,
          a: 0.3,
          color: [0.8, 0.8, 0.78],
          dy: -1,
        }));
    }),
      m.push(() => {
        (C.clear(), (L = 0));
        for (let A = 0; A < 16; A++) R.setMatrixAt(A, Rw);
        R.instanceMatrix.needsUpdate = !0;
      }));
  }
  (x(
    l.rug({
      w: 2,
      d: 12,
      variant: 1,
    }),
    14,
    0.002,
    1.5,
    0,
  ),
    x(l.sideTable(), 15.45, 0, 1.6, 0, {
      fixed: !0,
    }),
    x(
      l.vase({
        variant: 1,
      }),
      15.45,
      l.sideTable().userData.size[1],
      1.6,
      0,
    ),
    x(
      l.painting({
        variant: 0,
        w: 1.5,
        h: 1.1,
        frame: "black",
      }),
      15.895,
      1.8,
      7.6,
      $i,
    ),
    x(
      l.painting({
        variant: 2,
        w: 1.2,
        h: 1.5,
        frame: "brass",
      }),
      14,
      1.85,
      9.895,
      Il,
    ),
    x(l.wallSconce(), 15.895, 2.1, 2.9, $i),
    x(l.wallSconce(), 12.105, 2.1, 8.2, Oi),
    x(l.wallSconce(), 12.105, 2.1, -2, Oi),
    x(
      l.planter({
        variant: 1,
      }),
      12.65,
      0,
      9.3,
      0,
    ),
    x(l.trashBin(), 15.5, 0, -7.4, 0),
    x(
      l.exitSign({
        ceiling: !0,
      }),
      14,
      Ye - 0.041,
      -7.4,
      0,
    ),
    T(12.105, -4.2, Oi),
    x(l.conferenceTable(), 22, 0, -4, 0));
  for (let E of [20.6, 22, 23.4])
    (x(l.officeChair(), E, 0, -5.15, Br), x(l.officeChair(), E, 0, -2.85, Il));
  (x(l.laptop(), 21.2, l.conferenceTable().userData.size[1], -4.1, 0.2),
    x(l.laptop(), 23, l.conferenceTable().userData.size[1], -3.9, Il),
    w(22, 1.65, -0.105, Il, 1.8),
    x(
      l.planter({
        variant: 1,
      }),
      27.2,
      0,
      -0.8,
      0,
    ),
    x(
      l.planter({
        variant: 2,
      }),
      22,
      0,
      -7.55,
      0,
    ));
  for (let E of [19.5, 24.5])
    x(
      l.pendantLamp({
        drop: 0.8,
      }),
      E,
      Ye - 0.04,
      -4,
      0,
    );
  (x(l.bed(), 21.5, 0, 1.25, Br),
    x(l.nightstand(), 19.95, 0, 0.42, Br),
    x(l.nightstand(), 23.05, 0, 0.42, Br));
  {
    let E = l.nightstand().userData.size[1];
    (x(
      l.tableLamp({
        variant: 1,
      }),
      19.95,
      E,
      0.42,
      0,
      {
        fixed: !0,
      },
    ),
      x(
        l.tableLamp({
          variant: 1,
        }),
        23.05,
        E,
        0.42,
        0,
        {
          fixed: !0,
        },
      ));
  }
  (x(
    l.rug({
      w: 4.2,
      d: 3.2,
      variant: 0,
    }),
    21.5,
    0.002,
    4.6,
    0,
  ),
    x(l.desk(), 27.35, 0, 4.4, $i),
    x(l.officeChair(), 26.4, 0, 4.4, Oi),
    x(l.laptop(), 27.3, l.desk().userData.size[1], 4.5, $i),
    w(16.105, 1.55, 7.6, Oi, 1.5),
    x(
      l.armchair({
        mat: "velvetTeal",
      }),
      17.4,
      0,
      2,
      Oi,
    ),
    x(l.floorLamp(), 16.6, 0, 9.3, 0, {
      fixed: !0,
    }),
    x(
      l.suitcase({
        variant: 1,
      }),
      18.7,
      0,
      9.2,
      0.7,
    ),
    x(
      l.cushion({
        mat: "velvetTeal",
      }),
      21.1,
      0.62,
      0.7,
      0.2,
    ),
    x(
      l.cushion({
        mat: "fabricCream",
      }),
      22,
      0.62,
      0.65,
      -0.2,
    ),
    x(
      l.painting({
        variant: 3,
        w: 1.8,
        h: 1,
        frame: "brass",
      }),
      21.5,
      2.2,
      0.105,
      Br,
    ),
    f(24, 0, 0.1, 26.1, 0.82, 0.68, r.walnut, {
      ao: 0.3,
    }),
    u(23.98, 0.82, 0.1, 26.12, 0.87, 0.7, r.marbleFloor),
    u(24.2, 1.1, 0.1, 25.9, 2.2, 0.115, r.chrome, {
      shadow: !1,
    }),
    u(24.15, 1.05, 0.1, 25.95, 2.25, 0.108, r.brass),
    x(l.wallSconce(), 23.7, 1.9, 0.105, Br));
  for (let E of [-1, 1]) {
    for (let _ of [15.7, 17.4, 19.1])
      x(l.sunLounger(), E * 9, 0, _, E < 0 ? Oi : $i);
    (x(
      l.parasol({
        open: !0,
      }),
      E * 9.7,
      0,
      16.55,
      0,
    ),
      x(
        l.parasol({
          open: E > 0,
        }),
        E * 9.7,
        0,
        18.3,
        0,
      ),
      x(
        l.planter({
          variant: 0,
        }),
        E * 20.9,
        0,
        20.9,
        E,
      ),
      x(
        l.planter({
          variant: 0,
        }),
        E * 21,
        0,
        12.9,
        E * 2,
      ),
      x(
        l.planter({
          variant: 2,
        }),
        E * 3.2,
        0,
        10.75,
        0,
      ));
  }
  {
    (s.addCollider(-15.65, 0, 16.55, -14.35, 0.46, 17.85, "stone"),
      s.aoSkirt(-15.65, 16.55, -14.35, 17.85, 0, 0.5),
      c.bbox(
        -15.65 + 0.045,
        0,
        16.55 + 0.045,
        -14.35 - 0.045,
        0.07,
        17.85 - 0.045,
        r.blackMetal,
        {
          r: 0.003,
          seg: 1,
        },
      ),
      c.bbox(-15.65, 0.055, 16.55, -14.35, 0.46, 17.85, r.concrete, {
        r: 0.016,
        seg: 2,
      }));
    let O = new CircleGeometry(0.0115, 12),
      H = new Matrix4();
    for (let F = 0; F < 4; F++)
      for (let P of [-0.43, 0, 0.43])
        for (let z of [0.165, 0.365]) {
          let k = (F * Math.PI) / 2,
            I = Math.sin(k),
            G = Math.cos(k);
          c.add(O.clone(), r.rubber, {
            matrix: H.makeRotationY(k).setPosition(
              -15 + I * 0.6515 + G * P,
              z,
              17.2 + G * 0.6515 - I * P,
            ),
          });
        }
    (c.bbox(-14.66, 0.2, 16.55 - 0.005, -14.5, 0.31, 16.55 + 0.002, r.steel, {
      r: 0.002,
      seg: 1,
    }),
      c.rod(
        [-14.58, 0.262, 16.55 - 0.004],
        [-14.58, 0.262, 16.55 - 0.024],
        0.017,
        r.blackMetal,
        {
          seg: 12,
        },
      ),
      c.rod(
        [-14.58, 0.262, 16.55 - 0.024],
        [-14.58, 0.262, 16.55 - 0.03],
        0.011,
        r.steel,
        {
          seg: 10,
        },
      ),
      c.rod(
        [-14.625, 0.225, 16.55 - 0.004],
        [-14.625, 0.225, 16.55 - 0.009],
        0.006,
        r.brass,
        {
          seg: 8,
        },
      ));
  }
  (u(-15.5, 0.46, 16.7, -14.5, 0.47, 17.7, r.plasterDark, {
    shadow: !1,
  }),
    u(-15.42, 0.47, 16.78, -14.58, 0.5, 17.62, r.ledStrip, {
      shadow: !1,
    }),
    a.addGlow(new Vector3(-15, 0, 17.2), qd, 6.5, 6.5, 16742946, 0.5),
    a.emitters.push((E) => {
      for (let _ = 0; _ < 3; _++)
        Math.random() < E * 34 &&
          a.add.spawn({
            x: -15 + randomRange(-0.36, 0.36),
            y: 0.5,
            z: 17.2 + randomRange(-0.36, 0.36),
            vy: randomRange(0.9, 2),
            vx: randomRange(-0.15, 0.15),
            vz: randomRange(-0.15, 0.15),
            life: randomRange(0.35, 0.7),
            s0: randomRange(0.28, 0.42),
            s1: 0.08,
            rv: randomRange(-2, 2),
            r: 3.6,
            g: 1.25,
            b: 0.25,
            a: 0.85,
            frame: 12 + (Math.random() < 0.5 ? 1 : 0),
            drag: 0.4,
            grav: -1.2,
          });
      Math.random() < E * 5 &&
        a.add.spawn({
          x: -15 + randomRange(-0.3, 0.3),
          y: 0.7,
          z: 17.2 + randomRange(-0.3, 0.3),
          vy: randomRange(1.2, 2.6),
          vx: randomRange(-0.5, 0.5),
          vz: randomRange(-0.5, 0.5),
          life: randomRange(0.8, 1.6),
          s0: 0.025,
          s1: 0.01,
          r: 5,
          g: 2,
          b: 0.4,
          a: 1,
          frame: 15,
          drag: 0.3,
          grav: -0.6,
        });
    }),
    x(
      l.loungeChair({
        mat: "fabricCream",
      }),
      -17,
      0,
      17.2,
      Oi,
    ),
    x(
      l.loungeChair({
        mat: "fabricCream",
      }),
      -13.1,
      0,
      17.3,
      $i,
    ),
    x(
      l.loungeChair({
        mat: "fabricCream",
      }),
      -15,
      0,
      19.2,
      Il,
    ),
    x(
      l.diningTable({
        r: 0.45,
      }),
      -16.6,
      0,
      14.4,
      0,
    ),
    x(l.barStool(), -15.8, 0, 14.6, 0),
    x(l.barStool(), -17.3, 0, 14, 1));
  for (let [E, _] of [
    [14.2, 15],
    [18.2, 15],
    [14.2, 18.7],
    [18.2, 18.7],
  ])
    f(E - 0.07, 0, _ - 0.07, E + 0.07, 2.7, _ + 0.07, r.blackMetal, {
      surf: "metal",
    });
  (u(14.05, 2.7, 14.85, 18.35, 2.8, 15.15, r.blackMetal),
    u(14.05, 2.7, 18.55, 18.35, 2.8, 18.85, r.blackMetal));
  for (let E = 14.25; E <= 18.2; E += 0.33)
    u(E - 0.05, 2.8, 14.7, E + 0.05, 2.92, 19, r.woodLight);
  (x(
    l.sofa({
      seats: 3,
      mat: "fabricCream",
    }),
    16.2,
    0,
    18,
    Il,
  ),
    x(
      l.coffeeTable({
        variant: 0,
      }),
      16.2,
      0,
      16.6,
      0,
    ),
    x(
      l.cushion({
        mat: "velvetTeal",
      }),
      15.6,
      0.5,
      18,
      0.3,
    ),
    M("z", 19, 14.3, 18.1, 0.1, 2.7),
    x(l.serviceTrolley(), 5.2, 0, 13, 1.4),
    x(l.wetFloorSign(), -6.2, 0, 13.6, 0.3));
  {
    let I = function () {
        F.falling ||
          F.done ||
          ((F.falling = !0),
          (F.vy = 0),
          (z.off = !0),
          (k.off = !0),
          h.sparks(uc.set(_, R, C)));
      },
      E = l.chandelier(),
      _ = 0,
      R = Js - 0.35,
      C = 3.2;
    (E.position.set(_, R, C),
      e.add(E),
      E.traverse((G) => {
        G.isMesh && (G.castShadow = !1);
      }));
    let L = [];
    E.traverse((G) => {
      G.name === "bulb" && L.push(G);
    });
    let A = L.map((G) => G.material.emissiveIntensity),
      O = hotel.lights.chandelier,
      H = a.addGlow(new Vector3(_, 0.47, C), qd, 9, 9, 16763024, 0.3),
      F = {
        hp: 3,
        ring: 9,
        falling: !1,
        vy: 0,
        done: !1,
        tilt: 0,
      },
      P = Math.abs((E.userData.size || [2.4, 2.4, 2.4])[1]),
      z = s.addCollider(
        _ - 0.09,
        R - 1.4,
        C - 0.09,
        _ + 0.09,
        R,
        C + 0.09,
        "metal",
        {
          noMove: !0,
          onShot: (G, K, $, n0) => {
            ((F.by = n0),
              a.sparks(G.x, G.y, G.z, 0, -0.2, 0, 8),
              --F.hp <= 0 && I());
          },
          onBlast: () => I(),
        },
      ),
      k = s.addCollider(
        _ - 1.25,
        R - P,
        C - 1.25,
        _ + 1.25,
        R - P + 0.9,
        C + 1.25,
        "glass",
        {
          noMove: !0,
          onShot: (G) => {
            (a.sparks(G.x, G.y, G.z, 0, -0.4, 0, 6, {
              color: [3, 2.6, 2],
            }),
              i.burst(G, 3, 16773592, 0.03, 1.5, 0),
              h.glassCrack(G),
              --F.ring <= 0 && I());
          },
          onBlast: () => I(),
        },
      );
    ((k.onShot = ((G) => (K, $, n0, e0) => {
      ((F.by = e0), G(K));
    })(k.onShot)),
      hotel.update.push((G) => {
        if (!F.falling) {
          E.rotation.z = Math.sin(performance.now() * 6e-4) * 0.006;
          return;
        }
        ((F.vy -= 16 * G),
          (E.position.y += F.vy * G),
          (F.tilt += G * 0.5),
          (E.rotation.z = F.tilt * 0.3),
          (E.rotation.x = F.tilt * 0.2));
        let K = s.groundAt(_, C, E.position.y - P + 0.3) + P - 0.25;
        if (E.position.y <= K) {
          ((E.position.y = K), (F.falling = !1), (F.done = !0));
          let $ = new Vector3(_, K - P + 0.4, C);
          (h.chandelierCrash($),
            i.burst($, 46, 16773592, 0.05, 5.5, 2.5),
            a.sparks($.x, $.y, $.z, 0, 0.8, 0, 40, {
              speed: 9,
              life: 1.6,
            }),
            a.smoke($.x, $.y, $.z, 8, {
              size: 0.6,
              life: 2.4,
              a: 0.3,
              spread: 0.8,
            }),
            L.forEach((n0) => {
              n0.material.emissiveIntensity = 0.04;
            }),
            (O.k = 0),
            (O.light.intensity = 0),
            a.setGlow(H, 0),
            i.explode($, 3.5, 9),
            n.blast($, 1.5),
            context.onChandelier($, F.by));
        }
      }),
      m.push(() => {
        ((F.hp = 3),
          (F.ring = 9),
          (F.by = null),
          (F.falling = !1),
          (F.done = !1),
          (F.tilt = 0),
          (z.off = !1),
          (k.off = !1),
          E.position.set(_, R, C),
          E.rotation.set(0, 0, 0),
          L.forEach((G, K) => {
            G.material.emissiveIntensity = A[K];
          }),
          (O.k = 1),
          (O.light.intensity = O.base),
          a.setGlow(H, 1));
      }));
  }
  return (
    (hotel.tools = {
      place: x,
      slatScreen: M,
      tv: w,
      extinguisher: T,
      resets: m,
      PI: Kd,
      E: Oi,
      W: $i,
      S: Br,
      N: Il,
    }),
    (hotel.finishDress = g),
    hotel
  );
}

export { dressHotelBase };

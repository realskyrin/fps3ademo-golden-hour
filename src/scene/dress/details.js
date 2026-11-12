// scene/dress/details.js: recovered from the verified GOLDEN HOUR release.
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  DynamicDrawUsage,
  Euler,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  Points,
  Quaternion,
  RepeatWrapping,
  RingGeometry,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { TAU, createCanvas, createRandom } from "../../core/math.js";
import { Ll } from "../geometry.js";
import { Vn } from "../../vendor/geometry-utils.js";
import { Qt, ms } from "../hotel.js";
import { SUN_DIRECTION } from "../sky.js";

var Aw = new Vector3(0, 1, 0);
var In = (o, t, e) => new Vector3(o, t, e);
var VD = new Euler();
var y$ = new Quaternion();
var v$ = new Vector3();
var M$ = new Vector3();
var GD = (o) =>
  o === void 0 ? [1, 1, 1] : typeof o == "number" ? [o, o, o] : o;
var Ni = 8.78;
function dressHotelDetails(o, t) {
  let { scene: e, world: s, fx: n, M: i, P: a, K: r, glass: l, audio: c } = o,
    h = t.helpers.deco,
    { resets: f } = t.tools,
    u = createRandom(2207),
    d = (v0) => new MeshStandardMaterial(v0),
    m = (v0, x0 = 0.6) => {
      let C0 = i.foliage.clone();
      return (
        (C0.onBeforeCompile = i.foliage.onBeforeCompile),
        (C0.customProgramCacheKey = i.foliage.customProgramCacheKey),
        C0.color.set(v0),
        (C0.roughness = x0),
        C0
      );
    },
    p = m(2772768),
    x = m(11770450, 0.75),
    g = i.foliage,
    b = d({
      color: 797226,
      emissive: 8847344,
      emissiveIntensity: 16,
      roughness: 0.3,
    }),
    v = d({
      color: 668992,
      roughness: 0.12,
      metalness: 0,
    }),
    y = d({
      color: 14701598,
      roughness: 0.5,
    }),
    M = d({
      color: 13609060,
      roughness: 0.9,
      side: DoubleSide,
    }),
    w = y,
    T = i.plasterDark,
    S = i.ledStrip,
    E = d({
      vertexColors: !0,
      roughness: 0.32,
    }),
    _ = l.material,
    R = new Set([
      i.ledStrip,
      i.woodDark,
      i.concrete,
      i.onyx,
      i.lampShade,
      i.screenOff,
      i.chrome,
      i.plasterDark,
      i.bulbWarm,
      b,
      v,
      _,
    ]),
    C = (v0, x0) => (x0 === !1 && R.has(v0) ? !1 : void 0),
    L = (v0, x0, C0, k0, O0, B0, ot, Q0 = {}) =>
      h(v0, x0, C0, k0, O0, B0, ot, {
        ...Q0,
        shadow: C(ot, Q0.shadow),
      }),
    A = (v0, x0, C0, k0, O0, B0, ot, Q0 = Aw) =>
      n.addGlow(In(v0, x0, C0), Q0, k0, O0, B0, ot);
  function O(v0, x0, C0, k0 = 0, O0 = 1, B0 = null) {
    let ot = new Matrix4().compose(
        In(v0, x0, C0),
        new Quaternion().setFromAxisAngle(Aw, k0),
        In(O0, O0, O0),
      ),
      Q0 = B0
        ? (L0, ht, pt) => B0(L0, ht, pt)
        : (L0, ht, pt, V0) =>
            r.add(L0, ht, {
              matrix: pt,
              shadow: C(ht, V0.shadow),
              keepUV: V0.keepUV,
            }),
      nt = {
        base: ot,
        pt: (L0, ht, pt) => In(L0, ht, pt).applyMatrix4(ot),
        add(L0, ht, pt = 0, V0 = 0, c0 = 0, Z = {}) {
          VD.set(Z.rx || 0, Z.ry || 0, Z.rz || 0, Z.order || "YXZ");
          let r0 = GD(Z.s),
            b0 = new Matrix4()
              .compose(
                M$.set(pt, V0, c0),
                y$.setFromEuler(VD),
                v$.set(r0[0], r0[1], r0[2]),
              )
              .premultiply(ot);
          return (Q0(L0, ht, b0, Z), nt);
        },
        box(L0, ht, pt, V0, c0, Z, r0, b0 = {}) {
          let d0 = b0.r
            ? new Ll(
                L0,
                ht,
                pt,
                b0.seg || 1,
                Math.min(b0.r, L0 / 2.05, ht / 2.05, pt / 2.05),
              )
            : new BoxGeometry(L0, ht, pt);
          return nt.add(d0, V0, c0, Z, r0, b0);
        },
        cyl(L0, ht, pt, V0, c0, Z, r0 = {}) {
          return nt.add(
            new CylinderGeometry(
              r0.r2 ?? L0,
              L0,
              ht,
              r0.seg || 14,
              1,
              !!r0.open,
            ),
            pt,
            V0,
            c0 + ht / 2,
            Z,
            r0,
          );
        },
        lathe(L0, ht, pt = 0, V0 = 0, c0 = 0, Z = {}) {
          return nt.add(
            new LatheGeometry(
              L0.map(([r0, b0]) => new Vector2(Math.max(5e-4, r0), b0)),
              Z.seg || 18,
            ),
            ht,
            pt,
            V0,
            c0,
            Z,
          );
        },
        sphere(L0, ht, pt, V0, c0, Z = {}) {
          return nt.add(
            new SphereGeometry(L0, Z.seg || 10, Z.hseg || 8),
            ht,
            pt,
            V0,
            c0,
            Z,
          );
        },
        torus(L0, ht, pt, V0, c0, Z, r0 = {}) {
          return nt.add(
            new TorusGeometry(
              L0,
              ht,
              r0.rseg || 6,
              r0.seg || 18,
              r0.arc || TAU,
            ),
            pt,
            V0,
            c0,
            Z,
            r0,
          );
        },
        rod(L0, ht, pt, V0, c0 = {}) {
          let Z = In(...L0),
            r0 = In(...ht),
            b0 = In().subVectors(r0, Z),
            d0 = b0.length();
          if (d0 < 1e-5) return nt;
          let V = new Quaternion().setFromUnitVectors(
              Aw,
              b0.multiplyScalar(1 / d0),
            ),
            B = new Matrix4()
              .compose(Z.add(r0).multiplyScalar(0.5), V, In(1, 1, 1))
              .premultiply(ot);
          return (
            Q0(
              new CylinderGeometry(c0.r2 ?? pt, pt, d0, c0.seg || 6, 1, !1),
              V0,
              B,
              c0,
            ),
            nt
          );
        },
        tube(L0, ht, pt, V0 = {}) {
          let c0 = new CatmullRomCurve3(
            L0.map((Z) => In(...Z)),
            !!V0.closed,
            "catmullrom",
            V0.tension ?? 0.5,
          );
          return (
            Q0(
              new TubeGeometry(
                c0,
                V0.seg || L0.length * 6,
                ht,
                V0.rseg || 6,
                !!V0.closed,
              ),
              pt,
              ot,
              V0,
            ),
            nt
          );
        },
      };
    return nt;
  }
  let H = O(0, 0, 0);
  function F(v0, x0 = {}) {
    let C0 = [];
    return {
      add(k0, O0) {
        let B0 = k0.index ? k0.toNonIndexed() : k0.clone();
        (O0 && B0.applyMatrix4(O0),
          B0.attributes.normal || B0.computeVertexNormals());
        for (let ot of Object.keys(B0.attributes))
          ot !== "position" && ot !== "normal" && B0.deleteAttribute(ot);
        C0.push(B0);
      },
      flush() {
        C0.length &&
          (r.add(Vn(C0, !1), v0, {
            ...x0,
            shadow: C(v0, x0.shadow),
          }),
          (C0.length = 0));
      },
    };
  }
  let P = (v0, x0, C0, k0 = 0, O0 = 0, B0 = 0, ot = 1) => {
    let Q0 = GD(ot);
    return new Matrix4().compose(
      In(v0, x0, C0),
      new Quaternion().setFromEuler(new Euler(k0, O0, B0, "YXZ")),
      In(Q0[0], Q0[1], Q0[2]),
    );
  };
  function z(v0, x0, C0 = 0.6, k0 = 3, O0 = 0.25) {
    let B0 = [],
      ot = [],
      Q0 = 0,
      nt = 0;
    for (let ht = 0; ht <= k0; ht++) {
      let pt = ht / k0;
      if (ht) {
        let r0 = C0 * ((ht - 0.5) / k0) ** 2;
        ((Q0 += (Math.cos(r0) * v0) / k0), (nt += (Math.sin(r0) * v0) / k0));
      }
      let V0 =
          0.5 *
          x0 *
          (ht === k0
            ? 0.05
            : Math.sin(Math.PI * Math.pow(pt, 0.6)) * 0.85 + 0.15 * (1 - pt)),
        c0 = C0 * pt * pt,
        Z = O0 * V0;
      if (
        (B0.push(
          -V0,
          Q0 - Math.sin(c0) * Z,
          nt + Math.cos(c0) * Z,
          0,
          Q0,
          nt,
          V0,
          Q0 - Math.sin(c0) * Z,
          nt + Math.cos(c0) * Z,
        ),
        ht)
      ) {
        let r0 = (ht - 1) * 3,
          b0 = ht * 3;
        ot.push(
          r0,
          r0 + 1,
          b0,
          r0 + 1,
          b0 + 1,
          b0,
          r0 + 1,
          r0 + 2,
          b0 + 1,
          r0 + 2,
          b0 + 2,
          b0 + 1,
        );
      }
    }
    let L0 = new BufferGeometry();
    return (
      L0.setAttribute("position", new Float32BufferAttribute(B0, 3)),
      L0.setIndex(ot),
      L0.computeVertexNormals(),
      L0
    );
  }
  function k(v0, x0, C0, k0 = {}) {
    let O0 = v0.length / 6,
      B0 = new Float32Array(O0 * 36),
      ot = new Float32Array(O0 * 36),
      Q0 = In(),
      nt = In(),
      L0 = In(),
      ht = In(),
      pt = In(),
      V0 = In(),
      c0 = In(),
      Z = [In(), In(), In(), In(), In(), In()],
      r0 = [0, 2, 1, 1, 2, 4, 1, 4, 3, 3, 4, 5];
    for (let d0 = 0; d0 < O0; d0++) {
      (V0.set(v0[d0 * 6], v0[d0 * 6 + 1], v0[d0 * 6 + 2]),
        Q0.set(v0[d0 * 6 + 3], v0[d0 * 6 + 4], v0[d0 * 6 + 5]),
        nt.set(1, 0, 0),
        Math.abs(Q0.x) > 0.8 && nt.set(0, 1, 0),
        nt.cross(Q0).normalize(),
        L0.crossVectors(Q0, nt));
      let V = u() * TAU,
        B = u.range(k0.tilt0 ?? 0.15, k0.tilt1 ?? 0.85),
        j = x0 * u.range(0.7, 1.3);
      (ht
        .copy(nt)
        .multiplyScalar(Math.cos(V))
        .addScaledVector(L0, Math.sin(V))
        .multiplyScalar(Math.cos(B))
        .addScaledVector(Q0, Math.sin(B)),
        k0.droop && (ht.y -= k0.droop * u()),
        ht.normalize(),
        pt.crossVectors(ht, Q0).normalize(),
        c0.crossVectors(pt, ht).normalize(),
        c0.dot(Q0) < 0 && (c0.negate(), pt.negate()),
        Z[0].copy(V0),
        Z[1]
          .copy(V0)
          .addScaledVector(ht, 0.34 * j)
          .addScaledVector(pt, -0.3 * j)
          .addScaledVector(c0, 0.05 * j),
        Z[2]
          .copy(V0)
          .addScaledVector(ht, 0.34 * j)
          .addScaledVector(pt, 0.3 * j)
          .addScaledVector(c0, 0.05 * j),
        Z[3]
          .copy(V0)
          .addScaledVector(ht, 0.72 * j)
          .addScaledVector(pt, -0.24 * j)
          .addScaledVector(c0, 0.03 * j),
        Z[4]
          .copy(V0)
          .addScaledVector(ht, 0.72 * j)
          .addScaledVector(pt, 0.24 * j)
          .addScaledVector(c0, 0.03 * j),
        Z[5]
          .copy(V0)
          .addScaledVector(ht, j)
          .addScaledVector(c0, -0.04 * j),
        c0.multiplyScalar(0.4).addScaledVector(Q0, 0.6).normalize());
      let s0 = d0 * 36;
      for (let l0 = 0; l0 < 12; l0++) {
        let E0 = Z[r0[l0]];
        ((B0[s0 + l0 * 3] = E0.x),
          (B0[s0 + l0 * 3 + 1] = E0.y),
          (B0[s0 + l0 * 3 + 2] = E0.z),
          (ot[s0 + l0 * 3] = c0.x),
          (ot[s0 + l0 * 3 + 1] = c0.y),
          (ot[s0 + l0 * 3 + 2] = c0.z));
      }
    }
    let b0 = new BufferGeometry();
    (b0.setAttribute("position", new BufferAttribute(B0, 3)),
      b0.setAttribute("normal", new BufferAttribute(ot, 3)),
      r.add(b0, C0, {
        shadow: C(C0, k0.shadow),
      }));
  }
  function I(v0, x0, C0, k0, O0, B0, ot = 2600, Q0 = p) {
    L(v0 + 0.03, x0, C0 + 0.03, k0 - 0.03, O0 - 0.03, B0 - 0.03, Q0, {
      faces: "b",
    });
    let nt = [],
      L0 = (c0, Z, r0, b0, d0, V, B, j, s0, l0, E0, U) => {
        let X = Math.hypot(b0, d0, V) * Math.hypot(B, j, s0),
          N = Math.round(X * ot);
        for (let q = 0; q < N; q++) {
          let o0 = u(),
            h0 = u(),
            y0 = u.range(-0.022, 0.006);
          nt.push(
            c0 + b0 * o0 + B * h0 + l0 * y0,
            Z + d0 * o0 + j * h0 + E0 * y0,
            r0 + V * o0 + s0 * h0 + U * y0,
            l0,
            E0,
            U,
          );
        }
      },
      ht = k0 - v0,
      pt = O0 - x0,
      V0 = B0 - C0;
    (L0(v0, O0, C0, ht, 0, 0, 0, 0, V0, 0, 1, 0),
      L0(v0, x0, B0, ht, 0, 0, 0, pt, 0, 0, 0, 1),
      L0(v0, x0, C0, ht, 0, 0, 0, pt, 0, 0, 0, -1),
      L0(v0, x0, C0, 0, 0, V0, 0, pt, 0, -1, 0, 0),
      L0(k0, x0, C0, 0, 0, V0, 0, pt, 0, 1, 0, 0),
      k(nt, 0.036, Q0));
  }
  function G(v0, x0, C0, k0, O0 = p) {
    H.sphere(k0 * 0.9, O0, v0, x0, C0, {
      seg: 12,
      hseg: 8,
    });
    let B0 = [],
      ot = Math.round(4 * Math.PI * k0 * k0 * 2600);
    for (let Q0 = 0; Q0 < ot; Q0++) {
      let nt = u() * 2 - 1,
        L0 = u() * TAU,
        ht = Math.sqrt(1 - nt * nt),
        pt = ht * Math.cos(L0),
        V0 = ht * Math.sin(L0),
        c0 = k0 * u.range(0.95, 1.03);
      B0.push(v0 + pt * c0, x0 + nt * c0, C0 + V0 * c0, pt, nt, V0);
    }
    k(B0, 0.036, O0);
  }
  function K(v0, x0, C0, k0, O0, B0 = 46, ot = x) {
    let Q0 = F(ot);
    for (let nt = 0; nt < B0; nt++) {
      let L0 = u() * TAU,
        ht = Math.sqrt(u()) * k0,
        pt = u.range(0.05, 0.5) + (ht / k0) * 0.35;
      Q0.add(
        z(
          O0 * u.range(0.6, 1.1),
          u.range(0.008, 0.016),
          u.range(0.5, 1.5),
          3,
          0.3,
        ),
        P(
          v0 + Math.cos(L0) * ht,
          x0,
          C0 + Math.sin(L0) * ht,
          pt,
          -L0 + Math.PI / 2 + u.range(-0.5, 0.5),
          0,
        ),
      );
    }
    Q0.flush();
  }
  function $(v0, x0, C0, k0 = 12) {
    let O0 = new PlaneGeometry(1, 1, k0, k0);
    O0.rotateX(-Math.PI / 2);
    let B0 = O0.attributes.position,
      ot = (Z, r0) => [
        ((Z * v0) / 2) * (0.9 + 0.1 * r0 * r0),
        ((r0 * C0) / 2) * (0.9 + 0.1 * Z * Z),
      ];
    for (let Z = 0; Z < B0.count; Z++) {
      let r0 = B0.getX(Z) * 2,
        b0 = B0.getZ(Z) * 2,
        d0 = Math.sqrt(Math.max(0, 1 - r0 ** 4) * Math.max(0, 1 - b0 ** 4)),
        [V, B] = ot(r0, b0);
      B0.setXYZ(
        Z,
        V,
        ((d0 * x0) / 2) *
          (0.84 + 0.16 * Math.cos(r0 * 2.4) * Math.cos(b0 * 2.4)) -
          0.012 * x0 * (r0 * r0 + b0 * b0),
        B,
      );
    }
    O0.computeVertexNormals();
    let Q0 = O0.toNonIndexed();
    Q0.deleteAttribute("uv");
    let nt = Q0.clone(),
      L0 = nt.attributes.position.array,
      ht = nt.attributes.normal.array;
    for (let Z = 1; Z < L0.length; Z += 3) ((L0[Z] = -L0[Z]), (ht[Z] = -ht[Z]));
    for (let Z of [L0, ht])
      for (let r0 = 0; r0 < Z.length; r0 += 9)
        for (let b0 = 0; b0 < 3; b0++) {
          let d0 = Z[r0 + 3 + b0];
          ((Z[r0 + 3 + b0] = Z[r0 + 6 + b0]), (Z[r0 + 6 + b0] = d0));
        }
    let pt = [],
      V0 = 7;
    for (let [Z, r0, b0, d0] of [
      [-1, -1, 1, 0],
      [1, -1, 0, 1],
      [1, 1, -1, 0],
      [-1, 1, 0, -1],
    ])
      for (let V = 0; V < V0; V++) {
        let B = (V / V0) * 2,
          [j, s0] = ot(Z + b0 * B, r0 + d0 * B);
        pt.push(In(j, 0, s0));
      }
    let c0 = new TubeGeometry(
      new CatmullRomCurve3(pt, !0, "catmullrom", 0.5),
      pt.length * 2,
      Math.max(0.0045, x0 * 0.035),
      5,
      !0,
    ).toNonIndexed();
    return (c0.deleteAttribute("uv"), Vn([Q0, nt, c0], !1));
  }
  function n0(v0) {
    let x0 = v0.index ? v0.toNonIndexed() : v0.clone();
    x0.computeVertexNormals();
    let C0 = x0.clone(),
      k0 = C0.attributes.position.array,
      O0 = C0.attributes.normal.array;
    for (let B0 = 0; B0 < k0.length; B0 += 9)
      for (let ot = 0; ot < 3; ot++) {
        let Q0 = k0[B0 + 3 + ot];
        ((k0[B0 + 3 + ot] = k0[B0 + 6 + ot]), (k0[B0 + 6 + ot] = Q0));
      }
    for (let B0 = 0; B0 < O0.length; B0++) O0[B0] = -O0[B0];
    for (let B0 of [x0, C0])
      for (let ot of Object.keys(B0.attributes))
        ot !== "position" && ot !== "normal" && B0.deleteAttribute(ot);
    return Vn([x0, C0], !1);
  }
  let e0 = {},
    p0 = (() => {
      let v0 = createCanvas(1024),
        x0 = v0.getContext("2d"),
        C0 = (Q0, nt, L0, ht, pt) => {
          e0[Q0] = [
            nt / 1024,
            1 - (L0 + pt) / 1024,
            (nt + ht) / 1024,
            1 - L0 / 1024,
          ];
        },
        k0 = 'Bahnschrift, "DIN Alternate", "Segoe UI", sans-serif';
      ((x0.textAlign = "center"),
        (x0.textBaseline = "middle"),
        C0("depth", 0, 0, 512, 192),
        (x0.fillStyle = "#f1ede2"),
        (x0.strokeStyle = "#f1ede2"),
        (x0.lineWidth = 9),
        x0.strokeRect(16, 16, 480, 160),
        (x0.font = `700 128px ${k0}`),
        x0.fillText("1.1 M", 256, 102),
        C0("nodive", 512, 0, 512, 192),
        (x0.lineWidth = 12),
        (x0.strokeStyle = "#d8402a"),
        x0.beginPath(),
        x0.arc(608, 96, 70, 0, TAU),
        x0.stroke(),
        x0.beginPath(),
        x0.moveTo(560, 48),
        x0.lineTo(656, 144),
        x0.stroke(),
        (x0.fillStyle = "#f1ede2"),
        x0.beginPath(),
        x0.arc(590, 86, 11, 0, TAU),
        x0.fill(),
        x0.save(),
        x0.translate(612, 104),
        x0.rotate(0.6),
        x0.fillRect(-30, -7, 60, 14),
        x0.restore(),
        (x0.font = `700 60px ${k0}`),
        x0.fillText("NO DIVING", 850, 100));
      let O0 = (Q0, nt, L0, ht) => {
        (x0.save(),
          x0.translate(Q0, nt),
          x0.scale(L0, 1),
          (x0.fillStyle = "#665d52"),
          x0.beginPath(),
          x0.ellipse(4, -34, 27, 36, 0.12, 0, TAU),
          x0.fill(),
          ht ||
            (x0.beginPath(),
            x0.ellipse(-3, 66, 19, 27, 0, 0, TAU),
            x0.fill(),
            x0.beginPath(),
            x0.moveTo(-22, -20),
            x0.quadraticCurveTo(-30, 30, -20, 62),
            x0.lineTo(-6, 44),
            x0.quadraticCurveTo(-12, 10, 0, -10),
            x0.fill()));
        let pt = [
          [-21, -80, 8.5],
          [-7, -90, 9],
          [8, -93, 9.5],
          [22, -90, 10.5],
          [-33, -66, 7.5],
        ];
        for (let [V0, c0, Z] of pt)
          (x0.beginPath(),
            x0.ellipse(-V0, c0, Z, Z * 1.25, 0, 0, TAU),
            x0.fill());
        x0.restore();
      };
      (C0("footL", 0, 256, 128, 256),
        O0(64, 384, 1, !1),
        C0("footR", 128, 256, 128, 256),
        O0(192, 384, -1, !1),
        C0("toeL", 256, 256, 128, 256),
        O0(320, 384, 1, !0),
        C0("toeR", 384, 256, 128, 256),
        O0(448, 384, -1, !0));
      let B0 = (Q0, nt, L0, ht) => {
        let pt = createRandom(ht);
        ((x0.fillStyle = "#665d52"), x0.beginPath());
        for (let V0 = 0; V0 <= 40; V0++) {
          let c0 = (V0 / 40) * TAU,
            Z =
              L0 *
              (0.62 +
                0.3 * Math.sin(c0 * 3 + ht) * 0.5 +
                0.22 * Math.sin(c0 * 5 + ht * 2.1) +
                0.1 * pt());
          x0.lineTo(Q0 + Math.cos(c0) * Z * 1.15, nt + Math.sin(c0) * Z * 0.85);
        }
        x0.fill();
        for (let V0 = 0; V0 < 9; V0++)
          (x0.beginPath(),
            x0.arc(
              Q0 + pt.range(-L0, L0),
              nt + pt.range(-L0, L0),
              pt.range(3, 9),
              0,
              TAU,
            ),
            x0.fill());
      };
      (C0("puddleA", 512, 256, 256, 256),
        B0(640, 384, 100, 3),
        C0("puddleB", 768, 256, 256, 256),
        B0(896, 384, 96, 11),
        C0("heli", 0, 512, 512, 512),
        (x0.strokeStyle = "#e2b02a"),
        (x0.lineWidth = 22),
        x0.beginPath(),
        x0.arc(256, 768, 226, 0, TAU),
        x0.stroke(),
        (x0.fillStyle = "#efe9da"),
        x0.fillRect(170, 652, 44, 232),
        x0.fillRect(298, 652, 44, 232),
        x0.fillRect(170, 746, 172, 44),
        (x0.fillStyle = "#e2b02a"),
        x0.beginPath(),
        x0.moveTo(256, 548),
        x0.lineTo(236, 590),
        x0.lineTo(276, 590),
        x0.fill(),
        C0("sun", 512, 512, 384, 384),
        (x0.strokeStyle = "#062730"),
        (x0.fillStyle = "#062730"),
        (x0.lineWidth = 12),
        x0.beginPath(),
        x0.arc(704, 704, 72, 0, TAU),
        x0.stroke());
      for (let Q0 = 0; Q0 < 16; Q0++) {
        let nt = (Q0 / 16) * TAU,
          L0 = 96,
          ht = Q0 % 2 ? 146 : 182;
        (x0.save(),
          x0.translate(704, 704),
          x0.rotate(nt),
          x0.beginPath(),
          x0.moveTo(L0, -7),
          x0.lineTo(ht, 0),
          x0.lineTo(L0, 7),
          x0.fill(),
          x0.restore());
      }
      ((x0.font = `700 98px ${k0}`),
        x0.fillText("S", 704, 710),
        C0("lid", 896, 512, 128, 128),
        (x0.fillStyle = "#2a2826"),
        x0.beginPath(),
        x0.arc(960, 576, 62, 0, TAU),
        x0.fill(),
        (x0.fillStyle = "#e9e5da"),
        x0.beginPath(),
        x0.arc(960, 576, 54, 0, TAU),
        x0.fill(),
        (x0.fillStyle = "#b9b4a8"));
      for (let Q0 of [0.6, 2.2, 3.8, 5.4])
        (x0.beginPath(),
          x0.arc(960 + Math.cos(Q0) * 40, 576 + Math.sin(Q0) * 40, 5, 0, TAU),
          x0.fill());
      (x0.fillRect(940, 571, 40, 10),
        C0("rules", 896, 768, 128, 256),
        (x0.fillStyle = "#efe9da"),
        x0.fillRect(896, 768, 128, 256),
        (x0.fillStyle = "#12303a"),
        x0.fillRect(896, 768, 128, 50),
        (x0.fillStyle = "#efe9da"),
        (x0.font = `700 30px ${k0}`),
        x0.fillText("POOL", 960, 795),
        (x0.fillStyle = "#12303a"));
      for (let Q0 = 0; Q0 < 7; Q0++)
        (x0.beginPath(),
          x0.arc(912, 846 + Q0 * 24, 5, 0, TAU),
          x0.fill(),
          x0.fillRect(924, 842 + Q0 * 24, 60 + ((Q0 * 37) % 30), 7));
      ((x0.fillStyle = "#d8402a"),
        x0.fillRect(904, 1004, 112, 8),
        C0("drain", 896, 640, 128, 128),
        (x0.fillStyle = "#9a9a9c"),
        x0.beginPath(),
        x0.arc(960, 704, 60, 0, TAU),
        x0.fill(),
        (x0.fillStyle = "#1c1c1e"));
      for (let Q0 = -2; Q0 <= 2; Q0++)
        x0.fillRect(
          960 - Math.sqrt(1 - (Q0 * Q0) / 9) * 44,
          704 + Q0 * 20 - 5,
          Math.sqrt(1 - (Q0 * Q0) / 9) * 88,
          10,
        );
      (C0("towels", 0, 192, 384, 64),
        (x0.fillStyle = "#f1ede2"),
        (x0.font = `600 46px ${k0}`),
        x0.fillText("T O W E L S", 192, 226),
        C0("ped", 384, 192, 128, 64));
      let ot = new CanvasTexture(v0);
      return ((ot.colorSpace = SRGBColorSpace), (ot.anisotropy = 8), ot);
    })(),
    t0 = d({
      map: p0,
      alphaTest: 0.5,
      roughness: 0.2,
      metalness: 0,
      polygonOffset: !0,
      polygonOffsetFactor: -3,
      polygonOffsetUnits: -3,
    });
  R.add(t0);
  function M0(v0, x0, C0, k0, O0, B0, ot = 0, Q0 = t0) {
    let nt = new PlaneGeometry(O0, B0);
    nt.rotateX(-Math.PI / 2);
    let L0 = e0[v0],
      ht = nt.attributes.uv;
    for (let pt = 0; pt < ht.count; pt++)
      ht.setXY(
        pt,
        L0[0] + (L0[2] - L0[0]) * ht.getX(pt),
        L0[1] + (L0[3] - L0[1]) * ht.getY(pt),
      );
    r.add(nt, Q0, {
      matrix: P(x0, C0, k0, 0, ot, 0),
      keepUV: !0,
      shadow: !1,
    });
  }
  function f0(v0, x0, C0, k0, O0, B0, ot = 0) {
    let Q0 = new PlaneGeometry(O0, B0),
      nt = e0[v0],
      L0 = Q0.attributes.uv;
    for (let ht = 0; ht < L0.count; ht++)
      L0.setXY(
        ht,
        nt[0] + (nt[2] - nt[0]) * L0.getX(ht),
        nt[1] + (nt[3] - nt[1]) * L0.getY(ht),
      );
    r.add(Q0, t0, {
      matrix: P(x0, C0, k0, 0, ot, 0),
      keepUV: !0,
      shadow: !1,
    });
  }
  let { x0: _0, x1: F0, z0: m0, z1: S0, floor: T0, water: j0 } = ms;
  {
    let v0 = {
      r: 0.03,
      seg: 2,
    };
    (r.bbox(
      _0 - 0.34,
      -0.05,
      m0 - 0.34,
      F0 + 0.34,
      0.035,
      m0 + 0.03,
      i.marbleFloor,
      v0,
    ),
      r.bbox(
        _0 - 0.34,
        -0.05,
        S0 - 0.03,
        F0 + 0.34,
        0.035,
        S0 + 0.34,
        i.marbleFloor,
        v0,
      ),
      r.bbox(
        _0 - 0.34,
        -0.05,
        m0 + 0.035,
        _0 + 0.03,
        0.035,
        S0 - 0.035,
        i.marbleFloor,
        v0,
      ),
      r.bbox(
        F0 - 0.03,
        -0.05,
        m0 + 0.035,
        F0 + 0.34,
        0.035,
        S0 - 0.035,
        i.marbleFloor,
        v0,
      ));
    let x0 = 0.021,
      C0 = 0.033,
      k0 = {
        shadow: !1,
      };
    (L(_0 + x0, -0.42, m0 + x0, F0 - x0, -0.05, m0 + C0, v, k0),
      L(_0 + x0, -0.42, S0 - C0, F0 - x0, -0.05, S0 - x0, v, k0),
      L(_0 + x0, -0.42, m0 + C0, _0 + C0, -0.05, S0 - C0, v, k0),
      L(F0 - C0, -0.42, m0 + C0, F0 - x0, -0.05, S0 - C0, v, k0));
    let O0 = new CircleGeometry(0.1, 20),
      B0 = new TorusGeometry(0.108, 0.016, 6, 22),
      ot = (L0, ht, pt) => {
        let V0 = P(L0, -0.66, ht, 0, pt, 0);
        (r.add(O0, b, {
          matrix: V0,
          shadow: !1,
        }),
          r.add(B0, i.chrome, {
            matrix: V0,
            shadow: !1,
          }),
          A(
            L0 + Math.sin(pt) * 1.25,
            T0 + 0.008,
            ht + Math.cos(pt) * 1.25,
            2.6,
            2.6,
            5832680,
            1,
          ));
      };
    for (let L0 of [-5.6, -2.8, 0, 2.8, 5.6])
      (ot(L0, m0 + 0.036, 0), ot(L0, S0 - 0.036, Math.PI));
    for (let L0 of [16, 19]) ot(F0 - 0.036, L0, -Math.PI / 2);
    (L(-5.2, T0, 15.92, 5.9, T0 + 0.004, 16.08, v, k0),
      L(-5.2, T0, 18.92, 5.9, T0 + 0.004, 19.08, v, k0),
      M0("sun", 0.6, T0 + 0.006, 17.5, 3.4, 3.4, 0));
    for (let L0 of [19.78, 20.22])
      (r.tube(
        [
          [7.46, 0, L0],
          [7.46, 0.5, L0],
          [7.42, 0.8, L0],
          [7.24, 0.93, L0],
          [7.04, 0.84, L0],
          [6.95, 0.55, L0],
          [6.93, -0.2, L0],
          [6.93, -0.98, L0],
        ],
        0.021,
        i.chrome,
        {
          seg: 40,
          rseg: 8,
        },
      ),
        r.cyl(7.46, 0.034, L0, 0.05, 0.012, i.chrome, {
          seg: 14,
        }));
    for (let L0 of [-0.38, -0.62, -0.86])
      r.bbox(6.88, L0, 19.78, 6.99, L0 + 0.03, 20.22, i.plasticWhite, {
        r: 0.008,
        seg: 1,
      });
    for (let L0 of [16.3, 18.7])
      (r.tube(
        [
          [-7.62, 0, L0],
          [-7.62, 0.62, L0],
          [-7.5, 0.84, L0],
          [-7.2, 0.88, L0],
          [-6.6, 0.56, L0],
          [-5.82, 0.1, L0],
          [-5.62, -0.1, L0],
          [-5.6, -0.84, L0],
        ],
        0.021,
        i.chrome,
        {
          seg: 44,
          rseg: 8,
        },
      ),
        r.cyl(-7.62, 0, L0, 0.05, 0.016, i.chrome, {
          seg: 14,
        }));
    let Q0 = {
        shadow: !1,
        faces: "b",
      },
      nt = (L0, ht, pt, V0, c0) => {
        if (L0 === "x") {
          (L(ht, 0, V0, pt, 0.004, c0, i.rubber, Q0),
            L(ht, 0, V0 - 0.008, pt, 0.012, V0, i.steel, Q0),
            L(ht, 0, c0, pt, 0.012, c0 + 0.008, i.steel, Q0));
          for (let Z = ht + 0.02; Z < pt - 0.02; Z += 0.05)
            L(Z, 0.004, V0, Z + 0.022, 0.011, c0, i.steel, Q0);
        } else {
          (L(V0, 0, ht, c0, 0.004, pt, i.rubber, Q0),
            L(V0 - 0.008, 0, ht, V0, 0.012, pt, i.steel, Q0),
            L(c0, 0, ht, c0 + 0.008, 0.012, pt, i.steel, Q0));
          for (let Z = ht + 0.02; Z < pt - 0.02; Z += 0.05)
            L(V0, 0.004, Z, c0, 0.011, Z + 0.022, i.steel, Q0);
        }
      };
    (nt("x", _0 - 0.5, F0 + 0.5, m0 - 0.5, m0 - 0.38),
      nt("x", _0 - 0.5, F0 + 0.5, S0 + 0.38, S0 + 0.5),
      nt("z", m0 - 0.38, S0 + 0.38, _0 - 0.5, _0 - 0.38),
      nt("z", m0 - 0.38, S0 + 0.38, F0 + 0.38, F0 + 0.5));
    for (let [L0, ht] of [
      [-3.6, 13.78],
      [3.6, 13.78],
      [-3.6, 21.2],
      [3.6, 21.2],
    ])
      M0("lid", L0, 0.005, ht, 0.27, 0.27, u() * TAU);
    (M0("depth", 2.4, 0.037, 14.34, 0.62, 0.23, Math.PI),
      M0("depth", -2.6, 0.037, 20.66, 0.62, 0.23, 0),
      M0("nodive", -1.6, 0.037, 14.34, 0.92, 0.3, Math.PI),
      M0("nodive", 5.2, 0.037, 20.66, 0.92, 0.3, 0));
  }
  {
    let v0 = (B0, ot) => {
        let Q0 = B0.attributes.position,
          nt = new Float32Array(Q0.count * 3),
          L0 = new Color();
        for (let ht = 0; ht < Q0.count; ht++)
          (L0.set(ot(Q0.getX(ht), Q0.getY(ht), Q0.getZ(ht))),
            (nt[ht * 3] = L0.r),
            (nt[ht * 3 + 1] = L0.g),
            (nt[ht * 3 + 2] = L0.b));
        return (B0.setAttribute("color", new BufferAttribute(nt, 3)), B0);
      },
      x0 = v0(
        new TorusGeometry(0.42, 0.135, 12, 40).rotateX(Math.PI / 2),
        (B0, ot, Q0) =>
          Math.floor((Math.atan2(Q0, B0) / TAU + 1) * 8) % 2
            ? 16052198
            : 15362620,
      ),
      C0 = v0(new SphereGeometry(0.2, 24, 14), (B0, ot, Q0) =>
        Math.abs(ot) > 0.185
          ? 16052198
          : [15362620, 16052198, 2074272, 15906364, 16052198, 1798031][
              Math.floor((Math.atan2(Q0, B0) / TAU + 1) * 6) % 6
            ],
      ),
      k0 = [
        {
          g: x0,
          x: 2.7,
          z: 17,
          y: j0 + 0.075,
          r: 0.57,
          h: 0.22,
          ph: 0.3,
        },
        {
          g: C0,
          x: -2.3,
          z: 18.9,
          y: j0 + 0.15,
          r: 0.2,
          h: 0.36,
          ph: 2.1,
        },
      ],
      O0 = 0;
    for (let B0 of k0) {
      let ot = (B0.m = new Mesh(B0.g, E));
      ((ot.castShadow = !0),
        (ot.receiveShadow = !0),
        ot.position.set(B0.x, B0.y, B0.z),
        e.add(ot),
        (B0.c = s.addCollider(
          B0.x - B0.r,
          j0,
          B0.z - B0.r,
          B0.x + B0.r,
          j0 + B0.h,
          B0.z + B0.r,
          "plastic",
          {
            noMove: !0,
            silent: !0,
            onShot: (Q0) => {
              B0.c.off ||
                ((B0.c.off = !0),
                (ot.visible = !1),
                n.smoke(B0.x, B0.y + 0.1, B0.z, 3, {
                  size: 0.25,
                  life: 0.7,
                  a: 0.35,
                  color: [0.95, 0.9, 0.85],
                }),
                n.splash(In(B0.x, j0, B0.z), 0.8),
                t.ripple(B0.x, B0.z, 1.4),
                c.propHit(Q0, "plastic", 1));
            },
          },
        )),
        f.push(() => {
          ((B0.c.off = !1), (ot.visible = !0));
        }));
    }
    t.update.push((B0) => {
      O0 += B0;
      for (let ot of k0) {
        let Q0 = ot.m;
        Q0.visible &&
          ((Q0.position.y = ot.y + Math.sin(O0 * 1.25 + ot.ph) * 0.012),
          (Q0.rotation.y = O0 * 0.05 + ot.ph),
          (Q0.rotation.x = Math.sin(O0 * 0.9 + ot.ph) * 0.035),
          (Q0.rotation.z = Math.cos(O0 * 0.7 + ot.ph * 2) * 0.035),
          (Q0.position.x = ot.x + Math.sin(O0 * 0.11 + ot.ph) * 0.18),
          (Q0.position.z = ot.z + Math.cos(O0 * 0.083 + ot.ph) * 0.14));
      }
    });
  }
  let Z0 = (v0, x0, C0, k0, O0, B0 = 0, ot = [i.bedLinen, i.velvetTeal]) => {
      for (let Q0 = 0; Q0 < O0; Q0++)
        v0.box(
          0.4 - Q0 * 0.004,
          0.042,
          0.28,
          ot[Q0 % ot.length],
          x0 + u.range(-0.008, 0.008),
          C0 + 0.021 + Q0 * 0.043,
          k0 + u.range(-0.008, 0.008),
          {
            r: 0.016,
            seg: 2,
            ry: B0 + u.range(-0.06, 0.06),
          },
        );
    },
    lt = (v0, x0, C0, k0, O0, B0 = 0.34, ot = 0.058, Q0 = 0) => {
      let nt = ot * u.range(0.93, 1.03),
        L0 = B0 * u.range(0.96, 1.02),
        ht = L0 / 2,
        pt = 0.012,
        V0 = [
          [nt * 0.9, -ht],
          [nt, -ht + pt],
          [nt, ht - pt],
          [nt * 0.955, ht - 0.002],
          [nt * 0.84, ht - 0.009],
          [nt * 0.7, ht - 0.001],
          [nt * 0.52, ht - 0.009],
          [nt * 0.34, ht - 0.001],
          [nt * 0.14, ht - 0.01],
          [0.001, ht - 0.012],
        ];
      v0.add(
        new LatheGeometry(
          V0.map(([c0, Z]) => new Vector2(c0, Z)),
          16,
        ),
        O0,
        x0 + u.range(-0.004, 0.004),
        C0 + nt * 0.94,
        k0 + u.range(-0.012, 0.006),
        {
          rx: Math.PI / 2,
          ry: Q0 - Math.PI / 2,
          s: [1, 1, 0.94],
        },
      );
    };
  function H0(v0, x0, C0, k0, O0 = 0) {
    O0 === 0
      ? (v0.lathe(
          [
            [0, 0.008],
            [0.029, 0.008],
            [0.031, 0.13],
            [0.034, 0.13],
            [0.032, 0],
            [0, 0],
          ],
          _,
          x0,
          C0,
          k0,
          {
            seg: 14,
            shadow: !1,
          },
        ),
        v0.cyl(0.0285, 0.092, w, x0, C0 + 0.01, k0, {
          seg: 12,
        }),
        v0.rod(
          [x0 + 0.012, C0 + 0.02, k0],
          [x0 + 0.03, C0 + 0.185, k0 + 0.01],
          0.0028,
          i.plasticBlack,
          {
            seg: 5,
          },
        ),
        v0.add(
          new CylinderGeometry(0.024, 0.024, 0.004, 14),
          y,
          x0 - 0.03,
          C0 + 0.128,
          k0,
          {
            rz: Math.PI / 2,
          },
        ))
      : (v0.lathe(
          [
            [0, 0],
            [0.034, 0],
            [0.035, 0.004],
            [0.006, 0.01],
            [0.0045, 0.085],
            [0.046, 0.118],
            [0.05, 0.142],
            [0.047, 0.142],
            [0.006, 0.095],
            [0, 0.094],
          ],
          _,
          x0,
          C0,
          k0,
          {
            seg: 14,
            shadow: !1,
          },
        ),
        v0.lathe(
          [
            [0, 0.1],
            [0.012, 0.1],
            [0.042, 0.122],
            [0.044, 0.132],
            [0, 0.132],
          ],
          w,
          x0,
          C0,
          k0,
          {
            seg: 12,
          },
        ));
  }
  function Y0(v0, x0, C0) {
    let k0 = O(v0, 0.014, x0, u() * TAU);
    k0.lathe(
      [
        [0, 0.425],
        [0.2, 0.425],
        [0.212, 0.432],
        [0.212, 0.448],
        [0.2, 0.456],
        [0, 0.456],
      ],
      i.woodLight,
      0,
      0,
      0,
      {
        seg: 24,
      },
    );
    for (let O0 = 0; O0 < 3; O0++) {
      let B0 = (O0 * TAU) / 3;
      k0.rod(
        [Math.cos(B0) * 0.14, 0.426, Math.sin(B0) * 0.14],
        [Math.cos(B0) * 0.21, 0, Math.sin(B0) * 0.21],
        0.01,
        i.blackMetal,
        {
          seg: 6,
        },
      );
    }
    (k0.torus(0.185, 0.006, i.blackMetal, 0, 0.15, 0, {
      rx: Math.PI / 2,
      seg: 20,
      rseg: 5,
    }),
      s.aoBlob(v0, x0, 0.014, 0.28, 0.28, 0.32),
      C0.includes("highball") && H0(k0, 0.07, 0.456, 0.03, 0),
      C0.includes("coupe") && H0(k0, -0.06, 0.456, 0.07, 1),
      C0.includes("sunscreen") &&
        (k0.lathe(
          [
            [0, 0],
            [0.021, 0],
            [0.023, 0.008],
            [0.023, 0.1],
            [0.012, 0.114],
            [0.012, 0.124],
            [0, 0.124],
          ],
          i.plasticWhite,
          -0.08,
          0.456,
          -0.07,
          {
            seg: 12,
          },
        ),
        k0.cyl(0.0135, 0.022, y, -0.08, 0.456 + 0.124, -0.07, {
          seg: 10,
        })),
      C0.includes("book") &&
        (k0.box(0.14, 0.02, 0.2, i.paper, 0.03, 0.467, -0.09, {
          ry: 0.5,
        }),
        k0.box(0.146, 0.004, 0.206, i.velvetTeal, 0.03, 0.479, -0.09, {
          ry: 0.5,
        }),
        k0.box(0.146, 0.004, 0.206, i.velvetTeal, 0.03, 0.4575, -0.09, {
          ry: 0.5,
        })),
      C0.includes("glasses") && et(k0, 0.02, 0.458, 0.11, 2.2),
      C0.includes("phone") &&
        k0.box(0.072, 0.008, 0.15, i.screenOff, -0.02, 0.461, 0.1, {
          r: 0.003,
          ry: -0.4,
        }));
  }
  function et(v0, x0, C0, k0, O0) {
    let B0 = Math.cos(O0),
      ot = Math.sin(O0),
      Q0 = (b0, d0) => [x0 + b0 * B0 + d0 * ot, k0 - b0 * ot + d0 * B0];
    for (let b0 of [-0.032, 0.032]) {
      let [d0, V] = Q0(b0, 0);
      (v0.torus(0.025, 0.0035, i.plasticBlack, d0, C0 + 0.02, V, {
        ry: O0,
        seg: 14,
        rseg: 5,
      }),
        v0.add(
          new CircleGeometry(0.023, 14),
          i.screenOff,
          d0,
          C0 + 0.02,
          V + 1e-4,
          {
            ry: O0,
            shadow: !1,
          },
        ),
        v0.add(new CircleGeometry(0.023, 14), i.screenOff, d0, C0 + 0.02, V, {
          ry: O0 + Math.PI,
          shadow: !1,
        }));
    }
    let [nt, L0] = Q0(-0.058, 0),
      [ht, pt] = Q0(-0.062, -0.13),
      [V0, c0] = Q0(0.058, 0),
      [Z, r0] = Q0(0.062, -0.13);
    (v0.rod([nt, C0 + 0.03, L0], [ht, C0 + 0.012, pt], 0.0025, i.plasticBlack, {
      seg: 4,
    }),
      v0.rod([V0, C0 + 0.03, c0], [Z, C0 + 0.012, r0], 0.0025, i.plasticBlack, {
        seg: 4,
      }));
  }
  function ct(v0, x0, C0, k0) {
    let O0 = O(v0, 0.014, x0, C0);
    for (let [B0, ot, Q0] of [
      [-0.07, 0, 0.12],
      [0.07, 0.05, -0.2],
    ]) {
      O0.add(new CylinderGeometry(0.048, 0.048, 0.014, 16), k0, B0, 0.007, ot, {
        s: [1, 1, 2.6],
        ry: Q0,
      });
      let nt = Math.cos(Q0),
        L0 = Math.sin(Q0),
        ht = (B, j) => [B0 + B * nt + j * L0, ot - B * L0 + j * nt],
        [pt, V0] = ht(0, -0.07),
        [c0, Z] = ht(-0.04, 0.02),
        [r0, b0] = ht(0.04, 0.02),
        [d0, V] = ht(0, -0.03);
      (O0.tube(
        [
          [c0, 0.014, Z],
          [d0 - 0.015 * nt, 0.04, V + 0.015 * L0],
          [pt, 0.016, V0],
        ],
        0.004,
        i.plasticBlack,
        {
          seg: 8,
          rseg: 4,
        },
      ),
        O0.tube(
          [
            [r0, 0.014, b0],
            [d0 + 0.015 * nt, 0.04, V - 0.015 * L0],
            [pt, 0.016, V0],
          ],
          0.004,
          i.plasticBlack,
          {
            seg: 8,
            rseg: 4,
          },
        ));
    }
  }
  function D0(v0, x0, C0, k0, O0 = 0) {
    (v0.lathe(
      [
        [0.001, 0.102],
        [0.055, 0.1],
        [0.083, 0.086],
        [0.092, 0.03],
        [0.1, 0.012],
        [0.21, 0],
      ],
      M,
      x0,
      C0,
      k0,
      {
        seg: 26,
        rx: O0,
      },
    ),
      v0.cyl(0.094, 0.022, i.velvetTeal, x0, C0 + 0.02, k0, {
        seg: 24,
        open: !0,
        rx: O0,
        r2: 0.0915,
      }));
  }
  function u0(v0, x0, C0) {
    let k0 = new PlaneGeometry(1.24, 0.52, 22, 5),
      O0 = k0.attributes.position;
    for (let B0 = 0; B0 < O0.count; B0++) {
      let ot = O0.getX(B0),
        Q0 = O0.getY(B0),
        nt = Math.abs(ot),
        L0 = Math.sign(ot),
        ht,
        pt;
      if (nt < 0.3) ((ht = ot), (pt = 0.432 + 0.004 * Math.cos(ot * 20)));
      else {
        let c0 = nt - 0.3,
          Z = Math.min(1, c0 / 0.07);
        ((ht =
          L0 *
          (0.3 +
            0.045 * Math.sin((Z * Math.PI) / 2) +
            Math.max(0, c0 - 0.07) * 0.06)),
          (pt =
            0.432 -
            0.045 * (1 - Math.cos((Z * Math.PI) / 2)) -
            Math.max(0, c0 - 0.07) * 0.98));
      }
      let V0 = nt > 0.37 ? Math.sin(Q0 * 26 + L0) * 0.012 * (nt - 0.37) * 4 : 0;
      O0.setXYZ(B0, ht + V0, pt, x0 + Q0 + Math.sin(ot * 7) * 0.012);
    }
    v0.add(n0(k0), C0);
  }
  for (let v0 of [-1, 1]) {
    let x0 = v0 < 0 ? -10.62 : 7.6,
      C0 = v0 < 0 ? -7.6 : 10.62,
      k0 = 15.02,
      O0 = 19.8,
      B0 = {
        shadow: !1,
        faces: "b",
      };
    L(x0, 0, k0, C0, 0.004, O0, i.rubber, B0);
    for (let L0 = k0 + 0.012; L0 < O0 - 0.1; L0 += 0.126)
      L(x0 + 0.03, 0.002, L0, C0 - 0.03, 0.014, L0 + 0.118, i.woodLight, {
        faces: "b",
      });
    (L(x0, 0, k0, x0 + 0.03, 0.016, O0, i.steel, B0),
      L(C0 - 0.03, 0, k0, C0, 0.016, O0, i.steel, B0),
      L(x0, 0, k0, C0, 0.016, k0 + 0.012, i.steel, B0),
      L(x0, 0, O0 - 0.012, C0, 0.016, O0, i.steel, B0));
    let ot = v0 < 0 ? Math.PI / 2 : -Math.PI / 2,
      Q0 = [15.7, 17.4, 19.1];
    Q0.forEach((L0, ht) => {
      s.aoBlob(v0 * 9, L0, 0.014, 1.15, 0.5, 0.4);
    });
    let nt = Q0.map((L0) => O(v0 * 9, 0, L0, ot));
    (v0 < 0
      ? (Z0(nt[0], 0.02, 0.425, 0.5, 2, 0.1),
        D0(nt[0], -0.03, 0.428, 0.02, 0),
        nt[1].box(0.14, 0.012, 0.2, i.velvetTeal, -0.07, 0.445, 0.28, {
          rz: 0.32,
          ry: 0.2,
        }),
        nt[1].box(0.14, 0.012, 0.2, i.velvetTeal, 0.058, 0.445, 0.3, {
          rz: -0.32,
          ry: 0.2,
        }),
        et(nt[1], 0.14, 0.426, 0.02, 0.7),
        u0(nt[2], 0.32, i.bedLinen),
        ct(-8.45, 15.15, 0.4, y),
        ct(-8.6, 18.45, -1.2, i.rubber))
      : (u0(nt[0], 0.3, i.velvetTeal),
        Z0(nt[1], -0.03, 0.425, 0.22, 3, -0.15, [
          i.bedLinen,
          i.bedLinen,
          i.velvetTeal,
        ]),
        nt[1].box(0.072, 0.008, 0.15, i.screenOff, 0.16, 0.43, 0.5, {
          r: 0.003,
          ry: 0.5,
        }),
        D0(nt[2], 0.02, 0.428, 0.25, 0),
        nt[2].box(0.15, 0.022, 0.21, i.paper, -0.1, 0.437, -0.02, {
          ry: -0.4,
        }),
        nt[2].box(0.156, 0.004, 0.216, y, -0.1, 0.45, -0.02, {
          ry: -0.4,
        }),
        ct(8.5, 16.95, 2.6, i.velvetTeal)),
      Y0(
        v0 * 8.72,
        16.55,
        v0 < 0 ? ["highball", "sunscreen", "glasses"] : ["coupe", "book"],
      ),
      Y0(
        v0 * 8.72,
        18.25,
        v0 < 0 ? ["coupe", "phone"] : ["highball", "sunscreen", "coupe"],
      ));
  }
  {
    let v0 = (x0, C0, k0, O0) => {
      let B0 = 0,
        ot = 1,
        Q0 = 0;
      for (let nt = 0; nt < x0.length - 1; nt++) {
        let L0 = x0[nt],
          ht = x0[nt + 1],
          pt = ht[0] - L0[0],
          V0 = ht[1] - L0[1],
          c0 = Math.hypot(pt, V0),
          Z = pt / c0,
          r0 = V0 / c0,
          b0 = Math.atan2(-Z, -r0);
        for (; B0 < c0; B0 += C0) {
          let d0 = L0[0] + Z * B0 + -r0 * 0.085 * ot,
            V = L0[1] + r0 * B0 + Z * 0.085 * ot,
            B = Q0 >= k0,
            j = (B ? "toe" : "foot") + (ot > 0 ? "R" : "L"),
            s0 = Q0 >= O0 ? 0.82 : 1;
          (M0(
            j,
            d0,
            0.005,
            V,
            0.105 * s0,
            0.25 * s0,
            b0 + ot * 0.14 + u.range(-0.06, 0.06),
          ),
            (ot = -ot),
            Q0++);
        }
        B0 -= c0;
      }
    };
    (M0("puddleA", -5.9, 0.04, 14.32, 0.6, 0.36, 0.3),
      M0("puddleB", -6.3, 0.005, 13.7, 0.8, 0.62, 1.1),
      v0(
        [
          [-6.2, 13.75],
          [-7.6, 13.25],
          [-10.2, 12.95],
          [-12.6, 12.9],
          [-13.3, 12.82],
        ],
        0.6,
        9,
        12,
      ),
      M0("puddleB", 7.75, 0.005, 20, 0.55, 0.45, 2),
      v0(
        [
          [7.9, 20],
          [8.6, 20.25],
          [9.4, 20.2],
        ],
        0.55,
        2,
        3,
      ));
  }
  {
    (r.bbox(-2.45, 0, 10.38, 2.45, 0.3, 10.76, i.concrete, {
      r: 0.012,
      seg: 1,
    }),
      L(-2.39, 0.28, 10.44, 2.39, 0.302, 10.7, i.soil, {
        faces: "b",
        shadow: !1,
      }),
      I(-2.36, 0.3, 10.45, 2.36, 0.49, 10.7));
    for (let v0 = 0; v0 < 5; v0++)
      r.bbox(
        -2.43,
        0.385,
        10.775 + v0 * 0.07,
        2.43,
        0.42,
        10.835 + v0 * 0.07,
        i.woodLight,
        {
          r: 0.008,
          seg: 1,
        },
      );
    for (let v0 = -2.2; v0 <= 2.21; v0 += 1.1)
      (L(v0 - 0.02, 0, 11.07, v0 + 0.02, 0.385, 11.11, i.blackMetal),
        L(v0 - 0.02, 0.35, 10.76, v0 + 0.02, 0.385, 11.11, i.blackMetal));
    (L(-2.4, 0.34, 11.02, 2.4, 0.352, 11.04, i.ledStrip, {
      shadow: !1,
    }),
      A(0, 0.006, 11.22, 5.4, 1, 16747068, 0.3),
      s.addCollider(-2.45, 0, 10.38, 2.45, 0.42, 11.13, "wood"),
      s.aoSkirt(-2.45, 10.38, 2.45, 11.13, 0, 0.3, 0.35));
    for (let v0 of [-1, 1]) {
      let x0 = v0 < 0 ? -5.42 : 3.98,
        C0 = v0 < 0 ? -3.98 : 5.42;
      (r.bbox(x0, 0, 10.38, C0, 0.3, 10.76, i.concrete, {
        r: 0.012,
        seg: 1,
      }),
        L(x0 + 0.06, 0.28, 10.44, C0 - 0.06, 0.302, 10.7, i.soil, {
          faces: "b",
          shadow: !1,
        }));
      for (let k0 = x0 + 0.2; k0 < C0 - 0.1; k0 += 0.3)
        K(k0, 0.3, 10.57 + u.range(-0.03, 0.03), 0.07, 0.2, 40);
      (s.addCollider(x0, 0, 10.38, C0, 0.3, 10.76, "concrete"),
        s.aoSkirt(x0, 10.38, C0, 10.76, 0, 0.3, 0.35),
        r.bbox(v0 * 7 - 0.85, 0, 10.32, v0 * 7 + 0.85, 0.012, 11.12, i.rubber, {
          r: 0.005,
          seg: 1,
        }));
      for (let k0 = 10.37; k0 < 11.08; k0 += 0.045)
        L(
          v0 * 7 - 0.8,
          0.01,
          k0,
          v0 * 7 + 0.8,
          0.017,
          k0 + 0.022,
          i.plasticBlack,
          {
            shadow: !1,
            faces: "b",
          },
        );
    }
  }
  let w0 = new BoxGeometry(1, 1, 1);
  function P0(v0, x0, C0, k0 = 1) {
    let O0 = O(v0, x0, C0, u.range(-0.3, 0.3), k0);
    O0.box(0.2, 0.014, 0.2, i.blackMetal, 0, 0.007, 0).box(
      0.2,
      0.012,
      0.2,
      i.blackMetal,
      0,
      0.356,
      0,
    );
    for (let [B0, ot] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      O0.box(0.012, 0.34, 0.012, i.blackMetal, B0 * 0.092, 0.184, ot * 0.092);
    (O0.add(new ConeGeometry(0.155, 0.075, 4), i.blackMetal, 0, 0.4, 0, {
      ry: Math.PI / 4,
    }),
      O0.torus(0.042, 0.005, i.blackMetal, 0, 0.47, 0, {
        seg: 14,
        rseg: 5,
      }));
    for (let [B0, ot, Q0] of [
      [0, -1, 0],
      [0, 1, 0],
      [-1, 0, 1],
      [1, 0, 1],
    ])
      O0.add(w0, _, B0 * 0.092, 0.184, ot * 0.092, {
        s: Q0 ? [0.003, 0.33, 0.172] : [0.172, 0.33, 0.003],
        shadow: !1,
      });
    (O0.cyl(0.034, 0.13, i.fabricCream, 0, 0.014, 0, {
      seg: 12,
    }),
      O0.lathe(
        [
          [5e-4, 0],
          [0.011, 0.012],
          [0.009, 0.03],
          [5e-4, 0.052],
        ],
        i.bulbWarm,
        0,
        0.148,
        0,
        {
          seg: 8,
          shadow: !1,
        },
      ),
      A(v0, x0 + 0.006, C0, 1.5 * k0, 1.5 * k0, 16751164, 0.34));
  }
  for (let [v0, x0] of [
    [-7.15, 14.34],
    [7.15, 14.34],
    [-7.15, 20.66],
    [7.15, 20.66],
  ])
    P0(v0, 0.035, x0, 1);
  [-19.8, -15.4, -11, -6.6, -2.2, 2.2, 6.6, 11, 15.4, 19.8].forEach((v0, x0) =>
    P0(v0, 0, 21.64, x0 % 2 ? 1 : 1.35),
  );
  for (let [v0, x0] of [
    [-21.66, 13.9],
    [-21.66, 17.6],
    [21.66, 14.7],
    [21.66, 18.3],
    [-18.3, 12.2],
    [18.3, 12.2],
  ])
    P0(v0, 0, x0, 1.35);
  function st(v0, x0) {
    let C0 = O(v0, 0, x0, u() * TAU);
    (C0.lathe(
      [
        [0, 0],
        [0.235, 0],
        [0.25, 0.02],
        [0.25, 0.055],
        [0.222, 0.08],
        [0.21, 0.7],
        [0.2, 0.742],
        [0.06, 0.785],
        [0.036, 0.8],
      ],
      i.steel,
      0,
      0,
      0,
      {
        seg: 26,
      },
    ),
      C0.torus(0.218, 0.006, i.blackMetal, 0, 0.36, 0, {
        rx: Math.PI / 2,
        seg: 24,
        rseg: 5,
      }),
      C0.cyl(0.03, 1.03, i.steel, 0, 0.79, 0, {
        seg: 12,
      }),
      C0.cyl(0.05, 0.05, i.blackMetal, 0, 1.3, 0, {
        seg: 12,
      }),
      C0.rod([0.05, 1.325, 0], [0.085, 1.325, 0], 0.012, i.blackMetal, {
        seg: 6,
      }));
    for (let k0 of [0.1, 0.69])
      C0.torus(0.2135, 0.0055, i.steel, 0, k0, 0, {
        rx: Math.PI / 2,
        seg: 26,
        rseg: 5,
      });
    {
      let k0 = new CylinderGeometry(
        0.2147,
        0.2235,
        0.46,
        10,
        1,
        !0,
        -0.62,
        1.24,
      );
      C0.add(k0, i.steel, 0, 0.385, 0);
      for (let O0 of [-1, 1])
        C0.rod(
          [Math.sin(O0 * 0.62) * 0.2245, 0.158, Math.cos(O0 * 0.62) * 0.2245],
          [Math.sin(O0 * 0.62) * 0.2157, 0.612, Math.cos(O0 * 0.62) * 0.2157],
          0.003,
          i.blackMetal,
          {
            seg: 4,
          },
        );
      C0.box(0.07, 0.022, 0.012, i.blackMetal, 0.09, 0.4, 0.2, {
        r: 0.004,
        ry: 0.42,
      });
      for (let O0 = 0; O0 < 5; O0++)
        C0.box(
          0.1,
          0.007,
          0.006,
          i.blackMetal,
          -0.02,
          0.2 + O0 * 0.018,
          0.2205,
          {
            ry: -0.09,
          },
        );
    }
    C0.lathe(
      [
        [0.25, 0],
        [0.268, 0.008],
        [0.272, 0.03],
        [0.262, 0.05],
        [0.25, 0.056],
      ],
      i.blackMetal,
      0,
      0,
      0,
      {
        seg: 26,
      },
    );
    for (let k0 of [-1, 1])
      (C0.cyl(0.036, 0.022, i.rubber, k0 * 0.1, 0.025, -0.262, {
        seg: 12,
        rz: Math.PI / 2,
      }),
        C0.box(0.012, 0.05, 0.05, i.steel, k0 * 0.1, 0.05, -0.245));
    (C0.cyl(0.021, 0.014, i.blackMetal, 0.092, 1.318, 0, {
      seg: 12,
      rz: -Math.PI / 2,
    }),
      C0.box(0.004, 0.02, 0.004, i.steel, 0.1, 1.332, 0),
      C0.cyl(0.009, 0.012, S, 0, 1.319, 0.052, {
        seg: 8,
        rx: Math.PI / 2,
        shadow: !1,
      }),
      C0.box(0.05, 0.03, 0.002, i.brass, 0, 1.2, 0.0305, {}),
      C0.cyl(0.082, 0.3, i.ledStrip, 0, 1.82, 0, {
        seg: 16,
        shadow: !1,
      }));
    for (let k0 = 0; k0 <= 5; k0++)
      C0.torus(0.095, 0.004, i.steel, 0, 1.82 + k0 * 0.06, 0, {
        rx: Math.PI / 2,
        seg: 16,
        rseg: 4,
      });
    for (let k0 = 0; k0 < 14; k0++) {
      let O0 = (k0 * TAU) / 14;
      C0.rod(
        [Math.cos(O0) * 0.095, 1.82, Math.sin(O0) * 0.095],
        [Math.cos(O0) * 0.095, 2.12, Math.sin(O0) * 0.095],
        0.003,
        i.steel,
        {
          seg: 4,
        },
      );
    }
    (C0.cyl(0.1, 0.03, i.steel, 0, 1.79, 0, {
      seg: 16,
    }),
      C0.lathe(
        [
          [0.03, 2.2],
          [0.12, 2.225],
          [0.3, 2.178],
          [0.44, 2.09],
          [0.44, 2.078],
          [0.3, 2.162],
          [0.12, 2.207],
          [0.03, 2.184],
        ],
        i.steel,
        0,
        0,
        0,
        {
          seg: 30,
        },
      ),
      C0.cyl(0.034, 0.03, i.steel, 0, 2.2, 0, {
        seg: 10,
      }),
      A(v0, 0.006, x0, 3.8, 3.8, 16738848, 0.42),
      s.addCollider(v0 - 0.2, 0, x0 - 0.2, v0 + 0.2, 2.24, x0 + 0.2, "metal"),
      s.aoBlob(v0, x0, 0, 0.42, 0.42, 0.45));
  }
  for (let [v0, x0] of [
    [-17.9, 15.6],
    [-11.3, 19.9],
    [13.3, 16.8],
    [11.3, 19.9],
  ])
    st(v0, x0);
  {
    let v0 = {
      shadow: !1,
    };
    (L(-21.8, 0.012, 21.796, 21.8, 0.03, 21.821, i.ledStrip, v0),
      L(-21.821, 0.012, 12.1, -21.796, 0.03, 21.8, i.ledStrip, v0),
      L(21.796, 0.012, 12.1, 21.821, 0.03, 21.8, i.ledStrip, v0));
    for (let x0 = -20.9; x0 <= 20.9; x0 += 2.2)
      A(x0, 0.006, 21.5, 2.6, 0.9, 16747068, 0.2);
    for (let x0 = 13.2; x0 <= 21; x0 += 2.2)
      (A(-21.5, 0.006, x0, 0.9, 2.6, 16747068, 0.2),
        A(21.5, 0.006, x0, 0.9, 2.6, 16747068, 0.2));
    for (let x0 of [-16.5, -11, -5.5, 0, 5.5, 11, 16.5])
      (L(x0 - 0.13, 0.04, 21.812, x0 + 0.13, 0.11, 21.823, i.rubber, v0),
        L(x0 - 0.15, 0.11, 21.808, x0 + 0.15, 0.124, 21.824, i.steel, v0),
        L(x0 - 0.15, 0.03, 21.808, x0 - 0.13, 0.124, 21.824, i.steel, v0),
        L(x0 + 0.13, 0.03, 21.808, x0 + 0.15, 0.124, 21.824, i.steel, v0));
    (L(-21.7, 0, 21.7, 21.7, 0.003, 21.76, i.rubber, {
      shadow: !1,
      faces: "b",
    }),
      L(-21.7, 0, 21.692, 21.7, 0.006, 21.7, i.steel, {
        shadow: !1,
        faces: "b",
      }),
      L(-21.7, 0, 21.76, 21.7, 0.006, 21.768, i.steel, {
        shadow: !1,
        faces: "b",
      }));
  }
  {
    let v0 = O(-14, 0, 12.02, 0),
      x0 = 1.4,
      C0 = 0.58,
      k0 = 2.02;
    for (let O0 of [-1, 1])
      for (let B0 of [0.035, C0 - 0.035])
        v0.box(0.06, k0, 0.06, i.woodLight, O0 * (x0 / 2 - 0.03), k0 / 2, B0, {
          r: 0.008,
        });
    for (let O0 = 0.1; O0 < k0 - 0.06; O0 += 0.105) {
      v0.box(x0 - 0.12, 0.075, 0.016, i.woodLight, 0, O0 + 0.04, 0.03);
      for (let B0 of [-1, 1])
        v0.box(
          0.016,
          0.075,
          C0 - 0.12,
          i.woodLight,
          B0 * (x0 / 2 - 0.03),
          O0 + 0.04,
          C0 / 2,
        );
    }
    for (let O0 of [0.1, 0.62, 1.12, 1.62])
      v0.box(x0 - 0.1, 0.028, C0 - 0.06, i.woodLight, 0, O0, C0 / 2, {
        r: 0.006,
      });
    (v0.box(
      x0 + 0.24,
      0.04,
      C0 + 0.22,
      i.woodDark,
      0,
      k0 + 0.05,
      C0 / 2 + 0.03,
      {
        rx: 0.12,
        r: 0.008,
      },
    ),
      v0.box(x0 + 0.1, 0.09, 0.03, i.woodLight, 0, k0 - 0.02, C0 + 0.005),
      f0("towels", -14, k0 - 0.02, 12.02 + C0 + 0.022, 0.62, 0.1),
      [
        [0.62, i.bedLinen],
        [1.12, i.velvetTeal],
        [1.62, i.bedLinen],
      ].forEach(([O0, B0], ot) => {
        for (let Q0 = 0; Q0 < 9; Q0++)
          lt(
            v0,
            -0.52 + Q0 * 0.13,
            O0 + 0.014,
            C0 / 2 + 0.02,
            B0,
            0.36,
            0.056,
            Math.PI / 2,
          );
        if (ot !== 1)
          for (let Q0 = 0; Q0 < 8 - ot * 2; Q0++)
            lt(
              v0,
              -0.455 + Q0 * 0.13,
              O0 + 0.014 + 0.098,
              C0 / 2 + 0.02,
              ot ? i.bedLinen : i.velvetTeal,
              0.36,
              0.056,
              Math.PI / 2,
            );
      }),
      v0.lathe(
        [
          [0.001, 0],
          [0.2, 0],
          [0.24, 0.02],
          [0.27, 0.36],
          [0.28, 0.38],
          [0.265, 0.38],
          [0.235, 0.03],
          [0.001, 0.025],
        ],
        M,
        -0.3,
        0.115,
        C0 / 2,
        {
          seg: 22,
        },
      ),
      v0.box(0.3, 0.12, 0.26, i.bedLinen, -0.3, 0.42, C0 / 2, {
        r: 0.05,
        seg: 2,
        ry: 0.4,
        rz: 0.15,
      }),
      Z0(v0, 0.32, 0.114, C0 / 2, 5, 0, [i.bedLinen]),
      s.addCollider(-14.72, 0, 12.02, -13.28, 2.1, 12.62, "wood"),
      s.aoSkirt(-14.72, 12.02, -13.28, 12.62, 0, 0.35, 0.4));
  }
  {
    let v0 = O(-16.72, 0, 12.3, 0),
      x0 = (O0, B0) =>
        v0.cyl(0.014, 0.84, i.blackMetal, O0, 0.08, B0, {
          seg: 8,
        });
    (x0(-0.46, -0.2),
      x0(-0.46, 0.2),
      x0(0.46, -0.2),
      x0(0.46, 0.2),
      v0.box(0.98, 0.03, 0.48, i.woodLight, 0, 0.86, 0, {
        r: 0.008,
      }),
      v0.box(0.94, 0.022, 0.44, i.woodLight, 0, 0.32, 0, {
        r: 0.006,
      }),
      v0.tube(
        [
          [-0.47, 0.9, -0.22],
          [0.47, 0.9, -0.22],
          [0.47, 0.9, 0.22],
          [-0.47, 0.9, 0.22],
        ],
        0.007,
        i.brass,
        {
          closed: !0,
          seg: 40,
          rseg: 6,
          tension: 0.02,
        },
      ));
    for (let [O0, B0] of [
      [-0.47, -0.22],
      [0.47, -0.22],
      [0.47, 0.22],
      [-0.47, 0.22],
      [0, -0.22],
      [0, 0.22],
    ])
      v0.cyl(0.005, 0.035, i.brass, O0, 0.872, B0, {
        seg: 6,
      });
    v0.tube(
      [
        [0.47, 0.84, -0.2],
        [0.62, 0.92, -0.2],
        [0.62, 0.92, 0.2],
        [0.47, 0.84, 0.2],
      ],
      0.011,
      i.blackMetal,
      {
        seg: 24,
        rseg: 6,
        tension: 0.1,
      },
    );
    for (let O0 of [-0.235, 0.235]) {
      v0.torus(0.1, 0.014, i.rubber, -0.46, 0.1, O0, {
        ry: 0,
        seg: 20,
        rseg: 6,
      });
      for (let B0 = 0; B0 < 6; B0++) {
        let ot = (B0 * Math.PI) / 3;
        v0.rod(
          [-0.46 + Math.cos(ot) * 0.095, 0.1 + Math.sin(ot) * 0.095, O0],
          [-0.46, 0.1, O0],
          0.004,
          i.brass,
          {
            seg: 4,
          },
        );
      }
    }
    for (let O0 of [-0.2, 0.2])
      v0.sphere(0.035, i.rubber, 0.46, 0.04, O0, {
        seg: 8,
        hseg: 6,
      });
    v0.box(0.46, 0.17, 0.3, i.steel, -0.18, 0.96, 0, {
      r: 0.03,
      seg: 2,
    });
    let C0 = F(_, {
        shadow: !1,
      }),
      k0 = new IcosahedronGeometry(0.02, 0);
    for (let O0 = 0; O0 < 70; O0++)
      C0.add(
        k0,
        P(
          -16.72 - 0.18 + u.range(-0.19, 0.19),
          1.05 + u.range(-0.012, 0.014),
          12.3 + u.range(-0.11, 0.11),
          u() * 3,
          u() * 3,
          u() * 3,
          u.range(0.7, 1.3),
        ),
      );
    C0.flush();
    for (let O0 = 0; O0 < 5; O0++) {
      let B0 = a.bottleGeometry(O0 % 3);
      v0.add(
        B0.geometry.clone(),
        i.screenOff,
        -0.36 + O0 * 0.09,
        0.9,
        u.range(-0.07, 0.07),
        {
          rx: u.range(-0.35, 0.35),
          rz: u.range(-0.3, 0.3),
          shadow: !1,
        },
      );
    }
    v0.lathe(
      [
        [0, 0],
        [0.036, 0],
        [0.042, 0.13],
        [0.038, 0.15],
        [0.03, 0.165],
        [0.026, 0.2],
        [0.018, 0.21],
        [0, 0.212],
      ],
      i.chrome,
      0.2,
      0.875,
      -0.08,
      {
        seg: 16,
      },
    );
    for (let O0 = 0; O0 < 4; O0++)
      v0.lathe(
        [
          [0, 0.006],
          [0.026, 0.006],
          [0.032, 0.09],
          [0.034, 0.09],
          [0.028, 0],
          [0, 0],
        ],
        _,
        0.3 + (O0 % 2) * 0.075,
        0.875,
        0.06 + Math.floor(O0 / 2) * 0.075,
        {
          seg: 12,
          shadow: !1,
        },
      );
    v0.lathe(
      [
        [0, 0.01],
        [0.05, 0.012],
        [0.085, 0.05],
        [0.09, 0.062],
        [0.082, 0.062],
        [0.05, 0.022],
        [0, 0.02],
      ],
      i.woodDark,
      0.16,
      0.875,
      0.12,
      {
        seg: 16,
      },
    );
    for (let O0 = 0; O0 < 6; O0++)
      v0.sphere(
        0.022,
        g,
        0.16 + u.range(-0.04, 0.04),
        0.91 + u.range(0, 0.02),
        0.12 + u.range(-0.04, 0.04),
        {
          seg: 8,
          hseg: 6,
          s: [1, 0.85, 1.2],
        },
      );
    v0.box(0.4, 0.012, 0.3, i.woodDark, -0.2, 0.34, 0);
    for (let O0 of [-1, 1])
      (v0.box(0.012, 0.14, 0.3, i.woodDark, -0.2 + O0 * 0.2, 0.4, 0),
        v0.box(0.4, 0.14, 0.012, i.woodDark, -0.2, 0.4, O0 * 0.15));
    for (let O0 = 0; O0 < 6; O0++) {
      let B0 = a.bottleGeometry((O0 + 1) % 3);
      v0.add(
        B0.geometry.clone(),
        i.screenOff,
        -0.32 + (O0 % 3) * 0.12,
        0.346,
        -0.07 + Math.floor(O0 / 3) * 0.14,
        {
          shadow: !1,
        },
      );
    }
    (Z0(v0, 0.24, 0.331, 0, 3, 0.2, [i.bedLinen, i.fabricCharcoal]),
      s.addCollider(-17.22, 0, 12.04, -16.08, 0.92, 12.56, "wood"),
      s.aoBlob(-16.72, 12.3, 0, 0.7, 0.4, 0.45));
  }
  {
    let v0 = O(13.2, 0, 12, 0);
    (v0.box(0.34, 2.25, 0.02, i.steel, 0, 1.13, 0.012, {
      r: 0.006,
    }),
      v0.tube(
        [
          [0, 1, 0.05],
          [0, 2.02, 0.05],
          [0, 2.2, 0.1],
          [0, 2.26, 0.26],
          [0, 2.22, 0.4],
          [0, 2.14, 0.44],
        ],
        0.014,
        i.chrome,
        {
          seg: 30,
          rseg: 8,
        },
      ),
      v0.lathe(
        [
          [0, 0],
          [0.11, 0],
          [0.116, 0.012],
          [0.1, 0.03],
          [0.02, 0.05],
          [0.014, 0.07],
          [0, 0.07],
        ],
        i.chrome,
        0,
        2.07,
        0.44,
        {
          seg: 22,
        },
      ),
      v0.add(new CircleGeometry(0.1, 20), i.plasterDark, 0, 2.069, 0.44, {
        rx: Math.PI / 2,
        shadow: !1,
      }),
      v0.cyl(0.034, 0.05, i.chrome, 0, 1.08, 0.05, {
        seg: 14,
        rx: Math.PI / 2,
      }),
      v0.rod([0, 1.105, 0.1], [0.07, 1.14, 0.12], 0.007, i.chrome, {
        seg: 6,
      }),
      v0.tube(
        [
          [0, 0.42, 0.03],
          [0, 0.42, 0.1],
          [0, 0.39, 0.14],
          [0, 0.34, 0.15],
        ],
        0.011,
        i.chrome,
        {
          seg: 12,
          rseg: 6,
        },
      ),
      v0.cyl(0.02, 0.03, i.chrome, 0.07, 0.43, 0.03, {
        seg: 10,
        rx: Math.PI / 2,
      }));
    for (let k0 = 0; k0 < 9; k0++)
      v0.box(0.9, 0.022, 0.078, i.woodLight, 0, 0.031, 0.1 + k0 * 0.1, {
        r: 0.006,
      });
    for (let k0 of [-0.36, 0.36])
      v0.box(0.05, 0.02, 0.9, i.woodDark, k0, 0.01, 0.5);
    (M0("drain", 13.2, 0.005, 12.5, 0.16, 0.16, 0),
      M0("puddleA", 13.3, 0.005, 13.02, 0.5, 0.34, 0.8));
    let x0 = 0,
      C0 = v0.pt(0, 2.06, 0.44);
    n.emitters.push((k0) => {
      ((x0 += k0),
        x0 > 0.8 &&
          ((x0 = u() * 0.3),
          n.alpha.spawn({
            x: C0.x + u.range(-0.06, 0.06),
            y: C0.y,
            z: C0.z + u.range(-0.06, 0.06),
            vy: -0.2,
            life: 0.75,
            s0: 0.016,
            s1: 0.012,
            r: 0.9,
            g: 0.85,
            b: 0.8,
            a: 0.8,
            frame: 9,
            grav: 9.8,
            stretch: 0.02,
          })));
    });
  }
  {
    let v0 = O(8.2, 0, 21.72, Math.PI);
    (v0.cyl(0.024, 1.3, i.plasticWhite, 0, 0, 0, {
      seg: 10,
    }),
      v0.sphere(0.03, i.plasticWhite, 0, 1.3, 0, {
        seg: 8,
        hseg: 6,
      }),
      v0.box(0.3, 0.3, 0.012, i.plasticWhite, 0, 1, 0.03, {
        r: 0.004,
      }),
      v0.rod([0, 1.12, 0.03], [0, 1.15, 0.12], 0.008, i.steel, {
        seg: 6,
      }));
    for (let C0 = 0; C0 < 4; C0++)
      (v0.torus(0.27, 0.052, y, 0, 0.92, 0.1, {
        rz: (C0 * Math.PI) / 2 + 0.2,
        arc: Math.PI / 2 - 0.4,
        seg: 12,
        rseg: 8,
      }),
        v0.torus(0.27, 0.054, i.plasticWhite, 0, 0.92, 0.1, {
          rz: (C0 * Math.PI) / 2 - 0.2,
          arc: 0.4,
          seg: 5,
          rseg: 8,
        }));
    let x0 = [];
    for (let C0 = 0; C0 < 16; C0++) {
      let k0 = (C0 * TAU) / 16,
        O0 = C0 % 4 === 0 ? 0.325 : 0.36;
      x0.push([
        Math.cos(k0) * O0,
        0.92 + Math.sin(k0) * O0,
        0.1 + (C0 % 4 === 0 ? 0 : 0.02),
      ]);
    }
    v0.tube(x0, 0.006, i.fabricCream, {
      closed: !0,
      seg: 64,
      rseg: 5,
    });
  }
  {
    let v0 = F(T),
      x0 = new IcosahedronGeometry(1, 0);
    for (let C0 = 0; C0 < 90; C0++) {
      let k0 = -15 + u.range(-0.4, 0.4),
        O0 = 17.2 + u.range(-0.4, 0.4),
        B0 = u.range(0.03, 0.062);
      v0.add(
        x0,
        P(k0, 0.505 + u.range(0, 0.035), O0, u() * 3, u() * 3, u() * 3, [
          B0 * u.range(0.8, 1.3),
          B0 * u.range(0.6, 1),
          B0 * u.range(0.8, 1.3),
        ]),
      );
    }
    (v0.flush(),
      H.torus(0.3, 0.014, i.steel, -15, 0.515, 17.2, {
        rx: Math.PI / 2,
        seg: 28,
        rseg: 6,
      }),
      L(-15.56, 0.46, 16.64, -14.44, 0.472, 17.76, i.steel, {
        shadow: !1,
      }));
    for (let [C0, k0, O0, B0] of [
      [-15.5, 16.7, -14.5, 16.762],
      [-15.5, 17.638, -14.5, 17.7],
      [-15.5, 16.762, -15.438, 17.638],
      [-14.562, 16.762, -14.5, 17.638],
    ])
      r.bbox(C0, 0.468, k0, O0, 0.516, B0, i.steel, {
        r: 0.006,
        seg: 1,
      });
    for (let [C0, k0, O0, B0] of [
      [-15, 16.66, 1.06, 0.008],
      [-15, 17.74, 1.06, 0.008],
      [-15.54, 17.2, 0.008, 1.06],
      [-14.46, 17.2, 0.008, 1.06],
    ])
      H.add(w0, _, C0, 0.61, k0, {
        s: [O0, 0.28, B0],
        shadow: !1,
      });
    for (let [C0, k0] of [
      [-15.54, 16.66],
      [-14.46, 16.66],
      [-15.54, 17.74],
      [-14.46, 17.74],
    ])
      (H.cyl(0.011, 0.3, i.chrome, C0, 0.47, k0, {
        seg: 8,
      }),
        H.sphere(0.016, i.chrome, C0, 0.775, k0, {
          seg: 8,
          hseg: 6,
        }));
    for (let [C0, k0, O0, B0, ot, Q0] of [
      [-17, 17.2, Math.PI / 2, i.velvetTeal, 0.05, 0.12],
      [-13.1, 17.3, -Math.PI / 2, y, -0.06, -0.16],
      [-15, 19.2, Math.PI, i.velvetTeal, 0.03, 0.2],
    ])
      O(C0, 0, k0, O0).add($(0.4, 0.13, 0.4), B0, ot, 0.66, -0.23, {
        rx: Math.PI / 2 - 0.4,
        ry: Q0,
        order: "XYZ",
      });
  }
  {
    for (let [x0, C0, k0] of [
      [15.42, i.velvetTeal, 0.2],
      [16, y, -0.15],
      [16.95, i.fabricCharcoal, 0.3],
    ])
      H.add($(0.44, 0.16, 0.44), C0, x0, 0.68, 18.14, {
        rx: -1.05,
        ry: k0,
      });
    H.add($(0.5, 0.13, 0.3), i.bedLinen, 16.5, 0.54, 17.84, {
      ry: 0.25,
    });
    {
      let x0 = new PlaneGeometry(0.9, 0.62, 16, 5),
        C0 = x0.attributes.position;
      for (let k0 = 0; k0 < C0.count; k0++) {
        let O0 = C0.getX(k0),
          B0 = C0.getY(k0),
          ot = Math.abs(O0),
          Q0 = Math.min(1, ot / 0.13),
          nt =
            ot < 0.13
              ? 0.7 + 0.03 * Math.cos((Q0 * Math.PI) / 2)
              : 0.7 - (ot - 0.13) * 0.95;
        C0.setXYZ(
          k0,
          17.27 +
            Math.sign(O0) * (ot < 0.13 ? ot : 0.13 + (ot - 0.13) * 0.12) +
            Math.sin(B0 * 22) * 0.008,
          nt,
          17.98 + B0 + Math.sin(O0 * 9) * 0.015,
        );
      }
      r.add(n0(x0), y, {});
    }
    for (let [x0, C0, k0] of [
      [15.1, 16.75, 0.55],
      [16.25, 16.5, 0.75],
      [17.3, 16.9, 0.5],
    ]) {
      let O0 = 2.8 - k0,
        B0 = O(x0, O0, C0);
      (B0.rod([0, 0.22, 0], [0, k0, 0], 0.004, i.plasticBlack, {
        seg: 4,
      }),
        B0.lathe(
          [
            [0.03, 0.22],
            [0.12, 0.2],
            [0.21, 0.13],
            [0.25, 0.04],
            [0.245, 0],
          ],
          M,
          0,
          0,
          0,
          {
            seg: 22,
          },
        ));
      for (let ot = 0; ot < 16; ot++) {
        let Q0 = (ot * TAU) / 16;
        B0.tube(
          [
            [Math.cos(Q0) * 0.03, 0.225, Math.sin(Q0) * 0.03],
            [Math.cos(Q0) * 0.125, 0.206, Math.sin(Q0) * 0.125],
            [Math.cos(Q0) * 0.215, 0.133, Math.sin(Q0) * 0.215],
            [Math.cos(Q0) * 0.255, 0.04, Math.sin(Q0) * 0.255],
            [Math.cos(Q0) * 0.25, -0.004, Math.sin(Q0) * 0.25],
          ],
          0.005,
          i.woodLight,
          {
            seg: 8,
            rseg: 4,
            shadow: !1,
          },
        );
      }
      for (let [ot, Q0] of [
        [0.25, 0],
        [0.215, 0.133],
        [0.125, 0.205],
      ])
        B0.torus(ot + 0.004, 0.006, i.woodLight, 0, Q0, 0, {
          rx: Math.PI / 2,
          seg: 22,
          rseg: 5,
        });
      (B0.sphere(0.04, i.bulbWarm, 0, 0.09, 0, {
        seg: 10,
        hseg: 8,
        shadow: !1,
      }),
        B0.cyl(0.016, 0.05, i.brass, 0, 0.125, 0, {
          seg: 8,
        }),
        A(x0, 0.006, C0, 2.6, 2.6, 16754768, 0.3),
        A(x0, 2.795, C0, 1.2, 1.2, 16754768, 0.2, In(0, -1, 0)));
    }
    let v0 = (x0, C0, k0) => {
      r.tube(x0, 0.007, i.woodDark, {
        seg: x0.length * 5,
        rseg: 4,
        shadow: !1,
      });
      let O0 = new CatmullRomCurve3(x0.map((L0) => In(...L0))),
        B0 = [],
        ot = In(),
        Q0 = In(),
        nt = In();
      for (let L0 = 0; L0 < C0; L0++) {
        let ht = u();
        (O0.getPoint(ht, ot),
          O0.getTangent(ht, Q0),
          nt
            .set(u() - 0.5, u() - 0.5, u() - 0.5)
            .cross(Q0)
            .normalize(),
          B0.push(
            ot.x + nt.x * 0.01,
            ot.y + nt.y * 0.01,
            ot.z + nt.z * 0.01,
            nt.x,
            nt.y,
            nt.z,
          ));
      }
      k(B0, k0, g, {
        tilt0: 0,
        tilt1: 0.6,
        droop: 0.7,
      });
    };
    for (let [x0, C0, k0] of [
      [14.2, 15, 1],
      [18.2, 15, -1],
      [14.2, 18.7, -1],
      [18.2, 18.7, 1],
    ]) {
      let O0 = [];
      for (let B0 = 0; B0 <= 14; B0++) {
        let ot = B0 / 14,
          Q0 = k0 * ot * 9 + x0;
        O0.push([
          x0 + Math.cos(Q0) * 0.085,
          0.04 + ot * 2.74,
          C0 + Math.sin(Q0) * 0.085,
        ]);
      }
      v0(O0, 420, 0.05);
    }
    for (let x0 = 0; x0 < 9; x0++) {
      let C0 = 14.3 + x0 * 0.47 + u.range(-0.1, 0.1),
        k0 = u.range(0.35, 0.95);
      v0(
        [
          [C0, 2.86, 14.72],
          [C0 + 0.02, 2.82, 14.66],
          [C0 + u.range(-0.05, 0.05), 2.82 - k0 * 0.5, 14.64],
          [C0 + u.range(-0.08, 0.08), 2.82 - k0, 14.66],
        ],
        Math.round(k0 * 110),
        0.05,
      );
    }
    for (let x0 = 0; x0 < 6; x0++) {
      let C0 = 15.3 + x0 * 0.6 + u.range(-0.1, 0.1),
        k0 = u.range(0.3, 0.8);
      v0(
        [
          [14.26, 2.86, C0],
          [14.2, 2.82, C0],
          [14.18, 2.82 - k0 * 0.5, C0 + u.range(-0.05, 0.05)],
          [14.2, 2.82 - k0, C0 + u.range(-0.08, 0.08)],
        ],
        Math.round(k0 * 110),
        0.05,
      );
    }
  }
  {
    let O0 = function (pt, V0, c0, Z = 0.46) {
        let r0 = [],
          d0 = 0;
        for (let j = 0; j <= 26; j++) {
          let s0 = j / 26;
          (r0.push([
            pt[0] + (V0[0] - pt[0]) * s0,
            pt[1] + (V0[1] - pt[1]) * s0 - c0 * 4 * s0 * (1 - s0),
            pt[2] + (V0[2] - pt[2]) * s0,
          ]),
            j &&
              (d0 += Math.hypot(
                r0[j][0] - r0[j - 1][0],
                r0[j][1] - r0[j - 1][1],
                r0[j][2] - r0[j - 1][2],
              )));
        }
        r.tube(r0, 0.0065, i.rubber, {
          seg: 52,
          rseg: 4,
        });
        let V = Math.floor(d0 / Z);
        for (let j = 1; j < V; j++) {
          let s0 = j / V,
            l0 = Math.min(25, Math.floor(s0 * 26)),
            E0 = s0 * 26 - l0,
            U = [0, 1, 2].map(
              (X) => r0[l0][X] + (r0[l0 + 1][X] - r0[l0][X]) * E0,
            );
          (x0.add(k0, P(U[0], U[1] - 0.02, U[2])),
            v0.add(C0, P(U[0], U[1] - 0.058, U[2], 0, 0, 0, [1, 1.25, 1])));
        }
        let B = r0[13];
        B[1] < 7 &&
          !t.inPool(B[0], B[2]) &&
          A(B[0], 0.006, B[2], 5.5, 5.5, 16754768, 0.1);
      },
      B0 = function (pt, V0, c0, Z = !0) {
        let r0 = O(pt, 0, V0);
        (Z &&
          (r0.box(0.09, 0.05, 0.05, i.blackMetal, 0, 0.06, 0.02),
          r0.box(0.09, 0.05, 0.05, i.blackMetal, 0, 0.2, 0.02)),
          r0.cyl(0.026, c0 - 0.05, i.blackMetal, 0, 0.05, 0, {
            seg: 10,
            r2: 0.018,
          }),
          r0.sphere(0.03, i.brass, 0, c0, 0, {
            seg: 8,
            hseg: 6,
          }),
          r0.torus(0.02, 0.004, i.brass, 0, c0 - 0.09, -0.03, {
            seg: 10,
            rseg: 4,
          }));
      },
      v0 = F(i.bulbWarm, {
        shadow: !1,
      }),
      x0 = F(i.plasticBlack, {
        shadow: !1,
      }),
      C0 = new SphereGeometry(0.027, 7, 5),
      k0 = new CylinderGeometry(0.011, 0.013, 0.034, 6),
      ot = (pt, V0, c0) => {
        (H.cyl(0.035, 0.012, i.blackMetal, pt, V0, c0, {
          seg: 10,
          rx: Math.PI / 2,
        }),
          H.torus(0.022, 0.005, i.blackMetal, pt, V0, c0 + 0.03, {
            ry: Math.PI / 2,
            seg: 10,
            rseg: 4,
          }));
      },
      Q0 = 21.79,
      nt = 4.45,
      L0 = [-17.6, -10.6, -3.6, 3.6, 10.6, 17.6],
      ht = [-10.2, -6.1, -2.05, 2.05, 6.1, 10.2];
    L0.forEach((pt, V0) => {
      (B0(pt, Q0, nt),
        ot(ht[V0], 8.32, 10.43),
        O0([ht[V0], 8.32, 10.47], [pt, nt - 0.09, Q0 - 0.03], 1.15));
    });
    for (let pt = 0; pt < L0.length - 1; pt++)
      O0(
        [L0[pt], nt - 0.09, Q0 - 0.03],
        [L0[pt + 1], nt - 0.09, Q0 - 0.03],
        0.42,
      );
    for (let pt of [-1, 1])
      (B0(pt * 21.78, 21.6, nt, !1),
        H.box(0.05, 0.12, 0.09, i.blackMetal, pt * 21.8, 0.16, 21.6),
        ot(pt * 21.4, 7.9, 10.01),
        O0([pt * 21.4, 7.9, 10.05], [pt * 21.75, nt - 0.09, 21.58], 0.9),
        O0(
          [pt * 21.75, nt - 0.09, 21.58],
          [pt * 17.6, nt - 0.09, Q0 - 0.03],
          0.3,
        ));
    (O0([18.26, 2.96, 18.76], [21.75, nt - 0.3, 21.5], 0.25),
      O0([14.14, 2.96, 14.94], [18.26, 2.96, 14.94], 0.16, 0.34),
      O0([18.26, 2.96, 14.94], [18.26, 2.96, 18.76], 0.14, 0.34),
      v0.flush(),
      x0.flush());
  }
  for (let v0 of [-1, 1]) {
    let x0 = v0 * 11;
    r.bbox(x0 - 0.62, Qt, 10.3, x0 + 0.62, Qt + 0.014, 11, i.rubber, {
      r: 0.005,
      seg: 1,
    });
    for (let ot = 10.35; ot < 10.96; ot += 0.045)
      L(
        x0 - 0.57,
        Qt + 0.012,
        ot,
        x0 + 0.57,
        Qt + 0.019,
        ot + 0.022,
        i.plasticBlack,
        {
          shadow: !1,
          faces: "b",
        },
      );
    let C0 = v0 * 10.33,
      k0 = 11.62,
      O0 = O(C0, Qt, k0, Math.PI / 4);
    (O0.cyl(0.17, 0.74, i.ceramicBlack, 0, 0, 0, {
      seg: 4,
      r2: 0.235,
    }),
      O0.cyl(0.215, 0.03, i.soil, 0, 0.715, 0, {
        seg: 4,
      }),
      O0.cyl(0.018, 0.34, i.woodDark, 0, 0.74, 0, {
        seg: 6,
      }),
      G(C0, Qt + 1.28, k0, 0.25),
      s.addCollider(
        C0 - 0.17,
        Qt,
        k0 - 0.17,
        C0 + 0.17,
        Qt + 0.8,
        k0 + 0.17,
        "ceramic",
      ));
    let B0 = O(v0 * 12.52, Qt + 1.95, 10, 0);
    (B0.box(0.14, 0.34, 0.02, i.blackMetal, 0, 0, 0.012, {
      r: 0.004,
    }),
      B0.rod([0, 0.1, 0.02], [0, 0.16, 0.16], 0.008, i.blackMetal, {
        seg: 6,
      }),
      B0.box(0.17, 0.014, 0.17, i.blackMetal, 0, 0.17, 0.16).box(
        0.15,
        0.012,
        0.15,
        i.blackMetal,
        0,
        -0.13,
        0.16,
      ));
    for (let [ot, Q0] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      B0.box(0.01, 0.3, 0.01, i.blackMetal, ot * 0.07, 0.02, 0.16 + Q0 * 0.07);
    (B0.box(0.125, 0.27, 0.125, i.lampShade, 0, 0.02, 0.16, {
      shadow: !1,
    }),
      B0.add(new ConeGeometry(0.13, 0.07, 4), i.blackMetal, 0, 0.212, 0.16, {
        ry: Math.PI / 4,
      }),
      A(v0 * 12.52, Qt + 1.9, 10.013, 1.7, 2.3, 16754768, 0.5, In(0, 0, 1)),
      A(v0 * 12.3, Qt + 0.006, 10.9, 2.2, 2.2, 16754768, 0.18));
  }
  {
    let { place: v0 } = t.tools;
    (H.box(0.9, 0.022, 0.31, i.velvetTeal, 3.9, 0.047, 14.335, {
      r: 0.01,
      seg: 2,
      ry: 0.05,
    }),
      H.box(0.5, 0.02, 0.3, i.velvetTeal, 4.08, 0.067, 14.34, {
        r: 0.009,
        seg: 2,
        ry: 0.11,
      }),
      et(H, 3.62, 0.06, 14.33, 0.9),
      H.box(1.3, 0.035, 0.02, i.steel, 14.6, 1.78, 12.012));
    for (let B0 of [14.1, 14.43, 14.77, 15.1])
      H.rod([B0, 1.78, 12.02], [B0, 1.8, 12.075], 0.007, i.steel, {
        seg: 5,
      });
    (r.curtain("z", 12.055, 14.02, 14.5, 0.86, 1.78, i.bedLinen, {
      folds: 0.15,
      depth: 0.022,
      seed: 3,
    }),
      r.curtain("z", 12.055, 14.68, 15.16, 1.02, 1.78, i.velvetTeal, {
        folds: 0.17,
        depth: 0.024,
        seed: 9,
      }),
      H.box(0.5, 0.94, 0.025, i.blackMetal, -15.55, 1.55, 12.014),
      f0("rules", -15.55, 1.55, 12.029, 0.44, 0.88),
      v0(
        a.rug({
          w: 3.4,
          d: 2.7,
          variant: 2,
        }),
        16.2,
        0.002,
        17.05,
        0,
      ));
    let x0 = O(14.78, 0, 17.55, 0.4);
    for (let B0 = 0; B0 < 3; B0++) {
      let ot = (B0 * TAU) / 3;
      x0.rod(
        [Math.cos(ot) * 0.19, 0, Math.sin(ot) * 0.19],
        [Math.cos(ot) * 0.1, 0.62, Math.sin(ot) * 0.1],
        0.008,
        i.steel,
        {
          seg: 5,
        },
      );
    }
    (x0.torus(0.12, 0.006, i.steel, 0, 0.62, 0, {
      rx: Math.PI / 2,
      seg: 18,
      rseg: 5,
    }),
      x0.torus(0.165, 0.005, i.steel, 0, 0.2, 0, {
        rx: Math.PI / 2,
        seg: 18,
        rseg: 5,
      }),
      x0.lathe(
        [
          [0, 0],
          [0.09, 0],
          [0.1, 0.012],
          [0.125, 0.2],
          [0.132, 0.215],
          [0.122, 0.215],
          [0.096, 0.02],
          [0, 0.016],
        ],
        i.steel,
        0,
        0.6,
        0,
        {
          seg: 22,
        },
      ));
    for (let B0 of [-1, 1])
      x0.torus(0.028, 0.005, i.steel, B0 * 0.135, 0.76, 0, {
        ry: Math.PI / 2,
        seg: 10,
        rseg: 4,
      });
    {
      let B0 = a.bottleGeometry(0);
      x0.add(B0.geometry.clone(), i.screenOff, 0.01, 0.64, 0, {
        rz: 0.28,
        rx: 0.1,
        shadow: !1,
      });
    }
    let C0 = F(_, {
        shadow: !1,
      }),
      k0 = new IcosahedronGeometry(0.02, 0);
    for (let B0 = 0; B0 < 26; B0++) {
      let ot = u() * TAU,
        Q0 = Math.sqrt(u()) * 0.1,
        nt = x0.pt(
          Math.cos(ot) * Q0,
          0.8 + u.range(-0.01, 0.012),
          Math.sin(ot) * Q0,
        );
      C0.add(
        k0,
        P(nt.x, nt.y, nt.z, u() * 3, u() * 3, u() * 3, u.range(0.7, 1.2)),
      );
    }
    C0.flush();
    let O0 = O(16.2, 0.42, 16.6, 0.3);
    O0.box(0.46, 0.012, 0.3, i.steel, -0.12, 0.008, 0, {
      r: 0.005,
    });
    for (let [B0, ot] of [
      [-0.22, -0.04],
      [-0.1, 0.05],
    ])
      O0.lathe(
        [
          [0, 0],
          [0.03, 0],
          [0.031, 0.004],
          [0.005, 0.01],
          [0.004, 0.085],
          [0.022, 0.12],
          [0.026, 0.2],
          [0.0235, 0.2],
          [0.019, 0.125],
          [0, 0.092],
        ],
        _,
        B0,
        0.014,
        ot,
        {
          seg: 12,
          shadow: !1,
        },
      );
    O0.lathe(
      [
        [0, 0.012],
        [0.06, 0.014],
        [0.11, 0.05],
        [0.118, 0.066],
        [0.108, 0.066],
        [0.06, 0.026],
        [0, 0.024],
      ],
      i.woodDark,
      0.22,
      0,
      0.02,
      {
        seg: 18,
      },
    );
    for (let B0 = 0; B0 < 5; B0++)
      O0.sphere(
        0.033,
        B0 % 2 ? y : i.foliage,
        0.22 + u.range(-0.05, 0.05),
        0.065 + (B0 > 2 ? 0.035 : 0),
        0.02 + u.range(-0.05, 0.05),
        {
          seg: 10,
          hseg: 8,
        },
      );
  }
  J0();
  function J0() {
    let v0 = {
        shadow: !1,
      },
      x0 = [],
      C0 = (tt, X0, ut, z0, I0 = 1, vt = 0, wt = 0) => {
        let _t = new Color(z0);
        return (
          x0.push(tt, X0, ut, _t.r, _t.g, _t.b, I0, vt, wt),
          x0.length / 9 - 1
        );
      };
    {
      r.sign(
        "SOLSTICE",
        {
          w: 10.4,
          h: 1.62,
          color: "#ffd9a0",
          glow: 3.2,
          font: '700 150px Bahnschrift, "DIN Alternate", "Segoe UI", sans-serif',
        },
        0,
        Ni + 1.22,
        9.78,
      );
      for (let tt = -5.4; tt <= 5.41; tt += 1.2)
        (H.box(0.07, 2.2, 0.07, i.blackMetal, tt, Ni + 1.1, 9.66),
          H.rod([tt, Ni + 1.95, 9.66], [tt, Ni, 8.5], 0.025, i.blackMetal, {
            seg: 5,
          }));
      for (let tt of [0.34, 1.22, 2.1])
        H.box(11, 0.05, 0.05, i.blackMetal, 0, Ni + tt, 9.7);
      for (let tt = -4.8; tt <= 4.81; tt += 2.4)
        (H.rod(
          [tt - 0.6, Ni + 0.34, 9.68],
          [tt + 0.6, Ni + 2.1, 9.68],
          0.015,
          i.blackMetal,
          {
            seg: 4,
          },
        ),
          H.rod(
            [tt + 0.6, Ni + 0.34, 9.68],
            [tt + 1.8, Ni + 2.1, 9.68],
            0.015,
            i.blackMetal,
            {
              seg: 4,
            },
          ));
      L(-5.3, Ni + 0.02, 9.9, 5.3, Ni + 0.07, 9.96, i.ledStrip, v0);
    }
    for (let tt of [-1, 1]) {
      let X0 = tt < 0 ? -27.2 : 13.4,
        ut = tt < 0 ? -13.4 : 27.2;
      for (let bt = X0; bt <= ut + 0.01; bt += 2.3)
        H.box(0.09, 1.75, 0.09, i.steel, bt, Ni + 0.875, 9.3);
      for (let bt = 0; bt < 10; bt++)
        H.box(
          ut - X0,
          0.014,
          0.16,
          i.steel,
          (X0 + ut) / 2,
          Ni + 0.2 + bt * 0.16,
          9.3,
          {
            rx: -0.6,
          },
        );
      H.box(ut - X0 + 0.1, 0.06, 0.12, i.steel, (X0 + ut) / 2, Ni + 1.78, 9.3);
      let z0 = tt * 21.5,
        I0 = 9.5,
        vt = 3.6,
        wt = 8.2,
        _t = 2.9;
      (r.bbox(z0 - I0 / 2, Ni, vt, z0 + I0 / 2, Ni + _t, wt, i.exterior, {
        r: 0.02,
        seg: 1,
      }),
        L(
          z0 - I0 / 2 - 0.08,
          Ni + _t,
          vt - 0.08,
          z0 + I0 / 2 + 0.08,
          Ni + _t + 0.12,
          wt + 0.08,
          i.steel,
        ));
      for (let bt = 0; bt < 4; bt++) {
        let Et = z0 - 3.2 + bt * 2.1;
        for (let zt = 0; zt < 9; zt++)
          H.box(
            1.5,
            0.012,
            0.07,
            i.steel,
            Et,
            Ni + 1.5 + zt * 0.11,
            wt + 0.02,
            {
              rx: -0.55,
            },
          );
        H.box(1.6, 0.04, 0.05, i.blackMetal, Et, Ni + 1.44, wt + 0.02).box(
          1.6,
          0.04,
          0.05,
          i.blackMetal,
          Et,
          Ni + 2.52,
          wt + 0.02,
        );
      }
      let Pt = Ni + _t + 0.12;
      for (let bt = 0; bt < 3; bt++) {
        let Et = z0 - 3 + bt * 2.5,
          zt = 6.9,
          J = O(Et, Pt, zt, 0);
        (J.box(2, 1.15, 1.25, i.steel, 0, 0.7, 0, {
          r: 0.03,
          seg: 1,
        }),
          J.box(2.06, 0.1, 1.31, i.blackMetal, 0, 0.08, 0));
        for (let Q of [-0.5, 0.5]) {
          (J.cyl(0.4, 0.14, i.blackMetal, Q, 1.27, 0, {
            seg: 20,
          }),
            J.add(new CircleGeometry(0.36, 18), i.plasterDark, Q, 1.412, 0, {
              rx: -Math.PI / 2,
              shadow: !1,
            }));
          for (let i0 of [0.12, 0.24, 0.36])
            J.torus(i0, 0.008, i.steel, Q, 1.42, 0, {
              rx: Math.PI / 2,
              seg: 18,
              rseg: 4,
            });
          for (let i0 = 0; i0 < 4; i0++)
            J.box(0.74, 0.01, 0.012, i.steel, Q, 1.425, 0, {
              ry: (i0 * Math.PI) / 4,
            });
        }
        for (let Q = 0; Q < 8; Q++)
          J.box(1.7, 0.012, 0.03, i.blackMetal, 0, 0.3 + Q * 0.1, 0.64, {
            rx: -0.5,
          });
      }
      for (let [bt, Et, zt, J] of [
        [-4.2, 4.4, 0.16, 1.9],
        [-3.6, 4.5, 0.11, 1.4],
        [3.9, 4.6, 0.2, 2.4],
      ])
        (H.cyl(zt, J, i.steel, z0 + bt, Pt, Et, {
          seg: 14,
        }),
          H.add(
            new ConeGeometry(zt * 1.7, zt * 1.1, 14),
            i.steel,
            z0 + bt,
            Pt + J + zt * 0.75,
            Et,
          ),
          H.cyl(zt * 1.15, 0.05, i.blackMetal, z0 + bt, Pt + J * 0.55, Et, {
            seg: 14,
          }));
      if (tt > 0) {
        let bt = O(z0 + 1.2, Pt, 4.9);
        for (let [Et, zt] of [
          [-0.8, -0.8],
          [0.8, -0.8],
          [0.8, 0.8],
          [-0.8, 0.8],
        ])
          (bt.box(0.1, 1.5, 0.1, i.blackMetal, Et, 0.75, zt),
            bt.rod([Et, 0.1, zt], [-Et, 1.4, zt], 0.02, i.blackMetal, {
              seg: 4,
            }),
            bt.rod([Et, 0.1, zt], [Et, 1.4, -zt], 0.02, i.blackMetal, {
              seg: 4,
            }));
        bt.cyl(1.25, 2.3, i.woodDark, 0, 1.5, 0, {
          seg: 26,
        });
        for (let Et of [1.75, 2.5, 3.3, 3.7])
          bt.torus(1.262, 0.018, i.steel, 0, Et, 0, {
            rx: Math.PI / 2,
            seg: 26,
            rseg: 4,
          });
        (bt.add(new ConeGeometry(1.36, 0.75, 26), i.steel, 0, 4.175, 0),
          bt.sphere(0.08, i.steel, 0, 4.56, 0, {
            seg: 8,
            hseg: 6,
          }));
      } else {
        let bt = O(z0 - 1, Pt, 5.2),
          Et = 7.5;
        for (let [J, Q] of [
          [-0.3, -0.3],
          [0.3, -0.3],
          [0.3, 0.3],
          [-0.3, 0.3],
        ])
          bt.box(0.05, Et, 0.05, i.blackMetal, J, Et / 2, Q);
        for (let J = 0; J < Et - 0.1; J += 0.75)
          for (let Q = 0; Q < 4; Q++) {
            let i0 = [
                [-0.3, -0.3],
                [0.3, -0.3],
                [0.3, 0.3],
                [-0.3, 0.3],
              ][Q],
              A0 = [
                [-0.3, -0.3],
                [0.3, -0.3],
                [0.3, 0.3],
                [-0.3, 0.3],
              ][(Q + 1) % 4];
            (bt.rod(
              [i0[0], J, i0[1]],
              [A0[0], J + 0.75, A0[1]],
              0.012,
              i.blackMetal,
              {
                seg: 4,
              },
            ),
              bt.rod(
                [i0[0], J + 0.75, i0[1]],
                [A0[0], J + 0.75, A0[1]],
                0.012,
                i.blackMetal,
                {
                  seg: 4,
                },
              ));
          }
        for (let [J, Q, i0] of [
          [4.2, 0.3, 0.55],
          [5.6, 2.2, 0.4],
          [3, -1.6, 0.36],
        ]) {
          let A0 = Math.sin(Q) * 0.42,
            N0 = Math.cos(Q) * 0.42;
          (bt.lathe(
            [
              [0, 0],
              [i0 * 0.5, i0 * 0.07],
              [i0, i0 * 0.3],
              [i0 * 1.01, i0 * 0.31],
              [i0 * 0.5, i0 * 0.085],
              [0, 0.015],
            ],
            i.plasticWhite,
            A0,
            J,
            N0,
            {
              seg: 20,
              rx: Math.PI / 2 - 0.15,
              ry: Q,
              order: "YXZ",
            },
          ),
            bt.rod(
              [A0, J, N0],
              [
                A0 + Math.sin(Q) * i0 * 0.5,
                J + 0.05,
                N0 + Math.cos(Q) * i0 * 0.5,
              ],
              0.012,
              i.steel,
              {
                seg: 4,
              },
            ));
        }
        for (let J of [-0.25, 0.2])
          bt.rod([J, Et, 0], [J * 1.6, Et + 2.2, 0], 0.008, i.steel, {
            seg: 4,
          });
        (bt.cyl(0.07, 0.16, S, 0, Et + 0.02, 0, {
          seg: 10,
          shadow: !1,
        }),
          bt.cyl(0.09, 0.03, i.blackMetal, 0, Et, 0, {
            seg: 10,
          }));
        let zt = bt.pt(0, Et + 0.1, 0);
        C0(zt.x, zt.y, zt.z, 16722448, 3.2, 0.55, 0);
      }
    }
    {
      let tt = O(-20, 0, 10, 0),
        X0 = 3.95,
        ut = Ni + 1.1;
      for (let z0 of [-0.21, 0.21]) {
        tt.box(0.035, ut - X0, 0.02, i.blackMetal, z0, (X0 + ut) / 2, 0.17);
        for (let I0 = X0 + 0.5; I0 < Ni; I0 += 1.4)
          tt.rod([z0, I0, 0.17], [z0, I0, 0], 0.012, i.blackMetal, {
            seg: 4,
          });
      }
      for (let z0 = X0 + 0.15; z0 < ut - 0.9; z0 += 0.3)
        tt.rod([-0.21, z0, 0.17], [0.21, z0, 0.17], 0.011, i.steel, {
          seg: 6,
        });
      for (let z0 = X0 + 1.4; z0 < ut - 0.2; z0 += 0.85)
        tt.torus(0.36, 0.012, i.blackMetal, 0, z0, 0.17, {
          rx: Math.PI / 2,
          arc: Math.PI,
          seg: 14,
          rseg: 4,
        });
      for (let z0 = 0; z0 < 5; z0++) {
        let I0 = (z0 * Math.PI) / 4;
        tt.rod(
          [Math.cos(I0) * 0.36, X0 + 1.4, 0.17 + Math.sin(I0) * 0.36],
          [Math.cos(I0) * 0.36, ut - 0.25, 0.17 + Math.sin(I0) * 0.36],
          0.008,
          i.blackMetal,
          {
            seg: 4,
          },
        );
      }
    }
    let k0 = (tt, X0) => {
        let ut = createCanvas(512),
          z0 = createCanvas(512),
          I0 = ut.getContext("2d"),
          vt = z0.getContext("2d"),
          wt = createRandom(tt);
        ((I0.fillStyle = "#23262c"),
          I0.fillRect(0, 0, 512, 512),
          (vt.fillStyle = "#000"),
          vt.fillRect(0, 0, 512, 512));
        for (let Pt = 0; Pt < 8; Pt++)
          for (let bt = 0; bt < 8; bt++) {
            let Et = bt * 64,
              zt = Pt * 64,
              J = wt() < X0;
            if (
              ((I0.fillStyle = `rgb(${(22 + wt() * 14) | 0},${(32 + wt() * 16) | 0},${(50 + wt() * 22) | 0})`),
              I0.fillRect(Et + 5, zt + 16, 54, 36),
              (I0.fillStyle = "rgba(255,255,255,0.06)"),
              I0.fillRect(Et + 5, zt + 16, 54, 5),
              J)
            ) {
              let Q = wt() < 0.75;
              ((vt.fillStyle = Q
                ? `rgb(255,${(150 + wt() * 60) | 0},${(60 + wt() * 50) | 0})`
                : "rgb(170,215,255)"),
                (vt.globalAlpha = 0.45 + wt() * 0.55),
                vt.fillRect(Et + 6, zt + 17, 52, 34),
                (vt.globalAlpha = 1),
                (vt.fillStyle = "rgba(0,0,0,0.5)"),
                wt() < 0.6 && vt.fillRect(Et + 6, zt + 17, 52, 6 + wt() * 14),
                wt() < 0.4 && vt.fillRect(Et + 6 + wt() * 30, zt + 17, 3, 34));
            }
            ((I0.fillStyle = "#34373e"), I0.fillRect(Et, zt + 56, 64, 8));
          }
        let _t = (Pt) => {
          let bt = new CanvasTexture(Pt);
          return (
            (bt.wrapS = bt.wrapT = RepeatWrapping),
            bt.repeat.set(1 / 25.6, 1 / 28.8),
            (bt.colorSpace = SRGBColorSpace),
            (bt.anisotropy = 8),
            bt
          );
        };
        return d({
          map: _t(ut),
          emissiveMap: _t(z0),
          emissive: 16777215,
          emissiveIntensity: 1.5,
          roughness: 0.5,
          metalness: 0.15,
        });
      },
      O0 = k0(11, 0.2),
      B0 = k0(29, 0.3),
      ot = d({
        vertexColors: !0,
        roughness: 0.82,
        metalness: 0.04,
      });
    function Q0(tt) {
      ((tt.fog = !1),
        (tt.onBeforeCompile = (X0) => {
          ((X0.uniforms.uSunXZ = {
            value: new Vector2(SUN_DIRECTION.x, SUN_DIRECTION.z).normalize(),
          }),
            (X0.vertexShader = X0.vertexShader
              .replace(
                "#include <common>",
                `#include <common>
varying vec3 vHz;`,
              )
              .replace(
                "#include <project_vertex>",
                `#include <project_vertex>
vHz = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
              )),
            (X0.fragmentShader = X0.fragmentShader
              .replace(
                "#include <common>",
                `#include <common>
varying vec3 vHz;
uniform vec2 uSunXZ;`,
              )
              .replace(
                "#include <dithering_fragment>",
                `#include <dithering_fragment>
          { vec2 hd = vHz.xz - cameraPosition.xz; float hdist = length(hd);
            float haz = clamp(dot(hd / max(hdist, 1e-3), uSunXZ) * 0.5 + 0.5, 0.0, 1.0);
            vec3 hcol = mix(vec3(0.30, 0.21, 0.30), vec3(1.55, 0.70, 0.26), haz * haz) * 0.62;
            float hf = clamp(1.0 - exp(-hdist * 0.0034) + smoothstep(30.0, -170.0, vHz.y) * 0.5, 0.0, 1.0);
            gl_FragColor.rgb = mix(gl_FragColor.rgb, hcol, hf); }`,
              )));
        }),
        (tt.customProgramCacheKey = () => "gh-farhaze"));
    }
    let nt = new Map([
        [i.concrete, 9078657],
        [i.plasterDark, 3025965],
        [i.steel, 10133411],
        [i.blackMetal, 1776413],
        [i.woodDark, 4862756],
        [i.woodLight, 10120256],
        [y, 14701598],
        [i.plasticWhite, 14999766],
        [i.fabricCream, 14208438],
        [i.screenOff, 725280],
        [i.poolTile, 2787978],
        [b, 9433318],
        [i.marbleDark, 1578516],
        [i.onyx, 16752704],
        [i.lampShade, 16763018],
        [i.exterior, 3812386],
      ]),
      L0 = [],
      ht = new Map([
        [O0, []],
        [B0, []],
      ]),
      pt = new Color();
    function V0(tt, X0, ut) {
      let z0 = tt.index ? tt.toNonIndexed() : tt.clone();
      (ut && z0.applyMatrix4(ut),
        z0.attributes.normal || z0.computeVertexNormals());
      let I0 = ht.get(X0);
      for (let _t of Object.keys(z0.attributes))
        _t !== "position" &&
          _t !== "normal" &&
          !(I0 && _t === "uv") &&
          z0.deleteAttribute(_t);
      if (I0) {
        I0.push(z0);
        return;
      }
      pt.set(typeof X0 == "number" ? X0 : (nt.get(X0) ?? 8421504));
      let vt = z0.attributes.position.count,
        wt = new Float32Array(vt * 3);
      for (let _t = 0; _t < vt; _t++)
        ((wt[_t * 3] = pt.r), (wt[_t * 3 + 1] = pt.g), (wt[_t * 3 + 2] = pt.b));
      (z0.setAttribute("color", new BufferAttribute(wt, 3)), L0.push(z0));
    }
    let c0 = (tt, X0, ut, z0 = 0) => O(tt, X0, ut, z0, 1, V0),
      Z = -180,
      r0 = (tt, X0, ut) => {
        let z0 = new BoxGeometry(tt, X0, ut),
          I0 = z0.attributes.uv,
          vt = [
            [ut, X0],
            [ut, X0],
            [tt, ut],
            [tt, ut],
            [tt, X0],
            [tt, X0],
          ];
        for (let wt = 0; wt < 6; wt++)
          for (let _t = 0; _t < 4; _t++) {
            let Pt = wt * 4 + _t;
            I0.setXY(Pt, I0.getX(Pt) * vt[wt][0], I0.getY(Pt) * vt[wt][1]);
          }
        return z0;
      };
    function b0(tt, X0, ut, z0, I0, vt, wt) {
      let _t = c0(tt, I0, X0, vt);
      (_t.add(r0(ut, I0 - Z, z0), wt, 0, -(I0 - Z) / 2, 0),
        _t.box(ut + 0.3, 0.35, z0 + 0.3, i.plasterDark, 0, 0.1, 0));
      for (let [bt, Et, zt, J] of [
        [0, z0 / 2, ut + 0.5, 0.35],
        [0, -z0 / 2, ut + 0.5, 0.35],
        [ut / 2, 0, 0.35, z0],
        [-ut / 2, 0, 0.35, z0],
      ])
        (_t.box(zt, 1.1, J, i.concrete, bt, 0.75, Et),
          _t.box(zt + 0.12, 0.08, J + 0.12, i.steel, bt, 1.34, Et));
      let Pt = createRandom(Math.round(tt * 7 + X0 * 13));
      for (let bt = 0; bt < 6; bt++)
        _t.box(
          Pt.range(2.5, 6),
          0.06,
          Pt.range(2, 4),
          3815480,
          Pt.range(-ut / 2 + 4, ut / 2 - 4),
          0.3,
          Pt.range(-z0 / 2 + 3, z0 / 2 - 3),
        );
      for (let bt = 0; bt < 4; bt++) {
        let Et = Pt.range(-z0 / 2 + 2, z0 / 2 - 2),
          zt = Pt.range(-ut / 2 + 2, 0),
          J = Pt.range(1, ut / 2 - 2);
        _t.rod([zt, 0.5, Et], [J, 0.5, Et], 0.11, i.steel, {
          seg: 6,
        });
        for (let Q = zt + 1; Q < J; Q += 2.4)
          _t.box(0.3, 0.35, 0.3, i.blackMetal, Q, 0.36, Et);
      }
      for (let bt = 0; bt < 7; bt++) {
        let Et = Pt.range(-ut / 2 + 2, ut / 2 - 2),
          zt = Pt.range(-z0 / 2 + 2, z0 / 2 - 2);
        (_t.cyl(0.22, 0.7, i.steel, Et, 0.28, zt, {
          seg: 8,
        }),
          _t.add(new ConeGeometry(0.36, 0.25, 8), i.steel, Et, 1.12, zt));
      }
      for (let bt = 0; bt < 2; bt++)
        _t.box(
          1.1,
          0.3,
          1.1,
          i.steel,
          Pt.range(-ut / 2 + 3, ut / 2 - 3),
          0.42,
          Pt.range(-z0 / 2 + 3, z0 / 2 - 3),
        );
      return _t;
    }
    let d0 = (tt, X0, ut, z0, I0 = 0) => {
        for (let vt = 0; vt < z0; vt++) {
          let wt = X0 + Math.cos(I0) * vt * 2.6,
            _t = ut - Math.sin(I0) * vt * 2.6;
          (tt.box(2.1, 1.3, 1.5, i.steel, wt, 0.95, _t, {
            ry: I0,
            r: 0.05,
            seg: 1,
          }),
            tt.box(2.2, 0.16, 1.6, i.blackMetal, wt, 0.36, _t, {
              ry: I0,
            }));
          for (let Pt of [-0.52, 0.52])
            (tt.cyl(
              0.42,
              0.12,
              i.blackMetal,
              wt + Math.cos(I0) * Pt,
              1.6,
              _t - Math.sin(I0) * Pt,
              {
                seg: 14,
              },
            ),
              tt.add(
                new CircleGeometry(0.38, 14),
                789518,
                wt + Math.cos(I0) * Pt,
                1.725,
                _t - Math.sin(I0) * Pt,
                {
                  rx: -Math.PI / 2,
                },
              ),
              tt.box(
                0.76,
                0.02,
                0.05,
                i.steel,
                wt + Math.cos(I0) * Pt,
                1.73,
                _t - Math.sin(I0) * Pt,
                {
                  ry: 0.8,
                },
              ),
              tt.box(
                0.76,
                0.02,
                0.05,
                i.steel,
                wt + Math.cos(I0) * Pt,
                1.73,
                _t - Math.sin(I0) * Pt,
                {
                  ry: -0.8,
                },
              ));
          for (let Pt = 0; Pt < 6; Pt++)
            tt.box(
              1.8,
              0.03,
              0.04,
              i.blackMetal,
              wt,
              0.55 + Pt * 0.14,
              _t + 0.76,
              {
                ry: I0,
              },
            );
        }
      },
      V = (tt, X0, ut, z0, I0) => {
        for (let vt = 0; vt < 4; vt++) {
          let wt = (vt * Math.PI) / 2 + 0.78;
          (tt.box(
            0.16,
            2.2,
            0.16,
            i.blackMetal,
            X0 + Math.cos(wt) * z0 * 0.75,
            1.4,
            ut + Math.sin(wt) * z0 * 0.75,
          ),
            tt.rod(
              [
                X0 + Math.cos(wt) * z0 * 0.75,
                0.4,
                ut + Math.sin(wt) * z0 * 0.75,
              ],
              [
                X0 + Math.cos(wt + Math.PI / 2) * z0 * 0.75,
                2.4,
                ut + Math.sin(wt + Math.PI / 2) * z0 * 0.75,
              ],
              0.04,
              i.blackMetal,
              {
                seg: 4,
              },
            ));
        }
        (tt.cyl(z0, I0, i.woodDark, X0, 2.5, ut, {
          seg: 22,
        }),
          tt.add(
            new ConeGeometry(z0 * 1.08, z0 * 0.6, 22),
            i.steel,
            X0,
            2.5 + I0 + z0 * 0.3,
            ut,
          ));
        for (let vt of [0.15, 0.4, 0.65, 0.9])
          tt.torus(z0 + 0.02, 0.035, i.steel, X0, 2.5 + I0 * vt, ut, {
            rx: Math.PI / 2,
            seg: 22,
            rseg: 4,
          });
        tt.rod(
          [X0 + z0 + 0.1, 0.3, ut],
          [X0 + z0 + 0.1, 2.5 + I0, ut],
          0.03,
          i.steel,
          {
            seg: 4,
          },
        );
      },
      B = (tt, X0, ut, z0, I0, vt, wt, _t = !0) => {
        if (
          (tt.box(z0, vt, I0, i.concrete, X0, 0.28 + vt / 2, ut, {
            ry: wt,
          }),
          tt.box(
            z0 + 0.4,
            0.15,
            I0 + 0.4,
            i.plasterDark,
            X0,
            0.28 + vt + 0.07,
            ut,
            {
              ry: wt,
            },
          ),
          _t)
        ) {
          let Pt = tt.pt(
            X0 + Math.sin(wt) * (I0 / 2 + 0.05),
            1.3800000000000001,
            ut + Math.cos(wt) * (I0 / 2 + 0.05),
          );
          (tt.box(
            1,
            2.1,
            0.06,
            i.lampShade,
            X0 + Math.sin(wt) * (I0 / 2 + 0.01),
            0.28 + 1.05,
            ut + Math.cos(wt) * (I0 / 2 + 0.01),
            {
              ry: wt,
            },
          ),
            C0(Pt.x, Pt.y + 1.3, Pt.z, 16756832, 2.4),
            C0(Pt.x, Pt.y, Pt.z, 16763024, 1.6));
        }
      };
    {
      let tt = b0(60, 68, 34, 30, -30, 0.14, O0);
      (V(tt, -11, -9, 2.3, 3.4),
        V(tt, -5.5, -10, 1.9, 2.8),
        d0(tt, -14, 9.5, 4, 0),
        d0(tt, -14, 5.6, 4, 0),
        B(tt, 12, -9, 5, 4, 3.2, Math.PI));
      for (let X0 = 0; X0 < 4; X0++)
        for (let ut = 0; ut < 6; ut++)
          (tt.box(
            1.9,
            0.05,
            1.1,
            i.screenOff,
            1 + ut * 2.1,
            1.05,
            9.8 - X0 * 2.3,
            {
              rx: -0.42,
            },
          ),
            tt.box(
              1.96,
              0.03,
              1.16,
              i.steel,
              1 + ut * 2.1,
              1.03,
              9.8 - X0 * 2.3,
              {
                rx: -0.42,
              },
            ),
            tt.box(
              0.06,
              0.8,
              0.06,
              i.steel,
              1 + ut * 2.1,
              0.6,
              10.2 - X0 * 2.3,
            ));
      for (let [X0, ut] of [
        [-17, -15],
        [17, -15],
        [17, 15],
        [-17, 15],
      ]) {
        let z0 = tt.pt(X0, 1.5, ut);
        C0(z0.x, z0.y, z0.z, 16726552, 2, 0.4, X0 * 0.1);
      }
    }
    {
      let tt = b0(-44, 62, 28, 32, -42, -0.1, B0);
      tt.box(22, 0.12, 12, i.woodLight, 1, 0.34, 6);
      for (let X0 = 0; X0 < 22; X0++)
        tt.box(0.04, 0.125, 12, 5913634, -9.5 + X0, 0.34, 6);
      (tt.box(9, 0.5, 4, i.poolTile, -5, 0.4, -7),
        tt.box(8.4, 0.02, 3.4, b, -5, 0.655, -7));
      for (let X0 = 0; X0 < 4; X0++)
        (tt.box(0.7, 0.3, 1.9, i.fabricCream, -9 + X0 * 2.2, 0.5, -3.4),
          tt.box(0.7, 0.3, 0.5, i.fabricCream, -9 + X0 * 2.2, 0.75, -2.7, {
            rx: 0.5,
          }));
      (tt.box(7, 1.1, 0.8, i.marbleDark, 6, 0.95, 11.2),
        tt.box(7.2, 0.06, 1, i.woodLight, 6, 1.52, 11.2),
        tt.box(7, 2.4, 0.3, i.onyx, 6, 1.6, 12.2));
      for (let X0 = 0; X0 < 6; X0++)
        (tt.cyl(0.18, 0.05, i.blackMetal, 3.2 + X0 * 1.1, 1.1, 10.3, {
          seg: 8,
        }),
          tt.cyl(0.03, 0.8, i.steel, 3.2 + X0 * 1.1, 0.34, 10.3, {
            seg: 5,
          }));
      for (let [X0, ut] of [
        [2, 3],
        [6, 2.2],
        [10, 3.4],
        [-1, 7],
        [4, 7.4],
        [9, 7],
      ]) {
        (tt.cyl(0.45, 0.06, i.woodDark, X0, 1.1, ut, {
          seg: 12,
        }),
          tt.cyl(0.05, 0.7, i.blackMetal, X0, 0.4, ut, {
            seg: 6,
          }));
        for (let z0 = 0; z0 < 3; z0++) {
          let I0 = z0 * 2.1 + X0;
          tt.box(
            0.4,
            0.45,
            0.4,
            i.fabricCream,
            X0 + Math.cos(I0) * 0.85,
            0.62,
            ut + Math.sin(I0) * 0.85,
            {
              ry: -I0,
            },
          );
        }
        (X0 + ut) % 3 > 1 &&
          (tt.cyl(0.04, 2.3, i.steel, X0 + 0.7, 0.4, ut, {
            seg: 6,
          }),
          tt.add(
            new ConeGeometry(1.5, 0.5, 8),
            i.fabricCream,
            X0 + 0.7,
            2.85,
            ut,
          ));
      }
      for (let [X0, ut] of [
        [-4, 2],
        [12, 2],
        [12, 10],
        [-4, 10],
      ])
        tt.box(0.14, 2.9, 0.14, i.blackMetal, X0, 1.75, ut);
      for (let X0 of [2, 10])
        tt.box(16.2, 0.12, 0.12, i.blackMetal, 4, 3.2, X0);
      for (let X0 of [-4, 12]) tt.box(0.12, 0.12, 8, i.blackMetal, X0, 3.2, 6);
      for (let X0 = 0; X0 < 6; X0++) {
        let ut = 2 + X0 * 1.6;
        for (let z0 = 0; z0 <= 12; z0++) {
          let I0 = z0 / 12,
            vt = tt.pt(-4 + 16 * I0, 3.1 - 0.5 * 4 * I0 * (1 - I0), ut);
          C0(vt.x, vt.y, vt.z, 16756832, 1.25);
        }
      }
      for (let X0 = 0; X0 < 8; X0++) {
        let ut = tt.pt(2.6 + X0, 2, 11.9);
        C0(ut.x, ut.y, ut.z, 16747068, 1.9);
      }
      for (let X0 = 0; X0 < 6; X0++) {
        let ut = tt.pt(-8.4 + (X0 % 3) * 3.4, 0.9, -8 + Math.floor(X0 / 3) * 2);
        C0(ut.x, ut.y, ut.z, 6356968, 2);
      }
      B(tt, -10, 11, 4, 4, 3, 0);
    }
    {
      let tt = b0(8, 108, 46, 30, -58, 0.05, O0);
      (tt.cyl(10.5, 1.3, i.concrete, -6, 0.28, 1, {
        seg: 8,
      }),
        tt.cyl(11.1, 0.12, i.steel, -6, 1.52, 1, {
          seg: 8,
        }),
        tt.add(
          new CylinderGeometry(10.2, 10.2, 0.02, 8),
          3099194,
          -6,
          1.655,
          1,
        ),
        tt.add(new RingGeometry(7.6, 8.4, 40), 14856234, -6, 1.68, 1, {
          rx: -Math.PI / 2,
        }),
        tt.box(1.2, 0.02, 7.4, 15722970, -8.3, 1.69, 1),
        tt.box(1.2, 0.02, 7.4, 15722970, -3.7, 1.69, 1),
        tt.box(4.6, 0.02, 1.2, 15722970, -6, 1.69, 1));
      for (let X0 = 0; X0 < 8; X0++) {
        let ut = (X0 * TAU) / 8 + 0.39;
        (tt.rod(
          [-6 + Math.cos(ut) * 9.6, 0.3, 1 + Math.sin(ut) * 9.6],
          [-6 + Math.cos(ut) * 9.6, 1.5, 1 + Math.sin(ut) * 9.6],
          0.2,
          i.steel,
          {
            seg: 6,
          },
        ),
          tt.rod(
            [-6 + Math.cos(ut) * 11.1, 1.58, 1 + Math.sin(ut) * 11.1],
            [-6 + Math.cos(ut) * 12.6, 1.2, 1 + Math.sin(ut) * 12.6],
            0.04,
            i.steel,
            {
              seg: 4,
            },
          ));
      }
      tt.torus(12.6, 0.05, i.steel, -6, 1.2, 1, {
        rx: Math.PI / 2,
        seg: 8,
        rseg: 4,
      });
      for (let X0 = 0; X0 < 16; X0++) {
        let ut = (X0 * TAU) / 16,
          z0 = tt.pt(-6 + Math.cos(ut) * 10.7, 1.8, 1 + Math.sin(ut) * 10.7);
        C0(z0.x, z0.y, z0.z, X0 % 2 ? 4259738 : 16769162, 1.5);
      }
      (tt.box(1.4, 0.3, 4.5, i.steel, 6.2, 1.2, 1, {
        rz: -0.25,
      }),
        d0(tt, 10, -9, 4, 0),
        B(tt, 17, 8, 6, 5, 3.4, -Math.PI / 2),
        V(tt, 18, -1, 2, 3),
        tt.box(0.1, 4.2, 0.1, i.steel, 9, 2.4, 10),
        tt.add(new ConeGeometry(0.28, 1.5, 8, 1, !0), y, 9.8, 4.4, 10, {
          rz: -Math.PI / 2,
        }));
    }
    {
      let tt = b0(-92, 72, 30, 30, -31, 0.2, B0);
      for (let zt = 0; zt < 6; zt++) {
        let J = 0.3 + zt * 3.8;
        tt.box(29, 0.35, 29, i.concrete, 0, J + 3.6, 0);
        for (let Q = 0; Q < 4; Q++)
          for (let i0 = 0; i0 < 4; i0++)
            tt.box(
              0.7,
              3.5,
              0.7,
              i.concrete,
              -12 + Q * 8,
              J + 1.75,
              -12 + i0 * 8,
            );
        zt < 5 &&
          (tt.box(29.4, 1.1, 0.06, y, 0, J + 0.9, 14.6),
          tt.box(0.06, 1.1, 29.4, y, 14.6, J + 0.9, 0),
          tt.box(29.4, 1.1, 0.06, y, 0, J + 0.9, -14.6));
      }
      tt.box(7, 26, 7, i.concrete, -4, 13.3, -3);
      for (let zt = 0; zt < 5; zt++) {
        let J = tt.pt(-13 + zt * 6.5, 21, 14.7);
        C0(J.x, J.y, J.z, 16773328, 1.6);
      }
      let X0 = c0(-73.5, 0, 88, -0.55),
        ut = -64,
        z0 = 44,
        I0 = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ];
      for (let [zt, J] of I0)
        X0.box(0.2, z0 - ut, 0.2, 9071134, zt, (z0 + ut) / 2, J);
      let vt = 11042847,
        wt = (zt, J, Q = 0.05, i0 = vt) =>
          X0.rod(zt, J, Q, i0, {
            seg: 4,
          });
      for (let zt = ut; zt < z0 - 0.1; zt += 3)
        for (let J = 0; J < 4; J++) {
          let Q = I0[J],
            i0 = I0[(J + 1) % 4];
          (wt([Q[0], zt, Q[1]], [i0[0], zt + 3, i0[1]]),
            wt([Q[0], zt + 3, Q[1]], [i0[0], zt + 3, i0[1]]));
        }
      (X0.box(3.2, 1, 3.2, i.blackMetal, 0, z0 + 0.5, 0),
        X0.box(1.6, 2.2, 1.9, i.plasticWhite, 1.9, z0 + 2, 0.9),
        X0.box(1.5, 0.9, 0.05, i.screenOff, 2.3, z0 + 2.4, 1.87));
      let _t = 46,
        Pt = 15,
        bt = z0 + 1.3;
      for (let zt = 0; zt < _t - 0.1; zt += 2.3) {
        let J = Math.min(_t, zt + 2.3);
        (wt([zt, bt, -0.7], [J, bt, -0.7], 0.07),
          wt([zt, bt, 0.7], [J, bt, 0.7], 0.07),
          wt([zt, bt + 1.5, 0], [J, bt + 1.5, 0], 0.07),
          wt([zt, bt, -0.7], [zt + 1.15, bt + 1.5, 0]),
          wt([zt + 1.15, bt + 1.5, 0], [J, bt, -0.7]),
          wt([zt, bt, 0.7], [zt + 1.15, bt + 1.5, 0]),
          wt([zt + 1.15, bt + 1.5, 0], [J, bt, 0.7]),
          wt([zt, bt, -0.7], [J, bt, 0.7], 0.035));
      }
      for (let zt = 0; zt > -Pt + 0.1; zt -= 2.5)
        (wt([zt, bt, -0.7], [zt - 2.5, bt, -0.7], 0.07),
          wt([zt, bt, 0.7], [zt - 2.5, bt, 0.7], 0.07),
          wt([zt, bt, -0.7], [zt - 2.5, bt, 0.7], 0.035),
          wt([zt, bt, 0.7], [zt - 2.5, bt, -0.7], 0.035));
      (X0.box(3.4, 2.4, 1.9, i.concrete, -Pt + 1.7, bt - 0.5, 0),
        wt([0, bt, 0], [0, bt + 8.5, 0], 0.12),
        wt([0.9, bt, 0], [0, bt + 8.5, 0], 0.08),
        wt([-0.9, bt, 0], [0, bt + 8.5, 0], 0.08),
        wt([0, bt + 8.5, 0], [_t * 0.62, bt + 1.5, 0], 0.03, 1776413),
        wt([0, bt + 8.5, 0], [_t * 0.3, bt + 1.5, 0], 0.03, 1776413),
        wt([0, bt + 8.5, 0], [-Pt + 1.5, bt, 0], 0.03, 1776413));
      let Et = _t * 0.55;
      (X0.box(1.6, 0.4, 1.3, i.blackMetal, Et, bt - 0.3, 0),
        wt([Et, bt - 0.4, 0], [Et, bt - 26, 0], 0.02, 1776413),
        X0.box(0.5, 0.9, 0.3, y, Et, bt - 26.4, 0));
      for (let [zt, J, Q, i0, A0] of [
        [_t, bt + 0.6, 0, 16722448, 0.5],
        [_t * 0.5, bt + 1.7, 0, 16722448, 0],
        [0, bt + 8.7, 0, 16722448, 0.5],
        [-Pt, bt + 0.9, 0, 16722448, 0],
        [2.4, z0 + 3.3, 1.9, 16773328, 0],
        [1, (z0 + ut) / 2 + 20, 1, 16722448, 0],
      ]) {
        let N0 = X0.pt(zt, J, Q);
        C0(N0.x, N0.y, N0.z, i0, i0 === 16773328 ? 2.6 : 3, A0, zt * 0.03);
      }
    }
    {
      let ut = Math.atan2(-104, -106),
        z0 = b0(104, 122, 34, 20, 46, ut, O0);
      (z0.box(30, 4, 14, i.exterior, 0, 2.6, 0),
        z0.box(0.3, 9, 0.3, i.steel, 9, 9, 0),
        z0.box(0.3, 6, 0.3, i.steel, -8, 7.5, 2));
      let I0 = z0.pt(9, 13.6, 0),
        vt = z0.pt(-8, 10.6, 2);
      (C0(I0.x, I0.y, I0.z, 16722448, 3.4, 0.5, 0.3),
        C0(vt.x, vt.y, vt.z, 16722448, 3, 0.5, 0.8),
        z0.box(29.2, 15.6, 0.5, i.blackMetal, 0, -17, 10.3));
      for (let _t = 0; _t < 5; _t++)
        z0.box(0.25, 15.6, 0.7, i.steel, -14 + _t * 7, -17, 10.2);
      let wt = new Mesh(
        new PlaneGeometry(28, 14.4),
        new ShaderMaterial({
          fog: !1,
          uniforms: {
            uTime: {
              value: 0,
            },
            uHaze: {
              value: new Color(0.42, 0.26, 0.22),
            },
          },
          vertexShader:
            "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
          fragmentShader: `
          uniform float uTime; uniform vec3 uHaze; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.07;
            vec3 orange = vec3(1.0, 0.40, 0.07), teal = vec3(0.04, 0.72, 0.70), cream = vec3(1.0, 0.86, 0.62), ink = vec3(0.02, 0.05, 0.08);
            float sw = smoothstep(0.25, 0.75, uv.x + 0.22 * sin(t * 2.3 + uv.y * 2.6));
            vec3 col = mix(teal * 0.55, orange * 0.75, sw);
            float bars = smoothstep(0.80, 0.86, sin((uv.x * 1.3 + uv.y * 0.55 - t * 1.6) * 6.2832) * 0.5 + 0.5);
            col = mix(col, cream, bars * 0.35);
            vec2 p = (uv - vec2(0.5 + 0.24 * sin(t * 1.3), 0.50)) * vec2(1.944, 1.0);
            float d = length(p);
            float disc = smoothstep(0.31, 0.30, d);
            float cut = step(0.0, -p.y) * step(0.45, fract((p.y - t * 0.35) * 13.0));
            col = mix(col, cream, disc * (1.0 - cut));
            col = mix(col, ink, smoothstep(0.012, 0.0, abs(d - 0.36)) * 0.5);
            float strip = step(uv.y, 0.12);
            float tick = step(0.5, fract(uv.x * 18.0 - t * 5.0)) * step(0.3, fract(floor(uv.x * 18.0 - t * 5.0) * 0.37));
            col = mix(col, mix(ink, cream, tick * step(0.03, uv.y) * step(uv.y, 0.09)), strip);
            col = mix(col * 1.7, uHaze, 0.32);
            gl_FragColor = vec4(col, 1.0);
          }`,
        }),
      );
      (wt.position.copy(z0.pt(0, -17, 10.62)),
        (wt.rotation.y = ut),
        (wt.frustumCulled = !1),
        e.add(wt),
        t.update.push((_t) => {
          wt.material.uniforms.uTime.value += _t;
        }));
    }
    {
      (Q0(ot), Q0(O0), Q0(B0));
      let tt = new Mesh(Vn(L0, !1), ot);
      ((tt.frustumCulled = !1), (tt.matrixAutoUpdate = !1), e.add(tt));
      for (let [X0, ut] of ht) {
        if (!ut.length) continue;
        let z0 = new Mesh(Vn(ut, !1), X0);
        ((z0.frustumCulled = !1), (z0.matrixAutoUpdate = !1), e.add(z0));
      }
    }
    let j = 6,
      s0 = x0.length / 9;
    (C0(0, 0, 0, 16777215, 4, 1.1, 0),
      C0(0, 0, 0, 16722448, 2.4),
      C0(0, 0, 0, 3211120, 2.4));
    let l0 = x0.length / 9;
    (C0(0, 0, 0, 16722448, 2.8, 0.9, 0.2),
      C0(0, 0, 0, 16777215, 2.2),
      C0(0, 0, 0, 16777215, 0.001));
    let E0 = x0.length / 9,
      U = new BufferGeometry(),
      X = new Float32Array(E0 * 3),
      N = new Float32Array(E0 * 3),
      q = new Float32Array(E0 * 3);
    for (let tt = 0; tt < E0; tt++)
      (X.set(x0.slice(tt * 9, tt * 9 + 3), tt * 3),
        N.set(x0.slice(tt * 9 + 3, tt * 9 + 6), tt * 3),
        q.set(x0.slice(tt * 9 + 6, tt * 9 + 9), tt * 3));
    (U.setAttribute(
      "position",
      new BufferAttribute(X, 3).setUsage(DynamicDrawUsage),
    ),
      U.setAttribute("aCol", new BufferAttribute(N, 3)),
      U.setAttribute("aDat", new BufferAttribute(q, 3)));
    let o0 = new ShaderMaterial({
        transparent: !0,
        depthWrite: !1,
        fog: !1,
        blending: AdditiveBlending,
        uniforms: {
          uTime: {
            value: 0,
          },
          uScale: {
            value: 900,
          },
        },
        vertexShader: `attribute vec3 aCol; attribute vec3 aDat; uniform float uTime, uScale; varying vec4 vCol;
        void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
          float d = max(1.0, -mv.z);
          gl_PointSize = clamp(uScale * 0.26 * aDat.x / d, 2.2 * min(aDat.x, 1.6), 22.0);
          float on = aDat.y > 0.0 ? smoothstep(0.82, 0.9, sin((uTime * aDat.y + aDat.z) * 6.2832) * 0.5 + 0.5) : 1.0;
          vCol = vec4(aCol * 2.6, on * exp(-d * 0.0007)); }`,
        fragmentShader:
          "varying vec4 vCol; void main() { vec2 c = gl_PointCoord - 0.5; float r = length(c) * 2.0; float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vCol.rgb * (a * a + 0.6 * smoothstep(0.35, 0.0, r)), vCol.a); }",
      }),
      h0 = new Points(U, o0);
    ((h0.frustumCulled = !1), (h0.renderOrder = 6), e.add(h0));
    let y0 = new MeshBasicMaterial({
        color: 2365980,
        fog: !1,
        side: DoubleSide,
      }),
      D = new Group();
    {
      let tt = new Mesh(
        Vn(
          [
            new CylinderGeometry(2, 2, 38, 8).rotateZ(Math.PI / 2),
            new BoxGeometry(5.5, 0.5, 34).translate(1, -0.4, 0),
            new BoxGeometry(3, 0.4, 13).translate(-17, 0.4, 0),
            new BoxGeometry(4, 6, 0.4).translate(-17, 3.2, 0),
          ].map((vt) => {
            let wt = vt.toNonIndexed();
            return (wt.deleteAttribute("uv"), wt);
          }),
          !1,
        ),
        y0,
      );
      D.add(tt);
      let X0 = new PlaneGeometry(1, 1, 12, 1),
        ut = X0.attributes.position,
        z0 = new Float32Array(ut.count * 4);
      for (let vt = 0; vt < ut.count; vt++) {
        let wt = ut.getX(vt) + 0.5,
          _t = ut.getY(vt);
        ut.setXYZ(vt, -20 - wt * 520, -0.5, _t * (4 + wt * 26));
        let Pt = (1 - wt) * (1 - wt) * 0.5 * q0(wt * 14);
        z0.set([1, 0.62, 0.42, Pt], vt * 4);
      }
      X0.setAttribute("color", new BufferAttribute(z0, 4));
      let I0 = new Mesh(
        X0,
        new MeshBasicMaterial({
          vertexColors: !0,
          transparent: !0,
          depthWrite: !1,
          fog: !1,
          side: DoubleSide,
          blending: AdditiveBlending,
        }),
      );
      ((I0.frustumCulled = !1), D.add(I0));
    }
    (D.traverse((tt) => {
      tt.frustumCulled = !1;
    }),
      e.add(D));
    let W = new Mesh(
      Vn(
        [
          new SphereGeometry(1.6, 8, 6).scale(1.5, 1, 1),
          new BoxGeometry(6.5, 0.35, 0.35).translate(-4.4, 0.4, 0),
          new BoxGeometry(0.2, 1.8, 0.25).translate(-7.4, 1, 0),
          new BoxGeometry(10.6, 0.06, 0.34).translate(0.2, 1.75, 0),
          new BoxGeometry(0.34, 0.06, 10.6).translate(0.2, 1.75, 0),
        ].map((tt) => {
          let X0 = tt.toNonIndexed();
          return (X0.deleteAttribute("uv"), X0);
        }),
        !1,
      ),
      y0,
    );
    ((W.frustumCulled = !1), e.add(W));
    let Y = 13,
      R0 = new BufferGeometry(),
      U0 = new Float32Array(Y * 18);
    R0.setAttribute(
      "position",
      new BufferAttribute(U0, 3).setUsage(DynamicDrawUsage),
    );
    let $0 = new Mesh(R0, y0);
    (($0.frustumCulled = !1), e.add($0));
    let g0 = [];
    for (let tt = 0; tt < Y; tt++)
      g0.push([
        u() * TAU,
        u.range(0.7, 1.3),
        u.range(-6, 6),
        u.range(-5, 5),
        u() * TAU,
      ]);
    let G0 = 40,
      K0 = In(-1500, 380, 950),
      it = In(1500, 520, 600),
      ft = In().subVectors(it, K0).normalize(),
      gt = In(),
      rt = In().crossVectors(ft, Aw).normalize(),
      dt = (tt, X0, ut, z0) => {
        ((X[tt * 3] = X0), (X[tt * 3 + 1] = ut), (X[tt * 3 + 2] = z0));
      };
    t.update.push((tt) => {
      ((G0 += tt),
        (o0.uniforms.uTime.value = G0),
        (o0.uniforms.uScale.value = innerHeight));
      let X0 = (G0 % 150) / 150;
      (gt.lerpVectors(K0, it, X0),
        D.position.copy(gt),
        D.rotation.set(0, Math.atan2(-ft.z, ft.x), 0),
        dt(s0, gt.x, gt.y - 2.5, gt.z),
        dt(s0 + 1, gt.x - rt.x * 17, gt.y, gt.z - rt.z * 17),
        dt(s0 + 2, gt.x + rt.x * 17, gt.y, gt.z + rt.z * 17));
      let ut = G0 * 0.045,
        z0 = 330 + Math.cos(ut) * 190,
        I0 = 260 + Math.sin(ut) * 150,
        vt = 70 + Math.sin(G0 * 0.21) * 8;
      (W.position.set(z0, vt, I0),
        (W.rotation.y = -ut - Math.PI / 2),
        dt(l0, z0, vt - 1.6, I0),
        dt(l0 + 1, z0 - Math.sin(ut) * 7, vt + 1, I0 + Math.cos(ut) * 7),
        (U.attributes.position.needsUpdate = !0));
      let wt = -64,
        _t = 30,
        Pt = 110;
      for (let bt = 0; bt < Y; bt++) {
        let Et = g0[bt],
          zt = G0 * 0.11 * Et[1] + Et[0],
          J = 30 + Et[2] * 2.2 + Math.sin(G0 * 0.07 + Et[4]) * 6,
          Q = wt + Math.cos(zt) * J,
          i0 = Pt + Math.sin(zt) * J * 0.8,
          A0 = _t + Et[3] * 1.6 + Math.sin(G0 * 0.23 + Et[4]) * 2.5,
          N0 = -Math.sin(zt),
          mt = Math.cos(zt) * 0.8,
          xt = Math.hypot(N0, mt),
          yt = N0 / xt,
          Mt = mt / xt,
          St = Mt,
          Rt = -yt,
          Ot = Math.sin(G0 * (5.5 + Et[1] * 2) + Et[4]),
          Jt = Math.sin(G0 * 0.35 + Et[4]) > 0.2 ? 0.25 : 1,
          ee = Ot * 0.55 * Jt + 0.12,
          Nt = 1.05,
          ge = bt * 18;
        U0.set(
          [
            Q + yt * 0.45,
            A0,
            i0 + Mt * 0.45,
            Q - yt * 0.35,
            A0,
            i0 - Mt * 0.35,
            Q - St * Nt - yt * 0.1,
            A0 + ee,
            i0 - Rt * Nt - Mt * 0.1,
            Q + yt * 0.45,
            A0,
            i0 + Mt * 0.45,
            Q + St * Nt - yt * 0.1,
            A0 + ee,
            i0 + Rt * Nt - Mt * 0.1,
            Q - yt * 0.35,
            A0,
            i0 - Mt * 0.35,
          ],
          ge,
        );
      }
      R0.attributes.position.needsUpdate = !0;
    });
  }
  function q0(v0) {
    let x0 = Math.min(1, Math.max(0, v0));
    return x0 * x0 * (3 - 2 * x0);
  }
}

export { dressHotelDetails };

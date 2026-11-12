// weapons/models/smg.js: recovered from the verified GOLDEN HOUR release.
import {
  Bt,
  Du,
  Gt,
  Iu,
  Kr,
  QH,
  Qe,
  Sc,
  T5,
  Wn,
  Ze,
  Zn,
  Zs,
  ao,
  b2,
  bh,
  ds,
  eT,
  fa,
  ff,
  jc,
  m4,
  ml,
  ni,
  sT,
  se,
  si,
  tT,
  us,
  x2,
  x4,
  xh,
  xy,
} from "./geometry.js";
import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DataTexture,
  Euler,
  Float32BufferAttribute,
  Group,
  LatheGeometry,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  TorusGeometry,
  UnsignedByteType,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";
import { Vn } from "../../vendor/geometry-utils.js";
import { Mp, Ou, Rc, gf, wp } from "./shared.js";
import { createCanvas, createNoise, createRandom } from "../../core/math.js";
import { xl } from "./camos.js";
import {
  Mn,
  Qa,
  Tc,
  Ui,
  Yo,
  gs,
  hf,
  pn,
  xp,
  yi,
  yo,
  zi,
} from "../../player/rig.js";
import { Do, Gs, Mf, PO, Xs, be, jt, vi, ye } from "./carbine.js";

var Cs = 0.036;
var vo = 0.0585;
var ii = 0.011;
var Mo = 0.019;
var Iy = 0.016;
var Ml = 0.0505;
var sr = Ml + Mo;
var Ac = 0.0865;
var Pa = -0.031;
var M2 = 0.172;
var I5 = 0.305;
var Tr = 0.0205;
var zO = 0.0028;
var F1 = 0.292;
var kc = 150;
var mk = 0.08;
var gk = Ze(-34);
var i1 = 0.066;
var wf = 0.12;
var I1 = 0.03;
var a1 = 0.053;
var H5 = -0.008;
var s00 = 0.046;
var Sr = 0.1165;
var Hy = 1.35;
var Cp = -0.022;
var za = 0.034;
var nr = 0.0212;
var Dy = 0.012;
var NO = -0.034;
var Pp = {
  std: -0.158,
  ext: -0.218,
  fast: -0.158,
};
var Hn = 0.083;
var Rp = 0.3525;
var Vu = Cs - Tr - 0.007;
var BO = {
  vgrip: 0.226,
  laser: 0.288,
};
var H1 = (o) => o.map((t) => [t[0], t[1]]);
var RT = (o, t, e, s, n, i) =>
  Array.from(
    {
      length: i + 1,
    },
    (a, r) => {
      let l = Ze(s + ((n - s) * r) / i);
      return [o + Math.cos(l) * e, t + Math.sin(l) * e];
    },
  );
var UO = (o = 12) => [
  [-Mo, Iy, 0.003],
  [Mo, Iy, 0.003],
  ...RT(0, Ml, Mo, 0, 180, o),
];
var n00 = () => [
  [-Mo, Iy, 0.003],
  [Mo, Iy, 0.003],
  [Mo, I1],
  [H5, I1],
  [H5, a1],
  [Math.sqrt(Mo * Mo - (a1 - Ml) ** 2), a1],
  ...RT(0, Ml, Mo, 9, 180, 19),
];
var VO = [
  [0.04, -0.01],
  [0.0405, -0.022, 0.003],
  [0.033, -0.036, 0.006],
  [0.011, -0.104, 0.008],
  [-0.04, -0.1, 0.01],
  [-0.016, -0.034, 0.03],
  [-0.005, -0.004, 0.008],
  [-0.018, 0.004, 0.003],
  [-0.016, 0.009],
  [0.03, -0.006],
];
var GO = [
  [-0.058, 0.018, 0.002],
  [0.0925, 0.018],
  [0.0925, -0.012, 0.002],
  [0.04, -0.012],
  [0.034, -0.007],
  [-0.004, -0.007],
  [-0.018, 0.004, 0.006],
  [-0.058, 0.013, 0.004],
];
var WO = Sc(
  [
    [0.037, -0.028],
    [0.046, -0.0425],
    [0.074, -0.0445],
    [0.0885, -0.038],
    [0.0905, -0.01],
  ],
  0.0036,
);
var qO = Sc(
  [
    [0.0665, -0.011],
    [0.0642, -0.018],
    [0.0628, -0.025],
    [0.063, -0.031],
    [0.0652, -0.0365],
  ],
  0.0042,
);
var KO = [
  [0.0955, 0.018],
  [0.1375, 0.018],
  [0.1392, -0.03, 0.002],
  [0.0965, -0.0345, 0.002],
];
var o00 = [
  [0.0955, 0.018],
  [0.1375, 0.018],
  [0.1392, -0.03, 0.002],
  [0.1347, -0.0305],
  [0.1347, 0.0125],
  [0.0983, 0.0125],
  [0.0983, -0.0343],
  [0.0965, -0.0345, 0.002],
];
var dk = [
  [0.0955, 0.018],
  [0.1375, 0.018],
  [0.138, -0.013, 0.003],
  [0.0958, -0.016, 0.003],
];
var XO = [
  [0.094, -0.0345],
  [0.0975, -0.0345],
  [0.0978, -0.05],
  [0.0966, -0.06, 0.002],
  [0.0936, -0.068, 0.002],
  [0.0884, -0.0698, 0.0015],
  [0.0876, -0.0668, 0.0015],
  [0.0922, -0.0605, 0.002],
  [0.0938, -0.05],
];
var LO = [
  [-0.168, 0.066, 0.006],
  [-0.181, 0.062, 0.006],
  [-0.183, -0.046, 0.008],
  [-0.17, -0.052, 0.006],
  [-0.1635, -0.02, 0.012],
  [-0.1635, 0.04, 0.012],
];
var DO = [
  [-0.0745, 0.062],
  [-0.186, 0.066, 0.008],
  [-0.191, -0.03, 0.008],
  [-0.18, -0.036, 0.004],
  [-0.0745, 0.026],
];
var i00 = [
  [-0.084, 0.055],
  [-0.179, 0.0585, 0.005],
  [-0.183, -0.022, 0.005],
  [-0.178, -0.026, 0.003],
  [-0.084, 0.034],
];
var zp = (o) => Sr + Hy * Math.max(0, Cp - o) ** 2;
function xk(o, t = Dy, e = 0.012) {
  let s = t > Cp ? [[Sr, t]] : [];
  for (let n = Math.min(Cp, t); n > o + 0.004; n -= e) s.push([zp(n), n]);
  return (s.push([zp(o), o]), s);
}
var a00 = (o) => Sc(xk(Pp[o] ?? Pp.std), za);
function AT(o) {
  let t = Pp[o] ?? Pp.std,
    e = 2 * Hy * (Cp - t),
    s = Math.hypot(e, 1);
  return {
    o: [zp(t), t],
    t: [e / s, -1 / s],
    n: [1 / s, e / s],
  };
}
var r00 = (o) => {
  let t = AT(o),
    e = [t.o[0] - t.t[0] * 0.001, t.o[1] - t.t[1] * 0.001],
    s = [t.o[0] + t.t[0] * 0.0042, t.o[1] + t.t[1] * 0.0042];
  return Sc([e, s], za + 0.0052);
};
var kp = {
  r: 0.0026,
  d: 0.0011,
  w: 0.0023,
  c: 0.0082,
  wall: 9e-4,
  seam: -0.0052,
};
var _T = (o, t, e) => {
  let s = Math.min(1, Math.max(0, (e - o) / (t - o)));
  return s * s * (3 - 2 * s);
};
function w2(o, t, e, s = new Vector3()) {
  let n = 2 * Hy * Math.max(0, Cp - e),
    i = Math.hypot(n, 1);
  return s.set(o, e + (t * n) / i, -(zp(e) + t / i));
}
var F5 = (o) => Math.atan(2 * Hy * Math.max(0, Cp - o));
function IO(o, t) {
  let e = nr / 2,
    s = za / 2,
    n = kp.r,
    i = [],
    a = (l, c, h, f) => {
      for (let u of [1, 2]) {
        let d = Ze(h + f * 30 * u);
        i.push([l + Math.cos(d) * n, c + Math.sin(d) * n, 2]);
      }
    },
    r = () => {
      let l = [[s - n, 0, 2]];
      for (let c of [kp.c, -kp.c]) {
        for (let [h, f, u] of [
          [1.4, 0, 1],
          [1, 0.05, 2],
          [0.55, 0.82, 1],
          [0, 1, 1],
          [-0.55, 0.82, 1],
          [-1, 0.05, 2],
          [-1.4, 0, 1],
        ])
          l.push([c + h * kp.w, f * o * kp.d, o > 0.5 ? u : 1]);
        c > 0 && l.push([0, 0, 1]);
      }
      return (l.push([-(s - n), 0, 2]), l);
    };
  for (let [l, c, h] of r()) i.push([e - c, l, h]);
  (a(e - n, -s + n, 0, -1), i.push([e - n, -s, 2]));
  for (let [l, c, h] of [
    [0.0017, 0, 1],
    [8e-4, 0.8, 2],
    [0, 1, 1],
    [-8e-4, 0.8, 2],
    [-0.0017, 0, 1],
  ])
    i.push([kp.seam + l, -s - 6e-4 * c * t, t > 0.5 ? h : 1]);
  (i.push([-e + n, -s, 2]), a(-e + n, -s + n, -90, -1));
  for (let [l, c, h] of r().reverse()) i.push([-e + c, l, h]);
  return (
    a(-e + n, s - n, 180, -1),
    i.push([-e + n, s, 2], [0, s, 1], [e - n, s, 2]),
    a(e - n, s - n, 90, -1),
    i
  );
}
function l00(o) {
  let t = [Dy, -0.01, Cp, -0.03, -0.036, -0.04, -0.044, -0.05];
  for (let M = -0.059; M > o + 0.024; M -= 0.009) t.push(M);
  t.push(o + 0.018, o + 0.014, o + 0.01, o + 0.005, o);
  let e = [],
    s = [],
    n = [],
    i = new Vector3(),
    a = 0;
  for (let M of t) {
    let w = IO(
      _T(-0.036, -0.046, M) * _T(o + 0.008, o + 0.017, M),
      _T(-0.03, -0.038, M) * _T(o + 0.002, o + 0.008, M),
    );
    a = w.length;
    for (let [T, S, E] of w)
      (w2(T, S, M, i), e.push(i.x, i.y, i.z), s.push(E, E, E));
  }
  for (let M = 0; M < t.length - 1; M++)
    for (let w = 0; w < a; w++) {
      let T = M * a + w,
        S = M * a + ((w + 1) % a),
        E = T + a,
        _ = S + a;
      n.push(T, E, S, S, E, _);
    }
  let r = (M, w, T) => {
      let S = new BufferGeometry();
      return (
        S.setAttribute("position", new Float32BufferAttribute(M, 3)),
        S.setAttribute("color", new Float32BufferAttribute(w, 3)),
        S.setIndex(T),
        S.computeVertexNormals(),
        S
      );
    },
    l = r(e, s, n);
  if (l.attributes.normal.getX(3 * a) < 0) {
    for (let M = 0; M < n.length; M += 3) {
      let w = n[M + 1];
      ((n[M + 1] = n[M + 2]), (n[M + 2] = w));
    }
    l = r(e, s, n);
  }
  let c = IO(0, 0),
    h = (nr / 2 - kp.wall) / (nr / 2),
    f = (za / 2 - kp.wall) / (za / 2),
    u = [],
    d = [],
    m = [],
    p = [],
    x = [],
    g = [],
    b = 0.0045;
  c.forEach(([M, w], T) => {
    (w2(M, w, Dy, i),
      u.push(i.x, i.y, i.z),
      w2(M * h, w * f, Dy, i),
      u.push(i.x, i.y, i.z),
      d.push(2, 2, 2, 2, 2, 2),
      p.push(i.x, i.y, i.z, i.x, i.y - b, i.z),
      x.push(1, 1, 1, 1, 1, 1));
  });
  let v = c.length;
  for (let M = 0; M < v; M++) {
    let w = 2 * M,
      T = 2 * ((M + 1) % v);
    (m.push(w, w + 1, T, T, w + 1, T + 1),
      g.push(w, w + 1, T, T, w + 1, T + 1));
  }
  (p.push(0, Dy - b, -Sr), x.push(1, 1, 1));
  for (let M = 0; M < v; M++) g.push(2 * v, 2 * ((M + 1) % v) + 1, 2 * M + 1);
  let y = (M, w) => {
    M.computeVertexNormals();
    let T = M.attributes.normal,
      S = 0;
    for (let E = 0; E < T.count; E++) S += T.getY(E);
    if (S < 0 === w) {
      let E = M.index.array;
      for (let _ = 0; _ < E.length; _ += 3) {
        let R = E[_ + 1];
        ((E[_ + 1] = E[_ + 2]), (E[_ + 2] = R));
      }
      M.computeVertexNormals();
    }
    return M;
  };
  return {
    body: Qe(l),
    rim: Qe(y(r(u, d, m), !0)),
    cavity: Qe(y(r(p, x, g), !0)),
  };
}
function HO(o, t, e, s, n, i = 14) {
  (t.add(
    o.brass,
    ni(
      [
        [n, 0.0012],
        [n, 0.0049 * 0.93],
        [n + 4e-4, 0.0049],
        [n + 0.0013, 0.0049],
        [n + 0.0015, 0.0049 * 0.86],
        [n + 0.0024, 0.0049 * 0.86],
        [n + 0.0031, 0.0049],
        [n + 0.019, 0.0049 * 0.985],
        [n + 0.019, 0.0049 * 0.91],
      ],
      {
        x: e,
        y: s,
        seg: i,
        crease: 0.9,
      },
    ),
  ),
    t.add(
      o.copper,
      ni(
        [
          [n + 0.0188, 0.0049 * 0.905],
          [n + 0.0212, 0.0049 * 0.9],
          [n + 0.024, 0.0049 * 0.8],
          [n + 0.0265, 0.0049 * 0.62],
          [n + 0.0283, 0.0049 * 0.4],
          [n + 0.0293, 0.0049 * 0.17],
          [n + 0.0295, 6e-5],
        ],
        {
          x: e,
          y: s,
          seg: i,
          crease: 1.4,
        },
      ),
    ));
}
function Ap(o, t, e, s, n = 14) {
  let i = new CircleGeometry(o, n);
  return (
    i.applyQuaternion(
      new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), e),
    ),
    i.translate(t.x + e.x * s, t.y + e.y * s, t.z + e.z * s),
    Qe(i)
  );
}
var c00 = {
  camo: "factory",
  optic: "irons",
  muzzle: "none",
  underbarrel: "none",
  magazine: "std",
  stock: "std",
};
var ck = {
  optic: ["irons", "reflex", "holo"],
  muzzle: ["none", "suppressor", "comp"],
  underbarrel: ["none", "vgrip", "laser"],
  magazine: ["std", "ext", "fast"],
  stock: ["std", "light"],
};
function h00(o) {
  let t = {
    ...c00,
    ...(o || {}),
  };
  for (let e in ck) ck[e].includes(t[e]) || (t[e] = ck[e][0]);
  return (t.camo || (t.camo = "factory"), t);
}
var f00 = (o) =>
  [o.optic, o.muzzle, o.underbarrel, o.magazine, o.stock].join(".");
var pk = "";
var F4 = null;
var Ah = (o) => {
  pk = o;
};
function I4() {
  let o = new Map();
  return {
    map: o,
    add(t, ...e) {
      let s = o.get(t);
      s || o.set(t, (s = []));
      for (let n of e)
        n &&
          (s.push(n),
          F4 &&
            (F4[pk] =
              (F4[pk] || 0) +
              (n.index ? n.index.count : n.attributes.position.count) / 3));
    },
    build(t, e) {
      for (let [s, n] of o) {
        let i = !!s.userData.camo,
          a = i || !!s.userData.finish,
          r = s.userData.wear || 1;
        for (let h of n) {
          let f = h.attributes.color.array;
          for (let u = 0; u < f.length; u += 3) {
            let d = f[u] > 1.5 ? (a ? 2 : r) : 1;
            f[u] = f[u + 1] = f[u + 2] = d;
          }
        }
        let l = n.length > 1 ? Vn(n, !1) : n[0];
        (e && l.translate(-e.x, -e.y, -e.z),
          i &&
            (l = Rc(
              l,
              e ? new Matrix4().makeTranslation(e.x, e.y, e.z) : null,
            )));
        let c = new Mesh(l, s);
        ((c.castShadow = !s.transparent),
          (c.receiveShadow = !s.transparent),
          s.userData.keep &&
            ((c.userData.keep = !0), (c.name = s.userData.keep)),
          s.transparent && (c.renderOrder = 2),
          t.add(c));
      }
      o.clear();
    },
  };
}
function u00() {
  let t = createNoise(9109),
    e = createRandom(77),
    s = new Uint8Array(256 * 256 * 4),
    n = new Float32Array(256 * 256);
  for (let a = 0; a < 170; a++) {
    let r = e() * 256,
      l = e() * 256,
      c = (e() - 0.5) * 0.6 + (e() < 0.8 ? 0 : 1.57),
      h = 3 + e() * 30,
      f = Math.cos(c),
      u = Math.sin(c),
      d = 0.35 + e() * 0.65;
    for (let m = 0; m < h; m++) {
      let p = (((l | 0) + 256) % 256) * 256 + (((r | 0) + 256) % 256);
      ((n[p] = Math.max(n[p], d * (1 - Math.abs(m / h - 0.5) * 1.2))),
        (r += f),
        (l += u));
    }
  }
  for (let a = 0; a < 256; a++)
    for (let r = 0; r < 256; r++) {
      let l = (a * 256 + r) * 4,
        c = t.fbm(r / 20, a / 20, 4, Math.round(256 / 20)),
        h = t.fbm(r / 3.1, a / 3.1, 2, Math.round(256 / 3.1));
      ((s[l] = Math.min(1, c * 0.62 + h * 0.3 + n[a * 256 + r] * 0.55) * 255),
        (s[l + 1] = t.fbm(r / 34 + 5, a / 34, 3, Math.round(256 / 34)) * 255),
        (s[l + 2] =
          t.fbm(r / 60 + 11, a / 60 + 3, 3, Math.round(256 / 60)) * 255),
        (s[l + 3] = Math.min(1, n[a * 256 + r] * 1.4) * 255));
    }
  let i = new DataTexture(s, 256, 256, RGBAFormat, UnsignedByteType);
  return (
    (i.wrapS = i.wrapT = RepeatWrapping),
    (i.magFilter = LinearFilter),
    (i.minFilter = LinearMipmapLinearFilter),
    (i.generateMipmaps = !0),
    (i.anisotropy = 4),
    (i.needsUpdate = !0),
    i
  );
}
function H4(o, t, e) {
  let s = new MeshStandardMaterial({
      color: t.color,
      metalness: t.metal,
      roughness: t.rough,
      vertexColors: !0,
      normalMap: t.n.normalMap,
      roughnessMap: t.n.roughnessMap,
      normalScale: new Vector2(t.ns, t.ns),
    }),
    n = {
      uWearMap: {
        value: e,
      },
      uWear: {
        value: new Vector4(
          t.wear[0],
          t.wear[1],
          t.wear[2] ?? 1,
          1 / (t.tile || 0.09),
        ),
      },
      uBareCol: {
        value: new Color(t.bare),
      },
      uBareRM: {
        value: new Vector2(t.bareRM[0], t.bareRM[1]),
      },
      uEdge: {
        value: new Vector2(t.edge[0], t.edge[1]),
      },
      uVar: {
        value: new Vector3(t.tone ?? 0.3, t.sheen ?? 0.45, t.scratch ?? 0.25),
      },
    };
  return (
    (s.onBeforeCompile = (i) => {
      (Object.assign(i.uniforms, n),
        (i.vertexShader = i.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vSmgP; varying vec3 vSmgN;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vSmgP = position; vSmgN = normal;`,
          )),
        (i.fragmentShader = i.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec3 vSmgP; varying vec3 vSmgN; uniform sampler2D uWearMap; uniform vec4 uWear; uniform vec3 uBareCol; uniform vec2 uBareRM; uniform vec2 uEdge; uniform vec3 uVar;
vec4 smgTri( vec3 p, vec3 w ) { return texture2D( uWearMap, p.zy ) * w.x + texture2D( uWearMap, p.zx ) * w.y + texture2D( uWearMap, p.xy ) * w.z; }`,
          )
          .replace(
            "#include <color_fragment>",
            `float smgEdge = 0.0;
#ifdef USE_COLOR
	smgEdge = smoothstep( 1.05, 1.9, vColor.r );
#endif`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
{
	vec3 sw = pow( abs( normalize( vSmgN ) ), vec3( 4.0 ) ); sw /= ( sw.x + sw.y + sw.z );
	vec4 kw = smgTri( vSmgP * uWear.w, sw );
	vec4 kv = smgTri( vSmgP * uWear.w * 0.23 + vec3( 0.37, 0.11, 0.53 ), sw );
	float lvl = mix( uWear.x, uWear.y, smgEdge );
	float kt = smoothstep( 0.98 - lvl, 1.08 - lvl, kw.r * 0.8 + kv.r * 0.2 ) * step( 0.001, lvl ) * uWear.z;
	diffuseColor.rgb *= 1.0 + uEdge.x * smgEdge;                                  // burnished edges even where the finish holds
	roughnessFactor *= 1.0 - uEdge.y * smgEdge;
	diffuseColor.rgb *= 1.0 - 0.5 * uVar.x + uVar.x * kv.b;                        // tone drifts across a panel
	roughnessFactor = clamp( roughnessFactor * ( 1.0 - 0.5 * uVar.y + uVar.y * kv.g ) - uVar.z * kw.a * 0.5, 0.05, 1.0 );   // sheen: handled areas, scratches
	diffuseColor.rgb = mix( diffuseColor.rgb, uBareCol, kt );
	roughnessFactor = mix( roughnessFactor, uBareRM.x, kt ); metalnessFactor = mix( metalnessFactor, uBareRM.y, kt );
}`,
          )));
    }),
    (s.customProgramCacheKey = () => "smg-finish-1"),
    (s.name = "smg:" + o),
    (s.userData = {
      base: new Color(t.color).lerp(new Color(t.bare), 0.06),
      wear: t.worldWear ?? 1.5,
      finish: !0,
      U: n,
    }),
    s
  );
}
var hk = null;
function bk() {
  if (hk) return hk;
  let o = ao(),
    t = u00(),
    e = {
      ...o,
    },
    s = (n, i, a, r, l) => {
      let c = n.clone();
      return (
        c.color.set(i),
        (c.metalness = a),
        (c.roughness = r),
        (c.userData = {
          base: new Color(i),
          wear: l,
        }),
        c
      );
    };
  return (
    (e.recv = H4(
      "recv",
      {
        color: 3158582,
        metal: 0.22,
        rough: 0.58,
        n: o.alu,
        ns: 0.22,
        wear: [0.07, 0.5, 1],
        bare: 10132898,
        bareRM: [0.3, 1],
        edge: [0.42, 0.3],
        tile: 0.085,
        tone: 0.34,
        sheen: 0.55,
        scratch: 0.5,
      },
      t,
    )),
    (e.steel = H4(
      "phos",
      {
        color: 3816512,
        metal: 0.42,
        rough: 0.64,
        n: o.steel,
        ns: 0.3,
        wear: [0.07, 0.5, 1],
        bare: 11119792,
        bareRM: [0.34, 1],
        edge: [0.5, 0.25],
        tile: 0.06,
        tone: 0.3,
        sheen: 0.4,
        scratch: 0.4,
      },
      t,
    )),
    (e.mag = H4(
      "mag",
      {
        color: 3421754,
        metal: 0.38,
        rough: 0.6,
        n: o.alu,
        ns: 0.14,
        wear: [0.06, 0.44, 1],
        bare: 10264484,
        bareRM: [0.4, 1],
        edge: [0.35, 0.2],
        tile: 0.07,
        tone: 0.3,
        sheen: 0.45,
        scratch: 0.45,
      },
      t,
    )),
    (e.poly = H4(
      "poly",
      {
        color: 3486771,
        metal: 0,
        rough: 0.64,
        n: o.poly,
        ns: 0.3,
        wear: [0.05, 0.36, 0.8],
        bare: 7894901,
        bareRM: [0.78, 0],
        edge: [0.4, 0.14],
        tile: 0.1,
        tone: 0.24,
        sheen: 0.36,
        scratch: 0.2,
      },
      t,
    )),
    (e.grip = H4(
      "grip",
      {
        color: 3092013,
        metal: 0,
        rough: 0.76,
        n: o.grip,
        ns: 0.9,
        wear: [0.04, 0.3, 0.8],
        bare: 7631729,
        bareRM: [0.6, 0],
        edge: [0.35, 0.2],
        tile: 0.1,
        tone: 0.2,
        sheen: 0.5,
        scratch: 0.1,
      },
      t,
    )),
    (e.alu = H4(
      "alu",
      {
        color: 3421754,
        metal: 0.35,
        rough: 0.5,
        n: o.alu,
        ns: 0.2,
        wear: [0.08, 0.6, 1],
        bare: 12764359,
        bareRM: [0.36, 1],
        edge: [0.5, 0.3],
        tile: 0.07,
        tone: 0.2,
        sheen: 0.4,
        scratch: 0.4,
      },
      t,
    )),
    (e.aluLt = e.alu),
    (e.rubber = s(o.rubber, 2828841, 0, 0.9, 1.25)),
    (e.pin = s(o.steelBright, 6974834, 0.9, 0.42, 1.2)),
    (hk = e)
  );
}
var fk = null;
function YO() {
  if (fk) return fk;
  let o = bk(),
    t = createCanvas(512, 256),
    e = t.getContext("2d"),
    s = {},
    n = (d, m, p, x, g, b) => {
      (e.save(),
        e.translate(m, p),
        b(x, g),
        e.restore(),
        (s[d] = [m / 512, 1 - (p + g) / 256, (m + x) / 512, 1 - p / 256]));
    },
    i = (d, m = 600) =>
      `${m} ${d}px Bahnschrift, "Segoe UI", Arial, sans-serif`,
    a = (d, m, p, x) => {
      (e.beginPath(),
        e.moveTo(d, m + x),
        e.lineTo(d, m + x * 0.38),
        e.quadraticCurveTo(d, m + x * 0.1, d + p / 2, m),
        e.quadraticCurveTo(d + p, m + x * 0.1, d + p, m + x * 0.38),
        e.lineTo(d + p, m + x),
        e.closePath(),
        e.fill());
    },
    r = (d, m, p) => {
      ((e.strokeStyle = p),
        (e.lineWidth = 5),
        e.beginPath(),
        e.roundRect(4, 4, d - 8, m - 8, 9),
        e.stroke());
    };
  (n("safe", 0, 0, 96, 72, (d, m) => {
    (r(d, m, "#e9e9e4"),
      (e.fillStyle = "#e9e9e4"),
      a(38, 14, 20, 44),
      (e.strokeStyle = "#e9e9e4"),
      (e.lineWidth = 5),
      e.beginPath(),
      e.moveTo(20, 56),
      e.lineTo(76, 16),
      e.stroke());
  }),
    n("semi", 96, 0, 96, 72, (d, m) => {
      (r(d, m, "#d2301f"), (e.fillStyle = "#d2301f"), a(38, 14, 20, 44));
    }),
    n("auto", 192, 0, 160, 72, (d, m) => {
      (r(d, m, "#d2301f"), (e.fillStyle = "#d2301f"));
      for (let p = 0; p < 5; p++) a(18 + p * 26, 14, 18, 44);
    }),
    (e.fillStyle = "#fff"),
    (e.textBaseline = "middle"),
    n("proof", 0, 80, 224, 48, () => {
      ((e.font = i(30, 700)),
        e.fillText("GH", 4, 26),
        e.beginPath(),
        e.moveTo(66, 38),
        e.lineTo(80, 10),
        e.lineTo(94, 38),
        e.closePath(),
        (e.lineWidth = 3),
        (e.strokeStyle = "#fff"),
        e.stroke(),
        (e.font = i(26)),
        e.fillText("11/26  N", 108, 26));
    }),
    n("made", 224, 80, 288, 48, () => {
      ((e.font = i(20)), e.fillText("GH-ARMS \xB7 SOLSTICE WORKS", 4, 26));
    }),
    n("cal", 0, 136, 200, 44, () => {
      ((e.font = i(30, 700)), e.fillText("9 mm \xD7 19", 4, 24));
    }),
    n("n32", 208, 136, 64, 44, () => {
      ((e.font = i(30, 700)), e.fillText("32", 6, 24));
    }),
    n("n48", 272, 136, 64, 44, () => {
      ((e.font = i(30, 700)), e.fillText("48", 6, 24));
    }),
    n("drum", 0, 188, 256, 40, () => {
      ((e.font = i(26, 700)),
        ["1", "2", "3", "4"].forEach((d, m) => e.fillText(d, 10 + m * 64, 22)));
    }),
    ["10", "20", "30", "40"].forEach((d, m) =>
      n("w" + d, 264 + m * 60, 188, 56, 40, () => {
        ((e.font = i(30, 700)), e.fillText(d, 6, 22));
      }),
    ),
    n("dot", 352, 0, 32, 32, () => {
      (e.beginPath(), e.arc(16, 16, 11, 0, 6.3), e.fill());
    }),
    n("line", 392, 0, 64, 16, () => {
      e.fillRect(2, 4, 60, 8);
    }));
  let l = new CanvasTexture(t);
  ((l.anisotropy = 8), (l.colorSpace = SRGBColorSpace));
  let c = new MeshStandardMaterial({
    map: l,
    color: 13224910,
    transparent: !0,
    roughness: 0.55,
    metalness: 0.1,
    depthWrite: !1,
    polygonOffset: !0,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  c.userData = {
    base: new Color(9079952),
    wear: 1,
    cells: s,
  };
  let h = ff(
      64,
      (d, m) =>
        0.5 +
        0.5 * Math.sin((d * Math.PI) / 8 + Math.sin((m * Math.PI) / 16) * 0.9),
      3.2,
      () => 0.62,
    ),
    f = ao().steel.clone();
  ((f.normalMap = x2(h.n, 170)),
    (f.roughnessMap = x2(h.r, 170)),
    (f.normalScale = new Vector2(1.1, 1.1)),
    f.color.set(6974834),
    (f.metalness = 0.7),
    (f.roughness = 0.5),
    (f.userData = {
      base: new Color(6974834),
      wear: 1.3,
    }));
  let u = ao().poly.clone();
  return (
    u.color.set(11817498),
    (u.userData = {
      base: new Color(11817498),
      wear: 1.1,
    }),
    (fk = {
      mark: c,
      weld: f,
      orange: u,
    })
  );
}
function D5(o, t, e, s, n, i, a) {
  let r = YO().mark.userData.cells[o],
    l = new PlaneGeometry(t, e),
    c = l.attributes.uv;
  for (let h = 0; h < c.count; h++)
    c.setXY(
      h,
      r[0] + c.getX(h) * (r[2] - r[0]),
      r[1] + c.getY(h) * (r[3] - r[1]),
    );
  return (
    l.rotateY(a < 0 ? -Math.PI / 2 : Math.PI / 2),
    l.translate(s, n, -i),
    Qe(l)
  );
}
function Ly(o, t, e, s, n, i = 12) {
  let a = Wn(o, e - t, {
    x: (t + e) / 2,
    seg: i,
  });
  return (a.rotateZ(Ze(s)), a.translate(0, vo, -n), a);
}
function uk(o, t, e, s, n = 20) {
  return [...RT(0, 0, o, e, s, n), ...RT(0, 0, t, s, e, n)];
}
function d00(o, t, e, s, n, i, a = 5, r = 2) {
  let l = () => ({
      p: [],
      n: [],
      u: [],
    }),
    c = l(),
    h = l(),
    f = new Vector3(),
    u = new Vector3(),
    d = new Vector3(),
    m = new Vector3(),
    p = new Vector3(),
    x = new Vector3(),
    g = (v, y, M, w) => {
      (f.fromArray(y.p),
        u.fromArray(M.p),
        d.fromArray(w.p),
        m.fromArray(y.n).add(p.fromArray(M.n)).add(x.fromArray(w.n)));
      let T = p.subVectors(u, f).cross(x.subVectors(d, f)).dot(m) < 0;
      for (let S of T ? [y, w, M] : [y, M, w])
        (v.p.push(...S.p), v.n.push(...S.n), v.u.push(...S.u));
    };
  for (let v = 0; v < 4; v++) {
    let y = (v * Math.PI) / 2,
      M = Math.cos(y),
      w = Math.sin(y),
      T = i[v],
      S = (C, L, A) => [C * M + A * w, L, -C * w + A * M],
      E = (C, L, A) => {
        let O = C * Math.SQRT1_2,
          H = [];
        for (let z = 0; z < a; z++) H.push([-O + (2 * O * z) / a, e]);
        for (let z = 0; z < a; z++) H.push([O, e + ((s - e) * z) / a]);
        for (let z = 0; z < a; z++) H.push([O - (2 * O * z) / a, s]);
        for (let z = 0; z < a; z++) H.push([-O, s - ((s - e) * z) / a]);
        let F = H.length,
          P = [];
        for (let z = 0; z < F; z++) {
          let k = H[z],
            I = k[0],
            G = k[1] - n,
            K = Math.hypot(I, G),
            $ = (I / K) * T,
            n0 = n + (G / K) * T,
            e0 = [];
          for (let p0 = 0; p0 <= r; p0++) {
            let t0 = $ + ((k[0] - $) * p0) / r,
              M0 = n0 + ((k[1] - n0) * p0) / r,
              f0 = Math.sqrt(Math.max(C * C - t0 * t0, 0));
            e0.push({
              p: S(t0, M0, f0),
              n: S((L * t0) / C, 0, (L * f0) / C),
              u: [C * (Math.asin(t0 / C) + y), M0],
            });
          }
          P.push(e0);
        }
        for (let z = 0; z < F; z++)
          for (let k = 0; k < r; k++) {
            let I = (z + 1) % F;
            (g(A, P[z][k], P[z][k + 1], P[I][k + 1]),
              g(A, P[z][k], P[I][k + 1], P[I][k]));
          }
      };
    (E(o, 1, c), E(t, -1, h));
    let _ = 20,
      R = [];
    for (let C = 0; C <= _; C++) {
      let L = (C / _) * Math.PI * 2,
        A = T * Math.cos(L),
        O = n + T * Math.sin(L),
        H = S(-Math.cos(L), -Math.sin(L), 0);
      R.push([
        {
          p: S(A, O, Math.sqrt(o * o - A * A)),
          n: H,
          u: [(C / _) * 0.03, 0],
        },
        {
          p: S(A, O, Math.sqrt(t * t - A * A)),
          n: H,
          u: [(C / _) * 0.03, 0.002],
        },
      ]);
    }
    for (let C = 0; C < _; C++)
      (g(c, R[C][0], R[C][1], R[C + 1][1]),
        g(c, R[C][0], R[C + 1][1], R[C + 1][0]));
  }
  let b = (v) => {
    let y = new BufferGeometry();
    return (
      y.setAttribute("position", new Float32BufferAttribute(v.p, 3)),
      y.setAttribute("normal", new Float32BufferAttribute(v.n, 3)),
      y.setAttribute("uv", new Float32BufferAttribute(v.u, 2)),
      Qe(y)
    );
  };
  return {
    wall: b(c),
    liner: b(h),
  };
}
function jO(o, t) {
  let e = bk(),
    s = YO(),
    n = new Group(),
    i = {},
    a = I4();
  n.name = "gun_smg";
  let r = (H0 = {}) =>
      t
        ? H0
        : {
            ...H0,
            b: (H0.b ?? 8e-4) >= 0.0014 ? H0.b : 0,
            bs: 1,
            cs: 3,
            holes: H0.keepHoles ? H0.holes : null,
          },
    l = (H0) =>
      t ? H0 : H0.map((Y0) => (Y0[2] && Y0[2] < 0.003 ? [Y0[0], Y0[1]] : Y0)),
    c = (H0, Y0, et) => us(l(H0), Y0, r(et)),
    h = (H0, Y0, et) => si(l(H0), Y0, r(et)),
    f = (H0, Y0, et) => jc(l(H0), Y0, r(et)),
    u = (H0 = {}, Y0 = 16) =>
      t
        ? H0
        : {
            ...H0,
            seg: Math.max(6, (H0.seg || Y0) >> 1),
          },
    d = (H0, Y0, et) => fa(H0, Y0, u(et, 16)),
    m = (H0, Y0) => ni(H0, u(Y0, 20)),
    p = (H0, Y0, et) => Wn(H0, Y0, u(et, 12)),
    x = (H0, Y0, et) => T5(H0, Y0, u(et, 12)),
    g = o.camo && o.camo !== "factory" ? o.camo : null,
    b = (H0, Y0) => (g && xl(g, t ? H0 : "metal")) || Y0,
    v = b("metal", e.recv),
    y = b("polymer", e.poly),
    M = b("furniture", e.grip),
    w = b("metal", e.mag),
    T = (H0, Y0, et, ct = !1) => {
      if (!t) return (ct || et(a), null);
      let D0 = Du(n, i, H0, Y0),
        u0 = I4();
      return (et(u0), u0.build(D0, Y0), D0);
    },
    S = {
      gripR: new Object3D(),
      gripL: new Object3D(),
    },
    E = {};
  ((S.gripR.name = "gripR"), (S.gripL.name = "gripL"), n.add(S.gripR, S.gripL));
  let _ = (H0, Y0) => {
      let et = new Object3D();
      return (
        (et.name = "mount_" + H0),
        et.position.copy(Y0),
        n.add(et),
        (E[H0] = et),
        et
      );
    },
    R = {},
    C = null,
    L = (H0) => (
      H0.group.updateMatrixWorld(!0),
      new Box3().setFromObject(H0.group)
    ),
    A = (H0, Y0) => (Y0.add(H0.group), g && Ou && Ou(H0, g), H0),
    O = (H0, Y0, et = 0.002) => {
      let ct = H0.getCenter(new Vector3()).add(Y0),
        D0 = H0.getSize(new Vector3()).multiplyScalar(0.5);
      return Zn([ct.x, ct.y, ct.z], [D0.x, D0.y, D0.z], et);
    };
  Ah("receiver");
  let H = UO(t ? 20 : 10);
  if (t) {
    a.add(
      v,
      h(H, i1 + 0.06, {
        u: -0.06,
        b: 0,
        soft: !0,
      }),
      h(n00(), wf - i1, {
        u: i1,
        b: 0,
        soft: !0,
      }),
      h(H, 0.17 - wf, {
        u: wf,
        b: 0,
        soft: !0,
      }),
    );
    let H0 = Mo - 0.0015 - H5,
      Y0 = (H5 + Mo - 0.0015) / 2;
    (a.add(
      e.black,
      c(se(i1, I1, wf, a1), 4e-4, {
        x: H5 + 2e-4,
        b: 0,
      }),
    ),
      a.add(
        e.black,
        c(se(i1, I1, wf, I1 + 4e-4), H0, {
          x: Y0,
          b: 0,
        }),
        c(se(i1, a1 - 4e-4, wf, a1), H0, {
          x: Y0,
          b: 0,
        }),
      ),
      a.add(
        e.black,
        h(se(H5, I1, Mo - 0.0015, a1), 4e-4, {
          u: i1,
          b: 0,
        }),
        h(se(H5, I1, Mo - 0.0015, a1), 4e-4, {
          u: wf - 4e-4,
          b: 0,
        }),
      ),
      a.add(
        v,
        c(
          se(i1 - 0.0045, I1 - 0.004, wf + 0.0045, a1 + 0.002, 0.0045),
          0.0013,
          {
            x: Mo + 2e-4,
            b: 5e-4,
            cs: 2,
            holes: [se(i1, I1, wf, a1, 0.002)],
          },
        ),
      ),
      a.add(
        v,
        c(
          [
            [i1 - 0.02, I1 + 0.004, 0.003],
            [i1 - 0.006, I1 + 0.002, 0.002],
            [i1 - 0.006, a1 - 0.003, 0.002],
            [i1 - 0.02, a1 - 0.007, 0.003],
          ],
          0.003,
          {
            x: Mo + 8e-4,
            b: 0.0013,
            bs: 2,
          },
        ),
      ),
      a.add(
        e.steel,
        d(0.0092, 0.009, {
          y: Cs,
          u: 0.1125,
          seg: 16,
        }),
      ),
      a.add(
        e.black,
        d(0.0053, 4e-4, {
          y: Cs,
          u: 0.1121,
          seg: 12,
        }),
      ));
    let et = (ct, D0, u0, w0, P0, st = 0.0013) =>
      c(se(ct, u0, D0, w0, (w0 - u0) * 0.49), st, {
        x: P0 * (Mo + 2e-4),
        b: 6e-4,
        cs: 2,
      });
    a.add(
      v,
      et(-0.046, 0.152, 0.044, 0.0496, -1),
      et(-0.046, 0.058, 0.0245, 0.029, -1),
      et(-0.046, 0.04, 0.044, 0.0496, 1),
      et(0.13, 0.16, 0.0385, 0.0445, 1),
      et(-0.046, 0.058, 0.0245, 0.029, 1),
    );
    for (let ct of [-0.006, 0.096])
      for (let D0 of [48, 132]) {
        let u0 = c(se(ct - 0.007, -0.0035, ct + 0.007, 0.0035, 0.0012), 5e-4, {
          x: Mo + 5e-5,
          b: 0,
        });
        (u0.translate(0, Ml, 0), a.add(e.black, xh(u0, D0, Ml)));
      }
    for (let [ct, D0] of [
      [0.14, 0.0235],
      [0.16, 0.0235],
      [0.15, 0.034],
    ])
      for (let u0 of [-1, 1])
        a.add(
          e.pin,
          p(0.0024, 0.001, {
            x: u0 * (Mo + 3e-4),
            y: D0,
            u: ct,
            seg: 8,
          }),
        );
    (a.add(
      e.pin,
      p(0.003, 0.04, {
        y: 0.0225,
        u: -0.052,
        seg: 8,
      }),
      p(0.0044, 0.0012, {
        x: -(Mo + 4e-4),
        y: 0.0225,
        u: -0.052,
        seg: 10,
      }),
    ),
      a.add(e.mark, x4("smg", 0.046, 0.019, -(Mo + 35e-5), 0.0335, 0.112, -1)),
      a.add(
        s.mark,
        D5("proof", 0.022, 0.0047, -(Mo + 35e-5), 0.0205, 0.076, -1),
        D5("made", 0.04, 0.0066, Mo + 35e-5, 0.0225, 0.094, 1),
      ));
    for (let ct of [-1, 1])
      a.add(
        s.weld,
        c(se(0.097, 0.0168, 0.136, 0.0186, 8e-4), 0.0012, {
          x: ct * 0.0169,
          b: 5e-4,
        }),
      );
  } else
    (a.add(
      v,
      h(H, 0.23, {
        u: -0.06,
        b: 0,
        soft: !0,
      }),
    ),
      a.add(
        e.steelBright,
        c(se(i1, I1, wf - 0.008, a1), 8e-4, {
          x: Mo,
          b: 0,
        }),
      ));
  {
    let H0 = (Iy + sr) / 2,
      Y0 = (et) =>
        H.map((ct) => [
          ct[0] * et,
          H0 + (ct[1] - H0) * (1 + (et - 1) * 0.9),
          ct[2],
        ]);
    if (
      (a.add(
        v,
        h(Y0(1.05), 0.015, {
          u: -0.0745,
          b: t ? 0.0016 : 0.003,
          bs: 2,
          soft: !0,
        }),
      ),
      t)
    ) {
      (a.add(
        v,
        h(Y0(1.05), 0.0024, {
          u: -0.0769,
          b: 0.001,
          bs: 2,
          cs: 3,
          holes: [Y0(0.84)],
        }),
      ),
        a.add(
          v,
          h(Kr(0, Ml, 0.0118, 24), 0.001, {
            u: -0.0755,
            b: 5e-4,
            holes: [Kr(0, Ml, 0.0079, 20)],
          }),
        ),
        a.add(
          e.steel,
          m(
            [
              [-0.0774, 1e-4],
              [-0.0774, 0.0052],
              [-0.0768, 0.0063],
              [-0.0745, 0.0068],
            ],
            {
              y: Ml,
              seg: 20,
            },
          ),
        ),
        a.add(
          e.black,
          c(se(-0.07765, Ml - 6e-4, -0.0772, Ml + 6e-4), 0.0086, {
            b: 0,
          }),
        ));
      for (let et of [45, 165, 285])
        a.add(
          e.black,
          d(7e-4, 3e-4, {
            x: Math.cos(Ze(et)) * 0.0096,
            y: Ml + Math.sin(Ze(et)) * 0.0096,
            u: -0.0758,
            seg: 6,
          }),
        );
      a.add(
        s.weld,
        h(Y0(1.062), 0.0016, {
          u: -0.0606,
          b: 6e-4,
          holes: [Y0(1)],
        }),
      );
      for (let et of [62, 118]) {
        let ct = x(0.0019, 5e-4, {
          y: Ml + Mo * 1.045 - 1e-4,
          u: -0.0672,
          seg: 8,
        });
        a.add(e.black, xh(ct, et - 90, Ml));
      }
      a.add(
        e.steel,
        c(
          [
            [-0.0736, 0.057, 0.001],
            [-0.064, 0.057, 0.001],
            [-0.064, 0.065, 0.002],
            [-0.0736, 0.065, 0.002],
          ],
          0.003,
          {
            x: -(Mo * 1.05 + 0.0012),
            b: 8e-4,
            holes: [se(-0.0716, 0.059, -0.066, 0.063, 0.001)],
          },
        ),
      );
      for (let et of [-1, 1])
        a.add(
          e.pin,
          d(0.0021, 8e-4, {
            x: et * 0.0222,
            y: 0.031,
            u: -0.0753,
            seg: 8,
          }),
        );
      for (let [et, ct, D0, u0, w0] of [
        ["proof", 0.0105, 0.0023, -0.0092, 0.0432],
        ["n32", 0.0026, 0.0018, 0.0112, 0.0436],
      ]) {
        let P0 = s.mark.userData.cells[et],
          st = new PlaneGeometry(ct, D0),
          J0 = st.attributes.uv;
        for (let q0 = 0; q0 < J0.count; q0++)
          J0.setXY(
            q0,
            P0[0] + J0.getX(q0) * (P0[2] - P0[0]),
            P0[1] + J0.getY(q0) * (P0[3] - P0[1]),
          );
        (st.translate(u0, w0, 0.0745 + 25e-5), a.add(s.mark, Qe(st)));
      }
    }
  }
  (Ah("bolt"),
    T(
      "bolt",
      Gt(0.004, 0.0415, 0.085),
      (H0) => {
        (H0.add(
          e.steelBright,
          c(se(0.05, I1 + 0.0012, 0.1045, a1 - 0.0014, 0.003), 0.0236, {
            x: 0.0042,
            b: 0.003,
            bs: 2,
            cs: 2,
            soft: !0,
          }),
        ),
          H0.add(
            e.steelBright,
            c(se(0.104, 0.0305, 0.1123, 0.0415), 0.015, {
              x: 0.0035,
              b: 0.0016,
            }),
          ),
          H0.add(
            e.steel,
            c(se(0.0975, 0.034, 0.1126, 0.0376), 0.0016, {
              x: 0.0114,
              b: 0,
            }),
            p(0.0015, 0.0014, {
              x: 0.0116,
              y: 0.0358,
              u: 0.1,
              seg: 6,
            }),
          ),
          H0.add(
            e.black,
            c(m4(0.079, 0.0462, 0.022, 0.0034), 4e-4, {
              x: 0.0161,
              b: 0,
              cs: 2,
            }),
            c(m4(0.062, 0.0375, 0.01, 0.003), 4e-4, {
              x: 0.0161,
              b: 0,
              cs: 2,
            }),
          ));
        for (let Y0 = 0; Y0 < 5; Y0++)
          H0.add(
            e.steel,
            c(
              se(0.066 + Y0 * 0.0042, 0.034, 0.0676 + Y0 * 0.0042, 0.042),
              6e-4,
              {
                x: 0.0163,
                b: 0,
              },
            ),
          );
      },
      !0,
    ),
    T(
      "chamberRound",
      Gt(0, Cs, 0.123),
      (H0) => {
        (eT(e, H0, 0, Cs, 0.1136, 0.019, 0.0049, 0.0105),
          H0.add(
            e.steelBright,
            d(0.0019, 3e-4, {
              y: Cs,
              u: 0.1134,
              seg: 8,
            }),
          ));
      },
      !0,
    ),
    Ah("tube"));
  let F = b("metal", e.steel),
    P = F1 - mk - 0.006,
    z = F1 + 0.007,
    k = 15;
  if (
    (a.add(
      F,
      d(ii, P - 0.168, {
        y: vo,
        u: 0.168,
        seg: 20,
      }),
      d(ii, 0.334 - z, {
        y: vo,
        u: z,
        seg: 20,
      }),
    ),
    t
      ? (a.add(
          F,
          h(uk(ii, ii - 0.0019, kc + k, kc - k + 360), z - (P + 0.013), {
            u: P + 0.013,
            y: vo,
            b: 0,
            soft: !0,
          }),
        ),
        a.add(
          F,
          h(uk(ii, ii - 0.0019, kc + k, kc + p00(gk) - k + 360), 0.013, {
            u: P,
            y: vo,
            b: 0,
            soft: !0,
          }),
        ),
        a.add(
          e.black,
          d(ii - 0.0021, z - P, {
            y: vo,
            u: P,
            seg: 14,
          }),
        ),
        a.add(
          e.steel,
          d(0.0052, z - P, {
            y: vo,
            u: P,
            seg: 10,
          }),
        ),
        a.add(
          F,
          m(
            [
              [0.334, ii],
              [0.3372, ii - 0.001],
              [0.3385, ii - 0.0036],
              [0.3385, 1e-4],
            ],
            {
              y: vo,
              seg: 20,
            },
          ),
        ),
        a.add(
          F,
          m(
            [
              [0.1655, ii + 0.0042],
              [0.172, ii + 0.0042],
              [0.1765, ii + 8e-4],
              [0.1765, ii - 0.001],
            ],
            {
              y: vo,
              seg: 20,
            },
          ),
        ),
        a.add(
          s.weld,
          m(
            [
              [0.1762, ii + 2e-4],
              [0.1772, ii + 0.0012],
              [0.1784, ii + 2e-4],
            ],
            {
              y: vo,
              seg: 20,
              crease: 1.4,
            },
          ),
        ))
      : a.add(
          F,
          d(ii, z - P, {
            y: vo,
            u: P,
            seg: 20,
          }),
        ),
    T("chargingHandle", Gt(0, vo, F1), (H0) => {
      if (
        (H0.add(e.steel, Ly(0.0036, 0.0045, 0.0215, kc, F1, 10)),
        H0.add(e.poly, Ly(0.0066, 0.019, 0.0385, kc, F1, 14)),
        t)
      ) {
        for (let Y0 of [0.0218, 0.0262, 0.0306, 0.035])
          H0.add(e.poly, Ly(0.0072, Y0, Y0 + 0.0022, kc, F1, 10));
        (H0.add(e.poly, Ly(0.0052, 0.0385, 0.0402, kc, F1, 12)),
          H0.add(e.steel, Ly(0.0052, 0.0166, 0.019, kc, F1, 12)));
      }
    }),
    Ah("front"),
    a.add(
      e.steel,
      m(
        [
          [0.15, 0.0095],
          [0.3, 0.0095],
          [0.3, 0.008],
          [0.3355, 0.008],
          [0.3355, 0.0098],
          [0.3495, 0.0098],
          [Rp, 0.0088],
          [Rp, 0.0048],
          [0.325, 0.0048],
        ],
        {
          y: Cs,
        },
      ),
    ),
    a.add(
      F,
      c(
        [
          [0.3135, Cs - 0.0118, 0.003],
          [0.3345, Cs - 0.0118, 0.003],
          [0.3345, vo + 0.004],
          [0.3135, vo + 0.004],
        ],
        0.015,
        {
          b: 0.0016,
          bs: 2,
        },
      ),
    ),
    a.add(
      F,
      m(
        [
          [0.3125, ii],
          [0.3135, ii + 0.0024],
          [0.3345, ii + 0.0024],
          [0.3355, ii],
        ],
        {
          y: vo,
          seg: 20,
        },
      ),
      m(
        [
          [0.3125, 0.0098],
          [0.3135, 0.0122],
          [0.3345, 0.0122],
          [0.3355, 0.0098],
        ],
        {
          y: Cs,
          seg: 18,
        },
      ),
    ),
    o.optic === "irons")
  )
    (a.add(
      F,
      c(
        [
          [0.3128, vo + 0.0085],
          [0.3352, vo + 0.0085],
          [0.334, Ac - 0.0122, 0.001],
          [0.314, Ac - 0.0122, 0.001],
        ],
        0.013,
        {
          b: 0.001,
        },
      ),
    ),
      a.add(
        F,
        h(Kr(0, 0, 0.0128, t ? 24 : 12), 0.0135, {
          u: 0.3172,
          y: Ac,
          keepHoles: !0,
          holes: [Kr(0, 0, 0.0106, t ? 20 : 12)],
          b: 9e-4,
          soft: !0,
        }),
      ),
      a.add(
        e.steel,
        c(
          [
            [0.3224, Ac - 0.0116],
            [0.3262, Ac - 0.0116],
            [0.3256, Ac],
            [0.3231, Ac],
          ],
          0.002,
          {
            b: 3e-4,
          },
        ),
      ));
  else if (
    (a.add(
      F,
      c(
        [
          [0.3128, vo + 0.0085],
          [0.3352, vo + 0.0085],
          [0.3338, vo + 0.014, 0.0015],
          [0.3142, vo + 0.014, 0.0015],
        ],
        0.013,
        {
          b: 0.001,
        },
      ),
    ),
    t)
  )
    for (let H0 of [0.3185, 0.3295])
      a.add(
        e.steel,
        x(0.0019, 6e-4, {
          y: vo + 0.0138,
          u: H0,
          seg: 8,
        }),
      );
  if (t) {
    if (
      (a.add(
        e.black,
        d(0.0048, 5e-4, {
          y: Cs,
          u: 0.3252,
          seg: 10,
        }),
      ),
      o.muzzle !== "suppressor")
    )
      for (let H0 = 0; H0 < 3; H0++)
        a.add(
          e.steel,
          xh(
            bh(
              c(se(0.3375, 0.0094, 0.344, 0.0121), 0.0058, {
                b: 6e-4,
              }),
              0,
              Cs,
              0,
            ),
            H0 * 120 + 60,
            Cs,
          ),
        );
    (a.add(
      e.pin,
      p(0.0022, 0.0162, {
        y: vo + 5e-4,
        u: 0.319,
        seg: 8,
      }),
      p(0.0022, 0.0162, {
        y: Cs - 0.006,
        u: 0.329,
        seg: 8,
      }),
    ),
      a.add(
        s.weld,
        m(
          [
            [0.3108, ii + 2e-4],
            [0.3118, ii + 0.0011],
            [0.3128, ii + 2e-4],
          ],
          {
            y: vo,
            seg: 20,
            crease: 1.4,
          },
        ),
      ));
  }
  let I = {},
    G = (H0, Y0, et, ct, D0 = 0.0082) => {
      a.add(
        e.pin,
        p(0.0026, 0.0052, {
          x: Y0 + 0.002,
          y: et,
          u: ct,
          seg: 8,
        }),
        p(0.004, 0.0012, {
          x: Y0 - 0.001,
          y: et,
          u: ct,
          seg: 8,
        }),
      );
      let u0 = new TorusGeometry(D0, 0.0013, t ? 5 : 4, t ? 14 : 8);
      if ((u0.rotateY(Math.PI / 2), u0.translate(0, -D0 + 0.0012, 0), !t)) {
        (u0.translate(Y0, et, -ct), a.add(e.pin, Qe(u0)));
        return;
      }
      let w0 = new Group();
      ((w0.name = "sling_" + H0),
        w0.position.copy(Gt(Y0, et, ct)),
        (w0.userData.keep = !0),
        n.add(w0));
      let P0 = I4();
      (P0.add(e.pin, Qe(u0)), P0.build(w0), (I[H0] = w0));
    };
  (G("slingF", -0.0102, Cs + 0.0105, 0.324, 0.0074),
    G("slingR", -(Mo * 1.05 + 0.003), 0.0445, -0.0672, 0.009),
    Ah("muzzle"));
  let K = Rp;
  if ((_("muzzle", Gt(0, Cs, Rp)), o.muzzle === "none")) {
    if (t) {
      a.add(
        e.steel,
        m(
          [
            [0.3452, 0.0098],
            [0.346, 0.0107],
            [0.3512, 0.0107],
            [0.352, 0.0098],
          ],
          {
            y: Cs,
            seg: 18,
          },
        ),
      );
      for (let H0 = 0; H0 < 18; H0++)
        a.add(
          e.steel,
          xh(
            bh(
              c(se(0.3464, 0.0104, 0.3508, 0.0111), 0.0012, {
                b: 0,
              }),
              0,
              Cs,
              0,
            ),
            H0 * 20,
            Cs,
          ),
        );
    }
  } else {
    let H0 = gf(o.muzzle, {
        caliber: "pistol",
      }),
      Y0 = H0.radius ?? 0.0175;
    if (((K = Rp + H0.length), o.muzzle === "suppressor")) {
      let et = Math.min(0.0152, H0.rear ?? 0.0152);
      if (
        (a.add(
          e.steel,
          m(
            [
              [0.329, 0.01],
              [0.3305, et],
              [0.35, et],
              [0.3525, et - 0.0016],
              [0.3525, 0.01],
            ],
            {
              y: Cs,
              seg: 20,
            },
          ),
        ),
        t)
      ) {
        for (let ct = 0; ct < 12; ct++)
          a.add(
            e.steel,
            xh(
              bh(
                c(se(0.3325, et - 4e-4, 0.344, et + 6e-4), 0.0026, {
                  b: 0,
                }),
                0,
                Cs,
                0,
              ),
              ct * 30,
              Cs,
            ),
          );
        for (let ct = 0; ct < 3; ct++)
          a.add(
            e.black,
            xh(
              bh(
                c(se(0.3455, et - 5e-5, 0.3505, et + 2e-4), 0.0052, {
                  b: 0,
                }),
                0,
                Cs,
                0,
              ),
              ct * 120 + 60,
              Cs,
            ),
          );
      }
    }
    if (t) A(H0, E.muzzle);
    else if (o.muzzle === "suppressor") {
      let et = Rp,
        ct = K,
        D0 = b("metal", e.steel);
      (a.add(
        D0,
        ni(
          [
            [et - 0.002, Y0 * 0.56],
            [et + 0.002, Y0 * 0.78],
            [et + 0.016, Y0 * 0.78],
            [et + 0.018, Y0],
            [et + 0.046, Y0],
            [et + 0.047, Y0 * 0.93],
            [et + 0.05, Y0 * 0.93],
            [et + 0.051, Y0],
            [ct - 0.03, Y0],
            [ct - 0.029, Y0 * 0.93],
            [ct - 0.026, Y0 * 0.93],
            [ct - 0.025, Y0],
            [ct - 0.004, Y0],
            [ct, Y0 * 0.84],
            [ct, Y0 * 0.42],
            [ct - 0.01, Y0 * 0.3],
          ],
          {
            y: Cs,
            seg: 12,
          },
        ),
      ),
        a.add(
          e.black,
          fa(Y0 * 0.3, 5e-4, {
            y: Cs,
            u: ct - 0.01,
            seg: 8,
          }),
        ));
    } else {
      let et = Rp,
        ct = K;
      a.add(
        b("metal", e.steel),
        ni(
          [
            [et, Y0 * 0.8],
            [et + 0.003, Y0],
            [ct - 0.003, Y0],
            [ct, Y0 * 0.86],
            [ct, 0.0056],
            [ct - 0.012, 0.0056],
          ],
          {
            y: Cs,
            seg: 10,
          },
        ),
      );
      for (let D0 = 0; D0 < 3; D0++)
        for (let u0 of [62, 118]) {
          let w0 = us(
            se(
              et + 0.008 + D0 * 0.011,
              -0.0026,
              et + 0.014 + D0 * 0.011,
              0.0026,
            ),
            6e-4,
            {
              x: Y0 + 1e-4,
              b: 0,
            },
          );
          (w0.rotateZ(Ze(u0)), w0.translate(0, Cs, 0), a.add(e.black, w0));
        }
    }
    R.muzzle = ml([0, Cs, -Rp], [0, Cs, -K], Y0 + 5e-4, 0.002);
  }
  ((S.muzzle = Gt(0, Cs, K)), Ah("handguard"));
  let $ = y,
    n0 = 2 * Tr * Math.tan(Math.PI / 8) + 0.0022;
  if (t) {
    let H0 = (ct, D0, u0 = I5 - 0.004) => {
        let w0 = c(se(M2 + 0.008, -n0 / 2, u0, n0 / 2), zO, {
          x: Tr - zO / 2,
          b: 7e-4,
          cs: 2,
          holes: D0,
        });
        return (w0.rotateZ(Ze(ct)), w0.translate(0, Cs, 0), w0);
      },
      Y0 = [m4(0.213, 0, 0.032, 0.007), m4(0.265, 0, 0.032, 0.007)],
      et = Array.from(
        {
          length: 6,
        },
        (ct, D0) => m4(0.1965 + D0 * 0.0186, 0.0012, 0.0115, 0.0044),
      );
    for (let ct of [0, 180, 270]) a.add($, H0(ct, Y0));
    for (let ct of [45, 135]) a.add($, H0(ct, et));
    for (let ct of [225, 315]) {
      a.add($, H0(ct, null));
      let D0 = c(se(M2 + 0.02, -0.007, I5 - 0.018, 0.007, 0.003), 9e-4, {
        x: Tr + 3e-4,
        b: 4e-4,
        cs: 2,
      });
      (D0.rotateZ(Ze(ct)), D0.translate(0, Cs, 0), a.add(M, D0));
    }
    (a.add(
      $,
      h(tT(Tr + 0.001), 0.0125, {
        u: M2 - 0.002,
        y: Cs,
        holes: [Kr(0, 0, 0.0104)],
        b: 0.001,
      }),
    ),
      a.add(
        $,
        h(tT(Tr + 7e-4), 0.0052, {
          u: I5 - 0.0057,
          y: Cs,
          holes: [Kr(0, 0, 0.01)],
          b: 8e-4,
        }),
      ));
    for (let ct of [-1, 1])
      a.add(
        e.steel,
        p(0.003, 0.0014, {
          x: ct * (Tr + 0.0011),
          y: Cs - 5e-4,
          u: M2 + 0.004,
          seg: 10,
        }),
        p(0.0016, 0.0018, {
          x: ct * (Tr + 0.0011),
          y: Cs - 5e-4,
          u: M2 + 0.004,
          seg: 6,
        }),
      );
    a.add(
      e.alu,
      d(0.0145, I5 - M2 - 0.022, {
        y: Cs,
        u: M2 + 0.011,
        seg: 12,
        open: !0,
      }),
    );
  } else
    a.add(
      $,
      h(tT(Tr), I5 - M2, {
        u: M2,
        y: Cs,
        b: 0,
      }),
    );
  if (
    (o.underbarrel !== "laser" &&
      (a.add(
        $,
        c(
          [
            [0.289, Cs - Tr + 6e-4],
            [0.3035, Cs - Tr + 6e-4],
            [0.305, Cs - Tr - 0.0066, 0.003],
            [0.296, Cs - Tr - 0.0066, 0.003],
          ],
          0.018,
          {
            b: 0.0022,
            bs: 2,
            soft: !0,
          },
        ),
      ),
      (R.handstop = Zn(
        [0, Cs - Tr - 0.003, -0.2975],
        [0.009, 0.0036, 0.0075],
        0.002,
      ))),
    Ah("under"),
    o.underbarrel !== "none")
  ) {
    let H0 = BO[o.underbarrel] ?? 0.24,
      Y0 = Cs - Tr,
      et = _("underbarrel", Gt(0, Vu, H0)),
      ct = et.position;
    {
      let P0 = t
        ? xy(H0 - 0.027, H0 + 0.027, 0)
        : c(se(H0 - 0.027, 0, H0 + 0.027, 0.0075), 0.0206, {
            b: 0,
          });
      (P0.rotateZ(Math.PI), P0.translate(0, Y0 + 5e-4, 0), a.add(e.alu, P0));
    }
    if (t)
      for (let P0 of [-0.019, 0.019])
        a.add(
          e.steel,
          x(0.0026, 0.0012, {
            y: Y0 - 0.001,
            u: H0 + P0,
            x: 0,
            seg: 6,
          }),
        );
    let D0 = wp(o.underbarrel, {
        mount: "rail",
      }),
      u0 = L(D0),
      w0 = D0.drop ?? -u0.min.y;
    if ((D0.laser && (S.laser = D0.laser.clone().add(ct)), D0.grip)) {
      R.vgrip = sT(D0.grip, ct.x, ct.y, ct.z);
      let P0 = D0.grip.hold;
      P0 &&
        (C = {
          at: Bt(P0.at[0], P0.at[1], P0.at[2]).add(ct),
          fingers: Bt(P0.fingers[0], P0.fingers[1], P0.fingers[2]),
          palm: Bt(P0.palm[0], P0.palm[1], P0.palm[2]),
        });
    } else R.under = O(u0, ct);
    if (t) A(D0, et);
    else if (D0.grip) {
      let P0 = b("furniture", e.grip),
        st = Vu - 0.012,
        J0 = Vu - w0;
      (a.add(
        P0,
        us(
          [
            [H0 - 0.022, Vu],
            [H0 + 0.022, Vu],
            [H0 + 0.02, st, 0.003],
            [H0 - 0.02, st, 0.003],
          ],
          0.032,
          {
            b: 0.0016,
          },
        ),
      ),
        a.add(
          e.pin,
          Wn(0.0065, 0.005, {
            x: -0.0185,
            y: Vu - 0.0065,
            u: H0,
            seg: 8,
          }),
        ));
      let q0 = new LatheGeometry(
        [
          [0.0146, 0],
          [0.0128, 0.006],
          [0.0138, 0.022],
          [0.0152, 0.044],
          [0.0146, 0.064],
          [0.0158, st - J0 - 0.006],
          [0.015, st - J0],
          [1e-4, st - J0],
        ]
          .map(([v0, x0]) => new Vector2(v0, -x0))
          .reverse(),
        10,
      );
      (q0.scale(0.98, 1, 1.26),
        q0.rotateX(0.035),
        q0.translate(0, st, -(H0 - 0.001)),
        a.add(P0, Qe(q0)));
    } else {
      let P0 = b("metal", e.aluLt),
        st = -(u0.max.z + ct.z),
        J0 = -(u0.min.z + ct.z),
        q0 = Vu - 0.006,
        v0 = u0.min.y + ct.y,
        x0 = Math.min(0.04, u0.max.x - u0.min.x);
      (a.add(
        P0,
        us(
          [
            [st, q0, 0.002],
            [J0, q0, 0.002],
            [J0, v0 + 0.004],
            [J0 - 0.004, v0],
            [st + 0.006, v0],
            [st, v0 + 0.006],
          ],
          x0,
          {
            b: 0.003,
          },
        ),
      ),
        a.add(
          P0,
          us(se(H0 - 0.02, q0, H0 + 0.02, Vu, 0.001), 0.026, {
            b: 0,
          }),
        ),
        a.add(
          e.pin,
          fa(0.0062, 0.003, {
            x: -0.009,
            y: (q0 + v0) / 2 - 0.001,
            u: J0 - 5e-4,
            seg: 8,
          }),
          fa(0.0045, 0.003, {
            x: 0.008,
            y: (q0 + v0) / 2 - 0.001,
            u: J0 - 5e-4,
            seg: 8,
          }),
          Wn(0.0055, 0.004, {
            x: x0 / 2 + 0.0015,
            y: (q0 + v0) / 2,
            u: H0 + 0.004,
            seg: 8,
          }),
        ));
    }
    R.urail = Zn([0, Y0 - 0.0036, -H0], [0.0103, 0.004, 0.027], 6e-4);
  } else _("underbarrel", Gt(0, Cs - Tr, 0.24));
  if (
    (Ah("housing"),
    a.add(
      y,
      c(GO, 0.033, {
        b: 0.0016,
        bs: 2,
      }),
    ),
    a.add(
      M,
      c(VO, 0.033, {
        b: 0.0045,
        bs: 2,
        cs: 3,
        soft: !0,
      }),
    ),
    a.add(
      y,
      c(WO, 0.014, {
        b: 0.0011,
        bs: 2,
        soft: !0,
      }),
    ),
    t)
  ) {
    for (let H0 of [-1, 1])
      (a.add(
        y,
        c(
          [
            [-0.05, 0.01, 0.002],
            [0.086, 0.0145, 0.002],
            [0.086, 0.0165, 0.001],
            [-0.05, 0.0165, 0.001],
          ],
          0.001,
          {
            x: H0 * 0.0166,
            b: 4e-4,
          },
        ),
      ),
        a.add(
          e.pin,
          p(0.0034, 0.0012, {
            x: H0 * 0.0168,
            y: 0.0115,
            u: -0.049,
            seg: 10,
          }),
          p(0.0034, 0.0012, {
            x: H0 * 0.0168,
            y: 0.0125,
            u: 0.0735,
            seg: 10,
          }),
        ),
        a.add(
          e.pin,
          p(0.0017, 8e-4, {
            x: H0 * 0.0167,
            y: -0.0035,
            u: 0.06,
            seg: 6,
          }),
          p(0.0017, 8e-4, {
            x: H0 * 0.0167,
            y: 5e-4,
            u: 0.038,
            seg: 6,
          }),
        ));
    (a.add(
      y,
      c(
        [
          [0.012, -0.102, 0.003],
          [-0.0395, -0.098, 0.004],
          [-0.0405, -0.101, 0.002],
          [0.0112, -0.105, 0.002],
        ],
        0.03,
        {
          b: 0.0014,
          bs: 2,
        },
      ),
    ),
      a.add(
        s.mark,
        D5("safe", 0.0072, 0.0054, -0.01665, 0.0118, 0.052, -1),
        D5("semi", 0.0072, 0.0054, -0.01665, 0.004, 0.0525, -1),
        D5("auto", 0.011, 0.005, -0.01665, -0.004, 0.052, -1),
      ),
      a.add(
        s.mark,
        D5("dot", 0.0022, 0.0022, 0.01665, 0.0118, 0.04, 1),
        D5("cal", 0.015, 0.0033, 0.01665, 0.008, 0.005, 1),
      ));
  }
  if (
    (T("trigger", Gt(0, -0.011, 0.066), (H0) => {
      H0.add(
        e.steel,
        c(qO, 0.0066, {
          b: 0.0013,
          bs: 2,
          soft: !0,
        }),
      );
    }),
    T(
      "selector",
      Gt(-0.0165, 0.008, 0.02),
      (H0) => {
        H0.add(
          e.steel,
          p(0.0055, 0.003, {
            x: -0.0172,
            y: 0.008,
            u: 0.02,
            seg: 14,
          }),
          c(
            [
              [0.016, 0.0055, 0.001],
              [0.04, 0.009, 0.0015],
              [0.04, 0.0125, 0.0015],
              [0.016, 0.0105, 0.001],
            ],
            0.003,
            {
              x: -0.0195,
              b: 0.001,
            },
          ),
        );
        for (let Y0 = 0; Y0 < 3; Y0++)
          H0.add(
            e.steel,
            c(
              se(0.032 + Y0 * 0.0026, 0.0086, 0.0332 + Y0 * 0.0026, 0.0122),
              8e-4,
              {
                x: -0.0212,
                b: 0,
              },
            ),
          );
        H0.add(
          e.steel,
          p(0.0046, 0.0022, {
            x: 0.017,
            y: 0.008,
            u: 0.02,
            seg: 12,
          }),
          c(se(0.0205, 0.0074, 0.0262, 0.0086, 4e-4), 6e-4, {
            x: 0.0183,
            b: 2e-4,
          }),
        );
      },
      !0,
    ),
    Ah("well"),
    t)
  ) {
    a.add(
      v,
      c(o00, 0.0292, {
        b: 0.0012,
      }),
    );
    for (let H0 of [-1, 1])
      a.add(
        v,
        c(dk, 0.0022, {
          x: H0 * 0.0154,
          b: 0.001,
        }),
      );
    for (let H0 of [-1, 1])
      (a.add(
        v,
        c(
          [
            [0.098, -0.0343],
            [0.135, -0.0305],
            [0.135, 0.0128],
            [0.098, 0.0128],
          ],
          0.0032,
          {
            x: H0 * 0.013,
            b: 3e-4,
          },
        ),
      ),
        a.add(
          e.black,
          c(se(0.0986, -0.012, 0.1344, 0.0122), 2e-4, {
            x: H0 * 0.01135,
            b: 0,
          }),
        ),
        a.add(
          v,
          c(se(0.104, -0.01, 0.1085, 0.0105, 0.0016), 0.001, {
            x: H0 * 0.0167,
            b: 4e-4,
            cs: 2,
          }),
          c(se(0.124, -0.009, 0.1285, 0.0105, 0.0016), 0.001, {
            x: H0 * 0.0167,
            b: 4e-4,
            cs: 2,
          }),
        ),
        a.add(
          v,
          c(
            [
              [0.0983, -0.0345],
              [0.1347, -0.0307],
              [0.1347, -0.0282],
              [0.0983, -0.032],
            ],
            0.0012,
            {
              x: H0 * 0.0119,
              b: 5e-4,
            },
          ),
        ));
    (a.add(
      e.black,
      c(se(0.0986, 0.0118, 0.1344, 0.0124), 0.0228, {
        b: 0,
      }),
    ),
      a.add(
        e.black,
        h(se(-0.0113, -0.012, 0.0113, 0.0122), 2e-4, {
          u: 0.0985,
          b: 0,
        }),
        h(se(-0.0113, -0.012, 0.0113, 0.0122), 2e-4, {
          u: 0.1343,
          b: 0,
        }),
      ));
    for (let H0 = 0; H0 < 4; H0++)
      a.add(
        v,
        c(se(0.1392, -0.024 + H0 * 0.008, 0.1404, -0.0205 + H0 * 0.008), 0.02, {
          b: 0,
        }),
      );
  } else
    a.add(
      v,
      c(KO, 0.0292, {
        b: 0,
      }),
      c(dk, 0.033, {
        b: 0,
      }),
    );
  if (o.magazine === "fast") {
    for (let H0 of [-1, 1])
      a.add(
        y,
        c(
          [
            [0.101, -0.02, 0.002],
            [0.1405, -0.017, 0.002],
            [0.143, -0.0368, 0.002],
            [0.101, -0.0408, 0.002],
          ],
          0.0034,
          {
            x: H0 * 0.0162,
            b: 0.0012,
          },
        ),
      );
    (a.add(
      y,
      c(
        [
          [0.1385, -0.016, 0.001],
          [0.144, -0.016, 0.002],
          [0.1462, -0.037, 0.002],
          [0.1392, -0.0372, 0.001],
        ],
        0.0358,
        {
          b: 0.0014,
        },
      ),
    ),
      (R.funnel = Zn([0, -0.0285, -0.1235], [0.0179, 0.012, 0.0228], 0.0015)));
  }
  (T("magPaddle", Gt(0, -0.0362, 0.0958), (H0) => {
    if (
      (H0.add(
        e.steel,
        c(XO, 0.015, {
          b: 0.0012,
          bs: 2,
        }),
        p(0.002, 0.02, {
          y: -0.0362,
          u: 0.0958,
          seg: 8,
        }),
      ),
      t)
    )
      for (let Y0 = 0; Y0 < 4; Y0++)
        H0.add(
          e.steel,
          c(
            se(
              0.0872 + Y0 * 2e-4,
              -0.069 + Y0 * 0.0022,
              0.0886 + Y0 * 0.001,
              -0.068 + Y0 * 0.0022,
            ),
            0.013,
            {
              b: 0,
            },
          ),
        );
  }),
    T(
      "magButton",
      Gt(0.0165, 0.0105, 0.086),
      (H0) => {
        H0.add(
          e.steel,
          p(0.0042, 0.0034, {
            x: 0.0172,
            y: 0.0105,
            u: 0.086,
            seg: 14,
          }),
        );
        for (let Y0 = 0; Y0 < 3; Y0++)
          H0.add(
            e.steel,
            c(
              se(0.0838 + Y0 * 0.0018, 0.0077, 0.0846 + Y0 * 0.0018, 0.0133),
              4e-4,
              {
                x: 0.0191,
                b: 0,
              },
            ),
          );
      },
      !0,
    ),
    t &&
      a.add(
        y,
        c(se(0.0795, 0.004, 0.0925, 0.017, 0.003), 0.0012, {
          x: 0.0168,
          b: 5e-4,
          holes: [Kr(0.086, 0.0105, 0.0047, 12)],
        }),
      ),
    Ah("mag"));
  let e0 = o.magazine,
    p0 = a00(e0),
    t0 = r00(e0),
    M0 = AT(e0),
    f0 = Pp[e0],
    _0 = Gt(0, NO, Sr),
    F0 = (H0, Y0) => [
      M0.o[0] + M0.n[0] * H0 + M0.t[0] * Y0,
      M0.o[1] + M0.n[1] * H0 + M0.t[1] * Y0,
    ],
    m0 = (
      e0 === "ext" ? [-0.064, -0.104, -0.144, -0.184] : [-0.062, -0.094, -0.126]
    ).filter((H0) => H0 > f0 + 0.022),
    S0 = (H0) => {
      let Y0 = 2 * Hy * Math.max(0, Cp - H0),
        et = Math.hypot(Y0, 1);
      return Bt(0, -Y0 / et, 1 / et);
    },
    T0 = (H0, Y0, et) => {
      let ct = s.mark.userData.cells[H0],
        D0 = new PlaneGeometry(Y0, et),
        u0 = D0.attributes.uv;
      for (let w0 = 0; w0 < u0.count; w0++)
        u0.setXY(
          w0,
          ct[0] + u0.getX(w0) * (ct[2] - ct[0]),
          ct[1] + u0.getY(w0) * (ct[3] - ct[1]),
        );
      return D0;
    },
    j0 = T("mag", _0, (H0) => {
      let Y0 = e0 === "fast" ? y : w;
      if (t) {
        let et = l00(f0),
          ct = (za + 0.0052) / 2;
        (H0.add(w, et.body, et.rim),
          H0.add(e.black, et.cavity),
          H0.add(
            w,
            c(
              [
                F0(-za / 2 - 7e-4, -0.0048),
                F0(za / 2 + 7e-4, -0.0048),
                F0(za / 2 + 7e-4, -8e-4),
                F0(-za / 2 - 7e-4, -8e-4),
              ],
              nr + 0.0014,
              {
                b: 5e-4,
              },
            ),
          ),
          H0.add(
            Y0,
            c(
              [
                [...F0(-ct, -0.001), 8e-4],
                [...F0(ct, -0.001), 8e-4],
                [...F0(ct + 4e-4, 0.0016), 0.0016],
                [...F0(ct - 0.0016, 0.0042), 0.0014],
                [...F0(-ct + 0.0012, 0.0042), 0.0014],
                [...F0(-ct - 4e-4, 0.0016), 0.0016],
              ],
              nr + 0.0034,
              {
                b: 0.0014,
                bs: 2,
                soft: !0,
              },
            ),
          ));
        {
          let D0 = F0(0.0045, 0.0042),
            u0 = Bt(0, M0.t[1], -M0.t[0]),
            w0 = Gt(0, D0[1], D0[0]);
          (H0.add(e.black, Ap(0.0032, w0, u0, 8e-5)),
            H0.add(e.pin, Ap(0.0025, w0, u0, 16e-5, 12)));
        }
        (H0.add(
          e.black,
          c(
            se(Sr - za / 2 - 22e-5, -0.0102, Sr - za / 2 + 3e-4, -0.0058),
            0.0074,
            {
              b: 0,
            },
          ),
        ),
          m0.forEach((D0, u0) => {
            let w0 = S0(D0),
              P0 = w2(0.001, -za / 2, D0);
            (H0.add(e.pin, Ap(0.0024, P0, w0, 6e-5)),
              H0.add(e.black, Ap(0.00185, P0, w0, 12e-5)));
            for (let q0 of [-1, 1]) {
              let v0 = w2((q0 * nr) / 2, 0, D0),
                x0 = Bt(q0, 0, 0);
              (H0.add(e.pin, Ap(0.0024, v0, x0, 6e-5)),
                H0.add(e.black, Ap(0.00185, v0, x0, 12e-5)));
            }
            let st = T0("w" + (u0 + 1) * 10, 0.004, 0.0029),
              J0 = w2(0.0061, -za / 2, D0).addScaledVector(w0, 25e-5);
            (st.rotateX(F5(D0)),
              st.translate(J0.x, J0.y, J0.z),
              H0.add(s.mark, Qe(st)));
          }));
        for (let [D0, u0, w0, P0] of [
          [e0 === "ext" ? "n48" : "n32", 0.0056, 0.0039, 0.0108],
          ["cal", 0.015, 0.0033, -0.0036],
        ]) {
          let st = f0 + 0.007,
            J0 = T0(D0, u0, w0),
            q0 = w2(-nr / 2 - 2e-4, P0, st);
          (J0.rotateY(-Math.PI / 2),
            J0.rotateX(F5(st)),
            J0.translate(q0.x, q0.y, q0.z),
            H0.add(s.mark, Qe(J0)));
        }
        for (let D0 of [-1, 1])
          (H0.add(
            w,
            h(
              [
                [D0 * 0.0106, 0.0116],
                [D0 * 0.0106, 0.0156, 0.003],
                [D0 * 0.0072, 0.0186, 0.0012],
                [D0 * 0.0056, 0.0181],
                [D0 * 0.006, 0.0171, 6e-4],
                [D0 * 0.0094, 0.015, 0.0024],
                [D0 * 0.0097, 0.0116],
              ],
              0.0152,
              {
                u: Sr - 0.0168,
                b: 4e-4,
                cs: 3,
              },
            ),
          ),
            H0.add(
              w,
              h(
                [
                  [D0 * 0.0106, 0.0116],
                  [D0 * 0.0106, 0.0149, 0.0026],
                  [D0 * 0.0084, 0.0171, 0.001],
                  [D0 * 0.0073, 0.0166],
                  [D0 * 0.0076, 0.0158, 5e-4],
                  [D0 * 0.0095, 0.0141, 0.0018],
                  [D0 * 0.0097, 0.0116],
                ],
                0.0112,
                {
                  u: Sr - 0.0016,
                  b: 4e-4,
                  cs: 3,
                },
              ),
            ));
        H0.add(
          w,
          c(se(Sr - 0.017, 0.0114, Sr - 0.0142, 0.0176, 8e-4), nr - 0.0024, {
            b: 6e-4,
          }),
        );
      } else
        (H0.add(
          w,
          c(p0, nr, {
            b: 0.0016,
            bs: 2,
            soft: !0,
          }),
        ),
          H0.add(
            Y0,
            c(t0, nr + 0.0034, {
              b: 0.0014,
              bs: 2,
            }),
          ));
      if (e0 === "fast") {
        H0.add(
          e.rubber,
          c(
            [
              [...F0(-0.015, 0.0035), 0.003],
              [...F0(0.015, 0.0035), 0.003],
              [...F0(0.0125, 0.033), 0.009],
              [...F0(-0.0125, 0.033), 0.009],
            ],
            0.012,
            {
              b: 0.0026,
              bs: 2,
              soft: !0,
              keepHoles: !0,
              holes: [
                [
                  [...F0(-0.0085, 0.01), 0.003],
                  [...F0(0.0085, 0.01), 0.003],
                  [...F0(0.007, 0.0265), 0.005],
                  [...F0(-0.007, 0.0265), 0.005],
                ],
              ],
            },
          ),
        );
        let et = f0 + 0.03;
        if (
          (H0.add(
            y,
            c(Sc(xk(et - 0.011, et + 0.004, 0.004), za + 0.004), nr + 0.0046, {
              b: 0.0014,
              bs: 2,
            }),
          ),
          t)
        )
          for (let ct of [-1, 1])
            H0.add(
              e.steel,
              p(0.0022, 0.0012, {
                x: ct * (nr / 2 + 0.0026),
                y: et - 0.0035,
                u: zp(et - 0.0035) + 0.01,
                seg: 6,
              }),
              p(0.0022, 0.0012, {
                x: ct * (nr / 2 + 0.0026),
                y: et - 0.0035,
                u: zp(et - 0.0035) - 0.01,
                seg: 6,
              }),
            );
      }
    });
  if (t) {
    let H0 = new Group();
    for (H0.name = "magIn", H0.userData.keep = !0; j0.children.length;)
      H0.add(j0.children[0]);
    (j0.add(H0), (I.magIn = H0));
    let Y0 = new Group();
    ((Y0.name = "magRounds"),
      (Y0.userData.keep = !0),
      (Y0.userData.rest = new Vector3()),
      H0.add(Y0),
      (i.magRounds = Y0));
    let et = I4();
    (HO(e, et, 0.0026, 0.0142, Sr - 0.0152),
      HO(e, et, -0.0026, 0.0098, Sr - 0.0152));
    for (let u0 of m0) {
      et.add(e.brass, Ap(0.00175, w2(0.001, -za / 2, u0), S0(u0), 18e-5, 10));
      for (let w0 of [-1, 1])
        et.add(
          e.brass,
          Ap(0.00175, w2((w0 * nr) / 2, 0, u0), Bt(w0, 0, 0), 18e-5, 10),
        );
    }
    et.build(Y0, _0);
    let ct = new Group();
    ((ct.name = "magFollower"),
      (ct.userData.keep = !0),
      (ct.userData.rest = new Vector3()),
      (ct.userData.hidden = !0),
      (ct.visible = !1),
      H0.add(ct),
      (i.magFollower = ct));
    let D0 = I4();
    (D0.add(
      s.orange,
      c(
        [
          [Sr - 0.015, 0.008],
          [Sr + 0.0152, 0.008],
          [Sr + 0.0152, 0.012, 0.001],
          [Sr + 0.005, 0.0144, 0.002],
          [Sr - 0.015, 0.0156, 0.001],
        ],
        nr - 0.0052,
        {
          b: 8e-4,
        },
      ),
    ),
      D0.add(
        s.orange,
        d(0.004, 0.02, {
          x: 0.0028,
          y: 0.013,
          u: Sr - 0.0142,
          seg: 12,
        }),
      ),
      D0.build(ct, _0));
  }
  Ah("stock");
  let Z0 = t ? I4() : a,
    lt = Gt(0, 0.031, -0.066);
  if (o.stock === "light")
    (Z0.add(
      y,
      c(DO, 0.014, {
        b: 0.003,
        bs: 2,
        soft: !0,
        keepHoles: !0,
        holes: [i00],
      }),
    ),
      Z0.add(
        e.rubber,
        c(
          [
            [-0.188, 0.0655, 0.003],
            [-0.194, 0.061, 0.003],
            [-0.1958, -0.03, 0.004],
            [-0.1905, -0.035, 0.003],
          ],
          0.02,
          {
            b: 0.003,
            bs: 2,
            soft: !0,
          },
        ),
      ),
      a.add(
        e.steel,
        p(0.0034, 0.017, {
          y: 0.044,
          u: -0.076,
          seg: 8,
        }),
      ),
      (R.stock = Zs(H1(DO), 0.014, {
        r: 0.003,
      })));
  else {
    for (let H0 of [-1, 1])
      (Z0.add(
        e.steel,
        d(0.0042, 0.19, {
          x: H0 * 0.0222,
          y: 0.031,
          u: -0.17,
          seg: 8,
        }),
      ),
        a.add(
          v,
          c(se(-0.058, 0.0245, 0.026, 0.0375, 0.003), 0.004, {
            x: H0 * 0.0206,
            b: 0.0012,
          }),
        ),
        t &&
          Z0.add(
            e.steel,
            d(0.0048, 0.003, {
              x: H0 * 0.0222,
              y: 0.031,
              u: 0.0185,
              seg: 8,
            }),
          ));
    if (
      (a.add(
        v,
        c(se(-0.0745, 0.024, -0.0605, 0.038, 0.002), 0.054, {
          b: 0.0014,
        }),
      ),
      Z0.add(
        e.steel,
        c(se(-0.1725, 0.0235, -0.16, 0.0385, 0.003), 0.053, {
          b: 0.0016,
        }),
      ),
      Z0.add(
        y,
        c(LO, 0.046, {
          b: 0.006,
          bs: 2,
          cs: 3,
          soft: !0,
        }),
      ),
      t)
    ) {
      for (let H0 = 0; H0 < 6; H0++)
        Z0.add(
          e.rubber,
          c(
            se(-0.1846, -0.04 + H0 * 0.017, -0.1826, -0.032 + H0 * 0.017),
            0.036,
            {
              b: 0,
            },
          ),
        );
      a.add(
        e.steel,
        c(
          [
            [-0.0745, 0.0252],
            [-0.0745, 0.0372],
            [-0.0768, 0.0366, 0.001],
            [-0.0792, 0.0282, 0.0015],
            [-0.0786, 0.0252, 0.001],
          ],
          0.013,
          {
            x: 0,
            b: 0.0012,
            bs: 2,
          },
        ),
      );
      for (let H0 = 0; H0 < 4; H0++)
        a.add(
          e.steel,
          c(
            se(
              -0.0796 + H0 * 65e-5,
              0.0276 + H0 * 0.0021,
              -0.0786 + H0 * 65e-5,
              0.0288 + H0 * 0.0021,
            ),
            0.0118,
            {
              x: 0,
              b: 0,
            },
          ),
        );
      a.add(
        e.pin,
        p(0.0015, 0.015, {
          y: 0.0358,
          u: -0.0756,
          seg: 6,
        }),
      );
    }
    R.stock = ds(
      ml([0.0222, 0.031, 0.17], [0.0222, 0.031, -0.02], 0.0042),
      ml([-0.0222, 0.031, 0.17], [-0.0222, 0.031, -0.02], 0.0042),
      Zs(H1(LO), 0.046, {
        r: 0.006,
      }),
    );
  }
  if (t) {
    let H0 = new Group();
    ((H0.name = "stock"),
      H0.position.copy(lt),
      (H0.userData.keep = !0),
      n.add(H0),
      Z0.build(H0, lt),
      (I.stock = H0));
  }
  if ((Ah("sights"), o.optic === "irons")) {
    a.add(
      e.steel,
      c(
        [
          [Pa - 0.021, sr - 0.003],
          [Pa + 0.019, sr - 0.003],
          [Pa + 0.017, sr + 0.006, 0.002],
          [Pa - 0.019, sr + 0.006, 0.002],
        ],
        0.022,
        {
          b: 0.0012,
        },
      ),
    );
    let H0 = sr + 0.006,
      Y0 = Ac - 0.0085,
      et = Ac + 0.0085,
      ct = 0.0098;
    if (
      (a.add(
        e.steel,
        x(ct + 8e-4, Y0 - H0, {
          y: H0,
          u: Pa,
          seg: 24,
        }),
        x(ct + 6e-4, 0.0034, {
          y: et,
          u: Pa,
          seg: 24,
          r2: ct - 8e-4,
        }),
      ),
      t)
    ) {
      let D0 = d00(
        ct,
        ct - 0.0019,
        Y0,
        et,
        Ac,
        [0.0054, 0.0036, 0.0062, 0.003],
      );
      (a.add(e.steel, bh(D0.wall, 0, 0, Pa)),
        a.add(e.black, bh(D0.liner, 0, 0, Pa)));
      for (let u0 = 0; u0 < 20; u0++) {
        let w0 = c(se(-6e-4, et + 5e-4, 6e-4, et + 0.003), 8e-4, {
          x: ct + 6e-4,
          b: 0,
        });
        (w0.rotateY(Ze(u0 * 18)), w0.translate(0, 0, -Pa), a.add(e.steel, w0));
      }
      a.add(
        e.steel,
        x(0.003, 0.001, {
          y: et + 0.0032,
          u: Pa,
          seg: 10,
        }),
      );
      {
        let u0 = s.mark.userData.cells.drum,
          w0 = (u0[2] - u0[0]) / 4;
        for (let P0 = 0; P0 < 4; P0++) {
          let st = new PlaneGeometry(0.0021, 0.0026),
            J0 = st.attributes.uv;
          for (let q0 = 0; q0 < J0.count; q0++)
            J0.setXY(
              q0,
              u0[0] + w0 * (P0 + 0.02 + J0.getX(q0) * 0.52),
              u0[1] + J0.getY(q0) * (u0[3] - u0[1]),
            );
          (st.translate(0, Ac + 0.0068, ct + 22e-5),
            st.rotateY((-P0 * Math.PI) / 2),
            st.translate(0, 0, -Pa),
            a.add(s.mark, Qe(st)));
        }
      }
      (a.add(
        e.white,
        h(se(-4e-4, sr + 0.0012, 4e-4, sr + 0.005), 4e-4, {
          u: Pa - 0.0204,
          b: 0,
        }),
      ),
        a.add(
          e.steel,
          p(0.003, 0.004, {
            x: 0.0125,
            y: sr + 0.002,
            u: Pa,
            seg: 10,
          }),
          p(0.0016, 0.005, {
            x: 0.0128,
            y: sr + 0.002,
            u: Pa,
            seg: 6,
          }),
        ),
        a.add(
          e.white,
          c(se(Pa - 0.0096, sr + 0.001, Pa - 0.0086, sr + 0.0046), 6e-4, {
            x: -0.0111,
            b: 0,
          }),
        ));
      for (let u0 of [-1, 1])
        a.add(
          e.steel,
          c(se(Pa - 0.0185, sr + 0, Pa - 0.0125, sr + 0.0085, 0.0015), 0.003, {
            x: u0 * 0.0092,
            b: 0.001,
          }),
        );
    } else
      a.add(
        e.steel,
        x(ct, et - Y0, {
          y: Y0,
          u: Pa,
          seg: 12,
        }),
      );
    ((S.sight = Gt(0, Ac, Pa)),
      (R.rsight = Zn([0, sr + 0.014, -Pa], [0.011, 0.016, 0.0115], 0.003)),
      _("optic", Gt(0, sr, 0.04)));
  } else {
    let et = o.optic === "holo" ? 0.034 : 0.024;
    (a.add(
      e.alu,
      c(
        [
          [-0.05, sr - 0.004],
          [0.106, sr - 0.004],
          [0.106, Hn - 0.0074],
          [-0.05 + 0.004, Hn - 0.0074, 0.002],
          [-0.05, Hn - 0.011, 0.001],
        ],
        0.0206,
        {
          b: 0.001,
        },
      ),
    ),
      a.add(
        e.alu,
        t
          ? xy(-0.05 + 0.004, 0.106, Hn - 0.0075)
          : c(se(-0.05 + 0.004, Hn - 0.0075, 0.106, Hn), 0.0206, {
              b: 0,
            }),
      ));
    for (let P0 of [-0.03, 0.082])
      (a.add(
        e.alu,
        h(uk(Mo + 0.0034, Mo - 8e-4, -12, 192, t ? 10 : 6), 0.016, {
          u: P0 - 0.008,
          y: Ml,
          b: 0.001,
          soft: !0,
        }),
      ),
        t &&
          a.add(
            e.steel,
            p(0.0062, 0.005, {
              x: -(Mo + 0.0058),
              y: Ml + 0.003,
              u: P0,
              seg: 8,
            }),
            p(0.0036, 0.003, {
              x: Mo + 0.0046,
              y: Ml + 0.003,
              u: P0,
              seg: 8,
            }),
          ));
    let ct = _("optic", Gt(0, Hn, et)),
      D0 = ct.position,
      u0 = Mp(o.optic),
      w0 = L(u0);
    if (
      ((S.sight = u0.eye.clone().add(D0)),
      (S.sight.z -= yk[o.optic] ?? 0.11),
      (R.rail = Zn(
        [0, (sr + Hn) / 2, -(-0.05 + 0.106) / 2],
        [0.0225, (Hn - sr) / 2 + 0.004, (0.106 - -0.05) / 2],
        0.001,
      )),
      (R.optic = O(w0, D0, 0.003)),
      t)
    )
      A(u0, ct);
    else {
      let P0 = -(w0.max.z + D0.z),
        st = -(w0.min.z + D0.z),
        J0 = u0.window || [0.03, 0.022],
        q0 = Hn + (u0.height ?? 0.035),
        v0 = J0[0] / 2,
        x0 = J0[1] / 2,
        C0 = 0.0045,
        k0 = Math.min(0.03, (st - P0) * 0.55),
        O0 = b("metal", e.aluLt);
      if (o.optic === "holo")
        (a.add(
          O0,
          us(
            [
              [P0, Hn - 0.004],
              [st, Hn - 0.004],
              [st, Hn + 0.012],
              [st - 0.006, Hn + 0.019],
              [P0 + 0.03, Hn + 0.019],
              [P0 + 0.022, Hn + 0.012],
              [P0, Hn + 0.012],
            ],
            0.04,
            {
              b: 0.002,
            },
          ),
        ),
          a.add(
            O0,
            si(
              [
                [-v0 - C0, Hn + 0.016],
                [v0 + C0, Hn + 0.016],
                [v0 + C0, q0 + x0 + C0 - 0.004],
                [v0 + C0 - 0.004, q0 + x0 + C0],
                [-v0 - C0 + 0.004, q0 + x0 + C0],
                [-v0 - C0, q0 + x0 + C0 - 0.004],
              ],
              k0,
              {
                u: st - k0 - 0.004,
                keepHoles: !0,
                holes: [se(-v0, q0 - x0, v0, q0 + x0)],
                b: 0,
              },
            ),
          ),
          a.add(
            O0,
            us(
              [
                [st - k0 - 0.004, Hn + 0.019],
                [st - k0 - 0.02, Hn + 0.019],
                [st - k0 - 0.004, q0 + x0],
              ],
              0.003,
              {
                x: v0 + C0 - 0.0015,
                b: 0,
              },
            ),
            us(
              [
                [st - k0 - 0.004, Hn + 0.019],
                [st - k0 - 0.02, Hn + 0.019],
                [st - k0 - 0.004, q0 + x0],
              ],
              0.003,
              {
                x: -(v0 + C0 - 0.0015),
                b: 0,
              },
            ),
          ),
          a.add(
            e.pin,
            Wn(0.0085, 0.006, {
              x: v0 + C0 + 0.004,
              y: Hn + 0.01,
              u: P0 + 0.014,
              seg: 8,
            }),
          ));
      else {
        a.add(
          O0,
          us(
            [
              [P0, Hn - 0.004],
              [st, Hn - 0.004],
              [st, Hn + 0.01],
              [st - 0.004, Hn + 0.013],
              [P0 + 0.02, Hn + 0.013],
              [P0 + 0.01, Hn + 0.02, 0.003],
              [P0, Hn + 0.018],
            ],
            0.036,
            {
              b: 0.0018,
            },
          ),
        );
        let B0 = si(
          [
            [-v0 - C0, Hn + 0.012],
            [v0 + C0, Hn + 0.012],
            [v0 + C0, q0 + x0 + C0 - 0.005],
            [v0 + C0 - 0.005, q0 + x0 + C0],
            [-v0 - C0 + 0.005, q0 + x0 + C0],
            [-v0 - C0, q0 + x0 + C0 - 0.005],
          ],
          0.006,
          {
            u: 0,
            keepHoles: !0,
            holes: [se(-v0, q0 - x0, v0, q0 + x0)],
            b: 0,
          },
        );
        (B0.translate(0, -(Hn + 0.012), 0),
          B0.rotateX(-0.14),
          B0.translate(0, Hn + 0.012, -(st - 0.012)),
          a.add(O0, B0));
      }
      a.add(
        e.pin,
        Wn(0.0052, 0.005, {
          x: -0.0205,
          y: Hn + 0.004,
          u: (P0 + st) / 2 - 0.012,
          seg: 6,
        }),
        Wn(0.0052, 0.005, {
          x: -0.0205,
          y: Hn + 0.004,
          u: (P0 + st) / 2 + 0.014,
          seg: 6,
        }),
      );
    }
  }
  return (
    (S.eject = Gt(Mo + 0.001, 0.0425, 0.094)),
    (S.ejectDir = Bt(0.88, 0.34, 0.33).normalize()),
    a.build(n),
    {
      root: n,
      parts: i,
      anchors: S,
      mounts: E,
      X: R,
      hold: C,
      fx: I,
      bins: a,
      MAGP: p0,
      MFLOOR: t0,
      magPivot: _0,
    }
  );
}
var p00 = (o) => (o * 180) / Math.PI;
var yk = {
  irons: 0.135,
  reflex: 0.11,
  holo: 0.11,
};
function buildSMG(o = {}) {
  let t = h00(o.build);
  if ((o.detail || "view") !== "view") return g00(t);
  let e = performance.now();
  F4 = {};
  let s = jO(t, !0),
    { root: n, parts: i, anchors: a } = s,
    r = F4;
  F4 = null;
  let l = performance.now(),
    c = {
      id: "smg",
      root: n,
      parts: i,
      build: t,
      anchors: a,
      mounts: s.mounts,
      triStats: r,
      fx: s.fx,
      hip: {
        pos: Bt(0.112, -0.142, -0.3),
        rot: new Euler(0.03, 0.07, 0),
      },
      adsDist: yk[t.optic] ?? 0.11,
      dims: {
        BORE: Cs,
        TUBE: vo,
        TR: ii,
        CH_U: F1,
        CH_ANG: kc,
        CH_PULL: mk,
        CH_LOCK: gk,
        BOLT_TRAVEL: s00,
        WELL_Y: NO,
        MAG_C0: Sr,
        magBottom: Pp[t.magazine],
        SIGHT: Ac,
        HG0: M2,
        HG1: I5,
      },
      ms: {},
    };
  c.hold = s.hold;
  let h = (c.proxies = {
    ...s.X,
  });
  if (
    ((h.grip = Zs(H1(VO), 0.033, {
      r: 0.0045,
    })),
    (h.housing = Zs(H1(GO), 0.033, {
      r: 0.0016,
    })),
    (h.tguard = Zs(H1(WO), 0.014, {
      r: 0.0011,
    })),
    (h.trigger = Zs(H1(qO), 0.0066, {
      r: 0.0013,
    })),
    (h.receiver = Iu(H1(UO(12)), -0.0745, 0.17, {
      r: 5e-4,
    })),
    (h.well = ds(
      Zs(H1(KO), 0.0292, {
        r: 0.0012,
      }),
      Zs(H1(dk), 0.033, {
        r: 0.001,
      }),
      h.funnel,
    )),
    (h.paddle = Zs(H1(XO), 0.015, {
      r: 0.0012,
    })),
    (h.mag = ds(
      Zs(H1(s.MAGP), nr, {
        r: 0.0016,
      }),
      Zs(H1(s.MFLOOR), nr + 0.0034, {
        r: 0.0014,
      }),
    )),
    t.magazine === "fast")
  ) {
    let d = Pp.fast + 0.03,
      m = AT("fast"),
      p = (x, g) => [
        m.o[0] + m.n[0] * x + m.t[0] * g,
        m.o[1] + m.n[1] * x + m.t[1] * g,
      ];
    h.mag = ds(
      h.mag,
      Zs(H1(Sc(xk(d - 0.011, d + 0.004, 0.004), za + 0.004)), nr + 0.0046, {
        r: 0.0014,
      }),
      Zs(
        [
          p(-0.015, 0.0035),
          p(0.015, 0.0035),
          p(0.0125, 0.033),
          p(-0.0125, 0.033),
        ],
        0.012,
        {
          r: 0.0026,
        },
      ),
    );
  }
  ((h.tube = ml([0, vo, -0.166], [0, vo, -0.3385], ii, 0.001)),
    (h.handguard = ds(
      QH(8, Tr, Cs, M2 - 0.002, I5, 8e-4),
      h.handstop,
      h.urail,
      h.under,
      h.vgrip,
    )),
    (h.barrel = b2([0, Cs, -0.3], [0, Cs, -0.346], 0.01)),
    (h.fsight = ds(
      Zn([0, (Cs + vo) / 2 - 0.002, -0.324], [0.0078, 0.026, 0.0108], 0.002),
      t.optic === "irons"
        ? ml([0, Ac, -0.3172], [0, Ac, -0.3307], 0.0128, 0.001)
        : null,
    )));
  {
    let d = Bt(Math.cos(Ze(kc)), Math.sin(Ze(kc)), 0),
      m = d.clone().multiplyScalar(0.006),
      p = d.clone().multiplyScalar(0.0345);
    h.handle = b2([m.x, vo + m.y, -F1], [p.x, vo + p.y, -F1], 0.0068);
  }
  ((h.body = ds(
    h.grip,
    h.housing,
    h.tguard,
    h.receiver,
    h.well,
    h.stock,
    h.rsight,
    h.rail,
    h.optic,
  )),
    (h.front = ds(h.handguard, h.tube, h.barrel, h.fsight, h.muzzle)),
    (h.all = ds(h.body, h.front, h.trigger, h.paddle, h.mag, h.handle)),
    (c.arms = new hf(c)),
    (c.hands = {
      right: c.arms.R.root,
      left: c.arms.L.root,
    }));
  let f = performance.now();
  m00(c);
  let u = performance.now();
  return (
    PO(c),
    (c.ms = {
      geometry: Math.round(l - e),
      proxies: Math.round(f - l),
      grips: Math.round(u - f),
      clips: Math.round(performance.now() - u),
      total: Math.round(performance.now() - e),
    }),
    c
  );
}
var FO = new Map();
function m00(o) {
  let t = o.proxies,
    e = performance.now(),
    s = globalThis.GH_TUNE || {},
    n = (h, f) => s[h] ?? f,
    i = o.build,
    a = (o.grips = {}),
    r = (o.bakeTimes = {});
  o.miss = {};
  let l = (h, f) => {
      let u = performance.now(),
        d = !globalThis.GH_TUNE && FO.get(h);
      if (!d) {
        ((d = {}),
          f(
            (m, p, x, g, b, v = {}) =>
              (d[m] = {
                name: m,
                side: p,
                pos: x.pos,
                quat: x.quat,
                pose: g,
                sd: b,
                ...v,
              }),
          ));
        for (let m in d) {
          let p = d[m],
            x = p.side === "R" ? 1 : -1;
          ((p.pen = yi(x, p.pos, p.quat, p.pose, p.sd)),
            (p.gaps = Tc(x, p.pos, p.quat, p.pose, p.sd)));
        }
        (FO.set(h, d), (r[h] = Math.round(performance.now() - u)));
      }
      for (let m in d) {
        let p = d[m];
        a[m] = {
          ...p,
          pos: p.pos.clone(),
          quat: p.quat.clone(),
          pose: new Float32Array(p.pose),
        };
      }
    },
    c = Bt(Math.cos(Ze(kc)), Math.sin(Ze(kc)), 0);
  (l("R|" + (i.magazine === "fast" ? "f" : "s"), (h) => {
    let f = Bt(0, -0.33, -0.944).normalize(),
      u = Bt(-1, 0, 0),
      d = Ze(n("fpsi", 12)),
      m = f
        .clone()
        .multiplyScalar(Math.cos(d))
        .addScaledVector(u, -Math.sin(d)),
      p = u.clone().multiplyScalar(Math.cos(d)).addScaledVector(f, Math.sin(d)),
      x = Yo(
        1,
        Gt(0.0175, n("fy", -0.044), n("fu", 0.014)),
        m,
        p,
        [0.0065, 0.086, 0.0125],
      ),
      g = ds(
        t.grip,
        t.housing,
        t.tguard,
        t.receiver,
        t.well,
        t.trigger,
        t.paddle,
        t.mag,
      ),
      b = gs(
        {
          i: [-6, 13, 4, 2],
          t: [-20, 30, 0, 0, 0],
          cup: n("fcup", 10),
        },
        pn.pre,
      );
    zi(1, x.pos, x.quat, b, g, p, {
      max: 0.025,
    });
    let v = yo(1, x.pos, x.quat, b, g, {
      fingers: [1, 2, 3],
    });
    ((v[16] = 32),
      (v[17] = 38),
      (v[18] = -90),
      (v[19] = 35),
      (v[20] = 20),
      Mn(
        1,
        x.pos,
        x.quat,
        v,
        4,
        Gt(-0.0165, n("ty", -0.022), n("tu", 0.02)),
        g,
        {
          normal: Bt(1, 0, 0),
          lim: {
            16: [0, 60],
            17: [0, 58],
            18: [-115, -50],
            19: [0, 60],
            20: [0, 70],
          },
        },
      ),
      (v[0] = 4),
      (v[1] = 12),
      (v[2] = 6),
      (v[3] = 3),
      (o.miss.index = Mn(
        1,
        x.pos,
        x.quat,
        v,
        0,
        Gt(n("ix", 0.0156), n("iy", -0.0255), n("iu", 0.1035)),
        g,
        {
          normal: Bt(-1, 0, 0),
        },
      )),
      h("fire", "R", x, v, g));
    let y = new Float32Array(v);
    ((y[0] = 30),
      (y[1] = 0),
      (y[2] = 60),
      (y[3] = 30),
      Mn(1, x.pos, x.quat, y, 0, Gt(5e-4, -0.025, 0.0655), g),
      h("trigger", "R", x, y, g));
    let M = ds(
        t.grip,
        t.housing,
        t.tguard,
        t.receiver,
        t.well,
        t.paddle,
        t.mag,
      ),
      w = new Float32Array(y);
    (Mn(1, x.pos, x.quat, w, 0, Gt(5e-4, -0.025, 0.0612), M),
      h("press", "R", x, w, M));
  }),
    l("S|" + i.underbarrel, (h) => {
      if (t.vgrip && o.hold) {
        let f = o.hold,
          u = ds(t.handguard, t.tube, t.barrel, t.well),
          d = Yo(
            -1,
            f.at.clone().add(Bt(0, n("vy", 0), n("vu", 0))),
            f.fingers,
            f.palm,
            [n("vpx", 0.004), n("vpy", 0.062), 0.0125],
          ),
          m = gs(
            {
              t: [-20, 30, -60, 0, 0],
              cup: 8,
            },
            pn.pre,
          );
        zi(-1, d.pos, d.quat, m, u, f.palm.clone().normalize(), {
          max: 0.02,
        });
        let p = yo(-1, d.pos, d.quat, m, u, {
          fingers: [0, 1, 2, 3],
        });
        ((p[16] = 32),
          (p[17] = 38),
          (p[18] = -90),
          (p[19] = 35),
          (p[20] = 20),
          (o.miss.vgripThumb = Mn(
            -1,
            d.pos,
            d.quat,
            p,
            4,
            f.at
              .clone()
              .add(Bt(n("vtx", 0.0235), n("vty", 0.012), n("vtz", 0.017))),
            u,
            {
              normal: Bt(n("vnx", -0.5), 0, -0.85),
              lim: {
                16: [0, 60],
                17: [0, 58],
                18: [-115, -50],
                19: [0, 60],
                20: [0, 70],
              },
            },
          )));
        {
          let x = Tc(-1, d.pos, d.quat, p, u);
          for (let g = 0; g < 4; g++)
            if (x[g] > 0.003) {
              let b = new Float32Array(p);
              ((b[g * 4] = 30), (b[g * 4 + 2] = 45), (b[g * 4 + 3] = 20));
              let v = yo(-1, d.pos, d.quat, b, u, {
                fingers: [g],
              });
              for (let y = g * 4; y < g * 4 + 4; y++) p[y] = v[y];
            }
        }
        h("support", "L", d, p, u);
      } else {
        let f = !!t.under,
          u = n("su", f ? 0.19 : 0.232),
          d = Ze(n("sb", 75)),
          m = Ze(n("sg", f ? 22 : 46)),
          p = Bt(Math.cos(d), Math.sin(d), 0),
          g = Bt(Math.sin(d), -Math.cos(d), 0)
            .clone()
            .multiplyScalar(Math.cos(m))
            .add(Bt(0, 0, -Math.sin(m))),
          b = Gt(-p.x * Tr, Cs - p.y * Tr, u),
          v = Yo(-1, b, g, p, [0.004, n("sp", 0.06), 0.0125]),
          y = ds(t.handguard, t.tube, t.barrel, t.well, t.receiver, t.handle),
          M = gs(
            {
              t: [-22, 18, 0, 6, 0],
              cup: n("scup", 6),
            },
            pn.pre,
          );
        zi(-1, v.pos, v.quat, M, y, p, {
          max: 0.02,
        });
        let w = yo(-1, v.pos, v.quat, M, y, {
          fingers: [0, 1, 2, 3],
        });
        ((w[16] = 0),
          (w[17] = 20),
          (w[18] = -50),
          (w[19] = 8),
          (w[20] = 5),
          Mn(
            -1,
            v.pos,
            v.quat,
            w,
            4,
            Gt(n("stx", -0.0205), Cs + n("sty", 0.005), u + n("stu", 0.06)),
            y,
            {
              normal: Bt(0.92, -0.38, 0),
              lim: {
                16: [-25, 40],
                17: [-10, 50],
                18: [-115, 20],
                19: [0, 40],
                20: [-5, 40],
              },
            },
          ),
          h("support", "L", v, w, y));
      }
    }),
    l("M|" + i.magazine, (h) => {
      let f = t.mag,
        u = ds(t.mag, t.paddle, t.tguard, t.grip),
        d = Pp[i.magazine],
        m = (g, b, v, y = 0) => {
          let M = Ze(b),
            w = F5(g) + y,
            T = Bt(0, Math.sin(w) + n("mfy", 0.1), -Math.cos(w)).normalize(),
            S = Bt(1, 0, 0),
            E = T.clone()
              .multiplyScalar(Math.cos(M))
              .addScaledVector(S, -Math.sin(M)),
            _ = S.clone()
              .multiplyScalar(Math.cos(M))
              .addScaledVector(T, Math.sin(M)),
            R = Yo(-1, Gt(-nr / 2, g, zp(g) + za / 2), E, _, v),
            C = gs(
              {
                t: [-20, 30, 0, 0, 0],
                cup: 8,
              },
              pn.pre,
            );
          zi(-1, R.pos, R.quat, C, f, _, {
            max: 0.03,
          });
          let L = yo(-1, R.pos, R.quat, C, f, {
            fingers: [0, 1, 2, 3],
            skin: n("mskin", 0.003),
          });
          return {
            fr: R,
            a: L,
            f: E,
            n: _,
          };
        },
        p = (g, b, v) => {
          let { fr: y, a: M } = g,
            w = Tc(-1, y.pos, y.quat, M, f);
          o.miss[v + "Fit"] = Math.max(w[0], w[1], w[2], w[3]);
          for (let T of [0, 3]) {
            let S = yi(-1, y.pos, y.quat, M, f, [
              2 + 3 * T,
              3 + 3 * T,
              4 + 3 * T,
            ]).depth;
            if (w[T] < 0.003 && S < 5e-4) continue;
            let E = b + (T === 0 ? 0.024 : -0.04);
            ((M[T * 4] = -6),
              (M[T * 4 + 2] = 30),
              (M[T * 4 + 3] = 16),
              (o.miss[v + "F" + T] = Mn(
                -1,
                y.pos,
                y.quat,
                M,
                T,
                Gt(-nr / 2 - 5e-4, E, zp(E) + za / 2 - 0.004),
                f,
                {
                  normal: Bt(1, 0, 0.4),
                  free: [T * 4, T * 4 + 1, T * 4 + 2, T * 4 + 3],
                },
              )));
          }
        },
        x = {
          16: [-10, 60],
          17: [-15, 58],
          18: [-115, -20],
          19: [0, 65],
          20: [0, 80],
        };
      {
        let g = n("my", -0.078),
          b = m(g, n("mpsi", -22), [n("mpx", 0.012), n("mpy", 0.122), 0.0105]),
          { fr: v, a: y } = b;
        (p(b, g, "mag"),
          (y[16] = 20),
          (y[17] = 30),
          (y[18] = -70),
          (y[19] = 20),
          (y[20] = 30));
        let M = Gt(n("mtx", -0.004), n("mty", -0.064), n("mtu", 0.0868));
        ((o.miss.magThumb = Mn(-1, v.pos, v.quat, y, 4, M, u, {
          normal: Bt(0, 0.1, -1),
          lim: x,
        })),
          h("mag", "L", v, y, u, {
            part: "mag",
          }));
        let w = new Float32Array(y);
        (Mn(-1, v.pos, v.quat, w, 4, M.clone().add(Bt(0, 0.001, -0.0042)), f, {
          normal: Bt(0, 0.1, -1),
          lim: x,
        }),
          h("magPress", "L", v, w, f, {
            part: "mag",
          }));
      }
      {
        let g = i.magazine === "fast",
          b = d + n("qy", g ? 0.052 : 0.032),
          v = m(
            b,
            n("qpsi", -14),
            [n("qpx", 0.008), n("qpy", 0.118), 0.0105],
            Ze(n("qtilt", g ? 6 : 20)),
          ),
          { fr: y, a: M } = v;
        {
          let S = b + n("qiy", 0.02),
            E = Bt(0, Math.sin(F5(S)), -Math.cos(F5(S)));
          ((M[0] = 10),
            (M[1] = 0),
            (M[2] = 70),
            (M[3] = 36),
            (o.miss.seatIndex = Mn(
              -1,
              y.pos,
              y.quat,
              M,
              0,
              w2(n("qix", 0.003), za / 2, S).addScaledVector(E, 8e-4),
              f,
              {
                normal: E.clone().negate(),
                free: [0, 1, 2, 3],
              },
            )));
        }
        {
          let S = Tc(-1, y.pos, y.quat, M, f);
          o.miss.seatFit = Math.max(S[0], S[1], S[2]);
        }
        ((M[16] = 20), (M[17] = 30), (M[18] = -70), (M[19] = 20), (M[20] = 30));
        let w = b + n("qty", 0.02),
          T = Bt(0, -Math.sin(F5(w)), Math.cos(F5(w)));
        if (
          ((o.miss.seatThumb = Mn(
            -1,
            y.pos,
            y.quat,
            M,
            4,
            w2(n("qtx", -0.001), -za / 2, w).addScaledVector(T, 6e-4),
            f,
            {
              normal: T.clone().negate(),
              lim: x,
            },
          )),
          !g)
        ) {
          let S = AT(i.magazine),
            E = Bt(0, -S.t[1], S.t[0]),
            _ = n("qls", 0.004),
            R = 0.0046;
          ((M[12] = 40),
            (M[13] = 0),
            (M[14] = 70),
            (M[15] = 40),
            (o.miss.seatLittle = Mn(
              -1,
              y.pos,
              y.quat,
              M,
              3,
              Gt(
                n("qlx", 0.001),
                S.o[1] + S.n[1] * _ + S.t[1] * R,
                S.o[0] + S.n[0] * _ + S.t[0] * R,
              ).addScaledVector(E, -8e-4),
              f,
              {
                normal: E,
                free: [12, 13, 14, 15],
              },
            )));
        }
        h("magSeat", "L", y, M, f, {
          part: "mag",
        });
      }
    }),
    l("C|" + (i.optic === "irons" ? "i" : "o") + i.underbarrel, (h) => {
      let f = (E, _) => {
          let R = c.clone().multiplyScalar(E);
          return Bt(R.x, R.y + vo, -(F1 + _));
        },
        u = Ze(n("cfa", 45)),
        d = Bt(Math.cos(u), Math.sin(u), n("cfz", 0.05)).normalize(),
        m = Bt(n("cnx", -0.16), n("cny", 0.06), 1).normalize(),
        p = Yo(-1, f(n("cr", 0.03), 0), d, m, [
          n("cpx", 0.031),
          n("cpy", t.under ? 0.15 : 0.135),
          n("cpz", 0.042),
        ]),
        x = ds(t.handle, t.tube, t.handguard, t.fsight, t.barrel),
        g = gs({
          i: [-4, 3, n("cip", 28), 14],
          m: [n("cmm", 82), 0, n("cmp", 96), 50],
          r: [n("crm", 84), -2, n("crp", 102), 54],
          l: [n("clm", 86), -5, 98, 60],
          t: [n("ct0", 12), n("ct1", 18), n("ct2", -24), 14, 16],
          cup: 12,
        }),
        b = yo(-1, p.pos, p.quat, g, x, {
          fingers: [0],
          max: {
            mcp: 70,
          },
          skin: n("cskin", 0.0024),
        });
      {
        let E = Tc(-1, p.pos, p.quat, b, x);
        ((o.miss.cockIndexGap = E[0]), (o.miss.cockMiddleGap = E[1]));
      }
      h("cock", "L", p, b, x, {
        part: "chargingHandle",
      });
      let v = Ze(kc) + gk,
        y = Bt(Math.cos(v), Math.sin(v), 0),
        M = y.clone().multiplyScalar(0.0405);
      M.y += vo;
      let w = Bt(n("lfx", 0.78), n("lfy", 0.16), n("lfz", -0.6)).normalize(),
        T = Bt(n("lnx", -0.1), n("lny", -0.98), n("lnz", -0.1)).normalize(),
        S = Yo(-1, Bt(M.x, M.y + 0.0012, -(F1 - mk)), w, T, [
          n("lpx", 0.006),
          n("lpy", 0.04),
          0.015,
        ]);
      h(
        "slap",
        "L",
        S,
        gs({
          i: [n("lm0", 22), 2, 32, 16],
          m: [n("lm0", 22) + 5, 0, 38, 19],
          r: [n("lm0", 22) + 10, -1, 44, 22],
          l: [n("lm0", 22) + 15, -4, 50, 25],
          t: [n("lt0", -14), n("lt1", 8), n("lt2", -6), 10, 14],
          cup: 14,
        }),
        ds(t.tube, t.handguard, t.receiver, t.fsight),
      );
    }),
    l("G", (h) => {
      let f = [0, n("gy", 0.076), n("gz", 0.045)],
        u = (x, g, b) => Math.hypot(x - f[0], g - f[1], b - f[2]) - 0.0325,
        d = Bt(0, 0, 0),
        m = new Quaternion(),
        p = yo(
          -1,
          d,
          m,
          gs(
            {
              t: [-10, 46, -50, 0, 0],
              cup: 12,
            },
            pn.pre,
          ),
          u,
          {
            fingers: [0, 1, 2, 3],
            thumb: [
              [16, 48],
              [17, 6],
              [19, 55],
              [20, 65],
            ],
          },
        );
      h(
        "frag",
        "L",
        {
          pos: d,
          quat: m,
        },
        p,
        u,
        {
          at: f,
        },
      );
    }),
    (o.bakeMs = performance.now() - e));
}
var OO = new Map();
function g00(o) {
  let t = bk(),
    e = o.camo !== "factory" ? o.camo : null,
    s = f00(o) + (e ? "|c" : "|f"),
    n = OO.get(s);
  if (!n) {
    let c = jO(o, !1),
      h = [],
      f = [],
      u = new Color(),
      d = new Matrix4(),
      m = (p, x, g) => {
        let b = p.attributes.color.array;
        for (let v = 0; v < b.length; v += 3) {
          let y = b[v] > 1.05 ? g : 1;
          ((b[v] = x.r * y), (b[v + 1] = x.g * y), (b[v + 2] = x.b * y));
        }
        return p;
      };
    (c.root.updateMatrixWorld(!0),
      c.root.traverse((p) => {
        if (!p.isMesh || p.name === "lens" || p.material.transparent) return;
        let x = p.geometry.index
          ? p.geometry.toNonIndexed()
          : p.geometry.clone();
        x.applyMatrix4(d.copy(p.matrixWorld));
        for (let b of Object.keys(x.attributes))
          b !== "position" &&
            b !== "normal" &&
            b !== "uv" &&
            b !== "color" &&
            x.deleteAttribute(b);
        (x.attributes.color ||
          x.setAttribute(
            "color",
            new BufferAttribute(
              new Float32Array(x.attributes.position.count * 3).fill(1),
              3,
            ),
          ),
          x.attributes.uv ||
            x.setAttribute(
              "uv",
              new BufferAttribute(
                new Float32Array(x.attributes.position.count * 2),
                2,
              ),
            ));
        let g = p.material;
        if (g.userData.camo) {
          let b = x.attributes.color.array;
          for (let v = 0; v < b.length; v += 3)
            b[v] = b[v + 1] = b[v + 2] = b[v] > 1.05 ? 2 : 1;
          f.push(x);
        } else
          h.push(
            m(
              x,
              g.userData.base ||
                (g.color ? u.copy(g.color) : u.set(3355443)).clone(),
              1 + ((g.userData.wear || 1) - 1) * 0.5,
            ),
          );
      }),
      (n = {
        main: h.length ? Vn(h, !1) : null,
        camo: f.length ? Rc(Vn(f, !1)) : null,
        anchors: c.anchors,
        mounts: c.mounts,
      }),
      (n.tris =
        ((n.main ? n.main.attributes.position.count : 0) +
          (n.camo ? n.camo.attributes.position.count : 0)) /
        3),
      OO.set(s, n));
  }
  let i = new Group();
  if (((i.name = "gun_smg"), n.main)) {
    let c = new Mesh(n.main, t.world);
    ((c.castShadow = !0), (c.receiveShadow = !0), i.add(c));
  }
  if (n.camo) {
    let c = new Mesh(n.camo, xl(e, "metal"));
    ((c.castShadow = !0), (c.receiveShadow = !0), i.add(c));
  }
  let a = n.anchors,
    r = {
      muzzle: a.muzzle.clone(),
      eject: a.eject.clone(),
      ejectDir: a.ejectDir.clone(),
      sight: a.sight.clone(),
      gripR: new Object3D(),
      gripL: new Object3D(),
    };
  (a.laser && (r.laser = a.laser.clone()),
    (r.gripR.name = "gripR"),
    (r.gripL.name = "gripL"),
    r.gripR.position.set(0.017, -0.042, 0.003),
    o.underbarrel === "vgrip"
      ? r.gripL.position.set(-0.016, Vu - 0.045, -BO.vgrip)
      : r.gripL.position.copy(
          Gt(-0.029, 0.0115, o.underbarrel === "laser" ? 0.208 : 0.232),
        ),
    i.add(r.gripR, r.gripL));
  let l = {};
  for (let c in n.mounts) {
    let h = new Object3D();
    ((h.name = "mount_" + c),
      h.position.copy(n.mounts[c].position),
      i.add(h),
      (l[c] = h));
  }
  return {
    id: "smg",
    root: i,
    build: o,
    anchors: r,
    mounts: l,
    hands: null,
    clips: null,
    resetPose() {},
    hip: {
      pos: Bt(0.112, -0.142, -0.3),
      rot: new Euler(0.03, 0.07, 0),
    },
    adsDist: yk[o.optic] ?? 0.11,
    worldTris: n.tris,
  };
}
var wl = (o, t, e) => new Vector3(o, t, e);
var Fn = new Float64Array(6);
var Mk = new Vector3();
var $O = new Quaternion();
var ZO = new Euler();
var kT = new Vector3();
var QO = new Quaternion();
var wk = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var O4 = (o) => ((o = wk(o)), o * o * (3 - 2 * o));
function JO(o) {
  let t = o.arms,
    e = o.grips,
    s = o.parts,
    n = new Mf(o),
    i = o.dims.TRAVEL,
    a = i - 0.0022;
  (t.setRest("R", e.fire.pos, e.fire.quat, e.fire.pose),
    t.setRest("L", e.support.pos, e.support.quat, e.support.pose),
    (t.trigPose = e.trigger.pose),
    (t.pressPose = e.press.pose),
    o.anchors.gripR.position.copy(e.fire.pos),
    o.anchors.gripR.quaternion.copy(e.fire.quat),
    o.anchors.gripL.position.copy(e.support.pos),
    o.anchors.gripL.quaternion.copy(e.support.quat));
  let r = !1,
    l = 0,
    c = globalThis.GH_TUNE || {},
    h = (s0, l0) => c[s0] ?? l0,
    f = (s0, l0, E0) => xp(new Float32Array(Ui), s0, l0, E0),
    u = Qa(e.support.pose, 1.2),
    d =
      pn.loose && pn.carry
        ? f(pn.loose, pn.carry, 0.3)
        : gs({
            i: [43, 1, 55, 30],
            m: [56, 0, 69, 37],
            r: [63, 0, 75, 41],
            l: [69, -1, 79, 43],
            t: [16, 16, -36, 22, 30],
            cup: 14,
          }),
    m = gs({
      i: [3, 1, 5, 3],
      m: [2, 0, 5, 3],
      r: [5, -1, 9, 5],
      l: [9, -2, 14, 8],
      t: [26, -12, -30, 10, 12],
      cup: 3,
    }),
    p = (() => {
      let s0 = Qa(e.support.pose, 0.25),
        l0 = Qa(e.support.pose, 0.7);
      for (let E0 = 0; E0 < 4; E0++) s0[E0] = l0[E0];
      return s0;
    })(),
    x = gs(
      {
        i: [46, 2, 40, 22],
        m: [49, 0, 46, 24],
        r: [52, -1, 50, 26],
        l: [55, -3, 54, 28],
      },
      d,
    ),
    g = Qa(e.support.pose, 1.3),
    b = (() => {
      let s0 = f(Qa(e.support.pose, 0.35), x, 0.5);
      for (let l0 = 16; l0 < 21; l0++) s0[l0] = g[l0];
      return s0;
    })(),
    v = f(d, pn.fist, 0.55),
    y = {
      d: [-0.082, -0.06, -0.012],
      r: [0.22, -0.12, 0.3],
    },
    M = (() => {
      let s0 = new Float32Array(x);
      for (let l0 = 16; l0 < 21; l0++) s0[l0] = 0.7 * g[l0] + 0.3 * d[l0];
      return s0;
    })(),
    w = {
      d: [h("wux", -0.012), h("wuy", -0.044), h("wuz", -0.02)],
      r: [0.2, h("wuy2", -0.24), 0.16],
    },
    T = {
      d: [-0.078, -0.034, -0.004],
      r: [0.15, -0.05, 0.36],
    },
    S = new Quaternion().setFromEuler(o.hip.rot),
    E = S.clone().invert(),
    _ = (s0, l0, E0, U = 0, X = 0, N = 0) => ({
      p: wl(s0, l0, E0).sub(o.hip.pos).applyQuaternion(E),
      q: E.clone().multiply(new Quaternion().setFromEuler(new Euler(U, X, N))),
      f: "view",
    }),
    R = (s0, l0, E0, U, X) => {
      let N = wl(U[0], U[1], U[2]).normalize(),
        q = wl(X[0], X[1], X[2]);
      q.addScaledVector(N, -q.dot(N)).normalize();
      let o0 = new Quaternion().setFromRotationMatrix(
        new Matrix4().makeBasis(new Vector3().crossVectors(N, q), N, q),
      );
      return {
        p: wl(s0, l0, E0).sub(o.hip.pos).applyQuaternion(E),
        q: E.clone().multiply(o0),
        f: "view",
      };
    },
    C = (s0, l0, E0) => {
      let U = s[s0].userData.rest;
      return {
        p: E0.pos.clone().sub(U).applyQuaternion(l0.q).add(l0.p),
        q: l0.q.clone().multiply(E0.quat),
        f: l0.f,
      };
    },
    L = {
      t: 0,
      ...n.grip("support"),
    },
    A = [4],
    O = (() => {
      let s0 = f(e.fire.pose, e.solo.pose, 0.5);
      return (
        (s0[17] = Math.min(59, Math.max(e.fire.pose[17], e.solo.pose[17]) + 5)),
        (s0[19] -= 14),
        (s0[16] -= 3),
        s0
      );
    })(),
    H = (s0, l0, E0) => [
      {
        t: s0,
        pose: O,
        dur: E0 * 0.6,
        digits: A,
      },
      {
        t: s0 + E0 * 0.45,
        pose: l0,
        dur: E0 * 0.6,
        digits: A,
      },
    ],
    F = Math.atan2(0.2962, 1),
    P = wl(0, -Math.cos(F), Math.sin(F)),
    z = (s0, l0, E0 = [6, 10, 14]) => {
      let U = t.clip[s0].pose;
      for (let X of E0) ((U[X] += 1.8 * l0), (U[X + 1] += 1.1 * l0));
    },
    k = jt([
      [0, 0],
      [0.024, i, "out"],
      [0.044, i],
      [0.078, 0, "in"],
    ]),
    I = jt([
      [0, 0],
      [0.008, 1, "out"],
      [0.055, 1],
      [0.09, 0],
    ]),
    G = {
      last: -1,
      seen: !1,
      shots: 0,
      lock: !1,
      lockEvt: !1,
      lockK: 1,
      clipTrig: 0,
    },
    K = n.clip(
      0.09,
      [
        {
          t: 0.02,
          type: "eject",
        },
      ],
      (s0) => {
        let l0 = I(s0),
          E0 = s0 === 0.04;
        (!E0 && (G.last < 0 || s0 < G.last - 1e-4) && (G.shots = 1),
          E0 && !G.lock && (G.lockEvt = !0),
          (G.lock = E0),
          (G.last = s0),
          (G.seen = !0),
          (G.clipTrig = l0),
          o.setSlide(E0 ? i - (i - a) * G.lockK : k(s0)),
          n.part("trigger", 0, 0, 0, -0.24 * l0),
          n.part("trigBlade", 0, 0, 0.0012 * Math.min(1, l0 * 4)),
          (s.chamberRound.visible = !E0 && (s0 < 0.012 || s0 > 0.06)),
          E0 &&
            (n.part("slideStop", 0, 0, 0, -0.1),
            (s.magRounds.visible = !1),
            (s.magFollower.visible = !0)),
          (t.clip.trig = 1),
          (t.clip.press = l0),
          z("R", 1.1 * l0),
          z("L", 0.8 * l0, [2, 6, 10, 14]));
      },
    );
  K.holdT = 0.04;
  let $ = [h("rpx", 0.045), h("rpy", -0.011), h("rpz", -0.01)],
    n0 = [h("rrx", 0.2), h("rry", -0.06), h("rrz", -1.18)],
    e0 = new Quaternion().setFromEuler(new Euler(n0[0], n0[1], n0[2], "XYZ")),
    p0 = (s0, l0, E0, U = 1) => {
      let X = wl(l0[0], l0[1], l0[2]).applyQuaternion(e0),
        N = wl(E0[0], E0[1], E0[2]).applyQuaternion(e0);
      return {
        t: s0,
        v: [X.x * U, X.y * U, X.z * U, N.x * U, N.y * U, N.z * U],
      };
    },
    t0 = (s0) => {
      let l0 = s0 ? 1.7 : 1.4,
        E0 = 0.15,
        U = 0.165,
        X = U + 0.13,
        N = 0.4,
        q = 0.7,
        o0 = 0.835,
        h0 = 0.905,
        y0 = s0 ? 1.1 : 0,
        D = s0 ? 1.52 : 1.25,
        W = s0 ? 1.2 : 0.965,
        Y = s0 ? 1.48 : 1.22,
        R0 = jt([
          [0.03, 0],
          [0.25, 1, "back"],
          [W, 1],
          [Y, 0, "io"],
        ]),
        U0 = jt([
          [0, 0],
          [0.05, -0.12, "out"],
          [0.26, 1, "back"],
          [W + 0.02, 1],
          [Y - 0.02, 0, "io"],
        ]),
        $0 = jt([
          [0.02, 0],
          [0.23, 1, "out"],
          [W, 1],
          [Y - 0.03, 0, "io"],
        ]),
        g0 = jt([
          [0.02, 0],
          [0.22, 1, "io"],
          [W - 0.02, 1],
          [Y - 0.04, 0, "io"],
        ]),
        G0 = jt([
          [0, 0],
          [0.045, -0.035, "out"],
          [0.27, 1, "back"],
          [W + 0.03, 1],
          [Y, -0.03, "io"],
          [Y + 0.09, 0, "io"],
        ]),
        K0 = (Nt) => be(Nt, 0.05, 0.18, D - 0.1, D + 0.04),
        it = [
          p0(E0 + 0.008, [0.014, 0, 0], [0, 0.05, -0.05]),
          p0(
            X - 0.03,
            [-P.x * 0.045, -P.y * 0.045, -P.z * 0.045],
            [0.1, 0, 0.05],
          ),
          p0(
            q + 0.045,
            [-P.x * 0.035, -P.y * 0.035, -P.z * 0.035],
            [-0.07, 0, 0.04],
          ),
          p0(h0, [-P.x * 0.21, -P.y * 0.21, -P.z * 0.21], [0.58, 0.06, -0.22]),
          {
            t: D - 0.03,
            v: [0, 0.02, 0, 0.08, 0, 0.05],
          },
        ];
      s0 && it.push(p0(y0 + 0.036, [0, -0.016, -0.27], [-0.58, 0.08, 0.18]));
      let ft = Do(l0, {
          n: 6,
          k: [320, 320, 320, 350, 350, 320],
          c: [16, 16, 16, 15, 15, 14],
          impulses: it,
          target: (Nt, ge) => {
            let Le = K0(Nt);
            ((ge[0] = 0),
              (ge[1] = -0.003 * Le),
              (ge[2] = 0),
              (ge[3] = (-0.02 + 0.005 * Math.sin(Nt * 2.3)) * Le),
              (ge[4] = 0.008 * Math.sin(Nt * 1.7 + 1) * Le),
              (ge[5] = 0.016 * Le));
          },
        }),
        gt = jt([
          [X, 0],
          [X + 0.18, 1, "io"],
          [q - 0.05, 1],
          [q + 0.1, 0, "io"],
        ]),
        rt = (Nt, ge) => {
          ft(Nt, Fn);
          let Le = gt(Nt);
          n.gunAt(
            ge,
            $[0] * R0(Nt) + Fn[0],
            $[1] * U0(Nt) + Fn[1] + 0.004 * Le,
            $[2] * R0(Nt) + Fn[2],
            n0[0] * $0(Nt) + Fn[3] + 0.03 * Le,
            n0[1] * g0(Nt) + Fn[4] + 0.03 * Le,
            n0[2] * G0(Nt) + Fn[5] - 0.06 * Le,
          );
        },
        dt = (Nt) => (Nt <= U ? 0 : 0.5 * 13.5 * (Nt - U) * (Nt - U)),
        tt = s.mag.userData.rest,
        X0 = {
          pos: wl(0, 0, 0),
          rot: new Euler(),
        },
        ut = wl(0, 0, 0),
        z0 = wl(0, 0, 0),
        I0 = new Quaternion(),
        vt = (Nt, ge) => {
          (rt(Nt, X0),
            ge
              .copy(tt)
              .addScaledVector(P, dt(Nt))
              .applyQuaternion(n.cq)
              .add(n.cp));
        };
      (vt(X - 0.01, ut), vt(X, z0), I0.copy(n.cq));
      let wt = {
          p: z0.clone(),
          v: z0.clone().sub(ut).multiplyScalar(100),
          q: I0.clone(),
          axis: wl(0.9, 0.1, 0.4).normalize(),
        },
        _t = (Nt, ge = [0, 0, 0], Le = [0, 0, 0]) =>
          n.partKey(
            "mag",
            [P.x * Nt + Le[0], P.y * Nt + Le[1], P.z * Nt + Le[2]],
            ge,
          ),
        Pt = {
          ...n.partKey(
            "mag",
            [h("max", -0.175), h("may", -0.275), h("maz", 0.07)],
            [0, 0, 0],
            "view",
          ),
          q: new Quaternion().setFromEuler(
            new Euler(n0[0] + 0.55, n0[1] - 0.25, n0[2] + 0.5, "XYZ"),
          ),
        },
        bt = new Xs([
          {
            t: N,
            ...Pt,
          },
          {
            t: q - 0.1,
            ..._t(0.18, [0.3, 0.06, 0.2], [-0.014, -0.004, 0.01]),
            pass: !0,
          },
          {
            t: q,
            ..._t(0.119, [0.11, 0, 0.07], [-0.0022, 0, 0.0012]),
          },
          {
            t: q + 0.045,
            ..._t(0.102, [0.02, 0, 0.012]),
            pass: !0,
          },
          {
            t: o0,
            ..._t(0.031),
          },
          {
            t: h0 - 0.014,
            ..._t(0.027),
            ease: "io",
          },
          {
            t: h0,
            ..._t(0),
            ease: "in3",
          },
        ]),
        Et = [
          L,
          {
            t: 0.02,
            ...n.grip("support"),
          },
          {
            t: 0.085,
            ...n.grip("support", {
              d: [h("p1x", -0.04), h("p1y", -0.026), h("p1z", -0.016)],
              r: [0.1, 0.05, 0.2],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.2,
            ...n.grip("support", {
              d: [h("p2x", -0.1), h("p2y", -0.17), h("p2z", 0.07)],
              r: [h("p2a", 0.5), h("p2b", 0.2), h("p2c", 0.6)],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.32,
            ...C("mag", Pt, e.mag),
          },
          {
            t: N,
            ...C("mag", Pt, e.mag),
          },
          {
            t: N + 0.001,
            ...n.grip("mag"),
          },
          {
            t: q + 0.025,
            ...n.grip("mag"),
          },
          {
            t: o0 - 0.01,
            ...n.grip("heel"),
          },
          {
            t: h0,
            ...n.grip("heel"),
          },
          {
            t: h0 + 0.05,
            ...n.grip("heel", {
              d: [-P.x * 0.0022, -P.y * 0.0022, -P.z * 0.0022],
            }),
            ease: "out",
          },
        ],
        zt = n.grip("heel", {
          d: [P.x * 0.008, P.y * 0.008, P.z * 0.008 - 0.006],
        }),
        J = w;
      s0
        ? Et.push(
            {
              t: h0 + 0.115,
              ...n.grip("heel", {
                d: [P.x * 0.034, P.y * 0.034, P.z * 0.034 - 0.008],
              }),
              pass: !0,
            },
            {
              t: h0 + 0.22,
              ...n.grip("support", {
                d: [-0.075, -0.17, 0.045],
                r: [0.4, 0.1, 0.45],
                f: "view",
              }),
              pass: !0,
            },
            {
              t: W + 0.09,
              ...n.grip("support", {
                d: [-0.055, -0.2, 0.03],
                r: [0.36, 0, 0.36],
                f: "view",
              }),
            },
            {
              t: W + 0.235,
              ...n.grip("support", J),
              pass: !0,
              tens: 0.25,
            },
            {
              t: D,
              ...n.grip("support"),
            },
          )
        : Et.push(
            {
              t: W + 0.07,
              ...zt,
            },
            {
              t: W + 0.185,
              ...n.grip("support", J),
              pass: !0,
            },
            {
              t: D,
              ...n.grip("support"),
            },
          );
      let Q = new Xs(Et),
        i0 = Qa(e.mag.pose, 1.25),
        A0 = f(e.heel.pose, i0, 0.3),
        N0 = (() => {
          let Nt = f(e.heel.pose, e.support.pose, 0.55);
          for (let ge = 16; ge < 21; ge++) Nt[ge] = g[ge];
          return Nt;
        })(),
        mt = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.035,
            stagger: 0.004,
            from: "thumb",
          },
          {
            t: 0.03,
            pose: d,
            dur: 0.075,
            stagger: 0.008,
            from: "little",
          },
          {
            t: N - 0.14,
            pose: Qa(e.mag.pose, 0.9),
            dur: 0.07,
          },
          {
            t: N - 0.07,
            pose: e.mag.pose,
            dur: 0.06,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: q + 0.012,
            pose: A0,
            dur: 0.07,
            stagger: 0.013,
            from: "index",
          },
          {
            t: q + 0.085,
            pose: e.heel.pose,
            dur: 0.075,
            stagger: 0.01,
            from: "little",
          },
          ...(s0
            ? [
                {
                  t: h0 + 0.045,
                  pose: Qa(e.heel.pose, 0.7),
                  dur: 0.055,
                  stagger: 0.006,
                  from: "thumb",
                },
                {
                  t: h0 + 0.145,
                  pose: d,
                  dur: 0.11,
                  stagger: 0.012,
                  from: "little",
                },
                {
                  t: W + 0.07,
                  pose: M,
                  dur: 0.08,
                },
                {
                  t: W + 0.12,
                  pose: b,
                  dur: 0.06,
                  digits: A,
                },
                {
                  t: W + 0.185,
                  pose: b,
                  dur: 0.06,
                },
              ]
            : [
                {
                  t: W + 0.06,
                  pose: N0,
                  dur: 0.12,
                  stagger: 0.012,
                },
              ]),
          {
            t: D - (s0 ? 0.075 : 0.1),
            pose: e.support.pose,
            dur: s0 ? 0.07 : 0.09,
            stagger: s0 ? 0.01 : 0.018,
            from: "little",
            ease: "out",
          },
        ]),
        xt = [
          {
            t: 0.07,
            pose: e.magRel.pose,
            dur: 0.075,
            digits: A,
          },
          {
            t: E0 + 0.09,
            pose: e.solo.pose,
            dur: 0.14,
            digits: A,
          },
        ];
      (s0 &&
        xt.push(
          {
            t: y0 - 0.16,
            pose: e.stop.pose,
            dur: 0.11,
            digits: A,
          },
          {
            t: y0 + 0.09,
            pose: e.solo.pose,
            dur: 0.12,
            digits: A,
          },
        ),
        xt.push(...H(D - 0.23, e.fire.pose, 0.17)));
      let yt = new Gs(e.fire.pose, xt),
        Mt = jt([
          [E0 - 0.016, 0],
          [E0, 1, "out"],
          [E0 + 0.08, 1],
          [E0 + 0.12, 0],
        ]),
        St = (Nt) => be(Nt, 0.06, 0.2, D - 0.12, D + 0.05),
        Rt = jt([
          [y0 + 0.004, 0],
          [y0 + 0.04, 1, "in"],
        ]),
        Ot = jt([
          [y0 - 0.022, -0.1],
          [y0 + 0.004, 0.03, "out"],
          [y0 + 0.09, 0.03],
          [y0 + 0.16, 0],
        ]),
        Jt = jt([
          [y0 - 0.03, 0],
          [y0 + 0.004, 1, "out"],
          [y0 + 0.08, 1],
          [y0 + 0.14, 0],
        ]),
        ee = [
          ye(0.03, "cloth"),
          ye(E0, "magout"),
          {
            t: X,
            type: "magdrop",
          },
          ye(h0, "magin"),
          {
            t: h0 + 0.02,
            type: "ammo",
          },
          ye(D - 0.1, "cloth"),
        ];
      return (
        s0 && ee.push(ye(y0 + 0.02, "slide")),
        n.clip(l0, ee, (Nt, ge) => {
          ((l = 2), (Nt < X || Nt >= N) && (r = !1), rt(Nt, ge));
          let Le = s.mag;
          if (Nt < X) {
            let js = dt(Nt);
            n.part("mag", P.x * js, P.y * js, P.z * js);
          } else if (Nt < N) {
            let js = Nt - X;
            ((r || js > 0.2) && (Le.visible = !1),
              Mk.copy(wt.p).addScaledVector(wt.v, js),
              (Mk.y -= 0.5 * 9.8 * js * js),
              $O.setFromAxisAngle(wt.axis, 4.5 * js).premultiply(wt.q),
              Le.position.copy(Mk).sub(n.cp).applyQuaternion(n.cqi),
              Le.quaternion.copy(n.cqi).multiply($O));
          } else n.partXf("mag", bt, Nt);
          if (s0) {
            let js = 1 - Rt(Nt);
            (o.setSlide(a * js),
              n.part("slideStop", 0, 0, 0, Ot(Nt)),
              (s.chamberRound.visible = Nt > y0 + 0.03),
              (s.magRounds.visible = Nt >= N),
              (s.magFollower.visible = Nt < N));
          }
          (n.part("magRelease", 0.0014 * Mt(Nt), 0, 0),
            n.hand("L", Q, Nt),
            n.pose("L", mt, Nt),
            n.pose("R", yt, Nt));
          let xn = t.clip.R.pose;
          if (((xn[20] += 7 * Mt(Nt)), s0)) {
            let js = Jt(Nt);
            ((xn[19] += 2.2 * js), (xn[20] += 2 * js));
          }
          z("R", St(Nt));
        })
      );
    },
    M0 = n.grip("support", {
      d: [-0.055, -0.075, 0.035],
      r: [0.25, 0, 0.4],
      f: "view",
    }),
    f0 = n.grip("support", {
      d: [-0.08, -0.21, 0.05],
      r: [0.3, 0, 0.5],
      f: "view",
    }),
    _0 = (() => {
      let s0 = jt([
          [0, -0.27],
          [0.27, 0.012, "out3"],
          [0.4, 0],
        ]),
        l0 = jt([
          [0, -1],
          [0.25, 0.06, "out3"],
          [0.4, 0],
        ]),
        E0 = jt([
          [0, 1],
          [0.32, 0, "out"],
        ]),
        U = jt([
          [0, 0.38],
          [0.28, -0.03, "out"],
          [0.4, 0],
        ]),
        X = new Xs([
          {
            t: 0,
            ...f0,
          },
          {
            t: 0.05,
            ...f0,
          },
          {
            t: 0.17,
            ...M0,
            pass: !0,
          },
          {
            t: 0.25,
            ...n.grip("support", w),
            pass: !0,
            tens: 0.3,
          },
          {
            t: 0.31,
            ...n.grip("support"),
          },
        ]),
        N = new Gs(b, [
          {
            t: 0.19,
            pose: e.support.pose,
            dur: 0.13,
            stagger: 0.02,
            from: "little",
            ease: "out",
          },
        ]),
        q = new Gs(e.solo.pose, H(0.15, e.fire.pose, 0.16)),
        o0 = Do(0.4, {
          n: 6,
          k: 420,
          c: 17,
          impulses: [
            {
              t: 0.3,
              v: [0.004, 0.022, 0.01, 0.085, 0.03, -0.06],
            },
          ],
        });
      return n.clip(0.4, [ye(0.02, "cloth")], (h0, y0) => {
        ((l = 2),
          o0(h0, Fn),
          n.gunAt(
            y0,
            0.035 * E0(h0) + Fn[0],
            s0(h0) + Fn[1],
            0.07 * E0(h0) + Fn[2],
            l0(h0) + Fn[3],
            0.22 * E0(h0) + Fn[4],
            U(h0) + Fn[5],
          ),
          n.hand("L", X, h0),
          n.pose("L", N, h0),
          n.pose("R", q, h0));
        let D = be(h0, 0.27, 0.33, 0.36, 0.4);
        (z("R", 1.3 * D), z("L", 1 * D, [2, 6, 10, 14]));
      });
    })(),
    F0 = (() => {
      let s0 = jt([
          [0, 0],
          [0.05, 0.008, "out"],
          [0.25, -0.3, "in"],
        ]),
        l0 = jt([
          [0, 0],
          [0.05, 0.03, "out"],
          [0.25, -0.95, "in"],
        ]),
        E0 = jt([
          [0.03, 0],
          [0.25, 1, "in"],
        ]),
        U = new Xs([
          L,
          {
            t: 0.02,
            ...n.grip("support"),
          },
          {
            t: 0.08,
            ...n.grip("support", {
              d: [-0.036, -0.014, -0.016],
              r: [0, 0.05, 0.1],
            }),
            pass: !0,
          },
          {
            t: 0.16,
            ...M0,
            pass: !0,
          },
          {
            t: 0.25,
            ...f0,
          },
        ]),
        X = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.05,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.04,
            pose: d,
            dur: 0.12,
            stagger: 0.01,
            from: "little",
          },
        ]),
        N = new Gs(e.fire.pose, H(0.03, e.solo.pose, 0.12));
      return n.clip(0.25, [ye(0.02, "cloth")], (q, o0) => {
        ((l = 2),
          n.gunAt(
            o0,
            0.03 * E0(q),
            s0(q),
            0.06 * E0(q),
            l0(q),
            0.2 * E0(q),
            0.3 * E0(q),
          ),
          n.hand("L", U, q),
          n.pose("L", X, q),
          n.pose("R", N, q));
      });
    })(),
    m0 = [h("cpx", 0.04), h("cpy", -0.05), h("cpz", 0.08)],
    S0 = [h("crx", 0.55), h("cry", 0.05), h("crz", 0.75)],
    T0 = () => {
      let s0 = new Float32Array(e.rack.pose);
      for (let U = 0; U < 4; U++) ((s0[U * 4] -= 24), (s0[U * 4 + 2] -= 6));
      ((s0[19] = Math.max(0, s0[19] - 16)), (s0[16] -= 6));
      for (let U of [1, 5, 9, 13]) s0[U] *= 0.3;
      let l0 = new Float32Array(e.rack.pose);
      for (let U = 0; U < 4; U++) ((l0[U * 4] -= 13), (l0[U * 4 + 1] *= 0.3));
      l0[19] = Math.max(0, l0[19] - 10);
      let E0 = f(e.solo.pose, e.magRel.pose, 0.62);
      return {
        lift: s0,
        offC: l0,
        low: E0,
        pre: n.grip("rack", {
          d: [-0.018, 0.036, 0.004],
        }),
        on: n.grip("rack"),
        off: n.grip("rack", {
          d: [-0.02, 0.038, -0.004],
        }),
        peel: n.grip("rack", {
          d: [-0.012, 0.021, 0.004],
          r: [0, 0, 0.5],
        }),
      };
    },
    j0 = () => {
      let l0 = T0(),
        E0 = jt([
          [0.04, 0],
          [0.46, 1, "back"],
          [1.08, 1],
          [1.58, 0, "io"],
        ]),
        U = jt([
          [1.12, 0],
          [1.62, 1, "back"],
          [2.88, 1],
          [3.38, 0, "io"],
        ]),
        X = 1.9,
        N = 1.97,
        q = 2.16,
        o0 = 2.58,
        h0 = 2.7,
        y0 = Do(3.6, {
          n: 6,
          k: 280,
          c: 14,
          impulses: [
            {
              t: 0.3,
              v: [0, -0.02, 0, -0.08, 0, 0.06],
            },
            {
              t: 1.56,
              v: [0, 0.02, 0, 0.06, 0, -0.12],
            },
            {
              t: X,
              v: [0.01, -0.02, 0, -0.06, -0.05, 0.05],
            },
            {
              t: q - 0.02,
              v: [0, 0, 0.03, 0.05, 0, 0],
            },
            {
              t: o0 + 0.06,
              v: [0, 0, -0.06, -0.13, 0.03, 0.06],
            },
            {
              t: 3.28,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
          target: (K0, it) => {
            let ft = be(K0, 0.08, 0.3, 3.16, 3.3);
            ((it[0] = it[2] = it[4] = 0),
              (it[1] = -0.003 * ft),
              (it[3] = -0.022 * ft),
              (it[5] = 0.016 * ft));
          },
        }),
        D = n.grip("support", {
          d: [-0.1, -0.22, 0.12],
          r: [0.5, 0.1, 0.5],
          f: "view",
        }),
        W = new Xs([
          L,
          {
            t: 0.03,
            ...n.grip("support"),
          },
          {
            t: 0.12,
            ...n.grip("support", {
              d: [-0.04, -0.024, -0.016],
              r: [0.08, 0.05, 0.16],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.42,
            ...D,
          },
          {
            t: 1.6,
            ...D,
          },
          {
            t: X - 0.1,
            ...l0.pre,
            pass: !0,
          },
          {
            t: X,
            ...l0.on,
          },
          {
            t: h0,
            ...l0.on,
          },
          {
            t: h0 + 0.09,
            ...l0.peel,
            pass: !0,
          },
          {
            t: h0 + 0.26,
            ...n.grip("support", y),
            pass: !0,
          },
          {
            t: 3.17,
            ...n.grip("support", w),
            pass: !0,
            tens: 0.25,
          },
          {
            t: 3.34,
            ...n.grip("support"),
          },
        ]),
        Y = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.07,
            stagger: 0.01,
            from: "thumb",
          },
          {
            t: 0.06,
            pose: d,
            dur: 0.2,
            stagger: 0.014,
            from: "little",
          },
          {
            t: X - 0.26,
            pose: l0.lift,
            dur: 0.16,
          },
          {
            t: X - 0.02,
            pose: e.rack.pose,
            dur: 0.09,
            stagger: 0.012,
            from: "index",
            ease: "out",
          },
          {
            t: h0 - 0.09,
            pose: l0.offC,
            dur: 0.08,
            stagger: 0.008,
            from: "thumb",
          },
          {
            t: h0 + 0.07,
            pose: v,
            dur: 0.12,
            stagger: 0.01,
            from: "little",
          },
          {
            t: 2.96,
            pose: M,
            dur: 0.12,
          },
          {
            t: 3.08,
            pose: b,
            dur: 0.08,
          },
          {
            t: 3.25,
            pose: e.support.pose,
            dur: 0.08,
            stagger: 0.012,
            from: "little",
            ease: "out",
          },
        ]),
        R0 = new Gs(e.fire.pose, [
          ...H(0.02, e.solo.pose, 0.16),
          {
            t: 1.2,
            pose: l0.low,
            dur: 0.22,
            digits: A,
          },
          {
            t: 2.86,
            pose: e.solo.pose,
            dur: 0.18,
            digits: A,
          },
          ...H(3.1, e.fire.pose, 0.17),
        ]),
        U0 = jt([
          [N, 0],
          [q, 1, "io"],
          [o0, 1],
          [o0 + 0.06, 0, "in"],
        ]),
        $0 = (K0) => be(K0, q - 0.06, q + 0.1, o0 - 0.06, o0 + 0.06),
        g0 = (K0) =>
          be(K0, 0.72, 0.79, 0.81, 0.9) + be(K0, 0.93, 0.99, 1, 1.09),
        G0 = (K0) => be(K0, 0.1, 0.3, 3.14, 3.3);
      return n.clip(
        3.6,
        [
          ye(0.1, "cloth"),
          ye(1.3, "cloth"),
          ye(X - 0.02, "cloth"),
          ye(o0 + 0.04, "slide"),
          ye(3, "cloth"),
        ],
        (K0, it) => {
          l = 2;
          let ft = E0(K0),
            gt = U(K0),
            rt = Math.sin(K0 * 1.7) * 0.03 * Math.max(ft, gt),
            dt = $0(K0);
          y0(K0, Fn);
          let tt = be(K0, 0.3, 0.52, 0.98, 1.14),
            X0 = Math.sin((K0 - 0.34) * 3.7),
            ut = Math.sin((K0 - 0.34) * 3.7 + 1);
          ((Fn[1] += 0.004 * Math.sin(K0 * 5.1) * tt),
            (Fn[3] += 0.05 * X0 * tt),
            (Fn[4] += 0.17 * X0 * tt),
            (Fn[5] -= 0.11 * ut * tt),
            n.gunAt(
              it,
              0.012 * ft + m0[0] * gt + Fn[0],
              -0.014 * ft + m0[1] * gt + 0.004 * dt + Fn[1],
              0.02 * ft + (m0[2] + 0.014 * dt) * gt + Fn[2],
              0.16 * ft + (S0[0] + 0.5 * rt + 0.05 * dt) * gt + Fn[3],
              (0.98 + rt) * ft + (S0[1] + rt) * gt + Fn[4],
              -0.22 * ft + (S0[2] + 0.04 * dt) * gt + Fn[5],
            ),
            o.setSlide(0.0125 * U0(K0)),
            n.hand("L", W, K0),
            n.pose("L", Y, K0),
            n.pose("R", R0, K0));
          let z0 = t.clip.R.pose,
            I0 = g0(K0);
          ((z0[0] -= 12 * I0), (z0[2] -= 5 * I0));
          for (let vt = 1; vt < 4; vt++) {
            let wt = be(
              K0,
              0.4 + 0.05 * vt,
              0.47 + 0.05 * vt,
              0.49 + 0.05 * vt,
              0.6 + 0.05 * vt,
            );
            ((z0[vt * 4] -= 5 * wt),
              (z0[vt * 4 + 2] -= 9 * wt),
              (z0[vt * 4 + 3] -= 5 * wt));
          }
          {
            let vt = be(K0, 0.5, 0.58, 0.62, 0.74);
            ((z0[19] -= 7 * vt), (z0[20] -= 6 * vt));
          }
          z("R", G0(K0));
        },
      );
    },
    Z0 = () => {
      let l0 = T0(),
        E0 = 0.29,
        U = 0.385,
        X = 0.525,
        N = 0.59,
        q = 0.85,
        o0 = jt([
          [0, 1],
          [0.27, 0, "out3"],
        ]),
        h0 = jt([
          [0, 1],
          [0.55, 1],
          [0.83, 0, "io"],
        ]),
        y0 = Do(0.9, {
          n: 6,
          k: 360,
          c: 16,
          impulses: [
            {
              t: 0.24,
              v: [0, 0.02, 0, 0.06, 0, -0.05],
            },
            {
              t: E0,
              v: [0.008, -0.02, 0, -0.06, -0.04, 0.05],
            },
            {
              t: X + 0.045,
              v: [0, 0, -0.05, -0.11, 0.03, 0.05],
            },
            {
              t: q - 0.03,
              v: [0.003, 0.02, 0.008, 0.08, 0.02, -0.05],
            },
          ],
        }),
        D = n.grip("support", {
          d: [-0.11, -0.15, 0.05],
          r: [0.3, 0, 0.5],
          f: "view",
        }),
        W = new Xs([
          {
            t: 0,
            ...D,
          },
          {
            t: 0.1,
            ...D,
          },
          {
            t: E0 - 0.08,
            ...l0.pre,
            pass: !0,
          },
          {
            t: E0,
            ...l0.on,
          },
          {
            t: N,
            ...l0.on,
          },
          {
            t: N + 0.055,
            ...l0.peel,
            pass: !0,
          },
          {
            t: N + 0.15,
            ...n.grip("support", y),
            pass: !0,
          },
          {
            t: q - 0.055,
            ...n.grip("support", w),
            pass: !0,
            tens: 0.3,
          },
          {
            t: q,
            ...n.grip("support"),
          },
        ]),
        Y = new Gs(l0.lift, [
          {
            t: E0 - 0.03,
            pose: e.rack.pose,
            dur: 0.075,
            stagger: 0.01,
            from: "index",
            ease: "out",
          },
          {
            t: N - 0.06,
            pose: l0.offC,
            dur: 0.055,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: N + 0.045,
            pose: v,
            dur: 0.08,
            stagger: 0.008,
            from: "little",
          },
          {
            t: q - 0.13,
            pose: b,
            dur: 0.07,
          },
          {
            t: q - 0.07,
            pose: e.support.pose,
            dur: 0.08,
            stagger: 0.01,
            from: "little",
            ease: "out",
          },
        ]),
        R0 = new Gs(l0.low, [
          {
            t: N + 0.02,
            pose: e.solo.pose,
            dur: 0.1,
            digits: A,
          },
          ...H(q - 0.24, e.fire.pose, 0.17),
        ]),
        U0 = jt([
          [E0 + 0.012, 0],
          [U, 1, "out"],
          [X, 1],
          [X + 0.05, 0, "in"],
        ]);
      return n.clip(
        0.9,
        [
          ye(0.02, "cloth"),
          ye(E0 - 0.02, "cloth"),
          ye(X + 0.035, "slide"),
          ye(q - 0.08, "cloth"),
        ],
        ($0, g0) => {
          l = 2;
          let G0 = o0($0),
            K0 = h0($0);
          (y0($0, Fn),
            n.gunAt(
              g0,
              m0[0] * K0 + 0.03 * G0 + Fn[0],
              m0[1] * K0 - 0.3 * G0 + Fn[1],
              m0[2] * K0 + 0.05 * G0 + Fn[2],
              S0[0] * K0 - 0.75 * G0 + Fn[3],
              S0[1] * K0 + 0.1 * G0 + Fn[4],
              S0[2] * K0 + 0.2 * G0 + Fn[5],
            ),
            o.setSlide(0.0125 * U0($0)),
            n.hand("L", W, $0),
            n.pose("L", Y, $0),
            n.pose("R", R0, $0));
          let it = be($0, q - 0.04, q + 0.01, 0.885, 0.9);
          (z("R", 1.3 * it + 0.8 * be($0, E0, E0 + 0.05, X, X + 0.05)),
            z("L", 1 * it, [2, 6, 10, 14]));
        },
      );
    },
    lt = (() => {
      let s0 = jt([
          [0, 0],
          [0.085, -0.25, "out"],
          [0.185, 1, "in"],
          [0.27, 0.88, "out"],
          [0.45, 0, "io"],
        ]),
        l0 = n.grip("support", {
          d: [-0.075, -0.045, 0.06],
          r: [0.2, 0.35, 0.3],
          f: "view",
        }),
        E0 = new Xs([
          L,
          {
            t: 0.015,
            ...n.grip("support"),
          },
          {
            t: 0.115,
            ...l0,
          },
          {
            t: 0.26,
            ...l0,
          },
          {
            t: 0.345,
            ...n.grip("support", {
              d: [-0.034, -0.014, 0.012],
            }),
            pass: !0,
          },
          {
            t: 0.4,
            ...n.grip("support"),
          },
        ]),
        U = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.05,
            stagger: 0.005,
            from: "thumb",
          },
          {
            t: 0.04,
            pose: f(d, pn.fist, 0.4),
            dur: 0.1,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.24,
            pose: M,
            dur: 0.07,
          },
          {
            t: 0.34,
            pose: e.support.pose,
            dur: 0.085,
            stagger: 0.008,
            from: "little",
            ease: "out",
          },
        ]),
        X = new Gs(e.fire.pose, [
          ...H(0.01, e.solo.pose, 0.08),
          ...H(0.2, e.fire.pose, 0.12),
        ]);
      return n.clip(0.45, [ye(0.03, "cloth")], (N, q) => {
        l = 2;
        let o0 = s0(N),
          h0 = vi(N, 0.185, 1, 48, 18) * (1 - N / 0.45),
          y0 = o0 < 0 ? -o0 : 0;
        (n.gunAt(
          q,
          -0.105 * o0 + 0.02 * y0,
          0.025 * o0 + 0.16 * y0 + 0.004 * h0,
          -0.19 * o0 + 0.22 * y0 + 0.006 * h0,
          0.85 * o0 + 1.2 * y0 - 0.03 * h0,
          0.62 * o0 - 0.3 * y0 + 0.03 * h0,
          -0.5 * o0 - 0.5 * y0 + 0.04 * h0,
        ),
          n.hand("L", E0, N),
          n.pose("L", U, N),
          n.pose("R", X, N),
          z("R", be(N, 0.02, 0.1, 0.26, 0.4) * 1.2));
      });
    })(),
    H0 = [h("lpx", 0.034), h("lpy", -0.058), h("lpz", 0.04)],
    Y0 = [h("lrx", -0.46), h("lry", 0.16), h("lrz", -0.2)],
    et = (s0, l0, E0) =>
      n.gunAt(
        s0,
        H0[0] * l0 + E0[0],
        H0[1] * l0 + E0[1],
        H0[2] * l0 + E0[2],
        Y0[0] * l0 + E0[3],
        Y0[1] * l0 + E0[4],
        Y0[2] * l0 + E0[5],
      ),
    ct = () => {
      let E0 = e.frag,
        U = jt([
          [0.045, 0],
          [0.19, 1, "io"],
          [0.4, 1],
          [0.6, 0, "io"],
        ]),
        X = Do(0.66, {
          n: 6,
          k: 380,
          c: 17,
          impulses: [
            {
              t: 0.06,
              v: [0, -0.02, 0, -0.06, 0, 0.05],
            },
            {
              t: 0.285,
              v: [-0.004, -0.012, 0.01, -0.05, 0.03, 0.03],
            },
            {
              t: 0.565,
              v: [0.003, 0.02, 0.008, 0.08, 0.02, -0.05],
            },
          ],
        }),
        N = _(-0.23, -0.32, -0.13, 0.25, 0.5, 0.35),
        q = _(-0.215, -0.27, -0.2, 0.5, 0.45, 0.35),
        o0 = _(
          h("tux", -0.15),
          h("tuy", -0.172),
          h("tuz", -0.335),
          0.4,
          0.2,
          -0.35,
        ),
        h0 = _(
          h("trx", -0.092),
          h("try", -0.104),
          h("trz", -0.455),
          h("tra", 0.22),
          0.1,
          h("trr", -1.05),
        ),
        y0 = _(-0.082, -0.088, -0.53, 0.12, 0.05, 0.06),
        D = new Xs([
          {
            t: 0.12,
            ...N,
          },
          {
            t: 0.155,
            ...q,
            pass: !0,
          },
          {
            t: 0.195,
            ...o0,
            pass: !0,
          },
          {
            t: 0.285,
            ...h0,
            pass: !0,
          },
          {
            t: 0.285 + 0.05,
            ...y0,
          },
        ]),
        W = C("frag", h0, E0),
        Y = R(
          h("tsx", -0.082),
          h("tsy", -0.116),
          -0.515,
          [0.1, -0.1, -1],
          [0.3, -0.95, 0],
        ),
        R0 = R(-0.068, -0.158, -0.495, [0.14, -0.42, -0.9], [0.22, -0.88, 0.4]),
        U0 = new Xs([
          L,
          {
            t: 0.015,
            ...n.grip("support"),
          },
          {
            t: 0.075,
            ...n.grip("support", {
              d: [-0.046, -0.03, -0.014],
              r: [0.1, 0.05, 0.2],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.12,
            ...n.grip("frag"),
          },
          {
            t: 0.285,
            ...n.grip("frag"),
          },
          {
            t: 0.285 + 0.001,
            ...W,
          },
          {
            t: 0.285 + 0.065,
            ...Y,
            pass: !0,
            tens: 0.6,
          },
          {
            t: 0.285 + 0.15,
            ...R0,
            pass: !0,
          },
          {
            t: 0.485,
            ...n.grip("support", T),
            pass: !0,
          },
          {
            t: 0.55,
            ...n.grip("support", w),
            pass: !0,
            tens: 0.25,
          },
          {
            t: 0.615,
            ...n.grip("support"),
          },
        ]),
        $0 = Qa(E0.pose, 1.5),
        g0 = (() => {
          let ft = f(Qa(E0.pose, 1.7), d, 0.45);
          for (let gt of [1, 5, 9, 13]) ft[gt] *= 0.3;
          return ft;
        })(),
        G0 = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.045,
            stagger: 0.005,
            from: "thumb",
          },
          {
            t: 0.03,
            pose: d,
            dur: 0.07,
          },
          {
            t: 0.085,
            pose: E0.pose,
            dur: 0.045,
          },
          {
            t: 0.285 - 0.022,
            pose: $0,
            dur: 0.05,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.285 + 0.02,
            pose: g0,
            dur: 0.06,
            stagger: 0.008,
          },
          {
            t: 0.285 + 0.085,
            pose: d,
            dur: 0.11,
            stagger: 0.012,
            from: "little",
          },
          {
            t: 0.44,
            pose: M,
            dur: 0.06,
          },
          {
            t: 0.49,
            pose: b,
            dur: 0.05,
          },
          {
            t: 0.57,
            pose: e.support.pose,
            dur: 0.05,
            stagger: 0.008,
            from: "little",
            ease: "out",
          },
        ]),
        K0 = new Gs(e.fire.pose, [
          ...H(0.02, e.solo.pose, 0.12),
          ...H(0.43, e.fire.pose, 0.15),
        ]),
        it = n.clip(0.66, [ye(0.03, "cloth"), ye(0.5, "cloth")], (ft, gt) => {
          ((l = 2),
            X(ft, Fn),
            et(gt, U(ft), Fn),
            (s.frag.visible = ft >= 0.12 && ft < 0.285),
            ft > 0.074 && ft <= 0.285 + 0.002 && n.partXf("frag", D, ft),
            n.hand("L", U0, ft),
            n.pose("L", G0, ft),
            n.pose("R", K0, ft),
            z(
              "R",
              be(ft, 0.04, 0.14, 0.46, 0.6) * 1.1 +
                1.2 * be(ft, 0.57, 0.6, 0.62, 0.65),
            ),
            z("L", be(ft, 0.57, 0.6, 0.62, 0.65), [2, 6, 10, 14]));
        });
      return ((it.releaseT = 0.285), it);
    },
    D0 = () => {
      let N = jt([
          [0.045, 0],
          [0.21, 1, "io"],
          [3.08, 1],
          [3.36, 0, "back"],
        ]),
        q = Do(3.4, {
          n: 6,
          k: 340,
          c: 17,
          impulses: [
            {
              t: 0.07,
              v: [0, -0.02, 0, -0.06, 0, 0.05],
            },
            {
              t: 0.3,
              v: [-0.005, -0.016, 0.012, -0.07, 0.04, 0.04],
            },
            {
              t: 0.8,
              v: [0.003, 0.014, 0.006, 0.05, 0.02, -0.04],
            },
            {
              t: 3.4 - 0.06,
              v: [0, 0.018, 0.006, 0.07, 0, -0.03],
            },
          ],
        }),
        o0 = (rt) =>
          rt < 0.95
            ? 1 - O4((rt - (0.95 - 0.14)) / 0.12)
            : O4((rt - 3.08) / 0.05),
        h0 = n.grip("support"),
        y0 = (rt, dt, tt, X0, ut) => {
          let z0 = wl(X0[0], X0[1], X0[2]).normalize(),
            I0 = wl(ut[0], ut[1], ut[2]);
          I0.addScaledVector(z0, -I0.dot(z0)).normalize();
          let vt = new Quaternion().setFromRotationMatrix(
            new Matrix4().makeBasis(new Vector3().crossVectors(z0, I0), z0, I0),
          );
          return {
            p: wl(rt, dt, tt).sub(o.hip.pos).applyQuaternion(E),
            q: E.clone().multiply(vt),
            f: "view",
          };
        },
        D = y0(-0.29, -0.43, -0.06, [0.15, -0.7, -0.7], [1, 0.1, 0]),
        W = y0(-0.31, -0.41, -0.02, [0.12, -0.6, -0.8], [1, 0.15, 0]),
        Y = y0(
          h("ksx", -0.125),
          h("ksy", -0.292),
          h("ksz", -0.44),
          [0.15, 0.4, -0.9],
          [0.1, -0.75, -0.65],
        ),
        R0 = y0(
          -0.108,
          -0.268,
          -0.525,
          [0.15, 0.16, -0.97],
          [0.05, -0.95, -0.3],
        ),
        U0 = y0(
          h("kgx", -0.15),
          h("kgy", -0.2),
          h("kgz", -0.4),
          [0.12, 0.25, -0.96],
          [0.9, -0.4, 0.05],
        ),
        $0 = y0(-0.128, -0.18, -0.49, [0.1, 0.1, -0.99], [0.92, -0.38, 0.05]),
        g0 = y0(
          -0.132,
          -0.188,
          -0.474,
          [0.1, 0.12, -0.99],
          [0.92, -0.38, 0.05],
        ),
        G0 = new Xs([
          L,
          {
            t: 0.02,
            ...h0,
          },
          {
            t: 0.075,
            ...n.grip("support", {
              d: [-0.046, -0.03, -0.014],
              r: [0.1, 0.05, 0.2],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.17,
            ...D,
            pass: !0,
          },
          {
            t: 0.215,
            ...W,
          },
          {
            t: 0.3,
            ...Y,
            pass: !0,
          },
          {
            t: 0.3 + 0.06,
            ...R0,
            ease: "out",
          },
          {
            t: 0.47,
            ...U0,
            pass: !0,
          },
          {
            t: 0.565,
            ...$0,
            ease: "out3",
          },
          {
            t: 0.66,
            ...g0,
          },
          {
            t: 0.765,
            ...n.grip("support", T),
            pass: !0,
          },
          {
            t: 0.845,
            ...n.grip("support", w),
            pass: !0,
            tens: 0.25,
          },
          {
            t: 0.915,
            ...h0,
          },
          {
            t: 3.4,
            ...h0,
          },
        ]),
        K0 = gs({
          i: [14, 8, 18, 10],
          m: [16, 1, 22, 12],
          r: [18, -5, 26, 14],
          l: [20, -11, 30, 16],
          t: [-6, 38, -10, 6, 8],
          cup: 6,
        }),
        it = new Gs(e.support.pose, [
          {
            t: 0,
            pose: p,
            dur: 0.05,
            stagger: 0.006,
            from: "thumb",
          },
          {
            t: 0.065,
            pose: d,
            dur: 0.09,
          },
          {
            t: 0.16,
            pose: f(d, pn.fist, 0.45),
            dur: 0.06,
          },
          {
            t: 0.3 - 0.03,
            pose: K0,
            dur: 0.07,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.4,
            pose: m,
            dur: 0.09,
            stagger: 0.008,
          },
          {
            t: 0.66,
            pose: d,
            dur: 0.13,
            stagger: 0.012,
          },
          {
            t: 0.72,
            pose: M,
            dur: 0.07,
          },
          {
            t: 0.775,
            pose: b,
            dur: 0.06,
          },
          {
            t: 0.865,
            pose: e.support.pose,
            dur: 0.05,
            stagger: 0.008,
            from: "little",
            ease: "out",
          },
        ]),
        ft = new Gs(e.fire.pose, [
          ...H(0.02, e.solo.pose, 0.13),
          ...H(0.72, e.fire.pose, 0.16),
        ]),
        gt = n.clip(
          3.4,
          [ye(0.03, "cloth"), ye(0.78, "cloth"), ye(3.4 - 0.26, "cloth")],
          (rt, dt) => {
            ((l = 2), q(rt, Fn));
            let tt = o0(rt);
            for (let z0 = 0; z0 < 6; z0++) Fn[z0] *= tt;
            (et(dt, N(rt), Fn),
              n.hand("L", G0, rt),
              n.pose("L", it, rt),
              n.pose("R", ft, rt));
            let X0 = be(rt, 0.89, 0.915, 0.92, 0.945),
              ut = be(rt, 3.4 - 0.07, 3.4 - 0.035, 3.4 - 0.02, 3.4);
            (z("R", be(rt, 0.05, 0.16, 0.74, 0.86) * 1.1 + 1.2 * X0 + 1.3 * ut),
              z("L", X0 + ut, [2, 6, 10, 14]));
          },
        );
      return (
        (gt.releaseT = 0.3),
        (gt.holdFrom = 0.95),
        (gt.returnT = 0.32),
        gt
      );
    },
    u0 = {
      fire: K,
      draw: _0,
      holster: F0,
      melee: lt,
    },
    w0 = (s0, l0, E0) => {
      let U = null;
      Object.defineProperty(u0, s0, {
        enumerable: !0,
        configurable: !0,
        get() {
          return (
            U ||
              (o.need(...l0),
              (U = E0()),
              n.cp.set(0, 0, 0),
              n.cq.identity(),
              n.cqi.identity()),
            U
          );
        },
      });
    };
  if (
    (w0("reload", ["ctrl", "mag"], () => t0(!1)),
    w0("reloadEmpty", ["ctrl", "mag"], () => t0(!0)),
    w0("inspect", ["rack", "ctrl"], j0),
    w0("first", ["rack", "ctrl"], Z0),
    w0("throw", ["ctrl", "frag"], ct),
    w0("k9", ["ctrl"], D0),
    (o.clips = u0),
    (o.warm = (() => {
      let s0 = [
          () => o.need("rack"),
          () => o.need("ctrl"),
          () => u0.first,
          () => o.need("mag"),
          () => u0.reload,
          () => u0.reloadEmpty,
          () => u0.inspect,
          () => o.need("frag"),
          () => u0.throw,
          () => u0.k9,
        ],
        l0 = 0;
      return () => (l0 < s0.length && s0[l0++](), l0 < s0.length);
    })()),
    !globalThis.GH_NOWARM && typeof setTimeout == "function")
  ) {
    let s0 = () => {
      o.warm() && setTimeout(s0, 110);
    };
    setTimeout(s0, 450);
  }
  let P0 = (s0, l0) => ({
      x: 0,
      v: 0,
      k: s0,
      c: l0,
    }),
    st = P0(h("fk", 1050), h("fc", 29)),
    J0 = P0(700, 21),
    q0 = P0(820, 25),
    v0 = P0(1500, 42),
    x0 = P0(900, 30),
    C0 = P0(2600, 62),
    k0 = (s0, l0, E0) => {
      ((s0.v += (-s0.k * E0 * s0.x - s0.c * (0.55 + 0.45 * E0) * s0.v) * l0),
        (s0.x += s0.v * l0));
    },
    O0 = wl(0.004, -0.05, 0.058),
    B0 = [],
    ot = {
      rig: null,
      trigger: void 0,
      ads: 0,
      sprint: 0,
      elbowR: null,
      elbowL: null,
    },
    Q0 = {
      Rp: new Float32Array(Ui),
      Lp: new Float32Array(Ui),
      Lpos: wl(0, 0, 0),
      Lq: new Quaternion(),
    },
    nt = {
      ads: 0,
      adsPrev: 0,
      arc: 0,
      pulse: 0,
      env: 0,
      trg: 0,
      trgHold: 0,
      sinceShot: 9,
      soft: 1,
      sp: 0,
      spPrev: 0,
      spDir: 0,
      regrip: -1,
      ow: 1,
      idle: 0,
      fidAt: 4.5,
      fid: -1,
      fidKind: 0,
      seed: 20231,
      locked: !1,
    },
    L0 = () => (
      (nt.seed = (nt.seed * 16807) % 2147483647),
      nt.seed / 2147483647
    ),
    ht = new Xs([
      {
        t: 0,
        ...n.grip("support"),
      },
      {
        t: 1,
        ...n.grip("support", {
          d: [h("cax", -0.07), h("cay", -0.125), h("caz", 0.085)],
          r: [0.55, 0.1, 0.75],
          f: "view",
        }),
      },
    ]),
    pt = f(d, p, 0.2),
    V0 = (s0, l0, E0) => {
      let U = l0.ads || 0,
        X = l0.trigger != null ? l0.trigger : 0;
      if (
        (G.seen || ((G.last = -1), (G.lock = !1), (nt.locked = !1)),
        (G.seen = !1),
        G.shots > 0)
      ) {
        G.shots = 0;
        let Y = o.kickK ?? 1,
          R0 = (1 - 0.45 * U) * Y,
          U0 = L0() - 0.5;
        ((st.v += h("kflip", 1.55) * R0),
          (v0.v += h("kback", 0.52) * (1 - 0.2 * U) * Y),
          (J0.v += (0.3 + 0.9 * U0) * R0),
          (q0.v += (L0() - 0.5) * 0.55 * R0),
          (x0.v += 0.05 * R0),
          (nt.env = 1),
          (nt.sinceShot = 0),
          (nt.trgHold = 0.05),
          (nt.soft = 1),
          (nt.locked = !1),
          B0.push({
            t: 0.048,
            f: () => {
              ((st.v -= h("kclamp", 0.55) * R0), (J0.v -= 0.25 * U0 * R0));
            },
          }),
          B0.push({
            t: 0.074,
            f: () => {
              nt.locked || ((st.v -= 0.2 * R0), (v0.v -= 0.11 * Y));
            },
          }));
      }
      if (G.lockEvt)
        if (((G.lockEvt = !1), nt.sinceShot < 0.2)) {
          let Y = o.kickK ?? 1;
          ((nt.locked = !0),
            (nt.soft = 0.42),
            (st.v += 0.34 * Y),
            (J0.v += 0.22 * Y),
            (v0.v += 0.05 * Y),
            (C0.x = 1),
            (C0.v = 0),
            (G.lockK = 0));
        } else ((G.lockK = 1), (C0.x = 0), (C0.v = 0));
      for (let Y = B0.length - 1; Y >= 0; Y--) {
        let R0 = B0[Y];
        ((R0.t -= s0), R0.t <= 0 && (B0.splice(Y, 1), R0.f()));
      }
      ((nt.sinceShot += s0),
        (nt.env *= Math.exp(-s0 * (nt.locked ? 5 : 8.5))),
        (nt.soft += (1 - nt.soft) * (1 - Math.exp(-s0 * 2.2))));
      let N = U > nt.adsPrev + 1e-5,
        q = U < nt.adsPrev - 1e-5;
      ((nt.arc +=
        ((N ? 1 : q ? -0.5 : 0) * Math.sin(Math.PI * U) - nt.arc) *
        (1 - Math.exp(-s0 * 26))),
        U >= 0.985 &&
          nt.adsPrev < 0.985 &&
          ((st.v -= 0.42), (v0.v -= 0.16), (J0.v += 0.3), (nt.pulse = 1)),
        U <= 0.02 && nt.adsPrev > 0.02 && ((st.v += 0.22), (v0.v += 0.06)),
        (nt.adsPrev = U),
        (nt.ads = U),
        (nt.pulse *= Math.exp(-s0 * 6)));
      let o0 = Math.min(s0, 0.05),
        h0 = Math.ceil(o0 / 0.004);
      o0 /= h0;
      for (let Y = 0; Y < h0; Y++)
        (k0(st, o0, nt.soft),
          k0(J0, o0, nt.soft),
          k0(q0, o0, nt.soft),
          k0(v0, o0, 1),
          k0(x0, o0, 1),
          k0(C0, o0, 1));
      ((G.lockK = Math.min(1, 1 - C0.x)), nt.trgHold > 0 && (nt.trgHold -= s0));
      let y0 = Math.max(
        X,
        nt.trgHold > 0 ? 1 : 0,
        nt.sinceShot < (nt.locked ? 0.25 : 0.55) ? 0.42 : 0,
      );
      nt.trg += (y0 - nt.trg) * (1 - Math.exp(-s0 * (y0 > nt.trg ? 70 : 24)));
      let D = E0 && U < 0.1 ? wk(((l0.sprint || 0) - 0.3) / 0.5) : 0;
      ((nt.sp += (D - nt.sp) * (1 - Math.exp(-s0 * (D > nt.sp ? 6.5 : 9)))),
        nt.sp < 0.22 &&
          nt.spPrev >= 0.22 &&
          ((nt.regrip = 0),
          B0.push({
            t: 0.11,
            f: () => {
              ((st.v -= 0.3),
                (x0.v -= 0.045),
                (J0.v += 0.2),
                (nt.pulse = Math.max(nt.pulse, 0.8)));
            },
          })),
        (nt.spDir = nt.sp < nt.spPrev ? -1 : nt.sp > nt.spPrev ? 1 : nt.spDir),
        (nt.spPrev = nt.sp),
        nt.regrip >= 0 &&
          ((nt.regrip += s0), nt.regrip > 0.5 && (nt.regrip = -1)));
      let W = E0 && U < 0.05 && nt.sp < 0.02 && nt.sinceShot > 1.5;
      ((nt.idle = W ? nt.idle + s0 : 0),
        nt.fid < 0 &&
          nt.idle > nt.fidAt &&
          ((nt.fid = 0),
          (nt.fidKind = (nt.fidKind + 1 + (L0() > 0.6 ? 1 : 0)) % 3)),
        nt.fid >= 0 &&
          ((nt.fid += s0),
          (nt.fid > 0.7 || !W) &&
            ((nt.fid = -1), (nt.idle = 0), (nt.fidAt = 3.5 + L0() * 4.5))),
        (nt.ow += ((E0 ? 1 : 0) - nt.ow) * (1 - Math.exp(-s0 * 16))));
    },
    c0 = () => {
      let s0 = nt.arc,
        l0 = s0 > 0 ? s0 : 0,
        E0 = o.root;
      (ZO.set(st.x + 0.055 * s0, q0.x - 0.02 * l0, J0.x + 0.05 * s0, "YXZ"),
        E0.quaternion.setFromEuler(ZO),
        E0.position
          .copy(O0)
          .applyQuaternion(E0.quaternion)
          .multiplyScalar(-1)
          .add(O0),
        (E0.position.z += v0.x + 0.02 * l0),
        (E0.position.y += x0.x - 0.007 * l0));
    },
    Z = (s0) => {
      let l0 = t.clip.R.pose,
        E0 = t.clip.L.pose,
        U = t.clip.L;
      (Q0.Rp.set(l0), Q0.Lp.set(E0), Q0.Lpos.copy(U.pos), Q0.Lq.copy(U.quat));
      let X = 0.9 * nt.ads + 1.3 * nt.pulse + 1.7 * nt.env;
      for (let q = 1; q < 4; q++)
        ((l0[q * 4 + 2] += 1.3 * X), (l0[q * 4 + 3] += 0.8 * X));
      for (let q = 0; q < 4; q++)
        ((E0[q * 4 + 2] += 1.5 * X), (E0[q * 4 + 3] += 0.9 * X));
      ((E0[19] += 2 * X), (l0[20] += 1.4 * X));
      let N = O4(nt.sp) * nt.ow;
      if (N > 0.001) {
        ht.eval(1, n, kT, QO);
        let q = s0.elbowL ? s0.elbowL.z : 0;
        ((kT.y += Math.abs(q) * 0.6),
          (kT.z -= q * 1.5),
          U.pos.lerp(kT, N),
          U.quat.slerp(QO, N));
        for (let D = 0; D < Ui - 1; D++) {
          let W = D < 16 ? D >> 2 : 4,
            Y =
              nt.spDir < 0
                ? W === 4
                  ? 0.02
                  : 0.06 * W
                : W === 4
                  ? 0
                  : 0.03 * (W + 1);
          E0[D] += (pt[D] - E0[D]) * O4((nt.sp - Y) / 0.7) * nt.ow;
        }
        let o0 = e.solo.pose,
          h0 = O4(N * 2),
          y0 = O4(N * 2 - 1);
        for (let D = 16; D < 21; D++)
          ((l0[D] += (O[D] - l0[D]) * h0), (l0[D] += (o0[D] - l0[D]) * y0));
        for (let D = 1; D < 4; D++) l0[D * 4 + 2] += 1.4 * N;
      }
      if (nt.regrip >= 0)
        for (let q = 1; q < 4; q++) {
          let o0 = wk((nt.regrip - (3 - q) * 0.045) / 0.36),
            h0 = Math.sin(Math.PI * Math.pow(o0, 0.6)) * (1 - o0) * 2;
          ((l0[q * 4] -= 5 * h0),
            (l0[q * 4 + 2] -= 8 * h0),
            (l0[q * 4 + 3] -= 4 * h0));
        }
      if (nt.fid >= 0) {
        let q = Math.sin(Math.PI * Math.pow(nt.fid / 0.7, 0.6));
        nt.fidKind === 0
          ? ((l0[19] -= 9 * q), (l0[20] -= 8 * q), (l0[17] += 3 * q))
          : nt.fidKind === 1
            ? ((l0[0] -= 6 * q), (l0[2] -= 5 * q), (l0[1] += 2 * q))
            : ((E0[16] += 2.5 * q), (E0[19] -= 5 * q), (E0[20] -= 7 * q));
      }
    };
  o.feel = {
    Z: nt,
    F: G,
    flip: st,
    roll: J0,
    yaw: q0,
    back: v0,
    drop: x0,
  };
  let r0 = {
    pos: wl(0, 0, 0),
    rot: new Euler(),
  };
  ((o.resetPose = () => {
    ((r = !1), n.begin(r0), t.flush(null));
  }),
    (o.update = (s0, l0) => {
      let E0 = l <= 0,
        U = l0.trigger != null;
      if ((l > 0 && l--, s0 > 0 && V0(s0, l0, E0), c0(), U)) {
        let X = nt.trg;
        (n.part("trigger", 0, 0, 0, -0.24 * X),
          n.part("trigBlade", 0, 0, 0.0012 * Math.min(1, X * 4)));
      }
      (Z(l0),
        (ot.rig = l0.rig),
        (ot.trigger = U ? nt.trg : void 0),
        (ot.ads = l0.ads),
        (ot.sprint = l0.sprint),
        (ot.elbowR = l0.elbowR),
        (ot.elbowL = l0.elbowL),
        t.update(s0, ot),
        t.clip.R.pose.set(Q0.Rp),
        t.clip.L.pose.set(Q0.Lp),
        t.clip.L.pos.copy(Q0.Lpos),
        t.clip.L.quat.copy(Q0.Lq));
    }));
  let b0 = new Map(),
    d0 = (s0) => {
      let l0 = b0.get(s0);
      if (!l0) {
        let E0 = (s0.userData && s0.userData.base) || s0.color;
        ((l0 = new MeshStandardMaterial({
          color: E0 ? E0.clone() : new Color(3355443),
          roughness: s0.roughness ?? 0.6,
          metalness: s0.metalness ?? 0,
        })),
          b0.set(s0, l0));
      }
      return l0;
    },
    V = 0.0086,
    B = o.magP,
    j = V - B.y1 - 5e-4;
  ((o.spawnMag = () => {
    let s0 = s.mag,
      l0 = new Group();
    return (
      (l0.name = "magProp"),
      s0.traverse((E0) => {
        if (E0.isMesh && E0.parent.visible) {
          let U = new Mesh(E0.geometry, d0(E0.material));
          ((U.position.y = -V), l0.add(U));
        }
      }),
      l0.quaternion.copy(s0.quaternion),
      l0.position.set(0, V, 0).applyQuaternion(s0.quaternion).add(s0.position),
      (l0.userData.physics = {
        size: [0.026, j, 0.04],
        center: [0, -j / 2, 0.017],
        mass: 0.28,
        mat: "metal",
      }),
      (r = !0),
      l0
    );
  }),
    (o.showGrip = (s0) => {
      (e[s0] || o.bakeAll(), o.resetPose());
      let l0 = e[s0],
        E0 = t.clip[l0.side];
      (E0.pos.copy(l0.pos),
        E0.quat.copy(l0.quat),
        E0.pose.set(l0.pose),
        t.flush(null));
    }),
    o.resetPose());
}

export { JO, buildSMG };

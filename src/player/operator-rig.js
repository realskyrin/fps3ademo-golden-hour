// player/operator-rig.js: recovered from the verified GOLDEN HOUR release.
import {
  TAU,
  angleDelta,
  clamp,
  createNoise,
  damp,
  dampAngle,
  lerp,
  smoothstep,
} from "../core/math.js";
import {
  Bone,
  Box3,
  BufferGeometry,
  DataTexture,
  Group,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
  Uint32BufferAttribute,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";
import {
  AE,
  CE,
  Ca,
  PE,
  Pi,
  Qg,
  Sn,
  TH,
  Ve,
  Wr,
  Yc,
  ey,
  f2,
  fs,
  gE,
  h2,
  hp,
  kE,
  lf,
  mH,
  mh,
  nf,
  pH,
  qr,
  rf,
  t4,
  u2,
  u5,
} from "./rig.js";
import { BN, UN } from "./operator-mesh.js";

var Yy = Math.PI * 2;
var jy = (o, t, e) => {
  let s = Math.min(Math.max((e - o) / (t - o), 0), 1);
  return s * s * (3 - 2 * s);
};
function VN(o, t, e, s, n) {
  for (let i = 0; i < t; i++)
    for (let a = 0; a < t; a++) {
      let r = (a + t - 1) % t,
        l = (a + 1) % t,
        c = (i + t - 1) % t,
        h = (i + 1) % t,
        f = (o[i * t + l] - o[i * t + r]) * e,
        u = (o[h * t + a] - o[c * t + a]) * e,
        d = 1 / Math.hypot(f, u, 1),
        m = (i * t + a) * 4 + n;
      ((s[m] = Math.round((-f * d * 0.5 + 0.5) * 255)),
        (s[m + 1] = Math.round((-u * d * 0.5 + 0.5) * 255)));
    }
}
var Bk = null;
function ft0() {
  if (Bk) return Bk;
  let o = 1024,
    t = new Uint8Array(o * o * 4),
    e = new Float32Array(o * o),
    s = createNoise(311);
  for (let i = 0; i < o; i++)
    for (let a = 0; a < o; a++) {
      let r = a / o,
        l = i / o,
        c =
          0.3 * Math.sin((Yy * (a + i)) / 6) +
          0.22 * Math.sin((Yy * a) / 4) * Math.sin((Yy * i) / 4),
        h = a % 32,
        f = i % 32;
      c +=
        0.75 *
        Math.max(
          Math.max(0, 1 - Math.abs(h - 1.5) / 1.6),
          Math.max(0, 1 - Math.abs(f - 1.5) / 1.6),
        );
      let u = s.fbm(r * 7, l * 7, 4, 7),
        d = s.fbm(r * 13 + 5.3, l * 13 + 1.7, 3, 13);
      ((c += 5.5 * (1 - Math.abs(2 * u - 1)) + 2.2 * d), (e[i * o + a] = c));
    }
  VN(e, o, 0.55, t, 0);
  for (let i = 0; i < o; i++)
    for (let a = 0; a < o; a++) {
      let r = a / o,
        l = i / o,
        c = 8,
        h = Math.floor(a / c),
        f = Math.floor(i / c),
        u = (a % c) / c - 0.5,
        d = (i % c) / c - 0.5,
        p =
          (h + f) & 1
            ? Math.cos(Math.PI * d) * (0.75 + 0.25 * Math.cos(Yy * u))
            : Math.cos(Math.PI * u) * (0.75 + 0.25 * Math.cos(Yy * d));
      ((p =
        p * 1.5 +
        1.4 * s.fbm(r * 24 + 9.1, l * 24 + 4.4, 3, 24) +
        2 * s.fbm(r * 5 + 2.1, l * 5 + 7.7, 3, 5)),
        (e[i * o + a] = p));
    }
  VN(e, o, 0.6, t, 2);
  let n = new DataTexture(t, o, o, RGBAFormat);
  return (
    (n.wrapS = n.wrapT = RepeatWrapping),
    n.repeat.set(4, 4),
    (n.generateMipmaps = !0),
    (n.minFilter = LinearMipmapLinearFilter),
    (n.magFilter = LinearFilter),
    (n.anisotropy = 8),
    (n.needsUpdate = !0),
    (Bk = n)
  );
}
var Uk = [null, null];
function ut0(o, t) {
  if (Uk[o]) return Uk[o];
  let e = 512,
    s = new Uint8Array(e * e * 4),
    n = createNoise(71 + o * 13),
    i = [t.camoA, t.camoB, t.camoC, t.camoD].map((h) => [
      (h >> 16) & 255,
      (h >> 8) & 255,
      h & 255,
    ]);
  for (let h = 0; h < e; h++)
    for (let f = 0; f < e; f++) {
      let u = f / e,
        d = h / e,
        m = n.fbm(u * 4 + 3.1, d * 4 + 8.2, 3, 4) - 0.5,
        p = n.fbm(u * 4 + 9.4, d * 4 + 2.6, 3, 4) - 0.5,
        x = n.fbm(u * 5 + m * 1.6, d * 9 + p * 1.6, 4, 0),
        g = n.fbm(u * 8 + 4.7 + p * 1.2, d * 13 + 1.3 + m * 1.2, 3, 0),
        b = n.fbm(u * 26 + 2.2, d * 34 + 6.1, 2, 0),
        v = i[0][0],
        y = i[0][1],
        M = i[0][2],
        w = (E, _) => {
          ((v += (E[0] - v) * _), (y += (E[1] - y) * _), (M += (E[2] - M) * _));
        };
      (w(i[2], jy(0.565, 0.585, x)),
        w(i[3], jy(0.57, 0.59, g)),
        w(i[1], jy(0.435, 0.415, x)),
        w(i[1], jy(0.69, 0.71, b) * 0.9),
        w(i[2], jy(0.27, 0.25, b) * 0.8));
      let T = (h * e + f) * 4,
        S = 0.94 + 0.12 * n.fbm(u * 3 + 1.1, d * 3 + 5.5, 3, 3);
      ((s[T] = Math.min(255, v * S)),
        (s[T + 1] = Math.min(255, y * S)),
        (s[T + 2] = Math.min(255, M * S)),
        (s[T + 3] = Math.round(
          255 *
            Math.min(
              1,
              Math.max(
                0,
                0.5 + 1.6 * (n.fbm(u * 9 + 7.7, d * 9 + 3.3, 4, 9) - 0.5),
              ),
            ),
        )));
    }
  let a = 40,
    r = s.slice(),
    l = (h, f, u) => r[(((f + e) % e) * e + ((h + e) % e)) * 4 + u];
  for (let h = 0; h < e; h++)
    for (let f = 0; f < e; f++) {
      let u =
          f < a
            ? 0.5 * (1 - f / a)
            : f >= e - a
              ? 0.5 * (1 - (e - 1 - f) / a)
              : 0,
        d =
          h < a
            ? 0.5 * (1 - h / a)
            : h >= e - a
              ? 0.5 * (1 - (e - 1 - h) / a)
              : 0;
      if (!(u === 0 && d === 0))
        for (let m = 0; m < 4; m++) {
          let p = l(f, h, m),
            x = l(e - 1 - f, h, m),
            g = l(f, e - 1 - h, m),
            b = l(e - 1 - f, e - 1 - h, m);
          s[(h * e + f) * 4 + m] =
            (p * (1 - u) + x * u) * (1 - d) + (g * (1 - u) + b * u) * d;
        }
    }
  let c = new DataTexture(s, e, e, RGBAFormat);
  return (
    (c.colorSpace = SRGBColorSpace),
    (c.wrapS = c.wrapT = RepeatWrapping),
    c.repeat.set(1 / 0.44, 1 / 0.44),
    (c.generateMipmaps = !0),
    (c.minFilter = LinearMipmapLinearFilter),
    (c.magFilter = LinearFilter),
    (c.anisotropy = 8),
    (c.needsUpdate = !0),
    (Uk[o] = c)
  );
}
function Wk(o) {
  return (
    (o.onBeforeCompile = (t) => {
      if (
        ((t.uniforms.ghRim = o.userData.rim),
        (t.uniforms.ghFill = o.userData.fill),
        o.userData.fp)
      ) {
        let e = o.userData.fp;
        ((t.uniforms.ghFpFill = e.fill),
          (t.uniforms.ghFpRim = e.rim),
          (t.uniforms.ghFpSky = e.sky),
          (t.uniforms.ghFpGnd = e.gnd),
          (t.uniforms.ghFpSun = e.sun));
      }
      ((t.vertexShader = t.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute vec4 aux;
attribute vec3 aux2;
varying vec4 vAux;
varying vec3 vAux2;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vAux = aux; vAux2 = aux2;`,
        )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying vec4 vAux;
varying vec3 vAux2;
uniform vec4 ghRim;
uniform vec3 ghFill;
// ---- ghCharacterFill: the ONE place that fakes indoor fill / rim light for operators. ----
// Swap its body for a light-probe lookup; uniforms ghFill (rgb) and ghRim (rgb, power) are CHARACTER_FILL / CHARACTER_RIM in JS.
#ifdef GH_FP
uniform vec3 ghFpFill, ghFpRim, ghFpSky, ghFpGnd;
uniform float ghFpSun;
#endif
vec3 ghCharacterFill( vec3 N, vec3 V, vec3 albedo, float ao ) {
  #ifdef GH_FP
    // the player's own body: the first-person rig of the weapon and sleeves (render/vmlight.js: over-the-shoulder key,
    // cool rim, hemisphere, all in camera space) at the levels that rig has this frame, so cloth meets cloth
    float f = saturate( dot( N, vec3( 0.332, 0.730, 0.597 ) ) ), r = saturate( dot( N, vec3( -0.684, 0.456, 0.570 ) ) );
    return albedo * ( ghFpFill * f + ghFpRim * r + mix( ghFpGnd, ghFpSky, 0.5 + 0.5 * N.y ) ) * RECIPROCAL_PI * mix( 1.0, ao, 0.8 );
  #endif
  float nv = saturate( dot( N, V ) );
  float up = 0.5 + 0.5 * inverseTransformDirection( N, viewMatrix ).y;
  return ( albedo * ghFill * ( 0.3 + 0.7 * nv ) * ( 0.55 + 0.45 * up ) + ghRim.rgb * pow( 1.0 - nv, ghRim.w ) * ( 0.35 + 0.65 * up ) ) * ao;
}`,
          )
          .replace(
            "#include <map_fragment>",
            `
        float ghGrime = 0.5;
        #ifdef USE_MAP
          vec4 ghCamo = texture2D( map, vMapUv );
          diffuseColor.rgb *= mix( vec3( 1.0 ), ghCamo.rgb, vAux2.y );
          ghGrime = ghCamo.a;
        #endif
        diffuseColor.rgb *= mix( 1.0, vAux.w, 0.5 ) * mix( 0.9, 1.08, ghGrime );`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            "float roughnessFactor = clamp( roughness * vAux.y * mix( 0.86, 1.12, ghGrime ), 0.04, 1.0 );",
          )
          .replace(
            "#include <metalnessmap_fragment>",
            "float metalnessFactor = metalness * vAux.z;",
          )
          .replace(
            "#include <normal_fragment_maps>",
            `
        #ifdef USE_NORMALMAP_TANGENTSPACE
          vec4 ghN = texture2D( normalMap, vNormalMapUv );
          vec2 ghXY = ( mix( ghN.rg, ghN.ba, vAux2.z ) * 2.0 - 1.0 ) * normalScale * vAux2.x;
          normal = normalize( tbn * vec3( ghXY, sqrt( max( 1.0 - dot( ghXY, ghXY ), 0.05 ) ) ) );
        #endif`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
totalEmissiveRadiance += vColor.rgb * vAux.x;`,
          )
          .replace(
            "#include <aomap_fragment>",
            `
        #ifdef GH_FP
          reflectedLight.directDiffuse *= ghFpSun; reflectedLight.directSpecular *= ghFpSun;
        #endif
        reflectedLight.indirectDiffuse *= vAux.w;
        reflectedLight.indirectSpecular *= mix( 1.0, vAux.w, 0.85 );
        // character light: a soft camera-side fill and a cool sky rim keep operators readable in unlit rooms
        // (both are tiny next to real sunlight, so lit areas are unaffected)
        reflectedLight.indirectDiffuse += ghCharacterFill( normal, normalize( vViewPosition ), diffuseColor.rgb * ( 1.0 - metalnessFactor ), vAux.w );`,
          )));
    }),
    (o.customProgramCacheKey = () => "gh-operator-5"),
    o
  );
}
var qk = {
  value: new Vector3(0.34, 0.39, 0.43),
};
var Kk = {
  value: new Vector4(0.05, 0.064, 0.078, 2.8),
};
var dt0 = typeof document > "u";
var Vk = [null, null];
function Xk(o, t) {
  if (Vk[o]) return Vk[o];
  let e = new MeshStandardMaterial({
    vertexColors: !0,
    roughness: 1,
    metalness: 1,
  });
  return (
    dt0 || ((e.map = ut0(o, t)), (e.normalMap = ft0())),
    (e.userData.rim = Kk),
    (e.userData.fill = qk),
    (Vk[o] = Wk(e))
  );
}
var Up = {
  fill: {
    value: new Vector3(),
  },
  rim: {
    value: new Vector3(),
  },
  sky: {
    value: new Vector3(0.05, 0.05, 0.05),
  },
  gnd: {
    value: new Vector3(0.03, 0.03, 0.03),
  },
  sun: {
    value: 1,
  },
};
var Gk = [null, null];
function GN(o, t) {
  if (Gk[o]) return Gk[o];
  let e = Xk(o, t),
    s = e.clone();
  return (
    (s.userData.rim = e.userData.rim),
    (s.userData.fill = e.userData.fill),
    (s.userData.fp = Up),
    (s.defines = {
      ...(s.defines || {}),
      GH_FP: 1,
    }),
    (Gk[o] = Wk(s))
  );
}
function WN(o) {
  let t = o.clone();
  return (
    (t.userData.rim = o.userData.rim),
    (t.userData.fill = o.userData.fill),
    (t.transparent = !0),
    (t.depthWrite = !0),
    Wk(t)
  );
}
var ba = fs;
var Ji = Vector3;
var Yk = 0.4;
var jk = 0.26;
var $k = 0.945;
var qN = 0.5;
var pt0 = 0.565;
var t7 = mh - ey;
var sC = [0, 0.5, 1, 1.4, 1.8, 2.4, 3, 3.6, 4.5, 5.5, 6.5, 8];
var jN = [
  0.66, 0.64, 0.6, 0.56, 0.48, 0.4, 0.345, 0.305, 0.26, 0.228, 0.205, 0.18,
];
var $N = [
  0.75, 0.85, 1.05, 1.28, 1.42, 1.5, 1.54, 1.58, 1.64, 1.74, 1.86, 2.05,
];
var R2 = [0.6, 1.4, 2.4, 4.5, 6.5];
var ZN = [0.17, 0.2, 0.28, 0.4, 0.5];
var QN = [0.125, 0.135, 0.2, 0.31, 0.39];
var JN = [0.11, 0.115, 0.15, 0.195, 0.235];
var tB = [0.02, 0.04, 0.055, 0.07, 0.085];
var eB = [0.1, 0.1, 0.02, -0.03, -0.04];
var sB = [0.03, 0.03, 0.03, 0.04, 0.08];
var nB = [0.2, 0.26, 0.16, 0.08, -0.05];
var oB = [0.6, 0.8, 0.95, 1.08, 1.15];
var mt0 = [0.908, 0.905, 0.915, 0.93, 0.925];
var iB = [0.47, 0.46, 0.36, 0.3, 0.27];
function G1(o, t, e) {
  if (e <= o[0]) return t[0];
  for (let s = 1; s < o.length; s++)
    if (e <= o[s])
      return (
        t[s - 1] + ((t[s] - t[s - 1]) * (e - o[s - 1])) / (o[s] - o[s - 1])
      );
  return t[t.length - 1];
}
var Ao = (o) => ((o = o < 0 ? 0 : o > 1 ? 1 : o), o * o * (3 - 2 * o));
var Vp = [0, 0.3, 0.55, 0.84, 1];
var Zk = [null, null];
var Qk = null;
function aB(o) {
  if (Zk[o]) return Zk[o];
  let t = new gE(),
    e = t4[o];
  (TH(t, e), UN(t, e), t.bakeAO());
  let s = t.idx.length;
  BN(t, e);
  let n = t.build();
  return (n.setDrawRange(0, s), (n.userData.triangles = s / 3), (Zk[o] = n));
}
function gt0() {
  return (Qk || (Qk = PE().map((o) => o.clone().invert())), Qk);
}
var On = new Ji(0, 1, 0);
var Jk = new Ji(1, 1, 1);
var xt0 = new Matrix4();
var Me = () => new Ji();
var At = {
  fwd: Me(),
  right: Me(),
  pf: Me(),
  pr: Me(),
  D: Me(),
  aimUp: Me(),
  velDir: Me(),
  lat: Me(),
  home: Me(),
  base: Me(),
  lean: Me(),
  spine: Me(),
  nd: Me(),
  hd: Me(),
  m: Me(),
  mr: Me(),
  F: Me(),
  Rv: Me(),
  cdir: Me(),
  ndir: Me(),
  hdir: Me(),
  sh: Me(),
  hip: Me(),
  mid: Me(),
  dirT: Me(),
  SL: Me(),
  SR: Me(),
  HL: Me(),
  HR: Me(),
  kL: Me(),
  kR: Me(),
  fL: Me(),
  fR: Me(),
  eL: Me(),
  eR: Me(),
  wL: Me(),
  wR: Me(),
  pocket: Me(),
  Ga: Me(),
  Gs: Me(),
  gx: Me(),
  gy: Me(),
  gz: Me(),
  cu: Me(),
  cfw: Me(),
  pole: Me(),
  mag: Me(),
  pouch: Me(),
  palmL: Me(),
  palmR: Me(),
  a0: Me(),
  a1: Me(),
  v0: Me(),
  v1: Me(),
  v2: Me(),
  eye: Me(),
};
var Rf = Me();
var W5 = Me();
var Yu = new Quaternion();
var Gp = new Quaternion();
var K4 = new Quaternion();
var X5 = new Matrix4();
var Qr = [0, 0];
var $y = [0, 0, 0];
var KN = new Box3();
var XN = () => (typeof performance < "u" ? performance.now() : Date.now());
var e7 = {
  ar: {
    imp: 42,
    back: 0.032,
    rise: 0.045,
    sh: 0.01,
    rock: 0.35,
    pump: !1,
  },
  smg: {
    imp: 30,
    back: 0.02,
    rise: 0.03,
    sh: 0.006,
    rock: 0.2,
    pump: !1,
  },
  shotgun: {
    imp: 78,
    back: 0.05,
    rise: 0.1,
    sh: 0.022,
    rock: 2.2,
    pump: !0,
  },
  pistol: {
    imp: 46,
    back: 0.02,
    rise: 0.15,
    sh: 0.004,
    rock: 0.25,
    pump: !1,
  },
};
var tC = [
  Ve.head,
  Ve.hand,
  Ve.hand + 7,
  Ve.foot,
  Ve.foot + 7,
  Ve.toe,
  Ve.toe + 7,
];
function Qy() {
  return {
    P: Me(),
    C: Me(),
    N: Me(),
    H: Me(),
    sh: Me(),
    hip: Me(),
    AL: Me(),
    AR: Me(),
    KL: Me(),
    KR: Me(),
  };
}
var Wp = ["P", "C", "N", "H", "sh", "hip", "AL", "AR", "KL", "KR"];
var bt0 = Qy();
var yt0 = Qy();
var vt0 = Qy();
var Mt0 = Qy();
var wt0 = Qy();
function A2(o, t) {
  let e = o.lengthSq();
  return e < 1e-10 ? o.copy(t) : o.multiplyScalar(1 / Math.sqrt(e));
}
function nC(o, t, e) {
  return (
    o.addScaledVector(t, -o.dot(t)),
    o.lengthSq() < 1e-6 &&
      (o.copy(e).addScaledVector(t, -e.dot(t)),
      o.lengthSq() < 1e-6 &&
        (o.set(1, 0, 0).addScaledVector(t, -t.x),
        o.lengthSq() < 1e-6 && o.set(0, 0, 1).addScaledVector(t, -t.z))),
    o.normalize()
  );
}
function Zy(o, t, e, s, n, i, a, r, l = 0) {
  Rf.subVectors(t, o);
  let c = Rf.length();
  c < 1e-5 ? (Rf.set(0, -1, 0), (c = 1e-5)) : Rf.multiplyScalar(1 / c);
  let h = clamp(c, Math.max(Math.abs(e - s) + 0.03, (e + s) * l), (e + s) * r),
    f = (e * e - s * s + h * h) / (2 * h),
    u = Math.sqrt(Math.max(e * e - f * f, 0));
  (W5.copy(n).addScaledVector(Rf, -n.dot(Rf)),
    W5.lengthSq() < 1e-8 &&
      (W5.set(Rf.y, -Rf.x, 0), W5.lengthSq() < 1e-8 && W5.set(0, 0, 1)),
    W5.normalize(),
    i.copy(o).addScaledVector(Rf, f).addScaledVector(W5, u),
    a.copy(o).addScaledVector(Rf, h));
}
function $l(o, t, e) {
  let s = t * 3;
  ((o[s] = e.x), (o[s + 1] = e.y), (o[s + 2] = e.z));
}
function q5(o, t, e, s) {
  return (X5.makeBasis(t, e, s), o.setFromRotationMatrix(X5));
}
function K5(o, t) {
  if (o >= 0) {
    let e = Math.cos(o),
      s = Math.sin(o);
    ((t[0] = -Qg + Qg * e - Sn * s), (t[1] = Qg * s + Sn * e));
  } else {
    let e = Math.cos(o),
      s = -Math.sin(o);
    ((t[0] = u2 - u2 * e + Sn * s), (t[1] = u2 * s + Sn * e));
  }
  return t;
}
function s7(o, t, e, s, n) {
  let i = 0;
  for (; i < 3 && s > Vp[i + 1];) i++;
  let a = Vp[i + 1] - Vp[i],
    r = (s - Vp[i]) / a,
    l = r * r,
    c = l * r,
    h = i === 0 ? t : (o[i + 1] - o[i - 1]) / (Vp[i + 1] - Vp[i - 1]),
    f = i === 3 ? e : (o[i + 2] - o[i]) / (Vp[i + 2] - Vp[i]);
  return (
    n !== void 0 && (i === 3 ? (h = n) : i === 2 && (f = n)),
    (2 * c - 3 * l + 1) * o[i] +
      (c - 2 * l + r) * h * a +
      (-2 * c + 3 * l) * o[i + 1] +
      (c - l) * f * a
  );
}
var YN = () => ({
  mode: 0,
  plant: Me(),
  dir: new Ji(0, 0, -1),
  pitch: 0,
  toe: 0,
  ankle: Me(),
  off: Me(),
  u0: 0,
  pitchOff: 0,
  dir0: new Ji(0, 0, -1),
  gy0: 0,
  from: Me(),
  to: Me(),
  fromPitch: 0,
  t: 1,
  dur: 0.2,
  lift: 0.06,
  k0: 0,
  pitch0: 0,
  rel: Me(),
  prevA: Me(),
  bo: Me(),
  X: new Float32Array(5),
  Y: new Float32Array(5),
  Pk: new Float32Array(5),
  mx0: 0,
  my0: 0,
  mx1: 0,
  my1: 0,
  l0: 0,
  l1: 0,
  stance: !1,
  ext: 0,
  knee: 0,
  k: 0,
});
var OperatorRig = class {
  constructor({ team: t = 0, gunFactory: e = null, ground: s = null } = {}) {
    ((this.ground = s),
      (this.team = t ? 1 : 0),
      (this.gunFactory = e),
      (this.root = new Group()),
      (this.root.name = "operator"),
      (this.joints = new Float32Array(48)),
      (this.bones = pH),
      (this.JOINT_RADIUS = mH),
      (this.hit = [
        {
          part: "head",
          a: Me(),
          b: Me(),
          r: 0.13,
        },
        {
          part: "torso",
          a: Me(),
          b: Me(),
          r: 0.24,
        },
        {
          part: "legs",
          a: Me(),
          b: Me(),
          r: 0.2,
        },
      ]),
      (this._mat = Xk(this.team, t4[this.team])),
      (this._fadeMat = null),
      (this._opacity = 1),
      (this._mats = []),
      (this._bones = []));
    for (let i = 0; i < kE; i++) {
      this._mats.push(new Matrix4());
      let a = new Bone();
      ((a.matrixAutoUpdate = !1), this.root.add(a), this._bones.push(a));
    }
    let n = (this.body = new SkinnedMesh(aB(this.team), this._mat));
    ((n.name = "body"),
      (n.castShadow = !0),
      (n.receiveShadow = !0),
      (n.frustumCulled = !1),
      (n.matrixAutoUpdate = !1),
      n.bind(
        new Skeleton(
          this._bones,
          gt0().map((i) => i.clone()),
        ),
        xt0,
      ),
      this.root.add(n),
      (this.triangles = n.geometry.userData.triangles),
      (this.gun = null),
      (this.weaponId = null),
      (this.gunPos = Me()),
      (this.gunQuat = new Quaternion()),
      (this._gripR = new Ji(0.017, -0.04, 0.012)),
      (this._gripL = new Ji(-0.03, 0.01, -0.3)),
      (this._muzzle = new Ji(0, 0.04, -0.6)),
      (this._gripRq = new Quaternion()),
      (this._gripLq = new Quaternion()),
      (this._sight = new Ji(0, 0.11, -0.05)),
      (this._stock = 0.28),
      (this._pistol = !1),
      (this.jointVel = new Float32Array(48)),
      (this._pj = new Float32Array(48)),
      (this._pjOk = !1),
      (this._yo = 0),
      (this._py = 0),
      (this.wEngage = 1),
      (this._hy = 0),
      (this._hp = 0),
      (this._br = Math.random() * 6),
      (this._exert = 0),
      (this._pumpT = -1),
      (this._throwT = -1),
      (this._airT = 0),
      (this._aimX = 0),
      (this._aimZ = -1),
      (this._peak = 0),
      (this._resOn = 0),
      (this._res = {
        t0: 0,
        q: [],
        p: [],
        last: [],
      }));
    for (let i = 0; i < 7; i++)
      (this._res.q.push(new Quaternion()),
        this._res.p.push(Me()),
        this._res.last.push(new Matrix4()));
    (this._defaultGrips(),
      (this._hint = {
        headFwd: new Ji(0, 0, -1),
        headUp: new Ji(0, 1, 0),
        handQ: [new Quaternion(), new Quaternion()],
        handP: [Me(), Me()],
        handW: [0, 0],
        footF: [new Ji(0, 0, -1), new Ji(0, 0, -1)],
        footU: [new Ji(0, 1, 0), new Ji(0, 1, 0)],
        footW: 0,
        toeBend: [0, 0],
        magM: null,
      }),
      (this._magM = new Matrix4()),
      (this.time = Math.random() * 10),
      (this._live = !1),
      (this._hinted = !1),
      (this._wasDP = !1),
      (this._wasAir = !1),
      (this._prev = Me()),
      (this.vel = Me()),
      (this.acc = Me()),
      (this.off = jk),
      (this.back = !1),
      (this.phase = 0),
      (this.gaitOn = !1),
      (this.stepCool = 0),
      (this.feet = [YN(), YN()]),
      (this.wCrouch = 0),
      (this.wSlide = 0),
      (this.wDive = 0),
      (this.wProne = 0),
      (this.wSprint = 0),
      (this.wAir = 0),
      (this.wReload = 0),
      (this.wMove = 0),
      (this.reloadT = 0),
      (this.axis = new Ji(0, 0, -1)),
      (this._kick = {
        x: 0,
        v: 0,
      }),
      (this._land = {
        x: 0,
        v: 0,
      }),
      (this.drop = 0),
      (this.vy = 0),
      (this._leanX = {
        x: 0,
        v: 0,
      }),
      (this._leanZ = {
        x: 0,
        v: 0,
      }),
      (this._flX = {
        x: 0,
        v: 0,
      }),
      (this._flZ = {
        x: 0,
        v: 0,
      }),
      (this._flT = {
        x: 0,
        v: 0,
      }),
      (this._shift = 0),
      (this._ground = 0),
      (this._pvd = new Ji(0, 0, -1)),
      (this._warp = -1),
      (this.g = {
        duty: 0.6,
        f: 1,
        Lc: 0.5,
        xl: 0.2,
        thHS: 0.2,
        phO: 0.8,
        k1: 0.2,
        k2: 0.5,
        ya: 0.2,
        yb: 0.13,
        yc: 0.11,
        re: 0.04,
        xa: 0.1,
        xb: 0.03,
        rk: 0,
        dsw: 0.5,
        moveK: 0,
      }));
    for (let i = 0; i < 16; i++)
      ((this.joints[i * 3] = nf[i][0]),
        (this.joints[i * 3 + 1] = nf[i][1]),
        (this.joints[i * 3 + 2] = nf[i][2]));
    this.renderFromJoints();
  }
  _defaultGrips() {
    let t = new Ji(0, -0.37, -0.93).normalize(),
      e = new Ji(-1, 0, 0),
      s = new Ji().crossVectors(t, e);
    q5(this._gripRq, s, t, e);
    let n = new Ji(0.62, 0, -0.78).normalize(),
      i = new Ji(0.25, 0.97, 0);
    (i.addScaledVector(n, -i.dot(n)).normalize(),
      q5(this._gripLq, new Ji().crossVectors(n, i), n, i));
  }
  setWeapon(t) {
    if (
      (this.gun &&
        (this._restoreGunMaterials(),
        this.root.remove(this.gun.root),
        (this.gun = null)),
      (this.weaponId = t),
      !this.gunFactory)
    )
      return;
    let e = this.gunFactory(t);
    if (!e || !e.root) return;
    (e.root.position.set(0, 0, 0),
      e.root.quaternion.identity(),
      e.root.scale.set(1, 1, 1),
      e.root.updateMatrix(),
      e.root.updateMatrixWorld(!0),
      KN.setFromObject(e.root),
      (this._stock = clamp(KN.max.z, 0.22, 0.34)),
      this.root.add(e.root),
      e.root.updateWorldMatrix(!0, !0));
    let s = e.anchors || {};
    this._defaultGrips();
    let n = X5.copy(e.root.matrixWorld).invert(),
      i = e.root.getWorldQuaternion(K4).invert(),
      a = !1;
    if (s.gripR) {
      s.gripR.getWorldPosition(this._gripR).applyMatrix4(n);
      let r = s.gripR.quaternion;
      Math.abs(r.lengthSq() - 1) < 0.001 &&
        Math.abs(r.w) < 0.9999 &&
        this._gripRq.copy(r);
    }
    if (s.gripL) {
      s.gripL.getWorldPosition(this._gripL).applyMatrix4(n);
      let r = s.gripL.quaternion;
      Math.abs(r.lengthSq() - 1) < 0.001 &&
        Math.abs(r.w) < 0.9999 &&
        (this._gripLq.copy(r), (a = !0));
    }
    if (
      (s.muzzle && this._muzzle.copy(s.muzzle),
      s.sight ? this._sight.copy(s.sight) : this._sight.set(0, 0.11, -0.05),
      (this._pistol = this._gripL.distanceTo(this._gripR) < 0.12),
      this._pistol && !a)
    ) {
      let r = At.v0.set(0, -0.68, -0.73).normalize(),
        l = At.v1.set(1, 0, 0);
      (l.addScaledVector(r, -l.dot(r)).normalize(),
        q5(this._gripLq, At.v2.crossVectors(r, l), r, l));
    }
    ((e.root.matrixAutoUpdate = !1),
      e.root.traverse((r) => {
        r.isMesh && (r.castShadow = !0);
      }),
      (this.gun = e),
      this._placeGun(),
      this._opacity < 1 && this.setOpacity(this._opacity));
  }
  dropWeapon() {
    let t = this.gun;
    return t
      ? (this._restoreGunMaterials(),
        this.root.remove(t.root),
        (t.root.matrixAutoUpdate = !0),
        t.root.position.copy(this.gunPos),
        t.root.quaternion.copy(this.gunQuat),
        t.root.scale.set(1, 1, 1),
        t.root.updateMatrix(),
        (this.gun = null),
        t.root)
      : null;
  }
  _placeGun() {
    if (!this.gun) return;
    let t = this.gun.root;
    (t.matrix.compose(this.gunPos, this.gunQuat, Jk),
      (t.matrixWorldNeedsUpdate = !0));
  }
  kick() {
    let t = e7[this.weaponId] || e7.ar;
    ((this._kick.v = Math.min(this._kick.v + t.imp, t.imp * 1.7)),
      (this._flX.v -= this._aimX * t.rock),
      (this._flZ.v -= this._aimZ * t.rock),
      t.pump && (this._pumpT = 0));
  }
  throwGrenade() {
    return (this._throwT < 0 && (this._throwT = 0), 0.3);
  }
  flinch(t, e = 1) {
    let s = clamp(e, 0, 2) * 5.5,
      n = 0,
      i = 0;
    if (t) {
      let a = Math.hypot(t.x, t.z);
      a > 1e-4 && ((n = t.x / a), (i = t.z / a));
    }
    if (n === 0 && i === 0) {
      let a = Math.random() * TAU;
      ((n = Math.cos(a)), (i = Math.sin(a)));
    }
    ((this._flX.v += n * s),
      (this._flZ.v += i * s),
      (this._flT.v += (Math.random() < 0.5 ? -1 : 1) * s * 0.8));
  }
  reset() {
    ((this._live = !1),
      (this._wasDP = !1),
      (this._wasAir = !1),
      (this.wCrouch =
        this.wSlide =
        this.wDive =
        this.wProne =
        this.wSprint =
        this.wAir =
        this.wReload =
        this.wMove =
          0),
      (this._pumpT = this._throwT = -1),
      (this._yo = 0),
      (this._hy = this._hp = 0),
      (this._resOn = 0),
      (this._pjOk = !1),
      (this.wEngage = 1),
      (this._exert = 0),
      (this.reloadT = 0),
      (this.drop = 0),
      (this._kick.x = this._kick.v = 0),
      (this._land.x = this._land.v = 0),
      (this._leanX.x = this._leanX.v = this._leanZ.x = this._leanZ.v = 0),
      (this._flX.x =
        this._flX.v =
        this._flZ.x =
        this._flZ.v =
        this._flT.x =
        this._flT.v =
          0),
      (this._shift = 0));
  }
  getMuzzle(t) {
    return t.copy(this._muzzle).applyQuaternion(this.gunQuat).add(this.gunPos);
  }
  getHead(t) {
    return Wr(this.joints, ba.head, t);
  }
  setOpacity(t) {
    if (((t = clamp(t, 0, 1)), (this._opacity = t), t >= 1)) {
      ((this.body.material = this._mat), this._restoreGunMaterials());
      return;
    }
    (this._fadeMat || (this._fadeMat = WN(this._mat)),
      (this._fadeMat.opacity = t),
      (this.body.material = this._fadeMat),
      this.gun &&
        this.gun.root.traverse((e) => {
          !e.isMesh ||
            Array.isArray(e.material) ||
            (e.userData._ghSolid ||
              ((e.userData._ghSolid = e.material),
              (e.material = e.material.clone()),
              (e.material.transparent = !0)),
            (e.material.opacity = t));
        }));
  }
  _restoreGunMaterials() {
    this.gun &&
      this.gun.root.traverse((t) => {
        t.isMesh &&
          t.userData._ghSolid &&
          (t.material.dispose(),
          (t.material = t.userData._ghSolid),
          delete t.userData._ghSolid);
      });
  }
  dispose() {
    (this._restoreGunMaterials(),
      this.root.parent && this.root.parent.remove(this.root),
      this._fadeMat && (this._fadeMat.dispose(), (this._fadeMat = null)),
      this.body.skeleton.dispose(),
      (this.gun = null));
  }
  _gy(t, e, s) {
    if (!this.ground) return s;
    let n = this.ground(t, e, s + 0.5);
    return n > s - 0.7 && n < s + 0.52 ? n : s;
  }
  _homeFoot(t, e, s, n, i, a) {
    let r = t ? 1 : -1,
      l = t ? lerp(-0.12, -0.22, i) : lerp(0.13, 0.2, i);
    return a
      .copy(e)
      .addScaledVector(n, r * lerp(0.15, 0.17, i))
      .addScaledVector(s, l);
  }
  _teleport(t, e, s) {
    let n = t.speed || 0;
    (this._prev.copy(t.pos),
      this.vel
        .set(0, 0, 0)
        .addScaledVector(e, -(t.moveZ || 0) * n)
        .addScaledVector(s, (t.moveX || 0) * n),
      this.acc.set(0, 0, 0),
      (this.vy = 0),
      (this.gaitOn = !1),
      (this.back = !1),
      (this.off = jk),
      (this.drop = 0));
    let i = Math.cos(this.off),
      a = Math.sin(this.off);
    (At.pf.copy(e).multiplyScalar(i).addScaledVector(s, a),
      At.pr.copy(s).multiplyScalar(i).addScaledVector(e, -a));
    for (let r = 0; r < 2; r++) {
      let l = this.feet[r];
      (this._homeFoot(
        r,
        t.pos,
        At.pf,
        At.pr,
        t.stance === "crouch" ? 1 : 0,
        l.plant,
      ),
        l.dir.copy(At.pf),
        (l.mode = 0),
        (l.pitch = 0),
        (l.toe = 0),
        (l.t = 1),
        (l.plant.y = this._gy(l.plant.x, l.plant.z, t.pos.y)),
        l.ankle.copy(l.plant),
        (l.ankle.y += Sn));
    }
    (this.axis.copy(e), (this._live = !0));
  }
  _gaitParams(t, e, s, n, i) {
    let a = this.g,
      r = G1(sC, jN, t),
      l = G1(sC, $N, t);
    (e > 0.001 && ((r = lerp(r, Math.max(r, 0.54), e)), (l *= 1 + 0.1 * e)),
      (l *= 1 + 0.26 * n + 0.45 * i),
      (a.duty = r),
      (a.f = l),
      (a.Lc = (t * r) / l),
      (a.dsw = (t * (1 - r)) / l),
      (a.rk = smoothstep(0.53, 0.4, r)),
      (a.moveK = smoothstep(0.3, 1.2, t)));
    let c = (1 - 0.45 * e) * (1 - 0.4 * n);
    return (
      (a.xl = a.Lc * (G1(R2, iB, t) + 0.25 * n + 0.12 * i)),
      (a.thHS = G1(R2, nB, t) * a.moveK),
      (a.phO = G1(R2, oB, t) * a.moveK * (1 - 0.25 * e)),
      (a.k1 = lerp(0.2, 0.14, a.rk)),
      (a.k2 = lerp(0.52, 0.34, a.rk)),
      (a.ya = G1(R2, ZN, t) * c + 0.05 * s),
      (a.yb = G1(R2, QN, t) * c + 0.04 * s),
      (a.yc = G1(R2, JN, t) * c),
      (a.re = G1(R2, tB, t) * (1 - 0.6 * n)),
      (a.xa = G1(R2, eB, t)),
      (a.xb = G1(R2, sB, t)),
      a
    );
  }
  _stPitch(t, e) {
    let s = this.g,
      n = e > 0 ? e : 0,
      i = e < 0 ? -e : 0,
      a = s.thHS * n - 0.24 * i * s.moveK;
    return t < s.k1
      ? a * (1 - Ao(t / s.k1))
      : t < s.k2
        ? 0
        : -s.phO * lerp(0.4, 1, n) * Math.pow((t - s.k2) / (1 - s.k2), 1.6);
  }
  _buildSwing(t, e, s) {
    let n = this.g,
      i = 0.02,
      a = (1 - n.duty) / n.duty,
      r = this._stPitch(1, e),
      l = this._stPitch(1 - i, e),
      c = this._stPitch(0, e),
      h = this._stPitch(i, e);
    K5(r, Qr);
    let f = Qr[0],
      u = Qr[1];
    K5(l, Qr);
    let d = Qr[0],
      m = Qr[1];
    K5(c, Qr);
    let p = Qr[0],
      x = Qr[1];
    K5(h, Qr);
    let g = Qr[0],
      b = Qr[1],
      v = n.xl - n.Lc,
      y = v + f * e,
      M = u,
      w = n.xl + p * e,
      T = x;
    ((t.mx0 = Math.max(((y - (v + n.Lc * i + d * e)) / i) * a, -0.9)),
      (t.my0 = ((u - m) / i) * a),
      (t.mx1 = ((n.xl - n.Lc * i + g * e - w) / i) * a * 0.55),
      (t.my1 = ((b - x) / i) * a - 0.25));
    let S = Math.max(e, 0);
    ((t.X[0] = y),
      (t.Y[0] = M),
      (t.X[1] = y + n.xa * lerp(0.4, 1, S) + 0.06 * (1 - S)),
      (t.Y[1] = Math.max(n.ya * lerp(0.55, 1, S), M + 0.025)),
      (t.X[2] = n.xb),
      (t.Y[2] = Math.max(n.yb * lerp(0.6, 1, S), Sn + 0.03)),
      (t.X[3] = w + n.re * lerp(0.3, 1, S)),
      (t.Y[3] = Math.max(n.yc * lerp(0.75, 1, S), T + 0.015)),
      (t.X[4] = w),
      (t.Y[4] = T),
      (t.Pk[0] = r),
      (t.Pk[1] = r - (0.1 + 0.25 * n.rk) * S),
      (t.Pk[2] = lerp(-0.15, -0.6, n.rk) * lerp(0.3, 1, S)),
      (t.Pk[3] = lerp(c + 0.03, -0.1, n.rk * S)),
      (t.Pk[4] = c),
      (t.l0 = f * s),
      (t.l1 = p * s));
  }
  _evalSwing(t, e, s) {
    return (
      (s[0] = s7(t.X, t.mx0, t.mx1, e, 0)),
      (s[1] = s7(t.Y, t.my0, t.my1, e)),
      (s[2] = s7(t.Pk, 0, 0, e)),
      s
    );
  }
  update(t, e) {
    if (!e || e.dead || !e.pos) return;
    ((t = clamp(t, 1e-4, 0.05)), (this.time += t));
    let s = (this.wEngage = damp(
      this.wEngage,
      e.engage === void 0 || e.engage ? 1 : 0,
      6,
      t,
    ));
    (this._pumpT >= 0 &&
      ((this._pumpT += t), this._pumpT > 0.62 && (this._pumpT = -1)),
      this._throwT >= 0 &&
        ((this._throwT += t), this._throwT > 0.85 && (this._throwT = -1)));
    let n = e.pos,
      i = e.yaw || 0,
      a = clamp(e.pitch || 0, -1.45, 1.45),
      r = e.stance || "stand",
      l = Math.sin(i),
      c = Math.cos(i),
      h = At.fwd.set(-l, 0, -c),
      f = At.right.set(c, 0, -l);
    (!this._live || n.distanceToSquared(this._prev) > 2.25) &&
      (this._teleport(e, h, f),
      (this._yo = 0),
      (this._py = n.y),
      (this._pjOk = !1));
    {
      let z0 = n.y - this._py;
      ((this._py = n.y),
        !e.airborne &&
          !this._wasAir &&
          Math.abs(z0) > 0.03 &&
          Math.abs(z0) < 0.6 &&
          (this._yo = clamp(this._yo - z0, -0.45, 0.45)),
        (this._yo = damp(this._yo, 0, this._yo > 0 ? 16 : 10, t)));
    }
    this._ground = n.y;
    let u = this.vel,
      d = (n.x - this._prev.x) / t,
      m = (n.z - this._prev.z) / t,
      p = clamp((n.y - this._prev.y) / t, -14, 14);
    ((this.vy = damp(this.vy, p, 14, t)), this._prev.copy(n));
    let x = u.x,
      g = u.z,
      b = 1 - Math.exp(-22 * t);
    ((u.x += (d - u.x) * b), (u.z += (m - u.z) * b));
    let v = 1 - Math.exp(-7 * t);
    ((this.acc.x += (clamp((u.x - x) / t, -30, 30) - this.acc.x) * v),
      (this.acc.z += (clamp((u.z - g) / t, -30, 30) - this.acc.z) * v));
    let y = Math.hypot(u.x, u.z);
    this._peak = Math.max(y, damp(this._peak, y, 6, t));
    let M = r !== "dive" && r !== "prone" && r !== "slide",
      w = !!e.airborne && M,
      T = (this.wAir = damp(this.wAir, w ? 1 : 0, w ? 14 : 18, t)),
      S = (this.wCrouch = damp(this.wCrouch, r === "crouch" ? 1 : 0, 11, t)),
      E = (this.wSprint = damp(
        this.wSprint,
        e.sprint && r === "stand" && y > 2.5 ? 1 : 0,
        8,
        t,
      ));
    ((this.wSlide = damp(this.wSlide, r === "slide" ? 1 : 0, 13, t)),
      (this.wDive = damp(this.wDive, r === "dive" ? 1 : 0, 13, t)),
      (this.wProne = damp(this.wProne, r === "prone" ? 1 : 0, 10, t)));
    let _ = (this.wReload = damp(this.wReload, e.reloading ? 1 : 0, 9, t));
    (e.reloading ? (this.reloadT += t) : _ < 0.02 && (this.reloadT = 0),
      (this._exert = damp(
        this._exert,
        E > 0.5 ? 1 : 0,
        E > 0.5 ? 0.45 : 0.16,
        t,
      )),
      (this._br += (1.9 + 2.6 * this._exert) * t));
    let R = this.wSlide,
      C = this.wDive,
      L = this.wProne,
      A = R + C + L;
    A > 1 && ((R /= A), (C /= A), (L /= A), (A = 1));
    let O = 1 - A,
      H = u.x * h.x + u.z * h.z,
      F = u.x * f.x + u.z * f.z,
      P = (this.wMove = smoothstep(0.4, 1.4, y)),
      z = smoothstep(2, 4, y),
      k = jk * (1 - E);
    if (y > 0.5) {
      let z0 = Math.atan2(F, H),
        I0 = Math.abs(z0);
      this.back ? I0 < 1.75 && (this.back = !1) : I0 > 2.05 && (this.back = !0);
      let vt = lerp(0.72, 1.35, E),
        wt = this.back
          ? clamp(angleDelta(Math.PI, z0), -0.72, 0.72)
          : clamp(z0, -vt, vt);
      k = lerp(k, wt, P);
    } else this.back = !1;
    this.off = dampAngle(this.off, k, 9, t);
    let I = Math.cos(this.off),
      G = Math.sin(this.off),
      K = At.pf.copy(h).multiplyScalar(I).addScaledVector(f, G),
      $ = At.pr.copy(f).multiplyScalar(I).addScaledVector(h, -G),
      n0 = At.velDir;
    y > 0.05 ? n0.set(u.x / y, 0, u.z / y) : n0.copy(K);
    let e0 = At.lat.set(-n0.z, 0, n0.x),
      p0 = this.back ? P : 0,
      t0 = Math.cos(a),
      M0 = Math.sin(a),
      f0 = At.D.copy(h).multiplyScalar(t0).addScaledVector(On, M0),
      _0 = At.aimUp.crossVectors(f, f0),
      F0 = r === "dive" || r === "prone";
    (e.axis
      ? this.axis.copy(e.axis)
      : F0 && !this._wasDP
        ? this.axis.copy(y > 0.8 ? n0 : h)
        : r === "dive" &&
          y > 1.5 &&
          (At.v0.copy(this.axis).lerp(n0, 1 - Math.exp(-6 * t)),
          At.v0.lengthSq() > 1e-4 && this.axis.copy(At.v0).normalize()),
      (this._wasDP = F0));
    let m0 = P * (1 - Math.abs(K.dot(n0))),
      S0 = this._gaitParams(y, S, E, p0, m0),
      T0 = S0.duty,
      j0 = O > 0.5 && !w,
      Z0 = this.feet;
    if (w && !this._wasAir) {
      for (let z0 = 0; z0 < 2; z0++) {
        let I0 = Z0[z0];
        (I0.rel.subVectors(I0.ankle, n), (I0.mode = 0));
      }
      ((this.gaitOn = !1), (this._airT = 0));
    }
    if ((w && (this._airT += t), !w && this._wasAir)) {
      this._land.v -= clamp(-this.vy, 0, 11) * 0.5 + 0.3;
      for (let z0 = 0; z0 < 2; z0++) {
        let I0 = Z0[z0],
          vt = this._gy(I0.ankle.x, I0.ankle.z, n.y);
        ((I0.mode = 3),
          I0.from.copy(I0.ankle),
          (I0.fromPitch = I0.pitch),
          (I0.t = 0),
          (I0.dur = 0.07),
          (I0.lift = 0),
          I0.bo.set(0, 0, 0),
          I0.to.set(I0.ankle.x, vt + Sn, I0.ankle.z),
          I0.plant.set(I0.ankle.x, vt, I0.ankle.z));
      }
    }
    this._wasAir = w;
    let lt = this.gaitOn,
      H0 = this._pvd.dot(n0) < 0.9;
    if ((this._pvd.copy(n0), j0 && y > (this.gaitOn ? 0.3 : 0.5))) {
      if (!this.gaitOn) {
        H0 = !0;
        let z0 = (Z0[0].ankle.x - n.x) * n0.x + (Z0[0].ankle.z - n.z) * n0.z,
          I0 = (Z0[1].ankle.x - n.x) * n0.x + (Z0[1].ankle.z - n.z) * n0.z,
          vt = 0.25 * T0;
        ((this.phase = z0 < I0 ? (vt + 0.5) % 1 : vt), (this.gaitOn = !0));
      }
      if (((this.phase = (this.phase + S0.f * t) % 1), this._warp >= 0)) {
        let z0 = (this.phase + this._warp * 0.5) % 1;
        z0 < T0 &&
          ((this.phase = (this.phase + T0 - z0 + 0.002) % 1), (H0 = !0));
      }
    } else this.gaitOn = !1;
    (lt &&
      !this.gaitOn &&
      j0 &&
      (this._land.v -= Math.min(0.9, 0.17 * this._peak)),
      (this._warp = -1),
      (this.stepCool -= t));
    let Y0 = lerp(0.14, 0.05, P),
      et = $.dot(e0),
      ct = $.dot(n0),
      D0 = lerp(0.105, 0.072, S0.rk),
      u0 = (et < 0 ? -1 : 1) * Math.max(Math.abs(et), 0.068 / D0),
      w0 = At.home,
      P0 = At.base,
      st = At.dirT;
    for (let z0 = 0; z0 < 2; z0++) {
      let I0 = Z0[z0],
        vt = Z0[1 - z0],
        wt = z0 ? 1 : -1;
      {
        let J = Math.cos(Y0 * wt),
          Q = Math.sin(Y0 * wt);
        st.copy(K).multiplyScalar(J).addScaledVector($, Q);
      }
      (this._homeFoot(z0, n, K, $, S, w0),
        (w0.y = this._gy(w0.x, w0.z, n.y)),
        (I0.stance = !1));
      let _t = I0.ankle.x,
        Pt = I0.ankle.y,
        bt = I0.ankle.z;
      if (!j0) {
        if (w) {
          let J = smoothstep(-2.5, 1.5, this.vy),
            Q = 1 - Ao(this._airT / 0.15),
            i0 = z0 === 0;
          (At.a0
            .copy($)
            .multiplyScalar(wt * 0.11)
            .addScaledVector(K, i0 ? lerp(0.1, 0.2, J) : lerp(-0.04, -0.22, J)),
            (At.a0.y = Sn + (i0 ? lerp(0.07, 0.34, J) : lerp(0.05, 0.3, J))),
            (At.a0.y = lerp(At.a0.y, Sn + 0.03, Q)),
            At.a0.addScaledVector(K, -0.12 * Q * (i0 ? 0.5 : 1)),
            I0.rel.lerp(At.a0, 1 - Math.exp(-(12 + 10 * Q) * t)),
            I0.ankle.copy(n).add(I0.rel),
            (I0.pitch = damp(
              I0.pitch,
              lerp(lerp(-0.1, -0.55, J), -0.95, Q),
              14,
              t,
            )),
            (I0.toe = 0),
            I0.dir.lerp(st, 1 - Math.exp(-10 * t)),
            A2(I0.dir, st));
        } else
          (I0.plant.copy(w0),
            I0.dir.copy(K),
            (I0.mode = 0),
            (I0.pitch = 0),
            (I0.toe = 0),
            (I0.t = 1),
            I0.ankle.copy(w0),
            (I0.ankle.y += Sn));
        I0.prevA.set(_t, Pt, bt);
        continue;
      }
      let Et = (this.phase + z0 * 0.5) % 1,
        zt = I0.mode === 3;
      if (this.gaitOn && !(zt && Et < T0)) {
        let J = st.dot(n0),
          Q = st.dot(e0);
        if (
          (P0.copy(n)
            .addScaledVector(e0, wt * D0 * u0)
            .addScaledVector(n0, wt * Pi * ct),
          Et < T0)
        ) {
          let i0 = Et / T0;
          I0.mode !== 1 &&
            (I0.mode === 2 &&
              (I0.plant.copy(P0).addScaledVector(n0, S0.xl - S0.Lc * i0),
              (I0.plant.y = this._gy(I0.plant.x, I0.plant.z, n.y)),
              I0.dir.copy(st)),
            (I0.mode = 1),
            (I0.k0 = i0),
            (I0.pitch0 = I0.pitch));
          let A0 = this._stPitch(i0, I0.dir.dot(n0));
          (I0.k0 > 0.02 &&
            (A0 = lerp(
              I0.pitch0,
              A0,
              Ao(((i0 - I0.k0) / Math.max(1 - I0.k0, 0.05)) * 3),
            )),
            (I0.pitch = A0),
            (I0.toe = A0 < 0 ? Math.min(-A0, 0.95) : 0),
            (I0.k = i0),
            K5(A0, Qr),
            I0.ankle.copy(I0.plant).addScaledVector(I0.dir, Qr[0]),
            (I0.ankle.y += Qr[1]),
            (I0.stance = !0));
        } else {
          let i0 = (Et - T0) / (1 - T0);
          (this._buildSwing(I0, J, Q), this._evalSwing(I0, i0, $y));
          let A0 = I0.mode !== 2;
          A0 && ((I0.mode = 2), I0.dir0.copy(I0.dir), (I0.gy0 = I0.plant.y));
          let N0 = this._gy(P0.x + n0.x * S0.xl, P0.z + n0.z * S0.xl, n.y),
            mt =
              lerp(I0.gy0, N0, Ao(i0 * 1.3)) +
              0.55 *
                Math.abs(N0 - I0.gy0) *
                Math.sin(Math.PI * Math.min(i0 * 1.15, 1)),
            xt = lerp(I0.l0, I0.l1, Ao(i0));
          (At.v0.copy(P0).addScaledVector(n0, $y[0]).addScaledVector(e0, xt),
            (At.v0.y = mt + $y[1]));
          let yt =
            1 - Ao((i0 - I0.u0) / Math.max(Math.min(0.5, 0.92 - I0.u0), 0.04));
          (At.v1.copy(At.v0).addScaledVector(I0.off, yt),
            (A0 || H0) &&
              (At.v1.copy(I0.ankle).multiplyScalar(2).sub(I0.prevA),
              I0.off.subVectors(At.v1, At.v0),
              (I0.u0 = i0),
              (I0.pitchOff = I0.pitch - $y[2]),
              (yt = 1)),
            I0.ankle.copy(At.v1),
            (I0.pitch = $y[2] + I0.pitchOff * yt),
            (I0.toe = Math.max(0, -I0.pitch) * (1 - Ao(i0 / 0.18)) * 0.9),
            I0.dir
              .copy(I0.dir0)
              .lerp(st, Ao((i0 - I0.u0) / Math.max(0.75 - I0.u0, 0.05))),
            A2(I0.dir, st));
        }
      } else {
        if (I0.mode === 2) {
          ((I0.mode = 3),
            I0.from.copy(I0.ankle),
            (I0.fromPitch = I0.pitch),
            (I0.t = 0));
          let J = Math.hypot(w0.x - I0.ankle.x, w0.z - I0.ankle.z);
          ((I0.dur = clamp(0.1 + J * 0.3, 0.12, 0.3)),
            (I0.lift = 0.02 + 0.06 * Math.min(J, 1)),
            I0.bo
              .copy(this._pvd)
              .multiplyScalar(Math.min(0.26, 0.055 * this._peak)),
            I0.to.copy(w0).add(I0.bo),
            (I0.to.y += Sn),
            I0.dir0.copy(I0.dir));
        } else I0.mode === 1 && (I0.mode = 0);
        if (I0.mode === 3) {
          I0.t = Math.min(1, I0.t + t / I0.dur);
          let J = Ao(I0.t);
          (!this.gaitOn &&
            I0.lift > 0 &&
            (I0.to.copy(w0).add(I0.bo), (I0.to.y += Sn)),
            I0.ankle.lerpVectors(I0.from, I0.to, J),
            (I0.ankle.y += I0.lift * Math.sin(Math.PI * I0.t)),
            (I0.pitch =
              lerp(I0.fromPitch, 0, J) -
              ((0.3 * I0.lift) / 0.08) * Math.sin(Math.PI * I0.t)),
            (I0.toe = 0),
            I0.lift > 0 && (I0.dir.copy(I0.dir0).lerp(st, J), A2(I0.dir, st)),
            I0.t >= 1 &&
              ((I0.mode = 0),
              (I0.pitch = 0),
              I0.plant.copy(I0.to),
              (I0.plant.y -= Sn)));
        } else {
          let J = z0 === 1 ? S * (1 - P) : 0;
          ((I0.pitch = damp(I0.pitch, -0.8 * J, 14, t)),
            (I0.toe = Math.max(0, -I0.pitch)),
            K5(I0.pitch, Qr),
            I0.ankle.copy(I0.plant).addScaledVector(I0.dir, Qr[0]),
            (I0.ankle.y += Qr[1]));
          let Q = I0.plant.x - w0.x,
            i0 = I0.plant.z - w0.z;
          if (
            !this.gaitOn &&
            (Q * Q + i0 * i0 > 0.0225 ||
              Math.abs(I0.plant.y - w0.y) > 0.08 ||
              I0.dir.dot(K) < 0.82) &&
            vt.mode === 0 &&
            this.stepCool <= 0
          ) {
            ((I0.mode = 3),
              I0.from.copy(I0.ankle),
              (I0.fromPitch = I0.pitch),
              (I0.t = 0),
              I0.dir0.copy(I0.dir),
              I0.bo.set(0, 0, 0));
            let A0 = Math.sqrt(Q * Q + i0 * i0);
            ((I0.dur = clamp(0.17 + A0 * 0.3, 0.18, 0.32)),
              (I0.lift = 0.045 + 0.07 * Math.min(A0, 0.6)),
              I0.to.copy(w0),
              (I0.to.y += Sn),
              (this.stepCool = I0.dur + 0.06));
          }
          I0.stance = !0;
        }
      }
      I0.prevA.set(_t, Pt, bt);
    }
    let J0 = bt0,
      q0 =
        lerp(G1(R2, mt0, y), pt0 + 0.045 * P, S) -
        (0.008 * (1 - P) + 0.02 * p0 + 0.06 * m0) * (1 - S) +
        0.006 * E,
      v0 =
        Math.sin(this.time * 0.23 + this._br * 0.05) * (1 - P) * (1 - 0.6 * S),
      x0 = Math.sin(this.time * 0.63) * 0.008 * (1 - P) + 0.017 * v0,
      C0 = 0,
      k0 = 0.03 * v0,
      O0 = 0;
    if (this.gaitOn) {
      let z0 = this.phase,
        I0 = lerp((T0 - 0.5) * 0.5, 0.45 * T0, S0.rk);
      O0 =
        -(
          lerp(0.016, 0.021 + 0.006 * E + 0.003 * z, S0.rk) *
          Math.abs(2 * S0.rk - 1) *
          (1 - 0.4 * S)
        ) *
        Math.cos(2 * TAU * (z0 - I0)) *
        P;
      let wt = Math.cos(TAU * (z0 - T0 * 0.5));
      ((x0 -= lerp(0.022, 0.01, S0.rk) * wt * P),
        (k0 = lerp(0.05, 0.035, S0.rk) * wt * P),
        (C0 =
          lerp(0.08, 0.17 + 0.05 * E, S0.rk) *
          Math.cos(TAU * z0) *
          P *
          (1 - 0.5 * p0) *
          (et < 0 ? -1 : 1)));
    }
    {
      let z0 = 0;
      (this.gaitOn ||
        (Z0[0].mode === 3 ? (z0 = 0.035) : Z0[1].mode === 3 && (z0 = -0.035)),
        (this._shift = damp(this._shift, z0, 12, t)));
    }
    {
      let z0 = this._land,
        I0 = -z0.x * 150 - z0.v * 17;
      ((z0.v += I0 * t), (z0.x = clamp(z0.x + z0.v * t, -0.3, 0.05)));
    }
    ((q0 +=
      O0 +
      Math.sin(this._br) * 0.003 * (1 - P) +
      this._land.x +
      0.03 * (1 - s) * (1 - P) * (1 - S)),
      J0.P.copy(n)
        .addScaledVector($, x0 + this._shift)
        .addScaledVector(h, -0.06 * S),
      (J0.P.y += q0 + this._yo));
    {
      let z0 = Math.cos(C0),
        I0 = Math.sin(C0);
      (J0.hip.copy($).multiplyScalar(z0).addScaledVector(K, -I0),
        (J0.hip.y -= k0),
        J0.hip.normalize());
    }
    {
      let z0 = this._leanX,
        I0 = this._leanZ,
        vt = this._flX,
        wt = this._flZ,
        _t = this._flT,
        Pt = clamp(this.acc.x, -14, 14) * 0.0095,
        bt = clamp(this.acc.z, -14, 14) * 0.0095,
        Et = (Pt - z0.x) * 170 - z0.v * 13;
      ((z0.v += Et * t),
        (z0.x += z0.v * t),
        (Et = (bt - I0.x) * 170 - I0.v * 13),
        (I0.v += Et * t),
        (I0.x += I0.v * t),
        (Et = -vt.x * 260 - vt.v * 17),
        (vt.v += Et * t),
        (vt.x = clamp(vt.x + vt.v * t, -0.3, 0.3)),
        (Et = -wt.x * 260 - wt.v * 17),
        (wt.v += Et * t),
        (wt.x = clamp(wt.x + wt.v * t, -0.3, 0.3)),
        (Et = -_t.x * 240 - _t.v * 16),
        (_t.v += Et * t),
        (_t.x = clamp(_t.x + _t.v * t, -0.35, 0.35)));
    }
    let B0 = At.lean
      .copy(h)
      .multiplyScalar(0.14 + 0.32 * S + 0.06 * E - 0.26 * a * (1 - 0.5 * S));
    (B0.addScaledVector(
      n0,
      Math.min(y, 7) * (0.02 + 0.034 * E) * (this.back ? 0.25 : 1) * P,
    ),
      (B0.x += this._leanX.x + this._flX.x),
      (B0.z += this._leanZ.x + this._flZ.x));
    let ot = At.spine.copy(On).add(B0).normalize();
    (J0.P.addScaledVector(B0, -0.1), J0.C.copy(J0.P).addScaledVector(ot, h2));
    let Q0 = Math.sin(this._br) * (1 + 1.9 * this._exert),
      nt = this._throwT,
      L0 = nt < 0 ? 0 : Ao(nt / 0.12) * (1 - Ao((nt - 0.6) / 0.24)),
      ht = nt < 0 ? 0 : Ao(nt / 0.24) * (1 - Ao((nt - 0.26) / 0.1)),
      pt = nt < 0 ? 0 : Ao((nt - 0.26) / 0.1) * (1 - Ao((nt - 0.5) / 0.25)),
      V0 = Math.max((1 - s) * (1 - E), L0 * 0.85) * (1 - _),
      c0 = At.nd
        .copy(ot)
        .addScaledVector(On, 0.35)
        .addScaledVector(h, -0.12 * a)
        .normalize();
    J0.N.copy(J0.C).addScaledVector(c0, f2);
    let Z =
      lerp(this._pistol ? 0.1 : Yk, this.off * 0.75, E) -
      C0 * lerp(0.5, 1.5, E) +
      this._flT.x -
      0.6 * ht +
      0.5 * pt;
    (J0.sh.copy(f).multiplyScalar(Math.cos(Z)).addScaledVector(h, -Math.sin(Z)),
      (J0.sh.y += k0 * 0.6),
      J0.sh.normalize());
    let r0 = At.hd
      .copy(On)
      .addScaledVector(h, 0.3 - 0.4 * a)
      .addScaledVector(f, 0.2 * (1 - E))
      .normalize();
    J0.H.copy(J0.N).addScaledVector(r0, u5);
    for (let z0 = 0; z0 < 2; z0++) (z0 ? J0.AR : J0.AL).copy(Z0[z0].ankle);
    {
      let z0 = 0;
      for (let I0 = 0; I0 < 2; I0++) {
        let vt = I0 ? 1 : -1,
          wt = I0 ? J0.AR : J0.AL,
          _t = J0.P.x + J0.hip.x * vt * Pi - ot.x * lf,
          Pt = J0.P.z + J0.hip.z * vt * Pi - ot.z * lf,
          bt = J0.P.y + J0.hip.y * vt * Pi - ot.y * lf,
          Et = wt.x - _t,
          zt = wt.z - Pt,
          J = hp * ($k - 0.006),
          Q = wt.y + Math.sqrt(Math.max(J * J - Et * Et - zt * zt, 0.02));
        (bt - Q > z0 && (z0 = bt - Q),
          bt - Q > 0.05 &&
            Z0[I0].mode === 1 &&
            Z0[I0].k > 0.3 &&
            (this._warp = I0));
      }
      ((z0 = Math.min(z0, 0.38) * (1 - T)),
        (this.drop =
          z0 > this.drop
            ? Math.min(
                z0,
                this.drop + Math.max(2.4 * t, (z0 - this.drop) * 0.45),
              )
            : damp(this.drop, z0, 9, t)),
        (J0.P.y -= this.drop),
        (J0.C.y -= this.drop),
        (J0.N.y -= this.drop),
        (J0.H.y -= this.drop));
    }
    let b0 = 0.2 + 0.5 * S;
    (J0.KL.copy(K)
      .addScaledVector(Z0[0].dir, 0.6)
      .addScaledVector($, -b0)
      .addScaledVector(On, 0.12),
      J0.KR.copy(K)
        .addScaledVector(Z0[1].dir, 0.6)
        .addScaledVector($, b0)
        .addScaledVector(On, 0.12));
    let d0 = wt0;
    for (let z0 = 0; z0 < Wp.length; z0++) {
      let I0 = Wp[z0];
      d0[I0].copy(J0[I0]).multiplyScalar(O);
    }
    if (R > 0.001) {
      let z0 = yt0,
        I0 = At.m.copy(y > 0.5 ? n0 : K),
        vt = At.mr.set(-I0.z, 0, I0.x);
      (z0.P.copy(n).addScaledVector(I0, -0.06),
        (z0.P.y += 0.3),
        At.spine
          .copy(On)
          .multiplyScalar(0.8)
          .addScaledVector(I0, -0.6)
          .addScaledVector(h, 0.12)
          .normalize(),
        z0.C.copy(z0.P).addScaledVector(At.spine, h2),
        At.nd
          .copy(At.spine)
          .addScaledVector(On, 0.6)
          .addScaledVector(h, 0.25)
          .normalize(),
        z0.N.copy(z0.C).addScaledVector(At.nd, f2),
        At.hd
          .copy(On)
          .addScaledVector(h, 0.3 - 0.5 * a)
          .addScaledVector(f, 0.25)
          .normalize(),
        z0.H.copy(z0.N).addScaledVector(At.hd, u5),
        z0.sh
          .copy(f)
          .multiplyScalar(Math.cos(Yk))
          .addScaledVector(h, -Math.sin(Yk)),
        z0.hip.copy(vt),
        z0.AL.copy(n).addScaledVector(I0, 0.72).addScaledVector(vt, -0.07),
        (z0.AL.y += 0.12),
        z0.AR.copy(n).addScaledVector(I0, 0.26).addScaledVector(vt, 0.15),
        (z0.AR.y += 0.1),
        z0.KL.copy(On)
          .multiplyScalar(0.5)
          .addScaledVector(I0, 0.4)
          .addScaledVector(vt, -0.3),
        z0.KR.copy(On).addScaledVector(I0, 0.3).addScaledVector(vt, 0.35));
      for (let wt = 0; wt < Wp.length; wt++) {
        let _t = Wp[wt];
        d0[_t].addScaledVector(z0[_t], R);
      }
    }
    if (C + L > 0.001) {
      let z0 = this.axis,
        I0 = h.dot(z0),
        vt = At.F.copy(h)
          .addScaledVector(z0, -I0)
          .addScaledVector(On, -I0)
          .normalize(),
        wt = At.Rv.crossVectors(vt, z0).normalize();
      if (C > 0.001) {
        let _t = vt0,
          Pt = clamp(this.vy / Math.max(y, 3), -0.6, 0.6),
          bt = At.a0.copy(z0).addScaledVector(On, Pt).normalize();
        (_t.P.copy(n).addScaledVector(z0, -0.12),
          (_t.P.y += 0.32),
          At.spine.copy(bt).addScaledVector(On, 0.08).normalize(),
          _t.C.copy(_t.P).addScaledVector(At.spine, h2),
          At.nd.copy(bt).addScaledVector(On, 0.2).normalize(),
          _t.N.copy(_t.C).addScaledVector(At.nd, f2),
          At.hd
            .copy(bt)
            .multiplyScalar(0.75)
            .addScaledVector(On, 0.45)
            .addScaledVector(h, 0.3)
            .normalize(),
          _t.H.copy(_t.N).addScaledVector(At.hd, u5),
          _t.sh.copy(wt),
          _t.hip.copy(wt),
          _t.AL.copy(_t.P)
            .addScaledVector(bt, -0.8)
            .addScaledVector(wt, -0.12)
            .addScaledVector(vt, -0.02),
          _t.AR.copy(_t.P)
            .addScaledVector(bt, -0.76)
            .addScaledVector(wt, 0.13)
            .addScaledVector(vt, -0.11),
          _t.KL.copy(vt).addScaledVector(z0, 0.3),
          _t.KR.copy(vt).addScaledVector(z0, 0.3));
        for (let Et = 0; Et < Wp.length; Et++) {
          let zt = Wp[Et];
          d0[zt].addScaledVector(_t[zt], C);
        }
      }
      if (L > 0.001) {
        let _t = Mt0,
          Pt = Math.max(0, vt.y),
          bt = 1 - Math.abs(vt.y);
        (_t.P.copy(n).addScaledVector(z0, -0.12),
          (_t.P.y += 0.13 + 0.04 * bt),
          At.spine
            .copy(z0)
            .addScaledVector(On, 0.2 + 0.25 * Pt)
            .normalize(),
          _t.C.copy(_t.P).addScaledVector(At.spine, h2),
          At.nd
            .copy(z0)
            .multiplyScalar(1 - 0.4 * Pt)
            .addScaledVector(On, 0.4 + 0.4 * Pt)
            .normalize(),
          _t.N.copy(_t.C).addScaledVector(At.nd, f2),
          At.hd
            .copy(z0)
            .multiplyScalar(0.7 - Pt)
            .addScaledVector(On, 0.6 + 0.3 * Pt)
            .addScaledVector(h, 0.2)
            .normalize(),
          _t.H.copy(_t.N).addScaledVector(At.hd, u5),
          _t.sh.copy(wt),
          _t.hip.copy(wt));
        let Et = lerp(0.76, 0.6, Pt),
          zt = 0.14 + 0.05 * Pt,
          J = n.y + lerp(0.07, 0.09, Pt) + 0.04 * bt;
        (_t.AL.copy(_t.P).addScaledVector(z0, -Et).addScaledVector(wt, -zt),
          (_t.AL.y = J),
          _t.AR.copy(_t.P)
            .addScaledVector(z0, -Et * 0.92)
            .addScaledVector(wt, zt),
          (_t.AR.y = J),
          _t.KL.copy(vt)
            .multiplyScalar(0.3 + Pt)
            .addScaledVector(wt, -(1 - Pt) * 0.8),
          _t.KR.copy(vt)
            .multiplyScalar(0.3 + Pt)
            .addScaledVector(wt, (1 - Pt) * 0.8));
        for (let Q = 0; Q < Wp.length; Q++) {
          let i0 = Wp[Q];
          d0[i0].addScaledVector(_t[i0], L);
        }
      }
    }
    let V = this.joints,
      B = n.y + 0.04,
      j = this._hint,
      s0 = A2(At.cdir.subVectors(d0.C, d0.P), On);
    d0.C.copy(d0.P).addScaledVector(s0, h2);
    let l0 = A2(At.ndir.subVectors(d0.N, d0.C), s0);
    d0.N.copy(d0.C).addScaledVector(l0, f2);
    let E0 = nC(At.sh.copy(d0.sh), l0, f),
      U = nC(At.hip.copy(d0.hip), s0, $),
      X = At.mid.copy(d0.C).addScaledVector(l0, AE),
      N = this._kick;
    {
      let z0 = -N.x * 300 - N.v * 34;
      ((N.v += z0 * t), (N.x = clamp(N.x + N.v * t, -0.3, 1.6)));
    }
    let q = N.x,
      o0 = e7[this.weaponId] || e7.ar,
      h0 = this._pumpT,
      y0 = h0 < 0 ? 0 : Ao((h0 - 0.1) / 0.15) * (1 - Ao((h0 - 0.3) / 0.2)),
      D = At.SL.copy(X).addScaledVector(E0, -Yc),
      W = At.SR.copy(X).addScaledVector(E0, Yc);
    (W.addScaledVector(f0, -o0.sh * q * (1 - E)),
      D.addScaledVector(l0, 0.004 * Q0),
      W.addScaledVector(l0, 0.004 * Q0),
      At.v0.copy(d0.P).addScaledVector(s0, -lf));
    let Y = At.HL.copy(At.v0).addScaledVector(U, -Pi),
      R0 = At.HR.copy(At.v0).addScaledVector(U, Pi);
    (Zy(Y, d0.AL, qr, rf, d0.KL, At.kL, At.fL, $k, qN),
      Zy(R0, d0.AR, qr, rf, d0.KR, At.kR, At.fR, $k, qN));
    let U0 = e.reloadDur || (this.weaponId === "shotgun" ? 2.6 : 2.2),
      $0 = this.weaponId === "shotgun",
      g0 = clamp(this.reloadT / (U0 - 0.12), 0, 1),
      G0 = _,
      K0 = G0 * (1 - smoothstep(0.86, 1, g0)),
      it = At.Ga;
    if (this._pistol)
      it.addVectors(D, W)
        .multiplyScalar(0.5)
        .addScaledVector(f0, 0.43 - 0.03 * q - 0.14 * K0)
        .addScaledVector(_0, 0.165 - this._sight.y + 0.003 * Q0 - 0.06 * K0);
    else {
      let z0 = At.pocket
        .copy(W)
        .addScaledVector(E0, -0.105)
        .addScaledVector(f0, 0.012);
      it.copy(z0)
        .addScaledVector(f0, this._stock - 0.014 - o0.back * q - 0.04 * K0)
        .addScaledVector(_0, 0.15 - this._sight.y + 0.003 * Q0 - 0.05 * K0)
        .addScaledVector(f, -0.02 * K0);
    }
    if (
      ((it.y += this._land.x * 0.35),
      At.gz.copy(f0).multiplyScalar(-1),
      q5(Yu, f, _0, At.gz),
      K4.setFromAxisAngle(
        At.v1.set(1, 0, 0),
        o0.rise * q +
          0.3 * K0 +
          0.05 *
            Math.sin(g0 * 40) *
            G0 *
            smoothstep(0.7, 0.74, g0) *
            smoothstep(0.8, 0.76, g0),
      ),
      Yu.multiply(K4),
      K4.setFromAxisAngle(At.v1.set(0, 0, 1), -0.05 + 0.55 * K0 + 0.12 * y0),
      Yu.multiply(K4),
      E > 0.001)
    ) {
      let z0 = At.cu.copy(l0),
        I0 = At.cfw.crossVectors(z0, E0),
        vt = this.gaitOn ? Math.sin(2 * TAU * this.phase) : 0,
        wt = this.gaitOn ? Math.sin(TAU * this.phase) : 0;
      (At.Gs.copy(d0.C)
        .addScaledVector(E0, 0.1 + 0.03 * wt)
        .addScaledVector(z0, -0.05 + 0.02 * vt)
        .addScaledVector(I0, 0.21),
        At.gz
          .copy(I0)
          .multiplyScalar(-0.5)
          .addScaledVector(E0, 0.62)
          .addScaledVector(z0, -0.6 - 0.07 * wt)
          .normalize(),
        At.gy
          .copy(z0)
          .multiplyScalar(0.45)
          .addScaledVector(E0, 0.55)
          .addScaledVector(I0, -0.25),
        At.gx.crossVectors(At.gy, At.gz).normalize(),
        At.gy.crossVectors(At.gz, At.gx),
        q5(Gp, At.gx, At.gy, At.gz),
        this.gunPos.lerpVectors(it, At.Gs, E),
        this.gunQuat.copy(Yu).slerp(Gp, E));
    } else (this.gunPos.copy(it), this.gunQuat.copy(Yu));
    V0 > 0.001 &&
      (At.gz
        .copy(h)
        .multiplyScalar(-0.75)
        .addScaledVector(On, 0.66)
        .addScaledVector(f, 0.26)
        .normalize(),
      At.gx.crossVectors(On, At.gz).normalize(),
      At.gy.crossVectors(At.gz, At.gx),
      q5(Gp, At.gx, At.gy, At.gz),
      At.Gs.copy(W)
        .addScaledVector(E0, this._pistol ? -0.19 : -0.11)
        .addScaledVector(On, this._pistol ? -0.24 : -0.07)
        .addScaledVector(At.gz, -(this._pistol ? 0.3 : this._stock - 0.03)),
      this.gunPos.lerp(At.Gs, V0),
      this.gunQuat.slerp(Gp, V0));
    {
      let z0 = this._pistol ? 0 : (1 - E) * (1 - 0.6 * K0) * O * (1 - V0),
        I0 = At.eye
          .copy(this._sight)
          .applyQuaternion(this.gunQuat)
          .add(this.gunPos)
          .addScaledVector(f0, -0.085);
      I0.addScaledVector(f, -0.031)
        .addScaledVector(_0, -0.014)
        .addScaledVector(f0, -0.086);
      let vt = A2(At.v0.subVectors(I0, d0.N), l0),
        wt = At.hdir.subVectors(d0.H, d0.N);
      (A2(wt, l0), wt.lerp(vt, 0.85 * z0), A2(wt, l0));
      for (let bt = 0; bt < 2; bt++) {
        let Et = wt.dot(l0);
        Et < 0.8 && (wt.addScaledVector(l0, (0.8 - Et) * 1.6), wt.normalize());
      }
      d0.H.copy(d0.N).addScaledVector(wt, u5);
      let _t = 0,
        Pt = 0;
      (e.aimYaw !== void 0 && (_t = clamp(angleDelta(i, e.aimYaw), -0.6, 0.6)),
        e.look
          ? (_t = clamp(
              angleDelta(i, Math.atan2(-(e.look.x - n.x), -(e.look.z - n.z))),
              -1.1,
              1.1,
            ))
          : s < 0.6 &&
            ((_t +=
              (1 - s) *
              (0.5 * Math.sin(this.time * 0.47 + this._br * 0.11) +
                0.18 * Math.sin(this.time * 1.31))),
            (Pt = (1 - s) * 0.09 * Math.sin(this.time * 0.33))),
        (this._hy = damp(this._hy, _t, 7, t)),
        (this._hp = damp(this._hp, Pt, 5, t)));
      {
        let bt = Math.cos(this._hy),
          Et = Math.sin(this._hy),
          zt = a * lerp(0.4, 1, s) + this._hp,
          J = Math.cos(zt);
        j.headFwd
          .copy(h)
          .multiplyScalar(bt * J)
          .addScaledVector(f, -Et * J)
          .addScaledVector(On, Math.sin(zt) + 0.02 * q - 0.25 * K0);
      }
      (E > 0.01 &&
        j.headFwd.lerp(At.v1.copy(n0).addScaledVector(On, -0.08), 0.5 * E),
        A2(j.headFwd, h),
        j.headUp
          .copy(On)
          .addScaledVector(wt, 0.9)
          .addScaledVector(f, 0.1 * z0),
        Math.abs(j.headUp.dot(j.headFwd)) > 0.98 && j.headUp.copy(wt));
    }
    let ft = this.gunQuat;
    (j.handQ[1].copy(ft).multiply(this._gripRq),
      j.handQ[0].copy(ft).multiply(this._gripLq));
    let gt = At.palmR.copy(this._gripR).applyQuaternion(ft).add(this.gunPos),
      rt = At.palmL.copy(this._gripL).applyQuaternion(ft).add(this.gunPos),
      dt = 0;
    if (((j.magM = null), G0 > 0.001)) {
      (this._pistol
        ? At.mag.set(0, this._gripR.y - 0.085, this._gripR.z + 0.012)
        : At.mag.set(0, this._gripR.y - 0.105, this._gripR.z - 0.11),
        At.mag.applyQuaternion(ft).add(this.gunPos),
        At.pouch
          .copy(d0.P)
          .addScaledVector(K, 0.1)
          .addScaledVector($, -0.19)
          .addScaledVector(s0, 0.02),
        At.v2
          .copy(d0.C)
          .addScaledVector(E0, -0.06)
          .addScaledVector(At.cfw.crossVectors(l0, E0), 0.2)
          .addScaledVector(s0, -0.1),
        At.a1.set(-0.03, 0.02, -0.06).applyQuaternion(ft).add(this.gunPos));
      let z0 = At.v0;
      if ($0) {
        At.mag
          .set(0, this._gripR.y - 0.035, this._gripR.z - 0.13)
          .applyQuaternion(ft)
          .add(this.gunPos);
        let I0 = clamp(g0 / 0.86, 0, 0.9999) * 4,
          vt = I0 - Math.floor(I0);
        g0 >= 0.86
          ? z0.lerpVectors(At.mag, rt, Ao((g0 - 0.86) / 0.14))
          : vt < 0.42
            ? z0.lerpVectors(I0 < 1 ? rt : At.mag, At.pouch, Ao(vt / 0.42))
            : vt < 0.86
              ? z0.lerpVectors(At.pouch, At.mag, Ao((vt - 0.42) / 0.44))
              : z0
                  .copy(At.mag)
                  .addScaledVector(
                    At.v1.set(0, 0, -1).applyQuaternion(ft),
                    0.03 * Ao((vt - 0.86) / 0.14),
                  );
      } else
        g0 < 0.12
          ? z0.lerpVectors(rt, At.mag, Ao(g0 / 0.12))
          : g0 < 0.18
            ? z0.copy(At.mag)
            : g0 < 0.36
              ? z0.lerpVectors(At.mag, At.pouch, Ao((g0 - 0.18) / 0.18))
              : g0 < 0.5
                ? z0.lerpVectors(At.pouch, At.v2, Ao((g0 - 0.36) / 0.14))
                : g0 < 0.56
                  ? z0.copy(At.v2)
                  : g0 < 0.72
                    ? z0.lerpVectors(At.v2, At.mag, Ao((g0 - 0.56) / 0.16))
                    : g0 < 0.78
                      ? z0.copy(At.mag)
                      : g0 < 0.86
                        ? z0.lerpVectors(At.mag, At.a1, Ao((g0 - 0.78) / 0.08))
                        : z0.lerpVectors(At.a1, rt, Ao((g0 - 0.86) / 0.14));
      ((dt = G0 * smoothstep(0.02, 0.1, g0) * (1 - smoothstep(0.9, 1, g0))),
        rt.lerp(z0, G0),
        !$0 &&
          g0 > 0.5 &&
          g0 < 0.745 &&
          G0 > 0.5 &&
          (Gp.copy(ft),
          g0 < 0.6 &&
            Gp.slerp(
              K4.setFromUnitVectors(At.v1.set(0, 1, 0), s0),
              1 - (g0 - 0.5) / 0.1,
            ),
          this._magM.compose(At.v1.copy(rt).addScaledVector(On, 0.03), Gp, Jk),
          (j.magM = this._magM)));
    }
    if (
      (y0 > 0 &&
        rt.addScaledVector(At.v1.set(0, 0, 1).applyQuaternion(ft), 0.085 * y0),
      L0 > 0.001)
    ) {
      (At.v0
        .copy(D)
        .addScaledVector(h, -0.2)
        .addScaledVector(On, 0.2)
        .addScaledVector(E0, -0.1),
        At.v2
          .copy(D)
          .addScaledVector(h, 0.5)
          .addScaledVector(On, 0.22)
          .addScaledVector(E0, 0.05),
        At.v1
          .copy(D)
          .addScaledVector(h, 0.34)
          .addScaledVector(On, -0.25)
          .addScaledVector(E0, 0.12));
      let z0 = At.a1;
      (nt < 0.26
        ? z0.lerpVectors(rt, At.v0, Ao(nt / 0.24))
        : nt < 0.36
          ? z0.lerpVectors(At.v0, At.v2, (nt - 0.26) / 0.1)
          : nt < 0.52
            ? z0.lerpVectors(At.v2, At.v1, Ao((nt - 0.36) / 0.16))
            : z0.lerpVectors(At.v1, rt, Ao((nt - 0.52) / 0.3)),
        rt.copy(z0),
        (dt = Math.max(dt, L0)));
    }
    if (dt < 0.999 && !this._pistol) {
      let z0 = (Ca + ey) * 0.9;
      At.v1.set(0, 0, 1).applyQuaternion(ft);
      for (let I0 = 0; I0 < 3; I0++) {
        At.v2.set(0, -t7, 0).applyQuaternion(j.handQ[0]).add(rt).sub(D);
        let vt = At.v2.length();
        if (vt <= z0) break;
        let wt = At.v2.dot(At.v1) / vt;
        rt.addScaledVector(
          At.v1,
          Math.min((vt - z0) / Math.max(-wt, 0.35), 0.12) * (1 - dt),
        );
      }
    }
    ((j.handW[1] = O > 0.5 ? 1 : O * 2),
      (j.handW[0] = j.handW[1] * (1 - dt)),
      j.handP[1].copy(gt),
      j.handP[0].copy(rt));
    let tt = At.wR.set(0, -t7, 0).applyQuaternion(j.handQ[1]).add(gt),
      X0 = At.wL.set(0, -t7, 0).applyQuaternion(j.handQ[0]).add(rt);
    dt > 0.001 &&
      X0.lerp(
        At.v1
          .copy(rt)
          .addScaledVector(At.v2.subVectors(rt, D).normalize(), -t7),
        dt,
      );
    let ut = C + L;
    (At.pole
      .copy(On)
      .multiplyScalar(-1)
      .addScaledVector(E0, 0.62)
      .addScaledVector(f0, -0.25),
      ut > 0.001 &&
        At.pole.lerp(
          At.v1
            .copy(l0)
            .multiplyScalar(-1)
            .addScaledVector(On, -0.3)
            .addScaledVector(E0, 0.2),
          ut,
        ),
      Zy(W, tt, Ca, ey, At.pole, At.eR, At.v0, 0.985),
      At.v1.subVectors(At.v0, At.eR).normalize(),
      At.a0.copy(At.eR).addScaledVector(At.v1, mh),
      At.pole
        .copy(On)
        .multiplyScalar(-1)
        .addScaledVector(E0, -0.38)
        .addScaledVector(f0, 0.05),
      ut > 0.001 &&
        At.pole.lerp(
          At.v1
            .copy(l0)
            .multiplyScalar(-1)
            .addScaledVector(On, -0.3)
            .addScaledVector(E0, -0.2),
          ut,
        ),
      Zy(D, X0, Ca, ey, At.pole, At.eL, At.v0, 0.985),
      At.v1.subVectors(At.v0, At.eL).normalize(),
      At.a1.copy(At.eL).addScaledVector(At.v1, mh),
      At.eL.y < B && (At.eL.y = B),
      At.eR.y < B && (At.eR.y = B),
      At.kL.y < B && (At.kL.y = B),
      At.kR.y < B && (At.kR.y = B),
      $l(V, ba.head, d0.H),
      $l(V, ba.neck, d0.N),
      $l(V, ba.chest, d0.C),
      $l(V, ba.pelvis, d0.P),
      $l(V, ba.lShoulder, D),
      $l(V, ba.lElbow, At.eL),
      $l(V, ba.lHand, At.a1),
      $l(V, ba.rShoulder, W),
      $l(V, ba.rElbow, At.eR),
      $l(V, ba.rHand, At.a0),
      $l(V, ba.lHip, Y),
      $l(V, ba.lKnee, At.kL),
      $l(V, ba.lFoot, At.fL),
      $l(V, ba.rHip, R0),
      $l(V, ba.rKnee, At.kR),
      $l(V, ba.rFoot, At.fR),
      (j.footW = O));
    for (let z0 = 0; z0 < 2; z0++) {
      let I0 = Z0[z0],
        vt = Math.cos(I0.pitch),
        wt = Math.sin(I0.pitch);
      (j.footU[z0].copy(On).multiplyScalar(vt).addScaledVector(I0.dir, -wt),
        j.footF[z0].copy(I0.dir).multiplyScalar(vt).addScaledVector(On, wt),
        (j.toeBend[z0] = I0.toe));
      let _t = z0 ? R0 : Y,
        Pt = z0 ? At.fR : At.fL,
        bt = z0 ? At.kR : At.kL;
      ((I0.ext = _t.distanceTo(Pt) / hp),
        At.v0.subVectors(_t, bt),
        At.v1.subVectors(Pt, bt),
        (I0.knee = Math.acos(clamp(At.v0.dot(At.v1) / (qr * rf), -1, 1))));
    }
    {
      let z0 = this.jointVel,
        I0 = this._pj,
        vt = this._pjOk ? 1 / t : 0;
      for (let wt = 0; wt < 48; wt += 3) {
        let _t = (V[wt] - I0[wt]) * vt - u.x * (vt ? 1 : 0),
          Pt = (V[wt + 1] - I0[wt + 1]) * vt,
          bt = (V[wt + 2] - I0[wt + 2]) * vt - u.z * (vt ? 1 : 0),
          Et = Math.hypot(_t, Pt, bt),
          zt = (Et > 4 ? 4 / Et : 1) * 0.7;
        ((z0[wt] = u.x + _t * zt),
          (z0[wt + 1] = Pt * zt),
          (z0[wt + 2] = u.z + bt * zt),
          (I0[wt] = V[wt]),
          (I0[wt + 1] = V[wt + 1]),
          (I0[wt + 2] = V[wt + 2]));
      }
      this._pjOk = !0;
    }
    ((this._aimX = h.x),
      (this._aimZ = h.z),
      (this._hinted = !0),
      this.renderFromJoints(),
      (this._hinted = !1));
  }
  get hints() {
    return this._hint;
  }
  renderHinted() {
    ((this._hinted = !0), this.renderFromJoints(), (this._hinted = !1));
  }
  renderFromJoints() {
    let t = this.joints,
      e = this._hinted,
      s = this._mats,
      n = this._bones;
    if (e) (CE(t, this._hint, s), (this._resOn = 1));
    else {
      let c = this._res;
      if (this._resOn === 1)
        for (let h = 0; h < 7; h++) c.last[h].copy(s[tC[h]]);
      if ((CE(t, null, s), this._resOn === 1)) {
        for (let h = 0; h < 7; h++)
          (X5.copy(s[tC[h]]).invert().multiply(c.last[h]),
            X5.decompose(c.p[h], c.q[h], At.v0));
        ((this._resOn = 2), (c.t0 = XN()));
      }
      if (this._resOn === 2) {
        let h = 1 - Ao((XN() - c.t0) / 340);
        if (h <= 0) this._resOn = 0;
        else
          for (let f = 0; f < 7; f++)
            (Yu.identity().slerp(c.q[f], h),
              At.v0.copy(c.p[f]).multiplyScalar(h),
              X5.compose(At.v0, Yu, Jk),
              s[tC[f]].multiply(X5));
      }
    }
    for (let c = 0; c < kE; c++) {
      let h = n[c];
      (h.matrix.copy(s[c]), (h.matrixWorldNeedsUpdate = !0));
    }
    (this.gun &&
      !e &&
      (Yu.setFromRotationMatrix(s[Ve.hand + 7]),
      this.gunQuat.copy(Yu).multiply(Gp.copy(this._gripRq).invert()),
      this.gunPos
        .setFromMatrixPosition(s[Ve.hand + 7])
        .sub(At.v0.copy(this._gripR).applyQuaternion(this.gunQuat))),
      this._placeGun());
    let i = this.hit,
      a = Wr(t, ba.pelvis, At.a0),
      r = Wr(t, ba.neck, At.a1),
      l = Wr(t, ba.head, At.v0);
    (At.v1.subVectors(l, r),
      A2(At.v1, On),
      i[0].a.copy(r).addScaledVector(At.v1, 0.07),
      i[0].b.copy(l).addScaledVector(At.v1, 0.03),
      i[1].a.copy(a),
      i[1].b.copy(r),
      Wr(t, ba.lFoot, At.v1),
      Wr(t, ba.rFoot, At.v2),
      i[2].a.addVectors(At.v1, At.v2).multiplyScalar(0.5),
      i[2].b.copy(a));
  }
};
function createOperatorRig(o) {
  return new OperatorRig(o);
}
function rB(o) {
  return GN(o ? 1 : 0, t4[o ? 1 : 0]);
}
var is = {
  ik2: Zy,
  rock: K5,
  herm5: s7,
  tab: G1,
  safeNorm: A2,
  ortho: nC,
  quatFromBasis: q5,
  G_V: sC,
  G_DUTY: jN,
  G_FREQ: $N,
  S_V: R2,
  S_YA: ZN,
  S_YB: QN,
  S_YC: JN,
  S_RE: tB,
  S_XA: eB,
  S_XB: sB,
  S_TH: nB,
  S_PH: oB,
  S_KL: iB,
};
var eC = [null, null];
function lB(o) {
  if (((o = o ? 1 : 0), eC[o])) return eC[o];
  let t = aB(o),
    e = t.index.array,
    s = t.attributes.skinIndex.array,
    n = t.attributes.skinWeight.array,
    i = t.userData.fp,
    a = (d) => {
      let m = i[d] === 1 ? 1 : 0;
      for (let p = 0; p < 2; p++) {
        let x = s[d * 4 + p];
        (x === Ve.head || x === Ve.mag || (x >= Ve.shH && x < Ve.hipH)) &&
          (m += n[d * 4 + p]);
      }
      return m;
    },
    r = [],
    l = [],
    c = [];
  for (let d = 0; d < e.length; d += 3)
    (a(e[d]) + a(e[d + 1]) + a(e[d + 2]) > 1.2
      ? l
      : i[e[d]] === 2
        ? c
        : r
    ).push(e[d], e[d + 1], e[d + 2]);
  let h = r.length;
  for (let d of c) r.push(d);
  let f = (d) => {
      let m = new BufferGeometry();
      for (let p in t.attributes) m.setAttribute(p, t.attributes[p]);
      return (
        m.setIndex(
          t.index.array instanceof Uint32Array
            ? new Uint32BufferAttribute(d, 1)
            : new Uint16BufferAttribute(d, 1),
        ),
        (m.boundingSphere = t.boundingSphere),
        (m.boundingBox = t.boundingBox),
        (m.userData.triangles = d.length / 3),
        m
      );
    },
    u = {
      view: f(r),
      rest: f(l),
    };
  return ((u.view.userData.core = h), (eC[o] = u));
}

export { Kk, Up, createOperatorRig, is, lB, qk, rB };

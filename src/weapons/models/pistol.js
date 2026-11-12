// weapons/models/pistol.js: recovered from the verified GOLDEN HOUR release.
import {
  Bt,
  Du,
  Gt,
  Iu,
  Kr,
  Qe,
  Sc,
  Wn,
  Ze,
  Zn,
  Zs,
  ao,
  b2,
  ds,
  eT,
  fa,
  g4,
  jc,
  ni,
  se,
  si,
  us,
  x4,
} from "./geometry.js";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CylinderGeometry,
  Euler,
  Float32BufferAttribute,
  Group,
  Matrix4,
  Mesh,
  Object3D,
  Path,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  Shape,
  ShapeGeometry,
  SkinnedMesh,
  Vector3,
} from "../../vendor/three-r180.js";
import {
  E5,
  Mn,
  Qa,
  Tc,
  Ui,
  Yo,
  gs,
  hf,
  pn,
  qH,
  u4,
  w5,
  xp,
  yi,
  yo,
  zi,
} from "../../player/rig.js";
import { Mp, Ou, Rc, gf, wp } from "./shared.js";
import { xl } from "./camos.js";
import { Vn } from "../../vendor/geometry-utils.js";
import { buildGrenade } from "./legacy.js";
import { JO } from "./smg.js";
import { Do, Gs, Mf, Xs, be, jt, vi, ye } from "./carbine.js";

var No = 0.0235;
var or = 0.0085;
var Jn = 0.035;
var N1 = 0.0129;
var kh = -0.04;
var O1 = 0.137;
var Mi = 0.0131;
var _r = or - 6e-4;
var El = 0.0215;
var Gu = 0.0565;
var CT = No + 0.002;
var Lp = Jn - 0.0056;
var Ek = 9e-4;
var x00 = 0.042;
var N5 = Math.tan(Ze(16.5));
var b00 = 0.0021;
var FT = 0.0332;
var r1 = 0.0222;
var Cc = -5e-4;
var ga = -0.101;
var wo = (o) => b00 + (o + 0.108) * N5;
var ai = (o) => wo(o) - FT;
var B1 = (o) => o.map((t) => [t[0], t[1]]);
var tN = (o, t, e) => o + (t - o) * e;
var Ip = (o, t = 0) => {
  let e = t / 0.0052,
    s = 0.0042 * (1 - e);
  return [
    [-o, or],
    [o, or],
    [o, Jn - 0.0052, 5e-4],
    [o - s, Jn - t, 5e-4],
    [-(o - s), Jn - t, 5e-4],
    [-o, Jn - 0.0052, 5e-4],
  ];
};
var BT = [
  [-0.003, _r],
  [0.132, _r, 8e-4],
  [0.1328, 0.003, 0.002],
  [0.1314, -0.0058, 0.0028],
  [0.0964, -0.008, 0.001],
  [0.0946, -0.0095, 6e-4],
  [0.0445, -0.0095],
  [0.0438, -0.015],
  [-0.003, -0.015],
];
var Ck = Sc(
  [
    [0.0225, -0.0293, 0.0048],
    [0.032, -0.0297, 0.0048],
    [0.044, -0.0306, 0.0048],
    [0.054, -0.0317, 0.0048],
    [0.064, -0.0346, 0.005],
    [0.073, -0.037, 0.0054],
    [0.085, -0.037, 0.0054],
    [0.09, -0.0348, 0.0054],
    [0.0931, -0.0304, 0.0054],
    [0.0943, -0.024, 0.0054],
    [0.0946, -0.017, 0.0054],
    [0.0947, -0.0085, 0.0054],
  ],
  0.0054,
);
var U1 = 0.068;
var uN = Sc(
  [
    [U1, -0.01],
    [U1 - 0.0011, -0.015],
    [U1 - 0.0021, -0.0202],
    [U1 - 0.0025, -0.025],
    [U1 - 0.0016, -0.0296],
  ],
  0.0046,
);
var Xl = -0.0128;
var Hp = 0.101;
var Fp = 0.13;
var UT = 0.0206;
var PT = 0.1225;
var y00 = (() => {
  let o = [
    [Hp, -0.008],
    [Fp, -0.0062],
    [Fp, Xl],
  ];
  for (let t of [0.1225, 0.1143, 0.1061])
    o.push(
      [t + 0.0022, Xl],
      [t + 0.0022, Xl + 0.0027],
      [t - 0.0022, Xl + 0.0027],
      [t - 0.0022, Xl],
    );
  return (o.push([Hp, Xl]), o);
})();
var dN = (o) => {
  let t = o === "ext" ? ga - 0.021 : ga - 0.001,
    e = o === "ext" ? ga - 0.03 : ga - 0.0076,
    s = ga - 2e-4,
    n = [
      [wo(Cc), Cc],
      [wo(t), t],
      [ai(t), t],
      [ai(Cc), Cc],
    ],
    i =
      o === "ext"
        ? [
            [wo(s) + 0.004, s, 0.0015],
            [wo(e) + 0.0062, e + 4e-4, 0.004],
            [ai(e) - 0.0022, e, 0.004],
            [ai(s) - 0.0012, s, 0.0015],
          ]
        : [
            [wo(s) + 0.0046, s, 0.0015],
            [wo(e) + 0.0058, e + 4e-4, 0.0025],
            [ai(e) - 0.0015, e, 0.0025],
            [ai(s) - 0.0012, s, 0.0015],
          ];
  return {
    body: n,
    base: i,
    yb: t,
    y1: e,
    baseW: o === "ext" ? 0.0258 : 0.025,
  };
};
function Vy(o) {
  return (t) => {
    let e = o.length;
    if (t <= o[0][0]) return o[0][1];
    if (t >= o[e - 1][0]) return o[e - 1][1];
    let s = 0;
    for (; t > o[s + 1][0];) s++;
    let n = o[Math.max(0, s - 1)],
      i = o[s],
      a = o[s + 1],
      r = o[Math.min(e - 1, s + 2)],
      l = a[0] - i[0],
      c = (t - i[0]) / l,
      h = ((a[1] - n[1]) / (a[0] - n[0])) * l,
      f = ((r[1] - i[1]) / (r[0] - i[0])) * l,
      u = c * c,
      d = u * c;
    return (
      (2 * d - 3 * u + 1) * i[1] +
      (d - 2 * u + c) * h +
      (-2 * d + 3 * u) * a[1] +
      (d - u) * f
    );
  };
}
var v00 = Vy([
  [ga, 0.0086],
  [-0.097, 0.0082],
  [-0.09, 0.0104],
  [-0.075, 0.0149],
  [-0.06, 0.0195],
  [-0.048, 0.023],
  [-0.038, 0.0262],
  [-0.032, 0.0296],
  [-0.025, 0.0372],
  [-0.017, 0.0432],
  [-0.01, 0.0445],
  [_r, 0.0445],
]);
var M00 = (o) => (o > -0.01 ? 0.0026 : v00(o));
var w00 = Vy([
  [ga, -0.0478],
  [-0.097, -0.0463],
  [-0.09, -0.0442],
  [-0.075, -0.0396],
  [-0.06, -0.034],
  [-0.045, -0.0272],
  [-0.03, -0.0198],
  [-0.019, -0.0125],
  [-0.0105, -0.0072],
  [-0.0065, -0.0062],
  [-0.0037, -0.0085],
  [-0.0015, -0.0135],
  [1e-4, -0.0215],
  [0.0011, -0.0296],
  [0.0019, -0.0338],
  [0.0031, -0.0345],
  [_r, -0.0345],
]);
var pN = Vy([
  [ga, 0.0158],
  [-0.096, 0.015],
  [-0.075, 0.0151],
  [-0.045, 0.0148],
  [-0.028, 0.0141],
  [-0.015, 0.0133],
  [-0.006, 0.0128],
  [_r, 0.0128],
]);
var E00 = Vy([
  [ga, 0.007],
  [-0.09, 0.0076],
  [-0.045, 0.007],
  [-0.02, 0.0045],
  [-0.0125, 0.0035],
  [-0.01, 0.002],
  [_r, 0.002],
]);
var T00 = Vy([
  [ga, 0.0105],
  [-0.08, 0.0118],
  [-0.04, 0.0112],
  [-0.016, 0.008],
  [-0.0105, 0.0058],
  [-0.0045, 0.006],
  [-0.0013, 0.0085],
  [0.0011, 0.0118],
  [0.0031, 0.011],
  [_r, 0.008],
]);
var Wu = new Vector3();
var eN = new Vector3();
var sN = new Vector3();
function By(o, t, e) {
  let s = M00(t),
    n = w00(t),
    i = pN(t),
    a = Math.min(E00(t), i - 1e-4),
    r = Math.min(T00(t), i - 1e-4);
  if (a + r > s - n - 2e-4) {
    let g = (s - n - 2e-4) / (a + r);
    ((a *= g), (r *= g));
  }
  o = ((o % 8) + 8) % 8;
  let l = Math.floor(o),
    c = o - l,
    h = Math.PI / 2,
    f = s - a,
    u = n + r,
    d = i - a,
    m = i - r,
    p,
    x;
  switch (l) {
    case 0:
      ((p = d + a * Math.cos(c * h)), (x = f + a * Math.sin(c * h)));
      break;
    case 1:
      ((p = d * (1 - 2 * c)), (x = s));
      break;
    case 2:
      ((p = -d - a * Math.sin(c * h)), (x = f + a * Math.cos(c * h)));
      break;
    case 3:
      ((p = -i), (x = f + (u - f) * c));
      break;
    case 4:
      ((p = -m - r * Math.cos(c * h)), (x = u - r * Math.sin(c * h)));
      break;
    case 5:
      ((p = -m * (1 - 2 * c)), (x = n));
      break;
    case 6:
      ((p = m + r * Math.sin(c * h)), (x = u - r * Math.cos(c * h)));
      break;
    default:
      ((p = i), (x = u + (f - u) * c));
  }
  return e.set(p, t, -x);
}
var mN = [
  ga,
  -0.0985,
  -0.095,
  -0.09,
  -0.083,
  -0.075,
  -0.065,
  -0.055,
  -0.047,
  -0.04,
  -0.034,
  -0.026,
  -0.018,
  -0.0125,
  -0.0085,
  -0.0055,
  -0.0033,
  -0.0017,
  -5e-4,
  5e-4,
  0.0013,
  0.0021,
  0.0033,
  0.0052,
  _r,
];
function gN(o, t) {
  let e = [];
  for (let f = 0; f < 8; f++)
    for (let u = 0; u < t[f]; u++) e.push(f + u / t[f]);
  let s = e.length,
    n = [],
    i = [],
    a = [],
    r = new Vector3(),
    l = new Vector3();
  for (let f = 0; f < o.length; f++) {
    let u = 0;
    for (let d = 0; d <= s; d++)
      (By(e[d % s], o[f], r),
        d && (u += r.distanceTo(l)),
        l.copy(r),
        n.push(r.x, r.y, r.z),
        i.push(u, o[f]));
  }
  for (let f = 0; f < o.length - 1; f++)
    for (let u = 0; u < s; u++) {
      let d = f * (s + 1) + u,
        m = d + 1,
        p = d + s + 1,
        x = p + 1;
      a.push(d, m, p, m, x, p);
    }
  let c = new BufferGeometry();
  (c.setAttribute("position", new Float32BufferAttribute(n, 3)),
    c.setAttribute("uv", new Float32BufferAttribute(i, 2)),
    c.setIndex(a),
    c.computeVertexNormals());
  let h = c.attributes.normal;
  for (let f = 0; f < o.length; f++) {
    let u = f * (s + 1),
      d = u + s;
    (r.fromBufferAttribute(h, u).add(l.fromBufferAttribute(h, d)).normalize(),
      h.setXYZ(u, r.x, r.y, r.z),
      h.setXYZ(d, r.x, r.y, r.z));
  }
  return Qe(c);
}
function Uy(o, t, e, s) {
  let n = new Shape(),
    i = new Vector3(),
    a = !0;
  for (let l = 0; l < 8; l++)
    for (let c = 0; c < t[l]; c++)
      (By(l + c / t[l], o, i),
        a ? (n.moveTo(i.x, i.z), (a = !1)) : n.lineTo(i.x, i.z));
  if ((n.closePath(), s)) {
    let l = new Path();
    l.moveTo(s[0][0], s[0][1]);
    for (let c = 1; c < s.length; c++) l.lineTo(s[c][0], s[c][1]);
    (l.closePath(), n.holes.push(l));
  }
  let r = new ShapeGeometry(n);
  if ((r.rotateX(Math.PI / 2), r.translate(0, o, 0), e)) {
    let l = r.index.array;
    for (let c = 0; c < l.length; c += 3) {
      let h = l[c + 1];
      ((l[c + 1] = l[c + 2]), (l[c + 2] = h));
    }
    (r.deleteAttribute("normal"), r.computeVertexNormals());
  }
  return Qe(r);
}
function S00(o) {
  let t = ga,
    e = ga + o,
    s = r1 / 2 + 5e-4,
    n = 6e-4,
    i = [],
    a = (c, h, f, u) => i.push(...c, ...h, ...f, ...c, ...f, ...u),
    r = (c, h, f) => [c, h, -(f ? wo(h) + n : ai(h) - n)];
  (a(r(-s, t, 1), r(s, t, 1), r(s, e, 1), r(-s, e, 1)),
    a(r(s, t, 0), r(-s, t, 0), r(-s, e, 0), r(s, e, 0)),
    a(r(-s, t, 0), r(-s, t, 1), r(-s, e, 1), r(-s, e, 0)),
    a(r(s, t, 1), r(s, t, 0), r(s, e, 0), r(s, e, 1)),
    a(r(-s, e, 1), r(s, e, 1), r(s, e, 0), r(-s, e, 0)));
  let l = new BufferGeometry();
  return (
    l.setAttribute("position", new Float32BufferAttribute(i, 3)),
    l.computeVertexNormals(),
    Qe(l)
  );
}
var OT = 0.0014;
var _00 = 0.0019;
function R00() {
  let o = r1 / 2 + 5e-4,
    t = 6e-4,
    e = OT,
    s = ga,
    n = ga + _00,
    i = [],
    a = (u, d, m, p) => i.push(...u, ...d, ...m, ...u, ...m, ...p),
    r = -(wo(s) + t + e),
    l = -(ai(s) - t - e),
    c = -(wo(n) + t),
    h = -(ai(n) - t);
  (a([-o - e, s, r], [o + e, s, r], [o, n, c], [-o, n, c]),
    a([o + e, s, l], [-o - e, s, l], [-o, n, h], [o, n, h]),
    a([-o - e, s, l], [-o - e, s, r], [-o, n, c], [-o, n, h]),
    a([o + e, s, r], [o + e, s, l], [o, n, h], [o, n, c]));
  let f = new BufferGeometry();
  return (
    f.setAttribute("position", new Float32BufferAttribute(i, 3)),
    f.computeVertexNormals(),
    f.setAttribute(
      "color",
      new BufferAttribute(new Float32Array(i.length).fill(2), 3),
    ),
    Qe(f)
  );
}
function A00(o, t, e = 0.003, s = 4) {
  let n = [],
    i = [],
    a = [],
    r = 4 * (s + 1),
    l = new Vector3(),
    c = new Vector3();
  for (let u = 0; u < o.length; u++) {
    let d = o[u],
      m = t(d),
      p = Math.min(e, m * 0.46),
      x = wo(d),
      g = ai(d),
      b = 0,
      v = 0,
      y = 0;
    for (let M = 0; M <= r; M++) {
      let w = Math.floor((M % r) / (s + 1)),
        T = ((w + ((M % r) % (s + 1)) / s) * Math.PI) / 2,
        S = (w === 0 || w === 3 ? 1 : -1) * (m - p),
        E = w < 2 ? x - p : g + p,
        _ = S + p * Math.cos(T),
        R = E + p * Math.sin(T);
      (M && (b += Math.hypot(_ - v, R - y)),
        (v = _),
        (y = R),
        n.push(_, d, -R),
        i.push(b, d));
    }
  }
  for (let u = 0; u < o.length - 1; u++)
    for (let d = 0; d < r; d++) {
      let m = u * (r + 1) + d,
        p = m + 1,
        x = m + r + 1,
        g = x + 1;
      a.push(m, p, x, p, g, x);
    }
  let h = new BufferGeometry();
  (h.setAttribute("position", new Float32BufferAttribute(n, 3)),
    h.setAttribute("uv", new Float32BufferAttribute(i, 2)),
    h.setIndex(a),
    h.computeVertexNormals());
  let f = h.attributes.normal;
  for (let u = 0; u < o.length; u++) {
    let d = u * (r + 1),
      m = d + r;
    (l.fromBufferAttribute(f, d).add(c.fromBufferAttribute(f, m)).normalize(),
      f.setXYZ(d, l.x, l.y, l.z),
      f.setXYZ(m, l.x, l.y, l.z));
  }
  return Qe(h);
}
var Tk = (o, t, e = 0, s = 0.0026) => [
  [-(t - e), ai(o) + e, s],
  [t - e, ai(o) + e, s],
  [t - e, wo(o) - e, s],
  [-(t - e), wo(o) - e, s],
];
function U4(o, t, e, s, n = 12) {
  let i = new CylinderGeometry(o, o, t, n);
  return (
    i.applyQuaternion(
      new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), s),
    ),
    i.translate(e.x, e.y, e.z),
    Qe(i)
  );
}
function nN(o, t, e, s, n = 0, i = 14) {
  let a = (r) => (
    n && (r.translate(0, -e, s), r.rotateX(n), r.translate(0, e, -s)),
    r
  );
  (o(
    "brass",
    a(
      ni(
        [
          [s, 0.004],
          [s + 3e-4, 0.00492],
          [s + 0.0012, 0.00492],
          [s + 0.0014, 0.0043],
          [s + 0.0022, 0.0043],
          [s + 0.003, 0.00495],
          [s + 0.0188, 0.00482],
          [s + 0.0191, 0.00465],
        ],
        {
          x: t,
          y: e,
          seg: i,
          crease: 0.8,
        },
      ),
    ),
  ),
    o("brass", a(U4(0.004, 2e-4, Gt(t, e, s + 8e-5), Bt(0, 0, 1), i))),
    o("primer", a(U4(0.0022, 2e-4, Gt(t, e, s - 6e-5), Bt(0, 0, 1), 10))),
    o(
      "copper",
      a(
        ni(
          [
            [s + 0.0189, 0.00448],
            [s + 0.0222, 0.00446],
            [s + 0.025, 0.00405],
            [s + 0.027, 0.0033],
            [s + 0.0284, 0.00235],
            [s + 0.0292, 0.00135],
            [s + 0.02955, 45e-5],
            [s + 0.02962, 2e-5],
          ],
          {
            x: t,
            y: e,
            seg: i,
            crease: 1.4,
          },
        ),
      ),
    ));
}
function zT(o, t, e, s, n, i, a = 34e-5, r = 3e-4) {
  let l = [],
    c = [],
    h = [],
    f = new Vector3(),
    u = (m, p) => 0.5 - 0.5 * Math.cos((Math.PI * m) / p);
  for (let m = 0; m <= i; m++) {
    let p = 0;
    for (let x = 0; x <= n; x++) {
      let g = u(x, n),
        b = u(m, i),
        v = tN(o, t, g),
        y = tN(e, s, b);
      (By(v, y, Wu),
        By(v + 0.02, y, eN),
        By(v, y + 4e-4, sN),
        f.crossVectors(eN.sub(Wu), sN.sub(Wu)).normalize());
      let M = Math.pow(
        (1 - Math.pow(Math.abs(2 * g - 1), 8)) *
          (1 - Math.pow(Math.abs(2 * b - 1), 8)),
        0.55,
      );
      (Wu.addScaledVector(f, -r + (a + r) * M),
        x && (p += Math.hypot(Wu.x - l[l.length - 3], Wu.z - l[l.length - 1])),
        l.push(Wu.x, Wu.y, Wu.z),
        c.push(p, y));
    }
  }
  for (let m = 0; m < i; m++)
    for (let p = 0; p < n; p++) {
      let x = m * (n + 1) + p,
        g = x + 1,
        b = x + n + 1,
        v = b + 1;
      h.push(x, g, b, g, v, b);
    }
  let d = new BufferGeometry();
  return (
    d.setAttribute("position", new Float32BufferAttribute(l, 3)),
    d.setAttribute("uv", new Float32BufferAttribute(c, 2)),
    d.setIndex(h),
    d.computeVertexNormals(),
    Qe(d)
  );
}
function xN(o, t = 0.002, e = 0.0045, s = null, n = null) {
  let i = 1 / 0,
    a = 1 / 0,
    r = 1 / 0,
    l = -1 / 0,
    c = -1 / 0,
    h = -1 / 0;
  for (let E = 0; E < o.length; E += 3)
    ((i = Math.min(i, o[E])),
      (l = Math.max(l, o[E])),
      (a = Math.min(a, o[E + 1])),
      (c = Math.max(c, o[E + 1])),
      (r = Math.min(r, o[E + 2])),
      (h = Math.max(h, o[E + 2])));
  let f = e + t;
  ((i -= f), (a -= f), (r -= f));
  let u = Math.ceil((l + f - i) / t) + 1,
    d = Math.ceil((c + f - a) / t) + 1,
    m = Math.ceil((h + f - r) / t) + 1,
    p = u * d,
    x = new Float32Array(p * m).fill(e),
    g = new Float32Array(p * m).fill(e * e),
    b = 1 / t,
    v = s ? x : null,
    y = s ? new Float32Array(p * m) : x,
    M = s ? new Int32Array(p * m).fill(-1) : null,
    w = [],
    T = -1,
    S = () => {
      for (let E = 0; E < w.length; E++) {
        let _ = w[E];
        y[_] < v[_] && (v[_] = y[_]);
      }
      w.length = 0;
    };
  for (let E = 0; E < o.length; E += 9) {
    s && s[E / 9] !== T && (S(), (T = s[E / 9]));
    let _ = n ? n[E / 9] : 0,
      R = _ & 5,
      C = _ & 3,
      L = _ & 6,
      A = o[E],
      O = o[E + 1],
      H = o[E + 2],
      F = o[E + 3],
      P = o[E + 4],
      z = o[E + 5],
      k = o[E + 6],
      I = o[E + 7],
      G = o[E + 8],
      K = F - A,
      $ = P - O,
      n0 = z - H,
      e0 = k - A,
      p0 = I - O,
      t0 = G - H,
      M0 = $ * t0 - n0 * p0,
      f0 = n0 * e0 - K * t0,
      _0 = K * p0 - $ * e0,
      F0 = Math.hypot(M0, f0, _0);
    if (F0 < 1e-14) continue;
    ((M0 /= F0), (f0 /= F0), (_0 /= F0));
    let m0 = Math.max(0, Math.floor((Math.min(A, F, k) - e - i) * b)),
      S0 = Math.min(u - 1, Math.ceil((Math.max(A, F, k) + e - i) * b)),
      T0 = Math.max(0, Math.floor((Math.min(O, P, I) - e - a) * b)),
      j0 = Math.min(d - 1, Math.ceil((Math.max(O, P, I) + e - a) * b)),
      Z0 = Math.max(0, Math.floor((Math.min(H, z, G) - e - r) * b)),
      lt = Math.min(m - 1, Math.ceil((Math.max(H, z, G) + e - r) * b));
    for (let H0 = Z0; H0 <= lt; H0++)
      for (let Y0 = T0; Y0 <= j0; Y0++)
        for (let et = m0; et <= S0; et++) {
          let ct = i + et * t,
            D0 = a + Y0 * t,
            u0 = r + H0 * t,
            w0 = ct - A,
            P0 = D0 - O,
            st = u0 - H,
            J0 = w0 * M0 + P0 * f0 + st * _0,
            q0 = H0 * p + Y0 * u + et;
          if (
            (s &&
              M[q0] !== T &&
              ((M[q0] = T), (g[q0] = e * e), (y[q0] = e), w.push(q0)),
            J0 * J0 >= g[q0])
          )
            continue;
          let v0,
            x0,
            C0,
            k0 = 0,
            O0 = K * w0 + $ * P0 + n0 * st,
            B0 = e0 * w0 + p0 * P0 + t0 * st;
          if (O0 <= 0 && B0 <= 0) ((v0 = A), (x0 = O), (C0 = H), (k0 = R));
          else {
            let ht = ct - F,
              pt = D0 - P,
              V0 = u0 - z,
              c0 = K * ht + $ * pt + n0 * V0,
              Z = e0 * ht + p0 * pt + t0 * V0;
            if (c0 >= 0 && Z <= c0) ((v0 = F), (x0 = P), (C0 = z), (k0 = C));
            else {
              let r0 = O0 * Z - c0 * B0;
              if (r0 <= 0 && O0 >= 0 && c0 <= 0) {
                let b0 = O0 / (O0 - c0);
                ((v0 = A + K * b0),
                  (x0 = O + $ * b0),
                  (C0 = H + n0 * b0),
                  (k0 = _ & 1));
              } else {
                let b0 = ct - k,
                  d0 = D0 - I,
                  V = u0 - G,
                  B = K * b0 + $ * d0 + n0 * V,
                  j = e0 * b0 + p0 * d0 + t0 * V;
                if (j >= 0 && B <= j) ((v0 = k), (x0 = I), (C0 = G), (k0 = L));
                else {
                  let s0 = B * B0 - O0 * j;
                  if (s0 <= 0 && B0 >= 0 && j <= 0) {
                    let l0 = B0 / (B0 - j);
                    ((v0 = A + e0 * l0),
                      (x0 = O + p0 * l0),
                      (C0 = H + t0 * l0),
                      (k0 = _ & 4));
                  } else {
                    let l0 = c0 * j - B * Z;
                    if (l0 <= 0 && Z - c0 >= 0 && B - j >= 0) {
                      let E0 = (Z - c0) / (Z - c0 + (B - j));
                      ((v0 = F + (k - F) * E0),
                        (x0 = P + (I - P) * E0),
                        (C0 = z + (G - z) * E0),
                        (k0 = _ & 2));
                    } else {
                      let E0 = 1 / (l0 + s0 + r0),
                        U = s0 * E0,
                        X = r0 * E0;
                      ((v0 = A + K * U + e0 * X),
                        (x0 = O + $ * U + p0 * X),
                        (C0 = H + n0 * U + t0 * X));
                    }
                  }
                }
              }
            }
          }
          let ot = ct - v0,
            Q0 = D0 - x0,
            nt = u0 - C0,
            L0 = ot * ot + Q0 * Q0 + nt * nt;
          L0 < g[q0] &&
            ((g[q0] = L0), (y[q0] = (J0 >= 0 || k0 ? 1 : -1) * Math.sqrt(L0)));
        }
  }
  return (
    s && S(),
    (E, _, R) => {
      let C = (E - i) * b,
        L = (_ - a) * b,
        A = (R - r) * b;
      if (C < 0 || L < 0 || A < 0 || C >= u - 1 || L >= d - 1 || A >= m - 1)
        return e;
      let O = C | 0,
        H = L | 0,
        F = A | 0,
        P = C - O,
        z = L - H,
        k = A - F,
        I = F * p + H * u + O,
        G = x[I] + (x[I + 1] - x[I]) * P,
        K = x[I + u] + (x[I + u + 1] - x[I + u]) * P,
        $ = x[I + p] + (x[I + p + 1] - x[I + p]) * P,
        n0 = x[I + p + u] + (x[I + p + u + 1] - x[I + p + u]) * P,
        e0 = G + (K - G) * z,
        p0 = $ + (n0 - $) * z;
      return e0 + (p0 - e0) * k;
    }
  );
}
var k00 = (o) => {
  let t = [];
  for (let e of o) {
    let s = e.attributes.position.array;
    for (let n = 0; n < s.length; n++) t.push(s[n]);
  }
  return new Float32Array(t);
};
var oN = {};
var Sk = null;
function C00(o) {
  if (Sk) return Sk;
  let t = o.attributes.position,
    e = o.index.array,
    s = t.count,
    n = new Int32Array(s),
    i = new Int32Array(s),
    a = new Map(),
    r = new Map(),
    l = (u) => {
      for (; i[u] !== u;) ((i[u] = i[i[u]]), (u = i[u]));
      return u;
    };
  for (let u = 0; u < s; u++) {
    let d =
        Math.round(t.getX(u) * 2e5) +
        "|" +
        Math.round(t.getY(u) * 2e5) +
        "|" +
        Math.round(t.getZ(u) * 2e5),
      m = a.get(d);
    (m === void 0 ? (a.set(d, u), (n[u] = u)) : (n[u] = m), (i[u] = n[u]));
  }
  let c = (u, d) => (u < d ? u * s + d : d * s + u),
    h = o.groups.length
      ? o.groups.filter((u) => u.materialIndex !== 4)
      : [
          {
            start: 0,
            count: e.length,
          },
        ];
  for (let u of h)
    for (let d = u.start; d < u.start + u.count; d += 3) {
      let m = n[e[d]],
        p = n[e[d + 1]],
        x = n[e[d + 2]];
      ((i[l(p)] = l(m)), (i[l(x)] = l(m)));
      for (let g of [c(m, p), c(p, x), c(x, m)]) r.set(g, (r.get(g) || 0) + 1);
    }
  let f = [];
  for (let u of h)
    for (let d = u.start; d < u.start + u.count; d += 3) {
      let m = n[e[d]],
        p = n[e[d + 1]],
        x = n[e[d + 2]];
      f.push([
        l(m),
        d,
        (r.get(c(m, p)) === 1 ? 1 : 0) |
          (r.get(c(p, x)) === 1 ? 2 : 0) |
          (r.get(c(x, m)) === 1 ? 4 : 0),
      ]);
    }
  return (
    f.sort((u, d) => u[0] - d[0]),
    (Sk = {
      order: f.map((u) => u[1]),
      comp: Int32Array.from(f, (u) => u[0]),
      rim: Uint8Array.from(f, (u) => u[2]),
      open: f.filter((u) => u[2]).length,
    })
  );
}
function qu(o, t, e, s, n = null, i = 0.002, a = null) {
  let r = oN[o] || (oN[o] = new w5(o));
  (r.write(t, e, s, null, null), r.root.updateMatrixWorld(!0));
  let l = r._proxyMesh;
  if (!l) {
    let y = qH().proxy;
    (y
      ? ((l = new SkinnedMesh(y, r.mesh.material)),
        (l.visible = !1),
        (l.frustumCulled = !1),
        r.root.add(l),
        l.bind(r.mesh.skeleton, new Matrix4()))
      : (l = r.mesh),
      (r._proxyMesh = l),
      r.root.updateMatrixWorld(!0));
  }
  let c = l.geometry,
    h = c.index.array,
    f = c.attributes.skinIndex,
    u = c.attributes.position.count,
    d = new Float32Array(u * 3),
    m = new Vector3(),
    p = [];
  for (let y = 0; y < u; y++)
    (l.getVertexPosition(y, m),
      (d[y * 3] = m.x),
      (d[y * 3 + 1] = m.y),
      (d[y * 3 + 2] = m.z));
  let x = C00(c),
    g = [],
    b = [];
  for (let y = 0; y < x.order.length; y++) {
    let M = x.order[y],
      w = h[M],
      T = h[M + 1],
      S = h[M + 2];
    (n && n.includes(f.getX(w))) ||
      (a && !a.includes(f.getX(w))) ||
      (g.push(x.comp[y]),
      b.push(x.rim[y]),
      p.push(
        d[w * 3],
        d[w * 3 + 1],
        d[w * 3 + 2],
        d[T * 3],
        d[T * 3 + 1],
        d[T * 3 + 2],
        d[S * 3],
        d[S * 3 + 1],
        d[S * 3 + 2],
      ));
  }
  let v = xN(
    new Float32Array(p),
    i,
    0.0045,
    Int32Array.from(g),
    Uint8Array.from(b),
  );
  return (y, M, w) => v(y * o, M, w);
}
var _k = null;
function VT() {
  if (_k) return _k;
  let o = ao(),
    t = (c, h, f = {}, u = c.userData.wear) => {
      let d = c.clone();
      return (
        d.color.set(h),
        Object.assign(d, f),
        (d.userData = {
          base: new Color(h),
          wear: u,
        }),
        d
      );
    },
    e = document.createElement("canvas");
  ((e.width = 512), (e.height = 256));
  let s = e.getContext("2d"),
    n = {};
  ((s.fillStyle = "#fff"), (s.textBaseline = "middle"));
  let i = (c, h = 600) =>
      `${h} ${c}px Bahnschrift, "Segoe UI", Arial, sans-serif`,
    a = (c, h, f, u, d, m) => {
      (s.save(),
        s.translate(h, f),
        m(u, d),
        s.restore(),
        (n[c] = [h / 512, 1 - (f + d) / 256, (h + u) / 512, 1 - f / 256]));
    };
  (a("maker", 0, 0, 400, 56, () => {
    ((s.font = i(30)), s.fillText("GH-ARMS  \xB7  SOLSTICE CITY", 6, 30));
  }),
    a("serial", 0, 60, 230, 46, () => {
      ((s.font = i(30, 700)), s.fillText("SX9-04127", 6, 25));
    }),
    a("hood", 240, 60, 130, 46, () => {
      ((s.font = i(32, 700)), s.fillText("9x19", 8, 25));
    }),
    ["5", "10", "15", "20"].forEach((c, h) =>
      a("n" + c, h * 64, 112, 64, 44, () => {
        ((s.font = i(34, 700)), s.fillText(c, 6, 24));
      }),
    ),
    a("warn", 0, 162, 400, 40, () => {
      ((s.font = i(22)),
        s.fillText("READ MANUAL BEFORE USE", 6, 21),
        s.beginPath(),
        s.moveTo(330, 34),
        s.lineTo(348, 6),
        s.lineTo(366, 34),
        s.closePath(),
        (s.lineWidth = 3),
        (s.strokeStyle = "#fff"),
        s.stroke());
    }));
  let r = new CanvasTexture(e);
  ((r.anisotropy = 8), (r.colorSpace = SRGBColorSpace));
  let l = o.mark.clone();
  return (
    (l.map = r),
    (l.userData = {
      base: new Color(6974576),
      wear: 1,
      cells: n,
    }),
    (_k = {
      slide: t(
        o.steel,
        5593184,
        {
          roughness: 0.42,
          metalness: 0.5,
        },
        2.6,
      ),
      frame: t(
        o.poly,
        4540236,
        {
          roughness: 0.6,
        },
        1.35,
      ),
      gripTex: t(o.grip, 4145220, {}, 1.15),
      base: t(o.polyMag, 4474443, {}, 1.35),
      ctrl: t(
        o.steel,
        5658718,
        {
          roughness: 0.44,
          metalness: 0.5,
        },
        2.2,
      ),
      follower: t(
        o.red,
        13128988,
        {
          roughness: 0.55,
        },
        1.1,
      ),
      mark: l,
      magSteel: t(
        o.steel,
        6448492,
        {
          roughness: 0.47,
          metalness: 0.45,
        },
        2.1,
      ),
      magLip: t(
        o.steel,
        7106679,
        {
          roughness: 0.38,
          metalness: 0.6,
        },
        1.9,
      ),
      brass: t(
        o.brass,
        12619839,
        {
          roughness: 0.24,
        },
        1.2,
      ),
      copper: t(
        o.copper,
        12086336,
        {
          roughness: 0.28,
        },
        1,
      ),
      primer: t(
        o.steelBright,
        11052186,
        {
          roughness: 0.3,
        },
        1,
      ),
    })
  );
}
function N4(o, t, e, s, n, i, a) {
  let r = VT().mark.userData.cells[o],
    l = new PlaneGeometry(t, e),
    c = l.attributes.uv;
  for (let h = 0; h < c.count; h++)
    c.setXY(
      h,
      r[0] + c.getX(h) * (r[2] - r[0]),
      r[1] + c.getY(h) * (r[3] - r[1]),
    );
  return (
    a === "T"
      ? l.rotateX(-Math.PI / 2)
      : l.rotateY(a === "L" ? -Math.PI / 2 : Math.PI / 2),
    l.translate(s, n, -i),
    Qe(l)
  );
}
var Fy = {
  slide: Gt(0, 0.022, 0.05),
  barrel: Gt(0, No, 0.118),
  trigger: Gt(0, -0.01, U1),
  trigBlade: Gt(0, -0.019, U1),
  slideStop: Gt(-Mi, 0.003, 0.06),
  magRelease: Gt(-0.015, -0.0235, 0.024),
  mag: Gt(0, Cc, wo(Cc) - FT / 2),
  magRounds: Gt(0, Cc, wo(Cc) - FT / 2),
  magFollower: Gt(0, Cc, wo(Cc) - FT / 2),
  chamberRound: Gt(0, No, 0.0222),
};
var NT = [6, 2, 6, 3, 7, 2, 7, 3];
var P00 = [2, 1, 2, 1, 3, 1, 3, 1];
function iN(o, t) {
  let e = ao(),
    s = VT(),
    n = t.lo,
    i = !n,
    a = N1 - Ek,
    r = Jn + t.sightH,
    l = (c) => (n ? 0 : c);
  {
    let c = (h, ...f) => o("slide", h, ...f);
    if (n)
      c(
        s.slide,
        si(Ip(N1), O1 - kh, {
          u: kh,
          b: 8e-4,
        }),
      );
    else {
      (t.optic
        ? c(
            s.slide,
            si(Ip(a), 0.012, {
              u: kh,
              b: 0.001,
            }),
            si(Ip(a, 0.0022), 0.048, {
              u: -0.028,
              b: 0,
            }),
            si(Ip(a), El - 0.02, {
              u: 0.02,
              b: 5e-4,
            }),
          )
        : c(
            s.slide,
            si(Ip(a), El - kh, {
              u: kh,
              b: 0.001,
            }),
          ),
        c(
          s.slide,
          si(
            [
              [-a, or],
              [-a + 0.0034, or],
              [-a + 0.0034, Jn - 0.0042],
              [-0.0015, Jn - 0.0042],
              [-0.0015, Jn],
              [-(a - 0.0042), Jn, 5e-4],
              [-a, Jn - 0.0052, 5e-4],
            ],
            Gu - El,
            {
              u: El,
              b: 0,
            },
          ),
        ),
        c(
          s.slide,
          si(
            [
              [a - 0.0034, or],
              [a, or],
              [a, CT],
              [a - 0.0034, CT],
            ],
            Gu - El,
            {
              u: El,
              b: 0,
            },
          ),
        ),
        c(
          s.slide,
          si(Ip(a), O1 - Gu, {
            u: Gu,
            b: 0.0013,
            holes: [Kr(0, No, 0.0075, 18), Kr(0, No - 0.0118, 0.0041, 12)],
          }),
        ));
      let h = (f, u) =>
        Array.from(
          {
            length: u,
          },
          (d, m) => {
            let p = f + m * 0.0041;
            return [
              [p, or + 0.0034],
              [p + 0.0019, or + 0.0034],
              [p + 0.0065, Lp - 0.0026],
              [p + 0.0046, Lp - 0.0026],
            ];
          },
        );
      for (let f of [-1, 1]) {
        let u = [[kh + 8e-4, or + 4e-4, 6e-4]];
        (f < 0 &&
          u.push(
            [0.0715, or + 4e-4],
            [0.0715, or + 0.0027, 4e-4],
            [0.089, or + 0.0027, 4e-4],
            [0.089, or + 4e-4],
          ),
          u.push([O1 - 0.012, or + 4e-4, 0.001], [O1 - 0.016, Lp, 0.001]),
          f > 0 &&
            u.push(
              [Gu + 8e-4, Lp],
              [Gu + 8e-4, CT, 0.0015],
              [El - 8e-4, CT, 0.0015],
              [El - 8e-4, Lp],
            ),
          u.push([kh + 8e-4, Lp, 6e-4]));
        let d = [
          [0.0668, or + 0.0062, 0.0012],
          [0.0836, or + 0.0062, 0.0012],
          [0.0872, Lp - 0.0044, 0.0012],
          [0.0704, Lp - 0.0044, 0.0012],
        ];
        c(
          s.slide,
          us(u, Ek, {
            x: f * (N1 - Ek / 2),
            b: 28e-5,
            holes: [...h(-0.0362, 8), ...h(0.0895, 5), d],
          }),
        );
      }
      for (let f = -3; f <= 3; f++)
        (c(
          s.slide,
          us(se(0.06, Jn - 2e-4, 0.1175, Jn + 32e-5), 8e-4, {
            x: f * 0.0019,
            b: 0,
          }),
        ),
          t.optic ||
            c(
              s.slide,
              us(se(-0.027, Jn - 2e-4, 0.0185, Jn + 32e-5), 8e-4, {
                x: f * 0.0019,
                b: 0,
              }),
            ));
      (c(
        s.ctrl,
        si(se(-0.005, or + 0.0036, 0.005, Jn - 0.0064, 0.0012), 6e-4, {
          u: kh - 4e-4,
          b: 2e-4,
        }),
      ),
        c(
          e.black,
          fa(0.0013, 3e-4, {
            y: No - 0.001,
            u: kh - 6e-4,
            seg: 10,
          }),
        ),
        c(
          s.ctrl,
          us(se(-0.006, No + 0.0015, El + 0.001, No + 0.0047, 8e-4), 0.001, {
            x: N1 + 2e-4,
            b: 3e-4,
          }),
          Wn(0.0011, 8e-4, {
            x: N1 + 5e-4,
            y: No + 0.0031,
            u: 0.003,
            seg: 8,
          }),
        ),
        c(e.mark, x4("pistol", 0.046, 0.0131, -(N1 + 12e-5), 0.02, 0.03, -1)),
        c(s.mark, N4("maker", 0.05, 0.007, N1 + 12e-5, 0.015, 0.042, "R")));
    }
    if (
      (c(
        s.ctrl,
        si(
          [
            [-0.0088, Jn - 4e-4],
            [0.0088, Jn - 4e-4],
            [0.0088, r - 0.0014, 6e-4],
            [0.0079, r, 4e-4],
            [0.0022, r],
            [0.0022, r - 0.0044],
            [-0.0022, r - 0.0044],
            [-0.0022, r],
            [-0.0079, r, 4e-4],
            [-0.0088, r - 0.0014, 6e-4],
          ],
          0.009,
          {
            u: -0.0385,
            b: l(4e-4),
          },
        ),
      ),
      c(
        s.ctrl,
        us(
          [
            [0.1212, Jn - 4e-4],
            [0.1312, Jn - 4e-4],
            [0.13, r],
            [0.123, r],
          ],
          0.0038,
          {
            b: l(4e-4),
          },
        ),
      ),
      i)
    ) {
      for (let h of [-1, 1])
        (c(
          e.white,
          fa(0.00165, 3e-4, {
            x: h * 0.0054,
            y: r - 0.0024,
            u: -0.03868,
            seg: 12,
          }),
        ),
          c(
            e.trit,
            fa(0.0011, 3e-4, {
              x: h * 0.0054,
              y: r - 0.0024,
              u: -0.03885,
              seg: 10,
            }),
          ));
      (c(
        e.white,
        fa(0.00165, 3e-4, {
          y: r - 0.0024,
          u: 0.12215,
          seg: 12,
        }),
      ),
        c(
          e.trit,
          fa(0.0011, 3e-4, {
            y: r - 0.0024,
            u: 0.12198,
            seg: 10,
          }),
        ),
        c(
          s.ctrl,
          us(se(-0.0392, Jn - 4e-4, -0.0288, Jn + 9e-4, 4e-4), 0.0172, {
            b: 3e-4,
          }),
        ));
    }
  }
  {
    let c = (f, ...u) => o("barrel", f, ...u),
      h = t.threaded ? 0.1475 : O1 + 0.0014;
    if (
      (c(
        e.steelBright,
        us(se(El + 4e-4, No - 0.004, Gu - 4e-4, Jn - 4e-4, 0.001), 0.0158, {
          b: l(8e-4),
        }),
      ),
      c(
        e.steelBright,
        fa(0.0071, h - 0.0016 - Gu, {
          y: No,
          u: Gu - 4e-4,
          seg: 18,
        }),
      ),
      c(
        e.steelBright,
        ni(
          [
            [h - 0.002, 0.0071],
            [h - 6e-4, 0.0071],
            [h, 0.0064],
            [h, 0.0052],
            [h - 0.0016, 0.0046],
            [h - 0.02, 0.0046],
          ],
          {
            y: No,
            seg: n ? 10 : 18,
          },
        ),
      ),
      i)
    ) {
      if (
        (c(
          e.black,
          fa(0.0046, 4e-4, {
            y: No,
            u: h - 0.02,
            seg: 10,
          }),
        ),
        t.threaded)
      ) {
        let u = [[O1 + 0.0052, 0.0071]];
        for (let d = 0; d < 7; d++)
          u.push(
            [O1 + 0.0056 + d * 6e-4, 0.0074],
            [O1 + 0.0059 + d * 6e-4, 0.0069],
          );
        c(
          e.steel,
          ni(u, {
            y: No,
            seg: 16,
          }),
        );
      }
      (c(
        e.steelBright,
        us(
          [
            [El + 4e-4, No - 0.004],
            [El + 4e-4, No - 0.01],
            [El - 0.005, No - 0.0128],
            [El - 0.005, No - 0.0108],
          ],
          0.009,
          {
            b: 4e-4,
          },
        ),
      ),
        c(
          e.black,
          si(Kr(0, No, 0.005, 14), 3e-4, {
            u: El + 2e-4,
            b: 0,
          }),
        ),
        c(s.mark, N4("hood", 0.0115, 0.0041, 0.00795, No + 0.0066, 0.04, "R")),
        o(
          "",
          s.ctrl,
          fa(0.003, 0.079, {
            y: No - 0.0118,
            u: 0.0585,
            seg: 10,
          }),
          fa(0.003, 0.0012, {
            y: No - 0.0118,
            u: 0.1375,
            r2: 0.002,
            seg: 10,
          }),
        ),
        eT(
          e,
          {
            add: (u, ...d) => o("chamberRound", u, ...d),
          },
          0,
          No,
          0.0224,
          0.019,
          0.0049,
          0.0105,
        ),
        o(
          "chamberRound",
          e.brass,
          us(se(El + 3e-4, Jn - 0.0012, El + 0.0022, Jn - 2e-4), 0.0034, {
            b: 0,
          }),
        ));
    }
  }
  {
    let c = (m, ...p) => o("", m, ...p);
    if (n)
      c(
        s.frame,
        us(BT, 2 * Mi, {
          b: 0,
        }),
      );
    else {
      for (let m of [-1, 1])
        c(
          s.frame,
          us(BT, 0.0018, {
            x: m * (Mi - 9e-4),
            b: 9e-4,
          }),
        );
      (c(
        s.frame,
        us(
          [
            [-0.003, _r - 2e-4],
            [ai(_r) - 6e-4, _r - 2e-4],
            [-0.003, -0.0112],
          ],
          2 * Mi - 0.0034,
          {
            b: 0,
          },
        ),
      ),
        c(
          s.frame,
          us(
            [
              [wo(_r) + 6e-4, _r - 2e-4],
              [0.1318, _r - 2e-4],
              [0.1326, 0.003],
              [0.1312, -0.0056],
              [0.0962, -0.0078],
              [0.0946, -0.0093],
              [wo(-0.0095) + 6e-4, -0.0093],
            ],
            2 * Mi - 0.0034,
            {
              b: 0,
            },
          ),
        ));
    }
    let h = n ? P00 : NT,
      f = n
        ? [
            ga,
            -0.096,
            -0.075,
            -0.047,
            -0.034,
            -0.0125,
            -0.0065,
            -0.0015,
            0.0011,
            0.0031,
            _r,
          ]
        : mN;
    if ((c(s.frame, gN(f, h), Uy(_r, h, !0)), n)) c(s.frame, Uy(ga, h, !1));
    else {
      {
        let m = r1 / 2 + 5e-4 + OT,
          p = -(wo(ga) + 6e-4 + OT),
          x = -(ai(ga) - 6e-4 - OT);
        c(
          s.frame,
          Uy(ga, h, !1, [
            [-m, p],
            [m, p],
            [m, x],
            [-m, x],
          ]),
          R00(),
        );
      }
      (c(e.black, S00(0.04)),
        c(
          s.gripTex,
          zT(2.62, 4.4, -0.0935, -0.04, 16, 14),
          zT(6.6, 8.38, -0.0935, -0.033, 16, 14),
          zT(0.72, 2.28, -0.0935, -0.042, 12, 12),
          zT(4.74, 6.26, -0.0935, -0.022, 12, 14),
        ));
      for (let m of [-1, 1])
        c(
          s.gripTex,
          us(
            [
              [0.087, -0.0082, 0.0015],
              [0.093, -0.0074, 0.0015],
              [0.12, -0.0046, 0.0015],
              [0.12, 0.0026, 0.0015],
              [0.087, 0.0026, 0.0015],
            ],
            6e-4,
            {
              x: m * (Mi + 1e-4),
              b: 2e-4,
            },
          ),
        );
    }
    if (
      (c(
        s.frame,
        us(
          Ck,
          0.015,
          n
            ? {
                b: 0.002,
              }
            : {
                b: 0.0026,
                bs: 3,
                soft: !0,
              },
        ),
      ),
      c(
        s.frame,
        us(n ? se(Hp, Xl, Fp, -0.007) : y00, UT, {
          b: l(0.0014),
        }),
      ),
      i)
    ) {
      c(
        s.ctrl,
        us(se(0.074, -0.0056, 0.0835, -0.0016, 0.001), 2 * Mi + 0.0014, {
          b: 5e-4,
        }),
      );
      for (let [m, p, x] of [
        [U1, -0.0068, 0.0017],
        [0.06, 0.0022, 0.0019],
        [0.005, -0.006, 0.0016],
      ])
        c(
          s.ctrl,
          Wn(x, 2 * Mi + 5e-4, {
            y: p,
            u: m,
            seg: 10,
          }),
        );
      c(
        s.mark,
        N4("serial", 0.019, 0.0038, Mi + 2e-4, 0.0053, 0.104, "R"),
        N4("warn", 0.036, 0.0036, -(Mi + 2e-4), 0.0052, 0.105, "L"),
      );
    }
    let u = (m, ...p) => o("slideStop", m, ...p);
    if (
      (u(
        s.ctrl,
        us(
          [
            [0.061, 6e-4, 8e-4],
            [0.061, 0.005, 8e-4],
            [0.045, 0.0058],
            [0.045, 0.002],
          ],
          0.0011,
          {
            x: -(Mi + 55e-5),
            b: l(3e-4),
          },
        ),
      ),
      u(
        s.ctrl,
        us(se(0.03, 0.0012, 0.046, 0.0068, 0.0012), 0.0018, {
          x: -(Mi + 9e-4),
          b: l(6e-4),
        }),
      ),
      i)
    )
      for (let m = 0; m < 4; m++)
        u(
          s.ctrl,
          us(
            se(0.032 + m * 0.0034, 0.0066, 0.0333 + m * 0.0034, 0.0073),
            0.0015,
            {
              x: -(Mi + 9e-4),
              b: 2e-4,
            },
          ),
        );
    let d = (m, ...p) => o("magRelease", m, ...p);
    if (
      (d(
        s.ctrl,
        us(se(0.0195, -0.0275, 0.0285, -0.0195, 0.002), 0.003, {
          x: -0.0146,
          b: l(8e-4),
        }),
      ),
      i)
    )
      for (let m = 0; m < 3; m++)
        d(
          s.ctrl,
          us(
            se(0.0211 + m * 0.0025, -0.0262, 0.0219 + m * 0.0025, -0.0208),
            5e-4,
            {
              x: -0.01625,
              b: 1e-4,
            },
          ),
        );
    (o(
      "trigger",
      s.frame,
      us(
        uN,
        0.007,
        n
          ? {
              b: 0,
            }
          : {
              b: 0.0015,
              bs: 2,
              soft: !0,
            },
      ),
    ),
      i &&
        (o(
          "trigger",
          s.ctrl,
          Wn(0.0015, 0.0074, {
            y: -0.01,
            u: U1,
            seg: 8,
          }),
        ),
        o(
          "trigBlade",
          s.frame,
          us(
            Sc(
              [
                [U1 + 0.001, -0.014],
                [U1 + 1e-4, -0.02],
                [U1 - 3e-4, -0.0266],
              ],
              0.002,
            ),
            0.002,
            {
              b: 5e-4,
            },
          ),
        )));
  }
  {
    let c = t.magP,
      h = (u, ...d) => o("mag", u, ...d),
      f = (u, ...d) => o("magRounds", u, ...d);
    if (
      (h(
        s.base,
        us(
          c.base,
          c.baseW,
          n
            ? {
                b: 0.001,
              }
            : {
                b: 0.0022,
                bs: 2,
                soft: !0,
              },
        ),
      ),
      i)
    ) {
      let p = r1 / 2,
        x = (R) => (R <= 0 ? 0 : R >= 1 ? 1 : R * R * (3 - 2 * R)),
        g = (R) => p + (0.0068 - p) * x((R - -0.0265) / (-0.0085 - -0.0265)),
        b = [c.yb];
      for (let R = c.yb + 0.012; R < -0.0265 - 0.006; R += 0.014) b.push(R);
      for (let R = 0; R <= 6; R++)
        b.push(-0.0265 + ((-0.0085 - -0.0265) * R) / 6);
      (b.push(Cc - 0.003, Cc), h(s.magSteel, A00(b, g)));
      let v = Cc,
        y = ai(v),
        M = wo(v);
      (h(
        s.magLip,
        jc(Tk(v, 0.0068), 0.0012, {
          y: v - 0.0012,
          b: 3e-4,
          holes: [Tk(v, 0.0068, 0.001, 0.0016)],
        }),
      ),
        h(
          e.black,
          jc(Tk(v, 0.0068, 6e-4, 0.002), 3e-4, {
            y: v - 0.0026,
            b: 0,
          }),
        ),
        h(
          s.magLip,
          us(
            se(y, v - 0.001, y + 0.0024, v + 0.006, 8e-4),
            2 * 0.0068 - 0.0012,
            {
              b: 5e-4,
            },
          ),
        ));
      for (let R of [-1, 1])
        h(
          s.magLip,
          si(
            [
              [R * 0.0068, v - 0.001],
              [R * 0.0068, v + 0.0044, 0.0022],
              [R * 0.0036, v + 0.008, 5e-4],
              [R * 0.0031, v + 0.0071, 3e-4],
              [R * (0.0068 - 0.001), v + 0.0038, 0.0016],
              [R * (0.0068 - 0.001), v - 0.001],
            ],
            0.0236,
            {
              u: y + 0.001,
              b: 4e-4,
            },
          ),
        );
      let w = -0.03,
        T = c.yb + 0.0105;
      (h(
        s.magSteel,
        us(
          [
            [wo(w) - 0.0068, w, 0.0014],
            [wo(w) - 0.01, w, 0.0014],
            [wo(T) - 0.01, T, 0.0014],
            [wo(T) - 0.0068, T, 0.0014],
          ],
          r1 + 8e-4,
          {
            b: 4e-4,
          },
        ),
      ),
        h(
          s.magSteel,
          us(
            [
              [ai(w) + 0.0118, w - 0.006, 0.0024],
              [ai(w) + 0.0062, w - 0.006, 0.0024],
              [ai(T) + 0.0062, T, 0.0024],
              [ai(T) + 0.0118, T, 0.0024],
            ],
            r1 + 5e-4,
            {
              b: 25e-5,
            },
          ),
        ));
      for (let R of [-1, 1])
        h(
          e.black,
          us(
            se(wo(-0.034) - 0.0092, -0.0374, wo(-0.034) - 0.0036, -0.032, 6e-4),
            6e-4,
            {
              x: R * (r1 / 2 - 18e-5),
              b: 0,
            },
          ),
        );
      let S =
        c.yb < -0.11
          ? [
              [-0.044, "5"],
              [-0.062, "10"],
              [-0.08, "15"],
              [-0.098, "20"],
            ]
          : [
              [-0.044, "5"],
              [-0.062, "10"],
              [-0.08, "15"],
            ];
      for (let [R, C] of S) {
        let L = ai(R) + 0.009;
        (h(
          e.black,
          Wn(0.0023, r1 + 75e-5, {
            y: R,
            u: L,
            seg: 14,
          }),
        ),
          f(
            s.brass,
            Wn(0.0018, r1 + 9e-4, {
              y: R,
              u: L,
              seg: 12,
            }),
          ),
          h(
            s.mark,
            N4("n" + C, 0.0052, 0.0036, r1 / 2 + 2e-4, R, L + 0.0068, "R"),
            N4("n" + C, 0.0052, 0.0036, -(r1 / 2 + 2e-4), R, L + 0.0068, "L"),
          ));
      }
      {
        let R = Bt(0, Math.sin(Math.atan(N5)), Math.cos(Math.atan(N5)));
        for (let C = -0.036; C > c.yb + 0.012; C -= 0.011) {
          let L = Gt(0, C, ai(C));
          (h(e.black, U4(0.0015, 3e-4, L, R, 10)),
            f(s.brass, U4(0.00105, 5e-4, L, R, 8)));
        }
      }
      for (let R = 0; R < 3; R++)
        h(
          s.base,
          us(
            se(
              ai(c.y1 + 0.004) + 0.006,
              c.y1 + 0.002 + R * 0.0017,
              wo(c.y1 + 0.004) - 0.001,
              c.y1 + 0.003 + R * 0.0017,
              4e-4,
            ),
            c.baseW + 8e-4,
            {
              b: 3e-4,
            },
          ),
        );
      {
        let R = (wo(c.y1) + ai(c.y1)) / 2 + 0.002,
          C = Bt(0, -1, 0);
        (h(e.black, U4(0.0042, 3e-4, Gt(0, c.y1 - 3e-5, R), C, 16)),
          h(s.ctrl, U4(0.0032, 5e-4, Gt(0, c.y1 - 1e-4, R), C, 14)),
          h(
            s.base,
            us(
              se(R + 0.0075, c.y1 - 4e-4, R + 0.009, c.y1 + 4e-4),
              c.baseW * 0.62,
              {
                b: 2e-4,
              },
            ),
            us(
              se(R - 0.009, c.y1 - 4e-4, R - 0.0075, c.y1 + 4e-4),
              c.baseW * 0.62,
              {
                b: 2e-4,
              },
            ),
          ));
      }
      let E = (R, C) => f(s[R], C);
      (nN(E, 0, v + 0.003, y + 0.0032, 0.045, 18),
        nN(E, -8e-4, v - 0.00687, ai(v - 0.00687) + 0.003, 0.03, 10));
      let _ = (...R) => o("magFollower", s.follower, ...R);
      (_(
        us(
          [
            [y + 0.0032, v - 0.0016],
            [M - 0.0036, v - 0.0016],
            [M - 0.0036, v + 0.0016, 0.001],
            [y + 0.015, v + 0.0046, 0.003],
            [y + 0.0032, v + 0.005, 0.001],
          ],
          0.0106,
          {
            b: 9e-4,
            bs: 2,
            soft: !0,
          },
        ),
      ),
        _(
          us(
            [
              [y + 0.0045, v + 0.0046],
              [M - 0.006, v + 0.0012],
              [M - 0.006, v + 0.0024, 6e-4],
              [y + 0.015, v + 0.0056, 0.002],
              [y + 0.0045, v + 0.006, 6e-4],
            ],
            0.003,
            {
              b: 6e-4,
            },
          ),
        ),
        _(
          us(se(M - 0.0125, v + 4e-4, M - 0.005, v + 0.004, 6e-4), 0.0024, {
            x: -0.0042,
            b: 5e-4,
          }),
        ));
    }
  }
}
var Oy = (o, t) => (globalThis.GH_TUNE || {})[o] ?? t;
var aN = new Map();
var Rk = 0.26;
var bN = Gt(-0.12, -0.06, 0.02);
function z00(o) {
  let t = o || {};
  return {
    camo: t.camo || "factory",
    optic: t.optic === "reflex" ? "reflex" : "irons",
    muzzle:
      t.muzzle === "suppressor" || t.muzzle === "comp" ? t.muzzle : "none",
    underbarrel: t.underbarrel === "laser" ? "laser" : "none",
    magazine: t.magazine === "ext" ? "ext" : "std",
  };
}
function buildPistol(o = {}) {
  let t = z00(o.build),
    e = o.detail === "world",
    s = performance.now(),
    n = t.optic === "reflex" ? Mp("microdot") : null,
    i =
      t.muzzle !== "none"
        ? gf(t.muzzle, {
            caliber: "pistol",
          })
        : null,
    a =
      t.underbarrel === "laser"
        ? wp("laser", {
            mount: "rail",
          })
        : null,
    r = i ? No + i.radius - Jn : 0,
    l = n
      ? n.height - 0.0022 - n.window[1] / 6
      : r > 0.003
        ? Math.min(0.0125, Math.max(0.01, r + 0.0036))
        : 0.0058,
    c = {
      lo: e,
      optic: !!n,
      threaded: !!i,
      sightH: l,
      magP: dN(t.magazine),
    },
    h = Gt(0, No, i ? 0.1475 : O1 + 0.0014),
    f = Gt(0, Jn - 0.0022, -0.004),
    u = Gt(0, Xl, PT),
    d = {
      muzzle: i ? h.clone().add(Bt(0, 0, -i.length)) : h.clone(),
      eject: Gt(0.0105, 0.0315, 0.039),
      ejectDir: Bt(0.72, 0.58, 0.38).normalize(),
      sight: n
        ? f
            .clone()
            .add(n.eye)
            .add(Bt(0, 0, -Rk))
        : Gt(0, Jn + l - 4e-4, -0.0385),
      gripR: new Object3D(),
      gripL: new Object3D(),
    };
  (a && a.laser && (d.laser = u.clone().add(a.laser)),
    (d.gripR.name = "gripR"),
    (d.gripL.name = "gripL"));
  let m = {
    pos: Bt(0.06, -0.062, -0.3),
    rot: new Euler(0.03, 0.07, -0.02),
  };
  if (e) {
    let L = new Group();
    L.name = "gun_pistol";
    let A = [t.optic, t.muzzle, t.underbarrel, t.magazine, t.camo].join("."),
      O = aN.get(A);
    if (!O) {
      let H = VT(),
        F = [],
        P = [],
        z = xl(t.camo, "metal"),
        k = new Color(),
        I = ($, n0, e0) => {
          if ($.transparent) return;
          if (
            (e0 && (n0 = n0.clone().applyMatrix4(e0)),
            z && ($ === H.slide || $ === H.frame || $ === H.base))
          ) {
            P.push(n0);
            return;
          }
          (k.copy(
            $.userData && $.userData.base && $.userData.base.isColor
              ? $.userData.base
              : $.color || k.set(2105378),
          ),
            $.emissive && $.emissiveIntensity > 1 && k.copy($.emissive));
          let p0 = n0.attributes.color.array;
          for (let t0 = 0; t0 < p0.length; t0 += 3)
            ((p0[t0] = k.r), (p0[t0 + 1] = k.g), (p0[t0 + 2] = k.b));
          F.push(n0);
        };
      iN(($, n0, ...e0) => {
        if (!($ === "chamberRound" || $ === "magRounds" || $ === "magFollower"))
          for (let p0 of e0) I(n0, p0);
      }, c);
      let G = ao(),
        K = Jn - 0.0022;
      (i &&
        I(
          G.alu,
          fa(i.radius, i.length, {
            y: No,
            u: 0.1475,
            seg: 20,
          }),
        ),
        n &&
          (I(
            G.aluLt,
            us(se(-0.0275, K, 0.019, K + 0.006), 0.027, {
              b: 0,
            }),
          ),
          I(
            G.aluLt,
            si(
              [
                [-0.0135, K + 0.005],
                [0.0135, K + 0.005],
                [0.0135, K + 0.024],
                [0.0095, K + 0.028],
                [-0.0095, K + 0.028],
                [-0.0135, K + 0.024],
              ],
              0.008,
              {
                u: 0.009,
                b: 0,
                holes: [
                  [
                    [-0.0105, K + 0.0105],
                    [0.0105, K + 0.0105],
                    [0.0105, K + 0.024],
                    [-0.0105, K + 0.024],
                  ],
                ],
              },
            ),
          )),
        a &&
          I(
            G.alu,
            us(
              se(PT - 0.029, Xl - 0.031, PT + 0.029, Xl + 0.005, 0.004),
              0.036,
              {
                b: 0,
              },
            ),
          ),
        (O = {
          plain: F.length ? Vn(F, !1) : null,
          paint: P.length ? Rc(Vn(P, !1)) : null,
          cm: z,
        }),
        aN.set(A, O));
    }
    if (O.plain) {
      let H = new Mesh(O.plain, ao().world);
      ((H.castShadow = H.receiveShadow = !0), L.add(H));
    }
    if (O.paint) {
      let H = new Mesh(O.paint, O.cm);
      ((H.castShadow = H.receiveShadow = !0), L.add(H));
    }
    return (
      d.gripR.position.set(0.004, -0.05, 0.012),
      d.gripL.position.set(-0.014, -0.062, -0.006),
      L.add(d.gripR, d.gripL),
      {
        id: "pistol",
        root: L,
        anchors: d,
        hip: m,
        adsDist: Rk,
        hands: null,
        clips: null,
        build: o.build || null,
        mounts: null,
        resetPose() {},
      }
    );
  }
  let p = new Group(),
    x = {},
    g = {},
    b = VT();
  ((p.name = "gun_pistol"),
    iN((L, A, ...O) => {
      (g[L] || (g[L] = g4())).add(A, ...O);
    }, c));
  for (let L of [
    "slide",
    "barrel",
    "trigger",
    "slideStop",
    "magRelease",
    "mag",
    "chamberRound",
  ]) {
    let A = Du(p, x, L, Fy[L]);
    g[L].build(A, Fy[L]);
  }
  let y = (L, A, O) => {
    let H = new Group();
    return (
      (H.name = A),
      (H.userData.keep = !0),
      (H.userData.rest = Fy[A].clone().sub(Fy[L])),
      H.position.copy(H.userData.rest),
      O && ((H.userData.hidden = !0), (H.visible = !1)),
      x[L].add(H),
      (x[A] = H),
      g[A].build(H, Fy[A]),
      H
    );
  };
  (y("trigger", "trigBlade"),
    y("mag", "magRounds"),
    y("mag", "magFollower", !0));
  {
    let L = Du(p, x, "frag", bN);
    ((L.userData.hidden = !0), (L.visible = !1), L.add(buildGrenade()));
  }
  g[""].build(p);
  let M = (L, A, O) => {
      let H = new Object3D();
      return (
        (H.name = "mount_" + A),
        H.position.copy(O),
        L !== p && H.position.sub(L.userData.rest),
        L.add(H),
        H
      );
    },
    w = {
      optic: M(x.slide, "optic", f),
      muzzle: M(x.barrel, "muzzle", h),
      underbarrel: M(p, "underbarrel", u),
    };
  if (
    (n && w.optic.add(n.group),
    i && w.muzzle.add(i.group),
    a && w.underbarrel.add(a.group),
    t.camo !== "factory" && xl(t.camo, "metal"))
  ) {
    let L = new Map([
        [b.slide, "metal"],
        [b.frame, "polymer"],
        [b.base, "polymer"],
        [b.gripTex, "furniture"],
      ]),
      A = new Matrix4(),
      O = new Matrix4();
    (p.updateMatrixWorld(!0),
      A.copy(p.matrixWorld).invert(),
      p.traverse((H) => {
        !H.isMesh ||
          !L.has(H.material) ||
          ((H.geometry = Rc(H.geometry, O.multiplyMatrices(A, H.matrixWorld))),
          (H.material = xl(t.camo, L.get(H.material))));
      }));
  }
  if (t.camo !== "factory") for (let L of [n, i, a]) L && Ou(L, t.camo);
  p.add(d.gripR, d.gripL);
  let T = {
    id: "pistol",
    root: p,
    parts: x,
    anchors: d,
    mounts: w,
    hip: m,
    adsDist: Rk,
    build: o.build || null,
    underKind: t.underbarrel,
    opticKind: t.optic,
    magKind: t.magazine,
    magP: c.magP,
    dims: {
      TRAVEL: x00,
      BORE: No,
      ST: Jn,
      SB: or,
      sightH: l,
      mf: wo,
      mb: ai,
      MT0: Cc,
    },
  };
  T.setSlide = (L) => {
    let A = x,
      O = Math.min(1, Math.max(0, (L - 0.0012) / 0.0045)),
      H = O * O * (3 - 2 * O);
    ((A.slide.position.z = A.slide.userData.rest.z + L),
      (A.barrel.position.z = A.barrel.userData.rest.z + Math.min(L, 0.003)),
      A.barrel.rotation.set(0.021 * H, 0, 0),
      (A.chamberRound.position.z =
        A.chamberRound.userData.rest.z + Math.min(L, 0.03)));
  };
  let S = (T.proxies = {}),
    E = c.magP;
  ((S.grip = yN()),
    (S.frame = Zs(B1(BT), 2 * Mi, {
      r: 9e-4,
    })),
    (S.guard = Zs(B1(Ck), 0.015, {
      r: 0.0026,
    })),
    (S.rail = Zs(
      B1([
        [Hp, -0.008],
        [Fp, -0.0062],
        [Fp, Xl],
        [Hp, Xl],
      ]),
      UT,
      {
        r: 0.0014,
      },
    )),
    (S.sights = ds(
      Zn([0, Jn + l / 2, 0.034], [0.01, l / 2, 0.0046], 4e-4),
      Zn([0, Jn + l / 2, -0.1262], [0.0019, l / 2, 0.005], 4e-4),
    )),
    (S.slide = ds(
      Iu(B1(Ip(N1)), kh, O1, {
        r: 4e-4,
      }),
      S.sights,
    )),
    (S.barrel = b2(
      [0, No, -0.1],
      [0, No, -(c.threaded ? 0.1405 : O1 - 0.0058)],
      0.0071,
    )),
    (S.trigger = Zs(B1(uN), 0.007, {
      r: 0.0015,
    })),
    (S.stop = vN()),
    (S.magRel = MN()),
    (S.takedown = wN()),
    (S.mag = ds(
      Zs(B1(E.body), r1, {
        r: 0.003,
      }),
      Zs(B1(E.base), E.baseW, {
        r: 0.0022,
      }),
    )),
    (S.optic = n
      ? Zn([0, Jn + 0.0118, 0.004], [0.0142, 0.014, 0.0238], 0.003)
      : null),
    (S.under = a
      ? Zn([0, Xl - 0.0128, -PT], [0.02, 0.0184, 0.0292], 0.003)
      : null),
    (S.static = ds(
      S.grip,
      S.frame,
      S.guard,
      S.rail,
      S.stop,
      S.magRel,
      S.takedown,
      S.under,
    )),
    (S.body = ds(S.static, S.slide, S.barrel, S.optic)),
    (S.all = ds(S.body, S.trigger, S.mag)));
  let _ = performance.now();
  ((T.arms = new hf(T, {
    shoulderR: Bt(0.235, -0.335, 0.105),
    shoulderL: Bt(Oy("slx", -0.235), Oy("sly", -0.335), Oy("slz", 0.095)),
    pole: Bt(Oy("plx", 0.66), Oy("ply", -0.72), 0.22),
  })),
    (T.hands = {
      right: T.arms.R.root,
      left: T.arms.L.root,
    }),
    (T.grips = {}),
    (T.bakeTimes = {}));
  let R = performance.now();
  (U00(T), (T.fieldMs = Pk.ms));
  let C = performance.now();
  return (
    JO(T),
    (T.buildTimes = {
      geometry: Math.round(_ - s),
      arms: Math.round(R - _),
      bake: Math.round(C - R),
      clips: Math.round(performance.now() - C),
    }),
    T
  );
}
buildPistol.world = !0;
function L00(o, t, e = 0.0025, s = 0.0045) {
  let n = 3 * e,
    i = t[0],
    a = t[1],
    r = t[2],
    l = Math.ceil((t[3] - i) / n) + 1,
    c = Math.ceil((t[4] - a) / n) + 1,
    h = Math.ceil((t[5] - r) / n) + 1,
    f = l * c,
    u = (l - 1) * 3 + 1,
    d = (c - 1) * 3 + 1,
    m = (h - 1) * 3 + 1,
    p = u * d,
    x = 1 / e,
    g = (w, T, S, E) => {
      let _ = E;
      for (let R = 0; R < o.length; R++) {
        let C = o[R].box;
        if (_ > 0) {
          let A = Math.max(C[0] - w, 0, w - C[3]),
            O = Math.max(C[1] - T, 0, T - C[4]),
            H = Math.max(C[2] - S, 0, S - C[5]);
          if (A * A + O * O + H * H >= _ * _) continue;
        }
        let L = o[R].sd(w, T, S);
        L < _ && (_ = L);
      }
      return _;
    },
    b = new Float32Array(f * h);
  for (let w = 0; w < h; w++)
    for (let T = 0; T < c; T++)
      for (let S = 0; S < l; S++)
        b[w * f + T * l + S] = g(i + S * n, a + T * n, r + w * n, 1);
  let v = new Float32Array(p * m).fill(s),
    y = new Uint8Array(p * m),
    M = s + 0.87 * n;
  for (let w = 0; w < h - 1; w++)
    for (let T = 0; T < c - 1; T++)
      for (let S = 0; S < l - 1; S++) {
        let E = w * f + T * l + S;
        if (
          !(
            Math.min(
              b[E],
              b[E + 1],
              b[E + l],
              b[E + l + 1],
              b[E + f],
              b[E + f + 1],
              b[E + f + l],
              b[E + f + l + 1],
            ) > M
          )
        )
          for (let _ = 0; _ <= 3; _++)
            for (let R = 0; R <= 3; R++)
              for (let C = 0; C <= 3; C++) {
                let L = S * 3 + C,
                  A = T * 3 + R,
                  O = w * 3 + _,
                  H = O * p + A * u + L;
                y[H] ||
                  ((y[H] = 1), (v[H] = g(i + L * e, a + A * e, r + O * e, s)));
              }
      }
  return (w, T, S) => {
    let E = (w - i) * x,
      _ = (T - a) * x,
      R = (S - r) * x;
    if (E < 0 || _ < 0 || R < 0 || E >= u - 1 || _ >= d - 1 || R >= m - 1)
      return s;
    let C = E | 0,
      L = _ | 0,
      A = R | 0,
      O = E - C,
      H = _ - L,
      F = R - A,
      P = A * p + L * u + C,
      z = v[P] + (v[P + 1] - v[P]) * O,
      k = v[P + u] + (v[P + u + 1] - v[P + u]) * O,
      I = v[P + p] + (v[P + p + 1] - v[P + p]) * O,
      G = v[P + p + u] + (v[P + p + u + 1] - v[P + p + u]) * O,
      K = z + (k - z) * H,
      $ = I + (G - I) * H;
    return K + ($ - K) * F;
  };
}
var rN = null;
var LT = null;
var yN = () =>
  rN || (rN = xN(k00([gN(mN, NT), Uy(ga, NT, !1), Uy(_r, NT, !0)])));
var vN = () => Zn([-(Mi + 9e-4), 0.0042, -0.038], [9e-4, 0.0031, 0.008], 6e-4);
var MN = () => Zn([-0.0146, -0.0235, -0.024], [0.0015, 0.004, 0.0045], 0.001);
var wN = () => Zn([0, -0.0036, -0.07875], [Mi + 7e-4, 0.002, 0.00475], 6e-4);
function Pk() {
  if (LT) return LT;
  let o = performance.now(),
    t = dN("std"),
    e = (s, n, i, a, r) => [-r, i, -n, r, a, -s];
  return (
    (LT = L00(
      [
        {
          sd: yN(),
          box: e(-0.0352, 0.0342, ga - 5e-4, _r + 5e-4, 0.0162),
        },
        {
          sd: Zs(B1(BT), 2 * Mi, {
            r: 9e-4,
          }),
          box: e(-0.003, 0.133, -0.015, _r, Mi),
        },
        {
          sd: Zs(B1(Ck), 0.015, {
            r: 0.0026,
          }),
          box: e(0.0195, 0.0982, -0.0404, -0.006, 0.0075),
        },
        {
          sd: Zs(
            B1([
              [Hp, -0.008],
              [Fp, -0.0062],
              [Fp, Xl],
              [Hp, Xl],
            ]),
            UT,
            {
              r: 0.0014,
            },
          ),
          box: e(Hp, Fp, Xl, -0.006, UT / 2),
        },
        {
          sd: Iu(B1(Ip(N1)), kh, O1, {
            r: 4e-4,
          }),
          box: e(kh, O1, or, Jn, N1),
        },
        {
          sd: vN(),
          box: [-(Mi + 0.0018), 0.0011, -0.046, -Mi, 0.0073, -0.03],
        },
        {
          sd: MN(),
          box: [-0.0161, -0.0275, -0.0285, -0.0131, -0.0195, -0.0195],
        },
        {
          sd: wN(),
          box: [-(Mi + 7e-4), -0.0056, -0.0835, Mi + 7e-4, -0.0016, -0.074],
        },
        {
          sd: ds(
            Zs(B1(t.body), r1, {
              r: 0.003,
            }),
            Zs(B1(t.base), t.baseW, {
              r: 0.0022,
            }),
          ),
          box: e(-0.0345, 0.035, t.y1 - 5e-4, Cc + 0.007, 0.013),
        },
      ],
      [-0.07, -0.12, -0.142, 0.07, 0.05, 0.068],
    )),
    (Pk.ms = performance.now() - o),
    LT
  );
}
var S2 = (o, t, e, s, n) => -yi(o, t.pos, t.quat, e, s, n).depth;
function E2(o, t, e, s, n, i = 4e-4) {
  let a = s * 4,
    r = 2 + 3 * s,
    l = [r, r + 1, r + 2];
  for (let c = 0; c < 30; c++) {
    let h = yi(o, t.pos, t.quat, e, n, l);
    if (-h.depth >= i) return -h.depth;
    let f =
        h.bone === r ? [a] : h.bone === r + 1 ? [a + 2, a] : [a + 3, a + 2, a],
      u = !1;
    for (let d of f) {
      let m = e[d];
      if (((e[d] = m - 2), S2(o, t, e, n, l) > -h.depth + 5e-5)) {
        u = !0;
        break;
      }
      e[d] = m;
    }
    if (!u) return -h.depth;
  }
  return S2(o, t, e, n, l);
}
var D00 = [
  [20, -2],
  [19, -2],
  [17, -2],
  [17, 2],
  [16, -2],
  [16, 2],
];
function V4(o, t, e, s, n = 4e-4) {
  for (let i = 0; i < 26; i++) {
    let a = S2(o, t, e, s, [14, 15, 16]);
    if (a >= n) return a;
    let r = null,
      l = a;
    for (let c of D00) {
      let h = e[c[0]];
      e[c[0]] = h + c[1];
      let f = S2(o, t, e, s, [14, 15, 16]);
      ((e[c[0]] = h), f > l + 1e-5 && ((l = f), (r = c)));
    }
    if (!r) return a;
    e[r[0]] += r[1];
  }
  return S2(o, t, e, s, [14, 15, 16]);
}
function I00(o, t, e, s, n, i = 0.001, a = 108) {
  let r = s * 4,
    l = 2 + 3 * s,
    c = (p) => S2(o, t, e, n, [p]);
  if (e[r] < 84) return;
  let h = null,
    f = 1 / 0,
    u = e[r],
    d = Math.max(12, e[r + 2] - 55),
    m = Math.max(4, e[r + 3] - 35);
  for (
    let p = u;
    p <= a && ((e[r] = p), (e[r + 2] = d), (e[r + 3] = m), !(c(l) < i));
    p += 2
  ) {
    for (; e[r + 2] < 112 && c(l + 1) > i;) e[r + 2] += 2;
    for (c(l + 1) < i && (e[r + 2] -= 2); e[r + 3] < 80 && c(l + 2) > i;)
      e[r + 3] += 2;
    c(l + 2) < i && (e[r + 3] -= 2);
    let x = c(l) + c(l + 1) + 1.5 * c(l + 2);
    x < f && ((f = x), (h = [e[r], e[r + 2], e[r + 3]]));
  }
  h && ((e[r] = h[0]), (e[r + 2] = h[1]), (e[r + 3] = h[2]));
}
function H00(o, t, e, s, n, i = {}) {
  let a = s * 4,
    r = 2 + 3 * s,
    l = i.skin ?? 8e-4,
    c = (v) => S2(o, t, e, n, [v]),
    h = i.m ? i.m[0] : e[a] - 24,
    f = i.m ? i.m[1] : Math.min(100, e[a] + 6),
    u = i.p ? i.p[0] : 0,
    d = i.p ? i.p[1] : 100,
    m = i.d ?? 62,
    p = i.curl ?? 4e-5,
    x = null,
    g = 1 / 0,
    b = (v, y) => {
      ((e[a] = v), (e[a + 2] = y), (e[a + 3] = 0));
      let M = c(r);
      if (M < l) return;
      let w = c(r + 1);
      if (w < l || c(r + 2) < l) return;
      let T = 0,
        S;
      for (; (e[a + 3] = T + 4), !(T + 4 > m || c(r + 2) < l);) T += 4;
      ((e[a + 3] = T), (S = c(r + 2)));
      let E = M + w + 2 * S - p * (y + 0.6 * T);
      E < g && ((g = E), (x = [v, y, T]));
    };
  for (let v = h; v <= f + 1e-6; v += 4)
    for (let y = u; y <= d + 1e-6; y += 6) b(v, y);
  if (x) {
    let [v, y] = x;
    for (let M = v - 2; M <= v + 2; M += 2)
      for (let w = y - 4; w <= y + 4; w += 2) M >= h - 2 && w >= 0 && b(M, w);
  }
  return (x && ((e[a] = x[0]), (e[a + 2] = x[1]), (e[a + 3] = x[2])), x);
}
function F00(o, t, e, s, n, i, a = 8e-4) {
  let r = s * 4,
    l = 2 + 3 * s,
    c = [e[r], e[r + 2], e[r + 3]],
    h = () => S2(o, t, e, n, [l, l + 1, l + 2]);
  ((e[r + 2] = c[1] + i), (e[r + 3] = c[2] + i * 0.45));
  let f = null;
  for (let u = c[0] - 1.5 * i; u <= c[0] + 6; u += 1)
    if (((e[r] = u), h() >= a)) f = u;
    else if (f !== null) break;
  return f === null
    ? ((e[r] = c[0]), (e[r + 2] = c[1]), (e[r + 3] = c[2]), !1)
    : ((e[r] = f), !0);
}
var lN = {
  16: [0, 60],
  17: [0, 58],
  18: [-115, -40],
  19: [0, 60],
  20: [0, 70],
};
var cN = {
  16: [0, 60],
  17: [0, 58],
  18: [-115, -40],
  19: [0, 65],
  20: [0, 80],
};
var Ak = {
  16: [-25, 60],
  17: [-25, 50],
  18: [-115, 20],
  19: [0, 50],
  20: [-5, 45],
};
var O00 = {
  16: [-25, 60],
  17: [-10, 60],
  18: [-115, 20],
  19: [0, 60],
  20: [-5, 70],
};
var kk = new Vector3();
var DT = new Vector3();
var IT = new Vector3();
var HT = new Vector3();
var EN = new Vector3(1, 0, 0);
function hN(o, t, e, s, n, i, a) {
  (E5(o, t, e, s, 16, kk.set(0, 0.016, 0.008), DT),
    E5(o, t, e, s, 16, kk.set(0, 0, 0), IT));
  let r = DT.distanceTo(n);
  return a
    ? r + 0.03 * (1 - HT.subVectors(DT, IT).normalize().dot(i))
    : (E5(o, t, e, s, 16, kk.set(0, 0.016, 0), HT),
      r +
        0.03 * (1 - IT.subVectors(HT, IT).normalize().dot(i)) +
        0.012 * (1 - DT.sub(HT).normalize().dot(EN)));
}
function N00(o, t, e, s, n, i, a, r) {
  let l = new Float32Array(s),
    c = [],
    h = o > 0 ? [12, 12, 19] : [14, 15, 27],
    f = (p, x) => {
      let g = [];
      for (let b = a[p][0]; b <= a[p][1] + 1e-6; b += x) g.push(b);
      return g;
    };
  for (let p of f(16, h[0]))
    for (let x of f(17, h[1]))
      for (let g of f(18, h[2]))
        for (let b of f(19, 25))
          for (let v of f(20, 25))
            ((l[16] = p),
              (l[17] = x),
              (l[18] = g),
              (l[19] = b),
              (l[20] = v),
              c.push([hN(o, t, e, l, n, r, !0), p, x, g, b, v]));
  c.sort((p, x) => p[0] - x[0]);
  let u = null,
    d = 1 / 0,
    m = [];
  for (let p of c) {
    if (m.length >= 3) break;
    if (
      m.some(
        (b) =>
          Math.abs(b[1] - p[1]) +
            Math.abs(b[2] - p[2]) +
            Math.abs(b[3] - p[3]) <
          25,
      )
    )
      continue;
    m.push(p);
    for (let b = 0; b < 5; b++) l[16 + b] = p[1 + b];
    Mn(o, t, e, l, 4, n, i, {
      normal: EN,
      lim: a,
    });
    let x = Math.max(0, yi(o, t, e, l, i, [14, 15, 16]).depth + 4e-4),
      g = hN(o, t, e, l, n, r) + 40 * x;
    if ((g < d && ((d = g), (u = new Float32Array(l))), g < 0.0065)) break;
  }
  return (s.set(u), d);
}
function Dp(o, t, e, s, n, i, a) {
  (N00(o, t.pos, t.quat, e, s, n, i, a),
    V4(o, t, e, n),
    e.set(
      yo(o, t.pos, t.quat, e, n, {
        fingers: [],
        thumb: [
          [19, e[19] + 26],
          [20, e[20] + 30],
        ],
      }),
    ),
    V4(o, t, e, n, 3e-4));
}
var fN = new Map();
var O5 = 0.003;
function B00(o) {
  if (o._env) return o._env;
  let t = o.proxies,
    e = Pk(),
    s = [t.under, o.magKind === "ext" ? t.mag : null].filter(Boolean),
    n = globalThis.GH_TUNE || {},
    i =
      s.length === 0
        ? e
        : s.length === 1
          ? (a, r, l) => Math.min(e(a, r, l), s[0](a, r, l))
          : (a, r, l) => Math.min(e(a, r, l), s[0](a, r, l), s[1](a, r, l));
  return (o._env = {
    tn: (a, r) => n[a] ?? r,
    sdGun: i,
    sdGT: (a, r, l) => Math.min(i(a, r, l), t.trigger(a, r, l)),
    coreKey: o.underKind + "|" + o.magKind,
    exact: ds(t.body, t.mag),
    exactT: ds(t.body, t.mag, t.trigger),
  });
}
function Ny(o, t, e, s) {
  let n = t + "|" + e,
    i = !globalThis.GH_TUNE && fN.get(n);
  if (!i) {
    let a = performance.now();
    i = s();
    for (let r in i.G) {
      let l = i.G[r],
        c = l.side === "R" ? 1 : -1;
      ((l.name = r),
        (l.pen = yi(c, l.pos, l.quat, l.pose, l.sd)),
        (l.gaps = Tc(c, l.pos, l.quat, l.pose, l.sd)));
    }
    ((i.ms = performance.now() - a),
      fN.set(n, i),
      (o.bakeTimes[t] = Math.round(i.ms)));
  }
  for (let a in i.G) {
    let r = i.G[a];
    o.grips[a] = {
      ...r,
      pos: r.pos.clone(),
      quat: r.quat.clone(),
      pose: new Float32Array(r.pose),
    };
  }
  return i;
}
var T2 = (o, t, e, s, n, i = {}) => ({
  side: o,
  pos: t.pos.clone(),
  quat: t.quat.clone(),
  pose: new Float32Array(e),
  sd: s,
  sdx: n,
  ...i,
});
var B4 = (o, t) => (e, s, n) => Math.min(o(e, s, n), t(e, s, n));
function U00(o) {
  let t = B00(o),
    e = o.proxies,
    s = t.tn,
    n = t.sdGT,
    i = Ny(o, "core", t.coreKey, () => {
      let f = {},
        u = performance.now(),
        d = Ze(s("fth", 11)),
        m = Ze(s("fpsi", 16)),
        p = Bt(0, -Math.sin(d), -Math.cos(d)),
        x = Bt(-1, 0, 0),
        g = p
          .clone()
          .multiplyScalar(Math.cos(m))
          .addScaledVector(x, -Math.sin(m)),
        b = x
          .clone()
          .multiplyScalar(Math.cos(m))
          .addScaledVector(p, Math.sin(m)),
        v = Yo(
          1,
          Gt(0.015, s("fy", -0.0435), s("fu", 0.036)),
          g,
          b,
          [0.0065, 0.086, 0.0125],
          s("froll", -3),
        ),
        y = gs(
          {
            i: [-6, 13, 4, 2],
            m: [-8, s("fms", -12), 4, 2],
            r: [-8, s("frs", -5), 4, 2],
            l: [-8, s("fls", -3), 4, 2],
            t: [32, 38, -90, 10, 5],
            cup: s("fcup", 2),
          },
          pn.pre,
        );
      zi(1, v.pos, v.quat, y, n, b, {
        max: 0.03,
      });
      let M = yo(1, v.pos, v.quat, y, n, {
        fingers: [1, 2, 3],
      });
      for (let Y0 of [1, 2, 3])
        (I00(1, v, M, Y0, n, 0.001, s("fwrap", 108)), E2(1, v, M, Y0, n));
      (Dp(
        1,
        v,
        M,
        Gt(-(Mi + 0.001), s("ty", -0.007), s("tu", 0.04)),
        n,
        lN,
        Bt(0, 0.05, -1).normalize(),
      ),
        (M[0] = 10),
        (M[1] = 10),
        (M[2] = 6),
        (M[3] = 3),
        Mn(
          1,
          v.pos,
          v.quat,
          M,
          0,
          Gt(Mi + 5e-4, s("iy", -0.004), s("iu", 0.115)),
          n,
          {
            lim: {
              0: [-10, 30],
              1: [-12, 24],
              2: [0, s("ipx", 12)],
            },
          },
        ),
        E2(1, v, M, 0, n, 3e-4));
      let w = new Float32Array(M);
      Dp(
        1,
        v,
        w,
        Gt(-(N1 + 0.001), s("t2y", 0.013), s("t2u", 0.04)),
        n,
        lN,
        Bt(0, 0.15, -1).normalize(),
      );
      let T = {
          free: [0, 1, 2, 3],
          lim: {
            0: [s("im0", -15), s("im1", 16)],
            1: [-12, s("is1", 22)],
            2: [s("ip0", 70), 112],
            3: [-5, s("idip", 24)],
          },
          normal: Bt(0, 0, 1),
          normalW: s("inw", 0.006),
        },
        S = new Float32Array(w),
        E = (Y0, et, ct) => (
          (Y0[0] = 8),
          (Y0[1] = 8),
          (Y0[2] = 102),
          (Y0[3] = 4),
          Mn(
            1,
            v.pos,
            v.quat,
            Y0,
            0,
            Gt(s("tgx", 0), s("tgy", -0.02), U1 + et),
            ct,
            T,
          )
        );
      E(S, s("tpr", -0.0018), t.sdGun);
      let _ = performance.now() - u,
        R = qu(1, v.pos, v.quat, w, null, O5),
        C = qu(1, v.pos, v.quat, S, null, O5, [2, 3, 4]),
        L = Ze(s("sph", 20)),
        A = Ze(s("sa", 8)),
        O = Math.cos(L),
        H = Math.sin(L),
        F = Bt(Math.cos(A), 0, -Math.sin(A)),
        P = Bt(-O * Math.sin(A), -H, -O * Math.cos(A)),
        z = gs(
          {
            t: [s("st0", -25), s("st1", -20), s("st2", -30), 10, 10],
            cup: s("scup", 16),
          },
          pn.pre,
        ),
        k = s("sfat", 6e-4),
        I = (Y0, et, ct) =>
          Math.min(n(Y0, et, ct), R(Y0, et, ct) - k, C(Y0, et, ct) - k),
        G = s("sthf", 0.0015),
        K = (Y0, et, ct) => Math.min(n(Y0, et, ct), R(Y0, et, ct) - G),
        $ = [performance.now()],
        n0 = () => $.push(performance.now()),
        e0 = Yo(
          -1,
          Gt(s("sx", -0.04), s("sy", -0.062), s("su", 0.03)),
          P,
          F,
          [0.004, 0.06, 0.0125],
          s("sroll", -6),
        );
      zi(
        -1,
        e0.pos,
        e0.quat,
        z,
        (Y0, et, ct) =>
          Math.min(n(Y0, et, ct), R(Y0, et, ct) - s("sseat", 0.001)),
        F,
        {
          max: 0.03,
          bones: [0, 1, 2, 5, 8, 11, 14],
        },
      );
      {
        let Y0 = qu(-1, e0.pos, e0.quat, z, null, O5, [0, 1, 14]),
          et = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
          ct = (P0) =>
            yi(
              1,
              v.pos,
              v.quat,
              w,
              (st, J0, q0) => Y0(st + F.x * P0, J0, q0 + F.z * P0),
              et,
            ).depth,
          D0 = 0,
          u0 = 0,
          w0 = s("spal", 0.0045);
        for (; D0 < 0.03 && ct(D0) > w0;) ((u0 = D0), (D0 += 0.002));
        if (D0 > 0)
          for (let P0 = 0; P0 < 4; P0++) {
            let st = (u0 + D0) / 2;
            ct(st) > w0 ? (u0 = st) : (D0 = st);
          }
        ((D0 += s("spre", 0)),
          e0.pos.addScaledVector(F, -D0),
          (o.bakeTimes.seatOut = +(D0 * 1e3).toFixed(1)));
      }
      let p0,
        t0,
        M0 = 0,
        f0 = [];
      n0();
      let _0 = null;
      for (let Y0 = 0; Y0 < 4; Y0++) {
        p0 = yo(-1, e0.pos, e0.quat, z, I, {
          fingers: [0, 1, 2, 3],
        });
        for (let D0 of [0, 1, 2, 3]) E2(-1, e0, p0, D0, I);
        if (s("swrap", 1))
          for (let D0 of [0, 1, 2, 3]) {
            let u0 = p0.slice(D0 * 4, D0 * 4 + 4);
            H00(-1, e0, p0, D0, I, {
              curl: s("swc", 15e-6),
            })
              ? E2(-1, e0, p0, D0, I, 3e-4)
              : p0.set(u0, D0 * 4);
          }
        (_0
          ? (p0.set(_0, 16),
            (p0[19] = Math.max(0, _0[3] - 10)),
            (p0[20] = Math.max(-5, _0[4] - 10)),
            p0.set(
              yo(-1, e0.pos, e0.quat, p0, K, {
                fingers: [],
                thumb: [
                  [19, p0[19] + 36],
                  [20, p0[20] + 40],
                ],
              }),
            ),
            V4(-1, e0, p0, K, 3e-4))
          : (Dp(
              -1,
              e0,
              p0,
              Gt(-(Mi + 0.001), s("sty", -0.008), s("stu", 0.09)),
              K,
              Ak,
              Bt(0.25, 0.1, -1).normalize(),
            ),
            (_0 = p0.slice(16, 21))),
          (t0 = qu(-1, e0.pos, e0.quat, p0, null, O5)));
        let et = qu(-1, e0.pos, e0.quat, p0, [0, 1, 14], O5),
          ct = yi(
            1,
            v.pos,
            v.quat,
            w,
            et,
            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16],
          );
        if (
          ((M0 = ct.depth),
          n0(),
          f0.push(+(M0 * 1e3).toFixed(2), ct.bone),
          M0 <= s("srin", 7e-4) || Y0 === 3)
        )
          break;
        e0.pos.addScaledVector(F, -(M0 > 0.0028 ? M0 + 0.0015 : M0 - 2e-4));
      }
      let F0 = B4(n, t0),
        m0 = B4(t.sdGun, t0),
        S0 = B4(t.exactT, t0),
        T0 = B4(t.exact, t0);
      V4(1, v, w, F0, 3e-4);
      let j0 = new Float32Array(w),
        Z0 = E(j0, s("trs", 0.001), F0);
      E2(1, v, j0, 0, F0, 2e-4);
      let lt = new Float32Array(j0),
        H0 = E(lt, s("tpr", -0.0018), m0);
      return (
        E2(1, v, lt, 0, m0, 2e-4),
        (o.bakeTimes.trigMiss = [
          +(Z0 * 1e3).toFixed(2),
          +(H0 * 1e3).toFixed(2),
        ]),
        (f.support = T2("L", e0, p0, I, B4(t.exactT, R))),
        (f.fire = T2("R", v, w, F0, S0)),
        (f.trigger = T2("R", v, j0, F0, S0)),
        (f.press = T2("R", v, lt, m0, T0)),
        (f.solo = T2("R", v, M, n, t.exactT)),
        n0(),
        {
          G: f,
          frR: v,
          frL: e0,
          solo: M,
          sdR: R,
          sdL: t0,
          rl: f0,
          T: [Math.round(_), ...$.map((Y0) => Math.round(Y0 - u))],
          h2h: {
            LinR: yi(-1, e0.pos, e0.quat, p0, R).depth,
            RinL: yi(1, v.pos, v.quat, w, t0).depth,
          },
        }
      );
    });
  ((o.handSd = {
    R: i.sdR,
    L: i.sdL,
  }),
    (o.h2h = i.h2h),
    (o._core = i),
    (o.bakeTimes.coreT = i.T));
  let a = Bt(0, Math.cos(Math.atan(N5)), -Math.sin(Math.atan(N5))),
    r = Bt(0, -Math.sin(Math.atan(N5)), -Math.cos(Math.atan(N5))),
    l = o.magP,
    c = {
      ctrl: () =>
        Ny(o, "ctrl", t.coreKey, () => {
          let f = new Float32Array(i.solo);
          Dp(
            1,
            i.frR,
            f,
            Gt(-0.0166, -0.0235, 0.024),
            n,
            cN,
            Bt(0, -0.5, -0.87).normalize(),
          );
          let u = new Float32Array(i.solo);
          return (
            Dp(
              1,
              i.frR,
              u,
              Gt(-(Mi + 0.0023), 0.0042, 0.038),
              n,
              cN,
              Bt(0, 0.08, -1).normalize(),
            ),
            {
              G: {
                magRel: T2("R", i.frR, f, n, t.exactT),
                stop: T2("R", i.frR, u, n, t.exactT),
              },
            }
          );
        }),
      mag: () =>
        Ny(o, "mag", t.coreKey, () => {
          let f = Ze(s("mg", 78)),
            u = Bt(Math.cos(f), 0, 0).addScaledVector(r, Math.sin(f)),
            d = l.y1,
            m = Yo(
              -1,
              Gt(s("mx", 0.001), d, (wo(d) + ai(d)) / 2 + s("mu", 0.002)),
              u,
              a,
              [0.004, s("ml", 0.066), 0.0125],
            ),
            p = gs({
              i: [55, 0, 6, 3],
              m: [55, 0, 6, 3],
              r: [55, 0, 6, 3],
              l: [55, -2, 6, 3],
              t: [-18, 34, 0, 0, 0],
              cup: 6,
            });
          zi(-1, m.pos, m.quat, p, e.mag, a, {
            max: 0.02,
            bones: [0, 1],
          });
          let x = yo(-1, m.pos, m.quat, p, e.mag, {
            fingers: [0, 1, 2, 3],
            curl: 8,
            dip: 0.5,
          });
          for (let S of [0, 1, 2, 3]) E2(-1, m, x, S, e.mag);
          ([s("mt0", 5), s("mt1", 20), s("mt2", 30), s("mt3", 40)].forEach(
            (S, E) => {
              S > 0 &&
                F00(-1, m, x, E, e.mag, S) &&
                E2(-1, m, x, E, e.mag, 3e-4);
            },
          ),
            Dp(
              -1,
              m,
              x,
              Gt(
                -(r1 / 2 + 0.001),
                d + s("mty", 0.046),
                wo(d + 0.046) - s("mtu", 0.015),
              ),
              e.mag,
              Ak,
              a,
            ));
          let g = Ze(s("hb", 32)),
            b = r
              .clone()
              .multiplyScalar(Math.cos(g))
              .add(Bt(Math.sin(g), 0, 0)),
            v = Yo(
              -1,
              Gt(0, d, (wo(d) + ai(d)) / 2 + 0.004),
              b,
              a,
              [-0.003, 0.03, 0.021],
            ),
            y = gs({
              i: [8, 4, 12, 7],
              m: [10, 0, 14, 8],
              r: [12, -2, 16, 9],
              l: [14, -5, 18, 10],
              t: [2, 24, -24, 10, 14],
              cup: 8,
            });
          zi(-1, v.pos, v.quat, y, e.mag, a, {
            max: 0.02,
            bones: [0, 1],
          });
          for (
            let S = 0;
            S < 40 && S2(-1, v, y, e.mag, [0, 1, 14]) > 0.0022;
            S++
          )
            v.pos.addScaledVector(a, 25e-5);
          let M = qu(1, i.frR.pos, i.frR.quat, i.solo, null, O5),
            w = (S, E, _) => Math.min(n(S, E, _), M(S, E, _) - 8e-4),
            T = yo(-1, v.pos, v.quat, y, w, {
              fingers: [0, 1, 2, 3],
              max: {
                mcp: s("hm", 58),
                pip: s("hp", 64),
                dip: 40,
              },
              curl: 46,
              dip: 0.55,
            });
          for (let S of [0, 1, 2, 3]) {
            E2(-1, v, T, S, w, 6e-4);
            let E = S * 4,
              _ = s("he", 1) * (1 + 0.25 * S);
            ((T[E] -= 5 * _), (T[E + 2] -= 7 * _), (T[E + 3] -= 4 * _));
          }
          return (
            Dp(
              -1,
              v,
              T,
              Gt(-(pN(-0.084) + 0.001), s("hty", -0.084), s("htu", 0.002)),
              w,
              Ak,
              a,
            ),
            V4(-1, v, T, w, 8e-4),
            {
              G: {
                mag: T2("L", m, x, e.mag, e.mag, {
                  part: "mag",
                }),
                heel: T2("L", v, T, w, B4(t.exactT, M), {
                  part: "mag",
                }),
              },
            }
          );
        }),
      rack: () =>
        Ny(o, "rack", t.coreKey + "|" + o.dims.sightH.toFixed(4), () => {
          let f = Ze(s("ka", 8)),
            u = Bt(Math.cos(f), -Math.sin(f), 0),
            d = Bt(Math.sin(f), Math.cos(f), 0),
            m = s("ku", 0.094),
            p = (M, w, T) => Math.min(t.sdGun(M, w, T), e.sights(M, w, T)),
            x = Yo(
              -1,
              Gt(-N1, Jn - s("kd", 0.015), m),
              d,
              u,
              [0.004, s("kl", 0.07), 0.0125],
              s("kroll", 0),
            ),
            g = gs(
              {
                t: [-18, 34, 0, 0, 0],
              },
              pn.pre,
            );
          zi(-1, x.pos, x.quat, g, p, u, {
            max: 0.03,
          });
          let b = yo(-1, x.pos, x.quat, g, p, {
              fingers: [0, 1, 2, 3],
            }),
            v = qu(1, i.frR.pos, i.frR.quat, i.solo, null, O5),
            y = (M, w, T) =>
              Math.min(
                p(M, w, T),
                v(M, w, T) - 8e-4,
                v(M, w, T + 0.0125) - 8e-4,
              );
          for (let M of [0, 1, 2]) {
            E2(-1, x, b, M, y);
            for (
              let w = 0;
              w < 16 &&
              S2(-1, x, b, y, [2 + 3 * M, 3 + 3 * M, 4 + 3 * M]) < 4e-4;
              w++
            )
              ((b[M * 4] -= 2), (b[M * 4 + 2] -= 1));
          }
          ((b[12] = b[8] - 10),
            (b[13] = -3),
            (b[14] = b[10] - 8),
            (b[15] = b[11]));
          for (let M = 0; M < 16 && S2(-1, x, b, p, [11, 12, 13]) < 5e-4; M++)
            ((b[12] -= 3), (b[14] -= 1));
          return (
            Dp(
              -1,
              x,
              b,
              Gt(-(N1 + 0.001), s("kty", 0.015), m - s("ktu", 0.066)),
              p,
              O00,
              Bt(0, -0.2, 1).normalize(),
            ),
            {
              G: {
                rack: T2("L", x, b, p, ds(e.slide, e.static), {
                  part: "slide",
                }),
              },
            }
          );
        }),
    };
  c.frag = () =>
    Ny(o, "frag", "std", () => {
      let f = bN,
        u = ds(
          b2([f.x, f.y - 0.004, f.z], [f.x, f.y + 0.004, f.z], 0.0312),
          b2([f.x, f.y + 0.036, f.z], [f.x, f.y + 0.05, f.z], 0.0112),
          Zn([f.x, f.y + 0.02, f.z + 0.0315], [0.0068, 0.036, 0.0022], 0.001),
        ),
        d = Bt(0, 1, 0),
        m = Yo(
          -1,
          Bt(f.x + 0.002, f.y - 0.036, f.z - 0.004),
          Bt(s("qfx", -0.18), s("qfy", 0.1), -1).normalize(),
          d,
          [0.004, s("ql", 0.062), 0.0125],
        ),
        p = gs({
          i: [10, 6, 8, 4],
          m: [10, 0, 8, 4],
          r: [10, -4, 8, 4],
          l: [10, -8, 8, 4],
          t: [-10, 40, -30, 0, 0],
          cup: 12,
        });
      zi(-1, m.pos, m.quat, p, u, d, {
        max: 0.03,
        bones: [0, 1],
      });
      let x = yo(-1, m.pos, m.quat, p, u, {
        fingers: [0, 1, 2, 3],
        thumb: [
          [16, 46],
          [19, 50],
          [20, 60],
        ],
        curl: 60,
      });
      for (let g of [0, 1, 2, 3]) E2(-1, m, x, g, u);
      return (
        V4(-1, m, x, u, 3e-4),
        {
          G: {
            frag: T2("L", m, x, u, u, {
              part: "frag",
            }),
          },
        }
      );
    });
  let h = {};
  ((o.need = (...f) => {
    for (let u of f) h[u] || ((h[u] = !0), c[u]());
    return o.grips;
  }),
    (o.bakeAll = () => o.need("ctrl", "mag", "rack", "frag")),
    (o.measureExact = () => {
      for (let f in o.grips) {
        let u = o.grips[f],
          d = u.side === "R" ? 1 : -1;
        ((u.pen = yi(d, u.pos, u.quat, u.pose, u.sdx)),
          (u.gaps = Tc(d, u.pos, u.quat, u.pose, u.sdx)));
      }
      o.h2h = {
        LinR: yi(
          -1,
          o.grips.support.pos,
          o.grips.support.quat,
          o.grips.support.pose,
          qu(1, o.grips.fire.pos, o.grips.fire.quat, o.grips.fire.pose),
        ).depth,
        RinL: yi(
          1,
          o.grips.fire.pos,
          o.grips.fire.quat,
          o.grips.fire.pose,
          qu(
            -1,
            o.grips.support.pos,
            o.grips.support.quat,
            o.grips.support.pose,
          ),
        ).depth,
      };
    }));
}
var V1 = Vector3;
var Ku = Quaternion;
var Yl = (o, t, e) => new V1(o, t, e);
var zk = (o, t, e) => new Ku().setFromEuler(new Euler(o, t, e));
var Fs = new Float64Array(6);
var Lk = new V1(1, 0, 0);
var Op = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var Dk = (o, t, e) => {
  let s = Op((e - o) / (t - o));
  return s * s * (3 - 2 * s);
};
var B5 = (o) => (o <= 0 || o >= 1 ? 0 : Math.pow(Math.sin(Math.PI * o), 2));
function TN(o) {
  let t = o.arms,
    e = o.grips,
    s = o.parts,
    n = new Mf(o),
    i = o.dim;
  (t.setRest("R", e.fire.pos, e.fire.quat, e.fire.pose),
    t.setRest("L", e.pump.pos, e.pump.quat, e.pump.pose),
    (t.trigPose = e.trigger.pose),
    (t.pressPose = e.press.pose),
    o.anchors.gripR.position.copy(e.fire.pos),
    o.anchors.gripR.quaternion.copy(e.fire.quat),
    o.anchors.gripL.position.copy(e.pump.pos),
    o.anchors.gripL.quaternion.copy(e.pump.quat));
  let a = globalThis.GH_TUNE || {},
    r = (rt, dt) => a[rt] ?? dt;
  ((o.adsK = 0), (o.rounds = null), (o.shellIx = 0));
  let l = () => 1 - 0.62 * o.adsK,
    c = (rt, dt, tt) => xp(new Float32Array(Ui), rt, dt, tt),
    h = (rt, dt) => {
      let tt = new Float32Array(rt);
      for (let X0 = 0; X0 < 5; X0++) {
        let ut = Qa(rt, dt[X0]),
          z0 = u4[X0];
        for (let I0 = z0[0]; I0 < z0[1]; I0++) tt[I0] = ut[I0];
      }
      return ((tt[21] = Qa(rt, (dt[2] + dt[3]) / 2)[21]), tt);
    },
    f = Qa(e.pump.pose, 1.2),
    u = Qa(e.fire.pose, 0.8),
    d = h(e.pump.pose, [0.35, 0.5, 0.65, 0.8, 0.6]),
    m = h(e.pump.pose, [0.95, 0.8, 0.65, 0.5, 0.9]),
    p = h(e.pump.pose, [
      r("pp0", 0.62),
      r("pp1", 0.52),
      r("pp2", 0.44),
      r("pp3", 0.38),
      0.7,
    ]),
    x = pn.loose,
    g = pn.reach,
    b = gs({
      i: [4, -2, 6, 3],
      m: [3, 0, 6, 3],
      r: [5, 1, 8, 4],
      l: [8, 3, 11, 6],
      t: [22, 4, -10, 14, 16],
      cup: 2,
    }),
    v = {
      t: 0,
      ...n.grip("pump"),
    },
    y = new Xs([v]),
    M = (rt, dt) => {
      for (let tt of [6, 10, 14])
        ((rt[tt] += 0.9 * dt), (rt[tt + 1] += 0.55 * dt));
      rt[19] += 0.6 * dt;
    },
    w = (rt) => {
      let dt = t.clip.R.pose,
        tt = e.fire.pose,
        X0 = e.fireHigh.pose;
      for (let ut = 0; ut < 4; ut++) dt[ut] += (X0[ut] - tt[ut]) * rt;
    },
    T = (rt, dt) => {
      for (let tt of [2, 6, 10, 14])
        ((rt[tt] += 0.9 * dt), (rt[tt + 1] += 0.5 * dt));
    },
    S = (rt) =>
      rt <= 0 ? 0 : -0.007 * (rt / 0.028) * Math.exp(1 - rt / 0.028),
    E = new Ku().setFromEuler(o.hip.rot).invert(),
    _ = (rt, dt, tt) => Yl(rt, dt, tt).sub(o.hip.pos).applyQuaternion(E),
    R = (rt, dt) => {
      let tt = Yl(rt[0], rt[1], rt[2]).normalize(),
        X0 = Yl(dt[0], dt[1], dt[2]);
      return (
        X0.addScaledVector(tt, -X0.dot(tt)).normalize(),
        E.clone().multiply(
          new Ku().setFromRotationMatrix(
            new Matrix4().makeBasis(new V1().crossVectors(tt, X0), tt, X0),
          ),
        )
      );
    },
    C = (rt, dt, tt, X0, ut = {}) => ({
      t: rt,
      p: _(dt[0], dt[1], dt[2]),
      q: R(tt, X0),
      f: "view",
      ...ut,
    }),
    L = (rt, dt, tt) => ({
      p: rt.pos.clone().sub(tt).applyQuaternion(dt.q).add(dt.p),
      q: dt.q.clone().multiply(rt.quat),
    }),
    A = (rt, dt, tt) => {
      let X0 = dt.q.clone().multiply(rt.quat.clone().invert());
      return {
        p: dt.p.clone().sub(rt.pos.clone().sub(tt).applyQuaternion(X0)),
        q: X0,
      };
    },
    O = i.STROKE,
    H = i.UNLOCK,
    F = i.BORE - i.TUBEY,
    P = 0.2035 + i.SHELL.len / 2 - i.SHELL_REST[2],
    z = 0.27,
    k = (rt) => {
      let dt = Math.max(0, rt - H);
      return (n.part("pump", 0, 0, rt), n.part("bolt", 0, 0, dt), dt);
    },
    I = (rt, dt = 0) => {
      let tt = s.hull;
      (n.part(
        "hull",
        0.02 * dt,
        F + 0.006 * dt,
        -P + rt,
        0.3 * dt,
        -1.05 * dt,
        0.4 * dt,
      ),
        (tt.visible = rt > 6e-4));
    },
    G = o.anchors.eject.clone(),
    K = o.anchors.ejectDir.clone(),
    $ = (rt, dt = {}) => {
      let { tW: tt, tB1: X0, tF0: ut, tF1: z0 } = rt,
        I0 = X0 - 0.006,
        vt = 0.185,
        wt = jt([
          [X0 - 0.036, 1],
          [X0 + 0.002, 0, "out"],
        ]),
        _t = jt([
          [0, 0],
          [tt, 0.03, "out"],
          [X0, 1, "in"],
          [X0 + 0.028, 0.95, "out"],
          [ut, 0.97],
          [z0, 0, "in"],
        ]),
        Pt = jt([
          [X0 - 0.014, 0],
          [X0 + 0.04, 1, "out"],
          [ut + 0.024, 1],
          [ut + 0.064, 0, "io"],
        ]),
        bt = jt([
          [X0 - 0.014, 0],
          [X0 + 0.04, 1, "out"],
        ]),
        Et = Yl(r("ejx", 2.5), r("ejy", 1.15), r("ejz", 0.55)),
        zt = Yl(0.35, 0.8, -0.5).normalize(),
        J = new V1(),
        Q = new V1(),
        i0 = new Ku(),
        A0 = new Euler(),
        N0 = new Gs(e.pump.pose, [
          {
            t: z0 + 0.06,
            pose: c(e.pump.pose, d, 0.32),
            dur: 0.05,
            stagger: 0.012,
            from: "little",
          },
          {
            t: z0 + 0.105,
            pose: e.pump.pose,
            dur: 0.06,
            stagger: 0.012,
            from: "little",
            ease: "out",
          },
        ]),
        mt = (xt) => be(xt, 0, 0.03, z0 + 0.02, z0 + 0.1);
      return {
        tEj: I0,
        tFly: vt,
        p: _t,
        sq: mt,
        Lp: N0,
        apply(xt, yt, Mt, St) {
          let Rt = _t(xt),
            Ot = k(Rt * O),
            Jt = Pt(xt);
          if (
            (n.part(
              "lifter",
              0,
              0,
              0,
              z * Jt +
                0.03 * vi(xt, ut + 0.064, 1, 70, 22) * Op((St - xt) / 0.08),
              0,
              0,
            ),
            o.anchors.eject.copy(G),
            o.anchors.ejectDir.copy(K),
            Mt)
          ) {
            if (xt < I0) I(Ot, Op((Ot - 0.05) / 0.024));
            else if (xt < I0 + vt + 0.03) {
              let ee = Math.max(0, _t(I0) * O - H),
                Nt = Op((ee - 0.05) / 0.024),
                ge = s.hull.userData.rest,
                Le = xt - I0;
              (Q.set(ge.x + 0.02 * Nt, ge.y + F + 0.006 * Nt, ge.z - P + ee),
                i0.setFromEuler(A0.set(0.3 * Nt, -1.05 * Nt, 0.4 * Nt)),
                J.copy(Et).multiplyScalar(Le),
                (J.y -= 4.9 * Le * Le));
              let xn = s.hull;
              (xn.position.copy(Q).add(J.applyQuaternion(n.cqi)),
                xn.quaternion.setFromAxisAngle(zt, -26 * Le).multiply(i0),
                (xn.visible = !0),
                o.anchors.eject.copy(xn.position),
                o.anchors.ejectDir
                  .set(Et.x, Et.y - 9.8 * Le, Et.z)
                  .applyQuaternion(n.cqi)
                  .normalize());
            }
          }
          if (yt && xt > X0 - 0.036 && Ot > 0.004) {
            let ee = Math.max(i.SHELL_REST[2] - i.SHELL.len / 2, 0.2035 - Ot),
              Nt = Math.max(
                0.064 * wt(xt),
                ee + i.SHELL.len / 2 - i.SHELL_REST[2],
              );
            (n.part(
              "liftShell",
              0,
              (F - 0.0015) * bt(xt),
              -Nt,
              0.16 * Jt * Op(Rt * 3),
              0,
              0,
            ),
              (s.liftShell.visible = !0));
          }
          return Rt;
        },
        hand(xt) {
          (n.hand("L", y, xt),
            n.pose("L", N0, xt),
            (t.clip.L.pos.z +=
              0.0035 * vi(xt, X0, 1, 60, 26) - 0.004 * vi(xt, z0, 1, 55, 22)));
          let yt = mt(xt);
          (T(t.clip.L.pose, 1.3 * yt), M(t.clip.R.pose, yt));
        },
      };
    },
    n0 = {
      need: !1,
      end: !1,
    },
    e0 = {
      t: 0,
      seen: !1,
      prev: -1,
      idle: 0,
    },
    p0 = (() => {
      let dt = Do(0.16, {
          n: 6,
          k: [520, 520, 420, 480, 420, 380],
          c: [30, 30, 26, 27, 24, 22],
          fade: 0.06,
          impulses: [
            {
              t: 0,
              v: [0.06, 0.2, 0.5, 1.25, 0.3, -0.55],
            },
            {
              t: 0.05,
              v: [0, -0.05, -0.08, -0.25, -0.1, 0.2],
            },
          ],
        }),
        tt = jt([
          [0, 0],
          [0.012, 1, "out"],
          [0.06, 1],
          [0.11, 0],
        ]);
      return n.clip(0.16, [], (X0, ut) => {
        let z0 = tt(X0),
          I0 = 0.14 + 0.86 * (o.kickK ?? 1),
          vt = l() * I0,
          wt = be(X0, 0, 0.012, 0.05, 0.16);
        (dt(X0, Fs),
          n.gunAt(
            ut,
            Fs[0] * vt,
            Fs[1] * vt,
            Fs[2] * I0,
            Fs[3] * vt,
            Fs[4] * vt,
            Fs[5] * vt,
          ),
          n.part("trigger", 0, 0, 0, -0.24 * z0),
          n.part("pump", 0, 0, 0.0012 * vi(X0, 0, 1, 90, 28) * (1 - X0 / 0.16)),
          n.part(
            "lifter",
            0,
            0,
            0,
            0.035 * vi(X0, 0.004, 1, 75, 20) * (1 - X0 / 0.16),
            0,
            0,
          ),
          (t.clip.trig = 1),
          (t.clip.press = z0),
          n.hand("L", y, X0),
          (t.clip.L.pos.z += S(X0) * (1 - Op((X0 - 0.1) / 0.06))),
          M(t.clip.R.pose, wt),
          T(t.clip.L.pose, wt));
      });
    })(),
    t0 = (() => {
      let dt = {
          tW: 0.034,
          tB1: 0.108,
          tF0: 0.202,
          tF1: 0.268,
        },
        tt = $(dt),
        X0 = (vt) =>
          Do(0.5, {
            n: 6,
            k: [340, 340, 380, 370, 330, 300],
            c: [17, 17, 18, 17, 15, 14],
            impulses: [
              {
                t: 0.004,
                v: [0, -0.02, -0.07, -0.18, 0.06, 0.22],
              },
              {
                t: dt.tB1,
                v: [0.03, 0.06, 0.44, 0.86, -0.28, -0.62],
              },
              {
                t: dt.tF1,
                v: [
                  -0.03 * vt,
                  -0.08 * vt,
                  -0.5 * vt,
                  -1 * vt,
                  0.24 * vt,
                  0.72 * vt,
                ],
              },
              {
                t: dt.tF1 + 0.072,
                v: [0, 0.02, 0.08, 0.22, 0, -0.12],
              },
            ],
          }),
        ut = X0(1),
        z0 = X0(0.8);
      return n.clip(
        0.5,
        [
          ye(dt.tW, "pump_back"),
          {
            t: tt.tEj + tt.tFly,
            type: "eject",
          },
          ye(dt.tF0, "pump_fwd"),
        ],
        (vt, wt) => {
          let _t = o.rounds === 0,
            Pt = tt.p(vt),
            bt = l();
          ((n0.need = _t), (_t ? z0 : ut)(vt, Fs));
          let Et = _t
            ? be(
                vt,
                dt.tB1 - 0.03,
                dt.tB1 + 0.05,
                dt.tF0 - 0.012,
                dt.tF0 + 0.07,
              )
            : 0;
          (n.gunAt(
            wt,
            (Fs[0] - 0.01 * Et) * bt,
            (-0.004 * Pt + Fs[1] + 0.008 * Et) * bt,
            0.018 * Pt + Fs[2] + 0.012 * Et * bt,
            (0.03 * Pt + Fs[3] + 0.03 * Et) * bt,
            (0.022 * Pt + Fs[4] + 0.07 * Et) * bt,
            (-0.078 * Pt - 0.2 * Et + Fs[5]) * bt,
          ),
            tt.apply(vt, !_t, !0, 0.5),
            tt.hand(vt));
        },
      );
    })(),
    M0 = [r("rpx", 0.03), r("rpy", 0.03), r("rpz", 0.05)],
    f0 = [r("rrx", 0.12), r("rry", 0.55), r("rrz", -1.86)],
    _0 = new Ku().setFromEuler(new Euler(f0[0], f0[1], f0[2], "XYZ")),
    F0 = Yl(M0[0], M0[1], M0[2]),
    m0 = new Ku().setFromEuler(o.hip.rot).multiply(_0).invert(),
    S0 = (rt, dt, tt) => Yl(rt, dt, tt).applyQuaternion(m0),
    T0 = (rt) => ({
      p: rt.p.clone().applyQuaternion(_0).add(F0),
      q: _0.clone().multiply(rt.q),
      f: "view",
    }),
    j0 = s.shell.userData.rest,
    Z0 = (rt, dt = [0, 0, 0]) => ({
      p: j0.clone().add(Yl(rt[0], rt[1], rt[2])),
      q: zk(dt[0], dt[1], dt[2]),
    }),
    lt = -(0.2075 + i.SHELL.len / 2 - i.SHELL_REST[2]),
    H0 = Z0(
      [r("kix", 0.012), r("kiy", -0.07), r("kiz", 0.034)],
      [r("kip", -0.1), r("kiw", 0.44), r("kir", 0.5)],
    ),
    Y0 = Z0([0, r("ksy", -0.026), r("ksz", 0.013)], [r("ksp", 0.46), 0, 0]),
    et = Z0([0, 0, r("klz", -0.004)]),
    ct = Z0([0, 0, lt]),
    D0 = T0({
      p: H0.p
        .clone()
        .add(S0(r("edx", -0.035), r("edy", -0.17), r("edz", 0.06))),
      q: zk(-0.05, 0.52, 0.66),
    }),
    u0 = T0({
      p: H0.p.clone().add(S0(r("awx", -0.075), r("awy", -0.25), r("awz", 0.1))),
      q: zk(0.05, 0.6, 0.85),
    }),
    w0 = T0({
      p: H0.p,
      q: H0.q,
    })
      .p.sub(D0.p)
      .multiplyScalar(r("edv", 6.5)),
    P0 = (rt) => ({
      t: rt,
      ...D0,
      pass: !0,
      vel: w0,
    }),
    st = n.grip("shell"),
    J0 = n.grip("push"),
    q0 = new Float32Array(e.push.pose);
  ((q0[16] -= 12),
    (q0[17] += 14),
    (q0[19] = Math.max(-6, q0[19] - 14)),
    (q0[20] = -8));
  let v0 = Yl(Math.sin(0.35), -Math.cos(0.35), 0),
    x0 = i.LIFT_PIVOT[2],
    C0 = 0.0068,
    k0 = new V1(),
    O0 = (rt) => {
      let dt = 0;
      for (let tt = -3; tt <= 3; tt++) {
        k0.set(0, 0, tt * 0.01)
          .applyQuaternion(rt.quaternion)
          .add(rt.position);
        let X0 = -k0.z;
        X0 < 0.1 ||
          (dt = Math.max(
            dt,
            Math.atan2(k0.y + i.SHELL.r - C0, X0 - x0) *
              (1 - Dk(0.194, 0.2075, X0)),
          ));
      }
      return Math.min(0.31, dt);
    },
    B0 = (rt, dt, tt, X0, ut, z0) =>
      n.gunAt(
        rt,
        M0[0] * dt + z0[0],
        M0[1] * dt + z0[1],
        M0[2] * dt + z0[2],
        f0[0] * tt + z0[3],
        f0[1] * X0 + z0[4],
        f0[2] * ut + z0[5],
      ),
    ot = L(e.shell, D0, j0),
    Q0 = n.grip("pump"),
    nt = (rt, dt, tt = {}) => ({
      p: Q0.p
        .clone()
        .lerp(ot.p, rt)
        .add(Yl(dt[0], dt[1], dt[2])),
      q: Q0.q.clone().slerp(ot.q, tt.turn ?? rt),
      f: "view",
      pass: !0,
    }),
    L0 = (() => {
      let tt = jt([
          [0, 0],
          [0.06, -0.045, "out"],
          [0.42, 1, "back"],
          [0.45, 1],
        ]),
        X0 = jt([
          [0.04, 0],
          [0.43, 1, "back"],
          [0.45, 1],
        ]),
        ut = jt([
          [0.06, 0],
          [0.42, 1, "out"],
          [0.45, 1],
        ]),
        z0 = jt([
          [0.05, 0],
          [0.41, 1, "io"],
          [0.45, 1],
        ]),
        I0 = Do(0.45, {
          n: 6,
          k: 300,
          c: 15,
          fade: 0.1,
          impulses: [
            {
              t: 0.07,
              v: [0, -0.04, 0, -0.16, 0, 0.1],
            },
          ],
          target: (Pt, bt) => {
            let Et = be(Pt, 0.06, 0.2, 0.3, 0.42);
            ((bt[0] = bt[2] = bt[4] = bt[5] = 0),
              (bt[1] = -0.004 * Et),
              (bt[3] = -0.03 * Et));
          },
        }),
        vt = new Xs([
          {
            t: 0,
            ...u0,
          },
          {
            t: 0.335,
            ...u0,
          },
          P0(0.45),
        ]),
        wt = new Xs([
          v,
          {
            t: 0.04,
            ...n.grip("pump"),
          },
          {
            t: 0.095,
            ...n.grip("pump", {
              d: [-0.022, -0.046, 0.018],
              r: [0.1, 0, -0.22],
              f: "view",
            }),
            pass: !0,
          },
          {
            t: 0.2,
            ...nt(0.62, [-0.03, 0.02, 0.02], {
              turn: 0.75,
            }),
          },
          {
            t: 0.335 - 0.02,
            ...st,
          },
          {
            t: 0.45,
            ...st,
          },
        ]),
        _t = new Gs(e.pump.pose, [
          {
            t: 0,
            pose: d,
            dur: 0.05,
            stagger: 0.007,
            from: "little",
          },
          {
            t: r("rsc", 0.052),
            pose: x,
            dur: 0.062,
            stagger: 0.006,
            from: "little",
            digits: [0, 1, 2, 3],
          },
          {
            t: r("rst", 0.06),
            pose: x,
            dur: 0.06,
            digits: [4],
          },
          {
            t: 0.25,
            pose: e.shell.pose,
            dur: 0.07,
            stagger: 0.008,
            from: "little",
          },
        ]);
      return n.clip(0.45, [ye(0.03, "cloth")], (Pt, bt) => {
        ((n0.end = n0.need),
          I0(Pt, Fs),
          B0(bt, X0(Pt), ut(Pt), z0(Pt), tt(Pt), Fs),
          n.partXf("shell", vt, Pt),
          (s.shell.visible = Pt > 0.335),
          n.hand("L", wt, Pt),
          n.pose("L", _t, Pt),
          M(t.clip.R.pose, be(Pt, 0.02, 0.14, 9, 10)),
          w(Dk(0.04, 0.22, Pt)));
      });
    })(),
    ht = (rt) => {
      let tt = [0.08, 0.086, 0.074, 0.084][rt],
        X0 = [0.148, 0.146, 0.138, 0.156][rt],
        ut = [0.204, 0.226, 0.192, 0.212][rt],
        z0 = 0.292,
        I0 = 0.372,
        vt = 0.44,
        wt = [
          H0,
          Z0([0.01, -0.076, 0.038], [-0.04, 0.4, 0.58]),
          Z0([0.02, -0.064, 0.03], [-0.16, 0.56, 0.38]),
          Z0([0.026, -0.068, 0.03], [-0.14, 0.64, 0.34]),
        ][rt],
        _t = [
          Y0,
          Z0([0, -0.027, 0.014], [0.47, 0.02, 0]),
          Z0([0, -0.024, 0.012], [0.42, 0, 0]),
          Z0([0.0015, -0.027, 0.013], [0.46, -0.05, 0]),
        ][rt],
        Pt = {
          p: wt.p
            .clone()
            .lerp(_t.p, 0.5)
            .add(Yl(0, r("kmy", -0.005), 0)),
          q: wt.q.clone().slerp(_t.q, 0.5),
        },
        bt = [
          P0(0),
          {
            t: tt,
            ...wt,
            pass: !0,
          },
          {
            t: (tt + X0) / 2,
            ...Pt,
            pass: !0,
          },
          {
            t: X0,
            ..._t,
            pass: !0,
            tens: 0.45,
          },
        ];
      (rt === 1 &&
        bt.push({
          t: X0 + 0.03,
          ...Z0([0, -0.0235, 0.0165], [0.5, 0.02, 0]),
        }),
        rt === 3 &&
          bt.push({
            t: X0 + 0.024,
            ...Z0([-0.0012, -0.022, 0.011], [0.4, 0.04, 0]),
            pass: !0,
          }),
        bt.push(
          {
            t: ut,
            ...et,
            pass: !0,
            tens: 0.5,
          },
          {
            t: z0,
            ...ct,
            ease: rt === 2 ? "io" : "in",
          },
          {
            t: z0 + 0.012,
            ...ct,
          },
          {
            t: z0 + 0.013,
            ...u0,
          },
          {
            t: vt,
            ...u0,
          },
          P0(0.5),
        ));
      let Et = new Xs(bt),
        zt = e.push.pos.clone().add(Yl(0, 0, lt)),
        J = e.push.quat,
        Q = z0 + (rt === 2 ? 0.06 : 0.016),
        i0 = J.clone().slerp(L(e.shell, H0, j0).q, 0.55),
        A0 = X0 + (rt === 1 ? 0.03 : 0) + r("tas", -0.008),
        N0 = ut + r("tpl", 0.008) + 0.004 - A0,
        mt = new Xs([
          {
            t: 0,
            ...st,
          },
          {
            t: A0,
            ...st,
          },
          {
            t: A0 + (ut + r("tpl", 0.008) - A0) * r("rkf", 0.42),
            ...n.grip("roll"),
            pass: !0,
          },
          {
            t: ut + r("tpl", 0.008),
            ...J0,
          },
          {
            t: z0,
            ...J0,
          },
          {
            t: z0 + 0.001,
            p: zt,
            q: J.clone(),
            f: "root",
          },
          {
            t: Q,
            p: zt,
            q: J.clone(),
            f: "root",
          },
          {
            t: Q + 0.03,
            p: zt
              .clone()
              .addScaledVector(v0, r("wdn", 0.022))
              .add(Yl(0, 0, r("wdz", 0.014))),
            q: J.clone(),
            f: "root",
            pass: !0,
          },
          {
            t: I0 + (rt === 2 ? 0.02 : 0),
            p: zt
              .clone()
              .add(S0([-0.018, -0.01, -0.03, 0.004][rt], -0.105, 0.05)),
            q: i0,
            f: "root",
            pass: !0,
          },
          {
            t: vt,
            ...st,
          },
          {
            t: 0.5,
            ...st,
          },
        ]),
        xt = new Gs(e.shell.pose, [
          {
            t: A0 + r("tfo", 0.004),
            pose: e.push.pose,
            dur: N0 * 0.8,
            stagger: N0 * 0.05,
            from: "little",
            digits: [0, 1, 2, 3],
          },
          {
            t: A0 + 0.002,
            pose: e.roll.pose,
            dur: N0 * r("rkf", 0.42) - 0.002,
            digits: [4],
            ease: "io",
          },
          {
            t: A0 + N0 * r("rkf", 0.42),
            pose: e.push.pose,
            dur: N0 * (1 - r("rkf", 0.42)) + r("tth", 0.01),
            digits: [4],
            ease: "io",
          },
          {
            t: Q,
            pose: q0,
            dur: 0.03,
            digits: [4],
            ease: "out",
          },
          {
            t: Q + 0.01,
            pose: x,
            dur: 0.06,
            stagger: 0.008,
            from: "index",
            digits: [0, 1, 2, 3],
          },
          {
            t: Q + 0.03,
            pose: x,
            dur: 0.05,
            digits: [4],
          },
          {
            t: vt - 0.062,
            pose: e.shell.pose,
            dur: 0.056,
            stagger: 0.004,
            from: "little",
          },
        ]),
        yt = [1, 1.5, 0.8, 1.1][rt],
        Mt = Do(0.5, {
          n: 6,
          k: [320, 320, 340, 350, 330, 300],
          c: [16, 16, 17, 16, 15, 14],
          fade: 0.1,
          impulses: [
            {
              t: X0 + 0.004,
              v: [0.02 * yt, 0.05 * yt, 0, 0.14 * yt, 0.05, -0.2 * yt],
            },
            ...(rt === 1
              ? [
                  {
                    t: X0 + 0.05,
                    v: [0.02, 0.06, 0, 0.16, 0.04, -0.22],
                  },
                ]
              : []),
            {
              t: z0,
              v: [0.01, 0.02, -0.18, -0.3, -0.1, 0.18],
            },
            ...(rt === 2
              ? [
                  {
                    t: z0 + 0.04,
                    v: [0, 0.01, -0.07, -0.12, -0.03, 0.07],
                  },
                ]
              : []),
            {
              t: z0 + 0.06,
              v: [0, -0.02, 0.05, 0.1, 0.03, -0.05],
            },
          ],
        }),
        St = jt([
          [ut, 0],
          [z0 - 0.01, 1, "out"],
          [Q + 0.006, 1],
          [Q + 0.04, 0, "in"],
        ]),
        Rt = Q + 0.04,
        Ot = (Jt) =>
          rt === 2 ? be(Jt, z0 + 0.03, z0 + 0.042, z0 + 0.05, z0 + 0.062) : 0;
      return (Jt, ee) => {
        (Mt(Jt, Fs), B0(ee, 1, 1, 1, 1, Fs), n.partXf("shell", Et, Jt));
        let Nt = s.shell;
        Nt.visible = Jt < z0 + 0.008 || Jt > vt + 0.004;
        let ge = Math.max(
          Nt.visible && Jt < z0 + 0.008 ? O0(Nt) : 0,
          0.125 * St(Jt),
        );
        (n.part(
          "lifter",
          0,
          0,
          0,
          ge + 0.045 * vi(Jt, Rt, 1, 68, 20) * Op((0.5 - Jt) / 0.06),
          0,
          0,
        ),
          n.hand("L", mt, Jt),
          n.pose("L", xt, Jt),
          Ot(Jt) > 0 && (t.clip.L.pos.z -= 0.0022 * Ot(Jt)),
          M(t.clip.R.pose, 1),
          w(1),
          (t.clip.L.pose[20] +=
            5 * be(Jt, ut, ut + 0.03, z0, z0 + 0.03) + 4 * Ot(Jt)));
      };
    },
    pt = (() => {
      let rt = [0, 1, 2, 3].map(ht),
        dt = [0, 2, 1, 3, 0, 3, 2, 1],
        tt = 0.292;
      return n.clip(
        0.5,
        [
          ye(tt - 0.02, "shell"),
          {
            t: tt + 0.006,
            type: "ammo",
          },
        ],
        (X0, ut) => {
          ((e0.t = X0),
            (e0.seen = !0),
            rt[dt[(o.shellIx | 0) % dt.length]](X0, ut));
        },
      );
    })(),
    V0 = (rt) => {
      let tt = {
          tW: 0.03,
          tB1: 0.104,
          tF0: 0.186,
          tF1: 0.25,
        },
        X0 = 0.3 + 0.04,
        ut = rt ? X0 + tt.tF1 + 0.21 : 0.45,
        z0 = rt ? $(tt) : null,
        I0 = rt ? 0.36 : 0.34,
        vt = jt([
          [0.04, 1],
          [I0, 0, "back"],
          [ut, 0],
        ]),
        wt = jt([
          [0.05, 1],
          [I0 + 0.01, 0, "back"],
          [ut, 0],
        ]),
        _t = jt([
          [0.03, 1],
          [I0 - 0.01, 0, "io"],
          [ut, 0],
        ]),
        Pt = jt([
          [0.03, 1],
          [I0 - 0.02, 0, "io"],
          [ut, 0],
        ]),
        bt = [
          {
            t: 0.3,
            v: [0, 0.035, 0, 0.12, 0, 0.06],
          },
          {
            t: 0.355,
            v: [0, -0.02, 0.03, -0.06, 0, -0.05],
          },
        ];
      rt &&
        bt.push(
          {
            t: X0 + 0.004,
            v: [0, -0.02, -0.07, -0.18, 0.06, 0.22],
          },
          {
            t: X0 + tt.tB1,
            v: [0.03, 0.06, 0.44, 0.86, -0.28, -0.62],
          },
          {
            t: X0 + tt.tF1,
            v: [-0.03, -0.08, -0.5, -1, 0.24, 0.72],
          },
          {
            t: X0 + tt.tF1 + 0.072,
            v: [0, 0.02, 0.08, 0.22, 0, -0.12],
          },
        );
      let Et = Do(ut, {
          n: 6,
          k: rt ? [320, 320, 360, 350, 320, 300] : 300,
          c: rt ? [16, 16, 17, 16, 15, 14] : 14,
          fade: 0.1,
          impulses: bt,
        }),
        zt = new Xs([
          P0(0),
          {
            t: 0.07,
            p: D0.p.clone().addScaledVector(w0, 0.03),
            q: D0.q.clone(),
            f: "view",
          },
        ]),
        J = new Xs([
          {
            t: 0,
            ...st,
          },
          {
            t: 0.055,
            ...st,
            pass: !0,
          },
          {
            t: 0.15,
            ...nt(0.52, [-0.04, -0.006, 0.03], {
              turn: 0.5,
            }),
          },
          {
            t: 0.3 - 0.05,
            ...n.grip("pump", {
              d: [-0.016, -0.026, 0.014],
              r: [0.08, 0, -0.16],
            }),
            pass: !0,
          },
          {
            t: 0.3,
            ...n.grip("pump"),
          },
        ]),
        Q = new Gs(e.shell.pose, [
          {
            t: 0,
            pose: x,
            dur: 0.1,
            stagger: 0.008,
            from: "thumb",
          },
          {
            t: 0.3 - r("ppt", 0.105),
            pose: p,
            dur: 0.055,
            stagger: 0.003,
            from: "little",
          },
          {
            t: 0.3 - 0.035,
            pose: e.pump.pose,
            dur: 0.09,
            stagger: 0.026,
            from: "index",
            ease: "out",
          },
        ]),
        i0 = [ye(0.05, "cloth")];
      rt && i0.push(ye(X0 + tt.tW, "pump_back"), ye(X0 + tt.tF0, "pump_fwd"));
      let A0 = n.clip(ut, i0, (N0, mt) => {
        Et(N0, Fs);
        let xt = N0 - X0,
          yt = rt && xt > 0 ? z0.p(xt) : 0;
        if (
          (B0(mt, wt(N0), _t(N0), Pt(N0), vt(N0), Fs),
          rt &&
            ((mt.pos.y += -0.004 * yt),
            (mt.pos.z += 0.018 * yt),
            (mt.rot.x += 0.03 * yt),
            (mt.rot.y += 0.022 * yt),
            (mt.rot.z += -0.078 * yt),
            n.gunAt(
              mt,
              mt.pos.x,
              mt.pos.y,
              mt.pos.z,
              mt.rot.x,
              mt.rot.y,
              mt.rot.z,
            )),
          n.partXf("shell", zt, N0),
          (s.shell.visible = N0 < 0.012),
          n.hand("L", J, N0),
          n.pose("L", Q, N0),
          M(t.clip.R.pose, 1 - be(N0, 0.3 - 0.06, 0.3 + 0.05, 9, 10)),
          w(1 - Dk(I0 - 0.2, I0 - 0.02, N0)),
          rt && xt > 0)
        ) {
          z0.apply(xt, !0, !1, tt.tF1 + 0.2);
          let Mt = z0.sq(xt);
          (T(t.clip.L.pose, 1.3 * Mt),
            M(t.clip.R.pose, Mt),
            (t.clip.L.pos.z +=
              0.0035 * vi(xt, tt.tB1, 1, 60, 26) -
              0.004 * vi(xt, tt.tF1, 1, 55, 22)),
            xt > tt.tF0 && (n0.need = !1));
        }
      });
      return ((A0.tFeed = X0 + tt.tF0), A0);
    },
    c0 = V0(!1),
    Z = V0(!0),
    r0 = {
      get duration() {
        return n0.end ? Z.duration : c0.duration;
      },
      get events() {
        return n0.end ? Z.events : c0.events;
      },
      apply(rt, dt) {
        (n0.end ? Z : c0).apply(rt, dt);
      },
    },
    b0 = n.grip("pump", {
      d: [-0.045, -0.095, 0.035],
    }),
    d0 = (() => {
      let rt = jt([
          [0, -0.3],
          [0.3, 0.012, "out3"],
          [0.4, 0],
        ]),
        dt = jt([
          [0, -0.85],
          [0.28, 0.05, "out3"],
          [0.4, 0],
        ]),
        tt = jt([
          [0, 1],
          [0.34, 0, "out"],
        ]),
        X0 = jt([
          [0, 0.3],
          [0.3, -0.03, "out"],
          [0.4, 0],
        ]),
        ut = new Xs([
          {
            t: 0,
            ...b0,
          },
          {
            t: 0.06,
            ...b0,
          },
          {
            t: 0.27,
            ...n.grip("pump"),
            arc: Yl(-0.01, -0.02, 0),
          },
        ]),
        z0 = new Gs(m, [
          {
            t: 0.18,
            pose: e.pump.pose,
            dur: 0.13,
            stagger: 0.022,
            from: "index",
            ease: "out",
          },
        ]);
      return n.clip(0.4, [ye(0.02, "cloth")], (I0, vt) => {
        (n.gunAt(
          vt,
          0.02 * tt(I0),
          rt(I0),
          0.06 * tt(I0),
          dt(I0),
          0.25 * tt(I0),
          X0(I0) +
            vi(I0, 0.29, 0.02, 34, 15) * (1 - be(I0, 0.33, 0.395, 9, 10)),
        ),
          n.hand("L", ut, I0),
          n.pose("L", z0, I0));
      });
    })(),
    V = [r("ibx", -0.062), r("iby", 0.012), r("ibz", 0.085)],
    B = [r("ibrx", 0.16), r("ibry", -0.4), r("ibrz", 0.56)],
    j = (() => {
      let I0 = jt([
          [0, 1],
          [0.3, 0, "out3"],
        ]),
        vt = jt([
          [0, 0.85],
          [0.52, 0.85],
          [0.8, 0, "io"],
        ]),
        wt = jt([
          [0.3, 0],
          [0.4, 1, "out"],
          [0.52, 1],
          [0.575, 0, "in"],
        ]),
        _t = Do(0.88, {
          n: 6,
          k: 280,
          c: 15,
          fade: 0.1,
          impulses: [
            {
              t: 0.29,
              v: [0, 0.03, 0, 0.14, 0, -0.08],
            },
            {
              t: 0.4 - 0.01,
              v: [0, 0.01, 0.1, 0.16, -0.05, -0.08],
            },
            {
              t: 0.575,
              v: [0, -0.03, -0.22, -0.4, 0.08, 0.24],
            },
            {
              t: 0.79,
              v: [0, 0.02, 0, 0.08, 0, 0.06],
            },
          ],
        }),
        Pt = new Gs(e.fire.pose, [
          {
            t: 0.16,
            pose: e.release.pose,
            dur: 0.1,
            digits: [0],
          },
          {
            t: 0.5,
            pose: e.fire.pose,
            dur: 0.14,
            digits: [0],
          },
        ]),
        bt = jt([
          [0.25, 0],
          [0.29, 1, "out"],
          [0.46, 1],
          [0.52, 0],
        ]);
      return n.clip(
        0.88,
        [
          ye(0.02, "cloth"),
          ye(0.3 + 0.02, "pump_back"),
          ye(0.52 - 0.01, "pump_fwd"),
        ],
        (Et, zt) => {
          let J = I0(Et),
            Q = vt(Et);
          (_t(Et, Fs),
            n.gunAt(
              zt,
              V[0] * Q + 0.03 * J + Fs[0],
              V[1] * Q - 0.3 * J + Fs[1],
              V[2] * Q + 0.05 * J + Fs[2],
              B[0] * Q - 0.6 * J + Fs[3],
              B[1] * Q + 0.2 * J + Fs[4],
              B[2] * Q + Fs[5],
            ));
          let i0 = k(0.046 * wt(Et));
          {
            let N0 = s.liftShell;
            (n.part("liftShell", 0, F, -P + i0, 0, 0, 0),
              (N0.visible = i0 > 6e-4));
          }
          (n.part("actionRelease", 0, 0, 0, 0.22 * bt(Et), 0, 0),
            n.hand("L", y, Et),
            n.pose("R", Pt, Et));
          let A0 = be(Et, 0.3 - 0.03, 0.3 + 0.03, 0.575, 0.575 + 0.08);
          (T(t.clip.L.pose, A0), M(t.clip.R.pose, be(Et, 0.05, 0.2, 0.6, 0.8)));
        },
      );
    })(),
    s0 = (() => {
      let rt = jt([
          [0, 0],
          [0.05, 0.008, "out"],
          [0.25, -0.32, "in"],
        ]),
        dt = jt([
          [0, 0],
          [0.05, 0.03, "out"],
          [0.25, -0.8, "in"],
        ]),
        tt = jt([
          [0.03, 0],
          [0.25, 1, "in"],
        ]),
        X0 = new Xs([
          v,
          {
            t: 0.06,
            ...n.grip("pump"),
          },
          {
            t: 0.23,
            ...b0,
            ease: "in",
          },
        ]),
        ut = new Gs(e.pump.pose, [
          {
            t: 0,
            pose: d,
            dur: 0.07,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.14,
            pose: x,
            dur: 0.1,
            stagger: 0.01,
            from: "index",
          },
        ]);
      return n.clip(0.25, [ye(0.02, "cloth")], (z0, I0) => {
        (n.gunAt(
          I0,
          0,
          rt(z0),
          0.05 * tt(z0),
          dt(z0),
          0.2 * tt(z0),
          0.25 * tt(z0),
        ),
          n.hand("L", X0, z0),
          n.pose("L", ut, z0));
      });
    })(),
    l0 = (() => {
      let I0 = jt([
          [0.05, 0],
          [0.5, 1, "back"],
          [0.92, 1],
          [1.36, 0, "io"],
        ]),
        vt = jt([
          [0.98, 0],
          [1.4, 1, "back"],
          [2, 1],
          [2.4, 0, "io"],
        ]),
        wt = jt([
          [2.04, 0],
          [2.48, 1, "back"],
          [3.36, 1],
          [3.88, 0, "io"],
        ]),
        _t = jt([
          [2.6, 0],
          [2.76, 1, "out"],
          [3.14, 1],
          [3.21, 0, "in"],
        ]),
        Pt = jt([
          [2.76 - 0.06, 0],
          [2.76 + 0.18, 1, "io"],
          [3.14 - 0.1, 1],
          [3.14 + 0.04, 0, "io"],
        ]),
        bt = 1.56,
        Et = 1.82,
        zt = (ee) =>
          be(ee, bt - 0.06, bt, bt + 0.08, bt + 0.13) +
          be(ee, Et - 0.06, Et, Et + 0.1, Et + 0.16),
        J = Do(4, {
          n: 6,
          k: 260,
          c: 13,
          impulses: [
            {
              t: 1,
              v: [0, -0.03, 0, -0.1, 0, 0.08],
            },
            {
              t: bt,
              v: [0.01, 0.03, 0, 0.08, 0.02, -0.1],
            },
            {
              t: Et,
              v: [0.01, 0.03, 0, 0.08, 0.02, -0.1],
            },
            {
              t: 2.44,
              v: [0, 0.03, 0, 0.08, -0.05, -0.08],
            },
            {
              t: 2.76 - 0.02,
              v: [0, 0.01, 0.1, 0.16, -0.05, -0.08],
            },
            {
              t: 3.21,
              v: [0, -0.03, -0.2, -0.36, 0.08, 0.22],
            },
            {
              t: 3.8,
              v: [0, 0.03, 0, 0.09, 0, 0.05],
            },
          ],
          target: (ee, Nt) => {
            let ge = be(ee, 1.02, 1.22, 2.2, 2.42);
            ((Nt[0] = Nt[2] = Nt[4] = 0),
              (Nt[1] = -0.004 * ge),
              (Nt[3] = -0.028 * ge),
              (Nt[5] = 0.02 * ge));
          },
        }),
        Q = n.grip("push", {
          d: [0.002, r("ipo", -0.027), 0.008],
        }),
        i0 = n.grip("push", {
          d: [0, r("ipi", -0.006), 0],
        }),
        A0 = new Xs([
          v,
          {
            t: 0.955,
            ...n.grip("pump"),
          },
          {
            t: 1.07,
            ...n.grip("pump", {
              d: [-0.05, -0.07, 0.045],
              r: [0.25, 0, -0.35],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 1.27,
            ...n.grip("push", {
              d: [0.006, -0.052, 0.022],
            }),
            pass: !0,
          },
          {
            t: 1.44,
            ...Q,
          },
          {
            t: bt - 0.06,
            ...Q,
          },
          {
            t: bt,
            ...i0,
          },
          {
            t: bt + 0.08,
            ...i0,
          },
          {
            t: bt + 0.15,
            ...Q,
          },
          {
            t: Et - 0.06,
            ...Q,
          },
          {
            t: Et,
            ...i0,
          },
          {
            t: Et + 0.1,
            ...i0,
          },
          {
            t: Et + 0.19,
            ...Q,
          },
          {
            t: 2.22,
            ...n.grip("pump", {
              d: [-0.05, -0.075, 0.045],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 2.46,
            ...n.grip("pump"),
            arc: Yl(-0.015, -0.03, 0.01),
          },
        ]),
        N0 = c(e.pump.pose, d, 0.55),
        mt = new Gs(e.pump.pose, [
          {
            t: 0.6,
            pose: N0,
            dur: 0.11,
            stagger: 0.04,
            from: "little",
          },
          {
            t: 0.73,
            pose: e.pump.pose,
            dur: 0.13,
            stagger: 0.04,
            from: "little",
            ease: "out",
          },
          {
            t: 0.92,
            pose: d,
            dur: 0.085,
            stagger: 0.012,
            from: "little",
          },
          {
            t: 1.075,
            pose: x,
            dur: 0.12,
            stagger: 0.012,
            from: "little",
          },
          {
            t: 1.28,
            pose: e.push.pose,
            dur: 0.14,
            stagger: 0.012,
            from: "index",
          },
          {
            t: Et + 0.2,
            pose: x,
            dur: 0.16,
            stagger: 0.012,
            from: "thumb",
          },
          {
            t: 2.19,
            pose: m,
            dur: 0.11,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 2.4,
            pose: e.pump.pose,
            dur: 0.13,
            stagger: 0.024,
            from: "index",
            ease: "out",
          },
        ]),
        xt = new Gs(e.fire.pose, [
          {
            t: 2.42,
            pose: e.release.pose,
            dur: 0.12,
            digits: [0],
          },
          {
            t: 2.84,
            pose: e.fire.pose,
            dur: 0.16,
            digits: [0],
          },
        ]),
        yt = jt([
          [2.52, 0],
          [2.56, 1, "out"],
          [2.78, 1],
          [2.84, 0],
        ]),
        Mt = (ee) =>
          be(ee, 0.62, 0.68, 0.7, 0.78) + be(ee, 0.8, 0.86, 0.87, 0.95),
        St = [r("iax", -0.03), r("iay", 0.02), r("iaz", -0.01)],
        Rt = [r("iarx", 0.16), r("iary", 0.86), r("iarz", -0.28)],
        Ot = [M0[0] - 0.015, M0[1] + 0.012, M0[2] - 0.02],
        Jt = [f0[0] + 0.1, f0[1] - 0.1, f0[2] + 0.1];
      return n.clip(
        4,
        [
          ye(0.1, "cloth"),
          ye(1.02, "cloth"),
          ye(2.3, "cloth"),
          ye(2.6 + 0.02, "pump_back"),
          ye(3.14 - 0.01, "pump_fwd"),
          ye(3.5, "cloth"),
        ],
        (ee, Nt) => {
          let ge = I0(ee),
            Le = vt(ee),
            xn = wt(ee),
            js = Math.sin(ee * 1.7) * 0.03 * Math.max(ge, Le, xn),
            Un = Pt(ee),
            re = zt(ee);
          (J(ee, Fs),
            n.gunAt(
              Nt,
              St[0] * ge + Ot[0] * Le + V[0] * xn + Fs[0],
              St[1] * ge + Ot[1] * Le + V[1] * xn + 0.006 * Un + Fs[1],
              St[2] * ge + Ot[2] * Le + V[2] * xn + 0.015 * Un + Fs[2],
              Rt[0] * ge + Jt[0] * Le + B[0] * xn + 0.05 * Un + Fs[3],
              (Rt[1] + js) * ge + (Jt[1] + js) * Le + (B[1] + js) * xn + Fs[4],
              Rt[2] * ge + Jt[2] * Le + B[2] * xn + r("ipk", 0.22) * Un + Fs[5],
            ));
          let Ae = k(0.05 * _t(ee));
          {
            let va = s.liftShell;
            (n.part("liftShell", 0, F, -P + Ae, 0, 0, 0),
              (va.visible = Ae > 6e-4));
          }
          (n.part(
            "lifter",
            0,
            0,
            0,
            0.19 * re +
              0.04 *
                (vi(ee, bt + 0.13, 1, 68, 20) + vi(ee, Et + 0.16, 1, 68, 20)),
            0,
            0,
          ),
            n.part("actionRelease", 0, 0, 0, 0.22 * yt(ee), 0, 0),
            n.hand("L", A0, ee),
            n.pose("L", mt, ee),
            n.pose("R", xt, ee));
          let ws = t.clip.R.pose,
            Zo = t.clip.L.pose,
            so = Mt(ee),
            Os = be(ee, 2.6 - 0.03, 2.6 + 0.04, 3.21, 3.21 + 0.08);
          ((ws[0] -= 12 * so),
            (ws[2] -= 5 * so),
            M(ws, be(ee, 1, 1.2, 2.3, 2.5)),
            T(Zo, Os),
            w(Le),
            (Zo[20] += 6 * re));
        },
      );
    })(),
    E0 = (() => {
      let rt = jt([
          [0, 0],
          [0.085, -0.2, "out"],
          [0.185, 1, "in"],
          [0.26, 0.9, "out"],
          [0.45, 0, "io"],
        ]),
        dt = [r("mpx", -0.32), r("mpy", 0.05), r("mpz", -0.2)],
        tt = [r("mrx", 0.12), r("mry", 1.62), r("mrz", -0.4)];
      return n.clip(0.45, [ye(0.03, "cloth")], (X0, ut) => {
        let z0 = rt(X0),
          I0 = vi(X0, 0.185, 1, 46, 17) * (1 - X0 / 0.45);
        (n.gunAt(
          ut,
          dt[0] * z0,
          dt[1] * z0 + 0.004 * I0,
          dt[2] * z0 + (z0 < 0 ? -0.2 * z0 : 0) + 0.007 * I0,
          tt[0] * z0 - 0.02 * I0,
          tt[1] * z0 + 0.03 * I0,
          tt[2] * z0 + 0.035 * I0,
        ),
          n.hand("L", y, X0),
          n.part(
            "lifter",
            0,
            0,
            0,
            0.05 * vi(X0, 0.185, 1, 70, 18) * Op((0.45 - X0) / 0.1),
            0,
            0,
          ));
        let vt = be(X0, 0.02, 0.1, 0.26, 0.4);
        (M(t.clip.R.pose, vt), T(t.clip.L.pose, vt));
      });
    })(),
    U = s.frag ? s.frag.userData.rest : null,
    X = (() => {
      let I0 = jt([
          [0.01, 0],
          [0.13, 1, "out"],
          [0.42, 1],
          [0.62, 0, "io"],
        ]),
        vt = Do(0.7, {
          n: 6,
          k: 300,
          c: 15,
          fade: 0.1,
          impulses: [
            {
              t: 0.05,
              v: [0, -0.05, 0, -0.2, 0.03, 0.1],
            },
            {
              t: 0.322 - 0.01,
              v: [0.02, 0.02, 0.05, 0.1, -0.06, -0.1],
            },
            {
              t: 0.56,
              v: [0, 0.03, 0, 0.12, 0, 0.05],
            },
          ],
        }),
        wt = C(
          0,
          [-0.215, -0.33, -0.13],
          [0.25, 0.55, -0.8],
          [0.55, 0.35, 0.75],
        ),
        _t = C(0, [-0.2, -0.215, -0.43], [0.1, 0.75, -0.65], [0.6, 0.05, -0.8]),
        Pt = C(
          0,
          [-0.215, -0.15, -0.4],
          [0.05, 0.9, -0.43],
          [0.5, 0.15, -0.85],
        ),
        bt = C(
          0,
          [-0.07, -0.125, -0.46],
          [0.2, 0.35, -0.92],
          [0.1, -0.9, -0.42],
        ),
        Et = C(
          0,
          [-0.035, -0.195, -0.5],
          [0.12, -0.38, -0.92],
          [0.05, -0.92, 0.38],
        ),
        zt = (Ot) => (U ? A(e.frag, Ot, U) : Ot),
        J = zt(wt),
        Q = zt(_t),
        i0 = zt(Pt),
        A0 = zt(bt),
        N0 = new Xs([
          {
            t: 0,
            ...J,
            f: "view",
          },
          {
            t: 0.155,
            ...J,
            f: "view",
          },
          {
            t: 0.205,
            ...Q,
            f: "view",
            pass: !0,
          },
          {
            t: 0.25,
            ...i0,
            f: "view",
            pass: !0,
            tens: 0.5,
          },
          {
            t: 0.322,
            ...A0,
            f: "view",
            ease: "in",
          },
          {
            t: 0.7,
            ...A0,
            f: "view",
          },
        ]),
        mt = U ? n.grip("frag") : bt,
        xt = new Xs([
          v,
          {
            t: 0.03,
            ...n.grip("pump"),
          },
          {
            t: 0.07,
            ...n.grip("pump", {
              d: [-0.03, -0.05, 0.02],
              r: [0.1, 0, -0.25],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 0.155 - 0.001,
            p: wt.p,
            q: wt.q,
            f: "view",
          },
          {
            t: 0.155,
            ...mt,
          },
          {
            t: 0.322,
            ...mt,
          },
          {
            t: 0.322 + 0.001,
            p: bt.p,
            q: bt.q,
            f: "view",
            pass: !0,
            vel: Et.p.clone().sub(bt.p).multiplyScalar(8),
          },
          {
            ...Et,
            t: 0.322 + 0.065,
            ease: "out",
          },
          {
            ...Et,
            t: 0.322 + 0.085,
          },
          {
            t: 0.56 - 0.105,
            ...n.grip("pump", {
              d: [-0.06, -0.085, 0.035],
              r: [0.16, 0, -0.32],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 0.56 - 0.05,
            ...n.grip("pump", {
              d: [-0.02, -0.034, 0.018],
              r: [0.08, 0, -0.18],
            }),
            pass: !0,
          },
          {
            t: 0.56,
            ...n.grip("pump"),
          },
        ]),
        yt = U ? e.frag.pose : pn.fist,
        Mt = h(yt, [1.5, 1.25, 1, 0.8, 1.6]),
        St = new Gs(e.pump.pose, [
          {
            t: 0,
            pose: d,
            dur: 0.07,
            stagger: 0.01,
            from: "little",
          },
          {
            t: 0.075,
            pose: yt,
            dur: 0.07,
            stagger: 0.006,
            from: "little",
          },
          {
            t: 0.322 - 0.016,
            pose: Mt,
            dur: 0.045,
            stagger: 0.005,
            from: "index",
            ease: "out",
          },
          {
            t: 0.322 + 0.025,
            pose: g,
            dur: 0.05,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.322 + 0.065,
            pose: x,
            dur: 0.06,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.56 - r("ppt", 0.105),
            pose: p,
            dur: 0.055,
            stagger: 0.003,
            from: "little",
          },
          {
            t: 0.56 - 0.035,
            pose: e.pump.pose,
            dur: 0.09,
            stagger: 0.026,
            from: "index",
            ease: "out",
          },
        ]),
        Rt = n.clip(0.7, [ye(0.02, "cloth")], (Ot, Jt) => {
          let ee = I0(Ot);
          (vt(Ot, Fs),
            n.gunAt(
              Jt,
              0.012 * ee + Fs[0],
              -0.03 * ee + Fs[1],
              0.03 * ee + Fs[2],
              -0.13 * ee + Fs[3],
              0.12 * ee + Fs[4],
              0.2 * ee + Fs[5],
            ),
            U &&
              (n.partXf("frag", N0, Ot),
              (s.frag.visible = Ot >= 0.155 && Ot < 0.322)),
            n.hand("L", xt, Ot),
            n.pose("L", St, Ot),
            M(
              t.clip.R.pose,
              1.2 * be(Ot, 0.01, 0.08, 0.56 - 0.04, 0.56 + 0.06),
            ));
        });
      return ((Rt.releaseT = 0.322), Rt);
    })(),
    N = (() => {
      let z0 = {
          p: [r("k9x", 0.034), r("k9y", -0.052), r("k9z", 0.04)],
          r: [r("k9p", -0.42), r("k9w", 0.05), r("k9r", 0.3)],
        },
        I0 = jt([
          [0, 0],
          [0.19, 1, "back"],
          [0.92, 1],
        ]),
        vt = jt([
          [0, 1],
          [0.3 - 0.06, 0, "back"],
          [0.3, 0],
        ]),
        wt = Do(0.92, {
          n: 6,
          k: 280,
          c: 16,
          fade: 0.14,
          impulses: [
            {
              t: 0.04,
              v: [0, -0.04, 0, -0.14, 0.03, 0.08],
            },
            {
              t: 0.27,
              v: [0.02, -0.02, -0.06, 0.1, 0.08, -0.1],
            },
            {
              t: 0.76,
              v: [0, 0.03, 0, 0.1, 0, 0.05],
            },
          ],
        }),
        _t = Do(0.3, {
          n: 6,
          k: 300,
          c: 17,
          fade: 0.08,
          impulses: [
            {
              t: 0.02,
              v: [0, 0.04, 0, 0.16, -0.03, -0.06],
            },
          ],
        }),
        Pt = C(
          0,
          [-0.25, -0.32, -0.09],
          [0.2, -0.3, -0.93],
          [0.25, -0.9, 0.36],
        ),
        bt = C(
          0,
          [-0.08, -0.19, -0.39],
          [0.1, -0.5, -0.86],
          [0.04, -0.86, 0.51],
        ),
        Et = C(
          0,
          [-0.052, -0.222, -0.462],
          [0.08, -0.62, -0.78],
          [0.02, -0.78, 0.62],
        ),
        zt = C(
          0,
          [-0.165, -0.18, -0.3],
          [0.16, -0.1, -0.98],
          [0.96, 0.2, 0.14],
        ),
        J = C(
          0,
          [-0.135, -0.188, -0.395],
          [0.14, -0.14, -0.98],
          [0.96, 0.18, 0.12],
        ),
        Q = C(
          0,
          [-0.158, -0.176, -0.318],
          [0.16, -0.08, -0.98],
          [0.96, 0.2, 0.14],
        ),
        i0 = C(
          0,
          [-0.13, -0.19, -0.405],
          [0.14, -0.15, -0.98],
          [0.96, 0.18, 0.12],
        ),
        A0 = new Xs([
          v,
          {
            t: 0.03,
            ...n.grip("pump"),
          },
          {
            t: 0.085,
            ...n.grip("pump", {
              d: [-0.034, -0.055, 0.024],
              r: [0.1, 0, -0.25],
              f: "root",
            }),
            pass: !0,
          },
          {
            ...Pt,
            t: 0.18,
            pass: !0,
            tens: 0.5,
          },
          {
            ...bt,
            t: 0.27,
            pass: !0,
          },
          {
            ...Et,
            t: 0.27 + 0.06,
          },
          {
            ...zt,
            t: 0.4,
          },
          {
            ...J,
            t: 0.455,
            ease: "snap",
          },
          {
            ...Q,
            t: 0.51,
            ease: "io",
          },
          {
            ...i0,
            t: 0.54,
            ease: "out",
          },
          {
            t: 0.76 - 0.1,
            ...n.grip("pump", {
              d: [-0.06, -0.085, 0.035],
              r: [0.16, 0, -0.32],
              f: "root",
            }),
            pass: !0,
          },
          {
            t: 0.76 - 0.045,
            ...n.grip("pump", {
              d: [-0.018, -0.03, 0.016],
              r: [0.08, 0, -0.16],
            }),
            pass: !0,
          },
          {
            t: 0.76,
            ...n.grip("pump"),
          },
        ]),
        N0 = new Gs(e.pump.pose, [
          {
            t: 0,
            pose: d,
            dur: 0.07,
            stagger: 0.01,
            from: "little",
          },
          {
            t: 0.08,
            pose: c(x, pn.fist, 0.45),
            dur: 0.08,
            stagger: 0.008,
            from: "little",
          },
          {
            t: 0.27 - 0.03,
            pose: g,
            dur: 0.06,
            stagger: 0.008,
            from: "index",
            ease: "out",
          },
          {
            t: 0.35,
            pose: b,
            dur: 0.07,
            stagger: 0.006,
            from: "index",
          },
          {
            t: 0.56,
            pose: x,
            dur: 0.08,
            stagger: 0.01,
            from: "little",
          },
          {
            t: 0.76 - r("ppt", 0.105),
            pose: p,
            dur: 0.055,
            stagger: 0.003,
            from: "little",
          },
          {
            t: 0.76 - 0.04,
            pose: e.pump.pose,
            dur: 0.11,
            stagger: 0.024,
            from: "index",
            ease: "out",
          },
        ]),
        mt = n.clip(
          3.4,
          [ye(0.02, "cloth"), ye(3.4 - 0.3 + 0.02, "cloth")],
          (xt, yt) => {
            let Mt = xt - 3.1,
              St = Mt > 0,
              Rt = Math.min(xt, 0.92),
              Ot = St ? vt(Mt) : I0(Rt);
            (St ? _t(Mt, Fs) : wt(Rt, Fs),
              n.gunAt(
                yt,
                z0.p[0] * Ot + Fs[0],
                z0.p[1] * Ot + Fs[1],
                z0.p[2] * Ot + Fs[2],
                z0.r[0] * Ot + Fs[3],
                z0.r[1] * Ot + Fs[4],
                z0.r[2] * Ot + Fs[5],
              ),
              n.hand("L", A0, Rt),
              n.pose("L", N0, Rt),
              M(
                t.clip.R.pose,
                1.1 * be(Rt, 0.01, 0.08, 0.76 - 0.04, 0.76 + 0.06),
              ),
              St && T(t.clip.L.pose, be(Mt, 0, 0.05, 0.12, 0.22)));
          },
        );
      return (
        (mt.releaseT = 0.27),
        (mt.holdFrom = 0.92),
        (mt.returnT = 0.3),
        mt
      );
    })();
  ((o.clips = {
    fire: p0,
    pump: t0,
    reloadStart: L0,
    reloadShell: pt,
    reloadEnd: r0,
    draw: d0,
    first: j,
    holster: s0,
    inspect: l0,
    melee: E0,
    throw: X,
    k9: N,
  }),
    (o.loadPose = {
      pos: M0,
      rot: f0,
    }),
    (o.setDry = (rt) => {
      ((n0.need = !!rt), (n0.end = !!rt));
    }));
  let q = {
    pos: Yl(0, 0, 0),
    rot: new Euler(),
  };
  o.resetPose = () => {
    (n.begin(q),
      o.anchors.eject.copy(G),
      o.anchors.ejectDir.copy(K),
      t.flush(null));
  };
  let o0 = o.root,
    h0 = new Float32Array(Ui),
    y0 = new Float32Array(Ui);
  for (let rt = 0; rt < Ui; rt++)
    ((h0[rt] = f[rt] - e.pump.pose[rt]), (y0[rt] = u[rt] - e.fire.pose[rt]));
  let D = {
      has: !1,
      p: new V1(),
      v: new V1(),
      q: new Ku(),
      t: 0,
      shot: 9,
      regrip: 9,
      sprinting: !1,
      aiming: !1,
      firm: 9,
      idle: 0,
      fidget: 9,
      nextFidget: 6.5,
      kind: 0,
      rattle: 0,
      rattleV: 0,
      jolted: 9,
      sw: [
        {
          th: 0,
          w: 0,
          part: s.swivelF,
          len: 0.0066,
        },
        {
          th: 0,
          w: 0,
          part: s.swivelR,
          len: 0.0078,
        },
      ],
    },
    W = new Matrix4(),
    Y = new V1(),
    R0 = new V1(),
    U0 = new V1(),
    $0 = new Ku(),
    g0 = new Ku(),
    G0 = new V1(),
    K0 = new V1(),
    it = new Float32Array(Ui),
    ft = new Float32Array(Ui),
    gt = (rt, dt, tt, X0) => {
      let ut = u4[tt];
      for (let z0 = ut[0]; z0 < ut[1]; z0++) rt[z0] += dt[z0] * X0;
    };
  ((o.update = (rt, dt = {}) => {
    let tt = dt.trigger != null ? dt.trigger : 0,
      X0 = t.touched,
      ut = dt.ads || 0,
      z0 = t.clip.R,
      I0 = t.clip.L;
    if (
      ((o.adsK = ut),
      (D.t += rt),
      rt <= 0
        ? (e0.seen = !1)
        : e0.seen
          ? (e0.prev >= 0 && e0.t < e0.prev - 0.2 && o.shellIx++,
            (e0.prev = e0.t),
            (e0.seen = !1),
            (e0.idle = 0))
          : (e0.idle += rt) > 0.5 && ((o.shellIx = 0), (e0.prev = -1)),
      U0.set(0, 0, 0),
      g0.identity(),
      dt.rig)
    ) {
      if (
        (o0.updateWorldMatrix(!0, !1),
        dt.rig.updateWorldMatrix(!0, !1),
        W.copy(dt.rig.matrixWorld).invert().multiply(o0.matrixWorld),
        Y.setFromMatrixPosition(W),
        $0.setFromRotationMatrix(W),
        g0.copy($0).invert(),
        rt > 0 && D.has)
      ) {
        (R0.subVectors(Y, D.p).multiplyScalar(1 / rt),
          U0.subVectors(R0, D.v).multiplyScalar(1 / rt),
          R0.z - D.v.z > 0.5 &&
            tt > 0.2 &&
            D.shot > 0.14 &&
            ((D.shot = 0), (D.rattleV += 3.2)));
        let Pt = U0.length();
        (Pt > 45 && D.jolted > 0.25 && ((D.rattleV += 1.4), (D.jolted = 0)),
          Pt > 40 && U0.multiplyScalar(40 / Pt),
          D.v.copy(R0));
      } else D.v.set(0, 0, 0);
      (D.p.copy(Y), (D.has = rt > 0 || D.has));
    }
    G0.set(-U0.x, -9.81 - U0.y, -U0.z).applyQuaternion(g0);
    {
      let Pt = Math.atan2(-G0.z, -G0.y),
        bt = Math.hypot(G0.y, G0.z);
      for (let Et of D.sw)
        if (Et.part) {
          if (rt > 0) {
            let zt = Math.max(1, Math.ceil(rt / 0.004)),
              J = rt / zt;
            for (let Q = 0; Q < zt; Q++)
              ((Et.w +=
                (-(bt / Et.len) * 0.34 * Math.sin(Et.th - Pt) - 7.5 * Et.w) *
                J),
                (Et.th += Et.w * J),
                Et.th > 1.3
                  ? ((Et.th = 1.3), (Et.w *= -0.3))
                  : Et.th < -1.3 && ((Et.th = -1.3), (Et.w *= -0.3)));
          } else ((Et.th = Math.max(-1.3, Math.min(1.3, Pt))), (Et.w = 0));
          Et.part.quaternion.setFromAxisAngle(Lk, Et.th);
        }
    }
    if (rt > 0) {
      let Pt = Math.max(1, Math.ceil(rt / 0.004)),
        bt = rt / Pt;
      for (let Et = 0; Et < Pt; Et++)
        ((D.rattleV += (-5200 * D.rattle - 26 * D.rattleV) * bt),
          (D.rattle += D.rattleV * bt));
    }
    X0 ||
      (s.lifter.quaternion.identity(),
      s.pump.position.copy(s.pump.userData.rest));
    let vt = t.clip.trig > 0.5,
      wt = vt ? 0 : 0.0012 * vi(D.shot, 0, 1, 90, 28);
    (Math.abs(D.rattle) > 1e-5 &&
      !vt &&
      s.lifter.quaternion.multiply(
        $0.setFromAxisAngle(Lk, Math.max(-0.02, Math.min(0.08, D.rattle))),
      ),
      (s.pump.position.z += wt));
    {
      let Pt = Math.max(tt, t.clip.press);
      Pt > 0.001
        ? s.trigger.quaternion.setFromAxisAngle(Lk, -0.24 * Pt)
        : s.trigger.quaternion.identity();
    }
    if (
      (it.set(z0.pose), ft.set(I0.pose), K0.copy(I0.pos), D.shot < 0.45 && !vt)
    ) {
      let Pt = D.shot,
        bt = be(Pt, 0, 0.012, 0.05, 0.22);
      ((I0.pos.z += S(Pt) + wt), M(z0.pose, bt), T(I0.pose, bt));
    }
    let _t = dt.sprint || 0;
    if (
      (_t > 0.6
        ? (D.sprinting = !0)
        : D.sprinting && _t < 0.3 && ((D.sprinting = !1), (D.regrip = 0)),
      D.regrip < 0.7)
    ) {
      for (let Pt = 0; Pt < 4; Pt++)
        gt(I0.pose, h0, Pt, 0.55 * B5((D.regrip - Pt * 0.05) / 0.36));
      for (let Pt = 1; Pt < 4; Pt++)
        gt(
          z0.pose,
          y0,
          Pt,
          0.38 * B5((D.regrip - 0.08 - (Pt - 1) * 0.045) / 0.32),
        );
      (gt(z0.pose, y0, 4, 0.45 * B5((D.regrip - 0.04) / 0.34)),
        gt(I0.pose, h0, 4, 0.4 * B5((D.regrip - 0.02) / 0.3)));
    }
    if (
      (ut > 0.55 && !D.aiming
        ? ((D.aiming = !0), (D.firm = 0))
        : ut < 0.3 && (D.aiming = !1),
      D.firm < 0.4)
    ) {
      let Pt = be(D.firm, 0, 0.06, 0.12, 0.4) * 0.8;
      (M(z0.pose, Pt), T(I0.pose, Pt));
    }
    if (
      ((D.idle = X0 || ut > 0.3 || tt > 0.1 || _t > 0.3 ? 0 : D.idle + rt),
      D.idle > D.nextFidget &&
        D.fidget > 1.2 &&
        ((D.fidget = 0),
        (D.kind = (D.kind + 1) % 3),
        (D.nextFidget = D.idle + 5.5 + ((D.t * 3.71) % 1) * 4.5)),
      D.idle === 0 && (D.nextFidget = 6.5),
      D.fidget < 0.9)
    ) {
      let Pt = D.fidget;
      if (D.kind === 0) gt(z0.pose, y0, 4, 0.7 * B5(Pt / 0.6));
      else if (D.kind === 1)
        for (let bt = 3; bt >= 1; bt--)
          gt(z0.pose, y0, bt, 0.45 * B5((Pt - (3 - bt) * 0.09) / 0.5));
      else gt(I0.pose, h0, 4, 0.8 * B5(Pt / 0.55));
    }
    (t.update(rt, dt),
      z0.pose.set(it),
      I0.pose.set(ft),
      I0.pos.copy(K0),
      (D.shot += rt),
      (D.regrip += rt),
      (D.firm += rt),
      (D.fidget += rt),
      (D.jolted += rt));
  }),
    (o.showGrip = (rt) => {
      o.resetPose();
      let dt = e[rt],
        tt = t.clip[dt.side];
      (tt.pos.copy(dt.pos),
        tt.quat.copy(dt.quat),
        tt.pose.set(dt.pose),
        dt.part && s[dt.part].userData.hidden && (s[dt.part].visible = !0),
        t.flush(null));
    }),
    o.resetPose());
}

export { TN, buildPistol };

// scene/geometry.js: recovered from the verified GOLDEN HOUR release.
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CylinderGeometry,
  Euler,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Shape,
  ShapeUtils,
  SphereGeometry,
  SplineCurve,
  TorusGeometry,
  Vector2,
  Vector3,
} from "../vendor/three-r180.js";
import {
  TAU,
  clamp,
  createCanvas,
  createNoise,
  createRandom,
  prepareGeometry,
} from "../core/math.js";
import { Vn, a9 } from "../vendor/geometry-utils.js";

var wb = new Vector3();
function ih(o, t, e, s, n, i) {
  let a = (2 * Math.PI * n) / 4,
    r = Math.max(i - 2 * n, 0),
    l = Math.PI / 4;
  (wb.copy(t), (wb[s] = 0), wb.normalize());
  let c = (0.5 * a) / (a + r),
    h = 1 - wb.angleTo(o) / l;
  return Math.sign(wb[e]) === 1 ? h * c : r / (a + r) + c + c * (1 - h);
}
var Ll = class o extends BoxGeometry {
  constructor(t = 1, e = 1, s = 1, n = 2, i = 0.1) {
    let a = n * 2 + 1;
    if (
      ((i = Math.min(t / 2, e / 2, s / 2, i)),
      super(1, 1, 1, a, a, a),
      (this.type = "RoundedBoxGeometry"),
      (this.parameters = {
        width: t,
        height: e,
        depth: s,
        segments: n,
        radius: i,
      }),
      a === 1)
    )
      return;
    let r = this.toNonIndexed();
    ((this.index = null),
      (this.attributes.position = r.attributes.position),
      (this.attributes.normal = r.attributes.normal),
      (this.attributes.uv = r.attributes.uv));
    let l = new Vector3(),
      c = new Vector3(),
      h = new Vector3(t, e, s).divideScalar(2).subScalar(i),
      f = this.attributes.position.array,
      u = this.attributes.normal.array,
      d = this.attributes.uv.array,
      m = f.length / 6,
      p = new Vector3(),
      x = 0.5 / a;
    for (let g = 0, b = 0; g < f.length; g += 3, b += 2)
      switch (
        (l.fromArray(f, g),
        c.copy(l),
        (c.x -= Math.sign(c.x) * x),
        (c.y -= Math.sign(c.y) * x),
        (c.z -= Math.sign(c.z) * x),
        c.normalize(),
        (f[g + 0] = h.x * Math.sign(l.x) + c.x * i),
        (f[g + 1] = h.y * Math.sign(l.y) + c.y * i),
        (f[g + 2] = h.z * Math.sign(l.z) + c.z * i),
        (u[g + 0] = c.x),
        (u[g + 1] = c.y),
        (u[g + 2] = c.z),
        Math.floor(g / m))
      ) {
        case 0:
          (p.set(1, 0, 0),
            (d[b + 0] = ih(p, c, "z", "y", i, s)),
            (d[b + 1] = 1 - ih(p, c, "y", "z", i, e)));
          break;
        case 1:
          (p.set(-1, 0, 0),
            (d[b + 0] = 1 - ih(p, c, "z", "y", i, s)),
            (d[b + 1] = 1 - ih(p, c, "y", "z", i, e)));
          break;
        case 2:
          (p.set(0, 1, 0),
            (d[b + 0] = 1 - ih(p, c, "x", "z", i, t)),
            (d[b + 1] = ih(p, c, "z", "x", i, s)));
          break;
        case 3:
          (p.set(0, -1, 0),
            (d[b + 0] = 1 - ih(p, c, "x", "z", i, t)),
            (d[b + 1] = 1 - ih(p, c, "z", "x", i, s)));
          break;
        case 4:
          (p.set(0, 0, 1),
            (d[b + 0] = 1 - ih(p, c, "x", "y", i, t)),
            (d[b + 1] = 1 - ih(p, c, "y", "x", i, e)));
          break;
        case 5:
          (p.set(0, 0, -1),
            (d[b + 0] = ih(p, c, "x", "y", i, t)),
            (d[b + 1] = 1 - ih(p, c, "y", "x", i, e)));
          break;
      }
  }
  static fromJSON(t) {
    return new o(t.width, t.height, t.depth, t.segments, t.radius);
  }
};
var qa = new Vector3(0, 1, 0);
var cD = new Vector3();
var hD = new Quaternion();
var fD = new Euler();
var ow = new Vector3();
var oo = (o, t) => new Vector2(o, t);
var De = (o, t, e) => new Vector3(o, t, e);
var zs = (o, t, e) => new BoxGeometry(o, t, e);
var Te = (o, t, e, s = 0.008, n = 1) =>
  new Ll(o, t, e, n, Math.min(s, o / 2, t / 2, e / 2));
var ks = (o, t, e, s = 12, n = !1) => new CylinderGeometry(o, t, e, s, 1, n);
var dr = (o, t = 12, e = 8) => new SphereGeometry(o, t, e);
var Sa = (o, t, e = 6, s = 24, n = TAU) => new TorusGeometry(o, t, e, s, n);
var iw = (o, t, e = 1, s = 1) => new PlaneGeometry(o, t, e, s);
var ke = (o, t = 16) =>
  new LatheGeometry(
    o.map((e) => oo(e[0], e[1])),
    t,
  );
function k9(o, t, e) {
  return (
    cD.set(o ? o[0] : 0, o ? o[1] : 0, o ? o[2] : 0),
    fD.set(t ? t[0] : 0, t ? t[1] : 0, t ? t[2] : 0, "YXZ"),
    hD.setFromEuler(fD),
    typeof e == "number"
      ? ow.set(e, e, e)
      : e
        ? ow.set(e[0], e[1], e[2])
        : ow.set(1, 1, 1),
    new Matrix4().compose(cD, hD, ow)
  );
}
function rc(o, t, e) {
  let s = t.clone().normalize(),
    n = e.clone().addScaledVector(s, -e.dot(s));
  (n.lengthSq() < 1e-8 && n.set(1, 0, 0).addScaledVector(s, -s.x),
    n.normalize());
  let i = new Vector3().crossVectors(s, n);
  return new Matrix4().makeBasis(i, s, n).setPosition(o);
}
function Yi(o, t) {
  let e = o.attributes.position,
    s = new Vector3();
  for (let n = 0; n < e.count; n++)
    (s.fromBufferAttribute(e, n), t(s), e.setXYZ(n, s.x, s.y, s.z));
  return (o.computeVertexNormals(), o);
}
function uD(o, t = !1) {
  let e = o.index ? o.toNonIndexed() : o;
  return (
    e.computeVertexNormals(),
    t && e.setIndex([...Array(e.attributes.position.count).keys()]),
    e
  );
}
function pe(o, t = 42) {
  let e = o.index ? o.toNonIndexed() : o,
    s = e.attributes.position.array,
    n = s.length / 9,
    i = new Float32Array(n * 3),
    a = new Float32Array(n * 3),
    r = new Array(n * 3),
    l = new Map();
  for (let f = 0; f < n; f++) {
    let u = f * 9,
      d = s[u + 3] - s[u],
      m = s[u + 4] - s[u + 1],
      p = s[u + 5] - s[u + 2],
      x = s[u + 6] - s[u],
      g = s[u + 7] - s[u + 1],
      b = s[u + 8] - s[u + 2],
      v = m * b - p * g,
      y = p * x - d * b,
      M = d * g - m * x,
      w = Math.hypot(v, y, M) || 1;
    ((i[f * 3] = v),
      (i[f * 3 + 1] = y),
      (i[f * 3 + 2] = M),
      (a[f * 3] = v / w),
      (a[f * 3 + 1] = y / w),
      (a[f * 3 + 2] = M / w));
    for (let T = 0; T < 3; T++) {
      let S = u + T * 3,
        E =
          Math.round(s[S] * 2e4) +
          "," +
          Math.round(s[S + 1] * 2e4) +
          "," +
          Math.round(s[S + 2] * 2e4);
      r[f * 3 + T] = E;
      let _ = l.get(E);
      (_ || l.set(E, (_ = [])), _.push(f));
    }
  }
  let c = Math.cos((t * Math.PI) / 180),
    h = new Float32Array(n * 9);
  for (let f = 0; f < n; f++)
    for (let u = 0; u < 3; u++) {
      let d = l.get(r[f * 3 + u]),
        m = 0,
        p = 0,
        x = 0;
      for (let v = 0; v < d.length; v++) {
        let y = d[v];
        (y !== f &&
          a[f * 3] * a[y * 3] +
            a[f * 3 + 1] * a[y * 3 + 1] +
            a[f * 3 + 2] * a[y * 3 + 2] <
            c) ||
          ((m += i[y * 3]), (p += i[y * 3 + 1]), (x += i[y * 3 + 2]));
      }
      let g = Math.hypot(m, p, x) || 1,
        b = f * 9 + u * 3;
      ((h[b] = m / g), (h[b + 1] = p / g), (h[b + 2] = x / g));
    }
  return (e.setAttribute("normal", new BufferAttribute(h, 3)), e);
}
function C9(o, t, e = 0.01, s = 8, n = 1) {
  return new ExtrudeGeometry(o, {
    depth: t,
    bevelEnabled: e > 0,
    bevelThickness: e,
    bevelSize: e,
    bevelSegments: n,
    curveSegments: s,
    steps: 1,
  });
}
var Wm = (o, t, e, s) =>
  C9(o, t, e, s)
    .rotateY(-Math.PI / 2)
    .translate(t / 2, 0, 0);
function fi(o, t, e = 0.004, s = 10, n = 2) {
  let i = Math.min(e, t / 2 - 1e-4),
    a = new ExtrudeGeometry(o, {
      depth: t - 2 * i,
      bevelEnabled: i > 0,
      bevelThickness: i,
      bevelSize: i,
      bevelOffset: -i,
      bevelSegments: n,
      curveSegments: s,
      steps: 1,
    });
  return pe(a.translate(0, 0, i).rotateX(-Math.PI / 2), 50);
}
function Fr(o, t, e = 0.004, s = 10, n = 2) {
  let i = Math.min(e, t / 2 - 1e-4),
    a = new ExtrudeGeometry(o, {
      depth: t - 2 * i,
      bevelEnabled: i > 0,
      bevelThickness: i,
      bevelSize: i,
      bevelOffset: -i,
      bevelSegments: n,
      curveSegments: s,
      steps: 1,
    });
  return pe(a.translate(0, 0, i), 50);
}
function ui(o, t, e) {
  let s = new Shape(),
    n = -o / 2,
    i = -t / 2;
  return (
    (e = Math.min(e, o / 2, t / 2)),
    s.moveTo(n + e, i),
    s.lineTo(n + o - e, i),
    s.absarc(n + o - e, i + e, e, -Math.PI / 2, 0, !1),
    s.lineTo(n + o, i + t - e),
    s.absarc(n + o - e, i + t - e, e, 0, Math.PI / 2, !1),
    s.lineTo(n + e, i + t),
    s.absarc(n + e, i + t - e, e, Math.PI / 2, Math.PI, !1),
    s.lineTo(n, i + e),
    s.absarc(n + e, i + e, e, Math.PI, Math.PI * 1.5, !1),
    s
  );
}
function dD(o, t, e = 16) {
  let s = new SplineCurve(o.map((a) => oo(a[0], a[1]))),
    n = [],
    i = [];
  for (let a = 0; a <= e; a++) {
    let r = a / e,
      l = s.getPoint(r),
      c = s.getTangent(r);
    (n.push(oo(l.x - (c.y * t) / 2, l.y + (c.x * t) / 2)),
      i.push(oo(l.x + (c.y * t) / 2, l.y - (c.x * t) / 2)));
  }
  return new Shape([...n, ...i.reverse()]);
}
var aw = (o) => (o.isVector3 ? o.clone() : De(o[0], o[1], o[2]));
function Bj(o, t = 0.02, e = 4, s = !1) {
  let n = o.map(aw),
    i = [],
    a = n.length;
  for (let r = 0; r < a; r++) {
    let l = n[r];
    if (!s && (r === 0 || r === a - 1)) {
      i.push(l.clone());
      continue;
    }
    let c = n[(r - 1 + a) % a],
      h = n[(r + 1) % a],
      f = c.clone().sub(l),
      u = h.clone().sub(l),
      d = f.length(),
      m = u.length();
    (f.multiplyScalar(1 / d), u.multiplyScalar(1 / m));
    let p = Math.acos(clamp(f.dot(u), -1, 1));
    if (p > Math.PI - 0.02) {
      i.push(l.clone());
      continue;
    }
    let x = Math.min(t / Math.tan(p / 2), d * 0.49, m * 0.49),
      g = l.clone().addScaledVector(f, x),
      b = l.clone().addScaledVector(u, x);
    for (let v = 0; v <= e; v++) {
      let y = v / e,
        M = (1 - y) * (1 - y),
        w = 2 * y * (1 - y),
        T = y * y;
      i.push(
        De(
          g.x * M + l.x * w + b.x * T,
          g.y * M + l.y * w + b.y * T,
          g.z * M + l.z * w + b.z * T,
        ),
      );
    }
  }
  return i;
}
function ra(o, t = 16, e = !1) {
  let n = new CatmullRomCurve3(o.map(aw), e, "centripetal").getPoints(t);
  return (e && n.pop(), n);
}
function Qo(o, t = 0.01, e = 6, s = !1, n = !0) {
  let i = o.map(aw),
    a = i.length,
    r = [],
    l = [],
    c = [],
    h = [],
    f = [];
  for (let x = 0; x < a; x++) {
    let g = i[s ? (x - 1 + a) % a : Math.max(0, x - 1)],
      b = i[s ? (x + 1) % a : Math.min(a - 1, x + 1)];
    c.push(b.clone().sub(g).normalize());
  }
  let u = Math.abs(c[0].y) < 0.9 ? De(0, 1, 0) : De(1, 0, 0);
  h.push(u.addScaledVector(c[0], -u.dot(c[0])).normalize());
  let d = new Quaternion();
  for (let x = 1; x < a; x++)
    (d.setFromUnitVectors(c[x - 1], c[x]),
      h.push(h[x - 1].clone().applyQuaternion(d).normalize()));
  if (s) {
    d.setFromUnitVectors(c[a - 1], c[0]);
    let x = h[a - 1].clone().applyQuaternion(d),
      g = new Vector3().crossVectors(c[0], h[0]),
      b = Math.atan2(x.dot(g), x.dot(h[0]));
    for (let v = 1; v < a; v++) h[v].applyAxisAngle(c[v], (-b * v) / a);
  }
  for (let x = 0; x < a; x++) f.push(new Vector3().crossVectors(c[x], h[x]));
  for (let x = 0; x < a; x++) {
    let g = typeof t == "function" ? t(x, x / (a - 1)) : t;
    for (let b = 0; b < e; b++) {
      let v = (b / e) * TAU,
        y = Math.cos(v) * g,
        M = Math.sin(v) * g;
      r.push(
        i[x].x + h[x].x * y + f[x].x * M,
        i[x].y + h[x].y * y + f[x].y * M,
        i[x].z + h[x].z * y + f[x].z * M,
      );
    }
  }
  let m = s ? a : a - 1;
  for (let x = 0; x < m; x++)
    for (let g = 0; g < e; g++) {
      let b = x * e + g,
        v = x * e + ((g + 1) % e),
        y = ((x + 1) % a) * e + g,
        M = ((x + 1) % a) * e + ((g + 1) % e);
      l.push(b, v, y, v, M, y);
    }
  if (!s && n) {
    let x = r.length / 3;
    r.push(i[0].x, i[0].y, i[0].z);
    let g = x + 1;
    r.push(i[a - 1].x, i[a - 1].y, i[a - 1].z);
    for (let b = 0; b < e; b++)
      (l.push(x, (b + 1) % e, b),
        l.push(g, (a - 1) * e + b, (a - 1) * e + ((b + 1) % e)));
  }
  let p = new BufferGeometry();
  return (
    p.setAttribute("position", new Float32BufferAttribute(r, 3)),
    p.setIndex(l),
    p.computeVertexNormals(),
    n && !s ? pe(p, 60) : p
  );
}
var lc = (o, t, e = 0.03, s = 8, n = !1, i = 5) => Qo(Bj(o, e, i, n), t, s, n);
function _i(
  o,
  t,
  {
    closed: e = !0,
    up: s = qa,
    profClosed: n = !0,
    deg: i = 40,
    caps: a = !0,
  } = {},
) {
  let r = t.map(aw),
    l = r.length,
    c = o.length,
    h = [],
    f = [],
    u = s.clone().normalize(),
    d = new Vector3(),
    m = new Vector3(),
    p = new Vector3(),
    x = new Vector3(),
    g = new Vector3();
  for (let M = 0; M < l; M++) {
    let w = e || M > 0,
      T = e || M < l - 1;
    (w && d.subVectors(r[M], r[(M - 1 + l) % l]).normalize(),
      T && m.subVectors(r[(M + 1) % l], r[M]).normalize(),
      w || d.copy(m),
      T || m.copy(d),
      p.crossVectors(d, u).normalize(),
      x.crossVectors(m, u).normalize(),
      g.addVectors(p, x).normalize());
    let S = 1 / Math.max(0.3, g.dot(p));
    for (let [E, _] of o)
      h.push(
        r[M].x + g.x * E * S + u.x * _,
        r[M].y + g.y * E * S + u.y * _,
        r[M].z + g.z * E * S + u.z * _,
      );
  }
  let b = e ? l : l - 1,
    v = n ? c : c - 1;
  for (let M = 0; M < b; M++)
    for (let w = 0; w < v; w++) {
      let T = M * c + w,
        S = M * c + ((w + 1) % c),
        E = ((M + 1) % l) * c + w,
        _ = ((M + 1) % l) * c + ((w + 1) % c);
      f.push(T, S, E, S, _, E);
    }
  if (!e && a && n) {
    let M = ShapeUtils.triangulateShape(
      o.map((w) => oo(w[0], w[1])),
      [],
    );
    for (let w of M)
      (f.push(w[0], w[1], w[2]),
        f.push((l - 1) * c + w[2], (l - 1) * c + w[1], (l - 1) * c + w[0]));
  }
  let y = new BufferGeometry();
  return (
    y.setAttribute("position", new Float32BufferAttribute(h, 3)),
    y.setIndex(f),
    (y = y.toNonIndexed()),
    Eb(y) < 0 && q2(y),
    pe(y, i)
  );
}
function Dl(o, t, e, s = 40) {
  let n = [
    [-o / 2, -t / 2, 0],
    [o / 2, -t / 2, 0],
    [o / 2, t / 2, 0],
    [-o / 2, t / 2, 0],
  ];
  return _i(
    e.map(([i, a]) => [-i, a]),
    n,
    {
      closed: !0,
      up: De(0, 0, 1),
      deg: s,
    },
  );
}
function di(o, t, e, s = 0, n = 5, i = "xz") {
  let a = o / 2 - e,
    r = t / 2 - e,
    l = [];
  for (let c = 0; c < 4; c++) {
    let h = c === 0 || c === 3 ? a : -a,
      f = c < 2 ? r : -r;
    for (let u = 0; u <= n; u++) {
      let d = ((c + u / n) * Math.PI) / 2,
        m = h + Math.cos(d) * e,
        p = f + Math.sin(d) * e;
      l.push(i === "xz" ? De(m, s, p) : i === "xy" ? De(m, p, s) : De(s, p, m));
    }
  }
  return l;
}
var P9 = (o, t = 0, e = 24) =>
  Array.from(
    {
      length: e,
    },
    (s, n) => De(Math.sin((n / e) * TAU) * o, t, Math.cos((n / e) * TAU) * o),
  );
function Eb(o) {
  let t = o.attributes.position.array,
    e = 0;
  for (let s = 0; s < t.length; s += 9)
    e +=
      t[s] * (t[s + 4] * t[s + 8] - t[s + 5] * t[s + 7]) -
      t[s + 1] * (t[s + 3] * t[s + 8] - t[s + 5] * t[s + 6]) +
      t[s + 2] * (t[s + 3] * t[s + 7] - t[s + 4] * t[s + 6]);
  return e / 6;
}
function q2(o) {
  for (let t of ["position", "normal", "uv"]) {
    let e = o.attributes[t];
    if (!e) continue;
    let s = e.itemSize,
      n = e.array;
    for (let i = 0; i < n.length; i += s * 3)
      for (let a = 0; a < s; a++) {
        let r = n[i + s + a];
        ((n[i + s + a] = n[i + 2 * s + a]), (n[i + 2 * s + a] = r));
      }
  }
  return o;
}
function cu(o) {
  let t = o.index ? o : a9(o),
    e = t.clone(),
    s = e.index.array,
    n = e.attributes.normal.array;
  for (let i = 0; i < s.length; i += 3) {
    let a = s[i + 1];
    ((s[i + 1] = s[i + 2]), (s[i + 2] = a));
  }
  for (let i = 0; i < n.length; i++) n[i] = -n[i];
  return Vn([t, e], !1);
}
function Jo(o, t, e, s = {}) {
  let n = [o / 2, t / 2, e / 2],
    i = Math.min(s.r ?? 0.03, n[0] * 0.98, n[1] * 0.98, n[2] * 0.98),
    a = typeof s.seg == "number" ? [s.seg, s.seg, s.seg] : s.seg || [6, 3, 6],
    r = Math.max(1, Math.round((s.arc || 2) / 2)),
    l = [0, 1, 2].map((S) => {
      let E = [],
        _ = n[S] - i,
        R = Math.max(1, a[S]);
      for (let C = r; C >= 1; C--)
        E.push(-(_ + i * Math.tan(((Math.PI / 4) * C) / r)));
      for (let C = 0; C <= R; C++) E.push(-_ + (2 * _ * C) / R);
      for (let C = 1; C <= r; C++)
        E.push(_ + i * Math.tan(((Math.PI / 4) * C) / r));
      return E;
    }),
    c = l.map((S) => S.length - 1),
    h = new BoxGeometry(1, 1, 1, c[0], c[1], c[2]);
  (h.deleteAttribute("normal"), h.deleteAttribute("uv"), (h = a9(h, 1e-4)));
  let f = s.crown || 0,
    u =
      typeof f == "number"
        ? [0, 0, f, f, 0, 0]
        : Array.isArray(f)
          ? [f[0], f[0], f[1], f[1], f[2], f[2]]
          : [f.px || 0, f.nx || 0, f.py || 0, f.ny || 0, f.pz || 0, f.nz || 0],
    d = s.plateau || 2.4,
    m = s.lump || 0,
    p = s.lumpScale || 7,
    x = m ? createNoise(s.seed || 7) : null,
    g = h.attributes.position,
    b = [0, 0, 0],
    v = [0, 0, 0],
    y = [0, 0, 0],
    M = new Vector3(),
    w = new Vector3(),
    T = [0, 0, 0];
  for (let S = 0; S < g.count; S++) {
    let E = [g.getX(S), g.getY(S), g.getZ(S)],
      _ = 0;
    for (let R = 0; R < 3; R++)
      ((b[R] = l[R][Math.round((E[R] + 0.5) * c[R])]),
        (v[R] = clamp(b[R], -(n[R] - i), n[R] - i)),
        (_ += (b[R] - v[R]) ** 2));
    _ = Math.sqrt(_) || 1;
    for (let R = 0; R < 3; R++)
      ((y[R] = (b[R] - v[R]) / _),
        (b[R] = v[R] + y[R] * i),
        (T[R] = b[R] / n[R]));
    for (let R = 0; R < 3; R++) {
      let C = y[R] >= 0 ? u[R * 2] : u[R * 2 + 1];
      if (!C) continue;
      let L = (R + 1) % 3,
        A = (R + 2) % 3,
        O = y[R] * y[R];
      b[R] +=
        Math.sign(y[R]) *
        C *
        O *
        (1 - Math.pow(Math.abs(T[L]), d)) *
        (1 - Math.pow(Math.abs(T[A]), d));
    }
    if (
      (M.set(b[0], b[1], b[2]),
      w.set(y[0], y[1], y[2]),
      s.sculpt && s.sculpt(M, w, T),
      x)
    ) {
      let R =
        (x.fbm(M.x * p + M.z * p * 0.63 + 11, M.y * p - M.z * p * 0.41 + 5, 3) -
          0.5) *
        2 *
        m;
      M.addScaledVector(w, R);
    }
    g.setXYZ(S, M.x, M.y, M.z);
  }
  return (h.computeVertexNormals(), h);
}
function Id(o, t, e, s, n = "tb", i = 0.0045, a = 4, r = 5, l = 0.55) {
  let c = [o / 2, t / 2, e / 2],
    h = Math.SQRT1_2,
    f = [];
  s = Math.min(s, c[0] * 0.98, c[1] * 0.98, c[2] * 0.98);
  for (let u of n) {
    let d = "rltbfk".indexOf(u) >> 1,
      m = "rltbfk".indexOf(u) % 2 ? -1 : 1,
      p = (d + 1) % 3,
      x = (d + 2) % 3,
      g = [];
    for (let b = 0; b < 4; b++) {
      let v = (b === 0 || b === 3 ? 1 : -1) * (c[p] - s),
        y = (b < 2 ? 1 : -1) * (c[x] - s);
      for (let M = 0; M <= a; M++) {
        let w = ((b + M / a) * Math.PI) / 2,
          T = [0, 0, 0],
          S = s + i * l;
        ((T[d] = m * (c[d] - s + S * h)),
          (T[p] = v + Math.cos(w) * S * h),
          (T[x] = y + Math.sin(w) * S * h),
          g.push(De(T[0], T[1], T[2])));
      }
    }
    f.push(Qo(g, i, r, !0));
  }
  return f.length > 1 ? Vn(f, !1) : f[0];
}
var rw = (o, t, e, s) => {
  let n = 0;
  for (let i of e) {
    let a = ((o - i[0]) ** 2 + (t - i[1]) ** 2) / (s * s);
    a < 4 && (n = Math.max(n, Math.exp(-a * 1.6)));
  }
  return n;
};
var lw = (o, t, e = 0.6) => Math.pow(Math.abs(Math.sin((Math.PI * o) / t)), e);
function pD(
  o,
  t,
  e,
  {
    seg: s = 8,
    pinch: n = 0.05,
    plump: i = 2.2,
    lump: a = 0.004,
    seed: r = 3,
  } = {},
) {
  let l = s + 1,
    c = [],
    h = [],
    f = createNoise(r),
    u = new Int32Array(l * l),
    d = (b, v, y) => {
      let M = Math.sin((((b / s) * 2 - 1) * Math.PI) / 2),
        w = Math.sin((((v / s) * 2 - 1) * Math.PI) / 2),
        T =
          Math.pow(1 - Math.pow(Math.abs(M), i), 0.62) *
          Math.pow(1 - Math.pow(Math.abs(w), i), 0.62),
        S = (f.fbm(M * 2.3 + 9 + y * 3, w * 2.3 + 4, 3) - 0.5) * 2 * a;
      return (
        c.push(
          ((M * o) / 2) * (1 - n * (1 - w * w)),
          ((w * t) / 2) * (1 - n * (1 - M * M)),
          y * (e / 2 + S) * T,
        ),
        c.length / 3 - 1
      );
    },
    m = [];
  for (let b = 0; b < l; b++) for (let v = 0; v < l; v++) m.push(d(v, b, 1));
  for (let b = 0; b < l; b++)
    for (let v = 0; v < l; v++)
      u[b * l + v] =
        v === 0 || b === 0 || v === s || b === s ? m[b * l + v] : d(v, b, -1);
  for (let b = 0; b < s; b++)
    for (let v = 0; v < s; v++) {
      let y = b * l + v,
        M = y + 1,
        w = y + l,
        T = w + 1;
      (h.push(m[y], m[M], m[w], m[M], m[T], m[w]),
        h.push(u[y], u[w], u[M], u[M], u[w], u[T]));
    }
  let p = new BufferGeometry();
  (p.setAttribute("position", new Float32BufferAttribute(c, 3)),
    p.setIndex(h),
    p.computeVertexNormals());
  let x = [],
    g = (b, v) => {
      let y = m[v * l + b] * 3;
      return De(c[y], c[y + 1], c[y + 2]);
    };
  for (let b = 0; b < s; b++) x.push(g(b, 0));
  for (let b = 0; b < s; b++) x.push(g(s, b));
  for (let b = s; b > 0; b--) x.push(g(b, s));
  for (let b = s; b > 0; b--) x.push(g(0, b));
  return ((p.userData.edge = x), p);
}
function Uj(o, t) {
  let e = o.attributes.position.array,
    s = o.attributes.uv.array;
  for (let n = 0, i = 0; n < e.length; n += 9, i += 6) {
    let a = e[n + 3] - e[n],
      r = e[n + 4] - e[n + 1],
      l = e[n + 5] - e[n + 2],
      c = e[n + 6] - e[n],
      h = e[n + 7] - e[n + 1],
      f = e[n + 8] - e[n + 2],
      u = Math.abs(r * f - l * h),
      d = Math.abs(l * c - a * f),
      m = Math.abs(a * h - r * c),
      p = u >= d && u >= m ? 0 : d >= m ? 1 : 2;
    for (let x = 0; x < 3; x++) {
      let g = e[n + x * 3],
        b = e[n + x * 3 + 1],
        v = e[n + x * 3 + 2],
        y,
        M;
      (p === 0
        ? t === "y"
          ? ((y = b), (M = v))
          : ((y = v), (M = b))
        : p === 1
          ? t === "z"
            ? ((y = v), (M = g))
            : ((y = g), (M = v))
          : t === "y"
            ? ((y = b), (M = g))
            : ((y = g), (M = b)),
        (s[i + x * 2] = y),
        (s[i + x * 2 + 1] = M));
    }
  }
}
function Vj(o) {
  let t = prepareGeometry(o.geo.clone());
  if (
    (o.m && (t.applyMatrix4(o.m), o.m.determinant() < 0 && q2(t)),
    o.uv !== !0 &&
      (Uj(t, typeof o.uv == "string" ? o.uv : null), Array.isArray(o.uv)))
  ) {
    let e = t.attributes.uv.array;
    for (let s = 0; s < e.length; s += 2)
      ((e[s] += o.uv[0]), (e[s + 1] += o.uv[1]));
  }
  return t;
}
function Gj() {
  let o = [],
    t = [],
    e = {
      parts: o,
      keeps: t,
      cast: !0,
      add(s, n, i, a, r, l) {
        return (
          o.push({
            geo: s,
            mat: n,
            m: k9(i, a, r),
            uv: l,
          }),
          e
        );
      },
      addM(s, n, i, a) {
        return (
          o.push({
            geo: s,
            mat: n,
            m: i || new Matrix4(),
            uv: a,
          }),
          e
        );
      },
      rod(s, n, i, a, r = 8, l = a, c) {
        let h = De(n[0], n[1], n[2]),
          f = De(i[0], i[1], i[2]),
          u = f.clone().sub(h),
          d = u.length(),
          m = new Quaternion().setFromUnitVectors(qa, u.normalize());
        return (
          o.push({
            geo: ks(l, a, d, r),
            mat: s,
            m: new Matrix4().compose(
              h.add(f).multiplyScalar(0.5),
              m,
              De(1, 1, 1),
            ),
            uv: c,
          }),
          e
        );
      },
      keep(s, n, i, a, r, l, c = {}) {
        return (
          t.push({
            name: s,
            geo: n,
            mat: i,
            m: c.m || k9(a, r, l),
            uv: c.uv,
            clone: c.clone !== !1,
          }),
          e
        );
      },
      at(s, n, i, a) {
        typeof n == "function"
          ? ((a = n), (n = null), (i = null))
          : typeof i == "function" && ((a = i), (i = null));
        let r = s && s.isMatrix4 ? s : k9(s, n, i),
          l = o.length,
          c = t.length;
        a(e);
        for (let h = l; h < o.length; h++) o[h].m = r.clone().multiply(o[h].m);
        for (let h = c; h < t.length; h++) t[h].m = r.clone().multiply(t[h].m);
        return e;
      },
      shift(s, n, i) {
        let a = new Matrix4().makeTranslation(s, n, i);
        for (let r of [...o, ...t]) r.m = a.clone().multiply(r.m);
        return e;
      },
    };
  return e;
}
function Wj(o, t) {
  let e = (n, i) => {
      let a = new Map();
      for (let r of n) {
        let l = i(r);
        (a.has(l) ||
          a.set(l, {
            first: r,
            geos: [],
          }),
          a.get(l).geos.push(Vj(r)));
      }
      return [...a.values()].map(({ first: r, geos: l }) => {
        let c = l.length > 1 ? Vn(l, !1) : l[0];
        if (l.length > 1) for (let h of l) h.dispose();
        return (
          c.computeBoundingSphere(),
          c.computeBoundingBox(),
          {
            geometry: c,
            material: r.mat,
            name: r.name,
            clone: r.clone,
          }
        );
      });
    },
    s = {
      meshes: e(o.parts, (n) => n.mat.uuid),
      keeps: e(o.keeps, (n) => n.name + "|" + n.mat.uuid),
      ud: t,
      cast: o.cast,
      tris: 0,
    };
  for (let n of [...s.meshes, ...s.keeps])
    s.tris += n.geometry.attributes.position.count / 3;
  return s;
}
function qj(o) {
  let t = new Group();
  t.name = o.ud.kind;
  for (let s of o.meshes) {
    let n = new Mesh(s.geometry, s.material);
    ((n.castShadow = o.cast && !s.material.transparent),
      (n.receiveShadow = !0),
      t.add(n));
  }
  for (let s of o.keeps) {
    let n = new Mesh(s.geometry, s.clone ? s.material.clone() : s.material);
    ((n.name = s.name),
      (n.userData.keep = !0),
      (n.castShadow = !1),
      (n.receiveShadow = !1),
      t.add(n));
  }
  let e = o.ud;
  return (
    (t.userData = {
      ...e,
      size: [...e.size],
      tris: o.tris,
      colliders: e.colliders.map((s) => ({
        min: [...s.min],
        max: [...s.max],
      })),
      light: e.light
        ? {
            ...e.light,
            pos: [...e.light.pos],
          }
        : void 0,
    }),
    t
  );
}
var $s = (o, t, e, s, n, i) => ({
  min: [o, t, e],
  max: [s, n, i],
});
var rs = (o, t, e = {}) => ({
  kind: o,
  size: t,
  colliders: [],
  surf: "wood",
  dynamic: !1,
  mass: 10,
  breakable: null,
  ...e,
});
function ll(
  o,
  { srgb: t = !0, tile: e = null, aniso: s = 8, repeatU: n = !1 } = {},
) {
  let i = new CanvasTexture(o);
  if ((t && (i.colorSpace = SRGBColorSpace), (i.anisotropy = s), e)) {
    let a = Array.isArray(e) ? e[0] : e,
      r = Array.isArray(e) ? e[1] : e;
    ((i.wrapS = i.wrapT = RepeatWrapping), i.repeat.set(1 / a, 1 / r));
  }
  return (n && (i.wrapS = RepeatWrapping), i);
}
var hu = (o, t, e, s, n, i) => [o / n, 1 - (t + s) / i, (o + e) / n, 1 - t / i];
function cc(o, t, e = [0, 0, 1, 1], s = 1, n = 1) {
  let i = new PlaneGeometry(o, t, s, n),
    a = i.attributes.uv;
  for (let r = 0; r < a.count; r++)
    a.setXY(
      r,
      e[0] + (e[2] - e[0]) * a.getX(r),
      e[1] + (e[3] - e[1]) * a.getY(r),
    );
  return i;
}
function Hd(o, t = 2, e = !0) {
  let s = o.width,
    n = o.height,
    i = o.getContext("2d").getImageData(0, 0, s, n).data,
    a = createCanvas(s, n),
    r = a.getContext("2d"),
    l = r.createImageData(s, n),
    c = l.data,
    h = (f, u) => (
      e
        ? ((f = (f + s) % s), (u = (u + n) % n))
        : ((f = clamp(f, 0, s - 1)), (u = clamp(u, 0, n - 1))),
      i[(u * s + f) * 4] / 255
    );
  for (let f = 0; f < n; f++)
    for (let u = 0; u < s; u++) {
      let d = (h(u + 1, f) - h(u - 1, f)) * t,
        m = (h(u, f + 1) - h(u, f - 1)) * t,
        p = 1 / Math.hypot(d, m, 1),
        x = (f * s + u) * 4;
      ((c[x] = (-d * p * 0.5 + 0.5) * 255),
        (c[x + 1] = (m * p * 0.5 + 0.5) * 255),
        (c[x + 2] = (p * 0.5 + 0.5) * 255),
        (c[x + 3] = 255));
    }
  return (r.putImageData(l, 0, 0), a);
}
function Kj(o = 1024) {
  let t = createRandom(91),
    e = createCanvas(o, o),
    s = e.getContext("2d"),
    n = 118,
    i = o / n;
  ((s.fillStyle = "#2a2a2a"),
    s.fillRect(0, 0, o, o),
    (s.globalCompositeOperation = "lighten"));
  for (let l = 0; l < n; l++)
    for (let c = 0; c < n; c++) {
      let h = (c + 0.5 + (t() - 0.5) * 0.95) * i,
        f = (l + 0.5 + (t() - 0.5) * 0.95) * i,
        u = i * (0.62 + t() * 0.5),
        d = (150 + t() * 100) | 0;
      for (let m of h < u ? [0, o] : h > o - u ? [0, -o] : [0])
        for (let p of f < u ? [0, o] : f > o - u ? [0, -o] : [0]) {
          let x = s.createRadialGradient(
            h + m,
            f + p,
            u * 0.15,
            h + m,
            f + p,
            u,
          );
          (x.addColorStop(0, `rgb(${d},${d},${d})`),
            x.addColorStop(
              0.55,
              `rgb(${(d * 0.86) | 0},${(d * 0.86) | 0},${(d * 0.86) | 0})`,
            ),
            x.addColorStop(1, "rgb(20,20,20)"),
            (s.fillStyle = x),
            s.beginPath(),
            s.ellipse(
              h + m,
              f + p,
              u,
              u * (0.8 + t() * 0.3),
              t() * 3.14,
              0,
              TAU,
            ),
            s.fill());
        }
    }
  s.globalCompositeOperation = "multiply";
  for (let l = 0; l < 46; l++) {
    let c = t() * o,
      h = t() * o,
      f = t() * TAU,
      u = 40 + t() * 150,
      d = 1.2 + t() * 2.2;
    for (let m of [-o, 0, o])
      for (let p of [-o, 0, o]) {
        let x = c + m,
          g = h + p,
          b = f,
          v = createRandom(l * 13 + 5);
        ((s.strokeStyle = `rgba(60,60,60,${0.35 + t() * 0.3})`),
          (s.lineWidth = d),
          (s.lineCap = "round"),
          s.beginPath(),
          s.moveTo(x, g));
        for (let y = 0; y < u; y += 8)
          ((b += (v() - 0.5) * 0.5),
            (x += Math.cos(b) * 8),
            (g += Math.sin(b) * 8),
            s.lineTo(x, g));
        s.stroke();
      }
  }
  s.globalCompositeOperation = "source-over";
  let a = createCanvas(o, o),
    r = a.getContext("2d");
  (r.drawImage(e, 0, 0),
    (r.globalCompositeOperation = "difference"),
    (r.fillStyle = "#fff"),
    r.fillRect(0, 0, o, o),
    (r.globalCompositeOperation = "source-over"),
    (r.fillStyle = "rgba(172,172,172,0.72)"),
    r.fillRect(0, 0, o, o));
  for (let l = 0; l < 60; l++) {
    let c = t() * o,
      h = t() * o,
      f = 60 + t() * 160,
      u = r.createRadialGradient(c, h, 0, c, h, f),
      d = t() < 0.5 ? 255 : 60;
    (u.addColorStop(0, `rgba(${d},${d},${d},0.07)`),
      u.addColorStop(1, `rgba(${d},${d},${d},0)`),
      (r.fillStyle = u),
      r.fillRect(c - f, h - f, 2 * f, 2 * f));
  }
  return {
    normalMap: ll(Hd(e, 2.2), {
      srgb: !1,
      tile: 0.3,
    }),
    roughnessMap: ll(a, {
      srgb: !1,
      tile: 0.3,
    }),
  };
}

export {
  $s,
  C9,
  De,
  Dl,
  Eb,
  Fr,
  Gj,
  Hd,
  Id,
  Jo,
  Kj,
  Ll,
  P9,
  Qo,
  Sa,
  Te,
  Wj,
  Wm,
  Yi,
  _i,
  cc,
  cu,
  dD,
  di,
  dr,
  fi,
  hu,
  iw,
  ke,
  ks,
  lc,
  ll,
  lw,
  oo,
  pD,
  pe,
  q2,
  qa,
  qj,
  ra,
  rc,
  rs,
  rw,
  uD,
  ui,
  zs,
};

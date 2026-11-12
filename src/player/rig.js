// player/rig.js: recovered from the verified GOLDEN HOUR release.
import { createNoise } from "../core/math.js";
import {
  Bone,
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  Euler,
  Float32BufferAttribute,
  Group,
  Matrix3,
  Matrix4,
  Quaternion,
  Skeleton,
  SkinnedMesh,
  SphereGeometry,
  Uint16BufferAttribute,
  Uint32BufferAttribute,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";
import { Ll } from "../scene/geometry.js";
import { $I, Kg, Wg, XI, ZI, ep, jI, qg, r5 } from "./hands/mesh.js";

var $Z = createNoise(5519);
var kR = Math.PI * 2;
var dE = new Vector3();
var pE = new Vector3();
var $b = new Color();
var QI = new Matrix3();
var xE = () => ({
  p: [],
  n: [],
  uv: [],
  idx: [],
});
var Zb = [];
function np(
  o,
  t,
  e,
  s,
  {
    dir: n = [0, 1, 0],
    face: i = null,
    depth: a = 0.02,
    color: r = 2105376,
    shrink: l = 0,
    opts: c = {},
  } = {},
) {
  let h = [],
    f = [];
  for (let u = 0; u < s; u++) {
    let d = t + e + u;
    (h.push([o.p[d * 3], o.p[d * 3 + 1], o.p[d * 3 + 2]]),
      f.push([o.si[d * 4], o.sw[d * 4], o.si[d * 4 + 1], o.sw[d * 4 + 1]]));
  }
  Zb.push({
    ring: h,
    skin: f,
    dir: n,
    face: i || n,
    depth: a,
    color: r,
    shrink: l,
    opts: c,
  });
}
function JI(o) {
  for (let t of Zb) {
    let e = t.ring.length,
      s = t.dir,
      n = 0,
      i = 0,
      a = 0;
    for (let h of t.ring) ((n += h[0]), (i += h[1]), (a += h[2]));
    ((n /= e), (i /= e), (a /= e));
    let r = 3,
      l = uh(
        r,
        e,
        (h, f, u) => {
          let d = t.ring[f % e],
            m = h / r,
            p = Math.cos((m * Math.PI) / 2) * (1 - t.shrink * Math.min(1, h)),
            x = t.depth * Math.sin((m * Math.PI) / 2);
          ((u[0] = n + (d[0] - n) * p + s[0] * x),
            (u[1] = i + (d[1] - i) * p + s[1] * x),
            (u[2] = a + (d[2] - a) * p + s[2] * x));
        },
        {
          wrapJ: !0,
        },
      );
    {
      let h = [l.p[0], l.p[1], l.p[2]],
        f = e + 1,
        u = [l.p[f * 3], l.p[f * 3 + 1], l.p[f * 3 + 2]],
        d = [l.p[3], l.p[4], l.p[5]],
        m = u[0] - h[0],
        p = u[1] - h[1],
        x = u[2] - h[2],
        g = d[0] - h[0],
        b = d[1] - h[1],
        v = d[2] - h[2],
        y = t.face;
      if (
        (p * v - x * b) * y[0] +
          (x * g - m * v) * y[1] +
          (m * b - p * g) * y[2] <
        0
      ) {
        for (let w = 0; w < l.idx.length; w += 3) {
          let T = l.idx[w + 1];
          ((l.idx[w + 1] = l.idx[w + 2]), (l.idx[w + 2] = T));
        }
        for (let w = 0; w < l.n.length; w++) l.n[w] = -l.n[w];
      }
    }
    let c = e + 1;
    o.add(l, {
      color: t.color,
      rough: 0.92,
      nrm: 0.6,
      surf: 0,
      ao: 0.55,
      ...t.opts,
      weights: (h, f, u, d, m) => {
        let p = t.skin[(m % c) % e];
        ((d[0] = p[0]), (d[1] = p[1]), (d[2] = p[2]), (d[3] = p[3]));
      },
    });
  }
  Zb.length = 0;
}
function bE(o, t = 1) {
  let e = xE(),
    s = o.attributes.position,
    n = o.attributes.normal,
    i = o.attributes.uv;
  for (let a = 0; a < s.count; a++)
    (e.p.push(s.getX(a), s.getY(a), s.getZ(a)),
      e.n.push(n.getX(a), n.getY(a), n.getZ(a)),
      e.uv.push(i ? i.getX(a) * t : 0, i ? i.getY(a) * t : 0));
  if (o.index) {
    let a = o.index;
    for (let r = 0; r < a.count; r++) e.idx.push(a.getX(r));
  } else for (let a = 0; a < s.count; a++) e.idx.push(a);
  return (o.dispose(), e);
}
function yE(o, t) {
  let e = t.determinant() < 0;
  QI.getNormalMatrix(t);
  for (let s = 0; s < o.p.length; s += 3)
    (dE.set(o.p[s], o.p[s + 1], o.p[s + 2]).applyMatrix4(t),
      (o.p[s] = dE.x),
      (o.p[s + 1] = dE.y),
      (o.p[s + 2] = dE.z),
      pE
        .set(o.n[s], o.n[s + 1], o.n[s + 2])
        .applyMatrix3(QI)
        .normalize(),
      (o.n[s] = pE.x),
      (o.n[s + 1] = pE.y),
      (o.n[s + 2] = pE.z));
  if (e)
    for (let s = 0; s < o.idx.length; s += 3) {
      let n = o.idx[s + 1];
      ((o.idx[s + 1] = o.idx[s + 2]), (o.idx[s + 2] = n));
    }
  return o;
}
var ZZ = new Euler();
var QZ = new Quaternion();
function JZ(o = 0, t = 0, e = 0, s = 0, n = 0, i = 0, a = 1, r = 1, l = 1) {
  return new Matrix4().compose(
    new Vector3(o, t, e),
    QZ.setFromEuler(ZZ.set(s, n, i, "YXZ")),
    new Vector3(a, r, l),
  );
}
var ti = (o, ...t) => yE(o, JZ(...t));
function tH(o) {
  let t = {
    p: o.p.slice(),
    n: o.n.slice(),
    uv: o.uv.slice(),
    idx: o.idx.slice(),
  };
  for (let e = 0; e < t.p.length; e += 3)
    ((t.p[e] = -t.p[e]), (t.n[e] = -t.n[e]));
  for (let e = 0; e < t.idx.length; e += 3) {
    let s = t.idx[e + 1];
    ((t.idx[e + 1] = t.idx[e + 2]), (t.idx[e + 2] = s));
  }
  return t;
}
function tQ(o, t, e, s = 0.004) {
  s = Math.min(s, o * 0.4, t * 0.4, e * 0.4);
  let n = xE(),
    i = o / 2,
    a = t / 2,
    r = e / 2,
    l = {},
    c = (u, d, m, p) => {
      let x = "" + u + d + m + p;
      if (l[x] !== void 0) return l[x];
      let g = u * (i - (p === 0 ? 0 : s)),
        b = d * (a - (p === 1 ? 0 : s)),
        v = m * (r - (p === 2 ? 0 : s));
      return (
        n.p.push(g, b, v),
        n.n.push(p === 0 ? u : 0, p === 1 ? d : 0, p === 2 ? m : 0),
        n.uv.push(p === 0 ? v : g, p === 1 ? v : b),
        (l[x] = n.p.length / 3 - 1)
      );
    },
    h = (u, d, m, p, x) => {
      let g = n.p,
        b = g[d * 3] - g[u * 3],
        v = g[d * 3 + 1] - g[u * 3 + 1],
        y = g[d * 3 + 2] - g[u * 3 + 2],
        M = g[m * 3] - g[u * 3],
        w = g[m * 3 + 1] - g[u * 3 + 1],
        T = g[m * 3 + 2] - g[u * 3 + 2];
      (v * T - y * w) * x[0] +
        (y * M - b * T) * x[1] +
        (b * w - v * M) * x[2] >=
      0
        ? (n.idx.push(u, d, m), p !== void 0 && n.idx.push(u, m, p))
        : (n.idx.push(u, m, d), p !== void 0 && n.idx.push(u, p, m));
    },
    f = [-1, 1];
  for (let u = 0; u < 3; u++)
    for (let d of f) {
      let m = [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ].map(([x, g]) => {
          let b = [0, 0, 0];
          return (
            (b[u] = d),
            (b[(u + 1) % 3] = x),
            (b[(u + 2) % 3] = g),
            c(b[0], b[1], b[2], u)
          );
        }),
        p = [0, 0, 0];
      ((p[u] = d), h(m[0], m[1], m[2], m[3], p));
    }
  for (let u = 0; u < 3; u++)
    for (let d of f)
      for (let m of f) {
        let p = (u + 1) % 3,
          x = (u + 2) % 3,
          g = [0, 0, 0],
          b = [0, 0, 0];
        ((g[u] = -1),
          (g[p] = d),
          (g[x] = m),
          (b[u] = 1),
          (b[p] = d),
          (b[x] = m));
        let v = [0, 0, 0];
        ((v[p] = d),
          (v[x] = m),
          h(
            c(g[0], g[1], g[2], p),
            c(b[0], b[1], b[2], p),
            c(b[0], b[1], b[2], x),
            c(g[0], g[1], g[2], x),
            v,
          ));
      }
  for (let u of f)
    for (let d of f)
      for (let m of f)
        h(c(u, d, m, 0), c(u, d, m, 1), c(u, d, m, 2), void 0, [u, d, m]);
  return n;
}
var en = (o, t, e, s = 0.008, n = 1) =>
  n === 1 && Math.max(o, t, e) < 0.075
    ? tQ(o, t, e, s * 0.7)
    : bE(
        new Ll(o, t, e, n, Math.min(s, o * 0.49, t * 0.49, e * 0.49)),
        Math.max(o, t, e),
      );
var Xg = (o, t, e) => bE(new BoxGeometry(o, t, e), Math.max(o, t, e));
var l5 = (o, t, e, s = 10, n = !1, i = 0, a = kR) =>
  bE(new CylinderGeometry(o, t, e, s, 1, n, i, a), e);
var eH = (o, t = 12, e = 8, s = 0, n = kR, i = 0, a = Math.PI) =>
  bE(new SphereGeometry(o, t, e, s, n, i, a), o * 3);
var mE = [0, 0, 0];
var AR = [0, 0];
function uh(o, t, e, { wrapJ: s = !1, flip: n = !1, uvFn: i = null } = {}) {
  let a = xE(),
    r = t + 1,
    l = new Float32Array((o + 1) * r * 3);
  for (let g = 0; g <= o; g++)
    for (let b = 0; b <= t; b++) {
      e(g, s && b === t ? 0 : b, mE);
      let v = (g * r + b) * 3;
      ((l[v] = mE[0]), (l[v + 1] = mE[1]), (l[v + 2] = mE[2]));
    }
  let c = (g, b, v) => {
      let y = (g * r + b) * 3;
      return v.set(l[y], l[y + 1], l[y + 2]);
    },
    h = new Vector3(),
    f = new Vector3(),
    u = new Vector3(),
    d = new Vector3(),
    m = new Vector3(),
    p = 0,
    x = new Float32Array(r);
  for (let g = 0; g <= o; g++) {
    for (let b = 0; b <= t; b++) {
      let v = Math.max(g - 1, 0),
        y = Math.min(g + 1, o),
        M = b - 1,
        w = b + 1;
      if (
        (s
          ? (M < 0 && (M = t - 1), w > t && (w = 1))
          : ((M = Math.max(M, 0)), (w = Math.min(w, t))),
        u.subVectors(c(y, b, h), c(v, b, f)),
        d.subVectors(c(g, w, h), c(g, M, f)),
        m.crossVectors(u, d),
        m.lengthSq() < 1e-16)
      ) {
        let S = g === 0 ? 1 : g === o ? o - 1 : g;
        (u.subVectors(c(Math.min(S + 1, o), b, h), c(Math.max(S - 1, 0), b, f)),
          d.subVectors(c(S, w, h), c(S, M, f)),
          m.crossVectors(u, d),
          m.lengthSq() < 1e-16 && m.set(0, 1, 0));
      }
      (m.normalize(), n && m.multiplyScalar(-1));
      let T = (g * r + b) * 3;
      (a.p.push(l[T], l[T + 1], l[T + 2]),
        a.n.push(m.x, m.y, m.z),
        i
          ? (i(g, b, AR), a.uv.push(AR[0], AR[1]))
          : (b > 0
              ? (x[b] = x[b - 1] + c(g, b, h).distanceTo(c(g, b - 1, f)))
              : (x[0] = 0),
            a.uv.push(x[b], p)));
    }
    g < o && (p += c(g + 1, t >> 1, h).distanceTo(c(g, t >> 1, f)));
  }
  for (let g = 0; g < o; g++)
    for (let b = 0; b < t; b++) {
      let v = g * r + b,
        y = v + r,
        M = v + 1,
        w = y + 1;
      n ? a.idx.push(v, M, y, M, w, y) : a.idx.push(v, y, M, M, y, w);
    }
  return a;
}
function Tu(o, t, { closed: e = !1, capA: s = !0, capB: n = !0 } = {}) {
  let i = xE(),
    a = o.length,
    r = [],
    l = 0;
  for (let u = 0; u < a; u++) {
    let d = o[u],
      m = t(u),
      p = m.length;
    u > 0 &&
      (l += Math.hypot(
        d.p[0] - o[u - 1].p[0],
        d.p[1] - o[u - 1].p[1],
        d.p[2] - o[u - 1].p[2],
      ));
    let x = 0;
    for (let g = 0; g <= p; g++) {
      let b = m[g % p];
      if (g > 0) {
        let T = m[g - 1];
        x += Math.hypot(b[0] - T[0], b[1] - T[1]);
      }
      i.p.push(
        d.p[0] + d.b[0] * b[0] + d.n[0] * b[1],
        d.p[1] + d.b[1] * b[0] + d.n[1] * b[1],
        d.p[2] + d.b[2] * b[0] + d.n[2] * b[1],
      );
      let v = d.b[0] * b[2] + d.n[0] * b[3],
        y = d.b[1] * b[2] + d.n[1] * b[3],
        M = d.b[2] * b[2] + d.n[2] * b[3],
        w = Math.hypot(v, y, M) || 1;
      (i.n.push(v / w, y / w, M / w), i.uv.push(l, x));
    }
    r.push(m);
  }
  let c = r[0].length,
    h = c + 1,
    f = e ? a : a - 1;
  for (let u = 0; u < f; u++) {
    let d = (u + 1) % a;
    for (let m = 0; m < c; m++) {
      let p = u * h + m,
        x = d * h + m,
        g = p + 1,
        b = x + 1;
      i.idx.push(p, g, x, g, b, x);
    }
  }
  if (!e) {
    let u = (d, m) => {
      let p = o[d],
        x = r[d],
        g = i.p.length / 3,
        b = [
          p.b[1] * p.n[2] - p.b[2] * p.n[1],
          p.b[2] * p.n[0] - p.b[0] * p.n[2],
          p.b[0] * p.n[1] - p.b[1] * p.n[0],
        ],
        v = 0,
        y = 0;
      for (let w of x) ((v += w[0]), (y += w[1]));
      ((v /= c), (y /= c));
      let M = (w, T) => {
        (i.p.push(
          p.p[0] + p.b[0] * w + p.n[0] * T,
          p.p[1] + p.b[1] * w + p.n[1] * T,
          p.p[2] + p.b[2] * w + p.n[2] * T,
        ),
          i.n.push(b[0] * m, b[1] * m, b[2] * m),
          i.uv.push(w, T));
      };
      M(v, y);
      for (let w of x) M(w[0], w[1]);
      for (let w = 0; w < c; w++) {
        let T = g + 1 + w,
          S = g + 1 + ((w + 1) % c);
        m > 0 ? i.idx.push(g, T, S) : i.idx.push(g, S, T);
      }
    };
    (s && u(0, -1), n && u(a - 1, 1));
  }
  return i;
}
function Yg(o, t, e, s, n, i = 2) {
  n = Math.min(n, (t - o) * 0.49, (s - e) * 0.49);
  let a = [],
    r = (l, c, h) => {
      for (let f = 0; f <= i; f++) {
        let u = h + (Math.PI / 2) * (f / i),
          d = Math.cos(u),
          m = Math.sin(u);
        a.push([l + d * n, c + m * n, d, m]);
      }
    };
  return (
    r(t - n, s - n, 0),
    r(o + n, s - n, Math.PI / 2),
    r(o + n, e + n, Math.PI),
    r(t - n, e + n, Math.PI * 1.5),
    a
  );
}
function CR(o, t = 6, e = 0, s = 0, n = 1) {
  let i = [];
  for (let a = 0; a < t; a++) {
    let r = (kR * a) / t,
      l = Math.cos(r),
      c = Math.sin(r);
    i.push([e + l * o * n, s + c * o, l, c]);
  }
  return i;
}
function dh(o, t, e = 6, s = !0) {
  let n = [],
    i = o.length,
    a = new Vector3(),
    r = new Vector3(),
    l = new Vector3(),
    c = new Vector3(0, 1, 0);
  for (let f = 0; f < i; f++) {
    let u = o[Math.max(f - 1, 0)],
      d = o[Math.min(f + 1, i - 1)];
    (a.set(d[0] - u[0], d[1] - u[1], d[2] - u[2]).normalize(),
      f === 0
        ? (Math.abs(a.y) > 0.9 && c.set(1, 0, 0),
          r.crossVectors(a, c).normalize())
        : r.addScaledVector(a, -r.dot(a)).normalize(),
      l.crossVectors(a, r),
      n.push({
        p: o[f],
        b: [r.x, r.y, r.z],
        n: [l.x, l.y, l.z],
      }));
  }
  let h = typeof t == "function" ? t : () => t;
  return Tu(n, (f) => CR(h(f / (i - 1)), e), {
    capA: s,
    capB: s,
  });
}
function l2(o) {
  let t = o.length,
    e = o[0].length;
  return (s, n) => {
    let i = 0;
    for (; i < t - 2 && s > o[i + 1][0];) i++;
    let a = o[Math.max(i - 1, 0)],
      r = o[i],
      l = o[i + 1],
      c = o[Math.min(i + 2, t - 1)],
      h = l[0] - r[0],
      f = Math.min(Math.max((s - r[0]) / h, 0), 1),
      u = f * f,
      d = u * f;
    for (let m = 1; m < e; m++) {
      let p = i > 0 ? ((l[m] - a[m]) / (l[0] - a[0])) * h : l[m] - r[m],
        x = i < t - 2 ? ((c[m] - r[m]) / (c[0] - r[0])) * h : l[m] - r[m];
      n[m - 1] =
        (2 * d - 3 * u + 1) * r[m] +
        (d - 2 * u + f) * p +
        (-2 * d + 3 * u) * l[m] +
        (d - u) * x;
    }
    return n;
  };
}
function tf(o, t, e, s, n, i = 2.2) {
  let a = t >= 0 ? s : n;
  return Math.pow(
    Math.pow(Math.abs(o) / e, i) + Math.pow(Math.abs(t) / a, i),
    -1 / i,
  );
}
var gE = class {
  constructor() {
    ((this.p = []),
      (this.n = []),
      (this.uv = []),
      (this.col = []),
      (this.aux = []),
      (this.aux2 = []),
      (this.si = []),
      (this.sw = []),
      (this.idx = []),
      (this.fp = []));
  }
  get count() {
    return this.p.length / 3;
  }
  add(
    t,
    {
      color: e = 8421504,
      rough: s = 0.85,
      metal: n = 0,
      glow: i = 0,
      nrm: a = 1,
      camo: r = 0,
      surf: l = 1,
      bone: c = 0,
      weights: h = null,
      m: f = null,
      ao: u = 1,
      mottle: d = 0.14,
      fp: m = 0,
    } = {},
  ) {
    let p = f ? t.p.slice() : t.p;
    f && yE(t, f);
    let x = this.count,
      g = t.p.length / 3,
      b = [0, 1, 0, 0],
      v = typeof e == "number";
    v && $b.setHex(e);
    for (let y = 0; y < g; y++) {
      let M = p[y * 3],
        w = p[y * 3 + 1],
        T = p[y * 3 + 2];
      (this.p.push(t.p[y * 3], t.p[y * 3 + 1], t.p[y * 3 + 2]),
        this.n.push(t.n[y * 3], t.n[y * 3 + 1], t.n[y * 3 + 2]),
        this.uv.push(t.uv[y * 2] || 0, t.uv[y * 2 + 1] || 0),
        v || $b.setHex(e(M, w, T, y)));
      let S = t.p[y * 3],
        E = t.p[y * 3 + 1],
        _ = t.p[y * 3 + 2],
        R =
          i > 0
            ? 1
            : 1 +
              d *
                ($Z.fbm(S * 19 + _ * 11 + 3.1, E * 19 - _ * 13 + 7.7, 3) -
                  0.5) *
                2;
      (this.col.push($b.r * R, $b.g * R, $b.b * R),
        this.aux.push(
          i,
          Math.min(1, s * (i > 0 ? 1 : 1.04 - 0.5 * (R - 1))),
          n,
          typeof u == "function" ? u(M, w, T, y) : u,
        ),
        this.aux2.push(a, r, l),
        this.fp.push(m),
        h
          ? ((b[0] = 0),
            (b[1] = 1),
            (b[2] = 0),
            (b[3] = 0),
            h(M, w, T, b, y),
            this.si.push(b[0], b[2], 0, 0),
            this.sw.push(b[1], b[3], 0, 0))
          : (this.si.push(c, 0, 0, 0), this.sw.push(1, 0, 0, 0)));
    }
    for (let y = 0; y < t.idx.length; y++) this.idx.push(t.idx[y] + x);
    return this;
  }
  bakeAO({ cell: t = 0.016, strength: e = 1.25 } = {}) {
    let s = this.p,
      n = this.n,
      i = this.count,
      a = 1e9,
      r = 1e9,
      l = 1e9,
      c = -1e9,
      h = -1e9,
      f = -1e9;
    for (let T = 0; T < s.length; T += 3)
      ((a = Math.min(a, s[T])),
        (c = Math.max(c, s[T])),
        (r = Math.min(r, s[T + 1])),
        (h = Math.max(h, s[T + 1])),
        (l = Math.min(l, s[T + 2])),
        (f = Math.max(f, s[T + 2])));
    let u = 0.1;
    ((a -= u), (r -= u), (l -= u));
    let d = Math.ceil((c + u - a) / t),
      m = Math.ceil((h + u - r) / t),
      p = Math.ceil((f + u - l) / t),
      x = new Float32Array(d * m * p),
      g = new Float32Array(d * m * p),
      b = (T, S, E, _) => {
        let R = Math.floor((T - a) / t),
          C = Math.floor((S - r) / t),
          L = Math.floor((E - l) / t);
        R >= 0 &&
          C >= 0 &&
          L >= 0 &&
          R < d &&
          C < m &&
          L < p &&
          (x[(L * m + C) * d + R] += _);
      },
      v = this.idx,
      y = t * t;
    for (let T = 0; T < v.length; T += 3) {
      let S = v[T] * 3,
        E = v[T + 1] * 3,
        _ = v[T + 2] * 3,
        R = s[E] - s[S],
        C = s[E + 1] - s[S + 1],
        L = s[E + 2] - s[S + 2],
        A = s[_] - s[S],
        O = s[_ + 1] - s[S + 1],
        H = s[_ + 2] - s[S + 2],
        F = 0.5 * Math.hypot(C * H - L * O, L * A - R * H, R * O - C * A),
        P = Math.max(1, Math.min(6, Math.ceil(Math.sqrt(F / y) * 1.5))),
        z = F / y / ((P * (P + 1)) / 2);
      for (let k = 0; k < P; k++)
        for (let I = 0; I < P - k; I++) {
          let G = (k + 0.33) / P,
            K = (I + 0.33) / P;
          b(
            s[S] + R * G + A * K,
            s[S + 1] + C * G + O * K,
            s[S + 2] + L * G + H * K,
            z,
          );
        }
    }
    for (let T = 0; T < x.length; T++) x[T] = Math.min(x[T], 1.5);
    let M = (T, S, E, _, R) => {
      for (let C = 0; C < T.length; C++) {
        let L = Math.floor(C / E) % _,
          A = L > 0 ? T[C - E] : 0,
          O = L < _ - 1 ? T[C + E] : 0;
        S[C] = (A + 2 * T[C] + O) * 0.25;
      }
    };
    for (let T = 0; T < 2; T++) {
      (M(x, g, 1, d), M(g, x, d, m), M(x, g, d * m, p));
      let S = x;
      ((x = g), (g = S));
    }
    let w = (T, S, E) => {
      let _ = (T - a) / t - 0.5,
        R = (S - r) / t - 0.5,
        C = (E - l) / t - 0.5,
        L = Math.floor(_),
        A = Math.floor(R),
        O = Math.floor(C);
      if (L < 0 || A < 0 || O < 0 || L >= d - 1 || A >= m - 1 || O >= p - 1)
        return 0;
      let H = _ - L,
        F = R - A,
        P = C - O,
        z = (O * m + A) * d + L,
        k = d * m,
        I = x[z] * (1 - H) + x[z + 1] * H,
        G = x[z + d] * (1 - H) + x[z + d + 1] * H,
        K = x[z + k] * (1 - H) + x[z + k + 1] * H,
        $ = x[z + k + d] * (1 - H) + x[z + k + d + 1] * H;
      return (I * (1 - F) + G * F) * (1 - P) + (K * (1 - F) + $ * F) * P;
    };
    for (let T = 0; T < i; T++) {
      let S = s[T * 3],
        E = s[T * 3 + 1],
        _ = s[T * 3 + 2],
        R = n[T * 3],
        C = n[T * 3 + 1],
        L = n[T * 3 + 2],
        A = 0;
      ((A += w(S + R * 0.03, E + C * 0.03, _ + L * 0.03) * 1),
        (A += w(S + R * 0.055, E + C * 0.055, _ + L * 0.055) * 0.8),
        (A += w(S + R * 0.09, E + C * 0.09, _ + L * 0.09) * 0.6),
        (A += w(S + R * 0.05, E + C * 0.05 + 0.04, _ + L * 0.05) * 0.5));
      let O = Math.max(0.3, 1 - Math.max(A - 0.1, 0) * e);
      this.aux[T * 4 + 3] *= O;
    }
    return this;
  }
  build() {
    let t = new BufferGeometry();
    return (
      t.setAttribute("position", new Float32BufferAttribute(this.p, 3)),
      t.setAttribute("normal", new Float32BufferAttribute(this.n, 3)),
      t.setAttribute("uv", new Float32BufferAttribute(this.uv, 2)),
      t.setAttribute("color", new Float32BufferAttribute(this.col, 3)),
      t.setAttribute("aux", new Float32BufferAttribute(this.aux, 4)),
      t.setAttribute("aux2", new Float32BufferAttribute(this.aux2, 3)),
      t.setAttribute("skinIndex", new Uint16BufferAttribute(this.si, 4)),
      t.setAttribute("skinWeight", new Float32BufferAttribute(this.sw, 4)),
      t.setIndex(
        this.count > 65535
          ? new Uint32BufferAttribute(this.idx, 1)
          : new Uint16BufferAttribute(this.idx, 1),
      ),
      t.computeBoundingSphere(),
      t.computeBoundingBox(),
      (t.userData.fp = Uint8Array.from(this.fp)),
      t
    );
  }
};
var fs = {
  head: 0,
  neck: 1,
  chest: 2,
  pelvis: 3,
  lShoulder: 4,
  lElbow: 5,
  lHand: 6,
  rShoulder: 7,
  rElbow: 8,
  rHand: 9,
  lHip: 10,
  lKnee: 11,
  lFoot: 12,
  rHip: 13,
  rKnee: 14,
  rFoot: 15,
};
var Ue = fs;
var h2 = 0.34;
var f2 = 0.2;
var u5 = 0.14;
var Yc = 0.19;
var AE = 0.14;
var Pi = 0.095;
var lf = 0.05;
var Ca = 0.3;
var mh = 0.31;
var ey = 0.255;
var qr = 0.44;
var rf = 0.42;
var hp = qr + rf;
var Sn = 0.095;
var Qg = 0.058;
var u2 = 0.125;
var nf = [
  [0, 1.685, 0],
  [0, 1.545, 0],
  [0, 1.345, 0],
  [0, 1.005, 0],
  [-Yc, 1.485, 0],
  [-0.21, 1.1857, 0],
  [-0.22, 0.8759, 0],
  [Yc, 1.485, 0],
  [0.21, 1.1857, 0],
  [0.22, 0.8759, 0],
  [-Pi, 0.955, 0],
  [-0.1, 0.515, 0],
  [-0.1, 0.095, 0],
  [Pi, 0.955, 0],
  [0.1, 0.515, 0],
  [0.1, 0.095, 0],
];
var ph = Math.SQRT1_2;
var h5 = [
  [0, 1.685, 0],
  [0, 1.545, 0],
  [0, 1.345, 0],
  [0, 1.005, 0],
  [-Yc, 1.485, 0],
  [-Yc - Ca * ph, 1.485 - Ca * ph, 0],
  [-Yc - (Ca + mh) * ph, 1.485 - (Ca + mh) * ph, 0],
  [Yc, 1.485, 0],
  [Yc + Ca * ph, 1.485 - Ca * ph, 0],
  [Yc + (Ca + mh) * ph, 1.485 - (Ca + mh) * ph, 0],
  [-Pi, 0.955, 0],
  [-Pi, 0.515, 0],
  [-Pi, 0.095, 0],
  [Pi, 0.955, 0],
  [Pi, 0.515, 0],
  [Pi, 0.095, 0],
];
var eQ = (o, t) =>
  Math.hypot(nf[o][0] - nf[t][0], nf[o][1] - nf[t][1], nf[o][2] - nf[t][2]);
var pH = [
  [Ue.pelvis, Ue.chest, h2],
  [Ue.chest, Ue.neck, f2],
  [Ue.neck, Ue.head, u5],
  [Ue.lShoulder, Ue.lElbow, Ca],
  [Ue.lElbow, Ue.lHand, mh],
  [Ue.rShoulder, Ue.rElbow, Ca],
  [Ue.rElbow, Ue.rHand, mh],
  [Ue.lHip, Ue.lKnee, qr],
  [Ue.lKnee, Ue.lFoot, rf],
  [Ue.rHip, Ue.rKnee, qr],
  [Ue.rKnee, Ue.rFoot, rf],
  ...[
    [Ue.chest, Ue.lShoulder],
    [Ue.chest, Ue.rShoulder],
    [Ue.neck, Ue.lShoulder],
    [Ue.neck, Ue.rShoulder],
    [Ue.lShoulder, Ue.rShoulder],
    [Ue.pelvis, Ue.lHip],
    [Ue.pelvis, Ue.rHip],
    [Ue.lHip, Ue.rHip],
    [Ue.lShoulder, Ue.pelvis],
    [Ue.rShoulder, Ue.pelvis],
    [Ue.lHip, Ue.chest],
    [Ue.rHip, Ue.chest],
    [Ue.head, Ue.chest],
    [Ue.lShoulder, Ue.rHip],
    [Ue.rShoulder, Ue.lHip],
  ].map(([o, t]) => [o, t, eQ(o, t)]),
];
var mH = new Float32Array([
  0.12, 0.07, 0.16, 0.15, 0.08, 0.06, 0.055, 0.08, 0.06, 0.055, 0.1, 0.07, 0.07,
  0.1, 0.07, 0.07,
]);
var Ve = {
  pelvis: 0,
  spine: 1,
  chest: 2,
  neck: 3,
  head: 4,
  shH: 5,
  uarm0: 6,
  uarm: 7,
  elbH: 8,
  farm: 9,
  farmTw: 10,
  hand: 11,
  hipH: 19,
  thigh0: 20,
  thigh: 21,
  kneeH: 22,
  shin: 23,
  foot: 24,
  toe: 25,
  mag: 33,
};
var Ru = 7;
var d5 = 7;
var kE = 34;
var gH = Vector3;
var dn = () => new gH();
var sH = new gH(0, 1, 0);
var vE = dn();
var Qb = dn();
var ME = dn();
var wE = dn();
var op = dn();
var c2 = dn();
var nH = dn();
var ef = dn();
var sf = dn();
var oH = dn();
var PR = dn();
var iH = dn();
var EE = dn();
var ip = dn();
var zR = dn();
var aH = dn();
var TE = dn();
var SE = dn();
var of = dn();
var af = dn();
var ty = dn();
var ja = dn();
var Gr = dn();
var lp = dn();
var Zg = dn();
var ap = dn();
var rH = dn();
var c5 = dn();
var lH = dn();
var f5 = dn();
var cp = dn();
var jg = dn();
var A1 = dn();
var Aa = dn();
var Bl = dn();
var cH = dn();
var rp = dn();
var _E = dn();
var ka = dn();
var hH = dn();
var Vr = dn();
var $g = dn();
var Jb = new Quaternion();
var qa0 = new Quaternion();
var fH = new Matrix4();
function Wr(o, t, e) {
  let s = t * 3;
  return e.set(o[s], o[s + 1], o[s + 2]);
}
function Su(o, t) {
  let e = o.lengthSq();
  return e < 1e-12 ? o.copy(t) : o.multiplyScalar(1 / Math.sqrt(e));
}
function _u(o, t, e) {
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
function xc(o, t, e, s, n) {
  let i = o.elements;
  ((i[0] = t.x),
    (i[1] = t.y),
    (i[2] = t.z),
    (i[3] = 0),
    (i[4] = e.x),
    (i[5] = e.y),
    (i[6] = e.z),
    (i[7] = 0),
    (i[8] = s.x),
    (i[9] = s.y),
    (i[10] = s.z),
    (i[11] = 0),
    (i[12] = n.x),
    (i[13] = n.y),
    (i[14] = n.z),
    (i[15] = 1));
}
function RE(o, t, e, s) {
  let n = o.dot(t);
  if (n < -0.9995) {
    (rp.set(o.y, -o.x, 0),
      rp.lengthSq() < 1e-6 && rp.set(0, o.z, -o.y),
      rp.normalize());
    let u = 2 * rp.dot(e);
    return s.set(rp.x * u - e.x, rp.y * u - e.y, rp.z * u - e.z);
  }
  let i = o.y * t.z - o.z * t.y,
    a = o.z * t.x - o.x * t.z,
    r = o.x * t.y - o.y * t.x,
    l = (i * e.x + a * e.y + r * e.z) / (1 + n),
    c = e.x * n + (a * e.z - r * e.y) + i * l,
    h = e.y * n + (r * e.x - i * e.z) + a * l,
    f = e.z * n + (i * e.y - a * e.x) + r * l;
  return s.set(c, h, f);
}
function LR(o, t) {
  let e = Math.abs(o);
  return e <= t ? o : (Math.sign(o) * t * (Math.PI - e)) / (Math.PI - t);
}
var DR = (o, t, e) => {
  let s = Math.min(Math.max((e - o) / (t - o), 0), 1);
  return s * s * (3 - 2 * s);
};
function uH(o, t, e, s, n, i, a) {
  let r = o.elements,
    l = a - 1,
    c = i.dot(t) * l;
  ((r[0] = t.x + i.x * c),
    (r[1] = t.y + i.y * c),
    (r[2] = t.z + i.z * c),
    (r[3] = 0),
    (c = i.dot(e) * l),
    (r[4] = e.x + i.x * c),
    (r[5] = e.y + i.y * c),
    (r[6] = e.z + i.z * c),
    (r[7] = 0),
    (c = i.dot(s) * l),
    (r[8] = s.x + i.x * c),
    (r[9] = s.y + i.y * c),
    (r[10] = s.z + i.z * c),
    (r[11] = 0),
    (r[12] = n.x),
    (r[13] = n.y),
    (r[14] = n.z),
    (r[15] = 1));
}
function dH(o, t, e, s, n, i, a, r) {
  (Wr(o, t, of),
    Wr(o, e, af),
    Wr(o, s, ty),
    Su(ja.subVectors(af, of), lp),
    Su(Gr.subVectors(ty, af), ja),
    Su(A1.addVectors(lp, ja), ja),
    RE(lp, A1, Zg, ka),
    _u(ka, A1, Zg),
    Vr.crossVectors(ka, A1));
  let l = Math.max(lp.dot(A1), 0.8);
  (_E.subVectors(ja, lp),
    _E.lengthSq() > 1e-8
      ? (_E.normalize(), uH(a[r], ka, A1, Vr, of, _E, 1 / l))
      : xc(a[r], ka, A1, Vr, of),
    RE(lp, ja, Zg, ap),
    _u(ap, ja, Zg),
    rH.crossVectors(ap, ja),
    xc(a[r + 1], ap, ja, rH, of),
    n ? jg.crossVectors(Gr, ja) : jg.crossVectors(ja, Gr));
  let c = jg.length(),
    h = 0;
  c > 1e-4 &&
    (jg.multiplyScalar(1 / c),
    (h =
      LR(Math.atan2(Aa.crossVectors(ap, jg).dot(ja), ap.dot(jg)), i) *
      DR(0.02, 0.2, c)));
  let f = Math.cos(h),
    u = Math.sin(h);
  (Aa.crossVectors(ja, ap),
    c5.copy(ap).multiplyScalar(f).addScaledVector(Aa, u),
    lH.crossVectors(c5, ja),
    xc(a[r + 2], c5, ja, lH, of),
    RE(ja, Gr, c5, f5),
    _u(f5, Gr, c5),
    cp.crossVectors(f5, Gr),
    Su(A1.addVectors(ja, Gr), ja),
    RE(ja, A1, c5, ka),
    _u(ka, A1, c5),
    Vr.crossVectors(ka, A1));
  let d = Math.max(ja.dot(A1), 0.64);
  (uH(a[r + 3], ka, A1, Vr, af, Vr, 1 / d), xc(a[r + 4], f5, Gr, cp, af));
}
function CE(o, t, e) {
  (Wr(o, Ue.pelvis, vE),
    Wr(o, Ue.chest, Qb),
    Wr(o, Ue.neck, ME),
    Wr(o, Ue.head, wE),
    Su(sf.subVectors(ME, Qb), sH),
    Wr(o, Ue.lShoulder, of),
    Wr(o, Ue.rShoulder, af),
    _u(ef.subVectors(af, of), sf, Aa.set(1, 0, 0)),
    oH.crossVectors(ef, sf),
    Su(c2.subVectors(Qb, vE), sf),
    Wr(o, Ue.lHip, of),
    Wr(o, Ue.rHip, af),
    _u(op.subVectors(af, of), c2, ef),
    nH.crossVectors(op, c2),
    xc(e[Ve.pelvis], op, c2, nH, vE),
    Aa.copy(ef).addScaledVector(c2, -ef.dot(c2)));
  let s = Aa.length(),
    n = 0;
  (s > 1e-4 &&
    (n =
      LR(Math.atan2(Bl.crossVectors(op, Aa).dot(c2), op.dot(Aa)), 2) *
      0.5 *
      DR(0.05, 0.4, s)),
    Bl.crossVectors(c2, op),
    PR.copy(op).multiplyScalar(Math.cos(n)).addScaledVector(Bl, Math.sin(n)),
    iH.crossVectors(PR, c2),
    xc(e[Ve.spine], PR, c2, iH, vE),
    xc(e[Ve.chest], ef, sf, oH, Qb),
    Su(ip.subVectors(wE, ME), sf),
    ip.add(sf),
    Su(ip, sf),
    _u(EE.copy(ef), ip, ef),
    zR.crossVectors(EE, ip),
    xc(e[Ve.neck], EE, ip, zR, ME),
    t && t.headFwd
      ? (SE.copy(t.headFwd).multiplyScalar(-1),
        TE.copy(t.headUp),
        _u(TE, SE, ip),
        aH.crossVectors(TE, SE),
        xc(e[Ve.head], aH, TE, SE, wE))
      : xc(e[Ve.head], EE, ip, zR, wE));
  for (let i = 0; i < 2; i++) {
    let a = i ? 1 : -1,
      r = Ve.shH + i * Ru;
    (lp
      .copy(ef)
      .multiplyScalar(a * ph)
      .addScaledVector(sf, -ph),
      Zg.copy(ef)
        .multiplyScalar(ph)
        .addScaledVector(sf, a * ph),
      dH(
        o,
        i ? Ue.rShoulder : Ue.lShoulder,
        i ? Ue.rElbow : Ue.lElbow,
        i ? Ue.rHand : Ue.lHand,
        !1,
        2.3,
        e,
        r,
      ),
      ka.copy(cp).multiplyScalar(a),
      Vr.copy(f5).multiplyScalar(-a),
      $g.copy(ty));
    let l = t ? t.handW[i] : 0;
    (l > 0.001
      ? (fH.makeBasis(ka, Gr, Vr),
        Jb.setFromRotationMatrix(fH),
        Jb.slerp(t.handQ[i], l),
        ka.set(1, 0, 0).applyQuaternion(Jb),
        hH.set(0, 1, 0).applyQuaternion(Jb),
        Vr.set(0, 0, 1).applyQuaternion(Jb),
        $g.lerp(t.handP[i], l),
        xc(e[r + 6], ka, hH, Vr, $g))
      : xc(e[r + 6], ka, Gr, Vr, $g),
      Aa.copy(ka).multiplyScalar(a),
      Aa.addScaledVector(Gr, -Aa.dot(Gr)));
    let c = Aa.length(),
      h = 0;
    c > 0.05 &&
      (h =
        LR(Math.atan2(Bl.crossVectors(cp, Aa).dot(Gr), cp.dot(Aa)), 2) *
        0.55 *
        DR(0.05, 0.4, c));
    let f = Math.cos(h),
      u = Math.sin(h);
    (Bl.crossVectors(Gr, f5),
      ka.copy(f5).multiplyScalar(f).addScaledVector(Bl, u),
      Vr.crossVectors(ka, Gr),
      xc(e[r + 5], ka, Gr, Vr, af));
  }
  for (let i = 0; i < 2; i++) {
    let a = Ve.hipH + i * d5;
    (lp.copy(c2).multiplyScalar(-1),
      Zg.copy(op),
      dH(
        o,
        i ? Ue.rHip : Ue.lHip,
        i ? Ue.rKnee : Ue.lKnee,
        i ? Ue.rFoot : Ue.lFoot,
        !0,
        1.75,
        e,
        a,
      ));
    let r = 0.94,
      l = 0.342;
    (Aa.copy(cp).multiplyScalar(r).addScaledVector(Gr, l),
      Bl.copy(Gr).multiplyScalar(-r).addScaledVector(cp, l));
    let c = 0;
    if (t && t.footW > 0.001) {
      let h = t.footW;
      (Aa.lerp(t.footF[i], h),
        Bl.lerp(t.footU[i], h),
        Su(Bl, sH),
        (c = t.toeBend[i] * h));
    }
    if (
      (_u(Aa, Bl, cp),
      Vr.copy(Aa).multiplyScalar(-1),
      ka.crossVectors(Bl, Vr),
      xc(e[a + 5], ka, Bl, Vr, ty),
      $g
        .copy(ty)
        .addScaledVector(Aa, u2)
        .addScaledVector(Bl, -Sn + 0.03),
      c !== 0)
    ) {
      let h = Math.cos(c),
        f = Math.sin(c);
      (cH.copy(Aa).multiplyScalar(h).addScaledVector(Bl, f),
        Bl.multiplyScalar(h).addScaledVector(Aa, -f),
        Vr.copy(cH).multiplyScalar(-1));
    }
    xc(e[a + 6], ka, Bl, Vr, $g);
  }
  return (
    t && t.magM
      ? e[Ve.mag].copy(t.magM)
      : e[Ve.mag].makeScale(0, 0, 0).setPosition(Qb),
    e
  );
}
function PE() {
  let o = new Float32Array(48);
  for (let e = 0; e < 16; e++)
    ((o[e * 3] = h5[e][0]),
      (o[e * 3 + 1] = h5[e][1]),
      (o[e * 3 + 2] = h5[e][2]));
  let t = [];
  for (let e = 0; e < kE; e++) t.push(new Matrix4());
  CE(o, null, t);
  for (let e = 0; e < 2; e++) {
    let s = Ve.hipH + e * d5,
      n = h5[e ? Ue.rFoot : Ue.lFoot];
    (t[s + 5].makeTranslation(n[0], n[1], n[2]),
      t[s + 6].makeTranslation(n[0], n[1] - Sn + 0.03, n[2] - u2));
  }
  return (t[Ve.mag].identity(), t);
}
var LE = Math.PI * 2;
var ny = (o, t, e) => (o < t ? t : o > e ? e : o);
var Gn = (o, t, e) => {
  let s = ny((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
var d2 = (o, t) => Math.exp(-(o * o) / (t * t));
var oy = createNoise(4107);
var t4 = [
  {
    camoA: 4937308,
    camoB: 3423554,
    camoC: 6187631,
    camoD: 4345419,
    shirt: 3818569,
    gaiter: 4608858,
    mask: 1777442,
    gear: 3949639,
    gearLt: 4870998,
    gearDk: 2106407,
    web: 4607826,
    helmet: 4147276,
    hard: 1250583,
    boot: 2828068,
    sole: 789517,
    glove: 2303786,
    knuckle: 3883332,
    metal: 2763822,
    pad: 2764852,
    mag: 1711134,
    lens: 3531007,
    glow: 3531007,
    glowK: 4,
    dust: 9407104,
  },
  {
    camoA: 4998197,
    camoB: 2959649,
    camoC: 6379073,
    camoD: 4078380,
    shirt: 3682858,
    gaiter: 4603184,
    mask: 1644051,
    gear: 3288100,
    gearLt: 4208685,
    gearDk: 1644051,
    web: 3945770,
    helmet: 3551015,
    hard: 1315345,
    boot: 3812899,
    sole: 789258,
    glove: 2235930,
    knuckle: 3813929,
    metal: 2630947,
    pad: 2301722,
    mag: 1644309,
    lens: 16734750,
    glow: 16734750,
    glowK: 6,
    dust: 9076586,
  },
];
var sQ = [
  [0.834, 0.004, 0.004, 0.005, 0.004, 2],
  [0.842, 0.004, 0.046, 0.054, 0.044, 2],
  [0.87, 0.004, 0.098, 0.09, 0.072, 2.1],
  [0.905, 0.004, 0.15, 0.118, 0.094, 2.2],
  [0.94, 0.004, 0.174, 0.128, 0.106, 2.3],
  [0.99, 0.002, 0.171, 0.12, 0.11, 2.3],
  [1.045, 0, 0.16, 0.106, 0.11, 2.3],
  [1.09, 0, 0.154, 0.1, 0.108, 2.3],
];
var nQ = [
  [1.05, 0, 0.153, 0.099, 0.107, 2.3],
  [1.13, 0, 0.15, 0.1, 0.108, 2.3],
  [1.21, 0.002, 0.157, 0.108, 0.114, 2.4],
  [1.29, 0.004, 0.167, 0.116, 0.124, 2.5],
  [1.37, 0.006, 0.173, 0.12, 0.128, 2.5],
  [1.43, 0.008, 0.176, 0.118, 0.12, 2.4],
  [1.48, 0.01, 0.168, 0.108, 0.098, 2.3],
  [1.515, 0.01, 0.12, 0.094, 0.078, 2.2],
  [1.545, 0.008, 0.074, 0.074, 0.064, 2],
  [1.57, 0.006, 0.06, 0.062, 0.058, 2],
];
var oQ = [
  [1.56, 0.004, 0.056, 0.06, 0.056, 2],
  [1.59, -0.004, 0.06, 0.062, 0.07, 2],
  [1.606, -0.008, 0.064, 0.066, 0.09, 2.1],
  [1.626, -0.01, 0.07, 0.074, 0.098, 2.2],
  [1.65, -0.01, 0.075, 0.084, 0.101, 2.2],
  [1.676, -0.01, 0.078, 0.094, 0.1, 2.2],
  [1.705, -0.01, 0.079, 0.1, 0.099, 2.2],
  [1.74, -0.008, 0.078, 0.101, 0.098, 2.1],
  [1.775, -0.006, 0.068, 0.092, 0.084, 2],
  [1.798, -0.004, 0.044, 0.06, 0.054, 2],
  [1.808, -0.004, 0.004, 0.006, 0.006, 2],
];
var bH = l2(sQ);
var IR = l2(nQ);
var yH = l2(oQ);
var Lo = [0, 0, 0, 0, 0];
function HR(o, t, e, s, n) {
  o(t, Lo);
  let i = (m, p) => {
      let x = Math.sin(m),
        g = -Math.cos(m),
        b = tf(x, g, Lo[1], Lo[2], Lo[3], Lo[4]);
      ((p[0] = b * x), (p[1] = Lo[0] + b * g));
    },
    a = [0, 0],
    r = [0, 0],
    l = [0, 0];
  (i(e, a), i(e - 0.02, r), i(e + 0.02, l));
  let c = l[0] - r[0],
    h = l[1] - r[1],
    f = Math.hypot(c, h) || 1;
  ((c /= f), (h /= f));
  let u = h,
    d = -c;
  return (
    (n[0] = a[0] + u * s),
    (n[1] = t),
    (n[2] = a[1] + d * s),
    (n[3] = u),
    (n[4] = d),
    n
  );
}
function DE(o, t) {
  let e = (i) => {
      IR(i, Lo);
      let a = t - Lo[0],
        r = a >= 0 ? Lo[2] : Lo[3];
      return (
        Math.pow(Math.abs(o) / Lo[1], Lo[4]) +
          Math.pow(Math.abs(a) / r, Lo[4]) <=
        1
      );
    },
    s = 1.4,
    n = 1.57;
  if (!e(s)) return s;
  for (let i = 0; i < 16; i++) {
    let a = (s + n) / 2;
    e(a) ? (s = a) : (n = a);
  }
  return s;
}
var io = (o, t, e, s) => HR(o < 1.07 ? bH : IR, o, t, e, s);
var vH = (o, t, e, s) => HR(yH, o, t, e, s);
function ku(o, t, e, s, n, i = null) {
  let a = [],
    r = [0, 0, 0, 0, 0];
  for (let l = 0; l <= s; l++) {
    let c = e + (t - e) * (l / s);
    (i ? HR(i, o, c, n, r) : io(o, c, n, r),
      a.push({
        p: [r[0], r[1], r[2]],
        b: [0, 1, 0],
        n: [r[3], 0, r[4]],
        az: c,
      }));
  }
  return a;
}
var iQ = [
  [-0.075, -0.004, 0, 0.084, 0.086, 0.094],
  [0, 0.004, -0.004, 0.097, 0.098, 0.106],
  [0.08, 0.004, 0, 0.096, 0.1, 0.099],
  [0.2, 0.002, 0.004, 0.088, 0.095, 0.088],
  [0.32, 0, 0.004, 0.077, 0.083, 0.075],
  [0.4, 0, 0.004, 0.069, 0.074, 0.067],
  [0.44, 0, 0.004, 0.067, 0.071, 0.065],
  [0.5, 0, 0, 0.065, 0.065, 0.068],
  [0.58, 0, -0.004, 0.064, 0.058, 0.074],
  [0.68, 0, -0.002, 0.059, 0.055, 0.066],
  [0.722, 0, 0, 0.058, 0.056, 0.062],
  [0.755, 0, 0.002, 0.063, 0.063, 0.065],
  [0.775, 0, 0.002, 0.059, 0.059, 0.06],
  [0.788, 0, 0.002, 0.047, 0.047, 0.048],
];
var aQ = [
  [-0.055, -0.01, 0, 0.044, 0.05, 0.05],
  [0, 0.004, 0, 0.058, 0.062, 0.061],
  [0.06, 0.003, 0, 0.058, 0.061, 0.06],
  [0.15, 0, 0.002, 0.055, 0.058, 0.056],
  [0.25, 0, 0, 0.049, 0.05, 0.051],
  [0.3, 0, -0.002, 0.047, 0.046, 0.051],
  [0.36, 0, 0, 0.047, 0.048, 0.047],
  [0.45, 0, 0, 0.041, 0.04, 0.04],
  [0.515, 0, 0, 0.036, 0.034, 0.034],
  [0.545, 0, 0, 0.035, 0.033, 0.033],
];
var MH = l2(iQ);
var wH = l2(aQ);
function EH(o, t, e, s, n, i) {
  o(t, Lo);
  let a = Math.cos(e),
    r = Math.sin(e),
    l = tf(a, r, Lo[2], Lo[3], Lo[4], 2.1) + n;
  return (
    (i[0] = Lo[0] * s + l * a),
    (i[1] = t),
    (i[2] = Lo[1] + l * r),
    (i[3] = a),
    (i[4] = r),
    i
  );
}
var e4 = (o, t, e, s, n) => EH(MH, o, t, e, s, n);
var iy = (o, t, e, s, n) => EH(wH, o, t, e, s, n);
var yc = (o, t, e) => ny((e - o) / (t - o), 0, 1);
function vc(o, t, e, s) {
  ((s = s * s * (3 - 2 * s)),
    (o[0] = t),
    (o[1] = 1 - s),
    (o[2] = e),
    (o[3] = s));
}
function FR(o, t, e) {
  let s = t * d5,
    n = qr;
  o < 0
    ? vc(e, Ve.pelvis, Ve.hipH + s, yc(-0.06, 0, o))
    : o < 0.085
      ? vc(e, Ve.hipH + s, Ve.thigh0 + s, yc(0, 0.085, o))
      : o < n - 0.085
        ? vc(e, Ve.thigh0 + s, Ve.thigh + s, yc(0.1, 0.3, o))
        : o < n
          ? vc(e, Ve.thigh + s, Ve.kneeH + s, yc(n - 0.08, n, o))
          : vc(e, Ve.kneeH + s, Ve.shin + s, yc(n, n + 0.08, o));
}
function OR(o, t, e) {
  let s = t * Ru,
    n = Ca;
  o < -0.012
    ? vc(e, Ve.shH + s, Ve.uarm0 + s, yc(-0.055, -0.012, o))
    : o < n - 0.07
      ? vc(e, Ve.uarm0 + s, Ve.uarm + s, yc(0.09, 0.21, o))
      : o < n
        ? vc(e, Ve.uarm + s, Ve.elbH + s, yc(n - 0.065, n, o))
        : o < n + 0.07
          ? vc(e, Ve.elbH + s, Ve.farm + s, yc(n, n + 0.065, o))
          : vc(e, Ve.farm + s, Ve.farmTw + s, yc(n + 0.08, n + 0.2, o));
}
function xH(o, t) {
  o < 1.125
    ? vc(t, Ve.pelvis, Ve.spine, yc(1.03, 1.11, o))
    : o < 1.5
      ? vc(t, Ve.spine, Ve.chest, yc(1.2, 1.34, o))
      : vc(t, Ve.chest, Ve.neck, yc(1.525, 1.57, o));
}
function sy(o, t) {
  return (e, s) => {
    let n = Math.sin(s),
      i = Math.cos(s),
      a = s / LE,
      r = (oy.fbm(e * 13 + t, a * 8, 3, 8) - 0.5) * 0.0035;
    for (let l = 0; l < o.length; l++) {
      let c = o[l],
        h = c.mask(e, n, i);
      if (h < 0.002) continue;
      let f =
          (oy.noise(e * (c.wf || 9) + t * 1.7 + l * 3.1, a * 8, 8) - 0.5) *
          c.warp,
        u = 0.5 + 0.5 * Math.sin(LE * (e / c.lam + c.k * a + f));
      r += c.amp * h * (Math.pow(u, c.sharp || 1.6) - 0.42);
    }
    return r;
  };
}
function bc(o, t, e) {
  let s = [],
    n = Math.max(1, Math.round((t - o) / e));
  for (let i = 0; i <= n; i++) s.push(o + ((t - o) * i) / n);
  return s;
}
function zE(o, t, e, s) {
  let n = h5[o],
    i = h5[t],
    a = new Vector3(i[0] - n[0], i[1] - n[1], i[2] - n[2]).normalize(),
    r = new Vector3(0, 0, -1),
    l = new Vector3().crossVectors(a, r);
  return new Matrix4().makeBasis(l, a, r).setPosition(n[0], n[1], n[2]);
}
var Au = {
  legL: zE(fs.lHip, fs.lKnee),
  legR: zE(fs.rHip, fs.rKnee),
  armL: zE(fs.lShoulder, fs.lElbow),
  armR: zE(fs.rShoulder, fs.rElbow),
};
function Jg(
  o,
  t,
  e,
  { side: s = 1, seam: n = 0, disp: i = null, e: a = 2.1, torso: r = !1 } = {},
) {
  let l = [],
    c = [],
    h = uh(
      t.length - 1,
      e,
      (f, u, d) => {
        let m = t[f];
        o(m, Lo);
        let p = n + (LE * u) / e,
          x = Math.cos(p),
          g = Math.sin(p),
          b,
          v = 0;
        (r
          ? (b = tf(x, g, Lo[1], Lo[2], Lo[3], Lo[4]))
          : (b = tf(x, g, Lo[2], Lo[3], Lo[4], a)),
          i && ((v = i(m, p)), (b += v)),
          r
            ? ((d[0] = b * x), (d[1] = m), (d[2] = Lo[0] + b * g))
            : ((d[0] = Lo[0] * s + b * x), (d[1] = m), (d[2] = Lo[1] + b * g)));
      },
      {
        wrapJ: !0,
      },
    );
  for (let f = 0; f < t.length; f++)
    for (let u = 0; u <= e; u++) {
      let d = t[f],
        m = n + (LE * (u % e)) / e;
      (c.push(d), l.push(i ? i(d, m) : 0));
    }
  return ((h.s = c), (h.d = l), h);
}
function TH(o, t) {
  Zb.length = 0;
  let e = new Color(t.shirt).multiplyScalar(0.7).getHex(),
    s =
      (i, a = 26) =>
      (r, l, c, h) =>
        ny(0.86 + a * i.d[h], 0.55, 1),
    n = (i, a, r) => {
      let l = new Color(i),
        c = new Color(a);
      return (l.lerp(c, r), l.getHex());
    };
  {
    let i = sy(
        [
          {
            amp: 0.005,
            lam: 0.045,
            k: 0,
            warp: 0.9,
            mask: (l, c) =>
              Gn(0.9, 0.96, l) * Gn(1.05, 1, l) * (0.5 + 0.5 * Math.max(-c, 0)),
          },
          {
            amp: 0.004,
            lam: 0.06,
            k: 2,
            warp: 0.7,
            mask: (l) => Gn(0.86, 0.92, l) * Gn(1, 0.94, l),
          },
        ],
        3.3,
      ),
      a = Jg(bH, bc(0.834, 1.09, 0.0142), 32, {
        torso: !0,
        seam: Math.PI / 2,
        disp: i,
      }),
      r = o.count;
    (o.add(a, {
      color: 16777215,
      camo: 1,
      surf: 0,
      rough: 0.9,
      ao: s(a),
      weights: (l, c, h, f) => xH(c, f),
    }),
      np(o, r, a.p.length / 3 - 33, 32, {
        dir: [0, -1, 0],
        face: [0, 1, 0],
        depth: 0.035,
        shrink: 0.06,
        color: e,
      }));
  }
  {
    let i = sy(
        [
          {
            amp: 0.006,
            lam: 0.038,
            k: 0,
            warp: 1,
            mask: (l) => Gn(1.07, 1.1, l) * Gn(1.22, 1.15, l),
          },
          {
            amp: 0.004,
            lam: 0.07,
            k: 1,
            warp: 0.8,
            mask: (l) => Gn(1.2, 1.3, l) * Gn(1.5, 1.42, l),
          },
        ],
        7.1,
      ),
      a = Jg(IR, bc(1.05, 1.57, 0.02), 30, {
        torso: !0,
        seam: Math.PI / 2,
        disp: i,
      }),
      r = o.count;
    (o.add(a, {
      color: t.shirt,
      camo: 0,
      surf: 0,
      rough: 0.92,
      nrm: 0.7,
      ao: s(a),
      weights: (l, c, h, f) => xH(c, f),
    }),
      np(o, r, a.p.length / 3 - 31, 30, {
        dir: [0, 1, 0],
        depth: 0.02,
        color: t.shirt,
        opts: {
          nrm: 0.7,
        },
      }));
  }
  for (let i = 0; i < 2; i++) {
    let a = i ? 1 : -1,
      r = qr,
      l = sy(
        [
          {
            amp: 0.0075,
            lam: 0.034,
            k: 0,
            warp: 0.9,
            sharp: 1.4,
            mask: (p, x) =>
              d2(p - r, 0.085) * (0.25 + 0.75 * Gn(0.25, -0.5, x)),
          },
          {
            amp: 0.005,
            lam: 0.03,
            k: 0,
            warp: 0.7,
            mask: (p, x) => d2(p - (r - 0.1), 0.045) * Gn(0, 0.6, x),
          },
          {
            amp: 0.0055,
            lam: 0.15,
            k: a,
            warp: 1.1,
            wf: 6,
            sharp: 2,
            mask: (p) => Gn(0.03, 0.12, p) * Gn(r - 0.04, r - 0.14, p),
          },
          {
            amp: 0.006,
            lam: 0.05,
            k: -2 * a,
            warp: 0.6,
            mask: (p, x, g) =>
              Gn(-0.05, 0.02, p) * Gn(0.17, 0.08, p) * Gn(-0.2, 0.5, x),
          },
          {
            amp: 0.005,
            lam: 0.12,
            k: -a,
            warp: 1,
            wf: 6,
            sharp: 1.8,
            mask: (p) => Gn(r + 0.07, r + 0.14, p) * Gn(0.7, 0.62, p),
          },
          {
            amp: 0.0075,
            lam: 0.027,
            k: 0,
            warp: 1.1,
            sharp: 1.3,
            mask: (p) => Gn(0.63, 0.7, p) * Gn(0.785, 0.765, p),
          },
        ],
        11 + i * 5.3,
      ),
      c = [
        ...bc(-0.075, 0.06, 0.027),
        ...bc(0.078, 0.33, 0.0194),
        ...bc(0.345, 0.54, 0.0139),
        ...bc(0.556, 0.665, 0.0218),
        ...bc(0.68, 0.788, 0.0135),
      ],
      h = Jg(MH, c, 26, {
        side: a,
        seam: i ? Math.PI : 0,
        disp: l,
      }),
      f = (p, x, g, b) => {
        let v = h.s[b],
          y =
            0.28 * d2(v - r, 0.07) * Gn(-0.02, 0.05, g) +
            0.22 * Gn(0.6, 0.78, v) +
            0.1 * (oy.fbm(v * 9 + i * 7, p * 30, 2) - 0.5);
        return n(16777215, t.dust, ny(y, 0, 0.5));
      },
      u = i ? Au.legR : Au.legL,
      d = h.s,
      m = o.count;
    (o.add(h, {
      color: f,
      camo: 1,
      surf: 0,
      rough: 0.9,
      ao: s(h),
      m: u,
      weights: (p, x, g, b, v) => FR(d[v], i, b),
    }),
      np(o, m, 0, 26, {
        dir: [0, 1, 0],
        depth: 0.03,
        color: 16777215,
        opts: {
          camo: 1,
          rough: 0.9,
        },
      }));
  }
  for (let i = 0; i < 2; i++) {
    let a = i ? 1 : -1,
      r = Ca,
      l = sy(
        [
          {
            amp: 0.006,
            lam: 0.03,
            k: 0,
            warp: 0.9,
            sharp: 1.4,
            mask: (d, m) => d2(d - r, 0.07) * (0.3 + 0.7 * Gn(-0.3, 0.5, m)),
          },
          {
            amp: 0.0045,
            lam: 0.11,
            k: a,
            warp: 1,
            wf: 7,
            sharp: 1.9,
            mask: (d) => Gn(0.04, 0.1, d) * Gn(r - 0.03, r - 0.1, d),
          },
          {
            amp: 0.004,
            lam: 0.09,
            k: -a,
            warp: 1,
            wf: 7,
            sharp: 1.8,
            mask: (d) => Gn(r + 0.05, r + 0.1, d) * Gn(0.5, 0.44, d),
          },
          {
            amp: 0.005,
            lam: 0.024,
            k: 0,
            warp: 1,
            mask: (d) => Gn(0.44, 0.48, d) * Gn(0.545, 0.525, d),
          },
          {
            amp: 0.005,
            lam: 0.04,
            k: 2 * a,
            warp: 0.7,
            mask: (d) => Gn(-0.05, 0, d) * Gn(0.09, 0.03, d),
          },
        ],
        23 + i * 3.7,
      ),
      c = [
        ...bc(-0.055, 0.06, 0.0192),
        ...bc(0.076, 0.22, 0.018),
        ...bc(0.232, 0.37, 0.0125),
        ...bc(0.384, 0.545, 0.0161),
      ],
      h = Jg(wH, c, 20, {
        side: a,
        seam: i ? Math.PI : 0,
        disp: l,
      }),
      f = h.s,
      u = (d, m, p, x) =>
        n(
          16777215,
          t.dust,
          ny(
            0.22 * d2(f[x] - r, 0.06) * Gn(-0.01, -0.04, p) +
              0.08 * (oy.fbm(f[x] * 11 + i * 3, d * 40, 2) - 0.5),
            0,
            0.4,
          ),
        );
    o.add(h, {
      color: u,
      camo: 1,
      surf: 0,
      rough: 0.9,
      ao: s(h),
      m: i ? Au.armR : Au.armL,
      weights: (d, m, p, x, g) => OR(f[g], i, x),
    });
  }
  {
    let i = (r, l) => {
        let c = -Math.sin(l),
          h = Math.abs(Math.cos(l)),
          f = Math.max(c, 0),
          u = 0.021 * d2(r - 1.668, 0.021) * Math.pow(f, 14);
        return (
          (u += 0.004 * d2(r - 1.642, 0.012) * Math.pow(f, 6)),
          (u += 0.006 * d2(r - 1.612, 0.016) * Math.pow(f, 5)),
          (u -=
            0.008 *
            d2(r - 1.694, 0.016) *
            Math.pow(f, 2) *
            Gn(0.25, 0.6, h) *
            Gn(0.95, 0.7, h)),
          (u += 0.004 * d2(r - 1.68, 0.03) * Gn(0.2, 0.7, f) * Gn(0.2, 0.6, h)),
          (u += (oy.fbm(r * 40, l * 3, 2, 0) - 0.5) * 0.002),
          (u +=
            0.0018 *
            Math.sin(r * 160 + h * 14) *
            d2(r - 1.63, 0.03) *
            Gn(0.2, 0.8, f)),
          u
        );
      },
      a = Jg(
        yH,
        [
          ...bc(1.56, 1.6, 0.02),
          ...bc(1.608, 1.7, 0.0092),
          ...bc(1.715, 1.808, 0.0155),
        ],
        30,
        {
          torso: !0,
          seam: Math.PI / 2,
          disp: i,
        },
      );
    o.add(a, {
      fp: 1,
      color: t.mask,
      camo: 0,
      surf: 0,
      rough: 0.88,
      nrm: 0.8,
      weights: (r, l, c, h) => vc(h, Ve.neck, Ve.head, yc(1.575, 1.61, l)),
    });
  }
  {
    let i = [
        [1.5, 0.006, 0.086, 0.078, 0.09, 2],
        [1.522, 0.004, 0.098, 0.09, 0.108, 2],
        [1.552, 0.002, 0.096, 0.09, 0.11, 2],
        [1.582, 0, 0.086, 0.084, 0.102, 2],
        [1.606, -0.002, 0.076, 0.076, 0.094, 2],
        [1.622, -0.004, 0.066, 0.068, 0.084, 2],
      ],
      a = sy(
        [
          {
            amp: 0.011,
            lam: 0.034,
            k: 1,
            warp: 1.5,
            wf: 14,
            sharp: 1.3,
            mask: () => 1,
          },
          {
            amp: 0.006,
            lam: 0.021,
            k: -2,
            warp: 1.2,
            wf: 20,
            mask: () => 1,
          },
        ],
        41,
      ),
      r = Jg(l2(i), bc(1.5, 1.622, 0.0087), 34, {
        torso: !0,
        seam: Math.PI / 2,
        disp: a,
      });
    o.add(r, {
      fp: 1,
      color: t.gaiter,
      camo: 0.55,
      surf: 0,
      rough: 0.95,
      ao: s(r, 22),
      weights: (l, c, h, f) => {
        vc(f, Ve.chest, Ve.neck, yc(1.55, 1.64, c));
      },
    });
  }
}
var Za = Math.PI / 180;
var _e = Vector3;
var Qi = Quaternion;
var k1 = (o, t, e) => o + (t - o) * e;
var bi = (o, t, e) => (o < t ? t : o > e ? e : o);
var $a = (o, t, e) => {
  let s = bi((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
var Gl = (o, t) => Math.exp(-(o * o) / (t * t));
var p2 = {
  HAND: 0,
  CUP: 1,
  I0: 2,
  I1: 3,
  I2: 4,
  M0: 5,
  M1: 6,
  M2: 7,
  R0: 8,
  R1: 9,
  R2: 10,
  L0: 11,
  L1: 12,
  L2: 13,
  T0: 14,
  T1: 15,
  T2: 16,
  F2: 17,
  F1: 18,
  F0: 19,
};
var M5 = 20;
var m2 = 17;
var ln = 14;
var dy = [-1, 0, 0, 2, 3, 0, 5, 6, 1, 8, 9, 1, 11, 12, 0, 14, 15, -1, -1, -1];
var Ui = 22;
var u4 = [
  [0, 4],
  [4, 8],
  [8, 12],
  [12, 16],
  [16, 21],
];
var Vl = [
  -20, -15, 0, -5, -20, -12, 0, -5, -20, -12, 0, -5, -20, -15, 0, -5, -30, -25,
  -115, -15, -20, 0,
];
var wc = [
  90, 24, 112, 80, 90, 12, 112, 80, 90, 12, 112, 80, 90, 15, 112, 80, 60, 60,
  45, 65, 85, 24,
];
var WE = [
  [0.0275, 0.0885, 5e-4],
  [0.0065, 0.0925, -0.001],
  [-0.0135, 0.087, 5e-4],
  [-0.0315, 0.0775, 0.004],
];
var DH = [4, 0, -4, -9];
var IH = [-4, 0, 5, 10];
var c4 = [
  [0.045, 0.026, 0.022],
  [0.05, 0.03, 0.023],
  [0.046, 0.028, 0.022],
  [0.036, 0.021, 0.02],
];
var HH = [
  [0.0108, 0.0104, 0.0097, 0.009],
  [0.0111, 0.0107, 0.01, 0.0092],
  [0.0105, 0.0101, 0.0095, 0.0088],
  [0.0095, 0.0092, 0.0086, 0.008],
];
var XR = [
  [0.0101, 0.0095, 0.0088, 0.0079],
  [0.0104, 0.0098, 0.009, 0.0081],
  [0.0099, 0.0093, 0.0086, 0.0077],
  [0.009, 0.0085, 0.0079, 0.0071],
];
var FH = [0.0215, 0.0175, 0.0095];
var pp = [0.046, 0.033, 0.029];
var up = [0.0168, 0.0129, 0.0121, 0.0108];
var dp = [0.016, 0.0118, 0.0107, 0.0084];
var rQ = new _e(0.5, 0.82, 0.28).normalize();
var SH = new _e(-0.74, 0.3, 0.6);
var OH = [-0.003, 0, -0.002];
var zu = 0.27;
var YE = 0.0112;
var Ul = [];
var mp = [];
var Ec = [];
var g2 = [];
{
  let o = (e) => new _e(e[0], e[1], e[2]);
  for (let e = 0; e < M5; e++)
    (Ul.push(new _e()),
      mp.push(new Qi()),
      Ec.push(new _e()),
      g2.push(new Qi()));
  Ul[1].copy(o(OH));
  let t = new Euler();
  for (let e = 0; e < 4; e++) {
    let s = 2 + 3 * e;
    (Ul[s].copy(o(WE[e])),
      dy[s] === 1 && Ul[s].sub(Ul[1]),
      mp[s]
        .setFromEuler(t.set(0, 0, -DH[e] * Za))
        .multiply(new Qi().setFromEuler(t.set(0, IH[e] * Za, 0))),
      Ul[s + 1].set(0, c4[e][0], 0),
      Ul[s + 2].set(0, c4[e][1], 0));
  }
  Ul[ln].copy(o(FH));
  {
    let e = rQ.clone(),
      s = SH.clone().addScaledVector(e, -SH.dot(e)).normalize(),
      n = new _e().crossVectors(e, s);
    mp[ln].setFromRotationMatrix(new Matrix4().makeBasis(n, e, s));
  }
  (Ul[ln + 1].set(0, pp[0], 0),
    Ul[ln + 2].set(0, pp[1], 0),
    Ul[18].set(0, -zu / 2, 0),
    Ul[19].set(0, -zu, 0));
}
var GE = new Qi();
var lQ = new Qi();
var v5 = (o, t) => {
  let e = o * Za * 0.5;
  return t.set(Math.sin(e), 0, 0, Math.cos(e));
};
var _H = (o, t) => {
  let e = o * Za * 0.5;
  return t.set(0, Math.sin(e), 0, Math.cos(e));
};
var qE = (o, t) => {
  let e = o * Za * 0.5;
  return t.set(0, 0, Math.sin(e), Math.cos(e));
};
function NH(o, t, e) {
  if (o === 1) return _H(t[21], e);
  if (o >= 2 && o < ln) {
    let s = (o - 2) % 3,
      n = (((o - 2) / 3) | 0) * 4;
    return s === 0
      ? qE(-t[n + 1], e)
          .multiply(v5(t[n], GE))
          .premultiply(mp[o])
      : v5(t[n + 1 + s], e);
  }
  return o === ln
    ? qE(-t[17], e)
        .multiply(v5(t[16], GE))
        .multiply(_H(t[18], GE))
        .premultiply(mp[o])
    : o === ln + 1
      ? v5(t[19], e)
      : o === ln + 2
        ? v5(t[20], e)
        : e.identity();
}
function BH(o, t, e, s, n) {
  (s[0].copy(o), n[0].copy(t));
  for (let i = 1; i < m2; i++) {
    let a = dy[i];
    (s[i].copy(Ul[i]).applyQuaternion(n[a]).add(s[a]),
      n[i].copy(n[a]).multiply(NH(i, e, lQ)));
  }
}
{
  let o = new Float32Array(Ui);
  BH(new _e(), new Qi(), o, Ec, g2);
  for (let t = m2; t < M5; t++) Ec[t].copy(Ul[t]);
}
function gs(o = {}, t = null) {
  let e = new Float32Array(Ui);
  t && e.set(t);
  let s = (n, i) => {
    if (n) for (let a = 0; a < n.length; a++) e[i + a] = n[a];
  };
  return (
    s(o.i, 0),
    s(o.m, 4),
    s(o.r, 8),
    s(o.l, 12),
    s(o.t, 16),
    o.cup != null && (e[21] = o.cup),
    e
  );
}
var pn = {
  zero: gs(),
  open: gs({
    i: [6, 4, 14, 8],
    m: [13, 1, 23, 12],
    r: [21, -2, 31, 16],
    l: [29, -6, 39, 20],
    t: [8, 24, -26, 10, 12],
    cup: 10,
  }),
  relaxed: gs({
    i: [36, 1, 46, 24],
    m: [43, 0, 53, 27],
    r: [50, -1, 60, 31],
    l: [56, -2, 66, 34],
    t: [16, 14, -34, 20, 26],
    cup: 12,
  }),
  flat: gs({
    i: [0, 2, 5, 3],
    m: [-1, 0, 4, 2],
    r: [1, -1, 6, 3],
    l: [4, -4, 9, 5],
    t: [4, 14, -8, 3, 5],
    cup: 0,
  }),
  reach: gs({
    i: [18, 3, 28, 14],
    m: [25, 1, 35, 18],
    r: [32, -2, 43, 22],
    l: [39, -5, 50, 25],
    t: [2, 28, -30, 8, 10],
    cup: 8,
  }),
  pre: gs({
    i: [-8, 2, 4, 2],
    m: [-8, 0, 4, 2],
    r: [-8, -1, 4, 2],
    l: [-8, -3, 4, 2],
    t: [-18, 34, 0, 0, 0],
    cup: 6,
  }),
  loose: gs({
    i: [50, 0, 62, 34],
    m: [58, 0, 70, 38],
    r: [64, 0, 76, 42],
    l: [70, -1, 80, 44],
    t: [16, 16, -36, 22, 30],
    cup: 14,
  }),
  carry: gs({
    i: [28, 2, 40, 20],
    m: [52, 0, 66, 36],
    r: [60, 0, 74, 40],
    l: [66, -1, 78, 42],
    t: [12, 18, -30, 14, 18],
    cup: 13,
  }),
  fitRelaxed: gs({
    i: [18, 3, 30, 15],
    m: [28, 0, 41, 19],
    r: [36, -2, 49, 23],
    l: [43, -5, 55, 26],
    t: [14, 22, -20, 15, 18],
    cup: 12,
  }),
  fist: gs({
    i: [78, 0, 100, 62],
    m: [82, 0, 102, 64],
    r: [84, 0, 102, 64],
    l: [86, 0, 100, 62],
    t: [38, 12, 20, 30, 45],
    cup: 14,
  }),
};
var cQ = [1, 0.86, 0.72, 0.58];
var hQ = [4, 9, 14, 19];
var fQ = [10, 16, 22, 28];
var uQ = [5, 8, 11, 14];
function Qa(o, t = 1) {
  let e = new Float32Array(o),
    s = Math.min(t, 1),
    n = Math.max(t - 1, 0);
  for (let i = 0; i < 4; i++) {
    let a = i * 4,
      r = n * cQ[i],
      l = Math.max(-6, e[a] - 26 * s);
    ((e[a] = Math.max(Math.min(l, hQ[i]), l - 26 * r)),
      (l = Math.max(4, e[a + 2] - 30 * s)),
      (e[a + 2] = Math.max(Math.min(l, fQ[i]), l - 30 * r)),
      (l = Math.max(2, e[a + 3] - 16 * s)),
      (e[a + 3] = Math.max(Math.min(l, uQ[i]), l - 16 * r)));
  }
  return (
    (e[16] = Math.max(Vl[16], e[16] - 14 * Math.min(t, 1.5))),
    (e[19] = Math.max(0, e[19] - 8 * t)),
    (e[20] = Math.max(-5, e[20] - 6 * t)),
    (e[21] *= Math.max(0, 1 - 0.4 * t)),
    e
  );
}
function xp(o, t, e, s) {
  for (let n = 0; n < Ui; n++) o[n] = t[n] + (e[n] - t[n]) * s;
  return o;
}
var bo = {
  FABRIC: 0,
  PALM: 1,
  RUB: 2,
  STRAP: 3,
  SLEEVE: 4,
};
var KR = class {
  constructor() {
    ((this.bins = []), (this.nsg = 0));
  }
  sg() {
    return ++this.nsg;
  }
  bin(t) {
    return (
      this.bins[t] ||
      (this.bins[t] = {
        p: [],
        uv: [],
        c: [],
        si: [],
        sw: [],
        sg: [],
        idx: [],
      })
    );
  }
  grid(t, e, s, n, i = {}) {
    let a = this.bin(t),
      r = a.p.length / 3,
      l = i.sg || this.sg(),
      c = {
        p: new _e(),
        u: 0,
        v: 0,
        c: 1,
        w: null,
      },
      h = new _e(),
      f = 0;
    for (let x = 0; x <= s; x++)
      for (let g = 0; g <= e; g++) {
        ((c.c = 1),
          n(g, x, c),
          a.p.push(c.p.x, c.p.y, c.p.z),
          a.uv.push(c.u, c.v),
          a.c.push(c.c, c.c, c.c),
          a.sg.push(l));
        let b = c.w.slice(),
          v = 0,
          y = [];
        for (let M = 0; M < b.length; M += 2)
          b[M + 1] > 1e-4 && y.push([b[M], b[M + 1]]);
        (y.sort((M, w) => w[1] - M[1]), (y.length = Math.min(y.length, 4)));
        for (let M of y) v += M[1];
        for (let M = 0; M < 4; M++)
          (a.si.push(y[M] ? y[M][0] : 0), a.sw.push(y[M] ? y[M][1] / v : 0));
        (h.add(c.p), f++);
      }
    i.center ? h.copy(i.center) : h.multiplyScalar(1 / f);
    let u = (x) => new _e(a.p[x * 3], a.p[x * 3 + 1], a.p[x * 3 + 2]),
      d = [],
      m = 0;
    for (let x = 0; x < s; x++)
      for (let g = 0; g < e; g++) {
        let b = r + x * (e + 1) + g,
          v = b + 1,
          y = b + e + 1,
          M = y + 1;
        for (let w of [
          [b, v, M],
          [b, M, y],
        ]) {
          let T = u(w[0]),
            S = u(w[1]),
            E = u(w[2]),
            _ = S.clone().sub(T).cross(E.clone().sub(T));
          _.lengthSq() < 1e-16 ||
            ((m += _.dot(
              T.add(S)
                .add(E)
                .multiplyScalar(1 / 3)
                .sub(h),
            )),
            d.push(w));
        }
      }
    let p = m < 0 != !!i.flip;
    for (let x of d)
      p ? a.idx.push(x[0], x[2], x[1]) : a.idx.push(x[0], x[1], x[2]);
  }
  build() {
    let t = new Map(),
      e = (p, x) =>
        p.sg[x] +
        "|" +
        Math.round(p.p[x * 3] * 2e5) +
        "|" +
        Math.round(p.p[x * 3 + 1] * 2e5) +
        "|" +
        Math.round(p.p[x * 3 + 2] * 2e5),
      s = new _e(),
      n = new _e(),
      i = new _e();
    for (let p of this.bins)
      if (p) {
        p.keys = [];
        for (let x = 0; x < p.sg.length; x++) p.keys.push(e(p, x));
        for (let x = 0; x < p.idx.length; x += 3) {
          let g = p.idx[x],
            b = p.idx[x + 1],
            v = p.idx[x + 2];
          (s.fromArray(p.p, g * 3),
            n.fromArray(p.p, b * 3).sub(s),
            i.fromArray(p.p, v * 3).sub(s),
            n.cross(i));
          for (let y of [g, b, v]) {
            let M = t.get(p.keys[y]);
            (M || t.set(p.keys[y], (M = new _e())), M.add(n));
          }
        }
      }
    let a = [],
      r = [],
      l = [],
      c = [],
      h = [],
      f = [],
      u = [],
      d = [];
    for (let p = 0; p < this.bins.length; p++) {
      let x = this.bins[p];
      if (!x) continue;
      let g = a.length / 3;
      for (let b = 0; b < x.sg.length; b++) {
        let v = t.get(x.keys[b]);
        v ? (s.copy(v).normalize(), r.push(s.x, s.y, s.z)) : r.push(0, 1, 0);
      }
      (a.push(...x.p),
        l.push(...x.uv),
        c.push(...x.c),
        h.push(...x.si),
        f.push(...x.sw),
        d.push([u.length, x.idx.length, p]));
      for (let b of x.idx) u.push(g + b);
    }
    let m = new BufferGeometry();
    (m.setAttribute("position", new Float32BufferAttribute(a, 3)),
      m.setAttribute("normal", new Float32BufferAttribute(r, 3)),
      m.setAttribute("uv", new Float32BufferAttribute(l, 2)),
      m.setAttribute("color", new Float32BufferAttribute(c, 3)),
      m.setAttribute("skinIndex", new Uint16BufferAttribute(h, 4)),
      m.setAttribute("skinWeight", new Float32BufferAttribute(f, 4)),
      m.setIndex(u));
    for (let p of d) m.addGroup(p[0], p[1], p[2]);
    return m;
  }
};
var l4 = new _e();
var KE = (o, t, e, s, n) => n.set(t, e, s).applyQuaternion(g2[o]).add(Ec[o]);
function UH(o) {
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
var jE = (o) => (t) => {
  let e = o.length;
  if (t <= o[0][0]) return o[0][1];
  if (t >= o[e - 1][0]) return o[e - 1][1];
  let s = 0;
  for (; t > o[s + 1][0];) s++;
  return k1(o[s][1], o[s + 1][1], (t - o[s][0]) / (o[s + 1][0] - o[s][0]));
};
function s4(o, t, e, s, n, i = {}) {
  let a = [],
    r = i.nb || 3,
    l = i.tip || 0,
    c = o - l;
  for (let h = 0; h <= r; h++) {
    let f = h / r,
      u = Math.sin(Math.PI * f),
      d = k1(e, n, f);
    a.push({
      y: c * f,
      a: k1(t, s, f) * (1 - (i.waist || 0) * u),
      bd: d - (i.flat || 0) * u,
      bp: d + (i.pad || 0) * u,
    });
  }
  if (l)
    for (let h of [26, 50, 72, 90]) {
      let f = Math.cos(h * Za),
        u = Math.sin(h * Za);
      a.push({
        y: c + l * u,
        a: s * Math.pow(f, 0.85),
        bd: (n - (i.nail || 0) * u) * f,
        bp: (n + (i.pulp || 0) * u) * f,
      });
    }
  else
    for (let h of [30, 60, 90]) {
      let f = Math.cos(h * Za),
        u = Math.sin(h * Za);
      a.push({
        y: o + n * u,
        a: s * f,
        bd: n * f,
        bp: n * f,
      });
    }
  return ((a.L = o), (a.nb = r), a);
}
var ay = {
  y: 0,
  a: 0,
  bd: 0,
  bp: 0,
};
function IE(o, t) {
  let e = bi(Math.floor(t), 0, o.length - 2),
    s = t - e,
    n = o[e],
    i = o[e + 1];
  return (
    (ay.y = k1(n.y, i.y, s)),
    (ay.a = k1(n.a, i.a, s)),
    (ay.bd = k1(n.bd, i.bd, s)),
    (ay.bp = k1(n.bp, i.bp, s)),
    ay
  );
}
function hy(o, t, e) {
  let s = Math.sin(t);
  return e.set(o.a * Math.cos(t), o.y, (s >= 0 ? o.bp : o.bd) * s);
}
function n4(o, t, e, s) {
  let n = o.sg(),
    i = (s.nu || 12) / 2,
    a = e.length - 1,
    r = e.L,
    l = (e[0].a + e[e.nb].a) * 0.5,
    c = KE(t, 0, r * 0.5, 0, new _e());
  for (let [h, f, u] of [
    [s.matP, 0, 1],
    [s.matD, Math.PI, 0],
  ])
    o.grid(
      h,
      i,
      a,
      (d, m, p) => {
        let x = e[m],
          g = f + (Math.PI * d) / i;
        (hy(x, g, l4),
          KE(t, l4.x, l4.y, l4.z, p.p),
          (p.u = l * g),
          (p.v = x.y));
        let b = Math.abs(Math.sin(g));
        ((p.c =
          1 -
          (u ? 0.46 : 0.34) * (0.35 + 0.65 * b) * Gl(x.y, 0.004) -
          (u ? 0.34 : 0.24) * (0.35 + 0.65 * b) * Gl(x.y - r, 0.0045) +
          (u ? 0 : 0.05 * b * Gl(x.y - r * 0.5, r * 0.3))),
          (p.w = [t, 1]));
      },
      {
        sg: n,
        center: c,
      },
    );
  return e;
}
var ha = new _e();
var h4 = new _e();
var gp = new _e();
var Mc = new _e();
function p5(o, t, e, s, n, i, a, r, l, c, h, f = {}) {
  let u = KE(e, 0, s.L * 0.5, 0, new _e()),
    d = s[0].a;
  o.grid(
    t,
    l,
    c,
    (m, p, x) => {
      let g = m / l,
        b = p / c,
        v = k1(n, i, g),
        y = k1(a, r, b);
      (hy(IE(s, y), v, ha),
        hy(IE(s, y), v + 0.02, h4),
        hy(IE(s, Math.min(y + 0.02, s.length - 1.001)), v, gp));
      let M = y + 0.02 > s.length - 1.001;
      (M && hy(IE(s, y - 0.02), v, gp),
        Mc.copy(h4).sub(ha).cross(gp.sub(ha)).normalize(),
        M && Mc.negate(),
        Mc.x * ha.x + Mc.z * ha.z < 0 && Mc.negate(),
        ha.addScaledVector(Mc, h(g, b)),
        KE(e, ha.x, ha.y, ha.z, x.p),
        (x.u = d * v),
        (x.v = ha.y),
        (x.c = f.c ? f.c(g, b) : 1),
        (x.w = [e, 1]));
    },
    {
      center: u,
    },
  );
}
var o4 =
  (o, t = 0, e = 4) =>
  (s, n) => {
    let i =
      (1 - Math.pow(Math.abs(2 * s - 1), e)) *
      (1 - Math.pow(Math.abs(2 * n - 1), e));
    return 12e-5 - t + (o + t) * Math.pow(i, 0.6);
  };
var f4 = UH([
  [-0.047, 0.065],
  [-0.0315, 0.0775],
  [-0.0135, 0.087],
  [0.0065, 0.0925],
  [0.0275, 0.0885],
  [0.0445, 0.079],
]);
var YR = UH([
  [-0.047, 0.008],
  [-0.0315, 0.004],
  [-0.0135, 5e-4],
  [0.0065, -0.001],
  [0.0275, 5e-4],
  [0.0445, 0.0035],
]);
var Lu = 0.09;
var my = {
  W: [
    [-0.062, 0.0335],
    [-0.03, 0.0325],
    [0, 0.0318],
    [0.02, 0.0372],
    [0.045, 0.0405],
    [0.07, 0.0422],
    [0.09, 0.0428],
  ],
  Xc: [
    [-0.062, 0],
    [0, 0],
    [0.03, 0.0016],
    [0.09, -0.001],
  ],
  H: [
    [-0.062, 0.0232],
    [-0.03, 0.0214],
    [0, 0.0192],
    [0.02, 0.0158],
    [0.045, 0.0128],
    [0.07, 0.0116],
    [0.09, YE],
  ],
  E: [
    [-0.062, 1],
    [-0.005, 1],
    [0.022, 0.84],
    [0.05, 0.72],
    [0.09, 0.7],
  ],
};
var VH = jE(my.W);
var jR = jE(my.Xc);
var XE = jE(my.H);
var GH = jE(my.E);
var $E = (o, t) =>
  0.0078 * Gl(o - 0.0195, 0.0135) * Gl(t - 0.03, 0.021) +
  0.0058 * Gl(o + 0.0265, 0.0115) * Gl(t - 0.031, 0.025) -
  0.0016 * Gl(o, 0.012) * Gl(t - 0.052, 0.018) +
  0.0017 * Gl(t - 0.079, 0.009);
var RH = (o, t) => Math.sign(o) * Math.pow(Math.abs(o), t);
function HE(o, t, e, s) {
  let n = Math.min(t, Lu),
    i = GH(n),
    a = RH(Math.cos(o), i),
    r = RH(Math.sin(o), i),
    l = Math.max(0, n / Lu),
    c = Math.cos(e * Za),
    h = Math.sin(e * Za),
    f = jR(n) + VH(n) * a * (1 - 0.05 * h),
    u = r > 0 ? XE(n) + $E(f, n) : XE(n),
    d = t < 0 ? t : l * f4(f) + YE * h * (1 - 0.55 * Math.pow(Math.abs(a), 3));
  return s.set(f, d, l * l * YR(f) + u * r * c);
}
function AH(o, t, e, s, n) {
  let i = (a, r, l) => {
    let c = f4(a),
      h,
      f = 1;
    if (r <= 0) h = r;
    else if (r <= c) h = (r / c) * Lu;
    else {
      h = Lu;
      let g = Math.min(0.999, (r - c) / YE);
      f = Math.sqrt(1 - g * g);
    }
    let u = GH(h),
      d = bi((a - jR(h)) / VH(h), -0.999, 0.999),
      m = Math.pow(1 - Math.pow(Math.abs(d), 2 / u), u / 2),
      p = Math.max(0, h / Lu),
      x = e > 0 ? XE(h) + $E(a, h) : XE(h);
    return l.set(a, r, p * p * YR(a) + e * x * m * f);
  };
  return (
    i(o, t, s),
    n &&
      (i(o + 6e-4, t, h4),
      i(o, t + 6e-4, gp),
      n.copy(h4.sub(s)).cross(gp.sub(s)).normalize(),
      n.z * e < 0 && n.negate()),
    s
  );
}
var FE = new _e();
function dQ(o, t, e) {
  FE.subVectors(e, t);
  let s = bi(l4.subVectors(o, t).dot(FE) / FE.lengthSq(), 0, 1);
  return l4.copy(t).addScaledVector(FE, s).distanceTo(o);
}
function OE(o) {
  let t = 1 - $a(-0.03, 0.012, o.y),
    e = $a(-0.001, -0.014, o.x) * $a(0.012, 0.046, o.y),
    s =
      0.85 *
      (1 - $a(0.012, 0.03, dQ(o, Ec[ln], Ec[ln + 1]))) *
      $a(-0.006, 0.004, o.x) *
      $a(-0.01, 0.002, o.z),
    n = 1 - t;
  return (
    (e *= n),
    (s *= n * (1 - e)),
    [p2.F2, t, p2.CUP, e, p2.T0, s, p2.HAND, Math.max(0, 1 - t - e - s)]
  );
}
function pQ() {
  let o = new KR(),
    t = createNoise(977);
  for (let e = 0; e < 4; e++) {
    let s = 2 + 3 * e,
      n = c4[e],
      i = HH[e],
      a = XR[e],
      r = e === 3 ? 0.88 : 1,
      l = n4(
        o,
        s,
        s4(n[0], i[0], a[0], i[1], a[1], {
          pad: 0.0013,
          waist: 0.075,
          flat: 9e-4,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
        },
      ),
      c = n4(
        o,
        s + 1,
        s4(n[1], i[1], a[1], i[2], a[2], {
          pad: 0.0011,
          waist: 0.07,
          flat: 8e-4,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
        },
      ),
      h = n4(
        o,
        s + 2,
        s4(n[2], i[2], a[2], i[3], a[3], {
          pad: 0.001,
          tip: i[3] * 0.92,
          pulp: 0.001,
          nail: 6e-4,
          nb: 2,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
        },
      );
    (p5(
      o,
      bo.RUB,
      s,
      l,
      Math.PI * 1.2,
      Math.PI * 1.8,
      0.75,
      2.55,
      4,
      4,
      o4(0.0013 * r),
      {
        c: (f, u) => 1 + 0.2 * Math.pow(Math.abs(2 * f - 1), 3),
      },
    ),
      p5(
        o,
        bo.RUB,
        s + 1,
        c,
        Math.PI * 1.22,
        Math.PI * 1.78,
        0.6,
        2.5,
        4,
        3,
        o4(0.0011 * r),
        {
          c: (f, u) => 1 + 0.2 * Math.pow(Math.abs(2 * f - 1), 3),
        },
      ),
      p5(
        o,
        bo.RUB,
        s + 2,
        h,
        Math.PI * 0.14,
        Math.PI * 0.86,
        0.5,
        4.6,
        4,
        5,
        o4(5e-4),
        {
          c: () => 0.42,
        },
      ));
    for (let f of [0, Math.PI])
      for (let [u, d, m] of [
        [s, l, 3],
        [s + 1, c, 3],
        [s + 2, h, 3.6],
      ])
        p5(
          o,
          bo.STRAP,
          u,
          d,
          f - 0.1,
          f + 0.1,
          0.25,
          m,
          2,
          3,
          (p) => 1e-4 + 7e-4 * (1 - Math.abs(2 * p - 1)),
          {
            c: () => 4.6,
          },
        );
  }
  for (let e = 0; e < 3; e++) {
    let s = 2 + 3 * e,
      n = s + 3,
      i = Ec[s].clone().add(Ec[n]).multiplyScalar(0.5),
      a = new _e(0, 1, 0)
        .applyQuaternion(g2[s])
        .add(new _e(0, 1, 0).applyQuaternion(g2[n]))
        .normalize();
    i.addScaledVector(a, 0.0065);
    let r = new Qi().setFromUnitVectors(new _e(0, 1, 0), a),
      l = o.sg();
    o.grid(
      bo.PALM,
      8,
      5,
      (c, h, f) => {
        let u = (c / 8) * Math.PI * 2,
          d = (h / 5) * Math.PI,
          m = Math.sin(d);
        (f.p
          .set(
            0.0062 * m * Math.cos(u),
            0.0125 * Math.cos(d),
            0.008 * m * Math.sin(u),
          )
          .applyQuaternion(r)
          .add(i),
          (f.u = u * 0.008),
          (f.v = d * 0.008),
          (f.c = 0.8),
          (f.w = [s, 0.5, n, 0.5]));
      },
      {
        sg: l,
        center: i,
      },
    );
  }
  {
    let e = n4(
        o,
        ln,
        s4(pp[0], up[0], dp[0], up[1], dp[1], {
          pad: 0.003,
          waist: 0,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
          nu: 12,
        },
      ),
      s = n4(
        o,
        ln + 1,
        s4(pp[1], up[1], dp[1], up[2], dp[2], {
          pad: 0.0014,
          waist: 0.1,
          flat: 0.001,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
          nu: 12,
        },
      ),
      n = n4(
        o,
        ln + 2,
        s4(pp[2], up[2], dp[2], up[3], dp[3], {
          pad: 0.0012,
          tip: up[3] * 0.92,
          pulp: 0.0011,
          nail: 8e-4,
          nb: 2,
        }),
        {
          matP: bo.PALM,
          matD: bo.FABRIC,
          nu: 12,
        },
      );
    (p5(
      o,
      bo.RUB,
      ln + 1,
      s,
      Math.PI * 1.22,
      Math.PI * 1.78,
      0.6,
      2.5,
      4,
      3,
      o4(0.0012),
      {
        c: (i) => 1 + 0.2 * Math.pow(Math.abs(2 * i - 1), 3),
      },
    ),
      p5(
        o,
        bo.RUB,
        ln + 2,
        n,
        Math.PI * 0.12,
        Math.PI * 0.88,
        0.4,
        4.6,
        4,
        5,
        o4(5e-4),
        {
          c: () => 0.42,
        },
      ));
    for (let i of [0, Math.PI])
      for (let [a, r, l] of [
        [ln + 1, s, 3],
        [ln + 2, n, 3.6],
      ])
        p5(
          o,
          bo.STRAP,
          a,
          r,
          i - 0.1,
          i + 0.1,
          0.25,
          l,
          2,
          3,
          (c) => 1e-4 + 7e-4 * (1 - Math.abs(2 * c - 1)),
          {
            c: () => 4.6,
          },
        );
    {
      let i = Ec[ln].clone(),
        a = Ec[ln + 1].clone(),
        r = new _e(0.03, 0.023, 0.004),
        l = new _e(0.0365, 0.076, 0.0015),
        c = o.sg(),
        h = new _e(),
        f = new _e(),
        u = new _e(),
        d = new _e(),
        m = new _e(),
        p = i.clone().add(a).add(r).add(l).multiplyScalar(0.25);
      for (let [x, g] of [
        [bo.PALM, 1],
        [bo.FABRIC, -1],
      ])
        o.grid(
          x,
          6,
          5,
          (b, v, y) => {
            let M = b / 6,
              w = v / 5,
              T = 0.06 + w * (0.94 - 0.42 * Math.sin(Math.PI * M));
            (h.lerpVectors(i, a, T),
              f.lerpVectors(r, l, T),
              u.subVectors(f, h).normalize(),
              d.subVectors(a, i).lerp(gp.subVectors(l, r), M).normalize(),
              m.crossVectors(u, d).normalize(),
              m.z < 0 && m.negate());
            let S =
              (0.005 + 0.0045 * Math.pow(2 * M - 1, 2)) *
              Math.sqrt(1 - Math.pow(w, 4));
            (y.p.lerpVectors(h, f, M).addScaledVector(m, g * S),
              (y.u = M * 0.03),
              (y.v = T * 0.05),
              (y.c = 0.9 - 0.12 * Math.sin(Math.PI * M)));
            let E = M * M * (3 - 2 * M);
            y.w = [ln, 1 - E, p2.HAND, E];
          },
          {
            sg: c,
            center: p,
            flip: g < 0,
          },
        );
    }
  }
  {
    let e = [];
    for (let l of [
      -0.062,
      -0.048,
      -0.034,
      -0.0325,
      -0.02,
      -0.0095,
      -0.008,
      0.004,
      0.016,
      0.03,
      0.044,
      0.058,
      0.072,
      0.083,
      Lu,
    ])
      e.push([l, 0]);
    for (let l of [32, 62, 90]) e.push([Lu, l]);
    let s = o.sg(),
      n = 12,
      i = new _e(0, 0.03, 0),
      a = (l, c, h, f, u, d, m, p) =>
        o.grid(
          l,
          f - h,
          d - u,
          (x, g, b) => {
            let v = h + x,
              y = u + g,
              M = c + (Math.PI * v) / n,
              w = e[y][0],
              T = f - h === 2 * n,
              S = g === 0 || y === d || (!T && (x === 0 || v === f));
            (HE(M, w, 0, ha),
              HE(M + 0.03, w, 0, h4),
              HE(M, w + 0.002, 0, gp),
              Mc.copy(h4).sub(ha).cross(gp.sub(ha)).normalize(),
              Mc.x * (ha.x - jR(Math.max(w, 0))) + Mc.z * ha.z < 0 &&
                Mc.negate(),
              b.p.copy(ha).addScaledVector(Mc, S ? 25e-5 : m),
              (b.u = M * 0.036),
              (b.v = b.p.y),
              (b.c = p),
              (b.w = OE(b.p)));
          },
          {
            center: new _e(0, (e[u][0] + e[d][0]) / 2, 0),
          },
        );
    for (let [l, c, h] of [
      [bo.PALM, 0, 1],
      [bo.FABRIC, Math.PI, 0],
    ])
      o.grid(
        l,
        n,
        e.length - 1,
        (f, u, d) => {
          let m = c + (Math.PI * f) / n,
            p = e[u][0];
          (HE(m, p, e[u][1], d.p),
            (d.u = m * 0.036),
            (d.v = d.p.y),
            (d.c = h
              ? 1 -
                0.22 * Gl(d.p.x, 0.014) * Gl(p - 0.05, 0.02) -
                0.16 * Gl(p, 0.008)
              : 1 - 0.14 * Gl(p, 0.008) + 0.05 * Gl(p - 0.05, 0.03)),
            e[u][1] > 0 && (d.c *= 0.86),
            (d.w = OE(d.p)));
        },
        {
          sg: s,
          center: i,
        },
      );
    ((l, c, h, f, u, d, m, p, x, g) =>
      o.grid(
        l,
        d,
        m,
        (b, v, y) => {
          let M = b / d,
            w = v / m,
            T = k1(c, h, M),
            S = k1(
              typeof f == "function" ? f(T) : f,
              typeof u == "function" ? u(T) : u,
              w,
            );
          (AH(T, S, p, ha, Mc),
            ha.addScaledVector(Mc, x(M, w)),
            y.p.copy(ha),
            (y.u = T),
            (y.v = S),
            (y.c = g ? g(M, w) : 1),
            (y.w = OE(y.p)));
        },
        {
          center: i,
        },
      ))(
      bo.RUB,
      -0.0385,
      0.0375,
      (l) => f4(l) - 0.031,
      (l) => f4(l) + 0.0015,
      14,
      5,
      -1,
      o4(0.0012, 0, 6),
      (l, c) => 0.9 + 0.2 * Math.pow(Math.abs(2 * c - 1), 4),
    );
    for (let l = 0; l < 4; l++) {
      let c = l === 3 ? 0.84 : 1,
        h = WE[l][0],
        f = WE[l][1] - 0.0045;
      o.grid(
        bo.RUB,
        8,
        3,
        (u, d, m) => {
          let p = (u / 8) * Math.PI * 2,
            x = d / 3,
            g = h + 0.0086 * c * x * Math.cos(p),
            b = f + 0.0112 * c * x * Math.sin(p);
          (AH(g, b, -1, ha, Mc),
            ha.addScaledVector(
              Mc,
              8e-4 + 0.0036 * c * Math.pow(1 - x * x, 0.65),
            ),
            m.p.copy(ha),
            (m.u = g),
            (m.v = b),
            (m.c = 1.1 + 0.2 * x),
            (m.w = OE(m.p)));
        },
        {
          center: i,
        },
      );
    }
    (a(bo.PALM, 0, 6, 10, 7, 11, 0.001, 1.9),
      a(bo.PALM, 0, 1, 4, 8, 11, 0.001, 1.9),
      a(bo.STRAP, 0, 0, 2 * n, 2, 6, 0.0014, 1),
      a(bo.RUB, Math.PI, 2, 8, 2, 6, 0.0032, 1.5),
      a(bo.STRAP, 0, 5, 7, 1, 5, 0.003, 0.8));
  }
  {
    let e = [
        -0.0352, -0.0356, -0.05, -0.0512, -0.066, -0.086, -0.11, -0.14, -0.175,
        -0.215, -0.26, -0.31, -0.37, -0.44, -0.52, -0.6,
      ],
      s = 16,
      n = o.sg();
    o.grid(
      bo.SLEEVE,
      s,
      e.length - 1,
      (i, a, r) => {
        let l = e[a],
          c = (i / s) * Math.PI * 2,
          h = bi(-l / zu, 0, 2.3),
          f = k1(0.0388, 0.05, Math.min(1, h)) + Math.max(0, h - 1) * 0.004,
          u = k1(0.0286, 0.0465, Math.min(1, h)) + Math.max(0, h - 1) * 0.005,
          d = a === 0 ? -0.004 : a <= 2 ? 0.0014 : 0,
          m =
            a <= 3
              ? 0
              : (t.fbm((c / (Math.PI * 2)) * 6, h * 9, 3, 6) - 0.5) *
                  0.0105 *
                  $a(0.02, 0.2, h) +
                Math.sin(h * 46 + Math.sin(c * 2) * 1.6) *
                  0.0011 *
                  Gl(h - 0.16, 0.16);
        ((f += d + m),
          (u += d + m),
          r.p.set(f * Math.cos(c), l, u * Math.sin(c)),
          (r.u = (c / (Math.PI * 2)) * 0.27),
          (r.v = l),
          (r.c = a === 0 ? 0.5 : 0.82 + 30 * m + (a <= 2 ? 0.1 : 0)));
        let p = zu / 2;
        r.w =
          l > -p
            ? [p2.F2, 1 + l / p, p2.F1, -l / p]
            : l > -zu
              ? [p2.F1, 2 + l / p, p2.F0, -1 - l / p]
              : [p2.F0, 1];
      },
      {
        sg: n,
        center: new _e(0, -0.3, 0),
      },
    );
  }
  return o.build();
}
var NR = null;
function $R() {
  if (NR) return NR;
  let o = performance.now(),
    t = pQ(),
    e = t.attributes.position,
    s = t.attributes.skinIndex,
    n = t.attributes.skinWeight,
    i = Array.from(
      {
        length: M5,
      },
      () => [],
    ),
    a = Array.from(
      {
        length: M5,
      },
      () => [],
    ),
    r = new _e(),
    l = new Qi(),
    c = (S) =>
      S >= 2 && S < ln
        ? c4[((S - 2) / 3) | 0][(S - 2) % 3]
        : S >= ln && S < m2
          ? pp[S - ln]
          : 0;
  for (let S = 0; S < e.count; S++) {
    let E = s.getX(S),
      _ = n.getX(S);
    if (_ < 0.6 || E >= m2) continue;
    let R = E === ln && _ < 0.999;
    (R && (E = 0), r.fromBufferAttribute(e, S));
    let C = 0;
    (E === 0 || E === 1) &&
      r.z > 0.004 &&
      r.y > -0.005 &&
      r.y < 0.066 &&
      (C = 0.0055 * $a(0.066, 0.045, r.y));
    let L = E >= 2 && E < ln ? (E - 2) % 3 : -1;
    ((E === 0 || E === 1 || E === ln) &&
      r.z > 0.002 &&
      r.y > 0 &&
      r.y < 0.075 &&
      (C +=
        (R ? 1.1 : 0.75) * Math.max(0, $E(r.x, (r.y / f4(r.x)) * Lu)) +
        (R ? 0.002 : 0)),
      r.sub(Ec[E]).applyQuaternion(l.copy(g2[E]).invert()),
      L >= 0 && L < 2 && r.z > 0.004 && (C = 0.0016),
      i[E].push(r.x, r.y, r.z, C),
      r.y >= c(E) * 0.3 && a[E].push(r.x, r.y, r.z, C));
  }
  let h = Ec.map((S, E) =>
      new Matrix4().compose(S, g2[E], new _e(1, 1, 1)).invert(),
    ),
    f = (S) => {
      let E = S.length / 4,
        _ = [0, 0, 0, 0];
      if (!E) return _;
      for (let R = 0; R < S.length; R += 4)
        ((_[0] += S[R] / E), (_[1] += S[R + 1] / E), (_[2] += S[R + 2] / E));
      for (let R = 0; R < S.length; R += 4)
        _[3] = Math.max(
          _[3],
          Math.hypot(S[R] - _[0], S[R + 1] - _[1], S[R + 2] - _[2]),
        );
      return _;
    },
    u = performance.now(),
    d = jI(CQ),
    m = new Float32Array(Kg * 3);
  for (let S = 1; S < m2; S++) Ec[S].toArray(m, S * 3);
  (Ec[ln].toArray(m, ep * 3), (m[r5 * 3 + 1] = -zu));
  let p = performance.now(),
    x = null,
    g = p;
  typeof document < "u" &&
    ((x = ZI(d.geometry, d.info)),
    (g = performance.now()),
    Object.assign(x, XI()));
  let b = d.info.layout,
    v = t4[0],
    y = [v.camoA, v.camoB, v.camoC, v.camoD].flatMap((S) =>
      new Color(S).toArray(),
    ),
    M = {
      pivots: m,
      debug: {
        value: 0,
      },
      info: d.info,
      thumbRef: new _e().fromArray(d.info.thumbRef),
      tex: x,
      camo: new Float32Array(y),
      texel: new Vector4(1 / b.SZ, b.S / b.SZ, b.SZ / (b.S * 14), 0),
    },
    w = performance.now(),
    T = new BufferGeometry();
  for (let S in d.geometry.attributes)
    T.setAttribute(S, d.geometry.attributes[S]);
  return (
    T.setIndex(d.geometry.index),
    T.setDrawRange(0, d.geometry.index.count - 3 * d.info.stats.watchTris),
    (NR = {
      geometry: d.geometry,
      bare: T,
      info: d.info,
      shared: M,
      proxy: t,
      clouds: i.map((S) => new Float32Array(S)),
      pads: a.map((S) => new Float32Array(S)),
      bounds: i.map(f),
      padBounds: a.map(f),
      inverses: h,
      tris: d.geometry.index.count / 3,
      ms: {
        proxy: +(u - o).toFixed(1),
        mesh: +(p - u).toFixed(1),
        atlas: +(g - p).toFixed(1),
        sleeveTex: +(w - g).toFixed(1),
      },
    })
  );
}
var ZE = Array.from(
  {
    length: m2,
  },
  () => new _e(),
);
var py = Array.from(
  {
    length: m2,
  },
  () => new Qi(),
);
var mQ = new _e();
var gQ = new Qi();
var gh = new _e();
var WH = (o, t, e) => e.set(t.x * o, t.y, t.z);
var ZR = (o, t, e) => e.set(t.x, t.y * o, t.z * o, t.w);
function d4(o, t, e, s) {
  BH(WH(o, t, mQ), ZR(o, e, gQ), s, ZE, py);
}
function gy(o, t, e, s = !1, n = 1 / 0, i = 4) {
  let a = $R(),
    r = s ? a.pads : a.clouds,
    l = s ? a.padBounds : a.bounds,
    c = n;
  for (let h of e) {
    let f = r[h],
      u = ZE[h],
      d = py[h],
      m = l[h];
    if (!(
      n !== 1 / 0 &&
      (gh.set(m[0], m[1], m[2]).applyQuaternion(d).add(u),
      t(gh.x * o, gh.y, gh.z) - m[3] >= c)
    ))
      for (let p = 0; p < f.length; p += i) {
        gh.set(f[p], f[p + 1], f[p + 2])
          .applyQuaternion(d)
          .add(u);
        let x = t(gh.x * o, gh.y, gh.z) + f[p + 3];
        x < c && (c = x);
      }
  }
  return c;
}
var xQ = Array.from(
  {
    length: m2,
  },
  (o, t) => t,
);
function yi(o, t, e, s, n, i = xQ) {
  d4(o, t, e, s);
  let a = -1 / 0,
    r = -1;
  for (let l of i) {
    let c = -gy(o, n, [l]);
    c > a && ((a = c), (r = l));
  }
  return {
    depth: a,
    bone: r,
  };
}
function Tc(o, t, e, s, n) {
  return (d4(o, t, e, s), [4, 7, 10, 13, 16].map((i) => gy(o, n, [i])));
}
function m5(o, t, e, s, n, i = 2) {
  let a = o[t],
    r = e >= a ? 1 : -1,
    l = a,
    c = s() >= n,
    h = c ? l : null,
    f = h,
    u = c;
  for (; l !== e;) {
    let d = r > 0 ? Math.min(e, l + i) : Math.max(e, l - i);
    o[t] = d;
    let m = s() >= n;
    if (c && !m) {
      let p = l,
        x = d;
      for (let g = 0; g < 6; g++) {
        let b = (p + x) / 2;
        ((o[t] = b), s() >= n ? (p = b) : (x = b));
      }
      return ((o[t] = p), 1);
    }
    (m && ((f = d), h === null && (h = d)), (c = m), (l = d));
  }
  return c ? ((o[t] = u ? a : h), 0) : ((o[t] = f !== null ? f : a), -1);
}
function yo(o, t, e, s, n, i = {}) {
  let a = new Float32Array(s),
    r = i.skin ?? 0.001,
    l = i.max || {},
    c = i.dip ?? 0.6,
    h = (f) => () => (d4(o, t, e, a), gy(o, n, f, !0, r));
  for (let f of i.fingers || [0, 1, 2, 3]) {
    let u = f * 4,
      d = 2 + 3 * f,
      m = Math.min(wc[u + 2], l.pip ?? 200),
      p = Math.min(wc[u + 3], l.dip ?? 200),
      x = h([d, d + 1, d + 2]),
      g = Math.min(wc[u], l.mcp ?? 200);
    for (let b = 0; b < 9; b++) {
      ((a[u] = s[u]),
        (a[u + 2] = s[u + 2]),
        (a[u + 3] = s[u + 3]),
        m5(a, u, g, h([d]), r) === 0 && m5(a, u, g, x, r) === 0 && (a[u] = g),
        m5(a, u + 2, m, h([d + 1]), r) === 0 &&
          m5(a, u + 2, m, h([d + 1, d + 2]), r) === 0 &&
          (a[u + 2] = Math.min(m, i.curl ?? 80)));
      let v = m5(a, u + 3, p, h([d + 2]), r);
      for (let y = 0; v < 0 && y < 40 && a[u + 2] > Vl[u + 2]; y++)
        ((a[u + 2] = Math.max(Vl[u + 2], a[u + 2] - 2)),
          (a[u + 3] = s[u + 3]),
          (v = m5(a, u + 3, p, h([d + 2]), r)));
      if (
        (v === 0 &&
          (a[u + 3] = bi(Math.max(s[u + 3], a[u + 2] * c), Vl[u + 3], p)),
        x() >= r * 0.5 || a[u] <= s[u])
      )
        break;
      g = Math.max(s[u], a[u] - 7);
    }
  }
  for (let [f, u] of i.thumb || []) {
    let d = bi(u, Vl[f], wc[f]);
    m5(
      a,
      f,
      d,
      h(
        f <= 18 ? [ln, ln + 1, ln + 2] : f === 19 ? [ln + 1, ln + 2] : [ln + 2],
      ),
      r,
    );
  }
  return a;
}
function zi(o, t, e, s, n, i, a = {}) {
  let r = a.skin ?? 0.001,
    l = a.bones || [0, 1, 2, 5, 8, 11],
    c = a.max ?? 0.05,
    h = t.clone(),
    f = (m, p) => (
      t.copy(h).addScaledVector(i, m),
      d4(o, t, e, s),
      gy(o, n, l, !1, r, p)
    ),
    u = -c,
    d = null;
  if (f(u, 12) < r) return (t.copy(h), 0);
  for (let m = -c + 0.002; m <= c; m += 0.002) {
    if (f(m, 12) < r) {
      d = m;
      break;
    }
    u = m;
  }
  if (d === null) return (t.copy(h), 0);
  for (let m = 0; m < 6; m++) {
    let p = (u + d) / 2;
    f(p, 12) < r ? (d = p) : (u = p);
  }
  for (let m = 0; m < 4 && f(u, 4) < r; m++) u -= 4e-4;
  return (t.copy(h).addScaledVector(i, u), u);
}
function kH(o, t, e, s) {
  let n = t.length,
    i = [];
  for (let a = 0; a <= n; a++) {
    let r = t.slice();
    (a > 0 && (r[a - 1] += e),
      i.push({
        x: r,
        f: o(r),
      }));
  }
  for (let a = 0; a < s; a++) {
    i.sort((u, d) => u.f - d.f);
    let r = new Array(n).fill(0);
    for (let u = 0; u < n; u++)
      for (let d = 0; d < n; d++) r[d] += i[u].x[d] / n;
    let l = i[n],
      c = (u) => r.map((d, m) => d + u * (l.x[m] - d)),
      h = c(-1),
      f = o(h);
    if (f < i[0].f) {
      let u = c(-2),
        d = o(u);
      i[n] =
        d < f
          ? {
              x: u,
              f: d,
            }
          : {
              x: h,
              f,
            };
    } else if (f < i[n - 1].f)
      i[n] = {
        x: h,
        f,
      };
    else {
      let u = c(f < l.f ? -0.5 : 0.5),
        d = o(u);
      if (d < Math.min(f, l.f))
        i[n] = {
          x: u,
          f: d,
        };
      else
        for (let m = 1; m <= n; m++)
          ((i[m].x = i[m].x.map((p, x) => i[0].x[x] + 0.5 * (p - i[0].x[x]))),
            (i[m].f = o(i[m].x)));
    }
  }
  return (i.sort((a, r) => a.f - r.f), i[0]);
}
var bQ = new _e();
function Mn(o, t, e, s, n, i, a, r = {}) {
  let l = n === 4,
    c = n * 4,
    h = r.bone ?? (l ? ln + 2 : 4 + 3 * n),
    f = r.skin ?? 8e-4,
    u = r.dip ?? 0.55,
    d = r.free || (l ? [16, 17, 18, 19, 20] : [c, c + 1, c + 2]),
    m = r.lim || {},
    p = d.map((O) => (m[O] ? m[O][0] : Vl[O])),
    x = d.map((O) => (m[O] ? m[O][1] : wc[O])),
    g = l ? [ln, ln + 1, ln + 2] : [2 + 3 * n, 3 + 3 * n, 4 + 3 * n],
    b = l ? pp[2] : c4[n][2],
    v = l ? dp[3] : XR[n][3],
    y = r.pad || [0, b * 0.55, v * 1.05],
    M = i.x * o,
    w = i.y,
    T = i.z,
    S = r.normalW ?? 0.012,
    E = r.normal
      ? new _e(r.normal.x * o, r.normal.y, r.normal.z).normalize()
      : null,
    _ = !l && !r.free,
    R = 0,
    C = (O) => {
      let H = 0;
      for (let P = 0; P < d.length; P++) {
        let z = bi(O[P], p[P], x[P]);
        ((H += Math.abs(O[P] - z)), (s[d[P]] = z));
      }
      (_ && (s[c + 3] = bi(s[c + 2] * u, Vl[c + 3], wc[c + 3])),
        d4(o, t, e, s),
        gh.set(y[0], y[1], y[2]).applyQuaternion(py[h]).add(ZE[h]),
        (R = Math.hypot(gh.x - M, gh.y - w, gh.z - T)));
      let F = R + H * 4e-4;
      return (
        E && (F += S * (1 - bQ.set(0, 0, 1).applyQuaternion(py[h]).dot(E))),
        a && (F += Math.max(0, f - gy(o, a, g, !1, f, L ? 12 : 4)) * 30),
        F
      );
    },
    L = !0,
    A = kH(
      C,
      d.map((O) => s[O]),
      14,
      30 + 14 * d.length,
    );
  return ((L = !1), (A = kH(C, A.x, 4, 10 + 6 * d.length)), C(A.x), R);
}
function E5(o, t, e, s, n, i, a) {
  return (
    d4(o, t, e, s),
    a.copy(i).applyQuaternion(py[n]).add(ZE[n]),
    (a.x *= o),
    a
  );
}
function Yo(o, t, e, s, n = [0, 0.05, 0.012], i = 0) {
  let a = e.clone().normalize(),
    r = s.clone().addScaledVector(a, -s.dot(a)).normalize(),
    l = new _e().crossVectors(a, r),
    c = new Qi().setFromRotationMatrix(new Matrix4().makeBasis(l, a, r));
  i && c.multiply(new Qi().setFromAxisAngle(new _e(0, 1, 0), i * Za));
  let h = new _e(n[0] * o, n[1], n[2]).applyQuaternion(c);
  return {
    pos: t.clone().sub(h),
    quat: c,
  };
}
var i4 = {
  ext: 62 * Za,
  flex: 68 * Za,
  ulnar: 34 * Za,
  radial: 22 * Za,
  twist: 105 * Za,
};
var NE = new _e(0, -1, 0);
var g5 = new _e();
var Cu = new _e();
var cf = new _e();
var fy = new _e();
var fp = new _e();
var BR = new _e();
var x5 = new _e();
var CH = new _e();
var PH = new Qi();
var UR = new Qi();
var y5 = new Qi();
var uy = new Qi();
var a4 = new Qi();
var yQ = new Matrix4();
var vQ = (o, t) => {
  let e = 0.72 * t;
  return o <= e ? o : e + (t - e) * (1 - Math.exp(-(o - e) / (t - e)));
};
var w5 = class {
  constructor(t) {
    let e = $R();
    ((this.side = t),
      (this.root = new Group()),
      (this.root.name = t > 0 ? "armR" : "armL"),
      (this.root.scale.x = t),
      (this.bones = []));
    for (let s = 0; s < M5; s++) {
      let n = new Bone();
      (n.position.copy(Ul[s]), n.quaternion.copy(mp[s]), this.bones.push(n));
    }
    for (let s = 0; s < M5; s++)
      (dy[s] < 0 ? this.root : this.bones[dy[s]]).add(this.bones[s]);
    ((this.material = $I(e.shared)),
      (this.joints = this.material.userData.joints),
      (this.material.userData.watch.value = t < 0 ? 1 : 0),
      (this.gap = this.material.userData.gap.value),
      this.material.userData.seed.value.set(
        t < 0 ? 0.137 : 0,
        t < 0 ? 0.291 : 0,
      ),
      (this.mesh = new SkinnedMesh(t < 0 ? e.geometry : e.bare, this.material)),
      (this.mesh.name = t > 0 ? "handR" : "handL"),
      (this.mesh.frustumCulled = !1),
      this.root.add(this.mesh),
      this.mesh.bind(
        new Skeleton(
          this.bones,
          e.inverses.map((s) => s.clone()),
        ),
        new Matrix4(),
      ),
      (this.elbow = new _e()),
      (this.shoulder = new _e()),
      (this.hasShoulder = !1),
      (this.wrist = {
        swing: 0,
        twist: 0,
      }),
      this.write(new _e(), new Qi(), pn.relaxed, null, null));
  }
  write(t, e, s, n, i) {
    let a = this.side,
      r = this.bones,
      l = r[0].position,
      c = r[0].quaternion;
    (WH(a, t, l), ZR(a, e, c));
    for (let x = 1; x < m2; x++) NH(x, s, r[x].quaternion);
    if ((PH.copy(c).invert(), n)) {
      g5.set(n.x * a, n.y, n.z).sub(l);
      let x = g5.length();
      x > 1e-5
        ? Cu.copy(g5)
            .multiplyScalar(1 / x)
            .applyQuaternion(PH)
        : Cu.copy(NE);
    } else Cu.copy(NE);
    let h = Math.acos(bi(-Cu.y, -1, 1)),
      f = 1,
      u = 0;
    if (h > 1e-5) {
      let x = Math.atan2(Cu.z, Cu.x);
      ((f = Math.cos(x)), (u = Math.sin(x)));
      let g = f >= 0 ? i4.radial : i4.ulnar,
        b = u >= 0 ? i4.flex : i4.ext;
      h = vQ(h, 1 / Math.sqrt((f / g) * (f / g) + (u / b) * (u / b)));
    }
    (Cu.set(Math.sin(h) * f, -Math.cos(h), Math.sin(h) * u),
      UR.setFromUnitVectors(NE, Cu),
      a4.copy(c).multiply(UR),
      g5.copy(Cu).applyQuaternion(c),
      x5.copy(g5).negate(),
      i ? fy.set(i.x * a, i.y, i.z) : fy.set(1, 0, 0).applyQuaternion(a4),
      fp.copy(fy).addScaledVector(x5, -fy.dot(x5)),
      fp.lengthSq() < 1e-6 && fp.set(1, 0, 0).applyQuaternion(a4),
      fp.normalize(),
      CH.crossVectors(fp, x5),
      y5.setFromRotationMatrix(yQ.makeBasis(fp, x5, CH)),
      BR.set(1, 0, 0).applyQuaternion(a4));
    let d = Math.atan2(cf.crossVectors(fp, BR).dot(x5), fp.dot(BR)),
      m = bi(d, -i4.twist, i4.twist);
    (m !== d && y5.premultiply(uy.setFromAxisAngle(x5, d - m)),
      uy.setFromAxisAngle(MQ, m * 0.5),
      uy.premultiply(y5),
      r[17].position.copy(l),
      r[17].quaternion.copy(a4),
      r[18].position.copy(l).addScaledVector(g5, zu * 0.5),
      r[18].quaternion.copy(uy),
      r[19].position.copy(l).addScaledVector(g5, zu),
      r[19].quaternion.copy(y5),
      this.elbow.copy(r[19].position),
      (this.elbow.x *= a),
      (this.wrist.swing = h),
      (this.wrist.twist = m));
    let p = this.joints;
    for (let x = 1; x < m2; x++)
      (ly(ry.copy(wQ[x]).multiply(r[x].quaternion), ei).applyQuaternion(g2[x]),
        (p[x * 4] = ei.x),
        (p[x * 4 + 1] = ei.y),
        (p[x * 4 + 2] = ei.z),
        (p[x * 4 + 3] = s[EQ[x]] * Za));
    if (
      (ly(qE(-s[17], ry).multiply(v5(s[16], GE)), ei).applyQuaternion(g2[ln]),
      (p[ln * 4] = ei.x),
      (p[ln * 4 + 1] = ei.y),
      (p[ln * 4 + 2] = ei.z),
      ei.set(0, s[18] * Za, 0).applyQuaternion(g2[ln]),
      (p[ep * 4] = ei.x),
      (p[ep * 4 + 1] = ei.y),
      (p[ep * 4 + 2] = ei.z),
      (p[ep * 4 + 3] = s[18] * Za),
      ly(UR, ei),
      (p[Wg * 4] = -ei.x),
      (p[Wg * 4 + 1] = -ei.y),
      (p[Wg * 4 + 2] = -ei.z),
      (p[Wg * 4 + 3] = h * u),
      this.hasShoulder)
    ) {
      cf.set(this.shoulder.x * a, this.shoulder.y, this.shoulder.z).sub(
        r[19].position,
      );
      let x = cf.length();
      x > 1e-4
        ? (cf.multiplyScalar(1 / x).applyQuaternion(ry.copy(y5).invert()),
          ly(ry.setFromUnitVectors(NE, cf), ei))
        : ei.set(0, 0, 0);
    } else ei.set(0, 0, 0);
    ((p[r5 * 4] = ei.x),
      (p[r5 * 4 + 1] = ei.y),
      (p[r5 * 4 + 2] = ei.z),
      (p[r5 * 4 + 3] = ei.length()));
    {
      let x = this.gap;
      for (let g = 0; g < 3; g++) {
        let b = g * 4,
          v = s[b + 1] - s[b + 5],
          y = Math.abs(s[b] - s[b + 4]) + 0.5 * Math.abs(s[b + 2] - s[b + 6]);
        x.setComponent(g, (1 - $a(1, 9, v)) * (1 - $a(22, 60, y)));
      }
    }
    (ly(ry.copy(y5).invert().multiply(a4), ei),
      (p[qg * 4] = ei.x),
      (p[qg * 4 + 1] = ei.y),
      (p[qg * 4 + 2] = ei.z),
      (p[qg * 4 + 3] = m));
  }
};
var MQ = new _e(0, 1, 0);
var ry = new Qi();
var ei = new _e();
var wQ = mp.map((o) => o.clone().invert());
var EQ = [0, 21, 0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15, 16, 19, 20];
function ly(o, t) {
  let e = Math.hypot(o.x, o.y, o.z);
  if (e < 1e-9) return t.set(0, 0, 0);
  let s = (2 * Math.atan2(e, Math.abs(o.w)) * (o.w < 0 ? -1 : 1)) / e;
  return t.set(o.x * s, o.y * s, o.z * s);
}
var TQ = {
  shoulderR: new _e(0.215, -0.335, 0.115),
  shoulderL: new _e(-0.215, -0.335, 0.115),
  upper: 0.345,
  fore: 0.3,
  pole: new _e(0.34, -0.9, 0.22),
  up: new _e(0.18, 1, 0.3).normalize(),
  stiff: 210,
  damp: 24,
  reach: 0.82,
};
var VR = new _e();
var r4 = new _e();
var BE = new _e();
var cy = new _e();
var UE = new Matrix4();
var ar0 = new Matrix4();
var GR = new _e();
var WR = new _e();
function SQ(o, t, e, s) {
  let n = o > 0 ? e.shoulderR : e.shoulderL;
  s.set(
    o * bi(Math.abs(n.x), 0.15, 0.25),
    bi(n.y, -0.4, -0.26),
    Math.max(n.z, 0),
  );
  let i = (e.upper + e.fore) * e.reach,
    a = s.distanceTo(t);
  return (a > i && s.lerp(t, 1 - i / a), s);
}
function _Q(o, t, e, s, n) {
  r4.subVectors(t, n);
  let i = r4.length();
  r4.multiplyScalar(1 / Math.max(i, 1e-5));
  let a = e.upper,
    r = e.fore;
  i = bi(i, Math.abs(a - r) + 0.02, a + r - 0.004);
  let l = (i * i + a * a - r * r) / (2 * i),
    c = Math.sqrt(Math.max(0, a * a - l * l));
  return (
    BE.set(e.pole.x * o, e.pole.y, e.pole.z),
    BE.addScaledVector(r4, -BE.dot(r4)).normalize(),
    s
      .copy(t)
      .addScaledVector(r4, -(i - l))
      .addScaledVector(BE, c)
  );
}
var RQ = [3.5, 0.5, -3, -6.5];
var AQ = [0, 2, 6, 10];
var kQ = [30, 26, 22.5, 19.5, 24, 21, 21];
var qR = new _e();
var Pu = new _e();
var b5 = new Qi();
var VE = new Qi();
function zH(o, t, e) {
  let s = u4[e],
    n = 0;
  for (let i = s[0]; i < s[1]; i++) {
    let a = Math.abs(o[i] - t[i]) * (i === 18 ? 0.5 : 1);
    a > n && (n = a);
  }
  return n;
}
var LH = () => ({
  p: new _e(),
  v: new _e(),
  a: new _e(),
  al: new _e(),
  vl: new _e(),
  ok: !1,
  w: new Float32Array(5),
  wT: new Float32Array(5),
  x: new Float32Array(7),
  xv: new Float32Array(7),
  free: 0,
  quat: new Qi(),
});
var hf = class {
  constructor(t, e = {}) {
    ((this.gun = t),
      (this.cfg = {
        ...TQ,
        ...e,
      }));
    {
      let n = globalThis.GH_TUNE;
      n &&
        ((this.cfg.shoulderL = new _e(
          n.slx ?? this.cfg.shoulderL.x,
          n.sly ?? this.cfg.shoulderL.y,
          n.slz ?? this.cfg.shoulderL.z,
        )),
        (this.cfg.shoulderR = new _e(
          n.srx ?? this.cfg.shoulderR.x,
          n.sry ?? this.cfg.shoulderR.y,
          n.srz ?? this.cfg.shoulderR.z,
        )),
        (this.cfg.pole = new _e(
          n.plx ?? this.cfg.pole.x,
          n.ply ?? this.cfg.pole.y,
          n.plz ?? this.cfg.pole.z,
        )));
    }
    ((this.R = new w5(1)),
      (this.L = new w5(-1)),
      t.root.add(this.R.root, this.L.root));
    let s = () => ({
      pos: new _e(),
      quat: new Qi(),
      pose: new Float32Array(Ui),
      life: 1,
    });
    ((this.clip = {
      R: s(),
      L: s(),
      trig: 0,
      press: 0,
    }),
      (this.rest = {
        R: s(),
        L: s(),
      }),
      (this.out = {
        R: new Float32Array(Ui),
        L: new Float32Array(Ui),
      }),
      (this.trigPose = null),
      (this.pressPose = null),
      (this.el = {
        R: {
          p: new _e(),
          v: new _e(),
          ok: !1,
        },
        L: {
          p: new _e(),
          v: new _e(),
          ok: !1,
        },
      }),
      (this.time = 0),
      (this.trig = 0),
      (this.sinceTrig = 9),
      (this.touched = !1),
      (this.idleT = 0),
      (this.regripAt = 5),
      (this.regripT = -1),
      (this.life = {
        R: LH(),
        L: LH(),
      }),
      (this.lifeK = 1),
      (this._cam = new Matrix4()),
      (this._hip = new Matrix4()),
      (this._clipM = new Matrix4()));
  }
  setRest(t, e, s, n) {
    let i = this.rest[t];
    (i.pos.copy(e), i.quat.copy(s), i.pose.set(n));
  }
  reset() {
    for (let t of ["R", "L"]) {
      let e = this.clip[t],
        s = this.rest[t];
      (e.pos.copy(s.pos),
        e.quat.copy(s.quat),
        e.pose.set(s.pose),
        (e.life = 1));
    }
    ((this.clip.trig = 0), (this.clip.press = 0));
  }
  _compose(t, e, s) {
    let n = this.out.R,
      i = this.out.L;
    if (
      (n.set(this.clip.R.pose), i.set(this.clip.L.pose), this.trigPose && t > 0)
    )
      for (let a = 0; a < 4; a++) n[a] += (this.trigPose[a] - n[a]) * t;
    if (this.pressPose && e > 0)
      for (let a = 0; a < 4; a++)
        n[a] += (this.pressPose[a] - this.trigPose[a]) * e * t;
    s && s(n, i);
  }
  flush(t) {
    this.touched = !0;
    let e = this.gun.hip;
    (this._hip.compose(e.pos, y5.setFromEuler(e.rot), cf.set(1, 1, 1)),
      t
        ? (this._clipM.compose(t.pos, uy.setFromEuler(t.rot), cf.set(1, 1, 1)),
          this._cam.multiplyMatrices(this._hip, this._clipM))
        : this._cam.copy(this._hip),
      this._compose(this.clip.trig, this.clip.press, null),
      this._arms(this._cam, 0, null));
  }
  _arms(t, e, s) {
    (UE.copy(t).invert(), GR.copy(this.cfg.up).transformDirection(UE));
    for (let n of ["R", "L"]) {
      let i = this[n],
        a = this.clip[n],
        r = i.side,
        l = this.el[n];
      (VR.copy(a.pos).applyMatrix4(t),
        SQ(r, VR, this.cfg, WR),
        _Q(r, VR, this.cfg, cy, WR),
        i.shoulder.copy(WR).applyMatrix4(UE),
        (i.hasShoulder = !0));
      let c = s && (r > 0 ? s.elbowR : s.elbowL);
      if ((c && cy.add(c), e > 0 && l.ok)) {
        let h = Math.min(e, 0.05),
          f = Math.ceil(h / 0.008);
        h /= f;
        for (let u = 0; u < f; u++)
          (l.v
            .addScaledVector(cf.subVectors(cy, l.p), this.cfg.stiff * h)
            .multiplyScalar(Math.max(0, 1 - this.cfg.damp * h)),
            l.p.addScaledVector(l.v, h));
      } else (l.p.copy(cy), l.v.set(0, 0, 0), (l.ok = e > 0 || l.ok));
      (cf.copy(e > 0 ? l.p : cy).applyMatrix4(UE),
        fy.copy(GR),
        r < 0,
        i.write(
          a.pos,
          e > 0 && this.life[n].free > 0.002 ? this.life[n].quat : a.quat,
          this.out[n],
          cf,
          GR,
        ));
    }
  }
  update(t, e = {}) {
    let s = this.gun.root;
    this.time += t;
    let n = e.trigger != null;
    Math.max(
      n ? (e.trigger > 0.02 ? 1 : 0) : this.clip.trig,
      (e.ads || 0) > 0.45 ? 1 : 0,
    ) > 0.5
      ? (this.sinceTrig = 0)
      : (this.sinceTrig += t);
    let a = this.sinceTrig < 0.55 && !(e.sprint > 0.5) ? 1 : 0;
    ((this.trig +=
      (a - this.trig) * (1 - Math.exp(-t * (a > this.trig ? 38 : 9)))),
      t <= 0 && (this.trig = a));
    let r = n ? e.trigger : this.clip.press,
      l = !this.touched;
    ((this.touched = !1),
      (this.idleT = l ? this.idleT + t : 0),
      l &&
        this.regripT < 0 &&
        this.idleT > this.regripAt &&
        ((this.regripT = 0),
        (this.regripAt = 4.5 + ((this.time * 7.31) % 1) * 5)),
      this.regripT >= 0 &&
        ((this.regripT += t),
        (this.regripT > 0.7 || !l) && ((this.regripT = -1), (this.idleT = 0))),
      e.rig &&
        (s.updateWorldMatrix(!0, !1),
        e.rig.updateWorldMatrix(!0, !1),
        this._cam.copy(e.rig.matrixWorld).invert().multiply(s.matrixWorld)),
      this._kin("R", t),
      this._kin("L", t));
    let c = this.time,
      h = this.regripT,
      f = l ? 1 : 0.35;
    (this._compose(this.trig, r, (u, d) => {
      for (let m = 0; m < 4; m++) {
        let p = m * 4,
          x = Math.sin(c * 1.55 + m * 0.9) * 0.9 * f,
          g = Math.sin(c * 0.83 + m * 1.7 + 2) * 0.7 * f;
        if (
          ((d[p] += x * 0.5),
          (d[p + 2] += x),
          (d[p + 3] += x * 0.6),
          m > 0 && ((u[p + 2] += g * 0.6), (u[p + 3] += g * 0.4)),
          h >= 0)
        ) {
          let b = bi((h - m * 0.045) / 0.5, 0, 1),
            v = Math.sin(Math.PI * Math.pow(b, 0.6)) * (1 - b) * 2.2;
          ((d[p] -= 9 * v), (d[p + 2] -= 12 * v), (d[p + 3] -= 6 * v));
        }
      }
      ((d[16] += Math.sin(c * 1.1 + 1) * 0.6 * f),
        (d[20] += Math.sin(c * 1.3) * 1 * f),
        this._life("R", u),
        this._life("L", d));
    }),
      this._arms(this._cam, t, e));
  }
  _kin(t, e) {
    let s = this.life[t],
      n = this.clip[t],
      i = this[t].side,
      a = this.gun.grips,
      r = this.rest[t].pose;
    for (let x = 0; x < 5; x++) {
      let g = zH(n.pose, r, x);
      if (a)
        for (let b in a) {
          let v = a[b];
          if (v.side === t && v.pose) {
            let y = zH(n.pose, v.pose, x);
            y < g && (g = y);
          }
        }
      s.wT[x] = $a(5, 20, g);
    }
    if (!(e > 0)) {
      (s.w.set(s.wT), s.x.fill(0), s.xv.fill(0), (s.free = 0), (s.ok = !1));
      return;
    }
    (Pu.copy(n.pos).applyMatrix4(this._cam),
      (!s.ok || Pu.distanceToSquared(s.p) > 0.0625) &&
        (s.p.copy(Pu), s.v.set(0, 0, 0), s.a.set(0, 0, 0), (s.ok = !0)));
    let l = Math.min(e, 0.05),
      c = 1 - Math.exp(-l * 26);
    (qR.subVectors(Pu, s.p).multiplyScalar(1 / l),
      s.p.copy(Pu),
      Pu.subVectors(qR, s.v).multiplyScalar(1 / l),
      s.v.lerp(qR, 1 - Math.exp(-l * 40)),
      Pu.lengthSq() > 3600 && Pu.setLength(60),
      s.a.lerp(Pu, c),
      b5.setFromRotationMatrix(this._cam).invert(),
      ZR(i, n.quat, VE).invert(),
      s.al.copy(s.a).applyQuaternion(b5),
      (s.al.x *= i),
      s.al.applyQuaternion(VE),
      s.vl.copy(s.v).applyQuaternion(b5),
      (s.vl.x *= i),
      s.vl.applyQuaternion(VE));
    let h = 1;
    for (let x = 0; x < 5; x++)
      ((s.w[x] +=
        (s.wT[x] - s.w[x]) * (1 - Math.exp(-l * (s.wT[x] > s.w[x] ? 16 : 11)))),
        s.w[x] < h && (h = s.w[x]));
    s.free = h;
    let f = bi(-(0.3 * s.al.z + 2.4 * s.vl.z), -4.5, 6.2),
      u = bi(-(0.16 * s.al.z + 1.2 * s.vl.z), -5, 5),
      d = bi(0.11 * s.al.x + 0.9 * s.vl.x, -3.5, 3.5),
      m = Math.ceil(l / 0.006),
      p = l / m;
    for (let x = 0; x < 7; x++) {
      let g = kQ[x],
        b = x < 5 ? f * (x === 4 ? 0.6 : 1) : x === 5 ? u : d,
        v = s.x[x],
        y = s.xv[x];
      for (let M = 0; M < m; M++)
        ((y += (g * g * (b - v) - 1.25 * g * y) * p), (v += y * p));
      ((s.x[x] = v), (s.xv[x] = y));
    }
    (v5(s.x[5] * h * this.lifeK, b5).multiply(qE(-s.x[6] * h * this.lifeK, VE)),
      (b5.y *= i),
      (b5.z *= i),
      s.quat.copy(n.quat).multiply(b5));
  }
  _life(t, e) {
    let s = this.life[t],
      n = s.w,
      i = s.wT,
      a = s.x,
      r = this.lifeK,
      l = r * this.clip[t].life,
      c = e[0] + e[2],
      h = e[4] + e[6],
      f = e[8] + e[10],
      u = e[12] + e[14],
      d = e[1] - e[13],
      m = 1 - $a(45, 85, (c + h + f + u) * 0.25),
      p = 1 - $a(8, 20, Math.max(c, h, f, u) - Math.min(c, h, f, u)),
      x =
        $a(-5, -1, d) *
        (1 - $a(5, 10, d)) *
        (1 - $a(4, 8, Math.max(Math.abs(e[5]), Math.abs(e[9])))),
      g = l * m * p,
      b = l * m * x;
    for (let v = 0; v < 4; v++) {
      let y = v * 4,
        M = n[v],
        w = Math.min(n[v], i[v]);
      if (M < 0.002) continue;
      let T = AQ[v] * g * w,
        S = a[v] * r * (a[v] > 0 ? w : M),
        E = RQ[v] * b * w * (1 - $a(15, 60, e[y]));
      ((e[y] = bi(e[y] + 0.8 * T + 0.45 * S, Vl[y], wc[y])),
        (e[y + 1] = bi(e[y + 1] + E, Vl[y + 1], wc[y + 1])),
        (e[y + 2] = bi(e[y + 2] + T + 0.8 * S, Vl[y + 2], wc[y + 2])),
        (e[y + 3] = bi(e[y + 3] + 0.5 * T + 0.5 * S, Vl[y + 3], wc[y + 3])));
    }
    if (n[4] > 0.002) {
      let v = Math.min(n[4], i[4]),
        y =
          m *
          $a(16, 26, e[17]) *
          (1 - $a(4, 12, Math.abs(e[18]))) *
          (1 - $a(8, 22, e[19] + e[20])),
        M = 0.4 * a[4] * r * (a[4] > 0 ? v : n[4]);
      ((e[18] = bi(e[18] - 12 * l * y * v, Vl[18], wc[18])),
        (e[19] = bi(e[19] + 0.6 * M, Vl[19], wc[19])),
        (e[20] = bi(e[20] + M, Vl[20], wc[20])));
    }
    e[21] = bi(
      e[21] + 4 * g * Math.min(n[2], n[3], i[2], i[3]),
      Vl[21],
      wc[21],
    );
  }
  snap() {
    ((this.life.R.ok = this.life.L.ok = !1),
      this.life.R.x.fill(0),
      this.life.R.xv.fill(0),
      this.life.L.x.fill(0),
      this.life.L.xv.fill(0),
      (this.el.R.ok = this.el.L.ok = !1),
      (this.trig = 0),
      (this.sinceTrig = 9),
      (this.regripT = -1),
      (this.idleT = 0));
  }
};
var CQ = {
  NB: M5,
  NHB: m2,
  TH: ln,
  PARENT: dy,
  BONE: p2,
  BIND_P: Ul,
  BIND_Q: mp,
  BW_P: Ec,
  BW_Q: g2,
  F_MCP: WE,
  F_FAN: DH,
  F_ROLL: IH,
  F_LEN: c4,
  F_A: HH,
  F_B: XR,
  T_POS: FH,
  T_LEN: pp,
  T_A: up,
  T_B: dp,
  CUP_POS: OH,
  FORE_LEN: zu,
  RK: YE,
  PY: Lu,
  PTS: my,
  kY: f4,
  kZ: YR,
  palmPads: $E,
  LIM_LO: Vl,
  LIM_HI: wc,
};
var qH = () => $R();
var QE = (o, t, e, s) => Yo(o, t, e, s, [0, 0, 0]);

export {
  AE,
  Au,
  CE,
  CR,
  Ca,
  DE,
  E5,
  FR,
  JI,
  Mn,
  OR,
  PE,
  Pi,
  QE,
  Qa,
  Qg,
  Ru,
  Sn,
  TH,
  Tc,
  Tu,
  Ui,
  Ve,
  Wr,
  Xg,
  Yc,
  Yg,
  Yo,
  d5,
  dh,
  e4,
  eH,
  en,
  ey,
  f2,
  fs,
  gE,
  gs,
  h2,
  hf,
  hp,
  io,
  iy,
  kE,
  ku,
  l2,
  l5,
  lf,
  mH,
  mh,
  nf,
  np,
  pH,
  pn,
  qH,
  qr,
  rf,
  t4,
  tH,
  tf,
  ti,
  u2,
  u4,
  u5,
  uh,
  vH,
  w5,
  xp,
  yE,
  yi,
  yo,
  zi,
};

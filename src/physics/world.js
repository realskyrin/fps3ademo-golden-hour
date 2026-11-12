// physics/world.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  BufferGeometry,
  Matrix3,
  Mesh,
  MeshBasicMaterial,
  Vector3,
} from "../vendor/three-r180.js";

var Gd = 4;
var Nr = 1e-4;
var Tg = 0.001;
var U9 = class {
  constructor(t, e, s) {
    ((this.material = t),
      (this.shadow = e),
      (this.receive = s),
      (this.pos = []),
      (this.nrm = []),
      (this.uv = []));
  }
  quad(t, e, s, n, i, a, r, l, c) {
    let h = this.pos,
      f = this.nrm,
      u = this.uv;
    h.push(
      t[0],
      t[1],
      t[2],
      e[0],
      e[1],
      e[2],
      s[0],
      s[1],
      s[2],
      t[0],
      t[1],
      t[2],
      s[0],
      s[1],
      s[2],
      n[0],
      n[1],
      n[2],
    );
    for (let d = 0; d < 6; d++) f.push(i[0], i[1], i[2]);
    u.push(
      a[0],
      a[1],
      r[0],
      r[1],
      l[0],
      l[1],
      a[0],
      a[1],
      l[0],
      l[1],
      c[0],
      c[1],
    );
  }
};
var CollisionWorld = class {
  constructor() {
    ((this.cols = []),
      (this.grid = new Map()),
      (this.batches = new Map()),
      (this.meshes = []),
      (this.surfOf = new Map()),
      (this._stamp = 0),
      (this._q = []),
      (this._ao = {
        pos: [],
        col: [],
      }),
      (this.loose = []));
  }
  addCollider(t, e, s, n, i, a, r = "concrete", l = null) {
    let c = {
      x0: Math.min(t, n),
      y0: Math.min(e, i),
      z0: Math.min(s, a),
      x1: Math.max(t, n),
      y1: Math.max(e, i),
      z1: Math.max(s, a),
      surf: r,
      pane: null,
      off: !1,
      noRay: !1,
      noMove: !1,
      onShot: null,
      stamp: 0,
    };
    (l && Object.assign(c, l), this.cols.push(c));
    let h = Math.floor(c.x0 / Gd),
      f = Math.floor(c.x1 / Gd),
      u = Math.floor(c.z0 / Gd),
      d = Math.floor(c.z1 / Gd);
    for (let m = h; m <= f; m++)
      for (let p = u; p <= d; p++) {
        let x = (m + 512) * 1024 + (p + 512),
          g = this.grid.get(x);
        (g || this.grid.set(x, (g = [])), g.push(c));
      }
    return c;
  }
  query(t, e, s, n, i = this._q) {
    i.length = 0;
    let a = ++this._stamp,
      r = Math.floor(t / Gd),
      l = Math.floor(s / Gd),
      c = Math.floor(e / Gd),
      h = Math.floor(n / Gd);
    for (let f = r; f <= l; f++)
      for (let u = c; u <= h; u++) {
        let d = this.grid.get((f + 512) * 1024 + (u + 512));
        if (d)
          for (let m = 0; m < d.length; m++) {
            let p = d[m];
            p.stamp !== a && ((p.stamp = a), i.push(p));
          }
      }
    return i;
  }
  _batch(t, e = !0, s = !0) {
    let n = t.uuid + (e ? "s" : "n") + (s ? "r" : "x"),
      i = this.batches.get(n);
    return (i || this.batches.set(n, (i = new U9(t, e, s))), i);
  }
  box(t, e, s, n, i, a, r, l = {}) {
    (t > n && ([t, n] = [n, t]),
      e > i && ([e, i] = [i, e]),
      s > a && ([s, a] = [a, s]));
    let c = this._batch(r, l.shadow !== !1, l.receive !== !1),
      h = l.faces || "",
      f = l.uvs || 1,
      u = (d, m) => [d * f, m * f];
    return (
      h.includes("e") ||
        c.quad(
          [n, e, a],
          [n, e, s],
          [n, i, s],
          [n, i, a],
          [1, 0, 0],
          u(-a, e),
          u(-s, e),
          u(-s, i),
          u(-a, i),
        ),
      h.includes("w") ||
        c.quad(
          [t, e, s],
          [t, e, a],
          [t, i, a],
          [t, i, s],
          [-1, 0, 0],
          u(s, e),
          u(a, e),
          u(a, i),
          u(s, i),
        ),
      h.includes("t") ||
        c.quad(
          [t, i, a],
          [n, i, a],
          [n, i, s],
          [t, i, s],
          [0, 1, 0],
          u(t, -a),
          u(n, -a),
          u(n, -s),
          u(t, -s),
        ),
      h.includes("b") ||
        c.quad(
          [t, e, s],
          [n, e, s],
          [n, e, a],
          [t, e, a],
          [0, -1, 0],
          u(t, s),
          u(n, s),
          u(n, a),
          u(t, a),
        ),
      h.includes("s") ||
        c.quad(
          [t, e, a],
          [n, e, a],
          [n, i, a],
          [t, i, a],
          [0, 0, 1],
          u(t, e),
          u(n, e),
          u(n, i),
          u(t, i),
        ),
      h.includes("n") ||
        c.quad(
          [n, e, s],
          [t, e, s],
          [t, i, s],
          [n, i, s],
          [0, 0, -1],
          u(-n, e),
          u(-t, e),
          u(-t, i),
          u(-n, i),
        ),
      l.ao && this.aoSkirt(t, s, n, a, e, l.ao === !0 ? 0.4 : l.ao),
      l.collide === !1
        ? null
        : this.addCollider(
            t,
            e,
            s,
            n,
            i,
            a,
            l.surf || this.surfOf.get(r) || "concrete",
            l.col,
          )
    );
  }
  aoSkirt(t, e, s, n, i, a = 0.4, r = 0.5) {
    let l = this._ao.pos,
      c = this._ao.col;
    i += 0.004;
    let h = (f, u, d, m, p, x) => {
      (l.push(
        f,
        i,
        u,
        d,
        i,
        m,
        d + p,
        i,
        m + x,
        f,
        i,
        u,
        d + p,
        i,
        m + x,
        f + p,
        i,
        u + x,
      ),
        c.push(
          0,
          0,
          0,
          r,
          0,
          0,
          0,
          r,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          r,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ));
    };
    (h(t, n, s, n, 0, a),
      h(s, e, t, e, 0, -a),
      h(s, n, s, e, a, 0),
      h(t, e, t, n, -a, 0));
  }
  aoBlob(t, e, s, n, i, a = 0.45) {
    let r = this._ao.pos,
      l = this._ao.col;
    s += 0.005;
    let c = 14;
    for (let h = 0; h < c; h++) {
      let f = (h / c) * Math.PI * 2,
        u = ((h + 1) / c) * Math.PI * 2,
        d = Math.cos(f),
        m = Math.sin(f),
        p = Math.cos(u),
        x = Math.sin(u);
      (r.push(
        t,
        s,
        e,
        t + p * n * 0.55,
        s,
        e + x * i * 0.55,
        t + d * n * 0.55,
        s,
        e + m * i * 0.55,
      ),
        l.push(0, 0, 0, a, 0, 0, 0, a, 0, 0, 0, a),
        r.push(
          t + d * n * 0.55,
          s,
          e + m * i * 0.55,
          t + p * n * 0.55,
          s,
          e + x * i * 0.55,
          t + p * n,
          s,
          e + x * i,
          t + d * n * 0.55,
          s,
          e + m * i * 0.55,
          t + p * n,
          s,
          e + x * i,
          t + d * n,
          s,
          e + m * i,
        ),
        l.push(
          0,
          0,
          0,
          a,
          0,
          0,
          0,
          a,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          a,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ));
    }
  }
  addGeometry(t, e, s = null, n = !0, i = !0) {
    let a = this._batch(e, n, i),
      r = t.index ? t.toNonIndexed() : t,
      l = r.attributes.position,
      c = r.attributes.normal,
      h = r.attributes.uv,
      f = new Vector3(),
      u = new Vector3(),
      d = s ? new Matrix3().getNormalMatrix(s) : null;
    for (let m = 0; m < l.count; m++)
      (f.fromBufferAttribute(l, m),
        s && f.applyMatrix4(s),
        a.pos.push(f.x, f.y, f.z),
        c
          ? (u.fromBufferAttribute(c, m),
            d && u.applyMatrix3(d).normalize(),
            a.nrm.push(u.x, u.y, u.z))
          : a.nrm.push(0, 1, 0),
        h ? a.uv.push(h.getX(m), h.getY(m)) : a.uv.push(0, 0));
  }
  addObject(t, { shadow: e = !0 } = {}) {
    t.updateMatrixWorld(!0);
    let s = [],
      n = (a) => {
        for (let r = a; r; r = r.parent) {
          if (r.userData && r.userData.keep) return !0;
          if (r === t) break;
        }
        return !1;
      },
      i = [];
    t.traverse((a) => {
      a.isMesh && i.push(a);
    });
    for (let a of i)
      if (n(a) || a.material.transparent || Array.isArray(a.material)) {
        let r = a.matrixWorld.clone();
        (a.removeFromParent(),
          a.matrix.copy(r),
          a.matrix.decompose(a.position, a.quaternion, a.scale),
          a.updateMatrixWorld(!0),
          this.loose.push(a),
          s.push(a));
      } else
        this.addGeometry(
          a.geometry,
          a.material,
          a.matrixWorld,
          e && a.castShadow !== !1,
          !0,
        );
    return s;
  }
  finalize(t) {
    for (let e of this.batches.values()) {
      if (!e.pos.length) continue;
      let s = new BufferGeometry();
      (s.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(e.pos), 3),
      ),
        s.setAttribute(
          "normal",
          new BufferAttribute(new Float32Array(e.nrm), 3),
        ),
        s.setAttribute("uv", new BufferAttribute(new Float32Array(e.uv), 2)),
        s.computeBoundingSphere(),
        s.computeBoundingBox());
      let n = new Mesh(s, e.material);
      ((n.castShadow = e.shadow),
        (n.receiveShadow = e.receive),
        (n.matrixAutoUpdate = !1),
        t.add(n),
        this.meshes.push(n),
        (e.pos = e.nrm = e.uv = null));
    }
    if ((this.batches.clear(), this._ao.pos.length)) {
      let e = new BufferGeometry();
      (e.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(this._ao.pos), 3),
      ),
        e.setAttribute(
          "color",
          new BufferAttribute(new Float32Array(this._ao.col), 4),
        ));
      let s = new MeshBasicMaterial({
          vertexColors: !0,
          transparent: !0,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -2,
          fog: !1,
        }),
        n = new Mesh(e, s);
      ((n.renderOrder = 1),
        (n.matrixAutoUpdate = !1),
        t.add(n),
        (this.aoMesh = n),
        (this._ao = {
          pos: [],
          col: [],
        }));
    }
    for (let e of this.loose) t.add(e);
    this.loose.length = 0;
  }
  raycast(t, e, s, n, i, a, r, l, c = !1) {
    (Math.abs(n) < 1e-9 && (n = 1e-9),
      Math.abs(i) < 1e-9 && (i = 1e-9),
      Math.abs(a) < 1e-9 && (a = 1e-9));
    let h = 1 / n,
      f = 1 / i,
      u = 1 / a,
      d = this.cols,
      m = r,
      p = null,
      x = 0;
    for (let g = 0, b = d.length; g < b; g++) {
      let v = d[g];
      if (v.off || v.noRay || v.pane || (c && v.water)) continue;
      let y = (v.x0 - t) * h,
        M = (v.x1 - t) * h,
        w = y < M ? y : M,
        T = y < M ? M : y,
        S = 0;
      ((y = (v.y0 - e) * f), (M = (v.y1 - e) * f));
      let E = y < M ? y : M,
        _ = y < M ? M : y;
      (E > w && ((w = E), (S = 1)),
        _ < T && (T = _),
        !(w > T) &&
          ((y = (v.z0 - s) * u),
          (M = (v.z1 - s) * u),
          (E = y < M ? y : M),
          (_ = y < M ? M : y),
          E > w && ((w = E), (S = 2)),
          _ < T && (T = _),
          !(w > T || w < 0 || w >= m) && ((m = w), (p = v), (x = S))));
    }
    return p
      ? (l &&
          ((l.t = m),
          (l.col = p),
          (l.nx = x === 0 ? (n > 0 ? -1 : 1) : 0),
          (l.ny = x === 1 ? (i > 0 ? -1 : 1) : 0),
          (l.nz = x === 2 ? (a > 0 ? -1 : 1) : 0)),
        !0)
      : !1;
  }
  clear(t, e) {
    let s = e.x - t.x,
      n = e.y - t.y,
      i = e.z - t.z,
      a = Math.sqrt(s * s + n * n + i * i);
    return a < 1e-4
      ? !0
      : !this.raycast(t.x, t.y, t.z, s / a, n / a, i / a, a - 0.02, null, !0);
  }
  groundAt(t, e, s, n = 0.05) {
    let i = this.query(t, e, t, e),
      a = -1 / 0;
    this.groundCol = null;
    for (let r = 0; r < i.length; r++) {
      let l = i[r];
      l.off ||
        l.noMove ||
        l.pane ||
        t < l.x0 ||
        t > l.x1 ||
        e < l.z0 ||
        e > l.z1 ||
        (l.y1 <= s + n && l.y1 > a && ((a = l.y1), (this.groundCol = l)));
    }
    return a;
  }
  overlap(t, e, s, n, i, a, r = !1) {
    let l = this.query(t, s, n, a);
    for (let c = 0; c < l.length; c++) {
      let h = l[c];
      if (
        !(h.off || h.noMove || (h.pane && !r)) &&
        !(
          n <= h.x0 + Nr ||
          t >= h.x1 - Nr ||
          a <= h.z0 + Nr ||
          s >= h.z1 - Nr ||
          i <= h.y0 + Nr ||
          e >= h.y1 - Nr
        )
      )
        return h;
    }
    return null;
  }
  _axis(t, e, s, n) {
    if (s === 0) return null;
    let i = e === 0 ? t.x : e === 1 ? t.y : t.z;
    e === 0 ? (t.x += s) : e === 1 ? (t.y += s) : (t.z += s);
    let a = this.query(t.x - t.r, t.z - t.r, t.x + t.r, t.z + t.r),
      r = null;
    for (let l = 0; l < a.length; l++) {
      let c = a[l];
      c.off ||
        c.noMove ||
        t.x + t.r <= c.x0 + Nr ||
        t.x - t.r >= c.x1 - Nr ||
        t.z + t.r <= c.z0 + Nr ||
        t.z - t.r >= c.z1 - Nr ||
        t.y + t.h <= c.y0 + Nr ||
        t.y >= c.y1 - Nr ||
        (e === 0
          ? i + t.r > c.x0 + Nr && i - t.r < c.x1 - Nr
          : e === 2
            ? i + t.r > c.z0 + Nr && i - t.r < c.z1 - Nr
            : i + t.h > c.y0 + Nr &&
              i < c.y1 - Nr &&
              (s < 0 ? c.y1 - i : i + t.h - c.y0) > 0.5) ||
        (c.pane && (!n || n(c.pane, e, s))) ||
        (e === 0
          ? (t.x = s > 0 ? c.x0 - t.r - Tg : c.x1 + t.r + Tg)
          : e === 1
            ? (t.y = s > 0 ? c.y0 - t.h - Tg : c.y1 + Tg)
            : (t.z = s > 0 ? c.z0 - t.r - Tg : c.z1 + t.r + Tg),
        (r = c));
    }
    return r;
  }
  move(t, e, s, n, i) {
    let a = i.step || 0,
      r = i.onPane || null,
      l = Math.max(
        1,
        Math.ceil(Math.hypot(e, n) / 0.2),
        Math.ceil(Math.abs(s) / 0.45),
      );
    ((e /= l),
      (s /= l),
      (n /= l),
      (t.hitWall = null),
      (t.hitCeil = !1),
      (t.stepped = 0));
    let c = t.onGround;
    for (let h = 0; h < l; h++) {
      let f = t.x,
        u = t.y,
        d = t.z,
        m = this._axis(t, 0, e, r),
        p = this._axis(t, 2, n, r);
      if ((m || p) && a > 0 && t.onGround) {
        let x = t.x,
          g = t.z;
        ((t.x = f), (t.z = d), this._axis(t, 1, a, null));
        let b = t.y - u,
          v = this._axis(t, 0, e, r),
          y = this._axis(t, 2, n, r);
        this._axis(t, 1, -b, null);
        let M = (x - f) * (x - f) + (g - d) * (g - d);
        (t.x - f) * (t.x - f) + (t.z - d) * (t.z - d) > M + 1e-7
          ? ((t.stepped += t.y - u), (m = v), (p = y))
          : ((t.x = x), (t.y = u), (t.z = g));
      }
      if (((m || p) && (t.hitWall = m || p), s !== 0)) {
        let x = this._axis(t, 1, s, null);
        x
          ? s < 0
            ? ((t.onGround = !0), (t.groundCol = x))
            : (t.hitCeil = !0)
          : (t.onGround = !1);
      }
    }
    if (i.snap && c && !t.onGround && s <= 0) {
      let h = t.y,
        f = this._axis(t, 1, -(a + 0.05), null);
      f
        ? ((t.onGround = !0), (t.groundCol = f), (t.stepped += t.y - h))
        : (t.y = h);
    }
    return t;
  }
};

export { CollisionWorld };

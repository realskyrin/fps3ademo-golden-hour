// physics/props.js: recovered from the verified GOLDEN HOUR release.
import {
  BoxGeometry,
  Color,
  CylinderGeometry,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Quaternion,
  Vector3,
} from "../vendor/three-r180.js";
import { randomRange, saturate } from "../core/math.js";
import { p$ } from "../scene/hotel.js";

var LD = new Int32Array(6);
var $m = new Vector3();
var DD = 9.81;
var K9 = new Matrix4();
var Sg = new Quaternion();
var Vc = new Vector3();
var X9 = new Vector3();
var du = new Vector3();
var pu = new Vector3();
var _g = new Vector3();
var xr = new Vector3();
var Rg = new Vector3();
var Tw = new Color();
var Wd = new Vector3();
var X2 = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
var Sw = new Matrix4().makeScale(0, 0, 0);
var ID = 320;
var HD = 90;
var PropPhysics = class {
  constructor(scene, world, hooks) {
    ((this.scene = scene),
      (this.world = world),
      (this.hooks = hooks),
      (this.bodies = []),
      (this.props = []),
      (this._cands = []),
      (this.h = 1 / 90),
      (this.hPrev = 1 / 90),
      (this.time = 0));
    let n = (a) => ({
      N: a,
      x: new Float32Array(a * 3),
      v: new Float32Array(a * 3),
      s: new Float32Array(a * 3),
      ax: new Float32Array(a * 3),
      ang: new Float32Array(a),
      w: new Float32Array(a),
      life: new Float32Array(a),
      st: new Uint8Array(a),
      b: new Uint8Array(a),
      kind: new Uint8Array(a),
      i: 0,
      live: 0,
    });
    ((this.chunks = n(ID)),
      (this.cases = n(HD)),
      (this.chunkMesh = new InstancedMesh(
        new BoxGeometry(1, 1, 1),
        new MeshStandardMaterial({
          roughness: 0.85,
        }),
        ID,
      )));
    let i = new CylinderGeometry(0.5, 0.5, 1, 8);
    (i.rotateX(Math.PI / 2),
      (this.caseMesh = new InstancedMesh(
        i,
        new MeshStandardMaterial({
          roughness: 0.3,
          metalness: 0.9,
        }),
        HD,
      )));
    for (let a of [this.chunkMesh, this.caseMesh]) {
      for (let r = 0; r < a.count; r++)
        (a.setMatrixAt(r, Sw), a.setColorAt(r, Tw.set(16777215)));
      ((a.frustumCulled = !1),
        (a.castShadow = !0),
        (a.receiveShadow = !0),
        scene.add(a));
    }
  }
  addProp(
    t,
    {
      size: e,
      center: s = [0, e[1] / 2, 0],
      mass: n = 8,
      mat: i = "wood",
      breakable: a = null,
      onBreak: r = null,
      glassSpeed: l = 3.2,
    },
  ) {
    let c = Math.max(0.02, e[0] / 2 - 0.03),
      h = Math.max(0.02, e[1] / 2 - 0.03),
      f = Math.max(0.02, e[2] / 2 - 0.03),
      u = {
        type: "box",
        n: 8,
        x: new Float32Array(24),
        o: new Float32Array(24),
        r: new Float32Array(8).fill(0.03),
        ci: [],
        cl: [],
        cmin: null,
        iters: 5,
        damp: 0.999,
        fric: 0.035,
        gScale: 1,
        half: [c, h, f],
        center: s,
        obj: t,
        mass: n,
        mat: i,
        breakable: a,
        onBreak: r,
        glass: "break",
        glassSpeed: l,
        sleeping: !0,
        still: 0,
        dead: !1,
        cool: 0,
        radius: Math.hypot(c, h, f) + 0.05,
        home: {
          p: t.position.clone(),
          q: t.quaternion.clone(),
        },
        cx: 0,
        cy: 0,
        cz: 0,
      };
    for (let d = 0; d < 8; d++)
      for (let m = d + 1; m < 8; m++) {
        u.ci.push(d, m);
        let p = ((d & 1) - (m & 1)) * 2 * c,
          x = (((d >> 1) & 1) - ((m >> 1) & 1)) * 2 * h,
          g = (((d >> 2) & 1) - ((m >> 2) & 1)) * 2 * f;
        u.cl.push(Math.hypot(p, x, g));
      }
    return (
      this._placeBox(u),
      this.scene.add(t),
      this.bodies.push(u),
      this.props.push(u),
      u
    );
  }
  _placeBox(t) {
    let e = t.obj;
    e.updateMatrixWorld(!0);
    for (let s = 0; s < 8; s++)
      (Vc.set(
        t.center[0] + (s & 1 ? 1 : -1) * t.half[0],
        t.center[1] + (s & 2 ? 1 : -1) * t.half[1],
        t.center[2] + (s & 4 ? 1 : -1) * t.half[2],
      ).applyMatrix4(e.matrixWorld),
        (t.x[s * 3] = t.o[s * 3] = Vc.x),
        (t.x[s * 3 + 1] = t.o[s * 3 + 1] = Vc.y),
        (t.x[s * 3 + 2] = t.o[s * 3 + 2] = Vc.z));
    this._centroid(t);
  }
  _centroid(t) {
    let e = 0,
      s = 0,
      n = 0,
      i = t.x,
      a = t.n;
    for (let r = 0; r < a; r++)
      ((e += i[r * 3]), (s += i[r * 3 + 1]), (n += i[r * 3 + 2]));
    ((t.cx = e / a), (t.cy = s / a), (t.cz = n / a));
  }
  _syncBox(t) {
    let e = t.x;
    (du.set(0, 0, 0), pu.set(0, 0, 0), _g.set(0, 0, 0));
    for (let s = 0; s < 8; s++) {
      let n = e[s * 3],
        i = e[s * 3 + 1],
        a = e[s * 3 + 2],
        r = s & 1 ? 1 : -1,
        l = s & 2 ? 1 : -1,
        c = s & 4 ? 1 : -1;
      ((du.x += n * r),
        (du.y += i * r),
        (du.z += a * r),
        (pu.x += n * l),
        (pu.y += i * l),
        (pu.z += a * l),
        (_g.x += n * c),
        (_g.y += i * c),
        (_g.z += a * c));
    }
    (du.normalize(),
      pu.addScaledVector(du, -pu.dot(du)).normalize(),
      _g.crossVectors(du, pu),
      K9.makeBasis(du, pu, _g),
      t.obj.quaternion.setFromRotationMatrix(K9),
      Vc.set(t.center[0], t.center[1], t.center[2]).applyQuaternion(
        t.obj.quaternion,
      ),
      t.obj.position.set(t.cx - Vc.x, t.cy - Vc.y, t.cz - Vc.z));
  }
  addRagdoll(t, e, s, n) {
    let a = t.joints,
      r = {
        type: "rag",
        n: 16,
        x: new Float32Array(a),
        o: new Float32Array(16 * 3),
        r: new Float32Array(t.JOINT_RADIUS),
        ci: [],
        cl: [],
        cmin: [],
        iters: 6,
        damp: 0.992,
        fric: 0.09,
        gScale: 1,
        char: t,
        glass: "break",
        glassSpeed: 2.4,
        sleeping: !1,
        still: 0,
        dead: !1,
        cool: 0,
        radius: 1.2,
        mat: "soft",
        mass: 80,
        thud: !1,
        cx: 0,
        cy: 0,
        cz: 0,
        age: 0,
      };
    for (let [f, u, d] of t.bones)
      (r.ci.push(f, u), r.cl.push(d), r.cmin.push(0));
    let l = (f, u) =>
        Math.hypot(
          a[f * 3] - a[u * 3],
          a[f * 3 + 1] - a[u * 3 + 1],
          a[f * 3 + 2] - a[u * 3 + 2],
        ),
      c = (f, u, d) => {
        (r.ci.push(f, u), r.cl.push(d), r.cmin.push(1));
      };
    (c(10, 12, 0.42),
      c(13, 15, 0.42),
      c(4, 6, 0.26),
      c(7, 9, 0.26),
      c(11, 14, 0.16),
      c(12, 15, 0.14),
      c(0, 3, Math.max(0.5, l(0, 3) * 0.86)),
      c(6, 9, 0.1),
      c(5, 3, 0.22),
      c(8, 3, 0.22),
      c(11, 2, 0.34),
      c(14, 2, 0.34),
      c(0, 4, 0.2),
      c(0, 7, 0.2));
    let h = this.h;
    for (let f = 0; f < 16; f++) {
      let u = t.jointVel,
        d = u ? u[f * 3] : e.x,
        m = u ? u[f * 3 + 1] : e.y,
        p = u ? u[f * 3 + 2] : e.z;
      if (s) {
        let x = Math.hypot(
            a[f * 3] - s.x,
            a[f * 3 + 1] - s.y,
            a[f * 3 + 2] - s.z,
          ),
          g = Math.max(0.25, 1 - x / 0.9);
        ((d += n.x * g), (m += n.y * g), (p += n.z * g));
      }
      ((r.o[f * 3] = a[f * 3] - d * h),
        (r.o[f * 3 + 1] = a[f * 3 + 1] - m * h),
        (r.o[f * 3 + 2] = a[f * 3 + 2] - p * h));
    }
    return (this.bodies.push(r), r);
  }
  removeBody(t) {
    t.dead = !0;
  }
  throwGrenade(t, e, s, n, i) {
    let a = {
        type: "nade",
        n: 1,
        x: new Float32Array([e.x, e.y, e.z]),
        o: new Float32Array(3),
        r: new Float32Array([0.05]),
        ci: [],
        cl: [],
        cmin: null,
        iters: 1,
        damp: 0.999,
        fric: 0.12,
        rest: 0.42,
        gScale: 1,
        obj: t,
        glass: "hole",
        sleeping: !1,
        still: 0,
        dead: !1,
        cool: 0,
        radius: 0.1,
        fuse: n,
        owner: i,
        mat: "metal",
        cx: e.x,
        cy: e.y,
        cz: e.z,
      },
      r = this.h;
    return (
      (a.o[0] = e.x - s.x * r),
      (a.o[1] = e.y - s.y * r),
      (a.o[2] = e.z - s.z * r),
      this.scene.add(t),
      this.bodies.push(a),
      a
    );
  }
  debris(t, e, s, n, i, a, r, l, c = 5) {
    let h = this.chunks,
      f = h.i;
    h.i = (f + 1) % h.N;
    let u = f * 3;
    ((h.x[u] = t),
      (h.x[u + 1] = e),
      (h.x[u + 2] = s),
      (h.v[u] = n),
      (h.v[u + 1] = i),
      (h.v[u + 2] = a),
      (h.s[u] = r * randomRange(0.6, 1.4)),
      (h.s[u + 1] = r * randomRange(0.3, 0.9)),
      (h.s[u + 2] = r * randomRange(0.6, 1.3)),
      Wd.set(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1),
      ).normalize(),
      (h.ax[u] = Wd.x),
      (h.ax[u + 1] = Wd.y),
      (h.ax[u + 2] = Wd.z),
      (h.ang[f] = randomRange(0, 6)),
      (h.w[f] = randomRange(-14, 14)),
      (h.life[f] = c * randomRange(0.7, 1.2)),
      (h.st[f] = 1),
      (h.b[f] = 0),
      this.chunkMesh.setColorAt(f, l.isColor ? l : Tw.set(l)),
      (this.chunkMesh.instanceColor.needsUpdate = !0),
      h.live++);
  }
  burst(t, e, s, n, i, a = 2) {
    for (let r = 0; r < e; r++)
      this.debris(
        t.x + randomRange(-0.1, 0.1),
        t.y + randomRange(-0.1, 0.1),
        t.z + randomRange(-0.1, 0.1),
        randomRange(-1, 1) * i,
        randomRange(0, 1) * i + a,
        randomRange(-1, 1) * i,
        n,
        s,
      );
  }
  casing(t, e, s) {
    let n = this.cases,
      i = n.i;
    n.i = (i + 1) % n.N;
    let a = i * 3;
    ((n.x[a] = t.x),
      (n.x[a + 1] = t.y),
      (n.x[a + 2] = t.z),
      (n.v[a] = e.x),
      (n.v[a + 1] = e.y),
      (n.v[a + 2] = e.z));
    let r = s === 2 ? 0.06 : s === 1 ? 0.019 : 0.042,
      l = s === 2 ? 0.02 : s === 1 ? 0.0098 : 0.0096;
    ((n.s[a] = l),
      (n.s[a + 1] = l),
      (n.s[a + 2] = r),
      Wd.set(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1),
      ).normalize(),
      (n.ax[a] = Wd.x),
      (n.ax[a + 1] = Wd.y),
      (n.ax[a + 2] = Wd.z),
      (n.ang[i] = randomRange(0, 6)),
      (n.w[i] = randomRange(-30, 30)),
      (n.life[i] = 9),
      (n.st[i] = 1),
      (n.b[i] = 0),
      (n.kind[i] = s),
      this.caseMesh.setColorAt(
        i,
        s === 2 ? Tw.setRGB(0.55, 0.06, 0.04) : Tw.setRGB(0.95, 0.72, 0.32),
      ),
      (this.caseMesh.instanceColor.needsUpdate = !0),
      n.live++);
  }
  _simSingles(t, e, s, n) {
    if (!t.live) return;
    let i = this.world;
    for (let a = 0; a < t.N; a++) {
      if (!t.st[a]) continue;
      let r = a * 3;
      if ((t.life[a] -= s) <= 0) {
        ((t.st[a] = 0), t.live--, e.setMatrixAt(a, Sw));
        continue;
      }
      if (t.st[a] === 1) {
        t.v[r + 1] -= DD * s;
        let c = t.x[r] + t.v[r] * s,
          h = t.x[r + 1] + t.v[r + 1] * s,
          f = t.x[r + 2] + t.v[r + 2] * s,
          u = n ? 0.012 : t.s[r + 1] * 0.5 + 0.01,
          d = i.overlap(c - u, h + 0.02, f - u, c + u, h + u * 2 + 0.02, f + u);
        if (d) {
          if (t.x[r + 1] >= d.y1 - 0.02 && t.v[r + 1] < 0) {
            h = d.y1 + 0.001;
            let m = -t.v[r + 1];
            m > 1.2 && t.b[a] < 3
              ? ((t.v[r + 1] = m * (n ? 0.38 : 0.28)),
                (t.v[r] = t.v[r] * 0.6 + randomRange(-0.5, 0.5)),
                (t.v[r + 2] = t.v[r + 2] * 0.6 + randomRange(-0.5, 0.5)),
                (t.w[a] *= 0.7),
                t.b[a]++,
                n &&
                  t.b[a] <= 2 &&
                  this.hooks.audio.casing(
                    xr.set(c, h, f),
                    d.surf,
                    t.kind[a] === 2 ? "shell" : "brass",
                  ))
              : ((t.st[a] = 2),
                (t.v[r] = t.v[r + 1] = t.v[r + 2] = 0),
                n && (t.ang[a] = 0));
          } else
            ((t.v[r] *= -0.3),
              (t.v[r + 2] *= -0.3),
              (c = t.x[r]),
              (f = t.x[r + 2]));
        } else if (h < -40) {
          ((t.st[a] = 0), t.live--, e.setMatrixAt(a, Sw));
          continue;
        }
        ((t.x[r] = c),
          (t.x[r + 1] = h),
          (t.x[r + 2] = f),
          (t.ang[a] += t.w[a] * s));
      } else if (t.life[a] > 1) continue;
      let l = t.st[a] === 2 ? Math.min(1, t.life[a]) : 1;
      (xr.set(t.ax[r], t.ax[r + 1], t.ax[r + 2]),
        t.st[a] === 2 && n
          ? Sg.setFromAxisAngle(pu.set(0, 1, 0), t.w[a])
          : Sg.setFromAxisAngle(xr, t.ang[a]),
        Vc.set(
          t.x[r],
          t.x[r + 1] + (t.st[a] === 2 ? t.s[r + 1] * (n ? 1 : 0.5) : 0),
          t.x[r + 2],
        ),
        n
          ? X9.set(t.s[r] * 2 * l, t.s[r + 1] * 2 * l, t.s[r + 2] * l)
          : X9.set(t.s[r] * l, t.s[r + 1] * l, t.s[r + 2] * l),
        e.setMatrixAt(a, K9.compose(Vc, Sg, X9)));
    }
    e.instanceMatrix.needsUpdate = !0;
  }
  wake(t) {
    (t.sleeping && (t.pvx = t.pvy = t.pvz = 0),
      (t.sleeping = !1),
      (t.still = 0));
  }
  impulse(t, e, s, n, i, a, r) {
    this.wake(t);
    let l = this.h,
      c = t.x,
      h = t.o,
      f = t.n,
      u = 1 / Math.max(t.mass, 4.5),
      d = 0,
      m = p$,
      p = t.radius * 1.3;
    for (let x = 0; x < f; x++) {
      let g = Math.hypot(c[x * 3] - e, c[x * 3 + 1] - s, c[x * 3 + 2] - n);
      ((m[x] = Math.max(0.04, 1 - g / p)), (m[x] *= m[x]), (d += m[x]));
    }
    for (let x = 0; x < f; x++) {
      let g = (m[x] / d) * f * u * l;
      ((h[x * 3] -= i * g), (h[x * 3 + 1] -= a * g), (h[x * 3 + 2] -= r * g));
    }
  }
  pushFrom(t, e, s, n, i, a, r) {
    let l = this.props;
    for (let c = 0; c < l.length; c++) {
      let h = l[c];
      if (h.dead) continue;
      let f = h.cx - t,
        u = h.cz - n,
        d = i + h.radius;
      if (f * f + u * u > d * d || h.cy - h.radius > s || h.cy + h.radius < e)
        continue;
      let m = h.x,
        p = !1;
      for (let x = 0; x < 8; x++) {
        let g = x * 3;
        if (m[g + 1] < e - 0.05 || m[g + 1] > s) continue;
        let b = m[g] - t,
          v = m[g + 2] - n,
          y = Math.hypot(b, v),
          M = i + 0.04;
        if (y < M) {
          let w = y > 1e-4 ? (M - y) / y : 0;
          ((m[g] += b * w),
            (m[g + 2] += v * w),
            (h.o[g] += b * w * 0.8 - a * 0.003),
            (h.o[g + 2] += v * w * 0.8 - r * 0.003),
            (p = !0));
        }
      }
      p &&
        (h.sleeping &&
          this.time - (h.lastPush || -9) > 0.5 &&
          this.hooks.audio.propHit(xr.set(h.cx, h.cy, h.cz), h.mat, 0.3),
        (h.lastPush = this.time),
        this.wake(h));
    }
  }
  raycastProps(t, e, s, n, i, a, r, l) {
    let c = r,
      h = null,
      f = this.props;
    for (let u = 0; u < f.length; u++) {
      let d = f[u];
      if (d.dead) continue;
      let m = d.cx - t,
        p = d.cy - e,
        x = d.cz - s,
        g = m * n + p * i + x * a;
      if (
        g < -d.radius ||
        g > c + d.radius ||
        m * m + p * p + x * x - g * g > d.radius * d.radius
      )
        continue;
      (Sg.copy(d.obj.quaternion).invert(),
        Vc.set(m, p, x).negate().applyQuaternion(Sg),
        Rg.set(n, i, a).applyQuaternion(Sg));
      let v = 0,
        y = c,
        M = -1,
        w = 0,
        T = !0;
      for (let S = 0; S < 3; S++) {
        let E = S === 0 ? Vc.x : S === 1 ? Vc.y : Vc.z,
          _ = S === 0 ? Rg.x : S === 1 ? Rg.y : Rg.z,
          R = d.half[S] + 0.03;
        if (Math.abs(_) < 1e-8) {
          if (E < -R || E > R) {
            T = !1;
            break;
          }
          continue;
        }
        let C = (-R - E) / _,
          L = (R - E) / _,
          A = -1;
        if (C > L) {
          let O = C;
          ((C = L), (L = O), (A = 1));
        }
        if ((C > v && ((v = C), (M = S), (w = A)), L < y && (y = L), v > y)) {
          T = !1;
          break;
        }
      }
      !T ||
        M < 0 ||
        v >= c ||
        ((c = v),
        (h = d),
        xr
          .set(M === 0 ? w : 0, M === 1 ? w : 0, M === 2 ? w : 0)
          .applyQuaternion(d.obj.quaternion),
        (l.nx = xr.x),
        (l.ny = xr.y),
        (l.nz = xr.z));
    }
    return h ? ((l.t = c), (l.body = h), !0) : !1;
  }
  breakProp(t, e) {
    if (t.dead) return;
    ((t.dead = !0), (t.obj.visible = !1), xr.set(t.cx, t.cy, t.cz));
    let s =
      t.breakable === "ceramic"
        ? 15328474
        : t.breakable === "wood"
          ? 7031342
          : 13421772;
    (this.burst(xr, 12, s, 0.07, 2.4, 1.5),
      this.hooks.audio.breakProp(
        xr,
        t.breakable === "bulb" ? "bulb" : t.breakable,
      ),
      this.hooks.fx.smoke(t.cx, t.cy, t.cz, 2, {
        size: 0.2,
        life: 0.9,
        a: 0.25,
      }),
      t.onBreak && t.onBreak(t));
  }
  explode(t, e, s) {
    let n = this.h;
    for (let i of this.bodies) {
      if (i.dead || i.type === "nade") continue;
      let a = i.cx - t.x,
        r = i.cy - t.y,
        l = i.cz - t.z;
      if (a * a + r * r + l * l > (e + i.radius) * (e + i.radius)) continue;
      if (i.breakable && Math.hypot(a, r, l) < e * 0.6) {
        this.breakProp(i);
        continue;
      }
      this.wake(i);
      let c = i.x,
        h = i.o,
        f = i.type === "rag" ? 0.75 : Math.min(1.6, 9 / (i.mass + 3));
      for (let u = 0; u < i.n; u++) {
        let d = u * 3,
          m = c[d] - t.x,
          p = c[d + 1] - t.y + 0.35,
          x = c[d + 2] - t.z,
          g = Math.hypot(m, p, x) || 0.01;
        if (g > e) continue;
        let b = ((s * f * (1 - g / e) * (1 - g / e)) / g) * n;
        ((h[d] -= m * b), (h[d + 1] -= p * b), (h[d + 2] -= x * b));
      }
    }
  }
  reset() {
    for (let t of this.bodies)
      t.type === "box" && t.temp
        ? ((t.dead = !0), this.scene.remove(t.obj))
        : t.type === "box"
          ? ((t.dead = !1),
            (t.obj.visible = !0),
            t.obj.position.copy(t.home.p),
            t.obj.quaternion.copy(t.home.q),
            this._placeBox(t),
            (t.sleeping = !0),
            (t.still = 0),
            (t.pvx = t.pvy = t.pvz = 0))
          : ((t.dead = !0), t.obj && this.scene.remove(t.obj));
    ((this.bodies = this.bodies.filter((t) => t.type === "box" && !t.temp)),
      (this.props = this.props.filter((t) => !t.temp)));
    for (let t of [this.chunks, this.cases]) (t.st.fill(0), (t.live = 0));
    for (let t of [this.chunkMesh, this.caseMesh]) {
      for (let e = 0; e < t.count; e++) t.setMatrixAt(e, Sw);
      t.instanceMatrix.needsUpdate = !0;
    }
  }
  update(t) {
    if (!(t > 0)) return;
    this.time += t;
    let e = Math.max(1, Math.min(3, Math.ceil(t * 90))),
      s = t / e;
    for (let i = 0; i < e; i++) {
      let a = s / this.hPrev;
      this.h = s;
      for (let r = 0; r < this.bodies.length; r++) {
        let l = this.bodies[r];
        !l.dead && !l.sleeping && this._step(l, s, a);
      }
      this.hPrev = s;
    }
    let n = !1;
    for (let i = 0; i < this.bodies.length; i++) {
      let a = this.bodies[i];
      if (a.dead) {
        (a.type !== "box" || a.temp) && (n = !0);
        continue;
      }
      if (
        (a.cool > 0 && (a.cool -= t), a.life !== void 0 && (a.life -= t) <= 0)
      ) {
        ((a.dead = !0), (a.temp = !0), this.scene.remove(a.obj), (n = !0));
        continue;
      }
      a.type === "box"
        ? a.sleeping || this._syncBox(a)
        : a.type === "rag"
          ? ((a.age += t),
            a.sleeping || (a.char.joints.set(a.x), a.char.renderFromJoints()))
          : a.type === "nade" &&
            (a.obj.position.set(a.x[0], a.x[1], a.x[2]),
            (a.obj.rotation.x += t * 9),
            (a.obj.rotation.z += t * 6),
            (a.fuse -= t) <= 0 &&
              ((a.dead = !0),
              this.scene.remove(a.obj),
              this.hooks.onExplode(
                xr.set(a.x[0], a.x[1], a.x[2]).clone(),
                a.owner,
              )));
    }
    (n &&
      ((this.bodies = this.bodies.filter(
        (i) => !(i.dead && (i.type !== "box" || i.temp)),
      )),
      (this.props = this.props.filter((i) => !(i.dead && i.temp)))),
      this._simSingles(this.chunks, this.chunkMesh, t, !1),
      this._simSingles(this.cases, this.caseMesh, t, !0));
  }
  _step(t, e, s) {
    let n = t.x,
      i = t.o,
      a = t.n,
      r = t.r,
      l = DD * e * e * t.gScale,
      c = t.damp * s,
      h = 1e9,
      f = -1e9,
      u = 1e9,
      d = -1e9,
      m = t.cx,
      p = t.cy,
      x = t.cz;
    for (let L = 0; L < a; L++) {
      let A = L * 3,
        O = (n[A] - i[A]) * c,
        H = (n[A + 1] - i[A + 1]) * c,
        F = (n[A + 2] - i[A + 2]) * c;
      ((i[A] = n[A]),
        (i[A + 1] = n[A + 1]),
        (i[A + 2] = n[A + 2]),
        (n[A] += O),
        (n[A + 1] += H - l),
        (n[A + 2] += F),
        n[A] < h && (h = n[A]),
        n[A] > f && (f = n[A]),
        n[A + 2] < u && (u = n[A + 2]),
        n[A + 2] > d && (d = n[A + 2]));
    }
    if (t.type === "nade") {
      let L = n[0] - i[0],
        A = n[1] - i[1],
        O = n[2] - i[2],
        H = Math.hypot(L, A, O);
      if (
        H > 0.02 &&
        this.world.raycast(i[0], i[1], i[2], L / H, A / H, O / H, H + 0.05, X2)
      ) {
        let F = Math.max(0, X2.t - 0.055),
          P = L * X2.nx + A * X2.ny + O * X2.nz;
        ((n[0] = i[0] + (L / H) * F),
          (n[1] = i[1] + (A / H) * F),
          (n[2] = i[2] + (O / H) * F));
        let z = (L - (1 + t.rest) * P * X2.nx) * 0.72,
          k = (A - (1 + t.rest) * P * X2.ny) * 0.72,
          I = (O - (1 + t.rest) * P * X2.nz) * 0.72;
        ((i[0] = n[0] - z),
          (i[1] = n[1] - k),
          (i[2] = n[2] - I),
          t.cool <= 0 &&
            -P / e > 1.2 &&
            ((t.cool = 0.12),
            this.hooks.audio.grenadeBounce(xr.set(n[0], n[1], n[2])),
            this.hooks.fx.grenadeBounce &&
              this.hooks.fx.grenadeBounce(
                xr,
                X2.col ? X2.col.surf : "marble",
                -P / e,
              )),
          (h = f = n[0]),
          (u = d = n[2]));
      }
    }
    let g = this.world.query(h - 0.3, u - 0.3, f + 0.3, d + 0.3, this._cands),
      b = t.ci,
      v = t.cl,
      y = t.cmin,
      M = v.length,
      w = this.hooks.glass,
      T = 0;
    for (let L = 0; L < t.iters; L++) {
      for (let O = 0; O < M; O++) {
        let H = b[O * 2] * 3,
          F = b[O * 2 + 1] * 3,
          P = n[F] - n[H],
          z = n[F + 1] - n[H + 1],
          k = n[F + 2] - n[H + 2],
          I = Math.sqrt(P * P + z * z + k * k) || 1e-6;
        if (y && y[O] && I >= v[O]) continue;
        let G = ((I - v[O]) / I) * 0.5;
        ((n[H] += P * G),
          (n[H + 1] += z * G),
          (n[H + 2] += k * G),
          (n[F] -= P * G),
          (n[F + 1] -= z * G),
          (n[F + 2] -= k * G));
      }
      let A = L === t.iters - 1;
      for (let O = 0; O < a; O++) {
        let H = O * 3,
          F = r[O];
        for (let P = 0; P < g.length; P++) {
          let z = g[P];
          if (z.off || z.noMove) continue;
          let k = n[H],
            I = n[H + 1],
            G = n[H + 2],
            K = k < z.x0 ? z.x0 : k > z.x1 ? z.x1 : k,
            $ = I < z.y0 ? z.y0 : I > z.y1 ? z.y1 : I,
            n0 = G < z.z0 ? z.z0 : G > z.z1 ? z.z1 : G,
            e0 = k - K,
            p0 = I - $,
            t0 = G - n0,
            M0 = e0 * e0 + p0 * p0 + t0 * t0;
          if (M0 >= F * F) continue;
          if (z.pane) {
            let et = (k - i[H]) / e,
              ct = (I - i[H + 1]) / e,
              D0 = (G - i[H + 2]) / e,
              u0 = Math.abs(z.pane.axis === 0 ? et : D0);
            if (t.glass === "hole") {
              if (u0 > 3) {
                (Rg.set(et, ct, D0).normalize(),
                  w.hit(z.pane, z.pane.axis === 0 ? G : k, I, Rg, 1.5),
                  (i[H] = k - (k - i[H]) * 0.55),
                  (i[H + 2] = G - (G - i[H + 2]) * 0.55));
                continue;
              }
            } else if (
              w.bodyHit(z.pane, k, I, G, et, ct, D0, u0 > t.glassSpeed)
            )
              continue;
          }
          let f0, _0, F0;
          if (M0 > 1e-10) {
            let et = Math.sqrt(M0),
              ct = (F - et) / et;
            ((f0 = e0 / et),
              (_0 = p0 / et),
              (F0 = t0 / et),
              (n[H] += e0 * ct),
              (n[H + 1] += p0 * ct),
              (n[H + 2] += t0 * ct));
          } else {
            let et = k - z.x0,
              ct = z.x1 - k,
              D0 = I - z.y0,
              u0 = z.y1 - I,
              w0 = G - z.z0,
              P0 = z.z1 - G,
              st = Math.min(et, ct, D0, u0, w0, P0);
            ((f0 = _0 = F0 = 0),
              st === u0
                ? ((n[H + 1] = z.y1 + F), (_0 = 1))
                : st === et
                  ? ((n[H] = z.x0 - F), (f0 = -1))
                  : st === ct
                    ? ((n[H] = z.x1 + F), (f0 = 1))
                    : st === w0
                      ? ((n[H + 2] = z.z0 - F), (F0 = -1))
                      : st === P0
                        ? ((n[H + 2] = z.z1 + F), (F0 = 1))
                        : ((n[H + 1] = z.y0 - F), (_0 = -1)));
          }
          T++;
          let m0 = n[H] - i[H],
            S0 = n[H + 1] - i[H + 1],
            T0 = n[H + 2] - i[H + 2],
            j0 = m0 * f0 + S0 * _0 + T0 * F0,
            Z0 = m0 - j0 * f0,
            lt = S0 - j0 * _0,
            H0 = T0 - j0 * F0,
            Y0 = t.fric;
          if (
            ((i[H] += Z0 * Y0),
            (i[H + 1] += lt * Y0),
            (i[H + 2] += H0 * Y0),
            t.rest && A)
          ) {
            let et =
              (k - i[H]) * f0 + (I - i[H + 1]) * _0 + (G - i[H + 2]) * F0;
            if (et < -0.02 * e) {
              let ct = -et * t.rest;
              ((i[H] -= f0 * ct),
                (i[H + 1] -= _0 * ct),
                (i[H + 2] -= F0 * ct),
                t.cool <= 0 &&
                  -et / e > 1.2 &&
                  ((t.cool = 0.12),
                  this.hooks.audio.grenadeBounce(xr.set(k, I, G))));
            }
          }
        }
      }
    }
    this._centroid(t);
    let S = t.cx - m - (t.pvx || 0),
      E = t.cy - p - (t.pvy || 0),
      _ = t.cz - x - (t.pvz || 0),
      R = Math.sqrt(S * S + E * E + _ * _) / e;
    if (
      ((t.pvx = t.cx - m),
      (t.pvy = t.cy - p),
      (t.pvz = t.cz - x),
      T && R > 2.2 && t.cool <= 0 && t.type !== "nade")
    )
      if (((t.cool = 0.18), xr.set(t.cx, t.cy, t.cz), t.type === "rag")) {
        if (!t.thud || R > 5) {
          if ((this.hooks.audio.bodyFall(xr), this.hooks.fx.bodyFall)) {
            let L = this.world.groundAt(t.cx, t.cz, t.cy + 0.3);
            L > t.cy - 0.6 &&
              this.hooks.fx.bodyFall(xr.set(t.cx, L, t.cz), "marble");
          }
          t.thud = !0;
        }
      } else {
        if (t.breakable && R > 4.5) {
          this.breakProp(t);
          return;
        }
        this.hooks.audio.propHit(xr, t.mat, saturate(R / 9));
      }
    let C = 0;
    for (let L = 0; L < a; L++) {
      let A = L * 3,
        O =
          Math.abs(n[A] - i[A]) +
          Math.abs(n[A + 1] - i[A + 1]) +
          Math.abs(n[A + 2] - i[A + 2]);
      O > C && (C = O);
    }
    if (C / e < 0.16 && T) {
      if ((t.still += e) > 0.7 && t.type !== "nade") {
        t.sleeping = !0;
        for (let L = 0; L < a * 3; L++) i[L] = n[L];
      }
    } else t.still = 0;
    t.cy < -40 && ((t.dead = !0), t.obj && (t.obj.visible = !1));
  }
};

export { $m, LD, PropPhysics };

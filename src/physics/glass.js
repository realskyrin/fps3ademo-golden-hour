// physics/glass.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  DynamicDrawUsage,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "../vendor/three-r180.js";
import { createRandom, randomRange, saturate } from "../core/math.js";
import { $m, LD } from "./props.js";

var ww = 3200;
var f$ = new Matrix4().makeScale(0, 0, 0);
var u$ = new Matrix4();
var V9 = new Vector3();
var G9 = new Quaternion();
var zD = new Vector3();
var Fi = new Vector3();
function d$() {
  let o = new MeshStandardMaterial({
    color: 12178136,
    roughness: 0.035,
    metalness: 0,
    transparent: !0,
    opacity: 0.13,
    side: DoubleSide,
    depthWrite: !1,
    envMapIntensity: 2.4,
  });
  return (
    (o.onBeforeCompile = (t) => {
      ((t.vertexShader = t.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
attribute float crack;
varying float vCrack;
varying vec2 vGuv;
varying vec3 vGw;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vCrack = crack; vGuv = uv;
vec4 gwp = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
gwp = instanceMatrix * gwp;
#endif
vGw = (modelMatrix * gwp).xyz;`,
        )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
        varying float vCrack; varying vec2 vGuv; varying vec3 vGw;
        vec2 gh2(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
        float gEdge(vec2 x) {           // distance to the nearest voronoi cell border
          vec2 n = floor(x), f = fract(x); vec2 mg, mr; float md = 8.0;
          for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) { vec2 g = vec2(float(i), float(j)); vec2 r = g + gh2(n + g) - f; float d = dot(r, r); if (d < md) { md = d; mr = r; mg = g; } }
          md = 8.0;
          for (int j = -2; j <= 2; j++) for (int i = -2; i <= 2; i++) { vec2 g = mg + vec2(float(i), float(j)); vec2 r = g + gh2(n + g) - f; if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr))); }
          return md;
        }`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
        float gCk = 0.0;
        if (vCrack > 0.01) {
          vec2 gq = vGuv * 5.5;
          float e = min(gEdge(gq), gEdge(gq * 2.7 + 3.7) * 0.75);
          float aw = fwidth(gq.x) + fwidth(gq.y) + 0.004;
          float ln = (1.0 - smoothstep(aw * 0.5, aw * 1.6 + 0.012, e)) * smoothstep(1.2, 0.25, aw);
          gCk = vCrack * (0.05 + 0.95 * ln);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.92, 0.97, 1.0), gCk);
          diffuseColor.a = clamp(diffuseColor.a + vCrack * (0.03 + 0.8 * ln), 0.0, 1.0);
        }`,
          )
          .replace(
            "#include <aomap_fragment>",
            `#include <aomap_fragment>
        reflectedLight.indirectSpecular *= mix(1.0, 0.3, step(-27.4, vGw.x) * step(vGw.x, 27.4) * step(-19.4, vGw.z) * step(vGw.z, 9.4));`,
          )
          .replace(
            "#include <opaque_fragment>",
            `
        float gFres = pow(clamp(1.0 - abs(dot(normalize(vViewPosition), normal)), 0.0, 1.0), 4.0);
        float gA = clamp(diffuseColor.a + gFres * 0.45, 0.0, 1.0);
        // clear glass scatters almost nothing: only the fractured lines keep a lit, frosted body
        gl_FragColor = vec4(totalDiffuse * mix(0.12, 0.6, gCk) + totalEmissiveRadiance + totalSpecular / max(gA, 0.06), gA);`,
          )));
    }),
    o
  );
}
var GlassSystem = class {
  constructor(scene, world, hooks) {
    ((this.scene = scene),
      (this.world = world),
      (this.hooks = hooks),
      (this.panes = []),
      (this.material = d$()),
      (this.intact = null),
      (this._lastDebris = 0),
      (this._lastCrack = 0),
      (this.time = 0));
    let n = ww;
    ((this.sp = new Float32Array(n * 3)),
      (this.sv = new Float32Array(n * 3)),
      (this.sl = new Float32Array(n * 9)),
      (this.sax = new Float32Array(n * 3)),
      (this.sang = new Float32Array(n)),
      (this.sw = new Float32Array(n)),
      (this.slife = new Float32Array(n)),
      (this.sfloor = new Float32Array(n)),
      (this.sstate = new Uint8Array(n)),
      (this.sb = new Uint8Array(n)),
      (this.cursor = 0),
      (this.active = 0));
    let i = (this.sgeo = new BufferGeometry());
    ((this.spos = new BufferAttribute(new Float32Array(n * 9), 3)),
      this.spos.setUsage(DynamicDrawUsage),
      (this.snrm = new BufferAttribute(new Float32Array(n * 9), 3)),
      this.snrm.setUsage(DynamicDrawUsage));
    let a = new Float32Array(n * 6),
      r = new Float32Array(n * 3);
    for (let l = 0; l < n; l++)
      (a.set(
        [
          Math.random(),
          Math.random(),
          Math.random() + 0.2,
          Math.random(),
          Math.random(),
          Math.random() + 0.2,
        ],
        l * 6,
      ),
        r.fill(0.22, l * 3, l * 3 + 3));
    (i.setAttribute("position", this.spos),
      i.setAttribute("normal", this.snrm),
      i.setAttribute("uv", new BufferAttribute(a, 2)),
      i.setAttribute("crack", new BufferAttribute(r, 1)),
      (this.shards = new Mesh(i, this.material)),
      (this.shards.frustumCulled = !1),
      (this.shards.renderOrder = 11),
      scene.add(this.shards));
  }
  addPane({
    axis: t,
    pos: e,
    a0: s,
    a1: n,
    y0: i,
    y1: a,
    support: r = "frame",
    cell: l = 0.2,
  }) {
    let c = n - s,
      h = a - i,
      f = Math.max(2, Math.round(c / l)),
      u = Math.max(2, Math.round(h / l)),
      d = {
        id: this.panes.length,
        axis: t === "x" ? 0 : 2,
        pos: e,
        a0: s,
        a1: n,
        y0: i,
        y1: a,
        w: c,
        h,
        nx: f,
        ny: u,
        support: r,
        alive: null,
        crack: null,
        verts: null,
        diag: null,
        count: f * u,
        total: f * u,
        mesh: null,
        gone: !1,
        cascade: null,
        col: null,
      },
      m = 0.035;
    return (
      (d.col =
        t === "x"
          ? this.world.addCollider(e - m, i, s, e + m, a, n, "glass", {
              pane: d,
            })
          : this.world.addCollider(s, i, e - m, n, a, e + m, "glass", {
              pane: d,
            })),
      this.panes.push(d),
      d
    );
  }
  build() {
    let t = new PlaneGeometry(1, 1);
    t.setAttribute("crack", new BufferAttribute(new Float32Array(4), 1));
    let e = (this.intact = new InstancedMesh(
      t,
      this.material,
      this.panes.length,
    ));
    for (let s of this.panes) e.setMatrixAt(s.id, this._paneMatrix(s));
    ((e.frustumCulled = !1), (e.renderOrder = 10), this.scene.add(e));
  }
  _paneMatrix(t) {
    let e = (t.a0 + t.a1) / 2,
      s = (t.y0 + t.y1) / 2;
    return (
      t.axis === 2
        ? (V9.set(e, s, t.pos), G9.identity())
        : (V9.set(t.pos, s, e),
          G9.setFromAxisAngle(Object3D.DEFAULT_UP, Math.PI / 2)),
      zD.set(t.w, t.h, 1),
      u$.compose(V9, G9, zD)
    );
  }
  reset() {
    for (let t of this.panes)
      (t.mesh &&
        (this.scene.remove(t.mesh), t.mesh.geometry.dispose(), (t.mesh = null)),
        (t.alive = null),
        (t.count = t.total),
        (t.gone = !1),
        (t.cascade = null),
        (t.col.off = !1),
        this.intact.setMatrixAt(t.id, this._paneMatrix(t)));
    ((this.intact.instanceMatrix.needsUpdate = !0),
      this.sstate.fill(0),
      this.spos.array.fill(0),
      (this.spos.needsUpdate = !0),
      (this.active = 0));
  }
  _fracture(t) {
    if (t.alive) return;
    let { nx: e, ny: s } = t,
      n = createRandom(t.id * 7919 + 13);
    ((t.alive = new Uint8Array(e * s).fill(1)),
      (t.crack = new Float32Array(e * s)),
      (t.diag = new Uint8Array(e * s)));
    let i = (t.verts = new Float32Array((e + 1) * (s + 1) * 2)),
      a = t.w / e,
      r = t.h / s;
    for (let m = 0; m <= s; m++)
      for (let p = 0; p <= e; p++) {
        let x = (m * (e + 1) + p) * 2,
          g = p > 0 && p < e ? n.range(-0.36, 0.36) : 0,
          b = m > 0 && m < s ? n.range(-0.36, 0.36) : 0;
        ((i[x] = t.a0 + (p + g) * a), (i[x + 1] = t.y0 + (m + b) * r));
      }
    for (let m = 0; m < e * s; m++) t.diag[m] = n() < 0.5 ? 1 : 0;
    let l = e * s * 6,
      c = new Float32Array(l * 3),
      h = new Float32Array(l * 3),
      f = new Float32Array(l * 2),
      u = new Float32Array(l);
    for (let m = 0; m < l; m++) h[m * 3 + t.axis] = 1;
    let d = new BufferGeometry();
    (d.setAttribute("position", new BufferAttribute(c, 3)),
      d.setAttribute("normal", new BufferAttribute(h, 3)),
      d.setAttribute("uv", new BufferAttribute(f, 2)),
      d.setAttribute("crack", new BufferAttribute(u, 1)));
    for (let m = 0; m < e * s; m++) this._writeCell(t, m, c, f);
    ((t.mesh = new Mesh(d, this.material)),
      (t.mesh.frustumCulled = !1),
      (t.mesh.renderOrder = 10),
      (t.mesh.matrixAutoUpdate = !1),
      t.mesh.layers.set(1),
      this.scene.add(t.mesh),
      this.intact.setMatrixAt(t.id, f$),
      (this.intact.instanceMatrix.needsUpdate = !0));
  }
  _cellTris(t, e, s) {
    let n = e % t.nx,
      i = (e / t.nx) | 0,
      a = t.nx + 1,
      r = i * a + n,
      l = r + 1,
      c = r + a,
      h = c + 1;
    return (
      t.diag[e]
        ? ((s[0] = r),
          (s[1] = l),
          (s[2] = h),
          (s[3] = r),
          (s[4] = h),
          (s[5] = c))
        : ((s[0] = r),
          (s[1] = l),
          (s[2] = c),
          (s[3] = l),
          (s[4] = h),
          (s[5] = c)),
      s
    );
  }
  _writeCell(t, e, s, n) {
    let i = this._cellTris(t, e, LD),
      a = t.verts;
    for (let r = 0; r < 6; r++) {
      let l = a[i[r] * 2],
        c = a[i[r] * 2 + 1],
        h = (e * 6 + r) * 3;
      (t.axis === 2
        ? ((s[h] = l), (s[h + 1] = c), (s[h + 2] = t.pos))
        : ((s[h] = t.pos), (s[h + 1] = c), (s[h + 2] = l)),
        (n[(e * 6 + r) * 2] = l),
        (n[(e * 6 + r) * 2 + 1] = c));
    }
  }
  raycast(t, e, s, n, i, a, r, l) {
    let c = r,
      h = null,
      f = 0,
      u = 0,
      d = this.panes;
    for (let m = 0; m < d.length; m++) {
      let p = d[m];
      if (p.gone) continue;
      let x = p.axis === 0 ? n : a;
      if (Math.abs(x) < 1e-6) continue;
      let g = (p.pos - (p.axis === 0 ? t : s)) / x;
      if (g <= 0.001 || g >= c) continue;
      let b = e + i * g;
      if (b < p.y0 || b > p.y1) continue;
      let v = p.axis === 0 ? s + a * g : t + n * g;
      if (!(v < p.a0 || v > p.a1)) {
        if (p.alive) {
          let y = Math.min(p.nx - 1, (((v - p.a0) / p.w) * p.nx) | 0),
            M = Math.min(p.ny - 1, (((b - p.y0) / p.h) * p.ny) | 0);
          if (!p.alive[M * p.nx + y]) continue;
        }
        ((c = g), (h = p), (f = v), (u = b));
      }
    }
    return h ? ((l.t = c), (l.pane = h), (l.a = f), (l.y = u), !0) : !1;
  }
  _world(t, e, s, n) {
    return t.axis === 2 ? n.set(e, s, t.pos) : n.set(t.pos, s, e);
  }
  _breakCell(t, e, s, n, i, a) {
    if (!t.alive[e]) return;
    ((t.alive[e] = 0), t.count--);
    let r = t.mesh.geometry.attributes.position.array,
      l = this._cellTris(t, e, LD),
      c = t.verts;
    for (let h = 0; h < 2; h++) {
      let f = l[h * 3],
        u = l[h * 3 + 1],
        d = l[h * 3 + 2];
      this._spawnShard(
        t,
        c[f * 2],
        c[f * 2 + 1],
        c[u * 2],
        c[u * 2 + 1],
        c[d * 2],
        c[d * 2 + 1],
        s,
        n,
        i,
        a,
      );
    }
    (r.fill(0, e * 18, e * 18 + 18), (t.dirty = !0));
  }
  _spawnShard(t, e, s, n, i, a, r, l, c, h, f) {
    let u = this.cursor,
      d = 0;
    for (; this.sstate[u] === 1 && d < 64;) ((u = (u + 1) % ww), d++);
    this.cursor = (u + 1) % ww;
    let m = (e + n + a) / 3,
      p = (s + i + r) / 3,
      x = this.sl,
      g = u * 9,
      b = t.axis,
      v = (C, L, A) => {
        b === 2
          ? ((x[g + C] = L - m), (x[g + C + 1] = A - p), (x[g + C + 2] = 0))
          : ((x[g + C] = 0), (x[g + C + 1] = A - p), (x[g + C + 2] = L - m));
      };
    (v(0, e, s), v(3, n, i), v(6, a, r), this._world(t, m, p, Fi));
    let y = this.sp,
      M = this.sv,
      w = u * 3;
    ((y[w] = Fi.x),
      (y[w + 1] = Fi.y),
      (y[w + 2] = Fi.z),
      (M[w] = l + randomRange(-1, 1) * f),
      (M[w + 1] = c + randomRange(-0.6, 1) * f),
      (M[w + 2] = h + randomRange(-1, 1) * f));
    let T = randomRange(-1, 1),
      S = randomRange(-1, 1),
      E = randomRange(-1, 1),
      _ = Math.hypot(T, S, E) || 1;
    ((this.sax[w] = T / _),
      (this.sax[w + 1] = S / _),
      (this.sax[w + 2] = E / _),
      (this.sang[u] = 0),
      (this.sw[u] = randomRange(3, 16) * (Math.random() < 0.5 ? -1 : 1)),
      (this.slife[u] = 0),
      (this.sb[u] = 0));
    let R = this.world.groundAt(
      Fi.x + M[w] * 0.3,
      Fi.z + M[w + 2] * 0.3,
      Fi.y + 0.05,
    );
    ((this.sfloor[u] = R === -1 / 0 ? -1e6 : R),
      this.sstate[u] === 0 && this.active++,
      (this.sstate[u] = 1));
  }
  _ensure(t) {
    t.alive || this._fracture(t);
  }
  _commit(t) {
    if (!t.mesh) return;
    let e = t.mesh.geometry;
    e.attributes.position.needsUpdate = !0;
    let s = e.attributes.crack.array;
    for (let n = 0; n < t.total; n++) {
      let i = t.crack[n];
      s.fill(i, n * 6, n * 6 + 6);
    }
    ((e.attributes.crack.needsUpdate = !0), (t.dirty = !1));
  }
  hit(t, e, s, n, i = 1) {
    if (t.gone) return;
    this._ensure(t);
    let a = t.w / t.nx,
      r = t.h / t.ny,
      l = randomRange(0.13, 0.24) * i,
      c = (t.axis === 0 ? n.x : n.z) >= 0 ? 1 : -1,
      h = 2.2 + 2.2 * i,
      f = n.x * h,
      u = n.y * h * 0.5,
      d = n.z * h,
      m = Math.max(0, Math.floor((e - l * 3.5 - t.a0) / a)),
      p = Math.min(t.nx - 1, Math.floor((e + l * 3.5 - t.a0) / a)),
      x = Math.max(0, Math.floor((s - l * 3.5 - t.y0) / r)),
      g = Math.min(t.ny - 1, Math.floor((s + l * 3.5 - t.y0) / r)),
      b = Math.min(t.nx - 1, Math.max(0, Math.floor((e - t.a0) / a))),
      v = Math.min(t.ny - 1, Math.max(0, Math.floor((s - t.y0) / r)));
    for (let w = x; w <= g; w++)
      for (let T = m; T <= p; T++) {
        let S = w * t.nx + T,
          E = Math.hypot(t.a0 + (T + 0.5) * a - e, t.y0 + (w + 0.5) * r - s),
          _ =
            l *
            (0.7 + 0.6 * (Math.abs(Math.sin(S * 12.9898) * 43758.5453) % 1));
        if (E < _ || (T === b && w === v)) this._breakCell(t, S, f, u, d, 1.2);
        else if (t.alive[S]) {
          let R = 1 - (E - _) / (l * 2.6);
          R > t.crack[S] && (t.crack[S] = saturate(R));
        }
      }
    (this._settle(t, c), this._commit(t), this._world(t, e, s, Fi));
    let { audio: y, fx: M } = this.hooks;
    (this.time - this._lastCrack > 0.04 &&
      (y.glassCrack(Fi), (this._lastCrack = this.time)),
      M.chips(Fi.x, Fi.y, Fi.z, n.x * 0.6, 0.2, n.z * 0.6, 5, [0.85, 0.95, 1], {
        speed: 3,
      }),
      M.glassBurst && M.glassBurst(Fi, n, 0.3),
      t.count < t.total * 0.42 && !t.cascade && this.shatter(t, e, s, n, 0.5));
  }
  _settle(t, e) {
    let { nx: s, ny: n, alive: i } = t,
      a = s * n,
      r = W9.length >= a ? W9 : (W9 = new Uint8Array(a * 2));
    r.fill(0, 0, a);
    let l = 0,
      c = q9.length >= a ? q9 : (q9 = new Int32Array(a * 2)),
      h = (u) => {
        i[u] && !r[u] && ((r[u] = 1), (c[l++] = u));
      };
    for (let u = 0; u < s; u++)
      (h(u), t.support === "frame" && h((n - 1) * s + u));
    if (t.support === "frame")
      for (let u = 0; u < n; u++) (h(u * s), h(u * s + s - 1));
    for (; l;) {
      let u = c[--l],
        d = u % s,
        m = (u / s) | 0;
      (d > 0 && h(u - 1),
        d < s - 1 && h(u + 1),
        m > 0 && h(u - s),
        m < n - 1 && h(u + s));
    }
    let f = e * 0.5;
    for (let u = 0; u < a; u++)
      i[u] &&
        !r[u] &&
        this._breakCell(
          t,
          u,
          t.axis === 0 ? f : 0,
          -0.3,
          t.axis === 2 ? f : 0,
          0.5,
        );
  }
  shatter(t, e, s, n, i = 1) {
    t.gone ||
      t.cascade ||
      (this._ensure(t),
      (t.cascade = {
        a: e,
        y: s,
        t: 0,
        dx: n.x,
        dy: n.y,
        dz: n.z,
        k: i,
      }),
      (t.col.off = !0),
      this._world(t, e, s, Fi),
      this.hooks.audio.glassShatter(Fi, saturate((t.w * t.h) / 7)),
      this.hooks.fx.glassBurst &&
        this.hooks.fx.glassBurst(Fi, n, saturate(0.4 + (t.w * t.h) / 9)));
  }
  bodyHit(t, e, s, n, i, a, r, l) {
    if (t.gone || t.col.off) return !0;
    let c = Math.abs(t.axis === 0 ? i : r);
    if (!l && c < 4.6 && !(t.alive && t.count < t.total * 0.8)) return !1;
    Fi.set(i, a, r);
    let h = Fi.length() || 1;
    Fi.multiplyScalar(1 / h);
    let f = t.axis === 0 ? n : e;
    return (
      this.shatter(
        t,
        Math.min(t.a1, Math.max(t.a0, f)),
        Math.min(t.y1, Math.max(t.y0, s)),
        $m.copy(Fi),
        Math.max(0.6, c / 6),
      ),
      !0
    );
  }
  blast(t, e) {
    for (let s of this.panes) {
      if (s.gone) continue;
      let n = Math.min(s.a1, Math.max(s.a0, s.axis === 0 ? t.z : t.x)),
        i = Math.min(s.y1, Math.max(s.y0, t.y));
      this._world(s, n, i, Fi);
      let a = Fi.distanceTo(t);
      a > e ||
        ($m.subVectors(Fi, t),
        $m.lengthSq() < 1e-4 &&
          $m.set(s.axis === 0 ? 1 : 0, 0, s.axis === 2 ? 1 : 0),
        $m.normalize(),
        a < e * 0.7
          ? this.shatter(s, n, i, $m, 1.6)
          : this.hit(s, n, i, $m, 2.2));
    }
  }
  update(t) {
    this.time += t;
    for (let e of this.panes) {
      let s = e.cascade;
      if (!s) continue;
      s.t += t;
      let n = s.t * 11 + 0.15,
        i = e.w / e.nx,
        a = e.h / e.ny,
        r = 2 * s.k,
        l = 0;
      for (let c = 0; c < e.total; c++) {
        if (!e.alive[c]) continue;
        let h = c % e.nx,
          f = (c / e.nx) | 0,
          u = e.a0 + (h + 0.5) * i,
          d = e.y0 + (f + 0.5) * a,
          m = Math.hypot(u - s.a, d - s.y);
        if (m < n) {
          let p = Math.min(1, m / 1.2);
          this._breakCell(
            e,
            c,
            s.dx * r * (1.6 - p) + (e.axis === 2 ? u - s.a : 0) * 0.6,
            s.dy * r * 0.4 + (d - s.y) * 0.3,
            s.dz * r * (1.6 - p) + (e.axis === 0 ? u - s.a : 0) * 0.6,
            0.9,
          );
        } else l++;
      }
      l === 0
        ? ((e.gone = !0),
          (e.cascade = null),
          this.scene.remove(e.mesh),
          e.mesh.geometry.dispose(),
          (e.mesh = null),
          (e.dirty = !1))
        : e.dirty && this._commit(e);
    }
    this._simulate(t);
  }
  _simulate(t) {
    if (!this.active) return;
    let e = this.sp,
      s = this.sv,
      n = this.sl,
      i = this.sax,
      a = this.sstate,
      r = this.spos.array,
      l = this.snrm.array,
      c = 0,
      h = 0,
      f = 0,
      u = 0,
      d = !1;
    for (let m = 0; m < ww; m++) {
      let p = a[m];
      if (p === 0) continue;
      if (p === 2) {
        (this.slife[m] += t) > 14 &&
          ((a[m] = 0), r.fill(0, m * 9, m * 9 + 9), (d = !0), this.active--);
        continue;
      }
      d = !0;
      let x = m * 3;
      s[x + 1] -= 9.81 * t;
      let g = 1 - 0.35 * t;
      ((s[x] *= g),
        (s[x + 2] *= g),
        (e[x] += s[x] * t),
        (e[x + 1] += s[x + 1] * t),
        (e[x + 2] += s[x + 2] * t),
        (this.sang[m] += this.sw[m] * t));
      let b = this.sfloor[m],
        v = !1;
      if (e[x + 1] <= b + 0.02 && s[x + 1] < 0)
        ((e[x + 1] = b + 0.02),
          s[x + 1] < -2.2 && this.sb[m] < 2
            ? ((s[x + 1] *= -randomRange(0.18, 0.34)),
              (s[x] *= 0.55),
              (s[x + 2] *= 0.55),
              (this.sw[m] *= 0.6),
              this.sb[m]++)
            : ((v = !0), (a[m] = 2), (this.slife[m] = randomRange(0, 5))),
          c++,
          (h = e[x]),
          (f = e[x + 1]),
          (u = e[x + 2]));
      else if (e[x + 1] < -40) {
        ((a[m] = 0), r.fill(0, m * 9, m * 9 + 9), this.active--);
        continue;
      }
      let y = i[x],
        M = i[x + 1],
        w = i[x + 2],
        T = Math.cos(this.sang[m]),
        S = Math.sin(this.sang[m]),
        E = 1 - T,
        _ = m * 9;
      for (let I = 0; I < 9; I += 3) {
        let G = n[_ + I],
          K = n[_ + I + 1],
          $ = n[_ + I + 2],
          n0 = y * G + M * K + w * $,
          e0 = G * T + (M * $ - w * K) * S + y * n0 * E,
          p0 = K * T + (w * G - y * $) * S + M * n0 * E,
          t0 = $ * T + (y * K - M * G) * S + w * n0 * E;
        (v && (p0 = 0.004 + I * 7e-4),
          (r[_ + I] = e[x] + e0),
          (r[_ + I + 1] = (v ? b : e[x + 1]) + p0),
          (r[_ + I + 2] = e[x + 2] + t0));
      }
      let R = r[_ + 3] - r[_],
        C = r[_ + 4] - r[_ + 1],
        L = r[_ + 5] - r[_ + 2],
        A = r[_ + 6] - r[_],
        O = r[_ + 7] - r[_ + 1],
        H = r[_ + 8] - r[_ + 2],
        F = C * H - L * O,
        P = L * A - R * H,
        z = R * O - C * A,
        k = Math.hypot(F, P, z) || 1;
      ((F /= k), (P /= k), (z /= k));
      for (let I = 0; I < 9; I += 3)
        ((l[_ + I] = F), (l[_ + I + 1] = P), (l[_ + I + 2] = z));
    }
    (d && ((this.spos.needsUpdate = !0), (this.snrm.needsUpdate = !0)),
      c > 2 &&
        this.time - this._lastDebris > 0.09 &&
        ((this._lastDebris = this.time),
        this.hooks.audio.glassDebris(Fi.set(h, f, u))));
  }
};
var W9 = new Uint8Array(1024);
var q9 = new Int32Array(1024);

export { GlassSystem };

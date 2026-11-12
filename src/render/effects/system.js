// render/effects/system.js: recovered from the verified GOLDEN HOUR release.
import { Ds, Fe, UM, VM, zd } from "./atlas.js";
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  DoubleSide,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Quaternion,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";
import { As, mb } from "./particles.js";
import { GL, WL, XM } from "./shafts.js";
import { KM } from "./decals.js";
import { createCanvas, randomRange, saturate } from "../../core/math.js";

var jY = [
  0,
  0,
  0,
  Fe.GLOW,
  Fe.SPARK,
  0,
  0,
  Fe.DUST,
  Fe.CHIP_A,
  Fe.DROP,
  Fe.RING,
  Fe.MIST,
  0,
  0,
  Fe.STREAK,
  Fe.EMBER,
];
var qL = new Quaternion();
var $Y = new Vector3(0, 0, 1);
var Bm = new Vector3();
var KL = new Vector3();
var XL = new Matrix4();
var Go = new Vector3();
var Um = new Color();
var ur = new Vector3();
var aa = new Vector3();
var eh = new Vector3();
var Jn0 = new Vector3(0, 1, 0);
var sh = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
var nh = 6.2832;
var zl = {
  marble: {
    dust: [0.93, 0.91, 0.87],
    chip: [0.92, 0.9, 0.86],
    decal: "cracked",
    tint: [1, 0.99, 0.96],
    big: "chunkCracked",
    hard: 1,
    spark: 0.18,
    dustK: 0.75,
  },
  tile: {
    dust: [0.82, 0.82, 0.82],
    chip: [0.93, 0.93, 0.92],
    decal: "cracked",
    tint: [1, 1, 1],
    big: "chunkCracked",
    hard: 1,
    spark: 0.12,
    dustK: 0.6,
  },
  ceramic: {
    dust: [0.9, 0.9, 0.88],
    chip: [0.95, 0.95, 0.93],
    decal: "cracked",
    tint: [1, 1, 1],
    big: null,
    hard: 1,
    spark: 0.1,
    dustK: 0.6,
  },
  concrete: {
    dust: [0.72, 0.71, 0.68],
    chip: [0.5, 0.49, 0.47],
    decal: "crater",
    tint: [0.72, 0.71, 0.7],
    big: "chunk",
    hard: 1,
    spark: 0.28,
    dustK: 1.1,
  },
  plaster: {
    dust: [0.95, 0.92, 0.87],
    chip: [0.9, 0.87, 0.82],
    decal: "crater",
    tint: [1, 0.98, 0.95],
    big: "chunk",
    hard: 1,
    spark: 0,
    dustK: 1.3,
  },
  stone: {
    dust: [0.84, 0.76, 0.63],
    chip: [0.78, 0.7, 0.58],
    decal: "crater",
    tint: [0.94, 0.86, 0.74],
    big: "chunk",
    hard: 1,
    spark: 0.35,
    dustK: 1,
  },
  wood: {
    dust: [0.62, 0.47, 0.3],
    chip: [0.78, 0.6, 0.38],
    decal: "wood",
    tint: [1, 0.96, 0.9],
    big: "chunkWood",
  },
  carpet: {
    dust: [0.3, 0.32, 0.36],
    chip: [0.34, 0.38, 0.46],
    decal: "fabric",
    tint: [1, 1, 1],
  },
  fabric: {
    dust: [0.55, 0.52, 0.47],
    chip: [0.7, 0.67, 0.6],
    decal: "fabric",
    tint: [1, 1, 1],
  },
  metal: {
    dust: [0.3, 0.3, 0.32],
    chip: [0.5, 0.5, 0.52],
    decal: "metal",
    tint: [1, 1, 1],
  },
  plastic: {
    dust: [0.3, 0.3, 0.31],
    chip: [0.16, 0.16, 0.17],
    decal: "plastic",
    tint: [1, 1, 1],
  },
  foliage: {
    dust: [0.2, 0.3, 0.14],
    chip: [0.2, 0.42, 0.13],
  },
  glass: {
    dust: [0.85, 0.9, 0.92],
    chip: [0.8, 0.93, 0.97],
  },
  flesh: {
    dust: [0.17, 0.025, 0.02],
    chip: [0.12, 0.012, 0.01],
  },
  water: {
    dust: [0.8, 0.9, 1],
    chip: [0.85, 0.92, 0.97],
  },
};
var v9 = [0.6, 0.57, 0.53];
var jM = class {
  constructor(t, e) {
    ((this.fx = t), (this.additive = e));
  }
  get n() {
    return this.additive ? 0 : this.fx.p.n;
  }
  spawn(t) {
    this.fx._legacySpawn(t, this.additive);
  }
};
var YM = 32;
var YL = 1;
var jL = 2;
var $L = 3;
var ZL = 4;
var EffectsSystem = class {
  constructor(scene) {
    ((this.scene = scene), (this.atlas = new UM()));
    let e = VM.map((n) => n.frames),
      s = VM.map((n) => (n.loop ? 1 : 0));
    ((this.p = new mb(4096, this.atlas, {
      frames: e,
      loops: s,
    })),
      (this.distort = new mb(192, this.atlas, {
        frames: e,
        loops: s,
        distort: !0,
      })),
      (this.p.frames = e),
      (this.p.loops = s),
      (this.p.mesh.visible = !1),
      (this.distort.mesh.visible = !1),
      scene.add(this.p.mesh, this.distort.mesh),
      (this.alpha = new jM(this, !1)),
      (this.add = new jM(this, !0)),
      (this.decals = null),
      (this.lights = []));
    for (let n = 0; n < 3; n++) {
      let i = new PointLight(16756832, 0, 14, 2);
      (scene.add(i),
        this.lights.push({
          l: i,
          t: 0,
          dur: 0,
          peak: 0,
        }));
    }
    ((this._li = 0),
      (this.emitters = []),
      (this.tint = 1),
      (this.glows = null),
      (this._glowList = []),
      (this.physics = null),
      (this.k = 1),
      (this.clock = 0),
      (this.time = 0),
      (this._dt = 0),
      (this.cam = null),
      (this.gfx = null),
      (this.world = null),
      (this.hotel = null),
      (this.sun = null),
      (this.player = null),
      (this._dummyCam = new PerspectiveCamera()),
      (this.pushPos = [
        new Vector4(0, -99, 0, 1),
        new Vector4(0, -99, 0, 1),
        new Vector4(0, -99, 0, 1),
        new Vector4(0, -99, 0, 1),
      ]),
      (this.pushT = new Vector4(-99, -99, -99, -99)),
      (this._pi = 0),
      (this.shared = {
        uClock: {
          value: 0,
        },
        tShadow: this.p.uniforms.tShadow,
        uShadowMat: this.p.uniforms.uShadowMat,
        uShadowOn: this.p.uniforms.uShadowOn,
        uPush: {
          value: this.pushPos,
        },
        uPushT: {
          value: this.pushT,
        },
        uIndoor: this.p.uniforms.uIndoor,
      }),
      (this.distort.uniforms.tShadow = this.p.uniforms.tShadow),
      (this.vol = new XM(this.atlas.noise)),
      (this.vol.uniforms.uPush.value = this.pushPos),
      (this.vol.uniforms.uPushT.value = this.pushT),
      (this.shaftMat = null),
      (this.moteMat = null),
      (this.pollen = null),
      (this._suppress = 0),
      (this._hurt = 0),
      (this._flash = 0),
      (this._concuss = 0),
      (this._hx = new Float32Array(32 * 4)),
      (this._hn = new Int8Array(32 * 3)),
      (this._hi = 0),
      (this._cx = new Float32Array(16 * 4)),
      (this._ci = 0),
      (this._tk = new Float32Array(YM * 12)),
      (this._tt = new Uint8Array(YM)),
      (this._heat = new Float32Array(16 * 7)),
      (this._heatN = 0),
      (this._flickers = []),
      (this._slideAcc = 0),
      (this._smokeAcc = 0),
      (this._glintAcc = 0),
      (this._trN = 1),
      (this._rate = 0),
      (this._rateT = 0),
      (this._mirror = !1));
  }
  attach(t) {
    ((this.gfx = t.gfx),
      (this.cam = t.gfx.camera),
      (this.world = t.world),
      (this.hotel = t.hotel),
      (this.player = t.player),
      (this.match = t.match),
      t.physics && (this.physics = t.physics),
      this._styleCasings(),
      (this.sun = t.hotel && t.hotel.sun ? t.hotel.sun : null));
    let e = t.gfx.q;
    if (
      ((this.decals = new KM(600, e.atlas >= 4096 ? 2048 : 1024)),
      this.decals.mesh.layers.set(1),
      this.scene.add(this.decals.mesh),
      this.sun)
    ) {
      let s = this.p.uniforms;
      (s.uSunDir.value
        .copy(this.sun.position)
        .sub(this.sun.target.position)
        .normalize(),
        Um.copy(this.sun.color).multiplyScalar(this.sun.intensity / Math.PI),
        s.uSunCol.value.copy(Um),
        this.vol.uniforms.uSunDir.value.copy(s.uSunDir.value),
        this.vol.uniforms.uColor.value.copy(Um).multiplyScalar(0.36));
    }
    ((this.pollen = WL(this.shared)),
      this.pollen.pts.layers.set(1),
      this.scene.add(this.pollen.pts),
      this.p.mesh.layers.set(2),
      this.distort.mesh.layers.set(3),
      this.heatSource(-15, 0.62, 17.2, 0.55, 1.9, 1));
    for (let s of [
      [-17.9, 15.6],
      [-11.3, 19.9],
      [13.3, 16.8],
      [11.3, 19.9],
    ])
      this.heatSource(s[0], 2.02, s[1], 0.3, 1, 0.7);
    for (let s = 0; s < this._glowList.length; s++) {
      let n = this._glowList[s];
      Math.abs(n.pos.x + 15) < 0.3 &&
        Math.abs(n.pos.z - 17.2) < 0.3 &&
        this.flicker({
          glows: [s],
          style: "fire",
          depth: 0.3,
        });
    }
    t.gfx.setFx(this);
  }
  releaseTargets() {
    ((this.p.uniforms.tDepth.value = this.p.dummy),
      (this.distort.uniforms.tDepth.value = this.p.dummy),
      this.p.uniforms.uDepthMode.value.set(0, 0),
      this.distort.uniforms.uDepthMode.value.set(0, 0),
      (this.vol.uniforms.tDepth.value = null));
  }
  onQuality(t) {
    ((this.k = t.fxK),
      this.releaseTargets(),
      !this.atlas.ready &&
        this.gfx &&
        (this.atlas.bake(this.gfx.renderer, t.atlas),
        (this.p.mesh.visible = !0),
        (this.distort.mesh.visible = !0)),
      this.vol.setSteps(t.soft ? t.vol : 0),
      this.shaftMat &&
        (this.shaftMat.uniforms.uK.value = t.soft && t.vol > 0 ? 0 : 0.055),
      t.distort || this.distort.clear());
  }
  resize(t, e) {
    this.vol.setSize(t, e);
  }
  mirror(t) {
    ((this._mirror = t),
      this.p.mesh.layers.set(t ? 1 : 2),
      t &&
        (this.p.uniforms.uDepthMode.value.set(0, 0),
        (this.p.uniforms.tDepth.value = this.p.dummy)));
  }
  prePass(t, e, s, n) {
    let i = this.p.uniforms,
      a = this.distort.uniforms;
    ((i.tDepth.value = e || this.p.dummy),
      (a.tDepth.value = e || this.p.dummy),
      i.uInvRes.value.set(1 / s, 1 / n),
      a.uInvRes.value.set(1 / Math.max(2, s >> 1), 1 / Math.max(2, n >> 1)),
      (i.uNear.value = a.uNear.value = t.near),
      (i.uFar.value = a.uFar.value = t.far),
      a.uDepthMode.value.set(0, e ? 1 : 0),
      (a.uTime.value = this.clock));
  }
  setDepthMode(t, e) {
    this.p.uniforms.uDepthMode.value.set(t, e);
  }
  renderVolumetric(t, e, s) {
    return this.vol.render(t, e, s, this.sun, this.clock);
  }
  count() {
    return this.p.n + this.distort.n;
  }
  _lod(t, e, s) {
    let n = this.cam;
    if (!n) return this.k;
    let i = t - n.position.x,
      a = e - n.position.y,
      r = s - n.position.z,
      l = Math.sqrt(i * i + a * a + r * r);
    return (
      (this._d = l),
      this.k * (l < 16 ? 1 : l > 70 ? 0.3 : 1 - ((l - 16) / 54) * 0.7)
    );
  }
  _facing(t, e, s, n, i, a) {
    let r = this.cam;
    if (!r) return 0.5;
    let l = r.position.x - t,
      c = r.position.y - e,
      h = r.position.z - s,
      f = Math.sqrt(l * l + c * c + h * h) || 1;
    return Math.abs((l * n + c * i + h * a) / f);
  }
  _cnt(t, e) {
    let s = t * e;
    return Math.floor(s + Math.random());
  }
  _impulse(t, e, s, n) {
    let i = this._pi;
    ((this._pi = (i + 1) & 3),
      this.pushPos[i].set(t, e, s, n),
      this.pushT.setComponent(i, this.clock));
  }
  _task(t, e, s, n, i, a = 0, r = 0, l = 0, c = 0, h = 0) {
    for (let f = 0; f < YM; f++)
      if (!this._tt[f]) {
        let u = f * 12,
          d = this._tk;
        return (
          (this._tt[f] = t),
          (d[u] = 0),
          (d[u + 1] = e),
          (d[u + 2] = s),
          (d[u + 3] = n),
          (d[u + 4] = i),
          (d[u + 5] = a),
          (d[u + 6] = r),
          (d[u + 7] = l),
          (d[u + 8] = c),
          (d[u + 9] = h),
          (d[u + 10] = 0),
          f
        );
      }
    return -1;
  }
  _puff(t, e, s, n, i, a, r, l) {
    let c = this.p.begin();
    return (
      (c.x = t),
      (c.y = e),
      (c.z = s),
      (c.r = n[0]),
      (c.g = n[1]),
      (c.b = n[2]),
      (c.a = i),
      (c.s0 = a),
      (c.s1 = r),
      (c.life = l),
      (c.book = Ds.SMOKE.id),
      (c.f0 = randomRange(0, 9)),
      (c.f1 = c.f0 + randomRange(40, 52)),
      (c.lit = 1),
      (c.cls = As.SMOKE),
      (c.soft = 0.3 + r * 0.25),
      (c.rv = randomRange(-0.5, 0.5)),
      (c.aspect = Math.random() < 0.5 ? -1 : 1),
      (c.fin = 0.1),
      (c.fout = 0.45),
      (c.drag = 1.6),
      (c.turb = 0.35),
      (c.wind = 0.25),
      (c.ero = 0.7),
      c
    );
  }
  _fit(t, e, s) {
    ur.set(t.x, t.y, t.z);
    let n = this.world;
    if (!n) return s;
    if (
      !n.raycast(
        t.x + e.x * 0.06,
        t.y + e.y * 0.06,
        t.z + e.z * 0.06,
        -e.x,
        -e.y,
        -e.z,
        0.14,
        sh,
      )
    )
      return 0;
    let i = sh.col;
    if (!i || i.water) return 0;
    let a = s * 0.5,
      r = Math.abs(e.x) > 0.5 ? 0 : Math.abs(e.y) > 0.5 ? 1 : 2;
    for (let l = 0; l < 3; l++) {
      if (l === r) continue;
      let c = l === 0 ? i.x0 : l === 1 ? i.y0 : i.z0,
        h = l === 0 ? i.x1 : l === 1 ? i.y1 : i.z1;
      a = Math.min(a, (h - c) * 0.49);
    }
    for (let l = 0; l < 3; l++) {
      if (l === r) continue;
      let c = l === 0 ? i.x0 : l === 1 ? i.y0 : i.z0,
        h = l === 0 ? i.x1 : l === 1 ? i.y1 : i.z1,
        f = ur.getComponent(l),
        u = Math.min(f - c, h - f);
      if (u < a) {
        let d = Math.max(u, a * 0.6);
        d < a && (a = d);
      }
      ((f = Math.max(c + a, Math.min(h - a, f))), ur.setComponent(l, f));
    }
    return a * 2 < 0.02 ? 0 : a * 2;
  }
  _legacySpawn(t, e) {
    let s = this.p,
      n = s.begin();
    ((n.x = t.x),
      (n.y = t.y),
      (n.z = t.z),
      (n.vx = t.vx || 0),
      (n.vy = t.vy || 0),
      (n.vz = t.vz || 0),
      (n.life = t.life || 1),
      (n.s0 = t.s0 || 0.1),
      (n.s1 = t.s1 === void 0 ? n.s0 : t.s1),
      (n.sk = 2),
      t.rot !== void 0 && (n.rot = t.rot),
      (n.rv = t.rv || 0),
      (n.r = t.r),
      (n.g = t.g),
      (n.b = t.b),
      (n.a = t.a === void 0 ? 1 : t.a),
      (n.fin = t.fadeIn || 0),
      (n.fout = 0),
      (n.grav = t.grav || 0),
      (n.drag = t.drag || 0),
      t.floor !== void 0 && (n.floor = t.floor),
      (n.add = e ? 1 : 0));
    let i = (t.frame || 0) | 0;
    (i <= 2
      ? ((n.book = Ds.SMOKE.id),
        (n.f0 = 8 + i * 9),
        (n.f1 = n.f0 + 16),
        (n.cls = As.SMOKE),
        (n.soft = 0.3))
      : i === 5 || i === 6
        ? ((n.book = Ds.BIG.id),
          (n.f0 = i === 5 ? zd.STAR_A : zd.STAR_B),
          (n.cls = As.FLASH))
        : i === 12 || i === 13
          ? ((n.book = Ds.FLAME.id),
            (n.f0 = randomRange(0, 31)),
            (n.f1 = n.f0 + n.life * 26),
            (n.heat = 0.8),
            (n.heat1 = 0.5),
            (n.add = 1),
            (n.cls = As.FIRE),
            (n.r = n.g = n.b = 0),
            (n.s0 *= 1.5),
            (n.s1 = n.s0 * 0.75),
            (n.rot = randomRange(-0.12, 0.12)),
            (n.rv = 0),
            (n.soft = 0.15),
            (n.a = 0.5),
            (n.fin = 0.15),
            (n.fout = 0.4),
            (n.aspect = Math.random() < 0.5 ? -0.8 : 0.8))
          : ((n.book = Ds.SPR.id), (n.f0 = jY[i & 15]), (n.soft = 0.08)),
      t.stretch > 0 && ((n.mode = 1), (n.stretch = t.stretch)),
      s.emit());
  }
  smoke(t, e, s, n, i = {}) {
    let a = i.color || v9,
      r = i.bright || 1,
      l = i.speed || 0.6,
      c = i.spread || 0.1,
      h = i.size || 0.25;
    for (let f = 0; f < n; f++) {
      let u = this._puff(
        t + randomRange(-1, 1) * c,
        e + randomRange(-1, 1) * c,
        s + randomRange(-1, 1) * c,
        a,
        Math.min(1, (i.a || 0.35) * 1.35),
        h * randomRange(0.6, 1),
        h * randomRange(2.2, 3.6),
        (i.life || 1.6) * randomRange(0.7, 1.3),
      );
      ((u.r *= r),
        (u.g *= r),
        (u.b *= r),
        (u.vx = (i.dx || 0) * l + randomRange(-0.3, 0.3) * l),
        (u.vy = (i.dy || 0) * l + randomRange(0.05, 0.5) * l),
        (u.vz = (i.dz || 0) * l + randomRange(-0.3, 0.3) * l),
        (u.drag = i.drag === void 0 ? 1.6 : i.drag),
        (u.grav = i.grav || -0.15),
        (u.fin = 0.12),
        this.p.emit());
    }
  }
  sparks(t, e, s, n, i, a, r, l = {}) {
    let c = l.speed || 7,
      h = l.color || [5, 2.6, 0.7],
      f = this.p;
    r = this._cnt(r, this._lod(t, e, s));
    for (let u = 0; u < r; u++) {
      let d = c * randomRange(0.3, 1),
        m = f.begin();
      ((m.x = t),
        (m.y = e),
        (m.z = s),
        (m.vx = (n + randomRange(-0.7, 0.7)) * d),
        (m.vy = (i + randomRange(-0.5, 0.9)) * d),
        (m.vz = (a + randomRange(-0.7, 0.7)) * d),
        (m.life = randomRange(0.18, 0.55) * (l.life || 1)),
        (m.s0 = randomRange(0.011, 0.02)),
        (m.s1 = 0.005),
        (m.r = h[0] * 2.2),
        (m.g = h[1] * 2.2),
        (m.b = h[2] * 2.6),
        (m.r1 = h[0] * 0.8),
        (m.g1 = h[1] * 0.3),
        (m.b1 = h[2] * 0.12),
        (m.book = Ds.SPR.id),
        (m.f0 = Fe.STREAK),
        (m.mode = 1),
        (m.stretch = randomRange(0.024, 0.042)),
        (m.add = 1),
        (m.grav = 9),
        (m.drag = 1.1),
        (m.bounce = 0.4),
        l.floor !== void 0 && (m.floor = l.floor),
        (m.fout = 0.5),
        (m.cls = As.SPARK),
        (m.soft = -1),
        f.emit());
    }
  }
  chips(t, e, s, n, i, a, r, l, c = {}) {
    let h = this.p,
      f = c.size || 1,
      u = c.speed || 3.2,
      d = c.sprite === void 0 ? -1 : c.sprite;
    r = this._cnt(r, this._lod(t, e, s));
    for (let m = 0; m < r; m++) {
      let p = u * randomRange(0.3, 1),
        x = h.begin(),
        g = randomRange(0.75, 1.1);
      ((x.x = t),
        (x.y = e),
        (x.z = s),
        (x.vx = (n + randomRange(-0.8, 0.8)) * p),
        (x.vy = (i + randomRange(-0.4, 1)) * p),
        (x.vz = (a + randomRange(-0.8, 0.8)) * p),
        (x.life = randomRange(0.6, 1.3)),
        (x.s0 = randomRange(0.016, 0.044) * f),
        (x.s1 = x.s0 * 0.85),
        (x.rv = randomRange(-16, 16)),
        (x.r = l[0] * g),
        (x.g = l[1] * g),
        (x.b = l[2] * g),
        (x.book = Ds.SPR.id),
        (x.f0 = d >= 0 ? d : Fe.CHIP_A + ((Math.random() * 3) | 0)),
        (x.lit = 1),
        (x.grav = 9.8),
        (x.drag = 0.5),
        (x.bounce = 0.32),
        c.floor !== void 0 && (x.floor = c.floor + x.s0 * 0.3),
        (x.fout = 0.8),
        (x.cls = As.CHIP),
        (x.soft = -1),
        (x.aspect = Math.random() < 0.5 ? -1 : 1),
        h.emit());
    }
  }
  glowPuff(t, e, s, n, i, a = 0.08) {
    let r = this.p.begin();
    ((r.x = t),
      (r.y = e),
      (r.z = s),
      (r.life = a),
      (r.s0 = n),
      (r.s1 = n * 1.4),
      (r.r = i[0]),
      (r.g = i[1]),
      (r.b = i[2]),
      (r.a = 1),
      (r.book = Ds.SPR.id),
      (r.f0 = Fe.GLOW),
      (r.add = 1),
      (r.fout = 0),
      (r.cls = As.FLASH),
      (r.soft = 0.25),
      (r.rot = 0),
      (r.prio = 2),
      (r.bias = 0.5),
      this.p.emit());
  }
  flashLight(t, e, s, n, i) {
    let a = this.lights[this._li];
    ((this._li = (this._li + 1) % this.lights.length),
      a.l.position.copy(t),
      a.l.color.set(e),
      (a.l.distance = n),
      (a.peak = s),
      (a.t = 0),
      (a.dur = i),
      (a.l.intensity = s));
  }
  probeAt(t, e) {
    ((e =
      e ||
      this._probe ||
      (this._probe = {
        color: new Color(),
        dir: new Vector3(),
      })),
      e.color || ((e.color = new Color()), (e.dir = new Vector3())));
    let s = this.lightVolume;
    s
      ? s.sample(t.x, t.y, t.z, e)
      : (e.r = e.g = e.b = e.ar = e.ag = e.ab = e.br = e.bg = e.bb = 0.12);
    let n = this.p.uniforms.uSunDir.value;
    e.sun =
      this.world && this.world.raycast(t.x, t.y, t.z, n.x, n.y, n.z, 300, null)
        ? 0
        : 1;
    let i = 0,
      a = null,
      r = this.hotel && this.hotel.lights;
    if (r)
      for (let l in r) {
        let c = r[l].light,
          h = c.position.distanceToSquared(t),
          f = c.distance * c.distance;
        if (h > f || c.intensity <= 0) continue;
        let u = 1 - h / f,
          d = (c.intensity * u * u) / (h + 1.5);
        d > i && ((i = d), (a = c));
      }
    for (let l = 0; l < this.lights.length; l++) {
      let c = this.lights[l].l;
      if (c.intensity <= 0) continue;
      let h = c.position.distanceToSquared(t),
        f = c.distance * c.distance;
      if (h > f) continue;
      let u = 1 - h / f,
        d = (c.intensity * u * u) / (h + 1.5);
      d > i && ((i = d), (a = c));
    }
    return (
      (e.k = i),
      a && (e.color.copy(a.color), e.dir.subVectors(a.position, t).normalize()),
      e
    );
  }
  _warp(t, e, s, n, i, a, r, l, c = 0, h = 0) {
    if (!this.gfx || !this.gfx.q.distort) return;
    let f = this.distort.begin();
    ((f.x = e),
      (f.y = s),
      (f.z = n),
      (f.vy = c),
      (f.s0 = i),
      (f.s1 = a),
      (f.life = r),
      (f.r = t),
      (f.g = l),
      (f.b = 0),
      (f.a = 1),
      (f.sk = t ? 1.6 : 2),
      (f.fin = t ? 0.04 : 0.25),
      (f.fout = t ? 0.25 : 0.45),
      (f.book = 0),
      (f.f0 = 0),
      (f.soft = 0.5),
      (f.delay = h),
      (f.rot = 0),
      (f.prio = 2),
      this.distort.emit());
  }
  tracer(t, e, s = [5, 2.6, 0.9]) {
    Go.subVectors(e, t);
    let n = Go.length();
    if (n < 4) return;
    Go.multiplyScalar(1 / n);
    let i = this.p,
      a = 260,
      r =
        this.cam && this.player && t.distanceToSquared(this.cam.position) < 1.7,
      l = (r && this.player.adsK) || 0;
    if (l > 0.5) {
      if (--this._trN > 0) return;
      this._trN = 3 + (Math.random() < 0.5 ? 1 : 0);
      let d = 2.2,
        m = Math.min(n - 0.5, 8);
      if (m - d < 3) return;
      let p = i.begin(),
        x = m - d;
      ((p.x = t.x + Go.x * d),
        (p.y = t.y + Go.y * d),
        (p.z = t.z + Go.z * d),
        (p.vx = Go.x * 40),
        (p.vy = Go.y * 40),
        (p.vz = Go.z * 40),
        (p.ax = -Go.x * x),
        (p.ay = -Go.y * x),
        (p.az = -Go.z * x),
        (p.life = 0.042),
        (p.book = Ds.SPR.id),
        (p.f0 = Fe.STREAK),
        (p.mode = 1),
        (p.stretch = 0),
        (p.add = 1),
        (p.fin = 0),
        (p.fout = 0.3),
        (p.cls = As.FLASH),
        (p.prio = 2),
        (p.soft = -1),
        (p.s0 = p.s1 = 0.01),
        (p.r = s[0] * 0.34),
        (p.g = s[1] * 0.32),
        (p.b = s[2] * 0.28),
        (p.a = 0.8),
        i.emit());
      return;
    }
    let c = r ? 0.3 : Math.min(2.2, n * 0.3),
      h = Math.min(r ? 0.009 : 0.014, ((n - c) * 0.45) / a),
      f = c + a * h,
      u = n - f;
    for (let d = 0; d < 2; d++) {
      let m = i.begin();
      ((m.x = t.x + Go.x * f),
        (m.y = t.y + Go.y * f),
        (m.z = t.z + Go.z * f),
        (m.vx = Go.x * a),
        (m.vy = Go.y * a),
        (m.vz = Go.z * a),
        (m.life = Math.max(0.02, u / a)),
        (m.book = Ds.SPR.id),
        (m.f0 = Fe.STREAK),
        (m.mode = 1),
        (m.stretch = h),
        (m.add = 1),
        (m.fout = 0.8),
        (m.cls = As.FLASH),
        (m.prio = 2),
        (m.soft = -1),
        d === 0
          ? ((m.s0 = r ? 0.016 : 0.026),
            (m.r = s[0] * 2.6),
            (m.g = s[1] * 2.8),
            (m.b = s[2] * 3.2),
            (m.a = r ? 1 - l * 2 : 1))
          : ((m.s0 = r ? 0.06 : 0.12),
            (m.r = s[0] * 0.5),
            (m.g = s[1] * 0.4),
            (m.b = s[2] * 0.3),
            (m.a = r ? 0.4 * (1 - l * 2) : 0.55)),
        (m.s1 = m.s0),
        i.emit());
    }
    if (!r && Math.random() < 0.34 && this._lod(t.x, t.y, t.z) > 0.5) {
      let d = i.begin();
      ((d.x = e.x),
        (d.y = e.y),
        (d.z = e.z),
        (d.ax = Go.x * u),
        (d.ay = Go.y * u),
        (d.az = Go.z * u),
        (d.mode = 1),
        (d.stretch = 0),
        (d.book = Ds.SPR.id),
        (d.f0 = Fe.FLARE),
        (d.lit = 1),
        (d.r = 0.7),
        (d.g = 0.69),
        (d.b = 0.68),
        (d.a = randomRange(0.05, 0.1)),
        (d.s0 = 0.03),
        (d.s1 = 0.11),
        (d.life = randomRange(0.5, 0.9)),
        (d.fin = 0.12),
        (d.fout = 0.2),
        (d.cls = As.SMOKE),
        (d.soft = 0.2),
        i.emit());
    }
  }
  muzzle(t, e, s = 1, n = !0) {
    let i = this.p,
      a = t.x,
      r = t.y,
      l = t.z,
      c = this._lod(a, r, l),
      h = s < 0.45;
    if (h) this.glowPuff(a, r, l, 0.28, [1.6, 0.9, 0.35], 0.04);
    else {
      let f = i.begin();
      ((f.x = a + e.x * 0.05),
        (f.y = r + e.y * 0.05),
        (f.z = l + e.z * 0.05),
        (f.life = 0.05),
        (f.s0 = 0.27 * s * randomRange(0.85, 1.2)),
        (f.s1 = f.s0 * 1.3),
        (f.r = 3.8),
        (f.g = 2.1),
        (f.b = 0.75),
        (f.book = Ds.BIG.id),
        (f.f0 = (Math.random() * 4) | 0),
        (f.add = 1),
        (f.fout = 0.3),
        (f.cls = As.FLASH),
        (f.prio = 2),
        (f.soft = 0.12),
        (f.bias = 0.7),
        i.emit(),
        aa.set(e.z, 0, -e.x),
        aa.lengthSq() < 1e-4 && aa.set(1, 0, 0),
        aa.normalize());
      for (let u = 0; u < 3; u++) {
        if (
          ((f = i.begin()),
          (f.x = a),
          (f.y = r),
          (f.z = l),
          (f.life = 0.048),
          (f.book = Ds.BIG.id),
          (f.f0 = zd.CONE_A + (Math.random() < 0.5 ? 0 : 1)),
          (f.mode = 2),
          (f.add = 1),
          (f.fout = 0.3),
          (f.cls = As.FLASH),
          (f.prio = 2),
          (f.soft = 0.1),
          (f.r = 4.2),
          (f.g = 2.2),
          (f.b = 0.75),
          (f.aspect = Math.random() < 0.5 ? -1 : 1),
          (f.bias = 0.7),
          u === 0)
        )
          ((f.ax = e.x),
            (f.ay = e.y),
            (f.az = e.z),
            (f.s0 = 0.21 * s),
            (f.s1 = f.s0 * 1.2),
            (f.stretch = randomRange(1.6, 2.1)));
        else {
          let d = u === 1 ? 1 : -1;
          if (
            ((f.ax = aa.x * d * 0.9 + e.x * 0.4),
            (f.ay = e.y * 0.4 + 0.25),
            (f.az = aa.z * d * 0.9 + e.z * 0.4),
            (f.s0 = 0.1 * s),
            (f.s1 = f.s0 * 1.2),
            (f.stretch = randomRange(1.5, 2)),
            s < 0.7)
          )
            continue;
        }
        i.emit();
      }
      if (
        (this.glowPuff(a, r, l, 0.7 * s, [1.1, 0.55, 0.18], 0.06),
        Math.random() < 0.4 * c)
      ) {
        let u = 1 + ((Math.random() * 3) | 0);
        for (let d = 0; d < u; d++) {
          f = i.begin();
          let m = randomRange(10, 24);
          ((f.x = a),
            (f.y = r),
            (f.z = l),
            (f.vx = (e.x + randomRange(-0.22, 0.22)) * m),
            (f.vy = (e.y + randomRange(-0.2, 0.25)) * m),
            (f.vz = (e.z + randomRange(-0.22, 0.22)) * m),
            (f.life = randomRange(0.07, 0.2)),
            (f.s0 = 0.009),
            (f.s1 = 0.004),
            (f.r = 9),
            (f.g = 5),
            (f.b = 1.6),
            (f.r1 = 3),
            (f.g1 = 0.8),
            (f.b1 = 0.1),
            (f.book = Ds.SPR.id),
            (f.f0 = Fe.STREAK),
            (f.mode = 1),
            (f.stretch = 0.02),
            (f.add = 1),
            (f.drag = 3),
            (f.grav = 4),
            (f.cls = As.SPARK),
            (f.soft = -1),
            i.emit());
        }
      }
      (this._d < 16 &&
        this._warp(
          0,
          a + e.x * 0.25,
          r + e.y * 0.25 + 0.05,
          l + e.z * 0.25,
          0.3,
          0.6,
          0.3,
          0.0045,
          0.5,
        ),
        this._impulse(a + e.x, r + e.y, l + e.z, 1.6));
    }
    if (Math.random() < (h ? 0.5 : 0.85) * c) {
      let f = this._puff(
          a + e.x * 0.12,
          r + e.y * 0.12,
          l + e.z * 0.12,
          v9,
          h ? 0.1 : 0.17,
          0.08 * (0.6 + s * 0.5),
          randomRange(0.4, 0.62) * (0.6 + s * 0.4),
          randomRange(1.1, 1.9),
        ),
        u = randomRange(1.4, 2.6);
      ((f.vx = e.x * u + randomRange(-0.25, 0.25)),
        (f.vy = e.y * u + randomRange(0.1, 0.45)),
        (f.vz = e.z * u + randomRange(-0.25, 0.25)),
        (f.drag = 2.6),
        (f.grav = -0.12),
        (f.turb = 0.5),
        (f.fin = 0.25),
        (f.ero0 = 0.15),
        (f.ero = 0.85),
        i.emit());
    }
    n && this.flashLight(t, 16752720, 46 * s, 13, 0.06);
  }
  muzzleSmoke(t, e, s = 0, n = 1) {
    let i = this.p,
      a = saturate(s / 10),
      r = (this.player && this.player.adsK) || 0;
    if (Math.random() < 0.4 + a * 0.3) {
      let l = this._puff(
          t.x + e.x * 0.12,
          t.y + e.y * 0.12,
          t.z + e.z * 0.12,
          v9,
          (0.03 + a * 0.03) * (1 - 0.85 * r) * n,
          0.035,
          randomRange(0.16, 0.26),
          randomRange(0.4, 0.65),
        ),
        c = randomRange(2.4, 4.2);
      ((l.vx = e.x * c + randomRange(-0.25, 0.25)),
        (l.vy = e.y * c + randomRange(0.05, 0.4) - 1.1 * r),
        (l.vz = e.z * c + randomRange(-0.25, 0.25)),
        (l.drag = 4.2),
        (l.grav = -0.15),
        (l.turb = 0.7),
        (l.soft = 0.15),
        (l.fin = 0.25),
        (l.fout = 0.25),
        (l.ero0 = randomRange(0.04, 0.14)),
        (l.ero = 0.6),
        (l.aspect *= randomRange(1, 1.5)),
        i.emit());
    }
    this._impulse(t.x + e.x * 1.2, t.y + e.y * 1.2, t.z + e.z * 1.2, 1.4);
  }
  barrelSmoke(t, e, s = 1, n = 1, i = null) {
    let a = this.p,
      r = this.clock,
      l = n * 7.3,
      c = this.hotel && this.hotel.indoor ? 1 - this.hotel.indoor(t.x, t.z) : 0,
      h =
        0.35 +
        0.65 * Math.abs(Math.sin(r * 2.3 + l) * Math.sin(r * 0.9 + l * 2 + 1));
    if (h < 0.42 && Math.random() < 0.5) return;
    let f = e.z,
      u = -e.x,
      d =
        Math.sin(r * 4.3 + l) * 0.15 +
        Math.sin(r * 10.7 + l * 1.7) * 0.06 +
        randomRange(-0.012, 0.012),
      m = Math.cos(r * 3.1 + l * 0.6) * 0.1 + randomRange(-0.012, 0.012),
      p = a.begin();
    ((p.x = t.x),
      (p.y = t.y + 0.003),
      (p.z = t.z),
      (p.vx = f * d + e.x * m + c * 0.1),
      (p.vy = 0.3 + 0.06 * Math.sin(r * 6.1 + l)),
      (p.vz = u * d + e.z * m - c * 0.05),
      i && ((p.vx += i.x * 0.55), (p.vy += i.y * 0.35), (p.vz += i.z * 0.55)),
      (p.life = (1.25 + 0.5 * s) * (0.75 + 0.25 * n)),
      (p.s0 = 0.016 * n),
      (p.s1 = 0.085 * n),
      (p.sk = 1.3),
      (p.book = Ds.SPR.id),
      (p.f0 = Fe.MIST),
      (p.lit = 1),
      (p.r = 0.8),
      (p.g = 0.79),
      (p.b = 0.78),
      (p.a = (0.07 + 0.08 * s) * h * (0.65 + 0.35 * n)),
      (p.fin = 0.12),
      (p.fout = 0.3),
      (p.drag = 0.5),
      (p.grav = -0.04),
      (p.wind = 0.15),
      (p.rot = randomRange(0, nh)),
      (p.rv = randomRange(-0.4, 0.4)),
      (p.cls = As.SMOKE),
      (p.soft = 0.05),
      a.emit());
  }
  muzzleSparks(t, e, s = 6, n = 0.22) {
    let i = this.p;
    (aa.set(e.z, 0, -e.x),
      aa.lengthSq() < 1e-6 && aa.set(1, 0, 0),
      aa.normalize(),
      eh.crossVectors(e, aa));
    let a =
      (this.player &&
        t.distanceToSquared(this.cam.position) < 1.7 &&
        this.player.adsK) ||
      0;
    a > 0.5 && (s = Math.ceil(s * 0.5));
    for (let r = 0; r < s; r++) {
      let l = i.begin(),
        c = randomRange(0, nh),
        h = n * Math.sqrt(Math.random()),
        f = Math.cos(c) * h,
        u = randomRange(16, 38),
        d = Math.random() < 0.1,
        m = randomRange(0.05, 0.16),
        p = Math.sin(c) * h;
      a > 0.5 && (p = -Math.abs(p) - 0.03);
      let x = e.x + aa.x * f + eh.x * p,
        g = e.y + aa.y * f + eh.y * p,
        b = e.z + aa.z * f + eh.z * p;
      ((l.x = t.x + x * m),
        (l.y = t.y + g * m),
        (l.z = t.z + b * m),
        (l.vx = x * u),
        (l.vy = g * u),
        (l.vz = b * u),
        (l.life = d ? randomRange(0.14, 0.26) : randomRange(0.035, 0.08)),
        (l.s0 = randomRange(0.006, 0.011)),
        (l.s1 = 0.004),
        (l.r = 10),
        (l.g = 5.2),
        (l.b = 1.5),
        (l.r1 = 4.5),
        (l.g1 = 1.1),
        (l.b1 = 0.12),
        (l.book = Ds.SPR.id),
        (l.f0 = Fe.STREAK),
        (l.mode = 1),
        (l.stretch = randomRange(0.01, 0.018)),
        (l.add = 1),
        (l.grav = d ? 9 : 4),
        (l.drag = d ? 3.2 : 5.5),
        (l.fout = 0.45),
        (l.cls = As.SPARK),
        (l.soft = -1),
        (l.prio = 2),
        i.emit());
    }
  }
  _jet(t, e, s, n, i, a, r, l, c, h) {
    let f = this.p.begin();
    ((f.x = t),
      (f.y = e),
      (f.z = s),
      (f.ax = n + randomRange(-0.14, 0.14)),
      (f.ay = i + randomRange(-0.14, 0.14)),
      (f.az = a + randomRange(-0.14, 0.14)),
      (f.mode = 2),
      (f.stretch = randomRange(1, 1.3)),
      (f.book = Ds.JET.id),
      (f.f0 = 0),
      (f.f1 = 31),
      (f.lit = 1),
      (f.r = r[0]),
      (f.g = r[1]),
      (f.b = r[2]),
      (f.a = c),
      (f.s0 = l * 0.45),
      (f.s1 = l),
      (f.sk = 3),
      (f.life = h),
      (f.fin = 0),
      (f.fout = 0.45),
      (f.cls = As.DUST),
      (f.soft = 0.12),
      (f.ero = 0.7),
      (f.aspect = Math.random() < 0.5 ? -1 : 1),
      this.p.emit());
  }
  _dust(t, e, s, n, i, a, r, l, c, h, f, u) {
    for (let d = 0; d < l; d++) {
      let m = this._puff(
          t,
          e,
          s,
          r,
          h * randomRange(0.7, 1.15),
          c * randomRange(0.3, 0.45),
          c * randomRange(0.8, 1.35),
          f * randomRange(0.7, 1.3),
        ),
        p = u * randomRange(0.25, 1);
      ((m.ero0 = randomRange(0.22, 0.4)),
        (m.ero = 0.9),
        (m.aspect *= randomRange(1, 1.5)),
        (m.f0 = randomRange(6, 26)),
        (m.f1 = m.f0 + randomRange(26, 36)),
        (m.vx = (n + randomRange(-0.45, 0.45)) * p),
        (m.vy = (i + randomRange(-0.3, 0.5)) * p),
        (m.vz = (a + randomRange(-0.45, 0.45)) * p),
        (m.drag = 3.4),
        (m.grav = 0.12),
        (m.turb = 0.3),
        (m.cls = As.DUST),
        (m.fin = 0.05),
        (m.soft = 0.14 + c * 0.2),
        this.p.emit());
    }
  }
  _grit(t, e, s, n, i, a, r, l, c) {
    for (let h = 0; h < l; h++) {
      let f = this.p.begin(),
        u = c * randomRange(0.5, 1);
      ((f.x = t),
        (f.y = e),
        (f.z = s),
        (f.vx = (n + randomRange(-0.5, 0.5)) * u),
        (f.vy = (i + randomRange(-0.3, 0.6)) * u),
        (f.vz = (a + randomRange(-0.5, 0.5)) * u),
        (f.life = randomRange(0.25, 0.45)),
        (f.s0 = randomRange(0.04, 0.07)),
        (f.s1 = f.s0 * randomRange(2.4, 3.6)),
        (f.book = Ds.SPR.id),
        (f.f0 = Fe.GRIT),
        (f.lit = 1),
        (f.r = r[0]),
        (f.g = r[1]),
        (f.b = r[2]),
        (f.a = 0.9),
        (f.fout = 0.4),
        (f.drag = 2.4),
        (f.grav = 5),
        (f.cls = As.DUST),
        (f.soft = 0.05),
        this.p.emit());
    }
  }
  _ricochet(t, e, s, n, i, a, r) {
    for (let l = 0; l < r; l++) {
      let c = this.p.begin(),
        h = randomRange(22, 44);
      (aa
        .set(
          n + randomRange(-1.3, 1.3),
          i + randomRange(-1, 1.3),
          a + randomRange(-1.3, 1.3),
        )
        .normalize(),
        aa.x * n + aa.y * i + aa.z * a < 0.1 &&
          aa.addScaledVector(Go.set(n, i, a), 0.6).normalize(),
        (c.x = t),
        (c.y = e),
        (c.z = s),
        (c.vx = aa.x * h),
        (c.vy = aa.y * h),
        (c.vz = aa.z * h),
        (c.life = randomRange(0.22, 0.5)),
        (c.s0 = 0.013),
        (c.s1 = 0.006),
        (c.r = 14),
        (c.g = 9),
        (c.b = 3.6),
        (c.r1 = 5),
        (c.g1 = 1.4),
        (c.b1 = 0.2),
        (c.book = Ds.SPR.id),
        (c.f0 = Fe.STREAK),
        (c.mode = 1),
        (c.stretch = 0.03),
        (c.add = 1),
        (c.grav = 5),
        (c.drag = 0.9),
        (c.fout = 0.6),
        (c.cls = As.SPARK),
        (c.soft = -1),
        (c.prio = 2),
        this.p.emit());
    }
  }
  _debris(t, e, s, n, i, a, r, l, c, h) {
    let f = this.physics;
    if (!(!f || !f.debris))
      for (let u = 0; u < l; u++) {
        let d = h * randomRange(0.5, 1);
        (Um.setRGB(r[0] * 0.8, r[1] * 0.8, r[2] * 0.8),
          f.debris(
            t + n * 0.03,
            e + i * 0.03,
            s + a * 0.03,
            (n + randomRange(-0.6, 0.6)) * d,
            (i + randomRange(-0.2, 0.9)) * d + 0.6,
            (a + randomRange(-0.6, 0.6)) * d,
            c,
            Um,
            6,
          ));
      }
  }
  _cluster(t, e) {
    let s = this._hx,
      n = this._hn,
      i = this.clock,
      a = 0,
      r = t.x,
      l = t.y,
      c = t.z;
    for (let d = 0; d < 32; d++) {
      let m = d * 4;
      if (i - s[m + 3] > 9 || s[m + 3] === 0) continue;
      let p = s[m] - t.x,
        x = s[m + 1] - t.y,
        g = s[m + 2] - t.z;
      p * p + x * x + g * g < 0.2 * 0.2 &&
        n[d * 3] * e.x + n[d * 3 + 1] * e.y + n[d * 3 + 2] * e.z > 100 &&
        (a++, (r += s[m]), (l += s[m + 1]), (c += s[m + 2]));
    }
    let h = this._hi;
    if (
      ((this._hi = (h + 1) & 31),
      (s[h * 4] = t.x),
      (s[h * 4 + 1] = t.y),
      (s[h * 4 + 2] = t.z),
      (s[h * 4 + 3] = i + 0.001),
      (n[h * 3] = e.x * 127),
      (n[h * 3 + 1] = e.y * 127),
      (n[h * 3 + 2] = e.z * 127),
      a < 3)
    )
      return !1;
    eh.set(r / (a + 1), l / (a + 1), c / (a + 1));
    let f = this._cx;
    for (let d = 0; d < 16; d++) {
      let m = d * 4;
      if (f[m + 3] === 0 || i - f[m + 3] > 150) continue;
      let p = f[m] - eh.x,
        x = f[m + 1] - eh.y,
        g = f[m + 2] - eh.z;
      if (p * p + x * x + g * g < 0.34 * 0.34) return !1;
    }
    let u = this._ci;
    return (
      (this._ci = (u + 1) & 15),
      (f[u * 4] = eh.x),
      (f[u * 4 + 1] = eh.y),
      (f[u * 4 + 2] = eh.z),
      (f[u * 4 + 3] = i + 0.001),
      !0
    );
  }
  impact(t, e, s, n) {
    if (t === "water") {
      this.splash(e, 0.5);
      return;
    }
    let i = zl[t] || zl.concrete,
      a = this.p,
      r = s.x,
      l = s.y,
      c = s.z,
      h = e.x + r * 0.02,
      f = e.y + l * 0.02,
      u = e.z + c * 0.02;
    ((this._rate =
      Math.max(0, this._rate - (this.clock - this._rateT) * 7) + 1),
      (this._rateT = this.clock));
    let d = this._rate > 5 ? 5 / this._rate : 1,
      m = this._lod(h, f, u) * (0.35 + 0.65 * d),
      p = this._d > 45,
      x = n === void 0 ? -1e9 : n,
      g = this._facing(h, f, u, r, l, c),
      b = 1 - g * g * g,
      v =
        this._io ||
        (this._io = {
          floor: 0,
          speed: 0,
          size: 1,
          sprite: -1,
        });
    ((v.floor = x), (v.size = 1), (v.sprite = -1));
    let y = i.decal;
    if (i.hard) {
      let S = i.dustK;
      if (
        (b > 0.15 &&
          this._jet(
            h,
            f,
            u,
            r,
            l,
            c,
            i.dust,
            randomRange(0.75, 1.05) * (0.75 + S * 0.25),
            b,
            randomRange(0.45, 0.62),
          ),
        !p)
      ) {
        let E = this._puff(
          h + r * 0.07,
          f + l * 0.07,
          u + c * 0.07,
          i.dust,
          0.8 * (0.45 + 0.55 * g),
          0.12,
          randomRange(0.5, 0.66) * (0.7 + 0.3 * S),
          0.42,
        );
        ((E.sk = 3),
          (E.f0 = 2),
          (E.f1 = 44),
          (E.cls = As.DUST),
          (E.drag = 0),
          (E.turb = 0),
          (E.fout = 0.2),
          (E.soft = 0.1),
          (E.ero0 = 0.15),
          (E.ero = 0.85),
          a.emit());
      }
      (this._dust(
        h,
        f,
        u,
        r,
        l,
        c,
        i.dust,
        this._cnt(2.4 * S, m),
        0.72,
        0.46 * S,
        2,
        2.4,
      ),
        (v.speed = 4),
        (v.size = 1.25),
        this.chips(h, f, u, r, l, c, 9, i.chip, v),
        (t === "tile" || t === "ceramic" || t === "marble") &&
          ((v.sprite = Fe.SHARD),
          (v.speed = 4.2),
          this.chips(h, f, u, r, l, c, 3, i.chip, v)),
        p || this._grit(h, f, u, r, l, c, i.dust, 3, 4),
        Math.random() < i.spark &&
          ((v.speed = 6),
          this.sparks(h, f, u, r, l, c, 3, v),
          this.glowPuff(h, f, u, 0.16, [3, 1.7, 0.6], 0.05),
          Math.random() < 0.35 && this._ricochet(h, f, u, r, l, c, 1)),
        m > 0.7 &&
          Math.random() < 0.4 &&
          this._debris(
            h,
            f,
            u,
            r,
            l,
            c,
            i.chip,
            1,
            randomRange(0.012, 0.022),
            2.6,
          ));
    } else
      switch (t) {
        case "metal": {
          this.glowPuff(h, f, u, 0.3, [5, 2.9, 1.1], 0.06);
          let S = a.begin();
          ((S.x = h),
            (S.y = f),
            (S.z = u),
            (S.life = 0.06),
            (S.s0 = 0.22),
            (S.s1 = 0.5),
            (S.r = 8),
            (S.g = 5),
            (S.b = 2),
            (S.book = Ds.BIG.id),
            (S.f0 = zd.BURST),
            (S.add = 1),
            (S.fout = 0.2),
            (S.cls = As.FLASH),
            (S.soft = 0.05),
            a.emit(),
            (v.floor = x),
            (v.speed = 8),
            this.sparks(h, f, u, r * 1.2, l * 1.2, c * 1.2, 12, v),
            Math.random() < 0.65 &&
              this._ricochet(
                h,
                f,
                u,
                r,
                l,
                c,
                1 + (Math.random() < 0.35 ? 1 : 0),
              ),
            p ||
              ((S = this._puff(
                h,
                f,
                u,
                i.dust,
                0.14,
                0.05,
                randomRange(0.2, 0.3),
                randomRange(0.6, 0.9),
              )),
              (S.vx = r * 0.6),
              (S.vy = l * 0.6 + 0.25),
              (S.vz = c * 0.6),
              (S.cls = As.DUST),
              a.emit()),
            Math.random() < 0.2 && (y = "metal"));
          break;
        }
        case "wood": {
          (b > 0.15 &&
            this._jet(
              h,
              f,
              u,
              r,
              l,
              c,
              i.dust,
              randomRange(0.5, 0.7),
              0.8 * b,
              randomRange(0.4, 0.55),
            ),
            this._dust(
              h,
              f,
              u,
              r,
              l,
              c,
              i.dust,
              this._cnt(1.8, m),
              0.55,
              0.34,
              1.5,
              1.8,
            ),
            (v.speed = 4.2),
            (v.size = 2.6),
            (v.sprite = Fe.SPLINTER_A),
            this.chips(h, f, u, r, l, c, 6, i.chip, v),
            (v.sprite = Fe.SPLINTER_B),
            (v.size = 2),
            this.chips(h, f, u, r, l, c, 4, i.chip, v),
            p || this._grit(h, f, u, r, l, c, i.chip, 2, 3),
            m > 0.7 &&
              Math.random() < 0.25 &&
              this._debris(h, f, u, r, l, c, i.chip, 1, 0.016, 2.4));
          break;
        }
        case "carpet":
        case "fabric": {
          (this._dust(
            h,
            f,
            u,
            r,
            l,
            c,
            i.dust,
            this._cnt(2.2, m),
            0.5,
            0.34,
            1.4,
            1.4,
          ),
            b > 0.15 &&
              this._jet(
                h,
                f,
                u,
                r,
                l,
                c,
                i.dust,
                randomRange(0.4, 0.55),
                0.6 * b,
                0.4,
              ));
          let S = this._cnt(6, m);
          for (let E = 0; E < S; E++) {
            let _ = a.begin(),
              R = randomRange(0.8, 2.4),
              C = randomRange(0.8, 1.25);
            ((_.x = h),
              (_.y = f),
              (_.z = u),
              (_.vx = (r + randomRange(-0.7, 0.7)) * R),
              (_.vy = (l + randomRange(-0.3, 0.9)) * R),
              (_.vz = (c + randomRange(-0.7, 0.7)) * R),
              (_.life = randomRange(0.8, 1.5)),
              (_.s0 = randomRange(0.04, 0.09)),
              (_.s1 = _.s0),
              (_.rv = randomRange(-5, 5)),
              (_.r = i.chip[0] * C),
              (_.g = i.chip[1] * C),
              (_.b = i.chip[2] * C),
              (_.book = Ds.SPR.id),
              (_.f0 = Fe.FIBRE),
              (_.lit = 1),
              (_.drag = 4.5),
              (_.grav = 2.2),
              (_.turb = 1.2),
              (_.fout = 0.6),
              (_.cls = As.CHIP),
              (_.soft = 0.03),
              x > -1e8 && (_.floor = x + 0.01),
              a.emit());
          }
          break;
        }
        case "foliage": {
          let S = this._cnt(8, m);
          for (let E = 0; E < S; E++) {
            let _ = a.begin(),
              R = randomRange(1, 3.2),
              C = randomRange(0.7, 1.4);
            ((_.x = h),
              (_.y = f),
              (_.z = u),
              (_.vx = (r + randomRange(-0.8, 0.8)) * R),
              (_.vy = (l + randomRange(-0.2, 1)) * R),
              (_.vz = (c + randomRange(-0.8, 0.8)) * R),
              (_.life = randomRange(1, 1.9)),
              (_.s0 = randomRange(0.04, 0.1)),
              (_.s1 = _.s0),
              (_.rv = randomRange(-9, 9)),
              (_.r = i.chip[0] * C),
              (_.g = i.chip[1] * C),
              (_.b = i.chip[2] * C * 0.8),
              (_.book = Ds.SPR.id),
              (_.f0 = Math.random() < 0.5 ? Fe.LEAF_A : Fe.LEAF_B),
              (_.lit = 1),
              (_.drag = 2.6),
              (_.grav = 3.2),
              (_.turb = 2.2),
              (_.fout = 0.75),
              (_.cls = As.CHIP),
              (_.soft = -1),
              x > -1e8 && (_.floor = x + 0.01),
              (_.bounce = 0),
              a.emit());
          }
          if (!p) {
            let E = this._puff(h, f, u, i.dust, 0.12, 0.08, 0.34, 0.7);
            ((E.vx = r * 0.5),
              (E.vy = l * 0.5 + 0.2),
              (E.vz = c * 0.5),
              (E.cls = As.DUST),
              a.emit());
          }
          break;
        }
        case "glass": {
          ((v.speed = 4),
            (v.sprite = Fe.SHARD),
            (v.size = 1.2),
            this.chips(h, f, u, r, l, c, 7, i.chip, v));
          for (let S = 0; S < 2; S++) {
            let E = a.begin();
            ((E.x = h + randomRange(-0.05, 0.05)),
              (E.y = f + randomRange(-0.05, 0.05)),
              (E.z = u + randomRange(-0.05, 0.05)),
              (E.life = 0.09),
              (E.s0 = 0.05),
              (E.s1 = 0.16),
              (E.r = 2.4),
              (E.g = 2.6),
              (E.b = 2.8),
              (E.book = Ds.SPR.id),
              (E.f0 = Fe.GLINT),
              (E.add = 1),
              (E.fout = 0.2),
              (E.cls = As.FLASH),
              (E.soft = -1),
              (E.delay = S * 0.03),
              a.emit());
          }
          if (!p) {
            let S = this._puff(h, f, u, i.dust, 0.16, 0.05, 0.26, 0.5);
            ((S.vx = r * 0.8),
              (S.vy = l * 0.8),
              (S.vz = c * 0.8),
              (S.cls = As.DUST),
              a.emit());
          }
          break;
        }
        case "flesh": {
          let S = this._cnt(2.4, m);
          for (let E = 0; E < S; E++) {
            let _ = this._puff(
              h,
              f,
              u,
              i.dust,
              0.42,
              0.05,
              randomRange(0.2, 0.34),
              randomRange(0.26, 0.42),
            );
            ((_.vx = r * randomRange(0.5, 1.8) + randomRange(-0.5, 0.5)),
              (_.vy = l * randomRange(0.5, 1.8) + randomRange(-0.1, 0.6)),
              (_.vz = c * randomRange(0.5, 1.8) + randomRange(-0.5, 0.5)),
              (_.drag = 4),
              (_.grav = 1.2),
              (_.turb = 0),
              (_.f0 = 14),
              (_.f1 = 44),
              (_.cls = As.DUST),
              (_.soft = 0.1),
              a.emit());
          }
          if (!p)
            for (let E = 0; E < 4; E++) {
              let _ = a.begin(),
                R = randomRange(1, 3);
              ((_.x = h),
                (_.y = f),
                (_.z = u),
                (_.vx = (r + randomRange(-0.7, 0.7)) * R),
                (_.vy = (l + randomRange(-0.2, 0.8)) * R),
                (_.vz = (c + randomRange(-0.7, 0.7)) * R),
                (_.life = randomRange(0.3, 0.5)),
                (_.s0 = randomRange(0.01, 0.018)),
                (_.s1 = 0.008),
                (_.r = i.chip[0]),
                (_.g = i.chip[1]),
                (_.b = i.chip[2]),
                (_.book = Ds.SPR.id),
                (_.f0 = Fe.SPARK),
                (_.lit = 1),
                (_.mode = 1),
                (_.stretch = 0.018),
                (_.grav = 9.8),
                (_.fout = 0.5),
                (_.cls = As.CHIP),
                (_.soft = -1),
                a.emit());
            }
          return;
        }
        default:
          if (
            ((v.speed = 3.4), this.chips(h, f, u, r, l, c, 5, i.chip, v), !p)
          ) {
            let S = this._puff(h, f, u, i.dust, 0.2, 0.05, 0.28, 0.7);
            ((S.vx = r * 0.8),
              (S.vy = l * 0.8 + 0.2),
              (S.vz = c * 0.8),
              (S.cls = As.DUST),
              a.emit());
          }
      }
    if (!y || !this.decals || n === void 0) return;
    if (i.big && this._cluster(e, s)) {
      let S = this._fit(eh, s, randomRange(0.3, 0.44));
      S > 0.16 &&
        (this.decals.add(
          i.big,
          ur,
          s,
          S,
          i.tint,
          i.big === "chunkWood" && Math.abs(l) < 0.5
            ? randomRange(-0.1, 0.1)
            : NaN,
        ),
        (v.floor = x),
        (v.speed = 4.4),
        (v.size = 1.8),
        (v.sprite = -1),
        this.chips(
          ur.x + r * 0.02,
          ur.y + l * 0.02,
          ur.z + c * 0.02,
          r,
          l,
          c,
          10,
          i.chip,
          v,
        ),
        this._debris(
          ur.x,
          ur.y,
          ur.z,
          r,
          l,
          c,
          i.chip,
          3,
          randomRange(0.03, 0.05),
          3.2,
        ),
        this._dust(ur.x, ur.y, ur.z, r, l, c, i.dust, 3, 0.8, 0.34, 2.4, 1.8),
        b > 0.15 &&
          this._jet(ur.x, ur.y, ur.z, r, l, c, i.dust, 0.85, 0.7 * b, 0.6));
    }
    let w =
        y === "wood"
          ? randomRange(0.16, 0.24)
          : y === "cracked"
            ? randomRange(0.2, 0.3)
            : y === "crater"
              ? randomRange(0.15, 0.23)
              : y === "metal"
                ? randomRange(0.085, 0.12)
                : randomRange(0.06, 0.09),
      T = this._fit(e, s, w);
    T > w * 0.45 &&
      this.decals.add(
        y,
        ur,
        s,
        T,
        i.tint,
        y === "wood" && Math.abs(l) < 0.5 ? randomRange(-0.12, 0.12) : NaN,
      );
  }
  splash(t, e = 1) {
    let s = this.p,
      n = t.x,
      i = t.y,
      a = t.z,
      r = this._lod(n, i, a),
      l = Math.sqrt(e),
      c = zl.water.chip;
    for (let u = 0; u < 2; u++) {
      let d = s.begin();
      ((d.x = n + randomRange(-0.04, 0.04) * e),
        (d.y = i),
        (d.z = a + randomRange(-0.04, 0.04) * e),
        (d.ax = randomRange(-0.08, 0.08)),
        (d.ay = 1),
        (d.az = randomRange(-0.08, 0.08)),
        (d.mode = 2),
        (d.stretch = u ? 3.4 : 2.2),
        (d.book = Ds.SPR.id),
        (d.f0 = Fe.WATERJET),
        (d.lit = 1),
        (d.r = c[0]),
        (d.g = c[1]),
        (d.b = c[2]),
        (d.a = 0.75),
        (d.s0 = 0.06 * l),
        (d.s1 = (u ? 0.2 : 0.34) * l),
        (d.sk = 3),
        (d.life = randomRange(0.36, 0.5) * (0.8 + 0.2 * l)),
        (d.fout = 0.3),
        (d.cls = As.DUST),
        (d.soft = 0.08),
        s.emit());
    }
    let h = this._cnt(8 + 10 * e, r);
    for (let u = 0; u < h; u++) {
      let d = s.begin(),
        m = randomRange(0, nh),
        p = randomRange(0.3, 1.5) * l;
      ((d.x = n + Math.cos(m) * 0.06 * e),
        (d.y = i + 0.03),
        (d.z = a + Math.sin(m) * 0.06 * e),
        (d.vx = Math.cos(m) * p),
        (d.vy = randomRange(1.6, 4.6) * l),
        (d.vz = Math.sin(m) * p),
        (d.life = randomRange(0.45, 0.9)),
        (d.s0 = randomRange(0.012, 0.03)),
        (d.s1 = 0.01),
        (d.r = c[0]),
        (d.g = c[1]),
        (d.b = c[2]),
        (d.a = 0.95),
        (d.book = Ds.SPR.id),
        (d.f0 = Fe.SPARK),
        (d.lit = 1),
        (d.mode = 1),
        (d.stretch = 0.022),
        (d.grav = 9.8),
        (d.fout = 0.6),
        (d.cls = As.CHIP),
        (d.soft = -1),
        (d.floor = i - 0.02),
        (d.bounce = 0),
        s.emit());
    }
    let f = this._puff(
      n,
      i + 0.12 * l,
      a,
      c,
      0.3,
      0.14 * l,
      0.75 * l,
      randomRange(0.5, 0.75),
    );
    ((f.vy = randomRange(0.5, 1.2) * l),
      (f.drag = 2.4),
      (f.grav = 0.6),
      (f.cls = As.DUST),
      s.emit());
    for (let u = 0; u < 2; u++) {
      let d = s.begin();
      ((d.x = n),
        (d.y = i + 0.012),
        (d.z = a),
        (d.mode = 3),
        (d.ay = 1),
        (d.book = Ds.SPR.id),
        (d.f0 = Fe.RIPPLE),
        (d.lit = 1),
        (d.r = c[0]),
        (d.g = c[1]),
        (d.b = c[2]),
        (d.a = 0.55 - u * 0.2),
        (d.s0 = 0.12 * l),
        (d.s1 = (1.5 + u * 0.9) * l),
        (d.sk = 2),
        (d.life = 0.7 + u * 0.35),
        (d.fout = 0.2),
        (d.delay = u * 0.14),
        (d.cls = As.DUST),
        (d.soft = -1),
        (d.rot = randomRange(0, nh)),
        s.emit());
    }
  }
  explosion(t, e) {
    let s = this.p,
      n = t.x,
      i = t.y + 0.2,
      a = t.z,
      r = e === void 0 ? t.y : e,
      l = Math.max(0.5, this._lod(n, i, a)),
      c = this._d || 0;
    (this.glowPuff(n, i + 0.2, a, 6.5, [6, 3.4, 1.3], 0.12),
      this.glowPuff(n, i + 0.2, a, 2.6, [24, 17, 9], 0.075));
    let h = s.begin();
    ((h.x = n),
      (h.y = i + 0.2),
      (h.z = a),
      (h.life = 0.1),
      (h.s0 = 2.4),
      (h.s1 = 6),
      (h.r = 11),
      (h.g = 6.5),
      (h.b = 2.6),
      (h.book = Ds.BIG.id),
      (h.f0 = zd.BURST),
      (h.add = 1),
      (h.fout = 0.15),
      (h.cls = As.FLASH),
      (h.prio = 2),
      (h.soft = 0.4),
      s.emit(),
      (h = s.begin()),
      (h.x = n),
      (h.y = i + 0.2),
      (h.z = a),
      (h.life = 0.14),
      (h.s0 = 4),
      (h.s1 = 7),
      (h.aspect = 2.6),
      (h.rot = 0),
      (h.r = 5),
      (h.g = 3),
      (h.b = 1.4),
      (h.book = Ds.SPR.id),
      (h.f0 = Fe.FLARE),
      (h.add = 1),
      (h.fout = 0.1),
      (h.cls = As.FLASH),
      (h.prio = 2),
      (h.soft = 0.4),
      s.emit());
    let f = this._cnt(6, l);
    for (let p = 0; p < f; p++) {
      let x = randomRange(0, nh),
        g = randomRange(-0.1, 1.2),
        b = p === 0 ? 0 : randomRange(1.4, 3.6);
      ((h = s.begin()),
        (h.x = n + Math.cos(x) * 0.25),
        (h.y = i + randomRange(0, 0.4)),
        (h.z = a + Math.sin(x) * 0.25),
        (h.vx = Math.cos(x) * Math.cos(g) * b),
        (h.vy = Math.sin(g) * b + 1),
        (h.vz = Math.sin(x) * Math.cos(g) * b),
        (h.life = randomRange(2.8, 4.2)),
        (h.s0 = randomRange(1.2, 1.7)),
        (h.s1 = randomRange(3, 4.2)),
        (h.sk = 4),
        (h.rv = randomRange(-0.3, 0.3)),
        (h.aspect = Math.random() < 0.5 ? -1 : 1),
        (h.book = Ds.BLAST.id),
        (h.f0 = randomRange(0, 2.5)),
        (h.f1 = 63),
        (h.fk = 2.4),
        (h.heat = 1.5),
        (h.heat1 = 1.1),
        (h.lit = 1),
        (h.r = 0.06),
        (h.g = 0.055),
        (h.b = 0.05),
        (h.r1 = 0.2),
        (h.g1 = 0.19),
        (h.b1 = 0.18),
        (h.a = 0.97),
        (h.fin = 0),
        (h.fout = 0.55),
        (h.drag = 3),
        (h.grav = -0.55),
        (h.turb = 0.45),
        (h.wind = 0.25),
        (h.cls = As.FIRE),
        (h.prio = 2),
        (h.soft = 0.7),
        (h.ero = 0.45),
        s.emit());
    }
    ((h = s.begin()),
      (h.x = n),
      (h.y = r + 0.06),
      (h.z = a),
      (h.mode = 3),
      (h.ay = 1),
      (h.life = 0.6),
      (h.s0 = 1.2),
      (h.s1 = 10.5),
      (h.sk = 2.4),
      (h.book = Ds.BIG.id),
      (h.f0 = zd.RING),
      (h.lit = 1),
      (h.r = 0.62),
      (h.g = 0.58),
      (h.b = 0.52),
      (h.a = 0.5),
      (h.fout = 0.2),
      (h.cls = As.DUST),
      (h.prio = 2),
      (h.soft = -1),
      s.emit());
    let u = this._cnt(10, l);
    for (let p = 0; p < u; p++) {
      let x = (p / u) * nh + randomRange(-0.2, 0.2),
        g = randomRange(5, 8.5);
      ((h = this._puff(
        n + Math.cos(x) * 0.7,
        r + 0.22,
        a + Math.sin(x) * 0.7,
        [0.52, 0.49, 0.44],
        0.4,
        randomRange(0.45, 0.65),
        randomRange(1.5, 2.2),
        randomRange(1.7, 2.8),
      )),
        (h.vx = Math.cos(x) * g),
        (h.vy = randomRange(0.2, 0.7)),
        (h.vz = Math.sin(x) * g),
        (h.drag = 3),
        (h.grav = 0),
        (h.f0 = randomRange(6, 14)),
        (h.f1 = 58),
        (h.fk = 2),
        (h.cls = As.DUST),
        (h.fin = 0.06),
        (h.ero = 0.75),
        s.emit());
    }
    this.sparks(n, i, a, 0, 0.6, 0, 46, {
      speed: 16,
      life: 2.2,
      floor: r,
    });
    let d = this._cnt(24, l);
    for (let p = 0; p < d; p++) {
      let x = randomRange(0, nh),
        g = randomRange(0.1, 1.4),
        b = randomRange(2, 8);
      ((h = s.begin()),
        (h.x = n),
        (h.y = i),
        (h.z = a),
        (h.vx = Math.cos(x) * Math.cos(g) * b),
        (h.vy = Math.sin(g) * b),
        (h.vz = Math.sin(x) * Math.cos(g) * b),
        (h.life = randomRange(1.4, 3.2)),
        (h.s0 = randomRange(0.018, 0.04)),
        (h.s1 = 0.012),
        (h.r = 10),
        (h.g = 3.6),
        (h.b = 0.7),
        (h.r1 = 2.4),
        (h.g1 = 0.35),
        (h.b1 = 0.04),
        (h.book = Ds.SPR.id),
        (h.f0 = Fe.EMBER),
        (h.add = 1),
        (h.drag = 1.7),
        (h.grav = 1.4),
        (h.turb = 3),
        (h.wind = 0.3),
        (h.fout = 0.6),
        (h.floor = r + 0.02),
        (h.bounce = 0.2),
        (h.cls = As.SPARK),
        (h.soft = -1),
        (h.rv = randomRange(-4, 4)),
        s.emit());
    }
    let m = this._cnt(16, l);
    for (let p = 0; p < m; p++) {
      let x = randomRange(0, nh),
        g = randomRange(0.2, 1.3),
        b = randomRange(5, 12),
        v = randomRange(0.5, 1.3);
      ((h = s.begin()),
        (h.x = n),
        (h.y = i),
        (h.z = a),
        (h.vx = Math.cos(x) * Math.cos(g) * b),
        (h.vy = Math.sin(g) * b),
        (h.vz = Math.sin(x) * Math.cos(g) * b),
        (h.life = randomRange(1.3, 2.4)),
        (h.s0 = randomRange(0.03, 0.09)),
        (h.s1 = h.s0),
        (h.rv = randomRange(-16, 16)),
        (h.r = 0.13 * v),
        (h.g = 0.12 * v),
        (h.b = 0.11 * v),
        (h.book = Ds.SPR.id),
        (h.f0 = Math.random() < 0.5 ? Fe.CHUNK : Fe.CHIP_B),
        (h.lit = 1),
        (h.grav = 9.8),
        (h.drag = 0.25),
        (h.bounce = 0.3),
        (h.floor = r + 0.02),
        (h.fout = 0.8),
        (h.cls = As.CHIP),
        (h.soft = -1),
        s.emit());
    }
    for (let p = 0; p < 5; p++) {
      let x = randomRange(0, nh),
        g = randomRange(0.45, 1.2),
        b = randomRange(7, 12);
      this._task(
        YL,
        randomRange(0.55, 0.85),
        n,
        i,
        a,
        Math.cos(x) * Math.cos(g) * b,
        Math.sin(g) * b,
        Math.sin(x) * Math.cos(g) * b,
        r,
      );
    }
    if (
      (this._task(jL, 1, n, i + 0.5, a, 0, 0, 0, l),
      this._task(ZL, 2.2, n, i + 0.6, a),
      this.world &&
        this.world.raycast(n, i + 0.3, a, 0, 1, 0, 8, sh) &&
        this._task($L, 0.9, n, i + 0.3 + sh.t - 0.05, a, 0, 0, 0, r),
      this._warp(1, n, i + 0.3, a, 1.2, 15, 0.34, 0.03),
      s.push(n, i, a, 7.5, 11),
      this._impulse(n, i + 0.5, a, 7),
      this.decals)
    ) {
      (Go.set(0, 1, 0), Bm.set(n, r, a));
      let p = this._fit(Bm, Go, randomRange(2.7, 3.5)),
        x = !0,
        g = this._sc || (this._sc = new Float32Array(8 * 4));
      for (let b = 0; b < 8; b++) {
        let v = b * 4;
        g[v + 3] &&
          this.clock - g[v + 3] < 200 &&
          Math.hypot(g[v] - n, g[v + 1] - r, g[v + 2] - a) < 1.3 &&
          (x = !1);
      }
      if (p > 0.5 && x) {
        this.decals.add("scorch", ur, Go, p, null, NaN, 220);
        let b = (this._sci = ((this._sci || 0) + 1) & 7) * 4;
        ((g[b] = n),
          (g[b + 1] = r),
          (g[b + 2] = a),
          (g[b + 3] = this.clock + 0.001));
      }
      if (this.world)
        for (let b = 0; b < 4; b++) {
          let v = b === 0 ? 1 : b === 1 ? -1 : 0,
            y = b === 2 ? 1 : b === 3 ? -1 : 0;
          !this.world.raycast(n, i + 0.5, a, v, 0, y, 2.6, sh) ||
            sh.col.water ||
            (Go.set(sh.nx, sh.ny, sh.nz),
            Bm.set(n + v * sh.t, i + 0.5, a + y * sh.t),
            (p = this._fit(Bm, Go, (2.9 - sh.t) * randomRange(0.75, 1))),
            p > 0.4 && this.decals.add("scorch", ur, Go, p, null, NaN, 220));
        }
    }
    if (
      (this.flashLight(Bm.set(n, i + 0.5, a), 16752704, 900, 26, 0.4),
      this.cam && c < 14)
    ) {
      let p =
          !this.world ||
          !this.world.raycast(
            this.cam.position.x,
            this.cam.position.y,
            this.cam.position.z,
            (n - this.cam.position.x) / (c || 1),
            (i - this.cam.position.y) / (c || 1),
            (a - this.cam.position.z) / (c || 1),
            Math.max(0, c - 0.3),
            null,
          ),
        x = saturate(1 - c / 14) * (p ? 1 : 0.35);
      ((this._flash = Math.max(this._flash, x * x * 0.6)),
        (this._concuss = Math.max(
          this._concuss,
          saturate(1.2 - c / 7) * (p ? 1 : 0.5),
        )));
    }
  }
  _dusty(t) {
    return t === "stone" || t === "concrete"
      ? 1
      : t === "plaster"
        ? 0.9
        : t === "wood" || t === "marble" || t === "tile"
          ? 0.38
          : t === "carpet" || t === "fabric"
            ? 0.25
            : t === "metal"
              ? 0.15
              : 0.3;
  }
  footstep(t, e, s = 1, n = !1) {
    if (e === "water") return;
    let i = this._dusty(e) * (n ? 1.5 : 0.8) * Math.min(1.5, s || 1);
    if (i < 0.28 && !n) return;
    let a = (zl[e] || zl.concrete).dust,
      r = i > 0.9 ? 2 : 1;
    for (let l = 0; l < r; l++) {
      let c = this._puff(
        t.x + randomRange(-0.1, 0.1),
        t.y + 0.05,
        t.z + randomRange(-0.1, 0.1),
        a,
        0.085 * i,
        0.12,
        randomRange(0.4, 0.6),
        randomRange(0.7, 1.1),
      );
      ((c.vx = randomRange(-0.5, 0.5)),
        (c.vy = randomRange(0.15, 0.4)),
        (c.vz = randomRange(-0.5, 0.5)),
        (c.drag = 3),
        (c.grav = 0.1),
        (c.floor = t.y + 0.04),
        (c.cls = As.DUST),
        (c.fin = 0.2),
        (c.f0 = 16),
        (c.f1 = 58),
        this.p.emit());
    }
    i > 0.9 && this._grit(t.x, t.y + 0.03, t.z, 0, 0.6, 0, a, 1, 1.6);
  }
  land(t, e, s = 0.5) {
    if (e === "water") return;
    let n = this._dusty(e) * (0.5 + s),
      i = (zl[e] || zl.concrete).dust,
      a = this.p,
      r = a.begin();
    ((r.x = t.x),
      (r.y = t.y + 0.03),
      (r.z = t.z),
      (r.mode = 3),
      (r.ay = 1),
      (r.life = 0.5),
      (r.s0 = 0.4),
      (r.s1 = 1.6 + s * 1.4),
      (r.book = Ds.BIG.id),
      (r.f0 = zd.RING),
      (r.lit = 1),
      (r.r = i[0]),
      (r.g = i[1]),
      (r.b = i[2]),
      (r.a = 0.22 * n),
      (r.fout = 0.15),
      (r.cls = As.DUST),
      (r.soft = -1),
      a.emit());
    let l = 4 + Math.round(s * 5);
    for (let c = 0; c < l; c++) {
      let h = (c / l) * nh + randomRange(-0.3, 0.3),
        f = randomRange(1.4, 2.8) * (0.6 + s);
      ((r = this._puff(
        t.x + Math.cos(h) * 0.2,
        t.y + 0.07,
        t.z + Math.sin(h) * 0.2,
        i,
        0.16 * n,
        0.16,
        randomRange(0.5, 0.8),
        randomRange(0.8, 1.3),
      )),
        (r.vx = Math.cos(h) * f),
        (r.vy = randomRange(0.1, 0.4)),
        (r.vz = Math.sin(h) * f),
        (r.drag = 3.4),
        (r.grav = 0.1),
        (r.floor = t.y + 0.05),
        (r.cls = As.DUST),
        (r.f0 = 14),
        (r.f1 = 58),
        a.emit());
    }
    n > 0.5 && this._grit(t.x, t.y + 0.03, t.z, 0, 0.5, 0, i, 2, 2.2);
  }
  slideDust(t, e, s, n) {
    this._slideAcc += this._dt * 30;
    let i = this._dusty(n),
      a = (zl[n] || zl.concrete).dust;
    for (; this._slideAcc >= 1;) {
      this._slideAcc -= 1;
      let r = randomRange(-0.28, 0.28),
        l = this._puff(
          t.x - e * 0.35 - s * r,
          t.y + 0.06,
          t.z - s * 0.35 + e * r,
          a,
          0.06 + 0.1 * i,
          0.14,
          randomRange(0.5, 0.8),
          randomRange(0.6, 1),
        );
      ((l.vx = e * randomRange(0.6, 1.8) + randomRange(-0.4, 0.4)),
        (l.vy = randomRange(0.15, 0.5)),
        (l.vz = s * randomRange(0.6, 1.8) + randomRange(-0.4, 0.4)),
        (l.drag = 2.6),
        (l.floor = t.y + 0.04),
        (l.cls = As.DUST),
        (l.f0 = 14),
        (l.f1 = 58),
        this.p.emit(),
        Math.random() < 0.5 &&
          this._grit(
            t.x - e * 0.2,
            t.y + 0.03,
            t.z - s * 0.2,
            -s * r * 3 + e * 0.4,
            0.5,
            e * r * 3 + s * 0.4,
            a,
            1,
            2.6,
          ),
        n === "metal" &&
          Math.random() < 0.3 &&
          this.sparks(
            t.x - e * 0.3,
            t.y + 0.03,
            t.z - s * 0.3,
            -e * 0.4,
            0.3,
            -s * 0.4,
            2,
            {
              speed: 4,
              floor: t.y,
            },
          ),
        (n === "carpet" || n === "fabric") &&
          Math.random() < 0.25 &&
          this.chips(t.x, t.y + 0.03, t.z, 0, 0.6, 0, 1, zl.carpet.chip, {
            speed: 1.4,
            sprite: Fe.FIBRE,
            size: 1.6,
            floor: t.y,
          }));
    }
  }
  bodyHit(t, e, s = !1, n = !1) {
    let i = this.p;
    if (this._lod(t.x, t.y, t.z) < 0.35) return;
    let r = n ? [0.3, 0.3, 0.31] : [0.5, 0.47, 0.42],
      l = this._puff(
        t.x + e.x * 0.18,
        t.y + e.y * 0.18,
        t.z + e.z * 0.18,
        r,
        s ? 0.3 : 0.2,
        0.06,
        s ? 0.5 : 0.34,
        randomRange(0.5, 0.8),
      );
    if (
      ((l.vx = e.x * randomRange(1, 2.4) + randomRange(-0.4, 0.4)),
      (l.vy = e.y * randomRange(1, 2) + randomRange(0, 0.5)),
      (l.vz = e.z * randomRange(1, 2.4) + randomRange(-0.4, 0.4)),
      (l.drag = 3.6),
      (l.cls = As.DUST),
      i.emit(),
      n)
    ) {
      this.sparks(t.x, t.y, t.z, -e.x, 0.3, -e.z, 3, {
        speed: 4,
      });
      return;
    }
    (this.chips(
      t.x + e.x * 0.15,
      t.y,
      t.z + e.z * 0.15,
      e.x * 0.6,
      0.4,
      e.z * 0.6,
      s ? 4 : 2,
      zl.fabric.chip,
      {
        speed: 1.8,
        sprite: Fe.FIBRE,
        size: 1.5,
      },
    ),
      s &&
        ((l = this._puff(t.x, t.y, t.z, zl.flesh.dust, 0.34, 0.1, 0.55, 0.55)),
        (l.vx = e.x * 1.6),
        (l.vy = 0.3),
        (l.vz = e.z * 1.6),
        (l.drag = 3.5),
        (l.grav = 0.8),
        (l.cls = As.DUST),
        i.emit()));
  }
  nearMiss(t) {
    ((this._suppress = Math.min(1, this._suppress + 0.34)),
      t &&
        (this._impulse(t.x, t.y, t.z, 1.8),
        this._warp(0, t.x, t.y, t.z, 0.25, 0.7, 0.16, 0.006)));
  }
  playerHurt(t = 20) {
    ((this._hurt = Math.min(1, this._hurt + 0.3 + t / 90)),
      this.gfx && (this.gfx.uniforms.uHurtSeed.value = Math.random() * 40));
  }
  glassBurst(t, e, s = 0.5) {
    let n = this.p,
      i = this._lod(t.x, t.y, t.z),
      a = this._cnt(4 + 8 * s, i);
    for (let r = 0; r < a; r++) {
      let l = n.begin();
      ((l.x = t.x + randomRange(-0.3, 0.3) * s),
        (l.y = t.y + randomRange(-0.3, 0.3) * s),
        (l.z = t.z + randomRange(-0.3, 0.3) * s),
        (l.vx = e.x * randomRange(1, 3)),
        (l.vy = randomRange(-1, 0.5)),
        (l.vz = e.z * randomRange(1, 3)),
        (l.grav = 6),
        (l.life = randomRange(0.08, 0.16)),
        (l.delay = randomRange(0, 0.35)),
        (l.s0 = 0.04),
        (l.s1 = randomRange(0.12, 0.22)),
        (l.r = 2.6),
        (l.g = 2.8),
        (l.b = 3),
        (l.book = Ds.SPR.id),
        (l.f0 = Fe.GLINT),
        (l.add = 1),
        (l.fout = 0.2),
        (l.cls = As.FLASH),
        (l.soft = -1),
        n.emit());
    }
    this._dust(
      t.x,
      t.y,
      t.z,
      e.x,
      0,
      e.z,
      zl.glass.dust,
      this._cnt(1 + 2 * s, i),
      0.4 + 0.5 * s,
      0.14,
      0.9,
      1.6,
    );
  }
  bodyFall(t, e) {
    this.land(t, e, 0.35);
  }
  grenadeBounce(t, e, s = 3) {
    let n = zl[e] || zl.concrete;
    (e === "metal" || n.hard) &&
      Math.random() < (e === "metal" ? 0.8 : 0.3) &&
      this.sparks(t.x, t.y + 0.02, t.z, 0, 0.5, 0, 2 + s * 0.5, {
        speed: 3,
        floor: t.y,
      });
    let i = this._puff(
      t.x,
      t.y + 0.04,
      t.z,
      n.dust,
      0.1 * this._dusty(e) + 0.03,
      0.06,
      0.28,
      0.6,
    );
    ((i.vy = 0.3), (i.cls = As.DUST), this.p.emit());
  }
  heatSource(t, e, s, n = 0.4, i = 1.5, a = 1) {
    if (this._heatN >= 16) return -1;
    let r = this._heatN * 7,
      l = this._heat;
    return (
      (l[r] = t),
      (l[r + 1] = e),
      (l[r + 2] = s),
      (l[r + 3] = n),
      (l[r + 4] = i),
      (l[r + 5] = a),
      (l[r + 6] = Math.random()),
      this._heatN++
    );
  }
  flicker({
    glows: t = [],
    material: e = null,
    base: s = null,
    style: n = "buzz",
    depth: i = 1,
  } = {}) {
    let a = {
      glows: t,
      material: e,
      base: s === null && e ? e.emissiveIntensity : s,
      style: n,
      depth: i,
      k: 1,
      on: !0,
      seed: Math.random() * 100,
      hold: 0,
      v: 1,
    };
    return (this._flickers.push(a), a);
  }
  setWind(t, e) {
    (this.p.wind.set(t, 0, e),
      this.pollen &&
        this.pollen.mat.uniforms.uWind.value.set(t * 0.4, 0, e * 0.4));
  }
  reset() {
    (this.decals && this.decals.clear(),
      this.p.clear(),
      this.distort.clear(),
      this._tt.fill(0),
      this._hx.fill(0),
      this._cx.fill(0),
      (this._suppress = this._hurt = this._flash = this._concuss = 0),
      this._sc && this._sc.fill(0));
  }
  addGlow(t, e, s, n, i, a = 1) {
    return (
      this._glowList.push({
        pos: t.clone(),
        n: e.clone(),
        sx: s,
        sy: n,
        color: new Color(i).multiplyScalar(a),
        k: 1,
      }),
      this._glowList.length - 1
    );
  }
  buildGlows() {
    let t = this._glowList;
    if (!t.length) return;
    let e = createCanvas(128),
      s = e.getContext("2d"),
      n = s.createRadialGradient(64, 64, 0, 64, 64, 64);
    (n.addColorStop(0, "rgba(255,255,255,1)"),
      n.addColorStop(0.35, "rgba(255,255,255,0.42)"),
      n.addColorStop(0.7, "rgba(255,255,255,0.1)"),
      n.addColorStop(1, "rgba(255,255,255,0)"),
      (s.fillStyle = n),
      s.fillRect(0, 0, 128, 128));
    let i = new CanvasTexture(e),
      a = new MeshBasicMaterial({
        map: i,
        transparent: !0,
        blending: AdditiveBlending,
        depthWrite: !1,
        fog: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -3,
        polygonOffsetUnits: -3,
      }),
      r = (this.glows = new InstancedMesh(
        new PlaneGeometry(1, 1),
        a,
        t.length,
      ));
    (t.forEach((l, c) => {
      (qL.setFromUnitVectors($Y, l.n),
        Bm.copy(l.pos).addScaledVector(l.n, 0.012),
        KL.set(l.sx, l.sy, 1),
        XL.compose(Bm, qL, KL),
        r.setMatrixAt(c, XL),
        r.setColorAt(c, l.color));
    }),
      (r.frustumCulled = !1),
      (r.renderOrder = 3),
      this.scene.add(r));
  }
  setGlow(t, e) {
    if (!this.glows || t < 0 || t >= this._glowList.length) return;
    let s = this._glowList[t];
    ((s.k = e),
      Um.copy(s.color).multiplyScalar(e),
      this.glows.setColorAt(t, Um),
      (this.glows.instanceColor.needsUpdate = !0));
  }
  buildShafts(t, e, s = new Color(1, 0.52, 0.2)) {
    let n = GL(t, e, s, this.shared);
    ((this.shaftMat = n.shaftMat),
      (this.moteMat = n.moteMat),
      this.scene.add(n.shaftMesh, n.motePts));
  }
  _tasks(t) {
    let e = this._tt,
      s = this._tk,
      n = this.p;
    for (let i = 0; i < YM; i++) {
      let a = e[i];
      if (!a) continue;
      let r = i * 12,
        l = (s[r] += t),
        c = s[r + 1],
        h = l / c;
      if (a === YL) {
        if (
          ((s[r + 6] -= 9.8 * t),
          (s[r + 2] += s[r + 5] * t),
          (s[r + 3] += s[r + 6] * t),
          (s[r + 4] += s[r + 7] * t),
          s[r + 3] < s[r + 8] + 0.05)
        ) {
          e[i] = 0;
          continue;
        }
        for (s[r + 10] += t * 60; s[r + 10] >= 1;) {
          s[r + 10] -= 1;
          let f = this._puff(
            s[r + 2] + randomRange(-0.05, 0.05),
            s[r + 3] + randomRange(-0.05, 0.05),
            s[r + 4] + randomRange(-0.05, 0.05),
            [0.22, 0.21, 0.2],
            0.26 * (1 - h * 0.6),
            randomRange(0.1, 0.16),
            randomRange(0.34, 0.6),
            randomRange(0.8, 1.5),
          );
          ((f.ero0 = randomRange(0.15, 0.3)),
            (f.ero = 0.9),
            (f.aspect *= randomRange(1, 1.4)),
            (f.vx = s[r + 5] * 0.12 + randomRange(-0.2, 0.2)),
            (f.vy = s[r + 6] * 0.12 + randomRange(0, 0.3)),
            (f.vz = s[r + 7] * 0.12 + randomRange(-0.2, 0.2)),
            (f.drag = 2),
            (f.grav = -0.15),
            (f.f0 = randomRange(10, 24)),
            (f.f1 = 60),
            h < 0.35 &&
              ((f.r1 = f.r),
              (f.g1 = f.g),
              (f.b1 = f.b),
              (f.r = 0.5),
              (f.g = 0.26),
              (f.b = 0.1)),
            n.emit());
        }
        if (Math.random() < t * 40) {
          let f = n.begin();
          ((f.x = s[r + 2]),
            (f.y = s[r + 3]),
            (f.z = s[r + 4]),
            (f.life = 0.12),
            (f.s0 = 0.1 * (1 - h)),
            (f.s1 = 0.03),
            (f.r = 9),
            (f.g = 3.4),
            (f.b = 0.7),
            (f.book = Ds.SPR.id),
            (f.f0 = Fe.EMBER),
            (f.add = 1),
            (f.cls = As.SPARK),
            (f.soft = -1),
            n.emit());
        }
      } else if (a === jL)
        for (s[r + 10] += t * 9 * s[r + 8]; s[r + 10] >= 1;) {
          s[r + 10] -= 1;
          let f = this._puff(
            s[r + 2] + randomRange(-0.7, 0.7),
            s[r + 3] + randomRange(-0.2, 0.8),
            s[r + 4] + randomRange(-0.7, 0.7),
            [0.1, 0.095, 0.09],
            0.78,
            randomRange(1, 1.5),
            randomRange(3, 4.3),
            randomRange(3.8, 6.2),
          );
          ((f.r1 = 0.3),
            (f.g1 = 0.29),
            (f.b1 = 0.28),
            (f.vx = randomRange(-0.5, 0.5)),
            (f.vy = randomRange(1.1, 2.3)),
            (f.vz = randomRange(-0.5, 0.5)),
            (f.drag = 0.85),
            (f.grav = -0.28),
            (f.turb = 0.8),
            (f.wind = 0.35),
            (f.fin = 0.14),
            (f.fout = 0.4),
            (f.f0 = randomRange(0, 10)),
            (f.f1 = 58),
            (f.fk = 1.6),
            (f.soft = 0.9),
            (f.prio = 2),
            (f.ero = 0.45),
            n.emit());
        }
      else if (a === ZL)
        for (s[r + 10] += t * 9; s[r + 10] >= 1;)
          ((s[r + 10] -= 1),
            this._warp(
              0,
              s[r + 2] + randomRange(-0.8, 0.8),
              s[r + 3] + randomRange(-0.3, 0.6),
              s[r + 4] + randomRange(-0.8, 0.8),
              1.4,
              2.8,
              randomRange(0.6, 1),
              0.008 * (1 - h),
              randomRange(0.6, 1.4),
            ));
      else if (a === $L)
        for (s[r + 10] += t * 26; s[r + 10] >= 1;) {
          s[r + 10] -= 1;
          let f = randomRange(0, nh),
            u = randomRange(0.3, 3.4),
            d = s[r + 2] + Math.cos(f) * u,
            m = s[r + 4] + Math.sin(f) * u,
            p = this._puff(
              d,
              s[r + 3],
              m,
              zl.plaster.dust,
              0.26,
              0.12,
              randomRange(0.5, 0.8),
              randomRange(1.3, 2.2),
            );
          if (
            ((p.vy = randomRange(-2.6, -1)),
            (p.drag = 1.3),
            (p.grav = 0.6),
            (p.turb = 0.5),
            (p.cls = As.DUST),
            (p.f0 = 14),
            (p.f1 = 60),
            n.emit(),
            Math.random() < 0.6)
          ) {
            let x = n.begin();
            ((x.x = d),
              (x.y = s[r + 3]),
              (x.z = m),
              (x.vy = randomRange(-1, 0)),
              (x.life = randomRange(0.7, 1.2)),
              (x.s0 = 0.05),
              (x.s1 = 0.12),
              (x.book = Ds.SPR.id),
              (x.f0 = Fe.GRIT),
              (x.lit = 1),
              (x.r = 0.8),
              (x.g = 0.77),
              (x.b = 0.72),
              (x.grav = 7),
              (x.fout = 0.7),
              (x.cls = As.DUST),
              (x.floor = s[r + 8]),
              (x.bounce = 0),
              (x.soft = 0.05),
              n.emit());
          }
        }
      l >= c && (e[i] = 0);
    }
  }
  _heatHaze(t) {
    let e = this._heat,
      s = this.cam.position;
    for (let n = 0; n < this._heatN; n++) {
      let i = n * 7,
        a = e[i] - s.x,
        r = e[i + 2] - s.z;
      if (!(a * a + r * r > 34 * 34))
        for (e[i + 6] += t * 7; e[i + 6] >= 1;) {
          e[i + 6] -= 1;
          let c = e[i + 3],
            h = randomRange(0, nh),
            f = Math.sqrt(Math.random()) * c * 0.7;
          this._warp(
            0,
            e[i] + Math.cos(h) * f,
            e[i + 1] + randomRange(0, 0.25),
            e[i + 2] + Math.sin(h) * f,
            c * 1.5,
            c * 2.6,
            e[i + 4] / 0.75,
            0.0042 * e[i + 5],
            0.75,
          );
        }
    }
  }
  _flick(t) {
    let e = this._flickers,
      s = this.clock;
    for (let n = e.length - 1; n >= 0; n--) {
      let i = e[n],
        a = 1;
      if (!i.on) ((a = 1), e.splice(n, 1));
      else if (i.style === "fire")
        a =
          1 -
          i.depth *
            (0.5 +
              0.3 * Math.sin(s * 9.1 + i.seed) +
              0.2 * Math.sin(s * 23.7 + i.seed * 2)) *
            (0.6 + 0.4 * Math.sin(s * 3.3 + i.seed * 3));
      else {
        if (((i.hold -= t), i.hold <= 0)) {
          let r = i.style === "dying";
          ((i.v = Math.random() < (r ? 0.3 : 0.8) ? 1 : Math.random() * 0.3),
            (i.hold =
              i.v > 0.5
                ? randomRange(0.05, r ? 0.4 : 1.6)
                : randomRange(0.03, r ? 0.9 : 0.14)));
        }
        a =
          1 - i.depth * (1 - i.v) - 0.06 * i.depth * Math.sin(s * 120 + i.seed);
      }
      i.k = a;
      for (let r = 0; r < i.glows.length; r++) this.setGlow(i.glows[r], a);
      i.material &&
        i.base !== null &&
        (i.material.emissiveIntensity = i.base * a);
    }
  }
  _styleCasings() {
    let t = this.physics,
      e = t && t.caseMesh;
    if (!e || e.userData.ghBrass) return;
    e.userData.ghBrass = !0;
    let s = [
      [0, -0.5],
      [0.17, -0.5],
      [0.17, -0.492],
      [0.47, -0.492],
      [0.5, -0.47],
      [0.5, -0.455],
      [0.43, -0.44],
      [0.43, -0.405],
      [0.47, -0.385],
      [0.47, 0.5],
      [0.405, 0.5],
      [0.4, 0.15],
      [0, 0.15],
    ].map((l) => new Vector2(l[0], l[1]));
    for (let l of s) l.x *= 0.5;
    let n = new LatheGeometry(s, 18);
    (n.rotateX(Math.PI / 2),
      n.translate(0, -0.25, 0),
      n.computeVertexNormals());
    let i = e.geometry;
    ((e.geometry = n), i && i.dispose());
    let a = new MeshStandardMaterial({
      color: 16777215,
      metalness: 1,
      roughness: 0.3,
      side: DoubleSide,
    });
    ((a.onBeforeCompile = (l) => {
      ((l.vertexShader = l.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
varying float vGhHead;`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vGhHead = 1.0 - smoothstep(-0.3, -0.22, position.z);`,
        )),
        (l.fragmentShader = l.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
varying float vGhHead;`,
          )
          .replace(
            "#include <color_fragment>",
            `#include <color_fragment>
float ghRed = 1.0 - step(0.3, diffuseColor.g), ghShell = ghRed * (1.0 - vGhHead);
diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.66, 0.27), ghRed * vGhHead);
diffuseColor.rgb *= mix(1.0, 0.5, ghShell);`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
metalnessFactor = mix(metalnessFactor, 0.0, ghShell);`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
roughnessFactor = mix(roughnessFactor, 0.62, ghShell);`,
          )
          .replace(
            "#include <opaque_fragment>",
            `{ float ghM = max(outgoingLight.r, max(outgoingLight.g, outgoingLight.b)); if (ghM > 1.0) outgoingLight *= (1.0 + (ghM - 1.0) / (1.0 + (ghM - 1.0) * 1.1)) / ghM; }
#include <opaque_fragment>`,
          )));
    }),
      (a.customProgramCacheKey = () => "gh-brass-1"));
    let r = e.material;
    ((e.material = a), r && r.dispose && r.dispose());
  }
  update(t, e, s) {
    if (
      ((this._dt = t),
      (this.clock += t),
      (this.time = e),
      !this._charTuned &&
        this.lightVolume &&
        this.match &&
        this.match.bots &&
        this.match.bots.length)
    ) {
      this._charTuned = !0;
      let r = new Set();
      for (let l of this.match.bots)
        for (let c of l.rigs || [])
          c.root.traverse((h) => {
            let f = h.material,
              u = f && !Array.isArray(f) && f.userData && f.userData.fill;
            u &&
              u.value &&
              !r.has(u) &&
              (r.add(u), u.value.multiplyScalar(0.32));
          });
    }
    let n = this.cam || this._dummyCam;
    for (let r = this.emitters.length - 1; r >= 0; r--)
      this.emitters[r](t) === !1 && this.emitters.splice(r, 1);
    t > 0 &&
      (this._tasks(t),
      this.cam && this.gfx.q.distort && this._heatHaze(t),
      this._flickers.length && this._flick(t));
    let i = this.p.uniforms;
    for (let r = 0; r < this.lights.length; r++) {
      let l = this.lights[r];
      if (l.l.intensity > 0) {
        l.t += t;
        let c = 1 - saturate(l.t / l.dur);
        l.l.intensity = l.peak * c * c;
      }
      (i.uLightPos.value[r].set(
        l.l.position.x,
        l.l.position.y,
        l.l.position.z,
        Math.max(1, l.l.distance),
      ),
        i.uLightCol.value[r].copy(l.l.color).multiplyScalar(l.l.intensity));
    }
    let a = this.sun && this.sun.shadow && this.sun.shadow.map;
    if (
      (a
        ? ((i.tShadow.value = a.texture),
          i.uShadowMat.value.copy(this.sun.shadow.matrix),
          (i.uShadowOn.value = 1))
        : (i.uShadowOn.value = 0),
      (i.uTime.value = this.clock),
      this.p.update(t, this.clock, n),
      this.distort.update(t, this.clock, n),
      this.decals && this.decals.update(t),
      (this.shared.uClock.value = this.clock),
      this.shaftMat &&
        ((this.shaftMat.uniforms.uTime.value = e),
        (this.moteMat.uniforms.uTime.value = e),
        (this.moteMat.uniforms.uScale.value = s)),
      this.pollen &&
        ((this.pollen.mat.uniforms.uTime.value = this.clock + e * 0.2),
        (this.pollen.mat.uniforms.uScale.value = s)),
      this.gfx)
    ) {
      let r = this.gfx.uniforms,
        l = t;
      ((this._suppress = Math.max(
        0,
        this._suppress - l * (0.35 + this._suppress * 1.3),
      )),
        (this._hurt = Math.max(0, this._hurt - l * (0.6 + this._hurt * 3.2))),
        (this._flash = Math.max(0, this._flash - l * (0.5 + this._flash * 6))),
        (this._concuss = Math.max(0, this._concuss - l * 0.7)));
      let c = this._suppress;
      ((r.uSuppress.value = c * c * (3 - 2 * c)),
        (r.uHurt.value = this._hurt),
        (r.uFlash.value = this._flash),
        (r.uPeriphery.value = this._concuss * this._concuss * 0.9));
    }
  }
};

export { EffectsSystem };

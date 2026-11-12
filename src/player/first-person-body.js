// player/first-person-body.js: recovered from the verified GOLDEN HOUR release.
import {
  Color,
  DoubleSide,
  FrontSide,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SkinnedMesh,
  Vector3,
  Vector4,
  WebGLRenderTarget,
} from "../vendor/three-r180.js";
import {
  TAU,
  angleDelta,
  clamp,
  damp,
  lerp,
  smoothstep,
} from "../core/math.js";
import {
  AE,
  Ca,
  Pi,
  Qg,
  Sn,
  Ve,
  Yc,
  f2,
  fs,
  h2,
  hp,
  lf,
  mh,
  qr,
  rf,
  u2,
} from "./rig.js";
import { Up, createOperatorRig, is, lB, rB } from "./operator-rig.js";
import { getBuild } from "../weapons/loadout.js";

var o3 = Vector3;
var ri = new o3(0, 1, 0);
var KU = new Matrix4();
var de = () => new o3();
var ea = (o) => ((o = o < 0 ? 0 : o > 1 ? 1 : o), o * o * (3 - 2 * o));
var XU = (o) => o - Math.floor(o);
var n3 = (o, t, e, s, n) => (o ? e : damp(t, e, s, n));
var Jl = (o, t, e) => {
  let s = t * 3;
  ((o[s] = e.x), (o[s + 1] = e.y), (o[s + 2] = e.z));
};
var V7 = (o, t, e) => o.value.set(t.r * e, t.g * e, t.b * e);
var G7 = {
  backStand: 0.2,
  backKneel: 0.36,
  backCrouchMove: 0.5,
  neckLevel: 0.115,
  neckDown: 0.285,
  neckDrop: 0.158,
  proneBack: 0.4,
  supineBack: 0.1,
  supineDown: -0.17,
  sideBack: 0.14,
  safe: 0.15,
};
var OC = 0.24;
var NC = 0.3;
var W7 = 0.955;
var q7 = 0.27;
var od = h2 + f2 - 0.014;
var YU = () => ({
  mode: 0,
  plant: de(),
  dir: new o3(0, 0, -1),
  pitch: 0,
  toe: 0,
  ankle: de(),
  off: de(),
  u0: 0,
  pitchOff: 0,
  dir0: new o3(0, 0, -1),
  gy0: 0,
  from: de(),
  to: de(),
  fromPitch: 0,
  t: 1,
  dur: 0.2,
  lift: 0.06,
  k0: 0,
  pitch0: 0,
  rel: de(),
  prevA: de(),
  bo: de(),
  pEnd: 1,
  blendT: 0,
  blendFrom: de(),
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
  k: 0,
  lp: de(),
  lPlanted: !1,
  lHome: de(),
  lFrom: de(),
  lT: 1,
  mh: de(),
  mb: de(),
  mOk: !1,
});
var K7 = () => ({
  P: de(),
  N: de(),
  sh: de(),
  hip: de(),
  A: [de(), de()],
  Kp: [de(), de()],
  fF: [de(), de()],
  fU: [de(), de()],
  toe: [0, 0],
  pole: de(),
});
var $U = ["P", "N", "sh", "hip", "pole"];
function Ss0(o) {
  for (let t of $U) o[t].set(0, 0, 0);
  for (let t = 0; t < 2; t++)
    (o.A[t].set(0, 0, 0),
      o.Kp[t].set(0, 0, 0),
      o.fF[t].set(0, 0, 0),
      o.fU[t].set(0, 0, 0),
      (o.toe[t] = 0));
}
function BC(o, t, e) {
  for (let s of $U) o[s].addScaledVector(t[s], e);
  for (let s = 0; s < 2; s++)
    (o.A[s].addScaledVector(t.A[s], e),
      o.Kp[s].addScaledVector(t.Kp[s], e),
      o.fF[s].addScaledVector(t.fF[s], e),
      o.fU[s].addScaledVector(t.fU[s], e),
      (o.toe[s] += t.toe[s] * e));
}
var oe = {
  F: de(),
  R: de(),
  pf: de(),
  pr: de(),
  vd: de(),
  lat: de(),
  home: de(),
  base: de(),
  dirT: de(),
  a0: de(),
  a1: de(),
  v0: de(),
  v1: de(),
  v2: de(),
  v3: de(),
  C: de(),
  cd: de(),
  nd: de(),
  sh: de(),
  hip: de(),
  mid: de(),
  SL: de(),
  SR: de(),
  HL: de(),
  HR: de(),
  kL: de(),
  kR: de(),
  fL: de(),
  fR: de(),
  eL: de(),
  eR: de(),
  hL: de(),
  hR: de(),
  Fc: de(),
  Rv: de(),
  ba: de(),
  ld: de(),
  lr: de(),
  d: de(),
  heel: de(),
  ball: de(),
  pole: de(),
};
var tl = [0, 0];
var xv = [0, 0, 0];
var jU = new Matrix4();
var _s0 = [Ve.pelvis, Ve.spine, Ve.chest, Ve.neck];
var UC = new MeshBasicMaterial({
  colorWrite: !1,
  depthWrite: !1,
});
var FirstPersonBody = class {
  constructor(context) {
    ((this.ctx = context),
      (this.player = context.player),
      (this.world = context.world),
      (this.enabled = !0));
    let e = (r, l, c) => context.world.groundAt(r, l, c),
      s = (this.op = createOperatorRig({
        team: this.player.team || 0,
        ground: e,
        gunFactory: (r) =>
          context.buildGun(r, {
            detail: "world",
            build: getBuild(r),
          }),
      }));
    s.root.name = "fpbody";
    let n = lB(s.team);
    ((this.view = s.body),
      (this.view.geometry = n.view),
      (this.view.name = "fpbody-view"),
      (this.view.castShadow = !0),
      (this.view.receiveShadow = !0),
      (this.view.frustumCulled = !1),
      (this.rest = new SkinnedMesh(n.rest, UC)),
      (this.rest.name = "fpbody-rest"),
      (this.rest.castShadow = !0),
      (this.rest.receiveShadow = !0),
      (this.rest.frustumCulled = !1),
      (this.rest.matrixAutoUpdate = !1),
      this.rest.bind(s.body.skeleton, KU),
      this.rest.layers.set(1),
      s.root.add(this.rest),
      (this.solid = s.body.material),
      (this.fpMat = rB(s.team)),
      (this.sunK = 0.62),
      (s.root.visible = !1),
      context.scene.add(s.root),
      (this.gunMeshes = []),
      (this.gunKey = ""),
      (this.pud = new Mesh(
        new PlaneGeometry(2.6, 2.6).rotateX(-Math.PI / 2),
        new ShaderMaterial({
          transparent: !0,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -2,
          polygonOffsetUnits: -6,
          uniforms: {
            uS: {
              value: [
                new Vector4(),
                new Vector4(),
                new Vector4(),
                new Vector4(),
              ],
            },
            uL: {
              value: new o3(0, 1, 0),
            },
            uK: {
              value: 0,
            },
            uLk: {
              value: 0,
            },
          },
          vertexShader:
            "varying vec3 vW; varying vec2 vC; void main(){ vC = uv * 2.0 - 1.0; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",
          fragmentShader: `uniform vec4 uS[4]; uniform vec3 uL; uniform float uK, uLk; varying vec3 vW; varying vec2 vC;
        float occ(vec4 s) {
          vec3 d = s.xyz - vW; float l = max(length(d), 1e-3);
          float amb = clamp(s.w * s.w / (l * l), 0.0, 1.0) * clamp(d.y / l + 0.3, 0.0, 1.0);
          float t = max(dot(d, uL), 0.0), dd = length(d - uL * t), pen = s.w * 0.3 + t * 0.6;
          float dir = (1.0 - smoothstep(s.w - pen * 0.5, s.w + pen, dd)) * (1.0 - smoothstep(0.5, 2.4, t));
          return clamp(amb * 0.7 + dir * 0.42 * uLk, 0.0, 1.0);
        }
        void main() {
          float o = 0.0; for (int i = 0; i < 4; i++) o += occ(uS[i]) * (1.0 - o);
          float a = clamp(o, 0.0, 0.62) * uK * (1.0 - smoothstep(0.7, 1.0, length(vC)));
          if (a < 0.004) discard;
          gl_FragColor = vec4(0.0, 0.0, 0.0, a);
        }`,
        }),
      )),
      (this.pud.name = "fpbody-ground"),
      (this.pud.frustumCulled = !1),
      this.pud.layers.set(1),
      (this.pud.renderOrder = 2),
      (this.pud.visible = !1),
      context.scene.add(this.pud),
      (this.pudK = 0),
      (this.shade = 1),
      (this.shown = 0),
      (this.mirrored = !1));
    let i = context.gfx,
      a = i && i.preRender;
    (i &&
      (i.preRender = (r) => {
        this._mirror(!0);
        try {
          a && a(r);
        } finally {
          this._mirror(!1);
        }
      }),
      (this.feet = [YU(), YU()]),
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
      }),
      (this.rU = K7()),
      (this.rL = K7()),
      (this.rS = K7()),
      (this.rO = K7()),
      (this.root = de()),
      (this._prev = de()),
      (this.vel = de()),
      (this.acc = de()),
      (this._pvd = new o3(0, 0, -1)),
      (this.b = new o3(0, 0, -1)),
      (this.bw = 0),
      (this._os = {
        pos: de(),
        yaw: 0,
        pitch: 0,
        speed: 0,
        moveX: 0,
        moveZ: 0,
        stance: "stand",
        sprint: !1,
        airborne: !1,
        reloading: !1,
        reloadDur: 2.2,
        engage: !0,
        dead: !1,
        axis: null,
      }),
      (this.ub = {
        N: de(),
        H: de(),
        E: [de(), de()],
        Hd: [de(), de()],
        hp: [de(), de()],
        mag: de(),
        gun: de(),
        ok: !1,
      }),
      (this.metrics = {
        on: !1,
        max: 0,
        sum: 0,
        n: 0,
        minDist: 9,
        reset() {
          ((this.max = 0), (this.sum = 0), (this.n = 0), (this.minDist = 9));
        },
      }),
      (this.snap = !1),
      this.reset());
  }
  reset() {
    ((this._live = !1),
      (this.time = 0),
      (this.wC = 0),
      (this.wL = 0),
      (this.wS = 0),
      (this.wM = 0),
      (this.wSprint = 0),
      (this.wAir = 0),
      (this.wMove = 0),
      (this.wWater = 0),
      (this.wADS = 0),
      (this.phase = 0),
      (this.gaitOn = !1),
      (this.stepCool = 0),
      (this.off = OC),
      (this.back = !1),
      (this._airT = 0),
      (this._wasAir = !1),
      (this._peak = 0),
      (this._lastPhase = 0),
      (this.drop = 0),
      (this._shift = 0),
      (this.bw = 0),
      (this._wasLying = !1),
      (this._hurt = 0),
      (this._sf = 9),
      (this._thr = !1),
      (this.fl = {
        x: 0,
        vx: 0,
        z: 0,
        vz: 0,
        t: 0,
        vt: 0,
        d: 0,
        vd: 0,
      }),
      (this.lcyc = 0),
      (this.mEdge = -1),
      (this._mant = null),
      (this.wPin = 0),
      (this.ub.ok = !1),
      this.op && this.op.reset());
    for (let t of this.feet) t.mOk = !1;
  }
  _weapon(t) {
    let e = t && t.def && t.def.id;
    if (!e) return;
    let s = this.ctx.vm ? this.ctx.vm.gun : e;
    (s === this._vg && e === this.gunKey) ||
      ((this._vg = s),
      (this.gunKey = e),
      this.op.setWeapon(e),
      (this.gunMeshes.length = 0),
      this.op.gun &&
        this.op.gun.root.traverse((n) => {
          n.isMesh &&
            ((n.castShadow = !0),
            (n.receiveShadow = !1),
            (n.frustumCulled = !1),
            n.layers.set(1),
            this.gunMeshes.push({
              mesh: n,
              mat: n.material,
            }));
        }),
      this._apply(this.shown, !0));
  }
  _apply(t, e) {
    if (t === this._applied && !e) return;
    ((this._applied = t), (this.op.root.visible = t > 0));
    let s = t === 2;
    ((this.rest.material = s ? this.solid : UC),
      (this.view.material = s ? this.solid : this.fpMat),
      this.view.geometry.setDrawRange(
        0,
        s ? 1 / 0 : this.view.geometry.userData.core,
      ));
    for (let n of this.gunMeshes) n.mesh.material = s ? n.mat : UC;
  }
  _show(t) {
    ((this.shown = t), this.mirrored || this._apply(t));
  }
  _mirror(t) {
    ((this.mirrored = t),
      this.shown === 1 && this._apply(t ? 2 : 1),
      t
        ? ((this._pv = this.pud.visible), (this.pud.visible = !1))
        : (this.pud.visible = !!this._pv));
  }
  _light() {
    let t = this.ctx.vm && this.ctx.vm.light;
    t &&
      (V7(Up.fill, t.fill.color, t.fill.intensity),
      V7(Up.rim, t.rim.color, t.rim.intensity),
      V7(Up.sky, t.hemi.color, t.hemi.intensity),
      V7(Up.gnd, t.hemi.groundColor, t.hemi.intensity),
      (Up.sun.value = this.sunK));
  }
  _gy(t, e, s) {
    let n = this.world.groundAt(t, e, s + 0.5);
    return n > s - 0.7 && n < s + 0.52 ? n : s;
  }
  update(t, e) {
    let s = this.player,
      n = (this.ars = e.arsenal);
    if (!(
      this.enabled &&
      s.alive &&
      (e.state === "playing" || e.state === "paused" || e.state === "over")
    )) {
      (this._show(0), (this._live = !1), (this.pud.visible = !1));
      return;
    }
    (this._weapon(n),
      this._show(e.freeCam ? 2 : 1),
      this.rest.layers.set(e.freeCam ? 0 : 1),
      this._light(),
      (t = Math.min(t, 0.05)));
    let a = t > 1e-6,
      r = s.e,
      l = s.eye;
    this.time += t;
    let c = s.yaw,
      h = (this._pitch = clamp(
        s.pitch + (s.recoilPitch || 0) + (s.tiltPitch || 0),
        -1.5,
        1.5,
      )),
      f = Math.sin(c),
      u = Math.cos(c),
      d = oe.F.set(-f, 0, -u),
      m = oe.R.set(u, 0, -f),
      p = this.snap,
      x = s.mode,
      g = s.stance,
      b =
        x === "dive" || x === "bellyslide" || (x === "normal" && g === "prone"),
      v = x === "slide",
      y = x === "mantle" && !!s.mantle,
      M = !b && !v;
    ((this.wL = n3(p, this.wL, b ? 1 : 0, x === "dive" ? 16 : 9, t)),
      (this.wS = n3(p, this.wS, v ? 1 : 0, 13, t)),
      (this.wM = n3(p, this.wM, y ? 1 : 0, y ? 18 : 9, t)));
    let w = this.wL,
      T = this.wS;
    {
      let F = w + T;
      F > 1 && ((w /= F), (T /= F));
    }
    let S = 1 - w - T,
      E = (this.wC = n3(p, this.wC, g === "crouch" && M ? 1 : 0, 11, t));
    ((this.wWater = n3(p, this.wWater, s.inWater ? 1 : 0, 6, t)),
      (this.wADS = s.adsK || 0));
    let _ = G7,
      R = smoothstep(0.4, 1.4, s.speed),
      C = lerp(_.backStand, lerp(_.backKneel, _.backCrouchMove, R), E),
      L = this.root.set(r.x - d.x * C, r.y, r.z - d.z * C);
    ((!this._live || L.distanceToSquared(this._prev) > 2.25) &&
      this._teleport(d, m, b),
      this._flinch(t, a, d));
    let A = this.vel;
    if (a) {
      let F = (L.x - this._prev.x) / t,
        P = (L.z - this._prev.z) / t,
        z = A.x,
        k = A.z,
        I = 1 - Math.exp(-22 * t);
      ((A.x += (F - A.x) * I), (A.z += (P - A.z) * I));
      let G = 1 - Math.exp(-7 * t);
      ((this.acc.x += (clamp((A.x - z) / t, -30, 30) - this.acc.x) * G),
        (this.acc.z += (clamp((A.z - k) / t, -30, 30) - this.acc.z) * G),
        this._prev.copy(L));
    }
    let O = Math.hypot(A.x, A.z);
    this._peak = Math.max(O, damp(this._peak, O, 6, t));
    let H = this.rO;
    (Ss0(H),
      S > 0.001 &&
        (this._upWas || this._reseat(d, m, E),
        this._upright(t, a, d, m, h, E, O, M, S),
        BC(H, this.rU, S)),
      (this._upWas = S > 0.001),
      T > 0.001 && (this._slide(t, d, m), BC(H, this.rS, T)),
      (w > 0.001 || b) &&
        (this._lying(t, a, d, m, b), w > 0.001 && BC(H, this.rL, w)),
      (this._wasLying = b),
      this._upper(t, a, c, h, b, v),
      this._resolve(t, a, d, m, h, S, w, T));
  }
  _teleport(t, e, s) {
    let n = this.player,
      i = n.e,
      a = this.root;
    (this._prev.copy(a),
      this.vel.set(n.vel.x, 0, n.vel.z),
      this.acc.set(0, 0, 0),
      (this.gaitOn = !1),
      (this.back = !1),
      (this.off = OC),
      (this.drop = 0),
      (this._shift = 0));
    let r = Math.cos(this.off),
      l = Math.sin(this.off);
    (oe.pf.copy(t).multiplyScalar(r).addScaledVector(e, l),
      oe.pr.copy(e).multiplyScalar(r).addScaledVector(t, -l));
    let c = n.stance === "crouch" ? 1 : 0;
    for (let h = 0; h < 2; h++) {
      let f = this.feet[h];
      (this._homeFoot(h, a, oe.pf, oe.pr, c, f.plant),
        (f.plant.y = this._gy(f.plant.x, f.plant.z, i.y)),
        f.dir.copy(oe.pf),
        (f.mode = 0),
        (f.pitch = 0),
        (f.toe = 0),
        (f.t = 1),
        (f.pEnd = 1),
        (f.blendT = 0),
        (f.mOk = !1),
        (f.lPlanted = !1),
        (f.lT = 1),
        f.ankle.copy(f.plant),
        (f.ankle.y += Sn),
        f.prevA.copy(f.ankle));
    }
    (this.b.copy(n.supine ? oe.v0.copy(t).multiplyScalar(-1) : t),
      (this.bw = 0),
      (this.wC = c),
      (this.wL = s ? 1 : 0),
      (this.wS = n.mode === "slide" ? 1 : 0),
      (this.wM = 0),
      this.op.reset(),
      (this.ub.ok = !1),
      (this._live = !0),
      (this._upWas = !0));
  }
  _reseat(t, e, s) {
    let n = Math.cos(this.off),
      i = Math.sin(this.off);
    (oe.pf.copy(t).multiplyScalar(n).addScaledVector(e, i),
      oe.pr.copy(e).multiplyScalar(n).addScaledVector(t, -i));
    for (let a = 0; a < 2; a++) {
      let r = this.feet[a];
      (this._homeFoot(a, this.root, oe.pf, oe.pr, s, r.plant),
        (r.plant.y = this._gy(r.plant.x, r.plant.z, this.player.e.y)),
        r.dir.copy(oe.pf),
        (r.mode = 0),
        (r.pitch = 0),
        (r.toe = 0),
        (r.t = 1),
        (r.pEnd = 1),
        (r.blendT = 0),
        (r.force = !1),
        r.ankle.copy(r.plant),
        (r.ankle.y += Sn),
        r.prevA.copy(r.ankle));
    }
    ((this.gaitOn = !1), (this.drop = 0), (this._wasAir = !1));
  }
  _flinch(t, e, s) {
    let n = this.player,
      i = this.fl,
      a = (n.ev && n.ev.hurt) | 0;
    if (a !== this._hurt) {
      this._hurt = a;
      let l = clamp((n.hurtAmt || 20) / 30, 0.35, 1.6) * 3.2,
        c = -s.x,
        h = -s.z,
        f = n.hurtFrom;
      if (f) {
        let u = n.pos.x - f.x,
          d = n.pos.z - f.z,
          m = Math.hypot(u, d);
        m > 0.05 && ((c = u / m), (h = d / m));
      }
      ((i.vx += c * l),
        (i.vz += h * l),
        (i.vt += (Math.random() < 0.5 ? -1 : 1) * l * 0.5),
        (i.vd -= 0.5 * l));
    }
    if (!e) return;
    let r = -i.x * 260 - i.vx * 17;
    ((i.vx += r * t),
      (i.x = clamp(i.x + i.vx * t, -0.22, 0.22)),
      (r = -i.z * 260 - i.vz * 17),
      (i.vz += r * t),
      (i.z = clamp(i.z + i.vz * t, -0.22, 0.22)),
      (r = -i.t * 240 - i.vt * 16),
      (i.vt += r * t),
      (i.t = clamp(i.t + i.vt * t, -0.3, 0.3)),
      (r = -i.d * 200 - i.vd * 18),
      (i.vd += r * t),
      (i.d = clamp(i.d + i.vd * t, -0.08, 0.02)));
  }
  _homeFoot(t, e, s, n, i, a) {
    let r = t ? 1 : -1,
      l = t ? lerp(-0.12, -0.09, i) : lerp(0.13, 0.31, i);
    return a
      .copy(e)
      .addScaledVector(n, r * lerp(0.15, t ? 0.16 : 0.21, i))
      .addScaledVector(s, l);
  }
  _gaitParams(t, e, s, n, i, a, r) {
    let l = this.g,
      c = is.tab(is.G_V, is.G_DUTY, t),
      h;
    (a > 0
      ? (h = a)
      : ((h = is.tab(is.G_V, is.G_FREQ, t) * (1 + 0.26 * n + 0.45 * i)),
        e > 0.001 && (h *= 1 + 0.1 * e)),
      e > 0.001 && (c = lerp(c, Math.max(c, 0.5), e)));
    let f = lerp(0.72, 0.58, e) * (1 - 0.2 * n - 0.22 * i) * (1 - 0.12 * r);
    (t > 0.2 && (c = Math.min(c, (f * h) / t)),
      (c = clamp(c, 0.12, 0.7)),
      (l.duty = c),
      (l.f = h),
      (l.Lc = (t * c) / h),
      (l.dsw = (t * (1 - c)) / h),
      (l.rk = smoothstep(0.53, 0.4, c)),
      (l.moveK = smoothstep(0.3, 1.2, t)));
    let u = (1 - 0.4 * e) * (1 - 0.4 * n) * (1 - 0.25 * r);
    return (
      (l.xl =
        l.Lc * (is.tab(is.S_V, is.S_KL, t) + 0.25 * n + 0.12 * i + 0.08 * e)),
      (l.thHS = is.tab(is.S_V, is.S_TH, t) * l.moveK),
      (l.phO = is.tab(is.S_V, is.S_PH, t) * l.moveK * (1 - 0.25 * e)),
      (l.k1 = lerp(0.2, 0.14, l.rk)),
      (l.k2 = lerp(0.52, 0.34, l.rk)),
      (l.ya = is.tab(is.S_V, is.S_YA, t) * u + 0.05 * s),
      (l.yb = is.tab(is.S_V, is.S_YB, t) * u + 0.04 * s),
      (l.yc = is.tab(is.S_V, is.S_YC, t) * u),
      (l.re = is.tab(is.S_V, is.S_RE, t) * (1 - 0.6 * n)),
      (l.xa = is.tab(is.S_V, is.S_XA, t)),
      (l.xb = is.tab(is.S_V, is.S_XB, t)),
      l
    );
  }
  _stPitch(t, e) {
    let s = this.g,
      n = e > 0 ? e : 0,
      i = e < 0 ? -e : 0,
      a = s.thHS * n - 0.24 * i * s.moveK;
    return t < s.k1
      ? a * (1 - ea(t / s.k1))
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
    is.rock(r, tl);
    let f = tl[0],
      u = tl[1];
    is.rock(l, tl);
    let d = tl[0],
      m = tl[1];
    is.rock(c, tl);
    let p = tl[0],
      x = tl[1];
    is.rock(h, tl);
    let g = tl[0],
      b = tl[1],
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
      (s[0] = is.herm5(t.X, t.mx0, t.mx1, e, 0)),
      (s[1] = is.herm5(t.Y, t.my0, t.my1, e)),
      (s[2] = is.herm5(t.Pk, 0, 0, e)),
      s
    );
  }
  _upright(t, e, s, n, i, a, r, l, c) {
    let h = this.player,
      f = h.e,
      u = this.root,
      d = this.feet,
      m = this.rU,
      p = this.vel,
      x = G7,
      g = h.eye,
      b = this.snap,
      v = !f.onGround && l && h.mode !== "mantle",
      y = (this.wAir = n3(b, this.wAir, v ? 1 : 0, v ? 14 : 18, t)),
      M = (this.wSprint = n3(
        b,
        this.wSprint,
        h.sprinting && r > 2.5 ? 1 : 0,
        8,
        t,
      )),
      w = this.wWater,
      T = p.x * s.x + p.z * s.z,
      S = p.x * n.x + p.z * n.z,
      E = (this.wMove = smoothstep(0.4, 1.4, r)),
      _ = smoothstep(2, 4, r),
      R = OC * (1 - M) * (1 - 0.5 * a);
    if (r > 0.5) {
      let u0 = Math.atan2(S, T),
        w0 = Math.abs(u0);
      this.back ? w0 < 1.75 && (this.back = !1) : w0 > 2.05 && (this.back = !0);
      let P0 = lerp(0.85, 1.2, _),
        st = this.back
          ? clamp(angleDelta(Math.PI, u0), -0.8, 0.8)
          : clamp(u0, -P0, P0);
      R = lerp(R, st, E);
    } else this.back = !1;
    if (e) {
      let u0 = angleDelta(this.off, R);
      this.off += u0 * (1 - Math.exp(-9 * t));
    }
    let C = Math.cos(this.off),
      L = Math.sin(this.off),
      A = oe.pf.copy(s).multiplyScalar(C).addScaledVector(n, L),
      O = oe.pr.copy(n).multiplyScalar(C).addScaledVector(s, -L),
      H = oe.vd;
    r > 0.05 ? H.set(p.x / r, 0, p.z / r) : H.copy(A);
    let F = oe.lat.set(-H.z, 0, H.x),
      P = this.back ? E : 0,
      z = E * (1 - Math.abs(A.dot(H))),
      k = f.onGround && h.mode === "normal" && h.speed > 0.6 && l,
      I = this._gaitParams(
        r,
        a,
        M,
        P,
        z,
        k ? (1.75 + 0.27 * h.speed) * 0.5 : 0,
        w,
      ),
      G = I.duty,
      K = c > 0.5 && !v && h.mode !== "mantle";
    if (v && !this._wasAir) {
      for (let u0 = 0; u0 < 2; u0++) {
        let w0 = d[u0];
        (w0.rel.subVectors(w0.ankle, u), (w0.mode = 0));
      }
      ((this.gaitOn = !1), (this._airT = 0));
    }
    if ((v && (this._airT += t), !v && this._wasAir))
      for (let u0 = 0; u0 < 2; u0++) {
        let w0 = d[u0],
          P0 = this._gy(w0.ankle.x, w0.ankle.z, u.y);
        ((w0.mode = 3),
          w0.from.copy(w0.ankle),
          (w0.fromPitch = w0.pitch),
          (w0.t = 0),
          (w0.dur = 0.07),
          (w0.lift = 0),
          w0.bo.set(0, 0, 0),
          w0.to.set(w0.ankle.x, P0 + Sn, w0.ankle.z),
          w0.plant.set(w0.ankle.x, P0, w0.ankle.z));
      }
    this._wasAir = v;
    let $ = this.gaitOn,
      n0 = this._pvd.dot(H) < 0.9;
    if ((this._pvd.copy(H), K && r > (this.gaitOn ? 0.3 : 0.5))) {
      let u0;
      if (k) u0 = XU(h.stepPhase * 0.5 + 0.5);
      else if (this.gaitOn) u0 = (this.phase + I.f * t) % 1;
      else {
        let w0 = (d[0].ankle.x - u.x) * H.x + (d[0].ankle.z - u.z) * H.z,
          P0 = (d[1].ankle.x - u.x) * H.x + (d[1].ankle.z - u.z) * H.z;
        u0 = w0 < P0 ? (0.25 * G + 0.5) % 1 : 0.25 * G;
      }
      if (!this.gaitOn) n0 = !0;
      else {
        let w0 = u0 - this.phase - I.f * t;
        ((w0 -= Math.round(w0)), Math.abs(w0) > 0.04 && (n0 = !0));
      }
      ((this.phase = u0), (this.gaitOn = !0));
    } else this.gaitOn = !1;
    this.stepCool -= t;
    let e0 = lerp(0.14, 0.05, E),
      p0 = O.dot(F),
      t0 = O.dot(H),
      M0 = lerp(0.105, 0.072, I.rk),
      f0 = (p0 < 0 ? -1 : 1) * Math.max(Math.abs(p0), 0.068 / M0),
      _0 = oe.home,
      F0 = oe.base,
      m0 = oe.dirT,
      S0 = 0.1 * a;
    for (let u0 = 0; u0 < 2; u0++) {
      let w0 = d[u0],
        P0 = d[1 - u0],
        st = u0 ? 1 : -1;
      {
        let k0 = Math.cos(e0 * st),
          O0 = Math.sin(e0 * st);
        m0.copy(A).multiplyScalar(k0).addScaledVector(O, O0);
      }
      (this._homeFoot(u0, u, A, O, a, _0),
        (_0.y = this._gy(_0.x, _0.z, u.y)),
        (w0.stance = !1));
      let J0 = w0.ankle.x,
        q0 = w0.ankle.y,
        v0 = w0.ankle.z;
      if (!K) {
        if (v) {
          let k0 = h.vel.y,
            O0 = smoothstep(-2.5, 1.5, k0),
            B0 = 1 - ea(this._airT / 0.15),
            ot = u0 === 0;
          (oe.a0
            .copy(O)
            .multiplyScalar(st * 0.11)
            .addScaledVector(
              A,
              ot ? lerp(0.12, 0.24, O0) : lerp(-0.04, -0.2, O0),
            ),
            (oe.a0.y = Sn + (ot ? lerp(0.07, 0.36, O0) : lerp(0.05, 0.28, O0))),
            (oe.a0.y = lerp(oe.a0.y, Sn + 0.03, B0)),
            oe.a0.addScaledVector(A, -0.12 * B0 * (ot ? 0.5 : 1)),
            w0.rel.lerp(oe.a0, 1 - Math.exp(-(12 + 10 * B0) * t)),
            w0.ankle.copy(u).add(w0.rel));
          let Q0 = this.world.groundAt(w0.ankle.x, w0.ankle.z, u.y + 0.6);
          (w0.ankle.y < Q0 + Sn && (w0.ankle.y = Q0 + Sn),
            (w0.pitch = damp(
              w0.pitch,
              lerp(lerp(-0.1, -0.55, O0), -0.95, B0),
              14,
              t,
            )),
            (w0.toe = 0),
            w0.dir.lerp(m0, 1 - Math.exp(-10 * t)),
            is.safeNorm(w0.dir, m0));
        } else
          h.mode === "mantle"
            ? ((w0.mode = 0), (w0.t = 1))
            : (w0.plant.copy(_0),
              w0.dir.copy(A),
              (w0.mode = 0),
              (w0.pitch = 0),
              (w0.toe = 0),
              (w0.t = 1),
              w0.ankle.copy(_0),
              (w0.ankle.y += Sn));
        w0.prevA.set(J0, q0, v0);
        continue;
      }
      let x0 = (this.phase + u0 * 0.5) % 1,
        C0 = w0.mode === 3;
      if (this.gaitOn && !(C0 && x0 < G)) {
        let k0 = m0.dot(H),
          O0 = m0.dot(F);
        F0.copy(u)
          .addScaledVector(F, st * M0 * f0)
          .addScaledVector(H, st * Pi * t0 + S0 * (this.back ? -1 : 1));
        let B0 = Math.min(G, w0.pEnd);
        if (x0 < B0) {
          let ot = x0 / G;
          if (w0.mode !== 1) {
            if (w0.mode === 2) {
              (w0.blendFrom.copy(w0.ankle),
                w0.plant.copy(F0).addScaledVector(H, I.xl - I.Lc * ot),
                (w0.plant.y = this._gy(w0.plant.x, w0.plant.z, u.y)),
                w0.dir.copy(m0));
              let nt = w0.blendFrom.x - w0.plant.x,
                L0 = w0.blendFrom.z - w0.plant.z;
              w0.blendT = nt * nt + L0 * L0 > 0.0144 ? 0.07 : 0;
            }
            ((w0.mode = 1),
              (w0.k0 = ot),
              (w0.pitch0 = w0.pitch),
              (w0.pEnd = 1));
          }
          let Q0 = this._stPitch(ot, w0.dir.dot(H));
          (w0.k0 > 0.02 &&
            (Q0 = lerp(
              w0.pitch0,
              Q0,
              ea(((ot - w0.k0) / Math.max(1 - w0.k0, 0.05)) * 3),
            )),
            (w0.pitch = Q0),
            (w0.toe = Q0 < 0 ? Math.min(-Q0, 0.95) : 0),
            (w0.k = ot),
            is.rock(Q0, tl),
            w0.ankle.copy(w0.plant).addScaledVector(w0.dir, tl[0]),
            (w0.ankle.y += tl[1]),
            (w0.stance = w0.blendT <= 0),
            w0.blendT > 0 &&
              (w0.ankle.lerp(w0.blendFrom, ea(w0.blendT / 0.07)),
              (w0.blendT -= t)));
        } else {
          let ot = clamp((x0 - B0) / (1 - B0), 0, 1);
          (this._buildSwing(w0, k0, O0), this._evalSwing(w0, ot, xv));
          let Q0 = w0.mode !== 2;
          Q0 && ((w0.mode = 2), w0.dir0.copy(w0.dir), (w0.gy0 = w0.plant.y));
          let nt = this._gy(F0.x + H.x * I.xl, F0.z + H.z * I.xl, u.y);
          ((w0.gyT = nt), (w0.u = ot));
          let L0 =
              lerp(w0.gy0, nt, ea(ot * 1.3)) +
              0.55 *
                Math.abs(nt - w0.gy0) *
                Math.sin(Math.PI * Math.min(ot * 1.15, 1)),
            ht = lerp(w0.l0, w0.l1, ea(ot));
          (oe.v0.copy(F0).addScaledVector(H, xv[0]).addScaledVector(F, ht),
            (oe.v0.y = L0 + xv[1]));
          let pt =
            1 - ea((ot - w0.u0) / Math.max(Math.min(0.5, 0.92 - w0.u0), 0.04));
          (oe.v1.copy(oe.v0).addScaledVector(w0.off, pt),
            (Q0 || n0) &&
              (oe.v1.copy(w0.ankle).multiplyScalar(2).sub(w0.prevA),
              w0.off.subVectors(oe.v1, oe.v0),
              (w0.u0 = ot),
              (w0.pitchOff = w0.pitch - xv[2]),
              (pt = 1)),
            w0.ankle.copy(oe.v1),
            (w0.pitch = xv[2] + w0.pitchOff * pt),
            (w0.toe = Math.max(0, -w0.pitch) * (1 - ea(ot / 0.18)) * 0.9),
            w0.dir
              .copy(w0.dir0)
              .lerp(m0, ea((ot - w0.u0) / Math.max(0.75 - w0.u0, 0.05))),
            is.safeNorm(w0.dir, m0));
        }
      } else {
        if (((w0.pEnd = 1), w0.mode === 2)) {
          ((w0.mode = 3),
            w0.from.copy(w0.ankle),
            (w0.fromPitch = w0.pitch),
            (w0.t = 0));
          let k0 = Math.hypot(_0.x - w0.ankle.x, _0.z - w0.ankle.z);
          ((w0.dur = clamp(0.1 + k0 * 0.3, 0.12, 0.3)),
            (w0.lift = 0.02 + 0.06 * Math.min(k0, 1)));
          {
            let O0 = h.stepPhase - Math.floor(h.stepPhase);
            O0 > 0.02 &&
              h.e.onGround &&
              (w0.dur = clamp((1 - O0) / 3.4, 0.08, 0.3));
          }
          (w0.bo
            .copy(this._pvd)
            .multiplyScalar(Math.min(0.26, 0.055 * this._peak)),
            w0.to.copy(_0).add(w0.bo),
            (w0.to.y += Sn),
            w0.dir0.copy(w0.dir));
        } else w0.mode === 1 && (w0.mode = 0);
        if (w0.mode === 3) {
          w0.t = Math.min(1, w0.t + t / w0.dur);
          let k0 = ea(w0.t);
          (!this.gaitOn &&
            w0.lift > 0 &&
            (w0.to.copy(_0).add(w0.bo), (w0.to.y += Sn)),
            w0.ankle.lerpVectors(w0.from, w0.to, k0),
            (w0.ankle.y += w0.lift * Math.sin(Math.PI * w0.t)),
            (w0.pitch =
              lerp(w0.fromPitch, 0, k0) -
              ((0.3 * w0.lift) / 0.08) * Math.sin(Math.PI * w0.t)),
            (w0.toe = 0),
            w0.lift > 0 &&
              (w0.dir.copy(w0.dir0).lerp(m0, k0), is.safeNorm(w0.dir, m0)),
            w0.t >= 1 &&
              ((w0.mode = 0),
              (w0.pitch = 0),
              w0.plant.copy(w0.to),
              (w0.plant.y -= Sn)));
        } else {
          let k0 = u0 === 1 ? a * (1 - E) : 0;
          ((w0.pitch = damp(w0.pitch, -1 * k0, 14, t)),
            (w0.toe = Math.max(0, -w0.pitch) * 0.9),
            is.rock(w0.pitch, tl),
            w0.ankle.copy(w0.plant).addScaledVector(w0.dir, tl[0]),
            (w0.ankle.y += tl[1]));
          let O0 = w0.plant.x - _0.x,
            B0 = w0.plant.z - _0.z,
            ot = O0 * O0 + B0 * B0,
            Q0 = ot > 0.2 || w0.force;
          if (
            ((w0.force = !1),
            !this.gaitOn &&
              (ot > 0.0196 ||
                Math.abs(w0.plant.y - _0.y) > 0.08 ||
                w0.dir.dot(A) < 0.84) &&
              (Q0 || (P0.mode === 0 && this.stepCool <= 0)))
          ) {
            ((w0.mode = 3),
              w0.from.copy(w0.ankle),
              (w0.fromPitch = w0.pitch),
              (w0.t = 0),
              w0.dir0.copy(w0.dir),
              w0.bo.set(0, 0, 0));
            let nt = Math.sqrt(ot);
            ((w0.dur = Q0 ? 0.11 : clamp(0.16 + nt * 0.3, 0.17, 0.3)),
              (w0.lift = 0.04 + 0.07 * Math.min(nt, 0.6)),
              w0.to.copy(_0),
              (w0.to.y += Sn),
              (this.stepCool = w0.dur + 0.05));
          }
          w0.stance = w0.mode === 0;
        }
      }
      w0.prevA.set(J0, q0, v0);
    }
    h.mode === "mantle" && h.mantle
      ? this._mantleLegs(s, n, A, O)
      : (this._mant = null);
    let T0 = ea((-i - 0.12) / 1.25),
      j0 = lerp(x.neckLevel, x.neckDown, T0) + 0.02 * a * (1 - T0);
    (m.N.copy(g).addScaledVector(s, -j0), (m.N.y -= x.neckDrop + 0.01 * T0));
    let Z0 = Math.sin(this.time * 0.23) * (1 - E) * (1 - 0.6 * a),
      lt = Math.sin(this.time * 0.63) * 0.006 * (1 - E) + 0.012 * Z0,
      H0 = 0,
      Y0 = 0.025 * Z0;
    if (this.gaitOn) {
      let u0 = this.phase,
        w0 = Math.cos(TAU * (u0 - G * 0.5));
      ((lt -= lerp(0.022, 0.01, I.rk) * w0 * E),
        (Y0 = lerp(0.05, 0.035, I.rk) * w0 * E),
        (H0 =
          lerp(0.08, 0.17 + 0.05 * M, I.rk) *
          Math.cos(TAU * u0) *
          E *
          (1 - 0.5 * P) *
          (p0 < 0 ? -1 : 1)));
    }
    {
      let u0 = 0;
      (this.gaitOn ||
        (d[0].mode === 3 ? (u0 = 0.03) : d[1].mode === 3 && (u0 = -0.03)),
        (this._shift = damp(this._shift, u0, 12, t)));
    }
    (m.P.copy(u).addScaledVector(O, lt + this._shift),
      m.P.addScaledVector(
        H,
        Math.min(r, 7) * 0.006 * E * (this.back ? -0.4 : 1),
      ),
      (m.P.x += this.fl.x * 0.25),
      (m.P.z += this.fl.z * 0.25));
    {
      let u0 = m.N.x - m.P.x,
        w0 = m.N.z - m.P.z,
        P0 = u0 * u0 + w0 * w0;
      m.P.y =
        m.N.y -
        Math.sqrt(Math.max(od * od - P0, 0.04)) -
        0.035 * _ * (1 - a) +
        this.fl.d;
    }
    let et = u.y + lerp(0.52, lerp(0.335, 0.455, E), a);
    m.P.y < et && (m.P.y = lerp(m.P.y, et, 1 - y * 0.5));
    {
      let u0 = Math.cos(H0),
        w0 = Math.sin(H0);
      (m.hip.copy(O).multiplyScalar(u0).addScaledVector(A, -w0),
        (m.hip.y -= Y0),
        m.hip.normalize());
    }
    m.pole.copy(s).multiplyScalar(-1).addScaledVector(ri, 0.2);
    {
      is.ik2(m.P, m.N, h2, f2, m.pole, oe.C, oe.v0, 0.999, 0.6);
      let u0 = is.safeNorm(oe.cd.subVectors(oe.C, m.P), ri),
        w0 = is.ortho(oe.hip.copy(m.hip), u0, n),
        P0 = hp * W7 - 0.003,
        st = hp * q7 + 0.003,
        J0 = 0,
        q0 = 0;
      for (let k0 = 0; k0 < 2; k0++) {
        let O0 = k0 ? 1 : -1,
          B0 = d[k0],
          ot = B0.ankle,
          Q0 = m.P.x - u0.x * lf + w0.x * O0 * Pi,
          nt = m.P.y - u0.y * lf + w0.y * O0 * Pi,
          L0 = m.P.z - u0.z * lf + w0.z * O0 * Pi,
          ht = ot.x - Q0,
          pt = ot.z - L0,
          V0 = ht * ht + pt * pt;
        if (
          ((B0.hx = Q0),
          (B0.hy = nt),
          (B0.hz = L0),
          (B0.d2 = V0),
          B0.mode === 1 || B0.mode === 0)
        ) {
          let c0 = nt - (ot.y + Math.sqrt(Math.max(P0 * P0 - V0, 4e-4)));
          if ((c0 > J0 && (J0 = c0), V0 < st * st)) {
            let Z = ot.y + Math.sqrt(st * st - V0) - nt;
            Z > q0 && (q0 = Z);
          }
        } else if (B0.mode === 2 && this.gaitOn) {
          let c0 =
            (nt -
              (B0.gyT +
                Sn +
                Math.sqrt(Math.max(P0 * P0 - I.xl * I.xl, 0.02)))) *
            ea(B0.u * 1.25);
          c0 > J0 && (J0 = c0);
        }
      }
      ((J0 = Math.min(J0, 0.5) * (1 - y)),
        (this.drop =
          J0 > this.drop
            ? Math.min(
                J0,
                this.drop + Math.max(0.015, 2.4 * t, (J0 - this.drop) * 0.6),
              )
            : damp(this.drop, J0, 9, t)),
        b && (this.drop = J0));
      let v0 = q0 > 0 && J0 <= 0 ? q0 : -this.drop;
      ((m.P.y += v0),
        (m.N.y += v0),
        (d[0].hyF = d[0].hy + v0),
        (d[1].hyF = d[1].hy + v0));
      let x0 = hp * W7 - 1e-4,
        C0 = hp * q7 + 1e-4;
      for (let k0 = 0; k0 < 2; k0++) {
        let O0 = d[k0];
        if (y || (O0.mode !== 1 && O0.mode !== 0)) continue;
        let B0 = O0.ankle.y - (O0.hy + v0),
          ot = O0.d2 + B0 * B0;
        (ot > x0 * x0 || ot < C0 * C0) &&
          ((O0.stance = !1),
          O0.mode === 1
            ? (O0.pEnd = Math.min(O0.pEnd, (this.phase + k0 * 0.5) % 1))
            : (O0.force = !0));
      }
    }
    let ct = lerp(NC, this.off * 0.6, M) - H0 * lerp(0.5, 1.2, M) + this.fl.t;
    (m.sh
      .copy(n)
      .multiplyScalar(Math.cos(ct))
      .addScaledVector(s, -Math.sin(ct)),
      (m.sh.y += Y0 * 0.5),
      m.sh.normalize(),
      m.pole.copy(s).multiplyScalar(-1).addScaledVector(ri, 0.2));
    let D0 = 0.2 + 0.45 * a;
    for (let u0 = 0; u0 < 2; u0++) {
      let w0 = d[u0],
        P0 = u0 ? 1 : -1;
      if (
        (m.A[u0].copy(w0.ankle),
        m.Kp[u0]
          .copy(A)
          .addScaledVector(w0.dir, 0.6)
          .addScaledVector(O, P0 * D0)
          .addScaledVector(ri, 0.12),
        u0 === 1)
      ) {
        let q0 = a * (1 - E);
        if (q0 > 0.01) {
          let v0 = w0.hyF,
            x0 = this._gy(w0.hx + A.x * 0.35, w0.hz + A.z * 0.35, u.y) + 0.072,
            C0 = Math.min(v0 - x0, qr * 0.98),
            k0 = Math.sqrt(qr * qr - C0 * C0);
          (oe.v0
            .set(w0.hx, 0, w0.hz)
            .addScaledVector(A, k0 * 0.96)
            .addScaledVector(O, k0 * 0.26),
            (oe.v0.y = x0),
            oe.v1.set(
              (w0.hx + w0.ankle.x) * 0.5,
              (v0 + w0.ankle.y) * 0.5,
              (w0.hz + w0.ankle.z) * 0.5,
            ),
            m.Kp[u0].normalize().lerp(oe.v0.sub(oe.v1).normalize(), q0));
        }
      }
      let st = Math.cos(w0.pitch),
        J0 = Math.sin(w0.pitch);
      (m.fU[u0].copy(ri).multiplyScalar(st).addScaledVector(w0.dir, -J0),
        m.fF[u0].copy(w0.dir).multiplyScalar(st).addScaledVector(ri, J0),
        (m.toe[u0] = w0.toe));
    }
    if (this._mant) {
      let u0 = this._mant,
        w0 = this.wM;
      for (let P0 = 0; P0 < 2; P0++)
        if (
          (m.A[P0].lerp(u0.A[P0], w0),
          m.Kp[P0].lerp(u0.Kp[P0], w0),
          m.fF[P0].lerp(u0.fF[P0], w0).normalize(),
          m.fU[P0].lerp(u0.fU[P0], w0).normalize(),
          (m.toe[P0] *= 1 - w0),
          w0 > 0.5)
        ) {
          let st = d[P0];
          (st.ankle.copy(u0.A[P0]),
            st.plant.copy(u0.A[P0]),
            (st.plant.y -= Sn),
            st.dir.copy(A),
            (st.pitch = 0),
            (st.mode = 0));
        }
    }
  }
  _mantleLegs(t, e, s, n) {
    let i = this.player,
      a = i.mantle,
      r = this.world,
      l = this._mant;
    if (!l || l.src !== a) {
      l = this._mant = {
        src: a,
        A: [de(), de()],
        Kp: [de(), de()],
        fF: [de(), de()],
        fU: [de(), de()],
        dir: de(),
        edge: 0.3,
        a0: [de(), de()],
      };
      let d = a.x1 - a.x0,
        m = a.z1 - a.z0,
        p = Math.hypot(d, m) || 1;
      (l.dir.set(d / p, 0, m / p), (l.len = p));
      let x = 0.02;
      for (
        ;
        x < p + 0.1 &&
        !(
          r.groundAt(a.x0 + l.dir.x * x, a.z0 + l.dir.z * x, a.y1 + 0.3) >
          a.y1 - 0.08
        );
        x += 0.02
      );
      l.edge = x - 0.01;
      for (let g = 0; g < 2; g++) l.a0[g].copy(this.feet[g].ankle);
    }
    let c = clamp(a.t, 0, 1),
      h = a.y1,
      f = l.dir,
      u = oe.lr.set(-f.z, 0, f.x);
    for (let d = 0; d < 2; d++) {
      let m = d ? 1 : -1,
        p = d === 0,
        x = ea(p ? (c - 0.05) / 0.3 : (c - 0.22) / 0.34),
        g = ea(p ? (c - 0.32) / 0.3 : (c - 0.62) / 0.34),
        b = l.edge - 0.075,
        v = Math.min(h - 0.12, a.y0 + 0.2 + (h - a.y0) * (p ? 0.62 : 0.42)),
        y = oe.a0.set(
          a.x0 + f.x * b + u.x * m * 0.13,
          a.y0 + Sn + (v - a.y0) * x,
          a.z0 + f.z * b + u.z * m * 0.13,
        ),
        M = oe.a1.set(
          a.x0 + f.x * (l.edge + (p ? 0.26 : 0.1)) + u.x * m * 0.14,
          h + Sn,
          a.z0 + f.z * (l.edge + (p ? 0.26 : 0.1)) + u.z * m * 0.14,
        ),
        w = l.A[d];
      (w.copy(l.a0[d]).lerp(y, ea(c / (p ? 0.12 : 0.26))),
        w.lerp(M, g),
        (w.y +=
          0.16 * Math.sin(Math.PI * g) +
          0.05 * Math.sin(Math.PI * x) * (1 - g)));
      let T = (1 - g) * ea(c / 0.15) * 0.5;
      (l.fF[d]
        .copy(f)
        .multiplyScalar(Math.cos(T))
        .addScaledVector(ri, Math.sin(T)),
        l.fU[d]
          .copy(ri)
          .multiplyScalar(Math.cos(T))
          .addScaledVector(f, -Math.sin(T)),
        l.Kp[d]
          .copy(f)
          .addScaledVector(ri, 0.5 + 0.8 * Math.sin(Math.PI * g))
          .addScaledVector(u, m * 0.35));
    }
  }
  _slide(t, e, s) {
    let n = this.player,
      i = n.e,
      a = this.rS,
      r = n.eye,
      l = G7,
      c = oe.v0.set(n.slideDir.x, 0, n.slideDir.y);
    c.lengthSq() < 0.5 && c.copy(e);
    let h = c.dot(e),
      f = c.dot(s),
      u = oe.ld
        .copy(e)
        .multiplyScalar(0.62 + 0.38 * Math.abs(h))
        .addScaledVector(s, 0.8 * f)
        .normalize(),
      d = oe.lr.set(-u.z, 0, u.x),
      m = this._gy(i.x, i.z, i.y),
      p = Math.min(1, n.speed / 9),
      x = this.time * 37,
      g = Math.sin(x * 1.3) * 0.006 * p,
      b = Math.sin(x * 1.9 + 1.7) * 0.008 * p;
    (a.N.copy(r).addScaledVector(
      e,
      -lerp(
        l.neckLevel + 0.02,
        l.neckDown + 0.03,
        ea((-this._pitch - 0.12) / 1.25),
      ),
    ),
      (a.N.y -= l.neckDrop));
    let v = m + 0.155 + g,
      y = Math.max(a.N.y - v, 0.12),
      M = Math.sqrt(Math.max(od * od - y * y, 0.01));
    (a.P.copy(a.N).addScaledVector(u, M),
      (a.P.y = a.N.y - Math.min(y, od * 0.98)),
      a.pole.copy(u).multiplyScalar(-1).addScaledVector(ri, 0.3),
      a.hip.copy(d),
      a.sh
        .copy(s)
        .multiplyScalar(Math.cos(NC))
        .addScaledVector(e, -Math.sin(NC))
        .lerp(d, 0.35)
        .normalize(),
      a.A[0].copy(a.P).addScaledVector(u, 0.79).addScaledVector(d, -0.05),
      (a.A[0].y = this._gy(a.A[0].x, a.A[0].z, i.y) + 0.105 + b),
      a.A[1].copy(a.P).addScaledVector(u, 0.36).addScaledVector(d, 0.19),
      (a.A[1].y = this._gy(a.A[1].x, a.A[1].z, i.y) + Sn + 0.012 + g),
      a.Kp[0].copy(ri).addScaledVector(u, 0.3).addScaledVector(d, -0.25),
      a.Kp[1]
        .copy(ri)
        .multiplyScalar(1.2)
        .addScaledVector(u, 0.2)
        .addScaledVector(d, 0.5),
      a.fF[0]
        .copy(u)
        .multiplyScalar(0.55)
        .addScaledVector(ri, 0.83)
        .addScaledVector(d, -0.12)
        .normalize(),
      a.fU[0]
        .copy(ri)
        .multiplyScalar(0.55)
        .addScaledVector(u, -0.83)
        .normalize(),
      a.fF[1].copy(u).addScaledVector(d, 0.25).normalize(),
      a.fU[1].copy(ri),
      (a.toe[0] = 0),
      (a.toe[1] = 0));
  }
  _lying(t, e, s, n, i) {
    let a = this.player,
      r = a.e,
      l = this.rL,
      c = a.eye,
      h = G7,
      f = this.b,
      u = this.feet,
      d = a.mode === "dive" ? 1 : 0,
      m = Math.hypot(a.vel.x, a.vel.z),
      p = oe.v0;
    if (
      ((a.mode === "dive" || a.mode === "bellyslide") && m > 1.5
        ? p.set(a.vel.x / m, 0, a.vel.z / m)
        : a.supine || (a.mode !== "normal" && a.diveBack)
          ? p.copy(s).multiplyScalar(-1)
          : p.copy(s),
      i && !this._wasLying)
    ) {
      (f.copy(p), (this.bw = 0));
      for (let k of u)
        ((k.lPlanted = !1), (k.lT = 1), k.lp.copy(k.ankle), (k.lUsed = -1));
    } else if (e) {
      let k = Math.atan2(f.z * p.x - f.x * p.z, f.x * p.x + f.z * p.z);
      d
        ? (this.bw = clamp(k * 14, -16, 16))
        : ((this.bw += (k * 110 - this.bw * 17) * t),
          (this.bw = clamp(this.bw, -9, 9)));
      let I = this.bw * t,
        G = Math.cos(I),
        K = Math.sin(I),
        $ = f.x,
        n0 = f.z;
      f.set($ * G + n0 * K, 0, n0 * G - $ * K).normalize();
    }
    this.snap && !this.holdAxis && (f.copy(p), (this.bw = 0));
    let x = s.dot(f),
      g = oe.Fc.copy(s).addScaledVector(f, -x).addScaledVector(ri, -x);
    (g.lengthSq() < 1e-6 && g.set(0, -1, 0), g.normalize());
    let b = oe.Rv.crossVectors(g, f).normalize(),
      v = Math.max(0, g.y),
      y = Math.max(0, -g.y),
      M = 1 - Math.abs(g.y);
    l.sup = v;
    let w = ea((-this._pitch - 0.1) / 1.25) * ea((v - 0.85) / 0.15),
      T = Math.min(1, 4 * M * (v + y)),
      S =
        y * h.proneBack +
        v * lerp(h.supineBack, h.supineDown, w) +
        M * h.sideBack +
        0.19 * T * v;
    (l.N.copy(c)
      .addScaledVector(f, -S)
      .addScaledVector(s, -M * h.sideBack - 0.22 * T),
      (l.N.y -= lerp(
        y * 0.13 + v * 0.17 + M * 0.12,
        0.13 + 0.07 * v + 0.12 * M,
        d,
      )));
    let E = this._gy(l.N.x - f.x * 0.5, l.N.z - f.z * 0.5, r.y),
      _ = (this.flat = 1 - v * (0.15 + 0.08 * w)),
      R = y * 0.125 + v * 0.118 * _ + M * 0.165,
      C = y * 0.2 + v * lerp(0.15, 0.125, w) + M * 0.22;
    if ((d || (l.N.y = Math.max(l.N.y, E + C)), d)) {
      let k = clamp(a.vel.y / Math.max(m, 3), -0.6, 0.6),
        I = oe.ba.copy(f).addScaledVector(ri, k).normalize();
      (l.P.copy(l.N).addScaledVector(I, -od),
        (l.P.y -= 0.03 + 0.05 * v),
        l.P.y < E + R && (l.P.y = E + R));
    } else {
      let k = E + R,
        I = clamp(l.N.y - k, -0.2, od * 0.9);
      (l.P.copy(l.N).addScaledVector(f, -Math.sqrt(od * od - I * I)),
        (l.P.y = k));
    }
    (l.pole
      .copy(ri)
      .multiplyScalar(y + M - v * (1 - d * 0.5))
      .addScaledVector(f, 0.05),
      l.sh.copy(b),
      l.hip.copy(b));
    let L = (a.crawlK || 0) * (1 - d),
      A = a.stepPhase - 0.1,
      O = Math.sin(Math.PI * A);
    (l.hip.addScaledVector(ri, -0.1 * O * L * (y - v)).normalize(),
      l.P.addScaledVector(b, 0.012 * O * L));
    let H = !d && a.mode === "normal" && m > 0.25 && a.e.onGround,
      F = v * (a.adsK || 0),
      P = (this.wPin =
        damp(this.wPin || 0, a.k9Pin && a.k9Pin.pinning === a ? 1 : 0, 7, t) *
        v),
      z = clamp(-this.fl.d * 8, 0, 1);
    for (let k = 0; k < 2; k++) {
      let I = u[k],
        G = k ? 1 : -1,
        K = l.A[k],
        $ = I.lHome;
      if (d) {
        let p0 = clamp(a.vel.y / Math.max(m, 3), -0.6, 0.6);
        ($.copy(l.P)
          .addScaledVector(f, -0.8 + (k ? 0.04 : 0))
          .addScaledVector(b, G * 0.13)
          .addScaledVector(g, k ? -0.1 : -0.02),
          ($.y += -p0 * 0.3 + v * 0.12),
          K.copy($),
          (I.lPlanted = !1),
          (I.lT = 1),
          I.lp.copy(K));
      } else {
        let p0 = y * 0.17 + v * (0.19 + 0.13 * F - 0.05 * P) + M * 0.06,
          t0 = y * 0.76 + v * (0.66 + 0.1 * P - 0.1 * z) + M * 0.6;
        if (
          ($.copy(l.P)
            .addScaledVector(f, -t0 * (k ? 0.95 : 1))
            .addScaledVector(b, G * p0),
          M > 0.02 && $.addScaledVector(g, M * (k ? 0.16 : -0.06)),
          ($.y = this._gy($.x, $.z, r.y) + (v > 0.5 ? Sn : 0.058) + M * 0.03),
          H && e)
        ) {
          let M0 = 1.3333333333333333,
            f0 = Math.min(0.34, m * 0.5 * M0),
            _0 = XU(a.stepPhase * 0.5 + (k ? 0.5 : 0)),
            F0 = clamp(f0 / (m * M0), 0.1, 0.5),
            m0 = a.vel.x / m,
            S0 = a.vel.z / m,
            T0 = Math.floor(a.stepPhase * 0.5 + (k ? 0.5 : 0));
          if (
            (I.lPlanted &&
              oe.v2.subVectors(I.lp, l.P).lengthSq() > 0.69 &&
              ((I.lPlanted = !1), I.lFrom.copy(I.lp)),
            _0 < F0 && (I.lPlanted || I.lUsed !== T0))
          )
            (I.lPlanted ||
              ((I.lUsed = T0),
              (I.lPlanted = !0),
              I.lp.copy($),
              (I.lp.x += m0 * f0 * 0.5),
              (I.lp.z += S0 * f0 * 0.5),
              (I.lp.y = this._gy(I.lp.x, I.lp.z, r.y) + (v > 0.5 ? Sn : 0.058)),
              I.lFrom.copy(K.lengthSq() > 0 ? K : $),
              (I.lT = 0)),
              (I.lT = Math.min(1, I.lT + t / 0.08)),
              K.lerpVectors(I.lFrom, I.lp, ea(I.lT)));
          else {
            I.lPlanted && ((I.lPlanted = !1), I.lFrom.copy(I.lp));
            let j0 = clamp((_0 - F0) / (1 - F0), 0, 1);
            (oe.v1.copy($),
              (oe.v1.x += m0 * f0 * 0.5),
              (oe.v1.z += S0 * f0 * 0.5),
              K.lerpVectors(I.lFrom, oe.v1, ea(j0)),
              K.addScaledVector(b, G * 0.1 * Math.sin(Math.PI * j0) * y),
              (K.y += 0.03 * Math.sin(Math.PI * j0) * v),
              I.lp.copy(K));
          }
        } else
          (I.lPlanted && (I.lPlanted = !1),
            e
              ? I.lp.lerp($, 1 - Math.exp(-(this.snap ? 1e3 : 9) * t))
              : this.snap && I.lp.copy($),
            I.lT >= 1 && I.lp.distanceToSquared($) > 1 && I.lp.copy($),
            K.copy(I.lp));
        I.stance = I.lPlanted && I.lT >= 1;
      }
      l.Kp[k]
        .copy(g)
        .multiplyScalar(0.25 + 1.2 * v)
        .addScaledVector(b, G * (0.9 * y + 0.25 * v + 0.9 * F))
        .addScaledVector(f, 0.2 * y)
        .addScaledVector(
          ri,
          0.4 * v * (1 - 0.6 * F) * (1 - 0.3 * P) + 0.5 * z * v,
        );
      let n0 = l.fF[k],
        e0 = l.fU[k];
      (n0
        .set(0, 0, 0)
        .addScaledVector(b, G * (0.85 * y + 0.3 * v + 0.5 * F))
        .addScaledVector(f, -0.45 * y - 0.8 * v)
        .addScaledVector(ri, 0.45 * v - 0.08 * y)
        .addScaledVector(g, M * 0.6),
        e0
          .set(0, 0, 0)
          .addScaledVector(f, 0.85 * y + 0.25 * v)
          .addScaledVector(b, G * 0.45 * y)
          .addScaledVector(ri, 0.95 * v + 0.15 * y + M * 0.5),
        d &&
          (n0.copy(f).multiplyScalar(-1).addScaledVector(g, 0.25),
          e0.copy(g).multiplyScalar(-1).addScaledVector(f, 0.2)),
        is.safeNorm(n0, f),
        is.safeNorm(e0, ri),
        (l.toe[k] = 0));
    }
  }
  _upper(t, e, s, n, i, a) {
    let r = this.player,
      l = this.op,
      c = this._os,
      h = this.ars,
      f = this.ub;
    if (e || !f.ok) {
      (c.pos.copy(this.root),
        (c.yaw = s),
        (c.pitch = n),
        (c.speed = r.speed),
        (c.moveX = r.moveX),
        (c.moveZ = r.moveZ),
        (c.stance =
          r.mode === "dive"
            ? "dive"
            : i
              ? "prone"
              : a
                ? "slide"
                : r.stance === "crouch"
                  ? "crouch"
                  : "stand"),
        (c.sprint = !!r.sprinting),
        (c.airborne = !r.e.onGround && r.mode === "normal"));
      let u = h ? h.state : "ready";
      if (
        ((c.reloading = u === "reload"),
        h &&
          h.clipDur &&
          u === "reload" &&
          !(h.def && h.def.pump) &&
          (c.reloadDur = h.clipDur),
        (c.engage = !(
          r.mode === "mantle" ||
          u === "holster" ||
          u === "draw" ||
          u === "inspect" ||
          (u === "throw" && h.clipName === "k9")
        )),
        (c.axis = i ? this.b : null),
        h)
      ) {
        (h.sinceFire < this._sf - 1e-4 && h.sinceFire < 0.1 && l.kick(),
          (this._sf = h.sinceFire));
        let m = u === "throw" && h.clipName !== "k9";
        (m && !this._thr && l.throwGrenade(), (this._thr = m));
      }
      l.update(e ? t : 1e-4, c);
      let d = l.joints;
      (f.N.set(d[fs.neck * 3], d[fs.neck * 3 + 1], d[fs.neck * 3 + 2]),
        f.H.set(d[fs.head * 3], d[fs.head * 3 + 1], d[fs.head * 3 + 2]),
        f.E[0].set(
          d[fs.lElbow * 3],
          d[fs.lElbow * 3 + 1],
          d[fs.lElbow * 3 + 2],
        ),
        f.E[1].set(
          d[fs.rElbow * 3],
          d[fs.rElbow * 3 + 1],
          d[fs.rElbow * 3 + 2],
        ),
        f.Hd[0].set(d[fs.lHand * 3], d[fs.lHand * 3 + 1], d[fs.lHand * 3 + 2]),
        f.Hd[1].set(d[fs.rHand * 3], d[fs.rHand * 3 + 1], d[fs.rHand * 3 + 2]),
        f.hp[0].copy(l.hints.handP[0]),
        f.hp[1].copy(l.hints.handP[1]),
        l.hints.magM && f.mag.setFromMatrixPosition(l.hints.magM),
        f.gun.copy(l.gunPos),
        (f.ok = !0));
    }
  }
  _resolve(t, e, s, n, i, a, r, l) {
    let c = this.rO,
      h = this.op,
      f = h.joints,
      u = h.hints,
      d = this.ub,
      m = this.player;
    (is.safeNorm(c.pole, ri),
      is.ik2(c.P, c.N, h2, f2, c.pole, oe.C, oe.v0, 0.999, 0.6),
      c.N.copy(oe.v0));
    let p = is.safeNorm(oe.cd.subVectors(oe.C, c.P), ri),
      x = is.safeNorm(oe.nd.subVectors(c.N, oe.C), p),
      g = is.ortho(oe.sh.copy(c.sh), x, n),
      b = is.ortho(oe.hip.copy(c.hip), p, n),
      v = oe.mid.copy(oe.C).addScaledVector(x, AE),
      y = oe.SL.copy(v).addScaledVector(g, -Yc),
      M = oe.SR.copy(v).addScaledVector(g, Yc);
    oe.v0.copy(c.P).addScaledVector(p, -lf);
    let w = oe.HL.copy(oe.v0).addScaledVector(b, -Pi),
      T = oe.HR.copy(oe.v0).addScaledVector(b, Pi),
      S = m.e.y + 0.07;
    for (let _ = 0; _ < 2; _++) {
      let R = _ ? T : w,
        C = _ ? oe.kR : oe.kL,
        L = _ ? oe.fR : oe.fL,
        A = oe.pole.copy(c.Kp[_]);
      is.ik2(R, c.A[_], qr, rf, A, C, L, W7, q7);
      let O = this.world.groundAt(C.x, C.z, R.y + 0.3) + 0.068;
      if (C.y < O && R.y > O)
        for (let H = 0; H < 3 && C.y < O; H++)
          (A.addScaledVector(ri, 0.8),
            is.ik2(R, c.A[_], qr, rf, A, C, L, W7, q7));
      C.y < O - 0.02 && r < 0.5 && (C.y = O - 0.02);
    }
    let E = oe.d.subVectors(c.N, d.N);
    (oe.v1.subVectors(d.H, d.N),
      oe.v2.copy(c.N).add(oe.v1),
      Jl(f, fs.head, oe.v2),
      Jl(f, fs.neck, c.N),
      Jl(f, fs.chest, oe.C),
      Jl(f, fs.pelvis, c.P),
      Jl(f, fs.lShoulder, y),
      Jl(f, fs.rShoulder, M));
    for (let _ = 0; _ < 2; _++) {
      let R = _ ? M : y,
        C = oe.v1.copy(d.Hd[_]).add(E),
        L = oe.v2.copy(d.E[_]).add(E);
      (oe.v3.addVectors(R, C).multiplyScalar(0.5),
        oe.pole.subVectors(L, oe.v3),
        oe.pole.lengthSq() < 1e-6 && oe.pole.set(0, -1, 0),
        is.ik2(
          R,
          C,
          Ca,
          mh,
          oe.pole,
          _ ? oe.eR : oe.eL,
          _ ? oe.hR : oe.hL,
          0.99,
        ),
        u.handP[_].copy(d.hp[_]).add(E));
    }
    if ((h.gunPos.copy(d.gun).add(E), u.magM)) {
      let _ = u.magM.elements;
      ((_[12] = d.mag.x + E.x),
        (_[13] = d.mag.y + E.y),
        (_[14] = d.mag.z + E.z));
    }
    (Jl(f, fs.lElbow, oe.eL),
      Jl(f, fs.lHand, oe.hL),
      Jl(f, fs.rElbow, oe.eR),
      Jl(f, fs.rHand, oe.hR),
      Jl(f, fs.lHip, w),
      Jl(f, fs.lKnee, oe.kL),
      Jl(f, fs.lFoot, oe.fL),
      Jl(f, fs.rHip, T),
      Jl(f, fs.rKnee, oe.kR),
      Jl(f, fs.rFoot, oe.fR),
      (u.footW = 1));
    for (let _ = 0; _ < 2; _++)
      (is.safeNorm(c.fF[_], s),
        is.safeNorm(c.fU[_], ri),
        u.footF[_].copy(c.fF[_]),
        u.footU[_].copy(c.fU[_]),
        (u.toeBend[_] = c.toe[_]));
    (h.renderHinted(), this._ground(t));
    {
      let _ = 1 - (1 - (this.flat || 1)) * r;
      if (_ < 0.999) {
        let R = h.body.skeleton.bones;
        jU.makeScale(1, 1, _);
        for (let C of _s0) R[C].matrix.multiply(jU);
      }
    }
    this.metrics.on && e && this._measure(t, a, r);
  }
  _ground(t) {
    let e = this.player,
      s = this.op.joints,
      n = this.pud.material.uniforms,
      i = n.uS.value,
      a = this.ctx.vm && this.ctx.vm.light,
      r = a && a.probe,
      l = this.world.groundAt(this.root.x, this.root.z, e.e.y + 0.5),
      c = Math.abs(l - e.e.y) < 0.06 ? 1 : 0;
    if (c)
      for (let u = 0; u < 4; u++) {
        let d = this.world.groundAt(
          this.root.x + (u & 1 ? 0.55 : -0.55),
          this.root.z + (u & 2 ? 0.55 : -0.55),
          l + 0.3,
        );
        if (Math.abs(d - l) > 0.05) {
          c = 0.35;
          break;
        }
      }
    let h = r ? r.sun : 0,
      f =
        c * (1 - 0.92 * h) * (e.inWater ? 0 : 1) * (e.e.y - l < 0.5 ? 1 : 0.4);
    ((this.pudK = damp(this.pudK, f, 6, Math.max(t, 0.001))),
      (this.pud.visible = this.shown === 1 && this.pudK > 0.01),
      this.pud.visible &&
        (this.pud.position.set(this.root.x, l + 0.004, this.root.z),
        i[0].set(
          s[fs.lFoot * 3],
          s[fs.lFoot * 3 + 1] - 0.02,
          s[fs.lFoot * 3 + 2],
          0.105,
        ),
        i[1].set(
          s[fs.rFoot * 3],
          s[fs.rFoot * 3 + 1] - 0.02,
          s[fs.rFoot * 3 + 2],
          0.105,
        ),
        i[2].set(
          s[fs.pelvis * 3],
          s[fs.pelvis * 3 + 1] - 0.05,
          s[fs.pelvis * 3 + 2],
          0.2,
        ),
        i[3].set(
          s[fs.chest * 3],
          s[fs.chest * 3 + 1],
          s[fs.chest * 3 + 2],
          0.21,
        ),
        (n.uK.value = this.pudK),
        r && r.k > 0.02
          ? (n.uL.value.copy(r.dir),
            n.uL.value.y < 0.45 && (n.uL.value.y = 0.45),
            n.uL.value.normalize(),
            (n.uLk.value = damp(
              n.uLk.value,
              Math.min(1, r.k * 0.5),
              5,
              Math.max(t, 0.001),
            )))
          : (n.uLk.value = damp(n.uLk.value, 0, 5, Math.max(t, 0.001)))));
  }
  clipProbe(t, e, s = 0.075, n = !1) {
    let i = this._cp;
    (i ||
      ((i = this._cp =
        {
          rt: new WebGLRenderTarget(320, 180, {
            depthBuffer: !0,
          }),
          scene: new Scene(),
          cam: new PerspectiveCamera(),
          buf: new Uint8Array(320 * 180 * 4),
        }),
      (i.mat = new ShaderMaterial({
        side: DoubleSide,
        uniforms: {
          uNear: {
            value: s,
          },
        },
        vertexShader: `#include <common>
#include <skinning_pars_vertex>
varying float vZ; varying float vB;
void main(){
#include <skinbase_vertex>
#include <begin_vertex>
#include <skinning_vertex>
vec4 mv = modelViewMatrix * vec4(transformed, 1.0); vZ = -mv.z; vB = skinIndex.x; gl_Position = projectionMatrix * mv; }`,
        fragmentShader:
          "uniform float uNear; varying float vZ; varying float vB; void main(){ gl_FragColor = gl_FrontFacing ? vec4(0.0, vZ < uNear ? 1.0 : 0.0, 1.0, clamp(vZ, 0.0, 1.0)) : vec4(1.0, vZ < uNear ? 1.0 : 0.0, 0.2 + floor(vB + 0.5) / 255.0, clamp(vZ, 0.0, 1.0)); }",
      })),
      (i.buf2 = new Uint8Array(320 * 180 * 4)),
      (i.mesh = new SkinnedMesh(this.view.geometry, i.mat)),
      (i.mesh.frustumCulled = !1),
      (i.mesh.matrixAutoUpdate = !1),
      i.mesh.bind(this.view.skeleton, KU),
      i.scene.add(i.mesh)),
      (i.mat.uniforms.uNear.value = s),
      i.cam.copy(e, !1),
      (i.cam.near = 0.004),
      i.cam.updateProjectionMatrix(),
      i.cam.matrixWorld.copy(e.matrixWorld),
      i.cam.matrixWorldInverse.copy(e.matrixWorld).invert(),
      (i.cam.matrixWorldAutoUpdate = !1),
      (i.cam.matrixAutoUpdate = !1));
    let a = t.getRenderTarget(),
      r = t.autoClear,
      l = new Color();
    t.getClearColor(l);
    let c = t.getClearAlpha();
    (t.setRenderTarget(i.rt),
      (t.autoClear = !0),
      t.setClearColor(0, 1),
      t.clear(),
      t.render(i.scene, i.cam),
      t.readRenderTargetPixels(i.rt, 0, 0, 320, 180, i.buf),
      (i.mat.side = FrontSide),
      (i.mat.needsUpdate = !0),
      t.clear(),
      t.render(i.scene, i.cam),
      t.readRenderTargetPixels(i.rt, 0, 0, 320, 180, i.buf2),
      (i.mat.side = DoubleSide),
      (i.mat.needsUpdate = !0),
      t.setRenderTarget(a),
      (t.autoClear = r),
      t.setClearColor(l, c));
    let h = 0,
      f = 0,
      u = 0,
      d = 255,
      m = i.buf,
      p = {},
      x = i.buf2,
      g = 0,
      b = (M) => x[M + 2] > 40,
      v = 320 * 4;
    for (let M = 0; M < m.length; M += 4)
      if (m[M + 2] > 40) {
        if (
          (u++,
          !b(M) &&
            !b(M - 4) &&
            !b(M + 4) &&
            !b(M - v) &&
            !b(M + v) &&
            !b(M - v - 4) &&
            !b(M - v + 4) &&
            !b(M + v - 4) &&
            !b(M + v + 4) &&
            g++,
          m[M] > 127)
        ) {
          h++;
          let w = m[M + 2] - 51;
          p[w] = (p[w] || 0) + 1;
        }
        (m[M + 1] > 127 && f++, m[M + 3] < d && (d = m[M + 3]));
      }
    let y = {
      back: h,
      hole: g,
      near: f,
      total: u,
      minZ: u ? d / 255 : 1,
      bones: p,
    };
    if (n) {
      let M = document.createElement("canvas");
      ((M.width = 320), (M.height = 180));
      let w = M.getContext("2d"),
        T = w.createImageData(320, 180),
        S = T.data;
      for (let E = 0; E < 180; E++)
        for (let _ = 0; _ < 320; _++) {
          let R = ((179 - E) * 320 + _) * 4,
            C = (E * 320 + _) * 4,
            L = m[R + 2] > 40,
            A = 60 + m[R + 3] * 0.75;
          ((S[C] = L ? (m[R] > 127 || m[R + 1] > 127 ? 255 : A) : 12),
            (S[C + 1] = L ? (m[R] > 127 ? 0 : m[R + 1] > 127 ? 230 : A) : 16),
            (S[C + 2] = L ? (m[R] > 127 || m[R + 1] > 127 ? 0 : A) : 28),
            (S[C + 3] = 255));
        }
      (w.putImageData(T, 0, 0), (y.image = M.toDataURL("image/png")));
    }
    return y;
  }
  _measure(t, e, s) {
    let n = this.metrics,
      i = this.op.hints,
      a = this.player;
    for (let r = 0; r < 2; r++) {
      let l = this.feet[r],
        c = r ? oe.fR : oe.fL,
        h = oe.heel
          .copy(c)
          .addScaledVector(i.footU[r], -Sn)
          .addScaledVector(i.footF[r], -Qg),
        f = oe.ball
          .copy(c)
          .addScaledVector(i.footU[r], -Sn)
          .addScaledVector(i.footF[r], u2),
        u =
          l.stance &&
          a.e.onGround &&
          a.mode === "normal" &&
          (e > 0.99 || s > 0.99);
      if (u && l.mOk) {
        let d =
          Math.min(
            Math.hypot(h.x - l.mh.x, h.z - l.mh.z),
            Math.hypot(f.x - l.mb.x, f.z - l.mb.z),
          ) / t;
        (d > n.max && (n.max = d), (n.sum += d), n.n++);
      }
      (l.mh.copy(h), l.mb.copy(f), (l.mOk = u));
    }
  }
};

export { FirstPersonBody };

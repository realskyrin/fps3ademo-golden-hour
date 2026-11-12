// weapons/viewmodel.js: recovered from the verified GOLDEN HOUR release.
import {
  AdditiveBlending,
  Color,
  CylinderGeometry,
  Euler,
  Group,
  HalfFloatType,
  Mesh,
  MeshBasicMaterial,
  Quaternion,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderTarget,
} from "../vendor/three-r180.js";
import { OpticPortal } from "./optic.js";
import { MuzzleFlash } from "./muzzle-flash.js";
import { WeaponWeight, dl } from "./weight.js";
import {
  DEG_TO_RAD,
  TL,
  clamp,
  damp,
  lerp,
  randomRange,
  saturate,
} from "../core/math.js";
import { settings } from "../core/settings.js";
import { e5, getBuild } from "./loadout.js";

var dR = 55;
var CI = 0.3;
var PI = {
  ar: {
    side: 0.015,
    lift: 0.01,
    surge: 0.01,
    roll: 0.095,
    yaw: 0.042,
    pitch: 0.028,
    low: 0.008,
  },
  smg: {
    side: 0.013,
    lift: 0.009,
    surge: 0.011,
    roll: 0.08,
    yaw: 0.046,
    pitch: 0.026,
    low: 0.006,
  },
  shotgun: {
    side: 0.017,
    lift: 0.012,
    surge: 0.009,
    roll: 0.11,
    yaw: 0.038,
    pitch: 0.03,
    low: 0.01,
  },
  pistol: {
    side: 0.009,
    lift: 0.006,
    surge: 0.014,
    roll: 0.05,
    yaw: 0.056,
    pitch: 0.022,
    low: 0.003,
  },
};
var _Z = {
  px: [150, 13],
  py: [170, 14],
  pz: [150, 13],
  rx: [140, 12],
  ry: [140, 12],
  rz: [120, 10.5],
};
var zI = {
  pos: new Vector3(0.115, -0.15, -0.27),
  rot: new Euler(0.03, 0.07, 0),
  ads: 0.12,
};
var LI = new Euler(0, 0, 0, "YXZ");
var RZ = new Quaternion();
var pR = new Vector3();
var AZ = new Vector3();
var wu = {
  pos: new Vector3(),
  rot: new Euler(),
};
var Zw = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
function Og(o, t) {
  return (
    Math.sin(o * 1.7 + t) * 0.5 +
    Math.sin(o * 2.9 + t * 2.3) * 0.3 +
    Math.sin(o * 4.7 + t * 4.1) * 0.2
  );
}
var ViewModel = class {
  constructor(context) {
    this.ctx = context;
    let e = (this.scene = context.gfx.vmScene);
    ((this.cam = context.gfx.vmCamera),
      (this.cam.fov = dR),
      this.cam.position.set(0, 0, 0),
      this.cam.updateProjectionMatrix(),
      (this.rig = new Group()),
      (this.pose = new Group()),
      (this.clip = new Group()),
      (this.clip.rotation.order = "XYZ"),
      e.add(this.rig),
      this.rig.add(this.pose),
      this.pose.add(this.clip),
      (this.guns = {}),
      (this.gun = null),
      (this.id = null),
      (this.light = new OpticPortal(e, context)),
      (this.flashLight = this.light.flash),
      (this.fl = new MuzzleFlash(context, this.light)),
      (this.flashGroup = this.fl.group));
    let s = new MeshBasicMaterial({
        color: new Color(6, 0.25, 0.2),
        transparent: !0,
        opacity: 0.55,
        blending: AdditiveBlending,
        depthWrite: !1,
        fog: !1,
      }),
      n = new CylinderGeometry(9e-4, 9e-4, 1, 6, 1, !0);
    (n.rotateX(-Math.PI / 2),
      n.translate(0, 0, -0.5),
      (this.laserBeam = new Mesh(n, s)),
      (this.laserBeam.visible = !1),
      (this.laserBeam.frustumCulled = !1),
      (this.laserDot = new Sprite(
        new SpriteMaterial({
          color: new Color(9, 0.5, 0.4),
          blending: AdditiveBlending,
          depthWrite: !1,
          depthTest: !0,
          fog: !1,
          transparent: !0,
        }),
      )),
      (this.laserDot.visible = !1),
      this.laserDot.layers.set(1),
      context.gfx.scene.add(this.laserDot),
      (this.k = {
        sprint: 0,
        slide: 0,
        dive: 0,
        mantle: 0,
        crouch: 0,
        prone: 0,
        wall: 0,
        air: 0,
        tac: 0,
        supine: 0,
      }),
      (this.rattle = 0),
      (this.sp = {
        px: new dl(150, 13),
        py: new dl(170, 14),
        pz: new dl(150, 13),
        rx: new dl(140, 12),
        ry: new dl(140, 12),
        rz: new dl(120, 10.5),
      }),
      (this.swy = new WeaponWeight()),
      (this.sw = {
        ax: this.swy.inX,
        az: this.swy.inZ,
      }),
      (this.kz = {
        x: 0,
      }),
      (this.kp = {
        x: 0,
      }),
      (this.ky = {
        x: 0,
      }),
      (this.kr = {
        x: 0,
      }),
      (this.mv = {
        r: new dl(78, 9.5),
        f: new dl(78, 10.5),
      }),
      (this.wt = 1),
      (this.heat = 0),
      (this.adsArc = 0),
      (this.fireT = -1),
      (this.hold = !1),
      (this.t = 0),
      (this.sunK = 0),
      (this.amb = 1),
      (this.sprintF = 1),
      (this.sprintS = 0),
      (this.sprintB = 0),
      (this.adsPrev = 0),
      (this.gs = {
        rig: this.rig,
        trigger: 0,
        ads: 0,
        sprint: 0,
        elbowR: new Vector3(),
        elbowL: new Vector3(),
      }),
      (this.trig = 0),
      (this.seen = {
        foot: 0,
        jump: 0,
        land: 0,
        slide: 0,
        slideEnd: 0,
        dive: 0,
        stance: 0,
        mantle: 0,
        sprint: 0,
        sprintEnd: 0,
      }));
  }
  setFov(t = 0) {
    let e = lerp(clamp(dR + (settings.fov - 100) * 0.42, 44, 66), dR, t);
    Math.abs(this.cam.fov - e) > 0.005 &&
      ((this.cam.fov = e), this.cam.updateProjectionMatrix());
  }
  build(t, e = {}) {
    for (let s of t) {
      let n = e[s] || getBuild(s),
        i = e5(s, n);
      if (this.guns[i]) continue;
      let a = this.ctx.buildGun(s, {
        detail: "view",
        build: n,
      });
      ((a.root.visible = !1),
        a.root.traverse((r) => {
          r.isMesh &&
            ((r.frustumCulled = !1),
            (r.castShadow = !1),
            (r.receiveShadow = !1));
        }),
        this.clip.add(a.root),
        (this.guns[i] = a),
        this._precompile(a));
    }
  }
  _precompile(t) {
    let e = this.ctx.gfx,
      s = e && e.renderer;
    if (!s || !s.compile) return;
    let n = s.getRenderTarget();
    try {
      (s.setRenderTarget(
        this._warmRT ||
          (this._warmRT = new WebGLRenderTarget(4, 4, {
            type: HalfFloatType,
          })),
      ),
        s.compile(t.root, this.cam, this.scene));
      let i = t.parts && t.parts.mag;
      if (i && e.scene && e.camera) {
        let a = new Group();
        (i.traverse((r) => {
          if (r.isMesh) {
            let l = new Mesh(r.geometry, r.material);
            ((l.castShadow = !0), a.add(l));
          }
        }),
          s.compile(a, e.camera, e.scene));
      }
    } catch {}
    s.setRenderTarget(n);
  }
  show(t, e = null) {
    let s = e || getBuild(t),
      n = e5(t, s);
    (this.build([t], {
      [t]: s,
    }),
      this.gun &&
        ((this.gun.root.visible = !1),
        this.gun.resetPose && this.gun.resetPose()),
      (this.gun = this.guns[n]),
      (this.id = t),
      (this.gun.root.visible = !0),
      this.gun.root.position.set(0, 0, 0),
      this.gun.root.quaternion.identity(),
      this.gun.root.add(this.flashGroup),
      this.flashGroup.position.copy(this.gun.anchors.muzzle),
      this.gun.root.add(this.laserBeam),
      this.laserBeam.position.copy(
        this.gun.anchors.laser ||
          pR.copy(this.gun.anchors.muzzle).add(AZ.set(0, -0.03, 0.12)),
      ),
      (this.fireT = -1),
      (this.hold = !1),
      (this.gun.kickK = 0),
      this.gun.arms && this.gun.arms.snap && this.gun.arms.snap());
    let i = this.swy.set(t),
      a = (this.wt = i.m),
      r = this.mv,
      l = Math.sqrt(a);
    (r.r.set(i.carry[0], i.carry[1]), r.f.set(i.carry[0], i.carry[1] * 1.1));
    for (let c in this.sp) {
      let h = this.sp[c],
        f = _Z[c];
      ((h.k = f[0] / a), (h.c = f[1] / l));
    }
    this.heat = 0;
  }
  kick(t, e) {
    this.shotT = 0;
  }
  flash(t) {
    this.fl.fire(t, this);
  }
  playFire(t, e = !1) {
    ((this.fireT = e ? 1 : 0), (this.hold = !!t));
  }
  release() {
    ((this.hold = !1), (this.fireT = -1));
  }
  _toWorld(t, e) {
    let s = this.ctx.gfx.camera;
    (e.copy(t), this.gun.root.localToWorld(e));
    let n =
      Math.tan((s.fov * DEG_TO_RAD) / 2) /
      Math.tan((this.cam.fov * DEG_TO_RAD) / 2);
    return ((e.x *= n), (e.y *= n), e.applyMatrix4(s.matrixWorld));
  }
  muzzleWorld(t) {
    return (
      this.gun.root.updateWorldMatrix(!0, !1),
      this._toWorld(this.gun.anchors.muzzle, t)
    );
  }
  sightSlope(t) {
    let e = this.gun;
    if (!e || !e.anchors || !e.anchors.sight) return t.set(0, 0, 0);
    (e.root.updateWorldMatrix(!0, !1),
      t.copy(e.anchors.sight),
      (t.z -= 60),
      e.root.localToWorld(t));
    let s = this.ctx.gfx.camera,
      n =
        Math.tan((s.fov * DEG_TO_RAD) / 2) /
        Math.tan((this.cam.fov * DEG_TO_RAD) / 2),
      i = Math.max(1, -t.z);
    return t.set((t.x / i) * n, (t.y / i) * n, 0);
  }
  ejectWorld(t, e) {
    (this.gun.root.updateWorldMatrix(!0, !1),
      this._toWorld(this.gun.anchors.eject, t),
      e
        .copy(this.gun.anchors.ejectDir || pR.set(1, 0.3, 0))
        .applyQuaternion(this.gun.root.getWorldQuaternion(RZ))
        .applyQuaternion(this.ctx.gfx.camera.quaternion)
        .normalize());
    let s = pR.setFromMatrixPosition(this.ctx.gfx.camera.matrixWorld),
      n = t.distanceTo(s);
    n < CI &&
      t
        .sub(s)
        .multiplyScalar(CI / Math.max(n, 0.01))
        .add(s);
  }
  _events(t, e) {
    let s = t.ev,
      n = this.seen,
      i = this.sp,
      a = lerp(1, 0.22, e);
    for (; n.foot !== s.foot;) {
      n.foot = s.foot;
      let r = s.footStr,
        l = s.footSide;
      (i.py.hit(-0.13 * r * a),
        i.rz.hit(l * 0.34 * r * a),
        i.rx.hit(0.2 * r * a),
        i.px.hit(l * 0.035 * r * a),
        i.ry.hit(l * 0.1 * r * a));
    }
    if (
      (n.jump !== s.jump &&
        ((n.jump = s.jump),
        i.py.hit(-0.32 * a),
        i.rx.hit(-0.7 * a),
        i.rz.hit(randomRange(-0.25, 0.25))),
      n.land !== s.land)
    ) {
      n.land = s.land;
      let r = 0.25 + s.landImp;
      (i.py.hit(-0.62 * r * a),
        i.rx.hit(1.25 * r * a),
        i.rz.hit(randomRange(-0.6, 0.6) * r),
        i.pz.hit(0.12 * r * a));
    }
    (n.slide !== s.slide &&
      ((n.slide = s.slide), i.rz.hit(1.6), i.py.hit(-0.28), i.rx.hit(0.5)),
      n.slideEnd !== s.slideEnd &&
        ((n.slideEnd = s.slideEnd), i.rz.hit(-0.9), i.py.hit(0.14)),
      n.dive !== s.dive &&
        ((n.dive = s.dive), i.rx.hit(-1.3), i.pz.hit(-0.35), i.rz.hit(0.7)),
      n.stance !== s.stance &&
        ((n.stance = s.stance),
        i.py.hit(-0.2 * a),
        i.rz.hit(0.45 * a),
        i.rx.hit(0.3 * a)),
      n.mantle !== s.mantle &&
        ((n.mantle = s.mantle), i.py.hit(-0.3), i.rx.hit(-0.8)),
      n.sprint !== s.sprint &&
        ((n.sprint = s.sprint), i.rx.hit(0.9), i.py.hit(0.12), i.rz.hit(0.5)),
      n.sprintEnd !== s.sprintEnd &&
        ((n.sprintEnd = s.sprintEnd),
        i.rx.hit(-0.7),
        i.rz.hit(-0.4),
        i.py.hit(-0.1)));
  }
  update(t, e, s) {
    let n = this.gun;
    if (!n) return;
    this.t += t;
    let i = this.ctx.input,
      a = this.ctx.gfx.camera,
      r = n.hip || zI,
      l = n.adsDist || zI.ads,
      c = e.adsK,
      h = this.k,
      f = this.sp,
      u = this.sw;
    if (((this.rig.visible = e.alive), this.setFov(c), !e.alive || t <= 0))
      return;
    let d = 1 - c;
    this._events(e, c);
    {
      let k0 = s.recoil.now();
      ((this.kz.x = k0.back),
        (this.kp.x = k0.pitch),
        (this.ky.x = k0.yaw),
        (this.kr.x = k0.roll));
    }
    {
      let k0 = e.shake - (e.gunShake || 0);
      if (k0 - (this.prevShake || 0) > 0.14) {
        let O0 = Math.min(1.5, (k0 - this.prevShake) * 2.2);
        (f.rx.hit(randomRange(-1, 1) * 1.2 * O0),
          f.rz.hit(randomRange(-1, 1) * 1.6 * O0),
          f.py.hit(-0.25 * O0));
      }
      this.prevShake = k0;
    }
    ((h.sprint = damp(
      h.sprint,
      e.sprinting && e.mode === "normal" ? 1 : 0,
      e.sprinting ? 8 : 15,
      t,
    )),
      (h.slide = damp(h.slide, e.mode === "slide" ? 1 : 0, 12, t)),
      (h.dive = damp(
        h.dive,
        e.mode === "dive" || e.mode === "bellyslide" ? 1 : 0,
        11,
        t,
      )),
      (h.mantle = damp(h.mantle, e.mode === "mantle" ? 1 : 0, 16, t)),
      (h.crouch = damp(
        h.crouch,
        e.stance === "crouch" && e.mode === "normal" ? 1 : 0,
        10,
        t,
      )),
      (h.prone = damp(
        h.prone,
        e.stance === "prone" && e.mode === "normal" ? 1 : 0,
        9,
        t,
      )),
      (h.tac = damp(h.tac, e.tac ? 1 : 0, 7, t)),
      (h.supine = damp(
        h.supine,
        e.supine && e.stance === "prone" ? 1 : 0,
        7,
        t,
      )));
    let m = clamp(e.moveZ, -1, 1),
      p = clamp(e.moveX, -1, 1);
    ((this.sprintF = damp(this.sprintF, saturate(m * 1.3), 8, t)),
      (this.sprintS = damp(this.sprintS, p, 8, t)),
      (this.sprintB = damp(this.sprintB, saturate(-m * 1.3), 8, t)));
    let x = 0;
    if (this.ctx.world && e.mode !== "mantle") {
      let k0 = e.eye,
        O0 = e.viewDir;
      this.ctx.world.raycast(
        k0.x,
        k0.y - 0.05,
        k0.z,
        O0.x,
        O0.y,
        O0.z,
        0.78,
        Zw,
      ) && (x = saturate(1 - (Zw.t - 0.22) / 0.5));
    }
    ((h.wall = damp(h.wall, x, x > h.wall ? 13 : 8, t)),
      !e.sprinting &&
        h.sprint > 1e-4 &&
        (h.sprint = damp(
          h.sprint,
          0,
          clamp(2.9 / s.def.sprintOut - 15, 0, 18),
          t,
        )),
      wu.pos.set(0, 0, 0),
      wu.rot.set(0, 0, 0));
    let g = 0,
      b = 0;
    if (s.clip && s.state !== "ready")
      s.clip.apply(Math.min(s.clipT, s.clipDur), wu);
    else if (s.state !== "ready") {
      let k0 = saturate(s.clipT / s.clipDur);
      if (
        ((g =
          s.state === "holster"
            ? k0
            : s.state === "draw"
              ? 1 - k0
              : Math.sin(k0 * Math.PI)),
        s.clipName === "k9")
      ) {
        let O0 = s.clipT,
          B0 = saturate(O0 / 0.17),
          ot = saturate((O0 - 0.5) / 0.4),
          Q0 = ot * ot * (3 - 2 * ot),
          nt = saturate((s.clipDur - O0) / 0.32),
          L0 = nt * nt * (3 - 2 * nt);
        ((g = (1 - (1 - B0) * (1 - B0)) * (1 - 0.5 * Q0) * L0), (b = Q0 * L0));
      }
    } else if (this.fireT >= 0 && n.clips && n.clips.fire) {
      ((this.fireT += t),
        (n.fireN = s.recoil.burst),
        (n.heatK = s.recoil.heat));
      let k0 = n.clips.fire,
        O0 = k0.holdT === void 0 ? 0.04 : k0.holdT;
      this.hold && this.fireT > O0
        ? k0.apply(O0, wu)
        : this.fireT >= k0.duration
          ? ((this.fireT = -1), n.resetPose && n.resetPose())
          : k0.apply(this.fireT, wu);
    }
    let v = r.pos.x,
      y = r.pos.y,
      M = r.pos.z,
      w = r.rot.x,
      T = r.rot.y,
      S = r.rot.z,
      E = h.sprint * d;
    ((v += E * (-0.035 * this.sprintF + 0.012 * this.sprintS)),
      (y += E * (-0.02 * this.sprintF - 0.012 * this.sprintB + 0.012)),
      (M += E * 0.03),
      (w +=
        E *
        (0.2 * this.sprintF +
          0.5 * this.sprintB +
          0.3 * Math.abs(this.sprintS))),
      (T +=
        E * (0.5 * this.sprintF + 0.18 * this.sprintB - 0.25 * this.sprintS)),
      (S += E * (0.24 * this.sprintF - 0.3 * this.sprintS)));
    let _ = h.tac * E;
    ((w += _ * 0.3),
      (T -= _ * 0.16),
      (y += _ * 0.03),
      (v -= _ * 0.02),
      (S += _ * 0.1));
    let R = h.slide * (1 - c * 0.75);
    ((S += R * 0.36),
      (T += R * 0.1),
      (y += R * 0.004),
      (v += R * 0.012),
      (M -= R * 0.04));
    let C = h.dive * (1 - c * 0.6);
    ((S += C * 0.26),
      (w -= C * 0.06),
      (M -= C * 0.05),
      (v -= C * 0.025),
      (y += C * 0.02),
      (S += (h.crouch * 0.07 + h.prone * 0.13) * d),
      (y += h.crouch * 0.006 * d));
    let L = h.supine * d;
    ((S -= L * 0.3),
      (y += L * 0.03),
      (M += L * 0.03),
      (w += L * 0.06),
      (y -= h.mantle * 0.24),
      (w -= h.mantle * 0.55),
      (T += h.mantle * 0.3),
      (y -= g * 0.22),
      (w -= g * 0.5),
      (S += g * 0.15),
      (T -= b * 0.2),
      (v += b * 0.035),
      (S += b * 0.1));
    let A = h.wall * lerp(1, 0.45, c);
    ((M += A * 0.085),
      (w += A * 0.5),
      (T += A * 0.2),
      (y -= A * 0.025),
      (v -= A * 0.02));
    let O = n.anchors.sight,
      H = TL(c) * 0.6 + c * 0.4;
    (c >= 1 &&
      this.adsPrev < 1 &&
      (f.rz.hit(0.22), f.py.hit(-0.05), f.rx.hit(0.12)),
      c <= 0 && this.adsPrev > 0 && (f.rz.hit(-0.15), f.py.hit(-0.04)));
    let F = c > this.adsPrev ? 1 : c < this.adsPrev ? -0.65 : 0;
    ((this.adsArc = damp(this.adsArc, F * Math.sin(Math.PI * c), 24, t)),
      (this.adsPrev = c),
      (v = lerp(v, -O.x, H)),
      (y = lerp(y, -O.y, H)),
      (M = lerp(M, -O.z - l, H)),
      (w = lerp(w, 0, H)),
      (T = lerp(T, 0, H)),
      (S = lerp(S, 0, H)),
      (S += this.adsArc * 0.1),
      (y -= Math.abs(this.adsArc) * 0.011),
      (v += this.adsArc * 0.005),
      (T += this.adsArc * 0.02));
    let P = saturate(e.mountK || 0),
      z = lerp(1, 0.3, P),
      k = lerp(1, 0.2, c) * z,
      I = this.swy.update(
        t,
        s.recoil.turn,
        e.moveX * 6.9,
        e.moveZ * 6.9,
        k,
        d * 0.85 + 0.15,
      ),
      G = this.swy.h.shoulder,
      K = I.tipYaw - I.armYaw,
      $ = I.tipPitch - I.armPitch;
    ((T += I.tipYaw + I.armYaw), (w += I.tipPitch + I.armPitch), (S += I.roll));
    {
      let k0 = v - G[0],
        O0 = y - G[1],
        B0 = M - G[2];
      ((v += I.armYaw * B0),
        (M += I.armPitch * O0 - I.armYaw * k0),
        (y -= I.armPitch * B0));
    }
    let n0 = I.x,
      e0 = I.z,
      p0 = lerp(1, 0.25, c) * z;
    ((v += n0 * p0),
      (M += e0 * p0),
      (S -= n0 * 2.6 * p0),
      (w -= e0 * 1.4 * p0));
    let t0 = e.stepPhase - 0.1,
      M0 = Math.sin(Math.PI * t0),
      f0 = Math.abs(M0),
      _0 = Math.cos(2 * Math.PI * t0),
      F0 = e.bobAmt * lerp(1, 0.2, c) * (1 - 0.2 * h.crouch),
      m0 = h.sprint,
      S0 = this.wt,
      T0 = Math.sin(Math.PI * (t0 - 0.09 * S0)),
      j0 = Math.cos(2 * Math.PI * (t0 - 0.06 * S0)),
      Z0 = Math.sin(3 * Math.PI * t0);
    ((v += (M0 + 0.14 * Z0) * (0.0088 + 0.014 * m0) * F0),
      (y += (0.55 - Math.pow(f0, 0.8)) * (0.0098 + 0.013 * m0) * F0),
      (S += T0 * (0.021 + 0.042 * m0) * F0),
      (T += T0 * (0.011 + 0.024 * m0) * F0),
      (w += j0 * (0.0085 + 0.014 * m0) * F0),
      (M += _0 * (0.003 + 0.004 * m0) * F0));
    let lt = (e.crawlK || 0) * lerp(1, 0.16, c),
      H0 = PI[this.id] || PI.ar;
    if (lt > 0.002) {
      let k0 = Math.sin(Math.PI * (t0 - 0.11 * S0)),
        O0 = Math.pow(f0, 0.7);
      ((v += M0 * H0.side * lt),
        (y += ((0.5 - O0) * H0.lift - H0.low) * lt),
        (M += _0 * H0.surge * lt),
        (S += k0 * H0.roll * lt),
        (T += k0 * H0.yaw * lt),
        (w +=
          (Math.cos(2 * Math.PI * (t0 - 0.08 * S0)) * H0.pitch + 0.02) * lt));
    }
    let Y0 = d * z,
      et = lerp(1, 0.35, c) * z,
      ct = 1.62 / Math.pow(this.wt, 0.3),
      D0 = c * z * (0.7 + 0.3 * this.wt);
    if (
      ((y += Math.sin(this.t * 1.55) * 0.0026 * Y0),
      (w += Math.sin(this.t * 1.55 + 0.6) * 0.0058 * Y0),
      (S += Math.sin(this.t * 0.93) * 0.0045 * Y0),
      (T += Math.sin(this.t * 0.78 + 1.1) * 0.0032 * Y0),
      (v += Math.sin(this.t * 0.78) * 9e-4 * Y0),
      (T += Math.sin(this.t * ct) * 0.00125 * D0),
      (w += Math.sin(this.t * ct * 2 + 0.5) * 85e-5 * D0),
      (S += Math.sin(this.t * ct + 1.2) * 0.0016 * D0),
      (y += Math.sin(this.t * ct * 2) * 4e-4 * D0),
      (w += Og(this.t, 1.3) * 0.0011 * et),
      (T += Og(this.t, 4.1) * 0.0011 * et),
      (v += Og(this.t * 0.7, 7.7) * 3e-4 * et),
      h.slide > 0.05)
    ) {
      let k0 = h.slide * Math.min(1, e.speed / 9);
      ((w += Og(this.t * 9, 2.2) * 0.006 * k0),
        (S += Og(this.t * 8, 5.5) * 0.008 * k0),
        (y += Og(this.t * 10, 9.1) * 0.0016 * k0));
    }
    let u0 = this.mv,
      w0 = e.mode === "normal" ? 1 : 0.5;
    ((u0.r.t = clamp(p * 1.47, -1.3, 1.3) * w0),
      (u0.f.t = clamp(m * 1.47, -1.3, 1.3) * w0));
    let P0 = u0.r.step(t),
      st = u0.f.step(t),
      J0 = lerp(1, 0.26, c),
      q0 = lerp(1, 0.12, c);
    ((S -= P0 * 0.092 * J0),
      (T += P0 * 0.024 * J0),
      (v -= P0 * 0.0115 * q0),
      (y -= Math.abs(P0) * 0.003 * q0),
      (w -= st * (st > 0 ? 0.014 : 0.03) * J0),
      (M += st * (st > 0 ? 0.007 : 0.012) * q0),
      (y -= Math.max(0, st) * 0.0035 * q0),
      (this.heat = s.recoil.heat));
    let v0 = this.heat * this.heat * (3 - 2 * this.heat);
    ((S += v0 * 0.01 * d), (y -= v0 * 0.0012 * d));
    let x0 = clamp(e.vel.y, -12, 8) * (e.e.onGround ? 0 : 1);
    if (
      ((h.air = damp(h.air, x0, 10, t)),
      (y -= h.air * 0.0034 * lerp(1, 0.3, c)),
      (w += h.air * 0.0065 * lerp(1, 0.3, c)),
      (y += e.landDip * 0.42 * lerp(1, 0.4, c)),
      (w -= e.landDip * 0.5 * lerp(1, 0.3, c)),
      (v += f.px.step(t)),
      (y += f.py.step(t)),
      (M += f.pz.step(t)),
      (w += f.rx.step(t)),
      (T += f.ry.step(t)),
      (S += f.rz.step(t)),
      this.pose.position.set(v, y, M),
      LI.set(w, T, S, "YXZ"),
      this.pose.quaternion.setFromEuler(LI),
      s.recoil.pose(this.pose, s.recoil.pivotOf(this.id)),
      this.clip.position.copy(wu.pos),
      this.clip.rotation.set(wu.rot.x, wu.rot.y, wu.rot.z, "XYZ"),
      n.update)
    ) {
      let k0 = this.gs,
        O0 = h.sprint * d;
      ((this.trig = damp(
        this.trig,
        s.triggerDown ? 1 : 0,
        s.triggerDown ? 40 : 22,
        t,
      )),
        (k0.trigger = this.trig),
        (k0.ads = c),
        (k0.sprint = h.sprint));
      let B0 = Math.sin(Math.PI * e.stepPhase) * e.bobAmt;
      (k0.elbowR.set(
        -K * 0.5 + B0 * 0.022 * (0.4 + O0),
        e.landDip * 0.35 - Math.abs(B0) * 0.012 * O0 + $ * 0.3,
        B0 * 0.03 * O0,
      ),
        k0.elbowL.set(
          -K * 0.5 - B0 * 0.022 * (0.4 + O0),
          e.landDip * 0.35 - Math.abs(B0) * 0.012 * O0 + $ * 0.3,
          -B0 * 0.03 * O0,
        ));
      {
        let ot = s.recoil.wk.back * (this.id === "smg" ? 0.45 : 1),
          Q0 = s.recoil.wk.pitch;
        ((k0.elbowR.z += ot * 1.1),
          (k0.elbowR.y -= ot * 0.5 + Q0 * 0.05),
          (k0.elbowR.x += ot * 0.35),
          (k0.elbowL.z += ot * 0.8),
          (k0.elbowL.y -= ot * 0.4 + Q0 * 0.09),
          (k0.elbowL.x -= ot * 0.25));
      }
      if (lt > 0.002) {
        let ot = Math.sin(Math.PI * (e.stepPhase - 0.1)) * lt;
        ((k0.elbowR.x += 0.05 * lt),
          (k0.elbowL.x -= 0.05 * lt),
          (k0.elbowR.y -= 0.02 * lt),
          (k0.elbowL.y -= 0.02 * lt),
          (k0.elbowR.z += ot * 0.045),
          (k0.elbowL.z -= ot * 0.045));
      }
      (this.rig.updateMatrixWorld(!0), n.update(t, k0));
    }
    let C0 =
      s.def.laser &&
      s.state !== "holster" &&
      s.state !== "draw" &&
      e.mode !== "mantle";
    if (
      ((this.laserBeam.visible = !!C0),
      (this.laserDot.visible = !1),
      this.ctx.audio && this.ctx.audio.laser && this.ctx.audio.laser(!!C0),
      C0 && this.ctx.world)
    ) {
      let k0 = e.eye,
        O0 = e.viewDir,
        B0 = 60;
      if (
        (this.ctx.world.raycast(k0.x, k0.y, k0.z, O0.x, O0.y, O0.z, 60, Zw) &&
          (B0 = Zw.t),
        this.laserBeam.scale.set(1, 1, Math.min(2.2, B0)),
        B0 < 59 && h.sprint < 0.5)
      ) {
        ((this.laserDot.visible = !0),
          this.laserDot.position.set(
            k0.x + O0.x * (B0 - 0.02),
            k0.y + O0.y * (B0 - 0.02),
            k0.z + O0.z * (B0 - 0.02),
          ));
        let ot = 0.012 + B0 * 0.0016;
        this.laserDot.scale.set(ot, ot, 1);
      }
    }
    (this.fl.update(t, this, e, s), this.light.update(t, a, this));
  }
};

export { ViewModel };

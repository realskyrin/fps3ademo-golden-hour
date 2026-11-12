// weapons/arsenal.js: recovered from the verified GOLDEN HOUR release.
import { Box3, Matrix4, Quaternion, Vector3 } from "../vendor/three-r180.js";
import { resolveWeaponDefinition } from "./loadout.js";
import { WeaponRecoil } from "./recoil.js";
import { lerp, randomRange, saturate } from "../core/math.js";
import { KEY_BINDINGS } from "../core/input.js";

var n5 = new Vector3();
var ch = new Vector3();
var EI = new Vector3();
var Fg = new Vector3();
var Qd = new Vector3();
var xZ = new Vector3();
var bZ = {
  magout: [0.004, -0.007],
  magin: [-0.007, 0.006],
  bolt: [0.004, 0.009],
  pump_back: [0.007, 0.005],
  pump_fwd: [-0.007, -0.005],
  shell: [-0.003, 0.004],
  slide: [0.004, 0.008],
};
var Arsenal = class {
  constructor(context) {
    ((this.ctx = context), (this.slots = []), (this.cur = 0), this.reset("ar"));
  }
  reset(t) {
    let e = (s) => {
      let n = resolveWeaponDefinition(s);
      return {
        def: n,
        ammo: n.mag,
        reserve: n.reserve,
      };
    };
    if (
      ((this.slots = [e(t), e("pistol")]),
      (this.cur = 0),
      (this.state = "draw"),
      (this.clip = null),
      (this.clipT = 0),
      (this.evI = 0),
      (this.next = -1),
      (this.cool = 0),
      (this.sprintLock = 0),
      (this.ads = 0),
      (this.adsHeld = !1),
      (this.bloom = 0),
      (this.shots = 0),
      (this.sinceFire = 9),
      (this.rt = 0),
      (this.ry = 0),
      (this.climbP = 0),
      (this.climbY = 0),
      (this.pat = 0),
      (this.semiBuf = 0),
      (this.grenades = 2),
      (this.did = !1),
      (this.pumpWait = 0),
      (this.wantStopReload = !1),
      (this.heat = 0),
      (this.loaded = !1),
      (this.spread = 2),
      (this.k9T = !1),
      (this.k9Buf = 0),
      (this.recoil || (this.recoil = new WeaponRecoil())).reset(),
      this.ctx.vm)
    ) {
      let s = {};
      for (let i of this.slots) s[i.def.id] = i.def.build;
      (this.ctx.vm.build(
        this.slots.map((i) => i.def.id),
        s,
      ),
        this.ctx.vm.show(this.def.id, this.def.build),
        this.ctx.vm.release());
      let n = this.ctx.vm.gun;
      ((this.slot.drawn = !0),
        this._play(n && n.clips && n.clips.first ? "first" : "draw", "draw"));
    }
  }
  get slot() {
    return this.slots[this.cur];
  }
  get def() {
    return this.slots[this.cur].def;
  }
  blocksSprint() {
    return (
      this.sinceFire < 0.28 ||
      this.adsHeld ||
      this.state === "melee" ||
      (this.state === "throw" && (this.clipName !== "k9" || this.clipT < 0.45))
    );
  }
  _play(t, e = t) {
    let s = this.ctx.vm.gun,
      n = s && s.clips ? s.clips[t] : null;
    ((this.state = e),
      (this.clip = n),
      (this.clipName = t),
      (this.clipT = 0),
      (this.evI = 0),
      (this.did = !1),
      (this.clipDur = n
        ? n.duration
        : {
            draw: 0.4,
            holster: 0.22,
            melee: 0.45,
            reload: 2,
            reloadEmpty: 2.4,
            inspect: 3.5,
            pump: 0.5,
            reloadStart: 0.45,
            reloadShell: 0.5,
            reloadEnd: 0.45,
            throw: 0.55,
            k9: 3.4,
          }[t] || 0.4),
      n && n.events && n.events.sort((i, a) => i.t - a.t),
      !n && t === "throw" && (this.clipDur = 0.55));
  }
  _events() {
    let t = this.clip;
    if (!t || !t.events) return;
    let { audio: e } = this.ctx,
      s = this.slot;
    for (; this.evI < t.events.length && t.events[this.evI].t <= this.clipT;) {
      let n = t.events[this.evI++];
      if (n.type === "sfx") {
        e.reload(s.def.id, n.id);
        let i = bZ[n.id];
        i && this.ctx.player.nudge(i[0], i[1]);
      } else
        n.type === "ammo"
          ? this._load()
          : n.type === "eject"
            ? this._eject()
            : n.type === "magdrop" && this._dropMag();
    }
  }
  _load() {
    let t = this.slot;
    if (t.def.pump)
      t.reserve > 0 && t.ammo < t.def.mag && (t.ammo++, t.reserve--);
    else {
      let e = Math.min(t.def.mag - t.ammo, t.reserve);
      ((t.ammo += e), (t.reserve -= e));
    }
    this.loaded = !0;
  }
  _eject() {
    let { vm: t, physics: e, player: s } = this.ctx;
    (t.ejectWorld(ch, EI),
      Fg.copy(EI).multiplyScalar(randomRange(2.2, 3.4)).add(s.vel),
      (Fg.y += randomRange(0.8, 1.6)),
      e.casing(ch, Fg, this.def.casing));
  }
  _dropMag() {
    let { vm: t, physics: e, player: s, gfx: n } = this.ctx,
      i = t.gun;
    if (!i || !i.spawnMag) return;
    let a = i.spawnMag();
    if (!a) return;
    (i.root.updateWorldMatrix(!0, !1), ch.copy(a.position), t._toWorld(ch, ch));
    let r = i.root
      .getWorldQuaternion(new Quaternion())
      .premultiply(t.ctx.gfx.camera.quaternion)
      .multiply(a.quaternion);
    (a.position.copy(ch),
      a.quaternion.copy(r),
      a.traverse((h) => {
        h.isMesh && ((h.castShadow = !0), (h.frustumCulled = !0));
      }));
    let l = a.userData.physics;
    if (!l) {
      let h = new Box3(),
        f = new Matrix4();
      (a.updateWorldMatrix(!0, !0),
        f.copy(a.matrixWorld).invert(),
        a.traverse((u) => {
          u.isMesh &&
            (u.geometry.computeBoundingBox(),
            h.union(
              new Box3()
                .copy(u.geometry.boundingBox)
                .applyMatrix4(new Matrix4().multiplyMatrices(f, u.matrixWorld)),
            ));
        }),
        (l = h.isEmpty()
          ? {
              size: [0.028, 0.17, 0.065],
              center: [0, -0.085, 0],
              mass: 0.6,
              mat: "plastic",
            }
          : {
              size: [
                Math.max(0.02, h.max.x - h.min.x),
                Math.max(0.05, h.max.y - h.min.y),
                Math.max(0.03, h.max.z - h.min.z),
              ],
              center: [
                (h.max.x + h.min.x) / 2,
                (h.max.y + h.min.y) / 2,
                (h.max.z + h.min.z) / 2,
              ],
              mass: 0.5,
              mat: "plastic",
            }));
    }
    let c = e.addProp(a, l);
    ((c.temp = !0),
      (c.life = 12),
      e.wake(c),
      e.impulse(
        c,
        ch.x,
        ch.y,
        ch.z,
        s.vel.x * 0.5 + randomRange(-0.2, 0.2),
        -0.4,
        s.vel.z * 0.5 + randomRange(-0.2, 0.2),
      ));
  }
  startReload() {
    let t = this.slot;
    (this.state !== "ready" && this.state !== "inspect") ||
      t.ammo >= t.def.mag ||
      t.reserve <= 0 ||
      ((this.loaded = !1),
      (this.wantStopReload = !1),
      this.ctx.vm.release(),
      t.def.pump
        ? this._play("reloadStart", "reload")
        : this._play(t.ammo === 0 ? "reloadEmpty" : "reload", "reload"));
  }
  swap(t) {
    t === this.cur ||
      (this.state !== "ready" &&
        this.state !== "reload" &&
        this.state !== "inspect" &&
        this.state !== "draw") ||
      ((this.next = t),
      (this.pumpWait = 0),
      this._play("holster"),
      this.ctx.audio.foley("swap"));
  }
  update(t) {
    let { input: e, audio: s, player: n, vm: i, combat: a, fx: r } = this.ctx,
      l = this.slot,
      c = l.def;
    ((this.cool -= t), (this.sinceFire += t), (this.semiBuf -= t));
    let h = n.alive,
      f = n.mode === "mantle";
    if (this.state !== "ready") {
      if (
        ((this.clipT += t * ((this.state === "reload" && c.reloadRate) || 1)),
        this._events(),
        h && this.state === "melee" && !this.did && this.clipT > 0.185)
      ) {
        this.did = !0;
        let v = a.melee(n, n.eye, n.viewDir);
        n.addShake(v ? 0.35 : 0.15);
      }
      if (
        (h &&
          this.state === "throw" &&
          !this.did &&
          this.clipT > ((this.clip && this.clip.releaseT) || 0.24) &&
          ((this.did = !0),
          this.k9T
            ? ((this.k9T = !1),
              this.ctx.match.k9.release() &&
                ((n.kickPitch -= 0.03), n.addShake(0.2)))
            : this._throw()),
        this.state === "throw" && this.clipName === "k9" && this.did)
      ) {
        let v = this.clip,
          y = this.clipDur - ((v && v.returnT) || 0.32);
        if (this.clipT >= ((v && v.holdFrom) || 0.9) && this.clipT < y) {
          let M = this.ctx.match.k9.mine,
            w =
              M &&
              (M.phase === "flight" ||
                M.phase === "slide" ||
                (M.phase === "unfold" && M.unfoldT > 0.5)),
            T =
              e.any(KEY_BINDINGS.fire) ||
              e.any(KEY_BINDINGS.ads) ||
              e.any(KEY_BINDINGS.reload) ||
              e.any(KEY_BINDINGS.melee) ||
              e.any(KEY_BINDINGS.grenade) ||
              n.sprinting ||
              n.mode !== "normal";
          (!w || T || !h) && (this.clipT = y);
        }
      }
      if (this.clipT >= this.clipDur) {
        let v = this.state,
          y = this.clipName;
        if (v === "holster") {
          ((this.cur = this.next), i.show(this.def.id, this.def.build));
          let M = this.slot.ammo === 0;
          M &&
            (this.def.id === "ar" || this.def.id === "pistol") &&
            i.playFire(!0, !0);
          let w = this.slots.every((S) => S === this.slot || S.ammo > 0),
            T =
              !this.slot.drawn &&
              !M &&
              w &&
              i.gun &&
              i.gun.clips &&
              i.gun.clips.first;
          ((this.slot.drawn = !0), this._play(T ? "first" : "draw", "draw"));
        } else
          v === "reload" && c.pump
            ? y === "reloadEnd"
              ? (this.state = "ready")
              : l.ammo < c.mag && l.reserve > 0 && !this.wantStopReload
                ? this._play("reloadShell", "reload")
                : this._play("reloadEnd", "reload")
            : (v === "reload" && !this.loaded && this._load(),
              (this.state = "ready"),
              (this.clip = null));
        this.state === "ready" &&
          ((this.clip = null), i.gun && i.gun.resetPose && i.gun.resetPose());
      }
    }
    if (
      (this.pumpWait > 0 &&
        this.state === "ready" &&
        (c.pump
          ? ((this.pumpWait -= t), this.pumpWait <= 0 && this._play("pump"))
          : (this.pumpWait = 0)),
      !h)
    ) {
      ((this.ads = 0), (this.adsHeld = !1), this._recoil(t, c));
      return;
    }
    let u = e.any(KEY_BINDINGS.fire),
      d = e.any(KEY_BINDINGS.fire, "pressed");
    (d && (this.semiBuf = 0.14),
      (this.adsHeld =
        e.any(KEY_BINDINGS.ads) &&
        !f &&
        this.state !== "melee" &&
        this.state !== "throw" &&
        this.state !== "holster"),
      e.any(KEY_BINDINGS.reload, "pressed") && this.startReload(),
      e.pressed("Digit1")
        ? this.swap(0)
        : e.pressed("Digit2")
          ? this.swap(1)
          : (e.pressed("KeyE") || e.wheel !== 0) && this.swap(1 - this.cur),
      e.any(KEY_BINDINGS.melee, "pressed") &&
        (this.state === "ready" ||
          this.state === "reload" ||
          this.state === "inspect") &&
        !f &&
        (this._play("melee"),
        s.foley("melee_swing"),
        n.e.onGround &&
          n.mode === "normal" &&
          ((n.vel.x += n.viewDir.x * 3.2), (n.vel.z += n.viewDir.z * 3.2)),
        n.nudge(-0.012, 0.02)),
      e.any(KEY_BINDINGS.grenade, "pressed") &&
        this.grenades > 0 &&
        (this.state === "ready" || this.state === "inspect") &&
        !f &&
        (this._play("throw"), s.foley("grenade_pin")),
      e.any(KEY_BINDINGS.k9, "pressed") &&
        (this.k9Buf = this.ctx.match.k9.request() ? 0.5 : 0),
      this.k9Buf > 0 &&
        ((this.k9Buf -= t),
        (this.state === "ready" ||
          this.state === "inspect" ||
          this.state === "reload") &&
          !f &&
          ((this.k9Buf = 0),
          (this.k9T = !0),
          this._play("k9", "throw"),
          s.foley("grenade_throw"))),
      e.any(KEY_BINDINGS.inspect, "pressed") &&
        this.state === "ready" &&
        this.ads < 0.1 &&
        !n.sprinting &&
        (this._play("inspect"), s.foley("inspect")),
      this.state === "inspect" &&
        (u || this.adsHeld || n.sprinting) &&
        ((this.state = "ready"),
        (this.clip = null),
        i.gun.resetPose && i.gun.resetPose()));
    let m =
        this.adsHeld &&
        (this.state === "ready" ||
          this.state === "pump" ||
          (this.state === "draw" &&
            this.clipT >
              (this.clipName === "first" ? this.clipDur - 0.15 : 0.2))),
      p = this.ads;
    ((this.ads = saturate(this.ads + ((m ? 1 : -1.25) * t) / c.adsTime)),
      m && p === 0 ? s.foley("ads_in") : !m && p >= 1 && s.foley("ads_out"));
    let x = this.ads * this.ads * (3 - 2 * this.ads);
    ((n.adsK = x),
      (n.zoom = c.zoom),
      n.sprinting
        ? (this.sprintLock = c.sprintOut * (n.tac ? 1.45 : 1))
        : (this.sprintLock -= t),
      (this.bloom = Math.max(0, this.bloom - t * (c.hip[1] - c.hip[0]) * 3.2)));
    let g = c.hip[0] + this.bloom + (n.speed / 6.9) * 1.3;
    (n.e.onGround || (g += 2.2),
      n.stance === "crouch" && n.mode === "normal"
        ? (g *= 0.82)
        : n.stance === "prone" && (g *= 0.7),
      n.mode === "slide" && (g *= 1.1),
      (g = Math.min(g, c.hip[1] + 2.5)),
      (this.spread = lerp(g, c.ads + (n.e.onGround ? 0 : 0.6), x)));
    let b = c.auto ? u : this.semiBuf > 0;
    ((this.triggerDown =
      u && (this.state === "ready" || this.state === "pump") && !f),
      b &&
        this.state === "reload" &&
        c.pump &&
        l.ammo > 0 &&
        (this.wantStopReload = !0),
      b &&
        this.state === "ready" &&
        this.cool <= 0 &&
        this.sprintLock <= 0 &&
        !f &&
        this.pumpWait <= 0 &&
        ((this.semiBuf = 0),
        l.ammo <= 0
          ? ((d || (c.auto && this.sinceFire > 0.25)) &&
              (s.dryFire(), (this.sinceFire = 0.1)),
            l.reserve > 0 && this.startReload(),
            (this.cool = 0.2))
          : this._fire(l, c, x)),
      l.ammo === 0 &&
        l.reserve > 0 &&
        this.state === "ready" &&
        this.sinceFire > 0.35 &&
        this.pumpWait <= 0 &&
        this.startReload(),
      this.sinceFire > 0.3 && (this.shots = 0),
      (this.heat = Math.max(0, this.heat - t * 1.5)),
      this._recoil(t, c));
  }
  _fire(t, e, s) {
    let { audio: n, player: i, vm: a, combat: r, fx: l } = this.ctx,
      c = 60 / e.rpm,
      h =
        e.auto && this.trigHeld && this.cool > -0.045
          ? Math.max(0, -this.cool - 1e-6)
          : 0;
    (t.ammo--,
      (this.cool = c - h - 1e-6),
      (this.sinceFire = 0),
      this.recoil.fire(e, i, s, h, t.ammo === 0),
      a.kick(e, s),
      a.muzzleWorld(n5));
    let f = i.viewDir;
    if (s > 0.85 && a.sightSlope) {
      let m = Math.min(1, (s - 0.85) / 0.1),
        p = this.ctx.gfx.camera.matrixWorld.elements;
      (a.sightSlope(Qd),
        this.recoil.sightNow(Qd, this.ctx.gfx.camera, a.cam),
        (f = xZ.copy(i.viewDir)),
        (f.x += (p[0] * Qd.x + p[4] * Qd.y) * m),
        (f.y += (p[1] * Qd.x + p[5] * Qd.y) * m),
        (f.z += (p[2] * Qd.x + p[6] * Qd.y) * m),
        f.normalize());
    }
    let u = r.fire(i, i.eye, f, e, this.spread, n5),
      d = i.stats;
    (d && (d.shots++, u.actor && d.hits++, u.head && d.head++),
      n.gunshot(e.id, null, {
        suppressed: !!e.suppressed,
      }),
      e.suppressed || (i.lastShot = this.ctx.time()),
      a.flash(e),
      l.flashLight(n5, 16752720, 42 * e.flash, 12, 0.055),
      l.muzzleSmoke
        ? l.muzzleSmoke(n5, i.viewDir, this.heat)
        : Math.random() < 0.5 &&
          l.smoke(n5.x, n5.y, n5.z, 1, {
            size: 0.08,
            life: 0.7,
            a: 0.12,
            dx: i.viewDir.x,
            dy: i.viewDir.y + 0.4,
            dz: i.viewDir.z,
            speed: 1.4,
          }),
      e.pump
        ? ((this.pumpWait = 0.16),
          a.gun &&
            ((a.gun.rounds = t.ammo),
            a.gun.clips && a.gun.clips.fire && a.playFire(!1)))
        : (a.gun &&
            a.gun.clips &&
            a.gun.clips.fire &&
            a.playFire(t.ammo === 0 && (e.id === "ar" || e.id === "pistol")),
          this._eject()),
      (this.heat = Math.min(14, this.heat + (e.pump ? 3 : 1))),
      (this.bloom += (e.hip[1] - e.hip[0]) * 0.24),
      this.shots++,
      i.addShake(e.shake),
      (i.gunShake = Math.min(i.shake, (i.gunShake || 0) + e.shake)));
  }
  _recoil(t, e) {
    let s = this.ctx.player;
    ((s.recoilPitch = 0),
      (s.recoilYaw = 0),
      (this.trigHeld = !!this.triggerDown));
  }
  _throw() {
    let { physics: t, player: e, audio: s } = this.ctx;
    this.grenades--;
    let n = this.ctx.buildGrenade();
    (Fg.copy(e.viewDir).multiplyScalar(15.5).add(e.vel), (Fg.y += 3.4));
    let i = e.eye,
      a = e.viewDir,
      r = {
        t: 0,
      },
      l = this.ctx.world.raycast(i.x, i.y - 0.12, i.z, a.x, a.y, a.z, 0.62, r)
        ? Math.max(0.03, Math.min(0.45, r.t - 0.15))
        : 0.45;
    (ch.copy(i).addScaledVector(a, l),
      (ch.y -= 0.12),
      t.throwGrenade(n, ch, Fg, 2.3, e),
      s.foley("grenade_throw"));
  }
};

export { Arsenal };

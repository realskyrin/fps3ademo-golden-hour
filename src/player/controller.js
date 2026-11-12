// player/controller.js: recovered from the verified GOLDEN HOUR release.
import { Vector2, Vector3 } from "../vendor/three-r180.js";
import {
  DEG_TO_RAD,
  clamp,
  damp,
  db,
  lerp,
  randomRange,
  saturate,
} from "../core/math.js";
import { horizontalFov, settings } from "../core/settings.js";
import { KEY_BINDINGS } from "../core/input.js";

var PLAYER_STANCES = {
  stand: {
    h: 1.8,
    eye: 1.62,
  },
  crouch: {
    h: 1.2,
    eye: 1,
  },
  slide: {
    h: 0.95,
    eye: 0.72,
  },
  dive: {
    h: 0.9,
    eye: 0.6,
  },
  prone: {
    h: 0.62,
    eye: 0.36,
  },
};
var Bb = 4.7;
var Fw = 6.9;
var sZ = 7.9;
var nZ = 2.6;
var lI = 1.15;
var oZ = 3;
var cI = 2.8;
var hI = 22;
var fI = 6.9;
var iZ = 0.42;
var Jm = new Vector3();
var t5 = new Vector3();
var Ub = new Vector3();
var aZ = {
  pitch: 0,
  yaw: 0,
  roll: 0,
  fov: 0,
  back: 0,
  up: 0,
};
var PlayerController = class {
  constructor(context) {
    ((this.ctx = context),
      (this.e = {
        x: 0,
        y: 0,
        z: 0,
        r: 0.32,
        h: 1.8,
        onGround: !0,
        groundCol: null,
      }),
      (this.pos = new Vector3()),
      (this.vel = new Vector3()),
      (this.yaw = 0),
      (this.pitch = 0),
      (this.eye = new Vector3()),
      (this.viewDir = new Vector3(0, 0, -1)),
      (this.team = 0),
      (this.name = "YOU"),
      (this.isPlayer = !0),
      (this.kills = 0),
      (this.deaths = 0),
      (this.score = 0),
      (this.streak = 0),
      (this.stats = {
        shots: 0,
        hits: 0,
        head: 0,
      }),
      (this.ev = {
        foot: 0,
        footSide: 1,
        footStr: 0,
        jump: 0,
        land: 0,
        landImp: 0,
        slide: 0,
        slideEnd: 0,
        dive: 0,
        stance: 0,
        mantle: 0,
        sprint: 0,
        sprintEnd: 0,
      }),
      this.reset());
  }
  reset() {
    ((this.health = 100),
      (this.alive = !0),
      (this.lastHurt = -99),
      (this.stance = "stand"),
      (this.mode = "normal"),
      this.vel.set(0, 0, 0),
      (this.eyeH = PLAYER_STANCES.stand.eye),
      (this.e.h = PLAYER_STANCES.stand.h),
      (this.e.onGround = !0),
      (this.sprinting = !1),
      (this.sprintTime = 0),
      (this.coyote = 0),
      (this.jumpBuf = 0),
      (this.slideT = 0),
      (this.slideCool = 0),
      (this.slideDir = new Vector2()),
      (this.diveBack = !1),
      (this.mantle = null),
      (this.stepOff = 0),
      (this.landDip = 0),
      (this.landVel = 0),
      (this.bobAmt = 0),
      (this.crawlK = 0),
      (this.stepPhase = 0),
      (this.footSide = 1),
      (this.breath = 0),
      (this.roll = 0),
      (this.tiltPitch = 0),
      (this.shake = 0),
      (this.kickRoll = 0),
      (this.kickPitch = 0),
      (this.accF = 0),
      (this.accR = 0),
      (this.pvx = 0),
      (this.pvz = 0),
      (this.tiltA = 0),
      (this.tiltR = 0),
      (this.landSlow = 0),
      (this.moveX = 0),
      (this.moveZ = 0),
      (this.speed = 0),
      (this.fovKick = 0),
      (this.adsK = 0),
      (this.zoom = 1),
      (this.wideK = 0),
      (this.recoilPitch = 0),
      (this.recoilYaw = 0),
      (this.gunShake = 0),
      (this.kickPS = 0),
      (this.kickRS = 0),
      (this.inWater = !1),
      (this.airTime = 0),
      (this.deathT = 0),
      (this.tac = !1),
      (this.tacT = cI),
      (this.slideBuf = 0),
      (this.supine = !1),
      (this.breathN = 0),
      (this.breathT = 0),
      (this.killer = null),
      (this.k9Pin = null));
  }
  spawn(t, e, s, n) {
    (this.reset(),
      (this.e.x = t),
      (this.e.y = e + 0.01),
      (this.e.z = s),
      (this.yaw = n),
      (this.pitch = 0),
      this.pos.set(t, e, s));
  }
  knockDown() {
    return !this.alive || this.mode === "mantle"
      ? !1
      : (this.mode === "slide" &&
          (this.ctx.audio.slideStop(), this.ev.slideEnd++),
        this.sprinting && ((this.sprinting = !1), this.ev.sprintEnd++),
        (this.mode = "normal"),
        (this.tac = !1),
        (this.slideBuf = 0),
        (this.jumpBuf = 0),
        this.stance !== "prone" && ((this.stance = "prone"), this.ev.stance++),
        (this.supine = !0),
        (this.landVel -= 2.6),
        (this.fovKick = 0.9),
        !0);
  }
  shape() {
    return this.mode === "slide"
      ? PLAYER_STANCES.slide
      : this.mode === "dive" || this.mode === "bellyslide"
        ? PLAYER_STANCES.dive
        : PLAYER_STANCES[this.stance];
  }
  _canFit(t) {
    let e = this.e;
    return !this.ctx.world.overlap(
      e.x - e.r,
      e.y + 0.05,
      e.z - e.r,
      e.x + e.r,
      e.y + t,
      e.z + e.r,
      !0,
    );
  }
  _setHeight() {
    let t = this.shape().h,
      e = this.e;
    t <= e.h || this._canFit(t)
      ? (e.h = t)
      : this.mode === "normal" &&
        (this.stance =
          e.h <= PLAYER_STANCES.prone.h + 0.01 ? "prone" : "crouch");
  }
  _setStance(t) {
    this.stance !== t &&
      ((this.stance = t),
      this.ev.stance++,
      t !== "stand" && this.e.onGround && this.ctx.audio.foley(t));
  }
  addShake(t) {
    this.shake = Math.min(1.2, this.shake + t);
  }
  nudge(t, e) {
    ((this.kickPitch += t), (this.kickRoll += e));
  }
  damage(t, e, s) {
    this.alive &&
      ((this.health -= t),
      (this.lastHurt = this.ctx.time()),
      (this.ev.hurt = (this.ev.hurt | 0) + 1),
      (this.hurtAmt = t),
      (this.hurtFrom = e || null),
      this.addShake(saturate(t / 60) * 0.55),
      (this.kickRoll += randomRange(-1, 1) * 0.02 * Math.min(2, t / 20)),
      (this.kickPitch += randomRange(0.004, 0.012) * Math.min(2, t / 20)),
      this.ctx.onPlayerHurt(t, e, s),
      this.health <= 0 &&
        ((this.health = 0),
        (this.alive = !1),
        (this.killer = s),
        (this.deathT = 0),
        this.ctx.onPlayerDeath(s, e)));
  }
  update(t, e) {
    let { input: s, world: n, audio: i } = this.ctx,
      a = this.e;
    if (!this.alive) {
      this._deadCam(t);
      return;
    }
    let r =
        Math.tan((this.ctx.camera.fov * DEG_TO_RAD) / 2) /
        Math.tan(
          (horizontalFov(settings.fov, this.ctx.camera.aspect) * DEG_TO_RAD) /
            2,
        ),
      l = 0.0022 * settings.sens * r * lerp(1, settings.adsSens, this.adsK);
    ((this.yaw -= s.mx * l),
      (this.pitch = clamp(
        this.pitch - s.my * l * (settings.invertY ? -1 : 1),
        -1.5,
        1.5,
      )));
    let c =
        (s.any(KEY_BINDINGS.forward) ? 1 : 0) -
        (s.any(KEY_BINDINGS.back) ? 1 : 0),
      h =
        (s.any(KEY_BINDINGS.right) ? 1 : 0) -
        (s.any(KEY_BINDINGS.left) ? 1 : 0),
      f = Math.hypot(c, h);
    f > 1 && ((c /= f), (h /= f));
    let u = Math.sin(this.yaw),
      d = Math.cos(this.yaw);
    (Jm.set(-u, 0, -d), t5.set(d, 0, -u));
    let m = Jm.x * c + t5.x * h,
      p = Jm.z * c + t5.z * h,
      x = f > 0,
      g = !!this.k9Pin && this.k9Pin.pinning === this,
      b = s.any(KEY_BINDINGS.sprint) && x && !g,
      v = s.any(KEY_BINDINGS.jump, "pressed") && !g,
      y = s.any(KEY_BINDINGS.crouch, "pressed") && !g,
      M = s.any(KEY_BINDINGS.dive, "pressed") && !g;
    (v && (this.jumpBuf = 0.13),
      y && !a.onGround && (this.slideBuf = 0.22),
      (this.jumpBuf -= t),
      (this.slideCool -= t),
      (this.landSlow -= t),
      (this.slideBuf -= t),
      (this.coyote = a.onGround ? 0.11 : this.coyote - t));
    let w = Math.hypot(this.vel.x, this.vel.z),
      T = e && e.blocksSprint(),
      S = this.ctx.hotel.pool;
    if (
      ((this.inWater = this.ctx.hotel.inPool(a.x, a.z) && a.y < S.water - 0.25),
      this.mode === "mantle")
    )
      this._mantle(t);
    else {
      if (this.mode === "normal") {
        (this.stance === "prone"
          ? v || y
            ? (this._setStance("crouch"), (this.jumpBuf = 0))
            : b && this._canFit(PLAYER_STANCES.stand.h)
              ? this._setStance("stand")
              : M && this._setStance("crouch")
          : M && a.onGround && !(this.sprinting && w > 5)
            ? this._setStance("prone")
            : y &&
              a.onGround &&
              !(this.sprinting && w > 5.2) &&
              this._setStance(this.stance === "crouch" ? "stand" : "crouch"),
          this.stance === "crouch" &&
            b &&
            this._canFit(PLAYER_STANCES.stand.h) &&
            this._setStance("stand"));
        let _ = this.sprinting;
        ((this.sprinting =
          b &&
          this.stance === "stand" &&
          !T &&
          this.adsK < 0.3 &&
          !this.inWater),
          this.sprinting && !_
            ? this.ev.sprint++
            : !this.sprinting && _ && this.ev.sprintEnd++,
          (this.sprintTime = this.sprinting ? this.sprintTime + t : 0));
        let R = this.tac;
        if (
          ((this.tac =
            this.sprinting &&
            c > 0.7 &&
            Math.abs(h) < 0.5 &&
            this.tacT > 0 &&
            a.onGround),
          (this.tacT = this.tac
            ? this.tacT - t
            : Math.min(cI, this.tacT + t * (this.sprinting ? 0.25 : 0.8))),
          R &&
            !this.tac &&
            this.tacT <= 0 &&
            ((this.breathN = 2), (this.breathT = 0.05)),
          this.breathN > 0 &&
            (this.breathT -= t) <= 0 &&
            (i.foley("tac_sprint_breath"),
            this.breathN--,
            (this.breathT = 0.66)),
          this.stance !== "prone" && (this.supine = !1),
          (y || this.slideBuf > 0) &&
            this.sprinting &&
            w > 5.2 &&
            a.onGround &&
            this.slideCool <= 0)
        ) {
          ((this.mode = "slide"),
            (this.slideT = 0),
            (this.slideBuf = 0),
            (this.tac = !1));
          let C = clamp(w * 1.3, 8.6, 11);
          (this.slideDir.set(this.vel.x / w, this.vel.z / w),
            (this.vel.x = this.slideDir.x * C),
            (this.vel.z = this.slideDir.y * C),
            (this.sprinting = !1),
            this.ev.sprintEnd++,
            this.ev.slide++,
            i.slideStart(a.groundCol ? a.groundCol.surf : "marble"),
            (this.fovKick = 1),
            this.addShake(0.16),
            (this.landVel -= 1.1));
        }
        M &&
          (this.sprinting || (!a.onGround && w > 4.5)) &&
          w > 4.5 &&
          this._startDive(w, c);
      }
      if (this.jumpBuf > 0) {
        if (this.stance !== "prone" && this._tryMantle(c >= 0 ? 1 : 0))
          this.jumpBuf = 0;
        else if (
          this.coyote > 0 &&
          this.mode !== "dive" &&
          this.mode !== "bellyslide" &&
          this.stance !== "prone"
        ) {
          this.stance === "crouch" &&
            this.mode === "normal" &&
            this._canFit(PLAYER_STANCES.stand.h) &&
            this._setStance("stand");
          let _ = this.mode === "slide";
          (_ &&
            ((this.mode = "normal"),
            (this.stance = "stand"),
            (this.slideCool = 0.35),
            i.slideStop(),
            this.ev.slideEnd++),
            (this.vel.y = (this.inWater ? fI * 0.75 : fI) * (_ ? 0.93 : 1)),
            (a.onGround = !1),
            (this.coyote = 0),
            (this.jumpBuf = 0),
            this.ev.jump++,
            (this.landVel += 0.7),
            (this.kickPitch -= 0.006),
            i.jump());
        }
      } else
        !a.onGround &&
          c > 0 &&
          this.vel.y < 2 &&
          this.mode === "normal" &&
          s.any(KEY_BINDINGS.jump) &&
          this._tryMantle(1);
    }
    if (this.mode === "normal") {
      let _ =
        this.stance === "prone"
          ? lI
          : this.stance === "crouch"
            ? nZ
            : this.tac
              ? sZ
              : this.sprinting
                ? Fw
                : Bb;
      if (
        (this.adsK > 0.5 &&
          this.stance === "stand" &&
          (_ = Math.min(_, oZ * (e ? e.def.adsMove : 1))),
        e && (_ *= e.def.mobility),
        this.inWater && (_ *= 0.55),
        this.landSlow > 0 && (_ *= 1 - 0.45 * saturate(this.landSlow / 0.22)),
        g && (_ *= 0.3),
        a.onGround)
      ) {
        let R = m * _,
          C = p * _,
          L = R - this.vel.x,
          A = C - this.vel.z,
          O = Math.hypot(L, A),
          H = x && this.vel.x * m + this.vel.z * p > Bb * 0.9 && this.sprinting,
          F = (x ? (H ? 24 : 56) : 40) * t * (this.inWater ? 0.5 : 1);
        O <= F
          ? ((this.vel.x = R), (this.vel.z = C))
          : ((this.vel.x += (L / O) * F), (this.vel.z += (A / O) * F));
      } else if (x) {
        let R = Math.max(w, Bb * 0.8);
        ((this.vel.x += m * 18 * t), (this.vel.z += p * 18 * t));
        let C = Math.hypot(this.vel.x, this.vel.z);
        C > R && ((this.vel.x *= R / C), (this.vel.z *= R / C));
      }
    } else if (this.mode === "slide") {
      this.slideT += t;
      let _ = Math.hypot(this.vel.x, this.vel.z);
      if (
        ((_ = Math.max(
          0,
          _ * Math.exp(-0.75 * t) - (1.2 + this.slideT * 3.2) * t,
        )),
        x)
      ) {
        let C = Math.atan2(this.slideDir.y, this.slideDir.x),
          A = Math.atan2(p, m) - C;
        for (; A > Math.PI;) A -= Math.PI * 2;
        for (; A < -Math.PI;) A += Math.PI * 2;
        let O = C + clamp(A, -1.4 * t, 1.4 * t);
        this.slideDir.set(Math.cos(O), Math.sin(O));
      }
      ((this.vel.x = this.slideDir.x * _), (this.vel.z = this.slideDir.y * _));
      let R = s.any(KEY_BINDINGS.crouch);
      if (
        ((_ < 3.6 ||
          this.slideT > 1.25 ||
          (!a.onGround && this.slideT > 0.2 && this.vel.y < -4) ||
          (this.slideT > 0.28 && y)) &&
          ((this.mode = "normal"),
          (this.slideCool = 0.4),
          i.slideStop(),
          this.ev.slideEnd++,
          (this.stance =
            R || !this._canFit(PLAYER_STANCES.stand.h) ? "crouch" : "stand")),
        a.onGround)
      ) {
        let C = a.groundCol ? a.groundCol.surf : "marble",
          L = this.ctx.fx;
        L.slideDust
          ? L.slideDust(
              Ub.set(a.x, a.y, a.z),
              this.slideDir.x,
              this.slideDir.y,
              C,
            )
          : C !== "carpet" &&
            Math.random() < t * 26 &&
            L.smoke(
              a.x - this.slideDir.x * 0.3,
              a.y + 0.06,
              a.z - this.slideDir.y * 0.3,
              1,
              {
                size: 0.16,
                life: 0.6,
                a: 0.13,
                speed: 0.5,
              },
            );
      }
    } else if (this.mode === "bellyslide") {
      let _ = Math.hypot(this.vel.x, this.vel.z),
        R = Math.max(0, _ - 13 * t);
      (_ > 0 && ((this.vel.x *= R / _), (this.vel.z *= R / _)),
        R < 0.6 &&
          ((this.mode = "normal"), (this.stance = "prone"), this.ev.stance++));
    }
    if (this.mode !== "mantle") {
      ((this.vel.y -= hI * (this.inWater ? 0.55 : 1) * t),
        this.inWater && (this.vel.y *= Math.exp(-2.2 * t)),
        this._setHeight());
      let _ = a.onGround,
        R = this.vel.y,
        C = a.x,
        L = a.z;
      if (
        (n.move(a, this.vel.x * t, this.vel.y * t, this.vel.z * t, {
          step: this.mode === "dive" ? 0 : iZ,
          snap: this.vel.y <= 0 && this.mode !== "dive",
          onPane: (A) => this._hitPane(A),
        }),
        a.stepped && (this.stepOff -= a.stepped),
        a.hitWall && t > 0)
      ) {
        let A = (a.x - C) / t,
          O = (a.z - L) / t;
        (Math.abs(A) < Math.abs(this.vel.x) * 0.5 && (this.vel.x = A),
          Math.abs(O) < Math.abs(this.vel.z) * 0.5 && (this.vel.z = O));
      }
      (a.hitCeil && this.vel.y > 0 && (this.vel.y = 0),
        a.onGround
          ? (_ || this._land(-R), (this.vel.y = 0), (this.airTime = 0))
          : (this.airTime += t),
        this.ctx.physics.pushFrom(
          a.x,
          a.y,
          a.y + a.h,
          a.z,
          a.r + 0.12,
          this.vel.x,
          this.vel.z,
        ));
    }
    if ((this.pos.set(a.x, a.y, a.z), a.y < -7)) {
      ((this.health = 0),
        (this.alive = !1),
        (this.killer = null),
        (this.deathT = 0),
        this.ctx.onPlayerDeath(null, null, "fell"));
      return;
    }
    if (
      ((this.speed = Math.hypot(this.vel.x, this.vel.z)),
      (this.moveX = (this.vel.x * t5.x + this.vel.z * t5.z) / Fw),
      (this.moveZ = (this.vel.x * Jm.x + this.vel.z * Jm.z) / Fw),
      t > 0)
    ) {
      let _ = clamp((this.vel.x - this.pvx) / t, -70, 70),
        R = clamp((this.vel.z - this.pvz) / t, -70, 70);
      ((this.accR = damp(this.accR, _ * t5.x + R * t5.z, 16, t)),
        (this.accF = damp(this.accF, _ * Jm.x + R * Jm.z, 16, t)),
        (this.pvx = this.vel.x),
        (this.pvz = this.vel.z));
    }
    let E = a.onGround && this.mode === "normal";
    if (E && this.speed > 0.6) {
      let _ = this.stance === "prone" ? 1.5 : 1.75 + 0.27 * this.speed,
        R = this.stepPhase;
      ((this.stepPhase += _ * t),
        Math.floor(this.stepPhase) !== Math.floor(R) &&
          this._footfall(
            this.sprinting ? 1 : this.stance !== "stand" ? 0.45 : 0.68,
            !0,
          ));
    } else if (E) {
      let _ = this.stepPhase - Math.floor(this.stepPhase);
      _ > 0.02 &&
        ((this.stepPhase = Math.min(
          Math.ceil(this.stepPhase),
          this.stepPhase + 3.4 * t,
        )),
        this.stepPhase === Math.ceil(this.stepPhase) &&
          _ > 0.3 &&
          this.bobAmt > 0.25 &&
          this._footfall(0.4, !1));
    }
    this._camera(t, e);
  }
  _footfall(t, e) {
    let { audio: s } = this.ctx,
      n = this.e,
      i = this.ctx.hotel.pool;
    this.footSide = -this.footSide;
    let a = this.inWater || (this.ctx.hotel.inPool(n.x, n.z) && n.y < -0.2),
      r = a ? "water" : n.groundCol ? n.groundCol.surf : "marble";
    (this.stance === "prone" && !a
      ? s.foley("crouch")
      : s.footstep(r, null, {
          run: this.sprinting && e,
        }),
      a &&
        (this.ctx.fx.splash(Ub.set(n.x, i.water, n.z), 0.4),
        this.ctx.hotel.ripple(n.x, n.z, 0.6)),
      this.ev.foot++,
      (this.ev.footSide = this.footSide),
      (this.ev.footStr = t),
      this.ctx.fx.footstep &&
        this.ctx.fx.footstep(Ub.set(n.x, n.y, n.z), r, t, this.sprinting));
    let l = 1 - this.adsK * 0.6;
    ((this.landVel -= (0.1 + 0.3 * t) * l),
      (this.kickRoll += this.footSide * 0.0042 * t * l),
      this.ctx.onPlayerStep(this.sprinting));
  }
  _startDive(t, e) {
    let { audio: s } = this.ctx,
      n = clamp(t * 1.12, 7.4, 9.6);
    ((this.vel.x *= n / t),
      (this.vel.z *= n / t),
      (this.vel.y = this.e.onGround ? 4.5 : Math.max(this.vel.y, 2.4)),
      (this.mode = "dive"),
      (this.stance = "prone"),
      this.sprinting && this.ev.sprintEnd++,
      (this.sprinting = !1),
      (this.e.onGround = !1),
      (this.coyote = 0),
      (this.diveBack = e < -0.3),
      this.ev.dive++,
      s.dive(),
      (this.fovKick = 0.8));
  }
  _hitPane(t) {
    let e = this.mode === "slide" || this.mode === "dive" || !this.e.onGround,
      s = this.vel,
      n = this.ctx.glass.bodyHit(
        t,
        this.e.x,
        this.e.y + this.e.h * 0.55,
        this.e.z,
        s.x,
        s.y,
        s.z,
        e && Math.hypot(s.x, s.z) > 3.2,
      );
    return (
      n &&
        (this.addShake(0.3),
        (this.kickRoll += randomRange(-0.02, 0.02)),
        this.ctx.onGlassCrash()),
      n
    );
  }
  _land(t) {
    let { audio: e } = this.ctx,
      s = this.e,
      n = s.groundCol ? s.groundCol.surf : "marble";
    (this.ev.land++,
      (this.ev.landImp = saturate(t / 12)),
      this.ctx.fx.land &&
        t > 3 &&
        this.ctx.fx.land(Ub.set(s.x, s.y, s.z), n, saturate(t / 12)),
      this.mode === "dive"
        ? ((this.mode = "bellyslide"),
          e.diveLand(n),
          (this.landVel -= 2.6),
          this.addShake(0.34),
          (this.kickPitch += 0.03),
          (this.ev.landImp = 1),
          (this.supine = this.diveBack))
        : t > 3 &&
          (e.land(saturate(t / 14), n),
          (this.landVel -= Math.min(4.8, t * 0.34)),
          (this.kickPitch += Math.min(0.03, t * 0.0022)),
          t > 7 &&
            ((this.landSlow = 0.22), this.addShake(saturate((t - 7) / 20))),
          t > 15.5 && this.damage((t - 15.5) * 9, null, null),
          (this.stepPhase = Math.ceil(this.stepPhase))),
      this.ctx.hotel.inPool(s.x, s.z) &&
        s.y < -0.3 &&
        (this.ctx.fx.splash(Ub.set(s.x, this.ctx.hotel.pool.water, s.z), 1.4),
        this.ctx.hotel.ripple(s.x, s.z, 1.5),
        e.footstep("water", null, {
          run: !0,
        })));
  }
  _tryMantle(t) {
    if (!t || this.mode === "mantle") return !1;
    let { world: e } = this.ctx,
      s = this.e,
      n = Math.sin(this.yaw),
      i = Math.cos(this.yaw),
      a = -n,
      r = -i,
      l = s.onGround ? 1.5 : 2.05,
      c = -1e9,
      h = 0;
    for (let g of [0.5, 0.68, 0.86]) {
      let b = e.groundAt(s.x + a * g, s.z + r * g, s.y + l);
      b > c + 0.05 && ((c = b), (h = g));
    }
    let f = c - s.y;
    if (f < 0.55 || f > l) return !1;
    let u = s.x + a * (h + 0.12),
      d = s.z + r * (h + 0.12),
      m = s.r,
      p = PLAYER_STANCES.crouch.h + 0.03;
    if (
      e.overlap(u - m, c + 0.04, d - m, u + m, c + p, d + m, !0) ||
      e.overlap(
        s.x - 0.28,
        s.y + s.h,
        s.z - 0.28,
        s.x + 0.28,
        c + p,
        s.z + 0.28,
        !0,
      )
    )
      return !1;
    let x = f <= 1.08;
    return (
      (this.mantle = {
        t: 0,
        dur: x ? 0.2 + f * 0.13 : 0.26 + f * 0.2,
        x0: s.x,
        y0: s.y,
        z0: s.z,
        x1: u,
        y1: c + 0.02,
        z1: d,
        keep: Math.hypot(this.vel.x, this.vel.z),
        vault: x,
      }),
      this.mode === "slide" && (this.ctx.audio.slideStop(), this.ev.slideEnd++),
      (this.mode = "mantle"),
      (this.stance = "crouch"),
      this.sprinting && this.ev.sprintEnd++,
      (this.sprinting = !1),
      this.ev.mantle++,
      x ? this.ctx.audio.foley("vault") : this.ctx.audio.mantle(),
      !0
    );
  }
  _mantle(t) {
    let e = this.mantle,
      s = this.e;
    e.t += t / e.dur;
    let n = saturate(e.t),
      i = db(saturate(n / 0.62)),
      a = db(saturate((n - 0.38) / 0.62));
    if (
      ((s.x = lerp(e.x0, e.x1, a)),
      (s.z = lerp(e.z0, e.z1, a)),
      (s.y = lerp(e.y0, e.y1, i)),
      (s.h = PLAYER_STANCES.crouch.h),
      (this.tiltPitch = damp(
        this.tiltPitch,
        -0.14 * Math.sin(n * Math.PI),
        20,
        t,
      )),
      (this.roll = damp(this.roll, 0.05 * Math.sin(n * Math.PI), 14, t)),
      n >= 1)
    ) {
      ((this.mode = "normal"), (this.mantle = null), (s.onGround = !0));
      let r = Math.sin(this.yaw),
        l = Math.cos(this.yaw),
        c = Math.min(e.keep, e.vault ? Fw : Bb);
      (this.vel.set(-r * c, 0, -l * c),
        (this.stance = this._canFit(PLAYER_STANCES.stand.h)
          ? "stand"
          : "crouch"),
        (this.landVel -= 1.2),
        this.ev.land++,
        (this.ev.landImp = 0.35),
        this.ctx.audio.land(0.25, s.groundCol ? s.groundCol.surf : "marble"));
    }
  }
  _deadCam(t) {
    this.deathT += t;
    let e = this.e;
    (e.y > -7 &&
      ((this.vel.y -= hI * t),
      (this.vel.x *= Math.exp(-3 * t)),
      (this.vel.z *= Math.exp(-3 * t)),
      (e.h = 0.4),
      this.ctx.world.move(e, this.vel.x * t, this.vel.y * t, this.vel.z * t, {
        step: 0,
      }),
      e.onGround && (this.vel.y = 0)),
      this.pos.set(e.x, e.y, e.z),
      (this.eyeH = damp(this.eyeH, 0.22, 7, t)),
      (this.roll = damp(this.roll, 0.9, 5, t)));
    let s = this.ctx.camera;
    (s.position.set(e.x, e.y + this.eyeH, e.z),
      s.rotation.set(damp(s.rotation.x, 0.25, 3, t), this.yaw, this.roll),
      (s.fov = damp(s.fov, horizontalFov(settings.fov, s.aspect) - 8, 3, t)),
      s.updateProjectionMatrix(),
      this.eye.copy(s.position));
  }
  _camera(t, e) {
    let s = this.ctx.camera,
      n = this.e,
      i = this.shape();
    ((this.eyeH = damp(
      this.eyeH,
      i.eye,
      this.mode === "slide" || this.mode === "dive" ? 16 : 11,
      t,
    )),
      (this.stepOff = damp(this.stepOff, 0, 13, t)),
      (this.landVel += (-this.landDip * 170 - this.landVel * 19) * t),
      (this.landDip += this.landVel * t),
      (this.landDip = clamp(this.landDip, -0.32, 0.12)));
    let a = n.onGround && this.mode === "normal" && this.speed > 0.5;
    this.bobAmt = damp(this.bobAmt, a ? saturate(this.speed / Bb) : 0, 8, t);
    let r = this.stepPhase,
      l = Math.sin(Math.PI * r),
      c = Math.abs(l),
      h = this.bobAmt * (1 - this.adsK * 0.62),
      f = this.sprinting ? 1 : 0,
      u = this.stance !== "stand" ? 1 : 0;
    this.crawlK = damp(
      this.crawlK,
      a && this.stance === "prone" ? saturate(this.speed / lI) : 0,
      7,
      t,
    );
    let d = this.crawlK * (1 - this.adsK * 0.7),
      m =
        (Math.pow(c, 0.85) - 0.62) * (0.03 + 0.024 * f - 0.01 * u) * h +
        (0.5 - Math.pow(c, 0.7)) * 0.014 * d,
      p = l * (0.016 + 0.014 * f) * h + l * 0.02 * d,
      x = l * (0.0045 + 0.008 * f) * h + l * 0.015 * d,
      g =
        Math.cos(2 * Math.PI * r) * (0.0022 + 0.004 * f) * h +
        Math.cos(2 * Math.PI * r) * 0.006 * d;
    this.breath +=
      t * (1 + this.bobAmt * 0.6 + (this.sprintTime > 1 ? 0.5 : 0));
    let b = 1 - this.bobAmt,
      v = Math.sin(this.breath * 1.55) * 0.0028 * b,
      y = Math.sin(this.breath * 1.55 + 1.1) * 0.0017 * b;
    ((this.tiltA = damp(
      this.tiltA,
      clamp(this.accF * 55e-5, -0.018, 0.018),
      9,
      t,
    )),
      (this.tiltR = damp(
        this.tiltR,
        clamp(-this.accR * 7e-4, -0.02, 0.02),
        9,
        t,
      )));
    let M = -this.moveX * 0.024,
      w = 0;
    (this.mode === "slide" &&
      ((M =
        -this.moveX * 0.12 -
        0.04 *
          (this.moveZ >= 0 ? 1 : -1) *
          (Math.abs(this.moveX) < 0.3 ? 1 : 0)),
      (w = 0.035 * Math.sign(this.moveZ || 1))),
      this.mode === "dive" &&
        ((w = this.diveBack ? 0.16 : -0.1), (M = -this.moveX * 0.15)),
      this.mode === "bellyslide" && (w = 0.04),
      (this.kickRoll = damp(this.kickRoll, 0, 9, t)),
      (this.kickPitch = damp(this.kickPitch, 0, 11, t)),
      (this.kickRS = damp(this.kickRS, this.kickRoll, 70, t)),
      (this.kickPS = damp(this.kickPS, this.kickPitch, 70, t)),
      this.mode !== "mantle" &&
        ((this.roll = damp(this.roll, M, 10, t)),
        (this.tiltPitch = damp(this.tiltPitch, w, 9, t))));
    let T = e && e.recoil ? e.recoil.step(t, this) : aZ;
    ((this.shake = Math.max(0, this.shake - t * 1.7)),
      (this.gunShake = Math.max(
        0,
        Math.min(this.shake, (this.gunShake || 0) - t * 1.7),
      )));
    let S = this.shake - this.gunShake,
      E = S * S,
      _ = this.ctx.time() * 37,
      R = (Math.sin(_ * 1.3) + Math.sin(_ * 2.7)) * 0.012 * E,
      C = (Math.sin(_ * 1.7 + 2) + Math.sin(_ * 3.1)) * 0.012 * E,
      L = Math.sin(_ * 2.1 + 1) * 0.02 * E,
      A = this.mode === "slide" && n.onGround ? Math.min(1, this.speed / 9) : 0,
      O = A * Math.sin(_ * 2.9) * 0.004,
      H = A * Math.sin(_ * 2.3) * 0.004,
      F = Math.cos(this.yaw),
      P = Math.sin(this.yaw);
    (s.position.set(
      n.x + F * p,
      n.y + this.eyeH + this.stepOff + this.landDip + m + v + O,
      n.z - P * p,
    ),
      s.rotation.set(
        this.pitch +
          this.recoilPitch +
          this.tiltPitch +
          this.tiltA +
          this.kickPS +
          g +
          y +
          C +
          T.pitch,
        this.yaw + this.recoilYaw + R + T.yaw,
        this.roll + this.tiltR + this.kickRS + x + H + L + T.roll,
      ),
      T.back !== 0 && (s.translateZ(T.back), s.translateY(T.up)),
      (this.fovKick = damp(this.fovKick, 0, 3.2, t)));
    let z = horizontalFov(settings.fov, s.aspect),
      k =
        (this.sprinting ? 4.5 : 0) +
        (this.tac ? 2.5 : 0) +
        (this.mode === "slide" ? 7 : 0) +
        (this.mode === "dive" ? 4 : 0) +
        this.fovKick * 5;
    this.wideK = damp(this.wideK, k, 7, t);
    let I = lerp(1, this.zoom, this.adsK);
    ((s.fov =
      (2 *
        Math.atan(Math.tan(((z + this.wideK + T.fov) * DEG_TO_RAD) / 2) / I)) /
      DEG_TO_RAD),
      s.updateProjectionMatrix(),
      s.updateMatrixWorld(!0),
      this.eye.copy(s.position),
      s.getWorldDirection(this.viewDir));
  }
  getHit(t) {
    let e = this.e,
      s = e.h;
    return (
      t.head.set(e.x, e.y + this.eyeH + 0.04, e.z),
      t.a.set(e.x, e.y + 0.25, e.z),
      t.b.set(e.x, e.y + Math.max(0.3, s - 0.42), e.z),
      t
    );
  }
};

export { PlayerController };

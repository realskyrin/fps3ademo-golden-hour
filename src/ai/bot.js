// ai/bot.js: recovered from the verified GOLDEN HOUR release.
import { Vector2, Vector3 } from "../vendor/three-r180.js";
import { WEAPON_DEFINITIONS } from "../weapons/definitions.js";
import {
  SL,
  angleDelta,
  damp,
  dampAngle,
  randomRange,
  saturate,
} from "../core/math.js";
import { DIFFICULTIES, settings } from "../core/settings.js";

var ju = new Vector3();
var o7 = new Vector3();
var iC = new Vector3();
var Jy = new Vector3();
var qp = new Vector3();
var Af = new Vector3();
var Et0 = 1.6;
var cB = 0;
var Tt0 = {
  ar: [
    {
      optic: "reflex",
    },
    {
      optic: "holo",
      muzzle: "comp",
      camo: "dune",
    },
    {
      optic: "reflex",
      muzzle: "suppressor",
      underbarrel: "vgrip",
      camo: "timberline",
    },
  ],
  smg: [
    {
      optic: "irons",
    },
    {
      optic: "reflex",
      muzzle: "suppressor",
      camo: "fracture",
    },
    {
      optic: "holo",
      underbarrel: "vgrip",
      camo: "dune",
    },
  ],
  shotgun: [
    {
      optic: "irons",
    },
    {
      optic: "reflex",
      muzzle: "choke",
      camo: "tigerstripe",
    },
  ],
  pistol: [{}],
};
var BotController = class {
  constructor(context, { team: team, name: name, weapon: weapon }) {
    ((this.ctx = context),
      (this.team = team),
      (this.name = name),
      (this.isPlayer = !1),
      (this.def = WEAPON_DEFINITIONS[weapon]));
    let i = Tt0[weapon] || [{}];
    ((this.build = {
      camo: "factory",
      muzzle: "none",
      underbarrel: "none",
      magazine: "std",
      stock: "std",
      ...i[cB % i.length],
    }),
      (this.suppressed = this.build.muzzle === "suppressor"));
    let a = (r) => context.worldGun(r, r === weapon ? this.build : null);
    this.rigs = [
      context.createCharacter({
        team: team,
        gunFactory: a,
        ground: (r, l, c) => context.world.groundAt(r, l, c),
      }),
      context.createCharacter({
        team: team,
        gunFactory: a,
        ground: (r, l, c) => context.world.groundAt(r, l, c),
      }),
    ];
    for (let r of this.rigs)
      (r.setWeapon(weapon),
        (r.root.visible = !1),
        context.scene.add(r.root),
        r.root.traverse((l) => {
          l.isMesh && ((l.castShadow = !0), (l.frustumCulled = !1));
        }));
    ((this.rigI = 0),
      (this.char = this.rigs[0]),
      (this.e = {
        x: 0,
        y: 0,
        z: 0,
        r: 0.3,
        h: 1.8,
        onGround: !0,
        groundCol: null,
      }),
      (this.pos = new Vector3()),
      (this.vel = new Vector3()),
      (this.eye = new Vector3()),
      (this.hit = this.char.hit),
      (this.kills = 0),
      (this.deaths = 0),
      (this.score = 0),
      (this.streak = 0),
      (this.seed = cB++ * 1.37 + 0.5),
      (this.think = randomRange(0, 0.2)),
      (this.alive = !1),
      (this.respawnT = 0),
      (this.corpses = []),
      (this.state = {
        pos: this.pos,
        yaw: 0,
        pitch: 0,
        speed: 0,
        moveX: 0,
        moveZ: 0,
        stance: "stand",
        sprint: !1,
        airborne: !1,
        reloading: !1,
        dead: !1,
      }),
      (this.skill = randomRange(0.85, 1.2)));
  }
  spawn(t, e, s, n) {
    this.corpses.some((a) => a.char === this.char) &&
      ((this.rigI = 1 - this.rigI),
      (this.char = this.rigs[this.rigI]),
      this._freeCorpse(this.char));
    let i = this.char;
    (i.reset && i.reset(),
      i.setWeapon(this.def.id),
      i.setOpacity(1),
      (i.root.visible = !0),
      (this.hit = i.hit),
      (this.e.x = t),
      (this.e.y = e + 0.01),
      (this.e.z = s),
      (this.e.h = 1.8),
      (this.e.onGround = !0),
      this.pos.set(t, e, s),
      this.vel.set(0, 0, 0),
      (this.yaw = this.aimYaw = n),
      (this.aimPitch = 0),
      (this.health = 100),
      (this.alive = !0),
      (this.lastHurt = -99),
      (this.ammo = this.def.mag),
      (this.reload = 0),
      (this.cool = 0),
      (this.burst = 0),
      (this.burstCool = randomRange(0.2, 0.6)),
      (this.target = null),
      (this.seen = 0),
      (this.lastSeen = new Vector3()),
      (this.lastSeenT = -99),
      (this.alert = 0),
      (this.mode = "patrol"),
      (this.path = []),
      (this.pi = 0),
      (this.goal = -1),
      (this.repath = 0),
      (this.strafe = 0),
      (this.strafeT = 0),
      (this.crouch = !1),
      (this.crouchT = 0),
      (this.stuck = 0),
      (this.stride = 0),
      (this.aimErr = new Vector2(randomRange(-1, 1), randomRange(-1, 1))),
      (this.settle = 0),
      (this.jumpCool = 0),
      (this.hearT = 0),
      (this.spawnT = this.ctx.time()),
      (this.frags = 1));
  }
  _freeCorpse(t) {
    let e = this.corpses.findIndex((s) => s.char === t);
    if (e >= 0) {
      let s = this.corpses[e];
      (this.ctx.physics.removeBody(s.body),
        s.gun &&
          (this.ctx.physics.removeBody(s.gun),
          s.gun.obj && s.gun.obj.removeFromParent()),
        this.corpses.splice(e, 1));
    }
  }
  damage(t, e, s) {
    ((this.health -= t), (this.lastHurt = this.ctx.time()));
    let n = s && s.k9 && s.k9.alive ? s.k9 : e;
    (n &&
      n !== this &&
      n.alive &&
      (!this.target || this.target !== n) &&
      ((this.hearT = this.ctx.time()),
      this.lastSeen.copy(n.pos),
      (this.lastSeenT = this.ctx.time()),
      this.target ||
        ((this.mode = "hunt"), (this.alert = 1), this._lookAt(n.pos, 0.35))),
      this.char.flinch && s && s.dir
        ? this.char.flinch(s.dir, Math.min(1, t / 40))
        : this.char.kick(),
      this.health <= 0 && this.die(e, s));
  }
  die(t, e) {
    let { physics: s, time: n } = this.ctx;
    ((this.alive = !1),
      (this.health = 0),
      (this.respawnT = 4.2),
      (this.target = null));
    let i = this.char;
    (Af.set(0, 0, 0),
      e &&
        e.dir &&
        Af.copy(e.dir).multiplyScalar(
          e.blast
            ? 7.5
            : e.weapon === "shotgun" || e.weapon === "melee"
              ? 5
              : e.weapon === "k9"
                ? 3.8
                : 3.2,
        ),
      e && e.blast ? (Af.y += 4.5) : (Af.y += 0.6),
      e && e.head && !e.blast && (Af.multiplyScalar(0.3), (Af.y = -1.4)),
      e && e.weapon === "k9" && (Af.y = -2.4));
    let a = s.addRagdoll(i, this.vel, e ? e.point : null, Af),
      r = {
        char: i,
        body: a,
        t: 0,
        gun: null,
      };
    if (i.dropWeapon) {
      let l = i.dropWeapon();
      l &&
        ((r.gun = s.addProp(l, {
          size: [0.07, 0.2, 0.7],
          center: [0, 0, -0.2],
          mass: 3.5,
          mat: "metal",
        })),
        (r.gun.temp = !0),
        (r.gun.life = 14),
        s.wake(r.gun),
        s.impulse(
          r.gun,
          l.position.x,
          l.position.y,
          l.position.z,
          this.vel.x * 3 + Af.x,
          4,
          this.vel.z * 3 + Af.z,
        ));
    }
    (this.corpses.push(r), (this.diedAt = n()));
  }
  _lookAt(t, e) {
    let s = t.x - this.pos.x,
      n = t.z - this.pos.z;
    ((this.wantYaw = Math.atan2(-s, -n)), (this.wantYawK = e));
  }
  _pickGoal() {
    let { nav: t, match: e } = this.ctx,
      s,
      n,
      i = e.nearestEnemy(this);
    if (i && Math.random() < 0.72)
      ((s = i.pos.x + randomRange(-9, 9)), (n = i.pos.z + randomRange(-9, 9)));
    else {
      let l = SL(t.nodes);
      ((s = l.x), (n = l.z));
    }
    let a = -1,
      r = 1e9;
    for (let l of t.nodes) {
      let c = Math.hypot(l.x - s, l.z - n) + randomRange(0, 4);
      c < r && ((r = c), (a = l.i));
    }
    this._goTo(a);
  }
  _goTo(t) {
    let { nav: e } = this.ctx,
      s = e.nearest(this.pos.x, this.pos.y, this.pos.z);
    if (
      ((this.path = e.path(s, t)),
      (this.pi = 0),
      (this.goal = t),
      (this.repath = randomRange(4, 7)),
      this.path.length > 1)
    ) {
      let n = e.nodes[this.path[0]],
        i = e.nodes[this.path[1]],
        a = Math.hypot(i.x - n.x, i.z - n.z);
      Math.hypot(i.x - this.pos.x, i.z - this.pos.z) < a &&
        Math.abs(i.y - this.pos.y) < 0.6 &&
        e.walkable(this.pos, i) &&
        (this.pi = 1);
    }
  }
  _perceive(t) {
    let { match: e, world: s, time: n } = this.ctx,
      i = n();
    this.eye.set(
      this.pos.x,
      this.pos.y + (this.crouch ? 1.05 : Et0),
      this.pos.z,
    );
    let a = null,
      r = 1e9,
      l = -Math.sin(this.aimYaw),
      c = -Math.cos(this.aimYaw);
    for (let h of e.actors) {
      if (
        h === this ||
        !h.alive ||
        h.team === this.team ||
        (i - (h.spawnT || 0) < 1.2 && !h.isPlayer)
      )
        continue;
      let f = h.pos.x - this.pos.x,
        u = h.pos.z - this.pos.z,
        d = h.pos.y - this.pos.y,
        m = Math.hypot(f, u);
      if (m > 60 || Math.abs(d) > 9) continue;
      let p = (f * l + u * c) / (m || 1),
        x = h.isK9 && h.target === this && m < 13,
        g =
          (h.lastShot !== void 0 && i - h.lastShot < 0.6 && m < 34) ||
          (h.isPlayer && h.sprinting && m < 9) ||
          x;
      if (
        (p < 0.25 && m > 3.5 && !g && h !== this.target) ||
        (o7.set(h.pos.x, h.pos.y + (h.e.h > 1.3 ? 1.25 : h.e.h * 0.6), h.pos.z),
        !s.clear(this.eye, o7) &&
          ((o7.y = h.pos.y + h.e.h - 0.12), !s.clear(this.eye, o7)))
      )
        continue;
      let b =
        m -
        (h === this.target ? 6 : 0) -
        (g ? 4 : 0) -
        (h.isK9 ? (x ? 8 : 2) : 0);
      b < r && ((r = b), (a = h));
    }
    a
      ? (this.target !== a &&
          ((this.target = a),
          (this.seen = 0),
          (this.settle = 0),
          this.aimErr
            .set(randomRange(-1, 1), randomRange(-1, 1))
            .multiplyScalar(1.6)),
        this.lastSeen.copy(a.pos),
        (this.lastSeenT = i),
        (this.mode = "engage"))
      : this.target &&
        (this._maybeFrag(this.target),
        (this.target = null),
        (this.mode = "hunt"),
        (this.huntT = randomRange(4, 7)),
        this._goTo(
          this.ctx.nav.nearest(
            this.lastSeen.x,
            this.lastSeen.y,
            this.lastSeen.z,
            !1,
          ),
        ));
  }
  idle(t) {
    if (!this.alive) return;
    let e = this.state;
    ((e.yaw = this.yaw),
      (e.pitch = 0),
      (e.speed = 0),
      (e.moveX = e.moveZ = 0),
      (e.stance = "stand"),
      (e.sprint = !1),
      (e.airborne = !1),
      (e.reloading = !1),
      this.char.update(t, e));
  }
  update(t) {
    let {
        world: e,
        physics: s,
        audio: n,
        fx: i,
        nav: a,
        match: r,
        time: l,
      } = this.ctx,
      c = l();
    for (let z = this.corpses.length - 1; z >= 0; z--) {
      let k = this.corpses[z];
      if (((k.t += t), k.t > 9)) {
        let I = saturate(1 - (k.t - 9) / 1.5);
        (k.char.setOpacity(I),
          I <= 0 &&
            ((k.char.root.visible = !1),
            k.char.setOpacity(1),
            this._freeCorpse(k.char)));
      }
    }
    if (!this.alive) {
      ((this.fragP = null),
        r.live && (this.respawnT -= t) <= 0 && r.respawn(this));
      return;
    }
    if (this.fragP && (this.fragP.t -= t) <= 0) {
      let z = this.fragP;
      ((this.fragP = null),
        ju.set(
          this.pos.x + z.dx * 0.4,
          this.pos.y + 1.5,
          this.pos.z + z.dz * 0.4,
        ),
        qp.set(z.vx, z.vy, z.vz),
        s.throwGrenade(this.ctx.buildGrenade(), ju, qp, 2.6, this),
        n.grenadeBounce(ju));
    }
    let h = DIFFICULTIES[settings.difficulty],
      f = this.e;
    (this.think -= t) <= 0 &&
      ((this.think = 0.14 + randomRange(0, 0.06)), this._perceive(t));
    let u = this.target;
    ((this.reload -= t),
      (this.cool -= t),
      (this.burstCool -= t),
      (this.repath -= t),
      (this.strafeT -= t),
      (this.crouchT -= t),
      (this.jumpCool -= t),
      this.health < 100 &&
        c - this.lastHurt > 5 &&
        (this.health = Math.min(100, this.health + 22 * t)));
    let d = 0,
      m = 0,
      p = !1,
      x = !1,
      g = (z) => {
        if (this.pi >= this.path.length) return !1;
        let k = a.nodes[this.path[this.pi]],
          I = k.x - this.pos.x,
          G = k.z - this.pos.z,
          K = Math.hypot(I, G);
        return K < 0.55 && Math.abs(k.y - this.pos.y) < 1.2
          ? (this.pi++, this.pi < this.path.length)
          : ((d = I / K), (m = G / K), (p = z), !0);
      };
    if (this.mode === "engage" && u) {
      let z = u.pos.x - this.pos.x,
        k = u.pos.z - this.pos.z,
        I = Math.hypot(z, k),
        G = this.def.id === "shotgun" ? 6 : this.def.id === "smg" ? 11 : 17,
        K = this.health < 38 || this.reload > 0;
      this.strafeT <= 0 &&
        ((this.strafe = Math.random() < 0.2 ? 0 : Math.random() < 0.5 ? -1 : 1),
        (this.strafeT = randomRange(0.5, 1.5)),
        this.crouchT <= 0 &&
          ((this.crouch = Math.random() < 0.22 && I > 7),
          (this.crouchT = randomRange(1.2, 2.6))));
      let $ = z / (I || 1),
        n0 = k / (I || 1),
        e0 = I > G * 1.25 ? 1 : I < G * 0.5 ? -0.8 : 0;
      ((K || (u.isK9 && I < 9)) && (e0 = -1),
        (d = $ * e0 + -n0 * this.strafe * 0.9),
        (m = n0 * e0 + $ * this.strafe * 0.9));
      let p0 = Math.hypot(d, m);
      (p0 > 1 && ((d /= p0), (m /= p0)),
        p0 > 0.01 &&
          e.groundAt(
            this.pos.x + d * 0.9,
            this.pos.z + m * 0.9,
            this.pos.y + 0.5,
          ) <
            this.pos.y - 0.6 &&
          ((d = 0), (m = 0), (this.strafeT = 0)),
        (x = this.crouch && e0 === 0 && !u.isK9),
        e0 > 0 &&
          I > G * 2 &&
          this.repath <= 0 &&
          this._goTo(a.nearest(u.pos.x, u.pos.y, u.pos.z, !1)),
        e0 > 0 && I > G * 2 && this.path.length && g(!1));
    } else
      this.mode === "hunt"
        ? ((this.huntT -= t),
          (!g(!0) || this.huntT <= 0) &&
            ((this.mode = "patrol"), (this.path = [])))
        : ((this.pi >= this.path.length || this.repath <= -6) &&
            this._pickGoal(),
          g(c - this.lastHurt > 3 && this.alert < 0.3));
    this.alert = Math.max(0, this.alert - t * 0.2);
    let b = this.ctx.hotel;
    if (b && f.y < -0.4 && b.inPool(f.x, f.z)) {
      let z = b.pool,
        k = f.x - z.x0,
        I = z.x1 - f.x,
        G = f.z - z.z0,
        K = z.z1 - f.z,
        $ = Math.min(k, I, G, K);
      ((d = $ === k ? -1 : $ === I ? 1 : 0),
        (m = $ === G ? -1 : $ === K ? 1 : 0),
        (p = !1),
        $ < 0.75 &&
          f.onGround &&
          this.jumpCool <= 0 &&
          ((this.vel.y = 8.6), (f.onGround = !1), (this.jumpCool = 0.9)));
    }
    let v =
        (x ? 2.4 : p ? 6.3 : this.mode === "engage" ? 3.6 : 4.4) *
        (this.reload > 0 ? 0.85 : 1),
      y = d * v,
      M = m * v,
      w = y - this.vel.x,
      T = M - this.vel.z,
      S = Math.hypot(w, T),
      E = 34 * t;
    S <= E
      ? ((this.vel.x = y), (this.vel.z = M))
      : ((this.vel.x += (w / S) * E), (this.vel.z += (T / S) * E));
    for (let z of r.actors) {
      if (z === this || !z.alive) continue;
      let k = this.pos.x - z.pos.x,
        I = this.pos.z - z.pos.z,
        G = k * k + I * I;
      if (G < 0.72 && G > 1e-4 && Math.abs(z.pos.y - this.pos.y) < 1.5) {
        let K = Math.sqrt(G);
        ((this.vel.x += (k / K) * 5 * t * (0.85 - K) * 10),
          (this.vel.z += (I / K) * 5 * t * (0.85 - K) * 10));
      }
    }
    ((this.vel.y -= 22 * t), (f.h = x ? 1.2 : 1.8));
    let _ = f.x,
      R = f.z;
    (e.move(f, this.vel.x * t, this.vel.y * t, this.vel.z * t, {
      step: 0.42,
      snap: this.vel.y <= 0,
      onPane: (z) =>
        this.ctx.glass.bodyHit(
          z,
          f.x,
          f.y + 1,
          f.z,
          this.vel.x,
          this.vel.y,
          this.vel.z,
          p,
        ),
    }),
      f.onGround && (this.vel.y = 0));
    let C = Math.hypot(f.x - _, f.z - R),
      L = Math.hypot(this.vel.x, this.vel.z) * t;
    if (
      (L > 0.01 && C < L * 0.35
        ? ((this.stuck += t),
          this.stuck > 0.25 &&
            f.onGround &&
            this.jumpCool <= 0 &&
            ((this.vel.y = 6.6), (f.onGround = !1), (this.jumpCool = 1.2)),
          this.stuck > 1.1 &&
            ((this.stuck = 0),
            (this.strafeT = 0),
            (this.path = []),
            (this.pi = 0),
            this.mode !== "engage" && this._pickGoal()))
        : (this.stuck = Math.max(0, this.stuck - t * 2)),
      this.pos.set(f.x, f.y, f.z),
      f.y < -7)
    ) {
      r.damage(this, 999, this, {
        weapon: "fell",
      });
      return;
    }
    s.pushFrom(f.x, f.y, f.y + f.h, f.z, f.r + 0.1, this.vel.x, this.vel.z);
    let A = Math.hypot(this.vel.x, this.vel.z);
    f.onGround &&
      A > 1.5 &&
      ((this.stride += A * t),
      this.stride > (p ? 1.05 : 0.85) &&
        ((this.stride = 0),
        r.player.pos.distanceToSquared(this.pos) < 24 * 24 &&
          n.footstep(f.groundCol ? f.groundCol.surf : "marble", this.pos, {
            run: p,
          })));
    let O = !1;
    if (u) {
      ((this.seen += t), (this.settle = Math.min(1, this.settle + t * 0.9)));
      let z = u.e.h;
      ju.set(
        u.pos.x,
        u.pos.y + (u.isK9 ? 0.55 : z > 1.3 ? 1.28 : z * 0.62),
        u.pos.z,
      );
      let k = u.vel ? Math.hypot(u.vel.x, u.vel.z) : 0,
        I = ju.distanceTo(this.eye),
        G =
          u.isPlayer &&
          (u.mode === "slide" || u.mode === "dive" || !u.e.onGround)
            ? 1.8
            : 1,
        K =
          (h.aim / this.skill) *
          (0.45 + 0.9 * (1 - this.settle)) *
          (1 + k * 0.16) *
          G,
        $ = c * 1.7 + this.seed * 9,
        n0 =
          (this.aimErr.x * (1 - this.settle * 0.7) +
            Math.sin($) * 0.5 +
            Math.sin($ * 2.3) * 0.3) *
          0.022 *
          K,
        e0 =
          (this.aimErr.y * (1 - this.settle * 0.7) + Math.cos($ * 1.3) * 0.5) *
          0.016 *
          K,
        p0 = ju.x - this.eye.x,
        t0 = ju.y - this.eye.y,
        M0 = ju.z - this.eye.z,
        f0 = Math.hypot(p0, M0),
        _0 = Math.atan2(-p0, -M0) + n0,
        F0 = Math.atan2(t0, f0) + e0,
        m0 = 9.5 / (1 + h.aim * 0.5);
      ((this.aimYaw = dampAngle(this.aimYaw, _0, m0, t)),
        (this.aimPitch = damp(this.aimPitch, F0, m0, t)),
        (this.yaw = dampAngle(this.yaw, this.aimYaw, 10, t)));
      let S0 =
          Math.abs(angleDelta(this.aimYaw, _0)) + Math.abs(this.aimPitch - F0),
        T0 = (h.react / this.skill) * (c - this.hearT < 2 ? 0.6 : 1);
      this.seen > T0 &&
        S0 < 0.09 + (2.2 / (I + 3)) * 0.05 &&
        this.reload <= 0 &&
        I < 55 &&
        (this.burst <= 0 &&
          this.burstCool <= 0 &&
          (this.burst = this.def.auto
            ? Math.round(randomRange(3, 8) * h.burst)
            : 1),
        this.burst > 0 && this.cool <= 0 && (this._shoot(h, I), (O = !0)));
    } else
      (A > 0.6 &&
        !(this.wantYawK > 0) &&
        (this.wantYaw = Math.atan2(-this.vel.x, -this.vel.z)),
        this.wantYaw !== void 0 &&
          ((this.aimYaw = dampAngle(this.aimYaw, this.wantYaw, 6, t)),
          (this.yaw = dampAngle(this.yaw, this.aimYaw, 9, t))),
        (this.wantYawK = Math.max(0, (this.wantYawK || 0) - t)),
        (this.aimPitch = damp(this.aimPitch, 0, 5, t)),
        (this.settle = 0),
        this.ammo < this.def.mag * 0.45 && this.reload <= 0 && this._reload());
    this.ammo <= 0 && this.reload <= 0 && this._reload();
    let H = this.state,
      F = Math.sin(this.yaw),
      P = Math.cos(this.yaw);
    ((H.yaw = this.yaw),
      (H.pitch = this.aimPitch),
      (H.speed = A),
      (H.moveX = (this.vel.x * P + this.vel.z * -F) / (A || 1)),
      (H.moveZ = (this.vel.x * F + this.vel.z * P) / (A || 1)),
      (H.stance = x ? "crouch" : "stand"),
      (H.sprint = p && !u && A > 5),
      (H.airborne = !f.onGround),
      (H.reloading = this.reload > 0),
      (H.engage =
        this.mode === "engage" || c - this.lastHurt < 2.5 || this.alert > 0.35
          ? 1
          : 0),
      (H.aimYaw = this.aimYaw),
      (H.look = this.mode === "hunt" ? this.lastSeen : null),
      (H.reloadDur = this.def.pump ? 2.6 : 2.2),
      (this.sprinting = H.sprint),
      this.char.update(t, H));
  }
  _maybeFrag(t) {
    let { physics: e, time: s, audio: n } = this.ctx;
    if (
      this.frags <= 0 ||
      !t ||
      s() - (this.ctx.match.lastFrag || -99) < 7 ||
      Math.random() > 0.3
    )
      return;
    let i = this.lastSeen.x - this.pos.x,
      a = this.lastSeen.z - this.pos.z,
      r = Math.hypot(i, a);
    if (r < 8 || r > 21 || Math.abs(this.lastSeen.y - this.pos.y) > 1.5) return;
    (this.frags--, (this.ctx.match.lastFrag = s()));
    let l = Math.min(17, Math.sqrt((r * 9.81) / 0.94)),
      c = Math.cos(0.61),
      h = Math.sin(0.61);
    (qp.set((i / r) * l * c, l * h, (a / r) * l * c),
      ju.set(
        this.pos.x + (i / r) * 0.4,
        this.pos.y + 1.5,
        this.pos.z + (a / r) * 0.4,
      ),
      (this.fragP = {
        t: this.char.throwGrenade ? this.char.throwGrenade() : 0,
        vx: qp.x,
        vy: qp.y,
        vz: qp.z,
        dx: i / r,
        dz: a / r,
      }));
  }
  _reload() {
    ((this.reload = this.def.pump ? 2.6 : 2.2),
      (this.ammo = this.def.mag),
      (this.burst = 0),
      this.ctx.match.player.pos.distanceToSquared(this.pos) < 400 &&
        this.ctx.audio.reload(this.def.id, "magout"));
  }
  _shoot(t, e) {
    let { combat: s, audio: n, fx: i, time: a } = this.ctx,
      r = this.def;
    ((this.cool = (60 / r.rpm) * (r.auto ? 1 : randomRange(1.3, 2.2))),
      this.burst--,
      this.ammo--,
      this.burst <= 0 && (this.burstCool = randomRange(0.25, 0.7) / t.burst),
      this.suppressed || (this.lastShot = a()));
    let l = Math.cos(this.aimPitch);
    (iC.set(
      -Math.sin(this.aimYaw) * l,
      Math.sin(this.aimPitch),
      -Math.cos(this.aimYaw) * l,
    ),
      this.char.getMuzzle(Jy));
    let c =
      (r.pellets > 1 ? r.hip[0] : 0.9 + t.aim * 0.9) *
      (1.25 - this.settle * 0.5);
    (s.fire(this, this.eye, iC, r, c, Jy, t.dmg),
      n.gunshot(r.id, Jy, {
        suppressed: this.suppressed,
      }),
      i.muzzle(Jy, iC, r.flash, !0),
      this.char.kick(),
      r.casing !== void 0 &&
        Math.random() < 0.6 &&
        (qp.set(
          Math.cos(this.aimYaw) * 2 + randomRange(-0.5, 0.5),
          randomRange(1.5, 2.5),
          -Math.sin(this.aimYaw) * 2 + randomRange(-0.5, 0.5),
        ),
        this.ctx.physics.casing(Jy, qp, r.casing)));
  }
};
var hB = [
  "Vex",
  "N0VA",
  "Kestrel_7",
  "MrBadger",
  "Ghostline",
  "Ruk",
  "piXel",
  "Atlas",
  "Dune",
  "Hollow",
  "Sable",
  "Wraithe",
  "Juno",
  "Tarmac",
  "Okami",
  "Blitzkrieger",
  "Lumen",
  "Cinder",
  "Rook",
  "Halcyon",
];

export { BotController, hB };

// ai/k9/system.js: recovered from the verified GOLDEN HOUR release.
import { dU, pU } from "./animation.js";
import { Vector3 } from "../../vendor/three-r180.js";
import {
  angleDelta,
  clamp,
  damp,
  randomRange,
  saturate,
} from "../../core/math.js";
import { settings } from "../../core/settings.js";
import { l7, sv } from "./rig.js";

var u1 = dU || {
  walk: 1.6,
  trot: 4.2,
  gallop: 9.5,
};
var Dh = 22;
var _7 = {
  chargeTime: 80,
  chargeStart: 0.5,
  chargePerKill: 0.1,
  hp: 220,
  battery: 40,
  radius: 0.3,
  height: 0.7,
  step: 0.38,
  drop: 1.3,
  accel: 22,
  brake: 26,
  grip: 26,
  turnSlow: 11,
  turnFast: 6.5,
  stairSpeed: 6,
  stairDown: 3.2,
  cornerSpeed: 4,
  barkRange: 9,
  barkHold: 0.3,
  attackRange: 4.5,
  leapSpeed: 11.5,
  leapMin: 0.2,
  leapMax: 0.45,
  lead: 0.9,
  airSteer: 10,
  biteRadius: 0.62,
  leapCooldown: 1,
  hitDamage: 55,
  pinDamage: 45,
  pinJolt: 10,
  shotOff: 60,
  heavyHit: 60,
  circleTime: 1.2,
  circleSpeed: 7.5,
  wreckTime: 10,
  fadeTime: 1.7,
  sink: 0.75,
  destroyScore: 150,
  enemyFirst: [70, 90],
  enemyEvery: [110, 150],
  enemyScale: {
    recruit: 1.35,
    regular: 1,
    hardened: 0.85,
    veteran: 0.7,
  },
};
var ve = _7;
var kC = {
  chargeTime: _7.chargeTime,
  batteryTime: _7.battery,
  health: _7.hp,
};
var e3 = new Vector3();
var s6 = new Vector3();
var eo = new Vector3();
var mU = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
var s3 = [1.6, 3.4, 6.5];
var gU = {
  speed: 4.5,
  color: s3,
  life: 0.8,
};
var es0 = {
  speed: 2.5,
  color: s3,
  life: 0.5,
};
var ss0 = {
  speed: 3,
  color: s3,
  life: 0.8,
};
var ns0 = {
  size: 0.22,
  life: 1.6,
  a: 0.28,
  dy: 1,
  speed: 0.7,
};
var os0 = {
  speed: 1.1,
  color: [7, 1.9, 0.3],
  life: 0.9,
};
var is0 = {
  speed: 2.6,
  life: 0.3,
};
var as0 = {
  marble: 1,
  tile: 1,
  stone: 1,
  concrete: 1,
  metal: 1,
  ceramic: 1,
};
var Ju = (o) => {
  let t = o.e ? o.e.h : 1.8;
  return t > 1.3 ? 1.15 : Math.max(0.28, t * 0.6);
};
var K9System = class {
  constructor(context, match) {
    ((this.ctx = context),
      (this.match = match),
      (this.world = context.world),
      (this.glass = context.glass),
      (this.physics = context.physics),
      (this.fx = context.fx),
      (this.audio = context.audio),
      (this.hotel = context.hotel),
      (this.player = context.player),
      (this.time = context.time),
      (this.nav = context.botCtx.nav),
      (this.scene = context.botCtx.scene),
      (this.groundFn = (n, i, a) => this.world.groundAt(n, i, a)),
      (this.clearFn = (n, i) => this.world.clear(n, i)),
      (this.units = []),
      (this.pool = [[], []]),
      (this.view = {
        state: "charging",
        charge: 0,
        key: "B",
        hp: 0,
        time: 0,
        kills: 0,
        enemyActive: !1,
        chargeTime: ve.chargeTime,
        batteryTime: ve.battery,
      }),
      (this.charge = ve.chargeStart),
      (this.wasReady = !1),
      (this.denyT = -9),
      (this.enemyT = 80),
      (this.pending = null),
      (this.log = []),
      (this.events = []),
      (this.stepOpts = {
        surf: "marble",
        gait: "walk",
        strength: 1,
        leg: 0,
        id: "",
      }),
      (this.sfxOpts = {
        dur: 0,
        surf: "marble",
        hostile: !1,
      }),
      (this.spot = {
        x: 0,
        y: 0,
        z: 0,
        tx: 0,
        ty: 0,
        tz: 0,
        h: 0,
        kind: "",
      }),
      (this.prof = {
        on: !1,
        logic: 0,
        rig: 0,
        n: 0,
        max: 0,
      }),
      (this.nodeBudget = 3),
      (this._ci = new Int16Array(16)),
      (this._cd = new Float32Array(16)),
      this._buildNav(),
      this._make(0),
      this._make(1));
    let s = this;
    this.debug = {
      tune: ve,
      sys: s,
      charge(n = 1) {
        return ((s.charge = saturate(n)), s.charge);
      },
      deploy() {
        return ((s.charge = 1), !!s.release());
      },
      enemy(n, i) {
        return !!s.fieldEnemy(n, i);
      },
      kill(n = 0) {
        let i = s.unitOf(n);
        return i
          ? (s.match.damage(i, 1e4, null, {
              weapon: "debug",
            }),
            i.alive && i._die(null, null),
            !0)
          : !1;
      },
      state() {
        return JSON.stringify(s.state());
      },
      perf(n) {
        n !== void 0 &&
          ((s.prof.on = !!n),
          (s.prof.logic = s.prof.rig = s.prof.n = s.prof.max = 0));
        let i = s.prof,
          a = Math.max(1, i.n);
        return {
          unitFrames: i.n,
          logicMs: +(i.logic / a).toFixed(4),
          rigMs: +(i.rig / a).toFixed(4),
          maxLogicMs: +i.max.toFixed(3),
        };
      },
    };
  }
  _buildNav() {
    let t = this.nav.nodes,
      e = (this.nn = t.length),
      s = (this.D = new Float32Array(e * e).fill(1e9)),
      n = (this.NX = new Int16Array(e * e).fill(-1)),
      i = new Uint8Array(e),
      a = this.hotel.pool,
      r = new Float32Array(e);
    for (let l = 0; l < e; l++) {
      let c = t[l];
      c.y < 1 &&
        c.z > a.z0 - 1.6 &&
        c.x > a.x0 - 1.6 &&
        c.x < a.x1 + 1.6 &&
        (r[l] = 0.5);
    }
    for (let l = 0; l < e; l++) {
      let c = l * e;
      (i.fill(0), (s[c + l] = 0), (n[c + l] = l));
      for (let h = 0; h < e; h++) {
        let f = -1,
          u = 1e9;
        for (let m = 0; m < e; m++)
          !i[m] && s[c + m] < u && ((u = s[c + m]), (f = m));
        if (f < 0) break;
        i[f] = 1;
        let d = t[f].links;
        for (let m = 0; m < d.length; m++) {
          let p = d[m].to,
            x = u + d[m].c * (1 + r[p]);
          x < s[c + p] && ((s[c + p] = x), (n[c + p] = f === l ? p : n[c + f]));
        }
      }
    }
  }
  nearNode(t, e, s) {
    let n = this.nav.nodes,
      i = -1,
      a = 1e9;
    for (let r = 0; r < n.length; r++) {
      let l = n[r],
        c = Math.abs(l.y - e),
        h =
          (l.x - t) * (l.x - t) +
          (l.z - s) * (l.z - s) +
          c * c * 9 +
          (c > 1.6 ? 400 : 0);
      h < a && ((a = h), (i = r));
    }
    return i;
  }
  nodeOf(t) {
    let e = t.pos;
    if (t._k9n >= 0) {
      let n = e.x - t._k9x,
        i = e.z - t._k9z;
      if (n * n + i * i < 2.25 && Math.abs(e.y - t._k9y) < 0.5) return t._k9n;
    }
    if (this.nodeBudget <= 0)
      return (
        t._k9n >= 0 ||
          ((t._k9n = this.nearNode(e.x, e.y, e.z)), (t._k9x = 1e9)),
        t._k9n
      );
    this.nodeBudget--;
    let s = e.y;
    if (t.e && !t.e.onGround) {
      let n = this.world.groundAt(e.x, e.z, e.y + 0.2);
      n > e.y - 3 && (s = n);
    }
    return (
      (t._k9n = this.startNode(e.x, s, e.z, -1)),
      (t._k9x = e.x),
      (t._k9y = e.y),
      (t._k9z = e.z),
      t._k9n
    );
  }
  walk(t, e, s, n, i, a, r, l) {
    let c = this.world,
      h = n - t,
      f = a - s,
      u = Math.hypot(h, f);
    if (u > 18) return !1;
    let d = Math.max(1, Math.ceil(u / 0.3)),
      m = 0.36,
      p = e;
    for (let x = 1; x <= d; x++) {
      let g = x / d,
        b = t + h * g,
        v = s + f * g,
        y = c.groundAt(b, v, l ? e + 1.02 : p + ve.step + 0.01);
      if (y < (l ? e : p) - 0.6 || (y < -0.3 && this.hotel.inPool(b, v)))
        return !1;
      let M = l ? e + 1.03 : y + ve.step + 0.03,
        w = l ? e + 1.5 : y + ve.height,
        T = c.overlap(b - m, M, v - m, b + m, w, v + m, !0);
      if (T && T.pane) {
        if (!r || T.pane.support !== "frame") return !1;
        T = c.overlap(b - m, M, v - m, b + m, w, v + m, !1);
      }
      if (T) return !1;
      p = y;
    }
    return l || Math.abs(p - i) < 0.7;
  }
  startNode(t, e, s, n) {
    let i = this.nav.nodes,
      a = this.nn,
      r = this._ci,
      l = this._cd,
      c = this.D,
      h = 0;
    for (let u = 0; u < a; u++) {
      let d = i[u];
      if (Math.abs(d.y - e) > 4) continue;
      let m = Math.hypot(d.x - t, d.z - s);
      if (m > 14) continue;
      let p = m + (n >= 0 ? c[u * a + n] : 0);
      if (h === 10 && p >= l[9]) continue;
      let x = h < 10 ? h++ : 9;
      for (; x > 0 && l[x - 1] > p;)
        ((l[x] = l[x - 1]), (r[x] = r[x - 1]), x--);
      ((l[x] = p), (r[x] = u));
    }
    for (let u = 0; u < h; u++) {
      let d = i[r[u]];
      if (
        Math.hypot(d.x - t, d.z - s) < 0.5 ||
        this.walk(t, e, s, d.x, d.y, d.z, !1)
      )
        return r[u];
    }
    let f = this.nav.nearest(t, e, s);
    return f >= 0 ? f : this.nearNode(t, e, s);
  }
  spotFloor(t, e, s, n, i = 0.6) {
    let a = this.world,
      r = a.groundAt(t, e, s + 0.5);
    if (r === -1 / 0 || r < s - i) return NaN;
    if (r < -0.3 && this.hotel.inPool(t, e)) return NaN;
    if (
      a.overlap(
        t - 0.34,
        r + (n ? 0.06 : 0.4),
        e - 0.34,
        t + 0.34,
        r + 0.72,
        e + 0.34,
        !0,
      )
    )
      return NaN;
    for (let l = 0; l < 4; l++)
      if (
        a.groundAt(
          t + (l & 1 ? 0.26 : -0.26),
          e + (l & 2 ? 0.26 : -0.26),
          r + 0.3,
        ) <
        r - 0.42
      )
        return NaN;
    return r;
  }
  arcClear(t, e, s, n, i, a, r) {
    let l = this.world,
      c = Math.hypot(n - t, a - s),
      h = Math.max(2, Math.ceil(c / 0.25));
    for (let f = 1; f <= h; f++) {
      let u = f / h,
        d = t + (n - t) * u,
        m = s + (a - s) * u,
        p = e + (i - e) * u + 4 * r * u * (1 - u) + 0.02;
      if (l.overlap(d - 0.18, p, m - 0.18, d + 0.18, p + 0.3, m + 0.18, !0))
        return !1;
    }
    return !0;
  }
  _trySpot(t, e, s, n, i, a, r, l, c, h) {
    let f = l < 2,
      u = this.spotFloor(t, e, n, f, l === 3 ? 1.7 : 0.6);
    if (u !== u || (f && Math.abs(u - n) > 0.22)) return !1;
    let d = Math.hypot(t - i, e - r) || 1,
      m = (t - i) / d,
      p = (e - r) / d,
      x = t,
      g = e;
    for (let v = 0; v < 2; v++) {
      let y = v ? Math.min(0.45, s * 0.24) : Math.min(2, s * 0.42);
      if (v && s * 0.42 <= 0.45) break;
      if (this.skidClear(t - m * y, e - p * y, t, e, u, f)) {
        ((x = t - m * y), (g = e - p * y));
        break;
      }
    }
    let b = 0.09 * Math.hypot(x - i, g - r);
    return this.arcClear(i, a, r, x, u, g, b)
      ? ((c.x = t),
        (c.y = u),
        (c.z = e),
        (c.tx = x),
        (c.ty = u),
        (c.tz = g),
        (c.h = b),
        (c.kind = h),
        !0)
      : !1;
  }
  skidClear(t, e, s, n, i, a) {
    let r = this.world,
      l = Math.hypot(s - t, n - e),
      c = Math.max(1, Math.ceil(l / 0.3));
    for (let h = 0; h < c; h++) {
      let f = h / c,
        u = t + (s - t) * f,
        d = e + (n - e) * f;
      if (
        Math.abs(r.groundAt(u, d, i + 0.3) - i) > 0.05 ||
        r.overlap(
          u - 0.3,
          i + (a ? 0.06 : 0.4),
          d - 0.3,
          u + 0.3,
          i + 0.5,
          d + 0.3,
          !0,
        )
      )
        return !1;
    }
    return !0;
  }
  findSpot(t, e, s, n, i, a, r, l) {
    for (let u = 0; u < 4; u++) {
      if (u !== 1)
        for (let d = 0; d < RC.length; d += 2) {
          let m = RC[d],
            p = n + RC[d + 1];
          if (
            this._trySpot(
              t - Math.sin(p) * m,
              e - Math.cos(p) * m,
              m,
              s,
              i,
              a,
              r,
              u,
              l,
              u === 0 ? (d < rs0 ? "ahead" : "fan") : "tight",
            )
          )
            return l;
        }
      if (u > 0)
        for (let d = 0; d < xU.length; d++)
          for (let m = 0; m < 12; m++) {
            let p = xU[d],
              x = n + (m & 1 ? -1 : 1) * ((m + 1) >> 1) * 0.5236;
            if (
              this._trySpot(
                t - Math.sin(x) * p,
                e - Math.cos(x) * p,
                p,
                s,
                i,
                a,
                r,
                u,
                l,
                u === 1 ? "near" : "tight",
              )
            )
              return l;
          }
    }
    let c = this.nav.nodes,
      h = -1,
      f = 1e9;
    for (let u = 0; u < c.length; u++) {
      let d = c[u];
      if (Math.abs(d.y - s) > 1.2) continue;
      let m = Math.hypot(d.x - t, d.z - e);
      if (m >= f || m > 9) continue;
      let p = this.spotFloor(d.x, d.z, d.y, !1);
      p === p &&
        this.arcClear(i, a, r, d.x, p, d.z, 0.1 * m) &&
        ((f = m), (h = u));
    }
    if (h >= 0) {
      let u = c[h];
      return (
        (l.x = l.tx = u.x),
        (l.y = l.ty = this.spotFloor(u.x, u.z, u.y, !1)),
        (l.z = l.tz = u.z),
        (l.h = 0.1 * f),
        (l.kind = "node"),
        l
      );
    }
    return (
      (l.x = l.tx = t),
      (l.y = l.ty = s),
      (l.z = l.tz = e),
      (l.h = 0),
      (l.kind = "feet"),
      l
    );
  }
  sfx(t, e, s) {
    let n = this.audio;
    n.k9 && n.k9(t, e || null, s);
  }
  opts(t, e, s) {
    let n = this.sfxOpts;
    return ((n.dur = t || 0), (n.surf = e || "marble"), (n.hostile = !!s), n);
  }
  loop(t, e, s) {
    let n = this.audio;
    n.k9Loop && n.k9Loop(t, e, s);
  }
  hudEvent(t, e) {
    let s = this.ctx.hud;
    (this.events.length > 40 && this.events.shift(),
      this.events.push(t),
      s && s.k9 && s.k9(t, e));
  }
  note(t, e) {
    (this.log.length > 300 && this.log.shift(),
      this.log.push({
        t: +this.time().toFixed(1),
        kind: t,
        team: e.team,
        phase: e.phase,
        x: +e.e.x.toFixed(1),
        y: +e.e.y.toFixed(1),
        z: +e.e.z.toFixed(1),
      }));
  }
  _make(t) {
    let e = new K9Unit(this, t);
    return (this.pool[t].push(e), e);
  }
  _acquire(t) {
    let e = this.pool[t];
    for (let n of e) if (!n.inUse) return n;
    if (e.length < 2) return this._make(t);
    let s = null;
    for (let n of e) !n.alive && (!s || n.wreckT > s.wreckT) && (s = n);
    return s ? (s._free(), s) : null;
  }
  rigs() {
    let t = [];
    for (let e of this.pool) for (let s of e) t.push(s.rig);
    return t;
  }
  unitOf(t) {
    for (let e of this.units) if (e.team === t && e.alive) return e;
    return null;
  }
  get mine() {
    return this.unitOf(this.player.team);
  }
  _add(t) {
    (this.units.push(t), this.match.actors.push(t), this._blips());
  }
  _remove(t) {
    let e = this.units.indexOf(t);
    (e >= 0 && this.units.splice(e, 1),
      (e = this.match.actors.indexOf(t)),
      e >= 0 && this.match.actors.splice(e, 1),
      this.loop(t.id, null, 0),
      this._blips());
  }
  _blips() {
    let t = this.ctx.hud,
      e = t && t.map,
      s = e && e.blips;
    if (!s || !s.length) return;
    let n = this.match.actors,
      i = this.player.team;
    for (let a = 1 + this.match.bots.length; a < s.length; a++) {
      let r = s[a];
      if (!r || typeof r.friendly != "boolean" || !r.el) continue;
      let l = n[a];
      (!l || (l.team === i) !== r.friendly) &&
        (r.el.remove && r.el.remove(), (s[a] = void 0));
    }
  }
  clear() {
    for (let t of this.pool)
      for (let e of t)
        (e.alive && (e._release(), (e.alive = !1)), e.inUse && e._free());
    for (let t = this.match.actors.length - 1; t >= 0; t--)
      this.match.actors[t].isK9 && this.match.actors.splice(t, 1);
    ((this.units.length = 0),
      (this.pending = null),
      (this.player.k9Pin = null),
      this._blips(),
      this._view());
  }
  reset() {
    (this.clear(),
      (this.charge = ve.chargeStart),
      (this.wasReady = !1),
      (this.enemyT =
        randomRange(ve.enemyFirst[0], ve.enemyFirst[1]) * this._scale()),
      this._view());
  }
  pause() {
    for (let t of this.units) this.loop(t.id, null, 0);
  }
  _scale() {
    return ve.enemyScale[settings.difficulty] || 1;
  }
  _deny() {
    let t = performance.now();
    t - this.denyT < 350 || ((this.denyT = t), this.hudEvent("denied"));
  }
  request() {
    let t = this.player;
    return this.match.state !== "live" || !t.alive
      ? !1
      : this.mine || this.charge < 1 || t.mode === "mantle" || t.inWater
        ? (this._deny(), !1)
        : !0;
  }
  release() {
    let t = this.player;
    if (
      this.match.state !== "live" ||
      !t.alive ||
      this.mine ||
      this.charge < 1 ||
      t.mode === "mantle" ||
      t.inWater
    )
      return null;
    let s = t.e,
      n = t.yaw,
      i = -Math.sin(n),
      a = -Math.cos(n),
      r = s.y;
    if (
      !s.onGround &&
      ((r = this.world.groundAt(s.x, s.z, s.y + 0.2)),
      r === -1 / 0 || r < s.y - 3)
    )
      return (this._deny(), null);
    let l = s.x + i * 0.5,
      c = s.z + a * 0.5,
      h = Math.max(s.y + 0.2, t.eye.y - 0.58);
    this.world.overlap(
      l - 0.18,
      h,
      c - 0.18,
      l + 0.18,
      h + 0.3,
      c + 0.18,
      !0,
    ) && ((l = s.x), (c = s.z));
    let f = this._acquire(t.team);
    if (!f) return null;
    let u = this.findSpot(s.x, s.z, r, n, l, h, c, this.spot);
    return (
      f._begin(t),
      f._throw(l, h, c, u, n),
      this._add(f),
      (this.charge = 0),
      (this.wasReady = !1),
      this.sfx("throw"),
      this.hudEvent("deployed", {
        unit: f,
      }),
      f
    );
  }
  _enemyTeam() {
    return 1 - this.player.team;
  }
  _thrower() {
    let t = this.player,
      e = this.time(),
      s = null,
      n = -1e9;
    for (let i of this.match.bots) {
      if (
        i.team === t.team ||
        !i.alive ||
        !i.e.onGround ||
        e - (i.spawnT || 0) < 1.5 ||
        (i.e.y < -0.3 && this.hotel.inPool(i.e.x, i.e.z))
      )
        continue;
      let a = i.pos.distanceTo(t.pos),
        r =
          -Math.abs(a - 20) +
          (i.mode === "engage" ? -8 : 0) +
          randomRange(0, 4);
      r > n && ((n = r), (s = i));
    }
    return s;
  }
  _enemyTimer(t) {
    if (this.pending) {
      let s = this.pending;
      ((s.t -= t),
        s.bot.alive
          ? s.t <= 0 && ((this.pending = null), this._enemyThrow(s.bot))
          : ((this.pending = null), (this.enemyT = 1.5)));
      return;
    }
    if (this.unitOf(this._enemyTeam()) || (this.enemyT -= t) > 0) return;
    let e = this._thrower();
    if (!e) {
      this.enemyT = 1;
      return;
    }
    ((this.pending = {
      bot: e,
      t: e.char && e.char.throwGrenade ? e.char.throwGrenade() : 0.2,
    }),
      (this.enemyT =
        randomRange(ve.enemyEvery[0], ve.enemyEvery[1]) * this._scale()),
      this.hudEvent("enemy_inbound", {
        owner: e,
      }));
  }
  _enemyThrow(t) {
    let e = this._acquire(t.team);
    if (!e) return null;
    let s = t.aimYaw !== void 0 ? t.aimYaw : t.yaw,
      n = -Math.sin(s),
      i = -Math.cos(s),
      a = t.e,
      r = a.x + n * 0.4,
      l = a.z + i * 0.4,
      c = a.y + 1.2;
    this.world.overlap(
      r - 0.18,
      c,
      l - 0.18,
      r + 0.18,
      c + 0.3,
      l + 0.18,
      !0,
    ) && ((r = a.x), (l = a.z));
    let h = this.findSpot(a.x, a.z, a.y, s, r, c, l, this.spot);
    return (
      e._begin(t),
      e._throw(r, c, l, h, s),
      this._add(e),
      this.sfx("throw", e.pos),
      e
    );
  }
  fieldEnemy(t, e) {
    let s = this._enemyTeam();
    if (this.match.state !== "live" || this.unitOf(s) || this.pending)
      return null;
    let n = this._thrower();
    if ((n || (n = this.match.bots.find((c) => c.team === s)), t === void 0))
      return !n || !n.alive
        ? null
        : (this.hudEvent("enemy_inbound", {
            owner: n,
          }),
          this._enemyThrow(n));
    let i = this.nav.nodes[this.nearNode(t, 0, e)],
      a = this.spotFloor(t, e, i.y, !1);
    a !== a && ((t = i.x), (e = i.z), (a = i.y));
    let r = this._acquire(s);
    if (!r) return null;
    let l = this.spot;
    return (
      (l.x = l.tx = t),
      (l.y = l.ty = a),
      (l.z = l.tz = e),
      (l.h = 0),
      (l.kind = "placed"),
      r._begin(n),
      r._throw(
        t,
        a,
        e,
        l,
        n ? Math.atan2(-(this.player.pos.x - t), -(this.player.pos.z - e)) : 0,
      ),
      this._add(r),
      this.hudEvent("enemy_inbound", {
        owner: n,
      }),
      r
    );
  }
  onKill(t, e, s) {
    let n = s && s.k9,
      i = this.player;
    (n &&
      n.isK9 &&
      (n.kills++,
      n.owner === i &&
        this.hudEvent("takedown", {
          victim: t,
          kills: n.kills,
        })),
      e === i &&
        !this.mine &&
        this.charge < 1 &&
        (this.charge = Math.min(1, this.charge + ve.chargePerKill)));
  }
  medals(t, e) {
    return (
      e.push("K9 TAKEDOWN"),
      t.k9 && t.k9.kills === 3 && e.push("PACK LEADER"),
      e
    );
  }
  destroyed(t, e, s) {
    let n = this.player,
      i = this.ctx.hud,
      a = e && e !== t && e.team !== t.team ? e : null;
    (a && (a.score += ve.destroyScore),
      s.weapon !== "debug" && i.killfeed(a, t, s.weapon || "ar", !!s.head),
      a === n && i.kill(t, ["K9 DESTROYED"]),
      t.team !== n.team &&
        this.hudEvent("enemy_destroyed", {
          by: a,
        }));
  }
  lost(t, e, s) {
    t.owner === this.player &&
      this.hudEvent("lost", {
        reason: e,
        by: s || null,
      });
  }
  update(t) {
    if (!(t > 0)) return;
    this.match.state === "live" &&
      (!this.mine &&
        this.charge < 1 &&
        (this.charge = Math.min(1, this.charge + t / ve.chargeTime)),
      this.charge >= 1 &&
        !this.wasReady &&
        ((this.wasReady = !0), this.hudEvent("ready")),
      this._enemyTimer(t));
    let n = this.prof;
    for (let i = 0; i < 2; i++) {
      let a = this.pool[i];
      for (let r = 0; r < a.length; r++) {
        let l = a[r];
        if (l.inUse)
          if (n.on) {
            let c = performance.now();
            l.update(t);
            let h = performance.now() - c - l.rigMs;
            ((n.logic += h),
              (n.rig += l.rigMs),
              n.n++,
              h > n.max && (n.max = h));
          } else l.update(t);
      }
    }
    this._view();
  }
  _view() {
    let t = this.view,
      e = this.mine;
    ((t.state = e ? "active" : this.charge >= 1 ? "ready" : "charging"),
      (t.charge = e ? 0 : this.charge),
      (t.hp = e ? saturate(e.health / ve.hp) : 0),
      (t.time = e ? saturate(e.battery / ve.battery) : 0),
      (t.kills = e ? e.kills : 0),
      (t.enemyActive = !!this.unitOf(this._enemyTeam())),
      (t.chargeTime = ve.chargeTime),
      (t.batteryTime = ve.battery));
  }
  state() {
    let t = (e) => +e.toFixed(2);
    return {
      view: this.view,
      charge: t(this.charge),
      enemyIn: t(this.enemyT),
      pending: !!this.pending,
      actors: this.match.actors.length,
      units: this.units.map((e) => ({
        team: e.team,
        owner: e.owner ? e.owner.name : null,
        phase: e.phase,
        mode: e.mode,
        hp: t(e.health),
        battery: t(e.battery),
        kills: e.kills,
        pos: [t(e.e.x), t(e.e.y), t(e.e.z)],
        vel: [t(e.vel.x), t(e.vel.y), t(e.vel.z)],
        yaw: t(e.yaw),
        grounded: !!e.e.onGround,
        target: e.target ? e.target.name : null,
        los: e.los,
        direct: e.direct,
        path: e.pn - e.pi,
        stuck: t(e.stuckT),
        recoveries: e.recov,
        alive: e.alive,
      })),
      wrecks: this.pool[0]
        .concat(this.pool[1])
        .filter((e) => e.inUse && !e.alive).length,
      log: this.log.slice(-12),
      events: this.events.slice(-10),
    };
  }
};
var _C = [
  4.5, -2.2, 4, -2.6, 5.2, -1.4, 5.6, -0.4, 3.6, -1.7, 6.2, -2.4, 5, -3.2, 6.5,
  -1, 6.3, 0.6, 5.6, 1.7, 4.6, 2.5, 5.5, 3.2, 3.4, -3, 3, -1.2, 3.6, 2.4, 3,
  1.2, 2.4, -2.2, 2.2, -0.7, 2.4, 2.2, 2, 0.4,
];
var RC = [
  4.1, 0.08, 4, 0, 4.6, 0.12, 3.6, 0.12, 3.7, -0.1, 3, 0.1, 2.4, 0, 2, 0.16,
  1.6, 0, 1.3, 0, 1.9, 0.4, 1.9, -0.4, 1.5, 0.75, 1.5, -0.75, 1, 0,
];
var rs0 = 20;
var xU = [1.1, 0.8, 1.5, 1.9, 2.3, 2.8];
var K9Unit = class {
  constructor(system, team) {
    ((this.sys = system),
      (this.team = team),
      (this.isK9 = !0),
      (this.isPlayer = !1),
      (this.name = "K9 UNIT"),
      (this.id = "k9-" + team + "-" + system.pool[team].length));
    let s = (this.rig = pU({
      team: team,
      ground: system.groundFn,
      clear: system.clearFn,
    }));
    ((s.root.visible = !1),
      system.scene.add(s.root),
      (s.onStep = (a, r, l) => this._step(a, r, l)));
    let n = Array.isArray(s.hitVolumes)
      ? s.hitVolumes
      : Array.isArray(s.hit)
        ? s.hit
        : null;
    ((this.ownHit = !n),
      (this.hit = n || l7()),
      (this.flinch = s.flinch
        ? (a, r) => s.flinch(a, r)
        : typeof s.hit == "function"
          ? (a, r) => s.hit(a, r)
          : null));
    let i = s.model && s.model.sockets;
    ((this.prongs =
      i && i.prongL && i.prongR
        ? [i.prongL, i.prongR]
        : [s.anchors.jaw, s.anchors.jaw]),
      (this.e = {
        x: 0,
        y: 0,
        z: 0,
        r: ve.radius,
        h: ve.height,
        onGround: !0,
        groundCol: null,
        hitWall: null,
        hitCeil: !1,
        stepped: 0,
      }),
      (this.pos = new Vector3()),
      (this.vel = new Vector3()),
      (this.look = new Vector3()),
      (this.tv = new Vector3()),
      (this.leapDir = new Vector3()),
      (this.pp = new Int16Array(64)),
      (this.fl = {
        t: 0,
        T: 0.4,
        S: 0.26,
        h: 0.2,
        x0: 0,
        y0: 0,
        z0: 0,
        x1: 0,
        y1: 0,
        z1: 0,
        x2: 0,
        y2: 0,
        z2: 0,
      }),
      (this.mv = {
        step: ve.step,
        snap: !0,
        onPane: (a) => this._pane(a),
      }),
      (this.kills = this.deaths = this.score = this.streak = 0),
      (this.alive = !1),
      (this.inUse = !1),
      (this.health = 0),
      (this.maxHealth = ve.hp),
      (this.yaw = 0),
      (this.owner = null),
      (this.phase = "off"),
      (this.mode = "folded"),
      (this.target = null),
      (this.victim = null),
      (this.pinning = null),
      (this.wreckT = 0),
      (this.rigMs = 0),
      (this.recov = 0),
      (this.pn = this.pi = 0),
      (this.stuckT = 0),
      (this.battery = 0),
      (this.los = !1),
      (this.direct = !1));
  }
  _begin(t) {
    let e = this.rig,
      s = this.sys.time();
    (e.reset(),
      e.setTeam && e.setTeam(this.team),
      e.setOpacity && e.setOpacity(1),
      (e.root.visible = !0),
      (this.owner = t),
      (this.alive = !0),
      (this.inUse = !0),
      (this.health = this.maxHealth = ve.hp),
      (this.battery = ve.battery),
      (this.kills = 0),
      (this.spawnT = s + 60),
      this.vel.set(0, 0, 0),
      (this.phase = "flight"),
      (this.mode = "folded"),
      (this.alert = 0),
      (this.hasLook = !1),
      (this.pitch = this.roll = 0),
      (this.skidHard = 0),
      (this.target = null),
      (this.targetT = -9),
      (this.barked = !1),
      (this.victim = null),
      (this.pinning = null),
      this.tv.set(0, 0, 0),
      (this.los = !1),
      (this.direct = !1),
      (this.hurdle = !1),
      (this.noHurdle = 0),
      (this.noGlass = 0),
      (this.stairT = 0),
      (this.goalOpen = !1),
      (this.unreachT = 0),
      (this.wall = null),
      (this.avT = 0),
      (this.avX = this.avZ = 0),
      (this.avK = 0.4),
      (this.pn = this.pi = 0),
      (this.goalNode = -1),
      (this.planT = -9),
      (this.replan = !0),
      (this._k9n = -1),
      (this.legX = this.legZ = 0),
      (this.wx = this.wz = 0),
      (this.wSpeed = 0),
      (this.faceYaw = NaN),
      (this.strafe = !1),
      (this.thinkT = randomRange(0, 0.1)),
      (this.stuckT = 0),
      (this.stuckLv = 0),
      (this.lastRec = -9),
      (this.progT = s),
      (this.progX = this.progZ = 1e9),
      (this.progY = 0),
      (this.recov = 0),
      (this.backT = 0),
      (this.edge = 0),
      (this.air = !1),
      (this.holdT = 0),
      (this.sigShock = 0),
      (this.sigT = 0),
      (this.stairDir = 0),
      (this.creep = !1),
      (this.creepStop = 0),
      (this.carryT = 0),
      (this.carryX = this.carryZ = 0),
      (this.losT = -9),
      (this.atkT = 0),
      (this.atkStage = 0),
      (this.leapT = 0),
      (this.leapDur = 0.3),
      (this.leapCool = 0),
      (this.lob = 0),
      (this.leapClear = !0),
      (this.tdT = 0),
      (this.tdTick = 0),
      (this.tdDmg = 0),
      (this.tdDur = 0.7),
      (this.tdShock = 0),
      (this.recT = 0),
      (this.staggerT = 0),
      (this.circleT = 0),
      (this.circleDir = Math.random() < 0.5 ? -1 : 1),
      (this.flipT = 0),
      (this.after = "hunt"),
      (this.sitting = !1),
      (this.idleT = 0),
      (this.heelX = this.heelZ = 0),
      (this.heelY = 0),
      (this.heelOk = !1),
      (this.heelFront = !1),
      (this.outT = 0),
      (this.hsT = -9),
      (this.scanT = 0),
      (this.scan = 0),
      (this.hitStamp = -1),
      (this.hitSum = 0),
      (this.hitSfx = -9),
      (this.lastAttacker = null),
      (this.lastAttackT = -9),
      (this.lastHurt = -9),
      (this.wreckT = 0),
      (this.unfoldT = 0),
      (this.rs = null),
      (this.loopK = 0));
  }
  _throw(t, e, s, n, i) {
    let a = this.fl,
      r = this.e,
      l = Math.hypot(n.tx - t, n.tz - s);
    ((a.t = 0),
      (a.x0 = t),
      (a.y0 = e),
      (a.z0 = s),
      (a.x1 = n.tx),
      (a.y1 = n.ty),
      (a.z1 = n.tz),
      (a.x2 = n.x),
      (a.y2 = n.y),
      (a.z2 = n.z));
    let c = Math.hypot(n.x - n.tx, n.z - n.tz);
    ((a.T = clamp(l / 6.5, 0.2, 0.5)),
      (a.h = n.h),
      (a.S =
        c > 0.04 ? clamp((2 * c * a.T) / Math.max(0.3, l), 0.14, 0.75) : 0),
      (a.yaw = i),
      (a.spin =
        c > 0.6 ? randomRange(0.35, 0.6) * (Math.random() < 0.5 ? -1 : 1) : 0),
      (a.sd = c),
      (a.skidT = 0),
      (r.x = t),
      (r.y = e),
      (r.z = s),
      (r.onGround = !1),
      (this.yaw = i + a.spin),
      (this.pitch = 0.3),
      (this.roll = 0),
      this.pos.set(t, e, s),
      (this.phase = l < 0.05 && Math.abs(e - n.ty) < 0.05 ? "slide" : "flight"),
      this._write(0));
  }
  _flight(t) {
    let e = this.fl,
      s = this.e,
      n = this.sys,
      i = s.x,
      a = s.y,
      r = s.z;
    if (((e.t += t), this.phase === "flight")) {
      let l = Math.min(1, e.t / e.T);
      if (
        ((s.x = e.x0 + (e.x1 - e.x0) * l),
        (s.z = e.z0 + (e.z1 - e.z0) * l),
        (s.y = e.y0 + (e.y1 - e.y0) * l + 4 * e.h * l * (1 - l)),
        (s.onGround = !1),
        (this.pitch = 0.3 * (1 - l) * (1 - l) - 0.07 * l),
        (this.roll = 0.12 * Math.sin(l * Math.PI) * Math.sign(e.spin || 1)),
        l >= 1)
      ) {
        ((this.phase = "slide"),
          (e.t = 0),
          (s.onGround = !0),
          this.pos.set(s.x, s.y, s.z),
          n.world.groundAt(s.x, s.z, s.y + 0.2),
          (s.groundCol = n.world.groundCol));
        let c = s.groundCol ? s.groundCol.surf : "marble";
        (n.sfx("land", this.pos, n.opts(e.S, c)),
          n.fx.land && n.fx.land(this.pos, c, 0.45),
          (this.skidHard = as0[c] || 0));
      }
    } else {
      let l = e.S > 0 ? Math.min(1, e.t / e.S) : 1,
        c = 1 - (1 - l) * (1 - l);
      if (
        ((s.x = e.x1 + (e.x2 - e.x1) * c),
        (s.y = e.y1 + (e.y2 - e.y1) * c),
        (s.z = e.z1 + (e.z2 - e.z1) * c),
        (s.onGround = !0),
        (this.yaw = e.yaw + e.spin * (1 - c)),
        (this.pitch = -0.07 * Math.max(0, 1 - l * 4)),
        (this.roll = 0),
        e.S > 0 && l < 0.92)
      ) {
        let h = ((2 * e.sd) / e.S) * (1 - l),
          f = (e.x2 - e.x1) / (e.sd || 1),
          u = (e.z2 - e.z1) / (e.sd || 1);
        ((e.skidT -= t) <= 0 &&
          h > 1 &&
          ((e.skidT = 0.03),
          this.skidHard > 0 &&
            n.fx.sparks(
              s.x - f * 0.2 + randomRange(-0.12, 0.12),
              s.y + 0.02,
              s.z - u * 0.2 + randomRange(-0.12, 0.12),
              -f * 0.5,
              0.5,
              -u * 0.5,
              h > 3.5 ? 2 : 1,
              is0,
            ),
          n.fx.slideDust &&
            Math.random() < 0.5 &&
            n.fx.slideDust(
              eo.set(s.x, s.y, s.z),
              f,
              u,
              s.groundCol ? s.groundCol.surf : "marble",
            )),
          n.physics.pushFrom(s.x, s.y, s.y + 0.3, s.z, 0.36, f * h, u * h));
      }
      if (l >= 1) {
        ((this.phase = "unfold"),
          (this.mode = "deploy"),
          this.vel.set(0, 0, 0),
          (this.yaw = e.yaw),
          (this.pitch = this.roll = 0),
          (this.unfoldT = this.rig.deploy() || this.rig.timing.deploy),
          n.sfx(
            "unfold",
            this.pos,
            n.opts(this.unfoldT, s.groundCol ? s.groundCol.surf : "marble"),
          ));
        return;
      }
    }
    t > 0 && this.vel.set((s.x - i) / t, (s.y - a) / t, (s.z - r) / t);
  }
  _unfold(t) {
    (this.unfoldT -= t) > 0 ||
      ((this.phase = "heel"),
      (this.mode = "idle"),
      (this.thinkT = 0),
      (this.idleT = 0),
      (this.spawnT = this.sys.time() - 1.2),
      this.rig.bark(),
      this.sys.sfx("boot", this.pos));
  }
  update(t) {
    if (((this.rigMs = 0), !this.alive)) {
      this._wreck(t);
      return;
    }
    let e = this.phase;
    if (
      (e === "flight" || e === "slide"
        ? this._flight(t)
        : e === "unfold"
          ? this._unfold(t)
          : this._brain(t),
      !this.alive)
    )
      return;
    this._write(t);
    let s = Math.hypot(this.vel.x, this.vel.z);
    (this.rig.effort !== void 0
      ? (this.loopK = 0.1 + 0.9 * this.rig.effort)
      : (this.loopK = damp(
          this.loopK,
          this.phase === "unfold"
            ? 0.5
            : this.mode === "sit"
              ? 0.06
              : saturate(0.1 + (s / u1.gallop) * 0.9),
          8,
          t,
        )),
      this.sys.loop(this.id, this.pos, this.loopK),
      this._signals(t));
  }
  _write(t) {
    let e = this.e,
      s = this.rig.state,
      n = this.vel;
    if (
      (this.pos.set(e.x, e.y, e.z),
      (s.x = e.x),
      (s.y = e.y),
      (s.z = e.z),
      (s.yaw = this.yaw),
      (s.vx = n.x),
      (s.vy = n.y),
      (s.vz = n.z),
      (s.grounded = !!e.onGround),
      (s.mode = this.mode),
      (s.pitch = this.pitch || 0),
      (s.roll = this.roll || 0),
      (s.lookAt = this.hasLook ? this.look : null),
      (s.hp = saturate(this.health / ve.hp)),
      (s.alert = this.alert),
      this.sys.prof.on)
    ) {
      let i = performance.now();
      (this.rig.update(t), (this.rigMs = performance.now() - i));
    } else this.rig.update(t);
    this.ownHit && sv(this.rig.bones, this.hit);
  }
  _signals(t) {
    let e = this.rig.signals;
    if (!e) return;
    let s = this.sys.fx,
      n = this.prongs,
      i = this.pinning === this.sys.player;
    if (
      ((this.rig.shockGain = i ? 0.3 : 1),
      e.shock > 0.55 && this.sigShock <= 0.55)
    ) {
      for (let r = 0; r < 2; r++)
        (eo.setFromMatrixPosition(n[r].matrixWorld),
          s.sparks(eo.x, eo.y, eo.z, 0, 0.5, 0, i ? 4 : 7, gU));
      (s.glowPuff(eo.x, eo.y, eo.z, i ? 0.3 : 0.9, s3, 0.07),
        s.flashLight(eo, 8374527, i ? 6 : 16, 6, 0.09));
    }
    this.sigShock = e.shock;
    let a = Math.max(e.charge * 0.6, e.shock);
    a > 0.25 &&
      (this.sigT -= t) <= 0 &&
      ((this.sigT = 0.05),
      eo.setFromMatrixPosition(n[Math.random() < 0.5 ? 0 : 1].matrixWorld),
      s.glowPuff(eo.x, eo.y, eo.z, (0.1 + 0.22 * a) * (i ? 0.5 : 1), s3, 0.06),
      (e.shock > 0.3 || Math.random() < 0.3) &&
        s.sparks(eo.x, eo.y, eo.z, 0, 0.3, 0, 1, es0));
  }
  _step(t, e, s) {
    if (!this.alive) return;
    let n = this.sys,
      i = Math.hypot(this.vel.x, this.vel.z),
      a = n.stepOpts;
    a.surf = this.e.groundCol ? this.e.groundCol.surf : "marble";
    let r = this.rig.gait;
    ((a.gait =
      r && r !== "stand" ? r : i > 6.5 ? "gallop" : i > 2.6 ? "trot" : "walk"),
      (a.strength = s),
      (a.leg = t),
      (a.id = this.id),
      n.sfx("step", e, a),
      t >= 2 &&
        i > 3 &&
        n.fx.footstep &&
        n.fx.footstep(e, a.surf, 0.5 + 0.5 * s, i > 6.5));
  }
  _brain(t) {
    let e = this.sys,
      s = e.time(),
      n = this.target;
    if (
      ((this.battery -= t),
      (this.battery <= 0 &&
        this.phase !== "leap" &&
        this.phase !== "takedown") ||
        this.battery < -2.5)
    ) {
      this._expire();
      return;
    }
    (n &&
      ((this.tv.x = damp(this.tv.x, n.vel.x, 14, t)),
      (this.tv.z = damp(this.tv.z, n.vel.z, 14, t))),
      (this.thinkT -= t) <= 0 && ((this.thinkT = 0.1), this._think(s)),
      (this.wSpeed = 0),
      (this.faceYaw = NaN),
      (this.strafe = !1),
      (this.creep = !1));
    let i = 0.15;
    switch (this.phase) {
      case "heel":
        this._heel(t, s);
        break;
      case "hunt":
        (this._hunt(t, s), (i = 1));
        break;
      case "attack":
        (this._attack(t, s), (i = 1));
        break;
      case "leap":
        ((this.alert = 1), this._leap(t, s));
        return;
      case "takedown":
        ((this.alert = 1), this._takedown(t, s));
        return;
      case "recover":
        ((i = 1),
          (this.mode = "move"),
          ((this.recT += t) > 0.6 ||
            (this.e.onGround &&
              Math.hypot(this.vel.x, this.vel.z) < 1.5 &&
              this.recT > 0.12)) &&
            (this.phase = this.target ? "hunt" : "heel"));
        break;
      case "stagger":
        ((i = 1),
          (this.mode = "stagger"),
          (this.staggerT -= t) <= 0 &&
            ((this.phase = this.after),
            (this.mode = "move"),
            this.after === "circle" && (this.circleT = ve.circleTime)));
        break;
      case "circle":
        ((i = 1), this._circle(t, s));
        break;
      case "rescue":
        this._rescue(t);
        return;
    }
    ((this.alert = damp(this.alert, i, 6, t)), this._move(t, s));
  }
  _think(t) {
    let e = this.sys,
      s = this.e,
      n = this.phase;
    ((e.nodeBudget = 3),
      n !== "attack" &&
        n !== "leap" &&
        n !== "takedown" &&
        n !== "stagger" &&
        n !== "rescue" &&
        this._pickTarget(t));
    let i = this.target;
    if (i) {
      if (
        (e3.set(s.x, s.y + 0.6, s.z),
        s6.set(i.pos.x, i.pos.y + Ju(i), i.pos.z),
        (this.los = e.world.clear(e3, s6)),
        this.los && (this.losT = t),
        n === "hunt")
      ) {
        let a = i.pos.x - s.x,
          r = i.pos.z - s.z,
          l = Math.hypot(a, r),
          c = i.pos.y;
        if (i.e && !i.e.onGround) {
          let u = e.world.groundAt(i.pos.x, i.pos.z, i.pos.y + 0.2);
          u > i.pos.y - 2.5 && (c = u);
        }
        let h = Math.abs(c - s.y) < 0.7 && s.onGround,
          f = t > this.noGlass;
        ((this.direct =
          l < 16 && h && e.walk(s.x, s.y, s.z, i.pos.x, c, i.pos.z, f, !1)),
          (this.hurdle =
            !this.direct &&
            h &&
            t - this.losT < 1.5 &&
            l < 10 &&
            t > this.noHurdle &&
            e.walk(s.x, s.y, s.z, i.pos.x, c, i.pos.z, f, !0)),
          l < ve.attackRange + 1.2
            ? ((this.lob = this._arcOk(i, 0)
                ? 0
                : this._arcOk(i, 0.52)
                  ? 0.52
                  : -1),
              (this.leapClear = this.lob >= 0))
            : (this.leapClear = !0),
          !this.direct && !this.hurdle
            ? this._route(i.pos.x, c, i.pos.z, e.nodeOf(i), t)
            : (this.replan = !0),
          this._progress(t));
      }
    } else if (n === "heel" && !this.sitting) {
      let a = this.owner;
      if (!a) return;
      this._heelPoint(a);
      let r = Math.hypot(this.heelX - s.x, this.heelZ - s.z);
      ((this.direct =
        r < 16 &&
        Math.abs(this.heelY - s.y) < 0.7 &&
        s.onGround &&
        e.walk(s.x, s.y, s.z, this.heelX, this.heelY, this.heelZ, !1)),
        !this.direct && r > 1
          ? this._route(this.heelX, this.heelY, this.heelZ, e.nodeOf(a), t)
          : (this.replan = !0),
        this._progress(t));
    }
  }
  _pickTarget(t) {
    let e = this.sys.match.actors,
      s = this.target,
      n = null,
      i = 1e9,
      a = 1e9;
    s && (!s.alive || s.team === this.team) && (s = this.target = null);
    for (let r = 0; r < e.length; r++) {
      let l = e[r];
      if (!l.alive || l.team === this.team || l.isK9) continue;
      let c = this._score(l, t);
      (l === s && (a = c), c < i && ((i = c), (n = l)));
    }
    n &&
      n !== s &&
      (!s || (t - this.targetT > 1 && i < a - Math.max(3, a * 0.25))) &&
      this._setTarget(n, t);
  }
  _score(t, e) {
    let s = this.sys,
      n = this.e,
      i = s.nn,
      a = s.nav.nodes,
      r = t.pos.x - n.x,
      l = t.pos.z - n.z,
      c = Math.hypot(r, l) + Math.abs(t.pos.y - n.y) * 2,
      h = c,
      f = s.nodeOf(t),
      u = s.nodeOf(this);
    if (f >= 0 && u >= 0 && f !== u) {
      let m = s.D[u * i + f];
      if (m > 1e8) h = c + 80;
      else {
        let p = a[u],
          x = a[f];
        h = Math.max(
          c,
          m +
            Math.hypot(p.x - n.x, p.z - n.z) +
            Math.hypot(x.x - t.pos.x, x.z - t.pos.z) -
            3,
        );
      }
      h > c * 1.2 + 0.5 &&
        c < 30 &&
        s.world.clear(
          e3.set(n.x, n.y + 0.6, n.z),
          s6.set(t.pos.x, t.pos.y + Ju(t), t.pos.z),
        ) &&
        (h = c * 1.2 + 0.5);
    }
    let d = this.owner;
    if (d && d.alive) {
      if (t.target === d || (t._k9hit === d && e - t._k9hitT < 4)) h -= 8;
      else if (t.isPlayer) {
        let m = d.pos.x - t.pos.x,
          p = d.pos.z - t.pos.z,
          x = Math.hypot(m, p);
        x < 30 && m * t.viewDir.x + p * t.viewDir.z > x * 0.94 && (h -= 6);
      }
    }
    return (
      t === this.lastAttacker && e - this.lastAttackT < 2.5 && (h -= 4),
      e - (t.spawnT || 0) < 1.5 && (h += 25),
      t === this.target && (h += Math.min(30, this.unreachT * 6)),
      h
    );
  }
  _setTarget(t, e) {
    ((this.target = t),
      (this.targetT = e),
      (this.barked = !1),
      (this.unreachT = 0),
      this.tv.set(t.vel.x, 0, t.vel.z),
      (this.los = !1),
      (this.direct = !1),
      (this.hurdle = !1),
      (this.pn = this.pi = 0),
      (this.replan = !0),
      this.sitting &&
        (this.holdT = Math.max(this.holdT, e + (this.rig.timing.stand || 0))),
      (this.sitting = !1),
      (this.progT = e),
      this.phase === "heel" &&
        ((this.phase = "hunt"), (this.thinkT = Math.min(this.thinkT, 0.02))));
  }
  _route(t, e, s, n, i) {
    let a = this.sys,
      r = this.e,
      l = a.nav.nodes;
    if (
      this.pn === 0 ||
      this.replan ||
      (n !== this.goalNode && i - this.planT > 0.35) ||
      i - this.planT > 4
    )
      this._plan(n, i);
    else if (this.pi + 1 < this.pn) {
      let c = l[this.pp[this.pi + 1]];
      a.walk(r.x, r.y, r.z, c.x, c.y, c.z, !1) &&
        (this.pi++, (this.legX = r.x), (this.legZ = r.z));
    }
    this.pi >= this.pn - 1
      ? ((this.goalOpen =
          Math.abs(e - r.y) < 0.7 && a.walk(r.x, r.y, r.z, t, e, s, !1)),
        this.goalOpen && (this.pi = this.pn))
      : (this.goalOpen = !0);
  }
  _plan(t, e) {
    let s = this.sys,
      n = s.nn,
      i = this.e;
    ((this.pn = this.pi = 0),
      (this.goalNode = t),
      (this.planT = e),
      (this.replan = !1));
    let a = s.startNode(i.x, i.y, i.z, t);
    if (a < 0 || t < 0 || s.D[a * n + t] > 1e8) return;
    ((this.legX = i.x), (this.legZ = i.z));
    let r = a;
    for (
      this.pp[this.pn++] = r;
      r !== t && this.pn < this.pp.length && ((r = s.NX[r * n + t]), !(r < 0));
    )
      this.pp[this.pn++] = r;
  }
  _steer(t, e, s, n, i) {
    let a = this.e,
      r = this.sys.nav.nodes,
      l = Math.hypot(this.vel.x, this.vel.z),
      c,
      h,
      f,
      u,
      d,
      m,
      p;
    for (;;) {
      if (((u = this.pi >= this.pn), u)) ((c = t), (h = e), (f = s));
      else {
        let v = r[this.pp[this.pi]];
        ((c = v.x), (h = v.y), (f = v.z));
      }
      if (
        ((d = c - a.x),
        (m = f - a.z),
        (p = Math.hypot(d, m)),
        !u &&
          Math.abs(h - a.y) < 0.9 &&
          (p < 0.32 + 0.02 * l ||
            (p < 1.6 && d * (c - this.legX) + m * (f - this.legZ) <= 0)))
      ) {
        (this.pi++, (this.legX = a.x), (this.legZ = a.z));
        continue;
      }
      break;
    }
    if (u && !this.goalOpen) return !1;
    if (p < 0.001) return ((this.wSpeed = 0), !0);
    let x = u ? i : n;
    if (!u) {
      let v, y;
      if (this.pi + 1 < this.pn) {
        let S = r[this.pp[this.pi + 1]];
        ((v = S.x), (y = S.z));
      } else ((v = t), (y = s));
      let M = v - c,
        w = y - f,
        T = Math.hypot(M, w);
      if (T > 0.3) {
        let S = (d * M + m * w) / (p * T),
          E = saturate((0.94 - S) / 1.1);
        x = n + (ve.cornerSpeed - n) * E * (2 - E);
      }
    }
    let g = Math.min(n, Math.sqrt(x * x + 2 * 13 * Math.max(0, p - 0.6))),
      b = Math.abs(h - a.y);
    return (
      this.stairT > 0
        ? (g = Math.min(g, this.stairDir < 0 ? ve.stairDown : ve.stairSpeed))
        : b > 0.5 &&
          p < b * 1.6 + 1.6 &&
          (g = Math.min(g, h < a.y ? ve.stairDown + 1.5 : ve.stairSpeed)),
      (this.wx = d / p),
      (this.wz = m / p),
      (this.wSpeed = g),
      !0
    );
  }
  _progress(t) {
    let e = this.e,
      s = e.x - this.progX,
      n = e.z - this.progZ;
    s * s + n * n > 2.25 || Math.abs(e.y - this.progY) > 0.6 || this.wSpeed < 1
      ? ((this.progX = e.x),
        (this.progY = e.y),
        (this.progZ = e.z),
        (this.progT = t))
      : t - this.progT > 2.2 &&
        ((this.progT = t), this._unstick(t, "no-progress"));
  }
  _heelPoint(t) {
    let e = this.sys,
      s = t.yaw || 0,
      n = -Math.sin(s),
      i = -Math.cos(s),
      a = Math.cos(s),
      r = -Math.sin(s);
    if (t.isPlayer) {
      let l = this.e,
        c = l.x - t.pos.x,
        h = l.z - t.pos.z,
        f = Math.hypot(c, h) || 1e-4,
        u = (c * n + h * i) / f,
        d = c * a + h * r;
      if (
        this.heelOk &&
        this.heelFront &&
        f > 3.4 &&
        f < 7.5 &&
        u > 0.75 &&
        (d < 0.2 || f > 5.6) &&
        Math.abs(l.y - t.pos.y) < 0.5
      )
        return;
      let m = e.time(),
        p = Math.hypot(t.pos.x - (this.hsX || 0), t.pos.z - (this.hsZ || 0));
      if (m - (this.hsT || -9) < 0.5 && p < 1.2) return;
      ((this.hsT = m), (this.hsX = t.pos.x), (this.hsZ = t.pos.z));
      for (let x = 0; x < _C.length; x += 2) {
        let g = _C[x],
          b = _C[x + 1],
          v = t.pos.x + n * g + a * b,
          y = t.pos.z + i * g + r * b,
          M = e.spotFloor(v, y, t.pos.y, !1),
          w = Math.hypot(g, b),
          T = t.pos.x + ((v - t.pos.x) / w) * 0.9,
          S = t.pos.z + ((y - t.pos.z) / w) * 0.9;
        if (
          M === M &&
          Math.abs(M - t.pos.y) < 0.35 &&
          e.walk(T, t.pos.y, S, v, M, y, !1)
        ) {
          ((this.heelX = v),
            (this.heelY = M),
            (this.heelZ = y),
            (this.heelOk = !0),
            (this.heelFront = !0));
          return;
        }
      }
    }
    this.heelFront = !1;
    for (let l = 0; l < 2; l++) {
      let c = l ? 0.95 : -0.95,
        h = t.pos.x + a * c - n * 0.45,
        f = t.pos.z + r * c - i * 0.45,
        u = e.spotFloor(h, f, t.pos.y, !1);
      if (u === u && Math.abs(u - t.pos.y) < 0.35) {
        ((this.heelX = h),
          (this.heelY = u),
          (this.heelZ = f),
          (this.heelOk = !0));
        return;
      }
    }
    ((this.heelX = t.pos.x),
      (this.heelY = t.pos.y),
      (this.heelZ = t.pos.z),
      (this.heelOk = !1));
  }
  _heel(t, e) {
    let s = this.owner,
      n = this.e;
    if (this.target) {
      this.phase = "hunt";
      return;
    }
    if (((this.mode = "move"), !s)) {
      ((this.mode = "idle"), (this.hasLook = !1));
      return;
    }
    let i = this.heelX - n.x,
      a = this.heelZ - n.z,
      r = Math.hypot(i, a),
      l = Math.hypot(s.pos.x - n.x, s.pos.z - n.z),
      c = s.alive && s.vel ? Math.hypot(s.vel.x, s.vel.z) : 0;
    if (
      ((this.scanT -= t) <= 0 &&
        ((this.scan = 1 - this.scan),
        (this.scanT = this.scan
          ? randomRange(2.2, 3.6)
          : randomRange(0.9, 1.5))),
      this.scan && s.alive)
    ) {
      let f = s.aimYaw !== void 0 ? s.aimYaw : s.yaw || 0;
      this.look.set(
        s.pos.x - Math.sin(f) * 12,
        s.pos.y + 1.3,
        s.pos.z - Math.cos(f) * 12,
      );
    } else this.look.set(s.pos.x, s.pos.y + (s.alive ? 1.6 : 0.3), s.pos.z);
    if (((this.hasLook = !0), this.sitting)) {
      this.mode = "sit";
      let f = !1;
      if (this.heelFront && s.isPlayer) {
        let u = s.yaw || 0;
        ((this.outT =
          (n.x - s.pos.x) * -Math.sin(u) + (n.z - s.pos.z) * -Math.cos(u) <
          l * 0.3
            ? (this.outT || 0) + t
            : 0),
          (f = this.outT > 1.1));
      }
      (l > (this.heelFront ? 8.5 : 2.8) ||
        c > 3 ||
        f ||
        Math.abs(s.pos.y - n.y) > 1) &&
        ((this.outT = 0),
        (this.sitting = !1),
        (this.idleT = 0),
        (this.thinkT = 0),
        (this.holdT = e + (this.rig.timing.stand || 0)),
        (this.mode = "idle"));
      return;
    }
    if (e < this.holdT) {
      this.mode = "idle";
      return;
    }
    let h = this.heelOk ? 0.45 : 1.3;
    if (r > h || Math.abs(this.heelY - n.y) > 0.7) {
      let f =
        l > 9
          ? u1.gallop * 0.85
          : l > 3.2
            ? u1.trot
            : Math.max(u1.walk, Math.min(u1.trot, c + 0.6));
      this.direct
        ? ((this.wx = i / (r || 1)),
          (this.wz = a / (r || 1)),
          (this.wSpeed = Math.min(
            f,
            Math.sqrt(2 * 9 * Math.max(0, r - 0.15)) + 0.6,
          )),
          (this.idleT = 0))
        : this._steer(this.heelX, this.heelY, this.heelZ, f, 0.8)
          ? (this.idleT = 0)
          : (this.idleT += t);
    } else this.idleT += t;
    this.wSpeed < 0.05 &&
      ((this.mode = "idle"),
      (this.faceYaw = s.alive ? s.yaw || 0 : this.yaw),
      this.idleT > 0.9 && c < 1.2 && n.onGround && (this.sitting = !0));
  }
  _bark(t) {
    let e = this.sys,
      s = this.rig.bark() || 0;
    ((this.barked = !0),
      (this.barkT = t),
      Math.hypot(this.vel.x, this.vel.z) < 1.3 &&
        this.e.onGround &&
        (this.holdT = Math.max(
          this.holdT,
          t + (s || this.rig.timing.bark || 0),
        )),
      e.sfx("alert", this.pos, e.opts(s, null, this.team !== e.player.team)));
  }
  _hunt(t, e) {
    let s = this.target,
      n = this.e;
    if (!s) {
      ((this.phase = "heel"),
        (this.idleT = 0),
        (this.sitting = !1),
        (this.pn = this.pi = 0),
        (this.replan = !0),
        (this.direct = this.hurdle = !1),
        (this.thinkT = 0));
      return;
    }
    let i = s.pos.x - n.x,
      a = s.pos.z - n.z,
      r = s.pos.y - n.y,
      l = Math.hypot(i, a) || 1e-4;
    if (
      (this.look.set(s.pos.x, s.pos.y + Ju(s), s.pos.z),
      (this.hasLook = !0),
      (this.mode = "move"),
      this.los && !this.barked && l < ve.barkRange && this._bark(e),
      e < this.holdT)
    ) {
      ((this.mode = "idle"), (this.faceYaw = Math.atan2(-i, -a)));
      return;
    }
    if (this.los && l < ve.attackRange && r > -4.6 && r < 1.4 && n.onGround) {
      if (((this.unreachT = 0), e >= this.leapCool && this.leapClear)) {
        this._startAttack(e);
        return;
      }
      if (e < this.leapCool) {
        (l < 2.2 &&
          ((this.wx = -i / l),
          (this.wz = -a / l),
          (this.wSpeed = u1.walk * 1.5),
          (this.strafe = !0)),
          (this.faceYaw = Math.atan2(-i, -a)));
        return;
      }
    }
    if (this.direct || this.hurdle) {
      if (
        ((this.wx = i / l),
        (this.wz = a / l),
        (this.wSpeed =
          this.stairT > 0
            ? this.stairDir < 0
              ? ve.stairDown
              : ve.stairSpeed
            : u1.gallop),
        (this.unreachT = 0),
        this.hurdle && n.onGround)
      ) {
        let c = Math.hypot(this.vel.x, this.vel.z),
          h = 0.55 + c * 0.1;
        c > 2.5 &&
          this.sys.world.groundAt(
            n.x + this.wx * h,
            n.z + this.wz * h,
            n.y + 1.02,
          ) >
            n.y + ve.step + 0.03 &&
          this._tryHop(s) &&
          this.sys.note("hurdle", this);
      }
    } else
      this._steer(s.pos.x, s.pos.y, s.pos.z, u1.gallop, u1.gallop) ||
        ((this.faceYaw = Math.atan2(-i, -a)),
        (this.unreachT += t),
        this.los && l > 1.6 && e > this.creepStop
          ? ((this.wx = i / l),
            (this.wz = a / l),
            (this.wSpeed = u1.trot),
            (this.creep = !0),
            (this.edge > 0 || n.hitWall) &&
              ((this.creepStop = e + 0.8), (this.wSpeed = 0)))
          : (this.mode = "idle"));
  }
  _startAttack(t) {
    ((this.phase = "attack"),
      (this.atkT = 0),
      this.barked
        ? t - this.barkT < ve.barkHold || t < this.holdT
          ? ((this.atkStage = 0), (this.atkT = t - this.barkT))
          : ((this.atkStage = 1),
            this.sys.sfx(
              "windup",
              this.pos,
              this.sys.opts(this.rig.timing.windup),
            ))
        : (this._bark(t), (this.atkStage = 0)));
  }
  _attack(t, e) {
    let s = this.target,
      n = this.e,
      i = this.sys;
    if (!s || !s.alive) {
      this.phase = "hunt";
      return;
    }
    let a = s.pos.x - n.x,
      r = s.pos.z - n.z,
      l = s.pos.y - n.y,
      c = Math.hypot(a, r) || 1e-4;
    if (
      (this.look.set(s.pos.x, s.pos.y + Ju(s), s.pos.z),
      (this.hasLook = !0),
      (this.faceYaw = Math.atan2(-a, -r)),
      (this.strafe = !0),
      (this.atkT += t),
      this.atkStage === 0)
    ) {
      ((this.mode = "move"),
        this.atkT >= ve.barkHold &&
          e >= this.holdT &&
          ((this.atkStage = 1),
          (this.atkT = 0),
          i.sfx("windup", this.pos, i.opts(this.rig.timing.windup))));
      return;
    }
    ((this.mode = "windup"),
      !(this.atkT < this.rig.timing.windup) &&
        (e3.set(n.x, n.y + 0.6, n.z),
        s6.copy(this.look),
        n.onGround &&
        c < ve.attackRange + 1.6 &&
        l > -4.8 &&
        l < 1.6 &&
        i.world.clear(e3, s6) &&
        (this.lob = this._arcOk(s, 0) ? 0 : this._arcOk(s, 0.52) ? 0.52 : -1) >=
          0
          ? this._launch(s, c, e)
          : ((this.phase = "hunt"),
            (this.mode = "move"),
            (this.leapCool = e + 0.3))));
  }
  _arcOk(t, e) {
    let s = this.e,
      n = this.sys.world,
      i = t.pos.x - s.x,
      a = t.pos.z - s.z,
      r = Math.hypot(i, a);
    if (r < 0.9) return !0;
    let l = Math.max(e, clamp(r / ve.leapSpeed, ve.leapMin, ve.leapMax)),
      c = Math.max(0.05, r - 0.45),
      h = clamp(
        (t.pos.y + Ju(t) - 0.55 - s.y + 0.5 * Dh * l * l) / l,
        2.2,
        9.5,
      ),
      f = Math.max(3, Math.ceil(c / 0.45));
    for (let u = 1; u <= f; u++) {
      let d = u / (f + 0.6),
        m = d * l,
        p = s.x + (i / r) * c * d,
        x = s.z + (a / r) * c * d,
        g = s.y + h * m - 0.5 * Dh * m * m,
        b = n.overlap(
          p - 0.26,
          g + 0.06,
          x - 0.26,
          p + 0.26,
          g + 0.62,
          x + 0.26,
          !0,
        );
      if (
        (b &&
          b.pane &&
          b.pane.support === "frame" &&
          (b = n.overlap(
            p - 0.26,
            g + 0.06,
            x - 0.26,
            p + 0.26,
            g + 0.62,
            x + 0.26,
            !1,
          )),
        b)
      )
        return !1;
    }
    return !0;
  }
  _launch(t, e, s) {
    let n = this.e,
      i = this.vel,
      a = this.sys,
      r = this.lob > 0 ? this.lob : 0,
      l = Math.max(r, clamp(e / ve.leapSpeed, ve.leapMin, ve.leapMax)),
      c = t.pos.x + this.tv.x * l * ve.lead,
      h = t.pos.z + this.tv.z * l * ve.lead,
      f = t.pos.y + Ju(t),
      u = Math.hypot(c - n.x, h - n.z) || 1e-4,
      d = (c - n.x) / u,
      m = (h - n.z) / u;
    l = Math.max(r, clamp(u / ve.leapSpeed, ve.leapMin, ve.leapMax));
    let p = Math.max(0.05, u - 0.45);
    ((i.x = (d * p) / l),
      (i.z = (m * p) / l),
      (i.y = clamp((f - 0.55 - n.y + 0.5 * Dh * l * l) / l, 2.2, 9.5)),
      this.leapDir.set(d, 0, m),
      (this.leapT = 0),
      (this.leapDur = l),
      (this.yaw = Math.atan2(-d, -m)),
      (this.phase = "leap"),
      (this.mode = "leap"),
      (n.onGround = !1),
      (this.leapCool = s + ve.leapCooldown),
      a.sfx("leap", this.pos));
  }
  _leap(t, e) {
    let s = this.target,
      n = this.e,
      i = this.vel,
      a = this.sys,
      r = this.leapDir;
    if (((this.leapT += t), (this.mode = "leap"), s && s.alive)) {
      this.look.set(s.pos.x, s.pos.y + Ju(s), s.pos.z);
      let h = this.leapDur - this.leapT;
      if (h > 0.03) {
        let f =
            s.pos.x + this.tv.x * h * ve.lead - (n.x + r.x * 0.45 + i.x * h),
          u = s.pos.z + this.tv.z * h * ve.lead - (n.z + r.z * 0.45 + i.z * h),
          d = f * r.x + u * r.z;
        ((f -= d * r.x), (u -= d * r.z));
        let m = Math.hypot(f, u);
        if (m > 0.02) {
          let p = Math.min(ve.airSteer, (2 * m) / (h * h)) * t;
          ((i.x += (f / m) * p), (i.z += (u / m) * p));
        }
      }
    }
    i.y -= Dh * t;
    let l = Math.hypot(i.x, i.z);
    if (l > 1) {
      let h = Math.max(0.55, l * 0.09) / l;
      a.world.groundAt(n.x + i.x * h, n.z + i.z * h, n.y + 0.6) < n.y - 5.2 &&
        ((i.x = i.z = 0), (l = 0));
    }
    let c = this.mv;
    if (
      ((c.step = 0),
      (c.snap = !1),
      a.world.move(n, i.x * t, i.y * t, i.z * t, c),
      l > 1 && (this.yaw = Math.atan2(-i.x, -i.z)),
      s && s.alive && this._bite(s))
    ) {
      this._connect(s, e);
      return;
    }
    (n.hitWall && ((i.x *= 0.25), (i.z *= 0.25)),
      n.hitCeil && i.y > 0 && (i.y = 0),
      (n.onGround || this.leapT > 1.8) &&
        (n.onGround && this._landed(-i.y),
        (i.y = 0),
        (this.phase = "recover"),
        (this.recT = 0),
        (this.mode = "move")),
      n.y < -7 && this._fell());
  }
  _bite(t) {
    let e = this.e,
      s = this.leapDir,
      n = t.e || t.pos,
      i = t.e ? t.e.h : 1.8,
      a = e.x + s.x * 0.45,
      r = e.y + 0.55,
      l = e.z + s.z * 0.45,
      c = t.pos.y + 0.15,
      h = t.pos.y + Math.max(0.3, i - 0.1),
      f = r < c ? c : r > h ? h : r,
      u = a - n.x,
      d = l - n.z,
      m = r - f;
    return u * u + d * d + m * m < ve.biteRadius * ve.biteRadius;
  }
  _connect(t, e) {
    let s = this.sys,
      n = this.leapDir,
      i = this.owner,
      a = s.player;
    ((this.phase = "takedown"),
      (this.mode = "takedown"),
      (this.tdT = 0),
      (this.tdTick = 0),
      (this.tdDmg = 0),
      (this.tdShock = 1),
      (this.tdDealt = 0),
      (this.tdDur = this.rig.timing.takedown),
      (this.victim = t),
      (this.pinning = t),
      (this.corpse = null),
      (this.vel.x *= 0.3),
      (this.vel.z *= 0.3),
      eo.set(t.pos.x, t.pos.y + Ju(t), t.pos.z),
      s.sfx("takedown", eo, s.opts(this.tdDur)),
      this.rig.signals || this._shock(eo, 10),
      t === a
        ? ((a.k9Pin = this),
          a.mode !== "mantle" &&
            ((a.vel.x += n.x * 4.5), (a.vel.z += n.z * 4.5)),
          a.addShake(0.95),
          (a.kickPitch += 0.09),
          (a.kickRoll += (Math.random() < 0.5 ? -1 : 1) * 0.07),
          a.knockDown && a.knockDown(),
          s.match.damage(t, ve.hitDamage, i, {
            weapon: "k9",
            dir: n,
            point: eo,
            from: this.pos,
            k9: this,
          }))
        : (s.match.damage(t, 999, i, {
            weapon: "k9",
            dir: n,
            point: eo,
            from: this.pos,
            k9: this,
          }),
          !t.alive &&
            t.corpses &&
            t.corpses.length &&
            (this.corpse = t.corpses[t.corpses.length - 1].body)));
  }
  _shock(t, e) {
    let s = this.sys.fx;
    (s.sparks(t.x, t.y, t.z, 0, 0.4, 0, e, gU),
      s.glowPuff(t.x, t.y, t.z, 0.7, s3, 0.07));
  }
  _takedown(t, e) {
    let s = this.victim,
      n = this.e,
      i = this.sys,
      a = this.leapDir,
      r = this.owner,
      l = i.player,
      c = this.vel,
      h = this.corpse;
    ((this.tdT += t), (this.mode = "takedown"));
    let f, u, d, m;
    if (s === l) {
      let E = -Math.sin(l.yaw),
        _ = -Math.cos(l.yaw),
        R = 0.85;
      (i.world.raycast(l.e.x, l.e.y + 0.3, l.e.z, E, 0, _, 1.3, mU) &&
        (R = Math.max(0.15, mU.t - 0.42)),
        (f = l.e.x + E * R),
        (d = l.e.z + _ * R),
        (u = l.e.y),
        (m = l.yaw + Math.PI),
        this.look.copy(l.eye));
    } else
      h && !h.dead
        ? ((f = h.x[6] - a.x * 0.22),
          (d = h.x[8] - a.z * 0.22),
          (u = h.x[7] - 0.2),
          (m = Math.atan2(-a.x, -a.z)),
          this.look.set(h.x[0], h.x[1], h.x[2]))
        : ((f = s.pos.x - a.x * 0.35),
          (d = s.pos.z - a.z * 0.35),
          (u = s.pos.y),
          (m = Math.atan2(-a.x, -a.z)),
          this.look.set(s.pos.x, s.pos.y + 0.4, s.pos.z));
    let p = i.world.groundAt(f, d, Math.max(n.y, u) + 0.5),
      x = p > n.y - 3 ? p : n.y;
    h &&
      !h.dead &&
      h.x[7] > x + 0.32 &&
      this.tdT < 0.6 &&
      i.physics.impulse(
        h,
        h.x[0],
        h.x[1],
        h.x[2],
        a.x * 420 * t,
        -1500 * t,
        a.z * 420 * t,
      );
    let g = n.x,
      b = n.z,
      v = 1 - Math.exp(-16 * t);
    ((n.x += (f - n.x) * v),
      (n.z += (d - n.z) * v),
      n.y > x + 0.01
        ? ((c.y -= Dh * t),
          (n.y += c.y * t),
          n.y <= x
            ? ((n.y = x), (n.onGround = !0), this._landed(-c.y), (c.y = 0))
            : (n.onGround = !1))
        : ((n.y = x), (n.onGround = !0), (c.y = 0)),
      t > 0 && ((c.x = (n.x - g) / t), (c.z = (n.z - b) / t)));
    let y = 14 * t;
    ((this.yaw += clamp(angleDelta(this.yaw, m), -y, y)), (this.hasLook = !0));
    let M = this.rig.signals,
      w = M ? M.shock : 0,
      T = M
        ? w > 0.55 && this.tdShock <= 0.55
        : this.tdTick < 3 &&
          this.tdT >= this.tdDur * (0.21 + 0.25 * this.tdTick);
    if (
      ((this.tdShock = w),
      (T &&
        this.tdTick < 3 &&
        (this.tdTick++,
        M ||
          (eo.set(n.x, n.y + 0.4, n.z).lerp(this.look, 0.5),
          this._shock(eo, 6)),
        h &&
          !h.dead &&
          i.physics.impulse(
            h,
            h.x[6],
            h.x[7],
            h.x[8],
            randomRange(-60, 60),
            190,
            randomRange(-60, 60),
          ),
        s === l &&
          l.alive &&
          (l.addShake(0.4),
          (l.kickPitch += 0.03),
          (l.kickRoll += (Math.random() < 0.5 ? -1 : 1) * 0.04),
          (this.tdDealt += ve.pinJolt),
          i.match.damage(l, ve.pinJolt, r, {
            weapon: "k9",
            dir: a,
            point: l.eye,
            from: this.pos,
            k9: this,
          }),
          !this.alive || this.phase !== "takedown"))) ||
        (this.tdT < this.tdDur && !(s === l && !l.alive && this.tdT > 0.4)) ||
        (s === l &&
          l.alive &&
          this.tdDealt < ve.pinDamage &&
          (l.addShake(0.5),
          i.match.damage(l, ve.pinDamage - this.tdDealt, r, {
            weapon: "k9",
            dir: a,
            point: l.eye,
            from: this.pos,
            k9: this,
          }),
          !this.alive)))
    )
      return;
    let S = s.alive;
    (this._unglue(this._release()),
      (this.leapCool = e + ve.leapCooldown),
      S
        ? ((this.phase = "circle"),
          (this.circleT = ve.circleTime),
          (this.mode = "move"))
        : ((this.phase = "recover"),
          (this.recT = 0),
          (this.mode = "move"),
          (this.target = null),
          (this.thinkT = 0)));
  }
  _release() {
    let t = this.victim;
    return (
      t && t.k9Pin === this && (t.k9Pin = null),
      (this.victim = null),
      (this.pinning = null),
      t
    );
  }
  _unglue(t) {
    let e = this.e;
    if (
      this.sys.world.overlap(
        e.x - e.r,
        e.y + 0.05,
        e.z - e.r,
        e.x + e.r,
        e.y + e.h,
        e.z + e.r,
        !0,
      )
    ) {
      let n = t && t.e;
      n &&
        ((e.x = n.x),
        (e.z = n.z),
        (e.y = Math.max(n.y + 0.02, Math.min(e.y, n.y + n.h - e.h))));
    }
    ((e.onGround = !1), (this.air = !0));
  }
  _circle(t, e) {
    let s = this.target,
      n = this.e;
    if (((this.mode = "move"), !s || (this.circleT -= t) <= 0)) {
      ((this.phase = s ? "hunt" : "heel"), (this.thinkT = 0));
      return;
    }
    let i = n.x - s.pos.x,
      a = n.z - s.pos.z,
      r = Math.hypot(i, a) || 1e-4;
    (n.hitWall || this.edge > 0) &&
      e - this.flipT > 0.4 &&
      ((this.circleDir = -this.circleDir), (this.flipT = e));
    let l = clamp((5.5 - r) / 2.5, -0.4, 1),
      c = 1 - Math.abs(l) * 0.55,
      h = this.circleDir,
      f = (i / r) * l - (a / r) * h * c,
      u = (a / r) * l + (i / r) * h * c,
      d = Math.hypot(f, u) || 1;
    ((this.wx = f / d),
      (this.wz = u / d),
      (this.wSpeed = ve.circleSpeed),
      this.look.set(s.pos.x, s.pos.y + Ju(s), s.pos.z),
      (this.hasLook = !0));
  }
  _pane(t) {
    if (t.support !== "frame") return !1;
    let e = this.vel,
      s = Math.abs(t.axis === 0 ? e.x : e.z);
    return this.sys.glass.bodyHit(
      t,
      this.e.x,
      this.e.y + 0.45,
      this.e.z,
      e.x,
      e.y,
      e.z,
      this.phase === "leap" || s > 3,
    )
      ? !0
      : ((this.noGlass = this.sys.time() + 3),
        (this.direct = this.hurdle = !1),
        (this.replan = !0),
        !1);
  }
  _cliff(t, e, s) {
    let n = this.sys.world.groundAt(t, e, this.e.y + 0.6 + 0.8 * s);
    return (
      n < this.e.y - ve.drop - 0.7 * s ||
      (n < -0.3 && this.sys.hotel.inPool(t, e))
    );
  }
  _landed(t) {
    let e = this.sys,
      s = this.e;
    if (((this.air = !1), t > 3)) {
      let n = s.groundCol ? s.groundCol.surf : "marble";
      (e.sfx("land", this.pos.set(s.x, s.y, s.z), e.opts(0, n)),
        e.fx.land && e.fx.land(this.pos, n, saturate(t / 14)));
    }
  }
  _fell() {
    (this.sys.note("fell", this), this._die(null, null));
  }
  _move(t, e) {
    let s = this.sys,
      n = this.e,
      i = this.vel,
      a = s.world,
      r = Math.hypot(i.x, i.z),
      l = n.y < -0.4 && s.hotel.inPool(n.x, n.z),
      c = this.target;
    if (
      (l &&
        !(
          c &&
          c.pos.y < -0.3 &&
          s.hotel.inPool(c.pos.x, c.pos.z) &&
          this.phase !== "circle"
        ) &&
        this._poolOut(),
      this.carryT > 0 &&
        ((this.carryT -= t),
        n.onGround
          ? this.carryT < 0.6 && (this.carryT = 0)
          : ((i.x = this.carryX), (i.z = this.carryZ))),
      this.backT > 0 &&
        ((this.backT -= t),
        (this.wx = this.backX),
        (this.wz = this.backZ),
        (this.wSpeed = u1.walk * 1.6),
        (this.strafe = !0),
        (this.faceYaw = this.yaw)),
      this.edge > 0 && ((this.edge -= t), this.wSpeed > 3 && (this.wSpeed = 3)),
      this.avT > 0 && this.wSpeed > 0.1)
    ) {
      this.avT -= t;
      let g = this.wx * this.avK + this.avX,
        b = this.wz * this.avK + this.avZ,
        v = Math.hypot(g, b) || 1;
      ((this.wx = g / v),
        (this.wz = b / v),
        (this.wSpeed = clamp(this.wSpeed, 2.4, this.avK < 1 ? u1.trot : 7)));
    } else if (n.onGround && r > 1.5 && this.wSpeed > 1) {
      let g = (0.4 + r * 0.07) / r,
        b = n.x + i.x * g,
        v = n.z + i.z * g,
        y = a.groundAt(
          n.x + i.x * g * 0.5,
          n.z + i.z * g * 0.5,
          n.y + ve.step + 0.01,
        );
      if (
        (y < n.y - 0.6 && (y = n.y),
        (y = a.groundAt(b, v, y + ve.step + 0.01)),
        y > n.y - 0.8)
      ) {
        let M = a.overlap(
          b - n.r,
          y + ve.step + 0.03,
          v - n.r,
          b + n.r,
          y + n.h,
          v + n.r,
          !1,
        );
        M && this._sidestep(M, 1.1);
      }
    }
    if (n.onGround) {
      let g = this.wx * this.wSpeed,
        b = this.wz * this.wSpeed;
      if (this.wSpeed > 0.1 && r < 3 && !this.strafe) {
        let w = -Math.sin(this.yaw) * this.wx - Math.cos(this.yaw) * this.wz,
          T = clamp(0.3 + (0.7 * (w + 0.3)) / 1.3, 0.3, 1);
        ((g *= T), (b *= T));
      }
      let v = g - i.x,
        y = b - i.z;
      if (r > 0.6) {
        let w = i.x / r,
          T = i.z / r,
          S = clamp(v * w + y * T, -ve.brake * t, ve.accel * t),
          E = clamp(y * w - v * T, -ve.grip * t, ve.grip * t);
        ((i.x += w * S - T * E), (i.z += T * S + w * E));
      } else {
        let w = Math.hypot(v, y),
          T = ve.accel * t;
        w <= T
          ? ((i.x = g), (i.z = b))
          : ((i.x += (v / w) * T), (i.z += (y / w) * T));
      }
      let M = s.match.actors;
      for (let w = 0; w < M.length; w++) {
        let T = M[w];
        if (T === this || !T.alive) continue;
        let S = n.x - T.pos.x,
          E = n.z - T.pos.z,
          _ = S * S + E * E;
        if (_ < 0.64 && _ > 1e-4 && Math.abs(T.pos.y - n.y) < 1.2) {
          let R = Math.sqrt(_),
            C = 40 * t * (0.8 - R);
          ((i.x += (S / R) * C), (i.z += (E / R) * C));
        }
      }
      if (((r = Math.hypot(i.x, i.z)), r > 0.3 && !l)) {
        let w = i.x / r,
          T = i.z / r,
          S = n.r + 0.3;
        if (this._cliff(n.x + w * S, n.z + T * S, 0)) {
          let E = !this._cliff(n.x + Math.sign(i.x) * S, n.z, 0),
            _ = !this._cliff(n.x, n.z + Math.sign(i.z) * S, 0);
          ((!E || _ === E) && (i.x = 0),
            (!_ || _ === E) && (i.z = 0),
            (this.edge = 0.35));
        } else if (r > 3) {
          let E = r * 0.2;
          if (this._cliff(n.x + w * (S + E), n.z + T * (S + E), E)) {
            let _ = Math.max(0, 1 - (ve.brake * 1.3 * t) / r);
            ((i.x *= _), (i.z *= _), (this.edge = 0.35));
          }
        }
      }
    }
    i.y -= Dh * t;
    let h = n.x,
      f = n.z,
      u = n.onGround,
      d = i.y,
      m = this.mv;
    ((m.step = ve.step),
      (m.snap = u && i.y <= 0),
      a.move(n, i.x * t, i.y * t, i.z * t, m),
      n.onGround
        ? (u || this._landed(-d), (i.y = 0))
        : n.hitCeil && i.y > 0 && (i.y = 0),
      Math.abs(n.stepped) > 0.03
        ? ((this.stairT = 0.3), (this.stairDir = n.stepped))
        : this.stairT > 0 && (this.stairT -= t));
    let p = Math.hypot(n.x - h, n.z - f);
    if ((n.hitWall && (this.wall = n.hitWall), n.hitWall && t > 0)) {
      let g = (n.x - h) / t,
        b = (n.z - f) / t;
      (Math.abs(g) < Math.abs(i.x) * 0.5 && (i.x = g),
        Math.abs(b) < Math.abs(i.z) * 0.5 && (i.z = b));
    }
    (this.wSpeed > 1 &&
    n.onGround &&
    !this.creep &&
    p < Math.max(0.3, this.wSpeed * 0.22) * t
      ? ((this.stuckT += t),
        this.stuckT > (this.stuckLv ? 0.4 : 0.14) &&
          this._unstick(e, "blocked"))
      : ((this.stuckT = Math.max(0, this.stuckT - t * 2)),
        this.stuckLv && e - this.lastRec > 3 && (this.stuckLv = 0)),
      (r = Math.hypot(i.x, i.z)));
    let x = this.faceYaw;
    if (
      (n.onGround
        ? r > 0.8 && !this.strafe
          ? (x = Math.atan2(-i.x, -i.z))
          : x !== x && this.wSpeed > 0.1 && (x = Math.atan2(-this.wx, -this.wz))
        : (x = r > 0.8 ? Math.atan2(-i.x, -i.z) : NaN),
      x === x)
    ) {
      let g =
        (ve.turnSlow + (ve.turnFast - ve.turnSlow) * saturate(r / u1.gallop)) *
        t;
      this.yaw += clamp(angleDelta(this.yaw, x), -g, g);
    }
    (this.air && !n.onGround
      ? (this.mode = "leap")
      : this.mode === "move" &&
        r < 0.2 &&
        this.wSpeed < 0.1 &&
        (this.mode = "idle"),
      s.physics.pushFrom(n.x, n.y, n.y + n.h, n.z, n.r + 0.08, i.x, i.z),
      n.y < -7 && this._fell());
  }
  _poolOut() {
    let t = this.e,
      e = this.sys.hotel.pool,
      s = t.x - e.x0,
      n = e.x1 - t.x,
      i = t.z - e.z0,
      a = e.z1 - t.z,
      r = Math.min(s, n, i, a);
    ((this.wx = r === s ? -1 : r === n ? 1 : 0),
      (this.wz = this.wx ? 0 : r === i ? -1 : 1),
      (this.wSpeed = u1.trot),
      (this.strafe = !1),
      r < 0.8 &&
        t.onGround &&
        ((this.carryX = this.wx * 3.4),
        (this.carryZ = this.wz * 3.4),
        (this.carryT = 0.9),
        (this.vel.y = 8.6),
        (t.onGround = !1),
        (this.air = !0),
        this.sys.sfx("leap", this.pos)));
  }
  _unstick(t, e) {
    let s = this.sys,
      n = this.e;
    if (t - this.lastRec < 0.35) return;
    ((this.stuckT = 0), (this.lastRec = t), this.recov++);
    let i = ++this.stuckLv;
    if (i === 1) {
      if (e === "blocked") {
        if (this._sidestep(this.wall, 0.4)) {
          (s.note("sidestep", this), (this.stuckLv = 0), this.recov--);
          return;
        }
        if (this._tryHop()) {
          s.note("hop", this);
          return;
        }
      }
      (s.note("reroute:" + e, this),
        (this.replan = !0),
        (this.direct = this.hurdle = !1),
        (this.noHurdle = t + 2.5),
        (this.thinkT = 0));
      return;
    }
    if (i === 2) {
      s.note("backup:" + e, this);
      let h = Math.hypot(this.wx, this.wz) || 1;
      ((this.backX = -this.wx / h + (this.wz / h) * 0.5 * this.circleDir),
        (this.backZ = -this.wz / h - (this.wx / h) * 0.5 * this.circleDir),
        (this.backT = 0.45),
        (this.replan = !0),
        (this.direct = this.hurdle = !1),
        (this.noHurdle = t + 2.5),
        (this.avT = 0),
        (this.circleDir = -this.circleDir));
      return;
    }
    let a = s.nav.nodes,
      r = null,
      l = 1e9;
    e3.set(n.x, n.y + 0.9, n.z);
    for (let h = 0; h < a.length; h++) {
      let f = a[h],
        u = Math.hypot(f.x - n.x, f.z - n.z);
      u > 6 ||
        u < 0.3 ||
        Math.abs(f.y - n.y) > 1.2 ||
        u >= l ||
        (s.world.clear(e3, s6.set(f.x, f.y + 0.9, f.z)) && ((l = u), (r = f)));
    }
    if (((this.stuckLv = 0), !r)) {
      (s.note("stranded:" + e, this), (this.replan = !0));
      return;
    }
    (s.note("rescue:" + e, this),
      (this.rs = this.rs || {
        t: 0,
        T: 0.5,
        x0: 0,
        y0: 0,
        z0: 0,
        x1: 0,
        y1: 0,
        z1: 0,
      }));
    let c = this.rs;
    ((c.t = 0),
      (c.T = clamp(l / 5, 0.32, 0.7)),
      (c.x0 = n.x),
      (c.y0 = n.y),
      (c.z0 = n.z),
      (c.x1 = r.x),
      (c.y1 = r.y),
      (c.z1 = r.z),
      (this.phase = "rescue"),
      (this.mode = "leap"),
      (this.replan = !0),
      (this.yaw = Math.atan2(-(r.x - n.x), -(r.z - n.z))));
  }
  _rescue(t) {
    let e = this.rs,
      s = this.e,
      n = s.x,
      i = s.y,
      a = s.z;
    e.t += t;
    let r = Math.min(1, e.t / e.T);
    ((s.x = e.x0 + (e.x1 - e.x0) * r),
      (s.z = e.z0 + (e.z1 - e.z0) * r),
      (s.y = e.y0 + (e.y1 - e.y0) * r + 4 * 0.55 * r * (1 - r)),
      (s.onGround = !1),
      t > 0 && this.vel.set((s.x - n) / t, (s.y - i) / t, (s.z - a) / t),
      (this.mode = "leap"),
      r >= 1 &&
        ((s.y = e.y1 + 0.02),
        this.vel.set(0, 0, 0),
        (this.phase = this.target ? "hunt" : "heel"),
        (this.mode = "move"),
        (this.air = !0),
        (this.thinkT = 0),
        (this.pn = this.pi = 0)));
  }
  _sidestep(t, e) {
    let s = this.e,
      n = this.sys.world;
    if (!t || t.pane || t.off) return !1;
    let i = Math.abs(this.wx) >= Math.abs(this.wz),
      a = s.r + 0.07,
      r = i ? s.z - (t.z0 - a) : s.x - (t.x0 - a),
      l = i ? t.z1 + a - s.z : t.x1 + a - s.x;
    if (r <= 0 || l <= 0) return !1;
    for (let c = 0; c < 2; c++) {
      let h = c === 0 ? r <= l : r > l,
        f = h ? r : l;
      if (f > 1.6) return !1;
      let u = i ? 0 : h ? -1 : 1,
        d = i ? (h ? -1 : 1) : 0,
        m = s.x + u * f,
        p = s.z + d * f;
      if (
        n.overlap(
          m - s.r,
          s.y + ve.step + 0.03,
          p - s.r,
          m + s.r,
          s.y + s.h,
          p + s.r,
          !0,
        ) ||
        this._cliff(m, p, 0)
      )
        continue;
      let x = m + (i ? Math.sign(this.wx) * 0.62 : 0),
        g = p + (i ? 0 : Math.sign(this.wz) * 0.62);
      if (
        !n.overlap(
          x - s.r,
          s.y + ve.step + 0.03,
          g - s.r,
          x + s.r,
          s.y + s.h,
          g + s.r,
          !0,
        )
      )
        return (
          (this.avX = u),
          (this.avZ = d),
          (this.avK = e),
          (this.avT = f / 2.6 + 0.18),
          !0
        );
    }
    return !1;
  }
  _tryHop(t) {
    let e = this.e,
      s = this.sys.world,
      n = Math.hypot(this.wx, this.wz);
    if (n < 0.5 || !e.onGround) return !1;
    let i = this.wx / n,
      a = this.wz / n,
      r = e.y + ve.step + 0.03,
      l = -1,
      c = -1,
      h = -1e9;
    for (let _ = 0.3; _ <= 2.6; _ += 0.15) {
      let R = s.groundAt(e.x + i * _, e.z + a * _, e.y + 1.02);
      if (R > r) {
        if (l < 0) {
          if (_ > 1.6) return !1;
          l = _;
        }
        ((c = _), R > h && (h = R));
      } else if (l >= 0 && _ > c + 0.4) break;
    }
    let f = h - e.y;
    if (l < 0 || f > 1 || c - l > 1.5) return !1;
    let u = clamp(f + 0.38, 0.55, 1.45),
      d = Math.sqrt(2 * Dh * u),
      m = Math.sqrt(d * d - 2 * Dh * (f + 0.06)),
      p = (d - m) / Dh,
      x = (d + m) / Dh,
      g = (2 * d) / Dh,
      b = Math.max(0, l - 0.34),
      v = c + 0.44,
      y = Math.hypot(this.vel.x, this.vel.z),
      M,
      w;
    b / p >= v / x
      ? ((M = clamp(y, v / x, b / p)), (w = M * g))
      : ((M = Math.max(2.4, ((v - b) / (x - p)) * 1.08)),
        (w = b + M * (g - p)));
    let T = e.x + i * w,
      S = e.z + a * w,
      E = this.sys.spotFloor(T, S, e.y, !0);
    if (E !== E || Math.abs(E - e.y) > 0.5) return !1;
    if (t && !this.sys.walk(T, E, S, t.pos.x, E, t.pos.z, !0, !1))
      return ((this.hurdle = !1), (this.noHurdle = this.sys.time() + 2.5), !1);
    for (let _ = 0.3; _ < w; _ += 0.3)
      if (
        s.overlap(
          e.x + i * _ - 0.3,
          h + 0.1,
          e.z + a * _ - 0.3,
          e.x + i * _ + 0.3,
          h + 0.8,
          e.z + a * _ + 0.3,
          !0,
        )
      )
        return !1;
    return (
      this.vel.set(i * M, d, a * M),
      (this.carryX = i * M),
      (this.carryZ = a * M),
      (this.carryT = g + 0.1),
      (e.onGround = !1),
      (this.air = !0),
      (this.mode = "leap"),
      (this.stuckT = 0),
      this.sys.sfx("leap", this.pos),
      !0
    );
  }
  damage(t, e, s) {
    if (!this.alive) return;
    let n = this.sys,
      i = n.time(),
      a = s && s.dir ? s.dir : null;
    if (
      ((this.health -= t),
      (this.lastHurt = i),
      i !== this.hitStamp && ((this.hitStamp = i), (this.hitSum = 0)),
      (this.hitSum += t),
      e &&
        e !== this &&
        e.team !== this.team &&
        ((this.lastAttacker = e), (this.lastAttackT = i)),
      this.health <= 0)
    ) {
      this._die(e, s);
      return;
    }
    (this.flinch && this.flinch(a, clamp(t / 40, 0.25, 1.5)),
      i - this.hitSfx > 0.12 && ((this.hitSfx = i), n.sfx("hit", this.pos)));
    let r = this.hitSum >= ve.heavyHit,
      l = this.phase;
    l === "takedown"
      ? ((this.tdDmg += t),
        (r || this.tdDmg >= ve.shotOff) && this._knockOff(a, i))
      : r &&
        l !== "stagger" &&
        l !== "flight" &&
        l !== "slide" &&
        l !== "unfold" &&
        l !== "rescue" &&
        ((this.phase = "stagger"),
        (this.mode = "stagger"),
        (this.staggerT = this.rig.timing.stagger),
        (this.after = this.target ? "hunt" : "heel"),
        (this.vel.x *= 0.3),
        (this.vel.z *= 0.3),
        a && ((this.vel.x += a.x * 2.5), (this.vel.z += a.z * 2.5)),
        (this.leapCool = Math.max(this.leapCool, i + 0.5)),
        n.sfx("stagger", this.pos, n.opts(this.staggerT)));
  }
  _knockOff(t, e) {
    let s = this.leapDir;
    (this._unglue(this._release()),
      (this.phase = "stagger"),
      (this.mode = "stagger"),
      (this.staggerT = this.rig.timing.stagger),
      (this.after = "circle"),
      t
        ? this.vel.set(t.x * 3.5, 2.4, t.z * 3.5)
        : this.vel.set(-s.x * 3, 2.4, -s.z * 3),
      (this.leapCool = e + ve.leapCooldown + 0.3),
      this.sys.sfx("stagger", this.pos, this.sys.opts(this.staggerT)));
  }
  _die(t, e) {
    if (!this.alive) return;
    let s = this.sys,
      n = this.e,
      i = s.fx,
      a = e && e.dir ? e.dir : null,
      r = this.phase === "takedown";
    ((this.alive = !1), (this.health = 0), this.deaths++);
    let l = this._release();
    (r && this._unglue(l),
      (this.phase = "dead"),
      (this.mode = "dead"),
      (this.wreckT = 0),
      (this.hasLook = !1),
      (this.target = null),
      (this.alert = 0),
      n.onGround
        ? this.vel.set(0, 0, 0)
        : ((this.vel.x *= 0.5), (this.vel.z *= 0.5)),
      this.pos.set(n.x, n.y, n.z),
      this.rig.die(a, e && e.blast ? "blast" : "shot"),
      i.sparks(n.x, n.y + 0.45, n.z, 0, 0.8, 0, 22, {
        speed: 6,
        life: 1.3,
      }),
      i.sparks(n.x, n.y + 0.45, n.z, 0, 0.5, 0, 8, {
        speed: 3.5,
        color: s3,
        life: 1,
      }),
      i.smoke(n.x, n.y + 0.4, n.z, 5, {
        size: 0.3,
        life: 1.8,
        a: 0.4,
        dy: 1,
        speed: 0.9,
      }),
      i.glowPuff(n.x, n.y + 0.45, n.z, 1.6, [7, 4.2, 1.6], 0.09),
      i.flashLight(eo.set(n.x, n.y + 0.5, n.z), 16756832, 26, 9, 0.12),
      s.sfx("destroyed", this.pos),
      s._remove(this),
      s.lost(this, "destroyed", t && t !== this ? t : null),
      this._write(0));
  }
  _expire() {
    if (!this.alive) return;
    let t = this.sys;
    (this.phase === "takedown"
      ? this._unglue(this._release())
      : this._release(),
      (this.alive = !1),
      (this.phase = "dead"),
      (this.mode = "dead"),
      (this.wreckT = 0),
      (this.hasLook = !1),
      (this.target = null),
      (this.alert = 0),
      this.e.onGround
        ? this.vel.set(0, 0, 0)
        : ((this.vel.x *= 0.5), (this.vel.z *= 0.5)),
      this.rig.die(null, "expire"),
      t.sfx("expire", this.pos),
      t._remove(this),
      t.lost(this, "expired", null),
      this._write(0));
  }
  _wreck(t) {
    let e = this.e,
      s = this.vel,
      n = this.sys;
    if (
      ((this.wreckT += t), !e.onGround || Math.abs(s.x) + Math.abs(s.z) > 0.05)
    ) {
      s.y -= Dh * t;
      let l = Math.exp(-(e.onGround ? 7 : 0.3) * t);
      ((s.x *= l), (s.z *= l));
      let c = this.mv;
      if (
        ((c.step = 0),
        (c.snap = !1),
        n.world.move(e, s.x * t, s.y * t, s.z * t, c),
        e.onGround && (s.y = 0),
        e.y < -30)
      ) {
        this._free();
        return;
      }
    }
    this.health <= 0 &&
      this.wreckT < 3.5 &&
      Math.random() < t * 5 &&
      (eo.setFromMatrixPosition(this.rig.anchors.body.matrixWorld),
      Math.random() < 0.35
        ? n.fx.sparks(
            eo.x + randomRange(-0.2, 0.2),
            eo.y + 0.1,
            eo.z + randomRange(-0.2, 0.2),
            0,
            1,
            0,
            4,
            ss0,
          )
        : n.fx.smoke(eo.x, eo.y + 0.15, eo.z, 1, ns0));
    let a = ve.wreckTime - this.wreckT;
    if (a <= 0) {
      this._free();
      return;
    }
    let r = !1;
    if (a < ve.fadeTime) {
      r = !0;
      let l = a / ve.fadeTime;
      this.rig.setOpacity
        ? (this.rig.setOpacity(l),
          l > 0.12 &&
            Math.random() < t * 26 &&
            (eo.setFromMatrixPosition(this.rig.anchors.body.matrixWorld),
            n.fx.sparks(
              eo.x + randomRange(-0.3, 0.3),
              eo.y + randomRange(0, 0.12),
              eo.z + randomRange(-0.3, 0.3),
              0,
              1,
              0,
              1,
              os0,
            )))
        : (this.sink = (1 - l) * (1 - l) * ve.sink);
    }
    {
      let l = this.rig.state;
      (this.pos.set(e.x, e.y, e.z),
        (l.x = e.x),
        (l.y = e.y - (this.sink || 0)),
        (l.z = e.z),
        (l.yaw = this.yaw),
        (l.vx = s.x),
        (l.vy = s.y),
        (l.vz = s.z),
        (l.grounded = !!e.onGround),
        (l.mode = "dead"),
        (l.lookAt = null),
        (l.hp = 0),
        (l.alert = 0),
        this.rig.update(t),
        this.ownHit && sv(this.rig.bones, this.hit));
    }
  }
  _free() {
    ((this.inUse = !1),
      (this.alive = !1),
      (this.phase = "off"),
      (this.sink = 0),
      (this.target = null),
      (this.owner = null),
      (this.rig.root.visible = !1),
      this.rig.setOpacity && this.rig.setOpacity(1),
      this.sys.loop(this.id, null, 0));
  }
};

export { K9System, kC };

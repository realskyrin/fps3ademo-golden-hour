// ai/match.js: recovered from the verified GOLDEN HOUR release.
import { Vector3 } from "../vendor/three-r180.js";
import { K9System } from "./k9/system.js";
import { BotController, hB } from "./bot.js";
import { randomRange } from "../core/math.js";
import {
  WEAPON_IDS,
  finishMatchProgress,
  rR,
  recordWeaponKill,
} from "../weapons/loadout.js";

var TEAM_NAMES = ["VANGUARD", "EMBER"];
var ls0 = 40;
var bU = 8 * 60;
var yU = new Vector3();
var vU = new Vector3();
var cs0 = [
  {
    x: -24.5,
    z: 4.25,
    yaw: -1.57,
    side: 0,
  },
  {
    x: -22.5,
    z: -2.5,
    yaw: -1.57,
    side: 0,
  },
  {
    x: -24.5,
    z: -16.5,
    yaw: -1.2,
    side: 0,
  },
  {
    x: -16.5,
    z: -17.5,
    yaw: 0,
    side: 0,
  },
  {
    x: -10.5,
    z: -11.5,
    yaw: -1.57,
    side: 0,
  },
  {
    x: -20,
    z: 15.5,
    yaw: -1.57,
    side: 0,
  },
  {
    x: -16,
    z: 3,
    yaw: -1.57,
    side: 0,
  },
  {
    x: 25,
    z: -16.5,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 20,
    z: -11,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 25.6,
    z: -6.3,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 24.3,
    z: 6.2,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 14,
    z: -2.5,
    yaw: 3.14,
    side: 1,
  },
  {
    x: 20,
    z: 15.5,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 10.5,
    z: -18,
    yaw: 1.57,
    side: 1,
  },
  {
    x: 0,
    z: -17.5,
    yaw: 0,
    side: -1,
  },
  {
    x: -10.5,
    y: 3.8,
    z: 2,
    yaw: -1.57,
    side: -1,
  },
  {
    x: 10.5,
    y: 3.8,
    z: 2,
    yaw: 1.57,
    side: -1,
  },
];
var MatchController = class {
  constructor(context) {
    ((this.ctx = context),
      (this.player = context.player),
      (this.bots = []),
      (this.actors = [this.player]),
      (this.scores = [0, 0]),
      (this.time = bU),
      (this.state = "idle"),
      (this.live = !1),
      (this.feed = []),
      (this.lastKillT = -99),
      (this.multi = 0),
      (this.endT = 0),
      (this.countdown = 0),
      (this.respawnT = 0),
      (this.scoreLimit = ls0),
      (this.k9 = new K9System(context, this)));
  }
  createBots(t = 5) {
    let e = hB.slice().sort(() => Math.random() - 0.5),
      s = ["ar", "smg", "ar", "shotgun", "ar"],
      n = 0;
    for (let i = 0; i < 2; i++) {
      let a = t - (i === 0 ? 1 : 0);
      for (let r = 0; r < a; r++) {
        let l = new BotController(this.ctx.botCtx, {
          team: i,
          name: e[n++],
          weapon: s[r % s.length],
        });
        (this.bots.push(l), this.actors.push(l));
      }
    }
  }
  nearestEnemy(t) {
    let e = null,
      s = 1e9;
    for (let n of this.actors) {
      if (!n.alive || n.team === t.team) continue;
      let i = n.pos.distanceToSquared(t.pos);
      i < s && ((s = i), (e = n));
    }
    return e;
  }
  pickSpawn(t, e) {
    let s = null,
      n = -1e9;
    for (let i of cs0) {
      let a = i.y || 0,
        r = 1e9,
        l = !1,
        c = 0;
      for (let f of this.actors) {
        if (f === t || !f.alive) continue;
        let u =
          Math.hypot(f.pos.x - i.x, f.pos.z - i.z) + Math.abs(f.pos.y - a) * 2;
        f.team !== t.team
          ? (u < r && (r = u),
            u < 30 &&
              (yU.set(i.x, a + 1.5, i.z),
              vU.set(f.pos.x, f.pos.y + 1.5, f.pos.z),
              this.ctx.world.clear(yU, vU) && (l = !0)))
          : u < 2.2 && c++;
      }
      let h = Math.min(r, 26) + randomRange(0, 6);
      (l && (h -= 22),
        c && (h -= 30),
        e
          ? (h =
              (i.side === t.team ? 100 : i.side === -1 ? -50 : -100) +
              randomRange(0, 10) -
              c * 50)
          : i.side === t.team && (h += 4),
        h > n && ((n = h), (s = i)));
    }
    return s;
  }
  respawn(t, e = !1) {
    let s = this.pickSpawn(t, e);
    (t.spawn(
      s.x + randomRange(-0.4, 0.4),
      s.y || 0,
      s.z + randomRange(-0.4, 0.4),
      s.yaw,
    ),
      (t.spawnT = this.ctx.time()),
      t.isPlayer &&
        (this.ctx.arsenal.reset(this.ctx.settings.primary),
        this.ctx.hud.respawned()));
  }
  start() {
    let { physics: t, glass: e, hud: s } = this.ctx;
    (this.k9.reset(),
      t.reset(),
      e.reset(),
      this.ctx.resetWorld(),
      (this.scores = [0, 0]),
      (this.time = bU),
      (this.feed.length = 0),
      (this.multi = 0));
    for (let n of this.actors)
      ((n.kills = n.deaths = n.score = n.streak = 0), (n.alive = !1));
    ((this.player.stats.shots =
      this.player.stats.hits =
      this.player.stats.head =
        0),
      this.respawn(this.player, !0));
    for (let n of this.bots) {
      for (let i of n.corpses.slice())
        ((i.char.root.visible = !1), n._freeCorpse(i.char));
      this.respawn(n, !0);
    }
    ((this.state = "countdown"),
      (this.countdown = 3.4),
      (this.live = !1),
      (this._beep = 4),
      s.matchStart());
  }
  damage(t, e, s, n) {
    if ((this.state !== "live" && this.state !== "ending") || !t.alive) return;
    let { hud: i, audio: a } = this.ctx,
      r = this.player;
    if (
      (s && s !== t && ((s._k9hit = t), (s._k9hitT = this.ctx.time())),
      t.isPlayer)
    ) {
      if (this.god) return;
      (this.ctx.time() - (r.spawnT || 0) < 1 && (e *= 0.35),
        (this._dmg = !0),
        r.damage(e, n && n.from ? n.from : s && s !== r ? s.pos : null, s),
        (this._dmg = !1));
    } else t.damage(e, s, n);
    let l = !t.alive;
    (s === r &&
      t !== r &&
      !(n && n.weapon === "k9") &&
      i.hit(n && n.head, l, n && n.pellet),
      l && this._kill(t, s, n || {}));
  }
  _kill(t, e, s) {
    let { hud: n, audio: i } = this.ctx,
      a = this.player,
      r = this.ctx.time();
    if (t.isK9) {
      this.k9.destroyed(t, e, s);
      return;
    }
    (t.deaths++, (t.streak = 0));
    let l = !e || e === t;
    if (
      (l || this.k9.onKill(t, e, s),
      l
        ? (s.weapon === "frag" || s.weapon === "fell") &&
          this.scores[1 - t.team]++
        : (e.kills++, (e.score += 100), e.streak++, this.scores[e.team]++),
      this.feed.push({
        k: l ? null : e,
        v: t,
        w: s.weapon || "ar",
        head: !!s.head,
        t: r,
      }),
      n.killfeed(l ? null : e, t, s.weapon || "ar", !!s.head),
      e === a && !l)
    ) {
      let c = [];
      if (s.weapon === "k9") this.k9.medals(s, c);
      else {
        if (WEAPON_IDS.includes(s.weapon)) {
          let f = recordWeaponKill(s.weapon, !!s.head);
          rR();
          for (let u of f) n.unlock && n.unlock(s.weapon, u);
        }
        (s.head && c.push("HEADSHOT"),
          r - this.lastKillT < 4
            ? (this.multi++,
              c.push(
                ["DOUBLE KILL", "TRIPLE KILL", "FURY KILL", "FRENZY KILL"][
                  Math.min(3, this.multi - 1)
                ],
              ))
            : (this.multi = 0),
          (this.lastKillT = r),
          a.mode === "slide"
            ? c.push("SLIDE KILL")
            : a.mode === "dive" || a.mode === "bellyslide"
              ? c.push("DIVE KILL")
              : a.e.onGround || c.push("AIRBORNE"));
        let h = t.pos.distanceTo(a.pos);
        (s.weapon === "melee"
          ? c.push("KNOCKOUT")
          : s.weapon === "frag"
            ? c.push("FRAGGED")
            : h > 34
              ? c.push("LONGSHOT")
              : h < 3 && s.weapon !== "shotgun" && c.push("POINT BLANK"),
          a.health < 25 && c.push("SURVIVOR"));
      }
      (a.streak === 5 && c.push("BLOODTHIRSTY"),
        a.streak === 10 && c.push("MERCILESS"),
        (a.score += c.length * 25),
        n.kill(t, c));
    }
    this.state === "live" &&
      (this.scores[0] >= this.scoreLimit ||
        this.scores[1] >= this.scoreLimit) &&
      this._end();
  }
  _end() {
    ((this.state = "ending"), (this.endT = 2.6), this.ctx.setTimeScale(0.22));
  }
  update(t, e) {
    let { hud: s, audio: n } = this.ctx,
      i = this.player;
    if ((this.k9.update(t), this.state === "countdown")) {
      this.countdown -= e;
      let a = Math.ceil(this.countdown);
      (a !== this._beep &&
        a >= 1 &&
        a <= 3 &&
        ((this._beep = a), n.ui("countdown"), s.count(a)),
        this.countdown <= 0 &&
          ((this.state = "live"), (this.live = !0), n.ui("go"), s.count(0)));
    } else if (this.state === "live")
      ((this.time -= t),
        this.time <= 0 && ((this.time = 0), this._end()),
        i.alive
          ? ((this.respawnT = 3.6),
            i.health < 100 &&
              this.ctx.time() - i.lastHurt > 4.2 &&
              (i.health = Math.min(100, i.health + 45 * t)))
          : ((this.respawnT -= t),
            s.respawnIn(Math.max(0, this.respawnT)),
            this.respawnT <= 0 && this.respawn(i)));
    else if (this.state === "ending" && ((this.endT -= e), this.endT <= 0)) {
      ((this.state = "over"),
        (this.live = !1),
        this.ctx.setTimeScale(1),
        this.k9.clear());
      let a =
        this.scores[0] === this.scores[1]
          ? -1
          : this.scores[0] > this.scores[1]
            ? 0
            : 1;
      (n.ui(a === 0 ? "victory" : "defeat"),
        (this.award = finishMatchProgress(i.score, a === 0)),
        s.matchEnd(a, this, this.award));
    }
  }
};

export { MatchController, TEAM_NAMES };

// ui/k9-hud.js: recovered from the verified GOLDEN HOUR release.
import { Vector3 } from "../vendor/three-r180.js";
import { P2, elementById, escapeHTML } from "./dom.js";
import { icon } from "./icons.js";
import { Oa, i6 } from "./preferences.js";

var GU = 276.46;
var HC = 25;
var WU = 8;
var Es0 = "cubic-bezier(.2,.8,.2,1)";
var FC = "cubic-bezier(.3,1.5,.5,1)";
var Ql = new Vector3();
var nd = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var d1 = (o) => {
  (o.cancel(), o.play());
};
var K9HUD = class {
  constructor(t) {
    this.hud = t;
    let e = (this.e = {
      fu: elementById("fu"),
      arc: elementById("fu-arc"),
      ico: elementById("fu-ico"),
      flash: elementById("fu-flash"),
      key: elementById("fu-key"),
      pct: elementById("fu-pct"),
      hp: elementById("fu-hp"),
      kills: elementById("fu-kills"),
      call: elementById("fu-call"),
      own: elementById("k9-own"),
      foe: elementById("k9-foe"),
      thr: elementById("k9-threat"),
      prox: elementById("k9-prox"),
      edge: elementById("k9-edge"),
      alarm: elementById("k9-alarm"),
      hudEl: elementById("hud"),
    });
    ((e.tile = e.fu.querySelector(".fu-tile")),
      (e.hpWrap = e.hp.parentElement),
      (e.ico.innerHTML = icon("k9")),
      (e.kills.innerHTML = icon("skull") + "<em>0</em>"),
      (e.killsN = e.kills.lastChild),
      e.own.firstChild.insertAdjacentHTML("afterbegin", icon("k9")),
      (e.ownBar = e.own.querySelector("u i")),
      e.foe.firstChild.insertAdjacentHTML(
        "afterbegin",
        `<em class="bd">${icon("k9")}</em>`,
      ),
      (e.foeBar = e.foe.querySelector("u i")),
      (e.foeTxt = e.foe.querySelector("span")),
      (e.thrArw = e.thr.querySelector(".arw")),
      (e.thrBd = e.thr.querySelector(".bd")),
      (e.thrTxt = e.thr.querySelector("b")),
      (e.thrBd.innerHTML = icon("k9")),
      (e.prox.innerHTML = icon("warn") + "ENEMY K9 CLOSE<b></b>"),
      (e.proxTxt = e.prox.lastChild),
      (e.edges = [...e.edge.children]));
    let s = (i, a, r) => {
        let l = i.animate(a, r);
        return (l.cancel(), l);
      },
      n = (this.a = {});
    ((n.flash = s(
      e.flash,
      [
        {
          opacity: 0.95,
          transform: "scale(.45)",
        },
        {
          opacity: 0,
          transform: "scale(1.75)",
        },
      ],
      {
        duration: 520,
        easing: "ease-out",
      },
    )),
      (n.punch = s(
        e.tile,
        [
          {
            transform: "scale(1.34)",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 460,
          easing: FC,
        },
      )),
      (n.tick = s(
        e.tile,
        [
          {
            transform: "scale(1.12)",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 240,
          easing: Es0,
        },
      )),
      (n.deny = s(
        e.fu,
        [
          {
            transform: "translateX(0)",
          },
          {
            transform: "translateX(-.7rem)",
          },
          {
            transform: "translateX(.6rem)",
          },
          {
            transform: "translateX(-.4rem)",
          },
          {
            transform: "translateX(.2rem)",
          },
          {
            transform: "translateX(0)",
          },
        ],
        {
          duration: 300,
          easing: "ease-out",
        },
      )),
      (n.denyI = s(
        e.ico,
        [
          {
            color: "#ff4326",
            offset: 0,
          },
          {
            color: "#ff4326",
            offset: 0.45,
          },
        ],
        {
          duration: 420,
        },
      )),
      (n.denyP = s(
        e.pct,
        [
          {
            color: "#ff4326",
            transform: "scale(1.2)",
            offset: 0,
          },
          {
            color: "#ff4326",
            transform: "scale(1)",
            offset: 0.45,
          },
        ],
        {
          duration: 420,
        },
      )),
      (n.kill = s(
        e.kills,
        [
          {
            transform: "scale(1.8)",
            color: "#ffd68a",
          },
          {
            transform: "scale(1)",
            color: "#fff",
          },
        ],
        {
          duration: 380,
          easing: FC,
        },
      )),
      (n.hurt = s(
        e.hpWrap,
        [
          {
            filter: "brightness(3)",
          },
          {
            filter: "brightness(1)",
          },
        ],
        {
          duration: 260,
          easing: "ease-out",
        },
      )),
      (n.off = s(
        e.ico,
        [
          {
            opacity: 1,
          },
          {
            opacity: 0.12,
          },
          {
            opacity: 0.9,
          },
          {
            opacity: 0.08,
          },
          {
            opacity: 0.6,
          },
          {
            opacity: 0.15,
          },
          {
            opacity: 1,
          },
        ],
        {
          duration: 560,
        },
      )),
      (n.alarm = s(
        e.alarm,
        P2
          ? [
              {
                opacity: 0,
              },
              {
                opacity: 0.55,
                offset: 0.2,
              },
              {
                opacity: 0,
              },
            ]
          : [
              {
                opacity: 0,
              },
              {
                opacity: 0.95,
                offset: 0.07,
              },
              {
                opacity: 0.22,
                offset: 0.3,
              },
              {
                opacity: 0.85,
                offset: 0.4,
              },
              {
                opacity: 0.2,
                offset: 0.62,
              },
              {
                opacity: 0.7,
                offset: 0.72,
              },
              {
                opacity: 0,
              },
            ],
        {
          duration: 1800,
        },
      )),
      (n.thrIn = s(
        e.thrBd,
        [
          {
            transform: "scale(2.2)",
            opacity: 0,
          },
          {
            transform: "scale(1)",
            opacity: 1,
          },
        ],
        {
          duration: 280,
          easing: FC,
        },
      )),
      (this.on = !1),
      (this.callA = null),
      (this.hinted = !1),
      (this.aim = !1),
      (this.W = 0),
      (this.H = 0),
      (this.lay = !0),
      addEventListener("resize", () => {
        this.lay = !0;
      }),
      this.reset());
  }
  layout() {
    this.lay = !0;
  }
  _layout() {
    let t = Oa.hudScale || 1;
    ((this.W = Math.min(innerWidth, innerHeight * 2.2) / t),
      (this.H = innerHeight / t),
      (this.lay = !1));
  }
  reset() {
    let t = this.e;
    ((this.st = ""),
      (this.arc = 0),
      (this.kills = 0),
      (this.lastKills = 0),
      (this.hpShown = 1),
      (this.hurtT = 0),
      (this.hinted = !1),
      (this.c = {
        off: -1,
        pct: -1,
        hpq: -1,
        low: "",
        ownOp: -1,
        ownBar: -1,
        ownX: 1e9,
        ownY: 1e9,
        foeOp: -1,
        foeBar: -1,
        foeX: 1e9,
        foeY: 1e9,
        foeD: -1,
        thr: !1,
        tx: 1e9,
        ty: 1e9,
        ta: 1e9,
        td: -1,
        close: !1,
        prox: !1,
        pd: -1,
        e0: -1,
        e1: -1,
        e2: -1,
        e3: -1,
        ek: !1,
        k9: !1,
      }),
      (this.foeMax = 1),
      (this.foeUnit = null),
      (t.fu.className = this.on ? "" : "hidden"),
      (t.arc.style.strokeDashoffset = GU),
      (t.pct.textContent = "0%"),
      (t.own.style.opacity = 0),
      (t.foe.style.opacity = 0),
      this._clearThreat(!0),
      this.callA && (this.callA.cancel(), (this.callA = null)));
  }
  _clearThreat(t) {
    let e = this.e,
      s = this.c;
    ((s.thr || t) && ((s.thr = !1), (e.thr.style.opacity = 0)),
      (s.close || t) && ((s.close = !1), e.thr.classList.remove("close")),
      (s.prox || t) && ((s.prox = !1), e.prox.classList.remove("on")),
      (s.ek || t) && ((s.ek = !1), e.edge.classList.remove("close")));
    for (let n = 0; n < 4; n++)
      (s["e" + n] !== 0 || t) &&
        ((s["e" + n] = 0), (e.edges[n].style.opacity = 0));
    ((s.k9 || t) && ((s.k9 = !1), e.hudEl.classList.remove("is-k9")),
      (s.foeOp !== 0 || t) && ((s.foeOp = 0), (e.foe.style.opacity = 0)));
  }
  _call(t, e, s) {
    let n = this.e.call,
      i = e * 1e3;
    ((n.innerHTML = t),
      (n.className = s ? "blue" : ""),
      this.callA && this.callA.cancel(),
      (this.callA = n.animate(
        [
          {
            opacity: 0,
            transform: "translateX(2.4rem)",
          },
          {
            opacity: 1,
            transform: "none",
            offset: 220 / i,
          },
          {
            opacity: 1,
            transform: "none",
            offset: 1 - 260 / i,
          },
          {
            opacity: 0,
            transform: "translateX(1.2rem)",
          },
        ],
        {
          duration: i,
          easing: "ease-out",
        },
      )));
  }
  event(t, e) {
    let s = this.hud,
      n = s.ctx && s.ctx.audio,
      i = this.a,
      a = (c) => {
        try {
          n && typeof n.k9 == "function" && n.k9(c);
        } catch {}
      },
      r = s.ctx && s.ctx.match && s.ctx.match.k9 && s.ctx.match.k9.view,
      l = escapeHTML((r && r.key) || "B");
    switch (t) {
      case "ready":
        (a("ready"),
          this._call(`K9 UNIT READY<kbd>${l}</kbd>`, 3.6),
          Oa.hints &&
            (Oa.k9seen | 0) < 3 &&
            !this.hinted &&
            ((this.hinted = !0),
            (Oa.k9seen = (Oa.k9seen | 0) + 1),
            i6(),
            s.hint(
              `<span><kbd>${l}</kbd>UNLEASH THE K9 UNIT \u2014 IT HUNTS ON ITS OWN</span>`,
              6.5,
            )));
        break;
      case "denied":
        (a("denied"),
          d1(i.deny),
          d1(i.denyI),
          d1(i.denyP),
          this.st === "charging"
            ? this._call(
                `K9 UNIT CHARGING<b style="color:#ffb35c;font-variant-numeric:tabular-nums">${Math.floor(nd(r ? r.charge : 0) * 100)}%</b>`,
                1.5,
              )
            : this.st === "active" &&
              this._call("K9 UNIT ALREADY HUNTING", 1.5, !0));
        break;
      case "deployed":
        (a("friendly_inbound"),
          this.callA && (this.callA.cancel(), (this.callA = null)),
          this.hinted && s.e.hint.classList.remove("on"),
          s.banner("K9 UNLEASHED", "HUNTING HOSTILES", "k9", 2.3, {
            ico: "k9",
            now: !0,
          }));
        break;
      case "takedown":
        d1(i.tick);
        break;
      case "lost": {
        let c = e && e.reason === "destroyed",
          h = this.lastKills;
        s.banner(
          c ? "K9 UNIT DESTROYED" : "K9 BATTERY DEPLETED",
          (h ? h + (h === 1 ? " TAKEDOWN \xB7 " : " TAKEDOWNS \xB7 ") : "") +
            "RECHARGING",
          "k9lost" + (c ? " red" : ""),
          2.5,
          {
            ico: "k9",
            now: !0,
          },
        );
        break;
      }
      case "enemy_inbound":
        (a("enemy_inbound"),
          s.banner(
            "ENEMY K9 INBOUND",
            "HOSTILE UNIT HUNTING \u2014 SHOOT IT DOWN",
            "threat",
            3,
            {
              ico: "k9",
              now: !0,
            },
          ),
          d1(i.alarm));
        break;
      case "enemy_destroyed": {
        let c = e && e.by;
        (s.banner(
          "ENEMY K9 DESTROYED",
          c ? (c.isPlayer ? "BY YOU" : "BY " + escapeHTML(c.name)) : "",
          "k9",
          2.3,
          {
            ico: "k9",
            now: !0,
          },
        ),
          this._clearThreat());
        break;
      }
    }
  }
  _state(t, e) {
    let s = this.e,
      n = this.a,
      i = this.st;
    ((this.st = t),
      (s.fu.className = "st-" + t),
      (this.c.low = ""),
      (this.c.pct = -1),
      (this.c.hpq = -1),
      t === "ready"
        ? ((s.pct.textContent = "READY"), i && (d1(n.flash), d1(n.punch)))
        : t === "active"
          ? ((this.kills = e.kills | 0),
            (this.lastKills = this.kills),
            (s.killsN.textContent = this.kills),
            (this.hpShown = nd(e.hp)),
            i && (d1(n.flash), d1(n.punch)))
          : i === "active" && (d1(n.off), d1(n.tick)));
  }
  update(t, e) {
    let s = e.match.k9,
      n = s && s.view,
      i = this.e,
      a = this.c;
    if (!n) {
      this.on &&
        ((this.on = !1),
        i.fu.classList.add("hidden"),
        this._clearThreat(),
        a.ownOp !== 0 && ((a.ownOp = 0), (i.own.style.opacity = 0)),
        this.hud.map.k9(t, null, null, !1, !1));
      return;
    }
    (this.on || ((this.on = !0), i.fu.classList.remove("hidden")),
      this.lay && this._layout());
    let { player: r, camera: l } = e,
      c = n.state;
    c !== this.st && this._state(c, n);
    let f =
      (c === "active" ? nd(n.time) : c === "ready" ? 1 : nd(n.charge)) -
      this.arc;
    this.arc += Math.abs(f) < 0.003 ? f : f * Math.min(1, t * 7);
    let u = Math.round((1 - this.arc) * 500);
    if (
      (u !== a.off &&
        ((a.off = u),
        (i.arc.style.strokeDashoffset = ((u / 500) * GU).toFixed(2))),
      c === "charging")
    ) {
      let w = Math.min(99, Math.floor(nd(n.charge) * 100));
      w !== a.pct && ((a.pct = w), (i.pct.textContent = w + "%"));
    } else if (c === "active") {
      let w = nd(n.hp);
      (w < this.hpShown - 0.004 &&
        (d1(this.a.hurt),
        (this.hurtT = 0.35),
        a.hurt || ((a.hurt = !0), i.fu.classList.add("hurt"))),
        (this.hpShown = w),
        this.hurtT > 0 &&
          (this.hurtT -= t) <= 0 &&
          a.hurt &&
          ((a.hurt = !1), i.fu.classList.remove("hurt")));
      let T = Math.round(w * 50);
      T !== a.hpq &&
        ((a.hpq = T), (i.hp.style.transform = "scaleX(" + T / 50 + ")"));
      let S = n.kills | 0;
      S !== this.kills &&
        (S > this.kills && d1(this.a.kill),
        (this.kills = S),
        (this.lastKills = S),
        (i.killsN.textContent = S));
      let E = n.time < 0.1 ? "crit" : n.time < 0.25 ? "low" : "";
      E !== a.low &&
        (a.low && i.fu.classList.remove(a.low),
        E && i.fu.classList.add(E),
        (a.low = E));
    }
    let d = s.units,
      m = null,
      p = null;
    if (d)
      for (let w = 0; w < d.length; w++) {
        let T = d[w];
        T.alive && (T.team === r.team ? m || (m = T) : p || (p = T));
      }
    let x = l.position,
      g = this.W,
      b = this.H,
      v = 0;
    if (m) {
      Ql.set(m.pos.x, m.pos.y + 0.95, m.pos.z);
      let w = Ql.distanceTo(x);
      if (
        (Ql.project(l),
        Ql.z < 1 &&
          Math.abs(Ql.x) < 1.02 &&
          Math.abs(Ql.y) < 1.02 &&
          !(Math.abs(Ql.x) < 0.09 && Math.abs(Ql.y) < 0.16) &&
          e.ars.ads < 0.5)
      ) {
        v = Math.round(Math.max(0.4, Math.min(0.95, 1.1 - w / 45)) * 20);
        let T = Math.round((Ql.x * 0.5 + 0.5) * innerWidth * 2),
          S = Math.round((-Ql.y * 0.5 + 0.5) * innerHeight * 2);
        (T !== a.ownX || S !== a.ownY) &&
          ((a.ownX = T),
          (a.ownY = S),
          (i.own.style.transform =
            "translate3d(" + T / 2 + "px," + S / 2 + "px,0)"));
        let E = Math.round(nd(n.time) * 25);
        E !== a.ownBar &&
          ((a.ownBar = E),
          (i.ownBar.style.transform = "scaleX(" + E / 25 + ")"),
          (i.ownBar.style.backgroundColor =
            E < 3 ? "#ff4326" : E < 7 ? "#ffb35c" : ""));
      }
    }
    v !== a.ownOp && ((a.ownOp = v), (i.own.style.opacity = v / 20));
    let y = !1,
      M = !1;
    if (p) {
      p !== this.foeUnit
        ? ((this.foeUnit = p),
          (this.foeMax = Math.max(1, p.maxHealth || p.health || 1)))
        : p.health > this.foeMax && (this.foeMax = p.health);
      let w = p.pos.x - x.x,
        T = p.pos.y + 0.45 - x.y,
        S = p.pos.z - x.z,
        E = Math.sqrt(w * w + T * T + S * S);
      (Ql.set(p.pos.x, p.pos.y + 0.95, p.pos.z).project(l),
        (y =
          Ql.z < 1 &&
          Math.abs(Ql.x) < 0.95 &&
          Math.abs(Ql.y) < 0.93 &&
          E < 70 &&
          E > 0.3 &&
          e.world.raycast(
            x.x,
            x.y,
            x.z,
            w / E,
            T / E,
            S / E,
            E - 0.25,
            null,
          ) === !1));
      let R = Math.round(E),
        C = r.viewDir;
      if (
        ((this.aim =
          y && w * C.x + T * C.y + S * C.z > (E * E) / Math.sqrt(E * E + 0.2)),
        y)
      ) {
        let k = Math.round((Ql.x * 0.5 + 0.5) * innerWidth * 2),
          I = Math.round((-Ql.y * 0.5 + 0.5) * innerHeight * 2);
        (k !== a.foeX || I !== a.foeY) &&
          ((a.foeX = k),
          (a.foeY = I),
          (i.foe.style.transform =
            "translate3d(" + k / 2 + "px," + I / 2 + "px,0)"));
        let G = Math.round(nd(p.health / this.foeMax) * 25);
        (G !== a.foeBar &&
          ((a.foeBar = G),
          (i.foeBar.style.transform = "scaleX(" + G / 25 + ")")),
          R !== a.foeD && ((a.foeD = R), (i.foeTxt.textContent = R + "M")),
          a.foeOp !== 1 && ((a.foeOp = 1), (i.foe.style.opacity = 1)));
      } else a.foeOp !== 0 && ((a.foeOp = 0), (i.foe.style.opacity = 0));
      M = E < HC && r.alive;
      let L = M && E < WU,
        A = M && !y;
      (A !== a.thr &&
        ((a.thr = A), (i.thr.style.opacity = A ? 1 : 0), A && d1(this.a.thrIn)),
        A !== a.k9 && ((a.k9 = A), i.hudEl.classList.toggle("is-k9", A)));
      let O = 0,
        H = 0,
        F = 0,
        P = 0;
      if (A) {
        let k = Math.sin(r.yaw),
          I = Math.cos(r.yaw),
          G = Math.atan2(w * I - S * k, -w * k - S * I),
          K = Math.sin(G),
          $ = Math.cos(G),
          n0 = Math.round((g * 0.5 + K * g * 0.4) * 2),
          e0 = Math.round((b * 0.5 - $ * b * ($ > 0 ? 0.27 : 0.365)) * 2),
          p0 = Math.round(G * 30);
        ((n0 !== a.tx || e0 !== a.ty) &&
          ((a.tx = n0),
          (a.ty = e0),
          (i.thr.style.transform =
            "translate3d(" + n0 / 2 + "px," + e0 / 2 + "px,0)")),
          p0 !== a.ta &&
            ((a.ta = p0),
            (i.thrArw.style.transform = "rotate(" + p0 / 30 + "rad)")));
        let t0 = $ < -0.25;
        (t0 !== a.lu && ((a.lu = t0), i.thr.classList.toggle("up", t0)),
          R !== a.td && ((a.td = R), (i.thrTxt.textContent = R + "M")));
        let M0 = 0.3 + 0.7 * nd((HC - E) / (HC - WU));
        ((O = Math.round(Math.max(0, -K) * M0 * 16)),
          (H = Math.round(Math.max(0, K) * M0 * 16)),
          (F = Math.round(Math.max(0, $) * M0 * 10)),
          (P = Math.round(Math.max(0, -$) * M0 * 16)));
      }
      (O !== a.e0 && ((a.e0 = O), (i.edges[0].style.opacity = O / 16)),
        H !== a.e1 && ((a.e1 = H), (i.edges[1].style.opacity = H / 16)),
        F !== a.e2 && ((a.e2 = F), (i.edges[2].style.opacity = F / 16)),
        P !== a.e3 && ((a.e3 = P), (i.edges[3].style.opacity = P / 16)));
      let z = L && A;
      (z !== a.close && ((a.close = z), i.thr.classList.toggle("close", z)),
        z !== a.ek && ((a.ek = z), i.edge.classList.toggle("close", z)),
        L !== a.prox && ((a.prox = L), i.prox.classList.toggle("on", L)),
        L && R !== a.pd && ((a.pd = R), (i.proxTxt.textContent = R + "M")));
    } else
      ((this.aim = !1),
        (a.thr || a.prox || a.foeOp !== 0 || a.e0 || a.e1 || a.e2 || a.e3) &&
          (this._clearThreat(), (this.foeUnit = null)));
    this.hud.map.k9(t, m, p, y || (M && p && a.prox), r.pos.y > 2.6);
  }
};

export { K9HUD };

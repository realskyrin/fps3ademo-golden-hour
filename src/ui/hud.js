// ui/hud.js: recovered from the verified GOLDEN HOUR release.
import { Vector3 } from "../vendor/three-r180.js";
import { Hh, P7, dv, icon, kU, zC } from "./icons.js";
import { P2, createElement, elementById, escapeHTML } from "./dom.js";
import { TEAM_NAMES } from "../ai/match.js";
import { Minimap } from "./minimap.js";
import { MenuController } from "./menus.js";
import { K9HUD } from "./k9-hud.js";
import { D7, Oa, i6 } from "./preferences.js";
import { WeaponStudio } from "./weapon-studio.js";
import { CAMOS, WEAPON_IDS, profile } from "../weapons/loadout.js";
import { NU, r6 } from "./camo-preview.js";
import { WEAPON_DEFINITIONS } from "../weapons/definitions.js";
import { DEG_TO_RAD } from "../core/math.js";

var Ts0 = {
  frag: "FRAG GRENADE",
  melee: "MELEE",
  fell: "FALL",
  chandelier: "CHANDELIER",
  k9: "K9 UNIT",
};
var qU = ["stand", "crouch", "prone", "slide", "dive"];
var FIELD_NOTES = [
  "Sprint works in <b>every direction</b>. Strafe-sprint out of a bad angle instead of turning your back.",
  "Slide with <b>C</b> while sprinting to take a corner low and fast. Slide kills earn a medal.",
  "Dive with <b>X</b> through a window: every pane in the hotel breaks.",
  "Bullets punch through thin cover. Wooden slats, plaster and furniture will not save anyone.",
  "Enemies appear on your minimap when they <b>fire</b>. A suppressor keeps bots from hearing you early.",
  "The atrium chandelier is not decoration. Shoot the mount when somebody stands underneath.",
  "Health regenerates after a few seconds out of the fight. Break line of sight, then re-engage.",
  "Headshots unlock the Tigerstripe and Ember Topo camos. Build each weapon in the <b>Gunsmith</b>.",
  "The balcony ring sees the whole lobby. So does everyone looking up at it.",
  "Empty magazine? Swapping to your sidearm with <b>2</b> is always faster than reloading.",
  "Your <b>K9 unit</b> charges while you fight. Press <b>B</b> to unleash it: it hunts on its own until its battery runs out.",
  "An <b>enemy K9</b> can be shot down. Watch the red edge marker, turn toward it and fire before it leaps.",
];
var Rr = new Vector3();
var ta = "cubic-bezier(.2,.8,.2,1)";
var L2 = (o, t) => {
  o._v !== t && ((o._v = t), (o.textContent = t));
};
var c6 = (o, t) => {
  o._c !== t && ((o._c = t), (o.className = t));
};
var Ar = (o) => {
  (o.cancel(), o.play());
};
var GameHUD = class {
  constructor(callbacks) {
    ((this.cb = callbacks),
      document.body.insertAdjacentHTML("afterbegin", kU),
      (this.hitT = 0),
      (this.tags = []),
      (this.screen = "loading"),
      (this.studio = null),
      (this.ctx = null),
      (this.perf = {
        n: 0,
        sum: 0,
        max: 0,
        over: 0,
      }),
      (this.stat = {
        medals: {},
        streak: 0,
        unlocked: [],
        base: null,
      }));
    let e = (this.e = {});
    for (let a of [
      "hud",
      "world",
      "cross",
      "cue",
      "mag",
      "res",
      "wname",
      "wmode",
      "wtags",
      "wsil",
      "wrel",
      "w2sil",
      "w2n",
      "w2k",
      "wfrag",
      "wfragi",
      "hpn",
      "hfill",
      "hghost",
      "vitals",
      "stance",
      "sA",
      "sB",
      "pA",
      "pB",
      "clock",
      "slim",
      "feed",
      "board",
      "nade",
      "tags",
      "dmg",
      "death",
      "dkick",
      "dname",
      "demb",
      "dhpb",
      "dhpn",
      "dwico",
      "dwname",
      "respawn",
      "respbar",
      "hint",
      "toast",
      "intro",
      "count",
      "banner",
      "weapon",
      "hpname",
    ])
      e[a] = elementById(a);
    ((e.events = elementById("events")),
      (e.evPts = elementById("ev-pts")),
      (e.evLines = elementById("ev-lines")),
      (e.evMedals = elementById("ev-medals")),
      (e.evAdd = elementById("ev-add")),
      (e.hedge = elementById("hedge")),
      (e.hbar = elementById("hbar")),
      (e.wmain = e.weapon.querySelector(".wmain")),
      (e.wtop = e.weapon.querySelector(".wtop")),
      (e.w2 = e.weapon.querySelector(".w2")),
      (e.tmA = e.sA.parentElement),
      (e.tmB = e.sB.parentElement),
      (e.ct = e.cross.querySelector(".t")),
      (e.cb = e.cross.querySelector(".b")),
      (e.cl = e.cross.querySelector(".l")),
      (e.cr = e.cross.querySelector(".r")),
      (e.ring = e.cross.querySelector("svg")),
      (e.frags = [...e.wfrag.querySelectorAll("i")]),
      (e.nadeImg = e.nade.querySelector("img")),
      (e.nadeTxt = e.nade.querySelector("span")),
      (elementById("embA").innerHTML = Hh(0)),
      (elementById("embB").innerHTML = Hh(1)),
      (elementById("hpico").innerHTML = icon("health")),
      (e.stance.innerHTML = qU.map((a) => icon(a, "s-" + a)).join("")),
      (e.stances = {}));
    for (let a of qU) e.stances[a] = e.stance.querySelector(".s-" + a);
    e.hpname.textContent = TEAM_NAMES[0];
    let s = (this.a = {}),
      n = (a, r, l) => {
        let c = a.animate(r, l);
        return (c.cancel(), c);
      };
    ((s.hmBody = n(
      elementById("hm-body"),
      [
        {
          opacity: 1,
          transform: "scale(1.32)",
        },
        {
          opacity: 1,
          transform: "scale(1)",
          offset: 0.45,
        },
        {
          opacity: 0,
          transform: "scale(.94)",
        },
      ],
      {
        duration: 150,
        easing: "ease-out",
      },
    )),
      (s.hmHead = n(
        elementById("hm-head"),
        [
          {
            opacity: 1,
            transform: "scale(1.7) rotate(8deg)",
          },
          {
            opacity: 1,
            transform: "scale(1) rotate(0deg)",
            offset: 0.4,
          },
          {
            opacity: 0,
            transform: "scale(.92)",
          },
        ],
        {
          duration: 200,
          easing: "ease-out",
        },
      )),
      (s.hmKill = n(
        elementById("hm-kill"),
        [
          {
            opacity: 1,
            transform: "scale(2.1)",
          },
          {
            opacity: 1,
            transform: "scale(1.02)",
            offset: 0.32,
          },
          {
            opacity: 1,
            transform: "scale(1.1)",
            offset: 0.6,
          },
          {
            opacity: 0,
            transform: "scale(1.5)",
          },
        ],
        {
          duration: 260,
          easing: "ease-out",
        },
      )),
      (s.hmRing = n(
        elementById("hm-kill").querySelector("b"),
        [
          {
            opacity: 0.95,
            transform: "scale(.35)",
          },
          {
            opacity: 0,
            transform: "scale(1.35)",
          },
        ],
        {
          duration: 260,
          easing: "ease-out",
        },
      )),
      (s.mag = n(
        e.mag,
        [
          {
            transform: "translateY(.22rem) scale(1.07)",
          },
          {
            transform: "none",
          },
        ],
        {
          duration: 90,
          easing: "ease-out",
        },
      )),
      (s.magUp = n(
        e.mag,
        [
          {
            transform: "scale(1.22)",
            color: "#ffb35c",
          },
          {
            transform: "none",
          },
        ],
        {
          duration: 260,
          easing: ta,
        },
      )),
      (s.sA = n(
        e.sA,
        [
          {
            transform: "scale(1.5)",
            color: "#6fdcff",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 420,
          easing: ta,
        },
      )),
      (s.sB = n(
        e.sB,
        [
          {
            transform: "scale(1.5)",
            color: "#ff5a36",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 420,
          easing: ta,
        },
      )),
      (s.pts = n(
        e.evPts,
        [
          {
            transform: "scale(1.5)",
          },
          {
            transform: "scale(1)",
          },
        ],
        {
          duration: 150,
          easing: ta,
        },
      )),
      (s.wsil = n(
        e.wsil,
        [
          {
            opacity: 0,
            transform: "scaleX(-1) translateX(-1.6rem)",
          },
          {
            opacity: 0.95,
            transform: "scaleX(-1)",
          },
        ],
        {
          duration: 190,
          easing: ta,
        },
      )),
      (s.hurt = n(
        e.vitals,
        [
          {
            transform: "translateX(-.5rem)",
          },
          {
            transform: "translateX(.35rem)",
            offset: 0.4,
          },
          {
            transform: "none",
          },
        ],
        {
          duration: 170,
          easing: "ease-out",
        },
      )),
      (s.hflash = n(
        e.hbar,
        [
          {
            filter: "brightness(3.2)",
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
      (s.wswap = n(
        e.wmain,
        [
          {
            opacity: 0,
            transform: "translateX(3rem)",
          },
          {
            opacity: 1,
            transform: "none",
          },
        ],
        {
          duration: 230,
          easing: ta,
        },
      )),
      (s.wtop = n(
        e.wtop,
        [
          {
            opacity: 0,
            transform: "translateX(1.6rem)",
          },
          {
            opacity: 1,
            transform: "none",
          },
        ],
        {
          duration: 260,
          easing: ta,
        },
      )),
      (s.w2 = n(
        e.w2,
        [
          {
            opacity: 0,
            transform: "translateY(.9rem)",
          },
          {
            opacity: 0.72,
            transform: "none",
          },
        ],
        {
          duration: 240,
          easing: ta,
        },
      )),
      (s.add = n(
        e.evAdd,
        [
          {
            opacity: 0,
            transform: "translate(2.4rem,-1.6rem) scale(.8)",
          },
          {
            opacity: 1,
            transform: "translate(1rem,-.6rem) scale(1)",
            offset: 0.3,
          },
          {
            opacity: 1,
            transform: "translate(.6rem,-.3rem) scale(1)",
            offset: 0.6,
          },
          {
            opacity: 0,
            transform: "translate(-3rem,.2rem) scale(.5)",
          },
        ],
        {
          duration: 560,
          easing: "ease-in-out",
        },
      )),
      (s.fragi = n(
        e.wfragi,
        [
          {
            transform: "scale(1.35) rotate(-14deg)",
          },
          {
            transform: "none",
          },
        ],
        {
          duration: 260,
          easing: ta,
        },
      )),
      (s.boardIn = n(
        e.board,
        [
          {
            opacity: 0,
            transform: "translate(-50%,-47%) scale(.975)",
          },
          {
            opacity: 1,
            transform: "translate(-50%,-50%) scale(1)",
          },
        ],
        {
          duration: 150,
          easing: ta,
        },
      )),
      (this.dmg = []));
    for (let a = 0; a < 6; a++) {
      let r = createElement(
        "i",
        "",
        '<svg viewBox="-100 -100 200 200"><path fill="#ff3b1f" d="M-43.8 -75.9A87.6 87.6 0 0 1 43.8 -75.9A160 160 0 0 0 -43.8 -75.9Z"/></svg>',
      );
      (e.dmg.appendChild(r),
        this.dmg.push({
          n: r,
          beta: 0,
          t: 0,
          q: 1e9,
          a: n(
            r,
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
                offset: 0.06,
              },
              {
                opacity: 0.85,
                offset: 0.6,
              },
              {
                opacity: 0,
              },
            ],
            {
              duration: 1300,
            },
          ),
        }));
    }
    ((this.dmgI = 0),
      (this.c = {
        gap: -1,
        hide: null,
        xcls: "",
        wkey: "",
        mag: -1,
        frag: -1,
        hp: -1,
        hpq: -1,
        ghq: -1,
        stance: "",
        sA: -1,
        sB: -1,
        lead: -2,
        clock: -1,
        cue: "",
        rel: -1,
        foe: !1,
        w2: "",
        nade: !1,
        nadeD: -1,
        resp: -1,
        ended: !1,
      }),
      (this.gap = 8),
      (this.gapV = 0),
      (this.hpShow = 1),
      (this.ghost = 1),
      (this.ghostHold = 0),
      (this.lastHp = 100),
      (this.slow = 1),
      (this.magRoll = null),
      (this.bq = []),
      (this.bT = 0),
      (this.leadT = 0),
      (this.boardOut = null),
      (this.ev = {
        total: 0,
        shown: 0,
        t: 0,
        on: !1,
      }),
      (this.lines = []),
      (this.meds = []),
      (this.feed = []),
      (this.toasts = []),
      (this.toastT = 0),
      (this.boardT = 0),
      (this.yaw = 0),
      (this.map = new Minimap()),
      (this.menus = new MenuController(this, callbacks)),
      (this.k9hud = new K9HUD(this)),
      this._applyUi(),
      (this.tipI = Math.floor(Math.random() * FIELD_NOTES.length)));
    let i = () => {
      let a = elementById("ltipp");
      a &&
        ((a.innerHTML = FIELD_NOTES[this.tipI++ % FIELD_NOTES.length]),
        a.animate(
          [
            {
              opacity: 0,
              transform: "translateY(.6rem)",
            },
            {
              opacity: 0.9,
              transform: "none",
            },
          ],
          {
            duration: 380,
            easing: "ease-out",
          },
        ));
    };
    ((elementById("ltipp").innerHTML =
      FIELD_NOTES[this.tipI++ % FIELD_NOTES.length]),
      (this._tipTimer = setInterval(i, 5200)));
  }
  _applyUi() {
    (this.e.cross.style.setProperty("--xc", D7[Oa.xhair] || "#fff"),
      (elementById("safe").style.zoom = Oa.hudScale === 1 ? "" : Oa.hudScale),
      this.map.setMode(Oa.minimap),
      this.k9hud && this.k9hud.layout());
  }
  attach(t) {
    this.ctx = t;
    try {
      let e = (this.studio = new WeaponStudio({
        buildGun: t.buildGun,
        buildGrenade: t.buildGrenade,
      }));
      e.build();
      for (let n of WEAPON_IDS) e.icons(n);
      let s = e.factory("frag");
      ((this.e.wfragi.src = s.sil), (this.e.nadeImg.src = s.sil));
    } catch (e) {
      (console.error("[hud] weapon studio failed", e), (this.studio = null));
    }
    try {
      this.map.build(t.world, t.hotel);
    } catch (e) {
      console.error("[hud] minimap failed", e);
    }
    try {
      this.warmMs = NU(CAMOS.map((e) => e.id));
    } catch (e) {
      console.error("[hud] camo swatches failed", e);
    }
    this.menus.attach(this.studio);
  }
  sil(t, e, s = "sil") {
    let n = this.studio;
    if (!n) return "";
    let i = e === void 0 ? n.factory(t) : n.icons(t, e, !1);
    return i ? i[s] : "";
  }
  loading(t, e) {
    ((elementById("lbar").firstElementChild.style.transform = `scaleX(${t})`),
      (elementById("lpct").textContent = Math.round(t * 100) + "%"),
      e && (elementById("ltxt").textContent = e));
  }
  show(t) {
    this.screen = t;
    let e = elementById("loading");
    t !== "loading" &&
      !e.classList.contains("hidden") &&
      (clearInterval(this._tipTimer),
      (e.style.opacity = 0),
      setTimeout(() => e.classList.add("hidden"), 360));
    let s = t !== "menu" && t !== "loading";
    (this.e.hud.classList.toggle("hidden", !s),
      (this.e.hud.style.opacity = t === "pause" || t === "end" ? 0 : 1),
      this.menus.show(t),
      (this.map._lay = !0));
  }
  matchStart() {
    let t = this.e,
      e = this.c;
    ((t.feed.textContent = ""),
      (this.feed.length = 0),
      (t.evLines.textContent = ""),
      (t.evMedals.textContent = ""),
      (this.lines.length = 0),
      (this.meds.length = 0),
      (this.ev.total = this.ev.shown = this.ev.t = 0),
      (this.ev.on = !1),
      (t.evPts.style.opacity = 0),
      t.events.classList.remove("on"),
      t.death.classList.add("hidden"),
      t.hud.classList.remove("is-clean"),
      (e.ended = !1),
      t.banner.getAnimations().forEach((s) => s.cancel()),
      (this.bq.length = 0),
      (this.bT = 0),
      (this.leadT = 0),
      (e.lead = -2),
      (e.sA = e.sB = -1),
      (e.clock = -1),
      (this.magRoll = null));
    for (let s of this.dmg) ((s.t = 0), s.a.cancel());
    if (
      ((this.stat = {
        medals: {},
        streak: 0,
        unlocked: [],
        base: JSON.parse(JSON.stringify(profile.weapons)),
      }),
      this.map.reset(),
      this.k9hud.reset(),
      this.studio)
    )
      for (let s of [this.ctx.settings.primary, "pistol"]) this.studio.icons(s);
    ((e.wkey = ""),
      (t.intro.innerHTML = `${Hh(0)}<div class="i-mode">TEAM DEATHMATCH</div><div class="i-map">SOLSTICE HOTEL</div><div class="i-rule"></div><div class="i-sub">FIRST TO 40 ELIMINATIONS</div>`),
      t.intro.animate(
        [
          {
            opacity: 0,
            transform: "translateY(1.2rem)",
          },
          {
            opacity: 1,
            transform: "none",
            offset: 0.1,
          },
          {
            opacity: 1,
            offset: 0.86,
          },
          {
            opacity: 0,
            transform: "translateY(-.8rem)",
          },
        ],
        {
          duration: 3300,
          easing: "ease-out",
        },
      ),
      t.intro.querySelector(".i-rule").animate(
        [
          {
            transform: "scaleX(0)",
          },
          {
            transform: "scaleX(1)",
          },
        ],
        {
          duration: 700,
          delay: 150,
          easing: ta,
          fill: "forwards",
        },
      ),
      t.intro.querySelector(".i-map").animate(
        [
          {
            letterSpacing: ".5em",
            opacity: 0,
          },
          {
            letterSpacing: ".14em",
            opacity: 1,
          },
        ],
        {
          duration: 650,
          easing: ta,
        },
      ),
      Oa.hints &&
        Oa.seen < 3 &&
        (Oa.seen++,
        i6(),
        this.hint(
          "<span><kbd>SHIFT</kbd>SPRINT ANY DIRECTION</span><span><kbd>C</kbd>SLIDE</span><span><kbd>X</kbd>DIVE</span><span><kbd>B</kbd>K9 UNIT</span><span><kbd>TAB</kbd>SCORES</span>",
          8,
        )));
  }
  count(t) {
    let e = this.e;
    ((e.count.innerHTML =
      t > 0 ? `<b>${t}</b>` : '<b class="go">MATCH START</b>'),
      e.count.firstChild.animate(
        t > 0
          ? [
              {
                opacity: 0,
                transform: "scale(1.8)",
              },
              {
                opacity: 1,
                transform: "scale(1)",
                offset: 0.16,
              },
              {
                opacity: 1,
                offset: 0.7,
              },
              {
                opacity: 0,
                transform: "scale(.86)",
              },
            ]
          : [
              {
                opacity: 0,
                letterSpacing: ".9em",
              },
              {
                opacity: 1,
                letterSpacing: ".36em",
                offset: 0.14,
              },
              {
                opacity: 1,
                offset: 0.7,
              },
              {
                opacity: 0,
              },
            ],
        {
          duration: t > 0 ? 940 : 1400,
          easing: "ease-out",
        },
      ));
  }
  hint(t, e = 4) {
    let s = this.e.hint;
    ((s.innerHTML = t),
      s.classList.add("on"),
      clearTimeout(this._ht),
      (this._ht = setTimeout(() => s.classList.remove("on"), e * 1e3)));
  }
  respawned() {
    let t = this.e;
    if (!t.death.classList.contains("hidden")) {
      let s = t.death;
      s.animate(
        [
          {
            opacity: 1,
          },
          {
            opacity: 0,
            transform: "translateX(-50%) translateY(-1rem)",
          },
        ],
        {
          duration: 180,
          easing: "ease-in",
        },
      ).onfinish = () => s.classList.add("hidden");
    }
    if (
      ((this.c.wkey = ""),
      (this.c.wid = ""),
      this._spawnIn(),
      this.studio && this.ctx)
    )
      for (let s of this.ctx.arsenal.slots)
        this.studio.icons(s.def.id, s.def.build);
  }
  died(t, e) {
    let s = this.e;
    (s.death.classList.remove("hidden"),
      s.death.animate(
        [
          {
            opacity: 0,
            transform: "translateX(-50%) translateY(1.4rem)",
          },
          {
            opacity: 1,
            transform: "translateX(-50%)",
          },
        ],
        {
          duration: 260,
          easing: ta,
        },
      ));
    let n = !t || t.isPlayer;
    ((s.dkick.textContent =
      e === "fell" ? "OUT OF BOUNDS" : n ? "SELF-INFLICTED" : "ELIMINATED BY"),
      (s.dname.textContent = e === "fell" ? "Gravity" : n ? "You" : t.name),
      (s.demb.innerHTML = n ? icon("skull") : Hh(t.team)),
      (s.demb.firstChild.style.cssText = n
        ? "font-size:4rem;color:#ff5a36"
        : ""));
    let i = n ? 0 : Math.max(0, Math.round(t.health || 0));
    ((s.dhpb.style.width = i + "%"),
      (s.dhpn.textContent = n ? "" : i + " HP"),
      (s.dhpb.parentElement.parentElement.style.visibility = n ? "hidden" : ""),
      this._deathWeapon(
        e === "fell" ? "fell" : n ? "frag" : (t.def && t.def.id) || "ar",
        !1,
      ),
      (this.c.resp = -1));
  }
  _deathWeapon(t, e) {
    let s = this.e,
      n = WEAPON_DEFINITIONS[t];
    ((s.dwico.innerHTML = n
      ? `<img id="dwsil" src="${this.sil(t, void 0, "line")}" alt="">`
      : t === "frag"
        ? `<img id="dwsil" src="${this.sil("frag", void 0, "line")}" alt="">`
        : icon(zC[t] || "skull", t === "k9" ? "wk9" : "")),
      (s.dwname.innerHTML =
        (e ? icon("headshot") : "") +
        (n ? n.name : Ts0[t] || t.toUpperCase())));
  }
  respawnIn(t) {
    let e = Math.round(t * 10);
    e !== this.c.resp &&
      ((this.c.resp = e),
      (this.e.respawn.textContent = (e / 10).toFixed(1)),
      (this.e.respbar.style.transform =
        "scaleX(" + Math.min(1, t / 3.6).toFixed(3) + ")"));
  }
  hit(t, e, s) {
    let n = performance.now();
    if (!e && n - this.hitT < 45) return;
    this.hitT = n;
    let i = this.a;
    (e ? (Ar(i.hmKill), Ar(i.hmRing)) : Ar(t ? i.hmHead : i.hmBody),
      this.cb.hitSound(e ? "kill" : t ? "head" : "body"));
  }
  _spawnIn() {
    let t = this.e,
      e = {
        duration: 380,
        easing: ta,
        composite: "add",
      },
      s = {
        duration: 300,
        easing: "ease-out",
      },
      n = (i, a, r, l) => {
        (i.animate(
          [
            {
              transform: `translate(${a}rem,${r}rem)`,
            },
            {
              transform: "translate(0,0)",
            },
          ],
          {
            ...e,
            delay: l,
            fill: "backwards",
          },
        ),
          i.animate(
            [
              {
                opacity: 0,
              },
              {
                opacity: 1,
              },
            ],
            {
              ...s,
              delay: l,
              fill: "backwards",
            },
          ));
      };
    (n(elementById("mm"), -3.2, 0, 0),
      n(elementById("score"), 0, -2.6, 40),
      n(t.vitals, -3.2, 0, 80),
      n(t.weapon, 3.2, 0, 80));
  }
  banner(t, e = "", s = "", n = 2.4, i = null) {
    let a = {
      text: t,
      sub: e,
      kind: s,
      hold: n,
      ico: i && i.ico,
    };
    i && i.now ? (this.bq.unshift(a), (this.bT = 0)) : this.bq.push(a);
  }
  k9(t, e) {
    this.k9hud.event(t, e || {});
  }
  _banner(t) {
    let e = this.e,
      s = t.hold * 1e3;
    ((e.banner.className = t.kind),
      (e.banner.innerHTML = `<i></i><div><b>${t.ico ? icon(t.ico) : ""}${t.text}</b>${t.sub ? `<span>${t.sub}</span>` : ""}</div><i></i>`));
    for (let i of e.banner.getAnimations()) i.cancel();
    e.banner.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
          offset: 160 / s,
        },
        {
          opacity: 1,
          offset: 1 - 300 / s,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: s,
        fill: "forwards",
      },
    );
    {
      let i = e.banner.querySelector("b");
      i.animate(
        [
          {
            letterSpacing: "1em",
            filter: "blur(.4rem)",
          },
          {
            letterSpacing: getComputedStyle(i).letterSpacing,
            filter: "blur(0)",
          },
        ],
        {
          duration: 460,
          easing: ta,
        },
      );
    }
    for (let i of e.banner.querySelectorAll("i"))
      i.animate(
        [
          {
            transform: "scaleX(0)",
          },
          {
            transform: "scaleX(1)",
          },
        ],
        {
          duration: 520,
          easing: ta,
        },
      );
    let n = e.banner.querySelector("span");
    (n &&
      n.animate(
        [
          {
            opacity: 0,
            transform: "translateY(.5rem)",
          },
          {
            opacity: 1,
            transform: "none",
          },
        ],
        {
          duration: 300,
          delay: 140,
          easing: ta,
          fill: "backwards",
        },
      ),
      this.cb.sound("whoosh"));
  }
  debugSlow(t) {
    ((this.slow = t), (this.menus.slow = t));
    let e = () => {
      for (let s of document.getAnimations())
        s.playbackRate !== t && (s.playbackRate = t);
      this.slow === t && t !== 1 && requestAnimationFrame(e);
    };
    e();
  }
  damageFrom(t) {
    let e = this.dmg[(this.dmgI = (this.dmgI + 1) % this.dmg.length)];
    ((e.beta = t - this.yaw),
      (e.t = 1.3),
      (e.q = 1e9),
      Ar(e.a),
      Ar(this.a.hflash),
      Ar(this.a.hurt));
  }
  killfeed(t, e, s, n) {
    let i = this.e,
      a =
        (t && t.isPlayer) ||
        e.isPlayer ||
        (e.isK9 && e.owner && e.owner.isPlayer),
      r = (h) =>
        h.isK9
          ? `<span class="t${h.team} k9n">${icon("k9")}K9 UNIT</span>`
          : `<span class="t${h.team}${h.isPlayer ? " you" : ""}">${h.isPlayer ? "You" : escapeHTML(h.name)}</span>`,
      l;
    WEAPON_DEFINITIONS[s] || s === "frag"
      ? (l = `<img class="s-${s}" src="${t && t.isPlayer && WEAPON_DEFINITIONS[s] ? this.sil(s, null) : this.sil(s)}" alt="">`)
      : (l = icon(zC[s] || "skull", s === "k9" ? "wk9" : ""));
    let c = createElement(
      "div",
      "f" + (a ? " me" : ""),
      (t ? r(t) : "") + l + (n ? icon("headshot", "hs") : "") + r(e),
    );
    for (
      i.feed.appendChild(c),
        c.animate(
          [
            {
              opacity: 0,
              transform: "translateX(1.6rem)",
            },
            {
              opacity: 1,
              transform: "none",
            },
          ],
          {
            duration: 180,
            easing: ta,
          },
        ),
        this.feed.push({
          el: c,
          t: 5.5,
        });
      this.feed.length > 5;
    )
      this._drop(this.feed.shift(), "feed");
    e.isPlayer && this._deathWeapon(s, n);
  }
  kill(t, e) {
    let s = this.e,
      n = this.ev,
      i = 100 + e.length * 25;
    ((n.total += i),
      (n.t = 2.9),
      n.on
        ? ((s.evAdd.textContent = "+" + i), Ar(this.a.add))
        : ((n.on = !0),
          (n.shown = 0),
          (s.evPts.style.opacity = 1),
          s.events.classList.add("on"),
          Ar(this.a.pts)));
    let a = e.indexOf("K9 TAKEDOWN") >= 0,
      r = createElement(
        "div",
        "ln" + (a ? " k9" : ""),
        a
          ? `${icon("k9")}<span>K9 TAKEDOWN</span><b>${escapeHTML(t.name)}</b>`
          : t.isK9
            ? `<span>DESTROYED</span><b>${icon("k9")}K9 UNIT</b>`
            : `<span>ELIMINATED</span><b>${escapeHTML(t.name)}</b>`,
      );
    for (
      s.evLines.appendChild(r),
        r.animate(
          [
            {
              opacity: 0,
              transform: "translateY(.7rem)",
            },
            {
              opacity: 1,
              transform: "none",
            },
          ],
          {
            duration: 170,
            easing: ta,
          },
        ),
        this.lines.push({
          el: r,
          t: 2.6,
        });
      this.lines.length > 3;
    )
      this._drop(this.lines.shift(), "line");
    for (
      e.forEach((l, c) => {
        this.stat.medals[l] = (this.stat.medals[l] || 0) + 1;
        let h = this.meds.find((d) => d.name === l);
        if (h) {
          (h.n++,
            (h.t = 3.1),
            (h.badge.textContent = "\xD7" + h.n),
            h.badge.animate(
              [
                {
                  opacity: 1,
                  transform: "scale(1.9)",
                  color: "#ffd68a",
                },
                {
                  opacity: 1,
                  transform: "scale(1)",
                  color: "#fff",
                },
              ],
              {
                duration: 320,
                delay: 90 + c * 120,
                easing: ta,
                fill: "both",
              },
            ),
            h.el.firstChild.animate(
              [
                {
                  transform: "scale(1.22)",
                  filter: "brightness(2.2)",
                },
                {
                  transform: "scale(1)",
                  filter: "brightness(1)",
                },
              ],
              {
                duration: 300,
                delay: 90 + c * 120,
                easing: ta,
              },
            ));
          return;
        }
        let f = dv(l),
          u = createElement(
            "div",
            "md t" + f,
            P7(l) + `<span>${l}</span><em></em>`,
          );
        (s.evMedals.appendChild(u),
          u.animate(
            [
              {
                opacity: 0,
                transform: "scale(2) translateY(-.6rem)",
                filter: "brightness(3.2)",
              },
              {
                opacity: 1,
                transform: "scale(.93)",
                filter: "brightness(1.8)",
                offset: 0.55,
              },
              {
                opacity: 1,
                transform: "scale(1)",
                filter: "brightness(1)",
              },
            ],
            {
              duration: 320,
              delay: 90 + c * 120,
              easing: ta,
              fill: "backwards",
            },
          ),
          this.meds.push({
            el: u,
            t: 3.1 + c * 0.12,
            name: l,
            n: 1,
            badge: u.lastChild,
          }));
      });
      this.meds.length > 5;
    )
      this._drop(this.meds.shift(), "medal");
    this.cb.sound(e.length ? "medal" : "score");
  }
  unlock(t, e) {
    (this.stat.unlocked.push({
      w: t,
      camo: e,
    }),
      this.toasts.push({
        w: t,
        camo: e,
      }));
  }
  _toast(t) {
    let e = this.e,
      s = WEAPON_DEFINITIONS[t.w];
    ((e.toast.innerHTML = `<span></span><div><div class="tk">CAMO UNLOCKED</div><div class="tn">${escapeHTML(t.camo.name)}</div><div class="tw"><img src="${this.sil(t.w)}" alt="">${s ? s.name : ""}</div></div>`),
      e.toast.firstChild.replaceWith(r6(t.camo.id, 96)),
      e.toast.animate(
        [
          {
            opacity: 0,
            transform: "translateX(3rem)",
          },
          {
            opacity: 1,
            transform: "none",
            offset: 0.07,
          },
          {
            opacity: 1,
            transform: "none",
            offset: 0.9,
          },
          {
            opacity: 0,
            transform: "translateX(1.5rem)",
          },
        ],
        {
          duration: 3600,
          easing: "ease-out",
        },
      ),
      this.cb.sound("unlock"));
  }
  board(t, e = this.e.board, s = !1) {
    let n = (l) => (l.deaths ? l.kills / l.deaths : l.kills).toFixed(2),
      i = (l) =>
        t.actors
          .filter((c) => c.team === l && !c.isK9)
          .sort((c, h) => h.score - c.score || h.kills - c.kills)
          .map(
            (c, h) =>
              `<div class="rw${c.isPlayer ? " me" : ""}${c.alive || s ? "" : " dead"}"><span>${h + 1}</span><span>${c.isPlayer ? "You" : escapeHTML(c.name)}${c.alive || s ? "" : icon("skull")}</span><span class="sc">${c.score}</span><span>${c.kills}</span><span>${c.deaths}</span><span>${n(c)}</span></div>`,
          )
          .join(""),
      a = (l) =>
        `<div class="t${l}"><div class="th">${Hh(l)}<b>${TEAM_NAMES[l]}</b><em>${t.scores[l]}</em></div><div class="rw hd"><span>#</span><span>OPERATOR</span><span class="srt">SCORE${icon("caret")}</span><span>K</span><span>D</span><span>K/D</span></div>${i(l)}</div>`,
      r = Math.max(0, Math.ceil(t.time));
    e.innerHTML =
      (s
        ? ""
        : `<div class="bd-h"><b>SCOREBOARD</b><span>TEAM DEATHMATCH \xB7 SOLSTICE HOTEL</span><i>FIRST TO ${t.scoreLimit} \xB7 ${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}</i></div>`) +
      `<div class="tbl">${a(0)}${a(1)}</div>`;
  }
  matchEnd(t, e, s) {
    (this.menus.buildEnd(t, e, s, this.stat), this.cb.onMatchEnd());
  }
  perfReport() {
    let t = this.perf;
    return {
      frames: t.n,
      avgMs: +(t.sum / Math.max(1, t.n)).toFixed(4),
      maxMs: +t.max.toFixed(3),
      framesOver1ms: t.over,
    };
  }
  perfReset() {
    ((this.perf.n = 0),
      (this.perf.sum = 0),
      (this.perf.max = 0),
      (this.perf.over = 0));
  }
  update(t, e) {
    let s = performance.now();
    this.slow !== 1 && (t *= this.slow);
    let { player: n, ars: i, match: a, camera: r, showBoard: l } = e,
      c = this.e,
      h = this.c,
      f = this.a,
      u = i.def,
      d = n.alive,
      m = i.slot;
    this.yaw = n.yaw;
    let p =
        !d ||
        (i.ads > 0.55 && u.id !== "shotgun") ||
        (n.sprinting && n.mode === "normal") ||
        i.state === "inspect" ||
        n.mode === "mantle" ||
        a.state === "countdown",
      x = p
        ? 0
        : u.id === "shotgun"
          ? 19
          : Math.round(Math.max(0, 1 - i.ads / 0.6) * 19);
    if ((x !== h.xop && ((h.xop = x), (c.cross.style.opacity = x / 20)), !p)) {
      let G =
          innerHeight /
          (2 * Math.tan((r.fov * DEG_TO_RAD) / 2)) /
          (Oa.hudScale || 1),
        K = Math.max(
          u.id === "shotgun" ? 10 : 3.5,
          Math.tan(i.spread * DEG_TO_RAD) * G,
        ),
        $ = Math.min(t, 0.033);
      ((this.gapV += ((K - this.gap) * 640 - this.gapV * 38) * $),
        (this.gap += this.gapV * $),
        this.gap < 2.5 && ((this.gap = 2.5), (this.gapV = 0)));
      let n0 = Math.round(this.gap * 2);
      if (n0 !== h.gap) {
        h.gap = n0;
        let e0 = n0 / 2;
        ((c.ct.style.transform = "translate3d(0," + -e0 + "px,0)"),
          (c.cb.style.transform = "translate3d(0," + e0 + "px,0)"),
          (c.cl.style.transform = "translate3d(" + -e0 + "px,0,0)"),
          (c.cr.style.transform = "translate3d(" + e0 + "px,0,0)"),
          u.id === "shotgun" &&
            (c.ring.style.transform = "scale(" + (e0 / 50).toFixed(3) + ")"));
      }
    }
    let g =
      u.id +
      (u.build
        ? u.build.camo +
          (u.build.muzzle || "") +
          (u.build.optic || "") +
          (u.build.underbarrel || "") +
          (u.build.magazine || "") +
          (u.build.stock || "")
        : "");
    if (g !== h.wkey) {
      ((h.wkey = g),
        (h.gap = -1),
        (h.mag = -1),
        L2(c.wname, u.name),
        (c.wmode.innerHTML = icon(u.pump ? "pump" : u.auto ? "auto" : "semi")),
        (c.wtags.innerHTML =
          (u.suppressed ? icon("suppressed") : "") +
          (u.laser ? icon("laser") : "")));
      let G = this.sil(u.id, u.build || null, "line");
      (G && (c.wsil.src = G),
        h.wid !== u.id
          ? (h.wid && (Ar(f.wswap), Ar(f.wtop), Ar(f.w2)), (h.wid = u.id))
          : Ar(f.wsil),
        (this.magRoll = null),
        c6(
          c.cross,
          "x-" + (u.id === "ar" ? "rifle" : u.id) + (h.foe ? " foe" : ""),
        ));
      let K = i.slots[1 - i.cur];
      if (K) {
        let $ = this.sil(K.def.id, K.def.build || null, "sil");
        ($ && (c.w2sil.src = $), L2(c.w2k, String(2 - i.cur)));
      }
    }
    if (
      (m.ammo !== h.mag &&
        (h.mag >= 0 &&
          (m.ammo < h.mag
            ? (Ar(f.mag),
              P2 ||
                (this.gapV +=
                  u.id === "shotgun" ? 420 : u.id === "pistol" ? 270 : 190))
            : (Ar(f.magUp),
              m.ammo - h.mag > 1 &&
                (this.magRoll = {
                  a: h.mag,
                  b: m.ammo,
                  t: 0,
                }))),
        (h.mag = m.ammo),
        this.magRoll || L2(c.mag, m.ammo),
        c6(
          c.mag,
          m.ammo === 0 ? "empty" : m.ammo <= u.mag * 0.27 ? "low" : "",
        )),
      this.magRoll)
    ) {
      let G = this.magRoll;
      G.t += t / 0.26;
      let K = Math.min(1, G.t);
      (L2(c.mag, Math.round(G.a + (G.b - G.a) * (1 - (1 - K) * (1 - K)))),
        K >= 1 && (this.magRoll = null));
    }
    L2(c.res, m.reserve);
    {
      let G = i.slots[1 - i.cur];
      G && L2(c.w2n, G.ammo);
    }
    if (i.grenades !== h.frag) {
      for (let G = 0; G < c.frags.length; G++) {
        let K = G < i.grenades,
          $ = h.frag < 0 ? K : G < h.frag;
        (K !== $ &&
          c.frags[G].animate(
            K
              ? [
                  {
                    opacity: 0,
                    transform: "skewX(-14deg) translateY(1rem)",
                  },
                  {
                    opacity: 1,
                    transform: "skewX(-14deg)",
                  },
                ]
              : [
                  {
                    opacity: 1,
                    transform: "skewX(-14deg)",
                  },
                  {
                    opacity: 0.22,
                    transform: "skewX(-14deg) translateY(-1.6rem) scale(1.5)",
                    offset: 0.65,
                  },
                  {
                    opacity: 0.22,
                    transform: "skewX(-14deg)",
                  },
                ],
            {
              duration: 340,
              easing: ta,
            },
          ),
          (c.frags[G].className = K ? "" : "off"));
      }
      (h.frag >= 0 && i.grenades < h.frag && Ar(f.fragi),
        (h.frag = i.grenades),
        c.wfrag.classList.toggle("none", i.grenades === 0));
    }
    let b = i.state === "reload",
      v = b
        ? Math.round(Math.min(1, i.clipT / Math.max(0.01, i.clipDur)) * 100)
        : 0;
    v !== h.rel &&
      ((h.rel = v), (c.wrel.style.transform = "scaleX(" + v / 100 + ")"));
    let y =
      !d || a.state === "countdown"
        ? ""
        : b
          ? "busy"
          : m.ammo === 0 && m.reserve === 0
            ? "empty"
            : m.ammo === 0
              ? "reload"
              : m.ammo <= u.mag * 0.27 && m.reserve > 0 && !u.pump
                ? "low"
                : "";
    y !== h.cue &&
      ((h.cue = y),
      (c.cue.className = y ? "on " + y : ""),
      y &&
        (c.cue.innerHTML =
          y === "busy"
            ? "RELOADING"
            : y === "empty"
              ? "NO AMMO"
              : y === "reload"
                ? "<kbd>R</kbd>RELOAD"
                : "LOW AMMO"));
    let M = Math.max(0, Math.round(n.health)),
      w = Math.max(0, n.health) / 100,
      T = d && (w > this.lastHp + 1e-5 || this.hpShow < w - 0.004);
    ((M !== h.hp || T !== h.regen) &&
      ((h.hp = M),
      (h.regen = T),
      L2(c.hpn, M),
      c6(
        c.vitals,
        (M < 35 ? "crit" : M < 65 ? "warn" : "") + (T ? " regen" : ""),
      )),
      w < this.lastHp - 0.001 && (this.ghostHold = 0.45),
      (this.lastHp = w),
      (this.hpShow = w < this.hpShow ? w : Math.min(w, this.hpShow + t * 0.9)),
      this.ghost < this.hpShow
        ? (this.ghost = this.hpShow)
        : (this.ghostHold -= t) <= 0 &&
          (this.ghost = Math.max(this.hpShow, this.ghost - t * 0.8)));
    let S = Math.round(this.hpShow * 400);
    (S !== h.hpq &&
      ((h.hpq = S),
      (c.hfill.style.transform = "scaleX(" + S / 400 + ")"),
      (c.hedge.style.transform = "translateX(" + (S / 4 - 100) + "%)")),
      (S = Math.round(this.ghost * 400)),
      S !== h.ghq &&
        ((h.ghq = S), (c.hghost.style.transform = "scaleX(" + S / 400 + ")")));
    let E = d
      ? n.mode === "slide"
        ? "slide"
        : n.mode === "dive" || n.mode === "bellyslide"
          ? "dive"
          : n.stance === "prone"
            ? "prone"
            : n.stance === "crouch"
              ? "crouch"
              : "stand"
      : "stand";
    E !== h.stance &&
      (h.stance && c.stances[h.stance].classList.remove("on"),
      c.stances[E].classList.add("on"),
      (h.stance = E));
    let _ = a.scores[0],
      R = a.scores[1],
      C = a.scoreLimit || 40,
      L = a.state === "live";
    (_ !== h.sA &&
      (h.sA >= 0 &&
        _ > h.sA &&
        (Ar(f.sA),
        L &&
          _ === C - 1 &&
          this.banner(
            "MATCH POINT",
            TEAM_NAMES[0] + " NEED ONE ELIMINATION",
            "t0",
          )),
      (h.sA = _),
      L2(c.sA, _),
      (c.pA.style.transform = "scaleX(" + Math.min(1, _ / C) + ")")),
      R !== h.sB &&
        (h.sB >= 0 &&
          R > h.sB &&
          (Ar(f.sB),
          L &&
            R === C - 1 &&
            this.banner(
              "MATCH POINT",
              TEAM_NAMES[1] + " NEED ONE ELIMINATION",
              "t1",
            )),
        (h.sB = R),
        L2(c.sB, R),
        (c.pB.style.transform = "scaleX(" + Math.min(1, R / C) + ")")));
    let A = _ === R ? -1 : _ > R ? 0 : 1;
    if (A !== h.lead) {
      let G = h.lead;
      ((h.lead = A),
        c6(c.tmA, "tm a" + (A === 0 ? " lead" : "")),
        c6(c.tmB, "tm b" + (A === 1 ? " lead" : "")),
        G !== -2 &&
          L &&
          _ + R >= 3 &&
          this.leadT <= 0 &&
          _ < C - 1 &&
          R < C - 1 &&
          ((this.leadT = 6),
          A === 0
            ? this.banner(
                "LEAD TAKEN",
                TEAM_NAMES[0] + " " + _ + " \u2014 " + R,
                "t0",
              )
            : A === 1
              ? this.banner(
                  "LEAD LOST",
                  TEAM_NAMES[1] + " " + R + " \u2014 " + _,
                  "t1",
                )
              : this.banner("SCORES TIED", _ + " \u2014 " + R, "")));
    }
    this.leadT > 0 && (this.leadT -= t);
    let O = Math.max(0, Math.ceil(a.time));
    O !== h.clock &&
      (L && h.clock === 61 && O === 60
        ? this.banner("ONE MINUTE REMAINING", "", "warn")
        : L &&
          h.clock === 31 &&
          O === 30 &&
          this.banner("30 SECONDS", "", "warn", 1.8),
      (h.clock = O),
      L2(
        c.clock,
        Math.floor(O / 60) + ":" + (O % 60 < 10 ? "0" : "") + (O % 60),
      ),
      c6(c.clock, O <= 30 ? "low" : ""));
    let H = a.state === "ending";
    if (
      H !== h.ended &&
      ((h.ended = H), c.hud.classList.toggle("is-clean", H), H)
    ) {
      ((this.bq.length = 0), (this.bT = 9));
      let G = _ > R;
      this._banner({
        text: a.time <= 0 ? "TIME LIMIT REACHED" : "FINAL KILL",
        sub:
          _ === R
            ? "DRAW"
            : TEAM_NAMES[G ? 0 : 1] +
              " WIN " +
              Math.max(_, R) +
              " \u2014 " +
              Math.min(_, R),
        kind: "big " + (_ === R ? "" : G ? "t0" : "t1"),
        hold: 4,
      });
    }
    if (this.bq.length && (this.bT -= t) <= 0) {
      let G = this.bq.shift();
      ((this.bT = G.hold + 0.15), this._banner(G));
    } else !this.bq.length && this.bT > 0 && (this.bT -= t);
    if (l !== !!h.board)
      if (
        ((h.board = l),
        c.hud.classList.toggle("is-board", l),
        (this.boardT = 0),
        this.boardOut &&
          ((this.boardOut.onfinish = null),
          this.boardOut.cancel(),
          (this.boardOut = null)),
        l)
      )
        (c.board.classList.remove("hidden"), Ar(f.boardIn));
      else {
        let G = c.board;
        ((this.boardOut = G.animate(
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
              transform: "translate(-50%,-51%) scale(.985)",
            },
          ],
          {
            duration: 110,
            easing: "ease-in",
          },
        )),
          (this.boardOut.onfinish = () => {
            (G.classList.add("hidden"), (this.boardOut = null));
          }));
      }
    (d !== h.alive && ((h.alive = d), c.hud.classList.toggle("is-dead", !d)),
      l && (this.boardT -= t) <= 0 && ((this.boardT = 0.5), this.board(a)),
      this.map.update(
        t,
        n,
        a.actors,
        e.world,
        this.ctx ? this.ctx.time() : 0,
        r.position,
      ));
    {
      let G = !1;
      if (d && e.physics) {
        let K = e.physics.bodies;
        for (let $ = 0; $ < K.length; $++) {
          let n0 = K[$];
          if (n0.type !== "nade" || n0.dead) continue;
          Rr.set(n0.x[0], n0.x[1], n0.x[2]);
          let e0 = Rr.distanceTo(r.position);
          if (e0 > 9) continue;
          Rr.project(r);
          let p0 = Rr.x,
            t0 = Rr.y;
          Rr.z > 1 && ((p0 = -p0), (t0 = -t0));
          {
            let f0 = Math.sqrt((p0 * p0) / 0.74 + (t0 * t0) / 0.44);
            if (Rr.z > 1 || f0 > 1) {
              let _0 = f0 || 1;
              ((p0 /= _0), (t0 /= _0));
            }
          }
          c.nade.style.transform =
            "translate3d(" +
            ((p0 * 0.5 + 0.5) * innerWidth).toFixed(1) +
            "px," +
            ((-t0 * 0.5 + 0.5) * innerHeight).toFixed(1) +
            "px,0)";
          let M0 = Math.round(e0);
          (M0 !== h.nadeD &&
            ((h.nadeD = M0), (c.nadeTxt.textContent = M0 + "M")),
            (G = !0));
          break;
        }
      }
      h.nade !== G &&
        ((h.nade = G), (c.nade.style.display = G ? "block" : "none"));
    }
    let F = 0,
      P = !1;
    if (d) {
      let G = a.actors,
        K = innerWidth,
        $ = innerHeight;
      for (let n0 = 0; n0 < G.length; n0++) {
        let e0 = G[n0];
        if (e0.isPlayer || !e0.alive || e0.isK9) continue;
        Rr.set(e0.pos.x, e0.pos.y + (e0.e.h > 1.3 ? 1.98 : 1.45), e0.pos.z);
        let p0 = Rr.distanceTo(r.position),
          t0 = e0.team !== n.team;
        if (t0) {
          if (
            p0 > 45 ||
            (Rr.sub(r.position).normalize(), Rr.dot(n.viewDir) < 0.9993) ||
            !e.world.clear(
              r.position,
              Rr.set(e0.pos.x, e0.pos.y + 1.4, e0.pos.z),
            )
          )
            continue;
          (Rr.set(e0.pos.x, e0.pos.y + 1.98, e0.pos.z), (P = !0));
        } else if (p0 > 60) continue;
        if (
          (Rr.project(r),
          Rr.z > 1 || Math.abs(Rr.x) > 1.05 || Math.abs(Rr.y) > 1.05)
        )
          continue;
        let M0 = this.tags[F];
        if (
          (M0 ||
            ((M0 = this.tags[F] = createElement("i")),
            c.tags.appendChild(M0),
            (M0._d = !0)),
          M0._d || ((M0._d = !0), (M0.style.display = "")),
          (M0.style.transform =
            "translate3d(" +
            ((Rr.x * 0.5 + 0.5) * K).toFixed(1) +
            "px," +
            ((-Rr.y * 0.5 + 0.5) * $ - 4).toFixed(1) +
            "px,0) translate(-50%,-100%)"),
          M0._n !== e0.name && ((M0._n = e0.name), (M0.textContent = e0.name)),
          M0._f !== t0 && ((M0._f = t0), (M0.className = t0 ? "foe" : "")),
          t0)
        ) {
          let _0 = Math.round(Math.max(0, e0.health));
          M0._h !== _0 &&
            ((M0._h = _0), M0.style.setProperty("--hp", _0 + "%"));
        }
        let f0 = t0 ? 20 : Math.round(Math.max(0.35, 0.9 - p0 / 70) * 20);
        (M0._o !== f0 && ((M0._o = f0), (M0.style.opacity = f0 / 20)), F++);
      }
    }
    for (let G = F; G < this.tags.length; G++) {
      let K = this.tags[G];
      K._d && ((K._d = !1), (K.style.display = "none"));
    }
    (this.k9hud.aim && (P = !0),
      P !== h.foe &&
        ((h.foe = P),
        c.cross.classList.toggle("foe", P),
        (c.cross._c = c.cross.className)));
    for (let G = 0; G < 6; G++) {
      let K = this.dmg[G];
      if (K.t <= 0) continue;
      K.t -= t;
      let $ = Math.round((K.beta + n.yaw) * 200);
      $ !== K.q &&
        ((K.q = $), (K.n.style.transform = "rotate(" + $ / 200 + "rad)"));
    }
    let z = this.ev;
    (z.on &&
      (z.shown < z.total &&
        ((z.shown = Math.min(
          z.total,
          z.shown + Math.max(1, Math.ceil((z.total - z.shown) * t * 14)),
        )),
        L2(c.evPts, "+" + z.shown)),
      (z.t -= t) <= 0 &&
        ((z.on = !1),
        (z.total = 0),
        (c.evPts.style.opacity = 0),
        c.events.classList.remove("on"),
        c.evPts.animate(
          [
            {
              opacity: 1,
              transform: "none",
            },
            {
              opacity: 0,
              transform: "translateY(-.8rem)",
            },
          ],
          {
            duration: 280,
            easing: "ease-in",
          },
        ))),
      this._expire(this.lines, t, "line"),
      this._expire(this.meds, t, "medal"),
      this._expire(this.feed, t, "feed"),
      this.toasts.length && (this.toastT -= t) <= 0
        ? ((this.toastT = 3.7), this._toast(this.toasts.shift()))
        : !this.toasts.length && this.toastT > 0 && (this.toastT -= t),
      n.streak > this.stat.streak && (this.stat.streak = n.streak),
      this.k9hud.update(t, e));
    let k = this.perf,
      I = performance.now() - s;
    (k.n++, (k.sum += I), I > k.max && (k.max = I), I > 1 && k.over++);
  }
  _expire(t, e, s) {
    for (let n = t.length - 1; n >= 0; n--) {
      let i = t[n];
      (i.t -= e) <= 0 && (t.splice(n, 1), this._drop(i, s));
    }
  }
  _drop(t, e) {
    let s = t.el,
      n = () => s.remove();
    for (let i of s.getAnimations()) i.finish();
    e === "feed"
      ? (s.animate(
          [
            {
              opacity: 1,
              height: "2.7rem",
              marginBottom: "0rem",
            },
            {
              opacity: 0,
              height: "0rem",
              marginBottom: "-.4rem",
              transform: "translateX(1.2rem)",
            },
          ],
          {
            duration: 260,
            easing: "ease-in",
            fill: "forwards",
          },
        ).onfinish = n)
      : e === "medal"
        ? (s.animate(
            [
              {
                opacity: 1,
                width: s.offsetWidth + "px",
                marginRight: "0rem",
              },
              {
                opacity: 0,
                transform: "scale(.6) translateY(-.8rem)",
                offset: 0.5,
              },
              {
                opacity: 0,
                width: "0rem",
                marginRight: "-1.2rem",
                transform: "scale(.6) translateY(-.8rem)",
              },
            ],
            {
              duration: 360,
              easing: "ease-in-out",
              fill: "forwards",
            },
          ).onfinish = n)
        : (s.animate(
            [
              {
                opacity: 1,
                height: "2.3rem",
              },
              {
                opacity: 0,
                height: "0rem",
                transform: "translateY(-.5rem)",
              },
            ],
            {
              duration: 260,
              easing: "ease-in",
              fill: "forwards",
            },
          ).onfinish = n);
  }
};

export { GameHUD };

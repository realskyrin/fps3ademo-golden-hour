// ui/menus.js: recovered from the verified GOLDEN HOUR release.
import { Hh, P7, dv, icon, z7 } from "./icons.js";
import { createElement, elementById, escapeHTML, lr } from "./dom.js";
import {
  ATTACHMENTS,
  ATTACHMENT_LABELS,
  ATTACHMENT_SLOTS,
  CAMOS,
  PRIMARY_WEAPONS,
  Vb,
  WEAPON_ATTACHMENTS,
  WEAPON_IDS,
  camoProgress,
  getBuild,
  o2,
  profile,
  rankProgress,
  resolveWeaponDefinition,
  saveBuild,
  weaponStats,
} from "../weapons/loadout.js";
import { DIFFICULTIES, saveSettings, settings } from "../core/settings.js";
import { WEAPON_DEFINITIONS } from "../weapons/definitions.js";
import { r6 } from "./camo-preview.js";
import { D7, Oa, i6 } from "./preferences.js";
import { kC } from "../ai/k9/system.js";
import { TEAM_NAMES } from "../ai/match.js";

var Ff = "cubic-bezier(.2,.8,.2,1)";
var bs0 = ["STANDARD ISSUE", "MILITARY", "SPECIAL", "MASTERY", "COMPLETIONIST"];
var ys0 = {
  ar: "Balanced carbine. Wins the long lanes of the atrium.",
  smg: "Fast-handling 9 mm. Owns corridors and the bar.",
  shotgun: "Pump-action 12 gauge. One trigger pull inside a room.",
  pistol: "Striker-fired sidearm. Always on your hip.",
};
var vs0 = [
  ["damage", "DAMAGE"],
  ["range", "RANGE"],
  ["fireRate", "FIRE RATE"],
  ["accuracy", "ACCURACY"],
  ["control", "RECOIL CONTROL"],
  ["mobility", "MOBILITY"],
  ["handling", "HANDLING"],
];
var Ms0 = {
  recoilV: ["VERTICAL RECOIL", !1],
  recoilH: ["HORIZONTAL RECOIL", !1],
  adsTime: ["ADS TIME", !1],
  sprintOut: ["SPRINT-TO-FIRE", !1],
  mobility: ["MOVE SPEED", !0],
  adsMove: ["ADS MOVE SPEED", !0],
  range: ["RANGE", !0],
  zoom: ["ZOOM", !0],
  hip: ["HIP SPREAD", !1],
  reload: ["RELOAD TIME", !1],
  mag: ["MAG SIZE", !0],
  flash: ["MUZZLE FLASH", !1],
};
var BU = {
  low: "70% resolution, no anti-aliasing, no ambient occlusion or floor reflections. For integrated graphics.",
  medium:
    "85% resolution, 2\xD7 MSAA, half-rate floor reflections and light shafts.",
  high: "Full resolution, 4\xD7 MSAA, ambient occlusion and 4K sun shadows. Recommended.",
  ultra:
    "High, plus sharper reflections, denser light shafts and up to 2\xD7 pixel density on high-DPI displays.",
};
var ws0 = [
  [
    "MOVEMENT",
    [
      ["MOVE", ["W", "A", "S", "D"]],
      ["SPRINT \u2014 ANY DIRECTION", ["SHIFT"]],
      ["JUMP / MANTLE", ["SPACE"]],
      ["CROUCH / SLIDE", ["C"]],
      ["PRONE / DIVE", ["X"]],
    ],
  ],
  [
    "COMBAT",
    [
      ["FIRE", ["@lmb"]],
      ["AIM DOWN SIGHTS", ["@rmb"]],
      ["RELOAD", ["R"]],
      ["MELEE", ["V", "/", "F"]],
      ["FRAG GRENADE", ["G", "/", "Q"]],
      ["UNLEASH K9 UNIT", ["B", "/", "3"]],
      ["SWAP WEAPON", ["1", "2", "/", "@wheel"]],
      ["INSPECT WEAPON", ["T"]],
    ],
  ],
  [
    "GENERAL",
    [
      ["SCOREBOARD", ["TAB"]],
      ["PAUSE / BACK", ["ESC"]],
      ["PAUSE / RESUME", ["P"]],
      ["MENU NAVIGATE", ["\u2191", "\u2193", "\u2190", "\u2192"]],
      ["MENU SELECT", ["ENTER"]],
      ["SWITCH TAB", ["Q", "E"]],
      ["FULLSCREEN", ["F11"]],
    ],
  ],
];
var UU = (o) =>
  o === "/"
    ? "<small>OR</small>"
    : o[0] === "@"
      ? `<kbd>${icon(o.slice(1))}</kbd>`
      : `<kbd>${o}</kbd>`;
var SETTING_PANELS = {
  mouse: {
    title: "MOUSE & VIEW",
    ic: "mouse",
    rows: [
      {
        k: "sens",
        label: "MOUSE SENSITIVITY",
        type: "range",
        min: 0.2,
        max: 3,
        step: 0.05,
        fmt: (o) => o.toFixed(2),
        desc: "How far the view turns for a given mouse movement. Lower is steadier for rifles; higher turns faster in close quarters.",
      },
      {
        k: "adsSens",
        label: "ADS SENSITIVITY MULTIPLIER",
        type: "range",
        min: 0.4,
        max: 1.5,
        step: 0.05,
        fmt: (o) => o.toFixed(2) + "\xD7",
        desc: "Applied on top of sensitivity while aiming down sights. Zoom already slows the view; 1.00 keeps the same hand distance per on-screen distance.",
      },
      {
        k: "invertY",
        label: "INVERT VERTICAL LOOK",
        type: "seg",
        opts: [
          [!1, "OFF"],
          [!0, "ON"],
        ],
        desc: "Pushing the mouse forward looks down instead of up.",
      },
      {
        k: "fov",
        label: "FIELD OF VIEW",
        type: "range",
        min: 80,
        max: 120,
        step: 1,
        fmt: (o) => o.toFixed(0) + "\xB0",
        desc: "Horizontal field of view at 16:9. Wider shows more of the room and makes movement feel faster; narrower makes distant targets larger.",
      },
    ],
  },
  audio: {
    title: "AUDIO",
    ic: "speaker",
    rows: [
      {
        k: "master",
        label: "MASTER VOLUME",
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        fmt: (o) => Math.round(o * 100),
        desc: "Overall loudness of everything: weapons, footsteps, interface and music.",
      },
      {
        k: "sfx",
        label: "EFFECTS VOLUME",
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        fmt: (o) => Math.round(o * 100),
        desc: "Weapons, impacts, footsteps and ambience, relative to the master volume.",
      },
      {
        k: "music",
        label: "MUSIC VOLUME",
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        fmt: (o) => Math.round(o * 100),
        desc: "Menu score and the lounge band playing in the Ember Bar. Shooting the speaker also works.",
      },
    ],
  },
  graphics: {
    title: "GRAPHICS",
    ic: "monitor",
    rows: [
      {
        k: "quality",
        label: "QUALITY PRESET",
        type: "seg",
        opts: [
          ["low", "LOW"],
          ["medium", "MEDIUM"],
          ["high", "HIGH"],
          ["ultra", "ULTRA"],
        ],
        desc: "One switch for resolution scale, anti-aliasing, shadows, ambient occlusion, reflections and light shafts.",
        side: "quality",
      },
      {
        k: "motionBlur",
        label: "MOTION BLUR",
        type: "seg",
        opts: [
          ["off", "OFF"],
          ["low", "LOW"],
          ["high", "HIGH"],
        ],
        desc: "Film-style blur on fast camera turns and on the weapon and hands as they move (reload, recoil, swap). The weapon stays sharp at rest. Off is the competitive choice.",
      },
      {
        k: "@fullscreen",
        label: "FULLSCREEN",
        type: "seg",
        opts: [
          [!1, "OFF"],
          [!0, "ON"],
        ],
        desc: "Borderless fullscreen. F11 does the same; Esc leaves it.",
      },
    ],
  },
  interface: {
    title: "INTERFACE",
    ic: "hudicon",
    rows: [
      {
        k: "@minimap",
        label: "MINIMAP",
        type: "seg",
        opts: [
          ["rotate", "ROTATING"],
          ["fixed", "NORTH UP"],
          ["off", "OFF"],
        ],
        desc: "Rotating keeps your view pointing up, like the compass. North Up keeps the hotel still and turns your arrow instead.",
      },
      {
        k: "@xhair",
        label: "CROSSHAIR COLOUR",
        type: "seg",
        opts: [
          ["white", "WHITE"],
          ["cyan", "CYAN"],
          ["lime", "LIME"],
          ["amber", "AMBER"],
        ],
        desc: "Pick the colour you lose least against the sunset. The crosshair always turns red over an enemy.",
        side: "xhair",
      },
      {
        k: "@hudScale",
        label: "HUD SCALE",
        type: "range",
        min: 0.8,
        max: 1.2,
        step: 0.05,
        fmt: (o) => Math.round(o * 100) + "%",
        desc: "Size of the in-match HUD. Menus are not affected.",
      },
      {
        k: "@hints",
        label: "CONTROL HINTS",
        type: "seg",
        opts: [
          [!1, "OFF"],
          [!0, "ON"],
        ],
        desc: "Shows the movement keys at the start of your first few matches.",
      },
    ],
  },
};
var mv = ["controls", "mouse", "audio", "graphics", "interface"];
var l6 = {
  main: 0,
  pause: 0,
  end: 0,
  settings: 1,
  gunsmith: 1,
};
var MenuController = class {
  constructor(hud, callbacks) {
    ((this.hud = hud),
      (this.cb = callbacks),
      (this.root = elementById("ui")),
      (this.pages = {}),
      (this.page = null),
      (this.home = "main"),
      (this.studio = null),
      (this.shownAt = 0),
      (this.rolls = []),
      (this.raf = 0),
      (this.last = 0),
      (this.tab = "controls"),
      (this.gs = {
        w: PRIMARY_WEAPONS.includes(settings.primary) ? settings.primary : "ar",
        slot: "optic",
        mode: "att",
        hover: null,
        bars: {},
        lay: null,
      }),
      this._main(),
      this._pause(),
      this._gunsmith(),
      this._settings(),
      this._end(),
      addEventListener("keydown", (s) => this._key(s)),
      document.addEventListener("fullscreenchange", () => this._syncRows()),
      addEventListener("resize", () => {
        ((this.gs.lay = null), this._pills());
      }),
      (this.slow = 1),
      this.root.addEventListener("mouseover", (s) => {
        let n = s.target.closest("button, .ms, [data-nav]");
        !n ||
          n === this._hov ||
          ((this._hov = n),
          callbacks.sound("hover"),
          n.matches("[data-nav]") &&
            document.activeElement !== n &&
            n.focus({
              preventScroll: !0,
            }));
      }),
      this.root.addEventListener("mouseout", (s) => {
        this._hov && !this._hov.contains(s.relatedTarget) && (this._hov = null);
      }));
  }
  _page(t, e) {
    let s = createElement("section", "page", e);
    return (
      (s.id = "pg-" + t),
      this.root.appendChild(s),
      (this.pages[t] = s),
      s
    );
  }
  _legend(t) {
    return `<footer class="legend">${t.map(([e, s]) => `<span>${e.map((n) => UU(n)).join("")}${s}</span>`).join("")}</footer>`;
  }
  _main() {
    this._page(
      "main",
      `
      <div class="lockup"><div class="kicker">SOLSTICE HOTEL &nbsp;\xB7&nbsp; SKY LOBBY &nbsp;\xB7&nbsp; 47F</div><h1>GOLDEN<span>HOUR</span></h1><div class="mode">TEAM DEATHMATCH &nbsp;\u2014&nbsp; 5 v 5 &nbsp;\u2014&nbsp; FIRST TO 40</div></div>
      <nav class="vnav">
        <button class="nv primary" data-nav data-act="deploy"><b>DEPLOY</b><em>${icon("chev")}</em></button>
        <button class="nv" data-nav data-act="gunsmith"><b>GUNSMITH</b><em>ATTACHMENTS \xB7 CAMOS</em></button>
        <button class="nv" data-nav data-act="difficulty"><b>DIFFICULTY</b><em><i class="arr" data-d="-1">${icon("back")}</i><span id="diffv"></span><i class="arr" data-d="1">${icon("chev")}</i></em></button>
        <button class="nv" data-nav data-act="settings"><b>SETTINGS</b><em>CONTROLS \xB7 AUDIO \xB7 GRAPHICS</em></button>
      </nav>
      <aside id="loadcard" data-act="gunsmith"><div class="sech"><span>LOADOUT</span><span id="lc-d"></span></div><div class="lc-main"><img id="lc-img" alt=""><div class="lc-t"><span id="lc-c"></span><b id="lc-n"></b><i id="lc-a"></i></div></div><div class="lc-sub"><div><img id="lc-p" alt=""><span id="lc-pn"></span></div><div><img id="lc-f" alt=""><span>FRAG \xD7 2</span></div></div><div class="lc-fu"><span class="ri">${icon("k9")}</span><div><b>FIELD UPGRADE \u2014 <em>K9 UNIT</em></b><span>Charges in 80 s \xB7 hunts on its own for 40 s</span></div><kbd>B</kbd></div></aside>
      <aside id="pcard"></aside><aside id="mastery"></aside>
      ${this._legend([
        [["\u2191", "\u2193"], "NAVIGATE"],
        [["ENTER"], "SELECT"],
        [["\u2190", "\u2192"], "CHANGE"],
      ])}<div class="ver">GOLDEN HOUR 1.0</div>`,
    ).addEventListener("click", (e) => {
      let s = e.target.closest(".ms");
      if (s) {
        ((this.gs.w = s.dataset.w), this.go("gunsmith"));
        return;
      }
      let n = e.target.closest("[data-act]");
      if (!n) return;
      let i = e.target.closest(".arr");
      this._act(n.dataset.act, i ? Number(i.dataset.d) : 1);
    });
  }
  _act(t, e = 1) {
    let s = this.cb;
    if (t === "deploy") s.onDeploy();
    else if (t === "resume") s.onResume();
    else if (t === "gunsmith")
      (this.home === "main" && (this.gs.w = settings.primary),
        this.go("gunsmith"));
    else if (t === "settings") this.go("settings");
    else if (t === "back") this.back();
    else if (t === "difficulty") {
      let n = Object.keys(DIFFICULTIES),
        i = n.indexOf(settings.difficulty);
      ((settings.difficulty = n[(i + e + n.length) % n.length]),
        saveSettings(),
        s.sound("click"),
        s.onSetting("difficulty"),
        this._refreshMain());
    } else if (t === "quit") {
      let n = this.pages.pause.querySelector("[data-act=quit]");
      n.dataset.armed
        ? (delete n.dataset.armed,
          (n.querySelector("em").textContent = ""),
          s.onQuit())
        : ((n.dataset.armed = "1"),
          (n.querySelector("em").textContent = "PRESS AGAIN TO FORFEIT"),
          s.sound("click"),
          clearTimeout(this._qt),
          (this._qt = setTimeout(() => {
            (delete n.dataset.armed, (n.querySelector("em").textContent = ""));
          }, 3e3)));
    } else t === "again" ? s.onAgain() : t === "tomenu" && s.onQuit();
  }
  _refreshMain() {
    elementById("diffv").textContent = DIFFICULTIES[settings.difficulty].label;
    let t = settings.primary,
      e = WEAPON_DEFINITIONS[t],
      s = getBuild(t),
      n = getBuild("pistol"),
      i = (d, m) =>
        ATTACHMENT_SLOTS.filter(
          (p) => m[p] && m[p] !== WEAPON_ATTACHMENTS[d][p][0],
        ).map((p) => ATTACHMENTS[p][m[p]].name),
      a = i(t, s),
      r = CAMOS.find((d) => d.id === s.camo);
    ((elementById("lc-n").textContent = e.name),
      (elementById("lc-c").textContent =
        e.cls + (r && r.id !== "factory" ? " \xB7 " + r.name : "")),
      (elementById("lc-a").textContent = a.length
        ? a.join(" \xB7 ")
        : "FACTORY CONFIGURATION"),
      (elementById("lc-d").textContent = a.length + " / 5 ATTACHMENTS"),
      (elementById("lc-pn").textContent =
        WEAPON_DEFINITIONS.pistol.name +
        (i("pistol", n).length
          ? " \xB7 " + i("pistol", n).length + " ATT"
          : "")),
      this.studio &&
        ((elementById("lc-img").src = this.studio.card(t, s)),
        (elementById("lc-p").src = this.studio.card("pistol", n)),
        (elementById("lc-f").src = this.studio.card("frag"))));
    let l = rankProgress(),
      c = profile.matches
        ? Math.round((profile.wins / profile.matches) * 100)
        : 0;
    elementById("pcard").innerHTML =
      `<div class="pc-top">${z7(l.rank)}<div class="pc-id"><div class="pc-k">OPERATOR \xB7 VANGUARD</div><div class="pc-lvl"><b>${l.rank}</b><span>${l.title}</span></div><div class="xpbar"><i></i></div><div class="pc-xp"><span>${lr(l.into)} / ${lr(l.span)} XP</span><span>${l.t >= 1 ? "MAX RANK" : "RANK " + (l.rank + 1)}</span></div></div></div>
      <div class="pc-stats"><div><b>${lr(profile.matches)}</b><span>MATCHES</span></div><div><b>${lr(profile.wins)}</b><span>WINS</span></div><div><b>${c}%</b><span>WIN RATE</span></div><div><b>${lr(profile.kills)}</b><span>ELIMS</span></div></div>`;
    let h = elementById("pcard").querySelector(".xpbar i");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        h.style.transform = `scaleX(${l.t})`;
      }),
    );
    let f =
      '<div class="sech"><span>WEAPON MASTERY</span><span>CAMOS</span></div>';
    for (let d of WEAPON_IDS) {
      let m = profile.weapons[d],
        p = CAMOS.filter((v) => o2(d, v.id)).length,
        x = CAMOS.find((v) => !o2(d, v.id)),
        g = x
          ? camoProgress(d, x.id)
          : {
              t: 1,
            },
        b = this.studio && this.studio.factory(d);
      f += `<div class="ms${d === settings.primary ? " eq" : ""}" data-w="${d}"><img src="${b ? b.line : ""}" alt=""><div><div class="mn"><span>${WEAPON_DEFINITIONS[d].name}</span><i>${lr(m.kills)} ELIMS</i></div><div class="mbar"><i style="transform:scaleX(${g.t.toFixed(3)})"></i></div></div><div class="mc"><span data-camo="${getBuild(d).camo}"></span>${p}/${CAMOS.length}</div></div>`;
    }
    let u = elementById("mastery");
    u.innerHTML = f;
    for (let d of u.querySelectorAll("[data-camo]"))
      d.replaceWith(r6(d.dataset.camo, 48));
  }
  _pause() {
    this._page(
      "pause",
      `
      <div class="lockup"><div class="kicker">TEAM DEATHMATCH &nbsp;\xB7&nbsp; SOLSTICE HOTEL</div><h1>PAUSED</h1><div class="p-score" id="p-score"></div></div>
      <aside class="e-col" id="p-board"><div class="sech"><span>SCOREBOARD</span><span>FIRST TO 40</span></div><div id="p-board-in"></div></aside>
      <nav class="vnav">
        <button class="nv primary" data-nav data-act="resume"><b>RESUME</b><em>${icon("chev")}</em></button>
        <button class="nv" data-nav data-act="gunsmith"><b>GUNSMITH</b><em>APPLIES ON NEXT SPAWN</em></button>
        <button class="nv" data-nav data-act="settings"><b>SETTINGS</b><em></em></button>
        <button class="nv danger" data-nav data-act="quit"><b>QUIT TO MENU</b><em></em></button>
      </nav>
      ${this._legend([
        [["\u2191", "\u2193"], "NAVIGATE"],
        [["ENTER"], "SELECT"],
        [["ESC", "/", "P"], "RESUME"],
      ])}`,
    ).addEventListener("click", (e) => {
      let s = e.target.closest("[data-act]");
      s && this._act(s.dataset.act);
    });
  }
  _refreshPause() {
    let t = this.hud.ctx && this.hud.ctx.match;
    if (!t) return;
    let e = Math.max(0, Math.ceil(t.time));
    ((elementById("p-score").innerHTML =
      `${Hh(0)}<b class="t0">${t.scores[0]}</b><i>\u2014</i><b class="t1">${t.scores[1]}</b>${Hh(1)}<span>${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")} REMAINING</span>`),
      this.hud.board(t, elementById("p-board-in"), !0));
  }
  _settings() {
    let t = `<button class="tab" data-tab="controls">${icon("keyboard")}CONTROLS</button>`,
      e = "";
    e += `<div class="st-panel" data-tab="controls"><div class="binds">${ws0.map(([n, i], a) => `<div style="--i:${a * 2}"><h4>${n}</h4>${i.map(([r, l]) => `<div class="bind"><span>${r}</span><span>${l.map(UU).join("")}</span></div>`).join("")}</div>`).join("")}</div></div>`;
    for (let n of mv.slice(1)) {
      let i = SETTING_PANELS[n];
      ((t += `<button class="tab" data-tab="${n}">${icon(i.ic)}${i.title}</button>`),
        (e += `<div class="st-panel" data-tab="${n}"><div class="st-rows">${i.rows.map((a, r) => `<div class="row" tabindex="0" data-nav data-row="${n}:${r}" style="--i:${r}"><label>${a.label}</label>${a.type === "range" ? `<input type="range" tabindex="-1" min="${a.min}" max="${a.max}" step="${a.step}"><output></output>` : `<div class="seg"><u class="pill"></u>${a.opts.map((l, c) => `<button tabindex="-1" data-o="${c}">${l[1]}</button>`).join("")}</div>`}</div>`).join("")}</div><div class="st-side"></div></div>`));
    }
    let s = this._page(
      "settings",
      `<header class="topbar"><button class="backb" data-act="back">${icon("back")}BACK<kbd>ESC</kbd></button><h2>SETTINGS</h2><div class="tabs">${t}</div><div class="tb-keys"><kbd>Q</kbd><kbd>E</kbd></div></header>
      <div class="st-body">${e}</div>${this._legend([
        [["\u2191", "\u2193"], "NAVIGATE"],
        [["\u2190", "\u2192"], "ADJUST"],
        [["Q", "E"], "TAB"],
        [["ESC"], "BACK"],
      ])}`,
    );
    (s.addEventListener("click", (n) => {
      if (n.target.closest("[data-act=back]")) return this.back();
      let i = n.target.closest(".tab");
      if (i)
        return (
          i.dataset.tab !== this.tab && this.cb.sound("tab"),
          this._tab(i.dataset.tab)
        );
      let a = n.target.closest(".seg button");
      if (a) {
        let r = a.closest(".row");
        (this._set(r, this._rowDef(r).opts[Number(a.dataset.o)][0]),
          this.cb.sound("click"));
      }
    }),
      s.addEventListener("input", (n) => {
        let i = n.target.closest(".row");
        i && this._set(i, Number(n.target.value));
      }),
      s.addEventListener("focusin", (n) => {
        let i = n.target.closest(".row");
        i && this._side(i);
      }),
      s.addEventListener("mouseover", (n) => {
        let i = n.target.closest(".row");
        i && this._side(i);
      }));
  }
  _rowDef(t) {
    let [e, s] = t.dataset.row.split(":");
    return SETTING_PANELS[e].rows[Number(s)];
  }
  _get(t) {
    return t.k === "@fullscreen"
      ? !!document.fullscreenElement
      : t.k[0] === "@"
        ? Oa[t.k.slice(1)]
        : settings[t.k];
  }
  _set(t, e) {
    let s = this._rowDef(t);
    (s.k === "@fullscreen"
      ? e && !document.fullscreenElement
        ? document.documentElement.requestFullscreen().catch(() => {})
        : !e && document.fullscreenElement && document.exitFullscreen()
      : s.k[0] === "@"
        ? ((Oa[s.k.slice(1)] = e), i6(), this.hud._applyUi())
        : ((settings[s.k] = e), saveSettings(), this.cb.onSetting(s.k)),
      this._syncRow(t, s.k === "@fullscreen" ? e : void 0),
      this._side(t));
  }
  _syncRow(t, e) {
    let s = this._rowDef(t),
      n = e !== void 0 ? e : this._get(s);
    if (s.type === "range") {
      let i = t.querySelector("input"),
        a = t.querySelector("output"),
        r = s.fmt(Number(n));
      if (
        ((i.value = n),
        i.style.setProperty(
          "--p",
          (((n - s.min) / (s.max - s.min)) * 100).toFixed(1) + "%",
        ),
        a.textContent !== String(r))
      ) {
        let l = a.textContent === "";
        ((a.textContent = r),
          l ||
            a.animate(
              [
                {
                  transform: "scale(1.22)",
                  color: "#ffb35c",
                },
                {
                  transform: "scale(1)",
                  color: "#fff",
                },
              ],
              {
                duration: 180,
                easing: Ff,
              },
            ));
      }
    } else
      (t
        .querySelectorAll(".seg button")
        .forEach((i, a) => i.classList.toggle("on", s.opts[a][0] === n)),
        this._pill(t.querySelector(".seg")));
  }
  _pill(t) {
    let e = t && t.querySelector("button.on"),
      s = t && t.querySelector(".pill");
    !e ||
      !s ||
      !e.offsetWidth ||
      ((s.style.width = e.offsetWidth + "px"),
      (s.style.transform = "translateX(" + e.offsetLeft + "px)"));
  }
  _pills() {
    if (this.page)
      for (let t of this.pages[this.page].querySelectorAll(".seg"))
        this._pill(t);
  }
  _syncRows() {
    for (let t of this.pages.settings.querySelectorAll(".row"))
      this._syncRow(t);
  }
  _side(t) {
    let e = this._rowDef(t),
      s = t.closest(".st-panel").querySelector(".st-side");
    if (s._k === e.k + this._get(e)) return;
    s._k = e.k + this._get(e);
    let n = `<h4>${e.label}</h4><p>${e.desc}</p>`;
    (e.side === "quality" &&
      (n += `<div class="ql">${Object.keys(BU)
        .map(
          (i) =>
            `<b class="${i === settings.quality ? "on" : ""}">${i}</b><span class="${i === settings.quality ? "on" : ""}">${BU[i]}</span>`,
        )
        .join("")}</div>`),
      e.side === "xhair" &&
        (n += `<div class="xh-prev" style="--xc:${D7[Oa.xhair]}"><div id="cross-prev"><i class="t"></i><i class="b"></i><i class="l"></i><i class="r"></i><u></u></div></div>`),
      (s.innerHTML = n));
  }
  _tab(t) {
    this.tab = t;
    let e = this.pages.settings;
    for (let n of e.querySelectorAll(".tab"))
      n.classList.toggle("on", n.dataset.tab === t);
    for (let n of e.querySelectorAll(".st-panel"))
      n.classList.toggle("on", n.dataset.tab === t);
    for (let n of e.querySelectorAll(`.st-panel[data-tab="${t}"] .seg`)) {
      let i = n.querySelector(".pill");
      i &&
        ((i.style.transition = "none"),
        this._pill(n),
        i.offsetWidth,
        (i.style.transition = ""));
    }
    let s = e.querySelector(`.st-panel[data-tab="${t}"] .row`);
    s
      ? (s.focus({
          preventScroll: !0,
        }),
        this._side(s))
      : e.querySelector(`.tab[data-tab="${t}"]`).focus({
          preventScroll: !0,
        });
  }
  _rowStep(t, e) {
    let s = this._rowDef(t),
      n = this._get(s);
    if (s.type === "range") {
      let i = (s.max - s.min > 2, s.step);
      this._set(
        t,
        Number(
          Math.max(
            s.min,
            Math.min(s.max, Math.round((Number(n) + e * i) / s.step) * s.step),
          ).toFixed(4),
        ),
      );
    } else {
      let i = s.opts.findIndex((r) => r[0] === n),
        a = Math.max(0, Math.min(s.opts.length - 1, i + e));
      a !== i && (this._set(t, s.opts[a][0]), this.cb.sound("click"));
    }
  }
  _gunsmith() {
    let t = this._page(
        "gunsmith",
        `<header class="topbar"><button class="backb" data-act="back">${icon("back")}BACK<kbd>ESC</kbd></button><h2>GUNSMITH</h2>
        <div class="tabs" id="gs-tabs">${WEAPON_IDS.map((i) => `<button class="tab" data-w="${i}"><img alt=""><span>${WEAPON_DEFINITIONS[i].name}</span><em class="hidden"></em></button>`).join("")}</div><div class="tb-keys"><kbd>Q</kbd><kbd>E</kbd>WEAPON</div></header>
      <div class="gs-left">
        <div class="seg" id="gs-mode"><u class="pill"></u><button data-m="att">${icon("optic")}ATTACHMENTS</button><button data-m="camo">${icon("camo")}CAMOS</button></div>
        <div class="gs-pane" id="gs-att"><div class="gs-h" id="gs-slh"></div><div id="gs-opts"></div></div>
        <div class="gs-pane hidden" id="gs-camo"><div class="gs-h">${icon("camo")}<span>WEAPON CAMOS</span><i id="gs-cc"></i></div><div class="camogrid" id="gs-grid"></div><div id="gs-cinfo"></div></div>
      </div>
      <div class="gs-stage" id="gs-stage"><div id="gs-view"></div><svg id="gs-lines"></svg>
        <div id="gs-fx"><i></i></div><div id="gs-conf"></div>
        ${ATTACHMENT_SLOTS.map((i, a) => `<button class="slot" data-slot="${i}" style="--i:${a}"><div class="sk">${icon(i)}${ATTACHMENT_LABELS[i]}<kbd>${a + 1}</kbd></div><div class="sv"></div></button>`).join("")}
        <div class="gs-name"><span id="gs-cls"></span><b id="gs-wname"></b><i id="gs-wdesc"></i></div>
      </div>
      <div class="gs-right"><div id="gs-tags"></div><div id="gs-stats">${vs0.map(([i, a]) => `<div class="sb" data-k="${i}"><div class="sl"><span>${a}</span><b></b></div><div class="st"><i class="dlt"></i><i class="cur"></i></div></div>`).join("")}</div>
        <div id="gs-nums"></div><div id="gs-mast"></div>
        <div class="gs-actions"><div class="gs-note" id="gs-note"></div><button class="btn" id="gs-equip"></button><button class="btn ghost" id="gs-reset">${icon("reset")}RESET BUILD</button></div></div>
      <div id="gs-fu"><span class="ri">${icon("k9")}</span><b>FIELD UPGRADE \u2014 <em>K9 UNIT</em></b><span>Charges in ${kC.chargeTime} s \xB7 hunts for ${kC.batteryTime} s</span><kbd>B</kbd></div>
      ${this._legend([
        [["1", "\u2013", "5"], "SLOT"],
        [["\u2191", "\u2193"], "OPTION"],
        [["ENTER"], "EQUIP"],
        [["C"], '<i id="gs-lc">CAMOS</i>'],
        [["F"], "SET PRIMARY"],
        [["R"], "RESET"],
        [["ESC"], "BACK"],
      ])}`,
      ),
      e = document.createElement("style");
    ((e.textContent =
      ".sb .st i{position:absolute;top:0;bottom:0;left:0}.sb .st .cur{width:100%;background:#fff;transform-origin:left;transition:transform .32s cubic-bezier(.2,.8,.2,1);z-index:2}.sb .st .dlt{z-index:3;transition:left .25s cubic-bezier(.2,.8,.2,1),width .25s cubic-bezier(.2,.8,.2,1);width:0}.sb .st .dlt.up{background:var(--good)}.sb .st .dlt.dn{background:var(--bad)}.legend kbd+kbd{margin-left:-.3rem}"),
      document.head.appendChild(e),
      (this.g = {
        tabs: [...t.querySelectorAll("#gs-tabs .tab")],
        slots: {},
        lines: {},
        stage: elementById("gs-stage"),
        view: elementById("gs-view"),
        svg: elementById("gs-lines"),
      }));
    for (let i of t.querySelectorAll(".slot")) this.g.slots[i.dataset.slot] = i;
    let s = "http://www.w3.org/2000/svg";
    for (let i of ATTACHMENT_SLOTS) {
      let a = document.createElementNS(s, "path"),
        r = document.createElementNS(s, "circle");
      (r.setAttribute("r", "4"),
        this.g.svg.append(a, r),
        (this.g.lines[i] = {
          path: a,
          dot: r,
        }));
    }
    t.addEventListener("click", (i) => {
      if (i.target.closest("[data-act=back]")) return this.back();
      let a = i.target.closest("#gs-tabs .tab");
      if (a)
        return (
          a.dataset.w !== this.gs.w && this.cb.sound("tab"),
          this._gsWeapon(a.dataset.w)
        );
      let r = i.target.closest("#gs-mode button");
      if (r)
        return (
          r.dataset.m !== this.gs.mode && this.cb.sound("tab"),
          this._gsMode(r.dataset.m)
        );
      let l = i.target.closest(".slot");
      if (l) return (this.cb.sound("slot"), this._gsSlot(l.dataset.slot, !0));
      let c = i.target.closest(".opt");
      if (c) return this._gsPick(c.dataset.id);
      let h = i.target.closest(".cm");
      if (h) return this._gsCamo(h.dataset.id);
      if (i.target.closest("#gs-equip")) return this._gsEquip();
      if (i.target.closest("#gs-reset")) return this._gsReset();
    });
    let n = (i) => {
      let a = i.target.closest(".opt"),
        r = i.target.closest(".cm");
      a ? this._gsHover(a.dataset.id) : r && this._gsCamoInfo(r.dataset.id);
    };
    (t.addEventListener("mouseover", n),
      t.addEventListener("focusin", n),
      elementById("gs-opts").addEventListener("mouseleave", () =>
        this._gsHover(null),
      ));
  }
  _gsWeapon(t) {
    let e = this.gs;
    e.w !== t &&
      ((e.w = t),
      (e.hover = null),
      (WEAPON_ATTACHMENTS[t][e.slot] || []).length || (e.slot = "optic"),
      this._gsRender(!0));
  }
  _gsMode(t) {
    ((this.gs.mode = t), (this.gs.hover = null), this._gsRender(!0));
  }
  _gsSlot(t, e) {
    (WEAPON_ATTACHMENTS[this.gs.w][t] || []).length &&
      ((this.gs.slot = t),
      (this.gs.hover = null),
      this.gs.mode !== "att" && (this.gs.mode = "att"),
      this._gsRender(e));
  }
  _gsHover(t) {
    this.gs.hover !== t && ((this.gs.hover = t), this._gsStats());
  }
  _gsPick(t) {
    let e = this.gs;
    if (getBuild(e.w)[e.slot] === t) {
      this.cb.sound("hover");
      return;
    }
    (saveBuild(e.w, {
      [e.slot]: t,
    }),
      (e.hover = null));
    let s = this.hud.ctx && this.hud.ctx.audio;
    (s && s.attachment ? s.attachment(e.slot) : this.cb.sound("click"),
      this._gsRender(!1),
      this._gsBake(),
      this.studio && (this.studio.snap(e.slot), this._gsFlash(e.slot)),
      this.g.slots[e.slot].animate(
        [
          {
            boxShadow:
              "inset 0 0 0 .2rem #ffb35c, 0 0 3rem rgba(255,138,42,.7)",
            transform: "scale(1.05)",
          },
          {
            boxShadow:
              "inset 0 0 0 1px #ff8a2a, 0 0 2.4rem rgba(255,138,42,.22)",
            transform: "scale(1)",
          },
        ],
        {
          duration: 340,
          easing: Ff,
        },
      ),
      this._gsConfirm(
        ATTACHMENTS[e.slot][t].name +
          (t === WEAPON_ATTACHMENTS[e.w][e.slot][0] ? " RESTORED" : " FITTED"),
      ));
    let n = elementById("gs-opts").querySelector(`.opt[data-id="${t}"]`);
    n &&
      n.focus({
        preventScroll: !0,
      });
  }
  _gsCamo(t) {
    let e = this.gs;
    if (!o2(e.w, t)) {
      (this.cb.sound("error"),
        this._gsCamoInfo(t, !0),
        elementById("gs-cinfo").animate(
          [
            {
              transform: "translateX(-.7rem)",
            },
            {
              transform: "translateX(.6rem)",
            },
            {
              transform: "translateX(-.35rem)",
            },
            {
              transform: "none",
            },
          ],
          {
            duration: 280,
          },
        ));
      let n = elementById("gs-cinfo").querySelector(".ci-r");
      n &&
        n.animate(
          [
            {
              color: "#ff6a4d",
            },
            {
              color: "#fff",
            },
          ],
          {
            duration: 700,
          },
        );
      return;
    }
    getBuild(e.w).camo !== t &&
      (saveBuild(e.w, {
        camo: t,
      }),
      this.cb.sound("equip"),
      this._gsRender(!1),
      this.studio && this.studio.sweep(),
      this._gsBake(),
      this._gsConfirm(CAMOS.find((n) => n.id === t).name + " APPLIED"));
    let s = elementById("gs-grid").querySelector(`.cm[data-id="${t}"]`);
    (s &&
      s.focus({
        preventScroll: !0,
      }),
      this._gsCamoInfo(t));
  }
  _gsEquip() {
    let t = this.gs;
    !PRIMARY_WEAPONS.includes(t.w) ||
      settings.primary === t.w ||
      ((settings.primary = t.w),
      saveSettings(),
      this.cb.onSetting("primary"),
      this.cb.sound("equip"),
      this._gsRender(!1),
      elementById("gs-equip").animate(
        [
          {
            transform: "scale(1.07)",
            filter: "brightness(2)",
          },
          {
            transform: "none",
            filter: "brightness(1)",
          },
        ],
        {
          duration: 300,
          easing: Ff,
        },
      ),
      this._gsConfirm(WEAPON_DEFINITIONS[t.w].name + " SET AS PRIMARY"));
  }
  _gsFlash(t) {
    let e = elementById("gs-fx"),
      s = e.firstChild,
      n =
        this._pt ||
        (this._pt = {
          x: 0,
          y: 0,
        });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        !this.studio ||
          !this.studio.project(t, n) ||
          ((e.style.transform = `translate(${n.x.toFixed(1)}px,${n.y.toFixed(1)}px)`),
          s.animate(
            [
              {
                opacity: 0,
                transform: "scale(.2)",
              },
              {
                opacity: 1,
                transform: "scale(.55)",
                offset: 0.25,
              },
              {
                opacity: 0,
                transform: "scale(1.5)",
              },
            ],
            {
              duration: 520,
              easing: "ease-out",
            },
          ));
      }),
    );
  }
  _gsConfirm(t) {
    let e = elementById("gs-conf");
    e.innerHTML = icon("check") + t;
    for (let s of e.getAnimations()) s.cancel();
    e.animate(
      [
        {
          opacity: 0,
          transform: "translateX(-50%) translateY(.8rem)",
        },
        {
          opacity: 1,
          transform: "translateX(-50%)",
          offset: 0.12,
        },
        {
          opacity: 1,
          transform: "translateX(-50%)",
          offset: 0.8,
        },
        {
          opacity: 0,
          transform: "translateX(-50%) translateY(-.5rem)",
        },
      ],
      {
        duration: 1700,
        easing: "ease-out",
      },
    );
  }
  _gsReset() {
    let t = elementById("gs-reset");
    if (!t.classList.contains("armed")) {
      (t.classList.add("armed"),
        (t.lastChild.textContent = "CONFIRM RESET"),
        this.cb.sound("click"),
        clearTimeout(this._rt),
        (this._rt = setTimeout(() => {
          (t.classList.remove("armed"),
            (t.lastChild.textContent = "RESET BUILD"));
        }, 2600)));
      return;
    }
    (t.classList.remove("armed"),
      (t.lastChild.textContent = "RESET BUILD"),
      saveBuild(this.gs.w, Vb(this.gs.w)),
      this.cb.sound("back"),
      this._gsRender(!1),
      this.studio && this.studio.flourish(),
      this._gsBake());
  }
  _gsBake() {
    (clearTimeout(this._bt),
      (this._bt = setTimeout(() => {
        this.studio && this.studio.icons(this.gs.w);
      }, 500)));
  }
  _gsRender(t) {
    let e = this.gs,
      s = e.w,
      n = getBuild(s),
      i = WEAPON_DEFINITIONS[s],
      a = this.g,
      r = WEAPON_ATTACHMENTS[s];
    for (let h of a.tabs) {
      let f = h.dataset.w;
      h.classList.toggle("on", f === s);
      let u = this.studio && this.studio.factory(f);
      u && !h.firstChild.src && (h.firstChild.src = u.line);
      let d = h.lastChild;
      (d.classList.toggle(
        "hidden",
        !(f === settings.primary || f === "pistol"),
      ),
        (d.textContent = f === "pistol" ? "SECONDARY" : "PRIMARY"));
    }
    ((elementById("gs-cls").textContent = i.cls),
      (elementById("gs-wname").textContent = i.name),
      (elementById("gs-wdesc").textContent = ys0[s]));
    for (let h of elementById("gs-mode").querySelectorAll("button"))
      h.classList.toggle("on", h.dataset.m === e.mode);
    (this._pill(elementById("gs-mode")),
      elementById("gs-att").classList.toggle("hidden", e.mode !== "att"),
      elementById("gs-camo").classList.toggle("hidden", e.mode !== "camo"),
      a.stage.classList.toggle("camo", e.mode === "camo"),
      (elementById("gs-lc").textContent =
        e.mode === "camo" ? "ATTACHMENTS" : "CAMOS"));
    for (let h of ATTACHMENT_SLOTS) {
      let f = a.slots[h],
        u = (r[h] || []).length > 0;
      (f.classList.toggle("hidden", !u),
        (a.lines[h].path.style.display = a.lines[h].dot.style.display =
          u ? "" : "none"),
        u &&
          (f.classList.toggle("on", e.mode === "att" && h === e.slot),
          f.classList.toggle("mod", n[h] !== r[h][0]),
          (f.querySelector(".sv").textContent = ATTACHMENTS[h][n[h]].name),
          a.lines[h].path.classList.toggle("on", h === e.slot),
          a.lines[h].dot.classList.toggle("on", h === e.slot)));
    }
    if (e.mode === "att") {
      let h = e.slot,
        f = r[h];
      if (
        ((elementById("gs-slh").innerHTML =
          `${icon(h)}<span>${ATTACHMENT_LABELS[h]}</span><i>${f.indexOf(n[h]) + 1} / ${f.length}</i>`),
        (elementById("gs-opts").innerHTML = f
          .map((u) => {
            let d = ATTACHMENTS[h][u],
              m = "";
            for (let p in d.mods) {
              let x = Ms0[p];
              if (!x) continue;
              let g = Math.round((d.mods[p] - 1) * 100);
              g &&
                (m += `<span class="${g > 0 === x[1] ? "up" : "dn"}">${g > 0 ? "+" : "\u2212"}${Math.abs(g)}% ${x[0]}</span>`);
            }
            return (
              d.suppressed &&
                (m += `<span class="up">${icon("suppressed")}SUPPRESSED</span>`),
              d.laser && (m += `<span class="up">${icon("laser")}LASER</span>`),
              m || (m = '<span class="nt">NO STAT CHANGE</span>'),
              `<button class="opt${n[h] === u ? " on" : ""}" data-nav data-id="${u}"><div class="on-n">${d.name}<span class="eqd">EQUIPPED</span></div><div class="od">${d.desc}</div><div class="dl">${m}</div></button>`
            );
          })
          .join("")),
        t)
      ) {
        let u =
          elementById("gs-opts").querySelector(".opt.on") ||
          elementById("gs-opts").firstChild;
        u &&
          u.focus({
            preventScroll: !0,
          });
      }
    } else {
      let h = elementById("gs-grid");
      h.textContent = "";
      let f = 0;
      for (let u of CAMOS) {
        let d = camoProgress(s, u.id),
          m = createElement(
            "button",
            "cm" + (d.done ? "" : " lock") + (n.camo === u.id ? " on" : ""),
          );
        (d.done && f++,
          (m.dataset.id = u.id),
          m.setAttribute("data-nav", ""),
          m.appendChild(r6(u.id, 96)),
          m.insertAdjacentHTML(
            "beforeend",
            d.done
              ? `<span class="ck">${icon("check")}</span>`
              : `<span class="lk">${icon("lock")}</span><span class="pc">${Math.round(d.t * 100)}%</span><span class="pb"><i style="width:${Math.round(d.t * 100)}%"></i></span>`,
          ),
          (m.style.animation = `popin .26s var(--back) ${(0.02 * h.children.length).toFixed(2)}s backwards`),
          h.appendChild(m));
      }
      if (
        ((elementById("gs-cc").textContent = `${f} / ${CAMOS.length} UNLOCKED`),
        this._gsCamoInfo(n.camo, !0),
        t)
      ) {
        let u = h.querySelector(".cm.on") || h.firstChild;
        u &&
          u.focus({
            preventScroll: !0,
          });
      }
    }
    let l = elementById("gs-equip"),
      c = PRIMARY_WEAPONS.includes(s);
    ((l.disabled = !c || settings.primary === s),
      (l.innerHTML = c
        ? settings.primary === s
          ? `${icon("check")}EQUIPPED AS PRIMARY`
          : "EQUIP AS PRIMARY"
        : "SIDEARM \u2014 ALWAYS CARRIED"),
      (elementById("gs-note").textContent =
        this.home === "pause" ? "CHANGES APPLY ON YOUR NEXT SPAWN" : ""),
      this._gsStats(),
      this.studio &&
        ((this.studio.fit = e.mode === "camo" ? 0.72 : 0.62),
        this.studio.select(s, n, e.mode === "camo" ? "turn" : "present"),
        this.studio.setMode(e.mode === "camo" ? "turn" : "present"),
        this.studio.focus(e.mode === "att" ? e.slot : null)));
  }
  _gsCamoInfo(t, e) {
    if (!e && this._ci === t + this.gs.w) return;
    this._ci = t + this.gs.w;
    let s = CAMOS.find((r) => r.id === t),
      n = this.gs.w,
      i = camoProgress(n, t),
      a = getBuild(n).camo === t;
    elementById("gs-cinfo").innerHTML =
      `<div class="ci-t">TIER ${s.tier} \xB7 ${bs0[s.tier]}</div><div class="ci-n">${s.name}</div><div class="ci-d">${s.desc}</div>
      <div class="ci-p"><div class="xpbar"><i style="transform:scaleX(${i.t.toFixed(3)});transition:none"></i></div><div class="ci-r"><span>${s.need ? i.text : "AVAILABLE FROM THE START"}</span><b class="${i.done ? "ok" : "no"}">${a ? "EQUIPPED" : i.done ? "UNLOCKED \u2014 ENTER TO EQUIP" : "LOCKED"}</b></div></div>`;
  }
  _gsStats() {
    let t = this.gs,
      e = t.w,
      s = getBuild(e),
      n = weaponStats(e),
      i = resolveWeaponDefinition(e),
      a =
        t.hover && t.mode === "att" && t.hover !== s[t.slot]
          ? {
              ...s,
              [t.slot]: t.hover,
            }
          : null,
      r = a ? weaponStats(e, a) : n,
      l = a ? resolveWeaponDefinition(e, a) : i;
    for (let p of elementById("gs-stats").children) {
      let x = p.dataset.k,
        g = n[x],
        b = r[x],
        v = Math.min(g, b),
        y = Math.max(g, b);
      p.querySelector(".cur").style.transform = `scaleX(${v / 100})`;
      let M = p.querySelector(".dlt");
      ((M.className = "dlt" + (b > g ? " up" : b < g ? " dn" : "")),
        (M.style.left = v + "%"),
        (M.style.width = y - v + "%"),
        (p.querySelector(".sl b").innerHTML =
          b +
          (b !== g
            ? `<i class="${b > g ? "up" : "dn"}">${b > g ? "+" : "\u2212"}${Math.abs(b - g)}</i>`
            : "")));
    }
    let c = (p, x, g, b, v = (y) => y) =>
      `<div><b class="${x === g ? "" : g > x !== b ? "up" : "dn"}">${v(g)}</b><span>${p}</span></div>`;
    elementById("gs-nums").innerHTML =
      c("MAG", i.mag, l.mag, !1) +
      c(
        "ADS",
        Math.round(i.adsTime * 1e3),
        Math.round(l.adsTime * 1e3),
        !0,
        (p) => p + "<small>MS</small>",
      ) +
      c(
        "RANGE",
        Math.round(i.range[1]),
        Math.round(l.range[1]),
        !1,
        (p) => p + "<small>M</small>",
      ) +
      c(
        "SPRINT",
        Math.round(i.sprintOut * 1e3),
        Math.round(l.sprintOut * 1e3),
        !0,
        (p) => p + "<small>MS</small>",
      );
    let h = profile.weapons[e],
      f = CAMOS.filter((p) => o2(e, p.id)).length,
      u = CAMOS.find((p) => !o2(e, p.id)),
      d = u ? camoProgress(e, u.id) : null;
    elementById("gs-mast").innerHTML =
      `<div class="sech"><span>WEAPON MASTERY</span><span>${f} / ${CAMOS.length} CAMOS</span></div><div class="xpbar"><i style="transition:none;transform:scaleX(${d ? d.t.toFixed(3) : 1})"></i></div><div class="gm"><span>${lr(h.kills)} ELIMS \xB7 ${lr(h.headshots)} HEADSHOTS</span><span>${u ? "NEXT \xB7 " + u.name : "ALL CAMOS UNLOCKED"}</span></div>`;
    let m = (p, x, g) =>
      p ? `<span class="tag hot">${icon(x)}${g}</span>` : "";
    elementById("gs-tags").innerHTML =
      `<span class="tag">${icon(i.pump ? "pump" : i.auto ? "auto" : "semi")}${i.pump ? "PUMP" : i.auto ? "AUTO" : "SEMI"}</span><span class="tag">${i.rpm} RPM</span>` +
      m(l.suppressed, "suppressed", "SUPPRESSED") +
      m(l.laser, "laser", "LASER");
  }
  _gsLines() {
    let t = this.g,
      e = this.gs,
      s = this.studio;
    if (!s || e.mode !== "att") return;
    if (!e.lay) {
      e.lay = {};
      for (let i of ATTACHMENT_SLOTS) {
        let a = t.slots[i];
        e.lay[i] = {
          x: a.offsetLeft + a.offsetWidth / 2,
          top: a.offsetTop,
          bot: a.offsetTop + a.offsetHeight,
          h: t.stage.clientHeight,
        };
      }
      e.rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    let n =
      this._pt ||
      (this._pt = {
        x: 0,
        y: 0,
      });
    for (let i of ATTACHMENT_SLOTS) {
      let a = t.lines[i],
        r = e.lay[i];
      if (a.path.style.display === "none" || !s.project(i, n)) continue;
      let l = r.bot < r.h * 0.5,
        c = l ? r.bot : r.top,
        h = c + (l ? 1 : -1) * e.rem * 1.6;
      (a.path.setAttribute(
        "d",
        `M${r.x.toFixed(1)} ${c.toFixed(1)}V${h.toFixed(1)}L${n.x.toFixed(1)} ${n.y.toFixed(1)}`,
      ),
        a.dot.setAttribute("cx", n.x.toFixed(1)),
        a.dot.setAttribute("cy", n.y.toFixed(1)));
    }
  }
  _end() {
    this._page("end", "").addEventListener("click", (e) => {
      let s = e.target.closest("[data-act]");
      s && this._act(s.dataset.act);
    });
  }
  buildEnd(t, e, s, n) {
    let i = this.pages.end,
      a = e.player,
      r = e.scores[0],
      l = e.scores[1],
      c = t === 0 ? "VICTORY" : t === 1 ? "DEFEAT" : "DRAW",
      h =
        a.stats && a.stats.shots
          ? Math.min(100, Math.round((a.stats.hits / a.stats.shots) * 100))
          : 0,
      f = n.medals["K9 TAKEDOWN"] || 0,
      u = n.medals["K9 DESTROYED"] || 0,
      d =
        (f
          ? `<div class="k9c"><b>${icon("k9")}<em data-roll="${f}">0</em></b><span>K9 TAKEDOWNS</span></div>`
          : "") +
        (u
          ? `<div class="k9c"><b>${icon("k9")}<em data-roll="${u}">0</em></b><span>ENEMY K9 DESTROYED</span></div>`
          : ""),
      m = e.actors
        .filter((y) => !y.isK9)
        .sort((y, M) => M.score - y.score || M.kills - y.kills)[0],
      p = n.medals.HEADSHOT || 0,
      x = Object.keys(n.medals).sort(
        (y, M) => dv(M) - dv(y) || n.medals[M] - n.medals[y],
      ),
      g = s || {
        gained: 0,
        before: rankProgress(),
        after: rankProgress(),
      },
      b = Math.max(0, g.gained - a.score),
      v = "";
    for (let y of [settings.primary, "pistol"]) {
      let M = n.base && n.base[y] ? n.base[y].kills : 0,
        w = profile.weapons[y].kills,
        T = n.unlocked.filter((E) => E.w === y),
        S = CAMOS.find((E) => !o2(y, E.id));
      for (let E of T)
        v += `<div class="e-camo new"><span data-camo="${E.camo.id}"></span><div><div class="cn"><b>${WEAPON_DEFINITIONS[y].name} \xB7 ${E.camo.name}</b><i>UNLOCKED</i></div><div class="xpbar"><i data-to="1"></i></div><div class="cr">CHALLENGE COMPLETE</div></div></div>`;
      if (S) {
        let E = camoProgress(y, S.id);
        v += `<div class="e-camo"><span data-camo="${S.id}"></span><div><div class="cn"><b>${WEAPON_DEFINITIONS[y].name} \xB7 ${S.name}</b><i>${w > M ? "+" + (w - M) : ""}</i></div><div class="xpbar"><i data-to="${E.t.toFixed(3)}"></i></div><div class="cr">${E.text}</div></div></div>`;
      }
    }
    i.innerHTML = `<div class="e-k">TEAM DEATHMATCH \u2014 SOLSTICE HOTEL</div><div class="e-t ${t === 0 ? "win" : "lose"}">${c}</div><div class="e-rule"></div>
      <div class="e-s">${Hh(0)}<span class="t0">${TEAM_NAMES[0]}</span><b data-roll="${r}">0</b><i>\u2014</i><b data-roll="${l}">0</b><span class="t1">${TEAM_NAMES[1]}</span>${Hh(1)}</div>
      <div class="e-cols">
        <div class="e-col"><div class="sech"><span>PROGRESSION</span><span id="e-rk"></span></div>
          <div class="e-rank"><span id="e-emb">${z7(g.before.rank)}</span><div class="pc-id" style="flex:1"><div class="pc-lvl"><b id="e-lv">${g.before.rank}</b><span id="e-tt">${g.before.title}</span><em class="e-up" id="e-up">RANK UP</em></div><div class="xpbar"><i id="e-bar" style="transition:none;transform:scaleX(${g.before.t})"></i></div><div class="e-xpl"><span id="e-into"></span><span id="e-next"></span></div></div></div>
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin:1.6rem 0 .2rem"><div class="e-xp"><span>+</span><span data-roll="${g.gained}" data-fmt="1">0</span><small>XP</small></div><div class="e-xpl" style="flex-direction:column;align-items:flex-end;gap:.2rem;margin:0"><span>MATCH SCORE &nbsp; +${lr(a.score)}</span><span>${t === 0 ? "VICTORY" : "COMPLETION"} BONUS &nbsp; +${lr(b)}</span></div></div>
          <div class="sech" style="margin:1.6rem 0 0"><span>CAMO PROGRESS</span></div>${v}
          <div class="pc-stats e-career"><div><b>${lr(profile.matches)}</b><span>MATCHES</span></div><div><b>${lr(profile.wins)}</b><span>WINS</span></div><div><b>${lr(profile.kills)}</b><span>ELIMS</span></div><div><b>${lr(profile.xp)}</b><span>TOTAL XP</span></div></div></div>
        <div class="e-col"><div class="sech"><span>YOUR PERFORMANCE</span><span>${TEAM_NAMES[0]}</span></div>
          <div class="e-stats"><div class="hl"><b data-roll="${a.score}" data-fmt="1">0</b><span>SCORE</span></div><div><b data-roll="${a.kills}">0</b><span>ELIMS</span></div><div><b data-roll="${a.deaths}">0</b><span>DEATHS</span></div><div><b>${(a.deaths ? a.kills / a.deaths : a.kills).toFixed(2)}</b><span>K/D RATIO</span></div>
            <div><b><em data-roll="${h}">0</em>%</b><span>ACCURACY</span></div><div><b data-roll="${p}">0</b><span>HEADSHOTS</span></div><div><b data-roll="${n.streak}">0</b><span>BEST STREAK</span></div><div><b>${a.stats ? lr(a.stats.shots) : "\u2014"}</b><span>SHOTS FIRED</span></div>${d}</div>
          <div class="sech" style="margin:2rem 0 .6rem"><span>MEDALS</span><span>${x.reduce((y, M) => y + n.medals[M], 0)}</span></div>
          <div class="e-medals">${x.length ? x.map((y) => `<div class="em" title="${y}">${P7(y)}<b>\xD7${n.medals[y]}</b></div>`).join("") : '<span class="none">NO MEDALS THIS MATCH</span>'}</div>
          <div class="e-mvp">${icon("star")}<div><span>MATCH MVP</span><b class="t${m.team}">${m.isPlayer ? "You" : escapeHTML(m.name)}</b></div>${Hh(m.team)}<i>${m.kills} K &nbsp; ${m.deaths} D &nbsp; ${lr(m.score)}</i></div></div>
        <div class="e-col"><div class="sech"><span>SCOREBOARD</span><span>FIRST TO ${e.scoreLimit}</span></div><div id="e-board"></div></div>
      </div>
      <div class="e-btns"><button class="btn" data-nav data-act="again">PLAY AGAIN</button><button class="btn ghost" data-nav data-act="tomenu">MAIN MENU</button></div>${this._legend(
        [
          [["\u2190", "\u2192"], "CHOOSE"],
          [["ENTER"], "SELECT"],
        ],
      )}`;
    for (let y of i.querySelectorAll("[data-camo]"))
      y.replaceWith(r6(y.dataset.camo, 64));
    (this.hud.board(e, elementById("e-board"), !0),
      (this.endAward = g),
      (this.endT = -1));
  }
  _endStart() {
    let t = this.pages.end,
      e = (r) => t.querySelector(r),
      s = (r, l, c = "1.2rem", h = 420) =>
        r.animate(
          [
            {
              opacity: 0,
              transform: `translateY(${c})`,
            },
            {
              opacity: 1,
              transform: "none",
            },
          ],
          {
            duration: h,
            delay: l,
            easing: Ff,
            fill: "forwards",
          },
        );
    if (!e(".e-t")) return;
    (s(e(".e-k"), 80, "0"),
      e(".e-t").animate(
        [
          {
            opacity: 0,
            letterSpacing: ".6em",
            transform: "scale(1.25)",
            filter: "blur(.8rem) brightness(2.5)",
          },
          {
            opacity: 1,
            letterSpacing: ".1em",
            transform: "scale(1)",
            filter: "blur(0) brightness(1)",
          },
        ],
        {
          duration: 780,
          delay: 120,
          easing: Ff,
          fill: "forwards",
        },
      ),
      e(".e-rule").animate(
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
          delay: 500,
          easing: Ff,
          fill: "forwards",
        },
      ),
      s(e(".e-s"), 760),
      t
        .querySelectorAll(".e-col")
        .forEach((r, l) => s(r, 1150 + l * 140, "2rem")),
      s(e(".e-btns"), 1900, "1rem"));
    let n = e(".legend");
    (n &&
      n.animate(
        [
          {
            opacity: 0,
          },
          {
            opacity: 0.75,
          },
        ],
        {
          duration: 400,
          delay: 2100,
          easing: "ease-out",
          fill: "backwards",
        },
      ),
      (this.rolls.length = 0));
    let i = performance.now();
    for (let r of t.querySelectorAll("[data-roll]")) {
      let l = r.closest(".e-col");
      this.rolls.push({
        el: r,
        to: Number(r.dataset.roll),
        t0: i + (l ? 1500 : 900),
        dur: r.closest(".e-xp") ? 1500 : 800,
        f: !!r.dataset.fmt,
      });
    }
    let a = 1 / (this.slow || 1);
    (t.querySelectorAll(".e-camo").forEach((r, l) => {
      let c = r.querySelector(".xpbar i");
      ((c.style.transform = "scaleX(0)"),
        setTimeout(
          () => {
            ((c.style.transform = `scaleX(${c.dataset.to})`),
              r.classList.contains("new") &&
                this.page === "end" &&
                (this.cb.sound("unlock"),
                r.animate(
                  [
                    {
                      background: "rgba(127,224,143,.5)",
                      transform: "scale(1.04)",
                    },
                    {
                      background: "rgba(127,224,143,0)",
                      transform: "scale(1)",
                    },
                  ],
                  {
                    duration: 700,
                    easing: Ff,
                  },
                )));
          },
          (2100 + l * 380) * a,
        ));
    }),
      (this.endT = 0),
      (this.endPhase = 0),
      this._endRank(this.endAward.before));
  }
  _endRank(t) {
    ((elementById("e-into").textContent = `${lr(t.into)} / ${lr(t.span)} XP`),
      (elementById("e-next").textContent =
        t.t >= 1 ? "MAX RANK" : "RANK " + (t.rank + 1)));
  }
  _endFrame(t) {
    if (this.endT < 0) return;
    let e = this.endAward,
      s = elementById("e-bar");
    if (!s) return;
    this.endT += t;
    let n = this.endT - 1.7;
    if (n < 0) return;
    let i = e.after.rank - e.before.rank,
      a = (r) => 1 - Math.pow(1 - Math.min(1, Math.max(0, r)), 3);
    if (i <= 0) {
      ((s.style.transform = `scaleX(${e.before.t + (e.after.t - e.before.t) * a(n / 1.4)})`),
        n > 1.4 &&
          this.endPhase === 0 &&
          ((this.endPhase = 9), this._endRank(e.after), (this.endT = -1)));
      return;
    }
    this.endPhase === 0
      ? ((s.style.transform = `scaleX(${e.before.t + (1 - e.before.t) * a(n / 0.9)})`),
        n >= 0.9 &&
          ((this.endPhase = 1),
          this.cb.sound("rankup"),
          (elementById("e-emb").innerHTML = z7(e.after.rank)),
          (elementById("e-lv").textContent = e.after.rank),
          (elementById("e-tt").textContent = e.after.title),
          elementById("e-emb").firstChild.animate(
            [
              {
                transform: "scale(1.9)",
                filter: "brightness(3)",
              },
              {
                transform: "scale(.94)",
                filter: "brightness(1.5)",
                offset: 0.6,
              },
              {
                transform: "scale(1)",
                filter: "brightness(1)",
              },
            ],
            {
              duration: 520,
              easing: Ff,
            },
          ),
          (elementById("e-up").textContent =
            i > 1 ? `RANK UP \xD7${i}` : "RANK UP"),
          elementById("e-up").animate(
            [
              {
                opacity: 0,
                transform: "translateX(-1rem)",
              },
              {
                opacity: 1,
                transform: "none",
              },
            ],
            {
              duration: 300,
              easing: Ff,
              fill: "forwards",
            },
          ),
          this._endRank(e.after)))
      : this.endPhase === 1 &&
        ((s.style.transform = `scaleX(${e.after.t * a((n - 1) / 1.1)})`),
        n > 2.2 && ((this.endPhase = 9), (this.endT = -1)));
  }
  attach(t) {
    ((this.studio = t), t && t.mount(this.g.view), this._refreshMain());
  }
  show(t) {
    let e =
      t === "menu"
        ? "main"
        : t === "pause"
          ? "pause"
          : t === "end"
            ? "end"
            : null;
    if (!e) {
      this._hide();
      return;
    }
    (e === "main" || e === "pause") && (this.home = e);
    let s = this.root.classList.contains("hidden");
    (this.root.classList.remove("hidden"),
      (this.shownAt = performance.now()),
      s &&
        elementById("ui-scrim").animate(
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          {
            duration: e === "pause" ? 280 : 420,
            easing: "ease-out",
          },
        ),
      this.go(e, !0),
      this.raf ||
        ((this.last = performance.now()),
        (this.raf = requestAnimationFrame((n) => this._frame(n)))));
  }
  _hide() {
    if (!this.root.classList.contains("hidden")) {
      this.root.classList.add("hidden");
      for (let t in this.pages) this.pages[t].classList.remove("on");
      ((this.page = null),
        this.raf && (cancelAnimationFrame(this.raf), (this.raf = 0)),
        document.activeElement &&
          document.activeElement.blur &&
          document.activeElement.blur());
    }
  }
  go(t, e) {
    if (this.page === t && !e) return;
    let s = this.page;
    this.page = t;
    for (let n in this.pages) this.pages[n].classList.toggle("on", n === t);
    if (s && s !== t) {
      let n = l6[t] >= l6[s] && l6[t] !== l6[s] ? 1 : l6[t] < l6[s] ? -1 : 0;
      (this.pages[t].animate(
        [
          {
            opacity: 0,
            transform: `translateX(${n * 3}rem)`,
          },
          {
            opacity: 1,
            transform: "none",
          },
        ],
        {
          duration: 260,
          easing: Ff,
        },
      ),
        this.pages[s].animate(
          [
            {
              opacity: 1,
              visibility: "visible",
              transform: "none",
            },
            {
              opacity: 0,
              visibility: "visible",
              transform: `translateX(${-n * 3}rem)`,
            },
          ],
          {
            duration: 190,
            easing: "ease-in",
          },
        ),
        n && this.cb.sound("whoosh"));
    }
    if (
      ((this.root.dataset.bg =
        t === "main" ? "menu" : t === "gunsmith" ? "dark" : "dim"),
      t === "main"
        ? this._refreshMain()
        : t === "pause"
          ? this._refreshPause()
          : t === "settings"
            ? (this._syncRows(), this._tab(this.tab))
            : t === "gunsmith"
              ? ((this.gs.mode = "att"),
                (this.gs.lay = null),
                this._gsRender(!0))
              : t === "end" && this._endStart(),
      t === "main" || t === "pause" || t === "end")
    ) {
      let n = this.pages[t].querySelector("[data-nav]");
      n &&
        n.focus({
          preventScroll: !0,
        });
    }
  }
  back() {
    if (this.page === "gunsmith" && this.gs.mode === "camo")
      return (this.cb.sound("back"), this._gsMode("att"));
    if (this.page === "gunsmith" || this.page === "settings") {
      this.cb.sound("back");
      let t = this.page;
      this.go(this.home);
      let e = this.pages[this.home].querySelector(`[data-act="${t}"]`);
      e &&
        e.focus({
          preventScroll: !0,
        });
    } else this.page === "pause" && this.cb.onResume();
  }
  _frame(t) {
    this.raf = requestAnimationFrame((s) => this._frame(s));
    let e = Math.min(0.05, (t - this.last) / 1e3) * (this.slow || 1);
    if (((this.last = t), this.page === "gunsmith" && this.studio))
      this.studio.frame(e) && this._gsLines();
    else if (this.page === "end") {
      this._endFrame(e);
      for (let s = this.rolls.length - 1; s >= 0; s--) {
        let n = this.rolls[s];
        if (t < n.t0) continue;
        let i = Math.min(1, (t - n.t0) / n.dur),
          a = Math.round(n.to * (1 - Math.pow(1 - i, 3)));
        ((n.el.textContent = n.f ? lr(a) : a),
          i >= 1 && this.rolls.splice(s, 1));
      }
    }
  }
  _items() {
    let t = this.pages[this.page];
    return t
      ? [...t.querySelectorAll("[data-nav]")].filter(
          (e) => e.offsetParent !== null,
        )
      : [];
  }
  _key(t) {
    if (
      !this.page ||
      this.root.classList.contains("hidden") ||
      t.ctrlKey ||
      t.altKey ||
      t.metaKey
    )
      return;
    let e = t.code,
      s = this.page;
    if (e === "KeyP" && s === "pause") {
      t.preventDefault();
      if (!t.repeat) this.back();
      return;
    }
    if (e === "Escape") {
      if (performance.now() - this.shownAt < 350) return;
      (t.preventDefault(), this.back());
      return;
    }
    if (e === "Tab") return;
    let n = this._items(),
      i = n.indexOf(document.activeElement),
      a = (f) => {
        if (!n.length) return;
        (n[
          i < 0 ? (f > 0 ? 0 : n.length - 1) : (i + f + n.length) % n.length
        ].focus({
          preventScroll: !0,
        }),
          this.cb.sound("hover"));
      },
      r = e === "ArrowUp" || e === "KeyW",
      l = e === "ArrowDown" || e === "KeyS",
      c = e === "ArrowLeft" || e === "KeyA",
      h = e === "ArrowRight" || e === "KeyD";
    if (s === "gunsmith") {
      let f = this.gs;
      if (e === "KeyQ" || e === "KeyE") {
        let u = WEAPON_IDS.indexOf(f.w);
        return (
          this.cb.sound("tab"),
          this._gsWeapon(
            WEAPON_IDS[
              (u + (e === "KeyE" ? 1 : WEAPON_IDS.length - 1)) %
                WEAPON_IDS.length
            ],
          ),
          t.preventDefault()
        );
      }
      if (e === "KeyC")
        return (
          this.cb.sound("tab"),
          this._gsMode(f.mode === "att" ? "camo" : "att"),
          t.preventDefault()
        );
      if (e === "KeyR") return (this._gsReset(), t.preventDefault());
      if (e === "KeyF") return (this._gsEquip(), t.preventDefault());
      if (/^Digit[1-5]$/.test(e))
        return (
          this.cb.sound("slot"),
          this._gsSlot(ATTACHMENT_SLOTS[Number(e[5]) - 1], !0),
          t.preventDefault()
        );
      if (f.mode === "camo") {
        if (r || l || c || h) {
          t.preventDefault();
          let u = n.length,
            d = i < 0 ? 0 : i,
            m = r ? d - 5 : l ? d + 5 : c ? d - 1 : d + 1;
          m >= 0 &&
            m < u &&
            (n[m].focus({
              preventScroll: !0,
            }),
            this.cb.sound("hover"));
          return;
        }
      } else if (c || h) {
        t.preventDefault();
        let u = ATTACHMENT_SLOTS.filter(
            (m) => (WEAPON_ATTACHMENTS[f.w][m] || []).length,
          ),
          d = u.indexOf(f.slot);
        (this.cb.sound("slot"),
          this._gsSlot(u[(d + (h ? 1 : u.length - 1)) % u.length], !0));
        return;
      }
    }
    if (s === "settings" && (e === "KeyQ" || e === "KeyE")) {
      let f = mv.indexOf(this.tab);
      return (
        this.cb.sound("tab"),
        this._tab(mv[(f + (e === "KeyE" ? 1 : mv.length - 1)) % mv.length]),
        t.preventDefault()
      );
    }
    if (r) (t.preventDefault(), a(-1));
    else if (l) (t.preventDefault(), a(1));
    else if (c || h) {
      let f = document.activeElement,
        u = h ? 1 : -1;
      f && f.matches(".row")
        ? (t.preventDefault(), this._rowStep(f, u))
        : f && f.dataset.act === "difficulty"
          ? (t.preventDefault(), this._act("difficulty", u))
          : s === "end" && (t.preventDefault(), a(u));
    } else if (
      (e === "Enter" || e === "NumpadEnter" || e === "Space") &&
      document.activeElement &&
      document.activeElement.matches(".row")
    ) {
      t.preventDefault();
      let f = document.activeElement,
        u = this._rowDef(f);
      if (u.type === "seg") {
        let d = u.opts.findIndex((m) => m[0] === this._get(u));
        (this._set(f, u.opts[(d + 1) % u.opts.length][0]),
          this.cb.sound("click"));
      }
    }
  }
};

export { MenuController };

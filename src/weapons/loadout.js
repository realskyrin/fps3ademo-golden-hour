// weapons/loadout.js: recovered from the verified GOLDEN HOUR release.
import { WEAPON_DEFINITIONS } from "./definitions.js";

var ATTACHMENT_SLOTS = ["optic", "muzzle", "underbarrel", "magazine", "stock"];
var ATTACHMENT_LABELS = {
  optic: "OPTIC",
  muzzle: "MUZZLE",
  underbarrel: "UNDERBARREL",
  magazine: "MAGAZINE",
  stock: "STOCK",
};
var ATTACHMENTS = {
  optic: {
    irons: {
      name: "IRON SIGHTS",
      desc: "Nothing between you and the target. Fastest to the eye.",
      mods: {
        adsTime: 0.93,
      },
    },
    reflex: {
      name: "KITE REFLEX",
      desc: "Open red dot. Precise and quick.",
      mods: {},
    },
    holo: {
      name: "HALO HOLOGRAPHIC",
      desc: "Wide window with a ring-and-dot reticle.",
      mods: {
        adsTime: 1.04,
        zoom: 1.05,
      },
    },
    prism: {
      name: "VANTAGE 2.5\xD7",
      desc: "Magnified prism sight for the long lanes.",
      mods: {
        adsTime: 1.15,
        zoom: 1.7,
        adsMove: 0.9,
      },
    },
  },
  muzzle: {
    none: {
      name: "FACTORY MUZZLE",
      desc: "Standard flash hider.",
      mods: {},
    },
    suppressor: {
      name: "MONOLITH SUPPRESSOR",
      desc: "Quiet report and a hidden flash. Enemies hear you late.",
      mods: {
        range: 0.92,
        adsTime: 1.05,
        flash: 0.22,
      },
      suppressed: !0,
    },
    comp: {
      name: "PORTED COMPENSATOR",
      desc: "Vents gas upward to hold the muzzle down.",
      mods: {
        recoilV: 0.8,
      },
    },
    brake: {
      name: "SLOTTED BRAKE",
      desc: "Kills side-to-side drift.",
      mods: {
        recoilH: 0.7,
      },
    },
    choke: {
      name: "FULL CHOKE",
      desc: "Tighter pattern, longer reach.",
      mods: {
        hip: 0.72,
        range: 1.18,
      },
    },
  },
  underbarrel: {
    none: {
      name: "NO UNDERBARREL",
      desc: "Bare handguard.",
      mods: {},
    },
    vgrip: {
      name: "VERTICAL FOREGRIP",
      desc: "A firm hold that steadies sustained fire.",
      mods: {
        recoilV: 0.9,
        recoilH: 0.84,
        mobility: 0.985,
      },
    },
    angled: {
      name: "ANGLED FOREGRIP",
      desc: "Snappier to the shoulder and out of a sprint.",
      mods: {
        adsTime: 0.91,
        sprintOut: 0.88,
      },
    },
    laser: {
      name: "TAC LASER",
      desc: "Visible beam. Tightens hip fire.",
      mods: {
        hip: 0.74,
        sprintOut: 0.94,
      },
      laser: !0,
    },
  },
  magazine: {
    std: {
      name: "STANDARD MAG",
      desc: "Factory capacity.",
      mods: {},
    },
    ext: {
      name: "EXTENDED MAG",
      desc: "Half again as many rounds; a little slower to handle.",
      mods: {
        mag: 1.5,
        reload: 1.1,
        adsTime: 1.04,
        mobility: 0.99,
      },
    },
    fast: {
      name: "SPEED MAG",
      desc: "Flared well and a pull tab for faster changes.",
      mods: {
        reload: 0.8,
      },
    },
  },
  stock: {
    std: {
      name: "FACTORY STOCK",
      desc: "Balanced.",
      mods: {},
    },
    light: {
      name: "SKELETON STOCK",
      desc: "Light and fast; kicks harder.",
      mods: {
        mobility: 1.03,
        adsMove: 1.12,
        sprintOut: 0.88,
        recoilV: 1.08,
      },
    },
    heavy: {
      name: "PADDED STOCK",
      desc: "Soaks up recoil at the cost of speed.",
      mods: {
        recoilV: 0.87,
        recoilH: 0.9,
        adsTime: 1.06,
      },
    },
  },
};
var WEAPON_ATTACHMENTS = {
  ar: {
    optic: ["reflex", "irons", "holo", "prism"],
    muzzle: ["none", "suppressor", "comp", "brake"],
    underbarrel: ["none", "vgrip", "angled", "laser"],
    magazine: ["std", "ext", "fast"],
    stock: ["std", "light", "heavy"],
  },
  smg: {
    optic: ["irons", "reflex", "holo"],
    muzzle: ["none", "suppressor", "comp"],
    underbarrel: ["none", "vgrip", "laser"],
    magazine: ["std", "ext", "fast"],
    stock: ["std", "light"],
  },
  shotgun: {
    optic: ["irons", "reflex"],
    muzzle: ["none", "choke", "brake"],
    underbarrel: ["none", "laser"],
    magazine: ["std", "ext"],
    stock: ["std", "heavy"],
  },
  pistol: {
    optic: ["irons", "reflex"],
    muzzle: ["none", "suppressor", "comp"],
    underbarrel: ["none", "laser"],
    magazine: ["std", "ext"],
    stock: [],
  },
};
var CAMOS = [
  {
    id: "factory",
    name: "FACTORY",
    tier: 0,
    need: null,
    desc: "As issued.",
  },
  {
    id: "dune",
    name: "DUNE",
    tier: 1,
    need: {
      kills: 5,
    },
    desc: "Flat dark earth with worn edges.",
  },
  {
    id: "timberline",
    name: "TIMBERLINE",
    tier: 1,
    need: {
      kills: 15,
    },
    desc: "Hand-sprayed woodland through netting.",
  },
  {
    id: "fracture",
    name: "FRACTURE",
    tier: 1,
    need: {
      kills: 30,
    },
    desc: "Urban shards in three greys.",
  },
  {
    id: "tigerstripe",
    name: "TIGERSTRIPE",
    tier: 2,
    need: {
      headshots: 5,
    },
    desc: "Black brushstrokes over olive and tan.",
  },
  {
    id: "topo",
    name: "EMBER TOPO",
    tier: 2,
    need: {
      headshots: 15,
    },
    desc: "Burnt-orange contour lines on matte black.",
  },
  {
    id: "carbon",
    name: "CARBON WEAVE",
    tier: 2,
    need: {
      kills: 60,
    },
    desc: "Twill-weave carbon under clear coat.",
  },
  {
    id: "damascus",
    name: "DAMASCUS",
    tier: 3,
    need: {
      kills: 100,
    },
    desc: "Folded-steel waves, acid etched.",
  },
  {
    id: "gold",
    name: "SOLSTICE GOLD",
    tier: 3,
    need: {
      kills: 150,
      headshots: 30,
    },
    desc: "Polished gold with engraved scrollwork.",
  },
  {
    id: "obsidian",
    name: "MOLTEN OBSIDIAN",
    tier: 4,
    need: {
      allGold: !0,
    },
    desc: "Black glass with a slow ember glow in the cracks.",
  },
];
var WEAPON_IDS = ["ar", "smg", "shotgun", "pistol"];
var PRIMARY_WEAPONS = ["ar", "smg", "shotgun"];
var mI = "golden-hour-builds-v1";
var gI = "golden-hour-profile-v1";
function xI(o, t) {
  try {
    return JSON.parse(localStorage.getItem(o)) || t;
  } catch {
    return t;
  }
}
function bI(o, t) {
  try {
    localStorage.setItem(o, JSON.stringify(t));
  } catch {}
}
function Vb(o) {
  let t = {
    camo: "factory",
  };
  for (let e of ATTACHMENT_SLOTS) {
    let s = WEAPON_ATTACHMENTS[o][e];
    s && s.length && (t[e] = s[0]);
  }
  return t;
}
var oR = xI(mI, {});
var cZ = new Set();
function getBuild(o) {
  let t = {
    ...Vb(o),
    ...(oR[o] || {}),
  };
  for (let e of ATTACHMENT_SLOTS) {
    let s = WEAPON_ATTACHMENTS[o][e] || [];
    s.length ? s.includes(t[e]) || (t[e] = s[0]) : delete t[e];
  }
  return (
    (!CAMOS.some((e) => e.id === t.camo) || !o2(o, t.camo)) &&
      (t.camo = "factory"),
    t
  );
}
function saveBuild(o, t) {
  ((oR[o] = {
    ...getBuild(o),
    ...t,
  }),
    bI(mI, oR),
    Vw.delete(o));
  for (let e of cZ) e(o, getBuild(o));
  return getBuild(o);
}
function e5(o, t = getBuild(o)) {
  return (
    o + "|" + ATTACHMENT_SLOTS.map((e) => t[e] || "-").join(".") + "|" + t.camo
  );
}
var Vw = new Map();
function resolveWeaponDefinition(o, t = null) {
  let e = t ? null : o;
  if (e && Vw.has(e)) return Vw.get(e);
  let s = t || getBuild(o),
    n = WEAPON_DEFINITIONS[o],
    i = {
      recoilV: 1,
      recoilH: 1,
      adsTime: 1,
      sprintOut: 1,
      mobility: 1,
      adsMove: 1,
      range: 1,
      zoom: 1,
      hip: 1,
      reload: 1,
      mag: 1,
      flash: 1,
    },
    a = !1,
    r = !1;
  for (let h of ATTACHMENT_SLOTS) {
    let f = s[h] && ATTACHMENTS[h][s[h]];
    if (f) {
      for (let u in f.mods) i[u] *= f.mods[u];
      (f.suppressed && (a = !0), f.laser && (r = !0));
    }
  }
  let l = n.pump ? n.mag + (i.mag > 1 ? 2 : 0) : Math.round(n.mag * i.mag),
    c = {
      ...n,
      build: s,
      suppressed: a,
      laser: r,
      recoil: {
        ...n.recoil,
        v: n.recoil.v * i.recoilV,
        h: n.recoil.h * i.recoilH,
      },
      adsTime: n.adsTime * i.adsTime,
      sprintOut: n.sprintOut * i.sprintOut,
      mobility: n.mobility * i.mobility,
      adsMove: n.adsMove * i.adsMove,
      range: [n.range[0] * i.range, n.range[1] * i.range],
      zoom:
        1 + (n.zoom - 1) * i.zoom + (i.zoom > 1.3 ? (i.zoom - 1) * 0.55 : 0),
      hip: [n.hip[0] * i.hip, n.hip[1] * i.hip],
      ads: n.pump ? n.ads * i.hip : n.ads,
      mag: l,
      reserve: n.pump ? n.reserve : l * 5,
      reloadRate: 1 / i.reload,
      flash: n.flash * i.flash,
    };
  return (e && Vw.set(e, c), c);
}
function weaponStats(o, t = null) {
  let e = resolveWeaponDefinition(o, t),
    s = (i) => Math.max(4, Math.min(100, Math.round(i))),
    n = (e.dmg[0] * e.pellets * e.rpm) / 60;
  return {
    damage: s(e.pellets > 1 ? 92 : e.dmg[0] * 1.9),
    range: s(e.range[1] * 1.75),
    fireRate: s(e.rpm / 10),
    accuracy: s(100 - e.hip[0] * 16 - (e.pellets > 1 ? 30 : 0)),
    control: s(
      e.pellets > 1
        ? 100 - e.recoil.v * 11 - e.recoil.h * 8
        : 100 -
            (e.recoil.v + 0.6 * e.recoil.h) *
              30 *
              Math.max(0.5, Math.min(1.1, e.rpm / 700)),
    ),
    mobility: s(e.mobility * 78 - 14 + (1 / e.sprintOut) * 2),
    handling: s(100 - e.adsTime * 190),
    dps: Math.round(n),
  };
}
var profile = xI(gI, null) || {
  xp: 0,
  matches: 0,
  wins: 0,
  kills: 0,
  weapons: {},
};
for (let o of WEAPON_IDS)
  profile.weapons[o] = {
    kills: 0,
    headshots: 0,
    ...(profile.weapons[o] || {}),
  };
function rR() {
  bI(gI, profile);
}
var sR = 55;
var nR = (o) => 350 * (o - 1) * (o - 1) + 650 * (o - 1);
function rankProgress(o = profile.xp) {
  let t = 1;
  for (; t < sR && o >= nR(t + 1);) t++;
  let e = nR(t),
    s = t >= sR ? e : nR(t + 1);
  return {
    rank: t,
    into: o - e,
    span: Math.max(1, s - e),
    t: t >= sR ? 1 : (o - e) / (s - e),
    title: pI[Math.min(pI.length - 1, Math.floor((t - 1) / 5))],
  };
}
var pI = [
  "RECRUIT",
  "OPERATOR",
  "SPECIALIST",
  "SERGEANT",
  "LIEUTENANT",
  "CAPTAIN",
  "MAJOR",
  "COLONEL",
  "COMMANDER",
  "VANGUARD",
  "LEGEND",
];
function camoProgress(o, t) {
  let e = CAMOS.find((r) => r.id === t),
    s = profile.weapons[o] || {
      kills: 0,
      headshots: 0,
    };
  if (!e || !e.need)
    return {
      done: !0,
      t: 1,
      text: "UNLOCKED",
    };
  if (e.need.allGold) {
    let r = WEAPON_IDS.filter((l) => o2(l, "gold")).length;
    return {
      done: r === WEAPON_IDS.length,
      t: r / WEAPON_IDS.length,
      text: `GOLD ON ${r}/${WEAPON_IDS.length} WEAPONS`,
    };
  }
  let n = [],
    i = [];
  (e.need.kills &&
    (n.push(`${Math.min(s.kills, e.need.kills)}/${e.need.kills} ELIMINATIONS`),
    i.push(Math.min(1, s.kills / e.need.kills))),
    e.need.headshots &&
      (n.push(
        `${Math.min(s.headshots, e.need.headshots)}/${e.need.headshots} HEADSHOTS`,
      ),
      i.push(Math.min(1, s.headshots / e.need.headshots))));
  let a = i.reduce((r, l) => r + l, 0) / i.length;
  return {
    done: i.every((r) => r >= 1),
    t: a,
    text: n.join(" \xB7 "),
  };
}
function o2(o, t) {
  return camoProgress(o, t).done;
}
function recordWeaponKill(o, t) {
  let e = profile.weapons[o];
  if (!e) return [];
  let s = CAMOS.filter((n) => o2(o, n.id)).map((n) => n.id);
  return (
    e.kills++,
    t && e.headshots++,
    profile.kills++,
    CAMOS.filter((n) => !s.includes(n.id) && o2(o, n.id))
  );
}
function finishMatchProgress(o, t) {
  let e = rankProgress(),
    s = Math.round(o * 1 + (t ? 600 : 250));
  return (
    (profile.xp += s),
    profile.matches++,
    t && profile.wins++,
    rR(),
    {
      gained: s,
      before: e,
      after: rankProgress(),
    }
  );
}

export {
  ATTACHMENTS,
  ATTACHMENT_LABELS,
  ATTACHMENT_SLOTS,
  CAMOS,
  PRIMARY_WEAPONS,
  Vb,
  WEAPON_ATTACHMENTS,
  WEAPON_IDS,
  camoProgress,
  e5,
  finishMatchProgress,
  getBuild,
  o2,
  profile,
  rR,
  rankProgress,
  recordWeaponKill,
  resolveWeaponDefinition,
  saveBuild,
  weaponStats,
};

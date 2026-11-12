// weapons/recoil.js: recovered from the verified GOLDEN HOUR release.
import { DEG_TO_RAD, clamp, lerp, saturate } from "../core/math.js";
import { Euler, Quaternion, Vector3 } from "../vendor/three-r180.js";
import { WEAPON_DEFINITIONS } from "./definitions.js";

function hZ(o, t, e = t, s = 1, n = 0, i = 0, a = 30, r = 0.05) {
  let l = (p) =>
      s * (Math.exp(-p / t) - Math.exp(-p / o)) +
      (1 - s) * (Math.exp(-p / e) - Math.exp(-p / o)),
    c = 0,
    h = 0;
  for (let p = 0; p < 0.5; p += 25e-5) {
    let x = l(p);
    x > c && ((c = x), (h = p));
  }
  let f = 1 / c,
    u = 2 * Math.PI * a,
    d = n + Math.max(t, e) * 7,
    m = (p) => (
      (p -= n),
      p <= 0 ? 0 : f * l(p) + (i ? i * Math.exp(-p / r) * Math.sin(u * p) : 0)
    );
  return ((m.peakT = n + h), (m.end = d), m);
}
var bs = hZ;
var fZ = ["pitch", "yaw", "roll", "fov", "back"];
var uZ = ["back", "up", "side", "pitch", "yaw", "roll"];
var qw = {
  "view.pitch": 0,
  "view.yaw": 1,
  "view.roll": 2,
  "view.fov": 3,
  "view.back": 4,
  "kick.back": 5,
  "kick.up": 6,
  "kick.side": 7,
  "kick.pitch": 8,
  "kick.yaw": 9,
  "kick.roll": 10,
};
var dZ = 11;
var Zd = [
  DEG_TO_RAD,
  DEG_TO_RAD,
  DEG_TO_RAD,
  1,
  0.001,
  0.001,
  0.001,
  0.001,
  DEG_TO_RAD,
  DEG_TO_RAD,
  DEG_TO_RAD,
];
var pZ = [0, 1, 2, 0, 0, 0, 0, 3, 0, 1, 2];
var hR = {
  ar: {
    pat: [
      [0.5, 0],
      [0.38, 0.03],
      [0.36, 0.05],
      [0.34, 0.06],
      [0.32, 0.08],
      [0.3, 0.1],
      [0.28, 0.12],
      [0.26, 0.12],
      [0.24, 0.1],
      [0.22, 0.06],
      [0.21, 0],
      [0.2, -0.08],
      [0.19, -0.13],
      [0.18, -0.15],
      [0.17, -0.15],
      [0.16, -0.13],
      [0.15, -0.1],
      [0.15, -0.05],
      [0.14, 0.02],
      [0.14, 0.08],
      [0.12, 0.11],
      [0.12, 0.1],
      [0.12, 0.05],
      [0.11, -0.03],
      [0.11, -0.1],
      [0.11, -0.11],
      [0.11, -0.08],
      [0.11, -0.02],
      [0.11, 0.04],
      [0.11, 0.04],
    ],
    loop: 20,
    vary: [0.05, 0.03],
    rise: 0.05,
    rec: [0.105, 12.5],
    idx: [0.15, 15],
    hip: 1.12,
    view: {
      pitch: [0.36, 0.21, bs(0.015, 0.038, 0.15, 0.72, 0, 0.05, 31, 0.045)],
      yaw: [0.07, 0.04, bs(0.014, 0.05, 0.16, 0.75)],
      roll: [0.24, 0.09, bs(0.016, 0.065, 0.2, 0.7, 0.004)],
      fov: [0.5, 0.3, bs(0.011, 0.065)],
      back: [3.5, 2, bs(0.011, 0.05, 0.16, 0.7)],
    },
    kick: {
      back: [13, 7.5, bs(0.008, 0.055, 0.21, 0.72)],
      up: [1.2, 0.5, bs(0.01, 0.06, 0.2, 0.7, 0.004)],
      side: [0.9, 0.4, bs(0.012, 0.06, 0.2, 0.8, 0.006)],
      pitch: [1, 0.44, bs(0.016, 0.038, 0.21, 0.82, 0.005, 0.04, 27, 0.05)],
      yaw: [0.26, 0.19, bs(0.016, 0.046, 0.2, 0.86, 0.006)],
      roll: [0.85, 0.32, bs(0.018, 0.07, 0.24, 0.74, 0.008, 0.06, 19, 0.07)],
    },
    pivot: [0, 0.02, 0.284],
    habit: [1, 0.65],
    alt: 0.45,
    first: 1.1,
    braced: 0.9,
    action: [
      {
        at: 0.076,
        ch: "kick.back",
        amp: [-1.2, -0.7],
        s: bs(0.006, 0.022),
      },
      {
        at: 0.076,
        ch: "kick.pitch",
        amp: [-0.06, -0.035],
        s: bs(0.006, 0.022),
      },
    ],
    lock: [
      {
        at: 0.036,
        ch: "kick.back",
        amp: [1.8, 1],
        s: bs(0.004, 0.05, 0.2, 0.6),
      },
      {
        at: 0.036,
        ch: "kick.pitch",
        amp: [0.22, 0.1],
        s: bs(0.005, 0.06, 0.22, 0.55),
      },
      {
        at: 0.036,
        ch: "kick.roll",
        amp: [0.45, 0.16],
        s: bs(0.006, 0.07, 0.24, 0.6),
      },
      {
        at: 0.036,
        ch: "view.roll",
        amp: [0.1, 0.04],
        s: bs(0.006, 0.06),
      },
    ],
    loose: [2.2, 0.5, 0.26, 8.5, 0.17],
  },
  smg: {
    pat: [
      [0.34, -0.02],
      [0.27, -0.08],
      [0.25, -0.12],
      [0.24, -0.13],
      [0.22, -0.1],
      [0.2, -0.03],
      [0.19, 0.08],
      [0.18, 0.15],
      [0.17, 0.18],
      [0.16, 0.17],
      [0.15, 0.13],
      [0.14, 0.06],
      [0.14, -0.04],
      [0.13, -0.12],
      [0.13, -0.17],
      [0.12, -0.16],
      [0.12, -0.1],
      [0.11, -0.02],
      [0.1, 0.08],
      [0.1, 0.14],
      [0.1, 0.14],
      [0.1, 0.06],
      [0.1, -0.06],
      [0.1, -0.14],
      [0.1, -0.14],
      [0.1, -0.08],
    ],
    loop: 18,
    vary: [0.06, 0.04],
    rise: 0.04,
    rec: [0.085, 14.5],
    idx: [0.13, 20],
    hip: 1.12,
    view: {
      pitch: [0.21, 0.13, bs(0.011, 0.028, 0.11, 0.76, 0, 0.06, 38, 0.035)],
      yaw: [0.1, 0.05, bs(0.011, 0.034, 0.12, 0.8)],
      roll: [0.28, 0.1, bs(0.012, 0.042, 0.14, 0.78, 0.003)],
      fov: [0.32, 0.2, bs(0.009, 0.05)],
      back: [2.2, 1.3, bs(0.009, 0.034, 0.12, 0.75)],
    },
    kick: {
      back: [8, 5, bs(0.006, 0.038, 0.15, 0.75)],
      up: [0.8, 0.3, bs(0.008, 0.04, 0.15, 0.75, 0.003)],
      side: [1.6, 0.7, bs(0.009, 0.04, 0.14, 0.85, 0.004)],
      pitch: [0.64, 0.34, bs(0.011, 0.03, 0.16, 0.84, 0.004, 0.06, 34, 0.04)],
      yaw: [0.4, 0.24, bs(0.011, 0.032, 0.14, 0.88, 0.004)],
      roll: [0.9, 0.38, bs(0.012, 0.04, 0.16, 0.82, 0.005, 0.08, 26, 0.05)],
    },
    pivot: [0, 0.01, 0.25],
    habit: [1, 0.3],
    alt: 0.75,
    first: 1.12,
    braced: 0.92,
    action: [
      {
        at: 0.055,
        ch: "kick.back",
        amp: [-1.2, -0.7],
        s: bs(0.004, 0.018),
      },
      {
        at: 0.055,
        ch: "kick.pitch",
        amp: [-0.08, -0.045],
        s: bs(0.004, 0.018),
      },
    ],
    lock: [],
    loose: [1.6, 0.6, 0.2, 10.5, 0.13],
  },
  shotgun: {
    pat: [
      [2.4, 0.3],
      [2.4, -0.2],
      [2.4, 0.25],
      [2.4, -0.25],
    ],
    loop: 1,
    vary: [0.04, 0.1],
    rise: 0.08,
    rec: [0.2, 6.5],
    idx: [0.5, 4],
    hip: 1.1,
    view: {
      pitch: [1.9, 1.35, bs(0.014, 0.09, 0.26, 0.55, 0, 0.1, 22, 0.08)],
      yaw: [0.3, 0.18, bs(0.016, 0.1, 0.26, 0.65)],
      roll: [0.9, 0.45, bs(0.018, 0.12, 0.3, 0.6, 0.006)],
      fov: [1.6, 1.15, bs(0.012, 0.12)],
      back: [14, 9, bs(0.012, 0.1, 0.28, 0.6)],
    },
    kick: {
      back: [40, 26, bs(0.013, 0.11, 0.3, 0.45)],
      up: [5, 2.5, bs(0.016, 0.12, 0.3, 0.5, 0.006)],
      side: [2.5, 1.2, bs(0.018, 0.12, 0.28, 0.7, 0.008)],
      pitch: [4.4, 2.6, bs(0.024, 0.11, 0.27, 0.52, 0.008, 0.05, 16, 0.11)],
      yaw: [0.6, 0.32, bs(0.024, 0.12, 0.28, 0.7, 0.01)],
      roll: [2.4, 1.1, bs(0.026, 0.14, 0.34, 0.55, 0.012, 0.08, 13, 0.12)],
    },
    pivot: [0, 0, 0.312],
    habit: [-1, 0.8],
    alt: 0.3,
    first: 1,
    braced: 1,
    action: [],
    lock: [],
    loose: null,
  },
  pistol: {
    pat: [
      [0.85, 0.06],
      [0.8, -0.1],
      [0.8, 0.12],
      [0.78, -0.08],
      [0.78, 0.1],
      [0.78, -0.1],
    ],
    loop: 2,
    vary: [0.05, 0.05],
    rise: 0.045,
    rec: [0.065, 17],
    idx: [0.25, 8],
    hip: 1.1,
    view: {
      pitch: [0.55, 0.38, bs(0.013, 0.034, 0.12, 0.8, 0, 0.05, 34, 0.04)],
      yaw: [0.1, 0.06, bs(0.013, 0.04, 0.12, 0.8)],
      roll: [0.3, 0.14, bs(0.014, 0.05, 0.15, 0.75, 0.003)],
      fov: [0.6, 0.4, bs(0.01, 0.058)],
      back: [2.5, 1.5, bs(0.01, 0.04, 0.12, 0.8)],
    },
    kick: {
      back: [9, 6, bs(0.005, 0.03, 0.12, 0.8)],
      up: [1.5, 0.8, bs(0.008, 0.04, 0.12, 0.8, 0.003)],
      side: [1, 0.5, bs(0.01, 0.045, 0.13, 0.85, 0.004)],
      pitch: [5, 2, bs(0.018, 0.04, 0.15, 0.86, 0.004)],
      yaw: [0.5, 0.22, bs(0.016, 0.045, 0.13, 0.85, 0.005)],
      roll: [1.4, 0.55, bs(0.013, 0.055, 0.16, 0.8, 0.006, 0.05, 24, 0.05)],
    },
    pivot: [0, -0.045, 0.075],
    habit: [-1, 0.6],
    alt: 0.6,
    first: 1,
    braced: 1,
    action: [
      {
        at: 0.076,
        ch: "kick.pitch",
        amp: [-0.55, -0.24],
        s: bs(0.008, 0.03),
      },
      {
        at: 0.076,
        ch: "kick.back",
        amp: [-1.2, -0.8],
        s: bs(0.006, 0.024),
      },
    ],
    lock: [
      {
        at: 0.026,
        ch: "kick.pitch",
        amp: [0.7, 0.3],
        s: bs(0.006, 0.07, 0.22, 0.55),
      },
      {
        at: 0.026,
        ch: "kick.roll",
        amp: [0.45, 0.18],
        s: bs(0.007, 0.08, 0.22, 0.6),
      },
      {
        at: 0.026,
        ch: "kick.back",
        amp: [1, 0.6],
        s: bs(0.004, 0.05, 0.16, 0.6),
      },
    ],
    loose: null,
  },
};
function wI() {
  for (let o in hR) {
    let t = hR[o],
      e = (t.resp = []);
    for (let s of fZ) {
      let n = t.view[s],
        i = qw["view." + s];
      e.push({
        c: i,
        hip: n[0] * Zd[i],
        ads: n[1] * Zd[i],
        f: n[2],
        kind: 0,
        at: 0,
      });
    }
    for (let s of uZ) {
      let n = t.kick[s],
        i = qw["kick." + s];
      e.push({
        c: i,
        hip: n[0] * Zd[i],
        ads: n[1] * Zd[i],
        f: n[2],
        kind: 0,
        at: 0,
      });
    }
    for (let s of t.action) {
      let n = qw[s.ch];
      e.push({
        c: n,
        hip: s.amp[0] * Zd[n],
        ads: s.amp[1] * Zd[n],
        f: s.s,
        kind: 1,
        at: s.at,
      });
    }
    for (let s of t.lock) {
      let n = qw[s.ch];
      e.push({
        c: n,
        hip: s.amp[0] * Zd[n],
        ads: s.amp[1] * Zd[n],
        f: s.s,
        kind: 2,
        at: s.at,
      });
    }
    ((t.life = Math.max(...e.map((s) => s.at + s.f.end))),
      (t.pivotV = (t.pivotV || new Vector3()).set(
        t.pivot[0],
        t.pivot[1],
        t.pivot[2],
      )));
  }
}
wI();
var mZ = 28;
var gZ = (o) => (o >= 1 ? 1 : o <= 0 ? 0 : 1 - (1 - o) * (1 - o) * (1 - o));
var lR = new Quaternion();
var MI = new Euler(0, 0, 0, "YXZ");
var Ig = new Vector3();
var WeaponRecoil = class {
  constructor() {
    ((this.tab = hR),
      (this.cam = {
        pitch: 0,
        yaw: 0,
        roll: 0,
        fov: 0,
        back: 0,
        up: 0,
      }),
      (this.wk = {
        back: 0,
        up: 0,
        side: 0,
        pitch: 0,
        yaw: 0,
        roll: 0,
      }),
      (this.look = {
        yaw: 0,
        pitch: 0,
      }),
      (this.turn = {
        yaw: 0,
        pitch: 0,
      }),
      (this.ch = new Float64Array(dZ)),
      (this.shots = []));
    for (let t = 0; t < mZ; t++)
      this.shots.push({
        on: !1,
        t: 0,
        T: null,
        amp: new Float64Array(24),
        sp: 0,
        sy: 0,
        app: 1,
        rise: 0.05,
      });
    ((this.loose = {
      on: !1,
      t: 0,
      k: 0,
      T: null,
    }),
      (this.s = 2654435769),
      this.reset());
  }
  seed(t) {
    this.s = (Math.imul(t | 0, 2654435761) ^ 2246822507) >>> 0;
  }
  _rnd() {
    let t = (this.s = (this.s + 1831565813) >>> 0);
    return (
      (t = Math.imul(t ^ (t >>> 15), t | 1)),
      (t ^= t + Math.imul(t ^ (t >>> 7), t | 61)),
      (((t ^ (t >>> 14)) >>> 0) / 4294967296) * 2 - 1
    );
  }
  reset() {
    ((this.T = 0),
      (this.idx = 0),
      (this.burst = 0),
      (this.heat = 0),
      (this.last = -9),
      (this.iv = 0.1),
      (this.id = null),
      (this.rp = 0),
      (this.ry = 0),
      (this.rvp = 0),
      (this.rvy = 0),
      (this.has = !1),
      (this.lp = 0),
      (this.ly = 0),
      (this.rising = 0),
      (this.posedP = 0),
      (this.posedY = 0),
      (this.adsLast = 0),
      (this.fresh = null));
    for (let s of this.shots) s.on = !1;
    ((this.loose.on = !1), this.ch.fill(0));
    let t = this.cam,
      e = this.wk;
    ((t.pitch = t.yaw = t.roll = t.fov = t.back = t.up = 0),
      (e.back = e.up = e.side = e.pitch = e.yaw = e.roll = 0),
      (this.look.yaw = this.look.pitch = 0),
      (this.turn.yaw = this.turn.pitch = 0),
      (this.s = (this.s ^ ((Math.random() * 4294967296) >>> 0)) >>> 0));
  }
  fire(t, e, s = 0, n = 0, i = !1) {
    let a = this.tab[t.id] || this.tab.ar,
      r = WEAPON_DEFINITIONS[t.id] || t;
    (this.id !== t.id && ((this.id = t.id), (this.idx = 0), (this.burst = 0)),
      (n = clamp(n, 0, 0.05)));
    let l = (this.iv = 60 / t.rpm),
      c = saturate(e.mountK || 0),
      h = Math.floor(this.idx + 1e-6),
      f = a.pat.length,
      u = a.pat[h < f ? h : a.loop + ((h - a.loop) % (f - a.loop))];
    ((this.idx = h + 1),
      this.T - n - this.last > l * 1.5 + 0.06 && (this.burst = 0));
    let d = this.burst++,
      m = e.stance === "prone",
      p = e.stance === "crouch" && e.mode === "normal",
      x = !e.e.onGround,
      g = m ? 0.7 : p ? 0.85 : 1;
    (x ? (g *= 1.3) : e.mode === "slide" && (g *= 1.12),
      e.supine && (g *= 1.15),
      (g *= 1 + 0.14 * saturate((e.speed || 0) / 4.7)));
    let b = t.recoil.v / r.recoil.v,
      v = t.recoil.h / r.recoil.h,
      y = g * lerp(a.hip, 1, s) * lerp(1, 0.55, c),
      M = this._rnd(),
      w = this._rnd(),
      T = this._rnd(),
      S = this._rnd(),
      E = u[0] * (1 + a.vary[0] * M) * b * y * DEG_TO_RAD,
      _ = (u[1] + a.vary[1] * w) * v * y * DEG_TO_RAD,
      R = null,
      C = null;
    for (let z of this.shots) {
      if (!z.on) {
        R = z;
        break;
      }
      (!C || z.t < C.t) && (C = z);
    }
    (R || ((R = C), this._finish(R, e)),
      (R.on = !0),
      (R.t = this.T - n),
      (R.T = a),
      (R.sp = E),
      (R.sy = -_),
      (R.app = 0),
      (R.rise = a.rise));
    let L =
        Math.abs(u[1]) > 0.035
          ? Math.sign(u[1]) * (0.6 + 0.4 * Math.min(1, Math.abs(u[1]) / 0.12))
          : (d & 1 ? -1 : 1) * a.alt,
      A =
        a.habit[0] *
        (a.habit[1] + (1 - a.habit[1]) * (d & 1 ? -1 : 1) * (0.6 + 0.4 * T)),
      O =
        (d === 0 ? a.first : d >= 4 ? a.braced : 1) *
        (0.94 + 0.06 * S) *
        (0.55 + 0.45 * b) *
        (m ? 0.8 : p ? 0.92 : x ? 1.15 : 1),
      H = O * lerp(1, 0.7, c),
      F = O * lerp(1, 0.8, c),
      P = a.resp;
    for (let z = 0; z < P.length; z++) {
      let k = P[z],
        I = lerp(k.hip, k.ads, s) * (k.c < 5 ? H : F);
      ((k.kind === 1 && i) || (k.kind === 2 && !i)) && (I = 0);
      let G = pZ[k.c];
      (G === 1 ? (I *= -L) : G === 3 ? (I *= L) : G === 2 && (I *= A),
        (R.amp[z] = I));
    }
    if (i)
      for (let z = 0; z < P.length; z++)
        P[z].kind === 0 && P[z].c >= 5 && (R.amp[z] *= 1.08);
    return (
      (this.last = this.T - n),
      (this.rvp = 0),
      (this.rvy = 0),
      (this.adsLast = s),
      (this.heat = Math.min(1, this.heat + (t.auto ? 0.17 : 0.34))),
      (this.fresh = n > 0 ? R : null),
      R
    );
  }
  _finish(t, e) {
    (t.app < 1 && this._aim(e, t.sp * (1 - t.app), t.sy * (1 - t.app)),
      (t.app = 1),
      (t.on = !1));
  }
  _aim(t, e, s) {
    let n = t.pitch;
    ((t.pitch = clamp(n + e, -1.5, 1.5)),
      (t.yaw += s),
      (this.rp += t.pitch - n),
      (this.ry += s));
  }
  step(t, e) {
    let s = this.cam;
    if (!(t > 0)) return s;
    if (this.has) {
      let f = e.pitch - this.lp,
        u = e.yaw - this.ly;
      if (
        ((Math.abs(f) > 0.7 || Math.abs(u) > 1.2) &&
          ((f = u = 0), (this.rp = this.ry = this.rvp = this.rvy = 0)),
        this.rp * f < 0)
      ) {
        let m = Math.min(Math.abs(this.rp), Math.abs(f)),
          p = 1 - m / Math.abs(this.rp);
        ((this.rp *= p), (this.rvp *= p));
      }
      if (this.ry * u < 0) {
        let m = Math.min(Math.abs(this.ry), Math.abs(u)),
          p = 1 - m / Math.abs(this.ry);
        ((this.ry *= p), (this.rvy *= p));
      }
      let d = 1 - Math.exp(-t / 0.028);
      ((this.look.pitch += (f / t - this.look.pitch) * d),
        (this.look.yaw += (u / t - this.look.yaw) * d),
        (this.turn.pitch = f),
        (this.turn.yaw = u));
    } else this.turn.pitch = this.turn.yaw = 0;
    this.T += t;
    let n = this.T,
      i = this.ch;
    (i.fill(0), (this.fresh = null));
    let a = 0,
      r = null;
    for (let f of this.shots) {
      if (!f.on) continue;
      let u = n - f.t,
        d = f.T.resp;
      if (((r = f.T), f.app < 1)) {
        let m = gZ(u / f.rise);
        (this._aim(e, f.sp * (m - f.app), f.sy * (m - f.app)),
          (f.app = m),
          m < 1 && a++);
      }
      if (u > f.T.life) {
        f.on = !1;
        continue;
      }
      for (let m = 0; m < d.length; m++) {
        let p = f.amp[m],
          x = d[m],
          g = u - x.at;
        p !== 0 && g > 0 && g < x.f.end && (i[x.c] += p * x.f(g));
      }
    }
    this.rising = a;
    let l = n - this.last;
    r = r || this.tab[this.id] || this.tab.ar;
    let c = r.rise;
    if (l > r.rec[0] && l > c && (this.rp !== 0 || this.ry !== 0)) {
      let f = r.rec[1],
        u = Math.min(t, l - Math.max(r.rec[0], c)),
        d = Math.exp(-f * u),
        m = (this.rp + (this.rvp + f * this.rp) * u) * d,
        p = (this.rvp - f * (this.rvp + f * this.rp) * u) * d,
        x = (this.ry + (this.rvy + f * this.ry) * u) * d,
        g = (this.rvy - f * (this.rvy + f * this.ry) * u) * d,
        b = e.pitch;
      ((e.pitch = clamp(b + (m - this.rp), -1.5, 1.5)),
        (e.yaw += x - this.ry),
        (this.rp = m),
        (this.rvp = p),
        (this.ry = x),
        (this.rvy = g),
        Math.abs(this.rp) < 2e-6 &&
          Math.abs(this.rvp) < 1e-5 &&
          (this.rp = this.rvp = 0),
        Math.abs(this.ry) < 2e-6 &&
          Math.abs(this.rvy) < 1e-5 &&
          (this.ry = this.rvy = 0));
    }
    (l > r.idx[0] + this.iv &&
      (this.idx = Math.max(
        0,
        this.idx - r.idx[1] * Math.min(t, l - r.idx[0] - this.iv),
      )),
      this.burst >= 4 &&
        r.loose &&
        !this.loose.on &&
        l > this.iv * 1.35 &&
        l - t <= this.iv * 1.35 &&
        ((this.loose.on = !0),
        (this.loose.t = this.last + this.iv * 1.35),
        (this.loose.k =
          Math.min(1, this.burst / 9) * lerp(1, 0.35, this.adsLast)),
        (this.loose.T = r)),
      l > this.iv * 1.5 + 0.06 &&
        ((this.burst = 0),
        (this.heat = Math.max(
          0,
          this.heat - Math.min(t, l - this.iv * 1.5 - 0.06) * 2.6,
        ))),
      this.loose.on &&
        (n - this.loose.t > this.loose.T.loose[4] * 7
          ? (this.loose.on = !1)
          : ((i[5] += this._loose(n, 5)),
            (i[8] += this._loose(n, 8)),
            (i[10] += this._loose(n, 10)))),
      (s.pitch = i[0]),
      (s.yaw = i[1]),
      (s.roll = i[2]),
      (s.fov = i[3]),
      (s.back = i[4]),
      (s.up = i[4] * 0.2));
    let h = this.wk;
    return (
      (h.back = i[5]),
      (h.up = i[6]),
      (h.side = i[7]),
      (h.pitch = i[8]),
      (h.yaw = i[9]),
      (h.roll = i[10]),
      (this.lp = e.pitch),
      (this.ly = e.yaw),
      (this.has = !0),
      s
    );
  }
  now() {
    let t = this.wk,
      e = this.fresh;
    if (!e) return t;
    let s = this.T - e.t,
      n = e.T.resp,
      i = this.ch;
    if (((this.fresh = null), s > 0)) {
      for (let a = 0; a < n.length; a++) {
        let r = n[a].c;
        r >= 5 && e.amp[a] !== 0 && (i[r] += e.amp[a] * n[a].f(s - n[a].at));
      }
      ((t.back = i[5]),
        (t.up = i[6]),
        (t.side = i[7]),
        (t.pitch = i[8]),
        (t.yaw = i[9]),
        (t.roll = i[10]));
    }
    return t;
  }
  pose(t, e, s = 1) {
    let n = this.now();
    ((this.posedP = n.pitch * s),
      (this.posedY = n.yaw * s),
      !(n.back === 0 && n.pitch === 0 && n.roll === 0 && n.yaw === 0) &&
        (MI.set(n.pitch * s, n.yaw * s, n.roll * s, "YXZ"),
        lR.setFromEuler(MI),
        Ig.copy(e).applyQuaternion(lR),
        Ig.set(
          e.x - Ig.x + n.side * s,
          e.y - Ig.y + n.up * s,
          e.z - Ig.z + n.back * s,
        ),
        t.position.add(Ig.applyQuaternion(t.quaternion)),
        t.quaternion.multiply(lR)));
  }
  pivotOf(t) {
    return (this.tab[t] || this.tab.ar).pivotV;
  }
  retune() {
    wI();
  }
  sightNow(t, e, s) {
    let n =
        Math.tan((e.fov * DEG_TO_RAD) / 2) / Math.tan((s.fov * DEG_TO_RAD) / 2),
      i = this.last,
      a = 0,
      r = 0;
    for (let l of this.shots) {
      if (!l.on) continue;
      let c = i - l.t,
        h = l.T.resp;
      if (!(c <= 0))
        for (let f = 0; f < h.length; f++) {
          let u = h[f];
          if (u.c !== 8 && u.c !== 9) continue;
          let d = l.amp[f],
            m = c - u.at;
          d !== 0 &&
            m > 0 &&
            m < u.f.end &&
            (u.c === 8 ? (a += d * u.f(m)) : (r += d * u.f(m)));
        }
    }
    return (
      (a += this._loose(i, 8)),
      (this.usedP = a),
      (this.usedY = r),
      (t.y += (a - this.posedP) * n),
      (t.x -= (r - this.posedY) * n),
      t
    );
  }
  _loose(t, e) {
    let s = this.loose;
    if (!s.on) return 0;
    let n = t - s.t,
      i = s.T.loose;
    if (n <= 0 || n > i[4] * 7) return 0;
    let a = Math.exp(-n / i[4]),
      r = (n / 0.05) * Math.exp(1 - n / 0.05) * a;
    return e === 5
      ? -i[0] * 0.001 * s.k * r
      : e === 8
        ? -i[2] * DEG_TO_RAD * s.k * r
        : -i[1] *
          DEG_TO_RAD *
          s.k *
          Math.sin(2 * Math.PI * i[3] * n) *
          a *
          s.T.habit[0];
  }
  probe(t, e, s) {
    let n = this.cam,
      i = this.wk;
    t.push(
      s(this.rp * e),
      s(this.ry * e),
      s(n.pitch * e),
      s(n.yaw * e),
      s(n.roll * e),
      s(n.fov),
      s(n.back * 1e3),
      s(i.back * 1e3),
      s(i.up * 1e3),
      s(i.side * 1e3),
      s(i.pitch * e),
      s(i.yaw * e),
      s(i.roll * e),
      s(this.idx),
      s(this.heat),
      this.burst,
    );
  }
};
WeaponRecoil.prototype.probeCols = [
  "owedPitch",
  "owedYaw",
  "vkPitch",
  "vkYaw",
  "vkRoll",
  "vkFov",
  "vkBack",
  "wkBack",
  "wkUp",
  "wkSide",
  "wkPitch",
  "wkYaw",
  "wkRoll",
  "patIdx",
  "heat",
  "burst",
];

export { WeaponRecoil };

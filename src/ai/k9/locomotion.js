// ai/k9/locomotion.js: recovered from the verified GOLDEN HOUR release.
import { EB, Jt0, SB, TB, _B, bC, f7, gC, zh } from "./mesh.js";
import { $u, Ph, dB, ev, hC, kf, pB, r7, ue, xs, zn } from "./rig.js";
import {
  Euler,
  Matrix4,
  Object3D,
  Quaternion,
  Skeleton,
  SkinnedMesh,
  Vector3,
} from "../../vendor/three-r180.js";

function RB({ team: o = 0, bones: t }) {
  let e = bC(),
    s = f7(),
    n = EB(s.cells),
    i = SB(),
    a = n.rest,
    r = i.u,
    l = $u.map((x, g) =>
      new Matrix4().makeTranslation(-a[g][0], -a[g][1], -a[g][2]),
    ),
    c = new Skeleton(t, l),
    h = new Matrix4(),
    f = new SkinnedMesh(n.geometry, i.main);
  ((f.name = "k9:mesh"),
    f.bind(c, h),
    (f.castShadow = !0),
    (f.receiveShadow = !0),
    (f.boundingSphere = _B(f, t[xs.body], 1.05)),
    (f.onBeforeRender = () => {
      r.uK9State.value.w = bC() % 4096;
    }));
  let u = new SkinnedMesh(Jt0(a), i.fx);
  ((u.name = "k9:fx"),
    u.bind(c, h),
    (u.castShadow = !1),
    (u.receiveShadow = !1),
    (u.renderOrder = 3),
    u.layers.set(1),
    (u.boundingSphere = _B(u, t[xs.body], 1.05)),
    t[xs.body].add(u));
  let d = (x, g, b, v, y) => {
      let M = new Object3D();
      return ((M.name = "k9:" + y), M.position.set(g, b, v), t[x].add(M), M);
    },
    m = {
      visor: d(xs.head, 0, 0.019, -0.089, "visor"),
      prongL: d(
        xs.head,
        -zh[0] * 0.001,
        zh[1] * 0.001,
        -zh[2] * 0.001,
        "prongL",
      ),
      prongR: d(
        xs.head,
        zh[0] * 0.001,
        zh[1] * 0.001,
        -zh[2] * 0.001,
        "prongR",
      ),
      mouth: d(xs.head, 0, -0.037, -0.125, "mouth"),
      antennaTip: d(xs.tail3, 0, 0.07, 0.085, "antennaTip"),
      vents: d(xs.body, 0, 0.088, 0.17, "vents"),
      ventL: d(xs.body, -0.121, -0.01, 0.08, "ventL"),
      ventR: d(xs.body, 0.121, -0.01, 0.08, "ventR"),
      sparks: gC.map((x, g) => {
        let b = d(
          x.bone,
          x.p[0] * 0.001,
          x.p[1] * 0.001,
          x.p[2] * 0.001,
          "spark" + g,
        );
        return ((b.userData.threshold = x.at), b);
      }),
    };
  ((m.ventL.rotation.z = Math.PI / 2), (m.ventR.rotation.z = -Math.PI / 2));
  let p = {
    mesh: f,
    extras: [u],
    sockets: m,
    skeleton: c,
    team: o,
    triangles: n.stats.tris + u.geometry.index.count / 3,
    drawCalls: 2,
    info: {
      ...n.stats,
      textureMs: s.ms,
      textureParts: s.parts,
      textureBytes: s.bytes,
      buildMs: 0,
    },
    setTeam(x) {
      let g = TB[x ? 1 : 0];
      ((p.team = x ? 1 : 0),
        r.uK9Team.value.setHex(g.glow),
        r.uK9Hot.value.setHex(g.hot),
        r.uK9Shell.value.setHex(g.shell),
        r.uK9Paint.value.setHex(g.stripe),
        (r.uK9Glow.value = g.k));
    },
    setPower(x) {
      r.uK9State.value.x = x < 0 ? 0 : x > 1 ? 1 : x;
    },
    setAlert(x) {
      r.uK9State.value.y = x < 0 ? 0 : x > 1 ? 1 : x;
    },
    setDamage(x) {
      r.uK9State.value.z = x < 0 ? 0 : x > 1 ? 1 : x;
    },
    setCharge(x) {
      r.uK9Zap.value.x = x < 0 ? 0 : x > 1 ? 1 : x;
    },
    setShock(x) {
      r.uK9Zap.value.y = x < 0 ? 0 : x > 1 ? 1 : x;
    },
    setFade(x) {
      ((x = x < 0 ? 0 : x > 1 ? 1 : x),
        (r.uK9Fade.value = x),
        (f.castShadow = x > 0.4),
        f.layers.set(x < 0.999 ? 1 : 0));
    },
    dispose() {
      (i.main.dispose(),
        i.fx.dispose(),
        c.dispose(),
        u.parent && u.parent.remove(u));
    },
  };
  return (p.setTeam(o), (p.info.buildMs = (bC() - e) * 1e3), p);
}
var x7 = Math.PI * 2;
var Ys = (o, t, e) => (o < t ? t : o > e ? e : o);
var iv = (o) => (o < 0 ? 0 : o > 1 ? 1 : o);
var as = (o, t, e) => o + (t - o) * e;
var b7 = (o) => ((o = o < 0 ? 0 : o > 1 ? 1 : o), o * o * (3 - 2 * o));
var Pc = (o, t, e) => b7((e - o) / (t - o));
var AB = (o) => (
  (o = o < 0 ? 0 : o > 1 ? 1 : o),
  o * o * o * (o * (o * 6 - 15) + 10)
);
var Di = (o, t, e, s) => o + (t - o) * (1 - Math.exp(-e * s));
var Y4 = (o) => o - Math.floor(o);
var yC = (o) => o - Math.floor(o + 0.5);
var Yp = (o) => ((o = (o + Math.PI) % x7), o < 0 && (o += x7), o - Math.PI);
var CB = (o, t, e) => (o <= t ? 0 : o >= e ? 1 : (o - t) / (e - t));
var Cn = (o, t, e) => b7(CB(o, t, e));
function Q5(o, t, e, s = 0.5) {
  if (o <= t) return 0;
  let n = (o - t) / (e - t);
  if (n >= 2) return 1;
  let i = 4 / s,
    a = i * Math.sqrt(1 - s * s);
  return (
    1 -
    Math.exp(-s * i * n) * (Math.cos(a * n) + ((s * i) / a) * Math.sin(a * n))
  );
}
function av(o, t, e, s = 0.06) {
  let n = (o - t) / (e - t);
  return n <= 0
    ? 0
    : n < 0.8
      ? (1 + s) * AB(n / 0.8)
      : 1 + s * (1 - AB((n - 0.8) / 0.45));
}
var f1 = (o, t, e) => {
  let s = CB(o, t, e),
    n = Math.sin(Math.PI * s);
  return n * n;
};
function J5(o, t, e) {
  let s = o.length;
  if (e <= o[0]) return t[0];
  if (e >= o[s - 1]) return t[s - 1];
  let n = 1;
  for (; o[n] < e;) n++;
  return t[n - 1] + ((t[n] - t[n - 1]) * (e - o[n - 1])) / (o[n] - o[n - 1]);
}
function Io(o, t, e, s, n) {
  let i = 1 + 2 * n * s * e,
    a = n * e * e,
    r = n * a,
    l = 1 / (i + r),
    c = (i * o.x + n * o.v + r * t) * l;
  return ((o.v = (o.v + a * (t - o.x)) * l), (o.x = c), c);
}
var co = (o = 0) => ({
  x: o,
  v: 0,
});
var kB = (o) => {
  let t = Math.sin(o * 127.1 + 311.7) * 43758.5453;
  return t - Math.floor(t);
};
function W1(o, t = 0) {
  let e = Math.floor(o),
    s = o - e,
    n = s * s * (3 - 2 * s);
  return as(kB(e + t * 57.3), kB(e + 1 + t * 57.3), n) * 2 - 1;
}
function Bn(o) {
  return (
    (o.s = ((Math.imul(o.s, 1103515245) + 12345) >>> 1) & 1073741823),
    o.s / 1073741824
  );
}
var zc = (o, t) => Math.sqrt(o * o + t * t);
var ee0 = [0.25, 0.75, 0, 0.5];
var se0 = [0.5, 1, 0, 0.5];
var ne0 = [0.62, 0.52, 0, 0.1];
var PB = [0, 0.3, 0.8, 1.6, 2.6];
var oe0 = [0.78, 0.92, 1.38, 1.92, 2.4];
var ie0 = [0.8, 0.78, 0.7, 0.62, 0.56];
var zB = [0, 1, 2, 3, 4.2, 5.5, 7];
var ae0 = [1.5, 1.75, 2.12, 2.48, 2.86, 3.15, 3.4];
var re0 = [0.58, 0.56, 0.5, 0.44, 0.38, 0.34, 0.31];
var LB = [4, 5.5, 7, 8.5, 9.5, 11];
var le0 = [2.3, 2.5, 2.75, 3, 3.15, 3.4];
var ce0 = [0.32, 0.27, 0.23, 0.205, 0.19, 0.175];
var he0 = 0.6;
function vC(o, t, e, s) {
  let n = J5(PB, oe0, t),
    i = J5(zB, ae0, t),
    a = J5(LB, le0, t),
    r = J5(PB, ie0, t),
    l = J5(zB, re0, t),
    c = J5(LB, ce0, t),
    h = as(as(n, i, e), a, s),
    f = as(as(r, l, e), c, s),
    u = (t * f) / he0;
  (h < u && (h = u), (o.f = h), (o.duty = f));
  let d = 0.035 + 0.03 * Math.min(1, t / 1.4),
    m = 0.07 + 0.035 * Math.min(1, t / 4.2),
    p = 0.13 + 0.05 * Math.min(1, (t - 5) / 4.5);
  ((o.lift = as(as(d, m, e), p, s)),
    (o.crouch = as(0.012 * e, 0.065, s)),
    (o.narrow = as(0.03 * e, 0.045, s)),
    (o.reach = 0.07 * s));
  for (let x = 0; x < 4; x++) o.off[x] = as(as(ee0[x], se0[x], e), ne0[x], s);
  return o;
}
var DB = () => ({
  f: 1,
  duty: 0.7,
  lift: 0.05,
  crouch: 0,
  narrow: 0,
  reach: 0,
  off: [0.25, 0.75, 0, 0.5],
});
var Ei = 0;
var j4 = 1;
var $4 = 2;
var zf = 3;
var Zu = 4;
var Z4 = ue.upper + ue.lower - 0.004;
var Pf = ue.hipX + ue.hipOut;
var fe0 = zc(Pf, ue.hipZ);
var IB = Z4 * 0.93;
var ue0 = 0.95;
var MC = 0.125;
var HB = Math.sin(zn.a[0] + 0.035);
var FB = Math.cos(zn.a[0] + 0.035);
var Zl = Vector3;
var Wi = new Zl();
var y7 = new Zl();
var x10 = new Quaternion();
var de0 = new Euler(0, 0, 0, "YXZ");
function pe0(o, t = 0.16, e = 0.22) {
  if (o <= 0) return 0;
  if (o >= 1) return 1;
  let s = 1 / (1 - 0.5 * (t + e));
  if (o < t) {
    let n = o / t;
    return s * t * (n * n * n - 0.5 * n * n * n * n);
  }
  if (o > 1 - e) {
    let n = (1 - o) / e;
    return 1 - s * e * (n * n * n - 0.5 * n * n * n * n);
  }
  return s * (o - 0.5 * t);
}
var v7 = 0.4;
var me0 = 2.3;
var ge0 = 1;
function wC(o) {
  if (o <= 0 || o >= 1) return 0;
  if (o < v7) {
    let n = o / v7,
      i = n * n,
      a = i * n;
    return (a - 2 * i + n) * me0 + (-2 * a + 3 * i);
  }
  let t = (o - v7) / (1 - v7),
    e = t * t,
    s = e * t;
  return 2 * s - 3 * e + 1 - (s - e) * ge0;
}
var Q4 = class {
  constructor(t) {
    ((this.i = t),
      (this.side = Ph(t)),
      (this.front = kf(t)),
      (this.mode = Ei),
      (this.pos = new Zl()),
      (this.g = 0),
      (this.gs = 0),
      (this.k = 0),
      (this.u = 0),
      (this.p0 = new Zl()),
      (this.p1 = new Zl()),
      (this.g0 = 0),
      (this.g1 = 0),
      (this.qx = 1e9),
      (this.qz = 1e9),
      (this.locked = !1),
      (this.lift = 0.06),
      (this.tRem = 0),
      (this.wait = 0),
      (this.nog = !1),
      (this.strain = !1),
      (this.landed = !1),
      (this.from = new Zl()),
      (this.to = new Zl()),
      (this.t = 0),
      (this.dur = 0.2),
      (this.sLift = 0.04),
      (this.over = 0),
      (this.str = 0.2),
      (this.hold = 0),
      (this.rel = new Zl()),
      (this.relV = new Zl()),
      (this.relT = new Zl()),
      (this.freeW = 24),
      (this.bs = new Zl()),
      (this.bsP = new Zl()),
      (this.ang = [0, 0, 0]),
      (this.angV = [0, 0, 0]),
      (this.angT = [0, 0, 0]),
      (this.poseW = 14),
      (this.floor = !1),
      (this.load = 0),
      (this.loadK = 1),
      (this.reach = 0),
      (this.reachP = 0),
      (this.miss = 0),
      (this.inM = 1),
      (this.home = new Zl()),
      (this.down = !1));
  }
};
var K9Locomotion = class {
  constructor({ ground: t = null, clear: e = null, seed: s = 1 } = {}) {
    ((this.ground = t),
      (this.clear = e),
      (this.state = {
        x: 0,
        y: 0,
        z: 0,
        yaw: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        grounded: !0,
        mode: "folded",
        lookAt: null,
        hp: 1,
        alert: 0,
      }),
      (this.pose = r7()),
      (this.P_STAND = dB()),
      (this.P_FOLD = pB()),
      (this.legs = [new Q4(0), new Q4(1), new Q4(2), new Q4(3)]),
      (this.G = DB()),
      (this.rng = {
        s: ((s * 2654435761) >>> 2) & 1073741823,
      }),
      (this.seed = s),
      (this.onStep = null),
      (this._c = new Zl()),
      (this.live = !1),
      (this.time = s * 7.31),
      (this.mode = "none"),
      (this.px = 0),
      (this.py = 0),
      (this.pz = 0),
      (this.pyaw = 0),
      (this.vx = 0),
      (this.vz = 0),
      (this.vyM = 0),
      (this.ax = 0),
      (this.az = 0),
      (this.wy = 0),
      (this.speed = 0),
      (this.sEff = 0),
      (this.peak = 0),
      (this.sy = 0),
      (this.cy = 1),
      (this.dirx = 0),
      (this.dirz = -1),
      (this.gaitOn = !1),
      (this.Phi = 0),
      (this.trotOn = !1),
      (this.gallopOn = !1),
      (this.trotK = 0),
      (this.gallopK = 0),
      (this.settleT = 0),
      (this.spread = 0.02),
      (this.brx = 0),
      (this.brz = 0),
      (this.cadence = 1),
      (this.air = !1),
      (this.airT = 0),
      (this.landT = 9),
      (this.skid = 0),
      (this.limpLeg = -1),
      (this.limpK = 0),
      (this.slopeK = 0),
      (this.idt = 60),
      (this.gOK = !0),
      (this.vF = 0),
      (this.vR = 0),
      (this.latK = 0),
      (this.goal = {
        h: ue.stand,
        x: 0,
        z: 0,
        pitch: 0,
        roll: 0,
        yaw: 0,
        terrain: 1,
        sink: 0.2,
        gait: !0,
        settle: !0,
        idle: 1,
        gaze: 0,
        gazeW: 26,
        gazeYaw: 0,
        gazePitch: 0,
        neck: 0.25,
        stab: 1,
        tilt: 0,
        headRoll: 0,
        headYaw: 0,
        headPitch: 0,
        script: 0,
        sNeck: [0, 0],
        sHead: [0, 0, 0],
        ears: [0.15, 0.15],
        earW: 34,
        tail: [
          [0, 0.1],
          [0, 0.05],
          [0, 0],
        ],
        tailW: 20,
        tailZ: 0.24,
        wag: 0,
        jaw: 0,
        power: 1,
        alert: 0,
        charge: 0,
        shock: 0,
      }),
      (this.supY = co()),
      (this.supP = co()),
      (this.supR = co()),
      (this.supT = 0),
      (this.supV = 0),
      (this.hv = co()),
      (this.pt = co()),
      (this.rl = co()),
      (this.sx = co()),
      (this.sz = co()),
      (this.yw = co()),
      (this.loadAvg = 0),
      (this.gPitch = 0),
      (this.gRoll = 0),
      (this.gX = 0),
      (this.aX = co()),
      (this.aY = co()),
      (this.aZ = co()),
      (this.gaitK = 0),
      (this.bobS = co()),
      (this.slope = 0),
      (this.io = [co(), co(), co(), co(), co(), co()]),
      (this.fin = new Float64Array(6)),
      (this.finV = new Float64Array(6)),
      (this.finS = new Float64Array(6)),
      (this.rawP = new Float64Array(6)),
      (this.blend = 0),
      (this.ioW = 17),
      (this.finOk = !1),
      (this.bpos = new Zl(0, ue.stand, 0)),
      (this.bq = new Quaternion()),
      (this.bqi = new Quaternion()),
      (this.bodyW = new Zl(0, ue.stand, 0)),
      (this.pitch = 0),
      (this.roll = 0),
      (this.yawOff = 0),
      (this.free = !1),
      (this.fq = new Quaternion()),
      (this.idleX = co()),
      (this.idleTx = 0),
      (this.idleT = 2 + Bn(this.rng) * 3),
      (this.pawLeg = -1),
      (this.pawT = 0),
      (this.effort = 0),
      (this.gaitName = "stand"));
  }
  gy(t, e) {
    let s = this.state,
      n = s.y;
    if (!this.ground) return ((this.gOK = !0), n);
    let i = zc(t - s.x, e - s.z),
      a = Math.min(0.2 + 0.72 * i, 0.85),
      r = this.ground(t, e, n + a);
    return r <= n + a + 0.06 && r >= n - Math.min(0.3 + 0.8 * i, 0.66)
      ? r - n > 0.24 &&
        this.ground(0.5 * (t + s.x), 0.5 * (e + s.z), n + a) - n <
          0.5 * (r - n) - 0.2
        ? ((this.gOK = !1), n)
        : ((this.gOK = !0), r)
      : ((this.gOK = !1), n);
  }
  homeAt(t, e, s, n, i) {
    let a = Math.cos(n),
      r = Math.sin(n),
      l = this.G,
      c = t.side * (Pf + this.spread - l.narrow + 0.045 * this.latK),
      h = (t.front ? -ue.hipZ : ue.hipZ) - l.reach - 0.07 * this.slope;
    return ((i.x = e + c * a + h * r), (i.z = s - c * r + h * a), i);
  }
  toWorld(t) {
    let e = this.state,
      s = t.x,
      n = t.z;
    return (
      (t.x = e.x + s * this.cy + n * this.sy),
      (t.y += e.y),
      (t.z = e.z - s * this.sy + n * this.cy),
      t
    );
  }
  toLocal(t) {
    let e = this.state,
      s = t.x - e.x,
      n = t.z - e.z;
    return (
      (t.x = s * this.cy - n * this.sy),
      (t.y -= e.y),
      (t.z = s * this.sy + n * this.cy),
      t
    );
  }
  footOfPose(t, e, s) {
    return this.toWorld(hC(t, e.leg[t], s).applyQuaternion(e.quat).add(e.pos));
  }
  plant(t, e, s) {
    ((t.mode = Ei),
      (t.g = this.gy(e, s)),
      (t.gs = t.g),
      t.pos.set(e, t.g + ue.foot, s),
      (t.k = 0.5),
      (t.down = !0));
  }
  step(t, e, s, n = 0.18, i = 0.05, a = 0, r = 0.2, l = 0) {
    (t.from.copy(t.pos),
      (t.g0 = t.mode === Ei ? t.g : t.gs),
      t.to.set(e, 0, s),
      (t.g1 = this.gy(e, s)),
      (t.mode = $4),
      (t.t = 0),
      (t.dur = n),
      (t.sLift = i),
      (t.over = a),
      (t.str = r),
      (t.hold = l),
      (t.down = !1));
  }
  freeLeg(t, e, s, n, i = 24) {
    (t.mode !== zf &&
      (t.rel.copy(t.bs),
      t.relV.subVectors(t.bs, t.bsP).multiplyScalar(this.idt),
      t.relV.lengthSq() > 64 && t.relV.setLength(8),
      (t.mode = zf),
      (t.down = !1)),
      t.relT.set(e, s, n),
      (t.freeW = i));
  }
  poseLeg(t, e, s, n, i = 14, a = !1) {
    if (t.mode !== Zu) {
      let r = this.pose.leg[t.i];
      ((t.ang[0] = r[0]),
        (t.ang[1] = r[1]),
        (t.ang[2] = r[2]),
        (t.angV[0] = t.angV[1] = t.angV[2] = 0),
        (t.mode = Zu),
        (t.down = !1));
    }
    ((t.angT[0] = e),
      (t.angT[1] = s),
      (t.angT[2] = n),
      (t.poseW = i),
      (t.floor = a));
  }
  land(t, e = 0.06, s = 0.5, n = 0, i = 0) {
    t.mode !== Ei &&
      ((t.mode === $4 && t.t > 0.5) ||
        this.step(t, t.pos.x + n, t.pos.z + i, e, 0, 0, s));
  }
  touch(t, e) {
    if (
      ((t.mode = Ei),
      (t.k = 0),
      (t.down = !0),
      (t.pos.y = t.g + ue.foot),
      (t.gs = t.g),
      e > 0)
    ) {
      let s = e * (0.35 + 0.65 * this.gallopK);
      ((this.hv.v -= 0.16 * s),
        (this.pt.v += (t.front ? -0.5 : 0.42) * s),
        (this.rl.v -= t.side * 0.3 * s),
        this.onStep && this.onStep(t.i, this._c.set(t.pos.x, t.g, t.pos.z), e));
    }
  }
  snap() {
    let t = this.state;
    ((this.px = t.x),
      (this.py = t.y),
      (this.pz = t.z),
      (this.pyaw = t.yaw),
      (this.vx = t.vx || 0),
      (this.vz = t.vz || 0),
      (this.vyM = 0),
      (this.ax = this.az = 0),
      (this.wy = 0),
      (this.peak = 0),
      (this.sy = Math.sin(t.yaw)),
      (this.cy = Math.cos(t.yaw)),
      (this.gaitOn = !1),
      (this.trotOn = this.gallopOn = !1),
      (this.trotK = this.gallopK = 0),
      (this.slopeK = 0));
    for (let e of this.legs)
      ((e.reach = e.reachP = 0.8),
        (e.strain = !1),
        (e.landed = !1),
        (e.nog = !1));
    vC(this.G, 0, 0, 0);
    for (let e of this.legs)
      (this.homeAt(e, t.x, t.z, t.yaw, Wi),
        this.plant(e, Wi.x, Wi.z),
        (e.load = 0),
        e.bs.set(
          e.side * Pf,
          -ue.stand + ue.foot,
          e.front ? -ue.hipZ : ue.hipZ,
        ),
        e.bsP.copy(e.bs));
    for (let e of [
      "supP",
      "supR",
      "hv",
      "pt",
      "rl",
      "sx",
      "sz",
      "yw",
      "idleX",
      "aX",
      "aY",
      "aZ",
      "bobS",
    ])
      ((this[e].x = 0), (this[e].v = 0));
    ((this.slope = 0),
      (this.supY.x = t.y),
      (this.supY.v = 0),
      (this.supT = t.y),
      (this.supV = 0));
    for (let e of this.io) ((e.x = 0), (e.v = 0));
    ((this.loadAvg = this.gPitch = this.gRoll = this.gX = this.gaitK = 0),
      (this.blend = 0),
      (this.air = !1),
      (this.free = !1),
      (this.live = !0),
      (this.finOk = !1));
  }
  kin(t) {
    let e = this.state;
    this.idt = 1 / t;
    let s = e.x - this.px,
      n = e.y - this.py,
      i = e.z - this.pz;
    ((this.sy = Math.sin(e.yaw)), (this.cy = Math.cos(e.yaw)));
    let a = 1 - Math.exp(-30 * t),
      r = this.vx,
      l = this.vz;
    ((this.vx += (s / t - this.vx) * a), (this.vz += (i / t - this.vz) * a));
    let c = 1 - Math.exp(-9 * t);
    ((this.ax += (Ys((this.vx - r) / t, -42, 42) - this.ax) * c),
      (this.az += (Ys((this.vz - l) / t, -42, 42) - this.az) * c),
      (this.vyM = Di(this.vyM, Ys(n / t, -15, 15), 20, t)),
      (this.wy = Di(this.wy, Ys(Yp(e.yaw - this.pyaw) / t, -12, 12), 24, t)),
      (this.px = e.x),
      (this.py = e.y),
      (this.pz = e.z),
      (this.pyaw = e.yaw));
    let h = zc(this.vx, this.vz);
    if (
      ((this.speed = h),
      (this.vF = -(this.vx * this.sy + this.vz * this.cy)),
      (this.vR = this.vx * this.cy - this.vz * this.sy),
      h > 0.25)
    ) {
      let m = 1 - Math.exp(-12 * t);
      ((this.dirx += (this.vx / h - this.dirx) * m),
        (this.dirz += (this.vz / h - this.dirz) * m));
    }
    let f = this.peak;
    this.peak = Math.max(h, Di(f, h, 4, t));
    let u = iv((this.peak - h - 0.5) / 2) * Math.min(0.2, 0.042 * this.peak),
      d = zc(this.dirx, this.dirz) || 1;
    ((this.brx = (this.dirx / d) * u), (this.brz = (this.dirz / d) * u));
  }
  gait(t) {
    let e = this.G,
      s = this.goal,
      n = this.legs,
      i = this.state,
      a = (this.sEff = Math.max(this.speed, Math.abs(this.wy) * fe0 * 0.9));
    (this.trotOn
      ? a < 1.85 && (this.trotOn = !1)
      : a > 2.25 && (this.trotOn = !0),
      this.gallopOn
        ? a < 5.2 && (this.gallopOn = !1)
        : a > 5.9 && (this.gallopOn = !0),
      (this.trotK = Di(this.trotK, this.trotOn ? 1 : 0, 9, t)),
      (this.gallopK = Di(this.gallopK, this.gallopOn ? 1 : 0, 7, t)),
      vC(e, a, this.trotK, this.gallopK));
    let r = (Math.abs(this.wy) * e.duty) / 0.95;
    if ((e.f < r && (e.f = r), this.speed > 0.05)) {
      let m = this.vF / this.speed,
        p = this.vR / this.speed,
        x = this.speed * e.duty * zc(m / (0.6 - 0.27 * this.slopeK), p / 0.33);
      (e.f < x && (e.f = x), (this.latK = Math.abs(p)));
    } else this.latK = 0;
    e.f *= this.cadence;
    let l = e.f,
      c = e.duty,
      h = s.gait && !this.air && a > (this.gaitOn ? 0.1 : 0.22);
    (h && !this.gaitOn
      ? this.gaitStart()
      : !h &&
        this.gaitOn &&
        ((this.gaitOn = !1),
        (this.settleT = 0.1 + 0.02 * Math.min(this.peak, 6))),
      this.gaitOn && (this.Phi = Y4(this.Phi + l * t)));
    let f = this.gallopK > 0.4 ? 0 : this.trotK > 0.5 ? (c > 0.5 ? 2 : 0) : 2,
      u = 0;
    for (let m = 0; m < 4; m++) n[m].mode === Ei && u++;
    let d = this.limpK;
    for (let m = 0; m < 4; m++) {
      let p = n[m],
        x = m === this.limpLeg ? d : 0;
      if ((this.homeAt(p, i.x, i.z, i.yaw, p.home), p.mode === Ei)) {
        if (
          ((p.gs = p.g),
          this.skid > 0 &&
            ((p.pos.x += this.vx * t * this.skid),
            (p.pos.z += this.vz * t * this.skid)),
          this.gaitOn)
        ) {
          let g = yC(Y4(this.Phi + e.off[m]) - p.k * c);
          p.k += ((t * l) / c) * (1 + Ys(g * 5, -0.6, 1.2)) * (1 + 0.9 * x);
          let b = p.k < 1 ? Math.sin(Math.PI * p.k) : 0;
          ((p.load = b * b * p.loadK * (1 - 0.55 * x)),
            p.reach + Math.max(0, p.reach - p.reachP) * 1.3 > 0.972 &&
              (p.strain = !0),
            (p.strain ||
              ((p.k >= 1 || (p.reach > ue0 && p.k > 0.3)) && u - 1 >= f)) &&
              (this.liftoff(p), u--));
        } else
          ((p.load = Di(p.load, 0, 14, t)),
            p.strain && s.settle && this.settleT > 0 && (this.settleT = 0));
      } else if (p.mode === j4) {
        let g = this.gaitOn
            ? yC(Y4(this.Phi + e.off[m]) - (c + p.u * (1 - c)))
            : 0,
          b =
            x > 0
              ? 1 - 0.55 * x * Math.exp(-((p.u - 0.42) * (p.u - 0.42)) / 0.012)
              : 1,
          v = (Math.max(l, 1.6) / (1 - c)) * (1 + Ys(g * 2.5, -0.3, 0.45)) * b;
        if (
          ((p.u += t * v),
          this.swing(p, (1 - p.u) / v, x),
          (p.load = 0),
          p.u >= 1)
        )
          if (p.nog) ((p.u = 0.999), (p.locked = !1));
          else {
            if (
              Math.abs(p.pos.x - p.p1.x) + Math.abs(p.pos.z - p.p1.z) >
              0.02
            ) {
              let y = this.gy(p.pos.x, p.pos.z);
              this.gOK && (p.g = y);
            }
            Wi.set(
              p.pos.x - this.bodyW.x,
              p.g + ue.foot - this.bodyW.y,
              p.pos.z - this.bodyW.z,
            );
            {
              let y = Wi.x,
                M = Wi.z;
              ((Wi.x = y * this.cy - M * this.sy),
                (Wi.z = y * this.sy + M * this.cy));
            }
            this.legD(p, Wi.applyQuaternion(this.bqi)) > Z4 * 0.968 &&
            p.wait < 0.25
              ? ((p.u = 0.999), (p.g1 = p.g), (p.locked = !1), (p.wait += t))
              : (this.touch(p, Ys((0.2 + 0.085 * a) * (1 - 0.4 * x), 0, 1)),
                u++);
          }
      } else
        p.mode === $4
          ? (this.stepLeg(p, t), (p.load = 0), p.mode === Ei && u++)
          : ((p.load = 0), (p.gs = i.y));
    }
    if (
      !this.gaitOn &&
      s.settle &&
      !this.air &&
      ((this.settleT -= t), this.settleT <= 0)
    ) {
      let m = 0.075,
        p = -1,
        x = 0;
      for (let g = 0; g < 4; g++) {
        let b = n[g];
        if (b.mode !== Ei) {
          (b.mode === $4 || b.mode === j4) && x++;
          continue;
        }
        let v = zc(b.pos.x - b.home.x, b.pos.z - b.home.z);
        ((b.reach > 0.94 || b.strain) && (v += 0.2),
          v > m && ((m = v), (p = g)));
      }
      if (p >= 0 && x === 0) {
        let g = n[p],
          b = Math.min(m, 0.4);
        (this.step(
          g,
          g.home.x + (Bn(this.rng) - 0.5) * 0.02,
          g.home.z + (Bn(this.rng) - 0.5) * 0.02,
          Ys(0.15 + 0.3 * b, 0.16, 0.28),
          0.03 + 0.11 * b,
          0,
          0.18 + 0.4 * b,
        ),
          (this.settleT = g.dur + 0.03 + Bn(this.rng) * 0.05));
      }
    }
    ((this.skid = Di(this.skid, 0, 16, t)),
      this.skid < 0.02 && (this.skid = 0),
      (this.gaitName = this.gaitOn
        ? this.gallopK > 0.5
          ? "gallop"
          : this.trotK > 0.5
            ? "trot"
            : "walk"
        : "stand"));
  }
  gaitStart() {
    let t = this.G,
      e = this.legs,
      s = this.state,
      n = t.duty,
      i = 1e9,
      a = 2;
    for (let r = 0; r < 4; r++) {
      let l = e[r];
      if (l.mode !== Ei) continue;
      let c = l.home.x - s.x,
        h = l.home.z - s.z,
        f = this.vx + this.wy * h,
        u = this.vz - this.wy * c,
        d = zc(f, u) || 1,
        m =
          ((l.pos.x - l.home.x) * f + (l.pos.z - l.home.z) * u) / d -
          (l.front ? 0 : 0.012) -
          (r === 2 ? 0.004 : 0);
      m < i && ((i = m), (a = r));
    }
    this.Phi = Y4(n - t.off[a] + 1e-4);
    for (let r = 0; r < 4; r++) {
      let l = e[r];
      if (l.mode !== Ei) continue;
      let c = Y4(this.Phi + t.off[r]);
      l.k = c < n ? c / n : c - n < 0.06 ? 1 : 0.72;
    }
    this.gaitOn = !0;
  }
  liftoff(t) {
    ((t.mode = j4),
      (t.u = 0),
      t.p0.copy(t.pos),
      (t.g0 = t.g),
      (t.g1 = t.g),
      (t.qx = 1e9),
      (t.locked = !1),
      (t.down = !1),
      (t.wait = 0),
      (t.lift =
        this.G.lift * (t.i === this.limpLeg ? 1 - 0.45 * this.limpK : 1)));
  }
  swing(t, e, s) {
    let n = this.G,
      i = this.state,
      a = t.u;
    if (((t.tRem = e > 0 ? e : 0), !t.locked)) {
      let p = e + (this.gaitOn ? ((0.5 * n.duty) / n.f) * (1 - 0.4 * s) : 0);
      (this.homeAt(
        t,
        i.x + this.vx * p,
        i.z + this.vz * p,
        i.yaw + this.wy * p,
        t.p1,
      ),
        (t.p1.x += this.brx),
        (t.p1.z += this.brz));
      let x = t.p1.x - t.qx,
        g = t.p1.z - t.qz;
      (x * x + g * g > 6e-4 &&
        ((t.g1 = this.gy(t.p1.x, t.p1.z)),
        (t.nog = !this.gOK),
        (t.qx = t.p1.x),
        (t.qz = t.p1.z)),
        a > 0.8 &&
          ((t.locked = !0),
          (t.g1 = this.gy(t.p1.x, t.p1.z)),
          (t.nog = !this.gOK)));
    }
    let r = t.g1 - t.g0,
      l = Ys(r / 0.15, -1, 1),
      c = Math.abs(r),
      h = c < 0.2 ? c : 0.2,
      f = this.gallopK,
      u = pe0(
        l > 0
          ? (a - 0.16 * l) / (1 - 0.16 * l)
          : l < 0
            ? a / (1 + 0.18 * l)
            : a,
        0.16 + 0.2 * f,
        0.22 + 0.12 * f,
      );
    ((t.pos.x = t.p0.x + (t.p1.x - t.p0.x) * u),
      (t.pos.z = t.p0.z + (t.p1.z - t.p0.z) * u),
      (t.gs =
        r >= 0
          ? t.g0 + h * Pc(0, 0.24, a) + (c - h) * Pc(0.05, 0.7, u)
          : t.g0 - (c - h) * Pc(0.25, 0.9, u) - h * Pc(0.72, 1, a)));
    let d = Math.sin(Math.PI * a),
      m = f > 0.01 ? wC(a) * (1 - f) + d * d * f : wC(a);
    if (
      ((t.pos.y =
        t.gs + ue.foot + (t.lift + Math.min(0.11, 0.3 * Math.abs(r))) * m),
      r !== 0 || this.slopeK > 0.05)
    ) {
      let p = this.gy(t.pos.x, t.pos.z) + ue.foot + 0.014 * d;
      this.gOK && t.pos.y < p && (t.pos.y = p);
    }
    t.g = t.g1;
  }
  stepLeg(t, e) {
    if (t.hold > 0 && t.t >= 0.5 && ((t.hold -= e), t.hold > 0)) return;
    t.t += e / t.dur;
    let s = t.t < 1 ? t.t : 1,
      n = b7(s),
      i = n + t.over * Math.sin(Math.PI * s) * n;
    ((t.pos.x = t.from.x + (t.to.x - t.from.x) * i),
      (t.pos.z = t.from.z + (t.to.z - t.from.z) * i),
      (t.gs = t.g0 + (t.g1 - t.g0) * n));
    let a = t.from.y - t.g0 - ue.foot;
    if (
      ((t.pos.y =
        t.gs +
        ue.foot +
        a * (1 - n) +
        (t.sLift + 0.45 * Math.abs(t.g1 - t.g0)) * wC(s)),
      t.t >= 1)
    ) {
      if (
        ((t.g = t.g1),
        Math.abs(t.pos.x - t.to.x) + Math.abs(t.pos.z - t.to.z) > 0.02)
      ) {
        let r = this.gy(t.pos.x, t.pos.z);
        this.gOK && (t.g = r);
      }
      (this.touch(t, t.str), (t.k = 0.5));
    }
  }
  body(t) {
    let e = this.state,
      s = this.legs,
      n = this.G,
      i = this.goal,
      a = 0.5 * (s[0].gs + s[1].gs),
      r = 0.5 * (s[2].gs + s[3].gs),
      l = 0.5 * (s[0].gs + s[2].gs),
      c = 0.5 * (s[1].gs + s[3].gs);
    if (this.air)
      ((this.supY.x = e.y),
        (this.supY.v = 0),
        (this.supT = e.y),
        (this.supV = 0),
        Io(this.supP, 0, 14, 1, t),
        Io(this.supR, 0, 14, 1, t));
    else {
      let K = 0.5 * (a + r),
        $ = 1 - Math.exp(-8 * t);
      ((this.supV += (Ys((K - this.supT) / t, -3, 3) - this.supV) * $),
        (this.supT = K));
      let n0 = as(30, 11, Pc(1.5, 3.5, this.speed));
      (Io(this.supY, K + this.supV * (2 / n0), n0, 1, t),
        Io(this.supP, Math.atan2(a - r, 2 * ue.hipZ) * 0.88, 16, 1, t),
        Io(this.supR, Math.atan2(c - l, 2 * Pf) * 0.32, 12, 1, t));
    }
    ((this.slope = Di(
      this.slope,
      this.air ? 0 : Ys((a - r) / 0.36, -1, 1),
      7,
      t,
    )),
      (this.slopeK = Math.abs(this.slope)));
    let h = s[0].load + s[1].load,
      f = s[2].load + s[3].load,
      u = s[0].load + s[2].load,
      d = s[1].load + s[3].load,
      m = h + f;
    ((this.gaitK = Di(this.gaitK, this.gaitOn ? 1 : 0, this.gaitOn ? 5 : 9, t)),
      (this.loadAvg = Di(this.loadAvg, m, 1.5 * n.f, t)));
    let p = this.trotK,
      x = this.gallopK,
      g = this.gaitK;
    (Io(
      this.bobS,
      -as(as(0.008, 0.014, p), 0.03, x) * (m - this.loadAvg) * g,
      14 * n.f,
      0.8,
      t,
    ),
      (this.gPitch = Di(
        this.gPitch,
        as(as(0.016, 0.006, p), 0.1, x) * (f - h) * g,
        7 * n.f,
        t,
      )),
      (this.gRoll = Di(
        this.gRoll,
        as(as(0.028, 0.008, p), 0.018, x) * (d - u) * g,
        9 * n.f,
        t,
      )),
      (this.gX = Di(
        this.gX,
        as(0.016, 0.003, Math.max(p, x)) * (d - u) * g,
        6 * n.f,
        t,
      )));
    let b = -(this.ax * this.sy + this.az * this.cy),
      v = this.ax * this.cy - this.az * this.sy,
      y = zc(b, v),
      M = this.air ? 0.25 : 1;
    (Io(this.pt, Ys(b * 0.0105, -0.2, 0.13) * M, 15.5, 0.42, t),
      Io(this.rl, Ys(-v * 0.017, -0.3, 0.3) * M, 16.5, 0.45, t),
      Io(this.hv, -Math.min(0.03, y * 0.0016) * M, 19, 0.42, t),
      Io(this.sx, Ys(-v * 0.0011, -0.03, 0.03) * M, 18, 0.5, t),
      Io(this.sz, Ys(b * 0.0013, -0.035, 0.035) * M, 18, 0.5, t),
      Io(this.yw, Ys(this.wy * 0.024, -0.13, 0.13), 17, 0.6, t));
    let w = i.idle * (1 - Pc(0.15, 0.9, this.sEff)),
      T = this.time;
    Io(this.idleX, this.idleTx * w, 4.2, 0.8, t);
    let S = Math.sin(T * 1.75),
      E = W1(T * 2.3, this.seed),
      _ = W1(T * 1.9 + 40, this.seed),
      R = w * (0.0045 * S + 0.0013 * E),
      C = w * (0.006 * Math.sin(T * 1.75 - 0.9) + 0.004 * _),
      L = w * 0.004 * W1(T * 1.3 + 80, this.seed) - this.idleX.x * 1.1,
      A = xe0,
      O = i.x + this.sx.x + this.gX + this.idleX.x,
      H = i.z + this.sz.x;
    ((A[0] = e.x + O * this.cy + H * this.sy),
      (A[1] =
        this.supY.x +
        i.h +
        this.bobS.x +
        this.hv.x +
        R -
        0.11 * this.slopeK * i.terrain),
      (A[2] = e.z - O * this.sy + H * this.cy),
      (A[3] = i.pitch + this.supP.x * i.terrain + this.pt.x + this.gPitch + C),
      (A[4] = i.roll + this.supR.x * i.terrain + this.rl.x + this.gRoll + L),
      (A[5] = i.yaw + this.yw.x));
    let F = this.io,
      P = this.fin,
      z = this.finV,
      k = this.finS,
      I = this.rawP,
      G = this.finOk ? this.blend : 0;
    if (G === 2)
      for (let K = 0; K < 6; K++)
        ((k[K] = z[K]), (F[K].x = P[K] + z[K] * t - A[K]), (F[K].v = 0));
    else if (G === 1)
      for (let K = 0; K < 6; K++) F[K].v = k[K] - (A[K] - I[K]) / t;
    this.blend = G === 2 ? 1 : 0;
    for (let K = 0; K < 6; K++) {
      G !== 2 && Io(F[K], 0, this.ioW, 1, t);
      let $ = A[K] + F[K].x;
      ((z[K] = this.finOk ? ($ - P[K]) / t : 0), (P[K] = $), (I[K] = A[K]));
    }
    if (((this.finOk = !0), !this.free && i.terrain > 0.5)) {
      let K = this.supY.x + i.h - i.sink,
        $ = K - P[1];
      $ > 0 && (P[1] = K - 0.04 * (1 - Math.exp(-$ / 0.04)));
    }
    (this.toLocal(this.bpos.set(P[0], P[1], P[2])),
      (this.pitch = P[3]),
      (this.roll = P[4]),
      (this.yawOff = P[5]),
      this.free
        ? this.bq.copy(this.fq)
        : this.bq.setFromEuler(de0.set(P[3], P[5], P[4], "YXZ")));
  }
  legD(t, e) {
    let s = e.x - t.side * ue.hipX,
      n = e.z - (t.front ? -ue.hipZ : ue.hipZ),
      i = s * s + e.y * e.y - ue.hipOut * ue.hipOut;
    return Math.sqrt((i > 1e-8 ? i : 1e-8) + n * n);
  }
  solve(t) {
    let e = this.legs,
      s = this.pose;
    for (let c = 0; c < 4; c++) {
      let h = e[c];
      if (h.mode !== zf) continue;
      let f = h.freeW,
        u = h.rel,
        d = h.relV,
        m = h.relT;
      ((Ha.x = u.x),
        (Ha.v = d.x),
        Io(Ha, m.x, f, 0.82, t),
        (u.x = Ha.x),
        (d.x = Ha.v),
        (Ha.x = u.y),
        (Ha.v = d.y),
        Io(Ha, m.y, f, 0.82, t),
        (u.y = Ha.x),
        (d.y = Ha.v),
        (Ha.x = u.z),
        (Ha.v = d.z),
        Io(Ha, m.z, f, 0.82, t),
        (u.z = Ha.x),
        (d.z = Ha.v));
    }
    this.bqi.copy(this.bq).invert();
    let n = 0,
      i = 0,
      a = 0;
    for (let c = 0; c < 4; c++) {
      let h = e[c],
        f = 1;
      if (h.mode === Ei || h.mode === $4) Wi.copy(h.pos);
      else if (h.mode === j4 && h.u > 0.3 && !h.nog)
        (Wi.set(
          h.p1.x - this.vx * h.tRem,
          h.g1 + ue.foot,
          h.p1.z - this.vz * h.tRem,
        ),
          (f = Pc(0.3, 0.75, h.u)));
      else continue;
      this.toLocal(Wi).sub(this.bpos).applyQuaternion(this.bqi);
      let u = this.legD(h, Wi);
      if (u <= IB) continue;
      let d = u - IB,
        m = ((d < 0.025 ? (d * d) / 0.05 : Math.min(d - 0.0125, 0.2)) / u) * f;
      (y7
        .set(
          (Wi.x - h.side * Pf) * m,
          Wi.y * m,
          (Wi.z - (h.front ? -ue.hipZ : ue.hipZ)) * m,
        )
        .applyQuaternion(this.bq),
        (n += y7.x),
        (i += y7.y),
        (a += y7.z));
    }
    let r = 0.14,
      l = Math.sqrt(n * n + i * i + a * a);
    if (l > r) {
      let c = r / l;
      ((n *= c), (i *= c), (a *= c));
    }
    (Io(this.aX, n, 42, 1, t),
      Io(this.aY, i, 42, 1, t),
      Io(this.aZ, a, 42, 1, t),
      (this.bpos.x += this.aX.x),
      (this.bpos.y += this.aY.x),
      (this.bpos.z += this.aZ.x),
      s.pos.copy(this.bpos),
      s.quat.copy(this.bq),
      this.toWorld(this.bodyW.copy(this.bpos)));
    for (let c = 0; c < 4; c++) {
      let h = e[c],
        f = s.leg[c];
      if ((h.bsP.copy(h.bs), h.mode === Zu)) {
        for (let u = 0; u < 3; u++)
          ((Ha.x = h.ang[u]),
            (Ha.v = h.angV[u]),
            Io(Ha, h.angT[u], h.poseW, 0.7, t),
            (h.ang[u] = Ha.x),
            (h.angV[u] = Ha.v),
            (f[u] = Ha.x));
        if ((hC(c, f, h.bs), h.floor)) {
          this.toWorld(Wi.copy(h.bs).applyQuaternion(this.bq).add(this.bpos));
          let u = this.gy(Wi.x, Wi.z) + ue.foot;
          Wi.y < u &&
            ((Wi.y = u),
            this.toLocal(Wi).sub(this.bpos).applyQuaternion(this.bqi),
            ev(c, Wi, f),
            h.bs.copy(Wi));
        }
        (this.toWorld(h.pos.copy(h.bs).applyQuaternion(this.bq).add(this.bpos)),
          (h.reach = 0));
        continue;
      }
      if (((h.strain = !1), h.mode === zf)) {
        if (
          (h.bs.copy(h.rel),
          this.fit(h, h.bs),
          this.toWorld(
            h.pos.copy(h.bs).applyQuaternion(this.bq).add(this.bpos),
          ),
          this.air && this.airT > 0.15)
        ) {
          let u = this.gy(h.pos.x, h.pos.z);
          this.gOK &&
            h.pos.y < u + ue.foot &&
            ((h.g = u),
            this.touch(h, 1),
            (h.landed = !0),
            this.skid < 0.9 && (this.skid = 0.9),
            this.toLocal(h.bs.copy(h.pos))
              .sub(this.bpos)
              .applyQuaternion(this.bqi));
        }
      } else if (
        (this.toLocal(h.bs.copy(h.pos))
          .sub(this.bpos)
          .applyQuaternion(this.bqi),
        h.mode === Ei)
      ) {
        let u = this.legD(h, h.bs),
          d = this.inward(h, h.bs);
        ((u > Z4 * 0.972 ||
          d - (h.inM < 1 ? Math.max(0, h.inM - d) * 1.3 : 0) < 0.012) &&
          (h.strain = !0),
          (h.inM = d));
      } else if (
        (h.mode === j4 || h.mode === $4) &&
        ((h.inM = 1),
        this.fit(h, h.bs) &&
          (this.toWorld(
            h.pos.copy(h.bs).applyQuaternion(this.bq).add(this.bpos),
          ),
          this.slopeK > 0.05 && h.mode === j4))
      ) {
        let u = this.gy(h.pos.x, h.pos.z) + ue.foot;
        this.gOK &&
          h.pos.y < u &&
          ((h.pos.y = u),
          this.toLocal(h.bs.copy(h.pos))
            .sub(this.bpos)
            .applyQuaternion(this.bqi));
      }
      ((h.miss = ev(c, h.bs, f)),
        (h.reachP = h.reach),
        (h.reach = this.legD(h, h.bs) / Z4),
        h.mode === Ei &&
          (f[0] <= zn.a[0] + 1e-4 ||
            f[0] >= zn.a[1] - 1e-4 ||
            f[1] <= zn.p[0] + 1e-4 ||
            f[1] >= zn.p[1] - 1e-4 ||
            f[2] <= zn.k[0] + 1e-4 ||
            f[2] >= zn.k[1] - 1e-4) &&
          (h.strain = !0));
    }
  }
  inward(t, e) {
    let s = -e.y;
    return s < 0.06
      ? 1
      : t.side * e.x -
          ue.hipX -
          (ue.hipOut * FB + ((s + ue.hipOut * HB) / FB) * HB);
  }
  fit(t, e) {
    let s = !1;
    e.y > -0.085 && ((e.y = -0.085), (s = !0));
    let n = this.legD(t, e);
    if (n < MC) {
      let a = t.side * Pf,
        r = t.front ? -ue.hipZ : ue.hipZ;
      if (n > 0.03) {
        let l = MC / n;
        ((e.x = a + (e.x - a) * l), (e.y *= l), (e.z = r + (e.z - r) * l));
      } else e.y = -MC - 0.02;
      ((s = !0), (n = this.legD(t, e)));
    }
    if (n > Z4 * 0.985) {
      let a = (Z4 * 0.985) / n,
        r = t.side * Pf,
        l = t.front ? -ue.hipZ : ue.hipZ;
      ((e.x = r + (e.x - r) * a),
        (e.y *= a),
        (e.z = l + (e.z - l) * a),
        (s = !0));
    }
    let i = this.inward(t, e);
    return (i < 0 && ((e.x -= t.side * i), (s = !0)), s);
  }
};
var xe0 = new Float64Array(6);
var Ha = {
  x: 0,
  v: 0,
};

export {
  Bn,
  Cn,
  Di,
  Ei,
  Io,
  K9Locomotion,
  Pc,
  Pf,
  Q5,
  RB,
  W1,
  Yp,
  Ys,
  Zu,
  as,
  av,
  co,
  f1,
  iv,
  x7,
  zc,
  zf,
};

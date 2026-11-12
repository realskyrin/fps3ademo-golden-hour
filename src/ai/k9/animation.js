// ai/k9/animation.js: recovered from the verified GOLDEN HOUR release.
import { Euler, Group, Quaternion, Vector3 } from "../../vendor/three-r180.js";
import {
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
} from "./locomotion.js";
import { cC, fB, l7, lC, sv, ue, xs, zn } from "./rig.js";

var BB = 0;
var T7 = 1;
var S7 = 2;
var J4 = 3;
var Qu = Vector3;
var Lf = new Qu();
var Df = new Qu();
var If = new Euler(0, 0, 0, "YXZ");
var OB = new Quaternion();
var w7 = new Quaternion();
var E7 = new Quaternion();
var NB = new Qu(0, 0.05, -0.4);
var be0 = new Qu(0, 0.06, -0.1);
var ye0 = new Qu(0, 0.07, 0.38);
var ve0 = [1, 0.84, 0.7];
var Me0 = [2.6, 3.8, 5];
var we0 = [0.45, 0.8, 1];
function UB(o) {
  ((o.gzY = co()),
    (o.gzP = co()),
    (o.latY = 0),
    (o.latP = 0),
    (o.gzOk = !1),
    (o.tiltS = co()),
    (o.headY = 0),
    (o.np = 0.25),
    (o.hpPrev = 0),
    (o.hpV = 0),
    (o.ear = [co(0.15), co(0.15)]),
    (o.jawS = co()),
    (o.tailS = [
      {
        y: co(),
        p: co(0.1),
      },
      {
        y: co(),
        p: co(0.05),
      },
      {
        y: co(),
        p: co(),
      },
    ]),
    (o.tb = new Qu()),
    (o.tbV = new Qu()),
    (o.tbA = new Qu()),
    (o.tbOk = !1),
    (o.scanT = 0.4),
    (o.scanYaw = 0),
    (o.scanPitch = -0.05),
    (o.scanSweep = 0),
    (o.curious = 0),
    (o.curSide = 1),
    (o.hadLook = !1),
    (o.twitchT = 1.5),
    (o.headPos = new Qu()));
}
function t6(o, t) {
  ((o.gzOk = !1),
    (o.tbOk = !1),
    (o.ear[0].x = t.ears[0]),
    (o.ear[1].x = t.ears[1]),
    (o.ear[0].v = o.ear[1].v = 0),
    (o.jawS.x = t.jaw),
    (o.jawS.v = 0));
  for (let e = 0; e < 3; e++)
    ((o.tailS[e].y.x = t.tail[e][0]),
      (o.tailS[e].p.x = t.tail[e][1]),
      (o.tailS[e].y.v = o.tailS[e].p.v = 0));
  ((o.tiltS.x = o.tiltS.v = 0), (o.np = t.neck[1]), (o.curious = 0));
}
function VB(o, t) {
  let e = o.state,
    s = o.goal,
    n = o.pose,
    i = e.yaw + o.yawOff;
  Lf.copy(NB).applyQuaternion(o.bq).add(o.bpos);
  let a, r;
  if (s.gaze === T7 && e.lookAt) {
    o.toLocal(Df.copy(e.lookAt));
    let R = Df.x - Lf.x,
      C = Df.y - (Lf.y + 0.07),
      L = Df.z - (Lf.z - 0.08);
    ((a = e.yaw + Math.atan2(-R, -L)),
      (r = Math.atan2(C, zc(R, L))),
      !o.hadLook &&
        s.alert < 0.6 &&
        ((o.curious = 1.1), (o.curSide = Bn(o.rng) < 0.5 ? -1 : 1)),
      (o.hadLook = !0));
  } else if (((o.hadLook = !1), s.gaze === S7)) {
    if (((o.scanT -= t), o.scanT <= 0)) {
      let R = Bn(o.rng);
      ((o.scanYaw =
        R < 0.22 ? (Bn(o.rng) - 0.5) * 0.3 : (Bn(o.rng) - 0.5) * 1.9),
        (o.scanPitch = -0.1 + (Bn(o.rng) - 0.5) * 0.3),
        (o.scanSweep = Bn(o.rng) < 0.3 ? (Bn(o.rng) < 0.5 ? -0.45 : 0.45) : 0),
        (o.scanT = 0.55 + Bn(o.rng) * 1.9),
        Bn(o.rng) < 0.22 &&
          ((o.curious = 0.9), (o.curSide = o.scanYaw > 0 ? 1 : -1)));
    }
    ((o.scanYaw = Ys(o.scanYaw + o.scanSweep * t, -1.05, 1.05)),
      (a = i + o.scanYaw),
      (r = o.scanPitch));
  } else
    s.gaze === J4
      ? ((a = i + s.gazeYaw), (r = s.gazePitch))
      : ((a = i + Ys(o.wy * 0.17, -0.75, 0.75)),
        (r = -0.05 - 0.04 * o.gallopK));
  ((a = i + Ys(Yp(a - i), -2, 2)),
    (r = Ys(r, -1.25, 1.1)),
    o.gzOk ||
      ((o.gzY.x = o.latY = a),
      (o.gzP.x = o.latP = r),
      (o.gzY.v = o.gzP.v = 0),
      (o.gzOk = !0),
      (o.headY = -1e9)));
  let l = s.gaze === J4 ? 0 : 0.03;
  ((Math.abs(Yp(a - o.latY)) > l || Math.abs(r - o.latP) > l) &&
    ((o.latY = a), (o.latP = r)),
    Io(o.gzY, o.gzY.x + Yp(o.latY - o.gzY.x), s.gazeW, 0.68, t),
    Io(o.gzP, o.latP, s.gazeW, 0.74, t));
  {
    let R = Yp(o.gzY.x - i);
    R > 2.05 ? (o.gzY.x = i + 2.05) : R < -2.05 && (o.gzY.x = i - 2.05);
  }
  ((o.curious = Math.max(0, o.curious - t)),
    Io(o.tiltS, s.tilt + o.curSide * 0.3 * Pc(0, 0.25, o.curious), 15, 0.5, t),
    OB.setFromEuler(
      If.set(
        o.gzP.x + s.headPitch,
        Yp(o.gzY.x - e.yaw) + s.headYaw,
        o.tiltS.x + s.headRoll,
        "YXZ",
      ),
    ),
    w7.copy(o.bqi).multiply(OB),
    If.setFromQuaternion(w7, "YXZ"));
  let c = If.y,
    h = If.x;
  o.np = Di(o.np, s.neck, 9, t);
  let f = Ys(c * 0.5, -zn.neckYaw, zn.neckYaw),
    u = Ys(o.np + 0.4 * h, zn.neckPitch[0], zn.neckPitch[1]);
  (E7.setFromEuler(If.set(u, f, 0, "YXZ")),
    Df.copy(be0).applyQuaternion(E7).add(NB).applyQuaternion(o.bq).add(o.bpos));
  let d = Df.y + e.y;
  (o.headY < -1e8 && (o.headY = d),
    (o.headY = Di(o.headY, d, 7, t)),
    s.stab > 0 &&
      ((u = Ys(
        u + Ys((o.headY - d) / 0.085, -0.4, 0.4) * 0.85 * s.stab,
        zn.neckPitch[0],
        zn.neckPitch[1],
      )),
      E7.setFromEuler(If.set(u, f, 0, "YXZ"))),
    w7.premultiply(E7.invert()),
    If.setFromQuaternion(w7, "YXZ"));
  let m = Ys(If.y, -zn.headYaw, zn.headYaw),
    p = Ys(If.x, zn.headPitch[0], zn.headPitch[1]),
    x = Ys(If.z, -zn.headRoll, zn.headRoll),
    g = s.script;
  (g !== 0
    ? ((n.neck[0] = as(f, s.sNeck[0], g)),
      (n.neck[1] = Ys(as(u, s.sNeck[1], g), zn.neckPitch[0], zn.neckPitch[1])),
      (m = as(m, s.sHead[0], g)),
      (p = Ys(as(p, s.sHead[1], g), zn.headPitch[0], zn.headPitch[1])),
      (x = as(x, s.sHead[2], g)))
    : ((n.neck[0] = f), (n.neck[1] = u)),
    (n.head[0] = m),
    (n.head[1] = p),
    (n.head[2] = x));
  let b = o.pitch + n.neck[1] + p;
  ((o.hpV = Di(o.hpV, (b - o.hpPrev) / t, 30, t)),
    (o.hpPrev = b),
    (o.twitchT -= t),
    o.twitchT <= 0 &&
      ((o.twitchT = 1.1 + Bn(o.rng) * 3.2),
      s.idle > 0.3 &&
        (o.ear[Bn(o.rng) < 0.5 ? 0 : 1].v +=
          (Bn(o.rng) < 0.6 ? -1 : 1) * (5 + Bn(o.rng) * 5))));
  for (let R = 0; R < 2; R++) {
    let C = o.ear[R];
    ((C.v -= Ys(o.hpV, -12, 12) * 9 * t + o.tiltS.v * (R ? -1 : 1) * 5 * t),
      Io(C, s.ears[R], s.earW, 0.3, t),
      C.x < zn.ear[0]
        ? ((C.x = zn.ear[0]), C.v < 0 && (C.v *= -0.3))
        : C.x > zn.ear[1] && ((C.x = zn.ear[1]), C.v > 0 && (C.v *= -0.3)),
      (n.ears[R] = C.x));
  }
  (Io(o.jawS, s.jaw, 52, 0.6, t),
    (n.jaw = Ys(o.jawS.x, zn.jaw[0], zn.jaw[1])),
    o.toWorld(Lf.copy(ye0).applyQuaternion(o.bq).add(o.bpos)),
    o.tbOk ||
      (o.tb.copy(Lf), o.tbV.set(0, 0, 0), o.tbA.set(0, 0, 0), (o.tbOk = !0)));
  let v = (Lf.x - o.tb.x) / t,
    y = (Lf.y - o.tb.y) / t,
    M = (Lf.z - o.tb.z) / t,
    w = 1 - Math.exp(-26 * t);
  ((o.tbA.x += (Ys((v - o.tbV.x) / t, -70, 70) - o.tbA.x) * w),
    (o.tbA.y += (Ys((y - o.tbV.y) / t, -70, 70) - o.tbA.y) * w),
    (o.tbA.z += (Ys((M - o.tbV.z) / t, -70, 70) - o.tbA.z) * w),
    o.tbV.set(v, y, M),
    o.tb.copy(Lf),
    Df.set(
      o.tbA.x * o.cy - o.tbA.z * o.sy,
      o.tbA.y,
      o.tbA.x * o.sy + o.tbA.z * o.cy,
    ).applyQuaternion(o.bqi));
  let T = -(o.vx * o.sy + o.vz * o.cy),
    S = 0.0034 * T * Math.abs(T),
    E = s.wag,
    _ = o.time * 17;
  for (let R = 0; R < 3; R++) {
    let C = o.tailS[R],
      L = s.tailW * ve0[R],
      A = Me0[R] * (1.25 - s.tailZ);
    ((C.y.v += -Df.x * A * t),
      (C.p.v += (Df.y * 0.77 - Df.z * 0.64) * A * t),
      Io(
        C.y,
        s.tail[R][0] + E * we0[R] * 0.42 * Math.sin(_ - R * 0.9),
        L,
        s.tailZ,
        t,
      ),
      Io(C.p, s.tail[R][1] + S * (0.5 + 0.35 * R), L, s.tailZ, t),
      (C.y.x = Ys(C.y.x, -1.2, 1.2)),
      (C.p.x = Ys(C.p.x, -1.75, 1.3)),
      (n.tail[R][0] = C.y.x),
      (n.tail[R][1] = C.p.x));
  }
}
var rr = {
  deploy: 1.7,
  windup: 0.28,
  takedown: 0.75,
  stagger: 0.35,
  die: 1.4,
  blast: 1.4,
  expire: 2.3,
  bark: 0.8,
  sit: 0.6,
  stand: 0.42,
};
var t3 = Vector3;
var Uo = new t3();
var GB = new t3();
var Fa = new t3();
var e6 = new t3();
var Jr = new Quaternion();
var WB = new Quaternion();
var TC = new Euler(0, 0, 0, "YXZ");
var Lh = (o, t, e) => o >= e && o - t < e;
var rv = (o) => o === "idle" || o === "move" || o === "stagger";
var qB = (o) => (o ? -ue.hipZ : ue.hipZ);
var KB = -(ue.stand - ue.foot);
var Ee0 = [0, 0.09, 0.3, 0.42];
var $B = [2, 3, 0, 1];
var Te0 = [3, 2, 1, 0];
var Se0 = [0, 3, 1, 2];
var _e0 = [1, 2, 0, 3];
var Re0 = [0, 3, 1, 2];
var Ae0 = [0, 0.1, 0.32, 0.44];
var ke0 = [1, 1.13, 1.3, 1.43];
var Ce0 = [0.4, 0.2, 0.1];
var Pe0 = [
  [-0.4, 0.9, 0.5],
  [0.05, 0.9, 1.7],
  [-0.3, -1.3, 2.2],
  [0, -0.3, 0.9],
];
function ZB(o) {
  ((o.modeT = 0),
    (o.prevMode = "none"),
    (o.deployT = -1),
    (o.barkT = -1),
    (o.barkLeg = 0),
    (o.standT = 9),
    (o.dieT = -1),
    (o.dieKind = "shot"),
    (o.dieSide = 1),
    (o.dieDur = rr.die),
    (o.frozen = !1),
    (o.stillT = 0),
    (o.hitL = {
      x: 0,
      z: 1,
      ok: !1,
    }),
    (o.flinchT = 9),
    (o.blinkT = 0),
    (o.alertK = 0),
    (o.leapPitch = 0),
    (o.leapH = 0.45),
    (o.vyLast = 0),
    (o.scriptK = 0),
    (o.sig = {
      power: 0,
      alert: 0,
      damage: 0,
      charge: 0,
      shock: 0,
    }),
    (o.bp = new t3()),
    (o.bv = new t3()),
    (o.bw = new t3()),
    (o.bounces = 0),
    (o.blastRest = 0),
    (o.pawDur = 1),
    (o.shakeT = -1));
}
function lv(o, t, e, s) {
  let n = o.state;
  return (
    (s.x = n.x + t * o.cy + e * o.sy),
    (s.z = n.z - t * o.sy + e * o.cy),
    s
  );
}
function QB(o, t, e = 1) {
  let s = Ys(e, 0.15, 2),
    n = 0,
    i = 1;
  if (t) {
    let a = t.x * o.cy - t.z * o.sy,
      r = t.x * o.sy + t.z * o.cy,
      l = zc(a, r);
    l > 1e-4 && ((n = a / l), (i = r / l));
  }
  ((o.hitL.x = n),
    (o.hitL.z = i),
    (o.hitL.ok = !0),
    (o.sx.v += n * 0.85 * s),
    (o.sz.v += i * 0.85 * s),
    (o.rl.v -= n * 3.6 * s),
    (o.pt.v += i * 2.6 * s),
    (o.hv.v -= 0.4 * s),
    (o.yw.v += n * i * 2.2 * s),
    o.gzOk && ((o.gzY.v -= n * 7 * s), (o.gzP.v -= 3.5 * s)),
    (o.ear[0].v -= 13 * s),
    (o.ear[1].v -= 13 * s),
    (o.flinchT = 0),
    (o.blinkT = 0.07),
    o.limpLeg < 0 && (o.limpLeg = (i > 0.2 ? 0 : 2) + (n > 0 ? 0 : 1)));
}
function JB(o) {
  if (o.mode !== "idle" && o.mode !== "move") return 0;
  o.barkT = 0;
  let t = Bn(o.rng) < 0.5 ? 0 : 1;
  return (
    o.state.lookAt &&
      (o.toLocal(Uo.copy(o.state.lookAt)),
      Math.abs(Uo.x) > 0.3 && (t = Uo.x > 0 ? 0 : 1)),
    (o.barkLeg = t),
    (o.hv.v -= 0.3),
    (o.pt.v -= 0.5),
    rr.bark
  );
}
function tU(o) {
  return ((o.deployT = 0), (o.dieT = -1), (o.frozen = !1), rr.deploy);
}
function eU(o, t, e = "shot") {
  if (
    ((o.dieKind = e === "blast" || e === "expire" ? e : "shot"),
    (o.dieT = 0),
    (o.frozen = !1),
    (o.stillT = 0),
    (o.deadClear = 0),
    (o.dieDur =
      o.dieKind === "blast"
        ? rr.blast
        : o.dieKind === "expire"
          ? rr.expire
          : rr.die),
    t)
  ) {
    let s = t.x * o.cy - t.z * o.sy,
      n = t.x * o.sy + t.z * o.cy,
      i = zc(s, n);
    i > 1e-4 && ((o.hitL.x = s / i), (o.hitL.z = n / i), (o.hitL.ok = !0));
  }
  return (
    (o.dieSide =
      Math.abs(o.hitL.x) > 0.25 && o.hitL.ok
        ? o.hitL.x > 0
          ? 1
          : -1
        : Bn(o.rng) < 0.5
          ? -1
          : 1),
    (o.dieInit = !1),
    o.dieDur
  );
}
function sU(o) {
  ((o.live = !1),
    (o.mode = "none"),
    (o.modeT = 0),
    (o.deployT = -1),
    (o.barkT = -1),
    (o.dieT = -1),
    (o.frozen = !1),
    (o.standT = 9),
    (o.limpLeg = -1),
    (o.limpK = 0),
    (o.hitL.ok = !1),
    (o.free = !1),
    (o.air = !1),
    (o.pawLeg = -1),
    (o.alertK = 0),
    (o.scriptK = 0),
    (o.sig.power = o.sig.alert = o.sig.damage = o.sig.charge = o.sig.shock = 0),
    (o.shakeT = -1));
}
function nU(o, t) {
  let e = o.state,
    s = o.goal,
    n = e.mode;
  if (n !== o.mode) {
    let l = o.mode;
    ((o.prevMode = l), (o.mode = n), (o.modeT = 0), Le0(o, n, l));
  } else o.modeT += t;
  ((o.alertK = Di(o.alertK, e.alert, 8, t)),
    (o.flinchT += t),
    (o.blinkT -= t),
    ze0(o));
  let i = n === "leap" || (!e.grounded && rv(n));
  if (i && !o.air) {
    ((o.air = !0),
      (o.airT = 0),
      (o.blend = 2),
      (o.leapPitch = o.pitch),
      (o.leapH = o.fin[1] - o.supY.x));
    for (let l of o.legs) l.landed = !1;
  } else !i && o.air && ((o.air = !1), (o.blend = 2), rv(n) && Ue0(o));
  let a = 0;
  switch (n) {
    case "deploy":
      a = We0(o, t);
      break;
    case "sit":
      aU(o, av(o.modeT, 0.1, 0.52, 0.05), o.modeT, t, !0);
      break;
    case "windup":
      De0(o, t);
      break;
    case "leap":
      rU(o, t, 0.85, !0);
      break;
    case "takedown":
      Ve0(o, t);
      break;
    case "dead":
      a = Ke0(o, t);
      break;
    default:
      oU(o, t, n);
  }
  if (
    ((o.scriptK = a >= 0 ? Di(o.scriptK, a, 16, t) : -a),
    (s.script = o.scriptK),
    n !== "dead")
  ) {
    o.flinchT < 0.22 &&
      ((s.ears[0] = Math.min(s.ears[0], -0.8)),
      (s.ears[1] = Math.min(s.ears[1], -0.8)));
    let l = Pc(0.38, 0.16, e.hp);
    ((o.limpK = Di(o.limpK, l, 3, t)),
      l > 0 && o.limpLeg < 0 && (o.limpLeg = Math.floor(Bn(o.rng) * 4) & 3));
    let c = o.limpK;
    if (c > 0.01 && n !== "deploy") {
      let h = o.limpLeg & 1 ? 1 : -1;
      ((s.roll += h * 0.05 * c),
        (s.x -= h * 0.016 * c),
        (s.neck -= 0.24 * c),
        (s.headPitch -= 0.07 * c),
        (s.h -= 0.02 * c),
        (s.ears[0] -= 0.35 * c),
        (s.ears[1] -= 0.15 * c),
        (s.tail[0][1] += 0.3 * c),
        (s.tail[1][1] += 0.15 * c));
      let f = W1(o.time * 21, o.seed + 3),
        u = W1(o.time * 5.3, o.seed + 9);
      f > 0.45 - 0.25 * c && u > -0.2 && (s.power *= 0.25 + 0.3 * Bn(o.rng));
    }
    (o.blinkT > 0 && (s.power *= 0.3), o.shakeT >= 0 && qe0(o, t));
  } else o.shakeT = -1;
  let r = o.sig;
  ((r.power = s.power),
    (r.alert = s.alert),
    (r.charge = s.charge),
    (r.shock = s.shock),
    (r.damage =
      n === "dead"
        ? Math.max(
            r.damage,
            o.dieKind === "expire" ? 0 : o.dieKind === "blast" ? 1 : 0.8,
          )
        : Pc(0.8, 0.12, e.hp)));
}
function ze0(o) {
  let t = o.goal,
    e = o.state,
    s = o.G,
    n = o.alertK,
    i = o.gallopK,
    a = o.trotK;
  ((t.h = ue.stand - s.crouch - 0.012 * n),
    (t.x = t.z = t.pitch = t.roll = t.yaw = 0),
    (t.terrain = 1),
    (t.sink = 0.2),
    (t.gait = !0),
    (t.settle = !0),
    (t.idle = 1),
    (t.gaze = e.lookAt ? T7 : o.sEff > 0.45 ? BB : S7),
    (t.gazeW = 26 + 8 * n),
    (t.gazeYaw = t.gazePitch = 0),
    (t.neck = 0.25 + 0.1 * n - 0.06 * a - 0.3 * i),
    (t.stab = 1),
    (t.tilt = 0),
    (t.headRoll = t.headYaw = t.headPitch = 0),
    (t.ears[0] = t.ears[1] = as(as(0.15, 0.5, n), -0.75, i)),
    (t.earW = 34),
    (t.tail[0][0] = t.tail[1][0] = t.tail[2][0] = 0),
    (t.tail[0][1] = as(as(0.1, -0.22, n), 0.42, i)),
    (t.tail[1][1] = 0.05 + 0.1 * i),
    (t.tail[2][1] = 0.04 * i),
    (t.tailW = 20),
    (t.tailZ = 0.24),
    (t.wag = 0),
    (t.jaw = 0),
    (t.power = 1),
    (t.alert = e.alert),
    (t.charge = 0),
    (t.shock = 0),
    (o.cadence = 1),
    (o.spread = 0.02));
}
function Le0(o, t, e) {
  let s = o.state,
    n = o.legs;
  if (e === "none" || e === "folded") {
    if ((o.snap(), t === "deploy")) {
      for (let i of n)
        (o.footOfPose(i.i, o.P_FOLD, Uo), o.plant(i, Uo.x, Uo.z));
      (t6(o, o.P_FOLD), (o.scriptK = 1), o.deployT < 0 && (o.deployT = 0));
    } else (t6(o, o.P_STAND), (o.scriptK = 0));
  } else (rv(t) && rv(e)) || (o.blend = 2);
  switch (
    (e === "sit" && rv(t) && (o.standT = 0),
    e === "deploy" && (o.deployT = -1),
    t !== "idle" && t !== "move" && ((o.barkT = -1), iU(o)),
    t)
  ) {
    case "windup":
      for (let i of n) i.mode !== Ei && o.land(i, 0.05, 0.4);
      break;
    case "takedown": {
      for (let i of n)
        (lv(o, i.side * (i.front ? 0.29 : 0.25), i.front ? -0.55 : 0.37, Uo),
          o.step(
            i,
            Uo.x,
            Uo.z,
            i.mode === Ei ? 0.09 : i.front ? 0.04 : 0.07,
            i.mode === Ei ? 0.03 : 0,
            0,
            i.front ? 1 : 0.7,
          ));
      ((o.hv.v -= 0.4),
        (o.pt.v -= 0.8),
        (o.finV[1] *= 0.3),
        (o.finV[3] *= 0.1));
      break;
    }
    case "stagger": {
      let i = o.hitL,
        a = 1;
      ((o.sx.v += i.x * 1.5 * a),
        (o.sz.v += i.z * 1.5 * a),
        (o.rl.v -= i.x * 4.5),
        (o.pt.v += i.z * 3.6),
        (o.hv.v -= 0.7),
        (o.yw.v += (Bn(o.rng) - 0.5) * 5),
        o.gzOk && ((o.gzY.v -= i.x * 10), (o.gzP.v -= 6)),
        (o.blinkT = 0.1),
        (o.settleT = 0));
      break;
    }
    case "dead":
      o.dieT < 0 &&
        ((o.dieT = 1e3),
        (o.dieKind = "shot"),
        (o.dieDur = rr.die),
        (o.dieInit = !1));
      break;
  }
}
function oU(o, t, e) {
  let s = o.state,
    n = o.goal,
    i = o.legs;
  if (o.air) {
    rU(o, t, 0.5, !1);
    return;
  }
  o.landT += t;
  let a = o.sEff < 0.15;
  if (e === "stagger") {
    let r = o.modeT,
      l = rr.stagger;
    ((n.h -= 0.07 * f1(r, 0, l * 1.1)),
      (n.idle = 0),
      (o.cadence = 1.45),
      (o.spread = 0.05),
      (n.ears[0] = n.ears[1] = -0.8),
      (n.jaw = 0.32 * f1(r, 0, 0.26)),
      (n.neck -= 0.2 * f1(r, 0, l)));
    for (let c = 0; c < 4; c++)
      if (Lh(r, t, c * 0.065)) {
        let h = o.hitL.x >= 0 ? _e0[c] : Re0[c],
          f = i[h];
        f.mode === Ei &&
          !o.gaitOn &&
          (lv(o, o.hitL.x * 0.13, o.hitL.z * 0.13, Uo),
          o.step(
            f,
            f.home.x + Uo.x - s.x,
            f.home.z + Uo.z - s.z,
            0.1,
            0.05,
            0,
            0.5,
          ));
      }
    ((r > 0.03 && r < 0.07) || (r > 0.14 && r < 0.17)) && (n.power *= 0.35);
    return;
  }
  if (e === "idle" && a && o.barkT < 0) {
    if (
      ((o.idleT -= t),
      o.idleT <= 0 &&
        (Bn(o.rng) < 0.5 || o.limpK > 0.2
          ? (o.idleTx =
              (Bn(o.rng) < 0.5 ? -1 : 1) * (0.012 + 0.014 * Bn(o.rng)))
          : o.pawLeg < 0 &&
            ((o.pawLeg = Bn(o.rng) < 0.5 ? 0 : 1),
            (o.pawT = 0),
            (o.pawDur = 1 + Bn(o.rng) * 1.4),
            (o.idleTx = -i[o.pawLeg].side * 0.022)),
        (o.idleT = 2.2 + Bn(o.rng) * 3.8)),
      n.gaze === S7)
    ) {
      let r = o.scanYaw > 0 ? 0 : 1;
      ((n.ears[r] += 0.38), (n.ears[1 - r] += 0.08));
    }
    s.lookAt &&
      o.alertK < 0.25 &&
      (o.toLocal(Uo.copy(s.lookAt)),
      Uo.x * Uo.x + Uo.z * Uo.z < 9 && ((n.wag = 0.45), (n.tail[0][1] -= 0.2)));
  }
  if (o.pawLeg >= 0) {
    let r = i[o.pawLeg];
    ((o.pawT += t),
      !a || e !== "idle" || o.pawT > o.pawDur || o.barkT >= 0
        ? iU(o)
        : o.pawT > 0.28 &&
          (r.mode === Ei || r.mode === zf) &&
          o.freeLeg(r, r.side * (Pf - 0.005), KB + 0.085, qB(!0) + 0.055, 12));
  }
  if (o.barkT >= 0) {
    o.barkT += t;
    let r = o.barkT,
      l = rr.bark,
      c = i[o.barkLeg],
      h = 1 - Pc(0.5, 1.3, o.sEff),
      f = Cn(r, 0.05, 0.2) * (1 - Cn(r, l - 0.2, l)) * h;
    ((n.h -= 0.075 * f),
      (n.z -= 0.06 * f),
      (n.pitch -= 0.045 * f),
      (n.idle = 1 - Pc(0, 0.05, r) * (1 - Cn(r, l - 0.1, l))),
      h > 0.5 && ((n.gait = !1), (n.settle = !1)),
      (n.gazeW = 44),
      (n.neck = as(n.neck, -0.14, f)),
      (n.alert = Math.max(n.alert, 1 - Cn(r, l - 0.15, l + 0.2))),
      (n.ears[0] = n.ears[1] = 0.68),
      (n.earW = 46),
      (n.tail[0][1] = as(n.tail[0][1], 0.66, f)),
      (n.tail[1][1] = as(n.tail[1][1], 0.03, f)),
      (n.tail[2][1] = 0),
      (n.tailW = 46),
      (n.tailZ = 0.85),
      (n.jaw =
        0.45 * (f1(r, 0.03, 0.14) + f1(r, 0.2, 0.31) + f1(r, 0.37, 0.48))),
      r > 0.07 && r < l - 0.22 && h > 0.5
        ? (c.mode === Ei || c.mode === zf) &&
          o.freeLeg(
            c,
            c.side * (Pf - 0.012),
            KB + 0.075 + 0.165,
            qB(!0) + 0.05,
            22,
          )
        : c.mode === zf && o.step(c, c.home.x, c.home.z, 0.13, 0, 0, 0.3),
      r >= l && (o.barkT = -1));
  }
  (o.standT < rr.stand + 0.2 &&
    ((o.standT += t), aU(o, 1 - av(o.standT, 0, rr.stand, 0.04), 0, t, !1)),
    e === "move" && (n.idle = 0.6));
}
function iU(o) {
  if (o.pawLeg < 0) return;
  let t = o.legs[o.pawLeg];
  ((o.pawLeg = -1),
    (o.idleTx = 0),
    t.mode === zf && o.step(t, t.home.x, t.home.z, 0.15, 0, 0, 0.16));
}
function aU(o, t, e, s, n) {
  let i = o.goal,
    a = o.legs,
    r = o.state;
  if (((i.h = as(i.h, 0.4, t)), (i.z += 0.06 * t), (i.pitch += 0.62 * t), !n))
    return;
  ((i.gait = !1), (i.settle = !1), (i.idle = 0.6));
  let l = Ee0,
    c = $B;
  for (let h = 0; h < 4; h++)
    if (Lh(e, s, l[h]) || (e === 0 && h === 0)) {
      let f = a[c[h]];
      (lv(o, f.side * (f.front ? 0.21 : 0.25), f.front ? -0.36 : 0.22, Uo),
        o.step(f, Uo.x, Uo.z, 0.13, f.mode === Ei ? 0.03 : 0, 0, 0.15));
    }
  ((i.neck = as(i.neck, -0.3, t)),
    (i.ears[0] = 0.42),
    (i.ears[1] = 0.3),
    (i.tail[0][1] = as(i.tail[0][1], -0.5, t)),
    (i.tail[1][1] = 0.1),
    (i.tail[2][1] = 0.1),
    r.lookAt &&
      o.alertK < 0.3 &&
      e > 0.5 &&
      ((i.wag = 0.55 + 0.45 * Math.max(0, W1(o.time * 0.6, o.seed + 5))),
      W1(o.time * 0.33, o.seed + 2) > 0.35 &&
        (i.tilt = 0.26 * (W1(o.time * 0.2, o.seed) > 0 ? 1 : -1))));
}
function De0(o, t) {
  let e = o.goal,
    s = o.modeT,
    n = iv(s / rr.windup);
  ((e.gait = o.sEff > 0.7),
    (e.idle = 0),
    (e.h -= 0.2 * Cn(n, 0, 0.72)),
    (e.z += 0.085 * Cn(n, 0, 0.7)),
    (e.pitch += -0.065 * f1(n, 0, 0.6) + 0.2 * Cn(n, 0.42, 1)),
    (e.roll += 0.007 * n * Math.sin(s * 138)),
    (e.gazeW = 44),
    (e.neck = as(e.neck, -0.1, Cn(n, 0, 0.5))),
    (e.stab = 0.5),
    (e.ears[0] = e.ears[1] = -0.7),
    (e.earW = 46),
    (e.tail[0][1] = 0.62),
    (e.tail[1][1] = 0.1),
    (e.tail[2][1] = 0.05),
    (e.tail[2][0] = 0.1 * n * Math.sin(s * 88)),
    (e.tailW = 40),
    (e.tailZ = 0.6),
    (e.jaw = 0.55 * Cn(n, 0.15, 0.9)),
    (e.charge = n),
    (e.alert = 1));
}
var Ie0 = [0.16, -0.17, -0.82];
var He0 = [0.15, -0.27, -0.52];
var Fe0 = [0.19, -0.49, -0.61];
var Oe0 = [0.17, -0.27, 0.86];
var Ne0 = [0.17, -0.31, 0.6];
var Be0 = [0.2, -0.46, 0.22];
function rU(o, t, e, s) {
  let n = o.state,
    i = o.goal,
    a = o.legs;
  o.airT += t;
  let r = n.vy !== 0 || n.vx !== 0 || n.vz !== 0 ? n.vy : o.vyM,
    l = Math.max(zc(n.vx, n.vz), o.speed);
  o.vyLast = r;
  let c = Ys(r / 3.2, -1, 1),
    h = c > 0 ? c : 0,
    f = c < 0 ? -c : 0;
  ((o.leapPitch = Di(
    o.leapPitch,
    Ys(Math.atan2(r, Math.max(l, 1.4)) * e, -0.55, 0.72),
    15,
    t,
  )),
    (o.leapH = Di(o.leapH, 0.45, 7, t)),
    (i.pitch = o.leapPitch),
    (i.h = o.leapH),
    (i.terrain = 0),
    (i.gait = !1),
    (i.settle = !1),
    (i.idle = 0));
  for (let u = 0; u < 4; u++) {
    let d = a[u];
    if (
      d.mode !== zf &&
      (d.landed && d.reach > 0.9 && (d.landed = !1),
      d.mode === Zu ||
        d.landed ||
        (d.front
          ? o.airT < 0.025
          : d.reach < 0.9 && o.airT < 0.1 && d.mode === Ei))
    )
      continue;
    let m = d.front ? (c >= 0 ? Ie0 : Fe0) : c >= 0 ? Oe0 : Be0,
      p = d.front ? He0 : Ne0,
      x = h + f,
      g = (d.side > 0 ? 0.035 : -0.035) * (d.front ? 1 : -1);
    o.freeLeg(
      d,
      d.side * as(p[0], m[0], x),
      as(p[1], m[1], x),
      as(p[2], m[2], x) + g,
      s ? 30 : 22,
    );
  }
  (s &&
    ((i.gazeW = 44),
    (i.neck = 0.02),
    (i.stab = 0),
    (i.jaw = 0.7 * Cn(o.airT, 0, 0.12)),
    (i.charge = 1),
    (i.alert = 1),
    (i.tail[2][0] = 0.12 * Math.sin(o.time * 70))),
    (i.ears[0] = i.ears[1] = -0.85),
    (i.tail[0][1] = 0.55),
    (i.tail[1][1] = 0.15),
    (i.tail[2][1] = 0.05),
    (i.tailZ = 0.3));
}
function Ue0(o) {
  let t = Ys(-Math.min(o.vyLast, 0), 0, 9);
  for (let e of o.legs) e.mode !== Ei && o.land(e, e.front ? 0.03 : 0.065, 1);
  ((o.hv.v -= 0.25 + 0.12 * t),
    (o.pt.v -= 0.5 + 0.3 * t),
    (o.landT = 0),
    (o.skid = Ys(o.speed / 7, 0, 0.8)));
}
function Ve0(o, t) {
  let e = o.goal,
    s = o.modeT,
    n = rr.takedown,
    i = n / 0.75;
  ((e.gait = !1), (e.settle = !1), (e.idle = 0), (e.sink = 0.09));
  let a = Math.max(
      f1(s, 0.09 * i, 0.23 * i),
      f1(s, 0.28 * i, 0.42 * i),
      f1(s, 0.46 * i, 0.6 * i),
    ),
    r = Cn(s, n - 0.15, n);
  for (let l = 0; l < 3; l++)
    Lh(s, t, (0.09 + 0.19 * l) * i) && ((o.hv.v += 0.55), (o.pt.v += 0.9));
  ((e.h = 0.43 + 0.03 * a + 0.07 * r),
    (e.z = -0.06 * (1 - r)),
    (e.pitch = -0.24 + 0.05 * a + 0.18 * r),
    (e.roll = 0.03 * a * Math.sin(s * 195)),
    (e.yaw = 0.018 * a * Math.sin(s * 171)),
    (e.x = 0.004 * a * Math.sin(s * 233)),
    (o.spread = 0.05),
    (e.gazeW = 44),
    (e.neck = -0.25 + 0.3 * r),
    (e.stab = 0),
    (e.headYaw = 0.13 * a * Math.sin(s * 57)),
    (e.headRoll = 0.1 * a * Math.sin(s * 57 + 1.1)),
    (e.jaw =
      as(0.7, 0.1, Cn(s, 0.02, 0.07)) +
      0.03 * a * Math.sin(s * 201) +
      0.32 * f1(s, n - 0.15, n - 0.01)),
    (e.ears[0] = e.ears[1] = -0.85),
    (e.tail[0][1] = -0.45),
    (e.tail[1][1] = -0.1),
    (e.tail[2][1] = 0),
    (e.tail[1][0] = 0.1 * a * Math.sin(s * 150)),
    (e.tail[2][0] = 0.16 * a * Math.sin(s * 150 + 1)),
    (e.tailW = 46),
    (e.tailZ = 0.5),
    (e.shock = a),
    (e.charge = 1 - s / n),
    (e.alert = 1));
}
var SC = {
  relay: 0,
  whine: [0.02, 0.55],
  unlock: [0.1, 0.17, 0.24, 0.31],
  lift1: [0.36, 0.5],
  lift2: [0.53, 0.65],
  head: 0.62,
  ears: [0.71, 0.75],
  antenna: 0.78,
  taps: [0.8, 0.83, 0.86, 0.89],
  shake: [0.91, 1],
};
var lU = 0.4;
var Ge0 = 8.5;
function We0(o, t) {
  let e = o.state,
    s = o.goal,
    n = o.legs,
    i = rr.deploy,
    a = SC;
  if ((o.deployT === 0 && (o.hv.v += 0.12), (o.deployT += t), o.deployT >= i))
    return (oU(o, t, "idle"), 0);
  let r = o.deployT / i,
    l = t / i;
  ((s.gait = !1),
    (s.settle = !1),
    (s.idle = Cn(r, 0.8, 1)),
    (s.terrain = Cn(r, 0.55, 0.75)));
  let c =
    r < 0.02
      ? 0
      : r < 0.04
        ? 0.55
        : r < 0.065
          ? 0
          : r < 0.08
            ? 0.8
            : r < 0.12
              ? 0.12
              : as(0.15, 0.62, Cn(r, 0.12, 0.55));
  ((c = Math.max(c, Cn(r, a.head, a.head + 0.07))), (s.power = c));
  let h = f1(r, 0, 0.13),
    f = Te0;
  for (let g = 0; g < 4; g++)
    if (Lh(r, l, a.unlock[g])) {
      let b = n[f[g]];
      (lv(o, b.side * 0.05, -0.035, Uo),
        o.step(
          b,
          b.pos.x + Uo.x - e.x,
          b.pos.z + Uo.z - e.z,
          0.062 * i,
          0.06,
          0.5,
          0.16,
        ),
        (o.rl.v += b.side * 1.5),
        (o.pt.v += b.front ? 0.9 : -0.9),
        (o.hv.v += 0.22));
    }
  let u = av(r, a.lift1[0], a.lift1[1], 0.07),
    d = av(r, a.lift2[0], a.lift2[1], 0.055),
    m = Cn(r, 0.03, 0.1) * (1 - u);
  ((s.h =
    ue.rest +
    0.022 * m +
    (0.33 - ue.rest) * u +
    (ue.stand - 0.33) * d +
    0.003 * h * Math.sin(r * 335)),
    (s.pitch = -0.3 * u + 0.3 * d + 0.012 * h * Math.sin(r * 290)),
    (s.roll = 0.022 * h * Math.sin(r * 255)));
  let p = Se0,
    x = 0.046;
  for (let g = 0; g < 4; g++)
    if (Lh(r, l, a.taps[g] - x)) {
      let b = n[p[g]];
      o.step(b, b.home.x, b.home.z, x * i, 0.05, 0, 0.26);
    }
  if (
    (Lh(r, l, a.shake[0] - 0.006) && (o.shakeT = 0),
    (s.sNeck[0] = 0),
    (s.sNeck[1] = o.P_FOLD.neck[1]),
    (s.sHead[0] = 0),
    (s.sHead[1] = o.P_FOLD.head[1]),
    (s.sHead[2] = 0),
    (s.stab = Cn(r, 0.72, 0.8)),
    r < 0.975 || !e.lookAt
      ? ((s.gaze = J4), (s.gazeYaw = 0), (s.gazePitch = 0))
      : ((s.gaze = T7), (s.gazeW = 46)),
    (s.neck = 0.25 + 0.1 * Cn(r, 0.95, 1)),
    (s.ears[0] = r < a.ears[0] ? -0.8 : 0.4 + 0.22 * Cn(r, 0.97, 1)),
    (s.ears[1] = r < a.ears[1] ? -0.8 : 0.4 + 0.1 * Cn(r, 0.97, 1)),
    (s.earW = 48),
    r < a.antenna)
  ) {
    for (let g = 0; g < 3; g++) s.tail[g][1] = o.P_FOLD.tail[g][1];
    ((s.tailW = 30), (s.tailZ = 1));
  } else
    ((s.tail[0][1] = -0.3),
      (s.tail[1][1] = -0.05),
      (s.tail[2][1] = 0),
      (s.tailW = 26),
      (s.tailZ = as(0.09, 0.24, Cn(r, 0.86, 1))));
  return (
    Lh(r, l, a.antenna) &&
      ((o.tailS[0].p.v += 5),
      (o.tailS[1].p.v += 9),
      (o.tailS[2].p.v += 13),
      (o.tailS[2].y.v += 3)),
    (s.jaw = 0.22 * f1(r, 0.66, 0.74)),
    1 - Q5(r, a.head, a.head + 0.13, 0.45)
  );
}
var EC = (o, t) => Cn(o, t, t + 0.045) * (1 - Cn(o, t + 0.13, t + lU - 0.08));
function qe0(o, t) {
  let e = o.goal,
    s = o.shakeT,
    n = x7 * Ge0;
  if (((o.shakeT += t), s > lU + 0.12)) {
    o.shakeT = -1;
    return;
  }
  let i = EC(s, 0),
    a = EC(s, 0.035),
    r = EC(s, 0.08),
    l = n * s;
  ((e.headRoll += 0.36 * i * Math.sin(l)),
    (e.headYaw += 0.1 * i * Math.sin(l + 1.2)),
    (e.roll += 0.085 * a * Math.sin(l - 0.035 * n)),
    (e.yaw += 0.03 * a * Math.sin(l - 0.035 * n + 0.8)),
    (e.x += 0.006 * a * Math.sin(l - 0.035 * n + 0.4)),
    (e.ears[0] += 0.35 * i * Math.sin(l + 1.6)),
    (e.ears[1] -= 0.35 * i * Math.sin(l + 1.6)));
  for (let c = 0; c < 3; c++)
    e.tail[c][0] += 0.5 * r * Math.sin(l - 0.08 * n - c * 0.8);
}
var XB = [
  [-0.12, -0.08, -0.4],
  [0.12, -0.08, -0.4],
  [-0.12, 0.08, -0.4],
  [0.12, 0.08, -0.4],
  [-0.12, -0.08, 0.4],
  [0.12, -0.08, 0.4],
  [-0.12, 0.08, 0.4],
  [0.12, 0.08, 0.4],
  [-0.2, 0, -0.3, 0.062],
  [0.2, 0, -0.3, 0.062],
  [-0.2, 0, 0.3, 0.062],
  [0.2, 0, 0.3, 0.062],
];
function cU(o) {
  let t = 1e9;
  for (let e = 0; e < XB.length; e++) {
    let s = XB[e];
    Fa.set(s[0], s[1], s[2]).applyQuaternion(o);
    let n = Fa.y - (s[3] || 0);
    n < t && (t = n);
  }
  return t;
}
function Ke0(o, t) {
  let e = o.goal;
  return (
    (o.dieT += t),
    (e.gait = !1),
    (e.settle = !1),
    (e.idle = 0),
    (e.alert = o.state.alert),
    (e.stab = 0),
    o.dieKind === "blast"
      ? Ze0(o, t)
      : o.dieKind === "expire"
        ? je0(o, t)
        : Ye0(o, t)
  );
}
function Xe0(o, t, e, s = -1) {
  for (let n of o.legs) {
    if (s >= 0 && n.i !== s) continue;
    let i = n.side === t,
      a = n.front;
    i
      ? o.poseLeg(n, 0.02, a ? 0.7 : -0.5, a ? 1.25 : 1.6, e, !0)
      : o.poseLeg(n, -0.42, a ? 0.25 : -0.8, a ? 0.85 : 1.25, e, !0);
  }
}
function Ye0(o, t) {
  let e = o.goal,
    s = o.legs,
    n = o.dieT,
    i = o.dieSide,
    a = rr.die / 1.6,
    r = n / a;
  if (!o.dieInit) {
    o.dieInit = !0;
    for (let y of s) y.mode !== Ei && y.mode !== Zu && o.land(y, 0.05, 0.3);
  }
  let l = Q5(r, 0.04, 0.3, 0.55),
    c = Q5(r, 0.24, 0.5, 0.6),
    h = Q5(r, 0.42, 0.62, 0.5),
    f = Cn(r, 0.64, 0.86) * (1 - Cn(r, 1, 1.1)),
    u = Q5(r, 1, 1.26, 0.5),
    d = Cn(r, 0.7, 0.98) * (1 - Cn(r, 1, 1.04)),
    m = ue.stand - 0.12 * l - 0.17 * c - 0.12 * h,
    p = 0.14 * l - 0.26 * c + 0.12 * h,
    x = -i * (0.28 * l + 0.08 * c - 0.16 * h);
  ((m += 0.15 * f),
    (p += 0.36 * f),
    (x += i * 0.1 * f),
    (m -= 0.02 * u),
    (x -= i * 0.86 * u));
  let g = d * (0.4 + 0.6 * W1(n * 9, o.seed));
  if (
    ((e.h = m + 0.004 * g * Math.sin(n * 77)),
    (e.pitch = p + 0.012 * g * Math.sin(n * 83)),
    (e.roll = x + 0.018 * g * Math.sin(n * 71)),
    (e.x = i * 0.05 * u),
    (e.terrain = 1 - Cn(r, 0, 0.5)),
    Lh(r, t / a, 0.52) &&
      ((o.hv.v -= 0.5),
      o.onStep &&
        o.onStep(s[i > 0 ? 1 : 0].i, o._c.copy(s[i > 0 ? 1 : 0].pos), 0.9)),
    Lh(r, t / a, 1.16) &&
      ((o.hv.v -= 0.35),
      (o.rl.v -= i * 1.2),
      o.onStep &&
        o.onStep(s[i > 0 ? 3 : 2].i, o._c.copy(s[i > 0 ? 3 : 2].pos), 1)),
    r >= 1 && Xe0(o, i, r < 1.3 ? 11 : 7),
    Lh(r, t / a, 1.4))
  ) {
    let y = s[i > 0 ? 0 : 1];
    ((y.angV[1] += 5), (y.angV[2] -= 6));
  }
  let b = Cn(r, 1.02, 1.45);
  ((e.gaze = J4),
    (e.gazeYaw = i * 0.25 * (l - f)),
    (e.gazePitch = -0.35 * c * (1 - f) + 0.3 * f),
    (e.gazeW = 18),
    (e.neck = 0.25 - 0.5 * c * (1 - f) + 0.2 * f),
    (e.sNeck[0] = -i * 0.25),
    (e.sNeck[1] = -0.75),
    (e.sHead[0] = -i * 0.2),
    (e.sHead[1] = -0.35),
    (e.sHead[2] = i * 0.35),
    (e.ears[0] = e.ears[1] = as(-0.8, -0.55, b)),
    (e.ears[i > 0 ? 1 : 0] -= 0.2),
    (e.earW = as(34, 12, b)),
    (e.tail[0][1] = as(0.3, 0.75, u)),
    (e.tail[1][1] = as(0.1, 0.4, u)),
    (e.tail[2][1] = as(0, 0.3, u)),
    (e.tail[0][0] = -i * 0.3 * u),
    (e.tailW = as(20, 9, u)),
    (e.tailZ = 0.4),
    (e.jaw = 0.25 * l * (1 - f) + 0.15 * b));
  let v = W1(n * 26, o.seed + 1);
  return (
    (e.power =
      r < 0.6
        ? v > 0.2
          ? 0.35
          : 0.9
        : r < 1.02
          ? v > -0.1
            ? 0.25 + 0.5 * d
            : 0.85
          : (1 - Cn(r, 1.05, 1.5)) * (v > 0.3 ? 0.15 : 0.6)),
    r > 1.52 && (e.power = 0),
    hU(o, t, r > 1 ? 1 : 0, r >= 1.6),
    b
  );
}
function je0(o, t) {
  let e = o.state,
    s = o.goal,
    n = o.legs,
    i = rr.expire / 2.3,
    a = o.dieT / i,
    r = t / i,
    l = o.P_FOLD;
  if (!o.dieInit) {
    o.dieInit = !0;
    for (let g of n) g.mode !== Ei && g.mode !== Zu && o.land(g, 0.06, 0.3);
  }
  let c = iv(Q5(a, 0.08, 0.56, 0.7)),
    h = Cn(a, 1.12, 1.86),
    f = Ae0,
    u = $B;
  for (let g = 0; g < 4; g++)
    if (Lh(a, r, f[g]) || (o.dieT === t && g === 0)) {
      let b = n[u[g]];
      b.mode !== Zu &&
        (lv(o, b.side * (b.front ? 0.21 : 0.25), b.front ? -0.36 : 0.22, Uo),
        o.step(b, Uo.x, Uo.z, 0.15, 0.03, 0, 0.15));
    }
  let d = ke0;
  for (let g = 0; g < 4; g++)
    if (Lh(a, r, d[g])) {
      let b = n[u[g]];
      b.mode !== Zu &&
        (o.footOfPose(b.i, l, Uo), o.step(b, Uo.x, Uo.z, 0.2, 0.035, 0, 0.14));
    }
  if (
    ((s.h = as(as(ue.stand, 0.4, c), ue.rest, h)),
    (s.z = 0.06 * c * (1 - h)),
    (s.pitch = 0.62 * c * (1 - h)),
    (s.terrain = 1 - h),
    a > 1.9)
  )
    for (let g of n)
      o.poseLeg(g, l.leg[g.i][0], l.leg[g.i][1], l.leg[g.i][2], 16, !1);
  let m = Cn(a, 0.5, 1);
  ((s.gaze = J4),
    (s.gazeYaw = 0),
    (s.gazePitch = -0.5 * m),
    (s.gazeW = 7),
    (s.neck = as(0.25, -0.6, m)),
    (s.sNeck[0] = 0),
    (s.sNeck[1] = l.neck[1]),
    (s.sHead[0] = 0),
    (s.sHead[1] = l.head[1]),
    (s.sHead[2] = 0),
    (s.ears[0] = s.ears[1] = as(0.1, -0.8, Cn(a, 0.5, 1.5))),
    (s.earW = 14));
  let p = Cn(a, 1.3, 2.05);
  for (let g = 0; g < 3; g++)
    ((s.tail[g][1] = as(Ce0[g], l.tail[g][1], p)), (s.tail[g][0] = 0));
  ((s.tailW = 12), (s.tailZ = 0.9));
  let x = 0.5 + 0.5 * Math.sin(a * 9);
  return (
    (s.power =
      a < 2
        ? as(1, 0.18, Cn(a, 0, 1.6)) * (0.55 + 0.45 * x)
        : a < 2.1
          ? 0
          : a < 2.16
            ? 0.4
            : 0),
    a >= 2.3 &&
      ((s.power = 0),
      (o.stillT += t),
      o.stillT > 0.5 && ($e0(o), (o.frozen = !0))),
    Cn(a, 1.5, 2)
  );
}
function $e0(o) {
  let t = o.pose,
    e = o.P_FOLD;
  (t.pos.copy(e.pos), t.quat.copy(e.quat));
  for (let s = 0; s < 4; s++)
    for (let n = 0; n < 3; n++) t.leg[s][n] = e.leg[s][n];
  ((t.neck[0] = e.neck[0]),
    (t.neck[1] = e.neck[1]),
    (t.head[0] = e.head[0]),
    (t.head[1] = e.head[1]),
    (t.head[2] = e.head[2]),
    (t.jaw = 0),
    (t.ears[0] = e.ears[0]),
    (t.ears[1] = e.ears[1]));
  for (let s = 0; s < 3; s++)
    ((t.tail[s][0] = e.tail[s][0]), (t.tail[s][1] = e.tail[s][1]));
}
function Ze0(o, t) {
  let e = o.state,
    s = o.goal,
    n = o.legs,
    i = o.dieT,
    a = o.bp,
    r = o.bv,
    l = o.bw,
    c = o.hitL;
  if (!o.dieInit) {
    ((o.dieInit = !0), a.copy(o.bpos));
    let m = o.vx * o.cy - o.vz * o.sy,
      p = o.vx * o.sy + o.vz * o.cy;
    (r.set(c.x * 2.5 + m * 0.45, 3.5, c.z * 2.5 + p * 0.45),
      o.fq.copy(o.bq),
      (o.free = !0),
      (o.air = !0),
      (o.bounces = 0),
      (o.blastRest = 0),
      l.set(
        c.z * 8.5 + (Bn(o.rng) - 0.5) * 3,
        (Bn(o.rng) - 0.5) * 6,
        -c.x * 8.5 + (Bn(o.rng) - 0.5) * 3,
      ));
    for (let x of n)
      o.poseLeg(
        x,
        Bn(o.rng) * 0.7 - 0.1,
        Bn(o.rng) * 2 - 1.2,
        0.3 + Bn(o.rng) * 1.6,
        10,
        !1,
      );
    for (let x of o.io) ((x.x = 0), (x.v = 0));
    o.blend = 0;
    for (let x of ["hv", "pt", "rl", "sx", "sz", "yw", "idleX"])
      ((o[x].x = 0), (o[x].v = 0));
  }
  let h = !1;
  if (o.blastRest < 1) {
    ((r.y -= 9.81 * t),
      o.clear &&
        (o.toWorld(Fa.copy(a)),
        o.toWorld(
          e6.set(
            a.x + r.x * t * 3 + Math.sign(r.x) * 0.25,
            a.y,
            a.z + r.z * t * 3 + Math.sign(r.z) * 0.25,
          ),
        ),
        o.clear(Fa, e6) ||
          ((r.x *= -0.3), (r.z *= -0.3), l.multiplyScalar(0.6))),
      a.addScaledVector(r, t));
    let m = l.length();
    (m > 1e-4 &&
      (Jr.setFromAxisAngle(GB.copy(l).multiplyScalar(1 / m), m * t),
      o.fq.premultiply(Jr).normalize()),
      o.toWorld(Fa.copy(a)));
    let p = o.gy(Fa.x, Fa.z) - e.y,
      x = p + 0.012 - (a.y + cU(o.fq));
    (Fa.set(0, 0, -1).applyQuaternion(o.fq),
      e6.set(1, 0, 0).applyQuaternion(o.fq),
      WB.setFromEuler(
        TC.set(0, Math.atan2(-Fa.x, -Fa.z), e6.y < 0 ? -1.05 : 1.05, "YXZ"),
      ),
      Jr.copy(WB).multiply(GB.set(0, 0, 0) && o.bqi.copy(o.fq).invert()),
      Jr.w < 0 &&
        ((Jr.x = -Jr.x), (Jr.y = -Jr.y), (Jr.z = -Jr.z), (Jr.w = -Jr.w)));
    let g = 2 * Math.acos(Math.min(1, Jr.w)),
      b = Math.sqrt(1 - Math.min(1, Jr.w * Jr.w));
    if (x > 0) {
      if (((h = !0), (a.y += x), r.y < 0)) {
        let y = -r.y;
        ((r.y = y > 1.3 ? y * 0.28 : 0),
          y > 1.3 &&
            (o.bounces++,
            l.multiplyScalar(0.55),
            o.onStep && o.onStep(0, o.toWorld(o._c.copy(a)), 1)));
      }
      let v = Math.exp(-6 * t);
      if (((r.x *= v), (r.z *= v), b > 1e-4)) {
        let y = ((55 * g) / b) * t;
        ((l.x += Jr.x * y), (l.y += Jr.y * y), (l.z += Jr.z * y));
      }
      (l.multiplyScalar(Math.exp(-7.5 * t)),
        o.bounces > 0 &&
          r.lengthSq() < 0.09 &&
          l.lengthSq() < 0.5 &&
          g < 0.1 &&
          (o.blastRest += t * 5));
    } else l.multiplyScalar(Math.exp(-0.25 * t));
    (o.blastRest >= 1 || i > rr.blast + 1.2) &&
      ((o.blastRest = 1), r.set(0, 0, 0), l.set(0, 0, 0));
  } else h = !0;
  ((s.x = a.x), (s.h = a.y), (s.z = a.z), (s.terrain = 0));
  let f = o.bounces > 0;
  f && (e6.set(1, 0, 0).applyQuaternion(o.fq), Qe0(o, e6.y < 0 ? 1 : -1));
  let u = f ? Cn(i, 0.5, 1.2) : 0;
  ((s.sNeck[0] = as(0.6 * Math.sin(i * 9), 0.35, u)),
    (s.sNeck[1] = as(-0.2 + 0.4 * Math.sin(i * 7), -0.55, u)),
    (s.sHead[0] = as(0.5 * Math.sin(i * 11), 0.3, u)),
    (s.sHead[1] = as(0.3 * Math.sin(i * 8), -0.3, u)),
    (s.sHead[2] = as(0.4 * Math.sin(i * 6), 0.4, u)),
    (s.ears[0] = -0.3 + 0.4 * Math.sin(i * 13) * (1 - u)),
    (s.ears[1] = -0.6),
    (s.earW = 16),
    (s.tail[0][1] = 0.3),
    (s.tail[1][1] = 0.3),
    (s.tail[2][1] = 0.2),
    (s.tail[0][0] = 0.4),
    (s.tailW = 10),
    (s.tailZ = 0.3),
    (s.jaw = 0.4));
  let d = W1(i * 31, o.seed + 4);
  return (
    (s.power =
      i < 0.06 ? 1 : i < 0.9 ? (d > 0.25 ? 0.7 : 0.05) * (1 - i / 0.9) : 0),
    hU(o, t, 0, o.blastRest >= 1 && i >= rr.blast),
    -1
  );
}
function Qe0(o, t) {
  for (let e of o.legs) {
    let s = Pe0[t > 0 ? e.i : e.i ^ 1];
    o.poseLeg(e, s[0], s[1], s[2], 9, !0);
  }
}
function hU(o, t, e, s) {
  ((o.deadClear = Di(o.deadClear || 0, e, 10, t)),
    s && ((o.stillT += t), o.stillT > 0.7 && (o.frozen = !0)));
}
function fU(o) {
  if (o.deadClear <= 0 || o.free) return;
  let t = 0.012 - (o.bpos.y + cU(o.bq));
  t > 0 && (o.bpos.y += t * o.deadClear);
}
var YB = new Quaternion();
var jB = new Quaternion();
function uU(o) {
  let t = o.pose;
  for (let e = 0; e < 3; e++) {
    (jB.setFromEuler(TC.set(t.neck[1], t.neck[0], 0, "YXZ")),
      YB.setFromEuler(TC.set(t.head[1], t.head[0], t.head[2], "YXZ")));
    let s = 1e9;
    for (let a = 0; a < 4; a++)
      (Fa.set(a & 1 ? 0.06 : -0.06, a & 2 ? 0.05 : -0.06, -0.2).applyQuaternion(
        YB,
      ),
        (Fa.x += 0),
        (Fa.y += 0.06),
        (Fa.z -= 0.1),
        Fa.applyQuaternion(jB),
        (Fa.y += 0.05),
        (Fa.z -= 0.4),
        Fa.applyQuaternion(o.bq),
        Fa.y < s && (s = Fa.y));
    let n = 0.012 - (o.bpos.y + s);
    if (n <= 0.001) break;
    let i = Fa.set(0, 1, 0).applyQuaternion(o.bqi.copy(o.bq).invert());
    ((t.neck[1] = Ys(
      t.neck[1] +
        (n / 0.28) * (i.y >= 0 ? 1 : -1) * Math.max(0.35, Math.abs(i.y)),
      -1.1,
      0.9,
    )),
      Math.abs(i.x) > 0.5 &&
        (t.neck[0] = Ys(
          t.neck[0] + (n / 0.28) * (i.x > 0 ? -1 : 1),
          -1.2,
          1.2,
        )));
  }
}
var dU = {
  walk: 1.6,
  trot: 4.2,
  gallop: 9.5,
};
var Je0 = 1;
function pU({
  team: o = 0,
  ground: t = null,
  clear: e = null,
  seed: s = 0,
} = {}) {
  let n = new Group();
  ((n.name = "k9"), (n.rotation.order = "YXZ"));
  let i = fB();
  n.add(i[0]);
  let a = RB({
    team: o,
    bones: i,
  });
  a.mesh && !a.mesh.parent && n.add(a.mesh);
  for (let M of a.extras || []) M && !M.parent && n.add(M);
  let r = new K9Locomotion({
    ground: t,
    clear: e,
    seed: s || Je0++,
  });
  (UB(r), ZB(r));
  let l = r.state,
    c = r.sig,
    h = r.pose,
    f = -1,
    u = -1,
    d = -1,
    m = -1,
    p = -1,
    x = () => {
      (Math.abs(c.power - f) > 0.004 && a.setPower((f = c.power)),
        Math.abs(c.alert - u) > 0.004 && a.setAlert((u = c.alert)),
        Math.abs(c.damage - d) > 0.004 && a.setDamage((d = c.damage)),
        a.setCharge &&
          Math.abs(c.charge - m) > 0.004 &&
          a.setCharge((m = c.charge)));
      let M = c.shock * y.shockGain;
      a.setShock && Math.abs(M - p) > 0.004 && a.setShock((p = M));
    },
    g = () => {
      (lC(h, r.P_FOLD), t6(r, r.P_FOLD));
      for (let M of r.legs) ((M.down = !1), (M.mode = 4));
      c.power = c.alert = c.charge = c.shock = 0;
    };
  (g(), cC(i, h));
  let b = l7(),
    v = (M, w = 1) => {
      QB(r, M, w);
    };
  (b.forEach((M, w) => {
    v[w] = M;
  }),
    Object.defineProperty(v, "length", {
      value: b.length,
    }),
    (v[Symbol.iterator] = () => b[Symbol.iterator]()));
  let y = {
    root: n,
    bones: i,
    state: l,
    team: o,
    timing: rr,
    cues: SC,
    triangles: a.triangles,
    model: a,
    hit: v,
    hitVolumes: b,
    flinch: v,
    anchors: {
      body: i[xs.body],
      head: i[xs.head],
      jaw: i[xs.jaw],
      tail: i[xs.tail3],
    },
    onStep: null,
    gait: "stand",
    effort: 0,
    signals: c,
    feet: r.legs,
    pose: h,
    _rig: r,
    shockGain: 1,
    setTeam(M) {
      ((y.team = M), a.setTeam(M));
    },
    setOpacity(M) {
      a.setFade && a.setFade(M);
    },
    reset() {
      (a.setFade && a.setFade(1),
        sU(r),
        (l.mode = "folded"),
        (l.hp = 1),
        (l.alert = 0),
        (c.damage = 0),
        g(),
        x());
    },
    deploy() {
      return tU(r);
    },
    bark() {
      return JB(r);
    },
    die(M, w = "shot") {
      return eU(r, M, w);
    },
    update(M) {
      let w = l;
      if (
        (n.position.set(w.x, w.y, w.z),
        w.mode === "folded"
          ? n.rotation.set(w.pitch || 0, w.yaw, w.roll || 0)
          : n.rotation.set(0, w.yaw, 0),
        M > 0 ? M > 0.05 && (M = 0.05) : (M = 1e-4),
        (r.onStep = y.onStep),
        w.mode === "folded")
      )
        (r.mode !== "folded" &&
          ((r.mode = "folded"),
          (r.live = !1),
          (r.dieT = -1),
          (r.frozen = !1),
          g()),
          (y.gait = "stand"),
          (y.effort = 0));
      else if (!r.frozen) {
        if (!r.live || r.mode === "folded" || r.mode === "none")
          ((r.px = w.x), (r.py = w.y), (r.pz = w.z), (r.pyaw = w.yaw));
        else {
          let S = w.x - r.px,
            E = w.z - r.pz;
          S * S + E * E > 6.25 && (r.snap(), t6(r, h));
        }
        ((r.time += M),
          r.kin(M),
          nU(r, M),
          r.gait(M),
          r.body(M),
          w.mode === "dead" && fU(r),
          r.solve(M),
          VB(r, M),
          w.mode === "dead" && uU(r),
          (y.gait = r.gaitName));
        let T = Math.min(
          1,
          r.sEff / 9 +
            (r.air ? 0.5 : 0) +
            c.charge * 0.5 +
            c.shock * 0.6 +
            (r.shakeT >= 0 ? 0.5 : 0) +
            (w.mode === "deploy" ? 0.45 : 0.04),
        );
        y.effort = r.effort += (T - r.effort) * Math.min(1, M * 10);
      }
      (x(), cC(i, h), n.updateMatrixWorld(!0), sv(i, b));
    },
  };
  return (a.setTeam(o), x(), y);
}

export { dU, pU };

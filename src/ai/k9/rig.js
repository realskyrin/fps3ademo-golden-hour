// ai/k9/rig.js: recovered from the verified GOLDEN HOUR release.
import { Bone, Euler, Quaternion, Vector3 } from "../../vendor/three-r180.js";

var ue = {
  bodyLen: 0.8,
  bodyW: 0.24,
  bodyH: 0.16,
  hipZ: 0.3,
  hipX: 0.125,
  hipOut: 0.075,
  upper: 0.32,
  lower: 0.34,
  foot: 0.035,
  stand: 0.56,
  rest: 0.13,
  tail: 0.11,
};
var a7 = ["FL", "FR", "HL", "HR"];
var Ph = (o) => (o % 2 === 0 ? -1 : 1);
var kf = (o) => o < 2;
var $u = [
  {
    name: "body",
    parent: -1,
    at: [0, ue.stand, 0],
  },
  ...a7.flatMap((o, t) => [
    {
      name: "hip" + o,
      parent: 0,
      at: [Ph(t) * ue.hipX, 0, kf(t) ? -ue.hipZ : ue.hipZ],
    },
    {
      name: "upper" + o,
      parent: 1 + t * 3,
      at: [Ph(t) * ue.hipOut, 0, 0],
    },
    {
      name: "lower" + o,
      parent: 2 + t * 3,
      at: [0, -ue.upper, 0],
    },
  ]),
  {
    name: "neck",
    parent: 0,
    at: [0, 0.05, -0.4],
  },
  {
    name: "head",
    parent: 13,
    at: [0, 0.06, -0.1],
  },
  {
    name: "jaw",
    parent: 14,
    at: [0, -0.03, -0.06],
  },
  {
    name: "earL",
    parent: 14,
    at: [-0.05, 0.045, 0.02],
  },
  {
    name: "earR",
    parent: 14,
    at: [0.05, 0.045, 0.02],
  },
  {
    name: "tail1",
    parent: 0,
    at: [0, 0.07, 0.38],
  },
  {
    name: "tail2",
    parent: 18,
    at: [0, 0.07, 0.085],
  },
  {
    name: "tail3",
    parent: 19,
    at: [0, 0.07, 0.085],
  },
];
var xs = Object.fromEntries($u.map((o, t) => [o.name, t]));
var qc0 = $u.length;
var zn = {
  a: [-0.45, 0.9],
  p: [-2.7, 1.7],
  k: [0.08, 2.8],
  neckYaw: 1.2,
  neckPitch: [-1.1, 0.9],
  headYaw: 0.9,
  headPitch: [-0.9, 0.8],
  headRoll: 0.6,
  jaw: [0, 0.75],
  ear: [-0.9, 0.7],
};
function r7() {
  return {
    pos: new Vector3(0, ue.stand, 0),
    quat: new Quaternion(),
    leg: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    neck: [0, 0],
    head: [0, 0, 0],
    jaw: 0,
    ears: [0, 0],
    tail: [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  };
}
function lC(o, t) {
  (o.pos.copy(t.pos), o.quat.copy(t.quat));
  for (let e = 0; e < 4; e++)
    ((o.leg[e][0] = t.leg[e][0]),
      (o.leg[e][1] = t.leg[e][1]),
      (o.leg[e][2] = t.leg[e][2]));
  ((o.neck[0] = t.neck[0]),
    (o.neck[1] = t.neck[1]),
    (o.head[0] = t.head[0]),
    (o.head[1] = t.head[1]),
    (o.head[2] = t.head[2]),
    (o.jaw = t.jaw),
    (o.ears[0] = t.ears[0]),
    (o.ears[1] = t.ears[1]));
  for (let e = 0; e < 3; e++)
    ((o.tail[e][0] = t.tail[e][0]), (o.tail[e][1] = t.tail[e][1]));
  return o;
}
function fB() {
  let o = $u.map((t) => {
    let e = new Bone();
    return ((e.name = t.name), e.position.set(t.at[0], t.at[1], t.at[2]), e);
  });
  return (
    $u.forEach((t, e) => {
      t.parent >= 0 && o[t.parent].add(o[e]);
    }),
    o
  );
}
var tv = new Vector3(1, 0, 0);
var St0 = new Vector3(0, 0, 1);
var aC = new Euler(0, 0, 0, "YXZ");
function cC(o, t) {
  (o[0].position.copy(t.pos), o[0].quaternion.copy(t.quat));
  for (let e = 0; e < 4; e++) {
    let [s, n, i] = t.leg[e],
      a = 1 + e * 3;
    (o[a].quaternion.setFromAxisAngle(St0, Ph(e) * s),
      o[a + 1].quaternion.setFromAxisAngle(tv, n),
      o[a + 2].quaternion.setFromAxisAngle(tv, i));
  }
  (o[xs.neck].quaternion.setFromEuler(aC.set(t.neck[1], t.neck[0], 0, "YXZ")),
    o[xs.head].quaternion.setFromEuler(
      aC.set(t.head[1], t.head[0], t.head[2], "YXZ"),
    ),
    o[xs.jaw].quaternion.setFromAxisAngle(tv, -t.jaw),
    o[xs.earL].quaternion.setFromAxisAngle(tv, t.ears[0]),
    o[xs.earR].quaternion.setFromAxisAngle(tv, t.ears[1]));
  for (let e = 0; e < 3; e++)
    o[xs.tail1 + e].quaternion.setFromEuler(
      aC.set(t.tail[e][1], t.tail[e][0], 0, "YXZ"),
    );
}
var Y5 = (o, t, e) => (o < t ? t : o > e ? e : o);
function hC(o, t, e) {
  let s = Ph(o),
    n = t[0] * s,
    i = t[1],
    a = t[1] + t[2],
    r = s * ue.hipOut,
    l = -ue.upper * Math.cos(i) - ue.lower * Math.cos(a),
    c = -ue.upper * Math.sin(i) - ue.lower * Math.sin(a),
    h = Math.cos(n),
    f = Math.sin(n);
  return e.set(
    s * ue.hipX + r * h - l * f,
    r * f + l * h,
    (kf(o) ? -ue.hipZ : ue.hipZ) + c,
  );
}
function ev(o, t, e) {
  let s = Ph(o),
    n = ue.upper,
    i = ue.lower,
    a = t.x - s * ue.hipX,
    r = t.y,
    l = t.z - (kf(o) ? -ue.hipZ : ue.hipZ),
    c = Math.max(Math.hypot(a, r), ue.hipOut + 1e-4),
    h = Math.atan2(a, -r),
    f = s * (h - Math.asin(Y5((s * ue.hipOut) / c, -1, 1)));
  f = Y5(f, zn.a[0], zn.a[1]);
  let u = -Math.sqrt(Math.max(1e-8, c * c - ue.hipOut * ue.hipOut)),
    d = Math.hypot(u, l),
    m = Y5(d, Math.abs(n - i) + 0.02, n + i - 0.004),
    p = Math.atan2(-l, -u),
    x = Math.acos(Y5((n * n + m * m - i * i) / (2 * n * m), -1, 1)),
    g = Math.acos(Y5((n * n + i * i - m * m) / (2 * n * i), -1, 1));
  return (
    (e[0] = f),
    (e[1] = Y5(p - x, zn.p[0], zn.p[1])),
    (e[2] = Y5(Math.PI - g, zn.k[0], zn.k[1])),
    Math.abs(d - m)
  );
}
var uB = new Vector3();
function dB(o = r7(), t = ue.stand, e = 0.02) {
  (o.pos.set(0, t, 0), o.quat.identity());
  for (let s = 0; s < 4; s++)
    ev(
      s,
      uB.set(
        Ph(s) * (ue.hipX + ue.hipOut + e),
        -t + ue.foot,
        kf(s) ? -ue.hipZ : ue.hipZ,
      ),
      o.leg[s],
    );
  return (
    (o.neck[0] = 0),
    (o.neck[1] = 0.25),
    (o.head[0] = 0),
    (o.head[1] = -0.15),
    (o.head[2] = 0),
    (o.jaw = 0),
    (o.ears[0] = o.ears[1] = 0.15),
    (o.tail[0][0] = o.tail[1][0] = o.tail[2][0] = 0),
    (o.tail[0][1] = 0.1),
    (o.tail[1][1] = 0.05),
    (o.tail[2][1] = 0),
    o
  );
}
function pB(o = r7()) {
  (o.pos.set(0, ue.rest, 0), o.quat.identity());
  for (let t = 0; t < 4; t++)
    ev(
      t,
      uB.set(
        Ph(t) * (ue.hipX + ue.hipOut + 0.03),
        -ue.rest + ue.foot,
        (kf(t) ? -ue.hipZ : ue.hipZ) + 0.24,
      ),
      o.leg[t],
    );
  return (
    (o.neck[0] = 0),
    (o.neck[1] = -0.3),
    (o.head[0] = 0),
    (o.head[1] = -0.15),
    (o.head[2] = 0),
    (o.jaw = 0),
    (o.ears[0] = o.ears[1] = -0.8),
    (o.tail[0][0] = o.tail[1][0] = o.tail[2][0] = 0),
    (o.tail[0][1] = -1.5),
    (o.tail[1][1] = -0.9),
    (o.tail[2][1] = -0.5),
    o
  );
}
var rC = [
  {
    part: "torso",
    bone: "body",
    a: [0, 0.01, -0.29],
    b: [0, 0.01, 0.29],
    r: 0.175,
  },
  {
    part: "head",
    bone: "head",
    a: [0, 0, -0.03],
    b: [0, 0, -0.15],
    r: 0.105,
  },
];
function l7() {
  return rC.map((o) => ({
    part: o.part,
    a: new Vector3(),
    b: new Vector3(),
    r: o.r,
  }));
}
function sv(o, t) {
  for (let e = 0; e < rC.length; e++) {
    let s = rC[e],
      n = o[xs[s.bone]].matrixWorld;
    (t[e].a.set(s.a[0], s.a[1], s.a[2]).applyMatrix4(n),
      t[e].b.set(s.b[0], s.b[1], s.b[2]).applyMatrix4(n));
  }
  return t;
}

export { $u, Ph, a7, cC, dB, ev, fB, hC, kf, l7, lC, pB, r7, sv, ue, xs, zn };

// weapons/weight.js: recovered from the verified GOLDEN HOUR release.
import { DEG_TO_RAD } from "../core/math.js";

var dl = class {
  constructor(t, e) {
    ((this.k = t), (this.c = e), (this.x = 0), (this.v = 0), (this.t = 0));
  }
  set(t, e) {
    let s = t;
    return ((this.k = s * s), (this.c = 2 * e * s), this);
  }
  step(t) {
    if (!(t > 0)) return this.x;
    let e = this.c * 0.5,
      s = this.x - this.t,
      n = this.v,
      i = this.k - e * e,
      a = Math.exp(-e * t),
      r,
      l;
    if (i > 1e-9) {
      let c = Math.sqrt(i),
        h = Math.sin(c * t),
        f = Math.cos(c * t),
        u = (n + e * s) / c;
      ((r = a * (s * f + u * h)), (l = a * (n * f - (e * u + c * s) * h)));
    } else if (i < -1e-9) {
      let c = Math.sqrt(-i),
        h = Math.sinh(c * t),
        f = Math.cosh(c * t),
        u = (n + e * s) / c;
      ((r = a * (s * f + u * h)), (l = a * (n * f + (c * s - e * u) * h)));
    } else {
      let c = n + e * s;
      ((r = a * (s + c * t)), (l = a * (n - e * c * t)));
    }
    return ((this.x = r + this.t), (this.v = l), this.x);
  }
  hit(t) {
    this.v += t;
  }
  reset() {
    this.x = this.v = this.t = 0;
  }
};
var cR = {
  ar: {
    m: 1,
    arm: [0.26, 3.6, 20, 0.6],
    tip: [0.1, 1.5, 34, 0.5],
    roll: 2.2,
    carry: [15, 0.56],
    inertia: [0.003, 0.016, 15, 0.5],
    shoulder: [0.17, -0.17, 0.1],
  },
  smg: {
    m: 0.82,
    arm: [0.21, 3.1, 24, 0.62],
    tip: [0.11, 1.6, 40, 0.52],
    roll: 2.3,
    carry: [17.5, 0.58],
    inertia: [0.0025, 0.014, 17.5, 0.52],
    shoulder: [0.17, -0.17, 0.08],
  },
  shotgun: {
    m: 1.22,
    arm: [0.32, 4.2, 16.5, 0.56],
    tip: [0.085, 1.3, 28, 0.46],
    roll: 2.4,
    carry: [12.5, 0.52],
    inertia: [0.0036, 0.019, 12.5, 0.46],
    shoulder: [0.17, -0.17, 0.1],
  },
  pistol: {
    m: 0.55,
    arm: [0.15, 2.4, 31, 0.66],
    tip: [0.12, 1.8, 48, 0.55],
    roll: 1.8,
    carry: [21, 0.62],
    inertia: [0.0018, 0.01, 22, 0.56],
    shoulder: [0.02, -0.2, 0.12],
  },
};
var Hg = (o, t, e) => {
  if (t * o.x > 0) {
    let s = o.x / e;
    t *= Math.max(0, 1 - s * s);
  }
  o.x += t;
};
var WeaponWeight = class {
  constructor() {
    ((this.armY = new dl(1, 1)),
      (this.armP = new dl(1, 1)),
      (this.tipY = new dl(1, 1)),
      (this.tipP = new dl(1, 1)),
      (this.inX = new dl(1, 1)),
      (this.inZ = new dl(1, 1)),
      (this.out = {
        armYaw: 0,
        armPitch: 0,
        tipYaw: 0,
        tipPitch: 0,
        roll: 0,
        x: 0,
        z: 0,
      }),
      (this.vr = 0),
      (this.vf = 0),
      (this.has = !1),
      (this.h = cR.ar),
      this.set("ar"));
  }
  set(t) {
    let e = (this.h = cR[t] || cR.ar);
    (this.armY.set(e.arm[2], e.arm[3]),
      this.armP.set(e.arm[2] * 1.08, e.arm[3]),
      this.tipY.set(e.tip[2], e.tip[3]),
      this.tipP.set(e.tip[2] * 1.05, e.tip[3]),
      this.inX.set(e.inertia[2], e.inertia[3]),
      this.inZ.set(e.inertia[2] * 0.94, e.inertia[3]));
    for (let s of [
      this.armY,
      this.armP,
      this.tipY,
      this.tipP,
      this.inX,
      this.inZ,
    ])
      s.reset();
    return ((this.has = !1), e);
  }
  update(t, e, s, n, i, a) {
    let r = this.h,
      l = this.out,
      c = r.arm[1] * DEG_TO_RAD,
      h = r.tip[1] * DEG_TO_RAD,
      f = r.inertia;
    (Hg(this.armY, -e.yaw * r.arm[0], c),
      Hg(this.armP, -e.pitch * r.arm[0], c * 0.75),
      Hg(this.tipY, e.yaw * r.tip[0], h),
      Hg(this.tipP, e.pitch * r.tip[0], h * 0.75),
      this.has || ((this.vr = s), (this.vf = n), (this.has = !0)));
    let u = 1 - Math.exp(-t / 0.035),
      d = (s - this.vr) * u,
      m = (n - this.vf) * u;
    return (
      (this.vr += d),
      (this.vf += m),
      Math.abs(d) < 3 &&
        Math.abs(m) < 3 &&
        (Hg(this.inX, -d * f[0], f[1]), Hg(this.inZ, m * f[0], f[1])),
      (l.armYaw = this.armY.step(t) * i),
      (l.armPitch = this.armP.step(t) * i),
      (l.tipYaw = this.tipY.step(t) * i * a),
      (l.tipPitch = this.tipP.step(t) * i * a),
      (l.roll = this.tipY.x * r.roll * i),
      (l.x = this.inX.step(t)),
      (l.z = this.inZ.step(t)),
      l
    );
  }
};

export { WeaponWeight, dl };

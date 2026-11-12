// weapons/optic.js: recovered from the verified GOLDEN HOUR release.
import {
  Color,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  Quaternion,
  Vector3,
} from "../vendor/three-r180.js";
import { SUN_DIRECTION, pb } from "../scene/sky.js";

var fR = new Quaternion();
var uR = new Vector3();
var TI = new Color();
var SI = new Vector3();
var yZ = (o, t, e) => 0.2126 * o + 0.7152 * t + 0.0722 * e;
var OpticPortal = class {
  constructor(t, e) {
    ((this.scene = t),
      (this.ctx = e),
      (this.sun = new DirectionalLight(pb, 0)),
      t.add(this.sun, this.sun.target),
      (this.hemi = new HemisphereLight(10469592, 2893346, 0.2)),
      t.add(this.hemi),
      (this.rim = new DirectionalLight(9417983, 0.4)),
      this.rim.position.set(-1.2, 0.8, 1),
      t.add(this.rim),
      (this.fill = new DirectionalLight(16770764, 1)),
      this.fill.position.set(0.5, 1.1, 0.9),
      t.add(this.fill),
      (this.pick = new PointLight(16747068, 0, 6, 2)),
      t.add(this.pick),
      (this.flash = new PointLight(16752720, 0, 2.5, 2)),
      t.add(this.flash),
      (this.probe = {
        r: 0.1,
        g: 0.1,
        b: 0.1,
        ar: 0.1,
        ag: 0.1,
        ab: 0.1,
        br: 0.1,
        bg: 0.1,
        bb: 0.1,
        sun: 0,
        k: 0,
        color: new Color(1, 0.6, 0.3),
        dir: new Vector3(0, 1, 0),
      }),
      (this.level = 0.2),
      (this.tint = new Color(1, 0.9, 0.8)),
      (this._t = 1),
      (this.sunK = 0),
      (this.env = 1));
  }
  update(t, e, s = {}) {
    let n = this.ctx.gfx && this.ctx.gfx.fx,
      i = this.probe;
    ((this._t += t),
      n &&
        n.probeAt &&
        this._t > 0.08 &&
        ((this._t = 0), n.probeAt(e.position, i)));
    let a = 1 - Math.exp(-6 * t),
      r = yZ(i.r, i.g, i.b);
    this.level += (r - this.level) * a;
    let l = Math.max(i.r, i.g, i.b, 0.001);
    (TI.setRGB(
      0.5 + (0.5 * i.r) / l,
      0.5 + (0.5 * i.g) / l,
      0.5 + (0.5 * i.b) / l,
    ),
      this.tint.lerp(TI, a));
    let c = (this.sunK +=
        ((s.sunK !== void 0 ? s.sunK : i.sun) - this.sunK) *
        (1 - Math.exp(-10 * t))),
      h = this.level;
    (fR.copy(e.quaternion).invert(),
      uR.copy(SUN_DIRECTION).applyQuaternion(fR),
      this.sun.position.copy(uR).multiplyScalar(5),
      this.sun.target.position.set(0, 0, 0));
    let f = Math.max(0, -uR.z),
      u = f * f;
    ((this.sun.intensity = 3.9 * c * (1 - 0.78 * u)),
      this.fill.color.copy(this.tint),
      (this.fill.intensity =
        Math.min(1.5, 0.3 + 2.6 * Math.sqrt(h) * 0.62) * (1 - 0.45 * c)));
    let d = Math.max(i.ar, i.ag, i.ab, 0.001),
      m = Math.max(i.br, i.bg, i.bb, 0.001);
    (this.hemi.color.setRGB(i.ar / d, i.ag / d, i.ab / d),
      this.hemi.groundColor.setRGB(i.br / m, i.bg / m, i.bb / m),
      (this.hemi.intensity = Math.min(0.5, 0.1 + 0.5 * h)),
      (this.rim.intensity = 0.22 + 0.5 * Math.min(1, h * 1.6)),
      (this.env =
        Math.max(0.3, Math.min(1.25, 0.3 + 2.2 * h)) *
        (1 - 0.3 * c) *
        (1 - 0.55 * u * c)),
      (this.scene.environmentIntensity = this.env),
      this.scene.environmentRotation.set(
        -e.rotation.x,
        -e.rotation.y,
        -e.rotation.z,
        "YXZ",
      ));
    let p = this.ownShot !== void 0 && this.ownShot < 0.22;
    (i.k > 0.02 &&
      !p &&
      (SI.copy(i.dir).applyQuaternion(fR).multiplyScalar(1.6),
      this.pick.position.lerp(SI, 1 - Math.exp(-8 * t)),
      this.pick.color.lerp(i.color, 1 - Math.exp(-8 * t))),
      p || (this.pickWant = Math.min(6, i.k * 0.55)));
    let x = this.pickWant || 0;
    this.pick.intensity +=
      (x - this.pick.intensity) *
      (1 - Math.exp(-(x > this.pick.intensity ? 40 : 7) * t));
  }
};

export { OpticPortal };

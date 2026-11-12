// ui/weapon-studio.js: recovered from the verified GOLDEN HOUR release.
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  Box3,
  CanvasTexture,
  DirectionalLight,
  DoubleSide,
  Group,
  NoColorSpace,
  OrthographicCamera,
  PMREMGenerator,
  PerspectiveCamera,
  Plane,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from "../vendor/three-r180.js";
import { L7 } from "./studio-environment.js";
import { Vb, e5, getBuild } from "../weapons/loadout.js";
import { P2 } from "./dom.js";
import { IF } from "../weapons/models/camos.js";

var DC = {
  none: [0, 0, 0],
  optic: [0.2, -0.3, 0.55],
  muzzle: [-0.62, -0.06, 0.7],
  underbarrel: [-0.26, 0.2, 0.55],
  magazine: [0.14, 0.14, 0.5],
  stock: [0.58, -0.04, 0.6],
};
var PU = {
  optic: [0, 0.045, 0],
  muzzle: [0, 0, -0.07],
  underbarrel: [0, -0.045, 0],
  magazine: [0, -0.09, 0],
};
var ds0 = [];
var I7 = new Vector3();
var ps0 = {
  smg: 0.24,
  shotgun: 0.36,
  pistol: 0.24,
};
var IC = (o) =>
  (typeof window < "u" && window.GHTRIM && window.GHTRIM[o.id]) ||
  ps0[o.id] ||
  1;
var a6 = 4;
var zU = new Box3();
var H7 = new Vector3();
var pv = new Vector3();
var ed = new Vector3();
var ms0 = {
  ar: {
    magazine: [0.5, 0.2],
    stock: [0.1, 0.66],
    underbarrel: [0.74, 0.68],
  },
  smg: {
    magazine: [0.55, 0.2],
    stock: [0.06, 0.74],
    underbarrel: [0.78, 0.5],
  },
  shotgun: {
    magazine: [0.7, 0.56],
    stock: [0.12, 0.5],
    underbarrel: [0.86, 0.5],
  },
  pistol: {
    magazine: [0.24, 0.16],
    underbarrel: [0.72, 0.72],
  },
};
function LU(o, t) {
  (t.makeEmpty(), o.updateWorldMatrix(!0, !0));
  let e = (s) => {
    if (s.visible) {
      s.isMesh &&
        s.geometry &&
        (s.geometry.boundingBox || s.geometry.computeBoundingBox(),
        zU.copy(s.geometry.boundingBox).applyMatrix4(s.matrixWorld),
        t.union(zU));
      for (let n of s.children) e(n);
    }
  };
  return (e(o), t);
}
function DU(o, t, e, s, { lines: n = 0, thr: i = 6, grow: a = 1 } = {}) {
  let r = t * e,
    l = new Uint8Array(r),
    c = n > 0 ? new Uint8Array(r) : null;
  for (let g = 0; g < r; g++) l[g] = o[g * 4 + 3] > 127 ? 1 : 0;
  if (c) {
    for (let g = 1; g < e - 1; g++)
      for (let b = 1; b < t - 1; b++) {
        let v = g * t + b;
        if (!l[v]) continue;
        let y = o[v * 4 + 2];
        ((l[v + 1] && Math.abs(y - o[(v + 1) * 4 + 2]) > i) ||
          (l[v + t] && Math.abs(y - o[(v + t) * 4 + 2]) > i)) &&
          (c[v] = 1);
      }
    for (let g = 0; g < a; g++) {
      let b = c.slice();
      for (let v = 1; v < e - 1; v++)
        for (let y = 1; y < t - 1; y++) {
          let M = v * t + y;
          !b[M] && (b[M - 1] || b[M + 1] || b[M - t] || b[M + t]) && (c[M] = 1);
        }
    }
  }
  let h = Math.floor(t / s),
    f = Math.floor(e / s),
    u = document.createElement("canvas");
  ((u.width = h), (u.height = f));
  let d = u.getContext("2d"),
    m = d.createImageData(h, f),
    p = m.data,
    x = 1 / (s * s);
  for (let g = 0; g < f; g++)
    for (let b = 0; b < h; b++) {
      let v = 0,
        y = 0,
        M = e - 1 - g * s;
      for (let T = 0; T < s; T++) {
        let S = (M - T) * t + b * s;
        for (let E = 0; E < s; E++) {
          let _ = S + E;
          l[_] && (v++, c && c[_] && y++);
        }
      }
      let w = (g * h + b) * 4;
      ((p[w] = p[w + 1] = p[w + 2] = 255),
        (p[w + 3] = Math.round(255 * Math.max(0, v * x - n * y * x))));
    }
  return (d.putImageData(m, 0, 0), u);
}
var WeaponStudio = class {
  constructor({ buildGun: t, buildGrenade: e }) {
    ((this.buildGun = t),
      (this.buildGrenade = e),
      (this.canvas = document.createElement("canvas")));
    let s = (this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: !0,
      antialias: !0,
      powerPreference: "high-performance",
    }));
    (s.setPixelRatio(1),
      s.setClearColor(0, 0),
      (s.toneMapping = ACESFilmicToneMapping),
      (s.toneMappingExposure = 1.5));
    let n = (this.scene = new Scene()),
      i = new PMREMGenerator(s);
    ((n.environment = i.fromScene(new L7(), 0.04).texture),
      i.dispose(),
      (n.environmentIntensity = 0.95),
      (this.key = new DirectionalLight(16770248, 4.6)),
      this.key.position.set(2.4, 1.5, 1.2),
      (this.rim = new DirectionalLight(9430271, 5)),
      this.rim.position.set(-1.6, 2.2, -1.4),
      (this.top = new DirectionalLight(16773600, 3)),
      this.top.position.set(1.2, 3, -0.4),
      (this.fill = new DirectionalLight(14674175, 0.7)),
      this.fill.position.set(3, 0.2, -0.6),
      n.add(this.fill),
      (this.kick = new DirectionalLight(16747068, 1.1)),
      this.kick.position.set(1, -1.2, -1.6),
      n.add(this.key, this.rim, this.top, this.kick),
      (this.pivot = new Group()),
      n.add(this.pivot),
      (this.ortho = new OrthographicCamera(-1, 1, 1, -1, 0.05, 6)),
      (this.persp = new PerspectiveCamera(20, 2, 0.05, 20)),
      (this.enc = new ShaderMaterial({
        uniforms: {
          uNear: {
            value: 0,
          },
          uInv: {
            value: 1,
          },
        },
        side: DoubleSide,
        vertexShader:
          "varying float vD; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vD = -mv.z; gl_Position = projectionMatrix * mv; }",
        fragmentShader:
          "varying float vD; uniform float uNear, uInv; void main(){ gl_FragColor = vec4(1.0, 1.0, clamp((vD - uNear) * uInv, 0.0, 1.0), 1.0); }",
      })),
      (this.items = new Map()),
      (this.flat = new Map()),
      (this.shaded = {}),
      (this.cards = new Map()),
      (this.cur = null),
      (this.prev = null),
      (this.mode = "turn"),
      (this.foc = null),
      (this.fy = 0),
      (this.fr = 0),
      (this.fk = 0),
      (this.look = new Vector3()),
      (this.sn = null),
      (this.sw = null),
      (this.pNew = new Plane()),
      (this.pOld = new Plane()),
      (this.cNew = [this.pNew]),
      (this.cOld = [this.pOld]));
    {
      let a = document.createElement("canvas");
      ((a.width = 32), (a.height = 128));
      let r = a.getContext("2d"),
        l = r.createLinearGradient(0, 0, 32, 0);
      (l.addColorStop(0, "rgba(255,170,90,0)"),
        l.addColorStop(0.5, "rgba(255,236,200,1)"),
        l.addColorStop(1, "rgba(255,170,90,0)"),
        (r.fillStyle = l),
        r.fillRect(0, 0, 32, 128));
      let c = r.createLinearGradient(0, 0, 0, 128);
      (c.addColorStop(0, "rgba(0,0,0,1)"),
        c.addColorStop(0.25, "rgba(0,0,0,0)"),
        c.addColorStop(0.75, "rgba(0,0,0,0)"),
        c.addColorStop(1, "rgba(0,0,0,1)"),
        (r.globalCompositeOperation = "destination-out"),
        (r.fillStyle = c),
        r.fillRect(0, 0, 32, 128));
      let h = new CanvasTexture(a);
      ((h.colorSpace = SRGBColorSpace),
        (this.bar = new Sprite(
          new SpriteMaterial({
            map: h,
            color: 16763024,
            transparent: !0,
            blending: AdditiveBlending,
            depthTest: !1,
            depthWrite: !1,
            toneMapped: !1,
          }),
        )),
        (this.bar.visible = !1),
        (this.bar.renderOrder = 10),
        n.add(this.bar));
    }
    ((this.yaw = 0.5),
      (this.spin = 0.42),
      (this.vel = 0),
      (this.drag = !1),
      (this.idle = 9),
      (this.pop = 1),
      (this.fl = 1),
      (this.t = 0),
      (this.w = 0),
      (this.h = 0),
      (this.fit = 0.62));
  }
  _wrap(t, e, s, n, i = 0) {
    let a = new Group(),
      r = new Box3();
    (i && (s.rotation.y = i),
      a.add(s),
      this.pivot.add(a),
      LU(s, r),
      r.getCenter(H7),
      r.getSize(pv));
    let l = {
      key: t,
      id: e,
      holder: a,
      root: s,
      gun: n,
      size: pv.clone(),
      len: pv.z,
      lens: [],
      mounts: {},
      parts: {},
    };
    if (n) {
      let c = n.anchors || {},
        h = ms0[e] || {},
        f = (d, m) => new Vector3(0, r.min.y + m * pv.y, r.max.z - d * pv.z);
      (c.sight &&
        (l.mounts.optic = new Vector3(
          0,
          c.sight.y - 0.012,
          Math.max(r.min.z, c.sight.z - 0.055),
        )),
        c.muzzle &&
          (l.mounts.muzzle = new Vector3(0, c.muzzle.y, c.muzzle.z + 0.012)));
      for (let d of ["underbarrel", "magazine", "stock"])
        h[d] && (l.mounts[d] = f(h[d][0], h[d][1]));
      c.muzzle &&
        l.mounts.underbarrel &&
        (l.mounts.underbarrel.y = Math.min(
          l.mounts.underbarrel.y,
          c.muzzle.y - 0.03,
        ));
      let u = (d) => {
        let m = new Box3();
        return (
          LU(d, m),
          m.isEmpty()
            ? d.getWorldPosition(new Vector3())
            : m.getCenter(new Vector3())
        );
      };
      if ((s.updateWorldMatrix(!0, !0), n.mounts))
        for (let d of ["optic", "muzzle", "underbarrel"]) {
          let m = n.mounts[d];
          if (!m) continue;
          let p =
            m.children.find((x) => x.userData && x.userData.attachment) || null;
          ((l.parts[d] = p),
            (l.mounts[d] = p ? u(p) : m.getWorldPosition(new Vector3())));
        }
      (n.parts &&
        n.parts.mag &&
        ((l.parts.magazine = n.parts.mag),
        (l.mounts.magazine = u(n.parts.mag))),
        s.traverse((d) => {
          d.isMesh &&
            d.material &&
            d.material.isShaderMaterial &&
            l.lens.push(d);
        }));
    }
    return (s.position.sub(H7), (a.visible = !1), this.items.set(t, l), l);
  }
  ensure(t, e = null) {
    let s = e || getBuild(t),
      n = e5(t, s),
      i = this.items.get(n);
    if (i) return i;
    let a = this.buildGun(t, {
      detail: "view",
      build: s,
      portal: !1,
    });
    if (
      (a.resetPose && a.resetPose(),
      a.hands && ((a.hands.left.visible = !1), (a.hands.right.visible = !1)),
      (i = this._wrap(n, t, a.root, a)),
      this.items.size > 14)
    ) {
      for (let [r, l] of this.items)
        if (l !== i && r !== this.cur && r !== "frag" && !this.flat.has(r)) {
          (this.pivot.remove(l.holder), this.items.delete(r));
          break;
        }
    }
    return i;
  }
  build(t = ["ar", "smg", "shotgun", "pistol"]) {
    let e = performance.now();
    (this._wrap("frag", "frag", this.buildGrenade(), null, Math.PI / 2),
      this.flat.set("frag", this._bakeFlat(this.items.get("frag"))),
      (this.shaded.frag = this._bakeShaded(this.items.get("frag"))));
    for (let s of t) {
      let n = Vb(s),
        i = this.ensure(s, n);
      (this.flat.set(i.key, this._bakeFlat(i)),
        this.flat.set(s, this.flat.get(i.key)),
        (this.shaded[s] = this._bakeShaded(i)),
        this.cards.set(i.key, this.shaded[s]));
    }
    return ((this.bakeMs = performance.now() - e), this.bakeMs);
  }
  icons(t, e = null, s = !0) {
    if (t === "frag") return this.flat.get("frag");
    let n = e || getBuild(t),
      i = e5(t, n),
      a = this.flat.get(i);
    if (!a && s)
      try {
        ((a = this._bakeFlat(this.ensure(t, n))), this.flat.set(i, a));
      } catch (r) {
        console.warn("[hud] icon bake failed", r);
      }
    return a || this.flat.get(t);
  }
  factory(t) {
    return this.flat.get(t);
  }
  card(t, e = null) {
    if (t === "frag") return this.shaded.frag;
    let s = e || getBuild(t),
      n = e5(t, s),
      i = this.cards.get(n);
    if (!i)
      try {
        ((i = this._bakeShaded(this.ensure(t, s))), this.cards.set(n, i));
      } catch {
        i = this.shaded[t];
      }
    return i;
  }
  _only(t) {
    for (let e of this.items.values()) e.holder.visible = e === t;
  }
  _bakeFlat(t) {
    let e = this.renderer,
      s = t.id === "frag",
      n = s || t.len < 0.34;
    (this._only(t),
      t.holder.rotation.set(0, 0, 0),
      t.holder.scale.setScalar(1),
      t.holder.position.set(0, 0, 0));
    let i = Math.max(t.size.z, t.size.y) * 0.03,
      a = t.size.z / 2 + i,
      r = t.size.y / 2 + i,
      l = this.ortho;
    ((l.left = -a),
      (l.right = a),
      (l.top = r),
      (l.bottom = -r),
      (l.near = 0.05),
      (l.far = 4),
      l.position.set(2, 0, 0),
      l.up.set(0, 1, 0),
      l.lookAt(0, 0, 0),
      l.updateProjectionMatrix());
    let c = s ? 160 : n ? 384 : 640,
      h = c * a6,
      f = Math.max(a6 * 2, Math.round((h * r) / a / (a6 * 2)) * a6 * 2),
      u = new WebGLRenderTarget(h, f, {
        depthBuffer: !0,
        colorSpace: NoColorSpace,
      }),
      d = new Uint8Array(h * f * 4),
      m = Math.max(0.02, t.size.x * 1.05);
    ((this.enc.uniforms.uNear.value = 2 - m / 2),
      (this.enc.uniforms.uInv.value = 1 / m));
    for (let b of t.lens) b.visible = !1;
    ((this.scene.overrideMaterial = this.enc),
      e.setRenderTarget(u),
      e.setClearColor(0, 0),
      e.clear(),
      e.render(this.scene, l),
      e.setRenderTarget(null),
      (this.scene.overrideMaterial = null));
    for (let b of t.lens) b.visible = !0;
    (e.readRenderTargetPixels(u, 0, 0, h, f, d), u.dispose());
    let p = Math.max(2, Math.round((0.0034 / m) * 255)),
      x = DU(d, h, f, a6, {
        lines: 0.92,
        thr: p,
        grow: 1,
      }),
      g = DU(d, h, f, a6 * 2, {});
    return {
      id: t.id,
      sil: g.toDataURL("image/png"),
      line: x.toDataURL("image/png"),
      aspect: a / r,
      len: t.len,
    };
  }
  _bakeShaded(t) {
    let e = this.renderer,
      s = t.id === "frag";
    this._only(t);
    let n = s ? 200 : 720,
      i = Math.round(n * (s ? 1.1 : 0.42));
    (e.setSize(n * 2, i * 2, !1),
      (this.w = this.h = 0),
      t.holder.scale.setScalar(1),
      t.holder.position.set(0, 0, 0),
      t.holder.rotation.set(s ? 0.2 : 0.06, s ? 0.5 : -0.42, 0, "YXZ"));
    let a = this.persp;
    ((a.fov = 16), (a.aspect = n / i));
    let r =
        (Math.abs(Math.cos(0.42)) * t.size.z +
          Math.abs(Math.sin(0.42)) * t.size.x) *
        1.06,
      l = t.size.y * 1.12,
      c = Math.max(r / a.aspect, l) / (2 * Math.tan((a.fov * Math.PI) / 360));
    (a.position.set(c, c * 0.05, 0),
      a.lookAt(0, 0, 0),
      a.updateProjectionMatrix(),
      (e.toneMappingExposure = 1.5 * Math.min(1, IC(t) * 1.7)),
      e.render(this.scene, a));
    let h = document.createElement("canvas");
    ((h.width = n), (h.height = i));
    let f = h.getContext("2d");
    ((f.imageSmoothingQuality = "high"),
      f.drawImage(this.canvas, 0, 0, n, i),
      t.holder.rotation.set(0, 0, 0));
    let u = h.toDataURL("image/webp", 0.92);
    return (u.indexOf("image/webp") < 0 && (u = h.toDataURL("image/png")), u);
  }
  mount(t) {
    if (this.host === t) return;
    ((this.host = t), t.appendChild(this.canvas), (this.w = this.h = 0));
    let e = this.canvas;
    if (this._bound) return;
    ((this._bound = !0),
      (e.style.width = "100%"),
      (e.style.height = "100%"),
      (e.style.display = "block"),
      (e.style.cursor = "grab"),
      (e.style.touchAction = "none"),
      e.addEventListener("pointerdown", (n) => {
        ((this.drag = !0), (this._px = n.clientX), (this.vel = 0));
        try {
          e.setPointerCapture(n.pointerId);
        } catch {}
        e.style.cursor = "grabbing";
      }),
      e.addEventListener("pointermove", (n) => {
        if (!this.drag) return;
        let i = n.clientX - this._px;
        ((this._px = n.clientX),
          (this.yaw += i * 0.008),
          (this.vel = i * 0.5),
          (this.idle = 0));
      }));
    let s = () => {
      ((this.drag = !1), (e.style.cursor = "grab"));
    };
    (e.addEventListener("pointerup", s),
      e.addEventListener("pointercancel", s));
  }
  select(t, e = null, s = this.mode) {
    let n = this.ensure(t, e);
    if (((this.mode = s), this.cur === n.key)) return n;
    let i = this.curId === t;
    return (
      (this.prev = i ? this.cur : null),
      (this.cur = n.key),
      (this.curId = t),
      (this.sn = null),
      (this.sw = null),
      i ||
        ((this.pop = 0),
        (this.yaw = s === "present" ? 0 : 0.55),
        (this.vel = 0),
        (this.idle = 9)),
      n
    );
  }
  setMode(t) {
    ((this.mode = t), (this.idle = 9));
  }
  flourish() {
    P2 || (this.fl = 0);
  }
  focus(t) {
    ((this.foc = t && DC[t] ? t : null), (this.idle = 9));
  }
  snap(t) {
    let e = this.items.get(this.cur),
      s = e && e.parts[t];
    return !s || P2
      ? ((this.sn = null), !!s)
      : ((this.sn = {
          obj: s,
          rest: s.position.clone(),
          off: PU[t] || PU.optic,
          t: 0,
        }),
        !0);
  }
  sweep() {
    let t = this.prev && this.items.get(this.prev);
    return !t || t.key === this.cur
      ? !1
      : ((this.sw = {
          from: t,
          t: 0,
        }),
        !0);
  }
  frame(t) {
    let e = this.items.get(this.cur),
      s = this.host;
    if (!e || !s) return !1;
    let n = s.clientWidth,
      i = s.clientHeight,
      a = Math.min(window.devicePixelRatio || 1, 2),
      r = Math.round(n * a),
      l = Math.round(i * a);
    if (r < 8 || l < 8) return !1;
    ((r !== this.w || l !== this.h) &&
      ((this.w = r), (this.h = l), this.renderer.setSize(r, l, !1)),
      (this.t += t),
      (this.idle += t),
      IF(this.t));
    let c = this.mode === "present" && this.foc ? DC[this.foc] : DC.none,
      h = Math.min(1, t * 5.5);
    if (
      ((this.fy += (c[0] - this.fy) * h),
      (this.fr += (c[1] - this.fr) * h),
      (this.fk += (c[2] - this.fk) * h),
      !this.drag)
    )
      if (((this.vel *= Math.exp(-3 * t)), this.mode === "present")) {
        if (((this.yaw += this.vel * t), this.idle > 2.2)) {
          let w =
            Math.round(this.yaw / (Math.PI * 2)) * Math.PI * 2 +
            (P2 ? 0 : Math.sin(this.t * 0.45) * 0.1);
          this.yaw += (w - this.yaw) * Math.min(1, t * 2.4);
        }
      } else P2 || (this.yaw += (this.spin + this.vel) * t);
    ((this.pop = Math.min(1, this.pop + t * 3.4)),
      (this.fl = Math.min(1, this.fl + t * 0.95)));
    let f = 1 - Math.pow(1 - this.pop, 3),
      u = 1 - Math.pow(1 - this.fl, 3);
    if (this.sn) {
      let w = this.sn;
      w.t += t / 0.26;
      let T = Math.min(1, w.t),
        S = 1 - Math.pow(1 - T, 3);
      (w.obj.position.set(
        w.rest.x + w.off[0] * (1 - S),
        w.rest.y + w.off[1] * (1 - S),
        w.rest.z + w.off[2] * (1 - S),
      ),
        T >= 1 && (w.obj.position.copy(w.rest), (this.sn = null)));
    }
    let d = e.holder;
    (d.rotation.set(
      0.06 + Math.sin(this.t * 0.6) * 0.02 + Math.sin(u * Math.PI) * 0.22,
      this.yaw + this.fy + (1 - f) * -0.7 + (1 - u) * Math.PI * 2,
      this.fr + Math.sin(u * Math.PI) * -0.12,
      "YXZ",
    ),
      d.scale.setScalar(0.92 + 0.08 * f),
      d.position.set(0, P2 ? 0 : Math.sin(this.t * 0.9) * e.size.y * 0.012, 0));
    let m = Math.sin(u * Math.PI) * 0.8,
      p = this.persp;
    ((p.fov = 20), (p.aspect = r / l));
    let x = this.foc && e.mounts[this.foc];
    (x ? (ed.copy(x), e.root.localToWorld(ed)) : ed.set(0, 0, 0),
      this.look.lerp(ed, h));
    let g =
        (Math.max(e.size.z / (p.aspect * this.fit), e.size.y / 0.42, 0.42) /
          (2 * Math.tan((p.fov * Math.PI) / 360))) *
        (1 - 0.16 * this.fk),
      b = this.look.x * this.fk * 0.6,
      v = this.look.y * this.fk * 0.6,
      y = this.look.z * this.fk * 0.6;
    (p.position.set(g, v + g * 0.06, y),
      p.lookAt(b, v, y),
      p.updateProjectionMatrix());
    let M = this.renderer;
    if (this.sw) {
      let w = this.sw,
        T = w.from.holder;
      w.t += t / 0.75;
      let S = Math.min(1, w.t),
        E = S * S * (3 - 2 * S),
        _ = e.size.z / 2 + 0.03,
        R = -_ + E * _ * 2;
      (d.updateMatrixWorld(!0),
        I7.set(0, 0, 1).transformDirection(d.matrixWorld),
        H7.setFromMatrixPosition(d.matrixWorld));
      let C = R + I7.dot(H7);
      (this.pNew.normal.copy(I7).negate(),
        (this.pNew.constant = C),
        this.pOld.normal.copy(I7),
        (this.pOld.constant = -C),
        T.position.copy(d.position),
        T.rotation.copy(d.rotation),
        T.scale.copy(d.scale),
        (this.bar.visible = S < 1),
        this.bar.position.set(0, 0, R).applyMatrix4(d.matrixWorld),
        this.bar.scale.set(e.size.z * 0.05, e.size.y * 1.7, 1),
        (this.bar.material.opacity = Math.sin(S * Math.PI)),
        (m += Math.sin(S * Math.PI) * 0.35),
        (M.toneMappingExposure = (1.5 + m) * IC(e)),
        (M.clippingPlanes = this.cNew),
        this._only(e),
        (this.bar.visible = !1),
        M.render(this.scene, p),
        (M.autoClear = !1),
        (M.clippingPlanes = this.cOld),
        this._only(w.from),
        M.render(this.scene, p),
        (M.clippingPlanes = ds0),
        this._only(null),
        (this.bar.visible = S < 1),
        M.render(this.scene, p),
        (M.autoClear = !0),
        (this.bar.visible = !1),
        S >= 1 && (this.sw = null));
    } else
      ((M.toneMappingExposure = (1.5 + m) * IC(e)),
        this._only(e),
        M.render(this.scene, p));
    return ((this._cw = n), (this._ch = i), !0);
  }
  project(t, e) {
    let s = this.items.get(this.cur),
      n = s && s.mounts[t];
    return n
      ? (ed.copy(n),
        s.root.localToWorld(ed),
        ed.project(this.persp),
        (e.x = (ed.x * 0.5 + 0.5) * this._cw),
        (e.y = (-ed.y * 0.5 + 0.5) * this._ch),
        e)
      : null;
  }
};

export { WeaponStudio };

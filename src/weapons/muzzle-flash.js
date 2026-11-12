// weapons/muzzle-flash.js: recovered from the verified GOLDEN HOUR release.
import {
  AdditiveBlending,
  DoubleSide,
  DynamicDrawUsage,
  Group,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";

var _I = 44;
var vZ = 1 / 64;
var vr = new Vector3();
var o5 = new Vector3();
var RI = new Vector3();
var AI = new Vector3();
var jw = new Vector3();
var tn = (o, t) => o + (t - o) * Math.random();
var kI = 0;
var MZ = 1;
var wZ = 2;
var EZ = 3;
var TZ = `
  attribute vec4 iO, iA, iP, iQ;
  uniform float uGrow;
  varying vec2 vUv; varying vec4 vP, vQ; varying float vKind, vEnd;
  void main() {
    vec3 o = (modelViewMatrix * vec4(iO.xyz, 1.0)).xyz;
    vec3 vp; vEnd = 1.0;
    if (iO.w < 1.5) {
      vec3 ax = mat3(modelViewMatrix) * iA.xyz * uGrow;
      vec3 an = normalize(ax), vn = normalize(o + ax * 0.5), side;
      if (iO.w < 0.5) {
        // a card turned about its own axis to face the eye
        side = cross(an, vn); float sl = length(side);
        side = sl > 1e-4 ? side / sl : vec3(1.0, 0.0, 0.0);
        vEnd = smoothstep(0.1, 0.42, sl);                 // seen end-on a card is nothing: let it go
      } else {
        // a fixed plane through the axis: two or three of them, crossed, give the flame depth off-axis
        vec3 a0 = normalize(iA.xyz);
        vec3 b1 = normalize(abs(a0.y) > 0.95 ? cross(a0, vec3(1.0, 0.0, 0.0)) : cross(a0, vec3(0.0, 1.0, 0.0))), b2 = cross(a0, b1);
        side = normalize(mat3(modelViewMatrix) * (b1 * cos(iP.z) + b2 * sin(iP.z)));
        vEnd = smoothstep(0.08, 0.5, abs(dot(normalize(cross(an, side)), vn)));       // edge-on planes fade out
      }
      vp = o + ax * (position.y + 0.5) + side * (position.x * 2.0 * iA.w * uGrow);
      vUv = vec2(position.x * 2.0, position.y + 0.5);
    } else {
      // the ball at the crown / the halo: faces the eye
      float cs = cos(iP.z), sn = sin(iP.z); vec2 q = position.xy * 2.0;
      vp = o + vec3(q.x * cs - q.y * sn, q.x * sn + q.y * cs, 0.0) * (iA.w * uGrow);
      vUv = q;
    }
    gl_Position = projectionMatrix * vec4(vp, 1.0);
    vP = iP; vQ = iQ; vKind = iO.w;
  }`;
var SZ = `
  precision highp float; precision highp sampler3D;
  uniform sampler3D tNoise; uniform float uStage, uPhase, uErode, uK, uAds, uShoulder; uniform vec2 uRes; uniform vec4 uGuard;
  uniform vec3 uCore, uHot, uBody, uEdge;
  varying vec2 vUv; varying vec4 vP, vQ; varying float vKind, vEnd;
  vec4 N(vec3 p) { return textureLod(tNoise, p, 0.0); }
  // sight guard: aimed, flame only shows under the aiming point; side gas may lick up beside the sights, never on them
  float guard(float margin, float sideK) {
    float dx = abs(gl_FragCoord.x / uRes.x * 2.0 - 1.0 - uGuard.x) * uRes.x / uRes.y, below = uGuard.y - (gl_FragCoord.y / uRes.y * 2.0 - 1.0);
    float line = smoothstep(uGuard.z * margin, uGuard.w * margin, below);
    float side = smoothstep(0.075, 0.17, dx) * smoothstep(-0.065, -0.01, below) * 0.7 * uShoulder * sideK;
    return mix(1.0, max(line, side), uAds);
  }
  void main() {
    float seed = vP.x, rag = vP.w, layer = vQ.x, adv = uPhase * vQ.y, er = uErode + vQ.z;
    float late = min(uStage, 1.0), hot = 1.0 - late;         // hot: the frame of the shot
    float k = vP.y * uK; vec3 col;
    if (vKind > 2.5) {
      // halo: glowing gas with no edge at all
      float r = length(vUv), g = exp(-r * r * 3.2) * (1.0 - smoothstep(0.75, 1.0, r));
      gl_FragColor = vec4(mix(uBody, uEdge, 0.35) * (g * k * mix(1.0, 0.35, late) * guard(1.3, 0.0)), 1.0); return;       // the soft glow never spreads beside the sights
    }
    if (vKind < 1.5) {
      float u = vUv.x, t = vUv.y;
      if (layer < 0.5) {
        // outer gas: slow billows, eaten from the edge inward
        float w = N(vec3(u * 0.3 + seed, t * 0.6 - adv - seed * 1.7, seed * 0.37)).r - 0.5;
        float b1 = N(vec3(u * 0.45 - seed, t * 0.9 - adv * 1.3 + seed * 0.5, seed * 0.11 + w * 0.2)).g;
        float b2 = N(vec3(u * 1.1 + seed * 3.0, t * 2.1 - adv * 1.8, seed * 0.53)).b;
        float hw = pow(sin(3.14159 * pow(clamp(t, 0.0, 1.0), 0.55)), 0.7);            // pointed at both ends, fat near the root
        float d = hw - abs(u + w * 0.8 * t) + (b1 * 0.9 + b2 * 0.4 - 0.72) * (0.3 + t) * rag - er * (0.5 + t);
        float body = smoothstep(0.0, 0.42, d);
        if (body <= 0.002) discard;
        col = mix(uEdge, uBody, smoothstep(0.12, 0.7, d) * (0.4 + 0.6 * hot)) * body;
        k *= (1.0 - 0.7 * t * t) * mix(1.0, 0.5, late);
      } else {
        // inner cone: fast streaks along the bore, yellow, white only where it leaves the crown
        float s1 = N(vec3(u * 1.6 + seed, t * 0.35 - adv, seed * 0.3)).r - 0.5;
        float s2 = N(vec3(u * 4.2 - seed, t * 0.7 - adv * 1.5, seed * 0.7)).a - 0.5;
        float hw = pow(max(1.0 - t, 0.0), 0.7) * smoothstep(0.0, 0.05, t);
        float d = hw - abs(u + s1 * 0.5 * t) + (s1 * 0.5 + s2 * 0.35) * (0.4 + t) * rag - er * (0.8 + t) - late * 0.35;
        float body = smoothstep(0.0, 0.5, d);
        if (body <= 0.002) discard;
        col = uHot * body * (1.0 - 0.6 * t) + uCore * exp(-t * t * 70.0) * smoothstep(0.1, 0.7, d);
        k *= mix(1.0, 0.18, late);
      }
      k *= vEnd;
    } else {
      // the ball of fire at the crown (what the flame is, seen end-on): ragged gas around a small white heart
      float r = length(vUv), an = atan(vUv.y, vUv.x);
      vec3 dir = vec3(cos(an), sin(an), 0.0);
      float n1 = N(dir * 0.42 + vec3(seed, seed * 0.7, seed * 1.3 + adv * 0.3)).r, n2 = N(dir * 1.25 + vec3(seed * 2.0, 0.3, seed)).a;
      float b = N(vec3(vUv * 0.55, seed * 0.9 + adv * 0.4)).g;
      float rad = 0.28 + 0.64 * clamp(n1 * 1.5 - 0.25, 0.0, 1.0) * (0.55 + 0.9 * n2) * rag;       // ragged: no two lobes alike
      float d = (rad - r) * 2.2 + (b - 0.55) * 0.9 * rag - er * 1.3;
      float body = smoothstep(0.0, 0.5, d);
      if (body <= 0.002) discard;
      col = mix(uEdge, uBody, smoothstep(0.15, 0.75, d) * (0.4 + 0.6 * hot)) * body + (uHot * smoothstep(0.5, 1.2, d) * 0.6 + uCore * exp(-r * r * 34.0) * 1.3) * hot;
      k *= mix(1.0, 0.42, late);
    }
    gl_FragColor = vec4(col * (k * guard(1.0, 1.0)), 1.0);
  }`;
var Mu = {
  rifle: {
    cone: [0.2, 0.046],
    ball: 0.066,
    jets: [4, 0.1, 0.026, 62, 1],
    k: 1,
    sparks: [0.24, 2, 4],
  },
  brake: {
    cone: [0.09, 0.028],
    ball: 0.036,
    jets: [2, 0.21, 0.042, 86, 0],
    extra: [2, 0.12, 0.026, 118, 0],
    k: 1,
    sparks: [0.2, 1, 3],
  },
  comp: {
    cone: [0.1, 0.03],
    ball: 0.038,
    jets: [3, 0.16, 0.03, 80, 0],
    up: !0,
    k: 0.95,
    sparks: [0.2, 1, 3],
  },
  smg: {
    cone: [0.22, 0.056],
    ball: 0.088,
    jets: [4, 0.14, 0.036, 64, 1],
    k: 1,
    sparks: [0.12, 1, 3],
    side: 0.12,
  },
  shotgun: {
    cone: [0.32, 0.085],
    ball: 0.092,
    jets: [5, 0.115, 0.046, 50, 1],
    k: 0.82,
    frames: 3,
    sparks: [1, 9, 15],
  },
  pistol: {
    cone: [0.1, 0.028],
    ball: 0.042,
    jets: [3, 0.055, 0.017, 64, 1],
    k: 0.88,
    sparks: [0.1, 1, 2],
    side: 0.085,
  },
};
var MuzzleFlash = class {
  constructor(t, e) {
    ((this.ctx = t), (this.light = e), (this.group = new Group()));
    let s = new PlaneGeometry(1, 1),
      n = (this.geo = new InstancedBufferGeometry());
    ((n.index = s.index), n.setAttribute("position", s.attributes.position));
    let i = () => {
      let c = new InstancedBufferAttribute(new Float32Array(_I * 4), 4);
      return (c.setUsage(DynamicDrawUsage), c);
    };
    (n.setAttribute("iO", (this.aO = i())),
      n.setAttribute("iA", (this.aA = i())),
      n.setAttribute("iP", (this.aP = i())),
      n.setAttribute("iQ", (this.aQ = i())),
      (n.instanceCount = 0));
    let a = t.gfx.fx;
    this.uniforms = {
      tNoise: {
        value: a && a.atlas ? a.atlas.noise : null,
      },
      uStage: {
        value: 0,
      },
      uPhase: {
        value: 0,
      },
      uErode: {
        value: 0,
      },
      uGrow: {
        value: 1,
      },
      uK: {
        value: 1,
      },
      uAds: {
        value: 0,
      },
      uShoulder: {
        value: 0,
      },
      uRes: {
        value: new Vector2(1600, 900),
      },
      uGuard: {
        value: new Vector4(0, 0, 0.024, 0.1),
      },
      uCore: {
        value: new Vector3(6.4, 5.2, 3.4),
      },
      uHot: {
        value: new Vector3(3, 1.75, 0.5),
      },
      uBody: {
        value: new Vector3(2, 0.72, 0.15),
      },
      uEdge: {
        value: new Vector3(1, 0.2, 0.03),
      },
    };
    let r = (this.material = new ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: TZ,
        fragmentShader: SZ,
        transparent: !0,
        depthWrite: !1,
        depthTest: !0,
        blending: AdditiveBlending,
        side: DoubleSide,
        fog: !1,
      })),
      l = (this.mesh = new Mesh(n, r));
    ((l.frustumCulled = !1),
      (l.visible = !1),
      (l.renderOrder = 1),
      this.group.add(l),
      (this.n = 0),
      (this.t = 9),
      (this.fresh = !1),
      (this.stage = 9),
      (this.frames = 2),
      (this.I = 0),
      (this.ads = 0),
      (this.heat = 0),
      (this.since = 9),
      (this.acc = 0),
      (this.accP = 0),
      (this.accH = 0),
      (this.suppressed = !1),
      (this.fwd = new Vector3(0, 0, -1)),
      (this.mPrev = new Vector3()),
      (this.mVel = new Vector3()),
      (this.mHas = !1));
  }
  _put(t, e, s, n, i, a, r, l, c, h, f, u, d, m) {
    if (this.n >= _I) return;
    let p = this.n++ * 4,
      x = this.aO.array,
      g = this.aA.array,
      b = this.aP.array,
      v = this.aQ.array;
    ((x[p] = e),
      (x[p + 1] = s),
      (x[p + 2] = n),
      (x[p + 3] = t),
      (g[p] = i),
      (g[p + 1] = a),
      (g[p + 2] = r),
      (g[p + 3] = l),
      (b[p] = Math.random() * 37),
      (b[p + 1] = c),
      (b[p + 2] = h),
      (b[p + 3] = f),
      (v[p] = u),
      (v[p + 1] = d),
      (v[p + 2] = m),
      (v[p + 3] = 0));
  }
  _tongue(t, e, s, n, i, a, r, l, c, h, f = 3, u = 1) {
    let d = Math.random() * 3.1416;
    for (let m = 0; m < f; m++) {
      let p = r * tn(0.82, 1.15);
      this._put(
        MZ,
        t,
        e,
        s,
        n * p,
        i * p,
        a * p,
        l * tn(0.9, 1.25),
        c * 0.36,
        d + (m * 3.1416) / f + tn(-0.2, 0.2),
        h * tn(0.9, 1.3),
        0,
        tn(0.45, 0.8),
        tn(0, 0.07),
      );
    }
    if (
      (this._put(
        kI,
        t,
        e,
        s,
        n * r,
        i * r,
        a * r,
        l,
        c * 0.3,
        0,
        h,
        0,
        tn(0.5, 0.9),
        tn(0, 0.05),
      ),
      u > 0)
    ) {
      let m = r * tn(0.55, 0.7);
      this._put(
        kI,
        t,
        e,
        s,
        n * m,
        i * m,
        a * m,
        l * 0.5,
        c * u,
        0,
        h,
        1,
        tn(1.5, 2.2),
        0,
      );
    }
  }
  _ball(t, e, s, n, i, a, r = wZ) {
    this._put(
      r,
      t,
      e,
      s,
      0,
      0,
      0,
      n,
      i,
      Math.random() * 6.2832,
      a,
      0,
      tn(0.6, 1),
      0,
    );
  }
  fire(t, e) {
    let s = e.gun,
      n = (s.build && s.build.muzzle) || "none",
      i = t.id,
      a = this.uniforms,
      r = !!t.suppressed || n === "suppressor",
      l =
        i === "shotgun"
          ? Mu.shotgun
          : i === "pistol"
            ? Mu.pistol
            : i === "smg"
              ? Mu.smg
              : Mu.rifle,
      c = r ? Mu.pistol : n === "brake" ? Mu.brake : n === "comp" ? Mu.comp : l,
      h = this.ads,
      f = i === "shotgun" ? 1.25 : 1,
      u =
        tn(0.82, 1.2) *
        (1 - 0.22 * h) *
        (c === Mu.brake || c === Mu.comp ? f : 1),
      d = tn(0.78, 1.15) * c.k * (1 - 0.3 * h);
    if (
      ((this.n = 0),
      (this.suppressed = r),
      (this.frames = r ? 1 : c.frames || 2),
      (this.heat = Math.min(
        14,
        this.heat + (i === "shotgun" ? 2.6 : i === "pistol" ? 1.3 : 1),
      )),
      (this.since = 0),
      (a.uShoulder.value = l.side ? 1 : 0),
      r)
    )
      (Math.random() < 0.55 &&
        this._ball(0, 0, -0.012, 0.011 * tn(0.8, 1.3), 0.16 * tn(0.6, 1), 0.6),
        (this.I = 0.015));
    else {
      let p = Math.random() * 6.2832,
        x = Math.random() < 0.5 ? -1 : 1,
        g = (l.side ? (i === "pistol" ? 0 : 0.006) : 0.018) * h;
      (this._tongue(
        0,
        g,
        0.004,
        tn(-0.05, 0.05),
        tn(-0.05, 0.03) - 0.25 * h,
        -1,
        c.cone[0] * u * tn(0.8, 1.25),
        c.cone[1] * u,
        d,
        tn(0.9, 1.3),
        3,
        1,
      ),
        Math.random() < 0.7 &&
          this._tongue(
            0,
            g,
            0,
            tn(-0.14, 0.14),
            tn(-0.12, 0.1) - 0.25 * h,
            -1,
            c.cone[0] * u * tn(0.45, 0.7),
            c.cone[1] * u * 1.2,
            d * 0.8,
            tn(1, 1.5),
            2,
            0,
          ),
        this._ball(
          0,
          g,
          -c.ball * 0.5 * u,
          c.ball * (2.6 + 1.6 * h) * u,
          d * (0.2 + 0.45 * h),
          0,
          EZ,
        ),
        this._ball(
          0,
          g,
          -c.ball * 0.55 * u,
          c.ball * u * tn(0.85, 1.2),
          d * 0.72,
          tn(0.85, 1.25),
        ));
      let b = c.jets,
        v = b[0] + (b[4] && Math.random() < 0.35 ? -1 : 0);
      for (let y = 0; y < v; y++) {
        let M;
        c.up
          ? (M = Math.PI / 2 + (y - (v - 1) / 2) * 0.62 * x + tn(-0.08, 0.08))
          : b[4]
            ? (M = p + (y / v) * 6.2832 + tn(-0.22, 0.22))
            : (M = (y === 0 ? 0 : Math.PI) + tn(-0.07, 0.07));
        let w = ((b[3] + tn(-7, 7)) * Math.PI) / 180,
          T = Math.sin(w),
          S = Math.cos(w),
          E = b[1] * u * tn(0.65, 1.25),
          _ = Math.sin(M) * T;
        (_ > 0 && (E *= 1 - 0.35 * h * _),
          this._tongue(
            0,
            g,
            -0.006,
            Math.cos(M) * T,
            _,
            -S,
            E,
            b[2] * u * tn(0.8, 1.25),
            d * tn(0.7, 1),
            tn(0.9, 1.4),
            2,
            b[4] ? 0.7 : 0.9,
          ));
      }
      if (c.extra)
        for (let y = 0; y < c.extra[0]; y++) {
          let M = (y === 0 ? 0 : Math.PI) + tn(-0.1, 0.1),
            w = (c.extra[3] * Math.PI) / 180;
          this._tongue(
            0,
            g,
            -0.03,
            Math.cos(M) * Math.sin(w),
            Math.sin(M) * Math.sin(w),
            -Math.cos(w),
            c.extra[1] * u * tn(0.7, 1.2),
            c.extra[2] * u,
            d * 0.7,
            1.2,
            2,
            0,
          );
        }
      if (
        (l.side &&
          h > 0.3 &&
          this._ball(
            0,
            g,
            -0.012,
            c.ball * (i === "pistol" ? 1.75 : 1.35) * u,
            d * 0.7 * h,
            tn(1.1, 1.5),
          ),
        l.side && h > 0.3)
      )
        for (let y = 0; y < 2; y++) {
          let M = y ? 1 : -1,
            w = tn(-0.12, 0.3),
            T = l.side * u * tn(0.8, 1.25);
          this._tongue(
            0,
            g,
            -0.01,
            M * Math.cos(w) * 0.94,
            Math.sin(w) * 0.94,
            -0.34,
            T,
            T * tn(0.2, 0.28),
            d * h,
            tn(1, 1.5),
            2,
            0.7,
          );
        }
      this.I =
        0.85 *
        t.flash *
        d *
        (i === "shotgun" ? 1.25 : 1) *
        (1 - 0.12 * h) *
        (1 - 0.4 * ((this.light && this.light.sunK) || 0));
    }
    ((this.aO.needsUpdate =
      this.aA.needsUpdate =
      this.aP.needsUpdate =
      this.aQ.needsUpdate =
        !0),
      (this.geo.instanceCount = this.n),
      (this.mesh.visible = this.n > 0),
      (this.t = 0),
      (this.fresh = !0),
      (this.stage = 0),
      (a.uStage.value = 0),
      (a.uPhase.value = 0),
      (a.uErode.value = tn(0, 0.07)),
      (a.uGrow.value = 1));
    let m = this.ctx.gfx.fx;
    if (m && e.muzzleWorld) {
      e.muzzleWorld(vr);
      let p = this.fwd;
      if (r)
        (m.muzzleSmoke && m.muzzleSmoke(vr, p, 6, 0.7),
          m._warp &&
            m._warp(
              0,
              vr.x + p.x * 0.12,
              vr.y + p.y * 0.12 + 0.01,
              vr.z + p.z * 0.12,
              0.06,
              0.2,
              0.22,
              0.004,
              0.25,
            ));
      else {
        let x = c.sparks;
        (x &&
          m.muzzleSparks &&
          Math.random() < x[0] &&
          m.muzzleSparks(
            vr,
            p,
            Math.round(tn(x[1], x[2])),
            i === "shotgun" ? 0.34 : 0.22,
          ),
          m._warp &&
            this.heat > 3 &&
            m._warp(
              0,
              vr.x + p.x * 0.2,
              vr.y + p.y * 0.2 + 0.02,
              vr.z + p.z * 0.2,
              0.1,
              0.26,
              0.2,
              0.0035,
              0.3,
            ));
      }
    }
  }
  update(t, e, s, n) {
    let i = this.ctx.gfx,
      a = this.uniforms,
      r = e.gun;
    ((this.ads = s ? s.adsK : 0),
      s && s.viewDir && this.fwd.copy(s.viewDir),
      a.uRes.value.copy(i.size),
      (a.uAds.value = this.ads),
      !a.tNoise.value &&
        i.fx &&
        i.fx.atlas &&
        (a.tNoise.value = i.fx.atlas.noise),
      r &&
        r.anchors &&
        r.anchors.sight &&
        (r.root.updateWorldMatrix(!0, !1),
        vr.copy(r.anchors.sight),
        (vr.z -= 40),
        r.root.localToWorld(vr).project(e.cam),
        (a.uGuard.value.x = vr.x),
        (a.uGuard.value.y = vr.y)));
    let l = 0;
    if (this.mesh.visible)
      if (this.fresh) ((this.fresh = !1), (l = this.I));
      else {
        this.t += t;
        let u = Math.min(this.stage + 1, Math.floor(this.t / vZ));
        (u > this.stage &&
          ((this.stage = u),
          u >= this.frames
            ? ((this.mesh.visible = !1), (this.geo.instanceCount = 0))
            : ((a.uStage.value = u),
              (a.uPhase.value = u * tn(0.8, 1.2)),
              (a.uErode.value = 0.24 * u + tn(0, 0.12)),
              (a.uGrow.value = 1 + 0.26 * u))),
          this.mesh.visible &&
            (l = this.stage === 0 ? this.I : (this.I * 0.3) / this.stage));
      }
    this.light && (this.light.ownShot = this.since);
    let c = this.light && this.light.flash;
    (c &&
      r &&
      (vr.copy(r.anchors.muzzle),
      (vr.z -= 0.24),
      (vr.y -= 0.02),
      r.root.localToWorld(vr),
      c.position.copy(vr),
      (c.intensity = l),
      (c.distance = 3.2),
      c.color.setRGB(1, 0.6, 0.3)),
      (this.since += t),
      this.since > 0.3 && (this.heat = Math.max(0, this.heat - t * 2.4)));
    let h = i.fx,
      f = this.heat;
    if (
      h &&
      r &&
      t > 0 &&
      f > 3.5 &&
      this.since > 0.09 &&
      this.since < 2.6 &&
      n &&
      n.state !== "holster" &&
      e.muzzleWorld
    ) {
      let u = Math.min(1, (f - 3.5) / 7),
        d = this.fwd;
      for (
        e.muzzleWorld(o5),
          this.mHas
            ? (jw.subVectors(o5, this.mPrev).multiplyScalar(1 / t),
              jw.lengthSq() > 16 && jw.setLength(4),
              this.mVel.lerp(jw, Math.min(1, t * 12)))
            : this.mVel.set(0, 0, 0),
          this.mPrev.copy(o5),
          this.mHas = !0,
          this.acc = Math.min(2, this.acc + t * (26 + 14 * u)),
          this.accP = Math.min(1, this.accP + t * (12 + 8 * u)),
          this.accH += t * (2 + 4 * u);
        this.acc >= 1;
      )
        ((this.acc -= 1),
          h.barrelSmoke && h.barrelSmoke(o5, d, u, 1, this.mVel));
      (this.accH >= 1 &&
        ((this.accH = 0),
        h._warp &&
          u > 0.25 &&
          h._warp(
            0,
            o5.x - d.x * 0.12,
            o5.y + 0.035,
            o5.z - d.z * 0.12,
            0.07,
            0.17,
            0.5,
            0.0024 * u,
            0.22,
          )),
        this.accP >= 1 &&
          e.ejectWorld &&
          this.since < 1.3 &&
          ((this.accP -= 1),
          e.ejectWorld(AI, RI),
          h.barrelSmoke && h.barrelSmoke(AI, RI, u * 0.55, 0.6, this.mVel)));
    } else this.mHas = !1;
  }
};

export { MuzzleFlash };

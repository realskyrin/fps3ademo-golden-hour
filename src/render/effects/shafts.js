// render/effects/shafts.js: recovered from the verified GOLDEN HOUR release.
import { DL, b9, bg } from "./particles.js";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  CustomBlending,
  DoubleSide,
  Float32BufferAttribute,
  HalfFloatType,
  LinearFilter,
  Matrix4,
  Mesh,
  NoBlending,
  OneFactor,
  Points,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderTarget,
} from "../../vendor/three-r180.js";
import { ic } from "../../vendor/postprocessing.js";
import { createRandom } from "../../core/math.js";

var XY = `
  precision highp float; precision highp sampler3D;
  uniform sampler2D tDepth, tShadow; uniform sampler3D tNoise;
  uniform mat4 uInvProj, uCamWorld, uShadowMat;
  uniform vec3 uSunDir, uColor, uBoxMin, uBoxMax; uniform float uTime, uDensity; uniform vec4 uPush[4]; uniform vec4 uPushT;
  varying vec2 vUv;
  ${bg}
  ${DL}
  void main() {
    float d = texture2D(tDepth, vUv).x;
    vec4 vp = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0); vp /= vp.w;
    float dist = length(vp.xyz);
    vec3 rd = mat3(uCamWorld) * (vp.xyz / dist), ro = uCamWorld[3].xyz;
    vec3 inv = 1.0 / (rd + vec3(1e-6));
    vec3 t0 = (uBoxMin - ro) * inv, t1 = (uBoxMax - ro) * inv, tmn = min(t0, t1), tmx = max(t0, t1);
    float ta = max(max(tmn.x, tmn.y), max(tmn.z, 0.0)), tb = min(min(tmx.x, tmx.y), min(tmx.z, min(dist, 46.0)));
    if (tb <= ta) { gl_FragColor = vec4(0.0, 0.0, 0.0, d); return; }
    float stepLen = (tb - ta) / float(STEPS), jit = ign(gl_FragCoord.xy);
    vec3 drift = vec3(uTime * 0.011, -uTime * 0.006, uTime * 0.008);
    float acc = 0.0;
    for (int i = 0; i < STEPS; i++) {
      vec3 p = ro + rd * (ta + (float(i) + jit) * stepLen);
      vec4 sc = uShadowMat * vec4(p, 1.0);
      if (sc.x > 0.0 && sc.x < 1.0 && sc.y > 0.0 && sc.y < 1.0 && sc.z < 1.0 && sc.z - 0.0008 < unpackD(textureLod(tShadow, sc.xy, 0.0))) {
        float n = textureLod(tNoise, p * 0.085 + drift, 0.0).r, n2 = textureLod(tNoise, p * 0.31 - drift * 2.3, 0.0).a;
        float dens = 0.42 + 1.5 * n * n2 * 2.0;
        // explosions / gunfire punch brief holes in the haze
        for (int k = 0; k < 4; k++) { vec3 e = p - uPush[k].xyz; float age = uTime - uPushT[k]; float rr = uPush[k].w * (0.35 + age * 1.6); dens *= 1.0 - 0.75 * exp(-age * 0.9) * smoothstep(rr, rr * 0.4, length(e)); }
        // thinner toward the ceiling, a little thicker near the floor where dust hangs
        dens *= mix(1.15, 0.65, clamp(p.y / 7.0, 0.0, 1.0));
        acc += dens;
      }
    }
    float cosT = dot(rd, uSunDir);
    const float g = 0.62;
    float phase = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5);
    phase = 0.2 + 0.085 * min(phase, 4.5);
    gl_FragColor = vec4(uColor * (acc * stepLen * phase * uDensity), d);
  }`;
var YY = `
  precision highp float;
  uniform sampler2D tMap; uniform vec2 uDir;
  varying vec2 vUv;
  float lin(float d) { return 0.06 / (1.0001 - d); }
  void main() {
    vec4 c = texture2D(tMap, vUv); float z = lin(c.a);
    vec3 acc = c.rgb * 0.227; float wt = 0.227;
    for (int i = 1; i <= 4; i++) {
      float w = i == 1 ? 0.1945 : i == 2 ? 0.1216 : i == 3 ? 0.054 : 0.0162;
      for (int s = -1; s <= 1; s += 2) {
        vec4 t = texture2D(tMap, vUv + uDir * (float(i * s) * 1.5));
        float ww = w * (1.0 / (1.0 + abs(lin(t.a) - z) * 2.0 / (0.05 + z * 0.08)));
        acc += t.rgb * ww; wt += ww;
      }
    }
    gl_FragColor = vec4(acc / wt, c.a);
  }`;
var XM = class {
  constructor(t) {
    ((this.steps = 0), (this.w = 2), (this.h = 2));
    let e = {
      type: HalfFloatType,
      depthBuffer: !1,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
    };
    ((this.rtA = new WebGLRenderTarget(2, 2, e)),
      (this.rtB = new WebGLRenderTarget(2, 2, e)),
      (this.noise = t),
      (this.uniforms = {
        tDepth: {
          value: null,
        },
        tShadow: {
          value: null,
        },
        tNoise: {
          value: t,
        },
        uInvProj: {
          value: new Matrix4(),
        },
        uCamWorld: {
          value: new Matrix4(),
        },
        uShadowMat: {
          value: new Matrix4(),
        },
        uSunDir: {
          value: new Vector3(0, 1, 0),
        },
        uColor: {
          value: new Color(1, 0.5, 0.2),
        },
        uBoxMin: {
          value: new Vector3(-28.3, -0.2, -20.3),
        },
        uBoxMax: {
          value: new Vector3(28.3, 8.3, 10.15),
        },
        uTime: {
          value: 0,
        },
        uDensity: {
          value: 0.05,
        },
        uPush: {
          value: [
            new Vector4(0, -99, 0, 1),
            new Vector4(0, -99, 0, 1),
            new Vector4(0, -99, 0, 1),
            new Vector4(0, -99, 0, 1),
          ],
        },
        uPushT: {
          value: new Vector4(-99, -99, -99, -99),
        },
      }),
      (this.march = null),
      (this.blur = new ShaderMaterial({
        uniforms: {
          tMap: {
            value: null,
          },
          uDir: {
            value: new Vector2(),
          },
        },
        vertexShader: b9,
        fragmentShader: YY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.quad = new ic(this.blur)),
      (this.texture = this.rtA.texture));
  }
  setSteps(t) {
    t !== this.steps &&
      ((this.steps = t),
      this.march && this.march.dispose(),
      (this.march =
        t > 0
          ? new ShaderMaterial({
              uniforms: this.uniforms,
              defines: {
                STEPS: t,
              },
              vertexShader: b9,
              fragmentShader: XY,
              depthTest: !1,
              depthWrite: !1,
              blending: NoBlending,
            })
          : null));
  }
  setSize(t, e) {
    ((t = Math.max(2, Math.floor(t / 2))),
      (e = Math.max(2, Math.floor(e / 2))),
      !(t === this.w && e === this.h) &&
        ((this.w = t),
        (this.h = e),
        this.rtA.setSize(t, e),
        this.rtB.setSize(t, e)));
  }
  render(t, e, s, n, i) {
    if (!this.march || !n || !n.shadow || !n.shadow.map) return null;
    let a = this.uniforms;
    return (
      (a.tDepth.value = e),
      (a.tShadow.value = n.shadow.map.texture),
      a.uShadowMat.value.copy(n.shadow.matrix),
      a.uInvProj.value.copy(s.projectionMatrixInverse),
      a.uCamWorld.value.copy(s.matrixWorld),
      (a.uTime.value = i),
      (this.quad.material = this.march),
      t.setRenderTarget(this.rtA),
      this.quad.render(t),
      (this.quad.material = this.blur),
      (this.blur.uniforms.tMap.value = this.rtA.texture),
      this.blur.uniforms.uDir.value.set(1 / this.w, 0),
      t.setRenderTarget(this.rtB),
      this.quad.render(t),
      (this.blur.uniforms.tMap.value = this.rtB.texture),
      this.blur.uniforms.uDir.value.set(0, 1 / this.h),
      t.setRenderTarget(this.rtA),
      this.quad.render(t),
      this.rtA.texture
    );
  }
  dispose() {
    (this.rtA.dispose(),
      this.rtB.dispose(),
      this.march && this.march.dispose(),
      this.blur.dispose(),
      this.quad.dispose());
  }
};
var VL = `
  uniform sampler2D tShadow; uniform mat4 uShadowMat; uniform float uShadowOn;
  ${bg}
  float sunVis(vec3 wp) {
    if (uShadowOn < 0.5) return 1.0;
    vec4 sc = uShadowMat * vec4(wp, 1.0);
    if (sc.x < 0.002 || sc.x > 0.998 || sc.y < 0.002 || sc.y > 0.998 || sc.z > 1.0) return 1.0;
    return step(sc.z - 0.0012, unpackD(texture2D(tShadow, sc.xy)));
  }`;
function GL(o, t, e, s) {
  let n = [],
    i = [],
    a = [],
    r = createRandom(31),
    l = [];
  for (let x of o) {
    let g = Math.min(x.maxLen || 20, (x.y1 + 0.2) / Math.max(0.05, -t.y)),
      b = (M, w) => (x.axis === "z" ? [M, w, x.pos] : [x.pos, w, M]),
      v = [b(x.a0, x.y0), b(x.a1, x.y0), b(x.a1, x.y1), b(x.a0, x.y1)];
    for (let M = 0; M < 4; M++) {
      let w = v[M],
        T = v[(M + 1) % 4],
        S = [w[0] + t.x * g, w[1] + t.y * g, w[2] + t.z * g],
        E = [T[0] + t.x * g, T[1] + t.y * g, T[2] + t.z * g],
        R = new Vector3(T[0] - w[0], T[1] - w[1], T[2] - w[2])
          .cross(t)
          .normalize();
      n.push(...w, ...T, ...E, ...w, ...E, ...S);
      for (let C = 0; C < 6; C++) i.push(R.x, R.y, R.z);
      a.push(0, 0, 1, 0, 1, 1);
    }
    let y = Math.round((x.a1 - x.a0) * (x.y1 - x.y0) * 5.5);
    for (let M = 0; M < y; M++) {
      let w = r() * g,
        T = r.range(x.a0, x.a1),
        S = r.range(x.y0, x.y1),
        E = b(T, S),
        _ = [E[0] + t.x * w, E[1] + t.y * w, E[2] + t.z * w];
      _[1] > 0.15 && l.push(_[0], _[1], _[2]);
    }
  }
  let c = new BufferGeometry();
  (c.setAttribute("position", new Float32BufferAttribute(n, 3)),
    c.setAttribute("normal", new Float32BufferAttribute(i, 3)),
    c.setAttribute("aT", new Float32BufferAttribute(a, 1)));
  let h = new ShaderMaterial({
      transparent: !0,
      depthWrite: !1,
      side: DoubleSide,
      fog: !1,
      blending: CustomBlending,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      uniforms: {
        uColor: {
          value: e,
        },
        uTime: {
          value: 0,
        },
        uK: {
          value: 0.055,
        },
      },
      vertexShader: `attribute float aT; varying float vT; varying vec3 vN; varying vec3 vW;
      void main() { vT = aT; vN = normal; vW = position; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 uColor; uniform float uTime, uK; varying float vT; varying vec3 vN; varying vec3 vW;
      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vn(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
      void main() {
        if (uK <= 0.0) discard;
        vec3 V = cameraPosition - vW; float d = length(V); V /= d;
        float facing = abs(dot(normalize(vN), V));
        float fade = pow(clamp(1.0 - vT, 0.0, 1.0), 1.6) * smoothstep(0.0, 0.03, vT);
        float n = 0.55 + 0.45 * vn(vW.xz * 0.9 + vec2(uTime * 0.07, vW.y * 0.7 - uTime * 0.04));
        float a = fade * facing * n * uK * smoothstep(0.4, 2.5, d);
        gl_FragColor = vec4(uColor * a, 1.0);
      }`,
    }),
    f = new Mesh(c, h);
  ((f.frustumCulled = !1), (f.renderOrder = 15));
  let u = new BufferGeometry();
  u.setAttribute("position", new Float32BufferAttribute(l, 3));
  let d = new Float32Array(l.length / 3);
  for (let x = 0; x < d.length; x++) d[x] = r() * 100;
  u.setAttribute("aSeed", new BufferAttribute(d, 1));
  let m = new ShaderMaterial({
      transparent: !0,
      depthWrite: !1,
      fog: !1,
      blending: AdditiveBlending,
      uniforms: {
        uTime: {
          value: 0,
        },
        uClock: s.uClock,
        uColor: {
          value: new Color(1.8, 1.05, 0.52),
        },
        uScale: {
          value: 600,
        },
        tShadow: s.tShadow,
        uShadowMat: s.uShadowMat,
        uShadowOn: s.uShadowOn,
        uPush: s.uPush,
        uPushT: s.uPushT,
      },
      vertexShader: `attribute float aSeed; uniform float uTime, uClock, uScale; uniform vec4 uPush[4]; uniform vec4 uPushT; varying float vA;
      ${VL}
      void main() {
        vec3 p = position; float t = uTime * 0.12 + aSeed;
        p += vec3(sin(t * 1.3 + aSeed), sin(t * 0.9 + aSeed * 2.0) * 0.6, cos(t * 1.1 + aSeed * 1.7)) * 0.35;
        // blasts and gunfire shove the dust outward; it swirls and settles back over a few seconds
        for (int k = 0; k < 4; k++) {
          vec3 e = p - uPush[k].xyz; float d = length(e), age = uClock - uPushT[k];
          float w = smoothstep(uPush[k].w, 0.0, d) * (1.0 - exp(-age * 8.0)) * exp(-age * 0.6);
          p += e / max(d, 0.25) * w * 1.5 + vec3(-e.z, 0.5, e.x) / max(d, 0.35) * w * 0.55 * sin(age * 2.2 + aSeed);
        }
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.45 + 0.55 * sin(uTime * (1.5 + fract(aSeed) * 2.0) + aSeed * 9.0);
        gl_PointSize = clamp(uScale * (0.005 + 0.007 * fract(aSeed * 3.3)) / -mv.z, 0.0, 6.0);
        vA = tw * sunVis(p) * smoothstep(0.25, 1.5, -mv.z) * (1.0 - smoothstep(14.0, 26.0, -mv.z));
      }`,
      fragmentShader: `uniform vec3 uColor; varying float vA;
      void main() { if (vA < 0.004) discard; vec2 c = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.0, length(c)) * vA; gl_FragColor = vec4(uColor, a); }`,
    }),
    p = new Points(u, m);
  return (
    (p.frustumCulled = !1),
    (p.renderOrder = 16),
    {
      shaftMesh: f,
      shaftMat: h,
      motePts: p,
      moteMat: m,
    }
  );
}
function WL(o, t = 700) {
  let e = createRandom(808),
    s = new Float32Array(t * 3),
    n = new Float32Array(t);
  for (let l = 0; l < t; l++)
    ((s[l * 3] = e()),
      (s[l * 3 + 1] = e()),
      (s[l * 3 + 2] = e()),
      (n[l] = e() * 100));
  let i = new BufferGeometry();
  (i.setAttribute("position", new BufferAttribute(s, 3)),
    i.setAttribute("aSeed", new BufferAttribute(n, 1)));
  let a = new ShaderMaterial({
      transparent: !0,
      depthWrite: !1,
      fog: !1,
      blending: AdditiveBlending,
      uniforms: {
        uTime: {
          value: 0,
        },
        uScale: {
          value: 600,
        },
        uWind: {
          value: new Vector3(0.22, 0, -0.1),
        },
        uIndoor: o.uIndoor,
        uColor: {
          value: new Color(2.6, 1.7, 0.8),
        },
        tShadow: o.tShadow,
        uShadowMat: o.uShadowMat,
        uShadowOn: o.uShadowOn,
      },
      vertexShader: `attribute float aSeed; uniform float uTime, uScale; uniform vec3 uWind; uniform vec4 uIndoor; varying float vA;
      ${VL}
      void main() {
        const vec3 box = vec3(30.0, 8.5, 30.0);
        vec3 drift = uWind * uTime + vec3(sin(uTime * 0.21 + aSeed) * 0.7, sin(uTime * 0.17 + aSeed * 1.7) * 0.45 + uTime * 0.045 * (fract(aSeed) - 0.35), cos(uTime * 0.19 + aSeed * 2.3) * 0.7);
        vec3 p = position * box + drift;
        p.xz = cameraPosition.xz + (fract((p.xz - cameraPosition.xz) / box.xz + 0.5) - 0.5) * box.xz;
        p.y = 0.25 + fract(p.y / box.y) * box.y;
        float inside = step(uIndoor.x, p.x) * step(p.x, uIndoor.z) * step(uIndoor.y, p.z) * step(p.z, uIndoor.w);
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * (0.9 + fract(aSeed * 1.7) * 1.6) + aSeed * 7.0), 2.0);
        gl_PointSize = clamp(uScale * (0.006 + 0.012 * fract(aSeed * 5.1)) / -mv.z, 0.0, 5.0);
        vec2 e = abs(fract((p.xz - cameraPosition.xz) / box.xz + 0.5) - 0.5) * 2.0;
        vA = (1.0 - inside) * tw * (0.12 + 0.88 * sunVis(p)) * smoothstep(0.4, 2.0, -mv.z) * (1.0 - smoothstep(0.8, 1.0, max(e.x, e.y)));
      }`,
      fragmentShader: `uniform vec3 uColor; varying float vA;
      void main() { if (vA < 0.004) discard; vec2 c = gl_PointCoord - 0.5; float a = smoothstep(0.5, 0.05, length(c)) * vA; gl_FragColor = vec4(uColor, a); }`,
    }),
    r = new Points(i, a);
  return (
    (r.frustumCulled = !1),
    (r.renderOrder = 16),
    {
      pts: r,
      mat: a,
    }
  );
}

export { GL, WL, XM };

// render/renderer.js: recovered from the verified GOLDEN HOUR release.
import {
  CanvasTexture,
  Color,
  DataTexture,
  DataUtils,
  DepthTexture,
  DoubleSide,
  FloatType,
  HalfFloatType,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  NearestFilter,
  NoBlending,
  NoColorSpace,
  NoToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Quaternion,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  UniformsUtils,
  UnsignedIntType,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from "../vendor/three-r180.js";
import { createCanvas, createRandom } from "../core/math.js";
import { Cd, Dr, LM, cb, gg, ic, mg } from "../vendor/postprocessing.js";
import { Ir } from "./lighting-volume.js";

var iu =
  "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
var _Y = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
    uTime: {
      value: 0,
    },
    uExposure: {
      value: 1,
    },
    uVignette: {
      value: 0.46,
    },
    uGrain: {
      value: 0.03,
    },
    uCA: {
      value: 0.0018,
    },
    uSaturation: {
      value: 1.1,
    },
    uContrast: {
      value: 1.13,
    },
    uDamage: {
      value: 0,
    },
    uLowHealth: {
      value: 0,
    },
    uFlash: {
      value: 0,
    },
    uFade: {
      value: 0,
    },
    uSharpen: {
      value: 0.25,
    },
    uRes: {
      value: new Vector2(1, 1),
    },
    uShadowTint: {
      value: new Vector3(0.78, 0.99, 1.17),
    },
    uHighTint: {
      value: new Vector3(1.06, 1, 0.91),
    },
    tAdapt: {
      value: null,
    },
    uAuto: {
      value: 1,
    },
    uHueKeep: {
      value: 0.3,
    },
    uNeon: {
      value: 0.42,
    },
    uLift: {
      value: new Vector3(0.0012, 0.0036, 0.0056),
    },
    uBalance: {
      value: new Vector3(0.955, 1, 1.075),
    },
    uGlare: {
      value: 1,
    },
    uAds: {
      value: 0,
    },
    uDof: {
      value: 1,
    },
    uSuppress: {
      value: 0,
    },
    uHurt: {
      value: 0,
    },
    uHurtSeed: {
      value: 0,
    },
    uPeriphery: {
      value: 0,
    },
    uDirt: {
      value: 0.55,
    },
    uStreak: {
      value: 0.5,
    },
    tBloom: {
      value: null,
    },
    tDirt: {
      value: null,
    },
    tStreak: {
      value: null,
    },
  },
  vertexShader: iu,
  fragmentShader: `
    precision highp float;
    uniform sampler2D tDiffuse, tBloom, tDirt, tStreak, tAdapt;
    uniform float uAuto, uHueKeep, uNeon, uGlare; uniform vec3 uLift, uBalance;
    uniform float uTime, uExposure, uVignette, uGrain, uCA, uSaturation, uContrast, uDamage, uLowHealth, uFlash, uFade, uSharpen;
    uniform float uAds, uDof, uSuppress, uHurt, uHurtSeed, uPeriphery, uDirt, uStreak;
    uniform vec2 uRes;
    uniform vec3 uShadowTint, uHighTint;
    varying vec2 vUv;

    const mat3 ACESIn = mat3(vec3(0.59719, 0.07600, 0.02840), vec3(0.35458, 0.90834, 0.13383), vec3(0.04823, 0.01566, 0.83777));
    const mat3 ACESOut = mat3(vec3(1.60475, -0.10208, -0.00327), vec3(-0.53108, 1.10813, -0.07276), vec3(-0.07367, -0.00605, 1.07602));
    vec3 rrt(vec3 v) { vec3 a = v * (v + 0.0245786) - 0.000090537; vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081; return a / b; }
    vec3 aces(vec3 c) { return clamp(ACESOut * rrt(ACESIn * c), 0.0, 1.0); }
    // film curve: firm toe, long linear middle, soft shoulder that reaches white late
    vec3 film(vec3 x) { return clamp(x * (2.36 * x + 0.035) / (x * (2.18 * x + 0.66) + 0.16), 0.0, 1.0); }
    float film1(float x) { return clamp(x * (2.36 * x + 0.035) / (x * (2.18 * x + 0.66) + 0.16), 0.0, 1.0); }
    vec3 toSRGB(vec3 c) { return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c)); }
    float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
    float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }

    void main() {
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c, c);
      float asp = uRes.x / uRes.y;
      float rr = length(vec2(c.x * asp, c.y));          // 0 centre, 0.5 top/bottom edge, ~1 in the corners
      // chromatic aberration grows toward the corners (and with damage)
      float ca = uCA * (1.0 + uDamage * 3.0 + uHurt * 2.5) * r2 * 4.0;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + c * ca).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - c * ca).b;
      // periphery blur: ADS depth of field, suppression, low health, impact. The centre (sight picture) is untouched.
      float edge = smoothstep(0.26, 0.8, rr);
      float pb = edge * (uAds * uDof * 0.85 + uSuppress * 0.55 + uLowHealth * 0.4 + uHurt * 0.9) + uPeriphery;
      if (pb > 0.03) {
        vec2 px = min(pb, 1.5) * 3.6 * (uRes.y / 900.0) / uRes;
        // two fixed rings (4 + 8 taps) with only a slight per-pixel twist: smooth, no visible dither
        float a0 = ign(gl_FragCoord.xy) * 0.5;
        vec3 acc = col;
        for (int i = 0; i < 12; i++) {
          float a = a0 + (i < 4 ? float(i) * 1.5708 + 0.4 : float(i) * 0.7854), rd = i < 4 ? 0.45 : 1.0;
          acc += texture2D(tDiffuse, uv + vec2(cos(a), sin(a)) * rd * px).rgb;
        }
        col = acc / 13.0;
      } else if (uSharpen > 0.0) {
        vec2 px = 1.0 / uRes;
        vec3 n = texture2D(tDiffuse, uv + vec2(px.x, 0.0)).rgb + texture2D(tDiffuse, uv - vec2(px.x, 0.0)).rgb
               + texture2D(tDiffuse, uv + vec2(0.0, px.y)).rgb + texture2D(tDiffuse, uv - vec2(0.0, px.y)).rgb;
        vec3 d = col - n * 0.25;
        col += clamp(d, -0.25, 0.25) * uSharpen;
      }
      col = max(col, 0.0);
      // lens: dirt and smudges catch the bloom, hot sources throw a thin anamorphic streak
      vec4 meter = texture2D(tAdapt, vec2(0.5));
      float glare = uGlare * mix(1.0, clamp(meter.r * 1.15, 0.35, 1.0), uAuto);
      if (uDirt > 0.0) col += texture2D(tBloom, uv).rgb * texture2D(tDirt, uv).rgb * (uDirt * glare);
      if (uStreak > 0.0) col += texture2D(tStreak, uv).rgb * (uStreak * glare);
      col *= uExposure * mix(1.0, meter.r, uAuto) * (1.0 - 0.06 * uSuppress - 0.16 * uHurt);
      col *= uBalance;            // white balance: the sun is already orange; the frame as a whole stays a touch cooler

      // ---- the grade (scene-linear) ----
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      // neon limiter: bright AND fully saturated light (back-lit onyx, orange upholstery in the sun) keeps its hue
      // but gives up part of its chroma instead of clipping to a flat poster colour
      float mx = max(col.r, max(col.g, col.b)), mn = min(col.r, min(col.g, col.b));
      float chroma = (mx - mn) / max(mx, 1e-4);
      col = mix(col, vec3(l), smoothstep(0.62, 1.0, chroma) * smoothstep(0.25, 2.2, mx) * uNeon * 0.55);
      // split tone: teal shadows, orange highlights
      float sh = 1.0 - smoothstep(0.0, 0.3, l);
      float hi = smoothstep(0.22, 1.3, l);
      col *= mix(vec3(1.0), uShadowTint, sh) * mix(vec3(1.0), uHighTint, hi);
      // contrast around mid grey + saturation (a little extra in the mid-tones only: no neon highlights)
      col = pow(col / 0.18, vec3(uContrast + 0.08 * uHurt)) * 0.18;
      l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      float satK = uSaturation * (1.0 - 0.75 * uLowHealth) * (1.0 - 0.18 * uSuppress) * (1.0 - 0.25 * uHurt);
      col = max(mix(vec3(l), col, satK * (1.0 - 0.16 * smoothstep(0.6, 2.4, l))), 0.0);
      col += uLift * (1.0 - smoothstep(0.0, 0.08, l));

      // vignette, optical part: lens falloff in linear light, so shadows and mid-tones deepen toward the corners
      // while bright windows and lamps near the edge keep their glow
      float v = smoothstep(0.12, 0.85, r2 * 1.9);
      col *= 1.0 - v * uVignette * 0.62;

      // film curve: part per channel (natural path to white), part on the peak (hue kept in hot orange light)
      float pk = max(col.r, max(col.g, col.b));
      vec3 perCh = film(col * 1.05), keep = col * (film1(pk * 1.05) / max(pk, 1e-5));
      col = mix(perCh, keep, uHueKeep);
      // the last stop before white bleaches gently instead of clipping one channel at a time
      float lo = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(col, vec3(lo), smoothstep(0.8, 1.0, max(col.r, max(col.g, col.b))) * 0.3);
      col = toSRGB(col);

      // vignette, print part: the frame closes in a little more when aiming, hurt or suppressed
      col *= 1.0 - v * min(0.95, uVignette * 0.5 + 0.09 * uAds + 0.4 * uLowHealth + 0.2 * uSuppress + 0.3 * uHurt);
      // damage / low health: a dark, veined red creeps in from the edges and throbs with the pulse
      float hurt = uDamage + uLowHealth + uHurt;
      if (hurt > 0.003) {
        vec2 q = vec2(c.x * asp, c.y) * 3.1;
        float n = vnoise(q + 7.3) * 0.6 + vnoise(q * 2.3 + uHurtSeed) * 0.3 + vnoise(q * 5.3 - uHurtSeed) * 0.15;
        float veins = pow(1.0 - abs(vnoise(q * 1.9 + 3.1 + uHurtSeed * 0.2) - 0.5) * 2.0, 7.0);
        float ph = fract(uTime * 1.3);
        float beat = exp(-ph * 9.0) + 0.6 * exp(-fract(ph + 0.72) * 11.0);
        float lowK = uLowHealth * (0.72 + 0.4 * beat);
        float reach = clamp(uDamage * 0.9 + lowK * 0.7 + uHurt * 0.6, 0.0, 1.2);
        float m = smoothstep(0.92 - 0.5 * reach, 1.12 - 0.2 * reach, rr + (n - 0.5) * 0.42 + veins * 0.07);
        float k = m * clamp(uDamage * 0.95 + lowK * 0.8 + uHurt * 0.55, 0.0, 1.0);
        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        vec3 blood = mix(vec3(0.34, 0.02, 0.015), vec3(0.10, 0.0, 0.0), clamp(veins * 0.8 + n * 0.5, 0.0, 1.0));
        col = mix(col, blood * (0.55 + 0.9 * lum) + col * vec3(0.5, 0.08, 0.06), k);
        col *= 1.0 - veins * k * 0.3;
      }
      // filmic grain: 24 fps cadence, fine + clumped, strongest in the mid shadows, a touch of chroma
      float gt = floor(uTime * 24.0);
      vec2 gp = gl_FragCoord.xy * max(1.0, 900.0 / uRes.y) / max(1.0, uRes.y / 1080.0);
      float g1 = hash(gp + gt * 17.13) - 0.5, g2 = hash(floor(gp * 0.5) + gt * 31.7 + 5.0) - 0.5, g3 = hash(gp.yx + gt * 7.9 + 11.0) - 0.5;
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      float resp = uGrain * mix(1.35, 0.3, smoothstep(0.05, 0.85, lum)) * smoothstep(-0.02, 0.06, lum);
      col += (g1 * 0.75 + g2 * 0.5) * resp + vec3(g3, -g3 * 0.5, g1 - g3) * resp * 0.22;
      col = mix(col, vec3(1.0, 0.97, 0.9), uFlash);
      col *= 1.0 - uFade;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
var RY = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
  },
  vertexShader: iu,
  fragmentShader: `precision highp float; uniform sampler2D tDiffuse; varying vec2 vUv;
    void main() { vec3 c = texture2D(tDiffuse, vUv).rgb; if (!(c.r >= 0.0 && c.g >= 0.0 && c.b >= 0.0)) c = vec3(0.0); 
      // hot sources keep their colour but stop feeding the bloom / rays without limit (sun disc: 110 -> ~16)
      float m = max(c.r, max(c.g, c.b)); if (m > 6.0) c *= (6.0 + (m - 6.0) / (1.0 + (m - 6.0) * 0.1)) / m;
      gl_FragColor = vec4(c, 1.0); }`,
};
var AL = {
  uniforms: {
    tDiffuse: {
      value: null,
    },
    uSun: {
      value: new Vector2(0.5, 0.5),
    },
    uK: {
      value: 0,
    },
    uAspect: {
      value: 1.78,
    },
  },
  vertexShader: iu,
  fragmentShader: `precision highp float; uniform sampler2D tDiffuse; uniform vec2 uSun; uniform float uK, uAspect; varying vec2 vUv;
    float hash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      if (uK > 0.002) {
        vec2 d = uSun - vUv;
        float dist = length(d * vec2(uAspect, 1.0));
        vec2 stp = d * (0.92 / float(RAY_SAMPLES));
        vec2 uv = vUv + stp * hash(gl_FragCoord.xy);
        vec3 acc = vec3(0.0); float w = 1.0, tw = 0.0;
        for (int i = 0; i < RAY_SAMPLES; i++) {
          vec3 s = texture2D(tDiffuse, clamp(uv, 0.001, 0.999)).rgb;
          float l = max(s.r, max(s.g, s.b));
          acc += min(s, vec3(14.0)) * smoothstep(2.4, 7.0, l) * w; tw += w; w *= 0.972; uv += stp;
        }
        col += acc / tw * uK * (0.35 + 0.65 * smoothstep(1.3, 0.0, dist));
      }
      gl_FragColor = vec4(col, 1.0);
    }`,
};
var AY = `
  precision highp float;
  uniform sampler2D tDiffuse, tVol, tDist;
  uniform float uVolK, uDistK, uBlur; uniform mat4 uReproj;
  varying vec2 vUv;
  float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
  void main() {
    vec2 uv = vUv;
    if (uDistK > 0.0) uv += texture2D(tDist, vUv).rg * uDistK;
    vec3 col;
    #if MB_TAPS > 0
    if (uBlur > 0.0) {
      vec4 p = uReproj * vec4(vUv * 2.0 - 1.0, 1.0, 1.0);
      vec2 vel = (vUv - (p.xy / p.w * 0.5 + 0.5)) * uBlur;
      float len = length(vel);
      vel *= min(1.0, 0.016 / max(len, 1e-6));
      float n = ign(gl_FragCoord.xy);
      vec3 acc = vec3(0.0);
      for (int i = 0; i < MB_TAPS; i++) acc += texture2D(tDiffuse, uv + vel * ((float(i) + n) / float(MB_TAPS) - 0.5)).rgb;
      col = acc / float(MB_TAPS);
    } else
    #endif
    col = texture2D(tDiffuse, uv).rgb;
    if (uVolK > 0.0) col += texture2D(tVol, vUv).rgb * uVolK;
    gl_FragColor = vec4(col, 1.0);
  }`;
var kY = `
  precision highp float;
  uniform sampler2D tSrc; uniform vec2 uStep; uniform vec3 uTint;
  varying vec2 vUv;
  void main() {
    vec3 acc = vec3(0.0); float wt = 0.0;
    for (int i = -22; i <= 22; i++) {
      float f = float(i) / 22.0, w = (1.0 - abs(f)); w = w * w * w;
      vec3 s = texture2D(tSrc, vUv + uStep * float(i)).rgb;
      float l = max(s.r, max(s.g, s.b));
      acc += s * smoothstep(1.1, 4.5, l) * w; wt += w;
    }
    gl_FragColor = vec4(acc / wt * uTint, 1.0);
  }`;
var CY = `
  #include <common>
  #include <skinning_pars_vertex>
  uniform mat4 uPrevMVP;
  #ifdef USE_SKINNING
  uniform highp sampler2D uPrevBones;
  mat4 prevBone(const in float i) {
    int size = textureSize(uPrevBones, 0).x; int j = int(i) * 4; int x = j % size; int y = j / size;
    return mat4(texelFetch(uPrevBones, ivec2(x, y), 0), texelFetch(uPrevBones, ivec2(x + 1, y), 0), texelFetch(uPrevBones, ivec2(x + 2, y), 0), texelFetch(uPrevBones, ivec2(x + 3, y), 0));
  }
  #endif
  varying vec4 vCur, vPrev; varying float vZ;
  void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mv; vCur = gl_Position; vZ = -mv.z;
    #ifdef USE_SKINNING
      vec4 sv = bindMatrix * vec4(position, 1.0);
      vec4 sk = prevBone(skinIndex.x) * sv * skinWeight.x + prevBone(skinIndex.y) * sv * skinWeight.y + prevBone(skinIndex.z) * sv * skinWeight.z + prevBone(skinIndex.w) * sv * skinWeight.w;
      vPrev = uPrevMVP * vec4(sk.xyz, 1.0);
    #else
      vPrev = uPrevMVP * vec4(position, 1.0);
    #endif
  }`;
var PY = `
  precision highp float;
  uniform vec2 uRes; uniform float uScale, uMaxLen;
  varying vec4 vCur, vPrev; varying float vZ;
  void main() {
    vec2 v = (vCur.xy / vCur.w - vPrev.xy / vPrev.w) * 0.5 * uRes * uScale;      // pixels over the shutter
    float l = length(v); if (l > uMaxLen) v *= uMaxLen / l;
    gl_FragColor = vec4(v, vZ, 1.0);
  }`;
var zY = `
  precision highp float;
  uniform sampler2D tVel;
  void main() {
    ivec2 base = ivec2(gl_FragCoord.xy) * 16, lim = textureSize(tVel, 0) - 1;
    vec2 best = vec2(0.0); float bl = 0.0;
    for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) {
      vec2 v = texelFetch(tVel, min(base + ivec2(i * 4 + 1, j * 4 + 1), lim), 0).rg; float l = dot(v, v);
      if (l > bl) { bl = l; best = v; }
    }
    gl_FragColor = vec4(best, 0.0, 1.0);
  }`;
var LY = `
  precision highp float;
  uniform sampler2D tDiffuse, tVel, tTile; uniform vec2 uRes;
  varying vec2 vUv;
  float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }
  float cone(float d, float r) { return clamp(1.0 - d / max(r, 0.01), 0.0, 1.0); }
  float cyl(float d, float r) { r = max(r, 0.01); return 1.0 - smoothstep(0.95 * r, 1.05 * r, d); }
  float nearer(float za, float zb) { return clamp(1.0 - (za - zb) / 0.02, 0.0, 1.0); }
  void main() {
    vec3 c0 = texture2D(tDiffuse, vUv).rgb;
    ivec2 tc = ivec2(gl_FragCoord.xy) / 16, lim = textureSize(tTile, 0) - 1;
    vec2 vmax = vec2(0.0); float lmax = 0.0;
    for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
      vec2 t = texelFetch(tTile, clamp(tc + ivec2(i, j), ivec2(0), lim), 0).rg; float l = dot(t, t);
      if (l > lmax) { lmax = l; vmax = t; }
    }
    if (lmax < 0.7) { gl_FragColor = vec4(c0, 1.0); return; }          // at rest: untouched, razor sharp
    vec4 vx = texelFetch(tVel, ivec2(gl_FragCoord.xy), 0);
    float zX = vx.a > 0.5 ? vx.b : 1000.0, rX = length(vx.rg) * 0.5;
    float lm = sqrt(lmax); vec2 dir = vmax / lm;
    float jit = ign(gl_FragCoord.xy) - 0.5;
    vec3 acc = c0; float wsum = 1.0;
    for (int i = 0; i < VM_TAPS; i++) {
      float t = (float(i) + 0.5 + jit) / float(VM_TAPS) * 2.0 - 1.0;
      vec2 uv = vUv + dir * (t * lm * 0.5) / uRes;
      vec4 vy = texelFetch(tVel, clamp(ivec2(uv * uRes), ivec2(0), ivec2(uRes) - 1), 0);
      float zY = vy.a > 0.5 ? vy.b : 1000.0, rY = length(vy.rg) * 0.5, d = abs(t) * lm * 0.5;
      float w = nearer(zY, zX) * cone(d, rY) + nearer(zX, zY) * cone(d, rX) + cyl(d, rY) * cyl(d, rX) * 2.0;
      acc += textureLod(tDiffuse, uv, 0.0).rgb * w; wsum += w;
    }
    gl_FragColor = vec4(acc / wsum, 1.0);
  }`;
var DY = `
  precision highp float;
  uniform sampler2D tSrc; uniform vec2 uPx; uniform float uClamp;
  varying vec2 vUv;
  void main() {
    vec3 acc = vec3(0.0);
    for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) {
      vec3 c = texture2D(tSrc, vUv + (vec2(float(i), float(j)) * 2.0 - 3.0) * uPx).rgb;
      acc += min(max(c, 0.0), vec3(uClamp));
    }
    gl_FragColor = vec4(acc / 16.0, 1.0);
  }`;
var IY = `
  precision highp float;
  uniform sampler2D tSrc, tPrev; uniform float uDt, uReset, uKey, uComp, uMinE, uMaxE, uUp, uDown;
  void main() {
    float acc = 0.0, wt = 0.0;
    for (int j = 0; j < 9; j++) for (int i = 0; i < 16; i++) {
      vec2 uv = (vec2(float(i), float(j)) + 0.5) / vec2(16.0, 9.0);
      vec2 c = uv - 0.5; float w = 1.0 - 0.6 * smoothstep(0.1, 0.55, length(c * vec2(1.0, 0.8)));       // centre weighted
      float lum = dot(texture2D(tSrc, uv).rgb, vec3(0.2126, 0.7152, 0.0722));
      acc += log(lum + 0.004) * w; wt += w;
    }
    float avg = exp(acc / wt);
    // partial compensation: a dark bar stays moody, a bright terrace stays bright
    float target = clamp(pow(uKey / avg, uComp), uMinE, uMaxE);
    float prev = texture2D(tPrev, vec2(0.5)).r;
    float rate = target < prev ? uDown : uUp;
    float e = uReset > 0.5 ? target : prev + (target - prev) * (1.0 - exp(-uDt * rate));
    gl_FragColor = vec4(e, avg, 0.0, 1.0);
  }`;
var l9 = null;
function HY() {
  if (l9) return l9;
  let o = 1024,
    t = 576,
    e = createCanvas(o, t),
    s = e.getContext("2d"),
    n = createRandom(77);
  ((s.fillStyle = "#000"),
    s.fillRect(0, 0, o, t),
    (s.globalCompositeOperation = "lighter"));
  let i = () => {
    for (;;) {
      let r = n(),
        l = n(),
        c = Math.hypot((r - 0.5) * 1.3, l - 0.5) * 2;
      if (n() < 0.18 + c * c * 0.9) return [r * o, l * t];
    }
  };
  for (let r = 0; r < 70; r++) {
    let [l, c] = i(),
      h = n.range(14, 70),
      f = n.range(0.03, 0.11),
      u = s.createRadialGradient(l, c, h * 0.2, l, c, h);
    (u.addColorStop(0, `rgba(255,255,255,${f * 0.55})`),
      u.addColorStop(0.82, `rgba(255,255,255,${f * 0.75})`),
      u.addColorStop(0.93, `rgba(255,255,255,${f * 1.6})`),
      u.addColorStop(1, "rgba(255,255,255,0)"),
      (s.fillStyle = u),
      s.beginPath());
    for (let d = 0; d < 7; d++) {
      let m = (d / 7) * 6.2832 + 0.3;
      s.lineTo(l + Math.cos(m) * h * 1.02, c + Math.sin(m) * h * 1.02);
    }
    (s.closePath(), s.fill());
  }
  for (let r = 0; r < 26; r++) {
    let [l, c] = i();
    (s.save(),
      s.translate(l, c),
      s.rotate(n() * 3.14),
      s.scale(n.range(1.6, 4.2), 1));
    let h = n.range(26, 70),
      f = s.createRadialGradient(0, 0, 0, 0, 0, h);
    (f.addColorStop(0, `rgba(255,255,255,${n.range(0.03, 0.08)})`),
      f.addColorStop(1, "rgba(255,255,255,0)"),
      (s.fillStyle = f),
      s.beginPath(),
      s.arc(0, 0, h, 0, 6.2832),
      s.fill(),
      s.restore());
  }
  for (let r = 0; r < 420; r++) {
    let [l, c] = i();
    ((s.fillStyle = `rgba(255,255,255,${n.range(0.08, 0.4)})`),
      s.beginPath(),
      s.arc(l, c, n.range(0.5, 2.2), 0, 6.2832),
      s.fill());
  }
  s.lineCap = "round";
  for (let r = 0; r < 16; r++) {
    let [l, c] = i();
    ((s.strokeStyle = `rgba(255,255,255,${n.range(0.06, 0.16)})`),
      (s.lineWidth = n.range(0.6, 1.4)),
      s.beginPath(),
      s.moveTo(l, c),
      s.bezierCurveTo(
        l + n.range(-60, 60),
        c + n.range(-40, 40),
        l + n.range(-90, 90),
        c + n.range(-60, 60),
        l + n.range(-120, 120),
        c + n.range(-70, 70),
      ),
      s.stroke());
  }
  let a = new CanvasTexture(e);
  return (
    (a.colorSpace = NoColorSpace),
    (a.minFilter = LinearMipmapLinearFilter),
    (a.generateMipmaps = !0),
    (l9 = a)
  );
}
var c9 = {
  low: {
    scale: 0.7,
    samples: 0,
    shadow: 2048,
    bloom: !0,
    sharpen: 0.35,
    maxDpr: 1,
    ao: !1,
    refl: 0,
    rays: 0,
    soft: !1,
    vol: 0,
    distort: !1,
    mblur: 0,
    dirt: 0,
    streak: 0,
    dof: 0,
    atlas: 2048,
    fxK: 0.55,
    vmblur: 0,
  },
  medium: {
    scale: 0.85,
    samples: 2,
    shadow: 2048,
    bloom: !0,
    sharpen: 0.3,
    maxDpr: 1,
    ao: !1,
    refl: 0.5,
    rays: 24,
    soft: !0,
    vol: 12,
    distort: !0,
    mblur: 0,
    dirt: 0.26,
    streak: 0,
    dof: 1,
    atlas: 2048,
    fxK: 0.8,
    vmblur: 6,
  },
  high: {
    scale: 1,
    samples: 4,
    shadow: 4096,
    bloom: !0,
    sharpen: 0.22,
    maxDpr: 1.25,
    ao: !0,
    refl: 0.5,
    rays: 40,
    soft: !0,
    vol: 20,
    distort: !0,
    mblur: 8,
    dirt: 0.34,
    streak: 0.3,
    dof: 1,
    atlas: 4096,
    fxK: 1,
    vmblur: 9,
  },
  ultra: {
    scale: 1,
    samples: 4,
    shadow: 4096,
    bloom: !0,
    sharpen: 0.15,
    maxDpr: 2,
    ao: !0,
    refl: 0.75,
    rays: 56,
    soft: !0,
    vol: 28,
    distort: !0,
    mblur: 12,
    dirt: 0.34,
    streak: 0.3,
    dof: 1,
    atlas: 4096,
    fxK: 1,
    vmblur: 13,
  },
};
var OM = new Quaternion();
var kL = new Matrix4();
var CL = new Matrix4();
var NM = new Color();
var f9 = class extends Dr {
  constructor(t) {
    (super(),
      (this.gfx = t),
      (this.needsSwap = !0),
      (this.uniforms = {
        tDiffuse: {
          value: null,
        },
        tVol: {
          value: null,
        },
        tDist: {
          value: null,
        },
        uVolK: {
          value: 0,
        },
        uDistK: {
          value: 0,
        },
        uBlur: {
          value: 0,
        },
        uReproj: {
          value: new Matrix4(),
        },
      }),
      (this.mat = new ShaderMaterial({
        uniforms: this.uniforms,
        defines: {
          MB_TAPS: t.q.mblur | 0,
        },
        vertexShader: iu,
        fragmentShader: AY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.quad = new ic(this.mat)),
      (this.distRT = new WebGLRenderTarget(2, 2, {
        type: HalfFloatType,
        depthBuffer: !1,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
      })),
      (this.w = 2),
      (this.h = 2));
  }
  setSize(t, e) {
    ((this.w = t),
      (this.h = e),
      this.distRT.setSize(Math.max(2, t >> 1), Math.max(2, e >> 1)),
      this.gfx.fx && this.gfx.fx.resize(t, e));
  }
  dispose() {
    (this.mat.dispose(), this.quad.dispose(), this.distRT.dispose());
  }
  render(t, e, s) {
    let n = this.gfx,
      i = n.fx,
      a = n.q,
      r = n.camera,
      l = n.scene,
      c = n._worldRT || s,
      h = a.soft && c.depthTexture ? c.depthTexture : null,
      f = t.autoClear,
      u = t.getClearAlpha(),
      d = r.layers.mask;
    (t.getClearColor(NM), (t.autoClear = !1), i.prePass(r, h, this.w, this.h));
    let m = null,
      p = !1;
    (h && a.vol > 0 && (m = i.renderVolumetric(t, h, r)),
      h &&
        a.distort &&
        (i.distort.drawn > 0 || !this._warm) &&
        ((this._warm = !0),
        t.setRenderTarget(this.distRT),
        t.setClearColor(0, 0),
        t.clear(!0, !1, !1),
        r.layers.set(3),
        t.render(l, r),
        (r.layers.mask = d),
        (p = !0)));
    let x = n._blurK,
      g = !!n.gtao || !!m || p || x > 0,
      b = s;
    if (g) {
      let y = this.uniforms;
      ((y.tDiffuse.value = s.texture),
        (y.tVol.value = m),
        (y.uVolK.value = m ? 1 : 0),
        (y.tDist.value = this.distRT.texture),
        (y.uDistK.value = p ? 1 : 0),
        (y.uBlur.value = x),
        y.uReproj.value.copy(n._reproj),
        t.setRenderTarget(e),
        this.quad.render(t),
        (b = e));
    }
    this.needsSwap = g;
    let v = b === c;
    (t.setRenderTarget(b),
      v || t.clear(!1, !0, !1),
      i.setDepthMode(h ? 1 : 0, v || !h ? 0 : 1),
      r.layers.set(2),
      t.render(l, r),
      (r.layers.mask = d),
      t.setClearColor(NM, u),
      (t.autoClear = f));
  }
};
var u9 = class extends Dr {
  constructor(t) {
    (super(),
      (this.gfx = t),
      (this.needsSwap = !1),
      (this.rt = new WebGLRenderTarget(2, 2, {
        type: HalfFloatType,
        depthBuffer: !1,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
      })),
      (this.mat = new ShaderMaterial({
        uniforms: {
          tSrc: {
            value: null,
          },
          uStep: {
            value: new Vector2(),
          },
          uTint: {
            value: new Vector3(0.5, 0.74, 1),
          },
        },
        vertexShader: iu,
        fragmentShader: kY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.quad = new ic(this.mat)));
  }
  setSize(t, e) {
    this.rt.setSize(Math.max(2, t >> 2), Math.max(2, e >> 2));
  }
  dispose() {
    (this.rt.dispose(), this.mat.dispose(), this.quad.dispose());
  }
  render(t) {
    let e = this.gfx.bloom.renderTargetsVertical[1];
    ((this.mat.uniforms.tSrc.value = e.texture),
      this.mat.uniforms.uStep.value.set(2.6 / e.width, 0),
      t.setRenderTarget(this.rt),
      this.quad.render(t));
  }
};
var h9 = new Matrix4();
var t2 = {
  pass: null,
  frame: 0,
  cam: null,
  prev: new WeakMap(),
  last: 0,
};
var FY = (o) => o && !o.transparent && o.depthWrite !== !1 && o.visible !== !1;
function OY(o, t, e, s, n, i) {
  let a = t2.pass;
  if (!a) {
    this._ghPrevOBR && this._ghPrevOBR(o, t, e, s, n, i);
    return;
  }
  let r = a.prev.get(this),
    l = this.isSkinnedMesh && this.skeleton,
    c = a.velUniforms;
  if (
    r.seen !== t2.frame &&
    ((r.seen = t2.frame),
    l
      ? h9.multiplyMatrices(this.matrixWorld, this.bindMatrixInverse)
      : h9.copy(this.matrixWorld),
    r.cur
      .multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse)
      .multiply(h9),
    l &&
      (l.boneTexture || l.computeBoneTexture(),
      !r.bones ||
        r.bones.image.data.length !== l.boneTexture.image.data.length))
  ) {
    r.bones && r.bones.dispose();
    let f = l.boneTexture.image.width;
    ((r.bones = new DataTexture(
      new Float32Array(l.boneTexture.image.data.length),
      f,
      f,
      RGBAFormat,
      FloatType,
    )),
      (r.bones.needsUpdate = !0),
      (r.frame = -9));
  }
  let h = r.frame !== t2.frame - 1;
  (c.uPrevMVP.value.copy(h ? r.cur : r.mvp),
    l && (c.uPrevBones.value = h ? l.boneTexture : r.bones),
    (n.uniformsNeedUpdate = !0));
}
var d9 = class extends Dr {
  constructor(t) {
    (super(), (this.gfx = t), (this.needsSwap = !0));
    let e = {
      type: HalfFloatType,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
    };
    ((this.velRT = new WebGLRenderTarget(2, 2, {
      ...e,
      depthBuffer: !0,
    })),
      (this.tileRT = new WebGLRenderTarget(2, 2, {
        ...e,
        depthBuffer: !1,
      })));
    let s = (this.velUniforms = {
        uPrevMVP: {
          value: new Matrix4(),
        },
        uPrevBones: {
          value: null,
        },
        uRes: {
          value: new Vector2(1, 1),
        },
        uScale: {
          value: 1,
        },
        uMaxLen: {
          value: 24,
        },
      }),
      n = () =>
        new ShaderMaterial({
          uniforms: s,
          vertexShader: CY,
          fragmentShader: PY,
          blending: NoBlending,
          side: DoubleSide,
        });
    ((this.velRigid = n()),
      (this.velSkin = this.velRigid),
      (this.tileMat = new ShaderMaterial({
        uniforms: {
          tVel: {
            value: this.velRT.texture,
          },
        },
        vertexShader: iu,
        fragmentShader: zY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.gatherMat = new ShaderMaterial({
        uniforms: {
          tDiffuse: {
            value: null,
          },
          tVel: {
            value: this.velRT.texture,
          },
          tTile: {
            value: this.tileRT.texture,
          },
          uRes: {
            value: new Vector2(1, 1),
          },
        },
        defines: {
          VM_TAPS: Math.max(1, t.q.vmblur | 0),
        },
        vertexShader: iu,
        fragmentShader: LY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.quad = new ic(this.tileMat)),
      (this.prev = t2.prev),
      (this.frame = t2.last + 2),
      (this.list = []),
      (this.hidden = []));
    let i = this,
      a = OY;
    this._collect = (r) => {
      if (r.isMesh) {
        if (!FY(Array.isArray(r.material) ? r.material[0] : r.material)) {
          i.hidden.push(r);
          return;
        }
        (i.prev.has(r) ||
          (i.prev.set(r, {
            mvp: new Matrix4(),
            cur: new Matrix4(),
            frame: -9,
            seen: -1,
            bones: null,
          }),
          r.onBeforeRender !== a &&
            (Object.prototype.hasOwnProperty.call(r, "onBeforeRender") &&
              (r._ghPrevOBR = r.onBeforeRender),
            (r.onBeforeRender = a))),
          i.list.push(r));
      }
    };
  }
  setSize(t, e) {
    (this.velRT.setSize(t, e),
      this.tileRT.setSize(
        Math.max(1, Math.ceil(t / 16)),
        Math.max(1, Math.ceil(e / 16)),
      ),
      this.velUniforms.uRes.value.set(t, e),
      this.gatherMat.uniforms.uRes.value.set(t, e));
  }
  maxVelocity(t) {
    let e = this.tileRT.width,
      s = this.tileRT.height,
      n =
        this._rb && this._rb.length === e * s * 4
          ? this._rb
          : (this._rb = new Uint16Array(e * s * 4));
    t.readRenderTargetPixels(this.tileRT, 0, 0, e, s, n);
    let i = 0;
    for (let a = 0; a < n.length; a += 4) {
      let r = DataUtils.fromHalfFloat(n[a]),
        l = DataUtils.fromHalfFloat(n[a + 1]);
      i = Math.max(i, r * r + l * l);
    }
    return Math.sqrt(i);
  }
  dispose() {
    (this.velRT.dispose(),
      this.tileRT.dispose(),
      this.velRigid.dispose(),
      this.tileMat.dispose(),
      this.gatherMat.dispose(),
      this.quad.dispose());
  }
  render(t, e, s, n) {
    let i = this.gfx,
      a = i.vmBlur;
    if (!i.vmPass.enabled || a <= 0 || !(n > 1e-5)) {
      ((this.needsSwap = !1), (this.frame += 2));
      return;
    }
    this.needsSwap = !0;
    let r = i.vmCamera,
      l = this.velUniforms,
      c = ++this.frame,
      h = this.list;
    ((l.uScale.value = Math.min(2.5, i.shutter / 60 / n) * a),
      (l.uMaxLen.value = this.velRT.height * 0.03));
    let f = i.vmScene,
      u = this.hidden;
    ((h.length = 0), (u.length = 0), f.traverseVisible(this._collect));
    for (let g = 0; g < u.length; g++) u[g].visible = !1;
    let d = t.autoClear,
      m = t.getClearAlpha();
    (t.getClearColor(NM),
      (t.autoClear = !1),
      t.setRenderTarget(this.velRT),
      t.setClearColor(0, 0),
      t.clear(!0, !0, !1),
      (t2.pass = this),
      (t2.frame = c),
      (t2.cam = r));
    let p = f.overrideMaterial,
      x = f.background;
    ((f.overrideMaterial = this.velRigid), (f.background = null));
    try {
      t.render(f, r);
    } finally {
      ((f.overrideMaterial = p), (f.background = x), (t2.pass = null));
      for (let g = 0; g < u.length; g++) u[g].visible = !0;
    }
    for (let g = 0; g < h.length; g++) {
      let b = h[g],
        v = this.prev.get(b);
      !v ||
        v.seen !== c ||
        (v.mvp.copy(v.cur),
        (v.frame = c),
        v.bones &&
          b.skeleton &&
          (v.bones.image.data.set(b.skeleton.boneMatrices),
          (v.bones.needsUpdate = !0)));
    }
    ((t2.last = c),
      (this.quad.material = this.tileMat),
      t.setRenderTarget(this.tileRT),
      this.quad.render(t),
      (this.gatherMat.uniforms.tDiffuse.value = s.texture),
      (this.quad.material = this.gatherMat),
      t.setRenderTarget(e),
      this.quad.render(t),
      t.setClearColor(NM, m),
      (t.autoClear = d));
  }
};
var p9 = class extends Dr {
  constructor(t) {
    (super(), (this.gfx = t), (this.needsSwap = !1));
    let e = {
      type: HalfFloatType,
      depthBuffer: !1,
      minFilter: LinearFilter,
      magFilter: LinearFilter,
    };
    ((this.a = new WebGLRenderTarget(2, 2, e)),
      (this.b = new WebGLRenderTarget(2, 2, e)));
    let s = {
      type: HalfFloatType,
      depthBuffer: !1,
      minFilter: NearestFilter,
      magFilter: NearestFilter,
    };
    ((this.e0 = new WebGLRenderTarget(1, 1, s)),
      (this.e1 = new WebGLRenderTarget(1, 1, s)),
      (this.down = new ShaderMaterial({
        uniforms: {
          tSrc: {
            value: null,
          },
          uPx: {
            value: new Vector2(),
          },
          uClamp: {
            value: 6,
          },
        },
        vertexShader: iu,
        fragmentShader: DY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.adapt = new ShaderMaterial({
        uniforms: {
          tSrc: {
            value: this.b.texture,
          },
          tPrev: {
            value: null,
          },
          uDt: {
            value: 0,
          },
          uReset: {
            value: 1,
          },
          uKey: {
            value: 0.2,
          },
          uComp: {
            value: 0.62,
          },
          uMinE: {
            value: 0.5,
          },
          uMaxE: {
            value: 2.4,
          },
          uUp: {
            value: 1.1,
          },
          uDown: {
            value: 3.2,
          },
        },
        vertexShader: iu,
        fragmentShader: IY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      })),
      (this.quad = new ic(this.down)),
      (this.w = 2),
      (this.h = 2),
      (this.reset = !0));
  }
  get texture() {
    return this.e0.texture;
  }
  setSize(t, e) {
    ((this.w = t),
      (this.h = e),
      this.a.setSize(Math.max(2, t >> 3), Math.max(2, e >> 3)),
      this.b.setSize(Math.max(2, t >> 6), Math.max(2, e >> 6)));
  }
  dispose() {
    (this.a.dispose(),
      this.b.dispose(),
      this.e0.dispose(),
      this.e1.dispose(),
      this.down.dispose(),
      this.adapt.dispose(),
      this.quad.dispose());
  }
  render(t, e, s, n) {
    let i = this.down.uniforms,
      a = this.gfx.exposure,
      r = this.adapt.uniforms;
    ((this.quad.material = this.down),
      (i.tSrc.value = s.texture),
      i.uPx.value.set(1 / this.w, 1 / this.h),
      (i.uClamp.value = a.clamp),
      t.setRenderTarget(this.a),
      this.quad.render(t),
      (i.tSrc.value = this.a.texture),
      i.uPx.value.set(1 / this.a.width, 1 / this.a.height),
      (i.uClamp.value = 1e4),
      t.setRenderTarget(this.b),
      this.quad.render(t));
    let l = this.e0;
    ((this.e0 = this.e1),
      (this.e1 = l),
      (r.tPrev.value = this.e1.texture),
      (r.uDt.value = n),
      (r.uReset.value = this.reset ? 1 : 0),
      (this.reset = !1),
      (r.uKey.value = a.key),
      (r.uComp.value = a.comp),
      (r.uMinE.value = a.min),
      (r.uMaxE.value = a.max),
      (r.uUp.value = a.up),
      (r.uDown.value = a.down),
      (this.quad.material = this.adapt),
      t.setRenderTarget(this.e0),
      this.quad.render(t),
      (this.gfx.uniforms.tAdapt.value = this.e0.texture));
  }
};
var GameRenderer = class {
  constructor(canvas) {
    let e = (this.renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: !1,
      powerPreference: "high-performance",
      stencil: !1,
      alpha: !1,
    }));
    ((e.toneMapping = NoToneMapping),
      (e.shadowMap.enabled = !0),
      (e.shadowMap.type = PCFSoftShadowMap),
      (e.shadowMap.autoUpdate = !1),
      (e.info.autoReset = !1),
      (this.scene = new Scene()),
      (this.camera = new PerspectiveCamera(90, 1, 0.06, 2500)),
      (this.camera.rotation.order = "YXZ"),
      this.camera.layers.enable(1),
      (this.vmScene = new Scene()),
      (this.vmCamera = new PerspectiveCamera(55, 1, 0.01, 10)),
      (this.quality = "high"),
      (this.q = c9.high),
      (this.composer = null),
      (this.uniforms = null),
      (this.time = 0),
      (this.preRender = null),
      (this.sunUv = new Vector2(0.5, 0.5)),
      (this.rayK = 0),
      (this.fx = null),
      (this.motionBlur = 1),
      (this.vmBlur = 1),
      (this.shutter = 0.38),
      (this.exposure = {
        auto: 1,
        key: 0.15,
        comp: 0.46,
        min: 0.5,
        max: 1.6,
        up: 1.1,
        down: 3.2,
        clamp: 6,
      }),
      (this._lastCam = new Vector3(1e9, 0, 0)),
      (this.size = new Vector2()),
      (this._passes = []),
      (this._prevQ = new Quaternion()),
      (this._hasPrev = !1),
      (this._blurK = 0),
      (this._turn = 0),
      (this._reproj = new Matrix4()),
      this._build(),
      (this._resizeTimer = 0),
      addEventListener("resize", () => {
        (clearTimeout(this._resizeTimer),
          (this._resizeTimer = setTimeout(() => this.resize(), 150)));
      }));
  }
  _dispose() {
    this.fx && this.fx.releaseTargets();
    for (let t of this._passes) t.dispose && t.dispose();
    ((this._passes.length = 0),
      this.gtao &&
        (this.gtao.gtaoMaterial && this.gtao.gtaoMaterial.dispose(),
        this.gtao.blendMaterial && this.gtao.blendMaterial.dispose(),
        (this.gtao = null)),
      this.composer && (this.composer.dispose(), (this.composer = null)),
      (this._worldRT = null));
  }
  _measure() {
    let t = this.q,
      e = this.renderer,
      s = Math.min(window.devicePixelRatio || 1, t.maxDpr) * t.scale;
    return (
      e.setPixelRatio(s),
      e.setSize(innerWidth, innerHeight, !1),
      e.getDrawingBufferSize(this.size)
    );
  }
  _build() {
    let t = this.q,
      e = this.renderer;
    this._dispose();
    let s = this._measure(),
      n = new WebGLRenderTarget(s.x, s.y, {
        type: HalfFloatType,
        samples: t.samples,
        depthBuffer: !0,
      });
    t.soft &&
      ((n.depthTexture = new DepthTexture(s.x, s.y)),
      (n.depthTexture.type = UnsignedIntType),
      (n.depthTexture.minFilter = n.depthTexture.magFilter = NearestFilter));
    let i = (this.composer = new LM(e, n));
    (i.setPixelRatio(1), i.setSize(s.x, s.y));
    let a = (f) => (i.addPass(f), this._passes.push(f), f);
    this.worldPass = new cb(this.scene, this.camera);
    let r = this.worldPass.render.bind(this.worldPass);
    ((this.worldPass.render = (f, u, d, m, p) => {
      ((this._worldRT = d), r(f, u, d, m, p));
    }),
      (this.vmPass = new cb(this.vmScene, this.vmCamera)),
      (this.vmPass.clear = !1),
      (this.vmPass.clearDepth = !0));
    let l = this.vmPass.render.bind(this.vmPass);
    ((this.vmPass.render = (...f) => {
      Ir.ghLVMat.value.copy(this.camera.matrixWorld);
      try {
        l(...f);
      } finally {
        Ir.ghLVMat.value.identity();
      }
    }),
      (this.bloom = new mg(new Vector2(s.x, s.y), 0.3, 0.5, 1.35)));
    let c = this.uniforms;
    if (((this.final = new Cd(_Y)), (this.uniforms = this.final.uniforms), c))
      for (let f of Object.keys(c))
        f !== "tDiffuse" &&
          f !== "uRes" &&
          f[0] !== "t" &&
          this.uniforms[f] &&
          (this.uniforms[f].value = c[f].value);
    if (
      (this.uniforms.uRes.value.set(s.x, s.y),
      (this.uniforms.uSharpen.value = t.sharpen),
      a(this.worldPass),
      (this.gtao = null),
      t.ao)
    ) {
      let f = this.camera,
        u = (this.gtao = new gg(this.scene, f, s.x, s.y));
      ((u.output = gg.OUTPUT.Default),
        (u.blendIntensity = 0.92),
        u.updateGtaoMaterial({
          radius: 0.55,
          distanceExponent: 1.6,
          thickness: 1.4,
          distanceFallOff: 1,
          scale: 1.25,
          samples: 16,
          screenSpaceRadius: !1,
        }),
        u.updatePdMaterial({
          lumaPhi: 10,
          depthPhi: 2.2,
          normalPhi: 3.2,
          radius: 7,
          radiusExponent: 1.6,
          rings: 2,
          samples: 12,
        }));
      let d = u.render.bind(u);
      ((u.render = (...m) => {
        let p = f.layers.mask;
        f.layers.set(0);
        try {
          d(...m);
        } finally {
          f.layers.mask = p;
        }
      }),
        a(u));
    }
    ((this.fxPass = null),
      this.fx &&
        ((this.fxPass = a(new f9(this))), this.fxPass.setSize(s.x, s.y)),
      a(this.vmPass),
      (this.vmBlurPass = null),
      t.vmblur > 0 &&
        ((this.vmBlurPass = a(new d9(this))),
        this.vmBlurPass.setSize(s.x, s.y)),
      (this.rays = null),
      (this.streak = null),
      t.bloom
        ? (a(new Cd(RY)),
          t.rays &&
            ((this.rays = new Cd({
              ...AL,
              uniforms: UniformsUtils.clone(AL.uniforms),
              defines: {
                RAY_SAMPLES: t.rays,
              },
            })),
            a(this.rays)),
          a(this.bloom),
          t.streak > 0 &&
            ((this.streak = a(new u9(this))), this.streak.setSize(s.x, s.y)))
        : this._passes.push(this.bloom),
      (this.meter = a(new p9(this))),
      this.meter.setSize(s.x, s.y),
      a(this.final));
    let h = this.uniforms;
    ((h.tDirt.value = t.dirt > 0 && t.bloom ? HY() : null),
      (h.uDirt.value = t.bloom ? t.dirt : 0),
      (h.tBloom.value = t.bloom
        ? this.bloom.renderTargetsHorizontal[0].texture
        : null),
      (h.tStreak.value = this.streak ? this.streak.rt.texture : null),
      (h.uStreak.value = this.streak ? t.streak : 0),
      (h.uDof.value = t.dof),
      (h.tAdapt.value = this.meter.texture),
      (h.uAuto.value = this.exposure.auto),
      (this.camera.aspect = this.vmCamera.aspect = innerWidth / innerHeight),
      this.camera.updateProjectionMatrix(),
      this.vmCamera.updateProjectionMatrix(),
      (this._hasPrev = !1),
      this.fx && this.fx.onQuality(t));
  }
  setMotionBlur(t) {
    let e = t === "off" ? 0 : t === "low" ? 0.55 : 1;
    ((this.motionBlur = e), (this.vmBlur = e));
  }
  snapExposure() {
    this.meter && (this.meter.reset = !0);
  }
  readMeter() {
    let t = this._mb || (this._mb = new Uint16Array(4));
    return (
      this.renderer.readRenderTargetPixels(this.meter.e0, 0, 0, 1, 1, t),
      {
        exposure: DataUtils.fromHalfFloat(t[0]),
        avg: DataUtils.fromHalfFloat(t[1]),
      }
    );
  }
  setFx(t) {
    ((this.fx = t), this._build(), this.onQuality && this.onQuality(this.q));
  }
  setQuality(t) {
    c9[t] &&
      ((this.quality = t),
      (this.q = c9[t]),
      this._build(),
      this.onQuality && this.onQuality(this.q));
  }
  resize() {
    let t = this._measure();
    (this.fx && this.fx.releaseTargets(),
      this.composer.setSize(t.x, t.y),
      this.uniforms.uRes.value.set(t.x, t.y),
      (this.camera.aspect = this.vmCamera.aspect = innerWidth / innerHeight),
      this.camera.updateProjectionMatrix(),
      this.vmCamera.updateProjectionMatrix(),
      (this._hasPrev = !1),
      this.onQuality && this.onQuality(this.q));
  }
  _motion(t) {
    let e = this.camera,
      s = this.q;
    e.getWorldQuaternion(OM);
    let n = 0;
    if (this._hasPrev && s.mblur > 0 && this.motionBlur > 0 && t > 1e-4) {
      let i = Math.min(1, Math.abs(OM.dot(this._prevQ))),
        a = 2 * Math.acos(i),
        r = a / t;
      this._turn += (Math.min(r, 20) - this._turn) * Math.min(1, t * 9);
      let l = Math.min(r, this._turn);
      if (a < 0.5 && l > 2.6) {
        let c = Math.min(1, (l - 2.6) / 5.5);
        ((n = c * c * (3 - 2 * c) * Math.min(1.2, 0.009 / t) * this.motionBlur),
          kL.makeRotationFromQuaternion(this._prevQ).transpose(),
          CL.makeRotationFromQuaternion(OM),
          this._reproj
            .copy(e.projectionMatrix)
            .multiply(kL)
            .multiply(CL)
            .multiply(e.projectionMatrixInverse));
      }
    }
    ((this._blurK = n), this._prevQ.copy(OM), (this._hasPrev = !0));
  }
  render(t) {
    ((this.time += t), (this.uniforms.uTime.value = this.time));
    let e = this.renderer,
      s = this.fx;
    (e.info.reset(),
      (e.shadowMap.needsUpdate = !0),
      this.preRender &&
        (s && s.mirror(!0), this.preRender(e), s && s.mirror(!1)),
      this._motion(t));
    {
      let i = this.camera.position;
      (i.distanceToSquared(this._lastCam) > 9 && this.snapExposure(),
        this._lastCam.copy(i),
        (this.uniforms.uAuto.value = this.exposure.auto));
    }
    let n = Math.min(1, this.rayK / 0.3);
    if (((this.bloom.strength = 0.3 * (1 - 0.42 * n)), this.rays)) {
      let i = this.rays.uniforms;
      (i.uSun.value.copy(this.sunUv),
        (i.uK.value = this.rayK * 0.7),
        (i.uAspect.value = this.camera.aspect));
    }
    this.composer.render(t);
  }
};

export { GameRenderer };

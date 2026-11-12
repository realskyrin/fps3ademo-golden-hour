// render/effects/atlas.js: recovered from the verified GOLDEN HOUR release.
import { createCanvas, createRandom } from "../../core/math.js";
import {
  Color,
  DataTexture,
  LinearFilter,
  LinearMipmapLinearFilter,
  Mesh,
  NearestFilter,
  NoBlending,
  NoColorSpace,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  UnsignedByteType,
  Vector2,
  Vector4,
  WebGLRenderTarget,
} from "../../vendor/three-r180.js";
import { zL } from "./noise.js";

var Ds = {
  SMOKE: {
    id: 0,
    x: 0,
    y: 8,
    cols: 8,
    rows: 8,
    frames: 64,
    cs: 1,
  },
  BLAST: {
    id: 1,
    x: 8,
    y: 8,
    cols: 8,
    rows: 8,
    frames: 64,
    cs: 1,
  },
  JET: {
    id: 2,
    x: 0,
    y: 4,
    cols: 8,
    rows: 4,
    frames: 32,
    cs: 1,
  },
  FLAME: {
    id: 3,
    x: 0,
    y: 0,
    cols: 8,
    rows: 4,
    frames: 32,
    cs: 1,
    loop: !0,
  },
  SPR: {
    id: 4,
    x: 8,
    y: 0,
    cols: 8,
    rows: 4,
    frames: 32,
    cs: 1,
  },
  BIG: {
    id: 5,
    x: 8,
    y: 4,
    cols: 4,
    rows: 2,
    frames: 8,
    cs: 2,
  },
};
var VM = [Ds.SMOKE, Ds.BLAST, Ds.JET, Ds.FLAME, Ds.SPR, Ds.BIG];
var Fe = {
  GLOW: 0,
  SPARK: 1,
  STREAK: 2,
  EMBER: 3,
  DROP: 4,
  RING: 5,
  MIST: 6,
  CHIP_A: 7,
  CHIP_B: 8,
  CHIP_C: 9,
  SPLINTER_A: 10,
  SPLINTER_B: 11,
  LEAF_A: 12,
  LEAF_B: 13,
  FIBRE: 14,
  SHARD: 15,
  GLINT: 16,
  FLARE: 17,
  CHUNK: 18,
  GRIT: 19,
  WATERJET: 20,
  RIPPLE: 21,
  WISP: 22,
  SCRAP: 23,
  FLAME_A: 24,
  FLAME_B: 25,
  STAR_A: 26,
  STAR_B: 27,
  PUFF: 28,
  DUST: 29,
  DROPS: 30,
  POLLEN: 31,
};
var zd = {
  STAR_A: 0,
  STAR_B: 1,
  STAR_C: 2,
  STAR_D: 3,
  CONE_A: 4,
  CONE_B: 5,
  RING: 6,
  BURST: 7,
};
var NY = `
  precision highp float; precision highp sampler3D;
  uniform sampler3D tN; uniform float uBook, uFrames, uLoop; uniform vec2 uGrid;
  varying vec2 vUv;
  vec4 N(vec3 p) { return textureLod(tN, p, 0.0); }
  float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }

  // lite = shadow taps: skip the domain warp and the finest octave
  float dens(vec3 p, float tau, out float heat, bool lite) {
    heat = 0.0;
    float win = smoothstep(1.0, 0.86, max(abs(p.x), max(abs(p.y), abs(p.z))));
    #if BOOK == 0
    {
      // ---- smoke puff: compact ball that billows, grows and erodes into wisps ----
      float R = mix(0.42, 0.70, 1.0 - (1.0 - tau) * (1.0 - tau));
      vec3 q = p * 0.52 + vec3(0.13, 0.37 - tau * 0.26, 0.71 + tau * 0.17);
      if (!lite) { vec4 w = N(q * 0.55 + vec3(0.5, 0.2, 0.9)); q += (vec3(w.r, w.a, w.g) - 0.5) * (0.05 + 0.12 * tau); }
      float b1 = N(q).g, b2 = N(q * 2.6 + 0.37).b, b3 = lite ? 0.5 : N(q * 5.7 + 0.11).b;
      float disp = (b1 - 0.5) * 0.30 + (b2 - 0.5) * 0.25 + (b3 - 0.5) * 0.11;
      float d = (R - length(p * vec3(1.0, 1.05, 1.0))) + disp * mix(0.85, 1.45, tau) - (1.0 - b2) * 0.22 * tau;
      return smoothstep(0.0, mix(0.10, 0.26, tau), d) * mix(1.0, 0.5, tau * tau) * win;
    }
    #elif BOOK == 1
    {
      // ---- frag fireball: white-hot ball, breaks into glowing crevices, rolls into dark smoke ----
      float e = 1.0 - pow(1.0 - clamp(tau / 0.2, 0.0, 1.0), 3.0);
      float R = mix(0.20, 0.58, e) + 0.10 * tau;
      vec3 dir = normalize(p + 1e-4);
      vec3 q = p * 0.50 - dir * (0.07 * e + 0.09 * tau) + vec3(0.61, 0.17 - tau * 0.16, 0.29);
      if (!lite) { vec4 w = N(q * 0.6 + vec3(0.11, 0.73, 0.4)); q += (vec3(w.r, w.a, w.g) - 0.5) * (0.03 + 0.11 * tau); }
      float b1 = N(q).g, b2 = N(q * 2.7 + 0.19).b, b3 = lite ? 0.5 : N(q * 5.9 + 0.5).b;
      float disp = (b1 - 0.5) * 0.46 + (b2 - 0.5) * 0.23 + (b3 - 0.5) * 0.09;
      float lump = mix(0.3, 1.3, smoothstep(0.0, 0.32, tau));
      float d = (R - length(p)) + disp * lump - (1.0 - b2) * 0.16 * smoothstep(0.5, 1.0, tau);
      float cool = smoothstep(0.02, 0.6, tau);
      float core = d * 1.7 - disp * 1.5;
      float th = mix(-0.25, 0.8, cool);
      heat = smoothstep(th - 0.14, th + 0.16, core) * (1.0 - smoothstep(0.4, 0.66, tau));
      return smoothstep(0.0, mix(0.07, 0.2, tau), d) * mix(1.0, 0.55, smoothstep(0.45, 1.0, tau)) * win;
    }
    #elif BOOK == 2
    {
      // ---- directional dust jet (+Y), origin at the bottom of the cell: thin stem, ragged bulbous head ----
      float y = (p.y + 0.86) / 1.74;
      float e = 1.0 - pow(1.0 - tau, 2.6);
      float front = mix(0.24, 0.97, e);
      float yy = clamp(y / front, 0.0, 1.2);
      float rad = (0.06 + 0.66 * pow(yy, 0.9)) * sqrt(max(0.0, 1.0 - pow(yy, 4.0))) * mix(0.45, 1.0, e);
      vec3 q = vec3(p.x * 0.6, (p.y - e * 1.1) * 0.21, p.z * 0.6) + vec3(0.27, 0.63, 0.41);
      float b1 = N(q).g, b2 = N(q * 2.6 + 0.3).b, b3 = lite ? 0.5 : N(q * 5.8 + 0.7).b;
      float disp = (b1 - 0.5) * 0.42 + (b2 - 0.5) * 0.26 + (b3 - 0.5) * 0.1;
      float d = (rad - length(p.xz)) + disp * mix(0.45, 1.25, tau) * (0.35 + yy) - (1.0 - yy) * tau * 0.3 - (1.0 - b2) * 0.2 * tau - smoothstep(0.96, 1.12, yy) * 1.2;
      return smoothstep(0.0, mix(0.07, 0.2, tau), d) * step(0.0, y) * mix(1.0, 0.32, pow(tau, 1.4)) * win;
    }
    #elif BOOK == 3
    {
    // ---- looping flame tongue (+Y), base at the bottom ----
    float y = (p.y + 0.9) / 1.8;
    float rad = mix(0.46, 0.05, pow(clamp(y, 0.0, 1.0), 0.75));
    float sway = (N(vec3(0.31, y * 0.5 - tau, 0.77)).r - 0.5) * 0.5 * y;
    vec2 xz = p.xz - vec2(sway, sway * 0.5);
    vec3 q = vec3(p.x * 0.42, p.y * 0.26 - tau * 2.0, p.z * 0.42) + vec3(0.8, 0.1, 0.33);
    float b1 = N(q).g, b2 = N(vec3(q.x * 2.3, q.y * 2.0 + 0.5, q.z * 2.3)).b;
    float axial = length(xz) / rad;
    float body = (1.0 - axial) + (b1 * 0.95 + b2 * 0.5 - 0.78) * (0.6 + 1.9 * y);
    heat = clamp(body * 1.5 * (1.2 - y * 0.85), 0.0, 1.0);
    return smoothstep(0.0, 0.4, body) * smoothstep(1.0, 0.7, y) * smoothstep(-0.02, 0.07, y) * win;
    }
    #else
    return 0.0;
    #endif
  }

  #if BOOK == 5
  float h11(float x) { return fract(sin(x * 127.1 + 3.7) * 43758.5453); }
  // a tongue of burning gas from the origin along 'ang': lens-shaped, pointed, turbulent edge, hotter spine
  float lobe(vec2 p, float ang, float len, float wid, float seed) {
    float c = cos(ang), s = sin(ang);
    vec2 q = vec2(p.x * c + p.y * s, -p.x * s + p.y * c);
    float t = q.x / len;
    if (t < -0.02 || t > 1.02) return 0.0;
    float n = N(vec3(q.x * 0.5 - seed, q.y * 1.4 + seed * 0.37, seed * 0.11)).r - 0.5;
    float n2 = N(vec3(q.x * 1.3 + seed, q.y * 3.0, seed * 0.23)).a - 0.5;
    float tt = clamp(t, 0.0, 1.0);
    float hw = wid * pow(sin(3.14159 * pow(tt, 0.5)), 0.85);
    float d = hw - abs(q.y + n * wid * 1.1 * tt) + (n * 0.55 + n2 * 0.55) * wid * (0.3 + tt);
    return (smoothstep(0.0, wid * 0.6, d) * 0.7 + smoothstep(wid * 0.35, wid * 0.9, d) * 0.5) * (1.0 - 0.7 * tt * tt);
  }
  // hero sprites: 0-3 muzzle stars, 4-5 muzzle cone seen from the side (+Y), 6 dust ring, 7 ejecta burst
  vec4 big(vec2 p, float id) {
    float I = 0.0, r = length(p), seed = id * 7.31 + 1.7;
    if (id < 3.5) {
      float nl = id < 0.5 ? 5.0 : id < 1.5 ? 4.0 : id < 2.5 ? 7.0 : 3.0;
      for (int i = 0; i < 7; i++) {
        float fi = float(i); if (fi >= nl) break;
        float ang = (fi + (h11(seed + fi) - 0.5) * 0.8) / nl * 6.2832 + seed;
        I += lobe(p, ang, mix(0.55, 0.95, h11(seed + fi * 3.1 + 1.0)), mix(0.09, 0.19, h11(seed + fi * 5.7 + 2.0)), seed + fi);
      }
      for (int i = 0; i < 9; i++) { float fi = float(i); I += 0.7 * lobe(p, h11(seed * 1.3 + fi * 2.1) * 6.2832, mix(0.22, 0.5, h11(seed + fi * 4.3)), mix(0.035, 0.07, h11(seed + fi * 1.9)), seed * 2.0 + fi); }
      I += exp(-r * r * 16.0) * 1.3 + exp(-r * r * 5.0) * 0.3;
    } else if (id < 5.5) {
      vec2 q = p - vec2(0.0, -0.9); float rq = length(q);
      I += lobe(q, 1.5708, 1.75, id < 4.5 ? 0.2 : 0.27, seed) * 0.9 + lobe(q, 1.5708, 1.15, 0.1, seed + 3.0) * 0.8;
      for (int i = 0; i < 10; i++) { float fi = float(i); I += 0.6 * lobe(q, 1.5708 + (h11(seed + fi * 2.7) - 0.5) * 0.8, mix(0.7, 1.8, h11(seed + fi * 3.3)), mix(0.04, 0.09, h11(seed + fi * 6.1)), seed + fi * 1.7); }
      I += exp(-rq * rq * 22.0) * 1.2;
    } else if (id < 6.5) {
      float a = atan(p.y, p.x);
      float n = N(vec3(p * 0.9, 0.3)).r, n2 = N(vec3(p * 2.6, 0.7)).g, n3 = N(vec3(cos(a) * 0.8, sin(a) * 0.8, r * 0.35)).a;
      float d = abs(r - 0.7 + (n - 0.5) * 0.16);
      I = smoothstep(0.24, 0.0, d) * (0.25 + 1.1 * n2 * n3) + smoothstep(0.75, 0.2, r) * 0.1 * n2;
    } else {
      for (int i = 0; i < 26; i++) { float fi = float(i); float ang = h11(seed + fi * 1.7) * 6.2832; I += lobe(p - vec2(cos(ang), sin(ang)) * 0.06, ang, mix(0.4, 0.97, h11(seed + fi * 2.9)), mix(0.012, 0.04, h11(seed + fi * 4.1)), seed + fi); }
      I += exp(-r * r * 9.0) * 0.6;
    }
    I *= smoothstep(1.0, 0.88, max(abs(p.x), abs(p.y)));
    return vec4(0.5, 0.5, 1.0, clamp(I, 0.0, 1.0));
  }
  #endif

  void main() {
    vec2 g = vUv * uGrid; vec2 cell = floor(g); vec2 f = fract(g);
    float frame = cell.x + cell.y * uGrid.x;
    #if BOOK == 5
    gl_FragColor = big(f * 2.0 - 1.0, frame);
    #else
    float tau = frame / (uFrames - 1.0 + uLoop);
    vec2 pxy = f * 2.0 - 1.0;
    const int STEPS = 24; const float DZ = 2.0 / float(STEPS);
    float sigma = uBook > 2.5 ? 5.0 : uBook > 1.5 ? 7.0 : uBook > 0.5 ? 9.0 : 7.0;
    float jitter = hash12(gl_FragCoord.xy);
    float T = 1.0, H = 0.0; vec4 L = vec4(0.0);
    for (int i = 0; i < STEPS; i++) {
      vec3 p = vec3(pxy, 1.0 - (float(i) + jitter) * DZ);
      float h; float d = dens(p, tau, h, false);
      if (d > 0.004) {
        float a = 1.0 - exp(-d * sigma * DZ);
        float hh;
        vec4 s1 = vec4(dens(p + vec3(0.22, 0.0, 0.0), tau, hh, true), dens(p - vec3(0.22, 0.0, 0.0), tau, hh, true), dens(p + vec3(0.0, 0.22, 0.0), tau, hh, true), dens(p - vec3(0.0, 0.22, 0.0), tau, hh, true));
        vec4 vis = exp(-s1 * 1.6);
        L += T * a * vis; H += T * a * h; T *= 1.0 - a;
        if (T < 0.01) break;
      }
    }
    float alpha = 1.0 - T, inv = 1.0 / max(alpha, 1e-3);
    float Lx = (L.x - L.y) * inv, Ly = (L.z - L.w) * inv, L0 = dot(L, vec4(0.25)) * inv;
    bool fire = (uBook > 0.5 && uBook < 1.5) || uBook > 2.5;
    gl_FragColor = vec4(clamp(Lx * 0.75 + 0.5, 0.0, 1.0), clamp(Ly * 0.75 + 0.5, 0.0, 1.0), fire ? H * inv : clamp(L0 * 1.6, 0.0, 1.0), alpha);
    #endif
  }`;
var BY = `precision highp float; uniform sampler2D tMap; uniform vec2 uPx; varying vec2 vUv;
  void main() {
    if (uPx.x <= 0.0) { gl_FragColor = texture2D(tMap, vUv); return; }
    // 3x3 tent, alpha-weighted so empty texels do not drag the lighting channels toward grey
    vec4 acc = vec4(0.0); float wa = 0.0, wt = 0.0;
    for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
      float w = (i == 0 ? 2.0 : 1.0) * (j == 0 ? 2.0 : 1.0); vec4 t = texture2D(tMap, vUv + vec2(float(i), float(j)) * uPx);
      acc.rgb += t.rgb * t.a * w; acc.a += t.a * w; wa += t.a * w; wt += w;
    }
    gl_FragColor = vec4(wa > 1e-4 ? acc.rgb / wa : vec3(0.5, 0.5, 0.0), acc.a / wt);
  }`;
var LL =
  "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
function UY(o) {
  let t = createCanvas(o),
    e = t.getContext("2d", {
      willReadFrequently: !0,
    }),
    s = o / 8,
    n = createRandom(1234),
    i = new Uint8Array(64),
    a = (w, T, S, E = !1) => {
      let _ = w.cs,
        R = T % w.cols,
        C = Math.floor(T / w.cols),
        L = w.x + R * _ - 8,
        A = w.y + C * _,
        O = L * s,
        H = o - (A + _) * s,
        F = _ * s;
      if (E)
        for (let P = 0; P < _; P++)
          for (let z = 0; z < _; z++)
            i[(Math.round(H / s) + P) * 8 + L + z] = 1;
      (e.save(),
        e.beginPath(),
        e.rect(O, H, F, F),
        e.clip(),
        e.translate(O + F / 2, H + F / 2),
        e.scale(F / 256, F / 256),
        (e.globalCompositeOperation = "source-over"),
        (e.globalAlpha = 1),
        (e.shadowBlur = 0),
        S(),
        e.restore());
    },
    r = (w) => `rgba(255,255,255,${w})`,
    l = (w, T, S, E, _ = 0) => {
      let R = e.createRadialGradient(w, T, _, w, T, S);
      (R.addColorStop(0, r(E)),
        R.addColorStop(1, r(0)),
        (e.fillStyle = R),
        e.beginPath(),
        e.arc(w, T, S, 0, 6.2832),
        e.fill());
    },
    c = (w, T, S, E, _, R, C = 0) => {
      (e.save(), e.translate(w, T), e.rotate(_), e.scale(S, E));
      let L = e.createRadialGradient(0, 0, C, 0, 0, 1);
      (L.addColorStop(0, r(R)),
        L.addColorStop(1, r(0)),
        (e.fillStyle = L),
        e.beginPath(),
        e.arc(0, 0, 1, 0, 6.2832),
        e.fill(),
        e.restore());
    },
    h = Ds.SPR;
  (a(h, Fe.GLOW, () => {
    (l(0, 0, 124, 0.55), l(0, 0, 70, 0.5), l(0, 0, 30, 0.45));
  }),
    a(h, Fe.SPARK, () => {
      (l(0, 0, 100, 0.25), l(0, 0, 46, 0.9), l(0, 0, 22, 1, 6));
    }),
    a(h, Fe.STREAK, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 3; w++) {
        let T = [26, 13, 6][w],
          S = [0.3, 0.6, 1][w],
          E = e.createLinearGradient(-124, 0, 124, 0);
        (E.addColorStop(0, r(0)),
          E.addColorStop(0.55, r(S * 0.35)),
          E.addColorStop(0.9, r(S)),
          E.addColorStop(1, r(0)),
          (e.fillStyle = E),
          e.beginPath(),
          e.moveTo(-124, 0),
          e.quadraticCurveTo(40, -T * 1.1, 110, -T * 0.8),
          e.quadraticCurveTo(126, 0, 110, T * 0.8),
          e.quadraticCurveTo(40, T * 1.1, -124, 0),
          e.fill());
      }
      l(102, 0, 20, 0.9);
    }),
    a(h, Fe.EMBER, () => {
      (l(0, 0, 70, 0.3), (e.fillStyle = r(1)), e.beginPath());
      for (let w = 0; w < 7; w++) {
        let T = (w / 7) * 6.2832,
          S = n.range(16, 30);
        e.lineTo(Math.cos(T) * S, Math.sin(T) * S);
      }
      (e.closePath(), (e.shadowColor = "#fff"), (e.shadowBlur = 16), e.fill());
    }),
    a(h, Fe.RING, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 90; w++) {
        let T = (w / 90) * 6.2832 + n() * 0.05,
          S = 96 + n.range(-7, 7);
        c(
          Math.cos(T) * S,
          Math.sin(T) * S,
          n.range(14, 30),
          n.range(8, 16),
          T + 1.5708,
          n.range(0.12, 0.3),
        );
      }
    }),
    a(h, Fe.MIST, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 26; w++) {
        let T = n() * 6.2832,
          S = n() * 48;
        l(Math.cos(T) * S, Math.sin(T) * S, n.range(36, 70), 0.085);
      }
    }),
    a(h, Fe.GLINT, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 4; w++)
        c(0, 0, w % 2 ? 122 : 86, 5, w * 0.7854, w < 2 ? 0.9 : 0.5);
      (l(0, 0, 34, 0.9), l(0, 0, 12, 1, 4));
    }),
    a(h, Fe.FLARE, () => {
      ((e.globalCompositeOperation = "lighter"),
        c(0, 0, 126, 7, 0, 0.9),
        c(0, 0, 80, 14, 0, 0.5),
        l(0, 0, 30, 0.8));
    }),
    a(h, Fe.GRIT, () => {
      for (let w = 0; w < 46; w++) {
        let T = n() * 6.2832,
          S = Math.pow(n(), 0.6) * 112;
        ((e.fillStyle = r(n.range(0.5, 1))),
          e.beginPath(),
          e.arc(Math.cos(T) * S, Math.sin(T) * S, n.range(1.6, 4.6), 0, 6.2832),
          e.fill());
      }
    }),
    a(h, Fe.WATERJET, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 22; w++) {
        let T = n.range(-30, 30) * (1 + n()),
          S = n.range(-90, 80);
        c(
          T * 0.7,
          S,
          n.range(5, 14),
          n.range(22, 60),
          n.range(-0.12, 0.12),
          n.range(0.15, 0.4),
        );
      }
      for (let w = 0; w < 30; w++) {
        let T = n.range(-70, 70),
          S = n.range(-118, 30);
        ((e.fillStyle = r(n.range(0.4, 0.9))),
          e.beginPath(),
          e.arc(T, S, n.range(1.5, 5), 0, 6.2832),
          e.fill());
      }
    }),
    a(h, Fe.RIPPLE, () => {
      ((e.strokeStyle = r(0.9)),
        (e.lineWidth = 5),
        (e.shadowColor = "#fff"),
        (e.shadowBlur = 6),
        e.beginPath(),
        e.arc(0, 0, 108, 0, 6.2832),
        e.stroke(),
        (e.strokeStyle = r(0.35)),
        (e.lineWidth = 3),
        e.beginPath(),
        e.arc(0, 0, 84, 0, 6.2832),
        e.stroke());
    }),
    a(h, Fe.WISP, () => {
      ((e.globalCompositeOperation = "lighter"), (e.lineCap = "round"));
      for (let w = 0; w < 5; w++)
        ((e.strokeStyle = r(0.1 + 0.05 * w)),
          (e.lineWidth = 30 - w * 5),
          (e.shadowColor = "#fff"),
          (e.shadowBlur = 14),
          e.beginPath(),
          e.moveTo(n.range(-8, 8), 112),
          e.bezierCurveTo(
            n.range(-60, -20),
            50,
            n.range(30, 70),
            0,
            n.range(-30, 0),
            -50,
          ),
          e.bezierCurveTo(
            n.range(-50, -30),
            -80,
            n.range(0, 30),
            -96,
            n.range(-12, 22),
            -112,
          ),
          e.stroke());
    }),
    a(h, Fe.FLAME_A, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 9; w++)
        c(
          n.range(-22, 22) * (1 - w / 11),
          86 - w * 22,
          54 - w * 5,
          60 - w * 4,
          0,
          0.3,
        );
    }),
    a(h, Fe.FLAME_B, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 9; w++)
        c(
          n.range(-30, 30) * (1 - w / 11),
          90 - w * 23,
          48 - w * 4.5,
          62 - w * 4,
          n.range(-0.3, 0.3),
          0.3,
        );
    }));
  let f = (w, T, S, E, _) => {
    e.globalCompositeOperation = "lighter";
    for (let R = 0; R < w; R++) {
      let C = (R / w) * 6.2832 + n.range(-0.3, 0.3),
        L = n.range(T, S);
      (c(
        Math.cos(C) * L * 0.42,
        Math.sin(C) * L * 0.42,
        L * 0.62,
        n.range(E * 0.7, E * 1.3),
        C,
        0.85,
        0.15,
      ),
        c(
          Math.cos(C) * L * 0.3,
          Math.sin(C) * L * 0.3,
          L * 0.42,
          E * 0.45,
          C,
          0.9,
          0.3,
        ));
    }
    for (let R = 0; R < _; R++) {
      let C = n() * 6.2832,
        L = n.range(T * 0.35, T * 0.75);
      c(
        Math.cos(C) * L * 0.45,
        Math.sin(C) * L * 0.45,
        L * 0.6,
        n.range(4, 9),
        C,
        0.6,
        0.1,
      );
    }
    (l(0, 0, T * 0.5, 0.9), l(0, 0, T * 0.28, 1, T * 0.08));
  };
  (a(h, Fe.STAR_A, () => f(6, 80, 120, 15, 8)),
    a(h, Fe.STAR_B, () => f(5, 70, 122, 17, 10)),
    a(h, Fe.DUST, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 60; w++) {
        let T = n() * 6.2832,
          S = n() * 84;
        l(Math.cos(T) * S, Math.sin(T) * S, n.range(10, 30), 0.16);
      }
    }),
    a(h, Fe.PUFF, () => {
      e.globalCompositeOperation = "lighter";
      for (let w = 0; w < 30; w++) {
        let T = n() * 6.2832,
          S = n() * 62;
        l(Math.cos(T) * S, Math.sin(T) * S, n.range(26, 58), 0.14);
      }
      l(0, 0, 90, 0.25);
    }),
    a(h, Fe.DROPS, () => {
      for (let w = 0; w < 16; w++) {
        let T = n() * 6.2832,
          S = Math.pow(n(), 0.7) * 100,
          E = n.range(4, 12);
        (l(Math.cos(T) * S, Math.sin(T) * S, E * 1.6, 0.5),
          (e.fillStyle = r(0.95)),
          e.beginPath(),
          e.arc(Math.cos(T) * S, Math.sin(T) * S, E * 0.6, 0, 6.2832),
          e.fill());
      }
    }),
    a(h, Fe.POLLEN, () => {
      (l(0, 0, 60, 0.35), (e.strokeStyle = r(0.5)), (e.lineWidth = 2));
      for (let w = 0; w < 18; w++) {
        let T = (w / 18) * 6.2832 + n() * 0.2;
        (e.beginPath(),
          e.moveTo(0, 0),
          e.lineTo(
            Math.cos(T) * n.range(40, 84),
            Math.sin(T) * n.range(40, 84),
          ),
          e.stroke());
      }
      l(0, 0, 20, 1, 5);
    }));
  let u = (w, T = 1, S = 1) =>
      `rgba(${Math.round(w * 255)},${Math.round(T * 255)},0,${S})`,
    d = (w, T, S = 1, E = 0.25, _ = 1) => {
      for (let R = 0; R < w.length; R++) {
        let C = w[R],
          L = w[(R + 1) % w.length],
          A = (C[0] + L[0]) / 2,
          O = (C[1] + L[1]) / 2,
          H = e.createLinearGradient(T[0], T[1], A, O);
        (H.addColorStop(0, u(S, _)),
          H.addColorStop(1, u(E * n.range(0.6, 1.4), _ * n.range(0.75, 1))),
          (e.fillStyle = H),
          (e.strokeStyle = H),
          (e.lineWidth = 1.2),
          e.beginPath(),
          e.moveTo(T[0], T[1]),
          e.lineTo(C[0], C[1]),
          e.lineTo(L[0], L[1]),
          e.closePath(),
          e.fill(),
          e.stroke());
      }
    },
    m = (w, T, S, E = 1, _ = 1) => {
      let R = [];
      for (let C = 0; C < w; C++) {
        let L = (C / w) * 6.2832 + n.range(-0.25, 0.25),
          A = n.range(T, S);
        R.push([Math.cos(L) * A * E, Math.sin(L) * A * _]);
      }
      return R;
    };
  (a(
    h,
    Fe.CHIP_A,
    () => d(m(6, 70, 112), [n.range(-20, 20), n.range(-20, 20)]),
    !0,
  ),
    a(
      h,
      Fe.CHIP_B,
      () => d(m(5, 60, 114, 1, 0.7), [n.range(-25, 25), n.range(-12, 12)]),
      !0,
    ),
    a(
      h,
      Fe.CHIP_C,
      () => d(m(7, 74, 110, 0.8, 1), [n.range(-12, 12), n.range(-25, 25)]),
      !0,
    ),
    a(
      h,
      Fe.CHUNK,
      () => {
        d(m(8, 84, 116), [n.range(-24, 24), n.range(-24, 24)], 1, 0.2, 0.9);
        for (let w = 0; w < 14; w++)
          ((e.fillStyle = u(n.range(0.3, 0.9), 0.6, 0.5)),
            e.beginPath(),
            e.arc(n.range(-60, 60), n.range(-60, 60), n.range(3, 9), 0, 6.2832),
            e.fill());
      },
      !0,
    ));
  let p = (w, T) => {
    e.rotate(n.range(-0.15, 0.15));
    let S = [
      [-w, n.range(-3, 3)],
      [-w * 0.5, -T * n.range(0.5, 1)],
      [w * 0.2, -T],
      [w * 0.75, -T * 0.5],
      [w, n.range(-4, 4)],
      [w * 0.6, T * 0.6],
      [0, T],
      [-w * 0.6, T * 0.7],
    ];
    for (let E of [-1, 1]) {
      let _ = e.createLinearGradient(0, 0, 0, E * T);
      (_.addColorStop(0, u(1)),
        _.addColorStop(1, u(0.2, 0.8)),
        (e.fillStyle = _),
        e.beginPath(),
        e.moveTo(-w, 0));
      for (let R of S) R[1] * E >= -4 && e.lineTo(R[0], R[1]);
      (e.lineTo(w, 0), e.closePath(), e.fill());
    }
    ((e.strokeStyle = u(0.55, 0.7, 0.6)), (e.lineWidth = 1.5));
    for (let E = 0; E < 5; E++) {
      let _ = n.range(-T * 0.6, T * 0.6);
      (e.beginPath(),
        e.moveTo(-w * 0.8, _),
        e.lineTo(w * 0.8, _ + n.range(-3, 3)),
        e.stroke());
    }
  };
  (a(h, Fe.SPLINTER_A, () => p(118, 15), !0),
    a(h, Fe.SPLINTER_B, () => p(104, 24), !0));
  let x = (w, T, S) => {
    e.rotate(n.range(-0.3, 0.3));
    for (let E of [-1, 1]) {
      let _ = e.createLinearGradient(0, 0, 0, E * T);
      (_.addColorStop(0, u(0.9)),
        _.addColorStop(1, u(0.35, 0.85)),
        (e.fillStyle = _),
        e.beginPath(),
        e.moveTo(-w, 0),
        e.quadraticCurveTo(-w * 0.2, E * T * 1.5, w * S, E * T * 0.5),
        e.lineTo(w * S + n.range(-10, 10), 0),
        e.closePath(),
        e.fill());
    }
    ((e.strokeStyle = u(1, 0.7)),
      (e.lineWidth = 3),
      e.beginPath(),
      e.moveTo(-w, 0),
      e.lineTo(w * S, 0),
      e.stroke());
  };
  (a(h, Fe.LEAF_A, () => x(112, 40, 0.8), !0),
    a(h, Fe.LEAF_B, () => x(100, 52, 0.45), !0),
    a(
      h,
      Fe.FIBRE,
      () => {
        e.lineCap = "round";
        for (let w = 0; w < 26; w++) {
          ((e.strokeStyle = u(
            n.range(0.4, 1),
            n.range(0.6, 1),
            n.range(0.5, 0.95),
          )),
            (e.lineWidth = n.range(1.6, 3.4)));
          let T = n() * 6.2832,
            S = n.range(40, 104);
          (e.beginPath(),
            e.moveTo(n.range(-14, 14), n.range(-14, 14)),
            e.quadraticCurveTo(
              Math.cos(T + 0.6) * S * 0.6,
              Math.sin(T + 0.6) * S * 0.6,
              Math.cos(T) * S,
              Math.sin(T) * S,
            ),
            e.stroke());
        }
      },
      !0,
    ),
    a(
      h,
      Fe.SHARD,
      () => {
        let w = [
          [-96, 60],
          [n.range(-10, 30), -108],
          [104, n.range(40, 84)],
        ];
        (d(w, [n.range(-10, 10), n.range(0, 20)], 1, 0.45, 1),
          (e.strokeStyle = u(1, 1, 0.9)),
          (e.lineWidth = 4),
          e.beginPath(),
          e.moveTo(w[0][0], w[0][1]),
          e.lineTo(w[1][0], w[1][1]),
          e.lineTo(w[2][0], w[2][1]),
          e.stroke());
      },
      !0,
    ),
    a(
      h,
      Fe.DROP,
      () => {
        let w = e.createRadialGradient(-14, -18, 4, 0, 0, 96);
        (w.addColorStop(0, u(1)),
          w.addColorStop(0.75, u(0.5, 0.9)),
          w.addColorStop(1, u(0.05, 0.7)),
          (e.fillStyle = w),
          e.beginPath(),
          e.arc(0, 0, 96, 0, 6.2832),
          e.fill());
      },
      !0,
    ),
    a(
      h,
      Fe.SCRAP,
      () => {
        e.rotate(0.3);
        let w = e.createLinearGradient(-90, -60, 90, 60);
        (w.addColorStop(0, u(0.8)),
          w.addColorStop(0.5, u(0.5, 0.9)),
          w.addColorStop(1, u(0.75)),
          (e.fillStyle = w),
          e.beginPath(),
          e.moveTo(-96, -50),
          e.lineTo(60, -72),
          e.lineTo(100, 30),
          e.lineTo(20, 66),
          e.lineTo(-80, 54),
          e.closePath(),
          e.fill());
      },
      !0,
    ));
  let g = e.getImageData(0, 0, o, o).data,
    b = new Uint8Array(o * o * 4),
    v = (w, T) => {
      ((w = w < 0 ? 0 : w >= o ? o - 1 : w),
        (T = T < 0 ? 0 : T >= o ? o - 1 : T));
      let S = (T * o + w) * 4;
      return (g[S] * g[S + 3]) / 65025;
    },
    y = 2.6 * (o / 2048);
  for (let w = 0; w < o; w++) {
    let T = Math.min(7, Math.floor(w / s));
    for (let S = 0; S < o; S++) {
      let E = (w * o + S) * 4,
        _ = ((o - 1 - w) * o + S) * 4,
        R = g[E + 3];
      if (i[T * 8 + Math.min(7, Math.floor(S / s))]) {
        let C = (v(S + 2, w) - v(S - 2, w)) * y * 64,
          L = (v(S, w + 2) - v(S, w - 2)) * y * 64;
        ((b[_] = Math.max(0, Math.min(255, 127.5 - C * 127.5))),
          (b[_ + 1] = Math.max(0, Math.min(255, 127.5 + L * 127.5))),
          (b[_ + 2] = g[E + 1]));
      } else ((b[_] = 128), (b[_ + 1] = 128), (b[_ + 2] = 255));
      b[_ + 3] = R;
    }
  }
  let M = new DataTexture(b, o, o, RGBAFormat, UnsignedByteType);
  return (
    (M.minFilter = M.magFilter = LinearFilter),
    (M.colorSpace = NoColorSpace),
    (M.needsUpdate = !0),
    M
  );
}
var UM = class {
  constructor() {
    ((this.size = 0),
      (this.ready = !1),
      (this.rt = new WebGLRenderTarget(4, 4, {
        type: UnsignedByteType,
        format: RGBAFormat,
        depthBuffer: !1,
        generateMipmaps: !0,
        minFilter: LinearMipmapLinearFilter,
        magFilter: LinearFilter,
        colorSpace: NoColorSpace,
      })),
      (this.texture = this.rt.texture),
      (this.texture.anisotropy = 2),
      (this.noise = zL(64)),
      (this.bookUniform = []));
    for (let t of VM)
      this.bookUniform.push(new Vector4(t.x / 16, t.y / 16, t.cols, t.cs / 16));
  }
  bake(t, e = 2048) {
    if (this.ready) return;
    let s = t.capabilities.maxTextureSize;
    ((e = Math.min(e, s >= 8192 ? 4096 : 2048)),
      (this.size = e),
      this.rt.setSize(e, e));
    let n = new OrthographicCamera(-1, 1, 1, -1, 0, 1),
      i = new PlaneGeometry(2, 2),
      a = {
        tN: {
          value: this.noise,
        },
        uBook: {
          value: 0,
        },
        uFrames: {
          value: 64,
        },
        uLoop: {
          value: 0,
        },
        uGrid: {
          value: new Vector2(8, 8),
        },
      },
      r = [0, 1, 2, 3, 4, 5].map(
        (M) =>
          new ShaderMaterial({
            uniforms: a,
            defines: {
              BOOK: M,
            },
            vertexShader: LL,
            fragmentShader: NY,
            depthTest: !1,
            depthWrite: !1,
            blending: NoBlending,
          }),
      ),
      l = r[0],
      c = performance.now(),
      h = UY(e / 2);
    this.tSprites = performance.now() - c;
    let f = new WebGLRenderTarget(e, e, {
        type: UnsignedByteType,
        format: RGBAFormat,
        depthBuffer: !1,
        minFilter: NearestFilter,
        magFilter: NearestFilter,
        colorSpace: NoColorSpace,
      }),
      u = new ShaderMaterial({
        uniforms: {
          tMap: {
            value: h,
          },
          uPx: {
            value: new Vector2(0, 0),
          },
        },
        vertexShader: LL,
        fragmentShader: BY,
        depthTest: !1,
        depthWrite: !1,
        blending: NoBlending,
      }),
      d = new Mesh(i, l);
    d.frustumCulled = !1;
    let m = new Scene();
    m.add(d);
    let p = t.getRenderTarget(),
      x = t.autoClear,
      g = t.getClearColor(new Color()),
      b = t.getClearAlpha(),
      v = this.rt,
      y = e / 16;
    ((t.autoClear = !1),
      (f.scissorTest = !0),
      f.viewport.set(0, 0, e, e),
      f.scissor.set(0, 0, e, e),
      t.setRenderTarget(f),
      t.setClearColor(0, 0),
      t.clear(!0, !1, !1));
    for (let M of [Ds.SMOKE, Ds.BLAST, Ds.JET, Ds.FLAME]) {
      let w = a;
      ((w.uBook.value = M.id),
        (w.uFrames.value = M.frames),
        (w.uLoop.value = M.loop ? 1 : 0),
        w.uGrid.value.set(M.cols, M.rows),
        (d.material = r[M.id]),
        f.viewport.set(M.x * y, M.y * y, M.cols * y, M.rows * y));
      for (let T = 0; T < M.rows; T++)
        (f.scissor.set(M.x * y, (M.y + T) * y, M.cols * y, y),
          t.setRenderTarget(f),
          t.render(m, n));
    }
    ((d.material = u),
      (v.texture.generateMipmaps = !1),
      (v.scissorTest = !0),
      v.viewport.set(0, 0, e, e),
      v.scissor.set(0, 0, e, e),
      t.setRenderTarget(v),
      t.clear(!0, !1, !1),
      (u.uniforms.tMap.value = f.texture),
      u.uniforms.uPx.value.set(1 / e, 1 / e),
      t.render(m, n),
      (u.uniforms.tMap.value = h),
      u.uniforms.uPx.value.set(0, 0),
      v.viewport.set(8 * y, 0, 8 * y, 8 * y),
      v.scissor.set(8 * y, 0, 8 * y, 8 * y),
      t.setRenderTarget(v),
      t.render(m, n));
    {
      let M = Ds.BIG,
        w = a;
      ((w.uBook.value = 5),
        (w.uFrames.value = M.frames),
        (w.uLoop.value = 0),
        w.uGrid.value.set(M.cols, M.rows),
        (d.material = r[5]),
        (v.texture.generateMipmaps = !0),
        v.viewport.set(M.x * y, M.y * y, M.cols * M.cs * y, M.rows * M.cs * y),
        v.scissor.copy(v.viewport),
        t.setRenderTarget(v),
        t.render(m, n));
    }
    ((v.scissorTest = !1),
      v.viewport.set(0, 0, e, e),
      v.scissor.set(0, 0, e, e),
      f.dispose(),
      t.setRenderTarget(p),
      (t.autoClear = x),
      t.setClearColor(g, b),
      i.dispose());
    for (let M of r) M.dispose();
    (u.dispose(), h.dispose(), (this.ready = !0));
  }
};

export { Ds, Fe, UM, VM, zd };

// scene/sky.js: recovered from the verified GOLDEN HOUR release.
import {
  AdditiveBlending,
  BackSide,
  BoxGeometry,
  CanvasTexture,
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  Mesh,
  Object3D,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector3,
} from "../vendor/three-r180.js";
import { createCanvas, createRandom, damp } from "../core/math.js";

var SUN_DIRECTION = new Vector3(-0.4, 0.285, 0.87).normalize();
var pb = new Color(16753242);
var Pd = -180;
var m9 = `
  float hash21(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i), hash21(i + vec2(1, 0)), f.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), f.x), f.y); }
  float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 11.7; a *= 0.5; } return s; }
  vec3 hazeColor(float az) { return mix(vec3(0.30, 0.21, 0.30), vec3(1.55, 0.70, 0.26), az * az); }
`;
function createSky(o) {
  let t = {},
    e = new ShaderMaterial({
      side: BackSide,
      depthWrite: !1,
      fog: !1,
      uniforms: {
        uSun: {
          value: SUN_DIRECTION,
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: `
      varying vec3 vDir;
      void main() { vDir = position; vec4 p = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w * 0.99999; }
    `,
      fragmentShader: `
      uniform vec3 uSun; uniform float uTime; varying vec3 vDir;
      ${m9}
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        float sd = clamp(dot(d, uSun), 0.0, 1.0);
        float az = clamp(dot(normalize(d.xz + 1e-5), normalize(uSun.xz)) * 0.5 + 0.5, 0.0, 1.0);
        vec3 zen = vec3(0.040, 0.075, 0.185);
        vec3 mid = mix(vec3(0.17, 0.14, 0.27), vec3(0.80, 0.33, 0.20), az * az);
        vec3 hor = mix(vec3(0.40, 0.27, 0.36), vec3(2.6, 1.10, 0.30), pow(az, 1.6));
        vec3 col = mix(hor, mid, smoothstep(-0.02, 0.20, h));
        col = mix(col, zen, smoothstep(0.08, 0.72, h));
        col += vec3(1.7, 0.60, 0.16) * pow(sd, 7.0) * 0.6;
        col += vec3(2.2, 1.15, 0.45) * pow(sd, 80.0) * 1.35;
        // clouds: thin streaks lit from underneath
        if (h > -0.03) {
          vec2 p = d.xz / (h + 0.16);
          p.x *= 0.55;
          float n = fbm(p * 1.15 + vec2(uTime * 0.0035, 0.0));
          float n2 = fbm(p * 3.4 + 9.0 - uTime * 0.005);
          float f = n * 0.72 + n2 * 0.28;
          float cov = smoothstep(0.50, 0.74, f) * smoothstep(-0.03, 0.06, h);
          float dens = smoothstep(0.56, 0.90, f);
          vec3 lit = mix(vec3(0.34, 0.22, 0.33), vec3(2.6, 0.95, 0.36), pow(az, 2.2) * (0.3 + 0.7 * pow(sd, 1.5)));
          vec3 cc = mix(lit, vec3(0.13, 0.09, 0.15), dens * 0.75);
          col = mix(col, cc, cov * 0.9);
        }
        // sun disc
        col += vec3(1.0, 0.72, 0.45) * smoothstep(0.99962, 0.99988, sd) * 70.0;
        // below the horizon: thick haze
        col = mix(col, hazeColor(az) * 0.62, smoothstep(0.01, -0.10, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    }),
    s = new Mesh(new SphereGeometry(2e3, 48, 24), e);
  ((s.renderOrder = -100),
    (s.frustumCulled = !1),
    (s.matrixAutoUpdate = !1),
    o.add(s));
  let n = createRandom(4711),
    i = 250,
    a = i * 3,
    r = new BoxGeometry(1, 1, 1);
  r.translate(0, 0.5, 0);
  let l = new Float32Array(a * 4),
    c = new ShaderMaterial({
      fog: !1,
      uniforms: {
        uSun: {
          value: SUN_DIRECTION,
        },
        uCam: {
          value: new Vector3(),
        },
        uTime: {
          value: 0,
        },
      },
      vertexShader: `
      attribute vec4 aInfo;
      varying vec3 vLocal; varying vec3 vN; varying vec3 vWorld; varying float vSeed; varying float vLocalH;
      void main() {
        vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vLocal = position * aInfo.xyz; vLocalH = aInfo.y;
        vSeed = aInfo.w;
        vN = normalize(mat3(instanceMatrix) * normal);
        vWorld = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
      fragmentShader: `
      uniform vec3 uSun, uCam; uniform float uTime;
      varying vec3 vLocal; varying vec3 vN; varying vec3 vWorld; varying float vSeed; varying float vLocalH;
      ${m9}
      void main() {
        vec3 n = normalize(vN);
        float ndl = max(dot(n, uSun), 0.0);
        float tone = 0.55 + 0.9 * fract(vSeed * 7.31);
        vec3 wall = vec3(0.020, 0.023, 0.032) * tone + vec3(1.35, 0.50, 0.15) * ndl * 0.20 * tone;
        vec3 col = wall;
        if (abs(n.y) < 0.5) {
          float u = abs(n.x) > 0.5 ? vLocal.z : vLocal.x;
          float style = fract(vSeed * 1.37);
          vec2 cs = style < 0.4 ? vec2(1.7, 3.9) : style < 0.75 ? vec2(3.4, 3.9) : vec2(8.0, 4.3);
          vec2 cell = vec2(u / cs.x, vLocal.y / cs.y);
          vec2 id = floor(cell), f = fract(cell), fw = fwidth(cell);
          float wx = smoothstep(0.09 - fw.x, 0.09 + fw.x, f.x) * (1.0 - smoothstep(0.91 - fw.x, 0.91 + fw.x, f.x));
          float wy = smoothstep(0.30 - fw.y, 0.30 + fw.y, f.y) * (1.0 - smoothstep(0.88 - fw.y, 0.88 + fw.y, f.y));
          float win = wx * wy;
          float r = hash21(id + vSeed * 91.7), r2 = hash21(id * 1.7 + vSeed * 13.1);
          float floorLit = step(0.95, hash21(vec2(id.y, vSeed * 3.3)));
          float lit = max(step(0.9, r), floorLit * step(0.45, r2));
          vec3 warm = mix(vec3(1.0, 0.48, 0.17), vec3(1.0, 0.70, 0.38), r2) * (0.3 + 0.75 * r2);
          warm = mix(warm, vec3(0.5, 0.72, 0.95) * 0.6, step(0.95, fract(r * 13.7)));
          vec3 glass = mix(vec3(0.030, 0.045, 0.085), vec3(1.9, 0.72, 0.20), pow(ndl, 1.6) * 0.75) * (0.65 + 0.6 * fract(r * 5.1));
          // floor slab edge + a crown band near the top give the mass some architecture
          float slab = 1.0 - smoothstep(0.0, 0.07 + fw.y, f.y);
          vec3 detail = mix(wall * (1.0 - 0.35 * slab), mix(glass, warm * 1.25, lit), win);
          float top = smoothstep(vLocalH - 5.0, vLocalH - 3.5, vLocal.y) * step(0.62, fract(vSeed * 2.71));
          detail += mix(vec3(2.2, 0.9, 0.3), vec3(0.3, 1.5, 1.6), step(0.5, fract(vSeed * 5.9))) * top * 0.8;
          vec3 avg = mix(wall, mix(glass, vec3(1.0, 0.6, 0.3), 0.14), 0.47);
          col = mix(detail, avg, smoothstep(0.25, 0.75, max(fw.x, fw.y)));
        } else {
          float blink = step(0.5, fract(uTime * 0.6 + vSeed * 3.0));
          col += vec3(5.0, 0.3, 0.1) * blink * smoothstep(0.93, 0.99, 1.0 - length(vLocal.xz) * 0.02);
        }
        float dist = length(vWorld.xz - uCam.xz);
        float az = clamp(dot(normalize(vWorld.xz - uCam.xz + 1e-4), normalize(uSun.xz)) * 0.5 + 0.5, 0.0, 1.0);
        float fogF = 1.0 - exp(-dist * 0.0017);
        fogF = clamp(fogF + smoothstep(40.0, -170.0, vWorld.y) * 0.5, 0.0, 1.0);
        col = mix(col, hazeColor(az) * 0.62, fogF);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    }),
    h = new InstancedMesh(r, c, a),
    f = new Matrix4(),
    u = new Quaternion(),
    d = new Vector3(),
    m = new Vector3(),
    p = 0,
    x = (_, R, C, L, A, O, H, F) => {
      (m.set(_, R, C),
        u.setFromAxisAngle(Object3D.DEFAULT_UP, H),
        d.set(L, A, O),
        f.compose(m, u, d),
        h.setMatrixAt(p, f),
        (l[p * 4] = L),
        (l[p * 4 + 1] = A),
        (l[p * 4 + 2] = O),
        (l[p * 4 + 3] = F),
        p++);
    };
  for (let _ = 0; _ < i; _++) {
    let R = n() * Math.PI * 2,
      C = _ < 26,
      L = C ? n.range(210, 380) : n.range(360, 1500),
      A = n.range(26, 66),
      O = n.range(26, 66),
      H = C ? n.range(90, 250) : n.range(60, 330);
    n() < 0.08 && (H = n.range(300, 430));
    let F = Math.cos(R) * L,
      P = Math.sin(R) * L,
      z = (Math.floor(n() * 4) * Math.PI) / 2 + n.range(-0.25, 0.25),
      k = n() * 100,
      I = n();
    if (I < 0.34) x(F, Pd, P, A, H, O, z, k);
    else if (I < 0.72) {
      let G = n.range(14, 34);
      (x(F, Pd, P, A * 1.25, G, O * 1.25, z, k + 0.31),
        x(F, Pd + G, P, A * 0.86, H - G, O * 0.86, z, k),
        n() < 0.6 &&
          x(F, Pd + H, P, A * 0.5, n.range(6, 16), O * 0.5, z, k + 0.77));
    } else {
      let G = H * n.range(0.5, 0.68),
        K = H * n.range(0.2, 0.3);
      (x(F, Pd, P, A, G, O, z, k),
        x(F, Pd + G, P, A * 0.74, K, O * 0.74, z, k),
        x(F, Pd + G + K, P, A * 0.5, H - G - K, O * 0.5, z, k));
    }
  }
  for (let _ = p; _ < a; _++)
    h.setMatrixAt(_, new Matrix4().makeScale(0, 0, 0));
  (r.setAttribute("aInfo", new InstancedBufferAttribute(l, 4)),
    (h.frustumCulled = !1),
    (h.matrixAutoUpdate = !1),
    o.add(h));
  let g = new ShaderMaterial({
      fog: !1,
      uniforms: {
        uSun: {
          value: SUN_DIRECTION,
        },
        uCam: {
          value: new Vector3(),
        },
      },
      vertexShader:
        "varying vec3 vW; void main() { vec4 wp = modelMatrix * vec4(position, 1.0); vW = wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp; }",
      fragmentShader: `
      uniform vec3 uSun, uCam; varying vec3 vW;
      ${m9}
      void main() {
        vec2 p = vW.xz;
        vec2 g = abs(fract(p / 95.0) - 0.5);
        float street = smoothstep(0.455, 0.47, max(g.x, g.y));
        float lamps = smoothstep(0.35, 0.5, sin(p.x * 0.28) * sin(p.y * 0.28)) * street;
        float cars = step(0.93, hash21(floor(p / 6.0))) * street;
        vec3 col = vec3(0.022, 0.024, 0.032) + vec3(0.07, 0.05, 0.04) * street;
        col += vec3(2.2, 0.95, 0.3) * lamps * 0.5 + vec3(1.6, 1.4, 1.2) * cars * 0.5;
        float dist = length(p - uCam.xz);
        float az = clamp(dot(normalize(p - uCam.xz + 1e-4), normalize(uSun.xz)) * 0.5 + 0.5, 0.0, 1.0);
        col = mix(col, hazeColor(az) * 0.62, clamp(1.0 - exp(-dist * 0.0024) + 0.30, 0.0, 1.0));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    }),
    b = new Mesh(new PlaneGeometry(6e3, 6e3), g);
  ((b.rotation.x = -Math.PI / 2),
    (b.position.y = Pd),
    (b.frustumCulled = !1),
    o.add(b));
  let v = createCanvas(256),
    y = v.getContext("2d"),
    M = y.createRadialGradient(128, 128, 0, 128, 128, 128);
  (M.addColorStop(0, "rgba(255,240,215,1)"),
    M.addColorStop(0.08, "rgba(255,205,140,0.75)"),
    M.addColorStop(0.3, "rgba(255,140,60,0.22)"),
    M.addColorStop(1, "rgba(255,90,20,0)"),
    (y.fillStyle = M),
    y.fillRect(0, 0, 256, 256),
    (y.globalCompositeOperation = "lighter"),
    (M = y.createLinearGradient(0, 0, 256, 0)),
    M.addColorStop(0, "rgba(255,150,70,0)"),
    M.addColorStop(0.5, "rgba(255,190,120,0.55)"),
    M.addColorStop(1, "rgba(255,150,70,0)"),
    (y.fillStyle = M),
    y.fillRect(0, 124, 256, 8));
  let w = new CanvasTexture(v);
  w.colorSpace = SRGBColorSpace;
  let T = new SpriteMaterial({
      map: w,
      blending: AdditiveBlending,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      fog: !1,
      color: new Color(2.2, 1.6, 1.1),
    }),
    S = new Sprite(T);
  ((S.renderOrder = 50), (S.frustumCulled = !1), o.add(S));
  let E = 0;
  return (
    (t.sunDir = SUN_DIRECTION),
    (t.flare = S),
    (t.update = (_, R, C) => {
      ((e.uniforms.uTime.value += R),
        (c.uniforms.uTime.value += R),
        c.uniforms.uCam.value.copy(_.position),
        g.uniforms.uCam.value.copy(_.position),
        s.matrix.makeTranslation(_.position.x, _.position.y, _.position.z),
        (s.matrixWorldNeedsUpdate = !0),
        (E = damp(E, C, 14, R)),
        S.position.copy(_.position).addScaledVector(SUN_DIRECTION, 900));
      let L = 340 * (0.55 + 0.45 * E);
      (S.scale.set(L * 1.6, L, 1),
        (T.opacity = E * 0.3),
        (S.visible = E > 0.01));
    }),
    t
  );
}

export { SUN_DIRECTION, createSky, pb };

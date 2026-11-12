// render/effects/particles.js: recovered from the verified GOLDEN HOUR release.
import {
  AddEquation,
  Color,
  CustomBlending,
  DataTexture,
  DoubleSide,
  DynamicDrawUsage,
  InstancedBufferGeometry,
  InstancedInterleavedBuffer,
  InterleavedBufferAttribute,
  Matrix4,
  Mesh,
  OneFactor,
  OneMinusSrcAlphaFactor,
  PlaneGeometry,
  ShaderMaterial,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";

var bg = `
  float unpackD(vec4 v) { return dot(v, vec4(0.99609375, 0.0038909912109375, 0.0000151991844177, 0.000000059604645)); }`;
var DL = `
  float ign(vec2 p) { return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }`;
var b9 =
  "varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }";
var au = 48;
var GM = 20;
var As = {
  MISC: 0,
  SMOKE: 1,
  DUST: 2,
  SPARK: 3,
  CHIP: 4,
  FLASH: 5,
  AMBIENT: 6,
  FIRE: 7,
};
var VY = `
  attribute vec4 iPos, iAxis, iCol, iTex, iMat;
  uniform vec4 uBook[6]; uniform float uBookFrames[6]; uniform float uBookLoop[6];
  uniform vec3 uSunDir, uSunCol, uAmbIn, uAmbOut;
  uniform vec4 uIndoor; uniform float uIndoorTop;
  uniform sampler2D tShadow; uniform mat4 uShadowMat; uniform float uShadowOn;
  uniform vec4 uLightPos[3]; uniform vec3 uLightCol[3];
  varying vec2 vUvA, vUvB; varying float vBlend; varying vec4 vCol; varying vec4 vMat;
  varying vec3 vLdir, vSun, vAmb; varying float vViewZ, vNear, vErode;
  varying vec3 vWorld; varying vec2 vQuad, vUp2;

  ${bg}
  float sunVis(vec3 wp) {
    vec4 sc = uShadowMat * vec4(wp, 1.0);
    if (sc.x < 0.002 || sc.x > 0.998 || sc.y < 0.002 || sc.y > 0.998 || sc.z > 1.0) return 1.0;
    return step(sc.z - 0.0015, unpackD(texture2D(tShadow, sc.xy)));
  }
  void main() {
    float mode = iTex.z, size = iPos.w, flip = iTex.w < 0.0 ? -1.0 : 1.0, asp = abs(iTex.w);
    vec3 center = iPos.xyz;
    vec4 mv = viewMatrix * vec4(center, 1.0);
    vec2 c = position.xy;
    vec2 ax = vec2(1.0, 0.0), ay = vec2(0.0, 1.0);
    vec3 vp;
    if (mode < 0.5) {
      float cs = cos(iAxis.x), sn = sin(iAxis.x);
      ax = vec2(cs, sn); ay = vec2(-sn, cs);
      vp = mv.xyz + vec3((ax * c.x * asp * flip + ay * c.y) * size, 0.0);
    } else if (mode < 1.5) {
      vec3 tailV = (viewMatrix * vec4(center - iAxis.xyz, 1.0)).xyz;
      vec2 d = mv.xy - tailV.xy; float len = length(d);
      vec2 dir = len > 1e-5 ? d / len : vec2(1.0, 0.0);
      float L = len + size;
      vp = vec3((tailV.xy + mv.xy) * 0.5 + dir * c.x * L + vec2(-dir.y, dir.x) * c.y * size, mix(tailV.z, mv.z, c.x + 0.5));
      ax = dir; ay = vec2(-dir.y, dir.x);
    } else if (mode < 2.5) {
      vec3 tipV = (viewMatrix * vec4(center + iAxis.xyz, 1.0)).xyz;
      vec2 d = tipV.xy - mv.xy; float len = length(d), full = length(iAxis.xyz);
      vec2 dir = len > 1e-5 ? d / len : vec2(0.0, 1.0);
      float L = max(len, full * 0.5);
      vec2 base = mv.xy - dir * (L - len) * 0.5;
      vp = vec3(base + dir * (c.y + 0.5) * L + vec2(dir.y, -dir.x) * c.x * size * flip, mix(mv.z, tipV.z, c.y + 0.5));
      ay = dir; ax = vec2(dir.y, -dir.x);
    } else {
      vec3 n = normalize(iAxis.xyz);
      vec3 t = normalize(abs(n.y) > 0.9 ? cross(n, vec3(1.0, 0.0, 0.0)) : cross(n, vec3(0.0, 1.0, 0.0)));
      vec3 b = cross(n, t);
      float cs = cos(iAxis.w), sn = sin(iAxis.w);
      vec3 wq = center + ((t * cs + b * sn) * c.x + (b * cs - t * sn) * c.y) * size;
      vp = (viewMatrix * vec4(wq, 1.0)).xyz;
    }
    gl_Position = projectionMatrix * vec4(vp, 1.0);
    vViewZ = -vp.z;
    vNear = iMat.w < 0.0 ? 1.0 : clamp((vViewZ - 0.12) / 0.55, 0.0, 1.0);
    vQuad = c * 2.0;

    int bi = int(iTex.x + 0.5);
    vec4 bk = uBook[bi];
    float fr = uBookFrames[bi];
    float f0 = floor(iTex.y); vBlend = iTex.y - f0;
    float f1 = f0 + 1.0;
    if (f1 > fr - 0.5) f1 = uBookLoop[bi] > 0.5 ? 0.0 : f0;
    vec2 q = uv * 0.992 + 0.004;
    vUvA = bk.xy + (vec2(mod(f0, bk.z), floor(f0 / bk.z)) + q) * bk.w;
    vUvB = bk.xy + (vec2(mod(f1, bk.z), floor(f1 / bk.z)) + q) * bk.w;

    vErode = floor(iCol.a) * 0.01; vCol = vec4(iCol.rgb, fract(iCol.a)); vMat = vec4(iMat.xyz, max(abs(iMat.w), 1e-3)); vUp2 = vec2(0.0, 1.0);
    vec3 wp = cameraPosition + (vec4(vp, 0.0) * viewMatrix).xyz;      // = inverse view rotation * vp
    vWorld = wp;
    vSun = vec3(0.0); vAmb = vec3(1.0); vLdir = vec3(0.0, 0.0, 1.0);
    if (iMat.y > 0.0) {
      vec3 Lv = mat3(viewMatrix) * uSunDir;
      vLdir = vec3(dot(Lv.xy, ax) * flip, dot(Lv.xy, ay), Lv.z);
      vec3 Uv = mat3(viewMatrix) * vec3(0.0, 1.0, 0.0);
      vUp2 = vec2(dot(Uv.xy, ax) * flip, dot(Uv.xy, ay));
      float sh = uShadowOn > 0.5 ? 0.5 * (sunVis(mix(center, wp, 0.75)) + sunVis(center)) : 1.0;
      float inside = step(uIndoor.x, wp.x) * step(wp.x, uIndoor.z) * step(uIndoor.y, wp.z) * step(wp.z, uIndoor.w) * step(wp.y, uIndoorTop);
      vAmb = mix(uAmbOut, uAmbIn, inside);
      vSun = uSunCol * sh;
      for (int i = 0; i < 3; i++) {
        vec3 d = uLightPos[i].xyz - wp; float d2 = dot(d, d), rr = uLightPos[i].w * uLightPos[i].w;
        float w = clamp(1.0 - d2 * d2 / (rr * rr), 0.0, 1.0);
        vAmb += min(uLightCol[i] * (w * w / max(d2, 1.0)) * 0.1, vec3(2.2));
      }
    }
  }`;
var GY = `
  precision highp float;
  uniform sampler2D tAtlas, tDepth;
  uniform vec2 uInvRes, uDepthMode; uniform float uNear, uFar;
  varying vec2 vUvA, vUvB; varying float vBlend; varying vec4 vCol; varying vec4 vMat;
  varying vec3 vLdir, vSun, vAmb; varying float vViewZ, vNear, vErode; varying vec2 vUp2;
  vec3 fireRamp(float h) {
    return vec3(1.0, 0.24, 0.03) * smoothstep(0.02, 0.5, h) * 1.6 + vec3(1.0, 0.55, 0.14) * smoothstep(0.28, 0.85, h) * 6.0 + vec3(1.0, 0.86, 0.62) * smoothstep(0.7, 1.35, h) * 16.0;
  }
  void main() {
    vec4 t = mix(texture2D(tAtlas, vUvA), texture2D(tAtlas, vUvB), vBlend);
    // erosion: the puff thins out from its edges and breaks into wisps instead of fading as a flat disc
    float ta = vErode > 0.0 ? clamp((t.a - vErode) / (1.0 - vErode * 0.8), 0.0, 1.0) : t.a;
    float a = ta * vCol.a * vNear;
    if (uDepthMode.x + uDepthMode.y > 0.0) {
      float d = texture2D(tDepth, gl_FragCoord.xy * uInvRes).x;
      float diff = uNear * uFar / (uFar - d * (uFar - uNear)) - vViewZ;
      if (uDepthMode.y > 0.5 && diff < 0.0) discard;
      if (uDepthMode.x > 0.5) a *= clamp(diff / vMat.w, 0.0, 1.0);
    }
    if (a < 0.0015) discard;
    float fireK = step(0.001, vMat.z);
    vec2 Ld = (t.rg - 0.5) * 1.3333;
    float L0 = mix(t.b, 0.75, fireK);
    float dirT = max(0.0, 0.5 + 1.45 * dot(Ld, vLdir.xy)) * (0.35 + 0.65 * L0);
    float thin = 1.0 - ta;
    float back = max(-vLdir.z, 0.0) * thin * thin * 1.4 + max(vLdir.z, 0.0) * 0.25;
    float hemi = clamp(0.62 + 0.8 * dot(Ld, vUp2), 0.15, 1.6);       // sky / ceiling light from above
    vec3 light = vAmb * hemi * (0.3 + 0.9 * L0) + vSun * (dirT + back);
    vec3 col = vCol.rgb * mix(vec3(1.0), light, vMat.y);
    col += fireRamp(t.b * vMat.z) * fireK;
    gl_FragColor = vec4(col * a, a * (1.0 - vMat.x));
  }`;
var WY = `
  precision highp float; precision highp sampler3D;
  uniform sampler2D tDepth; uniform sampler3D tNoise;
  uniform vec2 uInvRes, uDepthMode; uniform float uNear, uFar, uTime;
  varying vec4 vCol; varying vec4 vMat; varying float vViewZ, vNear; varying vec3 vWorld; varying vec2 vQuad;
  varying vec2 vUvA; varying float vBlend;
  void main() {
    float a = vCol.a * vNear;
    if (uDepthMode.y > 0.5) {
      float d = texture2D(tDepth, gl_FragCoord.xy * uInvRes).x;
      float diff = uNear * uFar / (uFar - d * (uFar - uNear)) - vViewZ;
      if (diff < 0.0) discard;
      a *= clamp(diff / vMat.w, 0.0, 1.0);
    }
    float r = length(vQuad);
    vec2 off;
    if (vCol.r > 0.5) {
      float w = smoothstep(0.62, 0.86, r) * smoothstep(1.0, 0.9, r);
      off = normalize(vQuad + 1e-5) * (w * a) * clamp(6.0 / vViewZ, 0.15, 1.6);
    } else {
      vec3 q = vec3(vWorld.x * 0.9 + vWorld.z * 0.35, vWorld.y * 0.9 - uTime * 0.55, vWorld.z * 0.9 + uTime * 0.07);
      vec4 n = texture(tNoise, q) + 0.5 * texture(tNoise, q * 2.3 + 0.37);
      off = (vec2(n.r, n.a) - 0.75) * (a * smoothstep(1.0, 0.25, r)) * clamp(5.0 / vViewZ, 0.2, 1.6);
    }
    gl_FragColor = vec4(off * vCol.g, 0.0, 1.0);
  }`;
var mb = class {
  constructor(t, e, s = {}) {
    ((this.max = t),
      (this.n = 0),
      (this.d = new Float32Array(t * au)),
      (this.cls = new Uint8Array(t)),
      (this.clsCount = new Int32Array(8)),
      (this.clsMax = new Int32Array([900, 700, 700, 1100, 900, 260, 400, 500])),
      (this.distort = !!s.distort),
      (this.frames = s.frames || [64, 64, 32, 32, 32, 8]),
      (this.loops = s.loops || [0, 0, 0, 1, 0, 0]),
      (this.keys = new Uint16Array(t)),
      (this.idxA = new Uint16Array(t)),
      (this.idxB = new Uint16Array(t)),
      (this.count = new Uint32Array(256)),
      (this.wind = new Vector3(0, 0, 0)),
      (this.drawn = 0));
    let n = new PlaneGeometry(1, 1),
      i = (this.geo = new InstancedBufferGeometry());
    ((i.index = n.index),
      i.setAttribute("position", n.attributes.position),
      i.setAttribute("uv", n.attributes.uv));
    let a = (this.ib = new InstancedInterleavedBuffer(
      new Float32Array(t * GM),
      GM,
      1,
    ));
    (a.setUsage(DynamicDrawUsage),
      (this.gpu = a.array),
      i.setAttribute("iPos", new InterleavedBufferAttribute(a, 4, 0)),
      i.setAttribute("iAxis", new InterleavedBufferAttribute(a, 4, 4)),
      i.setAttribute("iCol", new InterleavedBufferAttribute(a, 4, 8)),
      i.setAttribute("iTex", new InterleavedBufferAttribute(a, 4, 12)),
      i.setAttribute("iMat", new InterleavedBufferAttribute(a, 4, 16)),
      (i.instanceCount = 0));
    let r = new DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
    ((r.needsUpdate = !0), (this.dummy = r));
    let l = (this.uniforms = {
        tAtlas: {
          value: e.texture,
        },
        tDepth: {
          value: r,
        },
        tShadow: {
          value: r,
        },
        tNoise: {
          value: e.noise,
        },
        uBook: {
          value: e.bookUniform,
        },
        uBookFrames: {
          value: s.frames,
        },
        uBookLoop: {
          value: s.loops,
        },
        uInvRes: {
          value: new Vector2(1, 1),
        },
        uDepthMode: {
          value: new Vector2(0, 0),
        },
        uNear: {
          value: 0.06,
        },
        uFar: {
          value: 2500,
        },
        uTime: {
          value: 0,
        },
        uSunDir: {
          value: new Vector3(-0.4, 0.285, 0.87).normalize(),
        },
        uSunCol: {
          value: new Color(2.6, 0.95, 0.28),
        },
        uAmbIn: {
          value: new Color(0.29, 0.245, 0.2),
        },
        uAmbOut: {
          value: new Color(0.32, 0.36, 0.42),
        },
        uIndoor: {
          value: new Vector4(-28, -20, 28, 10),
        },
        uIndoorTop: {
          value: 8.2,
        },
        uShadowMat: {
          value: new Matrix4(),
        },
        uShadowOn: {
          value: 0,
        },
        uLightPos: {
          value: [
            new Vector4(0, -99, 0, 1),
            new Vector4(0, -99, 0, 1),
            new Vector4(0, -99, 0, 1),
          ],
        },
        uLightCol: {
          value: [new Color(0, 0, 0), new Color(0, 0, 0), new Color(0, 0, 0)],
        },
      }),
      c = (this.material = new ShaderMaterial({
        uniforms: l,
        vertexShader: VY,
        fragmentShader: this.distort ? WY : GY,
        transparent: !0,
        depthWrite: !1,
        depthTest: !0,
        fog: !1,
        side: DoubleSide,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: this.distort ? OneFactor : OneMinusSrcAlphaFactor,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: this.distort ? OneFactor : OneMinusSrcAlphaFactor,
      }));
    ((this.mesh = new Mesh(i, c)),
      (this.mesh.frustumCulled = !1),
      (this.mesh.renderOrder = 30),
      (this.mesh.matrixAutoUpdate = !1),
      (this.S = {}),
      this.begin());
  }
  begin() {
    let t = this.S;
    return (
      (t.x = 0),
      (t.y = 0),
      (t.z = 0),
      (t.vx = 0),
      (t.vy = 0),
      (t.vz = 0),
      (t.life = 1),
      (t.s0 = 0.1),
      (t.s1 = -1),
      (t.sk = 2),
      (t.rot = NaN),
      (t.rv = 0),
      (t.r = 1),
      (t.g = 1),
      (t.b = 1),
      (t.r1 = -1),
      (t.g1 = 0),
      (t.b1 = 0),
      (t.a = 1),
      (t.fin = 0),
      (t.fout = 0.4),
      (t.book = 4),
      (t.f0 = 0),
      (t.f1 = -1),
      (t.grav = 0),
      (t.drag = 0),
      (t.turb = 0),
      (t.floor = -1e9),
      (t.bounce = 0.35),
      (t.mode = 0),
      (t.stretch = 0),
      (t.ax = 0),
      (t.ay = 0),
      (t.az = 0),
      (t.add = 0),
      (t.lit = 0),
      (t.heat = 0),
      (t.heat1 = -1),
      (t.soft = 0.2),
      (t.aspect = 1),
      (t.wind = 0),
      (t.cls = 0),
      (t.prio = 1),
      (t.delay = 0),
      (t.ero = 0),
      (t.ero0 = 0),
      (t.fk = 1),
      (t.bias = 0),
      t
    );
  }
  emit() {
    let t = this.S,
      e = this.n;
    if (e >= this.max || this.clsCount[t.cls] >= this.clsMax[t.cls]) {
      if (t.prio < 2) return -1;
      if (e >= this.max) {
        let i = 0,
          a = -1;
        for (let r = 0; r < 6; r++) {
          let l = (Math.random() * this.max) | 0,
            c = l * au,
            h = this.d[c + 6] / this.d[c + 7];
          h > a && ((a = h), (i = l));
        }
        ((e = i), this.clsCount[this.cls[e]]--);
      } else this.n++;
    } else this.n++;
    let s = this.d,
      n = e * au;
    return (
      (s[n] = t.x),
      (s[n + 1] = t.y),
      (s[n + 2] = t.z),
      (s[n + 3] = t.vx),
      (s[n + 4] = t.vy),
      (s[n + 5] = t.vz),
      (s[n + 6] = -t.delay),
      (s[n + 7] = t.life),
      (s[n + 8] = t.s0),
      (s[n + 9] = t.s1 < 0 ? t.s0 : t.s1),
      (s[n + 10] = t.sk),
      (s[n + 11] = t.rot !== t.rot ? Math.random() * 6.2832 : t.rot),
      (s[n + 12] = t.rv),
      (s[n + 13] = t.r),
      (s[n + 14] = t.g),
      (s[n + 15] = t.b),
      t.r1 < 0
        ? ((s[n + 16] = t.r), (s[n + 17] = t.g), (s[n + 18] = t.b))
        : ((s[n + 16] = t.r1), (s[n + 17] = t.g1), (s[n + 18] = t.b1)),
      (s[n + 19] = t.a),
      (s[n + 20] = t.fin),
      (s[n + 21] = t.fout),
      (s[n + 22] = t.book),
      (s[n + 23] = t.f0),
      (s[n + 24] = t.f1),
      (s[n + 25] = t.grav),
      (s[n + 26] = t.drag),
      (s[n + 27] = t.turb),
      (s[n + 28] = t.floor),
      (s[n + 29] = t.bounce),
      (s[n + 30] = t.mode),
      (s[n + 31] = t.stretch),
      (s[n + 32] = t.add),
      (s[n + 33] = t.lit),
      (s[n + 34] = t.heat),
      (s[n + 35] = t.soft),
      (s[n + 36] = t.ax),
      (s[n + 37] = t.ay),
      (s[n + 38] = t.az),
      (s[n + 39] = Math.random() * 100),
      (s[n + 40] = t.aspect),
      (s[n + 41] = t.heat1 < 0 ? t.heat : t.heat1),
      (s[n + 42] = t.wind),
      (s[n + 43] = 0),
      (s[n + 44] = t.ero),
      (s[n + 45] = t.ero0),
      (s[n + 46] = t.fk),
      (s[n + 47] = t.bias),
      (this.cls[e] = t.cls),
      this.clsCount[t.cls]++,
      e
    );
  }
  push(t, e, s, n, i) {
    let a = this.d,
      r = n * n;
    for (let l = 0, c = this.n; l < c; l++) {
      let h = l * au,
        f = a[h] - t,
        u = a[h + 1] - e,
        d = a[h + 2] - s,
        m = f * f + u * u + d * d;
      if (m > r || a[h + 26] < 0.5) continue;
      let p = Math.sqrt(m) + 0.15,
        x = (i * (1 - p / (n + 0.15))) / p;
      ((a[h + 3] += f * x), (a[h + 4] += u * x * 0.6), (a[h + 5] += d * x));
    }
  }
  clear() {
    ((this.n = 0), this.clsCount.fill(0), (this.geo.instanceCount = 0));
  }
  update(t, e, s) {
    let n = this.d,
      i = this.cls,
      a = this.keys,
      r = this.idxA,
      l = s.matrixWorld.elements,
      c = l[12],
      h = l[13],
      f = l[14],
      u = -l[8],
      d = -l[9],
      m = -l[10],
      p = this.wind.x,
      x = this.wind.z,
      g = this.n;
    for (let T = 0; T < g;) {
      let S = T * au,
        E = n[S + 6];
      if (E < 0) {
        ((E += t), (n[S + 6] = E > 0 ? 0 : E), (a[T] = 0), T++);
        continue;
      }
      if (((E += t), E >= n[S + 7])) {
        (this.clsCount[i[T]]--,
          g--,
          T !== g && (n.copyWithin(S, g * au, g * au + au), (i[T] = i[g])));
        continue;
      }
      if (((n[S + 6] = E), t > 0)) {
        let R = n[S + 26],
          C = n[S + 3],
          L = n[S + 4],
          A = n[S + 5];
        if (R > 0) {
          let P = 1 / (1 + R * t);
          ((C *= P), (L *= P), (A *= P));
        }
        L -= n[S + 25] * t;
        let O = n[S + 27];
        if (O > 0) {
          let P = n[S + 39] + e * 1.9,
            z = n[S],
            k = n[S + 1],
            I = n[S + 2];
          ((C += O * t * Math.sin(k * 2.3 + P + I * 1.1)),
            (A += O * t * Math.cos(z * 2.1 + P * 1.3 + k * 0.9)),
            (L += O * t * 0.45 * Math.sin(I * 2.7 + z * 1.3 + P * 0.7)));
        }
        let H = n[S + 42];
        if (H > 0) {
          let P = Math.min(1, H * t);
          ((C += (p - C) * P), (A += (x - A) * P));
        }
        ((n[S] += C * t), (n[S + 1] += L * t), (n[S + 2] += A * t));
        let F = n[S + 28];
        if (n[S + 1] < F) {
          n[S + 1] = F;
          let P = n[S + 29];
          L < -0.9 && P > 0
            ? ((L = -L * P), (C *= 0.62), (A *= 0.62), (n[S + 12] *= 0.5))
            : ((L = 0),
              (C *= 1 - Math.min(1, 9 * t)),
              (A *= 1 - Math.min(1, 9 * t)),
              (n[S + 12] *= 1 - Math.min(1, 12 * t)),
              (n[S + 43] = 1));
        }
        ((n[S + 3] = C),
          (n[S + 4] = L),
          (n[S + 5] = A),
          (n[S + 11] += n[S + 12] * t));
      }
      let _ =
        (n[S] - c) * u + (n[S + 1] - h) * d + (n[S + 2] - f) * m - n[S + 47];
      ((a[T] =
        _ <= 0 ? 0 : _ >= 160 ? 65535 : (Math.sqrt(_ * 0.00625) * 65535) | 0),
        T++);
    }
    if (((this.n = g), !g)) {
      ((this.geo.instanceCount = 0), (this.drawn = 0));
      return;
    }
    let b = this.idxB,
      v = this.count;
    v.fill(0);
    for (let T = 0; T < g; T++) v[a[T] & 255]++;
    for (let T = 254, S = v[255]; T >= 0; T--) {
      let E = v[T];
      ((v[T] = S), (S += E));
    }
    v[255] = 0;
    for (let T = 0; T < g; T++) b[v[a[T] & 255]++] = T;
    v.fill(0);
    for (let T = 0; T < g; T++) v[a[T] >> 8]++;
    for (let T = 254, S = v[255]; T >= 0; T--) {
      let E = v[T];
      ((v[T] = S), (S += E));
    }
    v[255] = 0;
    for (let T = 0; T < g; T++) {
      let S = b[T];
      r[v[a[S] >> 8]++] = S;
    }
    let y = this.gpu,
      M = 0;
    for (let T = 0; T < g; T++) {
      let S = r[T],
        E = S * au,
        _ = n[E + 6];
      if (_ < 0) continue;
      let R = _ / n[E + 7],
        C = n[E + 10],
        L = 1 - R,
        A =
          C === 1
            ? R
            : C === 2
              ? 1 - L * L
              : C === 3
                ? 1 - L * L * L
                : 1 - Math.pow(L, C),
        O = n[E + 8] + (n[E + 9] - n[E + 8]) * A,
        H = n[E + 19],
        F = n[E + 20],
        P = n[E + 21];
      if ((R < F && (H *= R / F), R > P)) {
        let e0 = (1 - R) / (1 - P);
        H *= e0 * e0 * (3 - 2 * e0);
      }
      let z = n[E + 30];
      if (
        ((y[M] = n[E]),
        (y[M + 1] = n[E + 1]),
        (y[M + 2] = n[E + 2]),
        (y[M + 3] = O),
        z === 0)
      )
        ((y[M + 4] = n[E + 11]),
          (y[M + 5] = 0),
          (y[M + 6] = 0),
          (y[M + 7] = 0));
      else if (z === 1) {
        let e0 = n[E + 31];
        (e0 > 0
          ? ((y[M + 4] = n[E + 3] * e0),
            (y[M + 5] = n[E + 4] * e0),
            (y[M + 6] = n[E + 5] * e0))
          : ((y[M + 4] = n[E + 36]),
            (y[M + 5] = n[E + 37]),
            (y[M + 6] = n[E + 38])),
          (y[M + 7] = 0));
      } else if (z === 2) {
        let e0 = O * n[E + 31];
        ((y[M + 4] = n[E + 36] * e0),
          (y[M + 5] = n[E + 37] * e0),
          (y[M + 6] = n[E + 38] * e0),
          (y[M + 7] = 0));
      } else
        ((y[M + 4] = n[E + 36]),
          (y[M + 5] = n[E + 37]),
          (y[M + 6] = n[E + 38]),
          (y[M + 7] = n[E + 11]));
      ((y[M + 8] = n[E + 13] + (n[E + 16] - n[E + 13]) * R),
        (y[M + 9] = n[E + 14] + (n[E + 17] - n[E + 14]) * R),
        (y[M + 10] = n[E + 15] + (n[E + 18] - n[E + 15]) * R));
      let k = n[E + 44];
      y[M + 11] =
        (H > 0.999 ? 0.999 : H < 0 ? 0 : H) +
        (k > 0 ? Math.floor((n[E + 45] + (k - n[E + 45]) * R * R) * 95) : 0);
      let I = n[E + 24],
        G = n[E + 22] | 0,
        K = this.frames[G],
        $ = n[E + 46],
        n0 =
          I < 0
            ? n[E + 23]
            : n[E + 23] + (I - n[E + 23]) * ($ === 1 ? R : 1 - Math.pow(L, $));
      (this.loops[G] ? (n0 %= K) : n0 > K - 1 && (n0 = K - 1),
        (y[M + 12] = G),
        (y[M + 13] = n0),
        (y[M + 14] = z),
        (y[M + 15] = n[E + 40]),
        (y[M + 16] = n[E + 32]),
        (y[M + 17] = n[E + 33]),
        (y[M + 18] = n[E + 34] + (n[E + 41] - n[E + 34]) * R),
        (y[M + 19] = n[E + 35]),
        (M += GM));
    }
    let w = M / GM;
    ((this.drawn = w),
      (this.geo.instanceCount = w),
      w &&
        (this.ib.clearUpdateRanges(),
        this.ib.addUpdateRange(0, M),
        (this.ib.needsUpdate = !0)));
  }
};

export { As, DL, b9, bg, mb };

// render/lighting-volume.js: recovered from the verified GOLDEN HOUR release.
import {
  ClampToEdgeWrapping,
  Data3DTexture,
  DataUtils,
  HalfFloatType,
  LinearFilter,
  Material,
  Matrix4,
  NoColorSpace,
  RGBAFormat,
  Vector3,
  Vector4,
} from "../vendor/three-r180.js";

var FM = new Data3DTexture(new Uint16Array(4 * 2), 1, 2, 1);
FM.format = RGBAFormat;
FM.type = HalfFloatType;
FM.needsUpdate = !0;
var Ir = {
  ghLV: {
    value: FM,
  },
  ghLVMat: {
    value: new Matrix4(),
  },
  ghLVOrg: {
    value: new Vector3(0, 0, 0),
  },
  ghLVInv: {
    value: new Vector3(1, 1, 1),
  },
  ghLVK: {
    value: new Vector4(0, 0, 0, 0),
  },
  ghLVT: {
    value: new Vector4(0, 0, 0, 0),
  },
  ghPool: {
    value: new Vector4(0, 17.5, 7, 3),
  },
  ghChand: {
    value: new Vector4(0, 5.6, 3.2, 0),
  },
};
var TY = `
uniform highp sampler3D ghLV; uniform mat4 ghLVMat; uniform vec3 ghLVOrg, ghLVInv; uniform vec4 ghLVK, ghLVT, ghPool, ghChand;
float ghLvHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 ghLightVolume(vec3 viewPos, vec3 viewN) {
  vec3 pw = (ghLVMat * vec4((vec4(viewPos, 0.0) * viewMatrix).xyz + cameraPosition, 1.0)).xyz;
  vec3 nw = normalize(mat3(ghLVMat) * (vec4(viewN, 0.0) * viewMatrix).xyz);
  vec3 q = clamp((pw + nw * 0.42 - ghLVOrg) * ghLVInv, 0.0, 1.0);
  float v = clamp(q.y, ghLVK.y, 1.0 - ghLVK.y) * 0.5;
  vec3 above = texture(ghLV, vec3(q.x, v, q.z)).rgb, below = texture(ghLV, vec3(q.x, v + 0.5, q.z)).rgb;
  vec3 e = mix(below, above, nw.y * 0.5 + 0.5) * ghLVK.x;
  // water caustics: on the pool shell under water, and thrown up onto whatever stands around the pool
  vec2 pd = max(abs(pw.xz - ghPool.xy) - ghPool.zw, 0.0);
  float nearPool = (1.0 - smoothstep(0.0, 4.2, length(pd))) * (1.0 - smoothstep(0.3, 3.6, pw.y)) * ghLVK.z;
  if (nearPool > 0.002) {
    float t = ghLVT.x; vec2 p = pw.xz * 1.5 + vec2(pw.y * 0.8, pw.y * 0.45);
    vec2 a = p + 0.7 * vec2(sin(p.y * 1.3 + t), cos(p.x * 1.1 - t * 0.8));
    vec2 b = p * 1.37 - 0.6 * vec2(cos(p.y * 0.9 - t * 1.2), sin(p.x * 1.5 + t * 0.7));
    float c = pow(0.5 + 0.5 * sin(a.x * 2.1) * sin(a.y * 2.3), 6.0) + pow(0.5 + 0.5 * sin(b.x * 2.4 + 1.0) * sin(b.y * 2.0), 6.0);
    float under = 1.0 - step(-0.12, pw.y);
    e += vec3(0.16, 0.62, 0.6) * c * nearPool * mix(0.55 * (1.0 - 0.6 * max(nw.y, 0.0)), 1.6, under);
  }
  // chandelier sparkle: slow constellation of warm glints the crystals throw across the atrium
  vec3 cd = pw - ghChand.xyz; float cl = length(cd);
  float nearCh = (1.0 - smoothstep(4.0, 11.0, cl)) * ghLVK.w;
  if (nearCh > 0.002) {
    vec3 dn = cd / max(cl, 1e-3);
    vec2 sp = vec2(atan(dn.z, dn.x) * 5.0 + ghLVT.x * 0.02, dn.y * 11.0);
    vec2 cell = floor(sp), f = fract(sp); float h = ghLvHash(cell);
    float g = smoothstep(0.13, 0.0, length(f - 0.3 - 0.4 * vec2(h, fract(h * 7.31)))) * step(0.5, fract(h * 13.7));
    e += vec3(1.0, 0.8, 0.52) * g * nearCh * (0.5 + 0.5 * sin(ghLVT.x * (0.7 + h) + h * 40.0)) * 0.55;
  }
  return e;
}
`;
function r9(o) {
  let t = o.fragmentShader;
  if (!(
    !t ||
    t.indexOf("#include <lights_fragment_begin>") < 0 ||
    t.indexOf("ghLightVolume") >= 0 ||
    t.indexOf("vViewPosition") < 0 ||
    t.indexOf("void main() {") < 0
  )) {
    for (let e in Ir) o.uniforms[e] = Ir[e];
    o.fragmentShader = t
      .replace(
        "void main() {",
        TY +
          `
void main() {`,
      )
      .replace(
        "#include <lights_fragment_begin>",
        `#include <lights_fragment_begin>
      #if defined( RE_IndirectDiffuse )
        irradiance += ghLightVolume(-vViewPosition, normal);
      #endif`,
      );
  }
}
var RL = !1;
function SY() {
  if (RL) return;
  RL = !0;
  let o = Material.prototype,
    t = {
      configurable: !0,
      enumerable: !1,
      get() {
        let e = this._ghUser;
        if (!e) return r9;
        if (!this._ghWrap || this._ghWrap._ghUser !== e) {
          let s = function (n, i) {
            (e.call(this, n, i), r9(n));
          };
          ((s._ghUser = e), (this._ghWrap = s));
        }
        return this._ghWrap;
      },
      set(e) {
        ((this._ghUser = e && e._ghUser ? e._ghUser : e === r9 ? null : e),
          this._ghUser &&
            !Object.prototype.hasOwnProperty.call(this, "onBeforeCompile") &&
            Object.defineProperty(this, "onBeforeCompile", t));
      },
    };
  (Object.defineProperty(o, "onBeforeCompile", t),
    (o.customProgramCacheKey = function () {
      return (this._ghUser ? this._ghUser.toString() : "") + "|ghLV";
    }));
}
SY();
var xg = DataUtils.toHalfFloat;
var LightingVolume = class {
  constructor({ x0: t, y0: e, z0: s, nx: n, ny: i, nz: a, s: r = 1 }) {
    (Object.assign(this, {
      x0: t,
      y0: e,
      z0: s,
      nx: n,
      ny: i,
      nz: a,
      s: r,
    }),
      (this.n = n * i * a),
      (this.A = new Float32Array(this.n * 3)),
      (this.B = new Float32Array(this.n * 3)),
      (this.valid = new Uint8Array(this.n).fill(1)),
      (this.half = new Uint16Array(n * i * 2 * a * 4)));
    let l = (this.texture = new Data3DTexture(this.half, n, i * 2, a));
    ((l.format = RGBAFormat),
      (l.type = HalfFloatType),
      (l.minFilter = l.magFilter = LinearFilter),
      (l.wrapS = l.wrapT = l.wrapR = ClampToEdgeWrapping),
      (l.unpackAlignment = 1),
      (l.colorSpace = NoColorSpace),
      (this.sources = []),
      (this.dirty = !1),
      (this.boxes = new Float32Array(0)),
      (this.nb = 0),
      (this._cand = new Int32Array(4096)));
  }
  idx(t, e, s) {
    return (s * this.ny + e) * this.nx + t;
  }
  setOccluders(t) {
    let e = [];
    for (let s of t) {
      if (s.off || s.noRay || s.pane || s.water) continue;
      let n = s.x1 - s.x0,
        i = s.y1 - s.y0,
        a = s.z1 - s.z0;
      Math.max(n, i, a) < 1.2 ||
        n * i + i * a + n * a < 1.6 ||
        e.push(s.x0, s.y0, s.z0, s.x1, s.y1, s.z1);
    }
    ((this.boxes = new Float32Array(e)), (this.nb = e.length / 6));
  }
  gather(t, e, s, n, i, a) {
    let r = this.boxes,
      l = 0;
    this._cand.length < this.nb && (this._cand = new Int32Array(this.nb));
    for (let c = 0, h = 0; c < this.nb; c++, h += 6)
      r[h] < n &&
        r[h + 3] > t &&
        r[h + 1] < i &&
        r[h + 4] > e &&
        r[h + 2] < a &&
        r[h + 5] > s &&
        (this._cand[l++] = h);
    return l;
  }
  blocked(t, e, s, n, i, a, r) {
    let l = this.boxes,
      c = this._cand,
      h = n - t,
      f = i - e,
      u = a - s,
      d = 1 / (Math.abs(h) < 1e-9 ? 1e-9 : h),
      m = 1 / (Math.abs(f) < 1e-9 ? 1e-9 : f),
      p = 1 / (Math.abs(u) < 1e-9 ? 1e-9 : u);
    for (let x = 0; x < r; x++) {
      let g = c[x],
        b = (l[g] - t) * d,
        v = (l[g + 3] - t) * d,
        y = b < v ? b : v,
        M = b < v ? v : b;
      ((b = (l[g + 1] - e) * m), (v = (l[g + 4] - e) * m));
      let w = b < v ? b : v,
        T = b < v ? v : b;
      if (
        (w > y && (y = w),
        T < M && (M = T),
        !(y > M) &&
          ((b = (l[g + 2] - s) * p),
          (v = (l[g + 5] - s) * p),
          (w = b < v ? b : v),
          (T = b < v ? v : b),
          w > y && (y = w),
          T < M && (M = T),
          y <= M && M > 0.02 && y < 0.98))
      )
        return !0;
    }
    return !1;
  }
  markSolid() {
    let t = this.boxes;
    for (let e = 0; e < this.nz; e++)
      for (let s = 0; s < this.ny; s++)
        for (let n = 0; n < this.nx; n++) {
          let i = this.x0 + (n + 0.5) * this.s,
            a = this.y0 + (s + 0.5) * this.s,
            r = this.z0 + (e + 0.5) * this.s;
          for (let l = 0, c = 0; l < this.nb; l++, c += 6)
            if (
              i > t[c] + 0.05 &&
              i < t[c + 3] - 0.05 &&
              a > t[c + 1] + 0.05 &&
              a < t[c + 4] - 0.05 &&
              r > t[c + 2] + 0.05 &&
              r < t[c + 5] - 0.05
            ) {
              this.valid[this.idx(n, s, e)] = 0;
              break;
            }
        }
  }
  addPatch(t, e, s, n, i, a, r, l, c = !1) {
    let h = this.s,
      f = l * l,
      u = Math.max(0, Math.floor((t - l - this.x0) / h)),
      d = Math.min(this.nx - 1, Math.floor((t + l - this.x0) / h)),
      m = Math.max(0, Math.floor((e - l - this.y0) / h)),
      p = Math.min(this.ny - 1, Math.floor((e + l - this.y0) / h)),
      x = Math.max(0, Math.floor((s - l - this.z0) / h)),
      g = Math.min(this.nz - 1, Math.floor((s + l - this.z0) / h));
    if (d < u || p < m || g < x) return -1;
    let b = this.gather(t - l, e - l, s - l, t + l, e + l, s + l),
      v = t + (n ? n.x * 0.08 : 0),
      y = e + (n ? n.y * 0.08 : 0),
      M = s + (n ? n.z * 0.08 : 0),
      w = null,
      T = null,
      S = 0;
    if (c) {
      let _ = (d - u + 1) * (p - m + 1) * (g - x + 1);
      ((w = new Uint32Array(_)), (T = new Float32Array(_ * 2)));
    }
    for (let _ = x; _ <= g; _++)
      for (let R = m; R <= p; R++)
        for (let C = u; C <= d; C++) {
          let L = this.idx(C, R, _);
          if (!this.valid[L]) continue;
          let A = this.x0 + (C + 0.5) * h,
            O = this.y0 + (R + 0.5) * h,
            H = this.z0 + (_ + 0.5) * h,
            F = A - v,
            P = O - y,
            z = H - M,
            k = F * F + P * P + z * z;
          if (k > f) continue;
          let I = Math.sqrt(k) + 1e-4,
            G = 1;
          if (n && ((G = (F * n.x + P * n.y + z * n.z) / I), G <= 0.02))
            continue;
          let K = 1 - k / f,
            $ = (G * K * K) / (k + 0.6);
          if ($ < 1e-4 || (I > 1.3 && this.blocked(v, y, M, A, O, H, b)))
            continue;
          let n0 = P / I,
            e0 = $ * (0.5 + 0.5 * n0),
            p0 = $ - e0;
          if (c) ((w[S] = L), (T[S * 2] = p0), (T[S * 2 + 1] = e0), S++);
          else {
            let t0 = L * 3;
            ((this.A[t0] += i * p0),
              (this.A[t0 + 1] += a * p0),
              (this.A[t0 + 2] += r * p0),
              (this.B[t0] += i * e0),
              (this.B[t0 + 1] += a * e0),
              (this.B[t0 + 2] += r * e0));
          }
        }
    if (!c) return -1;
    this.sources.push({
      k: 0,
      idx: w.slice(0, S),
      w: T.slice(0, S * 2),
      r: i,
      g: a,
      b: r,
    });
    let E = this.sources.length - 1;
    return (this.setSource(E, 1, !0), E);
  }
  setSource(t, e, s = !1) {
    let n = this.sources[t];
    if (!n) return;
    let i = e - n.k;
    if (Math.abs(i) < 0.001) return;
    n.k = e;
    let { idx: a, w: r, r: l, g: c, b: h } = n,
      f = this.A,
      u = this.B;
    for (let d = 0; d < a.length; d++) {
      let m = a[d] * 3,
        p = r[d * 2] * i,
        x = r[d * 2 + 1] * i;
      ((f[m] += l * p),
        (f[m + 1] += c * p),
        (f[m + 2] += h * p),
        (u[m] += l * x),
        (u[m + 1] += c * x),
        (u[m + 2] += h * x),
        s || this._pack(a[d]));
    }
    s || (this.dirty = !0);
  }
  fillSolid() {
    let { nx: t, ny: e, nz: s, A: n, B: i, valid: a } = this;
    for (let r = 0; r < 2; r++) {
      let l = [];
      for (let c = 0; c < s; c++)
        for (let h = 0; h < e; h++)
          for (let f = 0; f < t; f++) {
            let u = this.idx(f, h, c);
            if (a[u]) continue;
            let d = 0,
              m = 0,
              p = 0,
              x = 0,
              g = 0,
              b = 0,
              v = 0;
            for (let y = 0; y < 6; y++) {
              let M = f + (y === 0 ? 1 : y === 1 ? -1 : 0),
                w = h + (y === 2 ? 1 : y === 3 ? -1 : 0),
                T = c + (y === 4 ? 1 : y === 5 ? -1 : 0);
              if (M < 0 || w < 0 || T < 0 || M >= t || w >= e || T >= s)
                continue;
              let S = this.idx(M, w, T);
              a[S] &&
                (d++,
                (m += n[S * 3]),
                (p += n[S * 3 + 1]),
                (x += n[S * 3 + 2]),
                (g += i[S * 3]),
                (b += i[S * 3 + 1]),
                (v += i[S * 3 + 2]));
            }
            if (d) {
              let y = u * 3;
              ((n[y] = m / d),
                (n[y + 1] = p / d),
                (n[y + 2] = x / d),
                (i[y] = g / d),
                (i[y + 1] = b / d),
                (i[y + 2] = v / d),
                l.push(u));
            }
          }
      for (let c of l) a[c] = 2;
    }
  }
  _pack(t) {
    let { nx: e, ny: s } = this,
      n = t % e,
      i = Math.floor(t / e) % s,
      a = Math.floor(t / (e * s)),
      r = ((a * s * 2 + i) * e + n) * 4,
      l = ((a * s * 2 + i + s) * e + n) * 4,
      c = t * 3,
      h = this.half;
    ((h[r] = xg(Math.min(this.A[c], 6e4))),
      (h[r + 1] = xg(Math.min(this.A[c + 1], 6e4))),
      (h[r + 2] = xg(Math.min(this.A[c + 2], 6e4))),
      (h[r + 3] = 15360),
      (h[l] = xg(Math.min(this.B[c], 6e4))),
      (h[l + 1] = xg(Math.min(this.B[c + 1], 6e4))),
      (h[l + 2] = xg(Math.min(this.B[c + 2], 6e4))),
      (h[l + 3] = 15360));
  }
  upload() {
    for (let t = 0; t < this.n; t++) this._pack(t);
    ((this.texture.needsUpdate = !0), (this.dirty = !1));
  }
  flush() {
    this.dirty && ((this.texture.needsUpdate = !0), (this.dirty = !1));
  }
  bind(t = 1) {
    ((Ir.ghLV.value = this.texture),
      Ir.ghLVOrg.value.set(this.x0, this.y0, this.z0),
      Ir.ghLVInv.value.set(
        1 / (this.nx * this.s),
        1 / (this.ny * this.s),
        1 / (this.nz * this.s),
      ),
      (Ir.ghLVK.value.x = t),
      (Ir.ghLVK.value.y = 0.5 / this.ny));
  }
  sample(t, e, s, n) {
    let i = this.s,
      a = Math.max(0, Math.min(this.nx - 1, Math.floor((t - this.x0) / i))),
      r = Math.max(0, Math.min(this.ny - 1, Math.floor((e - this.y0) / i))),
      l = Math.max(0, Math.min(this.nz - 1, Math.floor((s - this.z0) / i))),
      c = this.idx(a, r, l) * 3,
      h = this.A,
      f = this.B;
    return (
      (n.ar = h[c]),
      (n.ag = h[c + 1]),
      (n.ab = h[c + 2]),
      (n.br = f[c]),
      (n.bg = f[c + 1]),
      (n.bb = f[c + 2]),
      (n.r = (h[c] + f[c]) * 0.5),
      (n.g = (h[c + 1] + f[c + 1]) * 0.5),
      (n.b = (h[c + 2] + f[c + 2]) * 0.5),
      n
    );
  }
};

export { Ir, LightingVolume };

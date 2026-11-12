// render/reflections.js: recovered from the verified GOLDEN HOUR release.
import {
  HalfFloatType,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  PerspectiveCamera,
  Plane,
  Vector3,
  Vector4,
  WebGLRenderTarget,
} from "../vendor/three-r180.js";

var ZM = new Vector3(0, 1, 0);
var QL = new Vector3();
var JL = new Vector3();
var tD = new Vector3();
var M9 = new Matrix4();
var xb = new Vector4();
var ru = new Vector4();
var bb = new Plane();
var yg = new Vector3();
var PlanarReflections = class {
  constructor(t, e) {
    ((this.scene = t),
      (this.camera = e),
      (this.vcam = new PerspectiveCamera()),
      this.vcam.layers.enable(1),
      (this.rt = null),
      (this.scale = 0.5),
      (this.enabled = !0),
      (this.uni = {
        tRefl: {
          value: null,
        },
        uReflMat: {
          value: new Matrix4(),
        },
      }),
      (this.mats = []),
      (this.planeY = 0),
      (this.hide = []));
  }
  setSize(t, e, s) {
    if (
      ((this.scale = s),
      (this.enabled = s > 0),
      this.rt && (this.rt.dispose(), (this.rt = null)),
      !this.enabled)
    ) {
      this.uni.tRefl.value = null;
      for (let n of this.mats) n.uni.uReflK.value = 0;
      return;
    }
    ((this.rt = new WebGLRenderTarget(
      Math.max(2, Math.floor(t * s)),
      Math.max(2, Math.floor(e * s)),
      {
        type: HalfFloatType,
        generateMipmaps: !0,
        minFilter: LinearMipmapLinearFilter,
        magFilter: LinearFilter,
        depthBuffer: !0,
      },
    )),
      (this.uni.tRefl.value = this.rt.texture));
    for (let n of this.mats) n.uni.uReflK.value = n.k;
  }
  add(t, { k: e = 1, blur: s = 0, rough: n = 7 } = {}) {
    let i = t.onBeforeCompile,
      a = t.customProgramCacheKey ? t.customProgramCacheKey.bind(t) : null,
      r = {
        uReflK: {
          value: this.enabled ? e : 0,
        },
        uReflBlur: {
          value: s,
        },
        uReflRough: {
          value: n,
        },
      },
      l = this.uni;
    ((t.onBeforeCompile = (c, h) => {
      (i && i(c, h),
        (c.uniforms.tRefl = l.tRefl),
        (c.uniforms.uReflMat = l.uReflMat),
        (c.uniforms.uReflK = r.uReflK),
        (c.uniforms.uReflBlur = r.uReflBlur),
        (c.uniforms.uReflRough = r.uReflRough),
        (c.vertexShader = c.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
uniform mat4 uReflMat;
varying vec4 vReflUv;
varying vec2 vReflG;`,
          )
          .replace(
            "#include <project_vertex>",
            `#include <project_vertex>
          { vec4 rw = modelMatrix * vec4(transformed, 1.0); vReflUv = uReflMat * rw; vReflG = vec2(rw.y, normalize(mat3(modelMatrix) * objectNormal).y); }`,
          )),
        (c.fragmentShader = c.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
uniform sampler2D tRefl;
uniform float uReflK, uReflBlur, uReflRough;
varying vec4 vReflUv;
varying vec2 vReflG;`,
          )
          .replace(
            "#include <opaque_fragment>",
            `
          if (uReflK > 0.0 && abs(vReflG.x) < 0.03 && vReflG.y > 0.9) {
            vec3 rN = normalize(normal), rV = normalize(vViewPosition);
            vec3 gN = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
            vec2 ruv = vReflUv.xy / vReflUv.w + (rN.xy - gN.xy) * 0.085;
            float rr = clamp(roughnessFactor, 0.0, 1.0);
            vec3 rc = textureLod(tRefl, ruv, rr * uReflRough + uReflBlur).rgb;
            float fres = 0.055 + 0.945 * pow(clamp(1.0 - dot(rN, rV), 0.0, 1.0), 5.0);
            float gloss = (1.0 - rr) * (1.0 - rr);
            outgoingLight += min(rc, vec3(9.0)) * fres * gloss * uReflK;
          }
          #include <opaque_fragment>`,
          )));
    }),
      (t.customProgramCacheKey = () => (a ? a() : "") + "|floorRefl"),
      (t.needsUpdate = !0),
      this.mats.push({
        material: t,
        uni: r,
        k: e,
      }));
  }
  render(t) {
    if (!this.enabled || !this.rt) return;
    let e = this.camera,
      s = this.vcam;
    if (e.position.y <= this.planeY + 0.02) return;
    (yg.set(0, this.planeY, 0),
      QL.subVectors(yg, e.position).reflect(ZM).negate().add(yg),
      M9.extractRotation(e.matrixWorld),
      JL.set(0, 0, -1).applyMatrix4(M9).add(e.position),
      tD.subVectors(yg, JL).reflect(ZM).negate().add(yg),
      s.position.copy(QL),
      s.up.set(0, 1, 0).applyMatrix4(M9).reflect(ZM),
      s.lookAt(tD),
      (s.near = e.near),
      (s.far = e.far),
      s.updateMatrixWorld(),
      s.projectionMatrix.copy(e.projectionMatrix),
      this.uni.uReflMat.value
        .set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)
        .multiply(s.projectionMatrix)
        .multiply(s.matrixWorldInverse),
      bb
        .setFromNormalAndCoplanarPoint(ZM, yg)
        .applyMatrix4(s.matrixWorldInverse),
      ru.set(bb.normal.x, bb.normal.y, bb.normal.z, bb.constant));
    let n = s.projectionMatrix.elements;
    ((xb.x = (Math.sign(ru.x) + n[8]) / n[0]),
      (xb.y = (Math.sign(ru.y) + n[9]) / n[5]),
      (xb.z = -1),
      (xb.w = (1 + n[10]) / n[14]),
      ru.multiplyScalar(2 / ru.dot(xb)),
      (n[2] = ru.x),
      (n[6] = ru.y),
      (n[10] = ru.z + 1 - 0.003),
      (n[14] = ru.w),
      s.projectionMatrixInverse.copy(s.projectionMatrix).invert());
    for (let r of this.hide) ((r._rv = r.visible), (r.visible = !1));
    let i = t.getRenderTarget(),
      a = this.uni.tRefl.value;
    ((this.uni.tRefl.value = null),
      t.setRenderTarget(this.rt),
      t.clear(),
      t.render(this.scene, s),
      t.setRenderTarget(i),
      (this.uni.tRefl.value = a));
    for (let r of this.hide) r.visible = r._rv;
  }
};

export { PlanarReflections };

// vendor/postprocessing.js: recovered from the verified GOLDEN HOUR release.
import {
  AddEquation,
  AdditiveBlending,
  BufferGeometry,
  Clock,
  Color,
  CustomBlending,
  DataTexture,
  DepthStencilFormat,
  DepthTexture,
  DstAlphaFactor,
  DstColorFactor,
  Float32BufferAttribute,
  HalfFloatType,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshNormalMaterial,
  NearestFilter,
  NoBlending,
  OrthographicCamera,
  RGBAFormat,
  RepeatWrapping,
  ShaderMaterial,
  UniformsUtils,
  UnsignedByteType,
  UnsignedInt248Type,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  ZeroFactor,
} from "./three-r180.js";

var G2 = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: {
      value: null,
    },
    opacity: {
      value: 1,
    },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`,
};
var Dr = class {
  constructor() {
    ((this.isPass = !0),
      (this.enabled = !0),
      (this.needsSwap = !0),
      (this.clear = !1),
      (this.renderToScreen = !1));
  }
  setSize() {}
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {}
};
var yY = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
var o9 = class extends BufferGeometry {
  constructor() {
    (super(),
      this.setAttribute(
        "position",
        new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3),
      ),
      this.setAttribute(
        "uv",
        new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2),
      ));
  }
};
var vY = new o9();
var ic = class {
  constructor(t) {
    this._mesh = new Mesh(vY, t);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(t) {
    t.render(this._mesh, yY);
  }
  get material() {
    return this._mesh.material;
  }
  set material(t) {
    this._mesh.material = t;
  }
};
var Cd = class extends Dr {
  constructor(t, e = "tDiffuse") {
    (super(),
      (this.textureID = e),
      (this.uniforms = null),
      (this.material = null),
      t instanceof ShaderMaterial
        ? ((this.uniforms = t.uniforms), (this.material = t))
        : t &&
          ((this.uniforms = UniformsUtils.clone(t.uniforms)),
          (this.material = new ShaderMaterial({
            name: t.name !== void 0 ? t.name : "unspecified",
            defines: Object.assign({}, t.defines),
            uniforms: this.uniforms,
            vertexShader: t.vertexShader,
            fragmentShader: t.fragmentShader,
          }))),
      (this._fsQuad = new ic(this.material)));
  }
  render(t, e, s) {
    (this.uniforms[this.textureID] &&
      (this.uniforms[this.textureID].value = s.texture),
      (this._fsQuad.material = this.material),
      this.renderToScreen
        ? (t.setRenderTarget(null), this._fsQuad.render(t))
        : (t.setRenderTarget(e),
          this.clear &&
            t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
          this._fsQuad.render(t)));
  }
  dispose() {
    (this.material.dispose(), this._fsQuad.dispose());
  }
};
var lb = class extends Dr {
  constructor(t, e) {
    (super(),
      (this.scene = t),
      (this.camera = e),
      (this.clear = !0),
      (this.needsSwap = !1),
      (this.inverse = !1));
  }
  render(t, e, s) {
    let n = t.getContext(),
      i = t.state;
    (i.buffers.color.setMask(!1),
      i.buffers.depth.setMask(!1),
      i.buffers.color.setLocked(!0),
      i.buffers.depth.setLocked(!0));
    let a, r;
    (this.inverse ? ((a = 0), (r = 1)) : ((a = 1), (r = 0)),
      i.buffers.stencil.setTest(!0),
      i.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
      i.buffers.stencil.setFunc(n.ALWAYS, a, 4294967295),
      i.buffers.stencil.setClear(r),
      i.buffers.stencil.setLocked(!0),
      t.setRenderTarget(s),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      t.setRenderTarget(e),
      this.clear && t.clear(),
      t.render(this.scene, this.camera),
      i.buffers.color.setLocked(!1),
      i.buffers.depth.setLocked(!1),
      i.buffers.color.setMask(!0),
      i.buffers.depth.setMask(!0),
      i.buffers.stencil.setLocked(!1),
      i.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295),
      i.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
      i.buffers.stencil.setLocked(!0));
  }
};
var zM = class extends Dr {
  constructor() {
    (super(), (this.needsSwap = !1));
  }
  render(t) {
    (t.state.buffers.stencil.setLocked(!1),
      t.state.buffers.stencil.setTest(!1));
  }
};
var LM = class {
  constructor(t, e) {
    if (
      ((this.renderer = t),
      (this._pixelRatio = t.getPixelRatio()),
      e === void 0)
    ) {
      let s = t.getSize(new Vector2());
      ((this._width = s.width),
        (this._height = s.height),
        (e = new WebGLRenderTarget(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
          {
            type: HalfFloatType,
          },
        )),
        (e.texture.name = "EffectComposer.rt1"));
    } else ((this._width = e.width), (this._height = e.height));
    ((this.renderTarget1 = e),
      (this.renderTarget2 = e.clone()),
      (this.renderTarget2.texture.name = "EffectComposer.rt2"),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2),
      (this.renderToScreen = !0),
      (this.passes = []),
      (this.copyPass = new Cd(G2)),
      (this.copyPass.material.blending = NoBlending),
      (this.clock = new Clock()));
  }
  swapBuffers() {
    let t = this.readBuffer;
    ((this.readBuffer = this.writeBuffer), (this.writeBuffer = t));
  }
  addPass(t) {
    (this.passes.push(t),
      t.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  insertPass(t, e) {
    (this.passes.splice(e, 0, t),
      t.setSize(
        this._width * this._pixelRatio,
        this._height * this._pixelRatio,
      ));
  }
  removePass(t) {
    let e = this.passes.indexOf(t);
    e !== -1 && this.passes.splice(e, 1);
  }
  isLastEnabledPass(t) {
    for (let e = t + 1; e < this.passes.length; e++)
      if (this.passes[e].enabled) return !1;
    return !0;
  }
  render(t) {
    t === void 0 && (t = this.clock.getDelta());
    let e = this.renderer.getRenderTarget(),
      s = !1;
    for (let n = 0, i = this.passes.length; n < i; n++) {
      let a = this.passes[n];
      if (a.enabled !== !1) {
        if (
          ((a.renderToScreen =
            this.renderToScreen && this.isLastEnabledPass(n)),
          a.render(this.renderer, this.writeBuffer, this.readBuffer, t, s),
          a.needsSwap)
        ) {
          if (s) {
            let r = this.renderer.getContext(),
              l = this.renderer.state.buffers.stencil;
            (l.setFunc(r.NOTEQUAL, 1, 4294967295),
              this.copyPass.render(
                this.renderer,
                this.writeBuffer,
                this.readBuffer,
                t,
              ),
              l.setFunc(r.EQUAL, 1, 4294967295));
          }
          this.swapBuffers();
        }
        lb !== void 0 &&
          (a instanceof lb ? (s = !0) : a instanceof zM && (s = !1));
      }
    }
    this.renderer.setRenderTarget(e);
  }
  reset(t) {
    if (t === void 0) {
      let e = this.renderer.getSize(new Vector2());
      ((this._pixelRatio = this.renderer.getPixelRatio()),
        (this._width = e.width),
        (this._height = e.height),
        (t = this.renderTarget1.clone()),
        t.setSize(
          this._width * this._pixelRatio,
          this._height * this._pixelRatio,
        ));
    }
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      (this.renderTarget1 = t),
      (this.renderTarget2 = t.clone()),
      (this.writeBuffer = this.renderTarget1),
      (this.readBuffer = this.renderTarget2));
  }
  setSize(t, e) {
    ((this._width = t), (this._height = e));
    let s = this._width * this._pixelRatio,
      n = this._height * this._pixelRatio;
    (this.renderTarget1.setSize(s, n), this.renderTarget2.setSize(s, n));
    for (let i = 0; i < this.passes.length; i++) this.passes[i].setSize(s, n);
  }
  setPixelRatio(t) {
    ((this._pixelRatio = t), this.setSize(this._width, this._height));
  }
  dispose() {
    (this.renderTarget1.dispose(),
      this.renderTarget2.dispose(),
      this.copyPass.dispose());
  }
};
var cb = class extends Dr {
  constructor(t, e, s = null, n = null, i = null) {
    (super(),
      (this.scene = t),
      (this.camera = e),
      (this.overrideMaterial = s),
      (this.clearColor = n),
      (this.clearAlpha = i),
      (this.clear = !0),
      (this.clearDepth = !1),
      (this.needsSwap = !1),
      (this._oldClearColor = new Color()));
  }
  render(t, e, s) {
    let n = t.autoClear;
    t.autoClear = !1;
    let i, a;
    (this.overrideMaterial !== null &&
      ((a = this.scene.overrideMaterial),
      (this.scene.overrideMaterial = this.overrideMaterial)),
      this.clearColor !== null &&
        (t.getClearColor(this._oldClearColor),
        t.setClearColor(this.clearColor, t.getClearAlpha())),
      this.clearAlpha !== null &&
        ((i = t.getClearAlpha()), t.setClearAlpha(this.clearAlpha)),
      this.clearDepth == !0 && t.clearDepth(),
      t.setRenderTarget(this.renderToScreen ? null : s),
      this.clear === !0 &&
        t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil),
      t.render(this.scene, this.camera),
      this.clearColor !== null && t.setClearColor(this._oldClearColor),
      this.clearAlpha !== null && t.setClearAlpha(i),
      this.overrideMaterial !== null && (this.scene.overrideMaterial = a),
      (t.autoClear = n));
  }
};
var ML = {
  name: "LuminosityHighPassShader",
  uniforms: {
    tDiffuse: {
      value: null,
    },
    luminosityThreshold: {
      value: 1,
    },
    smoothWidth: {
      value: 1,
    },
    defaultColor: {
      value: new Color(0),
    },
    defaultOpacity: {
      value: 0,
    },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`,
};
var mg = class o extends Dr {
  constructor(t, e = 1, s, n) {
    (super(),
      (this.strength = e),
      (this.radius = s),
      (this.threshold = n),
      (this.resolution =
        t !== void 0 ? new Vector2(t.x, t.y) : new Vector2(256, 256)),
      (this.clearColor = new Color(0, 0, 0)),
      (this.needsSwap = !1),
      (this.renderTargetsHorizontal = []),
      (this.renderTargetsVertical = []),
      (this.nMips = 5));
    let i = Math.round(this.resolution.x / 2),
      a = Math.round(this.resolution.y / 2);
    ((this.renderTargetBright = new WebGLRenderTarget(i, a, {
      type: HalfFloatType,
    })),
      (this.renderTargetBright.texture.name = "UnrealBloomPass.bright"),
      (this.renderTargetBright.texture.generateMipmaps = !1));
    for (let h = 0; h < this.nMips; h++) {
      let f = new WebGLRenderTarget(i, a, {
        type: HalfFloatType,
      });
      ((f.texture.name = "UnrealBloomPass.h" + h),
        (f.texture.generateMipmaps = !1),
        this.renderTargetsHorizontal.push(f));
      let u = new WebGLRenderTarget(i, a, {
        type: HalfFloatType,
      });
      ((u.texture.name = "UnrealBloomPass.v" + h),
        (u.texture.generateMipmaps = !1),
        this.renderTargetsVertical.push(u),
        (i = Math.round(i / 2)),
        (a = Math.round(a / 2)));
    }
    let r = ML;
    ((this.highPassUniforms = UniformsUtils.clone(r.uniforms)),
      (this.highPassUniforms.luminosityThreshold.value = n),
      (this.highPassUniforms.smoothWidth.value = 0.01),
      (this.materialHighPassFilter = new ShaderMaterial({
        uniforms: this.highPassUniforms,
        vertexShader: r.vertexShader,
        fragmentShader: r.fragmentShader,
      })),
      (this.separableBlurMaterials = []));
    let l = [3, 5, 7, 9, 11];
    ((i = Math.round(this.resolution.x / 2)),
      (a = Math.round(this.resolution.y / 2)));
    for (let h = 0; h < this.nMips; h++)
      (this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),
        (this.separableBlurMaterials[h].uniforms.invSize.value = new Vector2(
          1 / i,
          1 / a,
        )),
        (i = Math.round(i / 2)),
        (a = Math.round(a / 2)));
    ((this.compositeMaterial = this._getCompositeMaterial(this.nMips)),
      (this.compositeMaterial.uniforms.blurTexture1.value =
        this.renderTargetsVertical[0].texture),
      (this.compositeMaterial.uniforms.blurTexture2.value =
        this.renderTargetsVertical[1].texture),
      (this.compositeMaterial.uniforms.blurTexture3.value =
        this.renderTargetsVertical[2].texture),
      (this.compositeMaterial.uniforms.blurTexture4.value =
        this.renderTargetsVertical[3].texture),
      (this.compositeMaterial.uniforms.blurTexture5.value =
        this.renderTargetsVertical[4].texture),
      (this.compositeMaterial.uniforms.bloomStrength.value = e),
      (this.compositeMaterial.uniforms.bloomRadius.value = 0.1));
    let c = [1, 0.8, 0.6, 0.4, 0.2];
    ((this.compositeMaterial.uniforms.bloomFactors.value = c),
      (this.bloomTintColors = [
        new Vector3(1, 1, 1),
        new Vector3(1, 1, 1),
        new Vector3(1, 1, 1),
        new Vector3(1, 1, 1),
        new Vector3(1, 1, 1),
      ]),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      (this.copyUniforms = UniformsUtils.clone(G2.uniforms)),
      (this.blendMaterial = new ShaderMaterial({
        uniforms: this.copyUniforms,
        vertexShader: G2.vertexShader,
        fragmentShader: G2.fragmentShader,
        blending: AdditiveBlending,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0,
      })),
      (this._oldClearColor = new Color()),
      (this._oldClearAlpha = 1),
      (this._basic = new MeshBasicMaterial()),
      (this._fsQuad = new ic(null)));
  }
  dispose() {
    for (let t = 0; t < this.renderTargetsHorizontal.length; t++)
      this.renderTargetsHorizontal[t].dispose();
    for (let t = 0; t < this.renderTargetsVertical.length; t++)
      this.renderTargetsVertical[t].dispose();
    this.renderTargetBright.dispose();
    for (let t = 0; t < this.separableBlurMaterials.length; t++)
      this.separableBlurMaterials[t].dispose();
    (this.compositeMaterial.dispose(),
      this.blendMaterial.dispose(),
      this._basic.dispose(),
      this._fsQuad.dispose());
  }
  setSize(t, e) {
    let s = Math.round(t / 2),
      n = Math.round(e / 2);
    this.renderTargetBright.setSize(s, n);
    for (let i = 0; i < this.nMips; i++)
      (this.renderTargetsHorizontal[i].setSize(s, n),
        this.renderTargetsVertical[i].setSize(s, n),
        (this.separableBlurMaterials[i].uniforms.invSize.value = new Vector2(
          1 / s,
          1 / n,
        )),
        (s = Math.round(s / 2)),
        (n = Math.round(n / 2)));
  }
  render(t, e, s, n, i) {
    (t.getClearColor(this._oldClearColor),
      (this._oldClearAlpha = t.getClearAlpha()));
    let a = t.autoClear;
    ((t.autoClear = !1),
      t.setClearColor(this.clearColor, 0),
      i && t.state.buffers.stencil.setTest(!1),
      this.renderToScreen &&
        ((this._fsQuad.material = this._basic),
        (this._basic.map = s.texture),
        t.setRenderTarget(null),
        t.clear(),
        this._fsQuad.render(t)),
      (this.highPassUniforms.tDiffuse.value = s.texture),
      (this.highPassUniforms.luminosityThreshold.value = this.threshold),
      (this._fsQuad.material = this.materialHighPassFilter),
      t.setRenderTarget(this.renderTargetBright),
      t.clear(),
      this._fsQuad.render(t));
    let r = this.renderTargetBright;
    for (let l = 0; l < this.nMips; l++)
      ((this._fsQuad.material = this.separableBlurMaterials[l]),
        (this.separableBlurMaterials[l].uniforms.colorTexture.value =
          r.texture),
        (this.separableBlurMaterials[l].uniforms.direction.value =
          o.BlurDirectionX),
        t.setRenderTarget(this.renderTargetsHorizontal[l]),
        t.clear(),
        this._fsQuad.render(t),
        (this.separableBlurMaterials[l].uniforms.colorTexture.value =
          this.renderTargetsHorizontal[l].texture),
        (this.separableBlurMaterials[l].uniforms.direction.value =
          o.BlurDirectionY),
        t.setRenderTarget(this.renderTargetsVertical[l]),
        t.clear(),
        this._fsQuad.render(t),
        (r = this.renderTargetsVertical[l]));
    ((this._fsQuad.material = this.compositeMaterial),
      (this.compositeMaterial.uniforms.bloomStrength.value = this.strength),
      (this.compositeMaterial.uniforms.bloomRadius.value = this.radius),
      (this.compositeMaterial.uniforms.bloomTintColors.value =
        this.bloomTintColors),
      t.setRenderTarget(this.renderTargetsHorizontal[0]),
      t.clear(),
      this._fsQuad.render(t),
      (this._fsQuad.material = this.blendMaterial),
      (this.copyUniforms.tDiffuse.value =
        this.renderTargetsHorizontal[0].texture),
      i && t.state.buffers.stencil.setTest(!0),
      this.renderToScreen
        ? (t.setRenderTarget(null), this._fsQuad.render(t))
        : (t.setRenderTarget(s), this._fsQuad.render(t)),
      t.setClearColor(this._oldClearColor, this._oldClearAlpha),
      (t.autoClear = a));
  }
  _getSeparableBlurMaterial(t) {
    let e = [];
    for (let s = 0; s < t; s++)
      e.push((0.39894 * Math.exp((-0.5 * s * s) / (t * t))) / t);
    return new ShaderMaterial({
      defines: {
        KERNEL_RADIUS: t,
      },
      uniforms: {
        colorTexture: {
          value: null,
        },
        invSize: {
          value: new Vector2(0.5, 0.5),
        },
        direction: {
          value: new Vector2(0.5, 0.5),
        },
        gaussianCoefficients: {
          value: e,
        },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`,
    });
  }
  _getCompositeMaterial(t) {
    return new ShaderMaterial({
      defines: {
        NUM_MIPS: t,
      },
      uniforms: {
        blurTexture1: {
          value: null,
        },
        blurTexture2: {
          value: null,
        },
        blurTexture3: {
          value: null,
        },
        blurTexture4: {
          value: null,
        },
        blurTexture5: {
          value: null,
        },
        bloomStrength: {
          value: 1,
        },
        bloomFactors: {
          value: null,
        },
        bloomTintColors: {
          value: null,
        },
        bloomRadius: {
          value: 0,
        },
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`,
    });
  }
};
mg.BlurDirectionX = new Vector2(1, 0);
mg.BlurDirectionY = new Vector2(0, 1);
var hb = {
  name: "GTAOShader",
  defines: {
    PERSPECTIVE_CAMERA: 1,
    SAMPLES: 16,
    NORMAL_VECTOR_TYPE: 1,
    DEPTH_SWIZZLING: "x",
    SCREEN_SPACE_RADIUS: 0,
    SCREEN_SPACE_RADIUS_SCALE: 100,
    SCENE_CLIP_BOX: 0,
  },
  uniforms: {
    tNormal: {
      value: null,
    },
    tDepth: {
      value: null,
    },
    tNoise: {
      value: null,
    },
    resolution: {
      value: new Vector2(),
    },
    cameraNear: {
      value: null,
    },
    cameraFar: {
      value: null,
    },
    cameraProjectionMatrix: {
      value: new Matrix4(),
    },
    cameraProjectionMatrixInverse: {
      value: new Matrix4(),
    },
    cameraWorldMatrix: {
      value: new Matrix4(),
    },
    radius: {
      value: 0.25,
    },
    distanceExponent: {
      value: 1,
    },
    thickness: {
      value: 1,
    },
    distanceFallOff: {
      value: 1,
    },
    scale: {
      value: 1,
    },
    sceneBoxMin: {
      value: new Vector3(-1, -1, -1),
    },
    sceneBoxMax: {
      value: new Vector3(1, 1, 1),
    },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragmentShader: `
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif

		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}

		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {

				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w);
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));

				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));

				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`,
};
var fb = {
  name: "GTAODepthShader",
  defines: {
    PERSPECTIVE_CAMERA: 1,
  },
  uniforms: {
    tDepth: {
      value: null,
    },
    cameraNear: {
      value: null,
    },
    cameraFar: {
      value: null,
    },
  },
  vertexShader: `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragmentShader: `
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`,
};
var DM = {
  name: "GTAOBlendShader",
  uniforms: {
    tDiffuse: {
      value: null,
    },
    intensity: {
      value: 1,
    },
  },
  vertexShader: `
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragmentShader: `
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`,
};
function wL(o = 5) {
  let t = Math.floor(o) % 2 === 0 ? Math.floor(o) + 1 : Math.floor(o),
    e = MY(t),
    s = e.length,
    n = new Uint8Array(s * 4);
  for (let a = 0; a < s; ++a) {
    let r = e[a],
      l = (2 * Math.PI * r) / s,
      c = new Vector3(Math.cos(l), Math.sin(l), 0).normalize();
    ((n[a * 4] = (c.x * 0.5 + 0.5) * 255),
      (n[a * 4 + 1] = (c.y * 0.5 + 0.5) * 255),
      (n[a * 4 + 2] = 127),
      (n[a * 4 + 3] = 255));
  }
  let i = new DataTexture(n, t, t);
  return (
    (i.wrapS = RepeatWrapping),
    (i.wrapT = RepeatWrapping),
    (i.needsUpdate = !0),
    i
  );
}
function MY(o) {
  let t = Math.floor(o) % 2 === 0 ? Math.floor(o) + 1 : Math.floor(o),
    e = t * t,
    s = Array(e).fill(0),
    n = Math.floor(t / 2),
    i = t - 1;
  for (let a = 1; a <= e;) {
    if (
      (n === -1 && i === t
        ? ((i = t - 2), (n = 0))
        : (i === t && (i = 0), n < 0 && (n = t - 1)),
      s[n * t + i] !== 0)
    ) {
      ((i -= 2), n++);
      continue;
    } else s[n * t + i] = a++;
    (i++, n--);
  }
  return s;
}
var ub = {
  name: "PoissonDenoiseShader",
  defines: {
    SAMPLES: 16,
    SAMPLE_VECTORS: i9(16, 2, 1),
    NORMAL_VECTOR_TYPE: 1,
    DEPTH_VALUE_SOURCE: 0,
  },
  uniforms: {
    tDiffuse: {
      value: null,
    },
    tNormal: {
      value: null,
    },
    tDepth: {
      value: null,
    },
    tNoise: {
      value: null,
    },
    resolution: {
      value: new Vector2(),
    },
    cameraProjectionMatrixInverse: {
      value: new Matrix4(),
    },
    lumaPhi: {
      value: 5,
    },
    depthPhi: {
      value: 5,
    },
    normalPhi: {
      value: 5,
    },
    radius: {
      value: 4,
    },
    index: {
      value: 0,
    },
  },
  vertexShader: `

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,
  fragmentShader: `

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;

		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);

			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;

			denoised += w * neighborColor;
			totalWeight += w;
		}

		void main() {
			float depth = getDepth(vUv.xy);
			vec3 viewNormal = getViewNormal(vUv);
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);

			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}

			if (totalWeight > 0.) {
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`,
};
function i9(o, t, e) {
  let s = wY(o, t, e),
    n = "vec3[SAMPLES](";
  for (let i = 0; i < o; i++) {
    let a = s[i];
    n += `vec3(${a.x}, ${a.y}, ${a.z})${i < o - 1 ? "," : ")"}`;
  }
  return n;
}
function wY(o, t, e) {
  let s = [];
  for (let n = 0; n < o; n++) {
    let i = (2 * Math.PI * t * n) / o,
      a = Math.pow(n / (o - 1), e);
    s.push(new Vector3(Math.cos(i), Math.sin(i), a));
  }
  return s;
}
var IM = class {
  constructor(t = Math) {
    ((this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ]),
      (this.grad4 = [
        [0, 1, 1, 1],
        [0, 1, 1, -1],
        [0, 1, -1, 1],
        [0, 1, -1, -1],
        [0, -1, 1, 1],
        [0, -1, 1, -1],
        [0, -1, -1, 1],
        [0, -1, -1, -1],
        [1, 0, 1, 1],
        [1, 0, 1, -1],
        [1, 0, -1, 1],
        [1, 0, -1, -1],
        [-1, 0, 1, 1],
        [-1, 0, 1, -1],
        [-1, 0, -1, 1],
        [-1, 0, -1, -1],
        [1, 1, 0, 1],
        [1, 1, 0, -1],
        [1, -1, 0, 1],
        [1, -1, 0, -1],
        [-1, 1, 0, 1],
        [-1, 1, 0, -1],
        [-1, -1, 0, 1],
        [-1, -1, 0, -1],
        [1, 1, 1, 0],
        [1, 1, -1, 0],
        [1, -1, 1, 0],
        [1, -1, -1, 0],
        [-1, 1, 1, 0],
        [-1, 1, -1, 0],
        [-1, -1, 1, 0],
        [-1, -1, -1, 0],
      ]),
      (this.p = []));
    for (let e = 0; e < 256; e++) this.p[e] = Math.floor(t.random() * 256);
    this.perm = [];
    for (let e = 0; e < 512; e++) this.perm[e] = this.p[e & 255];
    this.simplex = [
      [0, 1, 2, 3],
      [0, 1, 3, 2],
      [0, 0, 0, 0],
      [0, 2, 3, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 3, 0],
      [0, 2, 1, 3],
      [0, 0, 0, 0],
      [0, 3, 1, 2],
      [0, 3, 2, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 3, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 0, 3],
      [0, 0, 0, 0],
      [1, 3, 0, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 3, 0, 1],
      [2, 3, 1, 0],
      [1, 0, 2, 3],
      [1, 0, 3, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 3, 1],
      [0, 0, 0, 0],
      [2, 1, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 1, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 0, 1, 2],
      [3, 0, 2, 1],
      [0, 0, 0, 0],
      [3, 1, 2, 0],
      [2, 1, 0, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 1, 0, 2],
      [0, 0, 0, 0],
      [3, 2, 0, 1],
      [3, 2, 1, 0],
    ];
  }
  noise(t, e) {
    let s,
      n,
      i,
      a = 0.5 * (Math.sqrt(3) - 1),
      r = (t + e) * a,
      l = Math.floor(t + r),
      c = Math.floor(e + r),
      h = (3 - Math.sqrt(3)) / 6,
      f = (l + c) * h,
      u = l - f,
      d = c - f,
      m = t - u,
      p = e - d,
      x,
      g;
    m > p ? ((x = 1), (g = 0)) : ((x = 0), (g = 1));
    let b = m - x + h,
      v = p - g + h,
      y = m - 1 + 2 * h,
      M = p - 1 + 2 * h,
      w = l & 255,
      T = c & 255,
      S = this.perm[w + this.perm[T]] % 12,
      E = this.perm[w + x + this.perm[T + g]] % 12,
      _ = this.perm[w + 1 + this.perm[T + 1]] % 12,
      R = 0.5 - m * m - p * p;
    R < 0 ? (s = 0) : ((R *= R), (s = R * R * this._dot(this.grad3[S], m, p)));
    let C = 0.5 - b * b - v * v;
    C < 0 ? (n = 0) : ((C *= C), (n = C * C * this._dot(this.grad3[E], b, v)));
    let L = 0.5 - y * y - M * M;
    return (
      L < 0
        ? (i = 0)
        : ((L *= L), (i = L * L * this._dot(this.grad3[_], y, M))),
      70 * (s + n + i)
    );
  }
  noise3d(t, e, s) {
    let n,
      i,
      a,
      r,
      c = (t + e + s) * 0.3333333333333333,
      h = Math.floor(t + c),
      f = Math.floor(e + c),
      u = Math.floor(s + c),
      d = 1 / 6,
      m = (h + f + u) * d,
      p = h - m,
      x = f - m,
      g = u - m,
      b = t - p,
      v = e - x,
      y = s - g,
      M,
      w,
      T,
      S,
      E,
      _;
    b >= v
      ? v >= y
        ? ((M = 1), (w = 0), (T = 0), (S = 1), (E = 1), (_ = 0))
        : b >= y
          ? ((M = 1), (w = 0), (T = 0), (S = 1), (E = 0), (_ = 1))
          : ((M = 0), (w = 0), (T = 1), (S = 1), (E = 0), (_ = 1))
      : v < y
        ? ((M = 0), (w = 0), (T = 1), (S = 0), (E = 1), (_ = 1))
        : b < y
          ? ((M = 0), (w = 1), (T = 0), (S = 0), (E = 1), (_ = 1))
          : ((M = 0), (w = 1), (T = 0), (S = 1), (E = 1), (_ = 0));
    let R = b - M + d,
      C = v - w + d,
      L = y - T + d,
      A = b - S + 2 * d,
      O = v - E + 2 * d,
      H = y - _ + 2 * d,
      F = b - 1 + 3 * d,
      P = v - 1 + 3 * d,
      z = y - 1 + 3 * d,
      k = h & 255,
      I = f & 255,
      G = u & 255,
      K = this.perm[k + this.perm[I + this.perm[G]]] % 12,
      $ = this.perm[k + M + this.perm[I + w + this.perm[G + T]]] % 12,
      n0 = this.perm[k + S + this.perm[I + E + this.perm[G + _]]] % 12,
      e0 = this.perm[k + 1 + this.perm[I + 1 + this.perm[G + 1]]] % 12,
      p0 = 0.6 - b * b - v * v - y * y;
    p0 < 0
      ? (n = 0)
      : ((p0 *= p0), (n = p0 * p0 * this._dot3(this.grad3[K], b, v, y)));
    let t0 = 0.6 - R * R - C * C - L * L;
    t0 < 0
      ? (i = 0)
      : ((t0 *= t0), (i = t0 * t0 * this._dot3(this.grad3[$], R, C, L)));
    let M0 = 0.6 - A * A - O * O - H * H;
    M0 < 0
      ? (a = 0)
      : ((M0 *= M0), (a = M0 * M0 * this._dot3(this.grad3[n0], A, O, H)));
    let f0 = 0.6 - F * F - P * P - z * z;
    return (
      f0 < 0
        ? (r = 0)
        : ((f0 *= f0), (r = f0 * f0 * this._dot3(this.grad3[e0], F, P, z))),
      32 * (n + i + a + r)
    );
  }
  noise4d(t, e, s, n) {
    let i = this.grad4,
      a = this.simplex,
      r = this.perm,
      l = (Math.sqrt(5) - 1) / 4,
      c = (5 - Math.sqrt(5)) / 20,
      h,
      f,
      u,
      d,
      m,
      p = (t + e + s + n) * l,
      x = Math.floor(t + p),
      g = Math.floor(e + p),
      b = Math.floor(s + p),
      v = Math.floor(n + p),
      y = (x + g + b + v) * c,
      M = x - y,
      w = g - y,
      T = b - y,
      S = v - y,
      E = t - M,
      _ = e - w,
      R = s - T,
      C = n - S,
      L = E > _ ? 32 : 0,
      A = E > R ? 16 : 0,
      O = _ > R ? 8 : 0,
      H = E > C ? 4 : 0,
      F = _ > C ? 2 : 0,
      P = R > C ? 1 : 0,
      z = L + A + O + H + F + P,
      k = a[z][0] >= 3 ? 1 : 0,
      I = a[z][1] >= 3 ? 1 : 0,
      G = a[z][2] >= 3 ? 1 : 0,
      K = a[z][3] >= 3 ? 1 : 0,
      $ = a[z][0] >= 2 ? 1 : 0,
      n0 = a[z][1] >= 2 ? 1 : 0,
      e0 = a[z][2] >= 2 ? 1 : 0,
      p0 = a[z][3] >= 2 ? 1 : 0,
      t0 = a[z][0] >= 1 ? 1 : 0,
      M0 = a[z][1] >= 1 ? 1 : 0,
      f0 = a[z][2] >= 1 ? 1 : 0,
      _0 = a[z][3] >= 1 ? 1 : 0,
      F0 = E - k + c,
      m0 = _ - I + c,
      S0 = R - G + c,
      T0 = C - K + c,
      j0 = E - $ + 2 * c,
      Z0 = _ - n0 + 2 * c,
      lt = R - e0 + 2 * c,
      H0 = C - p0 + 2 * c,
      Y0 = E - t0 + 3 * c,
      et = _ - M0 + 3 * c,
      ct = R - f0 + 3 * c,
      D0 = C - _0 + 3 * c,
      u0 = E - 1 + 4 * c,
      w0 = _ - 1 + 4 * c,
      P0 = R - 1 + 4 * c,
      st = C - 1 + 4 * c,
      J0 = x & 255,
      q0 = g & 255,
      v0 = b & 255,
      x0 = v & 255,
      C0 = r[J0 + r[q0 + r[v0 + r[x0]]]] % 32,
      k0 = r[J0 + k + r[q0 + I + r[v0 + G + r[x0 + K]]]] % 32,
      O0 = r[J0 + $ + r[q0 + n0 + r[v0 + e0 + r[x0 + p0]]]] % 32,
      B0 = r[J0 + t0 + r[q0 + M0 + r[v0 + f0 + r[x0 + _0]]]] % 32,
      ot = r[J0 + 1 + r[q0 + 1 + r[v0 + 1 + r[x0 + 1]]]] % 32,
      Q0 = 0.6 - E * E - _ * _ - R * R - C * C;
    Q0 < 0
      ? (h = 0)
      : ((Q0 *= Q0), (h = Q0 * Q0 * this._dot4(i[C0], E, _, R, C)));
    let nt = 0.6 - F0 * F0 - m0 * m0 - S0 * S0 - T0 * T0;
    nt < 0
      ? (f = 0)
      : ((nt *= nt), (f = nt * nt * this._dot4(i[k0], F0, m0, S0, T0)));
    let L0 = 0.6 - j0 * j0 - Z0 * Z0 - lt * lt - H0 * H0;
    L0 < 0
      ? (u = 0)
      : ((L0 *= L0), (u = L0 * L0 * this._dot4(i[O0], j0, Z0, lt, H0)));
    let ht = 0.6 - Y0 * Y0 - et * et - ct * ct - D0 * D0;
    ht < 0
      ? (d = 0)
      : ((ht *= ht), (d = ht * ht * this._dot4(i[B0], Y0, et, ct, D0)));
    let pt = 0.6 - u0 * u0 - w0 * w0 - P0 * P0 - st * st;
    return (
      pt < 0
        ? (m = 0)
        : ((pt *= pt), (m = pt * pt * this._dot4(i[ot], u0, w0, P0, st))),
      27 * (h + f + u + d + m)
    );
  }
  _dot(t, e, s) {
    return t[0] * e + t[1] * s;
  }
  _dot3(t, e, s, n) {
    return t[0] * e + t[1] * s + t[2] * n;
  }
  _dot4(t, e, s, n, i) {
    return t[0] * e + t[1] * s + t[2] * n + t[3] * i;
  }
};
var gg = class o extends Dr {
  constructor(t, e, s = 512, n = 512, i, a, r) {
    (super(),
      (this.width = s),
      (this.height = n),
      (this.clear = !0),
      (this.camera = e),
      (this.scene = t),
      (this.output = 0),
      (this._renderGBuffer = !0),
      (this._visibilityCache = []),
      (this.blendIntensity = 1),
      (this.pdRings = 2),
      (this.pdRadiusExponent = 2),
      (this.pdSamples = 16),
      (this.gtaoNoiseTexture = wL()),
      (this.pdNoiseTexture = this._generateNoise()),
      (this.gtaoRenderTarget = new WebGLRenderTarget(this.width, this.height, {
        type: HalfFloatType,
      })),
      (this.pdRenderTarget = this.gtaoRenderTarget.clone()),
      (this.gtaoMaterial = new ShaderMaterial({
        defines: Object.assign({}, hb.defines),
        uniforms: UniformsUtils.clone(hb.uniforms),
        vertexShader: hb.vertexShader,
        fragmentShader: hb.fragmentShader,
        blending: NoBlending,
        depthTest: !1,
        depthWrite: !1,
      })),
      (this.gtaoMaterial.defines.PERSPECTIVE_CAMERA = this.camera
        .isPerspectiveCamera
        ? 1
        : 0),
      (this.gtaoMaterial.uniforms.tNoise.value = this.gtaoNoiseTexture),
      this.gtaoMaterial.uniforms.resolution.value.set(this.width, this.height),
      (this.gtaoMaterial.uniforms.cameraNear.value = this.camera.near),
      (this.gtaoMaterial.uniforms.cameraFar.value = this.camera.far),
      (this.normalMaterial = new MeshNormalMaterial()),
      (this.normalMaterial.blending = NoBlending),
      (this.pdMaterial = new ShaderMaterial({
        defines: Object.assign({}, ub.defines),
        uniforms: UniformsUtils.clone(ub.uniforms),
        vertexShader: ub.vertexShader,
        fragmentShader: ub.fragmentShader,
        depthTest: !1,
        depthWrite: !1,
      })),
      (this.pdMaterial.uniforms.tDiffuse.value = this.gtaoRenderTarget.texture),
      (this.pdMaterial.uniforms.tNoise.value = this.pdNoiseTexture),
      this.pdMaterial.uniforms.resolution.value.set(this.width, this.height),
      (this.pdMaterial.uniforms.lumaPhi.value = 10),
      (this.pdMaterial.uniforms.depthPhi.value = 2),
      (this.pdMaterial.uniforms.normalPhi.value = 3),
      (this.pdMaterial.uniforms.radius.value = 8),
      (this.depthRenderMaterial = new ShaderMaterial({
        defines: Object.assign({}, fb.defines),
        uniforms: UniformsUtils.clone(fb.uniforms),
        vertexShader: fb.vertexShader,
        fragmentShader: fb.fragmentShader,
        blending: NoBlending,
      })),
      (this.depthRenderMaterial.uniforms.cameraNear.value = this.camera.near),
      (this.depthRenderMaterial.uniforms.cameraFar.value = this.camera.far),
      (this.copyMaterial = new ShaderMaterial({
        uniforms: UniformsUtils.clone(G2.uniforms),
        vertexShader: G2.vertexShader,
        fragmentShader: G2.fragmentShader,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        blendSrc: DstColorFactor,
        blendDst: ZeroFactor,
        blendEquation: AddEquation,
        blendSrcAlpha: DstAlphaFactor,
        blendDstAlpha: ZeroFactor,
        blendEquationAlpha: AddEquation,
      })),
      (this.blendMaterial = new ShaderMaterial({
        uniforms: UniformsUtils.clone(DM.uniforms),
        vertexShader: DM.vertexShader,
        fragmentShader: DM.fragmentShader,
        transparent: !0,
        depthTest: !1,
        depthWrite: !1,
        blending: CustomBlending,
        blendSrc: DstColorFactor,
        blendDst: ZeroFactor,
        blendEquation: AddEquation,
        blendSrcAlpha: DstAlphaFactor,
        blendDstAlpha: ZeroFactor,
        blendEquationAlpha: AddEquation,
      })),
      (this._fsQuad = new ic(null)),
      (this._originalClearColor = new Color()),
      this.setGBuffer(
        i ? i.depthTexture : void 0,
        i ? i.normalTexture : void 0,
      ),
      a !== void 0 && this.updateGtaoMaterial(a),
      r !== void 0 && this.updatePdMaterial(r));
  }
  setSize(t, e) {
    ((this.width = t),
      (this.height = e),
      this.gtaoRenderTarget.setSize(t, e),
      this.normalRenderTarget.setSize(t, e),
      this.pdRenderTarget.setSize(t, e),
      this.gtaoMaterial.uniforms.resolution.value.set(t, e),
      this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(
        this.camera.projectionMatrix,
      ),
      this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(
        this.camera.projectionMatrixInverse,
      ),
      this.pdMaterial.uniforms.resolution.value.set(t, e),
      this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(
        this.camera.projectionMatrixInverse,
      ));
  }
  dispose() {
    (this.gtaoNoiseTexture.dispose(),
      this.pdNoiseTexture.dispose(),
      this.normalRenderTarget.dispose(),
      this.gtaoRenderTarget.dispose(),
      this.pdRenderTarget.dispose(),
      this.normalMaterial.dispose(),
      this.pdMaterial.dispose(),
      this.copyMaterial.dispose(),
      this.depthRenderMaterial.dispose(),
      this._fsQuad.dispose());
  }
  get gtaoMap() {
    return this.pdRenderTarget.texture;
  }
  setGBuffer(t, e) {
    t !== void 0
      ? ((this.depthTexture = t),
        (this.normalTexture = e),
        (this._renderGBuffer = !1))
      : ((this.depthTexture = new DepthTexture()),
        (this.depthTexture.format = DepthStencilFormat),
        (this.depthTexture.type = UnsignedInt248Type),
        (this.normalRenderTarget = new WebGLRenderTarget(
          this.width,
          this.height,
          {
            minFilter: NearestFilter,
            magFilter: NearestFilter,
            type: HalfFloatType,
            depthTexture: this.depthTexture,
          },
        )),
        (this.normalTexture = this.normalRenderTarget.texture),
        (this._renderGBuffer = !0));
    let s = this.normalTexture ? 1 : 0,
      n = this.depthTexture === this.normalTexture ? "w" : "x";
    ((this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE = s),
      (this.gtaoMaterial.defines.DEPTH_SWIZZLING = n),
      (this.gtaoMaterial.uniforms.tNormal.value = this.normalTexture),
      (this.gtaoMaterial.uniforms.tDepth.value = this.depthTexture),
      (this.pdMaterial.defines.NORMAL_VECTOR_TYPE = s),
      (this.pdMaterial.defines.DEPTH_SWIZZLING = n),
      (this.pdMaterial.uniforms.tNormal.value = this.normalTexture),
      (this.pdMaterial.uniforms.tDepth.value = this.depthTexture),
      (this.depthRenderMaterial.uniforms.tDepth.value =
        this.normalRenderTarget.depthTexture));
  }
  setSceneClipBox(t) {
    t
      ? ((this.gtaoMaterial.needsUpdate =
          this.gtaoMaterial.defines.SCENE_CLIP_BOX !== 1),
        (this.gtaoMaterial.defines.SCENE_CLIP_BOX = 1),
        this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),
        this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max))
      : ((this.gtaoMaterial.needsUpdate =
          this.gtaoMaterial.defines.SCENE_CLIP_BOX === 0),
        (this.gtaoMaterial.defines.SCENE_CLIP_BOX = 0));
  }
  updateGtaoMaterial(t) {
    (t.radius !== void 0 &&
      (this.gtaoMaterial.uniforms.radius.value = t.radius),
      t.distanceExponent !== void 0 &&
        (this.gtaoMaterial.uniforms.distanceExponent.value =
          t.distanceExponent),
      t.thickness !== void 0 &&
        (this.gtaoMaterial.uniforms.thickness.value = t.thickness),
      t.distanceFallOff !== void 0 &&
        ((this.gtaoMaterial.uniforms.distanceFallOff.value = t.distanceFallOff),
        (this.gtaoMaterial.needsUpdate = !0)),
      t.scale !== void 0 && (this.gtaoMaterial.uniforms.scale.value = t.scale),
      t.samples !== void 0 &&
        t.samples !== this.gtaoMaterial.defines.SAMPLES &&
        ((this.gtaoMaterial.defines.SAMPLES = t.samples),
        (this.gtaoMaterial.needsUpdate = !0)),
      t.screenSpaceRadius !== void 0 &&
        (t.screenSpaceRadius ? 1 : 0) !==
          this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS &&
        ((this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS = t.screenSpaceRadius
          ? 1
          : 0),
        (this.gtaoMaterial.needsUpdate = !0)));
  }
  updatePdMaterial(t) {
    let e = !1;
    (t.lumaPhi !== void 0 &&
      (this.pdMaterial.uniforms.lumaPhi.value = t.lumaPhi),
      t.depthPhi !== void 0 &&
        (this.pdMaterial.uniforms.depthPhi.value = t.depthPhi),
      t.normalPhi !== void 0 &&
        (this.pdMaterial.uniforms.normalPhi.value = t.normalPhi),
      t.radius !== void 0 &&
        t.radius !== this.radius &&
        (this.pdMaterial.uniforms.radius.value = t.radius),
      t.radiusExponent !== void 0 &&
        t.radiusExponent !== this.pdRadiusExponent &&
        ((this.pdRadiusExponent = t.radiusExponent), (e = !0)),
      t.rings !== void 0 &&
        t.rings !== this.pdRings &&
        ((this.pdRings = t.rings), (e = !0)),
      t.samples !== void 0 &&
        t.samples !== this.pdSamples &&
        ((this.pdSamples = t.samples), (e = !0)),
      e &&
        ((this.pdMaterial.defines.SAMPLES = this.pdSamples),
        (this.pdMaterial.defines.SAMPLE_VECTORS = i9(
          this.pdSamples,
          this.pdRings,
          this.pdRadiusExponent,
        )),
        (this.pdMaterial.needsUpdate = !0)));
  }
  render(t, e, s) {
    switch (
      (this._renderGBuffer &&
        (this._overrideVisibility(),
        this._renderOverride(
          t,
          this.normalMaterial,
          this.normalRenderTarget,
          7829503,
          1,
        ),
        this._restoreVisibility()),
      (this.gtaoMaterial.uniforms.cameraNear.value = this.camera.near),
      (this.gtaoMaterial.uniforms.cameraFar.value = this.camera.far),
      this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(
        this.camera.projectionMatrix,
      ),
      this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(
        this.camera.projectionMatrixInverse,
      ),
      this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(
        this.camera.matrixWorld,
      ),
      this._renderPass(
        t,
        this.gtaoMaterial,
        this.gtaoRenderTarget,
        16777215,
        1,
      ),
      this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(
        this.camera.projectionMatrixInverse,
      ),
      this._renderPass(t, this.pdMaterial, this.pdRenderTarget, 16777215, 1),
      this.output)
    ) {
      case o.OUTPUT.Off:
        break;
      case o.OUTPUT.Diffuse:
        ((this.copyMaterial.uniforms.tDiffuse.value = s.texture),
          (this.copyMaterial.blending = NoBlending),
          this._renderPass(
            t,
            this.copyMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      case o.OUTPUT.AO:
        ((this.copyMaterial.uniforms.tDiffuse.value =
          this.gtaoRenderTarget.texture),
          (this.copyMaterial.blending = NoBlending),
          this._renderPass(
            t,
            this.copyMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      case o.OUTPUT.Denoise:
        ((this.copyMaterial.uniforms.tDiffuse.value =
          this.pdRenderTarget.texture),
          (this.copyMaterial.blending = NoBlending),
          this._renderPass(
            t,
            this.copyMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      case o.OUTPUT.Depth:
        ((this.depthRenderMaterial.uniforms.cameraNear.value =
          this.camera.near),
          (this.depthRenderMaterial.uniforms.cameraFar.value = this.camera.far),
          this._renderPass(
            t,
            this.depthRenderMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      case o.OUTPUT.Normal:
        ((this.copyMaterial.uniforms.tDiffuse.value =
          this.normalRenderTarget.texture),
          (this.copyMaterial.blending = NoBlending),
          this._renderPass(
            t,
            this.copyMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      case o.OUTPUT.Default:
        ((this.copyMaterial.uniforms.tDiffuse.value = s.texture),
          (this.copyMaterial.blending = NoBlending),
          this._renderPass(
            t,
            this.copyMaterial,
            this.renderToScreen ? null : e,
          ),
          (this.blendMaterial.uniforms.intensity.value = this.blendIntensity),
          (this.blendMaterial.uniforms.tDiffuse.value =
            this.pdRenderTarget.texture),
          this._renderPass(
            t,
            this.blendMaterial,
            this.renderToScreen ? null : e,
          ));
        break;
      default:
        console.warn("THREE.GTAOPass: Unknown output type.");
    }
  }
  _renderPass(t, e, s, n, i) {
    t.getClearColor(this._originalClearColor);
    let a = t.getClearAlpha(),
      r = t.autoClear;
    (t.setRenderTarget(s),
      (t.autoClear = !1),
      n != null && (t.setClearColor(n), t.setClearAlpha(i || 0), t.clear()),
      (this._fsQuad.material = e),
      this._fsQuad.render(t),
      (t.autoClear = r),
      t.setClearColor(this._originalClearColor),
      t.setClearAlpha(a));
  }
  _renderOverride(t, e, s, n, i) {
    t.getClearColor(this._originalClearColor);
    let a = t.getClearAlpha(),
      r = t.autoClear;
    (t.setRenderTarget(s),
      (t.autoClear = !1),
      (n = e.clearColor || n),
      (i = e.clearAlpha || i),
      n != null && (t.setClearColor(n), t.setClearAlpha(i || 0), t.clear()),
      (this.scene.overrideMaterial = e),
      t.render(this.scene, this.camera),
      (this.scene.overrideMaterial = null),
      (t.autoClear = r),
      t.setClearColor(this._originalClearColor),
      t.setClearAlpha(a));
  }
  _overrideVisibility() {
    let t = this.scene,
      e = this._visibilityCache;
    t.traverse(function (s) {
      (s.isPoints || s.isLine || s.isLine2) &&
        s.visible &&
        ((s.visible = !1), e.push(s));
    });
  }
  _restoreVisibility() {
    let t = this._visibilityCache;
    for (let e = 0; e < t.length; e++) t[e].visible = !0;
    t.length = 0;
  }
  _generateNoise(t = 64) {
    let e = new IM(),
      s = t * t * 4,
      n = new Uint8Array(s);
    for (let a = 0; a < t; a++)
      for (let r = 0; r < t; r++) {
        let l = a,
          c = r;
        ((n[(a * t + r) * 4] = (e.noise(l, c) * 0.5 + 0.5) * 255),
          (n[(a * t + r) * 4 + 1] = (e.noise(l + t, c) * 0.5 + 0.5) * 255),
          (n[(a * t + r) * 4 + 2] = (e.noise(l, c + t) * 0.5 + 0.5) * 255),
          (n[(a * t + r) * 4 + 3] = (e.noise(l + t, c + t) * 0.5 + 0.5) * 255));
      }
    let i = new DataTexture(n, t, t, RGBAFormat, UnsignedByteType);
    return (
      (i.wrapS = RepeatWrapping),
      (i.wrapT = RepeatWrapping),
      (i.needsUpdate = !0),
      i
    );
  }
};
gg.OUTPUT = {
  Off: -1,
  Default: 0,
  Diffuse: 1,
  Depth: 2,
  Normal: 3,
  AO: 4,
  Denoise: 5,
};

export { Cd, Dr, LM, cb, gg, ic, mg };

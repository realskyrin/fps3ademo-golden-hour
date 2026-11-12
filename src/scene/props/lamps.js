// scene/props/lamps.js: recovered from the verified GOLDEN HOUR release.
import {
  TAU,
  clamp,
  createCanvas,
  createRandom,
  lerp,
  smoothstep,
} from "../../core/math.js";
import {
  Dl,
  Eb,
  Fr,
  Hd,
  Qo,
  Wm,
  cc,
  dr,
  fi,
  hu,
  ke,
  ks,
  ll,
  oo,
  pe,
  q2,
  ra,
  rs,
  uD,
} from "../geometry.js";
import { THREE } from "../../vendor/three-r180.js";

var pr = 1024;
var Eg = 1024;
var qm = 4;
var Rb = {
  shade: [8, 224],
  liner: [248, 96],
  tape: [360, 24],
  glass: [400, 96],
  tube: [512, 96],
  refl: [624, 48],
};
var Sb = [8, 696, 512, 248];
var _b = [544, 704, 32, 32];
var MD = 64;
var vD = (o) => [1 - (Rb[o][0] + Rb[o][1]) / Eg, 1 - Rb[o][0] / Eg];
var wg = (o) =>
  Math.round(
    255 *
      clamp(
        o <= 0.0031308 ? o * 12.92 : 1.055 * Math.pow(o, 1 / 2.4) - 0.055,
        0,
        1,
      ),
  );
var cw = (o, t, e) => `rgb(${wg(o / qm)},${wg(t / qm)},${wg(e / qm)})`;
function $j() {
  let o = createRandom(4107),
    t = (M) => {
      let w = createCanvas(pr, Eg),
        T = w.getContext("2d");
      return ((T.fillStyle = M), T.fillRect(0, 0, pr, Eg), [w, T]);
    },
    [e, s] = t("#000"),
    [n, i] = t("#cfc8ba"),
    [a, r] = t("#808080"),
    l = new Float32Array(7),
    c = (M, w) => {
      let [T, S] = Rb[M],
        E = 6,
        _ = S + E * 2,
        R = s.createImageData(pr, _),
        C = i.createImageData(pr, _),
        L = r.createImageData(pr, _);
      for (let A = 0; A < _; A++) {
        let O = clamp(A - E, 0, S - 1),
          H = 1 - (O + 0.5) / S;
        for (let F = 0; F < pr; F++) {
          ((l[6] = 0.5), w(H, F, O));
          let P = (A * pr + F) * 4,
            z = Math.round(clamp(l[6], 0, 1) * 255);
          ((R.data[P] = wg(l[0] / qm)),
            (R.data[P + 1] = wg(l[1] / qm)),
            (R.data[P + 2] = wg(l[2] / qm)),
            (R.data[P + 3] = 255),
            (C.data[P] = l[3]),
            (C.data[P + 1] = l[4]),
            (C.data[P + 2] = l[5]),
            (C.data[P + 3] = 255),
            (L.data[P] = L.data[P + 1] = L.data[P + 2] = z),
            (L.data[P + 3] = 255));
        }
      }
      (s.putImageData(R, 0, T - E),
        i.putImageData(C, 0, T - E),
        r.putImageData(L, 0, T - E));
    },
    h = (M, w, T, S = 1) => {
      ((l[0] = M[0] * w),
        (l[1] = M[1] * w),
        (l[2] = M[2] * w),
        (l[3] = T[0] * S),
        (l[4] = T[1] * S),
        (l[5] = T[2] * S));
    },
    f = Rb.shade[1],
    u = new Float32Array(f),
    d = new Float32Array(pr),
    m = new Float32Array(pr * f);
  for (let M = 0; M < f; M++) u[M] = 1 + (o() - 0.5) * 0.1;
  for (let M = 0; M < pr; M++) d[M] = 1 + (o() - 0.5) * 0.06;
  for (let M = 0; M < 300; M++) {
    let w = o.int(0, f - 1),
      T = o.int(0, pr - 1),
      S = 14 + o() * o() * 170,
      E = o() < 0.22 ? 2 : 1,
      _ = o() < 0.84 ? -(0.07 + o() * 0.2) : 0.05 + o() * 0.06;
    for (let R = 0; R < S; R++) {
      let C = Math.pow(Math.sin((Math.PI * R) / S), 0.6);
      for (let L = 0; L < E; L++)
        w + L < f && (m[(w + L) * pr + ((T + R) % pr)] += _ * C);
    }
  }
  let p = (M) => Math.pow(1 / (1 + Math.pow((M - 0.5) * 1.72, 2)), 1.5),
    x = [1.2, 0.8, 0.4],
    g = [240, 216, 172];
  (c("shade", (M, w, T) => {
    let S = p(M),
      E = m[T * pr + w],
      _ = u[T] * d[w] * (1 + E),
      R = w < 9 || w > pr - 10 ? 0.7 : w < 11 || w > pr - 12 ? 0.9 : 1,
      C = _ * R;
    ((l[0] = x[0] * Math.pow(S, 0.85) * C),
      (l[1] = x[1] * Math.pow(S, 1.2) * C),
      (l[2] = x[2] * Math.pow(S, 1.75) * C));
    let L = 1 + (_ - 1) * 0.6;
    ((l[3] = g[0] * L),
      (l[4] = g[1] * L),
      (l[5] = g[2] * L),
      (l[6] = 0.5 - E * 1.3 + (u[T] - 1) * 1.6 + (d[w] - 1) * 1.2));
  }),
    c("liner", (M) => {
      let w = p(M);
      h(
        [
          2.3 * Math.pow(w, 0.6),
          1.62 * Math.pow(w, 0.8),
          0.92 * Math.pow(w, 1.1),
        ],
        1,
        [244, 238, 226],
      );
    }),
    c("tape", (M, w, T) => {
      let S = 0.5 + 0.5 * Math.sin((w + T * 1.5) * 1.3);
      (h([0.2, 0.085, 0.026], 0.9 + 0.2 * S, [228, 200, 152], 0.96 + 0.04 * S),
        (l[6] = 0.42 + 0.16 * S));
    }),
    c("glass", (M) => {
      let w = smoothstep(0, 0.6, M);
      h(
        [lerp(2.6, 4, w), lerp(1.7, 3.5, w), lerp(0.8, 2.6, w)],
        1,
        [250, 243, 230],
      );
    }),
    c("tube", (M, w) => {
      let T = Math.pow(Math.sin(Math.PI * clamp(M, 0.02, 0.98)), 0.45),
        S = 0.5 + 0.5 * Math.cos((w / pr) * MD * TAU);
      (h(
        [lerp(0.8, 1.55, T), lerp(0.44, 1, T), lerp(0.17, 0.5, T)],
        0.8 + 0.34 * S * S,
        [242, 234, 216],
      ),
        (l[6] = 0.5));
    }),
    c("refl", (M) => {
      let w = Math.pow(M, 1.25);
      h(
        [lerp(0.62, 1.7, w), lerp(0.34, 1.12, w), lerp(0.12, 0.55, w)],
        1,
        [240, 231, 208],
      );
    }));
  let b = (M, w, T) => {
    let [S, E, _, R] = Sb;
    ((M.fillStyle = w),
      M.fillRect(S - 8, E - 8, _ + 16, R + 16),
      (M.fillStyle = T),
      (M.strokeStyle = T),
      (M.lineCap = "round"),
      (M.lineJoin = "round"),
      (M.lineWidth = 3),
      M.strokeRect(S + 10.5, E + 10.5, _ - 21, R - 21),
      (M.font =
        '700 190px Bahnschrift, "Arial Narrow", "Segoe UI", sans-serif'),
      (M.textBaseline = "alphabetic"),
      (M.textAlign = "left"));
    let C = M.measureText("EXIT").width || 300;
    (M.save(),
      M.translate(S + 30, E + R / 2 + 66),
      M.scale(248 / C, 1),
      M.fillText("EXIT", 0, 0),
      M.restore());
    let L = S + 296,
      A = E + 46,
      O = 1.56,
      H = (z, k) => {
        ((M.lineWidth = k * O),
          M.beginPath(),
          z.forEach((I, G) =>
            G
              ? M.lineTo(L + I[0] * O, A + I[1] * O)
              : M.moveTo(L + I[0] * O, A + I[1] * O),
          ),
          M.stroke());
      };
    (M.beginPath(),
      M.arc(L + 60 * O, A + 12 * O, 9.5 * O, 0, TAU),
      M.fill(),
      H(
        [
          [52, 31],
          [40, 57],
        ],
        14,
      ),
      H(
        [
          [54, 31],
          [70, 42],
          [82, 34],
        ],
        7,
      ),
      H(
        [
          [49, 32],
          [33, 36],
          [24, 49],
        ],
        7,
      ),
      H(
        [
          [41, 57],
          [59, 66],
          [57, 91],
        ],
        9,
      ),
      H(
        [
          [39, 58],
          [25, 73],
          [6, 76],
        ],
        9,
      ));
    let F = S + 436,
      P = E + R / 2;
    (M.beginPath(),
      M.moveTo(F, P - 11),
      M.lineTo(F + 28, P - 11),
      M.lineTo(F + 28, P - 30),
      M.lineTo(F + 58, P),
      M.lineTo(F + 28, P + 30),
      M.lineTo(F + 28, P + 11),
      M.lineTo(F, P + 11),
      M.closePath(),
      M.fill());
  };
  (b(s, cw(0.012, 0.42, 0.11), cw(2.5, 3.3, 2.8)),
    b(i, "rgb(8,72,38)", "rgb(226,244,232)"));
  let v = (M, w, T) => {
    let [S, E, _] = _b,
      R = M.createRadialGradient(
        S + _ / 2,
        E + _ / 2,
        1,
        S + _ / 2,
        E + _ / 2,
        _ / 2,
      );
    (R.addColorStop(0, w),
      R.addColorStop(0.55, w),
      R.addColorStop(1, T),
      (M.fillStyle = R),
      M.fillRect(S - 4, E - 4, _ + 8, _ + 8));
  };
  (v(s, cw(0.6, 4, 1.2), cw(0.02, 0.2, 0.05)),
    v(i, "rgb(150,240,170)", "rgb(20,60,30)"));
  let y = {
    srgb: !0,
    repeatU: !0,
  };
  return {
    map: ll(n, y),
    em: ll(e, y),
    nrm: ll(Hd(a, 1.5, !0), {
      srgb: !1,
      repeatU: !0,
    }),
  };
}
var D9 = class extends THREE.MeshStandardMaterial {
  onBeforeCompile(t) {
    t.fragmentShader = t.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
	{
		vec3 ghT = inverseTransformDirection( refract( - normalize( vViewPosition ), normal, 0.64 ), viewMatrix );
		vec3 ghK = vec3( dot( ghT, vec3( 31.0, 17.0, 23.0 ) ), dot( ghT, vec3( -13.0, 37.0, 19.0 ) ), dot( ghT, vec3( 21.0, -11.0, 41.0 ) ) );
		vec3 ghF = vec3( 0.0 );
		for ( int i = 0; i < 3; i ++ ) {
			float sc = 0.99 + 0.01 * float( i );
			float gq = sin( ghK.x * sc ) * sin( ghK.y * sc + 1.7 ) * sin( ghK.z * sc + 0.6 );
			ghF[ i ] = 0.12 + 0.55 * smoothstep( -0.2, 0.4, gq ) + 7.0 * pow( max( gq, 0.0 ), 3.0 );
		}
		totalEmissiveRadiance *= ghF;
	}`,
    );
  }
  customProgramCacheKey() {
    return "gh-crystal";
  }
};
function registerLamps({ M: o, def: t, lib: e }) {
  let n = () =>
      e("lampGlow", () => {
        let p = $j();
        return new THREE.MeshStandardMaterial({
          color: 16777215,
          map: p.map,
          emissive: 16777215,
          emissiveMap: p.em,
          emissiveIntensity: (qm * o.lampShade.emissiveIntensity) / 1.05,
          normalMap: p.nrm,
          normalScale: new THREE.Vector2(0.8, 0.8),
          roughness: 0.74,
          metalness: 0,
        });
      }),
    i = () =>
      e(
        "crystal",
        () =>
          new D9({
            color: 16773598,
            metalness: 1,
            roughness: 0.07,
            emissive: 16761466,
            emissiveIntensity: 1.1,
          }),
      ),
    a = (p, x, g, b = 1, v = 0, y = 1) => {
      let M = ke(p, x),
        w = M.attributes.uv,
        T = p.length,
        [S, E] = vD(g),
        _ = [0];
      for (let R = 1; R < T; R++)
        _.push(
          _[R - 1] + Math.hypot(p[R][0] - p[R - 1][0], p[R][1] - p[R - 1][1]),
        );
      for (let R = 0; R <= x; R++)
        for (let C = 0; C < T; C++)
          w.setXY(
            R * T + C,
            (R / x) * b,
            lerp(S, E, lerp(v, y, _[C] / _[T - 1])),
          );
      return M;
    },
    r = (p, x, g, b, v) =>
      p.keep("bulb", x, n(), g, b, v, {
        uv: !0,
      }),
    l = (p, x) =>
      new THREE.SplineCurve(p.map((g) => oo(g[0], g[1])))
        .getPoints(x)
        .map((g) => [Math.max(0, g.x), g.y]),
    c = (p, x) => p.map((g) => [g[0], g[1] + x]),
    h = (p, x) =>
      new THREE.Shape([
        oo(-p / 2, -x / 2),
        oo(p / 2, -x / 2),
        oo(p / 2, x / 2),
        oo(-p / 2, x / 2),
      ]);
  function f(p, x, g, b, v, y, M = !0) {
    let S = g - x,
      E = (H) => b + ((v - b) * (H - x)) / S,
      _ = [0, Math.PI, 0],
      R = x + 0.013,
      C = g - 0.013,
      L = 0.0016,
      A = 0.0013,
      O = 0.013 / S;
    (r(
      p,
      a(
        [
          [E(R), R],
          [E(C), C],
        ],
        y,
        "shade",
        1,
        O,
        1 - O,
      ),
      null,
      _,
    ),
      r(
        p,
        a(
          [
            [E(C) - 0.0022, C],
            [E(R) - 0.0022, R],
          ],
          y,
          "liner",
          1,
          1 - O,
          O,
        ),
        null,
        _,
      ),
      r(
        p,
        a(
          [
            [E(R) - 0.0022, R],
            [b - 0.0022 - L, x + 0.003],
            ...(M
              ? [
                  [b - 0.0022 - 2e-4, x - A],
                  [b + 2e-4, x - A],
                ]
              : [[b - 0.0022 / 2, x - A - 3e-4]]),
            [b + L, x + 0.003],
            [E(R), R],
          ],
          y,
          "tape",
          6,
        ),
      ),
      r(
        p,
        a(
          [
            [E(C), C],
            [v + L, g - 0.003],
            ...(M
              ? [
                  [v + 2e-4, g + A],
                  [v - 0.0022 - 2e-4, g + A],
                ]
              : [[v - 0.0022 / 2, g + A + 3e-4]]),
            [v - 0.0022 - L, g - 0.003],
            [E(C) - 0.0022, C],
          ],
          y,
          "tape",
          6,
        ),
      ));
  }
  let u = (p, x, g, b, v = 0.0095) =>
    p.add(
      pe(
        ke(
          [
            [v, 0],
            [v - 4e-4, 0.0016],
            [v - 0.002, 0.0024],
            [0.0044, 0.002],
          ],
          8,
        ),
      ),
      x,
      [g, 0, b],
    );
  (t("floorLamp", null, (p) => {
    let x = o.brass,
      g = o.plasticBlack;
    (p.add(
      pe(
        ke(
          [
            [0.1535, 0],
            [0.1588, 0.0016],
            [0.1588, 0.0058],
            [0.1562, 0.0066],
          ],
          36,
        ),
      ),
      x,
    ),
      p.add(
        pe(
          ke(
            [
              [0.1562, 0.0066],
              [0.1562, 0.03],
              [0.1536, 0.0356],
              [0.147, 0.0386],
              [0.03, 0.04],
            ],
            36,
          ),
          40,
        ),
        o.marbleDark,
      ),
      p.add(
        pe(
          ke(
            [
              [0.047, 0.0392],
              [0.047, 0.0442],
              [0.044, 0.0464],
              [0.034, 0.0476],
              [0.0235, 0.057],
              [0.0185, 0.074],
              [0.0185, 0.08],
              [0.011, 0.0835],
            ],
            20,
          ),
        ),
        x,
      ),
      p.add(ks(0.011, 0.011, 1.21, 12, !0), x, [0, 0.087 + 0.605, 0]));
    for (let v of [0.5, 0.92])
      p.add(
        pe(
          ke(
            c(
              [
                [0.011, -0.016],
                [0.0138, -0.0135],
                [0.0138, -0.002],
                [0.0124, 0],
                [0.0138, 0.002],
                [0.0138, 0.0135],
                [0.011, 0.016],
              ],
              v,
            ),
            10,
          ),
        ),
        x,
      );
    (p.add(
      pe(
        ke(
          [
            [0.011, 1.29],
            [0.0138, 1.294],
            [0.0138, 1.302],
            [0.0115, 1.3045],
            [0.0115, 1.311],
            [0.0212, 1.333],
            [0.0212, 1.3445],
            [0.0192, 1.3465],
            [0.0192, 1.401],
            [0.0165, 1.4055],
          ],
          10,
        ),
      ),
      x,
    ),
      p.add(
        pe(new THREE.BoxGeometry(0.064, 0.0026, 0.011)),
        x,
        [0, 1.3465, 0],
      ));
    {
      let y = [Math.sin(0.9), Math.cos(0.9)];
      (p.rod(
        g,
        [y[0] * 0.018, 1.374, y[1] * 0.018],
        [y[0] * 0.034, 1.374, y[1] * 0.034],
        0.0026,
        4,
      ),
        p.rod(
          g,
          [y[0] * 0.033, 1.374, y[1] * 0.033],
          [y[0] * 0.042, 1.374, y[1] * 0.042],
          0.0062,
          8,
          0.0054,
        ));
    }
    let b = [
      [0.0285, 1.3475],
      [0.0295, 1.362],
      [0.04, 1.395],
      [0.052, 1.44],
      [0.054, 1.5],
      [0.046, 1.56],
      [0.026, 1.598],
      [0.006, 1.6095],
      [0, 1.6105],
    ];
    for (let v of [-1, 1])
      p.add(
        Qo(
          ra(
            b.map((y) => [y[0] * v, y[1], 0]),
            15,
          ),
          0.0021,
          4,
          !1,
          !1,
        ),
        x,
      );
    p.add(ks(0.013, 0.013, 0.0034, 8), x, [0, 1.6118, 0]);
    for (let v = 0; v < 3; v++) {
      let y = (v / 3) * TAU + 0.52;
      p.rod(
        x,
        [Math.sin(y) * 0.011, 1.612, Math.cos(y) * 0.011],
        [Math.sin(y) * 0.1625, 1.627, Math.cos(y) * 0.1625],
        0.002,
        4,
      );
    }
    (p.add(
      pe(
        ke(
          [
            [0.009, 1.6135],
            [0.009, 1.619],
            [0.0044, 1.6215],
            [0.0044, 1.6255],
            [0.0086, 1.6296],
            [0.013, 1.6385],
            [0.0138, 1.6455],
            [0.0116, 1.654],
            [0.0055, 1.6635],
            [0, 1.671],
          ],
          10,
        ),
      ),
      x,
    ),
      r(
        p,
        a(
          c(
            [
              [0.0135, 0],
              [0.0135, 0.012],
              [0.019, 0.03],
              [0.027, 0.052],
              [0.03, 0.072],
              [0.0285, 0.09],
              [0.021, 0.108],
              [0.01, 0.118],
              [0, 0.121],
            ],
            1.404,
          ),
          8,
          "glass",
        ),
      ),
      f(p, 1.32, 1.63, 0.2, 0.165, 36, !1));
    {
      let v = (y, M) => [0.5 * y, M, -0.866 * y];
      (p.rod(g, v(0.153, 0.018), v(0.1645, 0.018), 0.0056, 6, 0.0046),
        p.add(
          Qo(
            ra(
              [
                v(0.162, 0.018),
                v(0.172, 0.0172),
                v(0.1815, 0.0115),
                v(0.1862, 0.004),
                v(0.187, -0.005),
              ],
              7,
            ),
            0.003,
            5,
          ),
          g,
        ),
        u(p, x, 0.5 * 0.187, -0.866 * 0.187, 0.0105));
    }
    return rs("floorLamp", [0.4, 1.67, 0.4], {
      surf: "metal",
      dynamic: !0,
      mass: 7,
      breakable: "bulb",
      light: {
        pos: [0, 1.48, 0],
        color: 16757866,
        intensity: 1,
        range: 6,
      },
    });
  }),
    t(
      "tableLamp",
      (p) => (p.variant ? 1 : 0),
      (p, x) => {
        let g = o.brass,
          b = o.plasticBlack;
        (p.add(
          pe(
            ke(
              [
                [0.075, 0],
                [0.08, 0.002],
                [0.08, 0.0072],
                [0.0765, 0.0104],
                [0.058, 0.012],
              ],
              22,
            ),
          ),
          g,
        ),
          p.add(
            ke(
              [
                [0.0605, 0.012],
                ...l(
                  [
                    [0.0612, 0.0135],
                    [0.0585, 0.022],
                    [0.0565, 0.034],
                    [0.064, 0.06],
                    [0.0815, 0.1],
                    [0.0935, 0.146],
                    [0.0905, 0.188],
                    [0.075, 0.23],
                    [0.051, 0.264],
                    [0.0345, 0.284],
                    [0.0292, 0.293],
                    [0.0286, 0.3],
                  ],
                  11,
                ),
              ],
              20,
            ),
            x.variant ? o.ceramicBlack : o.ceramicWhite,
          ),
          p.add(
            pe(
              ke(
                [
                  [0.0304, 0.291],
                  [0.0342, 0.2945],
                  [0.0342, 0.3005],
                  [0.03, 0.304],
                  [0.019, 0.3068],
                  [0.013, 0.312],
                  [0.013, 0.3262],
                  [0.0185, 0.3315],
                  [0.0185, 0.3735],
                  [0.015, 0.3772],
                ],
                10,
              ),
            ),
            g,
          ));
        {
          let y = [Math.sin(1), Math.cos(1)];
          (p.rod(
            b,
            [y[0] * 0.017, 0.353, y[1] * 0.017],
            [y[0] * 0.031, 0.353, y[1] * 0.031],
            0.0024,
            4,
          ),
            p.rod(
              b,
              [y[0] * 0.03, 0.353, y[1] * 0.03],
              [y[0] * 0.038, 0.353, y[1] * 0.038],
              0.0056,
              8,
              0.005,
            ));
        }
        p.add(ks(0.0245, 0.0245, 0.0022, 8), g, [0, 0.3318, 0]);
        for (let v = 0; v < 3; v++) {
          let y = (v / 3) * TAU + 0.52;
          p.rod(
            g,
            [Math.sin(y) * 0.022, 0.3318, Math.cos(y) * 0.022],
            [Math.sin(y) * 0.1565, 0.3322, Math.cos(y) * 0.1565],
            0.0019,
            4,
          );
        }
        return (
          r(
            p,
            a(
              c(
                [
                  [0.0125, 0],
                  [0.0125, 0.008],
                  [0.017, 0.016],
                  [0.0235, 0.03],
                  [0.0255, 0.043],
                  [0.023, 0.056],
                  [0.015, 0.064],
                  [0, 0.067],
                ],
                0.376,
              ),
              8,
              "glass",
            ),
          ),
          f(p, 0.33, 0.55, 0.16, 0.125, 28, !1),
          p.rod(b, [0, 0.0058, -0.076], [0, 0.0058, -0.0835], 0.0048, 5, 0.004),
          p.add(
            Qo(
              ra(
                [
                  [0, 0.0058, -0.082],
                  [5e-4, 0.0052, -0.093],
                  [0.005, 0.0034, -0.106],
                  [0.013, 0.003, -0.119],
                  [0.0165, 0.0032, -0.131],
                  [0.0168, 0.001, -0.1375],
                  [0.0168, -0.006, -0.139],
                ],
                9,
              ),
              0.0027,
              4,
            ),
            b,
          ),
          u(p, b, 0.0168, -0.139),
          rs("tableLamp", [0.32, 0.55, 0.32], {
            surf: "ceramic",
            dynamic: !0,
            mass: 2.5,
            breakable: "bulb",
            light: {
              pos: [0, 0.44, 0],
              color: 16757866,
              intensity: 0.7,
              range: 4.5,
            },
          })
        );
      },
    ),
    t(
      "pendantLamp",
      (p) => (p.drop || 1).toFixed(2),
      (p, x) => {
        let g = x.drop || 1,
          b = o.brass;
        p.add(
          pe(
            ke(
              [
                [0.0046, -0.047],
                [0.0078, -0.046],
                [0.0078, -0.035],
                [0.012, -0.0315],
                [0.031, -0.029],
                [0.046, -0.022],
                [0.052, -0.012],
                [0.052, -0.0062],
                [0.056, -0.0052],
                [0.056, 0],
              ],
              14,
            ),
          ),
          b,
        );
        for (let y of [-1, 1])
          p.add(
            pe(ks(0.0022, 0.0038, 0.0026, 6)),
            b,
            [y * 0.0505, -0.0165, 0],
            [0, 0, -y * 1.2],
          );
        (p.add(ks(0.0036, 0.0036, g - 0.31, 6, !0), o.blackMetal, [
          0,
          -(g - 0.31) / 2 - 0.045,
          0,
        ]),
          p.add(
            pe(
              ke(
                c(
                  [
                    [0.0086, 0.258],
                    [0.0086, 0.266],
                    [0.006, 0.2685],
                    [0.0037, 0.29],
                  ],
                  -g,
                ),
                6,
              ),
            ),
            o.blackMetal,
          ));
        let v = [
          [0.1712, -0.0185],
          [0.1752, -0.0215],
          [0.1808, -0.0178],
          [0.1802, -0.0105],
          ...l(
            [
              [0.1792, -0.006],
              [0.1765, 0.03],
              [0.165, 0.07],
              [0.145, 0.112],
              [0.115, 0.15],
              [0.08, 0.18],
              [0.05, 0.197],
            ],
            7,
          ),
          [0.041, 0.2],
          [0.041, 0.206],
          [0.026, 0.213],
          [0.022, 0.224],
          [0.022, 0.235],
          [0.0135, 0.2385],
          [0.0096, 0.258],
        ];
        return (
          p.add(pe(ke(c(v, -g), 28)), b),
          r(
            p,
            a(
              c(
                [
                  [0.018, 0.187],
                  [0.06, 0.18],
                  [0.113, 0.138],
                  [0.152, 0.085],
                  [0.172, 0.03],
                  [0.176, -0.002],
                  [0.1712, -0.0185],
                ],
                -g,
              ),
              28,
              "refl",
              1,
              1,
              0,
            ),
          ),
          p.add(
            pe(
              ke(
                c(
                  [
                    [0.0145, 0.118],
                    [0.0185, 0.12],
                    [0.0185, 0.164],
                    [0.022, 0.168],
                    [0.022, 0.188],
                  ],
                  -g,
                ),
                8,
              ),
            ),
            b,
          ),
          r(
            p,
            a(
              c(
                [
                  [0, 0.026],
                  [0.02, 0.0315],
                  [0.036, 0.047],
                  [0.0425, 0.07],
                  [0.036, 0.092],
                  [0.022, 0.106],
                  [0.014, 0.114],
                  [0.014, 0.121],
                ],
                -g,
              ),
              10,
              "glass",
              1,
              1,
              0,
            ),
          ),
          rs("pendantLamp", [0.36, g + 0.02, 0.36], {
            surf: "metal",
            ceiling: !0,
            mass: 3,
            breakable: "bulb",
            light: {
              pos: [0, -g - 0.04, 0],
              color: 16757866,
              intensity: 1,
              range: 6,
            },
          })
        );
      },
    ));
  function d(p, x, g, b, v) {
    let y = p * 2,
      M = [],
      w = [],
      T = [],
      [S, E] = vD("tube");
    for (let C = 0; C <= y; C++) {
      let L = Math.PI + (C / y) * TAU,
        A = C % 2 ? g : x,
        O = C / 2 / MD;
      if (
        (M.push(
          Math.sin(L) * A,
          b,
          Math.cos(L) * A,
          Math.sin(L) * A,
          v,
          Math.cos(L) * A,
        ),
        w.push(O, S, O, E),
        C < y)
      ) {
        let H = C * 2;
        T.push(H, H + 2, H + 1, H + 1, H + 2, H + 3);
      }
    }
    let _ = new THREE.BufferGeometry();
    (_.setAttribute("position", new THREE.Float32BufferAttribute(M, 3)),
      _.setAttribute("uv", new THREE.Float32BufferAttribute(w, 2)),
      _.setIndex(T),
      _.computeVertexNormals());
    let R = _.attributes.normal;
    for (let C of [0, 1]) {
      let L = R.getX(C) + R.getX(y * 2 + C),
        A = R.getZ(C) + R.getZ(y * 2 + C),
        O = Math.hypot(L, A) || 1;
      (R.setXYZ(C, L / O, 0, A / O), R.setXYZ(y * 2 + C, L / O, 0, A / O));
    }
    return _;
  }
  t("wallSconce", null, (p) => {
    let x = o.brass,
      g = 0.088,
      b = new THREE.Shape(),
      v = [
        [0.027, 0.18],
        [0.027, 0.167],
        [0.036, 0.167],
        [0.036, 0.152],
        [0.045, 0.152],
      ];
    ([
      ...v.map(([S, E]) => [S, -E]),
      ...v.slice().reverse(),
      ...v.map(([S, E]) => [-S, E]),
      ...v
        .slice()
        .reverse()
        .map(([S, E]) => [-S, -E]),
    ].forEach((S, E) => (E ? b.lineTo(S[0], S[1]) : b.moveTo(S[0], S[1]))),
      p.add(Fr(b, 0.006, 0.0015, 1, 1), x),
      p.add(Fr(h(0.07, 0.268), 0.0062, 0.0018, 1, 1), x, [0, 0, 0.0058]));
    for (let S of [-1, 1])
      for (let E of [-1, 1])
        p.add(
          pe(ks(0.0016, 0.003, 0.0018, 5)),
          x,
          [E * 0.0402, S * 0.108, 0.0067],
          [Math.PI / 2, 0, 0],
        );
    let M = new THREE.Shape();
    [
      [0.008, 0.1545],
      [0.062, 0.1545],
      [0.062, 0.1715],
      [0.038, 0.1715],
      [0.038, 0.1775],
      [0.023, 0.1775],
      [0.023, 0.1835],
      [0.008, 0.1835],
    ].forEach((S, E) => (E ? M.lineTo(S[0], S[1]) : M.moveTo(S[0], S[1])));
    let w = pe(
      ke(
        [
          [0.0395, 0.1492],
          [0.0436, 0.1484],
          [0.047, 0.151],
          [0.047, 0.163],
          [0.0392, 0.166],
          [0.0392, 0.174],
          [0.0302, 0.177],
          [0.0302, 0.183],
          [0.013, 0.186],
          [0.0086, 0.19],
          [0.0122, 0.1945],
          [0, 0.2],
        ],
        14,
      ),
    );
    for (let S of [1, -1])
      p.at(null, null, [1, S, 1], () => {
        (p.add(pe(Wm(M, 0.02, 0.0012, 1)), x), p.add(w, x, [0, 0, g]));
        for (let E of [-1, 1])
          p.add(new THREE.BoxGeometry(0.011, 0.0075, 0.01), x, [
            E * 0.0505,
            0.157,
            g,
          ]);
      });
    let T = new THREE.Shape();
    [
      [-0.012, -0.187],
      [0, -0.187],
      [0, -0.1995],
      [0.012, -0.1995],
      [0.012, 0.1995],
      [0, 0.1995],
      [0, 0.187],
      [-0.012, 0.187],
    ].forEach((S, E) => (E ? T.lineTo(S[0], S[1]) : T.moveTo(S[0], S[1])));
    for (let S of [-1, 1])
      p.add(pe(Wm(T, 0.005, 9e-4, 1)), x, [S * 0.058, 0, g]);
    return (
      r(p, d(16, 0.04, 0.0368, -0.151, 0.151), [0, 0, g]),
      rs("wallSconce", [0.13, 0.4, 0.14], {
        surf: "metal",
        wall: !0,
        mountY: 1.75,
        mass: 2,
        breakable: "bulb",
        light: {
          pos: [0, 0, 0.16],
          color: 16757866,
          intensity: 0.6,
          range: 4,
        },
      })
    );
  });
  function m(p, x, g = 0.13, b = 0.04) {
    let v = [
        [p / 2, 0],
        [p / 4, x / 2],
        [-p / 4, x / 2],
        [-p / 2, 0],
        [-p / 4, -x / 2],
        [p / 4, -x / 2],
      ],
      y = [];
    for (let w = 0; w < 6; w++) {
      let [T, S] = v[w],
        [E, _] = v[(w + 1) % 6];
      (y.push(0, 0, 0, T, -b, S, E, -b, _),
        y.push(
          T,
          -b,
          S,
          T,
          -1 + g,
          S,
          E,
          -b,
          _,
          E,
          -b,
          _,
          T,
          -1 + g,
          S,
          E,
          -1 + g,
          _,
        ),
        y.push(T, -1 + g, S, 0, -1, 0, E, -1 + g, _));
    }
    let M = new THREE.BufferGeometry();
    return (
      M.setAttribute("position", new THREE.Float32BufferAttribute(y, 3)),
      Eb(M) < 0 && q2(M),
      M.computeVertexNormals(),
      M
    );
  }
  (t("chandelier", null, (p) => {
    let x = o.brass,
      g = i(),
      b = createRandom(1931),
      v = (C, L, A, O) => p.keep("bulb", C, g, L, A, O);
    p.add(
      pe(
        ke(
          [
            [0.013, -0.118],
            [0.022, -0.115],
            [0.022, -0.104],
            [0.03, -0.098],
            [0.03, -0.09],
            [0.045, -0.078],
            [0.07, -0.07],
            [0.078, -0.064],
            [0.078, -0.05],
            [0.098, -0.044],
            [0.105, -0.038],
            [0.105, -0.016],
            [0.118, -0.012],
            [0.125, -0.008],
            [0.125, 0],
          ],
          32,
        ),
      ),
      x,
    );
    for (let C = 0; C < 4; C++) {
      let L = (C / 4) * TAU + 0.4;
      p.add(dr(0.0058, 6, 4), x, [
        Math.sin(L) * 0.088,
        -0.0475,
        Math.cos(L) * 0.088,
      ]);
    }
    p.add(ks(0.013, 0.013, 1.13, 10, !0), x, [0, -0.118 - 0.565, 0]);
    let y = [
      [0.013, -0.05],
      [0.019, -0.046],
      [0.019, -0.036],
      [0.015, -0.032],
      [0.024, -0.022],
      [0.031, -0.008],
      [0.031, 0.008],
      [0.024, 0.022],
      [0.015, 0.032],
      [0.019, 0.036],
      [0.019, 0.046],
      [0.013, 0.05],
    ];
    for (let C of [-0.42, -0.8]) p.add(pe(ke(c(y, C), 16)), x);
    (p.add(
      pe(
        ke(
          [
            [0.01, -1.642],
            [0.02, -1.637],
            [0.026, -1.62],
            [0.05, -1.61],
            [0.056, -1.6],
            [0.056, -1.588],
            [0.04, -1.58],
            [0.032, -1.56],
            [0.032, -1.54],
            [0.045, -1.52],
            [0.06, -1.48],
            [0.064, -1.44],
            [0.058, -1.4],
            [0.042, -1.36],
            [0.03, -1.33],
            [0.03, -1.31],
            [0.07, -1.3],
            [0.076, -1.292],
            [0.076, -1.28],
            [0.05, -1.272],
            [0.028, -1.25],
            [0.02, -1.235],
            [0.013, -1.23],
          ],
          24,
        ),
      ),
      x,
    ),
      p.add(ks(0.0095, 0.0095, 0.66, 8, !0), x, [0, -1.97, 0]),
      p.add(
        pe(
          ke(
            [
              [0, -2.35],
              [0.018, -2.35],
              [0.03, -2.343],
              [0.15, -2.328],
              [0.158, -2.32],
              [0.158, -2.311],
              [0.15, -2.307],
              [0.03, -2.298],
              [0.0095, -2.288],
            ],
            24,
          ),
        ),
        x,
      ));
    let M = m(0.022, 0.011),
      w = new THREE.OctahedronGeometry(0.0088, 0).scale(1, 1.2, 1),
      T = (C, L, A, O, H, F = 1) => {
        let P = O + b.range(-0.5, 0.5),
          z = b.range(-0.035, 0.035),
          k = b.range(-0.035, 0.035);
        (v(w, [C, L - 0.0105 * F, A], [0, P + 0.6, 0], F),
          v(M, [C, L - 0.02 * F, A], [z, P, k], [F, H - 0.02 * F, F]));
      },
      S = pe(
        ke(
          [
            [0.0125, -0.03],
            [0.0145, -0.028],
            [0.0145, -0.004],
            [0.0105, 0],
            [0, 0],
          ],
          6,
        ),
      ),
      E = [
        [0, -0.108],
        [0.009, -0.104],
        [0.0155, -0.09],
        [0.0165, -0.07],
        [0.0145, -0.046],
        [0.011, -0.03],
      ],
      _ = [
        [-0.018, -0.03],
        [-0.014, -0.034],
        [0.014, -0.034],
        [0.018, -0.03],
        [0.018, -0.013],
        [0.022, -0.009],
        [0.022, 0.009],
        [0.018, 0.013],
        [0.018, 0.03],
        [0.014, 0.034],
        [-0.014, 0.034],
        [-0.018, 0.03],
        [-0.018, -0.03],
      ];
    [
      [1.2, -1.62, 80, 168, 8, [0.03, -0.8], 14],
      [0.82, -1.92, 56, 120, 6, [0.07, -1.29], 10],
      [0.45, -2.2, 40, 60, 6, [0.052, -1.594], 6],
    ].forEach(([C, L, A, O, H, F, P], z) => {
      p.add(
        pe(
          ke(
            _.map(([k, I]) => [C + k, L + I]),
            A,
          ),
          35,
        ),
        x,
      );
      for (let k = 0; k < H; k++) {
        let I = (k / H) * TAU + z * 0.5,
          G = Math.sin(I),
          K = Math.cos(I),
          $ = [G * F[0], F[1], K * F[0]],
          n0 = [G * C, L + 0.04, K * C],
          e0 = (p0) => [
            lerp($[0], n0[0], p0),
            lerp($[1], n0[1], p0),
            lerp($[2], n0[2], p0),
          ];
        (p.rod(x, $, n0, 0.0034, 6),
          p.rod(x, e0(0.8), e0(0.8 + 0.06 / C), 0.0068, 6),
          p.add(ks(0.005, 0.0075, 0.016, 6), x, [G * C, L + 0.041, K * C]));
      }
      for (let k = 0; k < O; k++) {
        let I = (k / O) * TAU,
          G = 0.3 + 0.14 * Math.cos(I * 6 + z) + (k % 2) * 0.07;
        T(
          Math.sin(I) * C,
          L - 0.034,
          Math.cos(I) * C,
          I,
          Math.min(G, 2.735 + L - 0.034),
        );
      }
      for (let k = 0; k < P; k++) {
        let I = ((k + 0.5) / P) * TAU + z * 0.5,
          G = Math.sin(I),
          K = Math.cos(I),
          $ = C - 0.056;
        (p.add(
          new THREE.BoxGeometry(0.01, 0.007, 0.042),
          x,
          [G * (C - 0.036), L - 0.027, K * (C - 0.036)],
          [0, I, 0],
        ),
          p.add(S, x, [G * $, L - 0.024, K * $]),
          r(p, a(E, 6, "glass", 1, 1, 0.1), [G * $, L - 0.024, K * $]));
      }
    });
    for (let C = 0; C < 22; C++) {
      let L = (C / 22) * TAU;
      T(
        Math.sin(L) * 0.15,
        -2.328,
        Math.cos(L) * 0.15,
        L,
        0.2 + (C % 2) * 0.07 + 0.05 * Math.cos(L * 2),
      );
    }
    for (let C = 0; C < 9; C++) {
      let L = (C / 9) * TAU + 0.2;
      T(
        Math.sin(L) * 0.08,
        -2.338,
        Math.cos(L) * 0.08,
        L,
        0.3 + (C % 2) * 0.05,
      );
    }
    return (
      v(w, [0, -2.362, 0], null, 1.5),
      v(
        uD(
          ke(
            [
              [0, -2.728],
              [0.02, -2.67],
              [0.036, -2.59],
              [0.03, -2.49],
              [0.014, -2.4],
              [0, -2.376],
            ],
            8,
          ),
        ),
        null,
        [0, 0.2, 0],
      ),
      rs("chandelier", [2.44, 2.72, 2.44], {
        surf: "metal",
        ceiling: !0,
        mass: 120,
        breakable: "bulb",
        light: {
          pos: [0, -2, 0],
          color: 16761466,
          intensity: 3,
          range: 14,
        },
      })
    );
  }),
    t(
      "exitSign",
      (p) => (p.ceiling ? "c" : "w"),
      (p, x) => {
        let g = o.blackMetal,
          b = o.brass,
          v = n(),
          y = {
            color: 5111706,
            intensity: 0.3,
            range: 3,
          },
          M = cc(0.332, 0.161, hu(Sb[0], Sb[1], Sb[2], Sb[3], pr, Eg)),
          w = Dl(0.352, 0.182, [
            [0, 0],
            [0, 0.0035],
            [0.002, 0.0055],
            [0.009, 0.0055],
            [0.011, 0.0035],
            [0.011, 0],
          ]),
          T = (E, _) =>
            p.at([0, 0, 0], [0, _, 0], null, () => {
              (p.add(w, b, [0, 0, E]),
                p.add(M, v, [0, 0, E + 0.0016], null, null, !0));
            }),
          S = (E, _) => {
            (p.add(ks(0.004, 0.004, 0.003, 6), b, [0.135, E - 0.0012, _]),
              p.add(
                cc(0.007, 0.007, hu(_b[0], _b[1], _b[2], _b[3], pr, Eg)),
                v,
                [0.118, E - 4e-4, _],
                [Math.PI / 2, 0, 0],
                null,
                !0,
              ));
          };
        if (x.ceiling) {
          p.add(fi(h(0.3, 0.038), 0.007, 0.002, 1, 1), g, [0, -0.007, 0]);
          for (let E of [-1, 1])
            (p.add(ks(0.0052, 0.0052, 0.114, 6, !0), b, [E * 0.12, -0.064, 0]),
              p.add(
                pe(
                  ke(
                    [
                      [0.0052, -0.022],
                      [0.0085, -0.02],
                      [0.0085, -0.0105],
                      [0.013, -0.009],
                      [0.013, -0.007],
                    ],
                    6,
                  ),
                ),
                b,
                [E * 0.12, 0, 0],
              ),
              p.add(
                pe(
                  ke(
                    [
                      [0.0105, -0.1205],
                      [0.0105, -0.117],
                      [0.0075, -0.1155],
                      [0.0052, -0.11],
                    ],
                    6,
                  ),
                ),
                b,
                [E * 0.12, 0, 0],
              ));
          return (
            p.add(
              Fr(h(0.36, 0.19), 0.046, 0.004, 1, 1),
              g,
              [0, -0.215, -0.023],
            ),
            T(0.023, 0),
            T(0.023, Math.PI),
            p.parts.slice(-4).forEach((E) => {
              E.m = new THREE.Matrix4()
                .makeTranslation(0, -0.215, 0)
                .multiply(E.m);
            }),
            S(-0.31, 0),
            rs("exitSign", [0.36, 0.31, 0.05], {
              surf: "plastic",
              ceiling: !0,
              mass: 1.5,
              light: {
                ...y,
                pos: [0, -0.22, 0],
              },
            })
          );
        }
        return (
          p.add(Fr(h(0.36, 0.19), 0.046, 0.004, 1, 1), g),
          T(0.046, 0),
          p.add(
            Qo(
              ra(
                [
                  [0.1, 0.092, 0.03],
                  [0.1, 0.108, 0.029],
                  [0.1, 0.119, 0.02],
                  [0.1, 0.121, 0],
                ],
                5,
              ),
              0.007,
              6,
            ),
            g,
          ),
          p.add(
            pe(
              ke(
                [
                  [0.0098, 0.094],
                  [0.0098, 0.1],
                  [0.0078, 0.1015],
                ],
                6,
              ),
            ),
            b,
            [0.1, 0, 0.03],
          ),
          S(-0.095, 0.03),
          rs("exitSign", [0.36, 0.19, 0.05], {
            surf: "plastic",
            wall: !0,
            mountY: 2.35,
            mass: 1.5,
            light: {
              ...y,
              pos: [0, 0, 0.15],
            },
          })
        );
      },
    ));
}

export { registerLamps };

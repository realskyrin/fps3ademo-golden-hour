// scene/props/decorative.js: recovered from the verified GOLDEN HOUR release.
import { THREE } from "../../vendor/three-r180.js";
import {
  $s,
  De,
  Dl,
  Fr,
  Hd,
  Sa,
  Te,
  _i,
  cc,
  di,
  fi,
  hu,
  iw,
  ke,
  ks,
  ll,
  oo,
  pe,
  q2,
  qa,
  rc,
  rs,
  ui,
  zs,
} from "../geometry.js";
import {
  TAU,
  clamp,
  createCanvas,
  createNoise,
  createRandom,
} from "../../core/math.js";

function bD(o) {
  let t = o.index ? o.toNonIndexed() : o,
    e = t.attributes.position.array,
    s = t.attributes.uv ? t.attributes.uv.array : null,
    n = [],
    i = [];
  for (let r = 0, l = 0; r < e.length; r += 9, l += 6) {
    let c = e[r + 3] - e[r],
      h = e[r + 4] - e[r + 1],
      f = e[r + 5] - e[r + 2],
      u = e[r + 6] - e[r],
      d = e[r + 7] - e[r + 1],
      m = e[r + 8] - e[r + 2],
      p = h * m - f * d,
      x = f * u - c * m,
      g = c * d - h * u;
    if (!(p * p + x * x + g * g < 1e-18)) {
      for (let b = 0; b < 9; b++) n.push(e[r + b]);
      if (s) for (let b = 0; b < 6; b++) i.push(s[l + b]);
    }
  }
  let a = new THREE.BufferGeometry();
  return (
    a.setAttribute("position", new THREE.Float32BufferAttribute(n, 3)),
    s && a.setAttribute("uv", new THREE.Float32BufferAttribute(i, 2)),
    a
  );
}
var ji = (o, t = 24, e = 40) => pe(bD(ke(o, t)), e);
function z9(o, t = 1, e = 0, s = 0) {
  let n = o.attributes.position,
    i = new Float32Array(n.count * 2);
  for (let a = 0; a < n.count; a++)
    ((i[a * 2] = e + n.getX(a) * t), (i[a * 2 + 1] = s + n.getZ(a) * t));
  return (o.setAttribute("uv", new THREE.BufferAttribute(i, 2)), o);
}
var Xj = (o, t, e) =>
  e > 0
    ? [
        [-o / 2 + e, -t / 2],
        [o / 2 - e, -t / 2],
        [o / 2, -t / 2 + e],
        [o / 2, t / 2 - e],
        [o / 2 - e, t / 2],
        [-o / 2 + e, t / 2],
        [-o / 2, t / 2 - e],
        [-o / 2, -t / 2 + e],
      ]
    : [
        [-o / 2, -t / 2],
        [o / 2, -t / 2],
        [o / 2, t / 2],
        [-o / 2, t / 2],
      ];
var xD = new THREE.Vector3(0, 0, 1);
var _o0 = new THREE.Vector3(1, 0, 0);
var L9 = (o, t, e, s, n = 0.002, i = qa, a = !0) =>
  _i(Xj(e, s, n), [o, t], {
    closed: !1,
    up: i,
    caps: a,
  });
function Yj(o, t, e, s = 6, n = e) {
  let i = De(o[0], o[1], o[2]),
    a = De(t[0], t[1], t[2]),
    r = a.clone().sub(i),
    l = r.length(),
    c = new THREE.Matrix4().compose(
      i.add(a).multiplyScalar(0.5),
      new THREE.Quaternion().setFromUnitVectors(qa, r.normalize()),
      De(1, 1, 1),
    );
  return ks(n, e, l, s, !0).applyMatrix4(c);
}
function hc(o, t = "out", e = 40) {
  let s = o[0].length,
    n = [],
    i = new THREE.Vector3();
  for (let l of o) for (let c of l) i.add(c);
  i.multiplyScalar(1 / (s * o.length));
  let a = 0;
  for (let l = 0; l < o.length - 1; l++)
    for (let c = 0; c < s; c++) {
      let h = o[l][c],
        f = o[l][(c + 1) % s],
        u = o[l + 1][(c + 1) % s],
        d = o[l + 1][c];
      n.push(
        h.x,
        h.y,
        h.z,
        f.x,
        f.y,
        f.z,
        u.x,
        u.y,
        u.z,
        h.x,
        h.y,
        h.z,
        u.x,
        u.y,
        u.z,
        d.x,
        d.y,
        d.z,
      );
      let m = u.x - h.x,
        p = u.y - h.y,
        x = u.z - h.z,
        g = d.x - f.x,
        b = d.y - f.y,
        v = d.z - f.z,
        y = p * v - x * b,
        M = x * g - m * v,
        w = m * b - p * g;
      a +=
        t === "up"
          ? M
          : t === "down"
            ? -M
            : y * ((h.x + u.x) / 2 - i.x) + w * ((h.z + u.z) / 2 - i.z);
    }
  let r = new THREE.BufferGeometry();
  return (
    r.setAttribute("position", new THREE.Float32BufferAttribute(n, 3)),
    a < 0 && q2(r),
    pe(bD(r), e)
  );
}
function Tb(o, t = [], e = o[0].y) {
  let s = (i) => i.map((a) => oo(a.x, -a.z)),
    n = new THREE.Shape(s(o));
  for (let i of t) n.holes.push(new THREE.Path(s(i)));
  return new THREE.ShapeGeometry(n).rotateX(-Math.PI / 2).translate(0, e, 0);
}
var jj = (o, t, e) => o.map((s) => De(s.x + t, s.y, s.z + e));
function registerDecorativeProps({
  M: o,
  L: t,
  def: e,
  lib: s,
  mt: n,
  fine: i,
  P: a,
}) {
  let r = (A) =>
      ji(
        [
          [0, -A / 2],
          [0.0034, -A / 2],
          [0.0046, -A / 2 + 0.0015],
          [0.0046, -A * 0.09],
          [0.0056, -A * 0.075],
          [0.0056, A * 0.075],
          [0.0046, A * 0.09],
          [0.0046, A / 2 - 0.0015],
          [0.0034, A / 2],
          [0, A / 2],
        ],
        10,
      ),
    l = ji(
      [
        [0, 0],
        [0.0095, 0],
        [0.0105, 0.0012],
        [0.0105, 0.0022],
        [0.006, 0.0042],
        [0.0042, 0.007],
        [0.0042, 0.019],
      ],
      12,
    );
  function c(A, O, H, F, P = 0.11) {
    for (let z of [-1, 1])
      A.add(l, o.brass, [O + z * P * 0.34, H, F], [Math.PI / 2, 0, 0]);
    A.add(r(P), o.brass, [O, H, F + 0.019], [0, 0, Math.PI / 2]);
  }
  (e(
    "coffeeTable",
    (A) => (A.variant ? 1 : 0),
    (A, O) => {
      if (O.variant) {
        let n0 = ji(
          [
            [0, 0.39],
            [0.4, 0.39],
            [0.484, 0.399],
            [0.496, 0.4045],
            [0.5, 0.41],
            [0.4988, 0.4152],
            [0.4945, 0.418],
            [0, 0.418],
          ],
          48,
          30,
        );
        (A.add(
          z9(n0, 1, 0.6 + 2.4, 0.6 + 1.2),
          o.marbleFloor,
          null,
          null,
          null,
          !0,
        ),
          A.add(
            ji(
              [
                [0, 0.3805],
                [0.366, 0.3805],
                [0.372, 0.3825],
                [0.372, 0.3905],
                [0, 0.3905],
              ],
              40,
            ),
            o.brass,
          ),
          A.add(
            Sa(0.33, 0.011, 6, 40),
            o.brass,
            [0, 0.011, 0],
            [Math.PI / 2, 0, 0],
          ),
          A.add(
            Sa(0.36, 0.0095, 6, 40),
            o.brass,
            [0, 0.372, 0],
            [Math.PI / 2, 0, 0],
          ));
        let e0 = 18,
          p0 = 0.82;
        for (let t0 = 0; t0 < e0; t0++)
          for (let M0 of [-1, 1]) {
            let f0 = (t0 / e0) * TAU,
              _0 = f0 + M0 * p0;
            A.add(
              Yj(
                [Math.sin(f0) * 0.33, 0.011, Math.cos(f0) * 0.33],
                [Math.sin(_0) * 0.36, 0.372, Math.cos(_0) * 0.36],
                0.0045,
                6,
              ),
              o.brass,
            );
          }
        return rs("coffeeTable", [1, 0.42, 1], {
          surf: "stone",
          mass: 40,
          colliders: [$s(-0.45, 0, -0.45, 0.45, 0.42, 0.45)],
        });
      }
      let H = 1.2,
        F = 0.62,
        P = 0.024,
        z = H / 2 - 0.035,
        k = F / 2 - 0.035,
        I = 0.394;
      (A.add(
        fi(ui(H, F, 0.008), 0.022, 0.0035, 3, 2),
        o.marbleDark,
        [0, 0.398, 0],
        null,
        null,
        [0.31, 0.17],
      ),
        A.add(zs(H - 0.08, 0.004, F - 0.08), o.blackMetal, [0, 0.396, 0]));
      let G = [
        [-0.01, -0.015],
        [0.0082, -0.015],
        [0.0082, -0.0128],
      ];
      for (let $ = 0; $ < 3; $++) {
        let n0 = -0.0083 + $ * 0.0083;
        (G.push([0.0098, n0 - 0.0031], [0.0116, n0], [0.0098, n0 + 0.0031]),
          $ < 2 && G.push([0.0084, n0 + 0.00415]));
      }
      G.push([0.0082, 0.0128], [0.0082, 0.015], [-0.01, 0.015]);
      for (let $ of [-1, 1])
        for (let n0 of [-1, 1]) {
          let e0 = $ * z,
            p0 = n0 * k;
          (A.add(L9([e0, 0.008, p0], [e0, I, p0], P, P, 0.003, xD), o.brass),
            A.add(
              ji(
                [
                  [0, 0],
                  [0.0085, 0],
                  [0.01, 0.0015],
                  [0.01, 0.0045],
                  [0.0065, 0.006],
                  [0.0065, 0.009],
                ],
                8,
              ),
              o.blackMetal,
              [e0, 0, p0],
            ),
            A.add(Sa(0.027, 0.0042, 5, 16), o.brass, [
              e0 - $ * (P / 2 + 0.027),
              I - 0.03 - 0.027,
              p0,
            ]),
            A.add(
              Sa(0.027, 0.0042, 5, 16),
              o.brass,
              [e0, I - 0.03 - 0.027, p0 - n0 * (P / 2 + 0.027)],
              [0, Math.PI / 2, 0],
            ));
        }
      let K = P / 2 - 0.001;
      for (let $ of [-1, 1])
        (A.add(
          _i(
            G,
            [
              [-$ * (z - K), I - 0.015, $ * k],
              [$ * (z - K), I - 0.015, $ * k],
            ],
            {
              closed: !1,
              caps: !1,
            },
          ),
          o.brass,
        ),
          A.add(
            L9(
              [-(z - K), 0.138, $ * k],
              [z - K, 0.138, $ * k],
              0.02,
              0.022,
              0.0025,
              qa,
              !1,
            ),
            o.brass,
          ),
          A.add(zs(H - 0.1 + 0.012, 0.003, 0.014), o.brass, [
            0,
            0.1295,
            $ * (k - 0.014),
          ]));
      for (let $ of [-1, 1])
        (A.add(
          _i(
            G,
            [
              [$ * z, I - 0.015, $ * (k - K)],
              [$ * z, I - 0.015, -$ * (k - K)],
            ],
            {
              closed: !1,
              caps: !1,
            },
          ),
          o.brass,
        ),
          A.add(
            L9(
              [$ * z, 0.138, -(k - K)],
              [$ * z, 0.138, k - K],
              0.02,
              0.022,
              0.0025,
              qa,
              !1,
            ),
            o.brass,
          ),
          A.add(zs(0.014, 0.003, F - 0.1 - 0.02), o.brass, [
            $ * (z - 0.014),
            0.1295,
            0,
          ]));
      return (
        A.add(
          Te(H - 0.1, 0.018, F - 0.1, 0.004),
          o.woodDark,
          [0, 0.14, 0],
          null,
          null,
          "x",
        ),
        rs("coffeeTable", [H, 0.42, F], {
          surf: "stone",
          mass: 45,
          colliders: [$s(-H / 2, 0, -F / 2, H / 2, 0.42, F / 2)],
        })
      );
    },
  ),
    e("sideTable", null, (A) => {
      (A.add(
        ji(
          [
            [0, 0],
            [0.144, 0],
            [0.15, 0.003],
            [0.15, 0.009],
            [0.146, 0.0125],
            [0.134, 0.0145],
            [0.07, 0.022],
            [0.034, 0.03],
            [0.026, 0.036],
            [0.026, 0.042],
            [0.0185, 0.046],
          ],
          28,
        ),
        o.brass,
      ),
        A.add(
          ji(
            [
              [0.0135, 0.044],
              [0.0135, 0.455],
              [0.0155, 0.459],
              [0.021, 0.466],
              [0.021, 0.472],
              [0.0155, 0.479],
              [0.0135, 0.483],
              [0.0135, 0.505],
            ],
            10,
          ),
          o.brass,
        ),
        A.add(
          ji(
            [
              [0.0135, 0.497],
              [0.026, 0.503],
              [0.085, 0.518],
              [0.196, 0.5275],
              [0.216, 0.529],
              [0.2225, 0.5305],
              [0.225, 0.534],
              [0.225, 0.556],
              [0.2238, 0.5584],
              [0.2188, 0.5584],
              [0.2182, 0.5574],
            ],
            28,
          ),
          o.brass,
        ));
      let O = ji(
        [
          [0.19, 0.529],
          [0.2185, 0.531],
          [0.2185, 0.558],
          [0, 0.558],
        ],
        32,
      );
      return (
        A.add(z9(O, 1, 0.83, 0.41), o.marbleDark, null, null, null, !0),
        rs("sideTable", [0.45, 0.56, 0.45], {
          surf: "stone",
          dynamic: !0,
          mass: 9,
        })
      );
    }));
  let h = (A, O, H, F, P, z) => {
      let k = (I, G) => {
        let K = [];
        for (let $ = 0; $ < P; $++)
          for (let n0 = 0; n0 < 4; n0++) {
            let e0 = (($ + n0 / 4) / P) * TAU,
              p0 = I - z * Math.sin((Math.PI * n0) / 4) * (n0 ? 1 : 0);
            K.push(De(Math.sin(e0) * p0, G, Math.cos(e0) * p0));
          }
        return K;
      };
      return hc([k(A, H), k(O, F)], "out", 34);
    },
    f = ji(
      [
        [0.074, 0],
        [0.1212, 0.0146],
        [0.122, 0.0158],
        [0.1185, 0.0166],
        [0.089, 0.0124],
        [0.067, 0.006],
        [0, 0.006],
      ],
      28,
      50,
    ),
    u = ji(
      [
        [0, 0],
        [0.031, 0],
        [0.0352, 0.002],
        [0.0352, 0.0045],
        [0.0125, 0.017],
        [0.011, 0.038],
        [0.0155, 0.044],
        [0.011, 0.05],
        [0.031, 0.066],
        [0.034, 0.075],
        [0.034, 0.0985],
        [0.0326, 0.1],
        [0.0312, 0.0985],
        [0.0312, 0.069],
        [0.027, 0.064],
        [0, 0.064],
      ],
      10,
    );
  e(
    "diningTable",
    (A) => (A.r || 0.55).toFixed(2),
    (A, O) => {
      let H = O.r || 0.55;
      (A.add(
        ji(
          [
            [0, 0],
            [0.266, 0],
            [0.28, 0.005],
            [0.28, 0.014],
            [0.262, 0.0235],
            [0.2, 0.041],
            [0.118, 0.054],
            [0.078, 0.09],
            [0.078, 0.108],
            [0.052, 0.118],
          ],
          22,
        ),
        o.brass,
      ),
        A.add(h(0.054, 0.047, 0.116, 0.602, 12, 0.0045), o.brass),
        A.add(
          ji(
            [
              [0.046, 0.6],
              [0.06, 0.606],
              [0.06, 0.618],
              [0.05, 0.624],
              [0.1, 0.674],
              [0.214, 0.705],
              [0.22, 0.7165],
            ],
            22,
          ),
          o.brass,
        ));
      let F = Math.min(1, 0.56 / H),
        P = Math.round(H * 100) % 4,
        z = ji(
          [
            [0.2, 0.716],
            [H - 0.075, 0.716],
            [H - 0.006, 0.7275],
            [H - 0.0052, 0.752],
            [0, 0.752],
          ],
          48,
          30,
        );
      (A.add(
        z9(z, F, 0.6 + P * 1.2, 0.6 + (P % 2) * 2.4),
        o.marbleFloor,
        null,
        null,
        null,
        !0,
      ),
        A.add(
          ji(
            [
              [H - 0.007, 0.7266],
              [H, 0.7276],
              [H, 0.7506],
              [H - 0.0012, 0.7526],
              [H - 0.0056, 0.7522],
            ],
            48,
          ),
          o.brass,
        ));
      let k = H < 0.5 ? 2 : 4;
      for (let I = 0; I < k; I++) {
        let G = (I / k) * TAU + Math.PI / 4;
        A.add(
          f,
          o.ceramicWhite,
          [Math.sin(G) * H * 0.62, 0.752, Math.cos(G) * H * 0.62],
          [0, G, 0],
        );
      }
      return (
        A.add(u, o.brass, [0, 0.752, 0]),
        rs("diningTable", [H * 2, 0.76, H * 2], {
          surf: "stone",
          mass: 60,
          colliders: [
            $s(-H * 0.8, 0.68, -H * 0.8, H * 0.8, 0.76, H * 0.8),
            $s(-0.14, 0, -0.14, 0.14, 0.68, 0.14),
          ],
        })
      );
    },
  );
  function d(A, O, H, F, P, z) {
    let k = [],
      I = A / 2 - H,
      G = O / 2 - H,
      K = ($) => [$ === 0 || $ === 3 ? I : -I, $ < 2 ? G : -G];
    for (let $ = 0; $ < 4; $++) {
      let [n0, e0] = K($),
        [p0, t0] = K(($ + 1) % 4);
      for (let Z0 = 0; Z0 <= 3; Z0++) {
        let lt = (($ + Z0 / 3) * Math.PI) / 2;
        k.push(De(n0 + Math.cos(lt) * H, z, e0 + Math.sin(lt) * H));
      }
      let M0 = (($ + 1) * Math.PI) / 2,
        f0 = Math.cos(M0),
        _0 = Math.sin(M0),
        F0 = n0 + f0 * H,
        m0 = e0 + _0 * H,
        S0 = p0 + f0 * H,
        T0 = t0 + _0 * H,
        j0 = Math.max(1, Math.round(Math.hypot(S0 - F0, T0 - m0) / F));
      for (let Z0 = 0; Z0 < j0; Z0++)
        for (let lt = Z0 ? 0 : 1; lt < 4; lt++) {
          let H0 = (Z0 + lt / 4) / j0,
            Y0 = P * Math.sin((Math.PI * lt) / 4);
          k.push(
            De(F0 + (S0 - F0) * H0 - f0 * Y0, z, m0 + (T0 - m0) * H0 - _0 * Y0),
          );
        }
    }
    return k;
  }
  let m = (A, O) => pe(q2(Tb(A, [], O).toNonIndexed()));
  (e("conferenceTable", null, (A) => {
    let z = i("leatherBlack"),
      k = ($, n0) => di(3.2 - 2 * $, 1.2 - 2 * $, 0.42 - $, n0, 14);
    (A.add(
      hc([
        k(0.03, 0.756 - 0.026),
        k(0.005, 0.756 - 0.026),
        k(0, 0.756 - 0.022),
        k(0, 0.756 - 0.004),
        k(0.0012, 0.756 - 0.0012),
        k(0.004, 0.756),
        k(0.075, 0.756),
      ]),
      o.woodDark,
      null,
      null,
      null,
      "x",
    ),
      A.add(hc([k(0.075, 0.756), k(0.0795, 0.756)], "up"), o.brass));
    let I = di(2.3, 0.24, 0.1, 0.756, 6),
      G = di(2.29, 0.23, 0.095, 0.756, 6);
    (A.add(Tb(k(0.0795, 0.756), [I]), o.woodDark, null, null, null, "x"),
      A.add(hc([I, G], "up"), o.brass));
    let K = ($, n0) =>
      di(0.43 - 2 * $, 0.118 - 2 * $, Math.max(0.004, 0.014 - $), n0, 3);
    (A.add(Tb(G, [K(0, 0.756)]), z),
      A.add(
        hc([
          K(0, 0.756),
          K(8e-4, 0.756 + 0.0022),
          K(0.0016, 0.756 + 0.003),
          K(0.0065, 0.756 + 0.003),
          K(0.0075, 0.756 + 0.0016),
        ]),
        o.brass,
      ),
      A.add(zs(0.004, 0.004, 0.103), o.brass, [0, 0.756 + 0.001, 0]));
    for (let $ of [-1, 1])
      (A.add(fi(ui(0.2045, 0.1028, 0.006), 0.004, 8e-4, 2, 1), o.blackMetal, [
        $ * 0.1048,
        0.756 - 0.0022,
        0,
      ]),
        A.add(
          ji(
            [
              [0.0062, 4e-4],
              [0.0112, 0],
              [0.0126, 0.001],
              [0.0126, 0.0022],
              [0.0108, 0.0032],
              [0.0078, 0.0032],
              [0.0062, 0.0014],
            ],
            12,
          ),
          o.rubber,
          [$ * 0.1, 0.756 + 0.0017, 0],
        ),
        A.add(zs(0.008, 6e-4, 0.034), o.rubber, [$ * 0.19, 0.756 + 0.0019, 0]));
    (A.add(hc([k(0.03, 0.756 - 0.031), k(0.03, 0.756 - 0.026)]), o.brass),
      A.add(
        hc([
          k(0.03, 0.756 - 0.031),
          k(0.022, 0.756 - 0.031),
          k(0.022, 0.756 - 0.044),
          k(0.11, 0.756 - 0.058),
        ]),
        o.woodDark,
        null,
        null,
        null,
        "x",
      ),
      A.add(
        m(k(0.11, 0.756 - 0.058), 0.756 - 0.058),
        o.woodDark,
        null,
        null,
        null,
        "x",
      ));
    for (let $ of [-1, 1])
      A.at([$ * 0.95, 0, 0], () => {
        (A.add(fi(ui(0.68, 0.56, 0.04), 0.03, 0.005, 4, 2), o.brass),
          A.add(
            hc(
              [
                d(0.62, 0.5, 0.035, 0.03, 0.006, 0.03),
                d(0.62, 0.5, 0.035, 0.03, 0.006, 0.628),
              ],
              "out",
              42,
            ),
            o.blackMetal,
          ));
        let n0 = (e0, p0) => di(0.62 + 2 * e0, 0.5 + 2 * e0, 0.035 + e0, p0, 3);
        (A.add(
          hc([
            n0(-0.008, 0.626),
            n0(0.003, 0.628),
            n0(0.004, 0.632),
            n0(0.004, 0.646),
            n0(0.003, 0.65),
            n0(-0.022, 0.652),
          ]),
          o.brass,
        ),
          A.add(hc([n0(-0.022, 0.65), n0(-0.022, 0.7)]), o.blackMetal));
      });
    return (
      A.add(Te(1.32, 0.085, 0.18, 0.012), o.blackMetal, [0, 0.6555, 0]),
      rs("conferenceTable", [3.2, 0.76, 1.2], {
        surf: "wood",
        mass: 180,
        colliders: [
          $s(-1.6, 0.66, -0.6, 1.6, 0.76, 0.6),
          $s(-1.26, 0, -0.25, -0.64, 0.66, 0.25),
          $s(0.64, 0, -0.25, 1.26, 0.66, 0.25),
        ],
      })
    );
  }),
    e("desk", null, (A) => {
      let H = i("leatherBlack"),
        F = (e0, p0) =>
          di(1.5 - 2 * e0, 0.7 - 2 * e0, Math.max(0.004, 0.016 - e0), p0, 4),
        P = (e0) =>
          jj(
            di(
              0.86 - 2 * e0,
              0.46 - 2 * e0,
              Math.max(0.003, 0.014 - e0),
              0.76,
              4,
            ),
            0,
            0.04,
          );
      (A.add(
        hc([
          F(0.03, 0.76 - 0.028),
          F(0.005, 0.76 - 0.028),
          F(0, 0.76 - 0.023),
          F(0, 0.76 - 0.006),
          F(0.002, 0.76 - 0.0015),
          F(0.006, 0.76),
        ]),
        o.woodDark,
        null,
        null,
        null,
        "x",
      ),
        A.add(Tb(F(0.006, 0.76), [P(0)]), o.woodDark, null, null, null, "x"),
        A.add(hc([P(0), P(0.014)], "up"), H),
        A.add(hc([P(0.014), P(0.0156)], "up"), o.brass),
        A.add(Tb(P(0.0156)), H),
        A.add(
          fi(ui(1.38, 0.6, 0.014), 0.108, 0.003, 3, 1),
          o.woodDark,
          [0, 0.624, 0],
          null,
          null,
          "x",
        ));
      let z = (e0, p0) => di(1.38 + 2 * e0, 0.6 + 2 * e0, 0.014 + e0, p0, 3);
      A.add(
        hc([z(0, 0.622), z(0.003, 0.623), z(0.003, 0.628), z(0, 0.629)]),
        o.brass,
      );
      let k = [
          [0, 0],
          [0.003, 0],
          [0.003, 0.0012],
          [0.0015, 0.002],
          [0, 0.0012],
        ],
        I = [
          [0, 0],
          [0.008, 0],
          [0.008, 0.002],
          [0.004, 0.0035],
          [0, 0.002],
        ];
      for (let e0 = -1; e0 <= 1; e0++)
        (A.add(
          Fr(ui(0.43, 0.078, 0.003), 0.01, 0.0025, 2, 2),
          o.woodDark,
          [e0 * 0.455, 0.678, 0.3],
          null,
          null,
          "x",
        ),
          A.add(Dl(0.4, 0.05, k), o.brass, [e0 * 0.455, 0.678, 0.31]),
          c(A, e0 * 0.455, 0.678, 0.31, 0.11));
      A.add(
        Dl(1.26, 0.072, I),
        o.woodDark,
        [0, 0.678, -0.3],
        [0, Math.PI, 0],
        null,
        "x",
      );
      for (let e0 of [-1, 1])
        A.add(
          Dl(0.48, 0.072, I),
          o.woodDark,
          [e0 * 0.69, 0.678, 0],
          [0, (e0 * Math.PI) / 2, 0],
          null,
          "z",
        );
      let G = Math.hypot(0.043, 0.63, 0.043),
        K = ji(
          [
            [0.0146, 0.06],
            [0.0262, G - 0.034],
            [0.0262, G],
          ],
          14,
        ),
        $ = ji(
          [
            [0, -0.002],
            [0.0118, -0.002],
            [0.0135, 0.002],
            [0.0145, 0.05],
            [0.0168, 0.052],
            [0.0168, 0.058],
            [0.0149, 0.0605],
          ],
          14,
        ),
        n0 = ji(
          [
            [0.0262, G - 0.036],
            [0.029, G - 0.034],
            [0.029, G - 0.026],
            [0.0262, G - 0.024],
          ],
          14,
        );
      for (let e0 of [-1, 1])
        for (let p0 of [-1, 1]) {
          let t0 = rc(
            De(e0 * 0.703, 0, p0 * 0.313),
            De(-e0 * 0.043, 0.63, -p0 * 0.043),
            xD,
          );
          (A.addM(K, o.woodDark, t0, "y"),
            A.addM($, o.brass, t0),
            A.addM(n0, o.brass, t0));
        }
      return rs("desk", [1.5, 0.76, 0.7], {
        surf: "wood",
        mass: 45,
        colliders: [$s(-0.75, 0.62, -0.35, 0.75, 0.76, 0.35)],
      });
    }));
  let p = ji(
    [
      [0, 0],
      [0.0085, 0],
      [0.011, 0.002],
      [0.0115, 0.01],
      [0.0165, 0.098],
      [0.0165, 0.104],
      [0.023, 0.108],
      [0.025, 0.112],
      [0.025, 0.1215],
    ],
    12,
  );
  e("nightstand", null, (A) => {
    for (let H of [-1, 1])
      for (let F of [-1, 1]) A.add(p, o.brass, [H * 0.2, 0, F * 0.16]);
    A.add(
      fi(ui(0.5, 0.42, 0.012), 0.42, 0.004, 3, 2),
      o.woodDark,
      [0, 0.12, 0],
      null,
      null,
      "y",
    );
    let O = (H, F) => di(0.5 + 2 * H, 0.42 + 2 * H, 0.012 + H, F, 3);
    (A.add(
      hc([
        O(-0.004, 0.5355),
        O(0.0025, 0.536),
        O(0.0025, 0.5405),
        O(-0.004, 0.541),
      ]),
      o.brass,
    ),
      A.add(
        fi(ui(0.53, 0.45, 0.008), 0.021, 0.003, 3, 2),
        o.marbleDark,
        [0, 0.541, 0],
        null,
        null,
        [0.2, 0.55],
      ));
    for (let H of [0.2305, 0.4295])
      (A.add(
        Fr(ui(0.466, 0.188, 0.004), 0.012, 0.003, 2, 2),
        o.woodDark,
        [0, H, 0.21],
        null,
        null,
        "x",
      ),
        c(A, 0, H + 0.03, 0.222, 0.13));
    return rs("nightstand", [0.53, 0.56, 0.45], {
      surf: "wood",
      mass: 16,
      colliders: [$s(-0.26, 0, -0.22, 0.26, 0.56, 0.22)],
    });
  });
  let x = Math.PI / 2,
    g = 1024,
    b = 1024,
    v = (A, O, H, F) => hu(A, O, H, F, g, b),
    y = {
      keys: v(0, 0, 704, 272),
      pad: v(2, 282, 252, 156),
      pages: v(266, 282, 252, 60),
      ports: v(528, 562, 128, 30),
      cover0: v(0, 460, 256, 360),
      cover1: v(264, 560, 256, 360),
    },
    M = (A) => v(528, 280 + A * 44, 480, 40),
    w = () =>
      s("tablesAtlas", () => {
        let A = createCanvas(g, b),
          O = A.getContext("2d"),
          H = createCanvas(g, b),
          F = H.getContext("2d"),
          P = createRandom(808);
        ((F.fillStyle = "#808080"), F.fillRect(0, 0, g, b));
        let z = (n0, e0, p0, t0, M0, f0) => {
          (n0.beginPath(),
            n0.moveTo(e0 + f0, p0),
            n0.lineTo(e0 + t0 - f0, p0),
            n0.quadraticCurveTo(e0 + t0, p0, e0 + t0, p0 + f0),
            n0.lineTo(e0 + t0, p0 + M0 - f0),
            n0.quadraticCurveTo(e0 + t0, p0 + M0, e0 + t0 - f0, p0 + M0),
            n0.lineTo(e0 + f0, p0 + M0),
            n0.quadraticCurveTo(e0, p0 + M0, e0, p0 + M0 - f0),
            n0.lineTo(e0, p0 + f0),
            n0.quadraticCurveTo(e0, p0, e0 + f0, p0),
            n0.closePath());
        };
        ((O.fillStyle = "#17181a"),
          O.fillRect(0, 0, 704, 272),
          (F.fillStyle = "#5a5a5a"),
          F.fillRect(0, 0, 704, 272));
        let k = [
            [14, 0.62],
            [14, 1],
            [14, 1],
            [13, 1],
            [12, 1],
            [9, 1],
          ],
          I = [
            "",
            "`1234567890-=",
            "QWERTYUIOP[]\\",
            "ASDFGHJKL;'",
            "ZXCVBNM,./",
            "",
          ],
          G = 8;
        (k.forEach(([n0, e0], p0) => {
          let t0 = 44 * e0,
            M0 = Array.from(
              {
                length: n0,
              },
              (F0, m0) =>
                p0 === 5
                  ? m0 === 4
                    ? 5.2
                    : 1
                  : p0 > 0 && (m0 === 0 || m0 === n0 - 1)
                    ? 1 + p0 * 0.28
                    : 1,
            ),
            f0 = M0.reduce((F0, m0) => F0 + m0, 0),
            _0 = 8;
          (M0.forEach((F0, m0) => {
            let S0 = ((688 - (n0 - 1) * 5) * F0) / f0;
            ((O.fillStyle = "#0b0b0c"),
              z(O, _0, G, S0, t0 - 5, 4),
              O.fill(),
              (O.strokeStyle = "rgba(255,255,255,0.08)"),
              (O.lineWidth = 1),
              O.stroke(),
              (F.fillStyle = "#c8c8c8"),
              z(F, _0, G, S0, t0 - 5, 5),
              F.fill(),
              (F.fillStyle = "#b4b4b4"),
              z(F, _0 + 4, G + 4, S0 - 8, t0 - 13, 4),
              F.fill());
            let T0 = I[p0][m0 - (p0 > 0 && p0 < 5 ? (p0 === 1 ? 0 : 1) : 99)];
            ((O.fillStyle = "rgba(214,218,224,0.82)"),
              (O.font = `600 ${p0 === 0 ? 9 : 15}px "Segoe UI", Arial, sans-serif`),
              (O.textAlign = "left"),
              (O.textBaseline = "top"),
              T0
                ? O.fillText(T0, _0 + 6, G + 5)
                : (p0 !== 5 || m0 !== 4) &&
                  O.fillRect(
                    _0 + 6,
                    G + (t0 - 5) / 2 - 1,
                    Math.min(14, S0 - 12),
                    2,
                  ),
              (_0 += S0 + 5));
          }),
            (G += t0));
        }),
          (O.fillStyle = "#9a9da1"),
          O.fillRect(0, 280, 256, 160),
          (O.strokeStyle = "rgba(20,20,22,0.55)"),
          (O.lineWidth = 3),
          z(O, 3, 283, 250, 154, 10),
          O.stroke(),
          (F.fillStyle = "#6c6c6c"),
          z(F, 3, 283, 250, 154, 10),
          F.fill(),
          (O.fillStyle = "#e9e1cc"),
          O.fillRect(264, 280, 256, 64));
        for (let n0 = 280; n0 < 344; n0 += 2)
          ((O.fillStyle = `rgba(${(90 + P() * 60) | 0},${(80 + P() * 50) | 0},${(60 + P() * 40) | 0},${0.1 + P() * 0.22})`),
            O.fillRect(264, n0, 256, 1),
            (F.fillStyle = P() < 0.5 ? "#8c8c8c" : "#747474"),
            F.fillRect(264, n0, 256, 1));
        ((O.fillStyle = "#b9bcc0"),
          O.fillRect(528, 560, 128, 32),
          (O.fillStyle = "#060607"));
        for (let [n0, e0, p0] of [
          [6, 26, 12],
          [40, 26, 12],
          [76, 14, 8],
          [100, 18, 18],
        ])
          (z(O, 528 + n0, 576 - p0 / 2, e0, p0, p0 > 14 ? 9 : 3), O.fill());
        let K = "#d9b25a";
        [
          "THE GILDED HOUR",
          "SOLSTICE \xB7 A HISTORY",
          "ATLAS OF HARBOURS",
          "NOCTURNES",
          "ON LIGHT & STONE",
          "THE LONG SUMMER",
        ].forEach((n0, e0) => {
          let p0 = 280 + e0 * 44;
          ((O.fillStyle = K),
            (O.font = `${e0 % 2 ? "italic 600" : "700"} ${e0 % 2 ? 26 : 22}px ${e0 % 2 ? "Georgia, serif" : '"Segoe UI", Arial, sans-serif'}`),
            (O.textAlign = "center"),
            (O.textBaseline = "middle"),
            "letterSpacing" in O && (O.letterSpacing = e0 % 2 ? "1px" : "4px"),
            O.fillText(n0, 768, p0 + 21),
            "letterSpacing" in O && (O.letterSpacing = "0px"),
            O.fillRect(536, p0 + 6, 28, 3),
            O.fillRect(536, p0 + 31, 28, 3),
            O.fillRect(972, p0 + 6, 28, 3),
            O.fillRect(972, p0 + 31, 28, 3));
        });
        for (let [n0, e0, p0, t0, M0] of [
          [0, 460, "NOCTURNES", "collected photographs", 1],
          [264, 560, "ATLAS", "OF HARBOURS", 0],
        ])
          ((O.strokeStyle = K),
            (O.fillStyle = K),
            (O.lineWidth = 3),
            O.strokeRect(n0 + 14, e0 + 14, 228, 332),
            (O.lineWidth = 1.5),
            O.strokeRect(n0 + 22, e0 + 22, 212, 316),
            (O.textAlign = "center"),
            (O.textBaseline = "middle"),
            (O.font = M0
              ? "italic 600 34px Georgia, serif"
              : '700 40px "Segoe UI", Arial, sans-serif'),
            O.fillText(p0, n0 + 128, e0 + 130),
            (O.font = M0
              ? '600 15px "Segoe UI", Arial, sans-serif'
              : '600 20px "Segoe UI", Arial, sans-serif'),
            O.fillText(t0, n0 + 128, e0 + 172),
            O.beginPath(),
            O.moveTo(n0 + 128, e0 + 226),
            O.lineTo(n0 + 142, e0 + 244),
            O.lineTo(n0 + 128, e0 + 262),
            O.lineTo(n0 + 114, e0 + 244),
            O.closePath(),
            O.stroke(),
            O.fillRect(n0 + 60, e0 + 243, 44, 2),
            O.fillRect(n0 + 152, e0 + 243, 44, 2));
        return new THREE.MeshStandardMaterial({
          map: ll(A),
          normalMap: ll(Hd(H, 2.4, !1), {
            srgb: !1,
          }),
          normalScale: new THREE.Vector2(0.9, 0.9),
          roughness: 0.5,
          metalness: 0,
          alphaTest: 0.5,
        });
      }),
    T = (A, O) => {
      let H = A.attributes.uv;
      for (let F = 0; F < H.count; F++)
        H.setXY(
          F,
          O[0] + (O[2] - O[0]) * H.getX(F),
          O[1] + (O[3] - O[1]) * H.getY(F),
        );
      return A;
    };
  (e(
    "tv",
    (A) => (A.w || 1.4).toFixed(2),
    (A, O) => {
      let H = O.w || 1.4,
        F = H * 0.5625,
        P = o.blackMetal,
        z = o.plasticBlack;
      A.add(Te(H * 0.3, F * 0.34, 0.006, 0.002), P, [0, 0, 0.003]);
      for (let k of [-1, 1]) {
        A.add(Te(0.032, F * 0.46, 0.022, 0.004), P, [k * H * 0.11, 0, 0.015]);
        for (let I of [-1, 1])
          A.add(
            ks(0.006, 0.006, 0.004, 6),
            P,
            [k * H * 0.11, I * F * 0.17, 0.027],
            [x, 0, 0],
          );
      }
      (A.add(Te(0.05, F * 0.3, 0.014, 0.004), z, [0, -F * 0.3, 0.012]),
        A.add(Te(H * 0.64, F * 0.62, 0.02, 0.007), z, [0, -F * 0.05, 0.034]));
      for (let k = 0; k < 9; k++)
        A.add(
          zs(H * 0.4, 0.004, 0.003),
          P,
          [0, F * 0.262, 0.0265 + k * 0.0018],
          null,
          null,
        );
      return (
        A.add(Te(H, F, 0.014, 0.0035), z, [0, 0, 0.051]),
        A.add(
          Dl(
            H,
            F,
            [
              [0, 0],
              [0, 0.004],
              [0.0018, 0.0045],
              [0.0058, 0.0036],
              [0.0058, 0],
            ],
            35,
          ),
          P,
          [0, 0, 0.058],
        ),
        A.add(
          Dl(
            H - 0.0116,
            F - 0.0116,
            [
              [0, 0],
              [0, 0.0037],
              [0.0064, 0.0037],
              [0.0064, 0],
            ],
            35,
          ),
          z,
          [0, 0, 0.058],
        ),
        A.add(Te(0.06, 0.0032, 0.0012, 5e-4), P, [0, -F / 2 + 0.0064, 0.0622]),
        A.keep(
          "screen",
          iw(H - 0.024, F - 0.024),
          o.screenOn,
          [0, 0, 0.062],
          null,
          null,
          {
            clone: !1,
            uv: !0,
          },
        ),
        rs("tv", [H, F, 0.06], {
          surf: "glass",
          wall: !0,
          mountY: 1.5,
          mass: 18,
          breakable: "glass",
          colliders: [$s(-H / 2, -F / 2, 0, H / 2, F / 2, 0.06)],
        })
      );
    },
  ),
    e(
      "painting",
      (A) =>
        `${(A.variant | 0) % 4}_${A.w || 1.2}x${A.h || 0.9}${A.frame || ""}`,
      (A, O) => {
        let H = (O.variant | 0) % 4,
          F = O.w || 1.2,
          P = O.h || 0.9,
          z = 0.05,
          k = Math.min(F, P) * 0.07,
          I = (O.frame ? O.frame === "brass" : H % 2 === 0)
            ? o.brass
            : o.blackMetal;
        A.add(
          Dl(
            F,
            P,
            [
              [0, 0],
              [0, 0.02],
              [0.003, 0.027],
              [0.01, 0.0335],
              [0.016, 0.036],
              [0.022, 0.0345],
              [0.026, 0.03],
              [0.034, 0.027],
              [0.038, 0.0225],
              [0.043, 0.0235],
              [0.047, 0.022],
              [0.05, 0.018],
              [0.05, 0],
            ],
            32,
          ),
          I,
        );
        let G = F - z * 2 + 0.01,
          K = P - z * 2 + 0.01,
          $ = F - z * 2 - k * 2,
          n0 = P - z * 2 - k * 2;
        A.add(zs(G, K, 0.006), o.paper, [0, 0, 0.011]);
        {
          let e0 = new THREE.Shape([
            oo(-G / 2, -K / 2),
            oo(G / 2, -K / 2),
            oo(G / 2, K / 2),
            oo(-G / 2, K / 2),
          ]);
          (e0.holes.push(
            new THREE.Path([
              oo(-$ / 2, -n0 / 2),
              oo(-$ / 2, n0 / 2),
              oo($ / 2, n0 / 2),
              oo($ / 2, -n0 / 2),
            ]),
          ),
            A.add(
              pe(
                new THREE.ExtrudeGeometry(e0, {
                  depth: 0.001,
                  bevelEnabled: !0,
                  bevelThickness: 0.0022,
                  bevelSize: 0.0022,
                  bevelOffset: -0.0022,
                  bevelSegments: 1,
                }),
                30,
              ),
              o.paper,
              [0, 0, 0.0166],
            ));
        }
        return (
          A.add(
            iw($ + 0.008, n0 + 0.008),
            o["art" + (H + 1)] || o.paper,
            [0, 0, 0.0172],
            null,
            null,
            !0,
          ),
          rs("painting", [F, P, 0.036], {
            surf: "wood",
            wall: !0,
            mountY: 1.6,
            mass: 6,
          })
        );
      },
    ));
  let S = new Map(),
    E = (A, O, H, F, P) => {
      (A.beginPath(),
        A.moveTo(O, H - P),
        A.lineTo(O + F, H),
        A.lineTo(O, H + P),
        A.lineTo(O - F, H),
        A.closePath());
    },
    _ = [
      (A, O, H) => {
        let F = H * 0.06;
        ((A.fillStyle = "#6f2a1a"),
          A.fillRect(0, 0, O, H),
          (A.fillStyle = "#e3d3b4"),
          A.fillRect(F * 0.6, F * 0.6, O - F * 1.2, H - F * 1.2),
          (A.fillStyle = "#1d4447"),
          A.fillRect(F * 0.9, F * 0.9, O - F * 1.8, H - F * 1.8),
          (A.fillStyle = "#8b3a22"),
          A.fillRect(F * 2.1, F * 2.1, O - F * 4.2, H - F * 4.2),
          (A.fillStyle = "#d9b877"));
        for (let z = F * 1.5; z < O - F; z += F * 0.9)
          (E(A, z, F * 1.5, F * 0.28, F * 0.42),
            A.fill(),
            E(A, z, H - F * 1.5, F * 0.28, F * 0.42),
            A.fill());
        for (let z = F * 1.5; z < H - F; z += F * 0.9)
          (E(A, F * 1.5, z, F * 0.42, F * 0.28),
            A.fill(),
            E(A, O - F * 1.5, z, F * 0.42, F * 0.28),
            A.fill());
        (A.save(),
          A.beginPath(),
          A.rect(F * 2.1, F * 2.1, O - F * 4.2, H - F * 4.2),
          A.clip(),
          (A.fillStyle = "rgba(227,211,180,0.5)"));
        for (let z = 0, k = 0; k < H; k += F * 1.1, z++)
          for (let I = (z % 2) * F * 0.8; I < O; I += F * 1.6)
            (E(A, I, k, F * 0.16, F * 0.22), A.fill());
        ["#1d4447", "#e3d3b4", "#b5532c", "#1d4447", "#d9b877"].forEach(
          (z, k) => {
            ((A.fillStyle = z),
              E(A, O / 2, H / 2, O * (0.3 - k * 0.055), H * (0.36 - k * 0.066)),
              A.fill());
          },
        );
        for (let [z, k] of [
          [F * 2.1, F * 2.1],
          [O - F * 2.1, F * 2.1],
          [F * 2.1, H - F * 2.1],
          [O - F * 2.1, H - F * 2.1],
        ])
          ["#1d4447", "#e3d3b4", "#b5532c"].forEach((I, G) => {
            ((A.fillStyle = I),
              E(A, z, k, O * (0.13 - G * 0.035), H * (0.17 - G * 0.045)),
              A.fill());
          });
        A.restore();
      },
      (A, O, H) => {
        ((A.fillStyle = "#14373b"), A.fillRect(0, 0, O, H));
        let F = H / 7;
        A.lineWidth = Math.max(2, H / 180);
        for (let z = 0, k = H + F; k > -F; k -= F * 0.5, z++)
          for (let I = (z % 2) * F - F; I < O + F; I += F * 2) {
            ((A.fillStyle = z % 4 < 2 ? "#14373b" : "#183f44"),
              A.beginPath(),
              A.arc(I, k, F, Math.PI, 0),
              A.fill(),
              (A.strokeStyle = "#c6a25a"));
            for (let G of [1, 0.72, 0.44])
              (A.beginPath(), A.arc(I, k, F * G, Math.PI, 0), A.stroke());
          }
        let P = H * 0.05;
        ((A.fillStyle = "#0e2629"),
          A.fillRect(0, 0, O, P),
          A.fillRect(0, H - P, O, P),
          A.fillRect(0, 0, P, H),
          A.fillRect(O - P, 0, P, H),
          (A.strokeStyle = "#c6a25a"),
          (A.lineWidth = Math.max(2, H / 150)),
          A.strokeRect(P * 0.45, P * 0.45, O - P * 0.9, H - P * 0.9),
          A.strokeRect(P, P, O - P * 2, H - P * 2));
      },
      (A, O, H) => {
        ((A.fillStyle = "#ded3bd"),
          A.fillRect(0, 0, O, H),
          (A.fillStyle = "#a4482a"),
          A.beginPath(),
          A.arc(O * 0.2, H * 1.05, H * 0.8, 0, TAU),
          A.fill(),
          (A.fillStyle = "#2c2b2a"),
          A.beginPath(),
          A.moveTo(O * 0.52, 0),
          A.lineTo(O, 0),
          A.lineTo(O, H * 0.55),
          A.quadraticCurveTo(O * 0.72, H * 0.5, O * 0.52, 0),
          A.fill(),
          (A.fillStyle = "#2a5759"),
          A.beginPath(),
          A.arc(O * 0.7, H * 0.66, H * 0.2, 0, TAU),
          A.fill(),
          (A.strokeStyle = "#c6a25a"),
          (A.lineWidth = Math.max(2, H / 120)),
          A.beginPath(),
          A.arc(O * 0.2, H * 1.05, H * 0.9, 0, TAU),
          A.stroke(),
          A.beginPath(),
          A.moveTo(0, H * 0.22),
          A.bezierCurveTo(O * 0.3, H * 0.1, O * 0.6, H * 0.5, O, H * 0.82),
          A.stroke());
      },
    ];
  function R(A, O) {
    let H = A + ":" + O.toFixed(1);
    if (S.has(H)) return S.get(H);
    let F = 512,
      P = clamp(Math.round((F * O) / 32) * 32, 512, 1024),
      z = Math.round(P * 0.02),
      k = P - 2 * z,
      I = createCanvas(k, F),
      G = I.getContext("2d"),
      K = createRandom(31 + A * 7),
      $ = createNoise(40 + A);
    _[A](G, k, F);
    for (let f0 = 0; f0 < k; f0 += 4) {
      let _0 = ($.fbm(f0 * 0.012, A * 3.1, 3) - 0.5) * 0.3;
      ((G.fillStyle =
        _0 > 0 ? `rgba(255,236,200,${_0})` : `rgba(20,10,0,${-_0})`),
        G.fillRect(f0, 0, 4, F));
    }
    for (let f0 = 0; f0 < F; f0 += 3)
      ((G.fillStyle = `rgba(0,0,0,${0.03 + 0.05 * K()})`),
        G.fillRect(0, f0, k, 1));
    for (let f0 = 0; f0 < 12e3; f0++)
      ((G.fillStyle =
        K() < 0.5 ? "rgba(0,0,0,0.08)" : "rgba(255,240,215,0.07)"),
        G.fillRect(K() * k, K() * F, 2, 2));
    ((G.strokeStyle = "rgba(30,18,10,0.55)"),
      (G.lineWidth = 5),
      G.strokeRect(2.5, 2.5, k - 5, F - 5));
    let n0 = createCanvas(P, F),
      e0 = n0.getContext("2d"),
      p0 = createCanvas(P, F),
      t0 = p0.getContext("2d");
    (e0.drawImage(I, z, 0),
      (t0.filter = "grayscale(1) contrast(0.6)"),
      t0.drawImage(I, z, 0),
      (t0.filter = "none"));
    for (let f0 = 0; f0 < F; f0 += 3)
      ((t0.fillStyle = "rgba(0,0,0,0.22)"), t0.fillRect(z, f0, k, 1));
    for (let f0 = 0; f0 < 9e3; f0++)
      ((t0.fillStyle = K() < 0.5 ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)"),
        t0.fillRect(z + K() * k, K() * F, 2, 2));
    for (let f0 of [-1, 1])
      for (let _0 = 3; _0 < F - 2; _0 += 5) {
        let F0 = f0 < 0 ? z : P - z,
          m0 = z * (0.72 + K() * 0.28),
          S0 = (K() - 0.5) * 5;
        for (let T0 of [e0, t0])
          ((T0.strokeStyle =
            T0 === e0
              ? `rgb(${(214 + K() * 26) | 0},${(200 + K() * 22) | 0},${(168 + K() * 22) | 0})`
              : "#d0d0d0"),
            (T0.lineWidth = 2.2),
            T0.beginPath(),
            T0.moveTo(F0, _0),
            T0.lineTo(F0 + f0 * m0, _0 + S0),
            T0.stroke());
      }
    let M0 = new THREE.MeshStandardMaterial({
      map: ll(n0),
      normalMap: ll(Hd(p0, 1.6, !1), {
        srgb: !1,
      }),
      roughness: 1,
      metalness: 0,
      alphaTest: 0.5,
    });
    return (
      (M0.name = "rug" + H),
      (M0.userData.fringe = z / P),
      S.set(H, M0),
      M0
    );
  }
  (e(
    "rug",
    (A) => `${A.w || 3}x${A.d || 2}v${(A.variant | 0) % 3}`,
    (A, O) => {
      let H = O.w || 3,
        F = O.d || 2,
        P = (O.variant | 0) % 3,
        z = F > H,
        k = Math.max(H, F),
        I = Math.min(H, F),
        G = R(P, k / I),
        K = G.userData.fringe,
        $ = k * K,
        n0 = k - 2 * $;
      A.cast = !1;
      let e0 = fi(ui(n0, I, 0.012), 0.012, 0.004, 3),
        p0 = e0.attributes.position,
        t0 = new Float32Array(p0.count * 2);
      for (let m0 = 0; m0 < p0.count; m0++)
        ((t0[m0 * 2] = K + (p0.getX(m0) / n0 + 0.5) * (1 - 2 * K)),
          (t0[m0 * 2 + 1] = 0.5 - p0.getZ(m0) / I));
      e0.setAttribute("uv", new THREE.BufferAttribute(t0, 2));
      let M0 = new THREE.BufferGeometry(),
        f0 = [],
        _0 = [];
      for (let m0 of [-1, 1]) {
        let S0 = (m0 * n0) / 2,
          T0 = (m0 * k) / 2,
          j0 = m0 < 0 ? K : 1 - K,
          Z0 = m0 < 0 ? 0 : 1,
          lt = [S0, 0.0105, I / 2],
          H0 = [T0, 0.0025, I / 2],
          Y0 = [T0, 0.0025, -I / 2],
          et = [S0, 0.0105, -I / 2],
          ct = m0 > 0 ? [lt, H0, Y0, lt, Y0, et] : [lt, Y0, H0, lt, et, Y0],
          D0 =
            m0 > 0
              ? [
                  [j0, 0],
                  [Z0, 0],
                  [Z0, 1],
                  [j0, 0],
                  [Z0, 1],
                  [j0, 1],
                ]
              : [
                  [j0, 0],
                  [Z0, 1],
                  [Z0, 0],
                  [j0, 0],
                  [j0, 1],
                  [Z0, 1],
                ];
        for (let u0 of ct) f0.push(...u0);
        for (let u0 of D0) _0.push(...u0);
      }
      (M0.setAttribute("position", new THREE.Float32BufferAttribute(f0, 3)),
        M0.setAttribute("uv", new THREE.Float32BufferAttribute(_0, 2)),
        M0.computeVertexNormals());
      let F0 = z ? [0, x, 0] : null;
      return (
        A.add(e0, G, null, F0, null, !0),
        A.add(M0, G, null, F0, null, !0),
        rs("rug", [H, 0.012, F], {
          surf: "carpet",
          mass: 8,
        })
      );
    },
  ),
    e(
      "books",
      (A) => (A.variant | 0) % 4,
      (A, O) => {
        let H = w(),
          F = (O.variant | 0) % 4,
          P = createRandom(11 + F * 5),
          z = [i("leatherTan"), o.velvetTeal, o.fabricCharcoal],
          k = 0,
          I = 3 + (F % 2);
        for (let G = 0; G < I; G++) {
          let K = P.range(0.16, 0.21) - G * 0.008,
            $ = P.range(0.23, 0.28) - G * 0.01,
            n0 = P.range(0.026, 0.05),
            e0 = P.range(-0.3, 0.3),
            p0 = z[(G + (O.variant | 0)) % 3],
            t0 = 0.0032,
            M0 = n0 * 0.2;
          (A.at([0, k, 0], [0, e0, 0], () => {
            (A.add(Te(K, t0, $, 0.0012), p0, [0, t0 / 2, 0]),
              A.add(Te(K, t0, $, 0.0012), p0, [0, n0 - t0 / 2, 0]),
              A.add(
                new THREE.CylinderGeometry(
                  n0 / 2,
                  n0 / 2,
                  $,
                  7,
                  1,
                  !1,
                  Math.PI,
                  Math.PI,
                ).rotateX(x),
                p0,
                [-K / 2 + 0.0015, n0 / 2, 0],
                null,
                [M0 / (n0 / 2), 1, 1],
              ),
              A.add(
                T(
                  new THREE.BoxGeometry(K - 0.009, n0 - t0 * 2, $ - 0.008),
                  y.pages,
                ),
                H,
                [0.0022, n0 / 2, 0],
                null,
                null,
                !0,
              ),
              A.add(
                cc($ * 0.72, Math.min(0.026, n0 * 0.6), M((G * 2 + F) % 6)),
                H,
                [-K / 2 + 0.0015 - M0 - 4e-4, n0 / 2, 0],
                [0, -x, 0],
                null,
                !0,
              ));
            for (let f0 of [-$ / 2 + 0.014, $ / 2 - 0.014])
              A.add(
                new THREE.CylinderGeometry(
                  n0 / 2 + 6e-4,
                  n0 / 2 + 6e-4,
                  0.004,
                  7,
                  1,
                  !0,
                  Math.PI,
                  Math.PI,
                ).rotateX(x),
                p0,
                [-K / 2 + 0.0015, n0 / 2, f0],
                null,
                [M0 / (n0 / 2), 1, 1],
              );
            G === I - 1 &&
              A.add(
                cc(K * 0.86, $ * 0.86, F % 2 ? y.cover1 : y.cover0),
                H,
                [0.004, n0 + 4e-4, 0],
                [-x, 0, x * (F % 2, 0)],
                null,
                !0,
              );
          }),
            (k += n0));
        }
        return rs("books", [0.26, k, 0.32], {
          surf: "fabric",
          dynamic: !0,
          mass: 2,
        });
      },
    ),
    e("laptop", null, (A) => {
      let O = w(),
        H = o.steel,
        F = o.plasticBlack,
        P = (k, I, G) => new THREE.Matrix4().makeTranslation(k, I, G);
      (A.add(fi(ui(0.33, 0.225, 0.012), 0.014, 0.0025, 4), H),
        A.add(
          cc(0.288, 0.1113, y.keys),
          O,
          [0, 0.01425, -0.034],
          [-x, 0, 0],
          null,
          !0,
        ),
        A.add(
          cc(0.104, 0.0644, y.pad),
          O,
          [0, 0.01425, 0.067],
          [-x, 0, 0],
          null,
          !0,
        ),
        A.add(
          cc(0.07, 0.0085, y.ports),
          O,
          [-0.1652, 0.0068, 0.01],
          [0, -x, 0],
          null,
          !0,
        ),
        A.add(
          cc(0.07, 0.0085, y.ports),
          O,
          [0.1652, 0.0068, -0.02],
          [0, x, 0],
          null,
          !0,
        ),
        A.add(ks(0.0058, 0.0058, 0.25, 8), F, [0, 0.0128, -0.1085], [0, 0, x]));
      let z = P(0, 0.014, -0.11)
        .multiply(new THREE.Matrix4().makeRotationX(-0.3))
        .multiply(P(0, 0.105, 0));
      return (
        A.addM(
          Fr(ui(0.33, 0.21, 0.012), 0.0075, 0.002, 4),
          H,
          z.clone().multiply(P(0, 0, -0.004)),
        ),
        A.addM(
          Fr(ui(0.322, 0.202, 0.009), 0.0022, 6e-4, 3),
          F,
          z.clone().multiply(P(0, 0, 0.0035)),
        ),
        A.addM(
          Te(0.034, 0.034, 8e-4, 3e-4),
          F,
          z.clone().multiply(P(0, 0.01, -0.0042)),
        ),
        A.keep("screen", iw(0.31, 0.19), o.screenOn, null, null, null, {
          clone: !1,
          uv: !0,
          m: z.clone().multiply(P(0, 0, 0.0065)),
        }),
        rs("laptop", [0.33, 0.22, 0.27], {
          surf: "metal",
          dynamic: !0,
          mass: 1.5,
        })
      );
    }),
    e(
      "receptionBell",
      null,
      (A) => (
        A.add(
          ji(
            [
              [0, 0],
              [0.05, 0],
              [0.056, 0.002],
              [0.058, 0.006],
              [0.0555, 0.0085],
              [0.05, 0.0095],
              [0.047, 0.013],
              [0.03, 0.015],
              [0, 0.015],
            ],
            28,
          ),
          o.ceramicBlack,
        ),
        A.add(
          ji(
            [
              [0.004, 0.015],
              [0.0505, 0.0168],
              [0.0512, 0.0185],
              [0.0498, 0.03],
              [0.0478, 0.0338],
              [0.0472, 0.0346],
              [0.0426, 0.047],
              [0.034, 0.0565],
              [0.022, 0.063],
              [0.012, 0.0665],
              [0.0102, 0.068],
              [0.0086, 0.0686],
              [0.007, 0.073],
              [0.007, 0.079],
              [0, 0.079],
            ],
            28,
            28,
          ),
          o.brass,
        ),
        A.add(
          ji(
            [
              [0, 0.079],
              [0.0042, 0.079],
              [0.0042, 0.0842],
              [0.0104, 0.085],
              [0.012, 0.088],
              [0.0104, 0.0914],
              [0.006, 0.0927],
              [0, 0.093],
            ],
            14,
          ),
          o.ceramicBlack,
        ),
        A.add(Te(0.012, 0.004, 0.02, 0.0015), o.brass, [0.052, 0.0125, 0]),
        rs("receptionBell", [0.116, 0.092, 0.116], {
          surf: "metal",
          mass: 0.4,
          colliders: [$s(-0.058, 0, -0.058, 0.058, 0.09, 0.058)],
        })
      ),
    ));
  let C = [
      [
        [0, 0.011],
        [0.014, 0.007],
        [0.028, 0],
        [0.0355, 0.002],
        [0.0372, 0.008],
        [0.0372, 0.172],
        [0.035, 0.19],
        [0.027, 0.209],
        [0.0165, 0.232],
        [0.0135, 0.248],
        [0.0135, 0.29],
        [0.0158, 0.2925],
        [0.0158, 0.304],
        [0.0135, 0.31],
        [0, 0.31],
      ],
      [
        [0, 0.004],
        [0.036, 0],
        [0.0445, 0.003],
        [0.046, 0.011],
        [0.046, 0.148],
        [0.0425, 0.165],
        [0.032, 0.181],
        [0.0205, 0.191],
        [0.017, 0.201],
        [0.017, 0.232],
        [0.021, 0.2345],
        [0.0215, 0.257],
        [0.018, 0.262],
        [0, 0.262],
      ],
      [
        [0, 0.006],
        [0.022, 0.002],
        [0.0315, 0],
        [0.035, 0.006],
        [0.035, 0.2],
        [0.0315, 0.222],
        [0.0195, 0.248],
        [0.0135, 0.264],
        [0.0125, 0.275],
        [0.0125, 0.312],
        [0.0152, 0.3145],
        [0.0155, 0.329],
        [0.0125, 0.335],
        [0, 0.335],
      ],
    ],
    L = [];
  a.bottleGeometry = (A = 0) => {
    let O = (((A | 0) % 3) + 3) % 3;
    return (
      L[O] ||
        (L[O] = {
          geometry: ke(C[O], 16),
          material: [o.bottleGreen, o.bottleAmber, o.bottleClear][O],
        }),
      L[O]
    );
  };
}

export { registerDecorativeProps };

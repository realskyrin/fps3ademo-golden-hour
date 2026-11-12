// render/effects/decals.js: recovered from the verified GOLDEN HOUR release.
import { createCanvas, createRandom } from "../../core/math.js";
import {
  CanvasTexture,
  Color,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  NoColorSpace,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";

var gb = 8;
var W2 = {
  crater: {
    cells: [
      [0, 0, 1],
      [1, 0, 1],
      [2, 0, 1],
      [3, 0, 1],
    ],
    size: [0.11, 0.17],
  },
  cracked: {
    cells: [
      [4, 0, 1],
      [5, 0, 1],
      [6, 0, 1],
      [7, 0, 1],
    ],
    size: [0.15, 0.24],
  },
  metal: {
    cells: [
      [0, 1, 1],
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
    ],
    size: [0.075, 0.105],
    metal: 1,
    heat: 1,
  },
  wood: {
    cells: [
      [4, 1, 1],
      [5, 1, 1],
      [6, 1, 1],
      [7, 1, 1],
    ],
    size: [0.13, 0.2],
  },
  fabric: {
    cells: [
      [0, 2, 1],
      [1, 2, 1],
      [2, 2, 1],
    ],
    size: [0.05, 0.075],
  },
  plastic: {
    cells: [
      [3, 2, 1],
      [4, 2, 1],
    ],
    size: [0.06, 0.085],
  },
  soot: {
    cells: [[5, 2, 1]],
    size: [0.3, 0.5],
  },
  chunk: {
    cells: [
      [0, 3, 1],
      [1, 3, 1],
    ],
    size: [0.3, 0.42],
  },
  chunkCracked: {
    cells: [
      [2, 3, 1],
      [3, 3, 1],
    ],
    size: [0.34, 0.5],
  },
  chunkWood: {
    cells: [[4, 3, 1]],
    size: [0.3, 0.42],
  },
  scorch: {
    cells: [
      [0, 4, 2],
      [2, 4, 2],
    ],
    size: [2.7, 3.5],
    heat: 0.5,
  },
};
function qY(o) {
  let t = o / gb,
    e = createCanvas(o),
    s = e.getContext("2d"),
    n = createCanvas(o),
    i = n.getContext("2d", {
      willReadFrequently: !0,
    });
  ((i.fillStyle = "rgb(128,128,128)"), i.fillRect(0, 0, o, o));
  let a = createRandom(2025),
    r = (z, k) => a.range(z, k),
    l = (z, k, I, G) => {
      for (let K of [s, i])
        (K.save(),
          K.beginPath(),
          K.rect(z * t, k * t, I * t, I * t),
          K.clip(),
          K.translate((z + I / 2) * t, (k + I / 2) * t),
          K.scale((I * t) / 256, (I * t) / 256));
      (G(), s.restore(), i.restore());
    },
    c = (z, k, I, G = 1) => `rgba(${z | 0},${k | 0},${I | 0},${G})`,
    h = (z, k = 1) => `rgba(${z | 0},${z | 0},${z | 0},${k})`,
    f = (z, k, I, G = 1, K = 1, $ = 0, n0 = 0) => {
      let e0 = [],
        p0 = a() * 6.2832;
      for (let t0 = 0; t0 < z; t0++) {
        let M0 = p0 + (t0 / z) * 6.2832 + (r(-0.5, 0.5) / z) * 3,
          f0 = r(k, I);
        e0.push([$ + Math.cos(M0) * f0 * G, n0 + Math.sin(M0) * f0 * K]);
      }
      return e0;
    },
    u = (z, k) => {
      z.beginPath();
      for (let I of k) z.lineTo(I[0], I[1]);
      z.closePath();
    },
    d = (z, k, I) => {
      (u(z, k), (z.fillStyle = I), z.fill());
    },
    m = (z, k, I, G, K, $ = 0, n0 = 0) => {
      let e0 = z.createRadialGradient($, n0, k, $, n0, I);
      (e0.addColorStop(0, G),
        e0.addColorStop(1, K),
        (z.fillStyle = e0),
        z.beginPath(),
        z.arc($, n0, I, 0, 6.2832),
        z.fill());
    },
    p = (z, k, I, G, K = 0.35) => {
      let $ = Math.cos(z) * k,
        n0 = Math.sin(z) * k,
        e0 = z,
        p0 = Math.max(3, Math.round((I - k) / 13)),
        t0 = [[$, n0]];
      for (let M0 = 0; M0 < p0; M0++) {
        e0 += r(-0.32, 0.32);
        let f0 = (I - k) / p0;
        (($ += Math.cos(e0) * f0),
          (n0 += Math.sin(e0) * f0),
          t0.push([$, n0]),
          a() < (K / p0) * 2 &&
            M0 > 0 &&
            M0 < p0 - 1 &&
            p(
              e0 + r(0.5, 1) * (a() < 0.5 ? -1 : 1),
              Math.hypot($, n0),
              Math.hypot($, n0) + (I - k) * r(0.25, 0.5),
              G * 0.7,
              0,
            ));
      }
      for (let M0 = 0; M0 < t0.length - 1; M0++) {
        let f0 = 1 - M0 / (t0.length - 1),
          _0 = Math.max(0.6, G * (0.35 + 0.65 * f0));
        ((s.strokeStyle = c(34, 30, 28, 0.9)),
          (s.lineWidth = _0),
          (s.lineCap = "round"),
          s.beginPath(),
          s.moveTo(t0[M0][0], t0[M0][1]),
          s.lineTo(t0[M0 + 1][0], t0[M0 + 1][1]),
          s.stroke(),
          (s.strokeStyle = c(238, 234, 226, 0.28)),
          (s.lineWidth = _0 * 0.8),
          s.beginPath(),
          s.moveTo(t0[M0][0] + _0 * 0.9, t0[M0][1] + _0 * 0.6),
          s.lineTo(t0[M0 + 1][0] + _0 * 0.9, t0[M0 + 1][1] + _0 * 0.6),
          s.stroke(),
          (i.strokeStyle = h(70)),
          (i.lineWidth = _0 * 1.6),
          (i.lineCap = "round"),
          i.beginPath(),
          i.moveTo(t0[M0][0], t0[M0][1]),
          i.lineTo(t0[M0 + 1][0], t0[M0 + 1][1]),
          i.stroke());
      }
    },
    x = (z, k, I, G, K) => {
      for (let $ = 0; $ < z; $++) {
        let n0 = a() * 6.2832,
          e0 = r(k, I),
          p0 = f(4, 1.5, 5, 1, 1, Math.cos(n0) * e0, Math.sin(n0) * e0);
        (d(s, p0, G(a())), K && d(i, p0, h(K + r(-10, 10))));
      }
    },
    g = (z, k) => {
      m(s, z * 0.5, z * 1.25, c(215, 208, 196, 0.22), c(215, 208, 196, 0));
      let I = f(13, z * 0.7, z, 1, 1);
      (d(s, I, c(206, 199, 188, 0.92)), d(i, I, h(98)));
      for (let $ = 0; $ < 7; $++) {
        let n0 = a() * 6.2832,
          e0 = r(0, z * 0.5),
          p0 = f(
            5,
            z * 0.18,
            z * 0.42,
            1,
            1,
            Math.cos(n0) * e0,
            Math.sin(n0) * e0,
          ),
          t0 = r(-18, 14);
        (d(s, p0, c(196 + t0, 189 + t0, 178 + t0, 0.85)),
          d(i, p0, h(r(78, 108))));
      }
      ((i.lineWidth = 3),
        (i.strokeStyle = h(150)),
        u(i, I),
        i.stroke(),
        (s.lineWidth = 1.5),
        (s.strokeStyle = c(120, 112, 102, 0.5)),
        u(s, I),
        s.stroke());
      let G = f(10, z * 0.3, z * 0.48);
      (d(s, G, c(118, 110, 102, 0.96)), d(i, G, h(k)));
      let K = f(9, z * 0.11, z * 0.19);
      (d(s, K, c(14, 12, 11, 1)),
        d(i, K, h(0)),
        x(16, z * 0.9, z * 1.3, ($) => c(214, 207, 196, 0.35 + $ * 0.4)));
      for (let $ = 0; $ < 4; $++)
        p(a() * 6.2832, z * 0.75, z * r(1, 1.3), 1.4, 0);
    };
  W2.crater.cells.forEach(([z, k], I) =>
    l(z, k, 1, () => g(r(74, 90), 52 - I * 4)),
  );
  let b = (z, k) => {
    m(s, 4, z * 1.2, c(236, 232, 226, 0.25), c(236, 232, 226, 0));
    let I = f(11, z * 0.7, z);
    (d(s, I, c(226, 222, 214, 0.94)), d(i, I, h(92)));
    for (let e0 = 0; e0 < 4; e0++) {
      let p0 = a() * 6.2832,
        t0 = r(0, z * 0.4),
        M0 = f(
          4,
          z * 0.25,
          z * 0.5,
          1,
          1,
          Math.cos(p0) * t0,
          Math.sin(p0) * t0,
        );
      (d(s, M0, c(r(196, 240), r(194, 236), r(188, 226), 0.8)),
        d(i, M0, h(r(70, 104))));
    }
    ((s.lineWidth = 1.5),
      (s.strokeStyle = c(250, 248, 244, 0.7)),
      u(s, I),
      s.stroke());
    let G = f(8, z * 0.26, z * 0.4);
    (d(s, G, c(20, 18, 17, 1)), d(i, G, h(6)));
    let K = a() * 6.2832;
    for (let e0 = 0; e0 < k; e0++)
      p(
        K + (e0 / k) * 6.2832 + r(-0.35, 0.35),
        z * 0.8,
        r(72, 122),
        r(1.8, 2.8),
        0.5,
      );
    let $ = r(52, 70),
      n0 = a() * 6.2832;
    ((s.strokeStyle = c(40, 36, 34, 0.7)),
      (s.lineWidth = 1.4),
      s.beginPath(),
      s.arc(0, 0, $, n0, n0 + r(1, 2.2)),
      s.stroke(),
      (i.strokeStyle = h(84)),
      (i.lineWidth = 2.4),
      i.beginPath(),
      i.arc(0, 0, $, n0, n0 + 1.6),
      i.stroke());
  };
  W2.cracked.cells.forEach(([z, k], I) =>
    l(z, k, 1, () => b(r(28, 36), 5 + (I % 3))),
  );
  let v = (z) => {
    if (
      (m(s, 14, 86, c(16, 16, 18, 0.62), c(16, 16, 18, 0)),
      m(i, 20, 70, h(84), h(128)),
      z)
    ) {
      let G = r(0, 3.14);
      for (let $ of [s, i]) ($.save(), $.rotate(G));
      let K = s.createLinearGradient(-92, 0, 92, 0);
      (K.addColorStop(0, c(238, 238, 244, 0)),
        K.addColorStop(0.3, c(238, 238, 244, 1)),
        K.addColorStop(0.85, c(200, 200, 208, 0.9)),
        K.addColorStop(1, c(200, 200, 208, 0)),
        (s.fillStyle = K),
        s.beginPath(),
        s.ellipse(0, 0, 92, 9, 0, 0, 6.2832),
        s.fill(),
        (s.fillStyle = c(18, 18, 20, 0.9)),
        s.beginPath(),
        s.ellipse(-8, 0, 60, 3.2, 0, 0, 6.2832),
        s.fill(),
        (i.fillStyle = h(60)),
        i.beginPath(),
        i.ellipse(0, 0, 86, 7, 0, 0, 6.2832),
        i.fill(),
        (i.strokeStyle = h(176)),
        (i.lineWidth = 3),
        i.beginPath(),
        i.ellipse(0, 0, 90, 10, 0, 0, 6.2832),
        i.stroke(),
        s.restore(),
        i.restore());
      return;
    }
    let k = f(14, 22, 30);
    (d(s, k, c(236, 236, 242, 1)), d(i, k, h(190)));
    for (let G = 0; G < 9; G++) {
      let K = a() * 6.2832;
      ((s.strokeStyle = c(225, 225, 232, r(0.4, 0.85))),
        (s.lineWidth = r(0.8, 1.8)),
        s.beginPath(),
        s.moveTo(Math.cos(K) * 24, Math.sin(K) * 24),
        s.lineTo(Math.cos(K) * r(34, 58), Math.sin(K) * r(34, 58)),
        s.stroke());
    }
    let I = f(11, 14, 19);
    (d(s, I, c(4, 4, 5, 1)),
      d(i, I, h(0)),
      (s.strokeStyle = c(150, 150, 158, 0.9)),
      (s.lineWidth = 2),
      u(s, I),
      s.stroke());
  };
  W2.metal.cells.forEach(([z, k], I) => l(z, k, 1, () => v(I === 3)));
  let y = (z, k, I) => {
    let G = [];
    for (let n0 = 0; n0 < 22; n0++) {
      let e0 = n0 / 21,
        p0 = -k + e0 * 2 * k,
        t0 = z * Math.pow(Math.sin(Math.PI * e0), 0.7) * r(0.6, 1.15);
      G.push([t0, p0]);
    }
    for (let n0 = 21; n0 >= 0; n0--) {
      let e0 = n0 / 21,
        p0 = -k + e0 * 2 * k,
        t0 = z * Math.pow(Math.sin(Math.PI * e0), 0.7) * r(0.6, 1.15);
      G.push([-t0, p0]);
    }
    (d(s, G, c(224, 190, 136, 0.93)), d(i, G, h(100)));
    for (let n0 = 0; n0 < (I ? 46 : 26); n0++) {
      let e0 = r(-z, z) * 0.9,
        p0 = r(-k, k * 0.4) * 0.9,
        t0 = r(20, 90),
        M0 = r(-30, 26);
      ((s.strokeStyle = c(214 + M0, 178 + M0, 124 + M0, 0.9)),
        (s.lineWidth = r(1, 3)),
        s.beginPath(),
        s.moveTo(e0, p0),
        s.lineTo(e0 + r(-3, 3), p0 + t0),
        s.stroke(),
        (i.strokeStyle = h(r(70, 150))),
        (i.lineWidth = r(1.5, 3.5)),
        i.beginPath(),
        i.moveTo(e0, p0),
        i.lineTo(e0 + r(-3, 3), p0 + t0),
        i.stroke());
    }
    for (let n0 = 0; n0 < (I ? 5 : 3); n0++) {
      let e0 = r(-z, z) * 0.6,
        p0 = r(-k * 1.15, -k * 0.3),
        t0 = r(k * 0.3, k * 1.15);
      ((s.strokeStyle = c(30, 18, 10, 0.85)),
        (s.lineWidth = r(1.2, 2.2)),
        s.beginPath(),
        s.moveTo(e0, p0),
        s.quadraticCurveTo(e0 + r(-6, 6), 0, e0 + r(-4, 4), t0),
        s.stroke(),
        (i.strokeStyle = h(40)),
        (i.lineWidth = 3),
        i.beginPath(),
        i.moveTo(e0, p0),
        i.lineTo(e0, t0),
        i.stroke());
    }
    let $ = f(9, I ? 20 : 11, I ? 30 : 16, 0.8, 1.25);
    (d(s, $, c(20, 12, 7, 1)), d(i, $, h(0)));
  };
  W2.wood.cells.forEach(([z, k]) =>
    l(z, k, 1, () => y(r(24, 34), r(92, 112), !1)),
  );
  let M = () => {
    m(s, 6, 74, c(52, 38, 26, 0.5), c(52, 38, 26, 0));
    for (let k = 0; k < 70; k++) {
      let I = a() * 6.2832,
        G = r(18, 46);
      ((s.fillStyle = c(24, 18, 14, r(0.3, 0.8))),
        s.beginPath(),
        s.arc(Math.cos(I) * G, Math.sin(I) * G, r(2, 6), 0, 6.2832),
        s.fill());
    }
    let z = f(12, 20, 30);
    (d(s, z, c(10, 8, 7, 1)),
      d(i, z, h(40)),
      m(i, 20, 60, h(100), h(128)),
      (s.lineCap = "round"));
    for (let k = 0; k < 16; k++) {
      let I = a() * 6.2832;
      ((s.strokeStyle = c(150, 140, 124, r(0.3, 0.7))),
        (s.lineWidth = r(1, 2)),
        s.beginPath(),
        s.moveTo(Math.cos(I) * 26, Math.sin(I) * 26),
        s.quadraticCurveTo(
          Math.cos(I + 0.4) * 40,
          Math.sin(I + 0.4) * 40,
          Math.cos(I + r(-0.3, 0.3)) * r(42, 60),
          Math.sin(I) * r(42, 60),
        ),
        s.stroke());
    }
  };
  W2.fabric.cells.forEach(([z, k]) => l(z, k, 1, M));
  let w = () => {
    (m(s, 20, 66, c(236, 236, 236, 0.4), c(236, 236, 236, 0)),
      m(i, 16, 50, h(96), h(128)));
    let z = f(12, 20, 25);
    (d(s, z, c(5, 5, 6, 1)),
      d(i, z, h(0)),
      (s.strokeStyle = c(245, 245, 245, 0.6)),
      (s.lineWidth = 2),
      u(s, z),
      s.stroke());
    for (let k = 0; k < 4; k++) p(a() * 6.2832, 24, r(54, 92), 1.6, 0.2);
  };
  (W2.plastic.cells.forEach(([z, k]) => l(z, k, 1, w)),
    l(5, 2, 1, () => {
      for (let z = 0; z < 26; z++) {
        let k = a() * 6.2832,
          I = r(0, 56);
        m(
          s,
          0,
          r(26, 60),
          c(10, 9, 8, 0.2),
          c(10, 9, 8, 0),
          Math.cos(k) * I,
          Math.sin(k) * I,
        );
      }
    }));
  let T = () => {
    m(s, 60, 126, c(212, 205, 194, 0.25), c(212, 205, 194, 0));
    let z = f(17, 78, 112);
    (d(s, z, c(200, 193, 182, 0.95)), d(i, z, h(88)));
    for (let k = 0; k < 16; k++) {
      let I = a() * 6.2832,
        G = r(0, 70),
        K = f(5, 16, 44, 1, 1, Math.cos(I) * G, Math.sin(I) * G),
        $ = r(-34, 16);
      (d(s, K, c(186 + $, 178 + $, 168 + $, 0.92)), d(i, K, h(r(40, 100))));
    }
    ((i.lineWidth = 4),
      (i.strokeStyle = h(152)),
      u(i, z),
      i.stroke(),
      (s.lineWidth = 2),
      (s.strokeStyle = c(110, 102, 94, 0.6)),
      u(s, z),
      s.stroke());
    for (let k = 0; k < 4; k++) {
      let I = a() * 6.2832,
        G = r(0, 44),
        K = f(8, 8, 15, 1, 1, Math.cos(I) * G, Math.sin(I) * G);
      (d(s, K, c(13, 12, 11, 1)), d(i, K, h(0)));
    }
    for (let k = 0; k < 6; k++) p(a() * 6.2832, 94, r(110, 126), 2, 0.2);
    x(26, 96, 124, (k) => c(208, 200, 190, 0.3 + k * 0.5));
  };
  W2.chunk.cells.forEach(([z, k]) => l(z, k, 1, T));
  let S = () => {
    let z = f(13, 44, 70);
    (d(s, z, c(224, 220, 212, 0.95)), d(i, z, h(84)));
    for (let I = 0; I < 9; I++) {
      let G = a() * 6.2832,
        K = r(0, 40),
        $ = f(4, 14, 34, 1, 1, Math.cos(G) * K, Math.sin(G) * K);
      (d(s, $, c(r(190, 240), r(188, 236), r(180, 226), 0.9)),
        d(i, $, h(r(46, 100))));
    }
    ((s.lineWidth = 2),
      (s.strokeStyle = c(252, 250, 246, 0.75)),
      u(s, z),
      s.stroke());
    for (let I = 0; I < 3; I++) {
      let G = a() * 6.2832,
        K = r(0, 26),
        $ = f(8, 8, 13, 1, 1, Math.cos(G) * K, Math.sin(G) * K);
      (d(s, $, c(16, 15, 14, 1)), d(i, $, h(0)));
    }
    let k = a() * 6.2832;
    for (let I = 0; I < 9; I++)
      p(k + (I / 9) * 6.2832 + r(-0.25, 0.25), 58, r(96, 126), r(2, 3.2), 0.7);
  };
  (W2.chunkCracked.cells.forEach(([z, k]) => l(z, k, 1, S)),
    l(4, 3, 1, () => y(r(50, 60), 112, !0)));
  let E = () => {
    for (let z = 0; z < 70; z++) {
      let k = a() * 6.2832,
        I = Math.pow(a(), 0.7) * 70;
      m(
        s,
        0,
        r(18, 46),
        c(8, 7, 6, 0.3),
        c(8, 7, 6, 0),
        Math.cos(k) * I,
        Math.sin(k) * I,
      );
    }
    for (let z = 0; z < 90; z++) {
      let k = a() * 6.2832,
        I = r(20, 60),
        G = r(70, 124),
        K = r(2, 7);
      (s.save(), s.rotate(k));
      let $ = s.createLinearGradient(I, 0, G, 0);
      ($.addColorStop(0, c(8, 7, 6, r(0.25, 0.55))),
        $.addColorStop(1, c(8, 7, 6, 0)),
        (s.fillStyle = $),
        s.beginPath(),
        s.moveTo(I, -K),
        s.lineTo(G, 0),
        s.lineTo(I, K),
        s.closePath(),
        s.fill(),
        s.restore());
    }
    m(s, 0, 40, c(4, 4, 4, 0.75), c(4, 4, 4, 0));
    for (let z = 0; z < 80; z++) {
      let k = a() * 6.2832,
        I = r(4, 50);
      ((s.fillStyle = c(120, 116, 110, r(0.15, 0.5))),
        s.beginPath(),
        s.arc(Math.cos(k) * I, Math.sin(k) * I, r(0.6, 1.8), 0, 6.2832),
        s.fill());
    }
    m(i, 0, 46, h(104), h(128));
    for (let z = 0; z < 22; z++) {
      let k = a() * 6.2832,
        I = r(4, 40),
        G = f(5, 2, 6, 1, 1, Math.cos(k) * I, Math.sin(k) * I);
      d(i, G, h(r(84, 110)));
    }
  };
  W2.scorch.cells.forEach(([z, k, I]) => l(z, k, I, E));
  let _ = i.getImageData(0, 0, o, o).data,
    R = createCanvas(o),
    C = R.getContext("2d"),
    L = C.createImageData(o, o),
    A = L.data,
    O = (z, k) =>
      _[
        ((k < 0 ? 0 : k >= o ? o - 1 : k) * o +
          (z < 0 ? 0 : z >= o ? o - 1 : z)) *
          4
      ],
    H = (3.4 * (o / 2048)) / 255;
  for (let z = 0; z < o; z++)
    for (let k = 0; k < o; k++) {
      let I =
          (O(k + 1, z - 1) +
            2 * O(k + 1, z) +
            O(k + 1, z + 1) -
            O(k - 1, z - 1) -
            2 * O(k - 1, z) -
            O(k - 1, z + 1)) *
          H,
        G =
          (O(k - 1, z + 1) +
            2 * O(k, z + 1) +
            O(k + 1, z + 1) -
            O(k - 1, z - 1) -
            2 * O(k, z - 1) -
            O(k + 1, z - 1)) *
          H,
        K = 1 / Math.sqrt(I * I + G * G + 1),
        $ = (z * o + k) * 4;
      ((A[$] = (-I * K * 0.5 + 0.5) * 255),
        (A[$ + 1] = (G * K * 0.5 + 0.5) * 255),
        (A[$ + 2] = (K * 0.5 + 0.5) * 255),
        (A[$ + 3] = 255));
    }
  C.putImageData(L, 0, 0);
  let F = new CanvasTexture(e);
  ((F.colorSpace = SRGBColorSpace), (F.anisotropy = 4));
  let P = new CanvasTexture(R);
  return (
    (P.colorSpace = NoColorSpace),
    (P.anisotropy = 4),
    {
      map: F,
      normalMap: P,
    }
  );
}
var WM = new Quaternion();
var IL = new Quaternion();
var HL = new Vector3(0, 0, 1);
var FL = new Vector3();
var OL = new Vector3();
var NL = new Matrix4();
var qM = new Color();
var y9 = new Vector3();
var BL = new Vector3();
var Nm = new Vector3();
var KY = new Vector3(0, 1, 0);
var UL = new Matrix4();
var KM = class {
  constructor(t = 600, e = 2048) {
    ((this.max = t), (this.i = 0), (this.full = !1));
    let { map: s, normalMap: n } = qY(e),
      i = (this.uniforms = {
        uDecalTime: {
          value: 0,
        },
        uDecalHead: {
          value: 0,
        },
        uDecalFull: {
          value: 0,
        },
        uDecalMax: {
          value: t,
        },
      }),
      a = (this.material = new MeshStandardMaterial({
        map: s,
        normalMap: n,
        normalScale: new Vector2(1.6, 1.6),
        transparent: !0,
        depthWrite: !1,
        roughness: 0.92,
        metalness: 0,
        polygonOffset: !0,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
      }));
    ((a.onBeforeCompile = (u) => {
      (Object.assign(u.uniforms, i),
        (u.vertexShader = u.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
          attribute vec4 iRect; attribute vec4 iInfo; attribute float iIndex;
          uniform float uDecalTime, uDecalHead, uDecalFull, uDecalMax;
          varying float vDFade, vDMetal, vDHeat; varying vec2 vDLocal;`,
          )
          .replace(
            "#include <uv_vertex>",
            `#include <uv_vertex>
          vMapUv = iRect.xy + uv * iRect.zw; vNormalMapUv = vMapUv; vDLocal = uv - 0.5;
          { float age = uDecalTime - iInfo.x; float life = iInfo.y;
            float ahead = mod(iIndex - uDecalHead + uDecalMax, uDecalMax);
            vDFade = (1.0 - smoothstep(life - 8.0, life, age)) * mix(1.0, smoothstep(0.0, 24.0, ahead), uDecalFull);
            vDMetal = iInfo.z; vDHeat = iInfo.w * exp(-max(age, 0.0) * 2.4); }`,
          )),
        (u.fragmentShader = u.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
          varying float vDFade, vDMetal, vDHeat; varying vec2 vDLocal;`,
          )
          .replace(
            "#include <map_fragment>",
            `#include <map_fragment>
          float dLum = dot(sampledDiffuseColor.rgb, vec3(0.333));
          diffuseColor.a *= vDFade;`,
          )
          .replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
          metalnessFactor = vDMetal * smoothstep(0.35, 0.8, dLum);`,
          )
          .replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.34, vDMetal * smoothstep(0.35, 0.8, dLum));`,
          )
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
          totalEmissiveRadiance += vec3(10.0, 2.6, 0.45) * vDHeat * (vDMetal > 0.5 ? smoothstep(0.4, 0.85, dLum) : smoothstep(0.34, 0.0, length(vDLocal)) * 0.5) * diffuseColor.a;`,
          )));
    }),
      (a.customProgramCacheKey = () => "fxDecal"));
    let r = new PlaneGeometry(1, 1),
      l = (u) => {
        let d = new InstancedBufferAttribute(new Float32Array(t * u), u);
        return (d.setUsage(DynamicDrawUsage), d);
      };
    (r.setAttribute("iRect", (this.aRect = l(4))),
      r.setAttribute("iInfo", (this.aInfo = l(4))));
    let c = new Float32Array(t);
    for (let u = 0; u < t; u++) c[u] = u;
    r.setAttribute("iIndex", new InstancedBufferAttribute(c, 1));
    let h = (this.mesh = new InstancedMesh(r, a, t));
    ((h.frustumCulled = !1), (h.receiveShadow = !0), (h.renderOrder = 2));
    let f = new Matrix4().makeScale(0, 0, 0);
    for (let u = 0; u < t; u++)
      (h.setMatrixAt(u, f), h.setColorAt(u, qM.setRGB(1, 1, 1)));
    ((this.px = new Float32Array(t * 3)),
      (this.kind = new Uint8Array(t)),
      (this.time = 0));
  }
  add(t, e, s, n = 0, i = null, a = NaN, r = 150) {
    let l = W2[t];
    if (!l) return -1;
    let c = l.cells[(Math.random() * l.cells.length) | 0];
    (n || (n = l.size[0] + Math.random() * (l.size[1] - l.size[0])),
      Nm.set(s.x, s.y, s.z),
      a !== a && (a = Math.random() * 6.2832),
      Math.abs(Nm.y) < 0.9
        ? (y9.crossVectors(KY, Nm).normalize(),
          BL.crossVectors(Nm, y9),
          UL.makeBasis(y9, BL, Nm),
          WM.setFromRotationMatrix(UL))
        : WM.setFromUnitVectors(HL, Nm),
      IL.setFromAxisAngle(HL, a),
      WM.multiply(IL));
    let h = this.i;
    (FL.set(e.x, e.y, e.z).addScaledVector(Nm, 0.0025 + (h % 7) * 3e-4),
      OL.set(n, n, 1),
      NL.compose(FL, WM, OL),
      this.mesh.setMatrixAt(h, NL),
      (this.mesh.instanceMatrix.needsUpdate = !0),
      i ? qM.setRGB(i[0], i[1], i[2]) : qM.setRGB(1, 1, 1),
      this.mesh.setColorAt(h, qM),
      (this.mesh.instanceColor.needsUpdate = !0));
    let f = this.aRect.array,
      u = this.aInfo.array,
      d = h * 4;
    return (
      (f[d] = c[0] / gb),
      (f[d + 1] = 1 - (c[1] + c[2]) / gb),
      (f[d + 2] = c[2] / gb),
      (f[d + 3] = c[2] / gb),
      (u[d] = this.time),
      (u[d + 1] = r),
      (u[d + 2] = l.metal || 0),
      (u[d + 3] = l.heat || 0),
      (this.aRect.needsUpdate = !0),
      (this.aInfo.needsUpdate = !0),
      (this.px[h * 3] = e.x),
      (this.px[h * 3 + 1] = e.y),
      (this.px[h * 3 + 2] = e.z),
      (this.kind[h] = 1),
      (this.i = (h + 1) % this.max),
      this.i === 0 && (this.full = !0),
      (this.uniforms.uDecalHead.value = this.i),
      (this.uniforms.uDecalFull.value = this.full ? 1 : 0),
      h
    );
  }
  clear() {
    let t = new Matrix4().makeScale(0, 0, 0);
    for (let e = 0; e < this.max; e++) this.mesh.setMatrixAt(e, t);
    ((this.mesh.instanceMatrix.needsUpdate = !0),
      (this.i = 0),
      (this.full = !1),
      (this.uniforms.uDecalHead.value = 0),
      (this.uniforms.uDecalFull.value = 0));
  }
  update(t) {
    ((this.time += t), (this.uniforms.uDecalTime.value = this.time));
  }
};

export { KM };

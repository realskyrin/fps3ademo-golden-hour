// ai/k9/mesh.js: recovered from the verified GOLDEN HOUR release.
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  Float32BufferAttribute,
  LinearFilter,
  LinearMipmapLinearFilter,
  Matrix4,
  MeshStandardMaterial,
  PlaneGeometry,
  Quaternion,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  Sphere,
  Uint16BufferAttribute,
  Vector2,
  Vector3,
  Vector4,
} from "../../vendor/three-r180.js";
import { createCanvas, createRandom } from "../../core/math.js";
import { Qe, jc, si, us } from "../../weapons/models/geometry.js";
import {
  $c,
  Hs,
  Ie,
  Mh,
  Pn,
  _c,
  b4,
  cn,
} from "../../weapons/models/attachments.js";
import { $u, Ph, a7, kf, ue, xs } from "./rig.js";
import { Kk, qk } from "../../player/operator-rig.js";

var h7 = Math.PI * 2;
var c7 = null;
var fC = typeof document > "u";
function gB(o, t, e = !1) {
  let s = new DataTexture(o, t, t, RGBAFormat);
  return (
    (s.wrapS = s.wrapT = RepeatWrapping),
    (s.generateMipmaps = !0),
    (s.minFilter = LinearMipmapLinearFilter),
    (s.magFilter = LinearFilter),
    (s.anisotropy = 8),
    e && (s.colorSpace = SRGBColorSpace),
    (s.needsUpdate = !0),
    s
  );
}
function mB(o, t, e, s, n) {
  for (let i = 0; i < t; i++)
    for (let a = 0; a < t; a++) {
      let r = (a + t - 1) % t,
        l = (a + 1) % t,
        c = (i + t - 1) % t,
        h = (i + 1) % t,
        f = (o[i * t + l] - o[i * t + r]) * e,
        u = (o[h * t + a] - o[c * t + a]) * e,
        d = 1 / Math.hypot(f, u, 1),
        m = (i * t + a) * 4 + n;
      ((s[m] = Math.round((-f * d * 0.5 + 0.5) * 255)),
        (s[m + 1] = Math.round((-u * d * 0.5 + 0.5) * 255)));
    }
}
function Xp(o, t, e, s, n = 0.5) {
  let i = new Float32Array(o * o),
    a = 1,
    r = 0;
  for (let l = 0; l < e; l++, t *= 2, a *= n) {
    let c = new Float32Array(t * t);
    for (let d = 0; d < c.length; d++) c[d] = s();
    let h = new Int32Array(o),
      f = new Int32Array(o),
      u = new Float32Array(o);
    for (let d = 0; d < o; d++) {
      let m = (d / o) * t,
        p = Math.floor(m),
        x = m - p;
      ((h[d] = p % t), (f[d] = (p + 1) % t), (u[d] = x * x * (3 - 2 * x)));
    }
    for (let d = 0; d < o; d++) {
      let m = h[d] * t,
        p = f[d] * t,
        x = u[d],
        g = d * o;
      for (let b = 0; b < o; b++) {
        let v = c[m + h[b]],
          y = c[m + f[b]],
          M = c[p + h[b]],
          w = c[p + f[b]],
          T = u[b],
          S = v + (y - v) * T;
        i[g + b] += a * (S + (M + (w - M) * T - S) * x);
      }
    }
    r += a;
  }
  for (let l = 0; l < i.length; l++) i[l] /= r;
  return i;
}
function _t0() {
  let t = new Uint8Array(262144),
    e = new Float32Array(256 * 256),
    s = createRandom(77),
    n = new Float32Array(256 * 256);
  for (let a = 0; a < n.length; a++) n[a] = s();
  {
    let a = Xp(256, 51, 2, s),
      r = Xp(256, 116, 1, s);
    for (let l = 0; l < e.length; l++)
      e[l] = a[l] * 1.5 + r[l] * 0.55 + n[l] * 0.22;
  }
  mB(e, 256, 1.5, t, 0);
  let i = 16;
  for (let a = 0; a < 256; a++)
    for (let r = 0; r < 256; r++) {
      let l = Math.floor(r / i),
        c = Math.floor(a / i),
        h = (r % i) / i - 0.5,
        f = (a % i) / i - 0.5,
        u = ((l + c) & 3) < 2,
        d = u ? h : f,
        m = u ? f : h,
        p =
          Math.cos(d * Math.PI) * 1 +
          0.16 * Math.cos(m * Math.PI * 0.9) +
          0.07 * Math.sin((u ? r : a) * 2.4 + n[a * 256 + r] * 2);
      e[a * 256 + r] = p + (u ? 0.12 : 0);
    }
  return (mB(e, 256, 1.25, t, 2), gB(t, 256));
}
function Rt0() {
  let t = new Uint8Array(262144),
    e = createRandom(1234),
    s = Xp(256, 6, 4, e),
    n = Xp(256, 21, 3, e),
    i = Xp(256, 30, 3, e),
    a = Xp(256, 52, 2, e),
    r = Xp(256, 4, 4, e),
    l = Xp(256, 9, 3, e),
    c = new Float32Array(256 * 256);
  for (let m = 0; m < 150; m++) {
    let p = e() * 256,
      x = e() * 256,
      g = e() * h7,
      b = 5 + e() * e() * 70,
      v = Math.cos(g),
      y = Math.sin(g),
      M = 0.35 + e() * 0.65,
      w = (e() - 0.5) * 0.02,
      T = v,
      S = y;
    for (let E = 0; E < b; E++) {
      let _ = (((x | 0) + 256) % 256) * 256 + (((p | 0) + 256) % 256);
      ((c[_] = Math.max(c[_], M * (1 - Math.abs(E / b - 0.5) * 1.2))),
        (p += T),
        (x += S));
      let R = T - S * w;
      ((S = S + T * w), (T = R));
    }
  }
  let h = 9,
    f = 256 / h,
    u = new Float32Array(h * h),
    d = new Float32Array(h * h);
  for (let m = 0; m < h * h; m++)
    ((u[m] = 0.15 + e() * 0.7), (d[m] = 0.15 + e() * 0.7));
  for (let m = 0; m < 256; m++)
    for (let p = 0; p < 256; p++) {
      let x = m * 256 + p,
        g = x * 4,
        b = s[x] * 0.65 + n[x] * 0.35;
      t[g] = Math.max(0, Math.min(255, (0.5 + (b - 0.5) * 2.3) * 255));
      let v = i[x] * 0.62 + (1 - Math.abs(2 * a[x] - 1)) * 0.38,
        y = Math.max(0, Math.min(1, (v - 0.52) * 3 + 0.5));
      t[g + 1] = Math.max(
        0,
        Math.min(255, Math.max(y * 0.86, c[m * 256 + p]) * 255),
      );
      let M = r[x],
        w = 1 - Math.abs(2 * l[x] - 1);
      t[g + 2] = Math.max(
        0,
        Math.min(255, (0.5 + (M * 0.7 + w * 0.3 - 0.5) * 2.4) * 255),
      );
      let T = p / f,
        S = m / f,
        E = Math.floor(T),
        _ = Math.floor(S),
        R = 9,
        C = 9;
      for (let A = -1; A <= 1; A++)
        for (let O = -1; O <= 1; O++) {
          let H = (((E + O) % h) + h) % h,
            F = (((_ + A) % h) + h) % h,
            P = F * h + H,
            z = E + O + u[P] - T,
            k = _ + A + d[P] - S,
            I = Math.hypot(z, k);
          I < R ? ((C = R), (R = I)) : I < C && (C = I);
        }
      let L = (C - R) * f;
      t[g + 3] = Math.max(0, Math.min(255, (1 - L / 1.6) * 255));
    }
  return gB(t, 256);
}
var Bo = "#e4e1d6";
var k2 = "#e0b21c";
var to = "#131313";
var At0 = "#c23a2a";
var Kp = "#9a9da1";
function kt0() {
  let e = {};
  if (fC)
    return {
      tex: null,
      cells: new Proxy(
        {},
        {
          get: () => [0, 0, 0, 0, 1],
        },
      ),
    };
  let s = createCanvas(2048, 1024),
    n = s.getContext("2d", {
      willReadFrequently: !0,
    });
  (n.clearRect(0, 0, 2048, 1024), (n.textBaseline = "middle"));
  let i = (g, b = 700) =>
      `${b} ${g}px Bahnschrift, "Segoe UI", Arial, sans-serif`,
    a = 8,
    r = 8,
    l = 0,
    c = (g, b, v, y) => {
      if ((a + b > 2044 && ((a = 8), (r += l + 8), (l = 0)), r + v > 1024))
        throw new Error("k9: marking atlas is full at " + g);
      (n.save(),
        n.translate(a, r),
        n.beginPath(),
        n.rect(0, 0, b, v),
        n.clip(),
        (n.fillStyle = Bo),
        (n.strokeStyle = Bo),
        (n.lineWidth = 4),
        (n.textAlign = "left"),
        y(b, v),
        n.restore(),
        (e[g] = [
          a / 2048,
          1 - (r + v) / 1024,
          (a + b) / 2048,
          1 - r / 1024,
          b / v,
        ]),
        (a += b + 8),
        (l = Math.max(l, v)));
    },
    h = (g, b, v, y, M = 700, w = null, T = 0) => {
      if (((n.font = i(b, M)), w && (n.fillStyle = w), T))
        try {
          n.letterSpacing = T + "px";
        } catch {}
      if ((n.fillText(g, v, y), T))
        try {
          n.letterSpacing = "0px";
        } catch {}
    },
    f = (g, b, v, y, M, w = 4) => {
      (h(g, b, v, y, 700, Bo, w),
        n.save(),
        (n.globalCompositeOperation = "destination-out"));
      let T = n.measureText(g).width + w * g.length;
      for (let S = 0.5; S < g.length; S++)
        n.fillRect(
          v + (T * S) / g.length - b * 0.035,
          y - b * 0.6,
          b * 0.07,
          b * 1.2,
        );
      n.restore();
    },
    u = (g, b, v, y) => {
      ((n.fillStyle = y),
        n.beginPath(),
        n.moveTo(g + 0.18 * v, b - 0.5 * v),
        n.lineTo(g - 0.28 * v, b + 0.06 * v),
        n.lineTo(g - 0.02 * v, b + 0.06 * v),
        n.lineTo(g - 0.2 * v, b + 0.5 * v),
        n.lineTo(g + 0.3 * v, b - 0.1 * v),
        n.lineTo(g + 0.04 * v, b - 0.1 * v),
        n.closePath(),
        n.fill());
    },
    d = (g, b, v, y, M) => {
      (n.beginPath(),
        n.moveTo(g, b - v * 0.58),
        n.lineTo(g + v * 0.6, b + v * 0.46),
        n.lineTo(g - v * 0.6, b + v * 0.46),
        n.closePath(),
        (n.fillStyle = y),
        n.fill(),
        (n.lineJoin = "round"),
        (n.lineWidth = v * 0.09),
        (n.strokeStyle = M),
        n.stroke());
    },
    m = (g, b, v, y, M = 10) => {
      let w = Math.atan2(y - b, v - g);
      (n.beginPath(),
        n.moveTo(g, b),
        n.lineTo(v - Math.cos(w) * M, y - Math.sin(w) * M),
        n.stroke(),
        n.beginPath(),
        n.moveTo(v, y),
        n.lineTo(v - Math.cos(w - 0.5) * M * 2, y - Math.sin(w - 0.5) * M * 2),
        n.lineTo(v - Math.cos(w + 0.5) * M * 2, y - Math.sin(w + 0.5) * M * 2),
        n.closePath(),
        n.fill());
    },
    p = (g, b, v = 44) => {
      ((n.fillStyle = k2), n.fillRect(0, 0, g, b), (n.fillStyle = to));
      for (let y = -b; y < g + b; y += v)
        (n.beginPath(),
          n.moveTo(y, b),
          n.lineTo(y + v / 2, b),
          n.lineTo(y + v / 2 + b, 0),
          n.lineTo(y + b, 0),
          n.closePath(),
          n.fill());
    };
  (c("brand", 760, 150, (g, b) => {
    (f("GH-ARMS", 104, 6, 80, g, 5),
      (n.fillStyle = Bo),
      n.fillRect(578, 26, 8, 104),
      h("K9", 92, 604, 62, 700, Bo),
      h("UNIT", 40, 608, 122, 700, Bo, 6));
  }),
    c("unit", 500, 190, () => {
      f("K9-07", 150, 6, 100, 0, 6);
    }),
    c("unitSm", 240, 84, () => {
      h("K9-07", 76, 4, 44, 700, Bo, 2);
    }),
    c("chev", 150, 150, () => {
      ((n.lineWidth = 16), (n.lineJoin = "miter"));
      for (let g = 0; g < 3; g++)
        (n.beginPath(),
          n.moveTo(20, 46 + g * 36),
          n.lineTo(75, 14 + g * 36),
          n.lineTo(130, 46 + g * 36),
          n.stroke());
    }),
    c("plate", 520, 230, (g, b) => {
      ((n.fillStyle = "#b9b3a2"),
        n.fillRect(0, 0, g, b),
        (n.strokeStyle = to),
        (n.lineWidth = 4),
        n.strokeRect(8, 8, g - 16, b - 16),
        h("GH-ARMS  TACTICAL ROBOTICS", 28, 22, 34, 700, to),
        (n.fillStyle = to),
        n.fillRect(22, 54, g - 44, 3),
        h("MODEL", 19, 22, 80, 600, to),
        h('K9-MK2 "WARDEN"', 26, 130, 80, 700, to),
        h("SERIAL", 19, 22, 114, 600, to),
        h("GH-K9-004177", 26, 130, 114, 700, to),
        h("MASS", 19, 22, 148, 600, to),
        h("31.4 kg", 26, 130, 148, 700, to),
        h("IP67", 26, 300, 148, 700, to),
        h("BUS", 19, 22, 182, 600, to),
        h("58 V DC   40 A MAX", 26, 130, 182, 700, to),
        h("MFD 2031-08   LOT 17   PROPERTY OF GH-ARMS", 16, 22, 210, 600, to));
    }),
    c("hv", 440, 200, (g, b) => {
      ((n.fillStyle = k2),
        n.fillRect(0, 0, g, b),
        (n.strokeStyle = to),
        (n.lineWidth = 6),
        n.strokeRect(6, 6, g - 12, b - 12),
        d(84, 104, 120, k2, to),
        u(84, 112, 62, to),
        h("DANGER", 50, 168, 52, 700, to),
        h("HIGH VOLTAGE", 34, 168, 100, 700, to),
        h("50 kV SHOCK HEAD", 22, 168, 138, 600, to),
        h("KEEP CLEAR OF JAW", 22, 168, 166, 600, to));
    }),
    c("pinch", 400, 110, (g, b) => {
      ((n.fillStyle = k2),
        n.fillRect(0, 0, g, b),
        (n.strokeStyle = to),
        (n.lineWidth = 5),
        n.strokeRect(5, 5, g - 10, b - 10),
        d(58, 58, 78, k2, to),
        h("!", 44, 49, 62, 700, to),
        h("PINCH POINT", 34, 116, 40, 700, to),
        h("KEEP HANDS CLEAR", 22, 116, 78, 600, to));
    }),
    c("hazard", 512, 56, (g, b) => p(g, b)),
    c("nostep", 250, 70, () => {
      ((n.lineWidth = 5),
        n.strokeRect(4, 4, 242, 62),
        h("NO STEP", 44, 22, 37, 700, Bo, 3));
    }),
    c("lift", 240, 90, () => {
      (h("LIFT", 54, 76, 30, 700, Bo, 4),
        h("HERE", 30, 80, 70, 700, Bo, 6),
        (n.lineWidth = 9),
        m(34, 82, 34, 12, 12));
    }),
    c("chg", 330, 130, () => {
      ((n.lineWidth = 5),
        n.beginPath(),
        n.arc(58, 64, 46, 0, h7),
        n.stroke(),
        u(58, 64, 58, Bo),
        h("CHARGE", 44, 122, 40, 700, Bo, 2),
        h("58 V DC  20 A", 30, 124, 80, 700, Bo),
        h("DC ONLY", 22, 124, 110, 600, Bo, 3));
    }),
    c("batt", 440, 120, () => {
      (h("BP-58", 66, 6, 38, 700, Bo, 2),
        h("LI-ION  58 V  12.4 Ah  720 Wh", 24, 8, 84, 600, Bo),
        h("GH-ARMS  \xB7  DO NOT CRUSH OR PUNCTURE", 17, 8, 108, 600, Bo),
        (n.lineWidth = 4),
        n.strokeRect(330, 10, 98, 52),
        n.fillRect(428, 26, 8, 20),
        h("+", 40, 366, 36, 700, Bo));
    }),
    c("laser", 400, 96, (g, b) => {
      ((n.fillStyle = k2),
        n.fillRect(0, 0, g, b),
        (n.fillStyle = to),
        n.fillRect(5, 5, g - 10, 30),
        h("CAUTION", 24, 150, 21, 700, k2, 3),
        h("CLASS 1 LASER PRODUCT", 23, 12, 54, 700, to),
        h("LIDAR 905 nm \xB7 IR ILLUMINATOR 850 nm", 16, 12, 80, 600, to));
    }),
    c("estop", 190, 190, (g, b) => {
      ((n.fillStyle = k2),
        n.beginPath(),
        n.arc(95, 95, 92, 0, h7),
        n.fill(),
        (n.fillStyle = to),
        (n.font = i(24, 700)),
        (n.textAlign = "center"));
      let v = "EMERGENCY STOP \xB7 EMERGENCY STOP \xB7 ";
      for (let y = 0; y < v.length; y++) {
        let M = (y / v.length) * h7;
        (n.save(),
          n.translate(95 + Math.sin(M) * 72, 95 - Math.cos(M) * 72),
          n.rotate(M),
          n.fillText(v[y], 0, 0),
          n.restore());
      }
    }),
    c("belt", 300, 60, () => {
      (h("BELT TENSION  45 N", 26, 4, 20, 700, Kp),
        h("CHECK EVERY 200 H", 18, 4, 46, 600, Kp, 1));
    }),
    c("torque", 240, 40, () => {
      h("M5 \xB7 6.5 Nm \xB7 LOCTITE 243", 18, 4, 21, 600, Kp);
    }),
    c("sn", 300, 44, () => {
      h("SN GH-K9-004177", 28, 4, 23, 700, Kp, 1);
    }),
    c("gh", 150, 110, () => {
      ((n.lineWidth = 7),
        n.strokeRect(6, 6, 138, 98),
        h("GH", 72, 26, 58, 700, Bo));
    }),
    c("ghEng", 300, 70, () => {
      h("GH-ARMS", 54, 4, 38, 700, Kp, 4);
    }),
    c("arrowFwd", 150, 70, () => {
      ((n.lineWidth = 10), m(12, 35, 136, 35, 14));
    }),
    c("fwd", 250, 70, () => {
      (h("FWD", 46, 6, 37, 700, Bo, 6),
        (n.lineWidth = 9),
        m(130, 35, 240, 35, 12));
    }),
    c("ant", 230, 54, () => {
      h("ANT \xB7 2.4 / 5.8 GHz", 22, 4, 28, 600, Bo);
    }),
    c("vent", 300, 54, () => {
      (h("HOT SURFACE", 30, 54, 28, 700, k2, 2),
        d(24, 28, 42, k2, to),
        h("!", 22, 19, 32, 700, to));
    }),
    c("idx", 60, 60, () => {
      ((n.fillStyle = Bo),
        n.beginPath(),
        n.moveTo(30, 6),
        n.lineTo(54, 54),
        n.lineTo(6, 54),
        n.closePath(),
        n.fill());
    }),
    c("white", 48, 48, (g, b) => {
      ((n.fillStyle = Bo), n.fillRect(0, 0, g, b));
    }),
    c("redLine", 48, 48, (g, b) => {
      ((n.fillStyle = At0), n.fillRect(0, 0, g, b));
    }),
    c("yel", 48, 48, (g, b) => {
      ((n.fillStyle = k2), n.fillRect(0, 0, g, b));
    }),
    c("legFL", 150, 70, () => {
      h("FL", 54, 8, 37, 700, Bo, 4);
    }),
    c("legFR", 150, 70, () => {
      h("FR", 54, 8, 37, 700, Bo, 4);
    }),
    c("legHL", 150, 70, () => {
      h("HL", 54, 8, 37, 700, Bo, 4);
    }),
    c("legHR", 150, 70, () => {
      h("HR", 54, 8, 37, 700, Bo, 4);
    }),
    c("cam", 260, 44, () => {
      h("STEREO \xB7 IR \xB7 LIDAR", 22, 4, 23, 600, Kp, 1);
    }),
    c("skid", 380, 60, () => {
      (h("SKID PLATE  \xB7  REPLACE AT WEAR MARK", 19, 4, 20, 600, Kp),
        (n.fillStyle = Kp),
        n.fillRect(4, 40, 360, 4));
    }),
    c("qr", 120, 120, (g, b) => {
      ((n.fillStyle = Bo), n.fillRect(0, 0, g, b));
      let v = createRandom(5);
      n.fillStyle = to;
      for (let y = 0; y < 12; y++)
        for (let M = 0; M < 12; M++)
          v() < 0.48 && n.fillRect(12 + M * 8, 12 + y * 8, 8, 8);
      for (let [y, M] of [
        [12, 12],
        [76, 12],
        [12, 76],
      ])
        ((n.fillStyle = to),
          n.fillRect(y, M, 32, 32),
          (n.fillStyle = Bo),
          n.fillRect(y + 6, M + 6, 20, 20),
          (n.fillStyle = to),
          n.fillRect(y + 11, M + 11, 10, 10));
    }));
  let x = new CanvasTexture(s);
  return (
    (x.anisotropy = 8),
    (x.colorSpace = SRGBColorSpace),
    (x.channel = 1),
    (x.wrapS = x.wrapT = ClampToEdgeWrapping),
    (x.premultiplyAlpha = !0),
    {
      tex: x,
      cells: e,
    }
  );
}
function f7() {
  if (c7) return c7;
  let o = typeof performance < "u" ? performance.now() : 0,
    t = () => (typeof performance < "u" ? performance.now() : 0),
    e = t(),
    s = fC ? null : _t0(),
    n = t(),
    i = fC ? null : Rt0(),
    a = t(),
    r = kt0(),
    l = t();
  return (
    (c7 = {
      detail: s,
      mask: i,
      marks: r.tex,
      cells: r.cells,
      parts: [n - e, a - n, l - a].map((c) => +c.toFixed(1)),
      ms: (typeof performance < "u" ? performance.now() : 0) - o,
      bytes: Math.round(((256 * 256 * 4 * 2 + 2048 * 1024 * 4) * 4) / 3),
    }),
    c7
  );
}
var wi = (o, t, e = {}) =>
  us(o, t, {
    b: 0.8,
    cs: 2,
    ...e,
  });
var j5 = (o, t, e = {}) =>
  si(o, t, {
    b: 0.8,
    cs: 2,
    ...e,
  });
var d7 = (o, t, e = {}) =>
  jc(o, t, {
    b: 0.8,
    cs: 2,
    ...e,
  });
var $5 = (o, t, e = 0, s = 0, n = 0) => [
  [s - o / 2, n - t / 2, e],
  [s + o / 2, n - t / 2, e],
  [s + o / 2, n + t / 2, e],
  [s - o / 2, n + t / 2, e],
];
var uC = (o, t, e = 0, s = 0, n = 0) =>
  Array.from(
    {
      length: o,
    },
    (i, a) => [
      s + Math.cos(e + (a / o) * Pn) * t,
      n + Math.sin(e + (a / o) * Pn) * t,
    ],
  );
var dC = (o, t, e) => (o < t ? t : o > e ? e : o);
var pC = (o, t, e) => {
  let s = dC((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
function Nn(o, t, e, s = {}) {
  return _c(
    cn(o, {
      seg: 16,
      ...s,
    }),
    t,
    e,
  );
}
function h1(o, t, e, s, n, i = {}) {
  let a = i.c ?? Math.min(1.2, o * 0.12),
    r = i.cap0 !== !1,
    l = i.cap1 !== !1,
    c = [];
  return (
    r && c.push([t, i.bore || 0]),
    c.push([t, o - a], [t + a, o, 1], [e - a, o], [e, o - a, 1]),
    l && c.push([e, i.bore || 0]),
    Nn(c, s, n, i)
  );
}
function Ct0(o, t = {}) {
  let e = o.length,
    s = o[0].length,
    n = t.closed !== !1,
    i = Math.cos((t.crease ?? 34) * Hs),
    a = n ? s : s - 1,
    r = new Float32Array((e - 1) * a * 3),
    l = 0,
    c = 0,
    h = 0;
  for (let x of o) for (let g of x) ((l += g[0]), (c += g[1]), (h += g[2]));
  ((l /= e * s), (c /= e * s), (h /= e * s));
  let f = 0;
  for (let x = 0; x < e - 1; x++)
    for (let g = 0; g < a; g++) {
      let b = o[x][g],
        v = o[x][(g + 1) % s],
        y = o[x + 1][(g + 1) % s],
        M = o[x + 1][g],
        w = y[0] - b[0],
        T = y[1] - b[1],
        S = y[2] - b[2],
        E = M[0] - v[0],
        _ = M[1] - v[1],
        R = M[2] - v[2],
        C = T * R - S * _,
        L = S * E - w * R,
        A = w * _ - T * E,
        O = Math.hypot(C, L, A) || 1;
      ((C /= O), (L /= O), (A /= O));
      let H = (x * a + g) * 3;
      ((r[H] = C),
        (r[H + 1] = L),
        (r[H + 2] = A),
        (f +=
          C * ((b[0] + y[0]) / 2 - l) +
          L * ((b[1] + y[1]) / 2 - c) +
          A * ((b[2] + y[2]) / 2 - h)));
    }
  let u = t.flip != null ? t.flip : f < 0,
    d = u ? -1 : 1,
    m = new $c(),
    p = (x, g, b, v) => {
      let y = (b * a + v) * 3,
        M = r[y],
        w = r[y + 1],
        T = r[y + 2],
        S = 0,
        E = 0,
        _ = 0;
      for (let C = -1; C <= 0; C++)
        for (let L = -1; L <= 0; L++) {
          let A = x + C,
            O = g + L;
          if (A < 0 || A >= e - 1) continue;
          if (n) O = (O + a) % a;
          else if (O < 0 || O >= a) continue;
          let H = (A * a + O) * 3;
          r[H] * M + r[H + 1] * w + r[H + 2] * T > i &&
            ((S += r[H]), (E += r[H + 1]), (_ += r[H + 2]));
        }
      let R = Math.hypot(S, E, _) || 1;
      return [(S / R) * d, (E / R) * d, (_ / R) * d];
    };
  for (let x = 0; x < e - 1; x++)
    for (let g = 0; g < a; g++) {
      let b = (g + 1) % s,
        v = o[x][g],
        y = o[x][b],
        M = o[x + 1][b],
        w = o[x + 1][g],
        T = (v[3] && w[3]) || (t.flagRing && t.flagRing(x)) ? 2 : 1,
        S = [
          p(x, g, x, g),
          p(x, g + 1, x, g),
          p(x + 1, g + 1, x, g),
          p(x + 1, g, x, g),
        ];
      u
        ? m.quad(v, w, M, y, [S[0], S[3], S[2], S[1]], null, T)
        : m.quad(v, y, M, w, S, null, T);
    }
  for (let [x, g, b] of [
    [t.capA, o[0], o[1]],
    [t.capB, o[e - 1], o[e - 2]],
  ]) {
    if (!x) continue;
    let v = [0, 0, 0],
      y = [0, 0, 0];
    for (let M = 0; M < s; M++)
      for (let w = 0; w < 3; w++)
        ((v[w] += g[M][w] / s), (y[w] += b[M][w] / s));
    for (let M = 0; M < s; M++) {
      let w = g[M],
        T = g[(M + 1) % s],
        S = w[0] - v[0],
        E = w[1] - v[1],
        _ = w[2] - v[2],
        R = T[0] - v[0],
        C = T[1] - v[1],
        L = T[2] - v[2],
        A = E * L - _ * C,
        O = _ * R - S * L,
        H = S * C - E * R;
      A * (v[0] - y[0]) + O * (v[1] - y[1]) + H * (v[2] - y[2]) >= 0
        ? m.tri(v, w, T)
        : m.tri(v, T, w);
    }
  }
  return m.geo();
}
var Z5 = (o, t) =>
  Ct0(
    o.map((e) => e.map((s) => [s[0], s[1], -s[2], s[3]])),
    t,
  );
function ya(o, t, e, s, n = "xy", i = 0, a = 0, r = null) {
  let l = o / 2,
    c = t / 2,
    h = r || [e, e, e, e];
  return [
    [l, c - h[0], 1],
    [l - h[0], c, 0],
    [-l + h[1], c, 1],
    [-l, c - h[1], 0],
    [-l, -c + h[2], 1],
    [-l + h[2], -c, 0],
    [l - h[3], -c, 1],
    [l, -c + h[3], 0],
  ].map((u) => {
    let d = i + u[0],
      m = a + u[1];
    return n === "xy"
      ? [d, m, s, u[2]]
      : n === "xu"
        ? [d, s, m, u[2]]
        : [s, m, d, u[2]];
  });
}
function X4(o, t = 6, e = {}) {
  let s = e.c ?? 1.6,
    n = e.half || 0,
    i = o.length,
    a = Math.sign(o[i - 1].u - o[0].u) || 1,
    r = (u, d, m) => {
      let p = n
        ? u.P.map((E) => [E[0] * n, E[1]])
        : [
            ...u.P.map((E) => [E[0], E[1]]),
            ...u.P.slice()
              .reverse()
              .map((E) => [-E[0], E[1]]),
          ];
      n < 0 && p.reverse();
      let x = p.length,
        g = u.t ?? t,
        b = [];
      for (let E = 0; E < x; E++) {
        let _ = p[Math.max(0, E - 1)],
          R = p[Math.max(0, E - 1) + 1],
          C = p[Math.min(x - 2, E)],
          L = p[Math.min(x - 2, E) + 1],
          A = -(R[1] - _[1]),
          O = R[0] - _[0],
          H = -(L[1] - C[1]),
          F = L[0] - C[0],
          P = Math.hypot(A, O) || 1,
          z = Math.hypot(H, F) || 1;
        ((A /= P), (O /= P), (H /= z), (F /= z));
        let k = A + H,
          I = O + F,
          G = Math.hypot(k, I) || 1;
        ((k /= G), (I /= G));
        let K = g / Math.max(0.5, k * A + I * O);
        b.push([p[E][0] + k * K, p[E][1] + I * K]);
      }
      if (m)
        for (let E = 0; E < x; E++) {
          let _ = b[E][0] - p[E][0],
            R = b[E][1] - p[E][1],
            C = Math.hypot(_, R) || 1;
          ((p[E] = [p[E][0] + (_ / C) * m, p[E][1] + (R / C) * m]),
            (b[E] = [
              b[E][0] - (_ / C) * m * 0.5,
              b[E][1] - (R / C) * m * 0.5,
            ]));
        }
      let v = (E, _, R) => {
          let C = _[0] - E[0],
            L = _[1] - E[1],
            A = Math.hypot(C, L) || 1;
          return [E[0] + (C / A) * R, E[1] + (L / A) * R];
        },
        y = v(p[0], p[1], s),
        M = v(p[0], b[0], s),
        w = v(p[x - 1], p[x - 2], s),
        T = v(p[x - 1], b[x - 1], s),
        S = [];
      S.push([M[0], M[1], d, 1], [y[0], y[1], d, 0]);
      for (let E = 1; E < x - 1; E++) S.push([p[E][0], p[E][1], d, 0]);
      S.push([w[0], w[1], d, 1], [T[0], T[1], d, 1]);
      for (let E = x - 1; E >= 0; E--)
        S.push([b[E][0], b[E][1], d, E === 0 ? 1 : 0]);
      return ((S.m = x), S);
    },
    l = [r(o[0], o[0].u, s)];
  for (let u = 0; u < i; u++)
    l.push(
      r(
        o[u],
        u === 0 ? o[0].u + a * s : u === i - 1 ? o[u].u - a * s : o[u].u,
        0,
      ),
    );
  l.push(r(o[i - 1], o[i - 1].u, s));
  let c = l.length,
    h = Z5(l, {
      crease: e.crease ?? 30,
      flip: a > 0,
      flagRing: (u) => u === 0 || u === c - 2,
    }),
    f = new $c();
  for (let [u, d] of [
    [l[0], -a],
    [l[c - 1], a],
  ]) {
    let m = u.m,
      p = u.length,
      x = u.slice(0, m + 2),
      g = [u[p - 1]];
    for (let y = 0; y < m; y++) g.push(u[p - 1 - y]);
    g.push(u[m + 2]);
    let b = (y) => [y[0], y[1], -y[2]],
      v = [
        [0, 0, -d],
        [0, 0, -d],
        [0, 0, -d],
        [0, 0, -d],
      ];
    for (let y = 0; y < m + 1; y++) {
      let M = b(x[y]),
        w = b(x[y + 1]),
        T = b(g[y + 1]),
        S = b(g[y]),
        E = w[0] - M[0],
        _ = w[1] - M[1],
        R = S[0] - M[0],
        C = S[1] - M[1];
      E * C - _ * R > 0 == -d > 0
        ? f.quad(M, w, T, S, v, null, 1)
        : f.quad(M, S, T, w, v, null, 1);
    }
  }
  return [h, f.geo()];
}
function p7(o, t, e, s, n, i, a = 8) {
  let r = s - o,
    l = n - t,
    c = Math.hypot(r, l),
    h = Math.atan2(l, r),
    f = Math.acos(dC((e - i) / c, -1, 1)),
    u = [];
  for (let m = 0; m <= a; m++) {
    let p = h + f + ((Pn - 2 * f) * m) / a;
    u.push([o + Math.cos(p) * e, t + Math.sin(p) * e]);
  }
  let d = Math.max(2, Math.round(a * 0.75));
  for (let m = 0; m <= d; m++) {
    let p = h - f + (2 * f * m) / d;
    u.push([s + Math.cos(p) * i, n + Math.sin(p) * i]);
  }
  return u;
}
function xB(o = 5, t = 2.2, e = 0.3) {
  let s = o / 2 / Math.cos(Math.PI / 6),
    n = new $c(),
    i = [0, 0, t];
  for (let a = 0; a < 6; a++) {
    let r = e + (a / 6) * Pn,
      l = e + ((a + 1) / 6) * Pn,
      c = [Math.cos(r) * s, Math.sin(r) * s, 0],
      h = [Math.cos(l) * s, Math.sin(l) * s, 0],
      f = [c[0] * 0.9, c[1] * 0.9, t],
      u = [h[0] * 0.9, h[1] * 0.9, t];
    (n.quad(c, h, u, f, null, null, 2), n.tri(i, f, u, null, null, 1));
  }
  return n.geo();
}
var Pt0 = (o) => {
  let t = new Color(o);
  return [t.r, t.g, t.b];
};
var ar = (o, t, e, s = {}) => ({
  c: Pt0(o),
  m: t,
  r: e,
  nrm: 0.3,
  weave: 0,
  wear: 0.05,
  edge: 0.5,
  dust: 0.25,
  paint: 0,
  team: 0,
  ...s,
});
var bB = {
  armor: ar(16777215, 0, 0.5, {
    nrm: 0.34,
    paint: 1,
    wear: 0.05,
    edge: 0.36,
    dust: 0.14,
  }),
  armorDk: ar(10132122, 0, 0.56, {
    nrm: 0.34,
    paint: 1,
    wear: 0.05,
    edge: 0.36,
    dust: 0.16,
  }),
  frame: ar(4540235, 0.72, 0.46, {
    nrm: 0.16,
    wear: 0.02,
    edge: 0.24,
    dust: 0.16,
  }),
  frameDk: ar(3750461, 0.6, 0.55, {
    nrm: 0.2,
    wear: 0.03,
    edge: 0.5,
    dust: 0.3,
  }),
  metal: ar(11843256, 1, 0.33, {
    nrm: 0.1,
    wear: 0,
    edge: 0.25,
    dust: 0.1,
  }),
  steel: ar(7303540, 0.95, 0.38, {
    nrm: 0.14,
    wear: 0.02,
    edge: 0.4,
    dust: 0.12,
  }),
  oxide: ar(4276804, 0.85, 0.44, {
    nrm: 0.14,
    wear: 0.04,
    edge: 0.4,
    dust: 0.1,
  }),
  carbon: ar(4013633, 0.3, 0.3, {
    nrm: 0,
    weave: 1,
    wear: 0.02,
    edge: 0.3,
    dust: 0.14,
  }),
  rubber: ar(3750202, 0, 0.9, {
    nrm: 0.8,
    wear: 0,
    edge: 0,
    dust: 0.3,
  }),
  sleeve: ar(3947582, 0, 0.78, {
    nrm: 0.7,
    wear: 0,
    edge: 0,
    dust: 0.2,
  }),
  hv: ar(13081118, 0, 0.55, {
    nrm: 0.3,
    wear: 0,
    edge: 0,
    dust: 0.3,
  }),
  poly: ar(4342598, 0, 0.62, {
    nrm: 0.4,
    wear: 0.03,
    edge: 0.3,
    dust: 0.18,
  }),
  glass: ar(3816770, 0, 0.06, {
    nrm: 0,
    wear: 0,
    edge: 0,
    dust: 0.08,
  }),
  coat: ar(5913190, 0.6, 0.08, {
    nrm: 0,
    wear: 0,
    edge: 0,
    dust: 0.05,
  }),
  ceramic: ar(14276300, 0, 0.28, {
    nrm: 0.1,
    wear: 0,
    edge: 0,
    dust: 0.35,
  }),
  brass: ar(12159548, 1, 0.3, {
    nrm: 0.1,
    wear: 0,
    edge: 0.2,
    dust: 0.15,
  }),
  tungsten: ar(9277331, 1, 0.26, {
    nrm: 0.1,
    wear: 0,
    edge: 0.2,
    dust: 0.05,
  }),
  red: ar(11871772, 0, 0.45, {
    nrm: 0.2,
    wear: 0.04,
    edge: 0.5,
    dust: 0.2,
  }),
  lamp: ar(5790044, 0, 0.35, {
    nrm: 0,
    wear: 0,
    edge: 0,
    dust: 0.05,
  }),
  stripe: ar(16777215, 0, 0.5, {
    nrm: 0.34,
    paint: 1,
    wear: 0.1,
    edge: 0.5,
    dust: 0.14,
    team: 1,
  }),
};
var Cf = (o, t) => ({
  ...bB[o],
  ...t,
});
var nv = 16;
var Da = class {
  constructor(t) {
    ((this.name = t),
      (this.n = 0),
      (this.cap = 0),
      (this.pos = this.nrm = this.col = this.uv = this.uv1 = this.at = null),
      this.grow(3e3));
  }
  grow(t) {
    if (t <= this.cap) return;
    let e = Math.max(t, this.cap * 2),
      s = (n, i) => {
        let a = new Float32Array(e * i);
        return (n && a.set(n.subarray(0, this.n * i)), a);
      };
    ((this.pos = s(this.pos, 3)),
      (this.nrm = s(this.nrm, 3)),
      (this.col = s(this.col, 3)),
      (this.uv = s(this.uv, 2)),
      (this.uv1 = s(this.uv1, 2)),
      (this.at = s(this.at, nv)),
      (this.cap = e));
  }
  get tris() {
    return this.n / 3;
  }
  put(t, e, s = {}) {
    let n = typeof t == "string" ? bB[t] : t;
    if (!n) throw new Error("k9: unknown look " + t);
    for (let i of Array.isArray(e) ? e : [e]) {
      if (!i) continue;
      let a = i.index ? i.toNonIndexed() : i,
        r = a.attributes.position,
        l = a.attributes.normal,
        c = a.attributes.color,
        h = a.attributes.uv,
        f = r.count;
      this.grow(this.n + f);
      let u = s.color || n.c;
      for (let d = 0; d < f; d++) {
        let m = this.n + d,
          p = r.getX(d),
          x = r.getY(d),
          g = r.getZ(d);
        ((this.pos[m * 3] = p),
          (this.pos[m * 3 + 1] = x),
          (this.pos[m * 3 + 2] = g),
          (this.nrm[m * 3] = l.getX(d)),
          (this.nrm[m * 3 + 1] = l.getY(d)),
          (this.nrm[m * 3 + 2] = l.getZ(d)));
        let b = u[0],
          v = u[1],
          y = u[2];
        if (s.tint) {
          let S = s.tint(p, x, g);
          S && ((b *= S[0]), (v *= S[1]), (y *= S[2]));
        }
        ((this.col[m * 3] = b),
          (this.col[m * 3 + 1] = v),
          (this.col[m * 3 + 2] = y));
        let M = c && c.getX(d) > 1.5,
          w = m * nv,
          T = this.at;
        ((T[w] = s.m ?? n.m),
          (T[w + 1] = s.r ?? n.r),
          (T[w + 2] = s.noAO ? -(s.ao ?? 1) : (s.ao ?? 1)),
          (T[w + 3] = s.nrm ?? n.nrm),
          (T[w + 4] = Math.min(
            1,
            (s.wear ?? n.wear) + (M ? (s.edge ?? n.edge) : 0),
          )),
          (T[w + 5] = s.dust ?? n.dust),
          (T[w + 6] = n.weave),
          (T[w + 7] = n.paint),
          (T[w + 8] = s.glow || 0),
          (T[w + 9] = s.order || 0),
          (T[w + 10] = s.alert || 0),
          (T[w + 11] = s.self || 0),
          (T[w + 12] = 0),
          (T[w + 13] = s.bias || 0),
          (T[w + 14] = s.team ?? n.team),
          (T[w + 15] = 0),
          s.uv1 &&
            ((this.uv1[m * 2] = h.getX(d)), (this.uv1[m * 2 + 1] = h.getY(d))));
      }
      for (let d = 0; d < f; d += 3) {
        let m = this.n + d,
          p = this.pos,
          x = p[m * 3 + 3] - p[m * 3],
          g = p[m * 3 + 4] - p[m * 3 + 1],
          b = p[m * 3 + 5] - p[m * 3 + 2],
          v = p[m * 3 + 6] - p[m * 3],
          y = p[m * 3 + 7] - p[m * 3 + 1],
          M = p[m * 3 + 8] - p[m * 3 + 2],
          w = Math.abs(g * M - b * y),
          T = Math.abs(b * v - x * M),
          S = Math.abs(x * y - g * v),
          E = w >= T && w >= S ? 0 : T >= S ? 1 : 2;
        for (let _ = 0; _ < 3; _++) {
          let R = (m + _) * 3;
          ((this.uv[(m + _) * 2] = E === 0 ? p[R + 2] : p[R]),
            (this.uv[(m + _) * 2 + 1] = E === 1 ? p[R + 2] : p[R + 1]));
        }
      }
      this.n += f;
    }
    return this;
  }
  bakeAO(t = {}) {
    let e = yB(
      this.pos,
      this.nrm,
      0,
      this.n,
      t.cell || 4,
      (s) => this.at[s * nv + 2] < 0,
      t.strength ?? 1,
    );
    for (let s = 0; s < this.n; s++) {
      let n = s * nv + 2;
      this.at[n] = Math.abs(this.at[n]) * e[s];
    }
    return ((this.baked = !0), this);
  }
};
function yB(o, t, e, s, n, i, a = 1) {
  let r = new Float32Array(s).fill(1);
  if (!s) return r;
  let l = 1e9,
    c = 1e9,
    h = 1e9,
    f = -1e9,
    u = -1e9,
    d = -1e9;
  for (let E = e * 3, _ = (e + s) * 3; E < _; E += 3)
    (o[E] < l && (l = o[E]),
      o[E] > f && (f = o[E]),
      o[E + 1] < c && (c = o[E + 1]),
      o[E + 1] > u && (u = o[E + 1]),
      o[E + 2] < h && (h = o[E + 2]),
      o[E + 2] > d && (d = o[E + 2]));
  let m = 2;
  ((l -= m * n), (c -= m * n), (h -= m * n));
  let p = Math.ceil((f - l) / n) + m + 1,
    x = Math.ceil((u - c) / n) + m + 1,
    g = Math.ceil((d - h) / n) + m + 1,
    b = new Uint8Array(p * x * g),
    v = 1 / n;
  for (let E = e; E < e + s; E += 3) {
    let _ = E * 3,
      R = o[_],
      C = o[_ + 1],
      L = o[_ + 2],
      A = o[_ + 3] - R,
      O = o[_ + 4] - C,
      H = o[_ + 5] - L,
      F = o[_ + 6] - R,
      P = o[_ + 7] - C,
      z = o[_ + 8] - L,
      k = Math.max(
        Math.hypot(A, O, H),
        Math.hypot(F, P, z),
        Math.hypot(A - F, O - P, H - z),
      ),
      I = Math.max(1, Math.ceil(k * v * 1.25)),
      G = 1 / I;
    for (let K = 0; K <= I; K++)
      for (let $ = 0; $ <= I - K; $++) {
        let n0 = K * G,
          e0 = $ * G,
          p0 = ((R + A * n0 + F * e0 - l) * v) | 0,
          t0 = ((C + O * n0 + P * e0 - c) * v) | 0,
          M0 = ((L + H * n0 + z * e0 - h) * v) | 0;
        b[(M0 * x + t0) * p + p0] = 1;
      }
  }
  let y = [[0, 0, 1, 1]];
  for (let E = 0; E < 6; E++) {
    let _ = (E / 6) * Pn;
    y.push([Math.cos(_) * 0.74, Math.sin(_) * 0.74, 0.67, 0.75]);
  }
  for (let E = 0; E < 4; E++) {
    let _ = ((E + 0.5) / 4) * Pn;
    y.push([Math.cos(_) * 0.38, Math.sin(_) * 0.38, 0.92, 0.9]);
  }
  let M = 0;
  for (let E of y) M += E[3];
  let w = [0.4, 1.5, 3, 5, 8],
    T = w.length,
    S = 1.75 * n;
  for (let E = 0; E < s; E++) {
    if (i && i(e + E)) continue;
    let _ = (e + E) * 3,
      R = t[_],
      C = t[_ + 1],
      L = t[_ + 2],
      A,
      O,
      H;
    Math.abs(R) < 0.8
      ? ((A = 0), (O = -L), (H = C))
      : ((A = L), (O = 0), (H = -R));
    let F = Math.hypot(A, O, H) || 1;
    ((A /= F), (O /= F), (H /= F));
    let P = C * H - L * O,
      z = L * A - R * H,
      k = R * O - C * A,
      I = (o[_] + R * S - l) * v,
      G = (o[_ + 1] + C * S - c) * v,
      K = (o[_ + 2] + L * S - h) * v,
      $ = 0;
    for (let n0 = 0; n0 < y.length; n0++) {
      let e0 = y[n0],
        p0 = A * e0[0] + P * e0[1] + R * e0[2],
        t0 = O * e0[0] + z * e0[1] + C * e0[2],
        M0 = H * e0[0] + k * e0[1] + L * e0[2];
      for (let f0 = 0; f0 < T; f0++) {
        let _0 = w[f0],
          F0 = (I + p0 * _0) | 0,
          m0 = (G + t0 * _0) | 0,
          S0 = (K + M0 * _0) | 0;
        if (F0 < 0 || m0 < 0 || S0 < 0 || F0 >= p || m0 >= x || S0 >= g) break;
        if (b[(S0 * x + m0) * p + F0]) {
          $ += e0[3] * (1 - f0 / (T + 1.5));
          break;
        }
      }
    }
    r[E] = dC(1 - Math.pow($ / M, 0.85) * 1.15 * a, 0.22, 1);
  }
  return r;
}
var u7 = class {
  constructor(t) {
    ((this.rest = t), (this.items = []), (this.n = 0));
  }
  place(t, e, s = {}) {
    return (
      this.items.push({
        part: t,
        bone: e,
        mx: !!s.mx,
        mz: !!s.mz,
      }),
      (this.n += t.n),
      this
    );
  }
  build(t = [], e = []) {
    let s = this.n,
      n = new Float32Array(s * 3),
      i = new Float32Array(s * 3),
      a = new Float32Array(s * 3),
      r = new Float32Array(s * 2),
      l = new Float32Array(s * 2),
      c = new Uint8Array(s * 4),
      h = new Uint8Array(s * 4),
      f = new Uint8Array(s * 4),
      u = new Uint8Array(s * 4),
      d = new Uint8Array(s * 4),
      m = new Uint8Array(s * 4),
      p = (w) => (w <= 0 ? 0 : w >= 1 ? 255 : (w * 255 + 0.5) | 0),
      x = new Float32Array(s),
      g = new Uint8Array(s),
      b = new Map(),
      v = 0;
    for (let w of this.items) {
      if (e.includes(w.bone) && !w.part.baked) {
        let A = b.get(w.bone) || [v, v];
        if (A[1] !== v && b.has(w.bone))
          throw new Error(
            "k9: AO group of bone " + w.bone + " is not contiguous",
          );
        ((A[1] = v + w.part.n), b.set(w.bone, A));
      }
      let T = w.part,
        S = T.n,
        E = this.rest[w.bone],
        _ = w.mx ? -1 : 1,
        R = w.mz ? -1 : 1,
        C = w.mx !== w.mz,
        L = t.filter((A) => A.bone === w.bone);
      for (let A = 0; A < S; A++) {
        let O = C ? A - (A % 3) + [0, 2, 1][A % 3] : A,
          H = v + A,
          F = T.pos[O * 3] * _,
          P = T.pos[O * 3 + 1],
          z = T.pos[O * 3 + 2] * R;
        ((n[H * 3] = F * 0.001 + E[0]),
          (n[H * 3 + 1] = P * 0.001 + E[1]),
          (n[H * 3 + 2] = z * 0.001 + E[2]),
          (i[H * 3] = T.nrm[O * 3] * _),
          (i[H * 3 + 1] = T.nrm[O * 3 + 1]),
          (i[H * 3 + 2] = T.nrm[O * 3 + 2] * R),
          (a[H * 3] = T.col[O * 3]),
          (a[H * 3 + 1] = T.col[O * 3 + 1]),
          (a[H * 3 + 2] = T.col[O * 3 + 2]),
          (r[H * 2] = T.uv[O * 2] * 0.001),
          (r[H * 2 + 1] = T.uv[O * 2 + 1] * 0.001),
          (l[H * 2] = T.uv1[O * 2]),
          (l[H * 2 + 1] = T.uv1[O * 2 + 1]));
        let k = O * nv,
          I = T.at;
        ((c[H * 4] = p(I[k])),
          (c[H * 4 + 1] = p(I[k + 1])),
          (x[H] = Math.abs(I[k + 2])),
          (g[H] = I[k + 2] < 0 ? 1 : 0),
          (c[H * 4 + 3] = p(I[k + 3])),
          (h[H * 4] = p(I[k + 4])),
          (h[H * 4 + 1] = p(I[k + 5])),
          (h[H * 4 + 2] = p(I[k + 6])),
          (h[H * 4 + 3] = p(I[k + 7])),
          (f[H * 4] = p(I[k + 8])),
          (f[H * 4 + 1] = p(I[k + 9])),
          (f[H * 4 + 2] = p(I[k + 10])),
          (f[H * 4 + 3] = p(I[k + 11])));
        let G = 0;
        for (let K of L) {
          let $ = Math.hypot(F - K.p[0], P - K.p[1], z - K.p[2]),
            n0 = (1 - pC(K.r * 0.3, K.r, $)) * (K.k ?? 1);
          n0 > G && (G = n0);
        }
        ((u[H * 4] = p(G)),
          (u[H * 4 + 1] = p(I[k + 13])),
          (u[H * 4 + 2] = p(I[k + 14])),
          (u[H * 4 + 3] = 0),
          (d[H * 4] = w.bone),
          (m[H * 4] = 255));
      }
      v += S;
    }
    for (let [, w] of b) {
      let T = yB(n, i, w[0], w[1] - w[0], 0.004, (S) => g[S] === 1);
      for (let S = w[0]; S < w[1]; S++) x[S] *= T[S - w[0]];
    }
    for (let w = 0; w < s; w++) c[w * 4 + 2] = p(x[w]);
    let y = new BufferGeometry(),
      M = (w) => new BufferAttribute(w, 4, !0);
    return (
      y.setAttribute("position", new BufferAttribute(n, 3)),
      y.setAttribute("normal", new BufferAttribute(i, 3)),
      y.setAttribute("uv", new BufferAttribute(r, 2)),
      y.setAttribute("uv1", new BufferAttribute(l, 2)),
      y.setAttribute("color", new BufferAttribute(a, 3)),
      y.setAttribute("aMat", M(c)),
      y.setAttribute("aMat2", M(h)),
      y.setAttribute("aFx", M(f)),
      y.setAttribute("aFx2", M(u)),
      y.setAttribute("skinIndex", new BufferAttribute(d, 4, !1)),
      y.setAttribute("skinWeight", M(m)),
      y
    );
  }
};
var m7 = {
  hipX: ue.hipX * 1e3,
  hipZ: ue.hipZ * 1e3,
  hipOut: ue.hipOut * 1e3,
  upper: ue.upper * 1e3,
  lower: ue.lower * 1e3,
  foot: ue.foot * 1e3,
};
var ov = (o) => {
  let t = new Color(o);
  return [t.r, t.g, t.b];
};
var zt0 = ov(5570438);
var Lt0 = ov(16753210);
var Dt0 = ov(16722456);
var wB = 0.9;
function Gi(o, t, e, s, n, i, a, r = {}) {
  let l = t[e];
  if (!l) throw new Error("k9: unknown marking " + e);
  let c = r.h || s / l[4],
    h = new PlaneGeometry(s, c),
    f = h.attributes.uv;
  for (let u = 0; u < f.count; u++)
    f.setXY(
      u,
      l[0] + f.getX(u) * (l[2] - l[0]),
      l[1] + f.getY(u) * (l[3] - l[1]),
    );
  (h.translate(0, 0, r.lift ?? 0.3),
    o.put(a, Ie(Qe(h), n, i, r.roll || 0), {
      uv1: !0,
      bias: 1,
      noAO: !0,
      ao: r.ao ?? 1,
      edge: 0,
      ...r.put,
    }));
}
function It0(o, t, e, s, n, i = {}) {
  let a = new PlaneGeometry(t, e);
  (a.translate(0, 0, i.lift ?? 0.3),
    o.put("stripe", Ie(Qe(a), s, n, i.roll || 0), {
      bias: 1,
      noAO: !0,
      edge: 0,
      wear: i.wear ?? 0.16,
    }));
}
var C2 = (o, t, e, s = {}) =>
  o.put(s.look || "oxide", Ie(xB(s.af || 5, s.h || 2.2, s.rot ?? 0.3), t, e), {
    noAO: !!s.noAO,
  });
var vB = (o, t, e = {}) => {
  let s = e.n || 6,
    n = e.a0 ?? 0,
    i = e.a1 ?? Math.PI,
    a = [];
  for (let r = 0; r <= s; r++) {
    let l = n + ((i - n) * r) / s;
    a.push([-Math.cos(l) * o, Math.sin(l) * o]);
  }
  return Nn(a, e.dir || "y+", t, {
    seg: e.seg || 12,
    crease: 60,
  });
};
var Ia = (o, t, e, s) =>
  Qe(new BoxGeometry(o, t, e)).translate(s[0], s[1], -s[2]);
function MB(o, t, e, s, n, i, a) {
  let r = new $c(),
    l = [a - i / 2, s, -o],
    c = [a - i / 2, s, -t],
    h = [a - i / 2 + i * 0.2, n, -e],
    f = [a + i / 2, s, -o],
    u = [a + i / 2, s, -t],
    d = [a + i / 2 - i * 0.2, n, -e],
    m = [a, (s + n) / 2, -(o + t) / 2];
  (r.quadFacing(l, c, u, f, m, 1, !0),
    r.quadFacing(l, h, d, f, m, 2, !0),
    r.quadFacing(c, h, d, u, m, 2, !0));
  for (let [p, x, g] of [
    [l, c, h],
    [f, u, d],
  ])
    (x[1] - p[1]) * (g[2] - p[2]) - (x[2] - p[2]) * (g[1] - p[1]) > 0 ==
    p[0] > a
      ? r.tri(p, x, g)
      : r.tri(p, g, x);
  return r.geo();
}
function Ht0(o) {
  let t = new Da("core"),
    e = new Da("quad"),
    s = new Da("end"),
    n = new Da("side");
  (t.put(
    "frame",
    j5(
      [
        [-70, -56],
        [-56, -70],
        [56, -70],
        [70, -56],
        [70, 42],
        [56, 56],
        [-56, 56],
        [-70, 42],
      ],
      744,
      {
        u: -372,
        b: 1.6,
      },
    ),
  ),
    t.put(
      "frame",
      wi(
        [
          [358, -68],
          [386, -22, 3],
          [386, 22, 2],
          [362, 22],
        ],
        112,
        {
          b: 1.6,
        },
      ),
    ),
    t.put(
      "armor",
      wi(
        [
          [400, 6, 2],
          [389, 6, 1.5],
          [340, -72, 1.5],
          [353, -76, 2],
        ],
        118,
        {
          b: 1.8,
        },
      ),
    ),
    t.put(
      "frame",
      wi(
        [
          [-360, -66],
          [-390, -40, 3],
          [-390, 40, 3],
          [-362, 56],
        ],
        116,
        {
          b: 1.6,
        },
      ),
    ),
    t.put(
      "armor",
      wi(
        [
          [-390, 34, 2],
          [-398, 30, 2],
          [-398, -34, 2],
          [-390, -40, 2],
        ],
        122,
        {
          b: 1.6,
        },
      ),
    ));
  for (let p of [-1, 1]) {
    t.put(
      "frame",
      wi(
        [
          [366, 12],
          [392, 13, 5],
          [397, 22, 5],
          [393, 31, 4],
          [366, 37],
        ],
        11,
        {
          x: p * 50,
          b: 1.4,
          cs: 1,
        },
      ),
    );
    for (let x of [374, 388])
      C2(t, [p * 55.5, 23, x], p > 0 ? "R" : "L", {
        af: 6,
        h: 2,
      });
  }
  (t.put(
    "frameDk",
    wi(
      [
        [366, 10],
        [393, 10, 4],
        [393, 18],
        [366, 22],
      ],
      90,
      {
        b: 1,
        cs: 1,
      },
    ),
  ),
    t.put(
      "poly",
      Z5(
        [
          ya(118, 16, 5, -200, "xy", 0, -79),
          ya(150, 42, 9, -178, "xy", 0, -92),
          ya(150, 42, 9, 178, "xy", 0, -92),
          ya(118, 16, 5, 200, "xy", 0, -79),
        ],
        {
          capA: !0,
          capB: !0,
          crease: 40,
        },
      ),
    ));
  let i = Cf("steel", {
    wear: 0.3,
    edge: 0.6,
    dust: 0.4,
    r: 0.5,
  });
  t.put(
    i,
    d7(
      [
        [-58, -168, 14],
        [58, -168, 14],
        [66, -120],
        [66, 120],
        [58, 168, 14],
        [-58, 168, 14],
        [-66, 120],
        [-66, -120],
      ],
      5,
      {
        y: -118.5,
        b: 1.2,
        cs: 1,
        holes: [
          $5(12, 62, 0, 0, -92),
          $5(12, 62, 0, 0, 92),
          uC(6, 6, 0, -34, 0),
          uC(6, 6, 0, 34, 0),
        ],
      },
    ),
  );
  for (let p of [-1, 1])
    t.put(
      Cf("steel", {
        wear: 0.5,
        edge: 0.5,
        dust: 0.4,
        r: 0.48,
      }),
      wi(
        [
          [-156, -118],
          [-144, -127, 3],
          [144, -127, 3],
          [156, -118],
        ],
        11,
        {
          x: p * 47,
          b: 1.5,
          cs: 1,
        },
      ),
    );
  for (let [p, x] of [
    [-56, -150],
    [56, -150],
    [-56, 150],
    [56, 150],
  ])
    C2(t, [p, -118.5, x], "D", {
      af: 7,
      h: 2,
    });
  Gi(t, o, "skid", 96, [0, -118.5, 30], "D", i);
  let a = [
    [120, 31],
    [120, 50],
    [116.5, 60],
    [111, 68],
    [104.5, 73],
    [97, 76],
  ];
  (t.put(
    "armor",
    X4(
      [
        {
          u: -130,
          P: a,
        },
        {
          u: 130,
          P: a,
        },
      ],
      7,
    ),
  ),
    t.put(
      "poly",
      j5(
        [
          [-57, 74],
          [57, 74],
          [57, 97, 5],
          [50, 104, 5],
          [-50, 104, 5],
          [-57, 97, 5],
        ],
        190,
        {
          u: -110,
          b: 2,
          cs: 1,
        },
      ),
      {
        r: 0.5,
      },
    ),
    t.put("frameDk", Ia(86, 2, 150, [0, 104.6, -17])),
    Gi(t, o, "batt", 104, [0, 105.6, -26], "T", "frameDk"),
    Gi(t, o, "qr", 20, [-36, 105.6, 34], "T", "frameDk"));
  for (let p = 0; p < 5; p++)
    t.put(
      "lamp",
      Ia(7, 1.6, 3.2, [-24 + p * 12, 104.4, 70]),
      p < 4
        ? {
            self: 1,
            order: 0.04 + p * 0.05,
            color: zt0,
            noAO: !0,
          }
        : {
            noAO: !0,
          },
    );
  (t.put(
    "red",
    wi(
      [
        [80, 84],
        [86, 84, 1.5],
        [86, 96, 1.5],
        [80, 96],
      ],
      26,
      {
        b: 1,
        cs: 1,
      },
    ),
  ),
    t.put("frame", Ia(44, 22, 3, [0, 89, 81.5])));
  for (let p of [-1, 1]) t.put("poly", Ia(3, 10, 9, [p * 6.5, 109, -101]));
  (t.put(
    "frame",
    d7(
      [
        [-46, -198, 5],
        [46, -198, 5],
        [46, -142, 5],
        [-46, -142, 5],
      ],
      7,
      {
        y: 78,
        b: 1.5,
        cs: 1,
        holes: [$5(76, 42, 0, 0, -170)],
      },
    ),
  ),
    t.put("frameDk", Ia(80, 1, 46, [0, 78.9, -170]), {
      ao: 0.45,
      noAO: !0,
    }));
  let r = (p) => {
    let x = Math.exp(-(p * p) / 900);
    return [1 + 0.25 * x, 0.86 + 0.1 * (1 - x), 0.62 + 0.75 * (1 - x) * 0.5];
  };
  for (let p = 0; p < 5; p++)
    t.put(
      Cf("steel", {
        r: 0.34,
      }),
      wi(
        [
          [-188 + p * 9.4, 80.5],
          [-186.4 + p * 9.4, 80.5],
          [-181.4 + p * 9.4, 85.6],
          [-183 + p * 9.4, 85.6],
        ],
        76,
        {
          b: 0.3,
        },
      ),
      {
        tint: r,
      },
    );
  (Gi(t, o, "vent", 46, [-70, 78.3, -170], "T", "armor", {
    roll: 90,
  }),
    t.put(
      Cf("steel", {
        r: 0.42,
      }),
      Mh(
        [
          [0, 76, -212],
          [0, 92, -216],
          [0, 101, -230],
          [0, 101, -306],
          [0, 92, -320],
          [0, 76, -324],
        ],
        5.2,
        {
          seg: 12,
          radial: 6,
        },
      ),
    ),
    t.put(
      "rubber",
      h1(7.4, -300, -236, "u+", [0, 101, 0], {
        seg: 8,
        c: 1.2,
      }),
    ));
  for (let p of [-212, -324])
    t.put(
      "frame",
      h1(10, 0, 4.5, "y+", [0, 78, p], {
        seg: 8,
        c: 1,
      }),
    );
  (Gi(t, o, "lift", 40, [-32, 78.3, -268], "T", "armor", {
    roll: 90,
  }),
    t.put(
      "frame",
      h1(15, 0, 6, "y+", [0, 71, -380], {
        seg: 10,
        c: 1.5,
      }),
    ),
    Gi(t, o, "ant", 44, [-40, 78.3, -352], "T", "armor", {
      roll: 180,
    }),
    t.put(
      "metal",
      Nn(
        [
          [0, 19],
          [5, 19],
          [6.5, 17.5, 1],
          [6.5, 14],
          [-3, 13],
          [-3, 0],
        ],
        "u-",
        [0, -4, -398],
        {
          seg: 12,
        },
      ),
    ),
    t.put(
      "lamp",
      Nn(
        [
          [6.9, 17],
          [6.9, 14.6],
        ],
        "u-",
        [0, -4, -398],
        {
          seg: 12,
        },
      ),
      {
        self: 0.35,
        order: 0.3,
        color: Lt0,
        noAO: !0,
      },
    ));
  for (let p = 0; p < 3; p++) {
    let x = (p / 3) * Pn + 0.5;
    t.put(
      "brass",
      h1(2, -3, 3, "u-", [Math.cos(x) * 6.5, -4 + Math.sin(x) * 6.5, -398], {
        seg: 5,
        c: 0.6,
      }),
    );
  }
  (Gi(t, o, "chg", 30, [41, -24, -398], "B", "armor"),
    t.put(
      "red",
      Nn(
        [
          [0, 6],
          [5, 6],
          [6, 11],
          [10, 12, 1],
          [12, 9, 1],
          [12, 0],
        ],
        "u-",
        [-41, -8, -398],
        {
          seg: 10,
        },
      ),
    ),
    Gi(t, o, "estop", 34, [-41, -8, -398], "B", "armor"),
    Gi(t, o, "plate", 36, [41, -3, -398], "B", "armor", {
      lift: 0.5,
    }));
  for (let p of [-1, 1])
    t.put("lamp", Ia(28, 6, 1.6, [p * 41, 23.5, -398.6]), {
      glow: 1,
      order: 0.62,
      noAO: !0,
    });
  let l = [
      [0, -0.497, -0.868],
      [0, 1, 0],
    ],
    c = (p, x) => [p, x, 400 - (47 * (6 - x)) / 82];
  Gi(t, o, "unitSm", 54, c(0, -46), l, "armor", {
    lift: 0.6,
  });
  for (let p of [-1, 1])
    t.put(
      "glass",
      Ie(
        Nn(
          [
            [0, 7],
            [1.6, 7],
            [2.2, 6.2, 1],
            [2.2, 0],
          ],
          "u-",
          [0, 0, 0],
          {
            seg: 10,
          },
        ),
        c(p * 40, -20),
        l,
      ),
    );
  (t.put("lamp", Ie(Qe(new BoxGeometry(62, 3.6, 1.6)), c(0, -8), l), {
    glow: 1,
    order: 0.45,
    noAO: !0,
  }),
    n.put(
      "armorDk",
      wi(
        [
          [-128, 27, 3],
          [128, 27, 3],
          [128, -28, 3],
          [106, -52, 5],
          [-106, -52, 5],
          [-128, -28, 3],
        ],
        9,
        {
          x: 115.5,
          b: 1.6,
          cs: 1,
          holes: [$5(62, 30, 0, -80, -10), $5(122, 7.4, 0, 44, 13)],
        },
      ),
    ),
    n.put("frameDk", Ia(2, 38, 70, [107, -10, -80]), {
      ao: 0.4,
      noAO: !0,
    }));
  for (let p = 0; p < 5; p++) {
    let x = 1 - p * 6.2;
    n.put(
      Cf("steel", {
        r: 0.36,
      }),
      j5(
        [
          [108.5, x + 1.5],
          [118.6, x - 4.2],
          [118.6, x - 5.7],
          [108.5, x],
        ],
        60,
        {
          u: -110,
          b: 0.3,
        },
      ),
      {
        tint: () => [1.06, 0.9, 0.74],
      },
    );
  }
  (n.put("lamp", Ia(3, 5.6, 120, [115.8, 13, 44]), {
    glow: 1,
    order: 0.3,
    noAO: !0,
  }),
    n.put("frameDk", Ia(1.5, 11, 126, [111.5, 13, 44]), {
      noAO: !0,
      ao: 0.5,
    }));
  for (let [p, x] of [
    [-120, 19],
    [120, 19],
    [-120, -24],
    [120, -24],
    [0, -44],
  ])
    C2(n, [120, x, p], "R", {
      af: 5.5,
      h: 1.8,
    });
  {
    let p = [
      [-62, 76],
      [-62, 80.2],
    ];
    for (let x = -59.6; x + 5.2 < 61; x += 10)
      p.push([x, 80.2], [x, 83.5], [x + 5.2, 83.5], [x + 5.2, 80.2]);
    (p.push([62, 80.2], [62, 76]),
      n.put(
        Cf("frame", {
          wear: 0.14,
          edge: 0.7,
        }),
        wi(p, 20.6, {
          x: 80,
          b: 0,
        }),
      ));
  }
  let h = m7.hipX,
    f = 138,
    u = 251;
  (e.put(
    "frame",
    Nn(
      [
        [f, 0],
        [f, 35],
        [f + 5, 41, 1],
        [f + 30, 41],
        [f + 30, 44],
        [f + 56, 44],
        [f + 56, 40.5],
        [f + 66, 40.5],
        [f + 66, 44],
        [u - 15, 44],
      ],
      "u+",
      [h, 0, 0],
      {
        seg: 14,
      },
    ),
  ),
    e.put(
      "metal",
      Nn(
        [
          [u - 15, 44],
          [u - 15, 47],
          [u - 2, 47],
          [u, 45, 1],
          [u, 30],
        ],
        "u+",
        [h, 0, 0],
        {
          seg: 14,
        },
      ),
    ),
    e.put(
      "frame",
      j5(
        [
          [62, -30],
          [98, -36],
          [104, -8],
          [104, 30],
          [62, 36],
        ],
        96,
        {
          u: 146,
          b: 1.6,
        },
      ),
    ),
    e.put(
      "metal",
      h1(7.5, 0, 7, "u-", [h - 4, -22, f], {
        seg: 7,
        c: 1,
      }),
    ),
    e.put(
      "sleeve",
      Mh(
        [
          [64, -62, 96],
          [86, -58, 108],
          [108, -44, 118],
          [h - 4, -26, 124],
          [h - 4, -22, 132],
        ],
        4.6,
        {
          seg: 8,
          radial: 5,
        },
      ),
    ));
  for (let p of [0.6, 2.2, 3.9, 5.4])
    C2(e, [h + Math.cos(p) * 26, Math.sin(p) * 26, f], "B", {
      af: 5,
      h: 2,
    });
  let d = [
      [146, 42],
      [145, 47],
      [139.5, 54.5],
      [130, 61],
      [102, 72.5],
      [60, 78],
    ],
    m = [
      [76, 45],
      [76, 56],
      [72, 64],
      [66, 71],
      [58, 76],
      [46, 78],
    ];
  s.put(
    "armor",
    X4(
      [
        {
          u: 136,
          P: d,
        },
        {
          u: 196,
          P: d,
        },
        {
          u: 221,
          P: [
            [104, 41],
            [104, 54],
            [97, 63],
            [86, 70],
            [71, 76],
            [53, 78],
          ],
        },
        {
          u: 235,
          P: m,
        },
        {
          u: 368,
          P: m,
        },
        {
          u: 390,
          P: [
            [56, 46],
            [56, 53],
            [53, 60],
            [48, 66],
            [42, 70],
            [34, 72],
          ],
        },
      ],
      6,
    ),
  );
  for (let p of [-1, 1]) {
    for (let x of [143, 189])
      C2(s, [p * 50, 78, x], "T", {
        af: 6,
        h: 2,
      });
    s.put(
      "rubber",
      Ie(
        Qe(new BoxGeometry(22, 40, 1.4)).translate(0, 0, 0.5),
        [p * 116, 66.75, 166],
        [
          [p * 0.38, 0.925, 0],
          [0, 0, -1],
        ],
      ),
      {
        nrm: 1,
      },
    );
  }
  return (
    s.put(
      "armorDk",
      j5(
        [
          [-17, 77.5],
          [17, 77.5],
          [13, 81.5],
          [-13, 81.5],
        ],
        96,
        {
          u: 270,
          b: 1,
        },
      ),
    ),
    {
      core: t,
      quad: e,
      end: s,
      side: n,
    }
  );
}
function Ft0(o, t) {
  (Gi(o, t, "brand", 132, [-120, -32, 20], "L", "armorDk"),
    Gi(o, t, "brand", 132, [120, -32, -20], "R", "armorDk"),
    Gi(o, t, "hazard", 60, [-120, -6, 96], "L", "armorDk", {
      h: 5,
    }),
    Gi(o, t, "hazard", 60, [120, -6, 96], "R", "armorDk", {
      h: 5,
    }),
    Gi(o, t, "unit", 70, [0, 78.3, 166], "T", "armor"),
    o.put("lamp", Ia(8, 1.6, 70, [0, 81.9, 318]), {
      glow: 1,
      order: 0.4,
      noAO: !0,
    }));
  for (let e of [-1, 1]) {
    for (let s of [104, -104])
      Gi(o, t, "pinch", 36, [e * 120, -22, s], e > 0 ? "R" : "L", "armorDk");
    for (let s of [166, -166])
      Gi(
        o,
        t,
        "nostep",
        32,
        [e * 116, 66.75, s],
        [
          [e * 0.38, 0.925, 0],
          [0, 0, e > 0 ? -1 : 1],
        ],
        "rubber",
        {
          roll: e > 0 ? -90 : 90,
          lift: 1.5,
        },
      );
    for (let s of [148, -148]) {
      let n = [
        [146, 42],
        [145, 47],
        [139.5, 54.5],
        [130, 61],
        [102, 72.5],
        [60, 78],
        [0, 78],
      ];
      for (let i = 0; i < n.length - 1; i++) {
        let a = n[i],
          r = n[i + 1],
          l = r[0] - a[0],
          c = r[1] - a[1],
          h = Math.hypot(l, c);
        It0(
          o,
          20,
          h,
          [(e * (a[0] + r[0])) / 2, (a[1] + r[1]) / 2, s],
          [
            [(e * c) / h, -l / h, 0],
            [(e * l) / h, c / h, 0],
          ],
          {
            lift: 0.4,
          },
        );
      }
    }
  }
}
function Ot0() {
  let o = new Da("hip"),
    t = new Da("upper"),
    e = new Da("lower"),
    s = m7.upper,
    n = m7.lower;
  (o.put(
    "frame",
    Nn(
      [
        [-15, 0],
        [-15, 40],
        [-11, 45.5, 1],
        [28, 45.5],
        [28, 42.5],
        [33, 42.5],
        [33, 45.5],
        [36, 45.5],
      ],
      "x+",
      [0, 0, 0],
      {
        seg: 16,
      },
    ),
  ),
    o.put(
      "metal",
      Nn(
        [
          [36, 45.5],
          [36, 48.5],
          [47, 48.5],
          [49.5, 46.5, 1],
          [49.5, 36],
        ],
        "x+",
        [0, 0, 0],
        {
          seg: 16,
        },
      ),
    ),
    o.put(
      "metal",
      Nn(
        [
          [20, 38],
          [44, 38],
          [46.5, 42, 1],
          [48.5, 42],
        ],
        "u-",
        [0, 0, 0],
        {
          seg: 12,
        },
      ),
    ));
  {
    let i = [];
    for (let r = 0; r <= 8; r++) {
      let l = (-42 + (162 * r) / 8) * Hs;
      i.push([Math.cos(l) * 58, Math.sin(l) * 58]);
    }
    for (let r = 8; r >= 0; r--) {
      let l = (-42 + (162 * r) / 8) * Hs;
      i.push([Math.cos(l) * 52, Math.sin(l) * 52]);
    }
    o.put(
      Cf("armor", {
        team: 0.92,
      }),
      wi(i, 58, {
        x: 17,
        b: 1.6,
        soft: 0.5,
      }),
    );
  }
  for (let [i, a] of [
    [0, 20],
    [34, 20],
    [0, 100],
    [34, 100],
  ])
    C2(
      o,
      [i, Math.sin(a * Hs) * 58, Math.cos(a * Hs) * 58],
      [
        [0, Math.sin(a * Hs), -Math.cos(a * Hs)],
        [1, 0, 0],
      ],
      {
        af: 5.5,
        h: 1.8,
      },
    );
  (t.put(
    "frame",
    Nn(
      [
        [-24, 36],
        [-24, 44],
        [-21.5, 46.5, 1],
        [13, 46.5],
        [15, 44.5, 1],
      ],
      "x+",
      [0, 0, 0],
      {
        seg: 16,
      },
    ),
  ),
    t.put(
      "frame",
      Nn(
        [
          [15, 44.5],
          [20, 44.5],
          [20, 41],
          [26, 41],
          [26, 44.5],
          [32, 44.5],
          [32, 41],
          [38, 41],
          [38, 44.5],
          [43, 44.5],
          [47, 41.5, 1],
          [52, 38],
          [56, 33, 1],
          [56, 31.5],
        ],
        "x+",
        [0, 0, 0],
        {
          seg: 16,
        },
      ),
    ),
    t.put(
      "lamp",
      Nn(
        [
          [55.4, 31.5],
          [56.4, 30.6],
          [56.4, 25.4],
          [55.4, 24.5],
        ],
        "x+",
        [0, 0, 0],
        {
          seg: 16,
        },
      ),
      {
        glow: 1,
        order: 0.5,
        noAO: !0,
      },
    ),
    t.put(
      "metal",
      Nn(
        [
          [55.4, 24.5],
          [57, 23],
          [58.5, 21, 1],
          [58.5, 0],
        ],
        "x+",
        [0, 0, 0],
        {
          seg: 16,
        },
      ),
    ));
  for (let i = 0; i < 5; i++) {
    let a = (i / 5) * Pn + 0.3;
    C2(t, [58.5, Math.sin(a) * 14, Math.cos(a) * 14], "R", {
      af: 4.6,
      h: 1.6,
      noAO: !0,
    });
  }
  (t.put(
    "armor",
    wi(p7(0, 0, 41, 0, -s, 31, 7), 17, {
      x: 23,
      b: 1.8,
      soft: 0.5,
    }),
  ),
    t.put(
      "armorDk",
      wi(p7(0, -34, 24, 0, -s, 19, 5), 3, {
        x: 32.6,
        b: 1.2,
        soft: 0.5,
      }),
    ),
    t.put("lamp", Ia(1.6, 64, 4.2, [34.6, -150, 0]), {
      glow: 1,
      order: 0.55,
      noAO: !0,
    }));
  for (let [i, a] of [
    [14, -78],
    [-14, -78],
    [11, -236],
    [-11, -236],
  ])
    C2(t, [34.1, a, i], "R", {
      af: 4.6,
      h: 1.6,
    });
  (t.put(
    "metal",
    h1(15, 31.5, 37, "x+", [0, -s, 0], {
      seg: 10,
      c: 1.2,
    }),
  ),
    C2(t, [37, -s, 0], "R", {
      af: 8,
      h: 2.4,
    }),
    t.put(
      "carbon",
      wi(p7(0, 0, 39, 0, -s, 29, 7), 12, {
        x: -19,
        b: 1.5,
        soft: 0.5,
      }),
    ),
    t.put(
      "metal",
      h1(13, 25, 28.5, "x-", [0, -s, 0], {
        seg: 10,
        c: 1.2,
      }),
    ),
    t.put(
      "carbon",
      wi(
        [
          [-36, -24],
          [35, -24],
          [31, -128],
          [-6, -168],
          [-25, -262],
          [-33, -258],
        ],
        27.5,
        {
          x: 0.75,
          b: 1.2,
        },
      ),
    ),
    t.put(
      "sleeve",
      Mh(
        [
          [0, -8, -41],
          [0, -70, -39.4],
          [0, -180, -37.8],
          [0, -256, -36.4],
          [0, -290, -27],
        ],
        3.5,
        {
          seg: 8,
          radial: 5,
        },
      ),
    ),
    t.put("frame", Ia(27, 8, 5, [0.75, -120, -40.2])),
    t.put("frame", Ia(27, 8, 5, [0.75, -225, -38.6])),
    e.put(
      "frame",
      Nn(
        [
          [-13, 0],
          [-13, 24.5],
          [-11.5, 26.5, 1],
          [11.5, 26.5],
          [13, 24.5, 1],
          [13, 0],
        ],
        "x+",
        [0, 0, 0],
        {
          seg: 12,
        },
      ),
    ),
    e.put(
      "carbon",
      Z5(
        [
          ya(22, 42, 4, -6, "xu", 0, -1),
          ya(22, 55, 5, -56, "xu", 0, -9.5),
          ya(21, 45, 5, -138, "xu", 0, -6.5),
          ya(20, 29, 4, -232, "xu", 0, -0.5),
          ya(20, 26, 4, -296, "xu", 0, 0),
        ],
        {
          capA: !0,
          capB: !0,
          crease: 40,
        },
      ),
    ),
    e.put(
      "armor",
      Z5(
        [
          ya(27, 30, 5, -178, "xu", 0, 1.5),
          ya(31, 37, 6, -184, "xu", 0, 1.5),
          ya(31, 38, 6, -262, "xu", 0, 0.5),
          ya(28, 33, 5, -290, "xu", 0, 0),
        ],
        {
          capA: !0,
          capB: !0,
          crease: 40,
        },
      ),
      {
        dust: 0.35,
      },
    ),
    e.put("lamp", Ia(1.4, 44, 3.4, [15.6, -224, 0]), {
      glow: 1,
      order: 0.7,
      noAO: !0,
    }),
    e.put(
      "metal",
      Nn(
        [
          [-52, 15.5],
          [-49, 17.5, 1],
          [-41, 19],
          [-38, 21.5],
          [-34, 21.5],
          [-32.5, 20, 1],
        ],
        "y-",
        [0, -n, 0],
        {
          seg: 12,
        },
      ),
    ));
  {
    let i = m7.foot,
      a = [[-33, 19.5]],
      r = 2.2;
    for (let [l, c] of [
      [56, 0],
      [74, 0],
      [92, 0],
      [104, 0],
      [106, 1],
      [111, 1],
      [113, 0],
      [124, 0],
      [126, 1],
      [131, 1],
      [133, 0],
      [146, 0],
      [160, 0],
      [172, 0],
      [180, 0],
    ]) {
      let h = l * Hs,
        f = i - c * r;
      a.push([-Math.cos(h) * f, Math.max(0, Math.sin(h) * f)]);
    }
    e.put(
      "rubber",
      Nn(a, "y-", [0, -n, 0], {
        seg: 16,
        crease: 50,
      }),
      {
        tint: (l, c) => {
          let h = pC(-n - 8, -n - 34, c);
          return [1 + 0.9 * h, 1 + 0.8 * h, 1 + 0.65 * h];
        },
        dust: 0.5,
      },
    );
  }
  return (
    e.put(
      "sleeve",
      Mh(
        [
          [0, -12, -24],
          [0, -56, -40],
          [0, -138, -32],
          [0, -170, -22.5],
          [0, -188, -15],
        ],
        3.2,
        {
          seg: 8,
          radial: 5,
        },
      ),
    ),
    e.put("frame", Ia(12, 6, 8, [0, -98, -35])),
    {
      hip: o,
      upper: t,
      lower: e,
    }
  );
}
function Nt0(o, t) {
  let e = new Da("hipMarks"),
    s = new Da("upperMarks"),
    n = Ph(o),
    i = kf(o) ? 1 : -1,
    a = 62 * Hs;
  return (
    Gi(
      e,
      t,
      "leg" + a7[o],
      27,
      [n * 17, Math.sin(a) * 58, i * Math.cos(a) * 58],
      [
        [0, Math.sin(a), -i * Math.cos(a)],
        [0, Math.cos(a), i * Math.sin(a)],
      ],
      Cf("armor", {
        team: 0.92,
      }),
      {
        lift: 0.5,
      },
    ),
    Gi(s, t, "belt", 46, [n * 34.1, -212, 0], n > 0 ? "R" : "L", "armorDk", {
      roll: n > 0 ? -90 : 90,
      lift: 0.25,
    }),
    {
      hipM: e,
      upM: s,
    }
  );
}
function Bt0(o) {
  let t = new Da("neck"),
    e = new Da("head"),
    s = new Da("jaw"),
    n = new Da("ear");
  t.put(
    Cf("frame", {
      r: 0.3,
    }),
    vB(38, [0, 0, 0], {
      dir: "x+",
      n: 7,
      seg: 12,
    }),
  );
  let i = new Vector3(0, 60, -100).normalize(),
    a = (c) => (
      c.applyQuaternion(
        new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), i),
      ),
      c
    );
  (t.put(
    "frame",
    a(
      Z5(
        [
          ya(50, 44, 9, 20, "xy"),
          ya(40, 38, 8, 44, "xy"),
          ya(28, 28, 7, 62, "xy"),
          ya(26, 26, 6, 80, "xy"),
        ],
        {
          capA: !0,
          capB: !0,
        },
      ),
    ),
  ),
    t.put(
      "armor",
      X4(
        [
          {
            u: 24,
            P: [
              [29, -6],
              [29, 13],
              [23, 23.5],
              [11, 27.5],
            ],
          },
          {
            u: 46,
            P: [
              [24, -5],
              [24, 11],
              [19, 19.5],
              [9, 23],
            ],
          },
          {
            u: 62,
            P: [
              [17.5, -4],
              [17.5, 7],
              [14, 13.5],
              [7, 16.5],
            ],
          },
        ],
        4,
        {
          c: 1.2,
        },
      ).map(a),
    ),
    t.put(
      "rubber",
      a(
        Nn(
          [
            [64, 14],
            [68, 17],
            [72, 15.5],
            [76, 18],
            [80, 16.5],
            [82.5, 17.5],
            [84, 17],
          ],
          "u+",
          [0, 0, 0],
          {
            seg: 12,
            crease: 80,
          },
        ),
      ),
      {
        r: 0.8,
      },
    ));
  for (let c of [-1, 1])
    t.put(
      "sleeve",
      a(
        Mh(
          [
            [c * 30, -15, 4],
            [c * 25, -19, 26],
            [c * 18, -17, 48],
            [c * 13, -13, 66],
          ],
          3.6,
          {
            seg: 6,
            radial: 5,
          },
        ),
      ),
    );
  (e.put(
    "frame",
    vB(38, [0, 0, 0], {
      dir: "x+",
      n: 7,
      seg: 14,
    }),
  ),
    e.put(
      "frame",
      wi(
        [
          [26, -28],
          [64, -28],
          [70, 2],
          [74, 4],
          [74, 34],
          [84, 37],
          [78, 46],
          [40, 50],
          [-8, 50],
          [14, 8],
          [14, -16],
        ],
        94,
        {
          b: 1.6,
          cs: 1,
        },
      ),
    ),
    e.put(
      "frame",
      wi(
        [
          [-24, 50, 3],
          [-24, 43],
          [-6, 30],
          [0, 50],
        ],
        72,
        {
          b: 1.4,
          cs: 1,
        },
      ),
    ),
    e.put(
      "frame",
      wi(
        [
          [0, -16],
          [0, 6],
          [16, 6],
          [28, -28],
          [10, -28],
        ],
        54,
        {
          b: 1.4,
        },
      ),
    ));
  let r = [
    [60, -8],
    [60, 26],
    [57, 38],
    [50, 48],
    [40, 54],
    [26, 56],
  ];
  e.put(
    "armor",
    X4(
      [
        {
          u: -26,
          P: [
            [35, 46],
            [35.5, 47.5],
            [34, 50],
            [31, 52.5],
            [26, 55],
            [17, 56],
          ],
        },
        {
          u: -8,
          P: [
            [52, 33],
            [53, 38],
            [51.5, 43.5],
            [47, 49],
            [39, 54],
            [25.5, 56],
          ],
        },
        {
          u: 10,
          P: [
            [59.5, 6],
            [60, 26],
            [57, 38],
            [50, 48],
            [40, 54],
            [26, 56],
          ],
        },
        {
          u: 23,
          P: r,
        },
        {
          u: 38,
          P: r,
        },
        {
          u: 50,
          P: [
            [58, 33],
            [58, 35],
            [55.5, 41],
            [49, 48],
            [39, 53],
            [25, 55],
          ],
        },
        {
          u: 70,
          P: [
            [56, 35],
            [56, 37],
            [53, 41],
            [47, 46],
            [37, 50],
            [24, 52],
          ],
        },
        {
          u: 87,
          P: [
            [50, 36],
            [50, 37.5],
            [47, 40],
            [42, 43],
            [33, 46],
            [21, 47],
          ],
        },
      ],
      5,
    ),
  );
  for (let c of [-1, 1])
    e.put(
      "armorDk",
      wi(
        [
          [34, -26.5, 2],
          [63, -26.5, 2],
          [68.5, 1, 2],
          [42, 1, 2],
        ],
        5,
        {
          x: c * 49.5,
          b: 1.2,
          cs: 1,
        },
      ),
    );
  (e.put(
    "frame",
    Z5(
      [
        ya(82, 36, 5, 62, "xy", 0, -10),
        ya(70, 28, 5, 110, "xy", 0, -14),
        ya(58, 21, 5, 146, "xy", 0, -17.5),
        ya(52, 15, 5, 157, "xy", 0, -20.5),
      ],
      {
        capA: !1,
        capB: !0,
        crease: 40,
      },
    ),
  ),
    e.put(
      "armor",
      X4(
        [
          {
            u: 71,
            P: [
              [43, -13],
              [43, -2],
              [39, 5],
              [30, 9.5],
              [16, 11],
            ],
          },
          {
            u: 110,
            P: [
              [37, -15.5],
              [37, -7],
              [33, -0.5],
              [25, 3],
              [13.5, 4.2],
            ],
          },
          {
            u: 152,
            P: [
              [31, -18],
              [31, -12.5],
              [27.5, -8],
              [20.5, -5.5],
              [11, -4.8],
            ],
          },
        ],
        4,
        {
          c: 1.2,
        },
      ),
    ),
    e.put(
      "glass",
      j5($5(30, 11, 4.5, 0, -15.5), 4, {
        u: 155.5,
        b: 1.4,
        cs: 2,
      }),
      {
        noAO: !0,
      },
    ),
    e.put("frameDk", Ia(92, 30, 2, [0, 19, 75]), {
      ao: 0.5,
      noAO: !0,
    }));
  for (let c of [-1, 1]) {
    (e.put(
      "frame",
      Nn(
        [
          [0, 10],
          [6, 10],
          [7.2, 8.8, 1],
          [7.2, 7.4],
        ],
        "u+",
        [c * 36, 19, 75],
        {
          seg: 12,
        },
      ),
    ),
      e.put(
        "coat",
        Nn(
          [
            [6.4, 7.4],
            [7.6, 3.8],
            [8, 0],
          ],
          "u+",
          [c * 36, 19, 75],
          {
            seg: 12,
            crease: 80,
          },
        ),
        {
          noAO: !0,
          color: ov(3554133),
        },
      ));
    for (let h = 0; h < 3; h++)
      for (let f = 0; f < 2; f++)
        e.put(
          "lamp",
          Ia(2.4, 2.4, 1.2, [c * (7 + h * 4), 30.6 - f * 4, 76.6]),
          {
            self: 0.06,
            order: 0.25,
            color: Dt0,
            noAO: !0,
          },
        );
  }
  for (let c = 0; c < 5; c++)
    e.put("lamp", Ia(8.8, 3.2, 2.6, [(c - 2) * 10.2, 19, 77.3]), {
      glow: 1,
      order: 0.1 + Math.abs(c - 2) * 0.12,
      noAO: !0,
    });
  for (let c of [-1, 1])
    e.put("lamp", Ia(1.6, 3.2, 14, [c * 46.2, 19, 66]), {
      glow: 0.8,
      order: 0.4,
      noAO: !0,
    });
  (e.put(
    "frame",
    Nn(
      [
        [0, 5],
        [4, 5],
        [4.8, 4.2, 1],
        [4.8, 3.2],
      ],
      "u+",
      [0, 9.5, 75],
      {
        seg: 8,
      },
    ),
  ),
    e.put(
      "coat",
      Nn(
        [
          [4.4, 3.2],
          [4.9, 0],
        ],
        "u+",
        [0, 9.5, 75],
        {
          seg: 8,
          crease: 80,
        },
      ),
      {
        noAO: !0,
        color: ov(3107672),
      },
    ),
    e.put(
      "metal",
      Nn(
        [
          [0, 21.5],
          [2, 21.5],
          [3, 20, 1],
        ],
        "y+",
        [0, 55, 8],
        {
          seg: 14,
        },
      ),
    ),
    e.put(
      "glass",
      Nn(
        [
          [3, 19],
          [9.5, 19],
        ],
        "y+",
        [0, 55, 8],
        {
          seg: 14,
        },
      ),
      {
        noAO: !0,
      },
    ),
    e.put(
      "armor",
      Nn(
        [
          [9.5, 20],
          [10.5, 20.6, 1],
          [11.5, 20],
          [13.5, 14, 1],
          [13.5, 5],
        ],
        "y+",
        [0, 55, 8],
        {
          seg: 14,
        },
      ),
    ),
    e.put(
      "metal",
      h1(5, 13.5, 15, "y+", [0, 55, 8], {
        seg: 6,
        c: 0.6,
      }),
    ));
  for (let c of [-1, 1])
    e.put(
      "metal",
      h1(11, 0, 15, c > 0 ? "x+" : "x-", [c * 43, 45, -20], {
        seg: 10,
        c: 1.2,
      }),
    );
  e.put(
    "frame",
    wi(
      [
        [62, -27],
        [110, -27],
        [110, -44.5, 3],
        [66, -44.5, 3],
      ],
      48,
      {
        b: 1.4,
        cs: 1,
      },
    ),
    {
      alert: 0.02,
    },
  );
  for (let c of [-1, 1])
    (e.put(
      "ceramic",
      Nn(
        [
          [0, 7],
          [3.5, 7],
          [3.5, 5.4],
          [7, 5.4],
          [7, 7],
          [10.5, 7],
          [10.5, 5.4],
          [13.5, 5.4],
          [15, 4.2],
          [15, 0],
        ],
        "u+",
        [c * 16, -37, 110],
        {
          seg: 8,
        },
      ),
      {
        alert: 0.03,
      },
    ),
      e.put(
        "tungsten",
        Nn(
          [
            [15, 2.4],
            [22, 2.4],
            [26.5, 0.5],
            [26.5, 0],
          ],
          "u+",
          [c * 16, -37, 110],
          {
            seg: 6,
            crease: 50,
          },
        ),
        {
          alert: 1,
          noAO: !0,
        },
      ),
      e.put(
        "hv",
        Mh(
          [
            [c * 26.5, -40, 104],
            [c * 28.5, -40, 86],
            [c * 28, -36, 66],
            [c * 27, -27, 54],
          ],
          2.6,
          {
            seg: 5,
            radial: 5,
          },
        ),
      ));
  for (let c = 0; c < 5; c++)
    e.put("steel", MB(150.5, 155.5, 153, -27.8, -32.6, 7.5, (c - 2) * 10.4));
  for (let c of [-1, 1])
    (e.put(
      "frame",
      h1(8.5, 0, 4, c > 0 ? "x+" : "x-", [c * 47, -30, 60], {
        seg: 8,
        c: 1,
      }),
    ),
      C2(e, [c * 51, -30, 60], c > 0 ? "R" : "L", {
        af: 6,
        h: 1.8,
      }));
  for (let c of [-1, 1])
    s.put(
      "armorDk",
      b4(
        wi(
          [
            [-14, -2, 3],
            [-14, -13, 4],
            [-3, -24, 4],
            [83, -27, 3],
            [98, -17, 3],
            [98, -3.5, 1.5],
            [-8, -1.5],
          ],
          6,
          {
            x: 0,
            b: 1.3,
            cs: 1,
          },
        ),
        [c * 41, 0, 0],
        [0, c * 7.85, 0],
      ),
    );
  (s.put(
    "frame",
    d7(
      [
        [-37, -6],
        [37, -6],
        [26, 92],
        [-26, 92],
      ],
      6,
      {
        y: -26.5,
        b: 1,
      },
    ),
    {
      alert: 0.016,
    },
  ),
    s.put(
      "frame",
      wi(
        [
          [86, -24],
          [98, -16.5],
          [98, -4],
          [92, -4],
          [92, -13],
          [84, -19.5],
        ],
        50,
        {
          b: 1,
        },
      ),
    ));
  for (let c = 0; c < 4; c++)
    s.put("steel", MB(92.6, 97.6, 95, -4.2, 0.8, 7.5, (c - 1.5) * 10.4));
  s.put("brass", Ia(40, 1.4, 46, [0, -19.8, 42]), {
    alert: 0.03,
  });
  for (let c of [-1, 1])
    (s.put(
      "metal",
      h1(4.6, 0, 4.6, c > 0 ? "x+" : "x-", [c * 41.5, 0, 0], {
        seg: 8,
        c: 0.8,
      }),
    ),
      C2(
        s,
        [c * 37.9, -14, 45],
        [
          [c * 0.99, 0, -0.137],
          [0, 1, 0],
        ],
        {
          af: 4.5,
          h: 1.5,
        },
      ));
  let l = (c) => b4(c, null, [wB / Hs, 0, 0]);
  return (
    n.put(
      "armor",
      l(
        wi(
          [
            [-13, -12, 6],
            [20, -13, 4],
            [100, -5, 4],
            [104, 3, 4],
            [82, 12, 6],
            [-6, 14, 8],
          ],
          6.5,
          {
            x: 13,
            b: 1.5,
            cs: 1,
          },
        ),
      ),
    ),
    n.put(
      "glass",
      l(
        wi(
          [
            [26, -7],
            [88, -2],
            [78, 5.5],
            [28, 7],
          ],
          1.2,
          {
            x: 16.7,
            b: 0.4,
          },
        ),
      ),
      {
        noAO: !0,
      },
    ),
    n.put("lamp", l(Ia(1.4, 2.4, 56, [16.8, 10.2, 48])), {
      glow: 1,
      order: 0.8,
      noAO: !0,
    }),
    n.put(
      "metal",
      l(
        h1(9, 16, 18.5, "x+", [0, 0, 0], {
          seg: 8,
          c: 1,
        }),
      ),
    ),
    n.put(
      "frame",
      l(
        h1(12, 2.5, 9.8, "x+", [0, 0, 0], {
          seg: 10,
          c: 1,
        }),
      ),
    ),
    {
      neck: t,
      head: e,
      jaw: s,
      ear: n,
    }
  );
}
function Ut0(o, t) {
  (Gi(
    o,
    t,
    "laser",
    30,
    [-34, 55, 26],
    [
      [-0.141, 0.99, 0],
      [0, 0, -1],
    ],
    "armor",
    {
      roll: 90,
      lift: 0.5,
    },
  ),
    Gi(o, t, "ghEng", 32, [-60.3, 12, 32], "L", "armor"),
    Gi(o, t, "ghEng", 32, [60.3, 12, 32], "R", "armor"),
    Gi(o, t, "hv", 24, [-52.2, -13, 50], "L", "armorDk"),
    Gi(o, t, "hv", 24, [52.2, -13, 50], "R", "armorDk"));
}
function Vt0() {
  let o = new Da("tail1"),
    t = new Da("tail2"),
    e = new Da("tail3"),
    s = Math.hypot(70, 85),
    n = [0, 70 / s, 85 / s],
    i = [[0, 9]];
  for (let a = 0; a < 6; a++) i.push([3 + a * 5.2, 9.2], [5.6 + a * 5.2, 6.4]);
  return (
    i.push([35, 9], [38, 6, 1], [42, 4.4]),
    o.put(
      "steel",
      Nn(i, n, [0, 0, 0], {
        seg: 10,
        crease: 70,
      }),
      {
        r: 0.36,
      },
    ),
    o.put(
      "poly",
      Nn(
        [
          [42, 3.3],
          [s - 6, 2.9],
        ],
        n,
        [0, 0, 0],
        {
          seg: 7,
        },
      ),
      {
        nrm: 0.2,
        r: 0.4,
      },
    ),
    o.put(
      "metal",
      Nn(
        [
          [s - 6, 4.6],
          [s + 4, 4.6],
        ],
        n,
        [0, 0, 0],
        {
          seg: 8,
        },
      ),
    ),
    t.put(
      "poly",
      Nn(
        [
          [4, 2.8],
          [s - 5, 2.4],
        ],
        n,
        [0, 0, 0],
        {
          seg: 7,
        },
      ),
      {
        nrm: 0.2,
        r: 0.4,
      },
    ),
    t.put(
      "metal",
      Nn(
        [
          [s - 5, 4],
          [s + 3.5, 4],
        ],
        n,
        [0, 0, 0],
        {
          seg: 8,
        },
      ),
    ),
    e.put(
      "poly",
      Nn(
        [
          [3.5, 2.3],
          [s - 16, 1.9],
        ],
        n,
        [0, 0, 0],
        {
          seg: 6,
        },
      ),
      {
        nrm: 0.2,
        r: 0.4,
      },
    ),
    e.put(
      "metal",
      Nn(
        [
          [s - 16, 3.4],
          [s - 11, 3.4],
        ],
        n,
        [0, 0, 0],
        {
          seg: 8,
        },
      ),
    ),
    e.put(
      "lamp",
      Nn(
        [
          [s - 11, 4.4],
          [s - 3, 4.4],
          [s, 2.4],
          [s + 0.6, 0],
        ],
        n,
        [0, 0, 0],
        {
          seg: 8,
          crease: 70,
        },
      ),
      {
        glow: 1,
        order: 0.92,
        noAO: !0,
      },
    ),
    {
      t1: o,
      t2: t,
      t3: e,
    }
  );
}
var gC = [
  {
    bone: xs.body,
    p: [-110, 72, -180],
    r: 170,
  },
  {
    bone: xs.body,
    p: [120, 0, 30],
    r: 150,
  },
  {
    bone: xs.head,
    p: [-52, 34, -40],
    r: 90,
  },
  {
    bone: xs.upperFR,
    p: [32, -150, 0],
    r: 120,
  },
  {
    bone: xs.body,
    p: [40, 78, 250],
    r: 150,
  },
  {
    bone: xs.lowerHL,
    p: [-16, -210, 0],
    r: 110,
  },
  {
    bone: xs.body,
    p: [0, -118, -40],
    r: 150,
  },
].map((o, t) => ({
  ...o,
  k: 1 - t * 0.07,
  at: +(0.2 + t * 0.05).toFixed(2),
}));
var mC = null;
function EB(o) {
  if (mC) return mC;
  let t = typeof performance < "u" ? performance.now() : 0,
    e = $u.map(() => [0, 0, 0]);
  $u.forEach((d, m) => {
    let p = d.parent >= 0 ? e[d.parent] : [0, 0, 0];
    e[m] = [p[0] + d.at[0], p[1] + d.at[1], p[2] + d.at[2]];
  });
  let s = new u7(e),
    n = {
      parts: {},
    },
    i = (d, m = 1) => ((n.parts[d.name] = d.tris * m), d.tris * m),
    a = Ht0(o),
    r = new Da("marks");
  (Ft0(r, o),
    s.place(a.core, xs.body),
    s.place(r, xs.body),
    s.place(a.side, xs.body),
    s.place(a.side, xs.body, {
      mx: !0,
    }),
    s.place(a.end, xs.body),
    s.place(a.end, xs.body, {
      mz: !0,
    }));
  for (let d of [!1, !0])
    for (let m of [!1, !0])
      s.place(a.quad, xs.body, {
        mx: d,
        mz: m,
      });
  n.body = i(a.core) + i(r) + i(a.side, 2) + i(a.end, 2) + i(a.quad, 4);
  let l = Ot0();
  (l.hip.bakeAO(), l.upper.bakeAO(), l.lower.bakeAO());
  for (let d = 0; d < 4; d++) {
    let m = Ph(d) < 0,
      p = !kf(d),
      x = Nt0(d, o);
    (s.place(l.hip, 1 + d * 3, {
      mx: m,
      mz: p,
    }),
      s.place(x.hipM, 1 + d * 3),
      s.place(l.upper, 2 + d * 3, {
        mx: m,
      }),
      s.place(x.upM, 2 + d * 3),
      s.place(l.lower, 3 + d * 3, {
        mx: m,
      }));
  }
  n.legs = i(l.hip, 4) + i(l.upper, 4) + i(l.lower, 4);
  let c = Bt0(o),
    h = new Da("headMarks");
  (Ut0(h, o),
    c.neck.bakeAO(),
    c.jaw.bakeAO(),
    c.ear.bakeAO(),
    s.place(c.neck, xs.neck),
    s.place(c.head, xs.head),
    s.place(h, xs.head),
    s.place(c.jaw, xs.jaw),
    s.place(c.ear, xs.earR),
    s.place(c.ear, xs.earL, {
      mx: !0,
    }),
    (n.head = i(c.neck) + i(c.head) + i(h) + i(c.jaw) + i(c.ear, 2)));
  let f = Vt0();
  (s.place(f.t1, xs.tail1),
    s.place(f.t2, xs.tail2),
    s.place(f.t3, xs.tail3),
    (n.tail = f.t1.tris + f.t2.tris + f.t3.tris));
  let u = s.build(gC, [xs.body, xs.head]);
  return (
    (n.tris = u.attributes.position.count / 3),
    (n.ms = +((typeof performance < "u" ? performance.now() : 0) - t).toFixed(
      1,
    )),
    (mC = {
      geometry: u,
      stats: n,
      rest: e,
    })
  );
}
var TB = [
  {
    glow: 3531007,
    hot: 13170431,
    shell: 5792618,
    stripe: 1806259,
    k: 1,
  },
  {
    glow: 16734750,
    hot: 16767400,
    shell: 6575684,
    stripe: 13192214,
    k: 1.25,
  },
];
var Gt0 = `
attribute vec4 aMat; attribute vec4 aMat2; attribute vec4 aFx; attribute vec4 aFx2;
varying vec4 vMat; varying vec4 vMat2; varying vec4 vFx; varying vec4 vFx2;
`;
var Wt0 = `
varying vec4 vMat; varying vec4 vMat2; varying vec4 vFx; varying vec4 vFx2;
uniform sampler2D uK9Mask; uniform vec4 uK9State; uniform vec3 uK9Team, uK9Hot, uK9Shell, uK9Paint; uniform float uK9Glow; uniform vec2 uK9Zap; uniform float uK9Fade;
uniform vec4 ghRim; uniform vec3 ghFill;
vec3 k9Fill( vec3 N, vec3 V, vec3 albedo, float ao ) {
  float nv = saturate( dot( N, V ) );
  float up = 0.5 + 0.5 * inverseTransformDirection( N, viewMatrix ).y;
  return ( albedo * ghFill * ( 0.3 + 0.7 * nv ) * ( 0.55 + 0.45 * up ) + ghRim.rgb * pow( 1.0 - nv, ghRim.w ) * ( 0.35 + 0.65 * up ) ) * ao;
}
`;
var qt0 = `
  vec3 kAlb = vColor * ( 1.0 - 0.86 * step( 0.01, vFx.w ) );       // self-lit lenses are dark until they are powered
  float kMetal = vMat.x, kRough = vMat.y, kAO = vMat.z, kNrm = vMat.w;
  float kWear = vMat2.x, kDust = vMat2.y, kWeave = vMat2.z, kPaint = vMat2.w;
  float kPower = uK9State.x, kAlert = uK9State.y, kDamage = uK9State.z, kTime = uK9State.w;
  vec2 kUv = vec2( 0.0 );
  #ifdef USE_NORMALMAP
    kUv = vNormalMapUv;
  #endif
  vec4 kA = texture2D( uK9Mask, kUv * 4.3 );
  vec4 kB = texture2D( uK9Mask, kUv * 26.0 + vec2( 0.37, 0.61 ) );
  // shell paint, team stripe, tonal breakup
  kAlb = mix( kAlb, kAlb * uK9Shell, kPaint );
  kAlb = mix( kAlb, uK9Paint, vFx2.z );
  kAlb *= mix( 1.0, 0.84 + 0.32 * kA.r, max( kPaint, vFx2.z ) );
  kRough *= mix( 1.0, ( 0.84 + 0.32 * kB.r ) * mix( 1.0, 0.78 + 0.44 * kA.b, kPaint ), step( 0.01, kNrm ) );
  // stencils / plates / labels
  #ifdef USE_MAP
    vec4 kDec = texture2D( map, vMapUv );
    kAlb = kAlb * ( 1.0 - kDec.a ) + kDec.rgb; kMetal *= 1.0 - kDec.a; kRough = mix( kRough, 0.6, kDec.a );
  #endif
  // wear: chips and scratches down to the substrate (primer on composite, bright metal on anodising)
  vec4 kC = texture2D( uK9Mask, kUv * 63.0 + vec2( 0.13, 0.71 ) );
  float kWearE = kWear * ( 0.45 + 1.1 * kA.r );
  float kChip = smoothstep( 1.0 - kWearE, 1.07 - kWearE, kB.g * 0.6 + kC.g * 0.4 + 0.06 );
  float kSubM = step( 0.45, kMetal );
  kAlb = mix( kAlb, mix( kAlb * 1.9 + vec3( 0.035, 0.034, 0.032 ), vec3( 0.36, 0.355, 0.345 ), kSubM ), kChip * 0.85 );
  kMetal = mix( kMetal, kSubM, kChip ); kRough = mix( kRough, mix( 0.66, 0.36, kSubM ), kChip );
  // dust settles in recesses and low on the legs
  float kD = clamp( kDust * 2.0 * smoothstep( 0.62, 1.15, kA.r * 0.42 + kB.r * 0.16 + ( 1.0 - kAO ) * 1.25 ), 0.0, 1.0 );
  kAlb = mix( kAlb, vec3( 0.17, 0.155, 0.135 ), kD * 0.5 ); kRough = mix( kRough, 0.93, kD * 0.8 ); kMetal *= 1.0 - kD * 0.6;
  // battle damage: scorch spreading from the hit sites, cracked coat, embers in the cores
  float kBurn = kDamage * 1.5 - ( 1.0 - vFx2.x ) * 1.08 - ( 1.0 - ( kA.b * 0.7 + kB.b * 0.3 ) ) * 1.2;
  float kSoot = smoothstep( 0.0, 0.22, kBurn ), kCore = smoothstep( 0.24, 0.5, kBurn );
  float kRing = smoothstep( -0.2, 0.0, kBurn ) * ( 1.0 - kSoot );
  float kCrack = kA.a * smoothstep( -0.32, 0.02, kBurn ) * step( 0.001, kDamage );
  kAlb = mix( kAlb, kAlb * vec3( 0.62, 0.44, 0.3 ), kRing );
  kAlb = mix( kAlb, vec3( 0.034, 0.031, 0.029 ), max( kSoot * 0.93, kCrack * 0.85 ) );
  kRough = mix( kRough, 0.96, max( kSoot, kCrack ) ); kMetal *= 1.0 - 0.85 * kSoot;
  float kHot = smoothstep( 0.55, 0.9, kA.r ) * kCore;                                  // only some cores still burn
  float kEmber = ( kHot * kCrack * 2.2 + kCore * smoothstep( 0.93, 0.99, kB.b * 0.5 + kC.r * 0.5 ) * 3.0 ) * ( 0.6 + 0.4 * sin( kTime * 7.0 + kA.r * 40.0 + kA.g * 17.0 ) );
  diffuseColor.rgb = kAlb;
  #ifdef K9_DEBUG_AO
    diffuseColor.rgb = vec3( kAO * 0.5 ); kMetal = 0.0; kRough = 1.0;
  #endif
  // lights: boot sequence by order, breathing when calm, hard and hot when hostile
  float kT = kPower - vFx.y * 0.82;
  float kOn = clamp( kT / 0.09, 0.0, 1.0 );
  float kFlash = 1.0 + 2.2 * kOn * ( 1.0 - smoothstep( 0.09, 0.3, kT ) ) * ( 1.0 - smoothstep( 0.86, 1.0, kPower ) );
  float kBreath = mix( 0.74 + 0.26 * sin( kTime * 2.1 - vFx.y * 3.0 ), 1.0 + 0.05 * sin( kTime * 37.0 ), kAlert );
  vec3 kEmis = mix( uK9Team, uK9Hot, max( kAlert * 0.55, uK9Zap.y ) ) * ( vFx.x * kOn * kFlash * kBreath * mix( 2.1, 7.0, kAlert ) * ( 1.0 + 1.2 * uK9Zap.y ) * uK9Glow );
  // electrodes (and, faintly, the mouth they light): a hint when hostile, heating while they charge, a flash per discharge
  kEmis += vec3( 0.5, 0.78, 1.0 ) * ( vFx.z * kOn * ( 0.35 * kAlert * kAlert + uK9Zap.x * uK9Zap.x * ( 6.0 + 2.5 * sin( kTime * 53.0 ) ) + uK9Zap.y * 13.0 ) );
  kEmis += vColor * ( vFx.w * kOn * kFlash * 5.0 );
  kEmis += vec3( 5.0, 1.15, 0.14 ) * kEmber * ( 0.4 + 0.6 * kPower );
  // a wreck being cleared away burns out along its own grain: holes open from the scorched patches, a hot edge ahead of them
  if ( uK9Fade < 0.999 ) {
    float kDis = 0.05 + 0.9 * clamp( ( kA.b * 0.5 + kB.r * 0.34 + kC.r * 0.16 - 0.24 ) / 0.52, 0.0, 1.0 );
    float kEdge = uK9Fade - kDis;
    if ( kEdge < 0.0 ) discard;
    kEmis += vec3( 7.0, 1.7, 0.2 ) * ( 1.0 - smoothstep( 0.0, 0.05, kEdge ) ) + vec3( 1.1, 0.18, 0.02 ) * ( 1.0 - smoothstep( 0.0, 0.15, kEdge ) );
  }
`;
var Kt0 = `
  #ifdef USE_NORMALMAP_TANGENTSPACE
    vec2 kXY = mix( ( texture2D( normalMap, vNormalMapUv * 57.0 ).rg * 2.0 - 1.0 ) * kNrm, ( texture2D( normalMap, vNormalMapUv * 41.666 ).ba * 2.0 - 1.0 ) * 0.5, kWeave ) * normalScale * ( 1.0 - 0.7 * kChip );
    normal = normalize( tbn * vec3( kXY, sqrt( max( 1.0 - dot( kXY, kXY ), 0.05 ) ) ) );
  #endif
`;
var Xt0 = `
  reflectedLight.indirectDiffuse *= kAO; reflectedLight.indirectSpecular *= mix( 1.0, kAO, 0.9 );
  reflectedLight.directDiffuse *= mix( 1.0, kAO, 0.35 ); reflectedLight.directSpecular *= mix( 1.0, kAO, 0.6 );
  reflectedLight.indirectDiffuse += k9Fill( normal, normalize( vViewPosition ), diffuseColor.rgb * ( 1.0 - metalnessFactor ), kAO );
`;
function Yt0(o) {
  return (
    (o.onBeforeCompile = (t) => {
      (Object.assign(t.uniforms, o.userData.u),
        (t.vertexShader = t.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
` + Gt0,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vMat = aMat; vMat2 = aMat2; vFx = aFx; vFx2 = aFx2;`,
          )
          .replace(
            "#include <project_vertex>",
            `#include <project_vertex>
mvPosition.xyz *= 1.0 - 0.0018 * aFx2.y; gl_Position = projectionMatrix * mvPosition;`,
          )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
` + Wt0,
          )
          .replace("#include <map_fragment>", "")
          .replace("#include <color_fragment>", qt0)
          .replace(
            "#include <roughnessmap_fragment>",
            "float roughnessFactor = clamp( kRough, 0.045, 1.0 );",
          )
          .replace(
            "#include <metalnessmap_fragment>",
            "float metalnessFactor = clamp( kMetal, 0.0, 1.0 );",
          )
          .replace("#include <normal_fragment_maps>", Kt0)
          .replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
totalEmissiveRadiance += kEmis;`,
          )
          .replace("#include <aomap_fragment>", Xt0)));
    }),
    typeof window < "u" &&
      window.K9_DEBUG_AO &&
      (o.defines = {
        ...(o.defines || {}),
        K9_DEBUG_AO: 1,
      }),
    (o.customProgramCacheKey = () =>
      "gh-k9-main-4" + (o.defines && o.defines.K9_DEBUG_AO ? "ao" : "")),
    o
  );
}
var jt0 = `
attribute vec4 aCard; varying vec4 vCard; varying vec2 vCuv;
`;
var $t0 = `
varying vec4 vCard; varying vec2 vCuv;
uniform vec4 uK9State; uniform vec3 uK9Team, uK9Hot; uniform float uK9Glow; uniform vec2 uK9Zap; uniform float uK9Fade;
`;
var Zt0 = `
  {
    float kPower = uK9State.x, kAlert = uK9State.y, kTime = uK9State.w;
    vec3 kTeam = mix( uK9Team, uK9Hot, kAlert * 0.5 ) * uK9Glow;
    if ( vCard.x < 0.5 ) {
      // visor glass: smoked, glossy; behind it a light guide that boots from the centre outwards
      vec3 kV = normalize( vViewPosition );
      float kF = pow( 1.0 - saturate( dot( normalize( vNormal ), kV ) ), 4.0 );
      float kA = mix( 0.8, 0.98, kF );
      float u = vCuv.x, v = vCuv.y;
      float kOn = clamp( ( kPower * 1.25 - abs( u ) * 0.8 - 0.12 ) / 0.1, 0.0, 1.0 );
      float kFlick = 1.0 - ( 1.0 - smoothstep( 0.8, 1.0, kPower ) ) * 0.5 * step( 0.5, fract( sin( floor( kTime * 31.0 ) * 12.9898 + floor( u * 6.0 ) ) * 43758.5453 ) );
      float kBreath = mix( 0.7 + 0.3 * sin( kTime * 2.1 ), 1.0, kAlert );
      float kW = mix( 0.42, 0.2, kAlert );
      v -= kAlert * 0.3 * ( abs( u ) - 0.45 );      // hostile: the slit knits into a shallow V, a scowl
      float kBand = exp( - v * v / ( kW * kW ) );
      float kSeg = 0.82 + 0.18 * smoothstep( 0.04, 0.12, abs( fract( u * 5.5 + 0.5 ) - 0.5 ) );
      vec3 kGlow = kTeam * kBand * kSeg * ( 1.0 - 0.35 * u * u ) * mix( 0.16, 2.2, kAlert ) * kBreath;
      // the light slit itself (the lamps behind the smoked glass are only a hint of depth)
      kGlow += kTeam * ( 1.0 - smoothstep( 0.075, 0.115, abs( vCuv.y ) ) ) * ( 1.0 - smoothstep( 0.4, 0.43, abs( u ) ) ) * ( 0.75 + 0.25 * smoothstep( 0.03, 0.06, abs( fract( u * 5.72 + 0.5 ) - 0.5 ) ) ) * 2.0 * kBreath * ( 1.0 - kAlert );
      // hostile: a hard white-hot slit with a burning core
      float kSlit = exp( - v * v / 0.012 ) * ( 0.25 + 0.75 * exp( - u * u / 0.22 ) );
      kGlow += mix( kTeam, vec3( 1.0 ), 0.75 ) * kSlit * kAlert * kAlert * 14.0;
      // calm: a soft pupil that drifts a little
      float kPu = u - 0.12 * sin( kTime * 0.6 );
      kGlow += kTeam * exp( - ( kPu * kPu * 7.0 + v * v * 3.5 ) ) * 0.22 * ( 1.0 - kAlert ) * kBreath;
      kGlow += vec3( 0.75, 0.88, 1.0 ) * ( uK9Zap.y * ( 1.2 * exp( - v * v / 0.2 ) + 6.0 * kSlit ) + uK9Zap.x * uK9Zap.x * 1.6 * kSlit );      // discharge: the visor flares white
      kGlow *= kOn * kFlick;
      gl_FragColor = vec4( outgoingLight * kA + kGlow, kA );
    } else {
      float r2 = dot( vCuv, vCuv );
      float kFall = exp( - r2 * 4.2 ) * ( 1.0 - smoothstep( 0.75, 1.0, r2 ) );
      float kFace = saturate( dot( normalize( vNormal ), normalize( vViewPosition ) ) * 1.6 + 0.25 ), kFar = smoothstep( 2.0, 9.0, length( vViewPosition ) );
      float kOn = clamp( ( kPower - 0.55 ) / 0.3, 0.0, 1.0 );
      vec3 c;
      if ( vCard.x < 1.5 ) c = uK9Team * uK9Glow * kFace * kFar * mix( 0.24, 0.85, kAlert ) * mix( 0.8 + 0.2 * sin( kTime * 2.1 ), 1.0, kAlert );
      else if ( vCard.x < 2.5 ) { float kBl = smoothstep( 0.86, 0.9, fract( kTime * 0.55 + vCard.w ) ) + 0.6 * smoothstep( 0.86, 0.9, fract( kTime * 0.55 + vCard.w + 0.12 ) ); c = kTeam * ( 0.12 + 1.6 * kBl ) * ( 0.25 + 0.75 * kFar ); }
      else c = vec3( 0.5, 0.78, 1.0 ) * ( 0.4 + 0.6 * kFace ) * ( 0.05 * kAlert * kAlert + uK9Zap.x * uK9Zap.x * ( 0.5 + 0.3 * sin( kTime * 53.0 + vCard.w * 9.0 ) ) + uK9Zap.y * 1.1 );
      gl_FragColor = vec4( c * kFall * kOn, 0.0 );
    }
    gl_FragColor *= smoothstep( 0.25, 0.8, uK9Fade );
  }
`;
function Qt0(o) {
  return (
    (o.onBeforeCompile = (t) => {
      (Object.assign(t.uniforms, o.userData.u),
        (t.vertexShader = t.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
` + jt0,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
vCard = aCard; vCuv = uv;`,
          )
          .replace(
            "#include <project_vertex>",
            `#include <project_vertex>
        if ( aCard.x > 0.5 ) { mvPosition.xyz -= normalize( mvPosition.xyz ) * min( 0.07, aCard.y * 0.6 ); mvPosition.xy += uv * aCard.yz; gl_Position = projectionMatrix * mvPosition; }`,
          )),
        (t.fragmentShader = t.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
` + $t0,
          )
          .replace("#include <opaque_fragment>", Zt0)
          .replace("#include <premultiplied_alpha_fragment>", "")));
    }),
    (o.customProgramCacheKey = () => "gh-k9-fx-3"),
    o
  );
}
function SB() {
  let o = f7(),
    t = {
      uK9State: {
        value: new Vector4(1, 0, 0, 0),
      },
      uK9Team: {
        value: new Color(),
      },
      uK9Hot: {
        value: new Color(),
      },
      uK9Shell: {
        value: new Color(),
      },
      uK9Paint: {
        value: new Color(),
      },
      uK9Glow: {
        value: 1,
      },
      uK9Mask: {
        value: o.mask,
      },
      uK9Zap: {
        value: new Vector2(0, 0),
      },
      uK9Fade: {
        value: 1,
      },
      ghRim: Kk,
      ghFill: qk,
    },
    e = new MeshStandardMaterial({
      vertexColors: !0,
      roughness: 1,
      metalness: 1,
    });
  (o.detail && ((e.normalMap = o.detail), (e.map = o.marks)),
    (e.userData.u = t),
    (e.name = "k9:main"),
    Yt0(e));
  let s = new MeshStandardMaterial({
    color: 724240,
    roughness: 0.07,
    metalness: 0,
    transparent: !0,
    depthWrite: !1,
    premultipliedAlpha: !0,
    fog: !1,
  });
  return (
    (s.userData.u = t),
    (s.name = "k9:fx"),
    Qt0(s),
    {
      main: e,
      fx: s,
      u: t,
    }
  );
}
var g7 = {
  y0: 2.6,
  y1: 35.6,
  rake: 5,
  plan: [
    [-58.4, 49],
    [-56.5, 66],
    [-47, 79],
    [-25, 86.4],
    [0, 88.2],
    [25, 86.4],
    [47, 79],
    [56.5, 66],
    [58.4, 49],
  ],
};
var zh = [16, -37, 136.5];
var xC = null;
function Jt0(o) {
  if (xC) return xC;
  let t = [],
    e = [],
    s = [],
    n = [],
    i = [],
    a = [],
    r = o[xs.head],
    l = g7.plan,
    c = l.length,
    h = [0];
  for (let p = 1; p < c; p++)
    h.push(h[p - 1] + Math.hypot(l[p][0] - l[p - 1][0], l[p][1] - l[p - 1][1]));
  for (let p = 0; p < c; p++) {
    let x = l[Math.max(0, p - 1)],
      g = l[Math.min(c - 1, p + 1)],
      b = g[0] - x[0],
      v = g[1] - x[1],
      y = Math.hypot(b, v);
    ((b /= y), (v /= y));
    let M = -v,
      w = b,
      T = (h[p] / h[c - 1]) * 2 - 1;
    for (let [S, E, _] of [
      [g7.y0, -1, 0],
      [g7.y1, 1, g7.rake],
    ]) {
      t.push(
        r[0] + (l[p][0] - M * _) * 0.001,
        r[1] + S * 0.001,
        r[2] - (l[p][1] - w * _) * 0.001,
      );
      let R = 1 / Math.hypot(M, w, 0.15);
      (e.push(M * R, 0.15 * R, -w * R),
        s.push(T, E),
        n.push(0, 0, 0, 0),
        i.push(xs.head, 0, 0, 0));
    }
    if (p < c - 1) {
      let S = p * 2;
      a.push(S, S + 1, S + 2, S + 1, S + 3, S + 2);
    }
  }
  let f = (p, x, g, b, v, y, M = [0, 0, -1]) => {
    let w = t.length / 3,
      T = o[p];
    for (let [S, E] of [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1],
    ])
      (t.push(T[0] + x[0], T[1] + x[1], T[2] + x[2]),
        e.push(M[0], M[1], M[2]),
        s.push(S, E),
        n.push(g, b, v, y),
        i.push(p, 0, 0, 0));
    a.push(w, w + 1, w + 2, w, w + 2, w + 3);
  };
  (f(xs.head, [0, 0.019, -0.09], 1, 0.12, 0.05, 0),
    f(xs.tail3, [0, 0.07, 0.085], 2, 0.032, 0.032, 0.37),
    f(xs.body, [-0.125, 0.013, -0.044], 1, 0.11, 0.035, 0, [-1, 0, 0]),
    f(xs.body, [0.125, 0.013, -0.044], 1, 0.11, 0.035, 0, [1, 0, 0]),
    f(
      xs.head,
      [-zh[0] * 0.001, zh[1] * 0.001, -zh[2] * 0.001],
      3,
      0.017,
      0.017,
      0.1,
    ),
    f(
      xs.head,
      [zh[0] * 0.001, zh[1] * 0.001, -zh[2] * 0.001],
      3,
      0.017,
      0.017,
      0.6,
    ));
  let u = new BufferGeometry(),
    d = t.length / 3,
    m = new Float32Array(d * 4);
  for (let p = 0; p < d; p++) m[p * 4] = 1;
  return (
    u.setAttribute("position", new Float32BufferAttribute(t, 3)),
    u.setAttribute("normal", new Float32BufferAttribute(e, 3)),
    u.setAttribute("uv", new Float32BufferAttribute(s, 2)),
    u.setAttribute("aCard", new Float32BufferAttribute(n, 4)),
    u.setAttribute("skinIndex", new Uint16BufferAttribute(i, 4)),
    u.setAttribute("skinWeight", new BufferAttribute(m, 4)),
    u.setIndex(a),
    (xC = u)
  );
}
var te0 = new Matrix4();
function _B(o, t, e) {
  let s = new Sphere(new Vector3(), e),
    n = new Vector3();
  return (
    Object.defineProperty(s, "center", {
      get: () =>
        n
          .setFromMatrixPosition(t.matrixWorld)
          .applyMatrix4(te0.copy(o.matrixWorld).invert()),
    }),
    s
  );
}
var bC = () =>
  (typeof performance < "u" ? performance.now() : Date.now()) * 0.001;

export { EB, Jt0, SB, TB, _B, bC, f7, gC, zh };

// render/effects/noise.js: recovered from the verified GOLDEN HOUR release.
import { createRandom } from "../../core/math.js";
import {
  Data3DTexture,
  LinearFilter,
  NoColorSpace,
  RGBAFormat,
  RepeatWrapping,
  UnsignedByteType,
} from "../../vendor/three-r180.js";

function Om(o, t, e) {
  let s = t,
    n = new Float32Array(s * s * s);
  for (let f = 0; f < n.length; f++) n[f] = e();
  let i = new Float32Array(o * o * o),
    a = s / o,
    r = new Float32Array(o),
    l = new Int32Array(o),
    c = new Int32Array(o);
  for (let f = 0; f < o; f++) {
    let u = f * a,
      d = u - Math.floor(u);
    ((r[f] = d * d * d * (d * (d * 6 - 15) + 10)),
      (l[f] = Math.floor(u) % s),
      (c[f] = (l[f] + 1) % s));
  }
  let h = 0;
  for (let f = 0; f < o; f++) {
    let u = l[f] * s * s,
      d = c[f] * s * s,
      m = r[f];
    for (let p = 0; p < o; p++) {
      let x = l[p] * s,
        g = c[p] * s,
        b = r[p];
      for (let v = 0; v < o; v++) {
        let y = l[v],
          M = c[v],
          w = r[v],
          T = n[u + x + y] + (n[u + x + M] - n[u + x + y]) * w,
          S = n[u + g + y] + (n[u + g + M] - n[u + g + y]) * w,
          E = n[d + x + y] + (n[d + x + M] - n[d + x + y]) * w,
          _ = n[d + g + y] + (n[d + g + M] - n[d + g + y]) * w,
          R = T + (S - T) * b,
          C = E + (_ - E) * b;
        i[h++] = R + (C - R) * m;
      }
    }
  }
  return i;
}
function g9(o, t, e) {
  let s = t,
    n = new Float32Array(s * s * s * 3);
  for (let l = 0; l < s * s * s; l++)
    ((n[l * 3] = e()), (n[l * 3 + 1] = e()), (n[l * 3 + 2] = e()));
  let i = new Float32Array(o * o * o),
    a = s / o,
    r = 0;
  for (let l = 0; l < o; l++) {
    let c = (l + 0.5) * a,
      h = Math.floor(c);
    for (let f = 0; f < o; f++) {
      let u = (f + 0.5) * a,
        d = Math.floor(u);
      for (let m = 0; m < o; m++) {
        let p = (m + 0.5) * a,
          x = Math.floor(p),
          g = 9;
        for (let v = -1; v <= 1; v++) {
          let y = h + v,
            M = ((y % s) + s) % s;
          for (let w = -1; w <= 1; w++) {
            let T = d + w,
              S = ((T % s) + s) % s;
            for (let E = -1; E <= 1; E++) {
              let _ = x + E,
                R = ((_ % s) + s) % s,
                C = ((M * s + S) * s + R) * 3,
                L = _ + n[C] - p,
                A = T + n[C + 1] - u,
                O = y + n[C + 2] - c,
                H = L * L + A * A + O * O;
              H < g && (g = H);
            }
          }
        }
        let b = 1 - Math.sqrt(g) / 1;
        i[r++] = b < 0 ? 0 : b;
      }
    }
  }
  return i;
}
var x9 = null;
function zL(o = 64) {
  if (x9) return x9;
  let t = createRandom(4242),
    e = o * o * o,
    s = Om(o, 4, t),
    n = Om(o, 8, t),
    i = Om(o, 16, t),
    a = Om(o, 32, t),
    r = Om(o, 4, t),
    l = Om(o, 8, t),
    c = Om(o, 16, t),
    h = g9(o, 3, t),
    f = g9(o, 6, t),
    u = g9(o, 12, t),
    d = new Uint8Array(e * 4);
  for (let p = 0; p < e; p++) {
    let x = s[p] * 0.5 + n[p] * 0.27 + i[p] * 0.15 + a[p] * 0.08,
      g = h[p] * 0.62 + f[p] * 0.38,
      b = f[p] * 0.55 + u[p] * 0.45,
      v = r[p] * 0.55 + l[p] * 0.3 + c[p] * 0.15;
    ((d[p * 4] = Math.max(0, Math.min(255, (x - 0.5) * 1.7 * 255 + 127.5))),
      (d[p * 4 + 1] = Math.max(0, Math.min(255, g * 1.25 * 255))),
      (d[p * 4 + 2] = Math.max(0, Math.min(255, b * 1.3 * 255))),
      (d[p * 4 + 3] = Math.max(
        0,
        Math.min(255, (v - 0.5) * 1.7 * 255 + 127.5),
      )));
  }
  let m = new Data3DTexture(d, o, o, o);
  return (
    (m.format = RGBAFormat),
    (m.type = UnsignedByteType),
    (m.minFilter = LinearFilter),
    (m.magFilter = LinearFilter),
    (m.wrapS = m.wrapT = m.wrapR = RepeatWrapping),
    (m.unpackAlignment = 1),
    (m.colorSpace = NoColorSpace),
    (m.needsUpdate = !0),
    (x9 = m)
  );
}

export { zL };

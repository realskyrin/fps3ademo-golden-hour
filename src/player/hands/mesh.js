// player/hands/mesh.js: recovered from the verified GOLDEN HOUR release.
import { createCanvas, createNoise, createRandom } from "../../core/math.js";
import {
  BufferGeometry,
  CanvasTexture,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  Float32BufferAttribute,
  LinearFilter,
  LinearMipmapLinearFilter,
  MeshPhysicalMaterial,
  NoColorSpace,
  Quaternion,
  RGBAFormat,
  RepeatWrapping,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";

var ys = (o, t, e) => o + (t - o) * e;
var gi = (o, t, e) => (o < t ? t : o > e ? e : o);
var xo = (o, t) => Math.exp(-(o * o) / (t * t));
var TR = (o, t) => Math.sign(o) * Math.pow(Math.abs(o), t);
var os = (o, t, e) => {
  let s = gi((e - o) / (t - o), 0, 1);
  return s * s * (3 - 2 * s);
};
function rE(o) {
  return (t) => {
    let e = o.length;
    if (t <= o[0][0]) return o[0][1];
    if (t >= o[e - 1][0]) return o[e - 1][1];
    let s = 0;
    for (; t > o[s + 1][0];) s++;
    let n = o[Math.max(0, s - 1)],
      i = o[s],
      a = o[s + 1],
      r = o[Math.min(e - 1, s + 2)],
      l = a[0] - i[0],
      c = (t - i[0]) / l,
      h = ((a[1] - n[1]) / (a[0] - n[0])) * l,
      f = ((r[1] - i[1]) / (r[0] - i[0])) * l,
      u = c * c,
      d = u * c;
    return (
      (2 * d - 3 * u + 1) * i[1] +
      (d - 2 * u + c) * h +
      (-2 * d + 3 * u) * a[1] +
      (d - u) * f
    );
  };
}
function Gg(o, t, e, s = 512) {
  let n = new Float32Array(s + 1),
    i = s / (e - t);
  for (let a = 0; a <= s; a++) n[a] = o(t + ((e - t) * a) / s);
  return (a) => {
    let r = (a - t) * i;
    if (r <= 0) return n[0];
    if (r >= s) return n[s];
    let l = r | 0;
    return n[l] + (n[l + 1] - n[l]) * (r - l);
  };
}
var Kb = (o, t, e) => {
  let s = e - Math.abs(o - t);
  return s > 0 ? Math.min(o, t) - (s * s) / (4 * e) : Math.min(o, t);
};
function qI(o) {
  let {
      BW_P: t,
      BW_Q: e,
      F_MCP: s,
      F_LEN: n,
      F_A: i,
      F_B: a,
      T_LEN: r,
      T_A: l,
      T_B: c,
      TH: h,
      RK: f,
      PY: u,
      PTS: d,
      palmPads: m,
    } = o,
    p = Gg(rE(d.W), -0.08, u),
    x = Gg(rE(d.Xc), -0.08, u),
    g = Gg(rE(d.H), -0.08, u),
    b = Gg(rE(d.E), -0.08, u),
    v = Gg(o.kY, -0.07, 0.07),
    y = Gg(o.kZ, -0.07, 0.07),
    M = 0,
    w = 0,
    T = 0,
    S = [0.0015, 0.0018, 0.0014, 0.0011];
  function E(P0, st) {
    let J0 = n[P0],
      q0 = i[P0],
      v0 = a[P0],
      x0 = st < 0 ? 0 : st,
      C0 =
        S[P0] * xo(st + 0.0015, 0.008) +
        95e-5 * xo(st - J0[0], 0.0058) +
        6e-4 * xo(st - J0[0] - J0[1], 0.0046);
    if (x0 <= J0[0]) {
      let nt = x0 / J0[0],
        L0 = Math.sin(Math.PI * nt),
        ht = ys(v0[0], v0[1], nt);
      ((M = ys(q0[0], q0[1], nt) * (1 - 0.098 * L0)),
        (w = ht - 9e-4 * L0 + C0),
        (T = ht + 0.0013 * L0));
      return;
    }
    let k0 = x0 - J0[0];
    if (k0 <= J0[1]) {
      let nt = k0 / J0[1],
        L0 = Math.sin(Math.PI * nt),
        ht = ys(v0[1], v0[2], nt);
      ((M = ys(q0[1], q0[2], nt) * (1 - 0.092 * L0)),
        (w = ht - 8e-4 * L0 + C0),
        (T = ht + 0.0011 * L0));
      return;
    }
    k0 -= J0[1];
    let O0 = q0[3] * 0.92,
      B0 = J0[2] - O0;
    if (k0 <= B0) {
      let nt = k0 / B0,
        L0 = ys(v0[2], v0[3], nt);
      ((M = ys(q0[2], q0[3], nt)),
        (w = L0 + C0),
        (T = L0 + 0.001 * Math.sin(Math.PI * nt) + 4e-4 * os(0.2, 0.8, nt)));
      return;
    }
    let ot = Math.min(0.9995, (k0 - B0) / O0),
      Q0 = Math.sqrt(1 - ot * ot);
    ((M = q0[3] * Math.pow(Q0, 0.85)),
      (w = (v0[3] - 6e-4 * ot) * Q0),
      (T = (v0[3] + 4e-4 + 0.001 * ot) * Q0));
  }
  function _(P0, st) {
    let J0 = r,
      q0 = l,
      v0 = c,
      x0 = st < 0 ? 0 : st,
      C0 =
        0.0011 * xo(st - J0[0], 0.0068) + 7e-4 * xo(st - J0[0] - J0[1], 0.0052);
    if (x0 <= J0[0]) {
      let nt = x0 / J0[0],
        L0 = ys(v0[0], v0[1], nt);
      ((M = ys(q0[0], q0[1], nt)),
        (w = L0 + C0),
        (T = L0 + 0.003 * Math.sin(Math.PI * nt)));
      return;
    }
    let k0 = x0 - J0[0];
    if (k0 <= J0[1]) {
      let nt = k0 / J0[1],
        L0 = Math.sin(Math.PI * nt),
        ht = ys(v0[1], v0[2], nt);
      ((M = ys(q0[1], q0[2], nt) * (1 - 0.1 * L0)),
        (w = ht - 0.001 * L0 + C0),
        (T = ht + 0.0014 * L0));
      return;
    }
    k0 -= J0[1];
    let O0 = q0[3] * 0.92,
      B0 = J0[2] - O0;
    if (k0 <= B0) {
      let nt = k0 / B0,
        L0 = ys(v0[2], v0[3], nt);
      ((M = ys(q0[2], q0[3], nt)),
        (w = L0 + C0),
        (T = L0 + 0.0012 * Math.sin(Math.PI * nt) + 4e-4 * os(0.2, 0.8, nt)));
      return;
    }
    let ot = Math.min(0.9995, (k0 - B0) / O0),
      Q0 = Math.sqrt(1 - ot * ot);
    ((M = q0[3] * Math.pow(Q0, 0.85)),
      (w = (v0[3] - 8e-4 * ot) * Q0),
      (T = (v0[3] + 4e-4 + 0.0011 * ot) * Q0));
  }
  let R = (P0, st, J0, q0) => {
    let v0 = t[0].clone().set(st, J0, q0).applyQuaternion(P0);
    return [v0.x, v0.y, v0.z];
  };
  function C(P0, st, J0, q0, v0, x0) {
    let C0 = t[st],
      k0 = e[st],
      O0 = q0[3] * 0.92;
    return {
      id: P0,
      j0: st,
      M: [C0.x, C0.y, C0.z],
      X: R(k0, 1, 0, 0),
      Y: R(k0, 0, 1, 0),
      Z: R(k0, 0, 0, 1),
      L: J0,
      Ltot: J0[0] + J0[1] + J0[2],
      Lb: J0[0] + J0[1] + J0[2] - O0,
      tip: O0,
      joints: [0, J0[0], J0[0] + J0[1]],
      prof: (B0) => v0(P0, B0),
      capLen: x0,
      rmax: Math.max(q0[0], q0[1]) + 0.016,
    };
  }
  let L = [];
  for (let P0 = 0; P0 < 4; P0++)
    L.push(C(P0, 2 + 3 * P0, n[P0], i[P0], E, 0.012));
  let A = C(4, h, r, l, _, 0.016);
  L.push(A);
  function O(P0, st, J0, q0) {
    P0.prof(st);
    let v0 = Math.cos(J0),
      x0 = Math.sin(J0),
      C0 = M * v0,
      k0 = (x0 >= 0 ? T : w) * x0;
    return (
      (q0[0] = P0.M[0] + P0.Y[0] * st + P0.X[0] * C0 + P0.Z[0] * k0),
      (q0[1] = P0.M[1] + P0.Y[1] * st + P0.X[1] * C0 + P0.Z[1] * k0),
      (q0[2] = P0.M[2] + P0.Y[2] * st + P0.X[2] * C0 + P0.Z[2] * k0),
      q0
    );
  }
  let H = [0, 0, 0];
  function F(P0, st, J0, q0, v0 = H) {
    return (
      (st -= P0.M[0]),
      (J0 -= P0.M[1]),
      (q0 -= P0.M[2]),
      (v0[0] = st * P0.X[0] + J0 * P0.X[1] + q0 * P0.X[2]),
      (v0[1] = st * P0.Y[0] + J0 * P0.Y[1] + q0 * P0.Y[2]),
      (v0[2] = st * P0.Z[0] + J0 * P0.Z[1] + q0 * P0.Z[2]),
      v0
    );
  }
  function P(P0, st, J0, q0) {
    ((st -= P0.M[0]), (J0 -= P0.M[1]), (q0 -= P0.M[2]));
    let v0 = st * P0.X[0] + J0 * P0.X[1] + q0 * P0.X[2],
      x0 = st * P0.Y[0] + J0 * P0.Y[1] + q0 * P0.Y[2],
      C0 = st * P0.Z[0] + J0 * P0.Z[1] + q0 * P0.Z[2];
    if (
      v0 > P0.rmax ||
      v0 < -P0.rmax ||
      C0 > P0.rmax ||
      C0 < -P0.rmax ||
      x0 < -P0.capLen - 0.012
    )
      return 0.012;
    if (x0 >= P0.Ltot - 2e-4) {
      P0.prof(P0.Ltot - 2e-4);
      let B0 = x0 - P0.Ltot + 2e-4;
      return Math.sqrt(v0 * v0 + C0 * C0 + B0 * B0) - Math.min(M, w);
    }
    P0.prof(x0);
    let k0 = C0 >= 0 ? T : w,
      O0 = Math.hypot(v0 / M, C0 / k0);
    return (
      x0 < 0 && (O0 = Math.hypot(O0, x0 / P0.capLen)),
      (O0 - 1) * Math.min(M, k0)
    );
  }
  let z = s.map((P0, st) => ({
    x0: [0.008, 0.002, -0.006, -0.014][st],
    y0: 0.012,
    x1: P0[0],
    y1: P0[1] - 0.006,
  }));
  function k(P0, st, J0) {
    let q0 = 0;
    for (let v0 = 0; v0 < 4; v0++) {
      let x0 = s[v0],
        C0 = P0 - x0[0],
        k0 = J0 - x0[1] + 0.0015;
      C0 * C0 + k0 * k0 < 9e-4 &&
        (q0 += S[v0] * Math.exp(-(C0 * C0 + k0 * k0) / (0.008 * 0.008)));
      let O0 = z[v0],
        B0 = gi((J0 - O0.y0) / (O0.y1 - O0.y0), 0, 1),
        ot = P0 - ys(O0.x0, O0.x1, B0);
      Math.abs(ot) < 0.008 &&
        J0 > O0.y0 - 0.01 &&
        J0 < O0.y1 + 0.004 &&
        (q0 +=
          45e-5 *
          Math.exp(-(ot * ot) / (0.0026 * 0.0026)) *
          os(0.15, 0.6, B0) *
          (1 - os(O0.y1 - 0.004, O0.y1 + 0.004, J0)));
    }
    return (
      J0 < 0.02 &&
        (q0 += 0.0022 * xo(P0 + 0.021, 0.0105) * xo(J0 + 0.011, 0.0115)),
      q0
    );
  }
  let I = (P0, st) =>
    m(P0, st) +
    (st < 0.02 ? 0.0012 * xo(P0 + 0.022, 0.009) * xo(st - 0.004, 0.009) : 0);
  function G(P0, st, J0) {
    let q0 = v(P0),
      v0,
      x0;
    st <= 0
      ? ((v0 = st), (x0 = 0))
      : st <= q0
        ? ((v0 = (st / q0) * u), (x0 = v0 / u))
        : ((v0 = u), (x0 = 1));
    let C0 = b(v0),
      k0 = 2 / C0,
      O0 = p(v0),
      B0 = Math.abs((P0 - x(v0)) / O0),
      ot = x0 * x0 * y(P0),
      Q0 = J0 >= ot ? g(v0) + I(P0, v0) : g(v0) + k(P0, v0, st),
      nt = Math.abs((J0 - ot) / Q0),
      L0 = Math.pow(B0, k0),
      ht = Math.pow(nt, k0),
      pt = L0 + ht,
      V0 = Math.pow(pt, 1 / k0),
      c0 = pt > 1e-9 ? (L0 * O0 + ht * Q0) / pt : Q0;
    if (st > q0) {
      let Z = f * (1 - 0.55 * Math.min(1, B0 * B0 * B0)),
        r0 = (st - q0) / Z,
        b0 = V0 * V0,
        d0 = r0 * r0;
      ((c0 = (b0 * c0 + d0 * Z) / (b0 + d0 + 1e-12)),
        (V0 = Math.sqrt(b0 + d0)));
    }
    return (V0 - 1) * c0;
  }
  function K(P0, st, J0) {
    let q0 = Math.min(st, u),
      v0 = b(q0),
      x0 = TR(Math.cos(P0), v0),
      C0 = TR(Math.sin(P0), v0),
      k0 = Math.max(0, q0 / u),
      O0 = x(q0) + p(q0) * x0,
      B0 = st < 0 ? st : k0 * v(O0),
      ot = C0 > 0 ? g(q0) + I(O0, q0) : g(q0) + k(O0, q0, B0);
    return (
      (J0[0] = O0),
      (J0[1] = B0),
      (J0[2] = k0 * k0 * y(O0) + ot * C0),
      J0
    );
  }
  function $(P0, st, J0) {
    let q0 = b(Math.min(st, u)),
      v0 = gi((P0 - x(Math.min(st, u))) / p(Math.min(st, u)), -1, 1),
      x0 = Math.acos(gi(TR(v0, 1 / q0), -1, 1));
    return J0 > 0 ? x0 : 2 * Math.PI - x0;
  }
  let n0 = [];
  for (let P0 = 0; P0 < 3; P0++) {
    let st = L[P0],
      J0 = L[P0 + 1],
      q0 = [st.Y[0] + J0.Y[0], st.Y[1] + J0.Y[1], st.Y[2] + J0.Y[2]],
      v0 = Math.hypot(q0[0], q0[1], q0[2]);
    ((q0[0] /= v0), (q0[1] /= v0), (q0[2] /= v0));
    let x0 = [
        (st.M[0] + J0.M[0]) / 2 + q0[0] * 0.0065,
        (st.M[1] + J0.M[1]) / 2 + q0[1] * 0.0065,
        (st.M[2] + J0.M[2]) / 2 + q0[2] * 0.0065,
      ],
      C0 = [st.M[0] - J0.M[0], st.M[1] - J0.M[1], st.M[2] - J0.M[2]],
      k0 = C0[0] * q0[0] + C0[1] * q0[1] + C0[2] * q0[2];
    C0 = [C0[0] - k0 * q0[0], C0[1] - k0 * q0[1], C0[2] - k0 * q0[2]];
    let O0 = Math.hypot(C0[0], C0[1], C0[2]);
    C0 = [C0[0] / O0, C0[1] / O0, C0[2] / O0];
    let B0 = [
      C0[1] * q0[2] - C0[2] * q0[1],
      C0[2] * q0[0] - C0[0] * q0[2],
      C0[0] * q0[1] - C0[1] * q0[0],
    ];
    (B0[2] < 0 && ((B0[0] = -B0[0]), (B0[1] = -B0[1]), (B0[2] = -B0[2])),
      n0.push({
        C: x0,
        X: C0,
        Y: q0,
        Z: B0,
        f: P0,
      }));
  }
  function e0(P0, st, J0, q0) {
    ((st -= P0.C[0]), (J0 -= P0.C[1]), (q0 -= P0.C[2]));
    let v0 = (st * P0.X[0] + J0 * P0.X[1] + q0 * P0.X[2]) / 0.0062,
      x0 = (st * P0.Y[0] + J0 * P0.Y[1] + q0 * P0.Y[2]) / 0.0125,
      C0 = (st * P0.Z[0] + J0 * P0.Z[1] + q0 * P0.Z[2]) / 0.008;
    return (Math.sqrt(v0 * v0 + x0 * x0 + C0 * C0) - 1) * 0.0062;
  }
  let p0 = [t[h].x, t[h].y, t[h].z],
    t0 = [t[h + 1].x, t[h + 1].y, t[h + 1].z],
    M0 = [0.03, 0.023, 0.004],
    f0 = [0.0365, 0.076, 0.0015],
    _0 = [t0[0] - p0[0], t0[1] - p0[1], t0[2] - p0[2]],
    F0 = [f0[0] - M0[0], f0[1] - M0[1], f0[2] - M0[2]],
    m0 = (P0) => 0.94 - 0.42 * Math.sin(Math.PI * P0),
    S0 = (P0) => 0.005 + 0.0045 * (2 * P0 - 1) * (2 * P0 - 1);
  function T0(P0, st, J0) {
    for (let q0 = 0; q0 < 3; q0++) {
      let v0 = p0[q0] + _0[q0] * st,
        x0 = M0[q0] + F0[q0] * st;
      J0[q0] = v0 + (x0 - v0) * P0;
    }
    return J0;
  }
  let j0 = [0, 0, 0];
  function Z0(P0, st, J0) {
    let q0 = 0.5,
      v0 = 0.5;
    for (let ht = 0; ht < 3; ht++) {
      let pt = 0,
        V0 = 0,
        c0 = 0,
        Z = 0,
        r0 = 0,
        b0 = [P0, st, J0];
      for (let V = 0; V < 3; V++) {
        let B = p0[V] + _0[V] * v0,
          j = M0[V] + F0[V] * v0,
          s0 = j - B,
          l0 = _0[V] + (F0[V] - _0[V]) * q0,
          E0 = b0[V] - (B + s0 * q0);
        ((pt += s0 * s0),
          (V0 += s0 * l0),
          (c0 += l0 * l0),
          (Z += s0 * E0),
          (r0 += l0 * E0));
      }
      let d0 = pt * c0 - V0 * V0;
      if (Math.abs(d0) < 1e-14) break;
      ((q0 = gi(q0 + (Z * c0 - r0 * V0) / d0, 0, 1)),
        (v0 = gi(v0 + (pt * r0 - V0 * Z) / d0, -0.2, 1.3)));
    }
    T0(q0, v0, j0);
    let x0 = Math.hypot(P0 - j0[0], st - j0[1], J0 - j0[2]),
      C0 = m0(q0),
      k0 = Math.max(0, (v0 - 0.06) / C0),
      O0 = S0(q0),
      B0 = x0 / O0,
      ot = k0 * k0,
      Q0 = Math.sqrt(B0 * B0 + ot * ot),
      nt = 0.045 * C0,
      L0 =
        Math.sqrt((B0 * B0) / (O0 * O0) + (4 * k0 * k0 * ot * ot) / (nt * nt)) /
        (Q0 + 1e-9);
    return (Q0 - 1) / Math.max(L0, 1 / 0.02);
  }
  let lt = (() => {
    let P0 = -1,
      st = 0.6,
      J0 = [0, 0, 0];
    for (let L0 = 0.3; L0 <= 0.92; L0 += 0.01) {
      T0(L0, 0.06 + m0(L0), J0);
      let ht = Math.min(G(J0[0], J0[1], J0[2]), P(A, J0[0], J0[1], J0[2]));
      ht > P0 && ((P0 = ht), (st = L0));
    }
    let q0 = T0(st, 0.06 + m0(st), [0, 0, 0]),
      v0 = 0.01,
      x0 = T0(st - v0, 0.06 + m0(st - v0), [0, 0, 0]),
      C0 = T0(st + v0, 0.06 + m0(st + v0), [0, 0, 0]),
      k0 = [C0[0] - x0[0], C0[1] - x0[1], C0[2] - x0[2]],
      O0 = T0(st, 0.06 + m0(st) - 0.1, [0, 0, 0]),
      B0 = [q0[0] - O0[0], q0[1] - O0[1], q0[2] - O0[2]],
      ot = [
        k0[1] * B0[2] - k0[2] * B0[1],
        k0[2] * B0[0] - k0[0] * B0[2],
        k0[0] * B0[1] - k0[1] * B0[0],
      ],
      Q0 = Math.hypot(ot[0], ot[1], ot[2]);
    ((ot = ot.map((L0) => L0 / Q0)), ot[2] < 0 && (ot = ot.map((L0) => -L0)));
    let nt = Math.hypot(B0[0], B0[1], B0[2]);
    return {
      C: q0,
      N: ot,
      out: B0.map((L0) => L0 / nt),
      u: st,
      exposure: P0,
    };
  })();
  function H0(P0, st, J0) {
    let q0 = G(P0, st, J0);
    if (st > 0.05) {
      let v0 = P(L[0], P0, st, J0);
      for (let x0 = 1; x0 < 4; x0++) {
        let C0 = P(L[x0], P0, st, J0);
        C0 < v0 && (v0 = C0);
      }
      if (st < 0.125)
        for (let x0 = 0; x0 < 3; x0++)
          v0 = Kb(v0, e0(n0[x0], P0, st, J0), 0.0025);
      q0 = Kb(q0, v0, 0.0035);
    }
    if (P0 > -0.012 && st > -0.02) {
      let v0 = P(A, P0, st, J0);
      (st < 0.1 && (v0 = Kb(v0, Z0(P0, st, J0), 0.004)),
        (q0 = Kb(q0, v0, 0.007)));
    }
    return q0;
  }
  function Y0(P0, st, J0) {
    let q0 = G(P0, st, J0);
    if (st > 0.05) {
      let v0 = P(L[0], P0, st, J0);
      for (let x0 = 1; x0 < 4; x0++) {
        let C0 = P(L[x0], P0, st, J0);
        C0 < v0 && (v0 = C0);
      }
      q0 = Kb(q0, v0, 0.0035);
    }
    return (
      P0 > -0.012 &&
        st > -0.02 &&
        st < 0.1 &&
        (q0 = Math.min(q0, Z0(P0, st, J0))),
      q0
    );
  }
  function et(P0, st, J0, q0) {
    let x0 = 0,
      C0 = J0;
    for (let O0 = 0.002; O0 <= J0; O0 += 0.002)
      if (H0(P0[0] + st[0] * O0, P0[1] + st[1] * O0, P0[2] + st[2] * O0) > 0) {
        ((C0 = O0), (x0 = O0 - 0.002));
        break;
      }
    if (C0 < J0)
      for (let O0 = 0; O0 < 12; O0++) {
        let B0 = (x0 + C0) * 0.5;
        H0(P0[0] + st[0] * B0, P0[1] + st[1] * B0, P0[2] + st[2] * B0) > 0
          ? (C0 = B0)
          : (x0 = B0);
      }
    let k0 = (x0 + C0) * 0.5;
    return (
      (q0[0] = P0[0] + st[0] * k0),
      (q0[1] = P0[1] + st[1] * k0),
      (q0[2] = P0[2] + st[2] * k0),
      k0
    );
  }
  let ct = 15e-5;
  function D0(P0, st, J0, q0) {
    let v0 = H0(P0, st, J0);
    return (
      (q0[0] = (H0(P0 + ct, st, J0) - v0) / ct),
      (q0[1] = (H0(P0, st + ct, J0) - v0) / ct),
      (q0[2] = (H0(P0, st, J0 + ct) - v0) / ct),
      v0
    );
  }
  let u0 = [0, 0, 0];
  function w0(P0, st = 3, J0 = 0.004) {
    let q0 = 0;
    for (let v0 = 0; v0 < st; v0++) {
      q0 = D0(P0[0], P0[1], P0[2], u0);
      let x0 = u0[0] * u0[0] + u0[1] * u0[1] + u0[2] * u0[2];
      if (x0 < 1e-10) break;
      let C0 = q0 / x0,
        k0 = Math.abs(C0) * Math.sqrt(x0);
      if (
        (k0 > J0 && (C0 *= J0 / k0),
        (P0[0] -= C0 * u0[0]),
        (P0[1] -= C0 * u0[1]),
        (P0[2] -= C0 * u0[2]),
        Math.abs(q0) < 2e-6)
      )
        break;
    }
    return q0;
  }
  return {
    digits: L,
    thumb: A,
    wedges: n0,
    web: lt,
    U: H0,
    restF: Y0,
    rayExit: et,
    grad: D0,
    project: w0,
    palmF: G,
    palmPoint: K,
    palmPhi: $,
    digitF: P,
    digitPoint: O,
    digitLocal: F,
    webF: Z0,
    pW: p,
    pXc: x,
    pH: g,
    pE: b,
    kY: v,
    kZ: y,
    prof: () => [M, w, T],
  };
}
var Q2 = Math.PI * 2;
var Ur = -0.079;
var lE = [
  [-0.04, 0.03, 0.0194],
  [-0.054, 0.0304, 0.02],
  [-0.064, 0.0318, 0.0222],
  [-0.088, 0.0345, 0.0262],
  [-0.1, 0.0372, 0.0296],
  [-0.13, 0.0412, 0.0342],
  [-0.165, 0.0462, 0.0398],
  [-0.2, 0.05, 0.044],
  [-0.235, 0.0492, 0.0446],
  [-0.27, 0.047, 0.0452],
  [-0.3, 0.0486, 0.047],
  [-0.36, 0.054, 0.052],
  [-0.6, 0.058, 0.056],
];
function _R(o) {
  let t = 0;
  for (; t < lE.length - 2 && o < lE[t + 1][0];) t++;
  let e = lE[t],
    s = lE[t + 1],
    n = gi((o - e[0]) / (s[0] - e[0]), 0, 1),
    i = n * n * (3 - 2 * n);
  return [ys(e[1], s[1], i), ys(e[2], s[2], i)];
}
function BZ(o, t, e) {
  let s = o - 4.71;
  s -= Q2 * Math.round(s / Q2);
  let n = Math.abs(s) * 0.05 - 0.056,
    i = Math.abs(t + e + 0.012) - 0.072,
    a = 0.022;
  return -(
    Math.hypot(Math.max(n + a, 0), Math.max(i + a, 0)) +
    Math.min(Math.max(n, i) + a, 0) -
    a
  );
}
function UZ(o) {
  let t = createNoise(4411),
    e = o.FORE_LEN,
    s = (r) => 1 - 2 * Math.pow(0.5 - 0.5 * Math.sin(r), 1.7),
    n = (r) => {
      let l = 0.5 + 0.5 * Math.sin(r);
      return Math.pow(l, 1.6) - 0.42;
    };
  function i(r, l) {
    if (l > Ur + 0.001) return 6e-4 * os(Ur + 0.006, Ur + 0.001, l);
    let c = gi(-l / e, 0, 2.2),
      h = r / Q2,
      f = t.fbm(h * 5, c * 6 + 3.1, 3, 5) - 0.5,
      u = t.fbm(h * 9 + 4.2, c * 11, 2, 9) - 0.5,
      d = t.fbm(h * 3 + 1.7, c * 3.5 + 9.2, 2, 3) - 0.5,
      m = 0.5 + 0.5 * Math.sin(r),
      p = 0,
      x = os(Ur, Ur - 0.008, l) * (1 - os(-0.104, -0.135, l));
    p +=
      x *
      (0.0034 * s(r * 9 + 5 * d + l * 60) * (0.45 + 1.1 * (0.5 + u)) +
        0.005 * (0.6 + f));
    let g = os(-0.098, -0.132, l) * (1 - os(-0.212, -0.25, l));
    p +=
      g *
      (0.0058 * s(r * 4 + l * 26 + 7.5 * d) * (0.3 + 1.25 * os(-0.22, 0.3, f)) +
        0.0024 * s(r * 9 - l * 70 + 10 * u) * (0.5 + d));
    let b = xo(l + e + 0.004, 0.058);
    return (
      (p +=
        b *
        (0.0105 *
          n(l * 215 + 3.4 * f + Math.cos(r) * 1.3) *
          (0.1 + 0.9 * Math.pow(m, 1.3)) +
          0.005 * m -
          0.0012 * (1 - m))),
      (p +=
        os(-e - 0.045, -e - 0.11, l) *
        (0.0068 * s(r * 3 + l * 34 + 6 * d) * (0.4 + 0.9 * (0.5 + f)) + 0.004)),
      (p +=
        os(Ur - 0.002, -0.12, l) *
        (0.0026 + 0.0034 * u + 0.0015 * (t.fbm(h * 22, c * 30, 2, 22) - 0.5))),
      p
    );
  }
  function a(r, l, c) {
    let h = _R(l),
      f = Math.cos(r),
      u = Math.sin(r),
      d =
        0.004 * xo(l + 0.19, 0.08) * Math.max(0, u) +
        0.0075 * xo(l + e + 0.006, 0.026) * Math.pow(Math.max(0, -u), 2.5),
      m = i(r, l),
      p = f / h[0],
      x = u / h[1],
      g = Math.hypot(p, x);
    return (
      (c[0] = h[0] * f + (p / g) * m),
      (c[1] = l),
      (c[2] = (h[1] + d) * u + (x / g) * m),
      (c[3] = m),
      c
    );
  }
  return {
    point: a,
    fold: i,
    radii: _R,
  };
}
function KI(o, t, e, s) {
  let { JOINT_TWIST: n, JOINT_ELBOW: i, CHART: a, BONE: r, layout: l } = s,
    c = UZ(o),
    h = o.FORE_LEN,
    f = e.sleeveSeg || 48,
    u = t.chart.length,
    d = [];
  {
    let f0 = -0.04,
      _0 = [
        [-0.052, 0.006],
        [Ur + 0.008, 0.0095],
        [Ur + 0.0015, 0.0045],
        [Ur - 0.004, 0.0022],
        [-0.205, 0.005],
        [-0.365, 0.006],
        [-0.6, 0.015],
      ];
    for (; f0 > -0.6;) {
      d.push(f0);
      let F0 = 0.03;
      for (let [m0, S0] of _0)
        if (f0 > m0) {
          F0 = S0;
          break;
        }
      f0 -= F0;
    }
    d.push(-0.6);
  }
  let m = 2.35,
    p = [0, 0, 0, 0],
    x = [0, 0, 0, 0],
    g = [0, 0, 0, 0],
    b = [0, 0, 0],
    v = (f0) => (f0 > Ur ? 1 : gi(1 - (Ur - f0) / (h + Ur), 0, 1)),
    y = (f0, _0, F0, m0, S0, T0, j0, Z0, lt, H0 = 0, Y0 = 0, et = 0) => (
      t.pos.push(f0[0], f0[1], f0[2]),
      t.nor.push(_0[0], _0[1], _0[2]),
      t.uv.push(F0, m0),
      t.col.push(S0, T0, H0, Y0),
      t.si.push(j0, 0, 0, 0),
      t.sw.push(1, 0, 0, 0),
      t.bend.push(Z0 == null ? 0 : n, Z0 ?? 0, i, et),
      t.bend2.push(0, 0),
      t.aux.push(0, 0, 0, 0),
      t.flank && t.flank.push(0, 0),
      t.chart.push(lt),
      t.chart.length - 1
    );
  for (let f0 = 0; f0 < d.length; f0++) {
    let _0 = d[f0],
      F0 = 0;
    for (let m0 = 0; m0 <= f; m0++) {
      let S0 = m + (Q2 * m0) / f;
      c.point(S0, _0, p);
      let T0 =
        ((m0 === 0 || m0 === f) && _0 < Ur ? 0.001 : 0) +
        0.0011 * xo(_0 - Ur, 0.0022);
      (c.point(S0 + 0.02, _0, x), c.point(S0, _0 + 0.002, g));
      let j0 = x[0] - p[0],
        Z0 = x[1] - p[1],
        lt = x[2] - p[2],
        H0 = g[0] - p[0],
        Y0 = g[1] - p[1],
        et = g[2] - p[2],
        ct = Z0 * et - lt * Y0,
        D0 = lt * H0 - j0 * et,
        u0 = j0 * Y0 - Z0 * H0,
        w0 = Math.hypot(ct, D0, u0) || 1;
      ((ct /= w0),
        (D0 /= w0),
        (u0 /= w0),
        ct * p[0] + u0 * p[2] < 0 && ((ct = -ct), (D0 = -D0), (u0 = -u0)),
        m0 > 0 && (F0 += Math.hypot(p[0] - b[0], p[2] - b[2])),
        (b[0] = p[0]),
        (b[2] = p[2]));
      let P0 = _0 > Ur ? 0.9 : gi(0.74 + 62 * (p[3] - 0.0062), 0.3, 1);
      P0 *=
        (0.22 + 0.78 * os(-0.049, -0.066, _0)) *
        (1 - 0.35 * xo(Math.abs(_0 - Ur) - 0.0032, 0.0014));
      let st = BZ(S0, _0, h),
        J0 = 9e-4 * os(-4e-4, 0.001, st);
      ((m0 === 0 || m0 === f) && _0 < Ur && (P0 *= 0.8),
        y(
          [p[0] + ct * (T0 + J0), p[1] + D0 * (T0 + J0), p[2] + u0 * (T0 + J0)],
          [ct, D0, u0],
          F0,
          -_0,
          P0,
          1,
          r.F0,
          v(_0),
          a.SLEEVE,
          gi(0.5 + st / 0.04, 0, 1),
          _0 > Ur ? 1 : 0,
          os(-h + 0.055, -h - 0.07, _0),
        ));
    }
  }
  for (let f0 = 0; f0 + 1 < d.length; f0++)
    for (let _0 = 0; _0 < f; _0++) {
      let F0 = u + f0 * (f + 1) + _0,
        m0 = F0 + 1,
        S0 = F0 + f + 1,
        T0 = S0 + 1;
      t.idx.push(F0, m0, S0, m0, T0, S0);
    }
  let M = (d.length - 1) * f * 2,
    w = t.idx.length,
    T = l.SZ,
    S = l.freeY + 6,
    E = T - S - 6,
    _ = {
      cx: 14 + E / 2,
      cy: S + E / 2,
      k: E / 2 / 1.78,
    },
    R = {
      x0: 14 + E + 16,
      y0: S,
      w: 420,
      h: 70,
    },
    C = {
      x0: R.x0 + R.w + 16,
      y0: S,
      s: 44,
    },
    L = (f0, _0) => [f0 / T, 1 - _0 / T],
    A = -0.0665,
    O = 0.0105,
    H = (f0, _0, F0) => {
      c.point(f0, _0, F0);
      let m0 = _R(_0),
        S0 = Math.cos(f0) / m0[0],
        T0 = Math.sin(f0) / m0[1],
        j0 = Math.hypot(S0, T0);
      return ((F0[4] = S0 / j0), (F0[5] = T0 / j0), F0);
    },
    F = [0, 0, 0, 0, 0, 0],
    P = 30,
    z = [
      [-O, 4e-4, 0],
      [-O + 0.0014, 0.0019, 0.06],
      [O - 0.0014, 0.0019, 0.94],
      [O, 4e-4, 1],
    ],
    k = t.chart.length,
    I = 0,
    G = [0, 0];
  for (let f0 = 0; f0 <= P; f0++) {
    let _0 = (Q2 * f0) / P;
    (H(_0, A, F),
      f0 && (I += Math.hypot(F[0] - G[0], F[2] - G[1])),
      (G[0] = F[0]),
      (G[1] = F[2]));
    let F0 = I / 0.068,
      m0 = Math.abs((((F0 % 2) + 2) % 2) - 1);
    for (let S0 = 0; S0 < 4; S0++) {
      H(_0, A + z[S0][0], F);
      let T0 = z[S0][1],
        j0 = S0 === 0 ? -0.75 : S0 === 3 ? 0.75 : 0,
        Z0 = Math.hypot(1, j0),
        [lt, H0] = L(
          R.x0 + 3 + m0 * (R.w - 6),
          R.y0 + 3 + z[S0][2] * (R.h - 6),
        );
      y(
        [F[0] + F[4] * T0, F[1], F[2] + F[5] * T0],
        [F[4] / Z0, j0 / Z0, F[5] / Z0],
        lt,
        H0,
        S0 === 0 || S0 === 3 ? 0.55 : 0.95,
        0,
        r.F2,
        null,
        a.WATCH,
      );
    }
  }
  for (let f0 = 0; f0 < P; f0++)
    for (let _0 = 0; _0 < 3; _0++) {
      let F0 = k + f0 * 4 + _0,
        m0 = F0 + 4;
      t.idx.push(F0, m0, F0 + 1, F0 + 1, m0, m0 + 1);
    }
  H(Math.PI / 2, A, F);
  let K = F[2] + 0.0017,
    $ = 0.0218,
    n0 = 0.0228,
    e0 = 16,
    p0 = (f0, _0) => {
      let F0 = (Q2 * f0) / e0 + Q2 / 32,
        m0 = Math.cos(F0),
        S0 = Math.sin(F0),
        T0 = 0.62;
      return [
        $ * _0 * Math.sign(m0) * Math.pow(Math.abs(m0), T0),
        n0 * _0 * Math.sign(S0) * Math.pow(Math.abs(S0), T0),
      ];
    },
    t0 = [
      [1, -0.0075, 1.78],
      [1, 0.0086, 1],
      [0.9, 0.0116, 0.9],
      [0.775, 0.0124, 0.775],
      [0.7, 0.0113, 0.7],
    ],
    M0 = (f0, _0) => {
      let [F0, m0, S0] = t0[f0],
        [T0, j0] = p0(_0, F0),
        [Z0, lt] = p0(_0, S0);
      return {
        p: [T0, A + j0, K + m0],
        uv: L(_.cx + (lt / $) * _.k, _.cy - (Z0 / $) * _.k),
      };
    };
  for (let f0 = 0; f0 + 1 < t0.length; f0++) {
    let _0 = t.chart.length;
    for (let F0 = 0; F0 <= e0; F0++)
      for (let m0 of [f0, f0 + 1]) {
        let S0 = M0(m0, F0 % e0),
          T0 = M0(f0, F0 % e0),
          j0 = M0(f0 + 1, F0 % e0),
          Z0 = M0(f0, (F0 + 1) % e0),
          lt = Z0.p[0] - T0.p[0],
          H0 = Z0.p[1] - T0.p[1],
          Y0 = Z0.p[2] - T0.p[2],
          et = j0.p[0] - T0.p[0],
          ct = j0.p[1] - T0.p[1],
          D0 = j0.p[2] - T0.p[2],
          u0 = H0 * D0 - Y0 * ct,
          w0 = Y0 * et - lt * D0,
          P0 = lt * ct - H0 * et,
          st = Math.hypot(u0, w0, P0) || 1;
        ((u0 /= st),
          (w0 /= st),
          (P0 /= st),
          u0 * S0.p[0] + w0 * (S0.p[1] - A) + P0 * 0.6 < 0 &&
            ((u0 = -u0), (w0 = -w0), (P0 = -P0)),
          y(
            S0.p,
            [u0, w0, P0],
            S0.uv[0],
            S0.uv[1],
            f0 === 0 ? (m0 === 0 ? 0.4 : 0.85) : f0 === 3 ? 0.75 : 1,
            0,
            r.F2,
            null,
            a.WATCH,
          ));
      }
    for (let F0 = 0; F0 < e0; F0++) {
      let m0 = _0 + F0 * 2,
        S0 = m0 + 2;
      t.idx.push(m0, S0, m0 + 1, m0 + 1, S0, S0 + 1);
    }
  }
  {
    let f0 = t.chart.length,
      _0 = t0.length - 1;
    for (let S0 = 0; S0 < e0; S0++) {
      let T0 = M0(_0, S0);
      y(T0.p, [0, 0, 1], T0.uv[0], T0.uv[1], 0.9, 0, r.F2, null, a.WATCH);
    }
    let F0 = L(_.cx, _.cy),
      m0 = y(
        [0, A, K + t0[_0][1]],
        [0, 0, 1],
        F0[0],
        F0[1],
        1,
        0,
        r.F2,
        null,
        a.WATCH,
      );
    for (let S0 = 0; S0 < e0; S0++)
      t.idx.push(f0 + S0, f0 + ((S0 + 1) % e0), m0);
  }
  for (let [f0, _0] of [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]) {
    let F0 = f0 * 0.0098,
      m0 = A + _0 * (n0 + 0.0012),
      S0 = K + 0.0048,
      T0 = 0.0034,
      j0 = 0.0018,
      Z0 = 0.0022,
      lt = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ],
      H0 = [
        [0, 1, 2, 3, 0, 0, -1],
        [4, 5, 6, 7, 0, 0, 1],
        [0, 1, 5, 4, 0, -1, 0],
        [1, 2, 6, 5, 1, 0, 0],
        [0, 3, 7, 4, -1, 0, 0],
      ].filter((Y0) => Y0[5] !== -_0);
    for (let Y0 of H0) {
      let et = t.chart.length;
      for (let ct = 0; ct < 4; ct++) {
        let D0 = lt[Y0[ct]],
          [u0, w0] = L(
            C.x0 + 4 + (ct === 1 || ct === 2 ? 1 : 0) * (C.s - 8),
            C.y0 + 4 + (ct >= 2 ? 1 : 0) * (C.s - 8),
          );
        y(
          [F0 + D0[0] * T0, m0 + D0[1] * j0, S0 + D0[2] * Z0],
          [Y0[4], Y0[5], Y0[6]],
          u0,
          w0,
          0.8,
          0,
          r.F2,
          null,
          a.WATCH,
        );
      }
      t.idx.push(et, et + 1, et + 2, et, et + 2, et + 3);
    }
  }
  for (let f0 = w; f0 < t.idx.length; f0 += 3) {
    let _0 = t.idx[f0],
      F0 = t.idx[f0 + 1],
      m0 = t.idx[f0 + 2],
      S0 = t.pos,
      T0 = t.nor,
      j0 = S0[F0 * 3] - S0[_0 * 3],
      Z0 = S0[F0 * 3 + 1] - S0[_0 * 3 + 1],
      lt = S0[F0 * 3 + 2] - S0[_0 * 3 + 2],
      H0 = S0[m0 * 3] - S0[_0 * 3],
      Y0 = S0[m0 * 3 + 1] - S0[_0 * 3 + 1],
      et = S0[m0 * 3 + 2] - S0[_0 * 3 + 2],
      ct = Z0 * et - lt * Y0,
      D0 = lt * H0 - j0 * et,
      u0 = j0 * Y0 - Z0 * H0;
    ct * T0[_0 * 3] + D0 * T0[_0 * 3 + 1] + u0 * T0[_0 * 3 + 2] < 0 &&
      ((t.idx[f0 + 1] = m0), (t.idx[f0 + 2] = F0));
  }
  return {
    tris: M,
    rings: d.length,
    watchTris: (t.idx.length - w) / 3,
    watch: {
      FACE: _,
      STRAP: R,
      BTN: C,
      A: $,
      B: n0,
      rings: t0,
    },
  };
}
var SR = null;
function XI() {
  if (SR) return SR;
  let o = createRandom(90210),
    t = new Uint8Array(64 * 64 * 4);
  for (let h = 0; h < t.length; h++) t[h] = Math.floor(o() * 256);
  let e = new DataTexture(t, 64, 64, RGBAFormat);
  ((e.wrapS = e.wrapT = RepeatWrapping),
    (e.magFilter = e.minFilter = LinearFilter),
    (e.generateMipmaps = !1),
    (e.needsUpdate = !0));
  let s = 256,
    n = new Float32Array(s * s),
    i = new Float32Array(s * s),
    a = createNoise(311);
  for (let h = 0; h < s; h++)
    for (let f = 0; f < s; f++) {
      let u = f % 64,
        d = h % 64;
      n[h * s + f] =
        0.3 * Math.sin((Q2 * (f + h)) / 8) +
        0.22 * Math.sin((Q2 * f) / 4) * Math.sin((Q2 * h) / 4) +
        0.85 *
          Math.max(
            Math.max(0, 1 - Math.abs(u - 3) / 2.6),
            Math.max(0, 1 - Math.abs(d - 3) / 2.6),
          );
      let m = f / s,
        p = h / s,
        x = a.fbm(m * 6, p * 6, 4, 6),
        g = a.fbm(m * 12 + 5.3, p * 12 + 1.7, 3, 12);
      i[h * s + f] = 5.5 * (1 - Math.abs(2 * x - 1)) + 2.2 * g;
    }
  let r = new Uint8Array(s * s * 4),
    l = (h) => (h < 0 ? 0 : h > 255 ? 255 : h);
  for (let h = 0; h < s; h++)
    for (let f = 0; f < s; f++) {
      let u = h * s + f,
        d = h * s + ((f + 1) % s),
        m = h * s + ((f + s - 1) % s),
        p = ((h + 1) % s) * s + f,
        x = ((h + s - 1) % s) * s + f;
      ((r[u * 4] = l(128 - (n[d] - n[m]) * 0.9 * 127)),
        (r[u * 4 + 1] = l(128 - (n[p] - n[x]) * 0.9 * 127)),
        (r[u * 4 + 2] = l(128 - (i[d] - i[m]) * 0.75 * 127)),
        (r[u * 4 + 3] = l(128 - (i[p] - i[x]) * 0.75 * 127)));
    }
  let c = new DataTexture(r, s, s, RGBAFormat);
  return (
    (c.wrapS = c.wrapT = RepeatWrapping),
    (c.generateMipmaps = !0),
    (c.minFilter = LinearMipmapLinearFilter),
    (c.magFilter = LinearFilter),
    (c.anisotropy = 8),
    (c.needsUpdate = !0),
    (SR = {
      noise: e,
      weave: c,
    })
  );
}
var VZ = Math.PI * 2;
var fh = Math.PI / 180;
var cE = [
  "guard",
  "crown",
  "groove",
  "strap",
  "tab",
  "heel",
  "saddle",
  "loop",
  "side",
  "x",
  "y",
  "v",
  "ang",
  "nz",
];
function YI(o, t) {
  let e = o.F_MCP.map((l) => l[0]),
    s = t.thumb,
    n = [0.033, 0.055, 0.009],
    i = [
      s.M[0] + s.Y[0] * 0.022 + s.Z[0] * 0.012,
      s.M[1] + s.Y[1] * 0.022 + s.Z[1] * 0.012,
      s.M[2] + s.Y[2] * 0.022 + s.Z[2] * 0.012,
    ];
  function a(l, c, h) {
    let f = l[0],
      u = l[1],
      d = l[2],
      m = u - t.kY(f),
      p = Math.atan2(d, f),
      x = p < 0 ? p + VZ : p;
    if (
      ((h.x = f),
      (h.y = u),
      (h.v = m),
      (h.ang = x),
      (h.nz = c[2]),
      (h.guard = 0),
      (h.crown = 0),
      (h.groove = 0),
      c[2] < -0.12 && u > 0.04)
    ) {
      let y = -0.0225 + 0.0045 * Math.pow(Math.abs(f + 0.002) / 0.04, 2),
        M = 0.0052;
      h.guard =
        os(-0.12, -0.55, c[2]) *
        os(-0.0425, -0.0425 + 0.005, f) *
        os(0.0395, 0.0395 - 0.005, f) *
        os(y, y + 0.005, m) *
        os(M, M - 0.005 * 0.9, m);
      for (let w = 0; w < 4; w++)
        h.crown += xo(f - e[w], 0.0068) * xo(m + 0.004, 0.0085);
      for (let w = 0; w < 3; w++)
        h.groove +=
          xo(f - (e[w] + e[w + 1]) * 0.5, 0.0017) * os(y + 0.004, y + 0.01, m);
    }
    if (
      ((h.strap = 0),
      (h.tab = 0),
      (h.loop = 0),
      u < -0.002 &&
        u > -0.03 &&
        ((h.strap =
          os(-0.0268, -0.025, u) *
          os(-0.0046, -0.0064, u) *
          os(188 * fh, 200 * fh, x) *
          os(352 * fh, 340 * fh, x)),
        (h.tab =
          os(-0.0285, -0.0262, u) *
          os(-0.003, -0.0054, u) *
          os(300 * fh, 307 * fh, x) *
          os(346 * fh, 339 * fh, x))),
      u < -0.024 &&
        (h.loop =
          os(-0.052, -0.05, u) *
          os(-0.0262, -0.0282, u) *
          os(77 * fh, 81 * fh, x) *
          os(103 * fh, 99 * fh, x)),
      (h.heel = 0),
      c[2] > 0.05 && u > -0.002 && u < 0.05)
    ) {
      let v = Math.pow(
        Math.pow(Math.abs(f + 0.0135) / 0.0215, 4) +
          Math.pow(Math.abs(u - 0.0235) / 0.02, 4),
        0.25,
      );
      h.heel = os(0.05, 0.4, c[2]) * (1 - os(0.86, 1, v));
    }
    let g = Math.hypot(f - n[0], u - n[1], d - n[2]),
      b = Math.hypot(f - i[0], u - i[1], d - i[2]);
    if (
      ((h.saddle =
        (1 - os(0.02, 0.023, g + 0.25 * Math.abs(b - g) * 0)) *
        os(-0.0065, -0.0015, d) *
        os(0.004, 0.01, u)),
      (h.side = 0),
      u > -0.006 && u < 0.085)
    ) {
      let v = 0.0165 + 0.0125 * os(0, 0.07, u) + 0.004 * Math.sin(u * 38);
      h.side =
        os(v - 0.0012, v + 0.0012, Math.abs(f + 0.0015)) *
        os(-0.0062, -0.0042, u) *
        (h.guard > 0.3 ? 0 : 1) *
        os(
          0.004,
          0,
          m + 0.021 - 0.0045 * Math.pow(Math.abs(f + 0.002) / 0.04, 2),
        );
    }
    return h;
  }
  return {
    fields: a,
    thickness: (l) =>
      l.guard * (0.0019 + 7e-4 * l.crown - 9e-4 * l.groove) +
      0.0013 * l.strap +
      0.0012 * l.tab +
      7e-4 * l.heel +
      5e-4 * l.saddle +
      0.0011 * l.loop,
    setWeb: (l) => {
      ((n[0] = l[0]), (n[1] = l[1]), (n[2] = l[2]));
    },
    web: n,
  };
}
var hE = Math.PI * 2;
var a5 = Math.PI / 180;
var Xb = () => (typeof performance < "u" ? performance.now() : Date.now());
var Wg = 0;
var qg = 17;
var ep = 18;
var r5 = 19;
var Kg = 20;
var ss = {
  BACK: 0,
  PALM: 1,
  THUMB: 2,
  F0: 3,
  F1: 4,
  F2: 5,
  F3: 6,
  SLEEVE: 7,
  WATCH: 8,
};
function fE(o, t, e, s, n) {
  let a = [0],
    r = [o],
    l = s * Math.cos(o),
    c = n * Math.sin(o);
  for (let u = 1; u <= 128; u++) {
    let d = o + ((t - o) * u) / 128,
      m = s * Math.cos(d),
      p = n * Math.sin(d);
    (a.push(a[u - 1] + Math.hypot(m - l, p - c)), r.push(d), (l = m), (c = p));
  }
  let h = [],
    f = 0;
  for (let u = 0; u <= e; u++) {
    let d = (a[128] * u) / e;
    for (; f < 127 && a[f + 1] < d;) f++;
    h.push(ys(r[f], r[f + 1], gi((d - a[f]) / (a[f + 1] - a[f]), 0, 1)));
  }
  return h;
}
function GZ(o, t, e) {
  let s = [];
  for (let p = 0; p < 7; p++) s.push([1e9, 1e9, -1e9, -1e9]);
  let n = new Float32Array(t * 2);
  for (let p = 0; p < t; p++) {
    let x = o.uv[p * 2] * 1e3,
      g = o.uv[p * 2 + 1] * 1e3,
      b = s[o.chart[p]];
    ((n[p * 2] = x),
      (n[p * 2 + 1] = g),
      x < b[0] && (b[0] = x),
      g < b[1] && (b[1] = g),
      x > b[2] && (b[2] = x),
      g > b[3] && (b[3] = g));
  }
  let i = 3.5,
    a = [
      [ss.BACK, ss.PALM, ss.THUMB],
      [ss.F0, ss.F1, ss.F2, ss.F3],
    ],
    r = (p) => s[p][2] - s[p][0],
    l = (p) => s[p][3] - s[p][1],
    c = a.map((p) => p.reduce((x, g) => x + r(g) + i, i)),
    h = a.map((p) => Math.max(...p.map(l))),
    u = Math.min(e / Math.max(...c), e / (h[0] + h[1] + 3 * i + 40)),
    d = [],
    m = i * u;
  a.forEach((p, x) => {
    let g = i * u;
    for (let b of p)
      ((d[b] = {
        u0: s[b][0],
        v0: s[b][1],
        u1: s[b][2],
        v1: s[b][3],
        ox: g,
        oy: m,
        S: u,
      }),
        (g += (r(b) + i) * u));
    m += (h[x] + i) * u;
  });
  for (let p = 0; p < t; p++) {
    let x = d[o.chart[p]],
      g = x.ox + (n[p * 2] - x.u0) * u,
      b = x.oy + (x.v1 - n[p * 2 + 1]) * u;
    ((o.uv[p * 2] = g / e), (o.uv[p * 2 + 1] = 1 - b / e));
  }
  return {
    SZ: e,
    S: u,
    charts: d,
    cuv: n,
    freeY: m,
    pad: i,
  };
}
function jI(o, t = {}) {
  let e = Xb(),
    s = qI(o),
    { digits: n, thumb: i } = s,
    { BONE: a, BW_P: r, PY: l, F_MCP: c } = o,
    h = t.nd || 9,
    f = 3,
    u = 2 * h + 2 * f,
    d = 1,
    m = d + h,
    p = m + f,
    x = p + h,
    g = (W0) => ((W0 + 0.5) * hE) / u,
    b = [0, 0, 0],
    v = [0, 0, 0],
    y = [],
    M = [],
    w = [],
    T = [],
    S = [],
    E = (W0, Tt, kt = -1, Wt = 0) => {
      let $t = M.length;
      return (
        y.push(W0[0], W0[1], W0[2]),
        M.push(Tt ? 1 : 0),
        w.push(kt),
        T.push(Wt),
        S.push(0),
        $t
      );
    },
    _ = (W0, Tt) => (
      (Tt[0] = y[W0 * 3]),
      (Tt[1] = y[W0 * 3 + 1]),
      (Tt[2] = y[W0 * 3 + 2]),
      Tt
    ),
    R = (W0, Tt) => {
      ((y[W0 * 3] = Tt[0]), (y[W0 * 3 + 1] = Tt[1]), (y[W0 * 3 + 2] = Tt[2]));
    };
  function C(W0, Tt) {
    let kt = [],
      Wt = Tt;
    for (; Wt < W0.Lb - 0.0012;) {
      kt.push(Wt);
      let $t = 1;
      for (let le = 1; le < 3; le++)
        $t = Math.min($t, Math.abs(Wt - W0.joints[le]));
      Wt += 0.0023 + 0.003 * os(0.0035, 0.012, $t);
    }
    for (let $t of [10, 26, 42, 57, 71, 83])
      kt.push(W0.Lb + W0.tip * Math.sin($t * a5));
    return kt;
  }
  let L = (W0) => Math.pow(W0.L[0] / 0.045, 0.7),
    A = (W0, Tt) => L(W0) * ys(0.0085, 0.0155, 0.5 + 0.5 * Math.sin(Tt)),
    O = (W0) => 0.026 * L(W0),
    H = 6,
    F = 5,
    P = [];
  for (let W0 = 0; W0 < 4; W0++) P.push(new Int32Array(u).fill(-1));
  for (let W0 = 0; W0 < 4; W0++)
    for (let Tt = 0; Tt < u; Tt++) {
      let kt = n[W0],
        Wt = g(Tt);
      if ((s.digitPoint(kt, A(kt, Wt), Wt, b), P[W0][Tt] < 0))
        ((P[W0][Tt] = E(b, !1)),
          W0 < 3 &&
            Tt >= m &&
            Tt <= p &&
            (P[W0 + 1][(d - (Tt - m) + u) % u] = P[W0][Tt]));
      else {
        let $t = P[W0][Tt];
        (_($t, v),
          R($t, [(b[0] + v[0]) / 2, (b[1] + v[1]) / 2, (b[2] + v[2]) / 2]));
      }
    }
  function z(W0, Tt, kt, Wt, $t) {
    let le = [Tt],
      Ut = [null];
    for (let qe = 1; qe < $t; qe++) {
      let Xt = [];
      for (let Ss = 0; Ss < u; Ss++) {
        let Ns = g(Ss);
        (s.digitPoint(W0, ys(kt(Ns, Ss), Wt, qe / $t), Ns, b),
          Xt.push(E(b, !1, W0.id, qe / $t)));
      }
      (le.push(Xt), Ut.push(null));
    }
    for (let qe of C(W0, Wt)) {
      let Xt = [];
      for (let Ss = 0; Ss < u; Ss++)
        (s.digitPoint(W0, qe, g(Ss), b), Xt.push(E(b, !0, W0.id, 1)));
      (le.push(Xt), Ut.push(qe));
    }
    W0.prof(W0.Ltot - 3e-4);
    let Se = s.prof(),
      he = (Se[2] - Se[1]) * 0.5,
      Xe = E(
        [
          W0.M[0] + W0.Y[0] * W0.Ltot + W0.Z[0] * he,
          W0.M[1] + W0.Y[1] * W0.Ltot + W0.Z[1] * he,
          W0.M[2] + W0.Y[2] * W0.Ltot + W0.Z[2] * he,
        ],
        !0,
        W0.id,
        1,
      );
    return {
      d: W0,
      rows: le,
      sOf: Ut,
      pole: Xe,
    };
  }
  let k = [];
  for (let W0 = 0; W0 < 4; W0++)
    k.push(z(n[W0], Array.from(P[W0]), (Tt) => A(n[W0], Tt), O(n[W0]), H));
  let I = [
    {
      f: 0,
      i: u - 1,
      t: "R",
    },
    {
      f: 0,
      i: 0,
      t: "R",
    },
  ];
  for (let W0 = 0; W0 < 4; W0++)
    for (let Tt = W0 === 0 ? d : d + 1; Tt <= m; Tt++)
      I.push({
        f: W0,
        i: Tt,
        t: "P",
      });
  I.push(
    {
      f: 3,
      i: m + 1,
      t: "U",
    },
    {
      f: 3,
      i: m + 2,
      t: "U",
    },
  );
  for (let W0 = 3; W0 >= 0; W0--)
    for (let Tt = W0 === 3 ? p : p + 1; Tt <= x; Tt++)
      I.push({
        f: W0,
        i: Tt,
        t: "D",
      });
  let G = I.length,
    K = 2,
    $ = 2 + 4 * h,
    n0 = $ + f,
    e0 = n0 + 4 * h,
    p0 = I.map((W0) => P[W0.f][W0.i]),
    t0 = I.map(
      (W0, Tt) => (
        _(p0[Tt], b),
        W0.t === "P"
          ? s.palmPhi(b[0], l, 1)
          : W0.t === "D"
            ? s.palmPhi(b[0], l, -1)
            : 0
      ),
    );
  {
    let W0 = t0[$],
      Tt = t0[n0];
    ((t0[$ + 1] = ys(W0, Tt, 1 / 3)), (t0[$ + 2] = ys(W0, Tt, 2 / 3)));
  }
  {
    let W0 = t0[e0] - hE,
      Tt = t0[K];
    ((t0[0] = ys(W0, Tt, 1 / 3)), (t0[1] = ys(W0, Tt, 2 / 3)));
  }
  let M0 = new Float64Array(u);
  for (let W0 = 0; W0 < u; W0++) {
    let Tt = g(W0),
      kt = 0;
    for (let Wt = 0.064; Wt >= 0.012; Wt -= 5e-4)
      if ((s.digitPoint(i, Wt, Tt, b), s.restF(b[0], b[1], b[2]) < 0.0012)) {
        kt = Wt;
        break;
      }
    M0[W0] = Math.max(kt + 0.0015, 0.0265);
  }
  for (let W0 = 0; W0 < 8; W0++) {
    let Tt = Array.from(M0);
    for (let kt = 0; kt < u; kt++)
      M0[kt] = Math.max(
        Tt[kt],
        0.25 * Tt[(kt + u - 1) % u] + 0.5 * Tt[kt] + 0.25 * Tt[(kt + 1) % u],
      );
  }
  let f0 = (W0, Tt) => M0[Tt],
    _0 = Math.max(0.056, Math.max(...M0) + 0.012),
    F0 = (W0) => s.digitPoint(i, M0[W0], g(W0), [0, 0, 0]),
    m0 = G - 2,
    S0 = [];
  for (let W0 = p + 1; W0 < u; W0++) S0.push(W0);
  for (let W0 = 0; W0 < m; W0++) S0.push(W0);
  let T0 = m0 + S0.length,
    j0 = m0 - 1,
    Z0 = 0,
    lt = 4 * h,
    H0 = lt + f,
    Y0 = s.pW(-0.03),
    et = s.pH(-0.03),
    ct = new Float64Array(T0);
  {
    let W0 = 76 * a5,
      Tt = 166 * a5,
      kt = 194 * a5,
      Wt = 322 * a5,
      $t = fE(W0, Tt, 4 * h, Y0, et),
      le = fE(Tt, kt, f, Y0, et),
      Ut = fE(kt, Wt, 4 * h, Y0, et),
      Se = fE(Wt, W0 + hE, S0.length + 1, Y0, et);
    for (let he = 0; he <= 4 * h; he++) ct[he] = $t[he];
    for (let he = 1; he < f; he++) ct[4 * h + he] = le[he];
    for (let he = 0; he <= 4 * h; he++) ct[4 * h + f + he] = Ut[he];
    for (let he = 1; he <= S0.length; he++) ct[m0 - 1 + he] = Se[he];
  }
  let D0 = [
      [-0.0455, -0.003],
      [-0.05, -0.0024],
      [-0.0514, -6e-4],
      [-0.0503, 9e-4],
      [-0.0466, 0.001],
      [-0.045, 2e-4],
      [-0.038, 0],
      [-0.031, 0],
      [-0.0272, 0],
      [-0.0252, 0],
      [-0.016, 0],
      [-0.0072, 0],
      [-0.005, 0],
    ],
    u0 = (W0) => 0.0013 * os(-0.02, -0.034, W0),
    w0 = [];
  for (let [W0, Tt] of D0) {
    let kt = [];
    for (let Wt = 0; Wt < T0; Wt++) {
      let $t = ct[Wt];
      s.palmPoint($t, W0, b);
      let le = Math.cos($t) / Y0,
        Ut = Math.sin($t) / et,
        Se = Math.hypot(le, Ut),
        he = Tt + u0(W0);
      ((b[0] += (le / Se) * he), (b[2] += (Ut / Se) * he), kt.push(E(b, !0)));
    }
    w0.push(kt);
  }
  let P0 = w0.length,
    st = t.nfree || 8,
    J0 = [];
  for (let W0 = 0; W0 < st; W0++) J0.push(ys(0.003, 0.0505, W0 / (st - 1)));
  let q0 = F0(p),
    v0 = F0(m),
    x0 = (W0) => (W0[1] / s.kY(W0[0])) * l,
    C0 = (() => {
      let W0 = [
        [0.003, 0.007],
        [0.0125, 0.0075],
        [0.022, 0.01],
        [0.0315, 0.015],
        [0.041, 0.0215],
        [0.0505, v0[0] - 0.0015],
      ];
      return (Tt) => {
        let kt = 0;
        for (; kt < W0.length - 2 && Tt > W0[kt + 1][0];) kt++;
        return ys(
          W0[kt][1],
          W0[kt + 1][1],
          gi((Tt - W0[kt][0]) / (W0[kt + 1][0] - W0[kt][0]), 0, 1),
        );
      };
    })(),
    k0 = (W0, Tt, kt) => (ct[W0] - ct[Tt]) / (ct[kt] - ct[Tt]),
    O0 = (W0, Tt, kt) => (t0[W0 + 2] - t0[Tt + 2]) / (t0[kt + 2] - t0[Tt + 2]),
    B0 = s.palmPhi(q0[0], x0(q0), -1);
  for (let W0 = 0; W0 < st; W0++) {
    let Tt = [],
      kt = (W0 + 1) / st,
      Wt = J0[W0],
      $t = Math.pow(kt, 2.5),
      le = s.palmPhi(C0(Wt), Wt, 1),
      Ut = ys(ct[lt], t0[lt + 2], kt),
      Se = ys(ct[H0], t0[H0 + 2], kt),
      he = ys(ct[j0], B0, kt);
    for (let Xe = 0; Xe < m0; Xe++) {
      let qe,
        Xt = Wt;
      (Xe <= lt
        ? ((qe = ys(le, Ut, ys(k0(Xe, 0, lt), O0(Xe, 0, lt), kt))),
          (Xt += (x0(v0) - J0[st - 1]) * $t * Math.exp(-Xe / 5)))
        : Xe < H0
          ? (qe = ys(Ut, Se, (Xe - lt) / f))
          : ((qe = ys(Se, he, ys(k0(Xe, H0, j0), O0(Xe, H0, j0), kt))),
            (Xt += (x0(q0) - J0[st - 1]) * $t * Math.exp(-(j0 - Xe) / 5))),
        s.palmPoint(qe, Xt, b),
        Tt.push(E(b, !1)));
    }
    w0.push(Tt);
  }
  let ot = w0[w0.length - 1];
  (R(ot[j0], q0), R(ot[Z0], v0));
  let Q0 = E(F0(m + 2), !1),
    nt = E(F0(m + 1), !1);
  {
    let W0 = 0;
    for (let Xe of S0) W0 += M0[Xe] / S0.length;
    let Tt = [
        i.M[0] + i.Y[0] * W0 * 0.8,
        i.M[1] + i.Y[1] * W0 * 0.8,
        i.M[2] + i.Y[2] * W0 * 0.8,
      ],
      kt = [0, 0, 0],
      Wt = [0, 0, 0],
      $t = [0, 0, 0],
      le = [0, 0, 0],
      Ut = [0, 0, 0],
      Se = [0, 0, 0],
      he = [0, 0, 0];
    for (let Xe = 0; Xe < st; Xe++) {
      let qe = w0[P0 + Xe],
        Xt = Xe / (st - 1);
      if (Xe === st - 1) {
        for (let bn of S0) qe.push(E(F0(bn), !1));
        continue;
      }
      let Ss = _(qe[j0], b),
        Ns = _(qe[Z0], v),
        ho = Math.pow(Xt, 1.15),
        Ma = (Ss[1] + Ns[1]) * 0.5;
      ((kt[0] = ys(0.013, Tt[0], ho)),
        (kt[1] = ys(Ma, Tt[1], ho * ho)),
        (kt[2] = ys(0.003, Tt[2], ho)),
        (Wt[0] = -i.Y[0] * ho),
        (Wt[1] = ys(-1, -i.Y[1], ho)),
        (Wt[2] = -i.Y[2] * ho));
      {
        let bn = Math.hypot(Wt[0], Wt[1], Wt[2]);
        ((Wt[0] /= bn), (Wt[1] /= bn), (Wt[2] /= bn));
      }
      let sa = 0,
        m1 = 0;
      for (let bn = 0; bn < 3; bn++)
        ((Ut[bn] = Ss[bn] - kt[bn]),
          (Se[bn] = Ns[bn] - kt[bn]),
          (sa += Ut[bn] * Wt[bn]),
          (m1 += Se[bn] * Wt[bn]));
      for (let bn = 0; bn < 3; bn++)
        ((Ut[bn] -= sa * Wt[bn]), (Se[bn] -= m1 * Wt[bn]));
      let Of = Math.hypot(Ut[0], Ut[1], Ut[2]),
        kr = Math.hypot(Se[0], Se[1], Se[2]);
      for (let bn = 0; bn < 3; bn++) $t[bn] = Ut[bn] / Of;
      ((le[0] = Wt[1] * $t[2] - Wt[2] * $t[1]),
        (le[1] = Wt[2] * $t[0] - Wt[0] * $t[2]),
        (le[2] = Wt[0] * $t[1] - Wt[1] * $t[0]));
      let Nf = Math.atan2(
        Se[0] * le[0] + Se[1] * le[1] + Se[2] * le[2],
        Se[0] * $t[0] + Se[1] * $t[1] + Se[2] * $t[2],
      );
      Nf <= 0.05 && (Nf += hE);
      for (let bn = 0; bn < S0.length; bn++) {
        let id = (bn + 1) / (S0.length + 1),
          l3 = Math.cos(id * Nf),
          j7 = Math.sin(id * Nf),
          $7 = ys(sa / Of, m1 / kr, id);
        for (let K1 = 0; K1 < 3; K1++)
          he[K1] = l3 * $t[K1] + j7 * le[K1] + $7 * Wt[K1];
        let $p = Math.hypot(he[0], he[1], he[2]);
        ((he[0] /= $p),
          (he[1] /= $p),
          (he[2] /= $p),
          s.rayExit(kt, he, 0.07, b),
          qe.push(E(b, !1)));
      }
    }
  }
  let L0 = [
      0, 2, 4.1, 6.3, 8.6, 11, 13.6, 16.6, 20.2, 24.6, 30, 36.5, 43.5, 50,
    ],
    ht = L0.length - 1,
    pt = [];
  {
    let W0 = [Q0, nt];
    for (let Tt = 0; Tt < m0; Tt++) W0.push(ot[Tt]);
    pt.push(W0);
  }
  for (let W0 = 1; W0 < ht; W0++) {
    let Tt = [],
      kt = 1 - L0[ht - W0] / L0[ht];
    for (let Wt = 0; Wt < G; Wt++) {
      let $t = _(pt[0][Wt], b),
        le = _(p0[Wt], v);
      Tt.push(
        E(
          [ys($t[0], le[0], kt), ys($t[1], le[1], kt), ys($t[2], le[2], kt)],
          !1,
        ),
      );
    }
    pt.push(Tt);
  }
  pt.push(p0);
  let V0 = new Array(u);
  ((V0[p] = ot[j0]), (V0[m] = ot[Z0]), (V0[m + 1] = nt), (V0[m + 2] = Q0));
  for (let W0 = 0; W0 < S0.length; W0++) V0[S0[W0]] = ot[m0 + W0];
  let c0 = z(i, V0, f0, _0, F),
    Z = [],
    r0 = [],
    b0 = (W0, Tt, kt) => W0 * 1e6 + Tt * 1e3 + kt,
    d0 = 0,
    V = 1,
    B = 2,
    j = 3,
    s0 = 4 * h + 2;
  for (let W0 = 0; W0 + 1 < w0.length; W0++)
    for (let Tt = 0; Tt < T0; Tt++) {
      let kt = (Tt + 1) % T0,
        Wt = Tt < s0 ? ss.PALM : Tt < j0 ? ss.BACK : ss.THUMB;
      Z.push([
        w0[W0][Tt],
        w0[W0][kt],
        w0[W0 + 1][kt],
        w0[W0 + 1][Tt],
        Wt,
        b0(d0, W0, Tt),
        b0(d0, W0, Tt + 1),
        b0(d0, W0 + 1, Tt + 1),
        b0(d0, W0 + 1, Tt),
      ]);
    }
  let l0 = $ + 2;
  for (let W0 = 0; W0 < ht; W0++)
    for (let Tt = 0; Tt < G; Tt++) {
      let kt = (Tt + 1) % G,
        Wt = Tt >= 1 && Tt < l0,
        $t = Wt ? Tt : Tt < 1 ? Tt + G : Tt,
        le = Wt ? ss.PALM : ss.BACK;
      Z.push([
        pt[W0][Tt],
        pt[W0][kt],
        pt[W0 + 1][kt],
        pt[W0 + 1][Tt],
        le,
        b0(V, W0, $t),
        b0(V, W0, $t + 1),
        b0(V, W0 + 1, $t + 1),
        b0(V, W0 + 1, $t),
      ]);
    }
  let E0 = 5,
    U = p;
  function X(W0, Tt, kt, Wt) {
    let $t = W0.rows.length;
    for (let le = 0; le + 1 < $t; le++)
      for (let Ut = 0; Ut < u; Ut++) {
        let Se = (Wt + Ut) % u,
          he = (Se + 1) % u;
        Z.push([
          W0.rows[le][Se],
          W0.rows[le][he],
          W0.rows[le + 1][he],
          W0.rows[le + 1][Se],
          kt,
          b0(Tt, le, Ut),
          b0(Tt, le, Ut + 1),
          b0(Tt, le + 1, Ut + 1),
          b0(Tt, le + 1, Ut),
        ]);
      }
    for (let le = 0; le < u; le++) {
      let Ut = (Wt + le) % u,
        Se = (Ut + 1) % u;
      r0.push([
        W0.rows[$t - 1][Ut],
        W0.rows[$t - 1][Se],
        W0.pole,
        kt,
        b0(Tt, $t - 1, le),
        b0(Tt, $t - 1, le + 1),
        b0(Tt, $t, le),
      ]);
    }
  }
  for (let W0 = 0; W0 < 4; W0++) X(k[W0], j + W0, ss.F0 + W0, E0);
  X(c0, B, ss.THUMB, U);
  let N = M.length,
    q = Array.from(
      {
        length: N,
      },
      () => [],
    ),
    o0 = (W0, Tt) => {
      W0 !== Tt && q[W0].indexOf(Tt) < 0 && (q[W0].push(Tt), q[Tt].push(W0));
    };
  for (let W0 of Z)
    (o0(W0[0], W0[1]), o0(W0[1], W0[2]), o0(W0[2], W0[3]), o0(W0[3], W0[0]));
  for (let W0 of r0) (o0(W0[0], W0[1]), o0(W0[1], W0[2]), o0(W0[2], W0[0]));
  let h0 = [];
  for (let W0 = 0; W0 < N; W0++) M[W0] || h0.push(W0);
  let y0 = new Float64Array(N * 3),
    D = [0, 0, 0],
    W = (W0) => {
      s.grad(y[W0 * 3], y[W0 * 3 + 1], y[W0 * 3 + 2], D);
      let Tt = Math.hypot(D[0], D[1], D[2]) || 1;
      ((y0[W0 * 3] = D[0] / Tt),
        (y0[W0 * 3 + 1] = D[1] / Tt),
        (y0[W0 * 3 + 2] = D[2] / Tt));
    };
  for (let W0 of h0) (_(W0, b), s.project(b, 6, 0.003), R(W0, b));
  {
    let W0 = [],
      Tt = [];
    for (let $t = e0 - h; $t <= e0; $t++) W0.push($t);
    W0.push(0, 1);
    for (let $t = K; $t <= K + h; $t++) W0.push($t);
    for (let $t = $ - h; $t <= n0 + h; $t++) Tt.push($t);
    let kt = [],
      Wt = [];
    for (let $t = 1; $t < ht; $t++) {
      let le = 0.92 * Math.min(1, $t / 2) * Math.min(1, (ht - $t) / 4);
      for (let Ut of [W0, Tt]) {
        ((kt.length = 0), (Wt.length = 0));
        let Se = 0;
        for (let Xe = 0; Xe < Ut.length; Xe++) {
          let qe = _(pt[$t][Ut[Xe]], [0, 0, 0]);
          (Xe &&
            (Se += Math.hypot(
              qe[0] - kt[Xe - 1][0],
              qe[1] - kt[Xe - 1][1],
              qe[2] - kt[Xe - 1][2],
            )),
            kt.push(qe),
            Wt.push(Se));
        }
        let he = 0;
        for (let Xe = 1; Xe < Ut.length - 1; Xe++) {
          let qe = ys(Wt[Xe], (Se * Xe) / (Ut.length - 1), le);
          for (; he < Ut.length - 2 && Wt[he + 1] < qe;) he++;
          let Xt = gi(
              (qe - Wt[he]) / Math.max(1e-9, Wt[he + 1] - Wt[he]),
              0,
              1,
            ),
            Ss = kt[he],
            Ns = kt[he + 1];
          ((b[0] = ys(Ss[0], Ns[0], Xt)),
            (b[1] = ys(Ss[1], Ns[1], Xt)),
            (b[2] = ys(Ss[2], Ns[2], Xt)),
            s.project(b, 4, 0.003),
            R(pt[$t][Ut[Xe]], b));
        }
      }
    }
  }
  for (let W0 of h0) W(W0);
  let Y = q.map((W0, Tt) =>
      W0.map(
        (kt) =>
          1 /
          Math.max(
            2e-4,
            Math.hypot(
              y[kt * 3] - y[Tt * 3],
              y[kt * 3 + 1] - y[Tt * 3 + 1],
              y[kt * 3 + 2] - y[Tt * 3 + 2],
            ),
          ),
      ),
    ),
    R0 = new Float64Array(N * 3),
    U0 = t.iter ?? 9;
  for (let W0 = 0; W0 < U0; W0++) {
    for (let kt of h0) {
      let Wt = 0,
        $t = 0,
        le = 0,
        Ut = 0,
        Se = q[kt],
        he = Y[kt];
      for (let Xe = 0; Xe < Se.length; Xe++) {
        let qe = Se[Xe] * 3;
        ((Wt += y[qe] * he[Xe]),
          ($t += y[qe + 1] * he[Xe]),
          (le += y[qe + 2] * he[Xe]),
          (Ut += he[Xe]));
      }
      ((R0[kt * 3] = ys(y[kt * 3], Wt / Ut, 0.55)),
        (R0[kt * 3 + 1] = ys(y[kt * 3 + 1], $t / Ut, 0.55)),
        (R0[kt * 3 + 2] = ys(y[kt * 3 + 2], le / Ut, 0.55)));
    }
    let Tt = W0 === U0 - 1;
    for (let kt of h0) {
      if (Tt) {
        ((b[0] = R0[kt * 3]),
          (b[1] = R0[kt * 3 + 1]),
          (b[2] = R0[kt * 3 + 2]),
          s.project(b, 3, 0.003),
          R(kt, b));
        continue;
      }
      let Wt = gi(
        s.U(R0[kt * 3], R0[kt * 3 + 1], R0[kt * 3 + 2]),
        -0.003,
        0.003,
      );
      ((y[kt * 3] = R0[kt * 3] - y0[kt * 3] * Wt),
        (y[kt * 3 + 1] = R0[kt * 3 + 1] - y0[kt * 3 + 1] * Wt),
        (y[kt * 3 + 2] = R0[kt * 3 + 2] - y0[kt * 3 + 2] * Wt),
        W0 % 4 === 3 && W(kt));
    }
  }
  let $0 = Xb(),
    g0 = (W0) => (
      (W0 = gi(W0, -1, 1)),
      0.5 + 0.5 * (1.5 * W0 - 0.5 * W0 * W0 * W0)
    );
  function G0(W0, Tt, kt, Wt, $t) {
    let le = 0.5 + 0.5 * Tt,
      Ut = ys(kt, Wt, le),
      Se = $t * le;
    return g0((W0 - Se) / Ut);
  }
  let K0 = {
      mcp: [0.0095, 0.0115, 0.003],
      pip: [0.0062, 0.01, 8e-4],
      dip: [0.005, 0.0078, 5e-4],
      tmcp: [0.0065, 0.0085, 0.0015],
      tip: [0.0058, 0.0085, 5e-4],
    },
    it = new Uint16Array(N * 4),
    ft = new Float32Array(N * 4),
    gt = new Float32Array(N * 4),
    rt = new Float32Array(N * 2),
    dt = new Float32Array(N * 4),
    tt = new Float32Array(N * 4),
    X0 = [0, 0, 0],
    ut = [0, 0, 0, 0],
    z0 = [0, 0, 0, 0],
    I0 = r[o.TH],
    vt = r[o.TH + 1],
    wt = 0,
    _t = (W0) => os(0.028, 0.06, W0);
  function Pt(W0) {
    let Tt = vt.x - I0.x,
      kt = vt.y - I0.y,
      Wt = vt.z - I0.z,
      $t = Tt * Tt + kt * kt + Wt * Wt,
      le = Math.max(
        0,
        ((W0[0] - I0.x) * Tt + (W0[1] - I0.y) * kt + (W0[2] - I0.z) * Wt) / $t,
      ),
      Ut = Math.min(le, 1),
      Se = W0[0] - I0.x - Tt * Ut,
      he = W0[1] - I0.y - kt * Ut,
      Xe = W0[2] - I0.z - Wt * Ut,
      qe =
        le > 1
          ? Math.hypot(
              W0[0] - I0.x - Tt * le,
              W0[1] - I0.y - kt * le,
              W0[2] - I0.z - Wt * le,
            )
          : Math.hypot(Se, he, Xe);
    wt = le;
    let Xt = 1 - os(0.002, 0.012, W0[2]);
    return (
      (1 - os(ys(0.0175, 0.014, Xt), ys(0.036, 0.044, Xt), qe)) *
      os(-0.004, 0.014, W0[1]) *
      os(-0.012, 0.004, W0[0]) *
      (1 - os(0.062, 0.082, W0[1]) * os(0.013, 0.021, qe))
    );
  }
  let bt = (W0) => os(0.01, -0.024, W0),
    Et = new Float32Array(N * 2),
    zt = (W0, Tt, kt, Wt) => {
      Tt === 2
        ? ((rt[W0 * 2] = kt), (rt[W0 * 2 + 1] = Wt))
        : ((gt[W0 * 4 + Tt * 2] = kt), (gt[W0 * 4 + Tt * 2 + 1] = Wt));
    };
  for (let W0 = 0; W0 < N; W0++) {
    _(W0, b);
    let Tt = w[W0],
      kt = T[W0],
      Wt = 0;
    if (
      (Tt === 4 &&
        kt < 1 &&
        ((Wt = ys(Pt(b), 1, Math.pow(kt, 0.75))), Wt > 0.995 && (kt = 1)),
      Tt >= 0 && kt >= 1)
    ) {
      let Xt = n[Tt];
      (s.digitLocal(Xt, b[0], b[1], b[2], X0), Xt.prof(X0[1]));
      let Ss = s.prof(),
        Ns = gi(X0[2] / (X0[2] >= 0 ? Ss[2] : Ss[1]), -1, 1),
        ho = X0[1],
        Ma = Tt === 4 ? [null, K0.tmcp, K0.tip] : [K0.mcp, K0.pip, K0.dip],
        sa = G0(ho - Xt.joints[1], Ns, Ma[1][0], Ma[1][1], Ma[1][2]),
        m1 = G0(ho - Xt.joints[2], Ns, Ma[2][0], Ma[2][1], Ma[2][2]),
        Of = Tt === 4 ? 1 : G0(ho, Ns, Ma[0][0], Ma[0][1], Ma[0][2]),
        kr = [],
        Nf;
      if (Tt === 4) {
        let Fh = _t(ho);
        Fh < 0.999 && kr.push([ep, Fh - 1]);
      }
      if (
        (m1 > 0.5
          ? ((Nf = Xt.j0 + 2), kr.push([Xt.j0 + 2, m1 - 1]))
          : sa > 0.5
            ? ((Nf = Xt.j0 + 1),
              kr.push([Xt.j0 + 1, sa - 1]),
              m1 > 0 && kr.push([Xt.j0 + 2, m1]))
            : ((Nf = Xt.j0),
              sa > 0 && kr.push([Xt.j0 + 1, sa]),
              Of < 1 && kr.push([Xt.j0, Of - 1])),
        (it[W0 * 4] = Nf),
        (ft[W0 * 4] = 1),
        Tt < 4)
      ) {
        let Fh = X0[0] / Ss[0],
          Z7 = Fh > 0 ? Tt - 1 : Tt;
        Z7 >= 0 &&
          Z7 < 3 &&
          ((Et[W0 * 2] = Z7),
          (Et[W0 * 2 + 1] =
            os(0.3, 0.85, Math.abs(Fh)) * (1 - 0.35 * Math.abs(Ns))));
      }
      let bn =
          Math.abs(ho - Xt.joints[2]) < Math.abs(ho - Xt.joints[1])
            ? 2
            : Tt !== 4 && ho < Xt.joints[1] * 0.45
              ? 0
              : 1,
        id = ho - Xt.joints[bn],
        l3 = bn === 2 ? 0.0055 : 0.0075,
        j7 =
          (bn === 0 ? 0.0011 : bn === 1 ? 0.001 : 6e-4) *
            xo(id, l3 * 0.8) *
            os(0.1, -0.7, Ns) +
          5e-4 * xo(id, l3) * (1 - Math.abs(Ns)) * (bn > 0 ? 1 : 0),
        $7 =
          (Ns > 0 ? xo(id - 0.001, l3 * 1.25) : -xo(id, l3 * 1.15)) *
          (0.35 + 0.65 * Math.abs(Ns)),
        $p = Xt.j0 + bn,
        K1 =
          kr.length > 0 && kr[0][0] === $p
            ? 0
            : kr.length > 1 && kr[1][0] === $p
              ? 1
              : -1;
      K1 < 0 && kr.length < 2 && ((K1 = kr.length), kr.push([$p, 0]));
      for (let Fh = 0; Fh < Math.min(3, kr.length); Fh++)
        zt(W0, Fh, kr[Fh][0], kr[Fh][1]);
      (K1 >= 0 && ((dt[W0 * 4 + K1] = j7), (dt[W0 * 4 + 2 + K1] = $7)),
        (tt[W0 * 4 + 2] = ys(0.85, 0.22, 0.5 + 0.5 * Ns)));
      continue;
    }
    let $t = 0;
    for (let Xt = 0; Xt < 4; Xt++) {
      let Ss = n[Xt];
      (s.digitLocal(Ss, b[0], b[1], b[2], X0),
        (ut[Xt] = Math.exp(-(X0[0] * X0[0]) / (0.0085 * 0.0085))),
        ($t += ut[Xt]),
        Ss.prof(Math.max(X0[1], 0)));
      let Ns = s.prof();
      z0[Xt] = G0(
        X0[1],
        gi(X0[2] / (X0[2] >= 0 ? Ns[2] : Ns[1]), -1, 1),
        K0.mcp[0],
        K0.mcp[1],
        K0.mcp[2],
      );
    }
    for (let Xt = 0; Xt < 4; Xt++) ut[Xt] /= $t;
    if (Tt >= 0 && Tt < 4)
      for (let Xt = 0; Xt < 4; Xt++) ut[Xt] = ys(ut[Xt], Xt === Tt ? 1 : 0, kt);
    let le = (ut[2] + ut[3]) * os(0.012, 0.046, b[1]);
    Tt >= 0 && Tt < 4 && kt > 0 && (le = ys(le, Tt >= 2 ? 1 : 0, kt));
    let Ut = [];
    for (let Xt = 0; Xt < 4; Xt++) {
      let Ss = z0[Xt] * ut[Xt];
      Ss > 0.004 && Ut.push([2 + 3 * Xt, Ss, Xt]);
    }
    let Se = Tt === 4 ? Wt : Pt(b);
    Se > 0.004 &&
      (Ut.push([o.TH, Se, 4]), Ut.push([ep, Se * _t(wt * i.L[0]), 6]));
    let he = bt(b[1]);
    if ((he > 0.004 && Ut.push([Wg, -he, 5]), Tt === 4)) {
      (s.digitLocal(i, b[0], b[1], b[2], X0), i.prof(X0[1]));
      let Xt = s.prof(),
        Ss = G0(
          X0[1] - i.joints[1],
          gi(X0[2] / (X0[2] >= 0 ? Xt[2] : Xt[1]), -1, 1),
          K0.tmcp[0],
          K0.tmcp[1],
          K0.tmcp[2],
        );
      Ss * Se > 0.004 && Ut.push([o.TH + 1, Ss * Se, -1]);
    }
    let Xe = (Xt) =>
      Xt[2] === 6
        ? 0.001 + Math.abs(Ut.find((Ss) => Ss[2] === 4)[1])
        : Math.abs(Xt[1]);
    (Ut.sort((Xt, Ss) => Xe(Ss) - Xe(Xt)),
      (Ut.length = Math.min(Ut.length, 3)),
      Ut.some((Xt) => Xt[2] === 4) !== Ut.some((Xt) => Xt[2] === 6) &&
        (Ut.length = 2));
    let qe = (Xt) =>
      Xt[2] === -1 ? 0 : Xt[2] < 4 ? 1 : Xt[2] === 6 ? 2 : Xt[2] === 4 ? 3 : 4;
    Ut.sort((Xt, Ss) => qe(Xt) - qe(Ss));
    for (let Xt = 0; Xt < Ut.length; Xt++)
      if (
        (zt(W0, Xt, Ut[Xt][0], Ut[Xt][1]),
        Xt < 2 && Ut[Xt][2] >= 0 && Ut[Xt][2] < 4)
      ) {
        let Ss = n[Ut[Xt][2]];
        (s.digitLocal(Ss, b[0], b[1], b[2], X0), Ss.prof(Math.max(X0[1], 0)));
        let Ns = s.prof(),
          ho = gi(X0[2] / (X0[2] >= 0 ? Ns[2] : Ns[1]), -1, 1);
        ((dt[W0 * 4 + Xt] =
          (0.0019 * xo(X0[0], 0.0062) -
            8e-4 * xo(Math.abs(X0[0]) - 0.0105, 0.0035)) *
          xo(X0[1] + 0.001, 0.008) *
          os(0.1, -0.7, ho)),
          (dt[W0 * 4 + 2 + Xt] =
            (ho > 0 ? xo(X0[1] - 0.004, 0.011) : -xo(X0[1], 0.01)) *
            (0.35 + 0.65 * Math.abs(ho)) *
            xo(X0[0], 0.011)));
      } else
        Xt < 2 &&
          Ut[Xt][2] === 5 &&
          (dt[W0 * 4 + 2 + Xt] =
            gi(b[2] / 0.018, -1, 1) * xo(b[1] + 0.004, 0.012));
    if (
      ((it[W0 * 4] = a.HAND),
      (ft[W0 * 4] = 1 - le),
      (it[W0 * 4 + 1] = a.CUP),
      (ft[W0 * 4 + 1] = le),
      (tt[W0 * 4 + 2] = b[2] < 0 ? 0.6 : 0.16),
      b[2] < 0 && b[1] > 0.02)
    ) {
      let Xt = 0;
      for (let sa = 1; sa < 4; sa++) ut[sa] > ut[Xt] && (Xt = sa);
      let Ss = c[Xt],
        Ns = gi((b[1] - 0.012) / (Ss[1] - 0.018), 0, 1),
        ho = ys([0.008, 0.002, -0.006, -0.014][Xt], Ss[0], Ns),
        Ma =
          xo(b[0] - ho, 0.0028) *
          os(0.25, 0.7, Ns) *
          (1 - os(Ss[1] - 0.016, Ss[1] - 0.006, b[1]));
      Ma > 0.02 &&
        (gt[W0 * 4 + 1] === 0 || gt[W0 * 4] === 2 + 3 * Xt) &&
        ((gt[W0 * 4] = 2 + 3 * Xt), (tt[W0 * 4 + 3] = Ma));
    }
  }
  let J = new Float64Array(N * 3);
  function Q() {
    J.fill(0);
    let W0 = (Tt, kt, Wt) => {
      let $t = y[Tt * 3],
        le = y[Tt * 3 + 1],
        Ut = y[Tt * 3 + 2],
        Se = y[kt * 3] - $t,
        he = y[kt * 3 + 1] - le,
        Xe = y[kt * 3 + 2] - Ut,
        qe = y[Wt * 3] - $t,
        Xt = y[Wt * 3 + 1] - le,
        Ss = y[Wt * 3 + 2] - Ut,
        Ns = he * Ss - Xe * Xt,
        ho = Xe * qe - Se * Ss,
        Ma = Se * Xt - he * qe;
      for (let sa of [Tt, kt, Wt])
        ((J[sa * 3] += Ns), (J[sa * 3 + 1] += ho), (J[sa * 3 + 2] += Ma));
    };
    for (let Tt of Z) (W0(Tt[0], Tt[1], Tt[2]), W0(Tt[0], Tt[2], Tt[3]));
    for (let Tt of r0) W0(Tt[0], Tt[1], Tt[2]);
    for (let Tt = 0; Tt < N; Tt++) {
      let kt = Math.hypot(J[Tt * 3], J[Tt * 3 + 1], J[Tt * 3 + 2]) || 1;
      ((J[Tt * 3] /= kt), (J[Tt * 3 + 1] /= kt), (J[Tt * 3 + 2] /= kt));
    }
  }
  Q();
  {
    let W0 = 0,
      Tt = [0, 0, 0];
    for (let kt = 0; kt < N; kt += 7)
      (s.grad(y[kt * 3], y[kt * 3 + 1], y[kt * 3 + 2], Tt),
        (W0 +=
          Tt[0] * J[kt * 3] + Tt[1] * J[kt * 3 + 1] + Tt[2] * J[kt * 3 + 2]));
    if (W0 < 0) {
      for (let kt of Z) {
        let Wt = kt[1];
        ((kt[1] = kt[3]), (kt[3] = Wt));
        let $t = kt[6];
        ((kt[6] = kt[8]), (kt[8] = $t));
      }
      for (let kt of r0) {
        let Wt = kt[0];
        ((kt[0] = kt[1]), (kt[1] = Wt));
        let $t = kt[4];
        ((kt[4] = kt[5]), (kt[5] = $t));
      }
      Q();
    }
  }
  for (let W0 = 0; W0 < N; W0++) {
    let Tt = y[W0 * 3],
      kt = y[W0 * 3 + 1],
      Wt = y[W0 * 3 + 2],
      $t = J[W0 * 3],
      le = J[W0 * 3 + 1],
      Ut = J[W0 * 3 + 2],
      Se = 0;
    for (let [he, Xe] of [
      [0.003, 0.42],
      [0.007, 0.34],
      [0.014, 0.24],
    ])
      Se +=
        Xe * gi(1 - s.U(Tt + $t * he, kt + le * he, Wt + Ut * he) / he, 0, 1);
    tt[W0 * 4] = gi(1 - 0.9 * Se, 0.12, 1);
  }
  for (let W0 = 0; W0 < 3; W0++) for (let Tt of w0[W0]) tt[Tt * 4] = 0.25;
  let i0 = Xb(),
    A0 = YI(o, s);
  {
    let W0 = _(Q0, [0, 0, 0]),
      Tt = _(nt, [0, 0, 0]);
    A0.setWeb([(W0[0] + Tt[0]) / 2, (W0[1] + Tt[1]) / 2, (W0[2] + Tt[2]) / 2]);
  }
  let N0 = {};
  for (let W0 of cE) N0[W0] = new Float32Array(N);
  let mt = {},
    xt = new Float64Array(N);
  for (let W0 = 0; W0 < N; W0++) {
    (_(W0, b),
      (v[0] = J[W0 * 3]),
      (v[1] = J[W0 * 3 + 1]),
      (v[2] = J[W0 * 3 + 2]),
      A0.fields(b, v, mt));
    for (let Tt of cE) N0[Tt][W0] = mt[Tt];
    xt[W0] = A0.thickness(mt);
  }
  for (let W0 = 0; W0 < N; W0++)
    xt[W0] &&
      ((y[W0 * 3] += J[W0 * 3] * xt[W0]),
      (y[W0 * 3 + 1] += J[W0 * 3 + 1] * xt[W0]),
      (y[W0 * 3 + 2] += J[W0 * 3 + 2] * xt[W0]));
  Q();
  let yt = new Float32Array(N * 3),
    Mt = (() => {
      let W0 = new Quaternion()
          .setFromAxisAngle(new Vector3(0, 0, 1), -42 * a5)
          .multiply(
            new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -16 * a5),
          ),
        Tt = Math.hypot(W0.x, W0.y, W0.z),
        kt = (2 * Math.atan2(Tt, W0.w)) / Tt,
        Wt = new Vector3(W0.x * kt, W0.y * kt, W0.z * kt).applyQuaternion(
          o.BW_Q[o.TH],
        );
      return [Wt.x, Wt.y, Wt.z];
    })();
  {
    let W0 = r[o.TH],
      Tt = (Ut, Se, he) => {
        let Xe = Math.hypot(Mt[0], Mt[1], Mt[2]) * Se;
        if (Math.abs(Xe) < 1e-7)
          return ((he[0] = Ut[0]), (he[1] = Ut[1]), (he[2] = Ut[2]), he);
        let qe = Mt[0] / Math.hypot(Mt[0], Mt[1], Mt[2]),
          Xt = Mt[1] / Math.hypot(Mt[0], Mt[1], Mt[2]),
          Ss = Mt[2] / Math.hypot(Mt[0], Mt[1], Mt[2]),
          Ns = Math.cos(Xe),
          ho = Math.sin(Xe),
          Ma = Ut[0],
          sa = Ut[1],
          m1 = Ut[2],
          Of = (qe * Ma + Xt * sa + Ss * m1) * (1 - Ns);
        return (
          (he[0] = Ma * Ns + (Xt * m1 - Ss * sa) * ho + qe * Of),
          (he[1] = sa * Ns + (Ss * Ma - qe * m1) * ho + Xt * Of),
          (he[2] = m1 * Ns + (qe * sa - Xt * Ma) * ho + Ss * Of),
          he
        );
      },
      kt = new Float32Array(N),
      Wt = Float64Array.from(y),
      $t = Float64Array.from(J);
    for (let Ut = 0; Ut < N; Ut++)
      if (w[Ut] === 4 && it[Ut * 4] >= o.TH) kt[Ut] = 1;
      else
        for (let Se = 0; Se < 3; Se++) {
          let he = Se < 2 ? gt[Ut * 4 + Se * 2] : rt[Ut * 2],
            Xe = Se < 2 ? gt[Ut * 4 + Se * 2 + 1] : rt[Ut * 2 + 1];
          he === o.TH && Xe > 0 && (kt[Ut] = Xe);
        }
    let le = !1;
    for (let Ut = 0; Ut < N; Ut++)
      kt[Ut] > 0 &&
        ((le = !0),
        (b[0] = y[Ut * 3] - W0.x),
        (b[1] = y[Ut * 3 + 1] - W0.y),
        (b[2] = y[Ut * 3 + 2] - W0.z),
        Tt(b, kt[Ut], v),
        (y[Ut * 3] = v[0] + W0.x),
        (y[Ut * 3 + 1] = v[1] + W0.y),
        (y[Ut * 3 + 2] = v[2] + W0.z));
    if (le) {
      Q();
      for (let Ut = 0; Ut < N; Ut++)
        kt[Ut] > 0 &&
          kt[Ut] < 1 &&
          ((b[0] = J[Ut * 3]),
          (b[1] = J[Ut * 3 + 1]),
          (b[2] = J[Ut * 3 + 2]),
          Tt(b, -kt[Ut], v),
          (yt[Ut * 3] = v[0] - $t[Ut * 3]),
          (yt[Ut * 3 + 1] = v[1] - $t[Ut * 3 + 1]),
          (yt[Ut * 3 + 2] = v[2] - $t[Ut * 3 + 2]));
      for (let Ut = 0; Ut < N; Ut++) {
        let Se = os(0, 0.12, kt[Ut]) * os(1, 0.9, kt[Ut]);
        ((yt[Ut * 3] *= Se), (yt[Ut * 3 + 1] *= Se), (yt[Ut * 3 + 2] *= Se));
      }
      for (let Ut = 0; Ut < Wt.length; Ut++) y[Ut] = Wt[Ut];
      J.set($t);
    }
  }
  let St = (W0, Tt) =>
      Math.hypot(
        y[W0 * 3] - y[Tt * 3],
        y[W0 * 3 + 1] - y[Tt * 3 + 1],
        y[W0 * 3 + 2] - y[Tt * 3 + 2],
      ),
    Rt = new Map(),
    Ot = {
      fingers: [],
      thumb: null,
      back: {},
      palm: {},
    };
  function Jt(W0, Tt, kt, Wt) {
    let $t = W0.rows.length,
      le = 0,
      Ut = [],
      Se = [];
    for (let qe = 0; qe < $t; qe++) {
      let Xt = W0.rows[qe];
      if (qe > 0) {
        let Ns = 0;
        for (let ho = 0; ho < u; ho++) Ns += St(Xt[ho], W0.rows[qe - 1][ho]);
        le += Ns / u;
      }
      let Ss = 0;
      for (let Ns = 0; Ns < u; Ns++) Ss += St(Xt[Ns], Xt[(Ns + 1) % u]);
      (Ut.push(le), Se.push(Ss));
      for (let Ns = 0; Ns <= u; Ns++)
        Rt.set(b0(Tt, qe, Ns), [((Ns - u / 2) * Ss) / u, le]);
    }
    let he = 0;
    for (let qe = 0; qe < u; qe++) he += St(W0.rows[$t - 1][qe], W0.pole);
    le += he / u;
    for (let qe = 0; qe <= u; qe++)
      Rt.set(b0(Tt, $t, qe), [((qe + 0.5 - u / 2) * Se[$t - 1] * 0.2) / u, le]);
    let Xe = [];
    for (let qe = 0; qe < $t; qe++)
      W0.sOf[qe] != null && Xe.push([W0.sOf[qe], Ut[qe]]);
    ((Wt.sv = Xe),
      (Wt.vr = Ut),
      (Wt.cr = Se),
      (Wt.vTip = le),
      (Wt.cut = kt),
      (Wt.N = u),
      (Wt.joints = W0.d.joints),
      (Wt.Ltot = W0.d.Ltot));
  }
  for (let W0 = 0; W0 < 4; W0++) {
    let Tt = {};
    (Jt(k[W0], j + W0, E0, Tt), Ot.fingers.push(Tt));
  }
  function ee(W0, Tt, kt, Wt, $t, le) {
    let Ut = W0.n,
      Se = new Float64Array(Wt - kt + 1);
    for (let he = 0; he < Ut; he++) {
      let Xe = W0(he);
      for (let Xt = kt; Xt <= Wt; Xt++)
        he === 0
          ? (Se[Xt - kt] = le ? le[Xt - kt] : 0)
          : (Se[Xt - kt] += St(Xe[Xt - kt], W0(he - 1)[Xt - kt]));
      let qe = new Float64Array(Wt - kt + 1);
      for (let Xt = $t + 1; Xt <= Wt; Xt++)
        qe[Xt - kt] = qe[Xt - 1 - kt] + St(Xe[Xt - kt], Xe[Xt - 1 - kt]);
      for (let Xt = $t - 1; Xt >= kt; Xt--)
        qe[Xt - kt] = qe[Xt + 1 - kt] - St(Xe[Xt - kt], Xe[Xt + 1 - kt]);
      for (let Xt = kt; Xt <= Wt; Xt++)
        Rt.set(b0(Tt, he, Xt), [qe[Xt - kt], Se[Xt - kt]]);
    }
    return Se;
  }
  let Nt = (W0, Tt) => w0[W0][((Tt % T0) + T0) % T0],
    ge = (W0, Tt) => pt[W0][Tt % G],
    Le = (W0, Tt, kt, Wt) => {
      let $t = (le) => {
        let Ut = [];
        for (let Se = kt; Se <= Wt; Se++) Ut.push(W0(le, Se));
        return Ut;
      };
      return (($t.n = Tt), $t);
    },
    xn = (W0) => {
      let Tt = new Float64Array(W0);
      return (Tt.fill(-0.008), Tt);
    };
  {
    let W0 = 2 * h,
      Tt = ee(Le(Nt, w0.length, 0, s0), d0, 0, s0, W0, xn(s0 + 1)),
      kt = new Float64Array(l0);
    kt[0] = Tt[0];
    for (let Wt = 2; Wt <= l0; Wt++) kt[Wt - 1] = Tt[Wt - 2];
    ee(Le(ge, ht + 1, 1, l0), V, 1, l0, W0 + 2, kt);
  }
  {
    let W0 = 4 * h + f + 2 * h,
      Tt = ee(Le(Nt, w0.length, s0, j0), d0 + 10, s0, j0, W0, xn(j0 - s0 + 1)),
      kt = G + 1 - l0 + 1,
      Wt = new Float64Array(kt);
    for (let $t = l0; $t <= G - 1; $t++) Wt[$t - l0] = Tt[$t - 2 - s0];
    ((Wt[kt - 2] = Wt[kt - 3]),
      (Wt[kt - 1] = Wt[kt - 3]),
      ee(Le(ge, ht + 1, l0, G + 1), V + 10, l0, G + 1, W0 + 2, Wt));
  }
  let js = d0 + 10,
    Un = d0 + 20;
  {
    let W0 = (Ot.thumb = {});
    Jt(c0, B, U, W0);
    let Tt = S0.length + 1,
      kt = W0.cr[0] / u,
      Wt = 0,
      $t = new Float64Array(w0.length);
    for (let le = w0.length - 2; le >= 0; le--) {
      let Ut = 0;
      for (let Se = 0; Se <= Tt; Se++)
        Ut += St(Nt(le, j0 + Se), Nt(le + 1, j0 + Se));
      ((Wt -= Ut / (Tt + 1)), ($t[le] = Wt));
    }
    for (let le = 0; le < w0.length; le++) {
      let Ut = 0;
      for (let he = 0; he < Tt; he++)
        Ut += St(Nt(le, j0 + he), Nt(le, j0 + he + 1));
      let Se = le === w0.length - 1 ? kt : Ut / Tt;
      for (let he = 0; he <= Tt; he++)
        Rt.set(b0(Un, le, j0 + he), [(he - u / 2) * Se, $t[le]]);
    }
    ((W0.vWrist = $t[P0 - 1]), (W0.vHem = $t[3]), (W0.NT = Tt));
  }
  let re = Xb(),
    Ae = {
      pos: [],
      nor: [],
      uv: [],
      col: [],
      si: [],
      sw: [],
      bend: [],
      bend2: [],
      aux: [],
      nrm2: [],
      flank: [],
      chart: [],
      idx: [],
      lid: [],
    },
    ws = new Map(),
    Zo = (W0, Tt) => {
      let kt = Math.floor(W0 / 1e6);
      return kt === V
        ? Tt === ss.BACK
          ? W0 + 1e7
          : W0
        : kt !== d0
          ? W0
          : Tt === ss.BACK
            ? W0 + 1e7
            : Tt === ss.THUMB
              ? W0 + 2e7
              : W0;
    };
  function so(W0, Tt, kt) {
    Tt = Zo(Tt, kt);
    let Wt = Tt * 16 + kt,
      $t = ws.get(Wt);
    if ($t !== void 0) return $t;
    let le = Rt.get(Tt);
    if (!le)
      throw new Error("hands/mesh: missing uv for key " + Tt + " chart " + kt);
    (($t = Ae.chart.length),
      Ae.pos.push(y[W0 * 3], y[W0 * 3 + 1], y[W0 * 3 + 2]),
      Ae.nor.push(J[W0 * 3], J[W0 * 3 + 1], J[W0 * 3 + 2]),
      Ae.uv.push(le[0], le[1]),
      Ae.col.push(tt[W0 * 4], 0, tt[W0 * 4 + 2], tt[W0 * 4 + 3]));
    for (let Ut = 0; Ut < 4; Ut++)
      (Ae.si.push(it[W0 * 4 + Ut]),
        Ae.sw.push(ft[W0 * 4 + Ut]),
        Ae.bend.push(gt[W0 * 4 + Ut]),
        Ae.aux.push(dt[W0 * 4 + Ut]));
    return (
      Ae.bend2.push(rt[W0 * 2], rt[W0 * 2 + 1]),
      Ae.nrm2.push(yt[W0 * 3], yt[W0 * 3 + 1], yt[W0 * 3 + 2]),
      Ae.flank.push(Et[W0 * 2], Et[W0 * 2 + 1]),
      Ae.chart.push(kt),
      Ae.lid.push(W0),
      ws.set(Wt, $t),
      $t
    );
  }
  for (let W0 of Z) {
    let Tt = so(W0[0], W0[5], W0[4]),
      kt = so(W0[1], W0[6], W0[4]),
      Wt = so(W0[2], W0[7], W0[4]),
      $t = so(W0[3], W0[8], W0[4]);
    St(W0[0], W0[2]) <= St(W0[1], W0[3])
      ? Ae.idx.push(Tt, kt, Wt, Tt, Wt, $t)
      : Ae.idx.push(Tt, kt, $t, kt, Wt, $t);
  }
  for (let W0 of r0)
    Ae.idx.push(
      so(W0[0], W0[4], W0[3]),
      so(W0[1], W0[5], W0[3]),
      so(W0[2], W0[6], W0[3]),
    );
  let Os = Ae.chart.length,
    va = Ae.idx.length / 3,
    r3 = GZ(Ae, Os, t.atlas || 2048),
    GC = {};
  for (let W0 of cE) {
    let Tt = (GC[W0] = new Float32Array(Os));
    for (let kt = 0; kt < Os; kt++) Tt[kt] = N0[W0][Ae.lid[kt]];
  }
  Ot.cuff = {
    rows: D0.map((W0) => W0[0]),
  };
  let bv = {
      marks: Ot,
      N: u,
      ND: h,
      NW: f,
      S: s,
      thumbRef: Mt,
      layout: r3,
      fields: GC,
      design: A0,
      handVerts: Os,
      dbg: {
        sSplitA: Array.from(M0),
        Wd: q0,
        Wp: v0,
        sTReg: _0,
      },
      logical: {
        P: y,
        Nn: J,
        LT: w0,
        UPR: pt,
        FG: k,
        TB: c0,
        upCols: I,
        NCUFF: P0,
        NFREE: st,
        NU: ht,
        lCut: s0,
        lWd: j0,
        cCut: l0,
        key: b0,
        uvOf: Rt,
        G_LT: d0,
        G_LTB: js,
        G_LTT: Un,
        G_UP: V,
        G_UPB: V + 10,
        G_TB: B,
        G_F: j,
        F_CUT: E0,
        T_CUT: U,
        thumbIn: S0,
        NPALM: m0,
      },
    },
    WC = KI(o, Ae, t, {
      JOINT_TWIST: qg,
      JOINT_ELBOW: r5,
      CHART: ss,
      BONE: a,
      layout: r3,
    }),
    qC = Xb(),
    p1 = new BufferGeometry();
  for (
    p1.setAttribute("position", new Float32BufferAttribute(Ae.pos, 3)),
      p1.setAttribute("normal", new Float32BufferAttribute(Ae.nor, 3)),
      p1.setAttribute("uv", new Float32BufferAttribute(Ae.uv, 2)),
      p1.setAttribute("aCol", new Float32BufferAttribute(Ae.col, 4)),
      p1.setAttribute("skinIndex", new Uint16BufferAttribute(Ae.si, 4)),
      p1.setAttribute("skinWeight", new Float32BufferAttribute(Ae.sw, 4)),
      p1.setAttribute("aBend", new Float32BufferAttribute(Ae.bend, 4)),
      p1.setAttribute("aBend2", new Float32BufferAttribute(Ae.bend2, 2));
    Ae.nrm2.length < Ae.pos.length;
  )
    Ae.nrm2.push(0);
  for (
    p1.setAttribute("aNrm2", new Float32BufferAttribute(Ae.nrm2, 3));
    Ae.flank.length < (Ae.pos.length / 3) * 2;
  )
    Ae.flank.push(0);
  return (
    p1.setAttribute("aFlank", new Float32BufferAttribute(Ae.flank, 2)),
    p1.setAttribute("aAux", new Float32BufferAttribute(Ae.aux, 4)),
    p1.setIndex(Ae.idx),
    (bv.chartOf = Ae.chart),
    (bv.sleeve = WC),
    (bv.stats = {
      verts: Ae.chart.length,
      tris: Ae.idx.length / 3,
      handVerts: Os,
      handTris: va,
      logical: N,
      free: h0.length,
      watchTris: WC.watchTris,
      ms: {
        relax: +($0 - e).toFixed(1),
        fields: +(i0 - $0).toFixed(1),
        layersUv: +(re - i0).toFixed(1),
        sleeve: +(qC - re).toFixed(1),
        total: +(qC - e).toFixed(1),
      },
    }),
    {
      geometry: p1,
      info: bv,
    }
  );
}
var WZ = `
attribute vec4 aBend;
attribute vec2 aBend2;
attribute vec3 aNrm2;
attribute vec2 aFlank;
uniform vec3 ghGap;
varying float vGhGap;
uniform vec3 ghThumbRef;
attribute vec4 aAux;
attribute vec4 aCol;
uniform vec4 ghJoint[${Kg}];
uniform vec3 ghPivot[${Kg}];
varying vec4 vGhCol;
varying float vGhFlex;
varying vec2 vGhUv;
vec3 ghRot( vec3 v, vec3 r ) {
  float a = length( r );
  if ( a < 1e-5 ) return v + cross( r, v );
  vec3 k = r / a; float s = sin( a ), c = cos( a );
  return v * c + cross( k, v ) * s + k * dot( k, v ) * ( 1.0 - c );
}`;
var qZ = `
vec3 objectNormal = vec3( normal );
vec3 ghPos = vec3( position );
{
  // the first web shades like a taut membrane once the thumb has swung out (second normal, see mesh.js)
  objectNormal = normalize( objectNormal + aNrm2 * clamp( dot( ghJoint[ 14 ].xyz, ghThumbRef ) / dot( ghThumbRef, ghThumbRef ), 0.0, 1.05 ) );
  int ja = int( aBend.x + 0.5 ), jb = int( aBend.z + 0.5 ), jc = int( aBend2.x + 0.5 );
  vec4 JA = ghJoint[ ja ], JB = ghJoint[ jb ];
  vec3 ra = JA.xyz * aBend.y, rb = JB.xyz * aBend.w, rc = ghJoint[ jc ].xyz * aBend2.y, pa = ghPivot[ ja ], pb = ghPivot[ jb ], pc = ghPivot[ jc ];
  ghPos = pa + ghRot( ghPos - pa, ra ); objectNormal = ghRot( objectNormal, ra );
  ghPos = pb + ghRot( ghPos - pb, rb ); objectNormal = ghRot( objectNormal, rb );
  ghPos = pc + ghRot( ghPos - pc, rc ); objectNormal = ghRot( objectNormal, rc );
  // knuckles push out as the joint closes; extensor tendons stand out while the finger is straight
  float ka = clamp( JA.w / 1.5, 0.0, 1.15 ), kb = clamp( JB.w / 1.5, 0.0, 1.15 );
  float bulge = aAux.x * ka * ( 2.0 - ka ) + aAux.y * kb * ( 2.0 - kb );
  bulge += aCol.a * ( 1.0 - aCol.g ) * 0.0007 * clamp( 1.0 - JA.w / 0.6, 0.0, 1.35 );
  ghPos += objectNormal * bulge;
  vGhFlex = aAux.z * JA.w + aAux.w * JB.w;
  vGhCol = aCol; vGhUv = uv;
  vGhGap = aFlank.y * ( aFlank.x < 0.5 ? ghGap.x : aFlank.x < 1.5 ? ghGap.y : ghGap.z );
}`;
var KZ = `
varying vec4 vGhCol;
varying float vGhFlex;
varying vec2 vGhUv;
uniform float ghDebug;
uniform sampler2D ghAlbedo, ghData, ghMask, ghDetail, ghNoise, ghWeave;
uniform vec3 ghCamoCol[4];
uniform float ghWatch;
uniform vec2 ghSeed;
varying float vGhGap;
uniform vec4 ghTexel;        // 1 / atlas size, height scale (slope per unit height difference per uv), detail tiling, unused
// smooth value noise from a 64\xB2 lattice texture (the bilinear filter does the interpolation)
float ghVN( vec2 p ) { vec2 i = floor( p ), f = fract( p ); f = f * f * ( 3.0 - 2.0 * f ); return textureLod( ghNoise, ( i + f + 0.5 ) / 64.0, 0.0 ).r; }
float ghFbm2( vec2 p ) { return ( ghVN( p ) * 2.0 + ghVN( p * 2.0 + 17.3 ) ) / 3.0; }
float ghFbm3( vec2 p ) { return ( ghVN( p ) * 4.0 + ghVN( p * 2.0 + 17.3 ) * 2.0 + ghVN( p * 4.0 + 41.7 ) ) / 7.0; }
float ghEdge( float t, float n ) { float w = max( 0.007, fwidth( n ) * 0.8 ); return smoothstep( t - w, t + w, n ); }`;
var XZ = `
vec3 ghAlb; float ghRough = 0.9, ghSheen = 0.3, ghAO = vGhCol.r, ghMetal = 0.0; vec2 ghNxy = vec2( 0.0 );
if ( vGhCol.g < 0.5 ) {
  // ---- glove: atlas ----
  vec2 fw = max( abs( dFdx( vGhUv ) ), abs( dFdy( vGhUv ) ) );
  float e = max( ghTexel.x, 0.75 * max( fw.x, fw.y ) );
  vec3 d0 = texture2D( ghData, vGhUv ).rgb, dU = texture2D( ghData, vGhUv + vec2( e, 0.0 ) ).rgb, dV = texture2D( ghData, vGhUv + vec2( 0.0, e ) ).rgb;
  // pose-driven wrinkles: rest amount (slack cloth over straight knuckles) \xB1 flexion
  float wr = clamp( vGhCol.b + vGhFlex * 0.9, 0.0, 1.8 );
  float h0 = d0.r + ( d0.b - 0.5 ) * wr, hU = dU.r + ( dU.b - 0.5 ) * wr, hV = dV.r + ( dV.b - 0.5 ) * wr;
  ghNxy = - vec2( hU - h0, hV - h0 ) * ( ghTexel.y / e );
  vec4 mk = texture2D( ghMask, vGhUv );
  vec4 dt = texture2D( ghDetail, vGhUv * ghTexel.z );
  vec2 nk = dt.rg * 2.0 - 1.0, ns = dt.ba * 2.0 - 1.0;
  ghNxy += nk * ( 0.85 * mk.r ) + ns * ( 0.75 * mk.g );
  ghAlb = texture2D( ghAlbedo, vGhUv ).rgb;
  ghAlb *= 1.0 + mk.r * 0.42 * ( nk.y * 0.5 + nk.x * 0.5 ) + mk.g * 0.34 * ( ns.x + ns.y );
  ghAlb *= mix( 1.0, ghAO, 0.35 );                 // cavities read in flat light too
  ghRough = d0.g;
  ghMetal = smoothstep( 0.6, 0.9, mk.r * mk.b );
  ghSheen = ( mk.r + mk.g * 0.5 ) * ( 1.0 - ghMetal );
  float crease = clamp( ( 0.5 - d0.b ) * 2.2, 0.0, 1.0 );
  ghAO *= 1.0 - 0.5 * crease * min( wr, 1.3 );
  ghAO *= 1.0 - 0.16 * clamp( vGhFlex, 0.0, 1.6 );
  ghAO *= 1.0 - 0.62 * vGhGap;
  ghAlb *= 0.93 + 0.16 * ghVN( vGhUv * 11.0 + ghSeed * 64.0 );
} else {
  // ---- sleeve: the four-tone camouflage of the operator (character/textures.js) evaluated per pixel, so the print
  //      stays crisp at any distance; ripstop weave + crumple from a small tiling map (uv in metres) ----
  vec2 t = vGhUv / 0.44 + ghSeed;
  float wx = ghFbm2( t * 4.0 + vec2( 3.1, 8.2 ) ) - 0.5, wy = ghFbm2( t * 4.0 + vec2( 9.4, 2.6 ) ) - 0.5;
  float n1 = ghFbm3( vec2( t.x * 5.0 + wx * 1.6, t.y * 9.0 + wy * 1.6 ) );
  float n2 = ghFbm3( vec2( t.x * 8.0 + 4.7 + wy * 1.2, t.y * 13.0 + 1.3 + wx * 1.2 ) );
  float n3 = ghFbm2( vec2( t.x * 26.0 + 2.2, t.y * 34.0 + 6.1 ) );
  vec3 cm = ghCamoCol[0];
  cm = mix( cm, ghCamoCol[2], ghEdge( 0.575, n1 ) );
  cm = mix( cm, ghCamoCol[3], ghEdge( 0.580, n2 ) );
  cm = mix( cm, ghCamoCol[1], 1.0 - ghEdge( 0.425, n1 ) );
  cm = mix( cm, ghCamoCol[1], ghEdge( 0.70, n3 ) * 0.9 );
  cm = mix( cm, ghCamoCol[2], ( 1.0 - ghEdge( 0.26, n3 ) ) * 0.8 );
  float grime = clamp( 0.5 + 1.6 * ( ghFbm3( t * 9.0 + vec2( 7.7, 3.3 ) ) - 0.5 ), 0.0, 1.0 );
  vec4 wv = texture2D( ghWeave, vGhUv / 0.032 ), cr = texture2D( ghWeave, vGhUv / 0.19 + 0.37 );
  vec2 nw = wv.rg * 2.0 - 1.0;
  ghAlb = cm * ( 0.94 + 0.12 * ghFbm2( t * 3.0 + vec2( 1.1, 5.5 ) ) ) * mix( 0.9, 1.08, grime ) * ( 1.0 + 0.10 * ( nw.x + nw.y ) );
  ghRough = clamp( 0.9 * mix( 0.86, 1.12, grime ), 0.04, 1.0 );
  ghNxy = nw * 0.5 + ( cr.ba * 2.0 - 1.0 ) * 0.8;
  ghSheen = 0.55;
  ghAlb *= mix( 1.0, ghAO, 0.6 );
  // elbow reinforcement: a plain panel of heavier cloth, sewn on with a double row
  float pd = ( vGhCol.b - 0.5 ) * 0.04, pw = max( fwidth( pd ), 0.0002 ), pm = smoothstep( -pw, pw, pd );
  ghAlb = mix( ghAlb, ghCamoCol[1] * 1.12 * ( 1.0 + 0.16 * ( nw.x - nw.y ) ), pm );
  ghRough = mix( ghRough, 0.82, pm ); ghNxy = mix( ghNxy, nw * 0.9 + ( cr.ba * 2.0 - 1.0 ) * 0.35, pm );
  ghAO *= 1.0 - 0.45 * exp( - pd * pd / 0.0000012 );
  float dash = step( 0.38, fract( ( vGhUv.x * 0.7 + vGhUv.y ) * 300.0 ) );
  float st = ( 1.0 - smoothstep( 0.00035, 0.00035 + pw, abs( pd - 0.0030 ) ) ) + ( 1.0 - smoothstep( 0.00035, 0.00035 + pw, abs( pd - 0.0056 ) ) );
  ghAlb = mix( ghAlb, ghCamoCol[2] * 1.7, clamp( st, 0.0, 1.0 ) * dash * 0.85 );
  // cuff band: plain rib-knit, a shade darker than the print
  float cf = smoothstep( 0.45, 0.55, vGhCol.a ), hem = 1.0 - smoothstep( 0.0005, 0.0009, abs( vGhUv.y - 0.0745 ) );
  ghAlb *= 1.0 - 0.10 * cf; ghNxy = mix( ghNxy, nw * 0.7, cf );
  ghAlb = mix( ghAlb, ghCamoCol[2] * 1.6, hem * cf * step( 0.38, fract( vGhUv.x * 420.0 ) ) * 0.8 );
  // contact shadow under the watch (left arm only)
  ghAO *= 1.0 - ghWatch * 0.55 * ( 1.0 - smoothstep( 0.0125, 0.0190, abs( vGhUv.y - 0.0665 ) ) );
}
diffuseColor.rgb = ghAlb;
if ( ghDebug > 0.5 ) {
  vec3 dc = vec3( 1.0 );
  if ( ghDebug < 1.5 ) dc = mix( vec3( 0.1, 0.3, 1.0 ), vec3( 1.0, 0.25, 0.05 ), clamp( vGhFlex * 0.5 + 0.5, 0.0, 1.0 ) );
  else if ( ghDebug < 2.5 ) dc = vec3( ghAO );
  else if ( ghDebug < 3.5 ) { vec2 q = floor( vGhUv * 256.0 ); dc = vec3( 0.35 + 0.5 * mod( q.x + q.y, 2.0 ) ); }
  else if ( ghDebug < 4.5 ) { dc = vec3( 0.5 ); ghRough = 0.7; ghSheen = 0.0; }          // clay: geometry + normal detail only
  else if ( ghDebug < 5.5 ) { dc = vec3( 0.5 ); ghRough = 0.7; ghSheen = 0.0; ghNxy = vec2( 0.0 ); }   // clay, geometry only
  else if ( ghDebug > 8.5 ) { dc = vec3( 0.0 ); ghSheen = 0.0; ghRough = 1.0; }                     // black (wire overlay)
  diffuseColor.rgb = dc;
}`;
var uE = null;
var YZ = () => (
  uE ||
    ((uE = new DataTexture(
      new Uint8Array([128, 128, 255, 255]),
      1,
      1,
      RGBAFormat,
    )),
    (uE.needsUpdate = !0)),
  uE
);
function $I(o) {
  let t = o.tex || {},
    e = new MeshPhysicalMaterial({
      color: 16777215,
      roughness: 1,
      metalness: 0,
      sheen: 1,
      sheenRoughness: 0.45,
      sheenColor: new Color(0.26, 0.26, 0.27),
      normalMap: YZ(),
    }),
    s = new Float32Array(Kg * 4);
  return (
    (e.userData.joints = s),
    (e.userData.debug = o.debug),
    (e.userData.watch = {
      value: 0,
    }),
    (e.userData.gap = {
      value: new Vector3(),
    }),
    (e.userData.seed = {
      value: new Vector2(),
    }),
    (e.onBeforeCompile = (n) => {
      ((n.uniforms.ghJoint = {
        value: s,
      }),
        (n.uniforms.ghPivot = {
          value: o.pivots,
        }),
        (n.uniforms.ghDebug = o.debug),
        (n.uniforms.ghAlbedo = {
          value: t.albedo,
        }),
        (n.uniforms.ghData = {
          value: t.data,
        }),
        (n.uniforms.ghMask = {
          value: t.mask,
        }),
        (n.uniforms.ghDetail = {
          value: t.detail,
        }),
        (n.uniforms.ghNoise = {
          value: t.noise,
        }),
        (n.uniforms.ghWeave = {
          value: t.weave,
        }),
        (n.uniforms.ghCamoCol = {
          value: o.camo,
        }),
        (n.uniforms.ghTexel = {
          value: o.texel,
        }),
        (n.uniforms.ghGap = e.userData.gap),
        (n.uniforms.ghSeed = e.userData.seed),
        (n.uniforms.ghWatch = e.userData.watch),
        (n.uniforms.ghThumbRef = {
          value: o.thumbRef,
        }),
        (n.vertexShader = n.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
` + WZ,
          )
          .replace("#include <beginnormal_vertex>", qZ)
          .replace("#include <begin_vertex>", "vec3 transformed = ghPos;")),
        (n.fragmentShader = n.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>
` + KZ,
          )
          .replace("#include <map_fragment>", XZ)
          .replace(
            "#include <roughnessmap_fragment>",
            "float roughnessFactor = ghRough;",
          )
          .replace(
            "#include <metalnessmap_fragment>",
            "float metalnessFactor = ghMetal;",
          )
          .replace(
            "#include <normal_fragment_maps>",
            "normal = normalize( tbn * vec3( ghNxy, 1.0 ) );",
          )
          .replace(
            "#include <lights_physical_fragment>",
            `#include <lights_physical_fragment>
material.sheenColor *= ghSheen;`,
          )
          .replace(
            "#include <aomap_fragment>",
            `
        reflectedLight.indirectDiffuse *= ghAO; reflectedLight.indirectSpecular *= mix( 1.0, ghAO, 0.8 );
        reflectedLight.directDiffuse *= mix( 1.0, ghAO, 0.5 ); reflectedLight.directSpecular *= mix( 1.0, ghAO, 0.65 );
        sheenSpecularDirect *= mix( 1.0, ghAO, 0.6 ); sheenSpecularIndirect *= ghAO;`,
          )));
    }),
    (e.customProgramCacheKey = () => "gh-arm-8"),
    e
  );
}
var Eu = (o, t, e) => (o < t ? t : o > e ? e : o);
var Nl = (o, t, e) => o + (t - o) * e;
var sp = (o) => {
  let t = Math.round(Eu(o, 0, 1) * 255);
  return `rgb(${t},${t},${t})`;
};
var xi = {
  knit: "#474b4f",
  knitDk: "#2b2d30",
  four: "#292b2e",
  suede: "#51493f",
  reinf: "#3b352d",
  rubber: "#2d2e31",
  rubberHi: "#37393d",
  strap: "#2c2e31",
  tab: "#2f3134",
  cuff: "#34373a",
  hem: "#28292c",
  touch: "#666a70",
  thread: "#8e9194",
  threadDk: "#666a6e",
  accent: "#d2691e",
  loop: "#33363a",
  piping: "#70747a",
};
var Ci = {
  metal: "rgb(255,0,255)",
  knit: "rgb(255,0,0)",
  knitLo: "rgb(120,0,0)",
  suede: "rgb(0,255,0)",
  smooth: "rgb(0,0,255)",
  web: "rgb(60,0,110)",
  touch: "rgb(0,60,170)",
};
var gc = {
  knit: 0.9,
  four: 0.8,
  suede: 0.97,
  reinf: 0.9,
  rubber: 0.38,
  strap: 0.78,
  tab: 0.42,
  cuff: 0.84,
  hem: 0.72,
  touch: 0.56,
  thread: 0.55,
  loop: 0.74,
};
function Yb(o, t, e = 2) {
  for (let s = 0; s < e; s++) {
    let n = [],
      i = o.length;
    if (i < 3) return o;
    t || n.push(o[0]);
    for (let a = 0; a < (t ? i : i - 1); a++) {
      let r = o[a],
        l = o[(a + 1) % i];
      n.push(
        [r[0] * 0.75 + l[0] * 0.25, r[1] * 0.75 + l[1] * 0.25],
        [r[0] * 0.25 + l[0] * 0.75, r[1] * 0.25 + l[1] * 0.75],
      );
    }
    (t || n.push(o[i - 1]), (o = n));
  }
  return o;
}
function jb(o, t, e) {
  let s = o.length,
    n = [];
  for (let i = 0; i < s; i++) {
    let a = o[e ? (i + s - 1) % s : Math.max(0, i - 1)],
      r = o[e ? (i + 1) % s : Math.min(s - 1, i + 1)],
      l = r[0] - a[0],
      c = r[1] - a[1],
      h = Math.hypot(l, c) || 1;
    ((l /= h), (c /= h), n.push([o[i][0] + c * t, o[i][1] - l * t]));
  }
  return n;
}
var J2 = (o, t, e) => {
  o.moveTo(t[0][0], t[0][1]);
  for (let s = 1; s < t.length; s++) o.lineTo(t[s][0], t[s][1]);
  e && o.closePath();
};
function ZI(o, t, e = {}) {
  let s = performance.now(),
    n = t.logical,
    i = t.layout,
    a = i.SZ,
    r = i.S,
    l = 4,
    c = t.handVerts,
    h = t.fields,
    f = t.marks,
    u = t.N,
    d = t.design,
    m = o.attributes.uv.array,
    p = o.index.array,
    x = t.chartOf,
    g = o.attributes.position.array,
    b = o.attributes.normal.array,
    v = (V0) => V0 * r,
    y = {
      A: createCanvas(a),
      H: createCanvas(a),
      R: createCanvas(a),
      C: createCanvas(a),
      M: createCanvas(a / l),
    },
    M = {};
  for (let V0 in y) M[V0] = y[V0].getContext("2d");
  (M.M.setTransform(1 / l, 0, 0, 1 / l, 0, 0),
    (M.A.fillStyle = xi.knit),
    M.A.fillRect(0, 0, a, a),
    (M.H.fillStyle = sp(0.5)),
    M.H.fillRect(0, 0, a, a),
    (M.R.fillStyle = sp(gc.knit)),
    M.R.fillRect(0, 0, a, a),
    (M.C.fillStyle = sp(0.5)),
    M.C.fillRect(0, 0, a, a),
    (M.M.fillStyle = Ci.knit),
    M.M.fillRect(0, 0, a, a));
  let w = createRandom(771);
  function T(V0, c0, Z) {
    for (let [r0, b0] of [
      ["A", V0.a],
      ["H", V0.h == null ? null : sp(V0.h)],
      ["R", V0.r == null ? null : sp(V0.r)],
      ["C", V0.c == null ? null : sp(V0.c)],
      ["M", V0.m],
      ["N", V0.n && M.N ? "#000" : null],
    ]) {
      if (b0 == null) continue;
      let d0 = M[r0];
      (d0.save(),
        (d0.globalAlpha = V0[r0.toLowerCase() + "A"] ?? V0.alpha ?? 1),
        r0 === "N" && (d0.globalCompositeOperation = "destination-out"),
        V0.clip && (d0.beginPath(), V0.clip(d0), d0.clip()),
        d0.beginPath(),
        c0(d0),
        Z
          ? ((d0.strokeStyle = b0),
            (d0.lineWidth = Z.w),
            d0.setLineDash(Z.dash || []),
            (d0.lineDashOffset = Z.off || 0),
            (d0.lineCap = Z.cap || "butt"),
            (d0.lineJoin = "round"),
            d0.stroke())
          : ((d0.fillStyle = b0), d0.fill()),
        d0.restore());
    }
  }
  let S = (V0, c0) => T(V0, c0, null);
  function E(V0, c0, Z, r0, b0) {
    let d0 = Math.max(2, Math.round(v(c0)));
    for (let V of ["A", "H"]) {
      let B = createCanvas(Z ? d0 : 1, Z ? 1 : d0),
        j = B.getContext("2d");
      V === "H" &&
        ((j.fillStyle = sp(b0)), j.fillRect(0, 0, B.width, B.height));
      for (let [l0, E0, U, X] of r0) {
        j.fillStyle = V === "A" ? U : sp(X);
        let N = Math.round(l0 * d0),
          q = Math.max(N + 1, Math.round(E0 * d0));
        Z ? j.fillRect(N, 0, q - N, 1) : j.fillRect(0, N, 1, q - N);
      }
      let s0 = M[V];
      (s0.save(),
        (s0.fillStyle = s0.createPattern(B, "repeat")),
        s0.beginPath(),
        V0(s0),
        s0.fill(),
        s0.restore());
    }
  }
  let _ = (V0, c0, Z, r0 = {}) => {
    c0.length > 1 &&
      T(V0, (b0) => J2(b0, c0, r0.closed), {
        w: v(Z),
        dash: r0.dash ? r0.dash.map(v) : null,
        cap: r0.cap,
        off: r0.off ? v(r0.off) : 0,
      });
  };
  function R(V0, c0 = {}) {
    let Z = c0.inset ? jb(V0, v(c0.inset) * (c0.side || 1), c0.closed) : V0;
    (_(
      {
        a: "rgba(0,0,0,0.26)",
        h: 0.42,
      },
      Z,
      0.56,
      {
        closed: c0.closed,
      },
    ),
      _(
        {
          a: c0.col || xi.thread,
          h: 0.64,
          r: gc.thread,
        },
        Z,
        c0.w || 0.36,
        {
          closed: c0.closed,
          dash: c0.dash || [1.5, 0.8],
          cap: "round",
        },
      ));
  }
  function C(V0, c0 = {}) {
    if (
      (_(
        {
          a: "rgba(0,0,0,0.30)",
        },
        V0,
        1.4,
        {
          closed: c0.closed,
        },
      ),
      _(
        {
          h: c0.h ?? 0.72,
          r: 0.8,
        },
        V0,
        c0.w || 1,
        {
          closed: c0.closed,
        },
      ),
      _(
        {
          a: "rgba(255,255,255,0.05)",
        },
        V0,
        0.45,
        {
          closed: c0.closed,
        },
      ),
      c0.stitch !== !1)
    )
      for (let Z of c0.sides || [1, -1])
        R(V0, {
          closed: c0.closed,
          inset: c0.inset ?? 1.2,
          side: Z,
          col: c0.col,
        });
  }
  let L = [];
  for (let V0 = 0; V0 < 9; V0++) L.push([]);
  for (let V0 = 0; V0 < p.length; V0 += 3) {
    let c0 = p[V0];
    c0 < c && L[x[c0]].push(c0, p[V0 + 1], p[V0 + 2]);
  }
  let A = (V0) => m[V0 * 2] * a,
    O = (V0) => (1 - m[V0 * 2 + 1]) * a,
    H = (V0) => i.charts[V0],
    F = (V0, c0, Z) => {
      let r0 = H(V0);
      return [r0.ox + (c0 * 1e3 - r0.u0) * r, r0.oy + (r0.v1 - Z * 1e3) * r];
    },
    P = (V0, c0) => {
      let Z = n.uvOf.get(c0);
      return F(V0, Z[0], Z[1]);
    },
    z = (V0) => V0.F || (V0.F = d.fields(V0.p, V0.n, {})),
    k = [];
  for (let V0 = 0; V0 < 9; V0++)
    k.push({
      base: new Map(),
      mids: new Map(),
      nid: c + 1,
    });
  let I = 0;
  function G(V0, c0, Z, r0 = {}) {
    let b0 = L[V0],
      d0 = typeof c0 == "function",
      V = d0 ? (r0.levels ?? 2) : 0,
      B = k[V0],
      j = B.base,
      s0 = B.mids,
      l0 = [],
      E0 = ++I,
      U = (Y) => (
        Y.st !== E0 && ((Y.st = E0), (Y.v = d0 ? c0(Y) : c0[Y.i])),
        Y
      ),
      X = (Y) => {
        let R0 = j.get(Y);
        return (
          R0 ||
            ((R0 = {
              id: Y,
              i: Y,
              x: A(Y),
              y: O(Y),
              p: [g[Y * 3], g[Y * 3 + 1], g[Y * 3 + 2]],
              n: [b[Y * 3], b[Y * 3 + 1], b[Y * 3 + 2]],
            }),
            j.set(Y, R0)),
          U(R0)
        );
      },
      N = (Y, R0) => {
        let U0 = Y.id < R0.id ? Y.id * 1e7 + R0.id : R0.id * 1e7 + Y.id,
          $0 = s0.get(U0);
        if (!$0) {
          let g0 = Y.n[0] + R0.n[0],
            G0 = Y.n[1] + R0.n[1],
            K0 = Y.n[2] + R0.n[2],
            it = Math.hypot(g0, G0, K0) || 1;
          (($0 = {
            id: B.nid++,
            i: -1,
            x: (Y.x + R0.x) / 2,
            y: (Y.y + R0.y) / 2,
            p: [
              (Y.p[0] + R0.p[0]) / 2,
              (Y.p[1] + R0.p[1]) / 2,
              (Y.p[2] + R0.p[2]) / 2,
            ],
            n: [g0 / it, G0 / it, K0 / it],
          }),
            s0.set(U0, $0));
        }
        return U($0);
      },
      q = (Y, R0, U0, $0) => {
        let g0 = Math.min(Y.v, R0.v, U0.v),
          G0 = Math.max(Y.v, R0.v, U0.v);
        if ($0 === 0 || g0 >= Z || G0 <= Z) {
          l0.push(Y, R0, U0);
          return;
        }
        let K0 = N(Y, R0),
          it = N(R0, U0),
          ft = N(U0, Y);
        (q(Y, K0, ft, $0 - 1),
          q(K0, R0, it, $0 - 1),
          q(ft, it, U0, $0 - 1),
          q(K0, it, ft, $0 - 1));
      };
    for (let Y = 0; Y < b0.length; Y += 3)
      q(X(b0[Y]), X(b0[Y + 1]), X(b0[Y + 2]), V);
    let o0 = [],
      h0 = [],
      y0 = (Y, R0) => {
        let U0 = (Z - Y.v) / (R0.v - Y.v);
        return [
          Nl(Y.x, R0.x, U0),
          Nl(Y.y, R0.y, U0),
          Y.id < R0.id ? Y.id * 1e7 + R0.id : R0.id * 1e7 + Y.id,
        ];
      };
    for (let Y = 0; Y < l0.length; Y += 3) {
      let R0 = [l0[Y], l0[Y + 1], l0[Y + 2]];
      if (r0.ok && !(r0.ok(R0[0]) && r0.ok(R0[1]) && r0.ok(R0[2]))) continue;
      let U0 = R0.map((rt) => rt.v > Z),
        $0 = U0[0] + U0[1] + U0[2];
      if ($0 === 0) continue;
      if ($0 === 3) {
        o0.push([
          [R0[0].x, R0[0].y],
          [R0[1].x, R0[1].y],
          [R0[2].x, R0[2].y],
        ]);
        continue;
      }
      let g0 = $0 === 1 ? U0.indexOf(!0) : U0.indexOf(!1),
        G0 = R0[g0],
        K0 = R0[(g0 + 1) % 3],
        it = R0[(g0 + 2) % 3],
        ft = y0(G0, K0),
        gt = y0(G0, it);
      $0 === 1
        ? (o0.push([[G0.x, G0.y], ft, gt]), h0.push([ft, gt, G0.x, G0.y]))
        : (o0.push([ft, [K0.x, K0.y], [it.x, it.y], gt]),
          h0.push([ft, gt, (K0.x + it.x) / 2, (K0.y + it.y) / 2]));
    }
    let D = null,
      W = {
        path: (Y) => {
          for (let R0 of o0) J2(Y, R0, !0);
        },
        shape: (Y) => {
          let R0 = W.lines();
          if (R0.length && R0.every((U0) => U0.closed))
            for (let U0 of R0) J2(Y, U0.pts, !0);
          else W.path(Y);
        },
        lines: () => {
          if (D) return D;
          let Y = new Map();
          h0.forEach((g0, G0) => {
            for (let K0 of [0, 1]) {
              let it = g0[K0][2];
              (Y.has(it) || Y.set(it, []), Y.get(it).push([G0, K0]));
            }
          });
          let R0 = new Uint8Array(h0.length),
            U0 = [],
            $0 = (g0, G0) => {
              let K0 = [],
                it = !1;
              for (;;) {
                ((R0[g0] = 1), K0.push(h0[g0][G0]));
                let ft = Y.get(h0[g0][G0][2]).find((gt) => !R0[gt[0]]);
                if (!ft) {
                  it =
                    !!Y.get(h0[g0][G0][2]).find((rt) => rt[0] !== g0) &&
                    K0.length > 2;
                  break;
                }
                ((g0 = ft[0]), (G0 = 1 - ft[1]));
              }
              return {
                pts: K0,
                closed: it,
              };
            };
          for (let g0 = 0; g0 < h0.length; g0++) {
            if (R0[g0]) continue;
            let G0 = $0(g0, 1),
              K0 = [h0[g0][0], ...G0.pts],
              it = G0.closed;
            if (
              (it ||
                ((R0[g0] = 0), (K0 = [...$0(g0, 0).pts.reverse(), ...G0.pts])),
              K0.length > 2)
            ) {
              let ft = Yb(
                K0.map((gt) => [gt[0], gt[1]]),
                it,
                d0 ? 1 : 2,
              );
              {
                let gt = h0[g0],
                  rt = gt[1][0] - gt[0][0],
                  dt = gt[1][1] - gt[0][1],
                  tt = (gt[0][0] + gt[1][0]) / 2,
                  X0 = (gt[0][1] + gt[1][1]) / 2;
                dt * (gt[2] - tt) - rt * (gt[3] - X0) > 0 && ft.reverse();
              }
              U0.push({
                pts: ft,
                closed: it,
              });
            }
          }
          return (D = U0);
        },
      };
    return W;
  }
  let K = (V0) => (c0) => z(c0)[V0],
    $ = (V0, c0, Z, r0, b0) => {
      let d0 = G(V0, c0, Z, b0);
      return (S(r0, d0.shape), d0.lines());
    },
    n0 = (V0, c0, Z, r0) =>
      G(V0, c0, Z, {
        ok: r0,
      }).lines(),
    e0 = (V0, c0 = 2.2) => {
      let Z = H(V0);
      return [
        Z.ox - v(c0),
        Z.oy - v(c0),
        (Z.u1 - Z.u0) * r + 2 * v(c0),
        (Z.v1 - Z.v0) * r + 2 * v(c0),
      ];
    },
    p0 = (V0) => (c0) => c0.rect(V0[0], V0[1], V0[2], V0[3]),
    t0 = {
      a: xi.knit,
      r: gc.knit,
      m: Ci.knit,
      n: !0,
    },
    M0 = {
      a: xi.suede,
      r: gc.suede,
      m: Ci.suede,
    },
    f0 = {
      a: xi.four,
      r: gc.four,
      m: Ci.knitLo,
      n: !0,
    },
    _0 = createCanvas(a / l),
    F0 = _0.getContext("2d");
  (F0.setTransform(1 / l, 0, 0, 1 / l, 0, 0), (M.N = F0));
  let m0 = (V0) => {
    let c0 = e0(V0, 0),
      Z = F0;
    (Z.save(),
      Z.beginPath(),
      Z.rect(c0[0], c0[1], c0[2], c0[3]),
      Z.clip(),
      (Z.lineCap = "round"));
    let r0 = Math.round((c0[2] * c0[3]) / 5200);
    for (let b0 = 0; b0 < r0; b0++) {
      let d0 = c0[0] + w() * c0[2],
        V = c0[1] + w() * c0[3],
        B = -1.3 + w() * 1,
        j = v(4 + w() * 12);
      ((Z.strokeStyle =
        w() < 0.5
          ? `rgba(255,246,232,${0.012 + w() * 0.022})`
          : `rgba(0,0,0,${0.03 + w() * 0.045})`),
        (Z.lineWidth = v(2.5 + w() * 4.5)),
        Z.beginPath(),
        Z.moveTo(d0, V),
        Z.quadraticCurveTo(
          d0 + Math.cos(B) * j * 0.5 + v(w() * 3 - 1.5),
          V + Math.sin(B) * j * 0.5,
          d0 + Math.cos(B) * j,
          V + Math.sin(B) * j,
        ),
        Z.stroke());
    }
    Z.restore();
  };
  (S(t0, p0(e0(ss.BACK))), S(M0, p0(e0(ss.PALM))), m0(ss.PALM));
  let S0 = (V0, c0) => {
      let Z = c0.vr.length,
        r0 = (s0, l0) =>
          s0 >= Z
            ? F(V0, 0, c0.vTip)
            : F(V0, ((l0 - u / 2) * c0.cr[s0]) / u, c0.vr[s0]),
        b0 = (s0, l0 = 0, E0 = Z) => {
          let U = [];
          for (let X = l0; X <= Math.min(E0, Z); X++) U.push(r0(X, s0));
          return U;
        },
        d0 = (s0, l0) => (E0) => J2(E0, [...b0(s0), ...b0(l0).reverse()], !0),
        V = (s0) =>
          ((((s0 - ((c0.cut + 0.5) * 360) / u) / (360 / u)) % u) + u) % u,
        B = (s0) => {
          let l0 = c0.sv;
          if (s0 <= l0[0][0]) return l0[0][1] - (l0[0][0] - s0);
          let E0 = 0;
          for (; E0 < l0.length - 2 && s0 > l0[E0 + 1][0];) E0++;
          return Nl(
            l0[E0][1],
            l0[E0 + 1][1],
            Eu((s0 - l0[E0][0]) / (l0[E0 + 1][0] - l0[E0][0]), 0, 1.5),
          );
        };
      return {
        c: V0,
        R: Z,
        pt: r0,
        col: b0,
        strip: d0,
        jOf: V,
        vOf: B,
        at: (s0, l0) => {
          let E0 = B(s0),
            U = 0;
          for (; U < Z - 2 && c0.vr[U + 1] < E0;) U++;
          let X = Eu((E0 - c0.vr[U]) / (c0.vr[U + 1] - c0.vr[U]), 0, 1),
            N = Nl(c0.cr[U], c0.cr[U + 1], X);
          return F(V0, ((l0 - u / 2) * N) / u, E0);
        },
        m: c0,
      };
    },
    T0 = [];
  for (let V0 = 0; V0 < 4; V0++) {
    let c0 = ss.F0 + V0,
      Z = S0(c0, f.fingers[V0]);
    (T0.push(Z), S(M0, p0(e0(c0))), m0(c0));
    let r0 = V0 === 3 ? Z.jOf(187.5) : Z.jOf(208),
      b0 = V0 === 0 ? Z.jOf(7.5) : Z.jOf(332);
    (S(t0, Z.strip(r0, b0)),
      V0 < 3 && S(f0, Z.strip(Z.jOf(152), Z.jOf(208))),
      V0 > 0 && S(f0, Z.strip(Z.jOf(332), Z.jOf(28))),
      (Z.seams = [
        V0 === 3 ? [r0] : [Z.jOf(152), Z.jOf(208)],
        V0 === 0 ? [b0] : [Z.jOf(332), Z.jOf(28)],
      ].flat()));
  }
  let j0 = S0(ss.THUMB, f.thumb),
    Z0 = f.thumb.NT,
    lt = 9,
    H0 = n.LT.length;
  {
    let V0 = ss.THUMB,
      c0 = n.key,
      Z = (b0, d0) => {
        let V = Math.floor(Eu(d0, 0, Z0 - 1e-6)),
          B = Eu(d0, 0, Z0) - V,
          j = P(V0, c0(n.G_LTT, b0, n.lWd + V)),
          s0 = P(V0, c0(n.G_LTT, b0, n.lWd + Math.min(Z0, V + 1)));
        return [Nl(j[0], s0[0], B), Nl(j[1], s0[1], B)];
      };
    ((j0.ltCol = (b0, d0 = 0, V = H0 - 1) => {
      let B = [];
      for (let j = d0; j <= V; j++) B.push(Z(j, b0));
      return B;
    }),
      S(M0, p0(e0(V0))),
      m0(V0));
    let r0 = {
      a: xi.knitDk,
      r: 0.8,
      m: Ci.knitLo,
      n: !0,
    };
    (S(r0, (b0) =>
      J2(
        b0,
        [
          ...j0.ltCol(0),
          ...j0.col(0),
          ...j0.col(lt).reverse(),
          ...j0.ltCol(lt).reverse(),
        ],
        !0,
      ),
    ),
      S(r0, (b0) => J2(b0, [...j0.col(-0.7), ...j0.col(0).reverse()], !0)));
  }
  ((M.A.imageSmoothingQuality = "high"),
    M.A.drawImage(_0, 0, 0, a, a),
    (M.N = null));
  let Y0 = [ss.BACK, ss.PALM, ss.THUMB, ss.F0, ss.F1, ss.F2, ss.F3];
  for (let V0 of Y0) {
    let c0 = e0(V0, 0),
      Z = M.A;
    (Z.save(), Z.beginPath(), Z.rect(c0[0], c0[1], c0[2], c0[3]), Z.clip());
    let r0 = Math.round((c0[2] * c0[3]) / 8e3);
    for (let b0 = 0; b0 < r0; b0++) {
      let d0 = c0[0] + w() * c0[2],
        V = c0[1] + w() * c0[3],
        B = v(4 + w() * 11),
        j = w() < 0.5,
        s0 = Z.createRadialGradient(d0, V, 0, d0, V, B);
      (s0.addColorStop(
        0,
        j
          ? `rgba(0,0,0,${0.05 + w() * 0.08})`
          : `rgba(255,248,236,${0.03 + w() * 0.045})`,
      ),
        s0.addColorStop(1, "rgba(0,0,0,0)"),
        (Z.fillStyle = s0),
        Z.fillRect(d0 - B, V - B, 2 * B, 2 * B));
    }
    Z.restore();
  }
  let et = [ss.BACK, ss.PALM, ss.THUMB],
    ct = h.y,
    D0 = h.ang,
    u0 = (V0) => {
      let c0 = new Float32Array(c);
      for (let Z = 0; Z < c; Z++) c0[Z] = V0 - ct[Z];
      return c0;
    };
  for (let V0 of $(ss.BACK, K("side"), 0.5, {
    a: xi.knitDk,
    r: 0.8,
    m: Ci.knitLo,
    h: 0.5,
  }))
    (C(V0.pts, {
      closed: V0.closed,
      sides: [-1],
      inset: -1.4,
      w: 0.9,
    }),
      _(
        {
          a: xi.piping,
          h: 0.8,
          r: 0.6,
          m: Ci.smooth,
        },
        V0.pts,
        0.75,
        {
          closed: V0.closed,
        },
      ),
      _(
        {
          a: "rgba(0,0,0,0.35)",
        },
        jb(V0.pts, v(0.75), V0.closed),
        0.5,
        {
          closed: V0.closed,
        },
      ));
  for (let V0 of et) {
    let c0 = e0(V0),
      Z = G(V0, u0(-0.0262), 0);
    (S(
      {
        a: xi.cuff,
        r: gc.cuff,
        m: Ci.knitLo,
        h: 0.5,
      },
      Z.path,
    ),
      E(
        Z.path,
        1.1,
        !0,
        [
          [0, 0.5, "rgba(255,255,255,0.03)", 0.57],
          [0.55, 0.9, "rgba(0,0,0,0.09)", 0.43],
        ],
        0.5,
      ));
    for (let r0 of $(V0, u0(-0.0452), 0, {
      a: xi.hem,
      r: gc.hem,
      m: Ci.smooth,
      h: 0.62,
    }))
      (_(
        {
          a: "rgba(0,0,0,0.32)",
        },
        r0.pts,
        0.9,
      ),
        R(r0.pts, {
          inset: 1.3,
          side: 1,
        }),
        R(r0.pts, {
          inset: 1.3,
          side: -1,
          col: xi.threadDk,
        }));
    for (let r0 of Z.lines())
      C(r0.pts, {
        sides: [1],
        inset: 1.2,
      });
  }
  for (let V0 of [ss.PALM, ss.THUMB])
    for (let c0 of [-0.0215, -0.015, -0.0085])
      for (let Z of n0(V0, ct, c0, (r0) => D0[r0.i] > 0.15 && D0[r0.i] < 3.05))
        (_(
          {
            h: 0.36,
            a: "rgba(0,0,0,0.18)",
          },
          Z.pts,
          1,
        ),
          R(Z.pts, {
            dash: [1.1, 0.7],
            w: 0.32,
            col: xi.threadDk,
          }));
  for (let V0 of [ss.BACK, ss.THUMB]) {
    let c0 = G(V0, K("strap"), 0.5),
      Z = e0(V0);
    (S(
      {
        a: xi.strap,
        r: gc.strap,
        m: Ci.web,
        h: 0.68,
      },
      c0.shape,
    ),
      E(c0.shape, 0.9, !1, [[0, 0.45, "rgba(255,255,255,0.04)", 0.73]], 0.68));
    for (let b0 of c0.lines())
      (_(
        {
          a: "rgba(0,0,0,0.4)",
        },
        b0.pts,
        1.2,
        {
          closed: b0.closed,
        },
      ),
        R(b0.pts, {
          closed: b0.closed,
          inset: -1.5,
        }));
    for (let b0 of n0(V0, D0, 3.72, (d0) => z(d0).strap > 0.6))
      R(b0.pts, {
        col: xi.accent,
        dash: [0.5, 0.35],
        w: 0.7,
      });
    let r0 = G(V0, K("tab"), 0.5);
    S(
      {
        a: xi.tab,
        r: gc.tab,
        m: Ci.smooth,
        h: 0.86,
      },
      r0.shape,
    );
    for (let b0 of r0.lines())
      (_(
        {
          a: "rgba(0,0,0,0.5)",
        },
        b0.pts,
        1.3,
        {
          closed: b0.closed,
        },
      ),
        _(
          {
            h: 0.95,
            a: "rgba(255,255,255,0.06)",
          },
          jb(b0.pts, -v(1), b0.closed),
          0.7,
          {
            closed: b0.closed,
          },
        ));
    for (let b0 of [5.42, 5.55, 5.68, 5.81])
      for (let d0 of n0(V0, D0, b0, (V) => z(V).tab > 0.3))
        _(
          {
            h: 0.99,
            a: "rgba(255,255,255,0.07)",
            r: 0.34,
          },
          d0.pts,
          1.1,
          {
            cap: "round",
          },
        );
  }
  for (let V0 of $(ss.PALM, K("loop"), 0.5, {
    a: xi.loop,
    r: gc.loop,
    m: Ci.web,
    h: 0.8,
  }))
    (_(
      {
        a: "rgba(0,0,0,0.42)",
      },
      V0.pts,
      1.1,
      {
        closed: V0.closed,
      },
    ),
      R(V0.pts, {
        closed: V0.closed,
        inset: -1.2,
        col: xi.accent,
      }));
  {
    let V0 = ss.BACK,
      c0 = G(V0, K("guard"), 0.42, {
        levels: 2,
      });
    S(
      {
        a: xi.rubber,
        r: gc.rubber,
        m: Ci.smooth,
        h: 0.6,
      },
      c0.shape,
    );
    let Z = G(
      V0,
      (r0) => {
        let b0 = z(r0);
        return b0.guard > 0.5
          ? b0.crown * Math.min(1, (b0.guard - 0.5) * 3.2) - b0.groove * 0.9
          : 0;
      },
      0.3,
      {
        levels: 2,
      },
    );
    (S(
      {
        h: 0.74,
        a: xi.rubberHi,
        r: 0.34,
      },
      Z.shape,
    ),
      E(Z.shape, 1.25, !0, [[0, 0.5, "rgba(255,255,255,0.035)", 0.86]], 0.74));
    for (let r0 of Z.lines())
      _(
        {
          a: "rgba(0,0,0,0.38)",
          h: 0.46,
        },
        r0.pts,
        0.8,
        {
          closed: r0.closed,
        },
      );
    for (let r0 of c0.lines())
      (_(
        {
          a: "rgba(0,0,0,0.5)",
        },
        r0.pts,
        1.7,
        {
          closed: r0.closed,
        },
      ),
        _(
          {
            h: 0.8,
            a: "rgba(255,255,255,0.05)",
          },
          jb(r0.pts, -v(1.5), r0.closed),
          1.3,
          {
            closed: r0.closed,
          },
        ),
        R(r0.pts, {
          closed: r0.closed,
          inset: 1.6,
        }));
  }
  for (let V0 of $(ss.PALM, K("heel"), 0.5, {
    a: xi.reinf,
    r: gc.reinf,
    m: Ci.suede,
    h: 0.66,
  }))
    (_(
      {
        a: "rgba(0,0,0,0.36)",
      },
      V0.pts,
      1.3,
      {
        closed: V0.closed,
      },
    ),
      R(V0.pts, {
        closed: V0.closed,
        inset: -1.1,
      }),
      R(V0.pts, {
        closed: V0.closed,
        inset: -2.4,
      }));
  for (let V0 of [0.017, 0.0295])
    for (let c0 of n0(ss.PALM, ct, V0, (Z) => z(Z).heel > 0.8))
      (_(
        {
          h: 0.44,
          a: "rgba(0,0,0,0.22)",
        },
        c0.pts,
        1.3,
      ),
        R(c0.pts, {
          w: 0.32,
          col: xi.threadDk,
        }));
  for (let V0 of et)
    for (let c0 of $(
      V0,
      K("saddle"),
      0.5,
      {
        a: xi.reinf,
        r: gc.reinf,
        m: Ci.suede,
        h: 0.64,
      },
      {
        levels: 2,
      },
    ))
      (_(
        {
          a: "rgba(0,0,0,0.30)",
        },
        c0.pts,
        1.5,
        {
          closed: c0.closed,
        },
      ),
        _(
          {
            h: 0.72,
          },
          jb(c0.pts, -v(0.9), c0.closed),
          1,
          {
            closed: c0.closed,
          },
        ));
  let w0 = n.key,
    P0 = n.NU,
    st = n.upCols.length,
    J0 = t.ND,
    q0 = (V0, c0, Z, r0, b0) => {
      let d0 = [];
      for (let V = r0; V <= b0; V++) d0.push(P(V0, w0(c0, V, Z)));
      return d0;
    };
  for (let V0 = 1; V0 <= 3; V0++)
    for (let [c0, Z, r0, b0, d0] of [
      [ss.BACK, n.G_UPB, 2 + 4 * J0 + 3 + J0 * V0, 4, 0.42],
      [ss.PALM, n.G_UP, 2 + J0 * V0, 3, 0.36],
    ]) {
      let V = P(c0, w0(Z, P0, r0)),
        B = P(c0, w0(Z, P0, r0 - 1)),
        j = P(c0, w0(Z, P0, r0 + 1)),
        s0 = P(c0, w0(Z, P0 - b0, r0)),
        l0 = [Nl(V[0], B[0], d0), Nl(V[1], B[1], d0) - v(1.5)],
        E0 = [Nl(V[0], j[0], d0), Nl(V[1], j[1], d0) - v(1.5)];
      (S(f0, (U) => J2(U, [l0, E0, s0], !0)),
        C([l0, s0, E0], {
          stitch: !1,
          w: 0.8,
        }));
    }
  for (let V0 of [...T0, j0]) {
    let c0 = V0 === j0 ? [0, lt, u] : V0.seams,
      Z = [];
    for (let r0 of c0) {
      let b0 = V0.col(r0, 1, V0.R - 3),
        d0 = 0;
      for (let V = 1; V < b0.length; V++) {
        let B = b0[V - 1],
          j = b0[V],
          s0 = Math.hypot(j[0] - B[0], j[1] - B[1]);
        if (((d0 += s0), d0 < v(2.3))) continue;
        d0 = w() * v(0.9);
        let l0 = (j[0] - B[0]) / s0,
          E0 = (j[1] - B[1]) / s0,
          U = v(1.5 + w() * 1.6),
          X = (w() - 0.5) * 0.8;
        Z.push([
          [j[0] - (E0 + l0 * X) * U, j[1] + (l0 - E0 * X) * U],
          [j[0] + (E0 - l0 * X) * U, j[1] - (l0 + E0 * X) * U],
        ]);
      }
    }
    T(
      {
        h: 0.44,
        a: "rgba(0,0,0,0.06)",
      },
      (r0) => {
        for (let b0 of Z)
          (r0.moveTo(b0[0][0], b0[0][1]), r0.lineTo(b0[1][0], b0[1][1]));
      },
      {
        w: v(0.55),
        cap: "round",
      },
    );
  }
  T0.forEach((V0, c0) => {
    for (let Z of V0.seams)
      C(V0.col(Z, 0, V0.R - 2), {
        inset: 0.95,
        w: 0.9,
      });
    if (c0 === 0) {
      let Z = V0.m,
        r0 = Z.joints[2] + 0.0045,
        b0 = Z.Ltot - 0.0035,
        d0 = V0.jOf(48),
        V = V0.jOf(132) + (V0.jOf(132) < V0.jOf(48) ? u : 0);
      for (let B of [0, -u]) {
        let j = [];
        for (let l0 = 0; l0 <= 10; l0++)
          j.push(V0.at(Nl(r0, b0, l0 / 10), d0 + B));
        for (let l0 = 10; l0 >= 0; l0--)
          j.push(V0.at(Nl(r0, b0, l0 / 10), V + B));
        let s0 = Yb(j, !0, 2);
        (S(
          {
            a: xi.touch,
            r: gc.touch,
            m: Ci.touch,
            h: 0.6,
          },
          (l0) => J2(l0, s0, !0),
        ),
          _(
            {
              a: "rgba(0,0,0,0.32)",
            },
            s0,
            1,
            {
              closed: !0,
            },
          ),
          R(s0, {
            closed: !0,
            inset: 0.9,
            col: xi.threadDk,
          }));
      }
    }
  });
  {
    (C(j0.col(lt, 0, j0.R - 2), {
      inset: 0.95,
      w: 0.9,
    }),
      C(j0.col(0, 0, j0.R - 2), {
        inset: 0.95,
        w: 0.9,
        sides: [-1],
      }),
      C(j0.col(u, 0, j0.R - 2), {
        inset: 0.95,
        w: 0.9,
        sides: [1],
      }),
      C(j0.ltCol(lt, 3), {
        inset: 0.95,
        w: 0.9,
      }));
    let V0 = j0.m,
      c0 = V0.joints[2] + 0.005,
      Z = V0.Ltot - 0.004,
      r0 = j0.jOf(40),
      b0 = j0.jOf(140),
      d0 = [];
    for (let B = 0; B <= 10; B++) d0.push(j0.at(Nl(c0, Z, B / 10), r0));
    for (let B = 10; B >= 0; B--) d0.push(j0.at(Nl(c0, Z, B / 10), b0));
    let V = Yb(d0, !0, 2);
    (S(
      {
        a: xi.touch,
        r: gc.touch,
        m: Ci.touch,
        h: 0.6,
      },
      (B) => J2(B, V, !0),
    ),
      _(
        {
          a: "rgba(0,0,0,0.32)",
        },
        V,
        1,
        {
          closed: !0,
        },
      ),
      R(V, {
        closed: !0,
        inset: 0.9,
        col: xi.threadDk,
      }));
  }
  (C(
    [
      ...q0(ss.BACK, n.G_LTB, n.lCut, 3, H0 - 1),
      ...q0(ss.BACK, n.G_UPB, n.cCut, 1, P0),
    ],
    {
      sides: [-1],
      inset: 1.1,
    },
  ),
    C(
      [
        ...q0(ss.PALM, n.G_LT, n.lCut, 3, H0 - 1),
        ...q0(ss.PALM, n.G_UP, n.cCut, 1, P0),
      ],
      {
        sides: [1],
        inset: 1.1,
      },
    ),
    C(q0(ss.BACK, n.G_UPB, st + 1, 0, P0), {
      sides: [1],
      inset: 1.1,
    }),
    C(q0(ss.PALM, n.G_UP, 1, 0, P0), {
      sides: [-1],
      inset: 1.1,
    }),
    C(q0(ss.BACK, n.G_LTB, n.lWd, 3, H0 - 1), {
      sides: [1],
      inset: 1.1,
    }),
    C(j0.ltCol(0, 3), {
      inset: 1,
      sides: [-1],
    }),
    C(q0(ss.PALM, n.G_LT, 0, 3, H0 - 1), {
      sides: [-1],
      inset: 1.1,
    }),
    C(j0.ltCol(Z0, 3), {
      inset: 1,
      sides: [1],
    }));
  let v0 = (V0, c0, Z, r0 = 0) => {
      (_(
        {
          c: 0.5 - Z,
        },
        V0,
        c0,
        {
          cap: "round",
        },
      ),
        r0 &&
          _(
            {
              a: `rgba(0,0,0,${r0})`,
            },
            V0,
            c0 * 0.7,
            {
              cap: "round",
            },
          ));
    },
    x0 = (V0, c0, Z) =>
      _(
        {
          c: 0.5 + Z,
        },
        V0,
        c0,
        {
          cap: "round",
        },
      ),
    C0 = (V0, c0, Z, r0, b0, d0 = 0, V = 14) => {
      let B = [],
        j = w() * 6.28;
      for (let s0 = 0; s0 <= V; s0++) {
        let l0 = s0 / V;
        B.push(
          V0.at(
            c0 + b0 * (1 - Math.pow(2 * l0 - 1, 2)) + d0 * Math.sin(j + l0 * 7),
            Nl(Z, r0, l0),
          ),
        );
      }
      return B;
    },
    k0 = (V0) => {
      let c0 = V0.m,
        Z = (B, j) => [V0.jOf(B), V0.jOf(j) + (V0.jOf(j) < V0.jOf(B) ? u : 0)],
        [r0, b0] = Z(36, 144),
        [d0, V] = Z(216, 324);
      for (let [B, j] of [
        [1, 1],
        [2, 0.8],
      ]) {
        let s0 = c0.joints[B];
        for (let l0 of [0, -u, u])
          for (let [E0, U] of [
            [r0, r0 - 3.6],
            [b0, b0 + 3.6],
          ])
            for (let [X, N] of [
              [-0.0042, 0.24],
              [-0.0012, 0.3],
              [0.0022, 0.26],
              [0.005, 0.18],
            ]) {
              let q = [];
              for (let o0 = 0; o0 <= 6; o0++) {
                let h0 = o0 / 6;
                q.push(
                  V0.at(
                    s0 + 3e-4 + X * j * h0 * (1.1 - 0.25 * h0),
                    Nl(E0, U, h0) + l0,
                  ),
                );
              }
              v0(q, (0.95 - 0.35 * 0) * j, N);
            }
        for (let l0 of [0, -u, u]) {
          (v0(
            C0(V0, s0 + 4e-4, r0 + l0, b0 + l0, -9e-4 * j, 15e-5),
            0.95 * j,
            0.4,
            0.07,
          ),
            v0(
              C0(
                V0,
                s0 - 0.0027 * j,
                r0 + l0 + 0.5,
                b0 + l0 - 0.6,
                -7e-4 * j,
                2e-4,
              ),
              0.8 * j,
              0.24,
              0.04,
            ),
            v0(
              C0(
                V0,
                s0 + 0.0031 * j,
                r0 + l0 + 0.7,
                b0 + l0 - 0.5,
                -6e-4 * j,
                2e-4,
              ),
              0.75 * j,
              0.2,
              0.03,
            ),
            x0(
              C0(V0, s0 - 0.0013 * j, r0 + l0 + 0.3, b0 + l0 - 0.3, -8e-4 * j),
              1.5 * j,
              0.16,
            ),
            x0(
              C0(V0, s0 + 0.0018 * j, r0 + l0 + 0.3, b0 + l0 - 0.3, -7e-4 * j),
              1.5 * j,
              0.13,
            ));
          let E0 = B === 1 ? [-0.004, -6e-4, 0.003] : [-0.0022, 0.0014];
          E0.forEach((U, X) => {
            let N = E0.length === 3 ? Math.abs(X - 1) : 0.6,
              q = (U < 0 ? -1 : 1) * 0.001 * (0.5 + N) * j,
              o0 = 0.5 + 1.1 * N + w() * 0.5;
            (v0(
              C0(
                V0,
                s0 + U * j,
                d0 + l0 + o0,
                V + l0 - o0 - w() * 0.4,
                q,
                25e-5,
              ),
              1.15 * j,
              0.42 - 0.08 * N,
            ),
              x0(
                C0(
                  V0,
                  s0 + (U + 0.0016) * j,
                  d0 + l0 + o0 + 0.3,
                  V + l0 - o0 - 0.3,
                  q,
                  2e-4,
                ),
                1.5 * j,
                0.22,
              ));
          });
        }
      }
    };
  (T0.forEach(k0), k0(j0));
  {
    let V0 = (r0, b0, d0, V, B, j = 0) => {
        let s0 = [];
        for (let l0 = V; l0 <= B; l0++) {
          let E0 = P(r0, w0(b0, d0, l0));
          s0.push([E0[0], E0[1] + v(j + 0.5 * Math.sin(l0 * 0.9 + d0))]);
        }
        return Yb(s0, !1, 2);
      },
      Z = 2 + 4 * J0;
    (v0(V0(ss.PALM, n.G_UP, P0 - 3, 3, Z - 1), 1.3, 0.36, 0.05),
      v0(V0(ss.PALM, n.G_UP, P0 - 6, 4, Z - 3), 1.1, 0.24, 0.03),
      x0(V0(ss.PALM, n.G_UP, P0 - 4, 3, Z - 1, 0.6), 2.2, 0.15),
      x0(V0(ss.PALM, n.G_UP, P0 - 2, 3, Z - 1), 2, 0.12));
    for (let [r0, b0] of [
      [n.NCUFF, 0.3],
      [n.NCUFF + 1, 0.18],
    ])
      (v0(V0(ss.PALM, n.G_LT, r0, 3, n.lCut - 4), 1.3, b0, 0.04),
        v0(V0(ss.BACK, n.G_LTB, r0, n.lCut + 5, n.lWd - 4), 1.4, b0 * 0.9));
    x0(V0(ss.BACK, n.G_LTB, n.NCUFF, n.lCut + 5, n.lWd - 4, 1.4), 2.2, 0.14);
  }
  {
    let V0 = [M.H, M.A],
      c0 = e0(ss.PALM, 0);
    for (let Z = 0; Z < 14; Z++) {
      let r0 = c0[0] + (0.15 + 0.7 * w()) * c0[2],
        b0 = c0[1] + (0.12 + 0.5 * w()) * c0[3],
        d0 = (w() - 0.5) * 0.9,
        V = v(5 + w() * 12),
        B = [];
      for (let j = 0; j <= 6; j++) {
        let s0 = j / 6 - 0.5;
        B.push([
          r0 + Math.cos(d0) * V * s0 + Math.sin(j * 1.3 + Z) * v(0.4),
          b0 + Math.sin(d0) * V * s0 + Math.cos(j * 1.7 + Z) * v(0.35),
        ]);
      }
      _(
        {
          h: 0.455,
        },
        Yb(B, !1, 2),
        1.5 + w() * 0.9,
        {
          cap: "round",
        },
      );
    }
  }
  {
    let V0 = e0(ss.BACK, 0),
      c0 = [];
    for (let [r0, b0] of k[ss.BACK].base) {
      let d0 = z(b0);
      d0.guard > 0.9 && d0.crown > 0.5 && c0.push(b0);
    }
    for (let r0 = 0; r0 < 90 && c0.length; r0++) {
      let b0 = c0[Math.floor(w() * c0.length)],
        d0 = w() * 6.28,
        V = v(0.8 + w() * 2.6),
        B = b0.x + (w() - 0.5) * v(3),
        j = b0.y + (w() - 0.5) * v(3);
      _(
        {
          a: `rgba(190,192,196,${0.05 + w() * 0.1})`,
          r: 0.62,
          h: 0.7,
        },
        [
          [B, j],
          [B + Math.cos(d0) * V, j + Math.sin(d0) * V],
        ],
        0.22 + w() * 0.3,
        {
          cap: "round",
        },
      );
    }
    let Z = M.A;
    for (let r0 of T0) {
      let b0 = r0.m,
        d0 = r0.jOf(270);
      for (let [V, B, j] of [
        [b0.joints[1], 5.5, 0.07],
        [b0.joints[2], 4.2, 0.05],
      ]) {
        let s0 = r0.at(V, d0),
          l0 = Z.createRadialGradient(s0[0], s0[1], 0, s0[0], s0[1], v(B));
        (l0.addColorStop(0, `rgba(225,225,222,${j})`),
          l0.addColorStop(1, "rgba(225,225,222,0)"),
          (Z.fillStyle = l0),
          Z.fillRect(s0[0] - v(B), s0[1] - v(B), 2 * v(B), 2 * v(B)));
      }
    }
  }
  {
    let V0 = M.A,
      c0 = (Z, r0, b0) => {
        let d0 = V0.createRadialGradient(Z[0], Z[1], 0, Z[0], Z[1], r0);
        (d0.addColorStop(0, b0),
          d0.addColorStop(1, "rgba(0,0,0,0)"),
          (V0.fillStyle = d0),
          V0.fillRect(Z[0] - r0, Z[1] - r0, 2 * r0, 2 * r0));
      };
    for (let Z of [...T0, j0]) {
      let r0 = Z.m,
        b0 = Z === j0 ? Z.jOf(90) : Z.jOf(90) + (Z.jOf(90) < 12 ? 0 : -u);
      for (let [d0, V, B] of [
        [r0.Ltot - 0.011, 5.5, 0.16],
        [(r0.joints[1] + r0.joints[2]) / 2, 5, 0.1],
        [r0.joints[1] * 0.62, 6, 0.08],
      ])
        for (let j of [0, u])
          c0(Z.at(d0, b0 + j), v(V), `rgba(255,244,228,${B})`);
    }
  }
  if (t.sleeve && t.sleeve.watch) {
    let V0 = t.sleeve.watch,
      c0 = V0.FACE,
      Z = c0.k,
      r0 = Math.PI * 2,
      b0 = "#2a2c30",
      d0 = "#383b40",
      V = "#56645a",
      B = "#161c18",
      j = (U0) => {
        let $0 = [];
        for (let g0 = 0; g0 < 72; g0++) {
          let G0 = (r0 * g0) / 72,
            K0 = Math.cos(G0),
            it = Math.sin(G0),
            ft = 0.62,
            gt = U0 * Math.sign(K0) * Math.pow(Math.abs(K0), ft),
            rt =
              ((U0 * V0.B) / V0.A) * Math.sign(it) * Math.pow(Math.abs(it), ft);
          $0.push([c0.cx + rt * Z, c0.cy - gt * Z]);
        }
        return $0;
      },
      s0 = (U0) => ($0) => J2($0, j(U0), !0);
    (S(
      {
        a: "#1d1f22",
        r: 0.55,
        m: Ci.smooth,
        h: 0.5,
      },
      (U0) => U0.rect(c0.cx - 1.9 * Z, c0.cy - 1.9 * Z, 3.8 * Z, 3.8 * Z),
    ),
      S(
        {
          a: b0,
          r: 0.5,
          h: 0.5,
        },
        s0(1.74),
      ));
    for (let U0 = 0; U0 < 36; U0++) {
      let $0 = (r0 * U0) / 36,
        g0 = Math.cos($0),
        G0 = Math.sin($0);
      _(
        {
          a: "rgba(0,0,0,0.25)",
          h: 0.4,
        },
        [
          [c0.cx + g0 * Z * 1.08, c0.cy + G0 * Z * 1.08],
          [c0.cx + g0 * Z * 1.7, c0.cy + G0 * Z * 1.7],
        ],
        0.5,
      );
    }
    (S(
      {
        a: d0,
        r: 0.42,
        h: 0.56,
      },
      s0(1),
    ),
      S(
        {
          a: "#8f9296",
          r: 0.3,
          h: 0.6,
          m: Ci.metal,
        },
        s0(0.9),
      ));
    for (let U0 = 0; U0 < 120; U0++) {
      let $0 = (r0 * U0) / 120 + w() * 0.02,
        g0 = Math.cos($0),
        G0 = Math.sin($0);
      _(
        {
          a: `rgba(${w() < 0.5 ? "255,255,255" : "0,0,0"},${0.05 + w() * 0.07})`,
          r: 0.24 + w() * 0.16,
        },
        [
          [c0.cx + g0 * Z * 0.78, c0.cy + G0 * Z * 0.8],
          [c0.cx + g0 * Z * 0.9, c0.cy + G0 * Z * 0.93],
        ],
        0.18,
      );
    }
    (_(
      {
        a: "rgba(255,255,255,0.10)",
        h: 0.7,
      },
      j(0.9),
      0.5,
      {
        closed: !0,
      },
    ),
      _(
        {
          a: "rgba(0,0,0,0.4)",
        },
        j(1),
        0.6,
        {
          closed: !0,
        },
      ));
    for (let [U0, $0] of [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]) {
      let g0 = c0.cx + U0 * 0.6 * Z,
        G0 = c0.cy + $0 * 0.585 * Z,
        K0 = 0.055 * Z;
      (S(
        {
          a: "#2a2c2f",
          r: 0.4,
          h: 0.5,
          m: Ci.smooth,
        },
        (it) => it.arc(g0, G0, K0 * 1.5, 0, r0),
      ),
        S(
          {
            a: "#a4a7ab",
            r: 0.26,
            h: 0.66,
            m: Ci.metal,
          },
          (it) => it.arc(g0, G0, K0, 0, r0),
        ),
        _(
          {
            a: "#1c1e20",
            h: 0.45,
          },
          [
            [g0 - K0 * 0.7, G0 - K0 * 0.3 * U0],
            [g0 + K0 * 0.7, G0 + K0 * 0.3 * U0],
          ],
          0.3,
        ));
    }
    for (let U0 of [0, 90, 180, 270]) {
      let $0 = (U0 * Math.PI) / 180,
        g0 = Math.cos($0),
        G0 = Math.sin($0);
      _(
        {
          a: "rgba(255,255,255,0.22)",
          h: 0.42,
        },
        [
          [c0.cx + g0 * Z * 0.8, c0.cy + G0 * Z * 0.82],
          [c0.cx + g0 * Z * 0.865, c0.cy + G0 * Z * 0.885],
        ],
        0.7,
        {
          cap: "round",
        },
      );
    }
    (S(
      {
        a: "#141517",
        r: 0.5,
        h: 0.42,
        m: Ci.smooth,
      },
      s0(0.775),
    ),
      S(
        {
          a: "#0c0d0e",
          r: 0.07,
          m: Ci.smooth,
          h: 0.5,
        },
        s0(0.7),
      ));
    let l0 = 0.86 * Z,
      E0 = 0.6 * Z,
      U = c0.cx - l0 / 2,
      X = c0.cy - E0 / 2 - 0.02 * Z,
      N = 0.07 * Z;
    (S(
      {
        a: V,
        r: 0.07,
      },
      (U0) => U0.roundRect(U, X, l0, E0, N),
    ),
      _(
        {
          a: "rgba(255,255,255,0.14)",
        },
        [
          [U + N, X + E0 + 0.07 * Z],
          [U + l0 - N, X + E0 + 0.07 * Z],
        ],
        0.35,
      ));
    let q = [
        [1, 1, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0, 1, 0],
        [1, 1, 0, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1],
      ],
      o0 = (U0, $0, g0, G0, K0) => {
        let it = Math.max(1.2, G0 * 0.19),
          ft = q[U0],
          gt = M.A;
        gt.fillStyle = B;
        let rt = (tt) => gt.fillRect($0 + it * 0.6, tt, G0 - it * 1.2, it),
          dt = (tt, X0) =>
            gt.fillRect(tt, X0 + it * 0.6, it, K0 / 2 - it * 1.2);
        (ft[0] && rt(g0),
          ft[3] && rt(g0 + K0 / 2 - it / 2),
          ft[6] && rt(g0 + K0 - it),
          ft[1] && dt($0, g0),
          ft[2] && dt($0 + G0 - it, g0),
          ft[4] && dt($0, g0 + K0 / 2),
          ft[5] && dt($0 + G0 - it, g0 + K0 / 2));
      },
      h0 = l0 * 0.155,
      y0 = E0 * 0.5,
      D = X + E0 * 0.4,
      W = U + l0 * 0.07;
    (o0(1, W, D, h0, y0),
      o0(8, W + h0 * 1.3, D, h0, y0),
      o0(4, W + h0 * 2.95, D, h0, y0),
      o0(7, W + h0 * 4.25, D, h0, y0),
      (M.A.fillStyle = B),
      M.A.fillRect(W + h0 * 2.58, D + y0 * 0.25, h0 * 0.16, h0 * 0.16),
      M.A.fillRect(W + h0 * 2.58, D + y0 * 0.65, h0 * 0.16, h0 * 0.16),
      o0(3, W + h0 * 5.6, D + y0 * 0.38, h0 * 0.62, y0 * 0.62),
      o0(2, W + h0 * 6.4, D + y0 * 0.38, h0 * 0.62, y0 * 0.62));
    for (let U0 = 0; U0 < 7; U0++)
      M.A.fillRect(
        U + l0 * 0.08 + U0 * l0 * 0.062,
        X + E0 * 0.13,
        l0 * 0.045,
        E0 * (U0 === 2 ? 0.16 : 0.07),
      );
    ((M.A.strokeStyle = B),
      (M.A.lineWidth = 1.2),
      M.A.strokeRect(U + l0 * 0.7, X + E0 * 0.11, l0 * 0.19, E0 * 0.15),
      M.A.fillRect(U + l0 * 0.72, X + E0 * 0.135, l0 * 0.1, E0 * 0.1));
    let Y = V0.STRAP,
      R0 = V0.BTN;
    (S(
      {
        a: b0,
        r: 0.52,
        m: Ci.smooth,
        h: 0.5,
      },
      (U0) => U0.rect(Y.x0 - 3, Y.y0 - 3, Y.w + 6, Y.h + 6),
    ),
      E(
        (U0) => U0.rect(Y.x0, Y.y0 + Y.h * 0.12, Y.w, Y.h * 0.76),
        0.9,
        !0,
        [
          [0, 0.5, "rgba(255,255,255,0.05)", 0.62],
          [0.5, 1, "rgba(0,0,0,0.2)", 0.4],
        ],
        0.5,
      ));
    for (let U0 = 0; U0 < 7; U0++)
      S(
        {
          a: "#0b0c0d",
          h: 0.2,
        },
        ($0) =>
          $0.arc(
            Y.x0 + Y.w * (0.12 + U0 * 0.125),
            Y.y0 + Y.h / 2,
            Y.h * 0.085,
            0,
            r0,
          ),
      );
    (_(
      {
        a: "rgba(255,255,255,0.08)",
        h: 0.66,
      },
      [
        [Y.x0, Y.y0 + Y.h * 0.08],
        [Y.x0 + Y.w, Y.y0 + Y.h * 0.08],
      ],
      0.4,
    ),
      _(
        {
          a: "rgba(255,255,255,0.08)",
          h: 0.66,
        },
        [
          [Y.x0, Y.y0 + Y.h * 0.92],
          [Y.x0 + Y.w, Y.y0 + Y.h * 0.92],
        ],
        0.4,
      ),
      S(
        {
          a: "#8a8d91",
          r: 0.34,
          m: Ci.metal,
          h: 0.5,
        },
        (U0) => U0.rect(R0.x0 - 3, R0.y0 - 3, R0.s + 6, R0.s + 6),
      ),
      E(
        (U0) => U0.rect(R0.x0, R0.y0, R0.s, R0.s),
        0.6,
        !0,
        [
          [0, 0.5, "rgba(255,255,255,0.08)", 0.7],
          [0.5, 1, "rgba(0,0,0,0.25)", 0.35],
        ],
        0.5,
      ));
  }
  let O0 = performance.now(),
    B0 = createCanvas(a),
    ot = B0.getContext("2d"),
    Q0 = createCanvas(a),
    nt = Q0.getContext("2d");
  ((ot.fillStyle = "#000"), ot.fillRect(0, 0, a, a));
  let L0 = (V0, c0, Z) => {
    ((nt.globalCompositeOperation = "source-over"),
      (nt.filter = Z ? `blur(${Z}px)` : "none"),
      nt.drawImage(V0, 0, 0),
      (nt.filter = "none"),
      (nt.globalCompositeOperation = "multiply"),
      (nt.fillStyle = c0),
      nt.fillRect(0, 0, a, a),
      (ot.globalCompositeOperation = "lighter"),
      ot.drawImage(Q0, 0, 0));
  };
  (L0(y.H, "#ff0000", e.blurH ?? 1.1),
    L0(y.R, "#00ff00", 0.6),
    L0(y.C, "#0000ff", e.blurC ?? 2.1));
  let ht = (V0, c0) => {
      let Z = new CanvasTexture(V0);
      return (
        (Z.colorSpace = c0 ? SRGBColorSpace : NoColorSpace),
        (Z.anisotropy = 8),
        (Z.generateMipmaps = !0),
        (Z.minFilter = LinearMipmapLinearFilter),
        (Z.wrapS = Z.wrapT = ClampToEdgeWrapping),
        Z
      );
    },
    pt = {
      albedo: ht(y.A, !0),
      data: ht(B0, !1),
      mask: ht(y.M, !1),
      detail: jZ(),
    };
  if (globalThis.GH_HANDS_DEBUG)
    pt.canvases = {
      albedo: y.A,
      data: B0,
      mask: y.M,
      height: y.H,
      crease: y.C,
      rough: y.R,
    };
  else for (let V0 of [y.H, y.R, y.C, Q0, _0]) V0.width = V0.height = 1;
  return (
    (pt.ms = {
      paint: +(O0 - s).toFixed(1),
      assemble: +(performance.now() - O0).toFixed(1),
    }),
    pt
  );
}
var RR = null;
function jZ() {
  if (RR) return RR;
  let o = 256,
    t = new Float32Array(o * o),
    e = new Float32Array(o * o),
    s = createRandom(4242),
    n = 32;
  for (let l = 0; l < o; l++)
    for (let c = 0; c < o; c++) {
      let h = (c % n) / n,
        f = Math.abs(2 * h - 1),
        u = l / 32,
        d = Math.cos(Math.PI * 2 * (u + 0.5 * f)),
        m = Math.pow(Math.sin(Math.PI * h), 0.7);
      t[l * o + c] = 0.42 * (0.5 + 0.5 * d) * m + 0.58 * m;
    }
  let i = new Float32Array(o * o);
  for (let l = 0; l < i.length; l++) i[l] = s();
  for (let l = 0; l < o; l++)
    for (let c = 0; c < o; c++) {
      let h = 0;
      for (let f = -1; f <= 1; f++)
        for (let u = -1; u <= 1; u++)
          h += i[((l + f + o) % o) * o + ((c + u + o) % o)];
      e[l * o + c] =
        (h / 9) * 0.7 +
        i[(((l >> 2) * 4) % o) * o + (((c >> 2) * 4) % o)] * 0.3;
    }
  let a = new Uint8Array(o * o * 4);
  for (let l = 0; l < o; l++)
    for (let c = 0; c < o; c++) {
      let h = l * o + c,
        f = l * o + ((c + 1) % o),
        u = l * o + ((c + o - 1) % o),
        d = ((l + 1) % o) * o + c,
        m = ((l + o - 1) % o) * o + c,
        p = (t[f] - t[u]) * 2.2,
        x = (t[d] - t[m]) * 2.2,
        g = (e[f] - e[u]) * 2.2,
        b = (e[d] - e[m]) * 2.2;
      ((a[h * 4] = Eu(128 - p * 127, 0, 255)),
        (a[h * 4 + 1] = Eu(128 - x * 127, 0, 255)),
        (a[h * 4 + 2] = Eu(128 - g * 127, 0, 255)),
        (a[h * 4 + 3] = Eu(128 - b * 127, 0, 255)));
    }
  let r = new DataTexture(a, o, o, RGBAFormat);
  return (
    (r.wrapS = r.wrapT = RepeatWrapping),
    (r.generateMipmaps = !0),
    (r.minFilter = LinearMipmapLinearFilter),
    (r.magFilter = LinearFilter),
    (r.anisotropy = 8),
    (r.needsUpdate = !0),
    (RR = r)
  );
}

export { $I, Kg, Wg, XI, ZI, ep, jI, qg, r5 };

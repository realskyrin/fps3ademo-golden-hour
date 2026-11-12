// scene/lighting.js: recovered from the verified GOLDEN HOUR release.
import { Color, Vector3 } from "../vendor/three-r180.js";
import { Ir, LightingVolume } from "../render/lighting-volume.js";
import { SUN_DIRECTION } from "./sky.js";

var w$ = 1;
var E$ = 1.25;
var T$ = 1;
var S$ = 0.44;
var _$ = 0.35;
var YD = [
  {
    name: "lobby",
    x0: -12,
    x1: 12,
    z0: -8,
    z1: 10,
    y1: 8.6,
    amb: [0.085, 0.068, 0.052],
  },
  {
    name: "bar",
    x0: -28,
    x1: -12,
    z0: -8,
    z1: 10,
    y1: 3.5,
    amb: [0.085, 0.054, 0.036],
  },
  {
    name: "restaurant",
    x0: -28,
    x1: -6,
    z0: -20,
    z1: -8,
    y1: 3.5,
    amb: [0.085, 0.064, 0.046],
  },
  {
    name: "service",
    x0: -6,
    x1: 6,
    z0: -20,
    z1: -8,
    y1: 3.5,
    amb: [0.05, 0.062, 0.075],
  },
  {
    name: "kitchen",
    x0: 6,
    x1: 28,
    z0: -20,
    z1: -8,
    y1: 3.5,
    amb: [0.06, 0.072, 0.085],
  },
  {
    name: "corridor",
    x0: 12,
    x1: 16,
    z0: -8,
    z1: 10,
    y1: 3.5,
    amb: [0.075, 0.062, 0.05],
  },
  {
    name: "conference",
    x0: 16,
    x1: 28,
    z0: -8,
    z1: 0,
    y1: 3.5,
    amb: [0.062, 0.066, 0.072],
  },
  {
    name: "suite",
    x0: 16,
    x1: 28,
    z0: 0,
    z1: 10,
    y1: 3.5,
    amb: [0.08, 0.062, 0.046],
  },
  {
    name: "upper",
    x0: -28,
    x1: 28,
    z0: -20,
    z1: 10,
    y1: 8.6,
    amb: [0.07, 0.058, 0.048],
  },
];
var R$ = [0.022, 0.032, 0.05];
var A$ = 0.4;
var Z9 = 0.5;
var k$ = 0.6;
var jD = {
  chandelier: [17, 19, 16761994, null],
  reception: [11, 9, 16747068, null],
  bar: [13, 12, 16748360, 2.2],
  restaurant: [13, 15, 16756848, 2.4],
  service: [10, 12, 12574975, 2.6],
  kitchen: [15, 19, 14084351, 2.9],
  conference: [11, 11, 14674431, 2.6],
  suite: [10, 11, 16754784, 2.2],
  pool: [15, 12, 3725004, null],
  fire: [26, 9, 16742946, null],
};
var $D = {
  marble: [0.7, 1, 0.97, 0.9],
  wood: [0.32, 0.86, 0.6, 0.38],
  carpet: [0.14, 0.7, 0.72, 0.85],
  stone: [0.55, 1, 0.9, 0.76],
  tile: [0.45, 1, 1, 1],
  metal: [0.4, 1, 0.95, 0.9],
  concrete: [0.4, 1, 1, 1],
  plaster: [0.7, 1, 0.96, 0.9],
  glass: [0.08, 1, 1, 1],
  fabric: [0.32, 1, 0.85, 0.7],
  ceramic: [0.6, 1, 1, 1],
  foliage: [0.16, 0.6, 0.9, 0.4],
  plastic: [0.3, 1, 1, 1],
  water: [0.06, 0.5, 0.9, 1],
};
var C$ = [
  [0, 1, 0, 0.9, 0.1, 0.16, 0.3],
  [0, 0.5, 0.866, 0.55, 0.5, 0.36, 0.3],
  [-0.866, 0.5, 0, 0.55, 0.36, 0.27, 0.27],
  [0.866, 0.5, 0, 0.55, 0.16, 0.2, 0.33],
  [0, 0.5, -0.866, 0.55, 0.13, 0.18, 0.33],
];
var ah = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
var Q9 = new Vector3();
var kw = new Color();
function bakeLighting(o, t) {
  let { scene: e, world: s, fx: n, gfx: i } = o,
    a = performance.now(),
    r = t.lights;
  ((t.sun.intensity = 8.6),
    (t.hemi.intensity = 0.06),
    t.hemi.color.setRGB(0.42, 0.56, 0.74),
    t.hemi.groundColor.setRGB(0.2, 0.13, 0.09),
    r.bounce && (e.remove(r.bounce.light), delete r.bounce));
  for (let S in jD) {
    let E = r[S];
    if (!E) continue;
    let [_, R, C, L] = jD[S];
    ((E.base = _),
      (E.light.intensity = _ * E.k),
      (E.light.distance = R),
      C !== null && E.light.color.setHex(C),
      L !== null && (E.light.position.y = L));
  }
  (e.fog && (e.fog.color.setRGB(0.3, 0.2, 0.15), (e.fog.density = 0.0062)),
    (e.environmentIntensity = 0.2));
  let l = new LightingVolume({
    x0: -30,
    y0: 0,
    z0: -22,
    nx: 60,
    ny: 9,
    nz: 46,
    s: 1,
  });
  (l.setOccluders(s.cols), l.markSolid());
  let c = l.x0 + l.nx,
    h = l.y0 + l.ny,
    f = l.z0 + l.nz,
    u = (S, E, _) => {
      for (let R of YD)
        if (S >= R.x0 && S < R.x1 && _ >= R.z0 && _ < R.z1 && E < R.y1)
          return R;
      return null;
    };
  for (let S = 0; S < l.nz; S++)
    for (let E = 0; E < l.ny; E++)
      for (let _ = 0; _ < l.nx; _++) {
        let R = l.idx(_, E, S);
        if (!l.valid[R]) continue;
        let C = l.x0 + _ + 0.5,
          L = l.y0 + E + 0.5,
          A = l.z0 + S + 0.5,
          O = R * 3,
          H = u(C, L, A),
          F = H ? H.amb : R$,
          P = H ? A$ : 1;
        ((l.A[O] = l.B[O] = F[0] * P),
          (l.A[O + 1] = l.B[O + 1] = F[1] * P),
          (l.A[O + 2] = l.B[O + 2] = F[2] * P));
        for (let z of C$) {
          let k = C + z[0] * 46,
            I = L + z[1] * 46,
            G = A + z[2] * 46,
            K = l.gather(
              Math.min(C, k),
              L,
              Math.min(A, G),
              Math.max(C, k),
              I,
              Math.max(A, G),
            );
          if (l.blocked(C, L, A, k, I, G, K)) continue;
          let $ = z[3] * S$,
            n0 = z[1] < 0.9 ? 0.45 : 0;
          ((l.A[O] += z[4] * $),
            (l.A[O + 1] += z[5] * $),
            (l.A[O + 2] += z[6] * $),
            (l.B[O] += z[4] * $ * n0),
            (l.B[O + 1] += z[5] * $ * n0),
            (l.B[O + 2] += z[6] * $ * n0));
        }
      }
  {
    let S = SUN_DIRECTION,
      E = new Vector3().crossVectors(S, new Vector3(0, 1, 0)).normalize(),
      _ = new Vector3().crossVectors(S, E),
      R = 0.8,
      C = new Map(),
      L = t.sun.intensity;
    kw.copy(t.sun.color);
    for (let A = -46; A <= 46; A += R)
      for (let O = -30; O <= 30; O += R) {
        let H = E.x * A + _.x * O + S.x * 130,
          F = 4 + E.y * A + _.y * O + S.y * 130,
          P = 1 + E.z * A + _.z * O + S.z * 130;
        if (!s.raycast(H, F, P, -S.x, -S.y, -S.z, 260, ah)) continue;
        let z = H - S.x * ah.t,
          k = F - S.y * ah.t,
          I = P - S.z * ah.t;
        if (
          z < l.x0 ||
          z > c ||
          k < -1.2 ||
          k > 8.3 ||
          I < l.z0 ||
          I > f ||
          ah.col.water
        )
          continue;
        let G = $D[ah.col.surf] || $D.concrete,
          K = ((L * R * R * G[0]) / Math.PI) * E$,
          $ =
            Math.floor(z / 2.2) +
            "," +
            Math.floor(k / 1.6) +
            "," +
            Math.floor(I / 2.2) +
            "," +
            ah.nx +
            ah.ny +
            ah.nz,
          n0 = C.get($);
        (n0 ||
          C.set(
            $,
            (n0 = {
              x: 0,
              y: 0,
              z: 0,
              n: 0,
              nx: ah.nx,
              ny: ah.ny,
              nz: ah.nz,
              r: 0,
              g: 0,
              b: 0,
            }),
          ),
          (n0.x += z),
          (n0.y += k),
          (n0.z += I),
          n0.n++,
          (n0.r += K * kw.r * G[1]),
          (n0.g += K * kw.g * G[2]),
          (n0.b += K * kw.b * G[3]));
      }
    for (let A of C.values()) {
      let O = 0.2126 * A.r + 0.7152 * A.g + 0.0722 * A.b;
      l.addPatch(
        A.x / A.n,
        A.y / A.n,
        A.z / A.n,
        Q9.set(A.nx, A.ny, A.nz),
        O + (A.r - O) * Z9,
        O + (A.g - O) * Z9,
        O + (A.b - O) * Z9,
        8.5,
      );
    }
    o.sunPatches = C.size;
  }
  let d = [
    [-20.5, 1.9, -7.85, 0, 0, 1, 9, 2.4, 1, 0.42, 0.12, 0.55, 9],
    [0, -0.1, 17.5, 0, 1, 0, 14, 6, 0.1, 0.62, 0.6, 0.3, 8],
    [0, 6.3, -7.9, 0, 0, 1, 7, 1.2, 1, 0.85, 0.7, 0.35, 9],
  ];
  for (let S of d) {
    let E = S[6] * S[7] * S[11];
    l.addPatch(
      S[0],
      S[1],
      S[2],
      Q9.set(S[3], S[4], S[5]),
      S[8] * E,
      S[9] * E,
      S[10] * E,
      S[12],
    );
  }
  let m = [],
    p = n._glowList || [];
  for (let S = 0; S < p.length; S++) {
    let E = p[S].color,
      _ = Math.max(E.r, E.g, E.b),
      R = E.r >= E.g && E.g >= E.b * 0.9,
      C = E.b >= E.r && E.g >= E.r * 0.85 && E.g <= E.b * 1.15;
    _ > 0 &&
      !R &&
      !C &&
      (E.multiplyScalar(0.4), n.setGlow(S, p[S].k === void 0 ? 1 : p[S].k));
  }
  for (let S = 0; S < p.length; S++) {
    let E = p[S],
      _ = E.pos;
    if (_.x < l.x0 || _.x > c || _.z < l.z0 || _.z > f || _.y > h) {
      m.push(-1);
      continue;
    }
    let R = Math.min(E.sx * E.sy, 30) * 0.3,
      C = R * T$,
      L = Math.max(3.5, Math.min(8.5, 3 + 1.6 * Math.sqrt(E.sx * E.sy))),
      A = 0.2126 * E.color.r + 0.7152 * E.color.g + 0.0722 * E.color.b,
      O = k$;
    m.push(
      l.addPatch(
        _.x,
        _.y,
        _.z,
        E.n,
        (A + (E.color.r - A) * O) * C,
        (A + (E.color.g - A) * O) * C,
        (A + (E.color.b - A) * O) * C,
        L,
        !0,
      ),
    );
  }
  let x = {};
  for (let S in r) {
    let E = r[S].light,
      _ = E.color,
      R = r[S].base * _$ * 0.12;
    x[S] = {
      id: l.addPatch(
        E.position.x,
        E.position.y,
        E.position.z,
        null,
        _.r * R,
        _.g * R,
        _.b * R,
        Math.min(9, E.distance),
        !0,
      ),
      last: 1,
    };
  }
  (l.fillSolid(),
    l.upload(),
    l.bind(w$),
    (Ir.ghLVK.value.z = 1),
    (Ir.ghLVK.value.w = 1),
    t.pool &&
      Ir.ghPool.value.set(
        (t.pool.x0 + t.pool.x1) / 2,
        (t.pool.z0 + t.pool.z1) / 2,
        (t.pool.x1 - t.pool.x0) / 2,
        (t.pool.z1 - t.pool.z0) / 2,
      ),
    r.chandelier &&
      Ir.ghChand.value.set(
        r.chandelier.light.position.x,
        r.chandelier.light.position.y + 0.6,
        r.chandelier.light.position.z,
        0,
      ));
  let g = n.setGlow.bind(n);
  n.setGlow = (S, E) => {
    g(S, E);
    let _ = m[S];
    _ !== void 0 && _ >= 0 && l.setSource(_, E);
  };
  let b = (S, E, _, R) => {
      let C = -1,
        L = R * R;
      for (let A = 0; A < p.length; A++) {
        let O = p[A].pos.distanceToSquared(Q9.set(S, E, _));
        O < L && ((L = O), (C = A));
      }
      return C;
    },
    v = b(0, 0, -14.25, 1.5),
    y = [];
  for (let [S, E, _, R, C] of [
    [17, 0, -14.3, "buzz", 0.55],
    [14, 2.2, -5.5, "dying", 0.8],
    [-9.5, 3.8, -6.5, "buzz", 0.5],
  ]) {
    let L = b(S, E, _, 2.6);
    L >= 0 &&
      n.flicker &&
      y.push(
        n.flicker({
          glows: [L],
          style: R,
          depth: C,
        }),
      );
  }
  let M = 0,
    w = 0,
    T = {
      volume: l,
      rooms: YD,
      roomAt: u,
      glowSrc: m,
      flick: y,
      bakeMs: 0,
      update(S) {
        ((M += S), (Ir.ghLVT.value.x = M));
        for (let E in x) {
          let _ = r[E];
          if (!_) continue;
          let R = _.base > 0 ? Math.min(1.5, _.light.intensity / _.base) : 0,
            C = x[E];
          Math.abs(R - C.last) > 0.2 &&
            ((C.last = R),
            l.setSource(C.id, R),
            E === "service" && v >= 0 && g(v, 0.25 + 0.75 * R));
        }
        (r.chandelier && (Ir.ghLVK.value.w = r.chandelier.k > 0.5 ? 1 : 0),
          r.pool && (Ir.ghLVK.value.z = r.pool.k),
          (w += S),
          w > 0.05 && ((w = 0), l.flush()));
      },
    };
  return (
    t.update.push((S) => T.update(S)),
    (n.lightVolume = l),
    (n.lighting = T),
    (t.lighting = T),
    (T.bakeMs = Math.round(performance.now() - a)),
    console.log(
      `[lighting] volume ${l.nx}x${l.ny}x${l.nz}, ${l.nb} occluders, ${o.sunPatches} sun patches, ${p.length} fittings, baked in ${T.bakeMs} ms`,
    ),
    T
  );
}

export { bakeLighting };

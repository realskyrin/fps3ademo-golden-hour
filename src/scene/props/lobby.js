// scene/props/lobby.js: recovered from the verified GOLDEN HOUR release.
import {
  $s,
  De,
  Dl,
  Eb,
  Fr,
  Hd,
  Jo,
  Qo,
  Sa,
  Te,
  _i,
  cu,
  di,
  dr,
  fi,
  hu,
  ke,
  ks,
  lc,
  ll,
  lw,
  oo,
  pe,
  q2,
  ra,
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
  lerp,
  smoothstep,
} from "../../core/math.js";
import { THREE } from "../../vendor/three-r180.js";

var Tn = Math.PI;
var go = Tn / 2;
var So = Math.sin;
var pi = Math.cos;
var Fd = (o) => (o * Tn) / 180;
var Nd = 2048;
var Bd = 1024;
var uu = {
  dial: [0, 0, 448, 448],
  ind: [0, 448, 448, 240],
  btnUp: [0, 688, 96, 96],
  btnDn: [96, 688, 96, 96],
  plq: [192, 688, 256, 96],
  name: [0, 784, 448, 56],
  rbadge: [0, 840, 224, 48],
  crest: [224, 840, 224, 96],
  cbadge: [0, 888, 160, 56],
  lock: [0, 944, 128, 80],
  burl: [448, 0, 512, 832],
  cloth: [960, 0, 256, 256],
  back: [960, 256, 384, 512],
  zip: [1216, 0, 256, 32],
  stitch: [1216, 40, 256, 16],
  satin: [1216, 80, 48, 48],
  feltRed: [1264, 80, 48, 48],
  steel: [1312, 80, 48, 48],
  copper: [1360, 80, 48, 48],
  feltWhite: [1408, 80, 48, 48],
  darkWood: [1456, 80, 48, 48],
  slot: [1504, 80, 48, 48],
  grey: [1552, 80, 48, 48],
  tri: [1232, 160, 32, 32],
  bi: [1312, 160, 32, 32],
  wound: [1392, 160, 32, 32],
  tag: [1344, 256, 160, 256],
  st1: [1504, 256, 224, 224],
  st2: [1728, 256, 304, 192],
  st3: [1504, 480, 240, 272],
};
var Ud = (o, t = 0) => {
  let [e, s, n, i] = uu[o];
  return hu(e + t, s + t, n - 2 * t, i - 2 * t, Nd, Bd);
};
function o$() {
  let o = createCanvas(Nd, Bd),
    t = o.getContext("2d"),
    e = createCanvas(Nd / 2, Bd / 2),
    s = e.getContext("2d");
  s.scale(0.5, 0.5);
  let n = createCanvas(Nd / 2, Bd / 2),
    i = n.getContext("2d");
  i.scale(0.5, 0.5);
  let a = (y, M) => `rgb(0,${(y * 255) | 0},${(M * 255) | 0})`,
    r = (y) => `rgb(${y},${y},${y})`;
  ((t.fillStyle = "#777"),
    t.fillRect(0, 0, Nd, Bd),
    (s.fillStyle = a(0.6, 0)),
    s.fillRect(0, 0, Nd, Bd),
    (i.fillStyle = r(128)),
    i.fillRect(0, 0, Nd, Bd));
  let l = createRandom(4711),
    c = 'Bahnschrift, "Segoe UI", Arial, sans-serif',
    h = '"Palatino Linotype", "Book Antiqua", Georgia, serif',
    f = (y, M = 600, w = c, T = "") => `${T} ${M} ${y}px ${w}`,
    u = (y, M, w, T) => {
      let [S, E, _, R] = uu[y];
      return (
        (t.fillStyle = M),
        t.fillRect(S, E, _, R),
        (s.fillStyle = a(w, T)),
        s.fillRect(S, E, _, R),
        [S, E, _, R]
      );
    },
    d = (y, M, w, T, S) => {
      ((t.fillStyle = t.strokeStyle = y),
        T(t),
        (s.fillStyle = s.strokeStyle = a(M, w)),
        T(s),
        S !== void 0 && ((i.fillStyle = i.strokeStyle = r(S)), T(i)));
    },
    m =
      (y, M, w, T, S = 0) =>
      (E) => {
        ((E.font = T),
          (E.textAlign = "center"),
          (E.textBaseline = "middle"),
          "letterSpacing" in E && (E.letterSpacing = S + "px"),
          E.fillText(y, M + S / 2, w),
          "letterSpacing" in E && (E.letterSpacing = "0px"));
      },
    p = (y, M, w, T, S, E, _) => {
      (y.save(),
        y.translate(w + pi(E) * S, T + So(E) * S),
        y.rotate(E + go),
        (y.font = _),
        (y.textAlign = "center"),
        (y.textBaseline = "middle"),
        y.fillText(M, 0, 0),
        y.restore());
    },
    x = (y, M, w, T, S, E, _, R = 1.5) => {
      for (let C = 0; C < S; C++)
        ((t.fillStyle = E),
          (t.globalAlpha = _ * l()),
          t.fillRect(y + l() * w, M + l() * T, 0.5 + l() * R, 0.5 + l() * R));
      t.globalAlpha = 1;
    };
  {
    let [y, M, w] = u("dial", "#22130a", 0.3, 0),
      T = y + w / 2,
      S = M + w / 2,
      E = w / 2 - 6,
      _ = t.createRadialGradient(T, S + 40, 10, T, S, E);
    (_.addColorStop(0, "#ffe6b0"),
      _.addColorStop(0.55, "#ffc878"),
      _.addColorStop(1, "#e58a34"),
      (t.fillStyle = _),
      t.beginPath(),
      t.arc(T, S, E, 0, TAU),
      t.fill());
    let R = "#2a1405",
      C = "#8a1a08",
      L = Tn * 0.78,
      A = Tn * 2.22,
      O = (F) => L + (A - L) * F;
    ((t.strokeStyle = R), (t.fillStyle = R), (t.lineCap = "butt"));
    for (let [F, P] of [
      [E - 8, 3],
      [E - 62, 1.5],
      [E - 118, 1.5],
      [70, 2],
    ])
      ((t.lineWidth = P), t.beginPath(), t.arc(T, S, F, 0, TAU), t.stroke());
    for (let F = 0; F <= 110; F++) {
      let P = O(F / 110),
        z = E - (F % 10 === 0 ? 40 : F % 5 === 0 ? 31 : 24);
      ((t.lineWidth = F % 10 === 0 ? 3 : 1.6),
        t.beginPath(),
        t.moveTo(T + pi(P) * (E - 12), S + So(P) * (E - 12)),
        t.lineTo(T + pi(P) * z, S + So(P) * z),
        t.stroke());
    }
    (["55", "60", "70", "80", "100", "120", "140", "160"].forEach((F, P) =>
      p(t, F, T, S, E - 51, O(0.02 + P * 0.137), f(21, 700)),
    ),
      (t.strokeStyle = C),
      (t.fillStyle = C));
    for (let F = 0; F <= 60; F++) {
      let P = O(F / 60);
      ((t.lineWidth = F % 5 === 0 ? 2.4 : 1.2),
        t.beginPath(),
        t.moveTo(T + pi(P) * (E - 66), S + So(P) * (E - 66)),
        t.lineTo(
          T + pi(P) * (E - (F % 5 === 0 ? 82 : 74)),
          S + So(P) * (E - (F % 5 === 0 ? 82 : 74)),
        ),
        t.stroke());
    }
    (["6", "7", "9", "11", "13", "15", "18"].forEach((F, P) =>
      p(t, F, T, S, E - 98, O(0.04 + P * 0.153), f(17, 700)),
    ),
      (t.fillStyle = R),
      ["PARIS", "ROMA", "WIEN", "LISBOA", "CAIRO", "OSLO", "RIO"].forEach(
        (F, P) => p(t, F, T, S, E - 134, O(0.05 + P * 0.15), f(12, 700)),
      ),
      p(t, "KC", T, S, E - 51, Tn * 0.5 + 0.34, f(13, 700)),
      (t.fillStyle = C),
      p(t, "MC", T, S, E - 98, Tn * 0.5 + 0.42, f(12, 700)),
      (t.fillStyle = R),
      m("Vespera", T, S + 112, f(30, 600, h, "italic"))(t),
      m("SUPERHETERODYNE", T, S + 140, f(10, 700), 2)(t));
    let H = t.createRadialGradient(T, S, E * 0.55, T, S, E);
    (H.addColorStop(0, "rgba(60,20,0,0)"),
      H.addColorStop(1, "rgba(60,20,0,0.42)"),
      (t.fillStyle = H),
      t.beginPath(),
      t.arc(T, S, E, 0, TAU),
      t.fill());
  }
  {
    let [y, M, w, T] = u("ind", "#070605", 0.28, 0),
      S = y + w / 2,
      E = M + T - 18,
      _ = "#ffb055";
    ((t.strokeStyle = _), (t.lineWidth = 2.5));
    for (let C of [204, 138])
      (t.beginPath(), t.arc(S, E, C, Tn, TAU), t.stroke());
    ((t.lineWidth = 2),
      t.beginPath(),
      t.moveTo(S - 204, E),
      t.lineTo(S + 204, E),
      t.stroke(),
      ["L", "8", "16", "24", "32", "40", "47"].forEach((C, L) => {
        let A = Tn + (Tn * (L + 0.5)) / 7;
        ((t.fillStyle = L === 6 ? "#fff0c8" : _),
          L === 6 &&
            (t.save(),
            (t.shadowColor = "#ffb055"),
            (t.shadowBlur = 14),
            p(t, C, S, E, 171, A, f(40, 700, h)),
            t.restore()),
          p(t, C, S, E, 171, A, f(L === 6 ? 40 : 34, 700, h)));
      }));
    for (let C = 0; C <= 7; C++) {
      let L = Tn + (Tn * C) / 7;
      ((t.lineWidth = 3),
        t.beginPath(),
        t.moveTo(S + pi(L) * 204, E + So(L) * 204),
        t.lineTo(S + pi(L) * 190, E + So(L) * 190),
        t.stroke(),
        t.beginPath(),
        t.moveTo(S + pi(L) * 138, E + So(L) * 138),
        t.lineTo(S + pi(L) * 150, E + So(L) * 150),
        t.stroke());
    }
    for (let C = 0; C < 28; C++) {
      let L = Tn + (Tn * (C + 0.5)) / 28;
      ((t.lineWidth = 1.5),
        t.beginPath(),
        t.moveTo(S + pi(L) * 138, E + So(L) * 138),
        t.lineTo(S + pi(L) * 131, E + So(L) * 131),
        t.stroke());
    }
    ((t.fillStyle = _), m("FLOOR", S, E - 78, f(15, 700), 6)(t));
  }
  for (let [y, M] of [
    ["btnUp", 1],
    ["btnDn", 0],
  ]) {
    let [w, T, S] = u(y, "#0b0908", 0.25, 0),
      E = w + S / 2,
      _ = T + S / 2,
      R = M ? 1 : -1,
      C = M ? "#ffc070" : "#5a3a1c";
    ((t.strokeStyle = C),
      (t.lineWidth = 5),
      t.beginPath(),
      t.arc(E, _, 36, 0, TAU),
      t.stroke(),
      (t.fillStyle = M ? "#ffe2a8" : "#6a4826"),
      t.beginPath(),
      t.moveTo(E, _ - 20 * R),
      t.lineTo(E + 19, _ + 13 * R),
      t.lineTo(E - 19, _ + 13 * R),
      t.closePath(),
      t.fill());
  }
  let g = (y) => {
    let [M, w, T, S] = u(y, "#cba660", 0.3, 1),
      E = t.createLinearGradient(M, w, M, w + S);
    (E.addColorStop(0, "rgba(255,240,200,0.14)"),
      E.addColorStop(1, "rgba(60,35,0,0.14)"),
      (t.fillStyle = E),
      t.fillRect(M, w, T, S));
    for (let _ = 0; _ < T * 1.2; _++)
      ((t.fillStyle =
        l() < 0.5 ? "rgba(255,245,215,0.05)" : "rgba(70,45,10,0.05)"),
        t.fillRect(M, w + l() * S, T, 1));
    return [M, w, T, S];
  };
  {
    let [y, M, w, T] = g("plq");
    d(
      "#231608",
      0.7,
      0,
      (S) => {
        ((S.lineWidth = 2),
          S.strokeRect(y + 7, M + 7, w - 14, T - 14),
          m("47", y + 62, M + T / 2 + 2, f(56, 700, h))(S),
          m("SKY LOBBY", y + 168, M + 36, f(19, 700), 3)(S),
          m("SOLSTICE HOTEL", y + 168, M + 62, f(11, 600), 2.5)(S),
          S.fillRect(y + 112, M + 49, 112, 1.5));
      },
      70,
    );
  }
  {
    let [y, M, w, T] = g("rbadge");
    d(
      "#231608",
      0.7,
      0,
      (S) => {
        ((S.lineWidth = 1.5),
          S.strokeRect(y + 5, M + 5, w - 10, T - 10),
          m("VESPERA", y + w / 2, M + T / 2 + 1, f(22, 700, h), 7)(S));
      },
      70,
    );
  }
  {
    let [y, M, w, T] = g("crest"),
      S = y + w / 2;
    d(
      "#231608",
      0.7,
      0,
      (E) => {
        ((E.lineWidth = 1.5),
          E.strokeRect(y + 5, M + 5, w - 10, T - 10),
          E.beginPath(),
          E.arc(S, M + 44, 13, Tn, TAU),
          E.fill());
        for (let _ = 0; _ < 9; _++) {
          let R = Tn + (Tn * (_ + 0.5)) / 9;
          ((E.lineWidth = 2),
            E.beginPath(),
            E.moveTo(S + pi(R) * 17, M + 44 + So(R) * 17),
            E.lineTo(
              S + pi(R) * (_ % 2 ? 26 : 31),
              M + 44 + So(R) * (_ % 2 ? 26 : 31),
            ),
            E.stroke());
        }
        (E.fillRect(S - 44, M + 47, 88, 2),
          m("SOLSTICE", S, M + 64, f(19, 700, h), 5)(E),
          m("HOTEL  \xB7  BELL SERVICE", S, M + 82, f(8, 700), 1.5)(E));
      },
      70,
    );
  }
  {
    let [y, M, w, T] = u("name", "rgb(14,14,16)", 0.18, 0);
    d("#d8b266", 0.28, 1, (S) => {
      (m("Morgenthal", y + 150, M + T / 2 + 1, f(40, 600, h, "italic"))(S),
        m("& S\xD6HNE", y + 338, M + T / 2 + 4, f(22, 600, h), 5)(S),
        S.fillRect(y + 262, M + T / 2 + 3, 16, 1.5));
    });
  }
  {
    let [y, M, w, T] = u("cbadge", "#c2c6ca", 0.3, 1);
    for (let S = 0; S < 90; S++)
      ((t.fillStyle =
        l() < 0.5 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"),
        t.fillRect(y, M + l() * T, w, 1));
    d(
      "#16171a",
      0.6,
      0,
      (S) => {
        ((S.lineWidth = 2),
          S.strokeRect(y + 5, M + 5, w - 10, T - 10),
          m("NORDAL", y + w / 2, M + T / 2 + 1, f(24, 700), 5)(S));
      },
      80,
    );
  }
  {
    let [y, M, w, T] = u("lock", "#141416", 0.5, 0);
    (["0", "4", "7"].forEach((S, E) => {
      let _ = y + 14 + E * 26;
      (d("#3a3b40", 0.4, 0.6, (R) => R.fillRect(_, M + 16, 22, 48)),
        (t.fillStyle = "rgba(0,0,0,0.45)"),
        t.fillRect(_, M + 16, 22, 9),
        t.fillRect(_, M + 55, 22, 9),
        (t.fillStyle = "#e8e6e0"),
        m(S, _ + 11, M + 41, f(20, 700))(t));
    }),
      d("#b9bcc2", 0.3, 1, (S) => {
        (S.beginPath(), S.arc(y + 108, M + 40, 11, 0, TAU), S.fill());
      }),
      (t.fillStyle = "#101012"),
      t.fillRect(y + 106, M + 33, 4, 14));
  }
  {
    let [y, M, w, T] = u("burl", "#6b3d18", 0.2, 0),
      S = w / 2,
      E = T / 2,
      _ = createNoise(77),
      R = createCanvas(S, E),
      C = R.getContext("2d"),
      L = C.createImageData(S, E),
      A = L.data;
    for (let O = 0; O < E; O++)
      for (let H = 0; H < S; H++) {
        let F = H < S / 2 ? H : S - 1 - H,
          P = F * 0.021,
          z = O * 0.0125,
          k = _.fbm(P * 1.3 + 3, z * 1.3 + 7, 4),
          I = _.fbm(P * 1.1 + 31, z * 1.6 + 2, 4),
          G = So((P * 1.6 + k * 10 + I * 5) * 3.3) * 0.5 + 0.5,
          K = _.fbm(P * 16, z * 3 + k * 5, 3),
          $ = Math.pow(_.fbm(P * 5.5 + 50, z * 5.5 + 50, 3), 3.2),
          n0 = clamp(0.5 * G + 0.34 * K + 0.22 * I - $ * 1.5 + 0.06, 0, 1),
          e0 = (O * S + H) * 4;
        ((A[e0] = lerp(52, 176, n0)),
          (A[e0 + 1] = lerp(25, 104, n0)),
          (A[e0 + 2] = lerp(9, 44, n0)),
          (A[e0 + 3] = 255));
      }
    (C.putImageData(L, 0, 0),
      (t.imageSmoothingQuality = "high"),
      t.drawImage(R, y, M, w, T));
    for (let O = 0; O < 2600; O++) {
      let H = y + l() * w,
        F = M + l() * T;
      ((t.fillStyle = `rgba(30,12,2,${0.1 + l() * 0.18})`),
        t.fillRect(H, F, 1, 3 + l() * 9));
    }
    ((t.fillStyle = "rgba(20,8,0,0.55)"),
      t.fillRect(y + w / 2 - 0.75, M, 1.5, T));
  }
  {
    let [y, M, w, T] = u("cloth", "#7a5d30", 0.86, 0),
      S = t.createImageData(w, T),
      E = S.data,
      _ = i.createImageData(w / 2, T / 2);
    for (let R = 0; R < T; R++)
      for (let C = 0; C < w; C++) {
        let L = C >> 2,
          A = R >> 2,
          O = (L + A) & 1,
          H = So(O ? ((R & 3) / 3) * Tn : ((C & 3) / 3) * Tn),
          F = Math.abs((C % 64) - 32) + Math.abs((R % 64) - 32),
          P = (F > 21 && F < 27) || F < 7 ? 0.7 : 1,
          k =
            L % 8 === 3 && !O
              ? [205, 170, 96]
              : O
                ? [150, 116, 60]
                : [104, 78, 40],
          I = (0.62 + 0.38 * H) * P * (0.92 + 0.16 * l()),
          G = (R * w + C) * 4;
        if (
          ((E[G] = k[0] * I),
          (E[G + 1] = k[1] * I),
          (E[G + 2] = k[2] * I),
          (E[G + 3] = 255),
          !(C & 1) && !(R & 1))
        ) {
          let K = ((R >> 1) * (w / 2) + (C >> 1)) * 4,
            $ = 70 + 150 * H;
          ((_.data[K] = _.data[K + 1] = _.data[K + 2] = $),
            (_.data[K + 3] = 255));
        }
      }
    (t.putImageData(S, y, M), i.putImageData(_, y / 2, M / 2));
  }
  {
    let [y, M, w, T] = u("back", "#5c452c", 0.92, 0);
    (x(y, M, w, T, 9e3, "#2a1c0e", 0.5, 2.2),
      x(y, M, w, T, 5e3, "#9a7a52", 0.4, 2));
    for (let S = 0; S < 7; S++)
      for (let E = 0; E < 12; E++) {
        let _ = y + 60 + E * 24 + (S % 2) * 12,
          R = M + 60 + S * 22;
        ((t.fillStyle = "#080604"),
          t.beginPath(),
          t.arc(_, R, 6.5, 0, TAU),
          t.fill(),
          (t.strokeStyle = "rgba(160,130,90,0.35)"),
          (t.lineWidth = 1),
          t.beginPath(),
          t.arc(_, R + 0.8, 6.5, 0.2, Tn - 0.2),
          t.stroke());
      }
    ((t.fillStyle = "#e4d6b2"),
      t.fillRect(y + 82, M + 300, 220, 104),
      (t.strokeStyle = "#3a2a16"),
      (t.lineWidth = 2),
      t.strokeRect(y + 88, M + 306, 208, 92),
      (t.fillStyle = "#3a2412"),
      m("Vespera", y + 192, M + 326, f(22, 600, h, "italic"))(t),
      m("RADIO CORPORATION", y + 192, M + 346, f(9, 700), 2)(t),
      m(
        "MODEL 37-C   \xB7   110-125 V ~ 50/60 C/S   \xB7   85 W",
        y + 192,
        M + 364,
        f(8, 700),
      )(t),
      m("SERIAL No.  204417", y + 192, M + 380, f(10, 700), 1)(t),
      x(y + 82, M + 300, 220, 104, 500, "#8a6a3c", 0.35, 2));
    for (let [S, E] of [
      [18, 18],
      [w - 18, 18],
      [18, T - 18],
      [w - 18, T - 18],
      [w / 2, 18],
      [w / 2, T - 18],
    ])
      (d(
        "#9a9488",
        0.45,
        1,
        (_) => {
          (_.beginPath(), _.arc(y + S, M + E, 7, 0, TAU), _.fill());
        },
        190,
      ),
        (t.fillStyle = "#2a2622"),
        t.fillRect(y + S - 6, M + E - 1, 12, 2));
  }
  {
    let [y, M, w, T] = u("zip", "#161618", 0.86, 0);
    for (let S = 0; S < w; S += 2)
      ((t.fillStyle = `rgba(255,255,255,${0.03 + 0.03 * l()})`),
        t.fillRect(y + S, M, 1, T));
    ((i.fillStyle = r(110)), i.fillRect(y, M, w, T));
    for (let S = 0; S < w / 8; S++) {
      let E = y + S * 8 + 1.5,
        _ = S & 1;
      (d(
        "#a4a7ae",
        0.36,
        1,
        (R) => {
          R.fillRect(E, M + (_ ? 9 : 13), 5, 10);
        },
        230,
      ),
        (t.fillStyle = "rgba(255,255,255,0.35)"),
        t.fillRect(E, M + (_ ? 9 : 13), 5, 2),
        (t.fillStyle = "rgba(0,0,0,0.4)"),
        t.fillRect(E + 4, M + (_ ? 9 : 13), 1, 10));
    }
  }
  {
    let [y, M, w, T] = uu.stitch;
    (t.clearRect(y - 4, M - 6, w + 8, T + 12),
      (s.fillStyle = a(0.8, 0)),
      s.fillRect(y - 4, M - 6, w + 8, T + 12));
    for (let S = 0; S < w / 16; S++) {
      let E = y + S * 16 + 8;
      d(
        "#e2cf9c",
        0.8,
        0,
        (_) => {
          (_.save(),
            _.translate(E, M + T / 2),
            _.rotate(-0.16),
            _.beginPath(),
            _.roundRect(-5.5, -2.6, 11, 5.2, 2.4),
            _.fill(),
            _.restore());
        },
        215,
      );
    }
  }
  for (let [y, M, w, T] of [
    ["satin", "rgb(15,15,17)", 0.36, 0],
    ["feltRed", "#8e1418", 1, 0],
    ["steel", "#b9bec4", 0.32, 1],
    ["copper", "#b87248", 0.38, 1],
    ["feltWhite", "#d9d3c2", 1, 0],
    ["darkWood", "#33200f", 0.55, 0],
    ["slot", "#050505", 0.9, 0],
    ["grey", "#5a5c60", 0.7, 0],
  ])
    u(y, M, w, T);
  let b = (y, M, w, T, S, E) => {
    let _ = t.createLinearGradient(y, 0, y + w, 0);
    (_.addColorStop(0, S),
      _.addColorStop(0.45, E),
      _.addColorStop(1, S),
      (t.fillStyle = _),
      t.fillRect(y, M, w, T));
  };
  {
    let [y, M] = uu.tri;
    (t.clearRect(y - 16, M - 16, 64, 64),
      (s.fillStyle = a(0.3, 1)),
      s.fillRect(y - 16, M - 16, 64, 64));
    for (let w of [5, 16, 27])
      b(y + w - 3, M - 16, 6, 64, "#70757c", "#eef1f4");
  }
  {
    let [y, M] = uu.bi;
    (t.clearRect(y - 16, M - 16, 64, 64),
      (s.fillStyle = a(0.4, 1)),
      s.fillRect(y - 16, M - 16, 64, 64));
    for (let w of [7, 25]) b(y + w - 6, M - 16, 12, 64, "#5e2f18", "#e09a68");
  }
  {
    let [y, M] = uu.wound;
    ((s.fillStyle = a(0.4, 1)),
      s.fillRect(y - 16, M - 16, 64, 64),
      b(y, M - 16, 32, 64, "#58290f", "#e3a070"),
      (t.fillStyle = "#58290f"),
      t.fillRect(y - 16, M - 16, 16, 64),
      t.fillRect(y + 32, M - 16, 16, 64));
    for (let w = -16; w < 48; w += 3)
      ((t.fillStyle = "rgba(40,14,0,0.35)"), t.fillRect(y, M + w, 32, 1));
  }
  {
    let [y, M, w, T] = uu.tag;
    (t.clearRect(y, M, w, T),
      (s.fillStyle = a(0.9, 0)),
      s.fillRect(y, M, w, T));
    let S = (E) => {
      (E.beginPath(),
        E.moveTo(y + 44, M + 6),
        E.lineTo(y + w - 44, M + 6),
        E.lineTo(y + w - 8, M + 50),
        E.lineTo(y + w - 8, M + T - 16),
        E.quadraticCurveTo(y + w - 8, M + T - 6, y + w - 18, M + T - 6),
        E.lineTo(y + 18, M + T - 6),
        E.quadraticCurveTo(y + 8, M + T - 6, y + 8, M + T - 16),
        E.lineTo(y + 8, M + 50),
        E.closePath());
    };
    ((t.fillStyle = "#e6d9b8"),
      S(t),
      t.fill(),
      t.save(),
      S(t),
      t.clip(),
      x(y, M, w, T, 1400, "#a08a5c", 0.3, 2.4),
      (t.fillStyle = "#9c2a1a"),
      t.fillRect(y + 8, M + 62, w - 16, 30),
      (t.fillStyle = "#f2e6c8"),
      m("SOLSTICE", y + w / 2, M + 78, f(19, 700, h), 4)(t),
      (t.fillStyle = "#4a3a22"),
      m("GUEST LUGGAGE", y + w / 2, M + 106, f(10, 700), 2)(t),
      (t.strokeStyle = "#7a6a48"),
      (t.lineWidth = 1));
    for (let E of [140, 172, 204])
      (t.beginPath(),
        t.moveTo(y + 20, M + E),
        t.lineTo(y + w - 20, M + E),
        t.stroke());
    ((t.fillStyle = "#6a5a3a"),
      (t.font = f(7, 700)),
      (t.textAlign = "left"),
      t.fillText("NAME", y + 20, M + 148),
      t.fillText("ROOM", y + 20, M + 180),
      t.fillText("ONWARD TO", y + 20, M + 212),
      (t.strokeStyle = "#1c2a55"),
      (t.lineWidth = 1.8),
      (t.lineJoin = "round"));
    for (let [E, _] of [
      [134, 9],
      [166, 4],
      [198, 7],
    ]) {
      t.beginPath();
      let R = y + 30;
      t.moveTo(R, M + E);
      for (let C = 0; C < _ * 3; C++)
        ((R += 3.6 + l() * 2.5),
          t.lineTo(R, M + E - 8 * l() + (C % 3 === 1 ? 5 : 0)));
      t.stroke();
    }
    (t.restore(),
      d("#c9a45e", 0.3, 1, (E) => {
        (E.beginPath(),
          E.arc(y + w / 2, M + 30, 11, 0, TAU),
          E.arc(y + w / 2, M + 30, 6, 0, TAU, !0),
          E.fill("evenodd"));
      }),
      t.save(),
      (t.globalCompositeOperation = "destination-out"),
      t.beginPath(),
      t.arc(y + w / 2, M + 30, 6, 0, TAU),
      t.fill(),
      t.restore());
  }
  let v = (y, M, w, T, S) => {
    for (let E = 0; E < S; E++) {
      ((t.strokeStyle = `rgba(${(150 + l() * 60) | 0},${(110 + l() * 40) | 0},${(70 + l() * 30) | 0},${0.25 + l() * 0.4})`),
        (t.lineWidth = 0.6 + l() * 1.6));
      let _ = y + l() * w,
        R = M + l() * T,
        C = l() * TAU,
        L = 3 + l() * 16;
      (t.beginPath(),
        t.moveTo(_, R),
        t.lineTo(_ + pi(C) * L, R + So(C) * L),
        t.stroke());
    }
  };
  {
    let [y, M, w, T] = uu.st1,
      S = y + w / 2,
      E = M + T / 2;
    (t.clearRect(y, M, w, T),
      (s.fillStyle = a(0.7, 0)),
      s.fillRect(y, M, w, T),
      t.save(),
      t.beginPath(),
      t.arc(S, E, 108, 0, TAU),
      t.clip(),
      (t.fillStyle = "#0f5560"),
      t.fillRect(y, M, w, T),
      (t.fillStyle = "#efe2bd"),
      t.beginPath(),
      t.arc(S, E, 74, 0, TAU),
      t.fill());
    let _ = t.createLinearGradient(0, E - 70, 0, E + 30);
    (_.addColorStop(0, "#f4b03a"),
      _.addColorStop(1, "#d6482a"),
      (t.fillStyle = _),
      t.beginPath(),
      t.arc(S, E, 68, 0, TAU),
      t.fill(),
      (t.fillStyle = "#f9df9a"),
      t.beginPath(),
      t.arc(S, E + 12, 26, Tn, TAU),
      t.fill(),
      (t.strokeStyle = "#f9df9a"),
      (t.lineWidth = 3));
    for (let L = 0; L < 9; L++) {
      let A = Tn + (Tn * (L + 0.5)) / 9;
      (t.beginPath(),
        t.moveTo(S + pi(A) * 32, E + 12 + So(A) * 32),
        t.lineTo(S + pi(A) * 62, E + 12 + So(A) * 62),
        t.stroke());
    }
    ((t.fillStyle = "#0f3a4a"),
      t.fillRect(S - 70, E + 12, 140, 60),
      (t.strokeStyle = "#5fb8b4"),
      (t.lineWidth = 2));
    for (let L = 0; L < 4; L++)
      (t.beginPath(),
        t.moveTo(S - 60 + L * 9, E + 24 + L * 11),
        t.lineTo(S + 60 - L * 9, E + 24 + L * 11),
        t.stroke());
    t.fillStyle = "#f3e7c4";
    let R = "GRAND HOTEL AURELIA",
      C = "RIVIERA";
    for (let L = 0; L < R.length; L++)
      p(
        t,
        R[L],
        S,
        E,
        90,
        Tn * 1.5 + (L - (R.length - 1) / 2) * 0.132,
        f(17, 700),
      );
    for (let L = 0; L < C.length; L++) {
      let A = Tn * 0.5 - (L - (C.length - 1) / 2) * 0.17;
      (t.save(),
        t.translate(S + pi(A) * 91, E + So(A) * 91),
        t.rotate(A - go),
        (t.font = f(17, 700)),
        (t.textAlign = "center"),
        (t.textBaseline = "middle"),
        t.fillText(C[L], 0, 0),
        t.restore());
    }
    (v(y, M, w, T, 150), t.restore());
  }
  {
    let [y, M, w, T] = u("st2", "#eadcb6", 0.7, 0),
      S = t.createLinearGradient(0, M + 10, 0, M + T - 10);
    (S.addColorStop(0, "#f0a030"),
      S.addColorStop(0.62, "#d2452a"),
      S.addColorStop(0.63, "#14345a"),
      S.addColorStop(1, "#0c2140"),
      (t.fillStyle = S),
      t.fillRect(y + 10, M + 10, w - 20, T - 20),
      (t.fillStyle = "#10161f"),
      t.beginPath(),
      t.moveTo(y + 54, M + 106),
      t.lineTo(y + 262, M + 106),
      t.lineTo(y + 240, M + 132),
      t.lineTo(y + 76, M + 132),
      t.closePath(),
      t.fill(),
      t.fillRect(y + 96, M + 92, 130, 14));
    for (let E of [116, 152, 188])
      ((t.fillStyle = "#b3261a"),
        t.fillRect(y + E, M + 64, 18, 28),
        (t.fillStyle = "#10161f"),
        t.fillRect(y + E, M + 64, 18, 7));
    ((t.fillStyle = "#f6e9c6"),
      m("TRANSATLANTIQUE", y + w / 2, M + 36, f(21, 700), 3)(t),
      m(
        "S.S. AURORE   \xB7   LE HAVRE \u2014 NEW YORK",
        y + w / 2,
        M + 160,
        f(11, 700),
        1,
      )(t),
      v(y, M, w, T, 170));
  }
  {
    let [y, M, w, T] = uu.st3,
      S = y + w / 2;
    (t.clearRect(y, M, w, T),
      (s.fillStyle = a(0.7, 0)),
      s.fillRect(y, M, w, T));
    let E = () => {
      (t.beginPath(),
        t.moveTo(y + 14, M + 10),
        t.lineTo(y + w - 14, M + 10),
        t.lineTo(y + w - 14, M + 150),
        t.quadraticCurveTo(y + w - 14, M + 226, S, M + T - 8),
        t.quadraticCurveTo(y + 14, M + 226, y + 14, M + 150),
        t.closePath());
    };
    (t.save(),
      E(),
      t.clip(),
      (t.fillStyle = "#14233f"),
      t.fillRect(y, M, w, T),
      (t.fillStyle = "#e9a23a"),
      t.beginPath(),
      t.arc(S, M + 150, 42, Tn, TAU),
      t.fill(),
      (t.strokeStyle = "#e9a23a"),
      (t.lineWidth = 4));
    for (let _ = 0; _ < 11; _++) {
      let R = Tn + (Tn * (_ + 0.5)) / 11;
      (t.beginPath(),
        t.moveTo(S + pi(R) * 50, M + 150 + So(R) * 50),
        t.lineTo(
          S + pi(R) * (_ % 2 ? 76 : 92),
          M + 150 + So(R) * (_ % 2 ? 76 : 92),
        ),
        t.stroke());
    }
    ((t.fillStyle = "#c7772c"),
      t.fillRect(y, M + 150, w, 6),
      (t.fillStyle = "#f1dfb4"),
      m("SOLSTICE", S, M + 182, f(30, 700, h), 4)(t),
      m("HOTEL & SKY LOUNGE", S, M + 208, f(11, 700), 2.5)(t),
      m("47", S, M + 236, f(20, 700, h))(t),
      (t.strokeStyle = "#d9b566"),
      (t.lineWidth = 5),
      E(),
      t.stroke(),
      v(y, M, w, T, 150),
      t.restore());
  }
  return {
    map: ll(o),
    orm: ll(e, {
      srgb: !1,
    }),
    nrm: ll(Hd(n, 2.4, !1), {
      srgb: !1,
    }),
  };
}
function Od() {
  let o = [],
    t = [],
    e = {
      tri(s, n, i, a, r, l) {
        return (
          o.push(s[0], s[1], s[2], n[0], n[1], n[2], i[0], i[1], i[2]),
          a
            ? t.push(a[0], a[1], r[0], r[1], l[0], l[1])
            : t.push(0, 0, 0, 0, 0, 0),
          e
        );
      },
      quad(s, n, i, a, r) {
        return (
          r
            ? (e.tri(s, n, i, [r[0], r[1]], [r[2], r[1]], [r[2], r[3]]),
              e.tri(s, i, a, [r[0], r[1]], [r[2], r[3]], [r[0], r[3]]))
            : (e.tri(s, n, i), e.tri(s, i, a)),
          e
        );
      },
      obox(s, n, i, a, r = "xXyYzZ", l) {
        let c = (h, f, u) => [
          s[0] + h * n[0] + f * i[0] + u * a[0],
          s[1] + h * n[1] + f * i[1] + u * a[1],
          s[2] + h * n[2] + f * i[2] + u * a[2],
        ];
        return (
          r.includes("Y") &&
            e.quad(c(-1, 1, 1), c(1, 1, 1), c(1, 1, -1), c(-1, 1, -1), l),
          r.includes("y") &&
            e.quad(c(-1, -1, -1), c(1, -1, -1), c(1, -1, 1), c(-1, -1, 1), l),
          r.includes("X") &&
            e.quad(c(1, -1, 1), c(1, -1, -1), c(1, 1, -1), c(1, 1, 1), l),
          r.includes("x") &&
            e.quad(c(-1, -1, -1), c(-1, -1, 1), c(-1, 1, 1), c(-1, 1, -1), l),
          r.includes("Z") &&
            e.quad(c(-1, -1, 1), c(1, -1, 1), c(1, 1, 1), c(-1, 1, 1), l),
          r.includes("z") &&
            e.quad(c(1, -1, -1), c(-1, -1, -1), c(-1, 1, -1), c(1, 1, -1), l),
          e
        );
      },
      geo(s) {
        let n = new THREE.BufferGeometry();
        return (
          n.setAttribute("position", new THREE.Float32BufferAttribute(o, 3)),
          n.setAttribute("uv", new THREE.Float32BufferAttribute(t, 2)),
          n.computeVertexNormals(),
          s ? pe(n, s) : n
        );
      },
    };
  return e;
}
function N9(o, { caps: t = !0, deg: e = 45 } = {}) {
  let s = o[0].length,
    n = [],
    i = [];
  for (let l of o) for (let c of l) n.push(c[0], c[1], c[2]);
  for (let l = 0; l < o.length - 1; l++)
    for (let c = 0; c < s; c++) {
      let h = l * s + c,
        f = l * s + ((c + 1) % s),
        u = (l + 1) * s + ((c + 1) % s),
        d = (l + 1) * s + c;
      i.push(h, f, u, h, u, d);
    }
  let a = (o.length - 1) * s;
  for (let l = 1; l < s - 1; l++)
    (i.push(0, l + 1, l), i.push(a, a + l, a + l + 1));
  let r = new THREE.BufferGeometry();
  if (
    (r.setAttribute("position", new THREE.Float32BufferAttribute(n, 3)),
    r.setIndex(i),
    (r = r.toNonIndexed()),
    Eb(r) < 0 && q2(r),
    !t)
  ) {
    let l = r.attributes.position.array.slice(
      0,
      o.length > 1 ? (o.length - 1) * s * 18 : 0,
    );
    ((r = new THREE.BufferGeometry()),
      r.setAttribute("position", new THREE.BufferAttribute(l, 3)));
  }
  return (r.computeVertexNormals(), pe(r, e));
}
var i$ = (o, t, e = 0.004, s = 0, n = 0, i = o) => {
  let a = Math.max(o - e, o * 0.3),
    r = Math.max(i - e, i * 0.3);
  return [
    [o, -r],
    [o, r],
    [a, i],
    [-a, i],
    [-o, r],
    [-o, -r],
    [-a, -i],
    [a, -i],
  ].map(([l, c]) => [l + s, t, c + n]);
};
var Lb = (o, t = 0.004, e = 40) =>
  N9(
    o.map(([s, n, i, a]) => i$(s, n, t, i || 0, a || 0)),
    {
      deg: e,
    },
  );
function gw(o, t) {
  let e = o.index ? o.toNonIndexed() : o,
    s = Ud(t),
    n = (s[0] + s[2]) / 2,
    i = (s[1] + s[3]) / 2,
    a = e.attributes.position.count,
    r = new Float32Array(a * 2);
  for (let l = 0; l < a; l++) ((r[l * 2] = n), (r[l * 2 + 1] = i));
  return (e.setAttribute("uv", new THREE.BufferAttribute(r, 2)), e);
}
var O9 = (o) => {
  let t = Ud(o),
    e = (t[0] + t[2]) / 2,
    s = (t[1] + t[3]) / 2;
  return [e, s, e, s];
};
function SD(o, t) {
  let e = o.index ? o.toNonIndexed() : o,
    s = e.attributes.position,
    n = new Float32Array(s.count * 2);
  for (let i = 0; i < s.count; i++) {
    let a = t(s.getX(i), s.getY(i), s.getZ(i));
    ((n[i * 2] = a[0] / Nd), (n[i * 2 + 1] = 1 - a[1] / Bd));
  }
  return (e.setAttribute("uv", new THREE.BufferAttribute(n, 2)), e);
}
function fc(o, t, e, s = 1, n = 1, i = 1) {
  let a = Ud(e, s),
    r = new THREE.PlaneGeometry(o, t, n, i),
    l = r.attributes.uv;
  for (let c = 0; c < l.count; c++)
    l.setXY(
      c,
      a[0] + (a[2] - a[0]) * l.getX(c),
      a[1] + (a[3] - a[1]) * l.getY(c),
    );
  return r;
}
var xw = (o, t, e, s, n) =>
  Fr(o, t, e, s, n)
    .rotateY(-go)
    .translate(t / 2, 0, 0);
var Ym = (o) => new THREE.Shape(o.map((t) => oo(t[0], t[1])));
var bw = (o, t) =>
  o.map((e, s) => {
    let n = o[Math.max(0, s - 1)],
      i = o[Math.min(o.length - 1, s + 1)],
      a = i[0] - n[0],
      r = i[1] - n[1],
      l = Math.hypot(a, r) || 1;
    return [e[0] + (r / l) * t, e[1] - (a / l) * t];
  });
var a$ = (o, t, e = 50) => {
  let s = o.attributes.position,
    n = new THREE.Vector3();
  for (let i = 0; i < s.count; i++)
    (n.fromBufferAttribute(s, i), t(n), s.setXYZ(i, n.x, n.y, n.z));
  return pe(o, e);
};
function registerLobbyProps({ M: o, def: t, lib: e, fine: s }) {
  let n = () =>
      e("lobbyAtlas", () => {
        let f = o$();
        return new THREE.MeshStandardMaterial({
          map: f.map,
          roughnessMap: f.orm,
          metalnessMap: f.orm,
          normalMap: f.nrm,
          normalScale: new THREE.Vector2(0.8, 0.8),
          roughness: 1,
          metalness: 1,
          alphaTest: 0.5,
        });
      }),
    i = () =>
      e("lobbyGlow", () => {
        let f = n();
        return new THREE.MeshStandardMaterial({
          map: f.map,
          color: 7368816,
          emissiveMap: f.map,
          emissive: 16777215,
          emissiveIntensity: 3.2,
          roughness: 0.3,
          metalness: 0,
        });
      });
  t("piano", null, (f) => {
    let u = o.ceramicBlack,
      d = o.brass,
      m = n(),
      p = o.woodLight,
      x = s("leatherBlack"),
      g = 0.588,
      b = 0.912,
      v = 0.752,
      y = 0.06,
      M = ra(
        [
          [-v, -1.02],
          [-v, -1.3],
          [-v, -1.47],
          [-0.725, -1.585],
          [-0.62, -1.64],
          [-0.4, -1.652],
          [-0.12, -1.632],
          [0.08, -1.56],
          [0.215, -1.42],
          [0.285, -1.24],
          [0.335, -1.04],
          [0.405, -0.84],
          [0.52, -0.65],
          [0.645, -0.46],
          [0.725, -0.27],
          [v, -0.07],
          [v, 0.1],
        ].map(([k, I]) => De(k, 0, I)),
        64,
      ).map((k) => [clamp(k.x, -v, v), k.z]),
      w = [];
    for (let k of [90, 60, 30, 0])
      w.push([0.557 + 0.022 * So(Fd(k)), 0.778 + 0.022 * pi(Fd(k))]);
    w.push([0.52, 0.8]);
    for (let k of [90, 72, 54, 36, 18, 0])
      w.push([0.47 - 0.072 * pi(Fd(k)), b - 0.112 * So(Fd(k))]);
    w.push([0.396, b], [0.3, b]);
    let T = [
      {
        x: -v,
        z: 0.583,
        top: 0.775,
        d: 0.004,
      },
    ];
    for (let [k, I] of w)
      T.push({
        x: -v,
        z: k,
        top: I,
        d: 0,
      });
    for (let k of [0, -0.5])
      T.push({
        x: -v,
        z: k,
        top: b,
        d: 0,
      });
    for (let [k, I] of M)
      T.push({
        x: k,
        z: I,
        top: b,
        d: 0,
      });
    for (let [k, I] of [...w].reverse())
      T.push({
        x: v,
        z: k,
        top: I,
        d: 0,
      });
    T.push({
      x: v,
      z: 0.583,
      top: 0.775,
      d: 0.004,
    });
    let S = (k, I) => [
      [-y + I, g + 0.004 + I],
      [-y + I, k - 0.005 - I],
      [-y + 0.005 + I, k - I],
      [-0.005 - I, k - I],
      [-I, k - 0.005 - I],
      [-I, g + 0.004 + I],
      [-0.004 - I, g + I],
      [-y + 0.004 + I, g + I],
    ];
    f.add(
      N9(
        T.map((k, I) => {
          let G = T[Math.max(0, I - 1)],
            K = T[Math.min(T.length - 1, I + 1)],
            $ = K.x - G.x,
            n0 = K.z - G.z,
            e0 = Math.hypot($, n0),
            p0 = n0 / e0,
            t0 = -$ / e0;
          return S(k.top, k.d).map(([M0, f0]) => [
            k.x + p0 * M0,
            f0,
            k.z + t0 * M0,
          ]);
        }),
        {
          deg: 50,
        },
      ),
      u,
    );
    let E = [[-v, 0.372], [-v, 0], [-v, -0.5], ...M, [v, 0.372]],
      _ = new THREE.ShapeGeometry(
        Ym(bw(E, -(y - 0.006)).map(([k, I]) => [k, -I])),
      ).rotateX(-go);
    f.add(_, p, [0, 0.832, 0], null, null, "z");
    {
      let k = q2(_.clone().toNonIndexed());
      (k.computeVertexNormals(), f.add(k, p, [0, 0.616, 0], null, null, "z"));
    }
    let R = ra(
        [
          [0.628, 0.096],
          [0.585, 0.082],
          [0.5, 0.03],
          [0.4, -0.07],
          [0.3, -0.2],
          [0.2, -0.36],
          [0.1, -0.53],
          [0, -0.7],
          [-0.12, -0.87],
          [-0.25, -1.02],
          [-0.38, -1.14],
          [-0.5, -1.22],
        ].map(([k, I]) => De(k, 0, I)),
        44,
      ),
      C = ra(
        [
          [-0.3, -1.33],
          [-0.15, -1.325],
          [0, -1.29],
          [0.07, -1.245],
        ].map(([k, I]) => De(k, 0, I)),
        10,
      ),
      L = ra(
        [
          [0.655, 0.06],
          [0.6, -0.015],
          [0.5, -0.09],
          [0.4, -0.19],
          [0.3, -0.32],
          [0.2, -0.47],
          [0.1, -0.64],
          [0, -0.8],
          [-0.12, -0.965],
          [-0.25, -1.11],
          [-0.38, -1.225],
          [-0.5, -1.3],
          [-0.64, -1.345],
        ].map(([k, I]) => De(k, 0, I)),
        26,
      ).map((k) => [k.x, k.z]);
    {
      let k = Ym(bw(E, -(y + 0.006)).map(([G, K]) => [G, -K])),
        I = (G) => k.holes.push(new THREE.Path(G.map(([K, $]) => oo(K, -$))));
      (I([[-0.64, 0.145], [0.655, 0.145], ...L]),
        I([
          [-0.005, -0.93],
          [0.085, -1.2],
          [0.105, -1.3],
          [0.07, -1.37],
          [0, -1.42],
          [-0.25, -1.45],
          [-0.47, -1.44],
          [-0.56, -1.4],
          [-0.5, -1.35],
          [-0.38, -1.275],
          [-0.25, -1.16],
          [-0.12, -1.015],
        ]));
      for (let [G, K, $] of [
        [0.53, -0.2, 0.042],
        [0.45, -0.4, 0.055],
        [0.33, -0.62, 0.06],
        [0.21, -0.86, 0.06],
        [0.185, -1.07, 0.038],
      ])
        I(
          Array.from(
            {
              length: 14,
            },
            (n0, e0) => [
              G + pi((e0 / 14) * TAU) * $,
              K + So((e0 / 14) * TAU) * $,
            ],
          ),
        );
      f.add(fi(k, 0.014, 0.003, 4, 1), d, [0, 0.848, 0]);
    }
    let A = (k, I, G, K, $ = 0.04) =>
      f.add(
        Te(Math.hypot(G - k, K - I), $, 0.034, 0.012),
        d,
        [(k + G) / 2, 0.858 + $ / 2, (I + K) / 2],
        [0, Math.atan2(-(K - I), G - k), 0],
      );
    (A(-0.338, 0.15, 0.118, -1.215, 0.046),
      A(0.095, 0.15, 0.092, -0.67),
      A(0.385, 0.15, 0.39, -0.2),
      f.add(Te(1.3, 0.03, 0.02, 0.008), d, [0.0075, 0.874, 0.152]));
    {
      let k = bw(E, -(y + 0.03));
      for (let I = 5; I < k.length - 2; I += 6)
        f.add(dr(0.008, 8, 4, 0, TAU, 0, go), d, [k[I][0], 0.861, k[I][1]]);
    }
    (f.add(
      gw(
        _i(
          [
            [-0.014, 0],
            [-0.014, 0.047],
            [-0.011, 0.0495],
            [0.011, 0.0495],
            [0.014, 0.047],
            [0.014, 0],
          ],
          R.map((k) => De(k.x, 0.832, k.z)),
          {
            closed: !1,
          },
        ),
        "darkWood",
      ),
      m,
      null,
      null,
      null,
      !0,
    ),
      f.add(
        gw(
          _i(
            [
              [-0.016, 0],
              [-0.016, 0.056],
              [-0.013, 0.0585],
              [0.013, 0.0585],
              [0.016, 0.056],
              [0.016, 0],
            ],
            C.map((k) => De(k.x, 0.832, k.z)),
            {
              closed: !1,
            },
          ),
          "darkWood",
        ),
        m,
        null,
        null,
        null,
        !0,
      ));
    {
      let k = Od(),
        I = Od(),
        G = Od(),
        K = Od(),
        $ = Ud("tri"),
        n0 = Ud("bi"),
        e0 = Ud("wound"),
        p0 = O9("steel"),
        t0 = O9("feltRed"),
        M0 = (T0, j0, Z0, lt) => {
          let H0 = j0[0] - T0[0],
            Y0 = j0[2] - T0[2],
            et = Math.hypot(H0, Y0),
            ct = ((-Y0 / et) * Z0) / 2,
            D0 = ((H0 / et) * Z0) / 2;
          k.quad(
            [T0[0] - ct, T0[1], T0[2] - D0],
            [T0[0] + ct, T0[1], T0[2] + D0],
            [j0[0] + ct, j0[1], j0[2] + D0],
            [j0[0] - ct, j0[1], j0[2] - D0],
            lt,
          );
        },
        f0 = (T0, j0) =>
          K.obox(
            [T0, 0.875, j0],
            [0.0024, 0, 0.0024],
            [0, 0.013, 0],
            [-0.0024, 0, 0.0024],
            "xXYzZ",
            p0,
          ),
        _0 = (T0, j0, Z0, lt, H0, Y0) => {
          (G.obox(
            [T0, j0 + 0.014, Z0],
            [-H0 * 0.0046, 0, lt * 0.0046],
            [0, 0.008, 0],
            [(lt * Y0) / 2, 0, (H0 * Y0) / 2],
            "xXYzZ",
          ),
            I.obox(
              [T0, j0 + 0.003, Z0],
              [-H0 * 0.004, 0, lt * 0.004],
              [0, 0.003, 0],
              [lt * (Y0 / 2 - 0.002), 0, H0 * (Y0 / 2 - 0.002)],
              "xXzZ",
              t0,
            ));
        },
        F0 = (T0, j0, Z0) => {
          for (let lt = 0; lt < R.length - 1; lt++) {
            let H0 = R[lt],
              Y0 = R[lt + 1],
              et = H0.x - (T0 + Z0 * (j0 - H0.z)),
              ct = Y0.x - (T0 + Z0 * (j0 - Y0.z));
            if (et * ct <= 0) {
              let D0 = et / (et - ct || 1);
              return [lerp(H0.x, Y0.x, D0), lerp(H0.z, Y0.z, D0)];
            }
          }
          return [T0, j0 - 0.06];
        },
        m0 = 0.152;
      for (let T0 = 0; T0 < 68; T0++) {
        let j0 =
            T0 < 30
              ? lerp(-0.3, 0.065, T0 / 29)
              : T0 < 50
                ? lerp(0.125, 0.352, (T0 - 30) / 19)
                : lerp(0.418, 0.612, (T0 - 50) / 17),
          Z0 = lerp(-0.14, 0, Math.pow(T0 / 67, 0.7)),
          [lt, H0] = F0(j0, m0, Z0),
          Y0 = Math.hypot(Z0, 1),
          et = (-Z0 / Y0) * -1,
          ct = -1 / Y0,
          D0 = 0.205 + (T0 % 3) * 0.028;
        if (
          (M0(
            [j0, 0.8835, m0],
            [lt + et * 0.105, 0.8835, H0 + ct * 0.105],
            0.0066,
            $,
          ),
          M0([j0, 0.878, D0], [j0, 0.8835, m0 + 0.008], 0.0066, $),
          f0(j0 - 0.002, D0),
          f0(j0 + 0.002, D0 + 0.092),
          T0 < 48)
        ) {
          let u0 = lerp(0.115, 0.04, T0 / 47);
          _0(
            j0 + et * u0,
            0.8835,
            m0 + ct * u0,
            et,
            ct,
            lerp(0.04, 0.02, T0 / 47),
          );
        }
      }
      for (let T0 = 0; T0 < 20; T0++) {
        let j0 = -0.615 + (T0 * 0.24) / 19,
          Z0 = C[Math.round((T0 / 19) * (C.length - 1))],
          lt = Z0.x - j0,
          H0 = Z0.z - m0,
          Y0 = Math.hypot(lt, H0),
          et = lt / Y0,
          ct = H0 / Y0,
          D0 = 0.21 + (T0 % 2) * 0.03,
          u0 = T0 < 8;
        (M0(
          [j0, 0.8925, m0],
          [Z0.x + et * 0.13, 0.8925, Z0.z + ct * 0.13],
          u0 ? lerp(0.005, 0.0036, T0 / 7) : 0.0086,
          u0 ? e0 : n0,
        ),
          M0(
            [j0, 0.879, D0],
            [j0, 0.8925, m0 + 0.008],
            u0 ? 0.004 : 0.0086,
            u0 ? e0 : n0,
          ),
          f0(j0 - (u0 ? 0 : 0.0025), D0),
          u0 || f0(j0 + 0.0025, D0 + 0.085),
          _0(j0 + et * 0.15, 0.8925, m0 + ct * 0.15, et, ct, 0.046));
      }
      (f.add(k.geo(), m, null, null, null, !0),
        f.add(K.geo(), m, null, null, null, !0),
        f.add(I.geo(), m, null, null, null, !0),
        f.add(G.geo(55), u));
      let S0 = Od();
      S0.obox(
        [0.0075, 0.8635, 0.176],
        [0.64, 0, 0],
        [0, 0.002, 0],
        [0, 0, -0.008],
        "xXYzZ",
        t0,
      );
      for (let T0 = 0; T0 < L.length - 2; T0++) {
        let j0 = L[T0],
          Z0 = L[T0 + 1];
        S0.quad(
          [j0[0], 0.8632, j0[1] - 0.012],
          [j0[0], 0.8632, j0[1] - 0.034],
          [Z0[0], 0.8632, Z0[1] - 0.034],
          [Z0[0], 0.8632, Z0[1] - 0.012],
          t0,
        );
      }
      f.add(S0.geo(), m, null, null, null, !0);
    }
    f.add(zs(1.39, 0.082, 0.026), u, [0, 0.629, 0.273]);
    for (let [k, I, G, K] of [
      [-0.45, 0.26, -0.5, -1.56],
      [-0.05, 0.26, 0.02, -1.5],
      [0.36, 0.26, 0.3, -1.05],
      [0.6, 0.26, 0.6, -0.42],
    ])
      f.add(
        zs(Math.hypot(G - k, K - I), 0.07, 0.06),
        u,
        [(k + G) / 2, 0.627, (I + K) / 2],
        [0, Math.atan2(-(K - I), G - k), 0],
      );
    for (let k = 0; k < 9; k++) {
      let I = 0.1 - k * 0.185,
        G = k < 2 ? 0.66 : k < 4 ? 0.58 : k < 6 ? 0.46 : 0.36;
      f.add(
        zs(G * 2, 0.02, 0.022),
        p,
        [lerp(0, -0.26, k / 8) + 0.02, 0.606, I],
        [0, 0.5, 0],
        null,
        "x",
      );
    }
    let O = new THREE.Matrix4()
        .makeTranslation(-0.75, 0.93, 0)
        .multiply(new THREE.Matrix4().makeRotationZ(0.6))
        .multiply(new THREE.Matrix4().makeTranslation(0.75, 0, 0)),
      H = bw(
        [[-v, 0.13], [-v, 0], [-v, -0.5], ...M.slice(0, -1), [v, 0.13]],
        0.004,
      );
    f.at(O, () => {
      (f.add(
        fi(Ym(H.map(([k, I]) => [k, -I])), 0.03, 0.007, 4, 2),
        u,
        [0, -0.006, 0],
      ),
        f.add(
          fi(ui(1.496, 0.196, 0.008), 0.03, 0.007, 4, 2),
          u,
          [0, 0.0255, 0.03],
        ),
        f.rod(d, [-0.735, 0.0248, 0.1345], [0.735, 0.0248, 0.1345], 0.0042, 8));
      for (let k of [-0.9, -0.2])
        f.add(zs(0.003, 0.024, 0.085), d, [-0.7575, 0.008, k]);
      f.add(
        pe(
          ke(
            [
              [0, 0],
              [0.016, 0],
              [0.019, -0.004],
              [0.019, -0.009],
              [0.012, -0.012],
              [0.009, -0.005],
              [0, -0.005],
            ],
            14,
          ),
        ),
        d,
        [0.56, -0.006, -0.3],
      );
    });
    for (let k of [-0.9, -0.2])
      (f.add(
        pe(
          ke(
            [
              [0, -0.05],
              [0.0035, -0.048],
              [0.0058, -0.044],
              [0.0058, 0.044],
              [0.0035, 0.048],
              [0, 0.05],
            ],
            10,
          ),
        ),
        d,
        [-0.7585, 0.927, k],
        [go, 0, 0],
      ),
        f.add(zs(0.003, 0.034, 0.085), d, [-0.7535, 0.905, k]));
    {
      let k = De(0.56, -0.011, -0.3).applyMatrix4(O),
        I = [0.612, 0.9, -0.3],
        G = k
          .clone()
          .sub(De(...I))
          .normalize(),
        K = k.clone().addScaledVector(G, -0.03);
      (f.rod(u, I, [K.x, K.y, K.z], 0.0105, 10, 0.0085),
        f.rod(d, [K.x, K.y, K.z], [k.x, k.y, k.z], 0.009, 10, 0.0065),
        f.add(Te(0.05, 0.024, 0.034, 0.005), d, [0.636, 0.886, -0.3]),
        f.add(ks(0.0075, 0.0075, 0.042, 8), d, [0.612, 0.9, -0.3], [go, 0, 0]));
    }
    (f.add(
      xw(
        Ym([
          [0.28, 0.6],
          [0.586, 0.6],
          [0.586, 0.668],
          [0.28, 0.668],
        ]),
        1.39,
        0.006,
        4,
        2,
      ),
      u,
    ),
      f.add(
        xw(
          Ym([
            [0.561, 0.668],
            [0.581, 0.668],
            [0.581, 0.701],
            [0.561, 0.701],
          ]),
          1.386,
          0.004,
          4,
          2,
        ),
        u,
      ));
    for (let k of [-1, 1])
      f.add(Te(0.08, 0.07, 0.165, 0.006), u, [k * 0.6525, 0.701, 0.4805]);
    (f.add(
      xw(
        Ym([
          [0.3965, 0.7155],
          [0.3875, 0.842],
          [0.3855, 0.8475],
          [0.381, 0.85],
          [0.3695, 0.85],
          [0.374, 0.7155],
        ]),
        1.386,
        0.0025,
        4,
        1,
      ),
      u,
    ),
      f.add(
        fc(0.25, 0.0313, "name", 2),
        m,
        [0, 0.796, 0.3912],
        [-0.071, 0, 0],
        null,
        !0,
      ),
      f.add(zs(1.384, 0.06, 0.03), u, [0, 0.882, 0.375]),
      f.add(zs(1.226, 0.04, 0.164), u, [0, 0.6895, 0.4715]),
      f.add(
        gw(zs(1.226, 0.004, 0.006), "feltRed"),
        m,
        [0, 0.7135, 0.3995],
        null,
        null,
        !0,
      ));
    {
      let k = Od(),
        I = Od(),
        G = 1.224 / 52,
        K = createRandom(88),
        $ = 0.557,
        n0 = 0.398,
        e0 = O9("satin");
      for (let p0 = 0; p0 < 52; p0++) {
        let t0 = -0.612 + G * p0 + 55e-5,
          M0 = t0 + G - 0.0011,
          f0 = 0.712 + (K() - 0.5) * 5e-4,
          _0 = [
            [n0, f0],
            [$ - 0.0022, f0],
            [$ - 7e-4, f0 - 6e-4],
            [$, f0 - 0.002],
            [$, f0 - 0.0042],
            [$ - 0.0016, f0 - 0.0042],
            [$ - 0.0016, 0.69],
          ];
        for (let m0 = 0; m0 < _0.length - 1; m0++)
          k.quad(
            [t0, _0[m0][1], _0[m0][0]],
            [t0, _0[m0 + 1][1], _0[m0 + 1][0]],
            [M0, _0[m0 + 1][1], _0[m0 + 1][0]],
            [M0, _0[m0][1], _0[m0][0]],
          );
        (k.quad(
          [t0, f0, n0],
          [t0, f0 - 0.0028, n0],
          [t0, f0 - 0.0028, $ - 0.001],
          [t0, f0, $ - 0.001],
        ),
          k.quad(
            [M0, f0, $ - 0.001],
            [M0, f0 - 0.0028, $ - 0.001],
            [M0, f0 - 0.0028, n0],
            [M0, f0, n0],
          ),
          k.quad(
            [t0, f0 - 0.004, $ - 0.0016],
            [t0, 0.69, $ - 0.0016],
            [t0, 0.69, $ - 0.0036],
            [t0, f0 - 0.004, $ - 0.0036],
          ),
          k.quad(
            [M0, f0 - 0.004, $ - 0.0036],
            [M0, 0.69, $ - 0.0036],
            [M0, 0.69, $ - 0.0016],
            [M0, f0 - 0.004, $ - 0.0016],
          ));
        let F0 = p0 % 7;
        if (p0 < 51 && [0, 2, 3, 5, 6].includes(F0)) {
          let m0 =
              -0.612 +
              G * (p0 + 1) +
              [0.0026, 0, -0.0022, 0.0022, 0, -0.003, 0][F0],
            S0 = 0.7118,
            T0 = 0.0125 + (K() - 0.5) * 4e-4,
            j0 = 0.4995,
            Z0 = [
              [-0.0058, 0],
              [-0.0052, T0 - 0.0022],
              [-0.0038, T0],
              [0.0038, T0],
              [0.0052, T0 - 0.0022],
              [0.0058, 0],
            ];
          for (let lt = 0; lt < 5; lt++) {
            let H0 = Z0[lt],
              Y0 = Z0[lt + 1],
              et = j0 - H0[1] * 0.62,
              ct = j0 - Y0[1] * 0.62;
            I.quad(
              [m0 + H0[0], S0 + H0[1], n0],
              [m0 + H0[0], S0 + H0[1], et],
              [m0 + Y0[0], S0 + Y0[1], ct],
              [m0 + Y0[0], S0 + Y0[1], n0],
              e0,
            );
          }
          for (let lt = 1; lt < 5; lt++)
            I.tri(
              [m0 + Z0[0][0], S0, j0],
              [
                m0 + Z0[lt + 1 > 5 ? 5 : lt + 1][0],
                S0 + Z0[lt + 1][1],
                j0 - Z0[lt + 1][1] * 0.62,
              ],
              [m0 + Z0[lt][0], S0 + Z0[lt][1], j0 - Z0[lt][1] * 0.62],
              e0,
              e0,
              e0,
            );
        }
      }
      (f.add(k.geo(48), o.plasticWhite),
        f.add(I.geo(38), m, null, null, null, !0));
    }
    f.add(
      Dl(1.376, 0.17, [
        [0, 0],
        [0, 0.011],
        [0.002, 0.013],
        [0.026, 0.013],
        [0.028, 0.011],
        [0.028, 0],
      ]),
      u,
      [0, 0.9, 0.22],
      [-go, 0, 0],
    );
    for (let k of [-1, 1])
      f.add(zs(0.03, 0.013, 0.17), u, [k * 0.345, 0.9065, 0.22]);
    (f.add(Te(0.66, 0.014, 0.052, 0.004), u, [0, 0.922, 0.25]),
      f.add(Te(0.66, 0.009, 0.008, 0.003), u, [0, 0.9325, 0.272]),
      f.at([0, 1.035, 0.2], [-0.3, 0, 0], () => {
        f.add(
          Fr(ui(0.64, 0.25, 0.014), 0.012, 0.0035, 5, 2),
          u,
          [0, 0, -0.006],
        );
        for (let k of [-1, 1])
          f.add(
            ks(0.004, 0.004, 0.05, 8),
            d,
            [k * 0.22, -0.127, -0.006],
            [0, 0, go],
          );
        f.add(zs(0.016, 0.004, 0.16), d, [0, -0.02, -0.084], [0.62, 0, 0]);
      }));
    let F = pe(
        ke(
          [
            [0.007, -0.0062],
            [0.0235, -0.0066],
            [0.027, -0.003],
            [0.027, 0.003],
            [0.0235, 0.0066],
            [0.007, 0.0062],
          ],
          14,
        ),
        35,
      ),
      P = xw(
        Ym([
          [0.014, 0.054],
          [0.011, 0.043],
          [-0.006, 0.0185],
          [-0.016, 0.0155],
          [-0.0245, 0.019],
          [-0.0275, 0.027],
          [-0.027, 0.04],
          [-0.021, 0.054],
        ]),
        0.0075,
        0.0015,
        4,
        1,
      );
    ([
      [-0.62, 0.3, 0.5],
      [0.62, 0.3, -0.9],
      [-0.22, -1.32, 2.2],
    ].forEach(([k, I, G]) => {
      (f.add(
        Lb(
          [
            [0.064, 0.616],
            [0.064, 0.552],
            [0.058, 0.546],
            [0.058, 0.538],
            [0.05, 0.53],
            [0.0475, 0.522],
            [0.0312, 0.118],
          ],
          0.005,
        ),
        u,
        [k, 0, I],
      ),
        f.add(
          Lb(
            [
              [0.029, 0.066],
              [0.0325, 0.07],
              [0.0335, 0.12],
              [0.0345, 0.124],
              [0.0345, 0.13],
              [0.0318, 0.133],
            ],
            0.004,
          ),
          d,
          [k, 0, I],
        ),
        f.at([k, 0, I], [0, G, 0], () => {
          (f.add(
            pe(
              ke(
                [
                  [0, 0.05],
                  [0.012, 0.05],
                  [0.019, 0.054],
                  [0.02, 0.062],
                  [0.016, 0.068],
                  [0, 0.068],
                ],
                12,
              ),
            ),
            d,
          ),
            f.add(P, d));
          for (let K of [-1, 1])
            (f.add(F, d, [K * 0.0112, 0.027, -0.016], [0, 0, go]),
              f.add(
                dr(0.006, 8, 4, 0, TAU, 0, go),
                d,
                [K * 0.0172, 0.027, -0.016],
                [0, 0, -K * go],
              ));
        }));
    }),
      f.add(Te(0.27, 0.036, 0.1, 0.006), u, [0, 0.583, 0.36]));
    for (let k of [-1, 1])
      f.add(
        Lb(
          [
            [0.019, 0.16, k * 0.098],
            [0.0185, 0.2, k * 0.097],
            [0.0225, 0.52, k * 0.084],
            [0.027, 0.535, k * 0.083],
            [0.027, 0.567, k * 0.083],
          ],
          0.004,
        ),
        u,
        [0, 0, 0.36],
      );
    (f.add(fi(ui(0.29, 0.115, 0.03), 0.072, 0.007, 6, 2), u, [0, 0.094, 0.37]),
      f.add(Te(0.2, 0.034, 0.003, 0.0012), d, [0, 0.118, 0.4285]));
    let z = (() => {
      let k = new THREE.Shape();
      return (
        k.moveTo(-0.0075, 0.02),
        k.lineTo(-0.0075, -0.04),
        k.quadraticCurveTo(-0.0085, -0.06, -0.0155, -0.074),
        k.absarc(0, -0.0835, 0.0165, Tn * 0.82, Tn * 0.18 + Tn, !1),
        k.quadraticCurveTo(0.0085, -0.06, 0.0075, -0.04),
        k.lineTo(0.0075, 0.02),
        a$(fi(k, 0.008, 0.0028, 8, 2), (I) => {
          let G = clamp(I.z / 0.1, 0, 1);
          I.y -= 0.02 * G * G;
        })
      );
    })();
    for (let k of [-0.07, 0, 0.07])
      (f.add(z, d, [k, 0.112, 0.424]),
        f.add(
          gw(zs(0.022, 0.016, 0.002), "slot"),
          m,
          [k, 0.118, 0.4302],
          null,
          null,
          !0,
        ),
        f.rod(
          d,
          [k * 0.55, 0.166, 0.375],
          [k * 0.55, 0.566, 0.365],
          0.0035,
          6,
        ));
    for (let k of [-1, 1])
      (f.rod(d, [k * 0.11, 0.15, 0.325], [k * 0.15, 0.598, 0.09], 0.0055, 8),
        f.add(dr(0.009, 8, 6), d, [k * 0.11, 0.15, 0.325]),
        f.add(Te(0.03, 0.01, 0.03, 0.003), d, [k * 0.15, 0.603, 0.088]));
    return (
      f.at([0, 0, 1], () => {
        for (let T0 of [-1, 1])
          for (let j0 of [-1, 1])
            (f.add(
              Lb(
                [
                  [0.0185, 0.034],
                  [0.0245, 0.36],
                  [0.0255, 0.37],
                  [0.0255, 0.41],
                ],
                0.003,
              ),
              u,
              [T0 * 0.4, 0, j0 * 0.13],
            ),
              f.add(
                Lb(
                  [
                    [0.0165, 0],
                    [0.0185, 0.004],
                    [0.0195, 0.036],
                    [0.0205, 0.04],
                    [0.0205, 0.046],
                    [0.019, 0.049],
                  ],
                  0.003,
                ),
                d,
                [T0 * 0.4, 0, j0 * 0.13],
              ));
        (f.add(fi(ui(0.9, 0.36, 0.016), 0.058, 0.004, 5, 2), u, [0, 0.402, 0]),
          f.add(
            fi(ui(0.912, 0.372, 0.02), 0.01, 0.004, 5, 2),
            u,
            [0, 0.458, 0],
          ));
        for (let T0 of [-1, 1])
          (f.add(
            pe(
              ke(
                [
                  [0, 0],
                  [0.012, 0],
                  [0.012, 0.012],
                  [0.03, 0.014],
                  [0.033, 0.018],
                  [0.033, 0.03],
                  [0.029, 0.035],
                  [0.012, 0.036],
                  [0, 0.036],
                ],
                20,
              ),
            ),
            u,
            [T0 * 0.45, 0.431, 0],
            [0, 0, -T0 * go],
          ),
            f.add(
              pe(
                ke(
                  [
                    [0, 0.0355],
                    [0.011, 0.0355],
                    [0.01, 0.0385],
                    [0, 0.0395],
                  ],
                  12,
                ),
              ),
              d,
              [T0 * 0.45, 0.431, 0],
              [0, 0, -T0 * go],
            ));
        let k = 0.442,
          I = 0.172,
          G = 0.022,
          K = 0.5335,
          $ = 0.07,
          n0 = 0.1,
          e0 = (T0, j0) => {
            let Z0 = [];
            for (let H0 of [90, 60, 30]) Z0.push([-T0, -Fd(H0)]);
            let lt = Math.round((2 * T0) / j0);
            for (let H0 = 0; H0 <= lt; H0++)
              Z0.push([-T0 + (2 * T0 * H0) / lt, 0]);
            for (let H0 of [30, 60, 90]) Z0.push([T0, Fd(H0)]);
            return Z0;
          },
          p0 = e0(k - G, $ / 3),
          t0 = e0(I - G, n0 / 4),
          M0 = [],
          f0 = [],
          _0 = p0.length,
          F0 = [];
        for (let T0 of [-n0, 0, n0])
          for (let j0 = -0.42; j0 <= 0.421; j0 += $)
            Math.abs(j0) < 0.4 &&
              Math.abs((Math.round(j0 / $) + Math.round(T0 / n0)) % 2) === 0 &&
              F0.push([Math.round(j0 / $) * $, T0]);
        for (let [T0, j0] of t0)
          for (let [Z0, lt] of p0) {
            let H0 = Math.abs(lt) > 1.5 ? 1e6 * Math.sign(lt) : Math.tan(lt),
              Y0 = Math.abs(j0) > 1.5 ? 1e6 * Math.sign(j0) : Math.tan(j0),
              et = Math.hypot(H0, 1, Y0),
              ct = K - G + G / et;
            if (!lt && !j0) {
              let D0 = smoothstep(
                  0,
                  0.06,
                  Math.min(k - G - Math.abs(Z0), I - G - Math.abs(T0)),
                ),
                u0 = (Z0 / $ + T0 / n0) / 2,
                w0 = (-Z0 / $ + T0 / n0) / 2,
                P0 = 0;
              for (let st of F0)
                P0 = Math.max(
                  P0,
                  Math.exp(-((Z0 - st[0]) ** 2 + (T0 - st[1]) ** 2) / 42e-5),
                );
              ct +=
                D0 *
                  (0.0078 *
                    Math.pow(Math.abs(So(Tn * u0) * So(Tn * w0)), 0.55) -
                    0.0042 * P0) +
                0.003 * (1 - (Z0 / k) ** 2) * (1 - (T0 / I) ** 2);
            }
            M0.push(Z0 + (G * H0) / et, ct, T0 + (G * Y0) / et);
          }
        for (let T0 = 0; T0 < t0.length - 1; T0++)
          for (let j0 = 0; j0 < _0 - 1; j0++) {
            let Z0 = T0 * _0 + j0,
              lt = Z0 + 1,
              H0 = Z0 + _0,
              Y0 = H0 + 1;
            f0.push(Z0, H0, lt, lt, H0, Y0);
          }
        let m0 = new THREE.BufferGeometry();
        (m0.setAttribute("position", new THREE.Float32BufferAttribute(M0, 3)),
          m0.setIndex(f0),
          m0.computeVertexNormals(),
          f.add(m0, x));
        let S0 = (T0, j0 = 0) =>
          di(2 * k + j0, 2 * I + j0, G + j0 / 2, T0, 4).map((Z0) => [
            Z0.x,
            Z0.y,
            Z0.z,
          ]);
        f.add(
          N9([S0(K - G), S0(K - G - 0.02, 0.005), S0(0.468)], {
            deg: 60,
          }),
          x,
        );
        for (let T0 of [K - G - 0.0015, 0.4705])
          f.add(
            Qo(
              di(2 * k + 0.004, 2 * I + 0.004, G + 0.002, T0, 4),
              0.0042,
              5,
              !0,
            ),
            x,
          );
        for (let [T0, j0] of F0)
          f.add(
            dr(0.0105, 8, 4, 0, TAU, 0, go),
            x,
            [T0, K - 0.0035, j0],
            null,
            [1, 0.5, 1],
          );
      }),
      f.shift(0, 0, 0.23),
      rs("piano", [1.5, 1.78, 2.84], {
        surf: "wood",
        mass: 420,
        colliders: [
          $s(-0.75, 0, -1.42, 0.75, 0.94, 0.83),
          $s(-0.46, 0, 1.03, 0.46, 0.54, 1.42),
        ],
      })
    );
  });
  let a = (f, u, d = 0) => {
      let m = new THREE.Shape();
      return (
        m.moveTo(-f / 2, d),
        m.lineTo(f / 2, d),
        m.lineTo(f / 2, d + u),
        m.absarc(0, d + u, f / 2, 0, Tn, !1),
        m.lineTo(-f / 2, d),
        m
      );
    },
    r = (f, u, d = 28) => {
      let m = Ud(u, 2),
        p = new THREE.CircleGeometry(f, d),
        x = p.attributes.uv;
      for (let g = 0; g < x.count; g++)
        x.setXY(
          g,
          m[0] + (m[2] - m[0]) * x.getX(g),
          m[1] + (m[3] - m[1]) * x.getY(g),
        );
      return p;
    },
    l = (f, u) => {
      let d = [],
        m = f.length,
        p = 0;
      for (let x = 0; x < m; x++) {
        let g = f[x],
          b = f[(x + 1) % m],
          v = g.distanceTo(b),
          y = p;
        for (; y < v;) (d.push(g.clone().lerp(b, y / v)), (y += u));
        p = y - v;
      }
      return d;
    },
    c = (f, u, d, m = 0.001) => {
      let p = Od(),
        x = Ud(d, 1),
        g = f.length,
        b = new THREE.Vector3();
      for (let v of f) b.add(v);
      b.multiplyScalar(1 / g);
      for (let v = 0; v < g; v++) {
        let y = f[v],
          M = f[(v + 1) % g],
          w = M.x - y.x,
          T = M.y - y.y,
          S = Math.hypot(w, T) || 1,
          E = T / S,
          _ = -w / S;
        E * (y.x - b.x) + _ * (y.y - b.y) < 0 && ((E = -E), (_ = -_));
        let R = [y.x + E * m, y.y + _ * m],
          C = [M.x + E * m, M.y + _ * m],
          L = [
            [R[0], R[1], y.z - u],
            [C[0], C[1], y.z - u],
            [C[0], C[1], y.z + u],
            [R[0], R[1], y.z + u],
          ],
          A = [L[1][0] - L[0][0], L[1][1] - L[0][1]];
        A[0] * _ - A[1] * E > 0
          ? p.quad(L[1], L[0], L[3], L[2], x)
          : p.quad(L[0], L[1], L[2], L[3], x);
      }
      return p.geo();
    },
    h = (f, u, d = 12) =>
      pe(
        ke(
          [
            [0, -u / 2],
            [f * 0.55, -u / 2],
            [f * 0.62, -u / 2 + 0.002],
            [f - 0.004, -u / 2 + 0.001],
            [f, -u / 2 + 0.005],
            [f, u / 2 - 0.005],
            [f - 0.004, u / 2 - 0.001],
            [f * 0.62, u / 2 - 0.002],
            [f * 0.55, u / 2],
            [0, u / 2],
          ],
          d,
        ),
        40,
      ).rotateZ(go);
  (t("speaker", null, (f) => {
    let u = n(),
      d = o.woodDark,
      m = o.brass,
      p = 0.172,
      x = 0.6;
    for (let b of [-1, 1])
      for (let v of [-1, 1])
        (f.rod(
          d,
          [b * 0.26, 0.09, v * 0.12],
          [b * 0.283, 0.026, v * 0.143],
          0.024,
          10,
          0.0155,
          "y",
        ),
          f.rod(
            m,
            [b * 0.2815, 0.032, v * 0.1415],
            [b * 0.287, 0, v * 0.147],
            0.0168,
            10,
            0.014,
          ));
    (f.add(
      fi(ui(0.66, 0.38, 0.012), 0.03, 0.005, 4),
      d,
      [0, 0.08, 0],
      null,
      null,
      "x",
    ),
      f.add(
        fi(ui(0.64, 0.362, 0.01), 0.014, 0.004, 4),
        d,
        [0, 0.108, 0],
        null,
        null,
        "x",
      ),
      f.add(
        Fr(a(0.624, 0.712), 0.344, 0.012, 20),
        d,
        [0, 0.108, -p],
        null,
        null,
        "y",
      ));
    {
      let b = a(0.6, 0.7);
      (b.holes.push(new THREE.Path(a(0.53, 0.675, 0.03).getPoints(14))),
        f.add(
          Fr(b, 0.012, 0.004, 14),
          d,
          [0, 0.12, p - 0.004],
          null,
          null,
          "y",
        ),
        f.add(
          SD(new THREE.ShapeGeometry(a(0.53, 0.675, 0.03), 14), (v, y) => [
            452 + (v / 0.53 + 0.5) * 504,
            4 + (1 - (y - 0.03) / 0.94) * 824,
          ]),
          u,
          [0, 0.12, p + 0.0012],
          null,
          null,
          !0,
        ));
    }
    f.add(
      SD(new THREE.ShapeGeometry(a(0.44, 0.2), 14), (b, v) => [
        962 + (b / 0.44 + 0.5) * 252,
        2 + (1 - v / 0.42) * 252,
      ]),
      u,
      [0, x, p + 0.003],
      null,
      null,
      !0,
    );
    {
      let b = [
        [-0.22, x, p + 0.008],
        [-0.22, x + 0.2, p + 0.008],
      ];
      for (let v = 1; v < 12; v++) {
        let y = Tn - (v / 12) * Tn;
        b.push([pi(y) * 0.22, x + 0.2 + So(y) * 0.22, p + 0.008]);
      }
      (b.push([0.22, x + 0.2, p + 0.008], [0.22, x, p + 0.008]),
        f.add(Qo(b, 0.009, 6), m));
      for (let v = 0; v < 9; v++) {
        let y = Fd(18 + v * 18),
          M = pi(y),
          w = So(y),
          T = 0.22 / Math.max(0.001, Math.abs(M)),
          S = T * w <= 0.2 ? T : 0.2 * w + Math.sqrt(0.04 * w * w + 0.0084);
        f.rod(
          m,
          [M * 0.05, x + w * 0.05, p + 0.007],
          [M * (S - 0.006), x + w * (S - 0.006), p + 0.007],
          v % 2 ? 0.0038 : 0.0052,
          6,
        );
      }
      for (let v of [0.058, 0.13])
        f.add(Sa(v, 0.004, 5, 16, Tn), m, [0, x, p + 0.008]);
      f.add(Te(0.48, 0.02, 0.022, 0.006), m, [0, x - 0.006, p + 0.008]);
    }
    (f.add(
      fc(0.09, 0.0193, "rbadge"),
      u,
      [0, x - 0.045, p + 0.0095],
      null,
      null,
      !0,
    ),
      f.keep("bulb", r(0.085, "dial"), i(), [0, 0.36, p + 0.006], null, null, {
        uv: !0,
      }),
      f.add(
        pe(
          ke(
            [
              [0.083, 0],
              [0.104, 0],
              [0.106, 0.004],
              [0.098, 0.012],
              [0.09, 0.013],
              [0.085, 0.009],
              [0.083, 0.009],
            ],
            28,
          ),
          40,
        ),
        m,
        [0, 0.36, p + 0.004],
        [go, 0, 0],
      ),
      f.add(
        zs(0.0035, 0.072, 0.002),
        o.blackMetal,
        [0.0165, 0.39, p + 0.0105],
        [0, 0, -0.5],
      ),
      f.add(
        pe(
          ke(
            [
              [0, 0],
              [0.009, 0],
              [0.009, 0.003],
              [0.005, 0.006],
              [0, 0.006],
            ],
            10,
          ),
          40,
        ),
        m,
        [0, 0.36, p + 0.0095],
        [go, 0, 0],
      ));
    let g = (b, v, y) => {
      (f.add(
        pe(
          ke(
            [
              [0, 0],
              [y * 1.25, 0],
              [y * 1.25, 0.004],
              [y * 1.05, 0.006],
            ],
            16,
          ),
          40,
        ),
        m,
        [b, v, p + 0.008],
        [go, 0, 0],
      ),
        f.add(
          pe(
            ke(
              [
                [y, 0.004],
                [y * 0.96, 0.02],
                [y * 0.82, 0.026],
                [y * 0.5, 0.027],
                [y * 0.46, 0.03],
                [0, 0.03],
              ],
              16,
            ),
            35,
          ),
          o.blackMetal,
          [b, v, p + 0.008],
          [go, 0, 0],
        ),
        f.add(zs(y * 0.12, y * 0.5, 0.002), m, [b, v + y * 0.55, p + 0.0355]));
    };
    return (
      g(-0.19, 0.34, 0.027),
      g(0.19, 0.34, 0.027),
      g(-0.085, 0.238, 0.016),
      g(0.085, 0.238, 0.016),
      f.add(Te(0.5, 0.01, 0.01, 0.003), m, [0, 0.19, p + 0.008]),
      f.add(
        fc(0.5, 0.666, "back"),
        u,
        [0, 0.5, -p - 5e-4],
        [0, Tn, 0],
        null,
        !0,
      ),
      rs("speaker", [0.66, 1.14, 0.38], {
        surf: "wood",
        mass: 35,
        colliders: [$s(-0.33, 0, -0.19, 0.33, 1.12, 0.19)],
        light: {
          pos: [0, 0.4, 0.3],
          color: 16751164,
          intensity: 0.5,
          range: 3,
        },
      })
    );
  }),
    t("elevatorDoor", null, (f) => {
      let u = n(),
        d = i(),
        m = o.brass,
        p = o.blackMetal;
      for (let x of [-1, 1]) {
        (f.add(Te(0.594, 2.2, 0.016, 0.003), m, [x * 0.3, 0, 0.01]),
          f.add(
            Dl(0.594, 2.2, [
              [0, 0],
              [0, 0.005],
              [0.004, 0.008],
              [0.042, 0.008],
              [0.048, 0.003],
              [0.048, 0],
            ]),
            m,
            [x * 0.3, 0, 0.016],
          ),
          f.add(Te(0.5, 0.05, 0.007, 0.003), m, [x * 0.3, -0.36, 0.0205]));
        for (let g = 0; g < 9; g++)
          f.add(
            ks(0.024, 0.024, 0.6, 6),
            m,
            [x * (0.076 + g * 0.056), -0.71, 0.0165],
            null,
            [1, 1, 0.28],
          );
        for (let g = 0; g < 6; g++) {
          let b = Fd(9 + g * 15),
            v = pi(b),
            y = So(b),
            M = 0.31,
            w = Math.min(0.49 / v, 1.3 / y) - 0.012,
            T = (M + w) / 2;
          f.add(
            zs(w - M, 0.0045, 0.003),
            p,
            [x * (0.05 + v * T), -0.32 + y * T, 0.0185],
            [0, 0, x * b],
          );
        }
        for (let g of [0.12, 0.2, 0.28])
          f.add(
            Sa(g, 0.0045, 4, 10, go),
            m,
            [x * 0.05, -0.32, 0.0185],
            [0, 0, x > 0 ? 0 : go],
          );
        for (let g of [0.99, 1.02])
          f.add(zs(0.47, 0.004, 0.003), p, [x * 0.3, g, 0.0185]);
        (f.add(Te(0.022, 2.2, 0.05, 0.004), p, [x * 0.611, 0, 0.025]),
          f.add(Te(0.158, 0.15, 0.08, 0.005), m, [x * 0.69, -1.025, 0.04]));
      }
      (f.add(zs(0.008, 2.2, 0.012), p, [0, 0, 0.02]),
        f.add(Te(1.22, 0.022, 0.05, 0.004), p, [0, 1.111, 0.025]),
        f.add(
          _i(
            [
              [-0.07, 0],
              [-0.07, 0.03],
              [-0.062, 0.038],
              [-0.05, 0.038],
              [-0.046, 0.05],
              [-0.02, 0.05],
              [-0.016, 0.062],
              [0.03, 0.062],
              [0.036, 0.07],
              [0.052, 0.07],
              [0.058, 0.062],
              [0.07, 0.05],
              [0.07, 0],
            ],
            [
              [-0.69, -0.95, 0],
              [-0.69, 1.2, 0],
              [0.69, 1.2, 0],
              [0.69, -0.95, 0],
            ],
            {
              closed: !1,
              up: De(0, 0, 1),
              deg: 35,
            },
          ),
          m,
        ),
        f.add(Te(1.6, 0.03, 0.085, 0.006), m, [0, 1.295, 0.0425]),
        f.add(Te(1.55, 0.016, 0.078, 0.005), m, [0, 1.272, 0.039]),
        f.add(Te(1.2, 0.012, 0.07, 0.003), p, [0, -1.094, 0.035]));
      for (let x of [0.018, 0.034, 0.056])
        f.add(zs(1.19, 0.003, 0.005), m, [0, -1.0875, x]);
      {
        let x = new THREE.Shape();
        (x.moveTo(0.19, 0),
          x.absarc(0, 0, 0.19, 0, Tn, !1),
          x.lineTo(0.19, 0),
          f.add(Fr(x, 0.02, 0.004, 14), m, [0, 1.308, 0]),
          f.add(
            fc(0.33, 0.1768, "ind"),
            d,
            [0, 1.308 + 0.004 + 0.0884, 0.0206],
            null,
            null,
            !0,
          ));
        let g = 1.312 + (0.1768 * 18) / 240,
          b = Tn * (1 - 6.5 / 7);
        (f.add(
          zs(0.108, 0.0035, 0.002),
          m,
          [pi(b) * 0.056, g + So(b) * 0.056, 0.0225],
          [0, 0, b],
        ),
          f.add(ks(0.008, 0.008, 0.004, 10), m, [0, g, 0.0225], [go, 0, 0]));
      }
      (f.add(Te(0.1, 0.24, 0.012, 0.004), m, [0.92, 0, 0.006]),
        f.add(
          fc(0.036, 0.036, "btnUp", 3),
          d,
          [0.92, 0.035, 0.0128],
          null,
          null,
          !0,
        ),
        f.add(
          fc(0.036, 0.036, "btnDn", 3),
          u,
          [0.92, -0.035, 0.0128],
          null,
          null,
          !0,
        ));
      for (let x of [0.035, -0.035])
        f.add(Sa(0.0195, 0.003, 5, 18), m, [0.92, x, 0.0125]);
      (f.add(
        fc(0.076, 0.0285, "plq"),
        u,
        [0.92, 0.092, 0.0128],
        null,
        null,
        !0,
      ),
        f.add(
          ks(0.007, 0.007, 0.004, 10),
          p,
          [0.92, -0.092, 0.013],
          [go, 0, 0],
        ));
      for (let x of [-1, 1])
        for (let g of [-1, 1])
          f.add(
            ks(0.0035, 0.0035, 0.003, 6),
            p,
            [0.92 + x * 0.04, g * 0.108, 0.0125],
            [go, 0, 0],
          );
      return rs("elevatorDoor", [1.94, 2.6, 0.085], {
        surf: "metal",
        wall: !0,
        mountY: 1.1,
        mass: 300,
        colliders: [$s(-0.76, -1.1, 0, 0.76, 1.31, 0.07)],
      });
    }),
    t("luggageCart", null, (f) => {
      let u = o.brass,
        d = o.woodDark,
        m = o.rubber;
      (f.add(
        fi(ui(1.1, 0.6, 0.05), 0.05, 0.007, 5),
        d,
        [0, 0.16, 0],
        null,
        null,
        "x",
      ),
        f.add(
          fi(ui(1.04, 0.54, 0.032), 0.021, 0.004, 5),
          o.carpetLobby,
          [0, 0.208, 0],
        ),
        f.add(Qo(di(1.046, 0.546, 0.034, 0.2105, 4), 0.004, 5, !0), u),
        f.add(Qo(di(1.13, 0.63, 0.075, 0.2, 4), 0.012, 6, !0), u));
      for (let [x, g] of [
        [-0.3, 0.315],
        [0.3, 0.315],
        [-0.3, -0.315],
        [0.3, -0.315],
        [0.565, 0.14],
        [0.565, -0.14],
        [-0.565, 0.14],
        [-0.565, -0.14],
      ]) {
        let b = Math.abs(x) > 0.5 ? Math.sign(x) * 0.54 : x,
          v = Math.abs(x) > 0.5 ? g : Math.sign(g) * 0.29;
        f.rod(u, [b, 0.195, v], [x, 0.2, g], 0.007, 6);
      }
      let p = (x, g, b, v = 0.016, y = 0.03) =>
        f.add(
          pe(
            ke(
              [
                [v, -y / 2],
                [v + 0.005, -y / 2 + 0.003],
                [v + 0.007, 0],
                [v + 0.005, y / 2 - 0.003],
                [v, y / 2],
              ],
              12,
            ),
            40,
          ),
          u,
          [x, g, b],
        );
      for (let x of [-1, 1]) {
        let g = x * 0.5;
        f.add(
          Qo(
            ra(
              [
                [g, 0.2, -0.27],
                [g, 0.9, -0.27],
                [g, 1.4, -0.26],
                [g, 1.66, -0.17],
                [g, 1.76, 0],
                [g, 1.66, 0.17],
                [g, 1.4, 0.26],
                [g, 0.9, 0.27],
                [g, 0.2, 0.27],
              ],
              30,
            ),
            0.016,
            7,
          ),
          u,
        );
        for (let b of [-1, 1])
          (f.add(
            pe(
              ke(
                [
                  [0.034, 0],
                  [0.036, 0.004],
                  [0.036, 0.008],
                  [0.024, 0.016],
                  [0.022, 0.05],
                  [0.016, 0.052],
                ],
                14,
              ),
              40,
            ),
            u,
            [g, 0.208, b * 0.27],
          ),
            p(g, 0.9, b * 0.27),
            p(g, 0.55, b * 0.27, 0.016, 0.018));
        (f.add(
          pe(
            ke(
              [
                [0.016, 0],
                [0.024, 0.006],
                [0.02, 0.016],
                [0.012, 0.02],
                [0.012, 0.026],
                [0.024, 0.036],
                [0.03, 0.052],
                [0.026, 0.068],
                [0.012, 0.079],
                [0, 0.081],
              ],
              14,
            ),
            40,
          ),
          u,
          [g, 1.752, 0],
        ),
          f.add(dr(0.021, 10, 6), u, [x * 0.37, 1.64, 0]),
          f.rod(u, [x * 0.3, 1.755, 0], [x * 0.3, 1.645, 0], 0.006, 6));
        for (let b of [-1, 1]) {
          let v = x * 0.42,
            y = b * 0.22;
          (f.add(h(0.05, 0.03, 12), m, [v, 0.05, y]),
            f.add(ks(0.02, 0.02, 0.034, 10), u, [v, 0.05, y], [0, 0, go]));
          for (let M of [-1, 1])
            f.add(
              pe(
                new THREE.ExtrudeGeometry(
                  new THREE.Shape([
                    oo(-0.022, 0),
                    oo(0.022, 0),
                    oo(0.03, 0.07),
                    oo(0.022, 0.1),
                    oo(-0.022, 0.1),
                    oo(-0.03, 0.07),
                  ]),
                  {
                    depth: 0.004,
                    bevelEnabled: !1,
                  },
                ),
                30,
              ),
              u,
              [v + M * 0.019 - 0.002, 0.036, y],
              [0, go, 0],
            );
          (f.add(Te(0.046, 0.008, 0.06, 0.003), u, [v, 0.138, y]),
            f.add(ks(0.03, 0.03, 0.012, 12), u, [v, 0.151, y]));
        }
      }
      return (
        f.rod(u, [-0.5, 1.76, 0], [0.5, 1.76, 0], 0.014, 8),
        f.rod(u, [-0.37, 1.64, 0], [0.37, 1.64, 0], 0.008, 7),
        rs("luggageCart", [1.14, 1.83, 0.64], {
          surf: "metal",
          mass: 30,
          colliders: [$s(-0.56, 0, -0.31, 0.56, 0.26, 0.31)],
        })
      );
    }),
    t(
      "suitcase",
      (f) => (f.variant | 0) % 3,
      (f, u) => {
        let d = (u.variant | 0) % 3,
          m = n(),
          p = o.brass;
        if (d === 1) {
          let L = s("leatherTan"),
            A = s("leatherBlack"),
            O = 0.215;
          f.add(
            Jo(0.62, 0.42, 0.2, {
              r: 0.03,
              seg: [6, 4, 2],
              arc: 4,
              crown: {
                pz: 0.006,
                nz: 0.006,
              },
              lump: 0.002,
              seed: 21,
            }),
            L,
            [0, O, 0],
          );
          for (let H of [0.034, -0.092, 0.092])
            f.add(
              _i(
                [
                  [-0.003, -0.006],
                  [0.0035, -0.006],
                  [0.0035, 0.006],
                  [-0.003, 0.006],
                ],
                di(
                  H === 0.034 ? 0.62 : 0.606,
                  H === 0.034 ? 0.42 : 0.406,
                  H === 0.034 ? 0.03 : 0.024,
                  H,
                  4,
                  "xy",
                ),
                {
                  up: De(0, 0, 1),
                  deg: 50,
                },
              ),
              H === 0.034 ? A : L,
              [0, O, 0],
            );
          for (let H of [-0.17, 0.17])
            (f.add(
              _i(
                [
                  [-0.0095, -0.018],
                  [0.0095, -0.018],
                  [0.0095, 0.018],
                  [-0.0095, 0.018],
                ],
                di(0.2, 0.42, 0.03, H, 4, "zy"),
                {
                  up: De(1, 0, 0),
                  deg: 50,
                },
              ),
              A,
              [0, O, 0],
            ),
              f.add(
                Dl(0.052, 0.04, [
                  [0, 0],
                  [0, 0.006],
                  [0.007, 0.006],
                  [0.007, 0],
                ]),
                p,
                [H, 0.3, 0.1085],
              ),
              f.rod(
                p,
                [H - 0.02, 0.3, 0.113],
                [H + 0.014, 0.3, 0.113],
                0.0022,
                5,
              ),
              f.add(Te(0.044, 0.012, 0.007, 0.002), A, [H, 0.262, 0.111]),
              f.add(
                Te(0.03, 0.044, 0.01, 0.003),
                p,
                [H * 0.42, 0.398, 0.1],
                [-0.1, 0, 0],
              ));
          for (let H of [-1, 1])
            for (let F of [-1, 1])
              for (let P of [-1, 1])
                f.add(
                  dr(0.034, 8, 5),
                  p,
                  [H * 0.288, O + F * 0.188, P * 0.078],
                  null,
                  [1, 1, 0.85],
                );
          f.add(
            lc(
              [
                [-0.075, 0.428, 0],
                [-0.062, 0.468, 0],
                [0.062, 0.468, 0],
                [0.075, 0.428, 0],
              ],
              0.0075,
              0.024,
              6,
            ),
            A,
            null,
            null,
            [1, 1, 1.7],
          );
          for (let H of [-1, 1])
            (f.add(Te(0.026, 0.008, 0.036, 0.003), p, [H * 0.075, 0.428, 0]),
              f.add(
                Sa(0.011, 0.0028, 5, 10),
                p,
                [H * 0.075, 0.438, 0],
                [0, go, 0],
              ));
          return (
            f.add(
              fc(0.13, 0.13, "st1"),
              m,
              [-0.02, 0.2, 0.1068],
              [0, 0, 0.12],
              null,
              !0,
            ),
            f.add(
              fc(0.15, 0.095, "st2"),
              m,
              [0.07, 0.115, 0.1066],
              [0, 0, -0.2],
              null,
              !0,
            ),
            f.add(
              fc(0.1, 0.113, "st3"),
              m,
              [0.06, 0.25, -0.1068],
              [0, Tn, 0.3],
              null,
              !0,
            ),
            f.add(
              cu(fc(0.05, 0.08, "tag")),
              m,
              [0.105, 0.385, 0.111],
              [0.12, 0, -0.3],
              null,
              !0,
            ),
            rs("suitcase", [0.62, 0.47, 0.21], {
              surf: "fabric",
              dynamic: !0,
              mass: 12,
            })
          );
        }
        let [x, g, b, v] =
            d === 0
              ? [0.46, 0.64, 0.27, o.plasticBlack]
              : [0.36, 0.5, 0.22, o.plasticWhite],
          y = 0.055,
          M = y + g / 2,
          w = y + g,
          T = d === 0 ? 6 : 5,
          S = g - 0.1,
          E = o.rubber,
          _ = o.steel;
        f.add(
          Jo(x, g, b, {
            r: 0.05,
            seg: [3, T * 2, 2],
            arc: 4,
            crown: {
              pz: 0.004,
              nz: 0.004,
            },
            sculpt: (L, A, O) => {
              Math.abs(A.z) > 0.6 &&
                (L.z -=
                  Math.sign(A.z) *
                  0.008 *
                  (1 - lw(L.y + S / 2, S / T, 0.3)) *
                  (1 - Math.pow(Math.abs(O[0]), 8)));
            },
          }),
          v,
          [0, M, 0],
        );
        {
          let L = di(x, g, 0.05, 0, 5, "xy");
          (f.add(
            _i(
              [
                [-0.002, -0.011],
                [0.002, -0.011],
                [0.002, 0.011],
                [-0.002, 0.011],
              ],
              L,
              {
                up: De(0, 0, 1),
                deg: 50,
              },
            ),
            E,
            [0, M, 0],
          ),
            f.add(
              c(l(L, 0.03), 0.0075, "zip", 0.0026),
              m,
              [0, M, 0],
              null,
              null,
              !0,
            ));
          for (let A of [0.04, -0.02])
            (f.add(
              Te(0.012, 0.03, 0.006, 0.002),
              _,
              [x / 2 + 0.006, M + A, 0.006],
              [0, 0, 0.2],
            ),
              f.add(Te(0.006, 0.012, 0.012, 0.002), _, [
                x / 2 + 0.004,
                M + A + 0.016,
                0,
              ]));
        }
        for (let L of [-1, 1])
          for (let A of [-1, 1]) {
            let O = L * (x / 2 - 0.05),
              H = A * (b / 2 - 0.045);
            for (let F of [-1, 1])
              f.add(
                ks(0.027, 0.027, 0.012, 12),
                E,
                [O + F * 0.0095, 0.027, H],
                [0, 0, go],
              );
            (f.add(ks(0.011, 0.011, 0.034, 8), _, [O, 0.027, H], [0, 0, go]),
              f.add(Te(0.05, 0.034, 0.058, 0.012), v, [O, 0.066, H]),
              f.add(ks(0.006, 0.006, 0.03, 6), _, [O, 0.045, H]));
          }
        let R = d === 0 ? 0.3 : 0.03,
          C = -b / 2 + 0.05;
        f.add(Te(0.25, 0.01, 0.056, 0.004), v, [0, w + 0.001, C]);
        for (let L of [-1, 1])
          (f.add(ks(0.0088, 0.0088, R * 0.55 + 0.012, 8), _, [
            L * 0.08,
            w + (R * 0.55 + 0.012) / 2,
            C,
          ]),
            d === 0 &&
              (f.add(ks(0.0068, 0.0068, R * 0.5, 8), _, [
                L * 0.08,
                w + R * 0.55 + R * 0.25,
                C,
              ]),
              f.add(ks(0.0098, 0.0098, 0.01, 8), E, [
                L * 0.08,
                w + R * 0.55 + 0.012,
                C,
              ])));
        (f.add(
          Jo(0.2, 0.024, 0.032, {
            r: 0.011,
            seg: [3, 1, 1],
            arc: 2,
            crown: 0.002,
          }),
          E,
          [0, w + R + 0.012, C],
        ),
          f.add(Te(0.03, 0.004, 0.012, 0.002), _, [0, w + R + 0.0245, C]),
          f.add(
            lc(
              [
                [-0.062, w - 0.004, 0.02],
                [-0.05, w + 0.017, 0.02],
                [0.05, w + 0.017, 0.02],
                [0.062, w - 0.004, 0.02],
              ],
              0.006,
              0.014,
              6,
            ),
            E,
            null,
            null,
            [1, 1, 1],
            null,
          ),
          f.add(
            lc(
              [
                [x / 2 - 0.004, M - 0.062, 0.03],
                [x / 2 + 0.014, M - 0.05, 0.03],
                [x / 2 + 0.014, M + 0.05, 0.03],
                [x / 2 - 0.004, M + 0.062, 0.03],
              ],
              0.006,
              0.014,
              6,
            ),
            E,
          ));
        for (let L of [M - g * 0.3, M + g * 0.3])
          f.add(
            ks(0.012, 0.014, 0.012, 8),
            E,
            [-x / 2 - 0.004, L, -b * 0.25],
            [0, 0, go],
          );
        return (
          f.add(Te(0.074, 0.03, 0.006, 0.003), v, [
            0,
            M + g * 0.36,
            b / 2 + 0.003,
          ]),
          f.add(
            fc(0.064, 0.0224, "cbadge"),
            m,
            [0, M + g * 0.36, b / 2 + 0.0064],
            null,
            null,
            !0,
          ),
          f.add(
            fc(0.044, 0.0275, "lock"),
            m,
            [x / 2 + 0.0035, M + g * 0.22, 0.03],
            [0, go, 0],
            null,
            !0,
          ),
          d === 2 &&
            (f.add(
              fc(0.1, 0.063, "st2"),
              m,
              [0.03, M - 0.06, b / 2 + 0.0062],
              [0, 0, 0.25],
              null,
              !0,
            ),
            f.add(
              fc(0.075, 0.085, "st3"),
              m,
              [-0.07, M + 0.03, b / 2 + 0.0062],
              [0, 0, -0.15],
              null,
              !0,
            )),
          rs("suitcase", [x + 0.01, 0.055 + g + R + 0.03, b + 0.02], {
            surf: "plastic",
            dynamic: !0,
            mass: d === 0 ? 14 : 8,
          })
        );
      },
    ));
}

export { registerLobbyProps };

// scene/props/service.js: recovered from the verified GOLDEN HOUR release.
import {
  $s,
  De,
  Dl,
  Fr,
  Jo,
  Qo,
  Sa,
  Te,
  Yi,
  _i,
  cc,
  cu,
  di,
  dr,
  fi,
  hu,
  ke,
  ks,
  lc,
  ll,
  oo,
  pe,
  ra,
  rs,
  ui,
  zs,
} from "../geometry.js";
import { TAU, clamp, createCanvas, createRandom } from "../../core/math.js";
import { THREE } from "../../vendor/three-r180.js";

var hl = Math.PI;
var Hi = hl / 2;
var AD = 1024;
var kD = 1024;
var Ko = (o, t = 20, e = 38) => pe(ke(o, t), e);
var e2 = (o, t, e, s) => hu(o + 1, t + 1, e - 2, s - 2, AD, kD);
var cl = {
  cartonA: e2(0, 0, 320, 224),
  cartonB: e2(320, 0, 320, 224),
  tinA: e2(640, 0, 384, 128),
  tinB: e2(640, 128, 384, 128),
  gauge: e2(0, 232, 128, 128),
  label: e2(128, 232, 192, 256),
  wet: e2(320, 232, 256, 512),
  dial: e2(576, 264, 96, 96),
  plate: e2(576, 360, 160, 64),
  ctrl: e2(576, 424, 224, 64),
  kraft: e2(800, 264, 64, 64),
};
var vw = (o, t) => {
  let e = o.attributes.uv;
  for (let s = 0; s < e.count; s++)
    e.setXY(
      s,
      t[0] + (t[2] - t[0]) * e.getX(s),
      t[1] + (t[3] - t[1]) * e.getY(s),
    );
  return o;
};
function h$() {
  let o = createCanvas(AD, kD),
    t = o.getContext("2d"),
    e = createRandom(515),
    s = '"Segoe UI", Arial, sans-serif',
    n = 'Bahnschrift, "Arial Narrow", "Segoe UI", sans-serif',
    i = (a, r, l, c, h = "#111", f = "center") => {
      ((t.font = c),
        (t.fillStyle = h),
        (t.textAlign = f),
        (t.textBaseline = "middle"),
        t.fillText(a, r, l));
    };
  for (let [a, r, l] of [
    [0, "SOLSTICE", "PROVISIONS  \xB7  12 \xD7 750 ml"],
    [320, "MARCH\xC9 SUD", "DRY GOODS  \xB7  KEEP DRY"],
  ]) {
    ((t.fillStyle = "#a9824f"), t.fillRect(a, 0, 320, 224));
    for (let c = 0; c < 900; c++)
      ((t.fillStyle = `rgba(${(60 + e() * 60) | 0},${(40 + e() * 40) | 0},20,${0.04 + e() * 0.07})`),
        t.fillRect(a + e() * 320, e() * 224, 6 + e() * 26, 1));
    ((t.fillStyle = "rgba(214,190,140,0.9)"),
      t.fillRect(a, 96, 320, 30),
      (t.fillStyle = "rgba(60,40,20,0.25)"),
      t.fillRect(a, 96, 320, 1.5),
      t.fillRect(a, 125, 320, 1.5),
      i(r, a + 160, 44, `800 34px ${n}`, "#2a1c10"),
      i(l, a + 160, 74, `600 13px ${s}`, "#2a1c10"),
      (t.strokeStyle = "#2a1c10"),
      (t.lineWidth = 2.5));
    for (let c of [a + 36, a + 66])
      (t.beginPath(),
        t.moveTo(c, 204),
        t.lineTo(c, 150),
        t.moveTo(c - 10, 162),
        t.lineTo(c, 148),
        t.lineTo(c + 10, 162),
        t.stroke());
    (t.strokeRect(a + 22, 140, 60, 70),
      t.strokeRect(a + 236, 140, 60, 70),
      t.beginPath(),
      t.moveTo(a + 254, 150),
      t.lineTo(a + 278, 150),
      t.lineTo(a + 272, 176),
      t.lineTo(a + 260, 176),
      t.closePath(),
      t.moveTo(a + 266, 176),
      t.lineTo(a + 266, 198),
      t.moveTo(a + 254, 200),
      t.lineTo(a + 278, 200),
      t.stroke(),
      i("FRAGILE", a + 160, 176, `800 20px ${n}`, "#2a1c10"));
  }
  ((t.fillStyle = "#a9824f"), t.fillRect(800, 264, 64, 64));
  for (let [a, r, l, c, h] of [
    [0, "#a8261a", "#f4e6c4", "POMODORO", "pelati \xB7 2,5 kg"],
    [128, "#e9dcb6", "#1f4a3a", "OLIVE VERDI", "in salamoia \xB7 2 kg"],
  ]) {
    ((t.fillStyle = "#b9bcc0"),
      t.fillRect(640, a, 384, 128),
      (t.fillStyle = r),
      t.fillRect(640, a + 14, 384, 100));
    for (let f of [736, 928])
      ((t.fillStyle = l),
        t.beginPath(),
        t.ellipse(f, a + 64, 78, 40, 0, 0, TAU),
        t.fill(),
        i(c, f, a + 58, `800 22px ${n}`, r),
        i(h, f, a + 80, `600 11px ${s}`, r));
    t.fillStyle = "rgba(0,0,0,0.25)";
    for (let f = 0; f < 8; f++)
      t.fillRect(640, a + 2 + f * 1.5 * (f % 2), 384, 1);
  }
  ((t.fillStyle = "#16171a"),
    t.fillRect(0, 232, 128, 128),
    (t.fillStyle = "#f2efe6"),
    t.beginPath(),
    t.arc(64, 296, 56, 0, TAU),
    t.fill(),
    (t.lineWidth = 12),
    (t.strokeStyle = "#c0261c"),
    t.beginPath(),
    t.arc(64, 296, 40, hl * 0.8, hl * 1.25),
    t.stroke(),
    (t.strokeStyle = "#2a9a44"),
    t.beginPath(),
    t.arc(64, 296, 40, hl * 1.25, hl * 1.75),
    t.stroke(),
    (t.strokeStyle = "#c0261c"),
    t.beginPath(),
    t.arc(64, 296, 40, hl * 1.75, hl * 2.2),
    t.stroke(),
    (t.strokeStyle = "#111"),
    (t.lineWidth = 4),
    t.beginPath(),
    t.moveTo(64, 296),
    t.lineTo(
      64 + Math.cos(hl * 1.5 + 0.12) * 44,
      296 + Math.sin(hl * 1.5 + 0.12) * 44,
    ),
    t.stroke(),
    (t.fillStyle = "#111"),
    t.beginPath(),
    t.arc(64, 296, 6, 0, TAU),
    t.fill(),
    i("bar", 64, 326, `700 12px ${s}`));
  {
    ((t.fillStyle = "#f3f0e8"),
      t.fillRect(128, 232, 192, 256),
      (t.fillStyle = "#b3160f"),
      t.fillRect(128, 232, 192, 52),
      i("FIRE", 224, 252, `800 26px ${n}`, "#fff"),
      i("ABC POWDER  6 kg", 224, 273, `700 12px ${s}`, "#fff"));
    for (let l = 0; l < 3; l++) {
      let c = 296 + l * 46;
      ((t.fillStyle = "#b3160f"),
        t.fillRect(138, c, 38, 38),
        i(String(l + 1), 157, c + 20, `800 24px ${n}`, "#fff"),
        i(
          ["PULL THE PIN", "AIM AT THE BASE", "SQUEEZE \xB7 SWEEP"][l],
          184,
          c + 12,
          `800 13px ${n}`,
          "#111",
          "left",
        ),
        (t.fillStyle = "#555"),
        t.fillRect(184, c + 23, 118, 2),
        t.fillRect(184, c + 29, 92, 2));
    }
    for (let [l, c, h] of [
      [0, "A", "#2a9a44"],
      [1, "B", "#c0261c"],
      [2, "C", "#2a5aa8"],
    ])
      ((t.fillStyle = h),
        t.fillRect(140 + l * 58, 438, 50, 40),
        i(c, 165 + l * 58, 459, `800 26px ${n}`, "#fff"));
  }
  ((t.fillStyle = "#e9b20e"),
    t.fillRect(320, 232, 256, 512),
    i("CAUTION", 448, 302, `800 50px ${n}`, "#15120a"),
    (t.fillStyle = "#15120a"),
    t.beginPath(),
    t.moveTo(448, 350),
    t.lineTo(546, 528),
    t.lineTo(350, 528),
    t.closePath(),
    t.fill(),
    (t.fillStyle = "#e9b20e"),
    t.beginPath(),
    t.moveTo(448, 382),
    t.lineTo(518, 512),
    t.lineTo(378, 512),
    t.closePath(),
    t.fill(),
    (t.strokeStyle = "#15120a"),
    (t.fillStyle = "#15120a"),
    (t.lineWidth = 9),
    (t.lineCap = "round"),
    t.beginPath(),
    t.arc(470, 420, 9, 0, TAU),
    t.fill(),
    t.beginPath(),
    t.moveTo(462, 436),
    t.lineTo(438, 468),
    t.lineTo(412, 482),
    t.moveTo(438, 468),
    t.lineTo(460, 494),
    t.moveTo(456, 444),
    t.lineTo(432, 438),
    t.moveTo(458, 446),
    t.lineTo(482, 460),
    t.stroke(),
    (t.lineWidth = 4),
    t.beginPath(),
    t.moveTo(398, 504),
    t.lineTo(498, 504),
    t.stroke(),
    i("WET", 448, 588, `800 64px ${n}`, "#15120a"),
    i("FLOOR", 448, 652, `800 64px ${n}`, "#15120a"),
    i(
      "PISO MOJADO  \xB7  SOL MOUILL\xC9",
      448,
      708,
      `700 13px ${s}`,
      "#15120a",
    ));
  {
    ((t.fillStyle = "#0c0c0d"),
      t.fillRect(576, 264, 96, 96),
      (t.strokeStyle = "#e8e4da"),
      (t.lineWidth = 2));
    for (let l = 0; l <= 8; l++) {
      let c = hl * 0.75 + (l / 8) * hl * 1.5;
      (t.beginPath(),
        t.moveTo(624 + Math.cos(c) * 36, 312 + Math.sin(c) * 36),
        t.lineTo(
          624 + Math.cos(c) * (l % 4 ? 41 : 45),
          312 + Math.sin(c) * (l % 4 ? 41 : 45),
        ),
        t.stroke());
    }
    (i("OFF", 624, 352, `700 10px ${s}`, "#e8e4da"),
      (t.fillStyle = "#c0261c"),
      t.beginPath(),
      t.arc(660, 282, 3, 0, TAU),
      t.fill(),
      (t.fillStyle = "#c9ccd0"),
      t.fillRect(576, 360, 160, 64),
      (t.strokeStyle = "#333"),
      (t.lineWidth = 1.5),
      t.strokeRect(580, 364, 152, 56),
      i("VULCANO", 656, 380, `800 20px ${n}`, "#222"),
      i("MOD. 6B-90   GAS  G20   24 kW", 656, 400, `600 8px ${s}`, "#222"),
      i("N\xB0 47-01193", 656, 412, `600 8px ${s}`, "#222"),
      (t.fillStyle = "#0b0c0e"),
      t.fillRect(576, 424, 224, 64),
      i("\xB0C", 668, 456, `700 20px ${s}`, "#9fb4c4", "left"));
    for (let l = 0; l < 3; l++)
      ((t.strokeStyle = "#8a8f96"),
        (t.lineWidth = 2),
        t.strokeRect(704 + l * 30, 444, 22, 22),
        i(
          ["\u25B2", "\u25BC", "\u2744"][l],
          715 + l * 30,
          456,
          `600 12px ${s}`,
          "#c8ccd2",
        ));
    i("POLAR 1300", 600, 476, `700 9px ${s}`, "#8a8f96", "left");
  }
  return ll(o);
}
function registerServiceProps({ M: o, def: t, lib: e }) {
  let s = () =>
      e(
        "serviceAtlas",
        () =>
          new THREE.MeshStandardMaterial({
            map: h$(),
            roughness: 0.62,
            metalness: 0,
          }),
      ),
    n = () =>
      e(
        "yellow",
        () =>
          new THREE.MeshStandardMaterial({
            color: 15315470,
            roughness: 0.55,
          }),
      ),
    i = () =>
      e(
        "red",
        () =>
          new THREE.MeshStandardMaterial({
            color: 11015182,
            roughness: 0.28,
            metalness: 0.15,
          }),
      ),
    a = o.steel,
    r = o.chrome,
    l = o.blackMetal,
    c = (u, d, m, p = 0.1, x = 0.02) =>
      u.add(
        Ko(
          [
            [0, 0],
            [x * 0.9, 0],
            [x * 1.1, 0.004],
            [x * 1.1, 0.014],
            [x * 0.6, 0.02],
            [x * 0.6, 0.034],
            [x, 0.038],
            [x, p],
          ],
          10,
        ),
        a,
        [d, 0, m],
      ),
    h = (u, d, m, p, x, g = 0.007) => {
      u.add(ks(g, g, x, 8), r, [d, m, p + 0.03], [0, 0, Hi]);
      for (let b of [-1, 1])
        u.add(
          ks(g * 0.8, g * 0.8, 0.03, 6),
          r,
          [d + b * (x / 2 - 0.02), m, p + 0.015],
          [Hi, 0, 0],
        );
    },
    f = (u, d, m, p) => {
      (u.add(ks(0.006, 0.006, 0.05, 6), a, [d, m, p]),
        u.add(zs(0.022, 0.044, 0.003), a, [d, m, p - 0.004]));
    };
  (t(
    "kitchenCounter",
    (u) => (u.len || 2).toFixed(2),
    (u, d) => {
      let m = d.len || 2,
        p = Math.max(1, Math.round(m / 0.55)),
        x = m / p,
        g = m + 0.02;
      u.add(zs(m - 0.04, 0.1, 0.5), l, [0, 0.05, -0.06]);
      for (let b = 0; b <= p; b++)
        c(
          u,
          clamp(-m / 2 + x * b, -m / 2 + 0.04, m / 2 - 0.04),
          0.245,
          0.1,
          0.018,
        );
      (u.add(Te(m, 0.78, 0.64, 0.005), a, [0, 0.49, -0.02], null, null, "y"),
        u.add(
          _i(
            [
              [-0.35, 0.88],
              [0.336, 0.88],
              [0.346, 0.884],
              [0.35, 0.894],
              [0.35, 0.908],
              [0.346, 0.917],
              [0.338, 0.92],
              [-0.318, 0.92],
              [-0.328, 0.923],
              [-0.33, 0.932],
              [-0.33, 1.036],
              [-0.334, 1.04],
              [-0.35, 1.04],
            ],
            [
              [-g / 2, 0, 0],
              [g / 2, 0, 0],
            ],
            {
              closed: !1,
              deg: 34,
            },
          ),
          a,
          null,
          null,
          null,
          "x",
        ));
      for (let b = 0; b < p; b++) {
        let v = -m / 2 + x * (b + 0.5),
          y = p > 2 && b % 4 === 1;
        (u.add(
          Te(x - 0.012, 0.15, 0.016, 0.004),
          a,
          [v, 0.785, 0.306],
          null,
          null,
          "x",
        ),
          u.add(
            Te(x - 0.012, 0.52, 0.016, 0.004),
            a,
            [v, 0.44, 0.306],
            null,
            null,
            "y",
          ),
          u.add(zs(x - 0.02, 0.69, 0.004), l, [v, 0.525, 0.298]),
          h(u, v, 0.785, 0.314, x * 0.5),
          h(u, v, 0.66, 0.314, x * 0.5));
        let M = v + (b % 2 ? 1 : -1) * (x / 2 - 0.012);
        if ((f(u, M, 0.26, 0.318), f(u, M, 0.62, 0.318), y))
          for (let w = 0; w < 7; w++)
            u.add(zs(x * 0.6, 0.008, 0.004), l, [v, 0.25 + w * 0.022, 0.3145]);
      }
      return rs("kitchenCounter", [m + 0.02, 1.04, 0.7], {
        surf: "metal",
        mass: 60 * m,
        colliders: [$s(-m / 2, 0, -0.35, m / 2, 0.92, 0.35)],
      });
    },
  ),
    t("stove", null, (u) => {
      let d = s();
      for (let m of [-1, 1])
        for (let p of [-1, 1]) c(u, m * 0.4, p * 0.32, 0.07, 0.024);
      (u.add(Te(0.9, 0.84, 0.76, 0.006), a, [0, 0.48, 0], null, null, "y"),
        u.add(Te(0.88, 0.02, 0.62, 0.004), l, [0, 0.908, 0.05]),
        u.add(
          Dl(0.9, 0.66, [
            [0, 0],
            [0, 0.012],
            [0.004, 0.016],
            [0.012, 0.016],
            [0.016, 0.01],
            [0.016, 0],
          ]).rotateX(-Hi),
          a,
          [0, 0.905, 0.05],
        ));
      for (let m = 0; m < 6; m++) {
        let p = ((m % 3) - 1) * 0.28,
          x = m < 3 ? -0.1 : 0.2;
        (u.add(
          Ko(
            [
              [0, 0],
              [0.05, 0],
              [0.056, 0.004],
              [0.056, 0.008],
              [0.044, 0.012],
              [0.044, 0.016],
              [0.036, 0.02],
              [0.03, 0.02],
              [0.03, 0.017],
              [0, 0.017],
            ],
            14,
          ),
          l,
          [p, 0.918, x],
        ),
          u.add(Sa(0.071, 0.005, 4, 16), l, [p, 0.924, x], [Hi, 0, 0]));
        for (let g of [0, Hi, hl, -Hi])
          u.at([p, 0, x], [0, g, 0], () => {
            (u.add(zs(0.012, 0.016, 0.085), l, [0, 0.937, 0.085]),
              u.add(zs(0.262, 0.014, 0.012), l, [0, 0.932, 0.126]));
          });
      }
      u.add(
        Te(0.9, 0.1, 0.035, 0.008),
        a,
        [0, 0.84, 0.392],
        [-0.25, 0, 0],
        null,
        "x",
      );
      for (let m = 0; m < 7; m++)
        u.at([-0.36 + m * 0.12, 0.84, 0.4095], [Hi - 0.25, 0, 0], () => {
          (u.add(
            vw(new THREE.CircleGeometry(0.03, 16), cl.dial).rotateX(-Hi),
            d,
            [0, 6e-4, 0],
            null,
            null,
            !0,
          ),
            u.add(
              Ko(
                [
                  [0.021, 0.001],
                  [0.023, 0.006],
                  [0.0215, 0.024],
                  [0.018, 0.028],
                  [0, 0.028],
                ],
                12,
              ),
              l,
            ),
            u.add(zs(0.005, 0.006, 0.036), a, [0, 0.0285, 0]));
        });
      (u.add(
        Te(0.82, 0.52, 0.022, 0.006),
        a,
        [0, 0.45, 0.387],
        null,
        null,
        "x",
      ),
        u.add(
          Dl(0.56, 0.26, [
            [0, 0],
            [0, 0.005],
            [0.004, 0.008],
            [0.014, 0.008],
            [0.02, 0.003],
            [0.02, 0],
          ]),
          a,
          [0, 0.48, 0.398],
        ),
        u.add(Te(0.52, 0.22, 0.006, 0.002), o.screenOff, [0, 0.48, 0.399]),
        u.add(ks(0.011, 0.011, 0.72, 10), r, [0, 0.74, 0.435], [0, 0, Hi]));
      for (let m of [-1, 1])
        (u.add(
          Ko(
            [
              [0.012, 0],
              [0.012, 0.004],
              [0.0075, 0.008],
              [0.0075, 0.04],
            ],
            8,
          ),
          r,
          [m * 0.33, 0.74, 0.397],
          [Hi, 0, 0],
        ),
          f(u, m * 0.36, 0.2, 0.4));
      for (let m = 0; m < 5; m++)
        u.add(zs(0.5, 0.006, 0.004), l, [0, 0.105 + m * 0.014, 0.3795]);
      (u.add(
        cc(0.085, 0.034, cl.plate),
        d,
        [0.33, 0.13, 0.381],
        null,
        null,
        !0,
      ),
        u.add(Te(0.9, 0.4, 0.05, 0.008), a, [0, 1.1, -0.355], null, null, "x"));
      for (let m = 0; m < 6; m++)
        u.add(zs(0.7, 0.01, 0.004), l, [0, 1 + m * 0.024, -0.3285]);
      u.add(Te(0.9, 0.022, 0.26, 0.006), a, [0, 1.3, -0.25], null, null, "x");
      for (let m of [-1, 1])
        u.add(
          pe(
            new THREE.ExtrudeGeometry(
              new THREE.Shape([oo(0, 0), oo(0.2, 0), oo(0, -0.16)]),
              {
                depth: 0.004,
                bevelEnabled: !1,
              },
            ),
            30,
          ),
          a,
          [m * 0.44 - 0.002, 1.289, -0.33],
          [0, -Hi, 0],
        );
      return rs("stove", [0.9, 1.31, 0.82], {
        surf: "metal",
        mass: 150,
        colliders: [
          $s(-0.45, 0, -0.38, 0.45, 0.94, 0.4),
          $s(-0.45, 0.94, -0.38, 0.45, 1.31, -0.3),
        ],
      });
    }),
    t("fridge", null, (u) => {
      let d = s();
      for (let m of [-1, 1])
        for (let p of [-1, 1]) c(u, m * 0.58, p * 0.32, 0.07, 0.026);
      (u.add(Te(1.3, 1.96, 0.76, 0.012), a, [0, 1.04, -0.02], null, null, "y"),
        u.add(Te(1.24, 0.17, 0.012, 0.004), l, [0, 1.905, 0.362]));
      for (let m = 0; m < 9; m++)
        u.add(
          zs(0.8, 0.007, 0.016),
          a,
          [0.18, 1.838 + m * 0.0165, 0.371],
          [0.5, 0, 0],
        );
      (u.add(cc(0.21, 0.06, cl.ctrl), d, [-0.4, 1.905, 0.3686], null, null, !0),
        u.add(Te(0.07, 0.03, 0.004, 0.001), o.bulbCool, [-0.47, 1.905, 0.3695]),
        u.add(zs(1.26, 0.07, 0.01), l, [0, 0.095, 0.362]));
      for (let m of [-1, 1]) {
        (u.add(
          Te(0.63, 1.68, 0.035, 0.012),
          a,
          [m * 0.322, 0.97, 0.378],
          null,
          null,
          "y",
        ),
          u.add(zs(0.618, 1.668, 0.006), l, [m * 0.322, 0.97, 0.3595]),
          u.add(ks(0.012, 0.012, 0.62, 10), r, [m * 0.06, 1.1, 0.432]));
        for (let p of [0.83, 1.37])
          u.add(Te(0.022, 0.03, 0.045, 0.005), r, [m * 0.06, p, 0.412]);
        for (let p of [0.24, 0.97, 1.7]) f(u, m * 0.642, p, 0.392);
        u.add(
          Ko(
            [
              [0, 0],
              [0.009, 0],
              [0.009, 0.004],
              [0.006, 0.006],
              [0, 0.006],
            ],
            10,
          ),
          r,
          [m * 0.06, 0.62, 0.3955],
          [Hi, 0, 0],
        );
      }
      return (
        u.add(
          cc(0.09, 0.036, cl.plate),
          d,
          [0.5, 1.72, 0.3962],
          null,
          null,
          !0,
        ),
        rs("fridge", [1.3, 2.02, 0.84], {
          surf: "metal",
          mass: 220,
          colliders: [$s(-0.65, 0, -0.4, 0.65, 2.02, 0.4)],
        })
      );
    }),
    t("shelfRack", null, (u) => {
      let d = s(),
        m = o.ceramicWhite;
      for (let g of [-1, 1])
        for (let b of [-1, 1]) {
          (u.add(ks(0.013, 0.013, 1.78, 8), r, [g * 0.58, 0.93, b * 0.2]),
            u.add(
              Ko(
                [
                  [0, 0],
                  [0.016, 0],
                  [0.019, 0.004],
                  [0.019, 0.012],
                  [0.008, 0.018],
                  [0.008, 0.04],
                ],
                8,
              ),
              r,
              [g * 0.58, 0, b * 0.2],
            ),
            u.add(
              dr(0.014, 8, 5),
              r,
              [g * 0.58, 1.82, b * 0.2],
              null,
              [1, 0.7, 1],
            ));
          for (let v of [0.14, 0.64, 1.14, 1.62])
            u.add(
              Ko(
                [
                  [0.013, -0.022],
                  [0.019, -0.016],
                  [0.017, 0.012],
                  [0.013, 0.016],
                ],
                6,
              ),
              r,
              [g * 0.58, v, b * 0.2],
            );
        }
      for (let g of [0.14, 0.64, 1.14, 1.62]) {
        u.add(Te(1.18, 0.016, 0.42, 0.004), a, [0, g, 0], null, null, "x");
        for (let b of [-1, 1]) {
          (u.rod(
            r,
            [-0.58, g + 0.03, b * 0.2],
            [0.58, g + 0.03, b * 0.2],
            0.005,
            6,
          ),
            u.rod(
              r,
              [-0.58, g - 0.014, b * 0.205],
              [0.58, g - 0.014, b * 0.205],
              0.005,
              6,
            ));
          let v = [];
          for (let y = 0; y <= 12; y++)
            v.push([
              -0.56 + y * 0.0933,
              g + (y % 2 ? 0.028 : -0.012),
              b * 0.2025,
            ]);
          u.add(Qo(v, 0.0028, 3, !1, !1), r);
        }
        for (let b of [-1, 1])
          u.rod(
            r,
            [b * 0.58, g + 0.03, -0.2],
            [b * 0.58, g + 0.03, 0.2],
            0.005,
            6,
          );
      }
      let p = (g, b, v, y, M, w, T, S) => {
        let E = new THREE.BoxGeometry(g, b, v),
          _ = E.attributes.uv;
        for (let R = 0; R < _.count; R++) {
          let C = R >> 2,
            L =
              C === 4 || C === 5
                ? S
                : C < 2
                  ? S === cl.cartonA
                    ? cl.cartonB
                    : cl.cartonA
                  : cl.kraft;
          _.setXY(
            R,
            L[0] + (L[2] - L[0]) * _.getX(R),
            L[1] + (L[3] - L[1]) * _.getY(R),
          );
        }
        u.add(E, d, [y, M, w], [0, T, 0], null, !0);
      };
      (p(0.42, 0.3, 0.34, -0.3, 0.3, 0, 0, cl.cartonA),
        p(0.36, 0.24, 0.3, 0.22, 0.27, 0.01, 0.12, cl.cartonB),
        p(0.3, 0.2, 0.28, 0.32, 1.73, 0, -0.1, cl.cartonA),
        p(0.34, 0.16, 0.3, -0.28, 1.71, 0.01, 0, cl.cartonB));
      let x = [[0, 0]];
      for (let g = 0; g < 7; g++)
        x.push([0.127, g * 0.025 + 0.004], [0.136, g * 0.025 + 0.02]);
      x.push([0, 0.18]);
      for (let g of [-0.4, -0.1]) u.add(Ko(x, 12, 30), m, [g, 0.648, 0]);
      u.add(
        Ko(
          [
            [0, 0],
            [0.14, 0],
            [0.15, 0.01],
            [0.15, 0.236],
            [0.156, 0.24],
            [0.156, 0.245],
            [0.146, 0.245],
            [0.144, 0.02],
            [0, 0.018],
          ],
          18,
        ),
        a,
        [0.33, 0.648, 0],
      );
      for (let g of [-1, 1])
        u.add(
          Sa(0.032, 0.005, 5, 10, hl),
          a,
          [0.33 + g * 0.152, 0.84, 0],
          [Hi, g * Hi, 0],
        );
      for (let g = 0; g < 7; g++) {
        let b = -0.46 + g * 0.115,
          v = -0.08 + (g % 2) * 0.1;
        (u.add(
          Ko(
            [
              [0, 0],
              [0.05, 0.002],
              [0.05, 0.128],
              [0.044, 0.127],
              [0, 0.127],
            ],
            10,
          ),
          a,
          [b, 1.148, v],
        ),
          u.add(
            vw(
              new THREE.CylinderGeometry(0.0506, 0.0506, 0.1, 10, 1, !0),
              g % 2 ? cl.tinA : cl.tinB,
            ),
            d,
            [b, 1.213, v],
            [0, g * 1.3, 0],
            null,
            !0,
          ));
      }
      for (let g = 0; g < 4; g++)
        u.add(
          Ko(
            [
              [0, 0],
              [0.055, 0],
              [0.06, 0.008],
              [0.06, 0.128],
              [0.042, 0.146],
              [0.046, 0.156],
              [0.046, 0.168],
              [0, 0.17],
            ],
            10,
          ),
          m,
          [0.1 + g * 0.13, 1.148, 0.1],
        );
      return rs("shelfRack", [1.2, 1.85, 0.46], {
        surf: "metal",
        mass: 70,
        colliders: [$s(-0.6, 0, -0.23, 0.6, 1.85, 0.23)],
      });
    }),
    t(
      "pot",
      (u) => (u.variant | 0) % 3,
      (u, d) => {
        let m = (d.variant | 0) % 3,
          p = (x, g, b, v) => u.add(dr(0.0045, 6, 4), x, [g, b, v]);
        if (m === 0) {
          u.add(
            Ko(
              [
                [0, 0],
                [0.146, 0],
                [0.152, 0.003],
                [0.154, 0.012],
                [0.16, 0.016],
                [0.16, 0.214],
                [0.163, 0.221],
                [0.167, 0.224],
                [0.167, 0.2275],
                [0.161, 0.2275],
                [0.1545, 0.221],
                [0.154, 0.026],
                [0.146, 0.02],
                [0, 0.02],
              ],
              24,
            ),
            a,
          );
          for (let x of [-1, 1]) {
            u.add(
              lc(
                [
                  [x * 0.156, 0.17, -0.045],
                  [x * 0.196, 0.172, -0.04],
                  [x * 0.196, 0.172, 0.04],
                  [x * 0.156, 0.17, 0.045],
                ],
                0.0058,
                0.02,
                6,
              ),
              a,
            );
            for (let g of [-0.045, 0.045])
              (u.add(Te(0.006, 0.022, 0.024, 0.002), a, [x * 0.161, 0.17, g]),
                p(a, x * 0.164, 0.17, g));
          }
          return rs("pot", [0.4, 0.23, 0.33], {
            surf: "metal",
            dynamic: !0,
            mass: 2.5,
          });
        }
        return m === 1
          ? (u.add(
              Ko(
                [
                  [0, 0],
                  [0.088, 0],
                  [0.094, 0.003],
                  [0.096, 0.01],
                  [0.1, 0.014],
                  [0.105, 0.108],
                  [0.109, 0.113],
                  [0.109, 0.116],
                  [0.103, 0.116],
                  [0.0985, 0.11],
                  [0.0945, 0.022],
                  [0.088, 0.018],
                  [0, 0.018],
                ],
                20,
              ),
              a,
            ),
            u.add(Te(0.02, 0.03, 0.03, 0.004), a, [0.108, 0.094, 0]),
            p(a, 0.119, 0.1, 0.008),
            p(a, 0.119, 0.1, -0.008),
            u.add(
              Yi(
                Jo(0.2, 0.014, 0.026, {
                  r: 0.006,
                  seg: [5, 1, 1],
                  arc: 2,
                }),
                (x) => {
                  let g = x.x / 0.2 + 0.5;
                  ((x.z *= 0.75 + 0.5 * g), (x.y += 0.006 * Math.sin(g * hl)));
                },
              ),
              o.plasticBlack,
              [0.2, 0.1, 0],
              [0, 0, 0.12],
            ),
            u.add(Sa(0.008, 0.0025, 4, 8), a, [0.303, 0.1135, 0], [0, 0, 0.12]),
            rs("pot", [0.42, 0.13, 0.22], {
              surf: "metal",
              dynamic: !0,
              mass: 1.2,
            }))
          : (u.add(
              Ko(
                [
                  [0, 0],
                  [0.108, 0],
                  [0.118, 0.003],
                  [0.126, 0.009],
                  [0.146, 0.044],
                  [0.15, 0.047],
                  [0.15, 0.05],
                  [0.144, 0.05],
                  [0.14, 0.046],
                  [0.121, 0.015],
                  [0.11, 0.012],
                  [0, 0.012],
                ],
                24,
              ),
              l,
            ),
            u.add(
              Yi(
                Jo(0.2, 0.012, 0.028, {
                  r: 0.005,
                  seg: [5, 1, 1],
                  arc: 2,
                }),
                (x) => {
                  let g = x.x / 0.2 + 0.5;
                  ((x.z *= 1.15 - 0.45 * Math.abs(g - 0.6)),
                    (x.y += 0.014 * g * g));
                },
              ),
              l,
              [0.24, 0.057, 0],
              [0, 0, 0.14],
            ),
            p(l, 0.152, 0.049, 0.008),
            p(l, 0.152, 0.049, -0.008),
            rs("pot", [0.5, 0.08, 0.3], {
              surf: "metal",
              dynamic: !0,
              mass: 1.4,
            }));
      },
    ),
    t("extinguisher", null, (u) => {
      let d = s(),
        m = i(),
        p = 0.085;
      u.add(Te(0.1, 0.34, 0.006, 0.002), a, [0, -0.02, 0.003]);
      for (let x of [0.12, -0.16])
        u.add(ks(0.006, 0.006, 0.004, 6), l, [0, x, 0.0075], [Hi, 0, 0]);
      return (
        u.add(Te(0.05, 0.03, p - 0.06, 0.004), a, [
          0,
          0.04,
          (p - 0.06) / 2 + 0.004,
        ]),
        u.add(
          Sa(0.0685, 0.0045, 5, 22),
          a,
          [0, 0.04, p],
          [Hi, 0, 0],
          [1, 1, 3.2],
        ),
        u.add(Te(0.03, 0.022, 0.008, 0.002), a, [0, 0.04, p + 0.071]),
        u.add(
          Ko(
            [
              [0, -0.214],
              [0.05, -0.214],
              [0.058, -0.22],
              [0.064, -0.22],
              [0.066, -0.214],
              [0.066, -0.2],
              [0.0665, -0.196],
              [0.0665, 0.086],
              [0.064, 0.108],
              [0.056, 0.132],
              [0.042, 0.152],
              [0.03, 0.162],
              [0.024, 0.166],
              [0.024, 0.18],
              [0, 0.18],
            ],
            22,
          ),
          m,
          [0, 0, p],
        ),
        u.add(
          vw(
            new THREE.CylinderGeometry(
              0.0672,
              0.0672,
              0.17,
              12,
              1,
              !0,
              -0.95,
              1.9,
            ),
            cl.label,
          ),
          d,
          [0, -0.045, p],
          null,
          null,
          !0,
        ),
        u.add(
          Ko(
            [
              [0.024, 0],
              [0.027, 0.003],
              [0.027, 0.012],
              [0.02, 0.016],
              [0.02, 0.04],
              [0.014, 0.046],
              [0, 0.046],
            ],
            8,
            30,
          ),
          l,
          [0, 0.178, p],
        ),
        u.add(
          Yi(
            Jo(0.13, 0.008, 0.022, {
              r: 0.003,
              seg: [4, 1, 1],
              arc: 2,
            }),
            (x) => {
              let g = x.x / 0.13 + 0.5;
              x.y += 0.012 * g * g;
            },
          ),
          l,
          [0.045, 0.228, p],
          [0, 0, 0.06],
        ),
        u.add(
          Yi(
            Jo(0.12, 0.008, 0.022, {
              r: 0.003,
              seg: [4, 1, 1],
              arc: 2,
            }),
            (x) => {
              let g = x.x / 0.12 + 0.5;
              x.y += 0.03 * g * g;
            },
          ),
          l,
          [0.04, 0.244, p],
          [0, 0, 0.2],
        ),
        u.rod(
          a,
          [0.004, 0.234, p - 0.018],
          [0.004, 0.234, p + 0.02],
          0.0022,
          5,
        ),
        u.add(
          Sa(0.011, 0.0018, 4, 12),
          a,
          [0.004, 0.228, p + 0.03],
          [0, Hi, 0],
        ),
        u.add(
          Ko(
            [
              [0, 0],
              [0.017, 0],
              [0.018, 0.003],
              [0.018, 0.012],
              [0.0155, 0.014],
            ],
            14,
          ),
          a,
          [0, 0.2, p + 0.018],
          [Hi, 0, 0],
        ),
        u.add(
          vw(new THREE.CircleGeometry(0.0155, 14), cl.gauge),
          d,
          [0, 0.2, p + 0.0312],
          null,
          null,
          !0,
        ),
        u.add(
          Qo(
            ra(
              [
                [-0.02, 0.2, p],
                [-0.06, 0.204, p + 0.008],
                [-0.086, 0.15, p + 0.018],
                [-0.088, 0.02, p + 0.026],
                [-0.082, -0.1, p + 0.024],
                [-0.08, -0.14, p + 0.02],
              ],
              14,
            ),
            0.008,
            6,
          ),
          l,
        ),
        u.add(
          ks(0.0105, 0.0105, 0.02, 8),
          a,
          [-0.03, 0.201, p + 0.002],
          [0, 0, Hi],
        ),
        u.add(
          Ko(
            [
              [0.0105, 0.03],
              [0.0105, 0.012],
              [0.012, 0.008],
              [0.017, -0.03],
              [0.015, -0.032],
              [0, -0.03],
            ],
            10,
          ),
          l,
          [-0.08, -0.17, p + 0.02],
        ),
        u.add(Te(0.016, 0.02, 0.03, 0.003), l, [-0.073, -0.1, p + 0.012]),
        rs("extinguisher", [0.19, 0.5, 0.16], {
          surf: "metal",
          wall: !0,
          mountY: 1,
          mass: 9,
          colliders: [$s(-0.1, -0.24, 0, 0.09, 0.27, 0.16)],
        })
      );
    }),
    t("serviceTrolley", null, (u) => {
      let d = o.brass,
        m = o.woodDark,
        p = o.fabricCream;
      for (let g of [-1, 1])
        for (let b of [-1, 1]) {
          let v = g * 0.42,
            y = b * 0.22;
          (u.add(
            Ko(
              [
                [0.0125, 0.1],
                [0.0125, 0.2],
                [0.017, 0.204],
                [0.017, 0.236],
                [0.0125, 0.24],
                [0.0125, 0.808],
                [0.017, 0.812],
                [0.017, 0.84],
              ],
              10,
            ),
            d,
            [v, 0, y],
          ),
            u.add(dr(0.04, 12, 8), r, [v, 0.04, y]),
            u.add(
              Ko(
                [
                  [0.03, 0.05],
                  [0.034, 0.06],
                  [0.03, 0.078],
                  [0.016, 0.09],
                  [0.014, 0.102],
                ],
                12,
              ),
              d,
              [v, 0, y],
            ));
        }
      (u.add(
        fi(ui(0.88, 0.48, 0.02), 0.022, 0.004, 3),
        m,
        [0, 0.209, 0],
        null,
        null,
        "x",
      ),
        u.add(Qo(di(0.84, 0.44, 0.02, 0.27, 2), 0.006, 6, !0), d));
      for (let g of [-1, 1])
        for (let b of [-0.1, 0.1])
          u.rod(d, [g * 0.42, 0.23, b], [g * 0.42, 0.27, b], 0.004, 5);
      for (let g of [-0.2, 0, 0.2])
        for (let b of [-1, 1])
          u.rod(d, [g, 0.23, b * 0.22], [g, 0.27, b * 0.22], 0.004, 5);
      (u.add(
        fi(ui(0.9, 0.5, 0.02), 0.026, 0.004, 3),
        m,
        [0, 0.817, 0],
        null,
        null,
        "x",
      ),
        u.add(
          Jo(0.94, 0.02, 0.54, {
            r: 0.009,
            seg: [8, 1, 4],
            arc: 2,
            lump: 0.0015,
            seed: 4,
          }),
          p,
          [0, 0.852, 0],
        ));
      let x = (g, b, v) =>
        cu(
          Yi(new THREE.PlaneGeometry(g, 0.26, b, 3), (y) => {
            let M = 0.5 - y.y / 0.26,
              w = Math.pow(Math.abs(y.x) / (g / 2), 3);
            ((y.z =
              M *
                M *
                (0.014 * Math.sin(y.x * 21 + v) +
                  0.009 * Math.sin(y.x * 47 + v * 2) +
                  0.01 * w) +
              0.004 * M),
              (y.y -= 0.01 * w * M));
          }),
        );
      for (let g of [-1, 1])
        u.add(
          x(0.94, 16, 1 + g),
          p,
          [0, 0.73, g * 0.268],
          [0, g > 0 ? 0 : hl, 0],
        );
      for (let g of [-1, 1])
        u.add(x(0.54, 10, 4 + g), p, [g * 0.468, 0.73, 0], [0, g * Hi, 0]);
      (u.add(
        lc(
          [
            [-0.42, 0.835, -0.22],
            [-0.555, 0.955, -0.21],
            [-0.555, 0.955, 0.21],
            [-0.42, 0.835, 0.22],
          ],
          0.011,
          0.05,
          7,
        ),
        d,
      ),
        u.add(
          Ko(
            [
              [0.17, 0.862],
              [0.173, 0.864],
              [0.173, 0.868],
              [0.166, 0.872],
              [0.158, 0.9],
              [0.134, 0.948],
              [0.096, 0.984],
              [0.05, 1.006],
              [0.016, 1.014],
              [0, 1.015],
            ],
            24,
            30,
          ),
          r,
          [0.18, 0, 0],
        ),
        u.add(
          Ko(
            [
              [0.006, 1.012],
              [0.006, 1.022],
              [0.014, 1.028],
              [0.016, 1.036],
              [0.01, 1.044],
              [0, 1.045],
            ],
            12,
          ),
          d,
          [0.18, 0, 0],
        ),
        u.add(
          Ko(
            [
              [0, 0.862],
              [0.066, 0.862],
              [0.072, 0.866],
              [0.1, 1.036],
              [0.104, 1.044],
              [0.104, 1.05],
              [0.097, 1.05],
              [0.094, 1.04],
              [0.067, 0.878],
              [0, 0.876],
            ],
            18,
          ),
          r,
          [-0.24, 0, 0.04],
        ));
      for (let g of [-1, 1])
        u.add(
          Sa(0.018, 0.0035, 5, 10),
          r,
          [-0.24 + g * 0.106, 1, 0.04],
          [0, 0, 0],
        );
      return (
        u.at([-0.228, 0.885, 0.032], [0.2, 0, -0.26], () => {
          (u.add(
            Ko(
              [
                [0, 0],
                [0.036, 0],
                [0.036, 0.06],
                [0.03, 0.09],
                [0.016, 0.115],
                [0.0135, 0.15],
              ],
              12,
            ),
            r,
          ),
            u.add(
              Ko(
                [
                  [0.0145, 0.118],
                  [0.0155, 0.15],
                  [0.017, 0.152],
                  [0.017, 0.166],
                  [0.012, 0.172],
                  [0, 0.173],
                ],
                10,
              ),
              d,
            ));
        }),
        rs("serviceTrolley", [1.1, 1.06, 0.56], {
          surf: "metal",
          dynamic: !0,
          mass: 18,
        })
      );
    }),
    t(
      "trashBin",
      null,
      (u) => (
        u.add(
          Ko(
            [
              [0, 0.006],
              [0.126, 0.006],
              [0.132, 0.01],
              [0.1405, 0.04],
              [0.1415, 0.046],
              [0.1425, 0.2],
              [0.141, 0.205],
              [0.1425, 0.21],
              [0.1505, 0.59],
              [0.149, 0.595],
              [0.151, 0.6],
              [0.153, 0.618],
              [0.158, 0.626],
              [0.158, 0.636],
              [0.152, 0.645],
              [0.143, 0.645],
              [0.139, 0.636],
            ],
            28,
            30,
          ),
          o.steel,
          null,
          null,
          null,
          "x",
        ),
        u.add(
          Ko(
            [
              [0.126, 0],
              [0.145, 0.003],
              [0.1465, 0.034],
              [0.141, 0.04],
              [0.13, 0.012],
            ],
            28,
          ),
          o.rubber,
        ),
        u.add(
          Ko(
            [
              [0.14, 0.632],
              [0.136, 0.642],
              [0.128, 0.642],
              [0.126, 0.632],
              [0.118, 0.07],
              [0.112, 0.06],
              [0, 0.06],
            ],
            24,
          ),
          l,
        ),
        rs("trashBin", [0.32, 0.65, 0.32], {
          surf: "metal",
          dynamic: !0,
          mass: 5,
        })
      ),
    ),
    t("wetFloorSign", null, (u) => {
      let d = s(),
        m = n(),
        p = o.plasticBlack,
        x = new THREE.Shape();
      (x.moveTo(-0.142, 0.012),
        x.quadraticCurveTo(-0.15, 0, -0.138, 0),
        x.lineTo(0.138, 0),
        x.quadraticCurveTo(0.15, 0, 0.142, 0.012),
        x.lineTo(0.112, 0.604),
        x.quadraticCurveTo(0.11, 0.62, 0.094, 0.62),
        x.lineTo(-0.094, 0.62),
        x.quadraticCurveTo(-0.11, 0.62, -0.112, 0.604),
        x.lineTo(-0.142, 0.012));
      let g = new THREE.Path();
      (g.absarc(-0.035, 0.57, 0.015, Hi, hl * 1.5, !1),
        g.absarc(0.035, 0.57, 0.015, -Hi, Hi, !1),
        x.holes.push(g));
      for (let b of [0, hl]) {
        let v = new THREE.Matrix4()
          .makeTranslation(0, 0.612, 0)
          .multiply(new THREE.Matrix4().makeRotationY(b))
          .multiply(new THREE.Matrix4().makeRotationX(-0.2))
          .multiply(new THREE.Matrix4().makeTranslation(0, -0.62, 0));
        u.at(v, () => {
          (u.add(Fr(x, 0.012, 0.003, 5), m),
            u.add(
              _i(
                [
                  [-0.006, 0],
                  [0.006, 0],
                  [0.006, 0.004],
                  [-0.006, 0.004],
                ],
                [
                  [-0.128, 0.03, 0.012],
                  [-0.101, 0.535, 0.012],
                  [0.101, 0.535, 0.012],
                  [0.128, 0.03, 0.012],
                ],
                {
                  up: De(0, 0, 1),
                  deg: 50,
                },
              ),
              m,
            ),
            u.add(
              cc(0.196, 0.392, cl.wet),
              d,
              [0, 0.283, 0.0126],
              null,
              null,
              !0,
            ));
          for (let y of [0.16, 0.34])
            u.add(zs(0.2 - y * 0.08, 0.008, 0.006), m, [0, y, -0.002]);
          for (let y of [-1, 1])
            u.add(Te(0.03, 0.01, 0.016, 0.003), p, [y * 0.11, 0.004, 0.006]);
        });
      }
      return (
        u.add(Te(0.16, 0.016, 0.03, 0.005), p, [0, 0.616, 0]),
        u.add(ks(0.005, 0.005, 0.2, 6), p, [0, 0.607, 0], [0, 0, Hi]),
        u.add(zs(0.018, 0.002, 0.16), p, [0.06, 0.2, 0]),
        rs("wetFloorSign", [0.3, 0.62, 0.3], {
          surf: "plastic",
          dynamic: !0,
          mass: 1.5,
        })
      );
    }));
}

export { registerServiceProps };

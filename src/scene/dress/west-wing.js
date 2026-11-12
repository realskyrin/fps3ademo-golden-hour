// scene/dress/west-wing.js: recovered from the verified GOLDEN HOUR release.
import { TAU, createCanvas, createRandom } from "../../core/math.js";
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Euler,
  Float32BufferAttribute,
  IcosahedronGeometry,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NearestFilter,
  PlaneGeometry,
  Quaternion,
  SRGBColorSpace,
  SphereGeometry,
  TorusGeometry,
  TorusKnotGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
} from "../../vendor/three-r180.js";
import { Ll } from "../geometry.js";
import { Qt, Ye } from "../hotel.js";

function dressWestWing(o, t) {
  let { world: e, fx: s, M: n, P: i, K: a } = o,
    { place: r, S: l, N: c, E: h, W: f } = t.tools,
    u = t.helpers.deco,
    d = createRandom(90210),
    m = new Vector3(0, 1, 0),
    p = new Vector3(0, -1, 0),
    x = (U, X, N) => new Vector3(U, X, N),
    g = Math.PI,
    b = Math.PI / 2,
    v = {
      shadow: !1,
    },
    y = new Euler(),
    M = (U, X, N, q = 0, o0 = 0, h0 = 0, y0 = 1) =>
      new Matrix4().compose(
        x(U, X, N),
        new Quaternion().setFromEuler(y.set(o0, q, h0, "YXZ")),
        Array.isArray(y0) ? x(y0[0], y0[1], y0[2]) : x(y0, y0, y0),
      ),
    w = null,
    T = null,
    S = (U, X, N) => {
      if (X.tint === void 0) return a.add(U, X, N);
      let q = U.index ? U.toNonIndexed() : U.clone(),
        o0 = q.attributes.position.count,
        h0 = new Float32Array(o0 * 2),
        y0 = (X.tint + 0.5) / 16;
      for (let D = 0; D < o0; D++) ((h0[D * 2] = y0), (h0[D * 2 + 1] = 0.5));
      (q.setAttribute("uv", new BufferAttribute(h0, 2)),
        a.add(q, X.liq ? T : w, {
          ...N,
          keepUV: !0,
        }));
    },
    E = (U, X, N, q, o0, h0 = 0, y0 = 0, D = 0, W = 1, Y = {}) =>
      S(U, X, {
        matrix: M(N, q, o0, h0, y0, D, W),
        shadow: Y.shadow,
        keepUV: Y.keepUV,
      }),
    _ = (U, X, N) => new BoxGeometry(U, X, N),
    R = (U, X, N, q = 0.008, o0 = 1) =>
      q <= 0.008
        ? new BoxGeometry(U, X, N)
        : new Ll(
            U,
            X,
            N,
            o0,
            Math.max(5e-4, Math.min(q, U / 2.05, X / 2.05, N / 2.05)),
          ),
    C = (U, X, N = 12, q = U, o0 = !1) =>
      new CylinderGeometry(q, U, X, N, 1, o0),
    L = (U, X = 10, N = 8) => new SphereGeometry(U, X, N),
    A = (U, X = 0) => new IcosahedronGeometry(U, X),
    O = (U, X, N = 6, q = 20, o0 = TAU) => new TorusGeometry(U, X, N, q, o0),
    H = (U, X = 12) =>
      new LatheGeometry(
        U.map(([N, q]) => new Vector2(Math.max(N, 4e-4), q)),
        X,
      ),
    F = (U, X, N, q = 8, o0 = N) => {
      let h0 = x(...U),
        y0 = x(...X),
        D = y0.clone().sub(h0),
        W = D.length() || 1e-4,
        Y = new CylinderGeometry(o0, N, W, q, 1, !1);
      return (
        Y.applyMatrix4(
          new Matrix4().compose(
            h0.add(y0).multiplyScalar(0.5),
            new Quaternion().setFromUnitVectors(m, D.multiplyScalar(1 / W)),
            x(1, 1, 1),
          ),
        ),
        Y
      );
    },
    P = (U, X, N = 0, q = 6) =>
      new TubeGeometry(
        new CatmullRomCurve3(
          U.map((o0) => x(...o0)),
          !1,
          "catmullrom",
          0.5,
        ),
        N || U.length * 6,
        X,
        q,
        !1,
      ),
    z = (U, X, N) => {
      let q = new BoxGeometry(U, X, N, 6, 6, 2),
        o0 = q.attributes.position;
      for (let h0 = 0; h0 < o0.count; h0++) {
        let y0 = o0.getX(h0) / (U / 2),
          D = o0.getY(h0) / (X / 2),
          W = Math.pow(Math.max(0, (1 - y0 * y0) * (1 - D * D)), 0.36),
          Y = 1 - 0.08 * y0 * y0 * D * D;
        o0.setXYZ(
          h0,
          o0.getX(h0) * Y,
          o0.getY(h0) * Y,
          o0.getZ(h0) * (0.1 + 0.9 * W),
        );
      }
      return (q.computeVertexNormals(), q);
    },
    k = (U, X, N = [0, 0, 1], q = 0.006) => {
      let o0 = U.map((R0) => x(...R0)),
        h0 = x(...N).normalize(),
        y0 = o0.length,
        D = [],
        W = [];
      for (let R0 = 0; R0 < 2; R0++)
        for (let U0 = 0; U0 < y0; U0++) {
          let g0 = o0[Math.min(y0 - 1, U0 + 1)]
            .clone()
            .sub(o0[Math.max(0, U0 - 1)])
            .normalize()
            .clone()
            .cross(h0)
            .normalize()
            .multiplyScalar(R0 ? -q / 2 : q / 2);
          for (let G0 of [-0.5, 0.5]) {
            let K0 = o0[U0].clone()
              .addScaledVector(
                h0,
                G0 * X * (1 + 0.03 * Math.sin(U0 * 2.1 + G0)),
              )
              .add(g0);
            D.push(K0.x, K0.y, K0.z);
          }
        }
      for (let R0 = 0; R0 < 2; R0++)
        for (let U0 = 0; U0 < y0 - 1; U0++) {
          let $0 = R0 * y0 * 2 + U0 * 2,
            g0 = $0 + 1,
            G0 = $0 + 2,
            K0 = $0 + 3;
          R0 ? W.push($0, g0, G0, g0, K0, G0) : W.push($0, G0, g0, g0, G0, K0);
        }
      let Y = new BufferGeometry();
      return (
        Y.setAttribute("position", new Float32BufferAttribute(D, 3)),
        Y.setIndex(W),
        Y.computeVertexNormals(),
        Y
      );
    };
  function I(U, X, N, q = 0) {
    let o0 = M(U, X, N, q),
      h0 = {
        base: o0,
        add: (
          y0,
          D,
          W = 0,
          Y = 0,
          R0 = 0,
          U0 = 0,
          $0 = 0,
          g0 = 0,
          G0 = 1,
          K0 = {},
        ) => (
          S(y0, D, {
            matrix: new Matrix4().multiplyMatrices(
              o0,
              M(W, Y, R0, U0, $0, g0, G0),
            ),
            shadow: K0.shadow,
            keepUV: K0.keepUV,
          }),
          h0
        ),
        raw: (y0, D, W = {}) => (
          S(y0, D, {
            matrix: o0,
            shadow: W.shadow,
            keepUV: W.keepUV,
          }),
          h0
        ),
        rod: (y0, D, W, Y, R0 = 8, U0 = W) => h0.raw(F(y0, D, W, R0, U0), Y),
        tube: (y0, D, W, Y = 0, R0 = 6) => h0.raw(P(y0, D, Y, R0), W),
        lab: (y0, D, W, Y, R0, U0, $0 = 0, g0 = 0, G0 = 0, K0 = !1) => (
          a.add(m0(y0, D, W), K0 ? F0 : _0, {
            matrix: new Matrix4().multiplyMatrices(
              o0,
              M(Y, R0, U0, $0, g0, G0),
            ),
            shadow: !1,
            keepUV: !0,
          }),
          h0
        ),
        pt: (y0, D, W) => x(y0, D, W).applyMatrix4(o0),
        dir: (y0, D, W) => x(y0, D, W).transformDirection(o0),
        at: (y0, D, W, Y = 0) => {
          let R0 = x(y0, D, W).applyMatrix4(o0);
          return I(R0.x, R0.y, R0.z, q + Y);
        },
      };
    return h0;
  }
  let G = 2560,
    K = 2048,
    $ = createCanvas(G, K),
    n0 = $.getContext("2d"),
    e0 = [],
    p0 = 4;
  function t0(U, X, N) {
    let q = null;
    for (let y0 of e0)
      y0.h >= X &&
        y0.h <= X * 2 &&
        y0.x + U + 4 <= G &&
        (!q || y0.h < q.h) &&
        (q = y0);
    q ||
      ((q = {
        y: p0,
        h: X,
        x: 4,
      }),
      (p0 += X + 6),
      e0.push(q));
    let o0 = q.x,
      h0 = q.y;
    return (
      (q.x += U + 6),
      n0.save(),
      n0.translate(o0, h0),
      n0.beginPath(),
      n0.rect(0, 0, U, X),
      n0.clip(),
      N(n0, U, X),
      n0.restore(),
      [o0 / G, 1 - (h0 + X) / K, (o0 + U) / G, 1 - h0 / K]
    );
  }
  let M0 = new CanvasTexture($);
  ((M0.colorSpace = SRGBColorSpace), (M0.anisotropy = 8));
  let f0 = {
      map: M0,
      alphaTest: 0.4,
      metalness: 0,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    },
    _0 = new MeshStandardMaterial({
      ...f0,
      roughness: 0.62,
    });
  _0.name = "west-print";
  let F0 = new MeshStandardMaterial({
    ...f0,
    roughness: 0.5,
    emissive: 16777215,
    emissiveMap: M0,
    emissiveIntensity: 0.55,
  });
  F0.name = "west-print-glow";
  function m0(U, X, N) {
    let q = new PlaneGeometry(X, N),
      o0 = q.attributes.uv;
    return (
      o0.setXY(0, U[0], U[3]),
      o0.setXY(1, U[2], U[3]),
      o0.setXY(2, U[0], U[1]),
      o0.setXY(3, U[2], U[1]),
      q
    );
  }
  let S0 = (U, X, N = 28) => {
      let q = new CircleGeometry(X, N),
        o0 = q.attributes.uv;
      for (let h0 = 0; h0 < o0.count; h0++)
        o0.setXY(
          h0,
          U[0] + o0.getX(h0) * (U[2] - U[0]),
          U[1] + o0.getY(h0) * (U[3] - U[1]),
        );
      return q;
    },
    T0 = (U, X, N, q, o0, h0, y0 = 0, D = 0, W = 0, Y = !1) =>
      a.add(m0(U, X, N), Y ? F0 : _0, {
        matrix: M(q, o0, h0, y0, D, W),
        shadow: !1,
        keepUV: !0,
      }),
    j0 = 'Bahnschrift, "DIN Alternate", "Segoe UI", sans-serif',
    Z0 = 'Georgia, "Times New Roman", serif',
    lt = "#ecca86",
    H0 = "#efe6d2",
    Y0 = "#1b1714",
    et = (U, X, N, q, o0, h0, y0 = {}) => {
      ((U.font = `${y0.weight || 600} ${o0}px ${y0.font || j0}`),
        (U.fillStyle = h0),
        (U.textAlign = y0.align || "center"),
        (U.textBaseline = y0.base || "middle"));
      try {
        U.letterSpacing = y0.spacing || "0px";
      } catch {}
      U.fillText(X, N, q, y0.max);
      try {
        U.letterSpacing = "0px";
      } catch {}
    },
    ct = (U, X, N, q, o0, h0, y0, D = d) => {
      U.fillStyle = y0;
      for (let W = 0; W < o0; W++)
        U.fillRect(
          X,
          N + W * h0,
          q * (W === o0 - 1 ? 0.55 : D.range(0.82, 1)),
          Math.max(1, h0 * 0.34),
        );
    },
    D0 = (U, X = 512, N = 64, q = {}) =>
      t0(X, N, (o0, h0, y0) =>
        et(o0, U, h0 / 2, y0 / 2 + 2, y0 * (q.k || 0.6), q.color || lt, {
          spacing: q.spacing || "5px",
          max: h0 - 8,
          weight: q.weight || 600,
        }),
      ),
    u0 = {};
  ((u0.clock = t0(256, 256, (U, X) => {
    let N = X / 2;
    ((U.fillStyle = "#f3eee0"),
      U.beginPath(),
      U.arc(N, N, N - 1, 0, TAU),
      U.fill());
    let q = U.createRadialGradient(N, N, N * 0.2, N, N, N);
    (q.addColorStop(0, "rgba(0,0,0,0)"),
      q.addColorStop(1, "rgba(90,60,20,0.22)"),
      (U.fillStyle = q),
      U.fill(),
      (U.strokeStyle = Y0),
      (U.lineCap = "butt"));
    for (let o0 = 0; o0 < 60; o0++) {
      let h0 = (o0 / 60) * TAU,
        y0 = o0 % 5 === 0;
      ((U.lineWidth = y0 ? 5 : 1.5),
        U.beginPath(),
        U.moveTo(N + Math.sin(h0) * (N - 12), N - Math.cos(h0) * (N - 12)),
        U.lineTo(
          N + Math.sin(h0) * (N - (y0 ? 34 : 20)),
          N - Math.cos(h0) * (N - (y0 ? 34 : 20)),
        ),
        U.stroke());
    }
    for (let [o0, h0] of [
      ["12", 0],
      ["3", 1],
      ["6", 2],
      ["9", 3],
    ])
      et(
        U,
        o0,
        N + Math.sin(h0 * b) * (N - 58),
        N - Math.cos(h0 * b) * (N - 58) + 2,
        30,
        Y0,
        {
          font: Z0,
          weight: 400,
        },
      );
    et(U, "SOLSTICE", N, N + 44, 11, "#6b5a3c", {
      spacing: "3px",
    });
  })),
    (u0.city = ["NEW YORK", "LONDON", "DUBAI", "TOKYO"].map((U) =>
      D0(U, 256, 40, {
        k: 0.62,
        spacing: "6px",
      }),
    )),
    (u0.way = {}));
  for (let U of [
    "EMBER BAR",
    "RESTAURANT",
    "POOL TERRACE",
    "SUITES  \xB7  CONFERENCE",
    "SUITES 4701 \u2013 4712",
    "LOBBY  \xB7  RECEPTION",
    "RECEPTION",
    "CONCIERGE",
  ])
    u0.way[U] = D0(U, 560, 60);
  ((u0.directory = t0(280, 640, (U, X, N) => {
    ((U.fillStyle = "#0d0c0b"),
      U.fillRect(0, 0, X, N),
      (U.strokeStyle = lt),
      (U.lineWidth = 2),
      U.strokeRect(10, 10, X - 20, N - 20),
      et(U, "47", X / 2, 58, 64, lt, {
        font: Z0,
        weight: 400,
      }),
      et(U, "SKY LOBBY", X / 2, 104, 15, lt, {
        spacing: "7px",
      }),
      (U.fillStyle = lt),
      U.fillRect(36, 126, X - 72, 1.5),
      [
        ["\u2190", "EMBER BAR"],
        ["\u2190", "RESTAURANT"],
        ["\u2191", "RECEPTION"],
        ["\u2191", "ELEVATORS"],
        ["\u2192", "SUITES 4701\u20134712"],
        ["\u2192", "CONFERENCE"],
        ["\u2193", "POOL TERRACE"],
        ["\u2193", "SPA  \xB7  LEVEL 46"],
      ].forEach(([o0, h0], y0) => {
        let D = 166 + y0 * 53;
        (et(U, o0, 46, D, 28, lt, {
          weight: 400,
        }),
          et(U, h0, 78, D + 1, 17, H0, {
            align: "left",
            spacing: "2px",
            max: X - 92,
          }),
          (U.fillStyle = "rgba(236,202,134,0.25)"),
          U.fillRect(36, D + 26, X - 72, 1));
      }),
      et(U, "SOLSTICE", X / 2, N - 30, 13, lt, {
        spacing: "9px",
      }));
  })),
    (u0.menuBar = t0(420, 560, (U, X, N) => {
      ((U.fillStyle = "#12100e"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = "rgba(236,202,134,0.7)"),
        (U.lineWidth = 1.5),
        U.strokeRect(14, 14, X - 28, N - 28),
        et(U, "EMBER", X / 2, 62, 44, lt, {
          spacing: "14px",
        }),
        et(U, "SIGNATURE COCKTAILS", X / 2, 100, 13, lt, {
          spacing: "5px",
          weight: 400,
        }),
        [
          ["GOLDEN HOUR", "aged rum \xB7 apricot \xB7 saffron \xB7 lime", "19"],
          ["SOLSTICE SPRITZ", "blood orange \xB7 bitter \xB7 sparkling", "17"],
          ["SMOKED OLD FASHIONED", "rye \xB7 demerara \xB7 hickory", "21"],
          [
            "NEGRONI NOIR",
            "gin \xB7 black vermouth \xB7 espresso bitter",
            "18",
          ],
          ["PALOMA ROSA", "tequila \xB7 pink grapefruit \xB7 salt", "18"],
          ["LAST LIGHT", "mezcal \xB7 passion fruit \xB7 chilli", "19"],
          ["FORTY-SEVEN", "champagne \xB7 cognac \xB7 lemon oil", "24"],
        ].forEach(([o0, h0, y0], D) => {
          let W = 150 + D * 56;
          (et(U, o0, 38, W, 17, H0, {
            align: "left",
            spacing: "2px",
          }),
            et(U, y0, X - 38, W, 17, lt, {
              align: "right",
            }),
            et(U, h0, 38, W + 20, 11.5, "rgba(239,230,210,0.62)", {
              align: "left",
              weight: 400,
            }));
        }));
    })),
    (u0.menuCard = t0(240, 340, (U, X, N) => {
      ((U.fillStyle = "#f1e9d6"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = "#a8894e"),
        (U.lineWidth = 1.5),
        U.strokeRect(10, 10, X - 20, N - 20),
        et(U, "SOLSTICE", X / 2, 44, 20, "#3a2f1e", {
          spacing: "7px",
        }),
        et(U, "DINNER", X / 2, 68, 10, "#8a744a", {
          spacing: "5px",
          weight: 400,
        }));
      for (let q = 0; q < 4; q++) {
        let o0 = 100 + q * 58;
        (et(
          U,
          ["TO BEGIN", "FROM THE GRILL", "GARDEN", "TO FINISH"][q],
          X / 2,
          o0,
          10,
          "#8a744a",
          {
            spacing: "4px",
          },
        ),
          ct(U, 30, o0 + 12, X - 60, 4, 9, "rgba(58,47,30,0.55)"));
      }
    })),
    (u0.waitSeat = t0(380, 150, (U, X, N) => {
      ((U.fillStyle = "#12100e"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = lt),
        (U.lineWidth = 2),
        U.strokeRect(8, 8, X - 16, N - 16),
        et(U, "PLEASE WAIT", X / 2, 56, 30, lt, {
          spacing: "6px",
        }),
        et(U, "TO BE SEATED", X / 2, 98, 22, H0, {
          spacing: "6px",
          weight: 400,
        }));
    })),
    (u0.waitHere = t0(200, 150, (U, X, N) => {
      ((U.fillStyle = "#12100e"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = lt),
        (U.lineWidth = 2),
        U.strokeRect(6, 6, X - 12, N - 12),
        et(U, "PLEASE", X / 2, 46, 24, lt, {
          spacing: "5px",
        }),
        et(U, "WAIT HERE", X / 2, 82, 24, lt, {
          spacing: "4px",
        }),
        et(U, "THE NEXT HOST WILL CALL YOU", X / 2, 118, 8.5, H0, {
          spacing: "1px",
          weight: 400,
        }));
    })),
    (u0.tableNo = ["12", "14", "21", "23", "27"].map((U) =>
      t0(72, 72, (X, N, q) => {
        ((X.fillStyle = "#f1e9d6"),
          X.fillRect(0, 0, N, q),
          (X.strokeStyle = "#a8894e"),
          (X.lineWidth = 2),
          X.strokeRect(5, 5, N - 10, q - 10),
          et(X, U, N / 2, q / 2 + 3, 36, "#2a2218", {
            font: Z0,
            weight: 400,
          }));
      }),
    )),
    (u0.reserved = t0(150, 70, (U, X, N) => {
      ((U.fillStyle = "#f1e9d6"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = "#a8894e"),
        (U.lineWidth = 1.5),
        U.strokeRect(5, 5, X - 10, N - 10),
        et(U, "RESERVED", X / 2, N / 2 + 2, 20, "#2a2218", {
          spacing: "4px",
        }));
    })),
    (u0.cocktails = t0(150, 190, (U, X, N) => {
      ((U.fillStyle = "#17130f"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = lt),
        (U.lineWidth = 1.5),
        U.strokeRect(6, 6, X - 12, N - 12),
        et(U, "EMBER", X / 2, 44, 24, lt, {
          spacing: "6px",
        }),
        et(U, "COCKTAILS", X / 2, 70, 11, H0, {
          spacing: "4px",
          weight: 400,
        }),
        ct(U, 26, 96, X - 52, 7, 11, "rgba(236,202,134,0.5)"));
    })),
    (u0.news = t0(300, 380, (U, X, N) => {
      ((U.fillStyle = "#e9e3d3"),
        U.fillRect(0, 0, X, N),
        et(U, "The Solstice Herald", X / 2, 30, 27, Y0, {
          font: Z0,
          weight: 700,
        }),
        (U.fillStyle = Y0),
        U.fillRect(12, 50, X - 24, 2),
        U.fillRect(12, 56, X - 24, 1),
        et(U, "HARBOUR TOWER TOPS OUT AT GOLDEN HOUR", 14, 78, 14, Y0, {
          align: "left",
          font: Z0,
          weight: 700,
          max: X - 28,
        }),
        (U.fillStyle = "#8c8676"),
        U.fillRect(14, 94, 150, 96),
        (U.fillStyle = "#b8b09c"),
        U.fillRect(14, 150, 150, 40),
        (U.fillStyle = "#d98a3a"),
        U.beginPath(),
        U.arc(120, 138, 16, 0, TAU),
        U.fill(),
        ct(U, 174, 96, 112, 12, 8, "rgba(27,23,20,0.6)"));
      for (let q = 0; q < 3; q++)
        ct(U, 14 + q * 93, 204, 86, 19, 8.6, "rgba(27,23,20,0.55)");
    })),
    (u0.mags = [
      ["AZURE", "#1f5d66", "#f3d9a2"],
      ["FORM", "#c9502b", "#f6efe2"],
      ["VOYAGE", "#e9dfc8", "#1b1714"],
      ["CASA", "#20242a", "#e8b96a"],
    ].map(([U, X, N], q) =>
      t0(170, 226, (o0, h0, y0) => {
        ((o0.fillStyle = X),
          o0.fillRect(0, 0, h0, y0),
          (o0.fillStyle = N),
          (o0.globalAlpha = 0.22),
          q % 2
            ? (o0.beginPath(),
              o0.arc(h0 * 0.62, y0 * 0.6, 62, 0, TAU),
              o0.fill())
            : o0.fillRect(24, 96, h0 - 48, 96),
          (o0.globalAlpha = 1),
          et(o0, U, h0 / 2, 44, 40, N, {
            font: q % 2 ? Z0 : j0,
            weight: 700,
            spacing: "4px",
            max: h0 - 16,
          }),
          et(o0, "AUTUMN ISSUE", h0 / 2, 76, 9, N, {
            spacing: "4px",
            weight: 400,
          }),
          ct(o0, 20, y0 - 34, 70, 2, 9, N));
      }),
    )),
    (u0.brochure = [
      ["SPA", "& WELLNESS", "#24403f"],
      ["CITY", "GUIDE", "#7c3a1c"],
      ["DINING", "AT SOLSTICE", "#20242a"],
    ].map(([U, X, N]) =>
      t0(120, 250, (q, o0, h0) => {
        ((q.fillStyle = N),
          q.fillRect(0, 0, o0, h0),
          (q.fillStyle = "rgba(236,202,134,0.85)"),
          q.fillRect(14, 14, o0 - 28, 2),
          et(q, U, o0 / 2, 62, 27, lt, {
            spacing: "3px",
          }),
          et(q, X, o0 / 2, 88, 9.5, H0, {
            spacing: "3px",
            weight: 400,
          }),
          (q.fillStyle = "rgba(255,255,255,0.14)"),
          q.fillRect(14, 116, o0 - 28, 92),
          et(q, "SOLSTICE", o0 / 2, h0 - 20, 9, lt, {
            spacing: "4px",
          }));
      }),
    )),
    (u0.sheet = t0(500, 320, (U, X, N) => {
      ((U.fillStyle = "#f2ecdc"),
        U.fillRect(0, 0, X, N),
        (U.fillStyle = "rgba(0,0,0,0.14)"),
        U.fillRect(X / 2 - 2, 0, 4, N));
      for (let q = 0; q < 2; q++)
        for (let o0 = 0; o0 < 5; o0++) {
          let h0 = 16 + q * (X / 2),
            y0 = 32 + o0 * 56;
          U.fillStyle = "rgba(20,18,16,0.8)";
          for (let D = 0; D < 5; D++) U.fillRect(h0, y0 + D * 6, X / 2 - 36, 1);
          for (let D = 0; D < 14; D++) {
            let W = h0 + 14 + D * 14.5 + d.range(-2, 2),
              Y = y0 + d.int(-1, 9) * 3;
            (U.beginPath(),
              U.ellipse(W, Y, 3.8, 2.8, -0.4, 0, TAU),
              U.fill(),
              U.fillRect(W + 3, Y - 17, 1.2, 17));
          }
        }
      et(U, "Nocturne for the Last Light", X / 4, 16, 12, Y0, {
        font: Z0,
        weight: 400,
      });
    })),
    (u0.pos = t0(300, 190, (U, X, N) => {
      ((U.fillStyle = "#0c0f13"),
        U.fillRect(0, 0, X, N),
        (U.fillStyle = "#16202a"),
        U.fillRect(0, 0, X, 24),
        et(U, "EMBER BAR   \xB7   TAB 47", 10, 13, 11, "#9fc6de", {
          align: "left",
          spacing: "1px",
        }));
      let q = [
        "#ff8a2a",
        "#2f6f78",
        "#c9502b",
        "#3a4652",
        "#e2b354",
        "#2f6f78",
        "#3a4652",
        "#ff8a2a",
        "#3a4652",
        "#c9502b",
        "#3a4652",
        "#2f6f78",
      ];
      for (let o0 = 0; o0 < 12; o0++)
        ((U.fillStyle = q[o0]),
          U.fillRect(10 + (o0 % 4) * 49, 34 + Math.floor(o0 / 4) * 44, 43, 38));
      ((U.fillStyle = "#111a22"),
        U.fillRect(212, 30, 80, 150),
        ct(U, 220, 42, 64, 9, 13, "rgba(200,225,240,0.65)"),
        (U.fillStyle = "#ff8a2a"),
        U.fillRect(212, 160, 80, 20),
        et(U, "PAY", 252, 171, 11, "#141009"));
    })),
    (u0.monitor = t0(380, 220, (U, X, N) => {
      ((U.fillStyle = "#0d1116"),
        U.fillRect(0, 0, X, N),
        (U.fillStyle = "#1a2530"),
        U.fillRect(0, 0, X, 22),
        et(U, "SOLSTICE  PMS   \u2014   ARRIVALS", 10, 12, 10.5, "#b9d8ea", {
          align: "left",
          spacing: "1px",
        }),
        (U.fillStyle = "#131b23"),
        U.fillRect(0, 22, 70, N),
        ct(U, 8, 36, 52, 12, 14, "rgba(160,190,210,0.5)"));
      for (let q = 0; q < 9; q++)
        ((U.fillStyle = q % 2 ? "#111920" : "#151e27"),
          U.fillRect(74, 28 + q * 21, X - 80, 19),
          ct(U, 80, 35 + q * 21, 120, 1, 1, "rgba(210,225,235,0.7)"),
          (U.fillStyle = [
            "#2f8f6a",
            "#c98a2b",
            "#2f8f6a",
            "#3a4652",
            "#b5412b",
          ][q % 5]),
          U.fillRect(X - 92, 31 + q * 21, 60, 13),
          (U.fillStyle = "rgba(200,220,235,0.4)"),
          U.fillRect(215, 35 + q * 21, 54, 4));
    })),
    (u0.keypad = t0(72, 110, (U, X, N) => {
      ((U.fillStyle = "#17191c"),
        U.fillRect(0, 0, X, N),
        (U.fillStyle = "#9fe0c8"),
        U.fillRect(8, 8, X - 16, 26),
        et(U, "0.00", X - 12, 22, 12, "#0c2a22", {
          align: "right",
        }));
      for (let q = 0; q < 12; q++)
        ((U.fillStyle = q === 11 ? "#2f8f6a" : q === 9 ? "#b5412b" : "#3a3e44"),
          U.fillRect(9 + (q % 3) * 19, 42 + Math.floor(q / 3) * 16, 16, 12));
    })),
    (u0.dnd = t0(84, 210, (U, X, N) => {
      ((U.fillStyle = "#4a0f16"),
        U.fillRect(0, 0, X, N),
        (U.globalCompositeOperation = "destination-out"),
        U.beginPath(),
        U.arc(X / 2, 34, 17, 0, TAU),
        U.fill(),
        (U.globalCompositeOperation = "source-over"),
        (U.strokeStyle = lt),
        (U.lineWidth = 1.5),
        U.strokeRect(6, 62, X - 12, N - 70));
      for (let [q, o0] of [
        ["DO", 96],
        ["NOT", 122],
        ["DISTURB", 150],
      ])
        et(U, q, X / 2, o0, q.length > 4 ? 14 : 20, lt, {
          spacing: "2px",
        });
      et(U, "SOLSTICE", X / 2, N - 24, 7.5, lt, {
        spacing: "3px",
      });
    })),
    (u0.records = Array.from(
      {
        length: 6,
      },
      (U, X) =>
        t0(96, 96, (N, q, o0) => {
          let h0 = [
            ["#c9502b", "#f3d9a2"],
            ["#1f5d66", "#e9dfc8"],
            ["#20242a", "#e8b96a"],
            ["#e9dfc8", "#c9502b"],
            ["#5a2a5c", "#f0b35e"],
            ["#0f2e40", "#ff8a2a"],
          ][X];
          if (
            ((N.fillStyle = h0[0]),
            N.fillRect(0, 0, q, o0),
            (N.fillStyle = h0[1]),
            X % 3 === 0)
          )
            for (let y0 = 4; y0 > 0; y0--)
              ((N.globalAlpha = 0.25 + 0.15 * y0),
                N.beginPath(),
                N.arc(q * 0.5, o0 * 0.56, y0 * 9, 0, TAU),
                N.fill());
          else if (X % 3 === 1)
            for (let y0 = 0; y0 < 6; y0++)
              N.fillRect(10 + y0 * 13, 30 + (y0 % 2) * 12, 8, 52);
          else
            (N.beginPath(),
              N.moveTo(8, o0 - 8),
              N.lineTo(q / 2, 26),
              N.lineTo(q - 8, o0 - 8),
              N.fill());
          ((N.globalAlpha = 1),
            et(
              N,
              [
                "NIGHTFALL",
                "BLUE HOUR",
                "EMBERS",
                "HALCYON",
                "VELVET",
                "MERIDIAN",
              ][X],
              q / 2,
              14,
              9,
              h0[1],
              {
                spacing: "2px",
              },
            ));
        }),
    )),
    (u0.spines = [0, 1].map((U) =>
      t0(640, 150, (X, N, q) => {
        ((X.fillStyle = "#1b1612"), X.fillRect(0, 0, N, q));
        let o0 = [
          "#7c3a1c",
          "#1f5d66",
          "#d8ccb0",
          "#20242a",
          "#a8894e",
          "#3d2a22",
          "#c9502b",
          "#e9dfc8",
          "#2a3b33",
          "#5b4a3a",
        ];
        for (let h0 = 2; h0 < N - 4;) {
          let y0 = d.range(U ? 5 : 12, U ? 9 : 30),
            D = q * d.range(0.78, 1);
          ((X.fillStyle = o0[d.int(0, 9)]),
            X.fillRect(h0, q - D, y0, D),
            (X.fillStyle = "rgba(236,202,134,0.6)"),
            y0 > 14 &&
              (X.fillRect(h0 + 3, q - D + 10, y0 - 6, 2),
              X.fillRect(h0 + 3, q - 16, y0 - 6, 2)),
            (X.fillStyle = "rgba(0,0,0,0.3)"),
            X.fillRect(h0 + y0 - 1, q - D, 1, D),
            (h0 += y0 + 1));
        }
      }),
    )),
    (u0.cubby = [47, 46, 45, 44].map((U) =>
      t0(900, 22, (X, N, q) => {
        ((X.fillStyle = "#b89a5c"), X.fillRect(0, 0, N, q));
        for (let o0 = 0; o0 < 12; o0++)
          et(
            X,
            String(U * 100 + o0 + 1),
            (o0 + 0.5) * (N / 12),
            q / 2 + 1,
            13,
            "#2a2010",
            {
              spacing: "1px",
            },
          );
      }),
    )),
    (u0.dial = t0(128, 128, (U, X) => {
      let N = X / 2;
      ((U.fillStyle = "#f3eee0"),
        U.beginPath(),
        U.arc(N, N, N - 1, 0, TAU),
        U.fill(),
        (U.strokeStyle = Y0));
      for (let q = 0; q <= 50; q++) {
        let o0 = (-0.75 + (q / 50) * 1.5) * g;
        ((U.lineWidth = q % 5 ? 1 : 2.5),
          U.beginPath(),
          U.moveTo(N + Math.sin(o0) * (N - 8), N - Math.cos(o0) * (N - 8)),
          U.lineTo(
            N + Math.sin(o0) * (N - (q % 5 ? 14 : 20)),
            N - Math.cos(o0) * (N - (q % 5 ? 14 : 20)),
          ),
          U.stroke());
      }
      (et(U, "kg", N, N + 28, 14, Y0, {
        weight: 400,
      }),
        (U.strokeStyle = "#b5412b"),
        (U.lineWidth = 2.5),
        U.beginPath(),
        U.moveTo(N, N),
        U.lineTo(N - 26, N - 34),
        U.stroke(),
        (U.fillStyle = Y0),
        U.beginPath(),
        U.arc(N, N, 5, 0, TAU),
        U.fill());
    })),
    (u0.today = t0(300, 420, (U, X, N) => {
      ((U.fillStyle = "#cfc3a6"),
        U.fillRect(0, 0, X, N),
        (U.strokeStyle = "#7a6332"),
        (U.lineWidth = 2),
        U.strokeRect(12, 12, X - 24, N - 24),
        et(U, "TODAY AT", X / 2, 46, 13, "#8a744a", {
          spacing: "6px",
          weight: 400,
        }),
        et(U, "SOLSTICE", X / 2, 76, 30, "#2a2218", {
          spacing: "8px",
        }),
        [
          ["07:00", "ROOFTOP YOGA", "POOL TERRACE"],
          ["12:30", "CHEF\u2019S TABLE LUNCH", "RESTAURANT"],
          ["16:00", "AFTERNOON TEA", "SKY LOBBY"],
          ["18:30", "SUNSET JAZZ", "EMBER BAR"],
          ["21:00", "STARGAZING", "LEVEL 48"],
        ].forEach(([q, o0, h0], y0) => {
          let D = 128 + y0 * 56;
          (et(U, q, 30, D, 18, "#a8894e", {
            align: "left",
            font: Z0,
            weight: 400,
          }),
            et(U, o0, 96, D - 7, 14, "#2a2218", {
              align: "left",
              spacing: "1.5px",
            }),
            et(U, h0, 96, D + 11, 9.5, "#8a744a", {
              align: "left",
              spacing: "2px",
              weight: 400,
            }));
        }));
    })),
    (u0.wineLabel = [0, 1, 2].map((U) =>
      t0(60, 76, (X, N, q) => {
        ((X.fillStyle = ["#efe6d2", "#1c1a18", "#e6d7b0"][U]),
          X.fillRect(0, 0, N, q),
          et(
            X,
            ["CH.", "NOIR", "SOL"][U],
            N / 2,
            24,
            14,
            U === 1 ? lt : "#3a2a1c",
            {
              font: Z0,
            },
          ),
          ct(
            X,
            10,
            40,
            N - 20,
            3,
            7,
            U === 1 ? "rgba(236,202,134,0.6)" : "rgba(58,42,28,0.6)",
          ));
      }),
    )),
    (u0.book = t0(360, 250, (U, X, N) => {
      ((U.fillStyle = "#f2ecdc"),
        U.fillRect(0, 0, X, N),
        (U.fillStyle = "rgba(0,0,0,0.16)"),
        U.fillRect(X / 2 - 2, 0, 4, N));
      for (let q = 0; q < 2; q++) {
        let o0 = 16 + q * (X / 2);
        et(U, q ? "SATURDAY" : "FRIDAY", o0, 20, 11, "#8a744a", {
          align: "left",
          spacing: "3px",
        });
        for (let h0 = 0; h0 < 12; h0++)
          if (
            ((U.fillStyle = "rgba(40,34,26,0.25)"),
            U.fillRect(o0, 36 + h0 * 17, X / 2 - 32, 1),
            d() < 0.7)
          ) {
            ((U.strokeStyle = "rgba(20,30,70,0.8)"),
              (U.lineWidth = 1.2),
              U.beginPath());
            let y0 = o0 + 4;
            U.moveTo(y0, 32 + h0 * 17);
            for (let D = 0; D < 9; D++)
              ((y0 += d.range(6, 13)),
                U.lineTo(y0, 32 + h0 * 17 + d.range(-5, 3)));
            U.stroke();
          }
      }
    })),
    p0 > K && console.warn("[detail-west] label atlas overflow", p0));
  let w0 = (U) => new MeshStandardMaterial(U),
    P0 = n.bottleClear.clone();
  ((P0.depthWrite = !1), (P0.name = "west-glass"));
  let st = w0({
      color: 15004150,
      roughness: 0.08,
      metalness: 0,
      transparent: !0,
      opacity: 0.62,
      depthWrite: !1,
      envMapIntensity: 1.5,
    }),
    J0 = w0({
      color: 726542,
      roughness: 0.1,
      metalness: 0,
      envMapIntensity: 1.5,
    }),
    q0 = new MeshPhysicalMaterial({
      color: 4852500,
      roughness: 0.95,
      metalness: 0,
      sheen: 1,
      sheenColor: new Color(13656176),
      sheenRoughness: 0.45,
    }),
    v0 = w0({
      color: 725012,
      roughness: 0.5,
      metalness: 0,
      emissive: 12573938,
      emissiveIntensity: 0.5,
    });
  {
    let U = [
        "#d9a3b6",
        "#e3c22e",
        "#5f8f1f",
        "#4a2414",
        "#5c0f18",
        "#a3520e",
        "#3d0712",
        "#e07a12",
      ],
      X = createCanvas(16, 1),
      N = X.getContext("2d");
    U.forEach((o0, h0) => {
      ((N.fillStyle = o0), N.fillRect(h0, 0, 1, 1));
    });
    let q = new CanvasTexture(X);
    ((q.colorSpace = SRGBColorSpace),
      (q.magFilter = q.minFilter = NearestFilter),
      (q.generateMipmaps = !1),
      (w = w0({
        map: q,
        roughness: 0.55,
        metalness: 0,
      })),
      (T = w0({
        map: q,
        roughness: 0.13,
        metalness: 0,
        emissive: 16777215,
        emissiveMap: q,
        emissiveIntensity: 0.3,
      })));
  }
  let x0 = {
      tint: 0,
    },
    C0 = {
      tint: 1,
    },
    k0 = {
      tint: 2,
    },
    O0 = {
      tint: 3,
    },
    B0 = {
      tint: 4,
    },
    ot = {
      tint: 5,
      liq: 1,
    },
    Q0 = {
      tint: 6,
      liq: 1,
    },
    nt = {
      tint: 7,
      liq: 1,
    };
  [P0, st, J0, q0, v0, w, T].forEach((U, X) => {
    U.name || (U.name = "west-" + X);
  });
  let L0 = {
      tumbler: H(
        [
          [0, 0.003],
          [0.033, 0.003],
          [0.036, 0.008],
          [0.039, 0.09],
          [0.0372, 0.09],
          [0.0345, 0.014],
          [0, 0.014],
        ],
        12,
      ),
      tumblerFill: H(
        [
          [0, 0.0145],
          [0.0343, 0.0145],
          [0.0356, 0.048],
          [0, 0.048],
        ],
        10,
      ),
      highball: H(
        [
          [0, 0.003],
          [0.029, 0.003],
          [0.031, 0.008],
          [0.032, 0.145],
          [0.0305, 0.145],
          [0.029, 0.012],
          [0, 0.012],
        ],
        12,
      ),
      highballFill: H(
        [
          [0, 0.0125],
          [0.0288, 0.0125],
          [0.03, 0.112],
          [0, 0.112],
        ],
        10,
      ),
      wine: H(
        [
          [0, 0.001],
          [0.035, 0.001],
          [0.035, 0.003],
          [0.006, 0.008],
          [0.0035, 0.02],
          [0.0035, 0.085],
          [0.012, 0.095],
          [0.036, 0.125],
          [0.042, 0.155],
          [0.036, 0.205],
          [0.0348, 0.205],
          [0.0405, 0.155],
          [0.0345, 0.127],
          [0, 0.099],
        ],
        12,
      ),
      wineFill: H(
        [
          [0, 0.1],
          [0.0335, 0.1275],
          [0.0385, 0.146],
          [0, 0.146],
        ],
        10,
      ),
      coupe: H(
        [
          [0, 0.001],
          [0.036, 0.001],
          [0.036, 0.003],
          [0.006, 0.008],
          [0.0035, 0.02],
          [0.0035, 0.09],
          [0.02, 0.098],
          [0.05, 0.118],
          [0.054, 0.14],
          [0.0525, 0.14],
          [0.048, 0.12],
          [0, 0.102],
        ],
        12,
      ),
      coupeFill: H(
        [
          [0, 0.103],
          [0.0465, 0.1205],
          [0.0505, 0.132],
          [0, 0.132],
        ],
        10,
      ),
      wineLo: H(
        [
          [0.035, 0.001],
          [0.006, 0.008],
          [0.0035, 0.085],
          [0.036, 0.125],
          [0.042, 0.155],
          [0.036, 0.205],
        ],
        9,
      ),
      coupeLo: H(
        [
          [0.036, 0.001],
          [0.006, 0.008],
          [0.0035, 0.09],
          [0.05, 0.118],
          [0.054, 0.14],
        ],
        9,
      ),
      tumblerLo: H(
        [
          [0, 0.003],
          [0.035, 0.003],
          [0.039, 0.09],
          [0.037, 0.09],
          [0.0345, 0.012],
        ],
        9,
      ),
      highballLo: H(
        [
          [0, 0.003],
          [0.03, 0.003],
          [0.032, 0.145],
          [0.0305, 0.145],
          [0.029, 0.012],
        ],
        9,
      ),
      bottle: H(
        [
          [0, 0],
          [0.034, 0],
          [0.037, 0.008],
          [0.037, 0.18],
          [0.031, 0.215],
          [0.015, 0.245],
          [0.0135, 0.295],
          [0.016, 0.297],
          [0.016, 0.31],
          [0, 0.31],
        ],
        12,
      ),
      bottleLo: H(
        [
          [0, 0],
          [0.036, 0],
          [0.037, 0.18],
          [0.03, 0.218],
          [0.014, 0.248],
          [0.014, 0.31],
          [0, 0.31],
        ],
        8,
      ),
      bottleLay: H(
        [
          [0, 0],
          [0.036, 0],
          [0.037, 0.19],
          [0.014, 0.25],
          [0.014, 0.31],
        ],
        6,
      ),
      wineMid: H(
        [
          [0.035, 0.001],
          [0.006, 0.008],
          [0.0035, 0.085],
          [0.036, 0.125],
          [0.042, 0.155],
          [0.036, 0.205],
          [0.0348, 0.205],
          [0.0405, 0.155],
          [0.0345, 0.127],
          [0, 0.099],
        ],
        10,
      ),
      decanter: H(
        [
          [0, 0],
          [0.05, 0],
          [0.058, 0.012],
          [0.062, 0.07],
          [0.04, 0.12],
          [0.018, 0.15],
          [0.016, 0.2],
          [0.024, 0.215],
          [0.0225, 0.215],
          [0.0145, 0.2],
          [0.0165, 0.15],
          [0.038, 0.12],
          [0.06, 0.07],
          [0.056, 0.014],
          [0, 0.012],
        ],
        14,
      ),
      decanterFill: H(
        [
          [0, 0.013],
          [0.0555, 0.014],
          [0.0595, 0.062],
          [0, 0.062],
        ],
        12,
      ),
      jug: H(
        [
          [0, 0],
          [0.055, 0],
          [0.062, 0.01],
          [0.066, 0.12],
          [0.05, 0.19],
          [0.046, 0.24],
          [0.052, 0.25],
          [0.0505, 0.25],
          [0.044, 0.24],
          [0.048, 0.19],
          [0.064, 0.12],
          [0.06, 0.012],
          [0, 0.012],
        ],
        14,
      ),
      plate: H(
        [
          [0, 0],
          [0.07, 0],
          [0.122, 0.012],
          [0.128, 0.016],
          [0.12, 0.0155],
          [0.07, 0.006],
          [0, 0.006],
        ],
        16,
      ),
      saucer: H(
        [
          [0, 0],
          [0.035, 0],
          [0.066, 0.008],
          [0.068, 0.011],
          [0.06, 0.0105],
          [0.034, 0.005],
          [0, 0.005],
        ],
        12,
      ),
      cup: H(
        [
          [0, 0],
          [0.021, 0],
          [0.024, 0.004],
          [0.039, 0.052],
          [0.0372, 0.052],
          [0.0225, 0.008],
          [0, 0.008],
        ],
        12,
      ),
      bowl: H(
        [
          [0, 0],
          [0.03, 0],
          [0.034, 0.004],
          [0.062, 0.04],
          [0.06, 0.04],
          [0.032, 0.008],
          [0, 0.008],
        ],
        12,
      ),
      cloche: H(
        [
          [0.118, 0],
          [0.12, 0.004],
          [0.116, 0.04],
          [0.098, 0.075],
          [0.062, 0.1],
          [0.02, 0.112],
          [0.012, 0.118],
          [0.018, 0.13],
          [0.014, 0.14],
          [0, 0.142],
        ],
        16,
      ),
      dome: H(
        [
          [0.15, 0],
          [0.151, 0.004],
          [0.148, 0.07],
          [0.125, 0.13],
          [0.08, 0.17],
          [0.02, 0.186],
          [0.012, 0.192],
          [0.02, 0.205],
          [0, 0.212],
        ],
        16,
      ),
      stanchionBase: H(
        [
          [0, 0],
          [0.16, 0],
          [0.166, 0.012],
          [0.152, 0.022],
          [0.05, 0.036],
          [0.024, 0.06],
          [0.022, 0.9],
          [0.03, 0.905],
          [0.03, 0.925],
          [0.022, 0.93],
          [0.03, 0.945],
          [0.04, 0.965],
          [0.032, 0.992],
          [0, 1],
        ],
        16,
      ),
      shaker: H(
        [
          [0, 0],
          [0.036, 0],
          [0.04, 0.006],
          [0.044, 0.15],
          [0.036, 0.17],
          [0.03, 0.175],
          [0.03, 0.2],
          [0.019, 0.215],
          [0.019, 0.24],
          [0, 0.243],
        ],
        14,
      ),
      candle: H(
        [
          [0, 0],
          [0.03, 0],
          [0.034, 0.006],
          [0.03, 0.014],
          [0.026, 0.018],
          [0.036, 0.022],
          [0.038, 0.03],
          [0, 0.03],
        ],
        12,
      ),
      flame: H(
        [
          [0, 0],
          [0.006, 0.006],
          [0.0075, 0.014],
          [0.004, 0.026],
          [0, 0.036],
        ],
        6,
      ),
      vaseTall: H(
        [
          [0, 0],
          [0.12, 0],
          [0.14, 0.02],
          [0.2, 0.3],
          [0.21, 0.45],
          [0.15, 0.7],
          [0.09, 0.8],
          [0.1, 0.85],
          [0.086, 0.85],
          [0.076, 0.8],
          [0, 0.78],
        ],
        20,
      ),
      vaseBowl: H(
        [
          [0, 0],
          [0.07, 0],
          [0.085, 0.012],
          [0.12, 0.09],
          [0.11, 0.17],
          [0.075, 0.2],
          [0.08, 0.215],
          [0.07, 0.215],
          [0.064, 0.2],
          [0, 0.19],
        ],
        16,
      ),
      pot: H(
        [
          [0, 0],
          [0.055, 0],
          [0.06, 0.006],
          [0.075, 0.1],
          [0.08, 0.105],
          [0.076, 0.112],
          [0.068, 0.105],
          [0, 0.1],
        ],
        14,
      ),
      plume: (() => {
        let U = H(
            [
              [0, 0],
              [0.016, 0.06],
              [0.038, 0.22],
              [0.03, 0.42],
              [0.012, 0.56],
              [0, 0.62],
            ],
            6,
          ),
          X = U.attributes.position;
        for (let N = 0; N < X.count; N++) {
          let q = X.getY(N);
          X.setX(N, X.getX(N) + q * q * 0.28);
        }
        return (U.computeVertexNormals(), U);
      })(),
      pillow: z(0.44, 0.44, 0.15),
      lumbar: z(0.52, 0.27, 0.13),
    },
    ht = {
      tumbler: "tumblerFill",
      highball: "highballFill",
      wine: "wineFill",
      wineMid: "wineFill",
      coupe: "coupeFill",
    };
  function pt(U, X, N, q, o0 = null, h0 = !1) {
    if (
      (E(L0[U], P0, X, N, q, d() * 6, 0, 0, 1, v),
      o0 && ht[U] && E(L0[ht[U]], o0, X, N, q),
      h0)
    )
      for (let y0 = 0; y0 < 2; y0++)
        E(
          _(0.022, 0.022, 0.022),
          st,
          X + (y0 ? 0.012 : -0.01),
          N + 0.04 + y0 * 0.012,
          q + (y0 ? -0.008 : 0.01),
          d() * 3,
          d(),
          d(),
          1,
          v,
        );
  }
  let V0 = (U, X, N) => E(C(0.048, 0.004, 14), n.leatherBlack, U, X + 0.002, N);
  function c0(U, X, N, q, o0 = 1, h0 = n.brass, y0 = -1) {
    if (
      (E(L0.bottle, U, X, N, q, d() * 6, 0, 0, o0, U.transparent ? v : {}),
      E(C(0.0165 * o0, 0.035 * o0, 8), h0, X, N + 0.295 * o0, q),
      y0 >= 0)
    ) {
      let D = d() * 6;
      E(
        new CylinderGeometry(
          0.0378 * o0,
          0.0378 * o0,
          0.08 * o0,
          10,
          1,
          !0,
          D,
          2.2,
        ),
        n.paper,
        X,
        N + 0.11 * o0,
        q,
      );
    }
  }
  function Z(U, X, N, q = 0, o0 = !0) {
    (E(L0.saucer, n.ceramicWhite, U, X, N),
      E(L0.cup, n.ceramicWhite, U, X + 0.006, N),
      E(
        O(0.014, 0.0035, 5, 10, g),
        n.ceramicWhite,
        U + Math.cos(q) * 0.04,
        X + 0.034,
        N - Math.sin(q) * 0.04,
        q,
        0,
        -b,
      ),
      o0 && E(C(0.034, 0.002, 10), n.ceramicBlack, U, X + 0.05, N));
  }
  function r0(U, X, N, q = 0.3) {
    (E(L0.candle, n.brass, U, X, N),
      E(
        C(0.028, 0.085, 12, 0.032, !0),
        n.lampShade,
        U,
        X + 0.072,
        N,
        0,
        0,
        0,
        1,
        v,
      ),
      E(L0.flame, n.bulbWarm, U, X + 0.045, N, 0, 0, 0, 1, v),
      q && s.addGlow(x(U, X + 0.002, N), m, 0.7, 0.7, 16753226, q));
  }
  function b0(U, X, N) {
    (E(C(0.019, 0.016, 10), n.steel, U, X + 0.008, N),
      E(C(0.016, 0.004, 8), n.paper, U, X + 0.016, N),
      E(L0.flame, n.bulbWarm, U, X + 0.017, N, 0, 0, 0, 0.75, v));
  }
  function d0(U, X, N, q, o0 = 0) {
    (E(_(0.21, 0.006, 0.28), n.paper, X, N + 0.003, q, o0),
      T0(u0.mags[U % 4], 0.21, 0.28, X, N + 0.0066, q, o0, -b));
  }
  function V(U, X, N, q = 3, o0 = 0, h0 = 1) {
    let y0 = [
      n.leatherTan,
      n.velvetTeal,
      n.fabricCharcoal,
      n.leatherBlack,
      n.fabricCream,
    ];
    for (let D = 0; D < q; D++) {
      let W = d.range(0.17, 0.24) * h0,
        Y = d.range(0.24, 0.3) * h0,
        R0 = d.range(0.022, 0.045) * h0,
        U0 = o0 + d.range(-0.25, 0.25);
      (E(_(W, R0, Y), y0[d.int(0, 4)], U, X + R0 / 2, N, U0),
        E(
          _(W - 0.008, R0 * 0.74, Y + 0.002),
          n.paper,
          U + 0.003 * Math.cos(U0),
          X + R0 / 2,
          N - 0.003 * Math.sin(U0),
          U0,
        ),
        (X += R0));
    }
    return X;
  }
  function B(U, X, N, q, o0, h0, y0 = [n.paper, x0], D = !0, W = 0.04) {
    let Y = X + o0 * 0.5;
    for (let R0 = 0; R0 < q; R0++) {
      let U0 = (R0 + 0.5) / q,
        $0 = Math.acos(1 - U0 * 0.92),
        g0 = R0 * 2.399963,
        G0 = Math.sin($0) * Math.cos(g0),
        K0 = Math.cos($0),
        it = Math.sin($0) * Math.sin(g0),
        ft = h0 * d.range(0.86, 1.04);
      E(
        A(W * d.range(0.85, 1.2), 1),
        y0[R0 % y0.length],
        U + G0 * ft,
        Y + K0 * ft * 0.8,
        N + it * ft,
        d() * 6,
        d() * 2,
        0,
        [1, 0.8, 1],
      );
    }
    if (D)
      for (let R0 = 0; R0 < Math.max(6, Math.round(q * 0.5)); R0++) {
        let U0 = R0 * 2.4,
          $0 = h0 * 0.95;
        E(
          L(1, 6, 4),
          n.foliage,
          U + Math.cos(U0) * $0,
          Y - h0 * 0.2 + d() * 0.06,
          N + Math.sin(U0) * $0,
          -U0,
          0.45 + d() * 0.5,
          0,
          [0.034, 0.005, 0.1],
        );
      }
    for (let R0 = 0; R0 < 4; R0++) {
      let U0 = R0 * 1.7;
      a.add(
        F(
          [U + Math.cos(U0) * 0.012, X, N + Math.sin(U0) * 0.012],
          [U + Math.cos(U0) * h0 * 0.4, Y, N + Math.sin(U0) * h0 * 0.4],
          0.003,
          4,
        ),
        n.foliage,
        {},
      );
    }
  }
  function j(U, X, N, q = 0) {
    let o0 = I(U, X, N, q);
    o0.add(L0.pot, n.ceramicWhite).add(
      C(0.066, 0.008, 12),
      n.soil,
      0,
      0.098,
      0,
    );
    for (let h0 = 0; h0 < 4; h0++) {
      let y0 = h0 * 1.7 + 0.4;
      o0.add(
        L(1, 8, 5),
        n.foliage,
        Math.cos(y0) * 0.06,
        0.125 + h0 * 0.006,
        Math.sin(y0) * 0.06,
        -y0,
        0.25,
        0,
        [0.085, 0.008, 0.033],
      );
    }
    for (let h0 = 0; h0 < 2; h0++) {
      let y0 = h0 ? -0.06 : 0.07,
        D = [
          [0, 0.1, 0],
          [y0 * 0.3, 0.26, 0.01],
          [y0 * 0.9, 0.4, 0.02],
          [y0 * 2.2, 0.47, 0.03],
        ];
      o0.tube(D, 0.0026, n.foliage, 10, 4);
      for (let W = 0; W < 4; W++) {
        let Y = 0.55 + W * 0.15,
          R0 = y0 * (0.3 + Y * 1.9 * Y),
          U0 = 0.3 + Y * 0.17 + (W % 2) * 0.012,
          $0 = 0.022 + W * 0.004;
        for (let g0 = 0; g0 < 3; g0++)
          o0.add(
            L(1, 6, 4),
            n.paper,
            R0,
            U0,
            $0,
            0,
            0,
            g0 * 1.047 + W,
            [0.027, 0.011, 0.004],
          );
        o0.add(
          L(1, 5, 4),
          x0,
          R0,
          U0 - 0.004,
          $0 + 0.006,
          0,
          0,
          0,
          [0.008, 0.012, 0.006],
        );
      }
    }
  }
  function s0(U, X, N, q, o0 = 2, h0 = n.leatherTan) {
    let y0 = I(U, X, N, q),
      D = 0.42;
    y0.add(R(o0, 0.1, D, 0.035, 2), h0, 0, 0.41, 0);
    for (let R0 = 0; R0 < Math.round(o0 / 0.36); R0++)
      for (let U0 of [-0.09, 0.09])
        y0.add(
          L(0.011, 6, 4),
          n.brass,
          -o0 / 2 +
            0.2 +
            R0 * ((o0 - 0.4) / Math.max(1, Math.round(o0 / 0.36) - 1)),
          0.461,
          U0,
          0,
          0,
          0,
          [1, 0.5, 1],
        );
    y0.add(R(o0 - 0.06, 0.03, D - 0.06, 0.006), n.brass, 0, 0.345, 0);
    for (let R0 of [-1, 1]) {
      for (let U0 of [-1, 1])
        y0.rod(
          [R0 * (o0 / 2 - 0.09), 0, U0 * (D / 2 - 0.06)],
          [R0 * (o0 / 2 - 0.09), 0.34, U0 * (D / 2 - 0.06)],
          0.012,
          n.brass,
        );
      y0.rod(
        [R0 * (o0 / 2 - 0.09), 0.1, -(D / 2 - 0.06)],
        [R0 * (o0 / 2 - 0.09), 0.1, D / 2 - 0.06],
        0.008,
        n.brass,
        6,
      );
    }
    y0.rod(
      [-(o0 / 2 - 0.09), 0.1, 0],
      [o0 / 2 - 0.09, 0.1, 0],
      0.008,
      n.brass,
      6,
    );
    let W = y0.pt(-o0 / 2, 0, -D / 2),
      Y = y0.pt(o0 / 2, 0.46, D / 2);
    (e.addCollider(W.x, W.y, W.z, Y.x, Y.y, Y.z, "fabric"),
      e.aoBlob(
        U,
        N,
        X,
        (Math.abs(Math.cos(q)) > 0.5 ? o0 : D) * 0.6,
        (Math.abs(Math.cos(q)) > 0.5 ? D : o0) * 0.6,
        0.4,
      ));
  }
  function l0(U, X, N, q, o0 = 1.2, h0 = 0.36, y0 = 0.8) {
    let D = I(U, X, N, q);
    (D.add(R(o0, 0.032, h0, 0.008, 2), n.marbleDark, 0, y0 - 0.016, 0),
      D.add(R(o0 - 0.05, 0.03, h0 - 0.05, 0.005), n.brass, 0, y0 - 0.047, 0));
    let W = Math.max(2, Math.round(o0 / 1.1) + 1);
    for (let U0 = 0; U0 < W; U0++) {
      let $0 = -o0 / 2 + 0.05 + U0 * ((o0 - 0.1) / (W - 1));
      for (let g0 of [-1, 1])
        D.rod(
          [$0, 0, g0 * (h0 / 2 - 0.045)],
          [$0, y0 - 0.06, g0 * (h0 / 2 - 0.045)],
          0.011,
          n.brass,
        );
      D.rod(
        [$0, 0.14, -(h0 / 2 - 0.045)],
        [$0, 0.14, h0 / 2 - 0.045],
        0.007,
        n.brass,
        6,
      );
    }
    D.rod(
      [-o0 / 2 + 0.05, 0.14, 0],
      [o0 / 2 - 0.05, 0.14, 0],
      0.007,
      n.brass,
      6,
    );
    let Y = D.pt(-o0 / 2, 0, -h0 / 2),
      R0 = D.pt(o0 / 2, y0, h0 / 2);
    return (
      e.addCollider(Y.x, Y.y, Y.z, R0.x, R0.y, R0.z, "marble"),
      e.aoBlob(
        U,
        N,
        X,
        (Math.abs(Math.cos(q)) > 0.5 ? o0 : h0) * 0.62,
        (Math.abs(Math.cos(q)) > 0.5 ? h0 : o0) * 0.62,
        0.35,
      ),
      D
    );
  }
  function E0(U, X, N, q, o0, h0) {
    let D = I(N, q, o0, h0);
    (D.add(R(X + 0.16, 0.2, 0.03, 0.006), n.blackMetal, 0, 0, 0.015)
      .add(R(X + 0.2, 0.014, 0.036, 0.004), n.brass, 0, 0.2 / 2 + 0.004, 0.018)
      .add(
        R(X + 0.2, 0.014, 0.036, 0.004),
        n.brass,
        0,
        -0.2 / 2 - 0.004,
        0.018,
      ),
      D.lab(U, X, (X * 60) / 560, 0, 0, 0.0312, 0, 0, 0, !0));
  }
  {
    (a.bbox(-3.9, 0.78 - 0.04, -4.8, 3.9, 0.78, -4.4, n.walnut, {
      r: 0.008,
      seg: 1,
    }),
      u(-3.9, 0.78 - 0.052, -4.806, 3.9, 0.78 - 0.04, -4.8, n.brass));
    for (let Y of [-3.7, -1.9, 0, 1.9, 3.7])
      u(
        Y - 0.015,
        0.78 - 0.3,
        -4.74,
        Y + 0.015,
        0.78 - 0.04,
        -4.4,
        n.blackMetal,
      );
    e.addCollider(-3.9, 0, -4.8, 3.9, 0.78, -4.4, "wood");
    for (let Y of [-3.42, 3.42]) {
      a.bbox(Y - 0.24, 0.02, -4.78, Y + 0.24, 0.78 - 0.05, -4.42, n.woodDark, {
        r: 0.006,
        seg: 1,
      });
      for (let R0 = 0; R0 < 3; R0++)
        (u(
          Y - 0.22,
          0.07 + R0 * 0.22,
          -4.786,
          Y + 0.22,
          0.26 + R0 * 0.22,
          -4.78,
          n.walnut,
        ),
          u(
            Y - 0.07,
            0.15 + R0 * 0.22,
            -4.796,
            Y + 0.07,
            0.165 + R0 * 0.22,
            -4.786,
            n.brass,
          ));
    }
    (E(
      H(
        [
          [0, 0],
          [0.11, 0],
          [0.13, 0.3],
          [0.125, 0.3],
          [0.105, 0.006],
          [0, 0.006],
        ],
        14,
      ),
      n.blackMetal,
      -0.55,
      0,
      -4.62,
    ),
      E(z(0.2, 0.2, 0.12), n.paper, -0.55, 0.22, -4.62, 0.5, b));
    for (let Y of [-3, 1.5]) {
      let R0 = I(Y, 0.78, -4.56, c);
      R0.add(R(0.24, 0.012, 0.18, 0.004), n.blackMetal, 0, 0.006, -0.02)
        .rod([0, 0.01, -0.05], [0, 0.26, -0.05], 0.014, n.blackMetal)
        .add(R(0.54, 0.32, 0.022, 0.008), n.plasticBlack, 0, 0.3, -0.03)
        .lab(u0.monitor, 0.5, 0.29, 0, 0.3, -0.0185, 0, 0, 0, !0)
        .add(C(0.013, 0.003, 10), n.brass, 0, 0.3, -0.0425, 0, b)
        .add(R(0.38, 0.014, 0.13, 0.005), n.blackMetal, 0.02, 0.007, 0.145);
      for (let U0 = 0; U0 < 4; U0++)
        R0.add(
          _(0.35, 0.004, 0.022),
          n.plasticBlack,
          0.02,
          0.0155,
          0.103 + U0 * 0.028,
        );
      (R0.add(
        L(1, 8, 6),
        n.plasticBlack,
        0.29,
        0.012,
        0.15,
        0,
        0,
        0,
        [0.03, 0.016, 0.05],
      ),
        R0.add(_(0.07, 0.0015, 0.07), C0, -0.29, 0.34, -0.018, 0, 0, 0.12),
        a.add(
          P(
            [
              [Y, 0.78 + 0.02, -4.5],
              [Y + 0.05, 0.78 + 0.004, -4.46],
              [Y + 0.08, 0.78 - 0.2, -4.42],
              [Y + 0.06, 0.05, -4.44],
            ],
            0.004,
            14,
            4,
          ),
          n.rubber,
          {},
        ));
    }
    I(-1.35, 0.78, -4.6, c)
      .add(R(0.17, 0.045, 0.21, 0.01), n.plasticBlack, 0, 0.03, 0, 0, 0.16)
      .add(
        R(0.048, 0.03, 0.2, 0.012),
        n.plasticBlack,
        -0.062,
        0.062,
        0,
        0,
        0.16,
      )
      .lab(u0.keypad, 0.07, 0.1, 0.03, 0.055, 0.004, 0, 0.16 - b, 0)
      .tube(
        [
          [-0.062, 0.05, 0.1],
          [-0.12, 0.01, 0.13],
          [-0.1, 0.012, 0.02],
          [-0.03, 0.02, -0.09],
        ],
        0.004,
        n.rubber,
        12,
        4,
      );
    {
      let Y = I(3.05, 0.78, -4.6, c);
      Y.add(R(0.13, 0.05, 0.17, 0.01), n.plasticWhite, 0, 0.025, 0)
        .add(_(0.09, 0.004, 0.06), n.blackMetal, 0, 0.051, 0.02)
        .add(_(0.086, 0.002, 0.054), n.plasticWhite, 0.005, 0.054, 0.025, 0.2);
      for (let R0 = 0; R0 < 3; R0++)
        Y.add(
          _(0.09, 0.012, 0.058),
          R0 % 2 ? n.plasticWhite : n.fabricCharcoal,
          -0.17,
          0.006 + R0 * 0.012,
          0,
          0.1 * R0,
        );
    }
    I(0.25, 0.78, -4.58, c)
      .add(R(0.15, 0.13, 0.2, 0.012), n.plasticBlack, 0, 0.065, 0)
      .add(_(0.085, 0.14, 0.002), n.paper, 0, 0.16, -0.05, 0, 0.25);
    for (let [Y, R0] of [
      [-0.5, -4.52],
      [2.72, -4.5],
    ])
      (E(
        H(
          [
            [0, 0],
            [0.033, 0],
            [0.035, 0.004],
            [0.035, 0.09],
            [0.032, 0.09],
            [0.032, 0.008],
            [0, 0.008],
          ],
          12,
        ),
        n.brass,
        Y,
        0.78,
        R0,
      ),
        [
          [n.blackMetal, 0.3, 0.2],
          [n.brass, -0.25, 1.4],
          [n.plasticWhite, 0.2, 3],
          [B0, -0.3, 4.4],
        ].forEach(([U0, $0, g0]) =>
          E(
            C(0.004, 0.14, 6),
            U0,
            Y + Math.cos(g0) * 0.012,
            0.78 + 0.075,
            R0 + Math.sin(g0) * 0.012,
            g0,
            $0 * 0.6,
          ),
        ));
    (E(L0.cup, n.ceramicBlack, 0.95, 0.78, -4.55, 0, 0, 0, 1.25),
      E(C(0.04, 0.002, 10), n.woodDark, 0.95, 0.78 + 0.05, -4.55),
      E(
        O(0.018, 0.004, 5, 10, g),
        n.ceramicBlack,
        0.95 + 0.05,
        0.78 + 0.04,
        -4.55,
        0,
        0,
        -b,
      ),
      V(-2.2, 0.78, -4.62, 2, 0.2),
      V(2.35, 0.78, -4.6, 3, -0.3, 0.9));
    for (let Y = 0; Y < 4; Y++)
      E(
        _(0.1, 0.11, 0.004),
        [n.leatherTan, n.velvetTeal, n.fabricCharcoal, n.paper][Y],
        -3.62 + Y * 0.012,
        0.78 + 0.062,
        -4.52 - Y * 0.03,
        0.2,
        -0.2,
      );
    {
      let Y = I(-3.72, 0.78, -4.66, c);
      Y.add(R(0.2, 0.035, 0.09, 0.008), n.plasticBlack, 0, 0.018, 0);
      for (let R0 of [-0.05, 0.05])
        Y.add(R(0.05, 0.11, 0.03, 0.008), n.blackMetal, R0, 0.085, 0)
          .rod([R0 + 0.015, 0.14, 0], [R0 + 0.015, 0.21, 0], 0.004, n.rubber, 5)
          .add(L(0.004, 5, 4), n.bulbCool, R0 - 0.012, 0.125, 0.016);
    }
    let N = (Y, R0, U0) => {
      let $0 = I(Y, 1.14, R0, U0);
      ($0
        .add(R(0.17, 0.02, 0.11, 0.008), n.brass, 0, 0.01, 0)
        .add(
          H(
            [
              [0, 0],
              [0.022, 0],
              [0.012, 0.03],
              [0.009, 0.05],
            ],
            10,
          ),
          n.brass,
          0,
          0.02,
          0,
        )
        .tube(
          [
            [0, 0.06, 0],
            [0, 0.2, -0.01],
            [0, 0.265, 0.02],
            [0, 0.275, 0.06],
          ],
          0.007,
          n.brass,
          14,
          6,
        )
        .add(
          L(1, 14, 8),
          n.brass,
          0,
          0.275,
          0.075,
          0,
          0,
          0,
          [0.135, 0.036, 0.055],
        )
        .add(_(0.2, 0.006, 0.05), n.bulbWarm, 0, 0.252, 0.078, 0, 0, 0, 1, v)
        .add(C(0.005, 0.03, 6), n.brass, 0.07, 0.03, 0.03),
        s.addGlow($0.pt(0, 0.002, 0.1), m, 0.9, 0.7, 16756832, 0.45));
    };
    (N(-3.78, -4.06, 0.25), N(3.8, -4.06, -0.25));
    let q = (Y, R0) => {
      I(Y, 1.14, R0, l)
        .add(C(0.032, 0.012, 12), n.blackMetal, 0, 0.006, 0)
        .rod([0, 0.01, 0], [0, 0.072, -0.012], 0.008, n.blackMetal)
        .add(R(0.084, 0.028, 0.15, 0.008), n.plasticBlack, 0, 0.085, 0, 0, 0.45)
        .lab(u0.keypad, 0.07, 0.107, 0, 0.0988, 0.0068, 0, 0.45 - b, 0, !0);
    };
    (q(-1.75, -3.8), q(2.8, -3.8));
    {
      let Y = I(-0.78, 1.14, -3.9, 0.12);
      Y.add(_(0.36, 0.006, 0.09), P0, 0, 0.003, 0, 0, 0, 0, 1, v)
        .add(_(0.36, 0.21, 0.004), P0, 0, 0.105, -0.04, 0, -0.18, 0, 1, v)
        .add(_(0.36, 0.05, 0.004), P0, 0, 0.028, 0.04, 0, 0, 0, 1, v);
      for (let R0 = 0; R0 < 3; R0++)
        Y.add(
          _(0.105, 0.2, 0.012),
          n.paper,
          -0.12 + R0 * 0.12,
          0.108,
          -0.012,
          0,
          -0.18,
        ).lab(
          u0.brochure[R0],
          0.105,
          0.2,
          -0.12 + R0 * 0.12,
          0.1085,
          -0.0055,
          0,
          -0.18,
        );
    }
    j(-0.18, 1.14, -4.1, 0.6);
    {
      let Y = I(0.5, 1.14, -3.86, -0.08);
      Y.add(R(0.44, 0.006, 0.3, 0.003), n.leatherBlack, 0, 0.003, 0)
        .add(_(0.2, 0.0015, 0.13), n.paper, -0.04, 0.0072, 0.02, 0.1)
        .add(C(0.0045, 0.14, 6), n.brass, 0.12, 0.012, 0.03, 0.5, 0, b);
      for (let R0 = 0; R0 < 5; R0++)
        Y.add(
          _(0.14, 8e-4, 0.002),
          n.fabricCharcoal,
          -0.05,
          0.0082,
          -0.02 + R0 * 0.016,
          0.1,
        );
    }
    E(L0.bowl, n.brass, -1.22, 1.14, -3.82);
    for (let Y = 0; Y < 9; Y++)
      E(
        L(0.009, 5, 4),
        [n.paper, x0, n.ceramicWhite][Y % 3],
        -1.22 + d.range(-0.03, 0.03),
        1.14 + 0.016 + d.range(0, 0.012),
        -3.82 + d.range(-0.03, 0.03),
      );
    I(3.08, 1.14, -3.9, -0.2)
      .add(R(0.2, 0.28, 0.012, 0.004), n.brass, 0, 0.145, 0, 0, -0.16)
      .lab(u0.today, 0.18, 0.252, 0, 0.1462, 0.0065, 0, -0.16)
      .rod([0, 0.2, -0.03], [0, 0.002, -0.09], 0.004, n.brass, 5);
    let o0 = (Y, R0, U0 = 0.09) =>
      a.add(
        P(
          [
            [Y[0], 0.915, Y[1]],
            [(Y[0] * 3 + R0[0]) / 4, 0.9 - U0 * 0.8, (Y[1] * 3 + R0[1]) / 4],
            [(Y[0] + R0[0]) / 2, 0.9 - U0, (Y[1] + R0[1]) / 2],
            [(Y[0] + R0[0] * 3) / 4, 0.9 - U0 * 0.8, (Y[1] + R0[1] * 3) / 4],
            [R0[0], 0.915, R0[1]],
          ],
          0.017,
          18,
          7,
        ),
        q0,
        {},
      );
    for (let Y of [-3.95, 0, 3.95])
      (E(L0.stanchionBase, n.brass, Y, 0, -3.5),
        E(L0.stanchionBase, n.brass, Y, 0, -3.05),
        o0([Y, -3.5], [Y, -3.05], 0.05),
        e.aoBlob(Y, -3.27, 0, 0.3, 0.5, 0.3));
    I(-3.95, 1, -3.05, 0.35)
      .rod([0, 0, 0], [0, 0.18, 0], 0.008, n.brass, 6)
      .add(R(0.3, 0.23, 0.016, 0.005), n.brass, 0, 0.3, 0)
      .lab(u0.waitHere, 0.27, 0.2, 0, 0.3, 0.0086, 0, 0, 0, !0)
      .lab(u0.way.RECEPTION, 0.26, 0.028, 0, 0.3, -0.0086, g, 0, 0, !0);
    let h0 = -7.9,
      y0 = 0.93;
    I(-3.1, y0, -7.66, l)
      .add(R(0.44, 0.24, 0.4, 0.02), n.plasticWhite, 0, 0.12, 0)
      .add(_(0.36, 0.012, 0.18), n.plasticBlack, 0, 0.246, 0.04)
      .add(_(0.3, 0.004, 0.22), n.paper, 0, 0.253, 0.07, 0.03)
      .add(_(0.34, 0.05, 0.01), n.plasticBlack, 0, 0.06, 0.2)
      .add(L(0.005, 5, 4), n.bulbCool, 0.17, 0.2, 0.202);
    for (let Y = 0; Y < 3; Y++)
      E(
        _(0.215, 0.052, 0.3),
        n.paper,
        -2.5,
        y0 + 0.026 + Y * 0.052,
        -7.68,
        Y * 0.05,
      );
    E(_(0.215, 0.052, 0.3), n.paper, -2.26, y0 + 0.026, -7.66, -0.1);
    for (let Y = 0; Y < 5; Y++)
      E(
        R(0.07, 0.3, 0.26, 0.006),
        [
          n.leatherTan,
          n.fabricCharcoal,
          n.velvetTeal,
          n.leatherBlack,
          n.leatherTan,
        ][Y],
        -1.95 + Y * 0.076,
        y0 + 0.15,
        -7.72,
        0,
        0,
        Y === 4 ? -0.12 : 0,
      );
    {
      let Y = I(-1.25, y0, -7.66, l);
      for (let R0 = 0; R0 < 3; R0++) {
        Y.add(_(0.26, 0.004, 0.34), n.blackMetal, 0, 0.01 + R0 * 0.07, 0).add(
          _(0.24, 0.006 + R0 * 0.006, 0.31),
          n.paper,
          0,
          0.018 + R0 * 0.07 + R0 * 0.003,
          0,
          0.03 * R0,
        );
        for (let U0 of [-0.13, 0.13])
          Y.rod([U0, 0, -0.17], [U0, 0.16, -0.17], 0.004, n.blackMetal, 5);
      }
    }
    j(-0.72, y0, -7.64, 2.2);
    {
      (u(-3.5, 1.1, h0, -0.5, 2.04, h0 + 0.012, n.woodDark),
        a.bbox(
          -3.5 - 0.025,
          1.1 - 0.025,
          h0,
          -0.5 + 0.025,
          1.1,
          h0 + 0.17 + 0.01,
          n.walnut,
          {
            r: 0.004,
            seg: 1,
          },
        ),
        a.bbox(
          -3.5 - 0.025,
          2.04,
          h0,
          -0.5 + 0.025,
          2.04 + 0.03,
          h0 + 0.17 + 0.012,
          n.walnut,
          {
            r: 0.004,
            seg: 1,
          },
        ));
      for (let gt of [-3.5 - 0.025, -0.5])
        a.bbox(gt, 1.1, h0, gt + 0.025, 2.04, h0 + 0.17 + 0.01, n.walnut, {
          r: 0.004,
          seg: 1,
        });
      for (let gt = 1; gt < 12; gt++)
        u(
          -3.5 + gt * 0.25 - 0.005,
          1.1,
          h0 + 0.012,
          -3.5 + gt * 0.25 + 0.005,
          2.04,
          h0 + 0.17,
          n.woodDark,
        );
      for (let gt = 1; gt < 4; gt++)
        u(
          -3.5,
          1.1 + gt * 0.235 - 0.006,
          h0 + 0.012,
          -0.5,
          1.1 + gt * 0.235 + 0.006,
          h0 + 0.17,
          n.woodDark,
        );
      for (let gt = 0; gt < 4; gt++) {
        T0(
          u0.cubby[gt],
          -0.5 - -3.5,
          0.022,
          (-3.5 + -0.5) / 2,
          1.1 + gt * 0.235 + (gt ? 0.018 : 0.012),
          h0 + 0.17 + (gt ? 0.0015 : 0.0115),
        );
        for (let rt = 0; rt < 12; rt++) {
          let dt = d(),
            tt = -3.5 + (rt + 0.5) * 0.25,
            X0 = 1.1 + gt * 0.235 + (gt ? 0.006 : 0);
          dt < 0.34
            ? E(
                _(0.16, 0.11, 0.003),
                n.paper,
                tt + d.range(-0.02, 0.02),
                X0 + 0.058,
                h0 + 0.09,
                d.range(-0.3, 0.3),
                -0.35,
              )
            : dt < 0.52
              ? (E(
                  _(0.09, 0.006, 0.056),
                  n.plasticWhite,
                  tt,
                  X0 + 0.004,
                  h0 + 0.1,
                  d.range(-0.4, 0.4),
                ),
                E(
                  _(0.09, 0.006, 0.056),
                  B0,
                  tt + 0.01,
                  X0 + 0.01,
                  h0 + 0.105,
                  d.range(-0.4, 0.4),
                ))
              : dt < 0.62
                ? E(
                    _(0.15, 0.09, 0.11),
                    n.woodLight,
                    tt,
                    X0 + 0.046,
                    h0 + 0.08,
                    d.range(-0.15, 0.15),
                  )
                : dt < 0.7 &&
                  (E(
                    _(0.16, 0.11, 0.003),
                    n.paper,
                    tt,
                    X0 + 0.058,
                    h0 + 0.06,
                    0.1,
                    -0.3,
                  ),
                  E(
                    _(0.15, 0.1, 0.003),
                    n.fabricCream,
                    tt + 0.01,
                    X0 + 0.053,
                    h0 + 0.11,
                    -0.2,
                    -0.4,
                  ));
        }
      }
    }
    {
      let Y = I(-4.6, 1.72, h0, l),
        R0 = 1.24,
        U0 = 0.92;
      Y.add(_(R0, U0, 0.012), n.fabricCharcoal, 0, 0, 0.006)
        .add(R(R0 + 0.06, 0.035, 0.1, 0.006), n.brass, 0, U0 / 2 + 0.017, 0.05)
        .add(
          R(R0 + 0.06, 0.035, 0.1, 0.006),
          n.brass,
          0,
          -U0 / 2 - 0.017,
          0.05,
        );
      for (let $0 of [-1, 1])
        Y.add(
          R(0.035, U0, 0.1, 0.006),
          n.brass,
          $0 * (R0 / 2 + 0.013),
          0,
          0.05,
        );
      Y.add(_(R0, U0, 0.006), P0, 0, 0, 0.092, 0, 0, 0, 1, v).add(
        L(0.012, 8, 6),
        n.brass,
        R0 / 2 - 0.06,
        0,
        0.104,
      );
      for (let $0 = 0; $0 < 5; $0++)
        for (let g0 = 0; g0 < 10; g0++) {
          let G0 = -R0 / 2 + 0.085 + g0 * 0.119,
            K0 = U0 / 2 - 0.11 - $0 * 0.17;
          if (
            (Y.rod([G0, K0, 0.012], [G0, K0, 0.04], 0.003, n.brass, 5),
            d() < 0.78)
          ) {
            let it = d.range(-0.25, 0.25);
            Y.add(
              _(0.006, 0.045, 0.002),
              n.steel,
              G0,
              K0 - 0.025,
              0.034,
              0,
              0,
              it,
            ).add(
              R(0.026, 0.05, 0.005, 0.002),
              ($0 + g0) % 3 ? n.leatherTan : n.brass,
              G0 + it * 0.05,
              K0 - 0.07,
              0.034,
              0,
              0,
              it,
            );
          }
        }
    }
    {
      (a.bbox(0.25, 0.06, -7.9, 1.95, 0.9, -7.45, n.walnut, {
        r: 0.008,
        seg: 1,
      }),
        a.bbox(0.23, 0.9, -7.9, 1.97, 0.93, -7.43, n.marbleDark, {
          r: 0.006,
          seg: 1,
        }),
        u(0.3, 0, -7.88, 1.9, 0.06, -7.5, n.blackMetal));
      for (let R0 = 0; R0 < 3; R0++) {
        let U0 = 0.535 + R0 * 0.565;
        (a.bbox(U0 - 0.265, 0.1, -7.452, U0 + 0.265, 0.86, -7.438, n.walnut, {
          r: 0.004,
          seg: 1,
        }),
          E(
            C(0.006, 0.16, 6),
            n.brass,
            U0 + (R0 === 1 ? 0 : R0 ? -0.2 : 0.2),
            0.52,
            -7.425,
          ));
      }
      (e.addCollider(0.25, 0, -7.9, 1.95, 0.93, -7.45, "wood"),
        I(1.1, y0, -7.66, l).add(
          R(0.46, 0.014, 0.3, 0.005),
          n.brass,
          -0.42,
          0.007,
          0,
        ),
        E(L0.jug, P0, 0.56, y0 + 0.014, -7.7, 0, 0, 0, 1, v),
        pt("tumbler", 0.74, y0 + 0.014, -7.62),
        pt("tumbler", 0.8, y0 + 0.014, -7.72),
        pt("tumbler", 0.66, y0 + 0.014, -7.57));
      for (let R0 = 0; R0 < 4; R0++)
        E(
          _(0.3, 0.012, 0.21),
          n.paper,
          1.3,
          y0 + 0.006 + R0 * 0.012,
          -7.66,
          0.04 * R0,
        );
      (T0(u0.news, 0.3, 0.21, 1.3, y0 + 0.0485, -7.66, 0.12, -b),
        E(
          R(0.22, 0.09, 0.16, 0.008),
          n.leatherTan,
          1.72,
          y0 + 0.045,
          -7.68,
          -0.2,
        ),
        E(_(0.2, 0.004, 0.012), n.brass, 1.72, y0 + 0.092, -7.68, -0.2));
    }
    let D = [
        [2.72, -5],
        [3.42, 0],
        [4.12, 4],
        [4.82, 9],
      ],
      W = 2.86;
    D.forEach(([Y], R0) => {
      (E(
        H(
          [
            [0, 0],
            [0.19, 0],
            [0.2, 0.008],
            [0.2, 0.03],
            [0.186, 0.04],
            [0.172, 0.03],
            [0.172, 0.012],
            [0, 0.012],
          ],
          28,
        ),
        n.brass,
        Y,
        W,
        h0,
        0,
        b,
      ),
        a.add(S0(u0.clock, 0.171), _0, {
          matrix: M(Y, W, h0 + 0.0135),
          keepUV: !0,
          shadow: !1,
        }),
        E(C(0.011, 0.014, 10), n.brass, Y, W, h0 + 0.03, 0, b),
        T0(
          u0.city[R0],
          0.44,
          (0.44 * 40) / 256,
          Y,
          W - 0.28,
          h0 + 0.003,
          0,
          0,
          0,
          !0,
        ));
    });
    {
      let Y = new Float32Array(144),
        R0 = [],
        U0 = new Float32Array(12 * 12);
      for (let it = 0; it < 12; it++)
        R0.push(it * 4, it * 4 + 1, it * 4 + 2, it * 4, it * 4 + 2, it * 4 + 3);
      for (let it = 2; it < U0.length; it += 3) U0[it] = 1;
      let $0 = new BufferGeometry();
      ($0.setAttribute("position", new BufferAttribute(Y, 3)),
        $0.setAttribute("normal", new BufferAttribute(U0, 3)),
        $0.setIndex(R0));
      let g0 = new Mesh(
        $0,
        w0({
          color: 723724,
          roughness: 0.45,
          metalness: 0.2,
        }),
      );
      ((g0.frustumCulled = !1), (g0.name = "clock-hands"), e.loose.push(g0));
      let G0 = -1,
        K0 = () => {
          let it = new Date(),
            ft = it.getUTCSeconds();
          ft !== G0 &&
            ((G0 = ft),
            D.forEach(([gt, rt], dt) => {
              let tt = it.getUTCMinutes() + ft / 60;
              [
                [
                  ((((it.getUTCHours() + rt + 24) % 12) + tt / 60) / 12) * TAU,
                  0.095,
                  0.0095,
                  -0.02,
                ],
                [(tt / 60) * TAU, 0.142, 0.0065, -0.02],
                [(ft / 60) * TAU, 0.15, 0.0025, -0.04],
              ].forEach(([ut, z0, I0, vt], wt) => {
                let _t = (dt * 3 + wt) * 12,
                  Pt = Math.sin(ut),
                  bt = Math.cos(ut),
                  Et = bt * I0,
                  zt = -Pt * I0,
                  J = h0 + 0.021 + wt * 0.004,
                  Q = gt + Pt * vt,
                  i0 = W + bt * vt,
                  A0 = gt + Pt * z0,
                  N0 = W + bt * z0;
                ((Y[_t] = Q - Et),
                  (Y[_t + 1] = i0 - zt),
                  (Y[_t + 2] = J),
                  (Y[_t + 3] = Q + Et),
                  (Y[_t + 4] = i0 + zt),
                  (Y[_t + 5] = J),
                  (Y[_t + 6] = A0 + Et * 0.5),
                  (Y[_t + 7] = N0 + zt * 0.5),
                  (Y[_t + 8] = J),
                  (Y[_t + 9] = A0 - Et * 0.5),
                  (Y[_t + 10] = N0 - zt * 0.5),
                  (Y[_t + 11] = J));
              });
            }),
            ($0.attributes.position.needsUpdate = !0));
        };
      (K0(), t.update.push(K0));
    }
  }
  {
    (E0(u0.way["EMBER BAR"], 1.5, -11.9, 3.15, 4, h),
      E0(u0.way["SUITES  \xB7  CONFERENCE"], 1.9, 11.9, 3.15, 4, f),
      E0(u0.way.RESTAURANT, 1.3, -11.9, 2.66, -6.2, h),
      E0(u0.way["SUITES 4701 \u2013 4712"], 1.4, 11.9, 2.66, -6.2, f),
      E0(u0.way["LOBBY  \xB7  RECEPTION"], 1.6, -12.1, 3.15, 4, f));
    for (let X of [-7, 7])
      I(X, 2.75, 9.93, c)
        .add(R(1.5, 0.13, 0.03, 0.006), n.brass, 0, 0, 0.015)
        .lab(
          u0.way["POOL TERRACE"],
          1.2,
          (1.2 * 60) / 560,
          0,
          0,
          0.0312,
          0,
          0,
          0,
          !1,
        );
    {
      let X = I(-8.1, 0, -7.74, l);
      X.add(R(0.74, 0.06, 0.2, 0.01), n.brass, 0, 0.03, 0)
        .add(R(0.62, 1.82, 0.1, 0.012, 2), n.blackMetal, 0, 0.97, 0)
        .add(R(0.66, 0.03, 0.12, 0.006), n.brass, 0, 1.895, 0);
      for (let N of [-1, 1])
        X.add(R(0.018, 1.82, 0.11, 0.005), n.brass, N * 0.318, 0.97, 0);
      (X.lab(u0.directory, 0.54, (0.54 * 640) / 280, 0, 1, 0.0515, 0, 0, 0, !0),
        e.addCollider(-8.42, 0, -7.88, -7.78, 1.9, -7.66, "metal"),
        s.addGlow(x(-8.1, 0, -7.35), m, 1.4, 0.9, 16761466, 0.14));
    }
    {
      let X = I(8.1, 0, -7.76, l);
      for (let N of [-0.27, 0.27])
        X.rod([N, 0, 0.1], [N, 1.46, -0.06], 0.012, n.brass)
          .rod([N, 0, -0.1], [N, 0.7, 0.02], 0.01, n.brass)
          .add(L(0.018, 8, 6), n.brass, N, 1.47, -0.062);
      X.rod([-0.27, 0.04, 0.095], [0.27, 0.04, 0.095], 0.008, n.brass, 6);
      for (let N = 0; N < 4; N++) {
        let q = 0.32 + N * 0.29,
          o0 = 0.065 - N * 0.032;
        X.add(R(0.56, 0.018, 0.1, 0.004), n.woodDark, 0, q, o0, 0, 0.1).add(
          _(0.56, 0.05, 0.006),
          n.brass,
          0,
          q + 0.03,
          o0 + 0.05,
          0,
          0.1,
        );
        for (let h0 = 0; h0 < 4; h0++) {
          let y0 = (N + h0) % 3;
          X.add(
            _(0.11, 0.23, 0.014),
            n.paper,
            -0.2 + h0 * 0.133,
            q + 0.125,
            o0 + 0.012,
            0,
            -0.14,
          ).lab(
            u0.brochure[y0],
            0.11,
            0.23,
            -0.2 + h0 * 0.133,
            q + 0.126,
            o0 + 0.0195,
            0,
            -0.14,
          );
        }
      }
      (e.addCollider(7.8, 0, -7.9, 8.4, 1.5, -7.64, "metal"),
        e.aoBlob(8.1, -7.72, 0, 0.5, 0.3, 0.35));
    }
    {
      let X = I(-6.95, 0, -3, b);
      X.add(R(0.52, 1.02, 0.36, 0.014, 2), n.walnut, 0, 0.55, 0)
        .add(R(0.56, 0.04, 0.4, 0.01), n.brass, 0, 0.02, 0)
        .add(R(0.6, 0.03, 0.44, 0.01), n.marbleDark, 0, 1.085, 0, 0, -0.2)
        .add(R(0.44, 0.1, 0.012, 0.01), n.blackMetal, 0, 0.78, 0.184)
        .lab(
          u0.way.CONCIERGE,
          0.4,
          (0.4 * 60) / 560,
          0,
          0.78,
          0.1905,
          0,
          0,
          0,
          !0,
        );
      for (let q of [0.34, 0.5])
        X.add(_(0.4, 0.012, 0.012), n.brass, 0, q, 0.182);
      (X.add(
        _(0.38, 0.016, 0.27),
        n.leatherTan,
        -0.04,
        1.108,
        -0.02,
        0,
        -0.2,
      ).lab(u0.book, 0.36, 0.25, -0.04, 1.1175, -0.018, g, -b + 0.2, 0, !0),
        X.add(C(0.045, 0.012, 14), n.brass, 0.21, 1.115, 0.13)
          .rod([0.21, 1.115, 0.13], [0.21, 1.31, 0.13], 0.006, n.brass, 6)
          .add(
            C(0.05, 0.08, 14, 0.035, !0),
            n.lampShade,
            0.21,
            1.345,
            0.13,
            0,
            0,
            0,
            1,
            v,
          )
          .add(L(0.014, 6, 5), n.bulbWarm, 0.21, 1.335, 0.13, 0, 0, 0, 1, v),
        s.addGlow(X.pt(0.1, 1.11, 0.04), m, 0.8, 0.8, 16756832, 0.3));
      let N = X.pt(-0.2, 1.11, 0.14);
      (E(L0.bowl, n.brass, N.x, N.y, N.z, 0, 0, 0, 0.9),
        e.addCollider(-7.16, 0, -3.28, -6.76, 1.14, -2.72, "wood"),
        e.aoBlob(-6.95, -3, 0, 0.36, 0.44, 0.4));
    }
    let U = (X, N, q, o0, h0 = 1.1) => {
      let y0 = I(X, N, q, o0);
      for (let D of [-h0 * 0.3, h0 * 0.3])
        y0.rod([D, 0, 0.01], [D, 0.07, 0.15], 0.006, n.brass, 6);
      (y0
        .add(C(0.02, h0, 10), n.brass, 0, 0.075, 0.16, 0, 0, b)
        .add(
          _(h0 - 0.1, 0.005, 0.018),
          n.bulbWarm,
          0,
          0.056,
          0.16,
          0,
          0,
          0,
          1,
          v,
        ),
        s.addGlow(
          y0.pt(0, -0.75, 0.045),
          y0.dir(0, 0, 1),
          h0 * 2.1,
          1.7,
          16756832,
          0.26,
        ));
    };
    (U(-11.9, 2.68, -1.7, h),
      U(11.9, 2.68, -1.7, f),
      U(-6.4, Qt + 2.7, -7.94, l, 1.3),
      U(6.4, Qt + 2.7, -7.94, l, 1.3),
      s0(-11.64, 0, -1.7, b, 2, n.leatherTan),
      s0(11.64, 0, -1.7, b, 2, n.velvetTeal),
      r(
        i.cushion({
          mat: "velvetTeal",
        }),
        -11.64,
        0.47,
        -2.38,
        0.3,
      ),
      r(
        i.cushion({
          mat: "leatherTan",
        }),
        11.64,
        0.47,
        -1.02,
        -0.4,
      ),
      d0(2, 11.6, 0.46, -2.2, 0.4));
    {
      let X = I(-11.66, 0, 0.02, h);
      for (let N of [-0.2, 0.2])
        X.rod([N, 0, 0.13], [N, 1.02, 0], 0.01, n.brass)
          .rod([N, 0, -0.13], [N, 1.02, 0], 0.01, n.brass)
          .rod([N, 0.03, -0.125], [N, 0.03, 0.125], 0.006, n.brass, 5);
      for (let N = 0; N < 3; N++) {
        let q = 0.52 + N * 0.24,
          o0 = 0.065 - N * 0.03;
        (X.rod([-0.2, q, o0], [0.2, q, o0], 0.006, n.brass, 6),
          X.raw(
            k(
              [
                [0, q - 0.3, o0 + 0.012],
                [0, q - 0.1, o0 + 0.01],
                [0, q + 0.008, o0],
                [0, q - 0.1, o0 - 0.012],
                [0, q - 0.26, o0 - 0.016],
              ],
              0.33,
              [1, 0, 0],
              0.008,
            ),
            n.paper,
          ),
          X.lab(u0.news, 0.31, 0.27, 0, q - 0.155, o0 + 0.0165, 0, 0.02));
      }
    }
    for (let X of [-1, 1]) {
      let N = X * 8.48,
        q = 9.6;
      E(
        H(
          [
            [0, 0],
            [0.13, 0],
            [0.14, 0.01],
            [0.14, 0.55],
            [0.146, 0.56],
            [0.13, 0.56],
            [0.13, 0.02],
            [0, 0.02],
          ],
          18,
        ),
        n.brass,
        N,
        0,
        q,
      );
      for (let o0 = 0; o0 < 3; o0++) {
        let h0 = o0 * 2.2 + X,
          y0 = Math.cos(h0) * 0.06,
          D = Math.sin(h0) * 0.06,
          W = Math.cos(h0) * 0.13,
          Y = Math.sin(h0) * 0.13;
        (a.add(
          F(
            [N + y0, 0.03, q + D],
            [N + y0 * 0.5 + W * 0.5, 0.12, q + D * 0.5 + Y * 0.5],
            0.004,
            6,
            0.012,
          ),
          n.brass,
          {},
        ),
          a.add(
            F(
              [N + y0 * 0.5 + W * 0.5, 0.12, q + D * 0.5 + Y * 0.5],
              [N + W, 0.82, q + Y],
              0.016,
              8,
              0.034,
            ),
            o0 % 2 ? n.fabricCharcoal : n.velvetTeal,
            {},
          ),
          a.add(
            F([N + W, 0.82, q + Y], [N + W, 0.87, q + Y], 0.034, 8, 0.012),
            o0 % 2 ? n.fabricCharcoal : n.velvetTeal,
            {},
          ),
          a.add(
            P(
              [
                [N + W, 0.86, q + Y],
                [N + W * 1.05, 0.98, q + Y * 1.05],
                [N + W * 1.3, 1.03, q + Y * 1.3],
                [N + W * 1.55, 0.97, q + Y * 1.55],
              ],
              0.012,
              10,
              5,
            ),
            n.woodDark,
            {},
          ));
      }
      e.aoBlob(N, q, 0, 0.28, 0.28, 0.4);
    }
    for (let X of [-1, 1]) {
      let N = X * 9.2,
        q = 4.72;
      E(L0.vaseTall, X < 0 ? n.ceramicBlack : n.terracotta, N, 0, q);
      for (let o0 = 0; o0 < 11; o0++) {
        let h0 = o0 * 2.4 + X,
          y0 = 0.1 + 0.42 * d(),
          D = d.range(1.25, 1.9),
          W = N + Math.cos(h0) * y0,
          Y = q + Math.sin(h0) * y0;
        a.add(
          F(
            [N + Math.cos(h0) * 0.03, 0.8, q + Math.sin(h0) * 0.03],
            [W, D, Y],
            0.004,
            5,
          ),
          n.woodLight,
          {},
        );
        let R0 = x(W - N, D - 0.8, Y - q).normalize(),
          U0 = new Quaternion().setFromUnitVectors(m, R0);
        a.add(L0.plume, n.fabricCream, {
          matrix: new Matrix4().compose(
            x(W, D, Y).addScaledVector(R0, -0.12),
            U0.multiply(new Quaternion().setFromAxisAngle(m, h0)),
            x(1, d.range(0.85, 1.15), 1),
          ),
        });
      }
      (e.addCollider(N - 0.16, 0, q - 0.16, N + 0.16, 0.9, q + 0.16, "ceramic"),
        e.aoBlob(N, q, 0, 0.36, 0.36, 0.45));
    }
    {
      E(L0.vaseTall, n.ceramicWhite, 11.45, 0, 9.45, 0, 0, 0, [0.9, 0.8, 0.9]);
      for (let q = 0; q < 6; q++) {
        let o0 = q * 1.1,
          h0 = d.range(0.15, 0.4),
          y0 = d.range(1.3, 2),
          D = [
            [11.45, 0.66, 9.45],
            [
              11.45 + Math.cos(o0) * h0 * 0.3,
              1,
              9.45 + Math.sin(o0) * h0 * 0.3,
            ],
            [
              11.45 + Math.cos(o0 + 0.5) * h0 * 0.8,
              1 + (y0 - 1) * 0.6,
              9.45 + Math.sin(o0 + 0.5) * h0 * 0.8,
            ],
            [11.45 + Math.cos(o0) * h0, y0, 9.45 + Math.sin(o0) * h0],
          ];
        a.add(P(D, 0.006, 14, 5), n.woodDark, {});
        for (let W = 0; W < 7; W++) {
          let Y = 0.35 + W * 0.09,
            R0 = new CatmullRomCurve3(D.map((U0) => x(...U0))).getPoint(
              Math.min(1, Y),
            );
          E(
            A(0.02, 0),
            W % 3 ? n.paper : x0,
            R0.x + d.range(-0.03, 0.03),
            R0.y + d.range(-0.02, 0.03),
            R0.z + d.range(-0.03, 0.03),
            d() * 6,
            d(),
          );
        }
      }
      (e.addCollider(
        11.45 - 0.17,
        0,
        9.45 - 0.17,
        11.45 + 0.17,
        0.7,
        9.45 + 0.17,
        "ceramic",
      ),
        e.aoBlob(11.45, 9.45, 0, 0.32, 0.32, 0.45));
    }
    {
      let X = I(11.5, 0, 6.34, f);
      (X.add(R(0.5, 0.07, 0.6, 0.012), n.blackMetal, 0, 0.035, 0.02)
        .add(R(0.44, 0.012, 0.5, 0.004), n.steel, 0, 0.076, 0.04)
        .rod([0, 0.06, -0.24], [0, 1.02, -0.24], 0.022, n.brass, 10)
        .add(
          H(
            [
              [0, 0],
              [0.115, 0],
              [0.125, 0.01],
              [0.125, 0.045],
              [0.11, 0.05],
              [0, 0.05],
            ],
            20,
          ),
          n.brass,
          0,
          1.13,
          -0.265,
          0,
          b,
        ),
        a.add(S0(u0.dial, 0.105), _0, {
          matrix: new Matrix4().multiplyMatrices(X.base, M(0, 1.13, -0.2135)),
          keepUV: !0,
          shadow: !1,
        }));
    }
    {
      let X = I(-11.62, 0, 9.08, h),
        N = 0.8,
        q = 0.42;
      for (let y0 of [-1, 1])
        for (let D of [-1, 1])
          X.rod(
            [(y0 * N) / 2, 0.09, (D * q) / 2],
            [(y0 * N) / 2, 0.86, (D * q) / 2],
            0.011,
            n.brass,
          )
            .add(
              O(0.036, 0.012, 6, 14),
              n.rubber,
              (y0 * N) / 2,
              0.048,
              (D * q) / 2,
            )
            .add(
              C(0.02, 0.03, 8),
              n.brass,
              (y0 * N) / 2,
              0.048,
              (D * q) / 2,
              0,
              b,
            );
      for (let y0 of [0.3, 0.78]) {
        X.add(R(N - 0.02, 0.012, q - 0.02, 0.004), n.ceramicBlack, 0, y0, 0);
        for (let D of [-1, 1])
          X.rod(
            [-N / 2, y0 + 0.05, (D * q) / 2],
            [N / 2, y0 + 0.05, (D * q) / 2],
            0.007,
            n.brass,
            6,
          ).rod(
            [-N / 2, y0, (D * q) / 2],
            [N / 2, y0, (D * q) / 2],
            0.007,
            n.brass,
            6,
          );
        for (let D of [-1, 1])
          X.rod(
            [(D * N) / 2, y0 + 0.05, -q / 2],
            [(D * N) / 2, y0 + 0.05, q / 2],
            0.007,
            n.brass,
            6,
          );
      }
      X.tube(
        [
          [N / 2, 0.86, -q / 2],
          [N / 2 + 0.1, 0.9, -q / 2],
          [N / 2 + 0.1, 0.9, q / 2],
          [N / 2, 0.86, q / 2],
        ],
        0.011,
        n.brass,
        16,
        6,
      );
      let o0 = (y0, D, W) => X.pt(y0, D, W),
        h0 = o0(-0.24, 0.786, 0.02);
      (E(L0.decanter, P0, h0.x, h0.y, h0.z, 0, 0, 0, 1, v),
        E(L0.decanterFill, ot, h0.x, h0.y, h0.z),
        E(L(0.022, 8, 6), P0, h0.x, h0.y + 0.235, h0.z, 0, 0, 0, 1, v),
        (h0 = o0(0.06, 0.786, 0)),
        E(R(0.3, 0.012, 0.22, 0.004), n.brass, h0.x, h0.y + 0.006, h0.z, b));
      for (let [y0, D] of [
        [0, -0.06],
        [0, 0.06],
        [0.1, -0.05],
        [0.1, 0.07],
      ])
        ((h0 = o0(y0, 0.798, D)), pt("tumbler", h0.x, h0.y, h0.z));
      ((h0 = o0(0.3, 0.786, 0.05)),
        E(
          H(
            [
              [0, 0],
              [0.06, 0],
              [0.066, 0.008],
              [0.08, 0.14],
              [0.076, 0.14],
              [0.062, 0.012],
              [0, 0.012],
            ],
            14,
          ),
          n.chrome,
          h0.x,
          h0.y,
          h0.z,
        ));
      for (let y0 = 0; y0 < 9; y0++)
        E(
          _(0.024, 0.024, 0.024),
          st,
          h0.x + d.range(-0.04, 0.04),
          h0.y + 0.12 + d.range(0, 0.03),
          h0.z + d.range(-0.04, 0.04),
          d() * 3,
          d(),
          d(),
          1,
          v,
        );
      ([
        [-0.28, -0.1, n.bottleAmber],
        [-0.16, 0.08, n.bottleGreen],
        [-0.04, -0.08, J0],
        [0.1, 0.06, n.bottleClear],
        [0.24, -0.06, n.bottleAmber],
      ].forEach(([y0, D, W], Y) => {
        ((h0 = o0(y0, 0.306, D)),
          c0(W, h0.x, h0.y, h0.z, 0.95, Y % 2 ? n.brass : B0, Y));
      }),
        (h0 = o0(0.3, 0.306, 0.1)),
        E(L0.shaker, n.chrome, h0.x, h0.y, h0.z),
        e.addCollider(-11.84, 0, 8.66, -11.4, 0.88, 9.5, "metal"),
        e.aoBlob(-11.62, 9.08, 0, 0.36, 0.56, 0.4));
    }
    {
      let X = I(4.9, 0, -0.6, 0);
      (X.lab(u0.sheet, 0.46, (0.46 * 320) / 500, 0, 1.039, 0.4395, 0, -0.3),
        X.add(R(0.05, 0.03, 0.03, 0.006), n.brass, 0.2, 1.158, 0.392)
          .tube(
            [
              [0.2, 1.17, 0.39],
              [0.2, 1.3, 0.37],
              [0.2, 1.36, 0.45],
              [0.2, 1.34, 0.52],
            ],
            0.006,
            n.brass,
            14,
            5,
          )
          .add(
            L(1, 12, 6),
            n.brass,
            0.12,
            1.338,
            0.535,
            0,
            0,
            0,
            [0.15, 0.022, 0.03],
          )
          .add(
            _(0.24, 0.005, 0.028),
            n.bulbWarm,
            0.12,
            1.322,
            0.538,
            0,
            0,
            0,
            1,
            v,
          ),
        s.addGlow(
          X.pt(0.05, 1.04, 0.445),
          x(0, 0.296, 0.955),
          0.7,
          0.45,
          16756832,
          0.35,
        ),
        X.add(_(0.23, 0.012, 0.31), n.paper, 0.24, 0.541, 1.23, 0.25)
          .add(_(0.23, 0.014, 0.31), n.leatherTan, 0.25, 0.554, 1.23, 0.1)
          .add(_(0.22, 0.01, 0.3), n.paper, 0.24, 0.566, 1.235, -0.15));
    }
    {
      (E(R(0.3, 0.012, 0.2, 0.004), n.brass, -4.42, 0.42 + 0.006, 6.2),
        Z(-4.49, 0.42 + 0.012, 6.2, 2.4),
        Z(-4.36, 0.42 + 0.012, 6.21, 0.6, !1),
        E(
          H(
            [
              [0, 0],
              [0.018, 0],
              [0.024, 0.02],
              [0.016, 0.045],
              [0.018, 0.05],
              [0, 0.05],
            ],
            8,
          ),
          n.ceramicWhite,
          -4.42,
          0.42 + 0.012,
          6.27,
        ),
        d0(0, -4.5, 0.42, 6.52, 0.12),
        d0(1, -4.47, 0.42 + 0.0066, 6.5, -0.2),
        d0(2, -4.52, 0.42 + 0.0132, 6.53, 0.3),
        V(-4.72, 0.149, 6.35, 3, 0.1, 1.15),
        E(R(0.3, 0.1, 0.22, 0.01), n.leatherTan, -4.22, 0.199, 6.36, -0.1));
      let N = 0.418;
      (E(R(0.11, 0.03, 0.11, 0.006), n.marbleDark, 4.47, N + 0.015, 6.05),
        E(
          new TorusKnotGeometry(0.045, 0.012, 56, 7, 2, 3),
          n.brass,
          4.47,
          N + 0.1,
          6.05,
          0.4,
          0.3,
        ),
        V0(4.36, N, 6.68),
        Z(4.36, N + 0.004, 6.68, 1.2),
        V0(4.63, N, 6.7),
        pt("tumbler", 4.63, N + 0.004, 6.7, ot, !0),
        d0(3, 4.22, N, 6.14, -0.5));
    }
    (V0(-6.33, 0.558, 7.5),
      pt("highball", -6.33, 0.562, 7.5, nt, !0),
      a.add(
        F([-6.34, 0.57, 7.5], [-6.3, 0.75, 7.48], 0.003, 5),
        n.plasticBlack,
        {},
      ),
      E(R(0.072, 0.008, 0.15, 0.004), n.blackMetal, 6.34, 0.562, 7.48, 0.5),
      a.add(
        P(
          [
            [6.37, 0.562, 7.55],
            [6.46, 0.55, 7.74],
            [6.56, 0.3, 7.82],
            [6.72, 0.02, 7.9],
            [6.86, 0.008, 7.94],
          ],
          0.003,
          20,
          4,
        ),
        n.rubber,
        {},
      ),
      E(C(0.06, 0.006, 16), n.brass, 6.86, 0.003, 7.94),
      E(_(0.03, 0.022, 0.03), n.plasticWhite, 6.86, 0.017, 7.94),
      E(C(0.06, 0.006, 16), n.brass, -6.8, 0.003, 7.96),
      a.add(
        P(
          [
            [-6.45, 0.565, 7.68],
            [-6.55, 0.5, 7.82],
            [-6.7, 0.1, 7.92],
            [-6.8, 0.012, 7.96],
          ],
          0.003,
          18,
          4,
        ),
        n.rubber,
        {},
      ),
      a.add(
        k(
          [
            [-3.6, 0.495, 0],
            [-3.52, 0.6, 0],
            [-3.475, 0.69, 0],
            [-3.38, 0.705, 0],
            [-3.275, 0.69, 0],
            [-3.25, 0.52, 0],
            [-3.262, 0.3, 0],
          ].map(([X, N]) => [X, N, 7.62]),
          0.52,
          [0, 0, 1],
          0.012,
        ),
        n.fabricCream,
        {},
      ),
      E(L0.lumbar, n.velvetTeal, -4.72, 0.66, 7.6, g, -0.22),
      E(L0.lumbar, n.fabricCream, 4.3, 0.66, 7.6, g, -0.22),
      E(_(0.3, 0.01, 0.4), n.paper, 4.52, 0.476, 5.36, 0.2),
      T0(u0.news, 0.3, 0.38, 4.52, 0.4815, 5.36, 0.2, -b));
    {
      let X = I(1.83, 0, 6.3, b);
      (X.raw(
        k(
          [
            [0, 0.5, 0.13],
            [0, 0.72, 0.1],
            [0, 0.875, 0.05],
            [0, 0.89, -0.02],
            [0, 0.86, -0.1],
            [0, 0.6, -0.15],
            [0, 0.36, -0.16],
          ],
          0.46,
          [1, 0, 0],
          0.014,
        ),
        n.fabricCharcoal,
      ),
        X.raw(
          k(
            [
              [-0.3, 0.4, -0.17],
              [-0.29, 0.6, -0.16],
              [-0.25, 0.84, -0.11],
            ],
            0.13,
            [0, 0, 1],
            0.03,
          ),
          n.fabricCharcoal,
        ).raw(
          k(
            [
              [0.3, 0.44, -0.17],
              [0.29, 0.62, -0.16],
              [0.25, 0.84, -0.11],
            ],
            0.13,
            [0, 0, 1],
            0.03,
          ),
          n.fabricCharcoal,
        ));
    }
  }
  {
    for (let X of [-1.2, 2.5, 6.2])
      (r(
        i.rug({
          w: 1.3,
          d: 3,
          variant: 1,
        }),
        -10.42,
        Qt + 0.002,
        X,
        0,
      ),
        r(
          i.rug({
            w: 1.3,
            d: 3,
            variant: 0,
          }),
          10.42,
          Qt + 0.002,
          X,
          0,
        ));
    for (let X of [-4.9, -1.65, 1.65, 4.9])
      r(
        i.rug({
          w: 1.3,
          d: 3,
          variant: 2,
        }),
        X,
        Qt + 0.002,
        -6.5,
        b,
      );
    for (let X of [-1, 1]) {
      let N = X * 11.735,
        q = 4.35,
        o0 = l0(N, Qt, q, X < 0 ? b : -b, 1.2);
      r(
        i.tableLamp({
          variant: X < 0 ? 1 : 0,
        }),
        N,
        Qt + 0.8,
        q - 0.42,
        0,
        {
          fixed: !0,
          ao: !1,
        },
      );
      let h0 = x(N, Qt + 0.8, q + 0.36);
      (E(
        L0.vaseBowl,
        X < 0 ? n.ceramicWhite : n.ceramicBlack,
        h0.x,
        h0.y,
        h0.z,
      ),
        B(
          h0.x,
          h0.y + 0.2,
          h0.z,
          24,
          0.26,
          0.17,
          X < 0 ? [n.paper, x0] : [x0, n.paper, n.fabricCream],
          !0,
          0.042,
        ),
        V(N, Qt + 0.8, q - 0.02, 2, X * 0.3, 0.9),
        E(
          R(0.24, 0.2, 0.34, 0.02),
          n.leatherTan,
          N,
          Qt + 0.25,
          q + 0.1,
          X * 0.1,
        ));
    }
    {
      let X = l0(0, Qt, -7.74, 0, 3.2, 0.38);
      for (let N of [-1.3, 1.3])
        r(
          i.tableLamp({
            variant: 0,
          }),
          N,
          Qt + 0.8,
          -7.74,
          0,
          {
            fixed: !0,
            ao: !1,
          },
        );
      E(
        L0.vaseTall,
        n.ceramicBlack,
        0,
        Qt + 0.8,
        -7.74,
        0,
        0,
        0,
        [0.62, 0.5, 0.62],
      );
      for (let N = 0; N < 9; N++) {
        let q = N * 0.72,
          o0 = d.range(0.15, 0.55),
          h0 = d.range(0.55, 1.1),
          y0 = Qt + 1.2,
          D = [
            [0, y0, -7.74],
            [
              Math.cos(q) * o0 * 0.4,
              y0 + h0 * 0.5,
              -7.74 + Math.abs(Math.sin(q)) * o0 * 0.25,
            ],
            [
              Math.cos(q) * o0,
              y0 + h0,
              -7.74 + Math.abs(Math.sin(q)) * o0 * 0.45,
            ],
          ];
        a.add(P(D, 0.005, 10, 5), n.woodDark, {});
        for (let W = 0; W < 6; W++) {
          let Y = new CatmullRomCurve3(D.map((R0) => x(...R0))).getPoint(
            0.4 + W * 0.12,
          );
          E(
            A(0.028, 1),
            W % 2 ? n.paper : x0,
            Y.x + d.range(-0.04, 0.04),
            Y.y + d.range(-0.03, 0.04),
            Y.z + d.range(-0.03, 0.04),
            d() * 6,
            d(),
            0,
            [1, 0.75, 1],
          );
        }
      }
      (V(-0.62, Qt + 0.8, -7.72, 3, 0.2),
        E(L0.bowl, n.brass, 0.6, Qt + 0.8, -7.7, 0, 0, 0, 1.6),
        d0(1, -0.62, Qt + 0.8 + 0.1, -7.72, 0.3),
        s0(-6.4, Qt, -7.69, 0, 2, n.velvetTeal),
        s0(6.4, Qt, -7.69, 0, 2, n.leatherTan),
        r(
          i.cushion({
            mat: "fabricCream",
          }),
          -7.05,
          Qt + 0.47,
          -7.69,
          0.2,
        ),
        r(
          i.cushion({
            mat: "velvetTeal",
          }),
          6.95,
          Qt + 0.47,
          -7.69,
          -0.3,
        ),
        r(
          i.vase({
            variant: 0,
          }),
          0.98,
          Qt + 0.8,
          -7.72,
          0,
        ));
    }
    let U = (X, N, q, o0) => {
      let h0 = I(X, Qt + 0.013, N, q);
      h0.add(R(0.52, 0.014, 0.36, 0.005), n.brass, 0, 0.007, 0);
      for (let D of [-1, 1])
        h0.tube(
          [
            [D * 0.25, 0.012, -0.07],
            [D * 0.285, 0.04, -0.05],
            [D * 0.285, 0.04, 0.05],
            [D * 0.25, 0.012, 0.07],
          ],
          0.006,
          n.brass,
          12,
          5,
        );
      (h0
        .add(L0.plate, n.ceramicWhite, -0.1, 0.014, 0.02)
        .add(L0.cloche, n.chrome, -0.1, 0.026, 0.02),
        h0
          .add(L0.plate, n.ceramicWhite, 0.14, 0.014, -0.06, 0, 0, 0, 0.72)
          .add(z(0.1, 0.1, 0.05), n.bedLinen, 0.14, 0.04, -0.06, 0.6, b));
      let y0 = h0.pt(0.15, 0.014, 0.1);
      (pt("wine", y0.x, y0.y, y0.z, o0 ? Q0 : null),
        (y0 = h0.pt(0.05, 0.014, 0.12)),
        pt("tumbler", y0.x, y0.y, y0.z),
        h0
          .add(_(0.012, 0.003, 0.19), n.steel, 0.2, 0.016, -0.02, 0.4)
          .add(_(0.018, 0.003, 0.18), n.steel, 0.21, 0.018, -0.03, -0.3),
        (y0 = h0.pt(-0.22, 0.014, -0.12)),
        E(
          H(
            [
              [0, 0],
              [0.015, 0],
              [0.022, 0.03],
              [0.009, 0.07],
              [0.011, 0.09],
              [0, 0.09],
            ],
            8,
          ),
          n.ceramicWhite,
          y0.x,
          y0.y,
          y0.z,
        ),
        B(y0.x, y0.y + 0.09, y0.z, 1, 0.1, 0.01, [x0], !1, 0.022));
    };
    (U(-11.58, -3.42, b + 0.12, !0), U(11.56, 8.02, -b - 0.1, !1));
    for (let [X, N, q] of [
      [-1, 2.4, 0],
      [1, -2.6, 1],
      [1, 2.4, 0],
    ]) {
      let o0 = I(
        X * 11.9,
        Qt + 1.03,
        N + (X < 0 ? 0.36 : -0.36),
        X < 0 ? b : -b,
      );
      (o0
        .add(C(0.022, 0.012, 12), n.brass, 0, 0, 0.006, 0, b)
        .rod([0, 0, 0.01], [0, 0, 0.05], 0.008, n.brass, 8)
        .add(L(0.026, 10, 8), n.brass, 0, 0, 0.062, 0, 0, 0, [1, 1, 0.8]),
        q === 0
          ? o0
              .add(_(0.075, 0.19, 0.002), B0, 0, -0.085, 0.036, 0, 0, 0.06)
              .lab(u0.dnd, 0.075, 0.19, 0, -0.085, 0.0375, 0, 0, 0.06)
          : o0
              .tube(
                [
                  [0, 0, 0.045],
                  [0.03, -0.1, 0.05],
                  [0, -0.16, 0.055],
                ],
                0.003,
                n.fabricCream,
                8,
                4,
              )
              .tube(
                [
                  [0, 0, 0.045],
                  [-0.03, -0.1, 0.05],
                  [0, -0.16, 0.055],
                ],
                0.003,
                n.fabricCream,
                8,
                4,
              )
              .add(z(0.24, 0.32, 0.12), n.fabricCream, 0, -0.32, 0.07));
    }
    (r(
      i.suitcase({
        variant: 1,
      }),
      -11.52,
      Qt,
      1.45,
      1.35,
    ),
      r(
        i.suitcase({
          variant: 0,
        }),
        -11.5,
        Qt,
        0.82,
        1.7,
      ),
      r(
        i.planter({
          variant: 1,
        }),
        -11.55,
        Qt,
        9.32,
        1.1,
      ),
      r(
        i.planter({
          variant: 1,
        }),
        11.55,
        Qt,
        9.32,
        2.6,
      ));
    {
      let X = I(11.52, Qt, -5.6, -b),
        N = 0.76,
        q = 0.5;
      for (let o0 of [-1, 1])
        for (let h0 of [-1, 1])
          X.rod(
            [(o0 * N) / 2, 0.1, (h0 * q) / 2],
            [(o0 * N) / 2, 1.12, (h0 * q) / 2],
            0.012,
            n.steel,
          ).add(
            C(0.05, 0.03, 10),
            n.rubber,
            (o0 * N) / 2,
            0.05,
            (h0 * q) / 2,
            0,
            0,
            b,
          );
      for (let o0 of [0.16, 0.56, 0.96])
        X.add(R(N + 0.02, 0.022, q + 0.02, 0.006), n.plasticWhite, 0, o0, 0);
      X.add(_(N, 0.42, 0.01), n.plasticWhite, 0, 0.36, -q / 2)
        .rod([-N / 2, 1.12, q / 2], [N / 2, 1.12, q / 2], 0.012, n.steel)
        .rod([-N / 2, 1.12, -q / 2], [N / 2, 1.12, -q / 2], 0.012, n.steel);
      for (let o0 = 0; o0 < 3; o0++)
        for (let h0 = 0; h0 < 4 - (o0 % 2); h0++)
          X.add(
            R(0.2, 0.055, 0.34, 0.02),
            n.bedLinen,
            -0.24 + o0 * 0.24,
            0.2 + h0 * 0.056,
            0.02,
            d.range(-0.05, 0.05),
          );
      for (let o0 = 0; o0 < 2; o0++)
        for (let h0 = 0; h0 < 5; h0++)
          X.add(
            R(0.3, 0.05, 0.36, 0.018),
            o0 ? n.fabricCream : n.bedLinen,
            -0.18 + o0 * 0.36,
            0.598 + h0 * 0.05,
            0.02,
            d.range(-0.04, 0.04),
          );
      for (let o0 = 0; o0 < 6; o0++) {
        let h0 = -0.3 + (o0 % 3) * 0.12,
          y0 = -0.14 + Math.floor(o0 / 3) * 0.11;
        X.add(C(0.052, 0.1, 12), n.paper, h0, 1.022, y0).add(
          C(0.02, 0.102, 8),
          n.woodLight,
          h0,
          1.022,
          y0,
        );
      }
      for (let o0 = 0; o0 < 3; o0++)
        X.add(
          H(
            [
              [0, 0],
              [0.032, 0],
              [0.034, 0.12],
              [0.014, 0.16],
              [0.014, 0.19],
              [0, 0.19],
            ],
            10,
          ),
          [n.plasticWhite, P0, n.velvetTeal][o0],
          0.1 + o0 * 0.09,
          0.972,
          0.13,
          0,
          0,
          0,
          1,
          o0 === 1 ? v : {},
        ).add(
          _(0.03, 0.03, 0.07),
          n.plasticBlack,
          0.1 + o0 * 0.09,
          1.175,
          0.15,
        );
      for (let o0 = 0; o0 < 10; o0++)
        X.add(
          C(0.013, 0.06, 8),
          o0 % 2 ? n.ceramicWhite : n.bottleAmber,
          0.08 + (o0 % 5) * 0.045,
          1.002,
          -0.1 + Math.floor(o0 / 5) * 0.05,
          0,
          0,
          0,
          1,
          v,
        );
      (X.add(R(0.26, 0.09, 0.13, 0.01), n.fabricCream, 0.2, 1.017, -0.01),
        X.add(z(0.46, 0.8, 0.34), n.fabricCream, -N / 2 - 0.19, 0.62, 0, b)
          .rod(
            [-N / 2 - 0.36, 1.03, -q / 2],
            [-N / 2 - 0.36, 1.03, q / 2],
            0.01,
            n.steel,
          )
          .rod(
            [-N / 2, 1.03, -q / 2],
            [-N / 2 - 0.36, 1.03, -q / 2],
            0.01,
            n.steel,
          )
          .rod(
            [-N / 2, 1.03, q / 2],
            [-N / 2 - 0.36, 1.03, q / 2],
            0.01,
            n.steel,
          ),
        X.add(z(0.36, 0.6, 0.3), n.fabricCharcoal, N / 2 + 0.15, 0.55, 0, b),
        X.tube(
          [
            [N / 2 + 0.02, 1, -q / 2],
            [N / 2 + 0.34, 1.06, -q / 2],
            [N / 2 + 0.34, 1.06, q / 2],
            [N / 2 + 0.02, 1, q / 2],
          ],
          0.012,
          n.steel,
          14,
          6,
        ),
        X.add(_(0.2, 0.28, 0.008), n.woodDark, 0, 0.72, q / 2 + 0.02).add(
          _(0.18, 0.24, 0.002),
          n.paper,
          0,
          0.71,
          q / 2 + 0.026,
        ),
        e.addCollider(11.25, Qt, -6.24, 11.8, Qt + 1.14, -4.96, "metal"),
        e.aoBlob(11.52, -5.6, Qt, 0.4, 0.75, 0.4));
    }
  }
  {
    let X = (() => {
        let D = createRandom(77),
          W = [];
        for (let Y = 0; Y < 3; Y++)
          for (let R0 = -24.75; R0 < -16.2; R0 += D.range(0.3, 0.52))
            (D.int(0, 2), D.range(-0.04, 0.04), D());
        for (let Y = -24.4; Y < -16.5; Y += D.range(1.4, 2.4))
          (D.int(0, 2), W.push([Y, -6 + D.range(-0.15, 0.15)]), D());
        return W;
      })(),
      N = (D, W, Y) =>
        X.every(([R0, U0]) => Math.hypot(R0 - D, U0 - W) > Y + 0.075),
      q = (D, W, Y = 0.06) => {
        let R0 = D;
        for (
          let U0 = 0;
          U0 < 11 &&
          ((R0 = D + (U0 % 2 ? 1 : -1) * Math.ceil(U0 / 2) * 0.1),
          !N(R0, W, Y));
          U0++
        );
        return (X.push([R0, W]), R0);
      };
    {
      let D = q(-20.5, -6.2, 0.32),
        W = I(D, 1.1, -6.2, c);
      W.add(
        H(
          [
            [0, 0],
            [0.05, 0],
            [0.056, 0.008],
            [0.04, 0.022],
            [0.03, 0.045],
            [0.03, 0.3],
            [0.037, 0.31],
            [0.037, 0.33],
            [0, 0.33],
          ],
          16,
        ),
        n.chrome,
      ).add(R(0.58, 0.078, 0.078, 0.03, 2), n.chrome, 0, 0.362, 0);
      for (let Y = 0; Y < 4; Y++) {
        let R0 = -0.21 + Y * 0.14;
        W.rod([R0, 0.35, 0.03], [R0, 0.325, 0.088], 0.012, n.chrome)
          .rod([R0, 0.33, 0.088], [R0, 0.265, 0.094], 0.008, n.chrome)
          .rod(
            [R0, 0.395, 0.015],
            [R0, 0.54, 0.05],
            0.009,
            [n.blackMetal, n.brass, n.ceramicWhite, B0][Y],
            8,
            0.017,
          )
          .add(L(0.012, 6, 5), n.brass, R0, 0.395, 0.015);
      }
      (W.add(R(0.58, 0.02, 0.17, 0.006), n.steel, 0, 0.01, 0.105).add(
        _(0.54, 0.004, 0.13),
        n.blackMetal,
        0,
        0.0215,
        0.105,
      ),
        X.push([D - 0.22, -6.28], [D + 0.22, -6.28], [D, -6.3]));
    }
    {
      let D = q(-17.62, -6.2, 0.22);
      (I(D, 1.1, -6.2, c)
        .add(R(0.2, 0.02, 0.18, 0.006), n.blackMetal, 0, 0.01, 0)
        .rod([0, 0.02, -0.02], [0, 0.17, -0.04], 0.014, n.blackMetal)
        .add(R(0.31, 0.2, 0.02, 0.008), n.plasticBlack, 0, 0.21, -0.02, 0, -0.3)
        .lab(u0.pos, 0.285, 0.18, 0, 0.2133, -0.0095, 0, -0.3, 0, !0)
        .add(R(0.1, 0.09, 0.13, 0.01), n.plasticBlack, 0.24, 0.045, 0)
        .add(_(0.07, 0.07, 0.001), n.paper, 0.24, 0.115, 0.03, 0, -0.5),
        X.push([D - 0.24, -6.2]));
    }
    {
      let D = q(-22.5, -6.22, 0.2);
      (E(L0.shaker, n.chrome, D - 0.1, 1.1, -6.22),
        E(L0.shaker, n.brass, D + 0, 1.1, -6.26, 0, 0, 0, 0.9),
        E(L0.highball, P0, D + 0.11, 1.1, -6.2, 0, 0, 0, [1.25, 1, 1.25], v),
        a.add(
          F(
            [D + 0.11, 1.1 + 0.01, -6.2],
            [D + 0.14, 1.1 + 0.27, -6.17],
            0.0025,
            5,
          ),
          n.steel,
          {},
        ),
        E(
          L(1, 6, 4),
          n.steel,
          D + 0.141,
          1.1 + 0.275,
          -6.169,
          0,
          0,
          0,
          [0.008, 0.004, 0.012],
        ));
      for (let W of [-0.2, 0.2])
        (E(C(0.012, 0.035, 10, 0.022), n.brass, D + W, 1.1 + 0.0175, -6.1),
          E(C(0.02, 0.03, 10, 0.012), n.brass, D + W, 1.1 + 0.05, -6.1));
      X.push([D - 0.12, -6.22], [D + 0.12, -6.2]);
    }
    {
      let D = q(-19.25, -6.26, 0.24),
        W = I(D, 1.1, -6.26, c);
      W.add(R(0.42, 0.05, 0.15, 0.008), n.steel, 0, 0.025, 0).add(
        _(0.39, 0.004, 0.12),
        n.blackMetal,
        0,
        0.049,
        0,
      );
      for (let Y = 0; Y < 4; Y++)
        for (let R0 = 0; R0 < 9; R0++) {
          let U0 = -0.145 + Y * 0.097 + d.range(-0.03, 0.03),
            $0 = d.range(-0.04, 0.04);
          Y === 0
            ? W.add(
                L(1, 6, 4),
                C0,
                U0,
                0.058,
                $0,
                d() * 6,
                0,
                0,
                [0.022, 0.012, 0.013],
              )
            : Y === 1
              ? W.add(
                  L(1, 6, 4),
                  k0,
                  U0,
                  0.058,
                  $0,
                  d() * 6,
                  0,
                  0,
                  [0.02, 0.011, 0.012],
                )
              : Y === 2
                ? W.add(L(0.011, 6, 5), B0, U0, 0.06, $0)
                : W.add(
                    L(1, 5, 3),
                    n.foliage,
                    U0,
                    0.056,
                    $0,
                    d() * 6,
                    0.3,
                    0,
                    [0.02, 0.003, 0.012],
                  );
        }
      X.push([D - 0.15, -6.26], [D + 0.15, -6.26]);
    }
    {
      let D = q(-18.75, -6.22, 0.3);
      E(R(0.5, 0.008, 0.26, 0.003), n.rubber, D, 1.1 + 0.004, -6.22);
      for (let Y = 0; Y < 2; Y++)
        for (let R0 = 0; R0 < 5; R0++)
          E(
            L0.tumblerLo,
            P0,
            D - 0.19 + R0 * 0.094,
            1.1 + 0.098,
            -6.27 + Y * 0.1,
            0,
            g,
            0,
            1,
            v,
          );
      X.push([D - 0.2, -6.22], [D + 0.2, -6.22]);
      let W = q(-21.55, -6.3, 0.14);
      (E(R(0.2, 0.026, 0.12, 0.01), n.bedLinen, W, 1.1 + 0.013, -6.3, 0.1),
        E(_(0.2, 0.027, 0.014), B0, W, 1.1 + 0.0132, -6.3, 0.1));
    }
    {
      let D = q(-23.55, -5.84, 0.16),
        W = I(D, 1.1, -5.84, 0.5);
      W.add(
        H(
          [
            [0, 0],
            [0.074, 0],
            [0.084, 0.01],
            [0.1, 0.18],
            [0.096, 0.18],
            [0.081, 0.014],
            [0, 0.014],
          ],
          8,
        ),
        P0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        v,
      );
      for (let Y = 0; Y < 16; Y++)
        W.add(
          _(0.026, 0.026, 0.026),
          st,
          d.range(-0.055, 0.055),
          0.03 + d() * 0.15,
          d.range(-0.055, 0.055),
          d() * 3,
          d(),
          d(),
          1,
          v,
        );
      W.add(L0.bottle, J0, 0.01, 0.03, -0.02, 0, 0.3).add(
        C(0.0175, 0.09, 8),
        n.brass,
        0.01,
        0.03 + 0.265 * 0.955,
        -0.02 + 0.265 * 0.2955,
        0,
        0.3,
      );
    }
    {
      let D = q(-21.3, -5.64, 0.14),
        W = I(D, 1.1, -5.64, l);
      W.add(R(0.25, 0.1, 0.11, 0.008), n.plasticBlack, 0, 0.05, 0);
      for (let Y = 0; Y < 6; Y++)
        W.add(
          _(0.105, 0.012, 0.095),
          n.bedLinen,
          -0.06,
          0.106 + Y * 0.012,
          0,
          0.03 * Y,
        );
      for (let Y = 0; Y < 9; Y++)
        W.rod(
          [0.05 + (Y % 3) * 0.02, 0.08, -0.02 + Math.floor(Y / 3) * 0.02],
          [
            0.05 + (Y % 3) * 0.02 + d.range(-0.02, 0.02),
            0.25,
            -0.02 + Math.floor(Y / 3) * 0.02 + d.range(-0.02, 0.02),
          ],
          0.003,
          [n.plasticBlack, B0, n.paper][Y % 3],
          5,
        );
    }
    for (let D of [-22.65, -18.3])
      E(R(0.46, 0.01, 0.1, 0.004), n.rubber, D, 1.1 + 0.005, -5.555);
    for (let D of [-24.35, -22, -19.05, -16.75])
      r0(q(D, -5.8, 0.05), 1.1, -5.8, 0.28);
    {
      let D = q(-22.95, -5.68);
      (V0(D, 1.1, -5.68),
        pt("tumbler", D, 1.1 + 0.004, -5.68, ot, !0),
        (D = q(-18.2, -5.7)),
        V0(D, 1.1, -5.7),
        pt("coupe", D, 1.1 + 0.004, -5.7, nt),
        (D = q(-20.9, -5.66)),
        V0(D, 1.1, -5.66),
        pt("highball", D, 1.1 + 0.004, -5.66, nt, !0),
        a.add(
          F([D, 1.1 + 0.02, -5.66], [D + 0.03, 1.1 + 0.2, -5.64], 0.003, 5),
          n.plasticBlack,
          {},
        ),
        E(
          L(1, 6, 4),
          k0,
          D - 0.028,
          1.1 + 0.15,
          -5.66,
          0.4,
          0,
          0,
          [0.006, 0.02, 0.02],
        ),
        (D = q(-24.05, -5.7)),
        pt("wine", D, 1.1, -5.7, Q0),
        (D = q(-17.3, -5.72)),
        pt("tumbler", D, 1.1, -5.72),
        E(z(0.08, 0.08, 0.04), n.bedLinen, D + 0.11, 1.1 + 0.02, -5.7, 0.6, b));
    }
    let o0 = (D, W, Y) => {
      I(D, 1.1, W, Y)
        .add(_(0.1, 0.13, 0.002), n.paper, 0, 0.063, 0.017, 0, -0.26)
        .lab(u0.cocktails, 0.1, 0.127, 0, 0.0633, 0.0184, 0, -0.26)
        .add(_(0.1, 0.13, 0.002), n.paper, 0, 0.063, -0.017, 0, 0.26)
        .lab(u0.cocktails, 0.1, 0.127, 0, 0.0633, -0.0184, g, -0.26);
    };
    (o0(q(-17.85, -5.95), -5.95, 0.2),
      o0(q(-23.2, -5.98), -5.98, -0.2),
      o0(q(-20.1, -5.92), -5.92, 0.1));
    for (let D of [-19.7, -24.6]) {
      let W = q(D, -5.72, 0.07);
      E(L0.bowl, n.brass, W, 1.1, -5.72);
      for (let Y = 0; Y < 12; Y++)
        E(
          L(1, 5, 4),
          n.woodLight,
          W + d.range(-0.035, 0.035),
          1.1 + 0.016 + d() * 0.014,
          -5.72 + d.range(-0.035, 0.035),
          d() * 6,
          d(),
          0,
          [0.011, 0.007, 0.008],
        );
    }
    {
      let D = q(-16.25, -5.95, 0.14);
      for (let W = 0; W < 4; W++)
        E(
          R(0.17, 0.012, 0.25, 0.004),
          W % 2 ? n.leatherBlack : n.leatherTan,
          D,
          1.1 + 0.006 + W * 0.012,
          -5.95,
          0.08 * W - 0.1,
        );
    }
    for (let D = -24.7; D < -16.1; D += 1.07)
      (a.add(F([D, 0, -5.56], [D, 0.2, -5.56], 0.012, 8), n.brass, {}),
        a.add(F([D, 0.2, -5.56], [D, 0.22, -5.5], 0.01, 8), n.brass, {}),
        E(C(0.03, 0.008, 12), n.brass, D, 0.004, -5.56),
        a.add(
          P(
            [
              [D + 0.5, 0.96, -5.6],
              [D + 0.5, 0.91, -5.585],
              [D + 0.5, 0.9, -5.55],
              [D + 0.5, 0.93, -5.535],
            ],
            0.004,
            8,
            4,
          ),
          n.brass,
          {},
        ));
    (u(-23, 0.6, -6.44, -18.5, 0.612, -6.3, n.steel),
      u(-23, 0.6, -6.44, -18.5, 0.73, -6.432, n.steel));
    for (let D of [-23, -18.508])
      u(D, 0.6, -6.44, D + 0.008, 0.73, -6.3, n.steel);
    {
      let D = 0;
      for (let W = -22.9; W < -18.55; W += 0.168, D++) {
        let Y = [n.bottleAmber, n.bottleClear, n.bottleGreen, J0][D % 4];
        (E(
          L0.bottleLo,
          Y,
          W,
          0.612,
          -6.37,
          d() * 6,
          0,
          0,
          0.98,
          Y.transparent ? v : {},
        ),
          E(
            C(0.004, 0.05, 5, 0.0025),
            n.chrome,
            W + 0.008,
            0.612 + 0.33,
            -6.37,
            0,
            0,
            -0.5,
          ),
          D % 3 === 0 &&
            E(
              new CylinderGeometry(
                0.0368,
                0.0368,
                0.08,
                8,
                1,
                !0,
                d() * 6,
                2.4,
              ),
              n.paper,
              W,
              0.7,
              -6.37,
            ));
      }
    }
    (a.bbox(-24.62, 0.48, -6.64, -23.74, 0.96, -6.3, n.steel, {
      r: 0.008,
      seg: 1,
    }),
      u(-24.58, 0.95, -6.61, -23.78, 0.962, -6.44, n.blackMetal));
    for (let D = 0; D < 46; D++)
      E(
        _(0.028, 0.028, 0.028),
        st,
        d.range(-24.56, -23.8),
        0.965 + d() * 0.05,
        d.range(-6.6, -6.46),
        d() * 3,
        d(),
        d(),
        1,
        v,
      );
    (E(
      H(
        [
          [0, 0],
          [0.04, 0],
          [0.05, 0.06],
          [0.048, 0.06],
          [0.038, 0.004],
          [0, 0.004],
        ],
        8,
      ),
      n.steel,
      -24,
      1,
      -6.52,
      0.4,
      0,
      0.9,
    ),
      a.add(F([-24, 1.02, -6.52], [-23.86, 1.1, -6.56], 0.008, 6), n.steel, {}),
      a.bbox(-17.95, 0.48, -6.62, -17.05, 0.93, -6.3, n.steel, {
        r: 0.008,
        seg: 1,
      }),
      u(-17.9, 0.92, -6.59, -17.1, 0.932, -6.45, n.blackMetal),
      a.add(
        P(
          [
            [-17.5, 1.1, -6.35],
            [-17.5, 1.1 + 0.26, -6.35],
            [-17.5, 1.1 + 0.34, -6.42],
            [-17.5, 1.1 + 0.3, -6.52],
            [-17.5, 1.1 + 0.24, -6.54],
          ],
          0.011,
          22,
          8,
        ),
        n.chrome,
        {},
      ),
      E(C(0.022, 0.03, 12), n.chrome, -17.5, 1.1 + 0.015, -6.35),
      a.add(
        F([-17.44, 1.1 + 0.03, -6.35], [-17.38, 1.1 + 0.09, -6.35], 0.006, 6),
        n.chrome,
        {},
      ),
      X.push([-17.5, -6.35]));
    for (let D of [-23.2, -20.5, -17.8]) {
      let W = I(D, 0, -7.3, l),
        Y = 1.5;
      (W.add(_(Y - 0.02, 0.78, 0.004), v0, 0, 0.51, 0.004, 0, 0, 0, 1, v),
        W.add(R(Y + 0.04, 0.04, 0.13, 0.006), n.steel, 0, 0.92, 0.065)
          .add(R(Y + 0.04, 0.04, 0.13, 0.006), n.steel, 0, 0.1, 0.065)
          .add(R(0.03, 0.8, 0.12, 0.004), n.steel, 0, 0.51, 0.06));
      for (let R0 of [-1, 1])
        W.add(R(0.04, 0.86, 0.13, 0.006), n.steel, R0 * (Y / 2), 0.51, 0.065);
      W.add(_(Y - 0.04, 0.008, 0.1), n.steel, 0, 0.505, 0.06);
      for (let R0 of [0.122, 0.51])
        for (let U0 = 0; U0 < 12; U0++) {
          let $0 = -Y / 2 + 0.085 + U0 * 0.121 + (U0 > 5, 0),
            g0 = [ot, J0, ot, J0][(U0 + (R0 > 0.3 ? 1 : 0)) % 4];
          Math.abs($0) < 0.035 ||
            W.add(
              L0.bottleLo,
              g0,
              $0,
              R0,
              0.062,
              0,
              0,
              0,
              [0.82, 0.86, 0.82],
            ).add(
              C(0.013, 0.012, 6),
              U0 % 2 ? n.brass : B0,
              $0,
              R0 + 0.27,
              0.062,
            );
        }
      for (let R0 of [-1, 1])
        W.add(
          _(Y / 2 - 0.035, 0.77, 0.008),
          P0,
          R0 * (Y / 4 + 0.005),
          0.51,
          0.122,
          0,
          0,
          0,
          1,
          v,
        ).rod(
          [R0 * 0.05, 0.3, 0.14],
          [R0 * 0.05, 0.72, 0.14],
          0.008,
          n.chrome,
          6,
        );
      s.addGlow(x(D, 0.003, -6.86), m, 1.7, 0.85, 13625599, 0.22);
    }
    for (let [D, W] of [
      [-25, -23.97],
      [-22.43, -21.27],
      [-19.73, -18.57],
      [-17.03, -16],
    ])
      for (let Y = 0; Y < 3; Y++) {
        let R0 = 0.1 + Y * 0.28;
        (a.bbox(D + 0.02, R0, -7.302, W - 0.02, R0 + 0.26, -7.286, n.woodDark, {
          r: 0.004,
          seg: 1,
        }),
          u(
            (D + W) / 2 - 0.09,
            R0 + 0.12,
            -7.286,
            (D + W) / 2 + 0.09,
            R0 + 0.136,
            -7.27,
            n.brass,
          ));
      }
    let h0 = 0.99,
      y0 = (D, W, Y, R0, U0, $0, g0, G0) => {
        for (let K0 = 0; K0 < R0; K0++)
          for (let it = 0; it < Y; it++)
            E(
              L0[D],
              P0,
              W + it * U0 + (K0 % 2) * U0 * 0.5,
              h0 + (g0 ? G0 + 0.006 : 0.006),
              -7.72 + K0 * $0,
              d() * 6,
              g0 ? g : 0,
              0,
              1,
              v,
            );
      };
    for (let [D, W] of [
      [-24.76, -23.72],
      [-23.6, -22.78],
      [-22.66, -21.66],
      [-21.52, -20.46],
    ])
      E(R(W - D, 0.006, 0.34, 0.002), n.rubber, (D + W) / 2, h0 + 0.003, -7.6);
    (y0("tumblerLo", -24.7, 11, 3, 0.092, 0.095, !0, 0.09),
      y0("highballLo", -23.55, 10, 3, 0.078, 0.085, !0, 0.145),
      y0("wineLo", -22.6, 9, 3, 0.105, 0.105, !1, 0),
      y0("coupeLo", -21.45, 8, 2, 0.122, 0.13, !1, 0));
    {
      [
        [-20.2, nt],
        [-20.02, Q0],
        [-19.84, null],
      ].forEach(([D, W]) => {
        (E(L0.jug, P0, D, h0, -7.62, 0, 0, 0, 1, v),
          W && E(C(0.058, 0.15, 12, 0.061), W, D, h0 + 0.09, -7.62));
      });
      for (let D = 0; D < 7; D++) {
        let W = -19.6 + D * 0.062,
          Y = 0.42 + (D % 3) * 0.05;
        (E(
          L0.bottleLo,
          D % 2 ? n.bottleAmber : J0,
          W,
          h0,
          -7.7,
          0,
          0,
          0,
          Y,
          D % 2 ? v : {},
        ),
          E(
            new CylinderGeometry(
              0.0375 * Y,
              0.0375 * Y,
              0.07 * Y,
              8,
              1,
              !0,
              0.6,
              2.6,
            ),
            n.paper,
            W,
            h0 + 0.1 * Y,
            -7.7,
          ),
          E(
            C(0.017 * Y, 0.03 * Y, 6),
            D % 2 ? n.plasticBlack : B0,
            W,
            h0 + 0.31 * Y,
            -7.7,
          ));
      }
      E(L0.bowl, n.woodDark, -18.98, h0, -7.6, 0, 0, 0, 2.6);
      for (let D = 0; D < 9; D++)
        E(
          L(0.034, 8, 6),
          [C0, k0, nt][D % 3],
          -18.98 + d.range(-0.09, 0.09),
          h0 + 0.06 + (D > 5 ? 0.045 : 0) + d() * 0.01,
          -7.6 + d.range(-0.09, 0.09),
        );
      (V(-18.62, h0, -7.62, 4, 0.1, 0.9),
        E(
          H(
            [
              [0, 0],
              [0.04, 0],
              [0.042, 0.12],
              [0.039, 0.12],
              [0.038, 0.008],
              [0, 0.008],
            ],
            10,
          ),
          n.steel,
          -18.34,
          h0,
          -7.66,
        ));
      for (let D = 0; D < 5; D++)
        a.add(
          F(
            [
              -18.34 + d.range(-0.02, 0.02),
              h0 + 0.01,
              -7.66 + d.range(-0.02, 0.02),
            ],
            [
              -18.34 + d.range(-0.05, 0.05),
              h0 + 0.3,
              -7.66 + d.range(-0.05, 0.05),
            ],
            0.0028,
            5,
          ),
          D % 2 ? n.steel : n.brass,
          {},
        );
    }
    {
      let D = I(-16.8, h0, -7.6, l);
      D.add(R(0.54, 0.3, 0.4, 0.02, 2), n.steel, 0, 0.19, 0)
        .add(R(0.56, 0.03, 0.44, 0.008), n.blackMetal, 0, 0.02, 0.01)
        .add(R(0.5, 0.012, 0.36, 0.004), n.blackMetal, 0, 0.346, 0)
        .add(R(0.5, 0.025, 0.16, 0.006), n.steel, 0, 0.05, 0.25)
        .add(_(0.46, 0.003, 0.13), n.blackMetal, 0, 0.064, 0.25);
      for (let Y of [-0.13, 0.13])
        D.add(C(0.034, 0.05, 12), n.chrome, Y, 0.2, 0.22)
          .add(C(0.036, 0.022, 12), n.chrome, Y, 0.164, 0.22)
          .rod(
            [Y, 0.164, 0.25],
            [Y + 0.02, 0.15, 0.38],
            0.011,
            n.plasticBlack,
            8,
          )
          .add(C(0.026, 0.004, 10), n.paper, Y, 0.3, 0.202, 0, b)
          .add(L0.cup, n.ceramicWhite, Y, 0.066, 0.24, 0, 0, 0, 0.72);
      for (let Y of [-1, 1])
        D.tube(
          [
            [Y * 0.24, 0.26, 0.2],
            [Y * 0.26, 0.24, 0.27],
            [Y * 0.265, 0.12, 0.3],
          ],
          0.006,
          n.chrome,
          10,
          5,
        );
      for (let Y = 0; Y < 5; Y++)
        D.add(
          L(0.007, 5, 4),
          Y === 1 ? n.bulbWarm : n.bulbCool,
          -0.08 + Y * 0.04,
          0.3,
          0.203,
        );
      for (let Y = 0; Y < 8; Y++)
        D.add(
          L0.cup,
          n.ceramicWhite,
          -0.19 + (Y % 4) * 0.125,
          0.353 + (Y > 3 ? 0.03 : 0),
          -0.06 + (Y > 3 ? 0.02 : 0),
          0,
          g * (Y > 3, 0),
          0,
          0.7,
        );
      I(-17.44, h0, -7.58, l)
        .add(R(0.16, 0.22, 0.2, 0.02), n.blackMetal, 0, 0.11, 0)
        .add(
          H(
            [
              [0.035, 0],
              [0.075, 0.12],
              [0.075, 0.13],
              [0.072, 0.13],
              [0.033, 0.006],
            ],
            12,
          ),
          P0,
          0,
          0.22,
          0,
          0,
          0,
          0,
          1,
          v,
        )
        .add(
          H(
            [
              [0, 0],
              [0.032, 0.004],
              [0.066, 0.1],
              [0, 0.085],
            ],
            10,
          ),
          O0,
          0,
          0.222,
          0,
        )
        .add(C(0.077, 0.012, 12), n.blackMetal, 0, 0.356, 0)
        .rod([0, 0.14, 0.1], [0, 0.1, 0.16], 0.014, n.steel, 8)
        .add(R(0.13, 0.07, 0.13, 0.01), n.steel, 0.2, 0.035, 0.02)
        .add(C(0.028, 0.02, 12), n.steel, -0.16, 0.01, 0.04)
        .rod([-0.16, 0.02, 0.04], [-0.16, 0.085, 0.04], 0.012, n.woodDark, 8);
    }
    {
      for (let $0 of [-6.86 - 0.21, -6.86 + 0.21]) {
        a.add(
          F(
            [-23 - 0.06, 2.44 + 0.022, $0],
            [-18 + 0.06, 2.44 + 0.022, $0],
            0.012,
            8,
          ),
          n.brass,
          {},
        );
        for (let g0 = -23; g0 <= -18 + 0.01; g0 += 1.25)
          a.add(
            F([g0, 2.44 + 0.022, $0], [g0, Ye - 0.04, $0], 0.007, 6),
            n.brass,
            {},
          );
      }
      for (let $0 of [-23 - 0.06, -18 + 0.06])
        a.add(
          F(
            [$0, 2.44 + 0.022, -6.86 - 0.21],
            [$0, 2.44 + 0.022, -6.86 + 0.21],
            0.012,
            8,
          ),
          n.brass,
          {},
        );
      let U0 = 0;
      for (let $0 = -23 + 0.056; $0 < -18; $0 += 0.112, U0++) {
        for (let g0 of [-0.021, 0.021])
          a.add(
            F(
              [$0 + g0, 2.44, -6.86 - 0.21],
              [$0 + g0, 2.44, -6.86 + 0.21],
              0.0035,
              4,
            ),
            n.brass,
            {},
          );
        for (let g0 = 0; g0 < 4; g0++)
          E(
            U0 % 3 === 2 ? L0.coupeLo : L0.wineLo,
            P0,
            $0,
            2.44 + 0.006,
            -6.86 - 0.155 + g0 * 0.103,
            d() * 6,
            g,
            0,
            1,
            v,
          );
      }
    }
    {
      let D = I(-12.1, 1.74, -2.25, f);
      D.add(R(1, 1.3, 0.03, 0.008), n.brass, 0, 0, 0.015).lab(
        u0.menuBar,
        0.93,
        (0.93 * 560) / 420,
        0,
        0,
        0.0312,
      );
      for (let W of [-0.3, 0.3])
        D.rod([W, 0.66, 0.02], [W, 0.78, 0.14], 0.006, n.brass, 6);
      (D.add(C(0.022, 0.72, 10), n.brass, 0, 0.785, 0.15, 0, 0, b).add(
        _(0.66, 0.006, 0.02),
        n.bulbWarm,
        0,
        0.765,
        0.15,
        0,
        0,
        0,
        1,
        v,
      ),
        s.addGlow(
          x(-12.135, 1.8, -2.25),
          x(-1, 0, 0),
          1.5,
          1.7,
          16756832,
          0.3,
        ));
    }
    E0(u0.way.RESTAURANT, 1.25, -13.85, 2.64, -7.9, l);
    {
      (r0(-25.2, 0.418, 1.9, 0.3),
        V0(-25.02, 0.418, 2.12),
        pt("coupe", -25.02, 0.418 + 0.004, 2.12, nt),
        V0(-25.38, 0.418, 1.72),
        pt("tumbler", -25.38, 0.418 + 0.004, 1.72, ot, !0),
        E(L0.bowl, n.ceramicBlack, -25, 0.418, 1.66));
      for (let W = 0; W < 10; W++)
        E(
          L(0.009, 5, 4),
          k0,
          -25 + d.range(-0.03, 0.03),
          0.418 + 0.016 + d() * 0.012,
          1.66 + d.range(-0.03, 0.03),
        );
      (E(
        R(0.072, 0.008, 0.15, 0.004),
        n.blackMetal,
        -25.42,
        0.418 + 0.004,
        2.1,
        0.7,
      ),
        c0(J0, -25.2, 0.418, 6.56, 1, B0, 1),
        pt("wine", -25, 0.418, 6.78, Q0),
        pt("wine", -25.42, 0.418, 6.46, Q0),
        b0(-25.12, 0.418, 6.34),
        E(z(0.09, 0.09, 0.04), n.bedLinen, -25.45, 0.418 + 0.02, 6.84, 0.4, b));
      for (let [W, Y, R0, U0] of [
        [-27, 3.12, n.paper, 0.2],
        [-26.72, 3.2, n.fabricCharcoal, -0.3],
      ]) {
        let $0 = I(W, 0, Y, U0);
        $0.add(R(0.3, 0.36, 0.12, 0.006), R0, 0, 0.18, 0);
        for (let g0 of [-0.05, 0.05])
          $0.tube(
            [
              [-0.08, 0.36, g0],
              [-0.06, 0.47, g0],
              [0.06, 0.47, g0],
              [0.08, 0.36, g0],
            ],
            0.004,
            n.brass,
            10,
            4,
          );
      }
      (E(L0.lumbar, n.fabricCream, -26.72, 0.64, 1.9, b, -0.2),
        E(L0.lumbar, n.leatherTan, -26.72, 0.64, 6.6, b, -0.2));
    }
    {
      let D = I(-27.9, 0, -2.6, b),
        W = 2.6,
        Y = 0.34,
        R0 = 2.44;
      D.add(_(W, R0, 0.02), n.walnut, 0, R0 / 2, 0.01)
        .add(R(W + 0.06, 0.04, Y + 0.012, 0.006), n.walnut, 0, R0 - 0.02, Y / 2)
        .add(_(W - 0.04, 0.08, Y - 0.04), n.blackMetal, 0, 0.04, Y / 2);
      for (let g0 of [-W / 2, -W / 6, W / 6, W / 2])
        D.add(R(0.03, R0 - 0.08, Y, 0.004), n.walnut, g0, R0 / 2 + 0.02, Y / 2);
      let U0 = [0.08, 0.5, 0.92, 1.34, 1.76, 2.1];
      for (let g0 of U0)
        D.add(R(W, 0.03, Y, 0.004), n.walnut, 0, g0 + 0.015, Y / 2);
      let $0 = W / 3 - 0.05;
      for (let g0 = 0; g0 < 5; g0++)
        for (let G0 = 0; G0 < 3; G0++) {
          let K0 = (G0 - 1) * (W / 3),
            it = U0[g0] + 0.03,
            ft = (U0[g0 + 1] || R0 - 0.04) - U0[g0] - 0.03;
          if (g0 === 2 && G0 === 1)
            D.add(R(0.46, 0.09, 0.3, 0.008), n.walnut, K0, it + 0.045, 0.17)
              .add(
                C(0.142, 0.016, 28),
                n.blackMetal,
                K0 - 0.04,
                it + 0.098,
                0.17,
              )
              .add(
                C(0.138, 0.004, 28),
                n.ceramicBlack,
                K0 - 0.04,
                it + 0.108,
                0.17,
              )
              .add(C(0.046, 0.005, 16), B0, K0 - 0.04, it + 0.109, 0.17)
              .add(C(0.016, 0.03, 10), n.brass, K0 + 0.17, it + 0.105, 0.07)
              .rod(
                [K0 + 0.17, it + 0.125, 0.07],
                [K0 + 0.04, it + 0.118, 0.24],
                0.0045,
                n.steel,
                6,
              )
              .add(
                _(0.03, 0.012, 0.02),
                n.blackMetal,
                K0 + 0.04,
                it + 0.116,
                0.245,
                0.6,
              );
          else if (g0 === 3 && G0 === 1) {
            D.add(
              R(0.44, 0.14, 0.28, 0.008),
              n.blackMetal,
              K0,
              it + 0.07,
              0.17,
            ).add(_(0.4, 0.1, 0.004), n.brass, K0, it + 0.07, 0.312);
            for (let gt of [-0.1, 0.1])
              D.add(
                _(0.1, 0.05, 0.002),
                n.lampShade,
                K0 + gt,
                it + 0.082,
                0.3145,
                0,
                0,
                0,
                1,
                v,
              ).rod(
                [K0 + gt - 0.02, it + 0.062, 0.316],
                [K0 + gt + 0.012, it + 0.1, 0.316],
                0.0016,
                n.blackMetal,
                4,
              );
            for (let gt = 0; gt < 4; gt++)
              D.add(
                C(0.011, 0.014, 10),
                n.brass,
                K0 - 0.15 + gt * 0.1,
                it + 0.03,
                0.318,
                0,
                b,
              );
            for (let gt = 0; gt < 4; gt++)
              D.add(
                C(0.016, 0.07, 8),
                P0,
                K0 - 0.12 + gt * 0.08,
                it + 0.175,
                0.1,
                0,
                0,
                0,
                1,
                v,
              ).add(
                C(0.004, 0.05, 5),
                n.bulbWarm,
                K0 - 0.12 + gt * 0.08,
                it + 0.17,
                0.1,
                0,
                0,
                0,
                1,
                v,
              );
            s.addGlow(
              D.pt(K0, it + 0.07, 0.36),
              D.dir(0, 0, 1),
              0.7,
              0.4,
              16752704,
              0.25,
            );
          } else if (g0 === 4)
            for (let gt = 0; gt < 2; gt++) {
              let rt = (G0 * 2 + gt) % 6,
                dt = K0 - 0.19 + gt * 0.38;
              D.add(
                _(0.31, 0.31, 0.01),
                n.paper,
                dt,
                it + 0.158,
                0.2,
                0,
                -0.12,
              ).lab(
                u0.records[rt],
                0.305,
                0.305,
                dt,
                it + 0.1585,
                0.2056,
                0,
                -0.12,
              );
            }
          else if (g0 === 3)
            (D.add(
              _($0 * 0.62, ft - 0.05, 0.2),
              n.woodDark,
              K0 - $0 * 0.19,
              it + (ft - 0.05) / 2,
              0.19,
            ).lab(
              u0.spines[0],
              $0 * 0.62,
              ft - 0.05,
              K0 - $0 * 0.19,
              it + (ft - 0.05) / 2,
              0.2915,
            ),
              D.add(
                R(0.22, 0.34, 0.24, 0.01),
                n.woodDark,
                K0 + $0 * 0.33,
                it + 0.17,
                0.2,
              )
                .add(
                  _(0.19, 0.31, 0.004),
                  n.fabricCharcoal,
                  K0 + $0 * 0.33,
                  it + 0.17,
                  0.322,
                )
                .add(
                  O(0.06, 0.006, 5, 18),
                  n.brass,
                  K0 + $0 * 0.33,
                  it + 0.12,
                  0.325,
                )
                .add(
                  O(0.025, 0.004, 5, 14),
                  n.brass,
                  K0 + $0 * 0.33,
                  it + 0.26,
                  0.325,
                ));
          else {
            let gt = Math.min(ft - 0.04, 0.32),
              rt = $0 * (g0 === 2 ? 0.7 : 1);
            (D.add(
              _(rt, gt, 0.3),
              n.ceramicBlack,
              K0 - ($0 - rt) / 2,
              it + gt / 2,
              0.165,
            ).lab(
              u0.spines[1],
              rt,
              gt,
              K0 - ($0 - rt) / 2,
              it + gt / 2,
              0.3165,
            ),
              g0 === 2 &&
                D.add(
                  _(0.012, gt, 0.3),
                  n.paper,
                  K0 + rt / 2 - ($0 - rt) / 2 + 0.05,
                  it + gt / 2 - 0.01,
                  0.165,
                  0,
                  0,
                  -0.28,
                ));
          }
        }
      (e.addCollider(-27.9, 0, -3.93, -27.55, R0, -1.27, "wood"),
        e.aoBlob(-27.7, -2.6, 0, 0.45, 1.5, 0.4));
    }
    {
      (a.bbox(-18.6, 1.02, 9.56, -16.2, 1.06, 9.9, n.walnut, {
        r: 0.008,
        seg: 1,
      }),
        u(-18.6, 1.008, 9.556, -16.2, 1.02, 9.562, n.brass));
      for (let D of [-18.4, -17.4, -16.4])
        (a.add(F([D, 1.02, 9.6], [D, 0.72, 9.89], 0.012, 8), n.brass, {}),
          u(D - 0.02, 0.7, 9.88, D + 0.02, 1.02, 9.9, n.brass));
      (r0(-17.4, 1.06, 9.74, 0.25),
        r(
          i.vase({
            variant: 1,
          }),
          -16.42,
          1.06,
          9.74,
          0,
        ),
        V0(-17.95, 1.06, 9.72),
        pt("highball", -17.95, 1.064, 9.72, nt, !0),
        V0(-16.8, 1.06, 9.7),
        pt("tumbler", -16.8, 1.064, 9.7, ot),
        r(i.barStool(), -17.95, 0, 9.24, 0.4),
        r(i.barStool(), -16.85, 0, 9.28, -0.3));
    }
    {
      let D = I(-12.55, 0, 7.15, 0);
      D.add(
        H(
          [
            [0, 0],
            [0.19, 0],
            [0.2, 0.012],
            [0.17, 0.025],
            [0.04, 0.05],
            [0.02, 0.09],
          ],
          18,
        ),
        n.brass,
      )
        .rod([0, 0.08, 0], [0, 1.78, 0], 0.016, n.brass, 10)
        .add(L(0.028, 10, 8), n.brass, 0, 1.8, 0);
      for (let W = 0; W < 4; W++) {
        let Y = W * b + 0.4;
        D.tube(
          [
            [0, 1.66, 0],
            [Math.cos(Y) * 0.1, 1.7, Math.sin(Y) * 0.1],
            [Math.cos(Y) * 0.16, 1.76, Math.sin(Y) * 0.16],
          ],
          0.008,
          n.brass,
          8,
          5,
        );
      }
      (D.add(
        z(0.46, 1, 0.2),
        n.fabricCharcoal,
        -0.12,
        1.2,
        0.12,
        -0.8,
        0,
        0.04,
      ).add(z(0.4, 0.86, 0.16), n.leatherTan, 0.14, 1.26, -0.1, 2.2, 0, -0.05),
        D.add(
          H(
            [
              [0, 0],
              [0.15, 0],
              [0.155, 0.006],
              [0.09, 0.014],
              [0.085, 0.09],
              [0.07, 0.105],
              [0, 0.11],
            ],
            16,
          ),
          n.fabricCream,
          0.1,
          1.78,
          0.11,
          0,
          0.5,
          0.2,
        ),
        e.addCollider(-12.72, 0, 6.98, -12.38, 1.8, 7.32, "metal"),
        e.aoBlob(-12.55, 7.15, 0, 0.36, 0.36, 0.4));
    }
  }
  {
    ([
      [-20.8, -16],
      [-20.6, -10.6],
      [-14.2, -16.1],
      [-26, -14.8],
      [-16.4, -10.5],
    ].forEach(([N, q], o0) => {
      for (let Y = 0; Y < 4; Y++) {
        let R0 = (Y / 4) * TAU + g / 4,
          U0 = Math.sin(R0),
          $0 = Math.cos(R0),
          g0 = Math.cos(R0),
          G0 = -Math.sin(R0),
          K0 = Math.atan2(U0, $0),
          it = N + U0 * 0.3844,
          ft = q + $0 * 0.3844,
          gt = (tt, X0) => [it + g0 * tt - U0 * X0, ft + G0 * tt - $0 * X0];
        E(
          new ConeGeometry(0.052, 0.105, 4, 1),
          n.bedLinen,
          it,
          0.752 + 0.058,
          ft,
          K0 + g / 4,
          0,
          0,
          [1, 1, 0.5],
        );
        let [rt, dt] = gt(-0.168, 0);
        (E(
          _(0.01, 0.003, 0.13),
          n.steel,
          rt + U0 * 0.035,
          0.752 + 0.002,
          dt + $0 * 0.035,
          K0,
        ),
          E(
            _(0.023, 0.003, 0.058),
            n.steel,
            rt - U0 * 0.058,
            0.752 + 0.002,
            dt - $0 * 0.058,
            K0,
          ),
          ([rt, dt] = gt(-0.205, 0)),
          E(
            _(0.009, 0.003, 0.11),
            n.steel,
            rt + U0 * 0.04,
            0.752 + 0.002,
            dt + $0 * 0.04,
            K0,
          ),
          E(
            _(0.02, 0.003, 0.05),
            n.steel,
            rt - U0 * 0.04,
            0.752 + 0.002,
            dt - $0 * 0.04,
            K0,
          ),
          ([rt, dt] = gt(0.165, 0)),
          E(_(0.017, 0.003, 0.215), n.steel, rt, 0.752 + 0.002, dt, K0),
          ([rt, dt] = gt(0.205, 0)),
          E(
            _(0.009, 0.003, 0.12),
            n.steel,
            rt + U0 * 0.04,
            0.752 + 0.002,
            dt + $0 * 0.04,
            K0,
          ),
          E(
            L(1, 8, 5),
            n.steel,
            rt - U0 * 0.045,
            0.752 + 0.004,
            dt - $0 * 0.045,
            K0,
            0,
            0,
            [0.017, 0.005, 0.027],
          ),
          ([rt, dt] = gt(0.13, 0.155)),
          pt("tumbler", rt, 0.752, dt),
          ([rt, dt] = gt(0.215, 0.1)),
          pt("wineMid", rt, 0.752, dt, o0 === 1 && Y < 2 ? Q0 : null));
      }
      let y0 = (Y, R0) => [
        N + Math.sin((Y * g) / 180) * R0,
        q + Math.cos((Y * g) / 180) * R0,
      ];
      o0 % 2 === 1 &&
        (E(C(0.02, 0.08, 10), n.paper, N, 0.752 + 0.105, q),
        E(L0.flame, n.bulbWarm, N, 0.752 + 0.146, q, 0, 0, 0, 1, v),
        E(C(0.05, 0.15, 14, 0.056, !0), P0, N, 0.752 + 0.13, q, 0, 0, 0, 1, v),
        s.addGlow(x(N, 0.752 + 0.004, q), m, 1, 1, 16753226, 0.32));
      let [D, W] = y0(29, 0.24);
      if (
        (E(
          H(
            [
              [0, 0],
              [0.013, 0],
              [0.015, 0.035],
              [0.01, 0.05],
              [0, 0.052],
            ],
            8,
          ),
          n.ceramicWhite,
          D,
          0.752,
          W,
        ),
        E(
          H(
            [
              [0, 0],
              [0.013, 0],
              [0.015, 0.035],
              [0.01, 0.05],
              [0, 0.052],
            ],
            8,
          ),
          n.ceramicBlack,
          D + 0.034,
          0.752,
          W + 0.012,
        ),
        ([D, W] = y0(119, 0.24)),
        I(D, 0.752, W, (119 * g) / 180)
          .add(C(0.022, 0.006, 12), n.brass, 0, 0.003, 0)
          .rod([0, 0.005, 0], [0, 0.1, 0], 0.003, n.brass, 5)
          .add(_(0.064, 0.064, 0.002), n.paper, 0, 0.13, 0)
          .lab(u0.tableNo[o0], 0.06, 0.06, 0, 0.13, 0.0016)
          .lab(u0.tableNo[o0], 0.06, 0.06, 0, 0.13, -0.0016, g),
        ([D, W] = y0(209, 0.24)),
        o0 === 0 || o0 === 4)
      ) {
        E(
          H(
            [
              [0, 0],
              [0.034, 0],
              [0.05, 0.035],
              [0.047, 0.035],
              [0.032, 0.006],
              [0, 0.006],
            ],
            10,
          ),
          n.woodLight,
          D,
          0.752,
          W,
        );
        for (let Y = 0; Y < 4; Y++)
          E(
            L(1, 6, 4),
            n.woodLight,
            D + d.range(-0.02, 0.02),
            0.752 + 0.03 + Y * 0.006,
            W + d.range(-0.02, 0.02),
            d() * 6,
            0,
            0,
            [0.022, 0.014, 0.017],
          );
        E(z(0.07, 0.07, 0.01), n.bedLinen, D, 0.752 + 0.022, W, 0.5, b);
      } else b0(D, 0.752, W);
      (([D, W] = y0(299, 0.24)),
        o0 === 3
          ? I(D, 0.752, W, (299 * g) / 180)
              .add(_(0.11, 0.055, 0.002), n.paper, 0, 0.027, 0.012, 0, -0.3)
              .lab(u0.reserved, 0.11, 0.051, 0, 0.0272, 0.0135, 0, -0.3)
              .add(_(0.11, 0.055, 0.002), n.paper, 0, 0.027, -0.012, 0, 0.3)
              .lab(u0.reserved, 0.11, 0.051, 0, 0.0272, -0.0135, g, -0.3)
          : b0(D, 0.752, W));
    }),
      E0(u0.way["EMBER BAR"], 1.25, -13.85, 2.64, -8.1, c),
      E(L0.lumbar, n.velvetTeal, -23.15, 0.66, -19.4, 0, -0.22),
      E(L0.lumbar, n.fabricCream, -12.5, 0.66, -19.4, 0, -0.22),
      I(-22.55, 0.47, -19.2, 0.4)
        .add(R(0.28, 0.2, 0.11, 0.03, 2), n.leatherBlack, 0, 0.1, 0)
        .tube(
          [
            [-0.1, 0.19, 0],
            [-0.07, 0.33, 0.01],
            [0.07, 0.33, 0.01],
            [0.1, 0.19, 0],
          ],
          0.006,
          n.leatherBlack,
          12,
          5,
        )
        .add(R(0.05, 0.03, 0.012, 0.004), n.brass, 0, 0.15, 0.058));
    for (let [N, q] of [
      [-23.2, -18.63],
      [-12.6, -18.63],
    ])
      (E(
        H(
          [
            [0, 0],
            [0.16, 0],
            [0.165, 0.012],
            [0.14, 0.025],
            [0.03, 0.045],
            [0.018, 0.09],
            [0.018, 0.56],
            [0.06, 0.585],
            [0.2, 0.6],
          ],
          18,
        ),
        n.brass,
        N,
        0,
        q,
      ),
        E(
          H(
            [
              [0, 0.6],
              [0.21, 0.6],
              [0.222, 0.607],
              [0.222, 0.622],
              [0.215, 0.628],
              [0, 0.628],
            ],
            28,
          ),
          n.marbleDark,
          N,
          0,
          q,
        ),
        b0(N + 0.02, 0.628, q - 0.04),
        V0(N - 0.1, 0.628, q + 0.05),
        N < -20 && pt("coupe", N - 0.1, 0.632, q + 0.05, nt),
        e.addCollider(
          N - 0.17,
          0,
          q - 0.17,
          N + 0.17,
          0.63,
          q + 0.17,
          "marble",
        ),
        e.aoBlob(N, q, 0, 0.3, 0.3, 0.4));
    {
      (a.bbox(-24.6, 0.08, -8.62, -22.2, 0.9, -8.1, n.walnut, {
        r: 0.008,
        seg: 1,
      }),
        u(
          -24.6 + 0.05,
          0,
          -8.62 + 0.05,
          -22.2 - 0.05,
          0.08,
          -8.1,
          n.blackMetal,
        ),
        a.bbox(
          -24.6 - 0.025,
          0.9,
          -8.62 - 0.025,
          -22.2 + 0.025,
          0.935,
          -8.1,
          n.marbleFloor,
          {
            r: 0.008,
            seg: 2,
          },
        ));
      for (let W = 0; W < 4; W++) {
        let Y = -24.3 + W * 0.6;
        (a.bbox(
          Y - 0.285,
          0.12,
          -8.62 - 0.014,
          Y + 0.285,
          0.86,
          -8.62 + 0.002,
          n.walnut,
          {
            r: 0.005,
            seg: 1,
          },
        ),
          a.add(
            F(
              [Y + (W % 2 ? -0.24 : 0.24), 0.4, -8.62 - 0.03],
              [Y + (W % 2 ? -0.24 : 0.24), 0.62, -8.62 - 0.03],
              0.006,
              6,
            ),
            n.brass,
            {},
          ));
      }
      (e.addCollider(-24.6, 0, -8.62, -22.2, 0.935, -8.1, "wood"),
        e.aoBlob((-24.6 + -22.2) / 2, -8.4, 0, 1.4, 0.45, 0.4));
      {
        let W = I(-24.240000000000002, 0.935, -8.36, c);
        W.add(R(0.52, 0.05, 0.3, 0.006), n.woodDark, 0, 0.025, 0);
        for (let Y = 0; Y < 4; Y++) {
          W.add(
            _(0.11, 0.004, 0.26),
            n.fabricCharcoal,
            -0.186 + Y * 0.124,
            0.051,
            0,
          );
          for (let R0 = 0; R0 < 9; R0++)
            W.add(
              _(Y === 2 ? 0.016 : 0.011, 0.003, 0.2),
              n.steel,
              -0.186 + Y * 0.124 + d.range(-0.035, 0.035),
              0.055 + R0 * 0.0032,
              d.range(-0.02, 0.02),
              d.range(-0.08, 0.08),
            );
        }
      }
      for (let [W, Y, R0] of [
        [-24.6 + 1, 9, 1],
        [-24.6 + 1.27, 6, 1],
        [-24.6 + 1.14, 7, 0.68],
      ])
        for (let U0 = 0; U0 < Y; U0++)
          E(
            L0.plate,
            n.ceramicWhite,
            W,
            0.935 + U0 * 0.0125 * R0,
            R0 < 1 ? -8.24 : -8.42,
            d() * 0.2,
            0,
            0,
            R0,
          );
      for (let W = 0; W < 5; W++)
        E(
          L0.bowl,
          n.ceramicWhite,
          -24.6 + 1.4,
          0.935 + W * 0.02,
          -8.24,
          0,
          0,
          0,
          1.25,
        );
      for (let W of [-24.6 + 1.52, -24.6 + 1.68]) {
        E(L0.jug, P0, W, 0.935, -8.4, 0, 0, 0, 1, v);
        for (let Y = 0; Y < 3; Y++)
          E(
            C(0.03, 0.004, 10),
            C0,
            W + d.range(-0.015, 0.015),
            0.935 + 0.05 + Y * 0.045,
            -8.4 + d.range(-0.015, 0.015),
            d() * 3,
            d.range(0.6, 1.2),
          );
      }
      E(
        R(0.36, 0.012, 0.26, 0.004),
        n.brass,
        -24.6 + 1.98,
        0.935 + 0.006,
        -8.36,
      );
      for (let W = 0; W < 3; W++)
        for (let Y = 0; Y < 4; Y++)
          E(
            L0.tumblerLo,
            P0,
            -24.6 + 1.85 + Y * 0.086,
            0.935 + 0.108,
            -8.44 + W * 0.086,
            0,
            g,
            0,
            1,
            v,
          );
      for (let [W, Y] of [
        [-24.6 + 2.29, n.chrome],
        [-24.6 + 2.28, n.brass],
      ]) {
        let R0 = Y === n.chrome ? -8.44 : -8.25;
        (E(
          H(
            [
              [0, 0],
              [0.06, 0],
              [0.066, 0.01],
              [0.07, 0.16],
              [0.05, 0.22],
              [0.035, 0.24],
              [0.04, 0.25],
              [0.02, 0.27],
              [0, 0.275],
            ],
            14,
          ),
          Y,
          W,
          0.935,
          R0,
        ),
          a.add(
            P(
              [
                [W + 0.065, 0.935 + 0.18, R0],
                [W + 0.12, 0.935 + 0.16, R0],
                [W + 0.12, 0.935 + 0.07, R0],
                [W + 0.066, 0.935 + 0.05, R0],
              ],
              0.008,
              10,
              5,
            ),
            n.plasticBlack,
            {},
          ),
          a.add(
            F(
              [W - 0.06, 0.935 + 0.15, R0],
              [W - 0.11, 0.935 + 0.21, R0],
              0.012,
              6,
              0.007,
            ),
            Y,
            {},
          ));
      }
      for (let W = 0; W < 8; W++)
        E(
          _(0.2, 0.01, 0.2),
          n.bedLinen,
          -24.6 + 0.76,
          0.935 + 0.005 + W * 0.01,
          -8.23,
          0.03 * W,
        );
      (E(L0.vaseBowl, n.ceramicBlack, -24.6 + 0.78, 0.935, -8.48),
        B(
          -24.6 + 0.78,
          0.935 + 0.2,
          -8.48,
          22,
          0.24,
          0.16,
          [x0, n.paper],
          !0,
          0.04,
        ));
    }
    {
      let N = I(-21.84, 0, -8.42, 0.3);
      for (let q = 0; q < 3; q++) {
        let o0 = (q * TAU) / 3;
        N.rod(
          [Math.cos(o0) * 0.2, 0, Math.sin(o0) * 0.2],
          [Math.cos(o0) * 0.1, 0.62, Math.sin(o0) * 0.1],
          0.009,
          n.brass,
          6,
        );
      }
      N.add(O(0.105, 0.008, 6, 20), n.brass, 0, 0.62, 0, 0, b)
        .add(O(0.16, 0.006, 6, 20), n.brass, 0, 0.2, 0, 0, b)
        .add(
          H(
            [
              [0, 0],
              [0.085, 0],
              [0.095, 0.012],
              [0.115, 0.2],
              [0.122, 0.21],
              [0.108, 0.21],
              [0.09, 0.016],
              [0, 0.014],
            ],
            16,
          ),
          n.chrome,
          0,
          0.48,
          0,
        );
      for (let q = 0; q < 12; q++)
        N.add(
          _(0.026, 0.026, 0.026),
          st,
          d.range(-0.07, 0.07),
          0.66 + d() * 0.04,
          d.range(-0.07, 0.07),
          d() * 3,
          d(),
          d(),
          1,
          v,
        );
      (N.add(L0.bottle, n.bottleGreen, 0.02, 0.5, 0, 0.5, 0.26, 0, 1, v)
        .add(
          C(0.0175, 0.09, 8),
          n.brass,
          0.02,
          0.5 + 0.265 * 0.966,
          0.265 * 0.257,
          0.5,
          0.26,
        )
        .add(_(0.22, 0.3, 0.008), n.bedLinen, -0.11, 0.56, 0.06, 0.9, 0.1),
        e.addCollider(-21.99, 0, -8.57, -21.69, 0.7, -8.27, "metal"),
        e.aoBlob(-21.84, -8.42, 0, 0.3, 0.3, 0.35));
    }
    {
      let N = I(-12.3, 0, -8.78, -b);
      N.add(R(0.52, 1, 0.4, 0.012, 2), n.walnut, 0, 0.54, 0)
        .add(R(0.56, 0.04, 0.44, 0.006), n.brass, 0, 0.02, 0)
        .add(R(0.58, 0.03, 0.46, 0.008), n.marbleDark, 0, 1.07, 0, 0, -0.2)
        .add(R(0.48, 0.2, 0.012, 0.005), n.brass, 0, 0.72, 0.204)
        .lab(
          u0.waitSeat,
          0.44,
          (0.44 * 150) / 380,
          0,
          0.72,
          0.2105,
          0,
          0,
          0,
          !0,
        );
      for (let q of [0.3, 0.46])
        N.add(R(0.4, 0.012, 0.012, 0.004), n.brass, 0, q, 0.202);
      (N.add(
        _(0.38, 0.016, 0.27),
        n.leatherBlack,
        -0.04,
        1.092,
        -0.02,
        0,
        -0.2,
      ).lab(u0.book, 0.36, 0.25, -0.04, 1.1015, -0.018, g, -b + 0.2, 0, !0),
        N.add(C(0.0045, 0.14, 6), n.brass, 0.1, 1.108, -0.1, 0.7, -0.2, b),
        N.add(C(0.045, 0.012, 14), n.brass, 0.2, 1.1, 0.14)
          .rod([0.2, 1.1, 0.14], [0.2, 1.3, 0.14], 0.006, n.brass, 6)
          .add(
            C(0.05, 0.08, 14, 0.035, !0),
            n.lampShade,
            0.2,
            1.33,
            0.14,
            0,
            0,
            0,
            1,
            v,
          )
          .add(L(0.014, 6, 5), n.bulbWarm, 0.2, 1.32, 0.14, 0, 0, 0, 1, v),
        s.addGlow(N.pt(0.1, 1.1, 0.05), m, 0.8, 0.8, 16756832, 0.3));
      for (let q = 0; q < 5; q++)
        N.add(
          R(0.02, 0.36, 0.26, 0.004),
          q % 2 ? n.leatherBlack : n.leatherTan,
          -0.29 - q * 0.024,
          0.74,
          0.02,
          0,
          0,
          0.05 + q * 0.02,
        );
      (N.add(_(0.14, 0.04, 0.3), n.brass, -0.34, 0.56, 0.02)
        .add(_(0.004, 0.34, 0.24), n.paper, -0.425, 0.76, 0.02, 0, 0, 0.14)
        .lab(u0.menuCard, 0.24, 0.34, -0.4285, 0.76, 0.02, -b, 0, 0.14),
        e.addCollider(-12.52, 0, -9.08, -12.08, 1.12, -8.48, "wood"),
        e.aoBlob(-12.3, -8.78, 0, 0.4, 0.45, 0.4));
    }
    {
      let N = I(-6.1, 0, -10.9, -b),
        q = 3.8,
        o0 = 0.4,
        h0 = 3.3,
        y0 = q / 5;
      N.add(_(q, h0, 0.07), n.walnut, 0, h0 / 2, 0.035)
        .add(_(q - 0.04, 0.1, o0 - 0.05), n.blackMetal, 0, 0.05, o0 / 2)
        .add(
          R(q + 0.06, 0.14, o0 + 0.02, 0.008),
          n.walnut,
          0,
          h0 - 0.07,
          o0 / 2,
        );
      for (let D = 0; D <= 5; D++)
        N.add(
          R(0.045, h0 - 0.2, o0, 0.006),
          n.walnut,
          -q / 2 + D * y0,
          h0 / 2 - 0.02,
          o0 / 2,
        );
      for (let D = 0; D < 5; D++) {
        let W = -q / 2 + (D + 0.5) * y0,
          Y = y0 - 0.045;
        N.add(R(Y - 0.02, 0.72, 0.02, 0.006), n.woodDark, W, 0.48, o0 - 0.012)
          .rod(
            [W + (D % 2 ? -1 : 1) * (Y / 2 - 0.07), 0.38, o0 + 0.012],
            [W + (D % 2 ? -1 : 1) * (Y / 2 - 0.07), 0.6, o0 + 0.012],
            0.006,
            n.brass,
            6,
          )
          .add(
            R(Y, 0.03, o0 - 0.02, 0.005),
            n.marbleDark,
            W,
            0.875,
            o0 / 2 + 0.01,
          );
        for (let R0 of [-1, 1])
          N.add(
            _(0.008, h0 - 1.2, 0.008),
            n.ledStrip,
            W + R0 * (Y / 2 - 0.008),
            0.92 + (h0 - 1.2) / 2,
            o0 - 0.03,
            0,
            0,
            0,
            1,
            v,
          );
        if (D !== 2)
          for (let R0 = 0; R0 < 17; R0++) {
            let U0 = 1 + R0 * 0.127;
            N.rod(
              [W - Y / 2, U0 - 0.04, 0.12],
              [W + Y / 2, U0 - 0.04, 0.12],
              0.004,
              n.brass,
              4,
            ).rod(
              [W - Y / 2, U0 - 0.04, 0.3],
              [W + Y / 2, U0 - 0.04, 0.3],
              0.004,
              n.brass,
              4,
            );
            for (let $0 = 0; $0 < 5; $0++) {
              if (d() < 0.11) continue;
              let g0 = W - Y / 2 + 0.085 + $0 * ((Y - 0.17) / 4),
                G0 = d();
              N.add(L0.bottleLay, J0, g0, U0, 0.085, 0, b, 0, 0.93).add(
                C(0.0158, 0.06, 5),
                G0 < 0.3 ? n.brass : G0 < 0.6 ? B0 : n.blackMetal,
                g0,
                U0,
                0.085 + 0.262,
                0,
                b,
              );
            }
          }
        else
          for (let R0 = 0; R0 < 4; R0++) {
            let U0 = 1.05 + R0 * 0.52;
            if (
              (N.add(
                R(Y, 0.03, o0 - 0.06, 0.005),
                n.marbleDark,
                W,
                U0,
                o0 / 2,
              ).add(
                _(Y - 0.06, 0.006, 0.012),
                n.ledStrip,
                W,
                U0 - 0.019,
                o0 - 0.06,
                0,
                0,
                0,
                1,
                v,
              ),
              R0 === 1)
            ) {
              let $0 = N.pt(W - 0.16, U0 + 0.015, 0.2);
              (E(L0.decanter, P0, $0.x, $0.y, $0.z, 0, 0, 0, 1, v),
                E(L0.decanterFill, Q0, $0.x, $0.y, $0.z),
                ($0 = N.pt(W + 0.05, U0 + 0.015, 0.24)),
                pt("wine", $0.x, $0.y, $0.z, Q0),
                ($0 = N.pt(W + 0.2, U0 + 0.015, 0.18)),
                pt("wine", $0.x, $0.y, $0.z));
            } else
              for (let $0 = 0; $0 < 4; $0++) {
                let g0 = N.pt(
                    W - 0.22 + $0 * 0.147,
                    U0 + 0.015,
                    0.2 + ($0 % 2) * 0.04,
                  ),
                  G0 = 1 + (R0 === 3 && $0 === 1 ? 0.5 : 0);
                (E(L0.bottle, J0, g0.x, g0.y, g0.z, 0, 0, 0, G0),
                  E(
                    C(0.0168 * G0, 0.06 * G0, 8),
                    $0 % 2 ? n.brass : B0,
                    g0.x,
                    g0.y + 0.28 * G0,
                    g0.z,
                  ));
                let K0 = N.pt(
                  W - 0.22 + $0 * 0.147,
                  U0 + 0.015 + 0.105 * G0,
                  0.2 + ($0 % 2) * 0.04 + 0.0385 * G0,
                );
                T0(
                  u0.wineLabel[($0 + R0) % 3],
                  0.05 * G0,
                  0.063 * G0,
                  K0.x,
                  K0.y,
                  K0.z,
                  -b,
                );
              }
          }
      }
      (s.addGlow(x(-6.95, 0.003, -10.9), m, 1.3, 4.2, 16751164, 0.3),
        e.addCollider(-6.52, 0, -12.82, -6.1, h0, -8.98, "wood"),
        e.aoSkirt(-6.5, -12.8, -6.1, -9, 0, 0.4, 0.4));
    }
    {
      let N = I(-17.6, 0, -19.32, 0),
        q = 0.92,
        o0 = 0.46;
      for (let y0 of [-1, 1])
        for (let D of [-1, 1])
          N.rod(
            [(y0 * q) / 2, 0.1, (D * o0) / 2],
            [(y0 * q) / 2, 0.9, (D * o0) / 2],
            0.011,
            n.brass,
          )
            .add(
              O(0.04, 0.012, 6, 14),
              n.rubber,
              (y0 * q) / 2,
              0.052,
              (D * o0) / 2,
            )
            .add(L(0.016, 8, 6), n.brass, (y0 * q) / 2, 0.91, (D * o0) / 2);
      for (let y0 of [0.34, 0.82]) {
        N.add(R(q - 0.02, 0.022, o0 - 0.02, 0.006), n.marbleFloor, 0, y0, 0);
        for (let D of [-1, 1])
          N.rod(
            [-q / 2, y0 + 0.05, (D * o0) / 2],
            [q / 2, y0 + 0.05, (D * o0) / 2],
            0.006,
            n.brass,
            6,
          );
        for (let D of [-1, 1])
          N.rod(
            [(D * q) / 2, y0 + 0.05, -o0 / 2],
            [(D * q) / 2, y0 + 0.05, o0 / 2],
            0.006,
            n.brass,
            6,
          );
      }
      N.tube(
        [
          [q / 2, 0.9, -o0 / 2],
          [q / 2 + 0.11, 0.94, -o0 / 2],
          [q / 2 + 0.11, 0.94, o0 / 2],
          [q / 2, 0.9, o0 / 2],
        ],
        0.011,
        n.brass,
        16,
        6,
      );
      let h0 = 0.831;
      N.add(C(0.135, 0.012, 20), n.ceramicWhite, -0.26, h0 + 0.006, 0)
        .add(C(0.105, 0.08, 20), O0, -0.26, h0 + 0.052, 0)
        .add(C(0.107, 0.008, 20), n.fabricCream, -0.26, h0 + 0.096, 0)
        .add(L0.dome, P0, -0.26, h0 + 0.012, 0, 0, 0, 0, 1, v);
      for (let y0 = 0; y0 < 8; y0++)
        N.add(
          L(0.012, 6, 5),
          B0,
          -0.26 + Math.cos(y0 * 0.785) * 0.075,
          h0 + 0.108,
          Math.sin(y0 * 0.785) * 0.075,
        );
      N.add(C(0.135, 0.012, 20), n.ceramicWhite, 0.06, h0 + 0.006, 0.02)
        .add(C(0.11, 0.03, 20, 0.118), n.woodLight, 0.06, h0 + 0.027, 0.02)
        .add(L0.dome, P0, 0.06, h0 + 0.012, 0.02, 0, 0, 0, 1, v);
      for (let y0 = 0; y0 < 26; y0++) {
        let D = d() * TAU,
          W = Math.sqrt(d()) * 0.095;
        N.add(
          L(0.014, 6, 5),
          [B0, C0, k0, x0][y0 % 4],
          0.06 + Math.cos(D) * W,
          h0 + 0.048,
          0.02 + Math.sin(D) * W,
        );
      }
      N.add(C(0.07, 0.01, 14), n.ceramicWhite, 0.33, h0 + 0.005, -0.04);
      for (let y0 = 0; y0 < 6; y0++) {
        let D = 7 - y0,
          W = 0.055 - y0 * 0.008;
        for (let Y = 0; Y < D; Y++) {
          let R0 = (Y / D) * TAU + y0;
          N.add(
            C(0.017, 0.016, 8),
            [x0, C0, k0, n.paper, O0][(Y + y0) % 5],
            0.33 + Math.cos(R0) * W,
            h0 + 0.02 + y0 * 0.022,
            -0.04 + Math.sin(R0) * W,
            0,
            0,
            0,
            [1, 1, 1],
          );
        }
      }
      for (let y0 = 0; y0 < 10; y0++)
        N.add(
          L0.plate,
          n.ceramicWhite,
          -0.24,
          0.351 + y0 * 0.009,
          0,
          0,
          0,
          0,
          0.72,
        );
      for (let y0 = 0; y0 < 6; y0++)
        N.add(
          _(0.19, 0.01, 0.19),
          n.bedLinen,
          0.02,
          0.356 + y0 * 0.01,
          0.02,
          0.04 * y0,
        );
      for (let y0 = 0; y0 < 8; y0++)
        N.add(
          _(0.012, 0.003, 0.16),
          n.steel,
          0.27 + d.range(-0.03, 0.03),
          0.354 + y0 * 0.003,
          d.range(-0.02, 0.02),
          d.range(-0.15, 0.15),
        );
      (e.addCollider(-18.08, 0, -19.57, -17.1, 0.95, -19.07, "metal"),
        e.aoBlob(-17.6, -19.32, 0, 0.6, 0.36, 0.4));
    }
  }
}

export { dressWestWing };

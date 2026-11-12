// ui/minimap.js: recovered from the verified GOLDEN HOUR release.
import { icon } from "./icons.js";

var gs0 = 34;
var jp = 14;
var sd = (o) => document.getElementById(o);
var IU = [
  ["ATRIUM LOBBY", -12, 12, -8, 10],
  ["EMBER BAR", -28, -12, -8, 10],
  ["RESTAURANT", -28, -6, -20, -8],
  ["SERVICE CORRIDOR", -6, 6, -20, -8],
  ["KITCHEN", 6, 28, -20, -8],
  ["EAST CORRIDOR", 12, 16, -8, 10],
  ["CONFERENCE", 16, 28, -8, 0],
  ["SUITE", 16, 28, 0, 10],
  ["POOL", -9, 9, 13, 22],
  ["TERRACE", -30, 30, 10, 30],
];
var HU = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
var Minimap = class {
  constructor() {
    ((this.root = sd("mm")),
      (this.rot = sd("mm-rot")),
      (this.map = sd("mm-map")),
      (this.me = sd("mm-me")),
      (this.cone = sd("mm-cone")),
      (this.north = sd("mm-n")),
      (this.zone = sd("mm-zone")),
      (this.hdg = sd("mm-hdg")),
      (this.me.innerHTML = icon("arrow")),
      (this.tape = sd("mm-tape")),
      (this.tdeg = 0));
    {
      let t = "";
      for (let e = -180; e <= 540; e += 15) {
        let s = e % 45 === 0,
          n = s ? HU[(((e / 45) % 8) + 8) % 8] : "";
        t += `<i class="${s ? "c" : ""}${n === "N" ? " n" : ""}" style="left:${(((e + 180) / 360) * 66).toFixed(3)}rem">${s ? `<span>${n}</span>` : ""}</i>`;
      }
      this.tape.innerHTML = t;
    }
    ((this.mode = "rotate"),
      (this.blips = []),
      (this.rr = 0),
      (this.upper = !1),
      (this.mpm = 4),
      (this.half = 110),
      (this.c = {
        yaw: 1e9,
        px: 1e9,
        pz: 1e9,
        n: 1e9,
        hd: -1,
        zone: "",
        me: 1e9,
        up: null,
      }),
      (this.tick = 0),
      (this.ready = !1));
  }
  setMode(t) {
    ((this.mode = t),
      this.root.classList.toggle("nomap", t === "off"),
      (this.c.yaw = this.c.me = this.c.n = 1e9),
      t !== "rotate"
        ? (this.rot.style.transform = "")
        : ((this.me.style.transform = ""), (this.cone.style.transform = "")));
  }
  build(t, e) {
    let s = 1e9,
      n = -1e9,
      i = 1e9,
      a = -1e9;
    for (let h of t.cols)
      h.y1 < -2 ||
        h.y0 > 9 ||
        ((s = Math.min(s, h.x0)),
        (n = Math.max(n, h.x1)),
        (i = Math.min(i, h.z0)),
        (a = Math.max(a, h.z1)));
    ((s = Math.max(s, -40) - 1),
      (n = Math.min(n, 40) + 1),
      (i = Math.max(i, -40) - 1),
      (a = Math.min(a, 40) + 1),
      (this.minx = s),
      (this.minz = i),
      (this.wm = n - s),
      (this.hm = a - i));
    let r = Math.round(this.wm * jp),
      l = Math.round(this.hm * jp),
      c = () => {
        let h = document.createElement("canvas");
        return (
          (h.width = r),
          (h.height = l),
          (h.style.width = `calc(var(--mpm) * ${this.wm.toFixed(2)})`),
          (h.style.height = `calc(var(--mpm) * ${this.hm.toFixed(2)})`),
          h
        );
      };
    ((this.cv = [c(), c()]),
      this._plan(this.cv[0], t, e, 0, null),
      this._plan(this.cv[1], t, e, 3.8, this.cv[0]),
      (this.cv[1].style.opacity = 0),
      this.map.append(this.cv[0], this.cv[1]),
      (this.layer = document.createElement("div")),
      this.map.appendChild(this.layer),
      addEventListener("resize", () => {
        this._lay = !0;
      }),
      (this._lay = !0),
      (this.ready = !0));
  }
  _plan(t, e, s, n, i) {
    let a = t.getContext("2d"),
      r = t.width,
      l = t.height,
      c = document.createElement("canvas");
    ((c.width = r), (c.height = l));
    let h = c.getContext("2d"),
      f = (y) => (y - this.minx) * jp,
      u = (y) => (y - this.minz) * jp,
      d = (y, M = 1.6) => {
        let w = Math.max(M, (y.x1 - y.x0) * jp),
          T = Math.max(M, (y.z1 - y.z0) * jp);
        h.fillRect(
          f((y.x0 + y.x1) / 2) - w / 2,
          u((y.z0 + y.z1) / 2) - T / 2,
          w,
          T,
        );
      },
      m = (y, M, w) => {
        (h.clearRect(0, 0, r, l),
          (h.fillStyle = M),
          (h.strokeStyle = M),
          w(),
          (a.globalAlpha = y),
          a.drawImage(c, 0, 0),
          (a.globalAlpha = 1));
      },
      p = (s.stairs || []).map((y) => {
        let M = y.start,
          w = y.start + y.sign * y.n * y.tread;
        return y.ax === "z"
          ? {
              x0: y.s0,
              x1: y.s1,
              z0: Math.min(M, w),
              z1: Math.max(M, w),
              y0: y.y0,
              y1: y.y1,
              s: y,
            }
          : {
              x0: Math.min(M, w),
              x1: Math.max(M, w),
              z0: y.s0,
              z1: y.s1,
              y0: y.y0,
              y1: y.y1,
              s: y,
            };
      }),
      x = (y) =>
        p.some(
          (M) =>
            y.x0 >= M.x0 - 0.02 &&
            y.x1 <= M.x1 + 0.02 &&
            y.z0 >= M.z0 - 0.02 &&
            y.z1 <= M.z1 + 0.02 &&
            Math.abs(y.y0 - M.y0) < 0.05 &&
            y.y1 <= M.y1 + 0.05,
        ),
      g = e.cols.filter(
        (y) =>
          !y.off &&
          y.x1 > this.minx &&
          y.x0 < this.minx + this.wm &&
          y.z1 > this.minz &&
          y.z0 < this.minz + this.hm,
      );
    (i && ((a.globalAlpha = 0.3), a.drawImage(i, 0, 0), (a.globalAlpha = 1)),
      m(0.2, "#fff", () => {
        for (let y of g)
          !y.pane &&
            Math.abs(y.y1 - n) < 0.14 &&
            (y.x1 - y.x0) * (y.z1 - y.z0) > 1.2 &&
            d(y);
      }),
      n === 0 && s.pool && m(0.3, "#6fdcff", () => d(s.pool)),
      m(n === 0 ? 0.42 : 0.3, "#fff", () => {
        h.lineWidth = 1.2;
        for (let y of p)
          for (let M = 0; M <= y.s.n; M += 2) {
            let w = y.s.start + y.s.sign * y.s.tread * M;
            (h.beginPath(),
              y.s.ax === "z"
                ? (h.moveTo(f(y.x0), u(w)), h.lineTo(f(y.x1), u(w)))
                : (h.moveTo(f(w), u(y.z0)), h.lineTo(f(w), u(y.z1))),
              h.stroke());
          }
      }),
      m(0.36, "#fff", () => {
        for (let y of g) {
          if (y.pane || x(y)) continue;
          let M = y.x1 - y.x0,
            w = y.z1 - y.z0;
          y.y1 > n + 0.5 &&
            y.y1 <= n + 1.75 &&
            y.y0 < n + 1 &&
            y.y1 - y.y0 > 0.25 &&
            (M > 0.3 || w > 0.3) &&
            d(y);
        }
      }));
    let b = g.filter(
        (y) =>
          !y.pane &&
          !x(y) &&
          y.y0 < n + 1.1 &&
          y.y1 > n + 1.75 &&
          (y.x1 - y.x0 > 0.12 || y.z1 - y.z0 > 0.12),
      ),
      v = (y) => Math.min(y.x1 - y.x0, y.z1 - y.z0) <= 1.3;
    (m(0.14, "#fff", () => {
      for (let y of b) v(y) || d(y);
    }),
      m(0.92, "#fff", () => {
        h.lineWidth = 1.8;
        for (let y of b)
          v(y)
            ? d(y, 2.2)
            : h.strokeRect(
                f(y.x0) + 0.9,
                u(y.z0) + 0.9,
                (y.x1 - y.x0) * jp - 1.8,
                (y.z1 - y.z0) * jp - 1.8,
              );
      }),
      m(0.8, "#6fdcff", () => {
        for (let y of g)
          y.pane && y.y0 < n + 1.6 && y.y1 > n + 0.4 && d(y, 1.4);
      }));
  }
  _layout() {
    let t = this.root.firstElementChild,
      e = t.clientWidth;
    if (!e) return !1;
    ((this.half = e / 2),
      (this.mpm = e / gs0),
      (this._lay = !1),
      (this.c.px = this.c.n = 1e9));
    for (let s of this.blips) s && (s.qx = 1e9);
    if (this.kb) for (let s of this.kb) s.qx = 1e9;
    return !0;
  }
  _blip(t, e) {
    let s = document.createElement("div");
    (e
      ? ((s.className = "bl"), (s.innerHTML = icon("arrow")))
      : (s.className = "pg"),
      this.layer.appendChild(s));
    let n = e
      ? null
      : s.animate(
          [
            {
              boxShadow:
                "0 0 0 0 rgba(255,67,38,.95), 0 0 0 1px rgba(0,0,0,.7)",
            },
            {
              boxShadow:
                "0 0 0 1.5rem rgba(255,67,38,0), 0 0 0 1px rgba(0,0,0,.7)",
            },
          ],
          {
            duration: 560,
            easing: "ease-out",
          },
        );
    return (
      n && n.cancel(),
      (this.blips[t] = {
        el: s,
        friendly: e,
        ring: n,
        qx: 1e9,
        qz: 1e9,
        qr: 1e9,
        t: 0,
        vis: !1,
        x: 0,
        z: 0,
        op: 0,
        dead: null,
        off: null,
        deadT: 0,
        anim: e
          ? null
          : s.animate(
              [
                {
                  transform: "scale(2.6)",
                },
                {
                  transform: "scale(1)",
                },
              ],
              {
                duration: 260,
                easing: "cubic-bezier(.2,.8,.2,1)",
                composite: "add",
              },
            ),
      })
    );
  }
  update(t, e, s, n, i, a) {
    if (!this.ready) return;
    let r = this.c,
      l = e.yaw,
      c = this.upper ? e.pos.y > 2.2 : e.pos.y > 2.9;
    (this.mode !== "off" &&
      (!this._lay || this._layout()) &&
      this._map(t, e, s, n, i, a, c, l),
      (this.upper = c));
    let h = (-l * 57.29578) % 360;
    h < 0 && (h += 360);
    let f = h - this.tdeg;
    (f > 180 ? (f -= 360) : f < -180 && (f += 360),
      (this.tdeg += f * Math.min(1, t * 16)),
      this.tdeg < 0
        ? (this.tdeg += 360)
        : this.tdeg >= 360 && (this.tdeg -= 360));
    let u = Math.round(this.tdeg * 20);
    if (
      (u !== r.tape &&
        ((r.tape = u),
        (this.tape.style.transform =
          "translate3d(" +
          (11 - ((u / 20 + 180) / 360) * 66).toFixed(3) +
          "rem,0,0)")),
      (this.tick -= t),
      this.tick <= 0)
    ) {
      this.tick = 0.1;
      let d = Math.round(-l * 57.29578) % 360;
      (d < 0 && (d += 360),
        d !== r.hd &&
          ((r.hd = d),
          (this.hdg.textContent =
            HU[Math.round(d / 45) % 8] +
            " " +
            (d < 10 ? "00" : d < 100 ? "0" : "") +
            d)));
      let m = c ? "BALCONY" : "SOLSTICE HOTEL";
      if (!c)
        for (let p = 0; p < IU.length; p++) {
          let x = IU[p];
          if (
            e.pos.x >= x[1] &&
            e.pos.x < x[2] &&
            e.pos.z >= x[3] &&
            e.pos.z < x[4]
          ) {
            m = x[0];
            break;
          }
        }
      m !== r.zone && ((r.zone = m), (this.zone.textContent = m));
    }
  }
  _map(t, e, s, n, i, a, r, l) {
    let c = this.c,
      h = this.mpm,
      f = this.mode === "rotate",
      u = Math.round(l * 1500);
    if (u !== c.yaw) {
      if (((c.yaw = u), f))
        this.rot.style.transform = "rotate(" + u / 1500 + "rad)";
      else {
        let y = "rotate(" + -u / 1500 + "rad)";
        ((this.me.style.transform = y), (this.cone.style.transform = y));
      }
      let x = f ? u / 1500 : 0,
        g = Math.sin(x),
        b = -Math.cos(x),
        v = (this.half - 1) / Math.max(Math.abs(g), Math.abs(b));
      this.north.style.transform =
        "translate3d(" +
        (g * v).toFixed(1) +
        "px," +
        (b * v).toFixed(1) +
        "px,0)";
    }
    let d = Math.round((e.pos.x - this.minx) * h * 8),
      m = Math.round((e.pos.z - this.minz) * h * 8);
    ((d !== c.px || m !== c.pz) &&
      ((c.px = d),
      (c.pz = m),
      (this.map.style.transform =
        "translate3d(" + -d / 8 + "px," + -m / 8 + "px,0)")),
      r !== c.up &&
        ((c.up = r),
        (this.cv[0].style.opacity = r ? 0 : 1),
        (this.cv[1].style.opacity = r ? 1 : 0)));
    let p = s.length;
    this.rr = (this.rr + 1) % Math.max(1, p);
    for (let x = 0; x < p; x++) {
      let g = s[x];
      if (g.isPlayer || g.isK9) continue;
      let b = g.team === e.team,
        v = this.blips[x] || this._blip(x, b),
        y = g.pos.y > 2.5 !== r;
      if (b) {
        if (!g.alive) {
          v.dead !== !0
            ? ((v.dead = !0), (v.deadT = 3), v.el.classList.add("dead"))
            : v.deadT > 0 &&
              ((v.deadT -= t), v.deadT <= 0 && (v.el.style.display = "none"));
          continue;
        }
        (v.dead !== !1 &&
          ((v.dead = !1),
          v.el.classList.remove("dead"),
          (v.el.style.display = "")),
          v.off !== y && ((v.off = y), v.el.classList.toggle("off", y)));
        let M = Math.round((g.pos.x - this.minx) * h * 4),
          w = Math.round((g.pos.z - this.minz) * h * 4),
          T = Math.round(g.yaw * 40);
        (M !== v.qx || w !== v.qz || T !== v.qr) &&
          ((v.qx = M),
          (v.qz = w),
          (v.qr = T),
          (v.el.style.transform =
            "translate3d(" +
            M / 4 +
            "px," +
            w / 4 +
            "px,0) rotate(" +
            -T / 40 +
            "rad)"));
      } else {
        if (!g.alive) ((v.t = Math.min(v.t, 0.25)), (v.vis = !1));
        else {
          let M = g.lastShot !== void 0 && i - g.lastShot < 0.12;
          if (x === this.rr) {
            let w = g.pos.x - a.x,
              T = g.pos.y + 1.4 - a.y,
              S = g.pos.z - a.z,
              E = Math.sqrt(w * w + T * T + S * S);
            v.vis =
              E < 70 &&
              E > 0.4 &&
              w * e.viewDir.x + T * e.viewDir.y + S * e.viewDir.z > E * 0.58 &&
              n.raycast(a.x, a.y, a.z, w / E, T / E, S / E, E - 0.3, null) ===
                !1;
          }
          if (M || v.vis) {
            ((v.t <= 0.05 || (M && v.t < 2)) &&
              (v.anim.cancel(),
              v.anim.play(),
              M && (v.ring.cancel(), v.ring.play())),
              (v.t = M ? 2.6 : Math.max(v.t, 1.1)));
            let w = Math.round((g.pos.x - this.minx) * h * 4),
              T = Math.round((g.pos.z - this.minz) * h * 4);
            ((w !== v.qx || T !== v.qz) &&
              ((v.qx = w),
              (v.qz = T),
              (v.el.style.transform =
                "translate3d(" + w / 4 + "px," + T / 4 + "px,0)")),
              (v.dim = y));
          }
        }
        if (v.t > 0 || v.op > 0) {
          v.t -= t;
          let M = Math.round(
            Math.max(0, Math.min(1, v.t / 0.8)) * (v.dim ? 0.5 : 1) * 25,
          );
          M !== v.op && ((v.op = M), (v.el.style.opacity = M / 25));
        }
      }
    }
  }
  reset() {
    for (let t of this.blips)
      t &&
        !t.friendly &&
        ((t.t = 0), (t.vis = !1), (t.op = 0), (t.el.style.opacity = 0));
    if (this.kb)
      for (let t of this.kb) ((t.t = 0), (t.op = 0), (t.el.style.opacity = 0));
  }
  k9(t, e, s, n) {
    if (!this.ready || this.mode === "off" || this._lay || !this.layer) return;
    let i = this.kb || (this.kb = [this._k9blip(!1), this._k9blip(!0)]),
      a = this.upper;
    (this._k9put(i[0], e, a), this._k9op(i[0], e ? 1 : 0));
    let r = i[1];
    (s && n
      ? (r.t <= 0 && (r.ring.cancel(), r.ring.play()),
        (r.t = 1.5),
        this._k9put(r, s, a))
      : r.t > 0 && (r.t -= s ? t : t * 4),
      this._k9op(r, r.t > 0 ? Math.min(1, r.t / 0.7) : 0));
  }
  _k9blip(t) {
    let e = document.createElement("div");
    ((e.className = "k9b" + (t ? " foe" : "")),
      (e.innerHTML = icon("k9blip")),
      this.layer.appendChild(e));
    let s = e.firstChild.animate(
      [
        {
          transform: "scale(2.8)",
          opacity: 0.2,
        },
        {
          transform: "scale(1)",
          opacity: 1,
        },
      ],
      {
        duration: 320,
        easing: "cubic-bezier(.2,.8,.2,1)",
      },
    );
    return (
      s.cancel(),
      {
        el: e,
        ring: s,
        qx: 1e9,
        qz: 1e9,
        qr: 1e9,
        op: 0,
        t: 0,
        off: null,
      }
    );
  }
  _k9put(t, e, s) {
    if (!e) return;
    let n = this.mpm,
      i = Math.round((e.pos.x - this.minx) * n * 4),
      a = Math.round((e.pos.z - this.minz) * n * 4),
      r = Math.round((e.yaw || 0) * 40);
    (i !== t.qx || a !== t.qz || r !== t.qr) &&
      ((t.qx = i),
      (t.qz = a),
      (t.qr = r),
      (t.el.style.transform =
        "translate3d(" +
        i / 4 +
        "px," +
        a / 4 +
        "px,0) rotate(" +
        -r / 40 +
        "rad)"));
    let l = e.pos.y > 2.5 !== s;
    l !== t.off && ((t.off = l), t.el.classList.toggle("off", l));
  }
  _k9op(t, e) {
    let s = Math.round(e * 20);
    s !== t.op && ((t.op = s), (t.el.style.opacity = s / 20));
  }
};

export { Minimap };

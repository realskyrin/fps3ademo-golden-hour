// weapons/combat.js: recovered from the verified GOLDEN HOUR release.
import { Vector3 } from "../vendor/three-r180.js";
import { lerp, saturate, smoothstep } from "../core/math.js";

var rZ = new Set([
  "wood",
  "plaster",
  "fabric",
  "plastic",
  "ceramic",
  "foliage",
  "carpet",
  "glass",
]);
var jd = new Vector3();
var Nw = new Vector3();
var vn = new Vector3();
var n2 = new Vector3();
var $d = new Vector3();
var uI = new Vector3();
var dI = new Vector3();
var Bw = new Vector3();
var br = {
  t: 0,
  nx: 0,
  ny: 0,
  nz: 0,
  col: null,
};
var bu = {
  t: 0,
  body: null,
  nx: 0,
  ny: 0,
  nz: 0,
};
var yu = {
  t: 0,
  pane: null,
  a: 0,
  y: 0,
};
function lZ(o, t, e, s, n) {
  let i = s.x - e.x,
    a = s.y - e.y,
    r = s.z - e.z,
    l = o.x - e.x,
    c = o.y - e.y,
    h = o.z - e.z,
    f = i * i + a * a + r * r,
    u = i * t.x + a * t.y + r * t.z,
    d = i * l + a * c + r * h,
    m = t.x * l + t.y * c + t.z * h,
    p = l * l + c * c + h * h;
  if (f < 1e-8) {
    let y = p - n * n,
      M = m * m - y;
    return M > 0 ? -m - Math.sqrt(M) : -1;
  }
  let x = f - u * u,
    g = f * m - d * u,
    b = f * p - d * d - n * n * f,
    v = g * g - x * b;
  if (v >= 0 && x > 1e-9) {
    let y = (-g - Math.sqrt(v)) / x,
      M = d + y * u;
    if (M > 0 && M < f) return y;
    let w = M <= 0 ? l : o.x - s.x,
      T = M <= 0 ? c : o.y - s.y,
      S = M <= 0 ? h : o.z - s.z;
    if (
      ((g = t.x * w + t.y * T + t.z * S),
      (b = w * w + T * T + S * S - n * n),
      (v = g * g - b),
      v > 0)
    )
      return -g - Math.sqrt(v);
  }
  return -1;
}
var CombatSystem = class {
  constructor(context) {
    ((this.ctx = context),
      (this.result = {
        point: new Vector3(),
        actor: null,
        head: !1,
        dist: 0,
        any: !1,
      }),
      (this._impactSounds = 0),
      (this._whiz = 0));
  }
  frame() {
    this._impactSounds = 0;
  }
  fire(t, e, s, n, i, a, r = 1) {
    let l = this.result;
    ((l.actor = null),
      (l.head = !1),
      (l.any = !1),
      $d.set(0, 1, 0),
      Math.abs(s.y) > 0.95 && $d.set(1, 0, 0),
      $d.cross(s).normalize(),
      uI.crossVectors(s, $d));
    let c = (i * Math.PI) / 180;
    for (let h = 0; h < n.pellets; h++) {
      let f = Math.random() * Math.PI * 2,
        u = Math.sqrt(Math.random()) * c * (n.pellets > 1, 1);
      (Nw.copy(s)
        .addScaledVector($d, Math.cos(f) * u)
        .addScaledVector(uI, Math.sin(f) * u)
        .normalize(),
        this._bullet(t, e, Nw, n, r, a, h));
    }
    return l;
  }
  _bullet(t, e, s, n, i, a, r) {
    let {
        world: l,
        glass: c,
        physics: h,
        fx: f,
        audio: u,
        match: d,
      } = this.ctx,
      m = e.x,
      p = e.y,
      x = e.z,
      g = 0,
      b = i,
      v = 0,
      y = this.result;
    for (let w = 0; w < 3; w++) {
      let T = 140 - g,
        S = l.raycast(m, p, x, s.x, s.y, s.z, T, br),
        E = S ? br.t : T,
        _ = S ? 1 : 0;
      h.raycastProps(m, p, x, s.x, s.y, s.z, E, bu) && ((E = bu.t), (_ = 2));
      let R = null,
        C = null;
      jd.set(m, p, x);
      let L = d.actors;
      for (let K = 0; K < L.length; K++) {
        let $ = L[K];
        if ($ === t || !$.alive || $.team === t.team) continue;
        let n0 = $.pos.x - m,
          e0 = $.pos.z - x,
          p0 = n0 * s.x + e0 * s.z;
        if (p0 < -1.5 || p0 > E + 1.5) continue;
        let t0 = $.hit;
        for (let M0 = 0; M0 < t0.length; M0++) {
          let f0 = lZ(jd, s, t0[M0].a, t0[M0].b, t0[M0].r);
          f0 > 0 && f0 < E && ((E = f0), (_ = 3), (R = $), (C = t0[M0].part));
        }
      }
      let A = m,
        O = p,
        H = x,
        F = 0,
        P = 0;
      for (; P++ < 5 && c.raycast(A, O, H, s.x, s.y, s.z, E - F, yu);)
        (c.hit(yu.pane, yu.a, yu.y, s, n.pellets > 1 ? 0.8 : 1),
          (F += yu.t + 0.02),
          (A = m + s.x * F),
          (O = p + s.y * F),
          (H = x + s.z * F),
          (b *= 0.92));
      let z = m + s.x * E,
        k = p + s.y * E,
        I = x + s.z * E;
      vn.set(z, k, I);
      let G = g + E;
      if (((w === 0 || _) && y.point.copy(vn), _ === 3)) {
        let K = lerp(n.dmg[0], n.dmg[1], smoothstep(n.range[0], n.range[1], G)),
          $ = C === "head",
          n0 = K * b * ($ ? n.head : C === "legs" ? 0.9 : 1);
        n2.copy(s).negate();
        let e0 = R.isK9;
        (f.impact(e0 ? "metal" : "flesh", vn, n2),
          !(e0 && u.k9) &&
            this._impactSounds++ < 3 &&
            u.impact(e0 ? "metal" : "flesh", vn),
          d.damage(R, n0, t, {
            head: $,
            weapon: n.id,
            dir: s,
            point: vn,
            pellet: r,
          }),
          f.bodyHit && !e0 && f.bodyHit(vn, s, !R.alive, $),
          (y.actor = R),
          (y.head = y.head || $),
          (y.any = !0),
          (y.dist = G));
        break;
      }
      if (_ === 2) {
        let K = bu.body;
        n2.set(bu.nx, bu.ny, bu.nz);
        let $ = K.mat === "soft" ? "fabric" : K.mat;
        (f.impact($, vn, n2), this._impactSounds++ < 3 && u.impact($, vn));
        let n0 = n.impulse * (n.pellets > 1 ? 0.55 : 1) * 6;
        (h.impulse(K, z, k, I, s.x * n0, s.y * n0 + n0 * 0.15, s.z * n0),
          K.breakable && h.breakProp(K, s),
          (y.any = !0));
        break;
      }
      if (_ === 1) {
        let K = br.col;
        if ((n2.set(br.nx, br.ny, br.nz), K.water)) {
          (f.splash(vn, 0.7),
            this.ctx.hotel.ripple(z, I, 1),
            this._impactSounds++ < 3 && u.impact("water", vn));
          let n0 = E + 0.07 / Math.max(0.05, Math.abs(s.y)) + 0.01;
          ((m += s.x * n0),
            (p += s.y * n0),
            (x += s.z * n0),
            (g += n0),
            (b *= 0.6));
          continue;
        }
        if ((K.onShot && K.onShot(vn, n2, s, t), !K.silent)) {
          let n0 = l.groundAt(z + n2.x * 0.2, I + n2.z * 0.2, k + 0.05);
          (f.impact(K.surf, vn, n2, n0 === -1 / 0 ? -1e9 : n0),
            this._impactSounds++ < 3 &&
              (u.impact(K.surf, vn),
              K.surf === "metal" && Math.random() < 0.35 && u.ricochet(vn)));
        }
        y.any = !0;
        let $ =
          Math.abs(br.nx) > 0.5
            ? K.x1 - K.x0
            : Math.abs(br.ny) > 0.5
              ? K.y1 - K.y0
              : K.z1 - K.z0;
        if (v === 0 && $ <= 0.24 && rZ.has(K.surf) && n.pellets === 1) {
          ((v = 1), (b *= 0.55));
          let n0 =
            E +
            $ /
              Math.max(0.2, Math.abs(s.x * br.nx + s.y * br.ny + s.z * br.nz)) +
            0.03;
          ((m += s.x * n0), (p += s.y * n0), (x += s.z * n0), (g += n0));
          continue;
        }
      }
      break;
    }
    a && (r === 0 || r % 3 === 0) && f.tracer(a, y.point);
    let M = this.ctx.player;
    if (t !== M && M.alive && y.actor !== M) {
      dI.subVectors(M.eye, e);
      let w = dI.dot(s);
      w > 1 &&
        w < e.distanceTo(y.point) &&
        (Bw.copy(e).addScaledVector(s, w),
        Bw.distanceTo(M.eye) < 1.3 &&
          this.ctx.time() - this._whiz > 0.07 &&
          ((this._whiz = this.ctx.time()),
          u.whiz(Bw),
          this.ctx.onNearMiss(Bw)));
    }
  }
  explode(t, e) {
    let {
        world: s,
        glass: n,
        physics: i,
        fx: a,
        audio: r,
        match: l,
      } = this.ctx,
      c = s.groundAt(t.x, t.z, t.y + 0.3);
    (a.explosion(t, c === -1 / 0 ? t.y : c),
      r.explosion(t),
      n.blast(t, 8),
      i.explode(t, 6.5, 30),
      i.burst(t, 14, 4867392, 0.09, 5, 3));
    for (let u of s.cols) {
      if (!u.onBlast || u.off) continue;
      let d = Math.max(u.x0, Math.min(u.x1, t.x)),
        m = Math.max(u.y0, Math.min(u.y1, t.y)),
        p = Math.max(u.z0, Math.min(u.z1, t.z)),
        x = Math.hypot(d - t.x, m - t.y, p - t.z);
      x < 5.5 && u.onBlast(t, x);
    }
    (jd.copy(t), (jd.y += 0.35));
    for (let u of l.actors) {
      if (!u.alive) continue;
      (vn.copy(u.pos), (vn.y += u.isK9 ? 0.4 : 1));
      let d = vn.distanceTo(jd);
      if (d > 7 || (!s.clear(jd, vn) && ((vn.y += 0.6), !s.clear(jd, vn))))
        continue;
      let m = 170 * saturate(1 - d / 7);
      if (u === e) m *= 0.6;
      else if (u.team === e.team) continue;
      (Nw.subVectors(vn, jd).normalize(),
        l.damage(u, m, e, {
          head: !1,
          weapon: "frag",
          dir: Nw,
          point: vn,
          blast: !0,
        }));
    }
    let h = this.ctx.player,
      f = h.eye.distanceTo(t);
    (f < 22 && h.addShake(saturate(1.25 - f / 18)),
      f < 6 && r.tinnitus(saturate(1.1 - f / 6)),
      this.ctx.hotel.inPool(t.x, t.z) &&
        t.y < 0.4 &&
        (a.splash(vn.set(t.x, this.ctx.hotel.pool.water, t.z), 4),
        this.ctx.hotel.ripple(t.x, t.z, 3)));
  }
  melee(t, e, s) {
    let {
        world: n,
        glass: i,
        physics: a,
        fx: r,
        audio: l,
        match: c,
      } = this.ctx,
      h = null,
      f = 2.2;
    for (let u of c.actors) {
      if (u === t || !u.alive || u.team === t.team) continue;
      (vn.copy(u.pos), (vn.y += 1.1), $d.subVectors(vn, e));
      let d = $d.length();
      if (!(d > f)) {
        if (u.isK9 && u.pinning === t) {
          ((h = u), (f = 0));
          continue;
        }
        $d.multiplyScalar(1 / d).dot(s) < 0.55 ||
          (n.clear(e, vn) && ((h = u), (f = d)));
      }
    }
    if (h)
      return (
        vn.copy(h.pos),
        (vn.y += 1.3),
        l.foley("melee_hit"),
        c.damage(h, 150, t, {
          head: !1,
          weapon: "melee",
          dir: s,
          point: vn,
        }),
        h
      );
    if (i.raycast(e.x, e.y, e.z, s.x, s.y, s.z, 2, yu))
      return (i.shatter(yu.pane, yu.a, yu.y, s, 1.1), null);
    if (a.raycastProps(e.x, e.y, e.z, s.x, s.y, s.z, 2, bu)) {
      let u = bu.body;
      return (
        vn.copy(e).addScaledVector(s, bu.t),
        a.impulse(u, vn.x, vn.y, vn.z, s.x * 60, 22, s.z * 60),
        u.breakable ? a.breakProp(u, s) : l.propHit(vn, u.mat, 0.9),
        null
      );
    }
    return (
      n.raycast(e.x, e.y, e.z, s.x, s.y, s.z, 1.7, br) &&
        (vn.copy(e).addScaledVector(s, br.t),
        n2.set(br.nx, br.ny, br.nz),
        l.impact(br.col.surf, vn),
        r.smoke(vn.x, vn.y, vn.z, 2, {
          size: 0.12,
          life: 0.6,
          a: 0.25,
        }),
        br.col.onShot && br.col.onShot(vn, n2, s, t)),
      null
    );
  }
};

export { CombatSystem };

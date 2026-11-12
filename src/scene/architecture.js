// scene/architecture.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  CatmullRomCurve3,
  CircleGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  Matrix4,
  PlaneGeometry,
  Quaternion,
  Shape,
  TubeGeometry,
  Vector2,
  Vector3,
} from "../vendor/three-r180.js";
import { Ll } from "./geometry.js";

function createArchitecture(o, t) {
  let e = new Matrix4(),
    s = new Vector3();
  function n(r) {
    let l = r.attributes.position,
      c = r.attributes.normal,
      h = new Float32Array(l.count * 2);
    for (let f = 0; f < l.count; f++) {
      s.fromBufferAttribute(c, f);
      let u = Math.abs(s.x),
        d = Math.abs(s.y),
        m = Math.abs(s.z);
      d >= u && d >= m
        ? ((h[f * 2] = l.getX(f)), (h[f * 2 + 1] = -l.getZ(f)))
        : u >= m
          ? ((h[f * 2] = -Math.sign(s.x) * l.getZ(f)),
            (h[f * 2 + 1] = l.getY(f)))
          : ((h[f * 2] = Math.sign(s.z) * l.getX(f)),
            (h[f * 2 + 1] = l.getY(f)));
    }
    return (r.setAttribute("uv", new BufferAttribute(h, 2)), r);
  }
  function i(r, l, c = {}) {
    let h = r.index ? r.toNonIndexed() : r.clone();
    (c.matrix && h.applyMatrix4(c.matrix),
      h.attributes.normal || h.computeVertexNormals(),
      (!c.keepUV || !h.attributes.uv) && n(h),
      o.addGeometry(h, l, null, c.shadow !== !1, c.receive !== !1),
      h.dispose(),
      r !== h && r.dispose());
  }
  return {
    add: i,
    uvWorld: n,
    bbox(r, l, c, h, f, u, d, m = {}) {
      (r > h && ([r, h] = [h, r]),
        l > f && ([l, f] = [f, l]),
        c > u && ([c, u] = [u, c]));
      let p = h - r,
        x = f - l,
        g = u - c,
        b = Math.max(
          0.001,
          Math.min(m.r ?? 0.015, p / 2.05, x / 2.05, g / 2.05),
        ),
        v = new Ll(p, x, g, m.seg ?? 2, b);
      return (
        i(v, d, {
          matrix: e.makeTranslation((r + h) / 2, (l + f) / 2, (c + u) / 2),
          shadow: m.shadow,
        }),
        m.collide
          ? o.addCollider(
              r,
              l,
              c,
              h,
              f,
              u,
              m.surf || o.surfOf.get(d) || "concrete",
              m.col,
            )
          : null
      );
    },
    cyl(r, l, c, h, f, u, d = {}) {
      let m = new CylinderGeometry(d.r2 ?? h, h, f, d.seg ?? 24, 1, !!d.open);
      if (
        (i(m, u, {
          matrix: e.makeTranslation(r, l + f / 2, c),
          shadow: d.shadow,
        }),
        !d.collide)
      )
        return null;
      let p = h * 0.8;
      return o.addCollider(
        r - p,
        l,
        c - p,
        r + p,
        l + f,
        c + p,
        d.surf || o.surfOf.get(u) || "concrete",
        d.col,
      );
    },
    rod(r, l, c, h, f = {}) {
      let u = new Vector3(...r),
        d = new Vector3(...l),
        m = new Vector3().subVectors(d, u),
        p = m.length();
      if (p < 1e-5) return;
      let x = new CylinderGeometry(f.r2 ?? c, c, p, f.seg ?? 10, 1, !1),
        g = new Quaternion().setFromUnitVectors(
          new Vector3(0, 1, 0),
          m.multiplyScalar(1 / p),
        );
      i(x, h, {
        matrix: new Matrix4().compose(
          u.add(d).multiplyScalar(0.5),
          g,
          new Vector3(1, 1, 1),
        ),
        shadow: f.shadow,
      });
    },
    lathe(r, l, c, h, f, u = {}) {
      let d = new LatheGeometry(
        h.map(([m, p]) => new Vector2(Math.max(5e-4, m), p)),
        u.seg ?? 28,
      );
      i(d, f, {
        matrix: e.makeTranslation(r, l, c),
        shadow: u.shadow,
      });
    },
    tube(r, l, c, h = {}) {
      let f = new CatmullRomCurve3(
        r.map((u) => new Vector3(...u)),
        !!h.closed,
        "catmullrom",
        h.tension ?? 0.5,
      );
      i(
        new TubeGeometry(f, h.seg ?? r.length * 8, l, h.rseg ?? 8, !!h.closed),
        c,
        {
          shadow: h.shadow,
        },
      );
    },
    sweep(r, l, c, h, f, u, d, m = {}) {
      let p = m.dir ?? 1,
        x = h - c;
      if (x <= 1e-4) return;
      let g = r === "x" ? p < 0 : p > 0,
        b = (g ? u.slice().reverse() : u).map(
          ([M, w]) => new Vector2(g ? -M : M, w),
        ),
        v = new ExtrudeGeometry(new Shape(b), {
          depth: x,
          bevelEnabled: !1,
          steps: 1,
        }),
        y = new Matrix4();
      (r === "x"
        ? y.makeTranslation(l, f, c)
        : y.makeRotationY(Math.PI / 2).setPosition(c, f, l),
        i(v, d, {
          matrix: y,
          shadow: m.shadow,
        }));
    },
    curtain(r, l, c, h, f, u, d, m = {}) {
      let p = h - c,
        x = m.folds ?? 0.22,
        g = m.depth ?? 0.06,
        b = Math.max(8, Math.ceil(p / 0.028)),
        v = 5,
        y = new PlaneGeometry(1, 1, b, v),
        M = y.attributes.position,
        w = m.seed ?? l * 13.7 + c * 3.1;
      for (let T = 0; T < M.count; T++) {
        let S = M.getX(T) + 0.5,
          E = M.getY(T) + 0.5,
          _ = c + S * p,
          R = f + E * (u - f),
          C = (_ / x) * Math.PI * 2 + Math.sin(_ * 2.3 + w) * 1.3,
          L =
            (Math.sin(C) + 0.35 * Math.sin(C * 2.1 + w)) *
              g *
              (0.75 + 0.35 * (1 - E)) +
            Math.sin(_ * 0.9 + w) * g * 0.4;
        r === "x" ? M.setXYZ(T, l + L, R, _) : M.setXYZ(T, _, R, l + L);
      }
      if (r === "x") {
        let T = y.index.array;
        for (let S = 0; S < T.length; S += 3) {
          let E = T[S];
          ((T[S] = T[S + 2]), (T[S + 2] = E));
        }
      }
      (y.computeVertexNormals(),
        i(y, d, {
          shadow: m.shadow,
        }));
    },
    disc(r, l, c, h, f, u = {}) {
      let d = new CircleGeometry(h, u.seg ?? 20),
        m = new Matrix4()
          .makeRotationX(u.up ? -Math.PI / 2 : Math.PI / 2)
          .setPosition(r, l, c);
      i(d, f, {
        matrix: m,
        shadow: !1,
      });
    },
    sign(r, l, c, h, f, u = 0) {
      let d = t.makeSign(r, l);
      return (d.position.set(c, h, f), (d.rotation.y = u), o.loose.push(d), d);
    },
  };
}

export { createArchitecture };

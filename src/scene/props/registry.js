// scene/props/registry.js: recovered from the verified GOLDEN HOUR release.
import { Gj, Kj, Wj, qj } from "../geometry.js";
import { Vector2 } from "../../vendor/three-r180.js";

function createPropRegistry(o, t) {
  let e = new Map(),
    s = new Map(),
    n = {},
    i = (h, f) => {
      if (!s.has(h)) {
        let u = f();
        ((u.name = u.name || "prop:" + h), s.set(h, u), (n[h] = u));
      }
      return s.get(h);
    };
  function a(h, f, u) {
    ((t[h] = (d = {}) => {
      let m = h + "|" + (f ? f(d) : ""),
        p = e.get(m);
      if (!p) {
        let x = Gj();
        ((p = Wj(x, u(x, d))), e.set(m, p));
      }
      return qj(p);
    }),
      (t[h].hero = !0));
  }
  let r = (h, f) => o[h] || o[f],
    l = null;
  return {
    M: o,
    P: t,
    L: n,
    def: a,
    lib: i,
    mt: r,
    fine: (h) => {
      let f = typeof h == "string" ? h : h && h.name,
        u = o[f];
      return (u && u.ghUniforms) || (f !== "leatherTan" && f !== "leatherBlack")
        ? u || h
        : i(f + "Fine", () => {
            l = l || Kj();
            let d = u.clone();
            return (
              (d.normalMap = l.normalMap),
              (d.roughnessMap = l.roughnessMap),
              (d.normalScale = new Vector2(0.55, 0.55)),
              (d.roughness = f === "leatherBlack" ? 0.94 : 1),
              (d.name = f + "Fine"),
              d
            );
          });
    },
  };
}

export { createPropRegistry };

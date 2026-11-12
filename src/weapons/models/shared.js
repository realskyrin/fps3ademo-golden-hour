// weapons/models/shared.js: recovered from the verified GOLDEN HOUR release.
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  Matrix4,
  Mesh,
  Vector3,
} from "../../vendor/three-r180.js";
import {
  E4,
  EF,
  TF,
  aT,
  bF,
  dF,
  gF,
  mF,
  pF,
  rF,
  uF,
  wF,
  xF,
  yF,
} from "./attachments.js";
import { xl } from "./camos.js";

var uA = new Vector3();
var FF = new Vector3();
var OF = new Vector3();
var cJ = new Vector3();
var uT = new Vector3();
function Rc(o, t = null) {
  let e = o.index ? o.toNonIndexed() : o,
    s = e.attributes.position,
    n = new Float32Array(s.count * 2),
    i = [uA, FF, OF];
  for (let a = 0; a + 2 < s.count; a += 3) {
    for (let h = 0; h < 3; h++)
      (i[h].fromBufferAttribute(s, a + h), t && i[h].applyMatrix4(t));
    uT.subVectors(FF, uA).cross(cJ.subVectors(OF, uA));
    let r = Math.abs(uT.x),
      l = Math.abs(uT.y),
      c = Math.abs(uT.z);
    for (let h = 0; h < 3; h++) {
      let f = i[h],
        u = (a + h) * 2;
      r >= l && r >= c
        ? ((n[u] = f.z), (n[u + 1] = f.y))
        : l >= c
          ? ((n[u] = f.z), (n[u + 1] = f.x))
          : ((n[u] = f.x), (n[u + 1] = f.y));
    }
  }
  return (e.setAttribute("uv", new BufferAttribute(n, 2)), e);
}
var hJ = {};
var NF = new Map();
function dA(o, t) {
  let e = NF.get(o);
  if (!e) {
    let l = performance.now();
    ((e = t()),
      NF.set(o, e),
      (hJ[o] = {
        tris: e.tris,
        parts: e.parts,
        ms: performance.now() - l,
      }));
  }
  let s = new Group();
  ((s.name = "att_" + o), (s.userData.keep = !0), (s.userData.attachment = o));
  let n = (l, c, h, f) => {
      if (!c) return null;
      let u = new Mesh(c, h);
      return (
        (u.name = l),
        (u.castShadow = f),
        (u.receiveShadow = f),
        s.add(u),
        u
      );
    },
    i = n("body", e.body, e.bodyMat, !0);
  (i &&
    ((i.userData.paint = e.paint),
    (i.userData.factory = {
      geometry: e.body,
      material: e.bodyMat,
    })),
    n("hardware", e.hard, rF(), !0));
  let a = n("marks", e.mark, aT(), !1);
  a && (a.renderOrder = 1);
  let r = n("lens", e.lens, e.lensMat, !1);
  return (
    r && ((r.userData.keep = !0), (r.renderOrder = e.portal ? -100 : 2)),
    {
      c: e,
      group: s,
    }
  );
}
var UF = (o) => new Vector3(o[0] / 1e3, o[1] / 1e3, -o[2] / 1e3);
function Mp(o, t = {}) {
  let e = {
    reflex: uF,
    holo: dF,
    prism: pF,
    microdot: mF,
  }[o];
  if (!e) throw new Error("buildOptic: unknown optic " + o);
  let s = o === "prism" && t.portal === !1,
    { c: n, group: i } = dA("optic:" + o + (s ? ":solid" : ""), () => e(!s));
  return {
    kind: o,
    group: i,
    eye: UF(n.eye),
    height: n.height / 1e3,
    zoomHint: n.zoom,
    relief: n.relief / 1e3,
    window: [n.window[0] / 1e3, n.window[1] / 1e3],
    bolts: n.bolts.map((a) => -a / 1e3),
    tris: n.tris,
  };
}
function gf(o, { caliber: t = "rifle" } = {}) {
  let e = {
    suppressor: gF,
    comp: xF,
    brake: bF,
    choke: yF,
  }[o];
  if (!e) throw new Error("buildMuzzle: unknown muzzle device " + o);
  if (!E4[t]) throw new Error("buildMuzzle: unknown caliber " + t);
  let { c: s, group: n } = dA(`muzzle:${o}:${t}`, () => e(t));
  return {
    kind: o,
    caliber: t,
    group: n,
    length: s.length / 1e3,
    radius: s.radius / 1e3,
    rear: s.rear / 1e3,
    tris: s.tris,
  };
}
function wp(o, t = {}) {
  let e = {
    vgrip: wF,
    angled: EF,
    laser: TF,
  }[o];
  if (!e) throw new Error("buildUnderbarrel: unknown underbarrel " + o);
  let s = t.mount === "rail" ? "rail" : "mlok",
    { c: n, group: i } = dA(`under:${o}:${s}`, () => e(s)),
    a = {
      kind: o,
      mount: s,
      group: i,
      drop: n.drop / 1e3,
      tris: n.tris,
    };
  return (
    n.grip && (a.grip = n.grip),
    n.laser && ((a.laser = UF(n.laser)), (a.laserDir = new Vector3(0, 0, -1))),
    a
  );
}
var BF = new Map();
function fJ(o, t) {
  let e =
      o.uuid +
      "|" +
      Array.from(t.elements, (n) => Math.round(n * 1e5)).join(","),
    s = BF.get(e);
  if (!s) {
    s = new BufferGeometry();
    for (let n of ["position", "normal", "color"])
      s.setAttribute(n, o.attributes[n]);
    ((s.boundingBox = o.boundingBox),
      (s.boundingSphere = o.boundingSphere),
      Rc(s, t),
      BF.set(e, s));
  }
  return s;
}
function uJ(o) {
  let t = null;
  for (let s = o.parent; s; s = s.parent)
    if ((s.name && s.name.startsWith("gun")) || s.userData.gunRoot) {
      t = s;
      break;
    }
  let e = new Matrix4();
  if (!t) return e;
  for (let s = o; s && s !== t; s = s.parent)
    (s.updateMatrix(), e.premultiply(s.matrix));
  return e;
}
function Ou(o, t, e = {}) {
  let s = o && o.isObject3D ? o : o.group,
    n = e.toGun || uJ(s);
  return (
    s.traverse((i) => {
      if (!i.isMesh || !i.userData.paint) return;
      let a = i.userData.factory,
        r = t && t !== "factory" ? xl(t, i.userData.paint) : null;
      if (!r) {
        ((i.geometry = a.geometry), (i.material = a.material));
        return;
      }
      ((i.geometry = fJ(a.geometry, n)), (i.material = r));
    }),
    (s.userData.camo = t || "factory"),
    o
  );
}
var Yr = Math.PI / 180;
var A5 = Math.PI * 2;
var Ja = !1;
var Sy = (o) => {
  Ja = !!o;
};

export { A5, Ja, Mp, Ou, Rc, Sy, Yr, gf, wp };

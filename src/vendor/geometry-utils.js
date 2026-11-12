// vendor/geometry-utils.js: recovered from the verified GOLDEN HOUR release.
import { BufferAttribute, BufferGeometry, Vector3 } from "./three-r180.js";

function Vn(o, t = !1) {
  let e = o[0].index !== null,
    s = new Set(Object.keys(o[0].attributes)),
    n = new Set(Object.keys(o[0].morphAttributes)),
    i = {},
    a = {},
    r = o[0].morphTargetsRelative,
    l = new BufferGeometry(),
    c = 0;
  for (let h = 0; h < o.length; ++h) {
    let f = o[h],
      u = 0;
    if (e !== (f.index !== null))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
        ),
        null
      );
    for (let d in f.attributes) {
      if (!s.has(d))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              '. All geometries must have compatible attributes; make sure "' +
              d +
              '" attribute exists among all geometries, or in none of them.',
          ),
          null
        );
      (i[d] === void 0 && (i[d] = []), i[d].push(f.attributes[d]), u++);
    }
    if (u !== s.size)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". Make sure all geometries have the same number of attributes.",
        ),
        null
      );
    if (r !== f.morphTargetsRelative)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
            h +
            ". .morphTargetsRelative must be consistent throughout all geometries.",
        ),
        null
      );
    for (let d in f.morphAttributes) {
      if (!n.has(d))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ".  .morphAttributes must be consistent throughout all geometries.",
          ),
          null
        );
      (a[d] === void 0 && (a[d] = []), a[d].push(f.morphAttributes[d]));
    }
    if (t) {
      let d;
      if (e) d = f.index.count;
      else if (f.attributes.position !== void 0)
        d = f.attributes.position.count;
      else
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              h +
              ". The geometry must have either an index or a position attribute",
          ),
          null
        );
      (l.addGroup(c, d, h), (c += d));
    }
  }
  if (e) {
    let h = 0,
      f = [];
    for (let u = 0; u < o.length; ++u) {
      let d = o[u].index;
      for (let m = 0; m < d.count; ++m) f.push(d.getX(m) + h);
      h += o[u].attributes.position.count;
    }
    l.setIndex(f);
  }
  for (let h in i) {
    let f = EL(i[h]);
    if (!f)
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
            h +
            " attribute.",
        ),
        null
      );
    l.setAttribute(h, f);
  }
  for (let h in a) {
    let f = a[h][0].length;
    if (f === 0) break;
    ((l.morphAttributes = l.morphAttributes || {}),
      (l.morphAttributes[h] = []));
    for (let u = 0; u < f; ++u) {
      let d = [];
      for (let p = 0; p < a[h].length; ++p) d.push(a[h][p][u]);
      let m = EL(d);
      if (!m)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              h +
              " morphAttribute.",
          ),
          null
        );
      l.morphAttributes[h].push(m);
    }
  }
  return l;
}
function EL(o) {
  let t,
    e,
    s,
    n = -1,
    i = 0;
  for (let c = 0; c < o.length; ++c) {
    let h = o[c];
    if ((t === void 0 && (t = h.array.constructor), t !== h.array.constructor))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
        ),
        null
      );
    if ((e === void 0 && (e = h.itemSize), e !== h.itemSize))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
        ),
        null
      );
    if ((s === void 0 && (s = h.normalized), s !== h.normalized))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
        ),
        null
      );
    if ((n === -1 && (n = h.gpuType), n !== h.gpuType))
      return (
        console.error(
          "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
        ),
        null
      );
    i += h.count * e;
  }
  let a = new t(i),
    r = new BufferAttribute(a, e, s),
    l = 0;
  for (let c = 0; c < o.length; ++c) {
    let h = o[c];
    if (h.isInterleavedBufferAttribute) {
      let f = l / e;
      for (let u = 0, d = h.count; u < d; u++)
        for (let m = 0; m < e; m++) {
          let p = h.getComponent(u, m);
          r.setComponent(u + f, m, p);
        }
    } else a.set(h.array, l);
    l += h.count * e;
  }
  return (n !== void 0 && (r.gpuType = n), r);
}
function a9(o, t = 1e-4) {
  t = Math.max(t, Number.EPSILON);
  let e = {},
    s = o.getIndex(),
    n = o.getAttribute("position"),
    i = s ? s.count : n.count,
    a = 0,
    r = Object.keys(o.attributes),
    l = {},
    c = {},
    h = [],
    f = ["getX", "getY", "getZ", "getW"],
    u = ["setX", "setY", "setZ", "setW"];
  for (let b = 0, v = r.length; b < v; b++) {
    let y = r[b],
      M = o.attributes[y];
    l[y] = new M.constructor(
      new M.array.constructor(M.count * M.itemSize),
      M.itemSize,
      M.normalized,
    );
    let w = o.morphAttributes[y];
    w &&
      (c[y] || (c[y] = []),
      w.forEach((T, S) => {
        let E = new T.array.constructor(T.count * T.itemSize);
        c[y][S] = new T.constructor(E, T.itemSize, T.normalized);
      }));
  }
  let d = t * 0.5,
    m = Math.log10(1 / t),
    p = Math.pow(10, m),
    x = d * p;
  for (let b = 0; b < i; b++) {
    let v = s ? s.getX(b) : b,
      y = "";
    for (let M = 0, w = r.length; M < w; M++) {
      let T = r[M],
        S = o.getAttribute(T),
        E = S.itemSize;
      for (let _ = 0; _ < E; _++) y += `${~~(S[f[_]](v) * p + x)},`;
    }
    if (y in e) h.push(e[y]);
    else {
      for (let M = 0, w = r.length; M < w; M++) {
        let T = r[M],
          S = o.getAttribute(T),
          E = o.morphAttributes[T],
          _ = S.itemSize,
          R = l[T],
          C = c[T];
        for (let L = 0; L < _; L++) {
          let A = f[L],
            O = u[L];
          if ((R[O](a, S[A](v)), E))
            for (let H = 0, F = E.length; H < F; H++) C[H][O](a, E[H][A](v));
        }
      }
      ((e[y] = a), h.push(a), a++);
    }
  }
  let g = o.clone();
  for (let b in o.attributes) {
    let v = l[b];
    if (
      (g.setAttribute(
        b,
        new v.constructor(
          v.array.slice(0, a * v.itemSize),
          v.itemSize,
          v.normalized,
        ),
      ),
      b in c)
    )
      for (let y = 0; y < c[b].length; y++) {
        let M = c[b][y];
        g.morphAttributes[b][y] = new M.constructor(
          M.array.slice(0, a * M.itemSize),
          M.itemSize,
          M.normalized,
        );
      }
  }
  return (g.setIndex(h), g);
}
function th(o, t = Math.PI / 3) {
  let e = Math.cos(t),
    s = (1 + 1e-10) * 100,
    n = [new Vector3(), new Vector3(), new Vector3()],
    i = new Vector3(),
    a = new Vector3(),
    r = new Vector3(),
    l = new Vector3();
  function c(p) {
    let x = ~~(p.x * s),
      g = ~~(p.y * s),
      b = ~~(p.z * s);
    return `${x},${g},${b}`;
  }
  let h = o.index ? o.toNonIndexed() : o,
    f = h.attributes.position,
    u = {};
  for (let p = 0, x = f.count / 3; p < x; p++) {
    let g = 3 * p,
      b = n[0].fromBufferAttribute(f, g + 0),
      v = n[1].fromBufferAttribute(f, g + 1),
      y = n[2].fromBufferAttribute(f, g + 2);
    (i.subVectors(y, v), a.subVectors(b, v));
    let M = new Vector3().crossVectors(i, a).normalize();
    for (let w = 0; w < 3; w++) {
      let T = n[w],
        S = c(T);
      (S in u || (u[S] = []), u[S].push(M));
    }
  }
  let d = new Float32Array(f.count * 3),
    m = new BufferAttribute(d, 3, !1);
  for (let p = 0, x = f.count / 3; p < x; p++) {
    let g = 3 * p,
      b = n[0].fromBufferAttribute(f, g + 0),
      v = n[1].fromBufferAttribute(f, g + 1),
      y = n[2].fromBufferAttribute(f, g + 2);
    (i.subVectors(y, v), a.subVectors(b, v), r.crossVectors(i, a).normalize());
    for (let M = 0; M < 3; M++) {
      let w = n[M],
        T = c(w),
        S = u[T];
      l.set(0, 0, 0);
      for (let E = 0, _ = S.length; E < _; E++) {
        let R = S[E];
        r.dot(R) > e && l.add(R);
      }
      (l.normalize(), m.setXYZ(g + M, l.x, l.y, l.z));
    }
  }
  return (h.setAttribute("normal", m), h);
}

export { Vn, a9, th };

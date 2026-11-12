// ai/navigation.js: recovered from the verified GOLDEN HOUR release.

var NavigationGraph = class {
  constructor(t) {
    ((this.world = t), (this.nodes = []));
  }
  add(t, e, s, n = "") {
    return (
      this.nodes.push({
        i: this.nodes.length,
        x: t,
        y: e,
        z: s,
        tag: n,
        links: [],
        g: 0,
        f: 0,
        from: -1,
        mark: 0,
      }),
      this.nodes.length - 1
    );
  }
  walkable(t, e) {
    let s = this.world,
      n = e.x - t.x,
      i = e.y - t.y,
      a = e.z - t.z,
      r = Math.hypot(n, a),
      l = Math.max(2, Math.ceil(r / 0.3));
    for (let c = 0; c <= l; c++) {
      let h = c / l,
        f = t.x + n * h,
        u = t.y + i * h,
        d = t.z + a * h;
      if (
        s.overlap(f - 0.3, u + 0.32, d - 0.3, f + 0.3, u + 1.55, d + 0.3, !0) ||
        s.groundAt(f, d, u + 0.6) < u - 0.6
      )
        return !1;
    }
    return !0;
  }
  build(t = 11.5) {
    let e = this.nodes;
    for (let i = 0; i < e.length; i++)
      for (let a = i + 1; a < e.length; a++) {
        let r = e[i],
          l = e[a],
          c = Math.hypot(r.x - l.x, r.z - l.z);
        if (
          !(c > t || Math.abs(r.y - l.y) > 4.2) &&
          !(
            Math.abs(r.y - l.y) > 0.5 &&
            !(r.tag === "stair" && l.tag === "stair")
          ) &&
          this.walkable(r, l)
        ) {
          let h = Math.hypot(c, r.y - l.y);
          (r.links.push({
            to: a,
            c: h,
          }),
            l.links.push({
              to: i,
              c: h,
            }));
        }
      }
    let s = new Set([0]),
      n = [0];
    for (; n.length;)
      for (let i of e[n.pop()].links)
        s.has(i.to) || (s.add(i.to), n.push(i.to));
    return (
      (this.islands = e
        .filter((i) => !s.has(i.i))
        .map((i) => `${i.i}(${i.x},${i.y},${i.z})`)),
      this
    );
  }
  nearest(t, e, s, n = !0) {
    let i = -1,
      a = 1e9,
      r = {
        x: t,
        y: e,
        z: s,
      };
    for (let l of this.nodes) {
      if (Math.abs(l.y - e) > 2) continue;
      let c = (l.x - t) * (l.x - t) + (l.z - s) * (l.z - s);
      c < a && (!n || c < 0.3 || this.walkable(r, l)) && ((a = c), (i = l.i));
    }
    if (i < 0 && n) return this.nearest(t, e, s, !1);
    if (i < 0)
      for (let l of this.nodes) {
        let c =
          (l.x - t) * (l.x - t) +
          (l.z - s) * (l.z - s) +
          (l.y - e) * (l.y - e) * 4;
        c < a && ((a = c), (i = l.i));
      }
    return i;
  }
  path(t, e) {
    let s = this.nodes;
    if (t < 0 || e < 0) return [];
    if (t === e) return [e];
    let n = (this._s = (this._s || 0) + 1),
      i = [t];
    ((s[t].g = 0), (s[t].f = 0), (s[t].from = -1), (s[t].mark = n));
    let a = s[e];
    for (; i.length;) {
      let r = 0;
      for (let h = 1; h < i.length; h++) s[i[h]].f < s[i[r]].f && (r = h);
      let l = i.splice(r, 1)[0];
      if (l === e) {
        let h = [];
        for (let f = e; f >= 0; f = s[f].from) h.push(f);
        return h.reverse();
      }
      let c = s[l];
      for (let h of c.links) {
        let f = s[h.to],
          u = c.g + h.c * (1 + (f.cost || 0));
        (f.mark === n && u >= f.g) ||
          ((f.g = u),
          (f.f = u + Math.hypot(f.x - a.x, f.y - a.y, f.z - a.z)),
          (f.from = l),
          (f.mark !== n || !i.includes(h.to)) && i.push(h.to),
          (f.mark = n));
      }
    }
    return [];
  }
};
function buildNavigation(o) {
  let t = new NavigationGraph(o),
    e = 3.8,
    s = (n, i = 0, a = "") => n.forEach(([r, l]) => t.add(r, i, l, a));
  return (
    s([
      [0, 7.6],
      [-5, 8.7],
      [5, 8.7],
      [-4.6, 1.4],
      [4.6, 1.4],
      [0, -1.6],
      [-6.2, 4.6],
      [6.2, 4.6],
      [-10.6, 4],
      [10.6, 4],
      [-10.6, -6.3],
      [10.6, -6.3],
      [-6, -6.6],
      [6, -6.6],
      [2.9, -6.7],
      [-10.6, 8.3],
      [10.6, 8.3],
      [0, 5.4],
      [-3, -2.6],
      [3, -2.6],
      [-6.4, -2.2],
      [6.4, -2.2],
      [-7, 8.7],
      [7, 8.7],
    ]),
    s(
      [
        [-8.1, 1],
        [8.1, 1],
      ],
      0,
      "stair",
    ),
    s(
      [
        [-8.1, -5],
        [8.1, -5],
      ],
      e,
      "stair",
    ),
    s([
      [-8.1, 2],
      [8.1, 2],
    ]),
    s(
      [
        [-8.1, -6.2],
        [8.1, -6.2],
      ],
      e,
    ),
    s(
      [
        [-10.6, -6.5],
        [10.6, -6.5],
        [0, -6.5],
        [-4.6, -6.5],
        [4.6, -6.5],
        [-10.5, -1],
        [-10.5, 4.5],
        [-10.9, 9.2],
        [10.5, -1],
        [10.5, 4.5],
        [10.9, 9.2],
      ],
      e,
    ),
    s(
      [
        [-11, 11],
        [11, 11],
      ],
      e,
    ),
    s(
      [
        [-12, 11],
        [12, 11],
      ],
      e,
      "stair",
    ),
    s(
      [
        [-18, 11],
        [18, 11],
      ],
      0,
      "stair",
    ),
    s([
      [-19.2, 11.6],
      [19.2, 11.6],
    ]),
    s([
      [-7, 11.6],
      [7, 11.6],
      [0, 12.4],
      [-13.5, 13.4],
      [13.5, 13.4],
      [-10.5, 17.5],
      [10.5, 17.5],
      [-18.5, 19.6],
      [18.5, 19.6],
      [-4, 21.15],
      [4, 21.15],
      [-9.5, 21.1],
      [9.5, 21.1],
      [-20, 14.5],
      [20, 14.5],
      [-20, 11.3],
      [-3.5, 13.5],
      [3.5, 13.5],
      [-9, 13.6],
      [9, 13.6],
    ]),
    s([
      [-13.6, 4],
      [-13.6, -6.2],
      [-20, 8.6],
      [-20, 2],
      [-25.6, 4],
      [-20, -4.2],
      [-26.6, -6.9],
      [-13.85, -6.9],
      [-16, 7],
      [-24.5, -1.5],
      [-16.5, 0.5],
    ]),
    s([
      [-13.85, -9.3],
      [-17, -13.8],
      [-24.2, -11.5],
      [-24.2, -18],
      [-10.5, -18],
      [-7.6, -14.2],
      [-12, -12],
      [-18, -18.3],
    ]),
    s([
      [-4.6, -14.2],
      [0, -14.2],
      [4.6, -14.2],
      [2.9, -9.3],
      [0, -18.2],
      [-2.5, -10.5],
    ]),
    s([
      [7.7, -14.2],
      [14, -9.4],
      [17, -14.4],
      [25.2, -10.6],
      [25.2, -18.3],
      [10, -18.3],
      [20, -18.3],
      [10.5, -10.2],
    ]),
    s([
      [14, -6.6],
      [14, -1],
      [14, 4.55],
      [14, 8.4],
      [13.2, 4.2],
      [13.2, -6.2],
      [15.1, -4],
    ]),
    s([
      [17.1, -4],
      [22, -6.6],
      [25.4, -2],
      [20, -1.6],
    ]),
    s([
      [17.1, 4.55],
      [20, 7.6],
      [24.4, 5.8],
      [19.6, 2],
    ]),
    t.build()
  );
}

export { buildNavigation };

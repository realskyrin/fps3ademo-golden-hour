// ui/studio-environment.js: recovered from the verified GOLDEN HOUR release.
import {
  BackSide,
  BoxGeometry,
  InstancedMesh,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  Object3D,
  PointLight,
  Scene,
} from "../vendor/three-r180.js";

var L7 = class extends Scene {
  constructor() {
    super();
    let t = new BoxGeometry();
    t.deleteAttribute("uv");
    let e = new MeshStandardMaterial({
        side: BackSide,
      }),
      s = new MeshStandardMaterial(),
      n = new PointLight(16777215, 900, 28, 2);
    (n.position.set(0.418, 16.199, 0.3), this.add(n));
    let i = new Mesh(t, e);
    (i.position.set(-0.757, 13.219, 0.717),
      i.scale.set(31.713, 28.305, 28.591),
      this.add(i));
    let a = new InstancedMesh(t, s, 6),
      r = new Object3D();
    (r.position.set(-10.906, 2.009, 1.846),
      r.rotation.set(0, -0.195, 0),
      r.scale.set(2.328, 7.905, 4.651),
      r.updateMatrix(),
      a.setMatrixAt(0, r.matrix),
      r.position.set(-5.607, -0.754, -0.758),
      r.rotation.set(0, 0.994, 0),
      r.scale.set(1.97, 1.534, 3.955),
      r.updateMatrix(),
      a.setMatrixAt(1, r.matrix),
      r.position.set(6.167, 0.857, 7.803),
      r.rotation.set(0, 0.561, 0),
      r.scale.set(3.927, 6.285, 3.687),
      r.updateMatrix(),
      a.setMatrixAt(2, r.matrix),
      r.position.set(-2.017, 0.018, 6.124),
      r.rotation.set(0, 0.333, 0),
      r.scale.set(2.002, 4.566, 2.064),
      r.updateMatrix(),
      a.setMatrixAt(3, r.matrix),
      r.position.set(2.291, -0.756, -2.621),
      r.rotation.set(0, -0.286, 0),
      r.scale.set(1.546, 1.552, 1.496),
      r.updateMatrix(),
      a.setMatrixAt(4, r.matrix),
      r.position.set(-2.193, -0.369, -5.547),
      r.rotation.set(0, 0.516, 0),
      r.scale.set(3.875, 3.487, 2.986),
      r.updateMatrix(),
      a.setMatrixAt(5, r.matrix),
      this.add(a));
    let l = new Mesh(t, o6(50));
    (l.position.set(-16.116, 14.37, 8.208),
      l.scale.set(0.1, 2.428, 2.739),
      this.add(l));
    let c = new Mesh(t, o6(50));
    (c.position.set(-16.109, 18.021, -8.207),
      c.scale.set(0.1, 2.425, 2.751),
      this.add(c));
    let h = new Mesh(t, o6(17));
    (h.position.set(14.904, 12.198, -1.832),
      h.scale.set(0.15, 4.265, 6.331),
      this.add(h));
    let f = new Mesh(t, o6(43));
    (f.position.set(-0.462, 8.89, 14.52),
      f.scale.set(4.38, 5.441, 0.088),
      this.add(f));
    let u = new Mesh(t, o6(20));
    (u.position.set(3.235, 11.486, -12.541),
      u.scale.set(2.5, 2, 0.1),
      this.add(u));
    let d = new Mesh(t, o6(100));
    (d.position.set(0, 20, 0), d.scale.set(1, 0.1, 1), this.add(d));
  }
  dispose() {
    let t = new Set();
    this.traverse((e) => {
      e.isMesh && (t.add(e.geometry), t.add(e.material));
    });
    for (let e of t) e.dispose();
  }
};
function o6(o) {
  return new MeshLambertMaterial({
    color: 0,
    emissive: 16777215,
    emissiveIntensity: o,
  });
}

export { L7 };

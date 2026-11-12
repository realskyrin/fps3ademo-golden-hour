// Run with Runtime.evaluate after GH.ready and the same harness frame count.
(async () => {
  const game = GH.debug;
  const scene = game.gfx.scene;
  const geometries = new Map(), materials = new Map(), nodes = [];
  const hashBytes = (view) => {
    const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    let a = 2166136261, b = 5381;
    for (const byte of bytes) {
      a = Math.imul(a ^ byte, 16777619);
      b = Math.imul(b, 33) ^ byte;
    }
    return `${view.constructor.name}:${view.length}:${a >>> 0}:${b >>> 0}`;
  };
  const array = (value) => value?.toArray ? value.toArray() : value;
  const attribute = (value) => ({
    size: value.itemSize, count: value.count, normalized: value.normalized,
    array: hashBytes(value.array ?? value.data.array),
  });
  const texture = (value) => value?.isTexture ? {
    type: value.type, format: value.format, colorSpace: value.colorSpace,
    wrapS: value.wrapS, wrapT: value.wrapT, minFilter: value.minFilter, magFilter: value.magFilter,
    repeat: array(value.repeat), offset: array(value.offset), rotation: value.rotation,
    width: value.image?.width, height: value.image?.height, depth: value.image?.depth,
  } : undefined;
  scene.traverse((node) => {
    if (node.geometry && !geometries.has(node.geometry)) {
      const geometry = node.geometry;
      geometries.set(geometry, {
        type: geometry.type,
        attributes: Object.fromEntries(Object.entries(geometry.attributes).map(([key, value]) => [key, attribute(value)])),
        index: geometry.index && attribute(geometry.index), groups: geometry.groups,
        morph: Object.fromEntries(Object.entries(geometry.morphAttributes).map(([key, values]) => [key, values.map(attribute)])),
      });
    }
    for (const material of [node.material].flat().filter(Boolean)) {
      if (materials.has(material)) continue;
      const data = {};
      for (const key of ["type", "name", "color", "emissive", "roughness", "metalness", "opacity", "transparent", "side", "depthWrite", "depthTest", "blending", "envMapIntensity", "emissiveIntensity", "vertexShader", "fragmentShader", "defines"]) {
        if (material[key] !== undefined) data[key] = array(material[key]);
      }
      for (const key of ["map", "normalMap", "roughnessMap", "metalnessMap", "emissiveMap", "alphaMap", "envMap"]) data[key] = texture(material[key]);
      materials.set(material, data);
    }
    nodes.push({ name: node.name, type: node.type, visible: node.visible,
      position: array(node.position), quaternion: array(node.quaternion), scale: array(node.scale),
      geometry: node.geometry && [...geometries.keys()].indexOf(node.geometry),
      materials: [node.material].flat().filter(Boolean).map((m) => [...materials.keys()].indexOf(m)),
    });
  });
  const digest = async (data) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(data))))].map((v) => v.toString(16).padStart(2, "0")).join("");
  return {
    ready: GH.ready, state: GH.G.state, frames: __audit.frames, randomCalls: __audit.randomCalls,
    errors: __audit.errors, stats: game.stats(),
    counts: { nodes: nodes.length, geometries: geometries.size, materials: materials.size },
    nodes: await digest(nodes), geometries: await digest([...geometries.values()]), materials: await digest([...materials.values()]),
    nodeRecords: nodes, geometryRecords: [...geometries.values()], materialRecords: [...materials.values()],
    settings: game.ctx.settings,
    weapons: game.arsenal.slots.map((slot) => ({ definition: slot.def, ammo: slot.ammo, reserve: slot.reserve })),
  };
})()

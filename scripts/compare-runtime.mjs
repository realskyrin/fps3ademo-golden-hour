import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
const root = new URL("../docs/refactor/", import.meta.url);
const read = async (name) => JSON.parse(await readFile(new URL(name, root), "utf8"));
const [original, current, originalGameplay, currentGameplay] = await Promise.all([
  "baseline-scene.json", "current-scene.json", "baseline-gameplay.json", "current-gameplay.json",
].map(read));
for (const key of ["ready", "state", "frames", "randomCalls", "counts", "nodes", "geometries", "materials", "settings", "weapons", "errors"])
  assert.deepEqual(current[key], original[key], `Scene regression: ${key}`);
function firstDifference(a, b, path = "gameplay") {
  if (Object.is(a, b)) return null;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return { path, current: a, original: b };
  for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const result = firstDifference(a[key], b[key], `${path}.${key}`);
    if (result) return result;
  }
  return null;
}
const difference = firstDifference(currentGameplay, originalGameplay);
assert(!difference, `Deterministic gameplay regression: ${JSON.stringify(difference)}`);
assert.equal(currentGameplay.errors.length, 0);
const fired = currentGameplay.snapshots.find((s) => s.step === "fired");
const reloaded = currentGameplay.snapshots.find((s) => s.step === "reloaded");
assert(fired.arsenal.slots[0].ammo < 30, "No ammunition was fired");
assert.equal(reloaded.arsenal.slots[0].ammo, 30, "Reload did not refill the magazine");
assert(reloaded.arsenal.slots[0].reserve < 150, "Reload did not consume reserve ammunition");
const report = { result: "identical", counts: current.counts, sceneHashes: {
  nodes: current.nodes, geometries: current.geometries, materials: current.materials,
}, sceneFrames: current.frames, gameplayFrames: currentGameplay.frames,
  checkedScenarios: currentGameplay.snapshots.map((s) => s.step), errors: current.errors };
await writeFile(new URL("comparison.json", root), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));

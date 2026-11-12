// One-time, reproducible extraction of the archived release into ES modules.
// Running with --write replaces the generated modules. Do not rerun after edits.
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generatorModule from "@babel/generator";
import { format } from "prettier";

const traverse = traverseModule.default ?? traverseModule;
const generate = generatorModule.default ?? generatorModule;
const rootUrl = new URL("../", import.meta.url);
const read = (file) => readFile(new URL(file, rootUrl), "utf8");
const plan = JSON.parse(await read("scripts/module-plan.json"));
const code = await format(await read("archive/published/dist/game.js"), {
  parser: "babel",
});
const ast = parse(code);
let root;
traverse(ast, {
  Program(p) {
    root = p.get("body.0.expression.callee");
    p.stop();
  },
});
assert(root.isArrowFunctionExpression());
const units = [];
for (const p of root.get("body.body")) {
  if (p.isVariableDeclaration()) {
    for (const declaration of p.get("declarations")) {
      units.push({
        path: declaration,
        node: { ...p.node, declarations: [declaration.node] },
      });
    }
  } else units.push({ path: p, node: p.node });
}
const ownership = new Map();
let section = 0;
for (const [id, unit] of units.entries()) {
  while (plan.sections[section + 1]?.[0] <= id) section++;
  unit.id = id;
  unit.file = plan.moves[id] ?? plan.sections[section][1];
  unit.names = [];
  unit.deps = new Set();
}
for (const [name, binding] of Object.entries(root.scope.bindings)) {
  const unit = units.find(
    (u) => binding.path === u.path || binding.path.findParent((p) => p === u.path),
  );
  assert(unit, `Missing owner for ${name}`);
  ownership.set(name, unit);
  unit.names.push(name);
}
for (const unit of units) {
  unit.path.traverse({
    Identifier(p) {
      if (!p.isReferencedIdentifier() && !p.isBindingIdentifier()) return;
      const binding = p.scope.getBinding(p.node.name);
      if (binding?.scope === root.scope) {
        const owner = ownership.get(p.node.name);
        if (owner && owner !== unit) unit.deps.add(owner);
      }
    },
  });
}
for (const [name, binding] of Object.entries(root.scope.bindings)) {
  for (const mutation of binding.constantViolations) {
    const owner = ownership.get(name);
    const writer = units.find(
      (u) =>
        u.path === mutation || mutation.findParent((p) => p === u.path),
    );
    assert(!writer || writer.file === owner.file,
      `Cross-module assignment to ${name}: ${owner.file} from ${writer?.file}`);
  }
}

const aliases = { ...plan.aliases };
// Recover public Three.js names from the original bundle's export table.
const exportTable = root.node.body.body.find(
  (n) => n.type === "ExpressionStatement" &&
    n.expression.type === "CallExpression" &&
    n.expression.callee.name === "JU",
).expression.arguments[1];
for (const property of exportTable.properties) {
  const original = property.value.body.name;
  const readable = property.key.name;
  if (original && readable && !(original in aliases)) aliases[original] = readable;
}
for (const [oldName, readable] of Object.entries(aliases)) {
  assert(ownership.has(oldName), `Unknown alias ${oldName}`);
  const binding = root.scope.bindings[oldName];
  const shadowed = binding.referencePaths.some((p) => {
    const conflict = p.scope.getBinding(readable);
    return conflict && conflict !== binding;
  });
  if (shadowed) aliases[oldName] = `Game${readable}`;
}
assert.equal(new Set(Object.values(aliases)).size, Object.values(aliases).length,
  "Duplicate readable names");
for (const [oldName, newName] of Object.entries(aliases)) {
  assert(!ownership.has(newName) || oldName === newName, `Alias conflict ${newName}`);
}
root.traverse({
  Identifier(p) {
    if ((p.key === "key" || p.key === "property") && !p.parent.computed) return;
    if (!p.isReferencedIdentifier() && !p.isBindingIdentifier()) return;
    const oldName = p.node.name;
    if (!aliases[oldName] || p.scope.getBinding(oldName)?.scope !== root.scope) return;
    p.node.name = aliases[oldName];
    if (p.parentPath.isObjectProperty() && p.parent.shorthand) p.parent.shorthand = false;
  },
});
root.scope.crawl();
for (const [name, scopeAliases] of Object.entries(plan.scopedAliases ?? {})) {
  const binding = root.scope.bindings[name];
  assert(binding, `Unknown scoped alias target ${name}`);
  let scopePath = binding.path;
  if (scopePath.isVariableDeclarator()) {
    const value = scopePath.get("init");
    scopePath = value.isClassExpression()
      ? value.get("body.body").find((p) => p.node.kind === "constructor")
      : value;
  }
  for (const [from, to] of Object.entries(scopeAliases)) {
    assert(scopePath.scope.hasOwnBinding(from), `Missing local ${from} in ${name}`);
    scopePath.scope.rename(from, to);
  }
}

const modules = new Map();
for (const unit of units) {
  if (!modules.has(unit.file)) modules.set(unit.file, { units: [], imports: new Map(), exports: new Set() });
  modules.get(unit.file).units.push(unit);
}
for (const unit of units) {
  const module = modules.get(unit.file);
  for (const dependency of unit.deps) {
    if (dependency.file === unit.file) continue;
    if (!module.imports.has(dependency.file)) module.imports.set(dependency.file, new Set());
    for (const name of dependency.names) {
      const readable = aliases[name] ?? name;
      module.imports.get(dependency.file).add(readable);
      modules.get(dependency.file).exports.add(readable);
    }
  }
}
// Reject cycles: imports and initialization remain explicit and reviewable.
const visited = new Set(), active = new Set();
function visit(file, chain = []) {
  assert(!active.has(file), `Circular module dependency: ${[...chain, file].join(" -> ")}`);
  if (visited.has(file)) return;
  active.add(file);
  for (const dependency of modules.get(file).imports.keys()) visit(dependency, [...chain, file]);
  active.delete(file);
  visited.add(file);
}
for (const file of modules.keys()) visit(file);
const relative = (from, to) => {
  const value = path.posix.relative(path.posix.dirname(from), to);
  return value.startsWith(".") ? value : `./${value}`;
};
const mapping = { originalArchive: "archive/published/dist/game.js", rootAliases: aliases, modules: [] };
for (const [file, module] of modules) {
  const imports = [...module.imports].map(([target, names]) =>
    `import { ${[...names].sort().join(", ")} } from ${JSON.stringify(relative(file, target))};`,
  );
  const statements = module.units.map((unit) => generate(unit.node, { comments: true }).code);
  const exports = module.exports.size ? `export { ${[...module.exports].sort().join(", ")} };` : "";
  const output = await format([
    `// ${file}: recovered from the verified GOLDEN HOUR release.`,
    ...imports, "", ...statements, "", exports, "",
  ].join("\n"), { parser: "babel" });
  mapping.modules.push({ file, statements: module.units.map((u) => u.id) });
  if (process.argv.includes("--write")) {
    const url = new URL(`src/${file}`, rootUrl);
    await mkdir(new URL("./", url), { recursive: true });
    await writeFile(url, output);
  }
}
if (process.argv.includes("--write")) {
  await writeFile(new URL("scripts/refactor-map.json", rootUrl), JSON.stringify(mapping, null, 2) + "\n");
  await writeFile(new URL("src/game.js", rootUrl),
    '// Load systems in their original release order; dependencies are static ES imports.\n' +
    [...modules.keys()].map((file) => `import "./${file}";`).join("\n") + "\n");
}
console.log(`Mapped ${units.length} declarations/statements into ${modules.size} acyclic modules.`);
console.log(`Recovered ${Object.keys(aliases).length} readable names.`);

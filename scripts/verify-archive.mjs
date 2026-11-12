import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("archive/manifest.json", root), "utf8"),
);

for (const file of manifest.files) {
  const data = await readFile(new URL(`archive/published/${file.path}`, root));
  assert.equal(data.length, file.size, `Size mismatch: ${file.path}`);
  assert.equal(
    createHash("sha256").update(data).digest("hex"),
    file.sha256,
    `SHA-256 mismatch: ${file.path}`,
  );
  console.log(`Verified ${file.path} (${data.length} bytes)`);
}
console.log(`Verified published version ${manifest.publishedVersion}`);

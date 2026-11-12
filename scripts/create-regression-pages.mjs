import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const original = await readFile(new URL("archive/published/index.html", root), "utf8");
const current = await readFile(new URL("index.html", root), "utf8");
const harness = '<script src="./browser-harness.js"></script>';
await writeFile(new URL("tests/original.html", root), original
  .replace("<head>", `<head>${harness}`)
  .replace(/<script>\{ const b =[\s\S]*?<\/script>/, '<script src="../archive/published/dist/game.js"></script>'));
await writeFile(new URL("tests/current.html", root), current
  .replace("<head>", `<head>${harness}`)
  .replace('./src/styles.css', '../src/styles.css')
  .replace('./src/main.js', '../src/main.js'));
console.log("Prepared isolated original/current regression pages.");

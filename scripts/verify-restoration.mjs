import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { format } from "prettier";
import { spawnSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const [originalHtml, localHtml, localGame, localCss] = await Promise.all(
  [
    "archive/published/index.html",
    "index.html",
    "src/game.js",
    "src/styles.css",
  ].map(read),
);

const refactor = spawnSync(process.execPath, ["scripts/verify-refactor.mjs"], {
  cwd: new URL("../", import.meta.url),
  stdio: "inherit",
});
assert.equal(refactor.status, 0, "Module migration audit failed");

const styleBlocks = [...originalHtml.matchAll(/<style>([\s\S]*?)<\/style>/g)];
assert.equal(styleBlocks.length, 2);
assert.equal(
  await format(localCss, { parser: "css" }),
  await format(styleBlocks.map((match) => match[1]).join("\n\n"), {
    parser: "css",
  }),
  "Styles differ from the published page",
);

// The original HUD uses firstChild as an Element. Preserve HTML whitespace
// exactly, since an HTML formatter can insert Text nodes and break that code.
let expectedHtml = originalHtml.replace(/<style>[\s\S]*?<\/style>/g, "");
const title = expectedHtml.match(/<title>[\s\S]*?<\/title>/)[0];
expectedHtml = expectedHtml
  .replace(title, "")
  .replace(
    "</head>",
    `${title}\n<link rel="stylesheet" href="./src/styles.css">\n</head>`,
  )
  .replace(
    /<script>[\s\S]*?<\/script>/,
    '<script type="module" src="./src/main.js"></script>',
  );
assert.equal(
  localHtml,
  expectedHtml,
  "Game DOM differs from the published page",
);
assert.match(localHtml, /src="\.\/src\/main\.js"/);
assert.match(localHtml, /href="\.\/src\/styles\.css"/);
assert.doesNotMatch(
  localHtml + localGame + localCss,
  /frame-runtime|__FRAME_PREAMBLE/,
);
console.log(
  "Module logic, base styles, and source DOM match the published game.",
);
console.log(
  "Localization and hidden-page input handling live in separate i18n modules.",
);

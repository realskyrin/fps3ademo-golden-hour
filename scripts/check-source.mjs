import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parse } from "@babel/parser";
import { programPath, readSourceGraph, validateSourceGraph } from "./lib/module-analysis.mjs";

const graph = await readSourceGraph();
validateSourceGraph(graph);
const globals = new Set([
  "AbortController", "Array", "ArrayBuffer", "AudioContext", "BigInt", "Boolean", "CanvasRenderingContext2D",
  "DataView", "Date", "Error", "Event", "EventTarget", "Float32Array", "Float64Array", "Function",
  "HTMLElement", "HTMLCanvasElement", "HTMLImageElement", "Image", "ImageBitmap", "ImageData",
  "Infinity", "Int8Array", "Int16Array", "Int32Array", "Intl", "JSON", "Map", "Math", "MutationObserver",
  "NaN", "Node", "NodeFilter", "Number", "Object", "OffscreenCanvas", "Promise", "Proxy", "RangeError",
  "ReadableStream", "Reflect", "RegExp", "Request", "Response", "Set", "String", "Symbol", "TextDecoder",
  "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URL", "URLSearchParams",
  "WeakMap", "WeakSet", "WebGL2RenderingContext", "XRWebGLLayer", "addEventListener", "atob",
  "cancelAnimationFrame", "clearInterval", "clearTimeout", "console", "createImageBitmap", "crypto", "decodeURIComponent",
  "document", "encodeURIComponent", "fetch", "globalThis", "isFinite", "isNaN", "localStorage", "location",
  "matchMedia", "navigator", "parseFloat", "parseInt", "performance", "queueMicrotask", "removeEventListener",
  "requestAnimationFrame", "self", "setInterval", "setTimeout", "undefined", "window", "getComputedStyle",
]);
// The verified release already uses the browser's WebGL/WebXR globals. Permit
// that exact set as well, without allowing newly unresolved game identifiers.
const original = parse(await readFile(new URL("../archive/published/dist/game.js", import.meta.url), "utf8"));
for (const name of Object.keys(programPath(original).scope.globals)) globals.add(name);
for (const [file, module] of graph) {
  for (const name of Object.keys(module.scope.globals)) {
    assert(globals.has(name), `Unresolved global ${name} in ${file}`);
  }
}
console.log(`Checked ${graph.size} JavaScript modules: syntax, imports, exports, globals, and cycles.`);

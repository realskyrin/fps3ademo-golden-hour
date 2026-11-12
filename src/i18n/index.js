import { DEFAULT_LOCALE, SUPPORTED_LOCALES, translateText } from "./translate.js";
import "./styles.css";

const STORAGE_KEY = "golden-hour-language-v1";
let locale = DEFAULT_LOCALE;
let observer;
let queued = false;
const textSources = new WeakMap();
const attributeSources = new WeakMap();
const pendingRoots = new Set();

export function getLocale() { return locale; }

function initialLocale() {
  const query = new URLSearchParams(location.search).get("lang");
  if (SUPPORTED_LOCALES.includes(query)) return query;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LOCALES.includes(saved)) return saved;
  } catch {}
  return DEFAULT_LOCALE;
}

function translateNode(node) {
  if (!node.parentElement || node.parentElement.closest("script, style, kbd, [data-i18n-ignore]")) return;
  const record = textSources.get(node);
  const source = record && node.data === record.output ? record.source : node.data;
  const output = translateText(source, locale);
  textSources.set(node, { source, output });
  if (node.data !== output) node.data = output;
}

function translateAttributes(element) {
  if (element.closest("[data-i18n-ignore]")) return;
  const records = attributeSources.get(element) ?? new Map();
  for (const key of ["title", "aria-label", "placeholder"]) {
    if (!element.hasAttribute(key)) continue;
    const current = element.getAttribute(key), record = records.get(key);
    const source = record && current === record.output ? record.source : current;
    const output = translateText(source, locale);
    records.set(key, { source, output });
    if (current !== output) element.setAttribute(key, output);
  }
  attributeSources.set(element, records);
}

function translateTree(root) {
  if (root.nodeType === Node.TEXT_NODE) { translateNode(root); return; }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  if (root.matches("script, style, [data-i18n-ignore]")) return;
  translateAttributes(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeType === Node.TEXT_NODE) translateNode(node);
    else translateAttributes(node);
  }
}

function syncLanguageControl() {
  const rows = document.querySelector('#pg-settings [data-tab="interface"] .st-rows');
  if (!rows) return;
  if (!rows.querySelector(".gh-language-control")) {
    const control = document.createElement("div");
    control.className = "gh-language-control";
    control.innerHTML = '<label>LANGUAGE</label><div role="group" aria-label="LANGUAGE"><button type="button" data-nav data-locale="zh-CN" data-i18n-ignore>简体中文</button><button type="button" data-nav data-locale="en" data-i18n-ignore>English</button></div>';
    control.addEventListener("click", (event) => {
      const button = event.target.closest("[data-locale]");
      if (!button) return;
      event.stopPropagation();
      setLocale(button.dataset.locale);
    });
    control.addEventListener("keydown", (event) => {
      if (["Enter", "Space", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.stopPropagation();
        if (event.code.startsWith("Arrow")) {
          event.preventDefault();
          const next = locale === "en" ? "zh-CN" : "en";
          setLocale(next);
          control.querySelector(`[data-locale="${next}"]`).focus();
        }
      }
    });
    rows.appendChild(control);
  }
  for (const button of rows.querySelectorAll("[data-locale]")) {
    const active = button.dataset.locale === locale;
    button.classList.toggle("on", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function flush() {
  queued = false;
  observer.disconnect();
  syncLanguageControl();
  for (const root of pendingRoots) translateTree(root);
  pendingRoots.clear();
  observer.observe(document.documentElement, {
    subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ["title", "aria-label", "placeholder"],
  });
}

export function setLocale(next, { persist = true } = {}) {
  if (!SUPPORTED_LOCALES.includes(next)) return;
  locale = next;
  document.documentElement.lang = locale;
  if (persist) { try { localStorage.setItem(STORAGE_KEY, locale); } catch {} }
  pendingRoots.add(document.documentElement);
  flush();
  // The original settings menu measures its selection pills on resize.
  window.dispatchEvent(new Event("resize"));
}

export function installLocalization() {
  if (observer) return;
  locale = initialLocale();
  observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "childList") for (const node of change.addedNodes) pendingRoots.add(node);
      else pendingRoots.add(change.target);
    }
    if (!queued && pendingRoots.size) { queued = true; queueMicrotask(flush); }
  });
  setLocale(locale, { persist: false });
}

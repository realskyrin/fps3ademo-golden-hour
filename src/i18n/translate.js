import { ZH_CN } from "./zh-CN.js";

export const DEFAULT_LOCALE = "zh-CN";
export const SUPPORTED_LOCALES = ["zh-CN", "en"];
export const normalizeText = (text) => text.replace(/\s+/g, " ").trim();
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const patterns = [
  [/^(\d+)\s*\/\s*(\d+) ATTACHMENTS$/, (_, a, b) => `${a} / ${b} 个配件`],
  [/^(\d+)\s*\/\s*(\d+) CAMOS$/, (_, a, b) => `${a} / ${b} 款迷彩`],
  [/^(\d+)\s*\/\s*(\d+) UNLOCKED$/, (_, a, b) => `${a} / ${b} 已解锁`],
  [/^([\d,]+)\s*\/\s*([\d,]+) XP$/, (_, a, b) => `${a} / ${b} 经验`],
  [/^(\d+)\s*\/\s*(\d+) ELIMINATIONS$/, (_, a, b) => `${a} / ${b} 次击杀`],
  [/^(\d+)\s*\/\s*(\d+) HEADSHOTS$/, (_, a, b) => `${a} / ${b} 次爆头`],
  [/^GOLD ON (\d+)\/(\d+) WEAPONS$/, (_, a, b) => `${a} / ${b} 把武器获得鎏金迷彩`],
  [/^(\d+) ELIMS(?: · (\d+) HEADSHOTS)?$/, (_, a, b) => b === undefined ? `${a} 次击杀` : `${a} 次击杀 · ${b} 次爆头`],
  [/^RANK (\d+)$/, (_, a) => `等级 ${a}`],
  [/^RANK UP ×(\d+)$/, (_, a) => `提升 ${a} 级`],
  [/^TIER (\d+) · (.+)$/, (_, a, b) => `第 ${a} 级 · ${translateText(b, "zh-CN")}`],
  [/^(\d+:\d+) REMAINING$/, (_, a) => `剩余 ${a}`],
  [/^MATCH SCORE \+([\d,]+)$/, (_, a) => `对局得分 +${a}`],
  [/^(.+) BONUS \+([\d,]+)$/, (_, a, b) => `${translateText(a, "zh-CN")}加成 +${b}`],
  [/^FIRST TO (\d+)(.*)$/, (_, a, b) => `先得 ${a} 分获胜${b}`],
  [/^(\d+) RPM$/, (_, a) => `${a} 发/分`],
  [/^([\d.]+) MS$/, (_, a) => `${a} 毫秒`],
  [/^([\d.]+) M$/, (_, a) => `${a} 米`],
  [/^([NSEW]{1,2}) (\d+)$/, (_, a, b) => `${ZH_CN[a] ?? a} ${b}`],
];

// Compose dynamic banners/score rows without altering player names or IDs.
const phrases = Object.keys(ZH_CN)
  .filter((key) => key.length > 2 && key === key.toUpperCase() && /[A-Z]/.test(key))
  .sort((a, b) => b.length - a.length);
const phrasePattern = new RegExp(`(^|[^A-Za-z])(${phrases.map(escapeRegExp).join("|")})(?=$|[^A-Za-z])`, "g");

export function translateText(source, locale = DEFAULT_LOCALE) {
  if (locale === "en") return source;
  const key = normalizeText(String(source));
  if (!key) return source;
  let translated = ZH_CN[key];
  if (translated === undefined) {
    for (const [pattern, render] of patterns) {
      const match = key.match(pattern);
      if (match) { translated = render(...match); break; }
    }
  }
  if (translated === undefined) {
    translated = key.replace(phrasePattern, (_, prefix, phrase) => prefix + ZH_CN[phrase]);
  }
  if (translated === key) return source;
  const leading = String(source).match(/^\s*/)[0];
  const trailing = String(source).match(/\s*$/)[0];
  return leading + translated + trailing;
}

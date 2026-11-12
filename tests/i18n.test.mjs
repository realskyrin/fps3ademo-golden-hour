import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_LOCALE, translateText } from "../src/i18n/translate.js";
import { ZH_CN } from "../src/i18n/zh-CN.js";

test("Chinese is the default; English preserves original content and whitespace", () => {
  assert.equal(DEFAULT_LOCALE, "zh-CN");
  assert.equal(translateText("DEPLOY"), "开始行动");
  for (const source of Object.keys(ZH_CN)) assert.equal(translateText(source, "en"), source);
  assert.equal(translateText("\n  ATTACHMENTS · CAMOS  "), "\n  配件 · 迷彩  ");
});

test("Dynamic progression, weapon and HUD values retain their numbers", () => {
  const cases = [
    ["3 / 5 ATTACHMENTS", "3 / 5 个配件"],
    ["19 ELIMS · 7 HEADSHOTS", "19 次击杀 · 7 次爆头"],
    ["GOLD ON 2/4 WEAPONS", "2 / 4 把武器获得鎏金迷彩"],
    ["RANK 17", "等级 17"],
    ["0 / 1,000 XP", "0 / 1,000 经验"],
    ["TIER 3 · MASTERY", "第 3 级 · 精通"],
    ["4:23 REMAINING", "剩余 4:23"],
    ["MATCH SCORE +1,250", "对局得分 +1,250"],
    ["720 RPM", "720 发/分"],
    ["230 MS", "230 毫秒"],
    ["E 090", "东 090"],
  ];
  for (const [source, expected] of cases) assert.equal(translateText(source), expected);
});

test("Identifiers, actor names, weapon names and numeric values are preserved", () => {
  for (const source of ["Kestrel_7", "Ghostline", "Dune", "KR-7 CARBINE", "STRIX 9", "golden-hour-profile-v1", "30", "150", "6:42", "42%"])
    assert.equal(translateText(source), source);
});

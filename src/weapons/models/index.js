// weapons/models/index.js: recovered from the verified GOLDEN HOUR release.
import { buildCarbine } from "./carbine.js";
import { buildSMG } from "./smg.js";
import { buildShotgun } from "./shotgun.js";
import { buildPistol } from "./pistol.js";
import { buildGrenade, buildLegacyGun } from "./legacy.js";

var rt0 = {
  ar: buildCarbine,
  smg: buildSMG,
  shotgun: buildShotgun,
  pistol: buildPistol,
};
var lt0 = {
  ar: buildCarbine,
  smg: buildSMG,
  shotgun: buildShotgun,
  pistol: buildPistol,
};
function buildGun(
  o,
  { detail: t = "view", build: e = null, portal: s = !0 } = {},
) {
  let n = t === "view" ? rt0[o] : lt0[o],
    i = n
      ? n({
          build: e,
          detail: t,
          portal: s,
        })
      : buildLegacyGun(o, {
          detail: t,
          build: e,
        });
  return (i.build === void 0 && (i.build = e), i);
}
var createGrenade = buildGrenade;

export { buildGun, createGrenade };

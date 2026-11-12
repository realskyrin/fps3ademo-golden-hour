// scene/props/index.js: recovered from the verified GOLDEN HOUR release.
import { createPropRegistry } from "./registry.js";
import { registerFurniture } from "./furniture.js";
import { registerDecorativeProps } from "./decorative.js";
import { registerLamps } from "./lamps.js";
import { registerPlants } from "./plants.js";
import { registerLobbyProps } from "./lobby.js";
import { registerUpholstery } from "./upholstery.js";
import { registerServiceProps } from "./service.js";

function createPropLibrary(materials) {
  let t = {},
    e = createPropRegistry(materials, t);
  for (let s of [
    registerFurniture,
    registerDecorativeProps,
    registerLamps,
    registerPlants,
    registerLobbyProps,
    registerUpholstery,
    registerServiceProps,
  ])
    s(e);
  return ((t.names = Object.keys(t).filter((s) => t[s].hero)), t);
}

export { createPropLibrary };

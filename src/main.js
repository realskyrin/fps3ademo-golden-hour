import { installLocalization } from "./i18n/index.js";

installLocalization();
// Install text localization before the original HUD and loading flow are created.
import("./game.js");

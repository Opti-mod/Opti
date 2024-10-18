import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { initThemes, patchChatBackground } from "@lib/themes";
import { patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import logger from "@lib/logger";
import windowObject from "@lib/windowObject";
import { initBadges } from "./lib/badge";
import { initSplash } from "./lib/security";


export default async () => {

    // Load everything in parallel
    const unloads = await Promise.all([
        patchLogHook(),
        patchAssets(),
        patchCommands(),
        patchChatBackground(),
        initFixes(),
        initSafeMode(),
        initSettings(),
        initQuickInstall(), 
        initBadges(),
    ]);

    // Assign window object
    window.vendetta = await windowObject(unloads);

    // Once done, load plugins
    unloads.push(await initPlugins());
    unloads.push(await initSplash());

    // We good :D
    logger.log("Opti is ready!");


}

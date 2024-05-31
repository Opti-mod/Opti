import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { patchAssets } from "@ui/assets";
import { initCustomCommands } from "./lib/command";
import initQuickInstall from "@ui/quickInstall";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import logger from "@lib/logger";
import windowObject from "@lib/windowObject";
import loadTweaks from "./lib/tweak";


export default async () => {
    const unloads = await Promise.all([
        patchLogHook(),
        patchAssets(),
        patchCommands(),
        patchChatBackground(),
        initFixes(),
        initSettings(),
        initQuickInstall(),
    ]);
    try {
        window.vendetta = await windowObject(unloads);
    }
    catch {
        logger.log("Opti has failed to load.");
    }
   
    unloads.push(await initPlugins());
    unloads.push(await loadTweaks());
    unloads.push(await initCustomCommands());
    // todo add badge unload here
    logger.log("Opti has loaded!");
}

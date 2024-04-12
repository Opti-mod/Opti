import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import { initBadges } from "@lib/badges";
import logger from "@lib/logger";
import windowObject from "@lib/windowObject";
import { initTweaks } from "./lib/tweak";

export default async () => {
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
        initTweaks(),

    ]);
    window.vendetta = await windowObject(unloads);
    unloads.push(await initPlugins());

    // we are balling
    logger.log("Opti is ready!");
}

import { patchLogHook } from "@lib/debug";
import { patchCommands } from "@lib/commands";
import { initPlugins } from "@lib/plugins";
import { patchChatBackground } from "@lib/themes";
import { patchAssets } from "@ui/assets";
import initQuickInstall from "@ui/quickInstall";
import initSafeMode from "@ui/safeMode";
import initSettings from "@ui/settings";
import initFixes from "@lib/fixes";
import { initBadges } from "@/lib/badge/badges";
import logger from "@lib/logger";
import windowObject from "@lib/windowObject";
import { initTweaks } from "./lib/tweak";
import { initCustomCommands } from "./lib/command";

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
    ]);
    window.vendetta = await windowObject(unloads);
    unloads.push(await initPlugins());
    unloads.push(await initTweaks());
    logger.log("Opti is ready!");
}

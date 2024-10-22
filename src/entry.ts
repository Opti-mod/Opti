import { ClientInfoManager } from "@lib/native";
import { NavigationNative } from "./lib/metro/common";
import Developer from "./ui/settings/pages/Developer";
import { getDebugInfo } from "./lib/debug";

// This logs in the native logging implementation, e.g. logcat
console.log("Hello from Opti!");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;
const debugInfo = getDebugInfo();

import(".").then((m) => m.default()).catch((e) => {
    console.log("Opti encountered an issue. " + e?.stack ?? e.toString());
    alert([
        "Failed to load Opti! The error is in console logs.\n",
        `Build: ${ClientInfoManager.Build}`,
        `Opti: ${__optiVersion}`,
        `Discord Version: ${debugInfo.discord.version}`
    ].join("\n"));
});

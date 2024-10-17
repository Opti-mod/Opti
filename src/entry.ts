import { ClientInfoManager } from "@lib/native";
import { NavigationNative } from "./lib/metro/common";
import Developer from "./ui/settings/pages/Developer";

// This logs in the native logging implementation, e.g. logcat
console.log("Hello from Opti!");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Failed to load Opti!\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Opti: ${__optiVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});

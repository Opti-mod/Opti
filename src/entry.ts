import { ClientInfoManager } from "@lib/native";
import { getDebugInfo } from "./lib/debug";

console.log("Opti has loaded!");
Object.freeze = Object;
Object.seal = Object;

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert(["Opti failed to initialize. Some parts may not function properly.\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Opti Version: ${__vendettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});

if(getDebugInfo().discord.version == 223) {
    alert("You are running on Discord v223. This version is known to have many crashes and issues with modded clients. Continue at your own risk.");
}
import { ClientInfoManager } from "@lib/native";

console.log("Opti has loaded!");
Object.freeze = Object;
Object.seal = Object;

// todo: make  this shorter
import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Opti failed to initialize. Some parts may not function properly.\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Opti Version: ${__vendettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});

import { ClientInfoManager } from "@lib/native";

console.log("Opti has loaded!");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;

// todo: make  this shorter
import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    alert([
        "Opti failed to load. Plugins will not be loaded.\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Opti Version: ${__vendettaVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});

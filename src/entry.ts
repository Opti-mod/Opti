import { ClientInfoManager } from "@lib/native";
import { NavigationNative } from "./lib/metro/common";
import Developer from "./ui/settings/pages/Developer";

// This logs in the native logging implementation, e.g. logcat
console.log("Hello from Opti!");

// Make 'freeze' and 'seal' do nothing
Object.freeze = Object;
Object.seal = Object;
const navigation = NavigationNative.useNavigation();

import(".").then((m) => m.default()).catch((e) => {
    console.log(e?.stack ?? e.toString());
    navigation.push("VendettaCustomPage", {
        title: "Welcome to Opti",
        render: Developer,
    });
    alert([
        "Failed to load Opti!\n",
        `Build Number: ${ClientInfoManager.Build}`,
        `Vendetta: ${__optiVersion}`,
        e?.stack || e.toString(),
    ].join("\n"));
});

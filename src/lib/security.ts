import AssetBrowser from "@/ui/settings/pages/AssetBrowser";
import Developer from "@/ui/settings/pages/Developer";
import { ReactNative as RN, NavigationNative } from "@metro/common";
import { findByProps } from "./metro/filters";
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");

export function initSplash() {
   const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");
    console.log("Loading Opti Security");
    window.alert("This is a test.");
    if(window.vendetta.settings.developerSettings) {
      showSimpleActionSheet({
         key: "OptiPostload",
         header: {
             title: "Opti Post Loader",
             onClose: () => hideActionSheet(),
         },
         options: [
             // TODO: add logic
             { label: "Toggle Safe Mode", onPress: (o : any) =>  {
               window.vendetta.settings.safeMode = o; }
             },
             { label: "Load without Opti",onPress: () =>{
               alert("no");
             }  },
         ],
 })
}
    }
 //   navigation.push("VendettaCustomPage", {
  //      title: "Asset Browser",
   //     render: AssetBrowser,
   // })

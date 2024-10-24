import AssetBrowser from "@/ui/settings/pages/AssetBrowser";
import Developer from "@/ui/settings/pages/Developer";
import { ReactNative as RN, NavigationNative } from "@metro/common";
import { findByProps } from "./metro/filters";
import { Tabs } from "@/ui/components";
import { showToast } from "@/ui/toasts";
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup }= Tabs;
export function initSplash() {
   const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");
    console.log("Loading Opti Security");
    if(window.vendetta.settings.developerSettings && window.vendetta.settings.postLoader) {
      showSimpleActionSheet({
         key: "OptiPostload",
         header: {
             title: "Opti Post Loader",
             onClose: () => hideActionSheet(),
         },
         options: [
             { label: "Toggle Safe Mode", onPress: (o : boolean) =>  {
               window.vendetta.settings.safeMode?.enabled == o;
               showToast("Loading Opti in safe mode."); 
            }
             },
             { label: "Load without Opti",onPress: () =>{
               alert("no");
             }  },
         ],
 })
}}
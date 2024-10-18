import AssetBrowser from "@/ui/settings/pages/AssetBrowser";
import Developer from "@/ui/settings/pages/Developer";
import { ReactNative as RN, NavigationNative } from "@metro/common";


export function initSplash() {
    const navigation = NavigationNative.useNavigation();
    // hm
    alert("This is a test.");
    navigation.push("VendettaCustomPage", {
        title: "Asset Browser",
        render: AssetBrowser,
    })
}
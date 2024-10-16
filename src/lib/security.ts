import Developer from "@/ui/settings/pages/Developer";
import { ReactNative as RN, NavigationNative } from "@metro/common";


export function patchSecurity() {
    const navigation = NavigationNative.useNavigation();

    navigation.push("VendettaCustomPage", {
        title: "Welcome to Opti",
        render: Developer,
    });
}
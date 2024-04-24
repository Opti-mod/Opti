import { Plugin, Theme } from "@types";
import { useProxy } from "@lib/storage";
import { plugins } from "@lib/plugins";
import { themes } from "@lib/themes";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import PluginCard from "@ui/settings/components/PluginCard";
import { ErrorBoundary } from "@/ui/components";
import { ReactNative as RN } from "@metro/common";
import ThemeCard from "../components/ThemeCard";

export default function Addons() {
    useProxy(settings)

    return (
        <ErrorBoundary>
        <RN.View style={{ flex: 1 }}>
        <AddonPage<Plugin>
            items={plugins}
            card={PluginCard}
        />

        <AddonPage<Theme>
        items={themes}
        card={ThemeCard}
        />
        
        </RN.View>
        </ErrorBoundary>
    )
}
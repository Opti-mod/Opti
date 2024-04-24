import { Plugin, Theme } from "@types";
import { useProxy } from "@lib/storage";
import { plugins } from "@lib/plugins";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import PluginCard from "@ui/settings/components/PluginCard";
import { themes } from "@/lib/themes";

export default function Plugins() {
    useProxy(settings)

    return (
        <AddonPage<Plugin>
            items={plugins}
            safeModeMessage="Safe Mode prevents plugins from being loaded. To exit Safe Mode go to the 'Opti' tab and go back to Normal Mode."
            card={PluginCard}
        />
         
    )
}
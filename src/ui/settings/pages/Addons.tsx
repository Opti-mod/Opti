import { Plugin, Theme } from "@types";
import { useProxy } from "@lib/storage";
import { plugins } from "@lib/plugins";
import { themes } from "@lib/themes";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import PluginCard from "@ui/settings/components/PluginCard";
import { Button, ErrorBoundary } from "@/ui/components";
import { ReactNative as RN } from "@metro/common";
import ThemeCard from "../components/ThemeCard";

export default function Addons() {
    useProxy(settings)
    let plugin = true;
    let shaders = false;

    return (
        
        <ErrorBoundary>
        <RN.View style={{ flex: 1 }}>
        <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() =>  {
                        plugin = false;
                        shaders = true;
                    }
                    }
                    text="Shaders"
                />
                  <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() =>  {
                        plugin = true;
                        shaders = false;
                    }
                    }
                    text="Plugins"
                />

        {plugin &&
            <AddonPage<Plugin> 
            items={plugins}
            card={PluginCard}
        />}

        {shaders && 
        <AddonPage<Theme>
        items={themes}
        card={ThemeCard}
        />}
        
        </RN.View>
        </ErrorBoundary>
    )
}
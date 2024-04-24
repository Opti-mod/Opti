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
import { useState } from "react";

export default function Addons() {
    //@ts-ignore
    useProxy(settings)
    const [selectedTab, setSelectedTab] = React.useState("");

    const SelectedTab = () => {
        switch (selectedTab) {
            case 'Plugins':
                return <AddonPage<Plugin> items={plugins} card={PluginCard}></AddonPage>
            case 'Shaders':
                return <AddonPage<Theme> items={themes} card={ThemeCard}></AddonPage>
        }
    }

    return (
        <RN.View style={{ flexDirection:"row" }}>
                <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() =>
                        setSelectedTab('Plugins')
                    }
                    text="Plugins"
                />

                <Button
                    color={Button.Colors.BRAND}
                    size={Button.Sizes.MEDIUM}
                    look={Button.Looks.FILLED}
                    onPress={() =>
                        setSelectedTab('Shaders')
                    }
                    text="Shaders"
                />
            
            <RN.View>
            {SelectedTab()}
            </RN.View>
            </RN.View>
    )
}
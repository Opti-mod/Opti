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
import { findByProps } from "@/lib/metro/filters";

const { BadgableTabBar } = findByProps("BadgableTabBar");

export default function Addons() {
    //@ts-ignore
    useProxy(settings)
    const [activeTab, setActiveTab] = React.useState("plugins");

    const tabs = [
        {
            id: "plugins",
            title: 'Plugins',
            page: () => <AddonPage<Plugin> items={plugins} card={PluginCard} />
        },
        {
            id: "shaders",
            title: 'Shaders',
            page: () => <AddonPage<Theme> items={themes} card={ThemeCard} />
        }
    ];


    return <>
    <BadgableTabBar
        style= {{padding: 14 }}
        tabs={tabs}
        activeTab={activeTab}
        onTabSelected={(tab: string) => setActiveTab(tab)}
    />
    {React.createElement(tabs.find(tab => tab.id === activeTab).page)}
</>
}

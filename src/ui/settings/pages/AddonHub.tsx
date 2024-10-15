import { ReactNative as RN, stylesheet } from "@metro/common";
import { all } from "@ui/assets";
import { Forms, Search, ErrorBoundary } from "@ui/components";
import AssetDisplay from "@ui/settings/components/AssetDisplay";
import AddonPage from "@ui/settings/components/AddonPage";
import PluginCard from "@ui/settings/components/PluginCard";
import { Plugin, Theme } from "@types";
import { useProxy } from "@lib/storage";
import { plugins } from "@lib/plugins";
import { themes } from "@lib/themes";
import ThemeCard from "../components/ThemeCard";
const { FormDivider } = Forms;
const { BadgableTabBar } = findByProps("BadgableTabBar");
import { findByProps } from "@/lib/metro/filters";
export default function AssetBrowser() {

    const styles = stylesheet.createThemedStyleSheet({
        bar: {
            padding: 8,
            flex: 1,
        },
    });
    


    const [search, setSearch] = React.useState("");
        //@ts-ignore
    useProxy(settings)
    const [activeTab, setActiveTab] = React.useState("plugins");
     const tabs = [
        {
            id: 'plugins',
            title: 'Plugins',
            page: () => <AddonPage<Plugin> items={plugins} card={PluginCard} />
        },
        {
            id: 'shaders',
            title: 'Shaders',
            page: () => <AddonPage<Theme> items={themes} card={ThemeCard} />
        }

    ];

    return (
        <ErrorBoundary>
            <RN.View style={styles.bar}>
            <BadgableTabBar
                tabs={tabs}
                 activeTab={activeTab}
                onTabSelected={(tab: string) => setActiveTab(tab)}
                 />
                 
                <Search
                    style={{ margin: 10 }}
                    onChangeText={(v: string) => setSearch(v)}
                    placeholder="Search Addons"
                />
 
                <RN.FlatList
                    data={Object.values(all).filter(a => a.name.includes(search) || a.id.toString() === search)}
                    renderItem={({ item }) => <AssetDisplay asset={item} />}
                    ItemSeparatorComponent={FormDivider}
                    keyExtractor={item => item.name}
                />
            </RN.View>
        </ErrorBoundary>
    )
}
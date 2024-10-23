import { ReactNative as RN, url } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary, Tabs } from "@ui/components";
import settings from "@lib/settings";
import Version from "@ui/settings/components/Version";
import { showToast } from "@/ui/toasts";
import { getPluginList, getPlugins, plugins } from "@/lib/plugins";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup }= Tabs;
const debugInfo = getDebugInfo();
// Something I realized while working on this, shit doesn't uncache. It doesn't update whenever I do stuff.
export default function General() {
    //@ts-ignore
    useProxy(settings);

    return (
        <ErrorBoundary>
                <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, alignItems: "center" }}>
                <Stack spacing={16}>
                    <TableRowGroup title=""> 
                    <TableRow
                        label="Opti Version"
                        icon={<TableRowIcon source={getAssetIDByName("boost")} />}
                        onPress={() => showToast(`${debugInfo.vendetta.version}`)}
                    />
                    <TableRow
                        label="Enabled Plugins"
                        subLabel={ getPlugins }
                        onPress={() => showToast(`${debugInfo.vendetta.version}`)}
                    />
                    </TableRowGroup>
                <TableRowGroup title="Actions">
                    <TableRow
                        label="Reload Discord"
                        icon={<TableRowIcon source={getAssetIDByName("ic_message_retry")} />}
                        onPress={() => BundleUpdaterManager.reload()}
                    />
                    <TableSwitchRow
                        label="Developer Settings"
                        icon={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={settings.developerSettings}
                        onValueChange={(v: boolean) => {
                            settings.developerSettings = v;
                        }}
                    />
                </TableRowGroup>
                <TableRowGroup title="Links" titleStyleType="no_border">
                    <TableRow
                        label="Discord Server"
                        icon={<TableRowIcon source={getAssetIDByName("Discord")} />}
                        onPress={() => url.openDeeplink(DISCORD_SERVER)}
                        arrow
                    />
                    <TableRow
                        label="GitHub"
                        icon={<TableRowIcon source={getAssetIDByName("img_account_sync_github_white")} />}
                        onPress={() => url.openURL(GITHUB)}
                        arrow
                    />
                </TableRowGroup>
                </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
import { ReactNative as RN, url } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary, Tabs } from "@ui/components";
import settings from "@lib/settings";
import Version from "@ui/settings/components/Version";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup }= Tabs;
const debugInfo = getDebugInfo();

export default function General() {
    //@ts-ignore
    useProxy(settings);

    return (
        <ErrorBoundary>
                <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, alignItems: "center" }}>
                <Stack spacing={16}>
                <TableRowGroup title="Links" titleStyleType="no_border">
                    <TableRow
                        label="Discord Server"
                        leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => url.openDeeplink(DISCORD_SERVER)}
                    />
                    <TableRow
                        label="GitHub"
                        leading={<FormRow.Icon source={getAssetIDByName("img_account_sync_github_white")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => url.openURL(GITHUB)}
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
                        leading={<FormRow.Icon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={settings.developerSettings}
                        onValueChange={(v: boolean) => {
                            settings.developerSettings = v;
                        }}
                    />
                </TableRowGroup>
                </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
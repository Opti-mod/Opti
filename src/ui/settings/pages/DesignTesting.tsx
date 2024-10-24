import { ReactNative as RN, url } from "@metro/common";
// import LogoOpti from "../../assets/fuck/LogoOpti.png"
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo, toggleSafeMode } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary, Tabs } from "@ui/components";
import settings from "@lib/settings";
import Version from "@ui/settings/components/Version";
import { showToast } from "@/ui/toasts";

const { FormRow, FormSwitchRow, FormSection, FormDivider } = Forms;
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup, TableRadioRow }= Tabs;
const debugInfo = getDebugInfo();
// Something I realized while working on this, shit doesn't uncache. It doesn't update whenever I do stuff.
export default function DesignTesting() {
    //@ts-ignore
    useProxy(settings);

    return (
        <ErrorBoundary>
                <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24, alignItems: "center" }}>
                <Stack spacing={16}>
                <TableRowGroup title="Actions">
                    <TableRow
                        label="TableRow"
                    />
                    <TableSwitchRow
                        label="TableSwitchRow"
                        leading={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={settings.developerSettings}
                        onValueChange={(v: boolean) => {
                            settings.developerSettings = v;
                        }}
                    />
                    <TableRadioRow
                        label="TableRadio"
                        leading={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={settings.developerSettings}
                    />
                    <TableRadioRow
                        label="Second Radio Row"
                        leading={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={settings.developerSettings}
                    />
                </TableRowGroup>
               </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}
import { ReactNative as RN, NavigationNative } from "@metro/common";
import { findByProps } from "@metro/filters";
import { connectToDebugger, getDebugInfo } from "@lib/debug";
import { useProxy } from "@lib/storage";
import { getAssetIDByName } from "@ui/assets";
import { Forms, ErrorBoundary, Tabs, Summary } from "@ui/components";
import settings, { loaderConfig } from "@lib/settings";
import AssetBrowser from "@ui/settings/pages/AssetBrowser";
import Version from "@ui/settings/components/Version";
import { showToast } from "@/ui/toasts";
import DesignTesting from "./DesignTesting";
const { FormSection, FormRow, FormSwitchRow, FormInput, FormDivider } = Forms;
const { hideActionSheet } = findByProps("openLazy", "hideActionSheet");
const { Stack, TableRow, TableRowIcon, TableSwitchRow, TableRowGroup }= Tabs;
const { showSimpleActionSheet } = findByProps("showSimpleActionSheet");
const debugInfo = getDebugInfo();

export default function Developer() {
    const navigation = NavigationNative.useNavigation();
    //@ts-ignore
    useProxy(settings);
    //@ts-ignore
    useProxy(loaderConfig);


    const versions = [
        {
            label: "Opti",
            version: debugInfo.vendetta.version,
            icon: "ic_progress_wrench_24px",
        },
        {
            label: "Discord",
            version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
            icon: "Discord",
        },
        {
            label: "React",
            version: debugInfo.react.version,
            icon: "ic_category_16px",
        },
        {
            label: "RN",
            version: debugInfo.react.nativeVersion,
            icon: "mobile",
        },
        {
            label: "Bytecode",
            version: debugInfo.hermes.bytecodeVersion,
            icon: "ic_server_security_24px",
        },
    ];

    const platformInfo = [
        {
            label: "Loader",
            version: debugInfo.vendetta.loader,
            icon: "ic_download_24px",
        },
        {
            label: "Operating System",
            version: `${debugInfo.os.name} ${debugInfo.os.version}`,
            icon: "ic_cog_24px"
        },
        ...(debugInfo.os.sdk ? [{
            label: "SDK",
            version: debugInfo.os.sdk,
            icon: "ic_profile_badge_verified_developer_color"
        }] : []),
        {
            label: "Manufacturer",
            version: debugInfo.device.manufacturer,
            icon: "ic_badge_staff"
        },
        {
            label: "Brand",
            version: debugInfo.device.brand,
            icon: "ic_settings_boost_24px"
        },
        {
            label: "Model",
            version: debugInfo.device.model,
            icon: "ic_phonelink_24px"
        },
        {
            label: RN.Platform.select({ android: "Codename", ios: "Machine ID" })!,
            version: debugInfo.device.codename,
            icon: "ic_compose_24px"
        }
    ];

    return (
        <ErrorBoundary>
            <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 38 }}>
            <Stack spacing={16}>
                <TableRowGroup title="Debug" titleStyleType="no_border">
                    <FormInput
                        value={settings.debuggerUrl}
                        onChange={(v: string) => settings.debuggerUrl = v}
                        placeholder="127.0.0.1:9090"
                        title="Debug URL"
                    />
                    <TableRow
                        label="Connect to websocket"
                        leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                        onPress={() => connectToDebugger(settings.debuggerUrl)}
                    />
                    {window.__vendetta_rdc && <>
                        <TableRow
                            label="Connect to React DevTools"
                            leading={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                            onPress={() => window.__vendetta_rdc?.connectToDevTools({
                                host: settings.debuggerUrl.split(":")?.[0],
                                resolveRNStyle: RN.StyleSheet.flatten,
                            })}
                        />
                    </>}
                </TableRowGroup>
                {window.__vendetta_loader?.features.loaderConfig && <TableRowGroup title="Loader config">
                    <TableSwitchRow
                        label="Load from custom url"
                        subLabel={"Load Opti from a custom endpoint."}
                        leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                        value={loaderConfig.customLoadUrl.enabled}
                        onValueChange={(v: boolean) => {
                            loaderConfig.customLoadUrl.enabled = v;
                        }}
                    />
                    {loaderConfig.customLoadUrl.enabled && <>
                        <FormInput
                            value={loaderConfig.customLoadUrl.url}
                            onChange={(v: string) => loaderConfig.customLoadUrl.url = v}
                            placeholder="http://localhost:4040/opti.js"
                            title="Opti URL"
                        />
                    </>}
                    {window.__vendetta_loader.features.devtools && <TableSwitchRow
                        label="Load React DevTools"
                        subLabel={`Version: ${window.__vendetta_loader.features.devtools.version}`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                        value={loaderConfig.loadReactDevTools}
                        onValueChange={(v: boolean) => {
                            loaderConfig.loadReactDevTools = v;
                        }}
                    />}
                </TableRowGroup>}
                <TableRowGroup title="Other">
                <TableRow
                        label="Asset Browser"
                        leading={<FormRow.Icon source={getAssetIDByName("ic_image")} />}
                        onPress={() => navigation.push("VendettaCustomPage", {
                            title: "Asset Browser",
                            render: AssetBrowser,
                        })}
                        arrow
                    />
                <TableRow
                        label="Opti Design Sheet"
                        leading={<FormRow.Icon source={getAssetIDByName("ic_image")} />}
                        onPress={() => navigation.push("VendettaCustomPage", {
                            title: "Design Test",
                            render: DesignTesting,
                        })}
                        arrow
                    />
                    <TableRow
                        label="ErrorBoundary Tools"
                        leading={<FormRow.Icon source={getAssetIDByName("ic_warning_24px")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => showSimpleActionSheet({
                            key: "ErrorBoundaryTools",
                            header: {
                                title: "Which ErrorBoundary do you want to trip?",
                                icon: <FormRow.Icon style={{ marginRight: 8 }} source={getAssetIDByName("ic_warning_24px")} />,
                                onClose: () => hideActionSheet(),
                            },
                            options: [
                                // @ts-expect-error 
                                // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                                { label: "Opti", onPress: () => navigation.push("VendettaCustomPage", { render: () => <undefined /> }) },
                                { label: "Discord", isDestructive: true, onPress: () => navigation.push("VendettaCustomPage", { noErrorBoundary: true }) },
                            ],
                        })}
                    />
                     <TableSwitchRow
                        label="Enable Crash Reports"
                        leading={<TableRowIcon source={getAssetIDByName("ic_progress_wrench_24px")} />}
                        value={false}
                        onValueChange={(v: boolean) => {
                            showToast("Does not work yet.");
                        }}
                    />
                </TableRowGroup>
                <TableRowGroup title="Info">
                    <Summary label="Versions" icon="ic_information_filled_24px">
                        {versions.map((v, i) => (
                            <>
                                <Version label={v.label} version={v.version} icon={v.icon} />
                                {i !== versions.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                    <Summary label="Platform" icon="ic_mobile_device">
                        {platformInfo.map((p, i) => (
                            <>
                                <Version label={p.label} version={p.version} icon={p.icon} />
                                {i !== platformInfo.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                </TableRowGroup>
                </Stack>
            </RN.ScrollView>
        </ErrorBoundary>
    )
}

import { ReactNative as RN, url, NavigationNative, clipboard } from "@metro/common";
import { DISCORD_SERVER, GITHUB } from "@lib/constants";
import { getDebugInfo } from "@lib/debug";
import { findByProps } from "@metro/filters";
import { useProxy } from "@lib/storage";
import { BundleUpdaterManager } from "@lib/native";
import { getAssetIDByName } from "@ui/assets";
import { Forms, Summary, ErrorBoundary } from "@ui/components";
import settings from "@lib/settings";
import { loaderConfig } from "@lib/settings";
import AssetBrowser from "@ui/settings/pages/AssetBrowser";
import Version from "@ui/settings/components/Version";
import { connectToDebugger } from "@lib/debug";

const { FormRow, FormSwitchRow, FormSection, FormDivider, FormInput, FormText  } = Forms;
const debugInfo = getDebugInfo();

export default function General() {
    const navigation = NavigationNative.useNavigation();
    //@ts-ignore
    useProxy(settings);
    //@ts-ignore
    useProxy(loaderConfig);

    const versions = [
        {
            label: "Discord Version",
            version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
            icon: "Discord",
        },
        {
            label: "React",
            version: debugInfo.react.version,
            icon: "ic_category_16px",
        },
        {
            label: "React Native",
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
            label: "OS",
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
                <FormSection title="Important" titleStyleType="no_border">
                <FormRow
                        label="Opti Version"
                        leading={<FormRow.Icon source={{ uri: 'https://raw.githubusercontent.com/Opti-mod/assets/main/LogoOpti.png' }} /> }
                        trailing={<FormText style={{fontSize: 13, color: "white"}}>{debugInfo.vendetta.version}</FormText>}
                        onPress={() => clipboard.setString(debugInfo.vendetta.version)}
                    />
                    <FormDivider />
                    <FormRow
                        label="Discord Server"
                        leading={<FormRow.Icon source={getAssetIDByName("Discord")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => url.openDeeplink(DISCORD_SERVER)}
                    />
                    <FormDivider />
                    <FormRow
                        label="GitHub Repository"
                        leading={<FormRow.Icon source={getAssetIDByName("img_account_sync_github_white")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => url.openURL(GITHUB)}
                    />
                </FormSection>
                <FormSection title="Actions">
                    <FormRow
                        label="Reload Discord"
                        leading={<FormRow.Icon source={getAssetIDByName("ic_message_retry")} />}
                        onPress={() => BundleUpdaterManager.reload()}
                    />
                    <FormDivider />
                    <FormRow
                        label="Asset Browser"
                        leading={<FormRow.Icon source={getAssetIDByName("ic_image")} />}
                        trailing={FormRow.Arrow}
                        onPress={() => navigation.push("VendettaCustomPage", {
                            title: "Asset Browser",
                            render: AssetBrowser,
                        })}
                    />
                    <FormDivider />
                    
                </FormSection>
                <FormSection title="Info">
                    <Summary label="Versions" icon="ic_information_filled_24px">
                        {versions.map((v, i) => (
                            <>
                                <Version label={v.label} version={v.version} icon={v.icon} />
                                {i !== versions.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                    <FormDivider />
                    <Summary label="Platform" icon="ic_mobile_device">
                        {platformInfo.map((p, i) => (
                            <>
                                <Version label={p.label} version={p.version} icon={p.icon} />
                                {i !== platformInfo.length - 1 && <FormDivider />}
                            </>
                        ))}
                    </Summary>
                    <FormDivider />
                </FormSection>
                <FormSection title="Developer">
                <FormInput
                        value={settings.debuggerUrl}
                        onChange={(v: string) => settings.debuggerUrl = v}
                        placeholder="127.0.0.1:9090"
                        title="Debugger URL"
                    />
                    <FormDivider />
                    <FormRow
                        label="Connect to debug websocket"
                        leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                        onPress={() => connectToDebugger(settings.debuggerUrl)}
                    />
                    {window.__vendetta_rdc && <>
                        <FormDivider />
                        <FormRow
                            label="Connect to React DevTools"
                            leading={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                            onPress={() => window.__vendetta_rdc?.connectToDevTools({
                                host: settings.debuggerUrl.split(":")?.[0],
                                resolveRNStyle: RN.StyleSheet.flatten,
                            })}
                        />
                    </>}
                {window.__vendetta_loader?.features.loaderConfig && <>
                    <FormSwitchRow
                        label="Load from custom url"
                        subLabel={"Load Opti from a custom endpoint."}
                        leading={<FormRow.Icon source={getAssetIDByName("copy")} />}
                        value={loaderConfig.customLoadUrl.enabled}
                        onValueChange={(v: boolean) => {
                            loaderConfig.customLoadUrl.enabled = v;
                        }}
                    />
                    <FormDivider />
                    {loaderConfig.customLoadUrl.enabled && <>
                        <FormInput
                            value={loaderConfig.customLoadUrl.url}
                            onChange={(v: string) => loaderConfig.customLoadUrl.url = v}
                            placeholder="http://localhost:4040/vendetta.js"
                            title="OPTI URL"
                        />
                        <FormDivider />
                    </>}
                    {window.__vendetta_loader.features.devtools && <FormSwitchRow
                        label="Load React DevTools"
                        subLabel={`Version: ${window.__vendetta_loader.features.devtools.version}`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_badge_staff")} />}
                        value={loaderConfig.loadReactDevTools}
                        onValueChange={(v: boolean) => {
                            loaderConfig.loadReactDevTools = v;
                        }}
                    />}
                    <FormDivider />
                </>}

                </FormSection>
                

            </RN.ScrollView>
        </ErrorBoundary>
    )
}
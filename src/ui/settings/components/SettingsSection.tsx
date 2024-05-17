import { NavigationNative } from "@metro/common";
import { useProxy } from "@lib/storage";
import { getAssetIDByName } from "@ui/assets";
import { getRenderableScreens } from "@ui/settings/data";
import { ErrorBoundary, Forms } from "@ui/components";
import settings from "@lib/settings";
import { getDebugInfo } from "@/lib/debug";

const { FormRow, FormSection, FormDivider, FormText } = Forms;

export default function SettingsSection() {
    const navigation = NavigationNative.useNavigation();
    //@ts-ignore
    useProxy(settings);

    const screens = getRenderableScreens()

    return (
        <ErrorBoundary>
            <FormSection key="Vendetta" title={`Opti ${settings.safeMode?.enabled ? " (Safe Mode)" : ""}`}>
                {screens.map((s, i) => (
                    <>
                        <FormRow
                            label={s.title}
                            leading={<FormRow.Icon source={{ uri: 'https://raw.githubusercontent.com/Opti-mod/assets/main/LogoOpti.png' }} />}
                            trailing={<FormText style={{fontSize: 13, color: "white"}}>{getDebugInfo().vendetta.version}</FormText>}
                            onPress={() => navigation.push(s.key)}
                        />
                        {i !== screens.length - 1 && <FormDivider />}
                    </>
                ))}
            </FormSection>
        </ErrorBoundary>
    )
}
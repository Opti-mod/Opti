import { Theme, ButtonColors } from "@types";
import { useProxy } from "@lib/storage";
import { themes } from "@lib/themes";
import { Button } from "@ui/components";
import settings from "@lib/settings";
import AddonPage from "@ui/settings/components/AddonPage";
import ThemeCard from "@ui/settings/components/ThemeCard";

export default function Themes() {
    //@ts-ignore
    useProxy(settings);
    return (
        <AddonPage<Theme>
            items={themes}
            safeModeMessage={`You are in Safe Mode. Shaders have been temporarily disabled. ${settings.safeMode?.currentThemeId}`}
            safeModeExtras={settings.safeMode?.currentThemeId ? <Button
                text="Disable Shader"
                color={ButtonColors.BRAND}
                size="small"
                onPress={() => {
                    delete settings.safeMode?.currentThemeId;
                }}
                style={{ marginTop: 8 }}
            /> : undefined}
            card={ThemeCard}
        />
    )
}
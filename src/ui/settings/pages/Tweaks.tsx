import { ReactNative as RN } from "@metro/common";
import { Forms, ErrorBoundary } from "@ui/components";
import { getAssetIDByName } from "@ui/assets";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/removeChatButtons";
import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { removePrompts, unloadRemovePrompts } from "@/lib/tweak/removePrompts";

const { FormDivider, FormRow } = Forms;

export default function AssetBrowser() {
    //@ts-ignore
    useProxy(settings);
    //@ts-ignore
    settings.tweaks ??= {};

    return (
        <ErrorBoundary>
            <RN.View style={{ flex: 1 }}>
                <FormRow
                    label={`Tweaks are small QoL adjustments that you can enable.`}
                />
                <FormDivider />
                <FormRow
                    label={settings.tweaks.hideButtons?.valueOf() ? "Remove Chat Buttons (Enabled)" : "Remove Chat Buttons (Disabled)"}
                    subLabel={`Removes the Gift, Voice Message, and Activities buton.`}
                    leading={<FormRow.Icon source={getAssetIDByName("ic_trash_24px")} />}
                    onPress={() => {
                        settings.tweaks.hideButtons ??= false;
                        settings.tweaks.hideButtons = !settings.tweaks.hideButtons;
                        (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
                    }
                    }
                />
                <FormDivider />
                <FormRow
                    label={settings.tweaks.removePrompts?.valueOf() ? "Remove Prompts (Enabled)" : "Remove Prompts (Disabled)"}
                    subLabel={`Removes the pin, delete, and trusted URL prompts for messages.`}
                    leading={<FormRow.Icon source={getAssetIDByName("ic_message_delete")} />}
                    onPress={() => {
                        settings.tweaks.removePrompts ??= true;
                        settings.tweaks.removePrompts = !settings.tweaks.removePrompts;
                        (settings.tweaks.removePrompts ? removePrompts : unloadRemovePrompts)();
                    }
                    }
                />
                <FormDivider />
                <FormRow
                    label={settings.tweaks.externalbadges?.valueOf() ? "Custom Badges (Enabled)" : "Custom Badges (Disabled)"}
                    subLabel={`Loads Opti badges.`}
                    leading={<FormRow.Icon source={getAssetIDByName("ic_person_shield")} />}
                    onPress={() => {
                        settings.tweaks.externalbadges ??= true;
                        settings.tweaks.externalbadges = !settings.tweaks.externalbadges;
                    }
                    }
                />

            </RN.View>
        </ErrorBoundary>
    )
}
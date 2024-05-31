import { ReactNative as RN } from "@metro/common";
import { Forms, ErrorBoundary } from "@ui/components";
import { getAssetIDByName } from "@ui/assets";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
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
                    label={settings.tweaks.silentTyping?.valueOf() ? "Silent Typing (Enabled)" : "Silent Typing (Disabled)"}
                    subLabel={`Hides that you are typing to other people.`}
                    leading={<FormRow.Icon source={getAssetIDByName("bell")} />}
                    onPress={() => {
                        settings.tweaks.silentTyping ??= false;
                        settings.tweaks.silentTyping = !settings.tweaks.silentTyping;
                        (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
                    }
                    }
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
                    label={settings.tweaks.externalbadges?.valueOf() ? "Global Badges (Enabled)" : "Global Badges (Disabled)"}
                    subLabel={`Load custom badges from other clients. (Opti badges will still show up.)`}
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
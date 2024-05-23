import { ReactNative as RN } from "@metro/common";
import { Forms, ErrorBoundary } from "@ui/components";
import { getAssetIDByName } from "@ui/assets";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { enableExperiments, unloadEnableExperiments } from "@/lib/tweak/enableExperiments";
import { removeDeletePrompt, unloadRemoveDelete } from "@/lib/tweak/removeDelete";

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
                    subLabel={`Most tweaks are ported Vendetta plugins and are actively being improved on.`}
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
                    label={settings.tweaks.trustURL?.valueOf() ? "Trust All URLs (Enabled)" : "Trust All URLs (Disabled)"}
                    subLabel={`Removes the "Trust This URL?" prompt.`}
                    leading={<FormRow.Icon source={getAssetIDByName("unlocked")} />}
                    onPress={() => {
                        settings.tweaks.trustURL ??= false;
                        settings.tweaks.trustURL = !settings.tweaks.trustURL;
                        (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
                    }
                    }
                />
                <FormDivider />
                <FormRow
                    label={settings.tweaks.experiments?.valueOf() ? "Staff Mode (Enabled)" : "Staff Mode (Disabled)"}
                    subLabel={`Enables Discord Experiments \n Port of EnableStaging made by acquitelol`}
                    leading={<FormRow.Icon source={getAssetIDByName("debug")} />}
                    onPress={() => {
                        settings.tweaks.experiments ??= true;
                        settings.tweaks.experiments = !settings.tweaks.experiments;
                        (settings.tweaks.experiments ? enableExperiments : unloadEnableExperiments)();
                    }
                    }
                />
                <FormDivider />
                <FormRow
                    label={settings.tweaks.fastdelete?.valueOf() ? "Message Delete Prompt (Enabled)" : "Message Delete Prompt (Disabled)"}
                    subLabel={`Delete messages without the warning prompt.`}
                    leading={<FormRow.Icon source={getAssetIDByName("ic_message_delete")} />}
                    onPress={() => {
                        settings.tweaks.fastdelete ??= true;
                        settings.tweaks.fastdelete = !settings.tweaks.fastdelete;
                        (settings.tweaks.fastdelete ? removeDeletePrompt : unloadRemoveDelete)();
                    }
                    }
                />
                <FormDivider />
                <FormRow
                    label={"Custom Badges"}
                    subLabel={`Load custom badges from other clients.`}
                    leading={<FormRow.Icon source={getAssetIDByName("ic_person_shield")} />}
                    onPress={() => {
                        // wip
                    }
                    }
                />

            </RN.View>
        </ErrorBoundary>
    )
}
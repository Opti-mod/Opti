import { ReactNative as RN } from "@metro/common";
import { Forms, Search, ErrorBoundary } from "@ui/components";
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
    const [search, setSearch] = React.useState("");
    //@ts-ignore
    useProxy(settings);
    //@ts-ignore
    settings.tweaks ??= {};

    return (
        <ErrorBoundary>
            <RN.View style={{ flex: 1 }}>
               <FormRow
                        label="Silent Typing"
                        subLabel={`Hides that you are typing to other people.` }
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
                        label="Link Converter (WIP)"
                        subLabel={`Converts links such as twitter.com to vxtwitter.com`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_link")} />}
                        onPress={() =>
                            console.log("wip")
                            }
                    />
                    <FormDivider />
                    <FormRow
                        label="Hide Unneccesary Buttons"
                        subLabel={`Removes the Gift and Voice Message buton.` }
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
                        label="Trust All URLs"
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
                        label="Enable Staff/Experiments Mode"
                        subLabel={`Enables Discord Experiments \n Port of EnableStaging made by acquitelol ` }
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
                        label="Remove Message Delete Prompt"
                        subLabel={`Delete messages without the warning prompt.` }
                        leading={<FormRow.Icon source={getAssetIDByName("ic_message_delete")} />}
                        onPress={() => {
                            settings.tweaks.fastdelete ??= true;
                            settings.tweaks.fastdelete = !settings.tweaks.fastdelete;
                            (settings.tweaks.fastdelete ? removeDeletePrompt : unloadRemoveDelete)();
                            }
                        }
                    />
                     <FormDivider />

            </RN.View>
        </ErrorBoundary>
    )
}
import { ReactNative as RN } from "@metro/common";
import { all } from "@ui/assets";
import { Forms, Search, ErrorBoundary } from "@ui/components";
import AssetDisplay from "@ui/settings/components/AssetDisplay";
import { getAssetIDByName } from "@ui/assets";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import settings from "@lib/settings";
import { useProxy } from "@lib/storage";

const { FormDivider, FormRow } = Forms;

export default function AssetBrowser() {
    const [search, setSearch] = React.useState("");
    useProxy(settings);
    settings.tweaks ??= {};
    // todo: find a way to load all of these on start and fix crash
    if(settings.tweaks.silentTyping.valueOf() == null) {
        settings.tweaks.silentTyping ??= false;
    }
    if(settings.tweaks.hideButtons.valueOf() == null) {
        settings.tweaks.hideButtons ??= false;
    }
    if(settings.tweaks.trustURL.valueOf() == null) {
        settings.tweaks.trustURL ??= false;
    }

    return (
        <ErrorBoundary>
            <RN.View style={{ flex: 1 }}>
                <Search
                    style={{ margin: 10 }}
                    onChangeText={(v: string) => setSearch(v)}
                    placeholder="Search Tweaks"
                />
               <FormRow
                        label="Silent Typing"
                        subLabel={`Hides that you are typing to other people. Value: ` + settings.tweaks.silentTyping.valueOf() }
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
                        label="Link Converter"
                        subLabel={`Converts links such as twitter.com to vxtwitter.com`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_link")} />}
                        onPress={() =>
                            console.log("Work in progress")
                            }
                    />
                    <FormDivider />
                    <FormRow
                        label="Hide Unneccesary Buttons"
                        subLabel={`Removes the Gift and Voice Message buton. Value: ` + settings.tweaks.hideButtons.valueOf() }
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
                        label="Trust All URLS"
                        subLabel={`Removes the "Trust This URL?" prompt. Value: ` + settings.tweaks.trustURL.valueOf() }
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
                        subLabel={`Enables Discord Experiments (TODO!!!!)` }
                        leading={<FormRow.Icon source={getAssetIDByName("debug")} />}
                        onPress={() => {

                            }
                        }
                    />

            </RN.View>
        </ErrorBoundary>
    )
}
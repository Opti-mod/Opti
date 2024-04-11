import { ReactNative as RN } from "@metro/common";
import { all } from "@ui/assets";
import { Forms, Search, ErrorBoundary } from "@ui/components";
import AssetDisplay from "@ui/settings/components/AssetDisplay";
import { getAssetIDByName } from "@ui/assets";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import settings from "@lib/settings";
import { useProxy } from "@lib/storage";

const { FormDivider, FormRow } = Forms;

export default function AssetBrowser() {
    const [search, setSearch] = React.useState("");
    useProxy(settings);

    return (
        <ErrorBoundary>
            <RN.View style={{ flex: 1 }}>
                <Search
                    style={{ margin: 10 }}
                    onChangeText={(v: string) => setSearch(v)}
                    placeholder="Search Tweaks"
                />
               <FormRow
                        label="Silent Typing Indicator"
                        subLabel={`Hides that you are typing to other people. ` + settings.tweaks.silentTyping }
                        leading={<FormRow.Icon source={getAssetIDByName("bell")} />}
                        onPress={() => {
                            settings.tweaks.silentTyping ??= true;
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
                        subLabel={`Removes the Gift, Voice Message, and Bots button.`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_trash_24px")} />}
                        onPress={() =>
                            console.log("Work in progress")
                            }
                    />
            </RN.View>
        </ErrorBoundary>
    )
}
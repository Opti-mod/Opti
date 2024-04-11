import { ReactNative as RN } from "@metro/common";
import { all } from "@ui/assets";
import { Forms, Search, ErrorBoundary } from "@ui/components";
import AssetDisplay from "@ui/settings/components/AssetDisplay";
import { getAssetIDByName } from "@ui/assets";
import { silentTyping, enabledTweak } from "@/lib/tweak/silentTyping";

const { FormDivider, FormRow } = Forms;

export default function AssetBrowser() {
    const [search, setSearch] = React.useState("");

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
                        subLabel={`Hides that you are typing to other people.`}
                        leading={<FormRow.Icon source={getAssetIDByName("bell")} />}
                        onPress={() => {
                            const enabledTweak = { value: false };
                            enabledTweak.value = !enabledTweak.value
                            silentTyping()
                            }
                        }
                    />
                      <FormRow
                        label="Silent Typing Indicator"
                        subLabel={`Hides that you are typing to other people.`}
                        leading={<FormRow.Icon source={getAssetIDByName("bell")} />}
                        onPress={() =>
                            silentTyping()
                            }
                    />
                    <FormDivider />
            </RN.View>
        </ErrorBoundary>
    )
}
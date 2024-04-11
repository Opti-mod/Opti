import { ReactNative as RN } from "@metro/common";
import { all } from "@ui/assets";
import { Forms, Search, ErrorBoundary } from "@ui/components";
import AssetDisplay from "@ui/settings/components/AssetDisplay";
import { getAssetIDByName } from "@ui/assets";

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
                        label="Tweak #1"
                        subLabel={`Bleeeeh`}
                        leading={<FormRow.Icon source={getAssetIDByName("ic_message_retry")} />}
                        onPress={() => console.log("ble")}
                    />
                    <FormDivider />
            </RN.View>
        </ErrorBoundary>
    )
}
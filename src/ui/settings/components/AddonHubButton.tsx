import { ReactNative as RN, stylesheet, NavigationNative } from "@metro/common";
import AddonHub from "@ui/settings/pages/AddonHub";
import { getAssetIDByName } from "@ui/assets";
import { semanticColors } from "@ui/color";

const styles = stylesheet.createThemedStyleSheet({
    icon: {
        marginRight: 10,
        tintColor: semanticColors.HEADER_PRIMARY,
    },
});

interface InstallButtonProps {
    alertTitle: string;
    installFunction: (id: string) => Promise<void>;
}

export default function InstallButton({ alertTitle, installFunction: fetchFunction }: InstallButtonProps) {
    const navigation = NavigationNative.useNavigation();
    return (
        <RN.TouchableOpacity onPress={() =>
            navigation.push("VendettaCustomPage", {
                title: "Addons Hub",
                render: AddonHub,
            })
         
        }>
            <RN.Image style={styles.icon} source={getAssetIDByName("img_collectibles_shop")} />
        </RN.TouchableOpacity>
    );
}

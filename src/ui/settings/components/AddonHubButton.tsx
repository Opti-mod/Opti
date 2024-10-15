import { ReactNative as RN, stylesheet, clipboard, NavigationNative } from "@metro/common";
import { HTTP_REGEX_MULTI } from "@lib/constants";
import AddonHub from "@ui/settings/pages/AddonHub";
import { showInputAlert } from "@ui/alerts";
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
                title: "Asset Browser",
                render: AddonHub,
            })
         
        }>
            <RN.Image style={styles.icon} source={getAssetIDByName("img_collectibles_shop")} />
        </RN.TouchableOpacity>
    );
}

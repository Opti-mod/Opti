import { ReactNative as RN, NavigationNative, stylesheet, lodash } from "@metro/common";
import { installPlugin } from "@lib/plugins";
import { installTheme } from "@lib/themes";
import { showConfirmationAlert } from "@ui/alerts";
import { semanticColors } from "@ui/color";
import { showToast } from "@ui/toasts";
import { without } from "@lib/utils";
import { getAssetIDByName } from "@ui/assets";
import settings from "@lib/settings";
import ErrorBoundary from "@ui/components/ErrorBoundary";
import InstallButton from "@ui/settings/components/InstallButton";
import General from "@ui/settings/pages/General";
import Plugins from "@ui/settings/pages/Plugins";
import Themes from "@ui/settings/pages/Themes";
import { PROXY_PREFIX } from "@/lib/constants";
import TweakManager from "@ui/settings/pages/TweakManager";
import { Forms } from "@ui/components";

const { FormRow, FormSwitchRow, FormSection, FormDivider, FormInput  } = Forms;

interface Screen {
    [index: string]: any;
    key: string;
    title: string;
    icon?: string;
    shouldRender?: () => boolean;
    options?: Record<string, any>;
    render: React.ComponentType<any>;
}

const main = { uri: 'https://raw.githubusercontent.com/byeoon/assets/master/Opti.png' };

const styles = stylesheet.createThemedStyleSheet({ container: { flex: 1, backgroundColor: semanticColors.BACKGROUND_MOBILE_PRIMARY } });
const formatKey = (key: string, youKeys: boolean) => youKeys ? lodash.snakeCase(key).toUpperCase() : key;
// If a function is passed, it is called with the screen object, and the return value is mapped. If a string is passed, we map to the value of the property with that name on the screen. Else, just map to the given data.
// Question: Isn't this overengineered?
// Answer: Maybe.
const keyMap = (screens: Screen[], data: string | ((s: Screen) => any) | null) => Object.fromEntries(screens.map(s => [s.key, typeof data === "function" ? data(s) : typeof data === "string" ? s[data] : data]));

export const getScreens = (youKeys = false): Screen[] => [
    {
        key: formatKey("VendettaSettings", youKeys),
        title: "Opti",
        leading:  <RN.Image source={ main } />,
        render: General,
    },
    {
        key: formatKey("VendettaPlugins", youKeys),
        title: "Plugins",
        icon: "ic_behavior_24px",
        options: {
            headerRight: () => (
                <InstallButton
                    alertTitle="Install Plugin"
                    installFunction={async (input) => {
                        if (!input.startsWith(PROXY_PREFIX))
                            setImmediate(() => showConfirmationAlert({
                                title: "Unproxied Plugin",
                                content: "The plugin you are trying to install has not been proxied.",
                                confirmText: "Install",
                                onConfirm: () =>
                                    installPlugin(input)
                                        .then(() => showToast("Installed plugin", getAssetIDByName("Check")))
                                        .catch((x) => showToast(x?.message ?? `${x}`, getAssetIDByName("Small"))),
                                cancelText: "Cancel",
                            }));
                        else return await installPlugin(input);
                    }}
                />
            ),
        },
        render: Plugins,
    },
    {
        key: formatKey("VendettaThemes", youKeys),
        title: "Shaders (Themes)",
        icon: "ic_theme_24px",
        shouldRender: () => window.__vendetta_loader?.features.hasOwnProperty("themes") ?? true,
        options: {
            headerRight: () => !settings.safeMode?.enabled && <InstallButton alertTitle="Install Theme" installFunction={installTheme} />,
        },
        render: Themes,
    },
    {
        key: formatKey("VendettaCustomPage", youKeys),
        title: "Opti Page",
        shouldRender: () => false,
        render: ({ render: PageView, noErrorBoundary, ...options }: { render: React.ComponentType; noErrorBoundary: boolean } & Record<string, object>) => {
            const navigation = NavigationNative.useNavigation();

            navigation.addListener("focus", () => navigation.setOptions(without(options, "render", "noErrorBoundary")));
            return noErrorBoundary ? <PageView /> : <ErrorBoundary><PageView /></ErrorBoundary>
        },
    },
];

export const getRenderableScreens = (youKeys = false) => getScreens(youKeys).filter(s => s.shouldRender?.() ?? true);

export const getPanelsScreens = () => keyMap(getScreens(), (s) => ({
    title: s.title,
    render: s.render,
    ...s.options,
}));

export const getYouData = () => {
    const screens = getScreens(true);

    return {
        getLayout: () => ({
            title: "Opti",
            label: "Opti",
            settings: getRenderableScreens(true).map(s => s.key)
        }),
        titleConfig: keyMap(screens, "title"),
        relationships: keyMap(screens, null),
        rendererConfigs: keyMap(screens, (s) => {
            const WrappedComponent = React.memo(({ navigation, route }: any) => {
                navigation.addListener("focus", () => navigation.setOptions(s.options));
                return <RN.View style={styles.container}><s.render {...route.params} /></RN.View>
            });

            return {
                type: "route",
                title: () => s.title,
                icon: s.icon ? getAssetIDByName(s.icon) : null,
                screen: {
                    route: lodash.chain(s.key).camelCase().upperFirst().value(),
                    getComponent: () => WrappedComponent,
                }
            }
        }),
    };
};

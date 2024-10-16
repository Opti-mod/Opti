import { ReactNative as RN, NavigationNative, stylesheet, lodash } from "@metro/common";
import { installPlugin } from "@lib/plugins";
import { installTheme } from "@lib/themes";
import { showConfirmationAlert } from "@ui/alerts";
import { semanticColors } from "@ui/color";
import { showToast } from "@ui/toasts";
import { without } from "@lib/utils";
import { getAssetIDByName } from "@ui/assets";
import ErrorBoundary from "@ui/components/ErrorBoundary";
import InstallButton from "@ui/settings/components/InstallButton";
import AddonHubButton from "@ui/settings/components/AddonHubButton";
import General from "@ui/settings/pages/General";
import { PROXY_PREFIX, VENDETTA_PROXY } from "@/lib/constants";
import { Forms } from "@ui/components";
import Addons  from "@ui/settings/pages/Addons"
import { getDebugInfo } from "@/lib/debug";

const { FormRow, FormSwitchRow, FormSection, FormDivider, FormInput  } = Forms;

interface Screen {
    [index: string]: any;
    key: string;
    title: string;
    icon?: JSX.Element | string;
    trailing?: string;
    shouldRender?: () => boolean;
    options?: Record<string, any>;
    render: React.ComponentType<any>;
}

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
        icon: 'ic_settings_boost_24px',
        render: General,
    },
    {
        key: formatKey("VendettaAddons", youKeys),
        title: "Addons",
        icon: 'CirclePlusIcon-primary',
        render: Addons,
        options: { 
            headerRight: () => (
                <>
                <InstallButton
                    alertTitle="Install Addon"
                    installFunction={async (input) => {

                        if(input.endsWith(".json")) {
                            return await installTheme(input);
                        }
                        if (!input.startsWith(PROXY_PREFIX) || !input.startsWith(VENDETTA_PROXY))
                            setImmediate(() => showConfirmationAlert({
                                title: "Unproxied Plugin",
                                content: "The plugin you are trying to install has not been proxied. Want to download it anyways?",
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
                <AddonHubButton
                alertTitle="Install Addon"
                installFunction={async (input) => {
                    
                }}
            />
            </>
                
            ),
            
            
        }
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
                icon: <FormRow.Icon>s.icon</FormRow.Icon> ? getAssetIDByName("" + s.icon) : s.icon,
                screen: {
                    route: lodash.chain(s.key).camelCase().upperFirst().value(),
                    getComponent: () => WrappedComponent,
                }
            }
        }),
    };
};

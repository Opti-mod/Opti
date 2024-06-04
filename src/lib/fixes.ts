import { moment } from "@metro/common";
import { findByProps, findByStoreName } from "@metro/filters";
import logger from "@lib/logger";
import { after } from "@lib/patcher";

const ThemeManager = findByProps("updateTheme", "overrideTheme");
const AMOLEDThemeManager = findByProps("setAMOLEDThemeEnabled");
const ThemeStore = findByStoreName("ThemeStore");
const UnsyncedUserSettingsStore = findByStoreName("UnsyncedUserSettingsStore");
const FluxDispatcher = findByProps("_currentDispatchActionType", "_subscriptions", "_actionHandlers", "_waitQueue");

function onDispatch({ locale }: { locale: string }) {
    // Theming
    // Based on https://github.com/Aliucord/AliucordRN/blob/main/src/ui/patchTheme.ts
    try {
        if (ThemeManager) {
            ThemeManager.overrideTheme(ThemeStore?.theme ?? "dark");
            if (AMOLEDThemeManager && UnsyncedUserSettingsStore.useAMOLEDTheme === 2) AMOLEDThemeManager.setAMOLEDThemeEnabled(true);
        }
    } catch (e) {
        logger.error("Failed to fix theme...", e);
    }

    // Fix infinite connection bug
    fixConnection();

    // Timestamps
    try {
        moment.locale(locale.toLowerCase());
    } catch (e) {
        logger.error("Failed to fix timestamps...", e);
    }

 

    // We're done here!
    FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", onDispatch);
}

function fixConnection() {
       // Fix Connecting - https://github.com/m4fn3/FixConnecting/blob/master/src/index.tsx
       let sessionStart = findByProps("startSession");
       let sessionStore = findByStoreName("AuthenticationStore");
       try {
           const unpatch = after("startSession", sessionStart, (args, res) => {
               unpatch()
               setTimeout(() => {
                   let session_id = sessionStore.getSessionId()
                   if (!session_id) {
                       FluxDispatcher?.dispatch({ type: 'APP_STATE_UPDATE', state: 'active' })
                       console.log("Successfully patched loading.");
                   }
               }, 200)
           })
       }
       catch {
           console.log("Could not patch connecting bug.");
       }
}

export default () => FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", onDispatch);


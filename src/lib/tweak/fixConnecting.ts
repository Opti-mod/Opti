import { findByProps, findByStoreName } from "../metro/filters";
import { after } from "@lib/patcher";

let unpatch: () => boolean;

export function fixConnection() {
    // Fix Connecting - https://github.com/m4fn3/FixConnecting/blob/master/src/index.tsx
    let sessionStart = findByProps("startSession");
    let sessionStore = findByStoreName("AuthenticationStore");
    const FluxDispatcher = findByProps("_currentDispatchActionType", "_subscriptions", "_actionHandlers", "_waitQueue");

    try {
            unpatch = after("startSession", sessionStart, (args, res) => {
            setTimeout(() => {
                let session_id = sessionStore.getSessionId()
                if (!session_id) {
                    FluxDispatcher?.dispatch({ type: 'APP_STATE_UPDATE', state: 'active' })
                    console.log("Successfully patched infinite connecting.");
                }
            }, 200)
        })
    }
    catch {
        console.log("Failed to patch infinite connection, please reload the app.");
    }
}
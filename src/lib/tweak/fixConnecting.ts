import { findByProps, findByStoreName } from "../metro/filters";
import { after } from "@lib/patcher";

const FluxDispatcher = findByProps("_currentDispatchActionType", "_subscriptions", "_actionHandlers", "_waitQueue");

export function fixConnection() {
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
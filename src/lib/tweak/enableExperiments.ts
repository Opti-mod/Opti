import { findByProps } from "../metro/filters";
import { User } from "../metro/common";

const FluxDispatcher = findByProps("_currentDispatchActionType");
const SerializedExperimentStore = findByProps("getSerializedState");

export function enableExperiments() {
  // rosie from rosiecord https://github.com/acquitelol/enable-staging/blob/mistress/src/index.ts
    console.log("TweakManager has loaded EnableExperiments.");
    try {
      User.getCurrentUser().flags |= 1;

      (User as any)._dispatcher._actionHandlers
        ._computeOrderedActionHandlers("OVERLAY_INITIALIZE")
        //@ts-ignore
        .forEach(m => {
          m.name.includes("Experiment") &&
            m.actionHandler({
              serializedExperimentStore: SerializedExperimentStore.getSerializedState(),
              user: { flags: 1 },
            });
        });
    } catch(e) {
      const err = new Error()
      console.error(err.stack);
    }
  }

  export function unloadEnableExperiments() {
    console.log("TweakManager has unloaded EnableExperiments.");
    FluxDispatcher.unsubscribe("CONNECTION_OPEN");
  }

  // idfk what this does rn
  function event() {
    FluxDispatcher.unsubscribe("CONNECTION_OPEN", event);
    enableExperiments();
  };


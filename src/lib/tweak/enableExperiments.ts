import { findByProps } from "../metro/filters";
import { User } from "../metro/common";

const FluxDispatcher = findByProps("_currentDispatchActionType");
const SerializedExperimentStore = findByProps("getSerializedState");

export function enableExperiments() {
  // rosie from rosiecord https://github.com/acquitelol/enable-staging/blob/mistress/src/index.ts
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
    FluxDispatcher.unsubscribe("CONNECTION_OPEN");
  }

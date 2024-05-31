import { instead } from "../patcher";
import { findByProps } from "../metro/filters";
import { i18n } from "../metro/common";

let unpatch: () => boolean;

export function removeDeletePrompt() {
  console.log("TweakManager has loaded RemoveMessagePrompts.");
  const prompt = findByProps("show", "openLazy");

  unpatch = instead("show", prompt, (args, res) => {
    console.log("hi " + i18n.Messages);
    if (args?.[0]?.title === i18n.Messages.DELETE_MESSAGE || args?.[0]?.title === i18n.Messages.PIN_MESSAGE) {
      args[0].onConfirm?.();
    }
    else {
      res(...args);
    }
  });
}

export function unloadRemoveDelete() {
  unpatch;
}


import { instead } from "../patcher";
import { findByProps } from "../metro/filters";
import { i18n } from "../metro/common";
import { after } from "../patcher";
import { findByStoreName } from "../metro/filters";

const MaskedLink = findByStoreName("MaskedLinkStore");
let unpatch: () => boolean;
let patches: Function[] = [];

export function removePrompts() {
  console.log("TweakManager has loaded RemovePrompts.");
  const prompt = findByProps("show", "openLazy");

  unpatch = instead("show", prompt, (args, res) => {
    if (args?.[0]?.title === i18n.Messages.DELETE_MESSAGE || args?.[0]?.title === i18n.Messages.PIN_MESSAGE) {
      args[0].onConfirm?.();
    }
    else {
      res(...args);
    }
  });

  patches.push(after("isTrustedDomain", MaskedLink, () => {
        return true;
    }));

  
}

export function unloadRemovePrompts() {
  for (const unpatch of patches)
    unpatch();

  unpatch;
}


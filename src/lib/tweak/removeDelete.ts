import { after, instead } from "../patcher";
import { findByName, findByProps } from "../metro/filters";
import { getAssetIDByName } from "@/ui/assets";
import { findInReactTree } from "../utils";
import { i18n } from "../metro/common";

let unpatch: () => boolean;

export function removeDeletePrompt() {
    console.log("TweakManager has loaded RemoveDeletePrompts.");
    const prompt = findByProps("show", "openLazy");
    
    unpatch = instead("show", prompt, (args, res) => {
      if(args?.[0]?.title === i18n.Messages.DELETE_MESSAGE)
        {
          args[0].onConfirm?.();
        }
        else
        {
          res(...args);
        }
    });
  }

  export function unloadRemoveDelete() {
    console.log("TweakManager has unloaded RemoveDeletePrompt.");
    unpatch;
  }


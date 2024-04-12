import { after, instead } from "../patcher";
import { findByName, findByProps } from "../metro/filters";
import { getAssetIDByName } from "@/ui/assets";
import { findInReactTree } from "../utils";

let unpatch: () => boolean;

export function removeDeletePrompt() {
    console.log("TweakManager has loaded RemoveDeletePrompts.");
    const prompt = findByProps("show", "openLazy");
    
    unpatch = instead("show", prompt, (_, res) => {
      // todo
    });
  }

  export function unloadRemoveDelete() {
    console.log("TweakManager has unloaded RemoveDeletePrompt.");
    unpatch;
  }


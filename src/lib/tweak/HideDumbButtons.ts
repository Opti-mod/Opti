import { after } from "../patcher";
import { findByName } from "../metro/filters";
import { getAssetIDByName } from "@/ui/assets";
import { findInReactTree } from "../utils";

const ChatInput = findByName("ChatInput");
let unpatch: () => boolean;
// credit to https://github.com/amsyarasyiq/letup/blob/main/plugins/HideGiftButton/src/index.ts

export function hideButtons() {
    console.log("TweakManager has loaded HideUnneccesaryButtons.");
    const blockList = ["ic_thread_normal_24px", "ic_gift"].map(n => getAssetIDByName(n));
    
    unpatch = after("render", ChatInput.prototype, (_, res) => {
        let voiceBlock = findInReactTree(res, r => r.props?.canSendVoiceMessage);
        if (voiceBlock) {
            voiceBlock.props.canSendVoiceMessage = false
        }
        const input = findInReactTree(res, t => "forceAnimateButtons" in t.props && t.props.actions);
        input.props.actions = input.props.actions.filter(a => !blockList.includes(a.source));
    });
    
   
  }

  export function unloadHideButtons() {
    console.log("TweakManager has unloaded HideUnneccesaryButtons.");
    unpatch;
  }


import { after } from "../patcher";
import { findByName } from "../metro/filters";
import { getAssetIDByName } from "@/ui/assets";
import { findInReactTree } from "../utils";

const ChatInput = findByName("ChatInput");
let unpatch: () => boolean;

// credit to https://github.com/amsyarasyiq/letup/blob/main/plugins/HideGiftButton/src/index.ts
export function hideDumbButtons() {
    console.log("TweakManager has loaded RemoveChatButtons.");
    const blockList = ["ic_thread_normal_24px", "ic_gift", "AppsIcon"].map(n => getAssetIDByName(n));
    
    unpatch = after("render", ChatInput.prototype, (_, res) => {
        let voiceBlock = findInReactTree(res, r => r.props?.canSendVoiceMessage);
        if (voiceBlock) {
            voiceBlock.props.canSendVoiceMessage = false
        }
        const input = findInReactTree(res, t => "forceAnimateButtons" in t.props && t.props.actions);
        //@ts-ignore it works
        input.props.actions = input.props.actions.filter(a => !blockList.includes(a.source));
    });
  }

  export function unloadHideButtons() {
    unpatch;
  }


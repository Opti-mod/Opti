import { instead } from "../patcher";
import { findByProps } from "../metro/filters";

const Typing = findByProps("startTyping");
let patches: Function[] = [];

export function silentTyping() {
    console.log("TweakManager has loaded SilentTyping.");
    patches = ['startTyping', 'stopTyping'].map(k => instead(k, Typing, () => {}));
  }

  export function unloadSilentTyping() {
    patches.forEach(unpatch => unpatch());
  }





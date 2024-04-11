import { instead } from "../patcher";
import { findByProps } from "../metro/filters";



const Typing = findByProps("startTyping");
let patches: Function[] = [];

export function silentTyping() {
    console.log("Opti loaded the tweak!!!!");
    patches = ['startTyping', 'stopTyping'].map(k => instead(k, Typing, () => {}));
  }

  export function unloadSilentTyping() {
    console.log("unloaded tweak");
    patches.forEach(unpatch => unpatch());
  }

  export var enabledTweak = false;





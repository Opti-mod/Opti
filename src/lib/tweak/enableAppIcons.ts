import { instead } from "../patcher";
import { findByProps } from "../metro/filters";

const Typing = findByProps("startTyping");
let patches: Function[] = [];

export function appIcons() {
    console.log("TweakManager has loaded FreeAppIcons.");
  
  }

  export function unloadAppIcons() {
    console.log("TweakManager has unloaded FreeAppIcons.");
  }





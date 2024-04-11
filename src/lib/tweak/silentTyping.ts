import { instead } from "../patcher";
import { findByProps } from "../metro/filters";

export var enabledTweak = false;

export async function silentTyping()
{
    const patches = ["startTyping", "stopTyping"].map((k) => instead(k, Typing, () => {}));
    const Typing = findByProps("startTyping");
    if(enabledTweak == true)
    {   
        console.log("Yay it works!!!!");
    }
    else
    {
        patches.forEach((unpatch) => unpatch());
    }
}




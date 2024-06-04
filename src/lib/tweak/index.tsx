import settings from "@lib/settings";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/removeChatButtons";
import { removePrompts, unloadRemovePrompts } from "./removePrompts";
import { loadBadges } from "../badge/index";

export default function loadTweaks()
{
    //@ts-ignore
    settings.tweaks ??= {};
    console.log("TweakManager has successfully initialized.");
    
    // To prevent potential crashing.
    if(settings.tweaks.hideButtons == undefined)
        settings.tweaks.hideButtons = false;

    if(settings.tweaks.silentTyping == undefined)
        settings.tweaks.silentTyping = false;

    if(settings.tweaks.removePrompts == undefined)
        settings.tweaks.removePrompts = false;

    if(settings.tweaks.externalbadges == undefined)
        settings.tweaks.externalbadges = true;
    
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.removePrompts ? removePrompts : unloadRemovePrompts)();
    loadBadges();
}

import settings from "@lib/settings";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { enableExperiments, unloadEnableExperiments } from "@/lib/tweak/enableExperiments";
import { removeDeletePrompt, unloadRemoveDelete } from "./tweak/removeDelete";

export function initTweaks()
{
    console.log("TweakManager has initialized.");
    // to prevent potential crashing.
    if(settings.tweaks.trustURL == undefined)
        settings.tweaks.trustURL = false;

    if(settings.tweaks.hideButtons == undefined)
        settings.tweaks.hideButtons = false;

    if(settings.tweaks.silentTyping == undefined)
        settings.tweaks.silentTyping = false;

    if(settings.tweaks.experiments == undefined)
        settings.tweaks.experiments = false;

    if(settings.tweaks.fastdelete == undefined)
        settings.tweaks.fastdelete = false;
    
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.experiments ? enableExperiments : unloadEnableExperiments)();
    (settings.tweaks.fastdelete ? removeDeletePrompt : unloadRemoveDelete)();
}

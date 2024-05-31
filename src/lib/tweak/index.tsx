import settings from "@lib/settings";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { enableExperiments, unloadEnableExperiments } from "@/lib/tweak/enableExperiments";
import { removeDeletePrompt, unloadRemoveDelete } from "./removeDelete";
import { loadBadges } from "../badge/index";

export default function loadTweaks()
{
    //@ts-ignore
    settings.tweaks ??= {};
    console.log("TweakManager has initialized.");
    
    // to prevent potential crashing.
    if(settings.tweaks.trustURL == undefined)
        settings.tweaks.trustURL = false;

    if(settings.tweaks.hideButtons == undefined)
        settings.tweaks.hideButtons = false;

    if(settings.tweaks.silentTyping == undefined)
        settings.tweaks.silentTyping = false;

    if(settings.tweaks.fastdelete == undefined)
        settings.tweaks.fastdelete = false;

    if(settings.tweaks.externalbadges == undefined)
        settings.tweaks.externalbadges = true;
    
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.fastdelete ? removeDeletePrompt : unloadRemoveDelete)();
    loadBadges();
}

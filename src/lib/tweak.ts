import settings from "@lib/settings";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { enableExperiments, unloadEnableExperiments } from "@/lib/tweak/enableExperiments";
import { removeDeletePrompt, unloadRemoveDelete } from "./tweak/removeDelete";

export function initTweaks()
{
    console.log("TweakManager has initialized.");
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.experiments ? enableExperiments : unloadEnableExperiments)();
    (settings.tweaks.fastdelete ? removeDeletePrompt : unloadRemoveDelete)();
}

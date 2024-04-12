import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";

export function initTweaks()
{
    useProxy(settings);

    if(settings.tweaks.silentTyping.valueOf() == undefined) {
        settings.tweaks.silentTyping = false;
    }
    if(settings.tweaks.hideButtons.valueOf() == undefined) {
        settings.tweaks.hideButtons = false;
    }
    if(settings.tweaks.trustURL.valueOf() == undefined) {
        settings.tweaks.trustURL = false;
    }
    
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
}
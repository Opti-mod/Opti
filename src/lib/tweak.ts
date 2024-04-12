import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { ErrorBoundary } from "@/ui/components";

export function initTweaks()
{
    console.log("Another day, another fail to load tweaks properly...?");
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    console.log("maybe, " + settings.tweaks.hideButtons);
}

import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { enableExperiments, unloadEnableExperiments } from "@/lib/tweak/enableExperiments";
import { ErrorBoundary } from "@/ui/components";

export function initTweaks()
{
    console.log("TweakManager has initialized.");
    (settings.tweaks.trustURL ? trustURL : unloadTrustURL)();
    (settings.tweaks.hideButtons ? hideDumbButtons : unloadHideButtons)();
    (settings.tweaks.silentTyping ? silentTyping : unloadSilentTyping)();
    (settings.tweaks.experiments ? enableExperiments : unloadEnableExperiments)();
}

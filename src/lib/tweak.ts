import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";
import { ErrorBoundary } from "@/ui/components";

export function initTweaks()
{
    console.log("WTF?????????")
    useProxy(settings);
    settings.tweaks ??= {};
    
    return(
        console.log("Wtf 2 electric boogaloo")
    )
}

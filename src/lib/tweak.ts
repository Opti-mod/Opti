import settings from "@lib/settings";
import { useProxy } from "@lib/storage";
import { silentTyping, unloadSilentTyping } from "@/lib/tweak/silentTyping";
import { hideDumbButtons, unloadHideButtons } from "@/lib/tweak/HideDumbButtons";
import { trustURL, unloadTrustURL } from "@/lib/tweak/trustURL";

export function initTweaks()
{
    useProxy(settings);
    settings.tweaks ??= {};
}

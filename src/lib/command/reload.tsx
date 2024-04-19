import { ApplicationCommand, ApplicationCommandOptionType } from "@/def";
import { clipboard, toasts } from "../metro/common";
import { getAssetIDByName } from "@/ui/assets";
import { BundleUpdaterManager } from "../native";

export default [ 
    {
        name: 'reloadie',
        description: 'Restarts discord.',
        execute: BundleUpdaterManager.reload(),
    }
] as ApplicationCommand[]


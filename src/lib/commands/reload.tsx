import { ApplicationCommand, ApplicationCommandOptionType } from "@/def";
import { clipboard, toasts } from "../metro/common";
import { getAssetIDByName } from "@/ui/assets";
import { BundleUpdaterManager } from "../native";

export default [ 
    {
        name: 'reload',
        description: 'Restarts discord.'
    }
] as ApplicationCommand[]

execute: {
    BundleUpdaterManager.reload()
}
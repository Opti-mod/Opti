import { ApplicationCommand } from "@/def";
import { BundleUpdaterManager } from "../native";

export default [ 
    {
        name: 'reload',
        description: 'Reload Discord.',
        execute() {
        BundleUpdaterManager.reload();
        },
    },
] as ApplicationCommand[]



import { ApplicationCommand } from "@/def";
import { BundleUpdaterManager } from "../native";

export default [ 
    {
        name: 'reload',
        description: 'Reloads Discord.',
        execute() {
        BundleUpdaterManager.reload();
        },
    },
] as ApplicationCommand[]



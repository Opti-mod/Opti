import { ApplicationCommand } from "@/def";
import { Messages } from "../metro/common";
import { getDebugInfo } from "../debug";
import { getDisabledPlugins, getPluginList, getPlugins } from "../plugins";
export default [ 
    {
        name: 'plugins list',
        description: 'Lists all Opti plugins.',
        execute(_, ctx) {
        const content = `**Enabled Plugins (${getPlugins()}):**
        > ${getPluginList()}
        **Disabled Plugins:**
        > ${getDisabledPlugins()}`
    Messages.sendMessage(ctx.channel.id, { content: content });
        },
    },
] as ApplicationCommand[]
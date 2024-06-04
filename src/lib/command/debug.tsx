import { ApplicationCommand, ApplicationCommandInputType } from "@types";
import { Messages } from "../metro/common";
import { getDebugInfo } from "../debug";

const debugInfo = getDebugInfo();
export default [ 
    {
        name: 'debug',
        description: 'Prints Optis debug information to chat.',
        inputType: ApplicationCommandInputType.BUILT_IN,
        __isOpti: true,
        execute(_, ctx) {
        const content = `**Opti Debug Info**
    > **Opti Version**: ${debugInfo.vendetta.version}
    > **Discord Version**: ${debugInfo.discord.version} (Build ${debugInfo.discord.build})
    > **Device**: ${debugInfo.device.brand} (${debugInfo.os.name} ${debugInfo.os.version})
    > **Codename/Machine ID**: ${debugInfo.device.codename}`
    Messages.sendMessage(ctx.channel.id, { content: content });
        },
    },
] as ApplicationCommand[]



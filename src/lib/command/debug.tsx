import { ApplicationCommand } from "@/def";
import { Messages } from "../metro/common";
import { getDebugInfo } from "../debug";

const debugInfo = getDebugInfo();
export default [ 
    {
        name: 'debug',
        description: 'Prints Optis debug information to chat.',
        execute(_, ctx) {
            const content = `**Opti Debug Info > ** 
            \nOpti Version: ${debugInfo.vendetta.version}\n
            Discord Version: ${debugInfo.discord.version} (Build ${debugInfo.discord.build})\n
            Device: ${debugInfo.device}\n
            OS Name: ${debugInfo.os.name}
            `
            Messages.sendMessage(ctx.channel.id, 
            {
                content: content
            }
            );
        },
    },
] as ApplicationCommand[]



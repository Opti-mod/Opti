import { ApplicationCommand } from "@/def";
import { Messages } from "../metro/common";

export default [ 
    {
        name: 'debug',
        description: 'Prints Optis debug information to chat.',
        execute(_, ctx) {
            const content = "Opti Debug Info: my balls itch rn hold on"
            Messages.sendMessage(ctx.channel.id, 
            {
                content: content
            }
            );
        },
    },
] as ApplicationCommand[]



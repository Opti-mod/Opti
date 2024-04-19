import { ApplicationCommand } from "@/def";
import { Messages, clipboard, toasts } from "../metro/common";

export default [ 
    {
        name: 'debug',
        description: 'Prints debug information about Opti to chat.',
        execute(_, ctx) {
            Messages.sendMessage(ctx.channel.id, "Opti Debug Info: my balls itch rn hold on");
        },
    },
] as ApplicationCommand[]



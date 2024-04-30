import { ApplicationCommand } from "@/def";
import { Messages } from "../metro/common";
import { getDebugInfo } from "../debug";

const debugInfo = getDebugInfo();
export default [ 
    {
        name: 'woah',
        description: 'Woah all over the place.',
        execute(_, ctx) {
            Messages.sendBotMessage(ctx.channel.id, "woah. balls!!!!!");
        },
    },
] as ApplicationCommand[]


